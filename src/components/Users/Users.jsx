import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeUserRole, getAnotherUser, getUser, toggleUsersForm} from "../../store/user/userSlice";
import styles from '../UserForm/User.module.css'
import {useNavigate} from "react-router-dom";
import {PROFILE_ROUTE} from "../../routing/paths";
import {getBookingsOfUser} from "../../store/bookings/bookingsSlice";

const Users = ({users}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {showUsersForm} = useSelector(({user}) => user);
    const handleChangeClick = (id) => {
        dispatch(changeUserRole({id}))
        closeForm();
    }

    const handleProfileClick = (id) => {
        dispatch(getAnotherUser({id}));
        dispatch(getBookingsOfUser({id}));
        navigate(PROFILE_ROUTE + `/${id}`)
    }
    const closeForm = () => {
        dispatch(toggleUsersForm(false));
    }
    return showUsersForm ? (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <div onClick={closeForm} className={styles.closeButton}>
                    ✖
                </div>
                <div className={styles.title}>Users:</div>
                <div className={styles.users}>
                    {users.map(user =>
                        <div
                            key={user.id}
                            className={styles.user}
                        >
                            <div>Name: {user.name}</div>
                            <div>Role: {user.isAdmin ? <span>Admin</span> : <span>User</span>}</div>
                            <button onClick={() => handleChangeClick(user.id)}>
                                Change Role
                            </button>
                            <button onClick={() => handleProfileClick(user.id)}>
                                Go to profile page
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    ) : (
        <></>
    );
};

export default Users;