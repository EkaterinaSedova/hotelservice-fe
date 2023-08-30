import { createSlice } from "@reduxjs/toolkit";

const calendarSlice = createSlice({
    name: "calendar",
    initialState: {
        showForm: false,
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
            state.showForm = payload;
        },
    },
});

export const {toggleCalendar} = calendarSlice.actions;
export default calendarSlice.reducer;