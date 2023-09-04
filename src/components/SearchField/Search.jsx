import React, {useState} from 'react';
import styles from "../InputField/InputField.module.css";
import {useDispatch} from "react-redux";
import {getHotels} from "../../store/hotels/hotelsSlice";

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
        <div className={styles.InputField}>
            <span className={styles.InputText}>Find hotel: </span>
            <input
                required
                name={"name"}
                placeholder={'Search hotel...'}
                className={styles.InputText}
                value={hotelName}
                onChange={e => setHotelName(e.target.value)}
            />
            <button onClick={handleSearchClick}>search</button>
        </div>
    );
};

export default Search;