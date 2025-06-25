import React, { useState, useEffect, useCallback } from "react";
// Assuming GetClubList is correctly implemented to fetch club options (name, id)
// If it fetches full Club entities, you might need a GetClubOptions use case or map the result.
import { GetClubList } from "../../../application/usecases/ClubUseCases/GetClubList";
import { ClubRepositoryHttp } from "../../../infraestructure/adapters/api/ClubRepositoryHttp";
import { ClubOption } from "../../../domain/entities/models/club"; // Model for club options

// PrimeReact Dropdown
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import styles from './SelectClubOptions.module.css'; // Import CSS module

const clubRepo = new ClubRepositoryHttp();
const getClubOptionsUseCase = new GetClubList(clubRepo); // Assuming this use case fetches what's needed

interface SelectClubOptionsProps {
    onSelectClub: (event: React.ChangeEvent<HTMLSelectElement> | DropdownChangeEvent) => void;
    currentClubId?: string;
    tenantId?: string; // Optional: to filter clubs by tenant if applicable
    disabled?: boolean;
}

function SelectClubOptions({ onSelectClub, currentClubId, tenantId, disabled }: SelectClubOptionsProps) {
    const [clubOptions, setClubOptions] = useState<ClubOption[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchClubs = useCallback(async () => {
        setIsLoading(true);
        try {
            // If your GetClubList use case can filter by tenantId, pass it here.
            // Otherwise, you might need a different use case or filter client-side (less ideal for large lists).
            // For now, assuming execute() can optionally take a filter or fetches all.
            const options = await getClubOptionsUseCase.execute(tenantId); // Modified to pass tenantId
            setClubOptions(options);
        } catch (err) {
            console.error("Failed to fetch club options:", err);
            setClubOptions([]);
        } finally {
            setIsLoading(false);
        }
    }, [tenantId]); // Refetch if tenantId changes

    useEffect(() => {
        // Fetch clubs if tenantId is provided, or if tenantId is not a dependency for fetching all clubs.
        // If tenantId is required to fetch clubs, ensure it's present.
        if (tenantId || !tenantId) { // Simplified: always try to fetch, use case handles filtering or fetches all
            fetchClubs();
        } else {
            setClubOptions([]); // Clear options if tenantId is required but not provided
        }
    }, [fetchClubs, tenantId]);

    const dropdownOptions = clubOptions.map(club => ({
        label: club.name,
        value: club.clubId
    }));

    const handleDropdownChange = (e: DropdownChangeEvent) => {
        // The PrimeReact Dropdown's onChange event provides 'e.value' which is the selected clubId.
        // To maintain compatibility with a standard select's change event if needed by parent,
        // you might need to adapt it or ensure parent handles DropdownChangeEvent.
        // For simplicity, passing the PrimeReact event directly.
        onSelectClub(e);
    };

    return (
        <Dropdown
            id="clubIdSelect"
            name="clubId" // Ensure name matches what parent expects (e.g., in UserRegisterModal)
            value={currentClubId}
            options={dropdownOptions}
            onChange={handleDropdownChange}
            placeholder="Select a Club"
            disabled={isLoading || disabled || (!tenantId && dropdownOptions.length === 0)} // Disable if loading, explicitly disabled, or no tenant and no options
            loading={isLoading}
            filter
            filterBy="label"
            showClear
            className={styles.clubDropdown} // Apply custom styles if needed
            required // If mandatory
        />
    );
}

export default SelectClubOptions;