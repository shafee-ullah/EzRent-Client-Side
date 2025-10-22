import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Clock,
  User,
  Search,
  Plus,
  MoreVertical,
} from "lucide-react";
import {
  fetchConversations,
  setCurrentConversation,
  openChat,
  clearError,
} from "../../redux/chatSlice";
import socketService from "../../services/socketService";

const ChatList = ({ onSelectConversation, onCreateNewChat }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.products);
  const {
    conversations,
    conversationsLoading,
    conversationsError,
    onlineUsers,
    currentConversationId,
  } = useSelector((state) => state.chat);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredConversations, setFilteredConversations] = useState([]);

  // Fetch conversations when component mounts
  useEffect(() => {
    if (user?._id) {
      dispatch(fetchConversations(user._id));
    }
  }, [dispatch, user?._id]);

  // Listen for new messages and update conversations
  useEffect(() => {
    if (user?._id) {
      const handleNewMessageForList = (message) => {
        console.log("📩 New message in conversation list:", message);
        // Refresh conversations to update lastMessage and move to top
        dispatch(fetchConversations(user._id));
      };

      // Set up socket listener for new messages
      const socket = socketService.getSocket();
      if (socket) {
        socket.on("new-message", handleNewMessageForList);
      }

      return () => {
        // Clean up listener when component unmounts
        if (socket) {
          socket.off("new-message", handleNewMessageForList);
        }
      };
    }
  }, [dispatch, user?._id]);

  // Filter conversations based on search term
  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = conversations.filter(
        (conv) =>
          conv.otherUser?.name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          conv.propertyTitle
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          conv.lastMessage?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredConversations(filtered);
    } else {
      setFilteredConversations(conversations);
    }
  }, [conversations, searchTerm]);

  // Handle conversation selection
  const handleConversationSelect = (conversation) => {
    dispatch(setCurrentConversation(conversation));
    dispatch(openChat());

    // Join conversation room
    socketService.joinConversation(conversation._id);

    if (onSelectConversation) {
      onSelectConversation(conversation);
    }
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";

    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffInHours < 168) {
      // 7 days
      return date.toLocaleDateString([], { weekday: "short" });
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  // Check if user is online
  const isUserOnline = (userId) => {
    return onlineUsers.includes(userId);
  };

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  if (conversationsLoading) {
    return (
      <div className="flex items-center justify-center h-48 sm:h-64">
        <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (conversationsError) {
    return (
      <div className="p-3 sm:p-4 text-center">
        <p className="text-red-500 mb-2 text-sm sm:text-base">
          {conversationsError}
        </p>
        <button
          onClick={() => user?._id && dispatch(fetchConversations(user._id))}
          className="px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-2xl hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full backdrop-blur-sm bg-gradient-to-br from-emerald-50/50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-emerald-900/10">
      {/* Header */}
      <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-600">
            Conversations
          </h2>
          <motion.button
            onClick={onCreateNewChat}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-1.5 sm:p-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white transition-all duration-300 text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 sm:h-64 text-gray-500 dark:text-gray-400 px-4">
            <MessageCircle className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 opacity-50" />
            <p className="text-base sm:text-lg font-medium mb-2 text-center">
              No conversations yet
            </p>
            <p className="text-xs sm:text-sm text-center">
              {searchTerm
                ? "No conversations match your search"
                : "Start a conversation with a host or guest"}
            </p>
          </div>
        ) : (
          <div className="space-y-1 p-1 sm:p-2">
            {filteredConversations.map((conversation) => (
              <motion.div
                key={conversation._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => handleConversationSelect(conversation)}
                className={`p-3 sm:p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  currentConversationId === conversation._id
                    ? "bg-gradient-to-r from-emerald-500/10 to-green-500/10 dark:from-emerald-900/20 dark:to-green-900/20 border-l-4 border-emerald-500"
                    : "hover:bg-white/50 dark:hover:bg-gray-700/50"
                }`}
              >
                <div className="flex items-start space-x-2 sm:space-x-3">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    {/* Online indicator */}
                    {isUserOnline(conversation.otherUser?._id) && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {conversation.otherUser?.name || "Unknown User"}
                      </h3>
                      <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                        {conversation.lastMessageTime && (
                          <span className="text-xs text-gray-600 dark:text-gray-300 flex items-center">
                            <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" />
                            <span className="hidden sm:inline">
                              {formatTimestamp(conversation.lastMessageTime)}
                            </span>
                            <span className="sm:hidden">
                              {
                                formatTimestamp(
                                  conversation.lastMessageTime
                                ).split(" ")[0]
                              }
                            </span>
                          </span>
                        )}
                        <button className="p-0.5 sm:p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-all duration-300">
                          <MoreVertical className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>

                    {conversation.propertyTitle && (
                      <p className="text-xs bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400 font-medium mb-1 truncate">
                        {conversation.propertyTitle}
                      </p>
                    )}

                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 truncate">
                      {conversation.lastMessage || "Please enter to see the message"}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
