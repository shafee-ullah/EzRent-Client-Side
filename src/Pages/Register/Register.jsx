// Register.jsx - Transparent Form with Background Image
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration data:", formData);
  };

  const handleGoogleSignIn = () => {
    console.log("Google sign-in initiated");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=1950&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background Circles */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-green-300/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-400/20 rounded-full blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-md w-full bg-white/30 dark:bg-gray-900/30 backdrop-blur-xl p-10 rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/40"
      >
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-tr from-green-500 to-green-400 text-white shadow-lg">
            <UserPlus className="h-7 w-7" />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-100 dark:text-white">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-gray-200 dark:text-gray-300">
            Join <span className="font-semibold text-green-200">RzRent</span>{" "}
            today
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-100 dark:text-gray-300 mb-1.5"
            >
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-200" />
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/30 dark:bg-gray-700/30 text-white dark:text-white placeholder-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-100 dark:text-gray-300 mb-1.5"
            >
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-200" />
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/30 dark:bg-gray-700/30 text-white dark:text-white placeholder-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-100 dark:text-gray-300 mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-200" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/30 dark:bg-gray-700/30 text-white dark:text-white placeholder-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-200 hover:text-white dark:hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-100 dark:text-gray-300 mb-1.5"
            >
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-200" />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/30 dark:bg-gray-700/30 text-white dark:text-white placeholder-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start text-sm text-gray-200 dark:text-gray-300">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 rounded border-gray-200 text-green-500 focus:ring-green-500"
            />
            <label htmlFor="terms" className="ml-2">
              I agree to the{" "}
              <a
                href="#"
                className="text-green-200 hover:text-green-100 font-medium"
              >
                Terms
              </a>{" "}
              &{" "}
              <a
                href="#"
                className="text-green-200 hover:text-green-100 font-medium"
              >
                Privacy Policy
              </a>
            </label>
          </div>

          {/* Create Account Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl text-white font-medium bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
          >
            Create Account
          </button>

          {/* Google Sign-in */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-100 dark:text-gray-300 bg-white/30 hover:bg-white/40 dark:bg-gray-700/30 dark:hover:bg-gray-600/40 transition-all shadow-md"
          >
            <img
              className="w-5 h-5"
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
            />
            Continue with Google
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-200 dark:text-gray-300 pt-2">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-200 hover:text-green-100 font-medium"
            >
              Sign in
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;