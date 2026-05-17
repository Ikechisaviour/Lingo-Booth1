const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ta', {
  slug: 'ta-l1u5',
  title: 'Level 1 · Unit 5: தமிழ்நாட்டில் வாழ்க்கை — Life in Tamil Nadu',
  category: 'culture',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Describe everyday life in Tamil Nadu through food, city life, family, and language register.',
  vocabularyGoal: 'Use culture, food, city, and family words tied to daily Tamil life.',
  grammarGoal: 'Notice respectful plural forms and the gap between formal written Tamil and everyday spoken Tamil.',
  speakingGoal: 'Describe one feature of Tamil daily life and compare it with your own.',
  task: 'Introduce daily life in Tamil Nadu to a visiting friend.',
  expressionPractice: [
    practice('describing-place', 'Describing place', 'Use one city or culture noun.'),
    practice('describing-routine', 'Describing routine', 'Use one food or family expression.'),
    practice('noticing-register', 'Noticing register', 'Recognize one respectful form.'),
  ],
  relatedPools: ['topic-culture', 'topic-city'],
  items: [
    item('தமிழ்நாடு', 'tamiḻnāḍu', '“Tamil Nadu.” The name literally means “Tamil land,” and regional identity is central to the language.', 'தமிழ்நாட்டில் தமிழ் பேசுகிறார்கள்.', '“People speak Tamil in Tamil Nadu.”'),
    item('சென்னை', 'ceṉṉai', '“Chennai.” The state capital and a practical urban anchor for beginner examples.', 'சென்னை பெரிய நகரம்.', '“Chennai is a big city.”'),
    item('சாப்பாடு', 'cāppāḍu', '“Meal / food.” It is a core everyday noun, especially in South Indian mealtime talk.', 'எனக்கு தமிழ் சாப்பாடு பிடிக்கும்.', '“I like Tamil food.”'),
    item('காலை காபி', 'kālai kāpi', '“Morning coffee.” Filter coffee is a real daily-life touchstone in many Tamil households.', 'காலை காபி மிகவும் பிரபலமானது.', '“Morning coffee is very popular.”'),
    item('குடும்பம்', 'kuṭumpam', '“Family.” Family terms and respect markers matter heavily in Tamil interaction.', 'என் குடும்பம் சென்னைலில் இருக்கிறது.', '“My family is in Chennai.”'),
    item('நீங்கள்', 'nīṅkaḷ', 'Respectful “you.” The plural form also serves as the polite singular address.', 'நீங்கள் எப்படி இருக்கிறீர்கள்?', '“How are you?” polite.'),
    item('பேச்சுத்தமிழ்', 'pēccuttamiḻ', '“Spoken Tamil.” Learners need to know that everyday speech differs from formal written forms.', 'பேச்சுத்தமிழ் மற்றும் எழுத்துத்தமிழ் வேறுபடும்.', '“Spoken Tamil and written Tamil differ.”'),
    item('மிகவும்', 'mikavum', '“Very.” A useful intensifier in descriptive sentences.', 'இந்த நகரம் மிகவும் பிஸியாக உள்ளது.', '“This city is very busy.”'),
  ],
});
