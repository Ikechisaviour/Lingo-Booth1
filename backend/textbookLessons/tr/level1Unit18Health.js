const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('tr', {
  slug: 'tr-l1u18',
  title: 'Level 1 · Unit 18: Sağlık — Health',
  category: 'health',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Describe simple symptoms, ask for help, and understand basic health advice.',
  vocabularyGoal: 'Use body-part, symptom, medicine, and clinic words.',
  grammarGoal: 'Use possessive body-part expressions, `var`, and obligation forms in health talk.',
  speakingGoal: 'Say what hurts, describe one symptom, and understand one instruction.',
  task: 'Explain a minor illness at a pharmacy or clinic.',
  expressionPractice: [
    practice('describing-symptom', 'Describing symptom', 'Use one possessed body-part phrase.'),
    practice('asking-help', 'Asking help', 'Use `ilaç lazım`.'),
    practice('understanding-advice', 'Understanding advice', 'Recognize one recommendation and one prohibition.'),
  ],
  relatedPools: ['topic-health', 'topic-service'],
  items: [
    item('başım ağrıyor', 'ba-ŞIM ağ-rı-YOR', '“My head hurts.” The body part carries a first-person possessive suffix.', 'Sabahdan beri başım ağrıyor.', '“My head has hurt since morning.”'),
    item('ateşim var', 'a-TE-şim VAR', '“I have a fever.” Literally “my fever exists.”', 'Ateşim var ve çok yorgunum.', '“I have a fever and I am very tired.”'),
    item('öksürük', 'ök-sü-RÜK', '“Cough.” A common symptom noun.', 'Kuru öksürüğüm var.', '“I have a dry cough.”'),
    item('midem ağrıyor', 'mi-DEM ağ-rı-YOR', '“My stomach hurts.” Another body-part-plus-possessive pattern.', 'Yemekten sonra midem ağrıyor.', '“My stomach hurts after eating.”'),
    item('ilaç', 'i-LAÇ', '“Medicine.” Practical in pharmacy talk.', 'Grip için ilaç lazım.', '“Medicine is needed for the flu.”'),
    item('doktor', 'dok-TOR', '“Doctor.” A common profession noun.', 'Doktora gitmem gerekiyor.', '“I need to go to the doctor.”'),
    item('dinlenmelisiniz', 'din-len-me-Lİ-si-niz', '“You should rest.” A polite necessity form.', 'İki gün dinlenmelisiniz.', '“You should rest for two days.”'),
    item('acı yemeyin', 'a-CI ye-me-YİN', '“Do not eat spicy food.” A polite negative command.', 'Bugün acı yemeyin.', '“Do not eat spicy food today.”'),
  ],
});
