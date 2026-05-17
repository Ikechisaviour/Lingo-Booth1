const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('id', {
  slug: 'id-l1u18',
  title: 'Level 1 · Unit 18: Kesehatan — Health',
  category: 'health',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Describe simple symptoms, ask for help, and understand basic health advice.',
  vocabularyGoal: 'Use body-part, symptom, medicine, and clinic vocabulary.',
  grammarGoal: 'Use `sakit`, `demam`, `harus`, and `jangan` to describe problems and give basic advice.',
  speakingGoal: 'Say what hurts, describe one symptom, and understand one instruction.',
  task: 'Explain a minor illness at a clinic or pharmacy.',
  expressionPractice: [
    practice('describing-symptom', 'Describing symptom', 'Use one body part plus one symptom.'),
    practice('asking-help', 'Asking for help', 'Use `saya perlu` or `tolong`.'),
    practice('understanding-advice', 'Understanding advice', 'Recognize `harus` and `jangan`.'),
  ],
  relatedPools: ['topic-health', 'topic-service'],
  items: [
    item('sakit kepala', 'sakit kepala', '“Headache.” `Sakit` combines easily with a body part to name pain.', 'Saya sakit kepala sejak pagi.', '“I have had a headache since morning.”'),
    item('demam', 'demam', '“Fever.” This is a common symptom noun in clinic talk.', 'Anak saya demam tinggi.', '“My child has a high fever.”'),
    item('batuk', 'batuk', '“Cough.” It can function as noun or verb in conversation.', 'Saya batuk sejak kemarin.', '“I have been coughing since yesterday.”'),
    item('perut', 'perut', '“Stomach / belly.” Useful in many ordinary health complaints.', 'Perut saya sakit.', '“My stomach hurts.”'),
    item('obat', 'obat', '“Medicine.” This broad noun covers tablets, syrup, and other remedies.', 'Saya perlu obat flu.', '“I need cold medicine.”'),
    item('dokter', 'dokter', '“Doctor.” The profession word is familiar but still central in practical language.', 'Saya mau bertemu dokter.', '“I want to see a doctor.”'),
    item('harus istirahat', 'harus istirahat', '“Must rest.” `Harus` gives strong advice or obligation.', 'Anda harus istirahat dua hari.', '“You must rest for two days.”'),
    item('jangan makan pedas', 'jangan makan pedas', '“Do not eat spicy food.” `Jangan` is the ordinary negative command marker.', 'Jangan makan pedas dulu.', '“Do not eat spicy food for now.”'),
    item('sejak kapan?', 'sejak kapan', '“Since when?” A standard medical-history question.', 'Batuknya sejak kapan?', '“Since when has the cough been happening?”'),
    item('lebih baik', 'lebih baik', '“Better.” It is useful both for recovery and gentle advice.', 'Hari ini saya sudah lebih baik.', '“Today I am already better.”'),
  ],
});
