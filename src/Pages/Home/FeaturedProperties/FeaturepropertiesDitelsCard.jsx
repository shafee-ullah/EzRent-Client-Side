
import React from "react";
import {
  FaMapMarkerAlt,
  FaUsers,
  FaCheckCircle,
  FaStar,
  FaConciergeBell,
} from "react-icons/fa";

const FeaturepropertiesDitelsCard = ({ data }) => {
  if (!data) return null;

  return (
  <div className="px-4  min-h-screen">
    <div className=" max-w-7xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
      {/* Image */}
      <div className="relative">
        <img
          src={data.img}
          alt={data.title}
          className="w-full h-96 object-cover"
        />
        <span className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
          {data.rating} <FaStar className="inline ml-1" />
        </span>
      </div>

      {/* Content */}
      <div className="p-8 space-y-8">
        {/* Title & Location */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-3xl font-bold text-gray-800">{data.title}</h2>
          <p className="text-gray-600 flex items-center gap-2 text-lg">
            <FaMapMarkerAlt className="text-red-500" /> {data.location}
          </p>
        </div>

        {/* Price & Guests */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-gray-50 p-5 rounded-xl border">
          <p className="text-lg font-semibold text-gray-800">
            <span className="line-through text-gray-400 mr-2">
              ${data.price1}
            </span>
            <span className="text-green-600 text-2xl">${data.price}</span>{" "}
            <span className="text-gray-500">/ night</span>
          </p>
          <p className="flex items-center text-gray-700 font-medium mt-3 md:mt-0">
            <FaUsers className="mr-2 text-gray-500" /> Max {data.guest} Guests
          </p>
        </div>

        {/* Long Description */}
        <p className="text-gray-700 leading-relaxed text-lg">
          {data.long_description}
        </p>

        {/* Services */}
        <div>
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FaConciergeBell className="text-blue-500" /> Services & Amenities
          </h3>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {data.services.map((service, idx) => (
              <li key={idx} className="flex items-center text-gray-700">
                <FaCheckCircle className="text-green-500 mr-2" /> {service}
              </li>
            ))}
          </ul>
        </div>

        {/* New Features Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border shadow-sm">
          <h3 className="text-2xl font-semibold mb-4 text-indigo-700">
            ✨ New Features
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>✔️ Recently Renovated Interiors</li>
            <li>✔️ Smart Room Controls with Mobile App</li>
            <li>✔️ Rooftop Lounge & Sky Bar</li>
            <li>✔️ Eco-Friendly & Sustainable Practices</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <button className="w-full md:w-auto px-6 py-3 bg-yellow-500 text-white font-semibold rounded-xl shadow hover:bg-yellow-600 transition">
            Add to Cart
          </button>
          <button className="w-full md:w-auto px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow hover:bg-green-700 transition">
            Booking Now
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default FeaturepropertiesDitelsCard;
