import { PotentialTenant, Tenant, TenantApi, TenantInfoDisplay } from "../entities/models/tenant";

export interface TenantRepository {
    getAllTenants() : Promise<TenantInfoDisplay[]>;
    findTenantByUuid( tenantUuid : string ) : Promise<TenantApi | null >;
    addTenant( tenant : Omit<Tenant, "tenantId" | "numberOfClubs">) : Promise<void>;
    modifyTenant( tenant : Omit<Tenant, "numberOfClubs">) : Promise<void>;
    deleteTenant( uuid : string ) : Promise<void>;
    getPotentialTenants() : Promise<PotentialTenant[]>;
}