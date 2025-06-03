import React, { SetStateAction, useEffect, useState } from "react";
import { ModifyMachine } from "../../../../application/usecases/MachineUseCases/ModifyMachine";
import { DIIMachineProps } from "../../../../domain/entities/property-models/componentsProperties";
import { MachineRepositoryHttp } from "../../../../infraestructure/adapters/api/MachineRepositoryHttp";
import styles from "./../DisplayItemInfo.module.css";
import { Machine, MachineApi } from "../../../../domain/entities/models/machine";
import SelectClubOptions from "../../SelectClubOptions/SelectClubOptions";
import Loader from "../../Loader/Loader";
import { useNavigate } from "react-router";

const machineRepository = new MachineRepositoryHttp();
const modifyMachine = new ModifyMachine(machineRepository);

function DisplayItemInfoMachine({ object }: DIIMachineProps) {
    // States:
    const navigate = useNavigate();
    const [isDisabled, setIsDisabled] = useState(true);
    const [machineForm, setMachineForm] = useState<Omit<Machine, "state">>({
        machineCode: "",
        micronId: "",
        smartFridgeld: "",
        smartFridgePassword: "",
        terminalId: 0,
        tnaSerialNumber: "",
        rustdeskId: "",
        rustdeskPass: "",
        clubId: "",
        machineId: ""
    });

    // Functions:
    function itemMapper(item: MachineApi): SetStateAction<Omit<Machine, "state">> | null {
        if (item != null) {
            let dataMapped: Omit<Machine, "state"> = {
                machineCode: item.code,
                micronId: "default",
                smartFridgeld: item.smartFridgeId,
                smartFridgePassword: item.smartFridgePassword,
                terminalId: Number.parseInt(item.terminalId),
                tnaSerialNumber: item.toaSerialNumber,
                rustdeskId: item.rustdeskId,
                rustdeskPass: item.rustdeskPass,
                clubId: item.clubName,
                machineId: item.machineId
            }
            return dataMapped;
        }
        return null;
    }

    // Handlers:
    function onClickHandler() {
        setIsDisabled(previous => !previous)
    }

    function changeHandler(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = event.target;
        const mappedName = name === "clubEntityId" ? "clubId" : name;
        setMachineForm(prev => ({
            ...prev,
            [mappedName]: mappedName === "terminalId" ? Number(value) : value
        }));
    }

    async function submitHandler(event: React.FormEvent) {
        event.preventDefault();
        try {
            await modifyMachine.execute(machineForm);
            alert("Machine successfully modified!");
        } catch (error) {
            console.error(error);
            alert("An error has occurred");
        }
    }

    function backHandler() {
        navigate(-1);
    }

    // UseEffects:
    useEffect(() => {
        if (object) {
            const dataMapped = itemMapper(object);
            dataMapped == null ? "" : setMachineForm(dataMapped);
        }
    }, [object]);

    if (!object) {
        return (
            <Loader/>
        );
    }

    return (
        <>
            <form className={styles.frmCntnr} onSubmit={submitHandler}>
                <main className={styles.frmMnCntnr}>
                    <div className={styles.frmDv}>
                        <div className={styles.fpDiv}>
                            <label htmlFor="machineCode">Machine Code</label>
                            <input
                                className={styles.input}
                                id="machineCode"
                                name="machineCode"
                                type="text"
                                value={isDisabled ? object.code : machineForm.machineCode}
                                disabled={isDisabled}
                                placeholder={isDisabled ? "" : object.code}
                                onChange={changeHandler}
                            />
                        </div>
                        <div className={styles.fpDiv}>
                            <label htmlFor="clubName">Club Name</label>
                            {
                                isDisabled ?
                                    <input
                                        className={styles.input}
                                        id="clubName"
                                        type="text"
                                        disabled
                                        value={object.clubName}
                                    /> :
                                    <SelectClubOptions onSelectClub={changeHandler} />
                            }
                        </div>
                        <div className={styles.fpDiv}>
                            <label htmlFor="smartFridgeId">Smart Fridge Id</label>
                            <input
                                className={styles.input}
                                id="smartFridgeId"
                                name="smartFridgeld"
                                type="text"
                                value={isDisabled ? object.smartFridgeId : machineForm.smartFridgeld}
                                disabled={isDisabled}
                                placeholder={isDisabled ? "" : object.smartFridgeId}
                                onChange={changeHandler}
                            />
                        </div>
                        <div className={styles.fpDiv}>
                            <label htmlFor="terminalId">Terminal ID</label>
                            <input
                                className={styles.input}
                                id="terminalId"
                                name="terminalId"
                                type="text"
                                value={isDisabled ? object.terminalId : machineForm.terminalId}
                                disabled={isDisabled}
                                placeholder={isDisabled ? "" : object.terminalId}
                                onChange={changeHandler}
                            />
                        </div>
                    </div>
                    <div className={styles.frmDv}>
                        <div className={styles.fpDiv}>
                            <label htmlFor="rustdeskId">Rust Desk ID</label>
                            <input
                                className={styles.input}
                                id="rustdeskId"
                                name="rustdeskId"
                                type="text"
                                value={isDisabled ? object.rustdeskId : machineForm.rustdeskId}
                                disabled={isDisabled}
                                placeholder={isDisabled ? "" : object.rustdeskId}
                                onChange={changeHandler}
                            />
                        </div>
                        <div className={styles.fpDiv}>
                            <label htmlFor="rustdeskPass">Rust Desk Password</label>
                            <input
                                className={styles.input}
                                id="rustdeskPass"
                                name="rustdeskPass"
                                type="text"
                                value={isDisabled ? object.rustdeskPass : machineForm.rustdeskPass}
                                disabled={isDisabled}
                                placeholder={isDisabled ? "" : object.rustdeskPass}
                                onChange={changeHandler}
                            />
                        </div>
                        <div className={styles.fpDiv}>
                            <label htmlFor="smartFridgePassword">Smart Fridge Password</label>
                            <input
                                className={styles.input}
                                id="smartFridgePassword"
                                name="smartFridgePassword"
                                type="text"
                                value={isDisabled ? object.smartFridgePassword : machineForm.smartFridgePassword}
                                disabled={isDisabled}
                                placeholder={isDisabled ? "" : object.smartFridgePassword}
                                onChange={changeHandler}
                            />
                        </div>
                        <div className={styles.fpDiv}>
                            <label htmlFor="toaSerialNumber">Terminal Serial Number</label>
                            <input
                                className={styles.input}
                                id="toaSerialNumber"
                                name="tnaSerialNumber"
                                type="text"
                                value={isDisabled ? object.toaSerialNumber : machineForm.tnaSerialNumber}
                                disabled={isDisabled}
                                placeholder={isDisabled ? "" : object.toaSerialNumber}
                                onChange={changeHandler}
                            />
                        </div>
                    </div>
                </main>
                <div className={styles.editButtonContainer}>
                    <button className={styles.button} type="button" onClick={onClickHandler}>Edit</button>
                    <button className={styles.button} type="submit">Save</button>
                    <button className={styles.button} type="button" onClick={backHandler}>Back</button>
                </div>
            </form>
        </>
    );
}

export default DisplayItemInfoMachine;