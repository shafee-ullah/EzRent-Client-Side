import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  User,
  MoreVertical,
  ArrowLeft,
  ArrowDown,
} from "lucide-react";
import {
  fetchMessages,
  sendMessage,
  addMessage,
  markMessagesAsRead,
  fetchConversations,
} from "../../redux/chatSlice";
import socketService from "../../services/socketService";

const ChatWindow = ({ conversation, onBack }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.products);
  const { messages, messagesLoading, typingUsers, onlineUsers } = useSelector(
    (state) => state.chat
  );

  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const hasScrolledOnLoadRef = useRef(false); // Track if we've scrolled on initial load

  // Get messages for current conversation
  const conversationMessages = messages[conversation?._id] || [];

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Track message source to control scrolling behavior
  const prevMessageCountRef = useRef(0);
  const prevConversationIdRef = useRef(null);
  const isInitialLoadRef = useRef(true);
  const userSentMessageRef = useRef(false);

  useEffect(() => {
    // Check if this is a conversation change
    const isConversationChange =
      prevConversationIdRef.current !== conversation?._id;

    if (isConversationChange) {
      // Reset flags when conversation changes
      isInitialLoadRef.current = true;
      prevMessageCountRef.current = 0; // Reset to 0 to detect first load
      prevConversationIdRef.current = conversation?._id;
      return;
    }

    // Scroll to bottom on initial load after messages are fetched
    if (isInitialLoadRef.current && conversationMessages.length > 0) {
      // Use requestAnimationFrame to ensure DOM is updated before scrolling
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
          console.log("📜 Scrolled to bottom on initial load");
        });
      });
      isInitialLoadRef.current = false;
      prevMessageCountRef.current = conversationMessages.length;
      return;
    }

    // Only scroll when new messages arrive from others (not when user sends)
    if (
      !isInitialLoadRef.current &&
      !userSentMessageRef.current &&
      conversationMessages.length > prevMessageCountRef.current
    ) {
      scrollToBottom();
    }

    // Reset the user sent message flag
    userSentMessageRef.current = false;

    // Update the previous count
    prevMessageCountRef.current = conversationMessages.length;
  }, [conversationMessages, conversation?._id]);

  // Fetch messages when conversation changes
  useEffect(() => {
    if (conversation?._id) {
      // Reset scroll flag when conversation changes
      hasScrolledOnLoadRef.current = false;
      
      dispatch(fetchMessages({ conversationId: conversation._id }));

      // Join conversation room
      socketService.joinConversation(conversation._id);

      // Mark messages as read
      if (user?._id) {
        dispatch(
          markMessagesAsRead({
            conversationId: conversation._id,
            userId: user._id,
          })
        );
        socketService.markMessagesAsRead(conversation._id, user._id);
      }
    }
  }, [conversation?._id, dispatch, user?._id]);

  // Scroll to bottom after messages finish loading
  useEffect(() => {
    if (
      !messagesLoading && 
      conversationMessages.length > 0 && 
      !hasScrolledOnLoadRef.current
    ) {
      // Messages finished loading, scroll to bottom
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
          console.log("📜 Auto-scrolled to latest messages after loading");
          hasScrolledOnLoadRef.current = true;
        });
      });
    }
  }, [messagesLoading, conversationMessages.length]);

  // Listen for new messages via socket in real-time
  useEffect(() => {
    if (!conversation?._id || !socketService.getSocket()) return;

    const handleNewMessage = (message) => {
      console.log("📩 Real-time message received:", message);
      
      // Only update if the message is for the current conversation
      if (message.conversationId === conversation._id) {
        // Message will be added to Redux store automatically by socketService
        // This useEffect ensures the component re-renders when new messages arrive
        console.log("✅ Message is for current conversation, UI will update");
        
        // Auto-scroll to bottom when receiving new messages from others
        if (message.senderId !== user?._id) {
          setTimeout(() => scrollToBottom(), 100);
        }
      }
    };

    // Subscribe to new messages
    const socket = socketService.getSocket();
    socket.on("new-message", handleNewMessage);

    // Cleanup listener when conversation changes or component unmounts
    return () => {
      socket.off("new-message", handleNewMessage);
    };
  }, [conversation?._id, user?._id]);

  // Handle typing indicators
  useEffect(() => {
    if (isTyping) {
      socketService.startTyping(conversation._id);
    } else {
      socketService.stopTyping(conversation._id);
    }
  }, [isTyping, conversation._id]);

  // Handle message input
  const handleMessageChange = (e) => {
    const value = e.target.value;
    setNewMessage(value);

    // Typing indicator
    if (value.trim() && !isTyping) {
      setIsTyping(true);
    }

    // Clear existing timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set new timeout to stop typing indicator
    const timeout = setTimeout(() => {
      setIsTyping(false);
    }, 1000);

    setTypingTimeout(timeout);
  };

  // Handle send message
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!newMessage.trim() || !conversation?._id || !user?._id) return;

    const messageText = newMessage.trim();
    const tempId = `temp-${Date.now()}-${Math.random()}`; // Unique temporary ID

    const optimisticMessageData = {
      conversationId: conversation._id,
      senderId: user._id,
      message: messageText,
      messageType: "text",
      timestamp: new Date().toISOString(),
      _id: tempId, // Temporary ID for optimistic UI update
    };

    // Clear typing indicator
    setIsTyping(false);
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set flag to indicate user sent a message (for scrolling)
    userSentMessageRef.current = true;

    // Add message to local state immediately for instant UI update (optimistic)
    dispatch(
      addMessage({
        conversationId: conversation._id,
        message: optimisticMessageData,
      })
    );

    // Clear input immediately for better UX
    setNewMessage("");

    try {
      // Send message to backend API to persist in MongoDB
      // The backend will:
      // 1. Save to database
      // 2. Broadcast via socket to all users in the conversation
      // 3. Return the saved message with real _id
      const savedMessage = await dispatch(
        sendMessage({
          conversationId: conversation._id,
          senderId: user._id,
          message: messageText,
          messageType: "text",
        })
      ).unwrap();

      console.log("✅ Message saved to database:", savedMessage);

      // Update the optimistic message with the real data from backend
      // Replace the temporary message with the real one
      const messages = [...(conversationMessages || [])];
      const tempIndex = messages.findIndex(msg => msg._id === tempId);
      if (tempIndex !== -1) {
        // Remove the temporary message since sendMessage.fulfilled will add the real one
        messages.splice(tempIndex, 1);
        // Note: We don't need to manually update here because
        // sendMessage.fulfilled reducer will handle adding the real message
      }

      // Update conversation in the list with the new message
      dispatch(fetchConversations(user._id));
    } catch (error) {
      console.error("❌ Failed to send message:", error);
      console.error("Error details:", {
        conversationId: conversation._id,
        senderId: user._id,
        message: messageText,
      });
      // TODO: Show error toast to user and remove the optimistic message
      // For now, the optimistic message will remain showing the send attempt
    }
  };

  // Handle key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  // Format timestamp
  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Check if user is online
  const isUserOnline = (userId) => {
    return onlineUsers.includes(userId);
  };

  // Get typing users for current conversation
  const currentTypingUsers = typingUsers[conversation?._id] || [];
  const otherUserTyping = currentTypingUsers.filter(
    (userId) => userId !== user?._id
  );

  if (!conversation) {
    return (
      <div className="flex items-center justify-center h-full backdrop-blur-sm bg-gradient-to-br from-emerald-50/50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-emerald-900/10">
        <div className="text-center px-4">
          <User className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            Select a conversation to start chatting
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full backdrop-blur-sm bg-gradient-to-br from-emerald-50/50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-emerald-900/10">
      {/* Header */}
      <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
          {onBack && (
            <motion.button
              onClick={onBack}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-2xl transition-all duration-300 flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
            </motion.button>
          )}

          <div className="relative flex-shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            {isUserOnline(conversation.otherUser?._id) && (
              <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base truncate">
              {conversation.otherUser?.name || "Unknown User"}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              {isUserOnline(conversation.otherUser?._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-2xl transition-all duration-300"
          >
            {/* <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" /> */}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-2xl transition-all duration-300"
          >
            {/* <Video className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" /> */}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-2xl transition-all duration-300"
          >
            <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
          </motion.button>
          {/* {onClose && (
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-2xl transition-all duration-300"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
            </motion.button>
          )} */}
        </div>
      </div>

      {/* Property Info */}
      {conversation.propertyTitle && (
        <div className="p-2 sm:p-3 bg-gradient-to-r from-emerald-500/10 to-green-500/10 dark:from-emerald-900/20 dark:to-green-900/20 border-b border-gray-200 dark:border-gray-700">
          <p className="text-xs sm:text-sm bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400 font-medium">
            <span className="font-bold">Property:</span>{" "}
            <span className="truncate block sm:inline">
              {conversation.propertyTitle}
            </span>
          </p>
        </div>
      )}

      {/* Messages Container */}
      <div
        ref={messagesContainerRef}
        className="flex-1 p-2 sm:p-4 overflow-y-auto space-y-3 sm:space-y-4 relative"
      >
        {/* Scroll to bottom button */}
        <motion.button
          onClick={scrollToBottom}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 p-1.5 sm:p-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          aria-label="Scroll to bottom"
        >
          <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.button>
        {messagesLoading ? (
          <div className="flex items-center justify-center h-24 sm:h-32">
            <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-emerald-500"></div>
          </div>
        ) : conversationMessages.length === 0 ? (
          <div className="flex items-center justify-center h-24 sm:h-32">
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base text-center px-4">
              No messages yet. Start the conversation!
            </p>
          </div>
        ) : (
          <AnimatePresence>
            {conversationMessages.map((message) => (
              <motion.div
                key={message._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className={`flex ${
                  message.senderId === user?._id
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-xs lg:max-w-md px-3 py-2 sm:px-4 sm:py-3 rounded-2xl shadow-lg ${
                    message.senderId === user?._id
                      ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white"
                      : "bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600"
                  }`}
                >
                  <p className="text-xs sm:text-sm break-words">
                    {message.message}
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      message.senderId === user?._id
                        ? "text-emerald-100"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {formatMessageTime(message.timestamp)}
                    {message.senderId === user?._id && message.read && (
                      <span className="ml-1">✓✓</span>
                    )}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}

        {/* Typing indicator */}
        <AnimatePresence>
          {otherUserTyping.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex justify-start"
            >
              <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-3 py-2 sm:px-4 sm:py-3 rounded-2xl shadow-lg">
                <div className="flex items-center space-x-1">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-300 ml-1 sm:ml-2">
                    {conversation.otherUser?.name} is typing...
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-2 sm:p-4 border-t border-gray-200 dark:border-gray-700">
        <form
          onSubmit={handleSendMessage}
          className="flex items-center space-x-1 sm:space-x-2"
        >
          {/* <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-2xl transition-all duration-300"
          >
            <Paperclip className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </motion.button> */}

          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={handleMessageChange}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white transition-all duration-300 text-sm sm:text-base"
            />
            {/* <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl transition-all duration-300"
            >
              <Smile className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </motion.button> */}
          </div>

          <motion.button
            type="submit"
            disabled={!newMessage.trim()}
            whileHover={{ scale: !newMessage.trim() ? 1 : 1.05 }}
            whileTap={{ scale: !newMessage.trim() ? 1 : 0.95 }}
            className="p-1.5 sm:p-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-2xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex-shrink-0"
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
