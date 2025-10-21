import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Quote,
  Camera,
  Globe,
  Users,
  Star,
  Heart,
  ArrowRight,
  Zap,
} from "lucide-react";

const MotionDiv = motion.div;
const MotionSection = motion.section;

const GuestExperienceSection = () => {
  return (
    <MotionSection
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className="py-16 lg:py-12"
    >
      <div className="max-w-11/12 mx-auto px-6 text-center">
        {/* Header */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          {/* <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Globe className="w-4 h-4" />
            <span>EzRent Community</span>
          </div> */}
           <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm mb-6"
        >
          <Globe className="w-5 h-5 text-emerald-500" />
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          EzRent Community
          </span>
          
        </MotionDiv>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            Share Your <span className="text-emerald-600">Journey</span> with
            the World
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Every stay tells a story — of laughter, discovery, connection, and
            unforgettable memories. <br /> Your experience can inspire someone’s
            next adventure.
          </p>
        </MotionDiv>

        {/* Inspirational Quote Section */}
        <MotionDiv
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 px-6 sm:px-10 py-14 mb-20 max-w-5xl mx-auto"
        >
          <Quote className="absolute top-6 left-6 w-10 h-10 text-emerald-400 opacity-40" />
          <Quote className="absolute bottom-6 right-6 w-10 h-10 text-emerald-400 opacity-40 rotate-180" />

          <p className="text-2xl md:text-3xl italic text-gray-700 dark:text-gray-200 font-medium mb-8 leading-snug">
            “Traveling leaves you speechless, then turns you into a
            storyteller.”
          </p>

          <div className="flex items-center justify-center gap-3 text-emerald-600 dark:text-emerald-400 font-semibold">
            <Sparkles className="w-5 h-5" />
            <span>Let your story shine on EzRent ✨</span>
          </div>
        </MotionDiv>

        {/* Why Share Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
          {[
            {
              icon: <Users className="w-10 h-10 text-emerald-500" />,
              title: "Inspire a Global Community",
              desc: "Your journey could spark wanderlust in travelers across the world.",
            },
            {
              icon: <Star className="w-10 h-10 text-yellow-500" />,
              title: "Build Your Travel Reputation",
              desc: "Share your honest insights and become a trusted voice in the EzRent community.",
            },
            {
              icon: <Heart className="w-10 h-10 text-red-500" />,
              title: "Celebrate Meaningful Memories",
              desc: "Every experience you share helps others create their own lasting memories.",
            },
          ].map((item, i) => (
            <MotionDiv
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                {item.icon}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            </MotionDiv>
          ))}
        </div>

        {/* CTA Section */}
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
                Ready to Share Your Story?
              </h3>
              <p className="text-emerald-100 text-lg">
              Inspire thousands of travelers by posting <br className="hidden md:block" />your journey, insights, and hidden gems from your EzRent adventures.
              </p>
            </div>

            <MotionDiv
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="flex-shrink-0"
>
  <Link
    to="/guest-experiences"
    className="bg-white text-emerald-600 px-8 py-4 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-3 text-lg"
  >
    <ArrowRight className="w-6 h-6" />
    Explore Stories
  </Link>
</MotionDiv>
          </div>

          {/* <div className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-2xl border border-gray-200 dark:border-gray-700">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>
              Share your journey • Inspire travelers • Discover hidden gems
            </span>
          </div> */}
        </MotionDiv>
      </div>
    </MotionSection>
  );
};

export default GuestExperienceSection;
