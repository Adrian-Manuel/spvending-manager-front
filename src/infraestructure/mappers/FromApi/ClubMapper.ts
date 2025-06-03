import { ClubApiResponse } from "../../../domain/entities/api-models/apiResponse";
import { ClubInfoDisplay } from "../../../domain/entities/models/club";

export function mapClubFromApi(apiData: ClubApiResponse): ClubInfoDisplay[] {
    return apiData.content;
}