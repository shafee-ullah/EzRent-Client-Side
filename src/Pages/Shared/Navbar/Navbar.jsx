import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router";
import { ThemeContext } from "../../../Context/ThemeContext";
import { Codepen, Heart, Home, Info, LayoutDashboard, Search, X } from "lucide-react";

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
          to="/BrowseProperties"
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
    <div className="sticky top-0 shadow-sm dark:bg-[#0f1113] dark:text-white  z-50 bg-white/10 backdrop-blur-md  mx-auto px-4 md:px-10 py-2">
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
        <div className="lg:hidden fixed inset-0  flex flex-col  ">
          <div className="dark:bg-gray-950 bg-gray-100 p-6 space-y-6">
            <div className="flex justify-between items-center  border-b-2 dark:border-gray-600 border-gray-300 pb-4">
              <div className="text-xl font-bold flex items-center  gap-2">
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
              <Link onClick={closeMenu} to="/host" className="flex gap-2 items-center">
                <Info /> Become a host
              </Link>

              <Link onClick={closeMenu} to="/wishlist" className="flex gap-2 items-center">
                <Heart /> Wishlist
              </Link>
              <Link onClick={closeMenu} to="/dashboard/guest" className="flex gap-2 items-center">
                <LayoutDashboard /> Dashboard
              </Link>
            </nav>

            <div className="mt-auto flex flex-col gap-4">
              <button
                onClick={toggleTheme}
                className="rounded-2xl px-5 py-2 bg-gray-300 dark:bg-gray-800 transition-colors text-center"
              >
                {theme === "light" ? "🌞 Light Mode" : "🌙 Dark Mode"}
              </button>
              <NavLink
                onClick={closeMenu}
                className="rounded-2xl text-center px-5 py-2 font-semibold text-white bg-[var(--btn-primary)] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-green-400/70 dark:bg-[var(--btn-primary)]"
                to="/join"
              >
                Join Us
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;