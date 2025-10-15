import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Payment from "../../Payment/payment";
import { useSelector } from "react-redux";
import PaymentErrorBoundary from "../../Components/PaymentErrorBoundary";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, CheckCircle, HeadphonesIcon as Headphones, CreditCard } from "lucide-react";

const MotionDiv = motion.div;

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [bookingData, setBookingData] = useState(null);

  // Get user data from Redux if available
  const user = useSelector((state) => state.products.user);

  useEffect(() => {
    // Get booking data from location state or create sample data
    const data = location.state?.bookingData || createSampleBookingData();
    setBookingData(data);
  }, [location.state]);

  const createSampleBookingData = () => {
    return {
      bookingId: `booking-${Date.now()}`,
      userId: user?.uid || "sample-user-id",
      userName: user?.name || "Guest User",
      userEmail: user?.email || "guest@example.com",
      propertyName: "Sample Property",
      checkIn: "2024-02-15",
      checkOut: "2024-02-18",
      guests: 2,
      amount: 150,
      totalPrice: 150,
    };
  };

  const handlePaymentSuccess = (paymentResult) => {
    console.log("Payment successful:", paymentResult);

    // You can navigate to a success page or dashboard
    // navigate('/dashboard/guest', {
    //   state: {
    //     message: 'Payment completed successfully!',
    //     paymentResult
    //   }
    // });

    // For now, we'll just show an alert
    alert(
      "Payment completed successfully! You can now view your booking in the dashboard."
    );
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50/50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-emerald-900/10 flex items-center justify-center">
        <div className="text-center">
          <MotionDiv
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600 dark:text-gray-300 text-lg">Loading payment form...</p>
        </div>
      </div>
    );
  }

  return (
    <PaymentErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50/50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-emerald-900/10">
        {/* Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-200/30 dark:bg-emerald-900/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-green-200/30 dark:bg-green-900/20 rounded-full blur-3xl" />
        </div>

        {/* Header */}
        <MotionDiv
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 dark:bg-gray-900 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10"
        >
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <MotionDiv whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button
                  onClick={handleGoBack}
                 className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 "
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Booking
                </button>
              </MotionDiv>
              
              <div className="text-center sm:text-left sm:mx-0 mx-auto">
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400">
                  Secure Payment
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Complete your booking with confidence
                </p>
              </div>
              
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-2xl  ">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">Secure</span>
              </div>
            </div>



          </div>
        </MotionDiv>

        {/* Payment Form Section */}
        <div className="relative py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="">
              {/* Main Payment Form */}
              <div className="">
                <Payment
                  bookingData={bookingData}
                  onPaymentSuccess={handlePaymentSuccess}
                />
              </div>

              {/* Booking Summary Sidebar */}
              {/* <MotionDiv
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-1"
              >
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border border-gray-200 dark:border-gray-700 p-6 sticky top-24">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    Booking Summary
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-600">
                      <span className="text-gray-600 dark:text-gray-400">Property</span>
                      <span className="font-medium text-gray-900 dark:text-white text-right">
                        {bookingData.propertyName}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-600">
                      <span className="text-gray-600 dark:text-gray-400">Check-in</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {bookingData.checkIn}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-600">
                      <span className="text-gray-600 dark:text-gray-400">Check-out</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {bookingData.checkOut}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-600">
                      <span className="text-gray-600 dark:text-gray-400">Guests</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {bookingData.guests}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
                      <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400">
                        ৳{bookingData.totalPrice}
                      </span>
                    </div>
                  </div>

                  
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center gap-3 mb-3">
                      <Shield className="w-5 h-5 text-emerald-500" />
                      <span className="font-medium text-gray-900 dark:text-white">Protected Payment</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Your payment is secured with bank-level encryption and processed by Stripe.
                    </p>
                  </div>
                </div>
              </MotionDiv> */}

<div className="flex justify-center">
  <MotionDiv whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <button
      onClick={handleGoBack}
      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 md:hidden lg:hidden"
    >
      <ArrowLeft className="w-4 h-4" />
      Back to Booking
    </button>
  </MotionDiv>
</div>

            </div>
          </div>
        </div>

        {/* Features Section */}
        <MotionDiv
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 mt-12"
        >
  
        </MotionDiv>
      </div>
    </PaymentErrorBoundary>
  );
};

export default PaymentPage;