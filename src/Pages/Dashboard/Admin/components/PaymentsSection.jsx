import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Download, TrendingUp, DollarSign, Percent } from "lucide-react";
import { fetchAllPayments, selectAllPayments } from "../../../../redux/paymentSlice";
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const PaymentsSection = ({ formatCurrency }) => {
  const dispatch = useDispatch();
  const allPayments = useSelector(selectAllPayments);

  // Fetch all payments on mount
  useEffect(() => {
    dispatch(fetchAllPayments());
  }, [dispatch]);

  // Compute totals using useMemo
  const { totalRevenue, platformRevenue, commissionRate, hostRevenue } = useMemo(() => {
    const total = allPayments.reduce((sum, p) => sum + p.amount, 0);
    const commissionRate = 0.12; // 12%
    const platformRev = total * commissionRate;
    const hostRev = total - platformRev;

    return {
      totalRevenue: total,
      platformRevenue: platformRev,
      hostRevenue: hostRev,
      commissionRate: commissionRate * 100,
    };
  }, [allPayments]);

  // Data for Pie Chart (Revenue Distribution)
  const pieData = [
    { name: "Platform Revenue", value: platformRevenue },
    { name: "Host Revenue", value: hostRevenue },
  ];

  // Data for Bar Chart (Revenue Breakdown)
  const barData = [
    { name: "Total Revenue", value: totalRevenue, color: "#3b82f6" },
    { name: "Platform Revenue", value: platformRevenue, color: "#10b981" },
    { name: "Host Revenue", value: hostRevenue, color: "#f59e0b" },
  ];

  const COLORS = ["#10b981", "#3b82f6"];

  // Custom Tooltip for charts
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {payload[0].name}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Payments & Earnings
        </h2>
        {/* <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors">
          <Download className="w-4 h-4" />
          <span className="text-sm font-medium">Export</span>
        </button> */}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium opacity-90">Total Revenue</p>
              <DollarSign className="w-5 h-5 opacity-80" />
            </div>
            <p className="text-3xl font-bold">{formatCurrency(totalRevenue)}</p>
            <div className="flex items-center gap-1 mt-2 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span className="opacity-90">All transactions</span>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-emerald-600 to-green-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium opacity-90">Platform Revenue</p>
              <DollarSign className="w-5 h-5 opacity-80" />
            </div>
            <p className="text-3xl font-bold">{formatCurrency(platformRevenue)}</p>
            <div className="flex items-center gap-1 mt-2 text-sm">
              <Percent className="w-4 h-4" />
              <span className="opacity-90">{commissionRate}% commission</span>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden bg-gradient-to-br from-amber-500 via-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium opacity-90">Host Revenue</p>
              <DollarSign className="w-5 h-5 opacity-80" />
            </div>
            <p className="text-3xl font-bold">{formatCurrency(hostRevenue)}</p>
            <div className="flex items-center gap-1 mt-2 text-sm">
              <Percent className="w-4 h-4" />
              <span className="opacity-90">{100 - commissionRate}% share</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Distribution Pie Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Revenue Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Breakdown Bar Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Revenue Breakdown
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {barData.map((item, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    {item.name}
                  </p>
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(item.value)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Info Text */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
        <p className="text-sm text-blue-800 dark:text-blue-300">
          💡 <strong>Payment System:</strong> Automated monitoring and payout management with {commissionRate}% platform commission on all transactions.
        </p>
      </div>
    </div>
  );
};

export default PaymentsSection;