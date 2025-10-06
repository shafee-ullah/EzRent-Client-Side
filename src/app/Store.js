import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../redux/PropertieSlice";
import paymentReducer from "../redux/paymentSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    payment: paymentReducer,
  },
});

export default store;
