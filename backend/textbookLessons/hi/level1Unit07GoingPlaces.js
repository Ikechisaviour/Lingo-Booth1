const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('hi', {
  slug: 'hi-l1u7',
  title: 'Level 1 · Unit 7: कहाँ जा रहे हैं? — Going Places',
  category: 'travel',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about destinations, movement, and why you are going somewhere.',
  vocabularyGoal: 'Use place nouns and common movement verbs for daily routes.',
  grammarGoal: 'Use postpositions such as `को`, `से`, and `तक`, plus gendered present-progressive forms.',
  speakingGoal: 'Say where you are going and give one reason.',
  task: 'Describe a simple route through town.',
  expressionPractice: [
    practice('asking-destination', 'Asking destination', 'Use `कहाँ` and `कहाँ जा रहे हैं?`.'),
    practice('stating-destination', 'Stating destination', 'Use `को` or destination phrases naturally.'),
    practice('describing-route', 'Describing route', 'Combine origin, destination, and purpose.'),
  ],
  relatedPools: ['topic-travel', 'topic-places'],
  items: [
    item('कहाँ?', 'kahā̃?', '“Where?” The same word works for location and destination, so the verb provides the difference.', 'आप कहाँ जा रहे हैं?', '“Where are you going?”'),
    item('जा रहा हूँ / जा रही हूँ', 'jā rahā hū̃ / jā rahī hū̃', '“I am going” masculine / feminine speaker forms.', 'मैं बाज़ार जा रही हूँ।', '“I am going to the market.”'),
    item('घर', 'ghar', '“Home / house.” Hindi often says simply `घर जा रहा हूँ` without an extra destination marker.', 'मैं घर जा रहा हूँ।', '“I am going home.”'),
    item('स्कूल', 'skūl', '“School.” A common loanword and useful route noun.', 'बच्चे स्कूल जा रहे हैं।', '“The children are going to school.”'),
    item('दुकान', 'dukān', '“Shop.” Feminine and useful in daily errands.', 'मैं दुकान तक पैदल जा रहा हूँ।', '“I am walking up to the shop.”'),
    item('से ... तक', 'se ... tak', '“From ... to / up to ...” A route frame built from postpositions.', 'मैं घर से स्टेशन तक जाता हूँ।', '“I go from home to the station.”'),
    item('बस से', 'bas se', '“By bus.” The postposition `से` also marks means.', 'मैं कॉलेज बस से जाता हूँ।', '“I go to college by bus.”'),
    item('क्योंकि', 'kyoṅki', '“Because.” Useful for giving a reason after a destination.', 'मैं पुस्तकालय जा रही हूँ क्योंकि मुझे पढ़ना है।', '“I am going to the library because I need to study.”'),
    item('वापस आना', 'vāpas ānā', '“To come back / return.”', 'मैं शाम को वापस आती हूँ।', '“I return in the evening.”'),
    item('रास्ता', 'rāstā', '“Way / route.” A practical travel noun.', 'यह रास्ता छोटा है।', '“This route is short.”'),
  ],
});
