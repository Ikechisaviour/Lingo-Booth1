const mongoose = require('mongoose');

const pronunciationSchema = new mongoose.Schema(
  {
    targetLang: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    nativeLang: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    targetText: {
      type: String,
      required: true,
    },
    normalizedTargetText: {
      type: String,
      required: true,
    },
    officialPronunciation: {
      type: String,
      default: '',
    },
    learnerPronunciation: {
      type: String,
      default: '',
    },
    pronunciationConfidence: {
      type: String,
      enum: ['strong', 'approximate', 'audioFirst'],
      default: 'audioFirst',
    },
    officialPronunciationSource: {
      type: String,
      enum: ['seeded', 'generated', 'spelling', 'fallback', 'missing'],
      default: 'missing',
    },
    learnerPronunciationSource: {
      type: String,
      enum: ['generated', 'same-as-official', 'fallback', 'missing'],
      default: 'missing',
    },
    error: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

pronunciationSchema.index(
  { targetLang: 1, nativeLang: 1, normalizedTargetText: 1 },
  { unique: true }
);
pronunciationSchema.index({ pronunciationConfidence: 1, updatedAt: -1 });

module.exports = mongoose.model('Pronunciation', pronunciationSchema);
