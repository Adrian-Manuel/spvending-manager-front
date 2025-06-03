import { MachineRepository } from "../../../domain/ports/MachineRepository";
import { Machine } from "../../../domain/entities/models/machine";

export class CreateMachine {
    constructor( private machineRepository : MachineRepository ) {};

    async execute( machine : Omit<Machine, "machineId" | "state">) : Promise<void> {
        return this.machineRepository.addMachine(machine);
    }
}