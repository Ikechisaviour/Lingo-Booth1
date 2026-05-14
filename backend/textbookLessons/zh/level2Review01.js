// Level 2 — Review 1: First Wave Consolidation (Mandarin Chinese)
// A REVIEW lesson, not an introduction to new grammar.
// Revisits Level 2 Adult Units 1-6 (Professional Greetings, Work Schedule,
// Business Dining, Commute, Buying, Dorm Life) plus Level 2 thematic Units
// 2-3 (Healthy Living, Sports). Re-drills tricky sounds, recombines
// vocabulary, contrasts major grammar pairs (被/把, 比/更/还/越来越,
// 虽然…但是 / 只有…才 / 除非…否则), and lands in an integrated
// "a day in your Beijing professional life" task.
//
// All content is authored with Hanzi (target) + Pinyin (romanization) +
// rich English glosses (canonical source). The AI conversation tutor reads
// this curriculum and delivers it to each learner in their preferred native
// language at runtime — never assume a specific L1 in this file.
//
// Glosses follow the rich-gloss rule (AGENTS.md → "Gloss Richness"):
// every nativeText, exampleNative, and breakdown.native carries register,
// usage context, or contrast info — not a bare definition. Each grammar
// item back-references the unit it came from in parentheses so the learner
// can revisit the original lesson if a point is still shaky.

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
  // Legacy keys for UI fallback — the "korean" slot holds the target text,
  // the "english" slot holds the note.
  korean: target,
  english: note,
  example: example || target,
  exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  orientation: 'zh-l2r1-orientation',
  pronunciation: 'zh-l2r1-pronunciation',
  vocabularyWorkHome: 'zh-l2r1-vocab-work-home',
  vocabularyHealthSports: 'zh-l2r1-vocab-health-sports',
  grammarBeiBa: 'zh-l2r1-grammar-bei-ba',
  grammarComparison: 'zh-l2r1-grammar-comparison',
  grammarConditional: 'zh-l2r1-grammar-conditional',
  reading: 'zh-l2r1-reading',
  listening: 'zh-l2r1-listening',
  writing: 'zh-l2r1-writing',
  mixedDrills: 'zh-l2r1-mixed-drills',
  task: 'zh-l2r1-task',
  culture: 'zh-l2r1-culture',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What this review covers',
    goals: [
      'Recall the major language from the first wave of Level 2: workplace introductions and titles (Adult U1), shifting schedules (Adult U2), business dining (Adult U3), commuting (Adult U4), shopping decisions (Adult U5), dorm/roommate negotiation (Adult U6), healthy living (Thematic U2), and sports (Thematic U3).',
      'Contrast the three grammar pairs that defined the first wave: active 把 vs passive 被, plain 比 vs 比…更/还… vs 越…越… vs 越来越…, and the three concessive/conditional frames 虽然…但是 / 只有…才 / 除非…否则.',
      'Mix vocabulary and grammar from at least four units in single sentences so recombination feels automatic before moving on to Units 7+.',
    ],
    task: 'Picture a full day in your Beijing professional life at Tsinghua: morning commute, a stand-up meeting, lunch with a colleague, an afternoon shopping errand, and evening dorm chat. You will need every Level 2 micro-skill in one continuous scene by the end of this review.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation Review',
    title: 'Sound traps from the first wave',
    goals: [
      'Re-drill the five trickiest syllables that surfaced across the first wave: 被 bèi (4th, retroflex-adjacent), 把 bǎ (full 3rd dip), 越 yuè (ü-glide + 4th fall), 既 jì (palatal initial + 4th), 除 chú (retroflex 2nd rising).',
      'Apply 不 (bù) sandhi automatically in the new high-frequency context 不是…就是… (Adult U4) and 只有…才 (this review).',
      'Hold the 3+3 sandhi rule in long phrases like 我把那个项目 (wǒ bǎ nèi ge xiàngmù → wó bǎ nèi ge xiàngmù) where the 我把 cluster fronts every 把-sentence.',
    ],
    task: 'Read each example aloud, identify whether sandhi applies, and produce the spoken (not the written) tones.',
  },
  {
    id: ACT.vocabularyWorkHome,
    section: 'Vocabulary Consolidation I',
    title: 'Workplace + housing words across units',
    goals: [
      'Recall 10–12 high-frequency words spanning Adult Units 1, 2, 4, and 6: company titles, project responsibility, shifting schedules, commute, and dorm life.',
      'Recombine them across unit boundaries — e.g., describe a commute using a title (Adult U1) + a schedule shift (Adult U2) + a transit choice (Adult U4) in one sentence.',
    ],
    task: 'Pick six words from this consolidation set and produce one fresh sentence per word, each mixing at least two unit fields.',
  },
  {
    id: ACT.vocabularyHealthSports,
    section: 'Vocabulary Consolidation II',
    title: 'Health + sports + buying words across units',
    goals: [
      'Recall 10–12 high-frequency words from Thematic Units 2–3 (health, exercise, match vocabulary) and Adult Unit 5 (shopping, comparison).',
      'Recombine across boundaries — e.g., compare two pairs of running shoes for a Tsinghua sports event using vocabulary from both fields.',
    ],
    task: 'Pick six words from this consolidation set and produce one fresh sentence per word, each crossing health/sports/shopping fields.',
  },
  {
    id: ACT.grammarBeiBa,
    section: 'Grammar Review I',
    title: '被 (passive) vs 把 (active disposal) — same event, different angle',
    goals: [
      'Use 把 (bǎ, Adult U2 + Thematic U3) to front a definite object before the verb when the SPEAKER is highlighting what they did TO that object: 我把报告交了 ("I turned in the report").',
      'Use 被 (bèi) to invert the same event with the affected party as subject when the speaker is highlighting what HAPPENED TO that party: 报告被我交了 ("The report was turned in by me"). 被 carries a faint negative undertone in older usage but is fully neutral in modern professional Chinese.',
      'Know that both 把 and 被 require a complete verb phrase (verb + complement/aspect marker) — bare verbs are ungrammatical: 我把球踢 ✗ vs 我把球踢进了 ✓.',
    ],
    task: 'Take one event ("Manager Wang assigned me a project") and rewrite it three ways — neutral, 把 active disposal, 被 passive — preserving all the same content.',
  },
  {
    id: ACT.grammarComparison,
    section: 'Grammar Review II',
    title: '比 / 更 / 还 / 越来越 — the four comparison flavors',
    goals: [
      'Stack the four comparison flavors learned across Adult U5 and Thematic U3: plain 比 (A 比 B 大), intensified 比…更/还… (A 比 B 更大 / 还大), scaling 越…越… (越买越多), and trend 越来越… (越来越贵).',
      'Pick the right flavor by meaning — 更 is a neutral upgrade, 还 carries surprise, 越…越… links two scaling variables, 越来越 describes a trend over time. Mixing them up sounds non-native even when each is grammatical.',
      'Avoid the classic English-to-Chinese trap: never insert 很 inside a 比-comparison (我比你很高 ✗); the comparative adjective stays plain or takes 更/还.',
    ],
    task: 'Compare two options (two laptops, two commute routes, two Beijing dim-sum restaurants) using each of the four comparison flavors once, for four total sentences.',
  },
  {
    id: ACT.grammarConditional,
    section: 'Grammar Review III',
    title: '虽然…但是 / 只有…才 / 除非…否则 — three concessive/conditional frames',
    goals: [
      'Re-apply 虽然…但是… (Adult U5) for the concessive "although X, still Y" — used to acknowledge a downside before stating a stronger upside.',
      'Re-apply 只有…才… for the necessary-condition "only if X, then Y" — sets a single condition as the ONLY path to the outcome.',
      'Re-apply 除非…否则… for the strong-condition "unless X, otherwise Y" — sets X as the escape from an otherwise inevitable result.',
      'Distinguish the three: 虽然…但是 concedes, 只有…才 requires, 除非…否则 warns. Picking the wrong one shifts the speaker\'s stance from polite acceptance to hard demand.',
    ],
    task: 'Write three short paragraphs about the same workplace situation (e.g., closing a deal), one using each frame, and feel how the tone changes.',
  },
  {
    id: ACT.reading,
    section: 'Reading',
    title: 'An integrated workplace + life paragraph',
    goals: [
      'Read a 6-sentence paragraph describing a typical Beijing day that mixes every grammar pattern from this review: 把/被, 比/更/还/越来越, 虽然/只有/除非.',
      'Identify which Level 2 unit each grammar feature originally comes from, so weak spots become visible.',
    ],
    task: 'Read the paragraph aloud with correct tones and sandhi, then annotate each grammar feature with its source unit.',
  },
  {
    id: ACT.listening,
    section: 'Listening',
    title: 'A layered three-person dialogue',
    goals: [
      'Follow a 6-turn lunch conversation between a manager and two colleagues at Tsinghua that layers multiple grammar points per turn.',
      'Reconstruct the dialogue by switching speaker perspectives, e.g., re-tell the manager\'s turn from a colleague\'s point of view, flipping 把 ↔ 被.',
    ],
    task: 'Listen, summarize each turn in one short Mandarin sentence, then flip one 把-sentence into a 被-sentence to prove you understand the perspective shift.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Synthesis paragraph — a Beijing professional day',
    goals: [
      'Write a 6–8 sentence first-person paragraph describing one day in your Beijing professional life, mixing at least four Level 2 unit fields (work, commute, dining, shopping, dorm, health, sports).',
      'Use 把 OR 被 at least once, one comparison flavor (比/更/还/越来越) at least once, and one of the three concessive/conditional frames at least once — proving the grammar consolidation works in extended writing.',
    ],
    task: 'Write your own paragraph, then mark each grammar feature with its source unit in a margin note.',
  },
  {
    id: ACT.mixedDrills,
    section: 'Mixed-Skill Drills',
    title: 'Two-pattern combinations in single sentences',
    goals: [
      'Combine grammar from different first-wave units in single sentences — e.g., 把…交给… + 虽然…但是 in one breath ("I handed the report to the director, although it was still rough").',
      'Build the habit of layering rather than chaining — Chinese carries multiple grammar markers in one sentence comfortably; over-segmenting into many short sentences is a beginner habit.',
    ],
    task: 'Build three multi-pattern sentences as shown in the examples — and check each one is grammatical, not just word-for-word translated.',
  },
  {
    id: ACT.culture,
    section: 'Culture Recap',
    title: 'Brief callbacks to first-wave culture notes',
    goals: [
      'Recall the four cultural anchors of the first wave: 面子 (Adult U1, face-saving), 干杯 + 白酒 host-guest dynamics (Adult U3), 上下班高峰 + 燕郊 commuter geography (Adult U4 + U6), and the 国乒 / 广场舞 sports culture (Thematic U3).',
      'Apply one cultural cue correctly in this lesson\'s integrated task — e.g., decline a second 白酒 toast politely while still showing face.',
    ],
    task: 'For each of the four cultural anchors, name one phrase or behavior you would use in a real Beijing scene to honor the norm.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'A day in your Beijing professional life',
    goals: [
      'Combine every skill from the first wave into one continuous five-scene roleplay: 7am commute, 10am stand-up, 12pm lunch, 4pm shopping errand, 9pm dorm chat.',
      'Hold the right register in each scene (formal with the manager, polite with colleagues, casual with the roommate) — switching registers cleanly is a Level 2 outcome on its own.',
    ],
    task: 'Roleplay the five scenes with the tutor playing different counterparts; aim for at least 8–10 turns across the whole day.',
  },
];

const lesson = {
  title: 'Level 2 · Review 1: First Wave Consolidation — A Day in Beijing',
  category: 'career',
  difficulty: 'intermediate',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'review-recombining-units', label: 'Recombining first-wave units', goal: 'Use vocabulary from at least three different Level 2 units in one short narrative — proving the units talk to each other rather than living in silos.' },
    { id: 'review-passive-active-flip', label: 'Passive ↔ active perspective flip', goal: 'Tell the same event twice — once with 把 fronting the actor\'s control, once with 被 fronting the affected party — to show you can shift perspective without changing meaning.' },
    { id: 'review-comparison-stack', label: 'Comparison stack', goal: 'Compare two options using plain 比, then upgrade with 更 or 还, then add a trend with 越来越 — layering the four comparison flavors in one short discussion.' },
    { id: 'review-concessive-pick', label: 'Picking the right concessive', goal: 'Given a workplace situation, choose between 虽然…但是, 只有…才, and 除非…否则 based on whether you are conceding, requiring, or warning.' },
  ],
  relatedPools: ['topic-people', 'topic-school', 'topic-work', 'topic-society', 'topic-health'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '复习目标',
      'fùxí mùbiāo',
      'By the end of this review you can recombine first-wave vocabulary and grammar fluently — pulling from any of the eight Level 2 units (Adult U1–U6 plus Thematic U2–U3) without pausing to remember which lesson each piece came from. The goal of a review is recombination, not new acquisition.',
      'word',
      '复习 fùxí (review) · 整合 zhěnghé (integration) · 综合 zōnghé (synthesis) · 巩固 gǒnggù (consolidation)',
      'These four words name the four sub-skills of a review lesson; you will hear them used by the tutor throughout this session.',
      [
        { target: '复习 fùxí', note: 'review; the umbrella word for revisiting earlier material' },
        { target: '整合 zhěnghé', note: 'integration; the active recombination of separate pieces into one whole' },
        { target: '综合 zōnghé', note: 'synthesis; building higher-order combinations from the parts' },
        { target: '巩固 gǒnggù', note: 'consolidation; making the new skill stable and automatic so it survives the next gap in study' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '真实场景',
      'zhēnshí chǎngjǐng',
      'A typical Beijing professional day at Tsinghua University — five scenes mapping cleanly onto the first-wave units: morning commute (Adult U4), 10am stand-up at the company (Adult U1+U2), business lunch (Adult U3), afternoon errand on Taobao or in 中关村 (Adult U5), evening dorm chat (Adult U6) — plus health/sports threads woven throughout (Thematic U2+U3).',
      'word',
      '清华园 → 公司 → 川菜馆 → 中关村 → 宿舍 → 健身房 — six locations, one continuous day.',
      'Every Beijing professional has roughly this shape of day; this is why the review uses it as the integration scene.',
      [
        { target: '清华园 → 公司 (Adult U4)', note: 'commute scene — choosing among 地铁, 共享单车, or 打车 during 早高峰' },
        { target: '公司 (Adult U1 + U2)', note: 'workplace scene — addressing colleagues by 姓+职位, reporting on shifting schedules' },
        { target: '川菜馆 (Adult U3)', note: 'business lunch scene — host-guest dynamics with 点菜 and 干杯' },
        { target: '中关村 / Taobao (Adult U5)', note: 'shopping scene — comparing 性价比 across two products' },
        { target: '宿舍 (Adult U6)', note: 'dorm-life scene — negotiating chores via WeChat with 让 and 又…又…' },
        { target: '健身房 / 球场 (Thematic U2 + U3)', note: 'fitness/sport scene — describing skill progression with 越来越 and a workout plan with 为了…通过…' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '复习地图',
      'fùxí dìtú',
      'A "review map" telling you exactly which earlier unit each piece in this lesson comes from. Every grammar item below is tagged (Adult U1, Thematic U3, etc.) so you can return to the original lesson if a point is shaky. Skipping the back-reference is the most common reason later units feel harder than they should.',
      'word',
      'Tags throughout: (Adult U1) workplace · (Adult U2) schedule · (Adult U3) dining · (Adult U4) commute · (Adult U5) buying · (Adult U6) dorm · (U2-th) health · (U3-th) sports.',
      'Use these tags actively — when an item feels unfamiliar, go back to the tagged unit before continuing.',
      null,
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation Review
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '被',
      'bèi (4th)',
      'A sharp falling fourth tone with a clean labial-stop initial — the syllable that headlines every passive sentence. Learners often soften the fall into a near-neutral mid pitch, which weakens the marker and makes the passive sound tentative.',
      'word',
      '报告被王经理批评了。 bàogào bèi Wáng jīnglǐ pīpíng le.',
      '"The report was criticized by Manager Wang." — keep 被 sharp and falling; the meaning depends on it being heard clearly.',
      [
        { target: '被 bèi (4th)', note: 'sharp falling fourth tone; the passive marker (Adult U2 + Thematic U3 contrast)' },
        { target: 'initial b- (unaspirated)', note: 'no puff; not the English "b" — softer voicing onset' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '把',
      'bǎ (3rd, full dip)',
      'A full third-tone dip-and-rise on the disposal marker — the syllable that fronts the affected object before the verb. Pronounced too flat, it sounds like a particle; pronounced with the full dip, the listener immediately registers "active disposal coming".',
      'word',
      '我把那个项目交给了李经理。 wǒ bǎ nèi ge xiàngmù jiāo gěi le Lǐ jīnglǐ.',
      '"I handed that project over to Manager Li." — note 我把 wǒ bǎ is two third tones, so spoken 3+3 sandhi fires: wó bǎ.',
      [
        { target: '把 bǎ (3rd)', note: 'full dip-and-rise; the disposal marker (Adult U2 + Thematic U3)' },
        { target: '我把 → wó bǎ (sandhi)', note: 'two adjacent 3rd tones; the first rises to 2nd in speech' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '越',
      'yuè (ü + 4th)',
      'A ü-glide + sharp fall — the syllable at the heart of both 越…越… and 越来越…. The initial ü-glide demands rounded lips from the start; learners who relax the rounding produce something closer to "ywe" which obscures the word.',
      'word',
      '我的中文越来越好。 wǒ de Zhōngwén yuè lái yuè hǎo.',
      '"My Chinese is getting better and better." — make the ü-rounding crisp and the 4th-tone fall sharp; both together carry the trend meaning.',
      [
        { target: '越 yuè (4th)', note: 'ü-glide + sharp fall; the comparison/trend marker (Adult U5 + Thematic U3)' },
        { target: 'ü rounding', note: 'lips rounded from the start of the syllable, not midway through' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '既',
      'jì (palatal + 4th)',
      'A palatal-affricate initial j- + sharp fall — the syllable used in both 既不…也不… (Thematic U2) and 既…又… (Adult U6). Learners often confuse it with 几 jǐ (3rd, "how many") and 寄 jì (4th, "to send"); the j- + ì pair is correct, the tone separates from 几, and context separates from 寄.',
      'word',
      '我既不抽烟也不喝酒。 wǒ jì bù chōuyān yě bù hē jiǔ.',
      '"I neither smoke nor drink." — the polite factual habit-listing pattern from Thematic U2.',
      [
        { target: '既 jì (4th)', note: 'palatal j- + 4th tone; "both/and" marker (Adult U6 + Thematic U2)' },
        { target: 'vs 几 jǐ (3rd)', note: 'same initial, different tone; "how many" / "several"' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '除',
      'chú (retroflex + 2nd)',
      'A retroflex affricate ch- + rising second tone — the syllable that opens 除非…否则… ("unless…otherwise…"). The tongue must curl back for ch-; the rise gives the conditional a slightly questioning intonation that signals "I am setting up the only escape".',
      'word',
      '除非你早点睡，否则明天又会迟到。 chúfēi nǐ zǎo diǎn shuì, fǒuzé míngtiān yòu huì chídào.',
      '"Unless you sleep earlier, you\'ll be late again tomorrow." — practice the curled-tongue ch- and the rising 2nd-tone glide together.',
      [
        { target: '除 chú (2nd)', note: 'retroflex ch- + rising 2nd tone; opens the 除非 conditional frame' },
        { target: 'vs 出 chū (1st)', note: 'same initial, level 1st tone; "to exit" — different word, different feel' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '不 sandhi in 只有…才 / 不是…就是…',
      'bù sandhi review',
      'In two of the most frequent first-wave patterns, 不 changes tone before a 4th-tone syllable: 不是 bùshì → búshì (the constant feature of Adult U4\'s 不是…就是…). In 只有…才, 不 does not appear directly, but the surrounding sandhi cluster 不一定 ("not necessarily") often pairs with it: 不 + yī → bù (yī itself shifts to yí before 4th tone, leaving 不一 as bù yí).',
      'word',
      '不是地铁就是打车 → spoken: búshì dìtiě jiùshì dǎchē.',
      '"Either the subway or a taxi" — Adult U4 commute alternation; sandhi fires on every 不是.',
      [
        { target: '不 + 4th → bú', note: '不是 búshì, 不会 búhuì — Adult U4 + Thematic U3 high-frequency cases' },
        { target: '不 + 1st/2nd/3rd → bù', note: '不来 bùlái, 不好 bùhǎo — no sandhi in these contexts' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary Consolidation I (work + home)
    // ────────────────────────────────────────────────────────────────────
    createContentItem('经理', 'jīnglǐ', 'Manager — the all-purpose mid-rank workplace title used after a family name: 王经理 ("Manager Wang"). Distinguish from 总监 (director, senior), 总经理 (CEO), and 主管 (line supervisor) — getting the rank right is part of showing 面子. (Adult U1)', 'word', '王经理今天主持会议。', '"Manager Wang chairs the meeting today." — title + concrete responsibility framing.', null, [ACT.vocabularyWorkHome]),
    createContentItem('负责', 'fùzé', 'Be in charge of / be responsible for — takes a CONCRETE noun (project, product, team), never an abstract quality. The standard verb when describing job scope in a professional self-introduction. (Adult U1)', 'word', '我目前主要负责华北区的销售。', '"I am currently mainly in charge of sales in the North China region." — 主要 + 负责 + concrete object frame.', null, [ACT.vocabularyWorkHome]),
    createContentItem('加班', 'jiābān', 'Work overtime — Beijing professional default for many tech and finance roles. Often paired with 996 culture; saying 我经常加班 is a neutral fact, not a complaint. (Adult U2)', 'word', '这周三晚上又要加班。', '"This Wednesday evening I have to work overtime again." — 又 (again) flags it as recurring, not exceptional.', null, [ACT.vocabularyWorkHome]),
    createContentItem('调休', 'tiáoxiū', 'Compensatory rest / schedule swap — a uniquely Chinese workplace concept: when a public holiday is moved or extended, the lost weekend is "owed back". Hearing 这周调休 means "we worked Saturday to make Monday a holiday". (Adult U2)', 'word', '上周末调休了，所以今天放假。', '"Last weekend was a swap, so today is a holiday." — the swap-and-pay-back logic that confuses foreign workers.', null, [ACT.vocabularyWorkHome]),
    createContentItem('地铁', 'dìtiě', 'Subway / metro — the Beijing professional\'s default commute, faster than driving during 早高峰. Often combined with 共享单车 (shared bike) for the last mile. (Adult U4)', 'word', '我每天坐地铁上班，大概一个小时。', '"I take the subway to work daily, about an hour." — typical commute statement with duration estimate.', null, [ACT.vocabularyWorkHome]),
    createContentItem('打车', 'dǎchē', 'Take a taxi / call a ride — usually means 滴滴出行 (Didi) in modern Beijing, not a flagged taxi. Used when subway is impossible or after dinner with colleagues. (Adult U4)', 'word', '太晚了，我打车回家吧。', '"It\'s too late, I\'ll call a ride home." — typical post-dinner closing line in a business meal.', null, [ACT.vocabularyWorkHome]),
    createContentItem('早高峰', 'zǎo gāofēng', 'Morning rush hour — roughly 7:30–9:30 in Beijing. The phrase 避开早高峰 ("avoid morning rush") is a standard reason for leaving home very early or working from home. (Adult U4)', 'word', '为了避开早高峰，我七点就出门了。', '"To avoid morning rush hour, I left home at 7." — combines 为了 + goal (Thematic U2 grammar) with commute vocabulary.', null, [ACT.vocabularyWorkHome]),
    createContentItem('合租', 'hézū', 'Shared rental — sharing an apartment with strangers found via Ziroom or Beike; the dominant housing model for young Beijing professionals because rent inside the sixth ring is prohibitive. (Adult U6)', 'word', '我和两个室友合租一套三居室。', '"My two roommates and I share a three-bedroom apartment." — typical Beijing twentysomething housing setup.', null, [ACT.vocabularyWorkHome]),
    createContentItem('燕郊', 'Yānjiāo', 'Yanjiao — a commuter satellite town just east of Beijing in Hebei province; many young Beijing employees live here because rent is half that of the city. The commute is famously brutal (90+ minutes each way). (Adult U6)', 'word', '住在燕郊，每天通勤两个小时。', '"Living in Yanjiao, I commute two hours daily." — the Beijing-Hebei commuter reality.', null, [ACT.vocabularyWorkHome]),
    createContentItem('点菜', 'diǎn cài', 'Order dishes (at a restaurant) — the host\'s job in a Chinese business meal, never the guest\'s. Refusing to order on behalf of the table when you are the host is a 面子 misstep. (Adult U3)', 'word', '王经理是主人，请您点菜。', '"Manager Wang, you are the host — please order." — typical guest-deferring line.', null, [ACT.vocabularyWorkHome]),
    createContentItem('干杯', 'gānbēi', 'Cheers / "dry the cup" — the Chinese toast, often serious. Saying 干杯 with 白酒 means draining the glass; with 啤酒 or 茶, sipping is acceptable. (Adult U3)', 'word', '为我们的合作干杯！', '"Cheers to our collaboration!" — standard business-dinner toast formula.', null, [ACT.vocabularyWorkHome]),
    createContentItem('白酒', 'báijiǔ', 'Chinese grain liquor — typically 40–60% alcohol; the alpha drink at any formal Chinese business dinner. Declining a full toast requires the face-saving phrases 我开车 ("I\'m driving") or 实在不能再喝了 ("I genuinely can\'t drink any more"). (Adult U3)', 'word', '我开车，喝茶代替白酒吧。', '"I\'m driving — let me have tea instead of báijiǔ." — the standard polite decline.', null, [ACT.vocabularyWorkHome]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary Consolidation II (health + sports + buying)
    // ────────────────────────────────────────────────────────────────────
    createContentItem('锻炼', 'duànliàn', 'Exercise / train the body — the general-purpose verb for any physical training, broader than 健身 (gym workout). The word a doctor would use; appears in 锻炼身体 ("exercise the body"). (Thematic U2)', 'word', '为了健康，我每天都锻炼半小时。', '"For my health, I exercise daily for half an hour." — combines 为了 (Thematic U2 grammar) with health vocabulary.', null, [ACT.vocabularyHealthSports]),
    createContentItem('熬夜', 'áoyè', 'Stay up late / pull an all-nighter — almost always negative; pairs naturally with 不要再…了 advice. Common in Beijing professional life; the doctor-recommended cutoff is 11 PM. (Thematic U2)', 'word', '你别熬夜了，对身体不好。', '"Stop staying up late, it\'s bad for your health." — classic concerned-friend line.', null, [ACT.vocabularyHealthSports]),
    createContentItem('养生', 'yǎngshēng', 'Health cultivation — the traditional Chinese concept of preserving life-force through diet, herbs, sleep, and gentle exercise; recently revived as a youth wellness trend (朋克养生, "punk health"). (Thematic U2)', 'word', '现在很多年轻人也开始养生了。', '"Many young people are getting into health-cultivation now." — the 朋克养生 trend in one sentence.', null, [ACT.vocabularyHealthSports]),
    createContentItem('比赛', 'bǐsài', 'Match / competition — covers any sport from soccer to esports. Tones are 3+4 (full dip then sharp fall); the rhythm is the canonical first-wave sports word. (Thematic U3)', 'word', '今天晚上有一场重要的比赛。', '"There\'s an important match tonight." — typical 场 measure word with 比赛.', null, [ACT.vocabularyHealthSports]),
    createContentItem('进球', 'jìnqiú', 'Score (a goal) — literally "ball-enter". The verb takes the 把-construction naturally: 把球踢进 ("kick the ball in"). (Thematic U3)', 'word', '他在第八十分钟进了一个球。', '"He scored a goal in the 80th minute." — match-recap phrasing with timestamp.', null, [ACT.vocabularyHealthSports]),
    createContentItem('教练', 'jiàoliàn', 'Coach — used after a family name (王教练) or alone as a form of address. In gyms, also covers personal trainer. (Thematic U3)', 'word', '王教练让我们多练习传球。', '"Coach Wang has us practice passing more." — 让 causative + coach instruction.', null, [ACT.vocabularyHealthSports]),
    createContentItem('球迷', 'qiúmí', 'Sports fan — literally "ball-fanatic". A standard self-identifier: 我是国乒的球迷 ("I\'m a fan of the national table-tennis team"). (Thematic U3)', 'word', '我是中国国家队的球迷。', '"I\'m a fan of the Chinese national team." — typical fan self-identification.', null, [ACT.vocabularyHealthSports]),
    createContentItem('性价比', 'xìngjiàbǐ', 'Cost-performance ratio — the criterion that drives nearly every Chinese consumer comparison. 性价比高 ("high cost-performance") is the highest compliment a product can get on a review site. (Adult U5)', 'word', '这款手机的性价比很高。', '"This phone has excellent cost-performance." — standard product-review line.', null, [ACT.vocabularyHealthSports]),
    createContentItem('划算', 'huásuàn', 'Worthwhile / a good deal — what you say AFTER calculating whether a purchase is justified. Pairs naturally with 比较 (relatively) and 不太 (not very). (Adult U5)', 'word', '比较起来，这家更划算。', '"Comparing, this one is more worthwhile." — comparison + judgment.', null, [ACT.vocabularyHealthSports]),
    createContentItem('退货', 'tuìhuò', 'Return goods — the universal e-commerce verb on Taobao/JD. The seven-day return guarantee (七天无理由退货) is a near-universal default. (Adult U5)', 'word', '我想退货，可以吗？', '"I\'d like to return this, is that okay?" — minimal after-sales request.', null, [ACT.vocabularyHealthSports]),
    createContentItem('打折', 'dǎzhé', 'Discount — note that 打八折 means "20% off" (8/10 of original price), the OPPOSITE direction of English "80% off". Misreading this is the most common foreign-shopper trap in China. (Adult U5)', 'word', '现在打八折，比原价便宜两百块。', '"It\'s 20% off now, two hundred yuan cheaper than the original." — sets up the comparison flavor in Activity 6.', null, [ACT.vocabularyHealthSports]),
    createContentItem('快递', 'kuàidì', 'Express delivery / courier — also used as a noun for "the delivery itself" (快递到了 = "the package has arrived"). Beijing professionals receive multiple 快递 per week. (Adult U5)', 'word', '我的快递到了，下楼去取一下。', '"My delivery arrived, I\'ll go down and pick it up." — typical mid-workday interruption line.', null, [ACT.vocabularyHealthSports]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar Review I: 把 vs 被
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '把 — active disposal',
      'bǎ — fronting the affected object',
      'The 把 construction reorders Subject + Verb + Object into Subject + 把 + Object + Verb + Complement. Use it when the speaker wants to highlight what they DID TO a specific, definite object — most commonly with disposal verbs (move, give, finish, throw, hand over) and a required result complement. (Adult U2 + Thematic U3)',
      'sentence',
      'NEUTRAL: 我交了报告。\n把-VERSION: 我把报告交了。 ("I turned the report in.")',
      'The 把-version fronts 报告 (the report) to signal: "the report is what I want to talk about, and what I did to it was turn it in".',
      [
        { target: 'S + 把 + O + V + complement', note: 'canonical word order; the complement (了 / 完 / 给… / 进… / 到…) is almost always required' },
        { target: 'O must be definite', note: '把一本书 ✗ (a book — indefinite); 把那本书 ✓ (that book — definite)' },
        { target: 'bare V is ungrammatical', note: '我把球踢 ✗ → 我把球踢进了 ✓; 把 demands a result' },
      ],
      [ACT.grammarBeiBa],
    ),
    createContentItem(
      '被 — passive perspective',
      'bèi — fronting the affected party',
      'The 被 construction flips the perspective: Affected-party + 被 + (Actor) + Verb + Complement. Use it when the speaker wants the affected party in topic position rather than the actor — common in news, complaints, and neutral reports. The actor can be dropped entirely (被批评了 = "got criticized"). (cross-unit consolidation; preview for Level 3)',
      'sentence',
      'NEUTRAL: 王经理批评了我的报告。\n被-VERSION: 我的报告被王经理批评了。 ("My report was criticized by Manager Wang.")',
      'The 被-version fronts 我的报告 (my report) so the listener\'s attention is on what happened TO it, not on who did it.',
      [
        { target: 'Affected + 被 + Actor + V + complement', note: 'canonical word order; the actor can be dropped: 我的报告被批评了 ✓' },
        { target: 'register', note: 'in older usage 被 carried a faintly negative undertone ("victim of"); in modern professional Chinese it is fully neutral' },
        { target: 'bare V is ungrammatical', note: '被批评 ✗ alone — needs 了 / 过 / a complement to anchor the event' },
      ],
      [ACT.grammarBeiBa],
    ),
    createContentItem(
      '把 vs 被 — same event, different angle',
      'bǎ vs bèi — perspective shift',
      'CRITICAL CONTRAST: 把 and 被 narrate the SAME event but from opposite perspectives. 把 keeps the actor in subject position and brings the object next to the verb; 被 lifts the affected party into subject position and demotes the actor. Choose by what you want the listener to focus on, not by the event itself.',
      'sentence',
      'EVENT: Manager Wang criticized my report.\nNEUTRAL: 王经理批评了我的报告。\n把: 王经理把我的报告批评了一顿。\n被: 我的报告被王经理批评了一顿。',
      'Three legitimate ways to narrate the same event; each foregrounds a different part. Native speakers switch fluidly based on conversational flow.',
      [
        { target: '把 fronts: the actor still leads, the object pre-verb', note: 'use when the actor is the topic and you want emphasis on what they did' },
        { target: '被 fronts: the affected party leads, the actor demoted', note: 'use when the affected party is the topic (often in news, complaints)' },
        { target: '了一顿 (le yī dùn)', note: 'a result-extending complement meaning "thoroughly" / "a round of" — common with criticism and beatings' },
      ],
      [ACT.grammarBeiBa],
    ),
    createContentItem(
      '把-sentences in sports vs work',
      'bǎ-sentences across U2 + U3',
      'The 把-construction first showed up for play-by-play sports (Thematic U3) — 把球踢进 ("kick the ball in") — and then again for project-disposal at work (Adult U2) — 把项目交了 ("turn the project in"). The grammar is identical; the vocabulary shifts.',
      'sentence',
      'SPORTS: 他把球漂亮地踢进了对方球门。 ("He beautifully kicked the ball into the opposing goal.")\nWORK: 他把那份报告早就交给经理了。 ("He turned that report in to the manager long ago.")',
      'Same 把 + O + V + complement pattern; the disposal logic ("S did something definite TO O") is the constant across both fields.',
      [
        { target: 'sports: 把球踢进 / 把球传给我', note: 'object = ball; result = enters/given-to' },
        { target: 'work: 把报告交了 / 把项目做完了', note: 'object = work product; result = handed-in/completed' },
      ],
      [ACT.grammarBeiBa],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar Review II: 比 / 更 / 还 / 越来越
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '比 — plain comparison',
      'A 比 B + adj',
      'The baseline comparison structure introduced at Level 1 and re-applied at Level 2: A 比 B + plain adjective. The adjective stays bare; never insert 很 (我比你很高 ✗). Optionally add a quantity at the end (我比你高五公分 "I\'m 5 cm taller than you"). (Adult U5 reinforced)',
      'sentence',
      '这款手机比那款贵两百块。 ("This phone is 200 yuan more expensive than that one.")',
      'Plain comparison + quantity at the end — the standard shopping comparison form.',
      [
        { target: 'A 比 B + adj', note: 'baseline; adjective bare, no 很' },
        { target: '+ quantity at end', note: 'optional; quantity follows the adj: 高五公分, 贵两百块' },
      ],
      [ACT.grammarComparison],
    ),
    createContentItem(
      '比…更/还… — intensified comparison',
      'A 比 B 更/还 + adj',
      'Adult U5\'s upgrade of the plain comparison: insert 更 (gèng, "even more" — neutral) or 还 (hái, "still more" — slight surprise) before the adjective. 更 is the workhorse intensifier; 还 carries a flavor of "even MORE than I expected".',
      'sentence',
      'NEUTRAL UPGRADE: 这款比那款更划算。 ("This one is even more worthwhile than that one.")\nWITH SURPRISE: 这款比那款还便宜！ ("This one is even cheaper than that one!")',
      'The choice between 更 and 还 carries real meaning; misuse changes the speaker\'s stance.',
      [
        { target: '比 B 更 + adj', note: 'neutral upgrade; "even more X than B"' },
        { target: '比 B 还 + adj', note: 'with surprise; "even MORE X than B — beyond what I expected"' },
      ],
      [ACT.grammarComparison],
    ),
    createContentItem(
      '越…越… — scaling two variables',
      'yuè X yuè Y',
      'Adult U5\'s pattern for linking two scaling conditions: as X increases, Y increases. 越用越喜欢 ("the more I use it, the more I like it"). Two common shapes: same subject (我越想越生气) and different subjects (东西越贵，质量不一定越好).',
      'sentence',
      'SAME SUBJECT: 我越练越熟练。 ("The more I practice, the more skilled I get.")\nDIFFERENT SUBJECTS: 价格越高，性价比不一定越好。 ("The higher the price, the higher the cost-performance is NOT necessarily.")',
      'Use to express co-variation; do NOT confuse with 越来越…, which expresses a trend over time.',
      [
        { target: '越 V₁ 越 V₂ (same subject)', note: 'one subject, two scaling actions/qualities' },
        { target: 'X 越…，Y 越… (different subjects)', note: 'two subjects, one scaling each' },
        { target: 'vs 越来越…', note: 'critical contrast — see next item' },
      ],
      [ACT.grammarComparison],
    ),
    createContentItem(
      '越来越 — trend over time',
      'yuè lái yuè + adj',
      'Thematic U3\'s pattern for "more and more (over time)" — describes progressive change. 我的中文越来越好 ("my Chinese is getting better and better"). NEVER used to link two variables — that\'s 越…越….',
      'sentence',
      '这个球员越来越强。 ("This player is getting stronger and stronger.")\n北京的房价越来越贵。 ("Beijing housing prices are getting more and more expensive.")',
      'Pure trend statement — no second variable required.',
      [
        { target: '越来越 + adj', note: 'trend over time; "more and more X"' },
        { target: 'vs 越…越…', note: 'trend (one variable, time) vs scaling (two variables, co-variation)' },
      ],
      [ACT.grammarComparison],
    ),
    createContentItem(
      'Picking the right comparison flavor',
      'when to use which',
      'The four flavors are NOT interchangeable. Plain 比 reports a difference. 更/还 intensifies the difference. 越…越… co-varies two variables. 越来越 reports a trend. Choosing wrong sounds non-native even when each is grammatical — the most common Level 2 stumble is using 越来越 where 越…越… is needed and vice versa.',
      'sentence',
      'DIFFERENCE: 这个比那个贵.\nINTENSIFIED: 这个比那个更贵.\nSCALING: 越买越多.\nTREND: 越来越贵.',
      'All four describe price/quantity facts about purchases; each carries a different relationship to time and to a second variable.',
      [
        { target: 'difference: 比', note: 'static report; A 比 B + adj' },
        { target: 'intensified: 比…更/还', note: 'difference is bigger than expected' },
        { target: 'scaling: 越…越…', note: 'two variables co-vary' },
        { target: 'trend: 越来越', note: 'one variable changing over time' },
      ],
      [ACT.grammarComparison],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar Review III: concessive/conditional
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '虽然…但是… — concession',
      'suīrán … dànshì …',
      'Adult U5\'s concession frame: acknowledge a downside (虽然…), then state the stronger upside (但是…). The standard polite way to justify ANY purchase decision or career choice in Mandarin — you give the listener the counter-argument first, then your reason.',
      'sentence',
      '虽然这款手机贵了点，但是性价比还是很高。 ("Although this phone is a bit pricey, the cost-performance is still very high.")',
      'The classic shopping-justification pattern; 但是 must be present even when English would drop it.',
      [
        { target: '虽然 X', note: 'opens with the conceded downside' },
        { target: '但是 Y', note: 'closes with the stronger upside; required even when English drops "but"' },
        { target: 'register', note: 'neutral-polite; in formal writing, swap to 尽管…但…' },
      ],
      [ACT.grammarConditional],
    ),
    createContentItem(
      '只有…才… — necessary condition',
      'zhǐyǒu … cái …',
      'Sets a SINGLE condition as the ONLY path to the outcome — much stronger than English "only if". 只有努力，才能成功 ("Only by working hard can one succeed"). The 才 in the second clause is required and carries the "then and only then" meaning.',
      'sentence',
      '只有提前预订，才能订到这家川菜馆的包间。 ("Only by booking in advance can you get a private room at this Sichuan restaurant.")',
      'Use when you want to communicate that X is the EXCLUSIVE path to Y — anything weaker calls for 如果…就… ("if…then") instead.',
      [
        { target: '只有 X', note: 'opens with the sole necessary condition' },
        { target: '才 Y', note: 'closes with the outcome; the 才 is required, not optional' },
        { target: 'vs 如果…就…', note: '如果 is a sufficient condition; 只有…才 is a necessary AND exclusive one' },
      ],
      [ACT.grammarConditional],
    ),
    createContentItem(
      '除非…否则… — strong warning',
      'chúfēi … fǒuzé …',
      'Sets X as the ONLY ESCAPE from an otherwise inevitable bad result. 除非你早点睡，否则明天又会迟到 ("Unless you sleep earlier, you\'ll be late again tomorrow"). The frame is stronger than 如果不…就… and carries a clear warning tone.',
      'sentence',
      '除非现在打车，否则赶不上九点的会议了。 ("Unless we take a taxi now, we won\'t make the 9am meeting.")',
      'The warning frame — implies the bad result IS coming unless X is done. Use sparingly with seniors; with peers, very natural.',
      [
        { target: '除非 X', note: 'opens with the escape condition' },
        { target: '否则 Y (negative outcome)', note: 'closes with what will happen if the escape is not taken' },
        { target: 'tone', note: 'warning, slightly urgent; not the same neutral tone as 如果' },
      ],
      [ACT.grammarConditional],
    ),
    createContentItem(
      'Picking the right concessive/conditional',
      'concession vs necessity vs warning',
      'The three frames are NOT interchangeable. 虽然…但是 CONCEDES (acknowledges a downside, then offers an upside). 只有…才 REQUIRES (sets a single necessary path). 除非…否则 WARNS (sets a single escape from a bad outcome). Picking the wrong one shifts the speaker\'s stance from polite acceptance to hard demand to outright threat.',
      'sentence',
      'CONCEDE: 虽然下雨，但是比赛照常进行.\nREQUIRE: 只有努力训练，才能赢比赛.\nWARN: 除非提前热身，否则可能受伤.',
      'Same general topic (a match), three different stances; the frame chosen tells the listener what kind of conversation you want to have.',
      [
        { target: '虽然…但是 (concession)', note: 'soft, polite; gives ground first' },
        { target: '只有…才 (necessity)', note: 'firm; sets a single requirement' },
        { target: '除非…否则 (warning)', note: 'urgent; signals an impending bad outcome' },
      ],
      [ACT.grammarConditional],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '北京一天',
      'Běijīng yī tiān',
      'A six-sentence first-person paragraph describing one day in your Beijing professional life — woven so that each grammar pattern from this review appears at least once. Read it aloud with correct tones and sandhi; you should hear every first-wave feature in less than 90 seconds.',
      'sentence',
      '今天早上七点，我为了避开早高峰就出门了。地铁上人越来越多，我把笔记本电脑紧紧抱在怀里。十点的会议上，王经理把那份报告交给了李总监，但是项目又被推迟了一周。中午我们去吃川菜，虽然辣得我直流泪，但是味道真的越来越好。下午我在中关村比较了两款手机——这款比那款更划算，性价比还高一点。晚上回到宿舍，室友说：除非我们今天就排好下周的家务表，否则又会吵架。',
      'Translation: "At 7am this morning, I left home to avoid the morning rush. The subway got more and more crowded; I held my laptop tightly to my chest. At the 10am meeting, Manager Wang handed that report over to Director Li, but the project was pushed back another week. At lunch we ate Sichuan food — although the spice made me tear up, the flavor really kept getting better. In the afternoon I compared two phones at Zhongguancun — this one is even more worthwhile than that one, and the cost-performance is a bit higher too. Back at the dorm in the evening, my roommate said: unless we settle next week\'s chore schedule today, we\'ll fight again."',
      [
        { target: '为了避开早高峰', note: '为了 + goal — Thematic U2 grammar; 早高峰 — Adult U4 vocab' },
        { target: '地铁上人越来越多', note: '越来越 + adj trend — Thematic U3 grammar; 地铁 — Adult U4 vocab' },
        { target: '把笔记本电脑紧紧抱在怀里', note: '把 + O + V + complement — Adult U2 + Thematic U3 grammar' },
        { target: '王经理把那份报告交给了李总监', note: '把-construction with workplace vocab — Adult U1 + U2' },
        { target: '项目又被推迟了一周', note: '被-passive — cross-unit consolidation; 项目 — Adult U1 vocab' },
        { target: '虽然辣得我直流泪，但是味道越来越好', note: '虽然…但是 + 越来越 stacked — Adult U5 + Thematic U3' },
        { target: '这款比那款更划算', note: '比…更… intensified comparison — Adult U5' },
        { target: '除非…今天就排好…，否则又会吵架', note: '除非…否则 warning — first-wave conditional consolidation' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '理解问题',
      'lǐjiě wèntí',
      'Five comprehension questions matching the paragraph. Answer each in one short Mandarin sentence using grammar from the review — every answer must reuse one of the target patterns to count.',
      'sentence',
      'Q1: 早上几点出门？为什么？\nQ2: 在会议上，王经理把报告交给了谁？\nQ3: 项目怎么了？\nQ4: 两款手机哪款更划算？\nQ5: 室友说什么？',
      'Three factual questions, two grammar-targeted; answers test both content recall and active production.',
      [
        { target: 'A1: 早上七点出门，为了避开早高峰。', note: 'reuses 为了 + goal' },
        { target: 'A2: 王经理把报告交给了李总监。', note: 'reuses 把 + O + V + complement' },
        { target: 'A3: 项目被推迟了一周。', note: 'reuses 被-passive' },
        { target: 'A4: 这款比那款更划算。', note: 'reuses 比…更… intensified comparison' },
        { target: 'A5: 除非今天排好下周的家务表，否则又会吵架。', note: 'reuses 除非…否则 warning' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Listening
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '三人午餐对话',
      'sān rén wǔcān duìhuà',
      'A 6-turn three-person lunch conversation between Manager Wang, colleague Li, and intern Zhang — each turn layers multiple grammar points so the listener has to track several at once. The natural Beijing professional register is polite-but-direct, with face-saving when concessions are needed.',
      'conversation',
      '王经理: 小张，你把上周的销售报告交了吗？\n小张: 交了，王经理。不过那份报告被李姐改了几处。\n李姐: 没事，我只改了数据格式。虽然辛苦了一点，但是比上一版清晰多了。\n王经理: 好。下周的项目，除非我们提前一天把样品送到客户那里，否则赶不上他们的内部评审。\n小张: 我可以打车送过去。我顺路。\n李姐: 越来越像一个团队了。下次午餐，我请大家吃川菜。',
      'Three-person lunch dialogue layering 把/被, 虽然…但是, 比…多了, 除非…否则, and 越来越… into six naturally rhythmed turns.',
      [
        { target: '把上周的销售报告交了 (T1)', note: '把-construction (Adult U2) — workplace project disposal' },
        { target: '被李姐改了几处 (T2)', note: '被-passive — flips the same event from the report\'s perspective' },
        { target: '虽然辛苦了一点，但是…清晰多了 (T3)', note: '虽然…但是 (Adult U5) + plain comparison 比上一版清晰多了 (Adult U5)' },
        { target: '除非我们提前一天把样品送到客户那里，否则赶不上 (T4)', note: '除非…否则 warning + nested 把-construction' },
        { target: '我可以打车送过去 (T5)', note: '打车 (Adult U4) — informal volunteering' },
        { target: '越来越像一个团队了 (T6)', note: '越来越 + adj trend (Thematic U3) — closing warmth' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      '视角转换',
      'shìjiǎo zhuǎnhuàn',
      'Re-tell three turns from the dialogue from a different speaker\'s perspective, flipping 把 ↔ 被 where the perspective shift demands it. This drill proves you can switch active and passive without changing the underlying event.',
      'sentence',
      'ORIGINAL (T1): 小张把上周的销售报告交了。\nFLIPPED: 上周的销售报告被小张交了。\n\nORIGINAL (T2): 那份报告被李姐改了几处。\nFLIPPED: 李姐把那份报告改了几处。\n\nORIGINAL (T4): 我们把样品送到客户那里。\nFLIPPED: 样品被我们送到客户那里。',
      'Each pair narrates the same event from opposite perspectives; the underlying content is identical, only the topic-of-attention shifts.',
      null,
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '写作模板',
      'xiězuò múbǎn',
      'A six-sentence reusable template for your own Beijing-day synthesis paragraph. Fill in each bracketed slot with content from your real or imagined day — the grammar scaffolding does the rest.',
      'sentence',
      '[时间], 我[为了 + 目标] 出门了。 [交通工具]上 [越来越 + 形容词]。 [时间] 的[场合], [人]把[物]交给了[人], 但是 [事情] 被[原因]推迟了。 中午我们去[饭馆类型], 虽然 [缺点], 但是 [优点]。 下午我[活动], [比较句]。 晚上回到[地点], [人]说：除非[条件], 否则[警告]。',
      'Six sentences, each carrying one or two of the review\'s grammar features — fill in and read aloud.',
      [
        { target: '[为了 + 目标]', note: 'goal-frame from Thematic U2 — your morning purpose' },
        { target: '[越来越 + 形容词]', note: 'trend from Thematic U3 — about the subway, weather, mood, or city' },
        { target: '[人]把[物]交给了[人]', note: '把-construction from Adult U2 — your workplace transaction' },
        { target: '被[原因]推迟了', note: '被-passive — the project, meeting, or event that got delayed' },
        { target: '虽然…但是…', note: 'concession from Adult U5 — your lunch experience' },
        { target: '比较句', note: '比…更/还… from Adult U5 — your afternoon shopping decision' },
        { target: '除非…否则…', note: 'warning frame — closing tension with your roommate or about tomorrow' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '写作示例',
      'xiězuò shìlì',
      'A full 6-sentence sample paragraph filled in from the template — proves the scaffolding produces natural Mandarin when used.',
      'sentence',
      '今天早上八点，我为了赶上九点的电话会议出门了。地铁上的人越来越多，差点挤不上去。十点的项目复盘会上，李总监把上周的产品报告交给了王经理，但是评审时间被推到了下周。中午我们去吃了一家麻辣烫，虽然汤底辣了点，但是味道比上次更地道。下午我在Taobao比较了两款蓝牙耳机——这款比那款贵一百块，可是性价比还更高一些。晚上回到宿舍，室友说：除非我们这周末打扫一次卫生，否则下周就请不进朋友了。',
      '"At 8am today, I left home to catch the 9am phone meeting. The subway got more and more crowded — I almost couldn\'t squeeze on. At the 10am project review, Director Li handed last week\'s product report to Manager Wang, but the review time was pushed to next week. At lunch we went for spicy hotpot — although the broth was a bit too hot, the flavor was even more authentic than last time. In the afternoon I compared two Bluetooth headphones on Taobao — this one is 100 yuan more expensive than that one, but the cost-performance is still a bit higher. Back at the dorm in the evening, my roommate said: unless we clean up this weekend, we can\'t invite friends over next week."',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Mixed-Skill Drills
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '混合句 1',
      'Adult U2 + Adult U5',
      '把 + 虽然…但是 stacked: front a definite object before the verb, AND concede a downside before the upside, in one sentence.',
      'sentence',
      '我把那个项目交了，虽然还不太完美，但是已经比第一版好多了。',
      '"I turned that project in — although it\'s not quite perfect yet, it\'s already much better than the first version." — 把-disposal + concessive + plain comparison in one breath.',
      [
        { target: '把那个项目交了', note: '把 + O + V + complement (Adult U2)' },
        { target: '虽然还不太完美，但是…', note: '虽然…但是 concession (Adult U5)' },
        { target: '比第一版好多了', note: 'plain comparison + 多了 (Adult U5)' },
      ],
      [ACT.mixedDrills],
    ),
    createContentItem(
      '混合句 2',
      'Adult U4 + Adult U6 + Thematic U3',
      '不是…就是 + 越来越 stacked: alternation + trend in one breath.',
      'sentence',
      '我每天上班不是坐地铁就是打车，路上的人越来越多，时间也越来越紧。',
      '"Every day getting to work I either take the subway or call a taxi — the people on the road are more and more, and the time is tighter and tighter." — Adult U4 alternation + Thematic U3 trend repeated.',
      [
        { target: '不是…就是…', note: 'either/or alternation (Adult U4)' },
        { target: '越来越多', note: 'trend on quantity (Thematic U3)' },
        { target: '越来越紧', note: 'trend on tightness — same pattern, second domain' },
      ],
      [ACT.mixedDrills],
    ),
    createContentItem(
      '混合句 3',
      'Adult U3 + cross-unit',
      '除非…否则 + 把 stacked: warning + disposal in one breath.',
      'sentence',
      '除非我们今天晚上就把菜单和包间订下来，否则下周的客户晚宴又得改时间了。',
      '"Unless we lock down the menu and private room tonight, next week\'s client dinner will have to be rescheduled again." — 除非…否则 warning + nested 把-construction with Adult U3 dining vocabulary.',
      [
        { target: '除非…否则…', note: 'warning frame — cross-unit consolidation' },
        { target: '把菜单和包间订下来', note: '把 + double O + V + result complement (Adult U2 grammar + Adult U3 vocab)' },
        { target: '又得改时间', note: '又…了 again-frame — Adult U2 schedule vocab' },
      ],
      [ACT.mixedDrills],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '任务: 北京职业一天',
      'rènwù: Běijīng zhíyè yī tiān',
      'Five-scene roleplay covering one full Beijing professional day at Tsinghua. The tutor will switch counterparts between scenes (subway-mate at 7am, manager at 10am, colleague at noon, Taobao seller at 4pm, roommate at 9pm). Hold the right register in each scene — switching cleanly between formal, polite, and casual is itself a Level 2 outcome.',
      'conversation',
      'SCENE 1 (7am 地铁) — subway-mate: 今天怎么这么挤? 你: [for 早高峰 + 越来越 trend]\nSCENE 2 (10am 公司) — 王经理: 你那份报告交了吗? 你: [for 把-construction + 但是 concession]\nSCENE 3 (12pm 川菜馆) — 同事: 今天王经理请客? 你: [for 干杯 + 实在不能再喝 polite decline]\nSCENE 4 (4pm Taobao) — 客服: 您觉得这款怎么样? 你: [for 比…更/还 + 性价比]\nSCENE 5 (9pm 宿舍) — 室友: 这周末要不要去打球? 你: [for 越来越 + 除非…否则 + 锻炼]',
      'Five scenes, five counterparts, five register shifts; the AI tutor will prompt each and respond naturally to whatever you say.',
      [
        { target: 'SCENE 1 grammar target', note: '越来越 (Thematic U3) + 早高峰 vocab (Adult U4)' },
        { target: 'SCENE 2 grammar target', note: '把 + 但是 (Adult U2 + U5)' },
        { target: 'SCENE 3 grammar target', note: '干杯 + face-saving decline (Adult U3)' },
        { target: 'SCENE 4 grammar target', note: '比…更/还 + 性价比 (Adult U5)' },
        { target: 'SCENE 5 grammar target', note: '越来越 + 除非…否则 + 锻炼 (Thematic U2 + U3 + cross-unit)' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战 — 视角翻转',
      'tiǎozhàn — shìjiǎo fānzhuǎn',
      'Stretch goal: in Scene 2 (the 10am stand-up), re-tell the same project update twice — once from your perspective using 把, once from the project\'s perspective using 被. Doing this in real time, with no notes, is the test of whether 把/被 are stable.',
      'conversation',
      'YOU (把): 我把那份报告交了，但是李总监又把它退回来了。\nYOU (被): 那份报告被我交了，但是又被李总监退回来了。',
      'Same event, two perspectives — 你-focused vs 报告-focused. Practice switching between them fluidly; native speakers do this dozens of times in a long meeting.',
      [
        { target: '我把那份报告交了', note: 'actor-focused: I am the topic, the report is the object' },
        { target: '那份报告被我交了', note: 'patient-focused: the report is the topic, I am demoted to the actor slot' },
        { target: '退回来了 (tuì huílai le)', note: 'directional complement — Adult U5 shopping return vocab repurposed for workplace' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
