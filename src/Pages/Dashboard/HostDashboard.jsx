import React, { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  Calendar,
  DollarSign,
  MessageCircle,
  Star,
  Settings,
  Users,
  Search,
  Bell,
  Shield,
  User2,
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

// Recharts import for earnings graph

import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../Context/AuthContext";
import { fetchUserByEmail } from "../../redux/PropertieSlice";

const HostDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [hostData] = useState(mockHostData);

  const { user: authUser } = use(AuthContext);
  const [HostData, setHostData] = useState(mockHostData);






  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.products);
  // console.log('auth user', user);


  useEffect(() => {
    if (user) {
      setHostData({ ...mockHostData, user });
    } else {
      setHostData(mockHostData);
    }
  }, [user]);



  // console.log(user);

  useEffect(() => {
    if (authUser?.email) {
      dispatch(fetchUserByEmail(authUser.email));
    }
  }, [authUser, dispatch]);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;


  const navigationItems = [
    { id: "overview", label: "Overview", icon: <Home className="w-5 h-5" /> },
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
      currency: "BDT",
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
        return <SettingsSection data={user} />;
      default:
        return (
          <OverviewSection data={hostData} formatCurrency={formatCurrency} />
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
              Host Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
              Welcome back, {hostData.user.name}! Manage your properties and
              bookings. 🏠
            </p>
          </div>

          {/* Quick Actions */}
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
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900">
                  3
                </span>
              </button>
            </div>


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

              {/* User Profile Card */}
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-3">
                  {
                    authUser?.photoURL ? (
                      <img src={authUser.photoURL} alt={authUser.displayName} className="w-12 h-12 rounded-full"></img>
                    ) : (<User2 className="w-12 h-12 text-gray-400 bg-gray-200 p-2 rounded-full" />)
                  }

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white truncate">
                      {authUser?.displayName}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {HostData.user?.email}
                    </p>
                  </div>
                </div>
                {HostData.user.verified && (
                  <div className="flex items-center gap-1 mt-2 text-emerald-600 dark:text-emerald-400">
                    <Shield className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      Verified Traveler
                    </span>
                  </div>
                )}
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

export default HostDashboard;
