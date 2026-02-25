const mongoose = require('mongoose');
const Flashcard = require('./models/Flashcard');
const User = require('./models/User');
const flashcardData = require('./flashcardData');
require('dotenv').config();

async function seedFlashcards() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Get users
    const users = await User.find();

    if (users.length === 0) {
      console.log('\n⚠️  No users found. Please register a user first.');
      console.log('You can register a user by:');
      console.log('1. Starting the backend: npm run dev');
      console.log('2. Starting the frontend: npm start');
      console.log('3. Registering at http://localhost:3000/register');
      console.log('\nThen run this script again.');
      process.exit(0);
    }

    console.log(`\nFound ${users.length} user(s)`);
    console.log(`Preparing to create ${flashcardData.length} flashcards...`);

    // Use the first user
    const user = users[0];

    // Clear existing flashcards for this user
    await Flashcard.deleteMany({ userId: user._id });
    console.log('Cleared existing flashcards');

    // Create flashcards with varied mastery levels
    const flashcardsToInsert = flashcardData.map((card, index) => {
      // Create varied mastery levels for more realistic data
      let masteryLevel = 0;
      let correctCount = 0;
      let incorrectCount = 0;
      let lastReviewedAt = null;

      // Assign mastery levels with distribution
      const rand = Math.random();
      if (rand > 0.85) {
        // 15% mastered
        masteryLevel = 5;
        correctCount = Math.floor(Math.random() * 20) + 10;
        incorrectCount = Math.floor(Math.random() * 3);
        lastReviewedAt = new Date(Date.now() - Math.random() * 2 * 24 * 60 * 60 * 1000);
      } else if (rand > 0.65) {
        // 20% advanced
        masteryLevel = 4;
        correctCount = Math.floor(Math.random() * 15) + 5;
        incorrectCount = Math.floor(Math.random() * 5);
        lastReviewedAt = new Date(Date.now() - Math.random() * 3 * 24 * 60 * 60 * 1000);
      } else if (rand > 0.40) {
        // 25% intermediate
        masteryLevel = 3;
        correctCount = Math.floor(Math.random() * 10) + 3;
        incorrectCount = Math.floor(Math.random() * 7) + 2;
        lastReviewedAt = new Date(Date.now() - Math.random() * 5 * 24 * 60 * 60 * 1000);
      } else if (rand > 0.20) {
        // 20% beginner
        masteryLevel = Math.floor(Math.random() * 2) + 1;
        correctCount = Math.floor(Math.random() * 5);
        incorrectCount = Math.floor(Math.random() * 10) + 2;
        lastReviewedAt = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000);
      }
      // 20% completely new (no mastery)

      return {
        userId: user._id,
        korean: card.korean,
        english: card.english,
        romanization: card.romanization,
        category: card.category,
        masteryLevel: masteryLevel,
        correctCount: correctCount,
        incorrectCount: incorrectCount,
        lastReviewedAt: lastReviewedAt,
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random date within last 30 days
      };
    });

    // Insert flashcards in batches for better performance
    const batchSize = 100;
    let inserted = 0;

    for (let i = 0; i < flashcardsToInsert.length; i += batchSize) {
      const batch = flashcardsToInsert.slice(i, i + batchSize);
      await Flashcard.insertMany(batch);
      inserted += batch.length;
      console.log(`Progress: ${inserted}/${flashcardsToInsert.length} flashcards inserted`);
    }

    console.log(`\n✅ Successfully inserted ${inserted} flashcards!`);

    // Show statistics
    const categoryStats = {};
    flashcardData.forEach(card => {
      const cats = Array.isArray(card.category) ? card.category : [card.category || 'uncategorized'];
      cats.forEach(cat => {
        categoryStats[cat] = (categoryStats[cat] || 0) + 1;
      });
    });

    console.log('\n=== Category Breakdown (cards may appear in multiple) ===');
    Object.entries(categoryStats)
      .sort((a, b) => b[1] - a[1])
      .forEach(([category, count]) => {
        console.log(`${category}: ${count} words`);
      });

    console.log('\n=== Mastery Level Distribution ===');
    const masteryStats = {
      'Level 0 (New)': flashcardsToInsert.filter(f => f.masteryLevel === 0).length,
      'Level 1-2 (Beginner)': flashcardsToInsert.filter(f => f.masteryLevel >= 1 && f.masteryLevel <= 2).length,
      'Level 3 (Intermediate)': flashcardsToInsert.filter(f => f.masteryLevel === 3).length,
      'Level 4 (Advanced)': flashcardsToInsert.filter(f => f.masteryLevel === 4).length,
      'Level 5 (Mastered)': flashcardsToInsert.filter(f => f.masteryLevel === 5).length,
    };

    Object.entries(masteryStats).forEach(([level, count]) => {
      console.log(`${level}: ${count} cards`);
    });

    console.log('\n✨ Flashcard seeding completed successfully!');
    console.log(`\nFlashcards created for user: ${user.username}`);
    console.log('You can now study with flashcards at: http://localhost:3000/flashcards');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding flashcards:', error);
    process.exit(1);
  }
}

seedFlashcards();
