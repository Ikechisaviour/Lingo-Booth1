const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  status: {
    type: String,
    enum: ['active', 'suspended'],
    default: 'active',
  },
  suspendedAt: {
    type: Date,
    default: null,
  },
  suspendReason: {
    type: String,
    default: null,
  },
  lastActive: {
    type: Date,
    default: Date.now,
  },
  totalTimeSpent: {
    type: Number, // in minutes
    default: 0,
  },
  loginCount: {
    type: Number,
    default: 0,
  },
  lastLogin: {
    type: Date,
    default: null,
  },
  lastActivityType: {
    type: String,
    enum: ['lesson', 'flashcard', null],
    default: null,
  },
  lastLessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    default: null,
  },
  lastLessonIndex: {
    type: Number,
    default: 0,
  },
  lastFlashcardIndex: {
    type: Number,
    default: 0,
  },
  preferredVoice: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);
