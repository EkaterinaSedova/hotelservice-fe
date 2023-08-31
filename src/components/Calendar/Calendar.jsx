import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styles from './Calendar.module.css'
import {areEqualDates, getMonthData} from "../../utils/common";
import {selectInDate, selectOutDate, toggleCalendar} from "../../store/calendar/calendarSlice";

const Calendar = ({closeCalendar}) => {
    const {monthNames, weekNames, calendarType} = useSelector(({calendar}) => calendar);
    const dispatch = useDispatch();
    const now = new Date();
    const [date, setDate] = useState(new Date(now.getFullYear(), now.getMonth()));

    const handlePrevClick = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() - 1));
    }

    const handleNextClick = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() + 1));
    }

    const handleDayClick = (selectedDate) => {
        if(selectedDate < now && !areEqualDates(selectedDate, now)) return;
        const selectedDateParsed = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`;
        if(calendarType === 'inDate') dispatch(selectInDate({inDate: selectedDateParsed}));
        else dispatch(selectOutDate({outDate: selectedDateParsed}));
        dispatch(toggleCalendar(false))
    }

    const monthData = getMonthData(date.getFullYear(), date.getMonth());

    const {showCalendar} = useSelector(({calendar}) => calendar);
    return showCalendar ? (
        <div className={styles.calendarContainer}>
            <div className={styles.calendar}>
                <div onClick={closeCalendar} className={styles.closeButton}>
                    ✖
                </div>
                <header>
                    {date > now ? <button onClick={handlePrevClick}>{'<'}</button> : <button onClick={handlePrevClick} disabled>{'<'}</button>}

                    <select
                        onChange={e => {setDate(new Date(date.getFullYear(), e.target.selectedIndex))}}
                        value={date.getMonth()}
                    >
                        {monthNames.map((month, index) => <option key={index} value={index}>{month}</option>)}
                    </select>

                    <select
                        onChange={e => {setDate(new Date(e.target.value, date.getMonth()))}}
                        value={date.getFullYear()}
                    >
                        <option value={2023}>2023</option>
                        <option value={2024}>2024</option>
                        <option value={2025}>2025</option>
                    </select>

                    <button onClick={handleNextClick}>{'>'}</button>
                </header>

                <table>
                    <thead>
                    <tr>
                        {weekNames.map((day) => <th key={day}>{day}</th>)}
                    </tr>
                    </thead>

                    <tbody>
                    {monthData.map((week, index) =>
                        <tr key={index}>
                            {week.map((date, index) => date.day ?
                                <td
                                    key={index}
                                    className={date.day > now ? styles.day : areEqualDates(date.day, now) ? styles.today : styles.unavailableDay}
                                    onClick={() => {handleDayClick(date.day)}}
                                >{date.day.getDate()}</td>
                                :
                                <td key={index} />
                            )}
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    ) : (
        <></>
    );
};

export default Calendar;