import { Link } from "react-router-dom";
import {FaBars} from "react-icons/fa6";
import React, {useState} from "react";
import Sidebar from "./Sidebar.tsx";
import styles from './styles/navbar.module.css'

interface Props {
    currentPage: string;
}

const Navbar: React.FC<Props> = ({ currentPage }) => {
    const currentNavStyles = {
        backgroundColor: '#e6e6e6',
        color: '#1f1f1f',
        padding: '7px 0',
        border: '1px solid #ccc',
        borderRadius: '5px',
    };

    const [responsive, setResponsive] = useState(false)

    const HandleResponsive = () => {
     setResponsive(!responsive)
    }

    return (
        <nav className={ styles.nav }>
            <div className={styles.logocontainer}>
                <img src="/logo.png" alt="logo" className={styles.logo} />
                <p className={styles.title}>FiMe</p>
            </div>
            <div className={styles.navlinks}>
                <Link className={styles.links} to="/" style={currentPage === 'D' ? currentNavStyles : undefined}>
                    Dashboard
                </Link>
                <Link className={styles.links}  to="/Transaction" style={currentPage === 'T' ? currentNavStyles : undefined}>
                    Transactions
                </Link>
                <Link className={styles.links}  to="/Analytics" style={currentPage === 'A' ? currentNavStyles : undefined}>
                    Analytics
                </Link>
                <Link className={styles.links}  to="/History" style={currentPage === 'H' ? currentNavStyles : undefined}>
                    History
                </Link>
            </div>
            <FaBars className={styles.menu}  onClick={HandleResponsive}/>
            {
                responsive && (<Sidebar currentPage={currentPage} close={HandleResponsive} />)
            }
            {/*<div>{ /* settings , notifications, profile is planned to be implemented here *!/</div>*/}
        </nav>
    );
};

export default Navbar;
