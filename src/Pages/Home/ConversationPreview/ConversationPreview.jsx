import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Bot,
  Zap,
  Shield,
  Calendar,
  UserPlus,
  Heart,
  Send,
  Sparkles,
} from "lucide-react";

const MotionDiv = motion.div;
const MotionSection = motion.section;

const ConversationPreview = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const conversationFlow = [
    {
      user: "Hi, I need help booking a property for next month",
      ai: "Hello! I'd love to help you find the perfect stay. 🏡 What's your destination and travel dates?",
      benefit: "Instant Booking Assistance",
      icon: <Calendar className="w-4 h-4" />,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      user: "How do I become a host on EzRent?",
      ai: "Great question! I'll guide you through the entire process - from setting up your listing to managing bookings. Ready to get started?",
      benefit: "Host Onboarding Guide",
      icon: <UserPlus className="w-4 h-4" />,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      user: "What makes guest experiences special here?",
      ai: "We ensure 5-star experiences with verified properties, 24/7 support, and personalized recommendations tailored just for you! ✨",
      benefit: "Premium Guest Experience",
      icon: <Heart className="w-4 h-4" />,
      gradient: "from-amber-500 to-orange-500",
    },
    {
      user: "Is it safe to chat and book through the platform?",
      ai: "Absolutely! All conversations are encrypted and we have automated scam protection. Your security is our top priority. 🔒",
      benefit: "Secure & Hassle-Free",
      icon: <Shield className="w-4 h-4" />,
      gradient: "from-emerald-500 to-green-500",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTyping(true);
      setTimeout(() => {
        setCurrentStep((prev) => (prev + 1) % conversationFlow.length);
        setIsTyping(false);
      }, 1500);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const currentConversation = conversationFlow[currentStep];

  return (
    <MotionSection
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="relative max-w-7xl mx-auto px-4 py-16 lg:py-20"
    >
      {/* Main Background Gradient */}
      <div className="absolute inset-0  -z-10 rounded-3xl" />

      {/* Animated Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
        <MotionDiv
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-30"
        />
        <MotionDiv
          animate={{
            rotate: [360, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-20 -left-20 w-80 h-80  rounded-full blur-3xl opacity-30"
        />
      </div>

      <div className="relative">
        {/* Header Section */}
        <div className="text-center mb-12">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm mb-6"
          >
            <Bot className="w-5 h-5 text-emerald-500" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Live Conversation Preview
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
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Experience the future of rental assistance through natural
              conversations. Get instant help with bookings, hosting, and more -
              just like chatting with a friend.
            </p>
          </MotionDiv>
        </div>

        {/* Main Chat Container */}
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-200 dark:border-gray-700 shadow-2xl overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-6">
              <div className="flex items-center gap-4">
                <MotionDiv
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm"
                >
                  <Bot className="w-6 h-6 text-white" />
                </MotionDiv>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg">
                    EzRent AI Assistant
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse" />
                    <span className="text-emerald-100 text-sm">
                      Online • Ready to help
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {conversationFlow.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setIsTyping(true);
                        setTimeout(() => {
                          setCurrentStep(index);
                          setIsTyping(false);
                        }, 500);
                      }}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentStep === index
                          ? "bg-white scale-125"
                          : "bg-white/40 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="p-6 space-y-6 min-h-[400px] flex flex-col justify-center">
              {/* User Message */}
              <AnimatePresence mode="wait">
                <MotionDiv
                  key={`user-${currentStep}`}
                  initial={{ opacity: 0, x: 20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -20, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="flex justify-end"
                >
                  <div className="flex items-end gap-3 max-w-[80%]">
                    <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white p-4 rounded-2xl rounded-br-md shadow-lg">
                      <p className="text-sm lg:text-base">
                        {currentConversation.user}
                      </p>
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                      You
                    </div>
                  </div>
                </MotionDiv>
              </AnimatePresence>

              {/* AI Message */}
              <AnimatePresence mode="wait">
                <MotionDiv
                  key={`ai-${currentStep}`}
                  initial={{ opacity: 0, x: -20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex items-start gap-3 max-w-[80%]"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                    AI
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-2xl rounded-bl-md shadow-lg flex-1">
                    {isTyping ? (
                      <div className="flex items-center gap-1">
                        <div className="flex space-x-1">
                          {[0, 1, 2].map((i) => (
                            <MotionDiv
                              key={i}
                              animate={{ y: [0, -5, 0] }}
                              transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: i * 0.2,
                              }}
                              className="w-2 h-2 bg-gray-400 rounded-full"
                            />
                          ))}
                        </div>
                        <span className="text-gray-500 text-sm ml-2">
                          AI is typing...
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-sm lg:text-base text-gray-700 dark:text-gray-300">
                          {currentConversation.ai}
                        </p>

                        {/* Benefit Highlight */}
                        <MotionDiv
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.6 }}
                          className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r ${currentConversation.gradient} text-white text-xs font-medium shadow-sm`}
                        >
                          {currentConversation.icon}
                          {currentConversation.benefit}
                        </MotionDiv>
                      </div>
                    )}
                  </div>
                </MotionDiv>
              </AnimatePresence>
            </div>

            {/* Quick Action Buttons */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
              <div className="flex flex-wrap gap-3">
                {conversationFlow.map((item, index) => (
                  <MotionDiv
                    key={item.benefit}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button
                      onClick={() => {
                        setIsTyping(true);
                        setTimeout(() => {
                          setCurrentStep(index);
                          setIsTyping(false);
                        }, 500);
                      }}
                      className={`inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white dark:bg-gray-800 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 text-sm font-medium ${
                        currentStep === index
                          ? "ring-2 ring-emerald-500 text-emerald-600 dark:text-emerald-400"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <div
                        className={`p-1 rounded-lg bg-gradient-to-r ${item.gradient}`}
                      >
                        {React.cloneElement(item.icon, {
                          className: "w-3 h-3 text-white",
                        })}
                      </div>
                      {item.benefit}
                    </button>
                  </MotionDiv>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-6 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-4">
                <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-3 flex items-center">
                  <input
                    type="text"
                    placeholder="Type your message here..."
                    className="flex-1 bg-transparent border-none outline-none text-gray-700 dark:text-gray-300 placeholder-gray-500 text-sm"
                  />
                </div>
                <MotionDiv
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button className="bg-gradient-to-r from-emerald-500 to-green-600 text-white p-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <Send className="w-5 h-5" />
                  </button>
                </MotionDiv>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl p-8 shadow-2xl backdrop-blur-sm border border-emerald-400/20">
            <div className="text-left">
              <h3 className="text-2xl font-bold text-white mb-2">
                Ready to start your conversation?
              </h3>
              <p className="text-emerald-100 text-lg">
                Experience the AI assistant that understands your needs
                instantly
              </p>
            </div>

            <MotionDiv
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0"
            >
              <button
                onClick={() => window.EzRentChatbot?.openChat?.()}
                className="bg-white text-emerald-600 px-8 py-4 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-3 text-lg"
              >
                <MessageCircle className="w-6 h-6" />
                Start Chatting Now
              </button>
            </MotionDiv>
          </div>

          {/* <div className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-2xl border border-gray-200 dark:border-gray-700">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Instant responses • 24/7 available • No waiting</span>
          </div> */}
        </MotionDiv>
      </div>
    </MotionSection>
  );
};

export default ConversationPreview;
