// TODO: change to css modules.
import styles from "./DisplayItemInfo.module.css";
import { useParams } from "react-router";
import DisplayItemInfoTenant from "./DisplayItemInfoTenant/DisplayItemInfoTenant";
import { useEffect, useState } from "react";
import DisplayItemInfoClub from "./DisplayItemInfoClub/DisplayItemInfoClub";
import DisplayItemInfoMachine from "./DisplayItemInfoMachine/DisplayItemInfoMachine";
import DisplayItemInfoUser from "./DisplayItemInfoUser/DisplayItemInfoUser";
import { TenantRepositoryHttp } from '../../../infraestructure/adapters/api/TenantRepositoryHttp';
import { ClubRepositoryHttp } from '../../../infraestructure/adapters/api/ClubRepositoryHttp';
import { UserRepositoryHttp } from '../../../infraestructure/adapters/api/UserRepositoryHttp';
import { MachineRepositoryHttp } from '../../../infraestructure/adapters/api/MachineRepositoryHttp';
import { GetTenant } from '../../../application/usecases/TenantUseCases/GetTenant';
import { GetClub } from '../../../application/usecases/ClubUseCases/GetClub';
import { GetMachine } from '../../../application/usecases/MachineUseCases/GetMachine';
import { GetUser } from '../../../application/usecases/UserUseCases/GetUser';
import { SelectedItemType } from "../../../domain/entities/property-models/componentsProperties";
import { TenantApi } from "../../../domain/entities/models/tenant";
import { ClubApi } from "../../../domain/entities/models/club";
import { UserApi } from "../../../domain/entities/models/user";
import { MachineApi } from "../../../domain/entities/models/machine";

const tenantRepository = new TenantRepositoryHttp();
const clubRepository = new ClubRepositoryHttp();
const userRepository = new UserRepositoryHttp();
const machineRepository = new MachineRepositoryHttp();

function DisplayItemInfo() {
    // States:
    const [ selectedItem, setSelectedItem ] = useState<SelectedItemType>(null);
    const { itemType, uuid } = useParams();

    // Handlers:
    
    async function getItemFromDatabase(uuid:string, itemType:string) {
        if (uuid === undefined) return "Error obtaining the item";
        if (itemType === undefined) return "Error obtaining the item";
        
        if (itemType === "tenants") {
			const findTenantById = new GetTenant(tenantRepository);
			findTenantById.execute(uuid)
				.then(setSelectedItem)
				.catch(console.error);
		}

        if (itemType === "clubs") {
			const findClubById = new GetClub(clubRepository);
			findClubById.execute(uuid)				
				.then(setSelectedItem)
				.catch(console.error);
			
		}

		if (itemType === "machines") {
			const findMachineById = new GetMachine(machineRepository);
			findMachineById.execute(uuid)
				.then(setSelectedItem)
				.catch(console.error);
		}

        if (itemType === "users") {
			const findUserById = new GetUser(userRepository);
			findUserById.execute(uuid)
				.then(setSelectedItem)
				.catch(console.error);
		}
    }

    // Functions:
 
    useEffect(()=>{
        if (uuid != undefined && itemType != undefined) {
            getItemFromDatabase(uuid, itemType);
        }
    },[uuid, itemType]);

	return (
        <>
            <main className={styles.mnDisplay}>
                {itemType==="tenants"?<DisplayItemInfoTenant object={selectedItem as TenantApi} />:""}
                {itemType=="clubs"?<DisplayItemInfoClub object={selectedItem as ClubApi}/>:""}
                {itemType=="users"?<DisplayItemInfoUser object={selectedItem as UserApi}/>:""}
                {itemType=="machines"?<DisplayItemInfoMachine object={selectedItem as MachineApi}/>:""}
            </main>    
        </>
	);
}

export default DisplayItemInfo;