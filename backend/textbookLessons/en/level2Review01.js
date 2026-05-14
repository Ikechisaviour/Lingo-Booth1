// Level 2 — Review 1 (English)
// Consolidates Units 2-4: Healthy Life, Sports, Modern Relationships.

const createContentItem = (
  target, ipa, note, type = 'word',
  example = '', exampleNote = '', breakdown = null, activityIds = [],
) => ({
  type, activityIds,
  targetText: target, romanization: ipa, nativeText: note, pronunciation: ipa,
  exampleTarget: example || target, exampleNative: exampleNote || note,
  korean: target, english: note, example: example || target, exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.english, korean: b.target, english: b.english })) } : {}),
});

const ACT = {
  orientation: 'en-l2r1-orientation',
  vocabulary: 'en-l2r1-vocabulary',
  grammar: 'en-l2r1-grammar',
  mixedSentences: 'en-l2r1-mixed',
  speaking: 'en-l2r1-speaking',
  listening: 'en-l2r1-listening',
  writing: 'en-l2r1-writing',
  task: 'en-l2r1-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'What this review covers',
    goals: ['Recall vocabulary across healthy life (U2), sports (U3), modern relationships (U4).', 'Mix grammar patterns from all three units.', 'Consolidate in extended dialogue.'],
    task: 'Picture consulting a sports coach about your training schedule — you\'ll need health + sports + relationship vocabulary.' },
  { id: ACT.vocabulary, section: 'Vocabulary Review', title: 'Health, sports, relationships words',
    goals: ['Recall and recombine key vocab from Units 2-4.'],
    task: 'Pick 5 words across the units and use each in a fresh sentence.' },
  { id: ACT.grammar, section: 'Grammar Review', title: 'Cross-unit patterns',
    goals: ['so/such…that, used to, if you keep + V-ing, not only…but also (U2)', 'no matter what/whether, due to/because of, called/known as, compared to (U3)', 'let alone, bound to, whereas, have no choice but to (U4)'],
    task: 'Pick 4 patterns and write a sentence with each.' },
  { id: ACT.mixedSentences, section: 'Mixed Sentences', title: 'Two-pattern combos',
    goals: ['Combine patterns from different units in single sentences.'],
    task: 'Build 3 multi-pattern sentences.' },
  { id: ACT.speaking, section: 'Speaking', title: 'Athlete-and-life chat',
    goals: ['Discuss training + health + relationships in one extended turn.'],
    task: 'Hold a 6-turn cross-topic dialogue.' },
  { id: ACT.listening, section: 'Listening', title: 'Coach-athlete session',
    goals: ['Follow a multi-topic coaching session.'],
    task: 'Identify the advice given.' },
  { id: ACT.writing, section: 'Writing', title: 'Reflection paragraph',
    goals: ['Write a 5-6 sentence reflection on your training/health balance.'],
    task: 'Write your own reflection mixing units 2-4 grammar.' },
  { id: ACT.task, section: 'Task', title: 'Coaching roleplay',
    goals: ['Combine all 3 units in one continuous scene.'],
    task: 'Roleplay a coaching session about training overload.' },
];

const lesson = {
  title: 'Level 2 · Review 1 (Units 2-4)',
  category: 'cross-topic',
  difficulty: 'intermediate',
  targetLang: 'en', nativeLang: 'en',
  track: 'textbook', lessonType: 'review',
  activities,
  expressionPractice: [
    { id: 'review1-mixed-functions-en', label: 'Mixed functional expressions', goal: 'Combine warning + comparison + concession in one consultation.' },
    { id: 'review1-cross-unit-en', label: 'Cross-unit comparison', goal: 'Use "compared to" + "whereas" + "have no choice but to" together.' },
  ],
  relatedPools: ['topic-health', 'topic-sports', 'topic-society'],
  content: [
    createContentItem('Review goal', 'consolidation', 'By end: confidently mix vocabulary + grammar from Units 2-4 in extended dialogue.', 'word', 'Units 2+3+4 combined.', 'Recombination training.', null, [ACT.orientation]),
    createContentItem('Real-world scenario', 'training-overload talk', 'A friend at Kumoh has been training so hard for the Kumoh Cup that her knees hurt. She asks your honest opinion. You give cross-topic advice mixing health + sports + relationship dynamics.', 'word', 'Friend: "I think I have no choice but to push through." — You: "Whereas pushing through built the old generation, today\'s athletes know rest is part of training."', 'A typical friendly counseling moment.', null, [ACT.orientation]),

    createContentItem('symptom (U2)', '/ˈsɪmptəm/', 'sign of illness', 'word', 'Knee swelling is a symptom of overuse.', 'Healthy-life vocab.', null, [ACT.vocabulary]),
    createContentItem('overdo it (U2)', '/ˌoʊvərˈduː ɪt/', 'push too hard', 'word', 'Don\'t overdo it at the gym.', 'Healthy-life vocab.', null, [ACT.vocabulary]),
    createContentItem('prescription (U2)', '/prɪˈskrɪpʃən/', 'doctor\'s order', 'word', 'I picked up my prescription.', 'Healthy-life vocab.', null, [ACT.vocabulary]),
    createContentItem('beat / defeat (U3)', '/biːt/ /dɪˈfiːt/', 'win against', 'word', 'Brazil beat Argentina.', 'Sports vocab.', null, [ACT.vocabulary]),
    createContentItem('underdog (U3)', '/ˈʌndərdɒɡ/', 'unlikely winner', 'word', 'The underdog won.', 'Sports vocab.', null, [ACT.vocabulary]),
    createContentItem('rookie / veteran (U3)', '/ˈrʊki/ /ˈvɛtərən/', 'new / seasoned player', 'word', 'A rookie season is hard.', 'Sports vocab.', null, [ACT.vocabulary]),
    createContentItem('stereotype (U4)', '/ˈstɛriətaɪp/', 'oversimplified image', 'word', 'Gender stereotypes are outdated.', 'Relationships vocab.', null, [ACT.vocabulary]),
    createContentItem('compromise (U4)', '/ˈkɒmprəmaɪz/', 'mutual concession', 'word', 'Compromise is key in teams.', 'Relationships vocab.', null, [ACT.vocabulary]),
    createContentItem('expectation (U4)', '/ˌɛkspɛkˈteɪʃən/', 'anticipation', 'word', 'Family expectations are heavy.', 'Relationships vocab.', null, [ACT.vocabulary]),
    createContentItem('burnout', '/ˈbɜːrnaʊt/', 'physical / emotional exhaustion', 'word', 'I\'m on the edge of burnout.', 'Cross-unit modern term.', null, [ACT.vocabulary]),

    createContentItem('"so + adj + that" (U2)', 'degree', 'Intense cause-and-effect.', 'sentence', 'I was so tired that I slept 14 hours.', 'Intensity pattern.', null, [ACT.grammar]),
    createContentItem('"if you keep + V-ing" (U2)', 'warning', 'Bad outcome if continued.', 'sentence', 'If you keep training without rest, you\'ll get injured.', 'Warning pattern.', null, [ACT.grammar]),
    createContentItem('"no matter + wh-word" (U3)', 'certainty', 'Regardless of conditions.', 'sentence', 'No matter how hard you train, rest matters.', 'Certainty.', null, [ACT.grammar]),
    createContentItem('"due to + N" (U3)', 'cause', 'Formal cause.', 'sentence', 'Due to the rain, the match was canceled.', 'Cause.', null, [ACT.grammar]),
    createContentItem('"compared to + N" (U3)', 'comparison', 'Compare two things.', 'sentence', 'Compared to last year, I\'m stronger.', 'Comparison.', null, [ACT.grammar]),
    createContentItem('"let alone + N" (U4)', 'extreme dismissal', 'Even more obviously not.', 'sentence', 'She can\'t walk, let alone run a marathon.', 'Extreme dismissal.', null, [ACT.grammar]),
    createContentItem('"have no choice but to + V" (U4)', 'no alternative', 'Forced choice.', 'sentence', 'She had no choice but to drop out.', 'No alternative.', null, [ACT.grammar]),
    createContentItem('"whereas + S + V" (U4)', 'contrast', 'Two-sided comparison.', 'sentence', 'I love sprinting, whereas she prefers distance.', 'Contrast.', null, [ACT.grammar]),

    createContentItem(
      'Multi-pattern combo 1', 'U2 + U3',
      '"if you keep + V-ing" + "compared to": warning + comparison.',
      'sentence', 'If you keep training that much, you\'ll be exhausted. Compared to the rest of the team, you\'re already overtraining.',
      'Pattern: warn + then compare.',
      [{ target: 'if you keep + V-ing', english: 'warning (U2)' }, { target: 'compared to + N', english: 'comparison (U3)' }], [ACT.mixedSentences]),
    createContentItem(
      'Multi-pattern combo 2', 'U3 + U4',
      '"no matter what" + "have no choice but to": certainty + no alternative.',
      'sentence', 'No matter what the coach says, I have no choice but to sit out next week.',
      'Pattern: certainty + no-alternative.',
      [{ target: 'no matter what', english: 'certainty (U3)' }, { target: 'have no choice but to + V', english: 'no alternative (U4)' }], [ACT.mixedSentences]),
    createContentItem(
      'Multi-pattern combo 3', 'U2 + U4',
      '"so + adj + that" + "whereas": intensity + contrast.',
      'sentence', 'I\'m so exhausted that I can\'t think, whereas my teammate is still energetic.',
      'Pattern: intense fact + contrast.',
      [{ target: 'so + adj + that', english: 'intensity (U2)' }, { target: 'whereas + S + V', english: 'contrast (U4)' }], [ACT.mixedSentences]),

    createContentItem('Cross-topic speaking model', 'training overload',
      'Combine health + sports + relationships in 1 extended turn.',
      'sentence', 'I\'ve been training so much that my knee really hurts. Compared to two months ago, my recovery is much slower. If I keep pushing, I\'ll be out for the season. I have no choice but to take a break, whereas my old self would have powered through. The old training mindset is bound to change.',
      'Frame: intensity + comparison + warning + concession + prediction.',
      null, [ACT.speaking]),

    createContentItem('Coaching session', 'listening',
      'A coach advises an overtraining athlete.',
      'conversation',
      'Athlete: Coach, my knees are killing me.\nCoach: How long?\nAthlete: Three weeks. I trained through it.\nCoach: If you keep training through pain, you\'ll have a chronic injury. Due to your form, you\'re putting extra stress on the joint.\nAthlete: I have no choice but to push — the tournament\'s in a month.\nCoach: That mindset is bound to backfire. Compared to your teammates, you\'re already ahead. Whereas they\'ll be fresh for the tournament, you\'ll be limping.\nAthlete: OK, what should I do?\nCoach: Rest for a week. Then we\'ll rebuild slowly. Not only your knees but also your confidence will recover.',
      'Note 6 grammar patterns naturally combined.',
      [
        { target: 'If you keep training through pain (U2)', english: 'warning' },
        { target: 'Due to your form (U3)', english: 'cause' },
        { target: 'Compared to your teammates (U3)', english: 'comparison' },
        { target: 'I have no choice but to push (U4)', english: 'no alternative' },
        { target: 'Whereas they\'ll be fresh (U4)', english: 'contrast' },
        { target: 'Not only your knees but also your confidence (U2)', english: 'addition' },
      ],
      [ACT.listening]),

    createContentItem('Writing prompt', 'reflection',
      'Write a 5-6 sentence reflection on a time you trained or worked too hard.',
      'sentence', 'Example: Last semester I studied so much that I burned out. Compared to my friends, I had unrealistic expectations. If I had kept going, I would have failed everything. I had no choice but to take a week off. Whereas my old self saw rest as weakness, now I see it as strategy. Not only my grades but also my mental health benefited.',
      'Use 4+ target patterns.',
      null, [ACT.writing]),

    createContentItem('Task: Coaching roleplay', 'consolidation',
      'AI tutor plays a coach. You play an overtraining athlete. Use 4+ patterns.',
      'conversation',
      'Tutor: How are your knees?\nYou: [intensity with "so + adj + that"]\nTutor: That\'s serious. What\'s next?\nYou: [no alternative with "have no choice but to"]\nTutor: Why?\nYou: [warning with "if you keep" + comparison with "compared to"]\nTutor: [advice]\nYou: [concede with "whereas" + thanks]',
      'AI tutor plays coach.',
      [
        { target: 'so + adj + that', english: 'intensity' },
        { target: 'have no choice but to', english: 'no alternative' },
        { target: 'if you keep + V-ing', english: 'warning' },
        { target: 'compared to + N', english: 'comparison' },
        { target: 'whereas + S + V', english: 'contrast' },
      ],
      [ACT.task]),
  ],
};

module.exports = lesson;
