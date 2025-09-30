import React, { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  Settings, 
  Plus, 
  User, 
  Users, 
  Bell, 
  Search,
  ChevronDown,
  Calendar,
  DollarSign,
  MessageCircle,
  Star,
  Shield,
  LogOut
} from "lucide-react";

const MotionDiv = motion.div;

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const isGuest = location.pathname.includes("/dashboard/guest");
  const isHost = location.pathname.includes("/dashboard/host");
  const isAdmin = location.pathname.includes("/dashboard/admin");

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
            {/* <div className="relative">
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
                    className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 z-50"
                  >
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
                            !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
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
            </div> */}
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
          {/* Optional: Add close button for mobile */}
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
              className={`p-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
                !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
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


            {/* Profile Dropdown */}
            {/* <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3 p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl hover:shadow-md transition-all duration-300 hover:border-emerald-300 dark:hover:border-emerald-600"
              >
                <img
                  src={userData.avatar}
                  alt={userData.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {userData.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {userData.role}
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <MotionDiv
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 z-50"
                  >
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-3">
                        <img
                          src={userData.avatar}
                          alt={userData.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {userData.name}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {userData.role}
                            </span>
                            {userData.verified && (
                              <Shield className="w-4 h-4 text-emerald-500" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <User className="w-4 h-4" />
                        My Profile
                      </button>
                      <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>
                      <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </MotionDiv>
                )}
              </AnimatePresence>
            </div> */}

<div className="relative">
  <button
    onClick={() => setProfileOpen(!profileOpen)}
    className="flex items-center gap-3 p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl hover:shadow-md transition-all duration-300 hover:border-emerald-300 dark:hover:border-emerald-600"
  >
    <img
      src={userData.avatar}
      alt={userData.name}
      className="w-8 h-8 rounded-full"
    />
    <div className="hidden sm:block text-left">
      <p className="text-sm font-medium text-gray-900 dark:text-white">
        {userData.name}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {userData.role}
      </p>
    </div>
    <ChevronDown className="w-4 h-4 text-gray-400" />
  </button>

  <AnimatePresence>
    {profileOpen && (
      <MotionDiv
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        // ----------------------------------------------------------------------
        // MODIFIED LINE BELOW: Added centering and conditional positioning classes
        // ----------------------------------------------------------------------
        className="absolute mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 
                   left-1/2 -translate-x-1/2 sm:right-0 sm:left-auto sm:translate-x-0"
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <img
              src={userData.avatar}
              alt={userData.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                {userData.name}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {userData.role}
                </span>
                {userData.verified && (
                  <Shield className="w-4 h-4 text-emerald-500" />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="p-2">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <User className="w-4 h-4" />
            My Profile
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Settings className="w-4 h-4" />
            Settings
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </MotionDiv>
    )}
  </AnimatePresence>
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
          {/* <div className="flex gap-2">
            <MotionDiv whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button
                onClick={() => handleTab("guest")}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  isGuest
                    ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600"
                }`}
              >
                <User className="w-4 h-4" />
                Guest Dashboard
              </button>
            </MotionDiv>
            <MotionDiv whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button
                onClick={() => handleTab("host")}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  !isGuest
                    ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600"
                }`}
              >
                <Users className="w-4 h-4" />
                Host Dashboard
              </button>
            </MotionDiv>

            <MotionDiv whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button
                onClick={() => handleTab("admin")}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  isAdmin
                    ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600"
                }`}
              >
                <Users className="w-4 h-4" />
                Admin Dashboard
              </button>
            </MotionDiv>

            
          </div> */}

<div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 justify-center sm:justify-start">
  {/* Guest Dashboard */}
  <MotionDiv whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
    <button
      onClick={() => handleTab("guest")}
      className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl font-semibold transition-all duration-300 ${
        isGuest
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
      className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl font-semibold transition-all duration-300 ${
        !isGuest
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
      className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl font-semibold transition-all duration-300 ${
        isAdmin
          ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg"
          : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600"
      }`}
    >
      <Users className="w-4 h-4" />
      Admin Dashboard
    </button>
  </MotionDiv>
</div>


          {/* <div className="lg:ml-auto flex gap-3">
            <MotionDiv whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <NavLink
                to="/properties/add"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                Add Property
              </NavLink>
            </MotionDiv>
          </div> */}
        </MotionDiv>

        {/* Quick Stats */}
        {/* <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {[
            { label: "Active Bookings", value: "12", icon: Calendar, color: "from-blue-500 to-cyan-500" },
            { label: "Total Earnings", value: "৳2,84,500", icon: DollarSign, color: "from-emerald-500 to-green-500" },
            { label: "Messages", value: "8", icon: MessageCircle, color: "from-purple-500 to-pink-500" },
            { label: "Reviews", value: "4.9", icon: Star, color: "from-amber-500 to-orange-500" }
          ].map((stat, index) => (
            <MotionDiv
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </MotionDiv>
          ))}
        </MotionDiv> */}

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
    </div>
  );
};

export default DashboardLayout;