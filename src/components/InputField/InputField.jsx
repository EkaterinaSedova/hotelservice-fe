import React, {useState} from 'react';
import styles from './InputField.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {SEARCH_ROUTE} from "../../routing/paths";
import {toggleCalendar, toggleCalendarType} from "../../store/calendar/calendarSlice";
import Calendar from "../Calendar/Calendar";

const InputField = () => {
    const   navigate = useNavigate();
    const {inDate, outDate} = useSelector(({calendar}) => calendar);
    const [values, setValues] = useState({
        country: '',
        city: '',
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
        if(!values.city && !values.country) {
            alert('Вы должны указать даты заезда и выезда, а также место (страну или город)')
            return;
        }
        let route = SEARCH_ROUTE + `/?country=${values.country}&city=${values.city}&inDate=${inDate}&outDate=${outDate}`;
        if(values.fridge) route += `&fridge=${values.fridge}`;
        if(values.price) route += `&price=${values.price}`;
        if(values.places) route += `&places=${values.places}`;
        navigate(route);
        window.location.reload();
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

export default InputField;