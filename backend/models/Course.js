const mongoose = require('mongoose');

// A `Course` is one ordered track of class lessons. The learner-facing product
// exposes four levels; legacy seeded course rows may still use the older
// textbook grouping, so route helpers normalize them through learningArchitecture.
// The Course owns the lesson
// ordering and the per-position metadata (foundation/unit/review). Lessons
// themselves stay generic — only the Course decides which lesson appears
// where in a learner's flow.
//
// See docs/curriculum/MERGED_SYLLABUS.md for the canonical track list.
const courseSchema = new mongoose.Schema({
  level: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: true,
  },
  track: {
    type: String,
    enum: ['foundation', 'survival', 'everyday', 'bridge', 'thematic', 'independent', 'professional', 'advanced', 'adult', 'grammar'],
    required: true,
  },
  title: { type: String, required: true },
  description: String,
  // Target language the course teaches (matches Lesson.targetLang).
  targetLang: { type: String, default: 'ko' },
  lessons: [{
    position: { type: Number, required: true },
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson',
      required: true,
    },
    kind: {
      type: String,
      enum: ['unit', 'review', 'foundation', 'branch', 'checkpoint', 'repair'],
      default: 'unit',
    },
    lessonRole: {
      type: String,
      enum: ['core', 'branch', 'checkpoint', 'repair'],
    },
    branchType: String,
    lessonWeight: {
      type: Number,
      enum: [1, 2, 3],
    },
    checkpointType: String,
    repairFocus: [String],
    longActivityTypes: [String],
    manifestSource: String,
    programLevelNameKey: String,
    programLevelDescriptionKey: String,
    unitOrder: Number,
    sequenceOrder: Number,
    requiredForProgress: Boolean,
    skillFocus: [String],
    prerequisiteConcepts: [String],
    teachesConcepts: [String],
    reviewsConcepts: [String],
    certificateEligible: Boolean,
  }],
  createdAt: { type: Date, default: Date.now },
});

// One course per level + track + targetLang combination.
courseSchema.index({ level: 1, track: 1, targetLang: 1 }, { unique: true });

module.exports = mongoose.model('Course', courseSchema);
