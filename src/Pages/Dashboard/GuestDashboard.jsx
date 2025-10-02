import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Calendar,
  MapPin,
  Users,
  Heart,
  Star,
  Settings,
  User,
  MessageCircle,
  Download,
  Edit,
  Trash2,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  Shield,
  CreditCard,
  Bell,
  LogOut
} from "lucide-react";

const MotionDiv = motion.div;

// Mock data for guest dashboard
const mockGuestData = {
  user: {
    name: "Fatima Begum",
    email: "fatima@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=400&auto=format&fit=crop",
    phone: "+880 1234-567890",
    joinDate: "2023-03-20",
    verified: true
  },
  stats: {
    upcomingBookings: 2,
    wishlistItems: 8,
    pastTrips: 5,
    reviews: 3
  },
  upcomingBookings: [
    {
      id: 201,
      property: "Luxury Apartment in Gulshan",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=500&auto=format&fit=crop",
      checkIn: "2024-06-15",
      checkOut: "2024-06-18",
      guests: 2,
      totalPrice: 13500,
      status: "confirmed",
      host: "Ahmad Rahman"
    },
    {
      id: 202,
      property: "Beachfront Villa Cox's Bazar",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=500&auto=format&fit=crop",
      checkIn: "2024-07-10",
      checkOut: "2024-07-15",
      guests: 4,
      totalPrice: 44500,
      status: "confirmed",
      host: "Sarwar Islam"
    }
  ],
  wishlist: [
    {
      id: 301,
      title: "Mountain View Cottage Srimangal",
      location: "Sylhet",
      price: 3200,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=500&auto=format&fit=crop",
      collection: "Nature Getaways"
    },
    {
      id: 302,
      title: "Modern Studio in Banani",
      location: "Dhaka",
      price: 2800,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=500&auto=format&fit=crop",
      collection: "City Stays"
    }
  ],
  pastBookings: [
    {
      id: 101,
      property: "Cozy Apartment in Dhanmondi",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=500&auto=format&fit=crop",
      checkIn: "2024-03-15",
      checkOut: "2024-03-18",
      totalPrice: 8400,
      status: "completed",
      reviewed: true
    }
  ]
};

const GuestDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [guestData, setGuestData] = useState(mockGuestData);

  const navigationItems = [
    { id: "overview", label: "Overview", icon: <User className="w-5 h-5" /> },
    { id: "search", label: "Search & Browse", icon: <Search className="w-5 h-5" /> },
    { id: "bookings", label: "My Bookings", icon: <Calendar className="w-5 h-5" /> },
    { id: "wishlist", label: "Wishlist", icon: <Heart className="w-5 h-5" /> },
    { id: "messages", label: "Messages", icon: <MessageCircle className="w-5 h-5" /> },
    { id: "reviews", label: "Reviews", icon: <Star className="w-5 h-5" /> },
    { id: "profile", label: "Profile & Settings", icon: <Settings className="w-5 h-5" /> }
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
        return <ProfileSection data={guestData} />;
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
              Welcome back, {guestData.user.name}! Ready for your next adventure? 🌍
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
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      activeSection === item.id
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
                  <img
                    src={guestData.user.avatar}
                    alt={guestData.user.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white truncate">
                      {guestData.user.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {guestData.user.email}
                    </p>
                  </div>
                </div>
                {guestData.user.verified && (
                  <div className="flex items-center gap-1 mt-2 text-emerald-600 dark:text-emerald-400">
                    <Shield className="w-4 h-4" />
                    <span className="text-sm font-medium">Verified Traveler</span>
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

// Overview Section Component
const OverviewSection = ({ data }) => {
  const stats = [
    {
      label: "Upcoming Bookings",
      value: data.stats.upcomingBookings,
      icon: <Calendar className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      description: "Trips coming up"
    },
    {
      label: "Wishlist Items",
      value: data.stats.wishlistItems,
      icon: <Heart className="w-6 h-6" />,
      color: "from-pink-500 to-rose-500",
      description: "Saved properties"
    },
    {
      label: "Past Trips",
      value: data.stats.pastTrips,
      icon: <CheckCircle className="w-6 h-6" />,
      color: "from-emerald-500 to-green-500",
      description: "Completed stays"
    },
    {
      label: "Reviews",
      value: data.stats.reviews,
      icon: <Star className="w-6 h-6" />,
      color: "from-amber-500 to-orange-500",
      description: "Properties reviewed"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <MotionDiv
            key={stat.label}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">
                  {stat.label}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {stat.description}
                </p>
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white`}>
                {stat.icon}
              </div>
            </div>
          </MotionDiv>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Bookings */}
        <MotionDiv
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Upcoming Bookings
            </h3>
            <Calendar className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="space-y-4">
            {data.upcomingBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-all duration-300"
              >
                <img
                  src={booking.image}
                  alt={booking.property}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {booking.property}
                  </h4>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(booking.checkIn).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {booking.guests} guests
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ৳{booking.totalPrice}
                    </span>
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 rounded-full text-xs font-medium">
                      {booking.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </MotionDiv>

        {/* Recommendations */}
        <MotionDiv
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recommended for You
            </h3>
            <Star className="w-5 h-5 text-amber-500" />
          </div>
          <div className="space-y-4">
            {[
              {
                name: "Sundarbans Eco Resort",
                location: "Khulna",
                price: 5600,
                rating: 4.8,
                image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=500&auto=format&fit=crop"
              },
              {
                name: "Heritage Home Old Dhaka",
                location: "Dhaka",
                price: 3200,
                rating: 4.6,
                image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?q=80&w=500&auto=format&fit=crop"
              }
            ].map((property, index) => (
              <div
                key={property.name}
                className="flex gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-all duration-300"
              >
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {property.name}
                  </h4>
                  <div className="flex items-center gap-1 mt-1 text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ৳{property.price}/night
                    </span>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium">{property.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </MotionDiv>
      </div>
    </div>
  );
};

// Search Section Component
const SearchSection = () => {
  const [filters, setFilters] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    priceRange: [500, 10000],
    propertyType: "any",
    amenities: []
  });

  const amenitiesList = ["wifi", "parking", "ac", "kitchen", "pool", "breakfast"];

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Location
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Where are you going?"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Check-in
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="date"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Check-out
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="date"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Guests
            </label>
            <div className="relative">
              <Users className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <select className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700">
                {[1,2,3,4,5,6].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
            <Search className="w-4 h-4" />
            Search Stays
          </button>
          <button className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl font-medium hover:shadow-md transition-all duration-300">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </MotionDiv>

      {/* Search Results / Trending */}
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Trending Destinations in Bangladesh
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Cox's Bazar",
              properties: 156,
              image: "https://images.unsplash.com/photo-1619177383949-f03975e50b19?q=80&w=500&auto=format&fit=crop",
              startingPrice: 2500
            },
            {
              name: "Sylhet",
              properties: 89,
              image: "https://images.unsplash.com/photo-1634962546038-b7eddb268dd7?q=80&w=500&auto=format&fit=crop",
              startingPrice: 1800
            },
            {
              name: "Saint Martin",
              properties: 34,
              image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=500&auto=format&fit=crop",
              startingPrice: 3500
            }
          ].map((destination, index) => (
            <MotionDiv
              key={destination.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative rounded-2xl overflow-hidden group cursor-pointer"
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h4 className="font-bold text-lg">{destination.name}</h4>
                <p className="text-sm opacity-90">{destination.properties} properties</p>
                <p className="text-sm font-semibold mt-1">From ৳{destination.startingPrice}/night</p>
              </div>
            </MotionDiv>
          ))}
        </div>
      </MotionDiv>
    </div>
  );
};

// Bookings Section Component
const BookingsSection = ({ data }) => {
  const [activeTab, setActiveTab] = useState("upcoming");

  const tabs = [
    { id: "upcoming", label: "Upcoming", count: data.upcomingBookings.length },
    { id: "past", label: "Past", count: data.pastBookings.length },
    { id: "cancelled", label: "Cancelled", count: 0 }
  ];

  const getStatusColor = (status) => {
    const colors = {
      confirmed: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
      pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
      completed: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Bookings</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-medium hover:shadow-md transition-all duration-300">
          <Download className="w-4 h-4" />
          Export All
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all duration-300 ${
              activeTab === tab.id
                ? "border-emerald-500 text-emerald-600 dark:text-emerald-400 font-semibold"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            {tab.label}
            <span className={`px-2 py-1 rounded-full text-xs ${
              activeTab === tab.id
                ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300"
                : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {activeTab === "upcoming" && data.upcomingBookings.map((booking) => (
          <MotionDiv
            key={booking.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              <img
                src={booking.image}
                alt={booking.property}
                className="w-full lg:w-48 h-40 rounded-xl object-cover"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {booking.property}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">Hosted by {booking.host}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Check-in</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {new Date(booking.checkIn).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Check-out</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {new Date(booking.checkOut).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Price</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      ৳{booking.totalPrice}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button className="px-4 py-2 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-colors">
                    Contact Host
                  </button>
                  <button className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    Modify Booking
                  </button>
                  <button className="px-4 py-2 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors">
                    Cancel Booking
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    <Download className="w-4 h-4" />
                    Invoice
                  </button>
                </div>
              </div>
            </div>
          </MotionDiv>
        ))}

        {activeTab === "past" && data.pastBookings.map((booking) => (
          <MotionDiv
            key={booking.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              <img
                src={booking.image}
                alt={booking.property}
                className="w-full lg:w-48 h-40 rounded-xl object-cover"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {booking.property}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Dates</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Paid</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      ৳{booking.totalPrice}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Review</p>
                    {booking.reviewed ? (
                      <p className="text-emerald-600 dark:text-emerald-400 font-medium">Reviewed</p>
                    ) : (
                      <button className="text-amber-600 dark:text-amber-400 font-medium hover:underline">
                        Leave Review
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </MotionDiv>
        ))}
      </div>
    </div>
  );
};

// Wishlist Section Component
const WishlistSection = ({ data }) => {
  const [collections, setCollections] = useState([
    { id: 1, name: "All Items", count: data.wishlist.length },
    { id: 2, name: "Nature Getaways", count: 3 },
    { id: 3, name: "City Stays", count: 2 },
    { id: 4, name: "Beach Trips", count: 2 },
    { id: 5, name: "Business Travel", count: 1 }
  ]);
  const [activeCollection, setActiveCollection] = useState(1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Wishlist</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
          <Plus className="w-4 h-4" />
          New Collection
        </button>
      </div>

      {/* Collections */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {collections.map((collection) => (
          <button
            key={collection.id}
            onClick={() => setActiveCollection(collection.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl transition-all duration-300 ${
              activeCollection === collection.id
                ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600"
            }`}
          >
            {collection.name}
            <span className="ml-2 text-xs opacity-80">({collection.count})</span>
          </button>
        ))}
      </div>

      {/* Wishlist Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.wishlist.map((item, index) => (
          <MotionDiv
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <button className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:scale-110 transition-transform duration-300">
                <Heart className="w-5 h-5 fill-red-500 text-red-500" />
              </button>
              <div className="absolute top-4 left-4">
                <span className="px-2 py-1 bg-black/70 text-white text-xs rounded-full">
                  {item.collection}
                </span>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 mb-3">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{item.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    ৳{item.price}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">/night</span>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium">{item.rating}</span>
                </div>
              </div>
              <button className="w-full mt-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                Book Now
              </button>
            </div>
          </MotionDiv>
        ))}
      </div>
    </div>
  );
};

// Placeholder components for other sections
const MessagesSection = () => (
  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Messages</h2>
    <p className="text-gray-600 dark:text-gray-400">Real-time chat interface with hosts will be implemented here.</p>
  </div>
);

const ReviewsSection = () => (
  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Reviews & Ratings</h2>
    <p className="text-gray-600 dark:text-gray-400">Review management system will be implemented here.</p>
  </div>
);

const ProfileSection = ({ data }) => (
  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Profile & Settings</h2>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {/* Personal Information */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
              <input type="text" defaultValue={data.user.name} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <input type="email" defaultValue={data.user.email} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
              <input type="tel" defaultValue={data.user.phone} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-600" />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Security</h3>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-white dark:hover:bg-gray-600 transition-colors">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-emerald-500" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security</p>
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
                  <p className="font-medium text-gray-900 dark:text-white">Payment Methods</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Manage your payment options</p>
                </div>
              </div>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl p-6 text-white">
        <div className="text-center">
          <img
            src={data.user.avatar}
            alt={data.user.name}
            className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-white/20"
          />
          <h3 className="font-bold text-lg">{data.user.name}</h3>
          <p className="text-emerald-100">{data.user.email}</p>
          <div className="flex items-center justify-center gap-1 mt-2">
            <Shield className="w-4 h-4" />
            <span className="text-sm">Verified Traveler</span>
          </div>
          <p className="text-sm text-emerald-100 mt-4">Member since {new Date(data.user.joinDate).getFullYear()}</p>
        </div>
      </div>
    </div>
  </div>
);

export default GuestDashboard;