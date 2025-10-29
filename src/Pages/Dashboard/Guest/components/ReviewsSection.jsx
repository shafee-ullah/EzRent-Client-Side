import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  MapPin,
  User,
  Calendar,
  Trash2,
  Edit3,
  Shield,
  AlertCircle,
} from "lucide-react";
import { AuthContext } from "../../../../Context/AuthContext";
import { deleteReview, getGuestReviews } from "../../../../redux/reviewSlice";
import { Link } from "react-router";

const ReviewSection = () => {
  const { user } = React.useContext(AuthContext);
  const email = user?.email;
  const dispatch = useDispatch();
  const { items: reviews, loading } = useSelector((state) => state.reviews);
  const [loadingStates, setLoadingStates] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    if (email) {
      dispatch(getGuestReviews(email));
    }
  }, [dispatch, email]);

  const handleDelete = async (reviewId) => {
    setLoadingStates((prev) => ({ ...prev, [reviewId]: "deleting" }));
    try {
      await dispatch(deleteReview(reviewId));
      setDeleteConfirm(null);
      dispatch(getGuestReviews(email));
    } catch (error) {
      console.error("Error deleting review:", error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [reviewId]: null }));
    }
  };

  const StarRating = ({ rating }) => (
    <div className="flex items-center gap-1 flex-wrap">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${star <= rating
              ? "fill-amber-500 text-amber-500"
              : "text-gray-300 dark:text-gray-600"
            }`}
        />
      ))}
      <span className="ml-1 text-sm font-medium text-gray-600 dark:text-gray-400">
        {rating}.0
      </span>
    </div>
  );

  const LoadingSpinner = ({ size = "w-4 h-4" }) => (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={`${size} border-2 border-current border-t-transparent rounded-full`}
    />
  );

  const ReviewCard = ({ review }) => {
    const {
      comment,
      date,
      rating,
      reviewCardImg,
      reviewCardLocation,
      reviewCardName,
      userEmail,
      userImage,
      userInitials,
      reviewCardId,
      userName,
      verified,
      _id,
    } = review;

    const isLoading = loadingStates[_id];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-lg transition-all duration-300"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          {/* User Info Section */}
          <div className="flex-shrink-0 flex justify-center sm:justify-start">
            <div className="relative">
              {userImage ? (
                <img
                  src={userImage}
                  alt={userName}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-200 dark:border-emerald-800"
                />
              ) : (
                <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-500 text-white font-bold text-lg shadow-lg">
                  {userInitials}
                </div>
              )}
              {verified && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800">
                  <Shield className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
          </div>

          {/* Review Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2">
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg truncate">
                    {userName}
                  </h3>
                  {!verified && (
                    <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-full text-xs font-medium flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Pending
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 flex-wrap">
                  <User className="w-4 h-4" />
                  <span className="truncate">{userEmail}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                {new Date(date).toLocaleDateString()}
              </div>
            </div>

            {/* Rating */}
            <div className="mb-4">
              <StarRating rating={rating} />
            </div>

            {/* Comment */}
            <div className="mb-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed break-words">
                {comment}
              </p>
            </div>

            {/* Property Info */}
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl p-4 border border-emerald-200 dark:border-emerald-800 mb-4">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
                {reviewCardImg && (
                  <img
                    src={reviewCardImg}
                    alt={reviewCardName}
                    className="w-12 h-12 rounded-xl object-cover border border-gray-200 dark:border-gray-700"
                  />
                )}
                <div className="flex-1 min-w-0 text-center sm:text-left">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 truncate">
                    {reviewCardName}
                  </h4>
                  <div className="flex items-center justify-center sm:justify-start gap-1 text-sm text-gray-600 dark:text-gray-400 flex-wrap">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{reviewCardLocation}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <motion.button
                onClick={() => setDeleteConfirm(_id)}
                disabled={isLoading}
                whileHover={!isLoading ? { scale: 1.05 } : {}}
                whileTap={!isLoading ? { scale: 0.95 } : {}}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-2xl font-semibold text-sm bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </motion.button>

              <Link
                to={`/FeaturepropertiesDitels/${reviewCardId}`}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-2xl font-semibold text-sm bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
              >
                <Edit3 className="w-4 h-4" />
                View Properties
              </Link>
            </div>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
              {deleteConfirm === _id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
                  onClick={() => setDeleteConfirm(null)}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-sm border border-gray-200 dark:border-gray-700"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Trash2 className="w-8 h-8 text-red-600 dark:text-red-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Delete Review?
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Are you sure you want to delete this review? This action
                        cannot be undone.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="flex-1 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleDelete(_id)}
                          disabled={isLoading}
                          className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium hover:from-red-600 hover:to-orange-600 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                        >
                          {isLoading === "deleting" && <LoadingSpinner />}
                          {isLoading === "deleting" ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50/50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-emerald-900/10 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center h-64 text-center">
              <LoadingSpinner size="w-12 h-12" />
              <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">
                Loading your reviews...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!reviews?.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50/50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-emerald-900/10 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 text-center"
          >
            <div className="py-16">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                No Reviews Yet
              </h3>
              <p className="text-gray-500 dark:text-gray-500 max-w-md mx-auto">
                You haven't submitted any reviews yet. Start sharing your
                experiences!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-emerald-900/10 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 shadow-lg mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 text-center sm:text-left">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-1">
                My Reviews
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
                Manage and view all your submitted reviews
              </p>
            </div>
            <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-2 rounded-2xl font-semibold shadow-lg inline-block">
              {reviews.length} Review{reviews.length !== 1 ? "s" : ""}
            </div>
          </div>
        </motion.div>

        <div className="space-y-6">
          <AnimatePresence>
            {reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
