const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('he', {
  slug: 'he-l1u13',
  title: 'Level 1 · Unit 13: תחבורה — Transportation',
  category: 'transport',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Choose transport, ask how to get somewhere, and describe a route.',
  vocabularyGoal: 'Use bus, train, car, station, ticket, and route words.',
  grammarGoal: 'Use `ב־` for transport means and `מ־ ... ל־ ...` for routes.',
  speakingGoal: 'Explain how you travel from one place to another.',
  task: 'Ask for the best way to reach a destination and describe your commute.',
  expressionPractice: [
    practice('naming-transport', 'Naming transport', 'Use the right vehicle word.'),
    practice('describing-route', 'Describing route', 'Combine origin, destination, and transport.'),
    practice('asking-how', 'Asking how to go', 'Use `איך מגיעים ל... ?`.'),
  ],
  relatedPools: ['topic-transport', 'topic-travel'],
  items: [
    item('אוטובוס', 'otobus', '“Bus.” A high-frequency loanword.', 'אני נוסע באוטובוס.', '“I travel by bus.”'),
    item('רכבת', 'rakevet', '“Train.” Feminine and common in intercity travel.', 'הרכבת מהירה.', '“The train is fast.”'),
    item('מכונית', 'mekhonit', '“Car.” Feminine and slightly more formal than casual `אוטו`.', 'אני בא במכונית.', '“I come by car.”'),
    item('תחנה', 'takhana', '“Station / stop.” Use with bus and train contexts.', 'איפה תחנת הרכבת?', '“Where is the train station?”'),
    item('כרטיס', 'kartis', '“Ticket / card.” Useful for transport and events.', 'אני צריך כרטיס לירושלים.', '“I need a ticket to Jerusalem.”'),
    item('ב־', 'be-', 'The prefix meaning “in / by,” used before vehicle words to state means.', 'אני נוסעת ברכבת.', '“I travel by train.”'),
    item('מ־ ... ל־ ...', 'mi- ... le- ...', '“From ... to ...” using two Hebrew prefixes.', 'אני נוסע מחיפה לתל אביב.', '“I travel from Haifa to Tel Aviv.”'),
    item('איך מגיעים ל...?', 'eikh magi’im le...?', '“How do you get to ...?” A very practical direction question.', 'איך מגיעים לתחנה?', '“How do you get to the station?”'),
    item('קרוב / רחוק', 'karov / rakhok', '“Near / far.” Useful for deciding whether to walk or ride.', 'זה רחוק מכאן.', '“It is far from here.”'),
    item('ברגל', 'baregel', '“On foot.” Literally “by foot,” used as a fixed phrase.', 'אם זה קרוב, אני הולך ברגל.', '“If it is near, I walk.”'),
  ],
});
