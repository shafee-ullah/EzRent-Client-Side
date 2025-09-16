import React from "react";

const StatCard = ({ title, value, subtitle, icon }) => (
  <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 bg-[var(--primary-color)]">
    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-500 dark:text-gray-300">{title}</p>
      {icon}
    </div>
    <div className="mt-2 text-3xl font-bold">{value}</div>
    {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
  </div>
);

const BookingItem = ({ title, city, dates, guests, price, status }) => (
  <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 bg-[var(--primary-color)] flex items-center justify-between">
    <div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-500">{city}</p>
      <p className="text-sm text-gray-500">
        {dates} • {guests} guests
      </p>
    </div>
    <div className="flex items-center gap-4">
      <div className="text-right">
        <div className="font-bold">${price}</div>
      </div>
      <span
        className={`px-3 py-1 rounded-full text-xs ${
          status === "confirmed"
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {status}
      </span>
      <div className="flex gap-2">
        <button className="btn btn-sm rounded-2xl">👁️</button>
        <button className="btn btn-sm rounded-2xl">💬</button>
      </div>
    </div>
  </div>
);

const GuestDashboard = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Bookings"
          value={12}
          subtitle="All time"
          icon={<span>📅</span>}
        />
        <StatCard
          title="Upcoming Trips"
          value={2}
          subtitle="Next 30 days"
          icon={<span>👥</span>}
        />
        <StatCard
          title="Saved Properties"
          value={8}
          subtitle="Wishlist items"
          icon={<span>💚</span>}
        />
        <StatCard
          title="Total Spent"
          value={"$3450"}
          subtitle="All time"
          icon={<span>💲</span>}
        />
      </div>

      <div className="mt-8 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 bg-[var(--primary-color)]">
        <h2 className="text-xl font-semibold">Upcoming Bookings</h2>
        <p className="text-gray-500 text-sm">
          Your confirmed and pending reservations
        </p>
        <div className="mt-4 space-y-4">
          <BookingItem
            title="Modern Downtown Apartment"
            city="New York, NY"
            dates="2024-01-15 - 2024-01-18"
            guests={2}
            price={450}
            status="confirmed"
          />
          <BookingItem
            title="Beachfront Villa"
            city="Miami, FL"
            dates="2024-02-20 - 2024-02-25"
            guests={4}
            price={1200}
            status="pending"
          />
        </div>
      </div>
    </div>
  );
};

export default GuestDashboard;
