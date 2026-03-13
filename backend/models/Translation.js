const mongoose = require('mongoose');

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
  },
  { timestamps: true }
);

translationSchema.index({ lessonId: 1, lang: 1 }, { unique: true });

module.exports = mongoose.model('Translation', translationSchema);
