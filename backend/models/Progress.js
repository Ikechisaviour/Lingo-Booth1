const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
  },
  skillType: {
    type: String,
    enum: ['listening', 'speaking', 'reading', 'writing'],
    required: true,
  },
  category: String,
  score: {
    type: Number,
    min: 0,
    max: 100,
  },
  masteryStatus: {
    type: String,
    enum: ['struggling', 'learning', 'comfortable', 'mastered'],
    default: 'learning',
  },
  attemptCount: {
    type: Number,
    default: 0,
  },
  correctAttempts: {
    type: Number,
    default: 0,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Progress', progressSchema);
