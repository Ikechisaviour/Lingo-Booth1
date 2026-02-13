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
  content: [{
    type: {
      type: String,
      enum: ['word', 'sentence', 'conversation'],
      required: true,
    },
    korean: String,
    romanization: String,
    english: String,
    pronunciation: String,
    audioUrl: String,
    example: String,
    exampleEnglish: String,
    breakdown: [{
      korean: String,
      english: String,
    }],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Lesson', lessonSchema);
