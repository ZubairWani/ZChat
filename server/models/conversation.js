// Mongoose schema for conversation metadata, like unread status
import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
  conversationId: { type: String, required: true, unique: true },
  adminLastViewedAt: { type: Date },
}, { timestamps: true });

export default mongoose.model('Conversation', conversationSchema);
