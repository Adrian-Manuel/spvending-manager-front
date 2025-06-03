import { SetStateAction, useEffect, useRef, useState } from "react";
import { DIITenantProps } from "../../../../domain/entities/property-models/componentsProperties";
import styles from "./../DisplayItemInfo.module.css";
import { Tenant, TenantApi } from "../../../../domain/entities/models/tenant";
import { TenantRepositoryHttp } from "../../../../infraestructure/adapters/api/TenantRepositoryHttp";
import { ModifyTenant } from "../../../../application/usecases/TenantUseCases/ModifyTenant";
import Loader from "../../Loader/Loader";
import { useNavigate } from "react-router";
import { Toast } from "primereact/toast";

const tenantRepo = new TenantRepositoryHttp();
const modifyTenant = new ModifyTenant(tenantRepo);

function DisplayItemInfoTenant({ object }: DIITenantProps) {
    // States:
    const navigate = useNavigate();
    const toast = useRef<Toast>(null);
    const [isDisabled, setIsDisabled] = useState(true);
    const [tenantForm, setTenantForm] = useState<Omit<Tenant, "numberOfClubs">>({
        tenantName: "",
        cif: 0,
        address: "",
        phone: 0,
        email: "",
        remark: "",
        micronId: "",
        tenantId: ""
    });
    const showSuccess = ()=> {
        toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Tenant modified successfully.' });
    }

    const showError = () => {
        toast.current?.show({severity:'error', summary: 'Error', detail:'Error modifying tenant', life: 3000});
    }

    // Functions:
    function itemMapper(item: TenantApi): SetStateAction<Omit<Tenant, "numberOfClubs">> | null {
        if (item != null) {
            let dataMapped: Omit<Tenant, "numberOfClubs"> = {
                tenantName: item.name,
                cif: Number.parseInt(item.cif),
                address: item.address,
                phone: Number.parseInt(item.phone),
                email: item.email,
                remark: item.remark,
                micronId: item.micronId,
                tenantId: item.tenantId
            };
            return dataMapped
        }
        return null;
    }

    // Handlers:
    function onClickHandler() {
        setIsDisabled(previous => !previous);
    }

    function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setTenantForm(prev => ({
            ...prev,
            [name]: name === "cif" || name === "phone" ? Number(value) : value
        }));
    }

    async function submitHandler(event: React.FormEvent) {
        event.preventDefault();
        try {
            // ? Question: Can managers be modified in the tenant tab?
            if (tenantForm.tenantId) {
                await modifyTenant.execute(tenantForm);
                showSuccess();
            }
        } catch (error) {
            console.error(error);
            showError();
        }
    }

    function backHandler() {
        navigate(-1);
    }

    // UseEffects: 
    useEffect(() => {
        if (object) {
            const dataMapped = itemMapper(object);
            dataMapped == null ? "" : setTenantForm(dataMapped);
        }
    }, [object]);

    if (!object) {
        return (
            <Loader/>
        );
    }

    return (
        <>
            <Toast ref={toast}/>
            <form className={styles.frmCntnr} onSubmit={submitHandler}>
                <main className={styles.frmMnCntnr}>
                    <div className={styles.frmDv}>
                        <div className={styles.fpDiv}>
                            <label htmlFor="tenantName">Tenant Name</label>
                            <input
                                className={styles.input}
                                id="tenantName"
                                name="tenantName"
                                type="text"
                                value={isDisabled ? object.name : tenantForm.tenantName}
                                disabled={isDisabled}
                                placeholder={isDisabled ? "" : object.name}
                                onChange={changeHandler}
                            />
                        </div>
                        <div className={styles.fpDiv}>
                            <label htmlFor="address">Tenant Address</label>
                            <input
                                className={styles.input}
                                id="address"
                                name="address"
                                type="text"
                                value={isDisabled ? object.address : tenantForm.address}
                                disabled={isDisabled}
                                placeholder={isDisabled ? "" : object.address}
                                onChange={changeHandler}
                            />
                        </div>
                        <div className={styles.fpDiv}>
                            <label htmlFor="email">Tenant email</label>
                            <input
                                className={styles.input}
                                id="email"
                                name="email"
                                type="text"
                                value={isDisabled ? object.email : tenantForm.email}
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
                                value={isDisabled ? object.remark : tenantForm.remark}
                                disabled={isDisabled}
                                placeholder={isDisabled ? "" : object.remark}
                                onChange={changeHandler}
                            />
                        </div>
                    </div>
                    <div className={styles.frmDv}>
                        <div className={styles.fpDiv}>
                            <label htmlFor="tenantCIF">CIF</label>
                            <input
                                className={styles.input}
                                id="tenantCIF"
                                name="cif"
                                type="text"
                                value={isDisabled ? object.cif : tenantForm.cif}
                                disabled={isDisabled}
                                placeholder={isDisabled ? "" : object.cif}
                                onChange={changeHandler}
                            />
                        </div>
                        <div className={styles.fpDiv}>
                            <label htmlFor="phone">Phone</label>
                            <input
                                className={styles.input}
                                id="phone"
                                name="phone"
                                type="phone"
                                value={isDisabled ? object.phone : tenantForm.phone}
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
                                type="text"
                                value={isDisabled ? object.micronId : tenantForm.micronId}
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
                                value={object.managers}
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

export default DisplayItemInfoTenant;