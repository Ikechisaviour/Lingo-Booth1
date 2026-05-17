const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ta', {
  slug: 'ta-l1u13',
  title: 'Level 1 · Unit 13: போக்குவரத்து — Transportation',
  category: 'travel',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Use transport language for buses, trains, autos, and travel time.',
  vocabularyGoal: 'Use vehicle, stop, ticket, and route words.',
  grammarGoal: 'Use instrumental-style phrases with `-ஆல்` and destination marking in travel sentences.',
  speakingGoal: 'Ask how to go somewhere, choose transport, and ask how long it takes.',
  task: 'Plan a trip from campus to the city center.',
  expressionPractice: [
    practice('choosing-transport', 'Choosing transport', 'Use one transport phrase with `-ஆல்`.'),
    practice('asking-route', 'Asking route', 'Use one route question.'),
    practice('asking-duration', 'Asking duration', 'Use `எவ்வளவு நேரம் ஆகும்?`.'),
  ],
  relatedPools: ['topic-travel', 'topic-city'],
  items: [
    item('பஸ்ஸால் செல்கிறேன்', 'passāl celkiṟēṉ', '“I go by bus.” The instrumental-style ending marks means.', 'நான் கல்லூரிக்கு பஸ்ஸால் செல்கிறேன்.', '“I go to college by bus.”'),
    item('ரயில்', 'rayil', '“Train.” A core transport noun in Tamil Nadu.', 'ரயில் எட்டு மணிக்கு புறப்படும்.', '“The train departs at eight.”'),
    item('ஆட்டோ', 'āṭṭō', '“Auto-rickshaw.” A very practical local transport word.', 'நாம் ஆட்டோவில் போகலாம்.', '“We can go by auto.”'),
    item('நிறுத்தம்', 'niṟuttam', '“Stop.” Used for bus stops and stopping points.', 'பஸ் நிறுத்தம் அருகில் உள்ளது.', '“The bus stop is nearby.”'),
    item('நிலையம்', 'nilaiyam', '“Station.” Used for rail and bus stations.', 'அடுத்த நிலையத்தில் இறங்குங்கள்.', '“Get off at the next station.”'),
    item('டிக்கெட்', 'ṭikkeṭ', '“Ticket.” A common loanword.', 'ஒரு டிக்கெட் வேண்டும்.', '“I want one ticket.”'),
    item('...க்கு எப்படி போகலாம்?', '...kku eppaṭi pōkalām', '“How can I go to ...?” A practical route question.', 'மையத்துக்கு எப்படி போகலாம்?', '“How can I go to the center?”'),
    item('எவ்வளவு நேரம் ஆகும்?', 'evvaḷavu nēram ākum', '“How long will it take?” A complete duration question.', 'விமான நிலையத்துக்கு எவ்வளவு நேரம் ஆகும்?', '“How long will it take to the airport?”'),
  ],
});
