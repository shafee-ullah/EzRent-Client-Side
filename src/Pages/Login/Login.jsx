// Login.jsx - Transparent Form with Background Image
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react";
import { motion } from "framer-motion";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", formData);
  };

  const handleGoogleSignIn = () => {
    console.log("Google sign-in initiated");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=1950&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Optional abstract blurred circles */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-green-300/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-400/20 rounded-full blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-md w-full bg-white/30 dark:bg-gray-900/30 backdrop-blur-xl p-10 rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/40"
      >
        {/* Logo */}
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-tr from-green-500 to-green-400 text-white shadow-lg">
            <LogIn className="h-7 w-7" />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-100 dark:text-gray-300">
            Sign in to continue with{" "}
            <span className="font-semibold text-green-200">RzRent</span>
          </p>
        </div>

        {/* Divider */}
        <div className="relative flex items-center my-6">
          <div className="flex-grow border-t border-gray-200 dark:border-gray-600"></div>
          <span className="mx-4 text-gray-200 dark:text-gray-400 text-sm">or</span>
          <div className="flex-grow border-t border-gray-200 dark:border-gray-600"></div>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
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
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/30 dark:bg-gray-700/30 placeholder-gray-200 text-white dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
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
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/30 dark:bg-gray-700/30 placeholder-gray-200 text-white dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
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

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm text-gray-200 dark:text-gray-300">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-200 text-green-500 focus:ring-green-500"
              />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-green-200 hover:text-green-100 font-medium">
              Forgot password?
            </a>
          </div>

          {/* Sign in button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl text-white font-medium bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
          >
            Sign in
          </button>

          {/* Google Sign-in button */}
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

          {/* Register link */}
          <p className="text-center text-sm text-gray-200 dark:text-gray-300 pt-2">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-green-200 hover:text-green-100 font-medium"
            >
              Register now
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
