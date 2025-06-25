import styles from './Header.module.css';
import userIcon from './../../../assets/icons/UserIcon.svg';
import { useContext, useEffect, useState, useRef } from 'react';
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
    const [ isMenuVisible, setIsMenuVisible ] = useState(false); // Changed from isHidden for clarity
    const navigate = useNavigate();
    const menuRef = useRef<HTMLDivElement>(null);
    const userContainerRef = useRef<HTMLDivElement>(null);

    // Handlers:
    function toggleProfileMenu() { // Renamed for clarity
        setIsMenuVisible(prev => !prev);
    }

    async function onClickLogOutHandler() { // Renamed for consistency
        try {
            const response = await logOutAdmin.execute();
            // console.log(response); // Keep for debugging if needed
            if (response === true) { // Strict equality
                setAdmin(null);
                setIsMenuVisible(false); // Hide menu on logout
                navigate(appRoutes.logginRoute);
            } else {
                alert("Error logging out the user. Please try again."); // More user-friendly message
            }
        } catch (err) {
            console.error("Logout error:", err); // Add context to error log
            alert("An unexpected error occurred during logout. Please try again.");
        } 
    }

    // Effect for admin user name
    useEffect(
        () => {
            if (admin != null) {
                const user:string = admin.name
                setAdminUser(user);
            } else {
                setAdminUser("User Name"); // Reset if admin is null
            }
        }, [admin]
    );

    // Effect for closing menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                userContainerRef.current &&
                !userContainerRef.current.contains(event.target as Node)
            ) {
                setIsMenuVisible(false);
            }
        }

        if (isMenuVisible) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuVisible]);

    return(
        <header className={styles.header}>
            <h1>SPVending Manager</h1>
            <div className={styles.userContainer} onClick={toggleProfileMenu} ref={userContainerRef}>
                <h2>{adminUser}</h2>
                <div className={styles.picContainer}>
                    {/* Removed fixed height and width, control via CSS for responsiveness */}
                    <img src={userIcon} alt="profile pic" />
                </div>
            </div>
            <div
                ref={menuRef}
                className={`${styles.menuProfileHidden} ${isMenuVisible ? styles.menuProfile : ''}`}
            >
                <nav className={styles.cntnrNv}>
                    <ul className={styles.cntnrUl}>
                        <li className={styles.cntnrLi}>
                            {/* Added type="button" for accessibility and to prevent unintended form submissions if wrapped in a form */}
                            <button type="button" className={styles.cntnrBtn} onClick={onClickLogOutHandler}>Sign Out</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;