import React, { useEffect, useMemo } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPayments, selectAllPayments } from "../../../../redux/paymentSlice";

const MotionDiv = motion.div;

const AnalyticsSection = ({ formatCurrency }) => {
  // Calculate key metrics

  const dispatch = useDispatch();
  const payments  = useSelector(selectAllPayments);
  console.log(payments)
  // or if you store all payments somewhere else, adjust accordingly


  // Fetch all payments on mount
  useEffect(() => {
    dispatch(fetchAllPayments());
  }, [dispatch]);
  const { totalRevenue, platformRevenue, averagePayment, commissionRate } = useMemo(() => {
    const total = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
    const count = payments.length || 1;
    const commission = 0.12; // 12%
    const platformRev = total * commission;

    return {
      totalRevenue: total,
      platformRevenue: platformRev,
      averagePayment: total / count,
      commissionRate: commission * 100,
    };
  }, [payments]);

  // Example chart data for monthly payments
  const monthlyData = [
    { month: "Jan", revenue: 8500 },
    { month: "Feb", revenue: 12500 },
    { month: "Mar", revenue: 9800 },
    { month: "Apr", revenue: 14200 },
    { month: "May", revenue: 11700 },
    { month: "Jun", revenue: 15900 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Payment Analytics
        </h2>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
          <p className="text-sm opacity-90">Total Revenue</p>
          <p className="text-2xl font-bold mt-2">{formatCurrency(totalRevenue)}</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl p-6 text-white">
          <p className="text-sm opacity-90">Platform Revenue</p>
          <p className="text-2xl font-bold mt-2">{formatCurrency(platformRevenue)}</p>
        </div>

        <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl p-6 text-white">
          <p className="text-sm opacity-90">Average Payment</p>
          <p className="text-2xl font-bold mt-2">{formatCurrency(averagePayment)}</p>
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-6 text-white">
          <p className="text-sm opacity-90">Commission Rate</p>
          <p className="text-2xl font-bold mt-2">{commissionRate}%</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Earners */}
        <div className="bg-white/80 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Top Earning Hosts
          </h3>
          <div className="space-y-4">
            {[
              { name: "Arafat Rahman", revenue: 21000 },
              { name: "Sadia Hasan", revenue: 17800 },
              { name: "Tanvir Islam", revenue: 15200 },
              { name: "Mim Chowdhury", revenue: 12600 },
              { name: "Zahin Mahmud", revenue: 11300 },
            ].map((host, index) => (
              <div
                key={host.name}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {host.name}
                  </p>
                </div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(host.revenue)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Revenue Chart */}
        <div className="bg-white/80 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Monthly Revenue Growth
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;
