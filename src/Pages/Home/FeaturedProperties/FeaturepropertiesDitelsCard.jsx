import React from "react";
import {
  FaMapMarkerAlt,
  FaUsers,
  FaStar,
  FaConciergeBell,
  FaCheckCircle,
  FaBed,
  FaBath,
  FaClipboardList,
} from "react-icons/fa";
import Loading from "../../../components/Loading";
import CheckoutForm from "../../CheckoutForm/CheckoutForm";

const FeaturepropertiesDitelsCard = ({ data, loading, error }) => {
  if (!data) return null;
  if (loading) return <Loading />;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="px-4 min-h-screen md:py-10 py-5">
      <div className="max-w-7xl mx-auto bg-[var(--primary-color)] shadow-xl rounded-2xl overflow-hidden dark:border border-gray-600 dark:bg-gray-900">
        {/* Image */}
        <div className="relative">
          <img
            src={data.image}
            alt={data.name}
            className="w-full md:h-96 h-48 object-cover"
          />
          <span className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            {data.reating} <FaStar className="inline ml-1" />
          </span>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Title & Location */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-[#ffffff]">
              {data.name}
            </h2>
            <p className="text-gray-600 dark:text-[#ffffff] flex items-center gap-2 text-lg">
              <FaMapMarkerAlt className="text-red-500" /> {data.Location}
            </p>
          </div>

          {/* Price & Guests */}
          <div className="flex flex-col md:flex-row justify-between items-center p-5 rounded-xl border">
            <p className="text-lg font-semibold text-gray-800 dark:text-[#ffffff]">
              
              <span className="text-green-600 text-2xl dark:text-[#ffffff]">
                ${data.price}
              </span>{" "}
              <span className="text-gray-500 dark:text-[#ffffff]">/ night</span>
            </p>
            <p className="flex items-center text-gray-700 dark:text-[#ffffff] font-medium mt-3 md:mt-0">
              <FaUsers className="mr-2 text-gray-500 dark:text-[#ffffff]" /> Max{" "}
              {data.guest} Guests
            </p>
          </div>

          {/* Long Description */}
          <p className="text-gray-700 leading-relaxed text-lg dark:text-[#ffffff]">
            {data.description}
          </p>

          {/* Property Details */}
          <div className="p-5 rounded-xl border shadow-sm">
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <FaClipboardList className="text-blue-500" /> Property Details
            </h3>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 text-gray-700 dark:text-[#ffffff]">
              <li className="flex items-center gap-2">
                <FaBed className="text-blue-300" /> {data.bedrooms} Bedrooms
              </li>
              <li className="flex items-center gap-2">
                <FaBed className="text-blue-300" /> {data.beds} Beds
              </li>
              <li className="flex items-center gap-2">
                <FaBath className="text-blue-300" /> {data.bathrooms} Bathrooms
              </li>
              <li className="flex items-center gap-2">
                <FaClipboardList className="text-blue-300" /> {data.rules}
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <FaConciergeBell className="text-green-500" /> Services & Amenities
            </h3>

            <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {data.services?.map((service, index) => (
                <li
                  key={index}
                  className="flex items-center text-gray-700 dark:text-[#ffffff]"
                >
                  <FaCheckCircle className="text-green-500 mr-2" />
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* New Features Section */}
          <div className="p-6 rounded-xl border shadow-sm">
            <h3 className="text-2xl font-semibold mb-4 dark:text-[#ffffff]">
              ✨ New Features
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-[#ffffff]">
              <li>✔️ Recently Renovated Interiors</li>
              <li>✔️ Smart Room Controls with Mobile App</li>
              <li>✔️ Rooftop Lounge & Sky Bar</li>
              <li>✔️ Eco-Friendly & Sustainable Practices</li>
            </ul>
          </div>

          <CheckoutForm data={data} />
        </div>
      </div>
    </div>
  );
};

export default FeaturepropertiesDitelsCard;
