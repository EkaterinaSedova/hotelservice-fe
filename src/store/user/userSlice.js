import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "../../utils/consts";
import jwt_decode from "jwt-decode";

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

export const changeUserRole = createAsyncThunk(
    'users/changeUserRole',
    async (payload, userAPI) => {
        try {
            const res = await axios.post(`${BASE_URL}/users/changeRole`, payload, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
        } catch (err) {
            console.log(err);
            return userAPI.rejectWithValue(err);
        }
    }
)

export const getUsersByName = createAsyncThunk(
    "users/getUsersByName",
    async (payload, userAPI) => {
        try {

            const {data} = await axios(`${BASE_URL}/users`, {params: payload});
            console.log(payload)
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
            localStorage.setItem('token', data.token)
            const {id} = jwt_decode(localStorage.getItem('token'));
            const res = await axios(`${BASE_URL}/users/${id}`);
            return res.data;
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
        users: [],
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
        builder.addCase(getUsersByName.fulfilled, (state, action) => {
            state.users = action.payload;
            state.isLoading = false;
        })
        builder.addCase(createUser.fulfilled, addCurrentUser);
        builder.addCase(loginUser.fulfilled, addCurrentUser);
        builder.addCase(getUser.fulfilled, addCurrentUser);
    },
});

export const {removeUser, toggleForm, toggleFormType} = userSlice.actions;
export default userSlice.reducer;