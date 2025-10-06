import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

// Initialize Stripe with the publishable key from environment variables
const stripePromise = loadStripe(import.meta.env.VITE_payment_key);

const Payment = ({ bookingData, onPaymentSuccess }) => {
  return (
    <div className="min-h-screen py-8 rounded-lg">
      <div className="container mx-auto px-4">
        <Elements stripe={stripePromise}>
          <PaymentForm
            bookingData={bookingData}
            onPaymentSuccess={onPaymentSuccess}
          />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
