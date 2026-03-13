const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
  defaultIndex: {
    type: Number,
  },
  korean: String,
  romanization: String,
  english: String,
  audioUrl: String,
  // Translations of the 'english' field into each supported native language
  es: String,  // Spanish
  fr: String,  // French
  de: String,  // German
  zh: String,  // Chinese
  ja: String,  // Japanese
  hi: String,  // Hindi
  ar: String,  // Arabic
  he: String,  // Hebrew
  pt: String,  // Portuguese
  it: String,  // Italian
  nl: String,  // Dutch
  ru: String,  // Russian
  id: String,  // Indonesian
  ms: String,  // Malay
  fil: String, // Filipino
  tr: String,  // Turkish
  bn: String,  // Bengali
  ta: String,  // Tamil
  category: {
    type: [String],
    default: ['uncategorized'],
  },
  targetLang: {
    type: String,
    default: 'ko',
  },
  nativeLang: {
    type: String,
    default: 'en',
  },
  masteryLevel: {
    type: Number,
    default: 3,
    min: 1,
    max: 5,
  },
  correctCount: {
    type: Number,
    default: 0,
  },
  incorrectCount: {
    type: Number,
    default: 0,
  },
  lastReviewedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

flashcardSchema.index({ isDefault: 1, defaultIndex: 1 });

module.exports = mongoose.model('Flashcard', flashcardSchema);
