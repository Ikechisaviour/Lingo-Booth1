const mongoose = require('mongoose');

const LEARNING_EVENT_TYPES = [
  'quiz_correct',
  'quiz_high_score',
  'flashcard_recall',
  'class_item_complete',
  'class_activity_complete',
  'class_lesson_complete',
  'conversation_turn',
  'roleplay_complete',
  'writing_complete',
  'speaking_practice_complete',
  'class_item_viewed',
  'saved_item_created',
  'saved_item_reviewed',
  'review_session_complete',
  'voice_played',
  'speech_input_used',
  'conversation_reply_failed',
  'tutor_reply_failed',
];

const learningEventSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  eventType: {
    type: String,
    enum: LEARNING_EVENT_TYPES,
    required: true,
    index: true,
  },
  dedupeKey: {
    type: String,
    required: true,
    maxlength: 240,
  },
  dayKey: {
    type: String,
    default: null,
    index: true,
  },
  pointsAwarded: {
    type: Number,
    default: 0,
    min: 0,
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  occurredAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

learningEventSchema.index(
  { userId: 1, eventType: 1, dedupeKey: 1 },
  { unique: true },
);

module.exports = mongoose.model('LearningEvent', learningEventSchema);
module.exports.LEARNING_EVENT_TYPES = LEARNING_EVENT_TYPES;
