
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../redux/PropertieSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
  },
});

export default store;
