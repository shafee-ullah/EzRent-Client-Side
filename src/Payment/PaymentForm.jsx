import React, { useState, useEffect, useCallback } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import {
  createPaymentIntent,
  confirmPayment,
  clearError,
  clearSuccessMessage,
  resetPaymentState,
  selectPaymentState,
  selectClientSecret,
  selectIsProcessing,
  selectPaymentError,
  selectSuccessMessage,
} from "../redux/paymentSlice";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Shield, CreditCard, AlertCircle, Loader } from "lucide-react";

const MotionDiv = motion.div;

// Stripe Card Element styling - Updated to match theme
const cardElementOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#1f2937",
      fontFamily: '"Inter", sans-serif',
      "::placeholder": {
        color: "#9ca3af",
        fontWeight: "400",
      },
      ":-webkit-autofill": {
        color: "#1f2937",
      },
    },
    invalid: {
      color: "#dc2626",
      iconColor: "#dc2626",
    },
  },
  hidePostalCode: true,
};

const PaymentForm = ({ bookingData, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
    console.log("booking data",bookingData)
  // Redux state
  const paymentState = useSelector(selectPaymentState);
  const clientSecret = useSelector(selectClientSecret);
  const isProcessing = useSelector(selectIsProcessing);
  const error = useSelector(selectPaymentError);
  const successMessage = useSelector(selectSuccessMessage);

  // Local state
  const [isLoading, setIsLoading] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);

  // Clear messages on component mount
  useEffect(() => {
    dispatch(clearError());
    dispatch(clearSuccessMessage());
  }, [dispatch]);

  // Show success message when payment is confirmed
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      setPaymentComplete(true);
      if (onPaymentSuccess) {
        onPaymentSuccess(paymentState.lastConfirmedPayment);
      }
    }
  }, [successMessage, onPaymentSuccess, paymentState.lastConfirmedPayment]);

  // Show error message when there's an error
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleCreatePaymentIntent = useCallback(async () => {
    if (!bookingData) {
      toast.error("No booking data available");
      return;
    }

    try {
      await dispatch(
        createPaymentIntent({
          amount: bookingData.amount || bookingData.price|| 200,
          bookingId: bookingData.bookingId || bookingData._id || "temp-booking-id",
          userId: bookingData.userId || bookingData.user?.uid || "temp-user-id",
        })
      ).unwrap();
    } catch (error) {
      console.error("Failed to create payment intent:", error);
    }
  }, [bookingData, dispatch]);
  console.log(bookingData)
  // Create payment intent when component mounts with booking data
  useEffect(() => {
    if (bookingData && !clientSecret && !isProcessing) {
      handleCreatePaymentIntent();
    }
  }, [bookingData, clientSecret, isProcessing, handleCreatePaymentIntent]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      toast.error("Payment system not ready. Please try again.");
      return;
    }

    setIsLoading(true);

    const cardElement = elements.getElement(CardElement);

    try {
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: bookingData.userName || "Guest User",
              email: bookingData.userEmail || "guest@example.com",
            },
          },
        });

      if (stripeError) {
        toast.error(stripeError.message);
        setIsLoading(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        const paymentData = {
          transactionId: paymentIntent.id,
          amount: paymentIntent.amount / 200,
          bookingId: bookingData.bookingId || bookingData._id,
          userId: bookingData.userId || bookingData.user?.uid,
          status: paymentIntent.status,
          paymentMethod: paymentIntent.payment_method,
          currency: paymentIntent.currency,
        };

        await dispatch(confirmPayment(paymentData)).unwrap();
      } else {
        toast.error("Payment was not successful");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    dispatch(resetPaymentState());
    setPaymentComplete(false);
    setIsLoading(false);
    setCardComplete(false);
  };

  const handleCardChange = (event) => {
    setCardComplete(event.complete);
  };

  if (paymentComplete) {
    return (
      <MotionDiv
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg mx-auto bg-white/80 dark:bg-gray-900 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 text-center"
      >
        <div className="mb-6">
          <MotionDiv
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-white" />
          </MotionDiv>
          
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400 mb-3">
            Payment Successful!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg">
            Your booking has been confirmed and payment processed successfully.
          </p>
          
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl p-4 mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Transaction ID: 
            </p>
            <p className="font-mono text-emerald-700 dark:text-emerald-300 font-medium">
              {paymentState.lastConfirmedPayment?.paymentId}
            </p>
          </div>
        </div>
        
        <button
          onClick={handleReset}
          className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white py-4 px-6 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          Make Another Payment
        </button>
      </MotionDiv>
    );
  }

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-lg mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <CreditCard className="w-6 h-6" />
          <h2 className="text-2xl font-bold">Complete Your Payment</h2>
        </div>
        <p className="text-emerald-100">Secure payment processed by Stripe</p>
      </div>
   {/* hgfd */}
      <div className="p-6">
        {/* Booking Summary */}
        {bookingData && (
          <MotionDiv
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-5 mb-6 border border-gray-200 dark:border-gray-600"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              Booking Summary
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Property:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {bookingData.propertyName || "Property"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Check-in:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {bookingData.checkIn || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Check-out:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {bookingData.checkOut || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Guests:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {bookingData.guests || "N/A"}
                </span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-600 pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Total Amount:</span>
                  <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400">
                    ৳{bookingData.amount || bookingData.price || 500}
                  </span>
                </div>
              </div>
            </div>
          </MotionDiv>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Card Input */}
          <MotionDiv
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Card Information
            </label>
            <div className={`border-2 rounded-2xl p-4 bg-white dark:bg-gray-700 transition-all duration-300 ${
              cardComplete 
                ? "border-emerald-500 shadow-sm" 
                : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
            }`}>
              <CardElement 
                options={cardElementOptions} 
                onChange={handleCardChange}
              />
            </div>
          </MotionDiv>

          {/* Security Notice */}
          <MotionDiv
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-4 border border-blue-200 dark:border-blue-800"
          >
            <div className="flex gap-3">
              <Shield className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-blue-900 dark:text-blue-300 mb-1">
                  Secure & Encrypted Payment
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  Your payment information is processed securely via Stripe. We never store your card details.
                </p>
              </div>
            </div>
          </MotionDiv>

          {/* Test Mode Notice */}
          <MotionDiv
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-4 border border-amber-200 dark:border-amber-800"
          >
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-amber-900 dark:text-amber-300 mb-1">
                  Test Mode Active
                </p>
                <p className="text-sm text-amber-700 dark:text-amber-400">
                  Use test card: <code className="font-mono bg-amber-200 dark:bg-amber-800 px-1 rounded">4242 4242 4242 4242</code>
                  <br />
                  Any future expiry date and CVC will work.
                </p>
              </div>
            </div>
          </MotionDiv>

          {/* Submit Button */}
          <MotionDiv
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <button
              type="submit"
              disabled={!stripe || !clientSecret || isLoading || isProcessing || !cardComplete}
              className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white py-4 px-6 rounded-2xl font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 disabled:hover:scale-100 flex items-center justify-center gap-3"
            >
              {isLoading || isProcessing ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  Pay ৳{bookingData?.amount || bookingData?.totalPrice || 100}
                </>
              )}
            </button>
          </MotionDiv>
        </form>

        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <MotionDiv
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 rounded-2xl p-4 border border-red-200 dark:border-red-800 overflow-hidden"
            >
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-red-900 dark:text-red-300 mb-1">
                    Payment Error
                  </p>
                  <p className="text-sm text-red-700 dark:text-red-400">
                    {error}
                  </p>
                </div>
              </div>
            </MotionDiv>
          )}
        </AnimatePresence>

        {/* Footer Security Badges */}
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-center gap-6 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-500" />
              <span>PCI Compliant</span>
            </div>
          </div>
        </MotionDiv>
      </div>
    </MotionDiv>
  );
};

export default PaymentForm;