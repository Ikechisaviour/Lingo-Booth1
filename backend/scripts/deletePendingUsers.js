/**
 * One-time script to delete users stuck awaiting email verification.
 * Run with: node scripts/deletePendingUsers.js
 */
require('dotenv').config();
const mongoose = require('mongoose');

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  const result = await mongoose.connection.collection('users').deleteMany({
    emailVerified: false,
  });

  console.log(`Deleted ${result.deletedCount} pending user(s)`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
