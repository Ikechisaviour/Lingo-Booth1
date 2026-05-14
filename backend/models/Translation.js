const mongoose = require('mongoose');

// Cached per-native-language translation of a Lesson document.
//
// Why this schema covers more than just `items`: class lessons keep their
// scaffolding (activities, expression-practice goals) in canonical English in
// the seed. Those fields are NEVER displayed raw to a non-English learner —
// they pass through this cache so every learner sees their own language.
// See AGENTS.md "Class Lesson Content Language" for the full rule.
const translationSchema = new mongoose.Schema(
  {
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson',
      required: true,
    },
    lang: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    title: { type: String, default: '' },
    // Per-content-item translations (1:1 with lesson.content by index).
    items: [
      {
        index: { type: Number, required: true },
        nativeText: { type: String, default: '' },
        exampleNative: { type: String, default: '' },
        romanization: { type: String, default: '' },
        exampleRomanization: { type: String, default: '' },
        breakdown: [
          {
            native: { type: String, default: '' },
          },
        ],
      },
    ],
    // Per-activity translations (1:1 with lesson.activities by index).
    // `id` is copied from the source activity so the overlay can match by id
    // even if activity order shifts in the seed later.
    activities: [
      {
        id: { type: String, default: '' },
        section: { type: String, default: '' },
        title: { type: String, default: '' },
        goals: [{ type: String, default: '' }],
        task: { type: String, default: '' },
      },
    ],
    // Per-expression-practice translations (1:1 with lesson.expressionPractice
    // by index). Same id-as-anchor pattern as activities.
    expressionPractice: [
      {
        id: { type: String, default: '' },
        label: { type: String, default: '' },
        goal: { type: String, default: '' },
      },
    ],
  },
  { timestamps: true }
);

translationSchema.index({ lessonId: 1, lang: 1 }, { unique: true });

module.exports = mongoose.model('Translation', translationSchema);
