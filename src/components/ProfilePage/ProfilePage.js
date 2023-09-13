import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import jwt_decode from "jwt-decode";
import {getUser} from "../../store/user/userSlice";
import Header from "../Header/Header";
import {getBookingsOfUser} from "../../store/bookings/bookingsSlice";
import Booking from "../Booking/Booking";
import styles from './Profile.module.css'
import Footer from "../Footer/Footer";

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
            <div className={styles.hello}>
                Hello, {currentUser.name}!
                <br/>
                There are your bookings:
            </div>
            <div className={styles.bookings}>
                {list.map(booking => (
                        <Booking
                            key={booking.id}
                            booking={booking}
                        />
                    ))
                }
            </div>
            <Footer></Footer>
        </>
    );
};

export default ProfilePage;