import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "../../utils/consts";

export const getHotels = createAsyncThunk(
    'hotels/getHotels',
    async (page, hotelAPI) => {
    try {
        const res = await axios(`${BASE_URL}/hotels/${page}?limit=2`);
        return res.data;
    } catch (err) {
        console.log(err);
        return hotelAPI.rejectWithValue(err)
    }
})

const initialState = {
    list: [],
    isLoading: false,
}

const hotelsSlice = createSlice({
    name: 'hotels',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getHotels.pending, (state) => {
            state.isLoaing = true;
        })
        builder.addCase(getHotels.fulfilled, (state, action) => {
            state.list = action.payload;
            state.isLoading = false;
        })
        builder.addCase(getHotels.rejected, (state) => {
            state.isLoading = false;
        })
    }
})

export default hotelsSlice.reducer;