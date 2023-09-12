import React, {useEffect} from 'react';
import styles from './Header.module.css'
import {Link, useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, MAIN_ROUTE, PROFILE_ROUTE} from "../../routing/paths";
import {useDispatch, useSelector} from "react-redux";
import {getUser, removeUser, toggleForm} from "../../store/user/userSlice";
import jwt_decode from "jwt-decode";
import UserForm from "../UserForm/UserForm";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
    }

    const handleLogOutClick = () => {
        dispatch(removeUser());
        localStorage.removeItem('token');
    }

    const handleUserClick = () => {
        navigate(PROFILE_ROUTE + `/${currentUser.id}`);
    }

    const handleAdminClick = () => {
        navigate(ADMIN_ROUTE)
    }

    return (
        <div>
            <header className={styles.headerBlock}>
                <Link to={MAIN_ROUTE} className={styles.headerLogo}>Home</Link>
                    <div className={styles.headerComponents}>
                        <div className={styles.headerComponent}>
                            Hello,
                            {currentUser ?
                                <span className={styles.userName} onClick={handleUserClick}>{currentUser.name}</span>
                                :
                                <span>guest</span>}
                        </div>
                        {currentUser ?
                            <div className={styles.headerButton} onClick={() => handleLogOutClick()}>Log Out</div>
                            :
                            <div className={styles.headerButton} onClick={() => handleLoginClick()}>Log In</div>}
                        {currentUser &&
                            (currentUser.isAdmin &&
                                <div className={styles.headerButton} onClick={() => handleAdminClick()}>Admin Page</div>
                            )
                        }
                    </div>
            </header>
            <UserForm />
        </div>

    );
};

export default Header;