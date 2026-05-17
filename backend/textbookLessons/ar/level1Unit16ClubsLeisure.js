const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ar', {
  slug: 'ar-l1u16',
  title: 'Level 1 · Unit 16: الهوايات والأنشطة — Clubs and Leisure',
  category: 'leisure',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about hobbies, clubs, and what you do in your free time.',
  vocabularyGoal: 'Use hobby nouns and activity verbs for sports, reading, music, and clubs.',
  grammarGoal: 'Use verbal nouns after `أحب` and simple frequency expressions.',
  speakingGoal: 'Describe two hobbies and invite someone to join one activity.',
  task: 'Introduce your leisure routine and one club you would like to join.',
  expressionPractice: [
    practice('naming-hobby', 'Naming a hobby', 'Use a clear noun or verbal noun.'),
    practice('stating-frequency', 'Stating frequency', 'Use `كل أسبوع` and related expressions.'),
    practice('inviting-activity', 'Inviting someone', 'Use a simple invitation naturally.'),
  ],
  relatedPools: ['topic-leisure', 'topic-social'],
  items: [
    item('هواية', 'hiwāya', '“Hobby.” A useful umbrella noun for leisure topics.', 'ما هوايتك؟', '“What is your hobby?”'),
    item('القراءة', 'al-qirāʾa', '“Reading.” Arabic often uses verbal nouns where English uses gerunds.', 'أحب القراءة.', '“I like reading.”'),
    item('الرياضة', 'ar-riyāḍa', '“Sport / exercise.” It can refer to exercise in general or sports broadly.', 'أمارس الرياضة كل أسبوع.', '“I exercise every week.”'),
    item('كرة القدم', 'kurat al-qadam', '“Football / soccer.” Literally “ball of the foot,” an iḍāfa phrase.', 'ألعب كرة القدم مع أصدقائي.', '“I play football with my friends.”'),
    item('الموسيقى', 'al-mūsīqā', '“Music.” A common leisure noun and good pronunciation practice.', 'أستمع إلى الموسيقى مساءً.', '“I listen to music in the evening.”'),
    item('نادي', 'nādī', '“Club.” Useful for sports, language, and student clubs.', 'أريد أن أنضم إلى نادي اللغة.', '“I want to join the language club.”'),
    item('وقت الفراغ', 'waqt al-farāgh', '“Free time.” Literally “time of emptiness,” a high-value expression.', 'ماذا تفعل في وقت الفراغ؟', '“What do you do in your free time?”'),
    item('كل أسبوع', 'kulla usbūʿ', '“Every week.” A simple frequency frame.', 'أذهب إلى النادي كل أسبوع.', '“I go to the club every week.”'),
    item('هل تريد أن تنضم؟', 'hal turīdu an tanḍamm?', '“Do you want to join?” A reusable invitation question.', 'هل تريد أن تنضم إلينا؟', '“Do you want to join us?”'),
    item('مع أصدقائي', 'maʿa aṣdiqāʾī', '“With my friends.” A very useful social phrase for hobby talk.', 'ألعب الشطرنج مع أصدقائي.', '“I play chess with my friends.”'),
  ],
});
