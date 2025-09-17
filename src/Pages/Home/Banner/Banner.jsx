import { useEffect, useState } from "react";
import { FaSearch, FaUser, FaMapMarkerAlt } from "react-icons/fa";
import { HiOutlineCalendar } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";


const Banner = () => {
    const [destination, setDestination] = useState("");
    const [guests, setGuests] = useState(2);
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [currentImage, setCurrentImage] = useState(0);


    //  Array of background images
    const images = [
        "https://i.ibb.co.com/v4kGKgDH/logo-make-11-06-2023-66-1.jpg",
        "https://i.ibb.co.com/Fk0F6F8J/way-white-house-1.jpg",
        "https://i.ibb.co.com/3wjhFDn/photorealistic-house-with-wooden-architecture-timber-structure-1.jpg",
        "https://i.ibb.co.com/N6YphcRV/clubhouse-tewksbury-usa-1.jpg",
    ];


    //  Rotating messages
    const messages = [
        "✨ Book early & get up to 30% OFF on your next trip!",
        "🌍 Explore top destinations around the world today.",
        "🏡 Become a host & start earning with your property.",
        "🎉 Exclusive deals for first-time travelers!",
    ];

    // massage change in every 4 sec
    const [currentMsg, setCurrentMsg] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMsg((prev) => (prev + 1) % messages.length);
        }, 4000); // change every 4 seconds
        return () => clearInterval(interval);
    }, [messages.length]);


    // Auto change img every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 4000); // 5 seconds
        return () => clearInterval(interval);
    }, [images.length]);

    const handleSubmitFormData = (e) => {
        e.preventDefault()
        const form = e.target;
        const formData = new FormData(form);
        const propertyData = Object.fromEntries(formData.entries());
        console.log(propertyData);

    }

    return (
        <div
            className="relative min-h-screen mb-10 flex py-5 md:py-10 lg:py-20 items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage: `url(${images[currentImage]})`,
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-slate-950/30 dark:bg-slate-950/50" />

            <div className="relative z-10 flex flex-col md:items-start items-center text-start text-white px-4">
                <h1 className="text-3xl md:text-5xl font-bold">
                    Find Your Perfect <span className="text-green-600">Getaway</span>
                </h1>
                <p className="mt-4 mb-10  max-w-3xl text-sm md:text-lg">
                    Discover unique accommodations around the world. From  cozy cabins to
                    luxury villas, create unforgettable memories with HopNow.
                </p>

                {/* Rotating Message Card with Fade Animation */}
                <div className="mb-5 md:mb-10 w-full max-w-2xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentMsg}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.6 }}
                            className="bg-white/20 border border-white/30 backdrop-blur-md shadow-lg rounded-xl p-5"
                        >
                            <p className="text-white text-center text-lg md:text-xl font-medium">
                                {messages[currentMsg]}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="flex flex-col items-center">
                    {/* Search Box */}
                    <div className="relative mt-8 w-full max-w-5xl p-[2px] rounded-2xl bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 animate-border">
                        <div className="bg-[var(--primary-color)] rounded-2xl shadow-lg p-6">
                            <form onSubmit={handleSubmitFormData}>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    {/* Destination */}
                                    <div className="flex flex-col">
                                        <label className="text-gray-500 dark:text-gray-300 text-sm mb-1">Where to?</label>
                                        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                                            <FaMapMarkerAlt className="text-gray-400 dark:text-gray-300 mr-2" />
                                            <input
                                                name="destination"
                                                type="text"
                                                placeholder="Search destinations"
                                                value={destination}
                                                onChange={(e) => setDestination(e.target.value)}
                                                className="w-full focus:outline-none text-gray-700"
                                            />
                                        </div>
                                    </div>

                                    {/* Check-in */}
                                    <div className="flex flex-col">
                                        <label className="text-gray-500 dark:text-gray-300 text-sm mb-1">Check-in</label>
                                        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                                            <HiOutlineCalendar className="text-gray-400 mr-2" />
                                            <input
                                                name="check-in"
                                                type="date"
                                                value={checkIn}
                                                onChange={(e) => setCheckIn(e.target.value)}
                                                className="w-full focus:outline-none text-gray-700"
                                            />
                                        </div>
                                    </div>

                                    {/* Check-out */}
                                    <div className="flex flex-col">
                                        <label className="text-gray-500 dark:text-gray-300 text-sm mb-1">Check-out</label>
                                        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                                            <HiOutlineCalendar className="text-gray-400 mr-2" />
                                            <input
                                                name="check-out"
                                                type="date"
                                                value={checkOut}
                                                onChange={(e) => setCheckOut(e.target.value)}
                                                className="w-full focus:outline-none text-gray-700"
                                            />
                                        </div>
                                    </div>

                                    {/* Guests */}
                                    <div className="flex flex-col">
                                        <label className="text-gray-500 dark:text-gray-300 text-sm mb-1">Guests</label>
                                        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                                            <FaUser className="text-gray-400 mr-2" />
                                            <input
                                                name="quest"
                                                type="number"
                                                min={1}
                                                value={guests}
                                                onChange={(e) => setGuests(e.target.value)}
                                                className="w-full focus:outline-none text-gray-700"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-center mt-6">

                                    <button type="submit" className="w-full flex items-center md:w-auto  text-green-600 font-semibold border-green-700/20 bg-gray-100 hover:bg-gray-200 border-2 px-6 py-3 rounded-lg text-center">
                                        <FaSearch className="mr-2" /> Search Propertiesv
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col md:flex-row gap-4 mt-8 w-full md:w-auto">
                        <button className="w-full md:w-auto bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg text-center">
                            Browse Properties →
                        </button>
                        <button className="w-full md:w-auto bg-white/20 text-white px-6 py-3 rounded-lg shadow hover:text-green-600 text-center">
                            Become a Host
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}


export default Banner; 