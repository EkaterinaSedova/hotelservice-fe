import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import jwt_decode from "jwt-decode";
import {getUser} from "../../store/user/userSlice";
import Header from "../Header/Header";
import {getBookingsOfUser} from "../../store/bookings/bookingsSlice";

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
            <div>
                Hello, {currentUser.name}
            </div>
            {list.map(booking => (
              <div key={booking.id}>{booking.inDate}, {booking.outDate}</div>
            ))
            }
        </>
    );
};

export default ProfilePage;