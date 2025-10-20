import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ThemeContext } from "../../../Context/ThemeContext";
import { AuthContext } from "../../../Context/AuthContext";
import {
  Codepen,
  Heart,
  Home,
  Info,
  LayoutDashboard,
  Search,
  X,
  Menu as MenuIcon,
} from "lucide-react";
import Swal from "sweetalert2";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import logo from "../../../assets/ezrent-logo.png";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user: authUser, setUser } = useContext(AuthContext);
  console.log(authUser);
  const handleMenuToggle = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const { user } = useSelector((state) => state.products);
  console.log("user", user);


  const logoutUser = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    }).then((result) => {
      if (result.isConfirmed) {
        signOut(auth)
          .then(() => {
            localStorage.removeItem("devtalksToken");
            setUser(null);
            setUserMenuOpen(false);
          })
          .catch((error) => console.log(error.message));
        Swal.fire(
          "Logged out",
          "You have been logged out successfully.",
          "success"
        );
      }
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="navbar w-11/12 mx-auto">
        {/* Logo */}
        <div className="navbar-start flex items-center">
          <div className="text-2xl font-bold flex items-center gap-2">
            <img src={logo} alt="EzRent logo" className="w-8 h-8" />
            <h1>
              <span className="text-green-600">Ez</span>Rent
            </h1>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal dark:text-gray-300 space-x-2 font-bold text-sm text-gray-700">
            <li>
              <NavLink
                onClick={closeMenu}
                to="/"
                className="hover:border-b-2 hover:border-green-600"
              >
                Home
              </NavLink>
            </li>
            {authUser && (
              <>
                <li>
                  <NavLink
                    onClick={closeMenu}
                    to="/dashboard"
                    className="hover:border-b-2 hover:border-green-600"
                  >
                    Dashboard
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <NavLink
                onClick={closeMenu}
                to="/BrowseProperties"
                className="hover:border-b-2 hover:border-green-600"
              >
                Browse Properties
              </NavLink>
            </li>

            {
              user?.role === 'guest' && <>
                <li>
                  <NavLink
                    onClick={closeMenu}
                    to="/become-host"
                    className="hover:border-b-2 hover:border-green-600"
                  >
                    Become A Host
                  </NavLink>
                </li>
              </>
            }
            <li>
              <NavLink
                onClick={closeMenu}
                to="/guest-experiences"
                className="hover:border-b-2 hover:border-green-600"
              >
                Experiences
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                onClick={closeMenu}
                to="/guest-experiences/add"
                className="hover:border-b-2 hover:border-green-600"
              >
                Share Experience
              </NavLink>
            </li> */}
            <li>
              <NavLink
                onClick={closeMenu}
                to="/about"
                className="hover:border-b-2 hover:border-green-600"
              >
                About EzRent
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Right side */}
        <div className="navbar-end hidden lg:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300   dark:hover:bg-gray-900 cursor-pointer border-green-500 object-cover "
          >
            {theme === "light" ? "🌞" : "🌙"}
          </button>
          {!authUser ? (
            <>
              <NavLink
                to="/join"
                className="px-4 py-2 rounded-full bg-green-600 text-white font-semibold hover:bg-green-500 transition"
              >
                Join Us
              </NavLink>
            </>
          ) : (
            <>
              {authUser && (
                <div className="relative">
                  {/* Avatar — clickable */}
                  <div
                    className="cursor-pointer"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                  >
                    <img
                      src={
                        authUser.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"
                      }
                      alt="avatar"
                      className="w-12 h-12 rounded-full border-2 border-green-500 object-cover p-0.5 hover:scale-105 transition-all duration-200"
                    />
                  </div>

                  {/* Dropdown Menu */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-3 w-72 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300">
                      {/* User Info Section */}
                      <div className="flex items-center gap-3 p-4">
                        <img
                          src={
                            authUser?.photoURL ||
                            "https://i.ibb.co/4pDNDk1/avatar.png"
                          }
                          alt="User Avatar"
                          className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-600 object-cover"
                        />
                        <div>
                          <p className="text-gray-900 dark:text-white font-semibold text-sm">
                            {authUser.displayName}
                          </p>
                          <p className="text-gray-500 dark:text-gray-400 text-xs truncate">
                            {authUser.email}
                          </p>
                        </div>
                      </div>

                      <hr className="border-gray-100 dark:border-gray-700" />

                      {/* Quick Actions */}
                      <div className="flex flex-col py-2">
                        {/* <button className="text-left px-5 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          Profile
                        </button> */}
                        <NavLink
                          onClick={closeMenu}
                          to="/dashboard"
                          className="text-left px-5 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          Dashboard
                        </NavLink>

                        {
                          user?.role === 'guest' && <>
                            <NavLink
                              onClick={closeMenu}
                              to="/become-host"
                              className="text-left px-5 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                              Become a Host
                            </NavLink>
                          </>
                        }
                      </div>

                      <hr className="border-gray-100 dark:border-gray-700" />

                      {/* Logout Button */}
                      <div className="px-5 py-3">
                        <button
                          onClick={logoutUser}
                          className="w-full px-4 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-400 shadow-md hover:shadow-lg transition-all duration-200"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden ml-auto">
          <button
            onClick={handleMenuToggle}
            className="btn btn-ghost p-2 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 flex flex-col">
          <div className="dark:bg-gray-950 bg-gray-100 p-6 space-y-6">
            <div className="flex justify-between items-center border-b-2 dark:border-gray-600 border-gray-300 pb-4">
              <div className="text-xl font-bold flex items-center gap-2">
                <img src={logo} alt="EzRent logo" className="w-7 h-7" />
                <span className="text-green-500">Ez</span>Rent
              </div>
              <button onClick={handleMenuToggle}>
                <X size={28} />
              </button>
            </div>

            <nav className="flex flex-col gap-4 mt-6 text-lg">
              <Link
                onClick={closeMenu}
                to="/"
                className="flex gap-2 items-center"
              >
                <Home /> Home
              </Link>
              <Link
                onClick={closeMenu}
                to="/BrowseProperties"
                className="flex gap-2 items-center"
              >
                <Search /> Browse
              </Link>
              <Link
                onClick={closeMenu}
                to="/guest-experiences"
                className="flex gap-2 items-center"
              >
                <Heart /> Experiences
              </Link>
              {/* <Link
                onClick={closeMenu}
                to="/guest-experiences/add"
                className="flex gap-2 items-center"
              >
                <Codepen /> Share Experience
              </Link> */}

              <Link
                onClick={closeMenu}
                to="/about"
                className="flex gap-2 items-center"
              >
                <Info /> About
              </Link>
              {authUser && (
                <>
                  <Link
                    onClick={closeMenu}
                    to="/become-host"
                    className="flex gap-2 items-center"
                  >
                    <Info /> Become A Host
                  </Link>
                  <Link
                    onClick={closeMenu}
                    to="/dashboard"
                    className="flex gap-2 items-center"
                  >
                    <LayoutDashboard /> Dashboard
                  </Link>
                </>
              )}
            </nav>

            <div className="mt-auto flex flex-col gap-4">
              <button
                onClick={toggleTheme}
                className="rounded-2xl px-5 py-2 bg-gray-300 dark:bg-gray-800 transition-colors text-center"
              >
                {theme === "light" ? "🌞 Light Mode" : "🌙 Dark Mode"}
              </button>

              {!authUser ? (
                <NavLink
                  onClick={closeMenu}
                  to="/join"
                  className="rounded-2xl text-center px-5 py-2 font-semibold text-white bg-green-600 hover:bg-green-500 transition"
                >
                  Join Us
                </NavLink>
              ) : (
                <button
                  onClick={() => {
                    logoutUser();
                    closeMenu();
                  }}
                  className="rounded-2xl text-center px-5 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white  font-semibold hover:from-red-600 hover:to-red-400 shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
