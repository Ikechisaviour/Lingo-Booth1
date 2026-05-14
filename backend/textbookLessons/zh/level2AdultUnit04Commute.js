// Level 2 Track-Adult Unit 4 — 通勤与日常出行 (Commute & Daily Logistics — Mandarin Chinese)
// Builds on Level 1 Unit 13 (Transportation): now the working-professional
// commute in a major Chinese city. Subway lines, ride-share, bike-share,
// company shuttles, traffic jams, license-plate restrictions, 北漂 reality.
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
  orientation: 'zh-l2au4-orientation',
  pronunciation: 'zh-l2au4-pronunciation',
  vocabularyTransit: 'zh-l2au4-vocab-transit',
  vocabularyProblems: 'zh-l2au4-vocab-problems',
  grammarFromTo: 'zh-l2au4-grammar-from-to',
  grammarApprox: 'zh-l2au4-grammar-approx',
  grammarEither: 'zh-l2au4-grammar-either',
  reading: 'zh-l2au4-reading',
  listening: 'zh-l2au4-listening',
  writing: 'zh-l2au4-writing',
  culture: 'zh-l2au4-culture',
  task: 'zh-l2au4-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Describe a real Beijing commute formally — start point, end point, transit mode, transfer, total time — using working-professional vocabulary.',
      'Explain the typical problems (traffic jams, delays, reroutes, rush-hour crowding) and your everyday workarounds (subway, shared bike, ride-share, company shuttle).',
      'Use Chinese map and ride apps (高德地图, 百度地图, 滴滴, 美团单车) by name when a coworker asks how you plan your route.',
    ],
    task: 'Imagine you live in a 五环 (5th-ring) apartment and commute to Tsinghua / 中关村 every day — by the end of this lesson you should be able to explain the whole 60–80 minute route to a new coworker without rehearsing each line.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: '发音 — Commute words with tricky tones and finals',
    goals: [
      'Distinguish the retroflex initial in 通勤 (tōngqín) from the palatal initial in 拥挤 (yōngjǐ) — both appear constantly in commute talk and learners often blur them.',
      'Apply third-tone sandhi in 早高峰 (zǎo gāofēng) and 拥挤 (yōngjǐ) — the third tone before a non-third tone keeps a low contour, not the full dip-and-rise.',
      'Master the rounded final in 共享 (gòngxiǎng) and the -ng nasal in 顺风车 (shùnfēng chē).',
    ],
    task: 'Read each commute phrase aloud three times, identify which sandhi (if any) applies, and pronounce the spoken version with natural rhythm.',
  },
  {
    id: ACT.vocabularyTransit,
    section: 'Vocabulary I',
    title: 'Transit modes, lines, and digital tools',
    goals: [
      'Use 12 working-professional commute terms: 通勤 (commute), 地铁 (subway), 公交 (public bus), 共享单车 (shared bike), 网约车 (ride-share), 顺风车 (carpool), 班车 (company shuttle), 高峰期 / 早高峰 / 晚高峰 (rush hour).',
      'Name Beijing subway lines correctly (10号线, 13号线, 4号线), state distances by ring road (二环, 三环, 五环), and refer to map and ride apps by their brand names (高德 Gaode, 百度 Baidu, 滴滴 Didi).',
    ],
    task: 'Describe your own commute in three to five sentences using at least one transit mode, one line number, one rush-hour term, and one app name.',
  },
  {
    id: ACT.vocabularyProblems,
    section: 'Vocabulary II',
    title: 'Problems, durations, and ride logistics',
    goals: [
      'Use 8 problem words: 堵车 (traffic jam), 迟到 (late), 误点 (delayed), 改道 (reroute), 拥挤 (crowded), 限行 (driving restriction), 摇号 (plate lottery), 加班 (overtime).',
      'State durations precisely: 单程 (one-way), 一个小时 (an hour), 半个小时 (half hour), 一刻钟 (a quarter hour) — and distinguish 大概 / 大约 (approximate) from 正好 (exactly).',
    ],
    task: 'Pick three commute problems you actually face and describe each one in one full sentence using both a problem word and a duration.',
  },
  {
    id: ACT.grammarFromTo,
    section: 'Grammar I',
    title: '从…到… extended — from A to B with time and distance',
    goals: [
      'Extend the basic 从…到… pattern with specific time spans (从早上七点到八点) and distance specifications (从五环到中关村大概二十公里).',
      'Combine 从…到… with a verb phrase to describe the whole commute in one sentence: 我从家到公司每天要花一个小时.',
      'Place 大概 / 大约 inside the 从…到… frame to approximate the duration or distance naturally.',
    ],
    task: 'Write three sentences using 从…到…: one with a time span, one with a distance, one with a total duration.',
  },
  {
    id: ACT.grammarApprox,
    section: 'Grammar II',
    title: '大概 / 大约 + duration or quantity — approximation',
    goals: [
      'Use 大概 (dàgài) and 大约 (dàyuē) interchangeably before a number or duration to mean "about / approximately"; both feel natural in working-professional speech.',
      'Place the approximator BEFORE the quantity (大概一个小时, NOT 一个小时大概) — Mandarin word order is fixed for adverbial approximators.',
      'Combine with 左右 (zuǒyòu, "or so") for double-hedged estimates: 大概一个小时左右 ("about an hour or so") — common in casual commute reports.',
    ],
    task: 'Estimate the duration of three parts of your commute (door-to-subway, subway ride, subway-to-office) using 大概 or 大约.',
  },
  {
    id: ACT.grammarEither,
    section: 'Grammar III',
    title: '不是…就是… — either A or B (routine alternatives)',
    goals: [
      'Use 不是 X 就是 Y to express "either X or Y" when the speaker views both options as the only realistic possibilities — perfect for ranting about a routine commute: 不是堵车就是迟到 ("it\'s either traffic or being late").',
      'Distinguish from 或者 (huòzhě, "or") which is neutral; 不是…就是… carries a tone of resignation, exasperation, or "always one of these two".',
      'Apply with both noun phrases (不是地铁就是公交) and verb phrases (不是堵车就是改道) — the slots fill with parallel grammar.',
    ],
    task: 'Write three 不是…就是… sentences about your weekly commute reality: one with two transit modes, one with two problems, one with two outcomes.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: '阅读与口语 — A Beijing commute story',
    goals: [
      'Read a first-person paragraph about a 北漂 commuter\'s daily route from 五环 to 中关村 with natural rush-hour and app vocabulary.',
      'Answer four comprehension questions about route, duration, and problems using full sentences with the patterns from Grammars I–III.',
    ],
    task: 'Read the paragraph aloud once, then answer the four comprehension questions in short complete sentences.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: '听力与口语 — Coworker asks about your commute',
    goals: [
      'Follow a 7-turn workplace dialogue between two coworkers comparing commutes, with natural use of 从…到…, 大概, and 不是…就是… patterns.',
      'Reproduce the dialogue with your own commute information swapped in (your apartment ring road, your subway line, your real total time).',
    ],
    task: 'Read the dialogue along with the tutor first, then perform it again with your own information.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: '写作 — Describe your commute in 5–6 sentences',
    goals: [
      'Write 5–6 sentences in Hanzi covering route (from / to), modes (subway + bike or shuttle), rush-hour timing, total duration, and one typical problem.',
      'Use at least one 从…到…, one 大概 / 大约, and one 不是…就是… so the writing demonstrates all three grammar points of the lesson.',
    ],
    task: 'Write your own 5–6 sentence commute description, then read it aloud with correct tones and natural rhythm.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: '文化点 — Beijing\'s commute reality: 五环, 摇号, 限行, 北漂',
    goals: [
      'Understand Beijing\'s notorious 5-ring-road traffic problem, why most commuters avoid driving, and how the 限行 (license-plate-based daily driving restrictions) shape weekly routines.',
      'Know what 摇号 (the plate lottery) is — that getting a Beijing license plate can take 5+ years of monthly lotteries — and why this drives the dominance of the subway, shared bikes, and ride-share.',
      'Recognize the 北漂 (Beijing drifter) phenomenon: young professionals who live far out (五环, 六环, 通州, 燕郊) because rent is cheaper, then accept 90+ minute commutes — and how remote work post-2020 has partly reshaped this in tech.',
    ],
    task: 'Compare Beijing\'s commute system to your home city — name one thing Beijing handles better and one thing it handles worse.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: '任务 — Explain your commute to a new coworker',
    goals: [
      'Combine every skill from this lesson in a single continuous workplace conversation: greet, describe route, state mode and duration, mention one problem, recommend an app.',
      'Use the right register (peer-to-peer, polite but casual) for a new-coworker introduction at a 中关村 tech company.',
    ],
    task: 'Roleplay your first week at a Tsinghua-area tech company — a new coworker asks how you got in this morning, and you explain the whole route. Aim for a 6–7 turn exchange.',
  },
];

const lesson = {
  title: '第二级（成人）· 第4单元: 通勤与日常出行 (Commute & Daily Logistics)',
  category: 'travel',
  difficulty: 'intermediate',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'workplace',
  activities,
  expressionPractice: [
    { id: 'describing-commute', label: 'Describing your commute', goal: 'Use 从…到… with mode and duration to give a complete commute snapshot in two sentences.' },
    { id: 'estimating-time', label: 'Estimating time and distance', goal: 'Use 大概 / 大约 + duration to approximate naturally, optionally adding 左右 for an extra hedge.' },
    { id: 'venting-routine', label: 'Venting about routine problems', goal: 'Use 不是…就是… to express the "always one of these two" feeling about commute frustrations.' },
    { id: 'recommending-app', label: 'Recommending a commute app', goal: 'Suggest 高德, 百度, or 滴滴 with one reason each in a peer-to-peer register.' },
  ],
  relatedPools: ['topic-travel', 'topic-work'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '本课目标',
      'běn kè mùbiāo',
      'By the end of this lesson, you can describe a real Beijing working-professional commute — start point, end point, transit modes, rush-hour timing, total duration, and one typical problem — in one continuous explanation without rehearsing each line.',
      'word',
      'Functions: 描述路线 (describe route) · 估算时间 (estimate time) · 抱怨问题 (vent about problems) · 推荐工具 (recommend tools)',
      'These four micro-skills are the spine of every workplace commute conversation in Mandarin — once they\'re automatic, you can hold your own with any 中关村 coworker.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      '真实场景',
      'zhēnshí chǎngjǐng',
      'You live in a small apartment near 五环 (the 5th ring road) and work in 中关村 — Beijing\'s Silicon Valley. Every morning you face the same question from new coworkers: "How long is your commute?" — and the answer is never simple.',
      'word',
      '新同事: "你住哪儿？通勤要多久？"',
      'A typical Mainland workplace opener after a few weeks on the job: where do you live + how long is your commute — the basic small-talk loop for new colleagues in a Chinese tech company.',
      [
        { target: '你住哪儿? nǐ zhù nǎr?', note: 'casual peer question; uses Beijing-flavored 哪儿 instead of standard 哪里' },
        { target: '通勤要多久? tōngqín yào duōjiǔ?', note: 'literally "commute needs how-long?"; the standard total-time question in workplace small talk' },
        { target: '中关村 Zhōngguāncūn', note: 'Beijing\'s tech district near Tsinghua and Peking University; home to Baidu, Lenovo, and countless startups' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '通勤现实',
      'tōngqín xiànshí',
      'A typical 北漂 (Beijing drifter) commute looks like this: 8–10 minutes door-to-subway by 共享单车 (shared bike), 35–45 minutes underground including one transfer, then another 5–10 minutes from station to office. Total: 60–80 minutes one-way, or roughly 2.5 hours per workday spent in transit.',
      'word',
      '单程 60-80 分钟 · 一个工作日 2.5 小时通勤',
      'These numbers shape almost every other choice in a young Beijing professional\'s life — when to eat dinner, where to live, whether to bring lunch — so they come up constantly.',
      [
        { target: '北漂 běi piāo', note: '"Beijing drifter" — a young professional from elsewhere working in Beijing without local hukou (household registration), usually living far from work for cheaper rent' },
        { target: '单程 dānchéng', note: '"one-way"; standard commute-talk word — contrasts with 往返 (wǎngfǎn, "round trip")' },
        { target: '一个工作日 yí ge gōngzuòrì', note: '"one workday"; common measure unit for explaining cumulative time costs' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '通勤',
      'tōngqín',
      'A two-syllable compound: 通 (first tone, high level) + 勤 (second tone, rising). The initial q- in 勤 is the palatal /tɕʰ/ — soft, aspirated, with the tongue forward on the upper teeth. NOT the English /k/ that the letter "q" usually suggests.',
      'word',
      '我每天通勤一个多小时。',
      'The single most central word of this lesson; mispronouncing the q- here marks you as a beginner immediately.',
      [
        { target: '通 (tōng, 1st)', note: 'high level tone; initial t- is unaspirated, like English "t" in "stop"' },
        { target: '勤 (qín, 2nd)', note: 'rising tone; initial q- is palatal /tɕʰ/, the soft "ch" of Pinyin not the hard "k" of English' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '拥挤',
      'yōngjǐ',
      'Two-syllable compound: 拥 (first tone) + 挤 (third tone). The initial j- in 挤 is the palatal /tɕ/ — soft, unaspirated. Both syllables use front-of-mouth articulation. In running speech, the third tone 挤 reduces to a low pitch (no full dip-and-rise) before a pause.',
      'word',
      '早高峰地铁特别拥挤。',
      'A core commute word; appears every time you describe rush-hour conditions.',
      [
        { target: '拥 (yōng, 1st)', note: 'high level tone with -ong nasal final; the lips round slightly' },
        { target: '挤 (jǐ, 3rd)', note: 'third tone; initial j- is palatal /tɕ/, NOT the English "j" of "jam"' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '高峰',
      'gāofēng',
      'Two-syllable compound: 高 (first tone) + 峰 (first tone) — both high level. A clean two-first-tone pair, easy to pronounce once you commit to staying at the top of your pitch range for both syllables. Listen for the -eng final in 峰: an unrounded "uh-ng" sound.',
      'word',
      '早高峰从七点到九点。',
      'Used constantly in commute talk; appears in 早高峰 (morning rush), 晚高峰 (evening rush), 高峰期 (peak period).',
      [
        { target: '高 (gāo, 1st)', note: 'high level; final -ao is the diphthong /aʊ/, like English "ow"' },
        { target: '峰 (fēng, 1st)', note: 'high level; final -eng is /əŋ/, a schwa + -ng (NOT the bright "eng" of English "length")' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '共享',
      'gòngxiǎng',
      'Two-syllable compound: 共 (fourth tone) + 享 (third tone). The fourth tone falls sharply; the third tone in this position (before a noun) reduces to a low pitch — no full dip-and-rise. The initial g- in 共 is unaspirated /k/; the initial x- in 享 is palatal /ɕ/, like a softer English "sh".',
      'word',
      '我每天用共享单车。',
      'Critical for talking about Beijing\'s ubiquitous shared-bike system; appears in 共享单车 (shared bike), 共享汽车 (car-share), 共享办公 (co-working).',
      [
        { target: '共 (gòng, 4th)', note: 'sharp falling tone; initial g- is unaspirated /k/, not voiced like English g' },
        { target: '享 (xiǎng, 3rd)', note: 'third tone; initial x- is palatal /ɕ/, softer than English "sh"' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '顺风车',
      'shùnfēng chē',
      'Three syllables: 顺 (fourth tone, retroflex sh-) + 风 (first tone, -eng nasal) + 车 (first tone, retroflex ch-). Two retroflex initials in three syllables — keep the tongue curled back for both 顺 and 车 without flattening into English "sh"/"ch".',
      'word',
      '今天我坐顺风车回家。',
      'Refers to carpooling apps where a regular commuter picks up paying passengers heading the same way — much cheaper than 网约车 (ride-share).',
      [
        { target: '顺 (shùn, 4th)', note: 'retroflex sh- with tongue curled back; final -un is actually -uen with the e elided' },
        { target: '风 (fēng, 1st)', note: 'high level with -eng nasal final' },
        { target: '车 (chē, 1st)', note: 'retroflex ch- aspirated; final -e is the unrounded back vowel /ɤ/' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '堵车',
      'dǔchē',
      'Two-syllable compound: 堵 (third tone) + 车 (first tone). The third tone before a non-third tone reduces to a low pitch — no full dip-and-rise. The initial d- in 堵 is unaspirated /t/, NOT voiced English d.',
      'word',
      '五环天天堵车。',
      'The single most common commute complaint in Beijing; you will hear and say it daily.',
      [
        { target: '堵 (dǔ, 3rd)', note: 'third tone reduced to low pitch before a first tone; initial d- unaspirated' },
        { target: '车 (chē, 1st)', note: 'high level; same retroflex ch- as in 顺风车' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Transit modes & digital tools
    // ────────────────────────────────────────────────────────────────────
    createContentItem('通勤', 'tōngqín', 'The act of commuting between home and work. Used as both noun (一小时通勤 "a one-hour commute") and verb (我通勤一小时 "I commute one hour"). More formal than the casual 上下班 (shàngxiàbān, "going to and from work").', 'word', '我每天通勤大概一个半小时。', 'Standard professional self-description; instantly signals working-adult vocabulary, not student speech.', null, [ACT.vocabularyTransit]),
    createContentItem('地铁', 'dìtiě', 'Subway / metro system. Beijing has 27+ lines covering nearly the whole 5-ring area; line names are formed by 数字 + 号线 (number + 号线): 1号线, 10号线, 13号线. The backbone of any Beijing commute.', 'word', '我坐10号线去公司。', '"I take Line 10 to the office" — the standard formula for stating which subway line you ride.', null, [ACT.vocabularyTransit]),
    createContentItem('地铁站', 'dìtiězhàn', 'A subway station. Often combined with the station name: 五道口地铁站 ("Wudaokou Subway Station"). Stations in central Beijing typically have 4–8 numbered exits (出口 chūkǒu), and giving directions usually includes the exit number.', 'word', '从地铁站到公司走五分钟。', 'Standard way to describe the last leg of a commute — station to office on foot.', null, [ACT.vocabularyTransit]),
    createContentItem('公交', 'gōngjiāo', 'Public bus — short for 公共交通 (gōnggòng jiāotōng, "public transit") but in everyday speech specifically means city buses. Routes are numbered (110路, 332路) and the buses are usually cheaper but slower than the subway due to traffic.', 'word', '坐公交比地铁慢但便宜。', 'A typical commuter trade-off observation; uses the 比 comparison structure to weigh bus vs subway.', null, [ACT.vocabularyTransit]),
    createContentItem('共享单车', 'gòngxiǎng dānchē', 'Dockless shared bicycle — the QR-code-unlocked bikes that flooded Beijing around 2016 and reshaped first-mile and last-mile commuting. Main brands: 美团单车 (Meituan), 哈啰单车 (Hello), 青桔单车 (Qingju). Used heavily for the home-to-subway leg.', 'word', '我每天骑共享单车到地铁站。', 'The single most common first-mile commute pattern for Beijing professionals living far from a subway station.', null, [ACT.vocabularyTransit]),
    createContentItem('网约车', 'wǎngyuē chē', 'Ride-share / online-hailed car — the umbrella term for taxi-like services booked through an app. Main brands: 滴滴 (Didi, by far the biggest), 高德打车 (Gaode hailing), 美团打车. More expensive than transit but used during rush hour breakdowns or late nights.', 'word', '加班晚了就打个网约车回家。', '"If overtime runs late, just hail a ride home" — typical fallback option for white-collar workers.', null, [ACT.vocabularyTransit]),
    createContentItem('顺风车', 'shùnfēng chē', 'Carpool / ride-along — a paying passenger rides with a private-car owner who is already going the same direction. Significantly cheaper than 网约车 but slower (driver may take a longer route, pick up other passengers). Most popular for long inter-suburb commutes.', 'word', '顺风车比网约车便宜一半。', 'Standard cost comparison; 一半 = "half" — typical price ratio in Beijing.', null, [ACT.vocabularyTransit]),
    createContentItem('班车', 'bānchē', 'Company shuttle bus — provided by larger employers (especially tech companies, factories, and universities) to ferry employees between major transit hubs or residential clusters and the office. Free for employees and often the most efficient option if available.', 'word', '我们公司有班车去地铁站。', 'A typical perk of working at a large 中关村 tech firm — saves the most painful first/last-mile segment.', null, [ACT.vocabularyTransit]),
    createContentItem('打车', 'dǎchē', 'To hail a ride / catch a taxi — covers both flagging a street taxi and booking through an app. The standard verb when you decide to skip transit. 打 (dǎ) literally means "hit/strike", but in this compound functions as a generic "do" verb.', 'word', '下雨了，咱们打车吧。', '"It\'s raining, let\'s grab a cab" — typical impromptu commute decision; 咱们 includes the listener.', null, [ACT.vocabularyTransit]),
    createContentItem('号线', 'hàoxiàn', 'The classifier for subway lines — used after a number: 1号线 (Line 1), 10号线 (Line 10), 13号线 (Line 13). Beijing\'s busiest commuter lines for tech workers are 10号线 (which loops around) and 13号线 (which serves 五道口, the Tsinghua-area station).', 'word', '13号线去五道口最方便。', '"Line 13 is the most convenient way to Wudaokou" — the typical recommendation phrasing.', null, [ACT.vocabularyTransit]),
    createContentItem('五环', 'wǔ huán', 'The 5th ring road — Beijing\'s third-outermost ring expressway, roughly 14–18 km from the city center. "五环外" (outside the 5th ring) is shorthand for far-suburb living; "五环内" (inside the 5th ring) is the dividing line for "still reasonably central". A weekly conversation topic for Beijing renters.', 'word', '我住在五环外，房租便宜很多。', 'Standard self-explanation for why a young professional accepts the long commute — cheaper rent.', null, [ACT.vocabularyTransit]),
    createContentItem('中关村', 'Zhōngguāncūn', 'Beijing\'s technology district in the 海淀 (Haidian) area, adjacent to Tsinghua and Peking universities. Home to Baidu, Lenovo, Sina, Xiaomi (originally), Sohu, and hundreds of startups — often called China\'s Silicon Valley. The destination for most tech-worker commutes in this lesson.', 'word', '中关村的公司大多在地铁线附近。', '"Most Zhongguancun companies are near subway lines" — a typical observation about why subway commuting works for the area.', null, [ACT.vocabularyTransit]),
    createContentItem('五道口', 'Wǔdàokǒu', 'A specific station/neighborhood on Line 13, immediately east of Tsinghua\'s east gate. Famous as a student/young-professional hub with bars, ramen shops, and dense rentals; often the gateway between the Tsinghua/PKU campus area and the broader Haidian tech corridor.', 'word', '我在五道口下车，然后骑车去清华。', 'A typical multi-leg commute description for someone working at Tsinghua but living elsewhere on Line 13.', null, [ACT.vocabularyTransit]),
    createContentItem('高德地图', 'Gāodé dìtú', 'Gaode Maps (Amap) — one of the two dominant Chinese map apps, owned by Alibaba. The default for most Beijing commuters because of accurate real-time traffic and integrated ride-hailing (高德打车). Locals will recommend it for driving routes specifically.', 'word', '高德地图的实时路况最准。', '"Gaode Maps\' real-time traffic is the most accurate" — a typical app recommendation reason among Beijing drivers.', null, [ACT.vocabularyTransit]),
    createContentItem('百度地图', 'Bǎidù dìtú', 'Baidu Maps — the other dominant Chinese map app, often preferred for transit (subway + bus) directions and indoor navigation in shopping malls. Locals tend to use 百度 for transit and 高德 for driving, though this is gradually blurring.', 'word', '坐地铁的话百度地图更好用。', '"For taking the subway, Baidu Maps is more useful" — typical app-choice reasoning by transit users.', null, [ACT.vocabularyTransit]),
    createContentItem('滴滴', 'Dīdī', 'Didi Chuxing — China\'s dominant ride-share app (网约车 platform). The verb 打滴滴 ("hail a Didi") is used so generically it functions like "Uber" did in English. Offers 快车 (express, cheap), 专车 (premium), 顺风车 (carpool), and traditional 出租 (taxi) tiers.', 'word', '下班直接打滴滴回家。', '"After work I just hail a Didi home" — common late-evening fallback when transit feels too slow.', null, [ACT.vocabularyTransit]),
    createContentItem('12306', 'yāo èr sān líng liù', 'The Chinese national railway booking app/website — used for booking 高铁 (high-speed rail) and regular trains between cities. Not for daily intra-Beijing commute, but essential for weekend trips home or business trips to other cities. Note the spelling number "1" as 幺 (yāo) in spoken numbers.', 'word', '我在12306订了周末回家的票。', 'Standard sentence for explaining a weekend train trip; common topic among 北漂 missing family.', null, [ACT.vocabularyTransit]),
    createContentItem('公里', 'gōnglǐ', 'Kilometer — the standard distance measure in mainland China. Pronounced gōng-lǐ; the second character 里 is third tone. Used routinely in commute descriptions: 从五环到中关村大概十公里 ("about 10 km from the 5th ring to Zhongguancun").', 'word', '单程大概二十公里。', '"About 20 km one-way" — a standard distance statement that captures commute scale at a glance.', null, [ACT.vocabularyTransit]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: Problems, durations, ride logistics
    // ────────────────────────────────────────────────────────────────────
    createContentItem('堵车', 'dǔchē', 'A traffic jam — the single most common commute complaint in Beijing. Used as both noun (堵车很严重 "the jam is bad") and verb (路上堵车了 "got jammed on the road"). The 5th ring road and the 三环 are notorious for daily jams during rush hour.', 'word', '今天又堵车，迟到了。', '"Got stuck in traffic again today, was late" — the universal Beijing apology for arriving past 9 AM.', null, [ACT.vocabularyProblems]),
    createContentItem('迟到', 'chídào', 'To be late (to work, school, a meeting). The standard professional word for tardiness; carries mild but real social consequences in Mainland workplaces where punctuality matters. Pair with 因为 to explain the cause: 因为堵车迟到了 ("late because of traffic").', 'word', '我今天迟到了十分钟。', 'Standard self-report when you arrive late; the specific minute count makes it more honest and apologetic.', null, [ACT.vocabularyProblems]),
    createContentItem('误点', 'wùdiǎn', 'Delayed / off-schedule (of trains, buses, flights, subways). More specific than the general 晚 (wǎn, "late"); used when a scheduled service runs behind. Common in commute talk during weather problems or signal issues on the subway.', 'word', '13号线又误点了，等了二十分钟。', '"Line 13 was delayed again, waited 20 minutes" — typical morning rant for Wudaokou-area commuters.', null, [ACT.vocabularyProblems]),
    createContentItem('改道', 'gǎidào', 'To reroute / detour — the road or transit line takes a different path due to construction, an accident, or a road closure. Used as a verb (公交改道了 "the bus rerouted") and noun (临时改道 "temporary detour"). Common cause of unexpected commute delays.', 'word', '前面有事故，公交改道了。', '"There\'s an accident ahead, the bus is rerouting" — typical mid-commute announcement from a driver.', null, [ACT.vocabularyProblems]),
    createContentItem('拥挤', 'yōngjǐ', 'Crowded — used for spaces with too many people: subways, buses, sidewalks. More formal and descriptive than 挤 (jǐ) alone, which is often a verb ("to squeeze"). The standard adjective for describing Beijing rush-hour subway cars.', 'word', '早高峰的地铁特别拥挤。', '"The morning rush subway is especially crowded" — a default observation about Beijing transit.', null, [ACT.vocabularyProblems]),
    createContentItem('限行', 'xiànxíng', 'Driving restriction based on the last digit of your license plate. Beijing rotates restrictions by weekday (e.g., plates ending in 1 and 6 can\'t drive on Mondays inside the 5th ring during rush hours). Drivers must memorize the day their plate is restricted and use transit on that day.', 'word', '今天我的车限行，只能坐地铁。', '"My car is restricted today, can only take the subway" — a normal weekly explanation in Beijing.', null, [ACT.vocabularyProblems]),
    createContentItem('摇号', 'yáohào', 'License-plate lottery — the system by which Beijing allocates a limited number of new car plates each month. Tens of thousands apply for thousands of slots; the wait time has stretched to 5+ years for non-EV plates. The dominant reason young Beijingers don\'t own cars.', 'word', '我摇号摇了三年还没中。', '"I\'ve been in the plate lottery for three years and still haven\'t won" — extremely common complaint among hopeful car-buyers.', null, [ACT.vocabularyProblems]),
    createContentItem('加班', 'jiābān', 'Overtime / to work overtime. A defining feature of Chinese tech-industry life (the controversial "996" culture: 9 AM to 9 PM, 6 days). Heavy overtime shifts the commute home from the 6 PM 晚高峰 to 9–10 PM, when transit thins out and ride-share becomes the default.', 'word', '加班到九点，地铁都快没了。', '"Worked overtime until 9, the subway is almost done for the day" — typical late-night dilemma.', null, [ACT.vocabularyProblems]),
    createContentItem('早高峰', 'zǎo gāofēng', 'Morning rush hour — roughly 7:00–9:30 AM in Beijing, with the peak around 8:00–8:45. Subway frequency is high but cars are packed; station entrances may have lines outside before security screening. The defining experience of being a Beijing white-collar worker.', 'word', '早高峰一定要避开换乘大站。', '"During morning rush, definitely avoid transfer-mega stations" — practical advice for new commuters.', null, [ACT.vocabularyProblems]),
    createContentItem('晚高峰', 'wǎn gāofēng', 'Evening rush hour — roughly 5:30–8:00 PM, depending on the area. Generally even worse than morning rush because work end-times vary and a wider window of people exits offices simultaneously, while traffic for ride-share peaks the same hours.', 'word', '晚高峰打车要等很久。', '"During evening rush, hailing a ride takes a long wait" — the basic reason transit beats ride-share at this hour.', null, [ACT.vocabularyProblems]),
    createContentItem('单程', 'dānchéng', 'One-way — used to specify the duration or distance of a single trip leg, as opposed to 往返 (wǎngfǎn, "round-trip"). When stating commute time, 单程 is the default unit: 单程一个小时 ("an hour one-way").', 'word', '单程要花一个多小时。', '"Takes more than an hour one-way" — standard way to report your commute scale without doubling the time.', null, [ACT.vocabularyProblems]),
    createContentItem('一个小时', 'yí ge xiǎoshí', 'One hour — the standard unit for commute time. Note the 一 sandhi: yī becomes yí before the fourth tone in 个 (ge, originally gè). The classifier 个 is required between 一 and 小时.', 'word', '从家到公司一个小时。', '"From home to the office is one hour" — the simplest possible commute statement.', null, [ACT.vocabularyProblems]),
    createContentItem('半个小时', 'bàn ge xiǎoshí', 'Half an hour. Note that 半 follows the same pattern as a number with 个 as the classifier: 半个小时, NOT 半小时 in spoken Mainland Mandarin. Used for shorter commute legs or for the segment of a longer commute.', 'word', '从地铁站走半个小时太远了。', '"Half an hour\'s walk from the subway station is too far" — typical complaint about apartment-hunting trade-offs.', null, [ACT.vocabularyProblems]),
    createContentItem('一刻钟', 'yí kè zhōng', 'A quarter hour (15 minutes) — a slightly old-fashioned but still common spoken unit. Often used for the bike-or-walk segments of a commute: 骑车一刻钟 ("a quarter-hour bike ride"). 三刻钟 = 45 minutes is also heard.', 'word', '骑共享单车到地铁站差不多一刻钟。', '"About a quarter hour by shared bike to the subway station" — typical first-mile estimate.', null, [ACT.vocabularyProblems]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar I: 从…到… extended
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '从…到… 基本用法',
      'cóng…dào… jīběn yòngfǎ',
      'The basic 从 A 到 B pattern means "from A to B" and works for places (从北京到上海), times (从早上到晚上), and abstract endpoints (从开始到结束). The two nouns slot in directly without further markers; the whole frame can serve as a topic, adverbial, or full predicate.',
      'sentence',
      '从家到公司大概一个小时。',
      '"From home to the office is about an hour" — the prototype 从…到… sentence in commute talk; 大概 + duration completes it.',
      [
        { target: '从 cóng', note: 'preposition "from"; marks the starting point' },
        { target: '到 dào', note: 'preposition "to"; marks the ending point' },
        { target: '从 A 到 B + duration', note: 'the standard commute-description frame; duration appears AFTER the 从…到… span' },
      ],
      [ACT.grammarFromTo],
    ),
    createContentItem(
      '从…到… 时间',
      'cóng…dào… shíjiān',
      'Use 从…到… with time points (从早上七点到八点 "from 7 to 8 AM") to specify a time span. This is essential for stating rush-hour windows, office hours, and shuttle schedules. The pattern works identically with clock times, days, and months.',
      'sentence',
      '从早上七点到九点是早高峰。',
      '"From 7 to 9 AM is morning rush hour" — a typical time-span statement using 从…到… as the topic.',
      [
        { target: '从早上七点到八点', note: 'from 7 to 8 AM — clock-time span' },
        { target: '从周一到周五', note: 'from Monday to Friday — weekday span' },
        { target: '从八月到十月', note: 'from August to October — month span' },
      ],
      [ACT.grammarFromTo],
    ),
    createContentItem(
      '从…到… 距离',
      'cóng…dào… jùlí',
      'Use 从…到… with distance specifications: 从五环到中关村大概十公里 ("from the 5th ring to Zhongguancun is about 10 km"). The distance can be measured in 公里 (km), 站 (subway stops), or general units like 一段路 ("a stretch of road").',
      'sentence',
      '从我家到地铁站大概两公里。',
      '"From my home to the subway station is about 2 km" — typical first-mile description for bike-eligible commuters.',
      [
        { target: '大概 + number + 公里', note: 'common distance hedge; 大概 = approximately' },
        { target: 'number + 站', note: 'subway-stop count: 五站 = 5 stops' },
        { target: '一段路 yí duàn lù', note: 'a stretch of road — vague but natural for short walking segments' },
      ],
      [ACT.grammarFromTo],
    ),
    createContentItem(
      '从…到… 复合动词',
      'cóng…dào… fùhé dòngcí',
      'Combine 从…到… with a full verb phrase to describe the whole commute action: 我每天从家到公司花一个小时 ("I spend an hour daily going from home to the office"). The verb (花 spend, 走 walk, 骑 ride, 坐 take) describes HOW the span is traversed.',
      'sentence',
      '我每天从家骑车到地铁站，然后坐地铁到公司。',
      '"I bike from home to the subway station every day, then take the subway to the office" — chained 从…到… legs are typical for multi-modal commutes.',
      [
        { target: '从家骑车到地铁站', note: 'bike segment; 骑车 ("ride a bike") is the verb embedded in the span' },
        { target: '坐地铁到公司', note: 'subway segment; 坐 ("take/ride") is the standard verb for buses, subways, trains' },
        { target: '然后 ránhòu', note: '"then"; the standard connector between two commute legs' },
      ],
      [ACT.grammarFromTo],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar II: 大概 / 大约 approximation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '大概',
      'dàgài',
      '"Approximately / about" — placed immediately before a number, duration, or quantity to hedge the precision. 大概一个小时 ("about an hour"), 大概五公里 ("about 5 km"). Slightly more conversational than 大约; both are interchangeable in commute talk.',
      'sentence',
      '从家到公司大概一个半小时。',
      '"From home to the office is about 1.5 hours" — a typical hedged commute report.',
      [
        { target: '大概 + duration', note: '大概一个小时, 大概半个小时, 大概一刻钟' },
        { target: '大概 + distance', note: '大概十公里, 大概两站地' },
        { target: '大概 + quantity', note: '大概三十人, 大概两百块' },
      ],
      [ACT.grammarApprox],
    ),
    createContentItem(
      '大约',
      'dàyuē',
      '"Approximately / about" — synonym of 大概, slightly more formal/written and very common in news reporting. In speech, 大概 and 大约 are interchangeable; using 大约 sounds slightly more deliberate or precise. Both go in the same position: BEFORE the number.',
      'sentence',
      '我每天通勤大约一个小时。',
      '"My daily commute is approximately one hour" — slightly more polished than 大概一个小时.',
      [
        { target: '大约 = 大概', note: 'fully interchangeable in speech; pick by feel' },
        { target: '大约 (written)', note: 'slightly preferred in news, formal writing, and official notices' },
        { target: '大概 (spoken)', note: 'slightly preferred in casual peer conversation' },
      ],
      [ACT.grammarApprox],
    ),
    createContentItem(
      '位置规则',
      'wèizhì guīzé',
      'Word-order rule: 大概 / 大约 must come BEFORE the number. 大概一个小时 is correct; 一个小时大概 is wrong. This contrasts with English "an hour or so" where the hedge follows; in Mandarin, the adverbial approximator slot is fixed pre-quantity.',
      'sentence',
      'CORRECT: 大概一个小时 / 大约二十公里\nWRONG: 一个小时大概 / 二十公里大约',
      'A frequent learner error; English speakers tend to imitate "an hour or so" and place 大概 after the number.',
      [
        { target: '大概 + quantity ✓', note: '大概 always precedes the number' },
        { target: 'quantity + 大概 ✗', note: 'ungrammatical word order' },
        { target: 'compare to English', note: '"about an hour" matches Chinese order; "an hour or so" does NOT' },
      ],
      [ACT.grammarApprox],
    ),
    createContentItem(
      '左右',
      'zuǒyòu',
      'Literal "left-right" — used AFTER a number to mean "or so / approximately". Often combined with 大概 / 大约 for a double-hedged estimate: 大概一个小时左右 ("about an hour or so"). 左右 alone is also common: 一个小时左右. The double form sounds slightly more colloquial.',
      'sentence',
      '我每天通勤大概一个小时左右。',
      '"My daily commute is about an hour or so" — double-hedge sounds casual and natural; very common in peer talk.',
      [
        { target: 'number + 左右', note: 'simple post-hedge: 一个小时左右' },
        { target: '大概/大约 + number + 左右', note: 'double-hedge: 大概一个小时左右; sounds more colloquial' },
        { target: 'compare to 差不多', note: '差不多 (chàbuduō, "almost / about") can also pre-modify a quantity, very similar to 大概' },
      ],
      [ACT.grammarApprox],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar III: 不是…就是…
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '不是…就是…',
      'bú shì… jiù shì…',
      '"Either X or Y" — used when the speaker views the two options as the ONLY realistic possibilities, often with a tone of resignation or "always one of these two". Note the 不 sandhi: bù becomes bú before the fourth-tone 是. The two slots take parallel grammar (both nouns, both verbs, both adjectives).',
      'sentence',
      '我的通勤不是堵车就是迟到。',
      '"My commute is either a traffic jam or being late" — the prototype resigned-commuter complaint; both alternatives are negatives.',
      [
        { target: '不是 X (bú shì X)', note: 'first option; 不 takes sandhi before the 4th-tone 是 → bú' },
        { target: '就是 Y (jiù shì Y)', note: 'second option; 就 = "then / just"; 是 stays as the copula' },
        { target: 'parallel slots', note: 'X and Y must share grammar: both nouns, both verbs, both adjectives' },
      ],
      [ACT.grammarEither],
    ),
    createContentItem(
      '名词槽',
      'míngcí cáo',
      'When X and Y are nouns, the pattern works directly: 不是地铁就是公交 ("either the subway or the bus"). The implication is that the speaker uses these two options and nothing else. Natural for listing transit modes, weather options, food choices.',
      'sentence',
      '我上班不是坐地铁就是骑共享单车。',
      '"To work, I either take the subway or ride a shared bike" — neat way to summarize a routine without listing every variation.',
      [
        { target: '不是地铁就是公交', note: 'two transit modes, parallel as nouns' },
        { target: '不是十号线就是十三号线', note: 'two subway lines as nouns' },
        { target: '不是早高峰就是晚高峰', note: 'two rush-hour windows as nouns' },
      ],
      [ACT.grammarEither],
    ),
    createContentItem(
      '动词槽',
      'dòngcí cáo',
      'When X and Y are verb phrases, the pattern still works: 不是堵车就是改道 ("either traffic jam or detour"). The verbs in each slot describe events or actions; the pattern signals "the two predictable bad outcomes". Especially common for complaints about repeated problems.',
      'sentence',
      '每天下班不是堵车就是限行。',
      '"Every day after work, either there\'s traffic or my plate is restricted" — classic two-bad-options complaint.',
      [
        { target: '不是堵车就是改道', note: 'two events as parallel verb phrases' },
        { target: '不是加班就是迟到', note: 'two negative work events as verbs' },
        { target: '不是下雨就是下雪', note: 'two weather events; common winter complaint' },
      ],
      [ACT.grammarEither],
    ),
    createContentItem(
      '与 或者 的对比',
      'yǔ huòzhě de duìbǐ',
      'Contrast with 或者 (huòzhě, "or"): 或者 is neutral and offers genuine choice ("A or B, pick one"). 不是…就是… carries a tone of resignation, exasperation, or "the universe gives me only these two" — even when literally both could be positive. Use 或者 for menus and questions, 不是…就是… for venting and routines.',
      'sentence',
      'NEUTRAL: 我可以坐地铁或者公交。("I can take the subway or the bus.")\nRESIGNED: 我不是坐地铁就是坐公交。("I either take the subway or the bus — that\'s all I do.")',
      'Picking the wrong one shifts the entire emotional register; 或者 is for genuine options, 不是…就是… is for routines and rants.',
      [
        { target: '或者 huòzhě', note: 'neutral "or"; offers a genuine choice; appropriate for questions and menus' },
        { target: '不是…就是…', note: 'resigned "either…or…"; implies these are the only two outcomes, often complaining' },
        { target: 'register clue', note: 'use 不是…就是… among peers when venting; use 或者 in formal or neutral contexts' },
      ],
      [ACT.grammarEither],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '北漂的一天',
      'běi piāo de yì tiān',
      'A first-person paragraph by a Beijing-drifter (北漂) tech worker describing the daily commute from a 5th-ring apartment to a Zhongguancun office. Read it aloud with natural rush-hour vocabulary, the 从…到… frame, and 大概 hedges.',
      'sentence',
      '我住在北京五环外，在中关村上班。每天早上七点半出门，先骑共享单车到地铁站，大概一刻钟。然后坐13号线到五道口，再换10号线到公司附近，地铁部分一共大概四十分钟。从地铁站走到办公室还要五分钟，所以单程大概一个小时多一点。早高峰特别拥挤，但是不开车就不用担心限行和摇号。我同事开车的话，不是堵车就是限行，更麻烦。',
      'Translation: "I live outside Beijing\'s 5th ring road and work in Zhongguancun. Every morning at 7:30 I leave home, first bike on a shared bike to the subway station — about 15 minutes. Then I take Line 13 to Wudaokou, transfer to Line 10 to near the office; the subway part is about 40 minutes total. From the station I walk another 5 minutes to the office, so one-way is a bit more than an hour. Morning rush is especially crowded, but if you don\'t drive you don\'t have to worry about plate restrictions and the lottery. If my coworkers drive, it\'s either traffic jams or restrictions — even more trouble."',
      [
        { target: '北京五环外', note: 'outside the 5th ring; signals long-commute lifestyle' },
        { target: '在中关村上班', note: '"work in Zhongguancun"; standard tech-worker self-description' },
        { target: '骑共享单车到地铁站', note: 'shared bike to subway station — the prototypical first mile' },
        { target: '换10号线', note: '"transfer to Line 10"; 换 is the verb for line transfer' },
        { target: '单程大概一个小时多一点', note: '"one-way is a bit more than an hour" — a typical hedged total time' },
        { target: '不是堵车就是限行', note: 'the lesson\'s Grammar III pattern in context, applied to the alternative driving lifestyle' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '理解问题',
      'lǐjiě wèntí',
      'Four standard comprehension questions about the paragraph. Answer each in a short complete sentence using the grammar patterns introduced in this lesson — 从…到…, 大概, or 不是…就是….',
      'sentence',
      'Q1: 这个人住在哪儿？工作在哪儿？\nQ2: 他每天怎么从家到地铁站？要多久？\nQ3: 从家到公司单程一共大概多长时间？\nQ4: 为什么他不开车？',
      'The four questions cover residence + workplace, first-mile leg, total time, and reasoning — the full structure of any commute description.',
      [
        { target: 'A1: 他住在五环外，在中关村上班。', note: 'pattern: 住在 + place + 在 + place + 上班 — basic residence-workplace template' },
        { target: 'A2: 他骑共享单车，大概一刻钟。', note: 'uses 大概 + duration to give the first-mile estimate' },
        { target: 'A3: 单程大概一个小时多一点。', note: 'uses 大概 with the multi-part-modifier 多一点 ("a bit more")' },
        { target: 'A4: 因为开车不是堵车就是限行。', note: 'uses Grammar III 不是…就是… to summarize the reason' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Listening & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '同事问通勤',
      'tóngshì wèn tōngqín',
      'A natural workplace dialogue between two coworkers at a Zhongguancun tech company. Both use the patterns from this lesson: 从…到…, 大概, 不是…就是…, plus the transit vocabulary from Activities 3 and 4.',
      'conversation',
      'A: 你住哪儿？通勤要多久？\nB: 我住五环外，单程大概一个小时多一点。\nA: 一个小时？挺远的。你怎么过来的？\nB: 我先骑共享单车到地铁站，然后坐13号线换10号线。\nA: 早高峰挤死了吧？\nB: 别提了，每天不是没座位就是上不去车。\nA: 那你为什么不开车？\nB: 开车更麻烦，不是堵车就是限行，而且我还没摇上号。',
      'A natural peer-to-peer commute comparison; A is local with a shorter commute, B is a 北漂 explaining their multi-leg route.',
      [
        { target: '你住哪儿？', note: 'casual Beijing-style "where do you live?"; uses 哪儿 instead of 哪里' },
        { target: '单程大概一个小时多一点', note: 'a textbook 大概 + duration estimate, plus 多一点 ("a bit more")' },
        { target: '挤死了吧?', note: 'casual hyperbole "crowded to death, right?"; 死了 is a colloquial intensifier' },
        { target: '别提了 bié tí le', note: '"don\'t even mention it / don\'t get me started"; signals upcoming complaint' },
        { target: '不是没座位就是上不去车', note: 'Grammar III applied to two crowding outcomes — no seat or can\'t even board' },
        { target: '没摇上号', note: '"haven\'t won the plate lottery"; uses 没 (past negation) + the result complement 上' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      '推荐 app',
      'tuījiàn app',
      'A short three-turn exchange where one coworker recommends commute apps to a newcomer. Demonstrates the natural way to pair an app brand with its specific use case in peer talk.',
      'conversation',
      'A: 我刚来北京，怎么坐地铁和公交方便？\nB: 你用百度地图就行，公交线路和换乘信息最全。要是想开车，建议用高德，实时路况最准。\nA: 那打车呢？\nB: 直接装个滴滴。晚高峰快车不好叫的话，可以试试顺风车，便宜一半。',
      'A standard new-arrival exchange; B gives a one-line use case for each major app.',
      [
        { target: '我刚来北京', note: '"I just came to Beijing"; standard newcomer self-introduction' },
        { target: '百度地图…最全', note: 'feature claim: Baidu Maps has the most complete info; 最 = most' },
        { target: '高德…最准', note: 'feature claim: Gaode is the most accurate; standard recommendation framing' },
        { target: '装个滴滴 zhuāng ge Dīdī', note: '"install a Didi"; 装 (zhuāng) is the verb for installing apps' },
        { target: '便宜一半', note: '"half as expensive"; 一半 = half; standard price-comparison shortcut' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '写作模板',
      'xiězuò múbǎn',
      'A reusable 5-sentence template for any Beijing commute description. Fill in the bracketed slots with your own information — the structure carries the rest, and it naturally incorporates the three lesson grammar points.',
      'sentence',
      '我住在 [区域]，在 [公司/地点] 上班。\n从家到公司单程大概 [时间]。\n我每天先 [第一段交通方式]，然后 [第二段交通方式]。\n早高峰 [问题描述]。\n开车的话，不是 [问题1] 就是 [问题2]，所以我选择坐地铁。',
      'Five sentences cover residence + workplace, total time with 大概, modes with chained 从…到…, a rush-hour problem, and a 不是…就是… contrast — every lesson grammar point is exercised.',
      [
        { target: '[区域]', note: 'your residence area: 五环外 / 三环内 / 朝阳区 / 海淀区, etc.' },
        { target: '[第一段交通方式]', note: 'first mile: 骑共享单车 / 走路 / 坐公交' },
        { target: '[第二段交通方式]', note: 'main leg: 坐10号线 / 坐班车 / 打滴滴' },
        { target: '[问题描述]', note: 'one rush-hour problem: 特别拥挤 / 经常误点 / 上不去车' },
        { target: '[问题1] / [问题2]', note: 'two driving problems to put in the 不是…就是… frame: 堵车, 限行, 摇号, 改道' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '写作练习',
      'xiězuò liànxí',
      'Write your own 5–6 sentence commute description in Hanzi using the template. Make sure to use at least one 从…到…, one 大概 or 大约, and one 不是…就是… so the writing demonstrates all three core grammars of this lesson.',
      'sentence',
      '示例: 我住在朝阳区四环边上，在中关村上班。从家到公司单程大概一个小时左右。我每天先走十分钟到地铁站，然后坐10号线换13号线到五道口。早高峰地铁特别挤，经常上不去车。开车更麻烦，不是堵车就是限行，所以我宁愿挤地铁。',
      'Translation: "I live near the 4th ring road in Chaoyang District and work in Zhongguancun. One-way home-to-office is about an hour or so. Every day I first walk 10 minutes to the subway station, then take Line 10 transferring to Line 13 to Wudaokou. Morning rush is especially crowded — often can\'t even board. Driving is more trouble: either traffic or plate restrictions, so I\'d rather pack into the subway."',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '五环现象',
      'wǔ huán xiànxiàng',
      'Beijing\'s 5-ring road is notorious for daily traffic jams during rush hours. Even though it\'s a high-capacity expressway, the morning and evening peaks turn it into a parking lot. The phrase "五环上堵了" ("stuck on the 5th ring") is shorthand for a wasted hour. This is why the subway dominates white-collar commutes despite the crowding.',
      'sentence',
      '北京五环上堵车是常态，不是新闻。',
      '"Traffic jams on the 5th ring are the norm, not news" — captures the resignation Beijing drivers feel.',
      [
        { target: '五环 (Beijing 5th ring)', note: 'the 3rd-outermost ring expressway, ~14-18 km from center; the busiest commuter ring' },
        { target: '常态 chángtài', note: '"normal state"; used to describe persistent problems' },
        { target: '六环 (6th ring)', note: 'even farther out — ~25 km from center; some 北漂 live here for cheaper rent and accept 2+ hour commutes' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '摇号系统',
      'yáohào xìtǒng',
      'Beijing\'s 摇号 (plate lottery) is the system that allocates a limited number of new car plates each month. The wait time has stretched to 5+ years for non-EV plates and 2-3 years even for EV plates. Most young workers never win — which is why 滴滴, the subway, and shared bikes dominate the white-collar commute. Many people apply every month "just in case" for years on end.',
      'sentence',
      '我摇号摇了五年了，下个月再试试。',
      '"I\'ve been in the plate lottery for five years; will try again next month" — a typical Beijing carless-by-default mindset.',
      [
        { target: '摇号 yáohào', note: 'the monthly license-plate lottery; literally "shake numbers"' },
        { target: '中签 zhòngqiān', note: '"win in the lottery"; opposite of 没中 (méi zhòng, "didn\'t win")' },
        { target: '新能源指标 xīn néngyuán zhǐbiāo', note: '"new-energy (EV) plate quota"; a separate, slightly easier lottery for EVs' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '限行规则',
      'xiànxíng guīzé',
      'Beijing\'s 限行 (driving restriction) rotates daily by license-plate last digit. Inside the 5th ring during rush hours, plates ending in (1,6), (2,7), (3,8), (4,9), (5,0) are restricted on Mon–Fri respectively. So even if you own a car, one weekday per week you cannot drive inside the city — which forces transit on that day and reinforces the multi-modal commute habit.',
      'sentence',
      '我的车今天限行，得坐地铁。',
      '"My car is restricted today, gotta take the subway" — a normal weekly explanation.',
      [
        { target: '限行 xiànxíng', note: 'driving restriction; verb form for "to be restricted from driving"' },
        { target: '尾号 wěihào', note: '"tail number" — the last digit of the plate; what 限行 is based on' },
        { target: '违反限行 wéifǎn xiànxíng', note: 'to violate the restriction; gets a 100-yuan fine, hugely common offense' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '北漂文化',
      'běi piāo wénhuà',
      'The 北漂 (Beijing drifter) phenomenon describes young professionals from elsewhere in China who move to Beijing for tech, media, or finance work, but cannot afford central rent. They live in 五环外, 六环外, 燕郊 (Yanjiao, in neighboring Hebei), or 通州 (Tongzhou suburb) and accept commutes of 90+ minutes one-way for cheaper rent — often roommate situations with 4–6 people sharing one apartment.',
      'sentence',
      '北漂的房租和通勤是两个永恒话题。',
      '"Rent and commute are two eternal topics for Beijing drifters" — captures the daily reality.',
      [
        { target: '北漂 běi piāo', note: '"Beijing drifter"; young non-local professional; the prototypical commuter described in this lesson' },
        { target: '燕郊 Yānjiāo', note: 'a Hebei satellite town just across Beijing\'s eastern border; cheaper rent, 2+ hour bus commute to CBD' },
        { target: '合租 hézū', note: '"shared rental"; the default housing arrangement for 北漂' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '远程办公',
      'yuǎnchéng bàngōng',
      'Remote work (远程办公) became widespread in Chinese tech post-2020, partially driven by COVID lockdowns. Many large tech companies (字节, 腾讯, 阿里) now allow 1–2 days remote per week, reshaping the 北漂 calculus: a longer commute is more tolerable if you only do it 3 days a week. The cultural debate over 996 ("9 to 9, 6 days") culture vs work-life balance is still very active.',
      'sentence',
      '我们公司一周可以远程办公两天。',
      '"Our company allows two days of remote work per week" — a typical 2026 tech-company benefit.',
      [
        { target: '远程办公 yuǎnchéng bàngōng', note: '"remote work"; the term that replaced earlier 在家办公 ("work from home")' },
        { target: '996 jiǔ-jiǔ-liù', note: '"9 AM to 9 PM, 6 days/week"; controversial overtime culture in Chinese tech' },
        { target: '弹性工作 tánxìng gōngzuò', note: '"flexible work"; the official term for staggered hours and partial remote' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '任务: 解释你的通勤',
      'rènwù: jiěshì nǐ de tōngqín',
      'Roleplay your first week at a Tsinghua-area tech company. A new coworker (played by the tutor) asks how you got in this morning, and you explain the whole route. Use every skill from this lesson in one continuous scene — describe modes, estimate time, vent about one problem, recommend an app.',
      'conversation',
      '[办公室，早上九点半]\n同事: 你今天来得挺早！通勤要多久？\n你: [说你的总时间，用 大概 + duration]\n同事: 你住哪儿？怎么过来的？\n你: [描述路线，用 从…到… 加交通方式]\n同事: 早高峰怎么样？\n你: [说一个问题，用 不是…就是…]\n同事: 那你为什么不开车呢？\n你: [说一个原因，可以用 不是…就是…]\n同事: 我推荐你用百度地图。\n你: [回应，问哪个app最好打车]',
      'A six-to-seven turn natural workplace conversation. The tutor will improvise responses; aim for fluency over precision.',
      [
        { target: '打招呼 + 估算时间', note: 'open with a 大概 + duration estimate' },
        { target: '描述路线', note: 'use 从…到… chained: 从家骑车到地铁站，再坐地铁到公司' },
        { target: '抱怨问题', note: 'use 不是…就是… to vent — feels natural in peer talk' },
        { target: '推荐 app', note: '高德 / 百度 / 滴滴 — pair the brand with a one-line use case' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战 — 比较开车和地铁',
      'tiǎozhàn — bǐjiào kāichē hé dìtiě',
      'Stretch goal: in the same conversation, your coworker says they drive every day and asks if you\'ve considered it. Politely explain why the subway is better for you, using at least two 不是…就是… constructions and one 大概 + duration to compare total times.',
      'conversation',
      '同事: 我每天开车，方便多了，你怎么不开车？\n你: 嗯，开车快是快，但是我觉得不太划算。第一，我还没摇上号。第二，就算有车，五环上不是堵车就是改道，单程大概也要一个小时。第三，每周还有一天限行，那天还得坐地铁。所以我干脆每天坐地铁，反正时间差不多。\n同事: 你说得也有道理。',
      'A polite, well-reasoned three-point comparison that uses lesson grammar throughout. The final 你说得也有道理 ("you have a point too") is the standard Mandarin "fair enough" response.',
      [
        { target: '划算 huásuàn', note: '"worth it / cost-effective"; common word in cost-benefit comparisons' },
        { target: '就算 jiùsuàn', note: '"even if"; useful concessive connector' },
        { target: '干脆 gāncuì', note: '"just / straight-out"; signals a decisive final choice' },
        { target: '反正 fǎnzhèng', note: '"anyway / in any case"; common closer for justification statements' },
        { target: '你说得也有道理', note: '"you have a point too" — the standard Mandarin "fair enough"; signals graceful disagreement' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
