
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { fetchbooking, } from "../../../../redux/PropertieSlice";

const MotionDiv = motion.div;

const BookingsSection = () => {
  const dispatch = useDispatch();
  const { items: bookings, loading, error } = useSelector((state) => state.products);

  // Load bookings from redux on mount
  useEffect(() => {
    dispatch(fetchbooking());
  }, [dispatch]);

  // Handle status update
  // const handleStatus = (id, status) => {
  //   dispatch(updateBookingStatus({ id, status }));
  // };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>

      {bookings?.map((booking) => (
        <MotionDiv
          key={booking._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <img
              src={booking.image}
              alt={booking.property}
              className="w-full md:w-40 h-32 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{booking.property}</h3>
              <p className="text-gray-500">Hosted by {booking.host}</p>
              <p className="text-sm text-gray-600">
                {new Date(booking.checkIn).toLocaleDateString()} -{" "}
                {new Date(booking.checkOut).toLocaleDateString()}
              </p>
              <p className="font-semibold">৳{booking.totalPrice}</p>

              {/* Action buttons */}
              {/* <div className="mt-3 flex gap-3">
                <button
                  onClick={() => handleStatus(booking._id, "active")}
                  className="px-4 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600"
                >
                  Active
                </button>
                <button
                  onClick={() => handleStatus(booking._id, "rejected")}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                >
                  Reject
                </button>
              </div> */}
            </div>
          </div>
        </MotionDiv>
      ))}
    </div>
  );
};

export default BookingsSection;
