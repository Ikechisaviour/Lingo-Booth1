const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('hi', {
  slug: 'hi-l1u13',
  title: 'Level 1 · Unit 13: यातायात — Transportation',
  category: 'transport',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Choose transport, ask how to get somewhere, and describe a route.',
  vocabularyGoal: 'Use bus, train, metro, ticket, and route words.',
  grammarGoal: 'Use `से` for means and `से ... तक` for routes.',
  speakingGoal: 'Explain how you travel from one place to another.',
  task: 'Ask for the best way to reach a destination and describe your commute.',
  expressionPractice: [
    practice('naming-transport', 'Naming transport', 'Use the right vehicle noun.'),
    practice('describing-route', 'Describing route', 'Combine origin, destination, and means.'),
    practice('asking-how', 'Asking how', 'Use a practical route question.'),
  ],
  relatedPools: ['topic-transport', 'topic-travel'],
  items: [
    item('बस', 'bas', '“Bus.” A common loanword.', 'मैं बस से जाता हूँ।', '“I go by bus.”'),
    item('ट्रेन', 'ṭren', '“Train.”', 'ट्रेन तेज़ है।', '“The train is fast.”'),
    item('मेट्रो', 'meṭro', '“Metro.” Especially useful in large cities.', 'मैं मेट्रो से काम पर जाता हूँ।', '“I go to work by metro.”'),
    item('रिक्शा', 'rikśā', '“Rickshaw.” A locally important transport word.', 'हम रिक्शा से बाज़ार गए।', '“We went to the market by rickshaw.”'),
    item('टिकट', 'ṭikaṭ', '“Ticket.”', 'मुझे जयपुर का टिकट चाहिए।', '“I need a ticket to Jaipur.”'),
    item('स्टेशन', 'sṭeśan', '“Station.”', 'रेलवे स्टेशन कहाँ है?', '“Where is the railway station?”'),
    item('से', 'se', 'A postposition meaning “from / by / with,” depending on context.', 'मैं कार से आया।', '“I came by car.”'),
    item('से ... तक', 'se ... tak', '“From ... to / up to ...” for routes.', 'मैं घर से दफ़्तर तक जाता हूँ।', '“I go from home to the office.”'),
    item('कैसे पहुँचें?', 'kaise pahũcẽ?', '“How do we reach / get there?” A practical route question.', 'स्टेशन कैसे पहुँचें?', '“How do we get to the station?”'),
    item('पैदल', 'paidal', '“On foot.”', 'अगर जगह पास है, मैं पैदल जाता हूँ।', '“If the place is near, I walk.”'),
  ],
});
