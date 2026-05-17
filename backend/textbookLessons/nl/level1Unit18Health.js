const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('nl', {
  slug: 'nl-l1u18',
  title: 'Level 1 · Unit 18: Gezondheid — Health',
  category: 'health',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Describe simple symptoms, ask for help, and understand basic advice.',
  vocabularyGoal: 'Use body-part, symptom, medicine, and clinic words.',
  grammarGoal: 'Use `ik heb`, `ik heb pijn aan`, and modal advice with `moeten`.',
  speakingGoal: 'Say what hurts, describe one symptom, and understand one instruction.',
  task: 'Explain a minor illness at a pharmacy or clinic.',
  expressionPractice: [
    practice('describing-symptom', 'Describing symptom', 'Use `ik heb` or `ik heb pijn aan`.'),
    practice('asking-help', 'Asking help', 'Use `ik heb ... nodig`.'),
    practice('understanding-advice', 'Understanding advice', 'Recognize one recommendation and one prohibition.'),
  ],
  relatedPools: ['topic-health', 'topic-service'],
  items: [
    item('ik heb hoofdpijn', 'ik hep HOHFT-peyn', '“I have a headache.” Dutch often compounds the body part and pain noun.', 'Ik heb sinds vanochtend hoofdpijn.', '“I have had a headache since this morning.”'),
    item('koorts', 'kohrts', '“Fever.” A common clinic word.', 'Ik heb hoge koorts.', '“I have a high fever.”'),
    item('hoest', 'hoost', '“Cough.” A common symptom noun.', 'Ik heb een droge hoest.', '“I have a dry cough.”'),
    item('buikpijn', 'BOYK-peyn', '“Stomachache.” Another useful compound.', 'Ik heb buikpijn na het eten.', '“I have stomach pain after eating.”'),
    item('medicijn', 'may-dee-SEYN', '“Medicine.” Practical in pharmacy talk.', 'Ik heb een medicijn tegen griep nodig.', '“I need medicine for the flu.”'),
    item('dokter', 'DOK-ter', '“Doctor.” A central service noun.', 'Ik moet naar de dokter.', '“I have to go to the doctor.”'),
    item('u moet rusten', 'y moot RUS-ten', '“You must rest.” A polite advice sentence.', 'U moet twee dagen rusten.', '“You must rest for two days.”'),
    item('eet geen pittig eten', 'ayt khayn PIT-tikh AY-ten', '“Do not eat spicy food.” Dutch often uses `geen` to negate nouns.', 'Eet vandaag geen pittig eten.', '“Do not eat spicy food today.”'),
  ],
});
