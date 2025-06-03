import { API_PREFIX, BASE_URL_SERVER, PATH_PREFIX } from "../../../utilities/defines/api/api-routes";

export async function authHandler( url:string, options:RequestInit ): Promise<any> {
    const response = await fetch(url, options);
    if (response.ok) return await response.json();
    if (response.status !== 401) throw new Error(`Error: status ${response.status}`);

    const REFRESH_TOKEN_URL = BASE_URL_SERVER + API_PREFIX + PATH_PREFIX.refreshToken
    const refreshResponse = await fetch(
        REFRESH_TOKEN_URL, {
            method: "POST",
            credentials: "include"
    });
    if (!refreshResponse.ok) throw new Error("Token refresh failed");
    
    const retryResponse = await fetch(url,options);
    if (!retryResponse.ok) {
        throw new Error(`Retry failed: status ${retryResponse.status}`);
    }

    return await retryResponse.json();
}