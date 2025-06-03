import { ReactNode } from "react"
import { ClubInfoDisplay } from "../models/club"
import { MachineInfoDisplay } from "../models/machine"
import { TenantInfoDisplay } from "../models/tenant"
import { UserInfoDisplay } from "../models/user"

type TableColumn = {
    field: string,
    header: string
} 

export type InfoDisplay = {
    list: string,
    column1: TableColumn,
    column2: TableColumn,
    column3: TableColumn,
    column4: TableColumn,
    column5: TableColumn
}

export type RowData = TenantInfoDisplay | ClubInfoDisplay | UserInfoDisplay | MachineInfoDisplay;

export type AuthorizationProps = {
    children: ReactNode;
}