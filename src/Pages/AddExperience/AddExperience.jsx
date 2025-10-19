import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { addExperience } from "../../redux/experienceSlice";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, MapPin, FileText, User, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import { AuthContext } from "../../Context/AuthContext";

export default function AddExperience({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext) || {};
  const currentUser =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("currentUser") || "null")
      : null;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [photos, setPhotos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handlePhotoChange = (e) => {
    setPhotos(Array.from(e.target.files));
  };

  const uploadPhotos = async () => {
    if (photos.length === 0) return [];
    const formData = new FormData();
    photos.forEach((file) => formData.append("photos", file));

 
    try {
      setUploading(true);
      const res = await axios.post(
        "https://ez-rent-server-side-seven.vercel.app/api/experiences/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return res.data.urls;
    } catch (err) {
      console.error("Upload failed", err);
      toast.error("Photo upload failed");
      return [];
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      // Resolve identity before uploading to avoid wasted uploads on validation failure
      const resolvedName =
        user?.displayName ||
        currentUser?.name ||
        JSON.parse(localStorage.getItem("currentUser") || "null")?.name;
      const resolvedEmail =
        user?.email ||
        currentUser?.email ||
        JSON.parse(localStorage.getItem("currentUser") || "null")?.email;

      if (!resolvedName || !resolvedEmail) {
        toast.error("Please sign in or set your name and email to post.");
        setSubmitting(false);
        return;
      }

      const uploadedUrls = await uploadPhotos();

      const payload = {
        name: resolvedName,
        email: resolvedEmail,
        title,
        description,
        location,
        photos: uploadedUrls,
      };

      console.log("Sending payload:", payload);
      await dispatch(addExperience(payload)).unwrap();

      setTitle("");
      setDescription("");
      setLocation("");
      setPhotos([]);
      toast.success("Experience posted successfully! 🌟");
      onClose(); // Close modal after successful submission
    } catch (err) {
      console.error(err);
      toast.error("Failed to post experience");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <div
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="backdrop-blur-sm bg-gradient-to-br from-emerald-50/50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-emerald-900/10 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg p-8 relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-600">
                Share Your Travel Experience
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Inspire others with your amazing journey
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    <FileText className="w-4 h-4 mr-2" />
                    Experience Title
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300"
                    placeholder="Give your experience a captivating title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    <User className="w-4 h-4 mr-2" />
                    Your Story
                  </label>
                  <textarea
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300"
                    rows="5"
                    placeholder="Share the details of your adventure..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                {/* Location + Photos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                      <MapPin className="w-4 h-4 mr-2" />
                      Location
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300"
                      placeholder="Where did you go?"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                      <Camera className="w-4 h-4 mr-2" />
                      Upload Photos
                    </label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="w-full px-2 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-gradient-to-r file:from-blue-500 file:to-cyan-500 file:text-white file:text-sm file:font-semibold transition-all duration-300"
                    />
                    {photos.length > 0 && (
                      <p className="text-sm text-emerald-600 dark:text-emerald-400">
                        {photos.length} file(s) selected
                      </p>
                    )}
                  </div>
                </div>

                {/* Photo Preview */}
                {photos.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4"
                  >
                    {photos.map((file, i) => (
                      <div key={i} className="relative group">
                        <img
                          src={URL.createObjectURL(file)}
                          alt="Preview"
                          className="w-full h-24 object-cover rounded-xl border-2 border-emerald-200 dark:border-emerald-800 group-hover:scale-105 transition-all duration-300"
                        />
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                  <motion.button
                    type="submit"
                    disabled={uploading || submitting}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Uploading Photos...
                      </>
                    ) : submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Posting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Post Experience
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
