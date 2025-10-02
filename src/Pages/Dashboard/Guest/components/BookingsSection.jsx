import React, { useState } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

const MotionDiv = motion.div;

const BookingsSection = ({ data }) => {
  const [activeTab, setActiveTab] = useState("upcoming");

  const tabs = [
    { id: "upcoming", label: "Upcoming", count: data.upcomingBookings.length },
    { id: "past", label: "Past", count: data.pastBookings.length },
    { id: "cancelled", label: "Cancelled", count: 0 },
  ];

  const getStatusColor = (status) => {
    const colors = {
      confirmed:
        "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
      pending:
        "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
      completed:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          My Bookings
        </h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-medium hover:shadow-md transition-all duration-300">
          <Download className="w-4 h-4" />
          Export All
        </button>
      </div>

      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all duration-300 ${
              activeTab === tab.id
                ? "border-emerald-500 text-emerald-600 dark:text-emerald-400 font-semibold"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            {tab.label}
            <span
              className={`px-2 py-1 rounded-full text-xs ${
                activeTab === tab.id
                  ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300"
                  : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {activeTab === "upcoming" &&
          data.upcomingBookings.map((booking) => (
            <MotionDiv
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                <img
                  src={booking.image}
                  alt={booking.property}
                  className="w-full lg:w-48 h-40 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {booking.property}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Hosted by {booking.host}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Check-in
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {new Date(booking.checkIn).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Check-out
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {new Date(booking.checkOut).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Total Price
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        ৳{booking.totalPrice}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button className="px-4 py-2 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-colors">
                      Contact Host
                    </button>
                    <button className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                      Modify Booking
                    </button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors">
                      Cancel Booking
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                      <Download className="w-4 h-4" />
                      Invoice
                    </button>
                  </div>
                </div>
              </div>
            </MotionDiv>
          ))}

        {activeTab === "past" &&
          data.pastBookings.map((booking) => (
            <MotionDiv
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                <img
                  src={booking.image}
                  alt={booking.property}
                  className="w-full lg:w-48 h-40 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {booking.property}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Dates
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {new Date(booking.checkIn).toLocaleDateString()} -{" "}
                        {new Date(booking.checkOut).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Total Paid
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        ৳{booking.totalPrice}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Review
                      </p>
                      {booking.reviewed ? (
                        <p className="text-emerald-600 dark:text-emerald-400 font-medium">
                          Reviewed
                        </p>
                      ) : (
                        <button className="text-amber-600 dark:text-amber-400 font-medium hover:underline">
                          Leave Review
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </MotionDiv>
          ))}
      </div>
    </div>
  );
};

export default BookingsSection;
