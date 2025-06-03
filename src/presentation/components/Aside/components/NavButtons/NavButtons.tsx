import styles from './NavButtons.module.css';
import { NavButtonsProps } from './../../../../../domain/entities/property-models/componentsProperties';
import { useNavigate } from 'react-router';
import { appRoutes } from '../../../../../utilities/defines/routes';

function NavButtons({ isAbove }: NavButtonsProps) {
    const navigate = useNavigate();

    function onClickHanderTenant() {
        navigate(appRoutes.tenantsRoute);
    }

    function onClickHanderClub() {
        navigate(appRoutes.clubsRoute);
    }

    function onClickHanderMachine() {
        navigate(appRoutes.machinesRoute);
    }

    function onClickHanderUser() {
        navigate(appRoutes.usersRoute);
    }
    
    return(
            <nav className={ isAbove ? styles.nav : styles.hidden }>
                <ul>
                    <li onClick={onClickHanderTenant}>
                        TENANTS
                    </li>
                    <li onClick={onClickHanderClub}>
                        CLUBS
                    </li>
                    <li onClick={onClickHanderMachine}>
                        MÁQUINAS
                    </li>
                    <li onClick={onClickHanderUser}>
                        USUARIOS
                    </li>
                </ul>
            </nav>
    );
}

export default NavButtons;