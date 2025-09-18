import React from "react";

const StatCard = ({ title, value, subtitle, icon }) => (
  <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 bg-[var(--primary-color)]">
    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-500 dark:text-gray-300">{title}</p>
      {icon}
    </div>
    <div className="mt-2 text-3xl font-bold">{value}</div>
    {subtitle && <p className="text-xs text-green-600 mt-1">{subtitle}</p>}
  </div>
);

const PropertyRow = ({ name, city, price, bookings, rating, status }) => (
  <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-4 md:p-5 bg-[var(--primary-color)]">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex-1">
        <h3 className="font-semibold text-sm md:text-base">{name}</h3>
        <p className="text-xs md:text-sm text-gray-500">{city}</p>
        <p className="text-xs md:text-sm text-gray-500">
          ${price}/night • {bookings} bookings • ⭐ {rating}
        </p>
      </div>
      <div className="flex items-center justify-between sm:justify-end gap-3">
        <span
          className={`px-2 md:px-3 py-1 rounded-full text-xs ${
            status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {status}
        </span>
        <div className="flex gap-1 md:gap-2">
          <button className="btn btn-sm rounded-2xl text-xs">👁️</button>
          <button className="btn btn-sm rounded-2xl text-xs">✏️</button>
          <button className="btn btn-sm rounded-2xl text-xs">🗑️</button>
        </div>
      </div>
    </div>
  </div>
);

const HostDashboard = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Properties"
          value={3}
          subtitle="Active listings"
          icon={<span>🏠</span>}
        />
        <StatCard
          title="Total Bookings"
          value={47}
          subtitle="All time"
          icon={<span>📅</span>}
        />
        <StatCard
          title="Monthly Earnings"
          value={"$4250"}
          subtitle="+12% from last month"
          icon={<span>💲</span>}
        />
        <StatCard
          title="Average Rating"
          value={4.8}
          subtitle="Based on all reviews"
          icon={<span>⭐</span>}
        />
      </div>

      <div className="mt-6 md:mt-8 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 md:p-5 bg-[var(--primary-color)]">
        <h2 className="text-lg md:text-xl font-semibold">Your Properties</h2>
        <p className="text-gray-500 text-xs md:text-sm">
          Manage your listings and view performance
        </p>
        <div className="mt-4 space-y-3 md:space-y-4">
          <PropertyRow
            name="Luxury Beach House"
            city="Malibu, CA"
            price={450}
            bookings={23}
            rating={4.9}
            status="active"
          />
          <PropertyRow
            name="Mountain Cabin Retreat"
            city="Aspen, CO"
            price={220}
            bookings={18}
            rating={4.8}
            status="active"
          />
          <PropertyRow
            name="City Loft"
            city="San Francisco, CA"
            price={180}
            bookings={6}
            rating={4.5}
            status="inactive"
          />
        </div>
      </div>
    </div>
  );
};

export default HostDashboard;
