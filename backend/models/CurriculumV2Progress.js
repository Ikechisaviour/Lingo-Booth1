const mongoose = require('mongoose');

/**
 * Per-user progress for Curriculum v2. Kept separate from v1 progress
 * (Progress.js, ClassLessonProgress.js) so the two systems never collide
 * during the migration. Drop this collection when v2 fully replaces v1.
 */
const curriculumV2ProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
    index: true,
  },
  completedLessonIds: {
    type: [String],
    default: [],
  },
  completedConceptIds: {
    type: [String],
    default: [],
  },
  lastSessionAt: Date,
}, { timestamps: true });

module.exports = mongoose.model('CurriculumV2Progress', curriculumV2ProgressSchema);
