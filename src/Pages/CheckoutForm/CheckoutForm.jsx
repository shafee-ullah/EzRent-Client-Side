import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaUsers, FaBed, FaUtensils, FaCheckCircle } from "react-icons/fa";

const CheckoutForm = ({ data }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isAvailable, setIsAvailable] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAvailabilityCheck = async (e) => {
    e.preventDefault();
    setLoading(true);

    const checkIn = e.target.checkInDate.value;
    const checkOut = e.target.checkOutDate.value;

    if (!checkIn || !checkOut) {
      Swal.fire({
        icon: "warning",
        title: "Please select Check-in & Check-out dates",
      });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/checkBooking?roomId=${data._id}&checkIn=${checkIn}&checkOut=${checkOut}`
      );
      const result = await res.json();

      if (result?.isBooked) {
        Swal.fire({
          icon: "error",
          title: "Already Booked!",
          text: "This room is not available for the selected dates.",
        });
        setIsAvailable(false);
      } else {
        Swal.fire({
          icon: "success",
          title: "Room Available!",
          text: "You can proceed to book this room.",
          timer: 1500,
          showConfirmButton: false,
        });
        setIsAvailable(true);
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  const handelcheckout = (e) => {
    e.preventDefault();
    const form = e.target;
    const formdata = new FormData(form);
    const Updatedata = Object.fromEntries(formdata.entries());
    const Bookingdata = {
      Checkin: Updatedata.Checkin,
      Checkout: Updatedata.Checkout,
      guest: Updatedata.number,
      room: Updatedata.room,
      extaOptions: Updatedata.extaOptions,
      id: data._id,
      img: data.image,
      Location: data.Location,
      hostemail: data?.email,
      hostname: data?.Name,
      status: "pending",
      price: data.price,
      email: user?.email,
      name: user?.displayName,
      title: data.name,
    };

    fetch("http://localhost:5000/bookinghotel", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(Bookingdata),
    })
      .then((res) => res.json())
      .then((bookingResult) => {
        Swal.fire({
          icon: "success",
          title: "Booking created successfully!",
          text: "Redirecting to payment...",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          const paymentData = {
            bookingId: bookingResult.insertedId || bookingResult._id,
            userId: user?.uid || user?.email,
            userName: user?.displayName || "Guest User",
            userEmail: user?.email,
            propertyName: data.name,
            propertyLocation: data.Location,
            checkIn: Updatedata.Checkin,
            checkOut: Updatedata.Checkout,
            guests: Updatedata.number,
            amount: data.price,
            totalPrice: data.price,
            propertyImage: data.image,
            bookingData: Bookingdata,
          };
          navigate("/payment", {
            state: { bookingData: paymentData, fromBooking: true },
          });
        });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Booking Failed",
          text: "There was an error creating your booking. Please try again.",
        });
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-lg"
    >
      <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400">
        <FaCalendarAlt className="text-emerald-500" /> Book Your Stay
      </h3>

      <form onSubmit={isAvailable ? handelcheckout : handleAvailabilityCheck} className="space-y-6">
        {/* Date Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800"
            whileHover={{ scale: 1.02 }}
          >
            <label htmlFor="checkInDate" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FaCalendarAlt className="text-emerald-700 dark:text-emerald-400" />
              Check-in Date
            </label>
            <input
              id="checkInDate"
              name="Checkin"
              type="date"
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2.5 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 transition-all [color-scheme:light] dark:[color-scheme:dark]"
              required
            />
          </motion.div>

          <motion.div
            className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-4 rounded-2xl border border-blue-200 dark:border-blue-800"
            whileHover={{ scale: 1.02 }}
          >
            <label htmlFor="checkOutDate" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FaCalendarAlt className="text-blue-700 dark:text-blue-400" />
              Check-out Date
            </label>
            <input
              id="checkOutDate"
              name="Checkout"
              type="date"
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2.5 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all [color-scheme:light] dark:[color-scheme:dark]"
              required
            />
          </motion.div>
        </div>

        {/* Guests and Rooms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-4 rounded-2xl border border-amber-200 dark:border-amber-800"
            whileHover={{ scale: 1.02 }}
          >
            <label htmlFor="guests" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FaUsers className="text-amber-700 dark:text-amber-400" />
              Number of Guests
            </label>
            <input
              min={1}
              max={5}
              id="guests"
              name="number"
              type="number"
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2.5 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500 transition-all"
              placeholder="1"
              required
            />
          </motion.div>

          <motion.div
            className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4 rounded-2xl border border-purple-200 dark:border-purple-800"
            whileHover={{ scale: 1.02 }}
          >
            <label htmlFor="Rooms" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FaBed className="text-purple-700 dark:text-purple-400" />
              Number of Rooms
            </label>
            <input
              min={1}
              max={5}
              id="Rooms"
              name="room"
              type="number"
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2.5 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              placeholder="1"
              required
            />
          </motion.div>
        </div>

        {/* Extra Options */}
        <motion.div
          className="bg-gradient-to-r from-rose-500/10 to-red-500/10 p-4 rounded-2xl border border-rose-200 dark:border-rose-800"
          whileHover={{ scale: 1.02 }}
        >
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <FaUtensils className="text-rose-700 dark:text-rose-400" />
            Extra Options
          </label>
          <select
            name="extaOptions"
            className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2.5 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-rose-500 transition-all"
          >
            <option value="Breakfast">🍳 Breakfast</option>
            <option value="Lunch">🍽️ Lunch</option>
            <option value="Dinner">🌙 Dinner</option>
            <option value="extraBed">🛏️ Extra Bed</option>
          </select>
        </motion.div>

        {/* Availability Status */}
        {isAvailable && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-2xl border border-green-300 dark:border-green-700 p-4 flex items-center gap-3"
          >
            <FaCheckCircle className="text-green-600 dark:text-green-400 text-2xl" />
            <div>
              <p className="font-semibold text-green-800 dark:text-green-300">Room Available!</p>
              <p className="text-sm text-green-700 dark:text-green-400">You can proceed with booking</p>
            </div>
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          className={`w-full py-4 rounded-2xl font-semibold text-white text-lg shadow-lg transition-all duration-300 ${
            isAvailable
              ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
              : "bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
          } ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Checking Availability...
            </span>
          ) : isAvailable ? (
            <span className="flex items-center justify-center gap-2">
              <FaCheckCircle />
              Book & Pay Now
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <FaCalendarAlt />
              Check Availability
            </span>
          )}
        </motion.button>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4"
        >
          <p className="text-sm text-blue-800 dark:text-blue-300 text-center">
            💡 <strong>Secure Booking:</strong> Your reservation is protected with our secure payment system
          </p>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default CheckoutForm;