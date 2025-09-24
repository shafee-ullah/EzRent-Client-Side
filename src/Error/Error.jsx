import React from 'react';
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaHotel } from "react-icons/fa"
const Error = () => {
    return (
          <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-200 to-blue-100 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg"
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="bg-green-500 text-white p-16 rounded-full shadow-lg"
          >
            <FaHotel size={150} />
          </motion.div>
        </div>

        {/* Title */}
        <h1 className="text-7xl font-extrabold text-green-500">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mt-2">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-600 mt-3 leading-relaxed">
          The page you are looking for doesn’t exist or has been moved.  
          Don’t worry — you can always find your perfect stay with us!
        </p>

        {/* Button */}
        <div className="mt-6">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-green-500 text-white rounded-2xl shadow-lg hover:bg-green-700 transition duration-300"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
    );
};

export default Error;