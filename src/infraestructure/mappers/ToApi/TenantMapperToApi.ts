import { Tenant } from "../../../domain/entities/models/tenant";

export function mapTenantToApi(tenant: Partial<Tenant>): any {
    return {
      name: tenant.tenantName,
      cif: tenant.cif,
      address: tenant.address,
      phone: tenant.phone,
      email: tenant.email,
      remark: tenant.remark,
      micronId: tenant.micronId,
      tenantId: tenant.tenantId?tenant.tenantId:""
    };
}