const mongoose = require('mongoose');
const Lesson = require('./models/Lesson');
require('dotenv').config();

async function verifySentences() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const sentences = await Lesson.find({ difficulty: 'sentences' });

    console.log('\n=== Sentences Difficulty Lessons ===\n');
    sentences.forEach(l => {
      console.log(`- ${l.category}: ${l.title} (${l.content.length} exercises)`);
    });
    console.log(`\nTotal: ${sentences.length} lessons with ${sentences.reduce((sum, l) => sum + l.content.length, 0)} exercises`);

    console.log('\n=== Sample from Greetings Sentences ===');
    const greetings = await Lesson.findOne({ category: 'greetings', difficulty: 'sentences' });
    if (greetings) {
      greetings.content.slice(0, 3).forEach((item, i) => {
        console.log(`${i+1}. ${item.korean} (${item.romanization})`);
        console.log(`   ${item.english}\n`);
      });
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

verifySentences();
