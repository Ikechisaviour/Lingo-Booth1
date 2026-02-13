const mongoose = require('mongoose');

const answeredQuestionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // For lesson questions
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
  },
  contentIndex: {
    type: Number,
  },
  // For flashcards
  flashcardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flashcard',
  },
  answeredAt: {
    type: Date,
    default: Date.now,
  },
});

// Unique index for lesson answers — only applies when lessonId is an ObjectId (not null)
answeredQuestionSchema.index(
  { userId: 1, lessonId: 1, contentIndex: 1 },
  { unique: true, partialFilterExpression: { lessonId: { $type: 'objectId' } } }
);

// Unique index for flashcard answers — only applies when flashcardId is an ObjectId (not null)
answeredQuestionSchema.index(
  { userId: 1, flashcardId: 1 },
  { unique: true, partialFilterExpression: { flashcardId: { $type: 'objectId' } } }
);

module.exports = mongoose.model('AnsweredQuestion', answeredQuestionSchema);
