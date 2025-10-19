
// components/AddPropertyModal.jsx
import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Context/AuthContext";

const AddPropertyModal = ({ isOpen, onClose, onPropertyAdded, property }) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    services: "",
    price: "",
    offerPrice: "",
    Location: "",
    guest: "",
    bedrooms: "",
    beds: "",
    bathrooms: "",
    cancellationPolicy: "",
    rules: "",
    image: null,
    email: user?.email,
    Name: user?.displayName,
    status: "available",
    propertystatus: "pending",
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
        bedrooms: property.bedrooms || "",
        beds: property.beds || "",
        bathrooms: property.bathrooms || "",
        cancellationPolicy: property.cancellationPolicy || "",
        rules: property.rules || "",
        image: null,
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
    setLoading(true);

    try {
      let imageUrl = property ? property.image : null;

      // Upload new image if provided
      if (product.image) {
        const formData = new FormData();
        formData.append("image", product.image);
        const imgbbAPI =
          "https://api.imgbb.com/1/upload?key=e45319e6715cdaa4b72e32898ac377b1";
        const res = await fetch(imgbbAPI, {
          method: "POST",
          body: formData,
        });
        const imgData = await res.json();
        if (imgData.success) imageUrl = imgData.data.url;
        else throw new Error("Image upload failed");
      }

      const newProduct = { ...product, image: imageUrl };

      const url = property
        ? `https://ez-rent-server-side-seven.vercel.app/AddProperty/${property._id}`
        : "https://ez-rent-server-side-seven.vercel.app/AddProperty";

      const method = property ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) throw new Error("Failed to save property");

      Swal.fire({
        icon: "success",
        title: property
          ? "Property Updated Successfully!"
          : "Property Added Successfully!",
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
        bedrooms: "",
        beds: "",
        bathrooms: "",
        cancellationPolicy: "",
        rules: "",
        image: null,
      });

      onClose();
      if (onPropertyAdded) onPropertyAdded();
    } catch (error) {
      Swal.fire("Error!", error.message || "Something went wrong.", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
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

          {/* Property Info */}
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
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg p-3"
            />
          </div>

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
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg p-3 resize-none"
            ></textarea>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
                Category
              </label>
              <select
                name="category"
                value={product.category}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg p-3"
              >
                <option value="">Select Category</option>
                <option value="House">House</option>
                <option value="Cabin">Cabin</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Studio">Studio</option>
              </select>
            </div>

            {/* Price */}
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
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg p-3"
              />
            </div>

            {/* Location */}
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
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg p-3"
              />
            </div>

            {/* Max Guests */}
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
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg p-3"
              />
            </div>

            {/* Bedrooms */}
            <div>
              <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
                Bedrooms
              </label>
              <input
                type="number"
                name="bedrooms"
                value={product.bedrooms}
                onChange={handleChange}
                min="0"
                placeholder="Number of bedrooms"
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg p-3"
              />
            </div>

            {/* Beds */}
            <div>
              <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
                Beds
              </label>
              <input
                type="number"
                name="beds"
                value={product.beds}
                onChange={handleChange}
                min="0"
                placeholder="Number of beds"
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg p-3"
              />
            </div>

            {/* Bathrooms */}
            <div>
              <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
                Bathrooms
              </label>
              <input
                type="number"
                name="bathrooms"
                value={product.bathrooms}
                onChange={handleChange}
                min="0"
                placeholder="Number of bathrooms"
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg p-3"
              />
            </div>

            {/* Cancellation Policy */}
            <div>
              <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
                Cancellation Policy
              </label>
              <select
                name="cancellationPolicy"
                value={product.cancellationPolicy}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg p-3"
              >
                <option value="">Select Policy</option>
                <option value="Flexible">Flexible</option>
                <option value="Moderate">Moderate</option>
                <option value="Strict">Strict</option>
              </select>
            </div>
          </div>

          {/* Services */}
    <div className="mb-4">
  <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
    Select Services (max 10)
  </label>

  {/* ✅ Available Services */}
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
    {[
      "WiFi",
      "Kitchen",
      "Parking",
      "Pool",
      "Pet Friendly",
      "Air Conditioning",
      "TV",
      "Gym",
      "Laundry",
      "24/7 Security",
    ].map((service) => (
      <button
        key={service}
        type="button"
        onClick={() => {
          setProduct((prev) => {
            const isSelected = prev.services?.includes(service);
            const updated = isSelected
              ? prev.services.filter((s) => s !== service)
              : [...(prev.services || []), service];
            return { ...prev, services: updated };
          });
        }}
        className={`px-3 py-1 rounded-md border text-sm font-medium transition-all ${
          product.services?.includes(service)
            ? "bg-green-600 text-white border-green-500"
            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
      >
        {service}
      </button>
    ))}
  </div>

  {/* ✅ Selected Services */}
  <div className="mt-4">
    <p className="text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
      Selected Services:
    </p>
    <div className="flex flex-wrap gap-2">
      {product.services && product.services.length > 0 ? (
        product.services.map((s) => (
          <span
            key={s}
            className="bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200 text-sm px-3 py-1 rounded-full"
          >
            {s}
          </span>
        ))
      ) : (
        <p className="text-gray-500 text-sm italic">No service selected</p>
      )}
    </div>
  </div>
</div>


          {/* Host Rules */}
          <div>
            <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
              Host Rules / Restrictions
            </label>
            <textarea
              name="rules"
              value={product.rules}
              onChange={handleChange}
              placeholder='e.g., "No smoking", "No parties", "Pets allowed"'
              rows={3}
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg p-3 resize-none"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 py-3 px-6 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300 ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-emerald-500 to-green-500 hover:shadow-lg"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin w-5 h-5" />{" "}
                  {property ? "Updating..." : "Adding..."}
                </span>
              ) : property ? (
                "Update Property"
              ) : (
                "Add Property"
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddPropertyModal;
