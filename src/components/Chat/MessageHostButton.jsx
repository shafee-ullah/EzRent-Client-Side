import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { MessageCircle, User, Home } from "lucide-react";
import {
  createConversation,
  setCurrentConversation,
  openChat,
  clearError,
} from "../../redux/chatSlice";

const MessageHostButton = ({
  id,
  hostName,
  propertyId,
  propertyTitle,
  className = "",
  variant = "button", // "button" or "icon"
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.products);
  const { conversationsLoading } = useSelector((state) => state.chat);

  const [isLoading, setIsLoading] = useState(false);

  const handleMessageHost = async () => {
    if (!user?._id || !id) {
      console.error("User ID or Host ID is missing");
      return;
    }

    // Don't allow messaging yourself
    if (user._id === id) {
      console.error("Cannot message yourself");
      return;
    }

    setIsLoading(true);
    dispatch(clearError());

    try {
      const result = await dispatch(
        createConversation({
          guestId: user._id,
          hostId: id, // Renamed from 'id' to 'hostId' for clarity
          propertyId: propertyId,
          propertyTitle: propertyTitle,
        })
      ).unwrap();

      // Set as current conversation and open chat
      dispatch(setCurrentConversation(result));
      dispatch(openChat());
    } catch (error) {
      console.error("Error creating conversation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === "icon") {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleMessageHost}
        disabled={isLoading || conversationsLoading}
        className={`p-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-2xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ${className}`}
        title={`Message ${hostName || "Host"}`}
      >
        {isLoading || conversationsLoading ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
        ) : (
          <MessageCircle className="w-4 h-4" />
        )}
      </motion.button>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleMessageHost}
      disabled={isLoading || conversationsLoading}
      className={`flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-2xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ${className}`}
    >
      {isLoading || conversationsLoading ? (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
      ) : (
        <MessageCircle className="w-4 h-4" />
      )}
      <span className="font-semibold">Message {hostName || "Host"}</span>
    </motion.button>
  );
};

// Contact Host Button for booking cards
export const ContactHostButton = ({
  id,
  hostName,
  propertyId,
  propertyTitle,
  className = "",
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.products);
  const { conversationsLoading } = useSelector((state) => state.chat);

  const [isLoading, setIsLoading] = useState(false);

  const handleContactHost = async () => {
    if (!user?._id || !id) {
      console.error("User ID or Host ID is missing");
      return;
    }

    // Don't allow messaging yourself
    if (user._id === id) {
      console.error("Cannot message yourself");
      return;
    }

    setIsLoading(true);
    dispatch(clearError());

    try {
      const result = await dispatch(
        createConversation({
          guestId: user._id,
          hostId: id, // Renamed from 'id' to 'hostId' for clarity
          propertyId: propertyId,
          propertyTitle: propertyTitle,
        })
      ).unwrap();

      // Set as current conversation and open chat
      dispatch(setCurrentConversation(result));
      dispatch(openChat());
    } catch (error) {
      console.error("Error creating conversation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleContactHost}
      disabled={isLoading || conversationsLoading}
      className={`flex items-center space-x-2 px-4 py-3 backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 border border-emerald-500 text-emerald-600 dark:text-emerald-400 rounded-2xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ${className}`}
    >
      {isLoading || conversationsLoading ? (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-emerald-500"></div>
      ) : (
        <MessageCircle className="w-4 h-4" />
      )}
      <span className="font-semibold">Contact Host</span>
    </motion.button>
  );
};

// Quick Message Button for property listings
export const QuickMessageButton = ({
  id,
  hostName,
  propertyId,
  propertyTitle,
  className = "",
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.products);
  const { conversationsLoading } = useSelector((state) => state.chat);

  const [isLoading, setIsLoading] = useState(false);

  const handleQuickMessage = async () => {
    if (!user?._id || !id) {
      console.error("User ID or Host ID is missing");
      return;
    }

    // Don't allow messaging yourself
    if (user._id === id) {
      console.error("Cannot message yourself");
      return;
    }

    setIsLoading(true);
    dispatch(clearError());

    try {
      const result = await dispatch(
        createConversation({
          guestId: user._id,
          hostId: id, // Renamed from 'id' to 'hostId' for clarity
          propertyId: propertyId,
          propertyTitle: propertyTitle,
        })
      ).unwrap();

      // Set as current conversation and open chat
      dispatch(setCurrentConversation(result));
      dispatch(openChat());
    } catch (error) {
      console.error("Error creating conversation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleQuickMessage}
      disabled={isLoading || conversationsLoading}
      className={`flex items-center space-x-1 px-3 py-2 backdrop-blur-sm bg-gradient-to-r from-emerald-500/10 to-green-500/10 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 rounded-2xl hover:bg-emerald-500/20 dark:hover:bg-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-sm font-semibold ${className}`}
    >
      {isLoading || conversationsLoading ? (
        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-emerald-500"></div>
      ) : (
        <MessageCircle className="w-3 h-3" />
      )}
      <span>Message</span>
    </motion.button>
  );
};

export default MessageHostButton;