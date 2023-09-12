import React, {useState} from 'react';
import styles from './InputField.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {SEARCH_ROUTE} from "../../routing/paths";
import {toggleCalendar, toggleCalendarType} from "../../store/calendar/calendarSlice";
import Calendar from "../Calendar/Calendar";
import moment from 'moment';
import Down from '../../img/Down.svg'
import North from '../../img/North.svg'

const InputField = () => {
    const navigate = useNavigate();
    const {search} = useLocation();
    const {inDate, outDate} = useSelector(({calendar}) => calendar);
    const country = new URLSearchParams(search).get('country');
    const city = new URLSearchParams(search).get('city');
    const fridge = '';
    const places = new URLSearchParams(search).get('places');

    const [values, setValues] = useState({
        inDate: inDate,
        outDate: outDate,
        country: country || '',
        city: city || '',
        fridge: '',
        price: '',
        places: places || '',
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
        if ((!values.city || !values.country) || (!values.inDate && !inDate) || (!values.outDate && !outDate)) {
            alert('Вы должны указать даты заезда и выезда, а также место (страну или город)')
            return;
        }
        let route = SEARCH_ROUTE
        if(values.country || country) route += `/?country=${values.country || country}`;
        if(values.city || country) route += `&city=${values.city || country}`;
        route += `&inDate=${values.inDate || inDate}&outDate=${values.outDate || outDate}`;
        if(values.fridge || fridge) route += `&fridge=${values.fridge}`;
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
        return moment(parsed).format("DD MMMM YYYY")
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
                <div className={styles.inputDateContainer} onClick={handleInDateClick}>
                    <div
                        className={styles.InputDate}
                    >{inDate ? <span>{dateParsed(inDate)}</span> : <span>{'Choose date'}</span>}</div>
                    <img src={Down} alt="choose date"/>
                </div>
                <div onClick={handleOutDateClick} className={styles.inputDateContainer}>
                    <div
                        className={styles.InputDate}
                    >{outDate ? <span>{dateParsed(outDate)}</span> : <span>{'Choose date'}</span>}</div>
                    <img src={Down} alt="choose date"/>
                </div>
                <div
                    className={styles.InputButton}
                    onClick={() => handleFindClick()}
                >
                    <span>Find</span>
                    <img className={styles.north} src={North} alt="find"/>
                </div>
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