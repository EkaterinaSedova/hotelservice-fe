import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getHotelById} from "../../store/hotels/hotelsSlice";
import Header from "../Header/Header";
import styles from './Hotel.module.css'
import {useParams} from "react-router-dom";

const Hotel = () => {
    const {hotel} = useSelector(({hotels}) => hotels);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(() => {
        (async () => {
            await dispatch(getHotelById({id}));
            setLoading(false);
        })()
    }, [id, dispatch])

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
                </div>
            }
        </>
    );
};

export default Hotel;