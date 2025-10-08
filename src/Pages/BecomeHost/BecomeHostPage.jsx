import React from "react";
import { motion } from "framer-motion";
import { 
  Home, 
  DollarSign, 
  Globe, 
  Shield, 
  Headphones, 
  Calendar,
  Users,
  CreditCard,
  CheckCircle,
  ArrowRight,
  Star,
  TrendingUp
} from "lucide-react";

const MotionDiv = motion.div;
const MotionButton = motion.button;

const BecomeHostPage = () => {
  // Benefits data
  const benefits = [
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Earn Easily",
      description: "Get paid securely after every stay with automatic payouts and clear earnings.",
      gradient: "from-amber-500 to-orange-500"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Reach More Guests",
      description: "Your property will be visible to thousands of travelers worldwide.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Host Safely",
      description: "We verify guests and handle payments securely with comprehensive protection.",
      gradient: "from-emerald-500 to-green-500"
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Get help whenever you need it from our dedicated host support team.",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  // Steps data
  const steps = [
    {
      number: "01",
      icon: <Home className="w-6 h-6" />,
      title: "Create Your Listing",
      description: "Add photos, set your price, and describe your space with our easy setup process.",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=500&auto=format&fit=crop"
    },
    {
      number: "02",
      icon: <Calendar className="w-6 h-6" />,
      title: "Set Availability",
      description: "Choose when your space is available and set your booking preferences.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=500&auto=format&fit=crop"
    },
    {
      number: "03",
      icon: <Users className="w-6 h-6" />,
      title: "Host Guests",
      description: "Welcome travelers, share local tips, and provide memorable experiences.",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=500&auto=format&fit=crop"
    },
    {
      number: "04",
      icon: <CreditCard className="w-6 h-6" />,
      title: "Get Paid Securely",
      description: "Receive fast, protected payouts directly to your bank account.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=500&auto=format&fit=crop"
    }
  ];

  // Trust features
  const trustFeatures = [
    "Guest identity verification",
    "Secure payment processing",
    "$1M host protection insurance",
    "24/7 customer support",
    "Host guarantee program",
    "Cleaning fee protection"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-emerald-900/10">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-200/30 dark:bg-emerald-900/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-green-200/30 dark:bg-green-900/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-amber-200/20 dark:bg-amber-900/10 rounded-full blur-2xl" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4">
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
                  Join 5,000+ Successful Hosts
                </span>
              </MotionDiv>

              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400">
                  Share Your Space.
                </span>
                <br />
                <span className="text-gray-900 dark:text-white">
                  Earn Extra Income.
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Join EZRent and reach thousands of travelers looking for unique places to stay.
                Start earning from your extra space today.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <MotionButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-2xl font-semibold text-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3"
                >
                  Start Hosting
                  <ArrowRight className="w-5 h-5" />
                </MotionButton>
                
                <MotionButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-2xl font-semibold text-lg hover:shadow-lg transition-all duration-300"
                >
                  Learn More
                </MotionButton>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mt-12 justify-center lg:justify-start">
                {[
                  { value: "5,000+", label: "Active Hosts" },
                  { value: "৳2.5Cr+", label: "Earned" },
                  { value: "4.9★", label: "Average Rating" }
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

            {/* Hero Image */}
            <MotionDiv
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop"
                  alt="Happy host welcoming guests"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                
                {/* Floating Card */}
                <MotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl flex items-center justify-center">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        Rahman from Dhaka
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Earned ৳4.2L in 6 months
                      </div>
                    </div>
                  </div>
                </MotionDiv>
              </div>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* Why Become a Host Section */}
      <section className="py-20 px-4">
        <div className="max-w-11/12 mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Become a Host?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Join our community of hosts who are earning extra income while sharing their unique spaces with travelers.
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <MotionDiv
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${benefit.gradient} flex items-center justify-center text-white mb-4`}>
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {benefit.description}
                </p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-11/12  mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Start hosting in just a few simple steps. We'll guide you through the entire process.
            </p>
          </MotionDiv>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <MotionDiv
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                className={`flex flex-col lg:flex-row gap-8 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg">
                      {step.number}
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {step.description}
                  </p>
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                    {step.icon}
                    <span>Learn more</span>
                  </div>
                </div>

                {/* Image */}
                <div className="flex-1">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-64 lg:h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                  </div>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Policy Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-emerald-500 to-green-500 rounded-3xl p-8 lg:p-12 text-white overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]" />
            </div>

            <div className="relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Content */}
                <div>
                  <MotionDiv
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Shield className="w-6 h-6" />
                      <span className="font-semibold text-emerald-100">Host Protection</span>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                      Your Safety is Our Priority
                    </h2>
                    <p className="text-lg text-emerald-100 mb-8 leading-relaxed">
                      We verify users, protect payments, and ensure secure hosting with comprehensive safety measures and insurance coverage.
                    </p>

                    {/* Trust Features */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {trustFeatures.map((feature, index) => (
                        <MotionDiv
                          key={feature}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle className="w-5 h-5 text-white" />
                          <span className="text-emerald-100">{feature}</span>
                        </MotionDiv>
                      ))}
                    </div>
                  </MotionDiv>
                </div>

                {/* Trust Badges */}
                <MotionDiv
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                >
                  <h3 className="text-xl font-semibold mb-6 text-center">Trust & Security</h3>
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { icon: <Shield className="w-8 h-8" />, label: "Verified Users" },
                      { icon: <CreditCard className="w-8 h-8" />, label: "Secure Payments" },
                      { icon: <Headphones className="w-8 h-8" />, label: "24/7 Support" },
                      { icon: <CheckCircle className="w-8 h-8" />, label: "Host Guarantee" }
                    ].map((badge, index) => (
                      <div key={badge.label} className="text-center">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                          {badge.icon}
                        </div>
                        <span className="text-sm text-emerald-100">{badge.label}</span>
                      </div>
                    ))}
                  </div>
                </MotionDiv>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Start Hosting?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of hosts who are earning extra income and sharing their spaces with travelers from around the world.
            </p>

            <MotionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-2xl font-semibold text-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-3 mb-6"
            >
              Become a Host Now
              <ArrowRight className="w-5 h-5" />
            </MotionButton>

            <p className="text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <button className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">
                Sign in as Host
              </button>
            </p>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
};

export default BecomeHostPage;