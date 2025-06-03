import { Machine, MachineApi, MachineInfoDisplay } from "../entities/models/machine";

export interface MachineRepository {
    getAllMachines() : Promise<MachineInfoDisplay[]>;
    findMachineByUuid( machineUuid : string ) : Promise<MachineApi | null >;
    addMachine( machine : Omit<Machine, "machineId" | "state"> ) : Promise<void>;
    modifyMachine( machine : Omit<Machine, "state">) : Promise<void>;
    deleteMachine( uuid : string ) : Promise<void>;
}