import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, UserPlus, LogIn, AlertCircle, CheckCircle, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Reusable Input Component
const InputField = ({
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  icon: Icon,
  error,
  success,
  showPasswordToggle = false,
  onTogglePassword,
  ...props
}) => {
  return (
    <div>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />}
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full ${Icon ? 'pl-10' : 'pl-3'} ${showPasswordToggle ? 'pr-10' : 'pr-3'} py-3 rounded-xl border bg-white/60 dark:bg-gray-700/60 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-700 focus:border-transparent transition-all ${
            error ? "border-red-500" : success ? "border-green-500" : "border-gray-300 dark:border-gray-600"
          }`}
          {...props}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label={type === "password" ? "Show password" : "Hide password"}
          >
            {type === "password" ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center"><AlertCircle className="h-4 w-4 mr-1" /> {error}</p>}
      {success && <p className="mt-1 text-sm text-green-600 dark:text-green-400 flex items-center"><CheckCircle className="h-4 w-4 mr-1" /> {success}</p>}
    </div>
  );
};

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    const newErrors = {};
    const newSuccess = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    } else {
      newSuccess.email = "Email looks good!";
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase and number";
    } else {
      newSuccess.password = "Strong password!";
    }
    
    // Registration specific validations
    if (!isLogin) {
      // Name validation
      if (!formData.name) {
        newErrors.name = "Name is required";
      } else if (formData.name.length < 2) {
        newErrors.name = "Name must be at least 2 characters";
      } else {
        newSuccess.name = "Name looks good!";
      }
      
      // Confirm password validation
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      } else if (formData.confirmPassword) {
        newSuccess.confirmPassword = "Passwords match!";
      }
      
      // Terms agreement validation
      if (!agreeToTerms) {
        newErrors.terms = "You must agree to the Terms of Service and Privacy Policy";
      }
    }
    
    setErrors(newErrors);
    setSuccess(newSuccess);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error/success when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
    if (success[name]) {
      setSuccess({ ...success, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      if (isLogin) {
        console.log("Login data:", {
          email: formData.email,
          password: formData.password,
        });
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        alert("Login successful!");
      } else {
        console.log("Register data:", formData);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        alert("Registration successful!");
        // Switch to login after successful registration
        setIsLogin(true);
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setErrors({ general: "An error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    // Implement social login logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden py-10">
      {/* Abstract circles */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-700/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-green-700/20 rounded-full blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-md bg-white/30 dark:bg-gray-800/30 backdrop-blur-2xl p-8 sm:p-10 rounded-3xl shadow-2xl border border-white/40 dark:border-gray-700/40"
      >
        {/* Logo */}
        <div className="text-center">
          <motion.div 
            className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-700 text-white shadow-xl"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {isLogin ? <LogIn className="h-8 w-8" /> : <UserPlus className="h-8 w-8" />}
          </motion.div>
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {isLogin
              ? "Sign in to continue with "
              : "Register to get started with "}
            <span className="font-semibold text-green-700 dark:text-green-500">RzRent</span>
          </p>
        </div>

        {/* Toggle buttons */}
        <div className="flex justify-center mt-6 mb-8">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-6 py-2 rounded-l-xl font-medium transition-all ${
              isLogin
                ? "bg-green-700 text-white shadow-md"
                : "bg-white/40 dark:bg-gray-700/40 text-gray-600 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-700/60"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-6 py-2 rounded-r-xl font-medium transition-all ${
              !isLogin
                ? "bg-green-700 text-white shadow-md"
                : "bg-white/40 dark:bg-gray-700/40 text-gray-600 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-700/60"
            }`}
          >
            Register
          </button>
        </div>

        {/* General error message */}
        <AnimatePresence>
          {errors.general && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-4 p-3 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 flex items-center"
            >
              <AlertCircle className="h-5 w-5 mr-2" />
              {errors.general}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
              >
                Full Name
              </label>
              <InputField
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                icon={User}
                error={errors.name}
                success={success.name}
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
            <InputField
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              icon={Mail}
              error={errors.email}
              success={success.email}
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Password
            </label>
            <InputField
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              icon={Lock}
              error={errors.password}
              success={success.password}
              showPasswordToggle={true}
              onTogglePassword={() => setShowPassword(!showPassword)}
            />
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
              <InputField
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                icon={Lock}
                error={errors.confirmPassword}
                success={success.confirmPassword}
                showPasswordToggle={true}
                onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            </div>
          )}

          {/* Terms Agreement (Register only) */}
          {!isLogin && (
            <div className="text-sm">
              <label className="flex items-start space-x-2 text-gray-600 dark:text-gray-300">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-green-700 focus:ring-green-700 mt-0.5"
                />
                <span>
                  I agree to the{" "}
                  <a href="#" className="text-green-700 hover:text-green-800 dark:text-green-500 dark:hover:text-green-400 font-medium">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-green-700 hover:text-green-800 dark:text-green-500 dark:hover:text-green-400 font-medium">
                    Privacy Policy
                  </a>
                </span>
              </label>
              {errors.terms && <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center"><AlertCircle className="h-4 w-4 mr-1" /> {errors.terms}</p>}
            </div>
          )}

          {/* Remember me + Forgot (Login only) */}
          {isLogin && (
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-green-700 focus:ring-green-700"
                />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-green-700 hover:text-green-800 dark:text-green-500 dark:hover:text-green-400 font-medium">
                Forgot password?
              </a>
            </div>
          )}

          {/* Submit button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            className="w-full py-3 rounded-xl text-white font-semibold text-lg bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-green-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isLogin ? "Signing In..." : "Registering..."}
              </>
            ) : (
              isLogin ? "Sign In" : "Register"
            )}
          </motion.button>
        </form>

        {/* Switch between Login/Register */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-green-700 hover:text-green-800 dark:text-green-500 dark:hover:text-green-400"
            >
              {isLogin ? "Register here" : "Login here"}
            </button>
          </p>
        </div>

        {/* Divider */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-transparent text-gray-500 dark:text-gray-400">Or continue with</span>
            </div>
          </div>

          {/* Social login buttons - Side by side */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              onClick={() => handleSocialLogin('google')}
              className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" width="24" height="24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>

            <button
              onClick={() => handleSocialLogin('facebook')}
              className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
            >
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;