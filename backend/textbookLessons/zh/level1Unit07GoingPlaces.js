// Level 1 Unit 7 — Going Places (Mandarin Chinese)
// Functions: stating destination & future plans (要 / 要去 / 去), specifying
// transportation method (坐 + vehicle, 骑 + vehicle), expressing purpose (去 X
// 做 Y), time expressions for upcoming events (今天 / 明天 / 下星期), and
// companions (跟 X 一起). Cultural focus: high-speed rail, QR-code transit
// payment, ride-hailing apps, and major Chinese tourist cities.
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
  orientation: 'zh-l1u7-orientation',
  pronunciation: 'zh-l1u7-pronunciation',
  vocabularyDestinations: 'zh-l1u7-vocab-destinations',
  vocabularyTransport: 'zh-l1u7-vocab-transport',
  grammarFuture: 'zh-l1u7-grammar-future',
  grammarTransport: 'zh-l1u7-grammar-transport',
  grammarPurpose: 'zh-l1u7-grammar-purpose',
  reading: 'zh-l1u7-reading',
  listening: 'zh-l1u7-listening',
  writing: 'zh-l1u7-writing',
  culture: 'zh-l1u7-culture',
  task: 'zh-l1u7-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'State where you are going (now or later) using 去 + place, including upcoming-event time words like 今天 / 明天 / 下星期.',
      'Say how you get there using transportation patterns 坐 + vehicle (subway/bus/taxi) and 骑 + vehicle (bicycle/e-bike) so the listener can picture the trip.',
      'Express purpose with the chained pattern 去 X 做 Y ("go to X to do Y") and add a companion with 跟 X 一起 to invite or describe a group.',
    ],
    task: 'A Tsinghua classmate asks about your weekend over lunch. By the end of this lesson you should describe destination, transportation, purpose, time, and companion in one short turn — without rehearsing each part separately.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in this lesson',
    goals: [
      'Pronounce 去 (qù) with the palatal q-initial (soft "ch" with the tongue forward, not English "qu") plus the rounded front ü — one of the highest-frequency verbs in Mandarin and a chronic mispronunciation.',
      'Distinguish 坐 (zuò, "to sit / to take a vehicle") from 做 (zuò, "to do / to make") — same pinyin and tone, completely different Hanzi and meaning; only context disambiguates.',
      'Produce 一起 (yìqǐ, "together") with the correct 一 sandhi: yī becomes yì before a third tone, so 一起 is spoken yìqǐ, not yī qǐ.',
    ],
    task: 'Read each example aloud, identify whether sandhi applies, and pronounce the spoken version (not the written tones).',
  },
  {
    id: ACT.vocabularyDestinations,
    section: 'Vocabulary I',
    title: 'Destinations and time expressions',
    goals: [
      'Name 10+ destinations a student or working professional commonly goes to in a Chinese city.',
      'Use the upcoming-event time words 今天 (today), 明天 (tomorrow), 后天 (day after tomorrow), 这个周末 (this weekend), 下星期 (next week) — placed BEFORE the verb in the sentence.',
    ],
    task: 'List five places you go in a typical week and pair each one with a time word.',
  },
  {
    id: ACT.vocabularyTransport,
    section: 'Vocabulary II',
    title: 'Transportation, companions, and purpose verbs',
    goals: [
      'Use the six most common urban transport modes: 地铁 (subway), 公交车 (bus), 出租车 (taxi), 自行车 (bicycle), 高铁 (high-speed rail), 飞机 (plane) — knowing which take 坐 and which take 骑.',
      'Add companions with 跟 X 一起 (with X, together) and pair destinations with purpose verbs 见 / 吃 / 买 / 看 / 学 / 玩 to form the 去 X 做 Y chain.',
    ],
    task: 'Pair one destination with one transport mode and one purpose verb for three different trips.',
  },
  {
    id: ACT.grammarFuture,
    section: 'Grammar I',
    title: 'Future plans — 要 / 要去 / 去 + time word',
    goals: [
      'Express a future plan using 要 (yào, "will / plan to") + verb: 我明天要去北京 ("I will go to Beijing tomorrow"). Unlike English future tense, Mandarin verbs do not change form.',
      'Use bare 去 + place for definite near-future plans when the time word makes the future clear: 我明天去上海 sounds natural without 要.',
      'Place the time word BEFORE the verb (and usually before or after the subject): 我明天去 ✓ / 明天我去 ✓ — never at the end like English.',
    ],
    task: 'Write three sentences about your plans for tomorrow, this weekend, and next week — each with a time word, 去, and a destination.',
  },
  {
    id: ACT.grammarTransport,
    section: 'Grammar II',
    title: 'Transportation — 坐 vs 骑 + vehicle',
    goals: [
      'Use 坐 (zuò) with vehicles you sit IN: 坐地铁 (take the subway), 坐公交车 (take the bus), 坐出租车 (take a taxi), 坐高铁 (take the high-speed train), 坐飞机 (fly).',
      'Use 骑 (qí) with vehicles you sit ON and straddle: 骑自行车 (ride a bicycle), 骑电动车 (ride an e-bike), 骑摩托车 (ride a motorcycle).',
      'Place the transport phrase BEFORE the destination verb 去: 我坐地铁去学校 ("I take the subway to school") — Mandarin order is "by-X go to Y", reversed from English "go to Y by X".',
    ],
    task: 'Make three sentences using 坐 or 骑 to describe how you get to three different places.',
  },
  {
    id: ACT.grammarPurpose,
    section: 'Grammar III',
    title: 'Purpose chain — 去 X 做 Y + companion 跟 X 一起',
    goals: [
      'Chain destination and purpose with the pattern 去 + PLACE + VERB + OBJECT: 我去图书馆看书 ("I go to the library to read books"). No connector word is needed — the two verbs sit side by side in serial-verb construction.',
      'Add a companion using 跟 (gēn, "with") + person + 一起 (yìqǐ, "together"), placed before the main verb: 我跟朋友一起去看电影 ("I go to watch a movie with a friend").',
      'Add time word and transport in the canonical order: [TIME] + [跟 X 一起] + [坐/骑 + VEHICLE] + 去 + [PLACE] + [VERB + OBJECT]. Each slot is optional.',
    ],
    task: 'Write one full sentence using all five slots: time, companion, transport, destination, and purpose.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'Read a Tsinghua weekend plan',
    goals: [
      'Read a five-sentence weekend itinerary aloud with correct tones, sandhi, and natural rhythm.',
      'Answer comprehension questions about WHERE, HOW (transport), WITH WHOM, and WHY for each stop in the itinerary.',
    ],
    task: 'Read the paragraph below aloud once, then answer four comprehension questions in complete short sentences.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'Where are you going this weekend?',
    goals: [
      'Follow two short dialogues — one casual peer conversation and one polite invitation — and identify destination, transport, time, and companion in each.',
      'Reproduce one of the dialogues with your own plan, swapping in your real destination, transport mode, and companion.',
    ],
    task: 'Read both dialogues with the tutor first, then perform one again with your own information swapped in.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Write your weekend plan',
    goals: [
      'Write 4–5 sentences in Hanzi describing an upcoming weekend: where you will go, how you will get there, with whom, and why.',
      'Use 要去 or bare 去 + time word at least twice and one 坐/骑 transport phrase and one 跟…一起 companion phrase so the writing demonstrates every core grammar point.',
    ],
    task: 'Write your own weekend plan in 4–5 sentences using the template, then read it aloud.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: 'High-speed rail, QR transit, Didi, and Chinese travel hubs',
    goals: [
      'Know the role of 高铁 (gāotiě, high-speed rail) in modern Chinese travel — over 40,000 km of track connect every major city, making domestic trips of 1,000+ km feel like commutes.',
      'Understand QR-code transit payment: subways, buses, and even most taxis accept WeChat Pay or Alipay QR scans — cash is increasingly rare in urban transit.',
      'Recognize 滴滴 (Dīdī) as the dominant ride-hailing app and name the four iconic tourist destinations Beijing, Shanghai, Xi\'an (Terracotta Army), and Guilin (karst landscape).',
    ],
    task: 'Describe one Chinese city you would like to visit, how you would get there from Beijing, and one specific thing you would do.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'Plan a weekend trip with a Tsinghua classmate',
    goals: [
      'Combine destination, transport, purpose, time, and companion into one continuous conversation with no break between the slots.',
      'Invite the classmate along using 你要不要跟我一起去? ("Do you want to come with me?") or 我们一起去吧! ("Let\'s go together!").',
    ],
    task: 'Roleplay with the tutor playing a Tsinghua classmate over lunch in the campus canteen; aim for a 6-turn exchange that ends with a concrete shared plan.',
  },
];

const lesson = {
  title: 'Level 1 · Unit 7: 你周末去哪儿? — Going Places',
  category: 'travel',
  difficulty: 'beginner',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'asking-where-going', label: 'Asking where someone is going', goal: 'Use 你去哪儿? (current) or 你要去哪儿? (planned) to ask about a destination, and recognize the difference between immediate and future trips.' },
    { id: 'stating-future-plan', label: 'Stating a future plan', goal: 'Use 我 + [time word] + 要去 + [place] to share an upcoming plan with the appropriate time anchor (今天 / 明天 / 这个周末 / 下星期).' },
    { id: 'specifying-transport', label: 'Specifying transportation', goal: 'Use 坐 + [vehicle you sit in] or 骑 + [vehicle you straddle] BEFORE 去 to make the trip vivid for the listener.' },
    { id: 'inviting-companion', label: 'Inviting someone along', goal: 'Use 你要不要跟我一起去? or 我们一起去吧! to invite a classmate or friend along, matched to the register of the existing conversation.' },
  ],
  relatedPools: ['topic-travel', 'topic-society'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '本课目标',
      'běn kè mùbiāo',
      'By the end of this lesson, you can say where you are going (now or later), how you will get there, with whom, and why — all in one short turn without pausing to assemble the pieces.',
      'word',
      'Functions: 说目的地 shuō mùdìdì (state destination) · 说交通方式 shuō jiāotōng fāngshì (transport mode) · 说目的 shuō mùdì (purpose) · 说同行人 shuō tóngxíngrén (companion) · 说时间 shuō shíjiān (time)',
      'These five micro-skills are the spine of every "going somewhere" exchange in Mandarin — once they\'re automatic, weekend planning, travel small talk, and meet-ups all flow.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      '真实场景',
      'zhēnshí chǎngjǐng',
      'You are at Tsinghua University and a classmate slides into the seat next to you at lunch and asks about your weekend. The whole exchange takes about 30 seconds and you will need every micro-skill from this lesson — destination, transport, time, purpose, companion.',
      'word',
      '同学: "周末你要去哪儿? 跟谁一起去?"',
      'A typical lunchtime opener at a Chinese university — direct, friendly, expecting a concrete plan rather than a vague answer.',
      [
        { target: '周末 zhōumò', note: '"weekend" — used as a time word, placed before the verb' },
        { target: '要去哪儿? yào qù nǎr?', note: '"where are you planning to go?" — 要 + 去 signals a future plan, 哪儿 is the casual "where" (vs more formal 哪里)' },
        { target: '跟谁一起去? gēn shéi yìqǐ qù?', note: '"with whom together going?" — companion question using the 跟…一起 frame from Grammar III' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '五个语法槽',
      'wǔ gè yǔfǎ cáo',
      'Mandarin "going somewhere" sentences have up to five slots, each optional but combinable: TIME + COMPANION + TRANSPORT + 去 + DESTINATION + PURPOSE. The order is fixed and reads left-to-right like a logistics list — opposite of English which puts destination first.',
      'word',
      '我 [明天] [跟朋友一起] [坐地铁] 去 [图书馆] [看书]。 (I am going to the library with a friend by subway tomorrow to read.)',
      'Once this five-slot template is internalized, every weekend-plan sentence becomes a fill-in-the-blank exercise.',
      [
        { target: 'TIME slot', note: '今天 / 明天 / 下星期 / 这个周末 — placed before the verb, never at the end like English "tomorrow"' },
        { target: 'COMPANION slot', note: '跟 X 一起 — appears between the subject and the main verb' },
        { target: 'TRANSPORT slot', note: '坐 X / 骑 X — placed BEFORE the destination verb 去, not after it' },
        { target: '去 + DESTINATION', note: 'the core; 去 is the all-purpose verb of motion-toward' },
        { target: 'PURPOSE slot', note: 'a second verb + object glued onto the end with no connector — a serial-verb construction' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '去',
      'qù',
      'The verb 去 ("to go") combines two sounds English speakers commonly mispronounce: the palatal initial q (a soft "ch" with the tongue forward and flat, NOT English /kw/) plus the rounded front vowel ü (a high front vowel with rounded lips). Mispronouncing this turns one of the most common verbs in Mandarin unintelligible.',
      'word',
      '去北京 qù Běijīng (go to Beijing) · 去上海 qù Shànghǎi (go to Shanghai) · 去图书馆 qù túshūguǎn (go to the library)',
      'Drill q-initials by saying "cheese" with your tongue pressed flat against your front teeth; then round your lips for ü to lock in the qù sound.',
      [
        { target: 'q-initial /tɕʰ/', note: 'soft "ch" with the tongue forward and aspirated; never English /kw/ as in "queen"' },
        { target: 'ü-final /y/', note: 'rounded front vowel: say "ee" then round your lips; written as "u" after q (the umlaut is dropped because q only ever combines with ü)' },
        { target: '4th tone (sharp fall)', note: 'qù falls from high to low quickly; soft pronunciations sound like the 3rd-tone qǔ (a different word, "to fetch")' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '坐 vs 做',
      'zuò vs zuò',
      'Two extremely common verbs with IDENTICAL pinyin and tone: 坐 (zuò, "to sit / to take a vehicle") and 做 (zuò, "to do / to make"). Only the Hanzi differs and only context disambiguates in speech. Recognizing this homophone pair is part of Mandarin literacy.',
      'word',
      '我坐地铁 wǒ zuò dìtiě (I take the subway) — 坐 = ride a vehicle\n我做作业 wǒ zuò zuòyè (I do homework) — 做 = perform/make\n做菜 zuò cài (cook food) — 做 = make',
      'In writing, the Hanzi makes the meaning instant; in speech, the object noun (vehicle vs task) disambiguates without effort for native speakers.',
      [
        { target: '坐 (sit/ride)', note: 'used with vehicles you sit IN (subway, bus, plane, taxi) — this lesson\'s key transport verb' },
        { target: '做 (do/make)', note: 'used with tasks, foods, projects — appears in 做饭 cook, 做作业 do homework' },
        { target: 'pronunciation: identical zuò', note: 'same 4th-tone sharp fall; the only spoken cue is the noun that follows' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '一起',
      'yìqǐ (written: yī qǐ)',
      'The companion word 一起 ("together") undergoes 一 (yī) sandhi: before a third-tone syllable like 起 (qǐ), 一 changes from first tone to falling fourth tone in speech. Written form keeps yī; spoken form is yìqǐ.',
      'word',
      '一起去 yìqǐ qù (go together) · 一起吃饭 yìqǐ chī fàn (eat together) · 跟朋友一起 gēn péngyou yìqǐ (with a friend, together)',
      'The single most common sandhi for 一 in everyday speech; ignoring it makes the speaker sound robotic.',
      [
        { target: '一 alone or final: yī', note: 'e.g., 第一 dì yī ("the first")' },
        { target: '一 + 1st/2nd/3rd → yì', note: 'falling tone; applies here because 起 is third tone' },
        { target: '一 + 4th → yí', note: 'rising tone; e.g., 一个 yígè' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '不去',
      'bùqù (spoken: búqù)',
      '不 (bù) sandhi applied to the verb 去 (qù, 4th tone): bù becomes bú (rising) when followed by another fourth tone. So 不去 (not go) is spoken búqù. Very high frequency since 去 is one of the most common Mandarin verbs.',
      'word',
      '我今天不去 wǒ jīntiān búqù ("I\'m not going today") · 你为什么不去? nǐ wèishéme búqù? ("why aren\'t you going?")',
      'Without the sandhi the phrase sounds clipped and unnatural; the rising tone smooths the transition into the falling tone of 去.',
      [
        { target: '不 (written: bù, 4th)', note: 'default fourth tone in isolation' },
        { target: '不 (spoken: bú, 2nd)', note: 'changes to rising tone before any fourth-tone syllable' },
        { target: '去 (qù, 4th, unchanged)', note: 'the following verb stays in its 4th tone' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Destinations + time expressions
    // ────────────────────────────────────────────────────────────────────
    createContentItem('去', 'qù', 'The all-purpose verb of motion-toward ("to go to"). Unlike English "go", Mandarin 去 typically takes a place directly without a preposition: 去北京 (go [to] Beijing), 去图书馆 (go [to] the library). For motion AWAY from the speaker; the counterpart 来 (lái) is for motion TOWARD the speaker.', 'word', '我去图书馆。', '"I am going to the library." The simplest possible destination sentence — subject + 去 + place.', null, [ACT.vocabularyDestinations]),
    createContentItem('来', 'lái', 'The counterpart to 去: motion TOWARD the speaker\'s current or implied location ("to come"). Use 来 when the destination is where the speaker is or will be: 你来我家 ("you come to my place"). Mixing up 来 and 去 is a frequent learner mistake.', 'word', '朋友明天来北京。', '"My friend is coming to Beijing tomorrow." 来 is used because Beijing is where the speaker is.', null, [ACT.vocabularyDestinations]),
    createContentItem('哪儿 / 哪里', 'nǎr / nǎli', 'The question word "where" — 哪儿 is casual (more common in northern China), 哪里 is slightly more standard (more common in southern China and writing). Both work in 你去哪儿? or 你去哪里? ("where are you going?").', 'word', '你周末去哪儿? — 我去上海。', 'Standard weekend-plan question; the question word stays in object position, not fronted as in English.', null, [ACT.vocabularyDestinations]),
    createContentItem('图书馆', 'túshūguǎn', 'Library. A high-frequency destination word in Chinese university life — Tsinghua\'s main library (清华大学图书馆) is one of the largest in Asia. Often shortened to 图书馆 with no university qualifier when context is campus.', 'word', '我下午要去图书馆看书。', '"I will go to the library to read this afternoon." Combines time + future 要 + 去 + place + purpose verb — the full Unit 7 chain.', null, [ACT.vocabularyDestinations]),
    createContentItem('商场', 'shāngchǎng', 'A shopping mall — the modern multi-floor variety with retail, food court, and cinema. Distinct from 超市 (chāoshì, supermarket) and 市场 (shìchǎng, traditional market). In Beijing, common destinations include 王府井 and 三里屯.', 'word', '我们这个周末去商场买衣服。', '"We are going to the mall to buy clothes this weekend." A typical Saturday plan for Chinese students.', null, [ACT.vocabularyDestinations]),
    createContentItem('电影院', 'diànyǐngyuàn', 'A movie theater / cinema. Often inside a 商场 in modern Chinese cities. The verb pairing is 看电影 ("watch a movie"), not "see a movie".', 'word', '今天晚上跟朋友去电影院看电影。', '"Tonight I am going to the cinema with friends to watch a movie." Combines time + companion + destination + purpose.', null, [ACT.vocabularyDestinations]),
    createContentItem('餐厅', 'cāntīng', 'A restaurant — formal or mid-tier. Common alternatives: 饭馆 (fànguǎn, casual restaurant), 食堂 (shítáng, canteen/cafeteria, used in schools and workplaces). Tsinghua\'s campus has many 食堂 rather than 餐厅.', 'word', '我们去餐厅吃饭。', '"We are going to the restaurant to eat." Pairs with 吃饭 (chī fàn, "eat a meal").', null, [ACT.vocabularyDestinations]),
    createContentItem('咖啡馆', 'kāfēiguǎn', 'A cafe / coffee shop. Modern Chinese urban culture has embraced cafe culture heavily — Starbucks (星巴克) and local chains like 瑞幸 (Luckin) are everywhere. Often used by students as a study spot alternative to the library.', 'word', '我跟同学去咖啡馆学习。', '"I am going to the cafe to study with classmates." A common alternative to 图书馆 for group work.', null, [ACT.vocabularyDestinations]),
    createContentItem('公园', 'gōngyuán', 'A public park. Major Beijing parks include 颐和园 (Yíhéyuán, Summer Palace) and 北海公园 (Běihǎi Gōngyuán). Often visited for morning exercise (跑步 jogging, 太极 tai chi) or weekend leisure.', 'word', '我早上去公园跑步。', '"I go to the park to jog in the morning." 跑步 (pǎobù) = jog.', null, [ACT.vocabularyDestinations]),
    createContentItem('医院', 'yīyuàn', 'A hospital or clinic. Unlike English "hospital" which implies serious illness, Chinese 医院 covers everything from routine checkups to surgery — there is no separate "clinic" word in everyday use.', 'word', '我妈妈明天去医院看医生。', '"My mom is going to the hospital to see the doctor tomorrow." 看医生 = see a doctor.', null, [ACT.vocabularyDestinations]),
    createContentItem('火车站', 'huǒchēzhàn', 'A train station. Major Beijing stations include 北京站 (Beijing Station, central) and 北京南站 (Beijing South, high-speed rail hub). For high-speed rail specifically, the station is called 高铁站 (gāotiězhàn).', 'word', '我下星期去火车站坐高铁。', '"Next week I am going to the train station to take the high-speed rail." Combines time + transport + purpose.', null, [ACT.vocabularyDestinations]),
    createContentItem('机场', 'jīchǎng', 'An airport. Beijing has two main ones: 北京首都国际机场 (Beijing Capital) and 北京大兴国际机场 (Beijing Daxing). Always paired with 坐飞机 (zuò fēijī, "take a plane") as the transport.', 'word', '明天早上我要去机场。', '"I have to go to the airport tomorrow morning." 要 here can mean "need to" or "plan to" — context decides.', null, [ACT.vocabularyDestinations]),
    createContentItem('学校', 'xuéxiào', 'A school (general term covering primary through university). In context, students often just say 学校 to mean their own institution: 我去学校 = "I\'m going to campus". For "university" specifically, use 大学 (dàxué).', 'word', '我每天坐公交车去学校。', '"I take the bus to school every day." 每天 (měi tiān) = every day, placed before the verb.', null, [ACT.vocabularyDestinations]),
    createContentItem('今天', 'jīntiān', 'Today. The most common upcoming-event time word. Placed BEFORE the verb in Mandarin (我今天去 or 今天我去), never at the end like English "I\'m going today".', 'word', '今天我要去图书馆。', '"Today I am going to the library." Time word fronted; 要 marks the upcoming plan.', null, [ACT.vocabularyDestinations]),
    createContentItem('明天', 'míngtiān', 'Tomorrow. Same placement rule as 今天 — before the verb. Common in plan-making contexts (明天见 míngtiān jiàn = "see you tomorrow"). Mandarin has no separate future tense; the time word does the work.', 'word', '我明天跟朋友去公园。', '"Tomorrow I am going to the park with a friend." No 要 needed because 明天 already signals the future.', null, [ACT.vocabularyDestinations]),
    createContentItem('后天', 'hòutiān', 'The day after tomorrow. The Mandarin time-word system is symmetric: 昨天 (yesterday), 今天 (today), 明天 (tomorrow), 后天 (day after tomorrow), 前天 (day before yesterday). Higher resolution than English.', 'word', '后天我要去上海。', '"The day after tomorrow I am going to Shanghai." A common precise-plan time word.', null, [ACT.vocabularyDestinations]),
    createContentItem('这个周末', 'zhège zhōumò', 'This weekend. 周末 (weekend) takes the measure-word phrase 这个 ("this one") to mark "this weekend" specifically. Alternative: 这周末 (slightly shorter, equally common).', 'word', '这个周末你想去哪儿?', '"Where do you want to go this weekend?" 想 (xiǎng, want to) is softer than 要 (will).', null, [ACT.vocabularyDestinations]),
    createContentItem('下星期', 'xià xīngqī', 'Next week. The pattern is 上星期 (last week), 这星期 (this week), 下星期 (next week). 星期 is the standard "week"; 周 (zhōu) is a shorter alternative (下周 = next week, common in writing).', 'word', '我下星期要去西安。', '"Next week I am going to Xi\'an." A planning-horizon time word, common in travel discussions.', null, [ACT.vocabularyDestinations]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: Transportation + companions + purpose verbs
    // ────────────────────────────────────────────────────────────────────
    createContentItem('地铁', 'dìtiě', 'The subway. Beijing\'s metro system is one of the world\'s largest, with 20+ lines covering the city. Almost always paired with 坐 (zuò). Fares are paid by QR code via WeChat Pay or Alipay — physical cards are now uncommon.', 'word', '我坐地铁去学校。', '"I take the subway to school." Standard urban-commute sentence; 坐 + transport BEFORE 去 + place.', null, [ACT.vocabularyTransport]),
    createContentItem('公交车', 'gōngjiāochē', 'A public bus. Less prestigious than the subway but cheaper and more flexible. Pairs with 坐. The shorter form 公交 is also common: 坐公交 = "take the bus".', 'word', '我每天坐公交车去公司。', '"I take the bus to the office every day." 公司 (gōngsī) = company/office.', null, [ACT.vocabularyTransport]),
    createContentItem('出租车', 'chūzūchē', 'A taxi. The traditional yellow/red taxi (vs ride-hailing). Pairs with 坐. In modern Chinese cities, ride-hailing apps like 滴滴 (Didi) have largely replaced street-hailing — 打车 (dǎ chē) and 打的 (dǎ dī) are casual verbs for "grab a cab".', 'word', '今天下雨，我们坐出租车去吧。', '"It\'s raining today, let\'s take a taxi." 吧 (ba) softens the suggestion.', null, [ACT.vocabularyTransport]),
    createContentItem('自行车', 'zìxíngchē', 'A bicycle. Beijing has rebuilt its bike culture around shared bikes (共享单车 gòngxiǎng dānchē) like Meituan and Hello — unlock by QR scan, pay by the minute. Pairs with 骑 (qí), NOT 坐, because you sit ON it.', 'word', '我骑自行车去学校。', '"I ride a bicycle to school." Key contrast with 坐 — bikes use 骑 because you straddle, not sit in.', null, [ACT.vocabularyTransport]),
    createContentItem('电动车', 'diàndòngchē', 'An electric scooter / e-bike. Massively popular in Chinese cities for delivery workers and short-distance commuters. Pairs with 骑. The category is sometimes called 电瓶车 (diànpíngchē) too.', 'word', '我骑电动车去上班。', '"I ride my e-bike to work." 上班 (shàng bān) = go to work.', null, [ACT.vocabularyTransport]),
    createContentItem('高铁', 'gāotiě', 'High-speed rail. The defining feature of modern Chinese travel — over 40,000 km of track connect every major city at 300 km/h+. Beijing to Shanghai is about 4.5 hours; Beijing to Xi\'an is about 4.5 hours. Pairs with 坐.', 'word', '我下星期坐高铁去上海。', '"Next week I am taking the high-speed rail to Shanghai." The default intercity choice — faster than flying for trips under ~1,000 km.', null, [ACT.vocabularyTransport]),
    createContentItem('飞机', 'fēijī', 'An airplane. Pairs with 坐. For long-distance domestic trips (1,500+ km) or international travel. The phrase 坐飞机 (zuò fēijī, "take a plane") is the standard; in casual speech, some say 飞 ("fly") as a verb directly.', 'word', '我妈妈坐飞机来北京。', '"My mom is flying to Beijing." Using 来 because Beijing is where the speaker is.', null, [ACT.vocabularyTransport]),
    createContentItem('走路', 'zǒu lù', 'To walk (literally "walk road"). The default for short distances; no transport verb is needed because there is no vehicle. Sometimes phrased as 走着去 (zǒu zhe qù, "go on foot").', 'word', '咖啡馆很近，我们走路去吧。', '"The cafe is close, let\'s walk." 近 (jìn) = near.', null, [ACT.vocabularyTransport]),
    createContentItem('跟', 'gēn', 'The companion preposition "with" (also "and" in some contexts). Pattern: 跟 + person + 一起 + verb. Alternative: 和 (hé, more neutral/written) or 同 (tóng, formal/old-fashioned). 跟 is the most common in spoken Mandarin.', 'word', '我跟朋友一起去看电影。', '"I am going to see a movie with a friend." 跟…一起 frames the companion before the main verb.', null, [ACT.vocabularyTransport]),
    createContentItem('一起', 'yìqǐ', 'Together. The companion-emphasizing adverb that almost always pairs with 跟 X (with X) for the meaning "together with X". Can also stand alone after 一起 + verb (一起去 = go together) when the people are already clear from context.', 'word', '我们一起去吧!', '"Let\'s go together!" The casual group-invitation pattern; 吧 softens the suggestion.', null, [ACT.vocabularyTransport]),
    createContentItem('朋友', 'péngyou', 'A friend. Higher-frequency than English "friend" — used more casually for classmates, colleagues, and even acquaintances. Plural is 朋友们 (péngyoumen) but the bare 朋友 often serves for plural too.', 'word', '我跟朋友一起去公园。', '"I am going to the park with friends." Standard companion phrase.', null, [ACT.vocabularyTransport]),
    createContentItem('同学', 'tóngxué', 'A classmate. More specific than 朋友 — used for current schoolmates. Also used as an address term: 同学! ("hey, student!") is how someone might call out to a young person they don\'t know in a school setting.', 'word', '我跟同学去图书馆学习。', '"I am going to the library to study with classmates." A common Tsinghua-life sentence.', null, [ACT.vocabularyTransport]),
    createContentItem('家人', 'jiārén', 'Family members. Broader than English "family" — covers parents, siblings, spouse, and sometimes close relatives. Singular and plural use the same form; the context decides.', 'word', '我跟家人一起去西安。', '"I am going to Xi\'an with my family." A typical holiday-trip framing.', null, [ACT.vocabularyTransport]),
    createContentItem('一个人', 'yī gè rén', 'Alone (literally "one person"). Pairs with 自己 (zìjǐ, oneself) for emphasis: 我一个人去 ("I\'m going by myself"). Distinct from 一个人 used as a counted noun ("one person") — context disambiguates.', 'word', '今天我一个人去咖啡馆。', '"Today I am going to the cafe alone." 一个人 placed before the verb for "by oneself" reading.', null, [ACT.vocabularyTransport]),
    createContentItem('见 (朋友)', 'jiàn (péngyou)', 'To see / meet (a person) — verb used after 去 + place to express purpose. Pattern: 去 PLACE 见 PERSON ("go to PLACE to meet PERSON"). Distinct from 看 (kàn, "look at/watch") which is for objects or activities.', 'word', '我去咖啡馆见朋友。', '"I am going to the cafe to meet a friend." Purpose-chain pattern from Grammar III.', null, [ACT.vocabularyTransport]),
    createContentItem('吃 (饭)', 'chī (fàn)', 'To eat (a meal). The default purpose verb for restaurant trips. 吃饭 (chī fàn, "eat rice/meal") is the everyday word for "have a meal" regardless of what is actually eaten.', 'word', '我们去餐厅吃饭。', '"We are going to the restaurant to eat." Standard purpose pairing for 餐厅.', null, [ACT.vocabularyTransport]),
    createContentItem('买 (东西)', 'mǎi (dōngxi)', 'To buy (things). Pairs with shopping destinations. 东西 (dōngxi, "thing/stuff") is the all-purpose word for unspecified items; for specific items, swap in the noun: 买衣服 (buy clothes), 买书 (buy books).', 'word', '我去商场买东西。', '"I am going to the mall to shop." Standard purpose pairing for 商场.', null, [ACT.vocabularyTransport]),
    createContentItem('看 (电影)', 'kàn (diànyǐng)', 'To watch (a movie). Pairs with 电影院. The verb 看 also covers "read" (看书 read a book) and "look at" (看一下 take a look) — same character, three closely related meanings.', 'word', '我跟朋友去电影院看电影。', '"I am going to the cinema to watch a movie with a friend." Combines all five Unit 7 slots.', null, [ACT.vocabularyTransport]),
    createContentItem('学 (中文)', 'xué (Zhōngwén)', 'To study (Chinese). 学 (xué) is the active "study" verb; pairs with 学习 (xuéxí) as a compound for "study (in general)". 中文 is the language; 汉语 (Hànyǔ) is interchangeable in most contexts.', 'word', '我去图书馆学中文。', '"I am going to the library to study Chinese." Purpose verb 学 + object 中文.', null, [ACT.vocabularyTransport]),
    createContentItem('玩', 'wán', 'To play / hang out / have fun. The all-purpose leisure verb. 去玩 ("go and hang out") is the catch-all for any unplanned leisure trip. Also used for tourism: 去北京玩 = "go visit Beijing".', 'word', '这个周末我们去公园玩吧。', '"Let\'s go hang out at the park this weekend." The casual default for weekend plans.', null, [ACT.vocabularyTransport]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar I: Future plans
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '要 — future / plan',
      'yào — future / plan',
      'The modal verb 要 (yào) marks a future plan or intention: 我明天要去北京 = "I will go to Beijing tomorrow". Unlike English future tense, Mandarin verbs themselves never change — 要 is a separate word placed BEFORE the verb. 要 can also mean "want" or "need" — context decides.',
      'sentence',
      '我明天要去图书馆。 (I will go to the library tomorrow.)\n这个周末我要跟朋友去电影院。 (This weekend I am going to the cinema with friends.)',
      'High-frequency way to talk about plans 1–7 days out; for less definite intentions, use 想 (xiǎng, "want to / would like to") instead.',
      [
        { target: '要 + verb (plan)', note: '"will / plan to / be going to" — definite upcoming action' },
        { target: '要 + noun (want)', note: '"want X" — a different use of the same word (我要咖啡 "I want coffee")' },
        { target: '想 + verb (softer)', note: 'less committed wish/intent ("would like to") — distinct from definite plan 要' },
      ],
      [ACT.grammarFuture],
    ),
    createContentItem(
      'Bare 去 + time word',
      'bare qù + time word',
      'For DEFINITE near-future plans, you can drop 要 if a time word makes the future clear. 我明天去上海 ("I\'m going to Shanghai tomorrow") sounds natural and confident — the 明天 carries the future meaning. Adding 要 makes it slightly more formal or emphasizes commitment.',
      'sentence',
      '我明天去上海。 (I\'m going to Shanghai tomorrow — confident plan.)\n我明天要去上海。 (I will go to Shanghai tomorrow — slightly more emphatic.)',
      'Both are correct; the bare 去 form is more common in casual speech when the plan is settled.',
      [
        { target: '明天 + 去 (no 要)', note: 'casual confident plan; time word does the work' },
        { target: '明天 + 要 + 去', note: 'emphasizes commitment or formality; slightly more deliberate' },
      ],
      [ACT.grammarFuture],
    ),
    createContentItem(
      'Time word placement',
      'time word placement',
      'Time words go BEFORE the verb in Mandarin, never at the end as in English. Two acceptable positions: (1) after the subject — 我明天去 / 我下星期去, or (2) before the subject — 明天我去 / 下星期我去 for slight emphasis on the time. NEVER 我去明天 (a common English-speaker error).',
      'sentence',
      'CORRECT: 我明天去北京 OR 明天我去北京\nWRONG: 我去北京明天 (English-style; ungrammatical in Mandarin)',
      'The time-first habit is one of the highest-impact Mandarin sentence-structure shifts for English speakers.',
      [
        { target: '我 + TIME + 去', note: 'most common neutral order' },
        { target: 'TIME + 我 + 去', note: 'time-fronted for emphasis ("As for tomorrow, I am going…")' },
        { target: '我 + 去 + TIME (✗)', note: 'wrong — never put the time at the end like English' },
      ],
      [ACT.grammarFuture],
    ),
    createContentItem(
      'Question form',
      'rising tone or 吗',
      'Form a yes/no future question by adding 吗 (ma) at the end: 你明天去图书馆吗? ("Are you going to the library tomorrow?"). For "where" questions, swap in 哪儿/哪里: 你周末去哪儿? ("Where are you going this weekend?"). Word order stays the same as in statements.',
      'sentence',
      '你明天去图书馆吗? (yes/no — adds 吗)\n你周末去哪儿? (where — swap in 哪儿)\n你跟谁一起去? (who-with — swap in 谁)',
      'The "no word movement" rule of Mandarin question formation — much simpler than English wh-question movement.',
      [
        { target: '吗 question', note: 'add 吗 at the end of any statement to get a yes/no question' },
        { target: '哪儿 / 哪里 question', note: '"where" — substitutes the unknown place in the same slot' },
        { target: '谁 question', note: '"who" — substitutes the person; 跟谁一起 = "with whom"' },
      ],
      [ACT.grammarFuture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar II: Transportation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '坐 + 交通工具',
      'zuò + jiāotōng gōngjù',
      'Use 坐 (zuò, "to sit / take") with vehicles you sit INSIDE: 坐地铁 (subway), 坐公交车 (bus), 坐出租车 (taxi), 坐高铁 (high-speed rail), 坐飞机 (plane), 坐船 (boat). The mental model: you board it and sit in a seat.',
      'sentence',
      '我坐地铁去学校。 (I take the subway to school.)\n我们坐高铁去上海。 (We are taking the high-speed rail to Shanghai.)',
      'The most common transport verb in urban Chinese life; appears in any sentence describing how you got somewhere.',
      [
        { target: '坐地铁', note: 'take the subway — Beijing\'s default urban transport' },
        { target: '坐公交车', note: 'take the bus — also 坐公交 for short' },
        { target: '坐高铁', note: 'take the high-speed train — the iconic intercity choice' },
        { target: '坐飞机', note: 'take a plane / fly — used for long-distance or international' },
      ],
      [ACT.grammarTransport],
    ),
    createContentItem(
      '骑 + 交通工具',
      'qí + jiāotōng gōngjù',
      'Use 骑 (qí, "to ride / straddle") with vehicles you sit ON: 骑自行车 (bicycle), 骑电动车 (e-bike), 骑摩托车 (motorcycle), 骑马 (horse). The mental model: you straddle it. NEVER 坐自行车 (a common learner error).',
      'sentence',
      '我骑自行车去图书馆。 (I ride my bike to the library.)\n他骑电动车去送外卖。 (He rides an e-bike to deliver food.)',
      'The 坐 vs 骑 distinction is one of the most reliable Mandarin transport-word splits — vehicles you sit IN vs vehicles you straddle.',
      [
        { target: '骑自行车', note: 'ride a bicycle — Beijing\'s share-bike system has made this universal again' },
        { target: '骑电动车', note: 'ride an e-bike — ubiquitous among delivery workers and short-distance commuters' },
        { target: '骑摩托车', note: 'ride a motorcycle — less common in big cities (banned in Beijing center)' },
      ],
      [ACT.grammarTransport],
    ),
    createContentItem(
      'Transport BEFORE destination',
      'transport before destination',
      'In Mandarin, the transport phrase comes BEFORE the destination verb 去, not after as in English. Pattern: 我 + 坐/骑 + VEHICLE + 去 + PLACE. Compare English "I go to the library by bike" — Mandarin reverses this to "I by-bike go to-library": 我骑自行车去图书馆。',
      'sentence',
      'Mandarin: 我坐地铁去学校 — literal: I-subway-go-school\nEnglish: I go to school by subway',
      'The reversed order is one of the highest-impact word-order shifts for English speakers — practice it until it feels natural.',
      [
        { target: '我 + 坐/骑 + VEHICLE', note: 'first slot: how you travel' },
        { target: '+ 去 + PLACE', note: 'second slot: where you go' },
        { target: 'WRONG: 我去学校坐地铁', note: 'English-style transport-at-end order; sounds wrong in Mandarin' },
      ],
      [ACT.grammarTransport],
    ),
    createContentItem(
      'Walking — 走路 去',
      'zǒu lù qù',
      'For walking, no transport verb is needed because there is no vehicle. Use 走路 ("walk") or 走着 ("on foot") before 去: 我走路去咖啡馆 ("I walk to the cafe"). For short distances, even just 我去咖啡馆 implies walking by default.',
      'sentence',
      '咖啡馆很近，我们走路去吧。 (The cafe is close, let\'s walk.)\n图书馆远吗？我们走路去还是坐地铁? (Is the library far? Should we walk or take the subway?)',
      'A useful contrast item — walking patterns differently from vehicle transport because there is no vehicle noun.',
      [
        { target: '走路 去', note: 'walk to — adverb-like construction; no vehicle word' },
        { target: '走着 去', note: 'go on foot — slightly more formal; 着 marks ongoing manner' },
        { target: 'plain 去 (short distance)', note: 'context-implied walking; "我去食堂" usually means walking if the canteen is on campus' },
      ],
      [ACT.grammarTransport],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar III: Purpose chain + companions
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '去 X 做 Y — serial verbs',
      'qù X zuò Y',
      'Mandarin chains destination and purpose with no connector word: 去 + PLACE + VERB + OBJECT. 我去图书馆看书 = "I go to the library to read books" — two verbs (去 and 看) sit side by side because the second one is the purpose. No "to" or "in order to" needed.',
      'sentence',
      '我去咖啡馆喝咖啡。 (I go to the cafe to drink coffee.)\n他去商场买衣服。 (He is going to the mall to buy clothes.)\n我们去电影院看电影。 (We are going to the cinema to watch a movie.)',
      'The serial-verb construction is one of Mandarin\'s most efficient grammar patterns — fewer words than English, same meaning.',
      [
        { target: '去 (destination verb)', note: 'first verb: motion-toward' },
        { target: 'PLACE', note: 'destination — directly after 去 with no preposition' },
        { target: 'VERB + OBJECT (purpose)', note: 'second verb-phrase: what you do there; no connector word needed' },
      ],
      [ACT.grammarPurpose],
    ),
    createContentItem(
      '跟 X 一起 — companion',
      'gēn X yìqǐ',
      'Express "with X" using 跟 + person + 一起 (together). Placed between the subject and the main verb: 我 + 跟朋友一起 + 去公园 ("I go to the park with friends"). 跟 alone is enough for "with"; 一起 emphasizes "together". Alternative: 和 (hé, slightly more formal) replaces 跟.',
      'sentence',
      '我跟朋友一起去看电影。 (I go to see a movie with friends.)\n我跟家人一起去西安。 (I go to Xi\'an with my family.)\n你跟谁一起去? (Who are you going with?)',
      'The most common companion frame in everyday Mandarin speech.',
      [
        { target: '跟 (with)', note: 'the preposition; 跟 in spoken, 和 in writing, 同 in formal contexts' },
        { target: 'X (person)', note: '朋友 / 同学 / 家人 / 老师 — the companion noun or name' },
        { target: '一起 (together)', note: 'emphasizes shared activity; can be dropped if context already makes "together" clear' },
      ],
      [ACT.grammarPurpose],
    ),
    createContentItem(
      'Full five-slot template',
      'full five-slot template',
      'The canonical "going somewhere" sentence assembles up to five slots in order: [SUBJECT] [TIME] [跟 X 一起] [坐/骑 + VEHICLE] 去 [DESTINATION] [PURPOSE VERB + OBJECT]. Every slot except the subject and 去 is optional. This is the spine of all Unit 7 sentences.',
      'sentence',
      '我明天跟朋友一起坐地铁去商场买衣服。\n(I will go to the mall to buy clothes with friends by subway tomorrow.)',
      'The longest, most complete Unit 7 sentence — once this fits in one breath, every shorter variant follows.',
      [
        { target: '我 (subject)', note: 'who is going' },
        { target: '明天 (time)', note: 'when — placed after subject, before companion' },
        { target: '跟朋友一起 (companion)', note: 'with whom — Grammar III frame' },
        { target: '坐地铁 (transport)', note: 'how — Grammar II frame, placed BEFORE 去' },
        { target: '去商场 (destination)', note: 'where to' },
        { target: '买衣服 (purpose)', note: 'why — serial verb phrase' },
      ],
      [ACT.grammarPurpose],
    ),
    createContentItem(
      'Invitation patterns',
      'invitation patterns',
      'To invite someone along: 你要不要跟我一起去? ("Do you want to come with me?" — gives an out) or 我们一起去吧! ("Let\'s go together!" — assumes yes). The 要不要 form is polite and gives the listener room to decline; 吧 softens the imperative.',
      'sentence',
      '我下午要去咖啡馆，你要不要一起去? (I\'m going to the cafe this afternoon, want to come?)\n我们这个周末一起去公园吧! (Let\'s go to the park together this weekend!)',
      'Both invitation patterns are common in friend-to-friend Mandarin; 要不要 is more deferent, 吧 is more enthusiastic.',
      [
        { target: '要不要…?', note: 'A-not-A question pattern asking "do you want or not"; polite invite' },
        { target: '…吧!', note: 'sentence-final particle softening a suggestion; "let\'s…" feel' },
        { target: '一起去 (in both)', note: 'the companion phrase from Grammar III, reused as the invite hook' },
      ],
      [ACT.grammarPurpose],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '我的周末计划',
      'wǒ de zhōumò jìhuà',
      'A complete five-sentence weekend itinerary in Mandarin. Read it aloud with correct tones, sandhi, and natural rhythm. Notice how every sentence uses at least three Unit 7 slots — time, transport, destination, and either companion or purpose.',
      'sentence',
      '这个周末我很忙。星期六早上我要跟同学一起去图书馆学习。中午我们坐地铁去商场吃饭，下午去电影院看电影。星期天我一个人骑自行车去公园跑步。晚上我跟家人一起去餐厅吃饭。',
      'Translation: "This weekend I am very busy. Saturday morning I am going to the library to study with classmates. At noon we are taking the subway to the mall to eat, and in the afternoon to the cinema to watch a movie. Sunday I will ride my bike alone to the park to jog. In the evening I am going to a restaurant with family for dinner."',
      [
        { target: '这个周末我很忙', note: '"This weekend I am very busy" — opening sentence sets the scene; 很忙 ("very busy") uses 很 + adjective, no 是' },
        { target: '跟同学一起去图书馆学习', note: 'companion (跟 X 一起) + destination (去 X) + purpose (学习) — three Unit 7 slots' },
        { target: '坐地铁去商场吃饭', note: 'transport (坐 X) + destination (去 X) + purpose (吃饭) — three Unit 7 slots' },
        { target: '一个人骑自行车去公园跑步', note: 'alone (一个人) + transport (骑 X) + destination + purpose — four slots' },
        { target: '跟家人一起去餐厅吃饭', note: 'companion + destination + purpose — three slots; common family-evening framing' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '理解问题',
      'lǐjiě wèntí',
      'Four standard comprehension questions matching the paragraph. Answer each in a short sentence using 去 + place or full Unit 7 chains; complete sentences are not required for natural Mandarin.',
      'sentence',
      'Q1: 星期六早上他去哪儿? 跟谁? Q2: 他们怎么去商场? Q3: 星期天他一个人做什么? Q4: 晚上他跟谁一起吃饭?',
      'Four questions covering destination + companion, transport, solo activity, and companion + meal — touching every Unit 7 micro-skill.',
      [
        { target: 'A1: 他去图书馆，跟同学一起。', note: 'destination + companion; uses 跟 X 一起 from Grammar III' },
        { target: 'A2: 他们坐地铁去商场。', note: 'transport-first sentence; uses 坐 X 去 Y from Grammar II' },
        { target: 'A3: 他一个人骑自行车去公园跑步。', note: 'solo + transport + destination + purpose — a four-slot answer' },
        { target: 'A4: 他跟家人一起吃饭。', note: 'companion + activity; the everyday family-dinner framing' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Listening & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '你周末去哪儿? (对话 — 同学之间)',
      'nǐ zhōumò qù nǎr? (duìhuà — tóngxué zhī jiān)',
      'A natural casual-register weekend-plan conversation between two Tsinghua classmates over lunch. Covers all the patterns from this lesson: future plans, transport, purpose, companions, and invitations.',
      'conversation',
      'A: 你这个周末要做什么?\nB: 我星期六要跟朋友去商场买衣服，星期天去图书馆学习。你呢?\nA: 我星期六要回家，跟家人一起吃饭。星期天还没想好。\nB: 那星期天跟我一起去图书馆吧!\nA: 好啊! 我们怎么去? 坐地铁还是骑自行车?\nB: 我骑自行车去，你呢?\nA: 我也骑自行车，那我们一起骑过去。\nB: 好，星期天早上九点见!',
      'A natural exchange between peers using casual register — the default for student-age interactions in Mainland China.',
      [
        { target: '你呢? nǐ ne?', note: 'standard return-the-question phrase after answering your own turn — "and you?"' },
        { target: '还没想好 hái méi xiǎng hǎo', note: '"haven\'t decided yet" — 还没 + verb + 好 = "haven\'t finished doing X yet"' },
        { target: '跟我一起去吧!', note: 'the casual invitation pattern with 吧 — Grammar III' },
        { target: 'A 还是 B?', note: '"A or B?" — choice question, used here for "subway or bike?"' },
        { target: '我们一起骑过去', note: '"let\'s ride over together" — 过去 (guòqù, "go over") adds direction' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      '你下星期去上海吗? (对话 — 礼貌)',
      'nǐ xià xīngqī qù Shànghǎi ma? (duìhuà — lǐmào)',
      'A polite-register conversation between a student and a slightly older Tsinghua senior about an upcoming trip to Shanghai. Notice the 您 honorific, 高铁 vocabulary, and more complete sentences — register markers signaling a more deliberate interaction.',
      'conversation',
      '学生: 学长，您下星期去上海吗?\n学长: 是的，我下星期五要去上海开会。\n学生: 您怎么去? 坐高铁还是飞机?\n学长: 我坐高铁，比较方便。北京到上海四个半小时。\n学生: 哇，真快! 您一个人去吗?\n学长: 不，我跟两个同事一起去。你呢? 周末有什么计划?\n学生: 我这个周末跟家人去西安玩。我们也坐高铁。\n学长: 西安很好玩! 兵马俑一定要看。\n学生: 谢谢学长! 那我们出发前再聊!',
      'Same Unit 7 grammar as the casual dialogue but with formal phrasing throughout — appropriate for senior-junior student relationships in Chinese academic culture.',
      [
        { target: '学长 xuézhǎng', note: '"senior student" — junior-to-senior address term; 学长 for male, 学姐 for female' },
        { target: '您 nín', note: 'honorific "you" used throughout by the junior; switching to 你 mid-conversation would be a social error' },
        { target: '开会 kāi huì', note: '"have a meeting / attend a conference" — common business-trip purpose' },
        { target: '比较方便 bǐjiào fāngbiàn', note: '"relatively convenient" — 比较 softens any adjective; appears in any comparison' },
        { target: '兵马俑 Bīngmǎyǒng', note: '"Terracotta Army" — Xi\'an\'s iconic UNESCO site; obligatory culture reference' },
        { target: '出发前 chūfā qián', note: '"before setting off" — 出发 (depart) + 前 (before)' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '写作模板',
      'xiězuò múbǎn',
      'A reusable five-sentence template for any Mandarin weekend-plan write-up. Fill in the bracketed slots with your own information — the template guarantees you exercise every Unit 7 grammar point.',
      'sentence',
      '这个周末我很 [忙 / 高兴 / 紧张]。\n星期六 [上午 / 下午 / 晚上] 我要跟 [人] 一起 [坐 / 骑] [交通工具] 去 [地方] [动词 + 宾语]。\n[时间] 我们去 [地方] [动词 + 宾语]。\n星期天我 [一个人 / 跟 X 一起] 去 [地方] [动词 + 宾语]。\n这个周末我很期待!',
      'Five sentences cover the core: scene-setter, Saturday plan, Saturday second activity, Sunday plan, closing — the minimum complete weekend description.',
      [
        { target: '[人]', note: '同学 / 朋友 / 家人 — companion noun from Vocabulary II' },
        { target: '[坐/骑 + 交通工具]', note: 'transport — 坐 for sit-in vehicles, 骑 for straddle vehicles' },
        { target: '[地方]', note: 'destination — 图书馆 / 商场 / 公园 / 餐厅 from Vocabulary I' },
        { target: '[动词 + 宾语]', note: 'purpose phrase — 看书 / 买东西 / 吃饭 / 看电影 from Vocabulary II' },
        { target: '很期待 hěn qīdài', note: '"really looking forward to it" — common closing for any anticipated plan' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '写作练习',
      'xiězuò liànxí',
      'Write your own 4–5 sentence weekend plan in Hanzi using the template. Use 要去 or bare 去 + time word at least twice, one 坐 or 骑 transport phrase, and one 跟…一起 companion phrase — this guarantees Unit 7 coverage.',
      'sentence',
      '示例: 这个周末我很忙。星期六早上我跟同学一起坐地铁去图书馆学习。中午我们一起去食堂吃饭。下午我一个人骑自行车去公园跑步。星期天晚上我要跟家人一起去餐厅吃饭。',
      'Translation: "This weekend I am very busy. Saturday morning I am taking the subway to the library to study with classmates. At noon we are eating together at the canteen. In the afternoon I am riding my bike alone to the park to jog. Sunday evening I will go to a restaurant with my family for dinner."',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '高铁',
      'gāotiě',
      'High-speed rail is the defining feature of modern Chinese travel: over 40,000 km of track (the world\'s largest network) connect every major city at 300 km/h or more. Beijing to Shanghai (~1,300 km) is about 4.5 hours; Beijing to Xi\'an is similar. For trips under ~1,000 km, the high-speed train beats flying door-to-door because stations are downtown and check-in is short.',
      'sentence',
      '北京到上海坐高铁四个半小时。 (Beijing to Shanghai by high-speed rail is four and a half hours.)',
      'The cultural shift from sleeper trains and flights to high-speed rail has reshaped Chinese long-distance travel since 2008 — domestic 1,000-km trips now feel like commutes.',
      [
        { target: '高铁 gāotiě', note: '"high-speed rail" — the network and the train; abbreviated from 高速铁路' },
        { target: '动车 dòngchē', note: 'slightly slower (~200 km/h) electric multiple-unit train; cheaper than 高铁; often included under the same casual umbrella' },
        { target: '北京南站', note: 'Beijing South Station — the main hub for high-speed rail going south' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '扫码支付',
      'sǎo mǎ zhīfù',
      'QR-code payment dominates Chinese transit: subways, buses, taxis, ride-hailing apps, and even most street vendors accept WeChat Pay (微信支付) or Alipay (支付宝) QR scans. Cash is increasingly rare; international tourists used to face friction here but the two apps now accept foreign cards. Bring a smartphone, not a wallet.',
      'sentence',
      '我用微信支付坐地铁。 (I use WeChat Pay to take the subway.)',
      'The shift from cash to QR payment between 2014 and 2020 is one of the most visible everyday-life changes in modern China — knowing the vocabulary saves real friction during travel.',
      [
        { target: '微信支付 Wēixìn Zhīfù', note: 'WeChat Pay — embedded in the WeChat messaging app, used by ~1 billion people daily' },
        { target: '支付宝 Zhīfùbǎo', note: 'Alipay — Alibaba\'s payment app, the other dominant option; slightly more international-friendly' },
        { target: '扫码 sǎo mǎ', note: '"scan the code" — the verb-object phrase for the action of QR scanning' },
        { target: '现金 xiànjīn', note: '"cash" — now rare in urban transit; some elderly riders still use it' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '滴滴',
      'Dīdī',
      'Didi (滴滴) is the dominant ride-hailing app in China — the local equivalent of Uber, but vastly larger domestically (Uber sold its China operations to Didi in 2016). Common verbs: 打车 (dǎ chē, "grab a cab") or 叫车 (jiào chē, "call a cab") for the action; the destination and fare are confirmed in the app before pickup.',
      'sentence',
      '今天下雨，我们叫一辆滴滴吧。 (It\'s raining today, let\'s call a Didi.)',
      'Knowing 滴滴 by name lets you participate in any travel conversation about getting to the airport, station, or a late-night destination in a Chinese city.',
      [
        { target: '滴滴 Dīdī', note: 'short for 滴滴出行 (Dīdī Chūxíng, "Didi Travel"); the dominant ride-hail platform' },
        { target: '打车 dǎ chē', note: '"grab a cab" — the casual verb for any taxi or ride-hail action; covers both street-hail and app' },
        { target: '叫车 jiào chē', note: '"call a cab" — slightly more specific to app-based ride-hailing' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '中国旅游热点',
      'Zhōngguó lǚyóu rèdiǎn',
      'Four iconic tourist destinations cover the breadth of Chinese travel: 北京 (Beijing — Forbidden City and Great Wall), 上海 (Shanghai — the Bund and modernity), 西安 (Xi\'an — Terracotta Army and the Silk Road), 桂林 (Guilin — karst mountains and Li River). A first trip typically hits one northern (Beijing or Xi\'an), one eastern (Shanghai), and one southern (Guilin) city.',
      'sentence',
      '我下个月要去西安看兵马俑。 (Next month I am going to Xi\'an to see the Terracotta Army.)',
      'These four cities are the standard mental map for any "where in China have you been?" conversation — knowing them anchors travel small talk.',
      [
        { target: '北京 Běijīng', note: 'Northern Capital — political and cultural center; Forbidden City (故宫), Great Wall (长城)' },
        { target: '上海 Shànghǎi', note: 'Shanghai — financial hub; the Bund (外滩), modern skyscrapers, French Concession' },
        { target: '西安 Xī\'ān', note: 'Xi\'an — ancient capital of 13 dynasties; Terracotta Army (兵马俑), city wall' },
        { target: '桂林 Guìlín', note: 'Guilin — karst landscape; Li River (漓江) boat trips; the saying "桂林山水甲天下" ("Guilin\'s landscape is the world\'s finest")' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '任务: 跟同学一起计划周末',
      'rènwù: gēn tóngxué yìqǐ jìhuà zhōumò',
      'Roleplay planning a weekend trip with the tutor playing a Tsinghua classmate over lunch in the campus canteen. Use every skill from this lesson in one continuous scene — destination, transport, time, purpose, companion, and a concrete invitation that turns into a shared plan.',
      'conversation',
      '[Tsinghua campus, lunch hour at the canteen]\n同学: 这个周末你有什么计划?\n你: [time word + destination + purpose]\n同学: 哦，听起来很不错! 你怎么去?\n你: [transport mode + 去 + place]\n同学: 你一个人去还是跟朋友一起?\n你: [companion answer + invite the classmate]\n同学: [accepts or has a different plan]\n你: [respond + agree on a time]\n同学: 好的，那周末见!',
      'Six turns of fluent exchange; the tutor will prompt you and respond naturally to whatever you say.',
      [
        { target: 'destination + purpose', note: '我要去 X + VERB + OBJECT — Grammar III serial-verb chain' },
        { target: 'transport', note: '坐 X 去 Y or 骑 X 去 Y — Grammar II frame, transport BEFORE destination' },
        { target: 'companion or invite', note: '跟 X 一起 / 你要不要一起去? — Grammar III companion frame and the casual invitation pattern' },
        { target: 'time agreement', note: '星期 X 早上 / 下午 + 几点 — concrete day + time for the meet-up' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战 — 旅行计划',
      'tiǎozhàn — lǚxíng jìhuà',
      'Stretch goal: in the same scene, the classmate suggests turning the weekend into a high-speed-rail trip to Xi\'an or Shanghai. Discuss transport (高铁 vs 飞机), purpose (兵马俑 vs 外滩), and split the planning. Closes Unit 7 with a real intercity-travel exchange.',
      'conversation',
      '同学: 我们去西安怎么样? 我一直想看兵马俑。\n你: 好啊! 我们怎么去? 坐高铁还是坐飞机?\n同学: 坐高铁吧，四个半小时就到了，比飞机方便。\n你: 那我们什么时候去? 这个周末吗?\n同学: 这个周末有点儿赶，下个周末好不好?\n你: 好! 我今天晚上就买高铁票。\n同学: 太好了! 那我订酒店。\n你: 一言为定!',
      '"一言为定" (yī yán wéi dìng) is a casual but emphatic agreement — "deal!" / "it\'s settled with one word" — common when locking in a plan.',
      [
        { target: '怎么样? zěnmeyàng?', note: '"how about it?" — the standard suggestion-checker; appears after almost any proposal' },
        { target: '一直想 yīzhí xiǎng', note: '"have always wanted to" — 一直 (continuously) + 想 (want to) for long-held wishes' },
        { target: '有点儿赶 yǒudiǎnr gǎn', note: '"a bit rushed" — 有点儿 softens negative-leaning adjectives' },
        { target: '一言为定 yī yán wéi dìng', note: '"deal!" / "it\'s settled" — casual but emphatic; common when locking in a plan' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
