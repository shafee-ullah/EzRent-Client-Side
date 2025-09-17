import React, { useContext, useState } from "react";
import { NavLink } from "react-router";
import { ThemeContext } from "../../../Context/ThemeContext";
import { Codepen, Heart, LayoutDashboard } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const navItems = (
    <>
      <li>
        <NavLink className={"hover:border-b-2 hover:border-green-600"} onClick={closeMenu} to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={"hover:border-b-2 hover:border-green-600"}
          onClick={closeMenu}
          to="/properties"
        >
          Browse Properties
        </NavLink>
      </li>
      <li>
        <NavLink
          className={"hover:border-b-2 hover:border-green-600"}
          onClick={closeMenu}
          to="/host"
        >
          Become a host
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 dark:bg-[#040D12] dark:text-white  z-50 bg-white/10 backdrop-blur-md shadow-sm mx-auto px-4 md:px-10 py-2">
      <div className="navbar w-11/12 mx-auto ">
        {/* Left: Logo */}
        <div className="navbar-start flex items-center">
          <div className="text-2xl font-bold flex items-center gap-2">
            <Codepen size={32} />
            <h1>
              <span className="text-green-600">Ez</span>Rent
            </h1>
          </div>
        </div>

        {/* Center: Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal   dark:text-gray-300 space-x-2 font-bold text-sm text-gray-700">
            {navItems}
          </ul>
        </div>

        {/* Right: Auth Buttons */}
        <div className="navbar-end">
          <div className=" space-x-3 hidden  lg:flex">
            <NavLink
              to={"/wishlist"}
              className={
                "flex hover:bg-green-700 rounded-2xl px-3 hover:text-white py-1 items-center gap-2 font-semibold text-sm"
              }
            >
              <Heart /> Wishlist
            </NavLink>
            <NavLink
              to={"/dashboard/guest"}
              className={
                "flex hover:bg-green-700 rounded-2xl px-3 hover:text-white py-1 items-center gap-2 font-semibold text-sm"
              }
            >
              <LayoutDashboard /> Dashboard
            </NavLink>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-300 dark:bg-gray-800 transition-colors"
            >
              {theme === "light" ? "🌞" : "🌙"}
            </button>
            <NavLink
              className="rounded-2xl px-5 py-2 font-semibold text-white bg-[var(--btn-primary)] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-green-400/70 dark:bg-[var(--btn-primary)]"
              to="/join"
            >
              Join Us
            </NavLink>
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden">
            <button onClick={handleMenuToggle} className="btn btn-ghost p-2">
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
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="lg:hidden mt-2">
          <ul className="menu bg-base-400  hover:bg-blue-100  rounded-box shadow p-4 space-y-2">
            {navItems}
            <div className="space-y-3">
              <NavLink
                to={"/wishlist"}
                className={"flex items-center gap-2 font-bold text-sm"}
              >
                <Heart /> Wishlist
              </NavLink>
              <NavLink
                to={"/dashboard/guest"}
                className={"flex items-center gap-2 font-bold text-sm"}
              >
                <LayoutDashboard /> Dashboard
              </NavLink>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-300 dark:bg-gray-800 transition-colors"
              >
                {theme === "light" ? "🌞" : "🌙"}
              </button>
              <div className="space-x-3 flex">
                <NavLink
                  className="btn bg-gray-200 hover:bg-blue-600 hover:text-white font-bold rounded-2xl px-5"
                  to="/login"
                >
                  Login
                </NavLink>
                <NavLink
                  className="w-full text-center rounded-2xl px-5 py-2 font-semibold text-white bg-[var(--btn-primary)] shadow-sm hover:shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-400/70 dark:bg-[var(--btn-primary)]"
                  to="/join"
                >
                  Join Us
                </NavLink>
              </div>
            </div>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
