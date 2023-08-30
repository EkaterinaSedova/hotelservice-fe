import React, {useState} from 'react';
import styles from './InputField.module.css'
import {useDispatch} from "react-redux";
import {getAvailableRooms} from "../../store/rooms/roomsSlice";
import {useNavigate} from "react-router-dom";
import {SEARCH_ROUTE} from "../../routing/paths";
import {toggleForm} from "../../store/user/userSlice";
import {toggleCalendar} from "../../store/calendar/calendarSlice";
import Calendar from "../Calendar/Calendar";

const InputField = () => {
    const   navigate = useNavigate();
    const [values, setValues] = useState({
        country: '',
        city: '',
        inDate: '',
        outDate: '',
        fridge: '',
        price: '',
        places: '',
    });
    const dispatch = useDispatch();

    const handleChange = ({ target: { value, name } }) => {
        setValues({ ...values, [name]: value });
    };

    const handleCheckboxChange = ({ target: { checked, name } }) => {
        setValues({...values, [name]: checked});
    }

    const handleSelectChange = ({ target: {value} }) => {
        if(value === 'min') setValues({...values, price: 'asc'});
        if(value === 'max') setValues({...values, price: 'desc'});
    }
    const handleFindClick = () => {
        if(!values.inDate || !values.outDate || (!values.city && !values.country)) {
            alert('Вы должны указать даты заезда и выезда, а также место (страну или город)')
            return;
        }
        let route = SEARCH_ROUTE + `/?country=${values.country}` + `&city=${values.city}` + `&inDate=${values.inDate}` + `&outDate=${values.outDate}`;
        if(values.fridge) route += `&fridge=${values.fridge}`;
        if(values.price) route += `&price=${values.price}`;
        if(values.places) route += `&places=${values.places}`;
        navigate(route);
        window.location.reload();
    }

    const handleDateClick = () => {
        dispatch(toggleCalendar(true))
    }

    const closeCalendar = () => dispatch(toggleCalendar(false));

    return (
        <>
            <div className={styles.InputField}>
                <input
                    required
                    name={"country"}
                    placeholder={'Country'}
                    className={styles.InputText}
                    value={values.country}
                    onChange={handleChange}
                />
                <input
                    required
                    name={"city"}
                    placeholder={'City'}
                    className={styles.InputText}
                    value={values.city}
                    onChange={handleChange}
                />
                <input
                    required
                    name={"inDate"}
                    type={"date"}
                    min={'2023-08-22'}
                    className={styles.InputDate}
                    value={values.inDate}
                    onChange={handleChange}
                />
                <input
                    required
                    name={"outDate"}
                    type={"date"}
                    min={'2023-08-22'}
                    className={styles.InputDate}
                    value={values.outDate}
                    onChange={handleChange}

                />
                <button
                    className={styles.InputButton}
                    onClick={() => handleFindClick()}
                >
                    Find
                </button>
            </div>
            <div className={styles.filters}>
                <div>Additional properties: </div>
                <div>
                    <span>Fridge:</span>
                    <input
                        required
                        name={"fridge"}
                        type={"checkbox"}
                        value={values.fridge}
                        onChange={handleCheckboxChange}
                    />
                </div>
                <div>
                    <span>Places: </span>
                    <input
                        className={styles.filter}
                        required
                        name={"places"}
                        type={"number"}
                        min={1}
                        placeholder={'places'}
                        value={values.places}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <span>Price: </span>
                    <select id={'price'} onChange={handleSelectChange}>
                        <option id={'nvm'}>select...</option>
                        <option id={'min'}>min</option>
                        <option id={'max'}>max</option>
                    </select>
                </div>
                <button onClick={handleDateClick}>временная кнопка для календаря</button>
            </div>
            <Calendar closeCalendar={closeCalendar}/>
        </>
    );
};

export default InputField;