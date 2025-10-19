import React, { useState, useRef, use } from "react";
import { Shield, CreditCard, ChevronDown, User2, Camera, Edit3 } from "lucide-react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../../Context/AuthContext";

const SettingsSection = ({ data }) => {
  const { user: authUser, updateUserProfile } = use(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  if (!data) {
    return <p className="text-gray-500 dark:text-gray-300">Loading profile...</p>;
  }
  const user = data;
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
    <div className="bg-white/80 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Profile & Settings
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue={user?.name}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={user?.email}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Role
                </label>
                <input
                  type="tel"
                  defaultValue={user?.role}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-600"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Security
            </h3>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-white dark:hover:bg-gray-600 transition-colors">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-emerald-500" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Two-Factor Authentication
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Add an extra layer of security
                    </p>
                  </div>
                </div>
                <div className="w-10 h-6 bg-gray-300 dark:bg-gray-600 rounded-full relative">
                  <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 transition-transform duration-300" />
                </div>
              </button>

              <button className="w-full flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-white dark:hover:bg-gray-600 transition-colors">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Payment Methods
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Manage your payment options
                    </p>
                  </div>
                </div>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        <div className="relative">
          {/* Iconic Edit Button */}
          <button
            onClick={handleEditProfile}
            className="absolute -top-2 -right-2 z-10 bg-emerald-500 hover:bg-emerald-600 text-black p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
            title="Edit Profile"
          >
            <Edit3 className="w-5 h-5" />
            <span className="absolute -bottom-8 -left-2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Edit Profile
            </span>
          </button>

          <div className="bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl p-6 text-white h-full">
            <div className="text-center items-center">
              {authUser?.photoURL ? (
                <img
                  src={authUser.photoURL}
                  alt="Profile"
                  className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-white/20 object-cover"
                />
              ) : (
                <User2 className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-white/20 p-2" />
              )}
              <h3 className="font-bold text-lg">{authUser?.displayName}</h3>
              <p className="text-emerald-100">{user?.email}</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <Shield className="w-4 h-4" />
                <span className="text-sm">Verified Traveler</span>
              </div>
              <p className="text-sm text-emerald-100 mt-4">
                Member since {new Date(user?.joinDate).getFullYear()}
              </p>
            </div>
          </div>
        </div>
      </div>


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