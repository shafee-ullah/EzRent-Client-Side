import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// MongoDB থেকে ডেটা ফেচ
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await axios.get(
      "https://ez-rent-server-side.vercel.app/properties"
    );
    return res.data;
  }
);

// limit 8 data
export const fetchlimit = createAsyncThunk("products/fetchLimit", async () => {
  const res = await axios.get(
    "https://ez-rent-server-side.vercel.app/FeaturedProperties"
  );
  return res.data;
});

// get user by email
export const fetchUserByEmail = createAsyncThunk(
  "products/fetchUserByEmail",
  async (email) => {
    const res = await axios.get(`http://localhost:5000/users/${email}`);
    return res.data;
  }
);

// get all host requests
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
    items: [],
    featured: [],
    user: null,
    users: [], // <-- if you want all users later
    hostRequests: [], // <-- add this
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🟢 Fetch All Products
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

      // 🟢 Fetch All Host Requests
      .addCase(fetchHostRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHostRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.hostRequests = action.payload; // ✅ now it will store properly
      })
      .addCase(fetchHostRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 🟢 Fetch Featured (limit 8)
      .addCase(fetchlimit.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchlimit.fulfilled, (state, action) => {
        state.loading = false;
        state.featured = action.payload;
      })
      .addCase(fetchlimit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 🟢 Fetch User by Email
      .addCase(fetchUserByEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserByEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserByEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
