import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "properties/fetchProducts",
  async (email) => {
    const res = await axios.get(
      `https://ezrent-server-side-production.up.railway.app/properties?email=${email}`
    );
    return res.data;
  }
);

// 🟢 Fetch All Properties
export const fetchmanageproperty = createAsyncThunk(
  "products/fetchmanageproperty",
  async () => {
    const res = await axios.get(
      "https://ezrent-server-side-production.up.railway.app/manageproperty"
    );
    return res.data;
  }
);
// redux/PropertieSlice.js
export const updatePropertyStatusAdmin = createAsyncThunk(
  "products/updatePropertyStatusAdmin",
  async ({ id, propertystatus }) => {
    const res = await axios.patch(
      `https://ezrent-server-side-production.up.railway.app/AddProperty/${id}`, // adjust API route
      { propertystatus }
    );
    return res.data; // updated property
  }
);

//update propery status update
export const updatePropertyStatus = createAsyncThunk(
  "products/updatePropertyStatus",
  async ({ propertyId, newStatus }) => {
    const res = await axios.patch(
      `https://ezrent-server-side-production.up.railway.app/Property/${propertyId}`, // 👈 adjust your API URL
      { status: newStatus }
    );
    return res.data; // return updated property
  }
);

// 🟢 Fetch Limit (Featured)
export const fetchlimit = createAsyncThunk("products/fetchLimit", async () => {
  const res = await axios.get(
    "https://ezrent-server-side-production.up.railway.app/FeaturedProperties"
  );
  return res.data;
});

// 🟢 Fetch All Bookings (Admin)
export const fetchbooking = createAsyncThunk(
  "products/fetchbooking",
  async () => {
    const res = await axios.get(
      "https://ezrent-server-side-production.up.railway.app/bookinghotel"
    );
    return res.data;
  }
);
// export const fetchbooking = createAsyncThunk(
//   "products/fetchbooking",
//   async (email) => {
//     const res = await axios.get(
//       `https://ezrent-server-side-production.up.railway.app/bookinghotel?email=${email}`
//     );
//     return res.data;
//   }
// );

// Update booking status by ID
export const updateBookingStatus = createAsyncThunk(
  "products/updateBookingStatus",
  async ({ bookingId, newStatus }) => {
    // console.log("hello",bookingId)
    const res = await axios.patch(
      `https://ezrent-server-side-production.up.railway.app/bookings/${bookingId}`,
      { status: newStatus }
    );
    return res.data.booking; // updated booking from DB
  }
);

// 🟢 Fetch My Bookings (by email)
export const fetchMyBooking = createAsyncThunk(
  "products/fetchMyBooking",
  async (email, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "https://ezrent-server-side-production.up.railway.app/myBookings",
        {
          params: { email },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch bookings"
      );
    }
  }
);

// 🟢 Fetch Single User by Email
export const fetchUserByEmail = createAsyncThunk(
  "products/fetchUserByEmail",
  async (email) => {
    const res = await axios.get(
      `https://ezrent-server-side-production.up.railway.app/users/${email}`
    );
    return res.data;
  }
);

// 🟢 CRUD Actions
export const deleteBooking = createAsyncThunk(
  "products/deleteBooking",
  async (bookingId) => {
    await axios.delete(
      `https://ezrent-server-side-production.up.railway.app/bookinghotel/${bookingId}`
    );
    return bookingId;
  }
);

export const deleteProperty = createAsyncThunk(
  "products/deleteProperty",
  async (propertyId) => {
    await axios.delete(
      `https://ezrent-server-side-production.up.railway.app/properties/${propertyId}`
    );
    return propertyId;
  }
);

export const fetchHostRequests = createAsyncThunk(
  "products/fetchHostRequests",
  async () => {
    const res = await axios.get(
      "https://ezrent-server-side-production.up.railway.app/hostRequest"
    );
    return res.data;
  }
);

// 🟢 Wishlist Actions
export const addToWishlist = createAsyncThunk(
  "products/addToWishlist",
  async (wishlistItem) => {
    const res = await axios.post(
      "https://ezrent-server-side-production.up.railway.app/api/wishlist",
      wishlistItem
    );
    return res.data;
  }
);

export const removeFromWishlist = createAsyncThunk(
  "products/removeFromWishlist",
  async ({ propertyId, email }) => {
    await axios.delete(
      `https://ezrent-server-side-production.up.railway.app/api/wishlist/${propertyId}?email=${email}`
    );
    return propertyId;
  }
);

export const fetchWishlist = createAsyncThunk(
  "products/fetchWishlist",
  async (email) => {
    const res = await axios.get(
      `https://ezrent-server-side-production.up.railway.app/api/wishlist?email=${email}`
    );
    return res.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    properties: [],
    featuredItems: [],
    items: [], // 🏠 all properties
    featured: [],
    bookings: [],
    myBookings: [],
    user: null,
    hostRequests: [],
    wishlist: [], // ✅ add wishlist here
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      // 🏠 Fetch all properties
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload; // ✅ storing properly
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // 🏠 Fetch all manageproperties
      .addCase(fetchmanageproperty.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchmanageproperty.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchmanageproperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 🟢 fetch featured
      .addCase(fetchlimit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchlimit.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredItems = action.payload; // 👉 separate state
      })
      .addCase(fetchlimit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
        state.myBookings = state.myBookings.filter(
          (b) => b._id !== action.payload
        );
      })

      // // ✅ Update status in Redux state immediately
      //   .addCase(updatePropertyStatus.fulfilled, (state, action) => {
      //     const updated = action.payload;
      //     state.items = state.items.map((p) =>
      //       p._id === updated._id ? updated : p
      //     );
      //   })
      .addCase(updatePropertyStatus.fulfilled, (state, action) => {
        const updatedProperty = action.payload;
        const index = state.items.findIndex(
          (p) => p._id === updatedProperty._id
        );
        if (index !== -1) {
          state.items[index] = updatedProperty; // instantly replace old property
        }
      })

      // 🧾 Host requests
      .addCase(fetchHostRequests.fulfilled, (state, action) => {
        state.hostRequests = action.payload;
      })

      // 🧡 Wishlist actions
      .addCase(addToWishlist.fulfilled, (state, action) => {
        const exists = state.wishlist.some(
          (w) => w.propertyId === action.payload.propertyId
        );
        if (!exists) state.wishlist.push(action.payload);
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        // ✅ Replace wishlist with a new set excluding removed property
        state.wishlist = state.wishlist.filter(
          (w) => w.propertyId !== action.payload
        );
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
      })

      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        const updatedBooking = action.payload;
        
        // Update in bookings array
        const index = state.bookings.findIndex(
          (b) => b._id === updatedBooking._id
        );
        if (index !== -1) {
          state.bookings[index] = updatedBooking;
        }
        
        // Update in myBookings array
        const myIndex = state.myBookings.findIndex(
          (b) => b._id === updatedBooking._id
        );
        if (myIndex !== -1) {
          state.myBookings[myIndex] = updatedBooking;
        }
      })
      .addCase(updatePropertyStatusAdmin.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.items.findIndex((p) => p._id === updated._id);
        if (index !== -1) {
          state.items[index] = updated;
        }
      });
  },
});

export default productSlice.reducer;
