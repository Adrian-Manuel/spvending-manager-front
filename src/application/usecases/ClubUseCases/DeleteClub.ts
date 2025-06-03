import { ClubRepository } from "../../../domain/ports/ClubRepository";

export class DeleteClub {
    constructor( private clubRepository: ClubRepository ) {};

    async execute( uuid : string ) : Promise<void> {
        return this.clubRepository.deleteClub(uuid);
    }
}