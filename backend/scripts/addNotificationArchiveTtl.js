/**
 * Migration: convert the notifications.archivedAt index into a TTL index so
 * archived (dismissed) notifications are auto-purged 365 days after archival.
 *
 * Existing deployments already have a plain `archivedAt_1` index (from the old
 * `index: true` field option). Mongoose autoIndex cannot change an existing
 * index's options in place — it would error with IndexOptionsConflict — so this
 * script drops the old index and recreates it with expireAfterSeconds.
 *
 * Idempotent: safe to run repeatedly. Run with:
 *   node scripts/addNotificationArchiveTtl.js
 */
require('dotenv').config();
const mongoose = require('mongoose');

const TTL_SECONDS = 365 * 24 * 60 * 60; // 365 days

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  const collection = mongoose.connection.collection('notifications');
  const indexes = await collection.indexes();
  const existing = indexes.find(
    (idx) => idx.key && idx.key.archivedAt === 1 && Object.keys(idx.key).length === 1,
  );

  if (existing && existing.expireAfterSeconds === TTL_SECONDS) {
    console.log(`Index "${existing.name}" already has the correct TTL (${TTL_SECONDS}s). Nothing to do.`);
  } else {
    if (existing) {
      console.log(`Dropping existing index "${existing.name}" (expireAfterSeconds=${existing.expireAfterSeconds ?? 'none'})`);
      await collection.dropIndex(existing.name);
    }
    await collection.createIndex({ archivedAt: 1 }, { expireAfterSeconds: TTL_SECONDS });
    console.log(`Created TTL index on archivedAt (expireAfterSeconds=${TTL_SECONDS}).`);
  }

  const cutoff = new Date(Date.now() - TTL_SECONDS * 1000);
  const alreadyExpired = await collection.countDocuments({ archivedAt: { $ne: null, $lt: cutoff } });
  console.log(`${alreadyExpired} archived notification(s) are older than 365 days and will be purged by the TTL monitor shortly.`);

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
