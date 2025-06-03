enum AdminRol {
    VIEWER,
    MANAGER
}

export type Admin = {
    id: string
    username: string
    password: string
    roles: AdminRol
}

export type AdminApi = {
    name:string,
    role:string 
}