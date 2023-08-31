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

export const deleteBooking = createAsyncThunk(
    'bookings/deleteBooking',
    async (payload, bookingAPI) => {
        try {
            const res = await axios.delete(`${BASE_URL}/bookings/${payload.id}`, {
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
export const createBooking = createAsyncThunk(
    "bookings/createBooking",
    async (payload, bookingAPI) => {
        try {
            const {data} = await axios.post(`${BASE_URL}/bookings   `, {
                inDate: payload.inDate,
                outDate: payload.outDate,
                userId: payload.userId,
                roomId: payload.roomId,
                hotelId: payload.hotelId
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return payload;
        } catch (err) {
            console.log(err);
            return bookingAPI.rejectWithValue(err);
        }
    }
);

const initialState = {
    list: [],
    showBookingForm: false,
    isLoading: false,
}

const bookingsSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {
        toggleBookingForm: (state, { payload }) => {
            state.showBookingForm = payload;
        },
    },
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

export const {toggleBookingForm} = bookingsSlice.actions;
export default bookingsSlice.reducer;