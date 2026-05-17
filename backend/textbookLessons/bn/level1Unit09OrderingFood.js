const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('bn', {
  slug: 'bn-l1u9',
  title: 'Level 1 · Unit 9: খাবার অর্ডার করা — Ordering Food',
  category: 'food',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Order food and drinks politely in a cafe or restaurant.',
  vocabularyGoal: 'Use food, drink, portion, and service words.',
  grammarGoal: 'Use `আমাকে ... দিন`, `ছাড়া`, and polite imperatives.',
  speakingGoal: 'Place a complete order, change one detail, and ask for the bill.',
  task: 'Roleplay ordering a simple meal.',
  expressionPractice: [
    practice('ordering-politely', 'Ordering politely', 'Use `আমাকে ... দিন`.'),
    practice('customizing', 'Customizing', 'Use `ছাড়া`.'),
    practice('closing-order', 'Closing order', 'Ask for the bill naturally.'),
  ],
  relatedPools: ['topic-food', 'topic-service'],
  items: [
    item('আমাকে এক কাপ চা দিন', 'amake ek kap cha din', '“Please give me one cup of tea.” The polite imperative suits service encounters.', 'আমাকে এক কাপ চা দিন।', '“Please give me one cup of tea.”'),
    item('এক প্লেট ভাত চাই', 'ek plet bhat chai', '“I want one plate of rice.” Serving nouns matter in food orders.', 'এক প্লেট ভাত চাই।', '“I want one plate of rice.”'),
    item('চিনি ছাড়া', 'chini chhara', '“Without sugar.” `ছাড়া` follows the item being removed.', 'চিনি ছাড়া চা দিন।', '“Please give tea without sugar.”'),
    item('কম ঝাল', 'kom jhal', '“Less spicy.” A very practical food phrase in Bengali contexts.', 'কম ঝাল তরকারি চাই।', '“I want less-spicy curry.”'),
    item('এখানে খাব', 'ekhane khabo', '“I will eat here.” A concise dine-in answer.', 'এখানে খাব, প্যাকেট নয়।', '“I will eat here, not takeaway.”'),
    item('প্যাকেট', 'packet', '“Takeaway / parcel.” A common loanword in restaurant settings.', 'এটা প্যাকেট করে দিন।', '“Please pack this to go.”'),
    item('আর কিছু?', 'ar kichhu', '“Anything else?” A common service question.', 'আর কিছু লাগবে?', '“Will you need anything else?”'),
    item('বিল দিন', 'bil din', '“Please give the bill.” A compact closing phrase.', 'বিল দিন, দয়া করে।', '“Please give the bill.”'),
  ],
});
