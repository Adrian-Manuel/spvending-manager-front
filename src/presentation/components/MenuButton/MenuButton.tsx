import styles from './MenuButton.module.css';
import { MenuButtonProps } from './../../../domain/entities/property-models/componentsProperties';
import menuIcon from './../../../assets/icons/Menu-displayer.svg';

function MenuButton({isAbove}: MenuButtonProps) {

    return(

        <button className={isAbove? styles.hidden : styles.menuButton}>
            <img src={menuIcon} alt="" height="60" width="60"/>
        </button>
    );
}

export default MenuButton;