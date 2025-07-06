import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

// Import data and models
import { friendKeys } from './data/friendKeys.js';
import Message from './models/message.js';
import Conversation from './models/conversation.js';

// Load environment variables
dotenv.config();

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully.'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Server Setup
const app = express();
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? "https://zubairchat.onrender.com" 
    : "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production'
      ? "https://zubairchat.onrender.com"
      : "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ['websocket', 'polling'],
  pingTimeout: 60000,
  pingInterval: 25000
});

// Helper Functions
const generateConversationId = (name1, name2) => [name1, name2].sort().join('-');

// API Endpoints
app.post('/api/validate-key', (req, res) => {
  const { key } = req.body;
  const ADMIN_ID = process.env.ADMIN_ID;

  if (key === ADMIN_ID) {
    return res.json({ role: 'admin', name: 'Zubair wani' });
  }

  if (friendKeys[key]) {
    const friendName = friendKeys[key];
    const conversationId = generateConversationId(friendName, 'Zubair wani');
    return res.json({
      role: 'friend',
      otherName: 'Zubair wani',
      name: friendName,
      conversationId,
    });
  }

  return res.status(404).json({ error: 'Invalid Key' });
});

app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = Object.values(friendKeys);
    const contactsWithUnread = await Promise.all(
      contacts.map(async (contactName) => {
        const conversationId = generateConversationId(contactName, 'Zubair wani');
        const conversation = await Conversation.findOne({ conversationId });
        const adminLastViewed = conversation?.adminLastViewedAt;
        
        const unreadCount = adminLastViewed
          ? await Message.countDocuments({ conversationId, createdAt: { $gt: adminLastViewed } })
          : await Message.countDocuments({ conversationId });

        return { name: contactName, conversationId, unreadCount };
      })
    );
    res.json(contactsWithUnread);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

app.get('/api/messages/:conversationId', async (req, res) => {
  try {
    const messages = await Message.find({ conversationId: req.params.conversationId })
      .sort({ createdAt: 'asc' });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

app.post('/api/conversations/mark-as-read', async (req, res) => {
  try {
    await Conversation.findOneAndUpdate(
      { conversationId: req.body.conversationId },
      { adminLastViewedAt: new Date() },
      { new: true, upsert: true }
    );
    res.status(200).send({ message: 'Marked as read' });
  } catch (error) {
    console.error('Error marking as read:', error);
    res.status(500).json({ error: 'Failed to mark as read' });
  }
});

// Socket.IO Logic
io.on('connection', (socket) => {
  console.log(`🔌 User connected: ${socket.id}`);

  socket.on('joinRoom', (conversationId) => {
    socket.join(conversationId);
    console.log(`User ${socket.id} joined room: ${conversationId}`);
  });
  
  
  socket.on('sendMessage', async (data) => {
  try {
    const newMessage = new Message(data);
    await newMessage.save();
    
    // 1. Send to the specific chat room
    io.to(data.conversationId).emit('newMessage', newMessage);
    
    // 2. ALSO send a notification event to all dashboard clients
    io.emit('messageNotification', {
      conversationId: data.conversationId,
      senderName: data.senderName,
      content: data.content
    });
    
  } catch (error) {
    console.error('Error saving message:', error);
  }
});

  socket.on('disconnect', () => {
    console.log(`❌ User disconnected: ${socket.id}`);
  });
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
  });
}

// Start Server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
