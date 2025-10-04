import React, { useState } from "react";

export default function AddProperty() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    offerPrice: "",
    Location: "",
    guest : "",

    image: null,
  });

  // Image handle
  const handleImageChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  // Input handle
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Submit handle
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Data:", product);
    // এখানে backend এ পাঠানোর জন্য axios.post ব্যবহার করা যাবে
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-4">Add property</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Image Upload */}
        <div>
          <label className="block font-medium mb-1">property Image</label>
          <label className="border-2 border-dashed rounded-md p-4 h-40 flex items-center justify-center cursor-pointer w-full">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            {product.image ? (
              <img
                src={URL.createObjectURL(product.image)}
                alt="preview"
                className="w-full h-full object-cover rounded-md"
              />
            ) : (
              <span className="text-gray-400 text-sm">Upload</span>
            )}
          </label>
        </div>

        {/* Product Name */}
        <div>
          <label className="block font-medium">property Name</label>
          <input
            type="text"
            name="name"
            placeholder="Type here"
            value={product.name}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>

        {/* Product Description */}
        <div>
          <label className="block font-medium">property  Description</label>
          <textarea
            name="description"
            placeholder="Type here"
            value={product.description}
            onChange={handleChange}
            className="w-full border rounded-md p-2 h-24"
          ></textarea>
        </div>

        {/* Category, Price, Offer Price */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block font-medium">Category</label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            >
              <option value="Earphone">All Types</option>
              <option value="Mobile">House</option>
              <option value="Laptop">caben</option>
              <option value="Accessories">Apartment</option>
            </select>
          </div>
          <div>
            <label className="block font-medium"> Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block font-medium">Offer Price</label>
            <input
              type="number"
              name="offerPrice"
              value={product.offerPrice}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block font-medium">Location</label>
            <input
              type="text"
              name="Location"
              value={product.offerPrice}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block font-medium">guest</label>
            <input
              type="number"
              name="guest"
              value={product.offerPrice}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-2 rounded-md font-semibold hover:bg-orange-700"
        >
          ADD
        </button>
      </form>
    </div>
  );
}
