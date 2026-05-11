const mongoose = require('mongoose');

// A `Course` is one ordered track of class lessons. Levels 1, 2, and 3 each
// publish at least one Course; Level 2 publishes two (the adult-workplace
// track and the academic-thematic track). The Course owns the lesson
// ordering and the per-position metadata (foundation/unit/review). Lessons
// themselves stay generic — only the Course decides which lesson appears
// where in a learner's flow.
//
// See docs/curriculum/MERGED_SYLLABUS.md for the canonical track list.
const courseSchema = new mongoose.Schema({
  level: {
    type: Number,
    enum: [1, 2, 3],
    required: true,
  },
  track: {
    type: String,
    enum: ['foundation', 'adult', 'thematic', 'grammar'],
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
      enum: ['unit', 'review', 'foundation'],
      default: 'unit',
    },
  }],
  createdAt: { type: Date, default: Date.now },
});

// One course per level + track + targetLang combination.
courseSchema.index({ level: 1, track: 1, targetLang: 1 }, { unique: true });

module.exports = mongoose.model('Course', courseSchema);
