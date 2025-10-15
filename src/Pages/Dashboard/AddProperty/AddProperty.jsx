// components/AddPropertyModal.jsx
import React, { useState, useEffect, useContext } from "react";
// import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Context/AuthContext";


const AddPropertyModal = ({ isOpen, onClose, onPropertyAdded, property }) => {
  const {user}=useContext(AuthContext)
  console.log(user)
  // const dispatch = useDispatch();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    services: "",
    price: "",
    offerPrice: "",
    Location: "",
    guest: "",
    bookings:0,
    image: null,
    email:user?.email,
    Name:user.displayName,
    status:"avaliable",
    propertystatus:"pending",
  });

  // Prefill form if editing
  useEffect(() => {
    if (property) {
      setProduct({
        name: property.name || "",
        description: property.description || "",
        category: property.category || "",
        services: property.services || "",
        price: property.price || "",
        offerPrice: property.offerPrice || "",
        Location: property.Location || "",
        guest: property.guest || "",
        reating: property.reating || "",
        image:  null,
      });
    }
  }, [property]);

  const handleImageChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If editing, update property
    if (property) {
      let imageUrl = property.image;
      if (product.image) {
        // Upload new image if changed
        const formData = new FormData();
        formData.append("image", product.image);
        const imgbbAPI = "https://api.imgbb.com/1/upload?key=e45319e6715cdaa4b72e32898ac377b1";
        try {
          const res = await fetch(imgbbAPI, {
            method: "POST",
            body: formData,
          });
          const imgData = await res.json();
          if (imgData.success) {
            imageUrl = imgData.data.url;
          }
        } catch {
          Swal.fire("Error!", "Image upload failed.", "error");
          return;
        }
      }
      const updatedData = { ...product, image: imageUrl };
      // Update property in backend
      await fetch(`https://ez-rent-server-side.vercel.app/AddProperty/${property._id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
    
      Swal.fire({
        icon: "success",
        title: "Property Updated Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      onClose();
      if (onPropertyAdded) onPropertyAdded();
      return;
    }

    // Add new property
    if (!product.image) {
      Swal.fire("Please upload an image first!");
      return;
    }
    const formData = new FormData();
    formData.append("image", product.image);
    const imgbbAPI = "https://api.imgbb.com/1/upload?key=e45319e6715cdaa4b72e32898ac377b1";
    try {
      const res = await fetch(imgbbAPI, {
        method: "POST",
        body: formData,
      });
      const imgData = await res.json();
      if (imgData.success) {
        const imageUrl = imgData.data.url;
        const newProduct = {
          ...product,
          image: imageUrl,
        };
        const dbRes = await fetch("https://ez-rent-server-side.vercel.app/AddProperty", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newProduct),
        });
  await dbRes.json();
        Swal.fire({
          icon: "success",
          title: "Property Added Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        setProduct({
          name: "",
          description: "",
          category: "",
          services: "",
          price: "",
          offerPrice: "",
          Location: "",
          guest: "",
          reating: "",
          image: null,
        });
        onClose();
        if (onPropertyAdded) onPropertyAdded();
      }
    } catch {
      Swal.fire("Error!", "Something went wrong while uploading.", "error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {property ? "Edit Property" : "Add New Property"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
              Property Image
            </label>
            <label className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 h-48 flex flex-col items-center justify-center cursor-pointer w-full hover:border-emerald-400 transition-colors">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              {product.image ? (
                <div className="relative w-full h-full">
                  <img
                    src={URL.createObjectURL(product.image)}
                    alt="preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                    <span className="text-white opacity-0 hover:opacity-100 transition-opacity">
                      Change Image
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">📷</span>
                  </div>
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    Click to upload property image
                  </span>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    PNG, JPG, JPEG up to 5MB
                  </p>
                </div>
              )}
            </label>
          </div>

          {/* Property Name */}
          <div>
            <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
              Property Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter property name"
              value={product.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Property Description */}
          <div>
            <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
              Property Description
            </label>
            <textarea
              name="description"
              placeholder="Describe your property..."
              value={product.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
            ></textarea>
          </div>

          {/* Grid of Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
                Category
              </label>
              <select
                name="category"
                value={product.category}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              >
                <option value="">Select Category</option>
                <option value="House">House</option>
                <option value="Cabin">Cabin</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Studio">Studio</option>
              </select>
            </div>

            <div>
              <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
                Price per Night ($)
              </label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
                min="0"
                placeholder="0.00"
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
                Offer Price ($)
              </label>
              <input
                type="number"
                name="offerPrice"
                value={product.offerPrice}
                onChange={handleChange}
                min="0"
                placeholder="0.00"
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
                Location
              </label>
              <input
                type="text"
                name="Location"
                value={product.Location}
                onChange={handleChange}
                required
                placeholder="Enter location"
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
                Maximum Guests
              </label>
              <input
                type="number"
                name="guest"
                value={product.guest}
                onChange={handleChange}
                required
                min="1"
                placeholder="0"
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>

         <div>
            <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
              Services (comma separated)
            </label>
            <input
              type="text"
              name="services"
              value={product.services}
              onChange={handleChange}
              placeholder="e.g., WiFi, Parking, AC, Kitchen"
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>
          
          </div>

          {/* Services */}
        

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-6 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-6 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              {property ? "Update Property" : "Add Property"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddPropertyModal;


