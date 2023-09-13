import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "../../utils/consts";


export const createRoom = createAsyncThunk(
    'rooms/createRoom',
    async (payload, roomAPI) => {
        try {
            const res = await axios.post(`${BASE_URL}/rooms/`, payload,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return res.data;
        } catch (err) {
            console.log(err);
            return roomAPI.rejectWithValue(err)
        }
    }
)
export const deleteRoom = createAsyncThunk(
    'rooms/deleteRoom',
    async (payload, roomAPI) => {
        try {
            const res = await axios.delete(`${BASE_URL}/rooms/${payload.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return res.data;
        } catch (err) {
            console.log(err);
            return roomAPI.rejectWithValue(err)
        }
    }
)
export const getAvailableRooms = createAsyncThunk(
    'rooms/getAvailableRooms',
    async (payload, roomAPI) => {
        try {
            const res = await axios(`${BASE_URL}/rooms/`, {params: {
                    ...payload,
                    limit: 10,
                    page: payload.page || 1
                }});
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
            const res = await axios(`${BASE_URL}/rooms/hotel/`, {params: {
                    hotelId: payload.id,
                    limit: 10,
                    page: payload.page || 1
                }});
            return res.data;
        } catch (err) {
            console.log(err);
            return roomAPI.rejectWithValue(err)
        }
    })

export const getRoom = createAsyncThunk(
    'rooms/getRoom',
    async (payload, roomAPI) => {
        try {
            const res = await axios(`${BASE_URL}/rooms/room/${payload.roomId}`);
            return res.data;
        } catch (err) {
            console.log(err);
            return roomAPI.rejectWithValue(err)
        }
    })

const initialState = {
    list: [],
    room: {},
    showCreateRoomForm: false,
    isLoading: false,
}

const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        toggleCreateRoomForm: (state, { payload }) => {
            state.showCreateRoomForm = payload;
        },
    },
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
        builder.addCase(deleteRoom.fulfilled, (state) => {
            state.isLoading = false;
        })
        builder.addCase(getRoom.fulfilled, (state, action) => {
            state.room = action.payload;
            state.isLoading = false;
        })
    }
})

export const {toggleCreateRoomForm} = roomsSlice.actions;
export default roomsSlice.reducer;