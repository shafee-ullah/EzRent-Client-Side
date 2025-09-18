import React from "react";
import { Wifi, Briefcase, Gamepad2, Users, ParkingSquare, UtensilsCrossed } from "lucide-react";
import { motion } from "framer-motion";

const amenities = [
    {
        icon: <Wifi className="w-10 h-10 text-blue-500" />,
        title: "Fast 5G Internet",
        desc: "High-speed internet to keep you connected at all times.",
    },
    {
        icon: <Briefcase className="w-10 h-10 text-blue-500" />,
        title: "Office Equipments",
        desc: "Fully furnished offices with all essential equipment.",
    },
    {
        icon: <Gamepad2 className="w-10 h-10 text-blue-500" />,
        title: "Relaxation Spaces",
        desc: "Take a break in our relaxing lounges and game rooms.",
    },
    {
        icon: <Users className="w-10 h-10 text-blue-500" />,
        title: "Meeting Rooms",
        desc: "Modern meeting spaces for your important discussions.",
    },
    {
        icon: <ParkingSquare className="w-10 h-10 text-blue-500" />,
        title: "Free Car Parking",
        desc: "Convenient parking spaces available at no extra cost.",
    },
    {
        icon: <UtensilsCrossed className="w-10 h-10 text-blue-500" />,
        title: "Kitchen & Bar",
        desc: "Enjoy a shared kitchen and refreshments at our bar.",
    },
];

const Offers = () => {
    return (
        <section className="relative   my-10 py-16">
            {/* Background pattern */}
            <div className="absolute inset-0 b opacity-30"></div>

            <div className="relative max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold dark:text-gray-200 text-gray-900">What We Offer</h2>
                    <p className="mt-2 text-lg dark:text-gray-400 text-gray-600">
                        Offering Amenities In Our CoWorking Spaces
                    </p>
                </div>

                {/* Amenities grid */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {amenities.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="flex items-start space-x-4 bg-white dark:bg-slate-900 shadow-sm rounded-xl p-6 hover:shadow-md hover:scale-105 transition-transform duration-300"
                        >
                            <div className="flex-shrink-0">{item.icon}</div>
                            <div>
                                <h3 className="text-xl font-semibold dark:text-gray-200 text-gray-900">{item.title}</h3>
                                <p className="mt-2 dark:text-gray-400 text-gray-600 text-sm">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Offers;
