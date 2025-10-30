import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  MapPin,
  Calendar,
  User,
  MessageCircle,
  Home,
  Mail,
  Shield
} from "lucide-react";
import { getReviewsByEmail } from "../../../../redux/reviewSlice";
import { AuthContext } from "../../../../Context/AuthContext";

const ReviewsSection = () => {
  const dispatch = useDispatch();
  const { user } = React.useContext(AuthContext);

  const { items: reviews, loading, error } = useSelector(
    (state) => state.reviews
  );

  useEffect(() => {
    if (user?.email) {
      dispatch(getReviewsByEmail(user.email));
    }
  }, [dispatch, user]);

  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${star <= rating
              ? "fill-amber-500 text-amber-500"
              : "text-gray-300 dark:text-gray-600"
              }`}
          />
        ))}
        <span className="ml-2 text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600">
          {rating}.0
        </span>
      </div>
    );
  };

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

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-700 p-3 sm:p-4 md:p-6 shadow-sm hover:shadow-lg transition-all duration-300"
      >
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
          {/* Property Info Section */}
          <div className="flex-shrink-0 w-full md:w-48">
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-emerald-200 dark:border-emerald-800">
              {reviewCardImg ? (
                <img
                  src={reviewCardImg}
                  alt={reviewCardName}
                  className="w-full h-24 sm:h-32 rounded-lg sm:rounded-xl object-cover border border-gray-200 dark:border-gray-700 mb-2 sm:mb-3"
                />
              ) : (
                <div className="w-full h-24 sm:h-32 rounded-lg sm:rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center mb-2 sm:mb-3">
                  <Home className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 dark:text-gray-500" />
                </div>
              )}

              <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base md:text-lg mb-1 sm:mb-2 line-clamp-2">
                {reviewCardName}
              </h3>

              <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="truncate">{reviewCardLocation}</span>
              </div>
            </div>
          </div>

          {/* Review Content */}
          <div className="flex-1 min-w-0">
            {/* Header with User Info and Date */}
            <div className="flex flex-col gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative flex-shrink-0">
                  {userImage ? (
                    <img
                      src={userImage}
                      alt={userName}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl object-cover border-2 border-emerald-200 dark:border-emerald-800"
                    />
                  ) : (
                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-bold text-base sm:text-lg shadow-lg">
                      {userInitials?.charAt(0) || "U"}
                    </div>
                  )}
                  {verified && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800">
                      <Shield className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base md:text-lg truncate">
                    {userName}
                  </h4>
                  <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5 sm:mt-1">
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="truncate">{userEmail}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/50 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-2xl self-start">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="whitespace-nowrap">{new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}</span>
              </div>
            </div>

            {/* Rating Display */}
            <div className="mb-4">
              <StarRating rating={rating} />
            </div>

            {/* Comment Section */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-2 sm:gap-3">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 dark:text-blue-400 mt-1 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2 text-xs sm:text-sm">
                    My Property Review Comment
                  </h5>
                  <p className="text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed break-words">
                    {comment}
                  </p>
                </div>
              </div>
            </div>

            {/* Review ID (for reference) */}
            <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
              <span className="truncate">Review ID: {_id.slice(-8)}</span>
              <span className="truncate">Property ID: {reviewCardId?.slice(-8)}</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  // Calculate average rating
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  // Count ratings
  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach(review => {
    ratingCounts[review.rating]++;
  });

  if (loading) {
    return (
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center h-48 sm:h-64">
          <div className="text-center px-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-dashed rounded-full animate-spin border-emerald-500 dark:border-emerald-400 mx-auto mb-3 sm:mb-4"></div>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">
              Loading your reviews...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-200 dark:border-gray-700">
        <div className="text-center py-8 sm:py-12 md:py-16 px-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-100 dark:bg-red-900/30 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <User className="w-8 h-8 sm:w-10 sm:h-10 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Error Loading Reviews
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 break-words">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-200 dark:border-gray-700 shadow-lg"
      >
        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400 mb-2">
              Your Reviews & Ratings
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base md:text-lg">
              Reviews you have submitted as a host
            </p>
          </div>

          {/* Stats Card */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-semibold shadow-lg text-center flex-1 min-w-[120px] sm:flex-initial">
              <div className="text-xl sm:text-2xl font-bold">{reviews.length}</div>
              <div className="text-xs sm:text-sm opacity-90">Total Reviews</div>
            </div>

            {reviews.length > 0 && (
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-semibold shadow-lg text-center flex-1 min-w-[120px] sm:flex-initial">
                <div className="text-xl sm:text-2xl font-bold">{averageRating}</div>
                <div className="text-xs sm:text-sm opacity-90">Avg Rating</div>
              </div>
            )}
          </div>
        </div>

        {/* Rating Distribution */}
        {reviews.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-200 dark:border-purple-800 mb-6 sm:mb-8"
          >
            <h3 className="text-base sm:text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 mb-3 sm:mb-4">
              Rating Distribution
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
              {[5, 4, 3, 2, 1].map((stars) => (
                <div key={stars} className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3 h-3 ${star <= stars
                          ? "fill-amber-500 text-amber-500"
                          : "text-gray-300 dark:text-gray-600"
                          }`}
                      />
                    ))}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {ratingCounts[stars]}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {stars} star{stars !== 1 ? 's' : ''}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Reviews List */}
        <div className="space-y-4 sm:space-y-6">
          <AnimatePresence>
            {reviews.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 sm:py-12 md:py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl border border-dashed border-gray-300 dark:border-gray-600 px-4"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  No Reviews Yet
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-500 max-w-md mx-auto px-2">
                  You haven't submitted any reviews yet. Your reviews will appear here once you start reviewing properties.
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
  );
};

export default ReviewsSection;
