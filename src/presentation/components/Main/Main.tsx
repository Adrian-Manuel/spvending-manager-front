import styles from "./Main.module.css";
import trashIcon from "./../../../assets/icons/Trash.svg";
// Aside is no longer imported/rendered directly here; it's part of MainLayout.
import { DataTable, DataTableRowClickEvent, DataTableResponsiveLayout } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MainProps } from './../../../domain/entities/property-models/componentsProperties';
import { useEffect, useRef, useState } from 'react'; // Added useEffect
import Modal from '../Modals/Modal'; // Ensure Modal component is responsive
import { getEntityId } from '../../../utilities/tools/checkers';
import { useLocation, useNavigate } from 'react-router';
import { appRoutes } from '../../../utilities/defines/routes';
import { Toast } from "primereact/toast";
import { InputText } from 'primereact/inputtext'; // For a styled search input

// Props extended to include title for the page
interface ExtendedMainProps extends MainProps {
	title?: string; // Optional title for the page
}

function Main({ textInfoDisplay, dataToDisplay, setterUuid, title }: ExtendedMainProps) {
	const [showModal, setShowModal] = useState(false);
	// const [rowSelected, setRowSelected] = useState<any>(null); // Keep track of selected row if needed for other purposes
	const navigate = useNavigate();
	const location = useLocation();
	const toast = useRef<Toast>(null);
    const [globalFilter, setGlobalFilter] = useState<string>(''); // For DataTable search

	const handleRowSelect = (event: DataTableRowClickEvent) => {
		const selectedItemId = getEntityId(event.data);
		// Navigate to a detailed view page for the selected item
		// The route structure might vary based on how itemType is determined (e.g., from textInfoDisplay.list)
		// Assuming textInfoDisplay.list is like "Tenants", "Clubs", etc.
		const itemTypePath = textInfoDisplay.list.toLowerCase();
		navigate(`/${itemTypePath}${appRoutes.selectedItemRoute}/${selectedItemId}`, {
			state: { from: location.pathname, itemType: textInfoDisplay.list }
		});
	};

	const handleDeleteClick = (event: React.MouseEvent, data: any) => {
		event.stopPropagation(); // Prevent row click event when clicking the delete button
		const dataId = getEntityId(data);
		setterUuid(dataId); // This will trigger the warning modal in the parent page component
	};

    // Add data-label attributes to td elements for CSS-driven responsive cards
    // This is a workaround if PrimeReact's built-in responsive modes aren't sufficient
    // or if more custom card styling is needed.
    useEffect(() => {
        const tables = document.querySelectorAll('.p-datatable-table');
        tables.forEach(table => {
            const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent || '');
            table.querySelectorAll('tbody tr').forEach(row => {
                Array.from(row.querySelectorAll('td')).forEach((td, index) => {
                    // Check if the column has a field name (i.e., it's not an actions column without a field)
                    // This assumes columns without a 'field' in textInfoDisplay might be action columns
                    // A more robust way would be to check column properties if available
                    const columnInfo = (Object.values(textInfoDisplay) as any[]).find(col => col && col.header === headers[index]);
                    if (columnInfo && columnInfo.field) {
                         td.setAttribute('data-label', headers[index] + ': ');
                    } else if (headers[index]?.toLowerCase() === 'actions'){
                         td.setAttribute('data-label', ''); // No label for pure actions column
                    } else {
                        // Fallback or if header is complex
                        td.setAttribute('data-label', headers[index] ? headers[index] + ': ' : '');
                    }
                });
            });
        });
    }, [dataToDisplay, textInfoDisplay]); // Rerun when data or column config changes


	const actionBodyTemplate = (rowData: any) => {
		return (
			<button onClick={(e) => handleDeleteClick(e, rowData)} className={styles.actionButton} title="Delete item">
				<img src={trashIcon} alt="Delete" />
			</button>
		);
	};

    const responsiveLayout: DataTableResponsiveLayout = "scroll"; // Or "stack" if preferred and styled

	return (
        // main tag is now part of MainLayout, use a div with module CSS class
		<div className={styles.main}>
			<Toast ref={toast}/>
			{/* Aside is rendered by MainLayout */}
			<section className={styles.sectionContainer}>
				{/* Container div from original structure is effectively replaced by sectionContainer */}
				<div className={styles.headerContent}>
					<h1 className={styles.pageTitle}>{title || `${textInfoDisplay.list} List`}</h1>
                    <div className={styles.controlsContainer}>
                        <span className="p-input-icon-left">
                            {/* <i className="pi pi-search" /> PrimeReact Search Icon, if desired*/}
						    <InputText
                                type="search"
                                value={globalFilter}
                                onInput={(e) => setGlobalFilter((e.target as HTMLInputElement).value)}
                                placeholder="Search..."
                                className={styles.searcher}
                            />
                        </span>
						<Modal
                            typeModal={textInfoDisplay.list}
                            isOpen={showModal}
                            onClose={() => setShowModal(false)}
                            toastRef={toast}
                            // fetchItems={fetchItems} // Pass a function to refresh data after add/edit
                        />
						<button className={styles.addButton} onClick={() => setShowModal(true)}>
                            + Add {textInfoDisplay.list}
                        </button>
                    </div>
				</div>
				<div className={styles.tableContainer}>
					<DataTable
						value={dataToDisplay}
						selectionMode="single"
						// selection={rowSelected} // Manage selection state if needed for UI feedback
						onRowClick={handleRowSelect}
                        paginator // Enable pagination
                        rows={10} // Default rows per page
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        globalFilter={globalFilter} // Enable global search
                        responsiveLayout={responsiveLayout} // "scroll" or "stack"
                        scrollable // For horizontal scrolling on small screens if not stacking
                        // scrollHeight="flex" // If you want the table body to scroll within a fixed height
                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                        // className={styles.dataTable} // Apply module styles if needed, but PrimeReact classes are global
                        // rowClassName={() => styles.tableRow} // If custom row styling is needed via modules
					>
						{/* Dynamically create columns if textInfoDisplay structure is consistent */}
						{Object.values(textInfoDisplay)
                            .filter((col: any) => col && col.field && col.header) // Ensure col is valid and has field/header
                            .map((col: any) => (
							<Column
                                key={col.field}
                                field={col.field}
                                header={col.header}
                                sortable // Enable sorting
                                // headerClassName={styles.headerTB} // If specific styling needed via modules
                            />
						))}
						<Column
                            header="Actions"
                            body={actionBodyTemplate}
                            exportable={false} // Don't include actions in CSV export etc.
                            style={{ width: '8em', textAlign: 'center' }} // Fixed width for actions
                            // headerClassName={styles.headerTB}
                        />
					</DataTable>
				</div>
			</section>
		</div>
	)
}

export default Main;