import React, {useState} from 'react';
import {useSelector} from "react-redux";
import styles from './Calendar.module.css'
import {getMonthData} from "../../utils/common";

const Calendar = ({closeCalendar}) => {
    const {monthNames, weekNames} = useSelector(({calendar}) => calendar);

    const [date, setDate] = useState(new Date(2023, 0));

    const handlePrevClick = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() - 1));
    }

    const handleNextClick = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() + 1));
    }

    const monthData = getMonthData(date.getFullYear(), date.getMonth())

    const {showForm} = useSelector(({calendar}) => calendar);
    return showForm ? (
        <div className={styles.calendarContainer}>
            <div className={styles.calendar}>
                <div onClick={closeCalendar} className={styles.closeButton}>
                    ✖
                </div>
                <header>
                    <button onClick={handlePrevClick}>{'<'}</button>

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
                                    className={styles.day}
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