import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "../../utils/consts";

export const deleteAddress = createAsyncThunk(
    'addresses/deleteAddress',
    async (payload, bookingAPI) => {
        try {
            const res = await axios.delete(`${BASE_URL}/address/${payload.id}`, {
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
export const createAddress = createAsyncThunk(
    "addresses/createAddress",
    async (payload, addressAPI) => {
        try {
            const {data} = await axios.post(`${BASE_URL}/address`, {
                country: payload.country,
                city: payload.city,
                address: payload.address
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return data;
        } catch (err) {
            console.log(err);
            return addressAPI.rejectWithValue(err);
        }
    }
);

const initialState = {
    address: {},
    isLoading: false,
}

const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(deleteAddress.pending, (state) => {
            state.isLoaing = true;
        })
        builder.addCase(deleteAddress.fulfilled, (state) => {
            state.isLoading = false;
        })
        builder.addCase(deleteAddress.rejected, (state) => {
            state.isLoading = false;
        })
        builder.addCase(createAddress.pending, (state) => {
            state.isLoaing = true;
        })
        builder.addCase(createAddress.fulfilled, (state, action) => {
            state.isLoaing = true;
            state.address = action.payload;
        })
    }
})
export default addressSlice.reducer;