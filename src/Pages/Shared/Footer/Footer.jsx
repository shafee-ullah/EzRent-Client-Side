import { Codepen } from "lucide-react";
import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
    return (
        <div className=" border-t-2 border-gray-300 dark:border-gray-800 text-gray-700 dark:text-gray-300">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Logo */}
                <div>
                    <div className="text-2xl font-bold flex items-center gap-2">
                        <Codepen size={32} />
                        <h1><span className="text-green-700">Ez</span>Rent</h1>
                    </div>
                    <p className="text-sm leading-6">
                        Discover unique accommodations around the world. From  cozy cabins to
                        luxury villas, create unforgettable memories with HopNow.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><Link className={'hover:text-green-700'} to="/">Home</Link></li>
                        <li><Link className={'hover:text-green-700'} to="/properties">Browse Properties</Link></li>
                        <li><Link className={'hover:text-green-700'} to="/host">Become a host</Link></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Follow Us</h3>
                    <div className="flex gap-4">
                        <a href="#" className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-blue-500 hover:text-white transition">
                            <FaFacebookF />
                        </a>
                        <a href="#" className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-pink-500 hover:text-white transition">
                            <FaInstagram />
                        </a>
                        <a href="#" className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-blue-400 hover:text-white transition">
                            <FaTwitter />
                        </a>
                        <a href="#" className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-blue-700 hover:text-white transition">
                            <FaLinkedinIn />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-300 dark:border-gray-700 mt-8">
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-sm">
                    <p>© {new Date().getFullYear()} Student Toolkit. All rights reserved.</p>
                    <p className="mt-2 md:mt-0">
                        Made with ❤️ by <a href="#" className="hover:text-blue-500">8 Bit-Coders Team</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
