import React from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const MotionDiv = motion.div;

const AnalyticsSection = ({ formatCurrency }) => {
  const topDestinations = [
    { name: "Cox's Bazar", bookings: 12450, revenue: 31200000 },
    { name: "Dhaka", bookings: 9850, revenue: 24500000 },
    { name: "Sylhet", bookings: 7650, revenue: 18900000 },
    { name: "Chattogram", bookings: 5420, revenue: 13500000 },
    { name: "Saint Martin", bookings: 3210, revenue: 9800000 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Reports & Analytics
        </h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
          <Download className="w-4 h-4" />
          Export Full Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Top Destinations
          </h3>
          <div className="space-y-4">
            {topDestinations.map((destination, index) => (
              <div
                key={destination.name}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {destination.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {destination.bookings} bookings
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(destination.revenue)}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Revenue
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Seasonal Performance
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { season: "Winter", bookings: 8500, growth: 15 },
                  { season: "Spring", bookings: 10500, growth: 25 },
                  { season: "Summer", bookings: 12800, growth: 32 },
                  { season: "Autumn", bookings: 9200, growth: 18 },
                ]}
              >
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

export default AnalyticsSection;
