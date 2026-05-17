const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ru', {
  slug: 'ru-l1u21',
  title: 'Level 1 · Unit 21: Планы и мечты — Hopes and Dreams',
  category: 'future',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about future plans, hopes, and longer-term dreams.',
  vocabularyGoal: 'Use future, study, work, travel, and aspiration words.',
  grammarGoal: 'Use `я хочу`, `я буду`, and `я надеюсь` for desire, future action, and hope.',
  speakingGoal: 'Describe one realistic plan and one longer dream with a reason.',
  task: 'Give a short future-self introduction.',
  expressionPractice: [
    practice('stating-desire', 'Stating desire', 'Use `я хочу`.'),
    practice('stating-plan', 'Stating plan', 'Use `я буду` plus infinitive.'),
    practice('stating-hope', 'Stating hope', 'Use `я надеюсь`.'),
  ],
  relatedPools: ['topic-future', 'topic-goals'],
  items: [
    item('будущее', 'budushcheye', '“Future.” A high-value abstract noun for goals and plans.', 'Я думаю о своём будущем.', '“I think about my future.”'),
    item('мечта', 'mechta', '“Dream / aspiration.” It is common in personal goal talk.', 'Моя мечта — стать врачом.', '“My dream is to become a doctor.”'),
    item('я хочу', 'ya khochu', '“I want.” A direct expression of desire.', 'Я хочу хорошо говорить по-русски.', '“I want to speak Russian well.”'),
    item('я буду учиться', 'ya budu uchitsya', '“I will study.” Russian future with imperfective verbs often uses `быть` plus infinitive.', 'Я буду учиться в университете.', '“I will study at university.”'),
    item('я надеюсь', 'ya nadeyus', '“I hope.” It often introduces a clause or infinitive-like idea.', 'Я надеюсь поехать в Петербург.', '“I hope to go to Saint Petersburg.”'),
    item('стать', 'stat', '“To become.” This perfective infinitive is central in career dreams.', 'Я хочу стать учителем.', '“I want to become a teacher.”'),
    item('если будет возможность', 'yesli budet vozmozhnost', '“If there is an opportunity.” A natural condition around future plans.', 'Если будет возможность, я буду работать за границей.', '“If there is an opportunity, I will work abroad.”'),
    item('когда-нибудь', 'kogda-nibud', '“Someday.” A compact word for distant dreams.', 'Когда-нибудь я напишу книгу.', '“Someday I will write a book.”'),
  ],
});
