import { MachineRepository } from "../../../domain/ports/MachineRepository";
import { MachineApi } from "../../../domain/entities/models/machine";

export class GetMachine {
    constructor( private machineRepository : MachineRepository ) {};

    async execute( machineUuid : string ) : Promise<MachineApi> {
        const machine = await this.machineRepository.findMachineByUuid(machineUuid);

        if(!machine) throw new Error("Machine not found");

        return machine;
    }
}