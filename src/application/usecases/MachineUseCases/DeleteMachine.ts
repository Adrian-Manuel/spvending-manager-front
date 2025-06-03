import { MachineRepository } from "../../../domain/ports/MachineRepository";

export class DeleteMachine {
    constructor( private machineRepository : MachineRepository ) {};

    async execute( uuid : string ) : Promise<void> {
        return this.machineRepository.deleteMachine(uuid);
    }
}