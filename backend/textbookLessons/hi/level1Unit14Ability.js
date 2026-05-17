const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('hi', {
  slug: 'hi-l1u14',
  title: 'Level 1 · Unit 14: क्षमता — Ability',
  category: 'ability',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Say what you can do, cannot do, and are learning to do.',
  vocabularyGoal: 'Use skill verbs for speaking, reading, cooking, driving, and swimming.',
  grammarGoal: 'Use `सकना` with gendered past/present agreement and `आना` for learned ability.',
  speakingGoal: 'Describe three abilities and one skill you are still learning.',
  task: 'Give a short introduction to your abilities.',
  expressionPractice: [
    practice('stating-ability', 'Stating ability', 'Use `सकता / सकती हूँ`.'),
    practice('stating-inability', 'Stating inability', 'Negate ability clearly.'),
    practice('learned-skill', 'Learned skill', 'Use `मुझे ... आता है`.'),
  ],
  relatedPools: ['topic-ability', 'topic-self'],
  items: [
    item('मैं ... सकता हूँ / सकती हूँ', 'main ... saktā hū̃ / saktī hū̃', '“I can ...” masculine / feminine speaker forms.', 'मैं हिंदी पढ़ सकती हूँ।', '“I can read Hindi.”'),
    item('मैं ... नहीं कर सकता', 'main ... nahī̃ kar saktā', '“I cannot do ...” A useful negative ability frame.', 'मैं कार नहीं चला सकता।', '“I cannot drive a car.”'),
    item('पढ़ना', 'paṛhnā', '“To read.”', 'मैं हिंदी पढ़ सकता हूँ।', '“I can read Hindi.”'),
    item('बोलना', 'bolnā', '“To speak.”', 'मैं थोड़ी हिंदी बोलता हूँ।', '“I speak a little Hindi.”'),
    item('लिखना', 'likhnā', '“To write.”', 'मैं संदेश लिख सकती हूँ।', '“I can write a message.”'),
    item('खाना बनाना', 'khānā banānā', '“To cook.” Literally “to make food.”', 'मैं दाल बना सकता हूँ।', '“I can make dal.”'),
    item('गाड़ी चलाना', 'gāṛī chalānā', '“To drive a vehicle.”', 'क्या आपको गाड़ी चलाना आता है?', '“Do you know how to drive?”'),
    item('तैरना', 'tairnā', '“To swim.”', 'मैं तैरना सीख रही हूँ।', '“I am learning to swim.”'),
    item('मुझे ... आता है', 'mujhe ... ātā hai', '“I know how to ...” Literally “... comes to me,” often more idiomatic for learned skills.', 'मुझे गाना आता है।', '“I know how to sing.”'),
    item('अच्छी तरह / थोड़ा', 'acchī tarah / thoṛā', '“Well / a little.” Useful for qualifying ability honestly.', 'मैं थोड़ी हिंदी बोल सकती हूँ।', '“I can speak a little Hindi.”'),
  ],
});
