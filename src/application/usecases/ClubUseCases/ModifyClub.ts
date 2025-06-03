import { ClubRepository } from "../../../domain/ports/ClubRepository";
import { Club } from "../../../domain/entities/models/club";

export class ModifyClub {
    constructor(private clubRepository: ClubRepository){};

    async execute( club : Omit<Club, "numberOfMachines"> ) : Promise<void> {
        return this.clubRepository.modifyClub(club);
    }
}