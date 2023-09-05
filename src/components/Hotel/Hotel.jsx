import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteHotel, getHotelById} from "../../store/hotels/hotelsSlice";
import Header from "../Header/Header";
import styles from './Hotel.module.css'
import {useNavigate, useParams} from "react-router-dom";
import {getAvailableRooms, getRoomsInHotel, toggleCreateRoomForm} from "../../store/rooms/roomsSlice";
import Rooms from "../ListOfRooms/Rooms";
import {MAIN_ROUTE} from "../../routing/paths";
import Input from "../InputFieldAtHotelPage/Input";
import CreateRoomForm from "../CreateRoomForm/CreateRoomForm";
import {getAverageRating, getFeedbacks, toggleFeedbacks} from "../../store/feedbacks/feedbacksSlice";
import Feedbacks from "../Feedbacks/Feedbacks";

const Hotel = () => {
    const [page, setPage] = useState(1);
    const {hotel} = useSelector(({hotels}) => hotels);
    const {list} = useSelector(({rooms}) => rooms);
    const {inDate, outDate} = useSelector(({calendar}) => calendar);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const {id} = useParams();
    const {currentUser} = useSelector(({user}) => user);
    const navigate = useNavigate();
    const {feedbacks, avg} = useSelector(({feedbacks}) => feedbacks);

    useEffect(() => {
        (async () => {
            if(inDate && outDate) await dispatch(getAvailableRooms({
                inDate: inDate,
                outDate: outDate,
                hotelId: id,
            }));
            else await dispatch(getRoomsInHotel({id}));
            await dispatch(getHotelById({id}));
            await dispatch(getAverageRating({hotelId: id}));
            setLoading(false);
        })()
    }, [id, inDate, outDate, dispatch])

    const handleNextClick = () => {
        setPage(page+1);
        dispatch(getRoomsInHotel({id}))
    }

    const handlePrevClick = () => {
        setPage(page-1);
        dispatch(getRoomsInHotel({id}))
    }

    const isAvailable = () => {
        if(list.length < 10) return false;
        return true;
    }

    const handleDeleteClick = (id) => {
        if(window.confirm(`Вы уверены, что не пожалеете о своём решении удалить отель ${hotel.name}?`)) {
            dispatch(deleteHotel({id}));
            navigate(MAIN_ROUTE);
        }
    }

    const handleCreateClick = () => {
        dispatch(toggleCreateRoomForm(true))
    }

    const handleFeedbacksClick = () => {
        dispatch(getFeedbacks({hotelId: hotel.id}))
        dispatch(toggleFeedbacks(true))
    }

    return (
        <>
            <Header/>
            {loading ?
                <div>loading...</div>
                :
                <div>
                    <div className={styles.hotel}>
                        <div>
                            <img className={styles.hotelImg} src={'http://localhost:80/' + hotel.images[0]} alt={'hotelImage'}/>
                        </div>
                        <div className={styles.hotelInfo}>
                            <span className={styles.hotelName}>{hotel.name}</span>
                            <span>{hotel.description}</span>
                            <span>{hotel.starRating} ★</span>
                            {
                                currentUser && (currentUser.isAdmin &&
                                    <div className={styles.deleteButton} onClick={() => {handleDeleteClick(hotel.id)}}>
                                        Delete hotel
                                    </div>
                                )
                            }
                            {
                                currentUser && (currentUser.isAdmin &&
                                    <div className={styles.createButton} onClick={() => {handleCreateClick()}}>
                                        Create room
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className={styles.feedbacks}>
                        <div>
                            Now we have {hotel.feedbacks.length} feedbacks! :) Average rating: {avg}
                        </div>
                        <div className={styles.createButton} onClick={() => {handleFeedbacksClick()}}>
                                    Leave feedback!
                        </div>
                    </div>
                    <Input/>
                    <Rooms rooms={list}></Rooms>
                    <div className={styles.pageButtons}>
                        {page>1 ?
                            <button onClick={() => handlePrevClick()}>{`< < < prev`}</button>
                            :
                            <span>{`< < < prev`}</span>
                        }
                        {isAvailable() ?
                            <button onClick={() => handleNextClick()}>next > > ></button>
                            :
                            <span>next > > ></span>}
                    </div>
                    <CreateRoomForm/>
                    <Feedbacks feedbacks={feedbacks}></Feedbacks>
                </div>
            }
        </>
    );
};

export default Hotel;