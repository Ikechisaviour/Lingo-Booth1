const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  category: {
    type: String,
    enum: ['account', 'institution', 'learning', 'system', 'billing'],
    default: 'system',
    index: true,
  },
  severity: {
    type: String,
    enum: ['info', 'success', 'warning', 'critical'],
    default: 'info',
  },
  type: {
    type: String,
    required: true,
    trim: true,
    maxlength: 120,
    index: true,
  },
  titleKey: {
    type: String,
    required: true,
    trim: true,
    maxlength: 180,
  },
  bodyKey: {
    type: String,
    required: true,
    trim: true,
    maxlength: 180,
  },
  params: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  action: {
    labelKey: { type: String, trim: true, maxlength: 180, default: '' },
    route: { type: String, trim: true, maxlength: 500, default: '' },
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    default: null,
    index: true,
  },
  actorUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  dedupeKey: {
    type: String,
    trim: true,
    maxlength: 240,
    default: '',
    index: true,
  },
  readAt: {
    type: Date,
    default: null,
    index: true,
  },
  archivedAt: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
});

notificationSchema.index({ userId: 1, readAt: 1, createdAt: -1 });
// Auto-purge archived (dismissed) notifications 365 days after they were archived.
// TTL indexes ignore documents whose field is not a date, so non-archived
// notifications (archivedAt: null) are never expired — only dismissed ones age out.
notificationSchema.index({ archivedAt: 1 }, { expireAfterSeconds: 365 * 24 * 60 * 60 });
notificationSchema.index(
  { userId: 1, dedupeKey: 1 },
  { unique: true, partialFilterExpression: { dedupeKey: { $type: 'string', $gt: '' } } },
);

module.exports = mongoose.model('Notification', notificationSchema);
