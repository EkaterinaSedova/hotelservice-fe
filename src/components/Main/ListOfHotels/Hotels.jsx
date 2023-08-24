import React from 'react';
import styles from '../Main.module.css'
import {NavLink} from "react-router-dom";
import {HOTEL_ROUTE} from "../../../routing/paths";

const Hotels = ({hotels}) => {
    return (
        <div className={styles.hotelItemContainer}>
            {hotels.map(hotel => (
                <div key={hotel.id} className={styles.hotelItem}>
                    <div className={styles.hotelItemImgContainer}>
                        <img className={styles.hotelItemImg} src={'http://localhost:80/' + hotel.images[0]} alt={'hotelImage'}/>
                    </div>
                    <div className={styles.hotelItemInfo}>
                        <NavLink to={HOTEL_ROUTE + `/${hotel.id}`} className={styles.hotelItemName}>{hotel.name}</NavLink>
                        <span>{hotel.description}</span>
                        <span>{hotel.starRating} ★</span>
                        <span>{hotel.country}, {hotel.city}, {hotel.address}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Hotels;