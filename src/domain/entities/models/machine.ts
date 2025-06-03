export type Machine = {
    machineId : string,
    machineCode: string,
    micronId: string,
    smartFridgeld: string,
    smartFridgePassword : string,
    terminalId: number,
    tnaSerialNumber: string
    rustdeskId: string,
    rustdeskPass: string,
    clubId: string,
    state: boolean
}

export type MachineApi = {
    machineId: string
    code: string,
    smartFridgeId: string,
    smartFridgePassword: string,
    terminalId: string,
    toaSerialNumber: string,
    rustdeskId: string,
    rustdeskPass: string,
    clubName: string
}

export type MachineInfoDisplay = {
    machineCode: string,
    clubName: string,
    tenantName: string,
    attendant: string,
    state: string,
    machineId: string
}