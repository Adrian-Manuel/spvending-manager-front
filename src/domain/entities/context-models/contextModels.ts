import { ReactNode } from "react";
import { AdminApi } from "../models/admin";

export type ContextModel = [AdminApi|null, React.Dispatch<React.SetStateAction<AdminApi|null>>];
export type AdminContextProps = {
    children: ReactNode;
}