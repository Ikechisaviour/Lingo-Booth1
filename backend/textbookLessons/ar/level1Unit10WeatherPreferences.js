const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ar', {
  slug: 'ar-l1u10',
  title: 'Level 1 · Unit 10: الطقس — Weather and Preferences',
  category: 'weather',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Describe weather, seasons, and what kinds of weather you prefer.',
  vocabularyGoal: 'Use temperature, sky, rain, wind, and season words that appear in daily conversation.',
  grammarGoal: 'Use nominal sentences, `يكون`, and preference frames with `أحب` and `أفضل`.',
  speakingGoal: 'Describe today’s weather and compare it with the weather you prefer.',
  task: 'Give a short weather update and explain your favorite season.',
  expressionPractice: [
    practice('describing-weather', 'Describing weather', 'Use nominal weather sentences clearly.'),
    practice('stating-preference', 'Stating preference', 'Use `أحب` and `أفضل` with natural contrast.'),
    practice('comparing-seasons', 'Comparing seasons', 'Contrast heat, cold, and rain.'),
  ],
  relatedPools: ['topic-weather', 'topic-preferences'],
  items: [
    item('الطقس', 'aṭ-ṭaqs', '“Weather.” A masculine noun often used in nominal sentences without a verb in the present.', 'الطقس جميل اليوم.', '“The weather is nice today.”'),
    item('حار / بارد', 'ḥārr / bārid', '“Hot / cold.” Weather adjectives that also describe objects, so context matters.', 'الجو حار في الصيف.', '“The weather is hot in summer.”'),
    item('ممطر', 'mumṭir', '“Rainy.” A useful derived adjective built from the rain root.', 'اليوم ممطر.', '“Today is rainy.”'),
    item('مشمس', 'mushmis', '“Sunny.” Another derived weather adjective that lets learners notice root-and-pattern logic.', 'النهار مشمس.', '“The day is sunny.”'),
    item('عاصف', 'ʿāṣif', '“Windy / stormy.” It describes stronger weather than a gentle breeze.', 'الجو عاصف هذا المساء.', '“The weather is windy this evening.”'),
    item('الصيف / الشتاء', 'aṣ-ṣayf / ash-shitāʾ', '“Summer / winter.” Sun-letter assimilation is audible after the definite article.', 'أفضل الشتاء على الصيف.', '“I prefer winter to summer.”'),
    item('أحب', 'uḥibb', '“I like / love.” A direct preference verb that takes an object.', 'أحب المطر.', '“I like rain.”'),
    item('أفضل', 'ufaḍḍil', '“I prefer.” Use it when comparing choices rather than merely liking one thing.', 'أفضل الجو البارد.', '“I prefer cold weather.”'),
    item('درجة الحرارة', 'darajat al-ḥarāra', '“Temperature.” Literally “degree of heat,” a useful iḍāfa expression.', 'درجة الحرارة ثلاثون.', '“The temperature is thirty.”'),
    item('كيف الطقس؟', 'kayfa aṭ-ṭaqs?', '“How is the weather?” A compact question worth memorizing as a whole.', 'كيف الطقس عندكم؟', '“How is the weather where you are?”'),
  ],
});
