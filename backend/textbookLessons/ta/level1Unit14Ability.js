const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ta', {
  slug: 'ta-l1u14',
  title: 'Level 1 · Unit 14: திறன் மற்றும் அனுமதி — Ability and Permission',
  category: 'daily-life',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about ability, permission, and obligation in everyday situations.',
  vocabularyGoal: 'Use skill, permission, and obligation language.',
  grammarGoal: 'Use `முடியும்`, `முடியாது`, permission questions, and `வேண்டும்` for necessity.',
  speakingGoal: 'Say what you can do, ask permission, and state one obligation.',
  task: 'Handle three everyday ability and permission questions.',
  expressionPractice: [
    practice('stating-ability', 'Stating ability', 'Use `எனக்கு ... முடியும்`.'),
    practice('asking-permission', 'Asking permission', 'Use `...லாமா?`.'),
    practice('stating-obligation', 'Stating obligation', 'Use `வேண்டும்`.'),
  ],
  relatedPools: ['topic-ability', 'topic-classroom'],
  items: [
    item('எனக்கு நீந்த முடியும்', 'eṉakku nīnta muṭiyum', '“I can swim.” Tamil often frames ability through what is possible for the person.', 'எனக்கு நீந்த முடியும்.', '“I can swim.”'),
    item('எனக்கு வர முடியாது', 'eṉakku vara muṭiyātu', '“I cannot come.” The negative ability form is built into the verb phrase.', 'இன்று எனக்கு வர முடியாது.', '“Today I cannot come.”'),
    item('உள்ளே வரலாமா?', 'uḷḷē varalāmā', '“May I come inside?” A common permission question.', 'உள்ளே வரலாமா?', '“May I come inside?”'),
    item('கூடாது', 'kūṭātu', '“Must not / not allowed.” A core prohibition form.', 'இங்கே புகை பிடிக்கக் கூடாது.', '“Smoking is not allowed here.”'),
    item('படிக்க வேண்டும்', 'paṭikka vēṇṭum', '“Need to study / must study.” `வேண்டும்` carries necessity.', 'தேர்வுக்கு படிக்க வேண்டும்.', '“I must study for the exam.”'),
    item('தேவை', 'tēvai', '“Need.” A noun-like expression used in many practical sentences.', 'பாஸ்போர்ட் தேவை.', '“A passport is needed.”'),
    item('கற்க', 'kaṟka', '“To learn.” Useful in ability and future-goal talk.', 'கார் ஓட்ட கற்க விரும்புகிறேன்.', '“I want to learn to drive.”'),
    item('செய்ய முடியும்', 'ceyya muṭiyum', '“Can do.” A broad productive pattern with many verbs.', 'நான் இதை செய்ய முடியும்.', '“I can do this.”'),
  ],
});
