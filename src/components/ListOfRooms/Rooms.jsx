import React from 'react';
import styles from './Rooms.module.css'
import {HOTEL_ROUTE} from "../../routing/paths";
import {Link} from "react-router-dom";

const Hotels = ({rooms}) => {
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
                        <div className={styles.roomButton}>Book</div>
                        {
                            window.location.pathname === '/search/'
                            &&
                            <Link to={HOTEL_ROUTE + `/${room.hotelId}`} className={styles.roomButton}>
                                Go to hotel page
                            </Link>
                        }
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Hotels;