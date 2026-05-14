// Level 2 Unit 7 — 对与错 (Right and Wrong, Apologies, Resolving Conflict) — Mandarin Chinese
// Thematic unit focused on moral judgement, the Chinese apology hierarchy, and
// the rituals of resolving conflict (acceptance phrases, "give face" 给面子,
// indirect amends through food/drink/gift, and the corporate-apology era).
// Grammar: 应该 / 不应该 / 本来应该, 要是…就好了 (if-only regret),
// 之所以…是因为… (the reason X is because Y).
//
// All content is authored with Hanzi (target) + Pinyin (romanization) +
// English glosses (canonical source). The conversation tutor reads this
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
  // Legacy keys for UI fallback — same convention as the Korean source:
  // the "korean" slot holds the target text, the "english" slot holds the note.
  korean: target,
  english: note,
  example: example || target,
  exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  orientation: 'zh-l2u7-orientation',
  pronunciation: 'zh-l2u7-pronunciation',
  vocabularyMoral: 'zh-l2u7-vocab-moral',
  vocabularyApology: 'zh-l2u7-vocab-apology',
  vocabularyAcceptance: 'zh-l2u7-vocab-acceptance',
  grammarShould: 'zh-l2u7-grammar-should',
  grammarRegret: 'zh-l2u7-grammar-regret',
  grammarReason: 'zh-l2u7-grammar-reason',
  reading: 'zh-l2u7-reading',
  listening: 'zh-l2u7-listening',
  writing: 'zh-l2u7-writing',
  culture: 'zh-l2u7-culture',
  task: 'zh-l2u7-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Apologize in Mandarin with the right level of sincerity for the situation — choosing among 对不起, 不好意思, 抱歉, 我错了, and 请你原谅 in a five-step hierarchy.',
      'Receive an apology gracefully using the standard acceptance phrases (没事, 没关系, 算了, 下次小心, 原谅你) and decide whether to forgive.',
      'Argue about responsibility and intent — distinguishing 故意 (on purpose) from 不小心 (by accident) and refusing 借口 (excuses) when the other side dodges accountability.',
    ],
    task: 'Picture your closest friend at Tsinghua University blowing off your birthday party. They text apologies the next morning. You meet for tea, hear them out, process your feelings, decide whether to forgive, and propose a make-up plan — all in Mandarin.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'The neutral-tone run in apology phrases',
    goals: [
      'Pronounce 对不起 (duìbuqǐ) with the correct rhythm: a sharp falling first syllable, a short neutral middle, and a rising third — the neutral 不 is the part beginners drag out incorrectly.',
      'Master 不好意思 (bùhǎo yìsi) — the long neutral-tone run on -yi-si is a marker of native fluency; over-stressing 思 makes the phrase sound forced.',
      'Distinguish 抱歉 (bàoqiàn) — two clean fourth tones — from the lighter, faster 对不起; the heavier rhythm signals greater formality.',
    ],
    task: 'Read each phrase three times and identify which syllables are neutral, which carry full tones, and where stress falls.',
  },
  {
    id: ACT.vocabularyMoral,
    section: 'Vocabulary I',
    title: 'Moral and conflict vocabulary',
    goals: [
      'Use the 17 core vocabulary items for moral judgement and conflict — distinguishing 对/错 (right/wrong), 故意/不小心 (on purpose / by accident), 公平/不公平 (fair/unfair), and the noun pair 责任 (responsibility) vs 借口 (excuse).',
      'Use 误会 (misunderstand), 解释 (explain), 怪 (blame), and 后悔 (regret) — the four verbs that drive any reconciliation conversation.',
      'Recognize the higher-register moral vocabulary 道德 (morality), 良心 (conscience), and 道歉 (formal "to apologize") — used in editorials, public statements, and serious discussions.',
    ],
    task: 'For each item, give one sentence using it correctly; mark which two are most likely to appear in the friend-missed-my-birthday conversation.',
  },
  {
    id: ACT.vocabularyApology,
    section: 'Vocabulary II',
    title: 'The Chinese apology hierarchy',
    goals: [
      'Memorize 9 apology phrases on a five-step sincerity scale: 不好意思 (sorry-light) < 对不起 (sorry-standard) < 抱歉 (sorry-formal) < 我错了 (I was wrong) < 请你原谅 (please forgive me).',
      'Pair each apology with its typical situation — 不好意思 for bumping into someone, 对不起 for a real mistake, 抱歉 for missing an appointment, 我错了 for an admitted fault, 请你原谅 for a wound that needs forgiveness.',
      'Use the supporting phrases 别生气 (don\'t be angry), 我赔你 (I\'ll compensate you), and 是我的错 (it\'s my fault) to escalate sincerity when the basic phrase isn\'t enough.',
    ],
    task: 'For three scenarios (bumping into a stranger / missing a meeting / hurting a friend\'s feelings) pick the right level and add one escalator phrase if needed.',
  },
  {
    id: ACT.vocabularyAcceptance,
    section: 'Vocabulary III',
    title: 'Acceptance and forgiveness phrases',
    goals: [
      'Receive an apology gracefully with 没事 (it\'s nothing), 没关系 (no problem), or 算了 (forget it) — three options on a warm-to-resigned scale that signal different feelings about the offense.',
      'Use 下次小心 (be careful next time) to accept while still expressing that the offense mattered — a face-saving compromise common between close friends.',
      'Distinguish 原谅你 (I forgive you) from 没关系 — the former actively releases blame, the latter waves the issue away without addressing whether real forgiveness happened.',
    ],
    task: 'Match each acceptance phrase to the emotional tone it signals (warm reassurance / mild dismissal / cool resignation / conditional acceptance / explicit forgiveness).',
  },
  {
    id: ACT.grammarShould,
    section: 'Grammar I',
    title: '应该 / 不应该 / 本来应该 — should / shouldn\'t / should have',
    goals: [
      'Use 应该 (yīnggāi) for "should" (obligation or expectation) and 不应该 (bù yīnggāi) for "should not" — both placed before the verb, not at the end of the sentence.',
      'Use 本来应该 (běnlái yīnggāi) for "should have but didn\'t" — the counterfactual past-obligation pattern that powers most regret talk.',
      'Distinguish 应该 (should — moral or logical) from 要 (need to — practical) and 必须 (must — absolute); the wrong choice changes how strong your claim sounds.',
    ],
    task: 'Write three sentences using 应该 (one positive obligation, one negation, one 本来应该 counterfactual) about a missed appointment.',
  },
  {
    id: ACT.grammarRegret,
    section: 'Grammar II',
    title: '要是…就好了 — if only…',
    goals: [
      'Form counterfactual regret with 要是 X 就好了 ("if only X had happened, it would have been good") — the standard way to express "if only" in Mandarin.',
      'Use 要是…就好了 to soften self-criticism — saying "if only I had remembered" lands gentler than the bare 我忘了, while still acknowledging fault.',
      'Distinguish 要是 (informal "if") from 如果 (more neutral "if") and 假如 (formal/hypothetical "if"); 要是…就好了 sounds most natural in friend-to-friend regret.',
    ],
    task: 'Write three 要是…就好了 sentences about regrets — one about time, one about a choice, one about words you wish you hadn\'t said.',
  },
  {
    id: ACT.grammarReason,
    section: 'Grammar III',
    title: '之所以…是因为… — the reason X is because Y',
    goals: [
      'Form a formal cause-explanation with 之所以 X 是因为 Y ("the reason for X is because Y") — used when you want to explain WITHOUT sounding like you\'re making excuses.',
      'Place the result first (之所以…) and the cause second (是因为…) — opposite of casual 因为…所以…; the inverted order foregrounds what needs explaining.',
      'Use this pattern carefully when apologizing — it can sound like 借口 (an excuse) if used too quickly; pair it with 我错了 or 是我的错 first.',
    ],
    task: 'Write a two-sentence apology: first admit fault (我错了), then explain using 之所以…是因为… without sounding defensive.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'A WeChat apology paragraph',
    goals: [
      'Read a five-sentence WeChat-style written apology with correct rhythm, identifying which sincerity level each phrase signals.',
      'Identify the four grammar moves the writer uses: an apology phrase, a 本来应该 admission, a 之所以…是因为… explanation, and a 要是…就好了 regret.',
    ],
    task: 'Read the paragraph aloud, then answer: which sentence is the actual apology, which is the explanation, and which one is the writer asking for forgiveness?',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'A face-to-face apology over tea',
    goals: [
      'Follow an 8-turn dialogue where one friend apologizes for missing the other\'s birthday and the offended party processes feelings before deciding whether to forgive.',
      'Hear how 给面子 (giving face) works in practice — the apologizer offers food/drink/a gift, the offended party accepts conditionally, and the conversation moves to a make-up plan.',
    ],
    task: 'Read the dialogue with the tutor first, then perform it again playing the offended party — make the apologizer earn the forgiveness, don\'t accept the first 对不起.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Write your own apology message',
    goals: [
      'Write a 5–7 sentence apology to a friend you have hurt, using at least one phrase from each level of the apology hierarchy plus 本来应该 and 之所以…是因为….',
      'Close with a concrete make-up proposal (a specific time/place/activity) — Mandarin apologies feel hollow without 我赔你 or a 我请你吃饭 follow-up.',
    ],
    task: 'Write the apology, read it aloud, then ask yourself: would I forgive someone who sent me this?',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: '道歉文化 — The Chinese apology culture',
    goals: [
      'Understand the apology hierarchy as a face-saving system: each level escalates sincerity AND surrenders more face, so over-apologizing to a stranger sounds awkward while under-apologizing to a wronged friend sounds cold.',
      'Recognize 给面子 vs 不给面子 in conflict — accepting an apology too quickly can shame the apologizer; refusing one too long is publicly humiliating. The right reception protects both parties\' face.',
      'Recognize the indirect path to apology — offering food, drink, or a small gift instead of explicit words — and the modern 社交媒体 (social media) corporate-apology era, where 道歉文化 has become a PR ritual studied by communications scholars.',
    ],
    task: 'For three scenarios (bumping a stranger / missing a friend\'s birthday / a celebrity scandal), describe how the apology hierarchy and 给面子 logic shape the right response.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'Roleplay: the friend who missed your birthday',
    goals: [
      'Combine vocabulary, the apology hierarchy, and all three grammar patterns into one continuous 10-turn scene with no rehearsed lines.',
      'Match the apologizer\'s sincerity to your forgiveness — don\'t accept a lazy 不好意思 for a serious offense; require escalation to 我错了 or 请你原谅 before you say 原谅你.',
    ],
    task: 'Roleplay with the tutor playing your best friend who skipped your 21st birthday party. Process your feelings, decide whether to forgive, and propose a make-up plan.',
  },
];

const lesson = {
  title: 'Level 2 · Unit 7: 对与错 — Right & Wrong, Apologies, Resolving Conflict',
  category: 'daily-life',
  difficulty: 'intermediate',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'apologizing-sincerely', label: 'Apologizing sincerely', goal: 'Pick the right phrase from the five-step apology hierarchy and pair it with a 本来应该 admission of fault.' },
    { id: 'explaining-without-excuses', label: 'Explaining without making excuses', goal: 'Use 之所以…是因为… AFTER admitting fault — never as a way to dodge responsibility.' },
    { id: 'accepting-conditionally', label: 'Accepting an apology conditionally', goal: 'Receive an apology with 没关系 + 下次小心 — accept the apology while signalling that the offense mattered.' },
    { id: 'forgiving-explicitly', label: 'Forgiving explicitly', goal: 'Move from 没关系 to 原谅你 — actively release blame rather than waving it away.' },
    { id: 'proposing-make-up', label: 'Proposing a make-up plan', goal: 'Close any apology with a concrete 我赔你 / 我请你吃饭 follow-up — Mandarin apologies feel incomplete without amends.' },
  ],
  relatedPools: ['topic-society', 'topic-relationships'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '本课目标',
      'běn kè mùbiāo',
      'By the end of this lesson, you can apologize at the right level of sincerity for the situation, accept or refuse an apology gracefully, argue about responsibility versus excuses, and close any conflict with a concrete amends proposal — all without rehearsing lines.',
      'word',
      'Functional language: 道歉 dàoqiàn (apologize) · 原谅 yuánliàng (forgive) · 责任 zérèn (responsibility) · 借口 jièkǒu (excuse) · 给面子 gěi miànzi (give face)',
      'These five micro-skills are the spine of any Chinese conflict-resolution scene — once they\'re automatic, every later relationship lesson layers on top.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      '真实场景',
      'zhēnshí chǎngjǐng',
      'Your closest friend at Tsinghua University skipped your 21st birthday party last night with no warning. This morning their WeChat is full of apologies. You agree to meet for tea — you need to process your feelings, hear them out, and decide whether to forgive.',
      'word',
      '朋友: "对不起，我昨晚真的不应该不来。我错了。"\n你: "我有点失望。你能解释一下吗？"',
      'A typical opening of a Chinese reconciliation conversation: apology (对不起) → admission of fault (本来应该) → request for an explanation (解释). The next move depends on whether the explanation sounds like a real reason or a 借口.',
      [
        { target: '对不起 duìbuqǐ', note: 'standard sincere apology; appropriate for a real offense between friends' },
        { target: '本来应该 běnlái yīnggāi', note: '"should have but didn\'t"; signals the apologizer is taking the counterfactual seriously' },
        { target: '解释 jiěshì', note: '"to explain"; what you ask for when the apology is sincere but you need the reason' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '五级道歉',
      'wǔ jí dàoqiàn',
      'Chinese apologies sit on a five-step sincerity scale, ordered by how much face the apologizer surrenders: 不好意思 (sorry-light, casual bump) < 对不起 (sorry-standard, real mistake) < 抱歉 (sorry-formal, missed obligation) < 我错了 (I was wrong, admitted fault) < 请你原谅 (please forgive me, plea for forgiveness). Picking the wrong level signals either rudeness or strange over-formality.',
      'word',
      'Stranger steps on your foot: 不好意思 ✓ / 我错了 ✗ (too heavy)\nFriend hurts you badly: 不好意思 ✗ (too light) / 请你原谅 ✓',
      'Matching the level to the offense is the single most important Mandarin apology skill — and a frequent over-correction by beginners who use 对不起 for everything.',
      [
        { target: 'LEVEL 1: 不好意思 bùhǎo yìsi', note: 'sorry-light; casual bump, small inconvenience, getting someone\'s attention' },
        { target: 'LEVEL 2: 对不起 duìbuqǐ', note: 'sorry-standard; for a real but not severe mistake — being late, breaking a small promise' },
        { target: 'LEVEL 3: 抱歉 bàoqiàn', note: 'sorry-formal; more deliberate weight, suitable for missed appointments and formal contexts' },
        { target: 'LEVEL 4: 我错了 wǒ cuò le', note: 'I was wrong; admits fault explicitly — used when you need to stop denying' },
        { target: 'LEVEL 5: 请你原谅 qǐng nǐ yuánliàng', note: 'please forgive me; plea for forgiveness — for a real wound that needs to be healed' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '对不起',
      'duìbuqǐ',
      'A three-syllable phrase with a tricky neutral-tone middle: 对 (duì, 4th — sharp falling) + 不 (bu, neutral — short, light) + 起 (qǐ, 3rd — dip and rise). Beginners often drag out 不 as full fourth tone, making the phrase sound forced and stilted.',
      'word',
      '对不起 duìbuqǐ /tweɪ⁵¹ pu ʨʰi²¹⁴/ — fall, light, dip-rise',
      'The middle 不 is unstressed here — different from 不是 (búshì) where 不 carries sandhi to second tone. Context decides 不\'s pitch.',
      [
        { target: '对 (duì, 4th)', note: 'sharp falling pitch; carries the main stress' },
        { target: '不 (bu, neutral)', note: 'short, unstressed light syllable — NOT full fourth tone, NOT sandhi to second' },
        { target: '起 (qǐ, 3rd)', note: 'final dip-and-rise; said in isolation gets the full third-tone shape' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '不好意思',
      'bùhǎo yìsi',
      'A four-syllable phrase with two stressed syllables and a long neutral-tone run at the end: 不 (bù → bú by sandhi before 4th) + 好 (hǎo, 3rd) + 意 (yì, 4th) + 思 (si, neutral). The 意-思 ending should feel light and quick — over-stressing 思 makes the phrase sound formal when it should sound casual.',
      'word',
      '不好意思 bùhǎo yìsi → spoken: búhǎo yìsi /pu³⁵ xaʊ²¹⁴ i⁵¹ sɿ/',
      'Notice the sandhi: 不 + 好 (3rd) keeps bù as fourth tone, but 不 + 好 (3rd) actually doesn\'t trigger 不-sandhi because 好 is third tone, not fourth. The phrase stays bù-hǎo, not bú-hǎo. Then 好 (3rd) + 意 (4th) — no sandhi between 好 and 意 either.',
      [
        { target: '不 (bù, 4th)', note: 'fourth tone preserved here; no sandhi because next syllable 好 is third tone, not fourth' },
        { target: '好 (hǎo, 3rd)', note: 'third tone; full dip-and-rise since followed by a 4th tone' },
        { target: '意 (yì, 4th)', note: 'sharp falling tone; the second stressed syllable in the phrase' },
        { target: '思 (si, neutral)', note: 'neutral tone — short and light; the marker of casual apologies' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '抱歉',
      'bàoqiàn',
      'A clean two-syllable phrase with two consecutive fourth tones: 抱 (bào, 4th) + 歉 (qiàn, 4th). The deliberate weight of two falling tones in a row signals greater formality than 对不起 — used in workplaces, missed appointments, and any context where the apologizer wants the apology to feel weightier.',
      'word',
      '抱歉 bàoqiàn /paʊ⁵¹ ʨʰjɛn⁵¹/ — fall, fall',
      'No sandhi here — two fourth tones simply stack. The mouth shape is heavier and slower than the rapid 对不起.',
      [
        { target: '抱 (bào, 4th)', note: 'sharp falling; literal meaning "to embrace, hold"' },
        { target: '歉 (qiàn, 4th)', note: 'sharp falling; literal meaning "regret, owe" — note the palatal initial q/ʨʰ/' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '我错了',
      'wǒ cuò le',
      'Three syllables with a sharp emotional weight: 我 (wǒ, 3rd) + 错 (cuò, 4th) + 了 (le, neutral). The aspect particle 了 at the end signals completed/realized action — "I HAVE done wrong, I AM acknowledging it now". Without 了, 我错 sounds incomplete; with it, the admission is sealed.',
      'word',
      '我错了 wǒ cuò le /wo²¹⁴ tsʰwo⁵¹ lə/',
      'The 了 must be neutral, not lè (fourth tone) — a stressed 了 sounds robotic and breaks the emotional weight of the admission.',
      [
        { target: '我 (wǒ, 3rd)', note: 'full dip-and-rise; the speaker takes the spotlight' },
        { target: '错 (cuò, 4th)', note: 'sharp falling; the verb "to be wrong" / "to make a mistake"' },
        { target: '了 (le, neutral)', note: 'aspect particle; seals the admission as a completed acknowledgement, not a hypothetical' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '请你原谅',
      'qǐng nǐ yuánliàng',
      'A four-syllable plea: 请 (qǐng, 3rd) + 你 (nǐ, 3rd) + 原 (yuán, 2nd) + 谅 (liàng, 4th). Two third tones at the start trigger sandhi — 请 rises to second tone before 你 (also third). The phrase has a rising-falling shape that mirrors the supplicant tone of the request.',
      'word',
      '请你原谅 qǐng nǐ yuánliàng → spoken: qíng nǐ yuán liàng',
      'The third-tone sandhi on 请 is critical — without it the phrase sounds rehearsed and stiff. With it, the request feels natural.',
      [
        { target: '请 (written qǐng, spoken qíng)', note: 'third-tone sandhi: rises to second tone because the next syllable 你 is also third' },
        { target: '你 (nǐ, 3rd)', note: 'second of the two third tones; keeps its full dip-and-rise' },
        { target: '原 (yuán, 2nd)', note: 'rising tone; means "original, source" — here part of the verb 原谅' },
        { target: '谅 (liàng, 4th)', note: 'sharp falling; closes the phrase with weight — "forgive" is a serious request' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Moral & Conflict
    // ────────────────────────────────────────────────────────────────────
    createContentItem('对', 'duì', 'Right, correct, accurate. The most common positive judgement word — used for facts (你说得对 "you said it right"), answers, and moral correctness. Lighter and more everyday than 正确 (zhèngquè, "correct").', 'word', '你说得对，是我错了。', '"You\'re right, I was wrong" — the standard concession in an argument.', null, [ACT.vocabularyMoral]),
    createContentItem('错', 'cuò', 'Wrong, mistaken, in error. Doubles as a verb (我错了 "I was wrong") and a noun (这是我的错 "this is my fault"). The single most useful word in any apology — without it you cannot fully admit fault.', 'word', '这件事我错了。', '"I was wrong about this matter" — full admission of fault.', null, [ACT.vocabularyMoral]),
    createContentItem('道歉', 'dàoqiàn', 'To apologize (formal). A verb-object compound — literally "express regret". Used in editorials and serious contexts. The casual verb is 说对不起 ("to say sorry"); 道歉 carries more weight and is the word used in formal/written apologies.', 'word', '我向你道歉。', '"I apologize to you" — formal apology using the 向 ("toward") preposition; more deliberate than 对不起.', null, [ACT.vocabularyMoral]),
    createContentItem('原谅', 'yuánliàng', 'To forgive. The active verb of release — different from 没关系 (which waves the issue away). Used in 请你原谅 ("please forgive me") as a plea and 我原谅你 ("I forgive you") as explicit release. Carrying weight, not casually offered.', 'word', '我原谅你了。', '"I forgive you" — the active, explicit release of blame; carries more weight than 没关系.', null, [ACT.vocabularyMoral]),
    createContentItem('错过', 'cuòguò', 'To miss (an opportunity, a person, an event) — and by extension to let someone down by missing what mattered to them. Compound of 错 (wrong) + 过 (pass) — "to pass by wrongly". The high-frequency word for "I missed your birthday".', 'word', '我错过了你的生日，真的对不起。', '"I missed your birthday, I\'m truly sorry" — the standard set-up for the apology in this lesson\'s task scenario.', null, [ACT.vocabularyMoral]),
    createContentItem('误会', 'wùhuì', 'A misunderstanding; to misunderstand. Doubles as noun and verb. Often offered as a face-saving frame: 这是一个误会 ("this is a misunderstanding") allows both sides to back down without one of them having to fully admit fault.', 'word', '可能是个误会，我们再谈谈。', '"It may be a misunderstanding, let\'s talk again" — a face-saving move that avoids assigning blame immediately.', null, [ACT.vocabularyMoral]),
    createContentItem('故意', 'gùyì', 'On purpose, intentionally. The accusatory adverb in any conflict — placed before the verb to assign deliberate intent: 你故意不来 ("you intentionally didn\'t come"). Pairs as the opposite of 不小心.', 'word', '你不是故意的，对吧？', '"You didn\'t do it on purpose, right?" — a face-saving check that gives the other party an out.', null, [ACT.vocabularyMoral]),
    createContentItem('不小心', 'bù xiǎoxīn', 'By accident, carelessly. Literally "not careful" — placed before the verb: 我不小心打碎了 ("I accidentally broke it"). The standard defense against accusations of 故意; pairs as the opposite of 故意.', 'word', '我不小心忘了你的生日。', '"I accidentally forgot your birthday" — a soft defense that admits carelessness without admitting deliberate offense.', null, [ACT.vocabularyMoral]),
    createContentItem('借口', 'jièkǒu', 'An excuse — specifically the kind of explanation the speaker rejects as inadequate. Literally "borrow-mouth"; carries a negative connotation. Different from 理由 (lǐyóu, "reason/grounds"), which is neutral. Calling something a 借口 is itself an accusation.', 'word', '别给我找借口，我要听真话。', '"Don\'t give me excuses, I want to hear the truth" — the standard pushback when the apologizer is dodging responsibility.', null, [ACT.vocabularyMoral]),
    createContentItem('责任', 'zérèn', 'Responsibility; the noun for accountability and obligation. Used in 负责任 ("to take responsibility"), 没责任 ("not responsible"), 推卸责任 ("to shirk responsibility"). The core moral noun of any conflict.', 'word', '这件事的责任在我。', '"The responsibility for this matter is mine" — formal admission that frames fault as a moral accounting, not just a mistake.', null, [ACT.vocabularyMoral]),
    createContentItem('怪', 'guài', 'To blame. A verb that takes a direct object: 别怪我 ("don\'t blame me"), 我怪我自己 ("I blame myself"). Also doubles as an adjective meaning "strange" — context decides which meaning applies.', 'word', '不要怪他，他也很难过。', '"Don\'t blame him, he\'s also very upset" — a mediator move shifting focus from blame to empathy.', null, [ACT.vocabularyMoral]),
    createContentItem('公平', 'gōngpíng', 'Fair, just, even-handed. The positive adjective of justice — used for treatment, decisions, and outcomes. Common in conflict: 这不公平 ("this isn\'t fair") is the standard protest against unequal treatment.', 'word', '我觉得这样不公平。', '"I think this isn\'t fair" — the standard mild protest using 觉得 to soften the judgement.', null, [ACT.vocabularyMoral]),
    createContentItem('不公平', 'bù gōngpíng', 'Unfair, unjust. Direct negation of 公平 — placed before noun or after subject + 是: 这是不公平的 / 这不公平. Strong word; using it in a conflict signals that you see structural unfairness, not just a one-off mistake.', 'word', '只让我一个人道歉，太不公平了。', '"Making only me apologize — that\'s really unfair" — using 太…了 to intensify the protest.', null, [ACT.vocabularyMoral]),
    createContentItem('解释', 'jiěshì', 'To explain (an action, a decision, a misunderstanding). Doubles as noun. The neutral request 你能解释一下吗? ("can you explain?") is what you ask for after an apology before deciding whether to forgive.', 'word', '我可以解释，但首先我错了。', '"I can explain, but first — I was wrong" — proper sequencing that puts admission before explanation, avoiding the 借口 trap.', null, [ACT.vocabularyMoral]),
    createContentItem('后悔', 'hòuhuǐ', 'To regret. Stronger and more personal than 遗憾 (yíhàn, "to feel a pity") — 后悔 implies you wish you had acted differently. Often paired with 要是…就好了 ("if only…") to express the counterfactual.', 'word', '我现在很后悔，要是昨晚去了就好了。', '"I really regret it now — if only I had gone last night" — chain of two regret expressions for emotional weight.', null, [ACT.vocabularyMoral]),
    createContentItem('道德', 'dàodé', 'Morality, ethics. The high-register noun for the abstract moral system — used in editorials, philosophy, and serious discussions. Different from 礼貌 (lǐmào, "manners/politeness"); 道德 carries the weight of right-and-wrong, not just etiquette.', 'word', '这是道德问题，不是技术问题。', '"This is a moral issue, not a technical issue" — used to elevate a dispute from practical to ethical grounds.', null, [ACT.vocabularyMoral]),
    createContentItem('良心', 'liángxīn', 'Conscience. Literally "good heart". The internal moral compass — used in expressions like 凭良心说 ("speaking with a clear conscience"), 没良心 ("heartless / no conscience"). Carries serious emotional weight; not used casually.', 'word', '你这样做，对得起自己的良心吗？', '"Doing this — can you face your own conscience?" — a sharp rhetorical challenge invoking the deepest moral standard.', null, [ACT.vocabularyMoral]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: Apology Hierarchy
    // ────────────────────────────────────────────────────────────────────
    createContentItem('对不起', 'duìbuqǐ', 'Standard sincere "I\'m sorry" — Level 2 on the apology hierarchy. The default apology for a real mistake between friends or acquaintances. Literally "cannot face you" — the speaker admits they cannot meet the listener\'s eyes. Too heavy for a casual bump; appropriate for a real offense.', 'word', '对不起，我昨天没来。', '"Sorry, I didn\'t come yesterday" — standard apology for a clear but moderate offense.', null, [ACT.vocabularyApology]),
    createContentItem('不好意思', 'bùhǎo yìsi', 'Sorry-light — Level 1 on the apology hierarchy. Literally "embarrassed feeling". Used for small inconveniences: bumping into someone, getting attention, brief lateness, minor faux pas. Using it for a real offense sounds dismissive; using 对不起 for a casual bump sounds melodramatic.', 'word', '不好意思，借过一下。', '"Sorry, let me pass through" — casual lightweight apology used to politely request space.', null, [ACT.vocabularyApology]),
    createContentItem('抱歉', 'bàoqiàn', 'Sorry-formal — Level 3 on the apology hierarchy. More deliberate and weightier than 对不起 — appropriate for missed appointments, workplace failures, written/formal apologies. The two consecutive fourth tones give it a heavier mouth-feel that matches its formality.', 'word', '抱歉，让你久等了。', '"Sorry to have kept you waiting so long" — formal apology suitable for a meeting context.', null, [ACT.vocabularyApology]),
    createContentItem('我错了', 'wǒ cuò le', 'I was wrong — Level 4 on the apology hierarchy. The phrase that stops the defending and admits fault explicitly. Often demanded by the offended party: "Say you were wrong." Without this admission, an apology can feel hollow even if 对不起 is repeated many times.', 'word', '我错了，请你原谅我。', '"I was wrong — please forgive me" — Level 4 admission paired with Level 5 plea; the full sincerity escalation.', null, [ACT.vocabularyApology]),
    createContentItem('请你原谅', 'qǐng nǐ yuánliàng', 'Please forgive me — Level 5 on the apology hierarchy. The deepest plea, used only for a real wound that needs to be healed. Overusing this for small offenses sounds dramatic; using anything less for a deep hurt sounds cold.', 'word', '我真的错了，请你原谅。', '"I was truly wrong, please forgive me" — the maximum-sincerity apology, with the emphatic adverb 真的 reinforcing the plea.', null, [ACT.vocabularyApology]),
    createContentItem('别生气', 'bié shēngqì', 'Don\'t be angry. A softening phrase used alongside an apology — not an apology by itself. Placed before or after the main apology: 对不起，别生气 / 别生气，我错了. Works best with close friends; with seniors or strangers, telling them not to be angry can sound presumptuous.', 'word', '别生气，是我不好。', '"Don\'t be angry — it\'s my bad" — soft de-escalator paired with the casual self-blame 是我不好.', null, [ACT.vocabularyApology]),
    createContentItem('我赔你', 'wǒ péi nǐ', 'I\'ll make it up to you / I\'ll compensate you. The concrete-amends move — Mandarin apologies feel hollow without a follow-up. Often closes with a specific offer: 我赔你一顿饭 ("I\'ll treat you to a meal"). The action proves the words.', 'word', '这次我赔你，下次一定不会忘。', '"I\'ll make it up to you this time — next time I definitely won\'t forget" — amends plus a forward-looking commitment.', null, [ACT.vocabularyApology]),
    createContentItem('给你道歉', 'gěi nǐ dàoqiàn', 'To apologize to you — slightly more formal than 跟你说对不起. Used when the apologizer wants the apology to feel deliberate: 我正式给你道歉 ("I formally apologize to you"). Common in workplace and serious-friend contexts.', 'word', '我现在正式给你道歉。', '"I now formally apologize to you" — using 正式 ("formally") to mark the apology as deliberate rather than reflexive.', null, [ACT.vocabularyApology]),
    createContentItem('是我的错', 'shì wǒ de cuò', 'It\'s my fault. The noun-form admission — different from the verb form 我错了 because it frames fault as a possession ("the fault belongs to me") rather than an action ("I made a mistake"). Slightly heavier than 我错了; often follows it as escalation.', 'word', '我错了，是我的错，不怪你。', '"I was wrong, it\'s my fault, don\'t blame you" — full admission chain that absolves the listener of any responsibility.', null, [ACT.vocabularyApology]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Vocabulary III: Acceptance & Forgiveness
    // ────────────────────────────────────────────────────────────────────
    createContentItem('没事', 'méi shì', 'It\'s nothing / no problem. Warm reassurance — used to wave away a small offense between close friends. Lighter than 没关系; signals you didn\'t take the offense seriously in the first place. Best for genuinely minor matters.', 'word', '没事没事，我也忘了一次。', '"It\'s nothing — I also forgot once" — warm dismissal paired with shared-fault framing that protects the apologizer\'s face.', null, [ACT.vocabularyAcceptance]),
    createContentItem('没关系', 'méi guānxi', 'No problem / doesn\'t matter. The standard polite acceptance — works in any register from casual to formal. Lighter than active forgiveness (原谅你); it waves the issue away without addressing whether real forgiveness happened. Acceptable for moderate offenses.', 'word', '没关系，下次注意就好。', '"No problem — just be careful next time" — standard acceptance paired with a soft warning that the offense did register.', null, [ACT.vocabularyAcceptance]),
    createContentItem('算了', 'suàn le', 'Forget it / let\'s drop it. Cool resignation — signals you\'re willing to stop the conversation but haven\'t fully forgiven. Slightly cooler than 没关系; can sound passive-aggressive if delivered without warmth. Don\'t use this if you want the relationship fully repaired.', 'word', '算了，我不想再说这件事了。', '"Forget it — I don\'t want to talk about this anymore" — resignation that ends the conversation but leaves the wound unhealed.', null, [ACT.vocabularyAcceptance]),
    createContentItem('下次小心', 'xiàcì xiǎoxīn', 'Be careful next time. Conditional acceptance — receives the apology while explicitly noting that the offense mattered. A face-saving compromise common between close friends: accepts the apology but doesn\'t pretend nothing happened.', 'word', '好，没关系。下次小心点。', '"OK, no problem. Just be more careful next time" — the standard accept-with-warning combo.', null, [ACT.vocabularyAcceptance]),
    createContentItem('原谅你', 'yuánliàng nǐ', 'I forgive you. The active release of blame — different from 没关系 because it explicitly answers the question "did you really forgive me?". Carrying weight; used for serious offenses where the offended party wants to mark the forgiveness as deliberate.', 'word', '好吧，我原谅你。但你欠我一顿饭。', '"OK, I forgive you. But you owe me a meal" — explicit forgiveness paired with a make-up condition that keeps relational accounting balanced.', null, [ACT.vocabularyAcceptance]),
    createContentItem('我不生气', 'wǒ bù shēngqì', 'I\'m not angry. Reassurance that the offense didn\'t land emotionally — often used to release the apologizer from over-apologizing. Stronger than 没事 because it explicitly addresses the emotional state; weaker than 原谅你 because it doesn\'t release blame, just declares the absence of anger.', 'word', '别道歉了，我真的不生气。', '"Stop apologizing, I really am not angry" — used when the apologizer is over-doing it and the offended party wants to move on.', null, [ACT.vocabularyAcceptance]),
    createContentItem('知道你不是故意的', 'zhīdào nǐ bùshì gùyì de', 'I know you didn\'t do it on purpose. The empathetic acceptance — explicitly grants the apologizer the 不小心 defense and removes the accusation of deliberate offense. Often used when the offense was genuinely accidental.', 'word', '我知道你不是故意的，但我还是难过。', '"I know you didn\'t do it on purpose, but I\'m still upset" — empathetic acceptance that acknowledges emotional impact without assigning malicious intent.', null, [ACT.vocabularyAcceptance]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar I: 应该 / 不应该 / 本来应该
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '应该',
      'yīnggāi',
      'Should — the modal of obligation or expectation. Placed BEFORE the verb: 你应该来 ("you should come"), NOT 你来应该. Carries moral or logical force without being absolute — softer than 必须 (bìxū, "must") and stronger than 可以 (kěyǐ, "can").',
      'sentence',
      '你应该早点告诉我。我应该理解你。',
      '"You should have told me earlier. I should understand you." — the modal 应该 in two directions: outward expectation and inward obligation.',
      [
        { target: '应该 + V', note: 'modal-before-verb word order; never modal-after' },
        { target: '应该 vs 必须 vs 可以', note: '应该 = should (moral/logical); 必须 = must (absolute); 可以 = can/may (permission)' },
        { target: '主语 + 应该 + 动词', note: 'standard pattern; the subject is what owes the obligation' },
      ],
      [ACT.grammarShould],
    ),
    createContentItem(
      '不应该',
      'bù yīnggāi',
      'Should not — direct negation of 应该 with 不 placed before. Also placed before the verb: 你不应该这样说 ("you shouldn\'t say it like that"). Strong moral judgement; using it on someone older or senior can sound presumptuous unless the offense is serious.',
      'sentence',
      '我不应该忘了你的生日。你不应该一个人难过。',
      '"I shouldn\'t have forgotten your birthday. You shouldn\'t be upset alone." — the modal aimed at oneself (admission) and the other (concern).',
      [
        { target: '不 + 应该 + V', note: 'word order: 不 negates the modal, modal precedes verb' },
        { target: 'sandhi: 不应 (bù yīng)', note: 'no sandhi here because 应 is 1st tone; 不 stays as bù' },
        { target: 'softer: 不该 (bù gāi)', note: 'shorter form of 不应该; same meaning, slightly more casual' },
      ],
      [ACT.grammarShould],
    ),
    createContentItem(
      '本来应该',
      'běnlái yīnggāi',
      'Should have but didn\'t — the counterfactual past-obligation pattern. 本来 (běnlái, "originally") + 应该 (should) marks an obligation that was NOT fulfilled. The most important pattern for admitting fault in an apology: 我本来应该来 ("I should have come").',
      'sentence',
      '我本来应该早点告诉你的，但是我忘了。',
      '"I should have told you earlier, but I forgot" — admission paired with explanation; the closing 的 + 但是 is the natural rhythm.',
      [
        { target: '本来 + 应该 + V', note: '"originally should have V-ed"; the V did not happen' },
        { target: '本来 alone', note: '"originally"; can stand without 应该 to mark a counterfactual plan: 本来要去 ("was originally going to go")' },
        { target: '本来应该 + V + 的', note: 'frequent closing 的 adds a soft emphasis on the unfulfilled obligation' },
      ],
      [ACT.grammarShould],
    ),
    createContentItem(
      '应该 vs 要 vs 必须',
      'yīnggāi vs yào vs bìxū',
      'Three modals of obligation at different strengths: 应该 (should — moral/logical, softer), 要 (need to / want to — practical), 必须 (must — absolute, no choice). Choosing the wrong one changes how strong your claim sounds and can read as either weak or presumptuous.',
      'sentence',
      '应该: 你应该道歉。(moral)\n要: 你要道歉。(practical urgency)\n必须: 你必须道歉。(absolute, no choice)',
      'Same surface meaning ("you should/need to/must apologize") but three different social weights — pick by how much pressure you want to apply.',
      [
        { target: '应该', note: 'moral or logical "should"; softer, leaves room for disagreement' },
        { target: '要', note: '"need to" / "want to"; practical urgency without moral weight' },
        { target: '必须', note: '"must"; absolute, no choice — used when the obligation is non-negotiable' },
      ],
      [ACT.grammarShould],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar II: 要是…就好了
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '要是…就好了',
      'yàoshi … jiù hǎo le',
      'If only X had happened, it would have been good — the counterfactual regret pattern. Two parts: 要是 X ("if X") + 就好了 ("would have been good"). Used to express regret without bluntly admitting fault: 要是我去了就好了 ("if only I had gone").',
      'sentence',
      '要是我昨晚去了就好了。',
      '"If only I had gone last night" — counterfactual regret about a past missed event; expresses fault implicitly without saying 我错了.',
      [
        { target: '要是 + clause', note: '"if" — informal version; less formal than 如果 (rúguǒ) and 假如 (jiǎrú)' },
        { target: '就好了', note: '"would have been good" — fixed closing phrase; the 了 marks the counterfactual completion' },
        { target: 'word order', note: 'condition first (要是…), result-evaluation last (就好了); same as English "if only…"' },
      ],
      [ACT.grammarRegret],
    ),
    createContentItem(
      '软化批评',
      'ruǎnhuà pīpíng',
      'Softening self-criticism with 要是…就好了 — the pattern lets you admit fault without sounding harsh on yourself or the other person. Saying 要是我记得就好了 ("if only I had remembered") lands gentler than the bare 我忘了 ("I forgot"), while still acknowledging the lapse.',
      'sentence',
      '我忘了 (blunt) vs 要是我记得就好了 (gentle regret) — same fact, very different emotional weight.',
      'The 要是…就好了 frame foregrounds the wish, not the failure; useful when you want to acknowledge fault without dwelling on self-blame.',
      [
        { target: '我忘了', note: 'blunt admission; bare fact, can sound abrupt' },
        { target: '要是我记得就好了', note: 'softened regret; foregrounds the wished-for alternative rather than the failure itself' },
      ],
      [ACT.grammarRegret],
    ),
    createContentItem(
      '要是 vs 如果 vs 假如',
      'yàoshi vs rúguǒ vs jiǎrú',
      'Three "if" words at different registers: 要是 (informal, conversational), 如果 (neutral, default), 假如 (formal, hypothetical). 要是…就好了 sounds most natural in friend-to-friend regret; 如果 is the default in writing; 假如 is reserved for formal hypotheticals.',
      'sentence',
      '要是 (informal): 要是我早点来就好了。\n如果 (neutral): 如果我早点来，就不会这样了。\n假如 (formal): 假如我能重来一次，我一定会改。',
      'Three different "if" frames for the same idea; the register of the conjunction tunes the whole sentence.',
      [
        { target: '要是 yàoshi', note: 'informal; friend-to-friend; standard in 要是…就好了 regret' },
        { target: '如果 rúguǒ', note: 'neutral; default in writing and general speech' },
        { target: '假如 jiǎrú', note: 'formal; reserved for hypotheticals and rhetorical "suppose…"' },
      ],
      [ACT.grammarRegret],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Grammar III: 之所以…是因为…
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '之所以…是因为…',
      'zhī suǒyǐ … shì yīnwèi …',
      'The reason X is because Y — formal cause-explanation pattern. Result first (之所以 X), cause second (是因为 Y). Opposite order of casual 因为…所以…; the inverted order foregrounds what needs explaining, which makes it useful when the result is already known.',
      'sentence',
      '我之所以没来，是因为我妈妈住院了。',
      '"The reason I didn\'t come is because my mother was hospitalized" — formal cause-explanation; the result (没来) is already known to the listener, so the speaker leads with it.',
      [
        { target: '之所以 + 结果', note: 'result clause; what needs explaining' },
        { target: '是因为 + 原因', note: 'cause clause; the explanation' },
        { target: 'vs 因为…所以…', note: 'casual order: cause first, result second; opposite of 之所以…是因为…' },
      ],
      [ACT.grammarReason],
    ),
    createContentItem(
      '解释 vs 借口',
      'jiěshì vs jièkǒu',
      'Explanation vs excuse — the pattern 之所以…是因为… can land as either, depending on what comes before it. If used AFTER an admission of fault (我错了), it reads as a sincere explanation. If used INSTEAD of admission, it reads as a 借口 (excuse) and makes the apology hollow.',
      'sentence',
      'GOOD: 我错了。我之所以没来，是因为…\nBAD: 我之所以没来，是因为…（no admission first）',
      'Sequencing matters: admission → explanation reads as honest; explanation alone reads as deflection.',
      [
        { target: 'admission first', note: '我错了 / 是我的错 / 我本来应该来; opens with accepting fault' },
        { target: '之所以…是因为…', note: 'follows the admission; gives context without dodging blame' },
        { target: 'avoiding 借口', note: 'do not lead with the explanation; do not over-elaborate the reason' },
      ],
      [ACT.grammarReason],
    ),
    createContentItem(
      '其实…',
      'qíshí …',
      'Actually… — a softer alternative when 之所以…是因为… would feel too formal. 其实 (qíshí, "actually") opens an explanation casually: 其实我那天有事 ("actually I had something that day"). Less weighty than 之所以…是因为…; appropriate when the offense is small or the relationship is casual.',
      'sentence',
      '对不起，其实我那天家里有点事。',
      '"Sorry — actually that day I had a bit of something going on at home" — softer apology + casual explanation; appropriate for moderate offenses between friends.',
      [
        { target: '其实', note: 'softer "actually"; less formal than 之所以…是因为…' },
        { target: 'register match', note: 'pair 其实 with 对不起 (casual); pair 之所以…是因为… with 抱歉 or 我错了 (formal)' },
      ],
      [ACT.grammarReason],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Reading & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '微信道歉',
      'wēixìn dàoqiàn',
      'A five-sentence WeChat apology paragraph after missing a friend\'s birthday. Read it aloud and identify which sincerity level each phrase signals — the writer escalates from 对不起 to 我错了 to 请你原谅, demonstrating proper apology architecture.',
      'sentence',
      '小李，对不起。我本来应该昨晚去你的生日聚会的。我之所以没来，是因为我突然加班到很晚，没能告诉你，是我不好。要是我提前告诉你就好了。我真的错了，请你原谅我，这周末我请你吃饭。',
      '"Xiao Li, sorry. I should have come to your birthday party last night. The reason I didn\'t come is because I suddenly had to work overtime until very late and couldn\'t tell you — that was my bad. If only I had told you in advance. I was truly wrong, please forgive me, this weekend I\'ll treat you to dinner."',
      [
        { target: '对不起 (Level 2)', note: 'opens with standard apology — sets the tone' },
        { target: '本来应该…的', note: 'counterfactual obligation; the writer admits they should have come' },
        { target: '之所以…是因为…', note: 'formal explanation; placed AFTER the admission, not before — avoids reading as 借口' },
        { target: '要是…就好了', note: 'gentle regret about not communicating in advance; softens the self-criticism' },
        { target: '我错了 + 请你原谅 (Levels 4+5)', note: 'escalation to the deepest apology levels; closes with a concrete amends offer (请你吃饭)' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '理解问题',
      'lǐjiě wèntí',
      'Four comprehension questions matching the WeChat apology. Each tests a different reading skill — identifying the apology level, locating the admission of fault, finding the explanation, and recognizing the amends proposal.',
      'sentence',
      'Q1: 哪一句话是真正的道歉？\nQ2: 写信的人承认错误了吗？怎么说的？\nQ3: 他给了什么解释？是不是借口？\nQ4: 他打算怎么补偿？',
      '"Q1: Which sentence is the real apology? Q2: Did the writer admit fault? How? Q3: What explanation did he give? Is it an excuse? Q4: How does he plan to make amends?"',
      [
        { target: 'A1: 我真的错了，请你原谅我。', note: 'Level 4+5 escalation — the writer\'s deepest apology' },
        { target: 'A2: 是我不好 / 我真的错了', note: 'two admission moves; the second is stronger' },
        { target: 'A3: 之所以…是因为加班 — 不是借口', note: 'placed AFTER the admission, so reads as honest explanation not 借口' },
        { target: 'A4: 这周末我请你吃饭。', note: 'concrete amends — a specific make-up plan, not a vague promise' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Listening & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '面对面道歉 (对话)',
      'miàn duì miàn dàoqiàn (duìhuà)',
      'A natural face-to-face apology dialogue between two close friends at Tsinghua University over tea. Covers the full arc: opening apology, request for explanation, real explanation, escalation to admission, conditional acceptance, and amends proposal — eight turns of authentic reconciliation.',
      'conversation',
      'A (小王): 小李，对不起。我昨晚没去你的生日聚会，真的不好意思。\nB (小李): 你为什么没来？我等了你两个小时。\nA: 我之所以没来，是因为加班到十一点半，又不敢打扰你。我错了，我应该早点告诉你。\nB: 你应该早点告诉我才对啊。我以为你忘了我的生日，特别难过。\nA: 我没忘，我本来应该去的。要是我那时候发个微信给你就好了。是我的错。\nB: 嗯…我知道你不是故意的。但是下次你要早点告诉我。\nA: 一定一定。这周末我请你吃饭赔你，好不好？\nB: 好吧，那这次我原谅你。但你欠我一个生日礼物。',
      'Eight-turn reconciliation between close friends. Notice how A escalates apologies (对不起 → 我错了 → 是我的错) until B accepts; B does NOT forgive on the first try and requires explanation + amends.',
      [
        { target: '不敢打扰你 bù gǎn dǎrǎo nǐ', note: '"didn\'t dare disturb you"; soft framing that shows the apologizer was thinking of the offended party' },
        { target: '你应该早点告诉我才对啊', note: 'B uses 应该 + 才对 to push back — "you SHOULD have told me, that\'s the right thing"; the 啊 softens it slightly' },
        { target: '特别难过 tèbié nánguò', note: '"especially upset"; B explicitly names emotional impact, which is what makes the apology need to escalate' },
        { target: '一定一定 yīdìng yīdìng', note: 'doubled "definitely definitely"; emphatic promise common in repair conversations' },
        { target: '欠我一个生日礼物', note: '"owes me a birthday gift"; B keeps relational accounting balanced — the amends is concrete, not symbolic' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      '听后讨论',
      'tīng hòu tǎolùn',
      'Discussion questions after listening — the goal is to notice the social dynamics, not just the vocabulary. Pay attention to WHEN B forgives, what made the difference, and how the make-up plan keeps the friendship balanced.',
      'sentence',
      'Q1: 小王第一次道歉，小李原谅他了吗？为什么？\nQ2: 小王escalate到了哪个等级？\nQ3: 小李最后说"原谅你"还是"没关系"？这有什么区别？\nQ4: 为什么小李说"你欠我一个生日礼物"？',
      'Four discussion prompts; the third is the most important — distinguishing active forgiveness from passive dismissal.',
      [
        { target: 'Q1', note: 'no — B asks for explanation first; the first apology is not enough for the offense' },
        { target: 'Q2', note: 'Level 4 (我错了) and 是我的错 — A admits fault explicitly before B accepts' },
        { target: 'Q3', note: '"原谅你" — explicit active forgiveness; weightier than "没关系" because it answers "did you really forgive me?"' },
        { target: 'Q4', note: 'keeps relational accounting balanced; the amends is concrete (a gift), not symbolic' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '写作模板',
      'xiězuò múbǎn',
      'A reusable five-step apology template that hits every required grammar pattern and closes with concrete amends. Fill in the bracketed slots with your own offense, reason, and make-up plan.',
      'sentence',
      '[称呼]，对不起。\n我本来应该 [你应该做的事] 的。\n我之所以 [你做的事/没做的事]，是因为 [原因]。\n要是 [假设的好做法] 就好了。\n我真的错了，请你原谅我。\n[补偿计划：这周末我请你吃饭 / 我赔你一个礼物 / etc.]',
      'Six-line template: address + opening apology + counterfactual obligation + explanation + regret + escalation + amends. Hitting every line in order produces a complete, well-paced apology.',
      [
        { target: '[称呼]', note: 'address — the person\'s name or title (小李 / 王老师); sets register' },
        { target: '[本来应该 X 的]', note: 'fill in what you should have done; the unfulfilled obligation' },
        { target: '[之所以 X 是因为 Y]', note: 'fill in what you did/didn\'t do and why; placed AFTER the admission to avoid 借口' },
        { target: '[要是 Z 就好了]', note: 'fill in the wished-for alternative; softens the self-criticism' },
        { target: '[补偿计划]', note: 'concrete amends — a specific time/place/action; vague promises ("I\'ll make it up") are not enough' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '写作练习',
      'xiězuò liànxí',
      'Write your own 5–7 sentence apology to a friend you have hurt, using at least one phrase from each level of the apology hierarchy (Level 1 不好意思 through Level 5 请你原谅) plus 本来应该 and 之所以…是因为….',
      'sentence',
      '示例: 小张，对不起。昨天我本来应该陪你去医院的，我没去，是我不好。我之所以没去，是因为我突然有个紧急的考试要准备。要是我那时候告诉你就好了。我真的错了，请你原谅我。这周末我陪你做你想做的事，好吗？',
      '"Xiao Zhang, sorry. I should have gone with you to the hospital yesterday, I didn\'t, that\'s my bad. The reason I didn\'t go is because I suddenly had an urgent exam to prepare for. If only I had told you then. I was truly wrong, please forgive me. This weekend I\'ll accompany you to do whatever you want, OK?"',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '道歉的等级',
      'dàoqiàn de děngjí',
      'The five-step apology hierarchy is fundamentally a face-saving system: each level escalates sincerity AND surrenders more face, so over-apologizing to a stranger sounds awkward while under-apologizing to a wronged friend sounds cold. Native speakers calibrate the level to the offense and the relationship — getting it wrong is a meaningful social error, not just a vocabulary mistake.',
      'sentence',
      'Mismatch examples:\n• Bumping a stranger: 请你原谅 ✗ (way too heavy; sounds dramatic) — use 不好意思\n• Hurting a friend: 不好意思 ✗ (way too light; sounds dismissive) — use 我错了 / 请你原谅\n• Workplace mistake: 对不起 ✗ (slightly too casual) — use 抱歉',
      'The level mismatch is more visible to native speakers than the choice of vocabulary itself — match the level first, then refine the words.',
      [
        { target: 'Level 1: 不好意思 (lightest)', note: 'minor inconveniences; stranger interactions; getting attention' },
        { target: 'Level 2: 对不起', note: 'standard mistakes between friends/acquaintances; mild offenses' },
        { target: 'Level 3: 抱歉', note: 'formal contexts; missed obligations; workplace failures' },
        { target: 'Level 4: 我错了', note: 'admitted fault; for when defense or denial would be inappropriate' },
        { target: 'Level 5: 请你原谅 (heaviest)', note: 'deep wounds; serious offenses; the supplicant\'s plea for forgiveness' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '给面子',
      'gěi miànzi',
      'In Chinese conflict, accepting an apology too quickly can shame the apologizer (it suggests the offense was trivial), while refusing one too long is publicly humiliating. The right reception protects both parties\' face — 给面子 (giving face) means accepting at the right pace, with the right phrase, neither too eagerly nor too reluctantly.',
      'sentence',
      'Too quick: 没事没事，没什么大不了 ✗ (suggests the offense was trivial — undermines the apology)\nToo slow: 不原谅你 (refusal that publicly humiliates the apologizer)\nJust right: …a pause… 好吧，我知道你不是故意的。下次小心点。',
      'The pacing matters as much as the words — a brief silence before acceptance signals that the offense registered; instant dismissal can read as either generous or contemptuous depending on context.',
      [
        { target: '给面子 gěi miànzi', note: '"give face"; show respect by accepting gracefully at the right pace' },
        { target: '不给面子 bù gěi miànzi', note: '"don\'t give face"; publicly refuse, dismiss, or humiliate — a serious relational move' },
        { target: '掉面子 / 丢面子 diào / diū miànzi', note: '"lose face"; the apologizer\'s public humiliation if their apology is rejected' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '间接道歉',
      'jiānjiē dàoqiàn',
      'The indirect path to apology — offering food, drink, or a small gift instead of (or alongside) explicit words. Common in close relationships where saying 对不起 outright would feel awkward; the gesture carries the apology. Showing up with their favorite snack, paying for the meal, or sending a thoughtful gift IS the apology.',
      'sentence',
      '我请你吃饭 (I\'ll treat you to a meal) — often functions as a full apology between friends\n买一杯你最喜欢的奶茶 — buying a specific favorite drink as a peace offering\n送一个小礼物 — a small thoughtful gift; the thought matters more than the value',
      'Mandarin reconciliation is often action-first, words-second — the offer to make up tangibly is itself the deepest apology in close relationships.',
      [
        { target: '我请你吃饭', note: 'the universal Chinese amends — treating to a meal is the default make-up gesture' },
        { target: '送礼物', note: 'a small thoughtful gift; the specificity (their favorite, not generic) is what matters' },
        { target: '我赔你', note: 'verbal pairing with the action; "I\'ll compensate you" cements the amends' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '道歉文化',
      'dàoqiàn wénhuà',
      'The modern Chinese corporate-apology era — 社交媒体 (social media) has made 道歉文化 ("apology culture") into a public ritual. Celebrities, brands, and officials issue formal apology statements on Weibo following scandals; the statements follow predictable patterns (deep bow, "I deeply apologize" 深深致歉, promise of self-improvement) and are studied by communications scholars as a PR genre.',
      'sentence',
      'Public apology template:\n各位粉丝/网友 (dear fans / netizens)\n我深深致歉 (I deeply apologize)\n这是我的错，我会反思 (this is my fault, I will reflect)\n请大家原谅 (please everyone forgive me)\n— Typical structure of a celebrity scandal apology on Weibo.',
      'The corporate apology is its own genre with its own vocabulary — 深深致歉 (deeply apologize), 反思 (reflect), 自我批评 (self-criticism) — distinct from interpersonal apology vocabulary.',
      [
        { target: '深深致歉', note: '"deeply apologize"; formal corporate/public register; never used in personal conversation' },
        { target: '反思 fǎnsī', note: '"reflect on / self-examine"; the obligatory follow-up promise in public apologies' },
        { target: 'PR vs interpersonal', note: 'corporate apologies are scripted and public; interpersonal apologies use the five-level hierarchy and 给面子 logic' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 13 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '任务: 朋友错过我的生日',
      'rènwù: péngyou cuòguò wǒ de shēngrì',
      'Roleplay your best friend at Tsinghua University skipping your 21st birthday party with the tutor playing the friend. Process your feelings, hear them out, decide whether to forgive, and propose (or accept) a make-up plan. Use every skill from this lesson in one continuous 10-turn scene.',
      'conversation',
      '[周日上午，清华校内的奶茶店]\n朋友: 对不起，昨晚我真的不好意思，没去你的生日聚会。\n你: [回应 — 但不要太快原谅]\n朋友: 我之所以没来，是因为…\n你: [听完后回应 — 是借口还是合理？]\n朋友: 我本来应该早点告诉你的，我错了。\n你: [escalate问责或者softening — 你的选择]\n朋友: 要是我那时候发微信给你就好了。\n你: [开始决定是否原谅]\n朋友: 这周末我请你吃饭，行不行？\n你: [接受补偿 / 提出你自己的make-up计划 / 决定原谅]',
      '10-turn fluent exchange; the tutor will adjust the friend\'s sincerity based on how you respond — accepting the first apology gets a lazy friend; pushing back gets a more sincere one. Aim to require at least Level 4 (我错了) before forgiving.',
      [
        { target: '不要太快原谅', note: 'don\'t accept the first apology — it shames the apologizer and makes the offense seem trivial' },
        { target: '听借口', note: 'listen for whether the explanation is sequenced after admission (good) or instead of admission (bad)' },
        { target: 'escalate', note: 'push the apologizer to admit fault explicitly: "你真的错了吗？" / "我等你说我错了"' },
        { target: 'forgive explicitly', note: 'use 我原谅你 not just 没关系 — actively release blame, don\'t just wave the issue away' },
        { target: '提补偿', note: 'close with a concrete amends — accept theirs or propose your own; balanced relational accounting matters' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战 — 拒绝借口',
      'tiǎozhàn — jùjué jièkǒu',
      'Stretch goal: in the same scene, the friend leads with the explanation BEFORE admitting fault — making the apology sound like a 借口. Call them out using the vocabulary from Activity 3, demand a real admission, and only then consider forgiving.',
      'conversation',
      '朋友: 之所以昨晚没来，是因为加班加到十二点，真的太累了。\n你: 别给我找借口。我想先听你承认错了。\n朋友: 嗯…我错了。我本来应该提前告诉你的。\n你: 这才对。继续。\n朋友: 是我的错，请你原谅。下周末我陪你做你想做的事。\n你: 好吧。这次我原谅你。但下次一定要提前告诉我。',
      'Six-turn pushback sequence; you refuse to let the apologizer skip the admission step. The 别给我找借口 line is the key intervention.',
      [
        { target: '别给我找借口', note: 'the standard pushback when the apologizer leads with explanation instead of admission' },
        { target: '我想先听你承认错了', note: 'demands admission first, explicitly naming the sequencing the apologizer skipped' },
        { target: '这才对', note: '"now that\'s right"; affirms that the apologizer has finally said the necessary thing' },
        { target: '原谅 + 下次一定…', note: 'explicit forgiveness paired with a forward-looking condition; closes the loop without dismissing the offense' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '反思',
      'fǎnsī',
      'Reflection question to close the lesson — the goal is not just to apologize correctly but to recognize when the apology architecture is being misused. The cultural lesson: 道歉 is not just words but a calibrated social ritual that protects both parties\' face.',
      'sentence',
      'Q: 想一想 — 上次你道歉的时候，你用的是哪个等级？你的道歉真诚吗？对方原谅你了吗？为什么？\nQ: 如果你是被道歉的人，你最看重道歉里的哪一部分？是承认错误、解释、还是补偿计划？',
      'Two reflection prompts; the second is particularly worth thinking about — your own answer reveals what kind of apology will work on you, which helps you understand what works on others.',
      null,
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
