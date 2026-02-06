const mongoose = require('mongoose');
const Lesson = require('./models/Lesson');
require('dotenv').config();

async function checkLessonContent() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const lessons = await Lesson.find({}).select('title category difficulty content');

    console.log('\n=== Lesson Content Count ===\n');

    const grouped = {};
    lessons.forEach(l => {
      if (!grouped[l.category]) grouped[l.category] = {};
      grouped[l.category][l.difficulty] = {
        title: l.title,
        count: l.content.length
      };
    });

    Object.keys(grouped).sort().forEach(cat => {
      console.log(`\n${cat.toUpperCase()}:`);
      ['beginner', 'intermediate', 'advanced'].forEach(diff => {
        if (grouped[cat][diff]) {
          const status = grouped[cat][diff].count >= 100 ? '✓' : '✗';
          console.log(`  ${diff}: ${status} ${grouped[cat][diff].count} exercises - ${grouped[cat][diff].title}`);
        } else {
          console.log(`  ${diff}: ✗ MISSING`);
        }
      });
    });

    const total = lessons.reduce((sum, l) => sum + l.content.length, 0);
    console.log(`\n\nTotal Lessons: ${lessons.length}`);
    console.log(`Total Exercises: ${total}`);

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkLessonContent();
