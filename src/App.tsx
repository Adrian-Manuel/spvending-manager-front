import './App.css'; // App-specific styles, including corporate color variables and global overrides
import { Route, Routes } from 'react-router-dom'; // Removed useLocation, logic moved to MainLayout
import TenantsPage from './presentation/pages/TenantsPage/TenantsPage';
import ClubsPage from './presentation/pages/ClubsPage/ClubsPage';
import MachinesPage from './presentation/pages/MachinesPage/MachinesPage';
import UsersPage from './presentation/pages/UsersPage/UsersPage';
import { appRoutes } from './utilities/defines/routes';
import SelectedItemPage from './presentation/pages/SelectedItemPage/SelectedItemPage';
import LogginPage from './presentation/pages/LogginPage/LogginPage';
import Authorization from './security/Authorization';

import "primereact/resources/primereact.min.css"; // Core CSS
import "primereact/resources/themes/bootstrap4-light-blue/theme.css"; // Theme

// App component now focuses on defining routes that will be rendered within the main content area managed by MainLayout
function App() {
	// The decision to show full layout or just LogginPage is now in MainLayout.tsx
	// This App component always defines all routes.
	return (
		<>
			<Routes>
				<Route path={appRoutes.logginRoute} element={<LogginPage />} />
				<Route path={appRoutes.tenantsRoute} element={ <Authorization> <TenantsPage/> </Authorization>}/>
				<Route path={appRoutes.clubsRoute} element={ <Authorization> <ClubsPage/> </Authorization>}/>
				<Route path={appRoutes.machinesRoute} element={<Authorization> <MachinesPage/> </Authorization>}/>
				<Route path={appRoutes.usersRoute} element={<Authorization> <UsersPage/> </Authorization>} />
				<Route path={"/:itemType"+appRoutes.selectedItemRoute+"/:uuid"} element={<Authorization> <SelectedItemPage/> </Authorization>} />
				{/* Consider adding a catch-all route for 404 pages if not already present */}
				{/* <Route path="*" element={<NotFoundPage />} /> */}
			</Routes>
		</>
	)
}

export default App;
