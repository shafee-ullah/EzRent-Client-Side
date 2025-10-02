import React from "react";
import { Download } from "lucide-react";

const PaymentsSection = ({ formatCurrency }) => (
  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
      Payments & Earnings
    </h2>
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
    <p className="text-gray-600 dark:text-gray-400">
      Payment monitoring and payout management system.
    </p>
  </div>
);

export default PaymentsSection;
