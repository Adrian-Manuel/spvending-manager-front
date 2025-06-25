import logo from "./../../../assets/logo.png";
import { useState, useEffect } from 'react';
import MenuButton from '../MenuButton/MenuButton'; // This component might need its own responsive review
import NavButtons from './components/NavButtons/NavButtons'; // This component might need its own responsive review
import styles from './Aside.module.css';

function Aside() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 480);
    const [isAsideVisibleMobile, setIsAsideVisibleMobile] = useState(false); // For mobile toggle

    const handleMouseEnter = () => {
        if (!isMobileView) {
            setIsExpanded(true);
        }
    };

    const handleMouseLeave = () => {
        if (!isMobileView) {
            setIsExpanded(false);
        }
    };

    // This function would be triggered by a global state or prop from a burger menu in the Header on mobile
    const toggleMobileAside = () => {
        if (isMobileView) {
            setIsAsideVisibleMobile(prev => !prev);
        }
    };

    // Placeholder for a global event listener or context to toggle aside on mobile
    // For example, listening to an event dispatched from a Header's menu button
    useEffect(() => {
        const handleToggleMenu = () => toggleMobileAside();
        window.addEventListener('toggle-menu', handleToggleMenu); // Example event name

        return () => {
            window.removeEventListener('toggle-menu', handleToggleMenu);
        };
    }, [isMobileView]);


    useEffect(() => {
        const checkMobileView = () => {
            const mobile = window.innerWidth <= 480;
            setIsMobileView(mobile);
            if (mobile) {
                setIsExpanded(false); // Collapse on mobile view by default if not using overlay for expansion
            }
        };

        window.addEventListener('resize', checkMobileView);
        checkMobileView(); // Initial check

        return () => window.removeEventListener('resize', checkMobileView);
    }, []);

    // If isMobileView is true, we might want a different class for initial state (e.g. hidden)
    // And another class (e.g. styles.asideVisible) to show it when toggled.
    const asideClasses = `
        ${styles.aside}
        ${isExpanded && !isMobileView ? styles.asideExpanded : ''}
        ${isMobileView && isAsideVisibleMobile ? styles.asideVisible : ''}
    `;

    return(
        // On mobile, instead of mouse enter/leave, a click on a burger icon (likely in Header) would toggle 'isAsideVisibleMobile'
        // This example assumes 'MenuButton' might also act as this toggle or be part of that logic.
        // For simplicity, mouseEnter/Leave are kept but primarily for desktop.
        <aside
            className={asideClasses}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            // onClick={isMobileView ? toggleMobileAside : undefined} // Example: make whole aside clickable to toggle on mobile
        >
            {/* Pass isExpanded to children so they can adapt (e.g., show/hide text) */}
            {/* MenuButton might become a close button on mobile when aside is an overlay */}
            <MenuButton isAbove={isExpanded || (isMobileView && isAsideVisibleMobile)} />
            <NavButtons isAbove={isExpanded || (isMobileView && isAsideVisibleMobile)} />
            <div className={styles.imgContainer}>
                {/* Removed fixed height and width, control via CSS */}
                <img src={logo} alt="SPVending Logo" />
            </div>
        </aside>
    );
}

export default Aside;