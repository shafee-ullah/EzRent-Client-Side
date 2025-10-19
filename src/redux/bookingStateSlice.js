import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Async thunk to fetch total bookings
export const fetchTotalBookings = createAsyncThunk(
  "bookings/fetchTotalBookings",
  async (_, { rejectWithValue }) => {
    try {
<<<<<<< HEAD
      const response = await axios.get("https://ez-rent-server-side-seven.vercel.app/totalBookings"); // change to your backend URL
=======
      const response = await axios.get("https://ez-rent-server-side.vercel.app/totalBookings"); // change to your backend URL
>>>>>>> 4746d7720caef06d86f0775b65cff25679fa5525
      return response.data.totalBookings;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Server Error");
    }
  }
);

const bookingStatsSlice = createSlice({
  name: "bookingStats",
  initialState: {
    totalBookings: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTotalBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTotalBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.totalBookings = action.payload;
      })
      .addCase(fetchTotalBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookingStatsSlice.reducer;
