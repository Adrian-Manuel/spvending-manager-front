import { createContext, useState } from "react";
import { AdminContextProps, ContextModel } from "../domain/entities/context-models/contextModels";
import { AdminApi } from "../domain/entities/models/admin";

export const Admin = createContext<ContextModel>([null, () => {}]);

export function AdminContext({ children }: AdminContextProps) {
  const [admin, setAdmin] = useState<AdminApi|null>(null);

  return (
    <Admin.Provider value={[admin, setAdmin]}>
      {children}
    </Admin.Provider>
  );
}