import styles from "./../Modal.module.css"
import React, { useState } from "react";
import { CreateMachine } from "../../../../application/usecases/MachineUseCases/CreateMachine";
import { ModalProps } from "../../../../domain/entities/property-models/componentsProperties";
import { MachineRepositoryHttp } from "../../../../infraestructure/adapters/api/MachineRepositoryHttp";
import { Machine } from "../../../../domain/entities/models/machine";
import SelectClubOptions from "../../SelectClubOptions/SelectClubOptions";

const machineRepository = new MachineRepositoryHttp();
const createMachine = new CreateMachine(machineRepository);

function MachineRegisterModal({ isOpen, onClose, toastRef }: ModalProps) {
    // States: 
    const [machineFormData, setMachineFormData] = useState<Omit<Machine, "machineId" | "state">>({
        machineCode: "",
        micronId: "",
        smartFridgeld: "",
        smartFridgePassword: "",
        terminalId: 0,
        tnaSerialNumber: "",
        rustdeskId: "",
        rustdeskPass: "",
        clubId: "",
    });

    const showSuccess = ()=> {
        toastRef.current?.show({ severity: 'success', summary: 'Success', detail: 'Tenant modified successfully.' });
    }

    const showError = () => {
        toastRef.current?.show({severity:'error', summary: 'Error', detail:'Error modifying tenant', life: 3000});
    }

    // Handlers:
    function changeHandler(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = event.target;
        const mappedName = name === "clubEntityId" ? "clubId" : name;
        setMachineFormData({
            ...machineFormData,
            [mappedName]: mappedName === "terminalId" ? Number(value) : value
        });
    }

    async function submitHandler(event: React.FormEvent) {
        event.preventDefault();
        try {
            const fetchData = await createMachine.execute(machineFormData);
            console.log(fetchData);
            showSuccess();
            onClose();
            // TODO: Implement a timer for page reload
            window.location.reload();
        } catch {
            showError();
        }
    }

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2 className={styles.h2}>REGISTER MACHINE</h2>
                <form onSubmit={submitHandler} className={styles.form}>
                    <div className={styles.inputPack}>
                        <label htmlFor="">Machine Code: </label>
                        <input
                            name="machineCode"
                            value={machineFormData.machineCode}
                            onChange={changeHandler}
                            placeholder="Machine code"
                            type="text"
                            required
                        />
                    </div>
                    <div className={styles.inputPack}>
                    <label htmlFor="">Machine Micron ID: </label>
                        <input
                            name="micronId"
                            value={machineFormData.micronId}
                            onChange={changeHandler}
                            placeholder="Micron ID"
                            type="text"
                            required
                        />
                    </div>
                    <div className={styles.inputPack}>
                    <label htmlFor="">Machine Smart Fridgeld: </label>
                        <input
                            name="smartFridgeld"
                            value={machineFormData.smartFridgeld}
                            onChange={changeHandler}
                            placeholder="Smart Fridgeld"
                            type="text"
                            required
                        />
                    </div>
                    <div className={styles.inputPack}>
                    <label htmlFor="">Machine Smart Fridgeld Password: </label>
                        <input
                            name="smartFridgePassword"
                            value={machineFormData.smartFridgePassword}
                            onChange={changeHandler}
                            placeholder="Smart Fridgeld Password"
                            type="text"
                            required
                        />
                    </div>
                    <div className={styles.inputPack}>
                    <label htmlFor="">Machine Terminal ID: </label>
                        <input
                            name="terminalId"
                            value={machineFormData.terminalId}
                            onChange={changeHandler}
                            placeholder="Terminal ID"
                            type="number"
                            required
                        />
                    </div>
                    <div className={styles.inputPack}>
                    <label htmlFor="">Machine Terminal Serial Number: </label>
                        <input
                            name="tnaSerialNumber"
                            value={machineFormData.tnaSerialNumber}
                            onChange={changeHandler}
                            placeholder="Terminal Serial Number"
                            type="text"
                            required
                        />
                    </div>
                    <div className={styles.inputPack}>
                    <label htmlFor="">Machine RustDesk ID: </label>
                        <input
                            name="rustdeskId"
                            value={machineFormData.rustdeskId}
                            onChange={changeHandler}
                            placeholder="RustDesk ID"
                            type="text"
                            required
                        />
                    </div>
                    <div className={styles.inputPack}>
                    <label htmlFor="">Machine RustDesk password: </label>
                        <input
                            name="rustdeskPass"
                            value={machineFormData.rustdeskPass}
                            onChange={changeHandler}
                            placeholder="RustDesk password"
                            type="text"
                            required
                        />
                    </div>
                    <div className={styles.inputPack}>
                        <SelectClubOptions onSelectClub={changeHandler} />
                    </div>
                    <div className={styles.buttonsContainer}>
                        <button className={styles.button} type="submit">Registrar</button>
                        <button className={styles.button} type="button" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default MachineRegisterModal;