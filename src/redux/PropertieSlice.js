// frontend/redux/productSlice.js
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
 import axios from "axios";


// MongoDB থেকে ডেটা ফেচ
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await axios.get("http://localhost:5000/properties");
    return res.data;
  }
);
 // limit 8 data 
export const fetchlimit = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await axios.get("http://localhost:5000/FeaturedProperties");
    return res.data;
  }
);
// // 🔹 POST → নতুন প্রপার্টি MongoDB তে save করা
// export const addProperty = createAsyncThunk(
//   "property/addProperty",
//   async () => {
//     const res = await axios.post("http://localhost:5000/bookinghotel");
//     return res.data; // backend থেকে response return করবে
//   }
// );



const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      });
    
  },
});

export default productSlice.reducer;
