import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "../../utils/consts";

export const createUser = createAsyncThunk(
    "users/createUser",
    async (payload, userAPI) => {
        try {
            const {data} = await axios.post(`${BASE_URL}/auth/registration`, payload);
            localStorage.setItem('token', data.token)
            return payload;
        } catch (err) {
            console.log(err);
            return userAPI.rejectWithValue(err);
        }
    }
);

export const loginUser = createAsyncThunk(
    "users/loginUser",
    async (payload, thunkAPI) => {
        try {
            const {data} = await axios.post(`${BASE_URL}/auth/login`, {
                login: payload.login,
                password: payload.password
            });
            console.log(payload);
            console.log(data.token)
            localStorage.setItem('token', data.token)
            return payload;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err);
        }
    }
);

const addCurrentUser = (state, { payload }) => {
    state.currentUser = payload;
};

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        cart: [],
        isLoading: false,
        formType: "signup",
        showForm: false,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.fulfilled, addCurrentUser);
    },
});
export default userSlice.reducer;