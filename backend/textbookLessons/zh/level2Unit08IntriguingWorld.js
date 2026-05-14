// Level 2 Unit 8 — 引人入胜的世界 (Intriguing World): Travel & Curiosity (Mandarin)
// Thematic Mandarin lesson on travel, sightseeing, cultural surprises, and
// retelling what one has heard about distant places. Functions: describing
// scenes vividly, layering positive descriptions, repeating travel rumors,
// expressing surprise, recommending a destination to a peer.
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
  orientation: 'zh-l2u8-orientation',
  pronunciation: 'zh-l2u8-pronunciation',
  vocabularyTravel: 'zh-l2u8-vocab-travel',
  vocabularyPlaces: 'zh-l2u8-vocab-places',
  grammarBuqie: 'zh-l2u8-grammar-buqie',
  grammarZheYibian: 'zh-l2u8-grammar-zhe-yibian',
  grammarTingshuo: 'zh-l2u8-grammar-tingshuo',
  reading: 'zh-l2u8-reading',
  listening: 'zh-l2u8-listening',
  writing: 'zh-l2u8-writing',
  culture: 'zh-l2u8-culture',
  task: 'zh-l2u8-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Talk about travel, sightseeing, and culture shock at intermediate length — beyond "I went to X, it was fun" into descriptive paragraphs about scenery, surprises, and local customs.',
      'Layer descriptions with 不但…而且… so a single place can be praised on two axes (not just beautiful, but historically rich; not only ancient, but unexpectedly modern).',
      'Retell travel stories you have not personally experienced using 听说 / 据说 ("I heard / it is said") so you can talk about famous places without overclaiming.',
    ],
    task: 'Picture a coffee break in the lab at 清华大学 (Tsinghua University) — a classmate asks "What is the most intriguing place you\'ve ever been to?" By the end of this lesson you should answer with a 5–6 sentence response: name the place, describe two layered qualities, share one surprise, and end with a tip.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in travel vocabulary',
    goals: [
      'Distinguish 长城 (Chángchéng, "Great Wall") from 长成 (zhǎngchéng, "grow into") — same characters with different tones on 长 change a famous landmark into a verb phrase.',
      'Pronounce 兵马俑 (bīngmǎyǒng, "Terracotta Army") cleanly — three different tones in three syllables (1st + 3rd + 3rd, with sandhi making the middle 马 rise to second tone before 俑).',
      'Apply the heavy fourth-tone fall on 难以置信 (nányǐ zhìxìn, "unbelievable") and the 据说 (jùshuō, "it is said") 4th + 1st pattern that begins almost every Mandarin travel rumor.',
    ],
    task: 'Read each example aloud at conversational speed; the AI tutor will flag any tone slip or sandhi miss.',
  },
  {
    id: ACT.vocabularyTravel,
    section: 'Vocabulary I',
    title: 'Travel modes, sights, and reactions',
    goals: [
      'Distinguish 旅游 (leisure travel) from 旅行 (any journey including business) — Chinese speakers swap them constantly but the connotation differs.',
      'Contrast 自由行 (independent travel) and 跟团游 (group tour) — two halves of the Chinese tourism debate; each carries strong cultural baggage.',
      'Use reaction words 奇怪 (strange), 神奇 (amazing), 有趣 (interesting), 难以置信 (unbelievable), 出乎意料 (unexpected) without flattening them all into "interesting".',
    ],
    task: 'For each of 8 travel-reaction words, say one sentence describing a place where that reaction would fit.',
  },
  {
    id: ACT.vocabularyPlaces,
    section: 'Vocabulary II',
    title: 'Famous places in China and the world',
    goals: [
      'Name 8 famous Chinese destinations (长城, 故宫, 兵马俑, 桂林, 张家界, 西藏, 香港, 台湾) and place each on a rough mental map.',
      'Name 4 world destinations Chinese tourists most often mention (日本, 韩国, 泰国, 欧洲) and pair each with one stereotype reaction.',
    ],
    task: 'Pick three places from each group and describe each in one short sentence using a layered description (不但…而且…).',
  },
  {
    id: ACT.grammarBuqie,
    section: 'Grammar I',
    title: '不但…而且… — layered descriptions',
    goals: [
      'Use 不但 A，而且 B to add a second, often stronger, point about the same subject. A and B can both be positive or both negative, but they should escalate.',
      'Recognize the formal equivalents 不仅 / 不只 (replacing 不但) and 还 / 并且 (replacing 而且) — same logic, slightly different register.',
      'Know that this is the SAME pattern you used at lower levels but now applied at paragraph length: it is the workhorse for travel storytelling.',
    ],
    task: 'Write three sentences each about a different place using 不但…而且…, escalating with each clause.',
  },
  {
    id: ACT.grammarZheYibian,
    section: 'Grammar II',
    title: 'V + 着 and 一边 V — vivid present scenes',
    goals: [
      'Use V + 着 to freeze an action mid-scene: 站着看 ("standing and watching"), 笑着说 ("said with a smile"). Mostly attaches to manner/posture verbs.',
      'Use 一边 V₁，一边 V₂ for two simultaneous actions in the same time slice: 一边走，一边拍照 ("walking and taking photos at the same time").',
      'Know the contrast: V + 着 modifies HOW the main action is done; 一边…一边… presents TWO main actions running in parallel.',
    ],
    task: 'Describe a famous sightseeing scene in two sentences — one with V + 着, one with 一边…一边…',
  },
  {
    id: ACT.grammarTingshuo,
    section: 'Grammar III',
    title: '听说 / 据说 — retelling what you heard',
    goals: [
      'Open a sentence with 听说 ("I heard that…") to retell something you got from a friend or social media, without claiming personal experience.',
      'Use the slightly more formal/written 据说 ("it is said / according to reports") for facts you cannot personally vouch for — news, history, hearsay.',
      'Know that NOT using these markers when you should is a small honesty violation in Chinese conversation; native speakers add them by reflex.',
    ],
    task: 'Pick three famous places you have never visited and say one 听说/据说 sentence about each, taking care to choose the right marker.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'Read a travel reflection',
    goals: [
      'Read a short reflection by a Tsinghua student about visiting 西藏 (Tibet) and answer comprehension questions using 是 / 不是 / 听说 short answers.',
      'Identify each occurrence of the three target patterns (不但…而且…, V + 着, 听说) in the text.',
    ],
    task: 'Read the passage aloud, then answer four comprehension questions in short complete sentences.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'Two classmates compare travel styles',
    goals: [
      'Follow a peer dialogue contrasting 自由行 vs 跟团游 — recognize where each speaker reveals their preference and the reason behind it.',
      'Ask one good follow-up question of your own, modeled on the 你呢? / 那…呢? structure you already know.',
    ],
    task: 'Read the dialogue aloud with the AI tutor, then swap in your own travel preference and reasons.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Write a 6-sentence travel reflection',
    goals: [
      'Write 5–6 sentences in Hanzi about one place that surprised you (or that you want to visit). Use 不但…而且… at least once, V + 着 or 一边…一边… once, and 听说/据说 once.',
      'Close the paragraph with one practical tip a future traveler should know — this is what turns a description into a recommendation.',
    ],
    task: 'Write your own reflection following the template; the AI tutor will mark missing patterns or weak descriptions.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: '黄金周, 跟团游, and the rise of 自由行',
    goals: [
      'Understand 黄金周 ("Golden Week") — the May 1 (劳动节) and October 1 (国庆节) week-long holidays when half a billion Chinese travel simultaneously; iconic crowd photos at 长城 and 故宫 come from these weeks.',
      'Recognize the 跟团游 (group tour) culture — extremely cheap on the surface, often subsidized by mandatory shopping-stop kickbacks; older generations still favor it for the safety net.',
      'Track the rise of 自由行 (independent travel) among younger urban Chinese, the matching boom in 内蒙古 / 西藏 / 新疆 frontier tourism, and the gradual decline of the loud-tour-group-with-bullhorn stereotype Chinese tourists once carried abroad.',
    ],
    task: 'Imagine recommending one Chinese destination to a foreign friend; pick a non-Golden-Week date and explain why timing matters.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'Coffee break at Tsinghua — the most intriguing place',
    goals: [
      'Combine all three target patterns (不但…而且…, V + 着 / 一边…一边…, 听说/据说) into one continuous coffee-break exchange.',
      'End with a concrete tip — best time to visit, what to skip, what to try — so the description becomes a recommendation, not just a description.',
    ],
    task: 'Roleplay a coffee-break conversation at Tsinghua with the AI tutor playing a classmate; aim for a 6-turn exchange in Mandarin.',
  },
];

const lesson = {
  title: 'Level 2 · Unit 8: 引人入胜的世界 — Travel & Curiosity',
  category: 'travel',
  difficulty: 'intermediate',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'describing-scene', label: 'Describing a scene vividly', goal: 'Use V + 着 and 一边…一边… to paint a sightseeing scene as if the listener were standing there with you.' },
    { id: 'layering-praise', label: 'Layering two qualities', goal: 'Use 不但…而且… to add a second, escalating reason a place is worth visiting.' },
    { id: 'retelling-rumor', label: 'Retelling what you heard', goal: 'Use 听说 / 据说 to share travel facts you cannot personally vouch for without overclaiming.' },
    { id: 'recommending-tip', label: 'Giving a practical tip', goal: 'Close any travel description with one concrete tip (best season, what to skip, what to try) so the listener can act on it.' },
  ],
  relatedPools: ['topic-travel', 'topic-culture'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '本课目标',
      'běn kè mùbiāo',
      'By the end of this lesson, you can describe an intriguing place in 5–6 sentences: name it, layer two qualities, share one surprise, retell a rumor responsibly, and end with a tip a peer can act on.',
      'word',
      'Functional language: 描述景点 miáoshù jǐngdiǎn (describe a sight) · 分层评价 fēncéng píngjià (layered praise) · 转述听闻 zhuǎnshù tīngwén (retell hearsay) · 给建议 gěi jiànyì (offer advice)',
      'These four micro-skills are the spine of any intermediate travel conversation in Mandarin — once they\'re automatic, you can stretch them to any destination, not just the ones in this lesson.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      '真实场景',
      'zhēnshí chǎngjǐng',
      'You are at the coffee corner in the lab at 清华大学 (Tsinghua University) and a Chinese classmate asks "你去过最有意思的地方是哪儿？" — a casual, almost ritual question among curious peers. They expect more than "Paris, it was nice"; they want a small story.',
      'word',
      '同学: 你去过最有意思的地方是哪儿？',
      'A standard ice-breaker among Tsinghua students; answering well marks you as a thoughtful traveler rather than a checklist tourist.',
      [
        { target: '最有意思的地方', note: '"the most interesting place"; 有意思 is the everyday word, more colloquial than 有趣' },
        { target: '你去过…吗?', note: 'a closed question; the open form 你去过最有意思的地方是哪儿? invites a paragraph' },
        { target: '哪儿 vs 哪里', note: '哪儿 is the northern/Beijing form, 哪里 is the southern/standard-written form; both are fine in Tsinghua speech' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '回答的形状',
      'huídá de xíngzhuàng',
      'A strong answer has four parts: (1) name the place + one anchor fact, (2) describe two layered qualities with 不但…而且…, (3) one surprise that overturned your expectation, (4) one concrete tip. Skipping any part makes the answer feel either flat (no surprise) or unhelpful (no tip).',
      'word',
      '名字 + 锚定事实 → 不但…而且… → 出乎意料的是… → 我的建议是…',
      'A four-beat answer is what separates an intermediate response from a beginner one — same vocabulary, but better shape.',
      [
        { target: 'Beat 1: name + anchor', note: '"I went to Tibet" → too thin; "I went to Lhasa, sitting at 3650m above sea level" → grounded' },
        { target: 'Beat 2: layered praise', note: 'use 不但…而且…; never use the same axis twice (avoid "beautiful and pretty"; prefer "beautiful AND historically rich")' },
        { target: 'Beat 3: surprise', note: 'use 出乎意料 / 没想到; the most memorable detail is always the one that broke your model' },
        { target: 'Beat 4: tip', note: 'use 我建议 / 别…/ 一定要…; ends the turn as a gift, not a monologue' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '长城',
      'Chángchéng',
      'Two second tones (rising + rising) on this iconic landmark name. The 长 here is chá­ng (long), NOT zhǎng (grow); confusing them changes a wall into a verb. The 城 is chéng (city wall), bringing the meaning to "long wall" = Great Wall.',
      'word',
      '长城 Chángchéng (Great Wall) ≠ 长成 zhǎngchéng (to grow into)',
      'A high-stakes minimal pair: tone slip turns a destination into a sentence fragment.',
      [
        { target: '长 (cháng, 2nd)', note: '"long"; this is the reading in 长城, 长江, 长大' },
        { target: '长 (zhǎng, 3rd)', note: '"to grow"; this is the reading in 长大 when meaning "grow up"' },
        { target: '城 (chéng, 2nd)', note: '"city wall, walled city"; old meaning preserved in place names' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '兵马俑',
      'bīngmǎyǒng',
      'The Terracotta Army at Xi\'an. Three syllables, three different tones: bīng (1st, high level) + mǎ (3rd, dip-and-rise) + yǒng (3rd). When two 3rd tones meet (mǎ + yǒng), sandhi makes the first one rise: spoken as bīng-má-yǒng. Common slip is to drop the sandhi.',
      'word',
      '兵马俑 written: bīngmǎyǒng → spoken: bīng-má-yǒng',
      'The most-mispronounced Chinese landmark name among learners; the sandhi sounds wrong to native ears when missed.',
      [
        { target: '兵 (bīng, 1st)', note: '"soldier"; high level' },
        { target: '马 (mǎ → má, sandhi)', note: '3rd becomes 2nd before another 3rd; same rule as 你好' },
        { target: '俑 (yǒng, 3rd)', note: '"figurine, effigy"; full dip-and-rise at end of phrase' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '难以置信',
      'nányǐ zhìxìn',
      'A four-syllable adverbial phrase: nán (2nd, rise) + yǐ (3rd, dip) + zhì (4th, sharp fall) + xìn (4th, sharp fall). Two heavy 4th tones at the end give it punch. Use as the reaction word at the top of the surprise scale.',
      'word',
      '难以置信！我没想到这么便宜！',
      '"Unbelievable! I didn\'t expect it to be so cheap!" — a frequent traveler reaction in everyday speech and online reviews.',
      [
        { target: '难以 nányǐ', note: '"hard to / difficult to"; bookish, often pairs with abstract verbs' },
        { target: '置信 zhìxìn', note: '"to believe"; bookish; almost only appears in this fixed expression' },
        { target: 'register', note: 'slightly literary; 不可思议 (bùkě sīyì) and 太神奇了 (tài shénqí le) are casual equivalents' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '据说',
      'jùshuō',
      'The narrative connector "it is said / according to reports". Pronounced jù (4th, sharp fall) + shuō (1st, high level). The drop-then-rise pattern is what makes the phrase signal "incoming hearsay" — listeners hear the contour and brace for an unverified claim.',
      'word',
      '据说西藏的海拔超过3000米。',
      '"It is said Tibet\'s altitude exceeds 3000m." — a typical retelling sentence; speaker doesn\'t need to have measured it.',
      [
        { target: '据 (jù, 4th)', note: '"according to"; bookish particle' },
        { target: '说 (shuō, 1st)', note: '"to say"; the verb root' },
        { target: 'register', note: 'slightly more formal than 听说 (tīngshuō); preferred in writing and news' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '故宫',
      'Gùgōng',
      'The Forbidden City in Beijing. Two consecutive 4th + 1st tones: gù (sharp fall) + gōng (high level). The fall-then-flat rhythm is steady, dignified — fitting for the imperial palace. Avoid softening the 4th-tone gù into a 3rd.',
      'word',
      '故宫 Gùgōng — the former imperial palace, now the Palace Museum',
      'One of the most-visited museums on Earth; about 14 million visitors a year, mostly during Golden Week.',
      null,
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Travel verbs, modes, reactions
    // ────────────────────────────────────────────────────────────────────
    createContentItem('旅游', 'lǚyóu', 'Leisure travel — going somewhere for fun, sightseeing, or vacation. Contrasts with 旅行 which can include business or any journey. 旅游 implies tourism and recreation, never duty.', 'word', '我去年去日本旅游了。', '"I went to Japan for travel last year." — leisure context, never business.', null, [ACT.vocabularyTravel]),
    createContentItem('旅行', 'lǚxíng', 'A journey of any kind — leisure, business, or long-distance. More neutral and slightly more literary than 旅游. Use this for "travel" in titles, agencies (旅行社), and abstract discussions. In daily speech, 旅游 is more common for vacation.', 'word', '出差也算一种旅行。', '"A business trip also counts as a kind of travel." — shows the broader scope.', null, [ACT.vocabularyTravel]),
    createContentItem('自由行', 'zìyóuxíng', 'Independent travel — booking your own flights, hotels, and itinerary. The opposite of 跟团游. Has become the default for educated urban Chinese in their 20s–40s; signals adventure, individual taste, and English-comfort.', 'word', '现在年轻人都喜欢自由行。', '"Young people these days all prefer independent travel." — a frequent observation in tourism articles.', null, [ACT.vocabularyTravel]),
    createContentItem('跟团游', 'gēntuányóu', 'Group tour — booking through an agency that bundles flights, hotels, meals, and a guide. Cheap on paper, often subsidized by mandatory shopping stops (the industry\'s open secret). Still favored by older travelers for the safety and the company.', 'word', '我爸妈喜欢跟团游，省心。', '"My parents like group tours — less to worry about." — generational marker; the 省心 ("easy on the mind") justification is canonical.', null, [ACT.vocabularyTravel]),
    createContentItem('景点', 'jǐngdiǎn', 'A sightseeing spot — any place worth visiting for its view, history, or fame. The umbrella word that covers everything from a viewpoint to a temple to a UNESCO site. Use this when you don\'t want to specify 古迹 vs 名胜.', 'word', '北京有很多有名的景点。', '"Beijing has many famous sightseeing spots." — the generic frame.', null, [ACT.vocabularyTravel]),
    createContentItem('古迹', 'gǔjì', 'A historical site — ruins, ancient buildings, archaeological remains. Implies age and historical weight; you wouldn\'t use this for a modern skyscraper. The Great Wall and the Forbidden City are 古迹; the Bund in Shanghai is borderline.', 'word', '兵马俑是世界著名的古迹。', '"The Terracotta Army is a world-famous historical site." — typical use of 古迹 with a major heritage destination.', null, [ACT.vocabularyTravel]),
    createContentItem('风景', 'fēngjǐng', 'Scenery — the natural view in front of you. Trees, mountains, rivers, sky. Use for natural landscapes; for urban skylines use 城市景观 (chéngshì jǐngguān). Often paired with 漂亮 / 美丽 / 壮观.', 'word', '桂林的风景真美。', '"Guilin\'s scenery is truly beautiful." — the iconic phrase Chinese tourists use about karst landscapes.', null, [ACT.vocabularyTravel]),
    createContentItem('名胜', 'míngshèng', 'A famous attraction — a place renowned for its scenery or history. Often appears in the compound 名胜古迹 (famous scenic and historical sites), the catch-all phrase for tourism marketing in Chinese.', 'word', '中国的名胜古迹数不清。', '"China\'s famous scenic and historical sites are countless." — a guidebook trope.', null, [ACT.vocabularyTravel]),
    createContentItem('当地', 'dāngdì', '"Local" — of the place you are currently in or talking about. Use as an attributive: 当地人 (locals), 当地菜 (local food), 当地风俗 (local customs). Contrasts with 外地 (out-of-town) and 本地 (home-base, used from a stationary perspective).', 'word', '一定要尝当地的小吃。', '"You must try the local street food." — a standard travel tip framing.', null, [ACT.vocabularyTravel]),
    createContentItem('文化差异', 'wénhuà chāyì', 'Cultural difference — the noun phrase covering ways customs, expectations, or values diverge across places. The polite, analytical word for what causes culture shock. Pairs naturally with 体验 (experience) and 适应 (adapt).', 'word', '出国旅游能感受到文化差异。', '"Travelling abroad lets you feel cultural differences." — a common observation in essays and conversations.', null, [ACT.vocabularyTravel]),
    createContentItem('体验', 'tǐyàn', 'To experience firsthand — both verb and noun. Implies active immersion, not just looking. Use for trying local food, joining a tea ceremony, sleeping in a yurt — anything that engages you, not just observes from outside.', 'word', '我体验了藏族的酥油茶。', '"I tried (experienced) Tibetan butter tea." — emphasizes active participation.', null, [ACT.vocabularyTravel]),
    createContentItem('探索', 'tànsuǒ', 'To explore — venture into the unknown, whether literal places or ideas. More adventurous than 旅游; implies curiosity and discovery. Use sparingly so it keeps its weight; if every alley is "explored", the word loses force.', 'word', '我想去新疆探索那里的文化。', '"I want to explore the culture in Xinjiang." — explorer framing, not tourist framing.', null, [ACT.vocabularyTravel]),
    createContentItem('奇怪', 'qíguài', 'Strange — registers something as not matching your model of normal. Neutral to mildly negative; use carefully when describing other cultures, because 奇怪 can sound dismissive. Safer paired with 但是…很有意思 to soften.', 'word', '当地的早餐有点奇怪，但是很好吃。', '"The local breakfast is a bit strange, but tasty." — note the softening 但是…好吃 pattern.', null, [ACT.vocabularyTravel]),
    createContentItem('神奇', 'shénqí', 'Amazing in a mystical, almost magical way. Stronger than 有意思, warmer than 奇怪. Use for landscapes that look unreal, ancient sites that feel haunted by history, traditions that seem to defy modern logic.', 'word', '张家界的山真神奇。', '"Zhangjiajie\'s mountains are truly amazing." — the floating-stone-pillar landscape that inspired Avatar\'s Pandora; 神奇 fits perfectly.', null, [ACT.vocabularyTravel]),
    createContentItem('有趣', 'yǒuqù', 'Interesting / amusing. Slightly more polished than 有意思 (the colloquial daily equivalent). Both work for the same meaning; 有趣 sounds a touch more thoughtful and is preferred in writing.', 'word', '这是一个非常有趣的故事。', '"This is a very interesting story." — formal-leaning register; 有意思 would be more spoken.', null, [ACT.vocabularyTravel]),
    createContentItem('难以置信', 'nányǐ zhìxìn', 'Unbelievable — at the top of the surprise scale. A literary-flavored phrase used both in earnest reactions and in online hyperbole. The casual equivalent is 太神奇了 or 不可思议; use 难以置信 when you want a touch of formality.', 'word', '价格真是难以置信地便宜。', '"The price was unbelievably cheap." — common in product reviews and travel blogs.', null, [ACT.vocabularyTravel]),
    createContentItem('出乎意料', 'chūhū yìliào', 'Unexpected / out of one\'s expectations. The neutral surprise word: doesn\'t specify good or bad, just that the reality did not match the model. Use 出乎意料的是… ("what was unexpected was…") to lead into the surprise sentence in a story.', 'word', '出乎意料的是，那里的人都会说英语。', '"Surprisingly, the people there all spoke English." — story-pivot phrasing.', null, [ACT.vocabularyTravel]),
    createContentItem('印象深刻', 'yìnxiàng shēnkè', 'Deeply impressed — the standard phrase for "X left a strong impression on me". Used both for positive and negative impressions; tone comes from surrounding adjectives. Pairs naturally with 让我 (made me) + 印象深刻.', 'word', '那次旅行让我印象深刻。', '"That trip left a deep impression on me." — a textbook closing line for a travel anecdote.', null, [ACT.vocabularyTravel]),
    createContentItem('风俗', 'fēngsú', 'Customs — the traditional habits of a place, often around food, festivals, weddings, funerals. Older and more rooted than 习惯 (habits). Use 当地风俗 for local customs you noticed as a traveler.', 'word', '我尊重当地的风俗。', '"I respect the local customs." — the appropriate respectful framing.', null, [ACT.vocabularyTravel]),
    createContentItem('海拔', 'hǎibá', 'Altitude / elevation above sea level. Critical vocabulary for any conversation about 西藏 (Tibet) or 云南 (Yunnan) — both high-altitude regions where 高原反应 (altitude sickness) is a real concern.', 'word', '拉萨的海拔有3650米。', '"Lhasa\'s altitude is 3650m." — the iconic Tibet altitude fact every Chinese tourist knows.', null, [ACT.vocabularyTravel]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: Famous places (China + world)
    // ────────────────────────────────────────────────────────────────────
    createContentItem('长城', 'Chángchéng', 'The Great Wall — China\'s most iconic monument, stretching across the northern frontier. Most-visited section is 八达岭 (Badaling) near Beijing; the wilder 慕田峪 (Mutianyu) and 司马台 (Simatai) sections are favored by independent travelers.', 'word', '不到长城非好汉。', '"You\'re not a true hero until you reach the Great Wall." — Mao\'s famous line, now an inescapable tourism slogan.', null, [ACT.vocabularyPlaces]),
    createContentItem('故宫', 'Gùgōng', 'The Forbidden City / Palace Museum in Beijing. The imperial palace of the Ming and Qing dynasties; 600 years old, 9000+ rooms. Now the most-visited museum on Earth; expect crowds even on a normal weekday.', 'word', '故宫的门票要提前买。', '"You need to buy Forbidden City tickets in advance." — a standard practical tip.', null, [ACT.vocabularyPlaces]),
    createContentItem('兵马俑', 'Bīngmǎyǒng', 'The Terracotta Army at Xi\'an — 8000+ life-size clay soldiers buried with Emperor Qin Shi Huang around 210 BCE. Discovered by farmers digging a well in 1974. Goes hand in hand with 西安 (Xi\'an) as a Silk Road starting point.', 'word', '兵马俑是1974年被农民发现的。', '"The Terracotta Army was discovered by farmers in 1974." — the canonical fact every guide mentions.', null, [ACT.vocabularyPlaces]),
    createContentItem('桂林', 'Guìlín', 'Guilin in Guangxi — famous for its karst peaks rising vertically out of the Li River. The phrase 桂林山水甲天下 ("Guilin\'s landscape is the finest under heaven") is on every souvenir. Boat rides from Guilin to Yangshuo are the iconic activity.', 'word', '桂林山水甲天下。', '"Guilin\'s landscape is the finest under heaven." — a Song-dynasty line that became the city\'s permanent slogan.', null, [ACT.vocabularyPlaces]),
    createContentItem('张家界', 'Zhāngjiājiè', 'Zhangjiajie in Hunan — the sandstone-pillar landscape that inspired the floating mountains of Pandora in Avatar (2009). Famous for the world\'s longest glass bridge and the Tianmen Mountain cable car. Recent boom destination for Chinese 自由行 travelers.', 'word', '张家界的玻璃桥很刺激。', '"Zhangjiajie\'s glass bridge is thrilling." — 刺激 (cìjī) is the standard word for "exciting / a rush".', null, [ACT.vocabularyPlaces]),
    createContentItem('西藏', 'Xīzàng', 'Tibet — high-altitude autonomous region; capital 拉萨 (Lhasa, 3650m). Requires special permits for foreign travelers. Iconic for the Potala Palace, Jokhang Temple, and the route up to Everest Base Camp. Frontier-tourism category.', 'word', '去西藏要注意高原反应。', '"Watch out for altitude sickness when going to Tibet." — the safety warning every guide gives.', null, [ACT.vocabularyPlaces]),
    createContentItem('香港', 'Xiānggǎng', 'Hong Kong — Special Administrative Region; skyline + dim sum + Victoria Peak. After 1997 handover still distinct from the Mainland in currency (HKD), language (Cantonese primary), and traffic side (left). Easy weekend trip for Mainland Chinese.', 'word', '香港的夜景特别美。', '"Hong Kong\'s night view is particularly beautiful." — the Victoria Peak / Star Ferry framing.', null, [ACT.vocabularyPlaces]),
    createContentItem('台湾', 'Táiwān', 'Taiwan — politically a sensitive topic; touristically a popular destination known for night markets (夜市), bubble tea (珍珠奶茶), and Mandarin spoken with a softer southern accent. Visited freely by Mainland tourists via 自由行 permit until political tensions tightened access.', 'word', '台湾的夜市很有名。', '"Taiwan\'s night markets are famous." — 士林夜市 (Shilin Night Market) in Taipei is the icon.', null, [ACT.vocabularyPlaces]),
    createContentItem('日本', 'Rìběn', 'Japan — the #1 outbound destination for Chinese tourists. The combination of geographic proximity, visa convenience, cherry blossoms (樱花), and quality shopping makes it the default first-overseas-trip choice. 京都 (Kyoto) and 东京 (Tokyo) are the most common itineraries.', 'word', '春天去日本看樱花。', '"Go to Japan in spring to see cherry blossoms." — the seasonal-tourism cliché.', null, [ACT.vocabularyPlaces]),
    createContentItem('韩国', 'Hánguó', 'South Korea — close, affordable, and culturally familiar to Chinese tourists via K-dramas and K-pop. 首尔 (Seoul) shopping and 济州岛 (Jeju Island) scenery are the typical draws. Tensions over THAAD and tour-restrictions in the late 2010s temporarily froze the market.', 'word', '听说韩国的整容技术很好。', '"I hear Korea\'s cosmetic surgery is very advanced." — a common (and slightly stereotyped) talking point among Chinese tourists.', null, [ACT.vocabularyPlaces]),
    createContentItem('泰国', 'Tàiguó', 'Thailand — the most popular Southeast Asian destination for Chinese tourists. 曼谷 (Bangkok), 普吉岛 (Phuket), and 清迈 (Chiang Mai) are the canonical three. Famous for cheap beach holidays, Buddhist temples, and the gentler climate compared to Chinese winters.', 'word', '冬天很多中国人去泰国度假。', '"Many Chinese go to Thailand for winter vacation." — the snowbird migration pattern.', null, [ACT.vocabularyPlaces]),
    createContentItem('欧洲', 'Ōuzhōu', 'Europe — usually meaning a multi-country tour: France-Italy-Switzerland-Germany is the canonical "first Europe trip" package. Often booked as a 跟团游 because of language and visa logistics. 巴黎 (Paris) is the single most-mentioned European city among Chinese tourists.', 'word', '我去过欧洲，主要是法国和意大利。', '"I\'ve been to Europe, mainly France and Italy." — typical scope reply.', null, [ACT.vocabularyPlaces]),
    createContentItem('内蒙古', 'Nèiměnggǔ', 'Inner Mongolia — autonomous region with vast grasslands (草原), yurts (蒙古包), horseback riding, and 那达慕 (Naadam) festival. Frontier-tourism boom destination; summer is the season because the winter is brutally cold.', 'word', '夏天去内蒙古骑马最好。', '"Summer is the best time to ride horses in Inner Mongolia." — a typical recommendation.', null, [ACT.vocabularyPlaces]),
    createContentItem('新疆', 'Xīnjiāng', 'Xinjiang — the vast northwestern region; 乌鲁木齐 (Urumqi) is the capital. 喀纳斯 (Kanas) lake, 天山 (Tianshan) mountains, and 葡萄 (grapes) from Turpan are the tourism icons. Travel can require additional permits depending on the area.', 'word', '新疆的葡萄又甜又便宜。', '"Xinjiang\'s grapes are both sweet and cheap." — the 又…又… layered praise pattern in action.', null, [ACT.vocabularyPlaces]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar I: 不但…而且…
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '不但…而且…',
      'búdàn… érqiě…',
      'The workhorse layered-description pattern: "not only A but also B". Use to escalate — B should be stronger, more surprising, or on a different axis than A. Both clauses share a subject (placed before 不但 or after, but the position changes nuance).',
      'sentence',
      '桂林不但风景美，而且物价也便宜。',
      '"Guilin not only has beautiful scenery, but the prices are also cheap." — two different axes (beauty + affordability), which is what makes the pattern feel earned.',
      [
        { target: '不但 A, 而且 B', note: 'both clauses are statements about the same subject; B escalates A' },
        { target: 'shared subject before 不但', note: 'subject first, then 不但…而且…; the default and most natural order' },
        { target: '不但 + different subject in clause B', note: 'allowed when the SECOND subject is introduced; e.g., 不但景点免费，而且地铁也很便宜' },
        { target: 'register', note: 'neutral to slightly formal; works in speech, essays, and presentations' },
      ],
      [ACT.grammarBuqie],
    ),
    createContentItem(
      '不仅…还/也…',
      'bùjǐn… hái/yě…',
      'The slightly more formal sibling of 不但…而且…. Same logic, different register: 不仅 replaces 不但, 还 or 也 replaces 而且. Preferred in writing, news, and presentations; both forms are correct in speech but 不仅 sounds a touch more polished.',
      'sentence',
      '兵马俑不仅是中国的国宝，还是世界文化遗产。',
      '"The Terracotta Army is not only China\'s national treasure, but also a World Cultural Heritage site." — register-matched to the museum-display tone.',
      [
        { target: '不仅 = 不但', note: 'fully interchangeable; choose 不仅 for written/formal' },
        { target: '还 / 也 = 而且', note: 'still pairs with the second clause; 还 emphasizes addition, 也 emphasizes parallel' },
        { target: 'avoid mixing', note: 'pick one register per sentence; 不但…还… sounds slightly off, prefer 不但…而且… or 不仅…还…' },
      ],
      [ACT.grammarBuqie],
    ),
    createContentItem(
      'Layered praise — wrong axis',
      'wrong axis = flat praise',
      'CRITICAL: layered praise must use TWO DIFFERENT axes. Saying "this place is not only beautiful but also pretty" is flat — both clauses are on the same axis (visual beauty). A strong layered description picks two unrelated axes: beauty + history, food + price, scenery + accessibility, depth + breadth.',
      'sentence',
      'WEAK: 这里不但漂亮，而且美。\nSTRONG: 这里不但风景漂亮，而且历史悠久。',
      'Common learner mistake — using two near-synonyms in the two slots. The pattern is wasted unless the second clause moves to a new axis.',
      [
        { target: 'weak: same axis', note: '漂亮 / 美 / 好看 / 美丽 are all visual beauty; pick only one' },
        { target: 'strong: different axes', note: 'pair visual + historical, sensory + practical, etc.' },
        { target: 'axis choices', note: 'beauty · history · food · price · culture · accessibility · weather · people' },
      ],
      [ACT.grammarBuqie],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar II: V + 着 / 一边…一边…
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'V + 着',
      'V + zhe (continuous/manner)',
      'Attach 着 (zhe, neutral tone) to a verb to freeze it as ongoing state or manner of another action. Two flavors: (1) state — 门开着 ("the door is open"); (2) manner — 笑着说 ("said with a smile"). The state-flavor verb is typically posture/position; the manner-flavor is typically action.',
      'sentence',
      '我站着看了半个小时长城。',
      '"I stood and watched the Great Wall for half an hour." — the standing isn\'t the main action; watching is. 站着 modifies HOW the watching happened.',
      [
        { target: 'state V + 着', note: '站着 (standing), 坐着 (sitting), 躺着 (lying), 开着 (open/on); attaches to posture or position verbs' },
        { target: 'manner V + 着', note: '笑着 (smiling), 看着 (looking at), 拿着 (holding); modifies the main verb that follows' },
        { target: 'V₁着 + V₂ pattern', note: 'V₁着 is the manner; V₂ is the main action. The main meaning lives in V₂.' },
        { target: 'register', note: 'extremely common in narrative writing; gives scenes a vivid, present-tense feel even in past stories' },
      ],
      [ACT.grammarZheYibian],
    ),
    createContentItem(
      '一边…一边…',
      'yībiān… yībiān…',
      'Two simultaneous main actions in the same time slice: 一边 V₁，一边 V₂. Unlike V + 着 which subordinates one action to another, 一边…一边… treats both verbs as equally weighted. The two actions share a subject.',
      'sentence',
      '我一边走，一边拍照。',
      '"I walked and took photos at the same time." — both walking and photographing are equally active main actions.',
      [
        { target: '一边 V₁，一边 V₂', note: 'shared subject; both verbs are at the same level' },
        { target: 'contrast with V着 V', note: 'V着 V backgrounds V₁; 一边…一边… treats both as foreground' },
        { target: '两个动作要同时进行', note: 'the two actions must overlap in time; you can\'t use this for sequential actions' },
        { target: 'casual variant 边…边…', note: '边走边拍 ("walking and photographing"); shorter, more colloquial' },
      ],
      [ACT.grammarZheYibian],
    ),
    createContentItem(
      'V着 vs 一边 V — choosing',
      'V + zhe vs yībiān V',
      'CRITICAL: V + 着 modifies HOW the main verb is done (笑着说 — said WHILE smiling); 一边…一边… presents TWO main verbs running together (一边走一边拍 — walking AND photographing as equal main acts). Picking the wrong one shifts the emphasis.',
      'sentence',
      '笑着说: smiling is the manner; saying is the main act.\n一边笑一边说: laughing and speaking are equally weighted.',
      'A subtle but important distinction; native speakers feel the difference immediately even if they can\'t articulate the rule.',
      [
        { target: 'V着 V: V₁ is manner of V₂', note: '笑着说 — saying is foreground, smiling is background manner' },
        { target: '一边 V₁ 一边 V₂: both foreground', note: '一边笑一边说 — laughing and saying are co-equal events' },
        { target: 'rule of thumb', note: 'if you can drop V₁ without losing the main idea, use V₁着 V₂; if both must stay, use 一边…一边…' },
      ],
      [ACT.grammarZheYibian],
    ),
    createContentItem(
      'V着 in scene-setting',
      'V + zhe in narrative scenes',
      'V + 着 is the secret weapon of vivid Chinese travel writing. Strings of state-V着 sentences let you paint a scene as if the listener were standing inside it: 太阳照着，鸟叫着，孩子跑着 ("the sun shining, birds calling, children running"). Each clause is a freeze-frame.',
      'sentence',
      '在桂林，山立着，水流着，船慢慢开着。',
      '"In Guilin, mountains stand, water flows, boats slowly move." — three V + 着 clauses paint the scene without a main action; the reader becomes the implicit observer.',
      null,
      [ACT.grammarZheYibian],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar III: 听说 / 据说
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '听说',
      'tīngshuō — "I heard that…"',
      'Open a sentence with 听说 when retelling something you heard from a friend, social media, or general buzz — you don\'t personally vouch for it. The pattern is 听说 + clause; no special verb form on the clause. Skipping 听说 when you should use it sounds like overclaiming.',
      'sentence',
      '听说张家界的玻璃桥很可怕。',
      '"I hear Zhangjiajie\'s glass bridge is scary." — neutral retelling; the speaker hasn\'t been on it.',
      [
        { target: '听说 + clause', note: 'opens the sentence; no comma needed in spoken Chinese, optional in writing' },
        { target: 'register', note: 'colloquial-neutral; works in any everyday conversation' },
        { target: 'epistemic role', note: 'flags hearsay; protects you from being accused of false claims if the retold fact is wrong' },
      ],
      [ACT.grammarTingshuo],
    ),
    createContentItem(
      '据说',
      'jùshuō — "it is said / according to reports"',
      'The slightly more formal sibling of 听说. Use for facts you cannot personally vouch for — news, historical claims, statistics, popular rumors. More common in writing and news; in speech it carries a slight whiff of the news anchor.',
      'sentence',
      '据说每年有上千万人游览长城。',
      '"It is said tens of millions visit the Great Wall each year." — a statistical claim sourced from somewhere the speaker can\'t name; 据说 is the perfect hedge.',
      [
        { target: '据说 + clause', note: 'same syntactic position as 听说' },
        { target: 'register', note: 'slightly formal/written; preferred in essays, news, presentations' },
        { target: '听说 vs 据说', note: '听说 sources hearsay through specific channels (friends, social media); 据说 sources it through impersonal channels (reports, history, common knowledge)' },
      ],
      [ACT.grammarTingshuo],
    ),
    createContentItem(
      '听说 vs 据说 — choosing',
      'choosing tīngshuō vs jùshuō',
      'CRITICAL: if your source is a specific person or recent social-media post, prefer 听说. If your source is "everyone knows" / "the news says" / "history records", prefer 据说. Wrong choice does not break grammar but sounds slightly off — like saying "rumor has it" when "according to the BBC" was meant.',
      'sentence',
      '听说我朋友去过西藏。(specific friend source) vs 据说西藏的海拔超过3000米。(general known fact)',
      'Match the marker to the source type and you\'ll sound naturally cautious; mismatch and you\'ll sound either overconfident or unnecessarily formal.',
      [
        { target: '听说: specific source', note: 'friend, classmate, social media, a recent conversation' },
        { target: '据说: impersonal/general source', note: 'news, history, common knowledge, statistics' },
        { target: 'safe default', note: 'when in doubt, 听说 — slightly under-formal sounds humble; slightly over-formal sounds pretentious' },
      ],
      [ACT.grammarTingshuo],
    ),
    createContentItem(
      '据说 + 听说 stacking',
      'stacking hearsay markers',
      'You CAN stack: 听说 + 据说 + clause is legal but redundant. Native speakers usually pick one. Use both ONLY when you want to emphasize that even your direct informant was just relaying hearsay — "I heard that according to reports…".',
      'sentence',
      '我同学说，据说西藏的天空特别蓝。(better) vs 听说据说西藏的天空特别蓝。(legal but clunky)',
      'A stylistic note rather than a grammar rule; tighten your hearsay markers to one per sentence in normal speech.',
      null,
      [ACT.grammarTingshuo],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '我的西藏之旅',
      'wǒ de Xīzàng zhī lǚ',
      'A short reflection by a Tsinghua student on a trip to Tibet. The passage uses all three target patterns: 不但…而且…, V + 着, and 听说. Read it aloud once, then identify each pattern in turn.',
      'sentence',
      '去年暑假，我和两个清华的同学一起去了西藏。我们坐了48小时的火车，一边欣赏窗外的风景，一边聊天，慢慢地适应着海拔的变化。\n到了拉萨，我真的没想到——这个地方不但风景美，而且文化也特别独特。布达拉宫白白红红地立着，藏族人转着经轮，孩子们笑着跑过来跟我们打招呼。听说每年有很多人因为高原反应身体不舒服，所以我们提前一周开始吃药，结果一切都很顺利。\n出乎意料的是，当地的酥油茶我一开始觉得有点奇怪，后来越喝越喜欢。这次旅行让我印象深刻，难以置信地美。我建议你一定要去一次西藏——不过别在十一去，人太多。',
      '"Last summer vacation, I went to Tibet with two Tsinghua classmates. We took a 48-hour train, enjoying the scenery out the window and chatting at the same time, slowly adjusting to the altitude change. Once we got to Lhasa, I really didn\'t expect it — this place not only has beautiful scenery but also a uniquely distinctive culture. The Potala Palace stood there white and red, Tibetans turned their prayer wheels, children came running up smiling to greet us. I heard that every year many people get sick from altitude, so we started taking medicine a week in advance — turned out fine. Unexpectedly, the local butter tea seemed strange to me at first but I grew to love it. The trip left me deeply impressed, unbelievably beautiful. I recommend you go to Tibet once — but not during October 1st Golden Week, too many people."',
      [
        { target: '一边…一边… 聊天', note: 'simultaneous actions on the train; both enjoying-view and chatting are foregrounded' },
        { target: '不但风景美，而且文化也特别独特', note: 'layered praise on two different axes: visual + cultural' },
        { target: '白白红红地立着', note: 'V + 着 for static scene-setting; 立 (lì) is the posture verb "stand"' },
        { target: '转着经轮 / 笑着跑过来', note: 'V + 着 in manner — turning prayer wheels while doing the broader scene, running while smiling' },
        { target: '听说每年有很多人…', note: '听说 for hearsay about altitude sickness; the speaker didn\'t experience it but heard about it' },
        { target: '出乎意料的是…', note: 'standard story-pivot phrase before the surprise detail' },
        { target: '别在十一去', note: 'practical tip at the end; 十一 = National Day Golden Week, the worst time to visit any famous Chinese site' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '阅读问题',
      'yuèdú wèntí',
      'Four comprehension questions matching the reflection. Answer each in a short sentence; full sentences are appreciated but short answers also work in natural Mandarin.',
      'sentence',
      'Q1: 作者跟谁一起去西藏？\nQ2: 作者觉得西藏怎么样？\nQ3: 关于高原反应，作者听说了什么？\nQ4: 作者最后给的建议是什么？',
      'Pattern-spotting practice: each question targets one of the three target patterns plus the final tip beat.',
      [
        { target: 'A1: 作者跟两个清华的同学一起去。', note: 'identifies the travel companions; tests basic comprehension' },
        { target: 'A2: 不但风景美，而且文化也独特。', note: 'tests recognition of 不但…而且…' },
        { target: 'A3: 听说很多人因为高原反应身体不舒服。', note: 'tests recognition of 听说 hearsay marker' },
        { target: 'A4: 一定要去，但别在十一去。', note: 'identifies the practical tip at the end of the reflection' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Listening & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '自由行还是跟团游?',
      'zìyóuxíng háishi gēntuányóu?',
      'A casual dialogue between two Tsinghua classmates at the coffee corner debating the merits of independent travel vs group tours. Notice the give-and-take rhythm: each speaker gives a reason, then asks for the other\'s view.',
      'conversation',
      '小李: 这次寒假你打算去哪儿玩？\n小张: 我想去日本，自由行。\n小李: 自由行？我爸妈一定会反对。他们觉得跟团游又便宜又省心。\n小张: 跟团游不但贵的购物点多，而且自由时间太少。我想一边走一边拍照，慢慢逛。\n小李: 也对。听说现在年轻人都喜欢自由行了。\n小张: 据说这几年自由行的中国游客已经超过跟团游了。你呢？\n小李: 我想去张家界看看，听说玻璃桥特别刺激。\n小张: 那你一个人去吗？\n小李: 不，我打算跟同学一起。又便宜又有人陪。',
      '"Xiao Li: Where are you planning to go this winter break? Xiao Zhang: Japan, independent travel. Xiao Li: Independent? My parents would definitely object — they think group tours are cheap AND easy. Xiao Zhang: Group tours not only have lots of expensive shopping stops, they leave way too little free time. I want to walk and take photos and stroll slowly. Xiao Li: Fair enough. I hear young people all prefer independent travel now. Xiao Zhang: It\'s said the number of independent-travel Chinese tourists has already passed group-tour numbers. You? Xiao Li: I want to check out Zhangjiajie — I hear the glass bridge is really thrilling. Xiao Zhang: Going alone? Xiao Li: No, with classmates. Cheap AND with company."',
      [
        { target: '又便宜又省心', note: '又 A 又 B is a lower-level layered pattern; here paired naturally with the 不但…而且… on the other side of the debate' },
        { target: '不但购物点多，而且自由时间太少', note: 'layered criticism on two axes: cost (shopping stops) + time (free time)' },
        { target: '一边走一边拍照', note: 'simultaneous actions; the visual goal of independent travel' },
        { target: '听说…年轻人都喜欢自由行', note: 'hearsay about a generational trend; standard 听说 use' },
        { target: '据说…已经超过跟团游', note: 'hearsay about a statistical fact; 据说 is the right pick here (impersonal/news source)' },
        { target: '你呢? / 那你…呢?', note: 'the return-the-question phrases you already know; central to peer dialogue rhythm' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      '听后讨论',
      'tīng hòu tǎolùn',
      'After the dialogue, the AI tutor asks you two follow-up questions to push you from passive listener into active conversational partner. Answer each in 2–3 sentences using the target patterns where natural.',
      'sentence',
      'Q1: 你更喜欢自由行还是跟团游？为什么？\nQ2: 你听说过张家界吗？你想去吗？',
      'A good answer to Q1 uses 不但…而且… for the reasoning; a good answer to Q2 uses 听说 for the hearsay element.',
      [
        { target: 'A1 example: 我更喜欢自由行，不但时间灵活，而且能体验当地文化。', note: 'layered reasoning on two axes: flexibility + cultural immersion' },
        { target: 'A2 example: 听说张家界的山很神奇。我想去，不过出乎意料的人这么多。', note: 'opens with 听说; closes with a small surprise about crowds' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '写作模板',
      'xiězuò múbǎn',
      'A reusable 5–6 sentence template for any travel reflection in Mandarin. Each slot maps to one of the four-beat structure from Activity 1; the bracketed slots are yours to fill.',
      'sentence',
      '[去年/上次] 我去了 [地名]。\n[地名] 不但 [质量 A]，而且 [质量 B]。\n[场景描述：V 着 / 一边…一边…]\n听说/据说 [关于这个地方的事实]。\n出乎意料的是，[一个惊喜]。\n我建议 [一个实用的小贴士]。',
      'Six lines cover the canonical shape: when + where, layered praise, vivid scene, hearsay fact, surprise, tip. Drop any one and the response feels incomplete.',
      [
        { target: '[去年/上次]', note: 'time anchor; 去年, 上次, 前年, 三年前 etc.' },
        { target: '[地名]', note: 'place name; can be one city or a region' },
        { target: '[质量 A] / [质量 B]', note: 'two different axes (see Grammar I); not two synonyms' },
        { target: '[场景描述]', note: 'one vivid sentence using V 着 or 一边…一边…' },
        { target: '听说/据说 [事实]', note: 'pick the marker that matches your source type' },
        { target: '[惊喜]', note: 'one detail that broke your expectation' },
        { target: '[小贴士]', note: 'one specific recommendation: when to go, what to skip, what to try' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '示例作文',
      'shìlì zuòwén',
      'A model 6-sentence essay filling the template. Notice how each target pattern appears exactly once and how the tip at the end transforms description into recommendation.',
      'sentence',
      '前年我去了内蒙古的草原。草原不但景色辽阔，而且当地的文化也特别有趣。我们一边骑马，一边看着夕阳慢慢落下来。听说每年七月有那达慕节，到处都是赛马和摔跤的人。出乎意料的是，蒙古包里的奶茶又咸又香，我以前从来没喝过这样的味道。我建议你夏天去，因为冬天的草原又冷又没什么人。',
      '"The year before last I went to the Inner Mongolian grasslands. Not only is the scenery vast, but the local culture is uniquely interesting. We rode horses and watched the sunset slowly fall at the same time. I hear there\'s a Naadam festival every July with horse-racing and wrestling everywhere. Unexpectedly, the milk tea inside the yurts was both salty and fragrant — I had never tasted anything like it. I recommend going in summer, because the grassland in winter is cold and empty."',
      [
        { target: '不但景色辽阔，而且当地的文化也特别有趣', note: 'layered praise: visual scale + cultural depth (two different axes)' },
        { target: '一边骑马，一边看着夕阳', note: 'simultaneous actions; note 看着 with 着 inside a 一边… clause for a vivid freeze-frame' },
        { target: '听说每年七月有那达慕节', note: 'hearsay about a recurring event; specific enough to use 听说' },
        { target: '出乎意料的是…', note: 'story-pivot phrase before the salty-milk-tea surprise' },
        { target: '建议你夏天去', note: 'concrete tip with a reason; transforms description into recommendation' },
      ],
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '黄金周',
      'Huángjīn Zhōu',
      '"Golden Week" — the two week-long national holidays in China: 五一 (May 1, Labor Day, became a 5-day holiday again in 2008) and 十一 (October 1, National Day, a 7-day holiday). About half a billion Chinese travel within these weeks, creating the iconic crowd photos at 长城 and 故宫. The single most important travel-timing concept in modern China.',
      'sentence',
      '十一长城上的人多得难以置信。',
      '"During National Day Golden Week, the crowds on the Great Wall are unbelievable." — a frequent complaint among locals; the 难以置信 here is sarcastic-negative, not positive.',
      [
        { target: '五一黄金周', note: 'Labor Day holiday, around May 1; shorter than 十一 but still massive' },
        { target: '十一黄金周', note: 'National Day holiday, October 1–7; the worst week to visit any famous attraction' },
        { target: '错峰出行', note: '"travel off-peak" — the advice every guide gives to anyone considering Golden Week travel' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '跟团游的真相',
      'gēntuányóu de zhēnxiàng',
      'The open secret of cheap Chinese group tours: the tour price is often subsidized by mandatory "shopping stops" (购物点) where tourists are pressured to buy jade, tea, silk, or medicine at heavily marked-up prices. Guides earn commission from these stops. A 999元 7-day tour of southern China is mathematically impossible without this hidden revenue stream — and travelers who know the trick choose 自由行 instead.',
      'sentence',
      '听说有的跟团游导游会逼着你买东西。',
      '"I hear some group-tour guides will pressure you to buy things." — the canonical hearsay everyone knows but few want to confirm publicly.',
      [
        { target: '购物点 gòuwùdiǎn', note: '"shopping stop"; a mandatory stop on cheap group tours where commissions are paid' },
        { target: '低价团 dījiàtuán', note: '"low-price tour"; the giveaway label for tours subsidized by shopping kickbacks' },
        { target: '强制消费 qiángzhì xiāofèi', note: '"forced consumption"; the formal complaint phrase used in news exposés' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '边疆旅游热',
      'biānjiāng lǚyóu rè',
      'The frontier-tourism boom — over the last decade, 内蒙古, 西藏, 新疆, 云南, and 青海 have transitioned from off-the-map regions to mainstream 自由行 destinations. Better roads, faster trains (the Qinghai-Tibet Railway opened in 2006), and social-media-driven destination FOMO have pushed Chinese travelers to seek frontier landscapes the older generation never saw.',
      'sentence',
      '听说现在去西藏的人比五年前多得多。',
      '"I hear that the number of people going to Tibet now is much higher than five years ago." — a widely-shared observation; tourism statistics confirm it.',
      [
        { target: '青藏铁路', note: 'Qinghai-Tibet Railway; opened 2006, transformed Tibet from an air-only destination to an accessible one' },
        { target: '小红书 / 抖音', note: 'Xiaohongshu (Little Red Book) and Douyin (TikTok-CN); the algorithmic engines that drive destination trends' },
        { target: '打卡 dǎkǎ', note: '"to check in" at a famous photo spot; the verb of social-media-driven tourism' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '中国游客的刻板印象',
      'Zhōngguó yóukè de kèbǎn yìnxiàng',
      'The Chinese tourist abroad stereotype — loud, group-photo crazy, traveling in matching-hat tour groups behind a guide with a bullhorn and a small flag. Largely a snapshot of the early 2010s, when overseas group tours suddenly became affordable to the urban middle class. The stereotype is gradually fading as 自由行 travelers replace 跟团游 abroad, but it lingers in international perception and in some self-critical Chinese commentary.',
      'sentence',
      '听说在欧洲，中国游客以前喜欢举着小旗子跟团走。',
      '"I hear that in Europe, Chinese tourists used to like walking in groups behind a guide with a little flag." — the canonical stereotype, framed as past-tense hearsay.',
      [
        { target: '导游举着小旗子', note: 'V + 着 in a stereotype; the guide holding a flag is the visual marker of the loud-tour-group stereotype' },
        { target: '大声说话 dàshēng shuōhuà', note: '"speaking loudly"; the second pillar of the stereotype' },
        { target: '不过现在变了', note: '"but it\'s changing now"; the obligatory softening clause when discussing the stereotype' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '任务: 咖啡角',
      'rènwù: kāfēijiǎo',
      'Roleplay a coffee-break conversation at the Tsinghua lab. The AI tutor plays a curious classmate. Aim for a 6-turn exchange in Mandarin, using all three target patterns (不但…而且…, V + 着 / 一边…一边…, 听说/据说) plus a concrete tip at the end.',
      'conversation',
      '[Coffee corner, Tsinghua lab]\n同学: 你去过最有意思的地方是哪儿？\n你: [说一个地方 + 一个锚定的事实]\n同学: 真的吗？给我讲讲。\n你: [不但…而且… 分层描述]\n同学: 听起来挺特别的。当时你做了什么？\n你: [V 着 / 一边…一边… 描述场景]\n同学: 那里出名吗？\n你: [听说 / 据说 一个事实]\n同学: 我下次假期想去。有什么建议？\n你: [一个具体的建议 + 为什么]\n同学: 谢谢！你说得我都想立刻飞过去了。',
      'Six turns of natural exchange; the AI tutor will prompt you and adapt to whatever you say. The pattern-coverage check is built into the prompts: each tutor turn cues a different target pattern.',
      [
        { target: 'Turn 1 cue: name + anchor', note: 'pick a place + one grounded fact (海拔, 历史, 大小, etc.)' },
        { target: 'Turn 2 cue: 不但…而且…', note: 'two qualities on different axes; not two synonyms' },
        { target: 'Turn 3 cue: V + 着 or 一边…一边…', note: 'one vivid scene-setting sentence; freeze a moment in time' },
        { target: 'Turn 4 cue: 听说/据说', note: 'one hearsay fact you can\'t personally vouch for; pick the right marker' },
        { target: 'Turn 5 cue: practical tip', note: 'specific advice: best time, what to skip, what to try' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战 — 想去的地方',
      'tiǎozhàn — xiǎng qù de dìfang',
      'Stretch goal: switch the prompt from a place you HAVE visited to a place you WANT to visit. The 听说/据说 patterns now become essential because every sentence about the place is necessarily second-hand. This is the harder mode because you can\'t lean on personal memory.',
      'conversation',
      '同学: 那你最想去的地方呢？\n你: 我最想去 [地名]。听说那里 [事实1]，据说 [事实2]。\n同学: 为什么想去？\n你: 不但 [质量 A]，而且 [质量 B]。\n同学: 听起来很有意思。一个人去吗？\n你: 不知道，可能跟同学。听说自由行比跟团游有意思多了。\n同学: 那你打算什么时候去？\n你: 我打算 [时间] 去，因为那时候人比较少。',
      'When you have not been somewhere, the entire description must be marked as hearsay; this is where 听说/据说 stop feeling optional and become the spine of the answer.',
      [
        { target: '听说 + 据说 alternation', note: 'use both within the answer to mark different source types — friends vs general knowledge' },
        { target: '不但…而且… for layered desire', note: 'two reasons you want to go; different axes (scenery + food, history + price, etc.)' },
        { target: 'practical timing 我打算 [时间] 去', note: 'show you\'ve thought about the practical side; pick a non-Golden-Week date' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
