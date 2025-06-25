import styles from "./../Modal.module.css";
import React, { useState, useCallback } from "react";
import { ModalProps } from "../../../../domain/entities/property-models/componentsProperties";
import { Club } from "../../../../domain/entities/models/club";
import { ClubRepositoryHttp } from "../../../../infraestructure/adapters/api/ClubRepositoryHttp";
import { CreateClub } from "../../../../application/usecases/ClubUseCases/CreateClub";
import SelectTenantOptions from "../../SelectTenantOptions/SelectTenantOptions"; // Ensure this is responsive

// PrimeReact components
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
// import { DropdownChangeEvent } from "primereact/dropdown"; // For SelectTenantOptions if it uses PrimeReact Dropdown

const clubRepo = new ClubRepositoryHttp();
const createClub = new CreateClub(clubRepo);

interface ClubRegisterModalProps extends ModalProps {
    fetchClubs?: () => void; // Optional: function to refresh club list
}

function ClubRegisterModal({ isOpen, onClose, toastRef, fetchClubs }: ClubRegisterModalProps) {
    const initialFormData: Omit<Club, "clubId" | "numberOfMachines"> = {
        clubName: "",
        cif: 0,
        address: "",
        phone: 0,
        email: "",
        remark: "",
        micronId: "",
        accountingId: "",
        tenantId: "", // This will be set by SelectTenantOptions
    };
    const [clubFormData, setClubFormData] = useState(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const showSuccess = useCallback(() => {
        toastRef.current?.show({ severity: 'success', summary: 'Success', detail: 'Club registered successfully.' });
    }, [toastRef]);

    const showError = useCallback((detail: string = 'Error registering club.') => {
        toastRef.current?.show({ severity: 'error', summary: 'Error', detail: detail, life: 3000 });
    }, [toastRef]);

    // Combined handler for regular inputs and the tenant select
    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement /*| DropdownChangeEvent*/>) => {
        const { name, value } = event.target;

        // Check if the event is from SelectTenantOptions (assuming it sets name="tenantId")
        // Or if it's a PrimeReact DropdownChangeEvent, the value might be in event.value
        // const val = (event.originalEvent && (event.originalEvent.target as HTMLInputElement).type === 'select-one') ? event.value : value;

        setClubFormData(prev => ({
            ...prev,
            [name]: (name === "cif" || name === "phone") ? (value === "" ? 0 : Number(value)) : value
        }));
    }, []);

    const handleTenantSelect = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        setClubFormData(prev => ({ ...prev, tenantId: event.target.value }));
    }, []);


    const handleSubmit = useCallback(async (event: React.FormEvent) => {
        event.preventDefault();
        if (!clubFormData.tenantId) {
            showError("Please select a Tenant.");
            return;
        }
        setIsSubmitting(true);
        try {
            await createClub.execute(clubFormData);
            showSuccess();
            setClubFormData(initialFormData); // Reset form
            onClose();
            fetchClubs?.(); // Refresh list
        } catch (err: any) {
            console.error("Club registration error:", err);
            showError(err.message || 'An unexpected error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    }, [clubFormData, onClose, showSuccess, showError, fetchClubs, initialFormData]);

    const dialogFooter = (
        <div>
            <Button label="Cancel" icon="pi pi-times" onClick={onClose} className="p-button-text" disabled={isSubmitting} />
            <Button label="Register" icon="pi pi-check" onClick={handleSubmit} autoFocus loading={isSubmitting} />
        </div>
    );

    return (
        <Dialog
            header="Register Club"
            visible={isOpen}
            style={{ width: '50vw' }} // Responsive width handled by Modal.module.css
            modal
            footer={dialogFooter}
            onHide={onClose}
            blockScroll
        >
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputPack}>
                    <label htmlFor="clubName">Club Name</label>
                    <InputText id="clubName" name="clubName" value={clubFormData.clubName} onChange={handleChange} required />
                </div>
                <div className={styles.inputPack}>
                    <label htmlFor="cif">CIF</label>
                    <InputText id="cif" name="cif" value={String(clubFormData.cif === 0 ? '' : clubFormData.cif)} onChange={handleChange} type="number" required />
                </div>
                <div className={styles.inputPack}>
                    <label htmlFor="address">Address</label>
                    <InputText id="address" name="address" value={clubFormData.address} onChange={handleChange} required />
                </div>
                <div className={styles.inputPack}>
                    <label htmlFor="phone">Phone</label>
                    <InputText id="phone" name="phone" value={String(clubFormData.phone === 0 ? '' : clubFormData.phone)} onChange={handleChange} type="number" required />
                </div>
                <div className={styles.inputPack}>
                    <label htmlFor="email">Email</label>
                    <InputText id="email" name="email" value={clubFormData.email} onChange={handleChange} type="email" required />
                </div>
                <div className={styles.inputPack}>
                    <label htmlFor="remark">Remark</label>
                    <InputText id="remark" name="remark" value={clubFormData.remark} onChange={handleChange} />
                </div>
                <div className={styles.inputPack}>
                    <label htmlFor="micronId">Micron ID</label>
                    <InputText id="micronId" name="micronId" value={clubFormData.micronId} onChange={handleChange} required />
                </div>
                <div className={styles.inputPack}>
                    <label htmlFor="accountingId">Accounting ID</label>
                    <InputText id="accountingId" name="accountingId" value={clubFormData.accountingId} onChange={handleChange} required />
                </div>
                <div className={styles.inputPack}>
                    {/* SelectTenantOptions should internally use PrimeReact's Dropdown for consistency and styling */}
                    {/* It should accept a value prop for controlled component behavior and an onChange prop that provides a ChangeEvent-like object or the direct value */}
                    <label htmlFor="tenantId">Tenant</label> {/* Added label for clarity */}
                    <SelectTenantOptions onSelectTenant={handleTenantSelect} currentTenantId={clubFormData.tenantId} />
                </div>
            </form>
        </Dialog>
    );
}

export default ClubRegisterModal;