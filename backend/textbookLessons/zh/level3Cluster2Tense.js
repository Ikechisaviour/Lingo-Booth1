// Level 3 Cluster 2 — Advanced Aspect & Time Reference (Mandarin Chinese)
// Mandarin has NO tense conjugation — instead it uses ASPECT markers
// (了 / 过 / 在 / 着) combined with time words. This cluster deepens
// Level 1's introductory exposure to 了/过/在 into the full aspect system,
// covering perfective, experiential, progressive/durative, imminent, and
// habitual aspect, plus the "narrative present" trick used in past stories.
//
// All content is authored with Hanzi (target) + Pinyin (romanization) +
// English glosses (canonical source). The AI conversation tutor reads this
// curriculum and delivers it to each learner in their preferred native
// language at runtime — never assume a specific L1 in this file.
//
// Glosses follow the rich-gloss rule (AGENTS.md → "Gloss Richness"):
// every nativeText, exampleNative, and breakdown.native carries register,
// usage context, or contrast info — not a bare definition.

const createContentItem = (
  target,
  pinyin,
  note,
  type = 'word',
  example = '',
  exampleNote = '',
  breakdown = null,
  activityIds = [],
) => ({
  type,
  activityIds,
  targetText: target,
  romanization: pinyin,
  nativeText: note,
  pronunciation: pinyin,
  exampleTarget: example || target,
  exampleNative: exampleNote || note,
  korean: target,
  english: note,
  example: example || target,
  exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  orientation: 'zh-l3c2-orientation',
  pronunciation: 'zh-l3c2-pronunciation',
  completedLe: 'zh-l3c2-completed-le',
  experientialGuo: 'zh-l3c2-experiential-guo',
  progressiveZai: 'zh-l3c2-progressive-zai',
  durativeZhe: 'zh-l3c2-durative-zhe',
  imminent: 'zh-l3c2-imminent',
  habitual: 'zh-l3c2-habitual-narrative',
  grammarStacking: 'zh-l3c2-grammar-stacking',
  grammarNegation: 'zh-l3c2-grammar-negation',
  grammarTimeWords: 'zh-l3c2-grammar-time-words',
  culture: 'zh-l3c2-culture',
  task: 'zh-l3c2-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do — aspect over tense',
    goals: [
      'Understand that Mandarin verbs do NOT conjugate for tense — the same form 看 (kàn, "look") is used for past, present, and future, and the time anchor comes from time words and aspect markers.',
      'Identify the five core aspect markers and what each one signals: 了 (completion), 过 (experiential "ever done"), 在/正在 (in-progress action), 着 (continuous state), and 快/就要…了 (imminent "about to").',
      'Read a Mandarin narrative and decide which English tense matches each verb by reading the time words around it — not by looking for a verb ending.',
    ],
    task: 'Picture yourself writing about your first semester at Tsinghua University in Mandarin: by the end of this cluster you should be able to say what you have done, what you used to do, what you are doing right now, what you are about to do, and what you do every day — all without changing the verb form, only the surrounding aspect markers and time words.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Neutral-tone aspect markers and the polyphonic characters 过 / 着',
    goals: [
      'Pronounce the four aspect markers 了 (le), 过 (guo), 着 (zhe) with neutral tone — short, light, unstressed — when they attach to a verb. Stressing them as full tones turns them back into full content words (过 guò "to pass" / 着 zháo "to ignite" / 着 zhuó "to wear").',
      'Distinguish the polyphonic readings of 过: guò (full 4th tone, verb "to pass/cross") vs guo (neutral tone, experiential aspect marker). Same character, two grammatical roles, two pronunciations.',
      'Distinguish the three readings of 着: zhe (neutral, durative aspect marker), zháo (2nd tone, "to ignite / to fall asleep"), zhuó (2nd tone, "to wear"). The aspect marker is always neutral — getting the tone wrong changes the word entirely.',
      'Pronounce the high-frequency time-anchoring adverbs 已经 (yǐjīng), 始终 (shǐzhōng), 从来 (cónglái) cleanly — they are critical for narrating without aspect markers.',
    ],
    task: 'Read each marker out loud paired with a verb (吃了 chī le, 去过 qù guo, 坐着 zuò zhe), then read the same character as a content word (过 guò, 着 zháo / zhuó) and feel the tone shift.',
  },
  {
    id: ACT.completedLe,
    section: 'Aspect I',
    title: '了 (LE) — Completion / Perfective Aspect',
    goals: [
      'Distinguish verb-final 了 (V-le: marks the verb itself as completed) from sentence-final 了 (le at the end of a clause: marks a new state or "currently relevant" change).',
      'Use the double-了 construction (V-了 … 了) to signal "have done X and the situation is currently relevant" — e.g., 我吃了三碗饭了 ("I have eaten three bowls — and that\'s a lot / I\'m full").',
      'Recognize when 了 is OBLIGATORILY dropped: with habitual actions, with stative verbs (是, 有, 喜欢), in the negation 没 V, and in narrative-present storytelling.',
      'Avoid the most common error: using 了 with EVERY past-tense English sentence. Mandarin 了 is about COMPLETION as an aspect, not "past" as a tense.',
    ],
    task: 'Convert five English past-tense sentences to Mandarin, deciding for each one whether to use verb-final 了, sentence-final 了, both, or neither — then explain the choice for each.',
  },
  {
    id: ACT.experientialGuo,
    section: 'Aspect II',
    title: '过 (GUO) — Experiential Aspect "ever done"',
    goals: [
      'Use 过 to assert that the subject has the EXPERIENCE of doing V at some point in their life — without specifying when, how many times, or whether they would do it again. 我去过北京 ("I have been to Beijing [at some point]").',
      'Contrast 过 with 了: 我吃了 ("I ate [a specific completed action]") vs 我吃过 ("I have eaten [this kind of thing before, ever in my life]"). 过 is the English present-perfect-experiential "have you ever…?" sense; 了 is the simple "did/has-done".',
      'Form the negation 没 V 过 ("have never V-ed") — critical pattern. Note: the 没 + 过 combination is grammatical and very frequent, unlike the ungrammatical 没…了.',
      'Use 过 to ask about life experience: 你去过中国吗? ("Have you ever been to China?"), 你吃过北京烤鸭吗? ("Have you ever eaten Peking duck?").',
    ],
    task: 'Ask three classmates about their life experiences using 过 questions; reply with either 去过 / 吃过 / 看过 (affirmative) or 没去过 / 没吃过 / 没看过 (negative). Notice that you NEVER use 了 in these answers.',
  },
  {
    id: ACT.progressiveZai,
    section: 'Aspect III',
    title: '在 / 正在 / 正 — Progressive Aspect "in the middle of V-ing"',
    goals: [
      'Use 在 V before a verb to signal that the action is in progress right now: 我在吃饭 ("I am eating [right now]"). The English "-ing" of the present continuous, but applicable to past/future too with the right time word.',
      'Use 正在 V for slightly stronger "right now, at this very moment" emphasis: 他正在打电话 ("He is on the phone at this moment"). 正在 is more vivid than plain 在.',
      'Use 正 V alone (without 在) in slightly literary or written register: 雨正下着 ("rain is just now falling"). Less common in everyday speech.',
      'Combine progressive with optional sentence-final 呢: 我在看书呢 ("I am reading [right now]"). The 呢 softens the statement and reinforces "currently".',
    ],
    task: 'Describe a scene unfolding in real time using three progressive sentences (people doing different things in a campus cafe), then re-cast each sentence with 正在 + 呢 to compare emphasis.',
  },
  {
    id: ACT.durativeZhe,
    section: 'Aspect IV',
    title: '着 (ZHE) — Durative / Stative Aspect "in the state of"',
    goals: [
      'Distinguish 着 from 在: 在 V describes an ONGOING ACTION ("he is reading"); V 着 describes a HELD STATE or POSTURE resulting from an action ("he is in a sitting position / sitting there"). Same English "-ing" translation, very different aspect.',
      'Use V 着 for postures and held states: 坐着 (sitting), 站着 (standing), 躺着 (lying down), 拿着 (holding), 戴着 (wearing). These are not actions in progress — they are static conditions.',
      'Stack 着 in serial-verb sequences "V1 着 V2" to mean "do V2 while in the state of V1": 站着吃饭 ("eat while standing"), 听着音乐写作业 ("do homework while listening to music"), 笑着说 ("say with a smile").',
      'Recognize the special pattern V 着 V 着 + clause = "kept V-ing and then suddenly…" — e.g., 看着看着就睡着了 ("I kept watching [TV] and ended up falling asleep"). A very common spoken pattern.',
    ],
    task: 'Describe a still photograph (your dorm room, a campus scene) using five V 着 sentences for the static elements (someone sitting, someone holding a book, a light being on); then write one V 着 V 着 sentence for an action that drifted into another.',
  },
  {
    id: ACT.imminent,
    section: 'Aspect V',
    title: '快…了 / 就要…了 / 将要 — Imminent Aspect "about to V"',
    goals: [
      'Use 快 V 了 for "about to V, very soon, often emotionally noted" — 火车快到了 ("the train is about to arrive!"), 我快饿死了 ("I\'m about to starve!"). The most colloquial of the three.',
      'Use 就要 V 了 for "about to V, fixed time, slightly more definite" — 我就要毕业了 ("I am about to graduate [it\'s scheduled]"). Often paired with a specific time: 明年就要毕业了.',
      'Use 将要 V or 将 V for "will V, formal / written / news register" — 国家主席将访问北京 ("The President will visit Beijing"). Almost never used in casual speech.',
      'Note the obligatory sentence-final 了 in 快…了 and 就要…了 — without it the sentence feels incomplete. With 将要, no 了 is needed (it is purely a future adverb, not an aspect construction).',
    ],
    task: 'Pick three events expected soon in your life (an exam, a holiday, graduation, the start of a class) and describe each with all three patterns in turn — feel the register shift from colloquial 快 to neutral 就要 to formal 将要.',
  },
  {
    id: ACT.habitual,
    section: 'Aspect VI',
    title: 'Plain verb — Habitual aspect & narrative present',
    goals: [
      'Use the plain verb form (no aspect marker at all) for habitual / general actions: 我每天喝咖啡 ("I drink coffee every day"), 他喜欢看电影 ("he likes watching movies"), 鸟会飞 ("birds fly"). Aspect markers would make these wrong.',
      'Use the plain verb form in NARRATIVE PAST without 了 — the "narrative present" trick where time words anchor the past and verbs stay bare: 昨天我去图书馆，借了一本书，然后回家 ("Yesterday I went to the library, borrowed a book, then went home"). Only the consequential action 借 takes 了; the framing verbs stay bare.',
      'Avoid the beginner overuse of 了 on every past-time verb. In a five-verb narrative paragraph, typically only ONE or TWO verbs need 了 — the rest ride on the time word 昨天 / 上周 / 那天.',
      'Recognize that descriptions of past habits (used-to-do) ALSO take no 了: 那时候我每天跑步 ("at that time I ran every day") — habitual aspect overrides any past-time anchor.',
    ],
    task: 'Read a five-sentence Mandarin narrative paragraph and identify which verbs carry 了, which carry 过, and which are bare; explain why each verb is or is not marked.',
  },
  {
    id: ACT.grammarStacking,
    section: 'Grammar I',
    title: 'Stacking aspects — combining 了 / 过 / 着 in one clause',
    goals: [
      'Stack perfective + quantified result: V 了 [number+measure word+noun] — 看了三本书 ("read three books"), 写了两个小时 ("wrote for two hours"). Verb-final 了 plus a quantified object is one of the most natural completion patterns.',
      'Stack durative + completion in the V 着 V 着 + 就 + V 了 construction: 看着看着就睡着了 ("kept watching and ended up falling asleep"). Two 着 in a row (durative) → 就 (suddenly) → V 了 (completed result).',
      'Recognize that 在 V and V 着 can co-occur in narrative scene-setting: 他在房间里坐着，正在看书 ("He was sitting in his room, reading") — 着 describes the posture, 在/正在 describes the simultaneous action.',
      'Avoid the error of stacking 了 + 过 on the same verb. 吃了过 / 吃过了 in this sense is wrong. Each aspect has its own slot; pick the one that matches your meaning.',
    ],
    task: 'Combine perfective and durative in three sentences about a single past evening (you came home, sat on the couch, watched TV for two hours, and fell asleep) — use V 了, V 着, and the V 着 V 着 pattern in turn.',
  },
  {
    id: ACT.grammarNegation,
    section: 'Grammar II',
    title: 'Negation of aspect — 没 V (no 了 !) and 还没 V',
    goals: [
      'Use 没 V (NOT 没 V 了) to negate a completed action. 没 V is the perfective negation and CANCELS the 了 — the combination 没…了 is ungrammatical. 我没吃 ("I didn\'t eat" / "haven\'t eaten"), NOT 我没吃了.',
      'Use 还没 V to mean "haven\'t V-ed yet" — implies the action is still expected. 我还没吃 ("I haven\'t eaten yet"). Frequently paired with sentence-final 呢: 我还没吃呢.',
      'Use 没 V 过 ("have never V-ed") for the negative of experiential aspect — the 过 stays even in negation, unlike 了. 我没去过北京 ("I have never been to Beijing").',
      'Use 不 V (not 没 V) for present, future, habitual, and stative negation. The 不/没 split tracks the aspect: 没 = perfective/experiential, 不 = everything else.',
    ],
    task: 'For each of five English negative sentences (I didn\'t eat / I haven\'t eaten yet / I have never eaten that / I don\'t eat / I won\'t eat), pick the correct Mandarin negation 没 V / 还没 V / 没 V 过 / 不 V — explain why.',
  },
  {
    id: ACT.grammarTimeWords,
    section: 'Grammar III',
    title: 'Time-anchoring adverbs — 已经 / 刚才 / 一直 / 始终 / 从来',
    goals: [
      'Use 已经 (yǐjīng, "already") to anchor a completed change with relevance to now: 我已经吃了 ("I have already eaten"). Almost always paired with a 了 somewhere in the clause.',
      'Use 刚才 (gāngcái, "just a moment ago") to anchor a recent past action: 他刚才打电话给我 ("he called me just now"). Typically NO 了 needed because 刚才 itself fixes the past time.',
      'Use 一直 (yìzhí, "continuously / all along") to describe an action that has been going on without break: 我一直在等你 ("I have been waiting for you the whole time"). Pairs with 在 V or with a duration.',
      'Use 始终 (shǐzhōng, "from start to finish / always") in slightly formal register for a stance held throughout a period: 他始终支持我 ("he has supported me from start to finish"). More literary than 一直.',
      'Use 从来 (cónglái, "ever / at any time", almost always negative) with 没 V 过 to mean "have never V-ed in all my life": 我从来没去过 ("I have never been there, ever"). The intensified version of plain 没 V 过.',
    ],
    task: 'Rewrite five plain past-tense sentences by adding one anchoring adverb to each (已经 / 刚才 / 一直 / 始终 / 从来) and observing how the 了 / 过 marker adjusts to match.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: 'Why English speakers and Chinese speakers trip over each other\'s time systems',
    goals: [
      'Understand why Chinese learners of English struggle with English tense: their L1 has no verb-final tense morphology — every English -ed, will V, has V-ed must be added consciously, when the Mandarin habit is to add a time word instead.',
      'Understand why English learners of Mandarin struggle with aspect: they look for a "past tense" marker and grab 了, overusing it on every past-time verb. The truth is subtler — aspect is about completion, experience, or state, not about WHEN.',
      'Recognize the brief historical arc: Classical Chinese (古汉语) had even fewer aspect markers — 了 / 过 / 着 only stabilized as grammatical markers from the late Tang and Song dynasties onward. Modern Mandarin (现代汉语) inherits a system that has been refined for about a thousand years.',
    ],
    task: 'Read two short translation pairs (English with tense → Mandarin with aspect + time word) and write a one-sentence summary of the strategy difference for each.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'Convert and narrate — Past in English, Aspect in Chinese',
    goals: [
      'Convert five English past-tense sentences into Chinese with the correct aspect marker for each (some take 了, some take 过, some take no marker at all because the time word does the job).',
      'Read a Mandarin narrative paragraph and identify, for every verb, which aspect marker (if any) it carries and what that marker signals about completion / experience / state / habit.',
    ],
    task: 'Complete the conversion exercise and the parsing exercise in sequence; defend each choice in one sentence so the AI tutor can check your reasoning, not just your output.',
  },
];

const lesson = {
  title: 'Level 3 · Cluster 2: Advanced Aspect & Time Reference (了 / 过 / 在 / 着 / 快…了)',
  category: 'daily-life',
  difficulty: 'advanced',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'grammar',
  activities,
  expressionPractice: [
    { id: 'marking-completion', label: 'Marking completion', goal: 'Pick between verb-final 了, sentence-final 了, double-了, or NO 了 by reading whether the focus is the completed action, the new state, or a habitual action.' },
    { id: 'asking-life-experience', label: 'Asking about life experience', goal: 'Use V 过 questions and 没 V 过 negatives to ask "have you ever…?" and answer "I have / I have never".' },
    { id: 'describing-in-progress', label: 'Describing what is in progress', goal: 'Choose between 在 V (action unfolding) and V 着 (posture/state held) and stack them when both apply to the same scene.' },
    { id: 'flagging-imminent', label: 'Flagging an imminent event', goal: 'Pick the register-appropriate "about to V" pattern: colloquial 快…了, neutral 就要…了, or formal/written 将要.' },
    { id: 'anchoring-with-time-words', label: 'Anchoring with time adverbs', goal: 'Use 已经 / 刚才 / 一直 / 始终 / 从来 to fix the time reference without relying solely on aspect markers.' },
  ],
  relatedPools: ['pos-verbs-2', 'topic-time'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '汉语没有时态',
      'Hànyǔ méiyǒu shítài',
      'Mandarin has NO tense conjugation. The same verb form 看 (kàn, "look") is used whether the action is past, present, or future — context is built up by aspect markers (了 / 过 / 在 / 着) and time words (昨天, 现在, 明天). This is the single biggest mental shift for English speakers learning Chinese.',
      'word',
      '我昨天看电影 ("I watched a movie yesterday") · 我现在看电影 ("I am watching a movie now") · 我明天看电影 ("I will watch a movie tomorrow")',
      'Same verb 看 in all three; only the time word changes — no -ed, no will, no -ing on the verb itself.',
      [
        { target: '昨天 zuótiān', note: '"yesterday" — the time word, not the verb, signals past' },
        { target: '现在 xiànzài', note: '"now" — anchors present' },
        { target: '明天 míngtiān', note: '"tomorrow" — anchors future' },
        { target: '看 kàn (unchanged)', note: 'the verb stays bare in all three — no conjugation' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '体貌系统',
      'tǐmào xìtǒng — the aspect system',
      'Mandarin\'s grammar of time is built on ASPECT (how an action unfolds — completed, experienced, in-progress, held as a state, about to happen, habitual) rather than tense (when the action occurs). Five core aspect markers cover the system: 了, 过, 在, 着, and 快…了.',
      'word',
      '了 (completion) · 过 (experiential) · 在 (in-progress) · 着 (durative state) · 快…了 (imminent)',
      'Each marker answers a different question — "is the action done?" "has the subject ever experienced it?" "is it unfolding right now?" "is it a posture being held?" "is it about to happen?" — and tense is a side-effect of which one you pick plus the time word.',
      [
        { target: '了 le (perfective)', note: 'the action is COMPLETED; can be past, future-perfective, or sequence-step depending on context' },
        { target: '过 guo (experiential)', note: 'the subject HAS THE EXPERIENCE of doing the action at some point in their life' },
        { target: '在 / 正在 zài / zhèngzài (progressive)', note: 'the action is IN PROGRESS; mid-stream rather than completed' },
        { target: '着 zhe (durative)', note: 'a STATE or POSTURE is being held; static rather than dynamic' },
        { target: '快/就要 V 了 (imminent)', note: 'the action is ABOUT TO HAPPEN; very soon' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '目标场景',
      'mùbiāo chǎngjǐng',
      'Target scenario: writing a paragraph about your first semester at Tsinghua University. By the end of this cluster you can express what you DID (了), what you HAVE EVER DONE (过), what you ARE DOING (在), what you ARE IN A STATE OF (着), what you ARE ABOUT TO DO (快…了), and what you DO HABITUALLY (no marker) — all using the same verb forms and switching only the surrounding aspect/time apparatus.',
      'word',
      '在清华的第一个学期，我学了很多东西。我去过故宫，吃过北京烤鸭。现在我正在写论文。 ("In my first semester at Tsinghua, I learned many things. I have been to the Forbidden City, eaten Peking duck. Right now I am writing my thesis.")',
      'Notice the same paragraph carries past (学了), experiential (去过, 吃过), and progressive (正在写) — three different aspects all anchored to "first semester at Tsinghua" by the opening time phrase.',
      null,
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '了',
      'le (neutral tone)',
      'The aspect marker 了 is pronounced with NEUTRAL TONE — short, light, unstressed — when it attaches to a verb or sits at the end of a clause as an aspect particle. Pinyin transcription is "le" with no tone mark. Stressing it as 4th tone (liǎo, "to finish") turns it back into a content word.',
      'word',
      '吃了 chī le ("ate") · 走了 zǒu le ("left") · 我饿了 wǒ è le ("I\'m hungry now")',
      'Always whispered, never stressed; the next word usually carries the prosodic weight.',
      [
        { target: '了 le (neutral, aspect marker)', note: 'the grammatical particle for completion / change of state; always short and unstressed' },
        { target: '了 liǎo (3rd tone, content word)', note: '"to finish / to be able to" — a full verb; appears in fixed forms like 了不起 (liǎobuqǐ, "amazing")' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '过',
      'guo (neutral) vs guò (4th tone)',
      'The character 过 is polyphonic. As an aspect marker (experiential "ever done"), it is pronounced "guo" with neutral tone, short and light. As a full content verb meaning "to pass / to cross / to spend (time)", it is pronounced "guò" with full 4th tone. Confusing the two distorts the meaning.',
      'word',
      '吃过 chī guo ("have eaten [ever]") vs 过马路 guò mǎlù ("cross the street") vs 过年 guò nián ("spend / celebrate New Year")',
      'Aspect marker = neutral and quiet; content verb = full 4th tone and stressed.',
      [
        { target: '过 guo (neutral, aspect marker)', note: 'attaches after a verb to mean "has the experience of V-ing"; always neutral and short' },
        { target: '过 guò (4th tone, content verb)', note: '"to pass / to cross / to spend"; full sharp falling tone' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '着',
      'zhe (neutral) vs zháo / zhuó (2nd tone)',
      'The character 着 has THREE pronunciations. As an aspect marker (durative), it is "zhe" with neutral tone, short and light. As a content verb "to ignite / to catch fire / to fall asleep", it is "zháo" with 2nd (rising) tone. As a content verb "to wear / to put on", it is "zhuó" with 2nd tone. The aspect marker is always neutral — getting the tone wrong changes the word.',
      'word',
      '坐着 zuò zhe ("sitting [posture]") vs 着火 zháo huǒ ("catch fire") vs 睡着 shuì zháo ("fall asleep") vs 着装 zhuózhuāng ("attire")',
      'Three readings of the same character with three distinct grammatical roles; mastering this contrast is a Level-3 skill.',
      [
        { target: '着 zhe (neutral, aspect marker)', note: 'durative aspect: signals a held state or posture; always neutral' },
        { target: '着 zháo (2nd, content verb)', note: '"to ignite / to fall asleep"; used in 睡着 (fall asleep), 着急 (zháojí, anxious), 着火 (catch fire)' },
        { target: '着 zhuó (2nd, content verb)', note: '"to wear / to apply"; used in 着装 (attire), 着色 (apply color); rarer in casual speech' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '在 / 正在',
      'zài / zhèngzài',
      'The progressive markers 在 (zài, 4th tone) and 正在 (zhèngzài, 4th + 4th) are NOT neutral — they carry their full tones and are pronounced clearly. This is because they are pre-verbal adverbs (placed BEFORE the verb), not post-verbal particles like 了 / 过 / 着.',
      'word',
      '我在吃饭 wǒ zài chīfàn ("I\'m eating") · 他正在打电话 tā zhèngzài dǎ diànhuà ("he\'s on the phone right now")',
      'Stress 在/正在 fully; do NOT weaken them like the post-verbal aspect markers.',
      [
        { target: '在 zài (4th tone)', note: 'general progressive; appears before the verb' },
        { target: '正在 zhèngzài (4th + 4th)', note: 'strong "right now at this moment" emphasis; both syllables stressed' },
        { target: '正 zhèng (4th tone, alone)', note: 'literary / written progressive; 雨正下 ("rain is just now falling")' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '已经 / 始终',
      'yǐjīng / shǐzhōng',
      'Two high-frequency time-anchoring adverbs critical for narrating without aspect markers. 已经 (yǐjīng, 3rd + 1st, "already") is everyday register; 始终 (shǐzhōng, 3rd + 1st, "from start to finish / always") is slightly formal/literary. Both apply 3rd-tone sandhi: 已 becomes rising (yí) before 经.',
      'word',
      '已经 yǐjīng → spoken yíjīng (sandhi) · 始终 shǐzhōng → spoken shízhōng (sandhi)',
      'Both undergo 3rd-tone sandhi because the first syllable is 3rd tone followed by a non-3rd tone — wait, technically 已 is 3rd and 经 is 1st, so 已 keeps 3rd; but in fast speech the dip-and-rise reduces.',
      [
        { target: '已经 yǐjīng', note: '"already"; pairs with 了 in completed-with-relevance sentences' },
        { target: '始终 shǐzhōng', note: '"throughout / from start to finish"; formal/literary; pairs with stative or attitudinal verbs' },
        { target: '从来 cónglái', note: '"ever / at any time" — 2nd + 2nd tones; almost always paired with 没…过 for the strong "never" sense' },
        { target: '一直 yìzhí', note: '"continuously" — 1st (after sandhi from yī) + 2nd; pairs with 在 V for ongoing actions' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Completed (了)
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '动词后的 了',
      'verb-final 了 — V-le',
      'Verb-final 了 attaches directly to the verb and marks THE ACTION as completed. It often pairs with a quantified object (V-了 [number+measure word+noun]) or a sequence step. 我吃了三碗饭 ("I ate three bowls of rice"). The focus is on the completion of the verb itself.',
      'sentence',
      '我吃了一个苹果 ("I ate an apple") · 他买了三本书 ("he bought three books") · 我看了那个电影 ("I watched that movie")',
      'The pattern V-了 + quantified-object is the most natural single-action completion structure; ungrammatical without the quantifier in many contexts.',
      [
        { target: '吃了 chī le', note: 'verb 吃 + perfective 了; "ate / has eaten"' },
        { target: '了 directly after the verb', note: 'no space; the marker hugs the verb it modifies' },
        { target: 'V-了 + [number+measure+noun]', note: 'the most natural shape; e.g., 看了三本书, 买了一支笔' },
      ],
      [ACT.completedLe],
    ),
    createContentItem(
      '句尾的 了',
      'sentence-final 了 — clause-le',
      'Sentence-final 了 sits at the end of the whole clause and signals a NEW STATE or a "currently relevant" change — not just the verb\'s completion. 我饿了 ("I\'m hungry now [the state of being hungry has come into being]"). The focus is on the SITUATION having changed.',
      'sentence',
      '我饿了 ("I\'m hungry now") · 下雨了 ("it\'s raining now [it has started]") · 他二十岁了 ("he\'s turned twenty")',
      'Use sentence-final 了 when you want to highlight that something is different from before; without it, the sentence sounds purely descriptive.',
      [
        { target: '我饿', note: 'flat statement: "I am hungry" (no change implied)' },
        { target: '我饿了', note: '"I\'ve become hungry / I\'m hungry now" — the change is the point' },
        { target: '下雨了', note: '"it\'s started raining" — sentence-final 了 captures the onset of the new state' },
      ],
      [ACT.completedLe],
    ),
    createContentItem(
      '双了',
      'shuāng le — double-了',
      'The double-了 construction (V-了 [object] 了) combines verb-final 了 (completion) with sentence-final 了 (current relevance): "I have V-ed and it is now relevant / the situation has reached this point". 我吃了三碗饭了 ("I have eaten three bowls — and that\'s a lot / I\'m full now"). Common when reporting an accumulation up to the present moment.',
      'sentence',
      '我学了三年中文了 ("I have been studying Chinese for three years now") · 他喝了五杯咖啡了 ("he\'s had five cups of coffee already")',
      'Distinct from single V-了 (just a completed event) — double-了 stretches the event\'s relevance up to "as of now".',
      [
        { target: 'V-了 ... 了', note: 'two 了 in one clause: completion + currently-relevant state' },
        { target: '我学了三年中文', note: 'plain perfective: "I studied Chinese for three years" (could be a past period, now over)' },
        { target: '我学了三年中文了', note: 'double-了: "I have been studying for three years now [and I\'m still going / it\'s a lot]"' },
      ],
      [ACT.completedLe],
    ),
    createContentItem(
      '了 dropped',
      'le dropped',
      '了 is OBLIGATORILY DROPPED in several environments: (1) habitual / general statements, (2) stative verbs like 是 / 有 / 喜欢 / 知道, (3) the negation 没 V (never 没 V 了), (4) narrative-present storytelling. Adding 了 in these contexts is ungrammatical.',
      'sentence',
      'HABITUAL: 我每天喝咖啡 (no 了) — "I drink coffee every day"\nSTATIVE: 我喜欢你 (no 了) — "I like you"\nNEGATION: 我没吃 (no 了) — "I didn\'t eat"',
      'The single biggest source of "robotic" Mandarin from English speakers is putting 了 on every past-time verb. Most past-time verbs do NOT need it.',
      [
        { target: 'habitual: 我每天喝咖啡', note: '"I drink coffee every day" — no 了 because it\'s a habit, not a completed event' },
        { target: 'stative: 我喜欢中国', note: '"I like China" — 喜欢 is stative; 了 would make it ungrammatical' },
        { target: 'negation: 我没吃', note: '"I didn\'t eat / haven\'t eaten" — never 我没吃了' },
        { target: 'narrative: 昨天我去图书馆', note: '"yesterday I went to the library" — past time established by 昨天; bare 去 is fine and natural' },
      ],
      [ACT.completedLe],
    ),
    createContentItem(
      '了 vs 过 contrast',
      'le vs guo',
      '了 marks COMPLETION of a specific event; 过 marks EXPERIENCE of an event-type at some point in life. 我去了北京 ("I went to Beijing [a specific trip, completed]") vs 我去过北京 ("I have been to Beijing [at some point in my life, ever]"). The English distinction is past simple vs present perfect experiential.',
      'sentence',
      '我吃了北京烤鸭 ("I ate Peking duck [the specific time we ordered it]") vs 我吃过北京烤鸭 ("I have eaten Peking duck [I know what it tastes like]")',
      'When the AI tutor asks 你吃过吗? ("have you ever eaten X?"), answer with 过 (吃过 / 没吃过), NEVER with 了.',
      null,
      [ACT.completedLe],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Experiential (过)
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'V 过',
      'V guo — experiential "have ever V-ed"',
      'V 过 asserts that the subject has the EXPERIENCE of doing V at some point in their life — without specifying when, how many times, or whether they would do it again. 我去过北京 ("I have been to Beijing"). The closest English equivalent is the present-perfect-experiential: "Have you ever…?" / "I have…".',
      'sentence',
      '我去过北京 ("I have been to Beijing") · 我吃过北京烤鸭 ("I have eaten Peking duck") · 我看过那部电影 ("I have seen that movie")',
      'Time information is deliberately omitted — that\'s the point of experiential aspect. To say "I went to Beijing last year", use 了 + 去年, not 过.',
      [
        { target: 'V 过', note: 'aspect marker for "ever done"; 过 is neutral tone' },
        { target: '我去过北京', note: '"I have been to Beijing" — no time anchor needed; the experience is the point' },
        { target: '我去了北京', note: 'contrast: "I went to Beijing" — specific completion, often with a time reference' },
      ],
      [ACT.experientialGuo],
    ),
    createContentItem(
      '没 V 过',
      'méi V guo — negation of experiential',
      'The negative of V 过 is 没 V 过 ("have never V-ed in one\'s life"). The 过 STAYS in the negation — unlike 了 which is canceled by 没. This is one of the few cases where two aspect markers (没 + 过) appear together.',
      'sentence',
      '我没去过中国 ("I have never been to China") · 他没吃过寿司 ("he has never eaten sushi") · 我们没看过那部电影 ("we have never seen that movie")',
      'Compare to the perfective negation 没 V (without 过): 我没去 = "I didn\'t go [this specific time]"; 我没去过 = "I have never gone [ever]". The 过 makes it lifetime-experiential.',
      [
        { target: '没 V 过', note: '"have never V-ed" — both 没 and 过 are obligatory' },
        { target: '我没去过 vs 我没去', note: '"have never been" (lifetime) vs "didn\'t go" (this specific event)' },
        { target: '从来没 V 过', note: 'intensified: "have NEVER, ever V-ed in my whole life"' },
      ],
      [ACT.experientialGuo],
    ),
    createContentItem(
      '问经历',
      'wèn jīnglì — asking about life experience',
      'Use the question pattern 你 V 过 X 吗? to ask "have you ever V-ed X?". The answer is V 过 (yes) or 没 V 过 (no). This is the standard small-talk pattern when meeting someone new in Mandarin contexts: have you been to X, eaten Y, seen Z.',
      'conversation',
      'A: 你去过中国吗? ("Have you ever been to China?")\nB: 去过，去过两次。 ("I have — twice.") / 没去过，但是我很想去。 ("Never, but I want to go.")',
      'Note the short answer 去过 / 没去过 — full sentences are not needed; just repeat the verb + 过 or 没…过.',
      [
        { target: 'A: 你 V 过 X 吗?', note: 'the question form; 过 neutral, 吗 neutral, rising terminal intonation' },
        { target: 'B affirmative: V 过', note: 'short answer; can be extended with 几次 (a few times) or 一次 (once)' },
        { target: 'B negative: 没 V 过', note: 'short negative; often followed by 但是… ("but I want to / one day I will")' },
      ],
      [ACT.experientialGuo],
    ),
    createContentItem(
      '过 with quantifier',
      'V 过 + frequency',
      'V 过 can be extended with a frequency expression to specify how many times the experience has occurred. V 过 [number] 次 ("V-ed [number] times"). 我去过北京三次 ("I have been to Beijing three times"). The frequency comes AFTER the experiential 过, not before.',
      'sentence',
      '我看过这部电影两次 ("I have watched this movie twice") · 他去过日本五次 ("he has been to Japan five times")',
      'Order matters: V + 过 + object + [number] + 次, or V + 过 + [number] + 次 + object. Both orders are heard.',
      [
        { target: '次 cì', note: 'measure word for occurrences/times; the most common quantifier with 过' },
        { target: 'V 过 X N 次', note: '"V-ed X N times"; the frequency follows the object' },
        { target: 'V 过 N 次 X', note: 'alternative order with the same meaning; the frequency precedes the object' },
      ],
      [ACT.experientialGuo],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Progressive (在 / 正在)
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '在 V',
      'zài V — general progressive',
      'Place 在 (zài) BEFORE the verb to signal that the action is in progress at the reference time (usually now, but can be past or future with the right time word). 我在吃饭 ("I am eating"). The English equivalent is the present continuous "-ing", but Mandarin\'s 在 is not restricted to present.',
      'sentence',
      '我在吃饭 ("I am eating") · 他在睡觉 ("he is sleeping") · 我们在学中文 ("we are studying Chinese")',
      'Default everyday progressive; works in any time frame as long as a time word fixes the reference point.',
      [
        { target: '在 zài (pre-verb)', note: 'progressive aspect marker; placed before the verb, not after' },
        { target: '我在吃 + 饭', note: '"I am eating [a meal]" — 在 modifies the verb 吃' },
        { target: '昨天那时候我在吃饭', note: '"at that time yesterday I was eating" — 在 works in the past with a time word' },
      ],
      [ACT.progressiveZai],
    ),
    createContentItem(
      '正在 V',
      'zhèngzài V — emphatic progressive',
      'Place 正在 (zhèngzài) before the verb to signal stronger "right now, at this very moment" emphasis. 他正在打电话 ("he is on the phone right now"). More vivid and immediate than plain 在; suggests the speaker can see/hear it happening.',
      'sentence',
      '他正在打电话，请稍等 ("he is on the phone right now, please wait a moment") · 老师正在讲课 ("the teacher is mid-lecture")',
      'Use 正在 to highlight that the action is happening at this very instant — often the basis for "please don\'t interrupt".',
      [
        { target: '正在 zhèngzài', note: 'emphatic progressive; suggests immediate, vivid, at-this-instant action' },
        { target: '在 vs 正在', note: '在 is the neutral default; 正在 amplifies the "right now" feeling' },
        { target: '正 V (literary)', note: 'shortened form for written or slightly formal speech: 雨正下 ("rain is just now falling")' },
      ],
      [ACT.progressiveZai],
    ),
    createContentItem(
      '... 呢 softener',
      'sentence-final 呢',
      'The progressive can take an optional sentence-final 呢 (ne, neutral) to soften the statement and reinforce the "currently" reading. 我在看书呢 ("I\'m reading [right now, you know]"). 呢 also marks a casual, friendly tone — common in spoken Mandarin.',
      'sentence',
      'A: 你在做什么呢? ("What are you doing right now?")\nB: 我在写作业呢。 ("I\'m doing homework.")',
      'The 呢 is optional but very common in everyday spoken progressive sentences; leaving it off makes the line feel terser.',
      [
        { target: '呢 ne (neutral)', note: 'softening particle; signals "this is the current situation"; very common with progressive' },
        { target: '...在 V 呢', note: 'the canonical spoken progressive frame: pre-verbal 在 + post-clause 呢' },
        { target: '...正在 V 呢', note: 'same with emphatic 正在; even more vivid' },
      ],
      [ACT.progressiveZai],
    ),
    createContentItem(
      '在 V vs V 着 contrast',
      'zài V vs V zhe',
      '在 V = an ACTION IN PROGRESS (dynamic, unfolding); V 着 = a STATE OR POSTURE HELD (static, ongoing condition). 他在坐 is awkward (sitting is not really an action unfolding); 他坐着 ("he is sitting / seated") is the natural way. Same English "-ing" but different aspect.',
      'sentence',
      'ACTION: 他在跑步 ("he is running") · 他在写作业 ("he is doing homework")\nSTATE: 他坐着 ("he is sitting") · 他拿着一本书 ("he is holding a book") · 灯开着 ("the light is on")',
      'A useful rule of thumb: if the verb is a dynamic action that requires effort and unfolds, use 在; if it\'s a posture, location, or held condition, use 着.',
      null,
      [ACT.progressiveZai],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Durative (着)
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'V 着',
      'V zhe — durative aspect',
      'Place 着 (zhe, neutral) AFTER the verb to signal that a STATE or POSTURE is being held. Unlike 在 V (action unfolding), V 着 describes a static condition resulting from the verb. 坐着 ("in a seated position"), 站着 ("standing"), 躺着 ("lying down"), 戴着 ("wearing [glasses]").',
      'sentence',
      '他坐着 ("he is sitting / seated") · 我戴着眼镜 ("I am wearing glasses") · 门开着 ("the door is open")',
      'The most natural V 着 verbs are postures (坐 sit, 站 stand, 躺 lie), holding/wearing verbs (拿 hold, 戴 wear, 穿 wear-clothes), and location verbs (in some cases 放 place).',
      [
        { target: '着 zhe (post-verb, neutral)', note: 'durative aspect marker; static held state, not an unfolding action' },
        { target: '坐着 / 站着 / 躺着', note: 'three core postures; the most common V 着 patterns' },
        { target: '拿着 / 戴着 / 穿着', note: 'holding and wearing verbs; the object is held continuously' },
      ],
      [ACT.durativeZhe],
    ),
    createContentItem(
      '连动 V1 着 V2',
      'liándòng V1 zhe V2 — "while V1-ing, V2"',
      'The serial-verb pattern V1 着 V2 means "do V2 while in the state of V1". 站着吃饭 ("eat while standing"), 听着音乐写作业 ("do homework while listening to music"), 笑着说 ("say with a smile"). V1 著 supplies a backdrop or manner; V2 is the main action.',
      'sentence',
      '他笑着说 "你好" ("he said \'hello\' with a smile") · 我们一边走一边聊着天 ("we walked while chatting")',
      'A very natural Mandarin pattern for describing manner — when in English you would use a participial phrase ("smiling, he said…") Mandarin uses V1 着 V2.',
      [
        { target: 'V1 着 V2', note: 'serial verb: V1 is the background state, V2 is the main action' },
        { target: '站着吃饭', note: 'literally "stand-ing eat meal" → "eat while standing"' },
        { target: '听着音乐写作业', note: 'literally "listen-ing music write homework" → "do homework with music on"' },
        { target: '笑着说', note: 'literally "laugh-ing say" → "say smiling / say with a smile"' },
      ],
      [ACT.durativeZhe],
    ),
    createContentItem(
      'V 着 V 着 + 就 V 了',
      'V zhe V zhe + jiù V le — "kept V-ing and then suddenly…"',
      'A high-frequency spoken pattern. Doubling 着 emphasizes prolonged V-ing; 就 marks the unexpected next step; V 了 closes with a completed result. 看着看着就睡着了 ("I kept watching and ended up falling asleep"). Captures the sense of "drifting into something else while doing X".',
      'sentence',
      '看着看着就睡着了 ("kept watching [TV] and fell asleep") · 听着听着就哭了 ("kept listening and ended up crying") · 走着走着就到了 ("kept walking and arrived without realizing")',
      'A distinctly Mandarin construction; English typically renders it with "ended up V-ing" or "before I knew it".',
      [
        { target: 'V 着 V 着', note: 'doubled durative; "kept V-ing for a while"' },
        { target: '就 jiù', note: '"then, suddenly, as a result"; signals the unexpected next step' },
        { target: 'V 了 (sentence-final + perfective)', note: 'the completed result that emerged from the prolonged V-ing' },
      ],
      [ACT.durativeZhe],
    ),
    createContentItem(
      '存在句 着',
      'cúnzài jù zhe — existential 着',
      'In existential sentences (PLACE + V 着 + THING), 着 describes the static configuration of an object at a location. 桌子上放着一本书 ("on the table is placed a book / there\'s a book on the table"). The verb describes how the object is positioned (placed, hanging, standing, lying); 着 makes it static.',
      'sentence',
      '墙上挂着一幅画 ("on the wall is hanging a painting") · 床上躺着一只猫 ("on the bed is lying a cat") · 门口站着一个人 ("at the door is standing a person")',
      'This is a poetic, almost cinematic pattern — describing a scene element by element, with each thing held in its location by 着.',
      [
        { target: 'PLACE + V 着 + THING', note: 'existential frame: location first, then the verb-of-position, then the object' },
        { target: '放着 / 挂着 / 躺着 / 站着', note: 'common positional verbs in existential sentences' },
      ],
      [ACT.durativeZhe],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Imminent (快…了 / 就要…了 / 将要)
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '快 V 了',
      'kuài V le — "about to V" (colloquial)',
      'Use 快 V 了 for "about to V, very soon, often with emotional intensity". 火车快到了 ("the train\'s about to arrive!"), 我快饿死了 ("I\'m about to starve!"). The most colloquial of the three imminent patterns; pairs naturally with exclamatory contexts.',
      'sentence',
      '火车快到了 ("the train is about to arrive") · 我快饿死了 ("I\'m about to starve") · 电影快开始了 ("the movie\'s about to start")',
      'The sentence-final 了 is OBLIGATORY — without it the sentence sounds incomplete. 快到 (without 了) is wrong.',
      [
        { target: '快 V 了', note: 'imminent + colloquial; obligatory sentence-final 了' },
        { target: '快 kuài (adv)', note: 'literally "fast / soon"; functions as the imminence trigger' },
        { target: 'omit 了 → ungrammatical', note: '快到 alone (no 了) is not a complete sentence in this construction' },
      ],
      [ACT.imminent],
    ),
    createContentItem(
      '就要 V 了',
      'jiùyào V le — "about to V" (neutral / scheduled)',
      'Use 就要 V 了 for "about to V" with a slightly more definite or scheduled feel. Often paired with a specific time reference. 我就要毕业了 ("I am about to graduate"). 明年我就要二十岁了 ("next year I will be twenty"). The default neutral-register imminent pattern.',
      'sentence',
      '我就要毕业了 ("I\'m about to graduate") · 他下个月就要结婚了 ("he\'s getting married next month") · 飞机就要起飞了 ("the plane\'s about to take off")',
      'Like 快 V 了, the sentence-final 了 is obligatory. 就要 emphasizes "soon and definite" more than the urgency in 快.',
      [
        { target: '就要 V 了', note: 'imminent + neutral / scheduled; often with a time word like 明年, 下个月' },
        { target: '快 V 了 vs 就要 V 了', note: '快 = "very soon, urgent feel"; 就要 = "soon, scheduled feel"' },
      ],
      [ACT.imminent],
    ),
    createContentItem(
      '将要 V / 将 V',
      'jiāngyào V / jiāng V — "will V" (formal / written)',
      'Use 将要 V or just 将 V for "will V" in formal, written, or news register. 国家主席将访问北京 ("The President will visit Beijing"). Almost never used in casual speech; would sound stiff among friends. Note: NO sentence-final 了 with 将要 — it is purely an adverb, not an aspect construction.',
      'sentence',
      '会议将于明天开始 ("the meeting will commence tomorrow") · 火车将在十分钟后到达 ("the train will arrive in ten minutes")',
      'Identifiable as formal register by: classical-flavored prepositions (于 yú), passive structures, news vocabulary, and the absence of 了.',
      [
        { target: '将要 V / 将 V', note: 'formal / written future; no aspect 了' },
        { target: 'news register', note: 'typical contexts: official announcements, schedules, news broadcasts, written reports' },
        { target: 'contrast with 快/就要 V 了', note: 'casual/neutral → 快/就要 V 了; formal/written → 将要 V (no 了)' },
      ],
      [ACT.imminent],
    ),
    createContentItem(
      '快要 V 了',
      'kuàiyào V le — colloquial variant',
      'A common variant is 快要 V 了 — basically 快 V 了 with an explicit "yào" softener inserted. 快要下雨了 ("it\'s about to rain"). Slightly softer than plain 快 V 了; freely interchangeable in most everyday contexts.',
      'sentence',
      '快要下雨了 ("it\'s about to rain") · 春天快要来了 ("spring is almost here")',
      'In careful speech, 快要 V 了 sounds a touch more measured than 快 V 了; the difference is minimal.',
      null,
      [ACT.imminent],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Habitual / Narrative present
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '习惯性动作',
      'xíguànxìng dòngzuò — habitual action (bare verb)',
      'For HABITUAL or GENERAL actions, use the PLAIN VERB form with no aspect marker. 我每天喝咖啡 ("I drink coffee every day"). Adding 了 / 过 / 在 / 着 would all be wrong — habitual aspect IS the bare form.',
      'sentence',
      '我每天喝咖啡 ("I drink coffee every day") · 他喜欢看电影 ("he likes watching movies") · 鸟会飞 ("birds fly") · 我们星期天去教堂 ("we go to church on Sundays")',
      'The frequency adverb (每天, 经常, 总是) is the time anchor; the verb stays bare.',
      [
        { target: '每天 měitiān', note: '"every day"; classic habitual time anchor; verb stays bare' },
        { target: '经常 jīngcháng', note: '"often / frequently"; verb stays bare' },
        { target: '总是 zǒngshì', note: '"always"; verb stays bare' },
        { target: 'NO aspect marker', note: '了 / 过 / 在 / 着 are all wrong with habitual actions; the bare form is correct' },
      ],
      [ACT.habitual],
    ),
    createContentItem(
      '叙述现在',
      'xùshù xiànzài — narrative present',
      'A characteristic Mandarin trick: when narrating a PAST sequence of events, anchor the past with a time word (昨天, 那天, 上周) and let the verbs stay BARE — only mark the consequential or completed action with 了. 昨天我去图书馆，借了一本书，然后回家 ("Yesterday I went to the library, borrowed a book, then went home").',
      'sentence',
      '昨天我去图书馆，借了一本书，然后回家。\n(Yesterday I went to the library, borrowed a book, then went home.)\nThree verbs: 去, 借, 回家. Only 借 takes 了 (the consequential action); 去 and 回家 are bare because the time word anchors them.',
      'This is one of the most beautiful and economical features of Mandarin narrative — once the time is set, the verbs ride on it without redundant marking.',
      [
        { target: '昨天 (time anchor)', note: 'sets the past frame; no need to repeat the past-marking on every verb' },
        { target: '去 (bare)', note: 'framing verb; bare because the time is already established' },
        { target: '借了 (perfective)', note: 'the consequential action — the verb that "moves the story"; gets 了' },
        { target: '回家 (bare)', note: 'framing verb again; back to bare' },
      ],
      [ACT.habitual],
    ),
    createContentItem(
      '过去习惯',
      'guòqù xíguàn — past habits',
      'Descriptions of past HABITS (used-to-do) also take NO aspect marker — the habitual reading overrides any past-time anchor. 那时候我每天跑步 ("at that time I ran every day"). Adding 了 would change the meaning to "at that time I went for a run [once]".',
      'sentence',
      '那时候我每天跑步 ("at that time I ran every day") · 小时候我经常去外婆家 ("as a child I often went to grandma\'s house") · 大学时候他天天打篮球 ("in college he played basketball every day")',
      'When the meaning is "used to do X regularly", strip the aspect markers — even though English uses "used to V" or past simple, Mandarin keeps the verb bare.',
      [
        { target: '那时候 (past frame) + 每天 (habitual)', note: 'both anchors present; verb stays bare; the result is "used to V regularly"' },
        { target: 'compare: 那时候我跑了步', note: 'with 了 → "at that time I went for a run [once]"; loses the habitual meaning' },
      ],
      [ACT.habitual],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Grammar I: Stacking aspects
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '完成 + 数量',
      'wánchéng + shùliàng — perfective + quantified result',
      'The most natural single-event completion pattern: V 了 + [number + measure word + noun]. 看了三本书 ("read three books"), 写了两个小时 ("wrote for two hours"), 喝了一杯咖啡 ("drank a cup of coffee"). The quantifier provides the "boundedness" that 了 needs.',
      'sentence',
      '我看了三本书 ("I read three books") · 他写了两个小时 ("he wrote for two hours") · 我们走了五公里 ("we walked five kilometers")',
      'Without the quantifier, plain V 了 + bare object sometimes feels incomplete ("I read book…?"). The quantifier closes the action.',
      [
        { target: 'V 了 [数] [量] [名]', note: 'the perfective + quantified pattern; one of the most common shapes in Mandarin' },
        { target: '三本书', note: 'number 三 (three) + measure word 本 (volume/book-measure) + noun 书 (book)' },
        { target: '两个小时', note: 'duration as a quantifier: number 两 + measure 个 + duration noun 小时' },
      ],
      [ACT.grammarStacking],
    ),
    createContentItem(
      '持续 + 完成',
      'chíxù + wánchéng — durative + completion',
      'The signature pattern V 着 V 着 + 就 + V 了 stacks durative and perfective: prolonged V-ing leads to an unexpected completed event. 看着看着就睡着了 ("kept watching and fell asleep"). Note the multiple 着 are different — the first two are durative aspect markers (zhe), the final 睡着 is 睡 + 着 (zháo, "fall asleep").',
      'sentence',
      '看着看着就睡着了 ("kept watching and fell asleep") · 走着走着就找到了 ("kept walking and found it") · 说着说着就笑了 ("kept talking and started laughing")',
      'Notice the final 着 in 睡着 is zháo (2nd tone, "ignite/fall asleep"), not zhe (durative). Same character, different role.',
      [
        { target: '看着看着 kàn zhe kàn zhe', note: 'durative + neutral-tone zhe; "kept watching"' },
        { target: '就 jiù', note: 'pivotal adverb meaning "then / suddenly"; marks the unexpected turn' },
        { target: '睡着了 shuì zháo le', note: '睡 + 着 (zháo, 2nd tone, "fall asleep") + 了 (perfective); a fixed verb-result compound' },
      ],
      [ACT.grammarStacking],
    ),
    createContentItem(
      '场景叙述',
      'chǎngjǐng xùshù — scene-setting with stacked aspects',
      'In narrative scene-setting, 在 V (action) and V 着 (state) can co-occur on different verbs in the same sentence. 他在房间里坐着，正在看书 ("He was sitting in his room, reading"). 坐着 = held posture (sitting); 正在看 = simultaneous action (reading). Two aspects, two verbs, one scene.',
      'sentence',
      '他在房间里坐着，正在看书 ("He was sitting in his room, reading") · 我躺着想问题 ("I lay there thinking [problems through]")',
      'A cinematic, observational style — the speaker describes both the posture and the action of the person in view.',
      [
        { target: '坐着 (posture)', note: 'durative: the seated state' },
        { target: '正在看书 (action)', note: 'progressive: the reading action unfolding while seated' },
        { target: 'co-occurrence', note: 'natural and frequent when describing a scene with both static and dynamic elements' },
      ],
      [ACT.grammarStacking],
    ),
    createContentItem(
      '错误堆叠',
      'cuòwù duīdié — error: don\'t stack 了 + 过',
      'Do NOT stack 了 and 过 on the same verb for the same action. 吃过了 in the sense of "have eaten" is wrong — pick either 吃了 (specific completion) or 吃过 (experiential). Each aspect occupies its own slot; combining them on one verb creates a contradiction.',
      'sentence',
      'WRONG: 我吃过了北京烤鸭 (meaning "I have ever eaten Peking duck")\nCORRECT: 我吃过北京烤鸭 (experiential) or 我吃了北京烤鸭 (specific completion)',
      'There IS one case where 过了 is grammatical: as the perfective of the verb 过 (guò, "to pass/cross"): 我过了马路 ("I crossed the street"). But that\'s 过 as a content verb, not as the aspect marker.',
      [
        { target: 'aspect slots are exclusive', note: 'each verb gets at most one of {了, 过} on the same action' },
        { target: 'distinguishing meaning', note: '吃了 = specific event; 吃过 = lifetime experience; pick one based on intent' },
        { target: '过了 as content verb', note: '过马路 + 了 → 过了马路 ("crossed the street") is fine because 过 here is the verb, not the marker' },
      ],
      [ACT.grammarStacking],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Grammar II: Negation of aspect
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '没 V (no 了)',
      'méi V — perfective negation cancels 了',
      'To negate a completed action, use 没 V — and CANCEL the 了. 没 V 了 is UNGRAMMATICAL. 我没吃 ("I didn\'t eat / haven\'t eaten"), NEVER 我没吃了. The negative form 没 already carries the perfective meaning; 了 is redundant and forbidden.',
      'sentence',
      'POSITIVE: 我吃了 ("I ate / have eaten")\nNEGATIVE: 我没吃 ("I didn\'t eat / haven\'t eaten") — NEVER 我没吃了',
      'The asymmetry surprises English speakers: "ate" → "didn\'t eat" feels like it should mirror as 吃了 → 没吃了. But Chinese doesn\'t work that way — 没 is the negative perfective.',
      [
        { target: '没 V (no 了)', note: 'the only correct perfective negation pattern' },
        { target: '没 méi (4th tone)', note: 'specifically negates completed events and existential 有; do NOT use 不 here' },
        { target: '*没 V 了 (ungrammatical)', note: 'a classic beginner error; treat 了 as forbidden after 没' },
      ],
      [ACT.grammarNegation],
    ),
    createContentItem(
      '还没 V 呢',
      'háiméi V (ne) — "haven\'t V-ed yet"',
      'To say "haven\'t V-ed YET" (with an implication that you still might or will), add 还 (hái, "still") before 没: 还没 V. Often paired with sentence-final 呢. 我还没吃呢 ("I haven\'t eaten yet"). The 还 highlights the gap between expected and actual completion.',
      'sentence',
      'A: 你吃饭了吗? ("Have you eaten?")\nB: 还没吃呢，你呢? ("Not yet, you?")',
      'The default polite answer for "have you done X yet?" — covers both "no, but I will" and "no, but I should have".',
      [
        { target: '还 hái', note: '"still / yet"; implies the action is still pending' },
        { target: '还没 V 呢', note: 'the canonical "not yet" frame; very common in everyday dialogue' },
        { target: '呢 ne (softener)', note: 'optional but natural; softens the negative reply' },
      ],
      [ACT.grammarNegation],
    ),
    createContentItem(
      '没 V 过',
      'méi V guo — experiential negation keeps 过',
      'To negate experiential aspect (V 过), use 没 V 过 — and KEEP the 过. Unlike 了 (which is canceled by 没), 过 stays even in negation. 我没去过北京 ("I have never been to Beijing"). Both 没 and 过 are obligatory.',
      'sentence',
      'POSITIVE: 我去过北京 ("I have been to Beijing")\nNEGATIVE: 我没去过北京 ("I have never been to Beijing")',
      'The 过 is what makes this "have NEVER ever" rather than "did not". Drop the 过 and you get the simple perfective negative 没去 ("didn\'t go").',
      [
        { target: '没 V 过', note: 'both markers obligatory; "have never V-ed"' },
        { target: '没 V vs 没 V 过', note: '"did not V [this specific time]" vs "have never V-ed [ever]"' },
        { target: '从来没 V 过', note: 'intensified: "have NEVER, ever V-ed in my whole life"' },
      ],
      [ACT.grammarNegation],
    ),
    createContentItem(
      '不 V (everything else)',
      'bù V — present / future / habitual / stative negation',
      'For everything that is NOT perfective or experiential — present, future, habitual, stative — use 不 V, NOT 没 V. 我不喜欢 ("I don\'t like"), 我不去 ("I won\'t go / I don\'t go"), 他不是 ("he isn\'t"). The 不/没 split tracks the aspect: 没 = perfective/experiential, 不 = everything else.',
      'sentence',
      'PRESENT: 我不饿 ("I\'m not hungry")\nFUTURE: 我不去 ("I won\'t go")\nHABITUAL: 我不吃肉 ("I don\'t eat meat")\nSTATIVE: 他不是日本人 ("he isn\'t Japanese")',
      'Get the 不/没 choice right and your negation sounds native; mix them up and the aspect signal is wrong.',
      [
        { target: '不 bù (4th, sandhi to bú)', note: 'for present/future/habitual/stative; covers most non-perfective cases' },
        { target: '没 méi (4th)', note: 'for perfective (completed) and experiential (ever-done) negation' },
        { target: 'rule of thumb', note: 'if the positive has 了 or 过, the negative uses 没; otherwise use 不' },
      ],
      [ACT.grammarNegation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Grammar III: Time-anchoring adverbs
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '已经',
      'yǐjīng — "already"',
      '已经 (yǐjīng) anchors a change that has ALREADY taken place and is currently relevant. Almost always pairs with a sentence-final 了 or a verb-final 了 — the 已经…了 frame is the canonical "already V-ed" structure.',
      'sentence',
      '我已经吃了 ("I have already eaten") · 他已经走了 ("he has already left") · 已经十点了 ("it\'s already ten o\'clock")',
      'The combination of 已经 + 了 is one of the highest-frequency aspect+adverb pairings in Mandarin.',
      [
        { target: '已经 + V + 了', note: '"already V-ed"; both 已经 and 了 are typically present' },
        { target: '已经 + adjective + 了', note: '"is already [X]" — works with stative predicates too: 已经晚了 ("it\'s already late")' },
        { target: 'without 了 → unnatural', note: '已经吃 (no 了) sounds incomplete; pair 已经 with 了 by default' },
      ],
      [ACT.grammarTimeWords],
    ),
    createContentItem(
      '刚才',
      'gāngcái — "just now / a moment ago"',
      '刚才 anchors a very recent past action — typically within the last few minutes. The recency is so specific that NO 了 is needed; 刚才 itself fixes the time. 他刚才打电话给我 ("he called me just now"). Avoid pairing 刚才 with 了 unless emphasizing completion.',
      'sentence',
      '他刚才打电话给我 ("he called me just now") · 我刚才看见你了 ("I just saw you [a moment ago]")',
      'Compare to 已经 which highlights "already-by-now"; 刚才 highlights "just-a-moment-ago". Both refer to past, but with different emphasis.',
      [
        { target: '刚才 gāngcái', note: '"just now / a moment ago"; very recent past' },
        { target: 'no obligatory 了', note: '刚才 fixes the past frame; 了 is optional' },
        { target: '刚 gāng (alone)', note: 'shorter form: 我刚到 ("I just arrived") — slightly more colloquial than 刚才' },
      ],
      [ACT.grammarTimeWords],
    ),
    createContentItem(
      '一直',
      'yìzhí — "continuously / all along"',
      '一直 (yìzhí, sandhi from yī to yì before zhí) anchors an action that has been going on continuously without break. Often pairs with 在 V (progressive) or with a duration. 我一直在等你 ("I have been waiting for you the whole time"), 他一直很努力 ("he has always been hard-working").',
      'sentence',
      '我一直在等你 ("I have been waiting for you all this time") · 他一直没回我消息 ("he hasn\'t replied to my message all this time")',
      'Common with both progressive (一直在 V) and negative (一直没 V) — captures persistence over time.',
      [
        { target: '一直 yìzhí', note: '"continuously / all along"; emphasizes unbroken duration' },
        { target: '一直在 V', note: 'progressive + continuous: "have been V-ing for the whole time"' },
        { target: '一直没 V', note: 'continuous negative: "has not V-ed the whole time"' },
      ],
      [ACT.grammarTimeWords],
    ),
    createContentItem(
      '始终',
      'shǐzhōng — "from start to finish / always"',
      '始终 (shǐzhōng, literally "begin-end") is a slightly formal / literary adverb meaning a stance has been held throughout a period from start to finish. 他始终支持我 ("he has supported me from start to finish"). More literary than 一直; common in essays, speeches, and reflective writing.',
      'sentence',
      '他始终支持我 ("he has supported me throughout") · 我始终相信他 ("I have believed in him from the beginning")',
      'Register marker: 始终 in casual chat sounds slightly bookish; 一直 is the everyday equivalent.',
      [
        { target: '始终 shǐzhōng', note: 'formal/literary "throughout"; etymologically "begin-end"' },
        { target: '始终 vs 一直', note: '始终 = more literary/written; 一直 = everyday spoken' },
        { target: 'common collocations', note: '始终如一 (consistent), 始终不变 (unchanging) — both formal idioms' },
      ],
      [ACT.grammarTimeWords],
    ),
    createContentItem(
      '从来',
      'cónglái — "ever / at any time" (with negative)',
      '从来 (cónglái, "ever / at any time") is ALMOST ALWAYS paired with a negative — 从来没 V 过 ("have never V-ed in one\'s whole life"). The intensified version of plain 没 V 过. 我从来没去过 ("I have never been there, ever in my life").',
      'sentence',
      '我从来没去过 ("I have never been there, ever") · 他从来不喝酒 ("he never drinks, ever")',
      'Note the two combinations: 从来没 V 过 (experiential lifetime) and 从来不 V (habitual lifetime). Both intensify the temporal scope to "in my entire life".',
      [
        { target: '从来没 V 过', note: '"have never V-ed in life" — experiential negation intensified' },
        { target: '从来不 V', note: '"never V — at all, ever" — habitual negation intensified' },
        { target: 'rarely positive', note: '从来 + positive is grammatical but rare ("从来如此" "always so"); the negative pairing is the norm' },
      ],
      [ACT.grammarTimeWords],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '为什么互相难懂',
      'wèishéme hùxiāng nán dǒng',
      'Why Chinese speakers of English struggle with English tense: their L1 has NO verb-final tense morphology — every English -ed / -ing / will V / has V-ed must be added consciously, while the Mandarin habit is to add a time word and leave the verb alone. The result: dropped -ed endings ("Yesterday I go to store") that sound like errors but reflect the L1 strategy.',
      'word',
      'Common L1-Mandarin error in English: "Yesterday I go to the store and buy some milk." (verbs uninflected — the time word "yesterday" was thought to be enough)',
      'Not a "mistake" so much as a strategy transfer: in Mandarin, 昨天我去商店买牛奶 is perfectly correct with bare verbs.',
      [
        { target: 'Mandarin L1 strategy', note: 'time word does the work; verbs uninflected' },
        { target: 'English requirement', note: 'every verb must carry tense morphology, even if redundant with the time word' },
        { target: 'typical error', note: 'L1-Mandarin English: dropped -ed, dropped -s, dropped -ing — all reflecting the bare-verb default' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '英语母语者的难点',
      'Yīngyǔ mǔyǔ zhě de nándiǎn',
      'Why English learners of Mandarin struggle with aspect: they look for a "past tense" marker and grab 了, overusing it on every past-time verb. The truth is subtler — 了 marks COMPLETION as an aspect, not "past" as a tense. Many past-time verbs in Mandarin take NO 了, because the time word already anchors the past and the verb is just framing.',
      'word',
      'Common L1-English error in Mandarin: 昨天我去了商店，买了牛奶，回了家。 (overuse of 了 on every verb)\nNatural: 昨天我去商店，买了牛奶，回家。 (only the consequential 买 needs 了; 去 and 回 are bare)',
      'The trick is to ask "is this verb the consequential action of the sentence?" — if not, leave it bare.',
      [
        { target: 'English L1 strategy', note: 'every past-time verb gets -ed → so they look for a marker on every Mandarin past-time verb too' },
        { target: 'Mandarin requirement', note: 'aspect markers only on the verbs whose completion / experience / state actually matters; the rest stay bare' },
        { target: 'practice goal', note: 'in a five-verb past narrative, MAX one or two verbs should carry 了' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '古汉语 vs 现代汉语',
      'gǔ Hànyǔ vs xiàndài Hànyǔ — historical arc of the aspect system',
      'Classical Chinese (古汉语) had even fewer aspect markers — 了 / 过 / 着 only stabilized as grammatical particles from the late Tang and Song dynasties onward (8th–13th centuries). Before that, completion was inferred from context, particle 矣 (yǐ), or compound verbs. Modern Mandarin (现代汉语) inherits a system that has been refined for about a thousand years, producing the elegant aspect grammar of today.',
      'word',
      'Classical: 吾食矣 (wú shí yǐ) "I have eaten" — particle 矣 marks completion\nModern: 我吃了 (wǒ chī le) — particle 了 takes over the same role',
      'The historical depth of the aspect system explains why it feels so natural to native speakers and so unfamiliar to learners trained on tense-based languages.',
      [
        { target: '矣 yǐ (Classical)', note: 'the Classical Chinese ancestor of 了; sentence-final completion particle' },
        { target: '了 le (Modern)', note: 'the modern descendant; broader role covering both verb-final completion and sentence-final new-state' },
        { target: '着 / 过 stabilization', note: 'both stabilized as aspect markers during the Tang-Song transition; before that, were content words only' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 13 — Task: convert and narrate
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '任务一: 翻译练习',
      'rènwù yī: fānyì liànxí — Task 1: Translation',
      'Convert the following five English past-tense sentences into Chinese. For each one, decide which aspect marker fits (or none) and justify in one sentence. Some take 了, some take 过, some take no marker because the time word does the job — and one is a habitual past where 了 would be wrong.',
      'sentence',
      '(1) "I ate three bowls of rice yesterday." → 我昨天吃了三碗饭。 (perfective + quantifier)\n(2) "Have you ever been to the Forbidden City?" → 你去过故宫吗? (experiential)\n(3) "I have never eaten Peking duck." → 我没吃过北京烤鸭。 (experiential negation)\n(4) "Last weekend I went to the library, borrowed a book, and went home." → 上周末我去图书馆，借了一本书，然后回家。 (narrative present: only 借 takes 了)\n(5) "When I was in high school I ran every day." → 高中时候我每天跑步。 (past habitual — bare verb)',
      'For each: write the Chinese version, then one sentence explaining why that aspect choice (or no marker) is correct.',
      [
        { target: 'Sentence 1 — 了', note: 'specific completed action with quantifier; the canonical V 了 + [number+measure+noun] pattern' },
        { target: 'Sentence 2 — 过', note: 'asking about lifetime experience; experiential aspect; question particle 吗 at the end' },
        { target: 'Sentence 3 — 没 V 过', note: 'experiential negation; both 没 and 过 obligatory; would be WRONG without 过' },
        { target: 'Sentence 4 — narrative present', note: 'time word 上周末 sets the past frame; framing verbs 去 and 回家 stay bare; only consequential 借 takes 了' },
        { target: 'Sentence 5 — bare verb', note: 'past habitual; even with the past anchor 高中时候, 跑步 stays bare because 每天 makes it habitual' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '任务二: 段落分析',
      'rènwù èr: duànluò fēnxī — Task 2: Narrative parsing',
      'Read the following Mandarin narrative paragraph aloud and identify, for every verb, which aspect marker it carries (if any) and what that marker signals: 了 (completion), 过 (experience), 在 (progressive), 着 (durative), or no marker (habitual / narrative frame).',
      'sentence',
      '上个学期我在清华大学学习。每天早上我七点起床，然后去图书馆。我已经学了三年中文了，但是我还没去过北京。上周我的室友带着我去了一家很有名的烤鸭店。我们点了两只烤鸭。吃着吃着，我突然想到 — 我快毕业了。',
      'Translation: "Last semester I was studying at Tsinghua University. Every morning I got up at seven and then went to the library. I have been studying Chinese for three years now, but I still hadn\'t been to Beijing. Last week my roommate took me (while holding me along) to a famous roast-duck restaurant. We ordered two ducks. As I was eating, I suddenly realized — I\'m about to graduate."',
      [
        { target: '在...学习 (progressive)', note: 'progressive aspect; "was studying" — anchored to 上个学期' },
        { target: '起床 / 去 (bare)', note: 'habitual past framed by 每天早上; no aspect marker' },
        { target: '已经学了 ... 了 (double-了)', note: 'completion + currently-relevant accumulation; "have been studying for three years (and still am)"' },
        { target: '没去过 (experiential negation)', note: '"haven\'t ever been"; 没 + 过 obligatory pair' },
        { target: '带着 (durative)', note: 'durative aspect; "with [me] in tow"; serial-verb manner' },
        { target: '去了 (perfective)', note: 'consequential action; specific completed trip' },
        { target: '点了 (perfective)', note: 'specific completed action with quantifier 两只' },
        { target: '吃着吃着 (V 着 V 着)', note: 'prolonged durative; "while eating"; sets up the next clause' },
        { target: '快毕业了 (imminent)', note: '快 V 了 pattern; "about to graduate"; obligatory sentence-final 了' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战 — 反向叙述',
      'tiǎozhàn — fǎnxiàng xùshù — Stretch: reverse narration',
      'Stretch goal: take any English paragraph from a memoir or news article and rewrite it in Mandarin, deliberately using the FEWEST aspect markers possible while preserving meaning. Aim for: one 了 per major consequential action, 过 only for lifetime experiences, and bare verbs everywhere else. Read it back and check that the time anchors carry the temporal weight.',
      'sentence',
      'Example: English "Yesterday I woke up at seven, drove to the office, attended three meetings, ate lunch with my mentor, and then drove home, exhausted." → Mandarin: 昨天我七点起床，开车去办公室，参加了三个会议，跟导师一起吃午饭，然后开车回家，累极了。\n(Only 参加了 takes 了 — it\'s the consequential, quantified action. Everything else is bare.)',
      'The AI tutor will critique your output for over-marking or under-marking; aim for native-feeling minimal aspect.',
      null,
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
