const mongoose = require('mongoose');

const conversationMemorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  sessionId: {
    type: String,
    required: true,
    maxlength: 120,
  },
  scenario: {
    type: String,
    default: '',
    maxlength: 500,
  },
  targetLanguage: {
    type: String,
    default: 'ko',
    maxlength: 20,
  },
  nativeLanguage: {
    type: String,
    default: 'en',
    maxlength: 20,
  },
  inputLanguage: {
    type: String,
    default: '',
    maxlength: 20,
  },
  difficulty: {
    type: String,
    default: 'casual beginner',
    maxlength: 80,
  },
  summary: {
    type: String,
    default: '',
    maxlength: 2500,
  },
  memory: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  lastTurns: {
    type: [{
      role: { type: String, enum: ['user', 'assistant'], required: true },
      content: { type: String, required: true, maxlength: 800 },
    }],
    default: [],
  },
}, {
  timestamps: true,
});

conversationMemorySchema.index({ userId: 1, sessionId: 1 }, { unique: true });
conversationMemorySchema.index({ updatedAt: -1 });

module.exports = mongoose.model('ConversationMemory', conversationMemorySchema);
