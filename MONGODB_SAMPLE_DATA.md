# MongoDB Sample Data for Chat System

## Sample Documents for Testing

### 1. Users Collection

```javascript
// Guest User
{
  "_id": ObjectId("68e9b4260b78f525ff8c1b36"),
  "name": "A K M Shafee Ullah",
  "email": "shafeeullah.412@gmail.com",
  "role": "guest"
}

// Host User
{
  "_id": ObjectId("68e9b4b18beac499d42b65ac"),
  "name": "John Cena",
  "email": "johncena@gmail.com",
  "role": "host"
}

// Another Guest User
{
  "_id": ObjectId("68e9b4c28beac499d42b65ad"),
  "name": "Fatima Begum",
  "email": "fatima@example.com",
  "role": "guest"
}

// Another Host User
{
  "_id": ObjectId("68e9b4d38beac499d42b65ae"),
  "name": "Ahmad Rahman",
  "email": "ahmad@example.com",
  "role": "host"
}
```

### 2. Conversations Collection

```javascript
// Conversation between Shafee (guest) and John (host)
{
  "_id": ObjectId("68e9b5a10b78f525ff8c1b37"),
  "guestId": ObjectId("68e9b4260b78f525ff8c1b36"),
  "id": ObjectId("68e9b4b18beac499d42b65ac"),
  "propertyId": ObjectId("68e9b6a10b78f525ff8c1b38"),
  "propertyTitle": "Luxury Apartment in Gulshan",
  "createdAt": ISODate("2024-01-15T10:30:00.000Z"),
  "updatedAt": ISODate("2024-01-15T14:45:00.000Z"),
  "lastMessage": "Thank you for the quick response!",
  "lastMessageTime": ISODate("2024-01-15T14:45:00.000Z"),
  "lastMessageSender": ObjectId("68e9b4260b78f525ff8c1b36")
}

// Conversation between Fatima (guest) and Ahmad (host)
{
  "_id": ObjectId("68e9b5b20b78f525ff8c1b39"),
  "guestId": ObjectId("68e9b4c28beac499d42b65ad"),
  "id": ObjectId("68e9b4d38beac499d42b65ae"),
  "propertyId": ObjectId("68e9b6b20b78f525ff8c1b3a"),
  "propertyTitle": "Beachfront Villa Cox's Bazar",
  "createdAt": ISODate("2024-01-14T09:15:00.000Z"),
  "updatedAt": ISODate("2024-01-15T16:20:00.000Z"),
  "lastMessage": "I'll send you the check-in instructions shortly.",
  "lastMessageTime": ISODate("2024-01-15T16:20:00.000Z"),
  "lastMessageSender": ObjectId("68e9b4d38beac499d42b65ae")
}
```

### 3. Messages Collection

```javascript
// Messages for the first conversation
{
  "_id": ObjectId("68e9b7a10b78f525ff8c1b3b"),
  "conversationId": ObjectId("68e9b5a10b78f525ff8c1b37"),
  "senderId": ObjectId("68e9b4260b78f525ff8c1b36"),
  "message": "Hello! I'm interested in your luxury apartment. Is it available for the weekend?",
  "messageType": "text",
  "timestamp": ISODate("2024-01-15T10:30:00.000Z"),
  "read": true,
  "readAt": ISODate("2024-01-15T10:32:00.000Z")
}

{
  "_id": ObjectId("68e9b7b20b78f525ff8c1b3c"),
  "conversationId": ObjectId("68e9b5a10b78f525ff8c1b37"),
  "senderId": ObjectId("68e9b4b18beac499d42b65ac"),
  "message": "Hi! Yes, it's available. The apartment is fully furnished and includes all amenities. Would you like to know more details?",
  "messageType": "text",
  "timestamp": ISODate("2024-01-15T10:35:00.000Z"),
  "read": true,
  "readAt": ISODate("2024-01-15T10:36:00.000Z")
}

{
  "_id": ObjectId("68e9b7c30b78f525ff8c1b3d"),
  "conversationId": ObjectId("68e9b5a10b78f525ff8c1b37"),
  "senderId": ObjectId("68e9b4260b78f525ff8c1b36"),
  "message": "That sounds great! What's the check-in process?",
  "messageType": "text",
  "timestamp": ISODate("2024-01-15T10:40:00.000Z"),
  "read": true,
  "readAt": ISODate("2024-01-15T10:41:00.000Z")
}

{
  "_id": ObjectId("68e9b7d40b78f525ff8c1b3e"),
  "conversationId": ObjectId("68e9b5a10b78f525ff8c1b37"),
  "senderId": ObjectId("68e9b4b18beac499d42b65ac"),
  "message": "I'll send you the check-in instructions and key collection details once you confirm the booking.",
  "messageType": "text",
  "timestamp": ISODate("2024-01-15T10:45:00.000Z"),
  "read": true,
  "readAt": ISODate("2024-01-15T10:46:00.000Z")
}

{
  "_id": ObjectId("68e9b7e50b78f525ff8c1b3f"),
  "conversationId": ObjectId("68e9b5a10b78f525ff8c1b37"),
  "senderId": ObjectId("68e9b4260b78f525ff8c1b36"),
  "message": "Thank you for the quick response!",
  "messageType": "text",
  "timestamp": ISODate("2024-01-15T14:45:00.000Z"),
  "read": false
}

// Messages for the second conversation
{
  "_id": ObjectId("68e9b8a10b78f525ff8c1b40"),
  "conversationId": ObjectId("68e9b5b20b78f525ff8c1b39"),
  "senderId": ObjectId("68e9b4c28beac499d42b65ad"),
  "message": "Hi Ahmad! I've booked your beachfront villa for next week. Could you please confirm the booking?",
  "messageType": "text",
  "timestamp": ISODate("2024-01-14T09:15:00.000Z"),
  "read": true,
  "readAt": ISODate("2024-01-14T09:20:00.000Z")
}

{
  "_id": ObjectId("68e9b8b20b78f525ff8c1b41"),
  "conversationId": ObjectId("68e9b5b20b78f525ff8c1b39"),
  "senderId": ObjectId("68e9b4d38beac499d42b65ae"),
  "message": "Hello Fatima! Yes, I can see your booking. It's confirmed for next week. The villa is all set for your stay!",
  "messageType": "text",
  "timestamp": ISODate("2024-01-14T09:25:00.000Z"),
  "read": true,
  "readAt": ISODate("2024-01-14T09:26:00.000Z")
}

{
  "_id": ObjectId("68e9b8c30b78f525ff8c1b42"),
  "conversationId": ObjectId("68e9b5b20b78f525ff8c1b39"),
  "senderId": ObjectId("68e9b4c28beac499d42b65ad"),
  "message": "Perfect! What time can we check in?",
  "messageType": "text",
  "timestamp": ISODate("2024-01-15T16:15:00.000Z"),
  "read": true,
  "readAt": ISODate("2024-01-15T16:18:00.000Z")
}

{
  "_id": ObjectId("68e9b8d40b78f525ff8c1b43"),
  "conversationId": ObjectId("68e9b5b20b78f525ff8c1b39"),
  "senderId": ObjectId("68e9b4d38beac499d42b65ae"),
  "message": "I'll send you the check-in instructions shortly.",
  "messageType": "text",
  "timestamp": ISODate("2024-01-15T16:20:00.000Z"),
  "read": false
}
```

## Sample Properties Collection (for reference)

```javascript
// Property referenced in first conversation
{
  "_id": ObjectId("68e9b6a10b78f525ff8c1b38"),
  "title": "Luxury Apartment in Gulshan",
  "location": "Gulshan, Dhaka",
  "price": 4500,
  "type": "Apartment",
  "host": "John Cena",
  "hostEmail": "johncena@gmail.com",
  "images": ["https://example.com/image1.jpg"],
  "amenities": ["wifi", "parking", "ac", "kitchen"],
  "status": "active"
}

// Property referenced in second conversation
{
  "_id": ObjectId("68e9b6b20b78f525ff8c1b3a"),
  "title": "Beachfront Villa Cox's Bazar",
  "location": "Cox's Bazar",
  "price": 8900,
  "type": "Villa",
  "host": "Ahmad Rahman",
  "hostEmail": "ahmad@example.com",
  "images": ["https://example.com/image2.jpg"],
  "amenities": ["wifi", "parking", "ac", "beach"],
  "status": "active"
}
```

## Sample Booking Data (for reference)

```javascript
// Booking that could trigger a conversation
{
  "_id": ObjectId("68e9b9a10b78f525ff8c1b44"),
  "title": "Luxury Apartment in Gulshan",
  "host": "John Cena",
  "id": ObjectId("68e9b4b18beac499d42b65ac"),
  "propertyId": ObjectId("68e9b6a10b78f525ff8c1b38"),
  "email": "shafeeullah.412@gmail.com",
  "Checkin": "2024-01-20",
  "Checkout": "2024-01-22",
  "price": 13500,
  "status": "confirmed",
  "img": "https://example.com/image1.jpg"
}
```

## Testing Scenarios

### 1. Create New Conversation

```javascript
// POST /api/conversations
{
  "guestId": "68e9b4260b78f525ff8c1b36",
  "id": "68e9b4b18beac499d42b65ac",
  "propertyId": "68e9b6a10b78f525ff8c1b38",
  "propertyTitle": "Luxury Apartment in Gulshan"
}
```

### 2. Send Message

```javascript
// POST /api/messages
{
  "conversationId": "68e9b5a10b78f525ff8c1b37",
  "senderId": "68e9b4260b78f525ff8c1b36",
  "message": "Hello! I'm interested in your property.",
  "messageType": "text"
}
```

### 3. Get User Conversations

```javascript
// GET /api/conversations/68e9b4260b78f525ff8c1b36
// Returns all conversations where user is either guest or host
```

### 4. Get Conversation Messages

```javascript
// GET /api/conversations/68e9b5a10b78f525ff8c1b37/messages
// Returns all messages for the conversation
```

## MongoDB Queries for Testing

### Find all conversations for a user

```javascript
db.conversations
  .find({
    $or: [
      { guestId: ObjectId("68e9b4260b78f525ff8c1b36") },
      { id: ObjectId("68e9b4260b78f525ff8c1b36") },
    ],
  })
  .sort({ updatedAt: -1 });
```

### Find messages for a conversation

```javascript
db.messages
  .find({
    conversationId: ObjectId("68e9b5a10b78f525ff8c1b37"),
  })
  .sort({ timestamp: 1 });
```

### Update conversation last message

```javascript
db.conversations.updateOne(
  { _id: ObjectId("68e9b5a10b78f525ff8c1b37") },
  {
    $set: {
      lastMessage: "Thank you for the quick response!",
      lastMessageTime: new Date(),
      lastMessageSender: ObjectId("68e9b4260b78f525ff8c1b36"),
      updatedAt: new Date(),
    },
  }
);
```

### Mark messages as read

```javascript
db.messages.updateMany(
  {
    conversationId: ObjectId("68e9b5a10b78f525ff8c1b37"),
    senderId: { $ne: ObjectId("68e9b4b18beac499d42b65ac") },
    read: false,
  },
  {
    $set: {
      read: true,
      readAt: new Date(),
    },
  }
);
```

## Indexes for Performance

### Recommended Indexes

```javascript
// Conversations collection
db.conversations.createIndex({ guestId: 1, id: 1 });
db.conversations.createIndex({ updatedAt: -1 });

// Messages collection
db.messages.createIndex({ conversationId: 1, timestamp: -1 });
db.messages.createIndex({ senderId: 1 });
db.messages.createIndex({ read: 1 });

// Users collection (if not already exists)
db.users.createIndex({ email: 1 });
```

These sample documents and queries will help you test the chat system functionality and understand the data structure.
