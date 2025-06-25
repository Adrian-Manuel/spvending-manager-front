import styles from "./../Modal.module.css";
import React, { useState, useCallback } from "react";
import { CreateMachine } from "../../../../application/usecases/MachineUseCases/CreateMachine";
import { ModalProps } from "../../../../domain/entities/property-models/componentsProperties";
import { MachineRepositoryHttp } from "../../../../infraestructure/adapters/api/MachineRepositoryHttp";
import { Machine } from "../../../../domain/entities/models/machine";
import SelectClubOptions from "../../SelectClubOptions/SelectClubOptions"; // Ensure this is responsive

// PrimeReact components
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
// import { Password } from 'primereact/password'; // For password fields if needed

const machineRepository = new MachineRepositoryHttp();
const createMachine = new CreateMachine(machineRepository);

interface MachineRegisterModalProps extends ModalProps {
    fetchMachines?: () => void; // Optional: function to refresh machine list
}

function MachineRegisterModal({ isOpen, onClose, toastRef, fetchMachines }: MachineRegisterModalProps) {
    const initialFormData: Omit<Machine, "machineId" | "state"> = {
        machineCode: "",
        micronId: "",
        smartFridgeld: "",
        smartFridgePassword: "",
        terminalId: 0,
        tnaSerialNumber: "",
        rustdeskId: "",
        rustdeskPass: "",
        clubId: "", // This will be set by SelectClubOptions
    };
    const [machineFormData, setMachineFormData] = useState(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const showSuccess = useCallback(() => {
        toastRef.current?.show({ severity: 'success', summary: 'Success', detail: 'Machine registered successfully.' });
    }, [toastRef]);

    const showError = useCallback((detail: string = 'Error registering machine.') => {
        toastRef.current?.show({ severity: 'error', summary: 'Error', detail: detail, life: 3000 });
    }, [toastRef]);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setMachineFormData(prev => ({
            ...prev,
            [name]: name === "terminalId" ? (value === "" ? 0 : Number(value)) : value
        }));
    }, []);

    const handleClubSelect = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        setMachineFormData(prev => ({ ...prev, clubId: event.target.value }));
    }, []);


    const handleSubmit = useCallback(async (event: React.FormEvent) => {
        event.preventDefault();
        if (!machineFormData.clubId) {
            showError("Please select a Club.");
            return;
        }
        setIsSubmitting(true);
        try {
            await createMachine.execute(machineFormData);
            showSuccess();
            setMachineFormData(initialFormData); // Reset form
            onClose();
            fetchMachines?.(); // Refresh list
        } catch (err: any) {
            console.error("Machine registration error:", err);
            showError(err.message || 'An unexpected error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    }, [machineFormData, onClose, showSuccess, showError, fetchMachines, initialFormData]);

    const dialogFooter = (
        <div>
            <Button label="Cancel" icon="pi pi-times" onClick={onClose} className="p-button-text" disabled={isSubmitting} />
            <Button label="Register" icon="pi pi-check" onClick={handleSubmit} autoFocus loading={isSubmitting} />
        </div>
    );

    return (
        <Dialog
            header="Register Machine"
            visible={isOpen}
            style={{ width: '50vw' }} // Responsive width by Modal.module.css
            modal
            footer={dialogFooter}
            onHide={onClose}
            blockScroll
        >
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputPack}>
                    <label htmlFor="machineCode">Machine Code</label>
                    <InputText id="machineCode" name="machineCode" value={machineFormData.machineCode} onChange={handleChange} required />
                </div>
                <div className={styles.inputPack}>
                    <label htmlFor="micronId">Micron ID</label>
                    <InputText id="micronId" name="micronId" value={machineFormData.micronId} onChange={handleChange} required />
                </div>
                <div className={styles.inputPack}>
                    <label htmlFor="smartFridgeld">Smart Fridge ID</label>
                    <InputText id="smartFridgeld" name="smartFridgeld" value={machineFormData.smartFridgeld} onChange={handleChange} required />
                </div>
                <div className={styles.inputPack}>
                    <label htmlFor="smartFridgePassword">Smart Fridge Password</label>
                    <InputText id="smartFridgePassword" name="smartFridgePassword" type="password" value={machineFormData.smartFridgePassword} onChange={handleChange} required />
                    {/* <Password id="smartFridgePassword" name="smartFridgePassword" value={machineFormData.smartFridgePassword} onChange={handleChange} required feedback={false} toggleMask /> */}
                </div>
                <div className={styles.inputPack}>
                    <label htmlFor="terminalId">Terminal ID</label>
                    <InputText id="terminalId" name="terminalId" value={String(machineFormData.terminalId === 0 ? '' : machineFormData.terminalId)} onChange={handleChange} type="number" required />
                </div>
                <div className={styles.inputPack}>
                    <label htmlFor="tnaSerialNumber">TNA Serial Number</label>
                    <InputText id="tnaSerialNumber" name="tnaSerialNumber" value={machineFormData.tnaSerialNumber} onChange={handleChange} required />
                </div>
                <div className={styles.inputPack}>
                    <label htmlFor="rustdeskId">RustDesk ID</label>
                    <InputText id="rustdeskId" name="rustdeskId" value={machineFormData.rustdeskId} onChange={handleChange} required />
                </div>
                <div className={styles.inputPack}>
                    <label htmlFor="rustdeskPass">RustDesk Password</label>
                    <InputText id="rustdeskPass" name="rustdeskPass" type="password" value={machineFormData.rustdeskPass} onChange={handleChange} required />
                    {/* <Password id="rustdeskPass" name="rustdeskPass" value={machineFormData.rustdeskPass} onChange={handleChange} required feedback={false} toggleMask /> */}
                </div>
                <div className={styles.inputPack}>
                    <label htmlFor="clubId">Club</label>
                    <SelectClubOptions onSelectClub={handleClubSelect} currentClubId={machineFormData.clubId} />
                </div>
            </form>
        </Dialog>
    );
}

export default MachineRegisterModal;