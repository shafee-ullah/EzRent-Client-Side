import React from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { motion } from "framer-motion";

const Explore = () => {
    return (
        <section className="">
            <div className="max-w-11/12 mx-auto my-5 lg:my-10 py-16 px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Column */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
                        Explore &amp; Find your{" "}
                        <span className="italic text-gray-800 dark:text-gray-200">Dream</span> home
                        <span className="text-green-500">*</span>
                    </h1>

                    {/* Happy clients box */}
                    <div className="mt-8 flex flex-col sm:flex-row sm:items-start sm:space-x-4 space-y-4 sm:space-y-0">
                        <motion.div
                            className="relative w-full sm:w-60"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <img
                                src="https://i.ibb.co/67ywvHWV/mark-champs-Id2-IIl1j-OB0-unsplash.jpg"
                                alt="Happy Clients"
                                className="w-full h-40 shadow-xl md:h-60 object-cover rounded-lg"
                            />
                            <div className="absolute -bottom-6 left-4 bg-white rounded-xl shadow p-3 w-[calc(100%-1rem)] sm:w-auto">
                                <p className="text-sm dark:text-black text-white font-semibold">120k+ Happy Clients</p>
                                <div className="flex items-center mt-1 space-x-1">
                                    <span className="text-yellow-400 text-sm">★</span>
                                    <span className="text-yellow-400 text-sm">★</span>
                                    <span className="text-yellow-400 text-sm">★</span>
                                    <span className="text-yellow-400 text-sm">★</span>
                                    <span className="text-gray-300 text-sm">★</span>
                                    <span className="text-gray-500 text-xs ml-2">(4.0)</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.img
                            src="https://i.ibb.co/psHLNV7/sidath-vimukthi-29z-Da-Mhy-Is-U-unsplash.jpg"
                            alt="Living Room"
                            className="w-full sm:w-60 h-40 shadow-xl md:h-80 object-cover rounded-lg"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                        />
                    </div>
                </motion.div>

                {/* Right Column */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <p className="italic text-xl sm:text-2xl mb-2 text-gray-600 dark:text-gray-300">
                        “Your premier partner in real estate. Transforming properties into
                        dreams. Let us guide you home with expertise.”
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:gap-12 gap-6">
                        <div>
                            <h2 className="text-4xl  md:text-5xl font-bold">$7bil+</h2>
                            <p className="text-sm text-gray-600">Project Handover</p>
                        </div>
                        <div>
                            <h2 className="text-4xl  md:text-5xl font-bold">1.9mil+</h2>
                            <p className="text-sm text-gray-600">Happy Customers</p>
                        </div>
                    </div>

                    <ul className="mt-8 text-lg sm:text-xl space-y-3">
                        <li className="flex items-center">
                            <span className="text-green-600 mr-2"><Check size={25} /></span>
                            Loan & low Interest facility
                        </li>
                        <li className="flex items-center">
                            <span className="text-green-600 mr-2"><Check size={25} /></span>
                            100k+ Property Listing added & updated
                        </li>
                        <li className="flex items-center">
                            <span className="text-green-600 mr-2">  <Check size={25} /></span>
                            Expert agent consultation
                        </li>
                    </ul>

                    <motion.p
                        className="mt-8 border-l-3 bg-[var(--primary-color)] border-green-700 text-xl md:text-2xl inline-flex items-center shadow-xl text-gray-950 font-semibold  dark:text-gray-200 px-10 py-5 rounded-lg "
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        We help people & companies find <br />their perfect desk or space
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
};

export default Explore;
