import { Admin, AdminApi } from "../../../domain/entities/models/admin";
import { AdminRepository } from "../../../domain/ports/AdminRepository";
import { API_PREFIX, BASE_URL_SERVER, PATH_PREFIX } from "../../../utilities/defines/api/api-routes";

export class AdminRepositoryHttp implements AdminRepository {
    private BASEURL = BASE_URL_SERVER + API_PREFIX + PATH_PREFIX.loginPage;

    async logAdmin(user: Omit<Admin, "id" | "roles">): Promise<AdminApi | string> {
        const response = await fetch(
            `${this.BASEURL}`,
            {
                method: "POST",
                body: JSON.stringify(user),
                headers: { "Content-Type": "application/json" },
                credentials: "include"
            }
        );
        const data = await response.json();
        if (!response.ok) {
            if (data.password) throw new Error("The password must have at least 8 characters"); 
            throw new Error("Error the password is incorrect");
        }
        return data;
    }

    async logOut(): Promise<boolean> {
        const URL = BASE_URL_SERVER + API_PREFIX + PATH_PREFIX.logOutPage
        const response = await fetch(URL, {
            method: "POST",
            credentials: "include"
        });
        if (response.ok) return true;   
        return false
    }

    async refreshAccessToken(): Promise<AdminApi | null> {
        const URL = BASE_URL_SERVER + API_PREFIX + PATH_PREFIX.refreshToken;
        const response = await fetch(
            URL, {
                method: "POST",
                credentials: "include"
            });
        return response.json();
    }
}