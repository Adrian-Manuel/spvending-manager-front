import { useContext } from "react";
import { AuthorizationProps } from "../domain/entities/property-models/genericModels";
import { Admin } from "../contexts/AdminContext";
import LogginPage from "../presentation/pages/LogginPage/LogginPage";

function Authorization({children}:AuthorizationProps) {
    const adminUser = useContext(Admin);
    return(
        <>
            {adminUser !== null?children:<LogginPage/>}
        </>
    );
}

export default Authorization;