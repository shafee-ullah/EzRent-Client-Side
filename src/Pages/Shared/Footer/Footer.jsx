import React from "react";
import { Link } from "react-router";
import { 
  Facebook, 
  Instagram, 
  Youtube,
  MapPin,
  Phone,
  Mail,
  Heart,
  X
} from "lucide-react";
import logo from "../../../assets/ezrent-logo.png";

const Footer = () => {
  const socialLinks = [
    {
      name: "Facebook",
      icon: <Facebook className="w-5 h-5" />,
      url: "https://facebook.com",
      color: "hover:text-blue-600"
    },
    {
      name: "X",
      icon: <X className="w-5 h-5" />,
      url: "https://x.com",
      color: "hover:text-black dark:hover:text-gray-300"
    },
    {
      name: "Instagram",
      icon: <Instagram className="w-5 h-5" />,
      url: "https://instagram.com",
      color: "hover:text-pink-600"
    },
    {
      name: "YouTube",
      icon: <Youtube className="w-5 h-5" />,
      url: "https://youtube.com",
      color: "hover:text-red-600"
    }
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Browse Properties", path: "/BrowseProperties" },
    { name: "Become A Host", path: "/become-host" },
    { name: "About EzRent", path: "/about" },
    // { name: "Contact Us", path: "/contact" },
    // { name: "Privacy Policy", path: "/privacy" }
  ];

  return (
    <div className="border-t-2 border-gray-200 dark:border-gray-800 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                  {/* bg-gradient-to-r from-emerald-500 to-green-500  */}
                <img src={logo} alt="EzRent Logo" className="w-10 h-10" />
              </div>
              <div>
              
                <h1 className="text-2xl font-bold">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400">
                    EzRent
                  </span>
                </h1>
                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                  Your Trusted Stay Partner
                </p>
              </div>
            </div>
            
            <div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                Discover unique accommodations around Bangladesh. From cozy cabins to luxury villas, 
                create unforgettable memories with EzRent.
              </p>
              
              {/* Social Media Links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 transition-all duration-300 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md ${social.color}`}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path}
                      className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Contact Info
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Address */}
                <div className="flex items-start gap-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Our Location
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      Sylhet, Bangladesh<br />
                      Merrick Way, FL 12345
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Phone Number
                    </h4>
                    <a
                      href="tel:+8801902042884"
                      className="text-gray-600 dark:text-gray-400 text-sm hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300"
                    >
                      +880 1902-042884
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Email Address
                    </h4>
                    <a
                      href="mailto:endgameprogramm10@gmail.com"
                      className="text-gray-600 dark:text-gray-400 text-sm hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300"
                    >
                      support@ezrent.com                    </a>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-amber-500 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Business Hours
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      Mon - Sun: 24/7<br />
                      Support Available
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <div className="text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} EzRent. All rights reserved.
            </div>
            
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              Made with 
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              by{" "}
              <a 
                href="#" 
                className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline transition-colors duration-300"
              >
                8 Bit-Coders Team
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;