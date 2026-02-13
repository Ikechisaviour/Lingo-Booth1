const mongoose = require('mongoose');

const peekCooldownSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true,
  },
  contentIndex: {
    type: Number,
    required: true,
  },
  peekedAt: {
    type: Date,
    default: Date.now,
  },
});

// Auto-delete after 24 hours (86400 seconds)
peekCooldownSchema.index({ peekedAt: 1 }, { expireAfterSeconds: 86400 });
// Fast lookup
peekCooldownSchema.index({ userId: 1, lessonId: 1, contentIndex: 1 });

module.exports = mongoose.model('PeekCooldown', peekCooldownSchema);
