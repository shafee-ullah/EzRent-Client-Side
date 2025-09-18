import React from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router";

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isGuest = location.pathname.includes("/dashboard/guest");

  const handleTab = (tab) => {
    navigate(tab === "guest" ? "/dashboard/guest" : "/dashboard/host");
  };

  return (
    <div className="w-11/12 mx-auto py-4 md:py-6 px-2 md:px-0">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500 mt-1 text-sm md:text-base">
            Welcome back! Here's your overview.
          </p>
        </div>
        <div className="flex-shrink-0">
          <button className="w-full sm:w-auto rounded-2xl px-4 py-2 font-semibold text-white bg-[var(--btn-primary)] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-green-400/70 dark:bg-[var(--btn-primary)]">
            Settings
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => handleTab("guest")}
            className={`flex-1 sm:flex-none px-3 md:px-4 py-2 rounded-2xl font-semibold text-sm md:text-base ${
              isGuest
                ? "bg-green-600 text-white"
                : "bg-gray-200 dark:bg-gray-800"
            }`}
          >
            Guest
          </button>
          <button
            onClick={() => handleTab("host")}
            className={`flex-1 sm:flex-none px-3 md:px-4 py-2 rounded-2xl font-semibold text-sm md:text-base ${
              !isGuest
                ? "bg-green-600 text-white"
                : "bg-gray-200 dark:bg-gray-800"
            }`}
          >
            Host
          </button>
        </div>
        <div className="flex-1 sm:ml-auto">
          <NavLink
            to="/properties/add"
            className="w-full sm:w-auto inline-block text-center rounded-2xl px-4 py-2 font-semibold text-white bg-green-700 hover:bg-green-600 transition-colors"
          >
            Add Property
          </NavLink>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
