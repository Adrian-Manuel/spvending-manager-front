import React, { useState, useEffect, useCallback } from "react";
import { PotentialTenant } from "../../../domain/entities/models/tenant";
import { TenantRepositoryHttp } from "../../../infraestructure/adapters/api/TenantRepositoryHttp";
import { GetPotentialTenants } from "../../../application/usecases/TenantUseCases/GetPotentialTenants";
// Removed unused SelectTenantOptionProps, props will be defined directly
// PrimeReact Dropdown
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import styles from './SelectTenantOptions.modules.css'; // Import CSS module

const tenantRepo = new TenantRepositoryHttp();
const getPotentialTenant = new GetPotentialTenants(tenantRepo);

interface SelectTenantOptionsProps {
    onSelectTenant: (event: React.ChangeEvent<HTMLSelectElement> | DropdownChangeEvent) => void; // Allow both types for flexibility
    currentTenantId?: string; // Optional: to set the current value of the dropdown
    // Consider adding props for placeholder, disabled, etc.
}

function SelectTenantOptions({ onSelectTenant, currentTenantId }: SelectTenantOptionsProps) {
    const [potentialTenants, setPotentialTenants] = useState<PotentialTenant[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState<string | null>(null); // Optional error handling

    const fetchTenants = useCallback(async () => {
        setIsLoading(true);
        // setError(null);
        try {
            const tenantOptions = await getPotentialTenant.execute();
            setPotentialTenants(tenantOptions);
        } catch (err) {
            console.error("Failed to fetch potential tenants:", err);
            // setError("Could not load tenants.");
            setPotentialTenants([]); // Clear tenants on error or set to an empty array
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTenants(); // Fetch tenants when the component mounts
    }, [fetchTenants]);

    // Prepare options for PrimeReact Dropdown
    const dropdownOptions = potentialTenants.map(tenant => ({
        label: tenant.name,
        value: tenant.tenantId
    }));

    const handleDropdownChange = (e: DropdownChangeEvent) => {
        // Adapt DropdownChangeEvent to resemble HTMLSelectElement change event for parent handler if needed
        // Or, parent component can be adapted to handle DropdownChangeEvent directly
        onSelectTenant(e);
    };

    return (
        // The label is now expected to be provided by the parent component (e.g., in Modal.module.css inputPack)
        // <label htmlFor="tenantIdSelect">Choose a tenant:</label>
        <Dropdown
            id="tenantIdSelect" // Ensure id matches any associated label's htmlFor
            name="tenantId" // Name attribute for forms
            value={currentTenantId} // Controlled component: current value
            options={dropdownOptions}
            onChange={handleDropdownChange}
            placeholder="Select a Tenant"
            disabled={isLoading}
            loading={isLoading} // Show loading indicator in dropdown
            filter // Enable filtering if list is long
            filterBy="label" // Filter by tenant name
            showClear // Allow clearing selection
            className={styles.tenantDropdown} // Apply custom styles if needed via CSS Modules
            // style={{ width: '100%' }} // Inline style for width, or use CSS
            required // If this field is mandatory in the form
        />
    );
}

export default SelectTenantOptions;