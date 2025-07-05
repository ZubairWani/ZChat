// Mongoose schema for a single chat message
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  conversationId: { type: String, required: true, index: true },
  senderName: { type: String, required: true },
  content: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Message', messageSchema);
