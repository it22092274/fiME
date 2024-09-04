import { Link } from "react-router-dom";
import { FaX } from "react-icons/fa6";
import React from "react";
import styles from './styles/sidebar.module.css';

interface Props {
    currentPage: string;
    close: () => void;
}

const Sidebar: React.FC<Props> = ({ currentPage, close }) => {
    const currentNavStyles = `${styles.links} ${styles.active}`;

    return (
        <nav className={styles.sidebar}>
            <div>
                <div className={styles.logocontainer}>
                    <img src="/logo.png" alt="logo" className={styles.logo} />
                    <p className={styles.title}>FiMe</p>
                </div>
                <FaX className={styles.close_icon} onClick={close} />
            </div>
            <div className={styles.navlinks}>
                <Link className={currentPage === 'D' ? currentNavStyles : styles.links} to="/">
                    Dashboard
                </Link>
                <Link className={currentPage === 'T' ? currentNavStyles : styles.links} to="/Transaction">
                    Transactions
                </Link>
                <Link className={currentPage === 'A' ? currentNavStyles : styles.links} to="/Analytics">
                    Analytics
                </Link>
                <Link className={currentPage === 'H' ? currentNavStyles : styles.links} to="/History">
                    History
                </Link>
            </div>
            <div className={styles.footer}>{/* Settings, notifications, profile planned to be implemented here */}</div>
        </nav>
    );
};

export default Sidebar;
