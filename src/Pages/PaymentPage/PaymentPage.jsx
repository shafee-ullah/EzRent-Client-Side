import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Payment from "../../Payment/payment";
import { useSelector } from "react-redux";
import PaymentErrorBoundary from "../../Components/PaymentErrorBoundary";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Shield,
  CheckCircle,
  HeadphonesIcon as Headphones,
  CreditCard,
} from "lucide-react";
import Swal from "sweetalert2";

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

    // SweetAlert2 success notification
    Swal.fire({
      title: "Payment Successful! 🎉",
      html: `
        <div class="text-center">

          <p class="text-gray-600 dark:text-gray-300 mb-2">Your payment has been processed successfully.</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">You can now view your booking in the dashboard.</p>
        </div>
      `,
      icon: "success",
      iconColor: "#10b981",
      confirmButtonText: "View Booking",
      confirmButtonColor: "#10b981",
      background: "rgba(255, 255, 255, 0.9)",
      backdrop: `
        rgba(0, 0, 0, 0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `,
      customClass: {
        popup: 'backdrop-blur-sm rounded-3xl border border-gray-200 dark:border-gray-700 shadow-2xl',
        title: 'text-2xl font-bold text-gray-900 dark:text-white',
        htmlContainer: 'text-gray-600 dark:text-gray-300',
        confirmButton: 'px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300'
      },
      buttonsStyling: false,
      showClass: {
        popup: 'animate__animated animate__fadeInDown animate__faster'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp animate__faster'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Navigate to bookings dashboard
        navigate("/dashboard");
      }
    });
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
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Loading payment form...
          </p>
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
              <MotionDiv
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
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

              <div className="flex justify-center">
                <MotionDiv
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
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
        ></MotionDiv>
      </div>
    </PaymentErrorBoundary>
  );
};

export default PaymentPage;