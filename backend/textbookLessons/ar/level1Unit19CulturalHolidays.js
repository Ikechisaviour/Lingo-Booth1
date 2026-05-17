const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ar', {
  slug: 'ar-l1u19',
  title: 'Level 1 · Unit 19: الأعياد والمناسبات — Holidays and Celebrations',
  category: 'culture',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about major holidays, greetings, visits, and celebration plans.',
  vocabularyGoal: 'Use holiday names, family-visit words, gift words, and greeting formulas.',
  grammarGoal: 'Use future plans and time expressions for upcoming celebrations.',
  speakingGoal: 'Describe one holiday and what people usually do during it.',
  task: 'Explain a celebration plan for a holiday visit.',
  expressionPractice: [
    practice('naming-holiday', 'Naming a holiday', 'Use the holiday name accurately.'),
    practice('giving-greeting', 'Giving a greeting', 'Choose a fitting formula.'),
    practice('describing-custom', 'Describing a custom', 'Say what people do during the holiday.'),
  ],
  relatedPools: ['topic-culture', 'topic-family'],
  items: [
    item('عيد', 'ʿīd', '“Holiday / festival.” The word appears in several major religious and national celebrations.', 'عيد سعيد!', '“Happy holiday!”'),
    item('عيد الفطر', 'ʿīd al-fiṭr', 'The festival marking the end of Ramadan, associated with prayer, visits, and sweets.', 'نزور العائلة في عيد الفطر.', '“We visit family during Eid al-Fitr.”'),
    item('عيد الأضحى', 'ʿīd al-aḍḥā', 'The festival connected with sacrifice and pilgrimage season.', 'يجتمع الأقارب في عيد الأضحى.', '“Relatives gather during Eid al-Adha.”'),
    item('رمضان', 'ramaḍān', 'The fasting month; not itself an “Eid,” but central to the yearly rhythm of many Arab societies.', 'في رمضان نفطر مع العائلة.', '“During Ramadan we break the fast with family.”'),
    item('كل عام وأنتم بخير', 'kull ʿām wa-antum bikhayr', 'A broad festive greeting meaning roughly “may you be well every year.”', 'كل عام وأنتم بخير بمناسبة العيد.', '“Best wishes for the holiday.”'),
    item('زيارة', 'ziyāra', '“Visit.” Family visits are a common celebration activity.', 'لدينا زيارة بعد الصلاة.', '“We have a visit after the prayer.”'),
    item('هدية', 'hadiyya', '“Gift.” Feminine and frequent in celebration contexts.', 'اشتريت هدية لأختي.', '“I bought a gift for my sister.”'),
    item('حلوى', 'ḥalwā', '“Sweets.” A culturally dense holiday word across many regions.', 'نأكل الحلوى مع القهوة.', '“We eat sweets with coffee.”'),
    item('سأزور', 'saʾazūr', '“I will visit.” A useful future form for holiday plans.', 'سأزور جدي غدًا.', '“I will visit my grandfather tomorrow.”'),
    item('مناسبة', 'munāsaba', '“Occasion.” Useful when the celebration is not one of the major named holidays.', 'هذه مناسبة سعيدة.', '“This is a happy occasion.”'),
  ],
});
