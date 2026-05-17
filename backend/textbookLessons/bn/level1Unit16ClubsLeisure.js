const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('bn', {
  slug: 'bn-l1u16',
  title: 'Level 1 · Unit 16: ক্লাব ও অবসর — Clubs and Leisure',
  category: 'leisure',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about hobbies, clubs, and what you do in your free time.',
  vocabularyGoal: 'Use hobby words, club words, and frequency expressions.',
  grammarGoal: 'Use verbal nouns or infinitive-like forms with `ভালো লাগে` and simple frequency words.',
  speakingGoal: 'Describe one hobby, ask about another person’s hobby, and recommend a club.',
  task: 'Introduce your hobby and choose one student club.',
  expressionPractice: [
    practice('stating-hobby', 'Stating hobby', 'Use one activity plus `ভালো লাগে`.'),
    practice('frequency', 'Talking frequency', 'Use `প্রায়ই` or `কখনও কখনও`.'),
    practice('recommending', 'Recommending club', 'Give one reason with `কারণ`.'),
  ],
  relatedPools: ['topic-leisure', 'topic-campus'],
  items: [
    item('শখ', 'shokh', '“Hobby.” A practical personal-introduction noun.', 'আমার শখ ছবি তোলা।', '“My hobby is taking photos.”'),
    item('ক্লাব', 'klab', '“Club.” Useful for campus and social groups.', 'আমি নাট্য ক্লাবে যোগ দিচ্ছি।', '“I am joining the drama club.”'),
    item('বই পড়তে ভালো লাগে', 'boi poṛte bhalo lage', '“I like reading books.” A natural liking construction.', 'আমার উপন্যাস পড়তে ভালো লাগে।', '“I like reading novels.”'),
    item('গিটার বাজানো', 'gitar bajano', '“Playing guitar.”', 'তার গিটার বাজানো ভালো লাগে।', '“She likes playing guitar.”'),
    item('খেলাধুলা', 'kheladhula', '“Sports / play.” A common leisure noun.', 'আমি সপ্তাহে তিন দিন খেলাধুলা করি।', '“I play sports three days a week.”'),
    item('প্রায়ই', 'prayi', '“Often.” A useful frequency word.', 'আমরা প্রায়ই সিনেমা দেখি।', '“We often watch films.”'),
    item('কখনও কখনও', 'kokhono kokhono', '“Sometimes.” Repetition creates the frequency meaning.', 'কখনও কখনও আমি রান্না করি।', '“Sometimes I cook.”'),
    item('অবসর সময়', 'obshor shomoy', '“Free time.” A useful hobby-question frame.', 'অবসর সময়ে আপনি কী করেন?', '“What do you do in your free time?”'),
  ],
});
