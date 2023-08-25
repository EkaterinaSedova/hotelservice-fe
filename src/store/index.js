import { configureStore } from "@reduxjs/toolkit";
import hotelsSlice from "./hotels/hotelsSlice";
import roomsSlice from "./rooms/roomsSlice";
import userSlice from "./user/userSlice";

export const store = configureStore({
    reducer: {
        hotels: hotelsSlice,
        rooms: roomsSlice,
        user: userSlice,
    },
    devTools: true,
});