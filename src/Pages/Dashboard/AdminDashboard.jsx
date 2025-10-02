import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Home,
  Calendar,
  DollarSign,
  Star,
  Settings,
  Shield,
  TrendingUp,
  AlertTriangle,
  Download,
  Filter,
  Search,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  BarChart3,
  FileText,
  CreditCard,
  MessageCircle,
  Bell,
  ChevronDown,
  LogOut
} from "lucide-react";

const MotionDiv = motion.div;

// Mock data for admin dashboard
const mockAdminData = {
  user: {
    name: "Admin User",
    email: "admin@travelbd.com",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
    role: "Platform Administrator",
    joinDate: "2022-05-10",
    verified: true
  },
  overview: {
    totalUsers: 15420,
    totalHosts: 3245,
    activeListings: 8765,
    totalBookings: 45230,
    totalRevenue: 12560000,
    monthlyBookings: [
      { month: 'Jan', bookings: 3200, revenue: 850000 },
      { month: 'Feb', bookings: 3800, revenue: 920000 },
      { month: 'Mar', bookings: 4200, revenue: 1050000 },
      { month: 'Apr', bookings: 3900, revenue: 980000 },
      { month: 'May', bookings: 4500, revenue: 1120000 },
      { month: 'Jun', bookings: 5200, revenue: 1256000 },
    ]
  },
  alerts: [
    {
      id: 1,
      type: "fraud",
      message: "Suspicious booking pattern detected for user #7842",
      severity: "high",
      time: "2 hours ago"
    },
    {
      id: 2,
      type: "review",
      message: "3 reviews flagged for inappropriate content",
      severity: "medium",
      time: "5 hours ago"
    },
    {
      id: 3,
      type: "payment",
      message: "Payment dispute requires attention",
      severity: "high",
      time: "1 day ago"
    }
  ],
  pendingActions: {
    hostRegistrations: 23,
    propertyListings: 45,
    payoutRequests: 18,
    flaggedReviews: 12
  }
};

// Recharts imports
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [adminData, setAdminData] = useState(mockAdminData);

  const navigationItems = [
    { id: "overview", label: "Overview", icon: <BarChart3 className="w-5 h-5" /> },
    { id: "users", label: "User Management", icon: <Users className="w-5 h-5" /> },
    { id: "properties", label: "Property Management", icon: <Home className="w-5 h-5" /> },
    { id: "bookings", label: "Booking Management", icon: <Calendar className="w-5 h-5" /> },
    { id: "payments", label: "Payments & Earnings", icon: <DollarSign className="w-5 h-5" /> },
    { id: "reviews", label: "Content Moderation", icon: <Star className="w-5 h-5" /> },
    { id: "analytics", label: "Reports & Analytics", icon: <TrendingUp className="w-5 h-5" /> },
    { id: "settings", label: "Platform Settings", icon: <Settings className="w-5 h-5" /> }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewSection data={adminData} formatCurrency={formatCurrency} formatNumber={formatNumber} />;
      case "users":
        return <UserManagementSection />;
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
        return <OverviewSection data={adminData} formatCurrency={formatCurrency} formatNumber={formatNumber} />;
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
              Platform management and analytics for {formatNumber(adminData.overview.totalUsers)} users 🛡️
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

              {/* Pending Actions Card */}
              <div className="mt-6 p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-3">
                  Pending Actions
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-amber-700 dark:text-amber-400">Host Registrations</span>
                    <span className="px-2 py-1 bg-amber-500 text-white rounded-full text-xs font-bold">
                      {adminData.pendingActions.hostRegistrations}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-amber-700 dark:text-amber-400">Property Listings</span>
                    <span className="px-2 py-1 bg-amber-500 text-white rounded-full text-xs font-bold">
                      {adminData.pendingActions.propertyListings}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-amber-700 dark:text-amber-400">Payout Requests</span>
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

// Overview Section Component
const OverviewSection = ({ data, formatCurrency, formatNumber }) => {
  const stats = [
    {
      label: "Total Users",
      value: formatNumber(data.overview.totalUsers),
      icon: <Users className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      description: "Guests + Hosts"
    },
    {
      label: "Active Hosts",
      value: formatNumber(data.overview.totalHosts),
      icon: <Users className="w-6 h-6" />,
      color: "from-emerald-500 to-green-500",
      description: "Verified hosts"
    },
    {
      label: "Active Listings",
      value: formatNumber(data.overview.activeListings),
      icon: <Home className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      description: "Available properties"
    },
    {
      label: "Total Bookings",
      value: formatNumber(data.overview.totalBookings),
      icon: <Calendar className="w-6 h-6" />,
      color: "from-amber-500 to-orange-500",
      description: "All-time bookings"
    },
    {
      label: "Platform Revenue",
      value: formatCurrency(data.overview.totalRevenue),
      icon: <DollarSign className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      description: "Total commission"
    },
    {
      label: "Monthly Growth",
      value: "+12.5%",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-teal-500 to-cyan-500",
      description: "vs last month"
    }
  ];

  const systemHealth = [
    { name: 'Uptime', value: 99.9, status: 'excellent' },
    { name: 'Response Time', value: 120, status: 'good' },
    { name: 'Error Rate', value: 0.2, status: 'good' },
    { name: 'Active Sessions', value: 1247, status: 'normal' }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        {/* Revenue & Bookings Chart */}
        <MotionDiv
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Platform Performance
            </h3>
            <TrendingUp className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.overview.monthlyBookings}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'revenue' ? formatCurrency(value) : value,
                    name === 'revenue' ? 'Revenue' : 'Bookings'
                  ]}
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="bookings" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  name="bookings"
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  name="revenue"
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </MotionDiv>

        {/* System Alerts & Health */}
        <div className="space-y-6">
          {/* System Alerts */}
          <MotionDiv
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                System Alerts
              </h3>
              <AlertTriangle className="w-5 h-5 text-amber-500" />
            </div>
            <div className="space-y-4">
              {data.alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-xl border ${
                    alert.severity === 'high' 
                      ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
                      : 'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {alert.message}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {alert.time}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      alert.severity === 'high' 
                        ? 'bg-red-500 text-white'
                        : 'bg-amber-500 text-white'
                    }`}>
                      {alert.severity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </MotionDiv>

          {/* System Health */}
          <MotionDiv
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              System Health
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {systemHealth.map((metric, index) => (
                <div key={metric.name} className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {typeof metric.value === 'number' && metric.value < 10 ? metric.value + '%' : metric.value}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{metric.name}</p>
                  <div className={`w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full mt-2`}>
                    <div 
                      className={`h-2 rounded-full ${
                        metric.status === 'excellent' ? 'bg-emerald-500' :
                        metric.status === 'good' ? 'bg-green-500' : 'bg-amber-500'
                      }`}
                      style={{ width: metric.status === 'excellent' ? '100%' : '85%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </MotionDiv>
        </div>
      </div>
    </div>
  );
};

// User Management Section Component
const UserManagementSection = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Fatima Begum",
      email: "fatima@example.com",
      role: "guest",
      status: "active",
      joinDate: "2024-01-15",
      bookings: 12,
      verified: true
    },
    {
      id: 2,
      name: "Ahmad Rahman",
      email: "ahmad@example.com",
      role: "host",
      status: "pending",
      joinDate: "2024-02-20",
      listings: 3,
      verified: false
    },
    {
      id: 3,
      name: "Rajib Hasan",
      email: "rajib@example.com",
      role: "guest",
      status: "suspended",
      joinDate: "2024-01-08",
      bookings: 5,
      verified: true
    }
  ]);

  const [filter, setFilter] = useState("all");

  const getStatusColor = (status) => {
    const colors = {
      active: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
      pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
      suspended: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getRoleColor = (role) => {
    return role === "host" 
      ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
      : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h2>
        <div className="flex items-center gap-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Users</option>
            <option value="guest">Guests</option>
            <option value="host">Hosts</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-medium hover:shadow-md transition-all duration-300">
            <Download className="w-4 h-4" />
            Export Users
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {user.name}
                          {user.verified && <Shield className="w-4 h-4 text-emerald-500 inline ml-1" />}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {new Date(user.joinDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {user.role === 'host' ? `${user.listings} listings` : `${user.bookings} bookings`}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {user.status === 'pending' && (
                        <>
                          <button className="p-1 text-emerald-600 hover:text-emerald-700">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-red-600 hover:text-red-700">
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      {user.status === 'active' && (
                        <button className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors">
                          Suspend
                        </button>
                      )}
                      {user.status === 'suspended' && (
                        <button className="px-3 py-1 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors">
                          Activate
                        </button>
                      )}
                      <button className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Property Management Section Component
const PropertyManagementSection = () => {
  const [properties, setProperties] = useState([
    {
      id: 1,
      title: "Luxury Apartment Gulshan",
      host: "Ahmad Rahman",
      location: "Dhaka",
      status: "approved",
      price: 4500,
      createdAt: "2024-05-15",
      bookings: 24
    },
    {
      id: 2,
      title: "Beachfront Villa Cox's Bazar",
      host: "Sarwar Islam",
      location: "Cox's Bazar",
      status: "pending",
      price: 8900,
      createdAt: "2024-06-01",
      bookings: 0
    },
    {
      id: 3,
      title: "Mountain View Cottage",
      host: "Nusrat Jahan",
      location: "Sylhet",
      status: "rejected",
      price: 3200,
      createdAt: "2024-05-28",
      bookings: 0
    }
  ]);

  const [filter, setFilter] = useState("all");

  const getStatusColor = (status) => {
    const colors = {
      approved: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
      pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
      rejected: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Property Management</h2>
        <div className="flex items-center gap-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Properties</option>
            <option value="pending">Pending Approval</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-medium hover:shadow-md transition-all duration-300">
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property, index) => (
          <MotionDiv
            key={property.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2">
                  {property.title}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                  {property.status}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Host: {property.host}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  <span>{property.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{property.bookings} bookings</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  ৳{property.price}
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">/night</span>
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(property.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="flex gap-2">
                {property.status === 'pending' && (
                  <>
                    <button className="flex-1 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors">
                      Approve
                    </button>
                    <button className="flex-1 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors">
                      Reject
                    </button>
                  </>
                )}
                {property.status === 'approved' && (
                  <button className="flex-1 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors">
                    Remove
                  </button>
                )}
                <button className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          </MotionDiv>
        ))}
      </div>
    </div>
  );
};

// Placeholder components for other sections
const BookingManagementSection = () => (
  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Booking Management</h2>
    <p className="text-gray-600 dark:text-gray-400">Complete booking management interface with monitoring and override capabilities.</p>
  </div>
);

const PaymentsSection = ({ formatCurrency }) => (
  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Payments & Earnings</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
        <p className="text-sm opacity-90">Platform Revenue</p>
        <p className="text-2xl font-bold mt-2">{formatCurrency(12560000)}</p>
      </div>
      <div className="bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl p-6 text-white">
        <p className="text-sm opacity-90">Pending Payouts</p>
        <p className="text-2xl font-bold mt-2">{formatCurrency(1568000)}</p>
      </div>
      <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-6 text-white">
        <p className="text-sm opacity-90">Commission Rate</p>
        <p className="text-2xl font-bold mt-2">12%</p>
      </div>
    </div>
    <p className="text-gray-600 dark:text-gray-400">Payment monitoring and payout management system.</p>
  </div>
);

const ReviewsModerationSection = () => (
  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Content Moderation</h2>
    <p className="text-gray-600 dark:text-gray-400">Review moderation system with flag management and approval workflows.</p>
  </div>
);

const AnalyticsSection = ({ formatCurrency }) => {
  const topDestinations = [
    { name: 'Cox\'s Bazar', bookings: 12450, revenue: 31200000 },
    { name: 'Dhaka', bookings: 9850, revenue: 24500000 },
    { name: 'Sylhet', bookings: 7650, revenue: 18900000 },
    { name: 'Chattogram', bookings: 5420, revenue: 13500000 },
    { name: 'Saint Martin', bookings: 3210, revenue: 9800000 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
          <Download className="w-4 h-4" />
          Export Full Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Top Destinations */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Top Destinations</h3>
          <div className="space-y-4">
            {topDestinations.map((destination, index) => (
              <div key={destination.name} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{destination.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{destination.bookings} bookings</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-white">{formatCurrency(destination.revenue)}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seasonal Performance */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Seasonal Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { season: 'Winter', bookings: 8500, growth: 15 },
                { season: 'Spring', bookings: 10500, growth: 25 },
                { season: 'Summer', bookings: 12800, growth: 32 },
                { season: 'Autumn', bookings: 9200, growth: 18 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="season" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const PlatformSettingsSection = () => (
  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Platform Settings</h2>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Commission Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Platform Commission Rate
              </label>
              <input 
                type="number" 
                defaultValue={12}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-600"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Property Categories</h3>
          <div className="space-y-2">
            {['Apartment', 'Villa', 'Studio', 'Cottage', 'Hotel', 'Resort'].map(category => (
              <div key={category} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                <span className="text-gray-900 dark:text-white">{category}</span>
                <div className="flex gap-2">
                  <button className="p-1 text-emerald-600 hover:text-emerald-700">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">System Configuration</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Auto-approve Hosts</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Automatically approve new host registrations</p>
              </div>
              <div className="w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Email Notifications</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Send system-wide notifications</p>
              </div>
              <div className="w-12 h-6 bg-emerald-500 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AdminDashboard;