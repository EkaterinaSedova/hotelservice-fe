import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import jwt_decode from "jwt-decode";
import {getUser} from "../../store/user/userSlice";
import Header from "../Header/Header";
import {getBookingsOfUser} from "../../store/bookings/bookingsSlice";
import Booking from "../Booking/Booking";
import styles from './Profile.module.css'
import Footer from "../Footer/Footer";
import {useParams} from "react-router-dom";

const ProfilePage = () => {
    const dispatch = useDispatch();
    const {currentId} = useParams();
    const {id} = jwt_decode(localStorage.getItem('token'));
    const {user, currentUser} = useSelector(({user}) => user);
    useEffect(() => {
        (async () => {
            await dispatch(getUser({id}));
            if(+currentId === id) await dispatch(getBookingsOfUser({
                id: id
            }))
            else await dispatch(getBookingsOfUser({
                id: currentId
            }))
        })()
    }, [dispatch])


    const {list} = useSelector(({bookings}) => bookings);

    return +currentId === id ? (
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
        ) : (
        <>
            <Header />
            <div className={styles.hello}>
                Profile of {user.name}!
                <br/>
                There are bookings:
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