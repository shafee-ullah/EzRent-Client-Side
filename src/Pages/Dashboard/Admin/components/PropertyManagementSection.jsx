import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Users, Home } from "lucide-react";
import { useEffect, useState } from "react";
import {
  fetchmanageproperty,
  updatePropertyStatusAdmin,
} from "../../../../redux/PropertieSlice";
import { FaLocationDot } from "react-icons/fa6";
import toast from "react-hot-toast";

const MotionDiv = motion.div;

const PropertyManagementSection = () => {
  const dispatch = useDispatch();
  const { items: properties, loading } = useSelector((state) => state.products);
  const [updatingPropertyId, setUpdatingPropertyId] = useState(null);

  // Filter only active properties fcdfds
  // const activeProperties = properties.filter((p) => p.status === "avaliable");

  useEffect(() => {
    if (!properties.length) dispatch(fetchmanageproperty());
  }, [dispatch, properties.length]);

  // ✅ Status color styles
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
      case "removed":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  // ✅ Handle Accept / Remove button (Instant UI update)
  const handleUpdateStatus = async (id, newStatus) => {
    setUpdatingPropertyId(id);
    const toastId = toast.loading("Updating property status...");

    try {
      // 🔹 Update via API and let Redux handle the state update
      await dispatch(updatePropertyStatusAdmin({ id, propertystatus: newStatus })).unwrap();
      
      // 🔹 Force a fresh fetch to ensure UI is in sync
      await dispatch(fetchmanageproperty());
      
      toast.dismiss(toastId);
      toast.success(
        newStatus === "active"
          ? "Property activated successfully ✅"
          : "Property removed successfully ❌"
      );
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Failed to update status 😢");
      // 🔹 Rollback by fetching fresh data
      dispatch(fetchmanageproperty());
    } finally {
      setUpdatingPropertyId(null);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Manage Properties
      </h2>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
        </div>
      ) : properties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property, index) => (
            <MotionDiv
              key={property._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col"
            >
              {/* Property Image */}
              {property.image ? (
                <img
                  src={property.image}
                  alt={property.title || property.name}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2">
                    {property.title || property.name}
                  </h3>

                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      property.propertystatus
                    )}`}
                  >
                    {property.propertystatus}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>Host: {property.Name || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    <span>{property.category || "Unknown"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaLocationDot className="w-4 h-4" />
                    <span>{property.Location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    ${property.price || "--"}
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      /night
                    </span>
                  </span>
                </div>

                {/* ✅ Loading Overlay */}
                {updatingPropertyId === property._id && (
                  <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 flex items-center justify-center rounded-2xl">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
                  </div>
                )}

                {/* ✅ Instant Dynamic Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpdateStatus(property._id, "active")}
                    disabled={updatingPropertyId === property._id}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                      property.propertystatus === "active"
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-green-100 text-green-700 hover:bg-green-200"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {property.propertystatus === "active" ? "Accepted" : "Accept"}
                  </button>

                  <button
                    onClick={() => handleUpdateStatus(property._id, "removed")}
                    disabled={updatingPropertyId === property._id}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                      property.propertystatus === "removed"
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "bg-red-100 text-red-700 hover:bg-red-200"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {property.propertystatus === "removed" ? "Removed" : "Remove"}
                  </button>
                </div>
              </div>
            </MotionDiv>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 py-8 text-center">
          No properties found
        </p>
      )}
    </div>
  );
};

export default PropertyManagementSection;