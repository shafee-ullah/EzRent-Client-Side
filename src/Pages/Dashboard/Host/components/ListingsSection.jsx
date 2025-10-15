
// // Updated ListingsSection.jsx
// import React, { useContext, useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { motion } from "framer-motion";
// import {
//   Plus,
//   Star,
//   MapPin,
//   Edit,
//   Trash2,
//   Wifi,
//   Car,
//   Snowflake,
//   Coffee,
// } from "lucide-react";
// import { fetchProducts, deleteProperty, updatePropertyStatus } from "../../../../redux/PropertieSlice";
// import AddPropertyModal from "../../AddProperty/AddProperty";
// import toast, { Toaster } from "react-hot-toast"; // <-- import toast
// import { AuthContext } from "../../../../Context/AuthContext";

// const MotionDiv = motion.div;

// const ListingsSection = () => {
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [editProperty, setEditProperty] = useState(null);
//   const {user}=useContext(AuthContext)
//   const dispatch = useDispatch();

//  const { properties, loading, error } = useSelector((state) => state.products);
//   const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] = useState(false);

// useEffect(() => {
//   if (user?.email && properties.length === 0) {
//     dispatch(fetchProducts(user.email));
//   }
// }, [dispatch, user?.email]);
//   console.log(properties )
//   return (
//     <div className="space-y-6">
//       {/* Toast Container */}
//       {/* <Toaster position="top-right" reverseOrder={false} /> */}

//       {/* Add Property Modal */}
//       <AddPropertyModal
//         isOpen={isAddPropertyModalOpen}
//         onClose={() => setIsAddPropertyModalOpen(false)}
//       />

//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//           My Properties
//         </h2>
//         <button
//           onClick={() => setIsAddPropertyModalOpen(true)}
//           className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
//         >
//           <Plus className="w-4 h-4" />
//           Add New Property
//         </button>
//       </div>

//       {loading && (
//         <div className="flex justify-center py-8">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
//         </div>
//       )}

//       {error && (
//         <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-400">
//           Error: {error}
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {properties && properties.length > 0 ? (
//           properties.map((property, index) => (
//             <MotionDiv
//               key={property._id}
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.4, delay: index * 0.08 }}
//               whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
//               className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
//             >
//               <div className="relative">
//                 <img
//                   src={property?.image || "https://placehold.co/400x200?text=No+Image"}
//                   alt={property.name || "Property"}
//                   className="w-full h-44 object-cover bg-gray-100"
//                 />
//                 <span
//                   className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
//                     property.status === "avaliable"
//                       ? "bg-emerald-500 text-white"
//                       : "bg-gray-400 text-white"
//                   }`}
//                 >
//                   {property.status === "avaliable" ? "Active" : "Inactive"}
//                 </span>
//               </div>

//               <div className="p-5 flex-1 flex flex-col justify-between">
//                 <div>
//                   <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
//                     {property.title || property.name || "Untitled Property"}
//                   </h3>
//                   <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
//                     <MapPin className="w-4 h-4" />
//                     <span className="text-sm">{property.Location || "Unknown"}</span>
//                   </div>
//                   <div className="flex items-center gap-2 mb-2">
//                     <Star className="w-4 h-4 fill-current text-amber-500" />
//                     <span className="text-sm font-medium">{property.reating || "N/A"}</span>
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between mt-2">
//                   <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
//                     ${property.price || "--"}
//                     <span className="text-xs font-normal text-gray-500 dark:text-gray-400 ml-1">/night</span>
//                   </span>
//                   <span className="text-xs text-gray-500 dark:text-gray-400">
//                     {property.bookings ? `${property.bookings} bookings` : "No bookings"}
//                   </span>
//                 </div>

//                 <div className="flex items-center gap-2 mt-4">
//                   {/* Status Toggle Button with Toast */}
//                   <button
//                     onClick={() => {
//                       dispatch(
//                         updatePropertyStatus({
//                           propertyId: property._id,
//                           newStatus: property.status === "avaliable" ? "inactive" : "avaliable"
//                         })
//                       )
//                         .unwrap()
//                         .then(() => {
//                           toast.success(
//                             `Property status updated to ${
//                               property.status === "avaliable" ? "Inactive" : "Active"
//                             }`
//                           );
//                           dispatch(fetchProducts()); // refresh UI
//                         })
//                         .catch(() => {
//                           toast.error("Failed to update status");
//                         });
//                     }}
//                     className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-colors ${
//                       property.status === "avaliable"
//                         ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300"
//                         : "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300"
//                     }`}
//                   >
//                     {property.status === "avaliable" ? "Deactivate" : "Activate"}
//                   </button>

//                   <button
//                     className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
//                     onClick={() => {
//                       setEditProperty(property);
//                       setEditModalOpen(true);
//                     }}
//                   >
//                     <Edit className="w-4 h-4" />
//                   </button>

//                   <button
//                     className="p-2 text-red-500 hover:text-red-700"
//                     onClick={() => dispatch(deleteProperty(property._id))}
//                   >
//                     <Trash2 className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </MotionDiv>
//           ))
//         ) : (
//           !loading && (
//             <div className="col-span-3 text-center py-12">
//               <div className="text-gray-400 dark:text-gray-500 mb-4">
//                 <Plus className="w-16 h-16 mx-auto mb-3 opacity-50" />
//                 <p className="text-lg">No properties found</p>
//                 <p className="text-sm mt-1">Add your first property to get started</p>
//               </div>
//               <button
//                 onClick={() => setIsAddPropertyModalOpen(true)}
//                 className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
//               >
//                 Add Your First Property
//               </button>
//             </div>
//           )
//         )}
//       </div>

//       {/* Edit/Add Property Modal */}
//       <AddPropertyModal
//         isOpen={editModalOpen}
//         onClose={() => {
//           setEditModalOpen(false);
//           setEditProperty(null);
//         }}
//         property={editProperty}
//         onPropertyAdded={() => dispatch(fetchProducts())}
//       />
//     </div>
//   );
// };

// export default ListingsSection;

import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
  Plus,
  Star,
  MapPin,
  Edit,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../../Context/AuthContext";
import {
  fetchProducts,
  deleteProperty,
  updatePropertyStatus,
} from "../../../../redux/PropertieSlice";
import AddPropertyModal from "../../AddProperty/AddProperty";

const MotionDiv = motion.div;

const ListingsSection = () => {
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);
 const {properties,loading,error}=useSelector((state)=>state.products)


  const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editProperty, setEditProperty] = useState(null);

  // ✅ Only call once per email change (no infinite loop)
  useEffect(() => {
    if (user?.email && properties.length === 0) {
      dispatch(fetchProducts(user.email));
    }
  }, [dispatch, user?.email]);

  console.log("Fetched properties:", properties);

  const handleStatusToggle = (property) => {
    const newStatus =
      property.status === "avaliable" ? "inactive" : "avaliable";
    dispatch(
      updatePropertyStatus({
        propertyId: property._id,
        newStatus,
      })
    )
      .unwrap()
      .then(() => {
        toast.success(`Property status updated to ${newStatus}`);
        dispatch(fetchProducts(user.email)); // ✅ Refetch only after successful update
      })
      .catch(() => {
        toast.error("Failed to update status");
      });
  };

  const handleDelete = (id) => {
    dispatch(deleteProperty(id))
      .unwrap()
      .then(() => {
        toast.success("Property deleted successfully");
        dispatch(fetchProducts(user.email)); // ✅ Refetch after deletion
      })
      .catch(() => toast.error("Failed to delete property"));
  };

  return (
    <div className="space-y-6">
      <AddPropertyModal
        isOpen={isAddPropertyModalOpen}
        onClose={() => setIsAddPropertyModalOpen(false)}
      />

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          My Properties
        </h2>
        <button
          onClick={() => setIsAddPropertyModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
          Add New Property
        </button>
      </div>

      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          Error: {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties && properties.length > 0 ? (
          properties.map((property, index) => (
            <MotionDiv
              key={property._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              }}
              className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative">
                <img
                  src={
                    property.image ||
                    "https://placehold.co/400x200?text=No+Image"
                  }
                  alt={property.name || "Property"}
                  className="w-full h-44 object-cover bg-gray-100"
                />
                <span
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                    property.status === "avaliable"
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-400 text-white"
                  }`}
                >
                  {property.status === "avaliable" ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                    {property.title || property.name}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-500 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">
                      {property.Location || "Unknown"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 text-amber-500" />
                    <span className="text-sm font-medium">
                      {property.rating || "N/A"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <span className="text-xl font-bold text-emerald-600">
                    ${property.price || "--"}
                    <span className="text-xs text-gray-500 ml-1">/night</span>
                  </span>
                  <span className="text-xs text-gray-500">
                    {property.bookings
                      ? `${property.bookings} bookings`
                      : "No bookings"}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <button
                    onClick={() => handleStatusToggle(property)}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-colors ${
                      property.status === "avaliable"
                        ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                        : "bg-red-100 text-red-700 hover:bg-red-200"
                    }`}
                  >
                    {property.status === "avaliable"
                      ? "Deactivate"
                      : "Activate"}
                  </button>

                  <button
                    className="p-2 text-gray-500 hover:text-gray-700"
                    onClick={() => {
                      setEditProperty(property);
                      setEditModalOpen(true);
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    className="p-2 text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(property._id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </MotionDiv>
          ))
        ) : (
          !loading && (
            <div className="col-span-3 text-center py-12 text-gray-400">
              <Plus className="w-16 h-16 mx-auto mb-3 opacity-50" />
              <p className="text-lg">No properties found</p>
              <p className="text-sm mt-1">
                Add your first property to get started
              </p>
            </div>
          )
        )}
      </div>

      <AddPropertyModal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setEditProperty(null);
        }}
        property={editProperty}
        onPropertyAdded={() => dispatch(fetchProducts(user.email))}
      />
    </div>
  );
};

export default ListingsSection;
