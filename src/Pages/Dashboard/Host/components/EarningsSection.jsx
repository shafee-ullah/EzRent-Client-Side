import React from "react";
import { Download, Upload } from "lucide-react";

const EarningsSection = ({ data, formatCurrency }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Earnings & Payouts
        </h2>
        
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/80 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Earnings
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {formatCurrency(data.earnings.total)}
              </p>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Available for Payout
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {formatCurrency(data.earnings.available)}
              </p>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Service Fees
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {formatCurrency(data.earnings.serviceFees)}
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
                    <span className="text-white font-bold text-xs">Bkash</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      bKash
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
              <button className="w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-gray-500 dark:text-gray-400 hover:border-emerald-500 hover:text-emerald-500 transition-colors">
                + Add Payout Method
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Payouts
          </h3>
          <div className="space-y-4">
            {[
              {
                date: "2024-06-01",
                amount: 45200,
                method: "bKash",
                status: "completed",
              },
              {
                date: "2024-05-15",
                amount: 38900,
                method: "Bank",
                status: "completed",
              },
              {
                date: "2024-05-01",
                amount: 56700,
                method: "bKash",
                status: "completed",
              },
            ].map((payout, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(payout.amount)}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(payout.date).toLocaleDateString()} •{" "}
                    {payout.method}
                  </p>
                </div>
                <span className="px-2 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 rounded-full text-xs font-medium">
                  {payout.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningsSection;
