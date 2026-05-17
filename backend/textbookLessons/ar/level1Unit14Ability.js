const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ar', {
  slug: 'ar-l1u14',
  title: 'Level 1 · Unit 14: أستطيع — Ability',
  category: 'ability',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Say what you can do, cannot do, and are learning to do.',
  vocabularyGoal: 'Use skill verbs for speaking, reading, cooking, driving, and using technology.',
  grammarGoal: 'Use `أستطيع أن` and negative `لا أستطيع أن` before verbs.',
  speakingGoal: 'Describe three abilities and one skill you are still learning.',
  task: 'Introduce your abilities in a short self-profile.',
  expressionPractice: [
    practice('stating-ability', 'Stating ability', 'Use `أستطيع أن` before a verb.'),
    practice('stating-inability', 'Stating inability', 'Use `لا أستطيع أن` clearly.'),
    practice('learning-skill', 'Talking about learning', 'Use `أتعلم` with a skill.'),
  ],
  relatedPools: ['topic-ability', 'topic-self'],
  items: [
    item('أستطيع أن', 'astaṭīʿu an', '“I can / I am able to.” A formal-neutral ability frame followed by a verb.', 'أستطيع أن أقرأ العربية.', '“I can read Arabic.”'),
    item('لا أستطيع أن', 'lā astaṭīʿu an', '“I cannot.” The negative wraps the same structure rather than changing the whole frame.', 'لا أستطيع أن أقود السيارة.', '“I cannot drive a car.”'),
    item('أقرأ', 'aqraʾ', '“I read.” A useful skill verb for literacy and study.', 'أقرأ الأخبار كل صباح.', '“I read the news every morning.”'),
    item('أتكلم', 'atakallam', '“I speak.” Useful for language ability statements.', 'أتكلم العربية قليلًا.', '“I speak a little Arabic.”'),
    item('أكتب', 'aktub', '“I write.” Pair it with language names or concrete objects.', 'أكتب رسالة قصيرة.', '“I write a short message.”'),
    item('أطبخ', 'aṭbukh', '“I cook.” A daily-life skill verb with the emphatic consonant `ط`.', 'أستطيع أن أطبخ الأرز.', '“I can cook rice.”'),
    item('أقود', 'aqūd', '“I drive.” Common in ability and transportation talk.', 'هل تستطيع أن تقود؟', '“Can you drive?”'),
    item('أتعلم', 'ataʿallam', '“I am learning.” Useful when ability is still developing.', 'أتعلم السباحة.', '“I am learning swimming.”'),
    item('جيدًا / قليلًا', 'jayyidan / qalīlan', '“Well / a little.” These adverbs help qualify ability honestly.', 'أتكلم الإنجليزية جيدًا.', '“I speak English well.”'),
    item('مهارة', 'mahāra', '“Skill.” A useful noun when discussing strengths and development.', 'الطبخ مهارة مفيدة.', '“Cooking is a useful skill.”'),
  ],
});
