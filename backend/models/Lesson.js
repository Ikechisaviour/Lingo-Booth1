const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['daily-life', 'business', 'travel', 'greetings', 'food', 'shopping', 'healthcare'],
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'sentences'],
    default: 'beginner',
  },
  targetLang: {
    type: String,
    required: true,
  },
  nativeLang: {
    type: String,
    default: 'en',
  },
  content: [{
    type: {
      type: String,
      enum: ['word', 'sentence', 'conversation'],
      required: true,
    },
    // Generic language-agnostic fields
    targetText: String,
    romanization: String,
    nativeText: String,
    pronunciation: String,
    audioUrl: String,
    exampleTarget: String,
    exampleNative: String,
    breakdown: [{
      target: String,
      native: String,
      // Legacy fields
      korean: String,
      english: String,
    }],
    // Legacy Korean-English fields (kept for backward compatibility during migration)
    korean: String,
    english: String,
    example: String,
    exampleEnglish: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for efficient language-filtered queries
lessonSchema.index({ targetLang: 1, category: 1, difficulty: 1 });

// Virtual getters: resolve generic fields, falling back to legacy fields
lessonSchema.set('toJSON', { virtuals: false, transform: function(doc, ret) {
  if (ret.content) {
    ret.content = ret.content.map(item => {
      const obj = typeof item.toObject === 'function' ? item.toObject() : { ...item };
      // Populate generic fields from legacy if not set
      if (!obj.targetText && obj.korean) obj.targetText = obj.korean;
      if (!obj.nativeText && obj.english) obj.nativeText = obj.english;
      if (!obj.exampleTarget && obj.example) obj.exampleTarget = obj.example;
      if (!obj.exampleNative && obj.exampleEnglish) obj.exampleNative = obj.exampleEnglish;
      if (obj.breakdown) {
        obj.breakdown = obj.breakdown.map(b => {
          const bo = typeof b.toObject === 'function' ? b.toObject() : { ...b };
          if (!bo.target && bo.korean) bo.target = bo.korean;
          if (!bo.native && bo.english) bo.native = bo.english;
          return bo;
        });
      }
      return obj;
    });
  }
  return ret;
}});

module.exports = mongoose.model('Lesson', lessonSchema);
