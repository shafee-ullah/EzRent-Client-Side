import { io } from "socket.io-client";
import store from "../app/Store";
import {
  setConnectionStatus,
  addMessage,
  setUserOnline,
  setUserOffline,
  setTypingUser,
  markMessagesAsRead,
} from "../redux/chatSlice";

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
  }

  // Initialize socket connection
  connect(userId) {
    if (this.socket && this.isConnected) {
      return this.socket;
    }

    this.socket = io("https://ez-rent-server-side.vercel.app", {
      transports: ["websocket", "polling"],
      timeout: 20000,
      forceNew: true,
    });

    // Socket is managed locally in this service

    // Connection event handlers
    this.socket.on("connect", () => {
      console.log("Socket connected:", this.socket.id);
      this.isConnected = true;
      store.dispatch(setConnectionStatus(true));

      // Join with user ID
      if (userId) {
        this.joinUser(userId);
      }
    });

    this.socket.on("disconnect", () => {
      console.log("Socket disconnected");
      this.isConnected = false;
      store.dispatch(setConnectionStatus(false));
    });

    this.socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      this.isConnected = false;
      store.dispatch(setConnectionStatus(false));
    });

    // Message event handlers
    this.socket.on("new-message", (message) => {
      console.log("New message received:", message);
      store.dispatch(
        addMessage({
          conversationId: message.conversationId,
          message: message,
        })
      );
    });

    this.socket.on("message-error", (error) => {
      console.error("Message error:", error);
    });

    // User status event handlers
    this.socket.on("user-online", (userId) => {
      console.log("User came online:", userId);
      store.dispatch(setUserOnline(userId));
    });

    this.socket.on("user-offline", (userId) => {
      console.log("User went offline:", userId);
      store.dispatch(setUserOffline(userId));
    });

    // Typing event handlers
    this.socket.on("user-typing", (data) => {
      console.log("User typing:", data);
      store.dispatch(
        setTypingUser({
          userId: data.userId,
          conversationId: data.conversationId,
          isTyping: data.isTyping,
        })
      );
    });

    // Message read status
    this.socket.on("messages-read", (data) => {
      console.log("Messages read:", data);
      store.dispatch(
        markMessagesAsRead({
          conversationId: data.conversationId,
          userId: data.readBy,
        })
      );
    });

    return this.socket;
  }

  // Disconnect socket
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      store.dispatch(setConnectionStatus(false));
    }
  }

  // Join user with their ID
  joinUser(userId) {
    if (this.socket && this.isConnected) {
      this.socket.emit("join", userId);
    }
  }

  // Join a conversation room
  joinConversation(conversationId) {
    if (this.socket && this.isConnected) {
      this.socket.emit("join-conversation", conversationId);
    }
  }

  // Leave a conversation room
  leaveConversation(conversationId) {
    if (this.socket && this.isConnected) {
      this.socket.emit("leave-conversation", conversationId);
    }
  }

  // Send a message
  sendMessage(data) {
    if (this.socket && this.isConnected) {
      this.socket.emit("send-message", data);
    } else {
      console.error("Socket not connected");
    }
  }

  // Start typing indicator
  startTyping(conversationId) {
    if (this.socket && this.isConnected) {
      this.socket.emit("typing-start", { conversationId });
    }
  }

  // Stop typing indicator
  stopTyping(conversationId) {
    if (this.socket && this.isConnected) {
      this.socket.emit("typing-stop", { conversationId });
    }
  }

  // Mark messages as read
  markMessagesAsRead(conversationId, userId) {
    if (this.socket && this.isConnected) {
      this.socket.emit("mark-messages-read", { conversationId, userId });
    }
  }

  // Get socket instance
  getSocket() {
    return this.socket;
  }

  // Check if connected
  isSocketConnected() {
    return this.isConnected && this.socket;
  }
}

// Create singleton instance
const socketService = new SocketService();

export default socketService;
