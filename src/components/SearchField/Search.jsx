import React, {useState} from 'react';
import styles from "../InputField/InputField.module.css";
import {useDispatch} from "react-redux";
import {getHotels} from "../../store/hotels/hotelsSlice";
import North from '../../img/North.svg'

const Search = () => {
    const [hotelName, setHotelName] = useState('');
    const dispatch = useDispatch();
    const handleSearchClick = () => {
        dispatch(getHotels({
            page: 1,
            name: hotelName,
        }))
    }
    return (
        <div className={styles.searchField}>
            <input
                required
                name={"name"}
                placeholder={'Search hotel...'}
                className={styles.InputText}
                value={hotelName}
                onChange={e => setHotelName(e.target.value)}
            />
            <div onClick={handleSearchClick}>
                <img src={North} alt="find"/>
            </div>
        </div>
    );
};

export default Search;