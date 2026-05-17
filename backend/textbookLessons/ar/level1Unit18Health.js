const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ar', {
  slug: 'ar-l1u18',
  title: 'Level 1 · Unit 18: الصحة — Health',
  category: 'health',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Describe simple symptoms, say what hurts, and ask for basic help.',
  vocabularyGoal: 'Use body-part, pain, fever, medicine, and doctor vocabulary.',
  grammarGoal: 'Use possessive body-part phrases and `عندي` for symptoms.',
  speakingGoal: 'Explain one symptom and understand one simple recommendation.',
  task: 'Roleplay a short clinic visit.',
  expressionPractice: [
    practice('describing-symptom', 'Describing a symptom', 'Use `عندي` plus the symptom.'),
    practice('saying-pain', 'Saying what hurts', 'Use a body-part phrase naturally.'),
    practice('asking-help', 'Asking for help', 'Ask for a doctor or medicine.'),
  ],
  relatedPools: ['topic-health', 'topic-body'],
  items: [
    item('الصحة', 'aṣ-ṣiḥḥa', '“Health.” The doubled consonant is audible and the noun is feminine.', 'الصحة مهمة.', '“Health is important.”'),
    item('عندي صداع', 'ʿindī ṣudāʿ', '“I have a headache.” Arabic often uses “at me” possession for symptoms.', 'عندي صداع منذ الصباح.', '“I have had a headache since morning.”'),
    item('حمى', 'ḥummā', '“Fever.” A common clinic word with a doubled consonant.', 'عندي حمى خفيفة.', '“I have a mild fever.”'),
    item('سعال', 'suʿāl', '“Cough.” Useful in basic health descriptions.', 'عندي سعال قوي.', '“I have a strong cough.”'),
    item('رأسي يؤلمني', 'raʾsī yuʾlimunī', '“My head hurts me.” The body part comes first, then the verb plus object pronoun.', 'بطني يؤلمني.', '“My stomach hurts.”'),
    item('طبيب / طبيبة', 'ṭabīb / ṭabība', '“Doctor” masculine / feminine. Gender agreement matters in service encounters.', 'أحتاج إلى طبيبة.', '“I need a female doctor.”'),
    item('دواء', 'dawāʾ', '“Medicine.” Useful with `آخذ` and pharmacy contexts.', 'هل عندك دواء للسعال؟', '“Do you have medicine for cough?”'),
    item('صيدلية', 'ṣaydaliyya', '“Pharmacy.” A practical place noun for urgent needs.', 'أين أقرب صيدلية؟', '“Where is the nearest pharmacy?”'),
    item('استرح', 'istariḥ', '“Rest.” A common masculine imperative in advice.', 'استرح واشرب الماء.', '“Rest and drink water.”'),
    item('منذ', 'mundhu', '“Since / for.” Useful for saying how long symptoms have lasted.', 'أنا مريض منذ يومين.', '“I have been sick for two days.”'),
  ],
});
