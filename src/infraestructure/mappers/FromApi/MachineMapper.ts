import { MachineApiResponse } from "../../../domain/entities/api-models/apiResponse";
import { MachineInfoDisplay } from "../../../domain/entities/models/machine";


export function mapMachineFromApi(apiData: MachineApiResponse): MachineInfoDisplay[] {
    return apiData.content;
}