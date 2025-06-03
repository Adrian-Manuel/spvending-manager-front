import { Admin, AdminApi } from "../entities/models/admin";


export interface AdminRepository {
    logAdmin(user:Omit<Admin,"id"|"roles">): Promise<AdminApi | string>;
    logOut(): Promise<boolean>;
    refreshAccessToken(): Promise<AdminApi | null>;
}
