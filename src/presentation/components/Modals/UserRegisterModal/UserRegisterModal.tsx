import styles from "./../Modal.module.css";
import React, { useState, useCallback } from "react";
import { CreateUser } from "../../../../application/usecases/UserUseCases/CreateUser";
import { ModalProps } from "../../../../domain/entities/property-models/componentsProperties";
import { UserRepositoryHttp } from "../../../../infraestructure/adapters/api/UserRepositoryHttp";
import { User } from "../../../../domain/entities/models/user";
import SelectTenantOptions from "../../SelectTenantOptions/SelectTenantOptions";
import SelectClubOptions from "../../SelectClubOptions/SelectClubOptions";

// PrimeReact components
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password'; // For password fields
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton'; // For user type

const userRepo = new UserRepositoryHttp();
const createUser = new CreateUser(userRepo);

interface UserRegisterModalProps extends ModalProps {
    fetchUsers?: () => void; // Optional: function to refresh user list
}

function UserRegisterModal({ isOpen, onClose, toastRef, fetchUsers }: UserRegisterModalProps) {
    const initialFormData: Omit<User, "userId" | "clubName"> = {
        username: "",
        password: "",
        micronId: "",
        micronUser: "",
        micronPass: "",
        userType: 1, // Default to Club admin
        tenantId: "",
        clubId: ""
    };
    const [userForm, setUserForm] = useState(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const showSuccess = useCallback(() => {
        toastRef.current?.show({ severity: 'success', summary: 'Success', detail: 'User registered successfully.' });
    }, [toastRef]);

    const showError = useCallback((detail: string = 'Error registering user.') => {
        toastRef.current?.show({ severity: 'error', summary: 'Error', detail: detail, life: 3000 });
    }, [toastRef]);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserForm(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleUserTypeChange = useCallback((event: RadioButtonChangeEvent) => {
        setUserForm(prev => ({ ...prev, userType: Number(event.value) }));
    }, []);

    const handleTenantSelect = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        setUserForm(prev => ({ ...prev, tenantId: event.target.value, clubId: "" })); // Reset clubId when tenant changes
    }, []);

    const handleClubSelect = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        setUserForm(prev => ({ ...prev, clubId: event.target.value }));
    }, []);

    const handleSubmit = useCallback(async (event: React.FormEvent) => {
        event.preventDefault();
        if (!userForm.tenantId) {
            showError("Please select a Tenant.");
            return;
        }
        if (userForm.userType === 1 && !userForm.clubId) { // Club Admin requires a club
            showError("Please select a Club for Club Admin.");
            return;
        }
        setIsSubmitting(true);
        try {
            // If userType is Tenant Admin (2), clubId might not be relevant or should be handled server-side
            const payload = { ...userForm };
            if (payload.userType === 2) {
                // payload.clubId = ""; // Or handle as per backend requirements
            }
            await createUser.execute(payload);
            showSuccess();
            setUserForm(initialFormData); // Reset form
            onClose();
            fetchUsers?.(); // Refresh list
        } catch (err: any) {
            console.error("User registration error:", err);
            showError(err.message || 'An unexpected error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    }, [userForm, onClose, showSuccess, showError, fetchUsers, initialFormData]);

    const dialogFooter = (
        <div>
            <Button label="Cancel" icon="pi pi-times" onClick={onClose} className="p-button-text" disabled={isSubmitting} />
            <Button label="Register" icon="pi pi-check" onClick={handleSubmit} autoFocus loading={isSubmitting} />
        </div>
    );

    return (
        <Dialog
            header="Register User"
            visible={isOpen}
            style={{ width: '50vw' }} // Responsive width by Modal.module.css
            modal
            footer={dialogFooter}
            onHide={onClose}
            blockScroll
        >
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputPack}>
                    <label htmlFor="username">Username</label>
                    <InputText id="username" name="username" value={userForm.username} onChange={handleChange} required />
                </div>
                <div className={styles.inputPack}>
                    <label htmlFor="password">Password</label>
                    <Password id="password" name="password" value={userForm.password} onChange={handleChange} required feedback={false} toggleMask />
                </div>
                <div className={styles.inputPack}>
                    <label htmlFor="micronId">User Micron ID</label>
                    <InputText id="micronId" name="micronId" value={userForm.micronId} onChange={handleChange} required />
                </div>
                <div className={styles.inputPack}>
                    <label htmlFor="micronUser">Micron Username</label>
                    <InputText id="micronUser" name="micronUser" value={userForm.micronUser} onChange={handleChange} required />
                </div>
                <div className={styles.inputPack}>
                    <label htmlFor="micronPass">Micron Password</label>
                    <Password id="micronPass" name="micronPass" value={userForm.micronPass} onChange={handleChange} required feedback={false} toggleMask />
                </div>

                <div className={styles.inputPack}>
                    <label>User Role</label>
                    <div className={styles.radioButtons}>
                        <div className={styles.radioButtonItem}>
                            <RadioButton inputId="userTypeClub" name="userType" value={1} onChange={handleUserTypeChange} checked={userForm.userType === 1} />
                            <label htmlFor="userTypeClub">Club Admin</label>
                        </div>
                        <div className={styles.radioButtonItem}>
                            <RadioButton inputId="userTypeTenant" name="userType" value={2} onChange={handleUserTypeChange} checked={userForm.userType === 2} />
                            <label htmlFor="userTypeTenant">Tenant Admin</label>
                        </div>
                    </div>
                </div>

                <div className={styles.inputPack}>
                    <label htmlFor="tenantId">Tenant</label>
                    <SelectTenantOptions onSelectTenant={handleTenantSelect} currentTenantId={userForm.tenantId} />
                </div>

                {userForm.userType === 1 && ( // Only show Club selection for Club Admin
                    <div className={styles.inputPack}>
                        <label htmlFor="clubId">Club</label>
                        <SelectClubOptions onSelectClub={handleClubSelect} currentClubId={userForm.clubId} tenantId={userForm.tenantId} />
                    </div>
                )}
            </form>
        </Dialog>
    );
}

export default UserRegisterModal;