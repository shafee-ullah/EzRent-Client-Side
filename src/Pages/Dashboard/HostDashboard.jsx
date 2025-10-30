import React, { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  Calendar,
  DollarSign,
  MessageCircle,
  Star,
  Settings,
  BarChart3,
} from "lucide-react";
import OverviewSection from "./Host/components/OverviewSection";
import ListingsSection from "./Host/components/ListingsSection";
import BookingsSection from "./Host/components/BookingsSection";
import EarningsSection from "./Host/components/EarningsSection";
import MessagesSection from "./Host/components/MessagesSection";
import ReviewsSection from "./Host/components/ReviewsSection";
import SettingsSection from "./Host/components/SettingsSection";

const MotionDiv = motion.div;

// Mock data for host dashboard
const mockHostData = {
  user: {
    name: "Ahmad Rahman",
    email: "ahmad@example.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
    phone: "+880 1234-567890",
    joinDate: "2023-01-15",
    verified: true,
  },
  stats: {
    totalProperties: 8,
    activeBookings: 12,
    monthlyEarnings: 284500,
    pendingRequests: 3,
    reviews: 47,
  },
  properties: [
    {
      id: 1,
      title: "Luxury Apartment in Gulshan",
      location: "Dhaka",
      price: 4500,
      type: "Apartment",
      status: "active",
      bookings: 24,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=500&auto=format&fit=crop",
      amenities: ["wifi", "parking", "ac", "kitchen"],
    },
    {
      id: 2,
      title: "Beachfront Villa Cox's Bazar",
      location: "Cox's Bazar",
      price: 8900,
      type: "Villa",
      status: "active",
      bookings: 18,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=500&auto=format&fit=crop",
      amenities: ["wifi", "parking", "ac", "beach"],
    },
  ],
  bookings: [
    {
      id: 101,
      guestName: "Fatima Begum",
      property: "Luxury Apartment in Gulshan",
      checkIn: "2024-06-15",
      checkOut: "2024-06-18",
      status: "confirmed",
      paymentStatus: "paid",
      totalAmount: 13500,
      guestCount: 2,
    },
    {
      id: 102,
      guestName: "Rajib Hasan",
      property: "Beachfront Villa Cox's Bazar",
      checkIn: "2024-06-20",
      checkOut: "2024-06-25",
      status: "pending",
      paymentStatus: "pending",
      totalAmount: 44500,
      guestCount: 4,
    },
  ],
  earnings: {
    total: 985600,
    available: 156800,
    serviceFees: 45600,
    monthlyData: [
      { month: "Jan", earnings: 120000 },
      { month: "Feb", earnings: 190000 },
      { month: "Mar", earnings: 150000 },
      { month: "Apr", earnings: 210000 },
      { month: "May", earnings: 185000 },
      { month: "Jun", earnings: 284500 },
    ],
  },
};

import { Link } from "react-router";
import { useDispatch} from "react-redux";
import { AuthContext } from "../../Context/AuthContext";
import { fetchUserByEmail } from "../../redux/PropertieSlice";

const HostDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [hostData] = useState(mockHostData);
  
  const { user: authUser } = use(AuthContext);

  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser?.email) {
      dispatch(fetchUserByEmail(authUser.email));
    }
  }, [authUser, dispatch]);

  // Listen for mobile menu section changes
  useEffect(() => {
    const handleSectionChange = (event) => {
      setActiveSection(event.detail);
    };
    
    window.addEventListener('dashboardSectionChange', handleSectionChange);
    return () => window.removeEventListener('dashboardSectionChange', handleSectionChange);
  }, []);

  const navigationItems = [
    { id: "overview", label: "Overview", icon: <BarChart3 className="w-5 h-5" /> },
    {
      id: "listings",
      label: "My Listings",
      icon: <Home className="w-5 h-5" />,
    },
    {
      id: "bookings",
      label: "Bookings",
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      id: "earnings",
      label: "Earnings",
      icon: <DollarSign className="w-5 h-5" />,
    },
    {
      id: "messages",
      label: "Messages",
      icon: <MessageCircle className="w-5 h-5" />,
    },
    { id: "reviews", label: "Reviews", icon: <Star className="w-5 h-5" /> },
    {
      id: "settings",
      label: "Settings",
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

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return (
          <OverviewSection data={hostData} formatCurrency={formatCurrency} />
        );
      case "listings":
        return <ListingsSection data={hostData} />;
      case "bookings":
        return <BookingsSection data={hostData} />;
      case "earnings":
        return (
          <EarningsSection data={hostData} formatCurrency={formatCurrency} />
        );
      case "messages":
        return <MessagesSection />;
      case "reviews":
        return <ReviewsSection />;
      case "settings":
        return <SettingsSection data={authUser} />;
      default:
        return (
          <OverviewSection data={hostData} formatCurrency={formatCurrency} />
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Left Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-white dark:bg-gray-800/20 border-r border-gray-200 dark:border-gray-700">
        {/* Dashboard Title */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Host Dashboard</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Manage your properties</p>
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

        {/* Quick Stats */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-lg p-4">
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Monthly Earnings</p>
            <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">
              {formatCurrency(hostData.stats.monthlyEarnings)}
            </p>
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
              Welcome back, {authUser?.displayName || hostData.user.name}! 🏠
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

export default HostDashboard;
