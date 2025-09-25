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

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, setUser } = useContext(AuthContext);

  const handleMenuToggle = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

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
        Swal.fire("Logged out", "You have been logged out successfully.", "success");
      }
    });
  };

  return (
    <div className="sticky top-0 shadow-sm dark:bg-[#0f1113] dark:text-white z-50 bg-white/5 backdrop-blur-md py-2">
      <div className="navbar w-11/12 mx-auto">
        {/* Logo */}
        <div className="navbar-start flex items-center">
          <div className="text-2xl font-bold flex items-center gap-2">
            <Codepen size={32} />
            <h1>
              <span className="text-green-600">Ez</span>Rent
            </h1>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal dark:text-gray-300 space-x-2 font-bold text-sm text-gray-700">
            <li>
              <NavLink onClick={closeMenu} to="/" className="hover:border-b-2 hover:border-green-600">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink onClick={closeMenu} to="/BrowseProperties" className="hover:border-b-2 hover:border-green-600">
                Browse Properties
              </NavLink>
            </li>
            {user && (
              <>
                <li>
                  <NavLink onClick={closeMenu} to="/dashboard" className="hover:border-b-2 hover:border-green-600">
                    Dashboard
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Right side */}
        <div className="navbar-end hidden lg:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-full bg-gray-300 dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-700 transition"
          >
            {theme === "light" ? "🌞" : "🌙"}
          </button>
          {!user ? (
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

              <div className="relative" onClick={() => setUserMenuOpen(!userMenuOpen)}>
                <img
                  src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover border"
                />
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                    <p className="font-semibold">{user.displayName || user.email}</p>
                    <hr className="my-2" />
                    <NavLink
                      to="/host"
                      className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Become a Host
                    </NavLink>
                    <NavLink
                      to="/dashboard"
                      className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Dashboard
                    </NavLink>
                    <button
                      onClick={logoutUser}
                      className="w-full text-center text-white px-3 py-2 bg-green-500 rounded-md hover:bg-red-400 transition mt-2"
                    >
                      Logout
                    </button>
                    <button
                      onClick={toggleTheme}
                      className="w-full mt-2 text-center px-3 py-2 rounded-md bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
                    >
                      {theme === "light" ? "🌞 Light Mode" : "🌙 Dark Mode"}
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden ml-auto">
          <button onClick={handleMenuToggle} className="btn btn-ghost p-2 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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
                <Codepen size={28} />
                <span className="text-green-500">Ez</span>Rent
              </div>
              <button onClick={handleMenuToggle}>
                <X size={28} />
              </button>
            </div>

            <nav className="flex flex-col gap-4 mt-6 text-lg">
              <Link onClick={closeMenu} to="/" className="flex gap-2 items-center">
                <Home /> Home
              </Link>
              <Link onClick={closeMenu} to="/BrowseProperties" className="flex gap-2 items-center">
                <Search /> Browse
              </Link>
              {user && (
                <>
                  <Link onClick={closeMenu} to="/host" className="flex gap-2 items-center">
                    <Info /> Become a host
                  </Link>
                  <Link onClick={closeMenu} to="/dashboard" className="flex gap-2 items-center">
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

              {!user ? (
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
                  className="rounded-2xl text-center px-5 py-2 font-semibold text-white bg-green-500 hover:bg-green-400 transition"
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
