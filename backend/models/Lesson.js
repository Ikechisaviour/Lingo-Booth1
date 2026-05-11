const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['daily-life', 'business', 'travel', 'greetings', 'food', 'shopping', 'healthcare', 'career'],
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'sentences'],
    default: 'beginner',
  },
  // Routing flag for the learner UI:
  //   'textbook' — appears on the /class page (AI-tutor walkthrough).
  //   'practice' — appears on /lessons (quiz) and /flashcards (drill).
  // Default 'practice' keeps every lesson seeded before this field landed
  // visible in the exercise area, exactly where it was before.
  track: {
    type: String,
    enum: ['textbook', 'practice'],
    default: 'practice',
  },
  // What kind of textbook lesson this is. Drives ClassLessonPage rendering
  // and AI-tutor directives. See docs/curriculum/MERGED_SYLLABUS.md for the
  // full taxonomy.
  //   foundation — Hangul/script foundations (no full activity grid)
  //   thematic   — full 10-column scope (the Level 2 main-book shape)
  //   workplace  — adult/migrant-worker functional units
  //   grammar    — single grammar pattern or pattern cluster (Level 3)
  //   review     — cumulative review pulling from earlier units (복습)
  lessonType: {
    type: String,
    enum: ['foundation', 'thematic', 'workplace', 'grammar', 'review'],
    default: 'thematic',
  },
  // Functional language goals from the workbook's "Expression Practice"
  // (표현 연습) column. A unit may declare 1+ goals; the AI tutor surfaces
  // each as a sub-mode of Speaking. Empty = no expression-practice drills.
  //   id    — stable slug, e.g. 'seeking-advice'
  //   label — short user-facing label
  //   goal  — longer description of what the learner should produce
  expressionPractice: [{
    id: { type: String, required: true },
    label: String,
    goal: String,
  }],
  // For review lessons (lessonType === 'review'): the source units this
  // review consolidates. Empty for non-review lessons.
  reviewOf: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
  }],
  // Keys of `VocabPool` documents the AI tutor may pull additional
  // vocabulary from on demand. The brief surfaces the keys, not the pool
  // contents (the pool is fetched only when the tutor decides it needs more
  // words than the lesson itself contains).
  relatedPools: [String],
  targetLang: {
    type: String,
    required: true,
  },
  nativeLang: {
    type: String,
    default: 'en',
  },
  // Optional: textbook-style activity tracks (Speaking, Reading and Speaking, Vocabulary, Grammar, etc.)
  // When present, ClassLessonPage shows these as the agenda and filters content by activityIds.
  activities: [{
    id: { type: String, required: true },
    section: String,
    title: String,
    goals: [String],
    task: String,
  }],
  content: [{
    type: {
      type: String,
      enum: ['word', 'sentence', 'conversation'],
      required: true,
    },
    // Activity tags — which lesson activities this item supports. Empty/missing = available in all.
    activityIds: [String],
    // Generic language-agnostic fields
    targetText: String,
    romanization: String,
    officialPronunciation: String,
    learnerPronunciation: String,
    pronunciationConfidence: {
      type: String,
      enum: ['strong', 'approximate', 'audioFirst'],
    },
    officialPronunciationSource: String,
    learnerPronunciationSource: String,
    nativeText: String,
    conceptId: String,
    conceptGloss: String,
    usage: mongoose.Schema.Types.Mixed,
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
