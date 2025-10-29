import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

export const addReview = createAsyncThunk(
  "reviews/addReview",
  async (reviewData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/reviews",
        reviewData
      );
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
        `http://localhost:5000/api/reviews?reviewCardId=${reviewCardId}`
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
    const response = await fetch(
      `http://localhost:5000/api/reviews/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      }
    );
    if (!response.ok) throw new Error("Failed to update review");
    return response.json();
  }
);

// Delete review
export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/reviews/${id}`
      );
      toast.success("Review deleted!");
      return id;
    } catch (error) {
      toast.error("Failed to delete review");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ GET all reviews
export const getAllReviews = createAsyncThunk(
  "reviews/getAllReviews",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/allReview`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getReviewsByEmail = createAsyncThunk(
  "reviews/getReviewsByEmail",
  async (email, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/hostReview?email=${email}`
      );
      return res.data;
    } catch (error) {
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
      .addCase(getAllReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getAllReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

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
        const index = state.items.findIndex(
          (r) => r._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.items = state.items.filter((r) => r._id !== action.payload);
      })
      .addCase(getReviewsByEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReviewsByEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getReviewsByEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

export default reviewSlice.reducer;
