import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, MapPin, Star } from "lucide-react";

const MotionSection = motion.section;
const MotionDiv = motion.div;
const MotionSvg = motion.svg;

const testimonials = [
  {
    name: "Aisha Rahman",
    location: "Dhaka",
    rating: 5,
    quote: "The booking process was super smooth and the place was exactly as shown!",
    shortQuote: "Smooth booking process",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Sarwar Islam",
    location: "Sylhet",
    rating: 4,
    quote: "Great value and responsive host. Will definitely book again.",
    shortQuote: "Great value and responsive host",
    avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Nusrat Jahan",
    location: "Cox's Bazar",
    rating: 5,
    quote: "Amazing stay near the beach. Clean, cozy, and hassle-free!",
    shortQuote: "Amazing beachside stay",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Tanvir Chowdhury",
    location: "Chattogram",
    rating: 4,
    quote: "Easy check-in and friendly support. Highly recommended.",
    shortQuote: "Easy check-in, friendly support",
    avatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Rahim Ahmed",
    location: "Khulna",
    rating: 5,
    quote: "Perfect location with stunning views. Everything was spotless!",
    shortQuote: "Perfect location, stunning views",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Fatima Begum",
    location: "Rajshahi",
    rating: 5,
    quote: "Exceptional hospitality and comfortable accommodations.",
    shortQuote: "Exceptional hospitality",
    avatar: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?q=80&w=400&auto=format&fit=crop",
  },
];

const StarRow = ({ rating, size = "w-5 h-5" }) => {
  return (
    <div className="flex gap-0.5" aria-label={`Rating: ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <MotionSvg
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, delay: i * 0.08, ease: "easeOut" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={i <= rating ? "#16a34a" : "#d1d5db"}
          className={size}
          role="img"
        >
          <path d="M11.48 3.499a.75.75 0 0 1 1.04 0l2.36 2.36c.12.12.28.2.45.22l3.33.48a.75.75 0 0 1 .41 1.28l-2.41 2.35a.75.75 0 0 0-.22.66l.57 3.31a.75.75 0 0 1-1.09.79l-2.98-1.57a.75.75 0 0 0-.7 0l-2.98 1.57a.75.75 0 0 1-1.09-.79l.57-3.31a.75.75 0 0 0-.22-.66L4.93 7.84a.75.75 0 0 1 .41-1.28l3.33-.48c.17-.02.33-.1.45-.22l2.36-2.36Z" />
        </MotionSvg>
      ))}
    </div>
  );
};

const highlightWords = (text, words) => {
  if (!words || words.length === 0) return text;
  const pattern = new RegExp(
    `(\\b${words
      .map((w) => w.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&"))
      .join("\\b|\\b")}\\b)`,
    "gi"
  );
  const parts = String(text).split(pattern);
  return parts.map((part, idx) => {
    const isMatch = words.some((w) => w.toLowerCase() === part.toLowerCase());
    return isMatch ? (
      <span
        key={idx}
        className="font-semibold text-emerald-700 dark:text-emerald-300"
      >
        {part}
      </span>
    ) : (
      <span key={idx}>{part}</span>
    );
  });
};

const SmallTestimonialCard = ({ testimonial, index }) => {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-start gap-3">
        <img
          src={testimonial.avatar}
          alt={`${testimonial.name} avatar`}
          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
          loading="lazy"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
              {testimonial.name}
            </h4>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-xs font-medium">{testimonial.rating}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 mb-2">
            <MapPin className="w-3 h-3" />
            <span className="text-xs">{testimonial.location}</span>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
            {testimonial.shortQuote}
          </p>
        </div>
      </div>
    </MotionDiv>
  );
};

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, []);

  const goTo = (i) => {
    setIndex(i);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }
  };

  const next = () => goTo((index + 1) % testimonials.length);
  const prev = () =>
    goTo((index - 1 + testimonials.length) % testimonials.length);

  const highlightList = useMemo(
    () => [
      "smooth", "exactly", "Great", "responsive", "Amazing", "Clean", 
      "cozy", "hassle-free", "Easy", "friendly", "recommended", "perfect",
      "stunning", "exceptional", "comfortable", "spotless"
    ],
    []
  );

  const smallTestimonials = testimonials.slice(0, 3);

  return (
    <MotionSection
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative max-w-7xl mx-auto px-4 py-12 lg:py-8"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-transparent to-green-50/20 dark:from-emerald-900/10 dark:via-transparent dark:to-green-900/5 rounded-3xl" />
      
      {/* Floating Elements */}
      <div className="pointer-events-none absolute -top-10 right-10 h-48 w-48 rounded-full blur-3xl bg-emerald-400/20 dark:bg-emerald-300/10" />
      <div className="pointer-events-none absolute -bottom-8 left-8 h-40 w-40 rounded-full blur-3xl bg-green-500/20 dark:bg-green-400/10" />
      <div className="pointer-events-none absolute top-1/2 left-1/4 h-32 w-32 rounded-full blur-2xl bg-amber-400/10 dark:bg-amber-300/5" />

      {/* Header */}
      <div className="relative text-center mb-12 lg:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 mb-4"
        >
          <Star className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
            Trusted by 5000+ Guests
          </span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl lg:text-5xl font-bold tracking-tight mb-4"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400">
            What Our Guests Say
          </span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          Discover why travelers choose us for their perfect stay experience
        </motion.p>
      </div>

      {/* Main Carousel */}
      <div className="relative mb-12 lg:mb-10">
        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-xl border border-gray-100 dark:border-gray-800">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {testimonials.map((testimonial, i) => (
              <div key={i} className="min-w-full p-8 lg:p-12">
                <div className="max-w-4xl mx-auto">
                  <div className="flex flex-col lg:flex-row items-center gap-8">
                    {/* Avatar Section */}
                    <div className="flex-shrink-0">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                      >
                        <img
                          src={testimonial.avatar}
                          alt={`${testimonial.name} avatar`}
                          className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl object-cover shadow-lg"
                          loading="lazy"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-full shadow-lg">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                      </motion.div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 text-center lg:text-left">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <StarRow rating={testimonial.rating} />
                        
                        <blockquote className="mt-6">
                          <p className="text-xl lg:text-2xl font-medium text-gray-800 dark:text-gray-100 leading-relaxed">
                            “{highlightWords(testimonial.quote, highlightList)}”
                          </p>
                        </blockquote>

                        <div className="mt-6">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {testimonial.name}
                          </h4>
                          <div className="flex items-center justify-center lg:justify-start gap-2 mt-1 text-gray-600 dark:text-gray-300">
                            <MapPin className="w-4 h-4" />
                            <span>{testimonial.location}</span>
                            <span className="mx-2">•</span>
                            <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                              <CheckCircle2 className="w-4 h-4" />
                              Verified Guest
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110"
          >
            <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110"
          >
            <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  i === index
                    ? "bg-emerald-600 w-8"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                } h-2`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Small Testimonials Grid */}
      {/* <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative"
      >
        <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          More Happy Guests
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {smallTestimonials.map((testimonial, index) => (
            <SmallTestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </motion.div> */}

      {/* Bottom CTA */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center mt-12"
      >
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Join thousands of satisfied guests who have experienced the difference
        </p>
      </motion.div> */}
    </MotionSection>
  );
};

export default Testimonials;