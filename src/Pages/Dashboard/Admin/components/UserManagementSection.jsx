// src/components/UserManagementSection.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  updateUserRole,
  deleteUser,
} from "../../../../redux/UserSlice";
import { Shield, XCircle, Home, User, Loader2 } from "lucide-react";

const MotionDiv = motion.div;

const UserManagementSection = () => {
  const dispatch = useDispatch();
  const { list: users, loading } = useSelector((state) => state.users);
  const [filter, setFilter] = useState("all");
  const [buttonLoading, setButtonLoading] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleUpdateRole = async (id, role) => {
    setButtonLoading(`${id}-${role}`);
    await dispatch(updateUserRole({ id, role }));
    setButtonLoading(null);
  };

  const handleRejectUser = (id) => {
    toast.custom(
      (t) => (
        <div
          className={`${t.visible ? "animate-enter" : "animate-leave"
            } max-w-sm w-full bg-white dark:bg-gray-900 shadow-lg rounded-xl p-4 border border-gray-200 dark:border-gray-700`}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 flex items-center justify-center bg-red-100 dark:bg-red-500/20 rounded-full">
                <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
            </div>

            <div className="flex-1">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Confirm Rejection
              </h4>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                Are you sure you want to reject and delete this user? This action
                cannot be undone.
              </p>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="px-3 py-1.5 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={async () => {
                    toast.dismiss(t.id);
                    setButtonLoading(`${id}-reject`);
                    await dispatch(deleteUser(id));
                    setButtonLoading(null);
                  }}
                  className="px-3 py-1.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        id: `confirm-delete-${id}`,
        duration: 8000,
        position: "top-center",
      }
    );
  };

  const getRoleColor = (role) => {
    switch (role?.toLowerCase()) {
      case "host":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      case "guest":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "admin":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-300";
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      active:
        "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
      pending:
        "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
      suspended:
        "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      rejected:
        "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const filteredUsers =
    filter === "all"
      ? users
      : users.filter(
        (u) =>
          u.role?.toLowerCase() === filter ||
          u.status?.toLowerCase() === filter
      );

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
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-emerald-500 dark:border-emerald-300"></div>
        </div>
      ) : (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/80 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    User Profile
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Join Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          {user?.photoURL ? (
                            <img
                              src={user.photoURL}
                              alt={`${user.name}'s profile`}
                              className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-600"
                            />
                          ) : (
                            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-gray-300 to-gray-400 text-white font-medium shadow-inner">
                              {user?.name?.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1">
                            <p className="font-medium text-gray-900 dark:text-white truncate max-w-[120px]">
                              {user.name}
                            </p>
                            {user.verified && (
                              <Shield className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[150px]">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold leading-5 ${getRoleColor(
                          user.role
                        )}`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold leading-5 ${getStatusColor(
                          user.status || "active"
                        )}`}
                      >
                        {user.status || "active"}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-medium">
                      2024-01-08
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-start gap-2">
                        {/* Host Button */}
                        <motion.button
                          onClick={() => handleUpdateRole(user._id, "host")}
                          whileHover={{ scale: 1.05, y: -1 }}
                          whileTap={{ scale: 0.95 }}
                          disabled={buttonLoading === `${user._id}-host`}
                          className="relative group flex flex-col items-center justify-center p-2 rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-800 hover:border-emerald-300 dark:hover:border-emerald-700 shadow-sm hover:shadow-md transition-all duration-300 min-w-[70px] disabled:opacity-60"
                          title="Set as Host"
                        >
                          {buttonLoading === `${user._id}-host` && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/70 dark:bg-gray-900/70 rounded-xl">
                              <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                            </div>
                          )}
                          <Home className="w-4 h-4 mb-1 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-xs font-semibold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400">
                            Host
                          </span>
                        </motion.button>

                        {/* Guest Button */}
                        <motion.button
                          onClick={() => handleUpdateRole(user._id, "guest")}
                          whileHover={{ scale: 1.05, y: -1 }}
                          whileTap={{ scale: 0.95 }}
                          disabled={buttonLoading === `${user._id}-guest`}
                          className="relative group flex flex-col items-center justify-center p-2 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700 shadow-sm hover:shadow-md transition-all duration-300 min-w-[70px] disabled:opacity-60"
                          title="Set as Guest"
                        >
                          {buttonLoading === `${user._id}-guest` && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/70 dark:bg-gray-900/70 rounded-xl">
                              <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                            </div>
                          )}
                          <User className="w-4 h-4 mb-1 text-blue-600 dark:text-blue-400" />
                          <span className="text-xs font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400">
                            Guest
                          </span>
                        </motion.button>

                        {/* Reject Button */}
                        <motion.button
                          onClick={() => handleRejectUser(user._id)}
                          whileHover={{ scale: 1.05, y: -1 }}
                          whileTap={{ scale: 0.95 }}
                          disabled={buttonLoading === `${user._id}-reject`}
                          className="relative group flex flex-col items-center justify-center p-2 rounded-xl bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border border-red-200 dark:border-red-800 hover:border-red-300 dark:hover:border-red-700 shadow-sm hover:shadow-md transition-all duration-300 min-w-[70px] disabled:opacity-60"
                          title="Reject User"
                        >
                          {buttonLoading === `${user._id}-reject` && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/70 dark:bg-gray-900/70 rounded-xl">
                              <Loader2 className="w-4 h-4 animate-spin text-red-600" />
                            </div>
                          )}
                          <XCircle className="w-4 h-4 mb-1 text-red-600 dark:text-red-400" />
                          <span className="text-xs font-semibold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-400 dark:to-orange-400">
                            Reject
                          </span>
                        </motion.button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementSection;
