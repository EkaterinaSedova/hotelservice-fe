import React from 'react';
import styles from '../Main.module.css'

const HotelItem = ({hotels}) => {
    return (
        <div className={styles.hotelItemContainer}>
            {hotels.map(hotel => (
                <div key={hotel.id} className={styles.hotelItem}>
                    <div className={styles.hotelItemImgContainer}>
                        <img className={styles.hotelItemImg} src={'http://localhost:80/' + hotel.images[0]} alt={'hotelImage'}/>
                    </div>
                    <div className={styles.hotelItemInfo}>
                        <span className={styles.hotelItemName}>{hotel.name}</span>
                        <span>{hotel.description}</span>
                        <span>{hotel.starRating} ★</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HotelItem;