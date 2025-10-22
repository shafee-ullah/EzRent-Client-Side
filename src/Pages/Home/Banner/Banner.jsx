import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Star, TrendingUp, ArrowRight, MapPin, Users, Shield } from "lucide-react";

const MotionDiv = motion.div;
const MotionButton = motion.button;

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
    <section className="relative pt-16 pb-20 md:pt-20 md:pb-24 lg:pt-24 lg:pb-32 px-4">
      <div className="max-w-11/12 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            <MotionDiv
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm mb-6"
            >
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Trusted by 50,000+ Travelers
              </span>
            </MotionDiv>

            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400">
                Find Your Perfect
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">
                Getaway
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Discover unique accommodations around the world. From cozy cabins to
              luxury villas, create unforgettable memories with EzRent.
            </p>

            {/* Rotating Message Card */}
            <MotionDiv
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-8"
            >
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-lg">
                <AnimatePresence mode="wait">
                  <MotionDiv
                    key={currentMsg}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6 }}
                  >
                    <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">
                      {messages[currentMsg]}
                    </p>
                  </MotionDiv>
                </AnimatePresence>
              </div>
            </MotionDiv>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <MotionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-2xl font-semibold text-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3"
              >
                <Link to="/BrowseProperties" className="flex items-center gap-3">
                  Browse Properties
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </MotionButton>

              <MotionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-2xl font-semibold text-lg hover:shadow-lg transition-all duration-300"
              >
                <Link to="/become-host" className="flex items-center gap-2">
                  Become a Host
                  <span>🏡</span>
                </Link>
              </MotionButton>
            </div>

            {/* Trust Badge */}
            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-wrap gap-6 justify-center lg:justify-start"
            >
              {[
                { icon: Shield, label: "24/7 Customer Support" },
                { icon: Star, label: "Best Price Guarantee" },
                { icon: MapPin, label: "Instant Confirmation" },
              ].map((item, index) => (
                <MotionDiv
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                  className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <span>{item.label}</span>
                </MotionDiv>
              ))}
            </MotionDiv>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mt-12 justify-center lg:justify-start">
              {[
                { value: "50,000+", label: "Happy Travelers" },
                { value: "5,000+", label: "Properties" },
                { value: "4.9★", label: "Average Rating" },
              ].map((stat, index) => (
                <MotionDiv
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </MotionDiv>
              ))}
            </div>
          </MotionDiv>

          {/* Hero Image with Background Rotation */}
          <MotionDiv
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[600px]">
              {/* Background Images with Transition */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
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
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/40 via-black/20 to-transparent" />

              {/* Floating Rating Card */}
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-white fill-current" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      ⭐ 4.8/5 Rating
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      From 10k+ verified reviews
                    </div>
                  </div>
                </div>
              </MotionDiv>

              {/* Background Dots Indicator */}
              <div className="absolute top-6 right-6 flex items-center gap-2">
                {backgroundImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentBg(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === currentBg
                        ? "bg-white w-4"
                        : "bg-white/50 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Floating Elements */}
            <MotionDiv
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute -top-4 -left-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-3 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg"
            >
              <MapPin className="text-emerald-500 w-6 h-6" />
            </MotionDiv>

            <MotionDiv
              initial={{ scale: 0, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ delay: 0.8, type: "spring" }}
              className="absolute -bottom-4 -right-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg text-center"
            >
              <Users className="w-6 h-6 text-emerald-500 mb-1 mx-auto" />
              <p className="text-sm font-semibold text-gray-900 dark:text-white">50K+</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Travelers</p>
            </MotionDiv>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
};

export default Banner;