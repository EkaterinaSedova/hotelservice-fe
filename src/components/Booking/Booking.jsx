import React from 'react';
import styles from './Booking.module.css'
import {HOTEL_ROUTE, PROFILE_ROUTE} from "../../routing/paths";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {deleteBooking} from "../../store/bookings/bookingsSlice";
// 0_0
const Booking = ({booking}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const parseTimestamp = (unixTime) => {
        const date = new Date(unixTime);
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        return `${day} ${monthNames[month]} ${year}`;
    }

    const handleHotelClick = () => {
        navigate(HOTEL_ROUTE + `/${booking.hotelId}`)
    }

    const handleDeleteClick = () => {
        if(window.confirm('Вы уверены, что хотите удалить данную бронь?')) {
            dispatch(deleteBooking({id: booking.id}));
            window.location.reload();
        }
    }

    return (
        <div className={styles.booking}>
            Check-in: {parseTimestamp(booking.inDate)}
            <br/>
            Check-out: {parseTimestamp(booking.outDate)}
            <div className={styles.bookingButtons}>
                <button className={styles.bookingButton} onClick={handleHotelClick}>go to hotel page</button>
                <button className={styles.deleteButton} onClick={handleDeleteClick}>delete this booking</button>
            </div>
        </div>
    );
};

export default Booking;