import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

// Import our data and models
import { friendKeys } from './data/friendKeys.js';
import Message from './models/message.js';
import Conversation from './models/conversation.js';

// Load environment variables from .env file
dotenv.config();

// --- Database Connection ---
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully.'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// --- Server Setup ---
const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // In production, you might want to restrict this to your frontend's URL
    methods: ["GET", "POST"]
  }
});

// --- Helper Function ---
// Creates a consistent, sorted ID for a conversation between two people.
const generateConversationId = (name1, name2) => {
  return [name1, name2].sort().join('-');
};

// =================================================================
// --- API ENDPOINTS ---
// =================================================================

// Endpoint to validate the entry key and determine the user's role and identity
app.post('/api/validate-key', (req, res) => {
  const { key } = req.body;
  const ADMIN_ID = process.env.ADMIN_ID;

  // 1. Check if it's the Admin key
  if (key === ADMIN_ID) {
    return res.json({ role: 'admin', name: 'Zubair wani' });
  }

  // 2. Check if it's a valid Friend key
  if (friendKeys[key]) {
    const friendName = friendKeys[key];
    const conversationId = generateConversationId(friendName, 'Zubair wani');
    return res.json({
      role: 'friend',
      otherName: 'Zubair wani',
      name: friendName,
      conversationId: conversationId,
    });
  }

  // 3. If neither, it's an invalid key
  return res.status(404).json({ error: 'Invalid Key' });
});

// Endpoint for the Admin to get their list of contacts with unread counts
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = Object.values(friendKeys);
    
    const contactsWithUnread = await Promise.all(
      contacts.map(async (contactName) => {
        const conversationId = generateConversationId(contactName, 'Zubair wani');
        const conversation = await Conversation.findOne({ conversationId });
        
        const adminLastViewed = conversation ? conversation.adminLastViewedAt : null;
        
        let unreadCount = 0;
        if (adminLastViewed) {
          // Count messages that are newer than the last viewed time
          unreadCount = await Message.countDocuments({
            conversationId,
            createdAt: { $gt: adminLastViewed }
          });
        } else {
          // If never viewed, all messages are unread
          unreadCount = await Message.countDocuments({ conversationId });
        }

        return {
          name: contactName,
          conversationId,
          unreadCount,
        };
      })
    );

    res.json(contactsWithUnread);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});


// Endpoint to get all messages for a specific conversation
app.get('/api/messages/:conversationId', async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await Message.find({ conversationId }).sort({ createdAt: 'asc' });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Endpoint to mark a conversation as read by the admin
app.post('/api/conversations/mark-as-read', async (req, res) => {
    try {
        const { conversationId } = req.body;
        // Use `findOneAndUpdate` with `upsert` to create the document if it doesn't exist
        await Conversation.findOneAndUpdate(
            { conversationId },
            { adminLastViewedAt: new Date() },
            { new: true, upsert: true }
        );
        res.status(200).send({ message: 'Marked as read' });
    } catch (error) {
        console.error('Error marking as read:', error);
        res.status(500).json({ error: 'Failed to mark as read' });
    }
});


// =================================================================
// --- SOCKET.IO REAL-TIME LOGIC ---
// =================================================================
io.on('connection', (socket) => {
  console.log(`🔌 A user connected: ${socket.id}`);

  // When a client joins a specific chat room
  socket.on('joinRoom', (conversationId) => {
    socket.join(conversationId);
    console.log(`User ${socket.id} joined room: ${conversationId}`);
  });

  // When a client sends a message
  socket.on('sendMessage', async (data) => {
    const { conversationId, senderName, content } = data;
    
    // 1. Save the message to the database
    const newMessage = new Message({
      conversationId,
      senderName,
      content,
    });
    await newMessage.save();

    // 2. Broadcast the new message to everyone in that specific room
    io.to(conversationId).emit('newMessage', newMessage);
  });

  socket.on('disconnect', () => {
    console.log(`❌ User disconnected: ${socket.id}`);
  });
});


// =================================================================
// --- PRODUCTION BUILD SERVING LOGIC ---
// =================================================================
if (process.env.NODE_ENV === 'production') {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
  });
}

// --- Start the Server ---
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});