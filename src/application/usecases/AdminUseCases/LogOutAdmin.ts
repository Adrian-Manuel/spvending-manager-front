import { AdminRepository } from "../../../domain/ports/AdminRepository";

export class LogOutAdmin {
    constructor ( private adminRepository: AdminRepository ) {}

    async execute(): Promise<boolean> {
        return this.adminRepository.logOut();
    }
}