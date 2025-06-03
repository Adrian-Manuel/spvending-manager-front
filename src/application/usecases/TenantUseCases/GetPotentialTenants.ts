import { PotentialTenant } from "../../../domain/entities/models/tenant";
import { TenantRepository } from "../../../domain/ports/TenantRepository";

export class GetPotentialTenants {
    constructor(private tenantRepo: TenantRepository) {};

    async execute(): Promise<PotentialTenant[]> {
        return await this.tenantRepo.getPotentialTenants();
    }
}