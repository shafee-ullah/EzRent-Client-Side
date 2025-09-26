import React from "react";
import { motion } from "framer-motion";

const MotionSection = motion.section;
const MotionDiv = motion.div;

const AboutEzRent = () => {
  return (
    <MotionSection
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="relative max-w-7xl mx-auto px-4 py-12 lg:py-16"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-300/20 dark:bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-green-400/20 dark:bg-green-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
          <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
            About EzRent
          </span>
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 dark:from-emerald-400 dark:via-green-400 dark:to-teal-400">
            Your trusted partner for stays, anywhere
          </span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          EzRent helps travelers discover comfortable, verified properties with
          seamless booking and friendly support. Our mission is to make every
          trip feel like home.
        </p>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Verified Listings",
            desc: "Every property is reviewed for quality, safety, and accuracy.",
          },
          {
            title: "Secure Booking",
            desc: "Fast, safe checkout with flexible cancellations on eligible stays.",
          },
          {
            title: "24/7 Support",
            desc: "We’re here to help before, during, and after your stay.",
          },
        ].map((item, idx) => (
          <MotionDiv
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="rounded-2xl p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm"
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              {item.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
          </MotionDiv>
        ))}
      </div>

      {/* Mission and Values */}
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative mt-12 rounded-2xl p-6 lg:p-8 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Our Mission
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          We believe travel should be simple, safe, and inspiring. EzRent
          connects guests with welcoming hosts, focusing on transparency,
          authentic experiences, and dependable support.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["Trust & Safety", "Delightful Experience", "Community First"].map(
            (v) => (
              <div
                key={v}
                className="rounded-xl p-5 bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800"
              >
                <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">
                  {v}
                </h3>
                <p className="mt-1 text-sm text-emerald-800/80 dark:text-emerald-300/80">
                  We continuously improve our platform to uphold this value.
                </p>
              </div>
            )
          )}
        </div>
      </MotionDiv>

      {/* Stats */}
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="relative mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { k: "+5k", v: "Happy guests" },
          { k: "1k+", v: "Active listings" },
          { k: "98%", v: "Satisfaction" },
          { k: "24/7", v: "Support" },
        ].map((s) => (
          <div
            key={s.v}
            className="text-center rounded-2xl p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
          >
            <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400">
              {s.k}
            </div>
            <div className="mt-1 text-gray-600 dark:text-gray-300">{s.v}</div>
          </div>
        ))}
      </MotionDiv>

      {/* Story Timeline */}
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative mt-12"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Our Journey
        </h2>
        <div className="max-w-3xl mx-auto">
          {[
            {
              year: "2023",
              text: "Started EzRent with a small set of curated homes.",
            },
            {
              year: "2024",
              text: "Expanded nationwide with verified hosts and instant booking.",
            },
            {
              year: "2025",
              text: "Launched advanced search, better safety, and 24/7 support.",
            },
          ].map((i) => (
            <div key={i.year} className="flex gap-4 items-start mb-5">
              <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500" />
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {i.year}
                </div>
                <div className="text-gray-600 dark:text-gray-300">{i.text}</div>
              </div>
            </div>
          ))}
        </div>
      </MotionDiv>

      {/* FAQ */}
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="relative mt-12 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900"
      >
        <div className="p-6 lg:p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            FAQs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: "Is EzRent safe?",
                a: "Yes. We verify listings and use secure payments.",
              },
              {
                q: "Can I cancel?",
                a: "Many stays support flexible cancellation—check listing details.",
              },
              {
                q: "How do I become a host?",
                a: "Create an account and apply via Dashboard → Become a Host.",
              },
              {
                q: "Do you offer support?",
                a: "We provide 24/7 support before, during, and after your stay.",
              },
            ].map((f) => (
              <div
                key={f.q}
                className="rounded-xl p-5 border border-gray-100 dark:border-gray-800"
              >
                <div className="font-semibold text-gray-900 dark:text-white">
                  {f.q}
                </div>
                <div className="mt-1 text-gray-600 dark:text-gray-300">
                  {f.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </MotionDiv>

      <MotionDiv
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative mt-10 rounded-2xl p-6 lg:p-8 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-center"
      >
        <h2 className="text-2xl font-bold">Hosting on EzRent</h2>
        <p className="mt-2 opacity-95">
          Share your space and earn. Join our community of trusted hosts today.
        </p>
      </MotionDiv>
    </MotionSection>
  );
};

export default AboutEzRent;
