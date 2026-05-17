const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('tr', {
  slug: 'tr-l1u20',
  title: 'Level 1 · Unit 20: Öneriler ve Planlar — Suggestions and Plans',
  category: 'planning',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Make friendly suggestions, respond to them, and settle on a plan.',
  vocabularyGoal: 'Use suggestion, plan, and response phrases.',
  grammarGoal: 'Use `-elim/-alım`, `ister misin`, and soft refusal phrases.',
  speakingGoal: 'Suggest one activity, respond to one suggestion, and agree on a plan.',
  task: 'Plan a simple weekend outing.',
  expressionPractice: [
    practice('making-suggestion', 'Making suggestion', 'Use one `-elim/-alım` form.'),
    practice('accepting', 'Accepting suggestion', 'Use one positive response plus detail.'),
    practice('declining-softly', 'Declining softly', 'Give a reason and another option.'),
  ],
  relatedPools: ['topic-planning', 'topic-leisure'],
  items: [
    item('gidelim', 'gi-de-LİM', '“Let’s go.” The `-elim/-alım` form is a productive suggestion pattern.', 'Hafta sonu müzeye gidelim.', '“Let’s go to the museum on the weekend.”'),
    item('kahve içelim', 'kah-VE i-çe-LİM', '“Let’s drink coffee.” A highly reusable social suggestion.', 'Dersten sonra kahve içelim.', '“Let’s drink coffee after class.”'),
    item('ister misin?', 'is-TER mi-SİN', '“Would you like?” Useful for inviting rather than commanding.', 'Bizimle gelmek ister misin?', '“Would you like to come with us?”'),
    item('iyi fikir', 'i-Yİ fi-KİR', '“Good idea.” A quick warm response.', 'Bu iyi fikir.', '“That is a good idea.”'),
    item('olur', 'o-LUR', '“Okay / that works.” One of the most natural acceptance words.', 'Saat beş olur.', '“Five o’clock works.”'),
    item('kusura bakma, gelemem', 'ku-su-RA bak-MA ge-le-MEM', '“Sorry, I cannot come.” A soft refusal.', 'Kusura bakma, cumartesi gelemem.', '“Sorry, I cannot come on Saturday.”'),
    item('belki', 'bel-Kİ', '“Maybe.” Useful when the speaker is undecided.', 'Belki pazar daha iyi.', '“Maybe Sunday is better.”'),
    item('o zaman', 'o za-MAN', '“Then / in that case.” A natural pivot after new information.', 'O zaman saat altıda buluşalım.', '“Then let’s meet at six.”'),
  ],
});
