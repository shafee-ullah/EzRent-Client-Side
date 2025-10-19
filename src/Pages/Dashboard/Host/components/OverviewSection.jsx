import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Calendar, DollarSign, Users } from "lucide-react";
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
import { fetchbooking, fetchProducts } from "../../../../redux/PropertieSlice";
import { AuthContext } from "../../../../Context/AuthContext";

const MotionDiv = motion.div;

const OverviewSection = ({ data, formatCurrency }) => {
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  const { properties  } = useSelector((state) => state.products);
  const { bookings,  } = useSelector((state) => state.products);
 
  useEffect(()=>{
    if(user?.email &&!properties.length){
    dispatch(fetchProducts(user?.email))
    
    }
    if(!bookings.length){
      dispatch(fetchbooking())
    }
   
  },[dispatch,user?.email])



  const stats = [
    {
      label: "Total Properties",
      value: properties.length,
      icon: <Home className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      description: "Listed properties",
    },
    {
      label: "Active Bookings",
      value:bookings.filter(booking=>booking.hostemail===user?.email && booking.status==="confirmed").length,
      icon: <Calendar className="w-6 h-6" />,
      color: "from-emerald-500 to-green-500",
      description: "Current bookings",
    },
    {
      label: "Monthly Earnings",
      value: formatCurrency(data.stats.monthlyEarnings),
      icon: <DollarSign className="w-6 h-6" />,
      color: "from-amber-500 to-orange-500",
      description: "This month",
    },
    {
      label: "Pending Requests",
      value: bookings.filter(booking=>booking.hostemail===user?.email && booking.status==="pending").length,
      icon: <Users className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      description: "Booking requests",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <MotionDiv
            key={stat.label}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white/80 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MotionDiv
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/80 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Earnings Overview
            </h3>
            <DollarSign className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.earnings.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [formatCurrency(value), "Earnings"]}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="earnings"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/80 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Bookings
            </h3>
            <Calendar className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="space-y-4">
            {bookings.slice(-2).reverse() .map((booking) => (
              <div
                key={booking.id}
                className="flex gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-all duration-300"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {booking.property}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    by {booking.name}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(booking.Checkin).toLocaleDateString()}
                    </div>
                     <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(booking.Checkout).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {booking.guest} guests
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(booking.price)}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        booking.status === "confirmed"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                      }`}
                    >
                      {booking.status}
                    </span>
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

export default OverviewSection;
