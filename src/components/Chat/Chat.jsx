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
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="backdrop-blur-sm bg-gradient-to-br from-emerald-50/50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-emerald-900/10 border border-gray-200 dark:border-gray-700 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-6xl h-[90vh] sm:h-[80vh] max-h-[700px] sm:max-h-[600px] flex overflow-hidden mx-2 sm:mx-4"
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-10 backdrop-blur-sm bg-gradient-to-r from-emerald-500/10 to-green-500/10 dark:from-emerald-900/20 dark:to-green-900/20 border-b border-gray-200 dark:border-gray-700 p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                  <div className="p-1.5 sm:p-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl shadow-lg flex-shrink-0">
                    <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-600">
                      Messages
                    </h2>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <div
                        className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full flex-shrink-0 ${
                          isConnected ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></div>
                      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                        {isConnected ? "Connected" : "Disconnected"}
                      </span>
                      {onlineUsers.length > 0 && (
                        <div className="flex items-center space-x-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                          <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="hidden sm:inline">
                            {onlineUsers.length} online
                          </span>
                          <span className="sm:hidden">
                            {onlineUsers.length}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCloseChat}
                  className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-2xl transition-all duration-300 flex-shrink-0"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex pt-16 sm:pt-20">
              {/* Chat List */}
              <AnimatePresence>
                {showChatList && (
                  <motion.div
                    initial={{ x: -300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full sm:w-80 border-r border-gray-200 dark:border-gray-700"
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
                    className="flex-1 w-full"
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
                <div className="hidden sm:flex flex-1 items-center justify-center bg-gradient-to-br from-emerald-50/50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-emerald-900/10">
                  <div className="text-center px-4">
                    <MessageCircle className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2">
                      Select a conversation
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
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
