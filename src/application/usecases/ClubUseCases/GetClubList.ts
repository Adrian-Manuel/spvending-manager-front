import { ClubRepository } from "../../../domain/ports/ClubRepository";
import { ClubInfoDisplay } from "../../../domain/entities/models/club";

export class GetClubList {
    constructor(private clubRepository: ClubRepository){};

    async execute(): Promise<ClubInfoDisplay[]> {
        const clubs = await this.clubRepository.getAllClubs();
        
        if (!clubs) throw new Error("Club list is not available");

        return clubs;
    }
}