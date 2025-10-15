import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../redux/PropertieSlice";
import paymentReducer from "../redux/paymentSlice";
import chatReducer from "../redux/chatSlice";
import experienceReducer from "../redux/experienceSlice";


const store = configureStore({
  reducer: {
    products: productReducer,
    payment: paymentReducer,
    chat: chatReducer,
    experience: experienceReducer, 
  },
});

export default store;
