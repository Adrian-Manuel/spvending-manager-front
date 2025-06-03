import React, { SetStateAction, useEffect, useState } from "react";
import { DIIClubProps } from "../../../../domain/entities/property-models/componentsProperties";
import styles from "./../DisplayItemInfo.module.css";
import { Club, ClubApi } from "../../../../domain/entities/models/club";
import { ClubRepositoryHttp } from "../../../../infraestructure/adapters/api/ClubRepositoryHttp";
import { ModifyClub } from "../../../../application/usecases/ClubUseCases/ModifyClub";
import SelectTenantOptions from "../../SelectTenantOptions/SelectTenantOptions";
import Loader from "../../Loader/Loader";
import { useNavigate } from "react-router";

const clubRepo = new ClubRepositoryHttp();
const modifyClub = new ModifyClub(clubRepo);

function DisplayItemInfoClub({ object }: DIIClubProps) {
    // States:
    const navigate = useNavigate();
    const [isDisabled, setIsDisabled] = useState(true);
    const [clubFormData, setClubFormData] = useState<Omit<Club, "numberOfMachines">>({
        clubName: "",
        cif: 0,
        address: "",
        phone: 0,
        email: "",
        remark: "",
        micronId: "",
        accountingId: "",
        tenantId: "",
        clubId: ""
    });

    // Functions: 
    function itemMapper(item: ClubApi): SetStateAction<Omit<Club, "numberOfMachines">> | null {
        if (item != null) {
            let dataMapped: Omit<Club, "numberOfMachines"> = {
                clubName: item.name,
                cif: Number.parseInt(item.cif),
                address: item.address,
                phone: Number.parseInt(item.phone),
                email: item.email,
                remark: item.remark,
                micronId: item.micronId,
                accountingId: item.accountingId,
                tenantId: item.tenantEntityName,
                clubId: item.clubId
            }
            return dataMapped;
        }
        return null
    }

    // Handlers: 
    function onClickHandler() {
        setIsDisabled(previous => !previous);
    }

    function changeHandler(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = event.target;
        setClubFormData(prev => ({
            ...prev,
            [name]: name === "cif" || name === "phone" ? Number(value) : value
        }));
    }

    async function submitHandler(event: React.FormEvent) {
        event.preventDefault();
        try {
            await modifyClub.execute(clubFormData);
            alert("Club successfully modified!");
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
            dataMapped == null ? "" : setClubFormData(dataMapped);
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
                            <label htmlFor="clubName">Club Name</label>
                            <input
                                className={styles.input}
                                id="clubName"
                                name="clubName"
                                type="text"
                                value={isDisabled ? object.name : clubFormData.clubName}
                                disabled={isDisabled}
                                placeholder={isDisabled ? "" : object.name}
                                onChange={changeHandler}
                            />
                        </div>
                        <div className={styles.fpDiv}>
                            <label htmlFor="tenantEntity">Tenant Owner</label>
                            {
                                isDisabled ?
                                    <input
                                        className={styles.input}    
                                        id="tenantEntity"
                                        name="tenantId"
                                        type="text"
                                        disabled
                                        value={object.tenantEntityName}
                                    /> :
                                    <SelectTenantOptions onSelectTenant={changeHandler} />
                            }
                        </div>
                        <div className={styles.fpDiv}>
                            <label htmlFor="address">Club Address</label>
                            <input
                                className={styles.input}
                                id="address"
                                name="address"
                                type="text"
                                value={isDisabled ? object.address : clubFormData.address}
                                disabled={isDisabled}
                                placeholder={isDisabled ? "" : object.address}
                                onChange={changeHandler}
                            />
                        </div>
                        <div className={styles.fpDiv}>
                            <label htmlFor="email">Club email</label>
                            <input
                                className={styles.input}
                                id="email"
                                name="email"
                                type="text"
                                value={isDisabled ? object.email : clubFormData.email}
                                disabled={isDisabled}
                                placeholder={isDisabled ? "" : object.email}
                                onChange={changeHandler}
                            />
                        </div>
                        <div className={styles.fpDiv}>
                            <label htmlFor="remark">Remark</label>
                            <input
                                className={styles.input}
                                id="remark"
                                name="remark"
                                type="text"
                                value={isDisabled ? object.remark : clubFormData.remark}
                                disabled={isDisabled}
                                placeholder={isDisabled ? "" : object.remark}
                                onChange={changeHandler}
                            />
                        </div>
                    </div>
                    <div className={styles.frmDv}>
                        <div className={styles.fpDiv}>
                            <label htmlFor="clubCIF">CIF</label>
                            <input
                                className={styles.input}
                                id="clubCIF"
                                name="cif"
                                type="text"
                                value={isDisabled ? object.cif : clubFormData.cif}
                                disabled={isDisabled}
                                placeholder={isDisabled ? "" : object.cif}
                                onChange={changeHandler}
                            />
                        </div>
                        <div className={styles.fpDiv}>
                            <label htmlFor="accountingId">Accounting ID</label>
                            <input
                                className={styles.input}
                                id="accountingId"
                                name="accountingId"
                                type="text"
                                value={isDisabled ? object.accountingId : clubFormData.accountingId}
                                disabled={isDisabled}
                                placeholder={isDisabled ? "" : object.accountingId}
                                onChange={changeHandler}
                            />
                        </div>
                        <div className={styles.fpDiv}>
                            <label htmlFor="phone">Phone</label>
                            <input
                                className={styles.input}
                                id="phone"
                                name="phone"
                                type="text"
                                value={isDisabled ? object.phone : clubFormData.phone}
                                disabled={isDisabled}
                                placeholder={isDisabled ? "" : object.phone}
                                onChange={changeHandler}
                            />
                        </div>
                        <div className={styles.fpDiv}>
                            <label htmlFor="micronId">Micron ID</label>
                            <input
                                className={styles.input}
                                id="micronId"
                                name="micronId"
                                type="text"
                                value={isDisabled ? object.micronId : clubFormData.micronId}
                                disabled={isDisabled}
                                placeholder={isDisabled ? "" : object.micronId}
                                onChange={changeHandler}
                            />
                        </div>
                        <div className={styles.fpDiv}>
                            <label htmlFor="managers">Managers</label>
                            <input
                                className={styles.input}
                                id="managers"
                                type="text"
                                value={object.userManagers}
                                disabled
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

export default DisplayItemInfoClub;