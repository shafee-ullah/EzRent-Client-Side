import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaUser, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { HiOutlineCalendar } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
const MotionDiv = motion.div;

const Banner = () => {

  // Background images for rotation
  const backgroundImages = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2067&q=80",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  ];

  const [currentBg, setCurrentBg] = useState(0);

  // Rotating messages
  const messages = [
    "✨ Book early & get up to 30% OFF on your next trip!",
    "🌍 Explore top destinations around the world today.",
    "🏡 Become a host & start earning with your property.",
    "🎉 Exclusive deals for first-time travelers!",
  ];

  // Message change every 4 sec
  const [currentMsg, setCurrentMsg] = useState(0);

  // Background change every 8 sec
  useEffect(() => {
    const msgInterval = setInterval(() => {
      setCurrentMsg((prev) => (prev + 1) % messages.length);
    }, 4000);

    const bgInterval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
    }, 8000);

    return () => {
      clearInterval(msgInterval);
      clearInterval(bgInterval);
    };
  }, [messages.length, backgroundImages.length]);

  return (
    <div className="relative min-h-[85vh] max-w-11/12 mx-auto my-5 rounded-2xl mb-10 px-2 flex py-5 md:py-10 lg:py-20 items-center justify-center bg-cover bg-center overflow-hidden">
      {/* Background Images with Transition */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <AnimatePresence mode="wait">
          <MotionDiv
            key={currentBg}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${backgroundImages[currentBg]})`,
            }}
          />
        </AnimatePresence>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-black/60 via-black/40 to-black/30" />
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/50 to-transparent" />

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 hidden lg:block">
        <MotionDiv
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20"
        >
          <FaStar className="text-yellow-400 text-xl" />
        </MotionDiv>
      </div>

      <div className="absolute bottom-20 right-10 hidden lg:block">
        <MotionDiv
          initial={{ scale: 0, y: 100 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: 0.8, type: "spring" }}
          className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 text-white text-center"
        >
          <p className="text-sm">⭐ 4.8/5 Rating</p>
          <p className="text-xs opacity-80">From 10k+ reviews</p>
        </MotionDiv>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center text-white px-4 w-full max-w-6xl">
        {/* Main Heading with Animation */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
            Find Your Perfect{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">
              Getaway
            </span>
          </h1>
          <p className="mt-4 mb-6 max-w-3xl text-lg md:text-xl opacity-90 mx-auto">
            Discover unique accommodations around the world. From cozy cabins to
            luxury villas, create unforgettable memories with HopNow.
          </p>
        </MotionDiv>

        {/* Rotating Message Card design*/}
        <MotionDiv
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8 w-full max-w-2xl"
        >
          <div className="bg-white/15 border border-white/30 backdrop-blur-md shadow-2xl rounded-2xl p-4">
            <AnimatePresence mode="wait">
              <MotionDiv
                key={currentMsg}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-white text-lg md:text-xl font-medium">
                  {messages[currentMsg]}
                </p>
              </MotionDiv>
            </AnimatePresence>
          </div>
        </MotionDiv>


        {/* CTA Buttons */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            to="/BrowseProperties"
            className="group bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 hover:bg-gray-50 flex items-center space-x-2"
          >
            <span>Browse Properties</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <Link to={'/become-host'} className="group bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-xl font-semibold border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 hover:bg-white/30 flex items-center space-x-2">
            <span>Become a Host</span>
            <span className="group-hover:translate-x-1 transition-transform">🏡</span>
          </Link>
        </MotionDiv>

        {/* Trust Badge */}
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-8 flex flex-wrap justify-center gap-6 text-sm opacity-80"
        >
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>24/7 Customer Support</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Best Price Guarantee</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Instant Confirmation</span>
          </div>
        </MotionDiv>
      </div>
    </div>
  );
};

export default Banner;