import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL for API calls
<<<<<<< HEAD
const API_BASE_URL = "http://localhost:5001/api";
=======
const API_BASE_URL = "https://ez-rent-server-side.vercel.app/api";
>>>>>>> 1cad0057a097641c0a5265dce9b39c91a7030469

// Async thunks for API calls
export const createConversation = createAsyncThunk(
  "chat/createConversation",
  async (
    { guestId, hostId, propertyId, propertyTitle },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/conversations`, {
        guestId,
        hostId,
        propertyId,
        propertyTitle,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create conversation"
      );
    }
  }
);

export const fetchConversations = createAsyncThunk(
  "chat/fetchConversations",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/conversations/${userId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch conversations"
      );
    }
  }
);

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async ({ conversationId, page = 1, limit = 50 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/conversations/${conversationId}/messages?page=${page}&limit=${limit}`
      );
      return { conversationId, messages: response.data, page };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch messages"
      );
    }
  }
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (
    { conversationId, senderId, message, messageType = "text" },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/messages`, {
        conversationId,
        senderId,
        message,
        messageType,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send message"
      );
    }
  }
);

export const fetchOnlineUsers = createAsyncThunk(
  "chat/fetchOnlineUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/online`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch online users"
      );
    }
  }
);

const initialState = {
  // Conversations
  conversations: [],
  conversationsLoading: false,
  conversationsError: null,

  // Current conversation
  currentConversation: null,
  currentConversationId: null,

  // Messages
  messages: {},
  messagesLoading: false,
  messagesError: null,

  // Connection status
  isConnected: false,

  // Online users
  onlineUsers: [],

  // Typing indicators
  typingUsers: {},

  // UI state
  isChatOpen: false,
  isTyping: false,

  // Error handling
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setConnectionStatus: (state, action) => {
      state.isConnected = action.payload;
    },

    // Conversation actions
    setCurrentConversation: (state, action) => {
      state.currentConversation = action.payload;
      state.currentConversationId = action.payload?._id;
    },
    
    addConversation: (state, action) => {
      const newConversation = action.payload;
      // Check if conversation already exists
      const exists = state.conversations.some(conv => conv._id === newConversation._id);
      if (!exists) {
        state.conversations.unshift(newConversation);
      }
    },

    // Message actions
    addMessage: (state, action) => {
      const { conversationId, message } = action.payload;
      if (!state.messages[conversationId]) {
        state.messages[conversationId] = [];
      }
      state.messages[conversationId].push(message);
    },

    updateMessage: (state, action) => {
      const { conversationId, messageId, updates } = action.payload;
      if (state.messages[conversationId]) {
        const messageIndex = state.messages[conversationId].findIndex(
          (msg) => msg._id === messageId
        );
        if (messageIndex !== -1) {
          state.messages[conversationId][messageIndex] = {
            ...state.messages[conversationId][messageIndex],
            ...updates,
          };
        }
      }
    },

    markMessagesAsRead: (state, action) => {
      const { conversationId, userId } = action.payload;
      if (state.messages[conversationId]) {
        state.messages[conversationId] = state.messages[conversationId].map(
          (msg) => {
            if (msg.senderId !== userId && !msg.read) {
              return { ...msg, read: true, readAt: new Date() };
            }
            return msg;
          }
        );
      }
    },

    // Online users actions
    setUserOnline: (state, action) => {
      const userId = action.payload;
      if (!state.onlineUsers.includes(userId)) {
        state.onlineUsers.push(userId);
      }
    },

    setUserOffline: (state, action) => {
      const userId = action.payload;
      state.onlineUsers = state.onlineUsers.filter((id) => id !== userId);
    },

    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },

    // Typing indicators
    setTypingUser: (state, action) => {
      const { userId, conversationId, isTyping } = action.payload;
      if (!state.typingUsers[conversationId]) {
        state.typingUsers[conversationId] = [];
      }

      if (isTyping) {
        if (!state.typingUsers[conversationId].includes(userId)) {
          state.typingUsers[conversationId].push(userId);
        }
      } else {
        state.typingUsers[conversationId] = state.typingUsers[
          conversationId
        ].filter((id) => id !== userId);
      }
    },

    setTyping: (state, action) => {
      state.isTyping = action.payload;
    },

    // UI actions
    toggleChat: (state) => {
      state.isChatOpen = !state.isChatOpen;
    },

    openChat: (state) => {
      state.isChatOpen = true;
    },

    closeChat: (state) => {
      state.isChatOpen = false;
    },

    // Error handling
    clearError: (state) => {
      state.error = null;
      state.conversationsError = null;
      state.messagesError = null;
    },

    // Reset state
    resetChatState: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create conversation
      .addCase(createConversation.pending, (state) => {
        state.conversationsLoading = true;
        state.conversationsError = null;
      })
      .addCase(createConversation.fulfilled, (state, action) => {
        state.conversationsLoading = false;
        const conversation = action.payload;

        // Check if conversation already exists
        const existingIndex = state.conversations.findIndex(
          (conv) => conv._id === conversation._id
        );

        if (existingIndex === -1) {
          state.conversations.unshift(conversation);
        }

        state.currentConversation = conversation;
        state.currentConversationId = conversation._id;
      })
      .addCase(createConversation.rejected, (state, action) => {
        state.conversationsLoading = false;
        state.conversationsError = action.payload;
      })

      // Fetch conversations
      .addCase(fetchConversations.pending, (state) => {
        state.conversationsLoading = true;
        state.conversationsError = null;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.conversationsLoading = false;
        state.conversations = action.payload;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.conversationsLoading = false;
        state.conversationsError = action.payload;
      })

      // Fetch messages
      .addCase(fetchMessages.pending, (state) => {
        state.messagesLoading = true;
        state.messagesError = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messagesLoading = false;
        const { conversationId, messages, page } = action.payload;

        if (page === 1) {
          // Replace messages for first page
          state.messages[conversationId] = messages;
        } else {
          // Prepend messages for pagination
          state.messages[conversationId] = [
            ...messages,
            ...(state.messages[conversationId] || []),
          ];
        }
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.messagesLoading = false;
        state.messagesError = action.payload;
      })

      // Send message
      .addCase(sendMessage.pending, (state) => {
        state.messagesLoading = true;
        state.messagesError = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messagesLoading = false;
        const message = action.payload;
        const conversationId = message.conversationId;

        if (!state.messages[conversationId]) {
          state.messages[conversationId] = [];
        }
        state.messages[conversationId].push(message);

        // Update conversation in conversations list
        const conversationIndex = state.conversations.findIndex(
          (conv) => conv._id === conversationId
        );
        if (conversationIndex !== -1) {
          state.conversations[conversationIndex] = {
            ...state.conversations[conversationIndex],
            lastMessage: message.message,
            lastMessageTime: message.timestamp,
            lastMessageSender: message.senderId,
            updatedAt: message.timestamp,
          };

          // Move conversation to top
          const updatedConversation = state.conversations.splice(
            conversationIndex,
            1
          )[0];
          state.conversations.unshift(updatedConversation);
        }
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.messagesLoading = false;
        state.messagesError = action.payload;
      })

      // Fetch online users
      .addCase(fetchOnlineUsers.fulfilled, (state, action) => {
        state.onlineUsers = action.payload;
      });
  },
});

export const {
  setSocket,
  setConnectionStatus,
  setCurrentConversation,
  addConversation,
  addMessage,
  updateMessage,
  markMessagesAsRead,
  setUserOnline,
  setUserOffline,
  setOnlineUsers,
  setTypingUser,
  setTyping,
  toggleChat,
  openChat,
  closeChat,
  clearError,
  resetChatState,
} = chatSlice.actions;

export default chatSlice.reducer;
