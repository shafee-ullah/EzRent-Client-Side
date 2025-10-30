import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Sparkles, Clock3, Star } from "lucide-react";

const MotionDiv = motion.div;
const MotionSection = motion.section;

const features = [
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Trusted & Verified",
    desc: "All listings are verified to ensure safety and authenticity.",
    stats: "5000+ Verified Stays",
    gradient: "from-blue-500 to-cyan-500",
    delay: 0.1
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Top-rated Properties",
    desc: "Handpicked spaces with high ratings and great amenities.",
    stats: "4.9/5 Average Rating",
    gradient: "from-amber-500 to-orange-500",
    delay: 0.2
  },
  {
    icon: <Clock3 className="w-6 h-6" />,
    title: "Flexible Booking",
    desc: "Easy cancellations and date changes on eligible stays.",
    stats: "24hr Free Cancellation",
    gradient: "from-emerald-500 to-green-500",
    delay: 0.3
  },
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    title: "24/7 Support",
    desc: "We're here round-the-clock whenever you need help.",
    stats: "2min Average Response",
    gradient: "from-purple-500 to-pink-500",
    delay: 0.4
  },
];

const FeatureCard = ({ feature, index }) => {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      transition={{ 
        duration: 0.6, 
        delay: feature.delay,
        ease: "easeOut" 
      }}
      className="group relative"
    >
      {/* Background Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-2xl blur-xl transition-opacity duration-500`} />
      
      {/* Animated Border */}
      <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 p-px`}>
        <div className="w-full h-full bg-white dark:bg-gray-900 rounded-2xl" />
      </div>

      <div className="relative rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-sm border border-gray-100 dark:border-gray-800 group-hover:shadow-xl transition-all duration-300 overflow-hidden">
        
        {/* Animated Background Pattern */}
        <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.02] transition-opacity duration-500`} />
        
        {/* Floating Icon Container */}
        <MotionDiv
          whileHover={{ 
            rotate: [0, -5, 5, 0],
            transition: { duration: 0.5, ease: "easeInOut" }
          }}
          className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4 flex items-center justify-center shadow-lg`}
        >
          <div className="text-white">
            {feature.icon}
          </div>
          
          {/* Icon Glow */}
          <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-xl opacity-50 blur-sm`} />
        </MotionDiv>

        {/* Content */}
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white relative">
          {feature.title}
          <MotionDiv
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 0.8, delay: feature.delay + 0.2 }}
            className="h-0.5 bg-gradient-to-r from-transparent via-current to-transparent opacity-20 mt-1"
          />
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-3 leading-relaxed relative">
          {feature.desc}
        </p>
        
        {/* Stats Badge */}
        <MotionDiv
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: feature.delay + 0.3 }}
          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${feature.gradient} text-white shadow-sm`}
        >
          <Star className="w-3 h-3 fill-current" />
          {feature.stats}
        </MotionDiv>

        {/* Hover Effect Line */}
        <MotionDiv
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
          className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r ${feature.gradient} origin-left`}
        />
      </div>
    </MotionDiv>
  );
};

const WhyChooseUs = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <MotionSection
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="relative max-w-11/12 mx-auto px-4 py-16 lg:py-16"
    >
      {/* Animated Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <MotionDiv
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-20 -right-20 w-64 h-64  rounded-full blur-3xl opacity-30"
        />
        <MotionDiv
          animate={{
            rotate: [360, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-20 -left-20 w-80 h-80  opacity-30"
        />
        <MotionDiv
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-amber-200 dark:bg-amber-900/20 rounded-full blur-2xl opacity-40"
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
          <div className="flex items-center gap-1 text-amber-500">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Trusted by 5000+ Travelers
          </span>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 dark:from-emerald-400 dark:via-green-400 dark:to-teal-400">
              Why Travelers Choose Us
            </span>
          </h2>
          
          <MotionDiv
            initial={{ width: 0 }}
            whileInView={{ width: 120 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1.5 bg-gradient-to-r from-emerald-400 to-green-600 rounded-full mx-auto mb-6"
          />
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience the difference with our commitment to excellence, 
            ensuring every stay is memorable and hassle-free
          </p>
        </MotionDiv>
      </div>

      {/* Features Grid */}
      <MotionDiv
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 relative"
      >
        {features.map((feature, index) => (
          <FeatureCard 
            key={feature.title} 
            feature={feature} 
            index={index} 
          />
        ))}
      </MotionDiv>

      {/* Bottom CTA */}
      {/* <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-center mt-12 px-4"
      >
        <div className="inline-flex flex-col sm:flex-row items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>30-day money-back guarantee</span>
          </div>
          <span className="hidden sm:inline">•</span>
          <span>24/7 customer support</span>
        </div>
      </MotionDiv> */}
    </MotionSection>
  );
};

export default WhyChooseUs;