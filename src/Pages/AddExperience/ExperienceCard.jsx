import React from "react";
import { motion } from "framer-motion";
import { MapPin, Star, Trash2 } from "lucide-react";
import RatingInput from "./RatingInput";

export default function ExperienceCard({ exp, onRate, onDelete }) {
  return (
    <motion.div
    
      className="backdrop-blur-sm bg-gradient-to-br from-emerald-50/50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-emerald-900/10 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl p-6 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center text-white font-semibold text-sm">
            {exp.userName?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-200">
              {exp.userName}
            </p>
            {exp.location && (
              <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                <MapPin className="w-3 h-3 mr-1" />
                {exp.location}
              </div>
            )}
          </div>
        </div>
        
        {/* Rating Display */}
        <div className="text-right">
          <div className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full">
            {/* <Star className="w-3 h-3 fill-current" /> */}
            <span className="text-sm font-bold">
              {exp.avgRating ? Number(exp.avgRating).toFixed(1) : "0.0"}
            </span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            ({exp.ratingsCount || 0} ratings)
          </div>
        </div>
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
        {exp.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
        {exp.description}
      </p>

      {/* Photos Grid */}
      {exp.photos && exp.photos.length > 0 && (
        <div className="grid grid-cols-2 gap-3 mb-4">
          {exp.photos.slice(0,4).map((p, i) => (
            <motion.img
              key={i}
              src={p}
              alt={`photo-${i}`}
              className="w-full h-28 object-cover rounded-xl border-2 border-emerald-200 dark:border-emerald-800 hover:scale-105 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            />
          ))}
        </div>
      )}

      {/* Actions */}
      {/* <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <RatingInput experience={exp} onRate={onRate} />
        <motion.button
          onClick={() => onDelete && onDelete(exp._id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-300"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </motion.button>
      </div> */}
    </motion.div>
  );
}