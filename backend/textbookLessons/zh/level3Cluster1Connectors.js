// Level 3 Cluster 1 — Discourse Connectors & Logical Markers (Mandarin Chinese)
// Advanced grammar cluster: the connectors that bind paragraphs and arguments —
// higher-register vocabulary for written essays (议论文), formal speeches, news
// articles, and academic discourse. Source topic: Korean Level 3 Cluster 1.
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
  orientation: 'zh-l3c1-orientation',
  pronunciation: 'zh-l3c1-pronunciation',
  addition: 'zh-l3c1-addition',
  contrast: 'zh-l3c1-contrast',
  causeEffect: 'zh-l3c1-cause-effect',
  sequence: 'zh-l3c1-sequence',
  condition: 'zh-l3c1-condition',
  concession: 'zh-l3c1-concession',
  conclusion: 'zh-l3c1-conclusion',
  grammarPairs: 'zh-l3c1-grammar-pairs',
  grammarRegister: 'zh-l3c1-grammar-register',
  grammarChaining: 'zh-l3c1-grammar-chaining',
  culture: 'zh-l3c1-culture',
  task: 'zh-l3c1-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Recognize the seven categories of formal Mandarin connectors (addition, contrast, cause-effect, sequence, condition, concession, conclusion) and pick the right register for each.',
      'Move a casual paragraph up the formality gradient (spoken 但是 → semi-formal 不过 → formal 然而 → very formal 反之) by swapping connectors.',
      'Chain three or more connectors in a single paragraph to produce essay-grade Mandarin suitable for 议论文 (argumentative essay) and 公务员考试 (civil-service exam) writing.',
    ],
    task: 'Picture an editorial deadline at 清华大学 — by the end of this lesson you should be able to rewrite a casual paragraph in essay register using 4+ different connectors without rehearsing each one.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Multi-character connectors that students mispronounce',
    goals: [
      'Apply the apostrophe rule in Pinyin: 然而 is written rán\'ér because the second syllable starts with a vowel and would otherwise be ambiguous (ráner vs rán-ér).',
      'Pronounce the four-character literary connectors (综上所述 zōngshàng suǒshù, 由此可见 yóucǐ kějiàn, 总而言之 zǒng\'éryánzhī) as two balanced 2+2 prosodic units — the rhythm is what makes them sound essay-like.',
      'Distinguish the near-homophones 因此 (yīncǐ, "therefore") vs 因为 (yīnwèi, "because") — same first syllable, completely different syntactic role.',
    ],
    task: 'Read each connector aloud with correct tones and apostrophe boundaries, then say the four-character ones with the 2+2 essay rhythm.',
  },
  {
    id: ACT.addition,
    section: 'Connector Category I',
    title: 'Addition & parallel — 而且 / 并且 / 此外 / 另外 / 与此同时',
    goals: [
      'Use 而且 (érqiě, "moreover") to add a stronger point in spoken or written register — the everyday workhorse for "and what is more".',
      'Distinguish 并且 (bìngqiě, formal/written "and also") from 而且 — both add but 并且 sounds essay-like and parallel, while 而且 sounds escalating.',
      'Open a new paragraph or section with 此外 (cǐwài, "in addition") or 另外 (lìngwài, "additionally / besides") — these are paragraph-level connectors, not in-clause links.',
    ],
    task: 'Write three sentences: one using 而且, one using 并且, one opening a paragraph with 此外.',
  },
  {
    id: ACT.contrast,
    section: 'Connector Category II',
    title: 'Contrast — 然而 / 反而 / 不过 / 相反 / 反之',
    goals: [
      'Replace casual 但是 (dànshì, "but") with formal 然而 (rán\'ér, "however") in written work — the single highest-impact register upgrade in essay writing.',
      'Use 反而 (fǎn\'ér, "on the contrary / instead") for results that defy expectation, and 相反 (xiāngfǎn, "on the contrary") to flip a previous claim entirely.',
      'Use 反之 (fǎnzhī, "conversely") to introduce the inverse case in formal argumentation — top register, almost exclusively written.',
    ],
    task: 'Take three casual 但是 sentences and rewrite each one in formal register using a different contrast connector.',
  },
  {
    id: ACT.causeEffect,
    section: 'Connector Category III',
    title: 'Cause-effect — 由于 / 因此 / 从而 / 以致 / 致使',
    goals: [
      'Use the formal cause-effect pair 由于 X，因此 Y ("due to X, therefore Y") as the essay default — much more written than 因为…所以….',
      'Use 从而 (cóng\'ér, "thereby / thus") to mark a logical consequence flowing from the previous clause — common in academic and policy writing.',
      'Distinguish the negative-result markers 以致 (yǐzhì, "resulting in [bad outcome]") and 致使 (zhìshǐ, "causing [serious result]") — both signal that something went wrong.',
    ],
    task: 'Write three cause-effect sentences using a different formal connector each — one neutral (由于…因此…), one logical (从而), one negative-result (以致 or 致使).',
  },
  {
    id: ACT.sequence,
    section: 'Connector Category IV',
    title: 'Sequence & parallel structure — 首先…其次…最后 / 一方面…另一方面',
    goals: [
      'Lay out a three-step argument with 首先 (shǒuxiān, "first") … 其次 (qícì, "second") … 最后 (zuìhòu, "finally / last") — the textbook structure for a 议论文 body paragraph.',
      'Present two sides of a question with 一方面 (yīfāngmiàn, "on one hand") … 另一方面 (lìngyīfāngmiàn, "on the other hand") — the standard balanced-argument frame.',
      'Use 先 (xiān) … 再 (zài) … 然后 (ránhòu) … 最后 (zuìhòu) for procedural sequencing ("first do A, then B, then C, finally D") — common in instructions, news reports, and process descriptions.',
    ],
    task: 'Construct a three-step argument using 首先…其次…最后, then convert it into a balanced two-side argument using 一方面…另一方面.',
  },
  {
    id: ACT.condition,
    section: 'Connector Category V',
    title: 'Condition — 假如 / 倘若 / 一旦 / 万一 / 只要…就…',
    goals: [
      'Replace casual 如果 with formal 假如 (jiǎrú, "if / supposing") or literary 倘若 (tǎngruò, "if / in case") for hypothetical conditions in essays.',
      'Use 一旦 (yīdàn, "once / as soon as") for irreversible-trigger conditions and 万一 (wànyī, "in the unlikely event that") for rare-but-serious contingencies.',
      'Use the sufficient-condition pattern 只要 (zhǐyào) X，就 (jiù) Y ("as long as X, then Y") to express minimum requirements — frequent in policy and proposal writing.',
    ],
    task: 'Rewrite three 如果 sentences using a different formal conditional connector for each.',
  },
  {
    id: ACT.concession,
    section: 'Connector Category VI',
    title: 'Concession — 即使…也… / 哪怕…也… / 无论…都… / 不管…都…',
    goals: [
      'Use 即使 (jíshǐ, "even if / even though") … 也 (yě) to concede a hypothetical extreme that still does not change the result — the formal default.',
      'Use 哪怕 (nǎpà, "even if [extreme]") … 也 (yě) for emphasized concession; carries more emotional weight than 即使 but lower register.',
      'Use 无论 (wúlùn, formal) / 不管 (bùguǎn, neutral) … 都 (dōu, "regardless of X, all Y") for universal-quantification concession — common in legal, policy, and academic writing.',
    ],
    task: 'Build three concession sentences: one with 即使…也…, one with 哪怕…也…, one with 无论…都….',
  },
  {
    id: ACT.conclusion,
    section: 'Connector Category VII',
    title: 'Conclusion — 总之 / 总而言之 / 综上所述 / 由此可见',
    goals: [
      'Close a paragraph or section with 总之 (zǒngzhī, "in short / in sum") — the everyday workhorse conclusion connector, suitable for both spoken and written register.',
      'Open a final paragraph of an essay with 综上所述 (zōngshàng suǒshù, "in summary of all the above") or 总而言之 (zǒng\'éryánzhī, "all in all") — formal essay closings that signal the end of an argument.',
      'Use 由此可见 (yóucǐ kějiàn, "from this it can be seen / hence we see") to mark an inference drawn from previous evidence — common in academic and editorial writing.',
    ],
    task: 'Write a one-sentence conclusion for the same paragraph in three registers: 总之 (everyday), 总而言之 (formal), 综上所述 (very formal).',
  },
  {
    id: ACT.grammarPairs,
    section: 'Grammar I',
    title: 'Paired connector patterns — the 关联词 system',
    goals: [
      'Memorize the seven most common 关联词 (guānliáncí, "linking-word pairs"): 因为…所以…, 虽然…但是…, 不但…而且…, 如果…就…, 只要…就…, 即使…也…, 无论…都….',
      'Know that in formal Mandarin the FIRST half of the pair signals the relationship and the SECOND half closes it — dropping the second half is acceptable in speech but jarring in writing.',
      'Recognize that Mandarin connectors come in matched front-back pairs, unlike English where one connector usually suffices ("because…" without "therefore", "although…" without "but").',
    ],
    task: 'Identify the paired connector in five sentences, then rewrite each one dropping the back half and judge whether it still sounds natural.',
  },
  {
    id: ACT.grammarRegister,
    section: 'Grammar II',
    title: 'The formality gradient — which connectors sound spoken vs written',
    goals: [
      'Place each connector on the four-step gradient: spoken (但是 / 所以 / 如果) → semi-formal (不过 / 因此 / 假如) → formal (然而 / 因而 / 倘若) → very formal / literary (反之 / 故 / 倘).',
      'Know that mixing registers within a paragraph (using 但是 in one sentence and 然而 in the next) sounds amateurish — a 议论文 should stay in formal register throughout.',
      'Recognize four-character connectors (综上所述, 由此可见, 一言以蔽之) as the highest register; using them in casual chat sounds pompous, but skipping them in a 高考 essay loses points.',
    ],
    task: 'Sort 12 connectors on the formality gradient from spoken to literary, then check your answers against the model.',
  },
  {
    id: ACT.grammarChaining,
    section: 'Grammar III',
    title: 'Paragraph chaining — combining 3+ connectors',
    goals: [
      'Build an essay paragraph using three or more different connector categories: typically a sequence opener (首先), a contrast or cause-effect in the middle (然而 / 因此), and a conclusion (综上所述).',
      'Maintain register consistency across the chain — formal opener requires formal middle and formal closer; one casual connector breaks the essay tone.',
      'Use paragraph-level connectors (此外, 然而, 综上所述) at the START of new sentences, not buried in the middle — placement signals discourse structure.',
    ],
    task: 'Chain four connectors from four different categories into one coherent paragraph of 4–5 sentences.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: '议论文, 高考 essays, and the formality gradient',
    goals: [
      'Understand that connector use is heavily graded in 高考 (gāokǎo, China\'s college-entrance exam) and 公务员考试 (gōngwùyuán kǎoshì, civil-service exam) writing — examiners count whether you used the appropriate formal register.',
      'Recognize the 八股 (bāgǔ, "eight-legged essay") historical roots: traditional Chinese essay structure rewards clear three-part argumentation (起承转合 qǐ-chéng-zhuǎn-hé, "open-develop-turn-close"), and modern connector use inherits this expectation.',
      'Know that the formality gradient runs: spoken 但是 → semi-formal 不过 → formal 然而 → very formal 反之 — picking the right step on the gradient is half of essay style.',
    ],
    task: 'For each of three writing situations (text to a friend, news article, university essay), pick the appropriate connector from a list of five candidates.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'Rewrite a casual paragraph in essay register',
    goals: [
      'Take a 3–5 sentence casual paragraph and rewrite it in formal essay register using 4+ different connectors from the cluster.',
      'Maintain register consistency — formal connectors throughout, no leftover spoken markers like 然后 (ránhòu, "and then").',
      'Verify your rewrite would score well in a 高考 议论文 context: explicit logical structure, paragraph-level connectors, four-character conclusion phrase.',
    ],
    task: 'Casual original: "我今天很忙。我有很多作业。我还要去图书馆。然后我要去开会。我觉得太累了。" — Rewrite this in formal essay register using 4+ connectors from the cluster.',
  },
];

const lesson = {
  title: 'Level 3 · Cluster 1: Discourse Connectors & Logical Markers (然而 / 因此 / 综上所述)',
  category: 'daily-life',
  difficulty: 'advanced',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'register-upgrade', label: 'Upgrading register', goal: 'Swap casual connectors (但是 / 所以 / 如果) for formal equivalents (然而 / 因此 / 假如) without changing the meaning.' },
    { id: 'paragraph-chaining', label: 'Chaining a paragraph', goal: 'Connect 3+ sentences using connectors from different categories (sequence, contrast, conclusion) to produce essay-grade Mandarin.' },
    { id: 'essay-conclusion', label: 'Writing an essay conclusion', goal: 'Open a final paragraph with 综上所述 or 总而言之 and close the argument cleanly.' },
    { id: 'balanced-argument', label: 'Balanced argument', goal: 'Present two sides using 一方面…另一方面… and close with 由此可见.' },
  ],
  relatedPools: ['pos-conjunctions', 'topic-academic-writing'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '本单元目标',
      'běn dānyuán mùbiāo',
      'By the end of this cluster you can write or speak in formal essay register, picking the right connector from seven categories (addition, contrast, cause-effect, sequence, condition, concession, conclusion) and chaining three or more in one paragraph without breaking register consistency.',
      'word',
      'Seven categories: 增补 zēngbǔ (addition) · 转折 zhuǎnzhé (contrast) · 因果 yīnguǒ (cause-effect) · 顺序 shùnxù (sequence) · 条件 tiáojiàn (condition) · 让步 ràngbù (concession) · 总结 zǒngjié (conclusion)',
      'These seven categories cover virtually every logical relationship in essay-grade Mandarin — once they are automatic, you can compose 高考 议论文 (college-entrance argumentative essays) without freezing on connector choice.',
      [
        { target: '增补 zēngbǔ', note: 'addition — moreover, in addition, furthermore' },
        { target: '转折 zhuǎnzhé', note: 'contrast — however, on the contrary, conversely' },
        { target: '因果 yīnguǒ', note: 'cause-effect — therefore, thus, consequently' },
        { target: '顺序 shùnxù', note: 'sequence — first…second…finally, on one hand…on the other…' },
        { target: '条件 tiáojiàn', note: 'condition — if, supposing, in case, as long as' },
        { target: '让步 ràngbù', note: 'concession — even if, regardless of, no matter what' },
        { target: '总结 zǒngjié', note: 'conclusion — in short, in sum, in summary of the above' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '真实场景',
      'zhēnshí chǎngjǐng',
      'You are at 清华大学 finishing a draft 议论文 (argumentative essay) the night before a deadline. Your prose reads like text messages — short sentences, casual 但是 and 然后. You need to upgrade every connector to essay register without rewriting the argument.',
      'word',
      '从口语到书面语：但是 → 然而 · 所以 → 因此 · 如果 → 假如 · 然后 → 此外 / 其次',
      'A typical late-night editing pass for any Mandarin student writer; connector swap is the highest-leverage way to upgrade register quickly.',
      [
        { target: '但是 → 然而', note: 'spoken contrast → formal essay contrast' },
        { target: '所以 → 因此', note: 'spoken cause-effect → formal essay cause-effect' },
        { target: '如果 → 假如 / 倘若', note: 'spoken condition → formal / literary condition' },
        { target: '然后 → 其次 / 接着', note: 'spoken sequence → formal sequence' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '形式梯度',
      'xíngshì tīdù',
      'Mandarin connectors sit on a four-step formality gradient. SPOKEN: 但是 / 所以 / 如果 / 然后 — used in chat, drama dialogue, casual writing. SEMI-FORMAL: 不过 / 因此 / 假如 — used in news prose, business email, mid-register essays. FORMAL: 然而 / 因而 / 倘若 — used in 议论文 and editorials. VERY FORMAL / LITERARY: 反之 / 故 / 倘 — used in academic papers, legal text, classical-style writing.',
      'word',
      '但是 (spoken) → 不过 (semi-formal) → 然而 (formal) → 反之 (literary)',
      'Picking the right step on the gradient is half of essay style; mixing steps within a paragraph sounds amateurish.',
      [
        { target: 'SPOKEN 口语', note: '但是 / 所以 / 如果 / 然后 — text messages, casual chat, drama dialogue' },
        { target: 'SEMI-FORMAL 半正式', note: '不过 / 因此 / 假如 / 接着 — news prose, business email, mid-register essays' },
        { target: 'FORMAL 正式', note: '然而 / 因而 / 倘若 / 其次 — 议论文 (argumentative essays), editorials, academic prose' },
        { target: 'LITERARY 文言色彩', note: '反之 / 故 / 倘 / 既…又… — academic papers, legal text, classical-style writing' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '然而',
      'rán\'ér',
      'The Pinyin apostrophe rule: when a syllable starts with a, e, or o AND follows another syllable in the same word, an apostrophe is inserted to mark the syllable boundary. Without it, 然而 would be read ráner (one syllable) instead of rán-ér (two syllables). High-frequency formal connector for contrast — "however".',
      'word',
      '然而 rán\'ér (correct boundary) vs *ráner (wrong reading)',
      'The most common essay-level contrast connector; mispronouncing the boundary marks the speaker as still attached to the spoken register.',
      [
        { target: '然 (rán, 2nd tone)', note: 'rising tone; the apostrophe-trigger because the next syllable starts with a vowel' },
        { target: '而 (ér, 2nd tone)', note: 'rising tone; the "ér" sound — like an r-colored neutral vowel' },
        { target: '\' (apostrophe)', note: 'mandatory in Pinyin when the next syllable starts with a/e/o; never omitted in correct Pinyin' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '由此可见',
      'yóucǐ kějiàn',
      'A four-character formal connector pronounced as two balanced 2+2 prosodic units: [yóu-cǐ] [kě-jiàn]. The rhythm is what makes the phrase sound essay-like; reading it as four equal beats sounds amateur. Means "from this it can be seen / hence we see" — typical academic-essay inference marker.',
      'word',
      '由此可见 [yóu-cǐ] · [kě-jiàn] — 2+2 rhythm',
      'Common in 议论文 and editorial writing; reading the 2+2 rhythm correctly is what makes you sound like an educated Mandarin speaker.',
      [
        { target: '由此 yóucǐ', note: 'first prosodic unit "from this"; held together' },
        { target: '可见 kějiàn', note: 'second prosodic unit "can-see / it is evident"; held together' },
        { target: '2+2 rhythm', note: 'pause is between the two pairs, not between every character; the cadence is what conveys essay register' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '综上所述',
      'zōngshàng suǒshù',
      'A formal four-character concluding phrase meaning "in summary of all the above". Pronounce as [zōng-shàng] [suǒ-shù] with the 2+2 essay rhythm. Common opening of the final paragraph of an essay or academic paper.',
      'word',
      '综上所述 [zōng-shàng] · [suǒ-shù]',
      'Top-register conclusion connector; using it in casual chat sounds pompous, but skipping it in a 高考 essay loses points.',
      [
        { target: '综上 zōngshàng', note: '"summing up / in summary of the above"; first prosodic unit' },
        { target: '所述 suǒshù', note: '"what has been said"; second prosodic unit using the formal nominalizer 所' },
        { target: 'first-tone-fourth-tone pattern', note: 'zōng (1st) shàng (4th) suǒ (3rd) shù (4th) — practice the high-then-fall-then-dip-then-fall cadence' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '因此 vs 因为',
      'yīncǐ vs yīnwèi',
      'Two near-homophones with the same first syllable but completely different syntactic roles. 因此 (yīncǐ) = "therefore" introduces a RESULT clause (effect comes after). 因为 (yīnwèi) = "because" introduces a CAUSE clause (cause comes after). Swapping them creates ungrammatical sentences.',
      'word',
      '因为下雨，所以取消。(because…so…) vs 下雨了，因此取消。(rained, therefore canceled)',
      'High-frequency confusion; learners who only memorize "yīn-" hear half the word and pick wrong.',
      [
        { target: '因此 yīncǐ', note: '"therefore" — introduces the EFFECT; sits at the start of the result clause' },
        { target: '因为 yīnwèi', note: '"because" — introduces the CAUSE; sits at the start of the reason clause' },
        { target: 'syntactic test', note: 'after 因此, expect a consequence; after 因为, expect a reason. The role decides the connector.' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '总而言之',
      'zǒng\'éryánzhī',
      'A four-character formal conclusion phrase meaning "all in all / in conclusion". Note the apostrophe between 总 (zǒng) and 而 (ér) — the second syllable starts with a vowel. Prosodic rhythm: [zǒng-ér] [yán-zhī] in 2+2.',
      'word',
      '总而言之 [zǒng-ér] · [yán-zhī]',
      'Common essay-closing phrase; one of three standard "in conclusion" options alongside 综上所述 and 总之.',
      [
        { target: '总而 zǒng\'ér', note: 'first prosodic unit "summing-and"; apostrophe-marked syllable boundary' },
        { target: '言之 yánzhī', note: 'second prosodic unit "[one] speaks of it"; uses the classical pronoun 之' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Addition / Parallel
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '而且',
      'érqiě',
      'The everyday workhorse for adding a stronger point. Translates as "moreover / what is more / and also". Works in both spoken and written register — the broadest-use addition connector. Often paired with 不但 (búdàn, "not only") in the 不但…而且… frame.',
      'sentence',
      '他不但聪明，而且非常勤奋。',
      'Translation: "He is not only smart but also extremely diligent." A textbook 不但…而且… pairing.',
      [
        { target: '不但 X，而且 Y', note: 'paired frame "not only X but also Y"; works in essays and conversation alike' },
        { target: 'register', note: 'neutral — equally at home in spoken Mandarin and mid-register prose' },
      ],
      [ACT.addition, ACT.grammarPairs],
    ),
    createContentItem(
      '并且',
      'bìngqiě',
      'Formal/written "and also" — sounds parallel and essay-like, in contrast to 而且 which sounds escalating. Used to link two coordinate verbs or clauses of equal weight. Common in legal, policy, and academic writing.',
      'sentence',
      '本研究阐述了该理论的核心，并且分析了其历史背景。',
      'Translation: "This study elaborates the core of the theory, and also analyzes its historical background." Academic register; 而且 would feel slightly out of place here.',
      [
        { target: '并且 bìngqiě', note: 'formal parallel "and also"; preferred in essays for coordinate clauses' },
        { target: '而且 vs 并且', note: '而且 escalates ("…and even more so…"); 并且 parallels ("…and also…")' },
      ],
      [ACT.addition],
    ),
    createContentItem(
      '此外',
      'cǐwài',
      'A paragraph-level connector meaning "in addition / besides this". Sits at the START of a sentence or paragraph to introduce a new related point. Cannot link two clauses within the same sentence — it is a discourse-level marker, not a clause-level one.',
      'sentence',
      '该政策提高了效率。此外，它还降低了成本。',
      'Translation: "This policy raised efficiency. In addition, it also lowered costs." 此外 opens a new sentence; cannot be inserted mid-clause.',
      [
        { target: '此外 cǐwài', note: 'paragraph-level "in addition"; always sentence-initial' },
        { target: 'discourse vs clause', note: '此外 introduces a NEW sentence; 而且 / 并且 connect WITHIN a sentence' },
      ],
      [ACT.addition],
    ),
    createContentItem(
      '另外',
      'lìngwài',
      'Similar to 此外 but slightly more casual — "additionally / besides". Works as both a paragraph-level connector and a noun-modifier ("another / other"). The connector use is most common in semi-formal contexts like news and business writing.',
      'sentence',
      '会议讨论了预算问题。另外，我们还需要确认时间表。',
      'Translation: "The meeting discussed the budget. Additionally, we also need to confirm the schedule." Semi-formal register; common in business email.',
      [
        { target: '另外 lìngwài', note: 'connector "additionally"; also a determiner "another / the other"' },
        { target: '此外 vs 另外', note: '此外 is one register-step more formal; 另外 works in news and business prose' },
      ],
      [ACT.addition],
    ),
    createContentItem(
      '与此同时',
      'yǔcǐ tóngshí',
      'A four-character formal connector meaning "at the same time / meanwhile". Marks parallel events happening simultaneously, often introducing a complementary development. Common in news reporting and academic writing.',
      'sentence',
      '经济正在快速增长，与此同时，环境压力也日益加剧。',
      'Translation: "The economy is growing rapidly; meanwhile, environmental pressure is also intensifying." A classic news-prose pairing of two simultaneous trends.',
      [
        { target: '与此同时 yǔcǐ tóngshí', note: '"with this at the same time"; four-character formal "meanwhile"' },
        { target: 'register', note: 'formal — news, policy, academic; rarely used in casual conversation' },
      ],
      [ACT.addition],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Contrast
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '然而',
      'rán\'ér',
      'The single most useful register upgrade in essay writing — replaces casual 但是 with formal "however". Used at the start of a sentence to introduce a contrast or counter-point. Apostrophe-marked syllable boundary in Pinyin.',
      'sentence',
      '许多人认为科技必然带来进步。然而，事实并非如此简单。',
      'Translation: "Many people believe technology necessarily brings progress. However, the truth is not so simple." A textbook 议论文 transition sentence.',
      [
        { target: '然而 rán\'ér', note: 'formal essay-register "however"; sentence-initial' },
        { target: '但是 → 然而', note: 'the single highest-impact register swap; converts casual prose into essay prose' },
      ],
      [ACT.contrast],
    ),
    createContentItem(
      '反而',
      'fǎn\'ér',
      'Means "on the contrary / instead" — used when the result defies expectation. The previous clause sets up an expectation; 反而 introduces the opposite outcome. Distinct from 然而 (general contrast) — 反而 is specifically counter-expectation.',
      'sentence',
      '他没有生气，反而笑了起来。',
      'Translation: "He didn\'t get angry; on the contrary, he started laughing." The expectation (anger) is defied by the actual result (laughter).',
      [
        { target: '反而 fǎn\'ér', note: 'counter-expectation "instead / on the contrary"; the result is opposite to what was expected' },
        { target: '然而 vs 反而', note: '然而 = general contrast; 反而 = counter-expectation specifically' },
      ],
      [ACT.contrast],
    ),
    createContentItem(
      '不过',
      'búguò',
      'Semi-formal contrast connector — softer than 然而 but more polished than 但是. Works in news prose, business email, and mid-register essays. Often signals a mild caveat rather than a strong reversal.',
      'sentence',
      '这个方案不错，不过还需要进一步完善。',
      'Translation: "This proposal is good; however, it still needs further refinement." Semi-formal register; common in workplace feedback.',
      [
        { target: '不过 búguò', note: 'semi-formal "however / but"; softer than 然而, more polished than 但是' },
        { target: 'register slot', note: 'sits between casual 但是 and formal 然而 on the gradient' },
      ],
      [ACT.contrast, ACT.grammarRegister],
    ),
    createContentItem(
      '相反',
      'xiāngfǎn',
      'Means "on the contrary" — used to flip a previous claim entirely, presenting the opposite view. Often sentence-initial. Stronger reversal than 然而; signals that the previous position was wrong, not just incomplete.',
      'sentence',
      '有些人认为努力就能成功。相反，运气和环境也起着关键作用。',
      'Translation: "Some people think hard work alone leads to success. On the contrary, luck and environment also play key roles." A textbook 议论文 counter-argument move.',
      [
        { target: '相反 xiāngfǎn', note: 'sentence-initial "on the contrary"; flips the previous claim' },
        { target: '反而 vs 相反', note: '反而 = counter-expectation in narrative; 相反 = counter-argument in essay' },
      ],
      [ACT.contrast],
    ),
    createContentItem(
      '反之',
      'fǎnzhī',
      'Literary/very formal "conversely / on the other hand". Top of the register gradient — almost exclusively written, common in academic papers and legal text. Uses the classical pronoun 之 ("it / this") as a placeholder for the previous proposition.',
      'sentence',
      '高温会加速反应；反之，低温则会减缓反应。',
      'Translation: "High temperature accelerates the reaction; conversely, low temperature slows it." Top-register academic prose; 反之 would feel out of place in conversation.',
      [
        { target: '反之 fǎnzhī', note: 'literary "conversely"; uses classical pronoun 之 to refer back' },
        { target: 'register', note: 'very formal — academic, scientific, legal; rare in conversational Mandarin' },
      ],
      [ACT.contrast, ACT.grammarRegister],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Cause-Effect
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '由于…，因此…',
      'yóuyú…, yīncǐ…',
      'The essay-default cause-effect pair — "due to X, therefore Y". 由于 introduces the cause; 因此 introduces the result. Significantly more formal than 因为…，所以… and the standard frame for 议论文 reasoning.',
      'sentence',
      '由于人口持续增长，因此粮食安全问题日益严峻。',
      'Translation: "Due to continuous population growth, food security has become increasingly severe." Textbook essay cause-effect frame.',
      [
        { target: '由于 yóuyú', note: 'formal "due to / owing to"; introduces the cause' },
        { target: '因此 yīncǐ', note: 'formal "therefore"; introduces the result' },
        { target: 'pair vs single', note: 'the pair is the default; using only 因此 (without 由于) also works as a standalone' },
      ],
      [ACT.causeEffect, ACT.grammarPairs],
    ),
    createContentItem(
      '因此',
      'yīncǐ',
      'Formal essay-register "therefore". Sentence-initial; introduces a result that follows from the preceding context. Can be used alone (without 由于 / 因为 in the previous clause) when the cause is already clear from context.',
      'sentence',
      '气候变化威胁着人类生存。因此，各国必须采取联合行动。',
      'Translation: "Climate change threatens human survival. Therefore, all nations must take joint action." Sentence-initial 因此 closing an essay paragraph.',
      [
        { target: '因此 yīncǐ', note: 'formal "therefore"; sentence-initial or clause-initial' },
        { target: 'so vs 因此', note: 'spoken 所以 (suǒyǐ) maps to formal 因此; same role, different register' },
      ],
      [ACT.causeEffect],
    ),
    createContentItem(
      '从而',
      'cóng\'ér',
      'Formal "thereby / thus" — marks a logical consequence flowing from the previous clause. Stronger logical link than 因此; the relationship is "X leads to Y as a direct outcome". Common in academic and policy writing.',
      'sentence',
      '新政策降低了企业成本，从而提高了整体竞争力。',
      'Translation: "The new policy lowered enterprise costs, thereby raising overall competitiveness." A typical policy-paper cause-and-direct-result chain.',
      [
        { target: '从而 cóng\'ér', note: '"thereby / thus as a direct consequence"; logical-flow marker' },
        { target: '因此 vs 从而', note: '因此 = "therefore" (general result); 从而 = "thereby" (direct logical flow); 从而 implies stronger causal continuity' },
      ],
      [ACT.causeEffect],
    ),
    createContentItem(
      '以致',
      'yǐzhì',
      'Means "resulting in [usually negative outcome]". Marks an unintended or undesired consequence. Distinct from 因此 (neutral) and 从而 (logical flow) — 以致 carries a negative emotional charge.',
      'sentence',
      '他长期忽视健康，以致最终住进了医院。',
      'Translation: "He neglected his health for a long time, resulting in [his being] finally hospitalized." The outcome is bad; 以致 signals that the chain ended in trouble.',
      [
        { target: '以致 yǐzhì', note: '"resulting in [bad outcome]"; carries negative-result charge' },
        { target: '以致 vs 因此', note: '因此 is neutral; 以致 signals an undesirable consequence' },
      ],
      [ACT.causeEffect],
    ),
    createContentItem(
      '致使',
      'zhìshǐ',
      'Means "causing [serious or formal result]". Sits in formal news, legal, and policy writing. Like 以致 it often carries a negative charge, but 致使 emphasizes the AGENT or CAUSE rather than the chain; literally "caused-made".',
      'sentence',
      '大雨连下三天，致使多地交通瘫痪。',
      'Translation: "Heavy rain continued for three days, causing traffic to be paralyzed in many places." Classic news-report cause-effect framing.',
      [
        { target: '致使 zhìshǐ', note: '"causing [serious result]"; emphasizes the cause-agent in news and legal text' },
        { target: '以致 vs 致使', note: '以致 emphasizes the unintended end-state; 致使 emphasizes the active causing-agent' },
      ],
      [ACT.causeEffect],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Sequence & Parallel
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '首先…其次…最后…',
      'shǒuxiān…qícì…zuìhòu…',
      'The textbook three-step argumentation frame: "first…second…finally". The standard structure for a 议论文 body paragraph laying out three supporting points. Each connector sits at the start of its own sentence — they are paragraph-level markers, not clause-level.',
      'sentence',
      '首先，教育是个人发展的基础。其次，它是社会进步的动力。最后，它是国家未来的关键。',
      'Translation: "First, education is the foundation of personal development. Second, it is the driver of social progress. Finally, it is the key to a nation\'s future." Three parallel arguments on education — textbook essay structure.',
      [
        { target: '首先 shǒuxiān', note: '"first / first of all"; opens the first argument' },
        { target: '其次 qícì', note: '"second / next"; introduces the second argument' },
        { target: '最后 zuìhòu', note: '"finally / last"; closes the list — must come last' },
      ],
      [ACT.sequence, ACT.grammarChaining],
    ),
    createContentItem(
      '一方面…另一方面…',
      'yīfāngmiàn…lìngyīfāngmiàn…',
      'The balanced two-side argument frame: "on one hand…on the other hand". Used when the argument has two complementary aspects of equal weight. Distinct from 首先…其次… which is for SEQUENCED points; 一方面…另一方面… is for PARALLEL aspects.',
      'sentence',
      '一方面，人工智能提高了生产效率；另一方面，它也带来了就业冲击。',
      'Translation: "On one hand, AI raises production efficiency; on the other hand, it also brings employment shocks." A balanced-argument frame on the pros and cons of AI.',
      [
        { target: '一方面 yīfāngmiàn', note: '"on one hand / on one aspect"; introduces the first side' },
        { target: '另一方面 lìngyīfāngmiàn', note: '"on the other hand / on the other aspect"; introduces the second side' },
        { target: 'parallel vs sequenced', note: 'use this frame for two SIDES of one issue; use 首先…其次… for SEQUENCED arguments' },
      ],
      [ACT.sequence],
    ),
    createContentItem(
      '先…再…然后…最后…',
      'xiān…zài…ránhòu…zuìhòu…',
      'A four-step procedural frame: "first do X, then Y, then Z, finally W". Used for processes, instructions, and news reports of sequential events. Lower register than 首先…其次…最后… — narrative rather than essay.',
      'sentence',
      '先准备材料，再调整温度，然后加入主料，最后撒上调味料。',
      'Translation: "First prepare the ingredients, then adjust the temperature, then add the main ingredient, finally sprinkle on seasonings." A recipe-style four-step sequence.',
      [
        { target: '先 xiān', note: '"first do…"; procedural opener' },
        { target: '再 zài', note: '"then / next" — third or middle step' },
        { target: '然后 ránhòu', note: '"and then" — narrative continuation' },
        { target: '最后 zuìhòu', note: '"finally"; closes the sequence' },
        { target: 'procedural vs argumentative', note: 'this frame describes ACTIONS in sequence; 首先…其次…最后… presents ARGUMENTS in sequence' },
      ],
      [ACT.sequence],
    ),
    createContentItem(
      '接着',
      'jiēzhe',
      'Means "next / following that" — a continuation marker for both narrative sequence and argumentation. Slightly more formal than 然后. Often replaces 然后 in mid-register writing like news prose.',
      'sentence',
      '会议先讨论了预算，接着审议了人事任命。',
      'Translation: "The meeting first discussed the budget; following that, it deliberated on personnel appointments." Semi-formal narrative sequence.',
      [
        { target: '接着 jiēzhe', note: 'semi-formal "next / following that"; common in news and meeting summaries' },
        { target: '然后 vs 接着', note: '然后 is casual narrative ("and then"); 接着 is semi-formal ("following that")' },
      ],
      [ACT.sequence],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Condition
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '假如',
      'jiǎrú',
      'Formal "if / supposing" — replaces casual 如果 in essays and academic prose. Introduces a hypothetical condition; the apodosis often uses 那么 (nàme) or 就 (jiù). Useful for thought-experiment arguments in 议论文.',
      'sentence',
      '假如没有书籍，人类的文明将无法延续。',
      'Translation: "If there were no books, human civilization could not continue." A textbook hypothetical-argument frame.',
      [
        { target: '假如 jiǎrú', note: 'formal "if / supposing"; replaces 如果 in essay register' },
        { target: '如果 → 假如', note: 'standard register upgrade; both introduce a hypothetical condition' },
      ],
      [ACT.condition, ACT.grammarRegister],
    ),
    createContentItem(
      '倘若',
      'tǎngruò',
      'Literary "if / in case" — very formal, with a classical flavor. Often appears in academic prose, editorials, and policy proposals. Even more formal than 假如; using it in conversation sounds bookish.',
      'sentence',
      '倘若各方未能达成共识，谈判将陷入僵局。',
      'Translation: "If the parties fail to reach consensus, the negotiations will fall into deadlock." A diplomatic/policy register sentence.',
      [
        { target: '倘若 tǎngruò', note: 'literary "if / in case"; classical-flavor condition marker' },
        { target: 'classical 倘', note: 'in very formal text, simply 倘 (tǎng) suffices — even more compressed' },
      ],
      [ACT.condition, ACT.grammarRegister],
    ),
    createContentItem(
      '一旦',
      'yīdàn',
      'Means "once / as soon as" — used for irreversible-trigger conditions: once X happens, Y is locked in. Common in policy and legal writing, where consequences follow automatically from an event.',
      'sentence',
      '一旦签署合同，双方都必须严格履行义务。',
      'Translation: "Once the contract is signed, both parties must strictly fulfill their obligations." A legal-register conditional with an irreversible trigger.',
      [
        { target: '一旦 yīdàn', note: '"once / as soon as"; irreversible-trigger condition' },
        { target: 'one-shot trigger', note: 'unlike 如果 (a may-or-may-not condition), 一旦 implies the trigger event WILL happen and locks in consequences' },
      ],
      [ACT.condition],
    ),
    createContentItem(
      '万一',
      'wànyī',
      'Means "in the unlikely event that / just in case" — for rare-but-serious contingencies. Literal "ten-thousand-one" = a one-in-ten-thousand chance. Often pairs with 怎么办 (zěnmebàn, "what then?") or 该怎么处理 (gāi zěnme chǔlǐ, "how should we handle it").',
      'sentence',
      '万一发生紧急情况，请立即拨打119。',
      'Translation: "In the unlikely event of an emergency, please immediately dial 119 [the fire emergency number in mainland China]." Safety-instructions register.',
      [
        { target: '万一 wànyī', note: '"in the unlikely event"; rare-but-serious contingency' },
        { target: '万一 vs 一旦', note: '一旦 = "once it happens" (probable); 万一 = "in case it happens" (improbable but serious)' },
      ],
      [ACT.condition],
    ),
    createContentItem(
      '只要…就…',
      'zhǐyào…jiù…',
      'A sufficient-condition pair: "as long as X, then Y". 只要 introduces the MINIMUM requirement; 就 introduces the result that follows automatically. Frequent in policy and proposal writing where minimum thresholds are stated.',
      'sentence',
      '只要坚持不懈，就一定能取得成功。',
      'Translation: "As long as one perseveres, one can certainly achieve success." A motivational-essay frame; also a common 高考 prompt template.',
      [
        { target: '只要 zhǐyào', note: '"as long as / only need"; introduces a sufficient condition' },
        { target: '就 jiù', note: 'apodosis particle "then"; introduces the automatic result' },
        { target: 'sufficient vs necessary', note: '只要…就… = sufficient condition (X is enough); 只有…才… = necessary condition (X is required)' },
      ],
      [ACT.condition, ACT.grammarPairs],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Concession
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '即使…也…',
      'jíshǐ…yě…',
      'The formal default concession pair: "even if X, still Y". 即使 introduces a hypothetical extreme; 也 in the second clause says the result still holds. The essay-register concession frame.',
      'sentence',
      '即使遇到再大的困难，我们也不会放弃。',
      'Translation: "Even if we encounter even greater difficulties, we will not give up." A typical essay-register concession with hypothetical-extreme framing.',
      [
        { target: '即使 jíshǐ', note: 'formal "even if"; hypothetical-extreme concession' },
        { target: '也 yě', note: 'second-clause "still / also"; closes the concession frame' },
        { target: 'pair must close', note: 'in formal writing, 即使 in the first clause REQUIRES 也 in the second; dropping it sounds incomplete' },
      ],
      [ACT.concession, ACT.grammarPairs],
    ),
    createContentItem(
      '哪怕…也…',
      'nǎpà…yě…',
      'Emphasized concession — "even if [the most extreme case]". 哪怕 carries more emotional weight than 即使 but lower register; common in spoken Mandarin and narrative writing rather than academic essays.',
      'sentence',
      '哪怕只有百分之一的希望，我们也要全力以赴。',
      'Translation: "Even if there is only a one-percent chance, we must give it our all." Emotional emphasis on the smallness of the chance.',
      [
        { target: '哪怕 nǎpà', note: '"even if [the worst case]"; emphasized concession with emotional charge' },
        { target: '即使 vs 哪怕', note: '即使 is formal/neutral; 哪怕 is emotional and slightly lower register' },
      ],
      [ACT.concession, ACT.grammarPairs],
    ),
    createContentItem(
      '无论…都…',
      'wúlùn…dōu…',
      'Universal-quantification concession: "regardless of X, all Y". Formal register — common in legal, policy, and academic writing. 无论 introduces the variable; 都 in the second clause says the result holds across all values.',
      'sentence',
      '无论遇到什么挑战，他都坚持自己的原则。',
      'Translation: "No matter what challenges he faces, he sticks to his principles." Formal-register universal concession.',
      [
        { target: '无论 wúlùn', note: 'formal "regardless of / no matter"; introduces a variable to be quantified over' },
        { target: '都 dōu', note: '"all / always"; second-clause closure of the frame' },
        { target: 'register', note: 'formal — legal, policy, academic; written more than spoken' },
      ],
      [ACT.concession, ACT.grammarPairs],
    ),
    createContentItem(
      '不管…都…',
      'bùguǎn…dōu…',
      'Neutral-register universal concession: "no matter X, all Y". Same structure as 无论…都… but lower register — works in spoken Mandarin, news prose, and mid-register essays.',
      'sentence',
      '不管别人怎么说，我都相信自己的判断。',
      'Translation: "No matter what others say, I trust my own judgment." Neutral register; works in conversation and prose alike.',
      [
        { target: '不管 bùguǎn', note: 'neutral "no matter"; spoken-and-written register' },
        { target: '无论 vs 不管', note: '无论 is formal (essay/policy); 不管 is neutral (everyday and mid-register prose)' },
      ],
      [ACT.concession, ACT.grammarPairs],
    ),
    createContentItem(
      '虽然…但是…',
      'suīrán…dànshì…',
      'The baseline concession pair: "although X, but Y". Works at all register levels — neutral default. Often the pair is shortened in formal writing by replacing 但是 with 然而 (虽然…然而…) for a slight register lift.',
      'sentence',
      '虽然他很努力，但是结果并不理想。',
      'Translation: "Although he worked very hard, the result was not ideal." Baseline concession; works in any register.',
      [
        { target: '虽然 suīrán', note: '"although"; introduces the concession' },
        { target: '但是 dànshì', note: 'casual "but"; can be upgraded to 然而 for formal register' },
        { target: '虽然…然而…', note: 'register-lifted version; 虽然…然而… is the essay form' },
      ],
      [ACT.concession, ACT.grammarPairs],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Conclusion
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '总之',
      'zǒngzhī',
      'Everyday conclusion connector — "in short / in sum". Works in both spoken and written register; the workhorse for closing arguments without sounding pompous. Appropriate for spoken summaries, business emails, and mid-register essays.',
      'sentence',
      '总之，我们需要更多的耐心和时间。',
      'Translation: "In short, we need more patience and time." A clean, neutral wrap-up that works in almost any context.',
      [
        { target: '总之 zǒngzhī', note: 'neutral "in short"; broad-use conclusion connector' },
        { target: 'register', note: 'spoken-and-written; the safe default closing connector' },
      ],
      [ACT.conclusion],
    ),
    createContentItem(
      '总而言之',
      'zǒng\'éryánzhī',
      'Formal four-character "all in all / in conclusion". Used at the start of a final paragraph in an essay or speech. More elaborate than 总之; the elaboration signals essay-register closing.',
      'sentence',
      '总而言之，环境保护是当代社会不可回避的核心议题。',
      'Translation: "All in all, environmental protection is an unavoidable core issue of contemporary society." A typical 议论文 final-paragraph opener.',
      [
        { target: '总而言之 zǒng\'éryánzhī', note: 'formal four-character "all in all"; essay-register conclusion' },
        { target: '总之 vs 总而言之', note: '总之 is the everyday short form; 总而言之 is the essay-register elaborated form' },
      ],
      [ACT.conclusion],
    ),
    createContentItem(
      '综上所述',
      'zōngshàng suǒshù',
      'Very formal four-character "in summary of all the above". Opens the final paragraph of a polished essay or academic paper, signaling that the writer is about to integrate everything discussed. Top of the conclusion-register gradient.',
      'sentence',
      '综上所述，教育改革必须循序渐进，不能急于求成。',
      'Translation: "In summary of all the above, education reform must proceed step by step and cannot be rushed." A textbook 议论文 closing.',
      [
        { target: '综上所述 zōngshàng suǒshù', note: 'very formal "in summary of the above"; top-register essay closing' },
        { target: 'placement', note: 'paragraph-initial; signals the FINAL paragraph of the essay' },
      ],
      [ACT.conclusion, ACT.grammarRegister],
    ),
    createContentItem(
      '由此可见',
      'yóucǐ kějiàn',
      'Means "from this it can be seen / hence we see" — used to draw an inference from previously presented evidence. Common in academic and editorial writing; signals the writer\'s interpretation, not just a summary.',
      'sentence',
      '数据显示，过度使用社交媒体与焦虑情绪密切相关。由此可见，合理控制使用时间至关重要。',
      'Translation: "Data shows that excessive social-media use is closely related to anxiety. From this it can be seen that reasonably controlling usage time is critical." A typical evidence-then-inference move.',
      [
        { target: '由此可见 yóucǐ kějiàn', note: 'formal "hence it is evident"; inference from evidence' },
        { target: 'summary vs inference', note: '综上所述 = "summarizing the above"; 由此可见 = "drawing an inference from the above"' },
      ],
      [ACT.conclusion],
    ),
    createContentItem(
      '一言以蔽之',
      'yīyán yǐ bìzhī',
      'A literary five-character idiom meaning "to sum it up in one word / phrase". Top register, with a Classical Chinese flavor — uses the structure 以 X 蔽之 ("by means of X cover it"). Used sparingly for stylistic punch.',
      'sentence',
      '一言以蔽之，知识改变命运。',
      'Translation: "To sum it up in one phrase: knowledge changes destiny." A polished essay-closing flourish.',
      [
        { target: '一言以蔽之 yīyán yǐ bìzhī', note: 'literary "in one phrase / to sum up tersely"; classical-flavor idiom' },
        { target: 'use sparingly', note: 'overuse sounds pretentious; use once per essay for stylistic emphasis' },
      ],
      [ACT.conclusion, ACT.grammarRegister],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Grammar I: Paired connectors (关联词)
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '关联词系统',
      'guānliáncí xìtǒng',
      'Mandarin connectors come in matched FRONT-BACK pairs called 关联词 (linking-word pairs). The first half signals the relationship; the second half closes it. Unlike English (where one connector usually suffices), Mandarin formal writing prefers BOTH halves of the pair. Dropping the back half is acceptable in speech but sounds incomplete in essays.',
      'sentence',
      '因为 X，所以 Y · 虽然 X，但是 Y · 不但 X，而且 Y · 如果 X，就 Y · 只要 X，就 Y · 即使 X，也 Y · 无论 X，都 Y',
      'The seven most common pairs — memorize as units, not as individual words.',
      [
        { target: '因果 cause-effect', note: '因为 X，所以 Y — formal: 由于 X，因此 Y' },
        { target: '转折 contrast', note: '虽然 X，但是 Y — formal: 虽然 X，然而 Y' },
        { target: '递进 escalation', note: '不但 X，而且 Y — also 不仅 X，而且 Y' },
        { target: '假设 hypothesis', note: '如果 X，就 Y — formal: 假如 X，那么 Y' },
        { target: '条件 sufficient', note: '只要 X，就 Y' },
        { target: '让步 concession', note: '即使 X，也 Y' },
        { target: '让步 universal', note: '无论 X，都 Y — formal: 不管 X，都 Y (neutral)' },
      ],
      [ACT.grammarPairs],
    ),
    createContentItem(
      '前后照应',
      'qián hòu zhàoyìng',
      '"Front-back correspondence" — the rule that paired connectors must match. Mismatch sounds wrong: 因为 X，但是 Y mixes cause-effect with contrast, garbling the meaning. ALWAYS pair 因为 with 所以/因此, 虽然 with 但是/然而, 不但 with 而且, etc.',
      'sentence',
      'WRONG: 因为下雨，但是没去。(mismatched: cause + contrast)\nCORRECT: 因为下雨，所以没去。(cause + result)\nCORRECT: 虽然下雨，但是去了。(concession + contrast)',
      'A common learner mistake; native speakers immediately hear the mismatch.',
      [
        { target: 'CORRECT pairings', note: '因为…所以…, 虽然…但是…, 不但…而且…, 如果…就…' },
        { target: 'WRONG mixes', note: '因为…但是…, 虽然…所以…, 如果…也… — all mismatched' },
      ],
      [ACT.grammarPairs],
    ),
    createContentItem(
      '省略后半',
      'shěnglüè hòu bàn',
      'In SPOKEN Mandarin and casual writing, the second half of a connector pair is often dropped: 因为我累了，回家了 ("because I was tired, [I] went home") — 所以 is omitted. In FORMAL writing this sounds incomplete; restore the second half for essay register.',
      'sentence',
      'CASUAL: 因为我累了，回家了。\nFORMAL: 因为我感到疲惫，所以决定回家休息。',
      'A key register marker: dropping the back half is a casualness signal that essay writers must avoid.',
      [
        { target: 'spoken Mandarin', note: 'back half often dropped; conversation tolerates the gap' },
        { target: 'essay register', note: 'both halves present; the matched pair signals deliberate logical structure' },
      ],
      [ACT.grammarPairs],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Grammar II: The register gradient
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '语体梯度',
      'yǔtǐ tīdù',
      'The four-step register gradient for Mandarin connectors. SPOKEN (口语): text messages, drama dialogue, chat — 但是 / 所以 / 如果 / 然后. SEMI-FORMAL (半正式): news, business email, mid-register essay — 不过 / 因此 / 假如 / 接着. FORMAL (正式): 议论文, editorial, academic prose — 然而 / 因而 / 倘若 / 其次. LITERARY (文言色彩): academic paper, legal text, classical-style writing — 反之 / 故 / 倘 / 既…又….',
      'sentence',
      'CONTRAST: 但是 (spoken) → 不过 (semi-formal) → 然而 (formal) → 反之 (literary)',
      'Picking the right step is half of essay style; mixing steps within a paragraph sounds amateurish.',
      [
        { target: 'STEP 1 SPOKEN', note: '但是 / 所以 / 如果 / 然后 — chat, drama, casual writing' },
        { target: 'STEP 2 SEMI-FORMAL', note: '不过 / 因此 / 假如 / 接着 — news, business, mid-register essays' },
        { target: 'STEP 3 FORMAL', note: '然而 / 因而 / 倘若 / 其次 — 议论文, editorials, academic prose' },
        { target: 'STEP 4 LITERARY', note: '反之 / 故 / 倘 — academic papers, legal text, classical-flavor writing' },
      ],
      [ACT.grammarRegister],
    ),
    createContentItem(
      '混用警告',
      'hùnyòng jǐnggào',
      'Register mixing — using a spoken connector (但是) and a formal one (然而) in the same paragraph — is one of the most common essay-writing mistakes. Once you choose a register step, stay on it. A 议论文 reads jarringly if it has 然而 in one sentence and 但是 in the next.',
      'sentence',
      'BAD: 然而，事实并非如此。但是，我们应该……\nGOOD: 然而，事实并非如此。然而 / 然而，我们应该……',
      'Native readers immediately sense register breaks; consistency is what reads as polished.',
      [
        { target: 'spoken-formal mix', note: 'most common mistake; sounds amateur in essays' },
        { target: 'register consistency', note: 'once you pick step 3 (formal), all connectors should be step 3 or higher' },
      ],
      [ACT.grammarRegister],
    ),
    createContentItem(
      '四字连接词',
      'sìzì liánjiēcí',
      'Four-character connectors (综上所述, 由此可见, 一言以蔽之, 与此同时, 总而言之) are the highest register. They carry essay weight but feel pompous in casual chat. Using them well in a 高考 essay earns style points; using them in a text message to a friend sounds bookish.',
      'sentence',
      '综上所述 zōngshàng suǒshù · 由此可见 yóucǐ kějiàn · 一言以蔽之 yīyán yǐ bìzhī · 与此同时 yǔcǐ tóngshí · 总而言之 zǒng\'éryánzhī',
      'Top-register markers; use sparingly — one per paragraph maximum.',
      [
        { target: '综上所述', note: '"in summary of the above"; final-paragraph opener' },
        { target: '由此可见', note: '"hence we see"; evidence-to-inference marker' },
        { target: '一言以蔽之', note: '"in one phrase"; stylistic flourish' },
        { target: '与此同时', note: '"at the same time"; news-prose parallel' },
        { target: '总而言之', note: '"all in all"; formal essay closing' },
      ],
      [ACT.grammarRegister],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Grammar III: Paragraph chaining
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '段落串联',
      'duànluò chuànlián',
      'Essay paragraphs typically chain THREE or more connectors from different categories: a SEQUENCE opener (首先), a CONTRAST or CAUSE-EFFECT in the middle (然而 / 因此), and a CONCLUSION (综上所述 / 由此可见). The chaining signals deliberate logical structure — what graders look for in 议论文.',
      'sentence',
      '首先，教育是人类进步的基石。然而，传统的教育模式存在诸多问题。因此，改革势在必行。综上所述，教育改革应当成为优先任务。',
      'Four sentences using four different connector categories (sequence + contrast + cause-effect + conclusion) — textbook 高考 essay paragraph structure.',
      [
        { target: '首先 (sequence)', note: 'opens the paragraph with the first point' },
        { target: '然而 (contrast)', note: 'mid-paragraph contrast or counter-point' },
        { target: '因此 (cause-effect)', note: 'logical consequence flowing from the contrast' },
        { target: '综上所述 (conclusion)', note: 'closes the paragraph with summary inference' },
      ],
      [ACT.grammarChaining],
    ),
    createContentItem(
      '段落开头位置',
      'duànluò kāitóu wèizhi',
      'Paragraph-level connectors (此外, 然而, 综上所述, 由此可见, 总而言之) sit at the START of new sentences — NOT buried in the middle. Placement signals discourse structure: the reader sees the connector first and knows immediately what relationship is coming. Mid-sentence placement breaks the discourse cue.',
      'sentence',
      'GOOD: 此外，环境保护也至关重要。\nWEAK: 环境保护，此外，也至关重要。 (mid-sentence — breaks the cue)',
      'Sentence-initial placement is the rule for paragraph-level connectors.',
      [
        { target: 'sentence-initial', note: '此外 / 然而 / 因此 / 综上所述 — all open new sentences' },
        { target: 'clause-internal', note: 'mid-clause connectors like 不过 / 而 / 也 can sit mid-sentence; paragraph-level ones cannot' },
      ],
      [ACT.grammarChaining],
    ),
    createContentItem(
      '一致性',
      'yīzhìxìng',
      'Register consistency across the chain — a formal opener (首先) requires formal middle connectors (然而 / 因此) and a formal closer (综上所述). One casual connector (然后) breaks the chain. Always check the full chain after drafting.',
      'sentence',
      'INCONSISTENT: 首先，X。然后 Y。因此 Z。(然后 is casual mid-register break)\nCONSISTENT: 首先，X。其次 Y。因此 Z。综上所述，W。',
      'Always read your essay paragraph through once and flag any spoken-register connectors hiding in a formal chain.',
      [
        { target: 'consistent chain', note: 'all connectors at step 3 (formal) or above' },
        { target: 'broken chain', note: 'one spoken-register connector (然后, 但是) downgrades the whole paragraph' },
      ],
      [ACT.grammarChaining],
    ),
    createContentItem(
      '示范段落',
      'shìfàn duànluò',
      'A model essay paragraph using FIVE connector categories in one logical chain: sequence + addition + contrast + cause-effect + conclusion. Notice how each connector sits at the start of its sentence and the register stays consistent throughout.',
      'sentence',
      '首先，互联网为人们获取信息提供了前所未有的便利。此外，它还促进了跨文化交流。然而，海量信息也带来了真假难辨的问题。因此，培养批判性思维成为当代教育的关键任务。综上所述，互联网既是机遇，也是挑战。',
      'Five sentences, five connector categories, consistent formal register — a textbook 议论文 body paragraph.',
      [
        { target: '首先 (sequence opener)', note: 'introduces the first point' },
        { target: '此外 (addition)', note: 'adds a related point' },
        { target: '然而 (contrast)', note: 'introduces the counter-point' },
        { target: '因此 (cause-effect)', note: 'derives the consequence' },
        { target: '综上所述 (conclusion)', note: 'closes with summary' },
      ],
      [ACT.grammarChaining],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 13 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '议论文',
      'yìlùnwén',
      'The argumentative essay — the dominant Chinese essay genre, central to 高考 (college-entrance exam) writing. Its structure rewards explicit logical connectors: opener stating the position, body developing arguments with sequence and cause-effect, conclusion summarizing. Graders count whether connectors were used appropriately.',
      'sentence',
      '议论文典型结构: 引出论点 → 分论点（首先…其次…最后…） → 反驳（然而…） → 总结（综上所述…）',
      'Connectors are not decorative — they are structural cues that 高考 graders explicitly look for.',
      [
        { target: '论点 lùndiǎn', note: 'thesis statement; the position being argued' },
        { target: '分论点 fēn lùndiǎn', note: 'sub-points; usually three, marked by 首先…其次…最后…' },
        { target: '反驳 fǎnbó', note: 'counter-argument; usually marked by 然而 or 相反' },
        { target: '总结 zǒngjié', note: 'conclusion; marked by 综上所述 or 总而言之' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '高考与公务员考试',
      'gāokǎo yǔ gōngwùyuán kǎoshì',
      'Two high-stakes exams in mainland China where connector use is heavily graded: 高考 (gāokǎo, college-entrance exam) writing section, and 公务员考试 (gōngwùyuán kǎoshì, civil-service exam) 申论 (shēnlùn, "essay analysis"). Both require formal register, paired connectors, and four-character conclusion phrases.',
      'sentence',
      '高考作文标准: 论点明确 + 论据充分 + 论证清晰（连接词到位） + 语言规范',
      'Connector choice is part of "论证清晰" (clear argumentation) — the criterion graders mark most directly.',
      [
        { target: '高考 gāokǎo', note: 'college-entrance exam; essay section worth ~40% of Chinese-language score' },
        { target: '公务员考试 gōngwùyuán kǎoshì', note: 'civil-service exam; 申论 essay tests formal-register argumentation' },
        { target: '申论 shēnlùn', note: 'civil-service essay format; requires policy-style formal connectors throughout' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '八股与起承转合',
      'bāgǔ yǔ qǐ-chéng-zhuǎn-hé',
      'The historical roots of modern Chinese essay structure. 八股 (bāgǔ, "eight-legged essay") was the rigid prose form required in imperial-era civil-service exams. While 八股 itself is gone, its DNA — the four-part progression 起承转合 (qǐ-chéng-zhuǎn-hé, "open-develop-turn-close") — still shapes how 议论文 paragraphs are organized.',
      'sentence',
      '起 (qǐ) — opening / introduce the topic\n承 (chéng) — develop / elaborate\n转 (zhuǎn) — turn / introduce contrast\n合 (hé) — close / synthesize',
      'Modern connectors map onto this four-step DNA: 首先 (起) → 其次 / 此外 (承) → 然而 / 反之 (转) → 综上所述 / 由此可见 (合).',
      [
        { target: '起 qǐ', note: '"open" — introduce the topic; marked by 首先 or thesis statement' },
        { target: '承 chéng', note: '"develop" — elaborate the point; marked by 其次 / 此外 / 而且' },
        { target: '转 zhuǎn', note: '"turn" — introduce contrast or pivot; marked by 然而 / 相反 / 反之' },
        { target: '合 hé', note: '"close" — synthesize; marked by 综上所述 / 由此可见 / 总而言之' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '梯度示范',
      'tīdù shìfàn',
      'The formality gradient on one connector: contrast. Watch the same logical move move across four register steps. Picking the right step is what marks the writer as having mastered Chinese register.',
      'sentence',
      'TEXT MESSAGE: 我累了，但是还要写作业。\nNEWS PROSE: 经济正在恢复，不过仍面临挑战。\n议论文: 科技带来便利，然而也带来风险。\nACADEMIC PAPER: 高温加速反应；反之，低温减缓之。',
      'Same logical relation (contrast), four different connectors, four different register slots.',
      [
        { target: 'spoken 但是', note: 'text, chat, drama dialogue' },
        { target: 'semi-formal 不过', note: 'news, business, mid-register essay' },
        { target: 'formal 然而', note: '议论文, editorial, academic prose' },
        { target: 'literary 反之', note: 'academic paper, legal text, classical-style writing' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 14 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '任务: 改写口语段落',
      'rènwù: gǎixiě kǒuyǔ duànluò',
      'Take a 3–5 sentence casual paragraph and rewrite it in formal essay register using FOUR or more different connectors from the cluster. The original uses only spoken markers (然后, 但是, 所以); the rewrite should use category-mixed connectors (sequence + contrast + cause-effect + conclusion).',
      'sentence',
      'ORIGINAL (casual): 我今天很忙。我有很多作业。我还要去图书馆。然后我要去开会。我觉得太累了。\nREWRITE (essay): 今日事务繁多。首先，我有大量作业需要完成。此外，还须前往图书馆查阅资料。与此同时，下午还有一场重要会议。综上所述，今日工作量已远超个人承受范围。',
      'Four connectors from four categories — 首先 (sequence) + 此外 (addition) + 与此同时 (addition/parallel) + 综上所述 (conclusion) — produces essay-grade register from a text-message-grade original.',
      [
        { target: '首先 (sequence)', note: 'opens the first point in the rewritten paragraph' },
        { target: '此外 (addition)', note: 'adds the second point' },
        { target: '与此同时 (parallel)', note: 'adds the simultaneous third point — four-character connector for essay weight' },
        { target: '综上所述 (conclusion)', note: 'closes with the summary; top-register four-character closer' },
        { target: 'vocabulary upgrade', note: 'note: 很忙 → 事务繁多, 然后 → 与此同时, 我觉得 → 综上所述 — vocabulary lifts in parallel with connectors' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战 — 五连接词议论文',
      'tiǎozhàn — wǔ liánjiēcí yìlùnwén',
      'Stretch goal: produce a 议论文 body paragraph (5–6 sentences) using FIVE connectors from FIVE different categories (addition, contrast, cause-effect, sequence, conclusion). Maintain formal register throughout; the AI tutor will check both connector category coverage AND register consistency.',
      'sentence',
      'TOPIC: 人工智能对就业的影响 (The impact of AI on employment)\nMODEL: 首先，人工智能极大地提高了生产效率。此外，它还创造了新型的就业岗位。然而，许多传统岗位也面临被取代的风险。因此，劳动力市场必须及时调整。综上所述，人工智能既是机遇，也是挑战，需要社会各界共同应对。',
      'Five categories: sequence (首先) + addition (此外) + contrast (然而) + cause-effect (因此) + conclusion (综上所述). Register is consistent essay-level throughout.',
      [
        { target: '首先 (sequence)', note: 'opens the body paragraph' },
        { target: '此外 (addition)', note: 'adds the parallel positive point' },
        { target: '然而 (contrast)', note: 'introduces the counter-point — the pivot of the argument' },
        { target: '因此 (cause-effect)', note: 'derives the practical consequence' },
        { target: '综上所述 (conclusion)', note: 'closes with synthesis — four-character top-register essay close' },
      ],
      [ACT.task, ACT.grammarChaining],
    ),
    createContentItem(
      '挑战 — 梯度切换',
      'tiǎozhàn — tīdù qiēhuàn',
      'Final stretch: take ONE underlying argument and write it THREE times at three different register steps. Step 1: text message to a friend. Step 2: news editorial. Step 3: 高考 议论文 body paragraph. Each version uses different connectors but conveys the same logical content.',
      'sentence',
      'ARGUMENT: AI helps efficiency but also causes job loss; education needs to adapt.\n\nSTEP 1 (text): AI挺方便的，但是很多工作没了。所以学校得改改。\n\nSTEP 2 (news): AI显著提升了生产效率，不过也带来就业冲击。因此，教育体系亟需调整。\n\nSTEP 3 (议论文): 人工智能极大提高了生产效率。然而，它同时也导致大量传统岗位消失。综上所述，教育体系必须主动适应这一变革。',
      'Same logical content, three register levels, three connector vocabularies — mastering this register swap is the heart of advanced Mandarin writing.',
      [
        { target: 'STEP 1', note: '但是 / 所以 — spoken register' },
        { target: 'STEP 2', note: '不过 / 因此 — semi-formal news register' },
        { target: 'STEP 3', note: '然而 / 综上所述 — formal essay register' },
      ],
      [ACT.task, ACT.grammarRegister],
    ),
  ],
};

module.exports = lesson;
