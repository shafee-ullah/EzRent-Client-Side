import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { AuthContext } from "../../../../Context/AuthContext";
import {
  updateBookingStatus,
  fetchMyBooking,
} from "../../../../redux/PropertieSlice";
import { ContactHostButton } from "../../../../Components/Chat/MessageHostButton";
import Swal from "sweetalert2";
import { MdHotel } from "react-icons/md";
import { Link } from "react-router";
import Loading from "../../../../components/Loading";

const BookingsSection = () => {
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);

  // Use myBookings from Redux state
  const {
    myBookings: bookings,
    loading,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (user?.email) {
      dispatch(fetchMyBooking(user.email));
    }
  }, [dispatch, user?.email]);

  //  useEffect(() => {
  //   if (bookings.length > 0) {
  //     console.log("=== BOOKING DATA AFTER FIX ===");
  //     console.log("Full booking object:", bookings[0]);
  //     console.log("booking.hostId:", bookings[0].hostId);
  //     console.log("booking.hostName:", bookings[0].hostName);
  //     console.log("booking.propertyId:", bookings[0].propertyId);
  //     console.log("booking.id:", bookings[0].id);
  //     console.log("Available fields:", Object.keys(bookings[0]));
  //     console.log("================================");
  //   }
  // }, [bookings]);

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
        dispatch(
          updateBookingStatus({
            bookingId: id,
            newStatus: "cancelled",
          })
        )
          .unwrap()
          .then(() => {
            Swal.fire(
              "Cancelled!",
              "Your booking has been cancelled.",
              "success"
            );
            // Refresh bookings to show updated status
            if (user?.email) {
              dispatch(fetchMyBooking(user.email));
            }
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

  if (loading) return <Loading />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      {bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md text-center">
          <MdHotel className="w-20 h-20 mb-4 text-gray-300 dark:text-gray-600" />
          <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No Bookings Yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6 px-4">
            You haven't made any bookings yet. Browse our properties and book
            your favorite stay.
          </p>
          <Link to="/BrowseProperties">
            <button className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
              Browse Properties
            </button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {/* <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">My Bookings</h2> */}
          {bookings.map((booking) => (
            <motion.div
              key={booking._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700"
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
                    className={`absolute top-0 right-0 px-3 py-1 text-sm font-medium rounded-full ${
                      booking.status === "confirmed"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                    }`}
                  >
                    {booking.status}
                  </span>

                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                    {booking.title}
                  </h2>
                  <p className="text-sm text-gray-500 mb-4 dark:text-gray-300">
                    Hosted by {booking.hostname || "Unknown"}
                  </p>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-gray-700 border-b border-gray-100 dark:border-gray-700 pb-3 mb-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Check-in</p>
                      <p className="font-bold dark:text-gray-300">
                        {formatDate(booking.Checkin)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Check-out</p>
                      <p className="font-bold dark:text-gray-300">
                        {formatDate(booking.Checkout)}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Total Price</p>
                      <p className="font-black text-lg dark:text-gray-300">
                        ${Number(booking.price).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-4 flex-wrap">
                    <ContactHostButton
                      id={booking.hostId || booking.id}
                      hostName={booking.hostname || booking.host}
                      propertyId={booking.propertyId}
                      propertyTitle={booking.title}
                      className="px-4 py-2 rounded-2xl"
                    />

                    {/* Cancel Booking Button */}
                    <button
                      onClick={() => handleCancelBooking(booking._id)}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-2xl transition duration-150 shadow-md"
                    >
                      Cancel Booking
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingsSection;
