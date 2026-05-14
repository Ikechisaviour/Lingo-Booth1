// Level 2 Unit 4 — 男人、女人与社会 (Men, Women & Society — Mandarin Chinese)
// A culturally sensitive thematic unit on gender-related vocabulary, modern
// Chinese phenomena (彩礼, 丁克, 单身经济, 剩女/剩男 — handled neutrally and
// historically), and the discussion grammar a learner needs to register
// contrast (不过 / 但是 / 可是), shrug-conclude with 反正, and pose
// rhetorical 难道…吗? challenges in a friendly debate.
//
// All content is authored with Hanzi (target) + Pinyin (romanization) +
// English glosses (canonical source). The AI conversation tutor reads this
// curriculum and delivers it to each learner in their preferred native
// language at runtime — never assume a specific L1 in this file.
//
// Glosses follow the rich-gloss rule (AGENTS.md → "Gloss Richness"):
// every nativeText, exampleNative, and breakdown.native carries register,
// usage context, contrast info, or a notable cultural nuance — never a
// bare definition. Controversial terms (剩女, 剩男, 高彩礼) are framed
// historically and neutrally, with explicit notes on when they offend.

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
  orientation: 'zh-l2u4-orientation',
  pronunciation: 'zh-l2u4-pronunciation',
  vocabularyRelationships: 'zh-l2u4-vocab-relationships',
  vocabularyGenderSociety: 'zh-l2u4-vocab-gender-society',
  grammarContrast: 'zh-l2u4-grammar-contrast',
  grammarFanzheng: 'zh-l2u4-grammar-fanzheng',
  grammarNandao: 'zh-l2u4-grammar-nandao',
  reading: 'zh-l2u4-reading',
  listening: 'zh-l2u4-listening',
  writing: 'zh-l2u4-writing',
  culture: 'zh-l2u4-culture',
  task: 'zh-l2u4-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Talk about relationships, marriage, and singlehood in Mandarin using 15+ everyday and modern-internet-era terms (谈恋爱, 单身, 闪婚, 相亲, 催婚) without slipping into outdated or offensive phrasing.',
      'Compare two viewpoints using the contrast trio 不过 / 但是 / 可是 — choosing the register that fits a friendly chat (不过), a balanced essay (但是), or a strong personal pushback (可是).',
      'Wrap a casual conclusion with 反正 (regardless / either way) and challenge an assumption with the rhetorical 难道…吗? pattern — two moves that make conversational Mandarin sound natural rather than textbook-stiff.',
      'Discuss modern Chinese phenomena (彩礼, 丁克, 单身经济, 30+岁未婚) with cultural awareness — historical context, urban-rural variation, and which terms still carry a sting.',
    ],
    task: 'Imagine a coffee break at 清华大学 with a Mainland classmate who casually mentions her cousin is going to a 相亲 next weekend. By the end of this lesson you can join the conversation, share an outside perspective, and politely disagree on whether 相亲 makes sense for fresh graduates today.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in this lesson',
    goals: [
      'Pronounce 彩礼 (cǎilǐ) with TWO consecutive third tones — apply third-tone sandhi so the first 彩 rises to a second tone in speech (cáilǐ), the same rule you learned for 你好.',
      'Distinguish the retroflex initial in 剩女 (shèngnǚ) — sh- with a curled-back tongue, plus the rounded front vowel ü in 女 (NOT the back vowel u); slurring these makes the word unintelligible.',
      'Hit the palatal initials in 偏见 (piānjiàn) cleanly — both p- aspirated and j- (alveolo-palatal), with a smooth glide from -ian to -jian; learners often drop the medial -i-.',
      'Keep the tone contrast in 平等 (píngděng) sharp — second tone píng (rising) into third tone děng (low/dip); a flat-second slip turns it into something that sounds like a different word.',
    ],
    task: 'Read each pronunciation card aloud, mark the tone of every syllable, and identify whether sandhi or initial-finals tongue gymnastics are the trap — then pronounce the spoken version (not just the written tones).',
  },
  {
    id: ACT.vocabularyRelationships,
    section: 'Vocabulary I',
    title: 'Dating, marriage, singlehood',
    goals: [
      'Use the core dating-and-marriage verbs (谈恋爱, 分手, 结婚, 离婚) and their related state nouns (单身, 已婚, 离异) accurately — these are not interchangeable; 谈恋爱 is the active verb "to date", 单身 is the static state "single".',
      'Distinguish 男朋友 / 女朋友 (boyfriend / girlfriend — exclusive relationship) from 朋友 (friend) and from 对象 (a partner candidate, used by older generations and matchmakers) — the wrong choice signals the wrong stage of commitment.',
      'Understand modern compounds (闪婚, 相亲, 催婚) and the loaded terms 剩女 / 剩男 well enough to discuss them neutrally — these words carry social weight and should be handled with care, never as casual labels.',
    ],
    task: 'Pick three terms from this set, then write one sentence with each that describes a real situation — not a dictionary definition.',
  },
  {
    id: ACT.vocabularyGenderSociety,
    section: 'Vocabulary II',
    title: 'Gender, equality, and modern Chinese phenomena',
    goals: [
      'Use the gender-discussion core vocabulary (性别, 平等, 偏见, 刻板印象) to frame any opinion politely and intelligibly — these are the four words that turn a personal comment into an informed observation.',
      'Recognize the modern Mainland Chinese phenomena that come up in any real conversation about gender today: 彩礼 (bride price), 丁克 (DINK / no-kids-by-choice), 单身经济 (single-person economy), 高彩礼 (the high-bride-price controversy).',
      'Avoid the most common learner traps: confusing 性别 (gender, neutral) with 性 (sex / sexuality, sometimes loaded), and remembering that 平等 (equality) pairs with 性别 to form 性别平等 — the standard term for gender equality.',
    ],
    task: 'Pair each modern phenomenon (彩礼 · 丁克 · 单身经济) with one real-world context where it would come up in conversation, then use the term in a sentence.',
  },
  {
    id: ACT.grammarContrast,
    section: 'Grammar I',
    title: '不过 / 但是 / 可是 — three registers of "but"',
    goals: [
      'Choose 不过 for soft, chatty contrast ("though, well") — the warmest of the three, appropriate when you want to disagree without sounding like you are arguing.',
      'Choose 但是 for the balanced default ("but, however") — the textbook neutral, suitable for essays, presentations, and any context where you would write rather than chat.',
      'Choose 可是 for personal pushback ("but really, but still") — slightly stronger and more emotional than 但是, often heard when someone is mildly exasperated or insistent.',
      'Know that all three are sentence-initial conjunctions in their second clause; word order does NOT change otherwise, and overusing 但是 makes Mandarin sound stiff.',
    ],
    task: 'Take one sentence pair and rewrite it three times with 不过, 但是, and 可是 — feel the register shift across the three.',
  },
  {
    id: ACT.grammarFanzheng,
    section: 'Grammar II',
    title: '反正 — "either way, regardless"',
    goals: [
      'Use 反正 (fǎnzhèng) to introduce a casual conclusion the speaker considers settled — "anyway, regardless of what came before". Sits at the start of the conclusion clause; common in spoken Mandarin, rare in formal writing.',
      'Distinguish 反正 (casual conclusion / shrug) from 不管 (regardless of X) and 总之 (in summary, to wrap up) — all three close a discussion but with different feels.',
      'Pair 反正 with a justification clause that follows: 反正我不去 ("regardless, I am not going") often comes after a previous statement establishing why.',
    ],
    task: 'Write three short two-clause sentences where the second clause starts with 反正 — each closing a small mini-argument.',
  },
  {
    id: ACT.grammarNandao,
    section: 'Grammar III',
    title: '难道…吗? — the rhetorical "is it really…?"',
    goals: [
      'Form a rhetorical question with 难道…吗? expecting the answer "no, of course not" — used to challenge an assumption politely or to push back without bluntly disagreeing.',
      'Place 难道 right after the subject (or at sentence start) and keep 吗 at the end — the structure is fixed, even though English has no direct equivalent.',
      'Distinguish a real yes/no question (你是学生吗?) from a rhetorical one (你难道是学生吗?) — same surface form, very different intent; the 难道 marker is the giveaway.',
    ],
    task: 'Convert three flat statements ("She must marry by 30.") into rhetorical 难道…吗? challenges that push back on the assumption.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'A short opinion piece on 相亲',
    goals: [
      'Read a 120-character opinion piece on 相亲 (arranged blind dates) aloud with correct tones and natural pacing — the kind of think-piece you might find on a Mainland Chinese lifestyle site.',
      'Answer four comprehension questions about the author\'s stance, the cultural context, and the contrast moves (不过, 难道…吗?) in the piece.',
    ],
    task: 'Read the paragraph aloud once, then summarize the author\'s position in two sentences using 不过 and 反正.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'Two classmates argue about 催婚',
    goals: [
      'Follow a 6-turn dialogue between two 清华大学 classmates about family pressure to marry (催婚), noticing the register markers (不过 vs 可是, 反正, 难道…吗?) each speaker uses.',
      'Reproduce the dialogue with your own information swapped in — your home country\'s version of marriage pressure, your own opinion, and the corresponding contrast and rhetorical moves.',
    ],
    task: 'Read the dialogue along with the tutor first, then perform it again with your own opinion and country-specific examples in place of the Mainland ones.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Write a 4-sentence opinion',
    goals: [
      'Write 4 sentences expressing your opinion on ONE topic from this lesson (相亲, 丁克, 彩礼, or 催婚) using 不过 / 但是 / 可是 at least once and 反正 once.',
      'Use the rhetorical 难道…吗? once to challenge a common assumption — this is the move that turns a flat opinion into a real argument.',
    ],
    task: 'Pick one topic, draft 4 sentences using the structural moves above, then read your finished piece aloud with correct tones and pacing.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: 'Chinese marriage culture: 30 years of change',
    goals: [
      'Understand how Chinese marriage culture has shifted in 30 years — from arranged-by-parents norms and early marriage to urban professionals delaying marriage past 30, with 婚姻法 (Marriage Law) reforms tracking each shift.',
      'Know the major modern flashpoints: 高彩礼 (the high-bride-price controversy, concentrated in rural areas), 单身税 (the "single-person tax" — a recurring internet myth that is NOT a real Chinese policy), and the romance commercialization of 双十一 (Singles Day, 11/11) vs 五二零 (520 ≈ "I love you" date, 5/20).',
      'Recognize the urban-rural divide in gender norms — first-tier cities (Beijing, Shanghai, Guangzhou) increasingly resemble global metros; rural areas hold older patterns more tightly. Both Chinas exist simultaneously.',
    ],
    task: 'Pick ONE of the three flashpoints (高彩礼, 双十一/520 commercialization, urban-rural divide) and describe how a similar pattern exists or differs in your home country.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: '相亲 for fresh graduates — coffee chat with a Tsinghua classmate',
    goals: [
      'Combine all four toolkits from this lesson (relationship vocab, gender-society vocab, contrast trio, 反正 + 难道…吗?) into one 6-turn conversation about the pros and cons of 相亲 for fresh university graduates.',
      'Hold a real position — argue either FOR (efficient, family-supported, less time pressure) or AGAINST (rushed, externally driven, mismatched expectations) — and switch register when your classmate pushes back.',
    ],
    task: 'Roleplay a coffee break at 清华大学: your classmate mentions her cousin is going to a 相亲 next weekend, and you discuss whether 相亲 makes sense for fresh graduates today. Aim for a 6-turn exchange in Mandarin.',
  },
];

const lesson = {
  title: 'Level 2 · Unit 4: 男人、女人与社会 — Men, Women & Society',
  category: 'daily-life',
  difficulty: 'intermediate',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'soft-contrast', label: 'Softening a disagreement', goal: 'Use 不过 to introduce a counterpoint without escalating — the warmest of the three contrast registers.' },
    { id: 'casual-conclusion', label: 'Casual concluding shrug', goal: 'Wrap up a small back-and-forth with 反正 + your own settled position; common in spoken Mandarin.' },
    { id: 'rhetorical-challenge', label: 'Challenging an assumption', goal: 'Use 难道…吗? to push back on a generalization without bluntly contradicting the speaker.' },
    { id: 'discussing-marriage', label: 'Discussing marriage norms', goal: 'Talk about 相亲 / 催婚 / 丁克 with cultural awareness, using neutral terms and registering your own stance.' },
  ],
  relatedPools: ['topic-people', 'topic-society'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '本课目标',
      'běn kè mùbiāo',
      'By the end of this lesson you can talk about relationships, marriage, and gender norms in Mandarin, register contrast with the right tone (chat vs essay vs pushback), wrap a casual conclusion with 反正, and challenge an assumption with the rhetorical 难道…吗? pattern.',
      'word',
      'Functional language: 谈恋爱 tán liànài (dating) · 单身 dānshēn (single) · 相亲 xiāngqīn (arranged blind date) · 催婚 cuīhūn (family pressure to marry) · 性别平等 xìngbié píngděng (gender equality)',
      'These five functional pillars are the spine of any modern Mandarin conversation about gender — once they are automatic, every later level can layer professional and academic vocabulary on top.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      '真实场景',
      'zhēnshí chǎngjǐng',
      'You are at a coffee break at 清华大学 with a Mainland classmate. She casually mentions her cousin is going to a 相亲 next weekend, and you need to react — share your view, disagree politely, and hold the conversation for 5 or 6 turns without slipping into outdated or offensive phrasing.',
      'word',
      '清华同学: "我表姐下周末去相亲，她爸妈一直催婚。你们国家也这样吗?"',
      'A common opener from a Mainland classmate: family news + cultural reference + immediate cross-cultural comparison question — the kind of casual probe you will hear often in everyday Mandarin.',
      [
        { target: '相亲 xiāngqīn', note: 'arranged blind date typically organized by family or matchmaker; still common in 二三线 cities and among 30+ urban singles' },
        { target: '催婚 cuīhūn', note: 'family pressure to marry, usually from parents; a very high-frequency word among urban 25–35 单身 Chinese' },
        { target: '你们国家也这样吗?', note: 'literal: "is your country also like this?"; standard cross-cultural probe in casual Mandarin' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '三种语气工具',
      'sān zhǒng yǔqì gōngjù',
      'This lesson hands you three new tone-of-voice tools. CONTRAST: 不过 (soft, chatty) / 但是 (balanced default) / 可是 (personal pushback). CONCLUSION: 反正 ("regardless, either way") for casual wrap-up. CHALLENGE: 难道…吗? to politely push back on an assumption. Combined, these make Mandarin sound natural rather than textbook.',
      'word',
      '我同意 — 不过/但是/可是 + your counterpoint → 反正 + your conclusion · or → 难道 + their assumption + 吗?',
      'Three tools, three different pragmatic moves; the trick is choosing the right one for the social temperature of the moment.',
      [
        { target: '不过 búguò', note: 'soft contrast; warmest of the three "buts" — safe for friendly disagreement' },
        { target: '反正 fǎnzhèng', note: 'casual conclusion; "regardless / either way" — wraps up a discussion you consider settled' },
        { target: '难道…吗?', note: 'rhetorical challenge; "is it really…?" — pushes back without bluntly contradicting' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '彩礼',
      'cǎilǐ (spoken: cáilǐ)',
      'Two third tones in a row trigger third-tone sandhi: 彩 (cǎi) rises to second tone in speech, while 礼 (lǐ) keeps the full third tone. Same sandhi rule as 你好 → ní hǎo; written tones unchanged.',
      'word',
      '彩礼 → spoken: cáilǐ /tsʰaɪ³⁵ li²¹⁴/',
      'A high-frequency word in any conversation about Chinese marriage culture; getting the sandhi wrong sounds robotic.',
      [
        { target: '彩 (written: cǎi, 3rd)', note: 'first syllable; would be full third tone in isolation' },
        { target: '彩 (spoken: cái, 2nd)', note: 'becomes rising because the next syllable is also third tone — third-tone sandhi rule' },
        { target: '礼 (lǐ, 3rd, unchanged)', note: 'second syllable; keeps the full third-tone dip-and-rise' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '剩女',
      'shèngnǚ',
      'Two pronunciation traps in one word. First: sh- is a retroflex initial — curl the tongue tip back, distinct from English "sh". Second: nǚ has the rounded front vowel ü (not the back vowel u of nu), so the lips round while the tongue stays forward. Slurring either makes the word unintelligible.',
      'word',
      '剩女 shèngnǚ /ʂəŋ⁵¹ ny²¹⁴/',
      'A controversial term meaning "leftover women" — discussed in this lesson historically and neutrally; the pronunciation matters because mis-saying it makes you sound like a different word.',
      [
        { target: 'sh- (retroflex)', note: 'tongue tip curled back to the roof of the mouth; sharper than English "sh"' },
        { target: '剩 (shèng, 4th)', note: 'sharp falling tone; "leftover, remaining"' },
        { target: '女 (nǚ, 3rd)', note: 'rounded front vowel ü, not back vowel u — write the umlaut even when typing' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '偏见',
      'piānjiàn',
      'Two consecutive palatal-front initials. First: p- aspirated bilabial with a strong puff of air (contrast with unaspirated b-). Second: j- (alveolo-palatal affricate) with a flat tongue against the upper teeth, followed by the medial -i- + -àn. The full word has a smooth glide from -ian to -jian; learners often drop the medial -i-.',
      'word',
      '偏见 piānjiàn — used in 性别偏见 (xìngbié piānjiàn, "gender bias")',
      'A high-register vocabulary word; you will hear it in any serious conversation about workplace fairness, hiring, or social commentary.',
      [
        { target: '偏 piān (1st)', note: 'high level tone; "biased, partial"' },
        { target: '见 jiàn (4th)', note: 'falling tone; "view, opinion" — together "biased view = bias"' },
        { target: 'medial -i- in pian/jian', note: 'easy to drop, but critical: pan-jan ≠ pian-jian' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '平等',
      'píngděng',
      'A second-tone-then-third-tone pair. First: píng (rising) — start at middle, glide up. Second: děng (3rd, low/dip) — drop and rise if isolated, often just low in connected speech. A flat-second slip on píng turns the word into something that sounds wrong; native ears notice immediately.',
      'word',
      '平等 píngděng — used in 性别平等 (xìngbié píngděng, "gender equality")',
      'Standard term for "equality" in any serious conversation; pairs with 性别 (gender), 民族 (ethnicity), 法律 (law) and many others.',
      [
        { target: '平 píng (2nd)', note: 'rising tone — "flat, level, peaceful"; common in compounds like 和平 hépíng "peace"' },
        { target: '等 děng (3rd)', note: 'third tone — "rank, equal"; here means "equal status"' },
        { target: '性别平等', note: 'compound: gender + equality; the standard Mainland Chinese term for "gender equality"' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '难道',
      'nándào',
      'Two consecutive falling-rising tones. First: nán (2nd, rising) — start mid, glide up. Second: dào (4th, sharp falling). Together the contour is up-then-sharp-down, the signature opening rhythm of any rhetorical 难道…吗? question. Drop the falling on dào and the question stops sounding rhetorical.',
      'word',
      '难道你不知道吗? nándào nǐ bù zhīdào ma? ("Don\'t you really know?")',
      'The 难道 contour is what tells the listener you are NOT asking a real question — it sets up the rhetorical move.',
      [
        { target: '难 nán (2nd)', note: 'rising tone; "difficult, hardly" — note this 难 is the same character as in 难题 "difficult problem"' },
        { target: '道 dào (4th)', note: 'sharp falling tone; "way, road" — in 难道 means "manner, sense"' },
        { target: 'opening rhythm', note: 'up-then-sharp-down sets up the rhetorical move; native ears recognize it instantly' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Dating, marriage, singlehood
    // ────────────────────────────────────────────────────────────────────
    createContentItem('男朋友', 'nán péngyou', 'Boyfriend in an exclusive dating relationship. Distinct from plain 朋友 (péngyou, friend) — the 男 marker explicitly signals romantic exclusivity. Common abbreviation: 男友 (nányǒu).', 'word', '我有男朋友了。', '"I have a boyfriend now" — the 了 marks a new state; common way to share relationship news.', null, [ACT.vocabularyRelationships]),
    createContentItem('女朋友', 'nǚ péngyou', 'Girlfriend in an exclusive dating relationship. Parallel to 男朋友; the 女 marker (with the rounded front vowel ü) signals exclusivity. Abbreviation: 女友 (nǚyǒu). Note: 朋友 alone could mean platonic friend, so the 男/女 prefix matters.', 'word', '我女朋友是中国人。', '"My girlfriend is Chinese" — possessive 的 is often dropped before close-relationship nouns; sounds warmer.', null, [ACT.vocabularyRelationships]),
    createContentItem('谈恋爱', 'tán liànài', 'To date / be in a romantic relationship (literally "to discuss love"). 谈 is the active verb; 恋爱 (liànài, "romance") is the object. Used for the ACT of dating someone — not the relationship status. Compare with 单身 below.', 'word', '他们谈恋爱三年了。', '"They have been dating for three years" — 了 marks the ongoing duration.', null, [ACT.vocabularyRelationships]),
    createContentItem('单身', 'dānshēn', 'Single — unmarried and not currently dating. State noun, not a verb; pairs with 是 (我是单身) or stands alone as a descriptor. In modern Mainland usage, 单身 is neutral and increasingly self-claimed proudly, especially in urban first-tier cities.', 'word', '我现在单身，享受自由。', '"I am single now, enjoying the freedom" — the 享受 (xiǎngshòu, "enjoy") frames singlehood positively, a common modern stance.', null, [ACT.vocabularyRelationships]),
    createContentItem('分手', 'fēnshǒu', 'To break up (literally "to separate hands"). Used for romantic breakups, not for ending a friendship. Past tense often appears with 了: 我们分手了 ("we broke up").', 'word', '他们上个月分手了。', '"They broke up last month" — neutral phrasing without judgment; 了 marks the completed action.', null, [ACT.vocabularyRelationships]),
    createContentItem('结婚', 'jié hūn', 'To get married. Compound of 结 (jié, "tie, knot") + 婚 (hūn, "marriage"). Used as a verb — 我们结婚了 ("we got married"). For "to be married" as a state, use 已婚 (yǐhūn) instead.', 'word', '他们去年结婚了。', '"They got married last year" — completed event marked with 了 + time phrase.', null, [ACT.vocabularyRelationships]),
    createContentItem('离婚', 'líhūn', 'To get divorced. Compound of 离 (lí, "leave") + 婚 (hūn, "marriage"). State form: 离异 (líyì, "divorced status"). Mainland China\'s divorce rate has risen sharply since 2003 reforms; the word is now common in news and personal conversation alike.', 'word', '她去年离婚了，现在过得很好。', '"She got divorced last year and is doing well now" — neutral, non-judgmental phrasing.', null, [ACT.vocabularyRelationships]),
    createContentItem('闪婚', 'shǎnhūn', 'Quick marriage / lightning marriage — marrying after a very short dating period (sometimes weeks). Compound of 闪 (shǎn, "flash") + 婚 (hūn, "marriage"). Coined in the 2000s; carries a slightly cautionary flavor in older usage, more neutral among younger speakers.', 'word', '他们认识三个月就闪婚了。', '"They got married after just three months — a real 闪婚" — illustrates the typical timeframe.', null, [ACT.vocabularyRelationships]),
    createContentItem('相亲', 'xiāngqīn', 'Arranged blind date organized by family, matchmaker, or workplace. Compound of 相 (xiāng, "mutually look") + 亲 (qīn, "close, relative"). Still extremely common — especially among 30+ urban singles whose parents see marriage as overdue. Not necessarily old-fashioned: modern 相亲 often runs via apps and is closer to a structured first date.', 'word', '我妈给我安排了一次相亲。', '"My mom set up a 相亲 for me" — standard phrasing for family-arranged blind dates.', null, [ACT.vocabularyRelationships]),
    createContentItem('催婚', 'cuīhūn', 'Family pressure to marry — typically from parents toward an unmarried adult child. Compound of 催 (cuī, "urge, hurry") + 婚 (hūn, "marriage"). Peaks during Chinese New Year visits home; a major theme of modern Mainland gender-and-family conversation.', 'word', '每次过年回家，我妈就催婚。', '"Every Chinese New Year my mom 催婚s me" — the New Year homecoming is the canonical setting for this word.', null, [ACT.vocabularyRelationships]),
    createContentItem('剩女', 'shèngnǚ', 'Literally "leftover woman" — a CONTROVERSIAL term for an unmarried woman past 27 or so, popularized in 2007 by the All-China Women\'s Federation. Widely criticized today as sexist and stigmatizing; many urban Chinese women now reject the label outright. Discuss it historically and analytically, never as a casual descriptor.', 'word', '"剩女"这个词很有争议。', '"The term \'剩女\' is very controversial" — the safest way to bring up the term is to flag the controversy directly.', null, [ACT.vocabularyRelationships]),
    createContentItem('剩男', 'shèngnán', 'Literally "leftover man" — the parallel term to 剩女, applied to unmarried men, often in rural areas where the gender ratio has skewed male. Less stigmatizing than 剩女 in common usage but still loaded; the rural concentration links it to 高彩礼 (high bride price) discussions. Use carefully and analytically.', 'word', '中国农村存在"剩男"问题。', '"There is a \'剩男\' issue in rural China" — academic / analytical framing, not casual labeling.', null, [ACT.vocabularyRelationships]),
    createContentItem('对象', 'duìxiàng', 'A romantic partner or partner candidate. Older-generation and matchmaker register — your parents will ask 有对象吗? ("Do you have a partner?"). Younger urban speakers prefer 男朋友/女朋友. Knowing 对象 lets you understand parents and family elders even if you do not use it yourself.', 'word', '阿姨问我有对象了没有。', '"Auntie asked me whether I have a 对象 yet" — the auntie register; younger speaker would translate this to "boyfriend".', null, [ACT.vocabularyRelationships]),
    createContentItem('已婚 / 未婚', 'yǐhūn / wèihūn', 'Married / unmarried — formal STATE descriptors used on forms, official documents, and in news contexts. 已婚 (already married); 未婚 (not yet married, neutral). Casual speech prefers 结婚了 / 单身 instead.', 'word', '请填写婚姻状况: 已婚 / 未婚 / 离异', '"Please fill in marital status: married / unmarried / divorced" — typical official form wording.', [
      { target: '已婚 yǐhūn', note: '"already married" — formal state' },
      { target: '未婚 wèihūn', note: '"not yet married" — neutral, formal' },
      { target: '离异 líyì', note: '"divorced status" — formal counterpart to the verb 离婚' },
    ], [ACT.vocabularyRelationships]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: Gender, equality, modern phenomena
    // ────────────────────────────────────────────────────────────────────
    createContentItem('性别', 'xìngbié', 'Gender — the neutral, official term used on forms, in news, and in academic discussion. Distinct from 性 (xìng, "sex / sexuality") which can be loaded; 性别 is the safe descriptor when discussing identity, equality, or demographics.', 'word', '性别不是判断能力的标准。', '"Gender is not a standard for judging ability" — a typical modern Mainland talking point.', null, [ACT.vocabularyGenderSociety]),
    createContentItem('平等', 'píngděng', 'Equality — pairs with 性别 to form 性别平等 (gender equality), with 民族 for ethnic equality, with 法律前人人 for "equality before the law". Standard formal vocabulary; appropriate in any serious conversation or essay.', 'word', '性别平等是基本权利。', '"Gender equality is a basic right" — formal-register sentence suitable for a presentation.', null, [ACT.vocabularyGenderSociety]),
    createContentItem('偏见', 'piānjiàn', 'Bias / prejudice — a negative slant in opinion or judgment, typically pre-formed without evidence. Compound of 偏 (piān, "slanted") + 见 (jiàn, "view"). Used for any kind of bias: 性别偏见 (gender), 种族偏见 (racial), 年龄偏见 (age).', 'word', '我对他没有偏见。', '"I have no bias against him" — the standard way to disclaim prejudice.', null, [ACT.vocabularyGenderSociety]),
    createContentItem('刻板印象', 'kèbǎn yìnxiàng', 'Stereotype — a fixed, simplified mental image of a group. Literal compound: 刻板 (kèbǎn, "rigid / stencil-like") + 印象 (yìnxiàng, "impression"). Heavier and more pejorative than 偏见; calling out a 刻板印象 typically means "you are oversimplifying".', 'word', '"男生学理科好"是一种刻板印象。', '"\'Boys are better at science\' is a stereotype" — typical example used in modern Chinese gender-discourse.', null, [ACT.vocabularyGenderSociety]),
    createContentItem('彩礼', 'cǎilǐ (spoken: cáilǐ)', 'Bride price — money and gifts given by the groom\'s family to the bride\'s family at engagement. A traditional custom that has become controversial because some regions now demand 高彩礼 (high bride price) of 100,000+ RMB. Concentrated more in rural and northern Mainland; less prominent in first-tier cities.', 'word', '现在彩礼太高了，年轻人结不起婚。', '"Bride prices are too high now; young people cannot afford to marry" — common complaint, often heard on Chinese social media.', null, [ACT.vocabularyGenderSociety]),
    createContentItem('丁克', 'dīngkè', 'DINK (Double Income No Kids) — a couple who choose not to have children. Phonetic borrowing from English; written as 丁克 or 丁克族 (dīngkèzú, "the DINK tribe"). A growing urban Chinese lifestyle, especially among 80后 and 90后 (people born in the 1980s and 1990s) couples in Beijing, Shanghai, Shenzhen.', 'word', '我们是丁克，不打算要孩子。', '"We are DINK; we do not plan to have kids" — standard self-description.', null, [ACT.vocabularyGenderSociety]),
    createContentItem('单身经济', 'dānshēn jīngjì', 'The single-person economy — a real macroeconomic trend in Mainland China referring to products, services, and housing aimed at solo consumers (single-serving meals, small apartments, solo-friendly travel, premium pet care). The term is mainstream media vocabulary; you will see it in 经济学人 and 人民日报 alike.', 'word', '"单身经济"在大城市发展很快。', '"The single-person economy is growing fast in big cities" — typical economics-section sentence.', null, [ACT.vocabularyGenderSociety]),
    createContentItem('30+岁未婚', 'sān shí jiā suì wèihūn', 'Over-30 and unmarried — descriptor commonly used in modern Mainland conversation about urban professional singles. Reflects the demographic shift: median age at first marriage in Shanghai is now ~30 for both men and women, vs ~22 a generation ago. Neutral phrasing; replaces older stigmatizing terms.', 'word', '他三十多岁了还没结婚。', '"He is over 30 and still unmarried" — neutral observation without 剩男 baggage.', null, [ACT.vocabularyGenderSociety]),
    createContentItem('婚姻法', 'hūnyīnfǎ', 'Marriage Law — the body of Chinese law governing marriage, divorce, property, and child custody. Major reform waves: 1950 (mandated free choice and outlawed concubinage), 1980 (raised marriage age, added divorce-on-grounds), 2001 (clarified property), 2020-2021 (added the 30-day "divorce cooling-off period" — controversial).', 'word', '2021年的婚姻法增加了离婚冷静期。', '"The 2021 Marriage Law added the divorce cooling-off period" — a contested modern reform.', null, [ACT.vocabularyGenderSociety]),
    createContentItem('单身税', 'dānshēn shuì', 'A widely circulated internet MYTH about a "single-person tax" supposedly imposed on unmarried adults in China. There is no such formal tax in mainland law — the myth grows out of certain tax-deduction benefits available to married couples and parents. Knowing the term lets you participate in the debate AND correct the misinformation.', 'word', '网上有"单身税"的传言，其实并不存在。', '"There are online rumors about a \'single-person tax,\' but it does not actually exist" — the clarifying line you can deliver in a debate.', null, [ACT.vocabularyGenderSociety]),
    createContentItem('高彩礼', 'gāo cǎilǐ (spoken: gāo cáilǐ)', 'The high bride price phenomenon — a controversial rural-skewed trend where bride-price demands of 100,000+ RMB price young men out of marriage. Linked to the rural male-skewed gender ratio (a legacy of one-child-era son preference). Central government has flagged it as a target for reform since the late 2010s.', 'word', '一些地方"高彩礼"问题很严重。', '"In some regions the high-bride-price issue is severe" — analytical framing used in news coverage.', null, [ACT.vocabularyGenderSociety]),
    createContentItem('双十一 vs 五二零', 'shuāngshíyī vs wǔ\'èrlíng', 'Two commercial romance days. 双十一 (11/11, Singles Day) started as a tongue-in-cheek "single people\'s day" at a Nanjing university in the 1990s; Alibaba turned it into the world\'s largest shopping festival in 2009. 五二零 (520, May 20) is pronounced wǔ èr líng, which sounds close to wǒ ài nǐ ("I love you") — now the canonical date to confess, marry, or buy your partner a gift.', 'word', '双十一是单身狂欢，五二零是表白日。', '"Singles Day is a single-people carnival; 520 is the day to confess love" — the cultural contrast in one line.', null, [ACT.vocabularyGenderSociety]),
    createContentItem('城乡差异', 'chéngxiāng chāyì', 'Urban-rural divide — a frequent framing in modern Chinese social discussion. First-tier cities (Beijing, Shanghai, Guangzhou, Shenzhen) increasingly resemble global metros in marriage age, divorce rate, and gender norms; rural areas hold older patterns. Acknowledging the divide is more accurate than treating "Chinese" as monolithic.', 'word', '在婚姻问题上，城乡差异很明显。', '"On marriage issues, the urban-rural divide is obvious" — analytical observation common in social commentary.', null, [ACT.vocabularyGenderSociety]),
    createContentItem('家庭压力', 'jiātíng yālì', 'Family pressure — a broader term than 催婚, covering pressure to marry, have kids, choose a stable job, buy a house, or take care of parents. High in Chinese family culture; especially salient for adult children visiting home for 春节 (Spring Festival).', 'word', '春节回家，家庭压力特别大。', '"Family pressure is especially heavy when you go home for Spring Festival" — typical lived experience for young urban professionals.', null, [ACT.vocabularyGenderSociety]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar I: 不过 / 但是 / 可是
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '不过',
      'búguò — soft contrast',
      'The softest of the three "but"s. Used to introduce a chatty counterpoint without sounding argumentative; warm enough to use with friends, classmates, and anyone you don\'t want to push back hard on. Sits at the start of the contrast clause.',
      'sentence',
      '我也想去相亲，不过我觉得没必要那么急。',
      '"I also want to try 相亲, but I don\'t think there\'s a need to rush" — friendly disagreement that doesn\'t close the conversation.',
      [
        { target: '不过 búguò', note: 'soft contrast; "though, well, but"; appropriate for casual chat' },
        { target: 'Position', note: 'sentence-initial in the second clause; nothing else moves' },
        { target: 'Register', note: 'WARMEST of the three contrast markers; never abrasive' },
      ],
      [ACT.grammarContrast],
    ),
    createContentItem(
      '但是',
      'dànshì — balanced default',
      'The neutral default "but" — the form you would use in writing, presentations, news articles, and any context where you would write rather than chat. Appropriate everywhere but slightly stiff in pure conversation; overusing 但是 in spoken Mandarin makes you sound like a textbook.',
      'sentence',
      '彩礼是传统文化的一部分，但是现在金额太高了。',
      '"Bride price is part of traditional culture, but the amounts are too high now" — balanced-register sentence suitable for an essay.',
      [
        { target: '但是 dànshì', note: 'balanced "but, however"; the textbook default' },
        { target: 'Position', note: 'sentence-initial in the second clause' },
        { target: 'Register', note: 'NEUTRAL — fine in writing and formal contexts, slightly stiff in pure chat' },
      ],
      [ACT.grammarContrast],
    ),
    createContentItem(
      '可是',
      'kěshì — personal pushback',
      'Slightly stronger and more emotional than 但是; used when you are mildly exasperated, insistent, or pushing back personally. Common in spoken Mandarin among peers. Choosing 可是 over 但是 signals a real disagreement, not just a contrast of facts.',
      'sentence',
      '我妈一直催婚，可是我才二十五岁啊!',
      '"My mom keeps pressuring me to marry, but I\'m only 25!" — emotional pushback; the 啊 sentence-final softens it but the 可是 frames real disagreement.',
      [
        { target: '可是 kěshì', note: 'personal pushback "but really, but still"; mildly emotional' },
        { target: 'Position', note: 'sentence-initial in the second clause' },
        { target: 'Register', note: 'STRONGEST of the three in personal contexts; reserved for real disagreement' },
      ],
      [ACT.grammarContrast],
    ),
    createContentItem(
      '三种对比对照',
      'sān zhǒng duìbǐ duìzhào',
      'Side-by-side: same sentence in three registers. Notice that grammatical structure is identical — only the conjunction changes — but the social temperature shifts dramatically.',
      'sentence',
      'CASUAL: 我想结婚，不过现在还不急。\nBALANCED: 我想结婚，但是现在还不急。\nPUSHBACK: 我想结婚，可是现在还不急!',
      'All three mean "I want to marry, but I am not in a rush yet" — but the third sounds like you are defending yourself, the first like you are sharing a thought.',
      [
        { target: 'CASUAL: 不过', note: 'shared thought; warm and chatty' },
        { target: 'BALANCED: 但是', note: 'neutral statement; fits an essay' },
        { target: 'PUSHBACK: 可是', note: 'mild defensiveness; fits a real disagreement' },
      ],
      [ACT.grammarContrast],
    ),
    createContentItem(
      '不过 vs 但是 — common error',
      'búguò vs dànshì error',
      'COMMON LEARNER ERROR: defaulting to 但是 in every spoken conversation makes Mandarin sound stiff and textbook-like. Native speakers reach for 不过 in friendly chat. Rule of thumb: if you are at a coffee table with peers, use 不过; if you are in a meeting or writing, use 但是.',
      'sentence',
      'STIFF: (with friends) "我同意，但是…" (sounds like a presentation)\nNATURAL: (with friends) "我同意，不过…" (sounds like a chat)',
      'Tune the register to the social temperature; this single switch instantly upgrades your conversational naturalness.',
      [
        { target: '不过 in chat', note: 'natural and warm' },
        { target: '但是 in chat', note: 'sounds like reading from a textbook' },
        { target: '但是 in writing', note: 'appropriate and expected' },
      ],
      [ACT.grammarContrast],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar II: 反正
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '反正',
      'fǎnzhèng — casual conclusion',
      'A spoken-Mandarin adverb meaning "regardless, either way, anyway". Used to introduce a conclusion the speaker considers settled — often after a previous justification, often slightly impatient or resigned. Sits at the start of the conclusion clause; rare in formal writing, very common in casual speech.',
      'sentence',
      '反正我不想去相亲。',
      '"Either way / regardless, I don\'t want to go on a 相亲" — a settled position, said with finality.',
      [
        { target: '反正 fǎnzhèng', note: 'literally "the opposite / the same" — used adverbially as "regardless, either way, anyway"' },
        { target: 'Position', note: 'clause-initial, in the conclusion clause' },
        { target: 'Register', note: 'casual spoken Mandarin; rare in formal writing' },
      ],
      [ACT.grammarFanzheng],
    ),
    createContentItem(
      '反正 with prior justification',
      'fǎnzhèng with justification',
      'The most natural use of 反正 follows a justification — either explicit (in the previous clause) or contextually understood. The two parts: REASON (often introduced or implied) + 反正 + CONCLUSION. Without the prior justification, 反正 sounds disconnected.',
      'sentence',
      '我现在工作很忙，反正没时间谈恋爱。',
      '"I\'m really busy with work; either way / anyway, I don\'t have time for dating" — justification first, then settled conclusion.',
      [
        { target: 'REASON (clause 1)', note: 'establishes context or justification' },
        { target: '反正 + CONCLUSION', note: 'declares the settled position based on or regardless of the reason' },
        { target: 'tone', note: 'often resigned, impatient, or matter-of-fact' },
      ],
      [ACT.grammarFanzheng],
    ),
    createContentItem(
      '反正 vs 不管 vs 总之',
      'fǎnzhèng vs bùguǎn vs zǒngzhī',
      'Three "wrap-up" adverbs that look similar but feel different. 反正 = casual shrug ("either way"). 不管 = takes a complement ("regardless of WHAT"). 总之 = formal summary ("in summary, to wrap up"). Choose by register and structure, not by translation.',
      'sentence',
      '反正我不去 (casual conclusion)\n不管你说什么，我都不去 (regardless of what you say)\n总之，我不去 (in summary, I am not going)',
      'Same outcome — three different rhetorical moves.',
      [
        { target: '反正 fǎnzhèng', note: 'casual shrug; spoken Mandarin' },
        { target: '不管 bùguǎn', note: 'requires a complement: 不管 + question/condition + ALL clause' },
        { target: '总之 zǒngzhī', note: 'formal summary; written or spoken-formal' },
      ],
      [ACT.grammarFanzheng],
    ),
    createContentItem(
      '反正 — common error',
      'fǎnzhèng error',
      'COMMON LEARNER ERROR: using 反正 to mean "in fact" or "actually" — it does NOT. 反正 always introduces a conclusion the speaker considers settled, not a factual correction. For "actually / in fact" use 其实 (qíshí) instead.',
      'sentence',
      'WRONG: 反正彩礼很高 ("anyway bride prices are high" — but said as a fact? confusing)\nCORRECT: 其实彩礼很高 ("actually bride prices are high" — a factual statement)\nCORRECT: 反正我不会接受高彩礼 ("regardless, I will not accept a high bride price" — a settled conclusion)',
      'The 反正 / 其实 distinction is one of the most common mid-intermediate mistakes; choosing wrong derails the meaning.',
      null,
      [ACT.grammarFanzheng],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar III: 难道…吗?
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '难道…吗?',
      'nándào…ma? — rhetorical "is it really…?"',
      'The rhetorical question pattern. 难道 marks the sentence as rhetorical (expecting "no, of course not") and 吗 closes it as a question. Used to challenge an assumption without bluntly contradicting — much politer than a flat "you\'re wrong".',
      'sentence',
      '难道女人三十岁还不结婚就是剩女吗?',
      '"Is a woman who is not married by 30 really a 剩女?" — challenging the stigmatizing label without flatly attacking it.',
      [
        { target: '难道 nándào', note: 'rhetorical question marker; signals "really? as if to say…"' },
        { target: 'subject + verb phrase', note: 'main clause body, like any normal sentence' },
        { target: '吗?', note: 'question particle at the end; closes the rhetorical question' },
      ],
      [ACT.grammarNandao],
    ),
    createContentItem(
      '难道 placement',
      'nándào placement rules',
      'Placement: 难道 can sit at the very start of the sentence or right after the subject. Either is grammatical; sentence-initial slightly emphasizes the challenge, subject-second slightly softens it.',
      'sentence',
      '难道你不知道吗? (emphatic) vs 你难道不知道吗? (softer challenge)',
      'Same meaning, slightly different emphasis; choose by how strong you want the challenge to feel.',
      [
        { target: 'sentence-initial', note: 'stronger challenge; foregrounds the rhetorical move' },
        { target: 'after subject', note: 'softer challenge; subject takes the lead' },
        { target: '吗 always at end', note: 'the closing question particle is non-negotiable' },
      ],
      [ACT.grammarNandao],
    ),
    createContentItem(
      '难道…吗? vs flat question',
      'rhetorical vs real question',
      'CRITICAL DISTINCTION: a real yes/no question expects a real answer; a rhetorical 难道…吗? expects "no, obviously not". Both end in 吗?; only the 难道 marker tells the listener which kind of question this is.',
      'sentence',
      'REAL: 你是学生吗? ("Are you a student?" — asking for an answer)\nRHETORICAL: 你难道是学生吗? ("Are you really a student?" — challenging an assumption you have heard, expecting the answer "of course not / well…")',
      'In speech the rhetorical tone (longer pause on 难道, drop on 吗) reinforces the distinction; in writing, only the 难道 tells you.',
      null,
      [ACT.grammarNandao],
    ),
    createContentItem(
      '难道 with negative challenge',
      'nándào with negative',
      'The most common rhetorical move is 难道 + NEGATIVE statement + 吗? — challenging a negative assumption to imply the positive. Used to push back politely on a generalization.',
      'sentence',
      '难道女人就不能事业有成吗? ("Is it really impossible for women to have a successful career?")',
      'The implied answer is "of course women can"; the speaker is challenging the assumption that they can\'t. Common move in modern gender-equality discourse.',
      [
        { target: '难道 + negative', note: 'challenges a negative assumption to imply the positive' },
        { target: 'expected answer', note: '"no, of course not / yes, of course they can" — the rhetorical resolution' },
      ],
      [ACT.grammarNandao],
    ),
    createContentItem(
      '组合: 难道 + 反正 + 不过',
      'combination move',
      'A high-level move: in one short exchange, use 难道…吗? to challenge an assumption, then 不过 to soften the contrast, then 反正 to settle your position. The combination sounds fluent and confident without sounding aggressive.',
      'sentence',
      '难道结婚就是人生的目标吗? 不过我也理解父母的想法。反正我会按自己的节奏来。',
      '"Is marriage really the goal of life? Well, I do understand my parents\' view. Either way, I\'ll go at my own pace." — three moves in three sentences.',
      [
        { target: '难道…吗?', note: 'opens the rhetorical challenge' },
        { target: '不过', note: 'softens with empathy for the other side' },
        { target: '反正', note: 'closes with the settled personal position' },
      ],
      [ACT.grammarNandao],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '相亲文章',
      'xiāngqīn wénzhāng',
      'A 120-character opinion piece on 相亲 (arranged blind dates), in the register of a Mainland Chinese lifestyle column. Read it aloud with correct tones, sandhi, and natural pacing. Notice the contrast markers (不过) and rhetorical move (难道…吗?) the author uses.',
      'sentence',
      '现在年轻人越来越晚结婚，很多人到了三十岁还是单身。父母着急，就开始安排相亲。相亲不是坏事，不过也不一定适合所有人。难道一定要通过相亲才能找到合适的人吗? 反正我觉得，每个人都应该按自己的节奏来生活。',
      'Translation: "Young people today marry later and later; many are still single at 30. Parents get anxious and start arranging 相亲. 相亲 is not a bad thing — but it does not necessarily suit everyone. Is it really only through 相亲 that one can find the right person? Either way, I think everyone should live at their own pace."',
      [
        { target: '越来越晚 yuè lái yuè wǎn', note: '"later and later"; the comparative-intensifying pattern' },
        { target: '相亲不是坏事，不过…', note: 'soft contrast with 不过 — concedes the point before pushing back' },
        { target: '难道…吗?', note: 'rhetorical challenge to the assumption that 相亲 is the only path' },
        { target: '反正…按自己的节奏来', note: 'casual conclusion: "either way, at one\'s own pace"' },
        { target: '合适的人 héshì de rén', note: '"the right person"; literally "a suitable person" — the standard romantic vocabulary' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '理解问题',
      'lǐjiě wèntí',
      'Four comprehension questions matching the reading. Answer each in a short sentence; full sentences are not required for natural Mandarin.',
      'sentence',
      'Q1: 为什么父母会安排相亲? Q2: 作者对相亲是什么态度? Q3: 作者用了什么词反问读者? Q4: 作者最后给出了什么建议?',
      'Two factual recall questions, one stance question, one structural question (catching the 难道…吗?), one final-takeaway question.',
      [
        { target: 'A1: 因为他们觉得孩子结婚太晚。', note: '"Because they think their child is marrying too late" — direct from the text' },
        { target: 'A2: 不反对，但是觉得不适合所有人。', note: '"Not against it, but feels it does not suit everyone" — uses 不过/但是 to capture the nuance' },
        { target: 'A3: "难道…吗?" 反问。', note: '"The rhetorical 难道…吗? pattern" — structural reading' },
        { target: 'A4: 按自己的节奏生活。', note: '"Live at one\'s own pace" — the takeaway' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Listening & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '催婚 — 两个清华同学聊天',
      'cuīhūn — liǎng gè Qīnghuá tóngxué liáotiān',
      'A natural 6-turn conversation between two 清华大学 classmates about family pressure to marry (催婚). Notice the register markers each speaker uses: 不过 / 可是 / 反正 / 难道…吗?. Both speakers are in their mid-twenties, mid-master\'s degree, and have parents back home pushing them to marry.',
      'conversation',
      'A: 我妈昨天又打电话来，又催婚。\nB: 哎，我妈也一样。每次回家都问"有对象了吗"。\nA: 可是我才二十五岁啊! 难道二十五岁就要急着结婚吗?\nB: 我也这么想。不过我们父母那一代，二十二三岁就结婚了。\nA: 那是以前。现在大家都先工作几年，再考虑结婚。\nB: 反正我先把博士读完再说。结婚这事，急不来。',
      'A natural exchange between peers using casual register; the two speakers agree on the substance but show three different rhetorical moves along the way.',
      [
        { target: 'A: 又打电话来，又催婚', note: 'reduplication of 又…又…: "again did X and again did Y"; conveys mild exasperation' },
        { target: 'B: 哎 āi', note: 'sympathetic sigh interjection; signals shared frustration' },
        { target: 'A: 可是…啊! 难道…吗?', note: 'personal pushback (可是) followed by rhetorical challenge (难道…吗?) — strong move' },
        { target: 'B: 不过我们父母那一代…', note: 'soft contrast (不过) acknowledging the parents\' perspective' },
        { target: 'B: 反正…急不来', note: 'casual conclusion (反正) + the idiom 急不来 ("can\'t be rushed")' },
        { target: 'A: 现在大家都先…再…', note: '"先 X 再 Y" sequencing — "first X, then Y"; common modern timeline phrasing' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      '听后练习 — 你的看法',
      'tīng hòu liànxí — nǐ de kànfǎ',
      'After-listening practice. Take the same dialogue and adapt it to your own country and experience: do parents in your country pressure adult children to marry? When? Replace 清华 with your university, 二十五岁 with your real age, and the 父母那一代 with your country\'s generational specifics.',
      'sentence',
      '我妈也催婚。不过在我的国家，三十岁结婚很正常。难道结婚一定要在二十几岁吗? 反正我觉得每个人的时间表不同。',
      'A four-sentence model using all four lesson tools: 不过 (soft contrast), 难道…吗? (rhetorical challenge), 反正 (casual conclusion).',
      [
        { target: '我妈也催婚', note: 'opens with a parallel statement to the dialogue' },
        { target: '不过…很正常', note: 'soft contrast presenting your country\'s norm' },
        { target: '难道…吗?', note: 'rhetorical challenge to the assumed timeline' },
        { target: '反正…时间表不同', note: 'closes with the settled position: "everyone\'s timeline is different"' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '写作模板',
      'xiězuò múbǎn',
      'A reusable 4-sentence template for any opinion piece on a gender-and-society topic. Fill in the bracketed slots with your topic and stance — the structural moves (不过, 反正, 难道…吗?) carry the rest.',
      'sentence',
      '我觉得 [topic 1] 是 [adjective / statement]。不过 [counterpoint or nuance]。难道 [common assumption] 吗? 反正 [your settled position]。',
      'Four sentences cover the core: opening stance + softened nuance + rhetorical challenge + casual conclusion. The minimum complete opinion piece using this lesson\'s grammar.',
      [
        { target: 'Sentence 1: opening stance', note: 'state your main view clearly using a topic-comment structure' },
        { target: 'Sentence 2: 不过 + nuance', note: 'soften with a concession or counterpoint — avoids sounding dogmatic' },
        { target: 'Sentence 3: 难道…吗?', note: 'rhetorical challenge to a common assumption you disagree with' },
        { target: 'Sentence 4: 反正 + conclusion', note: 'casual settled position — your personal takeaway' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '写作练习 — 我对 [topic] 的看法',
      'xiězuò liànxí — wǒ duì [topic] de kànfǎ',
      'Write your own 4-sentence opinion on ONE topic from this lesson: 相亲, 丁克, 彩礼, or 催婚. Use 不过 / 但是 / 可是 at least once and 反正 once. Use 难道…吗? once to challenge a common assumption.',
      'sentence',
      '示例 (topic: 丁克): 我觉得选择丁克是个人的自由。不过父母可能不理解。难道每个人都要生孩子吗? 反正我觉得有没有孩子都可以过好生活。',
      'Translation: "I think choosing DINK is a personal freedom. But parents may not understand. Does everyone really have to have children? Either way, I think one can live a good life with or without kids."',
      null,
      [ACT.writing],
    ),
    createContentItem(
      '写作练习 — 三个示例',
      'xiězuò liànxí — sān gè shìlì',
      'Three additional 4-sentence examples covering different topics, all using the same template. Use them as models — then write your own on a fourth topic.',
      'sentence',
      'TOPIC: 相亲 — 相亲在中国还是很常见的。不过年轻人不一定喜欢。难道一定要靠相亲才能找到对象吗? 反正我自己想自由恋爱。\nTOPIC: 彩礼 — 彩礼是传统文化。但是金额高得让人结不起婚。难道彩礼是结婚的必要条件吗? 反正我觉得感情比钱重要。\nTOPIC: 催婚 — 父母催婚是因为关心。可是这种关心常常变成压力。难道二十几岁就一定要结婚吗? 反正我会按自己的节奏来。',
      'Three different topics, three different contrast registers (不过, 但是, 可是), all closing with 反正 — the template scales across topics.',
      [
        { target: 'TOPIC: 相亲 + 不过', note: 'soft contrast — appropriate for chatty register' },
        { target: 'TOPIC: 彩礼 + 但是', note: 'balanced contrast — appropriate for written analysis' },
        { target: 'TOPIC: 催婚 + 可是', note: 'personal pushback — appropriate when describing one\'s own family pressure' },
      ],
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '三十年的变化',
      'sānshí nián de biànhuà',
      '30 years of change in Chinese marriage culture. In the 1990s, the median age at first marriage in urban China was ~22–24; today in Shanghai it is ~30. Causes: rising women\'s education and labor-force participation, urbanization, housing costs, and the legalization-and-normalization of divorce. The shift is fastest in first-tier cities and slowest in rural areas.',
      'sentence',
      '三十年前: 二十二三岁结婚是常态。\n现在 (一线城市): 三十岁结婚很正常。',
      'Both Chinas exist simultaneously — first-tier urban norms differ sharply from rural norms, and a single conversation can span both worlds depending on who is at the table.',
      [
        { target: '1990s urban: ~22–24', note: 'median age at first marriage in cities' },
        { target: 'today urban: ~28–30', note: 'first-tier cities (Beijing, Shanghai, Guangzhou, Shenzhen)' },
        { target: 'rural pattern', note: 'still earlier, often 22–26; older norms hold more tightly' },
        { target: 'drivers', note: 'education, jobs, housing costs, divorce normalization' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '婚姻法的演变',
      'hūnyīnfǎ de yǎnbiàn',
      'The Mainland Chinese Marriage Law (婚姻法) has had four major reform waves. 1950: mandated free choice in marriage and outlawed concubinage. 1980: raised legal marriage ages (22 men / 20 women) and added divorce-on-grounds. 2001: clarified property division. 2020-2021 (Civil Code): added the controversial 30-day "divorce cooling-off period" (离婚冷静期), criticized by many for adding friction especially in cases of domestic abuse.',
      'sentence',
      '1950 / 1980 / 2001 / 2021 — four reform waves of the 婚姻法.',
      'Knowing the dates lets you place any specific reform (like the cooling-off period) in its historical context — modern Chinese gender discussion often references these waves.',
      [
        { target: '1950', note: 'first PRC Marriage Law; free choice, outlawed concubinage' },
        { target: '1980', note: 'raised marriage ages, added divorce grounds' },
        { target: '2001', note: 'clarified property division' },
        { target: '2020-2021 (民法典)', note: 'Civil Code; added the 30-day 离婚冷静期 cooling-off period' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '"单身税"传言',
      'dānshēn shuì chuányán',
      'The "single-person tax" myth: a recurring internet rumor that unmarried adults in China pay an extra tax. THIS IS NOT TRUE — there is no formal single-person tax in mainland Chinese law. The myth grows out of real tax-deduction benefits available to married couples and parents (for children\'s education, elder care), which can make a single person\'s effective tax rate slightly higher relative to a married parent\'s. Useful to know if the topic comes up — you can correct the misinformation.',
      'sentence',
      '网友常说"单身税"，其实并不存在。',
      '"Netizens often talk about a \'single-person tax\' — but it does not actually exist" — the correct framing to use in a conversation.',
      [
        { target: 'myth claim', note: '"unmarried adults pay an extra tax" — false' },
        { target: 'real basis', note: 'married couples and parents have access to certain tax deductions singles do not' },
        { target: 'how to correct', note: '"单身税不存在，但是已婚有税收优惠" — there\'s no single tax, but married people get tax breaks' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '高彩礼争议',
      'gāo cǎilǐ zhēngyì (spoken: gāo cáilǐ zhēngyì)',
      'The high-bride-price controversy. In some rural areas (especially in 河南, 山东, 甘肃 — but the picture varies sharply by village), bride prices have climbed to 100,000+ RMB plus a house and car. Causes: the rural male-skewed sex ratio (legacy of one-child-era son preference) and shrinking marriageable rural female population (many move to cities). Central government has flagged it as a target for reform since 2019; first-tier cities largely do not see this pattern.',
      'sentence',
      '在一些农村地区，"高彩礼"让年轻人结不起婚。',
      '"In some rural areas, the high-bride-price phenomenon prices young people out of marriage" — a typical news-framing sentence.',
      [
        { target: 'where it concentrates', note: 'rural Mainland China, especially northern and central provinces' },
        { target: 'driver', note: 'rural male-skewed gender ratio + female outmigration to cities' },
        { target: 'urban contrast', note: 'first-tier cities largely do not see the high-彩礼 pattern; some urban couples skip 彩礼 entirely' },
        { target: 'reform direction', note: 'central government has called for cooling 高彩礼 since 2019, with mixed local results' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '双十一 vs 五二零',
      'shuāngshíyī vs wǔ\'èrlíng',
      'Two contrasting commercial romance days in modern Mainland China. 双十一 (11/11, Singles Day) began as a tongue-in-cheek "single people\'s day" at Nanjing University in the 1990s — four 1s like four single people. Alibaba turned it into the world\'s largest shopping festival in 2009. 五二零 (520, May 20) is pronounced wǔ èr líng, sounding close to wǒ ài nǐ ("I love you"); it has become the canonical day to confess love, propose, marry, or buy your partner a gift. The two days commercialize opposite ends of relationship status — and both are now major retail events.',
      'sentence',
      '双十一 (11月11日) — single people\'s shopping festival\n五二零 (5月20日) — couples\' romance day',
      'Both are commercial creations — but they reflect real social shifts: Mainland China now has both a thriving 单身经济 AND a thriving romance industry.',
      [
        { target: '双十一 11/11', note: 'started 1990s at Nanjing University; Alibaba scaled it 2009; now world\'s largest shopping day' },
        { target: '五二零 5/20', note: '520 ≈ wǒ ài nǐ ("I love you"); confess, propose, gift' },
        { target: 'both commercialize romance status', note: 'singlehood and coupledom both now have their own retail moment' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task: Coffee chat about 相亲
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '任务: 清华咖啡馆 — 相亲讨论',
      'rènwù: Qīnghuá kāfēi guǎn — xiāngqīn tǎolùn',
      'Roleplay a coffee break at 清华大学 with the tutor playing a Mainland classmate. Your classmate mentions her cousin is going to a 相亲 next weekend; you discuss whether 相亲 makes sense for fresh university graduates today. Use every skill from this lesson: relationship vocab, gender-society vocab, contrast trio (不过 / 但是 / 可是), 反正, 难道…吗?.',
      'conversation',
      '[Coffee break, 清华大学 cafeteria]\n同学: 我表姐下周末去相亲，她爸妈一直催婚。\n你: [react + share your view, use 不过 or 但是]\n同学: 那你觉得相亲适合刚毕业的年轻人吗?\n你: [argue your stance, use 难道…吗?]\n同学: 可是相亲也有它的好处啊! 父母帮忙省时间。\n你: [acknowledge + counter, use 反正 + 可是]\n同学: 嗯，每个人想法不一样，对吧?\n你: [closing, use 反正]',
      'Six turns of fluent exchange covering opening reaction, stance, rhetorical challenge, acknowledgment, and closing — the tutor will prompt and adapt to whatever you say.',
      [
        { target: 'opening reaction', note: 'react to the 表姐 news; share your own experience or view in 1 sentence' },
        { target: 'stance with 不过/但是', note: 'present your stance + soften with a concession' },
        { target: 'rhetorical 难道…吗?', note: 'challenge the assumption that 相亲 is right for fresh graduates' },
        { target: '反正 closing', note: 'settle your position with 反正 + a personal-pace conclusion' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '任务模型 — 支持相亲的立场',
      'rènwù móxíng — zhīchí xiāngqīn de lìchǎng',
      'Model answer #1: argue FOR 相亲. Pro-side arguments to draw on: efficient, family-supported, screening built in (parents check basics), less time pressure for working graduates, modern app-based 相亲 is closer to a structured first date than an old-fashioned arranged marriage. Use 不过 to acknowledge counterarguments.',
      'sentence',
      '相亲其实是个不错的方式。父母帮忙筛选，省了很多时间。不过我觉得最重要的还是双方自己愿意。难道相亲就一定没有真感情吗? 反正我觉得方式不重要，关系合适才重要。',
      'A pro-相亲 argument that acknowledges the counterview (不过 + 难道…吗?) and lands on a relationship-centric conclusion (反正).',
      [
        { target: '其实是个不错的方式', note: '"actually a pretty good approach" — opens with a clear stance' },
        { target: '不过…双方自己愿意', note: 'soft contrast acknowledging that mutual willingness matters' },
        { target: '难道相亲就一定没有真感情吗?', note: 'rhetorical challenge to the assumption that 相亲 lacks real feeling' },
        { target: '反正…关系合适才重要', note: 'casual conclusion centering relationship fit' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '任务模型 — 反对相亲的立场',
      'rènwù móxíng — fǎnduì xiāngqīn de lìchǎng',
      'Model answer #2: argue AGAINST 相亲 for fresh graduates. Con-side arguments: too rushed, externally driven, mismatched expectations, kills natural romance, twentysomethings should focus on careers and self-discovery first. Use 可是 or 但是 for stronger contrast since you are pushing back on family pressure.',
      'sentence',
      '我个人不太喜欢相亲。可是我理解父母的心情。但是刚毕业的年轻人最重要的是工作和自我成长。难道二十二三岁就要急着结婚吗? 反正我觉得感情应该自然发展。',
      'An against-相亲 argument that empathizes with parents (可是 — personal pushback while acknowledging) and lands on a self-development conclusion (反正).',
      [
        { target: '不太喜欢相亲', note: '"don\'t really like 相亲" — clear stance, with 不太 softening the negative' },
        { target: '可是我理解父母的心情', note: 'personal pushback acknowledging parents\' feelings' },
        { target: '难道二十二三岁就要急着结婚吗?', note: 'rhetorical challenge to early-twenties marriage timeline' },
        { target: '反正…自然发展', note: 'casual conclusion centering natural relationship development' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战 — 跨文化比较',
      'tiǎozhàn — kuà wénhuà bǐjiào',
      'Stretch goal: after the main coffee chat, your Mainland classmate asks about marriage norms in your home country. Compare and contrast in 3 sentences using 不过 / 但是 / 可是. The goal is a cross-cultural exchange that respects both sides without ranking them.',
      'conversation',
      '同学: 那你们国家结婚都几岁?\n你: 在我的国家，大家结婚比较晚，平均三十岁左右。不过家里也会有点压力。可是父母一般不会直接安排相亲。\n同学: 哦，那挺好的。每个国家文化都不一样。',
      'A three-sentence cross-cultural reply using all three contrast registers; the classmate closes warmly, signaling the conversation has gone well.',
      [
        { target: '三十岁左右', note: '"around 30 years old"; standard age-approximation phrasing' },
        { target: '不过…有点压力', note: 'soft contrast acknowledging family pressure also exists in your country' },
        { target: '可是…不会直接安排相亲', note: 'personal pushback noting the cultural difference around family arrangement' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
