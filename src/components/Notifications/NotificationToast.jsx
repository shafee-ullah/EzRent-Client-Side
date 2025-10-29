import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  Calendar,
  MessageCircle,
  DollarSign,
  Star,
  X,
} from "lucide-react";

const NotificationToast = ({ notification, onClose, duration = 5000 }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  // Get icon based on notification type
  const getIcon = () => {
    switch (notification.type) {
      case "booking_confirmed":
      case "payment_received":
        return <CheckCircle className="w-5 h-5" />;
      case "booking_cancelled":
        return <XCircle className="w-5 h-5" />;
      case "booking_request":
      case "booking_reminder":
        return <Calendar className="w-5 h-5" />;
      case "new_message":
        return <MessageCircle className="w-5 h-5" />;
      case "payment_pending":
        return <DollarSign className="w-5 h-5" />;
      case "new_review":
        return <Star className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  // Get color scheme based on notification type
  const getColorScheme = () => {
    switch (notification.type) {
      case "booking_confirmed":
      case "payment_received":
        return {
          bg: "from-emerald-500 to-green-500",
          border: "border-emerald-400",
          text: "text-white",
        };
      case "booking_cancelled":
        return {
          bg: "from-red-500 to-orange-500",
          border: "border-red-400",
          text: "text-white",
        };
      case "booking_request":
        return {
          bg: "from-blue-500 to-cyan-500",
          border: "border-blue-400",
          text: "text-white",
        };
      case "new_review":
        return {
          bg: "from-amber-500 to-yellow-500",
          border: "border-amber-400",
          text: "text-white",
        };
      case "new_message":
        return {
          bg: "from-purple-500 to-pink-500",
          border: "border-purple-400",
          text: "text-white",
        };
      default:
        return {
          bg: "from-gray-500 to-gray-600",
          border: "border-gray-400",
          text: "text-white",
        };
    }
  };

  const colors = getColorScheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className={`relative bg-gradient-to-r ${colors.bg} backdrop-blur-sm border ${colors.border} rounded-2xl shadow-2xl p-4 max-w-sm w-full`}
    >
      <div className="flex items-start space-x-3">
        <div className={`${colors.text} flex-shrink-0 mt-0.5`}>
          {getIcon()}
        </div>

        <div className="flex-1 min-w-0">
          <p className={`font-semibold ${colors.text} text-sm`}>
            {notification.title}
          </p>
          <p className={`${colors.text} text-xs mt-1 opacity-90`}>
            {notification.message}
          </p>
          {notification.actionUrl && (
            <button className="mt-2 text-xs font-semibold underline hover:no-underline">
              View Details
            </button>
          )}
        </div>

        <button
          onClick={onClose}
          className={`${colors.text} opacity-70 hover:opacity-100 transition-opacity flex-shrink-0`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Progress bar */}
      {duration > 0 && (
        <motion.div
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: duration / 1000, ease: "linear" }}
          className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-b-2xl"
        />
      )}
    </motion.div>
  );
};

// Toast container component
export const NotificationToastContainer = ({ toasts, onRemoveToast }) => {
  return (
    <div className="fixed top-4 right-4 z-[9999] space-y-2 max-w-sm">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <NotificationToast
            key={toast.id}
            notification={toast}
            onClose={() => onRemoveToast(toast.id)}
            duration={toast.duration || 5000}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationToast;
