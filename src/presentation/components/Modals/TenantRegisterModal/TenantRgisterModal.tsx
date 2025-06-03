import styles from "./../Modal.module.css"
import React, { useState } from "react";
import { CreateTenant } from "../../../../application/usecases/TenantUseCases/CreateTenant";
import { ModalProps } from "../../../../domain/entities/property-models/componentsProperties";
import { TenantRepositoryHttp } from "../../../../infraestructure/adapters/api/TenantRepositoryHttp";
import { Tenant } from "../../../../domain/entities/models/tenant";

const tenantRepo = new TenantRepositoryHttp();
const createTenant = new CreateTenant(tenantRepo);

function TenantRegisterModal({ isOpen, onClose, toastRef }: ModalProps) {
    // States:
    const [tenantFormData, setTenantFormData] = useState<Omit<Tenant, "tenantId" | "numberOfClubs">>({
        tenantName: "",
        cif: 0,
        address: "",
        phone: 0,
        email: "",
        remark: "",
        micronId: ""
    });

    const showSuccess = ()=> {
        toastRef.current?.show({ severity: 'success', summary: 'Success', detail: 'Tenant modified successfully.' });
    }

    const showError = () => {
        toastRef.current?.show({severity:'error', summary: 'Error', detail:'Error modifying tenant', life: 3000});
    }

    // Handlers
    function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setTenantFormData({
            ...tenantFormData,
            [name]: name === "cif" || name === "phone" ? Number(value) : value
        });
    }

    async function submitHandler(event: React.FormEvent) {
        event.preventDefault();
        try {
            const fetchData = await createTenant.execute(tenantFormData);
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
                <h2 className={styles.h2}>REGISTER TENANT</h2>
                <form onSubmit={submitHandler} className={styles.form}>
                    <div className={styles.inputPack}>
                        <label>Tenant Name: </label>
                        <input name="tenantName" placeholder="Nombre" value={tenantFormData.tenantName} onChange={changeHandler} required />
                    </div>
                    <div className={styles.inputPack}>
                        <label>Tenant CIF: </label>
                        <input name="cif" placeholder="CIF" value={tenantFormData.cif || ""} onChange={changeHandler} type="number" required />
                    </div>
                    <div className={styles.inputPack}>
                        <label>Tenant Address: </label>
                        <input name="address" placeholder="Dirección" value={tenantFormData.address} onChange={changeHandler} required />
                    </div>
                    <div className={styles.inputPack}>
                        <label>Tenant Phone: </label>
                        <input name="phone" placeholder="Teléfono" value={tenantFormData.phone || ""} onChange={changeHandler} type="number" required />
                    </div>
                    <div className={styles.inputPack}>
                        <label>Tenant email: </label>
                        <input name="email" placeholder="Email" value={tenantFormData.email} onChange={changeHandler} type="email" required />
                    </div>
                    <div className={styles.inputPack}>
                        <label>Tenant Remark: </label>
                        <input name="remark" placeholder="Observaciones" value={tenantFormData.remark} onChange={changeHandler} />
                    </div>
                    <div className={styles.inputPack}>
                        <label>Tenant Micron ID: </label>
                        <input name="micronId" placeholder="Micron ID" value={tenantFormData.micronId} onChange={changeHandler} required />
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

export default TenantRegisterModal;