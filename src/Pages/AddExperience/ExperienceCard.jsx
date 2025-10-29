import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Star, Trash2, X, ChevronLeft, ChevronRight } from "lucide-react";
import RatingInput from "./RatingInput";

// Image Lightbox Component
function ImageLightbox({ images, initialIndex, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrev();
            }}
            className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </>
      )}

      <motion.img
        key={currentIndex}
        src={images[currentIndex]}
        alt={`Photo ${currentIndex + 1}`}
        className="max-w-full max-h-[90vh] object-contain"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
      />

      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
}

export default function ExperienceCard({ exp, onRate, onDelete, currentUserEmail }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Check if current user is the owner
  const isOwner = currentUserEmail && exp.userEmail === currentUserEmail;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-sm  bg-white/80 dark:bg-gray-800/20 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 mb-4"
      >
        {/* Header */}
        <div className="p-4 sm:p-6 pb-3 sm:pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center text-white font-semibold text-base sm:text-lg">
                {exp.userName?.charAt(0)?.toUpperCase() || "U"}
              </div> */}
              <div>
                <p className="font-semibold text-sm sm:text-base text-gray-800 dark:text-gray-200">
                  {exp.userName}
                </p>
                {exp.location && (
                  <div className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-3 h-3 mr-1" />
                    {exp.location}
                  </div>
                )}
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 sm:px-3 py-1 rounded-full">
                <Star className="w-3 h-3 fill-current" />
                <span className="text-xs sm:text-sm font-bold">
                  {exp.avgRating ? Number(exp.avgRating).toFixed(1) : "0.0"}
                </span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                ({exp.ratingsCount || 0} ratings)
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 sm:px-6 pb-3 sm:pb-4">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
            {exp.title}
          </h3>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
            {exp.description}
          </p>
        </div>

        {/* Photos - Full Width Grid */}
        {exp.photos && exp.photos.length > 0 && (
          <div className={`w-full ${
            exp.photos.length === 1 ? "" : 
            exp.photos.length === 2 ? "grid grid-cols-2" :
            exp.photos.length === 3 ? "grid grid-cols-3" :
            "grid grid-cols-2"
          }`}>
            {exp.photos.slice(0, 4).map((photo, i) => (
              <motion.div
                key={i}
                className="relative overflow-hidden cursor-pointer group"
                style={{
                  aspectRatio: exp.photos.length === 1 ? "16/9" : "1/1"
                }}
                onClick={() => openLightbox(i)}
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={photo}
                  alt={`Photo ${i + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                
                {i === 3 && exp.photos.length > 4 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white text-2xl sm:text-3xl font-bold">
                      +{exp.photos.length - 4}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="p-4 sm:p-6 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <RatingInput experience={exp} onRate={onRate} />
            
            {isOwner && (
              <motion.button
                onClick={() => onDelete && onDelete(exp._id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-300"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {lightboxOpen && (
          <ImageLightbox
            images={exp.photos}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}