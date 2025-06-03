import { Machine } from "../../../domain/entities/models/machine";

export function mapMachineToApi(machine: Partial<Machine>): any {
    return {
        code: machine.machineCode,
        micronId: machine.micronId,
        smartFridgeId: machine.smartFridgeld,
        smartFridgePassword : machine.smartFridgePassword,
        terminalId: machine.terminalId,
        toaSerialNumber: machine.tnaSerialNumber,
        rustdeskId: machine.rustdeskId,
        rustdeskPass: machine.rustdeskPass,
        clubId: machine.clubId,
        machineId: machine.machineId?machine.machineId:""
    };
}