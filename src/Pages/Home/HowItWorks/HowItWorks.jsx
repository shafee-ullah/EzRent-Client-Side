import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  Calendar,
  Star,
  Home,
  ArrowRight,
  CheckCircle,
  Zap
} from "lucide-react";

const MotionDiv = motion.div;
const MotionSection = motion.section;

const steps = [
  {
    number: "01",
    icon: <Search className="w-6 h-6" />,
    title: "Browse & Discover",
    description:
      "Explore thousands of verified properties with high-quality photos and detailed amenities.",
    features: [
      "Filter by location & dates",
      "View 360° virtual tours",
      "Read genuine guest reviews",
    ],
    gradient: "from-blue-500 to-cyan-500",
    // illustration: (
    //   <div className="relative w-full h-40">
    //     <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-2xl" />
    //     <div className="absolute top-4 left-4 w-20 h-20 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex items-center justify-center">
    //       <Home className="w-8 h-8 text-blue-500" />
    //     </div>
    //     <div className="absolute top-10 right-6 w-16 h-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center">
    //       <Star className="w-6 h-6 text-amber-500" />
    //     </div>
    //     <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center">
    //       <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">4.9★</span>
    //     </div>
    //   </div>
    // )
  },
  {
    number: "02",
    icon: <Calendar className="w-6 h-6" />,
    title: "Book Instantly",
    description:
      "Secure your stay with our instant confirmation system and flexible payment options.",
    features: [
      "Instant confirmation",
      "Secure payment processing",
      "Free cancellation options",
    ],
    gradient: "from-emerald-500 to-green-500",
    // illustration: (
    //   <div className="relative w-full h-40">
    //     <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-green-400/20 rounded-2xl" />
    //     <div className="absolute top-6 left-6 w-14 h-14 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex items-center justify-center">
    //       <CheckCircle className="w-6 h-6 text-emerald-500" />
    //     </div>
    //     <div className="absolute top-4 right-4 w-20 h-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center">
    //       <span className="text-sm font-bold text-emerald-600">$129</span>
    //     </div>
    //     <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-28 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full shadow-lg flex items-center justify-center">
    //       <span className="text-sm font-semibold text-white">Book Now</span>
    //     </div>
    //   </div>
    // )
  },
  {
    number: "03",
    icon: <Star className="w-6 h-6" />,
    title: "Enjoy Your Stay",
    description:
      "Experience seamless check-in and premium hospitality with 24/7 guest support.",
    features: [
      "Digital check-in",
      "24/7 guest support",
      "Local experience guides",
    ],
    gradient: "from-amber-500 to-orange-500",
    // illustration: (
    //   <div className="relative w-full h-40">
    //     <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-2xl" />
    //     <div className="absolute top-6 left-6 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center">
    //       <span className="text-lg">🎉</span>
    //     </div>
    //     <div className="absolute top-10 right-8 w-16 h-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex items-center justify-center">
    //       <span className="text-2xl">🏠</span>
    //     </div>
    //     <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-20 h-8 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center">
    //       <span className="text-xs font-semibold text-amber-600">Enjoy!</span>
    //     </div>
    //   </div>
    // )
  },
];

const StepCard = ({ step, index, totalSteps }) => {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group relative"
    >
      {/* Connecting Line (Desktop only) */}
      {index < totalSteps - 1 && (
        <div className="hidden lg:block absolute top-20 left-1/2 w-full h-0.5 bg-gradient-to-r from-gray-200 to-gray-200 dark:from-gray-700 dark:to-gray-700 z-0">
          <MotionDiv
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: index * 0.3 + 0.5 }}
            className="h-full bg-gradient-to-r from-emerald-400 to-green-500 origin-left"
          />
        </div>
      )}

      {/* Step Number Badge */}
      <div className="relative z-10 flex justify-center mb-6">
        <MotionDiv
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2, type: "spring" }}
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} shadow-lg flex items-center justify-center group-hover:shadow-xl transition-shadow duration-300`}
        >
          <span className="text-2xl font-bold text-white">{step.number}</span>
        </MotionDiv>
      </div>

      {/* Card Content */}
      <div className="relative bg-white dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 group-hover:shadow-lg transition-all duration-300 overflow-hidden">
        {/* Gradient Overlay on Hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
        />

        {/* Icon */}
        <MotionDiv
          whileHover={{
            scale: 1.1,
            rotate: [0, -5, 5, 0],
            transition: { duration: 0.5 },
          }}
          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.gradient} mb-4 flex items-center justify-center shadow-md`}
        >
          <div className="text-white">{step.icon}</div>
        </MotionDiv>

        {/* Title */}
        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
          {step.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          {step.description}
        </p>

        {/* Features List */}
        <ul className="space-y-2 mb-4">
          {step.features.map((feature, featureIndex) => (
            <motion.li
              key={feature}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.2 + featureIndex * 0.1,
              }}
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
            >
              <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              {feature}
            </motion.li>
          ))}
        </ul>

        {/* Illustration */}
        <div className="mt-4">{step.illustration}</div>

        {/* Bottom Gradient Line */}
        <MotionDiv
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: index * 0.2 + 0.4 }}
          className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${step.gradient} origin-left`}
        />
      </div>

      {/* Arrow Indicator (Mobile only) */}
      {index < totalSteps - 1 && (
        <div className="lg:hidden flex justify-center my-6">
          <MotionDiv
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center"
          >
            <ArrowRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </MotionDiv>
        </div>
      )}
    </MotionDiv>
  );
};

const HowItWorks = () => {
  return (
    <MotionSection
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="relative max-w-11/12 mx-auto px-4 py-16 lg:py-14"
    >
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <MotionDiv
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-20 -right-20 w-64 h-64  rounded-full blur-3xl opacity-30"
        />
        <MotionDiv
          animate={{
            rotate: [360, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-20 -left-20 w-80 h-80  rounded-full blur-3xl opacity-30"
        />
      </div>

      {/* Header Section */}
      <div className="relative text-center mb-16">
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 shadow-sm mb-6"
        >
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Simple 3-Step Process
          </span>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 dark:from-emerald-400 dark:via-green-400 dark:to-teal-400">
              How It Works
            </span>
          </h2>

          <MotionDiv
            initial={{ width: 0 }}
            whileInView={{ width: 100 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1.5 bg-gradient-to-r from-emerald-400 to-green-600 rounded-full mx-auto mb-4"
          />
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Getting your perfect stay is easier than ever. Follow these three
            simple steps and start your journey in minutes.
          </p>
        </MotionDiv>
      </div>

      {/* Steps Grid */}
      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <StepCard
              key={step.number}
              step={step}
              index={index}
              totalSteps={steps.length}
            />
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      {/* <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center mt-12"
      >
        <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <Star className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Ready to find your perfect stay?
            </span>
          </div>
          <Link
            to="/BrowseProperties"
            className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Start Exploring
          </Link>
        </div>
      </MotionDiv> */}
      <MotionDiv
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: 0.8 }}
  className="text-center mt-12"
>
  <div className="inline-flex flex-col  sm:flex-row items-center gap-6 bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl p-8 shadow-2xl backdrop-blur-sm border border-emerald-400/20">
    <div className="text-left">
      <h3 className="text-2xl font-bold text-white mb-2">
        Ready to find your perfect stay?
      </h3>
      <p className="text-emerald-100 text-lg">
        Discover amazing properties tailored just for you
      </p>
    </div>

    <MotionDiv
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex-shrink-0"
    >
      <Link
        to="/BrowseProperties"
        className="bg-white text-emerald-600 px-8 py-4 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-3 text-lg"
      >
        <ArrowRight className="w-6 h-6" />
        Start Exploring
      </Link>
    </MotionDiv>
  </div>

  {/* <div className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-2xl border border-gray-200 dark:border-gray-700">
    <Zap className="w-4 h-4 text-amber-500" />
    <span>Instant booking • Verified properties • Secure payments</span>
  </div> */}
</MotionDiv>
    </MotionSection>
  );
};

export default HowItWorks;
