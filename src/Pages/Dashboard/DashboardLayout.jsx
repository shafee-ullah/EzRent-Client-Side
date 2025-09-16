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
    <div className="w-11/12 mx-auto py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Welcome back! Here's your overview.
          </p>
        </div>
        <div>
          <button className="btn rounded-2xl bg-gray-200 dark:bg-gray-800">
            Settings
          </button>
        </div>
      </div>

      <div className="mt-5 flex gap-3">
        <button
          onClick={() => handleTab("guest")}
          className={`px-4 py-2 rounded-2xl font-semibold ${
            isGuest ? "bg-green-600 text-white" : "bg-gray-200 dark:bg-gray-800"
          }`}
        >
          Guest Dashboard
        </button>
        <button
          onClick={() => handleTab("host")}
          className={`px-4 py-2 rounded-2xl font-semibold ${
            !isGuest
              ? "bg-green-600 text-white"
              : "bg-gray-200 dark:bg-gray-800"
          }`}
        >
          Host Dashboard
        </button>
        <div className="ml-auto">
          <NavLink
            to="/properties/add"
            className="rounded-2xl px-5 py-2 font-semibold text-white bg-[var(--btn-primary)] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-green-400/70 dark:bg-[var(--btn-primary)]"
          >
            Add Property
          </NavLink>
        </div>
      </div>

      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
