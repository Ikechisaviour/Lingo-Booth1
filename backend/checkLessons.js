const mongoose = require('mongoose');
const Lesson = require('./models/Lesson');
require('dotenv').config();

async function checkLessons() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const lessons = await Lesson.find({}).select('title category difficulty');

    const grouped = {};
    lessons.forEach(l => {
      if (!grouped[l.category]) grouped[l.category] = {};
      grouped[l.category][l.difficulty] = l.title;
    });

    console.log('\n=== Current Lessons by Category and Difficulty ===\n');
    Object.keys(grouped).sort().forEach(cat => {
      console.log(`\n${cat}:`);
      ['beginner', 'intermediate', 'advanced'].forEach(diff => {
        if (grouped[cat][diff]) {
          console.log(`  ${diff}: ✓ ${grouped[cat][diff]}`);
        } else {
          console.log(`  ${diff}: ✗ MISSING`);
        }
      });
    });

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkLessons();
