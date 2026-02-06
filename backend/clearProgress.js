const mongoose = require('mongoose');
const Progress = require('./models/Progress');
require('dotenv').config();

async function clearProgress() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear all progress records
    const result = await Progress.deleteMany({});
    console.log(`\n✅ Successfully deleted ${result.deletedCount} progress records`);

    console.log('\n✨ Progress data cleared!');
    console.log('\nYour progress will now track only your actual learning:');
    console.log('- Complete lessons to track reading progress');
    console.log('- Study flashcards to track vocabulary mastery');
    console.log('- All progress will be recorded automatically as you learn');

    process.exit(0);
  } catch (error) {
    console.error('Error clearing progress:', error);
    process.exit(1);
  }
}

clearProgress();
