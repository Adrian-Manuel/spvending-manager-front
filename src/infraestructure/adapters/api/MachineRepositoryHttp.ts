import { MachineRepository } from "../../../domain/ports/MachineRepository";
import { Machine, MachineApi, MachineInfoDisplay } from "../../../domain/entities/models/machine";
import { API_PREFIX, BASE_URL_SERVER, PATH_PREFIX } from "../../../utilities/defines/api/api-routes";
import { mapMachineFromApi } from "../../mappers/FromApi/MachineMapper";
import { mapMachineToApi } from "../../mappers/ToApi/MachineMapperToApi";
import { authHandler } from "../Auth/AuthHandler";

export class MachineRepositoryHttp implements MachineRepository{
    private BASEURL = BASE_URL_SERVER + API_PREFIX + PATH_PREFIX.machinesPath;

    async findMachineByUuid(machineUuid: string): Promise<MachineApi | null> {
        const response = await authHandler(`${this.BASEURL}/${machineUuid}`, {credentials: "include"});
        return await response;
    }

    async getAllMachines(): Promise<MachineInfoDisplay[]> {
        const json = await authHandler(this.BASEURL, {credentials: "include"});
        return mapMachineFromApi(json);
    }

    async addMachine(machine: Omit<Machine, "machineId" | "state">): Promise<void> {
        const body = mapMachineToApi(machine);
        const response = await authHandler(
            this.BASEURL,
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: { "Content-Type": "application/json" },
                credentials: "include"
            }
        );
        return response;
    }

    async modifyMachine(machine: Omit<Machine, "state">): Promise<void> {
        const body = mapMachineToApi(machine);
        const response = await authHandler(
            this.BASEURL+`/${machine.machineId}`,
            {
                method: "PUT",
                body: JSON.stringify(body),
                headers: { "Content-Type": "application/json" },
                credentials: "include"
            }
        );
        return response;
    }

    async deleteMachine(uuid: string): Promise<void> {
        const response = await authHandler(
            `${this.BASEURL}/${uuid}`,
            {
                method: "DELETE",
                credentials: "include"
            });
        return response;
    }
}