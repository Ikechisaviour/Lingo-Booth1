const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('hi', {
  slug: 'hi-l1u19',
  title: 'Level 1 · Unit 19: त्योहार — Holidays and Celebrations',
  category: 'culture',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about major holidays, greetings, family visits, and celebration plans.',
  vocabularyGoal: 'Use holiday names, greeting formulas, meal words, and visit vocabulary.',
  grammarGoal: 'Use habitual forms for customs and future forms for upcoming plans.',
  speakingGoal: 'Describe one holiday and what people usually do during it.',
  task: 'Explain a holiday plan for a family visit.',
  expressionPractice: [
    practice('naming-holiday', 'Naming holiday', 'Use the holiday name accurately.'),
    practice('giving-greeting', 'Giving greeting', 'Choose a fitting formula.'),
    practice('describing-custom', 'Describing custom', 'Say what people usually do.'),
  ],
  relatedPools: ['topic-culture', 'topic-family'],
  items: [
    item('त्योहार', 'tyohār', '“Festival / holiday.”', 'भारत में कई त्योहार हैं।', '“There are many festivals in India.”'),
    item('दीवाली', 'dīvālī', 'A major festival associated with lights, sweets, and family visits.', 'दीवाली पर लोग दीपक जलाते हैं।', '“On Diwali people light lamps.”'),
    item('होली', 'holī', 'A spring festival associated with colors and playful celebration.', 'होली में लोग रंग लगाते हैं।', '“On Holi people apply colors.”'),
    item('ईद', 'īd', 'A major Muslim festival celebrated across India.', 'ईद पर लोग एक-दूसरे से मिलते हैं।', '“On Eid people meet one another.”'),
    item('शुभकामनाएँ', 'śubh kāmnāẽ', '“Best wishes.” A broad festive greeting word.', 'दीवाली की शुभकामनाएँ!', '“Best wishes for Diwali!”'),
    item('परिवार', 'parivār', '“Family.”', 'हम त्योहार पर परिवार से मिलते हैं।', '“We meet family during the festival.”'),
    item('मिठाई', 'miṭhāī', '“Sweets.” A culturally dense festival word.', 'हम मिठाई खाते हैं।', '“We eat sweets.”'),
    item('उपहार', 'upahār', '“Gift.” Slightly more formal than everyday `गिफ़्ट`.', 'मैंने बहन के लिए उपहार खरीदा।', '“I bought a gift for my sister.”'),
    item('मनाना', 'manānā', '“To celebrate.”', 'हम साथ में त्योहार मनाते हैं।', '“We celebrate the festival together.”'),
    item('अगले सप्ताह', 'agle saptāh', '“Next week.” Useful for future celebration plans.', 'अगले सप्ताह हम त्योहार मनाएँगे।', '“Next week we will celebrate the festival.”'),
  ],
});
