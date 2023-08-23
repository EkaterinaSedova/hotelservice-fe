import { configureStore } from "@reduxjs/toolkit";
import hotelsSlice from "./hotels/hotelsSlice";

export const store = configureStore({
    reducer: {
        hotels: hotelsSlice,
    },
    devTools: true,
});