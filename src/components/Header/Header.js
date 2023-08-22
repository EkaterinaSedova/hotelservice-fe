import React from 'react';
import styles from './Header.module.css'

const Header = () => {
    return (
        <header className={styles.headerBlock}>
            <div className={styles.headerComponent}>KONTORA PI</div>
            <div className={styles.headerComponent}>LOGIN</div>
        </header>
    );
};

export default Header;