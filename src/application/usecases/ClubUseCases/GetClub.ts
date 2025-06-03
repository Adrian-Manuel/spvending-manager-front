import { ClubRepository } from "../../../domain/ports/ClubRepository";
import { ClubApi } from "../../../domain/entities/models/club";

export class GetClub {
    constructor( private clubRepository: ClubRepository ){};

    async execute( clubUuid : string ): Promise<ClubApi> {
        const club = await this.clubRepository.findClubByUuid(clubUuid);

        if(!club) throw new Error("Club not found");

        return club;
    }
}