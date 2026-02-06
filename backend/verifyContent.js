const mongoose = require('mongoose');
const Lesson = require('./models/Lesson');
require('dotenv').config();

async function verifyContent() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const shoppingInt = await Lesson.findOne({ category: 'shopping', difficulty: 'intermediate' });

    console.log('\n=== Shopping Intermediate - Sample Content ===');
    console.log('First 5 items:');
    shoppingInt.content.slice(0, 5).forEach((item, i) => {
      console.log(`${i+1}. ${item.korean} (${item.romanization}) - ${item.english}`);
    });

    const foodAdv = await Lesson.findOne({ category: 'food', difficulty: 'advanced' });

    console.log('\n=== Food Advanced - Sample Content ===');
    console.log('First 5 items:');
    foodAdv.content.slice(0, 5).forEach((item, i) => {
      console.log(`${i+1}. ${item.korean} (${item.romanization}) - ${item.english}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

verifyContent();
