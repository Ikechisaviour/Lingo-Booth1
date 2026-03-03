const mongoose = require('mongoose');

const guestSessionSchema = new mongoose.Schema({
  // Identity
  ip:              { type: String, index: true },
  country:         { type: String, default: 'Unknown' },
  countryCode:     { type: String, default: '' },
  city:            { type: String, default: '' },

  // Language pair
  nativeLanguage:  { type: String, default: 'en' },
  targetLanguage:  { type: String, default: 'ko' },

  // Navigation
  pageViews:       { type: Number, default: 1 },
  lastActivity:    { type: String, default: 'home' }, // 'home' | 'flashcards' | 'lessons'

  // Engagement metrics
  timeSpent:       { type: Number, default: 0 },  // total seconds on site
  cardsStudied:    { type: Number, default: 0 },  // cards flipped / rated
  cardsCorrect:    { type: Number, default: 0 },
  cardsIncorrect:  { type: Number, default: 0 },
  lessonsViewed:   { type: Number, default: 0 },
  audioPlays:      { type: Number, default: 0 },  // TTS plays

  // Device & referral
  userAgent:       { type: String, default: '' },
  deviceType:      { type: String, default: 'unknown', enum: ['mobile', 'tablet', 'desktop', 'unknown'] },
  referrer:        { type: String, default: '' },

  // Outcome
  convertedToUser: { type: Boolean, default: false }, // true if they registered after this session

  // Timestamps
  firstSeen:       { type: Date, default: Date.now, index: true },
  lastSeen:        { type: Date, default: Date.now },
});

module.exports = mongoose.model('GuestSession', guestSessionSchema);
