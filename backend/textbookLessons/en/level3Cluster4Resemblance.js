// Level 3 Cluster 4 — Resemblance & Comparison
// Patterns: like / as / as if / as though / seem / appear / look like / sound like.

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
  orientation: 'en-l3c4-orientation',
  overview: 'en-l3c4-overview',
  likeAs: 'en-l3c4-likeas',
  asIfAsThough: 'en-l3c4-asif',
  seemAppear: 'en-l3c4-seem',
  senseVerbs: 'en-l3c4-senseverbs',
  comparison: 'en-l3c4-comparison',
  reading: 'en-l3c4-reading',
  speaking: 'en-l3c4-speaking',
  writing: 'en-l3c4-writing',
  task: 'en-l3c4-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'What you will be able to do',
    goals: ['Distinguish "like + N" (resemblance) from "as + clause" (manner).', 'Use "as if / as though" for hypothetical resemblance.', 'Use "seem / appear / look / sound / feel + adj/like" for perceptual hedging.'],
    task: 'Picture describing a celebrity sighting — your description needs metaphor, hypothetical resemblance, and perceptual hedges.' },
  { id: ACT.overview, section: 'Patterns', title: 'Resemblance pattern overview',
    goals: ['Recognize 4 layers of resemblance grammar.'],
    task: 'Match each pattern to its function.' },
  { id: ACT.likeAs, section: 'Pattern 1', title: '"like + N" / "as + clause" — comparison',
    goals: ['Use "like + N" for noun comparisons.', 'Use "as + S + V" or "as + adj/adv" for manner.', 'In casual English, "like" is creeping into clausal positions.'],
    task: 'Compare 3 things with each.' },
  { id: ACT.asIfAsThough, section: 'Pattern 2', title: '"as if / as though" — hypothetical resemblance',
    goals: ['Use "as if / as though + clause" for hypothetical comparison.', 'Past tense in the as-if clause = unreal.'],
    task: 'Make 3 hypothetical comparisons.' },
  { id: ACT.seemAppear, section: 'Pattern 3', title: '"seem / appear" — perceptual hedge',
    goals: ['"S + seem(s) + adj" / "seem to + V".', '"It seems that + clause".', '"Appear" — slightly more formal.'],
    task: 'Hedge 3 claims.' },
  { id: ACT.senseVerbs, section: 'Pattern 4', title: '"look / sound / feel / taste / smell + adj/like"',
    goals: ['Use sense verb + adj: "It looks tasty."', 'Use sense verb + "like + N": "It looks like rain."', 'Use sense verb + "as if + clause": "She looks as if she\'s tired."'],
    task: 'Describe 3 sense impressions.' },
  { id: ACT.comparison, section: 'Comparison', title: 'When to use which',
    goals: ['Pick the right pattern by what follows.'],
    task: 'Disambiguate 5 examples.' },
  { id: ACT.reading, section: 'Reading', title: 'A celebrity sighting story',
    goals: ['Read a description using all 4 patterns.'],
    task: 'Label each pattern.' },
  { id: ACT.speaking, section: 'Speaking', title: 'Describe a person/place',
    goals: ['Describe vividly using all 4 patterns.'],
    task: 'Describe a famous place you\'ve seen.' },
  { id: ACT.writing, section: 'Writing', title: 'Descriptive paragraph',
    goals: ['Write a 5-sentence descriptive paragraph using all 4 patterns.'],
    task: 'Write your own.' },
  { id: ACT.task, section: 'Task', title: 'Vivid description',
    goals: ['Combine all 4 patterns in extended speech.'],
    task: 'Describe a person/scene with the AI tutor.' },
];

const lesson = {
  title: 'Level 3 · Cluster 4: Resemblance — like / as / as if / seem / look like',
  category: 'daily-life',
  difficulty: 'advanced',
  targetLang: 'en', nativeLang: 'en',
  track: 'textbook', lessonType: 'grammar',
  activities,
  expressionPractice: [
    { id: 'like-as-en', label: 'Like vs as', goal: 'Pick "like + N" or "as + clause" correctly.' },
    { id: 'as-if-en', label: 'As if / as though', goal: 'Use for hypothetical resemblance.' },
    { id: 'sense-verbs-en', label: 'Sense verbs', goal: 'Use "look / sound / feel + adj / like / as if".' },
  ],
  relatedPools: ['topic-grammar'],
  content: [
    createContentItem('Lesson goal', 'resemblance', 'By end: use 4 layers of resemblance + perceptual hedge grammar.', 'word', 'Functions: compare · hypothesize · hedge · describe.', 'Four resemblance micro-skills.', null, [ACT.orientation]),
    createContentItem('Real-world scenario', 'celebrity sighting', 'You think you spotted Taylor Swift at a cafe. You\'re not sure. You text a friend hedging your description.', 'word', 'You: "I think I saw Taylor Swift at the cafe — she looked like her, dressed as if she was hiding. It seemed too coincidental."', 'Standard hedged description.', null, [ACT.orientation]),

    createContentItem('Four resemblance layers', 'patterns', 'Like + N (noun comparison). As + clause (manner/comparison). As if/as though + clause (hypothetical resemblance). Sense verb + complement (perceptual).', 'word', 'Each takes a different complement.', 'Match by what follows.', null, [ACT.overview]),

    createContentItem(
      '"like + N" — noun comparison',
      'simile / metaphor',
      'Compare to a noun or noun phrase.',
      'sentence',
      'She sings like an angel. — He eats like a horse. — This soup tastes like nothing I\'ve ever had.',
      '"Like" — preposition; followed by noun phrase (NOT a full clause in formal English).',
      [
        { target: 'like + N (formal)', english: 'noun comparison' },
        { target: 'like + S + V (casual only)', english: 'gaining ground but informal' },
        { target: 'NOT in academic writing', english: 'use "as" instead' },
      ],
      [ACT.likeAs],
    ),
    createContentItem(
      '"as + clause" / "as + adj/adv" — manner',
      'manner or extent',
      'Take a clause or an adjective/adverb.',
      'sentence',
      'Do as I say, not as I do. — She runs as fast as her brother. — As you can see, the result is clear.',
      '"As" — conjunction; followed by a clause. In casual English, "like" can replace it ("like I said"), but "as" is correct.',
      [
        { target: 'as + S + V', english: 'manner with clause' },
        { target: 'as + adj + as + N', english: 'equality comparison' },
        { target: 'as + adv + as + N', english: 'manner equality' },
        { target: 'as you know / as I said', english: 'fixed reference phrases' },
      ],
      [ACT.likeAs],
    ),

    createContentItem(
      '"as if / as though + clause"',
      'hypothetical comparison',
      'Sounds like X, but might not be X.',
      'sentence',
      'She looks as if she\'s seen a ghost. — He acts as though he owns the place. — It feels as if winter will never end.',
      'Past tense in the as-if clause signals counterfactual: "He talks as if he WERE in charge" (he isn\'t).',
      [
        { target: 'as if + present', english: 'real perception' },
        { target: 'as if + past', english: 'counterfactual perception' },
        { target: 'as though = as if', english: 'identical, slightly more formal' },
      ],
      [ACT.asIfAsThough],
    ),

    createContentItem(
      '"seem / appear" — perceptual hedge',
      'soften a claim',
      'State something as appearance, not fact.',
      'sentence',
      'She seems tired. — He seems to be working hard. — It seems that we lost. — They appear to be on the same team.',
      '"Appear" — slightly more formal. "Seem to + V" — Verb form. "It seems that + clause" — impersonal.',
      [
        { target: 'S + seem(s) + adj', english: 'subject + appearance' },
        { target: 'S + seem(s) to + V', english: 'subject + apparent action' },
        { target: 'It seems that + S + V', english: 'impersonal hedge' },
        { target: 'appear (more formal)', english: 'same meaning, formal' },
      ],
      [ACT.seemAppear],
    ),

    createContentItem(
      'Sense verbs + adj / like / as if',
      'perceptual description',
      'Five sense verbs: look, sound, feel, taste, smell.',
      'sentence',
      'WITH ADJ: It looks tasty. — She sounds happy. — The fabric feels soft.\nWITH "LIKE + N": It tastes like chicken. — He sounds like his father. — It looks like rain.\nWITH "AS IF + CLAUSE": She looks as if she\'s tired. — It sounds as if you\'re upset.',
      'Same 5 sense verbs work with all three patterns.',
      [
        { target: 'sense verb + adjective', english: 'direct description' },
        { target: 'sense verb + like + N', english: 'comparison to a noun' },
        { target: 'sense verb + as if + clause', english: 'comparison to a hypothetical state' },
      ],
      [ACT.senseVerbs],
    ),

    createContentItem(
      'When to use which',
      'cheat sheet',
      'By what follows.',
      'sentence',
      'Noun? → like + N ("like her dad").\nFull clause? → as + S + V ("as I said") OR as if + S + V (hypothetical).\nAdjective? → seem + adj / look + adj.\nUncertain perception? → "It seems that + clause" or "as if + clause".',
      'Choose by complement type, not "what sounds right".',
      [
        { target: 'noun → like', english: 'noun complement' },
        { target: 'clause manner → as', english: 'clause complement' },
        { target: 'hypothetical → as if', english: 'unreal complement' },
        { target: 'adjective → seem/look + adj', english: 'adjective complement' },
      ],
      [ACT.comparison],
    ),

    createContentItem(
      'Celebrity sighting story',
      'reading practice',
      'Identify each resemblance pattern.',
      'sentence',
      'I think I saw Taylor Swift at the cafe yesterday. She looked just like her — same cat-eye eyeliner, same posture. She was dressed as if she was trying not to be noticed: huge sunglasses, a hood. It seemed too coincidental. She sounded like her too, with that slight Tennessee twang. I would have said hello, but she appeared to be in a hurry. As I left, I caught one more glimpse — and she really did look as though she\'d been crying.',
      'All 4 resemblance patterns.',
      [
        { target: 'looked just like her', english: 'sense verb + like + N' },
        { target: 'dressed as if she was trying', english: 'as if + clause' },
        { target: 'It seemed too coincidental', english: 'seem + adj' },
        { target: 'sounded like her', english: 'sense verb + like + N' },
        { target: 'appeared to be in a hurry', english: 'appear + to + V' },
        { target: 'as though she\'d been crying', english: 'as though + past perfect (counterfactual)' },
      ],
      [ACT.reading],
    ),

    createContentItem(
      'Speaking — describe a place',
      'extended turn',
      'Describe a famous place vividly.',
      'sentence',
      'The Grand Canyon looks like nothing else on Earth. When you first see it, it seems impossible — too vast to be real. The light shifts so quickly that the rocks appear to change color every hour. It feels as if time slows down at the edge. I\'d been told it was big, but seeing it for myself was like meeting an old friend you only knew through photos.',
      'Frame: simile + seem + sense verb + as if + simile.',
      null,
      [ACT.speaking],
    ),

    createContentItem(
      'Writing prompt',
      'descriptive paragraph',
      'Write a 5-sentence descriptive paragraph using all 4 resemblance patterns.',
      'sentence',
      'Example: My grandmother was like a force of nature — fiercely tender, ruthlessly kind. She moved as if she was always running late for somewhere important. She seemed to know what I needed before I asked. Her hands looked like maps of every garden she had ever tended. She felt as though she would live forever — though of course she didn\'t.',
      'Required: like + N, as if + clause, seem + adj, sense verb + complement.',
      null, [ACT.writing],
    ),

    createContentItem(
      'Task: Vivid description',
      'consolidation task',
      'AI tutor asks you to describe a person, place, or scene. Use all 4 patterns.',
      'conversation',
      'Tutor: Describe someone who changed your life.\nYou: [opening with "like + N"]\nTutor: How did they make you feel?\nYou: [sense verb + as if]\nTutor: What stood out?\nYou: [seem + adj]\nTutor: [closing]',
      'AI tutor plays your audience.',
      [
        { target: 'like + N', english: 'noun simile' },
        { target: 'as if / as though + clause', english: 'hypothetical comparison' },
        { target: 'seem / appear + adj/to + V', english: 'perceptual hedge' },
        { target: 'sense verb + adj/like/as if', english: 'perceptual description' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
