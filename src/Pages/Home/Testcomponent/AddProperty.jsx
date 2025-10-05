import React, { useState } from "react";
import Swal from "sweetalert2";

export default function AddProperty() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    services : "",
    price: "",
    offerPrice: "",
    Location: "",
    guest : "",
    reating: "",
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
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!product.image) {
    Swal.fire("Please upload an image first!");
    return;
  }

  // === 1. Image upload to imgbb ===
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
      // image link
      const imageUrl = imgData.data.url;

      // === 2. Final product data ===
      const newProduct = {
        ...product,
        image: imageUrl, // replace file with url
      };

      // === 3. Save to Database ===
      const dbRes = await fetch("http://localhost:5000/AddProperty", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      const dbData = await dbRes.json();
      console.log("Saved Data:", dbData);

      Swal.fire({
        icon: "success",
        title: "Property Added Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (error) {
    console.error("Upload error:", error);
    Swal.fire("Error!", "Something went wrong while uploading.", "error");
  }
};

  return (
    <div className="max-w-lg mx-auto p-6 bg-white dark:bg-gray-900 shadow-md rounded-xl mt-10">
      <h2 className="text-4xl font-bold mb-4 text-center">Add property</h2>
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
              <span className=" text-sm">Upload</span>
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
              className="w-full border dark:bg-gray-900 rounded-md p-2"
            >
              <option value="All Types">All Types</option>
              <option value="House">House</option>
              <option value="caben">caben</option>
              <option value="Apartment">Apartment</option>
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
              value={product.Location}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block font-medium">guest</label>
            <input
              type="number"
              name="guest"
              value={product.guest}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block font-medium">reating</label>
            <input
              type="number"
              name="reating"
              value={product.reating}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>
         
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full  bg-gradient-to-r from-emerald-500 to-green-500 text-white py-2 rounded-3xl font-semibold hover:bg-orange-700"
        >
          ADD
        </button>
      </form>
    </div>
  );
}
