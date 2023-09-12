import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL, createHotelAddress} from "../../utils/consts";


export const createHotel = createAsyncThunk(
    'hotels/createHotel',
    async (payload, hotelAPI) => {
        try {
            const res = await axios.post(`${BASE_URL}/hotels/`, payload,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return res.data;
        } catch (err) {
            console.log(err);
            return hotelAPI.rejectWithValue(err)
        }
    }
)

export const getHotels = createAsyncThunk(
    'hotels/getHotels',
    async (payload, hotelAPI) => {
    try {
        const res = await axios(`${BASE_URL}/hotels`, {
            params: {
                ...payload,
                limit: 10,
            }
        });
        return res.data;
    } catch (err) {
        console.log(err);
        return hotelAPI.rejectWithValue(err)
    }
})

export const deleteHotel = createAsyncThunk(
    'hotels/deleteHotel',
    async (payload, hotelAPI) => {
        try {
            const res = await axios.delete(`${BASE_URL}/hotels/${payload.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return res.data;
        } catch (err) {
            console.log(err);
            return hotelAPI.rejectWithValue(err)
        }
    }
)
export const getHotelById = createAsyncThunk(
    'hotels/getHotelById',
    async (payload, hotelAPI) => {
        try {
            const res = await axios(`${BASE_URL}/hotels/hotel/${payload.id}`);
            return res.data;
        } catch (err) {
            console.log(err);
            return hotelAPI.rejectWithValue(err)
        }
    }
)

const initialState = {
    hotels: [],
    hotel: {},
    showCreateHotelForm: false,
    createHotelFormStage: createHotelAddress,
    isLoading: false,
}

const hotelsSlice = createSlice({
    name: 'hotels',
    initialState,
    reducers: {
        toggleShowCreateHotelForm: (state, { payload }) => {
            state.showCreateHotelForm = payload;
        },
        toggleCreateHotelFormStage: (state, { payload }) => {
            state.createHotelFormStage = payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getHotels.pending, (state) => {
            state.isLoaing = true;
        })
        builder.addCase(getHotels.fulfilled, (state, action) => {
            state.hotels = action.payload;
            state.isLoading = false;
        })
        builder.addCase(getHotels.rejected, (state) => {
            state.isLoading = false;
        })
        builder.addCase(createHotel.pending, (state) => {
            state.isLoaing = true;
        })
        builder.addCase(createHotel.fulfilled, (state, action) => {
            state.hotel = action.payload;
            state.isLoading = false;
        })
        builder.addCase(createHotel.rejected, (state) => {
            state.isLoading = false;
        })
        builder.addCase(getHotelById.pending, (state) => {
            state.isLoaing = true;
        })
        builder.addCase(getHotelById.fulfilled, (state, action) => {
            state.hotel = action.payload;
            state.isLoading = false;
        })
        builder.addCase(getHotelById.rejected, (state) => {
            state.isLoading = false;
        })
        builder.addCase(deleteHotel.fulfilled, (state) => {
            state.isLoading = false
        })
    }
})
export const {toggleShowCreateHotelForm, toggleCreateHotelFormStage} = hotelsSlice.actions;
export default hotelsSlice.reducer;