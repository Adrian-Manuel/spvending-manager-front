import { Club, ClubApi, ClubInfoDisplay, ClubOption } from "../entities/models/club";

export interface ClubRepository {
    getAllClubs(): Promise<ClubInfoDisplay[]>;
    findClubByUuid(clubUuid: string): Promise<ClubApi | null>;
    addClub(club: Omit<Club, "clubId" | "numberOfMachines">): Promise<void>;
    modifyClub(club: Omit<Club, "numberOfMachines">): Promise<void>;
    deleteClub(uuid: string): Promise<void>;
    getClubOptions(): Promise<ClubOption[]>;
}