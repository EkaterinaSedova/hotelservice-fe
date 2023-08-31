import { createSlice } from "@reduxjs/toolkit";

const calendarSlice = createSlice({
    name: "calendar",
    initialState: {
        showCalendar: false,
        calendarType: 'inDate',
        inDate: '',
        outDate: '',
        monthNames: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ],
        weekNames: [
            'Mon',
            'Tue',
            'Wen',
            'Thu',
            'Fri',
            'Sat',
            'Sun'
        ]
    },
    reducers: {
        toggleCalendar: (state, { payload }) => {
            state.showCalendar = payload;
        },
        toggleCalendarType: (state, { payload }) => {
            state.calendarType = payload;
        },
        selectInDate: (state, { payload }) => {
            state.inDate = payload.inDate;
        },
        selectOutDate: (state, { payload }) => {
            state.outDate = payload.outDate;
        },
    },
});

export const {toggleCalendar, selectInDate, selectOutDate, toggleCalendarType} = calendarSlice.actions;
export default calendarSlice.reducer;