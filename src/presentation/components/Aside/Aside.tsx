import logo from "./../../../assets/logo.png";
import { useState } from 'react';
import MenuButton from '../MenuButton/MenuButton';
import NavButtons from './components/NavButtons/NavButtons';
import styles from './Aside.module.css';

function Aside() {
    const [ isAbove, setIsAbove ] = useState(false);

    return(
        <aside
            className={styles.aside}
            onMouseEnter={() => setIsAbove(true)}
            onMouseLeave={() => setIsAbove(false)}
        >
            <MenuButton isAbove={isAbove}/>
            <NavButtons isAbove={isAbove}/>
            <div className={styles.imgContainer}>
                <img src={logo} alt="" height={200} width={310}/>
            </div>
        </aside>
    );
}

export default Aside;