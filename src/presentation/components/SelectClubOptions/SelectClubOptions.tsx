//import styles from "./SelectClubOptions.module.css";
import { useState } from "react";
import { GetClubList } from "../../../application/usecases/ClubUseCases/GetClubList";
import { SelectClubOptionProps } from "../../../domain/entities/property-models/componentsProperties";
import { ClubRepositoryHttp } from "../../../infraestructure/adapters/api/ClubRepositoryHttp";
import { ClubOption } from "../../../domain/entities/models/club";

const clubRepo = new ClubRepositoryHttp();
// TODO: Replace the GetClubList class with the corresponding class (A new class must be created).
const getClubOptions = new GetClubList(clubRepo);

function SelectClubOptions({onSelectClub}: SelectClubOptionProps) {
    // States:
    const [ clubsOptions, setClubOptions ] = useState<ClubOption[]>([]);
    const [ selectOpen, setSelectOpen ] = useState(false);

    // Handlers:
    async function fetchClubs() {
        const response = await getClubOptions.execute();
        setClubOptions(response);
    }

    function onClickHandler() {
        if (!selectOpen) {
            fetchClubs();
            setSelectOpen(true);
        }
    }

    return(
        <>
            <label htmlFor="clubs">Choose a club:</label>
            <br />
            <select name="clubEntityId" id="club-select" onClick={onClickHandler} onBlur={()=> setSelectOpen(false)} onChange={onSelectClub}>
                <option>----- -----</option>
                {
                    clubsOptions.map(
                        (c) => <option key={c.clubId} value={c.clubId}>{c.name}</option>
                    )
                }
            </select>
        </>
    );
}

export default SelectClubOptions;