const mongoose = require('mongoose');

const languagePairProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  targetLanguage: {
    type: String,
    required: true,
    maxlength: 20,
  },
  nativeLanguage: {
    type: String,
    required: true,
    maxlength: 20,
  },
  currentLevel: {
    type: String,
    enum: ['new', 'beginner', 'intermediate', 'advanced', 'unsure', ''],
    default: '',
  },
  primaryGoal: {
    type: String,
    enum: ['travel', 'work', 'school', 'dailyLife', 'conversation', 'family', 'religious', 'health', 'culture', 'exam', 'other', ''],
    default: '',
  },
  pace: {
    type: String,
    enum: ['light', 'steady', 'intensive', ''],
    default: '',
  },
  completedAt: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
});

languagePairProfileSchema.index(
  { userId: 1, targetLanguage: 1, nativeLanguage: 1 },
  { unique: true },
);

module.exports = mongoose.model('LanguagePairProfile', languagePairProfileSchema);
