import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function RatingInput({ experience, onRate }) {
  const [value, setValue] = useState("");

  const handleRate = async () => {
    const val = parseInt(value, 10);
    if (!val || val < 1 || val > 10) return;
    if (!onRate) return;
    
    await onRate(experience._id, val);
    setValue("");
  };

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <input
          type="number"
          min="1"
          max="10"
          className="w-20 px-4 py-2 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all duration-300"
          placeholder="1-10"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {/* <Star className="w-4 h-4 text-amber-500 absolute right-3 top-1/2 transform -translate-y-1/2" /> */}
      </div>
      <motion.button
        onClick={handleRate}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300"
      >
        Rate
      </motion.button>
    </div>
  );
}