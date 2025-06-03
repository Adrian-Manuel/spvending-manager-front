import { DataTableValue } from "primereact/datatable";

export function getEntityId(rowData:DataTableValue) {
    if ("tenantId" in rowData) return rowData.tenantId;
    if ("clubId" in rowData) return rowData.clubId;
    if ("userManagerId" in rowData) return rowData.userManagerId;
    if ("machineId" in rowData) return rowData.machineId;
}
