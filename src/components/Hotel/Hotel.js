import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getHotelById} from "../../store/hotels/hotelsSlice";
import Header from "../Header/Header";
import styles from './Hotel.module.css'

const Hotel = () => {
    const dispatch = useDispatch();
    const {hotel} = useSelector(({hotels}) => hotels);
    const {id} = useParams();

    useEffect(() => {
        dispatch(getHotelById(id))
    }, [id, dispatch])

    return (
        <>
            <Header/>
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
        </>
    );
};

export default Hotel;