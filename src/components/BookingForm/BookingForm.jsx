import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createBooking, toggleBookingForm} from "../../store/bookings/bookingsSlice";
import styles from "./BookingForm.module.css";
import moment from "moment";

const BookingForm = ({room}) => {
    const dispatch = useDispatch();
    const {showBookingForm} = useSelector(({bookings}) => bookings);
    const {inDate, outDate} = useSelector(({calendar}) => calendar);
    const {currentUser} = useSelector(({user}) => user);
    const closeBookingForm = () => dispatch(toggleBookingForm(false));
    const dateParsed = (selectedDate) => {
        const parsed = new Date(Date.parse(selectedDate));
        return moment(parsed).format("DD MMMM YYYY")
    }

    const handleConfirmClick = () => {
        dispatch(createBooking({
            inDate: inDate,
            outDate: outDate,
            userId: currentUser.id,
            roomId: room.id,
            hotelId: room.hotelId
        }));
        dispatch(toggleBookingForm(false));
    }

    return showBookingForm ? (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <div onClick={closeBookingForm} className={styles.closeButton}>
                    ✖
                </div>
                <div className={styles.title}>
                    Check if dates are correct:
                </div>
                <div className={styles.form}>
                    <div>
                        Check-in: {dateParsed(inDate)}
                        <br/>
                        Check-out: {dateParsed(outDate)}
                    </div>
                    <button onClick={handleConfirmClick}>Confirm</button>
                </div>
            </div>
        </div>
    ) : (
        <></>
    );
};

export default BookingForm;