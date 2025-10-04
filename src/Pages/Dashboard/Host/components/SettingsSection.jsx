import React from "react";
import { Shield } from "lucide-react";

const SettingsSection = ({ data }) => (
  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
      Profile & Settings
    </h2>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                defaultValue={data.user.name}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                defaultValue={data.user.email}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone
              </label>
              <input
                type="tel"
                defaultValue={data.user.phone}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-600"
              />
            </div>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Security
          </h3>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-white dark:hover:bg-gray-600 transition-colors">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-emerald-500" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Two-Factor Authentication
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Add an extra layer of security
                  </p>
                </div>
              </div>
              <div className="w-10 h-6 bg-gray-300 dark:bg-gray-600 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 transition-transform duration-300" />
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl p-6 text-white">
        <div className="text-center">
          <img
            src={data.user.avatar}
            alt={data.user.name}
            className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-white/20"
          />
          <h3 className="font-bold text-lg">{data.user.name}</h3>
          <p className="text-emerald-100">{data.user.email}</p>
          <div className="flex items-center justify-center gap-1 mt-2">
            <Shield className="w-4 h-4" />
            <span className="text-sm">Verified Host</span>
          </div>
          <p className="text-sm text-emerald-100 mt-4">
            Member since {new Date(data.user.joinDate).getFullYear()}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default SettingsSection;
