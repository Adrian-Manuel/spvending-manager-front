import styles from "./../WarningsModals.module.css";
import { WarningProps } from "../../../../domain/entities/property-models/componentsProperties";
import { ClubRepositoryHttp } from "../../../../infraestructure/adapters/api/ClubRepositoryHttp";
import { DeleteClub } from "../../../../application/usecases/ClubUseCases/DeleteClub";
import alertIcon from "./../../../../assets/icons/alert.png";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

const repository = new ClubRepositoryHttp();
const deleteClub = new DeleteClub(repository);

function ClubWarningModal({visible, setVisible, uuid, setUuid, position}: WarningProps) {
    // Handlers:
    function closeWindow(){
        setUuid("");
        setVisible();
    }

    function onDeleteHandler() {
        if (uuid != "") {
            console.log(uuid);
            deleteClub.execute(uuid);
            setUuid("");
            setVisible();
            window.location.reload();
        }
    }

    const footerContent = (
        <div>
            <Button label="No" icon="pi pi-times" onClick={closeWindow} className={`p-button-text ${styles.btnPddng}`} />
            <Button label="Yes" icon="pi pi-check" onClick={onDeleteHandler} className={styles.btnPddng} autoFocus />
        </div>
    );
    const header = (
        <div>
            <img src={alertIcon} alt="" width="30px" height="30px"/>
            <h2>Deleting club:</h2>
        </div>
    );
    return(
        <div className="card px-2">
            <Dialog header={header} visible={visible} position={position} style={{ width: '50vw', padding:20, background:'#ffffff' }} onHide={() => {if (!visible) return; setVisible }} footer={footerContent} draggable={false} resizable={false}>
                <p className="m-0">
                    Are you sure you want to delete this tenant?
                </p>
            </Dialog>
        </div>
    );
}

export default ClubWarningModal;