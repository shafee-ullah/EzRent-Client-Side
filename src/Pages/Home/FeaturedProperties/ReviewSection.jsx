import React, { use, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaUserCircle, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../Context/AuthContext";
import Loading from "../../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { addReview, deleteReview, fetchReviews, updateReview } from "../../../redux/reviewSlice";



const ReviewsSection = ({ data }) => {


    const { user } = use(AuthContext);
    // console.log(user);
    // console.log("this is review data", data, error);
    // const [reviews, setReviews] = useState(initialReviews);
    const [showAddReview, setShowAddReview] = useState(false);
    const [newReview, setNewReview] = useState({
        rating: 5,
        comment: "",
        userName: "",
    });
    const [editingReview, setEditingReview] = useState(null);


    const dispatch = useDispatch();
    const { items: reviews, loading } = useSelector((state) => state.reviews);

    console.log("all review", reviews);
    console.log("all review card ", data?._id);
    const cardId = data?._id;
    console.log('this si crer', cardId);


    useEffect(() => {
        if (data?._id) {
            dispatch(fetchReviews(data._id));
        }
    }, [dispatch, data?._id]);


    const handleAddReview = async () => {
        if (!newReview.comment.trim()) {
            toast.error("Please write a review comment");
            return;
        }

        const review = {
            userName: user?.displayName || "Anonymous Guest",
            userInitials: (newReview.userName || "AG")
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase(),
            rating: newReview.rating,
            comment: newReview.comment,
            date: new Date().toISOString().split("T")[0],
            verified: false,
            reviewCardId: data._id,
            reviewCardImg: data.image,
            reviewCardName: data.name,
            reviewCardLocation: data.Location,
            userEmail: user?.email,
            userImage: user?.photoURL,
        };

        await dispatch(addReview(review));
        await dispatch(fetchReviews(data._id));
        setNewReview({ rating: 5, comment: "", userName: "" });
        setShowAddReview(false);
    };


    const handleEditReview = (review) => {
        console.log("editingReview", review);
        setEditingReview(review);
        setNewReview({
            rating: review.rating,
            comment: review.comment,
            userName: review.userName,
        });
        setShowAddReview(true);
    };



    // Update
    const handleUpdateReview = async () => {
        if (!newReview.comment.trim()) {
            toast.error("Please write a review comment");
            return;
        }

        await dispatch(updateReview({
            id: editingReview._id,
            updatedData: {
                rating: newReview.rating,
                comment: newReview.comment,
                userName: newReview.userName || "Anonymous Guest",
                userInitials: (newReview.userName || "AG")
                    .split(" ")
                    .map(n => n[0])
                    .join("")
                    .toUpperCase(),
            },
        }));

        // Refetch reviews after update
        await dispatch(fetchReviews(data._id));

        setNewReview({ rating: 5, comment: "", userName: "" });
        setEditingReview(null);
        setShowAddReview(false);
    };


    // Delete
    const handleDeleteReview = async (reviewId) => {
        await dispatch(deleteReview(reviewId));
    };

    const averageRating =
        reviews?.length > 0
            ? (
                reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
            ).toFixed(1)
            : "0.0";

    const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => ({
        stars,
        count: reviews.filter((review) => review.rating === stars).length,
        percentage:
            (reviews.filter((review) => review.rating === stars).length /
                reviews.length) *
            100,
    }));

    const StarRating = ({ rating, onRatingChange, editable = false }) => (
        <div className="flex items-center gap-1 flex-wrap">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type={editable ? "button" : "div"}
                    onClick={() => editable && onRatingChange(star)}
                    className={`transition-all duration-200 ${editable ? "hover:scale-110 cursor-pointer" : "cursor-default"
                        } ${star <= rating
                            ? "text-amber-500"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                >
                    <FaStar className="w-5 h-5 fill-current" />
                </button>
            ))}
        </div>
    );

    if (loading) {
        return <Loading />
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-8 px-4 sm:px-6 md:px-8"
        >
            {/* Reviews Header */}
            <div className="bg-white/80 max-w-7xl mx-auto dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-lg mb-6">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 flex-wrap">
                    <div className="w-full lg:w-auto">
                        <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 mb-2">
                            Guest Reviews
                        </h2>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-wrap">
                            <div className="text-center sm:text-left">
                                <div className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600">
                                    {averageRating}
                                </div>
                                <div className="flex items-center gap-1 justify-center sm:justify-start">
                                    <StarRating rating={parseFloat(averageRating)} />
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                                    {reviews?.length} reviews
                                </p>
                            </div>

                            <div className="flex-1 min-w-[200px] w-full sm:w-auto">
                                {ratingDistribution.map(({ stars, count, percentage }) => (
                                    <div
                                        key={stars}
                                        className="flex items-center gap-2 text-sm mb-1"
                                    >
                                        <span className="w-8 text-gray-600 dark:text-gray-400">
                                            {stars}
                                        </span>
                                        <FaStar className="w-3 h-3 text-amber-500" />
                                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                            <div
                                                className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full"
                                                style={{ width: `${percentage}%` }}
                                            ></div>
                                        </div>
                                        <span className="w-8 text-gray-600 dark:text-gray-400 text-right">
                                            {count}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            setShowAddReview(!showAddReview);
                            setEditingReview(null);
                            setNewReview({ rating: 5, comment: "", userName: "" });
                        }}
                        className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-5 py-3 rounded-2xl font-semibold shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        <FaPlus className="w-4 h-4" />
                        {showAddReview ? "Cancel Review" : "Add Review"}
                    </motion.button>
                </div>
            </div>

            {/* Add Review Form */}
            <AnimatePresence>
                {showAddReview && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="max-w-7xl mx-auto bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border border-blue-200 dark:border-blue-800 p-4 sm:p-6 mb-6 overflow-hidden"
                    >
                        <h3 className="text-lg sm:text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
                            {editingReview ? "Edit Your Review" : "Write a Review"}
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Your Name (Optional)
                                </label>
                                <input
                                    type="text"
                                    value={newReview.userName}
                                    onChange={(e) =>
                                        setNewReview({ ...newReview, userName: e.target.value })
                                    }
                                    placeholder="Enter your name"
                                    className="w-full px-4 py-2 rounded-2xl border border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Your Rating
                                </label>
                                <StarRating
                                    rating={newReview.rating}
                                    onRatingChange={(rating) =>
                                        setNewReview({ ...newReview, rating })
                                    }
                                    editable={true}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Your Review
                                </label>
                                <textarea
                                    value={newReview.comment}
                                    onChange={(e) =>
                                        setNewReview({ ...newReview, comment: e.target.value })
                                    }
                                    placeholder="Share your experience with this property..."
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-2xl border border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={editingReview ? handleUpdateReview : handleAddReview}
                                    className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-6 py-2 rounded-2xl font-semibold shadow-lg transition-all duration-300"
                                >
                                    {editingReview ? "Update Review" : "Submit Review"}
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        setShowAddReview(false);
                                        setEditingReview(null);
                                        setNewReview({ rating: 5, comment: "", userName: "" });
                                    }}
                                    className="w-full sm:w-auto bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-6 py-2 rounded-2xl font-semibold shadow-lg transition-all duration-300"
                                >
                                    Cancel
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Reviews List */}
            <div className="space-y-4 max-w-7xl mx-auto mb-10">
                <AnimatePresence>
                    {reviews.map((review, index) => (
                        <motion.div
                            key={review._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                                <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex items-center justify-center text-white font-bold text-base sm:text-lg bg-gradient-to-r from-amber-500 to-orange-500">
                                        {review.userImage ? (
                                            <img
                                                src={review.userImage}
                                                alt={review.userName || "User"}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            review.userInitials
                                        )}
                                    </div>

                                    <div>
                                        <div className="flex items-center flex-wrap gap-2">
                                            <h4 className="font-semibold text-gray-800 dark:text-white">
                                                {review.userName}
                                            </h4>

                                        </div>
                                        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                            <StarRating rating={review.rating} />
                                            <span>•</span>
                                            <span>{review.date}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => handleEditReview(review)}
                                        className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-2xl transition-all duration-300"
                                    >
                                        <FaEdit className="w-4 h-4" />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => handleDeleteReview(review._id)}
                                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-2xl transition-all duration-300"
                                    >
                                        <FaTrash className="w-4 h-4" />
                                    </motion.button>
                                </div>
                            </div>

                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                                {review.comment}
                            </p>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {reviews.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-10 sm:py-12 bg-white/50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-300 dark:border-gray-600"
                    >
                        <FaUserCircle className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                            No Reviews Yet
                        </h3>
                        <p className="text-gray-500 dark:text-gray-500 mb-4 text-sm sm:text-base">
                            Be the first to share your experience!
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowAddReview(true)}
                            className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-5 py-3 rounded-2xl font-semibold shadow-lg transition-all duration-300"
                        >
                            Write First Review
                        </motion.button>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default ReviewsSection;
