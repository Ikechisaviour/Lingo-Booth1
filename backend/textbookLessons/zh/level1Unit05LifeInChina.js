// Level 1 Unit 5 — Life in China & first impressions (Mandarin Chinese)
// Functions: sharing opinions about life in China, asking 怎么样?, expressing
// likes/dislikes with 喜欢, calibrating with intensifiers (很 / 非常 / 太…了 /
// 有点儿 / 真), and hedging an opinion politely.
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
  orientation: 'zh-l1u5-orientation',
  pronunciation: 'zh-l1u5-pronunciation',
  vocabularyAdjectives: 'zh-l1u5-vocab-adj',
  vocabularyLife: 'zh-l1u5-vocab-life',
  grammarHow: 'zh-l1u5-grammar-how',
  grammarLike: 'zh-l1u5-grammar-like',
  grammarIntensifiers: 'zh-l1u5-grammar-intensifiers',
  reading: 'zh-l1u5-reading',
  listening: 'zh-l1u5-listening',
  writing: 'zh-l1u5-writing',
  culture: 'zh-l1u5-culture',
  task: 'zh-l1u5-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Ask 怎么样? (zěnmeyàng?) to invite an opinion on any topic — food, weather, classes, dorm, transport.',
      'Share a calibrated opinion about life in China using adjective + 很/非常/有点儿/太…了 to control how strong it sounds.',
      'Say what you like and dislike using 喜欢 / 不喜欢 / 讨厌 with both nouns and verbs.',
    ],
    task: 'Imagine a Chinese classmate at Tsinghua asks how you have been finding life in China — by the end of this lesson you should handle a 4-turn opinion exchange about food, people, and studies without rehearsing each line.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in opinion language',
    goals: [
      'Pronounce 怎么样 (zěnmeyàng) with the neutral-tone 么 in the middle — third + neutral + fourth, NOT three full tones.',
      'Distinguish 喜欢 (xǐhuan, "to like") from 习惯 (xíguàn, "to be used to") — same xi-something shape, totally different meanings and tones.',
      'Handle 有点儿 (yǒudiǎnr) with the Beijing-style 儿化 r-suffix and contrast it with the standard 有一点 (yǒu yīdiǎn).',
    ],
    task: 'Read each example aloud focusing on the neutral tones and the 喜欢 vs 习惯 contrast.',
  },
  {
    id: ACT.vocabularyAdjectives,
    section: 'Vocabulary I',
    title: 'Opinion adjectives — paired opposites',
    goals: [
      'Learn 10+ descriptive adjective pairs (好/不好, 大/小, 容易/难, 有意思/无聊, 便宜/贵, 干净/脏, 新/旧, 热闹/安静, 漂亮/丑, 累/轻松).',
      'Remember that almost every Chinese adjective wants a degree word before it in a positive predicate — bare 好 alone sounds incomplete; 很好 is the neutral default.',
    ],
    task: 'Pick five adjectives and use each in one short sentence with the topic of your choice.',
  },
  {
    id: ACT.vocabularyLife,
    section: 'Vocabulary II',
    title: 'Life-in-China topic nouns',
    goals: [
      'Use 食物/菜 (food), 天气 (weather), 人 (people), 学校 (school), 宿舍 (dorm), 物价 (prices), 交通 (transport), 学习 (studies), 文化 (culture), 空气 (air quality) as topic nouns.',
      'Combine each noun with 中国的 or 这里的 to form the natural Chinese pattern "China\'s X / the X here" — 中国的食物, 这里的天气.',
    ],
    task: 'List the three topics you have the strongest opinions about and write one 这里的N怎么样? question for each.',
  },
  {
    id: ACT.grammarHow,
    section: 'Grammar I',
    title: '怎么样 — How is N?',
    goals: [
      'Form the opinion question with N + 怎么样? — invariant word order, no question particle 吗 needed.',
      'Reply with the noun + 很/非常 + adjective: 食物很好吃. Bare adjective (食物好吃) sounds incomplete in a positive statement.',
      'Switch the topic noun to the front of the answer with no particle marking — Chinese is topic-prominent and a fronted noun is enough.',
    ],
    task: 'Make three 怎么样? questions on different topics and answer each with a calibrated adjective.',
  },
  {
    id: ACT.grammarLike,
    section: 'Grammar II',
    title: '喜欢 — like + noun or verb',
    goals: [
      'Use 喜欢 + noun for objects: 我喜欢中国菜.',
      'Use 喜欢 + verb directly (no -ing form needed): 我喜欢学中文. The verb sits as the object — Chinese verbs do not change form.',
      'Negate with 不喜欢 (gentle "don\'t like") and 讨厌 (strong "hate / dislike intensely") — pick by intensity, not by formality.',
    ],
    task: 'Write two sentences with 喜欢 + noun and two with 喜欢 + verb, then convert one to 不喜欢 and one to 讨厌.',
  },
  {
    id: ACT.grammarIntensifiers,
    section: 'Grammar III',
    title: 'Intensifiers — 很 / 非常 / 太…了 / 有点儿 / 真',
    goals: [
      'Use 很 (hěn) as the neutral linker before adjectives — required in positive predicates even when "very" is not really meant.',
      'Use 非常 (fēicháng) for genuine "very", 真 (zhēn) for emotional "really", and 太…了 (tài…le) for excessive "too" — the 了 closing the pattern is mandatory.',
      'Use 有点儿 (yǒudiǎnr) BEFORE the adjective to soften a NEGATIVE opinion politely — 这个菜有点儿辣 ("the dish is a bit spicy"). Critical: 有点儿 only fits when the opinion is mildly bad; for positive opinions use 一点儿 in a different slot.',
    ],
    task: 'Take one strong opinion (太辣了) and rewrite it three ways: neutral (很辣), polite negative (有点儿辣), and emphatic (非常辣).',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'A foreign student\'s first month in Beijing',
    goals: [
      'Read a short first-impressions paragraph aloud with correct tones and sandhi.',
      'Identify which things the writer likes, which things she finds difficult, and how she hedges the difficult parts using 有点儿 and 但是.',
    ],
    task: 'Read the paragraph below aloud once, then answer four comprehension questions in short Chinese sentences.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'Trading impressions at Tsinghua',
    goals: [
      'Follow a 4-turn opinion exchange between two students with natural rhythm and softeners.',
      'Reproduce the dialogue using your own opinions — at least one positive line, one hedged negative line, and one preference line.',
    ],
    task: 'Read the dialogue along with the AI tutor first, then perform it again with your own real opinions.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Your first impressions of China',
    goals: [
      'Write 4–5 sentences in Hanzi sharing what you like and find difficult about life in China.',
      'Use at least one 喜欢 + noun, one 有点儿 + adjective, and one 太…了 — so the writing demonstrates the core grammar of this lesson.',
    ],
    task: 'Write your own first-impressions paragraph using the template, then read it aloud with correct tones.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: '面子 — Softening opinions and saving face',
    goals: [
      'Know that Chinese-speaking cultures place high value on 面子 (miànzi, "face") and that direct strong criticism — "I don\'t like it" — can feel rude.',
      'Open any criticism with a compliment first, then hedge the negative part with 有点儿 instead of 非常 — "the food is delicious, just a bit spicy for me".',
      'Avoid 讨厌 with people, food brought by your host, or anything your interlocutor is proud of — its strength rarely matches the situation.',
    ],
    task: 'Take one blunt opinion in English ("the dorm is bad") and rewrite it in Chinese with a compliment-first + 有点儿 hedge.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'Share your first month in China',
    goals: [
      'Combine vocabulary, 怎么样 questions, adjective + intensifier replies, and 喜欢 in one continuous scene.',
      'Use proper hedging (有点儿) when discussing anything negative, and at least one compliment before any criticism — applied 面子 in conversation.',
    ],
    task: 'Roleplay with the AI tutor playing a Chinese friend at Tsinghua asking how your first month has been — aim for a 6-turn opinion exchange covering food, weather, people, classes, and one topic you choose.',
  },
];

const lesson = {
  title: 'Level 1 · Unit 5: 中国生活怎么样? — Life in China and Sharing Opinions',
  category: 'daily-life',
  difficulty: 'beginner',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'sharing-opinion', label: 'Sharing opinions', goal: 'Use noun + 很/非常 + adjective to give a calibrated, natural-sounding opinion on any topic.' },
    { id: 'asking-how-is', label: 'Asking how something is', goal: 'Use N + 怎么样? to invite an opinion politely, with no need for the 吗 particle.' },
    { id: 'saying-what-you-like', label: 'Saying what you like', goal: 'Use 我喜欢 + noun or 我喜欢 + verb to state a preference; switch to 不喜欢 or 讨厌 for negatives at matched intensity.' },
    { id: 'softening-negative-opinion', label: 'Softening a negative opinion', goal: 'Use 有点儿 before an adjective to hedge politely and protect face in Mandarin-speaking contexts.' },
  ],
  relatedPools: ['topic-people', 'topic-society', 'topic-food'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '本课目标',
      'běn kè mùbiāo',
      'By the end of this lesson you can trade opinions about life in China — invite an opinion with 怎么样?, give a calibrated answer with intensifiers, and state preferences with 喜欢 — all in one short exchange without pausing to think.',
      'word',
      'Functions: 问感受 wèn gǎnshòu (ask for an impression) · 表达意见 biǎodá yìjiàn (share an opinion) · 说喜好 shuō xǐhào (state a preference) · 委婉表达 wěiwǎn biǎodá (hedge politely)',
      'Four micro-skills that unlock conversational opinions — once these are automatic, casual chat with classmates and hosts opens up.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      '真实场景',
      'zhēnshí chǎngjǐng',
      'You have been at Tsinghua University for one month. A Chinese classmate sits down at lunch and asks how you have been finding life in China. The whole exchange takes about a minute and you will need every micro-skill from this lesson.',
      'word',
      '同学: "中国生活怎么样? 习惯了吗?" — 你: "挺好的! 食物很好吃，就是有点儿辣。"',
      'A typical Chinese opener combines 怎么样? with 习惯了吗? (xíguàn le ma? "have you adjusted?"); the expected reply is a hedged positive — strong negatives feel rude on first ask.',
      [
        { target: '中国生活怎么样?', note: 'standard opinion-inviting question; literal "China life how-is?"' },
        { target: '习惯了吗? xíguàn le ma?', note: '"have you gotten used to it?" — frequently paired with 怎么样? as a softer second probe' },
        { target: '挺好的 tǐng hǎo de', note: 'colloquial "pretty good" — softer than 很好, much warmer than a flat 好' },
        { target: '就是有点儿辣 jiùshì yǒudiǎnr là', note: '"it\'s just a bit spicy" — the 就是 frames the criticism as a tiny exception, classic 面子-saving hedge' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '三种态度',
      'sān zhǒng tàidu',
      'Mandarin opinion language splits into three calibrations. Positive: 很/非常/真 + adjective. Soft negative: 有点儿 + adjective. Strong negative: 太 + adjective + 了. Mixing the wrong calibration with the wrong situation is the most common opinion-language error for learners — strong negatives sound abrupt; weak positives sound disengaged.',
      'word',
      '很好 hěn hǎo (positive, neutral) · 有点儿贵 yǒudiǎnr guì (polite negative) · 太辣了 tài là le (excessive — implies "too much for me")',
      'Calibration first, content second — pick the intensity that matches the social situation, then choose the adjective.',
      [
        { target: 'POSITIVE: 很 / 非常 + adj', note: 'safe default for any complimentary opinion; 很 is the no-emphasis linker' },
        { target: 'SOFT NEGATIVE: 有点儿 + adj', note: 'the polite hedge — mandatory for any complaint about a host, professor, or stranger\'s recommendation' },
        { target: 'EXCESSIVE: 太…了', note: 'expresses that something exceeds what you can handle — paired with 了 always, never 太 + adj alone' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '怎么样',
      'zěnmeyàng',
      'Three syllables with a built-in neutral tone in the middle: 怎 (zěn, 3rd) + 么 (me, NEUTRAL) + 样 (yàng, 4th). The middle 么 is light and short — learners often give it a full tone, which makes the question sound robotic.',
      'word',
      '中国生活怎么样? Zhōngguó shēnghuó zěnmeyàng?',
      'Hear the rhythm: STRONG-light-STRONG — the 么 almost disappears between two stressed syllables.',
      [
        { target: '怎 zěn (3rd)', note: 'third-tone dip-and-rise; "how"' },
        { target: '么 me (neutral)', note: 'no tone mark; light, short, unstressed — pitch determined by previous tone' },
        { target: '样 yàng (4th)', note: 'sharp falling fourth tone; "kind / manner"' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '喜欢 vs 习惯',
      'xǐhuan vs xíguàn',
      'A pair of look-alike disyllables that trip up learners constantly. 喜欢 (xǐhuan, "to like") = 3rd + neutral. 习惯 (xíguàn, "to be used to / to adjust") = 2nd + 4th. Same xi-something shape, completely different tones and completely different meanings.',
      'word',
      '我喜欢中国 wǒ xǐhuan Zhōngguó ("I like China") vs 我习惯中国 wǒ xíguàn Zhōngguó ("I am used to China")',
      'Confusing these two in conversation produces sentences your interlocutor will gently correct — both are extremely high-frequency in Unit 5 contexts.',
      [
        { target: '喜欢 xǐhuan', note: '3rd + neutral; "like" — preference verb' },
        { target: '习惯 xíguàn', note: '2nd + 4th; "be used to / adjust to" — adaptation verb, very common when discussing life abroad' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '有点儿',
      'yǒudiǎnr',
      'Three syllables collapsed into two by Beijing-style 儿化 (érhuà, r-suffix): 有 (yǒu, 3rd) + 点 (diǎn, 3rd) + 儿 (r-suffix on 点). The 儿 retroflexes the previous syllable rather than adding a full syllable. Standard Mandarin (especially southern) often drops the 儿: 有一点 yǒu yīdiǎn — same meaning.',
      'word',
      '北京口音: 有点儿辣 yǒudiǎnr là vs 标准: 有一点辣 yǒu yīdiǎn là',
      'Both are correct; the 儿化 form is heard in Beijing media and northern speech; the non-儿化 form is more common in Taiwan and southern Mainland.',
      [
        { target: '有点儿 yǒudiǎnr (Beijing)', note: 'two syllables; the final 儿 colors the 点; common in northern Mainland speech' },
        { target: '有一点 yǒu yīdiǎn (standard)', note: 'three syllables; no r-suffix; common in southern Mainland and Taiwan' },
        { target: '有点儿 (3rd + 3rd → 2nd + 3rd)', note: 'sandhi note: the first 有 rises to second tone because the next syllable is also third tone' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '太…了',
      'tài…le (spoken: tài…le)',
      '太 (tài, 4th) + adjective + 了 (le, NEUTRAL). The 了 at the end is mandatory — without it, the sentence sounds incomplete or wrong. The fourth-tone 太 is sharp; the closing 了 is short and light.',
      'word',
      '太辣了! tài là le! ("It\'s too spicy!") · 太贵了! tài guì le! ("It\'s too expensive!")',
      'Pattern is fixed: 太 + adj + 了 — leaving off the 了 is one of the most common learner errors.',
      [
        { target: '太 tài (4th)', note: 'sharp falling fourth tone; "too / excessively"' },
        { target: '辣 là (4th)', note: 'fourth tone; "spicy"' },
        { target: '了 le (neutral)', note: 'short, light closing particle; obligatory in this pattern, never tone-marked' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '很好吃',
      'hěn hǎochī',
      'Three third-tone syllables in a row triggers cascading sandhi: 很 (hěn, 3rd) + 好 (hǎo, 3rd) + 吃 (chī, 1st) → spoken hén hǎo chī (first 很 rises, second 好 keeps its tone because the next syllable is first tone).',
      'word',
      '中国菜很好吃 → spoken: Zhōngguó cài hén hǎo chī',
      'Cascading third-tone sandhi is a Foundation-level rule but appears constantly in opinion sentences — drill until automatic.',
      [
        { target: '很 (written hěn → spoken hén)', note: 'first syllable; rises because the next syllable is also third tone' },
        { target: '好 (hǎo, 3rd, unchanged)', note: 'middle syllable; the next syllable 吃 is first tone, so no further sandhi' },
        { target: '吃 (chī, 1st)', note: 'first tone; high level, unchanged' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Opinion adjectives
    // ────────────────────────────────────────────────────────────────────
    createContentItem('好 / 不好', 'hǎo / bù hǎo', 'The most basic positive vs negative quality words; 好 alone in a positive sentence almost always wants a degree word (very/非常/真) in front. 不好 is gentler than 坏 (huài, "bad/broken").', 'word', '这里的天气很好. 这里的天气不好.', 'Use 很好 for everyday compliments; 不好 for mild negatives; reserve 坏 for things that are actually broken or morally bad.', null, [ACT.vocabularyAdjectives]),
    createContentItem('大 / 小', 'dà / xiǎo', 'Size pair. 大 covers physical size, area, age, and importance; 小 is its mirror. In Chinese, 大 is also a polite address marker (大哥, "big brother") — context decides.', 'word', '清华的校园很大. 我的宿舍很小.', 'Tsinghua\'s campus is genuinely big — over 4 km² — a common conversation point for new arrivals.', null, [ACT.vocabularyAdjectives]),
    createContentItem('容易 / 难', 'róngyì / nán', 'Difficulty pair. 容易 is two syllables (RONG-yi), 难 is one. Used freely for tasks, languages, and concepts; common in 中文很难 (Chinese is hard) and 这个题容易 (this problem is easy).', 'word', '中文有点儿难，但是很有意思. 这个题很容易.', '"Chinese is a bit hard, but very interesting" is a textbook Unit 5 opinion — combines hedge + contrast + intensifier.', null, [ACT.vocabularyAdjectives]),
    createContentItem('有意思 / 无聊', 'yǒu yìsi / wúliáo', 'Interest pair. 有意思 (literally "have meaning") is the everyday word for "interesting/fun"; 无聊 covers both "boring" (event) and "bored" (subject). Useful for classes, movies, weekends.', 'word', '中国文化非常有意思. 这个电影有点儿无聊.', 'Note the noun-like structure: 有意思 is technically 有 + 意思 ("have interest"), so it does not take 很 as freely as pure adjectives.', null, [ACT.vocabularyAdjectives]),
    createContentItem('便宜 / 贵', 'piányi / guì', 'Price pair. 便宜 is two syllables (PIAN-yi, second syllable neutral); 贵 is one. Critical Unit 5 vocabulary because foreign students compare prices constantly. 贵 also means "honored" in formal address (贵姓 — your honored surname).', 'word', '学校食堂很便宜. 北京的咖啡有点儿贵.', 'The Tsinghua canteen runs about 10–20 yuan per meal — a classic 很便宜 example versus city-center cafes.', null, [ACT.vocabularyAdjectives]),
    createContentItem('干净 / 脏', 'gānjìng / zāng', 'Cleanliness pair. 干净 is two syllables; 脏 is one. Often used for dorms, restaurants, streets. 脏 carries no insult about the place — it is descriptive, not moral.', 'word', '宿舍很干净. 这里的空气有点儿脏.', '"This place\'s air is a bit dirty" is a common polite way to say "the air pollution is bad" — much softer than 空气很糟糕.', null, [ACT.vocabularyAdjectives]),
    createContentItem('新 / 旧', 'xīn / jiù', 'Age pair for things. 新 is "new"; 旧 is "old/worn" (for objects, not people — for people use 老 lǎo). The contrast 新/旧 is frequent in descriptions of buildings, technology, and books.', 'word', '我的电脑很新. 这栋楼很旧.', 'Beijing has many 旧 (old) buildings next to 新 (new) skyscrapers — a frequent first-impression contrast for foreign students.', null, [ACT.vocabularyAdjectives]),
    createContentItem('热闹 / 安静', 'rènao / ānjìng', 'Atmosphere pair. 热闹 (literally "hot-noisy") means "lively / bustling" with no negative connotation — Chinese speakers usually consider 热闹 a good thing. 安静 means "quiet/peaceful" and is also positive in context (libraries, evening dorms).', 'word', '北京的夜市很热闹. 图书馆很安静.', 'Cultural note: in many Western languages, "noisy/lively" carries some negative tone; 热闹 in Chinese is genuinely positive — a 不热闹 restaurant is suspicious.', null, [ACT.vocabularyAdjectives]),
    createContentItem('漂亮 / 丑', 'piàoliang / chǒu', 'Beauty pair. 漂亮 (3rd + neutral when relaxed) for places, clothes, people. 丑 is one syllable, much stronger than the English "ugly" — avoid using it about people directly. For places/objects, 不漂亮 is the polite negative.', 'word', '清华的校园很漂亮. 这个建筑有点儿丑.', '漂亮 is much more frequent than English "beautiful" — it covers "nice-looking" for everything from a sweater to a sentence; 丑 is rare in polite speech.', null, [ACT.vocabularyAdjectives]),
    createContentItem('累 / 轻松', 'lèi / qīngsōng', 'Effort pair. 累 is "tired" (subject) or "tiring" (task); 轻松 is "relaxed / easy-going". Frequent in describing classes, schedules, and life balance.', 'word', '这个学期很累. 周末很轻松.', '"This semester is exhausting" is a universal student opinion — 累 is a high-frequency word every learner should master early.', null, [ACT.vocabularyAdjectives]),
    createContentItem('辣', 'là', 'A standalone adjective meaning "spicy / hot from peppers". Not a pair word — its opposite is usually 不辣 (not spicy) rather than a separate word. Critical for any food-related opinion in China.', 'word', '四川菜很辣. 这个菜有点儿辣.', 'Sichuan/Hunan cuisine is famously 辣; Cantonese cuisine is famously 不辣 — knowing this contrast is everyday small talk.', null, [ACT.vocabularyAdjectives]),
    createContentItem('好吃', 'hǎochī', 'Compound adjective "delicious" (literally "good-to-eat"). Used freely for food; the negative is 不好吃 ("not tasty"), gentler than 难吃 ("hard to eat / disgusting"). Note that 好吃 takes 很 like a regular adjective: 很好吃.', 'word', '中国菜很好吃. 这个饺子非常好吃.', 'For drinks use the parallel compound 好喝 (hǎohē, "good to drink"); for things in general 好 alone suffices.', null, [ACT.vocabularyAdjectives]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: Life topics
    // ────────────────────────────────────────────────────────────────────
    createContentItem('中国生活', 'Zhōngguó shēnghuó', 'The umbrella topic "life in China" — the catch-all noun that any Unit 5 conversation about adjustment starts with. 中国 + 生活 is a noun-noun compound; no possessive 的 is needed.', 'word', '中国生活怎么样?', 'Standard opening question to any foreign student in China; expect to use and answer this phrase weekly.', null, [ACT.vocabularyLife]),
    createContentItem('食物 / 菜', 'shíwù / cài', '食物 is the formal "food" (textbooks, nutrition labels); 菜 is the everyday word for "dish / cooked food / vegetable". In conversation almost always use 菜: 中国菜 (Chinese food), 这个菜 (this dish). 食物 sounds clinical.', 'word', '中国菜很好吃，但是有点儿油.', '"Chinese food is delicious, but a bit oily" — combines opinion + hedge in one sentence; 油 (yóu, "oily") is a frequent food adjective in China.', null, [ACT.vocabularyLife]),
    createContentItem('天气', 'tiānqì', 'The weather; standard meteorological term. Beijing has four distinct seasons with hot humid summers and cold dry winters — 天气 is a constant first-impression topic for newcomers.', 'word', '北京冬天的天气很干. 夏天有点儿热.', '"Beijing winter weather is dry, summer is a bit hot" — model sentence using both season nouns and adjective + 有点儿 hedge.', null, [ACT.vocabularyLife]),
    createContentItem('人 / 中国人', 'rén / Zhōngguórén', 'The noun "person/people". 中国人 means "Chinese person/people" — the country + 人 pattern from Unit 1. When sharing opinions about people in general use 这里的人 ("the people here") or 中国人.', 'word', '中国人很友好.', '"Chinese people are friendly" — a very common first-month observation that earns a smile in any conversation.', null, [ACT.vocabularyLife]),
    createContentItem('学校', 'xuéxiào', 'A school of any level. For university specifically use 大学 (dàxué); for high school 高中 (gāozhōng). 我的学校 = "my school" — 的 can be dropped in close-feeling contexts.', 'word', '我的学校是清华大学. 学校很大，也很漂亮.', '"My school is Tsinghua. The school is big and beautiful" — Tsinghua\'s campus is one of the prettiest in China.', null, [ACT.vocabularyLife]),
    createContentItem('宿舍', 'sùshè', 'A dormitory — the standard housing for university students in China. Foreign students at Tsinghua typically live in international student dorms with shared kitchens. The word is two syllables (SU-she).', 'word', '我的宿舍很干净，但是有点儿小.', '"My dorm is clean but a bit small" — textbook Unit 5 balanced opinion using both vocab and hedge patterns.', null, [ACT.vocabularyLife]),
    createContentItem('物价 / 价格', 'wùjià / jiàgé', '物价 is "cost of living / prices in general"; 价格 is "the price of one specific thing". For Unit 5 opinions use 物价: 这里的物价怎么样? ("What are prices like here?"). For a single item: 这个东西的价格是多少?', 'word', '北京的物价有点儿贵，但是学校食堂很便宜.', 'Standard adjustment-topic answer: prices high in the city, but the canteen is cheap — most foreign students discover this fast.', null, [ACT.vocabularyLife]),
    createContentItem('交通', 'jiāotōng', 'Transportation and traffic combined into one noun. Beijing\'s subway is famously cheap and efficient; surface traffic is famously jammed. Both senses use 交通.', 'word', '北京的地铁交通很方便. 但是开车的交通很堵.', '"Subway transport is convenient; driving traffic is jammed" — 堵 (dǔ, "jammed") is the everyday word for traffic congestion.', null, [ACT.vocabularyLife]),
    createContentItem('学习', 'xuéxí', 'Both noun "studies / studying" and verb "to study". Unit 5 typically uses it as a topic noun: 这里的学习怎么样? ("How are your studies here?"). For a specific subject use 学 + subject: 学中文.', 'word', '这里的学习很累，但是很有意思.', 'Standard balanced opinion about coursework — "tiring but interesting" works for almost every Tsinghua student.', null, [ACT.vocabularyLife]),
    createContentItem('文化', 'wénhuà', 'Culture — covers customs, arts, traditions, ways of life. Frequent topic in foreign-student conversations: 中国文化很有意思 ("Chinese culture is fascinating") is a near-universal first-impression line.', 'word', '中国文化非常丰富.', '"Chinese culture is very rich" — 丰富 (fēngfù, "rich / abundant") is a step up from 有意思, useful when you want a stronger compliment.', null, [ACT.vocabularyLife]),
    createContentItem('空气', 'kōngqì', 'Air, air quality. In Beijing especially, 空气 is a constant topic — air-quality apps, masks, and 雾霾 (wùmái, "smog") are part of daily life. Polite hedging is critical here: 空气有点儿不好 is much safer than 空气很糟糕.', 'word', '今天的空气有点儿不好，我们在宿舍学习吧.', '"The air is a bit bad today, let\'s study in the dorm" — practical everyday combination of opinion + suggestion.', null, [ACT.vocabularyLife]),
    createContentItem('饺子 / 火锅', 'jiǎozi / huǒguō', 'Two iconic Chinese dishes that show up constantly in foreign-student conversations. 饺子 are dumplings (boiled or pan-fried); 火锅 is hot pot (a communal simmering broth with raw ingredients to cook at the table). Both are conversation starters.', 'word', '我很喜欢饺子! 火锅有点儿辣，但是很好吃.', 'Naming a specific Chinese dish you like instantly warms up a conversation — generic 中国菜 is fine but specific dishes earn smiles.', null, [ACT.vocabularyLife]),
    createContentItem('微信 / 微信支付', 'Wēixìn / Wēixìn Zhīfù', 'WeChat / WeChat Pay — the universal app for messaging and payments in Mainland China. Foreign students must set up 微信支付 in their first week or struggle to buy anything; the topic comes up in every "life in China" conversation.', 'word', '我刚学会用微信支付，非常方便.', '"I just learned to use WeChat Pay, super convenient" — a perfect first-month adjustment story; 刚学会 means "just learned how to".', null, [ACT.vocabularyLife]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar I: 怎么样
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'N + 怎么样?',
      'N + zěnmeyàng?',
      'The standard "How is N?" question. Pattern is invariant: place the noun first, then 怎么样? at the end. NO 吗 particle — 怎么样 already carries the question, adding 吗 is wrong. Word order matches statements (topic + comment).',
      'sentence',
      '中国菜怎么样? — 这里的天气怎么样? — 你的宿舍怎么样?',
      'Three different topics, same pattern — the most flexible opinion-question shape in Mandarin.',
      [
        { target: '中国菜怎么样?', note: '"How is Chinese food?" — about a category' },
        { target: '这里的天气怎么样?', note: '"How is the weather here?" — 这里的 (zhèlǐ de, "here-of") localizes the topic' },
        { target: '你的宿舍怎么样?', note: '"How is your dorm?" — 你的 (your) marks the personal scope' },
      ],
      [ACT.grammarHow],
    ),
    createContentItem(
      'Reply: N + 很/非常 + adjective',
      'noun + degree word + adj',
      'CRITICAL RULE: In a positive opinion, an adjective in Mandarin almost always wants a degree word (很/非常/真) in front. A bare 食物好吃 sounds incomplete — almost like a comparison was set up but not finished. The neutral, unmarked default is 很 + adjective, even when "very" is not really meant.',
      'sentence',
      '中国菜很好吃. — 这里的天气非常好. — 我的宿舍真干净.',
      '很 is the unmarked linker (no real "very" emphasis); 非常 is the genuine "very" intensifier; 真 is the emotional "really".',
      [
        { target: '很 + adj (neutral)', note: 'almost-mandatory linker; does NOT add real "very" meaning despite the literal translation' },
        { target: '非常 + adj (strong)', note: '"very" with real emphasis; use when you mean it' },
        { target: '真 + adj (emotional)', note: '"really!" — carries surprise or admiration; informal' },
      ],
      [ACT.grammarHow],
    ),
    createContentItem(
      'Topic-first answers',
      'topic-fronted reply',
      'Mandarin is topic-prominent: in an answer you can drop the topic if it just appeared in the question, or repeat it at the front of your reply. Both shapes are natural. No subject-particle marking like Korean 은/는 — just place the topic first.',
      'sentence',
      'Q: 中国菜怎么样? A1: 很好吃. (drop the topic) A2: 中国菜很好吃. (repeat the topic)',
      'Dropping the topic is fast and natural; repeating it is more emphatic. Both are correct.',
      [
        { target: '很好吃.', note: 'minimal natural answer when the topic is obvious from the question' },
        { target: '中国菜很好吃.', note: 'full-sentence answer; slightly more emphatic, also natural' },
      ],
      [ACT.grammarHow],
    ),
    createContentItem(
      'Soft contrast with 但是 / 不过',
      'dànshì / bùguò',
      'For balanced opinions, join two clauses with 但是 (dànshì, "but") or its softer cousin 不过 (bùguò, "however / but / though"). 不过 sounds gentler and more conversational; 但是 is the neutral default. Pair with 有点儿 to hedge the negative side.',
      'sentence',
      '中国菜很好吃，但是有点儿辣. — 这里的天气不错，不过冬天有点儿冷.',
      'Compliment first, hedge second — the canonical polite Chinese opinion shape.',
      [
        { target: '但是 dànshì', note: 'standard "but"; works in any register' },
        { target: '不过 bùguò', note: 'softer "however"; common in conversation; carries a gentler hedge feel' },
        { target: '有点儿 in the second clause', note: 'placing 有点儿 before the negative adjective preserves face' },
      ],
      [ACT.grammarHow],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar II: 喜欢
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '喜欢 + noun',
      'xǐhuan + N',
      'Use 喜欢 + noun for liking objects, foods, places, people. Subject + 喜欢 + noun is the basic shape. Unlike English, Chinese has no separate "love/like/enjoy" hierarchy — 喜欢 covers all moderate-to-strong positive preferences; 非常喜欢 strengthens it; 爱 (ài, "love") is reserved for romantic love or strong emotional attachment.',
      'sentence',
      '我喜欢中国菜. — 我非常喜欢饺子. — 她喜欢北京.',
      'A single verb 喜欢 + a single noun — no possessive, no particle. The simplest preference shape in Mandarin.',
      [
        { target: '我喜欢 + N', note: 'first-person preference; "I like N"' },
        { target: '非常喜欢 / 很喜欢', note: 'strengthened preference; the degree word goes before 喜欢' },
        { target: '爱 vs 喜欢', note: '爱 is much stronger and more emotional; do NOT use 我爱中国菜 unless you really mean it — 喜欢 is the safe default' },
      ],
      [ACT.grammarLike],
    ),
    createContentItem(
      '喜欢 + verb (no -ing)',
      'xǐhuan + V',
      'CRITICAL: To say "I like doing X", use 喜欢 + the bare verb. Chinese verbs do NOT change form — there is no -ing, no infinitive marker, nothing to add. The verb sits as the object of 喜欢, identical to its dictionary form.',
      'sentence',
      '我喜欢学中文. ("I like studying Chinese.") — 我喜欢吃饺子. ("I like eating dumplings.") — 我喜欢看中国电影. ("I like watching Chinese movies.")',
      'English learners often try to add -ing equivalents or some marker — Mandarin needs nothing extra. The bare verb is correct.',
      [
        { target: '我喜欢学中文', note: '"I like studying Chinese" — bare verb 学; no -ing needed' },
        { target: '我喜欢吃 + food', note: 'general preference for eating a food; use bare 吃 + the food noun' },
        { target: '我喜欢看电影', note: '"I like watching movies"; bare 看 + 电影' },
      ],
      [ACT.grammarLike],
    ),
    createContentItem(
      '不喜欢 vs 讨厌',
      'bù xǐhuan vs tǎoyàn',
      'Two negative preference verbs with different intensities. 不喜欢 (bù xǐhuan) is "don\'t like" — gentle, the safe default. 讨厌 (tǎoyàn) is "hate / find annoying" — strong, can sound rude or dramatic if overused. Most opinion situations call for 不喜欢 + hedge; reserve 讨厌 for genuinely strong dislikes.',
      'sentence',
      '我不喜欢辣的菜. (gentle) vs 我讨厌堵车. (strong "I hate traffic jams")',
      'A wrong-intensity 讨厌 about your host\'s food choice would damage the relationship; 不喜欢 + 有点儿 + reason is the polite path.',
      [
        { target: '不喜欢 (gentle)', note: '"don\'t like"; safe default for any negative preference' },
        { target: '讨厌 (strong)', note: '"hate / find annoying"; appropriate for impersonal frustrations (traffic, noise) but NEVER for a person\'s food or hospitality' },
        { target: '不太喜欢 (softest)', note: 'literally "don\'t very-much like"; the gentlest negative — perfect for politely declining a recommendation' },
      ],
      [ACT.grammarLike],
    ),
    createContentItem(
      'Asking preference: 你喜欢…吗?',
      'asking with 吗',
      'Form a preference question by adding 吗 (ma) at the end of a 喜欢 statement. Word order does NOT change. Alternative: A-not-A form 喜欢不喜欢 (xǐhuan bù xǐhuan) — slightly more emphatic, same meaning.',
      'sentence',
      '你喜欢中国菜吗? — 你喜欢不喜欢辣的菜? — 你最喜欢什么?',
      'Three question shapes: 吗 question (yes/no), A-not-A (emphatic yes/no), and 什么 (what — for open-ended preference).',
      [
        { target: '你喜欢…吗?', note: 'standard yes/no preference question' },
        { target: '你喜欢不喜欢…?', note: 'A-not-A form; equivalent meaning, slightly more emphatic, slightly more spoken' },
        { target: '你最喜欢什么?', note: '"what do you like most?"; 最 (zuì) = "most" — for open preferences' },
      ],
      [ACT.grammarLike],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar III: Intensifiers
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '很 — the neutral linker',
      'hěn — neutral degree word',
      'CRITICAL: In positive adjective predicates, 很 is the unmarked default linker, NOT a "very" intensifier. 我很好 means "I am well", not "I am very well". Bare 我好 sounds incomplete or implies an unstated contrast. Mandarin grammar requires SOMETHING in this slot; 很 is the safe choice that adds no real emphasis.',
      'sentence',
      '我很好. ("I am well.") — 这里的天气很好. ("The weather here is good.") — 这本书很有意思. ("This book is interesting.")',
      'Most learners over-translate 很 as "very" — it is actually closer to the English copula\'s adjective slot than to a real intensifier.',
      [
        { target: '很 + adj (default)', note: 'no real "very" meaning; just the required linker in a positive predicate' },
        { target: 'bare adj (incomplete)', note: '我好 alone sounds half-finished or contrastive; usually wrong as a standalone statement' },
        { target: '不 + adj (negative)', note: 'in negatives 很 is dropped: 不好 (not 不很好)' },
      ],
      [ACT.grammarIntensifiers],
    ),
    createContentItem(
      '非常 — genuine "very"',
      'fēicháng — strong intensifier',
      '非常 (literally "not-ordinary") is the real "very" — use it when you actually mean to emphasize. Two syllables, more deliberate than 很. Place before the adjective: 非常好, 非常贵, 非常喜欢. Works in formal and informal speech.',
      'sentence',
      '中国文化非常有意思. — 这个菜非常好吃. — 北京的物价非常贵.',
      'A step up from 很 in real emphasis; one of the most useful intensifiers to learn early.',
      [
        { target: '非常 + adj', note: 'real "very" — use when you mean it' },
        { target: '非常 + 喜欢', note: 'works before verbs too: 非常喜欢 = "really like"' },
        { target: '非常 vs 很', note: '很 is the default unmarked linker; 非常 adds real emphasis' },
      ],
      [ACT.grammarIntensifiers],
    ),
    createContentItem(
      '真 — emotional "really!"',
      'zhēn — exclamatory intensifier',
      '真 carries surprise, admiration, or emotional reaction — closer to English "really!" or "what a…!". Slightly more casual than 非常. Often paired with a slight rising tone: 真好! ("That\'s really great!"). 真 is more spoken than written.',
      'sentence',
      '这个菜真好吃! — 北京的故宫真漂亮! — 你的中文真好!',
      'Use when you have a genuine emotional reaction; sounds more enthusiastic than 非常.',
      [
        { target: '真 + adj + (了/啊)', note: 'often used with closing particles like 啊/了 for an exclamation feel' },
        { target: '真好 / 真贵 / 真累', note: 'each one carries surprise or emotional reaction' },
        { target: '真 vs 非常', note: '真 is exclamatory and emotional; 非常 is factual emphasis' },
      ],
      [ACT.grammarIntensifiers],
    ),
    createContentItem(
      '太…了 — "too / excessively"',
      'tài…le — excessive intensifier',
      'CRITICAL: 太 + adjective + 了 means "too / excessively" — it implies something exceeds what is okay or comfortable. The 了 at the end is OBLIGATORY in this pattern; leaving it off is one of the most common learner errors. Use for genuine complaints (too hot, too spicy, too expensive) — NOT as a synonym for 非常.',
      'sentence',
      '太辣了! ("Too spicy!") — 太贵了! ("Too expensive!") — 今天太热了，我们待在宿舍吧.',
      'English "too" and Chinese 太…了 align almost perfectly: both carry a complaint or warning, not a neutral emphasis.',
      [
        { target: '太 + adj + 了', note: 'the full obligatory pattern; the 了 is non-optional' },
        { target: '太 vs 很 / 非常', note: '太 implies excess (negative); 很/非常 are neutral or positive intensifiers' },
        { target: 'positive use of 太…了', note: 'occasionally positive: 太好了! ("Great!") — but the default reading is "excessive/uncomfortable"' },
      ],
      [ACT.grammarIntensifiers],
    ),
    createContentItem(
      '有点儿 — polite negative hedge',
      'yǒudiǎnr — softener',
      'CRITICAL: 有点儿 (or non-儿化 有一点) goes BEFORE an adjective ONLY for mildly negative opinions — "a bit too…" with an implicit complaint. 有点儿辣 ("a bit spicy" = slightly uncomfortable). It does NOT fit positive adjectives: 有点儿好吃 is WRONG. For positive "a little", use the post-adjective 一点 — 好吃一点 ("a bit more delicious"). This pre/post split trips up every learner.',
      'sentence',
      '✓ 这个菜有点儿辣. ("This dish is a bit spicy" — implicit complaint)\n✗ 这个菜有点儿好吃. (WRONG — positive adjective)\n✓ 我想要辣一点. ("I want it a bit spicier" — positive request, different slot)',
      'The single most useful politeness tool for foreign learners — without it, every negative opinion sounds blunt.',
      [
        { target: '有点儿 + negative adj (correct)', note: 'BEFORE the adjective; carries an implicit mild complaint' },
        { target: '有点儿 + positive adj (wrong)', note: 'never used with positive adjectives; sounds nonsensical' },
        { target: 'adj + 一点 (post-position)', note: 'for "a bit more X" in a positive request or comparison — different slot, different meaning' },
      ],
      [ACT.grammarIntensifiers],
    ),
    createContentItem(
      'Calibration ladder',
      'positive ↔ negative scale',
      'A single adjective can be placed on a calibration ladder from very positive to very negative just by swapping the degree word. Mastering this ladder lets you tune any opinion to fit the social situation without changing the adjective.',
      'sentence',
      '这个菜: 非常好吃 (very) → 很好吃 (default) → 还可以 (so-so) → 不太好吃 (gentle neg) → 有点儿不好吃 (polite neg) → 太难吃了 (excessive)',
      'Same noun (the dish), six different opinion intensities — pick by social context, not by what you literally feel.',
      [
        { target: '非常 / 很 (strong → neutral positive)', note: 'positive ladder; 很 is the safe default' },
        { target: '还可以 hái kěyǐ', note: '"it\'s okay" — the polite middle when you have no strong opinion or want to dodge' },
        { target: '不太 + adj / 有点儿 + adj', note: 'soft negatives; 不太 is gentlest, 有点儿 adds mild complaint' },
        { target: '太 + adj + 了', note: 'strongest negative excess; reserve for genuine "I cannot handle this"' },
      ],
      [ACT.grammarIntensifiers],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '我的第一个月',
      'wǒ de dì yī gè yuè',
      'A first-person impressions paragraph from a foreign student one month into life at Tsinghua. Read it aloud with correct tones, then answer the four comprehension questions below. The paragraph models every Unit 5 grammar point in natural rhythm.',
      'sentence',
      '我叫阿米拉，从印度来。来清华大学一个月了。北京的天气有点儿热，但是我习惯了。中国菜非常好吃，我特别喜欢饺子和火锅。火锅有点儿辣，不过味道真好. 中国人很友好，老师也很有耐心。我的中文课有点儿难，但是同学常常帮我。我刚学会用微信支付，太方便了! 我很喜欢这里的生活。',
      'Translation: "My name is Amira, I came from India. I have been at Tsinghua one month. Beijing weather is a bit hot, but I am getting used to it. Chinese food is very delicious — I especially like dumplings and hot pot. Hot pot is a bit spicy, but the flavor is really great. Chinese people are friendly, teachers are also patient. My Chinese class is a bit hard, but my classmates often help me. I just learned to use WeChat Pay — so convenient! I really like life here."',
      [
        { target: '来清华大学一个月了', note: '"have been at Tsinghua for one month" — the 了 marks the completed-and-continuing duration' },
        { target: '有点儿热，但是…习惯了', note: 'polite hedge pattern: soft complaint + adaptation note' },
        { target: '特别喜欢 tèbié xǐhuan', note: '"especially like"; 特别 (tèbié) = "especially" — slightly stronger than 非常喜欢' },
        { target: '不过味道真好', note: '"but the flavor is really great" — 不过 softens the contrast; 真 adds emotion' },
        { target: '老师也很有耐心', note: '"teachers are also patient"; 有耐心 (yǒu nàixīn) = "have patience" — noun-phrase predicate, not an adjective' },
        { target: '太方便了', note: 'classic 太…了 in a POSITIVE exclamation — "so convenient!" — one of the few positive uses of 太…了' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '阅读理解',
      'yuèdú lǐjiě',
      'Four comprehension questions matching the paragraph. Answer each in a short Chinese sentence using opinion patterns from Unit 5 — no need for full English-style complete sentences; topic-fronted Mandarin replies are natural.',
      'sentence',
      'Q1: 阿米拉从哪里来? Q2: 北京的天气怎么样? Q3: 阿米拉喜欢什么菜? Q4: 她的中文课怎么样?',
      'Cover origin, weather opinion, food preference, and study opinion — all Unit 5 topics.',
      [
        { target: 'A1: 她从印度来.', note: 'origin answer; "she came from India"' },
        { target: 'A2: 有点儿热. (or: 北京的天气有点儿热.)', note: 'hedged answer; mirrors the paragraph\'s 有点儿 pattern' },
        { target: 'A3: 她喜欢饺子和火锅.', note: 'preference answer using 喜欢 + N + N; 和 (hé) = "and" for nouns' },
        { target: 'A4: 有点儿难，但是同学常常帮她.', note: 'balanced opinion answer; covers hedge + contrast — model Unit 5 reply shape' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Listening & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '交换感受 (对话)',
      'jiāohuàn gǎnshòu (duìhuà)',
      'A natural 4-turn opinion exchange between two students at Tsinghua. Covers all Unit 5 patterns: 怎么样 question, calibrated adjective reply, 喜欢 preference, polite hedge, and balanced opinion with 但是.',
      'conversation',
      'A: 你来中国一个月了，中国生活怎么样?\nB: 挺好的! 北京真热闹，我很喜欢这里. 不过空气有点儿不好.\nA: 中国菜呢? 你习惯了吗?\nB: 非常喜欢! 饺子太好吃了. 火锅有点儿辣，但是味道很棒.\nA: 中文学习怎么样? 难不难?\nB: 有点儿难，不过老师很有耐心，同学也常常帮我.\nA: 太好了! 你适应得很快.',
      'Notice the natural rhythm: positive opener → hedged negative → preference statement → balanced opinion. Each reply uses two or more Unit 5 patterns.',
      [
        { target: '挺好的 tǐng hǎo de', note: 'colloquial "pretty good"; softer than 很好, very common in casual replies' },
        { target: '不过空气有点儿不好', note: 'classic polite hedge — 不过 + 有点儿 + negative adj; the gentlest way to mention air pollution' },
        { target: '太好吃了', note: 'positive use of 太…了 = enthusiastic "so delicious!"; one of the few positive 太…了 phrases' },
        { target: '难不难?', note: 'A-not-A question form; equivalent to 难吗? but slightly more spoken' },
        { target: '适应得很快 shìyìng de hěn kuài', note: '"adapting very quickly"; 适应 (shìyìng) is the formal verb for "adapt" — common in adjustment contexts' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      '你的版本',
      'nǐ de bǎnběn',
      'Now perform the same dialogue using your OWN real opinions about life in China. Keep B\'s structure (positive opener + hedge + preference + balanced opinion + adaptation note) but swap in your own food, weather, and study details.',
      'conversation',
      'A: 你来中国一个月了，中国生活怎么样?\nB (你): [挺好的 / 还可以 + 你最喜欢的事]\nA: 中国菜呢?\nB (你): [喜欢的菜 + 有点儿 + 一个小问题]\nA: 中文学习呢?\nB (你): [难度 + 老师/同学的支持]\nA: 太好了! 你适应得很快.',
      'Three opportunities to practice — pick three genuine opinions and calibrate each one to sound polite and natural.',
      null,
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '写作模板',
      'xiězuò múbǎn',
      'A reusable five-sentence template for any first-impressions paragraph in Mandarin. Fill the bracketed slots with your own information — the structure carries the Unit 5 grammar.',
      'sentence',
      '我叫 [名字]，从 [国家] 来。来中国 [时间] 了。这里的 [话题1] 很 [形容词]，我非常喜欢。[话题2] 有点儿 [形容词]，但是我习惯了。我特别喜欢 [具体食物或活动]。我很喜欢中国生活!',
      'Five sentences cover the core: introduction + duration + positive opinion + hedged opinion + specific preference + closing — the minimum complete impressions paragraph.',
      [
        { target: '[国家]', note: 'your country using the country + 人 pattern from Unit 1 (e.g., 从印度来, 从美国来)' },
        { target: '[时间] 了', note: 'duration with 了 — 一个月了 / 三个星期了 / 半年了' },
        { target: '[话题1] 很 + 形容词', note: 'positive opinion using a Unit 5 adjective from Activity 3' },
        { target: '[话题2] 有点儿 + 形容词', note: 'hedged negative opinion; pair with 但是/不过 + 习惯了 for politeness' },
        { target: '[具体食物或活动]', note: 'name a specific dish or activity — generic statements are weaker than specific examples (饺子 > 中国菜)' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '写作练习',
      'xiězuò liànxí',
      'Write your own 4–5 sentence impressions paragraph in Hanzi. Use at least one 喜欢 + noun, one 有点儿 + adjective, and one 太…了 — so the writing demonstrates the core Unit 5 grammar. Read it aloud when finished.',
      'sentence',
      '示例: 我叫卡洛斯，从巴西来。来清华大学一个月了。北京的天气有点儿干，但是我习惯了。中国菜非常好吃，我特别喜欢饺子。微信支付太方便了! 我很喜欢这里的生活。',
      'Translation: "My name is Carlos, from Brazil. I have been at Tsinghua one month. Beijing weather is a bit dry, but I am getting used to it. Chinese food is very delicious — I especially like dumplings. WeChat Pay is so convenient! I really like life here."',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '面子 — preserving face in opinions',
      'miànzi — face in conversation',
      'The concept of 面子 ("face" — public reputation and social dignity) shapes how Mandarin speakers share opinions. Direct strong negatives — "I don\'t like it", "it tastes bad", "it\'s too expensive" — can make the listener feel they have lost face, especially when the listener recommended the thing. The polite path: open with a compliment, then hedge any criticism with 有点儿.',
      'sentence',
      'BLUNT (avoid): 这个菜很难吃，我不喜欢.\nPOLITE: 这个菜味道挺好的，就是有点儿辣，我可能吃不了太辣的.',
      'The polite version: praise the flavor + hedge the spice + explain that YOU specifically cannot handle it — three layers of face-preservation in one sentence.',
      [
        { target: '挺好的 + 就是有点儿…', note: 'compliment-first + small-exception pattern — the canonical face-saving shape' },
        { target: '我可能… wǒ kěnéng…', note: '"I might/perhaps" — frames the problem as YOUR limitation, not the food\'s defect' },
        { target: '吃不了 chī bu liǎo', note: '"cannot eat / handle"; a potential-complement structure that politely says "this exceeds my capacity"' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '别用 讨厌',
      'bié yòng tǎoyàn',
      '讨厌 ("hate / find annoying") is a real word but its strength rarely matches the situation a foreign student encounters. Saying 我讨厌中国菜 will offend; saying 我讨厌堵车 ("I hate traffic jams") is fine because traffic is impersonal. Default rule: NEVER use 讨厌 about food, people, places, or anything someone is proud of. Use 不喜欢 + reason instead.',
      'sentence',
      '✓ 我讨厌堵车. (impersonal — fine)\n✗ 我讨厌火锅. (personal recommendation — rude)\n✓ 火锅有点儿辣，我可能不太喜欢. (polite alternative)',
      'When in doubt, downgrade: 讨厌 → 不喜欢 → 不太喜欢 → 不是很喜欢. Lower intensities are always safer with strangers.',
      [
        { target: '讨厌 + impersonal (ok)', note: 'traffic, weather extremes, generic noise — abstract frustrations are fine' },
        { target: '讨厌 + personal (avoid)', note: 'food someone recommended, hospitality, places associated with your host — never use 讨厌' },
        { target: '不太喜欢 / 不是很喜欢', note: 'the safe gentle alternatives; both literally mean "do not very-much like"' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '客气 — being modest with compliments',
      'kèqi — polite modesty',
      'Mandarin culture rewards modesty when receiving a compliment. A direct "thank you" sounds slightly arrogant to traditional ears. Common modest responses: 哪里哪里 (nǎli nǎli, "where, where?" — deflect the praise), 还差得远 (hái chà de yuǎn, "still far from it"), 过奖了 (guòjiǎng le, "you flatter me"). With younger speakers, plain 谢谢 is increasingly fine — but knowing the modest forms makes you sound culturally aware.',
      'sentence',
      'A: 你的中文真好! — B: 哪里哪里，还差得远.',
      'The 哪里哪里 response is a classic — younger Chinese speakers may not use it themselves but always recognize it appreciatively from a foreigner.',
      [
        { target: '哪里哪里 nǎli nǎli', note: 'literal "where, where?"; deflects praise — the most famous modest response' },
        { target: '还差得远 hái chà de yuǎn', note: '"still far from there"; modestly claims you are not at that level yet' },
        { target: '过奖了 guòjiǎng le', note: '"you over-praise me"; slightly more formal; common in academic/professional contexts' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '先夸后说',
      'xiān kuā hòu shuō',
      'A practical rule: ALWAYS open any sensitive opinion with a compliment, then introduce the criticism. The compliment-first shape is so reliable that Chinese speakers expect it — a criticism without a compliment opener can sound jarring even if everything you say is technically true. Useful with hosts, professors, classmates\' choices, and travel recommendations.',
      'sentence',
      'BAD: 这个宿舍有点儿小. (just the criticism)\nGOOD: 这个宿舍挺干净的，就是有点儿小，不过我习惯了. (compliment + hedge + adaptation note)',
      'The three-part shape — compliment + hedge + adaptation — is the most useful conversational pattern in Unit 5.',
      [
        { target: '挺 + adj + 的 (compliment)', note: 'opener; gentle positive opinion on something true and complimentary' },
        { target: '就是有点儿 + adj (hedge)', note: 'middle; the actual criticism, softened to its mildest form' },
        { target: '不过我习惯了 (adaptation)', note: 'closing; signals you are adjusting and not asking for change — closes the loop face-safely' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '任务: 中国第一个月',
      'rènwù: Zhōngguó dì yī gè yuè',
      'Roleplay with the AI tutor playing a Chinese friend at Tsinghua asking how your first month has been. Use every Unit 5 skill in one continuous scene — 怎么样 question handling, calibrated adjective replies, 喜欢 preferences, polite 有点儿 hedges, and at least one compliment-first criticism.',
      'conversation',
      '[Lunch at Tsinghua canteen]\n朋友: 你来中国一个月了! 生活怎么样?\n你: [开头 + 一个积极的观点]\n朋友: 真的吗? 中国菜呢? 你习惯了吗?\n你: [你最喜欢的菜 + 有点儿 hedge + 但是]\n朋友: 北京的天气怎么样?\n你: [天气意见 + 适应说明]\n朋友: 你的中文课呢? 难不难?\n你: [学习意见 + 同学/老师的支持]\n朋友: 那你最喜欢中国的什么?\n你: [一个具体的喜好 + 太…了 enthusiastic 表达]\n朋友: 听起来你适应得很好! 加油!',
      'Six turns of fluent exchange; the AI tutor will respond naturally to whatever you say.',
      [
        { target: '开头', note: '挺好的 / 非常好 / 我很喜欢 — pick the opener that matches your real feeling' },
        { target: '喜欢的菜 + 有点儿 hedge', note: '我喜欢…，就是有点儿… — the compliment-first + small-exception shape' },
        { target: '天气意见 + 适应', note: '北京的天气…，但是我习惯了 — pair every weather complaint with an adaptation note' },
        { target: '学习意见', note: '中文有点儿难，但是… — the canonical hedged-but-positive study opinion' },
        { target: '太…了 enthusiastic', note: '太方便了 / 太好吃了 / 太有意思了 — closing with positive 太…了 leaves a strong warm impression' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战 — 委婉表达不满',
      'tiǎozhàn — wěiwǎn biǎodá bùmǎn',
      'Stretch goal: in the same scene, your friend recommends a famously spicy Sichuan restaurant that you cannot handle. Politely decline using the compliment-first + face-saving pattern from the culture note — without using 讨厌 or any blunt negative.',
      'conversation',
      '朋友: 这个周末我们去吃四川火锅吧! 那家店非常有名!\n你: 听起来真不错! 不过我可能吃不了太辣的，四川菜是不是有点儿辣?\n朋友: 哈哈，是的，非常辣! 那我们去吃北京菜，怎么样?\n你: 太好了! 谢谢你!',
      'Notice the structure: enthusiastic acknowledgment (听起来真不错) + your limitation (我可能吃不了太辣的) + softening question (是不是有点儿辣?) — three layers of politeness in one short turn.',
      [
        { target: '听起来真不错!', note: '"sounds really nice!"; opens with enthusiasm before any hesitation — the obligatory compliment opener' },
        { target: '我可能吃不了…', note: '"I might not be able to eat…"; frames the issue as YOUR limitation, never the restaurant\'s problem' },
        { target: '是不是有点儿辣?', note: 'a softened question — turning your concern into a polite inquiry instead of a direct refusal' },
        { target: '那我们去 + 替代方案', note: '"then let\'s go to [alternative]" — your friend offers an alternative; accept it warmly with 太好了' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
