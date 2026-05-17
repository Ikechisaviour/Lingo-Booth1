const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('he', {
  slug: 'he-l1u21',
  title: 'Level 1 · Unit 21: תקוות וחלומות — Hopes and Dreams',
  category: 'future',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about plans, hopes, and longer-term dreams.',
  vocabularyGoal: 'Use future, study, work, travel, and aspiration vocabulary.',
  grammarGoal: 'Use `רוצה`, `מקווה`, and simple future forms for different kinds of future meaning.',
  speakingGoal: 'Describe one realistic plan and one longer-term dream.',
  task: 'Give a short future-self introduction.',
  expressionPractice: [
    practice('stating-plan', 'Stating plan', 'Use a future form clearly.'),
    practice('stating-hope', 'Stating hope', 'Use `מקווה`.'),
    practice('stating-dream', 'Stating dream', 'Describe a longer-term aspiration.'),
  ],
  relatedPools: ['topic-future', 'topic-goals'],
  items: [
    item('עתיד', 'atid', '“Future.” A useful abstract noun.', 'אני חושב על העתיד שלי.', '“I think about my future.”'),
    item('חלום', 'khalom', '“Dream.” Literal or aspirational depending on context.', 'החלום שלי הוא להיות רופאה.', '“My dream is to be a doctor.”'),
    item('רוצה', 'rotse / rotsa', '“Wants.” Speaker gender changes the present form.', 'אני רוצה ללמוד עברית טוב.', '“I want to learn Hebrew well.”'),
    item('מקווה', 'mekave / mekava', '“Hopes.” Useful for softer future wishes.', 'אני מקווה לנסוע לישראל.', '“I hope to travel to Israel.”'),
    item('אלמד', 'elmad', '“I will study.” A first-person future form.', 'אלמד באוניברסיטה בשנה הבאה.', '“I will study at university next year.”'),
    item('אעבוד', 'e’evod', '“I will work.” Useful for career plans.', 'אעבוד בחברה גדולה.', '“I will work in a big company.”'),
    item('להיות', 'lihiyot', '“To be / become.” High-value in aspiration statements.', 'אני רוצה להיות מורה.', '“I want to be a teacher.”'),
    item('אם', 'im', '“If.” Useful for realistic conditions around goals.', 'אם אצליח, אחגוג עם המשפחה.', '“If I succeed, I will celebrate with the family.”'),
    item('הזדמנות', 'hizdamnut', '“Opportunity.” A practical future word.', 'אם תהיה הזדמנות, אעבוד בחו״ל.', '“If there is an opportunity, I will work abroad.”'),
    item('יום אחד', 'yom ekhad', '“One day.” A compact distant-future phrase.', 'יום אחד אכתוב ספר.', '“One day I will write a book.”'),
  ],
});
