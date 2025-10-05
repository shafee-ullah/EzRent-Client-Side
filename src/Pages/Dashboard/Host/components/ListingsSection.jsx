import React, { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  Plus,
  Star,
  MapPin,
  Edit,
  Trash2,
  Wifi,
  Car,
  Snowflake,
  Coffee,
} from "lucide-react";

const MotionDiv = motion.div;

const ListingsSection = ({ data }) => {
  const [properties, setProperties] = useState(data.properties);

  const togglePropertyStatus = (propertyId) => {
    setProperties(
      properties.map((property) =>
        property.id === propertyId
          ? {
              ...property,
              status: property.status === "active" ? "inactive" : "active",
            }
          : property
      )
    );
  };

  const getAmenityIcon = (amenity) => {
    const icons = {
      wifi: <Wifi className="w-4 h-4" />,
      parking: <Car className="w-4 h-4" />,
      ac: <Snowflake className="w-4 h-4" />,
      kitchen: <Coffee className="w-4 h-4" />,
      beach: "🏖️",
    };
    return icons[amenity] || <Plus className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          My Properties
        </h2>
        <Link to="/dashboard/host/AddProperty">
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
            <Plus className="w-4 h-4" />
            Add New Property
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property, index) => (
          <MotionDiv
            key={property.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
          >
            <div className="relative">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    property.status === "active"
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-500 text-white"
                  }`}
                >
                  {property.status === "active" ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2">
                  {property.title}
                </h3>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium">{property.rating}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 mb-3">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{property.location}</span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  ৳{property.price}
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    /night
                  </span>
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {property.bookings} bookings
                </span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                {property.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300"
                    title={amenity}
                  >
                    {getAmenityIcon(amenity)}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => togglePropertyStatus(property.id)}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    property.status === "active"
                      ? "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                      : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300"
                  }`}
                >
                  {property.status === "active" ? "Deactivate" : "Activate"}
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-red-500 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </MotionDiv>
        ))}
      </div>
    </div>
  );
};

export default ListingsSection;
