// Level 1 Unit 13 — Transportation: Tickets, Routes & Transit Logistics (Mandarin Chinese)
// Functions: buying tickets, asking timing and prices, choosing routes, navigating
// transfers, giving multi-step directions. Builds on Unit 7's 坐/骑 + vehicle by
// going deeper into actual transit logistics — tickets, stations, timing, transfers.
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
  orientation: 'zh-l1u13-orientation',
  pronunciation: 'zh-l1u13-pronunciation',
  vocabularyTransit: 'zh-l1u13-vocab-transit',
  vocabularyTickets: 'zh-l1u13-vocab-tickets',
  grammarFromTo: 'zh-l1u13-grammar-from-to',
  grammarDuration: 'zh-l1u13-grammar-duration',
  grammarSteps: 'zh-l1u13-grammar-steps',
  reading: 'zh-l1u13-reading',
  listening: 'zh-l1u13-listening',
  writing: 'zh-l1u13-writing',
  culture: 'zh-l1u13-culture',
  task: 'zh-l1u13-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Ask how to get to any place using 怎么去 and follow a multi-step transit answer involving subway, bus, or high-speed rail.',
      'Buy a ticket: state your destination, ticket type (single / round-trip / student), and read back the price and departure time.',
      'Describe a route with origin, destination, mode, duration, and at least one transfer — the full anatomy of a real city trip.',
    ],
    task: 'Picture yourself at Tsinghua needing to reach 天安门 (Tiananmen) for a Saturday outing. By the end of this lesson you should plan the route, ask any missing piece (line, transfer, time, price), and confirm it in Mandarin without rehearsing each line.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in this lesson',
    goals: [
      'Pronounce 地铁 (dìtiě) with both fourth tones sharp and crisp — not as a soft "ditie" — since dì 地 vs dí 敌 vs dǐ 底 are minimal pairs that change meaning.',
      'Pronounce 换乘 (huànchéng) with the fourth + second-tone contour and the curled-tongue ch retroflex — the standard transit-app term for "transfer".',
      'Apply 一 (yī) sandhi inside time expressions like 一个小时 (yí ge xiǎoshí) — yī rises to yí before fourth-tone 个; this appears constantly in duration answers.',
    ],
    task: 'Read each transit phrase aloud, identify whether sandhi applies, then say the spoken (not written) tones.',
  },
  {
    id: ACT.vocabularyTransit,
    section: 'Vocabulary I',
    title: 'Transit modes, stations & transfers',
    goals: [
      'Use 9 transit modes precisely: 地铁 (subway), 公共汽车 (city bus), 出租车 (street taxi), 网约车 (ride-share like Didi), 高铁 (high-speed rail), 动车 (intercity express), 普通火车 (regular train), 飞机 (plane), 船 (boat).',
      'Use station and transfer words: 站 (stop / station), 起点站 (origin station), 终点站 (terminal station), 换乘 (transfer), 出口 (exit) — the navigation vocabulary every Beijing subway map prints.',
    ],
    task: 'List the modes you would use for (a) a 5-stop subway hop, (b) a Beijing-to-Shanghai trip, (c) a late-night ride home — pair each with its correct verb (坐 / 打 / 骑).',
  },
  {
    id: ACT.vocabularyTickets,
    section: 'Vocabulary II',
    title: 'Tickets, prices & timing',
    goals: [
      'Use 6 ticket-and-price words: 车票 (ticket), 票价 (fare), 单程 (one-way), 往返 (round-trip), 学生票 (student ticket), 公交卡 / 一卡通 (transit card).',
      'Use 4 timing words: 开车时间 (departure time), 到达时间 (arrival time), 出发 (to depart), 到 (to arrive) — the four things every ticket clerk and announcement uses.',
    ],
    task: 'Compose the questions a tourist would ask at a high-speed rail counter: destination, ticket type, price, departure time, arrival time — all in Mandarin.',
  },
  {
    id: ACT.grammarFromTo,
    section: 'Grammar I',
    title: '从 A 到 B — from A to B',
    goals: [
      'Use the 从 A 到 B pattern to mark a trip\'s origin and destination — the bedrock route-description structure in Mandarin.',
      'Place the 从…到… phrase BEFORE the verb (typical) or as a topic at sentence start (for emphasis): 从清华到天安门坐地铁要40分钟.',
      'Distinguish 从 (cóng, "from" — used for origin of motion or time) from 在 (zài, "at" — static location); confusing them is the most common error English speakers make.',
    ],
    task: 'Build three sentences using 从 A 到 B with a mode of transport, then convert one into a question by adding 怎么走?',
  },
  {
    id: ACT.grammarDuration,
    section: 'Grammar II',
    title: '要多长时间? — How long does it take?',
    goals: [
      'Ask duration with 要多长时间? (literally "needs how-long time?") — the universal Mandarin question for trip length, cooking time, study time.',
      'Answer with duration phrases in the order [number] + [time unit]: 40分钟 (40 minutes), 一个小时 (one hour), 一个半小时 (1.5 hours), 大概两个小时 (about two hours).',
      'Know that 要 (yào, "needs / takes") here is the verb of duration; can also use 得 (děi, "must take") in colloquial speech: 得两个小时.',
    ],
    task: 'Imagine three trips with different durations (10 min, 1.5 hours, 5 hours) — ask 要多长时间? and answer each fully.',
  },
  {
    id: ACT.grammarSteps,
    section: 'Grammar III',
    title: '先…再…然后… — first…then…after that…',
    goals: [
      'Sequence multi-step directions with 先 (xiān, "first"), 再 (zài, "then"), 然后 (ránhòu, "after that") — the standard adverb chain for ordered instructions.',
      'Place each adverb BEFORE its verb: 先坐4号线，再换13号线，然后走五分钟. Each step gets its own verb phrase, joined by commas.',
      'Distinguish 再 (zài, "then / again / next") from 又 (yòu, "again — already happened"); inside step-by-step directions, only 再 is correct because the events are still in the future.',
    ],
    task: 'Give a 3-step direction from your home to one Beijing landmark using 先…再…然后…',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'Read a route description',
    goals: [
      'Read a 5-sentence Beijing transit description aloud with correct tones, sandhi, and natural rhythm.',
      'Identify the origin, destination, modes used, transfer point, and total duration; answer four comprehension questions in short Mandarin sentences.',
    ],
    task: 'Read the paragraph below once, then answer four comprehension questions about route and timing.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'Asking the route + buying a ticket',
    goals: [
      'Follow a casual asking-the-route dialogue between two students plus a formal ticket-purchase dialogue at a 高铁 counter.',
      'Reproduce each dialogue with your own destination, swapping in the relevant transit options naturally.',
    ],
    task: 'Read each dialogue with the tutor first, then perform it again with your own information swapped in.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Write your own commute',
    goals: [
      'Write 3–5 sentences describing your daily commute (or a planned trip) in Hanzi, covering origin, destination, mode, duration, and any transfer.',
      'Use 从…到… at least once, 要多长时间 or a duration phrase at least once, and one step-sequencer (先 or 然后) so the writing demonstrates all three grammar points.',
    ],
    task: 'Write your own commute in 3–5 sentences using the template, then read it aloud with correct tones.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: 'Beijing subway, 滴滴, transit cards & high-speed rail',
    goals: [
      'Understand the Beijing 地铁 system: 25+ lines, color-coded, signage in Hanzi + Pinyin + English, fare by distance, paid by QR code via WeChat Pay or Alipay.',
      'Know the modern payment landscape: 一卡通 / 公交卡 (physical transit card, fading), 滴滴 (Didi, ride-share app), 微信支付 / 支付宝 (WeChat/Alipay QR scan — now dominant).',
      'Distinguish 高铁 (high-speed rail, prestige choice) from 动车 (intercity express) and 普通火车 (slow regular train) — and the train-station crowd culture of arriving 30+ minutes early.',
    ],
    task: 'Pick the best transit choice for (a) Tsinghua → Tiananmen on a sunny weekend, (b) Beijing → Shanghai for a Monday meeting, (c) midnight ride home in rain.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'Tsinghua to Tiananmen — plan it in Mandarin',
    goals: [
      'Combine everything from this lesson into one continuous trip-planning scene: ask the route, choose the mode, confirm the transfer, ask the duration, and confirm.',
      'Use Beijing-realistic line numbers and landmark stops (4号线 → 1号线 at 西单 / 13号线 → 2号线 at 西直门).',
    ],
    task: 'Roleplay planning a Saturday trip from Tsinghua to Tiananmen with the AI tutor playing a Beijing-savvy friend; aim for a 6-turn exchange covering route, mode, transfer, duration, and ticket.',
  },
];

const lesson = {
  title: 'Level 1 · Unit 13: 怎么去? — Transportation, Tickets & Routes',
  category: 'travel',
  difficulty: 'beginner',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'asking-how-to-get', label: 'Asking how to get somewhere', goal: 'Use 怎么去 X? or 从 A 到 B 怎么走? to ask for a route in any register.' },
    { id: 'buying-a-ticket', label: 'Buying a ticket', goal: 'At a counter, state destination + ticket type + count, then read back the price and departure time.' },
    { id: 'asking-duration-price', label: 'Asking how long and how much', goal: 'Use 要多长时间? and 多少钱? to pin down trip length and fare quickly.' },
    { id: 'giving-multistep-directions', label: 'Giving multi-step directions', goal: 'Use 先…再…然后… to chain 2–3 transit legs into a single clear instruction.' },
  ],
  relatedPools: ['topic-travel', 'topic-city'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '本课目标',
      'běn kè mùbiāo',
      'By the end of this lesson, you can ask how to reach any place, buy a ticket, ask how long the trip takes and how much it costs, and give multi-step directions with at least one transfer — the full toolkit for navigating a Chinese city or intercity trip.',
      'word',
      'Functional language: 问路 wèn lù (ask the route) · 买票 mǎi piào (buy a ticket) · 问时间 wèn shíjiān (ask duration) · 换乘 huànchéng (transfer)',
      'These four micro-skills together turn Unit 7\'s "by-subway-go-to-school" basics into actual city navigation that handles real-world friction.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      '从7单元到13单元',
      'cóng qī dānyuán dào shísān dānyuán',
      'Unit 7 (Going Places) taught 坐 / 骑 + vehicle to propose a trip. Unit 13 goes deeper: actual transit logistics — buying the ticket, asking the timing, choosing the right line, and handling transfers. The vocabulary expands; the grammar adds 从…到…, duration questions, and step sequencers.',
      'word',
      'Unit 7: 我坐地铁去学校. (I take the subway to school.)\nUnit 13: 从清华到天安门坐4号线要40分钟，在西单换1号线. (From Tsinghua to Tiananmen takes 40 min on Line 4, transfer to Line 1 at Xidan.)',
      'The Unit 7 sentence proposes; the Unit 13 sentence operates.',
      [
        { target: 'Unit 7 — propose a trip', note: '坐 + vehicle + 去 + place — minimum information' },
        { target: 'Unit 13 — operate the trip', note: '从…到… + line number + duration + transfer point — real navigation' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '真实场景',
      'zhēnshí chǎngjǐng',
      'You are at Tsinghua University and want to go to 天安门 (Tiananmen) on Saturday. You have never made the trip and need to figure out the subway lines, transfer point, total time, and fare — all by asking in Mandarin.',
      'word',
      '你: 从清华到天安门怎么走? — 朋友: 坐4号线，在西单换1号线，大概40分钟.',
      'A typical Beijing exchange: route question + line numbers + transfer point + duration — the standard shape of a transit answer.',
      [
        { target: '从 A 到 B 怎么走?', note: 'literal: "from A to B how to walk?" — standard route question even when the trip is by subway, not walking' },
        { target: '坐 + 号线', note: '坐 + line number (4号线 = Line 4); appearing constantly in Beijing transit speech' },
        { target: '在 X 换 Y', note: '"at X transfer to Y" — the transfer-point pattern; 换 is the short colloquial form of 换乘' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '地铁',
      'dìtiě',
      'Two consecutive fourth tones — sharp falling + sharp falling. Each syllable must be crisp, not slurred. The 地 (dì) here is the same character as in 地方 (dìfāng, "place"); the 铁 (tiě) literally means "iron", so 地铁 is "underground iron" = subway.',
      'word',
      '地铁 dìtiě (subway) · 4号线地铁 sì hào xiàn dìtiě (Line 4 subway)',
      'Two fourth tones in a row do NOT trigger sandhi — both stay sharp. Compare with two third tones (你好) which DO trigger sandhi.',
      [
        { target: '地 (dì, 4th)', note: 'sharp falling tone; "earth / ground"' },
        { target: '铁 (tiě, 3rd)', note: 'dip-and-rise; "iron"; sometimes shortened in fast speech but tone stays third' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '换乘',
      'huànchéng',
      'Fourth tone + second tone — falling then rising. The 换 (huàn) has the same sharp fall as 地; 乘 (chéng) rises smoothly from mid to high. The retroflex ch has the tongue curled back, distinct from the palatal q in 请 (qǐng).',
      'word',
      '换乘 huànchéng (transfer) · 换乘站 huànchéng zhàn (transfer station)',
      'The official subway-signage word for "transfer"; colloquially shortened to just 换 in spoken directions.',
      [
        { target: '换 (huàn, 4th)', note: 'sharp falling tone; "to change / exchange"' },
        { target: '乘 (chéng, 2nd)', note: 'rising tone; "to ride"; retroflex initial — tongue curled back, not flat like English "ch"' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '一个小时',
      'yī ge xiǎoshí (spoken: yí ge xiǎoshí)',
      '一 (yī) sandhi: yī rises to yí before a fourth-tone syllable. 个 (ge, neutral tone) does count as fourth-tone-origin for sandhi purposes, so yī → yí. This phrase ("one hour") is one of the most common duration answers in Mandarin.',
      'word',
      '一个小时 written: yī ge xiǎoshí → spoken: yí ge xiǎoshí',
      'Apply this sandhi automatically; nearly every "one + measure word" phrase triggers it.',
      [
        { target: '一 (written: yī, 1st)', note: 'default first tone in isolation or final position' },
        { target: '一 (spoken: yí, 2nd)', note: 'rises to second tone before 个 (ge, originally 4th) — standard 一 sandhi' },
        { target: '小时 (xiǎoshí, 3rd+2nd)', note: '"hour"; the 小 has third-tone dip-and-rise' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '票',
      'piào',
      'Single fourth-tone syllable — sharp falling pitch. The aspirated initial p- has a strong puff of air (unlike unaspirated b-). Critical word for this lesson: appears in 车票 (chēpiào, ticket), 票价 (piàojià, fare), 学生票 (xuéshēng piào, student ticket).',
      'word',
      '一张票 yī zhāng piào (one ticket) · 买两张票 mǎi liǎng zhāng piào (buy two tickets)',
      'Note 张 (zhāng) is the measure word for tickets — flat sheet-like things.',
      [
        { target: '票 (piào, 4th)', note: 'sharp falling tone; "ticket"' },
        { target: 'p- aspirated', note: 'strong puff of air, distinct from b- which has no puff' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '飞机',
      'fēijī',
      'Two consecutive first tones — both high and level. Hold the pitch steady on both syllables; no falling, no rising. The labiodental f- is identical to English "f". Same syllable structure as 公司 (gōngsī, company) — drill the two-high-level pattern.',
      'word',
      '飞机 fēijī (plane) · 坐飞机 zuò fēijī (take a plane)',
      'Two first tones is a common pattern; keep the pitch absolutely flat at the top of your range.',
      [
        { target: '飞 (fēi, 1st)', note: 'high level; "to fly"' },
        { target: '机 (jī, 1st)', note: 'high level; "machine"; together 飞机 = "flying machine" = plane' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Transit modes, stations & transfers
    // ────────────────────────────────────────────────────────────────────
    createContentItem('地铁', 'dìtiě', 'The subway — fastest urban transit in most Chinese cities and the default for trips over 3 km. Beijing\'s system has 25+ lines; signage is trilingual (Hanzi + Pinyin + English). Always pairs with 坐 (zuò). Fare scales with distance — typically 3–8 yuan per ride.', 'word', '我每天坐地铁去清华.', '"I take the subway to Tsinghua every day." Standard urban-commute pattern; 坐 + transit BEFORE 去 + destination.', null, [ACT.vocabularyTransit]),
    createContentItem('公共汽车', 'gōnggòng qìchē', 'A public city bus. The formal full name; in everyday speech, most Beijingers shorten it to 公交车 (gōngjiāochē) or just 公交. Cheaper than the subway (typically 2 yuan flat), denser network, but slower and subject to traffic. Pairs with 坐.', 'word', '我坐公共汽车回家.', '"I take the bus home." 回家 (huí jiā) = go home; for trips where speed matters less than coverage.', null, [ACT.vocabularyTransit]),
    createContentItem('出租车', 'chūzūchē', 'A traditional street-hailed taxi — yellow/red liveries vary by city. Pairs with 坐. The verb 打车 (dǎ chē, "grab a cab") covers both 出租车 and 网约车 colloquially. Now far less common than ride-share apps in major cities.', 'word', '下雨了，我们坐出租车吧.', '"It\'s started raining, let\'s take a taxi." 吧 softens the suggestion into a friendly proposal.', null, [ACT.vocabularyTransit]),
    createContentItem('网约车', 'wǎngyuēchē', 'A ride-share / app-hailed car (literally "internet-booked car"). The dominant urban mode in modern China — Didi (滴滴) has ~90% market share. Pairs with 坐 or with the verb 叫 (jiào, "to call"): 叫网约车 = "order a ride-share". Cheaper than 出租车 and easier to find at night.', 'word', '我用滴滴叫了一辆网约车.', '"I used Didi to order a ride-share." 用 (yòng) = use; 一辆 (yī liàng) is the measure word for vehicles.', null, [ACT.vocabularyTransit]),
    createContentItem('高铁', 'gāotiě', 'High-speed rail — the defining feature of modern Chinese intercity travel. 300+ km/h, departing from dedicated stations like 北京南站 (Beijing South) and 北京西站 (Beijing West). Pairs with 坐. Faster than flying for trips under ~1,000 km because there are no airport delays.', 'word', '我坐高铁去上海，4个半小时.', '"I take the high-speed rail to Shanghai — 4.5 hours." The default Beijing-Shanghai choice over flying.', null, [ACT.vocabularyTransit]),
    createContentItem('动车', 'dòngchē', 'Intercity express train — slightly slower than 高铁 (200 km/h vs 300+) and cheaper. Train numbers starting with D (e.g., D101) are 动车; G-numbers (e.g., G1) are 高铁. Pairs with 坐. A good middle-ground option for medium-distance trips.', 'word', '动车比高铁便宜一点.', '"Intercity express is a bit cheaper than high-speed rail." 比 (bǐ) introduces comparison; 便宜 (piányi) = cheap.', null, [ACT.vocabularyTransit]),
    createContentItem('普通火车', 'pǔtōng huǒchē', 'Regular / slow train. The pre-high-speed legacy network — slowest, cheapest, often with overnight sleeper berths (卧铺 wòpù). Train numbers starting with K, T, or Z. Pairs with 坐. Still common for budget travel and routes high-speed rail does not yet cover.', 'word', '坐普通火车便宜，可是很慢.', '"Regular trains are cheap but very slow." 可是 (kěshì) = but; the trade-off most travelers weigh.', null, [ACT.vocabularyTransit]),
    createContentItem('飞机', 'fēijī', 'An airplane. Used for long-haul domestic trips (1,500+ km) and international travel. Pairs with 坐. Beijing has two airports: 首都国际机场 (Capital, north) and 大兴国际机场 (Daxing, south). Usually slower door-to-door than 高铁 for trips under 1,000 km because of airport time.', 'word', '从北京到广州，坐飞机要3个小时.', '"From Beijing to Guangzhou, flying takes 3 hours." Combines 从…到… + 坐 + duration — exactly this lesson\'s patterns.', null, [ACT.vocabularyTransit]),
    createContentItem('船', 'chuán', 'A boat / ship. Used for ferries across rivers, cruises on the Yangtze, or island-hopping in Hong Kong / Hainan. Pairs with 坐. Rare in everyday urban commute but common in tourism contexts. The dental affricate ch- here is retroflex (tongue curled), not English "ch".', 'word', '我们坐船去香港的离岛.', '"We take the boat to Hong Kong\'s outlying islands." 离岛 (lídǎo) = outlying island.', null, [ACT.vocabularyTransit]),
    createContentItem('站', 'zhàn', 'A station or stop — works for subway stations, bus stops, and train stations alike. The all-purpose word; specify with a modifier: 地铁站 (subway station), 公交车站 (bus stop), 火车站 (train station). Also a verb meaning "to stand".', 'word', '清华东路西口站是4号线的站.', '"Qinghua East Road West Gate Station is on Line 4." Tsinghua\'s closest subway station; standard line-number + 的 + 站 attribution pattern.', null, [ACT.vocabularyTransit]),
    createContentItem('地铁站', 'dìtiězhàn', 'A subway station specifically. Compounds 地铁 + 站. Used both for the station name itself and for asking directions: 地铁站在哪里? ("Where is the subway station?"). Beijing\'s stations are numbered and named — station names usually reference a nearby landmark.', 'word', '最近的地铁站离这里500米.', '"The nearest subway station is 500 meters from here." 最近的 = the closest; 离 marks distance from a reference point.', null, [ACT.vocabularyTransit]),
    createContentItem('火车站', 'huǒchēzhàn', 'A train station. Beijing has multiple: 北京站 (Beijing Station, central, mixed traffic), 北京南站 (Beijing South, 高铁 hub), 北京西站 (Beijing West, southwest routes), 北京北站 (Beijing North, intercity express). Which one you need depends on the destination.', 'word', '去上海要在北京南站坐高铁.', '"To go to Shanghai, you take the high-speed rail at Beijing South Station." Critical Beijing-realism: each station has its own routes.', null, [ACT.vocabularyTransit]),
    createContentItem('起点站', 'qǐdiǎnzhàn', 'The origin / first station of a line — where the train or bus starts its run. Useful when planning: at the 起点站, you are guaranteed a seat because the vehicle is empty. Compound of 起点 (start point) + 站. Contrast with 终点站 (terminal station).', 'word', '从起点站上车一定有座位.', '"If you board at the origin station, you\'re guaranteed a seat." 一定 (yídìng) = definitely; 座位 (zuòwèi) = seat.', null, [ACT.vocabularyTransit]),
    createContentItem('终点站', 'zhōngdiǎnzhàn', 'The terminal / final station of a line — where the train or bus ends. Announcements often warn 终点站到了，请下车 ("we have reached the terminal station, please disembark"). Compound of 终点 (end point) + 站.', 'word', '4号线的终点站是天宫院.', '"The terminus of Line 4 is Tiangongyuan." Useful for confirming you\'re heading the right direction along a line.', null, [ACT.vocabularyTransit]),
    createContentItem('换乘', 'huànchéng', 'To transfer / change lines. The official subway-signage word; appears at every transfer station. Pattern: 在 X 换乘 Y = "at X transfer to Y". Colloquially, often shortened to just 换. The verb is 换 + line-number + 号线: 换4号线 = "change to Line 4".', 'word', '在西单换乘1号线.', '"At Xidan, transfer to Line 1." Xidan is a major Beijing transfer station for the Tsinghua-to-Tiananmen route.', null, [ACT.vocabularyTransit]),
    createContentItem('号线', 'hào xiàn', 'Line + number — the suffix attached to subway line numbers. 4号线 = Line 4; 13号线 = Line 13. Always say the number first, then 号线. Beijing\'s lines run 1–17 plus several lettered branch lines. The 号 (hào) means "number / numbered"; 线 (xiàn) means "line".', 'word', '清华站在13号线和15号线之间.', '"Tsinghua Station is between Lines 13 and 15." 之间 (zhījiān) = between two things.', null, [ACT.vocabularyTransit]),
    createContentItem('出口', 'chūkǒu', 'An exit. At Beijing subway stations, exits are labeled by letter (A, B, C, D); the right exit can save a 10-minute walk. Compound of 出 (out) + 口 (mouth / opening). Useful question: 从哪个出口出去? ("Which exit do I take?").', 'word', '清华大学从C口出去最近.', '"For Tsinghua University, Exit C is the closest." 最近 = closest; standard subway-exit guidance.', null, [ACT.vocabularyTransit]),
    createContentItem('方向', 'fāngxiàng', 'Direction. Used when choosing which side of the platform to board: 往天宫院方向 = "toward Tiangongyuan direction", i.e., the southbound direction of Line 4. 往 (wǎng) + 方向 marks the line\'s direction by its terminal station.', 'word', '我们坐往北的方向.', '"We take the northbound direction." Useful when you know the city geography but not the terminal station name.', null, [ACT.vocabularyTransit]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: Tickets, prices & timing
    // ────────────────────────────────────────────────────────────────────
    createContentItem('车票', 'chēpiào', 'A vehicle ticket — covers tickets for subway, bus, and train. For air tickets specifically, use 机票 (jīpiào). The measure word is 张 (zhāng): 一张车票 = one ticket. In modern Chinese cities, most subway/bus "tickets" are QR-code transactions, but the noun survives.', 'word', '请给我两张去上海的车票.', '"Please give me two tickets to Shanghai." Standard ticket-counter request; 去 + place + 的 + 车票 = "ticket to X".', null, [ACT.vocabularyTickets]),
    createContentItem('票价', 'piàojià', 'The fare / ticket price. Compound of 票 (ticket) + 价 (price). Used both in writing (signs, apps) and in speech: 票价是多少? = "What\'s the fare?". Distinct from 多少钱 (how much money), which is more colloquial.', 'word', '北京到上海的票价是553元.', '"The Beijing-Shanghai fare is 553 yuan." Real high-speed rail second-class fare; 元 (yuán) is the formal currency word.', null, [ACT.vocabularyTickets]),
    createContentItem('单程', 'dānchéng', 'One-way (trip). Compound of 单 (single) + 程 (journey). Asked at ticket counters: 单程还是往返? = "One-way or round-trip?". 单程票 = "one-way ticket".', 'word', '我要一张单程票.', '"I want a one-way ticket." Minimum required answer at any ticket counter.', null, [ACT.vocabularyTickets]),
    createContentItem('往返', 'wǎngfǎn', 'Round-trip / there-and-back. Compound of 往 (go to) + 返 (return). 往返票 = round-trip ticket; often discounted compared to two one-ways. Contrast with 单程 (one-way) — these are the two basic ticket-type options every clerk will ask about.', 'word', '往返票比两张单程票便宜一点.', '"A round-trip ticket is a bit cheaper than two one-ways." 比 introduces comparison; 一点 softens the magnitude.', null, [ACT.vocabularyTickets]),
    createContentItem('学生票', 'xuéshēng piào', 'A student ticket — typically half-price on trains and discounted on some buses for full-time students with valid ID. To buy, you need 学生证 (xuéshēngzhèng, student card). Available at most train stations and major attractions. Critical word for university-age learners.', 'word', '我有学生证，能买学生票吗?', '"I have a student card — can I buy a student ticket?" Standard polite request at any counter.', null, [ACT.vocabularyTickets]),
    createContentItem('公交卡', 'gōngjiāo kǎ', 'A transit card — rechargeable contactless card for bus, subway, and some taxis. Beijing\'s is called 一卡通 (yīkǎtōng, "one card all-purpose"); other cities have local equivalents. Increasingly replaced by phone QR codes (WeChat Pay / Alipay) but still common with older residents.', 'word', '我用公交卡刷卡进站.', '"I tap my transit card to enter the station." 刷卡 (shuā kǎ) = swipe/tap card; 进站 = enter the station.', null, [ACT.vocabularyTickets]),
    createContentItem('一卡通', 'yīkǎtōng', 'Beijing\'s specific transit card brand. Bought at any subway station for a 20-yuan deposit, refundable when you return the card. Works on subway, bus, and select taxis. Phone-based 一卡通 in 微信钱包 (WeChat Wallet) is also available and increasingly preferred.', 'word', '一张一卡通押金是20元.', '"The deposit on a transit card is 20 yuan." 押金 (yājīn) = deposit; standard wording at the customer-service counter.', null, [ACT.vocabularyTickets]),
    createContentItem('开车时间', 'kāichē shíjiān', 'Departure time — literally "drive-vehicle time". 开车 means "to drive a vehicle" or "for a vehicle to depart" (the train "drives off"). Appears on every ticket and timetable display.', 'word', '高铁的开车时间是下午3点15分.', '"The high-speed rail\'s departure time is 3:15 PM." 下午 (xiàwǔ) = afternoon; format: hour 点 minute 分.', null, [ACT.vocabularyTickets]),
    createContentItem('到达时间', 'dàodá shíjiān', 'Arrival time. Compound of 到达 (arrive) + 时间 (time). The other half of every train ticket. Used in announcements: 列车将于X点X分到达 ("the train will arrive at X:XX").', 'word', '到达时间是晚上7点50分.', '"The arrival time is 7:50 PM." 晚上 (wǎnshang) = evening; standard timetable phrasing.', null, [ACT.vocabularyTickets]),
    createContentItem('出发', 'chūfā', 'To depart / set off. The verb form of "departure". Used widely beyond transit: 几点出发? = "What time do we leave?". For trains/planes specifically, 开车 (for trains) and 起飞 (qǐfēi, for planes) are more idiomatic.', 'word', '我们几点出发?', '"What time do we leave?" Universal trip-planning question.', null, [ACT.vocabularyTickets]),
    createContentItem('到', 'dào', 'To arrive (at). Often paired with 几点 for "what time do we arrive?". 到 also functions as a preposition meaning "to / until": 从 A 到 B = "from A to B". Both uses appear constantly in this lesson.', 'word', '我们几点到上海?', '"What time do we arrive in Shanghai?" 到 here is a verb; in 从 A 到 B it would be a preposition.', null, [ACT.vocabularyTickets]),
    createContentItem('多少钱', 'duōshǎo qián', 'How much (money)? — the universal price question. Word-for-word: "how-much money?". Used at any counter, restaurant, market. The more formal alternative is 票价是多少? for fares specifically. Pairs with the answer pattern: number + 元 (formal) or number + 块 (colloquial).', 'word', '一张票多少钱?', '"How much is a ticket?" Standard ticket-counter question; same pattern works at any vendor.', null, [ACT.vocabularyTickets]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar I: 从 A 到 B
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '从 A 到 B',
      'cóng A dào B',
      'The standard pattern for "from A to B" — marks the origin and destination of any trip. 从 (cóng) takes the origin; 到 (dào) takes the destination. Place the whole phrase BEFORE the verb (typical) or as a sentence-initial topic (for emphasis). Works for trips, time spans, and even processes.',
      'sentence',
      '从清华到天安门坐地铁要40分钟. (From Tsinghua to Tiananmen, the subway takes 40 minutes.)\n从上午9点到下午5点 (from 9 AM to 5 PM).',
      'Bedrock structure for any route description in Mandarin; learn the slot order and it generalizes everywhere.',
      [
        { target: '从 + origin', note: '从 marks the starting point; takes place names, station names, or time points' },
        { target: '到 + destination', note: '到 marks the ending point; same noun slot' },
        { target: 'whole phrase + verb', note: 'put 从…到… BEFORE the main verb (坐, 走, 飞 etc.); never after' },
      ],
      [ACT.grammarFromTo],
    ),
    createContentItem(
      '从…到… + 怎么走',
      'cóng…dào… + zěnme zǒu',
      'The standard route question: 从 A 到 B 怎么走? = "From A to B, how do I go?". 怎么 (zěnme) = how; 走 (zǒu) = literally "walk" but in this idiom means "make the trip" by any means. The polite expanded form is 从 A 到 B 怎么走比较好? ("…what\'s the best way?").',
      'sentence',
      '从清华到天安门怎么走? — 坐4号线再换1号线.',
      'The most common route question shape; 走 is idiomatic here and does NOT specifically mean walk.',
      [
        { target: '从 A 到 B', note: 'origin and destination, the same as in declarative sentences' },
        { target: '怎么走', note: 'literal "how walk?"; idiomatic "what\'s the route?"' },
      ],
      [ACT.grammarFromTo],
    ),
    createContentItem(
      '从…到… + 怎么去',
      'cóng…dào… + zěnme qù',
      'A close synonym to 怎么走: 怎么去 (zěnme qù) = "how do I go (there)?". Slightly more directional than 怎么走 — emphasizes the destination as the focus. Both are interchangeable in casual route-asking; 怎么走 is more common for step-by-step directions, 怎么去 for transport-mode questions.',
      'sentence',
      '清华大学怎么去? — 坐4号线，从清华东路西口站出来.',
      'When the origin is the speaker\'s current location, the 从 part is often dropped: 清华大学怎么去? (How do I get to Tsinghua?).',
      [
        { target: '怎么走 — route emphasis', note: 'use when asking for step-by-step directions' },
        { target: '怎么去 — destination emphasis', note: 'use when asking about transport mode to reach a place' },
        { target: 'dropping 从', note: 'when origin is obvious (current location), drop the 从 phrase entirely' },
      ],
      [ACT.grammarFromTo],
    ),
    createContentItem(
      '从 vs 在',
      'cóng vs zài',
      'A common English-speaker trap: 从 (cóng) marks the ORIGIN of motion or a time span ("from"); 在 (zài) marks STATIC location ("at / in / on"). Use 从 when something is moving FROM somewhere; use 在 when something IS at a place. Mistaking these is the single most frequent error in this grammar.',
      'sentence',
      '我从北京来 (I come FROM Beijing — motion) vs 我在北京 (I am IN Beijing — static)\n从清华到天安门 (from Tsinghua to Tiananmen — route) vs 在清华 (at Tsinghua — location)',
      'Quick test: is the noun the START of motion (从) or the PLACE of being (在)?',
      [
        { target: '从 — origin of motion', note: 'from where something starts moving or where a time period begins' },
        { target: '在 — static location', note: 'where someone or something IS, no motion implied' },
      ],
      [ACT.grammarFromTo],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar II: 要多长时间
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '要多长时间?',
      'yào duō cháng shíjiān?',
      'The universal duration question: "needs how-long time?". 要 (yào) here means "to take / require"; 多长 (duō cháng) = "how long"; 时间 (shíjiān) = "time". Works for trips, cooking, study, any time-taking activity. The slightly shorter 要多久? (yào duō jiǔ?) is also common in casual speech.',
      'sentence',
      '从清华到天安门要多长时间? — 大概40分钟.',
      'Universal duration question; 大概 (dàgài) = "approximately" softens an estimate.',
      [
        { target: '要 + duration question', note: '要 means "to take (time)"; can also mean "to want / need" in other contexts' },
        { target: '多长时间', note: 'literal "how-long time?"; the duration-question phrase' },
        { target: '要多久?', note: 'shorter colloquial alternative; same meaning' },
      ],
      [ACT.grammarDuration],
    ),
    createContentItem(
      '时间单位',
      'shíjiān dānwèi',
      'Time-duration units in Mandarin. Use [number] + unit, with 个 (ge) inserted for hours and half-hours. Minutes: 分钟 (fēnzhōng); hours: 小时 (xiǎoshí). Note that 小时 requires the measure word 个: 一个小时 (one hour), not 一小时. 分钟 does NOT take 个: 五分钟 (five minutes), not 五个分钟.',
      'sentence',
      '5分钟 (5 minutes) · 一个小时 (1 hour) · 一个半小时 (1.5 hours) · 两个小时 (2 hours)',
      'The 个 / no-个 difference between 小时 and 分钟 is irregular but fully fixed; memorize the pair.',
      [
        { target: '分钟', note: 'minutes; no 个 needed (五分钟, not 五个分钟)' },
        { target: '个 + 小时', note: 'hours; the 个 measure word IS needed (两个小时, not 两小时)' },
        { target: '半 — half', note: 'inserted after 个: 一个半小时 = "one and a half hours"' },
      ],
      [ACT.grammarDuration],
    ),
    createContentItem(
      '大概 / 大约',
      'dàgài / dàyuē',
      'Approximation softeners — "about / approximately". Place BEFORE the duration phrase: 大概40分钟 = "about 40 minutes". Both 大概 and 大约 are interchangeable; 大概 is slightly more casual. Without one of these, a duration sounds precise and confident; with one, it sounds like an honest estimate.',
      'sentence',
      '从这里到机场大概一个小时. (It\'s about an hour from here to the airport.)\n大约30分钟. (About 30 minutes.)',
      'Adding 大概 / 大约 is the polite default when answering time questions; an unmarked number sounds like a strong claim.',
      [
        { target: '大概 + duration', note: 'casual approximation softener; very common' },
        { target: '大约 + duration', note: 'slightly more formal alternative' },
        { target: 'without 大概/大约', note: 'sounds like a precise factual statement, not an estimate' },
      ],
      [ACT.grammarDuration],
    ),
    createContentItem(
      '要 vs 得',
      'yào vs děi',
      'Two verbs that both express "need / take" for duration. 要 (yào) is neutral and works in any register. 得 (děi, NOT dé) is colloquial and emphatic — "have to / takes a full…". 要 is the safer default; 得 sounds more conversational and slightly grumbling.',
      'sentence',
      '要两个小时. (It takes two hours — neutral.)\n得两个小时. (Takes a full two hours — colloquial, slightly emphatic.)',
      'Pick 要 for general use; 得 for casual peer-to-peer speech.',
      [
        { target: '要 (yào)', note: 'neutral duration verb; safe in all registers' },
        { target: '得 (děi)', note: 'colloquial emphatic; "have to / takes a full" — note the pinyin is děi, not dé' },
      ],
      [ACT.grammarDuration],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar III: 先…再…然后…
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '先…再…然后…',
      'xiān…zài…ránhòu…',
      'The step-sequencer chain: 先 (xiān, "first"), 再 (zài, "then / next"), 然后 (ránhòu, "after that"). Used to describe ordered multi-step actions — directions, recipes, procedures. Each adverb is placed BEFORE its verb. Use all three for a 3-step sequence; for 2 steps, use 先…再… or 先…然后…',
      'sentence',
      '先坐4号线，再换1号线，然后走五分钟. (First take Line 4, then transfer to Line 1, after that walk 5 minutes.)',
      'The standard shape of any multi-step Mandarin instruction; learn the slot order and apply it everywhere from transit to cooking.',
      [
        { target: '先 + verb', note: '"first…"; opens the sequence — comes before the first action verb' },
        { target: '再 + verb', note: '"then / next…"; second step; before the second action verb' },
        { target: '然后 + verb', note: '"after that…"; third+ step; before the next action verb' },
      ],
      [ACT.grammarSteps],
    ),
    createContentItem(
      '再 vs 又',
      'zài vs yòu',
      'Both can translate as "again" but the distinction is sharp: 再 (zài) is for events that have NOT YET happened (future, hypothetical, ordered steps); 又 (yòu) is for events that HAVE ALREADY happened (past, repeated). Inside step-by-step directions, ONLY 再 is correct because the steps are future.',
      'sentence',
      '先坐4号线，再换1号线. (First Line 4, then transfer to Line 1 — future, use 再.)\n我又坐错了车. (I took the wrong train AGAIN — past, use 又.)',
      'Quick test: has it happened yet? 再 if no; 又 if yes.',
      [
        { target: '再 — future / planned again', note: 'use in instructions, hypotheticals, future actions' },
        { target: '又 — past / already-happened again', note: 'use when something has already repeated' },
      ],
      [ACT.grammarSteps],
    ),
    createContentItem(
      '然后 — after that',
      'ránhòu — after that',
      '然后 (ránhòu) means "after that / and then / subsequently". Joins sequenced actions; can stand alone at the start of a clause: 然后我去吃饭 ("after that I go eat"). Slightly more flexible than 再 because it can begin a sentence on its own, whereas 再 typically sits inside a verb phrase.',
      'sentence',
      '我先去图书馆，然后去食堂. (I go to the library first, then to the cafeteria.)',
      'In compound steps, 然后 often replaces 再 at the third+ step for variety: 先 A, 再 B, 然后 C.',
      [
        { target: '然后 + clause', note: 'introduces the next step; can start a sentence or follow a comma' },
        { target: '然后 vs 再', note: '然后 is freer with placement; 再 must sit right before the verb' },
      ],
      [ACT.grammarSteps],
    ),
    createContentItem(
      '步骤句子结构',
      'bùzhòu jùzi jiégòu',
      'Structure of a multi-step direction sentence in Mandarin: [SUBJECT] + 先 [V1 + O1]，再 [V2 + O2]，然后 [V3 + O3]. Each clause has its own verb phrase, joined by commas, with the step-adverb at the head of each. Subject is usually stated once at the very start.',
      'sentence',
      '你先在西二旗站下车，再坐15号线，然后走到清华东门. (First get off at Xierqi, then take Line 15, after that walk to Tsinghua East Gate.)',
      'The subject 你 (you) is stated once at the start; all three steps share it. Each step has its own verb and object.',
      [
        { target: '你 — single subject', note: 'stated once at start; carries through all steps' },
        { target: '先 + V1 + O1', note: 'first step: 在西二旗站下车 = "get off at Xierqi station"' },
        { target: '再 + V2 + O2', note: 'second step: 坐15号线 = "take Line 15"' },
        { target: '然后 + V3 + O3', note: 'third step: 走到清华东门 = "walk to Tsinghua East Gate"' },
      ],
      [ACT.grammarSteps],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '我每天的路线',
      'wǒ měi tiān de lùxiàn',
      'A complete five-sentence Beijing commute description. Read it aloud with correct tones, sandhi, and natural rhythm. Notice how 从…到…, duration phrases, and step sequencers all combine in one paragraph.',
      'sentence',
      '我是清华大学的学生，每天去校园上课。我从宿舍走到地铁站，大概要五分钟。然后我坐13号线，从五道口站到西直门站，要二十分钟。在西直门换乘2号线，再坐两站就到了。从家到学校一共大概一个小时。',
      'Translation: "I\'m a student at Tsinghua and go to campus daily for classes. From my dorm I walk to the subway station, about 5 minutes. Then I take Line 13 from Wudaokou to Xizhimen — 20 minutes. At Xizhimen I transfer to Line 2 and two stops later I arrive. From home to school is about an hour total."',
      [
        { target: '从宿舍走到地铁站', note: '"walk from dorm to subway station"; 从…到… + 走 verb' },
        { target: '大概要五分钟', note: '"takes about 5 minutes"; 大概 + 要 + duration' },
        { target: '从五道口站到西直门站', note: '"from Wudaokou Station to Xizhimen Station"; a real Beijing Line 13 leg' },
        { target: '在西直门换乘2号线', note: '"at Xizhimen transfer to Line 2"; the 在 X 换乘 Y pattern' },
        { target: '一共 — in total', note: '一共 (yígòng) sums up all components; useful for total-duration claims' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '理解问题',
      'lǐjiě wèntí',
      'Four comprehension questions about the commute paragraph. Answer each in a short sentence using the duration and route patterns from this lesson.',
      'sentence',
      'Q1: 从宿舍到地铁站要多长时间? Q2: 他坐什么线? Q3: 他在哪里换乘? Q4: 一共要多长时间?',
      'Translation: Q1: How long from dorm to subway? Q2: Which line does he take? Q3: Where does he transfer? Q4: How long in total?',
      [
        { target: 'A1: 大概五分钟。', note: 'duration answer using 大概' },
        { target: 'A2: 他先坐13号线，再坐2号线。', note: 'two-step answer using 先…再…' },
        { target: 'A3: 在西直门换乘。', note: 'location answer using 在 X 换乘' },
        { target: 'A4: 一共大概一个小时。', note: 'total-duration answer using 一共 + 大概' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Listening & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '问路 — 清华到天安门 (casual)',
      'wèn lù — Qīnghuá dào Tiān\'ānmén (casual)',
      'A natural casual route-asking conversation between two students at Tsinghua. Uses all the patterns from this lesson: 从…到…, 怎么走, 换乘, duration, and step sequencers in normal peer register.',
      'conversation',
      '莎拉: 王明，周六我想去天安门，从清华怎么走?\n王明: 你坐地铁最方便。先去清华东路西口站坐15号线。\n莎拉: 15号线? 然后呢?\n王明: 在西直门换2号线，再坐到前门站，从那儿走十分钟就到了。\n莎拉: 一共要多长时间?\n王明: 大概四十五分钟。地铁票多少钱?\n莎拉: 五块钱，你用微信扫码就行。\n莎拉: 好，谢谢! 周六见。',
      'A natural exchange between peers using polite-but-casual register — the default for student-age route questions in Beijing.',
      [
        { target: '从清华怎么走?', note: 'standard route question; 从 + origin + 怎么走?' },
        { target: '坐地铁最方便', note: '"the subway is most convenient"; 最 + adjective for superlative' },
        { target: '在西直门换2号线', note: 'transfer-point pattern with 在 + station + 换 + line-number' },
        { target: '从那儿走十分钟', note: '"from there, walk 10 minutes"; 那儿 = "there" in Beijing speech' },
        { target: '用微信扫码就行', note: '"just scan the WeChat QR code"; modern Beijing payment reality' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      '买高铁票 (formal)',
      'mǎi gāotiě piào (formal)',
      'A formal ticket-purchase conversation at a Beijing South Station high-speed rail counter. Uses 您 (formal you), full ticket-type vocabulary, and the standard price-and-time exchange. Compare with the casual route dialogue — register, vocabulary, and politeness markers all shift.',
      'conversation',
      '乘客: 您好，我要买一张明天去上海的高铁票。\n售票员: 您要单程还是往返?\n乘客: 单程，二等座。\n售票员: 明天上午8点的可以吗? 票价是553元。\n乘客: 可以。有学生票吗? 我有学生证。\n售票员: 学生票打七五折，是414元。请出示一下您的身份证和学生证。\n乘客: 给您。开车时间是8点，到达时间几点?\n售票员: 中午12点28分到达上海虹桥站。\n乘客: 好的，谢谢您。',
      'Same information shape as the casual version but with formal phrasing throughout — appropriate for any customer-service transaction.',
      [
        { target: '我要买一张…票', note: '"I want to buy a ticket"; 一张 measure word + 票 noun' },
        { target: '单程还是往返?', note: '"one-way or round-trip?"; standard counter question' },
        { target: '二等座 èr děng zuò', note: '"second-class seat"; high-speed rail seating tiers — 一等座 (first), 二等座 (second), 商务座 (business)' },
        { target: '打七五折', note: '"25% off / 75% discount"; in Mandarin, 七五折 means "70-50% of price" = 75% of price = 25% off' },
        { target: '请出示一下', note: 'polite "please show…"; 一下 softens the request' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '写作模板',
      'xiězuò múbǎn',
      'A reusable template for any Mandarin commute or trip description. Fill in the bracketed slots with your own information — the structure carries the rest. The template uses all three grammar points from this lesson.',
      'sentence',
      '我每天/[频率]从[起点]去[终点]。我先[第一段交通]，要[时间1]。然后在[换乘地点]换[下一段交通]，再[时间2]。一共要[总时间]。',
      'Slot guide: frequency · origin · destination · first leg · duration 1 · transfer point · second leg · duration 2 · total.',
      [
        { target: '[起点] / [终点]', note: 'origin and destination — use real place names (家, 学校, 公司, station names)' },
        { target: '[交通方式]', note: 'mode: 坐地铁 / 坐公交车 / 走路 / 骑自行车' },
        { target: '[时间]', note: 'duration — use 大概 + number + 分钟/个小时' },
        { target: '[换乘地点]', note: 'transfer station; use 在 X 换 Y pattern' },
        { target: '一共 — total', note: 'sums everything up; sounds natural for full-route claims' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '写作练习',
      'xiězuò liànxí',
      'Write your own 3–5 sentence commute or trip description in Hanzi using the template. Use 从…到… at least once, a duration phrase at least once, and one step sequencer (先 or 然后) so the writing demonstrates all three grammar points from this lesson.',
      'sentence',
      '示例: 我每天从宿舍去清华图书馆。我先走路到食堂，要五分钟。然后从食堂骑共享单车到图书馆，再要三分钟。一共大概十分钟，很方便。',
      'Translation: "I go from my dorm to the Tsinghua library every day. First I walk to the cafeteria — 5 minutes. Then from the cafeteria I ride a shared bike to the library — 3 more minutes. About 10 minutes total — very convenient."',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '北京地铁',
      'Běijīng dìtiě',
      'The Beijing subway system has 25+ lines, color-coded on maps, with trilingual signage (Hanzi + Pinyin + English). Trains run roughly 5 AM to 11 PM. Fares scale with distance from 3 yuan minimum to 9 yuan maximum. Rush hour (7–9 AM, 5–7 PM) is densely crowded — choose off-peak times if you can.',
      'sentence',
      '北京地铁有25条以上的线路，每天有1000多万人坐.',
      '"The Beijing subway has 25+ lines and over 10 million daily riders." Scale rivals Tokyo and surpasses every European city.',
      [
        { target: '25+ 条线路', note: 'numbered (1–17) plus lettered branch lines (Yizhuang, Daxing, etc.)' },
        { target: '三语标志', note: 'trilingual signage; Pinyin and English alongside Hanzi at every station' },
        { target: '高峰时间', note: 'rush hour (gāofēng shíjiān); 7–9 AM and 5–7 PM are densely packed' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '一卡通 vs 扫码',
      'yīkǎtōng vs sǎo mǎ',
      'Beijing\'s payment landscape has shifted: 一卡通 (physical transit card, 20-yuan deposit at any station) was dominant for two decades but is increasingly replaced by 扫码 (sǎo mǎ, "scan code") via WeChat Pay (微信支付) or Alipay (支付宝). Phone-based 一卡通 inside WeChat Wallet bridges the two. Most Beijing residents under 40 now use phone QR codes exclusively.',
      'sentence',
      '现在很多人用微信扫码进站，不用一卡通了.',
      '"Now many people scan WeChat to enter stations and don\'t use transit cards anymore." 不…了 (bù…le) marks a stopped habit.',
      [
        { target: '一卡通', note: 'physical card with refundable deposit; older payment method, still functional' },
        { target: '微信扫码 / 支付宝扫码', note: 'modern dominant method; phone QR scan at the gate' },
        { target: '电子一卡通', note: 'digital transit card inside WeChat Wallet; bridges old and new' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '滴滴 — 网约车',
      'Dīdī — wǎngyuēchē',
      'Didi (滴滴) is China\'s dominant ride-hailing app — roughly 90% market share. Used through WeChat Pay or Alipay integration. Cheaper than traditional 出租车 for most trips and easier to find at night. The verb 打 (dǎ) covers any car-hire: 打车 (grab a cab), 打滴滴 (grab a Didi). For premium service, 专车 (zhuānchē, "private car") is the higher tier.',
      'sentence',
      '晚上太晚了，我们打滴滴回学校吧.',
      '"It\'s too late at night, let\'s grab a Didi back to school." 太…了 (tài…le) = "too / so" emphatic.',
      [
        { target: '打车 / 打滴滴', note: '"grab a cab / Didi"; 打 is the casual verb for hailing any car' },
        { target: '快车 vs 专车 vs 拼车', note: '快车 (express, cheap), 专车 (private car, premium), 拼车 (shared / pool, cheapest)' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '高铁 vs 动车 vs 普通',
      'gāotiě vs dòngchē vs pǔtōng',
      'China\'s three intercity train classes carry strong prestige differences. 高铁 (high-speed rail, G-numbers) is the modern flagship — fastest, most expensive, used for business travel. 动车 (intercity express, D-numbers) is the middle tier — slower but cheaper. 普通火车 (regular train, K/T/Z numbers) is the legacy slow network — cheapest, often with overnight sleeper berths, increasingly the choice of budget travelers and migrant workers.',
      'sentence',
      '出差就坐高铁，旅游可以坐动车或者普通火车.',
      '"For business trips take the high-speed rail; for tourism, intercity express or regular train works." Business vs leisure choice expectation.',
      [
        { target: '高铁 — G-numbers', note: 'G1, G2…; flagship 300+ km/h; departure from dedicated high-speed stations' },
        { target: '动车 — D-numbers', note: 'D101, D102…; 200 km/h; uses high-speed track at slower speeds' },
        { target: '普通火车 — K/T/Z', note: 'legacy slow trains; cheapest; often have 卧铺 (sleeper berths) for overnight trips' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '火车站到得早',
      'huǒchēzhàn dào de zǎo',
      'Chinese train-station culture: arrive AT LEAST 30 minutes early, ideally 45–60 for major stations like 北京南站 or 上海虹桥. Security screening, ticket verification, and finding the right platform among 20+ all take time. The crowd at peak holidays (春运 chūnyùn, Spring Festival travel rush) can be overwhelming — book 提前 (tíqián, in advance) by weeks for major holidays.',
      'sentence',
      '坐高铁要提前三十分钟到火车站.',
      '"For high-speed rail you need to arrive at the station 30 minutes early." 提前 (tíqián) = "in advance".',
      [
        { target: '提前 — in advance', note: 'arrive early; book early; the all-purpose Mandarin word for "ahead of time"' },
        { target: '春运 — Spring Festival travel rush', note: 'the world\'s largest annual human migration; book weeks ahead' },
        { target: '安检 — security screening', note: 'standard at every train station; ID and ticket required' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '任务: 周六去天安门',
      'rènwù: zhōu liù qù Tiān\'ānmén',
      'Roleplay planning a Saturday outing from Tsinghua to Tiananmen with the AI tutor playing a Beijing-savvy friend. Use every skill from this lesson in one continuous trip-planning scene — ask the route, choose the mode, confirm the transfer point, ask the duration and price, then finalize.',
      'conversation',
      '[宿舍, 清华大学]\n你: [打招呼 + 说想去天安门]\n朋友: [建议路线]\n你: [问怎么坐 / 哪号线]\n朋友: [给两段路线 + 换乘站]\n你: [问总时间]\n朋友: [回答时间 + 票价]\n你: [问从哪个站上车]\n朋友: [给上车站和出口]\n你: [感谢 + 告别]',
      'Six+ turns of fluent exchange; the AI tutor will respond naturally to whatever you say and adapt to your follow-up questions.',
      [
        { target: '想去 X', note: '想 (xiǎng) + verb = "want to / would like to"; sets up the scenario' },
        { target: '怎么走 / 怎么去', note: 'route question — pick the one that fits your follow-up' },
        { target: '哪号线?', note: '"which line number?"; 哪 + measure word + noun' },
        { target: '从哪个站上车?', note: '"from which station do I board?"; 从 + 哪个 + 站 + 上车' },
        { target: '从哪个出口出去?', note: '"from which exit?"; useful at the destination end' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战 — 换乘失败',
      'tiǎozhàn — huànchéng shībài',
      'Stretch goal: in the same scene, you reach the transfer station 西单 (Xidan) but cannot find the connecting line. Use the lesson\'s patterns to ask a stranger for help — 请问 (qǐng wèn, "may I ask") + 从 A 到 B 怎么走 + 在哪儿换乘 — then thank them.',
      'conversation',
      '你: 请问，1号线在哪儿换乘?\n陌生人: 跟着标志走，沿着这个通道往前走，就能看到换乘口了。\n你: 大概要走多久?\n陌生人: 大概三分钟吧。\n你: 谢谢您!\n陌生人: 不客气。',
      '"请问" (may I ask) softens the question; "不客气" (you\'re welcome) is the standard response to "thank you".',
      [
        { target: '请问 — may I ask', note: 'polite question-opener; required when asking a stranger anything' },
        { target: '跟着标志走', note: '"follow the signs"; 跟着 + N + 走 = follow N' },
        { target: '沿着…往前走', note: '"continue along…"; 沿着 (yánzhe) + N + 往前走' },
        { target: '换乘口', note: '"transfer entrance"; the physical doorway between two lines at a transfer station' },
        { target: '不客气 — you\'re welcome', note: 'standard reply to 谢谢; literally "don\'t be polite"' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
