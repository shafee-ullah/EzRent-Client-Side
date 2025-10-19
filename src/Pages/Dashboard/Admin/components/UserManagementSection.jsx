// // components/UserManagementSection.js
// import React, { useEffect } from "react";
// import { motion } from "framer-motion";
// import { useSelector, useDispatch } from "react-redux";
// import toast from "react-hot-toast";
// import { Shield, Download, XCircle, Home, User } from "lucide-react";

// // Redux imports
// import {
//   fetchUsers,
//   updateUserRole,
//   deleteUser,
//   setFilter,
//   clearError
// } from "../../../../redux/UserSlice.js";

// const UserManagementSection = () => {
//   const dispatch = useDispatch();
//   const { users, filter, loading, error } = useSelector((state) => state.users);

//   console.log("user", users);

//   // Fetch users on component mount
//   useEffect(() => {
//     dispatch(fetchUsers());
//   }, [dispatch]);

//   // Handle errors
//   useEffect(() => {
//     if (error) {
//       toast.error(`❌ ${error}`);
//       dispatch(clearError());
//     }
//   }, [error, dispatch]);

//   // Update user role
//   const handleUpdateRole = async (id, role) => {
//     try {
// // <<<<<<<<< Temporary merge branch 1
//       const result = await dispatch(updateUserRole({ id, role })).unwrap();
//       toast.success(`✅ Role updated to ${role}`);
//       console.log(result);
// // =========
//       const res = await fetch(`https://ez-rent-server-side.vercel.app/users/role/${id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ role }),
//       });
//       const data = await res.json();

//       if (res.ok) {
//         setUsers((prev) =>
//           prev.map((u) => (u._id === id ? { ...u, role } : u))
//         );
//         toast.success(`✅ Role updated to ${role}`);
//       } else {
//         toast.error(`❌ ${data.message}`);
//       }
//     } catch (error) {
//       // Error is handled by the slice and will be caught in the error useEffect
//       console.log("Failed to update role:", error);
//     }
//   };

//   // Delete user (Reject)
//   const handleRejectUser = async (id) => {
//     console.log('user rejected');
//     toast.custom(
//       (t) => (
//         <div
//           className={`${t.visible ? "animate-enter" : "animate-leave"
//             } max-w-sm w-full bg-white dark:bg-gray-900 shadow-lg rounded-xl p-4 border border-gray-200 dark:border-gray-700`}
//         >
//           <div className="flex items-start gap-3">
//             <div className="flex-shrink-0">
//               <div className="w-10 h-10 flex items-center justify-center bg-red-100 dark:bg-red-500/20 rounded-full">
//                 <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
//               </div>
//             </div>

//             <div className="flex-1">
//               <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
//                 Confirm Rejection
//               </h4>
//               <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
//                 Are you sure you want to reject and delete this user? This action
//                 cannot be undone.
//               </p>

//               <div className="flex justify-end gap-2 mt-4">
//                 <button
//                   onClick={() => toast.dismiss(t.id)}
//                   className="px-3 py-1.5 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   onClick={async () => {
//                     toast.dismiss(t.id);
//                     try {
//                       const res = await fetch(
//                         `http://localhost:5000/users/${id}`,
//                         { method: "DELETE" }
//                       );
//                       const data = await res.json();

//                       if (res.ok) {
//                         setUsers((prev) => prev.filter((u) => u._id !== id));
//                         toast.success("User deleted successfully 🗑️", {
//                           style: {
//                             borderRadius: "8px",
//                             background: "#10B981",
//                             color: "#fff",
//                           },
//                         });
//                       } else {
//                         toast.error(data.message || "Failed to delete user");
//                       }
//                     } catch (error) {
//                       // Error is handled by the slice
//                       console.log(error);
//                     }
//                   }}
//                   className="px-3 py-1.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition"
//                 >
//                   Yes, Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       ),
//       {
//         id: `confirm-delete-${id}`,
//         duration: 8000,
//         position: "top-center",
//       }
//     );
//   };

//   // Role color classes
//   const getRoleColor = (role) => {
//     switch (role?.toLowerCase()) {
//       case "host":
//         return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
//       case "guest":
//         return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
//       case "Admin":
//         return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
//       default:
//         return "bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-300";
//     }
//   };

//   // Status color classes
//   const getStatusColor = (status) => {
//     const colors = {
//       active: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
//       pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
//       suspended: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
//       rejected: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
//     };
//     return colors[status] || "bg-gray-100 text-gray-800";
//   };

//   // Filtered users
//   const filteredUsers =
//     filter === "all"
//       ? users
//       : users.filter((u) => u.role?.toLowerCase() === filter || u.status?.toLowerCase() === filter);

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//           User Management
//         </h2>
//         <div className="flex items-center gap-3">
//           <select
//             value={filter}
//             onChange={(e) => dispatch(setFilter(e.target.value))}
//             className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
//           >
//             <option value="all">All Users</option>
//             <option value="guest">Guests</option>
//             <option value="host">Hosts</option>
//             <option value="pending">Pending</option>
//             <option value="suspended">Suspended</option>
//             <option value="rejected">Rejected</option>
//           </select>
//         </div>
//       </div>

//       {/* Loading state */}
//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-emerald-500 dark:border-emerald-300"></div>
//         </div>
//       ) : (
//         <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50/80 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                     User Profile
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                     Role
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                     Join Date
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                     Contact Number
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
//                 {filteredUsers.map((user) => (
//                   <tr
//                     key={user._id}
//                     className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors duration-150"
//                   >
//                     {/* User Profile Column */}
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center gap-3">
//                         <div className="flex-shrink-0">
//                           {user?.photoURL ? (
//                             <img
//                               src={user.photoURL}
//                               alt={`${user.name}'s profile`}
//                               className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-600"
//                             />
//                           ) : (
//                             <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-gray-300 to-gray-400 text-white font-medium shadow-inner">
//                               {user?.name?.charAt(0).toUpperCase()}
//                             </div>
//                           )}
//                         </div>
//                         <div className="min-w-0 flex-1">
//                           <div className="flex items-center gap-1">
//                             <p className="font-medium text-gray-900 dark:text-white truncate max-w-[120px]">
//                               {user.name}
//                             </p>
//                             {user.verified && (
//                               <Shield className="w-4 h-4 text-emerald-500 flex-shrink-0" />
//                             )}
//                           </div>
//                           <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[150px]">
//                             {user.email}
//                           </p>
//                         </div>
//                       </div>
//                     </td>

//                     {/* Role Column */}
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span
//                         className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold leading-5 ${getRoleColor(
//                           user.role
//                         )}`}
//                       >
//                         {user.role}
//                       </span>
//                     </td>

//                     {/* Status Column */}
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span
//                         className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold leading-5 ${getStatusColor(
//                           user.status || "active"
//                         )}`}
//                       >
//                         {user.status || "active"}
//                       </span>
//                     </td>

//                     {/* Join Date Column */}
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-medium">
//                       2024-01-08
//                     </td>

//                     {/* Contact Number Column */}
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-mono">
//                       {user?.number}
//                     </td>

//                     {/* Actions Column */}
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center justify-start gap-3">
//                         <button
//                           onClick={() => handleUpdateRole(user._id, "host")}
//                           className="group relative flex flex-col items-center p-3 rounded-xl bg-emerald-50/80 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-800/30 border border-emerald-200 dark:border-emerald-700 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md transition-all duration-300 ease-out hover:-translate-y-1"
//                           title="Set as Host"
//                         >
//                           <Home className="w-5 h-5 mb-2 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
//                           <span className="text-xs font-semibold group-hover:tracking-wide transition-all duration-200">Host</span>
//                         </button>

//                         <button
//                           onClick={() => handleUpdateRole(user._id, "guest")}
//                           className="group relative flex flex-col items-center p-3 rounded-xl bg-blue-50/80 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800/30 border border-blue-200 dark:border-blue-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all duration-300 ease-out hover:-translate-y-1"
//                           title="Set as Guest"
//                         >
//                           <User className="w-5 h-5 mb-2 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
//                           <span className="text-xs font-semibold group-hover:tracking-wide transition-all duration-200">Guest</span>
//                         </button>

//                         <button
//                           onClick={() => handleRejectUser(user._id)}
//                           className="group relative flex flex-col items-center p-3 rounded-xl bg-red-50/80 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800/30 border border-red-200 dark:border-red-700 hover:border-red-300 dark:hover:border-red-600 hover:shadow-md transition-all duration-300 ease-out hover:-translate-y-1"
//                           title="Reject User"
//                         >
//                           <XCircle className="w-5 h-5 mb-2 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
//                           <span className="text-xs font-semibold group-hover:tracking-wide transition-all duration-200">Reject</span>
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserManagementSection;


// components/UserManagementSection.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Shield, XCircle, Home, User } from "lucide-react";
import toast from "react-hot-toast";

// Redux imports
import {
  fetchUsers,
  updateUserRole,
  deleteUser,
  setFilter,
  clearError,
} from "../../../../redux/UserSlice.js";

const UserManagementSection = () => {
  const dispatch = useDispatch();
  const { users, filter, loading, error } = useSelector((state) => state.users);

  // Fetch users when component mounts
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Handle Redux errors
  useEffect(() => {
    if (error) {
      toast.error(`❌ ${error}`);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  // ✅ Update user role using Redux
  const handleUpdateRole = async (id, role) => {
    try {
      const result = await dispatch(updateUserRole({ id, role })).unwrap();
      toast.success(`✅ Role updated to ${role}`);
      console.log("Updated user:", result);
    } catch (error) {
      console.error("Failed to update role:", error);
      toast.error("❌ Failed to update role");
    }
  };

  // ✅ Delete user (Reject)
  const handleRejectUser = (id) => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
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
                    try {
                      await dispatch(deleteUser(id)).unwrap();
                      toast.success("🗑️ User deleted successfully", {
                        style: {
                          borderRadius: "8px",
                          background: "#10B981",
                          color: "#fff",
                        },
                      });
                    } catch (error) {
                      console.error(error);
                      toast.error("❌ Failed to delete user");
                    }
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

  // Role badge color
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

  // Status badge color
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

  // Filtered users list
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          User Management
        </h2>

        <select
          value={filter}
          onChange={(e) => dispatch(setFilter(e.target.value))}
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

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-emerald-500 dark:border-emerald-300"></div>
        </div>
      ) : (
        <div className="bg-white/80 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/80 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                    User Profile
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                    Join Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                    Contact Number
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
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
                    {/* Profile */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        {user.photoURL ? (
                          <img
                            src={user.photoURL}
                            alt={user.name}
                            className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-600"
                          />
                        ) : (
                          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-gray-300 to-gray-400 text-white font-medium shadow-inner">
                            {user.name?.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {user.name}{" "}
                            {user.verified && (
                              <Shield className="inline w-4 h-4 text-emerald-500" />
                            )}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(
                          user.role
                        )}`}
                      >
                        {user.role}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          user.status || "active"
                        )}`}
                      >
                        {user.status || "active"}
                      </span>
                    </td>

                    {/* Join Date */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      2024-01-08
                    </td>

                    {/* Contact */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-mono">
                      {user.number || "—"}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleUpdateRole(user._id, "host")}
                          className="group flex flex-col items-center p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-800/30 border border-emerald-200 dark:border-emerald-700 hover:shadow-md transition"
                        >
                          <Home className="w-5 h-5 mb-1" />
                          <span className="text-xs font-semibold">Host</span>
                        </button>

                        <button
                          onClick={() => handleUpdateRole(user._id, "guest")}
                          className="group flex flex-col items-center p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800/30 border border-blue-200 dark:border-blue-700 hover:shadow-md transition"
                        >
                          <User className="w-5 h-5 mb-1" />
                          <span className="text-xs font-semibold">Guest</span>
                        </button>

                        <button
                          onClick={() => handleRejectUser(user._id)}
                          className="group flex flex-col items-center p-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800/30 border border-red-200 dark:border-red-700 hover:shadow-md transition"
                        >
                          <XCircle className="w-5 h-5 mb-1" />
                          <span className="text-xs font-semibold">Reject</span>
                        </button>
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
