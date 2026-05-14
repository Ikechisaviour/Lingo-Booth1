// Level 1 Unit 3 — Locations & Directions (Mandarin Chinese)
// Functions: asking where a place is, describing relative position with
// spatial nouns, giving and following directions, talking about distance.
// Mirrors the Unit 1 Chinese template (12 activities, ~70 items) but the
// topic shifts to wayfinding on a Tsinghua University campus in Beijing.
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
  orientation: 'zh-l1u3-orientation',
  pronunciation: 'zh-l1u3-pronunciation',
  vocabularyPlaces: 'zh-l1u3-vocab-places',
  vocabularyDirections: 'zh-l1u3-vocab-directions',
  grammarZai: 'zh-l1u3-grammar-zai',
  grammarDirections: 'zh-l1u3-grammar-directions',
  grammarDistance: 'zh-l1u3-grammar-distance',
  reading: 'zh-l1u3-reading',
  listening: 'zh-l1u3-listening',
  writing: 'zh-l1u3-writing',
  culture: 'zh-l1u3-culture',
  task: 'zh-l1u3-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Ask where any place is using 在哪里? / 在哪儿? and respond with a precise location using 在 + place + position word.',
      'Give a 2–3 step direction using 往 (toward), 一直走 (go straight), and 拐 (turn) so a stranger could actually follow it.',
      'Describe a building\'s position relative to another using the 12 spatial nouns (前面 / 后面 / 旁边 / 对面 / 里面 / 外面 etc.).',
    ],
    task: 'Picture a visiting student arriving at Tsinghua\'s main gate, asking where the library is. By the end of this lesson you should guide them step-by-step in Mandarin without rehearsing.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in this lesson',
    goals: [
      'Distinguish 在 (zài, 4th tone, "at") from 再 (zài, 4th tone, "again") — same sound, different characters, completely different meaning.',
      'Apply neutral-tone reduction in 旁边 (pángbiān → pángbian) and 里面 (lǐmiàn → lǐmian) — the second syllable shortens in fluent speech.',
      'Distinguish the colloquial 哪儿 (nǎr, with r-coloring, common in Beijing speech) from the more universal 哪里 (nǎlǐ).',
    ],
    task: 'Read each example aloud, applying neutral-tone reduction and noticing the 在 vs 再 contrast in writing.',
  },
  {
    id: ACT.vocabularyPlaces,
    section: 'Vocabulary I',
    title: 'Places on campus and around town',
    goals: [
      'Name 14+ common places that come up in everyday Chinese campus and city life — buildings, shops, transit hubs.',
      'Distinguish near-synonyms: 食堂 (school cafeteria) vs 餐厅 (restaurant), 厕所 (toilet, casual) vs 卫生间 (restroom, polite).',
    ],
    task: 'Say each place out loud three times with the correct tones, then list five that exist within a 5-minute walk of where you live.',
  },
  {
    id: ACT.vocabularyDirections,
    section: 'Vocabulary II',
    title: 'Spatial nouns and direction words',
    goals: [
      'Use the 12 spatial nouns: 前面 / 后面 / 旁边 / 对面 / 里面 / 外面 / 上面 / 下面 / 中间 / 左边 / 右边 / 中间.',
      'Use the direction-of-motion words 一直 (straight on), 往前 / 往后 / 往左 / 往右, and 拐 (to turn) for giving routes.',
    ],
    task: 'Describe where two campus buildings are relative to each other using at least three different spatial nouns.',
  },
  {
    id: ACT.grammarZai,
    section: 'Grammar I',
    title: '在 (zài) + place — stating where something is',
    goals: [
      'Use the location pattern A 在 B = "A is at/in B" (e.g., 图书馆在教学楼旁边 — "The library is next to the classroom building").',
      'Distinguish 在 (location verb, "to be located at") from 是 (identification copula, "to be"). 我是学生 ≠ 我在学生.',
      'Combine 在 with a spatial noun for precision: 在 + place + 前面/后面/旁边/里面 etc. The spatial noun goes AFTER the reference place, not before.',
    ],
    task: 'Write six sentences using 在 to place objects or people, then contrast each one with a 是 sentence to feel the difference.',
  },
  {
    id: ACT.grammarDirections,
    section: 'Grammar II',
    title: '怎么走 + 往 — asking for and giving directions',
    goals: [
      'Ask "how do I get to X?" with 去 X 怎么走? — the universal direction-asking pattern.',
      'Give directions with 往 (toward) + direction + 走 (go): 往前走 (go forward), 往右拐 (turn right).',
      'Combine 一直走 (keep going straight), 然后 (then), and 到了 X 就 (when you reach X) to chain a multi-step route.',
    ],
    task: 'Give a 3-step direction from your seat to the nearest exit, using at least 一直, 往, and 拐.',
  },
  {
    id: ACT.grammarDistance,
    section: 'Grammar III',
    title: '离 (lí) — distance from a reference point',
    goals: [
      'Use 离 (lí) to express distance "from" a reference point: A 离 B 远 / 近 ("A is far / near from B").',
      'Distinguish 离 (distance from) from 从 (origin / starting point of motion). 从北京来 = "come FROM Beijing"; 离北京很近 = "very close to Beijing".',
      'Combine 离 with the question 多远? ("how far?") and the answer + 远 / 近 / 不远 / 不太近 for a natural exchange.',
    ],
    task: 'Pick three places near you and describe each one\'s distance from your dorm using 离.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'Read a campus description',
    goals: [
      'Read a six-sentence description of Tsinghua\'s central area aloud with correct tones and sandhi.',
      'Answer comprehension questions using the 在 + position pattern in short complete sentences.',
    ],
    task: 'Read the paragraph below aloud once, then answer four comprehension questions in complete Mandarin sentences.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'Asking for directions — a dialogue',
    goals: [
      'Follow a 6-turn directions dialogue between a lost student and a passerby, noticing the markers of polite Beijing speech.',
      'Reproduce the dialogue with a different destination on your own campus, swapping in the relevant place and direction words.',
    ],
    task: 'Read the dialogue with the AI tutor first, then perform it again asking directions to a real building on your campus.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Write a route description',
    goals: [
      'Write 3–5 sentences in Hanzi guiding a visitor from a fixed starting point to a destination.',
      'Use 往 at least twice, 一直 at least once, and one spatial noun (旁边 / 对面 / etc.) so the writing exercises every direction pattern.',
    ],
    task: 'Write directions from Tsinghua\'s main gate to your favorite spot on campus, then read them aloud with correct tones.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: 'Addresses, landmarks, and cardinal directions',
    goals: [
      'Understand the big-to-small order of Chinese addresses (province → city → district → street → number) and how it mirrors the geographic logic of Chinese wayfinding.',
      'Recognize Beijing\'s iconic landmarks (天安门, 故宫, 长城) as the reference points locals use to orient anywhere in the city.',
      'Know that Mandarin speakers, especially in northern China, prefer cardinal directions (东南西北) over left/right when giving city directions.',
    ],
    task: 'Read a sample Tsinghua address aloud and identify each level: province, city, district, street, and unit number.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'Welcome to Tsinghua — guide a visiting student',
    goals: [
      'Combine every grammar pattern from this lesson into one continuous direction-giving scene with no break between greeting, listening, directing, and confirming.',
      'Adjust your level of detail to the listener — short and quick if they sound rushed, more landmark-rich if they sound unsure.',
    ],
    task: 'Roleplay guiding a visiting student from Tsinghua\'s main gate to the library, with the AI tutor playing the visitor; aim for a 6-turn exchange.',
  },
];

const lesson = {
  title: 'Level 1 · Unit 3: 图书馆在哪里? — Locations and Directions',
  category: 'daily-life',
  difficulty: 'beginner',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'asking-where-place-is', label: 'Asking where a place is', goal: 'Use X 在哪里? / 在哪儿? to ask the location of any building, room, or person.' },
    { id: 'describing-position', label: 'Describing where something is', goal: 'Combine 在 + reference place + spatial noun (旁边/前面/对面 etc.) to pinpoint a location.' },
    { id: 'giving-direction', label: 'Giving step-by-step directions', goal: 'Chain 一直走, 往 + direction + 拐, and 到了 X 就… to guide someone over multiple turns.' },
    { id: 'talking-distance', label: 'Talking about distance', goal: 'Use A 离 B 远 / 近 / 不远 to describe how far two places are from each other.' },
  ],
  relatedPools: ['topic-school', 'topic-city'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '本课目标',
      'běn kè mùbiāo',
      'By the end of this lesson, you can ask where any place is, give 2–3 step directions a stranger could actually follow, and describe a building\'s position relative to other buildings — all in one short exchange.',
      'word',
      'Functional language: 问路 wèn lù (ask the way) · 指路 zhǐ lù (point the way) · 描述位置 miáoshù wèizhì (describe position) · 谈距离 tán jùlí (talk about distance)',
      'These four micro-skills are what every newcomer to a Chinese campus needs in their first week — once they\'re automatic, you can navigate a Beijing university independently.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      '真实场景',
      'zhēnshí chǎngjǐng',
      'You are at Tsinghua University and a visiting student walks up to you at the main gate with a campus map in hand. They want to find the library and the cafeteria. You will need every grammar pattern in this lesson to direct them clearly.',
      'word',
      '访客: "你好，请问图书馆在哪里? 离这里远吗?"',
      'A typical polite question opener: 请问 (qǐngwèn, "may I ask") + place + 在哪里 + a distance follow-up. Both questions in one breath — common in Mandarin direction-asking.',
      [
        { target: '请问 qǐngwèn', note: 'polite opener literally "may I ask"; softens the question, much more natural than a bare 你 question with a stranger' },
        { target: '在哪里? zài nǎlǐ?', note: 'the standard "where is it?" question; the colloquial Beijing variant is 在哪儿? (zài nǎr?)' },
        { target: '离这里远吗? lí zhèlǐ yuǎn ma?', note: 'follow-up checking distance; 离 (lí) marks "distance from" and is essential for natural direction-asking' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '清华校园',
      'Qīnghuá xiàoyuán',
      'The setting for this lesson is Tsinghua University in northwest Beijing — one of China\'s top universities. Its central area is laid out around a few landmark buildings (图书馆, 大礼堂, 教学楼) that we will use as reference points throughout the lesson.',
      'word',
      '清华大学 Qīnghuá Dàxué — 北京 Běijīng — 海淀区 Hǎidiàn Qū',
      'Located in 海淀区 (Haidian District), the academic district of Beijing; the rest of the lesson assumes a campus of this scale and layout.',
      [
        { target: '清华大学', note: 'Tsinghua University; widely considered China\'s top tech and engineering school' },
        { target: '海淀区', note: 'Haidian District in northwest Beijing; home to most major universities' },
        { target: '校园 xiàoyuán', note: '"campus"; literal "school garden", a generic word for any university or school grounds' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '在 vs 再',
      'zài vs zài',
      'Two extremely common fourth-tone characters that sound IDENTICAL but mean completely different things. 在 means "at / located at / be at"; 再 means "again / once more". Context and writing disambiguate.',
      'word',
      '我在图书馆 wǒ zài túshūguǎn ("I am at the library") vs 再见 zàijiàn ("goodbye", literally "again-see")',
      'A classic Chinese homophone pair; the pronunciation is identical so you rely entirely on context and the Hanzi to tell them apart.',
      [
        { target: '在 zài (4th)', note: 'location verb / preposition meaning "at, in, on, located at"' },
        { target: '再 zài (4th)', note: 'adverb meaning "again, once more, then"; appears in 再见 (goodbye)' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '旁边',
      'pángbiān (spoken: pángbian)',
      'A two-syllable spatial noun where the second syllable reduces to neutral tone in fluent speech. Written as pángbiān (2nd + 1st) but spoken closer to pángbian (2nd + neutral). Same pattern applies to 里面, 外面, 前面, 后面.',
      'word',
      '图书馆旁边 túshūguǎn pángbiān → spoken: túshūguǎn pángbian',
      'Trying to say all spatial nouns with full tones makes them sound robotic; the neutral-tone reduction is what makes them feel natural.',
      [
        { target: '旁 páng (2nd, full)', note: 'first syllable; full second-tone rising' },
        { target: '边 biān → bian (neutral)', note: 'second syllable; reduces to neutral tone in connected speech' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '哪里 vs 哪儿',
      'nǎlǐ vs nǎr',
      'Two variants of "where". 哪里 (nǎlǐ) is the universal written and southern-spoken form; 哪儿 (nǎr) is the northern colloquial form with r-coloring, very common in Beijing speech. Both mean the same thing and are interchangeable in most contexts.',
      'word',
      '图书馆在哪里? (universal) = 图书馆在哪儿? (Beijing-style) — both mean "Where is the library?"',
      'Use 哪儿 to sound more Beijing-native; use 哪里 to sound more neutral or southern; both are correct.',
      [
        { target: '哪里 nǎlǐ', note: 'standard pan-Mandarin form; preferred in writing and southern speech' },
        { target: '哪儿 nǎr', note: 'erhua (r-colored) Beijing colloquial form; very common in northern speech' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '一直 vs 一会儿',
      'yìzhí vs yíhuìr',
      'Two patterns where 一 (yī) undergoes sandhi. In 一直 (yìzhí, "straight on"), 一 becomes yì (falling) because 直 is second tone. In 一会儿 (yíhuìr, "a moment"), 一 becomes yí (rising) because 会 is fourth tone.',
      'word',
      '一直走 yìzhí zǒu ("keep going straight") vs 等一会儿 děng yíhuìr ("wait a moment")',
      'Both are extremely common direction-giving phrases; the sandhi shifts depending on the following tone.',
      [
        { target: '一 + 2nd → yì (falling)', note: '一直 yìzhí — because 直 (zhí) is second tone' },
        { target: '一 + 4th → yí (rising)', note: '一会儿 yíhuìr — because 会 (huì) is fourth tone' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '怎么走',
      'zěnme zǒu',
      'A three-syllable question phrase combining third tone 怎 (zěn), neutral 么 (me), and third tone 走 (zǒu). The third-tone sandhi rule applies between 怎 and the following 么 (which is neutral), then 走 keeps its full third tone at the end of the phrase.',
      'word',
      '去图书馆怎么走? qù túshūguǎn zěnme zǒu? ("How do I get to the library?")',
      'The standard direction-asking pattern; learn the rhythm by saying it aloud five times.',
      [
        { target: '怎 zěn (3rd)', note: 'third-tone interrogative root meaning "how"' },
        { target: '么 me (neutral)', note: 'particle suffix; light and short' },
        { target: '走 zǒu (3rd)', note: '"walk / go (on foot)"; phrase-final keeps full third tone' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Places on campus and around town
    // ────────────────────────────────────────────────────────────────────
    createContentItem('图书馆', 'túshūguǎn', 'Library — the most-asked-for place in any campus directions exchange. Compound of 图书 (túshū, "books") + 馆 (guǎn, "hall / public building"). The 馆 suffix marks any public-service building in Chinese.', 'word', '图书馆在教学楼旁边。', 'Standard campus location sentence; the library is "next to" (旁边) the classroom building.', null, [ACT.vocabularyPlaces]),
    createContentItem('食堂', 'shítáng', 'School / workplace cafeteria — a subsidized canteen with multiple food counters. Different from 餐厅 (cāntīng, "restaurant"): a 食堂 is institutional (campus, factory, office); a 餐厅 is a paying customer restaurant.', 'word', '我们去食堂吃饭吧。', '"Let\'s go eat at the cafeteria"; standard student-to-student suggestion using 吧 to soften it.', null, [ACT.vocabularyPlaces]),
    createContentItem('宿舍', 'sùshè', 'Dormitory — student housing on or near campus. In China, university students almost always live in 宿舍 for the first few years, typically 4–6 students per room. Compound of 宿 (sù, "lodge") + 舍 (shè, "dwelling").', 'word', '我住在学校宿舍。', '"I live in the school dormitory"; uses 住在 (live at) — note 在 again for location.', null, [ACT.vocabularyPlaces]),
    createContentItem('教学楼', 'jiàoxuélóu', 'Classroom building — typically numbered (一教, 二教, 三教) on Chinese campuses. Compound of 教学 (jiàoxué, "teaching") + 楼 (lóu, "multi-story building"). 楼 is the suffix for any building taller than a single floor.', 'word', '我的课在三教。', '"My class is in Building 3" (literally "Third Teaching"); short form 三教 dropping 学楼 is standard student speech.', null, [ACT.vocabularyPlaces]),
    createContentItem('操场', 'cāochǎng', 'Sports field / playground — usually the 400-meter track-and-field with a soccer pitch in the middle. Every Chinese school has one; it is also where morning exercises (早操) historically happened.', 'word', '学生在操场跑步。', '"Students are running on the sports field"; common scene at any Chinese campus in early morning or evening.', null, [ACT.vocabularyPlaces]),
    createContentItem('银行', 'yínháng', 'Bank — a high-frequency word for any newcomer needing to open an account or withdraw cash. Compound of 银 (yín, "silver / money") + 行 (háng, "row / business establishment" — pronounced háng here, not xíng).', 'word', '银行在邮局对面。', '"The bank is across from the post office"; classic relative-location sentence using 对面.', null, [ACT.vocabularyPlaces]),
    createContentItem('邮局', 'yóujú', 'Post office — for mailing letters, packages, and (in China) paying certain bills. Increasingly replaced by SF Express (顺丰) and other courier offices in daily use, but still a recognizable landmark.', 'word', '邮局在银行旁边。', 'Pairing with 银行 in the example helps drill the two together; common pair seen in any Chinese commercial street.', null, [ACT.vocabularyPlaces]),
    createContentItem('医院', 'yīyuàn', 'Hospital / clinic — the generic word for any medical facility, from small neighborhood clinics to major hospitals. Compound of 医 (yī, "medicine") + 院 (yuàn, "courtyard / institution"). The 院 suffix marks institutional buildings.', 'word', '医院离学校不远。', '"The hospital is not far from the school"; uses 离 (distance from) which is the focus of Grammar III.', null, [ACT.vocabularyPlaces]),
    createContentItem('公园', 'gōngyuán', 'Park — a public park, often with paths, benches, and exercise equipment. Beijing\'s major parks (颐和园, 北海公园) are also tourist landmarks. Compound of 公 (gōng, "public") + 园 (yuán, "garden").', 'word', '我们在公园散步。', '"We are walking in the park"; uses 在 + place + verb pattern (location of the action).', null, [ACT.vocabularyPlaces]),
    createContentItem('地铁站', 'dìtiězhàn', 'Subway station — essential vocabulary in any Chinese city with a metro. Compound of 地铁 (dìtiě, "subway", literally "ground iron") + 站 (zhàn, "station / stop"). The 站 suffix works for any transit stop.', 'word', '地铁站在大学西门外面。', '"The subway station is outside the west gate of the university"; typical campus-to-transit description.', null, [ACT.vocabularyPlaces]),
    createContentItem('公共汽车站', 'gōnggòng qìchēzhàn', 'Bus stop — the full formal name. Daily speech usually shortens to 公交站 (gōngjiāozhàn) or just 车站 (chēzhàn) when context is clear. 公共汽车 (gōnggòng qìchē) means "public car" → "bus".', 'word', '请问最近的公共汽车站在哪儿?', '"Excuse me, where is the nearest bus stop?"; uses 最近的 (zuì jìn de, "the nearest") as a useful add-on.', null, [ACT.vocabularyPlaces]),
    createContentItem('商店', 'shāngdiàn', 'Shop / small store — the generic word for any retail outlet. More specific kinds include 超市 (chāoshì, "supermarket"), 便利店 (biànlìdiàn, "convenience store"), and 服装店 (fúzhuāngdiàn, "clothing store").', 'word', '商店在邮局和银行中间。', '"The shop is between the post office and the bank"; uses 中间 (in-between) — a key spatial noun.', null, [ACT.vocabularyPlaces]),
    createContentItem('餐厅', 'cāntīng', 'Restaurant — a paying customer eating establishment. Contrasts with 食堂 (institutional cafeteria). Compound of 餐 (cān, "meal") + 厅 (tīng, "hall"). Also used inside hotels and large buildings to mean "dining room".', 'word', '清华大门外面有很多餐厅。', '"There are many restaurants outside Tsinghua\'s main gate"; uses 大门外面 (outside the main gate) — classic spatial noun.', null, [ACT.vocabularyPlaces]),
    createContentItem('厕所 / 卫生间', 'cèsuǒ / wèishēngjiān', 'Toilet / restroom — two registers of the same place. 厕所 (cèsuǒ) is more casual / direct, common with friends. 卫生间 (wèishēngjiān, literally "hygiene room") is the polite form for public signage, hotels, and asking strangers. Use 卫生间 with someone you just met.', 'word', '请问卫生间在哪儿? (polite) / 厕所在哪儿? (casual)', 'Register matters: asking a hotel receptionist would use 卫生间; asking a roommate would use 厕所.', null, [ACT.vocabularyPlaces]),
    createContentItem('大门', 'dàmén', 'Main gate / front entrance — every Chinese university campus has a clearly identified 大门 or 正门 (zhèngmén, "front gate") and side gates (东门 / 西门 / 南门 / 北门 — east/west/south/north gate). The main gate is the standard meeting point and direction-giving starting point.', 'word', '我在清华大门等你。', '"I\'ll wait for you at Tsinghua\'s main gate"; common meet-up phrasing.', null, [ACT.vocabularyPlaces]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: Spatial nouns and direction words
    // ────────────────────────────────────────────────────────────────────
    createContentItem('前面', 'qiánmiàn', 'In front of / ahead. Spatial noun placed AFTER a reference noun: X 前面 = "in front of X". The 面 (miàn, "side / face") suffix turns the bare direction word 前 into a spatial noun.', 'word', '宿舍前面有一个操场。', '"There is a sports field in front of the dormitory"; uses 有 (have) + 一个 (one) — the existential sentence pattern.', null, [ACT.vocabularyDirections]),
    createContentItem('后面', 'hòumiàn', 'Behind / at the back of. Mirrors 前面 — placed AFTER the reference noun: X 后面 = "behind X". Note the second syllable can reduce to neutral tone in fluent speech (hòumian).', 'word', '图书馆后面是停车场。', '"Behind the library is the parking lot"; uses 是 to identify what is behind, similar to "is" in an existential sense.', null, [ACT.vocabularyDirections]),
    createContentItem('旁边', 'pángbiān', 'Next to / beside. The all-purpose "adjacent" spatial noun. Less specific than 左边 / 右边 — use 旁边 when you don\'t know or don\'t care which side, or when the two things are close but not necessarily aligned.', 'word', '邮局在银行旁边。', '"The post office is next to the bank"; the most common spatial relation in city descriptions.', null, [ACT.vocabularyDirections]),
    createContentItem('对面', 'duìmiàn', 'Opposite / across from. Used for things facing each other across a street, room, or open space. Distinct from 旁边 (adjacent on the same side); 对面 implies a separation with the two things facing each other.', 'word', '银行在邮局对面。', '"The bank is opposite the post office"; the bank and post office face each other across the street.', null, [ACT.vocabularyDirections]),
    createContentItem('里面', 'lǐmiàn', 'Inside / within. Spatial noun for "in" something. Often shortened to 里 (lǐ) alone when attached directly to a place: 学校里 = 学校里面 ("inside the school"). Both are correct; bare 里 is more common in fluent speech.', 'word', '咖啡馆里面有Wi-Fi。', '"There is Wi-Fi inside the coffee shop"; uses 里面 + 有 + thing — common existential sentence.', null, [ACT.vocabularyDirections]),
    createContentItem('外面', 'wàimiàn', 'Outside / external. Mirror of 里面 — placed AFTER the reference noun: 学校外面 = "outside the school". Can also be 外 (wài) alone in many contexts.', 'word', '宿舍外面有一个小公园。', '"There is a small park outside the dormitory"; everyday observation.', null, [ACT.vocabularyDirections]),
    createContentItem('上面', 'shàngmiàn', 'On top of / above. Used both literally (on the surface) and vertically (above). Often shortens to 上 (shàng) when attached directly: 桌子上 = 桌子上面 ("on the table"). 上 alone is more colloquial.', 'word', '桌子上面有一本书。', '"There is a book on the table"; classic 有 (have) existential sentence.', null, [ACT.vocabularyDirections]),
    createContentItem('下面', 'xiàmiàn', 'Underneath / below. Mirror of 上面 — placed AFTER the reference noun: 桌子下面 = "under the table". Often shortens to 下 (xià) alone in attached forms.', 'word', '椅子下面有一只猫。', '"There is a cat under the chair"; uses 一只 (yì zhī) — the measure word for animals.', null, [ACT.vocabularyDirections]),
    createContentItem('中间', 'zhōngjiān', 'In the middle / between. Used for something between two other things or in the center of a group. Pattern: A 和 B 中间 = "between A and B" (uses 和 = "and" to link the two reference points).', 'word', '商店在邮局和银行中间。', '"The shop is between the post office and the bank"; note the A 和 B 中间 construction.', null, [ACT.vocabularyDirections]),
    createContentItem('左边', 'zuǒbiān', 'Left side. Used for relative position from the speaker\'s or a fixed reference\'s viewpoint. Note 边 (biān) is also a suffix for "side" — similar to 面 in 旁边/对面 but used for left/right specifically.', 'word', '图书馆在大门的左边。', '"The library is on the left side of the main gate"; the 的 here marks "the gate\'s left side".', null, [ACT.vocabularyDirections]),
    createContentItem('右边', 'yòubiān', 'Right side. Mirror of 左边. Note that in Chinese direction-giving, especially in northern China, speakers often prefer cardinal directions (东南西北) over 左/右 — see the Culture note.', 'word', '咖啡馆在食堂的右边。', '"The coffee shop is on the right side of the cafeteria"; another 的 + spatial noun pattern.', null, [ACT.vocabularyDirections]),
    createContentItem('一直', 'yìzhí', 'Straight on / continuously. Used with motion verbs (走, 开, 骑) to mean "keep going". 一直走 = "go straight"; 一直开 = "keep driving". Note the sandhi: yì + 2nd tone 直 = yì zhí (1 becomes falling).', 'word', '一直走，然后往右拐。', '"Go straight, then turn right"; combines 一直 with 往 + direction + 拐 from Grammar II.', null, [ACT.vocabularyDirections]),
    createContentItem('往', 'wǎng', 'Toward / in the direction of. Used with a direction + a motion verb: 往前走 ("go forward"), 往左拐 ("turn left"), 往北走 ("go north"). The pattern is 往 + direction-word + motion-verb.', 'word', '往前走五十米。', '"Walk fifty meters forward"; uses 米 (mǐ, "meter") for distance.', null, [ACT.vocabularyDirections]),
    createContentItem('拐', 'guǎi', 'Turn (when walking or driving). Pattern: 往 + direction + 拐 = "turn (direction)". 往右拐 ("turn right"), 往左拐 ("turn left"). Alternative verb 转 (zhuǎn) is also used; 拐 is slightly more colloquial.', 'word', '到了红绿灯往右拐。', '"When you reach the traffic light, turn right"; uses 到了 (when you reach) — a common direction-giving connector.', null, [ACT.vocabularyDirections]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar I: 在 + place
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '在 location verb',
      'zài — to be located at',
      'The verb 在 (zài) states where something or someone is located: A 在 B = "A is at/in B". Unlike English "to be", Mandarin uses TWO different verbs — 是 for identification (what something is) and 在 for location (where it is).',
      'sentence',
      '图书馆在教学楼旁边。("The library is next to the classroom building.")\n王老师在办公室。("Teacher Wang is in the office.")',
      'Use 在 whenever the answer is a place; use 是 whenever the answer is an identity/category.',
      [
        { target: '是 shì + noun', note: 'identification — "A is a B" (我是学生 = "I am a student")' },
        { target: '在 zài + place', note: 'location — "A is at/in B" (我在学校 = "I am at school")' },
        { target: 'WRONG: 我是学校', note: 'common mistake; should be 我在学校 (location, not identification)' },
      ],
      [ACT.grammarZai],
    ),
    createContentItem(
      '在 + place + spatial noun',
      'zài + place + spatial noun',
      'For PRECISE location, combine 在 + reference place + spatial noun. The spatial noun (前面, 旁边, 对面, 里面 etc.) goes AFTER the reference place — opposite to English word order ("in front of the building" → 在 building 前面).',
      'sentence',
      '图书馆在教学楼旁边。\n咖啡馆在食堂里面。\n邮局在银行对面。',
      'Three pattern examples: "next to", "inside", "opposite" — note the consistent place-then-spatial-noun order, no preposition needed between them.',
      [
        { target: '在 + reference place + 旁边', note: 'pattern for "next to" something' },
        { target: '在 + reference place + 里面', note: 'pattern for "inside" something' },
        { target: '在 + reference place + 对面', note: 'pattern for "opposite / across from" something' },
        { target: 'Spatial noun goes AFTER the reference', note: 'opposite of English: Chinese says "school-front", English says "front of school"' },
      ],
      [ACT.grammarZai],
    ),
    createContentItem(
      '问位置: 在哪里? / 在哪儿?',
      'asking location: zài nǎlǐ? / zài nǎr?',
      'Form a location question by replacing the place in 在 X with the question word 哪里 (nǎlǐ, universal) or 哪儿 (nǎr, Beijing colloquial). Word order does NOT change — same as a statement, just with the question word in the place slot.',
      'sentence',
      '图书馆在哪里? ("Where is the library?")\n你在哪儿? ("Where are you?" — common phone opener in Beijing speech)',
      'Mandarin question word stays in its natural position; you never move it to the front like English "where".',
      [
        { target: '图书馆在 X', note: 'statement: "the library is at X"' },
        { target: '图书馆在哪里?', note: 'question: "where is the library?" — only X is replaced with 哪里' },
        { target: 'No 吗 needed', note: 'when there is a question word like 哪里, you do NOT add 吗; question words already mark the question' },
      ],
      [ACT.grammarZai],
    ),
    createContentItem(
      '没在 (negation)',
      'méi zài — "is not at"',
      'Negate 在 with 不 (for general / habitual statements) or 没 (for "is not currently / not the case"). For location, 不在 is more common ("not at"). Pattern: 我不在家 ("I am not at home").',
      'sentence',
      '王老师不在办公室，他在教室。("Teacher Wang is not in the office; he is in the classroom.")',
      'The 不在 X，在 Y pattern is the standard "not at X, at Y" correction.',
      [
        { target: '不在 bùzài', note: '"not at" — applies sandhi: bú zài because 在 is fourth tone' },
        { target: '没在 méi zài', note: 'occasionally used; emphasizes "not currently at" with implied contrast to a previous time' },
      ],
      [ACT.grammarZai],
    ),
    createContentItem(
      '存在句: 有 + place',
      'cúnzài jù: yǒu + place',
      'The existential pattern: PLACE + 有 + thing = "There is/are X at PLACE". Notice 有 (yǒu, "have / exist") replaces 在 when you want to highlight EXISTENCE rather than location.',
      'sentence',
      '图书馆里面有很多书。("Inside the library, there are many books.")\n大门外面有一个公园。("Outside the main gate, there is a park.")',
      'Use 在 when you start with a known thing and want to say where; use 有 when you start with a place and want to introduce a new thing.',
      [
        { target: 'X 在 place', note: 'X is the topic; the place is the new info' },
        { target: 'place 有 X', note: 'the place is the topic; X is the new info introduced' },
      ],
      [ACT.grammarZai],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar II: Directions with 往 and 怎么走
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '去 X 怎么走',
      'qù X zěnme zǒu',
      'The standard direction-asking pattern. Literal: "go-X-how-walk?" — i.e., "How do I get to X?". Used with 请问 (qǐngwèn) at the start for politeness: 请问，去图书馆怎么走?',
      'sentence',
      '请问，去清华大学怎么走?',
      'The polite opener 请问 + the destination + 怎么走 is the safest way to ask any stranger for directions.',
      [
        { target: '请问 qǐngwèn', note: 'polite opener; literally "may I ask"' },
        { target: '去 + place', note: 'verb 去 (go) + destination; states what you are trying to reach' },
        { target: '怎么走 zěnme zǒu', note: 'literally "how walk?" — "how do I get there?"' },
      ],
      [ACT.grammarDirections],
    ),
    createContentItem(
      '往 + direction + 走',
      'wǎng + direction + zǒu',
      'The core direction-giving pattern: 往 (wǎng, "toward") + direction word + motion verb (走 walk / 开 drive / 骑 ride). 往前走 = "go forward"; 往右走 = "go right (a while)"; 往北走 = "go north".',
      'sentence',
      '往前走，到了红绿灯往右拐。',
      'Two-step direction: first 往前走 (keep going forward), then 往右拐 (turn right) when you reach the light.',
      [
        { target: '往前 wǎng qián', note: 'toward the front / forward' },
        { target: '往后 wǎng hòu', note: 'toward the back / backward' },
        { target: '往左 / 往右', note: 'toward the left / right' },
        { target: '往北/南/东/西', note: 'toward north / south / east / west — preferred in northern China' },
      ],
      [ACT.grammarDirections],
    ),
    createContentItem(
      '一直走 + 然后',
      'yìzhí zǒu + ránhòu',
      'Chain multiple direction steps with 一直走 (go straight) + 然后 (then). This is the natural rhythm of Mandarin direction-giving: first establish a long stretch, then mark the turn.',
      'sentence',
      '你一直走，然后往右拐，图书馆就在你的左边。',
      '"Keep going straight, then turn right; the library will be on your left." Notice 就 (jiù, "then / exactly") marks the moment of arrival.',
      [
        { target: '一直走 yìzhí zǒu', note: '"keep walking straight"; the establishing long stretch' },
        { target: '然后 ránhòu', note: '"then / after that"; the most common direction-chaining connector' },
        { target: '就在 jiù zài', note: '"is right at / will be exactly at"; emphatic version of plain 在 for arrival' },
      ],
      [ACT.grammarDirections],
    ),
    createContentItem(
      '到了 X 就 …',
      'dào le X jiù …',
      'The "when you reach X, then …" connector. 到 (dào) means "arrive at", and 了 (le) marks completion of arrival. 就 (jiù) introduces what happens at that moment. Pattern: 到了 + landmark + 就 + action.',
      'sentence',
      '到了红绿灯就往左拐。("When you reach the traffic light, turn left.")',
      'Essential for chaining "do X when you reach Y" instructions; appears in nearly every direction-giving exchange longer than 2 steps.',
      [
        { target: '到了 X dào le X', note: '"upon reaching X"; the time-marker' },
        { target: '就 jiù', note: '"then / right away"; signals the immediate next action' },
        { target: 'Common landmarks: 红绿灯 (traffic light), 十字路口 (intersection), 桥 (bridge)', note: 'these are the typical X-values in direction-giving' },
      ],
      [ACT.grammarDirections],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar III: 离 (distance)
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '离 distance',
      'lí — distance from',
      'The preposition 离 (lí) marks distance FROM a reference point. Pattern: A 离 B + 远/近 (far/near) = "A is far/near from B". Unlike English "from", 离 specifically marks SPATIAL DISTANCE, not origin or starting point of motion.',
      'sentence',
      '图书馆离食堂很近。("The library is very close to the cafeteria.")\n清华离北京机场很远。("Tsinghua is very far from Beijing airport.")',
      '离 always pairs with a distance description: 远 (far), 近 (near), 不远 (not far), 不太近 (not too close), or a numeric distance.',
      [
        { target: 'A 离 B 远', note: '"A is far from B"; literal "A from-B far"' },
        { target: 'A 离 B 近', note: '"A is near to B"' },
        { target: 'A 离 B 不远', note: '"A is not far from B" — common polite reassurance to a worried direction-asker' },
      ],
      [ACT.grammarDistance],
    ),
    createContentItem(
      '离 vs 从',
      'lí vs cóng',
      'Two prepositions that English would both translate as "from", but they have COMPLETELY different functions in Mandarin. 离 marks static distance (how far apart). 从 marks the starting point of motion (where you came from / where to start).',
      'sentence',
      '从北京来 ("come FROM Beijing" — origin of motion)\n离北京很近 ("very close to Beijing" — static distance)',
      'Confusing them is a top-five learner error; remember 离 = stationary distance, 从 = motion source.',
      [
        { target: '从 cóng + place + 来/去', note: '"from PLACE come/go"; marks where motion originated' },
        { target: '离 lí + place + 远/近', note: '"from PLACE far/near"; marks static spatial distance' },
        { target: 'WRONG: 从北京很远', note: 'should be 离北京很远; 从 cannot pair with 远/近' },
      ],
      [ACT.grammarDistance],
    ),
    createContentItem(
      '多远? — asking distance',
      'duō yuǎn? — how far?',
      'Ask the distance with 多远? (duō yuǎn?, literally "how far?"). Pattern: A 离 B 多远? = "How far is A from B?". Common answer forms: 很远 (very far), 不远 (not far), or a numeric measure like 五百米 (five hundred meters).',
      'sentence',
      'Q: 图书馆离这里多远? — A: 不远，走路五分钟。',
      '"How far is the library from here?" / "Not far, a five-minute walk." 走路 (zǒulù) = "on foot"; 五分钟 = "five minutes".',
      [
        { target: '多远? duō yuǎn?', note: '"how far?"; uses 多 (duō, "much / how-quantity") + 远 (far)' },
        { target: '走路 X 分钟', note: '"X minutes on foot"; the standard distance estimate for walking' },
        { target: '开车 X 分钟', note: '"X minutes by car"; same pattern for driving' },
      ],
      [ACT.grammarDistance],
    ),
    createContentItem(
      '远 / 近 with 很 / 不',
      'yuǎn / jìn with hěn / bù',
      'Adjectives 远 (far) and 近 (near) need a degree modifier in Mandarin — bare 我家远 sounds incomplete. Use 很 (hěn, "very") as the default, 不 (bù) for negation, 太 (tài, "too") for excessive degree.',
      'sentence',
      '清华离这里很近。("Tsinghua is very close to here.")\n机场离市中心不太远。("The airport is not too far from the city center.")',
      'Bare adjective without 很 sounds like contrast is implied; always include a modifier in normal description.',
      [
        { target: '很远 / 很近', note: 'neutral statement; 很 is the default and means "(more or less) is far/near"' },
        { target: '不远 / 不近', note: '"not far / not near"; uses 不 for negation' },
        { target: '太远了 / 太近了', note: '"too far / too close"; 太…了 marks excess' },
      ],
      [ACT.grammarDistance],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '清华校园介绍',
      'Qīnghuá xiàoyuán jièshào',
      'A complete six-sentence description of Tsinghua\'s central campus area. Read it aloud with correct tones, sandhi, and natural rhythm. Notice the repeated use of 在 + spatial noun for relative position.',
      'sentence',
      '这里是清华大学。大门外面有一个地铁站。从大门进来，前面是教学楼。教学楼旁边是图书馆。图书馆后面有学生宿舍。食堂在宿舍和教学楼中间，走路五分钟就到。',
      'Translation: "This is Tsinghua University. There is a subway station outside the main gate. Coming in from the gate, the classroom building is in front. Next to the classroom building is the library. Behind the library are the student dorms. The cafeteria is between the dorms and the classroom building, a five-minute walk away."',
      [
        { target: '这里是清华大学', note: 'opens with identification using 是 — appropriate because we are saying "this place IS Tsinghua"' },
        { target: '大门外面有一个地铁站', note: 'uses 有 existential pattern; introduces a new thing (subway station) at the place (outside the gate)' },
        { target: '从大门进来 cóng dàmén jìnlái', note: '"coming in from the main gate"; uses 从 (motion source) + 进来 (come in)' },
        { target: '前面是教学楼', note: 'spatial noun + 是 — identification of what is in front' },
        { target: '走路五分钟就到', note: '"a five-minute walk and you arrive"; 就到 is the natural "you arrive (right away)" expression' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '理解问题',
      'lǐjiě wèntí',
      'Four comprehension questions matching the paragraph. Answer each using the 在 / 有 patterns from Grammar I; full sentences are not required, but they help drill the patterns.',
      'sentence',
      'Q1: 大门外面有什么? Q2: 教学楼在哪里? Q3: 图书馆后面是什么? Q4: 从宿舍到食堂走路多久?',
      'Translation: Q1: What is outside the main gate? Q2: Where is the classroom building? Q3: What is behind the library? Q4: How long does it take to walk from the dorm to the cafeteria?',
      [
        { target: 'A1: 大门外面有一个地铁站。', note: 'uses 有 existential pattern as in the source text' },
        { target: 'A2: 教学楼在大门里面，图书馆旁边。', note: 'two spatial nouns chained: inside the gate AND next to the library' },
        { target: 'A3: 图书馆后面是学生宿舍。', note: 'identifies what is behind using 是; same pattern as in the paragraph' },
        { target: 'A4: 走路五分钟。', note: 'short answer dropping the redundant frame; full sentence is also fine' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Listening & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '问路 (对话 — 礼貌)',
      'wènlù (duìhuà — lǐmào)',
      'A natural polite-register direction-asking dialogue between a visiting student and a passerby at Tsinghua. Covers every pattern from this lesson: question with 怎么走, directions with 往 + 拐, distance with 离, and confirmation.',
      'conversation',
      'A: 请问，去图书馆怎么走?\nB: 图书馆啊? 你一直往前走，到了红绿灯往右拐。\nA: 好的，往右拐以后呢?\nB: 拐了以后再走两分钟，图书馆就在你的左边。\nA: 离这里远不远?\nB: 不远，走路大概五分钟。\nA: 太好了，谢谢您!\nB: 不客气。',
      'A typical exchange: question + two-step direction + distance check + thanks. Notice the rhythm 然后/以后 between steps and the casual 不客气 close.',
      [
        { target: '请问 qǐngwèn', note: 'polite opener; required when asking strangers for directions' },
        { target: '一直往前走 yìzhí wǎng qián zǒu', note: 'establishing the long stretch before any turn' },
        { target: '到了 X 往右拐', note: 'turn at a landmark; X is typically a 红绿灯 (traffic light) or 路口 (intersection)' },
        { target: '以后 yǐhòu', note: '"after"; alternative to 然后 — used after a verb to mean "after doing X"' },
        { target: '远不远? yuǎn bu yuǎn?', note: 'A-not-A question form; equivalent to 远吗?; very common in casual conversation' },
        { target: '不客气 bú kèqi', note: '"you\'re welcome"; the standard response to 谢谢' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      '问路 (对话 — 北京口音)',
      'wènlù (duìhuà — Běijīng kǒuyīn)',
      'A second version of the directions dialogue using Beijing colloquial features: 哪儿 instead of 哪里, r-coloring (儿化音) on certain words, and 您 (nín) for extra politeness with an older passerby.',
      'conversation',
      '小学生: 大爷您好，请问咱清华的食堂在哪儿啊?\n大爷: 食堂啊? 多着呢! 你想去哪个食堂?\n小学生: 离这儿最近的就行。\n大爷: 那你往前走一会儿，看见教学楼以后往左拐，紫荆园食堂就在那儿。\n小学生: 谢谢大爷!\n大爷: 嗨，没事儿。',
      'A casual exchange with a friendly older man (大爷, dàye) showing northern Beijing speech: 哪儿, 一会儿, 那儿, 没事儿 — all r-colored.',
      [
        { target: '大爷 dàye', note: 'respectful address for an older man, especially in northern Chinese cities; literally "great-uncle"' },
        { target: '咱 zán', note: 'inclusive "we / us"; Beijing colloquial preference over the standard 我们' },
        { target: '哪儿 nǎr', note: 'Beijing form of 哪里; with retroflex r-coloring' },
        { target: '多着呢 duō zhe ne', note: '"there are many!"; colloquial emphatic; 着 + 呢 intensifies the adjective' },
        { target: '紫荆园 Zǐjīngyuán', note: 'name of one of Tsinghua\'s real cafeterias; literally "Purple Bauhinia Garden"' },
        { target: '没事儿 méi shìr', note: '"no problem"; r-colored Beijing variant of 没事 (méi shì)' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '写作模板',
      'xiězuò múbǎn',
      'A reusable five-sentence template for any short Mandarin direction-giving description. Fill in the bracketed slots with your own details — the structure carries the rest.',
      'sentence',
      '从 [起点] 一直往前走。到了 [地标] 往 [方向] 拐。[目的地] 就在 [参考物] 的 [方位词]。[目的地] 离 [起点] 不远，走路 [分钟数] 分钟。',
      'Translation: "From [start], go straight. When you reach [landmark], turn [direction]. [Destination] is at the [spatial-noun] of [reference]. [Destination] is not far from [start], a [minutes]-minute walk."',
      [
        { target: '[起点]', note: 'your starting point — usually 大门 (main gate) or 这里 (here)' },
        { target: '[地标]', note: 'an intermediate landmark — 红绿灯 / 教学楼 / 食堂 / 桥' },
        { target: '[方向]', note: '前 / 后 / 左 / 右 (front / back / left / right) — pair with 往 + direction + 拐' },
        { target: '[方位词]', note: 'spatial noun — 旁边 / 对面 / 前面 / 后面 / 里面' },
        { target: '[分钟数]', note: 'estimated walking time — 三分钟, 五分钟, 十分钟 are typical campus distances' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '写作练习',
      'xiězuò liànxí',
      'Write your own 3–5 sentence direction description in Hanzi guiding a visitor from Tsinghua\'s main gate to your favorite spot on campus. Use 往 at least twice, 一直 at least once, and one spatial noun so the writing exercises every direction pattern from this lesson.',
      'sentence',
      '示例: 从清华大门一直往前走。到了第一个红绿灯往左拐。再走三分钟你会看到紫荆园食堂。我最喜欢的咖啡馆就在食堂旁边。',
      'Translation: "From Tsinghua\'s main gate, go straight ahead. Turn left at the first traffic light. Walk three more minutes and you will see Zijingyuan Cafeteria. My favorite coffee shop is right next to the cafeteria."',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '中国地址 — 大到小',
      'Zhōngguó dìzhǐ — dà dào xiǎo',
      'Chinese addresses are written from BIGGEST to SMALLEST: province → city → district → street → number → building → unit. This is the exact opposite of US/UK addresses, which go small-to-big. The big-to-small logic mirrors how Chinese speakers think about location.',
      'sentence',
      '北京市 海淀区 清华园街道 清华大学 蒙民伟楼 308室',
      'Translation: Beijing City, Haidian District, Tsinghua Garden Street, Tsinghua University, Meng Minwei Building, Room 308.',
      [
        { target: '北京市', note: 'biggest unit: city (directly administered, equivalent to a province)' },
        { target: '海淀区', note: 'district within the city — Haidian, home to most Beijing universities' },
        { target: '清华园街道', note: 'street / sub-district level — Tsinghua Garden Street' },
        { target: '清华大学', note: 'specific institution / compound name' },
        { target: '蒙民伟楼 308室', note: 'building name + room number; the smallest unit, written LAST' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '北京地标',
      'Běijīng dìbiāo',
      'Beijing locals orient themselves using a small set of iconic landmarks: 天安门 (Tian\'anmen, the symbolic city center), 故宫 (the Forbidden City, just north of Tian\'anmen), and 长城 (the Great Wall, north of the city). Asking "is X near Y?" with one of these as Y is a common direction-asking move.',
      'sentence',
      '清华离天安门有多远? — 大概十五公里，地铁四十分钟。',
      'Translation: "How far is Tsinghua from Tian\'anmen?" — "About 15 kilometers, 40 minutes by subway." Using a city landmark as the reference is the natural way to ask about scale.',
      [
        { target: '天安门 Tiān\'ānmén', note: '"Gate of Heavenly Peace"; the symbolic center of Beijing, used as the 0-kilometer reference point' },
        { target: '故宫 Gùgōng', note: 'Forbidden City; just north of Tian\'anmen' },
        { target: '长城 Chángchéng', note: 'Great Wall; in the mountains north of Beijing — the iconic "remote" reference point' },
        { target: '公里 gōnglǐ', note: '"kilometer"; standard distance unit in Mainland China (米 mǐ for meters)' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '东南西北 vs 左右',
      'dōng nán xī běi vs zuǒ yòu',
      'In northern China (especially Beijing), speakers prefer cardinal directions (东 east, 南 south, 西 west, 北 north) over left/right when giving directions on the street. This stems from Beijing\'s historical grid layout, which is aligned to the cardinal directions. In southern China and on a small campus scale, 左/右 is more common.',
      'sentence',
      '"往北走两个红绿灯，然后往东。" ("Go two traffic lights north, then turn east.")',
      'Hearing 东南西北 from a passerby and knowing how to convert to your phone\'s map (always north-up by default) is a Beijing survival skill.',
      [
        { target: '东 dōng (east) / 西 xī (west)', note: 'left-right axis in Beijing\'s grid; major streets run east-west' },
        { target: '南 nán (south) / 北 běi (north)', note: 'up-down axis in Beijing; second character of 北京 (Northern Capital) and 南京 (Southern Capital)' },
        { target: 'When to use 左右', note: 'small-scale spaces — inside buildings, on a campus, at intersections where the speaker is facing a specific way' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '中国地图应用',
      'Zhōngguó dìtú yìngyòng',
      'Google Maps does not work well in Mainland China due to mapping-data restrictions and the Great Firewall. Locals use 高德地图 (Gāodé Dìtú / Amap) or 百度地图 (Bǎidù Dìtú / Baidu Maps). Both have excellent walking, driving, and public transit directions in Chinese; 高德地图 is generally considered the more accurate one for navigation.',
      'sentence',
      '在中国用高德地图最方便。',
      '"In China, Amap is the most convenient option." 最方便 = "most convenient"; 最 (zuì) is the superlative marker.',
      [
        { target: '高德地图 Gāodé Dìtú', note: 'Amap — the most popular and accurate Chinese mapping app for everyday navigation' },
        { target: '百度地图 Bǎidù Dìtú', note: 'Baidu Maps — second most popular, integrates with Baidu\'s search ecosystem' },
        { target: '导航 dǎoháng', note: '"navigation / GPS guidance"; literally "guide-sailing"; the verb for turn-by-turn directions' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '任务: 在清华大门指路',
      'rènwù: zài Qīnghuá dàmén zhǐlù',
      'Roleplay guiding a visiting student from Tsinghua\'s main gate to the library with the AI tutor playing the visitor. Use every skill from this lesson in one continuous scene — listen, direct, confirm, reassure about distance, close.',
      'conversation',
      '[Tsinghua main gate]\n访客: 你好，请问图书馆在哪里?\n你: [告诉对方方向 + 第一步]\n访客: 一直往前走对吗? 大概多远?\n你: [回答距离 + 第二步:转弯]\n访客: 好的，到了红绿灯往哪边拐?\n你: [告诉左/右 + 描述图书馆位置]\n访客: 离这里远不远? 走路要几分钟?\n你: [回答时间 + 鼓励的话]\n访客: 太感谢了!\n你: [告别]',
      'Six turns of fluent exchange; the AI tutor will prompt you and respond naturally to whatever directions you give.',
      [
        { target: '告诉方向', note: 'use 一直 / 往 + 前/后/左/右 + 走 to establish the first leg' },
        { target: '描述位置', note: 'use 在 + reference + 旁边/前面/对面 spatial noun for the final destination' },
        { target: '回答距离', note: 'use A 离 B + 远/近/不远 or a numeric estimate (五分钟 / 五百米)' },
        { target: '告别', note: '不客气 / 没事儿 — match the politeness register the visitor opened with' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战 — 多目的地指路',
      'tiǎozhàn — duō mùdìdì zhǐlù',
      'Stretch goal: in the same scene, the visitor adds a second destination (the cafeteria) after asking about the library. Chain two direction sequences in one continuous response, using 然后 / 之后 to mark the transition.',
      'conversation',
      '访客: 谢谢! 那食堂呢? 也在那个方向吗?\n你: 食堂离图书馆很近。你从图书馆出来，往右走五十米就到了。\n访客: 太方便了! 那我先去图书馆，然后去食堂吃饭。\n你: 好主意。祝你今天玩得愉快!',
      '"Sounds good. Have a great day!" 玩得愉快 (wán de yúkuài) = "have a great time"; common parting wish to a visitor.',
      [
        { target: '从 X 出来 cóng X chūlái', note: '"come out of X"; uses 从 (motion source) + 出来 (come out)' },
        { target: '往右走五十米 wǎng yòu zǒu wǔshí mǐ', note: '"walk fifty meters to the right"; uses a precise numeric distance' },
        { target: '祝你… zhù nǐ…', note: '"I wish you…"; standard pattern for parting good wishes' },
        { target: '玩得愉快 wán de yúkuài', note: '"have a great time"; literally "play obtain happy"; the 得 marks the result of the action' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
