import React, { useState, useRef, use } from "react";
import { Shield, CreditCard, ChevronDown, User2, Camera, Edit3, Mail, Calendar, Award, MapPin, Phone, Globe } from "lucide-react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../../Context/AuthContext";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const SettingsSection = () => {
  const { user: authUser, updateUserProfile } = use(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const { user } = useSelector((state) => state.products);
 
  console.log(authUser);


  // open profile edit modal
  const handleEditProfile = () => {
    setIsModalOpen(true);
  };

  // close profile edit modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPreviewImage(null);
  };


  // handle image selection and preview
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };



  // profile editing form submission
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const imageFile = formData.get("profileImage");

    let imageUrl = authUser?.photoURL || "";

    try {
      if (imageFile && imageFile.size > 0) {
        // Upload to ImgBB
        const imgbbKey = "472a4f35f88299fe3e3320a210542e39";
        const uploadFormData = new FormData();
        uploadFormData.append("image", imageFile);

        const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
          method: "POST",
          body: uploadFormData,
        });

        const result = await res.json();
        if (result.success) {
          imageUrl = result.data.display_url;
        } else {
          toast.error("Image upload failed!");
          return;
        }
      }

      //  Update Firebase profile
      await updateUserProfile(name, imageUrl);

      toast.success("Profile updated successfully!");

      //  Reset form after success
      e.target.reset();
      setPreviewImage(null);
      handleCloseModal();

    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };



  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 rounded-2xl overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        <div className="relative p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Profile Image */}
            <div className="relative group">
              {authUser?.photoURL ? (
                <img
                  src={authUser.photoURL}
                  alt="Profile"
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl border-4 border-white/30 object-cover shadow-xl"
                />
              ) : (
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl border-4 border-white/30 bg-white/20 flex items-center justify-center shadow-xl">
                  <User2 className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                </div>
              )}
              <button
                onClick={handleEditProfile}
                className="absolute -bottom-2 -right-2 bg-white text-emerald-600 p-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                title="Edit Profile"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center sm:text-left text-white">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">{authUser?.displayName || "Host User"}</h2>
              <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-4 mb-4">
                <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm font-medium">Verified Host</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  <Award className="w-4 h-4" />
                  <span className="text-sm font-medium capitalize">{user?.role || "Host"}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-emerald-50">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{user?.email}</span>
                </div>
                {/* <div className="flex items-center justify-center sm:justify-start gap-2 text-emerald-50">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Hosting since {new Date(user?.joinDate).getFullYear()}</span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Personal Information Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Details */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <User2 className="w-5 h-5 text-emerald-500" />
            Account Details
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <User2 className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Full Name</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{authUser?.displayName || "Host User"}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Email Address</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white break-all">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <Shield className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Account Type</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">{user?.role || "Host"}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Activity Stats */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-500" />
            Account Status
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Verification</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Account verified</p>
                </div>
              </div>
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/40 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Hosting Since</p>
                  {/* <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(user?.joinDate).toLocaleDateString()}</p> */}
                   <p className="text-xs text-gray-500 dark:text-gray-400">October</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/40 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Status</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Active Host</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm"
      >
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={handleEditProfile}
            className="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl hover:shadow-md transition-all duration-300 group border border-emerald-100 dark:border-emerald-800"
          >
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Edit3 className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900 dark:text-white text-sm">Edit Profile</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Update your info</p>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl hover:shadow-md transition-all duration-300 group border border-blue-100 dark:border-blue-800">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900 dark:text-white text-sm">Security</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Manage settings</p>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl hover:shadow-md transition-all duration-300 group border border-purple-100 dark:border-purple-800">
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900 dark:text-white text-sm">Payments</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Payment methods</p>
            </div>
          </button>
        </div>
      </motion.div>


      {/* Edit Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Edit Profile
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProfile}>
              {/* Profile Image Upload */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative group cursor-pointer" onClick={handleImageClick}>
                  {previewImage || authUser?.photoURL ? (
                    <img
                      src={previewImage || authUser.photoURL}
                      alt="Profile preview"
                      className="w-24 h-24 rounded-full border-4 border-emerald-500 object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full border-4 border-emerald-500 bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                      <User2 className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  name="profileImage"
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={handleImageClick}
                  className="mt-2 text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
                >
                  Change photo
                </button>
              </div>

              {/* Name and Email Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={authUser?.displayName}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsSection;