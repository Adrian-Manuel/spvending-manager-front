//import styles from "./SelectTenantOptions.modules.css"
import { useState } from "react";
import { PotentialTenant } from "../../../domain/entities/models/tenant";
import { TenantRepositoryHttp } from "../../../infraestructure/adapters/api/TenantRepositoryHttp";
import { GetPotentialTenants } from "../../../application/usecases/TenantUseCases/GetPotentialTenants";
import { SelectTenantOptionProps } from "../../../domain/entities/property-models/componentsProperties";

const tenantRepo = new TenantRepositoryHttp();
const getPotentialTenant = new GetPotentialTenants(tenantRepo);

function SelectTenantOptions({onSelectTenant}: SelectTenantOptionProps) {
    // States:
    const [ potentialTenants, setPotentialTenants ] = useState<PotentialTenant[]>([]);
    const [ selectOpen, setSelectOpen ] = useState(false);
    
    // Handlers
    async function fetchTenants() {
        const tenantOptions = await getPotentialTenant.execute();
        setPotentialTenants(tenantOptions);
    } 

    function onClickHandler() {
        if(!selectOpen) {
            fetchTenants();
            setSelectOpen(true);
        }
    }

    return(
        <>
            <label htmlFor="tenants">Choose a tenant:</label>
            <br/>
            <select name="tenantId" id="tenants" onClick={onClickHandler} onBlur={()=> setSelectOpen(false)} onChange={onSelectTenant}>
                <option>----- -----</option>
                {
                    potentialTenants.map(
                        (t) => <option key={t.tenantId} value={t.tenantId}>{t.name}</option>
                    )
                }
            </select>
        </>
    );
}

export default SelectTenantOptions;