import React from 'react';
import styles from './Search.module.css'
import {HOTEL_ROUTE} from "../../routing/paths";
import {Link} from "react-router-dom";

const Hotels = ({rooms}) => {
    return (
        <div className={styles.roomItemContainer} onClick={() => {}}>
            {rooms.map(room => (
                <Link to={HOTEL_ROUTE + `/${room.hotelId}`} className={styles.roomItem} key={room.id}>
                    <div className={styles.roomItemImgContainer}>
                        <img className={styles.roomItemImg} src={'http://localhost:80/' + room.images[0]} alt={'roomImage'}/>
                    </div>
                    <div className={styles.roomItemInfo}>
                        ну тут короче инфа какая-то
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Hotels;