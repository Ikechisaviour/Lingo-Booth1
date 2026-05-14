// Level 2 — Review 3 (English)
// Consolidates Units 8-9: Intriguing World, Pop Culture + final synthesis of L2.

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
  orientation: 'en-l2r3-orientation',
  vocabulary: 'en-l2r3-vocabulary',
  grammar: 'en-l2r3-grammar',
  mixedSentences: 'en-l2r3-mixed',
  speaking: 'en-l2r3-speaking',
  listening: 'en-l2r3-listening',
  writing: 'en-l2r3-writing',
  task: 'en-l2r3-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'What this review covers',
    goals: ['Recall vocabulary across intriguing world (U8) and pop culture (U9), with synthesis from earlier L2 units.', 'Mix grammar patterns from U8 + U9 + earlier reviews.', 'Consolidate in extended interview.'],
    task: 'Picture being interviewed by a cultural journalist about how K-pop reshaped global music.' },
  { id: ACT.vocabulary, section: 'Vocabulary Review', title: 'Culture, pop, synthesis words',
    goals: ['Recall and recombine vocab from U8 + U9.'],
    task: 'Pick 5 words and use each in a fresh sentence.' },
  { id: ACT.grammar, section: 'Grammar Review', title: 'Cross-unit patterns',
    goals: ['go pick up + N, the N that S V, including X Y Z, as well as (U8)', 'you see, I wish + had + PP, the fact that S V, seem to + V (U9)', '+ free recall from U2-U7'],
    task: 'Pick 4 patterns and write a sentence with each.' },
  { id: ACT.mixedSentences, section: 'Mixed Sentences', title: 'Two-pattern combos',
    goals: ['Combine patterns from U8 and U9 in single sentences.'],
    task: 'Build 3 multi-pattern sentences.' },
  { id: ACT.speaking, section: 'Speaking', title: 'Pop-culture interview',
    goals: ['Discuss culture + celebrity + history in one extended turn.'],
    task: 'Answer 4 interview questions.' },
  { id: ACT.listening, section: 'Listening', title: 'Cultural journalist interview',
    goals: ['Follow a multi-topic interview.'],
    task: 'Identify the journalist\'s claims.' },
  { id: ACT.writing, section: 'Writing', title: 'Cultural feature article',
    goals: ['Write a 5-6 sentence feature article opening.'],
    task: 'Write your own opening mixing U8-U9 grammar.' },
  { id: ACT.task, section: 'Task', title: 'Culture journalism roleplay',
    goals: ['Combine U8 + U9 in one continuous interview.'],
    task: 'Roleplay being interviewed by a culture journalist.' },
];

const lesson = {
  title: 'Level 2 · Review 3 (Units 8-9 + Synthesis)',
  category: 'cross-topic',
  difficulty: 'intermediate',
  targetLang: 'en', nativeLang: 'en',
  track: 'textbook', lessonType: 'review',
  activities,
  expressionPractice: [
    { id: 'review3-mixed-functions-en', label: 'Mixed functional expressions', goal: 'Combine description + interview + reflection in one extended turn.' },
    { id: 'review3-synthesis-en', label: 'Synthesis from L2', goal: 'Use patterns from any 3 different L2 units in one paragraph.' },
  ],
  relatedPools: ['topic-culture'],
  content: [
    createContentItem('Review goal', 'consolidation', 'By end: confidently mix vocabulary + grammar from Units 8-9 (and recall earlier) in extended interview.', 'word', 'Units 8+9 + synthesis.', 'Final L2 recombination.', null, [ACT.orientation]),
    createContentItem('Real-world scenario', 'cultural journalist interview', 'A journalist at Kumoh\'s school newspaper interviews you for a feature on global K-pop. You describe Korean culture, explain why K-pop went global, and reflect on your relationship with the genre.', 'word', 'Journalist: "Why do you think K-pop went global?" — You: "The fact that BTS sang in Korean and still topped Billboard, you see, changed the rules."', 'Typical cultural feature interview.', null, [ACT.orientation]),

    createContentItem('dialect (U8)', '/ˈdaɪəlɛkt/', 'regional variation', 'word', 'Scouse is a Liverpool dialect.', 'Culture vocab.', null, [ACT.vocabulary]),
    createContentItem('tradition (U8)', '/trəˈdɪʃən/', 'long-standing practice', 'word', 'Tea time is a British tradition.', 'Culture vocab.', null, [ACT.vocabulary]),
    createContentItem('heritage (U8)', '/ˈhɛrɪtɪdʒ/', 'inherited identity', 'word', 'I\'m proud of my heritage.', 'Culture vocab.', null, [ACT.vocabulary]),
    createContentItem('indigenous (U8)', '/ɪnˈdɪdʒənəs/', 'native to a place', 'word', 'Māori are New Zealand\'s indigenous people.', 'Culture vocab.', null, [ACT.vocabulary]),
    createContentItem('idol (U9)', '/ˈaɪdəl/', 'famous performer', 'word', 'BTS members are K-pop idols.', 'Pop-culture vocab.', null, [ACT.vocabulary]),
    createContentItem('viral (U9)', '/ˈvaɪrəl/', 'spread widely', 'word', 'The dance went viral.', 'Pop-culture vocab.', null, [ACT.vocabulary]),
    createContentItem('binge-watch (U9)', '/bɪndʒ wɒtʃ/', 'watch many at once', 'word', 'I binge-watched all 9 episodes.', 'Pop-culture vocab.', null, [ACT.vocabulary]),
    createContentItem('blockbuster (U9)', '/ˈblɒkˌbʌstər/', 'massive hit', 'word', 'Squid Game was a blockbuster.', 'Pop-culture vocab.', null, [ACT.vocabulary]),
    createContentItem('crossover hit', '/ˈkrɒsˌoʊvər hɪt/', 'hit across cultures/genres', 'word', 'Gangnam Style was the first crossover K-pop hit.', 'Pop + culture synthesis.', null, [ACT.vocabulary]),

    createContentItem('"the N that S V" (U8)', 'descriptive relative', 'Defining clause.', 'sentence', 'BTS is the group that broke global records.', 'Description.', null, [ACT.grammar]),
    createContentItem('"including X Y Z" (U8)', 'inclusion', 'List examples.', 'sentence', 'K-pop, including BTS, BLACKPINK, and Stray Kids, dominates charts.', 'Inclusion.', null, [ACT.grammar]),
    createContentItem('"as well as + N" (U8)', 'addition', 'Add to a list.', 'sentence', 'BTS rapped in Korean as well as English.', 'Addition.', null, [ACT.grammar]),
    createContentItem('"go + V" (U8)', 'errand verb', 'Casual: go and do.', 'sentence', 'Let\'s go grab some bibimbap after the show.', 'Errand pattern.', null, [ACT.grammar]),
    createContentItem('"you see / you know" (U9)', 'explanatory', 'Casual aside.', 'sentence', 'It\'s a Korean wordplay, you see.', 'Aside.', null, [ACT.grammar]),
    createContentItem('"I wish + had + PP" (U9)', 'past regret', 'Unreal past.', 'sentence', 'I wish I had seen the original concert tour.', 'Regret.', null, [ACT.grammar]),
    createContentItem('"the fact that + S + V" (U9)', 'nominalization', 'Clause as noun.', 'sentence', 'The fact that they sing in Korean is part of the appeal.', 'Nominal.', null, [ACT.grammar]),
    createContentItem('"seem to / appear to + V" (U9)', 'hedge', 'Soften claim.', 'sentence', 'They seem to understand global trends.', 'Hedge.', null, [ACT.grammar]),

    createContentItem(
      'Multi-pattern combo 1', 'U8 + U9',
      '"the N that S V" + "I wish + had + PP": description + past regret.',
      'sentence', 'BTS is the group that started everything. I wish I had bought tickets when they were affordable.',
      'Description + regret.',
      [{ target: 'the N that S V', english: 'descriptive (U8)' }, { target: 'I wish + had + PP', english: 'regret (U9)' }], [ACT.mixedSentences]),
    createContentItem(
      'Multi-pattern combo 2', 'U8 + U9',
      '"including X Y Z" + "the fact that + S + V": inclusion + nominalization.',
      'sentence', 'The fact that K-pop, including BTS and BLACKPINK, sells out in seconds shocks the music industry.',
      'Inclusion + nominal.',
      [{ target: 'including X Y Z', english: 'inclusion (U8)' }, { target: 'the fact that + S + V', english: 'nominal (U9)' }], [ACT.mixedSentences]),
    createContentItem(
      'Multi-pattern combo 3', 'U8 + U9',
      '"as well as" + "seem to + V": addition + hedge.',
      'sentence', 'BTS rapped in Korean as well as English, and they seem to set a new standard for crossover hits.',
      'Addition + hedge.',
      [{ target: 'as well as + N', english: 'addition (U8)' }, { target: 'seem to + V', english: 'hedge (U9)' }], [ACT.mixedSentences]),

    createContentItem('Cross-topic speaking model', 'cultural interview',
      'Combine culture + pop + reflection in 1 extended turn.',
      'sentence', 'K-pop is the genre that, you see, broke global rules. The fact that groups like BTS, BLACKPINK, and Stray Kids — including their indigenous Korean lyrics — went mainstream is unprecedented. They appear to redefine what global pop means. As well as music, K-pop sells fashion, language, and food. I wish I had grown up with them, but the next generation is already going to grab K-pop merch at the local mall.',
      'Six target patterns in one extended turn.',
      null, [ACT.speaking]),

    createContentItem('Cultural journalist interview', 'listening',
      'A journalist interviews a K-pop fan.',
      'conversation',
      'Journalist: Why do you think K-pop went global?\nFan: The fact that they invested in fans, you see, is half the story. The other half is the music. BTS is the group that proved Korean lyrics could top Billboard.\nJournalist: What\'s the secret of the fandom?\nFan: Including ARMY, BLINKs, and Stays, K-pop fandoms work like religious communities. They mobilize for awards, charity, even politics, as well as for promotion.\nJournalist: Any regrets as a fan?\nFan: I wish I had attended the Wembley concert. Tickets seem to be unaffordable now.\nJournalist: Where next for K-pop?\nFan: Whatever direction they pick, English-speaking pop has no choice but to learn from them.',
      'All 4 U8 + U9 patterns + 1 callback to U4.',
      [
        { target: 'The fact that they invested in fans, you see (U9)', english: 'nominal + aside' },
        { target: 'BTS is the group that proved (U8)', english: 'descriptive' },
        { target: 'Including ARMY, BLINKs, and Stays (U8)', english: 'inclusion' },
        { target: 'as well as for promotion (U8)', english: 'addition' },
        { target: 'I wish I had attended the Wembley concert (U9)', english: 'regret' },
        { target: 'Tickets seem to be unaffordable now (U9)', english: 'hedge' },
        { target: 'no choice but to learn from them (U4 callback)', english: 'no alternative' },
      ],
      [ACT.listening]),

    createContentItem('Writing prompt', 'feature article opening',
      'Write a 5-6 sentence opening for a feature article about a pop-culture phenomenon.',
      'sentence', 'Example: K-pop is the genre that, you see, changed how the world consumes music. The fact that groups, including BTS, BLACKPINK, and Stray Kids, sell out stadiums in non-Korean cities once seemed impossible. As well as music, K-pop exports fashion, slang, and beauty norms. They appear to do what Hollywood once did for movies. I wish journalists had taken them seriously in 2012, when "Gangnam Style" broke the internet.',
      'Use 4+ patterns from U8 + U9.',
      null, [ACT.writing]),

    createContentItem('Task: Culture journalism roleplay', 'consolidation',
      'AI tutor plays a journalist. You\'re a culture expert. Answer 4 questions. Use 4+ patterns.',
      'conversation',
      'Tutor: What makes K-pop unique?\nYou: [describe with "the N that S V" + "you see"]\nTutor: Examples?\nYou: [list with "including"]\nTutor: Any regrets as a fan?\nYou: [regret with "I wish I had"]\nTutor: Where next?\nYou: [hedge with "seem to / appear to"]\nTutor: [closing]',
      'AI tutor plays journalist.',
      [
        { target: 'the N that S V', english: 'descriptive (U8)' },
        { target: 'including X Y Z', english: 'inclusion (U8)' },
        { target: 'I wish + had + PP', english: 'regret (U9)' },
        { target: 'seem to / appear to + V', english: 'hedge (U9)' },
        { target: 'you see / the fact that', english: 'aside / nominal (U9)' },
      ],
      [ACT.task]),
  ],
};

module.exports = lesson;
