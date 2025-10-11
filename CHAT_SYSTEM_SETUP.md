# EzRent Chat System - Complete Setup Guide

## Overview

This document provides a complete guide for the real-time chat system implemented in the EzRent application. The system enables guests and hosts to communicate in real-time using Socket.io and Redux for state management.

## 🏗️ Architecture

### Backend (Node.js + Express + Socket.io)

- **Server**: Express.js with Socket.io integration
- **Database**: MongoDB with native driver (no Mongoose)
- **Real-time**: Socket.io for WebSocket connections
- **Collections**: `conversations`, `messages`, `users`

### Frontend (React + Redux)

- **State Management**: Redux Toolkit with chatSlice
- **Real-time**: Socket.io-client
- **UI Components**: React with Framer Motion animations
- **Styling**: Tailwind CSS

## 📁 Folder Structure

### Backend Structure

```
ez-rent-server/
├── index.js                 # Main server file with Socket.io setup
├── package.json             # Dependencies including socket.io
└── vercel.json             # Deployment configuration
```

### Frontend Structure

```
src/
├── redux/
│   ├── chatSlice.js         # Redux slice for chat state management
│   └── Store.js             # Redux store configuration
├── services/
│   └── socketService.js     # Socket.io service wrapper
├── Components/
│   └── Chat/
│       ├── Chat.jsx         # Main chat modal component
│       ├── ChatList.jsx     # Conversations list
│       ├── ChatWindow.jsx   # Individual chat window
│       ├── MessageHostButton.jsx # Contact host buttons
│       └── ChatProvider.jsx # Socket connection provider
└── Pages/
    └── Dashboard/
        ├── Guest/
        │   └── components/
        │       ├── MessagesSection.jsx  # Updated with chat integration
        │       └── BookingsSection.jsx  # Updated with Contact Host button
        └── Host/
            └── components/
                └── MessagesSection.jsx  # Updated with chat integration
```

## 🗄️ Database Collections

### 1. Conversations Collection

```javascript
{
  _id: ObjectId("..."),
  guestId: ObjectId("..."),      // Guest user ID
  hostId: ObjectId("..."),       // Host user ID
  propertyId: ObjectId("..."),   // Optional: Related property
  propertyTitle: "Luxury Apartment in Gulshan", // Optional: Property name
  createdAt: Date,
  updatedAt: Date,
  lastMessage: "Hello, I'm interested in your property",
  lastMessageTime: Date,
  lastMessageSender: ObjectId("...")
}
```

### 2. Messages Collection

```javascript
{
  _id: ObjectId("..."),
  conversationId: ObjectId("..."), // Reference to conversation
  senderId: ObjectId("..."),       // User who sent the message
  message: "Hello, I'm interested in your property",
  messageType: "text",             // text, image, file, etc.
  timestamp: Date,
  read: false,                     // Read status
  readAt: Date                     // When message was read
}
```

### 3. Users Collection (Existing)

```javascript
{
  _id: ObjectId("..."),
  name: "A K M Shafee Ullah",
  email: "shafeeullah.412@gmail.com",
  role: "guest" // or "host"
}
```

## 🔧 Backend Implementation

### Socket.io Server Setup

```javascript
const { Server } = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
```

### Socket Events

- `join` - User joins with their ID
- `join-conversation` - Join a specific conversation room
- `leave-conversation` - Leave a conversation room
- `send-message` - Send a new message
- `typing-start` - Start typing indicator
- `typing-stop` - Stop typing indicator
- `mark-messages-read` - Mark messages as read

### API Routes

- `POST /api/conversations` - Create new conversation
- `GET /api/conversations/:userId` - Get user's conversations
- `GET /api/conversations/:conversationId/messages` - Get conversation messages
- `POST /api/messages` - Send message (REST fallback)
- `GET /api/users/online` - Get online users

## 🎨 Frontend Implementation

### Redux State Structure

```javascript
{
  chat: {
    conversations: [],           // User's conversations
    currentConversation: null,   // Active conversation
    messages: {},               // Messages by conversation ID
    onlineUsers: [],            // Currently online users
    typingUsers: {},            // Users currently typing
    isChatOpen: false,          // Chat modal state
    isConnected: false,         // Socket connection status
    // ... loading states and errors
  }
}
```

### Key Components

#### 1. ChatProvider

- Initializes Socket.io connection
- Manages connection lifecycle
- Wraps the entire app

#### 2. Chat (Main Modal)

- Full-screen chat interface
- Manages chat list and chat window views
- Handles modal open/close states

#### 3. ChatList

- Displays all conversations
- Shows online status indicators
- Search functionality
- Recent conversations preview

#### 4. ChatWindow

- Individual conversation view
- Real-time message display
- Typing indicators
- Message input with send functionality

#### 5. MessageHostButton

- Multiple variants for different use cases
- ContactHostButton for booking cards
- QuickMessageButton for property listings
- Icon variant for compact spaces

## 🚀 Features Implemented

### ✅ Core Features

- [x] Real-time messaging with Socket.io
- [x] Conversation creation and management
- [x] Message history and persistence
- [x] Online/offline status tracking
- [x] Typing indicators
- [x] Message read status
- [x] Integration with booking flow

### ✅ UI/UX Features

- [x] Modern, responsive design
- [x] Smooth animations with Framer Motion
- [x] Dark mode support
- [x] Mobile-friendly interface
- [x] Loading states and error handling
- [x] Search functionality
- [x] Recent conversations preview

### ✅ Integration Features

- [x] Contact Host button in booking cards
- [x] Messages section in both dashboards
- [x] Property context in conversations
- [x] User authentication integration
- [x] Redux state management

## 🔌 Usage Examples

### 1. Contact Host from Booking

```jsx
import { ContactHostButton } from "./Components/Chat/MessageHostButton";

<ContactHostButton
  hostId={booking.hostId}
  hostName={booking.host}
  propertyId={booking.propertyId}
  propertyTitle={booking.title}
/>;
```

### 2. Open Chat Modal

```jsx
import { useDispatch } from "react-redux";
import { openChat } from "./redux/chatSlice";

const dispatch = useDispatch();
dispatch(openChat());
```

### 3. Send Message Programmatically

```jsx
import socketService from "./services/socketService";

socketService.sendMessage({
  conversationId: "conversation_id",
  senderId: "user_id",
  message: "Hello!",
  messageType: "text",
});
```

## 🛠️ Setup Instructions

### Backend Setup

1. Install dependencies:

   ```bash
   cd ez-rent-server
   npm install socket.io
   ```

2. Update server configuration:

   - Socket.io server setup in `index.js`
   - Chat API routes
   - MongoDB collections

3. Start server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Dependencies already included:

   - `socket.io-client`
   - `@reduxjs/toolkit`
   - `framer-motion`

2. Redux store updated with chatSlice

3. Components integrated into dashboards

4. ChatProvider added to main app

## 🔧 Configuration

### Environment Variables

```env
# Backend
PORT=5000
DB_USER=your_mongodb_user
DB_PASS=your_mongodb_password

# Frontend
VITE_API_URL=http://localhost:5000
```

### Socket.io Configuration

```javascript
// Backend
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Frontend URL
    methods: ["GET", "POST"],
  },
});

// Frontend
const socket = io("http://localhost:5000", {
  transports: ["websocket", "polling"],
  timeout: 20000,
  forceNew: true,
});
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] Create conversation between guest and host
- [ ] Send messages in real-time
- [ ] Typing indicators work
- [ ] Online/offline status updates
- [ ] Message read status
- [ ] Contact Host button from bookings
- [ ] Chat modal opens/closes properly
- [ ] Search conversations
- [ ] Mobile responsiveness

### Test Scenarios

1. **Guest contacts host from booking**

   - Click "Contact Host" button
   - Verify conversation is created
   - Send first message

2. **Real-time messaging**

   - Open chat in two different browsers
   - Send messages from both sides
   - Verify real-time delivery

3. **Typing indicators**

   - Start typing in one browser
   - Verify typing indicator shows in other browser

4. **Online status**
   - Connect/disconnect users
   - Verify online status updates

## 🚀 Deployment

### Backend Deployment (Vercel)

1. Update `vercel.json` if needed
2. Deploy to Vercel
3. Update CORS origins for production

### Frontend Deployment

1. Update API URLs for production
2. Build and deploy
3. Update Socket.io connection URL

## 🔒 Security Considerations

- User authentication required for all chat operations
- Conversation access restricted to participants
- Input validation and sanitization
- Rate limiting for message sending
- CORS configuration for production

## 📱 Mobile Support

- Responsive design for all screen sizes
- Touch-friendly interface
- Mobile-optimized chat interface
- Swipe gestures for navigation

## 🎯 Future Enhancements

- [ ] File/image sharing
- [ ] Message reactions
- [ ] Push notifications
- [ ] Message search
- [ ] Chat groups
- [ ] Voice messages
- [ ] Video calls integration
- [ ] Message encryption

## 🐛 Troubleshooting

### Common Issues

1. **Socket connection fails**

   - Check CORS configuration
   - Verify server is running
   - Check network connectivity

2. **Messages not sending**

   - Verify user authentication
   - Check conversation exists
   - Verify Socket.io connection

3. **Typing indicators not working**

   - Check Socket.io event listeners
   - Verify typing timeout logic

4. **Online status not updating**
   - Check user join/leave events
   - Verify online users tracking

### Debug Mode

Enable debug logging:

```javascript
// Backend
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  // ... rest of the code
});

// Frontend
socket.on("connect", () => {
  console.log("Socket connected:", socket.id);
});
```

## 📞 Support

For issues or questions about the chat system implementation, refer to:

- Socket.io documentation
- Redux Toolkit documentation
- MongoDB native driver documentation
- React documentation

---

**Note**: This chat system is fully integrated with the existing EzRent booking application and follows the design patterns established in the codebase. All components are modular and can be easily extended or modified as needed.
