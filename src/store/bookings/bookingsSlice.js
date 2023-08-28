import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "../../utils/consts";
export const getBookingsOfUser = createAsyncThunk(
    'bookings/getBookingsByUserId',
    async (payload, bookingAPI) => {
        try {
            const res = await axios(`${BASE_URL}/bookings/user/${payload.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return res.data;
        } catch (err) {
            console.log(err);
            return bookingAPI.rejectWithValue(err)
        }
    }
)

const initialState = {
    list: [],
    isLoading: false,
}

const bookingsSlice = createSlice({
    name: 'bookings',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getBookingsOfUser.pending, (state) => {
            state.isLoaing = true;
        })
        builder.addCase(getBookingsOfUser.fulfilled, (state, action) => {
            state.list = action.payload;
            state.isLoading = false;
        })
        builder.addCase(getBookingsOfUser.rejected, (state) => {
            state.isLoading = false;
        })
    }
})

export default bookingsSlice.reducer;