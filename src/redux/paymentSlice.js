import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL for API calls
const API_BASE_URL = "https://ez-rent-server-side.vercel.app";

// Create payment intent
export const createPaymentIntent = createAsyncThunk(
  "payment/createPaymentIntent",
  async ({ amount, bookingId, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/payment/create-payment-intent`,
        {
          amount,
          bookingId,
          userId,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to create payment intent"
      );
    }
  }
);

// Confirm payment
export const confirmPayment = createAsyncThunk(
  "payment/confirmPayment",
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/payment/confirm`,
        paymentData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to confirm payment"
      );
    }
  }
);

// Fetch user payment history
export const fetchUserPayments = createAsyncThunk(
  "payment/fetchUserPayments",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/payments/user/${userId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch payments"
      );
    }
  }
);

// Fetch payment by transaction ID
export const fetchPaymentByTransactionId = createAsyncThunk(
  "payment/fetchPaymentByTransactionId",
  async (transactionId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/payments/transaction/${transactionId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch payment"
      );
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    // Payment intent state
    clientSecret: null,
    paymentIntentId: null,
    isCreatingIntent: false,
    intentError: null,

    // Payment confirmation state
    isConfirmingPayment: false,
    confirmationError: null,
    lastConfirmedPayment: null,

    // Payment history state
    userPayments: [],
    isFetchingPayments: false,
    paymentsError: null,

    // Current payment state
    currentPayment: null,
    isFetchingCurrentPayment: false,
    currentPaymentError: null,

    // General state
    isProcessing: false,
    error: null,
    successMessage: null,
  },

  reducers: {
    // Clear error messages
    clearError: (state) => {
      state.error = null;
      state.intentError = null;
      state.confirmationError = null;
      state.paymentsError = null;
      state.currentPaymentError = null;
    },

    // Clear success message
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },

    // Reset payment state
    resetPaymentState: (state) => {
      state.clientSecret = null;
      state.paymentIntentId = null;
      state.isCreatingIntent = false;
      state.intentError = null;
      state.isConfirmingPayment = false;
      state.confirmationError = null;
      state.lastConfirmedPayment = null;
      state.error = null;
      state.successMessage = null;
    },

    // Set current booking data for payment
    setCurrentBookingData: (state, action) => {
      state.currentBookingData = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      // Create Payment Intent
      .addCase(createPaymentIntent.pending, (state) => {
        state.isCreatingIntent = true;
        state.intentError = null;
        state.isProcessing = true;
      })
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.isCreatingIntent = false;
        state.isProcessing = false;
        state.clientSecret = action.payload.clientSecret;
        state.paymentIntentId = action.payload.paymentIntentId;
        state.intentError = null;
      })
      .addCase(createPaymentIntent.rejected, (state, action) => {
        state.isCreatingIntent = false;
        state.isProcessing = false;
        state.intentError = action.payload;
        state.clientSecret = null;
        state.paymentIntentId = null;
      })

      // Confirm Payment
      .addCase(confirmPayment.pending, (state) => {
        state.isConfirmingPayment = true;
        state.confirmationError = null;
        state.isProcessing = true;
      })
      .addCase(confirmPayment.fulfilled, (state, action) => {
        state.isConfirmingPayment = false;
        state.isProcessing = false;
        state.lastConfirmedPayment = action.payload;
        state.confirmationError = null;
        state.successMessage =
          action.payload.message || "Payment confirmed successfully!";
        // Reset payment intent after successful confirmation
        state.clientSecret = null;
        state.paymentIntentId = null;
      })
      .addCase(confirmPayment.rejected, (state, action) => {
        state.isConfirmingPayment = false;
        state.isProcessing = false;
        state.confirmationError = action.payload;
      })

      // Fetch User Payments
      .addCase(fetchUserPayments.pending, (state) => {
        state.isFetchingPayments = true;
        state.paymentsError = null;
      })
      .addCase(fetchUserPayments.fulfilled, (state, action) => {
        state.isFetchingPayments = false;
        state.userPayments = action.payload;
        state.paymentsError = null;
      })
      .addCase(fetchUserPayments.rejected, (state, action) => {
        state.isFetchingPayments = false;
        state.paymentsError = action.payload;
      })

      // Fetch Payment by Transaction ID
      .addCase(fetchPaymentByTransactionId.pending, (state) => {
        state.isFetchingCurrentPayment = true;
        state.currentPaymentError = null;
      })
      .addCase(fetchPaymentByTransactionId.fulfilled, (state, action) => {
        state.isFetchingCurrentPayment = false;
        state.currentPayment = action.payload;
        state.currentPaymentError = null;
      })
      .addCase(fetchPaymentByTransactionId.rejected, (state, action) => {
        state.isFetchingCurrentPayment = false;
        state.currentPaymentError = action.payload;
      });
  },
});

// Export actions
export const {
  clearError,
  clearSuccessMessage,
  resetPaymentState,
  setCurrentBookingData,
} = paymentSlice.actions;

// Export selectors
export const selectPaymentState = (state) => state.payment;
export const selectClientSecret = (state) => state.payment.clientSecret;
export const selectIsProcessing = (state) => state.payment.isProcessing;
export const selectPaymentError = (state) =>
  state.payment.error ||
  state.payment.intentError ||
  state.payment.confirmationError;
export const selectSuccessMessage = (state) => state.payment.successMessage;
export const selectUserPayments = (state) => state.payment.userPayments;
export const selectLastConfirmedPayment = (state) =>
  state.payment.lastConfirmedPayment;

export default paymentSlice.reducer;
