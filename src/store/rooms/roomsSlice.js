import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "../../utils/consts";

export const getAvailableRooms = createAsyncThunk(
    'rooms/getAvailableRooms',
    async (payload, roomAPI) => {
        try {
            const res = await axios(`${BASE_URL}/rooms/${payload.page || 1}?limit=10&outDate=${payload.outDate}&inDate=${payload.inDate}&country=${payload.country}&city=${payload.city}`);
            return res.data;
        } catch (err) {
            console.log(err);
            return roomAPI.rejectWithValue(err)
        }
    })
export const getRoomsInHotel = createAsyncThunk(
    'rooms/getRoomsInHotel',
    async (payload, roomAPI) => {
        try {
            const res = await axios(`${BASE_URL}/rooms/hotel/${payload.page || 1}?limit=10&hotelId=${payload.id}`);
            return res.data;
        } catch (err) {
            console.log(err);
            return roomAPI.rejectWithValue(err)
        }
    })

const initialState = {
    list: [],
    room: {},
    isLoading: false,
}

const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getAvailableRooms.pending, (state) => {
            state.isLoaing = true;
        })
        builder.addCase(getAvailableRooms.fulfilled, (state, action) => {
            state.list = action.payload;
            state.isLoading = false;
        })
        builder.addCase(getAvailableRooms.rejected, (state) => {
            state.isLoading = false;
        })
        builder.addCase(getRoomsInHotel.pending, (state) => {
            state.isLoaing = true;
        })
        builder.addCase(getRoomsInHotel.fulfilled, (state, action) => {
            state.list = action.payload;
            state.isLoading = false;
        })
        builder.addCase(getRoomsInHotel.rejected, (state) => {
            state.isLoading = false;
        })
    }
})

export default roomsSlice.reducer;