import styles from './Header.module.css';
import userIcon from './../../../assets/icons/UserIcon.svg';
import { useContext, useEffect, useState } from 'react';
import { Admin } from '../../../contexts/AdminContext';
import { AdminRepositoryHttp } from '../../../infraestructure/adapters/api/AdminRepositoryHttp';
import { LogOutAdmin } from '../../../application/usecases/AdminUseCases/LogOutAdmin';
import { useNavigate } from 'react-router';
import { appRoutes } from '../../../utilities/defines/routes';

const adminRepository = new AdminRepositoryHttp();
const logOutAdmin = new LogOutAdmin(adminRepository);

function Header() {
    // States:
    const [admin, setAdmin] = useContext(Admin);
    const [ adminUser, setAdminUser ] = useState("User Name");
    const [ isHidden, setIsHidden ] = useState(true);
    const navigate = useNavigate();

    // Handlers:
    function onClickHandlerDisplayMenuProfile() {
        setIsHidden(prev => !prev);
    }

    async function onClickLogOutHanler() {
        try {
            const response = await logOutAdmin.execute();
            console.log(response);
            if (response == true) {
                setAdmin(null);
                navigate(appRoutes.logginRoute);
            } else {
                alert("Error log out the user");
            }
        } catch (err) {
            console.error(err);
        } 
    }

    useEffect(
        () => {
            if (admin != null) {
                const user:string = admin.name
                setAdminUser(user);
            }
        }, [admin]
    );

    return(
        <header className={styles.header}>
            <h1>SPVending Manager</h1>
            <div className={styles.userContainer} onClick={onClickHandlerDisplayMenuProfile}>
                <h2>{adminUser}</h2>
                <div className={styles.picContainer}>
                    <img src={userIcon} alt="profile pic" height="60" width="60"/>
                </div>
            </div>
            <div className={`${styles.menuProfileHidden } ${!isHidden ? styles.menuProfile : ''}`}>
                    <nav className={styles.cntnrNv}>
                        <ul className={styles.cntnrUl}>
                            <li className={styles.cntnrLi}>
                                <button className={styles.cntnrBtn} onClick={onClickLogOutHanler}>Sing Out</button>
                            </li>
                        </ul>
                    </nav>
                </div>
        </header>
    );
}

export default Header;