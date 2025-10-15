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
  hostId,
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
    if (!user?._id || !hostId) {
      console.error("User ID or Host ID is missing");
      return;
    }

    // Don't allow messaging yourself
    if (user._id === hostId) {
      console.error("Cannot message yourself");
      return;
    }

    setIsLoading(true);
    dispatch(clearError());

    try {
      const result = await dispatch(
        createConversation({
          guestId: user._id,
          hostId: hostId,
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
        className={`p-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className}`}
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
      className={`flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className}`}
    >
      {isLoading || conversationsLoading ? (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
      ) : (
        <MessageCircle className="w-4 h-4" />
      )}
      <span className="font-medium">Message {hostName || "Host"}</span>
    </motion.button>
  );
};

// Contact Host Button for booking cards
export const ContactHostButton = ({
  hostId,
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
    if (!user?._id || !hostId) {
      console.error("User ID or Host ID is missing");
      return;
    }

    // Don't allow messaging yourself
    if (user._id === hostId) {
      console.error("Cannot message yourself");
      return;
    }

    setIsLoading(true);
    dispatch(clearError());

    try {
      const result = await dispatch(
        createConversation({
          guestId: user._id,
          hostId: hostId,
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
      className={`flex items-center space-x-2 px-3 py-2 bg-white border border-emerald-500 text-emerald-600 rounded-lg hover:bg-emerald-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className}`}
    >
      {isLoading || conversationsLoading ? (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-emerald-500"></div>
      ) : (
        <MessageCircle className="w-4 h-4" />
      )}
      <span className="text-sm font-medium">Contact Host</span>
    </motion.button>
  );
};

// Quick Message Button for property listings
export const QuickMessageButton = ({
  hostId,
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
    if (!user?._id || !hostId) {
   
      console.error("User ID or Host ID is missing");
      return;
    }
 
    // Don't allow messaging yourself
    if (user._id === hostId) {
      console.error("Cannot message yourself");
      return;
    }

    setIsLoading(true);
    dispatch(clearError());

    try {
      const result = await dispatch(
        createConversation({
          guestId: user._id,
          hostId: hostId,
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
      className={`flex items-center space-x-1 px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md hover:bg-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs font-medium ${className}`}
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
