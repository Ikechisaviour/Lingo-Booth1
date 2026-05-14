const mongoose = require('mongoose');

const institutionalLeadSchema = new mongoose.Schema({
  organizationName: {
    type: String,
    required: true,
    maxlength: 180,
    trim: true,
  },
  organizationType: {
    type: String,
    enum: ['school', 'company', 'church', 'language_center', 'nonprofit', 'government', 'other'],
    default: 'other',
  },
  contactName: {
    type: String,
    required: true,
    maxlength: 120,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    maxlength: 254,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    maxlength: 80,
  },
  planId: {
    type: String,
    default: 'institution_pro',
  },
  seatsRequested: {
    type: Number,
    default: 25,
    min: 1,
  },
  message: {
    type: String,
    maxlength: 5000,
  },
  status: {
    type: String,
    enum: ['open', 'contacted', 'converted', 'closed'],
    default: 'open',
    index: true,
  },
  source: {
    type: String,
    enum: ['web', 'mobile', 'admin'],
    default: 'web',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true,
  },
  deviceId: {
    type: String,
    maxlength: 160,
  },
  page: {
    type: String,
    maxlength: 500,
  },
  request: {
    ip: { type: String, maxlength: 80 },
    origin: { type: String, maxlength: 500 },
  },
}, {
  timestamps: true,
});

institutionalLeadSchema.index({ status: 1, createdAt: -1 });
institutionalLeadSchema.index({ email: 1, createdAt: -1 });

module.exports = mongoose.model('InstitutionalLead', institutionalLeadSchema);
