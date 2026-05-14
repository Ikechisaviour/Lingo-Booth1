// Level 3 Cluster 6 — Position & Inversion
// Patterns: fronting, cleft sentences, inversion (negative-fronted), emphatic do/did.

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
  orientation: 'en-l3c6-orientation',
  overview: 'en-l3c6-overview',
  fronting: 'en-l3c6-fronting',
  cleft: 'en-l3c6-cleft',
  inversion: 'en-l3c6-inversion',
  emphaticDo: 'en-l3c6-emphatic-do',
  reading: 'en-l3c6-reading',
  speaking: 'en-l3c6-speaking',
  writing: 'en-l3c6-writing',
  task: 'en-l3c6-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'What you will be able to do',
    goals: ['Use fronting + inversion for emphasis ("Never have I seen…").', 'Form cleft sentences ("It was X that…" / "What X did was…").', 'Use emphatic "do/did + bare V" for confirmation.', 'Recognize advanced word-order options for stylistic effect.'],
    task: 'Picture writing a persuasive essay — your most important ideas need word-order emphasis.' },
  { id: ACT.overview, section: 'Patterns', title: 'Position + inversion overview',
    goals: ['Recognize 4 advanced word-order techniques.'],
    task: 'Map each pattern to its effect.' },
  { id: ACT.fronting, section: 'Pattern 1', title: 'Fronting — moving a phrase to the front',
    goals: ['"This book, I love." (fronted object).', '"In Seoul, life is fast." (fronted adverbial).', 'Use for topic introduction or emphasis.'],
    task: 'Front 3 phrases.' },
  { id: ACT.cleft, section: 'Pattern 2', title: 'Cleft sentences',
    goals: ['"It-cleft": "It was Sarah who called."', '"Wh-cleft": "What I need is a vacation."', '"All-cleft": "All I want is peace."'],
    task: 'Make 3 cleft sentences.' },
  { id: ACT.inversion, section: 'Pattern 3', title: 'Inversion after negative/limiting adverbs',
    goals: ['Never have I seen…', 'Rarely does she complain.', 'Not only did he X, but he also Y.', 'Hardly had I sat down when…'],
    task: 'Invert 3 sentences.' },
  { id: ACT.emphaticDo, section: 'Pattern 4', title: 'Emphatic "do/does/did + bare V"',
    goals: ['Confirm against doubt: "I DID call you."', '"He DOES love her." Stressed when spoken.'],
    task: 'Emphasize 3 sentences.' },
  { id: ACT.reading, section: 'Reading', title: 'Persuasive paragraph',
    goals: ['Read a paragraph using all 4 techniques.'],
    task: 'Label each technique.' },
  { id: ACT.speaking, section: 'Speaking', title: 'Make a passionate argument',
    goals: ['Use all 4 techniques in extended speech.'],
    task: 'Argue a point passionately.' },
  { id: ACT.writing, section: 'Writing', title: 'Persuasive paragraph',
    goals: ['Write a 5-sentence persuasive paragraph using all 4 techniques.'],
    task: 'Write your own.' },
  { id: ACT.task, section: 'Task', title: 'Closing argument',
    goals: ['Combine all 4 word-order techniques.'],
    task: 'Deliver a 90-second closing argument.' },
];

const lesson = {
  title: 'Level 3 · Cluster 6: Position & Inversion — fronting / cleft / inversion / emphatic do',
  category: 'daily-life',
  difficulty: 'advanced',
  targetLang: 'en', nativeLang: 'en',
  track: 'textbook', lessonType: 'grammar',
  activities,
  expressionPractice: [
    { id: 'cleft-sentences-en', label: 'Cleft sentences', goal: 'Use "It was X that…" / "What I need is…".' },
    { id: 'inversion-en', label: 'Negative inversion', goal: 'Use "Never have I…" / "Rarely does…".' },
    { id: 'emphatic-do-en', label: 'Emphatic do', goal: 'Confirm with "I DID call".' },
  ],
  relatedPools: ['topic-grammar'],
  content: [
    createContentItem('Lesson goal', 'position + inversion', 'By end: use 4 advanced word-order techniques for emphasis and style.', 'word', 'Functions: front · cleft · invert · confirm.', 'Four word-order micro-skills.', null, [ACT.orientation]),
    createContentItem('Real-world scenario', 'closing argument', 'You\'re wrapping up a debate at the Kumoh debate club. Your final 90 seconds must emphasize your strongest points. Word-order tricks help land them.', 'word', 'You: "Never have I seen evidence this strong. It was the data — not the rhetoric — that won this debate. And what we need now is action, not more analysis."', 'A classic closing-argument move.', null, [ACT.orientation]),

    createContentItem('Four word-order techniques', 'patterns', 'Fronting (move topic forward). Cleft (split sentence into two for emphasis). Inversion (subject-aux flip after negative adverb). Emphatic do (auxiliary insertion).', 'word', 'Each adds emphasis or style.', 'Mostly written / formal speech.', null, [ACT.overview]),

    createContentItem(
      'Fronting — moving a phrase to the front',
      'topic introduction',
      'Move object, complement, or adverbial to the start.',
      'sentence',
      'OBJECT FRONTING: That book, I love. (vs "I love that book.")\nADVERBIAL FRONTING: In Seoul, life is fast. (vs "Life is fast in Seoul.")\nCOMPLEMENT FRONTING: So heavy was the bag that she dropped it.',
      'Topic-comment structure; sets up what we\'re talking about.',
      [
        { target: 'object fronting', english: 'topic + comment' },
        { target: 'adverbial fronting', english: 'set scene first' },
        { target: 'complement fronting (formal)', english: 'literary' },
      ],
      [ACT.fronting],
    ),

    createContentItem(
      'It-cleft: "It was X that/who…"',
      'highlight one element',
      'Split sentence to emphasize a specific noun phrase.',
      'sentence',
      'Original: Sarah called me yesterday.\nIt-cleft (emphasize WHO): It was Sarah who called me yesterday. (not John)\nIt-cleft (emphasize WHEN): It was yesterday that Sarah called me. (not today)\nIt-cleft (emphasize OBJECT): It was me that Sarah called. (not John)',
      'Use to deny an assumption and highlight the true element.',
      [
        { target: 'It was + N + who/that + clause', english: 'highlight subject/object' },
        { target: 'It was + when/where + clause', english: 'highlight time/place' },
        { target: 'often denies an alternative', english: '"It was X, not Y"' },
      ],
      [ACT.cleft],
    ),
    createContentItem(
      'Wh-cleft: "What I need is…"',
      'highlight the rest',
      'Use "what + clause + is/was + X" to emphasize X.',
      'sentence',
      'Original: I need a vacation.\nWh-cleft: What I need is a vacation.\nOriginal: She wants honesty.\nWh-cleft: What she wants is honesty.',
      'Sets up an expectation, then delivers.',
      [
        { target: 'What + S + V + is/was + X', english: 'highlight X' },
        { target: 'What + S + did was + V', english: '"What I did was call her"' },
        { target: 'often in spoken emphasis', english: 'works in conversation too' },
      ],
      [ACT.cleft],
    ),
    createContentItem(
      'All-cleft + reverse cleft',
      'two more variants',
      'Variants for stronger emphasis.',
      'sentence',
      'All-cleft: All I want is peace. — All she did was apologize.\nReverse wh-cleft: A vacation is what I need. — Honesty is what she wants.',
      'Subtle differences: "all" implies "and nothing more"; reverse shifts emphasis to end.',
      [
        { target: 'All + S + V + is + X', english: 'X and nothing else' },
        { target: 'X is what + S + V', english: 'end-position emphasis' },
      ],
      [ACT.cleft],
    ),

    createContentItem(
      'Inversion after negative/limiting adverbs',
      'subject-aux flip',
      'After negative or limiting adverbs at the start, invert subject and auxiliary.',
      'sentence',
      'NEVER: Never have I seen anything like this.\nRARELY: Rarely does she complain.\nNOT ONLY: Not only did he apologize, but he also paid for damages.\nHARDLY/SCARCELY: Hardly had I sat down when the phone rang.\nNO SOONER: No sooner had we arrived than it started raining.',
      'Aux comes before subject — like a question. Used for dramatic emphasis.',
      [
        { target: 'Never + aux + S + V', english: 'strong negation' },
        { target: 'Rarely + aux + S + V', english: 'frequency limit' },
        { target: 'Not only + aux + S + V, but also', english: 'addition with emphasis' },
        { target: 'Hardly + had + S + PP + when', english: 'sequence of events' },
        { target: 'No sooner + had + S + PP + than', english: 'sequence of events' },
      ],
      [ACT.inversion],
    ),
    createContentItem(
      'Inversion in conditional',
      'omitting "if"',
      'In formal English, you can drop "if" and invert.',
      'sentence',
      'Had I known, I would have helped. (= If I had known…)\nWere I in your position, I would resign. (= If I were…)\nShould you need assistance, please call. (= If you should need…)',
      'Very formal — common in business / legal writing.',
      [
        { target: 'Had + S + PP', english: '= If + S + had + PP' },
        { target: 'Were + S + adj/N', english: '= If + S + were' },
        { target: 'Should + S + V', english: '= If + S + should + V' },
      ],
      [ACT.inversion],
    ),

    createContentItem(
      'Emphatic "do / does / did + bare V"',
      'confirm against doubt',
      'Insert auxiliary in affirmative sentences for emphasis.',
      'sentence',
      'You don\'t believe me, but I DID call you.\nShe doesn\'t love you? Yes, she DOES love you.\nI DO want to go — I just can\'t today.',
      'Stressed in speech; written in italics or caps.',
      [
        { target: 'I do/does/did + bare V', english: 'emphatic affirmation' },
        { target: 'use when contradicting doubt', english: 'context-dependent' },
        { target: 'stressed in speech', english: 'pitch + volume' },
      ],
      [ACT.emphaticDo],
    ),
    createContentItem(
      'Other emphatic moves',
      'beyond do',
      'Sentence-final emphasis and tag questions.',
      'sentence',
      'I love her, I do! (sentence-final emphasis)\nYou ARE coming, aren\'t you? (tag question for confirmation)\nIt\'s amazing, ISN\'T IT? (rising-tag emphasis)',
      'All add emotional weight in spoken English.',
      [
        { target: 'I love her, I do', english: 'sentence-final emphatic repeat' },
        { target: 'tag questions for emphasis', english: 'isn\'t it? right?' },
      ],
      [ACT.emphaticDo],
    ),

    createContentItem(
      'Persuasive paragraph',
      'reading practice',
      'Identify each word-order technique.',
      'sentence',
      'Climate action cannot wait. Never in human history have we faced a challenge this urgent. It is the science — not politics — that demands our attention. What we need is leadership, and what we need is it now. Not only must we cut emissions, but we must also invest in adaptation. Had governments acted in 1995, we would not be in this crisis. We DO have the technology. We DO have the resources. All that remains is the will to act.',
      'All 4 techniques used.',
      [
        { target: 'Never in human history have we faced', english: 'negative inversion' },
        { target: 'It is the science — not politics — that demands', english: 'it-cleft' },
        { target: 'What we need is leadership', english: 'wh-cleft' },
        { target: 'Not only must we …, but we must also', english: 'not-only inversion' },
        { target: 'Had governments acted in 1995', english: 'conditional inversion' },
        { target: 'We DO have the technology', english: 'emphatic do' },
        { target: 'All that remains is the will to act', english: 'all-cleft' },
      ],
      [ACT.reading],
    ),

    createContentItem(
      'Speaking — passionate argument',
      'extended turn',
      'Make a passionate case using all 4 techniques.',
      'sentence',
      'We must invest in education. Never have I seen a society thrive without it. It is teachers — not consultants — who shape our future. What this country needs is to pay them properly. We DO have the budget. The question is whether we have the will.',
      'Frame: thesis + inversion + cleft + wh-cleft + emphatic do.',
      null,
      [ACT.speaking],
    ),

    createContentItem(
      'Writing prompt',
      'persuasive paragraph',
      'Write a 5-sentence persuasive paragraph using all 4 techniques.',
      'sentence',
      'Example: Reading is a vanishing skill, and the loss matters. Rarely do we sit with a long argument anymore. It is the slow, careful kind of attention — not the scroll — that builds judgment. What we need is to reclaim that focus. We DO have the time; we just give it elsewhere. All we have to do is choose.',
      'Required: inversion + cleft + wh-cleft + emphatic do.',
      null, [ACT.writing],
    ),

    createContentItem(
      'Task: Closing argument',
      'consolidation task',
      'AI tutor gives you a debate topic. Deliver a 90-second closing argument using all 4 techniques.',
      'conversation',
      'Tutor: Closing argument on universal basic income.\nYou: [90 seconds: inversion + cleft + wh-cleft + emphatic do]\nTutor: [counter / Q]\nYou: [respond with another inversion or cleft]',
      'AI tutor plays the opposing side.',
      [
        { target: 'Never / Rarely + aux + S + V', english: 'inversion' },
        { target: 'It was X that …', english: 'it-cleft' },
        { target: 'What we need is …', english: 'wh-cleft' },
        { target: 'We DO have …', english: 'emphatic do' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
