const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('bn', {
  slug: 'bn-l1u18',
  title: 'Level 1 · Unit 18: স্বাস্থ্য — Health',
  category: 'health',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Describe simple symptoms, ask for help, and understand basic health advice.',
  vocabularyGoal: 'Use body-part, symptom, medicine, and clinic vocabulary.',
  grammarGoal: 'Use experiencer phrases such as `আমার ... ব্যথা`, need phrases, and polite advice.',
  speakingGoal: 'Say what hurts, describe one symptom, and understand one instruction.',
  task: 'Explain a minor illness at a pharmacy or clinic.',
  expressionPractice: [
    practice('describing-symptom', 'Describing symptom', 'Use one pain or symptom phrase.'),
    practice('asking-help', 'Asking help', 'Use `ওষুধ দরকার`.'),
    practice('understanding-advice', 'Understanding advice', 'Recognize one recommendation and one prohibition.'),
  ],
  relatedPools: ['topic-health', 'topic-service'],
  items: [
    item('আমার মাথা ব্যথা', 'amar matha byatha', '“I have a headache.” Bengali often uses a possession-like experiencer phrase.', 'সকাল থেকে আমার মাথা ব্যথা।', '“I have had a headache since morning.”'),
    item('জ্বর', 'jor', '“Fever.” A common clinic word.', 'আমার জ্বর আছে।', '“I have a fever.”'),
    item('কাশি', 'kashi', '“Cough.” A practical symptom noun.', 'আমার শুকনো কাশি আছে।', '“I have a dry cough.”'),
    item('পেট ব্যথা', 'pet byatha', '“Stomachache.” A common compound complaint.', 'খাওয়ার পরে পেট ব্যথা।', '“I have stomach pain after eating.”'),
    item('ওষুধ', 'oshudh', '“Medicine.” Useful in pharmacy talk.', 'সর্দির ওষুধ দরকার।', '“I need medicine for a cold.”'),
    item('ডাক্তার', 'daktar', '“Doctor.” A central service noun.', 'আমার ডাক্তার দেখানো দরকার।', '“I need to see a doctor.”'),
    item('বিশ্রাম নিন', 'bishram nin', '“Take rest.” A polite advice phrase.', 'দুই দিন বিশ্রাম নিন।', '“Take rest for two days.”'),
    item('ঝাল খাবেন না', 'jhal khaben na', '“Do not eat spicy food.” Respectful negative advice.', 'আজ ঝাল খাবেন না।', '“Do not eat spicy food today.”'),
  ],
});
