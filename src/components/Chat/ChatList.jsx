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
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (conversationsError) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500 mb-2">{conversationsError}</p>
        <button
          onClick={() => user?._id && dispatch(fetchConversations(user._id))}
          className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Messages
          </h2>
          <button
            onClick={onCreateNewChat}
            className="p-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
            <MessageCircle className="w-12 h-12 mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">No conversations yet</p>
            <p className="text-sm text-center">
              {searchTerm
                ? "No conversations match your search"
                : "Start a conversation with a host or guest"}
            </p>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {filteredConversations.map((conversation) => (
              <motion.div
                key={conversation._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => handleConversationSelect(conversation)}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  currentConversationId === conversation._id
                    ? "bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500"
                    : "hover:shadow-sm"
                }`}
              >
                <div className="flex items-start space-x-3">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    {/* Online indicator */}
                    {isUserOnline(conversation.otherUser?._id) && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {conversation.otherUser?.name || "Unknown User"}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {conversation.lastMessageTime && (
                          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatTimestamp(conversation.lastMessageTime)}
                          </span>
                        )}
                        <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>

                    {conversation.propertyTitle && (
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 mb-1">
                        {conversation.propertyTitle}
                      </p>
                    )}

                    <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                      {conversation.lastMessage || "No messages yet"}
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
