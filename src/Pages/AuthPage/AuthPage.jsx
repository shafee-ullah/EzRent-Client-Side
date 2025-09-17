// AuthPage.jsx - Sign In & Register Toggle
import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, UserPlus, LogIn } from "lucide-react";
import { motion } from "framer-motion";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Login data:", {
        email: formData.email,
        password: formData.password,
      });
    } else {
      console.log("Register data:", formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Abstract circles */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-green-500/20 rounded-full blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-md w-full bg-white/30 dark:bg-gray-800/30 backdrop-blur-2xl p-10 rounded-3xl shadow-2xl border border-white/40 dark:border-gray-700/40"
      >
        {/* Logo */}
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-tr from-green-500 to-green-400 text-white shadow-xl">
            {isLogin ? <LogIn className="h-8 w-8" /> : <UserPlus className="h-8 w-8" />}
          </div>
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {isLogin
              ? "Sign in to continue with "
              : "Register to get started with "}
            <span className="font-semibold text-green-600">RzRent</span>
          </p>
        </div>

        {/* Toggle buttons */}
        <div className="flex justify-center mt-6 mb-8">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-6 py-2 rounded-l-xl font-medium transition-all ${
              isLogin
                ? "bg-green-500 text-white shadow-md"
                : "bg-white/40 dark:bg-gray-700/40 text-gray-600 dark:text-gray-300"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-6 py-2 rounded-r-xl font-medium transition-all ${
              !isLogin
                ? "bg-green-500 text-white shadow-md"
                : "bg-white/40 dark:bg-gray-700/40 text-gray-600 dark:text-gray-300"
            }`}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name (Register only) */}
          {!isLogin && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-3 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/60 dark:bg-gray-700/60 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/60 dark:bg-gray-700/60 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/60 dark:bg-gray-700/60 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password (Register only) */}
          {!isLogin && (
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full px-3 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/60 dark:bg-gray-700/60 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>
          )}

          {/* Remember me + Forgot (Login only) */}
          {isLogin && (
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-green-600 hover:text-green-500 font-medium">
                Forgot password?
              </a>
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl text-white font-semibold text-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
          >
            {isLogin ? "Sign In" : "Register"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AuthPage;
