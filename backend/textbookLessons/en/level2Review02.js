// Level 2 — Review 2 (English)
// Consolidates Units 5-7: Proverbs/Idioms, Performances, Right/Wrong.

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
  orientation: 'en-l2r2-orientation',
  vocabulary: 'en-l2r2-vocabulary',
  grammar: 'en-l2r2-grammar',
  mixedSentences: 'en-l2r2-mixed',
  speaking: 'en-l2r2-speaking',
  listening: 'en-l2r2-listening',
  writing: 'en-l2r2-writing',
  task: 'en-l2r2-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'What this review covers',
    goals: ['Recall vocabulary across proverbs/idioms (U5), performances (U6), right/wrong (U7).', 'Mix grammar patterns from all three units.', 'Consolidate in extended dialogue.'],
    task: 'Picture writing an op-ed about concert etiquette — you\'ll need proverbs + performance + opinion vocabulary.' },
  { id: ACT.vocabulary, section: 'Vocabulary Review', title: 'Proverbs, performance, opinion words',
    goals: ['Recall and recombine key vocab from Units 5-7.'],
    task: 'Pick 5 words across the units and use each in a fresh sentence.' },
  { id: ACT.grammar, section: 'Grammar Review', title: 'Cross-unit patterns',
    goals: ['what with X and Y, as they say, bound to, the more X the more Y (U5)', 'Not at all, whatever/whichever, the very + N, anything but + adj (U6)', 'even if, I\'d argue, with + N + adj, whether…or not (U7)'],
    task: 'Pick 4 patterns and write a sentence with each.' },
  { id: ACT.mixedSentences, section: 'Mixed Sentences', title: 'Two-pattern combos',
    goals: ['Combine patterns from different units in single sentences.'],
    task: 'Build 3 multi-pattern sentences.' },
  { id: ACT.speaking, section: 'Speaking', title: 'Etiquette discussion',
    goals: ['Discuss concert manners + proverb wisdom + opinion in one extended turn.'],
    task: 'Hold a 6-turn cross-topic dialogue.' },
  { id: ACT.listening, section: 'Listening', title: 'Concert dispute',
    goals: ['Follow a multi-topic dispute.'],
    task: 'Identify the position of each speaker.' },
  { id: ACT.writing, section: 'Writing', title: 'Op-ed paragraph',
    goals: ['Write a 5-6 sentence op-ed about concert/festival etiquette.'],
    task: 'Write your own op-ed mixing units 5-7 grammar.' },
  { id: ACT.task, section: 'Task', title: 'Op-ed pitch',
    goals: ['Combine all 3 units in one continuous scene.'],
    task: 'Roleplay pitching an op-ed about concert etiquette to an editor.' },
];

const lesson = {
  title: 'Level 2 · Review 2 (Units 5-7)',
  category: 'cross-topic',
  difficulty: 'intermediate',
  targetLang: 'en', nativeLang: 'en',
  track: 'textbook', lessonType: 'review',
  activities,
  expressionPractice: [
    { id: 'review2-mixed-functions-en', label: 'Mixed functional expressions', goal: 'Combine proverb + emphasis + argument in one op-ed.' },
    { id: 'review2-cross-unit-en', label: 'Cross-unit emphasis', goal: 'Use "the very" + "anything but" + "I\'d argue" together.' },
  ],
  relatedPools: ['topic-proverbs-idioms', 'topic-culture', 'topic-society'],
  content: [
    createContentItem('Review goal', 'consolidation', 'By end: confidently mix vocabulary + grammar from Units 5-7 in extended op-ed-style dialogue.', 'word', 'Units 5+6+7 combined.', 'Recombination training.', null, [ACT.orientation]),
    createContentItem('Real-world scenario', 'concert etiquette op-ed', 'You\'re pitching an op-ed to the Kumoh student paper about phone use at concerts. You combine proverbs, performance vocabulary, and clear opinions.', 'word', 'You: "I\'d argue that phone-free concerts are the very thing audiences need." — Editor: "Even if so, fans will resist."', 'A typical pitch meeting.', null, [ACT.orientation]),

    createContentItem('proverb (U5)', '/ˈprɒvɜːrb/', 'wisdom saying', 'word', 'My favorite English proverb is "every cloud has a silver lining".', 'Idioms vocab.', null, [ACT.vocabulary]),
    createContentItem('idiom (U5)', '/ˈɪdiəm/', 'non-literal phrase', 'word', 'Use idioms to sound native.', 'Idioms vocab.', null, [ACT.vocabulary]),
    createContentItem('audience (U6)', '/ˈɔːdiəns/', 'people watching', 'word', 'The audience went silent.', 'Performance vocab.', null, [ACT.vocabulary]),
    createContentItem('headliner (U6)', '/ˈhɛdlaɪnər/', 'top act', 'word', 'Beyoncé was the headliner.', 'Performance vocab.', null, [ACT.vocabulary]),
    createContentItem('venue (U6)', '/ˈvɛnjuː/', 'event location', 'word', 'Madison Square Garden is a legendary venue.', 'Performance vocab.', null, [ACT.vocabulary]),
    createContentItem('etiquette (U7)', '/ˈɛtɪkɛt/', 'polite behavior rules', 'word', 'Concert etiquette varies by country.', 'Opinion vocab.', null, [ACT.vocabulary]),
    createContentItem('controversy (U7)', '/ˈkɒntrəvɜːrsi/', 'public disagreement', 'word', 'Phone bans sparked controversy.', 'Opinion vocab.', null, [ACT.vocabulary]),
    createContentItem('rudeness (U7)', '/ˈruːdnəs/', 'lack of manners', 'word', 'Talking loudly is rudeness.', 'Opinion vocab.', null, [ACT.vocabulary]),
    createContentItem('phone-free policy', '/foʊn friː/', 'no-phones rule', 'word', 'Some concerts have phone-free policies.', 'Cross-unit modern term.', null, [ACT.vocabulary]),

    createContentItem('"what with X and Y" (U5)', 'stacked reasons', 'Multiple causes.', 'sentence', 'What with phones and chatty fans, the show was ruined.', 'Stack causes.', null, [ACT.grammar]),
    createContentItem('"as they say" (U5)', 'quote proverb', 'Frame a proverb.', 'sentence', 'As they say, "manners maketh man".', 'Quote frame.', null, [ACT.grammar]),
    createContentItem('"the more X the more Y" (U5)', 'correlative', 'Parallel growth.', 'sentence', 'The more phones, the worse the concert.', 'Correlative.', null, [ACT.grammar]),
    createContentItem('"the very + N" (U6)', 'emphatic highlight', 'This exact one.', 'sentence', 'This is the very policy we need.', 'Emphasis.', null, [ACT.grammar]),
    createContentItem('"anything but + adj" (U6)', 'emphatic negative', 'Strongly NOT.', 'sentence', 'The show was anything but boring.', 'Strong negation.', null, [ACT.grammar]),
    createContentItem('"whatever + S + V" (U6)', 'free choice', 'Any option works.', 'sentence', 'Whatever genre you prefer, manners matter.', 'Free choice.', null, [ACT.grammar]),
    createContentItem('"I\'d argue + that" (U7)', 'state opinion', 'Frame an argument.', 'sentence', 'I\'d argue that phones ruin live music.', 'Opinion frame.', null, [ACT.grammar]),
    createContentItem('"even if + S + V" (U7)', 'concession', 'Concede possibility.', 'sentence', 'Even if some fans resist, the rule helps everyone.', 'Concession.', null, [ACT.grammar]),

    createContentItem(
      'Multi-pattern combo 1', 'U5 + U6',
      '"as they say" + "the very + N": quote + highlight.',
      'sentence', 'As they say, less is more — and that\'s the very wisdom we need at concerts.',
      'Quote a proverb then connect to current need.',
      [{ target: 'as they say', english: 'quote (U5)' }, { target: 'the very + N', english: 'highlight (U6)' }], [ACT.mixedSentences]),
    createContentItem(
      'Multi-pattern combo 2', 'U5 + U7',
      '"the more X the more Y" + "even if": correlative + concession.',
      'sentence', 'The more phones at a concert, the more it suffers — even if fans claim phones don\'t bother anyone.',
      'Pattern: parallel growth + concession.',
      [{ target: 'the more X the more Y', english: 'correlative (U5)' }, { target: 'even if + S + V', english: 'concession (U7)' }], [ACT.mixedSentences]),
    createContentItem(
      'Multi-pattern combo 3', 'U6 + U7',
      '"anything but" + "I\'d argue": emphatic + opinion.',
      'sentence', 'A phone-free policy is anything but extreme. I\'d argue it\'s overdue.',
      'Pattern: negate + assert.',
      [{ target: 'anything but + adj', english: 'emphatic (U6)' }, { target: 'I\'d argue', english: 'opinion (U7)' }], [ACT.mixedSentences]),

    createContentItem('Cross-topic speaking model', 'op-ed pitch',
      'Combine proverb + performance + opinion in 1 extended turn.',
      'sentence', 'I\'d argue that concerts have lost something essential. What with phones and chatty fans, the magic is gone. As they say, "you can\'t step in the same river twice" — every live show is unrepeatable. The more we record, the less we experience. Phone-free policies are anything but elitist; they\'re the very thing live music needs. Even if fans push back at first, they\'ll thank us later.',
      'Frame: argue + stack + quote + correlative + emphasize + concede.',
      null, [ACT.speaking]),

    createContentItem('Concert dispute', 'listening',
      'Two friends after a concert.',
      'conversation',
      'Sarah: That was the very show I wanted to see, but the guy next to me filmed the whole set.\nMin-su: Annoying. What with that and the talkers behind us, what a night.\nSarah: I\'d argue all major venues should ban phones. Even if it sounds extreme, the audience deserves it.\nMin-su: As they say, "your phone is the new TV" — people forget to live.\nSarah: The more screens, the less presence. It was anything but the immersive experience I paid for.\nMin-su: Whatever the venue decides, I\'m not going to a phone-friendly show again.',
      'Note 6 patterns naturally combined.',
      [
        { target: 'the very show I wanted to see (U6)', english: 'highlight' },
        { target: 'What with that and the talkers behind us (U5)', english: 'stacked reasons' },
        { target: 'I\'d argue all major venues (U7)', english: 'opinion' },
        { target: 'Even if it sounds extreme (U7)', english: 'concession' },
        { target: 'As they say, "your phone is the new TV" (U5)', english: 'quote' },
        { target: 'The more screens, the less presence (U5)', english: 'correlative' },
        { target: 'anything but the immersive experience (U6)', english: 'emphatic negative' },
      ],
      [ACT.listening]),

    createContentItem('Writing prompt', 'op-ed',
      'Write a 5-6 sentence op-ed about a behavior you wish would change in public spaces.',
      'sentence', 'Example: I\'d argue that phone-free movie theaters should be the norm. What with bright screens and constant texting, the cinema experience has decayed. As they say, "out of sight, out of mind" — without your phone, you can actually watch the film. The more screens in the room, the worse the focus. Even if fans push back at first, anything but a quiet theater is a poor return on a $15 ticket.',
      'Use 4+ target patterns.',
      null, [ACT.writing]),

    createContentItem('Task: Op-ed pitch', 'consolidation',
      'AI tutor plays an editor. You pitch a 1-minute op-ed about an etiquette issue. Use 4+ patterns.',
      'conversation',
      'Tutor: What\'s your op-ed?\nYou: [opening with "I\'d argue"]\nTutor: Hot take. Why?\nYou: [stack reasons with "what with"]\nTutor: Examples?\nYou: [quote proverb with "as they say"]\nTutor: Counter?\nYou: [concede with "even if"]\nTutor: [decision]',
      'AI tutor plays editor.',
      [
        { target: 'I\'d argue + that', english: 'opinion' },
        { target: 'what with X and Y', english: 'stack' },
        { target: 'as they say', english: 'quote' },
        { target: 'the more X the more Y', english: 'correlative' },
        { target: 'even if + S + V', english: 'concede' },
      ],
      [ACT.task]),
  ],
};

module.exports = lesson;
