export type Club = {
    clubId: string,
    clubName: string,
    cif: number,
    address: string,
    phone: number,
    email: string,
    remark: string,
    micronId: string,
    accountingId: string
    tenantId: string,
    numberOfMachines: number
}

export type ClubApi = { 
    accountingId:string
    address:string
    cif:string
    clubId:string
    email:string
    micronId:string
    name:string
    phone:string
    remark:string
    tenantEntityName:string
    userManagers:[]
}

export type ClubInfoDisplay = {
    clubId: string
    name: string,
    address: string,
    phone: string,
    tenantEntityName: string,
    machinesCount: number
}

export type ClubOption = {
    clubId: string,
    name: string
}