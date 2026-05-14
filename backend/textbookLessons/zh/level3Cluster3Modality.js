// Level 3 Cluster 3 — 情态与说话人的态度 (Modality & Speaker Attitude)
// Advanced cluster covering the full Mandarin modality system: how speakers
// express possibility, necessity, ability, volition, evidentiality, stance,
// and hedging. The cluster builds on the basic ability verbs from Level 1
// Unit 14 (会/能/可以) and adds the gradients of certainty and compulsion,
// the evidential markers, the surprise/contrary-expectation stance words,
// and the face-saving hedging that characterizes Chinese pragmatics.
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
  orientation: 'zh-l3c3-orientation',
  pronunciation: 'zh-l3c3-pronunciation',
  possibility: 'zh-l3c3-possibility',
  necessity: 'zh-l3c3-necessity',
  ability: 'zh-l3c3-ability',
  volition: 'zh-l3c3-volition',
  evidentiality: 'zh-l3c3-evidentiality',
  stance: 'zh-l3c3-stance',
  hedging: 'zh-l3c3-hedging',
  grammarAspect: 'zh-l3c3-grammar-aspect',
  grammarWordOrder: 'zh-l3c3-grammar-word-order',
  grammarRhetorical: 'zh-l3c3-grammar-rhetorical',
  culture: 'zh-l3c3-culture',
  task: 'zh-l3c3-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Pick the right modality word out of a gradient of near-synonyms (可能 / 也许 / 或许 / 大概 / 恐怕) instead of always defaulting to 可能 — the gradient is meaningful and native speakers hear the difference.',
      'Express necessity, ability, willingness, and source-of-knowledge with the appropriate marker rather than translating English "must / can / want / heard" word-for-word.',
      'Use stance markers (难道 / 居然 / 竟然 / 偏偏) and hedges (好像 / 应该 / 也许) to communicate not just facts but the speaker\'s attitude toward those facts.',
    ],
    task: 'Imagine a tense lab meeting at 清华大学 — your advisor asks whether you can finish the paper by Friday. By the end of this cluster you should hedge, qualify, and signal stance with the same fluency as your Mainland classmates rather than sounding blunt and overconfident.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in the stance vocabulary',
    goals: [
      'Distinguish 居然 (jūrán) from 竟然 (jìngrán) — they share the same translation in most dictionaries but feel different (居然 = more astonished, 竟然 = more disapproving), and the initial vowel + tone contour is the only audible difference.',
      'Read 偏偏 (piānpiān) with two clear first tones — the reduplication is meaning-carrying ("of all things"), so a sloppy second-syllable tone weakens the stance.',
      'Read 据说 (jùshuō) cleanly — fourth tone + first tone, with no tone bleed; a learner who softens the 据 to a neutral tone makes the evidential disappear.',
    ],
    task: 'Read each pair aloud (居然/竟然, 偏偏 twice, 据说 in a sample sentence). Identify which one of each pair you produced naturally and which one needs extra drilling.',
  },
  {
    id: ACT.possibility,
    section: 'Vocabulary I',
    title: 'Possibility gradient — from 可能 to 恐怕',
    goals: [
      'Place the five high-frequency possibility markers on a certainty scale: 一定 (certain) > 应该 (should / likely) > 可能 (possible, neutral) > 也许 / 或许 (maybe, more tentative) > 大概 (roughly, estimating) > 恐怕 (afraid that, bad news likely) > 说不定 (could be, surprising possibility).',
      'Match each marker to the situation that fits it: news with negative implication uses 恐怕; a guess at quantity uses 大概; a polite hedge uses 也许; a confident inference uses 应该.',
    ],
    task: 'For each of 5 prompt sentences, choose which possibility marker best fits the situation. Justify the choice in one phrase per item.',
  },
  {
    id: ACT.necessity,
    section: 'Vocabulary II',
    title: 'Necessity gradient — from 应该 to 非…不可',
    goals: [
      'Place the necessity markers on a compulsion scale: 应该 (should, soft) > 得 děi (need to, colloquial) > 要 (need to, neutral) > 必须 (must, strong) > 一定要 (definitely must, emphatic) > 不得不 (have no choice but to, reluctant) > 非…不可 (must absolutely, almost-double-negative emphasis).',
      'Pick the right marker for register: 应该 in advice to a peer, 必须 in formal rules, 不得不 when describing reluctant obligation, 非…不可 in dramatic emphasis or stubborn insistence.',
    ],
    task: 'Rewrite the same English "I must finish the paper" five times, swapping in 应该 / 要 / 必须 / 一定要 / 非…不可 — feel how the tone shifts from gentle to almost desperate.',
  },
  {
    id: ACT.ability,
    section: 'Vocabulary III',
    title: 'Ability — 会 vs 能 vs 可以 (advanced contrast)',
    goals: [
      'Recall the Level 1 baseline (会 = learned skill, 能 = physical/circumstantial ability, 可以 = permission) and add the advanced contrast: 能 also covers "managed to" and is the negation-friendly form (不能 is more natural than 不会 for circumstantial inability).',
      'Apply the advanced rule that 可以 in questions sounds like asking for permission, while 能 in questions sounds like asking about feasibility — confusing them sounds either too presumptuous or too tentative.',
    ],
    task: 'For each of 5 mini-scenarios (asking permission, describing a learned skill, describing a circumstantial inability, asking feasibility, refusing politely), pick 会 / 能 / 可以 and explain why.',
  },
  {
    id: ACT.volition,
    section: 'Vocabulary IV',
    title: 'Volition gradient — from 想 to 情愿',
    goals: [
      'Place the willingness markers on a scale: 想 (want to, neutral) > 要 (want, strong/insistent) > 愿意 (willing to, polite) > 乐意 (happy to, warm) > 情愿 (would rather, often paired with a contrast) > 巴不得 (can\'t wait to, eager).',
      'Hear the register difference: 愿意 in a formal meeting, 乐意 when offering help warmly, 情愿 when expressing a reluctant preference, 巴不得 in casual eager speech.',
    ],
    task: 'Rewrite a flat sentence "I want to help" with three different volition markers (愿意 / 乐意 / 巴不得) and explain how each one shifts the perceived warmth or eagerness.',
  },
  {
    id: ACT.evidentiality,
    section: 'Vocabulary V',
    title: 'Evidentiality — how you know what you know',
    goals: [
      'Use the right evidential marker for the source of information: 据说 (it is said / according to reports, distant or official source), 听说 (I heard, personal hearsay), 看起来 / 看上去 (looks like, visual evidence), 显然 (evidently / obviously, inferred from clear evidence), 似乎 (seemingly, subjective impression).',
      'Recognize that English speakers often drop the evidential entirely ("the meeting is canceled" vs Chinese 听说会议取消了); in Mandarin, marking the source softens the claim and protects you if it turns out to be wrong.',
    ],
    task: 'Take 5 flat factual sentences and rewrite each one with the evidential that fits the imagined source (rumor / news / visible / inferred / impression).',
  },
  {
    id: ACT.stance,
    section: 'Vocabulary VI',
    title: 'Stance markers — surprise and contrary expectation',
    goals: [
      'Distinguish the surprise stance markers: 居然 (astonished, often positive surprise), 竟然 (incredulous, often disapproving or unwelcome), 偏偏 (of all things / inconveniently, signaling frustration that it happened this way), 难道 (could it be that?, rhetorical surprise in questions).',
      'Place the marker BEFORE the verb (or at the start of the sentence for 难道) — Mandarin stance markers have fixed positions and shifting them is ungrammatical.',
    ],
    task: 'Read each of 4 surprise scenarios and pick the stance marker that fits, then rewrite the same scenario with a different marker and feel the meaning shift.',
  },
  {
    id: ACT.hedging,
    section: 'Vocabulary VII',
    title: 'Hedging cluster — 好像 / 应该 / 可能 in soft talk',
    goals: [
      'Use 好像 (seems like) and 应该 (should be, inferred) to soften assertions even when you are reasonably sure — the cultural default in Mandarin is to hedge, not to assert directly.',
      'Stack hedges naturally: 应该可能 (should be possible), 好像不太… (doesn\'t quite seem…), 也许 + 吧 (maybe, with a softening final particle).',
    ],
    task: 'Take 3 direct statements ("the file is wrong" / "you are late" / "we cannot finish") and rewrite each one with at least two hedges, watching the social tone soften from accusatory to collaborative.',
  },
  {
    id: ACT.grammarAspect,
    section: 'Grammar I',
    title: 'Modality + aspect — modal + 了/过/着 combinations',
    goals: [
      'Combine modality markers with the experiential aspect marker 过 (guo): 可能去过 ("might have been there"), 应该看过 ("should have seen it"), 必须做过 ("must have done it before") — the modal sits BEFORE the verb, 过 sits AFTER.',
      'Combine modality with the perfective 了: 应该走了 ("should have left already"); avoid stacking 了 on a stative modal itself — say 应该…了, not 应该了.',
      'Recognize that English speakers often try to put the modal AFTER the verb ("seen it might"); Mandarin is strict: modal-verb word order is mandatory.',
    ],
    task: 'Translate 5 English "modal perfect" sentences ("might have gone", "should have known", etc.) into Mandarin using modal + verb + 过/了 in the correct order.',
  },
  {
    id: ACT.grammarWordOrder,
    section: 'Grammar II',
    title: 'Stance-marker word order — sentence-initial vs pre-verb',
    goals: [
      'Master the two positions for stance markers: sentence-initial (难道, often) signals a rhetorical or surprise frame; pre-verb (居然 / 竟然 / 偏偏) signals the speaker\'s reaction to the specific action.',
      'Place 难道 at the start: 难道你不知道吗? ("Could it really be that you don\'t know?"). Place 居然/竟然/偏偏 between the subject and the verb: 他居然来了 ("He actually came!"). Moving them violates word order.',
    ],
    task: 'For each of 4 sentence frames, mark whether the stance word goes sentence-initial or pre-verb, and write one correct example each.',
  },
  {
    id: ACT.grammarRhetorical,
    section: 'Grammar III',
    title: 'Rhetorical questions as modality',
    goals: [
      'Use a rhetorical question (with 难道 or with 不…吗?) to express a strong stance disguised as a question — 难道你不知道吗? ("Don\'t you really know?") is far stronger than 你不知道. The rhetorical frame signals that the speaker assumes the listener should already know.',
      'Recognize that rhetorical questions in Mandarin are not literal questions; answering them with 是 / 不是 misses the speaker\'s point. Match the rhetorical force with an acknowledgment instead (好的，我知道了).',
    ],
    task: 'Convert 3 direct accusations into rhetorical questions using 难道…吗?, then explain in one phrase per item what the stronger emotional force is.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: 'Face-saving modality — why Chinese hedges even when sure',
    goals: [
      'Understand that Mandarin speakers regularly use 应该 / 可能 / 也许 even when they ARE sure of the answer — the hedge is a politeness device, not a true marker of uncertainty.',
      'Recognize that overly direct speech (省去 the hedges and just stating facts) can sound rude or aggressive in Mandarin professional contexts; conversely, an over-hedged answer in a Western context can sound evasive — register-switching is a real bilingual skill.',
      'Understand the role of 大概 / 差不多 in Chinese estimates — preferring an approximate answer over a precise one is a feature of conversational style, not a sign of ignorance.',
    ],
    task: 'List 3 situations from your own week (work, school, family) where switching from direct to hedged speech would land better in Mandarin, and write the hedged version for each.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'Polite-rewrite challenge + stance-identification challenge',
    goals: [
      'Part A — Rewrite 5 blunt direct sentences using appropriate modality + hedges to sound more polite and natural in Mandarin (target: 1–2 hedges per sentence, no over-stacking).',
      'Part B — Read 5 hedged sentences and identify the speaker\'s ACTUAL stance underneath the hedge: certain / uncertain / disappointed / surprised / reluctant.',
    ],
    task: 'Complete Part A and Part B in writing, then read your Part A rewrites aloud to feel how the rhythm softens.',
  },
];

const lesson = {
  title: 'Level 3 · Cluster 3: 情态与说话人的态度 — Modality & Speaker Attitude',
  category: 'daily-life',
  difficulty: 'advanced',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'grammar',
  activities,
  expressionPractice: [
    { id: 'expressing-possibility', label: 'Expressing possibility', goal: 'Pick the right marker on the certainty gradient (一定 → 应该 → 可能 → 也许 → 大概 → 恐怕) for the situation rather than defaulting to 可能.' },
    { id: 'expressing-necessity', label: 'Expressing necessity', goal: 'Match the compulsion level (应该 → 要 → 必须 → 一定要 → 非…不可) to the social context — soft advice vs hard rule vs dramatic insistence.' },
    { id: 'evidential-framing', label: 'Framing your source', goal: 'Add 据说 / 听说 / 看起来 / 显然 / 似乎 to mark whether a claim comes from rumor, hearsay, visual evidence, inference, or impression.' },
    { id: 'stance-marking', label: 'Showing surprise or contrary expectation', goal: 'Drop 居然 / 竟然 / 偏偏 / 难道 in the correct position to color a sentence with the speaker\'s attitude rather than stating it flatly.' },
    { id: 'face-saving-hedging', label: 'Hedging to save face', goal: 'Stack 应该 / 可能 / 好像 to soften a claim, refusal, or correction in a Mandarin professional context.' },
  ],
  relatedPools: ['pos-adverbs-1', 'topic-society'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '本课目标',
      'běn kè mùbiāo',
      'By the end of this cluster, you can pick a specific modality word out of a gradient of near-synonyms, signal where your information comes from, and color your sentences with stance markers — instead of producing flat translations of English modals.',
      'word',
      'Five skill areas: possibility · necessity · ability · volition · evidentiality · stance · hedging.',
      'These are the seven knobs on the Mandarin modality console; each carries register and social information, not just truth-conditional meaning.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      '真实场景',
      'zhēnshí chǎngjǐng',
      'You are in a Friday lab meeting at 清华大学. Your advisor asks whether the paper will be finished by Monday. A flat "可以" sounds overconfident; a flat "不行" sounds rude. The right answer threads modality, evidentiality, and hedging into one polite sentence.',
      'word',
      '导师: 这篇论文周一能交吗? 你: 应该没问题，但是有几个数据可能还要再核对一下，恐怕周一下午才能交。',
      'A native-sounding answer combines 应该 (likely), 可能 (might), and 恐怕 (afraid that) — three hedges that protect you from over-promising while still committing.',
      [
        { target: '应该没问题 yīnggāi méi wèntí', note: '"should be no problem" — soft commitment, the standard Mandarin opener for "yes, probably"' },
        { target: '可能还要再核对 kěnéng hái yào zài héduì', note: '"might still need to re-check" — adds a hedge to signal there is a real risk' },
        { target: '恐怕…才能 kǒngpà…cái néng', note: '"I am afraid (it will be) only at…" — pre-warning the listener that the deadline will slip slightly' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '七大类',
      'qī dà lèi',
      'The seven categories of modality covered in this cluster, each with its own gradient. Pick the category first based on what you are doing (estimating likelihood vs imposing obligation vs sourcing information), then pick the specific marker on the gradient.',
      'word',
      '可能性 · 必要性 · 能力 · 意愿 · 信息来源 · 立场 · 委婉表达',
      'Confusing the categories is the most common learner error — using a possibility marker (可能) where a necessity marker (应该) is needed, for example.',
      [
        { target: '可能性 kěnéngxìng', note: 'possibility — likelihood that something is true or will happen' },
        { target: '必要性 bìyàoxìng', note: 'necessity — degree of compulsion or obligation' },
        { target: '能力 nénglì', note: 'ability — learned skill, physical/circumstantial capability, or permission' },
        { target: '意愿 yìyuàn', note: 'volition — degree of willingness or eagerness' },
        { target: '信息来源 xìnxī láiyuán', note: 'evidentiality — how the speaker knows what they are saying' },
        { target: '立场 lìchǎng', note: 'stance — surprise, contrary expectation, disapproval' },
        { target: '委婉表达 wěiwǎn biǎodá', note: 'hedging — softening claims to save face' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '居然 vs 竟然',
      'jūrán vs jìngrán',
      'Two stance markers with overlapping dictionary translations but distinct feel. 居然 (jūrán, first + second tones) carries astonishment and is often used for unexpected positive turns. 竟然 (jìngrán, fourth + second tones) carries incredulity and tilts negative or disapproving. The audible difference is the initial vowel and the first-syllable tone.',
      'word',
      '他居然来了！(positive surprise: "He actually came!") vs 他竟然没来 (disapproving: "He really didn\'t come?!").',
      'Native speakers swap them sometimes, but in formal writing the distinction matters; mispronouncing the tones flattens the stance.',
      [
        { target: '居然 jūrán', note: 'first + second tones; "ju" with the palatal initial j-; astonished, often welcome surprise' },
        { target: '竟然 jìngrán', note: 'fourth + second tones; "jing" with -ng nasal; incredulous, often unwelcome surprise' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '偏偏',
      'piānpiān',
      'A reduplicated first-tone-first-tone stance word meaning "of all things / contrary to expectation / inconveniently". The reduplication is meaning-bearing — saying it once (偏) feels incomplete, and softening the second tone to neutral weakens the frustration the word is designed to carry.',
      'word',
      '我刚出门，偏偏就下雨了。("I had just stepped out — of all times, it started raining.")',
      'Both syllables are crisply first-tone (high-level); the doubled high pitch is what makes the word feel emphatic.',
      [
        { target: '偏 piān (1st)', note: 'high-level tone; standalone means "incline, lean, biased"' },
        { target: '偏偏 piānpiān', note: 'reduplicated form; "inconveniently, of all things"; the doubled high tone is part of the meaning' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '据说',
      'jùshuō',
      'A high-frequency evidential meaning "it is said / according to reports". Fourth tone + first tone — the 据 must stay crisp and falling, not soften to a neutral tone. Learners who reduce 据 make the evidential disappear and the listener hears just 说 (say).',
      'word',
      '据说这家餐厅很好吃。("It is said this restaurant is very tasty.")',
      'Mark this with full 4th + 1st tones; the contrast between falling (据) and high-level (说) is what signals the evidential clearly.',
      [
        { target: '据 jù (4th)', note: 'sharp falling tone; "according to, basis"; must not reduce to neutral' },
        { target: '说 shuō (1st)', note: 'high-level tone; "say, speak"; following the falling 据, the contrast is striking' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '难道',
      'nándào',
      'A two-syllable rhetorical-question opener meaning "could it be that…?". Second tone + fourth tone — the rising-then-falling contour is what signals the rhetorical frame to the listener. Often paired with a sentence-final 吗 (难道…吗?).',
      'word',
      '难道你不知道吗? ("Could it be that you really don\'t know?")',
      'The two-syllable rising-falling rhythm is recognizable; if you flatten the tones, the listener may miss that the question is rhetorical.',
      [
        { target: '难 nán (2nd)', note: 'rising tone; "difficult"; here it forms the lead syllable of the rhetorical particle' },
        { target: '道 dào (4th)', note: 'falling tone; "way, road"; together 难道 = "could it really be that…?"' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '恐怕',
      'kǒngpà',
      'A two-syllable possibility marker meaning "I\'m afraid that (something undesirable is the case)". Third tone + fourth tone — the dip-and-rise of 恐 followed by the sharp fall of 怕. Used to deliver bad news politely.',
      'word',
      '恐怕来不及了。("I\'m afraid it\'s too late.")',
      'The dip-rise-then-fall rhythm matches the apologetic feel of the word; flat tones make it sound merely factual.',
      [
        { target: '恐 kǒng (3rd)', note: 'dip-then-rise tone; "fear, dread"' },
        { target: '怕 pà (4th)', note: 'sharp falling tone; "fear"; together 恐怕 = "I\'m afraid that…"' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Possibility gradient
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '一定',
      'yīdìng',
      'The top of the possibility scale: "definitely / certainly". Used when the speaker is fully confident. Placed BEFORE the verb. Watch the tone sandhi: 一 changes to yí before fourth-tone 定, so spoken as yídìng.',
      'word',
      '他一定会来。("He will definitely come.")',
      'Distinguishes a confident prediction from a hedged one; pair with 会 / 是 for predictions and identifications.',
      [
        { target: '一定 yídìng', note: 'definite, certain; spoken with 一-sandhi to yí before fourth-tone 定' },
        { target: '一定 + 会 / 是', note: 'common combinations: 一定会成功 ("will definitely succeed"), 一定是他 ("must be him")' },
      ],
      [ACT.possibility],
    ),
    createContentItem(
      '应该',
      'yīnggāi',
      'High-end of the possibility scale: "should / ought to (likely)". Carries inferential certainty — the speaker reasons that something is probably the case. Also covers the necessity sense "should" (covered in Activity 4), but here we focus on the possibility reading.',
      'word',
      '他应该已经到了。("He should have arrived by now.")',
      'A workhorse hedge — Mandarin speakers reach for 应该 constantly to avoid sounding too definite. Probability ~80-90%.',
      [
        { target: '应该 yīnggāi (possibility)', note: 'inferred likelihood; "I reason this is probably true"' },
        { target: '应该 + 已经 + V + 了', note: 'common pattern for "should have already V-ed"; 应该已经吃了 ("should have eaten already")' },
      ],
      [ACT.possibility],
    ),
    createContentItem(
      '可能',
      'kěnéng',
      'The neutral midpoint of the possibility scale: "possibly / may / might". The all-purpose possibility marker; works in almost any context. Probability ~50%. Functions as both adverb (placed before the verb) and adjective ("possible").',
      'word',
      '今天可能下雨。("It might rain today.") · 这是可能的。("This is possible.")',
      'The safest possibility marker when you don\'t know which finer-grained word to choose; not WRONG, but a richer choice often fits better.',
      [
        { target: '可能 + V (adverb)', note: '"might V"; standard pre-verbal position' },
        { target: '是 + 可能的 (adjective)', note: '"is possible"; postcopular adjectival use' },
        { target: '可能性 kěnéngxìng', note: 'noun "possibility"; used in formal contexts' },
      ],
      [ACT.possibility],
    ),
    createContentItem(
      '也许',
      'yěxǔ',
      'Mid-low on the possibility scale: "perhaps / maybe". More tentative than 可能, often used to float a guess rather than to assert a likelihood. Sentence-initial or pre-verbal.',
      'word',
      '也许他忘了。("Maybe he forgot.")',
      'Slightly more conversational and softer than 可能; pair with sentence-final 吧 (也许…吧) for extra hedging.',
      [
        { target: '也许 yěxǔ', note: 'perhaps, maybe; floats a guess without committing' },
        { target: '也许 + …吧', note: 'doubly hedged; 也许他忘了吧 sounds more tentative than 也许他忘了' },
      ],
      [ACT.possibility],
    ),
    createContentItem(
      '或许',
      'huòxǔ',
      'A more literary or formal synonym of 也许: "perhaps". Same meaning and approximate probability, but feels slightly more written-register. Common in essays, news, and thoughtful speech.',
      'word',
      '或许这是一个机会。("Perhaps this is an opportunity.")',
      'Use 也许 in casual speech, 或许 in writing or measured speech. Native speakers feel the register shift even though learners often treat them as identical.',
      [
        { target: '或许 huòxǔ', note: 'perhaps; literary or measured-speech variant of 也许' },
        { target: 'register: written / formal', note: 'common in editorials, essays, and contemplative speech' },
      ],
      [ACT.possibility],
    ),
    createContentItem(
      '大概',
      'dàgài',
      'Mid scale, but specifically for ESTIMATES: "roughly / approximately / probably". Used when guessing a quantity, a time, or a vague prediction. Probability ~60%. Common in spoken Mandarin for back-of-the-envelope numbers.',
      'word',
      '大概十分钟。("About ten minutes.") · 我大概知道。("I roughly know.")',
      'The Mandarin go-to for "approximate" answers — preferring 大概 over a precise number is a feature of conversational style, not a sign of ignorance (see Culture Note).',
      [
        { target: '大概 + 数量', note: 'estimate + quantity: 大概一百块 ("about 100 kuai"), 大概一个小时 ("about an hour")' },
        { target: '大概 + V', note: 'rough prediction: 大概会下雨 ("will probably rain")' },
        { target: '大概 vs 可能', note: '大概 = "roughly" (quantitative/estimate feel); 可能 = "possibly" (likelihood feel)' },
      ],
      [ACT.possibility],
    ),
    createContentItem(
      '恐怕',
      'kǒngpà',
      'A possibility marker reserved for UNDESIRABLE outcomes: "I\'m afraid that (something bad is likely)". Probability ~70-80%, but the emotional flavor is what distinguishes 恐怕 from 可能. Used to deliver bad news politely.',
      'word',
      '恐怕他不会来了。("I\'m afraid he won\'t be coming.") · 恐怕来不及了。("I\'m afraid it\'s too late.")',
      'Never use 恐怕 for neutral or positive predictions; 恐怕你会成功 ("I\'m afraid you\'ll succeed") sounds bizarre in Mandarin.',
      [
        { target: '恐怕 + 负面预测', note: '"I\'m afraid + bad outcome"; the flavor is apologetic-pessimistic' },
        { target: '恐怕 vs 可能', note: '可能他不会来 = neutral "he might not come"; 恐怕他不会来 = "I\'m afraid he won\'t come" (sympathy implied)' },
      ],
      [ACT.possibility],
    ),
    createContentItem(
      '说不定',
      'shuōbudìng',
      'A possibility marker with a flavor of "you never know / could surprisingly be the case". Carries an open, optimistic feel — the opposite of 恐怕. Often used to suggest that an unexpected outcome is worth considering.',
      'word',
      '说不定明天就晴天了。("Who knows, tomorrow could be sunny.")',
      'The flavor is curious or hopeful; pair with statements that would be a pleasant surprise rather than a feared one.',
      [
        { target: '说不定 shuōbudìng', note: 'literally "can\'t say for sure"; flavor "you never know, surprisingly maybe"' },
        { target: '说不定 vs 恐怕', note: '说不定 = open optimism; 恐怕 = apologetic pessimism; same probability range, opposite emotional valence' },
      ],
      [ACT.possibility],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Necessity gradient
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '应该',
      'yīnggāi (necessity)',
      'Soft end of the necessity scale: "should / ought to". The lightest level of compulsion — gives advice without imposing it. Same word as the possibility reading (Activity 3), and context disambiguates: 你应该多喝水 = advice ("you should drink more water"), not "you probably drink more water".',
      'word',
      '你应该早点儿休息。("You should rest a bit earlier.")',
      'The standard polite-advice marker; works in any register from friend-to-friend to professional-to-client.',
      [
        { target: '应该 (necessity)', note: 'soft advice; "ought to / should"' },
        { target: '应该 vs 必须', note: '应该 = polite suggestion; 必须 = hard requirement; mixing them changes the social weight of the sentence' },
      ],
      [ACT.necessity],
    ),
    createContentItem(
      '得',
      'děi',
      'Colloquial necessity marker: "need to / have to / gotta". Spoken-Mandarin only — does not appear in formal writing. Note the unusual pronunciation: this character is read as déi only in this auxiliary use; as de in 觉得, as dé in 得到.',
      'word',
      '我得走了。("I gotta go.") · 你得小心。("You need to be careful.")',
      'A high-frequency colloquial item; speakers who avoid 得 sound stiff in casual Mandarin.',
      [
        { target: '得 děi (3rd tone)', note: 'auxiliary "need to"; only this auxiliary use takes the děi pronunciation' },
        { target: '得 (other readings)', note: 'as de (neutral) in 觉得 jué de; as dé (2nd) in 得到 dé dào — different word, same character' },
      ],
      [ACT.necessity],
    ),
    createContentItem(
      '要',
      'yào',
      'Neutral-register necessity marker: "need to / have to / want to". Same character carries both volitional ("want") and necessitative ("need to") senses; context disambiguates. Slightly stronger than 应该, less formal than 必须.',
      'word',
      '明天我要去北京。("Tomorrow I have to go to Beijing.") · 你要小心。("You need to be careful.")',
      'The everyday workhorse for "need to"; less colloquial than 得, less formal than 必须.',
      [
        { target: '要 (necessitative)', note: '"need to / have to"; context-determined reading' },
        { target: '要 (volitional)', note: '"want to"; same character, different reading; covered in Activity 6' },
      ],
      [ACT.necessity],
    ),
    createContentItem(
      '必须',
      'bìxū',
      'Strong-register necessity marker: "must / it is required that". Carries the weight of a hard rule rather than a suggestion. Common in formal contexts: regulations, formal advice, institutional speech.',
      'word',
      '学生必须按时交作业。("Students must submit homework on time.")',
      'A regulatory feel; pair with rules, formal obligations, and serious requirements. Overusing 必须 in casual speech sounds authoritarian.',
      [
        { target: '必须 + V', note: '"must V"; strong obligation; pre-verbal placement' },
        { target: '必须 vs 应该', note: '必须 = hard requirement (no choice); 应该 = soft advice (choice with social pressure)' },
      ],
      [ACT.necessity],
    ),
    createContentItem(
      '一定要',
      'yídìng yào',
      'Emphatic necessity: "must absolutely / definitely have to". Stacks 一定 (certainly) before 要 (need to) for emphasis. Often used to insist on something the speaker really cares about. Stronger than 必须 in emotional weight, comparable in compulsion.',
      'word',
      '你一定要小心！("You absolutely must be careful!")',
      'Use when expressing personal concern or earnest warning; the emphasis comes through the doubled commitment of 一定 + 要.',
      [
        { target: '一定要 yídìng yào', note: 'doubled emphasis; "absolutely must"; emotional rather than regulatory' },
        { target: 'tone sandhi note', note: '一 changes to yí before fourth-tone 定; pronounce as yídìng' },
      ],
      [ACT.necessity],
    ),
    createContentItem(
      '不得不',
      'bùdébù',
      '"Have no choice but to / cannot but…". A reluctant-obligation marker — the speaker is doing something they would rather not do. Three-syllable structure: 不 + 得 + 不 (literally "not able not to"); a triple-negative-style phrase common in literary and emphatic speech.',
      'word',
      '因为下雨，我不得不取消了野餐。("Because of the rain, I had to cancel the picnic — there was no other choice.")',
      'Conveys that the speaker is acting against preference; pair with situations where the alternative was worse.',
      [
        { target: '不得不 bùdébù', note: 'literally "not able not to"; "have no choice but to"; reluctant compulsion' },
        { target: 'tone sandhi note', note: 'the first 不 stays bù before 得 (2nd tone); the second 不 stays bù before V — no sandhi applies' },
      ],
      [ACT.necessity],
    ),
    createContentItem(
      '非…不可',
      'fēi…bùkě',
      'The most emphatic necessity pattern: "must absolutely… (there is no alternative)". A discontinuous structure — 非 goes before the verb, 不可 follows the verb or clause. Carries a dramatic, almost-insistent flavor.',
      'sentence',
      '这件事非你不可。("This matter — it has to be you, no one else.") · 我非去不可。("I absolutely must go.")',
      'A literary-emphatic register; in everyday speech you would normally use 必须 or 一定要. Save 非…不可 for stubborn insistence or dramatic stakes.',
      [
        { target: '非 + V/N + 不可', note: 'discontinuous structure; "absolutely must V / has to be N"' },
        { target: '非…不可 vs 必须', note: '非…不可 = dramatic, insistent; 必须 = regulatory, neutral' },
        { target: 'literal parse', note: '"if not V/N, then not OK"; the double-negative drives the emphasis' },
      ],
      [ACT.necessity],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Ability (advanced contrast)
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '会',
      'huì (ability)',
      'Ability marker for LEARNED skills: "know how to / can (because I learned it)". Used for languages, instruments, sports, cooking, programming — anything acquired through study or practice.',
      'word',
      '我会说中文。("I can speak Chinese — I learned it.") · 她会弹钢琴。("She can play piano — she learned it.")',
      'Distinguishes a SKILL you possess from circumstantial ability (能) or permission (可以). Mismatching 会 with a circumstantial situation sounds odd.',
      [
        { target: '会 + V (learned skill)', note: '"can V because I learned how"; for skills, languages, instruments, etc.' },
        { target: '不会 bù huì', note: '"cannot, because I haven\'t learned"; standard negation' },
        { target: '会 also = "will" (future)', note: 'separate use: 会下雨 ("will rain"); covered briefly in Level 1 Unit 14' },
      ],
      [ACT.ability],
    ),
    createContentItem(
      '能',
      'néng',
      'Ability marker for PHYSICAL or CIRCUMSTANTIAL ability: "can / am able to". Used when conditions allow (time, energy, materials, permission implicitly) — not because you learned a skill, but because something is or isn\'t blocking you. Also the natural negation form: 不能 sounds more natural than 不会 for circumstantial inability.',
      'word',
      '今天我能加班。("I can work overtime today — conditions allow.") · 他病了，不能来。("He\'s sick, can\'t come.")',
      'Use 能 when the question is "is it possible right now?" rather than "have you learned how?".',
      [
        { target: '能 + V (circumstantial)', note: '"can V because conditions allow"' },
        { target: '能 also = "managed to"', note: '他能在一小时内完成 ("he managed to finish within an hour") — successful effort sense' },
        { target: '不能 vs 不会', note: '不能去 = "can\'t go (conditions block me)"; 不会去 = "won\'t go" or "doesn\'t know how to go"' },
      ],
      [ACT.ability],
    ),
    createContentItem(
      '可以',
      'kěyǐ',
      'Ability marker overlapping with permission: "may / can / is allowed to". When the question is about being PERMITTED (by rules, by another person), 可以 is the right choice. In questions, 可以 sounds like asking for permission; 能 sounds like asking about feasibility.',
      'word',
      '我可以借你的笔吗? ("May I borrow your pen?") · 这里可以抽烟吗? ("Is smoking allowed here?")',
      'The permission flavor distinguishes 可以 from 能. Mixing them sounds either too presumptuous or too tentative.',
      [
        { target: '可以 + V (permission)', note: '"may V / is allowed to V"; rules-based or person-permission' },
        { target: 'questions: 可以…吗? vs 能…吗?', note: '可以…吗? sounds like asking permission; 能…吗? sounds like checking feasibility' },
        { target: '可以 also = "passable"', note: '这部电影还可以 ("this movie is OK"); evaluative use as adjective' },
      ],
      [ACT.ability],
    ),
    createContentItem(
      '会 / 能 / 可以 三角对比',
      'huì / néng / kěyǐ sānjiǎo duìbǐ',
      'The advanced three-way contrast: 会 (learned skill) vs 能 (circumstantial ability) vs 可以 (permission). Same English "can", three different Mandarin words. Picking the right one is what distinguishes intermediate from advanced Mandarin.',
      'sentence',
      '我会开车，但是今天我喝酒了，不能开车。明天没喝酒，可以开车。\n("I know how to drive, but I drank today, so I can\'t drive. Tomorrow I won\'t drink, so I\'ll be allowed to drive.")',
      'One sentence using all three — the skill (会), the circumstantial block (不能), and the permission (可以) — captures the full contrast.',
      [
        { target: '我会开车', note: 'I have the SKILL — 会 = learned' },
        { target: '不能开车', note: 'circumstances block me — 不能 = circumstantial inability' },
        { target: '可以开车', note: 'I will be ALLOWED — 可以 = permission/allowance' },
      ],
      [ACT.ability],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Volition gradient
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '想',
      'xiǎng',
      'Neutral volition marker: "want to / would like to". The everyday workhorse for expressing preference. Softer than 要 — feels more like "I\'d like" than "I want".',
      'word',
      '我想去日本旅游。("I\'d like to travel to Japan.")',
      'The default for polite preferences; pair with verbs to express desires without sounding demanding.',
      [
        { target: '想 + V', note: '"would like to V"; soft, polite' },
        { target: '想 vs 要', note: '想 = soft preference; 要 = stronger want, sometimes verging on demand' },
      ],
      [ACT.volition],
    ),
    createContentItem(
      '要',
      'yào (volition)',
      'Stronger volition marker: "want / am going to". Same character as the necessity 要 (Activity 4); volitional reading is more insistent or definite. In a restaurant, 我要一杯咖啡 ("I\'ll have a coffee") is the standard ordering pattern.',
      'word',
      '我要一杯咖啡。("I\'ll have a coffee.") · 我要学中文。("I\'m going to study Chinese.")',
      'Softer than English "demand" but firmer than 想; the right register for ordering, deciding, and committing to plans.',
      [
        { target: '要 + N (ordering)', note: '"I\'ll have N"; standard restaurant/shop pattern' },
        { target: '要 + V (commitment)', note: '"am going to V / want to V"; more committed than 想' },
      ],
      [ACT.volition],
    ),
    createContentItem(
      '愿意',
      'yuànyì',
      'Polite willingness marker: "willing to". Often appears in formal contexts where the speaker is signaling consent to something not strictly required. Common in agreements, marriage vows, contracts, and polite acceptances.',
      'word',
      '我愿意帮忙。("I\'m willing to help.") · 你愿意嫁给我吗? ("Will you marry me?")',
      'A measured, deliberate willingness — sounds more committed than 想, more polite than 要.',
      [
        { target: '愿意 + V', note: '"willing to V"; polite, deliberate consent' },
        { target: '愿意 (formal contexts)', note: 'wedding vows: 我愿意; contracts and formal agreements' },
      ],
      [ACT.volition],
    ),
    createContentItem(
      '乐意',
      'lèyì',
      'Warm willingness marker: "happy to / glad to". Carries an emotional positive flavor — not just consenting, but eager. Distinguishes a warm offer from a merely-willing one.',
      'word',
      '我很乐意帮你！("I\'d be very happy to help you!")',
      'Pair with 很 (very) for extra warmth; common in service contexts where the speaker wants to convey friendliness.',
      [
        { target: '乐意 lèyì', note: 'literally "happy-willing"; warmer than 愿意' },
        { target: '很乐意 / 非常乐意', note: 'common intensified forms; standard in customer service contexts' },
      ],
      [ACT.volition],
    ),
    createContentItem(
      '情愿',
      'qíngyuàn',
      'Preference marker: "would rather". Often paired with a contrast: 情愿 X 也不 Y ("would rather X than Y"). Carries a flavor of reluctant choice between alternatives — the speaker is choosing the lesser evil or stubborn preference.',
      'sentence',
      '我情愿走路也不坐公交。("I\'d rather walk than take the bus.")',
      'The contrast structure 情愿…也不… is where 情愿 really shines; standalone use is rarer.',
      [
        { target: '情愿 X 也不 Y', note: 'standard contrastive pattern; "would rather X than Y"' },
        { target: '宁愿 níngyuàn (synonym)', note: 'near-identical synonym, slightly more literary' },
      ],
      [ACT.volition],
    ),
    createContentItem(
      '巴不得',
      'bābudé',
      'Eager-anticipation marker: "can\'t wait to / very much hope to". Casual register; carries a flavor of strong, almost desperate wish. Sounds informal — would be out of place in a formal setting.',
      'word',
      '我巴不得马上回家。("I can\'t wait to get home right away.")',
      'The opposite end of the gradient from 情愿 — instead of reluctant choice, this is eager desire.',
      [
        { target: '巴不得 + V', note: '"can\'t wait to V"; eager, casual' },
        { target: '巴不得 vs 想', note: '想 = polite "would like"; 巴不得 = informal "really want, can\'t wait"' },
      ],
      [ACT.volition],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Evidentiality
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '据说',
      'jùshuō',
      'Distant-source evidential: "it is said / according to reports". Used when the information comes from official reports, news, or distant secondhand sources. The speaker is not committing to truth — they\'re passing on a claim.',
      'word',
      '据说明天有大雨。("It is said there\'ll be heavy rain tomorrow — that\'s what they\'re saying.")',
      'A protective marker — if the prediction is wrong, the speaker isn\'t blamed because they only reported it. Standard in news-style speech.',
      [
        { target: '据说 + statement', note: 'sentence-initial; "it is reported / they say"' },
        { target: '据 + N + 说', note: 'with source specified: 据他说 ("according to him")' },
      ],
      [ACT.evidentiality],
    ),
    createContentItem(
      '听说',
      'tīngshuō',
      'Personal-hearsay evidential: "I heard / I was told". The source is closer to the speaker than 据说 — usually a specific person told them. Standard for relaying gossip, news from friends, or anything heard secondhand.',
      'word',
      '听说他要结婚了。("I heard he\'s getting married.")',
      'More personal than 据说; pair with information that came through a specific conversation rather than via news.',
      [
        { target: '听说 + statement', note: 'sentence-initial; "I heard that…"' },
        { target: '听说 vs 据说', note: '听说 = personal, "someone told me"; 据说 = impersonal, "reports say"' },
      ],
      [ACT.evidentiality],
    ),
    createContentItem(
      '看起来 / 看上去',
      'kànqǐlái / kànshàngqù',
      'Visual evidential: "looks like / appears to be". The source is the speaker\'s own visual observation. Two near-synonyms with identical function — 看起来 is slightly more common in Mainland speech, 看上去 in some regions and more literary contexts.',
      'word',
      '他看起来很累。("He looks very tired.") · 这个看上去不错。("This looks good.")',
      'Use when you\'re inferring from what you SEE; mismatching with hearsay sources sounds wrong.',
      [
        { target: '看起来 + adjective/clause', note: 'visual inference; "looks (like)…"' },
        { target: '看起来 vs 看上去', note: 'near-identical; 看起来 slightly more colloquial in Mainland, 看上去 slightly more literary' },
      ],
      [ACT.evidentiality],
    ),
    createContentItem(
      '显然',
      'xiǎnrán',
      'Inferential evidential: "evidently / obviously". The speaker has clear evidence — visible signs, logical inference, contextual proof. Stronger than 似乎 or 好像; the speaker is committing to the inference.',
      'word',
      '他显然没听懂。("He evidently didn\'t understand.")',
      'A confident inferential — pair with strong evidence. Overusing 显然 in casual speech can sound condescending ("isn\'t it OBVIOUS?").',
      [
        { target: '显然 + clause', note: 'pre-verbal or sentence-initial; "evidently / clearly"' },
        { target: '显然 vs 看起来', note: '显然 = confident inference from strong evidence; 看起来 = tentative visual impression' },
      ],
      [ACT.evidentiality],
    ),
    createContentItem(
      '似乎',
      'sìhū',
      'Impression evidential: "seemingly / it seems / apparently". The speaker has a subjective impression that may or may not be backed by hard evidence. Softer than 显然, more literary than 好像.',
      'word',
      '他似乎不太开心。("He seems not very happy.")',
      'A gentle hedging evidential; common in writing and measured speech, less so in casual conversation (where 好像 wins).',
      [
        { target: '似乎 + clause', note: 'pre-verbal or sentence-initial; "seemingly"' },
        { target: '似乎 vs 好像', note: '似乎 = literary, measured; 好像 = colloquial, everyday; same approximate meaning' },
      ],
      [ACT.evidentiality],
    ),
    createContentItem(
      '好像',
      'hǎoxiàng',
      'Colloquial impression evidential: "seems like / kind of looks like". The everyday workhorse for soft assertions in casual Mandarin. Also doubles as a hedge — speakers often say 好像 even when they\'re sure, to soften the claim.',
      'word',
      '他好像没来。("Seems he didn\'t come — I think.")',
      'Extremely high frequency in casual speech; pair with any uncertain claim. See Activity 9 for hedging uses.',
      [
        { target: '好像 + clause', note: 'sentence-initial or pre-verbal; "seems"' },
        { target: '好像 vs 似乎', note: '好像 = casual, everyday; 似乎 = literary, measured; pick by register' },
        { target: '好像…的样子', note: 'extended pattern: "seems like…"; adds vagueness' },
      ],
      [ACT.evidentiality],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Stance markers
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '居然',
      'jūrán',
      'Astonishment stance marker: "actually / to my surprise". Placed BEFORE the verb. Carries a flavor of unexpected surprise, often (but not always) positive. The speaker is signaling that they didn\'t see this coming.',
      'word',
      '他居然来了！("He actually came — I didn\'t expect it!")',
      'Compare with 竟然: 居然 leans more astonished/welcome-surprise; 竟然 leans more disapproving. In modern Mainland speech, 居然 is the more common of the two.',
      [
        { target: '居然 + V', note: 'pre-verbal; "actually / to my surprise"' },
        { target: 'tone: positive surprise', note: 'astonished, sometimes admiring; "he actually pulled it off!"' },
      ],
      [ACT.stance],
    ),
    createContentItem(
      '竟然',
      'jìngrán',
      'Incredulous stance marker: "actually / unbelievably / how could it be that…". Placed BEFORE the verb. Near-synonym of 居然 but tilts negative — disapproval, displeasure, "I can\'t believe this happened".',
      'word',
      '他竟然没来！("He actually didn\'t come — unbelievable!")',
      'In situations where the outcome is unwelcome (something failed, someone broke a promise), 竟然 fits better than 居然. Native speakers swap them sometimes, but in careful speech the distinction holds.',
      [
        { target: '竟然 + V', note: 'pre-verbal; "actually / unbelievably"' },
        { target: 'tone: negative surprise', note: 'incredulous, disapproving; "I can\'t believe he…"' },
      ],
      [ACT.stance],
    ),
    createContentItem(
      '偏偏',
      'piānpiān',
      'Contrary-expectation stance marker: "of all things / inconveniently / just my luck". Placed BEFORE the verb. Carries a flavor of frustration that the world arranged itself this way — usually an inconvenient coincidence.',
      'word',
      '我刚出门，偏偏就下雨了。("I had just stepped out — of all times, it started raining.")',
      'No good English equivalent; the closest is "just my luck" or "of all things". Pair with situations that feel cosmically unfortunate.',
      [
        { target: '偏偏 + V', note: 'pre-verbal; "inconveniently / of all things"' },
        { target: 'tone: frustrated coincidence', note: '"just my luck — exactly this happened"' },
      ],
      [ACT.stance],
    ),
    createContentItem(
      '难道',
      'nándào',
      'Rhetorical-surprise stance marker: "could it really be that…?". Placed at the START of a question. Forms a rhetorical question — the speaker is signaling that they expect the answer to be NO and is somewhat shocked to even have to ask. Often paired with sentence-final 吗.',
      'word',
      '难道你不知道吗? ("Could it really be that you don\'t know?!")',
      'Rhetorical, not literal — answering 难道…吗? with 是/不是 misses the speaker\'s point. The rhetorical force is "you SHOULD know this".',
      [
        { target: '难道 + clause + 吗?', note: 'sentence-initial; rhetorical question frame' },
        { target: 'expected answer', note: 'speaker assumes NO; the question is a complaint or disbelief in disguise' },
      ],
      [ACT.stance],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Hedging cluster
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '好像 (hedging use)',
      'hǎoxiàng (hedge)',
      'In addition to its evidential function (Activity 7), 好像 doubles as a HEDGING marker — speakers say 好像 even when they\'re sure, to soften an assertion. A classic Mandarin face-saving move.',
      'sentence',
      '这个好像不太对。("This kind of doesn\'t seem quite right.") — said by someone who is actually sure it\'s wrong.',
      'Pair with statements of correction, disagreement, or bad news to soften them; the speaker isn\'t actually uncertain, they\'re being polite.',
      [
        { target: '好像 + 不太… (negative softening)', note: '"kind of not very…"; classic polite-correction frame' },
        { target: 'sincerity vs hedge', note: '好像 can be literal ("seems") or pure face-saving ("I\'m saying so to soften the blow")' },
      ],
      [ACT.hedging],
    ),
    createContentItem(
      '应该 (hedging use)',
      'yīnggāi (hedge)',
      'A hedging marker that softens a commitment without weakening it much. 应该没问题 ("should be no problem") is the standard Mandarin way to say "yes, I\'m confident" while leaving plausible deniability if it turns out otherwise.',
      'sentence',
      '应该没问题。("Should be no problem — I\'m basically saying yes.")',
      'The single most useful hedge in professional Mandarin; learn to deploy it instead of a bare "可以" or "没问题" when committing to something uncertain.',
      [
        { target: '应该没问题', note: 'standard polite "yes" with built-in escape clause' },
        { target: '应该可以', note: '"should be possible / should work"; same hedging logic' },
      ],
      [ACT.hedging],
    ),
    createContentItem(
      '可能 (hedging use)',
      'kěnéng (hedge)',
      '可能 as a politeness hedge — used not to express genuine uncertainty but to soften a difficult statement. Common before bad news, refusals, or corrections.',
      'sentence',
      '我可能不能来了。("I might not be able to come.") — said by someone who has already decided not to come.',
      'A face-saving softener; in many contexts the speaker actually IS decided, but framing it as a possibility leaves room for the listener\'s reaction.',
      [
        { target: '可能不能 + V', note: '"might not be able to V"; standard polite refusal opener' },
        { target: '可能 + bad news', note: 'softens the delivery of any unwelcome statement' },
      ],
      [ACT.hedging],
    ),
    createContentItem(
      '也许 + 吧',
      'yěxǔ + ba',
      'Stacking 也许 (maybe) with sentence-final 吧 (softening particle) creates a doubly hedged statement — maximum softening, used when the speaker really wants to leave room for the listener.',
      'sentence',
      '也许下次吧。("Maybe next time, eh?") — polite postponement with two layers of hedging.',
      'The 吧 particle alone is a hedge; adding 也许 stacks two hedges. Beware: too many hedges in a row can sound evasive.',
      [
        { target: '也许 + clause + 吧', note: 'maximum soft hedging; "maybe…, eh?"' },
        { target: 'over-hedging risk', note: 'three or more hedges in one sentence can sound dishonest or wishy-washy' },
      ],
      [ACT.hedging],
    ),
    createContentItem(
      '堆叠原则',
      'duīdié yuánzé',
      'Stacking principle for hedges: ONE or TWO hedges per sentence is natural; three or more starts to sound evasive. The classic pairs are 应该 + 可能 ("should-might"), 好像 + 不太 ("seems-not very"), 也许 + 吧 ("maybe-particle"). Avoid stacking three modal adverbs in a row.',
      'sentence',
      'GOOD: 应该可能没问题。 ("Should probably be fine.") — two hedges, fluent.\nBAD: 应该可能也许大概没问题吧。 — five hedges, evasive / wishy-washy.',
      'A native-speaker rhythm: pick one or two hedges that fit the situation; reaching for a third often means you should restructure the sentence.',
      [
        { target: '应该 + 可能', note: 'standard two-hedge pair for soft commitment' },
        { target: '好像 + 不太', note: 'standard two-hedge pair for polite negation' },
        { target: '也许 + 吧', note: 'two-hedge pair for maximally tentative postponement' },
      ],
      [ACT.hedging],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Grammar I: Modality + aspect
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'modal + V + 过 (experiential)',
      'modal + V + guo',
      'To express "might have V-ed / should have V-ed (experientially)", combine modality + verb + 过. Word order: SUBJECT + MODAL + V + 过 + (OBJECT). The modal sits BEFORE the verb, 过 sits AFTER the verb.',
      'sentence',
      '他可能去过北京。("He might have been to Beijing before.") · 你应该看过这部电影。("You should have seen this movie.")',
      'A common learner mistake is reversing the order (saying *去可能过). Mandarin is strict: modal → verb → aspect particle.',
      [
        { target: '可能 + V + 过', note: '"might have V-ed before"; experiential modal perfect' },
        { target: '应该 + V + 过', note: '"should have V-ed by now"; inferential modal perfect' },
        { target: '一定 + V + 过', note: '"definitely has V-ed"; certain modal perfect' },
      ],
      [ACT.grammarAspect],
    ),
    createContentItem(
      'modal + V + 了 (perfective)',
      'modal + V + le',
      'To express "should have V-ed / must have V-ed (already)", combine modal + V + 了. Same word order rule: modal → V → 了. Avoid stacking 了 directly on the modal itself — say 应该走了, not 应该了.',
      'sentence',
      '他应该走了。("He should have left already.") · 她可能忘了。("She might have forgotten.")',
      'The perfective 了 signals completion; the modal qualifies how sure the speaker is about the completion.',
      [
        { target: '应该 + V + 了', note: '"should have V-ed by now"; inferential perfect' },
        { target: '可能 + V + 了', note: '"might have V-ed"; uncertain perfect' },
        { target: 'do NOT stack 了 on modal', note: 'WRONG: *他应该了; CORRECT: 他应该走了 (了 attaches to the verb, not the modal)' },
      ],
      [ACT.grammarAspect],
    ),
    createContentItem(
      'modal + 在 + V (progressive)',
      'modal + zài + V',
      'To express "might be V-ing / should be V-ing right now", combine modal + 在 + V. The progressive marker 在 sits between the modal and the verb. Common with 可能, 应该, and 大概.',
      'sentence',
      '他可能在开会。("He might be in a meeting.") · 她应该在睡觉。("She should be sleeping.")',
      'A high-frequency construction for inferring what someone is doing right now without seeing them; common in workplace and family talk.',
      [
        { target: '可能 + 在 + V', note: '"might be V-ing right now"' },
        { target: '应该 + 在 + V', note: '"should be V-ing right now (inferred)"' },
      ],
      [ACT.grammarAspect],
    ),
    createContentItem(
      'modal word order — strict',
      'modal word order — strict',
      'Mandarin modality word order is RIGID: SUBJECT + MODAL + (ADVERB) + VERB + (ASPECT) + (OBJECT). The modal cannot move after the verb. English speakers attempting "seen it might" produce ungrammatical Mandarin.',
      'sentence',
      'CORRECT: 我可能没看过这部电影。\nWRONG: *我没看过这部电影可能。',
      'Drill the order until it\'s automatic: modal-first, verb-second, aspect-third. Mandarin doesn\'t permit postposed modals.',
      [
        { target: 'S + MODAL + V + ASPECT', note: 'rigid order; modal is always pre-verbal' },
        { target: 'negation: 不/没 + before modal OR before V', note: '不可能 = "impossible"; 可能不 = "might not"; both are grammatical but mean different things' },
      ],
      [ACT.grammarAspect],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Grammar II: Stance-marker word order
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '居然 / 竟然 / 偏偏 — pre-verb position',
      'jūrán / jìngrán / piānpiān — pre-verb',
      'The pre-verb stance markers go BETWEEN the subject and the verb. Pattern: SUBJECT + 居然/竟然/偏偏 + VERB. Moving them sentence-initial sounds off; placing them after the verb is ungrammatical.',
      'sentence',
      'CORRECT: 他居然来了。\nWRONG: *居然他来了。 (sentence-initial doesn\'t work for 居然)\nWRONG: *他来了居然。 (post-verbal doesn\'t work either)',
      'The fixed pre-verbal slot is one of the strictest word-order rules in advanced Mandarin grammar.',
      [
        { target: 'S + 居然/竟然/偏偏 + V', note: 'mandatory pre-verbal position between subject and verb' },
        { target: 'cannot move', note: 'sentence-initial or post-verbal placement is ungrammatical' },
      ],
      [ACT.grammarWordOrder],
    ),
    createContentItem(
      '难道 — sentence-initial position',
      'nándào — sentence-initial',
      '难道 goes at the START of the sentence (or sometimes after the subject, before the verb). Pattern: 难道 + (SUBJECT) + VERB + …吗?. It sets up the rhetorical frame and signals to the listener that a rhetorical question is coming.',
      'sentence',
      'CORRECT: 难道你不知道吗?\nALSO OK: 你难道不知道吗? (slightly more emphatic on 你)',
      'Both positions work, but sentence-initial is the canonical place; moving 难道 farther into the sentence is ungrammatical.',
      [
        { target: '难道 + clause + 吗?', note: 'canonical position; sentence-initial' },
        { target: 'S + 难道 + V + 吗?', note: 'also acceptable; emphasizes the subject slightly' },
      ],
      [ACT.grammarWordOrder],
    ),
    createContentItem(
      '可能 / 应该 / 一定 — pre-verb position',
      'kěnéng / yīnggāi / yīdìng — pre-verb',
      'The possibility/necessity modals go in the pre-verb slot, like the stance markers. Pattern: SUBJECT + 可能/应该/一定 + VERB + … . If multiple modals stack, the order is: epistemic (possibility) before deontic (necessity), e.g., 应该可能 ("should-might").',
      'sentence',
      'CORRECT: 他应该会来。 (modal + auxiliary + verb)\nCORRECT: 我应该可能没问题。 (stacked modals, both pre-verb)',
      'Stacking modals is grammatical and common; the rigid pre-verb slot still holds for all of them.',
      [
        { target: 'S + MODAL + V', note: 'standard pre-verb position' },
        { target: 'stacked modals', note: '应该可能, 一定要 — stacking is allowed; outer modal first, inner modal second' },
      ],
      [ACT.grammarWordOrder],
    ),
    createContentItem(
      'evidentials — sentence-initial preferred',
      'evidentials — sentence-initial preferred',
      '据说, 听说, 看起来, 显然, 似乎 typically go at the START of the sentence (or pre-verb for some). The sentence-initial position lets them frame the whole assertion rather than just modifying the verb.',
      'sentence',
      '据说明天有雨。 (sentence-initial)\n他显然没听懂。 (pre-verb position; also acceptable for 显然)',
      'Different evidentials prefer different positions: 据说/听说 strongly prefer sentence-initial; 显然/似乎 are flexible.',
      [
        { target: '据说 / 听说', note: 'strongly sentence-initial' },
        { target: '看起来 / 显然 / 似乎', note: 'flexible — sentence-initial or pre-verb both work' },
      ],
      [ACT.grammarWordOrder],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Grammar III: Rhetorical questions
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '难道…吗?',
      'nándào…ma?',
      'The classic rhetorical-question frame. Pattern: 难道 + clause + 吗? = "Could it really be that…?". Expected answer is NO; the question is actually a complaint or expression of disbelief.',
      'sentence',
      '难道你不知道吗? ("Don\'t you really know? You should!")',
      'A strong stance — much stronger than the plain statement 你不知道. The rhetorical frame conveys "I assumed you knew, and I\'m disappointed/surprised that you don\'t".',
      [
        { target: '难道 + 不/没 + V + 吗?', note: 'negative-rhetorical; expected answer NO' },
        { target: 'response strategy', note: 'don\'t answer 是/不是; instead acknowledge: 抱歉，我不知道 ("Sorry, I didn\'t know")' },
      ],
      [ACT.grammarRhetorical],
    ),
    createContentItem(
      '不…吗? (without 难道)',
      'bù…ma? (without 难道)',
      'A milder rhetorical question can be formed without 难道, using negation + 吗?. Pattern: 你不…吗? ("Aren\'t you…?"). Carries gentle surprise rather than the full incredulity of 难道.',
      'sentence',
      '你不饿吗? ("Aren\'t you hungry?") — actual question or gentle rhetorical depending on context.',
      'Context disambiguates literal vs rhetorical. 难道 makes the rhetorical reading unambiguous; bare 不…吗? often leaves room for both.',
      [
        { target: '你不 + V + 吗?', note: 'gentle rhetorical or literal — context decides' },
        { target: 'add 难道 for clarity', note: '难道你不饿吗? unambiguously rhetorical' },
      ],
      [ACT.grammarRhetorical],
    ),
    createContentItem(
      '反问句 — emotional force',
      'fǎnwènjù — emotional force',
      'Rhetorical questions in Mandarin carry significantly more emotional weight than direct statements. 你不知道? (literal) vs 难道你不知道吗? (rhetorical) — same propositional content, very different impact on the listener.',
      'sentence',
      'DIRECT: 你不知道。 ("You don\'t know." — flat)\nRHETORICAL: 难道你不知道吗? ("DON\'T you know?!" — astonished/disappointed)',
      'Use rhetorical questions sparingly in formal contexts; they can come across as confrontational. They\'re effective in dramatic speech, advocacy, and emotional appeals.',
      [
        { target: 'direct: factual', note: 'plain statement of facts' },
        { target: 'rhetorical: emotional', note: 'adds astonishment, disappointment, or reproach' },
        { target: 'overuse risk', note: 'rhetorical questions in professional settings can sound confrontational; deploy carefully' },
      ],
      [ACT.grammarRhetorical],
    ),
    createContentItem(
      'reverse: rhetorical positive',
      'reverse: rhetorical positive',
      'A rhetorical question without negation can mean the OPPOSITE — 我能不去吗? (literally "can I not go?") means "I have to go, there\'s no avoiding it". The rhetorical frame flips the polarity.',
      'sentence',
      '我能不去吗? ("Can I not go?" → meaning: "I have no choice but to go.")',
      'A subtle pattern — the literal positive question is interpreted as negative-rhetorical. Common in colloquial speech for expressing "of course I have to".',
      [
        { target: '能不 + V + 吗?', note: 'rhetorical "can I not V?" = "of course I have to V"' },
        { target: '怎么 + 能 + V + 呢?', note: 'similar rhetorical pattern; "how could I…?"' },
      ],
      [ACT.grammarRhetorical],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 13 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '为什么要委婉',
      'wèishéme yào wěiwǎn',
      'Mandarin speakers regularly use hedges (应该 / 可能 / 也许 / 好像) even when they ARE sure of the answer. The hedge isn\'t a marker of genuine uncertainty — it\'s a politeness device that preserves face (面子) for both speakers, leaves room for the listener to disagree, and signals that the speaker isn\'t being arrogant.',
      'word',
      'CONFIDENT FACT: 这个不对。 ("This is wrong.") — sounds blunt, possibly rude.\nHEDGED FACT: 这个好像不太对。 ("This kind of doesn\'t seem quite right.") — same meaning, much more polite.',
      'The hedge is the social grease that makes corrections, disagreements, and bad news land softly. Native speakers do this constantly.',
      [
        { target: '面子 miànzi', note: 'face — public reputation and dignity; the cultural backbone of polite Mandarin' },
        { target: 'why hedge?', note: 'preserves face, leaves room for disagreement, signals humility' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '直接 vs 委婉',
      'zhíjiē vs wěiwǎn',
      'Direct speech (直接 zhíjiē) — bare statements without hedges — sounds rude or aggressive in Mandarin professional contexts. A Western-influenced "I disagree" lands much worse than the Mandarin-style "我觉得也许…可能…". Conversely, an over-hedged answer in a Western boardroom can sound evasive. Register-switching between cultures is a real bilingual skill.',
      'word',
      'WESTERN-STYLE: "I disagree. This is wrong."\nMANDARIN-STYLE: "我觉得也许这个有点不太对，可能要再看一下。" ("I feel maybe this is a bit not quite right, possibly we should look again.")',
      'Same propositional content, totally different social effect. The Mandarin version preserves face; the Western version asserts confidence.',
      [
        { target: '直接 zhíjiē', note: 'direct, unhedged; sounds confident in Western contexts, rude in Mandarin contexts' },
        { target: '委婉 wěiwǎn', note: 'hedged, indirect; sounds polite in Mandarin contexts, evasive in some Western contexts' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '大概 / 差不多 文化',
      'dàgài / chàbuduō culture',
      'Chinese conversational style favors APPROXIMATE answers over precise ones. 大概 ("roughly") and 差不多 ("about the same / approximately") are not signs of laziness or ignorance but features of polite speech — committing to an exact number can sound presumptuous or risky if it turns out wrong.',
      'sentence',
      'Q: 你住的地方多远? ("How far away do you live?")\nA: 差不多十分钟。("About ten minutes.") — preferred over a precise "9 minutes and 30 seconds".',
      'A Western expectation of precision can come across as fussy; a Mandarin expectation of approximation can come across as vague. Calibrate to context.',
      [
        { target: '大概 dàgài', note: 'roughly; for quantities and predictions' },
        { target: '差不多 chàbuduō', note: 'literally "differ-not-much"; "about the same / approximately"' },
        { target: 'cultural preference', note: 'approximate answers signal politeness and humility; precise answers can sound presumptuous' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 14 — Task
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '任务 A — 重写五句',
      'rènwù A — chóngxiě wǔ jù',
      'Part A: Rewrite five direct, blunt sentences using appropriate modality + hedges to sound more polite and natural in Mandarin. Target: 1–2 hedges per sentence (NOT three or more — see Activity 9 stacking principle). Each rewrite should preserve the original meaning while shifting the social tone from blunt to collaborative.',
      'sentence',
      'DIRECT 1: 这个不对。 → HEDGED: 这个好像不太对，可能要再看一下。\nDIRECT 2: 你迟到了。 → HEDGED: 你应该是迟到了一点儿吧?\nDIRECT 3: 我们做不完。 → HEDGED: 恐怕我们可能做不完。\nDIRECT 4: 你错了。 → HEDGED: 我觉得也许这里有点儿问题。\nDIRECT 5: 不可能。 → HEDGED: 这个可能性应该不太大吧。',
      'Read each rewrite aloud — feel how the rhythm softens. The hedges absorb the social impact while keeping the propositional content intact.',
      [
        { target: '这个好像不太对', note: 'two hedges (好像 + 不太); polite correction frame' },
        { target: '你应该是…吧', note: 'three-layer softening (应该 + 是 + 吧); maximum politeness for an accusation' },
        { target: '恐怕…可能…', note: 'apologetic-pessimistic 恐怕 + possibility 可能; standard for delivering bad news' },
        { target: '我觉得也许…', note: 'opinion-frame + tentative; classic professional disagreement opener' },
        { target: '应该不太大吧', note: 'soft denial; opposite of bare "不可能" which sounds dismissive' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '任务 B — 识别立场',
      'rènwù B — shíbié lìchǎng',
      'Part B: Read five hedged Mandarin sentences and identify the speaker\'s ACTUAL stance underneath the hedge — is the speaker certain, uncertain, disappointed, surprised, or reluctant? The hedge often masks a definite opinion; recognizing this is core to Mandarin pragmatics.',
      'sentence',
      'HEDGED 1: 我应该没问题。 → ACTUAL STANCE: CERTAIN (the speaker is confident; 应该 is the politeness layer).\nHEDGED 2: 他可能不来了。 → ACTUAL STANCE: CERTAIN (the speaker knows he\'s not coming; 可能 softens the bad news).\nHEDGED 3: 他居然来了！ → ACTUAL STANCE: SURPRISED (positive surprise; 居然 makes the surprise explicit).\nHEDGED 4: 恐怕来不及了。 → ACTUAL STANCE: CERTAIN + DISAPPOINTED (the speaker knows it\'s too late; 恐怕 conveys regret).\nHEDGED 5: 我情愿走路也不坐公交。 → ACTUAL STANCE: RELUCTANT PREFERENCE (the speaker has chosen but is signaling it\'s the lesser evil).',
      'The exercise teaches you to listen UNDER the hedge — to read pragmatic intent rather than surface-level uncertainty.',
      [
        { target: 'hedge ≠ uncertainty', note: 'in Mandarin, a hedge often signals politeness, not genuine uncertainty' },
        { target: 'listen under the hedge', note: 'pragmatic interpretation: figure out the speaker\'s real stance from context + stance markers' },
        { target: 'stance vs propositional content', note: 'stance markers (居然 / 恐怕 / 情愿) carry the speaker\'s attitude; the hedge softens the assertion itself' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战 — 综合段落',
      'tiǎozhàn — zōnghé duànluò',
      'Stretch goal: write a 4–5 sentence paragraph that uses at least one item from EACH of the seven modality categories (possibility, necessity, ability, volition, evidentiality, stance, hedging). Topic: explaining to your advisor at 清华大学 why a paper deadline will slip by two days.',
      'sentence',
      '示例: 据说审稿人这周回邮件比较慢 (evidentiality 据说). 我应该能在周三前完成 (possibility/ability 应该+能). 但是数据可能还要再核对 (possibility 可能). 我非常乐意加班 (volition 乐意), 不过恐怕周一交不上 (possibility 恐怕). 您看周三交可以吗 (ability 可以)?',
      'Translation: "I hear reviewers have been slow with replies this week. I should be able to finish by Wednesday. But the data might need another review. I\'m very willing to work overtime, but I\'m afraid Monday won\'t work. Would Wednesday be acceptable?"',
      [
        { target: '据说 (evidentiality)', note: 'frames the delay as coming from an external source — protects the speaker' },
        { target: '应该能 (possibility + ability)', note: 'stacked hedged commitment — soft "yes I can"' },
        { target: '可能 (possibility)', note: 'adds a hedge to qualify the commitment' },
        { target: '乐意 (volition)', note: 'signals warm willingness to compensate' },
        { target: '恐怕 (possibility, apologetic)', note: 'apologetic bad news; "I\'m afraid Monday won\'t work"' },
        { target: '可以 (ability, permission)', note: 'asks for permission to renegotiate the deadline' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
