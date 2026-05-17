const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('hi', {
  slug: 'hi-l1u20',
  title: 'Level 1 · Unit 20: सुझाव — Suggestions',
  category: 'suggestions',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Make suggestions, accept them, reject them gently, and offer alternatives.',
  vocabularyGoal: 'Use outing, food, study, and leisure vocabulary that makes suggestions useful.',
  grammarGoal: 'Use `चलो`, `क्या हम ...?`, and `कैसा रहेगा?` for different suggestion styles.',
  speakingGoal: 'Suggest one activity, react to another, and offer an alternative.',
  task: 'Plan an evening with a friend.',
  expressionPractice: [
    practice('making-suggestion', 'Making suggestion', 'Use more than one suggestion frame.'),
    practice('accepting-suggestion', 'Accepting suggestion', 'Reply naturally.'),
    practice('offering-alternative', 'Offering alternative', 'Redirect politely.'),
  ],
  relatedPools: ['topic-social', 'topic-plans'],
  items: [
    item('चलो', 'chalo', '“Let’s go / come on.” A very common informal suggestion opener.', 'चलो कैफ़े चलते हैं।', '“Let’s go to a café.”'),
    item('क्या हम ...?', 'kyā ham ...?', '“Shall we ...?” A neutral question frame.', 'क्या हम फ़िल्म देखें?', '“Shall we watch a film?”'),
    item('... कैसा रहेगा?', '... kaisā rahegā?', '“How would ... be?” A softer proposal frame.', 'शाम को मिलना कैसा रहेगा?', '“How would meeting in the evening be?”'),
    item('अच्छा विचार', 'acchā vicār', '“Good idea.”', 'हाँ, यह अच्छा विचार है।', '“Yes, that is a good idea.”'),
    item('मैं आज नहीं आ सकता', 'main āj nahī̃ ā saktā', '“I cannot come today.” Best followed by an alternative.', 'मैं आज नहीं आ सकती, लेकिन कल आ सकती हूँ।', '“I cannot come today, but I can come tomorrow.”'),
    item('उसके बजाय', 'uske bajāy', '“Instead of that.”', 'उसके बजाय घर पर पढ़ते हैं।', '“Instead, let’s study at home.”'),
    item('फ़िल्म देखें', 'film dekhẽ', '“Let’s watch a film.”', 'क्या हम आज फ़िल्म देखें?', '“Shall we watch a film today?”'),
    item('साथ पढ़ें', 'sāth paṛhẽ', '“Let’s study together.”', 'चलो पुस्तकालय में साथ पढ़ें।', '“Let’s study together in the library.”'),
    item('ठीक है', 'ṭhīk hai', '“Okay / that works.” A high-frequency acceptance.', 'सात बजे ठीक है।', '“Seven o’clock is fine.”'),
    item('... के बारे में क्या?', '... ke bāre mẽ kyā?', '“What about ...?” A useful alternative-suggestion frame.', 'रेस्तराँ के बारे में क्या?', '“What about the restaurant?”'),
  ],
});
