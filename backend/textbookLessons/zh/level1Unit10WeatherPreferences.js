// Level 1 Unit 10 — Weather & Preferences (Mandarin Chinese)
// Functions: describing weather, naming seasons, expressing preference and
// comparison, picking favorites, complaining about Beijing's notorious weather.
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
  orientation: 'zh-l1u10-orientation',
  pronunciation: 'zh-l1u10-pronunciation',
  vocabularyWeather: 'zh-l1u10-vocab-weather',
  vocabularySeasons: 'zh-l1u10-vocab-seasons',
  grammarComparison: 'zh-l1u10-grammar-comparison',
  grammarSuperlative: 'zh-l1u10-grammar-superlative',
  grammarDegree: 'zh-l1u10-grammar-degree',
  reading: 'zh-l1u10-reading',
  listening: 'zh-l1u10-listening',
  writing: 'zh-l1u10-writing',
  culture: 'zh-l1u10-culture',
  task: 'zh-l1u10-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Describe today\'s weather in Beijing using at least four weather words, including the smog (雾霾) that dominates a real winter morning.',
      'Name the four seasons and one signature activity or food for each, framed for life in China.',
      'State a reasoned preference using 比较喜欢 / 最喜欢 and at least one 因为…，所以… reason clause.',
      'Compare two seasons or two cities with the A 比 B + adjective pattern — the most common comparative in Mandarin.',
    ],
    task: 'Picture a Tsinghua classmate from the south asking which Beijing season you prefer; by the end of this lesson you should pick, justify, and ask back in one continuous Mandarin turn.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in this lesson',
    goals: [
      'Pronounce 雪 (xuě) correctly — after j/q/x/y, the letter "u" stands for ü, so xue = xüe with rounded front vowel, NOT "shway".',
      'Distinguish 比 bǐ ("compared to") from homophone 笔 bǐ ("pen") — same Pinyin, same tone, different Hanzi and meaning; only context disambiguates.',
      'Pronounce 喜欢 xǐhuan with neutral tone on the second syllable — written xǐhuān is non-standard; the natural pronunciation drops the tone on 欢.',
      'Apply third-tone sandhi in 比较 bǐjiào — wait, 较 is fourth, so no sandhi here; but in 喜欢 + 比较 chains, listen carefully for the rhythm.',
    ],
    task: 'Read each pronunciation example aloud three times and identify which syllables carry the rounded ü, neutral tone, or sandhi shift.',
  },
  {
    id: ACT.vocabularyWeather,
    section: 'Vocabulary I',
    title: 'Weather words for a Beijing year',
    goals: [
      'Use the 12 core weather words covering sky conditions (晴/阴/雨/雪/风/雾霾) and temperature/comfort (热/冷/凉快/暖和/闷热/干燥).',
      'Distinguish 凉快 (pleasantly cool, positive) from 冷 (cold, neutral/negative) and 暖和 (pleasantly warm, positive) from 热 (hot, often negative) — the "comfort vs neutral" pair is key to expressing preference.',
    ],
    task: 'Describe today\'s actual weather in one sentence, then describe yesterday using the same sentence pattern in past form.',
  },
  {
    id: ACT.vocabularySeasons,
    section: 'Vocabulary II',
    title: 'Seasons and signature activities',
    goals: [
      'Name the four seasons (春夏秋冬) and link each to one signature activity or scene: 春 = 樱花 cherry blossoms, 夏 = 西瓜 watermelon, 秋 = 红叶 red leaves, 冬 = 雪 snow / 暖气 indoor heating.',
      'Use 季节 (jìjié, "season") as the umbrella word in questions like 你最喜欢哪个季节? ("Which season do you like best?").',
    ],
    task: 'Match one signature activity or food to each season and explain in one sentence why that pairing feels right.',
  },
  {
    id: ACT.grammarComparison,
    section: 'Grammar I',
    title: 'A 比 B + adjective — the comparative pattern',
    goals: [
      'Build the comparative with A 比 B + adjective: 北京比上海冷 ("Beijing is colder than Shanghai"). Critically, the adjective is BARE — no 很, no 是, just the adjective.',
      'Add a degree to the comparison with 一点 ("a little") or 多了 ("a lot"): 北京比上海冷一点 ("a bit colder"), 北京比上海冷多了 ("much colder").',
      'Negate the comparison with 没有 instead of 不比: 上海没有北京冷 ("Shanghai is not as cold as Beijing"). Avoid 不比 except in explicit contradiction.',
    ],
    task: 'Write four A 比 B sentences comparing two cities or two seasons; convert two of them into 没有 negatives.',
  },
  {
    id: ACT.grammarSuperlative,
    section: 'Grammar II',
    title: '最 — the superlative ("the most")',
    goals: [
      'Place 最 (zuì) directly before any adjective or verb to mean "the most": 最冷 ("coldest"), 最喜欢 ("like best"), 最讨厌 ("hate most").',
      'Combine 最 with 喜欢 to form "favorite" as a verb phrase: 我最喜欢秋天 ("My favorite season is autumn", literally "I most-like autumn").',
      'Use 在…中 ("among…") or 在…里 to set the comparison set: 在四季中，我最喜欢秋天 ("Among the four seasons, I like autumn best").',
    ],
    task: 'Pick your most-liked season, most-disliked weather, and favorite seasonal food using 最 in three separate sentences.',
  },
  {
    id: ACT.grammarDegree,
    section: 'Grammar III',
    title: 'Degree adverbs — 比较 / 还 / 挺 / 相当',
    goals: [
      'Use the softer degree adverbs 比较 (bǐjiào, "quite / relatively"), 还 (hái, "still / fairly"), 挺 (tǐng, "pretty / rather"), and 相当 (xiāngdāng, "fairly") in place of the blunt 很/非常 ("very / extremely").',
      'Know that 比较 is the safest softener — it adds politeness and avoids overstatement; 挺 + 的 (挺好的) is colloquial and warm; 还 conveys mild approval; 相当 is more formal and bookish.',
      'Distinguish 比较 ("relatively / quite", a degree adverb) from 比 ("compared to", the comparison preposition from Grammar I) — they share a character but do different jobs.',
    ],
    task: 'Rewrite three statements using a degree adverb other than 很; pick the adverb that matches the register and the strength of your opinion.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'A foreign student\'s favorite Beijing season',
    goals: [
      'Read a short paragraph about a Tsinghua exchange student\'s seasonal preferences in Beijing, including the smog complaint.',
      'Answer four comprehension questions with full Mandarin sentences using 因为…所以…, 比, or 最.',
    ],
    task: 'Read the paragraph aloud once with correct tones, then answer the four comprehension questions in complete sentences.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'North-south climate comparison',
    goals: [
      'Follow a dialogue between a Beijing student and a Guangzhou student comparing climates, heated winters vs unheated winters, and food preferences.',
      'Reproduce the dialogue swapping in your own hometown and your own seasonal preferences.',
    ],
    task: 'Read the dialogue along with the AI tutor first, then perform it again describing your own city\'s climate.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Write about your favorite season',
    goals: [
      'Write 4–6 sentences in Hanzi about your favorite season, including one 因为…所以… reason, one 比 comparison, and one 最 superlative.',
      'Close with one sentence stating which season you dislike most and why — the contrast strengthens the piece.',
    ],
    task: 'Write your own 4–6 sentence paragraph using the model on the left, then read it aloud with correct tones.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: 'China\'s climate divide and regional flavor preferences',
    goals: [
      'Know that the 秦岭-淮河 (Qinling-Huaihe) line splits China into a heated 北方 (north — central indoor heating in winter) and an unheated 南方 (south — colder INDOOR winters despite warmer outdoor temperatures).',
      'Recognize 春运 (chūnyùn) — the Spring Festival travel rush, the largest annual human migration on Earth, when hundreds of millions return home for 春节 (Chinese New Year).',
      'Know the regional flavor map: 川菜/湘菜 spicy (Sichuan/Hunan), 粤菜 sweet/fresh (Cantonese south), 鲁菜 salty (north), 苏菜 sweet-savory (Jiangsu) — each tied to its climate and ingredients.',
      'Recognize 月饼 (mooncakes) as the signature 中秋节 (Mid-Autumn Festival) food, marking the autumn moon-viewing tradition in September/October.',
    ],
    task: 'Pick one seasonal cultural moment (春运 / 中秋 / 雾霾 / 北方暖气) and explain in two Mandarin sentences why it matters in China.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'Complain about Beijing weather with a Chinese friend',
    goals: [
      'Combine season, weather, preference, reason, and comparison into one continuous conversation with the AI tutor playing a Chinese classmate.',
      'Survive the smog complaint without switching to English; use 雾霾, 戴口罩 (wear a mask), 不出门 (stay indoors) naturally.',
    ],
    task: 'Roleplay a winter-morning chat with a Tsinghua classmate from Guangzhou; aim for a 6-turn exchange covering today\'s weather, your favorite season, and a comparison between your hometown and Beijing.',
  },
];

const lesson = {
  title: 'Level 1 · Unit 10: 北京的冬天最冷 — Weather and Preferences',
  category: 'daily-life',
  difficulty: 'beginner',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'describing-weather', label: 'Describing the weather', goal: 'Use weather words (晴/阴/雨/雪/雾霾/热/冷) in a single complete sentence about today.' },
    { id: 'sharing-preference', label: 'Sharing a preference with a reason', goal: 'Use 因为…所以… or a bare reason clause with 比较喜欢 / 最喜欢.' },
    { id: 'picking-favorite', label: 'Picking the favorite', goal: 'Use 最 + verb/adjective to identify the single best option.' },
    { id: 'comparing', label: 'Comparing two things', goal: 'Use A 比 B + adjective and its negative form A 没有 B + adjective.' },
  ],
  relatedPools: ['topic-weather', 'topic-society'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '本课目标',
      'běn kè mùbiāo',
      'By the end of this lesson, you can describe Beijing weather (including smog), name the four seasons with signature scenes, give a reasoned preference, and compare two seasons or two cities — all in one continuous Mandarin exchange.',
      'word',
      'Functions: 描述天气 miáoshù tiānqì (describe weather) · 表达偏好 biǎodá piānhào (express preference) · 给出理由 gěichū lǐyóu (give reason) · 进行比较 jìnxíng bǐjiào (compare) · 选择最爱 xuǎnzé zuì\'ài (pick the favorite)',
      'These five micro-skills underlie every small-talk weather conversation in Mandarin — once they\'re automatic, you can survive any Beijing winter morning chat.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      '真实场景',
      'zhēnshí chǎngjǐng',
      'You\'re walking across the Tsinghua campus on a freezing January morning when a classmate from Guangzhou (south China, where it never snows) catches up to you. She wants to compare your hometown winter to Beijing\'s and ask which season you like best.',
      'word',
      '同学: "北京的冬天太冷了! 你们国家的冬天比这里暖和吗?"',
      'A natural Beijing-vs-elsewhere opener — combines a complaint (太冷了), a comparison question (比 + 暖和), and an implicit invitation to share your preferences.',
      [
        { target: '太冷了 tài lěng le', note: 'common complaint pattern "too cold!" — 太…了 brackets an excessive degree' },
        { target: '比这里暖和吗? bǐ zhèlǐ nuǎnhuo ma?', note: 'A 比 B + adjective comparison + 吗 question particle — the core pattern of this lesson' },
        { target: 'Guangzhou 广州', note: 'major south-China city in Guangdong province; winters never see snow and "cold" means around 10°C' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '四个核心句式',
      'sì gè héxīn jùshì',
      'Four sentence patterns carry this whole lesson. (1) Bare weather: 今天很冷. (2) Preference with reason: 我喜欢秋天，因为不冷不热. (3) Comparison: 北京比上海冷. (4) Superlative: 我最喜欢秋天.',
      'word',
      '(1) 今天下雪. (2) 我喜欢秋天因为凉快. (3) 北京比上海冷. (4) 我最喜欢秋天.',
      'Four cumulative patterns — each one builds on the previous; learn them in this order and the rest of the lesson layers on top.',
      [
        { target: '描述: 今天 + 天气词', note: 'description: state the weather as a bare predicate; no copula needed for adjectives' },
        { target: '偏好: 我(比较/最)喜欢 + 季节', note: 'preference: insert a degree adverb between 我 and 喜欢' },
        { target: '比较: A 比 B + 形容词', note: 'comparison: bare adjective after 比 + B — no 很, no 是' },
        { target: '最高级: 最 + 形容词/动词', note: 'superlative: 最 stacks directly before any adjective or verb' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '雪',
      'xuě',
      'After the initials j/q/x/y, the letter "u" in Pinyin always represents the rounded front vowel ü — so "xue" = xüe, NOT "shway". Round your lips as if to say "oo" but keep the tongue forward as for "ee". One of the highest-frequency mispronunciations for English speakers.',
      'word',
      '下雪 xià xuě ("it\'s snowing") · 雪人 xuěrén ("snowman") · 滑雪 huáxuě ("to ski")',
      'Every Pinyin syllable starting with j/q/x/y + u is actually ü — the dots are dropped because the rule is unambiguous in those positions.',
      [
        { target: 'xue = xüe', note: 'after x, "u" stands for ü; the lips are rounded and the tongue is forward' },
        { target: 'compare: shuō 说 (real u)', note: 'after sh, "u" is the back vowel /u/ — different sound from xue' },
        { target: 'rounded ü test', note: 'say "ee", keep your tongue position, then round your lips — that\'s ü' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '比 vs 笔',
      'bǐ vs bǐ',
      'Two completely different words with identical pronunciation (third tone bǐ) and identical Pinyin spelling. 比 = "compared to / than" (the comparison preposition); 笔 = "pen / brush". Context alone disambiguates them — a classic example of why Hanzi matter alongside Pinyin.',
      'word',
      '北京比上海冷 ("Beijing is colder than Shanghai" — 比) vs 我有一支笔 ("I have a pen" — 笔)',
      'Same sound, same tone, different characters and totally different grammatical roles — this is why Hanzi recognition adds information that Pinyin alone cannot.',
      [
        { target: '比 bǐ (3rd tone)', note: 'preposition "compared to / than"; introduces the standard in a comparison' },
        { target: '笔 bǐ (3rd tone)', note: 'noun "pen / brush"; one of the four scholar\'s treasures (笔墨纸砚)' },
        { target: 'Pinyin alone is ambiguous', note: 'in fast speech you rely entirely on context to know which 比/笔 is meant — Mandarin has many such homophones' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '喜欢',
      'xǐhuan',
      'The verb "to like" — written xǐhuan in standard Pinyin, with neutral tone on the second syllable. The second 欢 has no tone mark; it stays light and short. Pronouncing it as xǐhuān (full first tone on 欢) sounds bookish or robotic to native ears.',
      'word',
      '我喜欢秋天 wǒ xǐhuan qiūtiān ("I like autumn") · 我不喜欢雾霾 wǒ bù xǐhuan wùmái ("I don\'t like smog")',
      'Many two-syllable verbs and nouns in Mandarin have a neutral-tone second syllable in natural speech: 朋友 péngyou, 名字 míngzi, 喜欢 xǐhuan — same pattern.',
      [
        { target: '喜 xǐ (3rd, full)', note: 'first syllable; full third-tone dip-and-rise' },
        { target: '欢 huan (neutral)', note: 'second syllable; light and short, pitch follows from the previous third tone' },
        { target: 'in 我喜欢… → wǒ xǐhuan…', note: 'two adjacent third tones (我 + 喜) trigger sandhi: wǒ becomes rising (wó) in fast speech' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '雾霾',
      'wùmái',
      'The word for "smog / heavy air pollution" — 雾 (wù, 4th tone, fog) + 霾 (mái, 2nd tone, haze). Fourth + second creates a distinctive falling-then-rising rhythm. A high-frequency word in modern Beijing daily speech, especially in winter when coal heating spikes particulate levels.',
      'word',
      '今天雾霾很严重 jīntiān wùmái hěn yánzhòng ("the smog is bad today") · 戴口罩 dài kǒuzhào ("wear a mask")',
      'The 4th-then-2nd tone pattern (sharp fall, then rise) is the same as in many compound words like 报告 bàogào or 大学 dàxué.',
      [
        { target: '雾 wù (4th tone)', note: 'sharp falling; "fog" — same character as in 雾化 (atomization)' },
        { target: '霾 mái (2nd tone)', note: 'rising; "haze, dust storm" — historically rare, now constantly in the news' },
        { target: '严重 yánzhòng', note: '"serious / severe" — the standard intensifier paired with 雾霾' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '比较 vs 比',
      'bǐjiào vs bǐ',
      'Two related words sharing the character 比 but with very different functions. 比 (bǐ) alone = "compared to" (preposition, Grammar I). 比较 (bǐjiào) = "relatively / quite" (a softener degree adverb, Grammar III) or "to compare" (verb). Mixing them up is a top learner error.',
      'word',
      '今天比较冷 (degree: "it\'s relatively cold today") vs 今天比昨天冷 (comparison: "today is colder than yesterday")',
      'Same first character, totally different grammar — the 较 (jiào) makes 比较 a single-word softener rather than a two-place comparison.',
      [
        { target: '比 bǐ (preposition)', note: '"compared to"; needs an object (the standard) — A 比 B + adjective' },
        { target: '比较 bǐjiào (degree adverb)', note: '"relatively / quite"; precedes an adjective; no comparison object needed' },
        { target: 'spotting the difference', note: 'if there\'s a noun after 比, it\'s the comparison preposition; if an adjective follows directly, it\'s the degree adverb 比较' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Weather
    // ────────────────────────────────────────────────────────────────────
    createContentItem('晴天', 'qíngtiān', 'A sunny day — 晴 (clear) + 天 (day/sky). The default "good weather" word; the opposite of 阴天. Used in weather reports and small talk alike.', 'word', '今天是晴天，我们去公园吧。', 'Sunny-day suggestion to go to the park — typical weekend phrasing.', null, [ACT.vocabularyWeather]),
    createContentItem('阴天', 'yīntiān', 'An overcast / cloudy day — 阴 (yin, the shadow/dark principle) + 天. Implies thick gray cloud cover with no sun, not the lighter "partly cloudy".', 'word', '今天是阴天，可能会下雨。', 'Overcast-day prediction; 可能 ("possibly") + 会 ("will") softens the forecast.', null, [ACT.vocabularyWeather]),
    createContentItem('下雨', 'xià yǔ', 'To rain — literally "fall + rain". The Mandarin verb-object pattern: 下 is the verb, 雨 is the object. The phrase changes form: 下小雨 (light rain), 下大雨 (heavy rain), 下雨了 (it started raining).', 'word', '外面下雨了，带伞吧。', '"It started raining outside, take an umbrella" — 了 marks the change of state.', null, [ACT.vocabularyWeather]),
    createContentItem('下雪', 'xià xuě', 'To snow — same 下 + noun pattern as 下雨. Beijing typically sees its first snow in November or December; southern cities like Guangzhou never see snow at all. Pronounced xià-xüe (rounded front vowel after x).', 'word', '北京冬天经常下雪。', '"It often snows in Beijing in winter" — 经常 (jīngcháng, often) is a useful frequency adverb.', null, [ACT.vocabularyWeather]),
    createContentItem('刮风', 'guā fēng', 'To be windy — literally "scrape + wind". Beijing\'s spring winds are notorious: 沙尘暴 (shā chén bào, sandstorms) blow in from the Gobi Desert and turn the sky yellow for days.', 'word', '今天刮大风，沙尘暴来了。', '"It\'s very windy today, the sandstorm has arrived" — a typical April Beijing complaint.', null, [ACT.vocabularyWeather]),
    createContentItem('雾霾', 'wùmái', 'Smog / heavy air pollution — 雾 (fog) + 霾 (haze). A defining feature of Beijing winters because of coal-based heating combined with topography. Air quality index (空气质量指数 AQI) is a daily concern; PM2.5 readings are checked like weather forecasts.', 'word', '今天雾霾很严重，最好戴口罩。', '"The smog is bad today, better wear a mask" — daily-life advice in Beijing winter.', null, [ACT.vocabularyWeather]),
    createContentItem('热', 'rè', 'To be hot — used for both weather and food. As a weather word it usually carries a negative tone (热得受不了 "unbearably hot"); in Beijing summer, 35–40°C is common in July and August.', 'word', '北京的夏天非常热。', '"Beijing summers are extremely hot" — 非常 (very) intensifies; locals routinely complain about the heat.', null, [ACT.vocabularyWeather]),
    createContentItem('冷', 'lěng', 'To be cold — the basic temperature word. Beijing winters drop to around -10°C in January; the contrast with the south (where 5°C is "cold") is a frequent conversation topic.', 'word', '今天太冷了，我不想出门。', '"It\'s too cold today, I don\'t want to go out" — 不想 + 出门 ("don\'t want to go out") is high-frequency.', null, [ACT.vocabularyWeather]),
    createContentItem('凉快', 'liángkuai', 'To be pleasantly cool — 凉 (cool) + 快 (refreshing). Always POSITIVE; describes a comfortable cool, not cold. The autumn ideal. Contrast with 冷 (cold, negative). Second syllable is neutral tone.', 'word', '秋天的天气真凉快。', '"Autumn weather is really pleasant" — 真 (really) + 凉快 is a warm compliment to the weather.', null, [ACT.vocabularyWeather]),
    createContentItem('暖和', 'nuǎnhuo', 'To be pleasantly warm — 暖 (warm) + 和 (gentle/harmonious). Always POSITIVE; the spring ideal. Contrast with 热 (hot, often negative). Second syllable is neutral tone — natural Beijing speech reduces it.', 'word', '春天的天气很暖和。', '"Spring weather is nice and warm" — 暖和 carries warmth and comfort, never excess.', null, [ACT.vocabularyWeather]),
    createContentItem('闷热', 'mēnrè', 'To be hot and humid — 闷 (stuffy/oppressive) + 热 (hot). The defining summer feel of southern cities like Shanghai and Guangzhou; Beijing\'s summer is hot but drier. A complaint word — never used positively.', 'word', '上海的夏天又闷又热。', '"Shanghai summers are stuffy and hot" — 又…又… ("both…and…") pairs two adjectives.', null, [ACT.vocabularyWeather]),
    createContentItem('干燥', 'gānzào', 'To be dry — the climate complaint of northern China. Beijing winters are bitterly dry; lips crack, static electricity sparks, and humidifiers run nonstop in heated apartments. Contrast with 潮湿 (cháoshī, damp/humid) typical of the south.', 'word', '北京冬天很干燥，要多喝水。', '"Beijing winter is very dry, drink lots of water" — standard health advice.', null, [ACT.vocabularyWeather]),
    createContentItem('天气', 'tiānqì', 'Weather — 天 (day/sky) + 气 (air/breath). The umbrella word used in questions: 今天天气怎么样? ("How\'s the weather today?"). Also appears in 天气预报 (tiānqì yùbào, weather forecast).', 'word', '今天天气怎么样? — 不错。', '"How\'s the weather today? — Not bad." — most common weather opener.', null, [ACT.vocabularyWeather]),
    createContentItem('气温', 'qìwēn', 'Temperature — 气 (air) + 温 (warm/temperature). Used with numbers: 气温二十度 ("the temperature is 20 degrees"). Distinguished from 温度 (wēndù, "degree of warmth"), which is more general.', 'word', '今天的气温是零下五度。', '"Today\'s temperature is -5°C" — 零下 (líng xià) means "below zero".', null, [ACT.vocabularyWeather]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: Seasons
    // ────────────────────────────────────────────────────────────────────
    createContentItem('春天', 'chūntiān', 'Spring — 春 (spring) + 天 (day/season). In Beijing, runs roughly March–May. Famous for windy sandstorms (沙尘暴) but also for cherry blossoms (樱花) at places like Yuyuantan Park.', 'word', '北京的春天比较短。', '"Beijing\'s spring is fairly short" — 比较 softens the statement.', null, [ACT.vocabularySeasons]),
    createContentItem('夏天', 'xiàtiān', 'Summer — 夏 (summer) + 天. June through August in Beijing; hot, humid in July (rainy season 雨季), and the time for 西瓜 (watermelon) and 凉面 (cold noodles).', 'word', '夏天最喜欢吃西瓜。', '"In summer my favorite thing is eating watermelon" — 西瓜 (xīguā) is the iconic summer fruit.', null, [ACT.vocabularySeasons]),
    createContentItem('秋天', 'qiūtiān', 'Autumn — 秋 (autumn) + 天. September–November; widely considered Beijing\'s best season. The Forbidden City\'s 银杏 (ginkgo) trees turn brilliant yellow, the air clears, and 中秋节 (Mid-Autumn Festival) falls in this season.', 'word', '北京的秋天最舒服。', '"Beijing\'s autumn is the most comfortable" — local consensus among Beijingers.', null, [ACT.vocabularySeasons]),
    createContentItem('冬天', 'dōngtiān', 'Winter — 冬 (winter) + 天. December–February; bitterly cold, dry, and prone to smog. Northern apartments have 暖气 (indoor heating), making indoor winters cozy; southern China has no central heating, so indoor winters there feel colder.', 'word', '北京的冬天又冷又干燥。', '"Beijing winter is both cold and dry" — 又…又… pairs two adjectives.', null, [ACT.vocabularySeasons]),
    createContentItem('四季', 'sìjì', 'The four seasons — short form of 四个季节. Used in the common phrase 四季分明 ("four distinct seasons"), a standard way to praise a place\'s climate variety.', 'word', '北京四季分明。', '"Beijing has four distinct seasons" — a typical descriptor for the city\'s climate.', null, [ACT.vocabularySeasons]),
    createContentItem('季节', 'jìjié', 'Season — the umbrella noun. Used in the question pattern 你最喜欢哪个季节? ("Which season do you like best?"). 季 alone is more formal/written; 季节 is the everyday spoken form.', 'word', '你最喜欢哪个季节?', '"Which season do you like best?" — the canonical question this lesson teaches you to answer.', null, [ACT.vocabularySeasons]),
    createContentItem('樱花', 'yīnghuā', 'Cherry blossoms — 樱 (cherry tree) + 花 (flower). The signature spring scene; Beijing\'s Yuyuantan Park (玉渊潭公园) hosts a famous late-March bloom. The Chinese viewing tradition is less formalized than Japan\'s hanami but increasingly popular.', 'word', '春天去玉渊潭看樱花。', '"In spring, go to Yuyuantan Park to see the cherry blossoms" — typical spring activity.', null, [ACT.vocabularySeasons]),
    createContentItem('红叶', 'hóngyè', 'Red autumn leaves — 红 (red) + 叶 (leaf). Beijing\'s Fragrant Hills (香山) is the most famous spot for 看红叶 (leaf-viewing) in late October. Equivalent to American "fall foliage" tradition.', 'word', '十月去香山看红叶。', '"In October go to Fragrant Hills to see the red leaves" — Beijing\'s autumn ritual.', null, [ACT.vocabularySeasons]),
    createContentItem('暖气', 'nuǎnqì', 'Indoor central heating — literally "warm air". Northern Chinese cities (above the Qinling-Huaihe line) have municipal heating that runs from November 15 to March 15 by government schedule. Southern cities have no such system, so indoor winters there are surprisingly cold.', 'word', '北方冬天有暖气。', '"The north has central heating in winter" — the key infrastructure fact behind north-south climate culture.', null, [ACT.vocabularySeasons]),
    createContentItem('月饼', 'yuèbing', 'Mooncakes — 月 (moon) + 饼 (cake/pastry). The signature food of 中秋节 (Mid-Autumn Festival) in September/October. Round to symbolize the full moon; filled with red bean paste, lotus seed, or salted egg yolk. Gifted to family and colleagues by the box.', 'word', '中秋节吃月饼。', '"At Mid-Autumn Festival we eat mooncakes" — the universal seasonal pairing.', null, [ACT.vocabularySeasons]),
    createContentItem('喜欢', 'xǐhuan', 'To like — the basic preference verb. Takes a noun object directly: 我喜欢春天 ("I like spring"). Second syllable is neutral tone (xǐhuan, not xǐhuān). Stackable with degree adverbs: 比较喜欢 (rather like), 最喜欢 (like best).', 'word', '我喜欢秋天的天气。', '"I like autumn weather" — direct object pattern, no preposition needed.', null, [ACT.vocabularySeasons]),
    createContentItem('比较喜欢', 'bǐjiào xǐhuan', '"Rather like / quite like" — adds 比较 (relatively) as a softener. Less committed than 喜欢 alone; gives wiggle room when you don\'t want to sound too strong. Common in polite conversation when stating mild preferences.', 'word', '我比较喜欢秋天。', '"I rather like autumn" — softer than 我很喜欢, useful when avoiding strong statements.', null, [ACT.vocabularySeasons]),
    createContentItem('最喜欢', 'zuì xǐhuan', '"Like the most / favorite" — adds 最 (the most) to mark the top choice. Equivalent to English "favorite". Pairs naturally with 在…中 ("among…"): 在四季中我最喜欢秋天.', 'word', '我最喜欢秋天，因为不冷不热。', '"My favorite is autumn, because it\'s neither cold nor hot" — the 不…不… pattern emphasizes balance.', null, [ACT.vocabularySeasons]),
    createContentItem('不喜欢', 'bù xǐhuan', '"Don\'t like" — simple negation with 不 placed before 喜欢. Avoid 不喜欢 in formal settings about people (sounds blunt); soften with 不太喜欢 ("don\'t particularly like") for a more polite distance.', 'word', '我不喜欢冬天，太冷了。', '"I don\'t like winter, it\'s too cold" — pairs with the 太…了 complaint structure.', null, [ACT.vocabularySeasons]),
    createContentItem('讨厌', 'tǎoyàn', 'To hate / dislike strongly — significantly stronger than 不喜欢. Reserve for genuine aversion (smog, traffic, mosquitoes); using it about a person is harsh and personal.', 'word', '我讨厌雾霾天。', '"I hate smoggy days" — a strong but socially acceptable target for 讨厌.', null, [ACT.vocabularySeasons]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar I: A 比 B comparison
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'A 比 B + 形容词',
      'A bǐ B + adjective',
      'The standard comparison pattern in Mandarin: A is more [adjective] than B. CRITICAL RULE: the adjective is BARE — no 很, no 是, no other linker. Adding 很 here (A 比 B 很冷) is a top learner error and ungrammatical.',
      'sentence',
      '北京比上海冷。("Beijing is colder than Shanghai.")\n夏天比冬天热。("Summer is hotter than winter.")',
      'The bare-adjective rule is the single most surprising feature of the 比 pattern for English speakers — your instinct is to add "very", but the comparison itself already supplies the intensity.',
      [
        { target: 'A 比 B + 形容词 ✓', note: 'correct: 北京比上海冷 — bare adjective after B' },
        { target: 'A 比 B 很 形容词 ✗', note: 'WRONG: 北京比上海很冷 — 很 cannot appear in a 比 comparison' },
        { target: 'A 比 B 是 形容词 ✗', note: 'WRONG: never use 是 in a 比 comparison; the adjective is the predicate itself' },
      ],
      [ACT.grammarComparison],
    ),
    createContentItem(
      '比 + degree marker',
      'bǐ with degree markers',
      'Add a quantity to a comparison with 一点 ("a little"), 一些 ("somewhat"), or 多了 / 得多 ("a lot"): 北京比上海冷一点 ("a bit colder"); 北京比上海冷多了 ("much colder"). The degree marker FOLLOWS the adjective.',
      'sentence',
      '北京比上海冷一点。("Beijing is a bit colder than Shanghai.")\n冬天比夏天冷多了。("Winter is way colder than summer.")',
      'Notice the word order: adjective comes BEFORE the degree marker — opposite of English ("a bit colder", not "colder a bit").',
      [
        { target: '一点 yìdiǎn', note: '"a little" — small difference; soft and polite' },
        { target: '一些 yìxiē', note: '"somewhat" — moderate difference; similar to 一点 but slightly less specific' },
        { target: '多了 / 得多', note: '"a lot / much more"; 多了 is colloquial, 得多 is more bookish' },
      ],
      [ACT.grammarComparison],
    ),
    createContentItem(
      '没有 B + 形容词 (negative)',
      'méiyǒu B + adjective',
      'To negate a comparison, do NOT say A 不比 B. The natural negation is A 没有 B + adjective ("A is not as [adjective] as B"): 上海没有北京冷 ("Shanghai is not as cold as Beijing"). 没有 here means "doesn\'t reach the level of".',
      'sentence',
      '上海没有北京冷。("Shanghai is not as cold as Beijing.")\n春天没有秋天舒服。("Spring is not as comfortable as autumn.")',
      'The 没有 negative is the default; 不比 exists but carries an argumentative or contradictive tone ("not actually more than"), useful only for explicit disagreement.',
      [
        { target: 'A 没有 B + adj. ✓', note: 'standard negation: "A is not as [adj.] as B"' },
        { target: 'A 不比 B + adj. (limited)', note: 'argumentative tone only: "A is NOT more [adj.] than B (contrary to what you said)"' },
        { target: 'comparison of equality', note: 'use A 跟 B 一样 + adj. ("A is as [adj.] as B"): 春天跟秋天一样舒服' },
      ],
      [ACT.grammarComparison],
    ),
    createContentItem(
      '比较 vs 比 (recap)',
      'bǐjiào vs bǐ — recap',
      'Two distinct grammar items sharing 比. 比 (preposition, this activity) needs a comparison object: A 比 B + adj. 比较 (degree adverb, Grammar III) needs no object — it just softens: 今天比较冷 ("today is relatively cold"). Confusing them is the top mid-Level-1 error.',
      'sentence',
      'COMPARISON: 北京比上海冷 (Beijing is colder than Shanghai)\nDEGREE: 北京比较冷 (Beijing is relatively cold)',
      'Test: is there a comparison object after 比? If yes → preposition 比. If the next word is an adjective → degree adverb 比较.',
      [
        { target: '比 + B + adj.', note: 'preposition; comparison object B is required' },
        { target: '比较 + adj.', note: 'degree adverb; just precedes the adjective directly' },
      ],
      [ACT.grammarComparison],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar II: Superlative 最
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '最',
      'zuì',
      'The superlative marker — placed directly before any adjective or verb to mean "the most". 最冷 ("coldest"), 最喜欢 ("like best"), 最贵 ("most expensive"). Functions identically with adjectives and stative verbs.',
      'sentence',
      '冬天最冷。("Winter is the coldest.")\n我最喜欢秋天。("I like autumn the most / my favorite is autumn.")',
      'Unlike English, no auxiliary like "the" or "-est" is needed — 最 alone does all the work.',
      [
        { target: '最 + 形容词', note: 'with adjective: 最冷 (coldest), 最热 (hottest), 最舒服 (most comfortable)' },
        { target: '最 + 喜欢/讨厌', note: 'with preference verb: 最喜欢 (favorite), 最讨厌 (hate most)' },
        { target: '最 + 动词', note: 'with action verb: 最想去 (most want to go), 最常吃 (most often eat)' },
      ],
      [ACT.grammarSuperlative],
    ),
    createContentItem(
      '在…中 / 在…里',
      'zài…zhōng / zài…lǐ',
      'To name the set of things being compared, prefix with 在 + set + 中/里 ("among / within…"). Often combined with 最: 在四季中我最喜欢秋天 ("Among the four seasons, my favorite is autumn"). 中 is slightly more formal; 里 is more colloquial.',
      'sentence',
      '在四季中，我最喜欢秋天。("Among the four seasons, my favorite is autumn.")\n在所有水果里，我最喜欢西瓜。("Of all fruits, my favorite is watermelon.")',
      'The 在…中/里 frame makes the comparison explicit and is much more natural than dropping the set entirely.',
      [
        { target: '在 + 集合 + 中', note: 'more formal; common in written or considered speech' },
        { target: '在 + 集合 + 里', note: 'more colloquial; everyday spoken use' },
        { target: '中 vs 里 (interchangeable)', note: 'in this construction the difference is mainly register; meaning is identical' },
      ],
      [ACT.grammarSuperlative],
    ),
    createContentItem(
      '最 + 喜欢 = 最爱',
      'zuì + xǐhuan = zuì\'ài',
      'Beyond 最喜欢, two compact alternatives express "favorite". 最爱 (zuì\'ài) is a noun-like compound meaning "the favorite" (people, foods, places). 我最爱 = "my favorite is…". More punchy than the phrasal 最喜欢.',
      'sentence',
      '秋天是我的最爱。("Autumn is my favorite.")\n这家店是我最爱的火锅店。("This is my favorite hot pot restaurant.")',
      '最爱 is slightly more emphatic and emotional than 最喜欢; common in social-media captions and casual speech among younger speakers.',
      [
        { target: '最喜欢 (verb phrase)', note: '"like the most" — neutral, all-purpose' },
        { target: '最爱 (noun/adj)', note: '"the favorite" — emphatic, often modifies another noun: 最爱的人 (favorite person)' },
        { target: 'register note', note: '最爱 has a slight emotional warmth; avoid in strict business or academic writing' },
      ],
      [ACT.grammarSuperlative],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar III: Degree adverbs
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '比较',
      'bǐjiào',
      'A softer degree adverb meaning "relatively / quite / rather". Less intense than 很 ("very") or 非常 ("extremely"). The safest go-to softener — adds politeness, avoids overstatement, and works in any register from casual to formal.',
      'sentence',
      '今天比较冷。("It\'s rather cold today.")\n北京的冬天比较干燥。("Beijing winter is fairly dry.")',
      'When in doubt about how strong to sound, 比较 is the always-safe choice — it sounds thoughtful rather than blunt.',
      [
        { target: '比较 + 形容词', note: 'simply precedes the adjective; no other particle needed' },
        { target: 'softens by ~half', note: '比较冷 feels like "quite cold" — less extreme than 很冷 ("very cold")' },
        { target: 'NOT a comparison', note: 'don\'t confuse with the comparison preposition 比 from Grammar I — different word' },
      ],
      [ACT.grammarDegree],
    ),
    createContentItem(
      '挺…的',
      'tǐng…de',
      '"Pretty / quite" — a colloquial softener bracketed by 挺 (tǐng) and the particle 的 (de) at the end. 挺好的 ("pretty good"), 挺冷的 ("pretty cold"). Warm and casual; the 的 is required and signals colloquial tone.',
      'sentence',
      '今天挺冷的。("It\'s pretty cold today.")\n这个季节挺舒服的。("This season is pretty comfortable.")',
      '挺…的 is one of the warmest-sounding degree expressions — very common in casual spoken Mandarin, less common in formal writing.',
      [
        { target: '挺 (tǐng)', note: 'colloquial intensifier; means roughly "pretty / quite"' },
        { target: '的 (sentence-final)', note: 'required closing particle; without 的 the phrase sounds incomplete' },
        { target: 'register', note: 'colloquial spoken; avoid in formal essays or official writing' },
      ],
      [ACT.grammarDegree],
    ),
    createContentItem(
      '还',
      'hái',
      '"Still / fairly" — a mild positive softener with multiple meanings. As a degree adverb: 还不错 ("not bad / fairly good"), 还可以 ("OK / acceptable"). Conveys mild approval without enthusiasm — useful when you don\'t want to overcommit.',
      'sentence',
      '北京的春天还不错。("Beijing\'s spring is fairly nice.")\n今天天气还可以。("Today\'s weather is OK.")',
      '还 + 不错 / 可以 / 好 is the default modest answer when you don\'t love something but don\'t want to be negative.',
      [
        { target: '还不错 hái bùcuò', note: '"not bad"; most common; mild positive' },
        { target: '还可以 hái kěyǐ', note: '"OK / acceptable"; slightly less enthusiastic than 还不错' },
        { target: '还好 hái hǎo', note: '"alright / so-so"; can be reassurance ("it\'s OK") or modest evaluation' },
      ],
      [ACT.grammarDegree],
    ),
    createContentItem(
      '相当',
      'xiāngdāng',
      '"Fairly / quite / considerably" — a more formal and emphatic degree adverb than 比较 or 挺. Bookish in feel; common in written Mandarin, news reports, and considered speech. Stronger than 比较 but more polished than 非常.',
      'sentence',
      '北京冬天的气温相当低。("Beijing winter temperatures are considerably low.")\n这个季节相当舒服。("This season is rather pleasant.")',
      '相当 fits formal contexts where you want to communicate "significantly" without sounding too casual or too intense.',
      [
        { target: 'register', note: 'formal/written-leaning; avoid in casual peer chat' },
        { target: 'strength', note: 'stronger than 比较, weaker than 非常 — "considerably" or "fairly"' },
        { target: 'word order', note: '相当 + 形容词; same slot as 比较 and 很' },
      ],
      [ACT.grammarDegree],
    ),
    createContentItem(
      '因为…，所以…',
      'yīnwèi…, suǒyǐ…',
      'The standard reason-result connector: 因为 ("because") opens the reason clause, 所以 ("so / therefore") opens the result clause. Both pieces can be used together or separately; pairing them sounds explicit and clear. Common in spoken and written Mandarin alike.',
      'sentence',
      '因为秋天不冷不热，所以我最喜欢秋天。("Because autumn is neither cold nor hot, I like it best.")\n我不喜欢冬天，因为太冷了。("I don\'t like winter, because it\'s too cold.")',
      'You can drop 所以 when the result comes naturally; you can also lead with the result clause and tag the reason with 因为 alone.',
      [
        { target: '因为 + clause', note: 'opens the reason; can stand alone or pair with 所以' },
        { target: '所以 + clause', note: 'opens the result; often used after 因为, but can also follow other reason markers' },
        { target: 'both together', note: 'explicit and clear; common in spoken and formal speech alike' },
      ],
      [ACT.grammarDegree],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '我在北京的四季',
      'wǒ zài Běijīng de sì jì',
      'A short paragraph by a foreign student at Tsinghua describing her experience of Beijing\'s four seasons. Read it aloud with correct tones, then answer the four comprehension questions below.',
      'sentence',
      '我在北京清华大学学习。北京有四季，每个季节都不一样。在四季中，我最喜欢秋天，因为不冷不热，天气很舒服。秋天的红叶也特别漂亮。我不太喜欢冬天，因为冬天又冷又干燥，有时候还有雾霾。北京的冬天比上海冷多了，所以我每天都穿很厚的衣服。夏天也比较热，但是不像南方那么闷热。',
      'Translation: "I study at Tsinghua University in Beijing. Beijing has four seasons, and each one is different. Among the four, my favorite is autumn, because it\'s neither cold nor hot — the weather is very comfortable. The autumn red leaves are also especially beautiful. I don\'t really like winter, because winter is both cold and dry, and sometimes there\'s smog too. Beijing winters are much colder than Shanghai, so I wear very thick clothes every day. Summer is also rather hot, but it\'s not as muggy as the south."',
      [
        { target: '在四季中', note: '"among the four seasons" — the comparison set frame from Grammar II' },
        { target: '不冷不热', note: '"neither cold nor hot" — 不…不… symmetric negation; idiomatic praise for balanced weather' },
        { target: '又冷又干燥', note: '"both cold and dry" — 又…又… pairs two characteristics' },
        { target: '比上海冷多了', note: '"much colder than Shanghai" — A 比 B + adj + 多了 from Grammar I' },
        { target: '不像…那么…', note: '"not as…as…" — alternative negative-comparison frame using 像 (resemble)' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '理解问题',
      'lǐjiě wèntí',
      'Four comprehension questions covering the paragraph. Answer each in a complete sentence using 因为, 比, or 最 from this lesson — short fragments are acceptable in speech but full sentences solidify the grammar.',
      'sentence',
      'Q1: 她最喜欢哪个季节? 为什么?\nQ2: 她为什么不喜欢冬天?\nQ3: 北京的冬天和上海比，怎么样?\nQ4: 北京的夏天和南方的夏天一样吗?',
      'Four questions hit the lesson\'s core grammar: superlative + reason, negation + reason, comparison, and equality/inequality.',
      [
        { target: 'A1: 她最喜欢秋天，因为不冷不热。', note: 'superlative + reason; full pattern from Grammar II + Grammar III' },
        { target: 'A2: 因为冬天又冷又干燥，还有雾霾。', note: 'reason-only clause; can drop 所以 when the result is obvious' },
        { target: 'A3: 北京比上海冷多了。', note: 'comparison + degree marker; the Grammar I pattern' },
        { target: 'A4: 不一样。北京夏天不像南方那么闷热。', note: 'negative equality + comparison; combines 不像…那么 with 闷热' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Listening & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '南北方对话',
      'nán běi fāng duìhuà',
      'A natural dialogue between a Beijing local and a Guangzhou (south China) classmate at Tsinghua, comparing their hometown climates. Covers all the lesson\'s patterns: weather, seasons, preference, reason, comparison.',
      'conversation',
      'A (北京): 今天的雾霾真严重，我都不想出门。\nB (广州): 是啊。广州没有这种天气。我们那边冬天比这里暖和多了。\nA: 真的吗? 广州的冬天有多热?\nB: 也不算热，大概十几度。但是没有暖气，房间里反而比北京冷。\nA: 哦? 北方有暖气，南方没有，对吧?\nB: 对。所以我最不喜欢南方的冬天，房间里太冷了。在四季中我最喜欢秋天。\nA: 我也是! 秋天不冷不热，红叶又漂亮。我们一起去香山看红叶吧!\nB: 好啊! 听说香山的红叶比颐和园的更红。\nA: 是的，香山是北京最有名的红叶景点。',
      'A real Beijing-Guangzhou student exchange — covers smog complaint, north-south heating culture, season preference, and a weekend plan to see autumn leaves at Fragrant Hills.',
      [
        { target: '雾霾真严重', note: '"the smog is really bad" — typical Beijing winter complaint opener' },
        { target: '没有暖气', note: '"no central heating" — the south China winter pain point; surprises northern Chinese' },
        { target: '房间里反而比北京冷', note: '"the rooms are actually colder than Beijing" — 反而 marks a counterintuitive contrast' },
        { target: '香山', note: 'Fragrant Hills park in NW Beijing; the most famous spot for 红叶 viewing in October' },
        { target: '比颐和园的更红', note: '"redder than the Summer Palace\'s" — A 比 B + adj. with 更 ("even more") for emphasis' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      '早晨天气对话',
      'zǎochén tiānqì duìhuà',
      'A quick morning weather exchange between two Tsinghua roommates checking conditions before heading to class. Short and high-frequency — the kind of dialogue you have every winter morning.',
      'conversation',
      'A: 早! 今天外面天气怎么样?\nB: 不太好，雾霾挺严重的，气温也比较低。\nA: 真的吗? 我看一下空气质量。\nB: 嗯，我刚看了，AQI 二百多。最好戴口罩。\nA: 那我多穿点儿衣服，再带个口罩。\nB: 嗯。下午可能还会刮风，更冷了。\nA: 唉，北京的冬天真讨厌。我最想念夏天的西瓜。\nB: 哈哈，再过几个月就到了!',
      'Casual roommate chat with all the practical Beijing-winter touches: AQI checking, mask wearing, layering up, and craving summer fruit. The kind of dialogue that\'s identical to real Tsinghua dorm life in February.',
      [
        { target: '空气质量 / AQI', note: 'Air Quality Index — checked daily in Beijing winters; readings over 150 trigger mask-wearing' },
        { target: '戴口罩', note: '"wear a mask" — pre-COVID, this was specifically smog-related; the cultural habit predates 2020' },
        { target: '多穿点儿衣服', note: '"wear a bit more clothes / dress warmly" — 多 + verb + 点儿 is a soft suggestion pattern' },
        { target: '想念', note: '"miss / long for" — stronger and more emotional than just 想; pairs naturally with seasonal foods or places' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '写作模板',
      'xiězuò múbǎn',
      'A reusable five-sentence template for any seasonal-preference paragraph in Mandarin. Fill in the bracketed slots with your own information — the structure carries the grammar.',
      'sentence',
      '我[在哪里]学习/生活。在四季中，我最喜欢[季节]，因为[原因]。[季节]的[活动/景色]也很[形容词]。我不太喜欢[季节]，因为[原因]。[城市A]比[城市B][形容词]，所以[结果]。',
      'Five slots: where you are, your favorite season + reason, a related activity or scene, your least favorite + reason, and one A-vs-B comparison. Together these cover every grammar point from Activities 5–7.',
      [
        { target: '[季节]', note: '春天 / 夏天 / 秋天 / 冬天 — pick one' },
        { target: '[原因]', note: 'a 形容词 (adjective) — try 不冷不热, 又…又…, or 太…了 for variety' },
        { target: '[活动/景色]', note: '看红叶 / 吃西瓜 / 滑雪 / 看樱花 — pick the iconic activity for your chosen season' },
        { target: '[城市A] 比 [城市B] [形容词]', note: 'A 比 B + adj from Grammar I; the comparison sentence proves you understand the pattern' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '写作示例',
      'xiězuò shìlì',
      'A worked example following the template. Use it as a model, then write your own 4–6 sentence paragraph swapping in your hometown, your preferred season, and your own reasons.',
      'sentence',
      '我在北京清华大学学习。在四季中，我最喜欢秋天，因为天气不冷不热，特别舒服。秋天去香山看红叶最棒了。我不太喜欢冬天，因为又冷又干燥，有时候还有雾霾。北京冬天比我家乡冷多了，所以我每天都要穿很厚的羽绒服。',
      'Translation: "I study at Tsinghua University in Beijing. Among the four seasons, my favorite is autumn, because the weather is neither cold nor hot — especially comfortable. Going to Fragrant Hills to see the red leaves in autumn is the best. I don\'t really like winter, because it\'s both cold and dry, and sometimes there\'s smog too. Beijing winter is much colder than my hometown, so I have to wear a thick down jacket every day."',
      [
        { target: '最棒了', note: '"is the best" — colloquial; 棒 (bàng) means "great/awesome", 最…了 emphasizes' },
        { target: '羽绒服 yǔróngfú', note: '"down jacket" — essential Beijing winter gear; pronunciation yǔ-róng-fú' },
        { target: '家乡 jiāxiāng', note: '"hometown" — combines 家 (home) + 乡 (countryside/region)' },
      ],
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '南北分界线',
      'nán běi fēnjiè xiàn',
      'The 秦岭-淮河 (Qínlǐng-Huáihé) line is a geographic and cultural divide running roughly along 33° N latitude, splitting China into 北方 (north) and 南方 (south). North of the line: central winter heating (暖气), wheat-based cuisine, cold dry winters. South of the line: no central heating, rice-based cuisine, milder but indoor-cold winters.',
      'sentence',
      '北方有暖气，南方没有。北方人吃面，南方人吃米。',
      'Two short sentences capture the entire north-south climate-and-food culture divide — one of the most discussed features of life in China.',
      [
        { target: '秦岭-淮河线', note: 'the official Qinling-Huaihe geographic divide line, set by Chinese geographers in the 1950s' },
        { target: '北方有暖气', note: 'the north has municipal central heating from Nov 15 to Mar 15 by law; south does not' },
        { target: '南方反而冷', note: 'paradoxically, indoor winters in Shanghai/Guangzhou can feel colder than Beijing because of no heating' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '春运',
      'chūnyùn',
      'The "Spring Festival travel rush" — the world\'s largest annual human migration. Each year, around 春节 (Chinese New Year, late Jan to mid-Feb), hundreds of millions of Chinese workers travel from coastal cities back to their inland hometowns to celebrate with family. Train tickets sell out within seconds.',
      'sentence',
      '春运期间，北京到成都的火车票很难买。',
      'Translation: "During the Spring Festival travel rush, train tickets from Beijing to Chengdu are very hard to get."',
      [
        { target: '春运 chūnyùn', note: 'short for 春节运输 (Spring Festival transport); covers a 40-day window around Chinese New Year' },
        { target: '春节', note: 'Chinese New Year — the most important holiday; date varies (late Jan to mid-Feb on the lunar calendar)' },
        { target: '抢票 qiǎngpiào', note: '"grab tickets" — the verb for the desperate scramble for train and plane tickets during 春运' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '区域口味地图',
      'qūyù kǒuwèi dìtú',
      'China\'s "flavor map" — four broad regional cuisines, each tied to its climate and ingredients. 川菜/湘菜 (Sichuan/Hunan, southwest): spicy with chili and 花椒 (Sichuan peppercorn) — the humid hot climate inspired pepper as preservation. 粤菜 (Cantonese, south coast): fresh, light, slightly sweet — abundant seafood and tropical fruit. 鲁菜 (Shandong, north): salty, savory — wheat-based with strong sauces. 苏菜 (Jiangsu, east): sweet-savory — refined, often with sugar.',
      'sentence',
      '四川人爱吃辣，广东人爱吃甜，北方人爱吃咸。',
      'Translation: "Sichuanese love spicy food, Cantonese love sweet food, northerners love salty food." — the most commonly cited summary of China\'s regional flavor preferences.',
      [
        { target: '川菜 chuāncài', note: 'Sichuan cuisine; spicy with chili and numbing 花椒 — climate-driven hot-and-pungent' },
        { target: '粤菜 yuècài', note: 'Cantonese cuisine; light and fresh, often with seafood; the south\'s subtropical pantry' },
        { target: '鲁菜 lǔcài', note: 'Shandong cuisine; salty and savory; one of the four "great cuisines"' },
        { target: '苏菜 sūcài', note: 'Jiangsu cuisine; sweet-savory and refined; 上海菜 (Shanghai cuisine) is a regional variant' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '中秋节',
      'Zhōngqiū Jié',
      'The Mid-Autumn Festival — the second most important traditional Chinese holiday after Spring Festival. Falls on the 15th day of the 8th lunar month (Sept or Oct). Families gather to view the full moon, eat 月饼 (mooncakes), and reflect on home. 月饼 are gifted by the box to family, colleagues, and clients in the weeks leading up to the festival.',
      'sentence',
      '中秋节我们一家人一起吃月饼，赏月。',
      'Translation: "At Mid-Autumn Festival, our whole family eats mooncakes together and admires the moon."',
      [
        { target: '中秋 zhōngqiū', note: 'literally "mid-autumn"; the 15th day of the 8th lunar month' },
        { target: '月饼 yuèbing', note: 'mooncakes; round dense pastries with sweet or savory fillings; the festival\'s signature food' },
        { target: '赏月 shǎngyuè', note: '"admire the moon"; the traditional Mid-Autumn evening activity, ideally outdoors' },
        { target: '家人团圆 jiārén tuányuán', note: '"family reunion"; the central theme of the holiday — like Thanksgiving in spirit' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '任务: 北京冬天的早晨',
      'rènwù: Běijīng dōngtiān de zǎochén',
      'Roleplay a winter-morning chat with a Tsinghua classmate from Guangzhou (south China). Use every skill from this lesson — describe the weather, complain about the smog, compare your hometown\'s climate, share your favorite season, and propose a weekend activity tied to a season.',
      'conversation',
      '[Tsinghua campus, January morning, -5°C]\n同学: 早! 今天怎么这么冷? 雾霾也好严重!\n你: [回应天气 + 同意/不同意]\n同学: 你们国家的冬天怎么样? 比北京暖和吗?\n你: [比较你的家乡和北京 — use 比 / 没有]\n同学: 听起来不错。在四季中你最喜欢哪个?\n你: [给出最喜欢的季节 + 用 因为/所以 说理由]\n同学: 那这个周末我们去香山看红叶? 哦不对，现在是冬天，红叶都落了。\n你: [建议一个冬天活动 — 例如滑雪 / 看雪 / 吃火锅]\n同学: 太棒了! 就这么定。',
      'Six-turn exchange — the AI tutor will play the Guangzhou classmate and respond naturally. Aim to use 比, 最, 因为/所以, and at least three weather words in your turns.',
      [
        { target: '回应天气', note: 'use 今天 + 天气词: 是啊，又冷又干燥 / 雾霾真讨厌 / 太冷了 — pick a weather complaint' },
        { target: '比较家乡', note: '我家乡比北京暖和 / 我家乡没有北京冷 — A 比 B + adj. or A 没有 B + adj.' },
        { target: '最喜欢的季节', note: '在四季中我最喜欢… 因为… — superlative + reason; both from this lesson' },
        { target: '冬天活动建议', note: '我们去滑雪吧 / 吃火锅 / 看雪景 — 火锅 (hot pot) is the iconic Beijing winter food' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战 — 描述全年',
      'tiǎozhàn — miáoshù quán nián',
      'Stretch goal: in one continuous Mandarin turn, describe Beijing\'s entire year. One sentence per season, each using a different grammar point from this lesson (weather word + 比较, comparison with 比, superlative with 最, reason with 因为/所以). The point is fluent variety, not perfection.',
      'sentence',
      '北京春天比较短，经常刮风，但是樱花很漂亮。夏天比上海热，但是没有上海闷热。秋天最舒服，因为不冷不热，红叶也很美。冬天又冷又干燥，雾霾也比较严重，所以最难过。',
      'Translation: "Beijing\'s spring is relatively short, often windy, but the cherry blossoms are beautiful. Summer is hotter than Shanghai but not as muggy as Shanghai. Autumn is the most comfortable, because it\'s neither cold nor hot, and the red leaves are beautiful too. Winter is both cold and dry, and the smog is rather bad, so it\'s the hardest to bear."',
      [
        { target: '春: 比较 + adj.', note: 'use the soft degree adverb from Grammar III to describe spring' },
        { target: '夏: 比 + B + adj.', note: 'use the comparison preposition from Grammar I to compare summer with another city' },
        { target: '秋: 最 + adj.', note: 'use the superlative from Grammar II to mark autumn as the best' },
        { target: '冬: 因为 / 所以', note: 'use the reason-result connector from Grammar III to explain why winter is hard' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
