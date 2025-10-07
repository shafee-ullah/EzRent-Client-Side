import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🟢 Fetch All Properties
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await axios.get("https://ez-rent-server-side.vercel.app/properties");
    return res.data;
  }
);

// 🟢 Fetch Limit (Featured)
export const fetchlimit = createAsyncThunk("products/fetchLimit", async () => {
  const res = await axios.get("https://ez-rent-server-side.vercel.app/FeaturedProperties");
  return res.data;
});

// 🟢 Fetch All Bookings (Admin)
export const fetchbooking = createAsyncThunk("products/fetchbooking", async () => {
  const res = await axios.get("http://localhost:5000/bookinghotel");
  return res.data;
});

// 🟢 Fetch My Bookings (by email)
export const fetchMyBooking = createAsyncThunk(
  "products/fetchMyBooking",
  async (email, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:5000/myBookings", {
        params: { email },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch bookings");
    }
  }
);

// 🟢 Fetch Single User by Email
export const fetchUserByEmail = createAsyncThunk(
  "products/fetchUserByEmail",
  async (email) => {
    const res = await axios.get(`http://localhost:5000/users/${email}`);
    return res.data;
  }
);

// 🟢 CRUD Actions
export const deleteBooking = createAsyncThunk(
  "products/deleteBooking",
  async (bookingId) => {
    await axios.delete(`http://localhost:5000/bookinghotel/${bookingId}`);
    return bookingId;
  }
);

export const updateProperty = createAsyncThunk(
  "products/updateProperty",
  async ({ propertyId, updatedData }) => {
    await axios.put(`http://localhost:5000/properties/${propertyId}`, updatedData);
    return { propertyId, updatedData };
  }
);

export const deleteProperty = createAsyncThunk(
  "products/deleteProperty",
  async (propertyId) => {
    await axios.delete(`http://localhost:5000/properties/${propertyId}`);
    return propertyId;
  }
);

export const fetchHostRequests = createAsyncThunk(
  "products/fetchHostRequests",
  async () => {
    const res = await axios.get("http://localhost:5000/hostRequest");
    return res.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [], // 🏠 all properties
    featured: [],
    bookings: [], // ✅ separate from items
    myBookings: [], // ✅ separate for logged-in user
    user: null,
    hostRequests: [],
    loading: false,
    error: null,
  },

  reducers: {
    updateBookingStatus: (state, action) => {
      const { bookingId, newStatus } = action.payload;
      const booking = state.bookings.find((b) => b._id === bookingId);
      if (booking) booking.status = newStatus;
    },
  },

  extraReducers: (builder) => {
    builder
      // 🏠 Fetch all properties
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ⭐ Featured
      .addCase(fetchlimit.fulfilled, (state, action) => {
        state.featured = action.payload;
      })

      // 🧾 All bookings
      .addCase(fetchbooking.fulfilled, (state, action) => {
        state.bookings = action.payload;
      })

      // 🙋 My bookings
      .addCase(fetchMyBooking.fulfilled, (state, action) => {
        state.myBookings = action.payload;
      })

      // 👤 User
      .addCase(fetchUserByEmail.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      // 🗑 Delete property
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      })

      // 🗑 Delete booking
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter((b) => b._id !== action.payload);
        state.myBookings = state.myBookings.filter((b) => b._id !== action.payload);
      })

      // 🏗 Update property
      .addCase(updateProperty.fulfilled, (state, action) => {
        const { propertyId, updatedData } = action.payload;
        state.items = state.items.map((item) =>
          item._id === propertyId ? { ...item, ...updatedData } : item
        );
      })

      // 🧾 Host requests
      .addCase(fetchHostRequests.fulfilled, (state, action) => {
        state.hostRequests = action.payload;
      });
  },
});

export default productSlice.reducer;
