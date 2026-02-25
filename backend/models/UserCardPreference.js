const mongoose = require('mongoose');

const userCardPreferenceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  cardId: {
    type: String,
    required: true,
  },
  masteryLevel: {
    type: Number,
    default: 3,
    min: 1,
    max: 5,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userCardPreferenceSchema.index({ userId: 1, cardId: 1 }, { unique: true });

module.exports = mongoose.model('UserCardPreference', userCardPreferenceSchema);
