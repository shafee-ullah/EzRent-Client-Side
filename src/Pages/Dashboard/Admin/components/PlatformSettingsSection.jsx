import React from "react";
import { Edit, Trash2 } from "lucide-react";

const PlatformSettingsSection = () => (
  <div className="bg-white/80 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
      Platform Settings
    </h2>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Commission Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Platform Commission Rate
              </label>
              <input
                type="number"
                defaultValue={12}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-600"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Property Categories
          </h3>
          <div className="space-y-2">
            {["Apartment", "Villa", "Studio", "Cottage", "Hotel", "Resort"].map(
              (category) => (
                <div
                  key={category}
                  className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg"
                >
                  <span className="text-gray-900 dark:text-white">
                    {category}
                  </span>
                  <div className="flex gap-2">
                    <button className="p-1 text-emerald-600 hover:text-emerald-700">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            System Configuration
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Auto-approve Hosts
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Automatically approve new host registrations
                </p>
              </div>
              <div className="w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Email Notifications
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Send system-wide notifications
                </p>
              </div>
              <div className="w-12 h-6 bg-emerald-500 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PlatformSettingsSection;
