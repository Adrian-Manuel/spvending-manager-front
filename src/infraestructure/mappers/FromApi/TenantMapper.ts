import { TenantApiResponse } from "../../../domain/entities/api-models/apiResponse";
import { TenantInfoDisplay } from "../../../domain/entities/models/tenant";

export function mapTenantFromApi(apiData: TenantApiResponse): TenantInfoDisplay[] {
    return apiData.content;
}