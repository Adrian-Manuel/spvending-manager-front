import { AdminApi } from "../../../domain/entities/models/admin";
import { AdminRepository } from "../../../domain/ports/AdminRepository";


export class RefreshToken {
    constructor ( private adminRepository: AdminRepository){}

    async execute(): Promise<AdminApi | null> {
        return this.adminRepository.refreshAccessToken();
    }
}