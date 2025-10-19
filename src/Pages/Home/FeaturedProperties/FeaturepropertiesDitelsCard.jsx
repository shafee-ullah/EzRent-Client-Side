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
import { motion } from "framer-motion";
import Loading from "../../../components/Loading";
import CheckoutForm from "../../CheckoutForm/CheckoutForm";

const FeaturepropertiesDitelsCard = ({ data, loading, error }) => {
  if (!data) return null;
  if (loading) return <Loading />;
  if (error) return <p className="text-red-500 dark:text-red-400 text-center py-8">{error}</p>;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-emerald-900/10 py-8 px-4">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Main Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          {/* Image Section */}
          <div className="relative">
            <motion.img
              src={data.image}
              alt={data.name}
              className="w-full md:h-96 h-64 object-cover"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-2xl text-sm font-semibold shadow-lg backdrop-blur-sm"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              {data.reating} <FaStar className="inline ml-1" />
            </motion.span>
          </div>

          {/* Content Section */}
          <div className="p-6 md:p-8 space-y-8">
            {/* Title & Location */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400">
                {data.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2 text-lg backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 px-4 py-2 rounded-2xl">
                <FaMapMarkerAlt className="text-red-500" /> {data.Location}
              </p>
            </motion.div>

            {/* Price & Guests */}
            <motion.div variants={itemVariants} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-lg">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                  <span className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400 font-bold">
                    ${data.price}
                  </span>{" "}
                  <span className="text-gray-500 dark:text-gray-400">/ night</span>
                </p>
                <p className="flex items-center text-gray-700 dark:text-gray-300 font-medium bg-gradient-to-r from-blue-500/10 to-cyan-500/10 px-4 py-2 rounded-2xl">
                  <FaUsers className="mr-2 text-blue-500" /> Max {data.guest} Guests
                </p>
              </div>
            </motion.div>

            {/* Long Description */}
            <motion.div variants={itemVariants}>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                {data.description}
              </p>
            </motion.div>

            {/* Property Details */}
            <motion.div variants={itemVariants} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-lg">
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400">
                <FaClipboardList className="text-blue-500" /> Property Details
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <motion.li
                  className="flex items-center gap-3 text-gray-700 dark:text-gray-300 bg-gradient-to-r from-emerald-500/5 to-green-500/5 p-3 rounded-2xl border border-emerald-200 dark:border-emerald-800"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaBed className="text-emerald-500" /> {data.bedrooms} Bedrooms
                </motion.li>
                <motion.li
                  className="flex items-center gap-3 text-gray-700 dark:text-gray-300 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 p-3 rounded-2xl border border-blue-200 dark:border-blue-800"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaBed className="text-blue-500" /> {data.beds} Beds
                </motion.li>
                <motion.li
                  className="flex items-center gap-3 text-gray-700 dark:text-gray-300 bg-gradient-to-r from-amber-500/5 to-orange-500/5 p-3 rounded-2xl border border-amber-200 dark:border-amber-800"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaBath className="text-amber-500" /> {data.bathrooms} Bathrooms
                </motion.li>
                <motion.li
                  className="flex items-center gap-3 text-gray-700 dark:text-gray-300 bg-gradient-to-r from-purple-500/5 to-pink-500/5 p-3 rounded-2xl border border-purple-200 dark:border-purple-800"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaClipboardList className="text-purple-500" /> {data.rules}
                </motion.li>
              </ul>
            </motion.div>

            {/* Services & Amenities */}
            <motion.div variants={itemVariants} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-lg">
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400">
                <FaConciergeBell className="text-emerald-500" /> Services & Amenities
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {data.services?.map((service, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center text-gray-700 dark:text-gray-300 bg-gradient-to-r from-emerald-500/10 to-green-500/10 p-3 rounded-2xl border border-emerald-200 dark:border-emerald-800"
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <FaCheckCircle className="text-emerald-500 mr-3" />
                    {service}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* New Features Section */}
            <motion.div variants={itemVariants} className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl border border-purple-200 dark:border-purple-800 p-6 shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
                ✨ Premium Features
              </h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <motion.li
                  className="flex items-center gap-3 p-2"
                  whileHover={{ x: 10 }}
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                  Recently Renovated Interiors
                </motion.li>
                <motion.li
                  className="flex items-center gap-3 p-2"
                  whileHover={{ x: 10 }}
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                  Smart Room Controls with Mobile App
                </motion.li>
                <motion.li
                  className="flex items-center gap-3 p-2"
                  whileHover={{ x: 10 }}
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                  Rooftop Lounge & Sky Bar
                </motion.li>
                <motion.li
                  className="flex items-center gap-3 p-2"
                  whileHover={{ x: 10 }}
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                  Eco-Friendly & Sustainable Practices
                </motion.li>
              </ul>
            </motion.div>

            {/* Checkout Form */}
            <motion.div variants={itemVariants}>
              <CheckoutForm data={data} />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FeaturepropertiesDitelsCard;