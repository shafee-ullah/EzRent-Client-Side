import React, { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadExperiences,
  submitRating,
  removeExperience,
} from "../../redux/experienceSlice";
import ExperienceCard from "./ExperienceCard";
import AddExperience from "./AddExperience";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { Plus, Loader, TrendingUp, Users, Star, Award, MapPinned, MapPin, Calendar } from "lucide-react";
import toast from "react-hot-toast";
import { AuthContext } from "../../Context/AuthContext";

// Sidebar Component
function Sidebar({ experiences }) {
  const totalExperiences = experiences.length;
  const avgRating = experiences.length > 0 
    ? (experiences.reduce((sum, exp) => sum + (exp.avgRating || 0), 0) / experiences.length).toFixed(1)
    : "0.0";
  
  const topRated = [...experiences]
    .filter(exp => exp.avgRating > 0)
    .sort((a, b) => b.avgRating - a.avgRating)
    .slice(0, 5);

  const destinations = experiences
    .filter(exp => exp.location)
    .reduce((acc, exp) => {
      acc[exp.location] = (acc[exp.location] || 0) + 1;
      return acc;
    }, {});
  
  const topDestinations = Object.entries(destinations)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="space-y-4">
      {/* Stats Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/20 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow-lg"
      >
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-600" />
          Community Stats
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-600" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Experiences</span>
            </div>
            <span className="font-bold text-emerald-600">{totalExperiences}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-600 fill-current" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Avg Rating</span>
            </div>
            <span className="font-bold text-amber-600">{avgRating}</span>
          </div>
        </div>
      </motion.div>

      {/* Top Rated Experiences */}
      {topRated.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="backdrop-blur-sm bg-gradient-to-br from-emerald-50/50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-emerald-900/10 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow-lg"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-600" />
            Top Rated
          </h3>
          <div className="space-y-3">
            {topRated.map((exp, index) => (
              <div
                key={exp._id}
                className="flex items-start gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                    {exp.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="w-3 h-3 text-amber-500 fill-current" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {exp.avgRating.toFixed(1)} ({exp.ratingsCount})
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Popular Destinations */}
      {topDestinations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="backdrop-blur-sm bg-gradient-to-br from-emerald-50/50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-emerald-900/10 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow-lg"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <MapPinned className="w-5 h-5 text-emerald-600" />
            Popular Destinations
          </h3>
          <div className="space-y-2">
            {topDestinations.map(([location, count]) => (
              <div
                key={location}
                className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                    {location}
                  </span>
                </div>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-full">
                  {count} {count === 1 ? 'post' : 'posts'}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Travel Tips */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="backdrop-blur-sm bg-gradient-to-br from-blue-50/50 via-white to-cyan-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/10 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow-lg"
      >
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          Travel Tips
        </h3>
        <div className="space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            💡 <strong>Peak Season:</strong> Plan ahead for popular destinations
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            📸 <strong>Photos:</strong> Capture memories at golden hour
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            🗺️ <strong>Local Culture:</strong> Research customs before visiting
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            🎒 <strong>Pack Smart:</strong> Less is more for easy travel
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function ExperienceFeed() {
  const { user } = use(AuthContext);
  const dispatch = useDispatch();
  const experiences = useSelector((s) => s.experience.items || []);
  const loading = useSelector((s) => s.experience.loading);
  const [isAddExperienceOpen, setIsAddExperienceOpen] = useState(false);

  const currentUserEmail = user?.email || JSON.parse(localStorage.getItem("currentUser") || "null")?.email || null;

  useEffect(() => {
    dispatch(loadExperiences());
  }, [dispatch]);

  const handleRate = async (id, value) => {
    const parsed = parseInt(value, 10);
    if (Number.isNaN(parsed) || parsed < 1 || parsed > 10) {
      toast.error("Please select a rating between 1 and 10");
      return;
    }

    let raterEmail = user?.email;
    if (!raterEmail) {
      const ls = JSON.parse(localStorage.getItem("currentUser") || "null");
      raterEmail = ls?.email || null;
    }

    if (!raterEmail) {
      const email = prompt("Enter your email to rate:");
      if (!email) {
        toast.error("Email required to rate");
        return;
      }
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ name: "Anonymous", email })
      );
      raterEmail = email;
    }

    try {
      await dispatch(
        submitRating({ id, payload: { raterEmail, value: parsed } })
      ).unwrap();
      toast.success("Thanks for rating! 🌟");
    } catch (err) {
      toast.error(err?.message || "Failed to rate");
    }
  };

  const handleDelete = async (id) => {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser") || "null"
    );
    if (!currentUser || !currentUser.email) {
      toast.error("You must provide the same email used to post to delete");
      return;
    }

    Swal.fire({
      title: "Delete Experience?",
      text: "Are you sure you want to delete this experience? This action cannot be undone.",
      icon: "warning",
      iconColor: "#f59e0b",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete It",
      cancelButtonText: "Cancel",
      background: "rgba(255, 255, 255, 0.8)",
      backdrop: `rgba(0, 0, 0, 0.4)`,
      customClass: {
        popup: "backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl",
        title: "text-xl font-bold text-gray-900",
        htmlContainer: "text-gray-600",
        confirmButton:
          "px-6 py-2 rounded-2xl font-semibold text-white bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 transition-all duration-300 mr-3",
        cancelButton:
          "px-6 py-2 rounded-2xl font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300",
      },
      buttonsStyling: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await dispatch(
            removeExperience({ id, payload: { email: currentUser.email } })
          ).unwrap();

          Swal.fire({
            title: "Deleted!",
            text: "Your experience has been successfully deleted.",
            icon: "success",
            iconColor: "#10b981",
            confirmButtonText: "OK",
            background: "rgba(255, 255, 255, 0.8)",
            customClass: {
              popup:
                "backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl",
              title: "text-xl font-bold text-gray-900",
              htmlContainer: "text-gray-600",
              confirmButton:
                "px-6 py-2 rounded-2xl font-semibold text-white bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 transition-all duration-300",
            },
            buttonsStyling: false,
          });
        } catch (error) {
          console.error("Delete experience error:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete experience. Please try again.",
            icon: "error",
            iconColor: "#ef4444",
            confirmButtonText: "OK",
            background: "rgba(255, 255, 255, 0.8)",
            customClass: {
              popup:
                "backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl",
              title: "text-xl font-bold text-gray-900",
              htmlContainer: "text-gray-600",
              confirmButton:
                "px-6 py-2 rounded-2xl font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300",
            },
            buttonsStyling: false,
          });
        }
      }
    });
  };

  return (
    <div className="min-h-screen  py-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-600 mb-4"
          >
            Guest Experiences
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 dark:text-gray-300 text-base sm:text-lg"
          >
            Discover inspiring travel stories from our community of adventurers
          </motion.p>
        </div>

        {/* Add Experience Button */}
        {user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center mt-6"
          >
            <motion.button
              onClick={() => setIsAddExperienceOpen(true)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 sm:gap-3 text-sm sm:text-base"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              Share Your Experience
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Main Content with Sidebar */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center gap-8">
          {/* Main Feed - Centered */}
          <div className="w-full max-w-3xl">
            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-12">
                <div className="flex items-center gap-3 text-emerald-600">
                  <Loader className="w-6 h-6 animate-spin" />
                  <span className="text-base sm:text-lg font-semibold">
                    Loading experiences...
                  </span>
                </div>
              </div>
            )}

            {/* Experiences Feed */}
            <div className="space-y-4">
              {experiences.map((exp) => (
                <ExperienceCard
                  key={String(exp._id)}
                  exp={exp}
                  onRate={handleRate}
                  onDelete={handleDelete}
                  currentUserEmail={currentUserEmail}
                />
              ))}
            </div>

            {/* Empty State */}
            {!loading && experiences.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="backdrop-blur-sm bg-gradient-to-br from-emerald-50/50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-emerald-900/10 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 sm:p-12">
                  <div className="text-5xl sm:text-6xl mb-4">🌍</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    No Experiences Yet
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6">
                    Be the first to share your travel adventure with our community!
                  </p>
                  {user && (
                    <motion.button
                      onClick={() => setIsAddExperienceOpen(true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-5 sm:px-6 py-2 sm:py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
                    >
                      Share Your Story
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar - Hidden on mobile, visible on lg screens, positioned on right */}
          <aside className="hidden lg:block w-80 flex-shrink-0 sticky top-4 self-start">
            <Sidebar experiences={experiences} />
          </aside>
        </div>
      </div>

      {/* Add Experience Modal */}
      <AddExperience
        isOpen={isAddExperienceOpen}
        onClose={() => setIsAddExperienceOpen(false)}
      />
    </div>
  );
}