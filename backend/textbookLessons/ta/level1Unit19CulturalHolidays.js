const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ta', {
  slug: 'ta-l1u19',
  title: 'Level 1 · Unit 19: திருவிழாக்கள் மற்றும் மரபுகள் — Cultural Holidays',
  category: 'culture',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about Tamil festivals, greetings, and family customs.',
  vocabularyGoal: 'Use holiday, family, greeting, and tradition words.',
  grammarGoal: 'Use habitual present forms and future forms to describe customs and plans.',
  speakingGoal: 'Describe one festival, say what people usually do, and give an appropriate greeting.',
  task: 'Explain one Tamil festival to a visitor.',
  expressionPractice: [
    practice('naming-holiday', 'Naming holiday', 'Introduce one festival clearly.'),
    practice('describing-custom', 'Describing custom', 'Use one repeated action.'),
    practice('giving-greeting', 'Giving greeting', 'Use the formula that fits the occasion.'),
  ],
  relatedPools: ['topic-culture', 'topic-family'],
  items: [
    item('பொங்கல்', 'poṅkal', 'The major Tamil harvest festival, strongly tied to family, food, and agrarian gratitude.', 'பொங்கலில் குடும்பம் ஒன்று கூடுகிறது.', '“At Pongal the family gathers together.”'),
    item('தமிழ் புத்தாண்டு', 'tamiḻ puttāṇṭu', 'Tamil New Year, marked by greetings, temple visits, and festive meals.', 'தமிழ் புத்தாண்டு ஏப்ரலில் வருகிறது.', '“Tamil New Year comes in April.”'),
    item('தீபாவளி', 'tīpāvaḷi', 'Deepavali, associated with lights, sweets, new clothes, and family visits.', 'தீபாவளியில் புதிய உடை அணிவார்கள்.', '“At Deepavali people wear new clothes.”'),
    item('கோலம்', 'kōlam', 'Decorative threshold drawings, especially visible in daily and festive Tamil culture.', 'காலை கோலம் போடுகிறார்கள்.', '“In the morning they draw kolam.”'),
    item('வழக்கமாக', 'vaḻakkamāka', '“Usually.” A useful word for customs.', 'வழக்கமாக நாம் உறவினரைச் சந்திக்கிறோம்.', '“Usually we meet relatives.”'),
    item('கொண்டாட', 'koṇṭāṭa', '“To celebrate.” A central festival verb.', 'நீங்கள் எப்படி பொங்கல் கொண்டாடுகிறீர்கள்?', '“How do you celebrate Pongal?”'),
    item('இனிய பொங்கல் நல்வாழ்த்துகள்', 'iniya poṅkal nalvāḻttukaḷ', '“Happy Pongal wishes.” A holiday greeting formula.', 'இனிய பொங்கல் நல்வாழ்த்துகள்!', '“Happy Pongal!”'),
    item('மரபு', 'marapu', '“Tradition.” A useful bridge noun for cultural explanations.', 'இது ஒரு முக்கியமான மரபு.', '“This is an important tradition.”'),
  ],
});
