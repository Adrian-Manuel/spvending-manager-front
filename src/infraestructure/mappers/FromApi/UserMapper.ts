import { UserApiResponse } from "../../../domain/entities/api-models/apiResponse";
import { UserInfoDisplay } from "../../../domain/entities/models/user";

export function mapUserFromApi(apiData: UserApiResponse): UserInfoDisplay[] {
    return apiData.content;
}