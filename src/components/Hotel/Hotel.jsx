import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getHotelById} from "../../store/hotels/hotelsSlice";
import Header from "../Header/Header";
import styles from './Hotel.module.css'

const Hotel = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(getHotelById(3));
        setLoading(false);
    }, [dispatch])

    const {hotel} = useSelector(({hotels}) => hotels);

    return (
        <>
            <Header/>
        { loading ?
                <div>
                    loading...
                </div>
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