import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import styles from "./../WarningsModals.module.css"; // Shared warning modal styles
import alertIcon from "./../../../../assets/icons/alert.png"; // Ensure path is correct
import { WarningProps } from "../../../../domain/entities/property-models/componentsProperties";
import { TenantRepositoryHttp } from "../../../../infraestructure/adapters/api/TenantRepositoryHttp";
import { DeleteTenant } from "../../../../application/usecases/TenantUseCases/DeleteTenant";
import React, { useCallback, useState } from 'react'; // Import useCallback and useState

const repository = new TenantRepositoryHttp();
const deleteTenantUseCase = new DeleteTenant(repository); // Renamed for clarity

// Extended WarningProps to include a function to refresh the list after successful deletion
interface TenantWarningModalProps extends WarningProps {
    fetchTenants?: () => void; // Optional: function to refresh tenant list
}

function TenantWarningModal({ visible, setVisible, uuid, setUuid, position, fetchTenants, toastRef }: TenantWarningModalProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const showSuccess = useCallback(() => {
        toastRef?.current?.show({ severity: 'success', summary: 'Success', detail: 'Tenant deleted successfully.' });
    }, [toastRef]);

    const showError = useCallback((detail: string = 'Error deleting tenant.') => {
        toastRef?.current?.show({ severity: 'error', summary: 'Error', detail: detail, life: 3000 });
    }, [toastRef]);

    const handleClose = useCallback(() => {
        setUuid(""); // Clear UUID
        setVisible(); // Call original setVisible to close modal
    }, [setUuid, setVisible]);

    const handleDelete = useCallback(async () => {
        if (uuid) {
            setIsDeleting(true);
            try {
                await deleteTenantUseCase.execute(uuid);
                showSuccess();
                handleClose(); // Close modal and clear UUID
                fetchTenants?.(); // Refresh tenant list if function is provided
            } catch (err: any) {
                console.error("Error deleting tenant:", err);
                showError(err.message || "An unexpected error occurred while deleting the tenant.");
            } finally {
                setIsDeleting(false);
            }
        }
    }, [uuid, handleClose, fetchTenants, showSuccess, showError]);
    
    const footerContent = (
        <div>
            <Button label="No" icon="pi pi-times" onClick={handleClose} className="p-button-text" disabled={isDeleting} />
            <Button label="Yes" icon="pi pi-check" onClick={handleDelete} loading={isDeleting} autoFocus />
        </div>
    );

    const dialogHeader = (
        <div className={styles.warningDialogHeader}>
            <img src={alertIcon} alt="Warning" /> {/* Alt text added */}
            <h2>Deleting Tenant</h2> {/* Title cased and more specific */}
        </div>
    );

    return (
        // The outer div with "card px-2" might not be necessary if Dialog handles all styling
        <Dialog
            header={dialogHeader}
            visible={visible}
            position={position || 'center'} // Default to center if no position is provided
            // style prop is overridden by Modal.module.css global styles for .p-dialog
            // To use specific width here, pass it via `className` and target in CSS module, or use inline style if absolutely necessary
            // className={styles.tenantWarningDialog} // Example specific class
            modal // Ensures it's a modal dialog
            onHide={handleClose}
            footer={footerContent}
            draggable={false}
            resizable={false}
            blockScroll // Prevent background scroll
        >
            <p className={styles.warningDialogContent}>
                Are you sure you want to delete this tenant? This action cannot be undone.
            </p>
        </Dialog>
    );
}

export default TenantWarningModal;