import { Dispatch, SetStateAction } from 'react';
import { ClubApi, ClubInfoDisplay } from '../models/club';
import { MachineApi, MachineInfoDisplay } from '../models/machine';
import { Tenant, TenantApi, TenantInfoDisplay } from '../models/tenant';
import { UserApi, UserInfoDisplay } from '../models/user';
import { InfoDisplay } from './genericModels';
import { Toast } from 'primereact/toast';


export type DataRowProps = {
    data: Tenant
}

export type NavButtonsProps = {
    isAbove: boolean;
}

export type MenuButtonProps = {
    isAbove: boolean;
};

export type MainProps = {
    textInfoDisplay: InfoDisplay,
    dataToDisplay: TenantInfoDisplay[] | ClubInfoDisplay[] | MachineInfoDisplay[] | UserInfoDisplay[],
    setterUuid: Dispatch<SetStateAction<string>>
}

export type ModalProps = {
    isOpen: boolean,
    onClose: () => void,
    toastRef: React.RefObject<Toast|null>
}

export type GenericModalProps = {
    typeModal: string
    isOpen: boolean,
    onClose: () => void,
    toastRef: React.RefObject<Toast|null>
}

export type SelectTenantOptionProps = {
    onSelectTenant: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export type SelectClubOptionProps = {
    onSelectClub: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export type SelectedItemType = UserApi | MachineApi | TenantApi | ClubApi | null;

export type DIITenantProps = {
    object: TenantApi | null
}

export type DIIClubProps = {
    object: ClubApi | null
}

export type DIIUserProps = {
    object: UserApi | null
}

export type DIIMachineProps = {
    object: MachineApi | null
}
// visible, position, setVisible
export type WarningProps = {
    visible: boolean,
    setVisible: () => void,
    uuid: string,
    setUuid: (string:string) => void
    position: "bottom" | "center" | "top" | "left" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right" | undefined
}
