const mongoose = require('mongoose');

const institutionGroupSchema = new mongoose.Schema({
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 160,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 800,
    default: '',
  },
  allowedTargetLanguages: {
    type: [String],
    default: [],
  },
  defaultTargetLanguage: {
    type: String,
    trim: true,
    maxlength: 20,
    default: '',
  },
  status: {
    type: String,
    enum: ['active', 'archived'],
    default: 'active',
    index: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
}, {
  timestamps: true,
});

institutionGroupSchema.index({ organizationId: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('InstitutionGroup', institutionGroupSchema);
