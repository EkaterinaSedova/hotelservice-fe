import React, {useEffect, useState} from 'react';
import styles from './Header.module.css'
import {Link} from "react-router-dom";
import {MAIN_ROUTE} from "../../routing/paths";
import {useDispatch, useSelector} from "react-redux";
import {getUser, loginUser, removeUser, toggleForm} from "../../store/user/userSlice";
import jwt_decode from "jwt-decode";
import UserForm from "../UserForm/UserForm";

const Header = () => {
    const dispatch = useDispatch();
    const {currentUser} = useSelector(({user}) => user);
    useEffect(() => {
        (async () => {
            if (localStorage.getItem('token')) {
                const {id} = jwt_decode(localStorage.getItem('token'));
                await dispatch(getUser({id}));
            }
        })()
    }, [dispatch])
    const handleLoginClick = () => {
        dispatch(toggleForm(true))
        dispatch(loginUser({
            login: 'user123',
            password: 'qwerty123'
        }))
    }

    const handleLogOutClick = () => {
        dispatch(removeUser());
        localStorage.removeItem('token');
    }
    return (
        <div>
            <header className={styles.headerBlock}>
                <Link to={MAIN_ROUTE} className={styles.headerComponent}>HOME</Link>
                {currentUser ?
                    <div className={styles.headerComponent} onClick={() => handleLogOutClick()}>log out</div>
                    :
                    <div className={styles.headerComponent} onClick={() => handleLoginClick()}>LOGIN</div>
                }
            </header>
            <UserForm />
        </div>

    );
};

export default Header;