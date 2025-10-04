import React, { use, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  User,
  Users,
  Bell,
  Search,
  ChevronDown,
  Shield,
  LogOut,
  User2,
  X
} from "lucide-react";
import { AuthContext } from "../../Context/AuthContext";
import { useSelector } from "react-redux";
import axios from "axios";

const MotionDiv = motion.div;

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user: authUser } = use(AuthContext);
  console.log(authUser);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  // const [profileOpen, setProfileOpen] = useState(false);

  const isGuest = location.pathname.includes("/dashboard/guest");
  const isHost = location.pathname.includes("/dashboard/host");
  const isAdmin = location.pathname.includes("/dashboard/admin");

  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.products);
  console.log(user);
  const [formData, setFormData] = useState({
    name: user?.name,
    number: "",
    status: "pending",
    email: user?.email,
    photoURL: authUser?.photoURL,
    role: user?.role,
    userId: user?._id,
  });

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>{error}</p>;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/hostRequest', formData)
    console.log("Host form submitted:", formData);
    setOpen(false);
  };

  const handleTab = (tab) => {
    navigate(tab === "guest" ? "/dashboard/guest" : tab === "host" ? "/dashboard/host" : "/dashboard/admin");
  };

  // Mock user data
  const userData = {
    name: "Ahmad Rahman",
    email: "ahmad@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
    role: isGuest ? "Guest" : isHost ? "Host" : isAdmin ? "Admin" : "Guest",
    verified: true
  };

  // Mock notifications
  const notifications = [
    { id: 1, message: "New booking request for your villa", time: "2 hours ago", read: false },
    { id: 2, message: "Your payment has been processed", time: "1 day ago", read: true },
    { id: 3, message: "You received a 5-star review", time: "2 days ago", read: true }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-emerald-900/10">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-200/30 dark:bg-emerald-900/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-green-200/30 dark:bg-green-900/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-11/12 mx-auto px-4 py-6">
        {/* Header Section */}
        <MotionDiv
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8"
        >
          <div className="flex-1">
            <h1 className="text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
              Welcome back, {userData.name}! 👋 Here's your overview.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="hidden md:flex items-center relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 w-64"
              />
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl hover:shadow-md transition-all duration-300 hover:border-emerald-300 dark:hover:border-emerald-600"
              >
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900">
                    {unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {notificationsOpen && (
                  <MotionDiv
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute left-0 mt-2 w-80 max-w-[calc(100vw-2rem)] bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 z-50"
                  >
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                      <button
                        onClick={() => setNotificationsOpen(false)}
                        className="sm:hidden p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                      >
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="max-h-96 sm:max-h-96 max-sm:max-h-[60vh] overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${!notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                            }`}
                        >
                          <p className="text-sm text-gray-900 dark:text-white">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {notification.time}
                          </p>
                        </div>
                      ))}
                    </div>
                  </MotionDiv>
                )}
              </AnimatePresence>
            </div>

            {/* Become Host Button */}
            <div className="relative">
              <button
                onClick={() => setOpen(true)}
                className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 font-semibold"
              >
                Become a Host
              </button>
            </div>
          </div>
        </MotionDiv>

        {/* Tab Navigation */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col lg:flex-row gap-4 mb-8"
        >
          <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 justify-center sm:justify-start">
            {/* Guest Dashboard */}
            <MotionDiv whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button
                onClick={() => handleTab("guest")}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl font-semibold transition-all duration-300 ${isGuest
                  ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600"
                  }`}
              >
                <User className="w-4 h-4" />
                Guest Dashboard
              </button>
            </MotionDiv>

            {/* Host Dashboard */}
            <MotionDiv whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button
                onClick={() => handleTab("host")}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl font-semibold transition-all duration-300 ${!isGuest
                  ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600"
                  }`}
              >
                <Users className="w-4 h-4" />
                Host Dashboard
              </button>
            </MotionDiv>

            {/* Admin Dashboard */}
            <MotionDiv whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button
                onClick={() => handleTab("admin")}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl font-semibold transition-all duration-300 ${isAdmin
                  ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600"
                  }`}
              >
                <Users className="w-4 h-4" />
                Admin Dashboard
              </button>
            </MotionDiv>
          </div>
        </MotionDiv>

        {/* Dashboard Content */}
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden"
        >
          <Outlet />
        </MotionDiv>
      </div>

      {/* Enhanced Modal */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400">
                      Become a Host
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
                      Start your hosting journey with us
                    </p>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors duration-200"
                  >
                    <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={authUser?.displayName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 dark:focus:border-emerald-400 transition-all duration-200"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Number */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="number"
                    value={formData.number}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 dark:focus:border-emerald-400 transition-all duration-200"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="space-y-2 hidden">
                  <input
                    type="tel"
                    name="status"
                    value={"pending"}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 dark:focus:border-emerald-400 transition-all duration-200"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={authUser?.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 dark:focus:border-emerald-400 transition-all duration-200"
                    placeholder="Enter your email address"
                  />
                </div>

                {/* Photo URL */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Photo URL
                  </label>
                  <input
                    type="url"
                    name="photoURL"
                    value={authUser?.photoURL}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 dark:focus:border-emerald-400 transition-all duration-200"
                    placeholder="Enter your photo URL"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-green-600 shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardLayout;