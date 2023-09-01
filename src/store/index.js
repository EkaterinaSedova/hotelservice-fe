import { configureStore } from "@reduxjs/toolkit";
import hotelsSlice from "./hotels/hotelsSlice";
import roomsSlice from "./rooms/roomsSlice";
import userSlice from "./user/userSlice";
import bookingsSlice from "./bookings/bookingsSlice";
import calendarSlice from "./calendar/calendarSlice";
import addressSlice from "./address/addressSlice";

export const store = configureStore({
    reducer: {
        hotels: hotelsSlice,
        rooms: roomsSlice,
        user: userSlice,
        bookings: bookingsSlice,
        calendar: calendarSlice,
        address: addressSlice,
    },
    devTools: true,
});