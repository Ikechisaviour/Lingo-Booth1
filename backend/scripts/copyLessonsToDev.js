/**
 * copyLessonsToDev.js
 * Exports lessons from production MongoDB and imports into dev MongoDB.
 * Usage: node scripts/copyLessonsToDev.js
 */

const mongoose = require('mongoose');

const PROD_URI = process.env.PROD_MONGODB_URI;
const DEV_URI = process.env.DEV_MONGODB_URI;

if (!PROD_URI || !DEV_URI) {
  console.error('Set PROD_MONGODB_URI and DEV_MONGODB_URI env vars');
  process.exit(1);
}

async function copyLessons() {
  const prodConn = await mongoose.createConnection(PROD_URI).asPromise();
  const devConn = await mongoose.createConnection(DEV_URI).asPromise();

  console.log('Connected to both databases');

  const prodLessons = prodConn.collection('lessons');
  const devLessons = devConn.collection('lessons');

  const lessons = await prodLessons.find({}).toArray();
  console.log(`Found ${lessons.length} lessons in production`);

  if (lessons.length === 0) {
    console.log('No lessons to copy');
    process.exit(0);
  }

  // Clear existing lessons in dev
  await devLessons.deleteMany({});
  console.log('Cleared dev lessons');

  // Insert into dev
  await devLessons.insertMany(lessons);
  console.log(`Copied ${lessons.length} lessons to dev`);

  await prodConn.close();
  await devConn.close();
  process.exit(0);
}

copyLessons().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
