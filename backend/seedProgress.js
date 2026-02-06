const mongoose = require('mongoose');
const Progress = require('./models/Progress');
const User = require('./models/User');
const Lesson = require('./models/Lesson');
require('dotenv').config();

// Sample progress data generator
async function seedProgress() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Get users and lessons
    const users = await User.find();
    const lessons = await Lesson.find();

    if (users.length === 0) {
      console.log('\n⚠️  No users found. Please register a user first.');
      console.log('You can register a user by:');
      console.log('1. Starting the backend: npm run dev');
      console.log('2. Starting the frontend: npm start');
      console.log('3. Registering at http://localhost:3000/register');
      console.log('\nThen run this script again.');
      process.exit(0);
    }

    if (lessons.length === 0) {
      console.log('⚠️  No lessons found. Please run the seed.js script first.');
      process.exit(0);
    }

    console.log(`\nFound ${users.length} user(s) and ${lessons.length} lessons`);

    // Clear existing progress
    await Progress.deleteMany({});
    console.log('Cleared existing progress records');

    // Create sample progress for the first user
    const user = users[0];
    const progressRecords = [];

    // Categories from lessons
    const categories = ['greetings', 'daily-life', 'food', 'travel', 'shopping', 'business', 'healthcare'];
    const skills = ['listening', 'speaking', 'reading', 'writing'];

    // Generate varied progress records
    lessons.forEach((lesson, index) => {
      skills.forEach(skill => {
        // Vary scores to create different mastery statuses
        let score;
        let masteryStatus;
        let attemptCount = Math.floor(Math.random() * 10) + 1;
        let correctAttempts;

        // Create a mix of mastery levels
        const rand = Math.random();
        if (rand > 0.7) {
          // Mastered (30%)
          score = 90 + Math.floor(Math.random() * 10);
          masteryStatus = 'mastered';
          correctAttempts = Math.floor(attemptCount * 0.9);
        } else if (rand > 0.5) {
          // Comfortable (20%)
          score = 70 + Math.floor(Math.random() * 20);
          masteryStatus = 'comfortable';
          correctAttempts = Math.floor(attemptCount * 0.75);
        } else if (rand > 0.2) {
          // Learning (30%)
          score = 50 + Math.floor(Math.random() * 20);
          masteryStatus = 'learning';
          correctAttempts = Math.floor(attemptCount * 0.6);
        } else {
          // Struggling (20%)
          score = 20 + Math.floor(Math.random() * 30);
          masteryStatus = 'struggling';
          correctAttempts = Math.floor(attemptCount * 0.4);
        }

        progressRecords.push({
          userId: user._id,
          lessonId: lesson._id,
          skillType: skill,
          category: lesson.category,
          score: score,
          masteryStatus: masteryStatus,
          attemptCount: attemptCount,
          correctAttempts: correctAttempts,
          timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Random time in last 7 days
        });
      });
    });

    // Add some category-based progress without specific lessons
    categories.forEach(category => {
      skills.forEach(skill => {
        const rand = Math.random();
        if (rand > 0.6) { // 40% chance to create additional progress
          let score;
          let masteryStatus;
          let attemptCount = Math.floor(Math.random() * 5) + 1;
          let correctAttempts;

          if (rand > 0.85) {
            score = 90 + Math.floor(Math.random() * 10);
            masteryStatus = 'mastered';
            correctAttempts = Math.floor(attemptCount * 0.9);
          } else if (rand > 0.75) {
            score = 70 + Math.floor(Math.random() * 20);
            masteryStatus = 'comfortable';
            correctAttempts = Math.floor(attemptCount * 0.75);
          } else if (rand > 0.65) {
            score = 50 + Math.floor(Math.random() * 20);
            masteryStatus = 'learning';
            correctAttempts = Math.floor(attemptCount * 0.6);
          } else {
            score = 20 + Math.floor(Math.random() * 30);
            masteryStatus = 'struggling';
            correctAttempts = Math.floor(attemptCount * 0.4);
          }

          progressRecords.push({
            userId: user._id,
            skillType: skill,
            category: category,
            score: score,
            masteryStatus: masteryStatus,
            attemptCount: attemptCount,
            correctAttempts: correctAttempts,
            timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
          });
        }
      });
    });

    // Insert all progress records
    const inserted = await Progress.insertMany(progressRecords);
    console.log(`\n✅ Successfully inserted ${inserted.length} progress records`);

    // Show summary
    const summary = {
      mastered: inserted.filter(p => p.masteryStatus === 'mastered').length,
      comfortable: inserted.filter(p => p.masteryStatus === 'comfortable').length,
      learning: inserted.filter(p => p.masteryStatus === 'learning').length,
      struggling: inserted.filter(p => p.masteryStatus === 'struggling').length,
    };

    console.log('\n=== Progress Summary ===');
    console.log(`🟢 Mastered: ${summary.mastered}`);
    console.log(`🟡 Comfortable: ${summary.comfortable}`);
    console.log(`🔵 Learning: ${summary.learning}`);
    console.log(`🔴 Struggling: ${summary.struggling}`);

    console.log('\n=== Skills Breakdown ===');
    skills.forEach(skill => {
      const skillProgress = inserted.filter(p => p.skillType === skill);
      const avgScore = skillProgress.reduce((sum, p) => sum + p.score, 0) / skillProgress.length;
      console.log(`${skill}: ${skillProgress.length} records, avg score: ${avgScore.toFixed(1)}%`);
    });

    console.log('\n✨ Progress seeding completed successfully!');
    console.log(`\nProgress data created for user: ${user.username}`);
    console.log('You can now view the progress page at: http://localhost:3000/progress');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding progress:', error);
    process.exit(1);
  }
}

seedProgress();
