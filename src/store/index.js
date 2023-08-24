import { configureStore } from "@reduxjs/toolkit";
import hotelsSlice from "./hotels/hotelsSlice";
import roomsSlice from "./rooms/roomsSlice";

export const store = configureStore({
    reducer: {
        hotels: hotelsSlice,
        rooms: roomsSlice,
    },
    devTools: true,
});