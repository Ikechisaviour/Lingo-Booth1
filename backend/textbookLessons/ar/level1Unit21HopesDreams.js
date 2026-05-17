const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ar', {
  slug: 'ar-l1u21',
  title: 'Level 1 · Unit 21: الآمال والأحلام — Hopes and Dreams',
  category: 'future',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about hopes, dreams, and future plans in simple but meaningful language.',
  vocabularyGoal: 'Use future, study, work, travel, and dream vocabulary.',
  grammarGoal: 'Use `أريد أن`, `أتمنى أن`, and the future prefix `سـ` for different future meanings.',
  speakingGoal: 'Describe one realistic plan and one longer-term dream.',
  task: 'Give a short future-self introduction.',
  expressionPractice: [
    practice('stating-plan', 'Stating a plan', 'Use future forms for intended action.'),
    practice('stating-hope', 'Stating a hope', 'Use `أتمنى أن` naturally.'),
    practice('stating-dream', 'Stating a dream', 'Describe a longer-term aspiration.'),
  ],
  relatedPools: ['topic-future', 'topic-goals'],
  items: [
    item('مستقبل', 'mustaqbal', '“Future.” A high-value abstract noun for goals and plans.', 'أفكر في مستقبلي.', '“I think about my future.”'),
    item('حلم', 'ḥulm', '“Dream.” It can be literal or aspirational depending on context.', 'حلمي أن أصبح طبيبًا.', '“My dream is to become a doctor.”'),
    item('أريد أن', 'urīdu an', '“I want to.” Useful for concrete personal aims.', 'أريد أن أتعلم العربية جيدًا.', '“I want to learn Arabic well.”'),
    item('أتمنى أن', 'atamannā an', '“I hope / wish that.” Softer and more aspirational than `أريد أن`.', 'أتمنى أن أزور المغرب.', '“I hope to visit Morocco.”'),
    item('سأعمل', 'saʾaʿmal', '“I will work.” The future prefix `سـ` attaches directly to the present verb.', 'سأعمل في شركة كبيرة.', '“I will work in a big company.”'),
    item('سأدرس', 'saʾadrus', '“I will study.” Useful for education plans.', 'سأدرس الهندسة في الجامعة.', '“I will study engineering at university.”'),
    item('أصبح', 'uṣbiḥ', '“I become.” Common in aspiration statements after `أن`.', 'أريد أن أصبح معلمًا.', '“I want to become a teacher.”'),
    item('إذا', 'idhā', '“If / when.” Useful for realistic conditions around goals.', 'إذا نجحت، سأحتفل مع عائلتي.', '“If I succeed, I will celebrate with my family.”'),
    item('فرصة', 'furṣa', '“Opportunity.” A practical future word, especially with travel or work.', 'إذا وجدت فرصة، سأعمل في الخارج.', '“If I find an opportunity, I will work abroad.”'),
    item('يومًا ما', 'yawman mā', '“One day.” A compact phrase for distant hopes.', 'يومًا ما سأكتب كتابًا.', '“One day I will write a book.”'),
  ],
});
