import React, { useEffect } from "react";
import { Download, Upload } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchHostPayments, 
  selectHostPayments,
  selectIsFetchingHostPayments,
  selectHostPaymentsError
} from "../../../../redux/paymentSlice";

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

  // Calculate earnings from real payment data
  const totalEarnings = hostPayments.reduce((sum, p) => sum + (p.amount || 0), 0);
  
  // Calculate service fees (assuming 10% platform fee)
  const serviceFeeRate = 0.10;
  const totalServiceFees = totalEarnings * serviceFeeRate;
  
  // Calculate available for payout (total minus service fees)
  const availableForPayout = totalEarnings - totalServiceFees;
  
  // Filter only successful payments
  const successfulPayments = hostPayments.filter(
    p => p.paymentStatus === "succeeded"
  );

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
      <div className="flex items-center justify-between">
        {/* <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Earnings & Payouts
        </h2> */}
        {hostPayments.length > 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {successfulPayments.length} successful payment{successfulPayments.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/80 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Earnings
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {formatCurrency(totalEarnings)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                From {successfulPayments.length} booking{successfulPayments.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Available for Payout
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {formatCurrency(availableForPayout)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                After platform fees
              </p>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Service Fees (10%)
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {formatCurrency(totalServiceFees)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Platform commission
              </p>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
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
              {/* <button className="w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-gray-500 dark:text-gray-400 hover:border-emerald-500 hover:text-emerald-500 transition-colors">
                + Add Payout Method
              </button> */}
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
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
    </div>
  );
};

export default EarningsSection;
