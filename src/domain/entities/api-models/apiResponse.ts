import { ClubInfoDisplay } from "../models/club";
import { MachineInfoDisplay } from "../models/machine";
import { TenantInfoDisplay } from "../models/tenant";
import { UserInfoDisplay } from "../models/user";

export type PageInfo = {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
};

export type TenantApiResponse = {
    content: TenantInfoDisplay[],
    page: PageInfo
}

export type ClubApiResponse = {
    content: ClubInfoDisplay[],
    page: PageInfo
}

export type MachineApiResponse = {
    content: MachineInfoDisplay[],
    page: PageInfo
}

export type UserApiResponse = {
    content: UserInfoDisplay[],
    page: PageInfo
}