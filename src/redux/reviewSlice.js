import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

export const addReview = createAsyncThunk(
    "reviews/addReview",
    async (reviewData, { rejectWithValue }) => {
        try {
            const res = await axios.post("https://ez-rent-server-side-seven.vercel.app/api/reviews", reviewData);
            toast.success("Review submitted!");
            return res.data.data;
        } catch (error) {
            toast.error("Failed to submit review");
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const fetchReviews = createAsyncThunk(
    "reviews/fetchReviews",
    async (reviewCardId, { rejectWithValue }) => {
        try {
            const res = await axios.get(
                `https://ez-rent-server-side-seven.vercel.app/api/reviews?reviewCardId=${reviewCardId}`
            );
            return res.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Update review
export const updateReview = createAsyncThunk(
    "reviews/updateReview",
    async ({ id, updatedData }) => {
        const response = await fetch(`https://ez-rent-server-side-seven.vercel.app/api/reviews/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
        });
        if (!response.ok) throw new Error("Failed to update review");
        return response.json();
    }
);


// Delete review
export const deleteReview = createAsyncThunk(
    "reviews/deleteReview",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`https://ez-rent-server-side-seven.vercel.app/api/reviews/${id}`);
            toast.success("Review deleted!");
            return id;
        } catch (error) {
            toast.error("Failed to delete review");
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);



const reviewSlice = createSlice({
    name: "reviews",
    initialState: {
        items: [],
        loading: false,
        error: null,

    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addReview.fulfilled, (state, action) => {
                state.items.unshift(action.payload);
            })
            // fetchReviews & addReview cases (existing)
            .addCase(updateReview.fulfilled, (state, action) => {
                const index = state.items.findIndex(r => r._id === action.payload._id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deleteReview.fulfilled, (state, action) => {
                state.items = state.items.filter(r => r._id !== action.payload);
            });
    },
});

export default reviewSlice.reducer;
