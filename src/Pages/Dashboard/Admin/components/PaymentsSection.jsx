import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Download } from "lucide-react";
import { fetchAllPayments, selectAllPayments } from "../../../../redux/paymentSlice";

const PaymentsSection = ({ formatCurrency }) => {
  const dispatch = useDispatch();
  const allPayments = useSelector(selectAllPayments);
  console.log(allPayments)
// or if you store all payments somewhere else, adjust accordingly


  // Fetch all payments on mount
  useEffect(() => {
    dispatch(fetchAllPayments());
  }, [dispatch]);

  // Compute totals using useMemo
  const { totalRevenue, platformRevenue, commissionRate } = useMemo(() => {
    const total = allPayments.reduce((sum, p) => sum + p.amount, 0);
    const commissionRate = 0.12; // 12%
    const platformRev = total * commissionRate;

    return {
      totalRevenue: total,
      platformRevenue: platformRev,
      commissionRate: commissionRate * 100,
    };
  }, [allPayments]);

  return (
    <div className="bg-white/80 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Payments & Earnings
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
          <p className="text-sm opacity-90">Total Revenue</p>
          <p className="text-2xl font-bold mt-2">{formatCurrency(totalRevenue)}</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl p-6 text-white">
          <p className="text-sm opacity-90">Platform Revenue</p>
          <p className="text-2xl font-bold mt-2">{formatCurrency(platformRevenue)}</p>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-6 text-white">
          <p className="text-sm opacity-90">Commission Rate</p>
          <p className="text-2xl font-bold mt-2">{commissionRate}%</p>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-400">
        Payment monitoring and payout management system.
      </p>
    </div>
  );
};

export default PaymentsSection;
