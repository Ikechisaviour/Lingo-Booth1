const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ta', {
  slug: 'ta-l1u7',
  title: 'Level 1 · Unit 7: எங்கு செல்கிறீர்கள்? — Going Places',
  category: 'travel',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Say where you are, where you are going, and ask for simple directions.',
  vocabularyGoal: 'Use common destinations, route words, and direction phrases.',
  grammarGoal: 'Use locative and dative case endings to separate “at” from “to.”',
  speakingGoal: 'Say where you are, ask how to get somewhere, and give one short route.',
  task: 'Guide a visitor from campus to a nearby shop.',
  expressionPractice: [
    practice('stating-location', 'Stating location', 'Use one locative form.'),
    practice('stating-destination', 'Stating destination', 'Use one dative form.'),
    practice('asking-route', 'Asking route', 'Use `எப்படி போகலாம்?`.'),
  ],
  relatedPools: ['topic-travel', 'topic-directions'],
  items: [
    item('பல்கலைக்கழகத்தில்', 'palkalaikkaḻakattil', '“At the university.” The locative suffix marks place.', 'நான் பல்கலைக்கழகத்தில் இருக்கிறேன்.', '“I am at the university.”'),
    item('நூலகத்திற்கு செல்கிறேன்', 'nūlakatirkku celkiṟēṉ', '“I am going to the library.” The dative suffix marks destination.', 'வகுப்புக்குப் பிறகு நூலகத்திற்கு செல்கிறேன்.', '“After class I am going to the library.”'),
    item('வீட்டிலிருந்து', 'vīṭṭiliruntu', '“From home.” The ablative-style form marks origin.', 'நான் வீட்டிலிருந்து வருகிறேன்.', '“I am coming from home.”'),
    item('இடப்பக்கம் திரும்புங்கள்', 'iṭappakkam tirumpuṅkaḷ', '“Turn left.” The plural imperative is polite.', 'சிக்னலில் இடப்பக்கம் திரும்புங்கள்.', '“At the signal, turn left.”'),
    item('நேராக செல்லுங்கள்', 'nērāka celluṅkaḷ', '“Go straight.” A useful route instruction.', 'நேராக சென்று வங்கியை கடக்கவும்.', '“Go straight and pass the bank.”'),
    item('அருகில் / தூரத்தில்', 'arukil / tūrattil', '“Nearby / far away.” Locative-style forms describe distance.', 'நிலையம் அருகில் உள்ளது.', '“The station is nearby.”'),
    item('...க்கு எப்படி போகலாம்?', '...kku eppaṭi pōkalām', '“How can I go to ...?” A practical route question.', 'மருத்துவமனைக்கு எப்படி போகலாம்?', '“How can I go to the hospital?”'),
    item('அருகில்', 'arukil', '“Near / beside.” Useful for landmark descriptions.', 'கஃபே வங்கியின் அருகில் உள்ளது.', '“The cafe is near the bank.”'),
  ],
});
