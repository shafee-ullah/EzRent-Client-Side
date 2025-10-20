import React, { useState, useContext } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  UserPlus,
  LogIn,
  AlertCircle,
  CheckCircle,
  User,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

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
}) => (
  <div>
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-4 h-5 w-5 text-gray-400" />}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full ${Icon ? "pl-11" : "pl-3"} ${
          showPasswordToggle ? "pr-10" : "pr-3"
        } py-3 rounded-xl border bg-white/60 dark:bg-gray-700/60 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-700 focus:border-transparent transition-all ${
          error
            ? "border-red-500"
            : success
            ? "border-green-500"
            : "border-gray-300 dark:border-gray-600"
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
          {type === "password" ? (
            <Eye className="h-5 w-5" />
          ) : (
            <EyeOff className="h-5 w-5" />
          )}
        </button>
      )}
    </div>
    {error && (
      <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <AlertCircle className="h-4 w-4 mr-1" /> {error}
      </p>
    )}
    {success && (
      <p className="mt-1 text-sm text-green-600 dark:text-green-400 flex items-center">
        <CheckCircle className="h-4 w-4 mr-1" /> {success}
      </p>
    )}
  </div>
);

const AuthPage = () => {
  const locations = useLocation();
  const navigate = useNavigate();
  // now includes resetPassword
  const {
    createUser,
    logInUser,
    googleSignIn,
    githubSignIn,
    resetPassword,
    setUser,
  } = useContext(AuthContext);

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

  // Validation
  const validateForm = () => {
    const newErrors = {};
    const newSuccess = {};

    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    else newSuccess.email = "Email looks good!";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password))
      newErrors.password =
        "Password must contain uppercase, lowercase and number";
    else newSuccess.password = "Strong password!";

    if (!isLogin) {
      if (!formData.name) newErrors.name = "Name is required";
      else if (formData.name.length < 2)
        newErrors.name = "Name must be at least 2 characters";
      else newSuccess.name = "Name looks good!";

      if (!formData.confirmPassword)
        newErrors.confirmPassword = "Please confirm your password";
      else if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
      else newSuccess.confirmPassword = "Passwords match!";

      if (!agreeToTerms)
        newErrors.terms =
          "You must agree to the Terms of Service and Privacy Policy";
    }

    setErrors(newErrors);
    setSuccess(newSuccess);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
    if (success[name]) setSuccess({ ...success, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      // Convert email to lowercase
      const email = formData.email.toLowerCase();

      if (isLogin) {
        const userCredential = await logInUser(email, formData.password);

        if (!userCredential.user.emailVerified) {
          toast.success(`Welcome back ${userCredential.user.email}`);
          navigate(locations?.state || "/", {
            state: { toastMessage: "Login successful!" },
          });
        } else {
          navigate(locations?.state || "/", {
            state: { toastMessage: "Login successful!" },
          });
          toast.success(`Welcome back ${userCredential.user.email}`);
        }
      } else {
        // Firebase registration
        const userCredential = await createUser(
          email,
          formData.password,
          formData.name
        );

        // Update global state / Redux
        if (setUser) setUser(userCredential.user);

        // Save to backend with lowercase email
        const userData = {
          name: formData.name,
          email, // already lowercase
          role: "guest",
        };
        await axios.post(
          "https://ez-rent-server-side-seven.vercel.app/users",
          userData
        );
        navigate(locations?.state || "/", {
          state: { toastMessage: "Login successful!" },
        });
        toast.success(
          `Registration successful. Verification email sent to ${userCredential.user.email}`
        );

        setIsLogin(true);
      }
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  // handle password reset
  const handlePasswordReset = async () => {
    if (!formData.email) {
      toast.error("Please enter your email address first.");
      return;
    }
    try {
      await resetPassword(formData.email);
      toast.success(`Password reset email sent to ${formData.email}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    try {
      let result;
      if (provider === "google") result = await googleSignIn();
      else if (provider === "github") result = await githubSignIn();

      const user = result.user;

      // Prepare user data
      const userData = {
        name: user.displayName || "Anonymous",
        email: user.email,
        role: "guest",
      };

      // POST to backend
      await axios.post(
        "https://ez-rent-server-side-seven.vercel.app/users",
        userData
      );
      navigate(locations?.state || "/", {
        state: { toastMessage: "Login successful!" },
      });
      toast.success(`Welcome ${user.displayName || user.email}`);
    } catch (error) {
      if (error.code === "auth/account-exists-with-different-credential") {
        toast.error(
          "This email is already registered with a different provider. Please use the original provider to login."
        );
      } else {
        navigate(locations?.state || "/", {
          state: { toastMessage: "Login successful!" },
        });
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-10 flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden p-4">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-700/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-green-700/20 rounded-full blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-md bg-white/30 dark:bg-gray-800/30 backdrop-blur-2xl p-8 sm:p-10 rounded-3xl shadow-2xl border border-white/40 dark:border-gray-700/40"
      >
        {/* ✅ Back Home Button */}
        <Link
          to="/"
          className="absolute top-6 left-6 inline-flex items-center px-4 py-2 text-green-700 text-sm font-medium transition-all duration-300 ease-in-out hover:text-green-900 hover:translate-x-1 hover:scale-105"
        >
          ← Back Home
        </Link>

        <div className="text-center">
          {/* <motion.div
            className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-700 text-white shadow-xl"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {isLogin ? (
              <LogIn className="h-8 w-8" />
            ) : (
              <UserPlus className="h-8 w-8" />
            )}
          </motion.div> */}
          <h2 className="mt-8 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {isLogin
              ? "Sign in to continue with "
              : "Register to get started with "}
            <span className="font-semibold text-green-700 dark:text-green-500">
              EzRent
            </span>
          </p>
        </div>

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

        <AnimatePresence>
          {errors.general && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-4 p-3 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 flex items-center"
            >
              <AlertCircle className="h-5 w-5 mr-2" /> {errors.general}
            </motion.div>
          )}
        </AnimatePresence>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {!isLogin && (
            <InputField
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              icon={User}
              error={errors.name}
              success={success.name}
              autoComplete="name"
            />
          )}
          <InputField
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            icon={Mail}
            error={errors.email}
            success={success.email}
            autoComplete="email"
          />
          <InputField
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            icon={Lock}
            error={errors.password}
            success={success.password}
            showPasswordToggle
            onTogglePassword={() => setShowPassword(!showPassword)}
            autoComplete={isLogin ? "current-password" : "new-password"}
          />

          {/* Forgot Password link */}
          {isLogin && (
            <div className="text-right">
              <button
                type="button"
                onClick={handlePasswordReset}
                className="text-sm text-green-700 dark:text-green-500 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          )}

          {!isLogin && (
            <InputField
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              icon={Lock}
              error={errors.confirmPassword}
              success={success.confirmPassword}
              showPasswordToggle
              onTogglePassword={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              autoComplete="new-password"
            />
          )}
          {!isLogin && (
            <label className="flex items-start space-x-2 text-gray-600 dark:text-gray-300 text-sm">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-green-700 focus:ring-green-700 mt-0.5"
              />
              <span>
                I agree to the{" "}
                <a
                  href="#"
                  className="text-green-700 dark:text-green-500 font-medium hover:text-green-800 dark:hover:text-green-400"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-green-700 dark:text-green-500 font-medium hover:text-green-800 dark:hover:text-green-400"
                >
                  Privacy Policy
                </a>
              </span>
            </label>
          )}
          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl text-white font-semibold text-lg bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-green-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading
              ? isLogin
                ? "Signing In..."
                : "Registering..."
              : isLogin
              ? "Sign In"
              : "Register"}
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400"
            >
              {isLogin ? "Register here" : "Login here"}
            </button>
          </p>
        </div>

        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center">
            {/* <div className="w-full border-t border-gray-300 dark:border-gray-600"></div> */}
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-transparent text-gray-500 dark:text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row sm:justify-center sm:gap-4 gap-2">
          <button
            onClick={() => handleSocialLogin("google")}
            className="flex items-center justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all w-full sm:w-auto"
          >
            <FcGoogle className="h-5 w-5 mr-2" /> Google
          </button>
          <button
            onClick={() => handleSocialLogin("github")}
            className="flex items-center justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all w-full sm:w-auto"
          >
            <FaGithub className="h-5 w-5 mr-2" /> GitHub
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
