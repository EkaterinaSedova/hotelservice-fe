import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "../../utils/consts";

export const getUser = createAsyncThunk(
    "users/getUser",
    async (payload, userAPI) => {
        try {
            const {data} = await axios(`${BASE_URL}/users/${payload.id}`);
            return data;
        } catch (err) {
            console.log(err);
            return userAPI.rejectWithValue(err);
        }
    }
)
export const createUser = createAsyncThunk(
    "users/createUser",
    async (payload, userAPI) => {
        try {
            const {data} = await axios.post(`${BASE_URL}/auth/registration`, {
                login: payload.login,
                password: payload.password,
                name: payload.name,
                isAdmin: false
            });
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
    async (payload, userAPI) => {
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
            return userAPI.rejectWithValue(err);
        }
    }
);

const addCurrentUser = (state, {payload}) => {
    state.currentUser = payload;
};

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isLoading: false,
        formType: "login",
        showForm: false,
    },
    reducers: {
        removeUser (state) {
            state.currentUser = null;
        },
        toggleForm: (state, { payload }) => {
            state.showForm = payload;
        },
        toggleFormType: (state, { payload }) => {
            state.formType = payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.fulfilled, addCurrentUser);
        builder.addCase(loginUser.fulfilled, addCurrentUser);
        builder.addCase(getUser.fulfilled, addCurrentUser);
    },
});

export const {removeUser, toggleForm, toggleFormType} = userSlice.actions;
export default userSlice.reducer;