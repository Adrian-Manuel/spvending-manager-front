import './TenantsPage.css'; // Page-specific styles
import Main from './../../components/Main/Main'; // Main component for content display
// Header is now part of MainLayout in main.tsx, so it's not imported or rendered here directly.
import { infoDisplayTenant } from '../../../utilities/infoDisplay';
import { useContext, useEffect, useState, useCallback } from 'react'; // Added useCallback
import { TenantInfoDisplay } from '../../../domain/entities/models/tenant';
import { TenantRepositoryHttp } from '../../../infraestructure/adapters/api/TenantRepositoryHttp';
import { GetTenantList } from '../../../application/usecases/TenantUseCases/GetTenantList';
import TenantWarningModal from '../../components/WarningsModals/TenantWarningModal/TenantWarningModal';
import { AdminRepositoryHttp } from '../../../infraestructure/adapters/api/AdminRepositoryHttp';
import { RefreshToken } from '../../../application/usecases/AdminUseCases/RefreshToken';
import { Admin } from '../../../contexts/AdminContext';
import { useNavigate } from 'react-router';
import { appRoutes } from '../../../utilities/defines/routes';
// Consider adding a Loader component for better UX during data fetching
// import Loader from '../../components/Loader/Loader';

const repository = new TenantRepositoryHttp();
const getTenantList = new GetTenantList(repository);

function TenantsPage() {
	const navigate = useNavigate();
	const [admin, setAdmin] = useContext(Admin); // Ensure admin context is correctly typed or handled if null
	const [tenants, setTenants] = useState<TenantInfoDisplay[]>([]);
	const [selectedTenantUuid, setSelectedTenantUuid] = useState<string>(""); // Renamed for clarity
	const [isWarningModalVisible, setIsWarningModalVisible] = useState<boolean>(false);
	// const [modalPosition, setModalPosition] = useState<'center' | 'top' | 'bottom' | 'left' | 'right'>("center"); // More flexible modal positioning
	const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state
	const [error, setError] = useState<string | null>(null); // Error state

	const showWarningModal = useCallback(() => {
		// setModalPosition(position); // If you need to change position dynamically
		setIsWarningModalVisible(true);
	}, []);

	const fetchTenants = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const tenantList = await getTenantList.execute();
			setTenants(tenantList);
		} catch (err: any) {
			console.error("Error fetching tenants:", err);
			if (err?.message === "401") { // Unauthorized
				try {
					const adminRepo = new AdminRepositoryHttp();
					const refreshToken = new RefreshToken(adminRepo);
					const newAdminSession = await refreshToken.execute();
					setAdmin(newAdminSession); // Update admin session
					// Retry fetching tenants after token refresh
					const tenantListAfterRefresh = await getTenantList.execute();
					setTenants(tenantListAfterRefresh);
				} catch (refreshErr) {
					console.error("Error refreshing token or refetching tenants:", refreshErr);
					setError("Session expired. Please log in again.");
					navigate(appRoutes.logginRoute); // Redirect to login
				}
			} else {
				setError("Failed to load tenants. Please try again later.");
				// Optionally navigate to login or an error page for other errors
				// navigate(appRoutes.logginRoute);
			}
		} finally {
			setIsLoading(false);
		}
	}, [navigate, setAdmin]); // Added dependencies

	useEffect(() => {
		fetchTenants();
	}, [fetchTenants]); // fetchTenants is now memoized with useCallback

	useEffect(() => {
		if (selectedTenantUuid) { // Check if there's a UUID to show the modal
			showWarningModal();
		}
	}, [selectedTenantUuid, showWarningModal]); // Added showWarningModal to dependencies

	// Conditional rendering for loading and error states
	if (isLoading) {
		// return <Loader />; // Replace with your actual Loader component
		return <div className="page-loading">Loading tenants...</div>;
	}

	if (error) {
		return <div className="page-error">Error: {error}</div>;
	}

	return (
		// The page content is now wrapped in a fragment as Header/Aside are handled by MainLayout
		<>
			{/* Main component now receives data and handlers. Ensure Main is responsive. */}
			<Main
				textInfoDisplay={infoDisplayTenant}
				dataToDisplay={tenants}
				setterUuid={setSelectedTenantUuid} // Pass the renamed state setter
				title="Tenants Management" // Example: Pass a title to Main component
			/>
			<TenantWarningModal
				visible={isWarningModalVisible}
				setVisible={() => {
					setIsWarningModalVisible(false);
					setSelectedTenantUuid(""); // Reset UUID when modal is closed
				}}
				uuid={selectedTenantUuid}
				setUuid={setSelectedTenantUuid} // This might be redundant if modal handles its own UUID state internally or just uses passed uuid
				// position={modalPosition} // Use if modal position is dynamic
				fetchTenants={fetchTenants} // Pass fetchTenants to refresh list after delete
			/>
		</>
	)
}

export default TenantsPage;
