import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { MessageCircle, Users, Clock, User } from "lucide-react";
import { openChat, fetchConversations } from "../../../../redux/chatSlice";
import Chat from "../../../../Components/Chat/Chat";

const MessagesSection = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.products);
  const { conversations, conversationsLoading, isChatOpen, onlineUsers } =
    useSelector((state) => state.chat);

  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  // Fetch conversations when component mounts
  React.useEffect(() => {
    if (user?._id) {
      dispatch(fetchConversations(user._id));
    }
  }, [dispatch, user?._id]);

  const handleOpenChat = () => {
    dispatch(openChat());
    setIsChatModalOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatModalOpen(false);
  };

  // Get recent conversations (last 3)
  const recentConversations = conversations.slice(0, 3);

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";

    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  // Check if user is online
  const isUserOnline = (userId) => {
    return onlineUsers.includes(userId);
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Messages
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpenChat}
          className="flex items-center justify-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-2xl hover:bg-emerald-600 transition-colors w-full sm:w-auto"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Open Chat</span>
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-800 rounded-lg">
              <MessageCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {conversations.length}
              </p>
              <p className="text-sm text-emerald-700 dark:text-emerald-300">
                Total Conversations
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {onlineUsers.length}
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Online Users
              </p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-lg">
              <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {conversations.filter((conv) => conv.lastMessageTime).length}
              </p>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Active Chats
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Conversations */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Conversations
        </h3>

        {conversationsLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
          </div>
        ) : recentConversations.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              No conversations yet
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Start chatting with hosts about properties you're interested in
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentConversations.map((conversation) => (
              <motion.div
                key={conversation._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                onClick={handleOpenChat}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    {isUserOnline(conversation.otherUser?._id) && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                        {conversation.otherUser?.name || "Unknown User"}
                      </h4>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatTimestamp(conversation.lastMessageTime)}
                      </span>
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

      {/* Chat Modal */}
      <Chat isOpen={isChatModalOpen || isChatOpen} onClose={handleCloseChat} />
    </div>
  );
};

export default MessagesSection;
