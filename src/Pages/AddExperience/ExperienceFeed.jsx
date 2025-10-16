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
import { Plus, Loader } from "lucide-react";
import toast from "react-hot-toast";
import { AuthContext } from "../../Context/AuthContext";

export default function ExperienceFeed() {

  const { user } = use(AuthContext);
  const dispatch = useDispatch();
  const experiences = useSelector((s) => s.experience.items || []);
  const loading = useSelector((s) => s.experience.loading);
  const [isAddExperienceOpen, setIsAddExperienceOpen] = useState(false);

  useEffect(() => {
    dispatch(loadExperiences());
  }, [dispatch]);

  const handleRate = async (id, value) => {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser") || "null"
    );
    if (!currentUser || !currentUser.email) {
      const email = prompt("Enter your email to rate:");
      if (!email) {
        toast.error("Email required to rate");
        return;
      }
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ name: "Anonymous", email })
      );
    }

    const raterEmail = (JSON.parse(localStorage.getItem("currentUser")) || {})
      .email;
    try {
      await dispatch(
        submitRating({ id, payload: { raterEmail, value } })
      ).unwrap();
      toast.success("Thanks for rating! 🌟");
    } catch (err) {
      toast.error(err?.message || "Failed to rate");
    }
  };
  //   const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  //   if (!currentUser || !currentUser.email) {
  //     toast.error("You must provide the same email used to post to delete");
  //     return;
  //   }

  //   if (!window.confirm("Are you sure you want to delete this experience?")) {
  //     return;
  //   }

  //   try {
  //     await dispatch(removeExperience({ id, payload: { email: currentUser.email } })).unwrap();
  //     toast.success("Experience deleted successfully");
  //   } catch (err) {
  //     toast.error("Delete failed");
  //   }
  // };

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
      iconColor: "#f59e0b", // amber-500
      showCancelButton: true,
      confirmButtonText: "Yes, Delete It",
      cancelButtonText: "Cancel",
      background: "rgba(255, 255, 255, 0.8)",
      backdrop: `
        rgba(0, 0, 0, 0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `,
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
      showClass: {
        popup: "animate__animated animate__fadeIn animate__faster",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOut animate__faster",
      },
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
            showClass: {
              popup: "animate__animated animate__fadeIn animate__faster",
            },
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

  const openAddExperience = () => {
    setIsAddExperienceOpen(true);
  };

  const closeAddExperience = () => {
    setIsAddExperienceOpen(false);
  };

  return (
    <div className="max-w-11/12 mx-auto pt-6 pb-24">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-600 mb-4"
        >
          Guest Experiences
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto"
        >
          Discover inspiring travel stories from our community of adventurers
        </motion.p>
      </div>

      {/* Add Experience Button */}
      {
        user && <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center mb-8"
          >
            <motion.button
              onClick={openAddExperience}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3"
            >
              <Plus className="w-5 h-5" />
              Share Your Experience
            </motion.button>
          </motion.div></>
      }

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="flex items-center gap-3 text-emerald-600">
            <Loader className="w-6 h-6 animate-spin" />
            <span className="text-lg font-semibold">
              Loading experiences...
            </span>
          </div>
        </div>
      )}

      {/* Experiences Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {experiences.map((exp, index) => (
          <motion.div
            key={String(exp._id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ExperienceCard
              exp={exp}
              onRate={handleRate}
              onDelete={handleDelete}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {!loading && experiences.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="backdrop-blur-sm bg-gradient-to-br from-emerald-50/50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-emerald-900/10 border border-gray-200 dark:border-gray-700 rounded-3xl p-12 max-w-2xl mx-auto">
            <div className="text-6xl mb-4">🌍</div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              No Experiences Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Be the first to share your travel adventure with our community!
            </p>
            <motion.button
              onClick={openAddExperience}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Share Your Story
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Add Experience Modal */}
      <AddExperience
        isOpen={isAddExperienceOpen}
        onClose={closeAddExperience}
      />
    </div>
  );
}
