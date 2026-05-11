const mongoose = require('mongoose');

// A `VocabPool` is a reusable bank of vocabulary the AI tutor can pull from
// on demand. Pools are NOT lesson curriculum — they're reference dictionaries
// (e.g. topic-health, pos-idioms, kiip-level-2). Lessons reference pools
// via Lesson.relatedPools[]; the AI brief surfaces the pool *keys* in every
// turn, but the pool *contents* are only fetched when the tutor decides the
// learner needs additional vocabulary.
//
// See docs/curriculum/MERGED_SYLLABUS.md for the canonical pool catalog.
const vocabPoolSchema = new mongoose.Schema({
  // Stable slug used in Lesson.relatedPools. Examples:
  //   topic-health, pos-idioms, kiip-level-2, srs-day50-nouns
  key: { type: String, required: true, unique: true },
  title: String,
  description: String,
  // Attribution / provenance, e.g. "Book 2B ch.3" or "Book 3B ch.16".
  source: String,
  language: { type: String, default: 'ko' },
  items: [{
    target: { type: String, required: true },
    romanization: String,
    native: String,
    type: {
      type: String,
      enum: ['word', 'phrase', 'idiom', 'proverb', 'hanja', 'mimetic'],
      default: 'word',
    },
    notes: String,
  }],
  createdAt: { type: Date, default: Date.now },
});

vocabPoolSchema.index({ language: 1, key: 1 });

module.exports = mongoose.model('VocabPool', vocabPoolSchema);
