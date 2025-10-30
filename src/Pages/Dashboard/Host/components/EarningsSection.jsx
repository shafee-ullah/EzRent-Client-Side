import React, { useEffect, useMemo } from "react";
import { Download, Upload, TrendingUp, DollarSign, Percent } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchHostPayments, 
  selectHostPayments,
  selectIsFetchingHostPayments,
  selectHostPaymentsError
} from "../../../../redux/paymentSlice";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, Cell } from "recharts";

// Mock earnings data for demonstration
const mockMonthlyEarnings = [
  { month: "Jan", earnings: 125000 },
  { month: "Feb", earnings: 185000 },
  { month: "Mar", earnings: 165000 },
  { month: "Apr", earnings: 215000 },
  { month: "May", earnings: 195000 },
  { month: "Jun", earnings: 245000 },
];

const EarningsSection = ({ formatCurrency }) => {
  const dispatch = useDispatch();
  const hostPayments = useSelector(selectHostPayments);
  const isLoading = useSelector(selectIsFetchingHostPayments);
  const error = useSelector(selectHostPaymentsError);
  
  // Get current user from Redux (assuming user data is in products slice)
  const { user } = useSelector((state) => state.products);

  useEffect(() => {
    // Fetch host payments when component mounts or user changes
    if (user?.email) {
      dispatch(fetchHostPayments(user.email));
    }
  }, [dispatch, user?.email]);

  // Calculate earnings from real payment data with mock fallback
  const { totalEarnings, serviceFeeRate, totalServiceFees, availableForPayout, successfulPayments, monthlyData, earningsBreakdown } = useMemo(() => {
    const total = hostPayments.reduce((sum, p) => sum + (p.amount || 0), 0);
    const serviceFeeRate = 0.10;
    const totalFees = total * serviceFeeRate;
    const available = total - totalFees;
    const successful = hostPayments.filter(p => p.paymentStatus === "succeeded");

    // Generate monthly data from payments
    let monthly = [];
    
    if (hostPayments.length > 0) {
      const monthlyMap = {};
      hostPayments.forEach(payment => {
        const date = new Date(payment.createdAt);
        const monthKey = date.toLocaleDateString('en-US', { month: 'short' });
        if (!monthlyMap[monthKey]) {
          monthlyMap[monthKey] = 0;
        }
        monthlyMap[monthKey] += payment.amount;
      });

      monthly = Object.keys(monthlyMap).map(month => ({
        month,
        earnings: monthlyMap[month]
      }));
    }

    // Use mock data if no real data or insufficient data points
    const finalMonthlyData = monthly.length >= 3 ? monthly : mockMonthlyEarnings;

    // Calculate totals from mock data if no real payments
    const displayTotal = total > 0 ? total : mockMonthlyEarnings.reduce((sum, m) => sum + m.earnings, 0);
    const displayFees = total > 0 ? totalFees : displayTotal * serviceFeeRate;
    const displayAvailable = total > 0 ? available : displayTotal - displayFees;

    // Earnings breakdown for bar chart
    const breakdown = [
      { name: "Total Earnings", value: displayTotal, color: "#3b82f6" },
      { name: "Available", value: displayAvailable, color: "#10b981" },
      { name: "Service Fees", value: displayFees, color: "#f59e0b" },
    ];

    return {
      totalEarnings: displayTotal,
      serviceFeeRate,
      totalServiceFees: displayFees,
      availableForPayout: displayAvailable,
      successfulPayments: successful.length > 0 ? successful : [],
      monthlyData: finalMonthlyData,
      earningsBreakdown: breakdown
    };
  }, [hostPayments]);

  // Custom Tooltip for charts
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {payload[0].name || payload[0].payload.month}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading earnings data...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-red-600 dark:text-red-400 font-medium mb-2">Failed to load earnings</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{error}</p>
            <button
              onClick={() => user?.email && dispatch(fetchHostPayments(user.email))}
              className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium opacity-90">Total Earnings</p>
              <DollarSign className="w-5 h-5 opacity-80" />
            </div>
            <p className="text-3xl font-bold">{formatCurrency(totalEarnings)}</p>
            <div className="flex items-center gap-1 mt-2 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span className="opacity-90">From {successfulPayments.length} booking{successfulPayments.length !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-emerald-600 to-green-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium opacity-90">Available Payout</p>
              <DollarSign className="w-5 h-5 opacity-80" />
            </div>
            <p className="text-3xl font-bold">{formatCurrency(availableForPayout)}</p>
            <div className="flex items-center gap-1 mt-2 text-sm">
              <Percent className="w-4 h-4" />
              <span className="opacity-90">After platform fees</span>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden bg-gradient-to-br from-amber-500 via-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium opacity-90">Service Fees</p>
              <Percent className="w-5 h-5 opacity-80" />
            </div>
            <p className="text-3xl font-bold">{formatCurrency(totalServiceFees)}</p>
            <div className="flex items-center gap-1 mt-2 text-sm">
              <Percent className="w-4 h-4" />
              <span className="opacity-90">{(serviceFeeRate * 100).toFixed(0)}% commission</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Earnings Line Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Estimated Future Monthly Earnings
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="earnings"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: '#10b981', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Earnings Breakdown Bar Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Earnings Breakdown
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={earningsBreakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis dataKey="name" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {earningsBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {earningsBreakdown.map((item, index) => (
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

      {/* Payout Methods & Recent Payouts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payout Methods */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Payout Methods
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-8 bg-blue-500 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">Stripe</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Stripe
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    **** 1234
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 rounded-full text-sm font-medium">
                Primary
              </span>
            </div>
          </div>
        </div>

        {/* Recent Payouts */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Payouts
          </h3>
          {successfulPayments.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-400">No payouts yet</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Payouts will appear here once you receive bookings</p>
            </div>
          ) : (
            <div className="space-y-4">
              {successfulPayments.slice(-3).reverse().map((payout, index) => (
                <div
                  key={payout._id || index}
                  className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {formatCurrency(payout.amount)}
                      </p>
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 rounded-full text-xs font-medium">
                        {payout.paymentStatus}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(payout.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })} • {payout.currency?.toUpperCase() || 'USD'}
                    </p>
                    {payout.transactionId && (
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 font-mono">
                        ID: {payout.transactionId.substring(0, 20)}...
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Info Text */}
      <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4">
        <p className="text-sm text-emerald-800 dark:text-emerald-300">
          💡 <strong>Earnings Info:</strong> Your earnings are calculated after a {(serviceFeeRate * 100).toFixed(0)}% platform service fee. Payouts are processed automatically to your primary payment method.
        </p>
      </div>
    </div>
  );
};

export default EarningsSection;
