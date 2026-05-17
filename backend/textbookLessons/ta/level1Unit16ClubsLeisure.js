const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ta', {
  slug: 'ta-l1u16',
  title: 'Level 1 · Unit 16: கழகங்கள் மற்றும் ஓய்வு நேரம் — Clubs and Leisure',
  category: 'leisure',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about hobbies, clubs, and what you do in your free time.',
  vocabularyGoal: 'Use hobby words, club words, and frequency expressions.',
  grammarGoal: 'Use verbal nouns with `பிடிக்கும்` and simple frequency adverbs.',
  speakingGoal: 'Describe one hobby, ask about another person’s hobby, and recommend a club.',
  task: 'Introduce your hobby and choose one campus club.',
  expressionPractice: [
    practice('stating-hobby', 'Stating hobby', 'Use one activity plus `பிடிக்கும்`.'),
    practice('frequency', 'Talking frequency', 'Use `அடிக்கடி` or `சில நேரங்களில்`.'),
    practice('recommending', 'Recommending club', 'Give one reason with `ஏனெனில்`.'),
  ],
  relatedPools: ['topic-leisure', 'topic-campus'],
  items: [
    item('பொழுதுபோக்கு', 'poḻutupōkku', '“Hobby / pastime.” A useful general noun.', 'என் பொழுதுபோக்கு புகைப்படம் எடுப்பது.', '“My hobby is taking photos.”'),
    item('கழகம்', 'kaḻakam', '“Club / association.” A common institutional noun.', 'நான் நாடகக் கழகத்தில் சேர்கிறேன்.', '“I am joining the drama club.”'),
    item('படிப்பது பிடிக்கும்', 'paṭippatu piṭikkum', '“I like reading.” Verbal noun plus liking construction.', 'எனக்கு நாவல்கள் படிப்பது பிடிக்கும்.', '“I like reading novels.”'),
    item('கிதார் வாசிப்பது', 'kitār vācippatu', '“Playing guitar.”', 'அவளுக்கு கிதார் வாசிப்பது பிடிக்கும்.', '“She likes playing guitar.”'),
    item('விளையாட்டு', 'viḷaiyāṭṭu', '“Sport / game.” Useful for campus leisure talk.', 'நான் வாரத்திற்கு மூன்று முறை விளையாடுகிறேன்.', '“I play sports three times a week.”'),
    item('அடிக்கடி', 'aṭikkaṭi', '“Often.” A common frequency word.', 'நாங்கள் அடிக்கடி படம் பார்க்கிறோம்.', '“We often watch films.”'),
    item('சில நேரங்களில்', 'cila nēraṅkaḷil', '“Sometimes.” Literally “at some times.”', 'சில நேரங்களில் நான் வீட்டில் சமைக்கிறேன்.', '“Sometimes I cook at home.”'),
    item('ஓய்வு நேரம்', 'ōyvu nēram', '“Free time.” A useful hobby-question frame.', 'ஓய்வு நேரத்தில் நீங்கள் என்ன செய்கிறீர்கள்?', '“What do you do in your free time?”'),
  ],
});
