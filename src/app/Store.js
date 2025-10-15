// src/app/Store.js
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../redux/PropertieSlice";
import paymentReducer from "../redux/paymentSlice";
import chatReducer from "../redux/chatSlice";
import usersReducer from "../redux/UserSlice"; 
import bookingStatsReducer from "../redux/bookingStateSlice"; 
import experienceReducer from "../redux/experienceSlice";


const store = configureStore({
  reducer: {
    products: productReducer,
    payment: paymentReducer,
    chat: chatReducer,
    users: usersReducer,
    bookingStats: bookingStatsReducer,
    experience: experienceReducer, 
  },
});

export default store;
