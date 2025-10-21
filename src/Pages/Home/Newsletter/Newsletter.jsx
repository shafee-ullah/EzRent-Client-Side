import React, { useState } from "react";
import { motion } from "framer-motion";

const MotionSection = motion.section;
const MotionDiv = motion.div;

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");

    const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setSubmitted(true);
  };

  return (
    <MotionSection
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="relative max-w-11/12 mx-auto px-4 pt-2 py-16 lg:pt-4 lg:pb-20"
    >
      {/* Background decorations */}
      {/* <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-emerald-400/20 dark:bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-green-500/20 dark:bg-green-400/10 rounded-full blur-3xl" />
      </div> */}

      <MotionDiv
        initial={{ scale: 0.98, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl border border-gray-100 dark:border-gray-800 bg-gradient-to-br from-white to-emerald-50/60 dark:from-gray-900 dark:to-gray-900/60 shadow-sm"
      >
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-gradient-to-br from-emerald-300/30 to-green-400/30 blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-56 h-56 rounded-full bg-gradient-to-tr from-emerald-300/20 to-green-400/20 blur-2xl" />

        <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-8 p-6 lg:p-10 items-center justify-items-center">
          <div className="lg:col-span-3 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-800 mb-4">
              <span className="w-1.5 h-1.5 bg-emerald-600 dark:bg-emerald-400 rounded-full" />
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                Stay in the loop
              </span>
            </div>

            <h3 className="text-3xl lg:text-4xl font-bold tracking-tight mb-3">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 dark:from-emerald-400 dark:via-green-400 dark:to-teal-400">
                Subscribe to our newsletter
              </span>
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get handpicked property highlights, travel tips, and exclusive
              offers delivered to your inbox.
            </p>
          </div>

          <div className="lg:col-span-2 w-full max-w-xl mx-auto">
            {submitted ? (
              <div className="h-full w-full flex items-center justify-center text-center">
                <div className="w-full rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-900/20 p-5">
                  <p className="text-emerald-800 dark:text-emerald-300 font-semibold">
                    Thanks for subscribing!
                  </p>
                  <p className="text-sm text-emerald-700/80 dark:text-emerald-300/80 mt-1">
                    We'll keep you posted with the latest updates.
                  </p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="flex flex-col sm:flex-row gap-3 items-stretch justify-center"
              >
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  Subscribe
                </button>
                {error && (
                  <span className="text-sm text-red-600 dark:text-red-400 -mt-1 sm:mt-0 sm:ml-2">
                    {error}
                  </span>
                )}
                {/* <p className="text-xs text-gray-500 dark:text-gray-400 sm:ml-2">
                  We respect your privacy. Unsubscribe anytime.
                </p> */}
              </form>
            )}
          </div>
        </div>
      </MotionDiv>
    </MotionSection>
  );
};

export default Newsletter;
