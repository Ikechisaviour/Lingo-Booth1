const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('he', {
  slug: 'he-l1u7',
  title: 'Level 1 · Unit 7: לאן הולכים? — Going Places',
  category: 'travel',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about destinations, movement, and where you are going today.',
  vocabularyGoal: 'Use common place nouns and movement verbs for daily routes.',
  grammarGoal: 'Use the direction preposition `ל־`, present-tense gender agreement, and destination questions with `לאן`.',
  speakingGoal: 'Say where you are going and why, using one male and one female present-tense form where relevant.',
  task: 'Describe a simple afternoon route through town.',
  expressionPractice: [
    practice('asking-destination', 'Asking destination', 'Use `לאן` naturally.'),
    practice('stating-destination', 'Stating destination', 'Use `ל־` before the place.'),
    practice('describing-route', 'Describing route', 'Combine movement and purpose.'),
  ],
  relatedPools: ['topic-travel', 'topic-places'],
  items: [
    item('לאן?', 'le’an?', '“Where to?” Use it for destination, not location.', 'לאן אתה הולך?', '“Where are you going?”'),
    item('ל־', 'le-', 'The prefix meaning “to.” It attaches directly to the following noun.', 'אני הולכת לבית הספר.', '“I am going to school.”'),
    item('הולך / הולכת', 'holekh / holekhet', '“Going” masculine / feminine in the present. Present forms agree with the subject.', 'דנה הולכת לספרייה.', '“Dana is going to the library.”'),
    item('נוסע / נוסעת', 'nose’a / nosa’at', '“Traveling / riding” masculine / feminine, often for going by vehicle.', 'אני נוסע לעבודה באוטובוס.', '“I go to work by bus.”'),
    item('בית ספר', 'beit sefer', '“School.” A classic construct phrase literally meaning “house of book.”', 'הילדים הולכים לבית הספר.', '“The children are going to school.”'),
    item('ספרייה', 'sifriya', '“Library.” A feminine place noun useful in student life.', 'אני הולכת לספרייה ללמוד.', '“I am going to the library to study.”'),
    item('תחנה', 'takhana', '“Station / stop.” Useful for buses and trains.', 'איפה התחנה?', '“Where is the station?”'),
    item('עכשיו', 'akhshav', '“Now.” A common time adverb for immediate plans.', 'אני יוצא עכשיו.', '“I am leaving now.”'),
    item('כדי', 'kedei', '“In order to.” A practical way to add purpose before an infinitive.', 'אני הולך לחנות כדי לקנות לחם.', '“I am going to the store in order to buy bread.”'),
    item('חוזר / חוזרת', 'khozer / khozeret', '“Returning” masculine / feminine.', 'אני חוזרת הביתה בערב.', '“I return home in the evening.”'),
  ],
});
