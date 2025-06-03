import styles from "./Main.module.css";
//import searchIcon from './../../assets/icons/Search-more.svg';
import trashIcon from "./../../../assets/icons/Trash.svg";
import Aside from './../Aside/Aside';
import { DataTable, DataTableRowClickEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MainProps } from './../../../domain/entities/property-models/componentsProperties';
import { useRef, useState } from 'react';
import Modal from '../Modals/Modal';
import { getEntityId } from '../../../utilities/tools/checkers';
import { useLocation, useNavigate } from 'react-router';
import { appRoutes } from '../../../utilities/defines/routes';
import { Toast } from "primereact/toast";

function Main({ textInfoDisplay, dataToDisplay, setterUuid }: MainProps) {
	// ---------- States ----------
	const [showModal, setShowModal] = useState(false);
	const [rowSelected] = useState({});
	const navigate = useNavigate();
	const location = useLocation();
	const toast = useRef<Toast>(null);

	// Handlers:
	function selectionRowHandler(event: DataTableRowClickEvent) {
		const selectedItemId = getEntityId(event.data);
		navigate(`${location.pathname}` + appRoutes.selectedItemRoute + `/${selectedItemId}`, { state: { from: location.pathname } });
	}

	function onClickHandler(data: any) {
		const dataId = getEntityId(data);
		setterUuid(dataId);
	}
	// ---------- Styles ----------
	const rowClassName = () => {
		return `${styles.tableRow} ${styles.pDatatableThead}`;
	};

	return (
		<main>
			<Toast ref={toast}/>
			<Aside />
			<section className={styles.sectionContainer}>
				<div className={styles.container}>
					<div className={styles.headerContent}>
						<p className={styles.infText}>{textInfoDisplay.list} List</p>
						<input className={styles.searcher} type="text" placeholder='Buscar...' />
						<Modal typeModal={textInfoDisplay.list} isOpen={showModal} onClose={() => setShowModal(false)} toastRef={toast}/>
						<button className={styles.addButton} onClick={() => setShowModal(true)}>+ Add {textInfoDisplay.list}</button>
					</div>
					<div className={styles.tableContainer}>
						<DataTable
							value={dataToDisplay}
							selectionMode="single"
							rowClassName={rowClassName}
							selection={rowSelected}
							onRowClick={selectionRowHandler}
						>
							<Column headerClassName={styles.headerTB} field={textInfoDisplay.column1.field} header={textInfoDisplay.column1.header}></Column>
							<Column headerClassName={styles.headerTB} field={textInfoDisplay.column2.field} header={textInfoDisplay.column2.header}></Column>
							<Column headerClassName={styles.headerTB} field={textInfoDisplay.column3.field} header={textInfoDisplay.column3.header}></Column>
							<Column headerClassName={styles.headerTB} field={textInfoDisplay.column4.field} header={textInfoDisplay.column4.header}></Column>
							<Column headerClassName={styles.headerTB} field={textInfoDisplay.column5.field} header={textInfoDisplay.column5.header}></Column>
							<Column headerClassName={styles.headerTB} field="" header="Actions"
								body={(rowData) => (
									<div>
										<button onClick={() => onClickHandler(rowData)}>
											<img src={trashIcon} alt="" />
										</button>
									</div>
								)}
							/>
						</DataTable>
					</div>
				</div>
			</section>
		</main>
	)
}

export default Main;