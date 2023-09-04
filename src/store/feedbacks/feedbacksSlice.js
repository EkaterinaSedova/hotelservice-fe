import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "../../utils/consts";

export const getFeedbacks = createAsyncThunk(
    'feedbacks/getFeedbacks',
    async (payload, feedbackAPI) => {
        try {
            const res = await axios(`${BASE_URL}/feedbacks/${payload.hotelId}`);
            return res.data;
        } catch (err) {
            console.log(err);
            return feedbackAPI.rejectWithValue(err)
        }
    }
)

export const getAverageRating = createAsyncThunk(
    'feedbacks/getAverageRating',
    async (payload, feedbackAPI) => {
        try {
            const res = await axios(`${BASE_URL}/feedbacks/avg/${payload.hotelId}`);
            return res.data[0].averageRating;
        } catch (err) {
            console.log(err);
            return feedbackAPI.rejectWithValue(err);
        }
    }
)

const initialState = {
    feedbacks: [],
    showFeedbacks: false,
    isLoading: false,
    avg: 0,
}

const feedbacksSlice = createSlice({
    name: 'feedbacks',
    initialState,
    reducers: {
        toggleFeedbacks: (state, { payload }) => {
            state.showFeedbacks = payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getFeedbacks.fulfilled, (state, action) => {
            state.feedbacks = action.payload;
        })
        builder.addCase(getAverageRating.fulfilled, (state, action) => {
            let avg = Number(action.payload).toFixed(2)
            state.avg = avg;
        })
    }
})

export const {toggleFeedbacks} = feedbacksSlice.actions;
export default feedbacksSlice.reducer;