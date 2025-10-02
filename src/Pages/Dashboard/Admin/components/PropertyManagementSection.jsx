import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, Home, Calendar, Download, MoreHorizontal } from "lucide-react";

const MotionDiv = motion.div;

const PropertyManagementSection = () => {
  const [properties, setProperties] = useState([
    {
      id: 1,
      title: "Luxury Apartment Gulshan",
      host: "Ahmad Rahman",
      location: "Dhaka",
      status: "approved",
      price: 4500,
      createdAt: "2024-05-15",
      bookings: 24,
    },
    {
      id: 2,
      title: "Beachfront Villa Cox's Bazar",
      host: "Sarwar Islam",
      location: "Cox's Bazar",
      status: "pending",
      price: 8900,
      createdAt: "2024-06-01",
      bookings: 0,
    },
    {
      id: 3,
      title: "Mountain View Cottage",
      host: "Nusrat Jahan",
      location: "Sylhet",
      status: "rejected",
      price: 3200,
      createdAt: "2024-05-28",
      bookings: 0,
    },
  ]);

  const [filter, setFilter] = useState("all");

  const getStatusColor = (status) => {
    const colors = {
      approved:
        "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
      pending:
        "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
      rejected: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Property Management
        </h2>
        <div className="flex items-center gap-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Properties</option>
            <option value="pending">Pending Approval</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-medium hover:shadow-md transition-all duration-300">
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property, index) => (
          <MotionDiv
            key={property.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2">
                  {property.title}
                </h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    property.status
                  )}`}
                >
                  {property.status}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Host: {property.host}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  <span>{property.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{property.bookings} bookings</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  ৳{property.price}
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    /night
                  </span>
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(property.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {property.status === "pending" && (
                  <>
                    <button className="flex-1 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors">
                      Approve
                    </button>
                    <button className="flex-1 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors">
                      Reject
                    </button>
                  </>
                )}
                {property.status === "approved" && (
                  <button className="flex-1 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors">
                    Remove
                  </button>
                )}
                <button className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          </MotionDiv>
        ))}
      </div>
    </div>
  );
};

export default PropertyManagementSection;
