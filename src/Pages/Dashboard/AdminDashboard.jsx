import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Home,
  DollarSign,
  Star,
  Settings,
  BarChart3,
} from "lucide-react";
import OverviewSection from "./Admin/components/OverviewSection";
import UserManagementSection from "./Admin/components/UserManagementSection";
import PropertyManagementSection from "./Admin/components/PropertyManagementSection";
import PaymentsSection from "./Admin/components/PaymentsSection";
import ReviewsModerationSection from "./Admin/components/ReviewsModerationSection";
import ProfileSection from "./Guest/components/ProfileSection";
import { useDispatch, useSelector } from "react-redux";
import { fetchHostRequests } from "../../redux/PropertieSlice"
import Loading from "../../components/Loading";

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
      id: 2,
      type: "verification",
      message: "Host account verification pending for user @johncena.",
      severity: "low",
    },
    {
      id: 3,
      type: "payment",
      message: "Payment of $250 successfully processed for booking #EZR5482.",
      severity: "info",
    },
    {
      id: 4,
      type: "review",
      message: "New 5⭐ review added for 'City View Apartment, Dhaka'.",
      severity: "low",
    },
    {
      id: 8,
      type: "feedback",
      message: "User feedback received: 'AI chatbot helped me book easily!'",
      severity: "info",
    },
  ],
  pendingActions: {
    hostRegistrations: 23,
    propertyListings: 45,
    payoutRequests: 18,
    flaggedReviews: 12,
  },
};

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [adminData] = useState(mockAdminData);
  const { user } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  const { hostRequests, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchHostRequests());
  }, [dispatch]);

  // Listen for mobile menu section changes
  useEffect(() => {
    const handleSectionChange = (event) => {
      setActiveSection(event.detail);
    };
    
    window.addEventListener('dashboardSectionChange', handleSectionChange);
    return () => window.removeEventListener('dashboardSectionChange', handleSectionChange);
  }, []);

  if (loading) return <Loading />;

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
      id: "payments",
      label: "Payments & Earnings",
      icon: <DollarSign className="w-5 h-5" />,
    },
    {
      id: "reviews",
      label: "All Reviews",
      icon: <Star className="w-5 h-5" />,
    },
    {
      id: "profile",
      label: "Profile & Settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "USD",
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
        return <UserManagementSection data={hostRequests} />;
      case "properties":
        return <PropertyManagementSection />;
      case "payments":
        return <PaymentsSection formatCurrency={formatCurrency} />;
      case "reviews":
        return <ReviewsModerationSection />;
      case "profile":
        return <ProfileSection data={user} />;
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
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Left Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-white dark:bg-gray-800/20 border-r border-gray-200 dark:border-gray-700">
        {/* Dashboard Title */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Admin Dashboard</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Platform management</p>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium ${
                activeSection === item.id
                  ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-md"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Pending Actions */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
            <p className="text-xs font-semibold text-amber-800 dark:text-amber-300 mb-2">
              Pending Actions
            </p>
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-amber-700 dark:text-amber-400">Host Registrations</span>
                <span className="px-2 py-0.5 bg-amber-500 text-white rounded-full text-xs font-bold">
                  {hostRequests?.length || 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Page Header */}
          <MotionDiv
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {navigationItems.find(item => item.id === activeSection)?.label || "Overview"}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Platform analytics for {formatNumber(adminData.overview.totalUsers)} users 🛡️
            </p>
          </MotionDiv>

          {/* Content Area */}
          <MotionDiv
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderSection()}
          </MotionDiv>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
