import React from 'react';
import styles from './Rooms.module.css'
import {HOTEL_ROUTE} from "../../routing/paths";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteRoom} from "../../store/rooms/roomsSlice";
import {toggleForm} from "../../store/user/userSlice";
import {toggleBookingForm} from "../../store/bookings/bookingsSlice";
import BookingForm from "../BookingForm/BookingForm";

const Rooms = ({rooms}) => {
    const {currentUser} = useSelector(({user}) => user);
    const dispatch = useDispatch();
    const handleDeleteClick = (id) => {
        if(window.confirm(`Вы уверены, что НЕ ПОЖАЛЕЕТЕ, если удалите данную комнату??`)) {
            dispatch(deleteRoom({id}));
            window.location.reload();
        }
    }
    const {inDate, outDate} = useSelector(({calendar}) => calendar)
    const handleBookClick = () => {
        if (!currentUser) {
            dispatch(toggleForm(true));
            return;
        }
        if (inDate && outDate) dispatch(toggleBookingForm(true));
        else alert("Сначала выберите даты заезда и выезда.")
    }

    return (
        <div className={styles.roomItemContainer} onClick={() => {}}>
            {rooms.map(room => (
                <div className={styles.roomItem} key={room.id}>
                    <div className={styles.leftBlock}>
                        <div className={styles.roomItemImgContainer}>
                            <img className={styles.roomItemImg} src={'http://localhost:80/' + room.images[0]} alt={'roomImage'}/>
                        </div>
                        <div className={styles.roomItemInfo}>
                            <div>Price (one day): {room.options.price}</div>
                            <div>Places: {room.options.places}</div>
                            <div>
                                Fridge:
                                {room.options.fridge ?
                                    <span className={styles.green}> ✓ </span>
                                    :
                                    <span className={styles.red}> ✗ </span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className={styles.roomButtons}>
                        <div className={styles.roomButton} onClick={() => {handleBookClick(room)}}>Book</div>
                        {
                            window.location.pathname === '/search/'
                            &&
                            <Link to={HOTEL_ROUTE + `/${room.hotelId}`} className={styles.roomButton}>
                                Go to hotel page
                            </Link>
                        }
                        {
                            currentUser && (currentUser.isAdmin &&
                                <div className={styles.deleteButton} onClick={() => handleDeleteClick(room.id)}>
                                Delete room
                                </div>
                            )
                        }
                        <BookingForm room={room}/>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Rooms;