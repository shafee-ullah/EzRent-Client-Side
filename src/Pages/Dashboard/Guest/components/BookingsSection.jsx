import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { AuthContext } from "../../../../Context/AuthContext";
import { deleteBooking, fetchMyBooking } from "../../../../redux/PropertieSlice";
import Swal from "sweetalert2";



const BookingsSection = () => {
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);

  // Use myBookings from Redux state
  const { myBookings: bookings, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (user?.email) {
      dispatch(fetchMyBooking(user.email));
    }
  }, [dispatch, user?.email]);


  const handleCancelBooking = (id) => {
    Swal.fire({
      title: "Cancel this booking?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteBooking(id))
          .unwrap()
          .then(() => {
            Swal.fire("Cancelled!", "Your booking has been deleted.", "success");
          })
          .catch(() => {
            Swal.fire("Error", "Failed to cancel booking.", "error");
          });
      }
    });
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!bookings?.length) return <p>No bookings found.</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      {bookings.map((booking) => (
        <motion.div
          key={booking._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-3"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-stretch">
            {/* Left Side: Image */}
            <div className="flex-shrink-0 w-full sm:w-60 h-40">
              <img
                src={booking.img}
                alt={booking.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Right Side: Details */}
            <div className="flex-grow p-1 relative">
              <span
                className={`absolute top-0 right-0 px-3 py-1 text-sm font-medium rounded-full ${booking.status === "confirmed"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
                  }`}
              >
                {booking.status}
              </span>

              <h2 className="text-xl font-semibold text-gray-800">
                {booking.title}
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Hosted by {booking.host || "Unknown"}
              </p>

              <div className="flex justify-between items-center text-gray-700 border-b border-gray-100 pb-3 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Check-in</p>
                  <p className="font-bold">{formatDate(booking.Checkin)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Check-out</p>
                  <p className="font-bold">{formatDate(booking.Checkout)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total Price</p>
                  <p className="font-black text-lg">
                    ৳{Number(booking.price).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-4 flex-wrap">
                <button className="px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition duration-150 shadow-md">
                  Contact Host
                </button>
                {/* Cancel Booking Button */}
                <button
                  onClick={() => handleCancelBooking(booking._id)}
                  className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition duration-150 shadow-md"
                >
                  Cancel Booking
                </button>
                <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 font-medium rounded-lg hover:bg-gray-50 transition duration-150 flex items-center">
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    ></path>
                  </svg>
                  Invoice
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default BookingsSection;
