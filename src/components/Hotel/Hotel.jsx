import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getHotelById} from "../../store/hotels/hotelsSlice";
import Header from "../Header/Header";
import styles from './Hotel.module.css'
import {useParams} from "react-router-dom";
import {getAvailableRooms, getRoomsInHotel} from "../../store/rooms/roomsSlice";
import Rooms from "../ListOfRooms/Rooms";

const Hotel = () => {
    const [page, setPage] = useState(1);
    const {hotel} = useSelector(({hotels}) => hotels);
    const {list} = useSelector(({rooms}) => rooms);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(() => {
        (async () => {
            await dispatch(getRoomsInHotel({id}))
            await dispatch(getHotelById({id}));
            setLoading(false);
        })()
    }, [id, dispatch])

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
                        </div>
                    </div>
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
                </div>
            }
        </>
    );
};

export default Hotel;