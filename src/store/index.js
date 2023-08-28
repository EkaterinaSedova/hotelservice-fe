import { configureStore } from "@reduxjs/toolkit";
import hotelsSlice from "./hotels/hotelsSlice";
import roomsSlice from "./rooms/roomsSlice";
import userSlice from "./user/userSlice";
import bookingsSlice from "./bookings/bookingsSlice";

export const store = configureStore({
    reducer: {
        hotels: hotelsSlice,
        rooms: roomsSlice,
        user: userSlice,
        bookings: bookingsSlice,
    },
    devTools: true,
});