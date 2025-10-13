import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../redux/PropertieSlice";
import paymentReducer from "../redux/paymentSlice";
import chatReducer from "../redux/chatSlice";


const store = configureStore({
  reducer: {
    products: productReducer,
    payment: paymentReducer,
    chat: chatReducer,

  },
});

export default store;
