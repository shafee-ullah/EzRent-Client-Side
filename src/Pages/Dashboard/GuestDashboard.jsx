import React, { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Heart,
  Star,
  Settings,
  User,
  MessageCircle,
  Home,
} from "lucide-react";
import OverviewSection from "./Guest/components/OverviewSection";
import BookingsSection from "./Guest/components/BookingsSection";
import WishlistSection from "./Guest/components/WishlistSection";
import MessagesSection from "./Guest/components/MessagesSection";
import ReviewsSection from "./Guest/components/ReviewsSection";
import ProfileSection from "./Guest/components/ProfileSection";
import { AuthContext } from "../../Context/AuthContext";
import { fetchUserByEmail } from "../../redux/PropertieSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";

const MotionDiv = motion.div;

// Mock data for guest dashboard
const mockGuestData = {
  user: {
    name: "Fatima Begum",
    email: "fatima@example.com",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=400&auto=format&fit=crop",
    phone: "+880 1234-567890",
    joinDate: "2023-03-20",
    verified: true,
  },
  stats: {
    upcomingBookings: 2,
    wishlistItems: 8,
    pastTrips: 5,
    reviews: 3,
  },
  upcomingBookings: [
    {
      id: 201,
      property: "Luxury Apartment in Gulshan",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=500&auto=format&fit=crop",
      checkIn: "2024-06-15",
      checkOut: "2024-06-18",
      guests: 2,
      totalPrice: 13500,
      status: "confirmed",
      host: "Ahmad Rahman",
    },
    {
      id: 202,
      property: "Beachfront Villa Cox's Bazar",
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=500&auto=format&fit=crop",
      checkIn: "2024-07-10",
      checkOut: "2024-07-15",
      guests: 4,
      totalPrice: 44500,
      status: "confirmed",
      host: "Sarwar Islam",
    },
  ],
  wishlist: [
    {
      id: 301,
      title: "Mountain View Cottage Srimangal",
      location: "Sylhet",
      price: 3200,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=500&auto=format&fit=crop",
      collection: "Nature Getaways",
    },
    {
      id: 302,
      title: "Modern Studio in Banani",
      location: "Dhaka",
      price: 2800,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=500&auto=format&fit=crop",
      collection: "City Stays",
    },
  ],
  pastBookings: [
    {
      id: 101,
      property: "Cozy Apartment in Dhanmondi",
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=500&auto=format&fit=crop",
      checkIn: "2024-03-15",
      checkOut: "2024-03-18",
      totalPrice: 8400,
      status: "completed",
      reviewed: true,
    },
  ],
};

const GuestDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [guestData, setGuestData] = useState(mockGuestData);
  const { user: authUser } = use(AuthContext);

  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (user) {
      setGuestData({ ...mockGuestData, user });
    } else {
      setGuestData(mockGuestData);
    }
  }, [user]);

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

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  const navigationItems = [
    { id: "overview", label: "Overview", icon: <Home className="w-5 h-5" /> },
    {
      id: "bookings",
      label: "My Bookings",
      icon: <Calendar className="w-5 h-5" />,
    },
    { id: "wishlist", label: "Wishlist", icon: <Heart className="w-5 h-5" /> },
    {
      id: "messages",
      label: "Messages",
      icon: <MessageCircle className="w-5 h-5" />,
    },
    { id: "reviews", label: "Reviews", icon: <Star className="w-5 h-5" /> },
    {
      id: "profile",
      label: "Profile",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewSection data={guestData} />;
      case "bookings":
        return <BookingsSection data={guestData} />;
      case "wishlist":
        return <WishlistSection data={guestData} />;
      case "messages":
        return <MessagesSection />;
      case "reviews":
        return <ReviewsSection />;
      case "profile":
        return <ProfileSection data={user} />;
      default:
        return <OverviewSection data={guestData} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Left Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-white dark:bg-gray-800/20 border-r border-gray-200 dark:border-gray-700">
        {/* Dashboard Title */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Guest Dashboard</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Manage your trips</p>
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
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Next Trip</p>
            <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">
              {guestData.stats.upcomingBookings > 0 ? `${guestData.stats.upcomingBookings} upcoming` : "No trips planned"}
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
              Welcome back, {authUser?.displayName || guestData.user.name}! 🌍
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

export default GuestDashboard;
