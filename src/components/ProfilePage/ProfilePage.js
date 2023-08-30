import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import jwt_decode from "jwt-decode";
import {getUser} from "../../store/user/userSlice";
import Header from "../Header/Header";
import {getBookingsOfUser} from "../../store/bookings/bookingsSlice";
import Booking from "../Booking/Booking";
import styles from './Profile.module.css'

const ProfilePage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            const {id} = jwt_decode(localStorage.getItem('token'));
            await dispatch(getUser({id}));
            await dispatch(getBookingsOfUser({id}));
        })()
    }, [dispatch])

    const {currentUser} = useSelector(({user}) => user);
    const {list} = useSelector(({bookings}) => bookings);

    return (
        <>
            <Header />
            Hello, {currentUser.name}!
            <br/>
            There are your bookings:
            <div className={styles.bookings}>
                {list.map(booking => (
                        <Booking
                            key={booking.id}
                            booking={booking}
                        />
                    ))
                }
            </div>
        </>
    );
};

export default ProfilePage;