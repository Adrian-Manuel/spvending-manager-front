import { TenantRepository } from "../../../domain/ports/TenantRepository";
import { Tenant } from "../../../domain/entities/models/tenant";

export class ModifyTenant {
    constructor( private tenantRepository: TenantRepository ){};

    async execute( tenant : Omit<Tenant, "numberOfClubs"> ): Promise<void> {
        return this.tenantRepository.modifyTenant(tenant);
    }
}