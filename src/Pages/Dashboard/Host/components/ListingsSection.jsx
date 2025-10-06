import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { Link } from "react-router";
import { fetchProducts } from "../../../../redux/PropertieSlice";


const MotionDiv = motion.div;

const ListingsSection = () => {
  const dispatch = useDispatch();
  const { items: properties, loading, error } = useSelector((state) => state.products);
  // console.log(properties)
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const togglePropertyStatus = (propertyId, currentStatus) => {
    // Dispatch an async thunk to update property status in backend and Redux
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    dispatch({
      type: "products/updateBookingStatus/pending",
      meta: {},
      payload: { bookingId: propertyId, newStatus }
    });
    // If you have an exported updateBookingStatus thunk, use:
    // dispatch(updateBookingStatus({ bookingId: propertyId, newStatus }));
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

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties && properties.length > 0 ? (
          properties.map((property, index) => (
            <MotionDiv
              key={property._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
              className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative">
                <img
                  src={property.img || "https://placehold.co/400x200?text=No+Image"}
                  alt={property.name || "Property"}
                  className="w-full h-44 object-cover bg-gray-100"
                />
                <span
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                    property.status === "active"
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-400 text-white"
                  }`}
                >
                  {property.status === "active" ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                    {property.title || "Untitled Property"}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{property.Location || "Unknown"}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 fill-current text-amber-500" />
                    <span className="text-sm font-medium">{property.rating || "N/A"}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {property.amenities && property.amenities.length > 0 ? (
                      property.amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="inline-flex items-center px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs text-gray-700 dark:text-gray-300"
                        >
                          {getAmenityIcon(amenity)} {amenity}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gray-400">No amenities listed</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                    ${property.price || "--"}
                    <span className="text-xs font-normal text-gray-500 dark:text-gray-400 ml-1">/night</span>
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {property.bookings ? `${property.bookings} bookings` : "No bookings"}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <button
                    onClick={() => togglePropertyStatus(property.id, property.status)}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-colors ${
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
          ))
        ) : (
          <div className="col-span-3 text-center text-gray-400 py-12">No properties found.</div>
        )}
      </div>
    </div>
  );
};

export default ListingsSection;
