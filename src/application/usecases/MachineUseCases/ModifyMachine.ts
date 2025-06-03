import { MachineRepository } from "../../../domain/ports/MachineRepository";
import { Machine } from "../../../domain/entities/models/machine";

export class ModifyMachine {
    constructor( private machineRepository : MachineRepository ) {};

    async execute( machine : Omit<Machine, "state"> ) : Promise<void> {
        return this.machineRepository.modifyMachine(machine);
    }
}