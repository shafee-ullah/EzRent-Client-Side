import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Bot, Zap, Shield, Calendar, UserPlus, Star, Heart, Sparkles } from "lucide-react";

const MotionDiv = motion.div;
const MotionSection = motion.section;

const aiFeatures = [
  {
    icon: <Calendar className="w-6 h-6" />,
    title: "How do I book property?",
    desc: "Get step-by-step guidance to find and book your perfect stay with real-time availability and instant confirmation.",
    stats: "Instant Booking Support",
    gradient: "from-blue-500 to-cyan-500",
    delay: 0.1
  },
  {
    icon: <UserPlus className="w-6 h-6" />,
    title: "How do I become host?",
    desc: "Learn everything about listing your property, setting prices, and managing bookings with our AI-guided onboarding.",
    stats: "Host Setup Guide",
    gradient: "from-purple-500 to-pink-500",
    delay: 0.2
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "What is guest experiences?",
    desc: "Discover how we ensure memorable stays with quality checks, guest support, and personalized recommendations.",
    stats: "5-Star Experiences",
    gradient: "from-amber-500 to-orange-500",
    delay: 0.3
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Secure & Hassle-Free Conversations",
    desc: "Chat safely with hosts and guests through our encrypted platform with automated scam protection.",
    stats: "100% Secure Messaging",
    gradient: "from-emerald-500 to-green-500",
    delay: 0.4
  },
];

const aiCapabilities = [
  {
    icon: <Zap className="w-5 h-5" />,
    text: "Instant property search & booking",
    gradient: "from-amber-500 to-orange-500"
  },
  {
    icon: <Bot className="w-5 h-5" />,
    text: "24/7 automated support",
    gradient: "from-emerald-500 to-green-500"
  },
  {
    icon: <MessageCircle className="w-5 h-5" />,
    text: "Natural conversation",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: <Shield className="w-5 h-5" />,
    text: "Secure transactions",
    gradient: "from-purple-500 to-pink-500"
  }
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

      <div className="relative rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-6 shadow-lg border border-gray-200 dark:border-gray-700 group-hover:shadow-xl transition-all duration-300 overflow-hidden">
        
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
          <Zap className="w-3 h-3 fill-current" />
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

const AIAssistantSection = () => {
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
      className="relative max-w-11/12 mx-auto px-4 py-16 lg:py-8"
    >
      {/* Main Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-emerald-900/10 -z-10" />

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
          className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-r from-emerald-200 to-green-200 dark:from-emerald-900/20 dark:to-green-900/20 rounded-full blur-3xl opacity-30"
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
          className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-r from-blue-200 to-cyan-200 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-full blur-3xl opacity-30"
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
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm mb-6"
        >
          <Bot className="w-5 h-5 text-emerald-500" />
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Powered by Advanced AI
          </span>
          <Sparkles className="w-4 h-4 text-amber-500" />
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400">
              Meet EzRent AI Assistant
            </span>
          </h2>
          
          <MotionDiv
            initial={{ width: 0 }}
            whileInView={{ width: 120 }}
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
          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6">
            Your intelligent companion designed to help you find the perfect property, 
            manage bookings, and get instant answers — anytime, anywhere.
          </p>
          
          {/* AI Capabilities */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {aiCapabilities.map((capability, index) => (
              <MotionDiv
                key={capability.text}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`bg-gradient-to-r ${capability.gradient} rounded-lg p-1`}>
                  <div className="text-white">
                    {capability.icon}
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {capability.text}
                </span>
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>
      </div>

      {/* Features Grid */}
      <MotionDiv
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative"
      >
        {aiFeatures.map((feature, index) => (
          <FeatureCard 
            key={feature.title} 
            feature={feature} 
            index={index} 
          />
        ))}
      </MotionDiv>

      {/* Bottom CTA */}
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-center mt-12"
      >
        <MotionDiv
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="inline-flex flex-col sm:flex-row items-center gap-6 bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl p-8 shadow-2xl backdrop-blur-sm border border-emerald-400/20"
        >
          <div className="text-left">
            <h3 className="text-2xl font-bold text-white mb-2">
              Ready to experience the future of renting?
            </h3>
            <p className="text-emerald-100 text-lg">
              Chat with our AI Assistant now - no waiting, no browsing endlessly
            </p>
          </div>
          <MotionDiv
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <button className="bg-white text-emerald-600 px-8 py-4 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-3 text-lg">
              <MessageCircle className="w-6 h-6" />
              Start Chatting Now
            </button>
          </MotionDiv>
        </MotionDiv>
        
        <div className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-2xl border border-gray-200 dark:border-gray-700">
          <Shield className="w-4 h-4 text-emerald-500" />
          <span>Always free • No signup required • 24/7 available</span>
        </div>
      </MotionDiv>
    </MotionSection>
  );
};

export default AIAssistantSection;