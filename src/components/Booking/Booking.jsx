import React from 'react';
import styles from './Booking.module.css'
import {HOTEL_ROUTE} from "../../routing/paths";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {deleteBooking} from "../../store/bookings/bookingsSlice";
import moment from 'moment';

const Booking = ({booking}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

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
            Booking ID: {booking.id}
            <br/>
            Check-in: {moment(booking.inDate).format("DD MMMM YYYY")}
            <br/>
            Check-out: {moment(booking.outDate).format("DD MMMM YYYY")}
            <div className={styles.bookingButtons}>
                <button className={styles.bookingButton} onClick={handleHotelClick}>go to hotel page</button>
                <button className={styles.deleteButton} onClick={handleDeleteClick}>delete this booking</button>
            </div>
        </div>
    );
};

export default Booking;