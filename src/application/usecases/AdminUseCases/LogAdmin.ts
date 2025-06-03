import { Admin, AdminApi } from "../../../domain/entities/models/admin";
import { AdminRepository } from "../../../domain/ports/AdminRepository";

export class LogAdmin {
    constructor( private adminRepository : AdminRepository ) {};

    async execute(admin:Omit<Admin,"id"|"roles">):Promise<AdminApi | string> {
        return this.adminRepository.logAdmin(admin);
    }
}