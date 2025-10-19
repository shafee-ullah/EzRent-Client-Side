import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PaymentButton from "./PaymentButton";

/**
 * PaymentDemo Component
 * A demo component showing how to integrate the payment system
 * This can be used as a reference for implementing payments in other components
 */
const PaymentDemo = () => {
  const navigate = useNavigate();
  const [demoBookingData, setDemoBookingData] = useState({
    bookingId: `demo-booking-${Date.now()}`,
    userId: "demo-user-123",
    userName: "Demo User",
    userEmail: "demo@example.com",
    propertyName: "Beautiful Villa in Paradise",
    propertyLocation: "Malibu, California",
    checkIn: "2024-03-15",
    checkOut: "2024-03-18",
    guests: 2,
    amount: 299.99,
    totalPrice: 299.99,
    propertyImage: "/api/placeholder/400/300",
  });

  const handleDirectNavigation = () => {
    navigate("/payment", {
      state: {
        bookingData: demoBookingData,
        fromDemo: true,
      },
    });
  };


  const handleBookingDataChange = (field, value) => {
    setDemoBookingData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Payment System Demo
        </h2>
        <p className="text-gray-600">
          This demo shows how to integrate the payment system into your
          components.
        </p>
      </div>

      {/* Demo Booking Data Editor */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Demo Booking Data</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Property Name
            </label>
            <input
              type="text"
              value={demoBookingData.propertyName}
              onChange={(e) =>
                handleBookingDataChange("propertyName", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={demoBookingData.amount}
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                handleBookingDataChange("amount", value);
                handleBookingDataChange("totalPrice", value);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check-in Date
            </label>
            <input
              type="date"
              value={demoBookingData.checkIn}
              onChange={(e) =>
                handleBookingDataChange("checkIn", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check-out Date
            </label>
            <input
              type="date"
              value={demoBookingData.checkOut}
              onChange={(e) =>
                handleBookingDataChange("checkOut", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Guests
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={demoBookingData.guests}
              onChange={(e) =>
                handleBookingDataChange("guests", parseInt(e.target.value))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              User Name
            </label>
            <input
              type="text"
              value={demoBookingData.userName}
              onChange={(e) =>
                handleBookingDataChange("userName", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Payment Integration Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Payment Integration Methods</h3>

        {/* Method 1: Using PaymentButton Component */}
        <div className="p-4 border border-gray-200 rounded-lg">
          <h4 className="font-medium mb-2">
            Method 1: PaymentButton Component
          </h4>
          <p className="text-sm text-gray-600 mb-3">
            Use the reusable PaymentButton component for simple integration.
          </p>
          <PaymentButton bookingData={demoBookingData} className="w-full">
            Pay with PaymentButton Component
          </PaymentButton>
        </div>

        {/* Method 2: Direct Navigation */}
        <div className="p-4 border border-gray-200 rounded-lg">
          <h4 className="font-medium mb-2">Method 2: Direct Navigation</h4>
          <p className="text-sm text-gray-600 mb-3">
            Navigate directly to the payment page with booking data.
          </p>
          <button
            onClick={handleDirectNavigation}
            className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-200"
          >
            Navigate to Payment Page
          </button>
        </div>

        {/* Method 3: Code Example */}
        <div className="p-4 border border-gray-200 rounded-lg">
          <h4 className="font-medium mb-2">Method 3: Code Integration</h4>
          <p className="text-sm text-gray-600 mb-3">
            Example code for integrating payments in your components.
          </p>
          <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
            {`import PaymentButton from './Components/PaymentButton';
import { useNavigate } from 'react-router-dom';

// Option 1: Using PaymentButton
<PaymentButton bookingData={bookingData}>
  Pay Now
</PaymentButton>

// Option 2: Direct navigation
const navigate = useNavigate();
navigate('/payment', {
  state: { bookingData: bookingData }
});`}
          </pre>
        </div>
      </div>

      {/* Booking Summary */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">
          Current Booking Summary
        </h4>
        <div className="text-sm text-blue-800 space-y-1">
          <p>
            <strong>Property:</strong> {demoBookingData.propertyName}
          </p>
          <p>
            <strong>Dates:</strong> {demoBookingData.checkIn} to{" "}
            {demoBookingData.checkOut}
          </p>
          <p>
            <strong>Guests:</strong> {demoBookingData.guests}
          </p>
          <p>
            <strong>Total:</strong> ${demoBookingData.amount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentDemo;
