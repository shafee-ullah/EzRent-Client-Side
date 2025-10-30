import React, { use, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
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
  X,
  Settings2,
  Home,
  BellIcon,
  Clock,
  Trash2,
  Menu,
  Calendar,
  Heart,
  MessageCircle,
  Star,
  DollarSign,
  BarChart3,
} from "lucide-react";
import { AuthContext } from "../../Context/AuthContext";
import { ThemeContext } from "../../Context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import GuestDashboard from "./GuestDashboard";
import HostDashboard from "./HostDashboard";
import AdminDashboard from "./AdminDashboard";
import { fetchUserByEmail } from "../../redux/PropertieSlice";
import toast from "react-hot-toast";
import {
  fetchNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  selectNotifications,
  selectUnreadCount,
} from "../../redux/notificationSlice";
import logo from "../../assets/ezrent-logo.png";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import Swal from "sweetalert2";

const MotionDiv = motion.div;

const DashboardLayout = () => {
  const { user: authUser } = use(AuthContext);
  const { theme, toggleTheme } = use(ThemeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const { user, loading } = useSelector((state) => state.products);
  const notifications = useSelector(selectNotifications);
  const unreadCount = useSelector(selectUnreadCount);

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    status: "pending",
    email: "",
    photoURL: "",
    role: "Guest",
    userId: "",
  });

  useEffect(() => {
    if (user && authUser) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || authUser.displayName || "",
        email: user.email || authUser.email || "",
        photoURL: authUser.photoURL || "",
        role: user.role || "Guest",
        userId: user._id,
      }));
    }
  }, [user, authUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://ezrent-server-side-production.up.railway.app/hostRequest",
        formData
      );

      if (res.status === 200 || res.status === 201) {
        toast.success("🎉 Host request submitted successfully!");
        setOpen(false);
      } else {
        toast.error("⚠️ Something went wrong while submitting your request.");
      }
    } catch (error) {
      if (error.response && error.response.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(
          " You have already submitted a request or an error occurred."
        );
      }
    }
  };

  const handleMarkAsRead = (notificationId) => {
    if (user?._id) {
      dispatch(markNotificationAsRead({ notificationId, userId: user._id }));
    }
  };

  const handleMarkAllAsRead = () => {
    if (user?._id) {
      dispatch(markAllNotificationsAsRead(user._id));
    }
  };

  const handleDeleteNotification = (notificationId) => {
    if (user?._id) {
      dispatch(deleteNotification({ notificationId, userId: user._id }));
    }
  };

  const handleLogout = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, log me out!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await signOut(auth);
          localStorage.removeItem("devtalksToken");
          setProfileOpen(false);
          Swal.fire(
            "Logged out!",
            "You have been logged out successfully.",
            "success"
          );
          navigate("/join");
        } catch (error) {
          console.error("Logout error:", error);
          Swal.fire(
            "Error!",
            "Failed to logout. Please try again.",
            "error"
          );
        }
      }
    });
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === "") {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    // Search suggestions based on role
    const suggestions = [];
    
    if (user?.role === "guest") {
      const guestSuggestions = [
        { id: "bookings", label: "My Bookings", type: "section" },
        { id: "wishlist", label: "Wishlist", type: "section" },
        { id: "messages", label: "Messages", type: "section" },
        { id: "reviews", label: "Reviews", type: "section" },
        { id: "profile", label: "Profile", type: "section" },
      ];
      suggestions.push(...guestSuggestions);
    } else if (user?.role === "host") {
      const hostSuggestions = [
        { id: "listings", label: "My Listings", type: "section" },
        { id: "bookings", label: "Bookings", type: "section" },
        { id: "earnings", label: "Earnings", type: "section" },
        { id: "messages", label: "Messages", type: "section" },
        { id: "reviews", label: "Reviews", type: "section" },
        { id: "settings", label: "Settings", type: "section" },
      ];
      suggestions.push(...hostSuggestions);
    } else if (user?.role === "Admin") {
      const adminSuggestions = [
        { id: "users", label: "User Management", type: "section" },
        { id: "properties", label: "Property Management", type: "section" },
        { id: "payments", label: "Payments & Earnings", type: "section" },
        { id: "reviews", label: "All Reviews", type: "section" },
        { id: "profile", label: "Profile & Settings", type: "section" },
      ];
      suggestions.push(...adminSuggestions);
    }

    const filtered = suggestions.filter(item =>
      item.label.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(filtered);
    setShowSearchResults(filtered.length > 0);
  };

  const handleSearchResultClick = (sectionId) => {
    window.dispatchEvent(new CustomEvent('dashboardSectionChange', { detail: sectionId }));
    setSearchQuery("");
    setShowSearchResults(false);
  };

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchNotifications(user._id));
    }
  }, [user?._id, dispatch]);

  useEffect(() => {
    if (authUser?.email && !user?._id && !loading) {
      dispatch(fetchUserByEmail(authUser.email));
    }
  }, [authUser?.email, user?._id, loading, dispatch]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSearchResults && !event.target.closest('.search-container')) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSearchResults]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800/20 border-b border-gray-200 dark:border-gray-700 z-40 flex items-center justify-between px-4 lg:px-6">
        {/* Left: Logo & Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Mobile Hamburger Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            ) : (
              <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            )}
          </button>

          {/* Logo - Hidden on mobile when menu is open */}
          <Link to="/" className={`flex items-center gap-2 hover:opacity-80 transition-opacity ${mobileMenuOpen ? 'hidden' : 'flex'} sm:flex`}>
            <img src={logo} alt="EzRent logo" className="w-8 h-8" />
            <h1 className="hidden sm:block text-xl font-bold">
              <span className="text-green-600">Ez</span>
              <span className="text-gray-900 dark:text-white">Rent</span>
            </h1>
          </Link>
        </div>

        {/* Center: Search Bar (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full search-container">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search dashboard..."
              value={searchQuery}
              onChange={handleSearch}
              onFocus={() => searchResults.length > 0 && setShowSearchResults(true)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
            
            {/* Search Results Dropdown */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 max-h-80 overflow-y-auto">
                <div className="p-2">
                  {searchResults.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => handleSearchResultClick(result.id)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Search className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{result.label}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Dashboard Section</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? "🌞" : "🌙"}
          </button>

          {/* Become Host Button */}
          {user?.role === "guest" && (
            <button
              onClick={() => setOpen(true)}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-lg text-sm font-semibold transition-all"
            >
              Become a Host
            </button>
          )}

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {notificationsOpen && (
                <MotionDiv
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-2rem)] bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50"
                >
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Notifications
                    </h3>
                    <div className="flex items-center gap-2">
                      {unreadCount > 0 && (
                        <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs rounded-full">
                          {unreadCount} new
                        </span>
                      )}
                      <button
                        onClick={() => setNotificationsOpen(false)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg sm:hidden"
                      >
                        <X className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification._id}
                          onClick={() => handleMarkAsRead(notification._id)}
                          className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer group ${
                            !notification.read
                              ? "bg-blue-50/50 dark:bg-blue-900/20"
                              : ""
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {notification.title}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {new Date(
                                  notification.createdAt
                                ).toLocaleString()}
                              </p>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteNotification(notification._id);
                              }}
                              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-red-500" />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <BellIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500 dark:text-gray-400">
                          No notifications
                        </p>
                      </div>
                    )}
                  </div>
                  {notifications.length > 0 && (
                    <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={handleMarkAllAsRead}
                        className="w-full px-4 py-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg"
                      >
                        Mark all as read
                      </button>
                    </div>
                  )}
                </MotionDiv>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              {authUser?.photoURL ? (
                <img
                  src={authUser.photoURL}
                  alt={authUser.displayName}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center">
                  <User2 className="w-4 h-4 text-white" />
                </div>
              )}
              <ChevronDown className="w-4 h-4 text-gray-700 dark:text-gray-300 hidden sm:block" />
            </button>

            <AnimatePresence>
              {profileOpen && (
                <MotionDiv
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50"
                >
                  <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="font-semibold text-gray-900 dark:text-white truncate">
                      {authUser?.displayName}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {authUser?.email}
                    </p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs rounded-full">
                      {user?.role || "Guest"}
                    </span>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-sm"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </MotionDiv>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Main Content Area - Add top padding for fixed header */}
      <div className="pt-16">
        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-30"
            />
          )}
        </AnimatePresence>

        {/* Mobile Sidebar Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <MotionDiv
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-16 bottom-0 w-64 bg-white dark:bg-gray-800/20 border-r border-gray-200 dark:border-gray-700 z-40 overflow-y-auto"
            >
              {/* Dashboard sections based on role */}
              {user?.role === "guest" && <GuestMobileMenu setMobileMenuOpen={setMobileMenuOpen} />}
              {user?.role === "host" && <HostMobileMenu setMobileMenuOpen={setMobileMenuOpen} />}
              {user?.role === "Admin" && <AdminMobileMenu setMobileMenuOpen={setMobileMenuOpen} />}
            </MotionDiv>
          )}
        </AnimatePresence>

        {user?.role === "guest" && <GuestDashboard />}
        {user?.role === "host" && <HostDashboard />}
        {user?.role === "Admin" && <AdminDashboard />}
      </div>

      {/* Become Host Modal */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            <MotionDiv
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
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
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={authUser?.displayName || ""}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="number"
                    value={formData.number || ""}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200"
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
                    value={authUser?.email || ""}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200"
                    placeholder="Enter your email address"
                  />
                </div>

                {/* Address */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                      placeholder="Street / Area"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                      placeholder="Country"
                    />
                  </div>
                </div>

                {/* Short Bio */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Short Bio
                  </label>
                  <textarea
                    name="bio"
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                    placeholder="Tell us a bit about yourself as a host..."
                  ></textarea>
                </div>

                {/* Preferred Language & Emergency Contact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Preferred Language(s)
                    </label>
                    <input
                      type="text"
                      name="language"
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                      placeholder="e.g., English, Bangla"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Emergency Contact Number
                    </label>
                    <input
                      type="tel"
                      name="emergencyContact"
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                      placeholder="Enter emergency contact"
                    />
                  </div>
                </div>

                {/* Payout Method */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Preferred Payout Method
                  </label>
                  <select
                    name="payoutMethod"
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                  >
                    <option value="">Select payout method</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="bkash">bKash</option>
                    <option value="paypal">PayPal</option>
                    <option value="stripe">Stripe</option>
                  </select>
                </div>

                {/* Account Info & ID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Account / Payment Info
                    </label>
                    <input
                      type="text"
                      name="accountInfo"
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                      placeholder="Enter account number or details"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      National ID / Passport Number
                    </label>
                    <input
                      type="text"
                      name="nid"
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                      placeholder="For verification"
                    />
                  </div>
                </div>

                {/* Agreement Checkboxes */}
                <div className="space-y-2 pt-3">
                  <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <input
                      type="checkbox"
                      required
                      className="rounded border-gray-300 text-emerald-600"
                    />
                    I agree to the{" "}
                    <span className="text-emerald-600 font-semibold">
                      Terms of Hosting
                    </span>{" "}
                    and Community Guidelines.
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <input
                      type="checkbox"
                      required
                      className="rounded border-gray-300 text-emerald-600"
                    />
                    I confirm that all information provided is accurate.
                  </label>
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
            </MotionDiv>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Mobile Menu Components
const GuestMobileMenu = ({ setMobileMenuOpen }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = use(ThemeContext);
  
  const menuItems = [
    { id: "home", label: "Home", icon: <Home className="w-5 h-5" />, path: "/" },
    { id: "overview", label: "Overview", icon: <Home className="w-5 h-5" />, path: "/dashboard" },
    { id: "bookings", label: "My Bookings", icon: <Calendar className="w-5 h-5" />, path: "/dashboard" },
    { id: "wishlist", label: "Wishlist", icon: <Heart className="w-5 h-5" />, path: "/dashboard" },
    { id: "messages", label: "Messages", icon: <MessageCircle className="w-5 h-5" />, path: "/dashboard" },
    { id: "reviews", label: "Reviews", icon: <Star className="w-5 h-5" />, path: "/dashboard" },
    { id: "profile", label: "Profile", icon: <Settings className="w-5 h-5" />, path: "/dashboard" },
  ];

  const handleNavigation = (item) => {
    if (item.id === "home") {
      navigate("/");
    } else {
      navigate("/dashboard");
      // Trigger section change via event
      window.dispatchEvent(new CustomEvent('dashboardSectionChange', { detail: item.id }));
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="p-4">
      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 px-2">Guest Dashboard</h3>
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigation(item)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      
      {/* Theme Toggle for Mobile */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <span className="text-xl">{theme === "light" ? "🌞" : "🌙"}</span>
          <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
        </button>
      </div>
    </div>
  );
};

const HostMobileMenu = ({ setMobileMenuOpen }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = use(ThemeContext);
  
  const menuItems = [
    { id: "home", label: "Home", icon: <Home className="w-5 h-5" />, path: "/" },
    { id: "overview", label: "Overview", icon: <BarChart3 className="w-5 h-5" />, path: "/dashboard" },
    { id: "listings", label: "My Listings", icon: <Home className="w-5 h-5" />, path: "/dashboard" },
    { id: "bookings", label: "Bookings", icon: <Calendar className="w-5 h-5" />, path: "/dashboard" },
    { id: "earnings", label: "Earnings", icon: <DollarSign className="w-5 h-5" />, path: "/dashboard" },
    { id: "messages", label: "Messages", icon: <MessageCircle className="w-5 h-5" />, path: "/dashboard" },
    { id: "reviews", label: "Reviews", icon: <Star className="w-5 h-5" />, path: "/dashboard" },
    { id: "settings", label: "Settings", icon: <Settings className="w-5 h-5" />, path: "/dashboard" },
  ];

  const handleNavigation = (item) => {
    if (item.id === "home") {
      navigate("/");
    } else {
      navigate("/dashboard");
      window.dispatchEvent(new CustomEvent('dashboardSectionChange', { detail: item.id }));
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="p-4">
      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 px-2">Host Dashboard</h3>
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigation(item)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      
      {/* Theme Toggle for Mobile */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <span className="text-xl">{theme === "light" ? "🌞" : "🌙"}</span>
          <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
        </button>
      </div>
    </div>
  );
};

const AdminMobileMenu = ({ setMobileMenuOpen }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = use(ThemeContext);
  
  const menuItems = [
    { id: "home", label: "Home", icon: <Home className="w-5 h-5" />, path: "/" },
    { id: "overview", label: "Overview", icon: <BarChart3 className="w-5 h-5" />, path: "/dashboard" },
    { id: "users", label: "User Management", icon: <Users className="w-5 h-5" />, path: "/dashboard" },
    { id: "properties", label: "Property Management", icon: <Home className="w-5 h-5" />, path: "/dashboard" },
    { id: "payments", label: "Payments & Earnings", icon: <DollarSign className="w-5 h-5" />, path: "/dashboard" },
    { id: "reviews", label: "All Reviews", icon: <Star className="w-5 h-5" />, path: "/dashboard" },
    { id: "profile", label: "Profile & Settings", icon: <Settings className="w-5 h-5" />, path: "/dashboard" },
  ];

  const handleNavigation = (item) => {
    if (item.id === "home") {
      navigate("/");
    } else {
      navigate("/dashboard");
      window.dispatchEvent(new CustomEvent('dashboardSectionChange', { detail: item.id }));
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="p-4">
      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 px-2">Admin Dashboard</h3>
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigation(item)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      
      {/* Theme Toggle for Mobile */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <span className="text-xl">{theme === "light" ? "🌞" : "🌙"}</span>
          <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardLayout;
