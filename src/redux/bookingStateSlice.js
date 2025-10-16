import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Async thunk to fetch total bookings
export const fetchTotalBookings = createAsyncThunk(
<<<<<<< HEAD
    "bookings/fetchTotalBookings",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("http://localhost:5000/totalBookings"); // change to your backend URL
            return response.data.totalBookings;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Server Error");
        }
=======
  "bookings/fetchTotalBookings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/totalBookings"); // change to your backend URL
      return response.data.totalBookings;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Server Error");
>>>>>>> b06aaac05cf2e853a83262960f8d3cda933d2913
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
