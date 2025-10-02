import { Codepen } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div className=" border-t-2 border-gray-300 dark:border-gray-800 text-gray-700 dark:text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo */}
        <div>
          <div className="text-2xl font-bold flex items-center gap-2">
            <Codepen size={32} />
            <h1>
              <span className="text-green-700">Ez</span>Rent
            </h1>
          </div>
          <p className="text-sm leading-6">
            Discover unique accommodations around the world. From cozy cabins to
            luxury villas, create unforgettable memories with HopNow.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <Link className={"hover:text-green-700"} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className={"hover:text-green-700"} to="/BrowseProperties">
                Browse Properties
              </Link>
            </li>
            <li>
              <Link className={"hover:text-green-700"} to="/about">
                About EzRent
              </Link>
            </li>
            <li>
              <Link className={"hover:text-green-700"} to="/host">
                Become a host
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {" "}
            Contact Info
          </h3>
          <div className="flex gap-4">
            <ul className="space-y-3">
              {/* Address */}
              <li className="flex items-start gap-4">
                <svg
                  className="w-6 h-6 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 12 6 12s6-6.75 6-12c0-3.314-2.686-6-6-6z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="8" r="2" fill="currentColor" />
                </svg>

                <div className="leading-tight">
                  <span className="block font-medium">Sylhet , Bangladesh</span>
                  <span className="block">Merrick Way, FL 12345</span>
                </div>
              </li>

              {/* Phone */}
              <li className="flex items-center gap-4">
                <svg
                  className="w-6 h-6 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.08 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12.94.36 1.86.72 2.72a2 2 0 0 1-.45 2.11L9.91 9.91a16 16 0 0 0 6 6l1.35-1.35a2 2 0 0 1 2.11-.45c.86.36 1.78.6 2.72.72A2 2 0 0 1 22 16.92z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <a
                  href="tel:+1234567890"
                  className="block leading-tight hover:underline"
                >
                  <span className="block font-medium">01902042884</span>
                </a>
              </li>

              {/* Email */}
              <li className="flex items-center gap-4">
                <svg
                  className="w-6 h-6 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="14"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 7l9 6 9-6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <a
                  href="endgameprogramm10@gmail.com"
                  className="block leading-tight hover:underline"
                >
                  <span className="block font-medium">
                    endgameprogramm10@gmail.com
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300 dark:border-gray-700 mt-8">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>
            © {new Date().getFullYear()} Student Toolkit. All rights reserved.
          </p>
          <p className="mt-2 md:mt-0">
            Made with ❤️ by{" "}
            <a href="#" className="hover:text-blue-500">
              8 Bit-Coders Team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
