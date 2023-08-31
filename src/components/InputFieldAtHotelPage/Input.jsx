import React, {useState} from 'react';
import styles from '../InputField/InputField.module.css'
import {useDispatch, useSelector} from "react-redux";
import {toggleCalendar, toggleCalendarType} from "../../store/calendar/calendarSlice";
import Calendar from "../Calendar/Calendar";
import {getAvailableRooms} from "../../store/rooms/roomsSlice";
import {useParams} from "react-router-dom";

const Input = () => {
    const {inDate, outDate} = useSelector(({calendar}) => calendar);
    const [values, setValues] = useState({
        fridge: '',
        price: '',
        places: '',
    });
    const dispatch = useDispatch();
    const {id} = useParams();

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
        if(!inDate || !outDate) {
            alert('Вы должны указать даты заезда и выезда')
            return;
        }
        dispatch(getAvailableRooms({
            inDate: inDate,
            outDate: outDate,
            hotelId: id,
            fridge: values.fridge,
            price: values.price,
            places: values.places
        }));
    }
    const handleInDateClick = () => {
        dispatch(toggleCalendarType('inDate'));
        dispatch(toggleCalendar(true));
    }

    const handleOutDateClick = () => {
        dispatch(toggleCalendarType('outDate'));
        dispatch(toggleCalendar(true));
    }

    const dateParsed = (selectedDate) => {
        const parsed = new Date(Date.parse(selectedDate));
        return `${parsed.getDate()}.${parsed.getMonth() + 1}.${parsed.getFullYear()}`
    }

    const closeCalendar = () => dispatch(toggleCalendar(false));

    return (
        <>
            <div className={styles.InputField}>
                <button
                    onClick={handleInDateClick}
                    className={styles.InputButton}
                >{inDate ? <span>{dateParsed(inDate)}</span> : <span>check-in</span>}</button>
                <button
                    onClick={handleOutDateClick}
                    className={styles.InputButton}
                >{outDate ? <span>{dateParsed(outDate)}</span> : <span>check-out</span>}</button>
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
            </div>
            <Calendar closeCalendar={closeCalendar}/>
        </>
    );
};

export default Input;