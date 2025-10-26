// ReviewsModerationSection.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  MapPin,
  User,
  Shield,
  Calendar,
  CheckCircle,
  XCircle,
  Flag,
  MoreVertical,
  Loader,
  AlertTriangle
} from "lucide-react";
import { deleteReview, getAllReviews } from "../../../../redux/reviewSlice";

const ReviewsModerationSection = () => {
  const dispatch = useDispatch();
  const { items: reviews, loading, error } = useSelector(
    (state) => state.reviews
  );
  const [loadingStates, setLoadingStates] = useState({});
  const [selectedReview, setSelectedReview] = useState(null);

  console.log("all review", reviews);

  useEffect(() => {
    dispatch(getAllReviews());
  }, [dispatch]);



  const handleReject = async (reviewId) => {
    setLoadingStates(prev => ({ ...prev, [reviewId]: 'rejecting' }));
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await dispatch(deleteReview(reviewId))
      // Add your reject logic here
      console.log("Rejecting review:", reviewId);
    } catch (error) {
      console.error("Error rejecting review:", error);
    } finally {
      setLoadingStates(prev => ({ ...prev, [reviewId]: null }));
    }
  };

  const handleFlag = async (reviewId) => {
    setLoadingStates(prev => ({ ...prev, [reviewId]: 'flagging' }));
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Add your flag logic here
      console.log("Flagging review:", reviewId);
    } catch (error) {
      console.error("Error flagging review:", error);
    } finally {
      setLoadingStates(prev => ({ ...prev, [reviewId]: null }));
    }
  };

  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center gap-1">
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
  };

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
      reviewCardId,
      reviewCardImg,
      reviewCardLocation,
      reviewCardName,
      userEmail,
      userImage,
      userInitials,
      userName,
      verified,
      _id
    } = review;

    const isLoading = loadingStates[_id];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-lg transition-all duration-300"
      >
        <div className="flex gap-4">
          {/* User Info Section */}
          <div className="flex-shrink-0">
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
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                    {userName}
                  </h3>
                  {!verified && (
                    <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-full text-xs font-medium flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Unverified
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <User className="w-4 h-4" />
                  <span>{userEmail}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  {new Date(date).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="mb-4">
              <StarRating rating={rating} />
            </div>

            {/* Comment */}
            <div className="mb-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {comment}
              </p>
            </div>

            {/* Property Info */}
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl p-4 border border-emerald-200 dark:border-emerald-800 mb-4">
              <div className="flex items-center gap-3">
                {reviewCardImg && (
                  <img
                    src={reviewCardImg}
                    alt={reviewCardName}
                    className="w-12 h-12 rounded-xl object-cover border border-gray-200 dark:border-gray-700"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                    {reviewCardName}
                  </h4>
                  <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{reviewCardLocation}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">

              <motion.button
                onClick={() => handleReject(_id)}
                disabled={isLoading}
                whileHover={!isLoading ? { scale: 1.05 } : {}}
                whileTap={!isLoading ? { scale: 0.95 } : {}}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-semibold text-sm transition-all duration-300 ${isLoading === 'rejecting'
                  ? "bg-gray-100 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl"
                  }`}
              >
                {isLoading === 'rejecting' ? (
                  <LoadingSpinner />
                ) : (
                  <XCircle className="w-4 h-4" />
                )}
                {isLoading === 'rejecting' ? "Rejecting..." : "Reject"}
              </motion.button>

              {/* <motion.button
                onClick={() => handleFlag(_id)}
                disabled={isLoading}
                whileHover={!isLoading ? { scale: 1.05 } : {}}
                whileTap={!isLoading ? { scale: 0.95 } : {}}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-semibold text-sm transition-all duration-300 ${isLoading === 'flagging'
                  ? "bg-gray-100 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl"
                  }`}
              >
                {isLoading === 'flagging' ? (
                  <LoadingSpinner />
                ) : (
                  <Flag className="w-4 h-4" />
                )}
                {isLoading === 'flagging' ? "Flagging..." : "Flag"}
              </motion.button> */}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <LoadingSpinner size="w-12 h-12" />
            <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">
              Loading reviews...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Error Loading Reviews
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-emerald-900/10 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold bg-clip-text  text-black dark:text-white mb-2">
                Content Moderation
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Review moderation system with flag management and approval workflows.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-2 rounded-2xl font-semibold shadow-lg">
                {reviews.length} Reviews
              </div>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="space-y-6">
            <AnimatePresence>
              {reviews.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-dashed border-gray-300 dark:border-gray-600"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <User className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    No Reviews Found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-500">
                    There are no reviews to moderate at the moment.
                  </p>
                </motion.div>
              ) : (
                reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReviewsModerationSection;