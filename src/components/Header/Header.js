import React from 'react';
import styles from './Header.module.css'
import {Link} from "react-router-dom";
import {MAIN_ROUTE} from "../../routing/paths";
import {useDispatch} from "react-redux";
import {loginUser} from "../../store/user/userSlice";

const Header = () => {
    const dispatch = useDispatch();
    const handleLoginClick = () => {
        dispatch(loginUser({
            login: 'user123',
            password: 'qwerty123'
        }))
    }
    return (
        <header className={styles.headerBlock}>
            <Link to={MAIN_ROUTE} className={styles.headerComponent}>HOME</Link>
            <div className={styles.headerComponent} onClick={() => handleLoginClick()}>LOGIN</div>
        </header>
    );
};

export default Header;