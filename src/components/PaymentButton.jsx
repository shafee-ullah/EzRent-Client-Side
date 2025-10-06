import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

/**
 * PaymentButton Component
 * A reusable component for triggering payment flows
 *
 * @param {Object} props - Component props
 * @param {Object} props.bookingData - Booking information for payment
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.children - Button content (defaults to "Pay Now")
 * @param {Function} props.onClick - Custom click handler (optional)
 * @param {boolean} props.disabled - Whether button is disabled
 */
const PaymentButton = ({
  bookingData,
  className = "",
  children = "Pay Now",
  onClick,
  disabled = false,
  ...props
}) => {
  const navigate = useNavigate();

  const handlePaymentClick = (e) => {
    e.preventDefault();

    // If custom onClick is provided, call it first
    if (onClick) {
      onClick(e);
    }

    // Validate booking data
    if (!bookingData) {
      toast.error("No booking data provided for payment");
      return;
    }

    // Navigate to payment page with booking data
    navigate("/payment", {
      state: {
        bookingData: bookingData,
        fromComponent: true,
      },
    });
  };

  return (
    <button
      onClick={handlePaymentClick}
      disabled={disabled}
      className={`px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default PaymentButton;
