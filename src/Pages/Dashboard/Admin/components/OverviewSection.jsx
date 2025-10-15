import React, { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Home,
  Calendar,
  DollarSign,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { fetchTotalBookings } from "../../../../redux/bookingStateSlice";
import { selectAllPayments } from "../../../../redux/paymentSlice";

const MotionDiv = motion.div;

const OverviewSection = ({ data, formatCurrency, formatNumber }) => {
  // Redux state selectors
  const { users } = useSelector((state) => state.users);
  const { items } = useSelector((state) => state.products);
  const { totalBookings, loading, error } = useSelector((state) => state.bookingStats);
  const allPayments = useSelector(selectAllPayments);

  const dispatch = useDispatch();

  // Fetch total bookings on component mount
  useEffect(() => {
    dispatch(fetchTotalBookings());
  }, [dispatch]);

  // Calculate platform revenue from payments
  const { platformRevenue } = useMemo(() => {
    const total = allPayments.reduce((sum, p) => sum + p.amount, 0);
    const commissionRate = 0.12; // 12%
    const platformRev = total * commissionRate;

    return {
      totalRevenue: total,
      platformRevenue: platformRev,
      commissionRate: commissionRate * 100,
    };
  }, [allPayments]);

  // Filter active hosts from users
  const activeHosts = useMemo(() => {
    if (!users) return [];
    return users.filter(
      (user) => user.role === "host" && user.isActive !== false
    );
  }, [users]);

  // Statistics cards data
  const stats = [
    {
      label: "Total Users",
      value: formatNumber(users?.length || 0),
      icon: <Users className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      description: "Guests + Hosts",
    },
    {
      label: "Active Hosts",
      value: formatNumber(activeHosts?.length || 0),
      icon: <Users className="w-6 h-6" />,
      color: "from-emerald-500 to-green-500",
      description: "Verified hosts",
    },
    {
      label: "Active Listings",
      value: formatNumber(items?.length || 0),
      icon: <Home className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      description: "Available properties",
    },
    {
      label: "Total Bookings",
      value: formatNumber(totalBookings || 0),
      icon: <Calendar className="w-6 h-6" />,
      color: "from-amber-500 to-orange-500",
      description: "All-time bookings",
    },
    {
      label: "Platform Revenue",
      value: formatCurrency(platformRevenue || 0),
      icon: <DollarSign className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      description: "Total commission",
    },
    {
      label: "Monthly Growth",
      value: "+12.5%",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-teal-500 to-cyan-500",
      description: "vs last month",
    },
  ];

  // System health metrics
  const systemHealth = [
    { name: "Uptime", value: 99.9, status: "excellent" },
    { name: "Response Time", value: 120, status: "good" },
    { name: "Error Rate", value: 0.2, status: "good" },
    { name: "Active Sessions", value: 1247, status: "normal" },
  ];

  // Loading and error states
  if (loading) return <p>Loading total bookings...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="space-y-6">
      {/* Statistics Cards Grid */}
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
              <div
                className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white`}
              >
                {stat.icon}
              </div>
            </div>
          </MotionDiv>
        ))}
      </div>

      {/* Charts and Additional Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
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
                    name === "revenue" ? formatCurrency(value) : value,
                    name === "revenue" ? "Revenue" : "Bookings",
                  ]}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="bookings"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  name="bookings"
                  dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  strokeWidth={3}
                  name="revenue"
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </MotionDiv>

        {/* Alerts and System Health */}
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
                  className={`p-4 rounded-xl border ${alert.severity === "high"
                      ? "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
                      : "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800"
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
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${alert.severity === "high"
                          ? "bg-red-500 text-white"
                          : "bg-amber-500 text-white"
                        }`}
                    >
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
              {systemHealth.map((metric) => (
                <div
                  key={metric.name}
                  className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                >
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {typeof metric.value === "number" && metric.value < 10
                      ? metric.value + "%"
                      : metric.value}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {metric.name}
                  </p>
                  <div
                    className={`w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full mt-2`}
                  >
                    <div
                      className={`h-2 rounded-full ${metric.status === "excellent"
                          ? "bg-emerald-500"
                          : metric.status === "good"
                            ? "bg-green-500"
                            : "bg-amber-500"
                        }`}
                      style={{
                        width: metric.status === "excellent" ? "100%" : "85%",
                      }}
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

export default OverviewSection;