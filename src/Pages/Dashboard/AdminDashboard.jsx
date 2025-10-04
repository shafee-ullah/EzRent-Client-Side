import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Home,
  Calendar,
  DollarSign,
  Star,
  Settings,
  TrendingUp,
  BarChart3,
  Bell,
  Search,
} from "lucide-react";
import OverviewSection from "./Admin/components/OverviewSection";
import UserManagementSection from "./Admin/components/UserManagementSection";
import PropertyManagementSection from "./Admin/components/PropertyManagementSection";
import BookingManagementSection from "./Admin/components/BookingManagementSection";
import PaymentsSection from "./Admin/components/PaymentsSection";
import ReviewsModerationSection from "./Admin/components/ReviewsModerationSection";
import AnalyticsSection from "./Admin/components/AnalyticsSection";
import PlatformSettingsSection from "./Admin/components/PlatformSettingsSection";
import { useDispatch, useSelector } from "react-redux";
import { fetchHostRequests } from "../../redux/PropertieSlice"


const MotionDiv = motion.div;

// Mock data for admin dashboard
const mockAdminData = {
  user: {
    name: "Admin User",
    email: "admin@travelbd.com",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
    role: "Platform Administrator",
    joinDate: "2022-05-10",
    verified: true,
  },
  overview: {
    totalUsers: 15420,
    totalHosts: 3245,
    activeListings: 8765,
    totalBookings: 45230,
    totalRevenue: 12560000,
    monthlyBookings: [
      { month: "Jan", bookings: 3200, revenue: 850000 },
      { month: "Feb", bookings: 3800, revenue: 920000 },
      { month: "Mar", bookings: 4200, revenue: 1050000 },
      { month: "Apr", bookings: 3900, revenue: 980000 },
      { month: "May", bookings: 4500, revenue: 1120000 },
      { month: "Jun", bookings: 5200, revenue: 1256000 },
    ],
  },
  alerts: [
    {
      id: 1,
      type: "fraud",
      message: "Suspicious booking pattern detected for user #7842",
      severity: "high",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "review",
      message: "3 reviews flagged for inappropriate content",
      severity: "medium",
      time: "5 hours ago",
    },
    {
      id: 3,
      type: "payment",
      message: "Payment dispute requires attention",
      severity: "high",
      time: "1 day ago",
    },
  ],
  pendingActions: {
    hostRegistrations: 23,
    propertyListings: 45,
    payoutRequests: 18,
    flaggedReviews: 12,
  },
};

// charts are handled inside extracted components

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [adminData] = useState(mockAdminData);




  // get all host req
  const dispatch = useDispatch();
  const { hostRequests, loading } = useSelector((state) => state.products);
  console.log(hostRequests);

  useEffect(() => {
    dispatch(fetchHostRequests());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;


  const navigationItems = [
    {
      id: "overview",
      label: "Overview",
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      id: "users",
      label: "User Management",
      icon: <Users className="w-5 h-5" />,
    },
    {
      id: "properties",
      label: "Property Management",
      icon: <Home className="w-5 h-5" />,
    },
    {
      id: "bookings",
      label: "Booking Management",
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      id: "payments",
      label: "Payments & Earnings",
      icon: <DollarSign className="w-5 h-5" />,
    },
    {
      id: "reviews",
      label: "Content Moderation",
      icon: <Star className="w-5 h-5" />,
    },
    {
      id: "analytics",
      label: "Reports & Analytics",
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      id: "settings",
      label: "Platform Settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return (
          <OverviewSection
            data={adminData}
            formatCurrency={formatCurrency}
            formatNumber={formatNumber}
          />
        );
      case "users":
        return <UserManagementSection  data={hostRequests}/>;
      case "properties":
        return <PropertyManagementSection />;
      case "bookings":
        return <BookingManagementSection />;
      case "payments":
        return <PaymentsSection formatCurrency={formatCurrency} />;
      case "reviews":
        return <ReviewsModerationSection />;
      case "analytics":
        return <AnalyticsSection formatCurrency={formatCurrency} />;
      case "settings":
        return <PlatformSettingsSection />;
      default:
        return (
          <OverviewSection
            data={adminData}
            formatCurrency={formatCurrency}
            formatNumber={formatNumber}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-emerald-900/10">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-200/30 dark:bg-emerald-900/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-green-200/30 dark:bg-green-900/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-11/12 mx-auto px-4 py-6">
        {/* Header */}
        <MotionDiv
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8"
        >
          <div className="flex-1">
            <h1 className="text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
              Platform management and analytics for{" "}
              {formatNumber(adminData.overview.totalUsers)} users 🛡️
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="hidden md:flex items-center relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3" />
              <input
                type="text"
                placeholder="Search platform..."
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
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900">
                  {adminData.alerts.length}
                </span>
              </button>
            </div>

            {/* Profile Dropdown */}
            {/* <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3 p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl hover:shadow-md transition-all duration-300 hover:border-emerald-300 dark:hover:border-emerald-600"
              >
                <img
                  src={adminData.user.avatar}
                  alt={adminData.user.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {adminData.user.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Administrator
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 z-50">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      <img
                        src={adminData.user.avatar}
                        alt={adminData.user.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {adminData.user.name}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {adminData.user.role}
                          </span>
                          {adminData.user.verified && (
                            <Shield className="w-4 h-4 text-emerald-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <Users className="w-4 h-4" />
                      Admin Profile
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <Settings className="w-4 h-4" />
                      System Settings
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div> */}
          </div>
        </MotionDiv>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <MotionDiv
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:w-64 flex-shrink-0"
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sticky top-6">
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeSection === item.id
                      ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>

              {/* Pending Actions Card */}
              <div className="mt-6 p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-3">
                  Pending Actions
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-amber-700 dark:text-amber-400">
                      Host Registrations
                    </span>
                    <span className="px-2 py-1 bg-amber-500 text-white rounded-full text-xs font-bold">
                      {adminData.pendingActions.hostRegistrations}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-amber-700 dark:text-amber-400">
                      Property Listings
                    </span>
                    <span className="px-2 py-1 bg-amber-500 text-white rounded-full text-xs font-bold">
                      {adminData.pendingActions.propertyListings}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-amber-700 dark:text-amber-400">
                      Payout Requests
                    </span>
                    <span className="px-2 py-1 bg-amber-500 text-white rounded-full text-xs font-bold">
                      {adminData.pendingActions.payoutRequests}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </MotionDiv>

          {/* Main Content */}
          <MotionDiv
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1"
          >
            {renderSection()}
          </MotionDiv>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
