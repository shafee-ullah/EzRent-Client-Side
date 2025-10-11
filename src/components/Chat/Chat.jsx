import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Users } from "lucide-react";
import {
  closeChat,
  openChat,
  fetchOnlineUsers,
  setConnectionStatus,
} from "../../redux/chatSlice";
import socketService from "../../services/socketService";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";

const Chat = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.products);
  const { isChatOpen, currentConversation, isConnected, onlineUsers } =
    useSelector((state) => state.chat);

  const [showChatList, setShowChatList] = useState(true);
  const [showChatWindow, setShowChatWindow] = useState(false);

  // Initialize socket connection when user is available
  useEffect(() => {
    if (user?._id && !socketService.isSocketConnected()) {
      socketService.connect(user._id);
    }
  }, [user?._id]);

  // Fetch online users periodically
  useEffect(() => {
    if (isConnected) {
      dispatch(fetchOnlineUsers());

      // Fetch online users every 30 seconds
      const interval = setInterval(() => {
        dispatch(fetchOnlineUsers());
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [isConnected, dispatch]);

  // Handle conversation selection
  const handleConversationSelect = (conversation) => {
    setShowChatList(false);
    setShowChatWindow(true);
  };

  // Handle back to chat list
  const handleBackToList = () => {
    setShowChatWindow(false);
    setShowChatList(true);
  };

  // Handle close chat
  const handleCloseChat = () => {
    dispatch(closeChat());
    setShowChatList(true);
    setShowChatWindow(false);
    if (onClose) {
      onClose();
    }
  };

  // Handle create new chat
  const handleCreateNewChat = () => {
    // This could open a modal to select a host or property
    console.log("Create new chat clicked");
  };

  if (!isOpen && !isChatOpen) {
    return null;
  }

  return (
    <AnimatePresence>
      {(isOpen || isChatOpen) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-6xl h-[80vh] max-h-[600px] flex overflow-hidden"
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-lg">
                    <MessageCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Messages
                    </h2>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          isConnected ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {isConnected ? "Connected" : "Disconnected"}
                      </span>
                      {onlineUsers.length > 0 && (
                        <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                          <Users className="w-4 h-4" />
                          <span>{onlineUsers.length} online</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCloseChat}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex pt-20">
              {/* Chat List */}
              <AnimatePresence>
                {showChatList && (
                  <motion.div
                    initial={{ x: -300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-80 border-r border-gray-200 dark:border-gray-700"
                  >
                    <ChatList
                      onSelectConversation={handleConversationSelect}
                      onCreateNewChat={handleCreateNewChat}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Chat Window */}
              <AnimatePresence>
                {showChatWindow && currentConversation && (
                  <motion.div
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 300, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1"
                  >
                    <ChatWindow
                      conversation={currentConversation}
                      onBack={handleBackToList}
                      onClose={handleCloseChat}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Empty State */}
              {showChatList && !showChatWindow && (
                <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                  <div className="text-center">
                    <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Select a conversation
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Choose a conversation from the list to start chatting
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Chat;
