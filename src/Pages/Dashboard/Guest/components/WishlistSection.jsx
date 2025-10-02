import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Star, MapPin, Plus } from "lucide-react";

const MotionDiv = motion.div;

const WishlistSection = ({ data }) => {
  const [collections, setCollections] = useState([
    { id: 1, name: "All Items", count: data.wishlist.length },
    { id: 2, name: "Nature Getaways", count: 3 },
    { id: 3, name: "City Stays", count: 2 },
    { id: 4, name: "Beach Trips", count: 2 },
    { id: 5, name: "Business Travel", count: 1 },
  ]);
  const [activeCollection, setActiveCollection] = useState(1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          My Wishlist
        </h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
          <Plus className="w-4 h-4" />
          New Collection
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {collections.map((collection) => (
          <button
            key={collection.id}
            onClick={() => setActiveCollection(collection.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl transition-all duration-300 ${
              activeCollection === collection.id
                ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600"
            }`}
          >
            {collection.name}
            <span className="ml-2 text-xs opacity-80">
              ({collection.count})
            </span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.wishlist.map((item, index) => (
          <MotionDiv
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <button className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:scale-110 transition-transform duration-300">
                <Heart className="w-5 h-5 fill-red-500 text-red-500" />
              </button>
              <div className="absolute top-4 left-4">
                <span className="px-2 py-1 bg-black/70 text-white text-xs rounded-full">
                  {item.collection}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 mb-3">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{item.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    ৳{item.price}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    /night
                  </span>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium">{item.rating}</span>
                </div>
              </div>
              <button className="w-full mt-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                Book Now
              </button>
            </div>
          </MotionDiv>
        ))}
      </div>
    </div>
  );
};

export default WishlistSection;
