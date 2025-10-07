import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Shield, Download, XCircle, Home, User } from "lucide-react";

const MotionDiv = motion.div;

const UserManagementSection = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");

  // Fetch users from backend (usersCollection)
  useEffect(() => {
    fetch("https://ez-rent-server-side.vercel.app/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  const handleUpdateRole = async (id, role) => {
    try {
      const res = await fetch(`https://ez-rent-server-side.vercel.app/users/role/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });

      const data = await res.json();

      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) => (u._id === id ? { ...u, role } : u))
        );
        toast.success(`✅ Role updated to ${role}`);
      } else {
        toast.error(`❌ ${data.message}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("⚠️ Error updating role");
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await fetch(`https://ez-rent-server-side.vercel.app/users/status/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) => (u._id === id ? { ...u, status } : u))
        );
        toast.success(`Status updated to ${status}`);
      } else {
        toast.error(`❌ ${data.message}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("⚠️ Error updating status");
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      active: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
      pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
      suspended: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      rejected: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getRoleColor = (role) => {
    return role === "host"
      ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
      : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
  };

  const filteredUsers =
    filter === "all"
      ? users
      : users.filter((u) => u.role === filter || u.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          User Management
        </h2>
        <div className="flex items-center gap-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Users</option>
            <option value="guest">Guests</option>
            <option value="host">Hosts</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
            <option value="rejected">Rejected</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-medium hover:shadow-md transition-all duration-300">
            <Download className="w-4 h-4" />
            Export Users
          </button>
        </div>
      </div>

      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Join Date</th>
                <th className="px-6 py-4">Number</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {user?.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.name}
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-white">
                          {user?.name?.charAt(0).toUpperCase()}
                        </span>
                      )}
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {user.name}
                          {user.verified && (
                            <Shield className="w-4 h-4 text-emerald-500 inline ml-1" />
                          )}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(
                        user.role
                      )}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        user.status
                      )}`}
                    >
                      {user?.status || "active"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    2024-01-08
                  </td>
                  <td className="px-6 py-4">{user?.number}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-6">
                      <button
                        onClick={() => handleUpdateRole(user._id, "Host")}
                        className="flex flex-col items-center text-emerald-600 hover:text-emerald-700"
                      >
                        <Home className="w-4 h-4" />
                        <span className="text-xs font-medium">Host</span>
                      </button>
                      <button
                        onClick={() => handleUpdateRole(user._id, "Guest")}
                        className="flex flex-col items-center text-blue-600 hover:text-blue-700"
                      >
                        <User className="w-4 h-4" />
                        <span className="text-xs font-medium">Guest</span>
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(user._id, "rejected")}
                        className="flex flex-col items-center text-red-600 hover:text-red-700"
                      >
                        <XCircle className="w-4 h-4" />
                        <span className="text-xs font-medium">Reject</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagementSection;