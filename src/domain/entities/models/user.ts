enum Rol {
    CLUB = 1,
    TENANT = 2
}

export type User = {
    userId: string,
    username: string,
    password: string,
    micronId: string,
    micronUser: string,
    micronPass: string,
    userType: Rol,
    /*clubName: string,*/
    tenantId: string,
    clubId?: string,
    tenantEntityName?:string,
    clubEntityName?:string
}

export type UserApi = {
    userManagerId: string,
    username: string,
    password: string,
    micronId: string,
    micronUser: string,
    micronPass: string,
    userType: string,
    tenantEntityName: string | null,
    clubEntityName: string | null
}

export type UserInfoDisplay = {
    userManagerId: string,
    username: string,
    micronId: string,
    micronUser: string,
    tenantEntityName: string,
    clubEntityName: string
}