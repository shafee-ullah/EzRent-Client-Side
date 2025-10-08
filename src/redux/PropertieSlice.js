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
export const fetchlimit = createAsyncThunk(
  "products/fetchLimit",
  async () => {
    const res = await axios.get("https://ez-rent-server-side.vercel.app/FeaturedProperties");
    return res.data;
  }
);

// 🟢 Fetch All Bookings (Admin)
export const fetchbooking = createAsyncThunk(
  "products/fetchbooking",
  async () => {
    const res = await axios.get("https://ez-rent-server-side.vercel.app/bookinghotel");
    return res.data;
  }
);

// 🟢 Fetch My Bookings (by email)
export const fetchMyBooking = createAsyncThunk(
  "products/fetchMyBooking",
  async (email, { rejectWithValue }) => {
    try {
      const res = await axios.get("https://ez-rent-server-side.vercel.app/myBookings", {
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
    const res = await axios.get(`https://ez-rent-server-side.vercel.app/users/${email}`);
    return res.data;
  }
);

// 🟢 CRUD Actions
export const deleteBooking = createAsyncThunk(
  "products/deleteBooking",
  async (bookingId) => {
    await axios.delete(`https://ez-rent-server-side.vercel.app/bookinghotel/${bookingId}`);
    return bookingId;
  }
);

export const updateProperty = createAsyncThunk(
  "products/updateProperty",
  async ({ propertyId, updatedData }) => {
    await axios.put(`https://ez-rent-server-side.vercel.app/properties/${propertyId}`, updatedData);
    return { propertyId, updatedData };
  }
);

export const deleteProperty = createAsyncThunk(
  "products/deleteProperty",
  async (propertyId) => {
    await axios.delete(`https://ez-rent-server-side.vercel.app/properties/${propertyId}`);
    return propertyId;
  }
);

export const fetchHostRequests = createAsyncThunk(
  "products/fetchHostRequests",
  async () => {
    const res = await axios.get("https://ez-rent-server-side.vercel.app/hostRequest");
    return res.data;
  }
);

// 🟢 Wishlist Actions
export const addToWishlist = createAsyncThunk(
  "products/addToWishlist",
  async (wishlistItem) => {
    const res = await axios.post("http://localhost:5000/api/wishlist", wishlistItem);
    return res.data;
  }
);

export const removeFromWishlist = createAsyncThunk(
  "products/removeFromWishlist",
  async ({ propertyId, email }) => {
    await axios.delete(`http://localhost:5000/api/wishlist/${propertyId}?email=${email}`);
    return propertyId;
  }
);

export const fetchWishlist = createAsyncThunk(
  "products/fetchWishlist",
  async (email) => {
    const res = await axios.get(`http://localhost:5000/api/wishlist?email=${email}`);
    return res.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    featured: [],
    bookings: [],
    myBookings: [],
    user: null,
    hostRequests: [],
    wishlist: [], // ✅ add wishlist here
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
      })

      // 🧡 Wishlist actions
      .addCase(addToWishlist.fulfilled, (state, action) => {
        const exists = state.wishlist.some((w) => w.propertyId === action.payload.propertyId);
        if (!exists) state.wishlist.push(action.payload);
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        // ✅ Replace wishlist with a new set excluding removed property
        state.wishlist = state.wishlist.filter((w) => w.propertyId !== action.payload);
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
      });
  },
});

export default productSlice.reducer;
