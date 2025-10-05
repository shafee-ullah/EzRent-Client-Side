import React, { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Calendar,
  Heart,
  Star,
  Settings,
  User,
  MessageCircle,
  Bell,
  Shield,
  User2,
} from "lucide-react";
import OverviewSection from "./Guest/components/OverviewSection";
import SearchSection from "./Guest/components/SearchSection";
import BookingsSection from "./Guest/components/BookingsSection";
import WishlistSection from "./Guest/components/WishlistSection";
import MessagesSection from "./Guest/components/MessagesSection";
import ReviewsSection from "./Guest/components/ReviewsSection";
import ProfileSection from "./Guest/components/ProfileSection";
import { AuthContext } from "../../Context/AuthContext";
import { fetchUserByEmail } from "../../redux/PropertieSlice";
import { useDispatch, useSelector } from "react-redux";

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
  console.log('auth user', user);


  useEffect(() => {
    if (user) {
      setGuestData({ ...mockGuestData, user });
    } else {
      setGuestData(mockGuestData);
    }
  }, [user]);



  console.log(user);

  useEffect(() => {
    if (authUser?.email) {
      dispatch(fetchUserByEmail(authUser.email));
    }
  }, [authUser, dispatch]);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;



  const navigationItems = [
    { id: "overview", label: "Overview", icon: <User className="w-5 h-5" /> },
    {
      id: "search",
      label: "Search & Browse",
      icon: <Search className="w-5 h-5" />,
    },
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
      label: "Profile & Settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewSection data={guestData} />;
      case "search":
        return <SearchSection />;
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
              Guest Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
              Welcome back, {guestData.user.name}! Ready for your next
              adventure? 🌍
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-4">
            <button className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl hover:shadow-md transition-all duration-300 hover:border-emerald-300 dark:hover:border-emerald-600">
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300">
              <Search className="w-4 h-4" />
              Search Stays
            </button>
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
                      {guestData.user?.email}
                    </p>
                  </div>
                </div>
                {guestData.user.verified && (
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

export default GuestDashboard;
