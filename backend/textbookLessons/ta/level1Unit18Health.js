const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ta', {
  slug: 'ta-l1u18',
  title: 'Level 1 · Unit 18: உடல்நலம் — Health',
  category: 'health',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Describe simple symptoms, ask for help, and understand basic health advice.',
  vocabularyGoal: 'Use body-part, symptom, medicine, and clinic vocabulary.',
  grammarGoal: 'Use possession-like body expressions, `வேண்டும்`, and negative imperatives.',
  speakingGoal: 'Say what hurts, describe one symptom, and understand one instruction.',
  task: 'Explain a minor illness at a clinic or pharmacy.',
  expressionPractice: [
    practice('describing-symptom', 'Describing symptom', 'Use one body-part phrase.'),
    practice('asking-help', 'Asking help', 'Use `மருந்து வேண்டும்`.'),
    practice('understanding-advice', 'Understanding advice', 'Recognize one recommendation and one prohibition.'),
  ],
  relatedPools: ['topic-health', 'topic-service'],
  items: [
    item('எனக்கு தலைவலி', 'eṉakku talaivali', '“I have a headache.” Tamil often uses an experiencer frame with `எனக்கு`.', 'காலை முதல் எனக்கு தலைவலி.', '“I have had a headache since morning.”'),
    item('காய்ச்சல்', 'kāyccal', '“Fever.” A common clinic word.', 'எனக்கு காய்ச்சல் உள்ளது.', '“I have a fever.”'),
    item('இருமல்', 'irumal', '“Cough.” A practical symptom noun.', 'எனக்கு உலர் இருமல் உள்ளது.', '“I have a dry cough.”'),
    item('வயிற்றுவலி', 'vayiṟṟuvali', '“Stomachache.” A compound body-pain word.', 'உணவுக்குப் பிறகு வயிற்றுவலி உள்ளது.', '“I have stomach pain after eating.”'),
    item('மருந்து', 'maruntu', '“Medicine.” Useful in pharmacy talk.', 'சளிக்கான மருந்து வேண்டும்.', '“I need medicine for a cold.”'),
    item('மருத்துவர்', 'maruttuvar', '“Doctor.” A respectful professional noun.', 'மருத்துவரை பார்க்க வேண்டும்.', '“I need to see the doctor.”'),
    item('ஓய்வு எடுக்க வேண்டும்', 'ōyvu eṭukka vēṇṭum', '“You need to rest.” A common advice phrase.', 'இரண்டு நாள் ஓய்வு எடுக்க வேண்டும்.', '“You need to rest for two days.”'),
    item('காரம் சாப்பிடாதீர்கள்', 'kāram cāppiṭātīrkaḷ', '“Do not eat spicy food.” Polite negative imperative.', 'இன்று காரம் சாப்பிடாதீர்கள்.', '“Do not eat spicy food today.”'),
  ],
});
