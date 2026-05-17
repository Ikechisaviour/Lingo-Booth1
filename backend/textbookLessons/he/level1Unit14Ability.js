const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('he', {
  slug: 'he-l1u14',
  title: 'Level 1 · Unit 14: יכולות — Ability',
  category: 'ability',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Say what you can do, cannot do, and are learning to do.',
  vocabularyGoal: 'Use skill verbs for speaking, reading, cooking, driving, and swimming.',
  grammarGoal: 'Use `יכול / יכולה` plus infinitives and negate with `לא`.',
  speakingGoal: 'Describe three abilities and one skill you are still learning.',
  task: 'Give a short introduction to your abilities.',
  expressionPractice: [
    practice('stating-ability', 'Stating ability', 'Use `יכול / יכולה` plus an infinitive.'),
    practice('stating-inability', 'Stating inability', 'Negate with `לא`.'),
    practice('learning-skill', 'Talking about learning', 'Use `לומד / לומדת`.'),
  ],
  relatedPools: ['topic-ability', 'topic-self'],
  items: [
    item('יכול / יכולה', 'yakhol / yekhola', '“Can / able to” masculine / feminine.', 'אני יכולה לקרוא עברית.', '“I can read Hebrew.”'),
    item('לא יכול', 'lo yakhol', '“Cannot” in the masculine form; change the adjective for feminine speakers.', 'אני לא יכול לנהוג.', '“I cannot drive.”'),
    item('לקרוא', 'likro', '“To read.” An infinitive often paired with ability.', 'אני יכול לקרוא חדשות.', '“I can read news.”'),
    item('לדבר', 'ledaber', '“To speak.” Useful for language ability statements.', 'אני מדברת עברית קצת.', '“I speak a little Hebrew.”'),
    item('לכתוב', 'likhtov', '“To write.”', 'אני יכול לכתוב הודעה קצרה.', '“I can write a short message.”'),
    item('לבשל', 'levashel', '“To cook.”', 'אני יכולה לבשל מרק.', '“I can cook soup.”'),
    item('לנהוג', 'linhog', '“To drive.”', 'אתה יודע לנהוג?', '“Do you know how to drive?”'),
    item('לשחות', 'liskhot', '“To swim.”', 'אני לומד לשחות.', '“I am learning to swim.”'),
    item('יודע / יודעת', 'yode’a / yoda’at', '“Knows how to.” Often more idiomatic than “can” for learned skills.', 'אני יודעת לנגן בפסנתר.', '“I know how to play piano.”'),
    item('קצת / טוב', 'ktsat / tov', '“A little / well.” Useful for qualifying skills honestly.', 'אני מדבר קצת עברית.', '“I speak a little Hebrew.”'),
  ],
});
