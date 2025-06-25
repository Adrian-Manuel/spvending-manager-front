import styles from "./../Modal.module.css"; // Shared modal styles
import React, { useState, useCallback } from "react";
import { CreateTenant } from "../../../../application/usecases/TenantUseCases/CreateTenant";
import { ModalProps } from "../../../../domain/entities/property-models/componentsProperties";
import { TenantRepositoryHttp } from "../../../../infraestructure/adapters/api/TenantRepositoryHttp";
import { Tenant } from "../../../../domain/entities/models/tenant";

// PrimeReact components for form elements
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
// import { InputTextarea } from 'primereact/inputtextarea'; // For remarks if needed

const tenantRepo = new TenantRepositoryHttp();
const createTenant = new CreateTenant(tenantRepo);

// Extended ModalProps to include a function to refresh the list after successful creation
interface TenantRegisterModalProps extends ModalProps {
    fetchTenants?: () => void; // Optional: function to refresh tenant list
}

function TenantRegisterModal({ isOpen, onClose, toastRef, fetchTenants }: TenantRegisterModalProps) {
    const initialFormData: Omit<Tenant, "tenantId" | "numberOfClubs"> = {
        tenantName: "",
        cif: 0,
        address: "",
        phone: 0,
        email: "",
        remark: "",
        micronId: ""
    };
    const [tenantFormData, setTenantFormData] = useState(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const showSuccess = useCallback(() => {
        toastRef.current?.show({ severity: 'success', summary: 'Success', detail: 'Tenant registered successfully.' });
    }, [toastRef]);

    const showError = useCallback((detail: string = 'Error registering tenant. Please check the details.') => {
        toastRef.current?.show({ severity: 'error', summary: 'Error', detail: detail, life: 3000 });
    }, [toastRef]);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setTenantFormData(prev => ({
            ...prev,
            [name]: name === "cif" || name === "phone" ? (value === "" ? 0 : Number(value)) : value
        }));
    }, []);

    const handleSubmit = useCallback(async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);
        try {
            await createTenant.execute(tenantFormData);
            showSuccess();
            setTenantFormData(initialFormData); // Reset form
            onClose();
            fetchTenants?.(); // Refresh tenant list if function is provided
        } catch (err: any) {
            console.error("Tenant registration error:", err);
            showError(err.message || 'An unexpected error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    }, [tenantFormData, onClose, showSuccess, showError, fetchTenants, initialFormData]);

    const dialogFooter = (
        <div>
            <Button label="Cancel" icon="pi pi-times" onClick={onClose} className="p-button-text" disabled={isSubmitting} />
            <Button label="Register" icon="pi pi-check" onClick={handleSubmit} autoFocus loading={isSubmitting} />
        </div>
    );

    // No need to return null if !isOpen, Dialog handles visibility with its 'visible' prop
    return (
        <Dialog
            header="Register Tenant"
            visible={isOpen}
            style={{ width: '50vw' }} // Responsive width is handled by Modal.module.css
            modal
            footer={dialogFooter}
            onHide={onClose}
            blockScroll // Prevent background scrolling when modal is open
        >
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputPack}>
                    <label htmlFor="tenantName">Tenant Name</label>
                    <InputText id="tenantName" name="tenantName" value={tenantFormData.tenantName} onChange={handleChange} required placeholder="e.g., Example Corp" />
                </div>
                <div className={styles.inputPack}>
                    <label htmlFor="cif">CIF</label>
                    <InputText id="cif" name="cif" value={String(tenantFormData.cif === 0 ? '' : tenantFormData.cif)} onChange={handleChange} type="number" required placeholder="e.g., 123456789" />
                </div>
                <div className={styles.inputPack}>
                    <label htmlFor="address">Address</label>
                    <InputText id="address" name="address" value={tenantFormData.address} onChange={handleChange} required placeholder="e.g., 123 Main St, Anytown" />
                </div>
                <div className={styles.inputPack}>
                    <label htmlFor="phone">Phone</label>
                    <InputText id="phone" name="phone" value={String(tenantFormData.phone === 0 ? '' : tenantFormData.phone)} onChange={handleChange} type="number" required placeholder="e.g., 555123456" />
                </div>
                <div className={styles.inputPack}>
                    <label htmlFor="email">Email</label>
                    <InputText id="email" name="email" value={tenantFormData.email} onChange={handleChange} type="email" required placeholder="e.g., contact@example.com" />
                </div>
                <div className={styles.inputPack}>
                    <label htmlFor="remark">Remark</label>
                    <InputText id="remark" name="remark" value={tenantFormData.remark} onChange={handleChange} placeholder="Optional notes" />
                    {/* <InputTextarea id="remark" name="remark" value={tenantFormData.remark} onChange={(e) => handleChange(e as any)} rows={3} placeholder="Optional notes" /> */}
                </div>
                <div className={styles.inputPack}>
                    <label htmlFor="micronId">Micron ID</label>
                    <InputText id="micronId" name="micronId" value={tenantFormData.micronId} onChange={handleChange} required placeholder="Unique Micron Identifier" />
                </div>
                {/* Buttons are now in dialogFooter */}
            </form>
        </Dialog>
    );
}

export default TenantRegisterModal;