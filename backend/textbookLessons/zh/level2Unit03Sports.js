// Level 2 Unit 3 — 体育的世界 (World of Sports) — Mandarin Chinese
// Thematic intermediate unit. Sports vocab, popular Chinese sports, Olympic
// medals, three grammar patterns (把 + ball + verb, V + 得 + degree complement,
// 越来越 + adjective), culture (国乒/国足/广场舞), and a Tsinghua task.
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
  orientation: 'zh-l2u3-orientation',
  pronunciation: 'zh-l2u3-pronunciation',
  vocabularyCore: 'zh-l2u3-vocab-core',
  vocabularySports: 'zh-l2u3-vocab-sports',
  vocabularyOlympics: 'zh-l2u3-vocab-olympics',
  grammarBa: 'zh-l2u3-grammar-ba',
  grammarDe: 'zh-l2u3-grammar-de',
  grammarYueLaiYue: 'zh-l2u3-grammar-yue-lai-yue',
  reading: 'zh-l2u3-reading',
  listening: 'zh-l2u3-listening',
  culture: 'zh-l2u3-culture',
  task: 'zh-l2u3-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Recap a Chinese sports match using score, team names, and a comparison — naming who scored, who won, and which player you root for.',
      'Use three intermediate grammar patterns: 把 + ball + verb (for play-by-play description), V + 得 + degree complement (to describe how well someone plays), and 越来越 + adjective (to describe improving or worsening skill).',
      'Discuss why 乒乓球 is China\'s national sport and why 国足 is the running joke of Chinese sports — the two cultural touchstones every Mandarin speaker references.',
    ],
    task: 'Picture sitting in a Tsinghua dorm common room with a Chinese classmate watching the CBA basketball final — by the end of this lesson you can hold up your side of the running commentary in Mandarin.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in sports vocabulary',
    goals: [
      'Pronounce the onomatopoeic 乒乓 (pīngpāng) cleanly — both syllables are first tone, mimicking the back-and-forth sound of a ping pong ball.',
      'Distinguish the third-tone 比 (bǐ) from the fourth-tone 赛 (sài) in 比赛 — the rhythm 3→4 is the standard match-vocabulary pattern.',
      'Handle the four-fall 教练 (jiàoliàn) — fourth + fourth tones; common error is softening the second syllable, which makes the word sound uncertain.',
    ],
    task: 'Read each pronunciation example aloud and identify which tones combine; replay any word where the tone contour collapses.',
  },
  {
    id: ACT.vocabularyCore,
    section: 'Vocabulary I',
    title: 'Match, score, result — the running-commentary vocabulary',
    goals: [
      'Use 16 sports-event nouns and verbs covering match (比赛), team (球队), player (选手 / 运动员), coach (教练), referee (裁判), fan (球迷), home/away (主场/客场), and result (赢/输/平/进球).',
      'Distinguish 选手 (general competitor in any sport or contest) from 运动员 (professional athlete, salaried, on a national or club roster) — register matters for who you call which.',
    ],
    task: 'Recap one match in three sentences: who played, what the score was, who scored the decisive goal — using at least five vocabulary items from this section.',
  },
  {
    id: ACT.vocabularySports,
    section: 'Vocabulary II',
    title: 'Popular Chinese sports — what people actually watch and play',
    goals: [
      'Name the 7 sports that dominate Chinese sporting culture: 乒乓球 (national sport), 羽毛球 (badminton), 篮球 (basketball — CBA), 足球 (soccer), 跳水 (diving), 体操 (gymnastics), 武术 (wushu / martial arts).',
      'Know which sports China is internationally dominant in (乒乓球, 跳水, 体操) versus where it has historically struggled (足球) — this asymmetry is core to how Chinese people talk about sport.',
    ],
    task: 'Pick one of the seven sports and tell a classmate (1) whether you watch it or play it, (2) one Chinese star associated with it, and (3) why you do or don\'t enjoy it.',
  },
  {
    id: ACT.vocabularyOlympics,
    section: 'Vocabulary III',
    title: 'Olympic medals and national pride',
    goals: [
      'Name the three medal levels (金牌 jīnpái / 银牌 yínpái / 铜牌 tóngpái) and the 奥运会 (Olympics) framework that organizes them.',
      'Understand the connotation of 金牌大国 ("gold medal great power") — a phrase Chinese media uses to celebrate China\'s consistent top-three Olympic finishes, especially in 乒乓球, 跳水, and 体操.',
    ],
    task: 'Pick a recent Olympic gold medalist from China and describe in two sentences which sport they won in and how the medal was reported domestically.',
  },
  {
    id: ACT.grammarBa,
    section: 'Grammar I',
    title: '把 + ball + verb — the play-by-play pattern',
    goals: [
      'Use the 把 (bǎ) construction to put the affected object before the verb: 把球踢进 ("kick the ball in"), 把球传给我 ("pass the ball to me"). Word order becomes Subject + 把 + Object + Verb + Result/Direction.',
      'Apply 把 specifically in sports descriptions where the ball or puck or shuttlecock is the affected object — this is the natural way to narrate scoring, passing, and play sequences.',
      'Know that 把 requires a definite, specific object and almost always a result complement (进 in, 出 out, 给…to-someone, 到…to-place) — bare verbs like 把球踢 are ungrammatical.',
    ],
    task: 'Write three play-by-play sentences using 把 + ball + verb + result: a goal, a pass, and a miss.',
  },
  {
    id: ACT.grammarDe,
    section: 'Grammar II',
    title: 'V + 得 + degree complement — how well/badly/fast someone plays',
    goals: [
      'Use 得 (de, neutral tone) after a verb to introduce a description of how the action is performed: 跑得很快 ("runs very fast"), 打得很好 ("plays very well"), 输得很惨 ("lost badly").',
      'Apply the pattern Subject + Verb + 得 + Degree Adverb + Adjective — the degree adverb (很 / 非常 / 特别 / 真) is usually required; bare V+得+adjective sounds incomplete.',
      'Use the negative form V+得 + 不 + adjective: 打得不好 ("plays badly"), 跑得不快 ("doesn\'t run fast") — note that the negation goes BEFORE the descriptive adjective, not before the verb.',
    ],
    task: 'Describe three Chinese athletes using V+得 patterns — one who plays well, one who plays fast, one who didn\'t perform well last match.',
  },
  {
    id: ACT.grammarYueLaiYue,
    section: 'Grammar III',
    title: '越来越 + adjective — more and more (skill progression)',
    goals: [
      'Use 越来越 (yuè lái yuè, "more and more") + adjective to express progressive change: 越来越好 ("better and better"), 越来越快 ("faster and faster"), 越来越累 ("more and more tired").',
      'Apply specifically to skill progression: 我的中文越来越好 ("my Chinese is getting better"), 这个球员越来越强 ("this player is getting stronger") — the standard way to describe improvement over time.',
      'Combine with verbs of change: 进步 (jìnbù, "progress") works with 越来越快 ("progressing faster and faster"); 退步 (tuìbù, "regress") works with 越来越严重 ("getting more and more serious").',
    ],
    task: 'Describe one Chinese sport that is growing in popularity and one player whose skill is improving — using 越来越 in each sentence.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'Why 乒乓球 is the national sport',
    goals: [
      'Read a short article about China\'s 乒乓球 dominance and the 国乒 (national table tennis team) phenomenon.',
      'Answer comprehension questions about the article using 把, V+得, and 越来越 patterns in your responses.',
    ],
    task: 'Read the article aloud once, then explain in three sentences why 乒乓球 became China\'s national sport and what 国乒 means to Chinese fans.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'Two Tsinghua students watching the CBA final',
    goals: [
      'Follow a 6-turn conversation between two students reacting to a CBA basketball game in real time — recognize the running-commentary register.',
      'Reproduce the conversation with your own preferred sport, swapping in the relevant team names and player references.',
    ],
    task: 'Listen to the AI tutor read the conversation, then perform your own version watching a different sport (soccer / badminton / ping pong).',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: '国乒, 国足, 体育生, and 广场舞 — China\'s sporting paradoxes',
    goals: [
      'Understand the contrast between 国乒 (the table tennis team — China\'s most-decorated and most-loved national team) and 国足 (the men\'s soccer team — the punchline of Chinese sports humor for two decades).',
      'Know what 体育生 (student-athlete) means in the Chinese university system — a specialized admissions track where elite athletes can enter top universities like Tsinghua with reduced academic scores.',
      'Recognize the everyday split between 健身房 (gym culture — younger, urban, fitness-focused) and 广场舞 (grandma plaza dancing — older, communal, evening parks) as two different generations\' approaches to staying active.',
    ],
    task: 'Pick the sport-culture phenomenon that most surprises you and explain it back to the AI tutor in two or three Mandarin sentences.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'Discuss a Chinese sport with your Tsinghua classmate',
    goals: [
      'Hold a 6-turn conversation about a specific Chinese sport: what you watch, what you play, who you root for, what you want to learn next.',
      'Use all three grammar patterns (把 + ball + verb, V + 得 + degree, 越来越 + adjective) plus at least 8 vocabulary items in one continuous exchange.',
    ],
    task: 'Roleplay with the AI tutor playing a Tsinghua classmate; they will ask you about Chinese sports, and you will respond using the lesson\'s grammar and vocabulary.',
  },
];

const lesson = {
  title: 'Level 2 · Unit 3: 体育的世界 — World of Sports',
  category: 'daily-life',
  difficulty: 'intermediate',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'recapping-match', label: 'Recapping a match', goal: 'Summarize who played, the score, and the decisive moment using sports vocabulary and the 把 + ball + verb pattern.' },
    { id: 'describing-skill', label: 'Describing how someone plays', goal: 'Use V + 得 + degree complement (e.g., 打得很好, 跑得很快) to describe an athlete\'s performance in concrete terms.' },
    { id: 'describing-improvement', label: 'Describing improvement over time', goal: 'Use 越来越 + adjective to describe a sport\'s rising popularity or a player\'s improving skill.' },
    { id: 'discussing-favorites', label: 'Discussing your favorite sport', goal: 'Tell a Chinese classmate which sport you watch or play, who you support, and why — using register-appropriate vocabulary.' },
  ],
  relatedPools: ['topic-society', 'topic-daily-life'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '本课目标',
      'běn kè mùbiāo',
      'By the end of this lesson, you can recap a sports match in Mandarin, describe how a player performs, and discuss why certain Chinese sports — especially 乒乓球 — are cultural icons. The toolkit is three grammar patterns plus the vocabulary to drive them.',
      'word',
      'Functions: 比赛回顾 bǐsài huígù (match recap) · 球员评价 qiúyuán píngjià (player evaluation) · 体育文化讨论 tǐyù wénhuà tǎolùn (sports culture discussion)',
      'These three functions are the backbone of every casual sports conversation in Mandarin — once they\'re automatic, you can sustain a 10-minute match-watching commentary.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      '真实场景',
      'zhēnshí chǎngjǐng',
      'You\'re in the Tsinghua University common room on Friday night with a Chinese classmate, watching the CBA basketball finals. The classmate is yelling at the screen and turns to you for reactions — you need to hold your side of the running commentary.',
      'word',
      '同学: "你看! 他把球扣进去了! 这个球员越来越厉害!"',
      'A typical CBA-watching reaction: 把 + ball + verb-with-result for the play, then 越来越 + adjective for the assessment.',
      [
        { target: '把球扣进去 bǎ qiú kòu jìnqù', note: '"dunked the ball in" — 把 + 球 + verb-with-direction-complement; the standard play-by-play structure' },
        { target: '越来越厉害 yuè lái yuè lìhai', note: '"getting more and more impressive" — 越来越 + adjective; the standard "improving over time" assessment' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '体育的两面',
      'tǐyù de liǎngmiàn',
      'Chinese sports culture has two contrasting faces: the gold-medal machine (奥运金牌 / 国乒 / 跳水 dominance) and the popular grumbling about 国足 (national men\'s soccer team). Holding both at once is what makes you sound like a real Mandarin sports fan, not a textbook reader.',
      'word',
      '国乒 (the national table tennis team — beloved, dominant) vs 国足 (the national soccer team — punchline of every joke)',
      'Mainland sports talk constantly oscillates between national-team pride and self-deprecating jokes about 国足 — both registers are required.',
      [
        { target: '金牌大国 jīnpái dàguó', note: '"gold medal great power" — proud framing of China\'s Olympic performance' },
        { target: '国乒 guópīng', note: 'short for 国家乒乓球队 (national table tennis team); shorthand any fan recognizes' },
        { target: '国足 guózú', note: 'short for 国家足球队 (national soccer team); often said with a sigh' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '乒乓',
      'pīngpāng',
      'Onomatopoeic word imitating the sound of a ping pong ball bouncing — both syllables are first tone (high level), mirroring the steady, sharp tac-tac rhythm. The full word 乒乓球 (pīngpāng qiú, "ping pong ball / table tennis") adds the second-tone 球.',
      'word',
      '乒乓球是中国的国球。Pīngpāng qiú shì Zhōngguó de guóqiú. ("Table tennis is China\'s national sport.")',
      'Hold both syllables high and level — letting either one fall makes the word sound mushy.',
      [
        { target: '乒 pīng', note: 'first tone — high, level; mimics the sharp "tac" sound of contact' },
        { target: '乓 pāng', note: 'first tone — high, level; mimics the return sound; the word itself sounds like the game' },
        { target: '球 qiú', note: 'second tone — rising; means "ball"; combined gives 乒乓球' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '比赛',
      'bǐsài',
      'The most common sports word in this unit — 比 (3rd tone, "compare") + 赛 (4th tone, "compete/race"). The 3→4 contour is the standard rhythm: dip-and-rise on 比, sharp fall on 赛. Common error: flattening 比 to 2nd tone, which makes it sound like a question.',
      'word',
      '今晚有一场重要的比赛。Jīnwǎn yǒu yī chǎng zhòngyào de bǐsài. ("There is an important match tonight.")',
      'The 3+4 rhythm appears in many sports compounds (赛场 sàichǎng, 决赛 juésài, 半决赛 bànjuésài).',
      [
        { target: '比 bǐ (3rd)', note: 'third tone — dip then rise; in isolation it sounds like "bee" with a U-shaped pitch' },
        { target: '赛 sài (4th)', note: 'fourth tone — sharp fall from high to low; the "competition" element' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '教练',
      'jiàoliàn',
      '"Coach" — both syllables are fourth tone (sharp fall). The four-fall sequence is one of the most authoritative-sounding combinations in Mandarin, fitting the coach role. Common error: softening the second 练 to a half-falling pitch, which weakens the word.',
      'word',
      '我们的教练很严格。Wǒmen de jiàoliàn hěn yángé. ("Our coach is very strict.")',
      'Two crisp falling tones — say each one with full commitment to the drop.',
      [
        { target: '教 jiào (4th)', note: 'fourth tone — sharp fall; "to teach / instruct"' },
        { target: '练 liàn (4th)', note: 'fourth tone — sharp fall; "to train / practice"' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '裁判',
      'cáipàn',
      '"Referee / umpire" — second tone (rising) + fourth tone (falling). The 2→4 contour rises then drops sharply, like a whistle followed by a decision. Often used as both noun ("the referee") and a verb ("to judge / officiate").',
      'word',
      '裁判判了一个点球。Cáipàn pànle yī gè diǎnqiú. ("The referee called a penalty kick.")',
      'The 2+4 rhythm: glide UP on 裁, then sharply DOWN on 判 — like a referee\'s whistle followed by a verdict.',
      [
        { target: '裁 cái (2nd)', note: 'second tone — mid-to-high rise; means "to judge / cut"' },
        { target: '判 pàn (4th)', note: 'fourth tone — sharp fall; means "to decide / rule"' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '进球',
      'jìnqiú',
      '"Score a goal" — fourth tone (sharp fall on 进, "enter") + second tone (rising on 球, "ball"). The 4→2 rhythm is the goal-scoring melody itself: the decisive strike (fall) followed by the celebration (rise).',
      'word',
      '他在最后一分钟进了一个球! Tā zài zuìhòu yī fēnzhōng jìnle yī gè qiú! ("He scored in the last minute!")',
      'Sports commentators stretch out the 进 in real broadcasts — listen for the elongated "JÌÌÌN" before 球.',
      [
        { target: '进 jìn (4th)', note: 'fourth tone — sharp fall; means "to enter (the goal)"' },
        { target: '球 qiú (2nd)', note: 'second tone — rising; means "ball" — the rising tone matches the celebration' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Match, score, result
    // ────────────────────────────────────────────────────────────────────
    createContentItem('体育', 'tǐyù', 'Sports / physical education as a domain — both the academic subject (体育课 PE class) and the broader field (体育新闻 sports news). Slightly more formal than the colloquial 运动 (yùndòng, "exercise / movement").', 'word', '清华大学的体育课很丰富。Qīnghuá dàxué de tǐyù kè hěn fēngfù.', '"Tsinghua University\'s PE classes are very varied" — typical academic-context use.', null, [ACT.vocabularyCore]),
    createContentItem('比赛', 'bǐsài', 'A match or competition — any organized contest with rules, opponents, and an outcome. Used for sports, debate competitions, talent shows. Use measure word 场 (chǎng) for a single match: 一场比赛.', 'word', '今晚有一场篮球比赛。Jīnwǎn yǒu yī chǎng lánqiú bǐsài.', '"There\'s a basketball match tonight" — standard event announcement.', null, [ACT.vocabularyCore]),
    createContentItem('球队', 'qiúduì', 'A ball-sport team — soccer, basketball, baseball, volleyball, etc. The 球 (ball) marks it as ball-sport specific; for non-ball sports use just 队 (duì, team) or sport-specific compounds.', 'word', '我们球队今年表现很好。Wǒmen qiúduì jīnnián biǎoxiàn hěn hǎo.', '"Our team has performed well this year" — possessive 我们 with no 的 conveys close belonging.', null, [ACT.vocabularyCore]),
    createContentItem('选手', 'xuǎnshǒu', 'A competitor in any contest — sports, debate, music, cooking. Broader than 运动员 because it includes amateur and non-professional competitors. Common in tournament contexts: 参赛选手 (participating competitors).', 'word', '这位选手代表中国参加比赛。Zhèi wèi xuǎnshǒu dàibiǎo Zhōngguó cānjiā bǐsài.', '"This competitor represents China in the match" — formal sports broadcast register.', null, [ACT.vocabularyCore]),
    createContentItem('运动员', 'yùndòngyuán', 'A professional or semi-professional athlete — salaried, on a national or club roster, often a full-time sports career. Narrower than 选手; you\'d call an Olympian 运动员 but a school-tournament competitor 选手.', 'word', '他是国家队运动员。Tā shì guójiā duì yùndòngyuán.', '"He\'s a national-team athlete" — the highest tier of 运动员.', null, [ACT.vocabularyCore]),
    createContentItem('教练', 'jiàoliàn', 'Coach — the person who trains the team and calls strategy. Used as both noun ("the coach") and address form (王教练 = Coach Wang). The four-fall pronunciation gives the word an authoritative ring.', 'word', '王教练是我们的精神领袖。Wáng jiàoliàn shì wǒmen de jīngshén lǐngxiù.', '"Coach Wang is our spiritual leader" — emotional team-context use.', null, [ACT.vocabularyCore]),
    createContentItem('裁判', 'cáipàn', 'Referee / umpire — the official who enforces rules and decides calls. Also used as a verb 裁判 ("to officiate"). In casual fan complaints: 裁判太黑了 ("the ref is so corrupt!") — a common stadium grumble.', 'word', '裁判的判罚很公平。Cáipàn de pànfá hěn gōngpíng.', '"The referee\'s calls were fair" — a (rarer) compliment to officials.', null, [ACT.vocabularyCore]),
    createContentItem('球迷', 'qiúmí', 'Sports fan — literally "ball-obsessed" (迷 = fan / obsessed person). Compounds for specific sports: 球迷 (general ball-sport fan), 影迷 (movie fan), 歌迷 (music fan). Strong-fan version: 铁杆球迷 (tiěgǎn qiúmí, "iron-stick fan" = die-hard).', 'word', '他是科比的忠实球迷。Tā shì Kēbǐ de zhōngshí qiúmí.', '"He\'s a loyal Kobe fan" — fan loyalty is a major social identity in Chinese basketball circles.', null, [ACT.vocabularyCore]),
    createContentItem('主场', 'zhǔchǎng', 'Home game / home court / home stadium. Literal: "main field". The opposite is 客场 (kèchǎng, "guest field" = away). 主场优势 (home-field advantage) is a common compound in match analysis.', 'word', '今晚是我们的主场。Jīnwǎn shì wǒmen de zhǔchǎng.', '"Tonight is our home game" — a fan reassurance before a tough match.', null, [ACT.vocabularyCore]),
    createContentItem('客场', 'kèchǎng', 'Away game / visiting venue. Literal: "guest field". 客场作战 (kèchǎng zuòzhàn, "fighting from the away field") is a common framing for the disadvantage of playing on the road.', 'word', '客场比赛总是更难。Kèchǎng bǐsài zǒngshì gèng nán.', '"Away games are always harder" — a sports commentator cliché.', null, [ACT.vocabularyCore]),
    createContentItem('冠军', 'guànjūn', 'Champion / 1st place — the gold-medal winner. Also used for tournament champions across sports, music, debate, etc. The most prestigious result word. Compound: 世界冠军 (world champion), 奥运冠军 (Olympic champion).', 'word', '中国队拿了冠军! Zhōngguó duì nále guànjūn!', '"Team China took the championship!" — a typical proud headline.', null, [ACT.vocabularyCore]),
    createContentItem('亚军', 'yàjūn', 'Runner-up / 2nd place — the silver-medal finisher. 亚 means "secondary"; the same character is in 亚洲 (Asia, "secondary continent" — a 19th-century Sinocentric naming). Less prestige but still respected.', 'word', '虽然只是亚军，但还是很骄傲。Suīrán zhǐshì yàjūn, dàn háishì hěn jiāo\'ào.', '"Even though only runner-up, still very proud" — Chinese sports culture treats 亚军 as honorable, not failure.', null, [ACT.vocabularyCore]),
    createContentItem('进球', 'jìnqiú', 'To score a goal (verb) or a scored goal (noun). Literally "enter ball". In soccer/hockey/basketball commentary, the most cheered word. The 4→2 tone rhythm is the goal-celebration melody.', 'word', '他进了制胜一球! Tā jìnle zhì shèng yī qiú!', '"He scored the winning goal!" — 制胜 (zhì shèng) = "decisive / match-winning".', null, [ACT.vocabularyCore]),
    createContentItem('赢', 'yíng', 'To win — a single-character verb, fourth-tone-style intensity even though it\'s second tone. Object pattern: 赢 + opponent or 赢 + score. Casual victory framing: 我们赢了! (We won!) — exclamation expected.', 'word', '我们以三比一赢了对手。Wǒmen yǐ sān bǐ yī yíngle duìshǒu.', '"We beat the opponent 3 to 1" — the 以 X 比 Y pattern is the standard scoreline framing.', null, [ACT.vocabularyCore]),
    createContentItem('输', 'shū', 'To lose — single-character verb, neutral-feeling first tone. Often paired with 给 (gěi): 输给对手 ("lose to the opponent"). Idiomatic: 输不起 (shū bù qǐ, "can\'t afford to lose / sore loser") describes someone who can\'t accept defeat.', 'word', '我们昨天输了一场。Wǒmen zuótiān shūle yī chǎng.', '"We lost one match yesterday" — measure word 场 for the match itself.', null, [ACT.vocabularyCore]),
    createContentItem('平', 'píng', 'To tie / draw — a single-character verb meaning "level / even / flat". In sports: 比赛打平了 ("the match ended in a tie"). Score-tie phrasing: 二比二打平 (yī bǐ yī dǎ píng, "tied 1-1").', 'word', '昨天的比赛打了个平。Zuótiān de bǐsài dǎle gè píng.', '"Yesterday\'s match ended in a tie" — 打个平 is the casual phrasing.', null, [ACT.vocabularyCore]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: Popular Chinese sports
    // ────────────────────────────────────────────────────────────────────
    createContentItem('乒乓球', 'pīngpāng qiú', 'Table tennis / ping pong — China\'s 国球 (national sport). Onomatopoeic name (乒乓 mimics the bouncing sound) + 球 (ball). The sport in which China is most internationally dominant; the 国乒 team has won the vast majority of Olympic and world golds for decades.', 'word', '乒乓球是中国的国球。Pīngpāng qiú shì Zhōngguó de guóqiú.', '"Table tennis is China\'s national sport" — a cultural fact every Mainland speaker affirms.', null, [ACT.vocabularySports]),
    createContentItem('羽毛球', 'yǔmáo qiú', 'Badminton — literally "feather-ball" (羽毛 = feather, referencing the shuttlecock). Hugely popular as both a casual park sport and a competitive Olympic event. China is also a perennial gold-medal contender in badminton, though less dominant than in ping pong.', 'word', '周末我们一起打羽毛球吧。Zhōumò wǒmen yīqǐ dǎ yǔmáo qiú ba.', '"Let\'s play badminton together this weekend" — invitation framing for a casual park activity.', null, [ACT.vocabularySports]),
    createContentItem('篮球', 'lánqiú', 'Basketball — literally "basket-ball". China\'s domestic league is the CBA (中国男子篮球职业联赛, 中国男篮 for short). NBA fandom is also enormous in China — players like 姚明 (Yao Ming) and 科比 (Kobe Bryant) are cultural icons.', 'word', '我喜欢看CBA篮球比赛。Wǒ xǐhuan kàn CBA lánqiú bǐsài.', '"I love watching CBA basketball" — CBA is so common it\'s often said in English-letter form.', null, [ACT.vocabularySports]),
    createContentItem('CBA', 'sī-bì-ēi', 'China\'s top professional men\'s basketball league (中国男子篮球职业联赛). Usually pronounced as English-letter initials in Mandarin speech. The Chinese basketball calendar revolves around the CBA regular season and finals each spring.', 'word', '今年CBA总决赛太激烈了! Jīnnián CBA zǒng juésài tài jīliè le!', '"This year\'s CBA finals were so intense!" — 总决赛 (zǒng juésài) = grand final.', null, [ACT.vocabularySports]),
    createContentItem('足球', 'zúqiú', 'Soccer / football (the global sport) — literally "foot-ball". China\'s men\'s national team (国足) is famously underperforming relative to the country\'s size; the women\'s team (女足) has historically been much stronger. Football is the most-watched global sport in China despite domestic struggles.', 'word', '中国男足又输了。Zhōngguó nán zú yòu shū le.', '"The Chinese men\'s team lost again" — 又 (yòu, "again") carries the resigned humor.', null, [ACT.vocabularySports]),
    createContentItem('跳水', 'tiàoshuǐ', 'Diving — literally "jump-water". Another Chinese Olympic gold-medal machine; the 中国跳水梦之队 ("Chinese diving dream team") has dominated Olympic diving for decades. Star divers like 郭晶晶 (Guo Jingjing) and 全红婵 (Quan Hongchan) are household names.', 'word', '中国跳水队又拿了金牌。Zhōngguó tiàoshuǐ duì yòu nále jīnpái.', '"The Chinese diving team won gold again" — the 又 (again) is half-joking, since gold has become expected.', null, [ACT.vocabularySports]),
    createContentItem('体操', 'tǐcāo', 'Gymnastics — both 艺术体操 (rhythmic) and 竞技体操 (artistic). Another Chinese Olympic strength, especially in women\'s gymnastics and men\'s rings and pommel horse. 体操王子 (gymnastics prince) was the nickname for 李宁 (Li Ning), the most famous Chinese gymnast turned sportswear mogul.', 'word', '体操运动员需要很强的核心力量。Tǐcāo yùndòngyuán xūyào hěn qiáng de héxīn lìliang.', '"Gymnasts need very strong core strength" — 核心 (héxīn) = core; modern fitness vocabulary.', null, [ACT.vocabularySports]),
    createContentItem('武术', 'wǔshù', 'Wushu / Chinese martial arts — both as a sport (with competitions and forms) and as cultural heritage. Popularly known abroad as "kung fu" (功夫 gōngfu), though 武术 is the formal/competition term. Major styles: 太极拳 (Tai Chi), 长拳 (Long Fist), 南拳 (Southern Fist).', 'word', '武术既是体育也是文化。Wǔshù jì shì tǐyù yě shì wénhuà.', '"Wushu is both sport and culture" — 既…也… ("both…and…") emphasizes the dual nature.', null, [ACT.vocabularySports]),
    createContentItem('打球', 'dǎ qiú', 'To play a ball sport — the general verb. 打 covers basketball, badminton, ping pong, tennis (any sport you strike a ball). For soccer/football you use 踢球 (tī qiú, "kick ball"); for swimming 游泳 (yóuyǒng). The verb tracks the action.', 'word', '你周末经常打球吗? Nǐ zhōumò jīngcháng dǎ qiú ma?', '"Do you often play ball sports on weekends?" — the unspecified 球 invites the listener to specify which sport.', null, [ACT.vocabularySports]),
    createContentItem('踢球', 'tī qiú', 'To play soccer / kick a ball. 踢 (tī) = to kick; reserved for foot-based ball games. You can also use 踢足球 explicitly. Casual invitation: 一起去踢球! ("Let\'s go kick a ball!").', 'word', '我每周六和朋友踢球。Wǒ měi zhōu liù hé péngyou tī qiú.', '"Every Saturday I play soccer with friends" — typical weekend routine.', null, [ACT.vocabularySports]),
    createContentItem('运动', 'yùndòng', 'Exercise / physical activity / sports (general). Broader than 体育; covers anything from morning jogs to professional sports. Common phrases: 做运动 (do exercise), 喜欢运动 (love exercise), 运动鞋 (sneakers, lit. "exercise shoes").', 'word', '每天运动对健康很好。Měitiān yùndòng duì jiànkāng hěn hǎo.', '"Daily exercise is great for health" — 对 X 很好 is the standard "good for X" pattern.', null, [ACT.vocabularySports]),
    createContentItem('健身房', 'jiànshēn fáng', 'Gym / fitness center — literally "health-body-room". Urban younger Chinese gym culture has exploded since the 2010s, with chains like 乐刻 (LeFit) and 超级猩猩 (Super Monkey) competing for office-worker memberships.', 'word', '我每周去三次健身房。Wǒ měi zhōu qù sān cì jiànshēn fáng.', '"I go to the gym three times a week" — typical urban-professional fitness frequency.', null, [ACT.vocabularySports]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Vocabulary III: Olympic medals
    // ────────────────────────────────────────────────────────────────────
    createContentItem('奥运会', 'Àoyùnhuì', 'The Olympics — short for 奥林匹克运动会 (Àolínpǐkè Yùndòng Huì). China has hosted twice (Beijing 2008 summer, Beijing 2022 winter) and consistently finishes top-3 in the medal count. The 2008 opening ceremony is still a touchstone of national pride.', 'word', '北京2008奥运会改变了中国体育。Běijīng 2008 Àoyùnhuì gǎibiànle Zhōngguó tǐyù.', '"The Beijing 2008 Olympics changed Chinese sports" — widely-shared cultural-historical framing.', null, [ACT.vocabularyOlympics]),
    createContentItem('金牌', 'jīnpái', 'Gold medal — the highest Olympic prize and the Chinese sports media\'s favorite number. 金牌榜 (gold medal table) is updated daily during the Olympics, and China\'s position on it is front-page news. The phrase 金牌大国 ("gold medal great power") is a proud self-description.', 'word', '中国队的金牌总数是世界第二。Zhōngguó duì de jīnpái zǒng shù shì shìjiè dì èr.', '"Team China\'s total gold medals rank second in the world" — typical news framing.', null, [ACT.vocabularyOlympics]),
    createContentItem('银牌', 'yínpái', 'Silver medal — the second-place finish. Less celebrated than gold but still nationally proud. The Chinese saying 屈居银牌 (qū jū yínpái, "settling for silver") implies the medal is a disappointment when gold was expected.', 'word', '虽然是银牌，他也很自豪。Suīrán shì yínpái, tā yě hěn zìháo.', '"Though it was silver, he was still proud" — the 虽然…也… concessive structure.', null, [ACT.vocabularyOlympics]),
    createContentItem('铜牌', 'tóngpái', 'Bronze medal — third-place finish. The lowest medal level but still a result of years of training. In Chinese sports media, bronze tends to be celebrated more in disciplines where China is not historically dominant (e.g., swimming, athletics).', 'word', '获得铜牌也是很大的荣誉。Huòdé tóngpái yěshì hěn dà de róngyù.', '"Winning bronze is also a great honor" — the gracious framing of a 3rd-place finish.', null, [ACT.vocabularyOlympics]),
    createContentItem('金牌大国', 'jīnpái dàguó', '"Gold medal great power" — a proud self-description used by Chinese media to celebrate the country\'s top-tier Olympic performance. Originated in the 1984 Los Angeles Olympics (China\'s first medal-rich Games) and entrenched during the 2008 Beijing peak.', 'word', '中国是体育金牌大国。Zhōngguó shì tǐyù jīnpái dàguó.', '"China is a gold-medal great power in sports" — the patriotic framing constantly repeated in state sports media.', null, [ACT.vocabularyOlympics]),
    createContentItem('国乒', 'guópīng', 'Short for 国家乒乓球队 (national table tennis team) — the most decorated and most beloved Chinese national team. Players like 马龙 (Ma Long), 张继科 (Zhang Jike), 樊振东 (Fan Zhendong) are household icons. The nickname is universal in fan culture.', 'word', '国乒又包揽了所有金牌! Guópīng yòu bāolǎnle suǒyǒu jīnpái!', '"The national ping pong team swept all the golds again!" — 包揽 (bāolǎn) = to sweep / take everything.', null, [ACT.vocabularyOlympics]),
    createContentItem('国足', 'guózú', 'Short for 国家男子足球队 (national men\'s soccer team) — the running joke of Chinese sports. Despite enormous investment, China has qualified for the World Cup only once (2002, where they lost all three games scoreless). 国足 references in conversation often come with a sigh, a laugh, or a meme.', 'word', '国足又让球迷失望了。Guózú yòu ràng qiúmí shīwàng le.', '"The national men\'s soccer team disappointed the fans again" — 又 + 让…失望 is the prototype 国足 sentence.', null, [ACT.vocabularyOlympics]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar I: 把 + ball + verb
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '把-句式',
      'bǎ-jùshì — the 把 construction',
      'The 把 (bǎ) construction puts the affected object BEFORE the verb, creating the pattern Subject + 把 + Object + Verb + Result/Direction. Used to emphasize the disposal or affecting of a specific, definite object. In sports descriptions, the object is almost always the ball.',
      'sentence',
      'Standard: 我踢球。(I kick a ball.) — neutral, generic.\n把-construction: 我把球踢进了。(I kicked the ball IN.) — specific ball, emphasis on result.',
      'Use 把 when you want to highlight WHAT happened to the ball: it went in, it was passed to someone, it landed somewhere.',
      [
        { target: 'Subject + 把', note: 'the actor performing the action; comes first as usual' },
        { target: '+ specific Object', note: 'must be a definite, known object (球 the ball, not 一个球 some ball)' },
        { target: '+ Verb', note: 'the action verb (踢 kick, 传 pass, 扣 dunk, 投 shoot)' },
        { target: '+ Result/Direction', note: 'almost always required: 进 in, 出 out, 给…to-someone, 到…to-place' },
      ],
      [ACT.grammarBa],
    ),
    createContentItem(
      '把球踢进',
      'bǎ qiú tī jìn',
      '"Kick the ball IN" — a goal-scoring sentence. The 进 (jìn, enter) is the directional complement showing the ball went in. The full version with object 球门 is 把球踢进球门 ("kick the ball into the goal").',
      'sentence',
      '他在最后一秒把球踢进了! Tā zài zuìhòu yī miǎo bǎ qiú tī jìnle!',
      '"He kicked the ball in at the last second!" — the prototype goal description; appears in every soccer broadcast.',
      [
        { target: '把 bǎ', note: 'puts the object 球 before the verb' },
        { target: '球 qiú', note: 'the specific ball; understood from context' },
        { target: '踢 tī', note: 'to kick — the foot-based action verb' },
        { target: '进 jìn', note: 'directional complement "in"; marks the result of the kick' },
        { target: '了 le', note: 'aspect marker showing the action completed' },
      ],
      [ACT.grammarBa],
    ),
    createContentItem(
      '把球传给我',
      'bǎ qiú chuán gěi wǒ',
      '"Pass the ball to me" — a teammate call. The pattern is 把 + ball + 传 (pass) + 给 (to) + recipient. This is the prototype assist instruction in basketball, soccer, and any team sport.',
      'sentence',
      '我没人防! 把球传给我! Wǒ méi rén fáng! Bǎ qiú chuán gěi wǒ!',
      '"I\'m open! Pass me the ball!" — 没人防 = unguarded; common on-court shout.',
      [
        { target: '把 + 球', note: 'object 球 placed before verb via 把' },
        { target: '传 chuán', note: 'to pass / transmit; the standard ball-passing verb' },
        { target: '给 + recipient', note: '给 marks who receives the ball — 给我 (to me), 给他 (to him), 给队友 (to teammate)' },
      ],
      [ACT.grammarBa],
    ),
    createContentItem(
      '把球扣进去',
      'bǎ qiú kòu jìnqù',
      '"Dunk the ball in" — basketball-specific. 扣 (kòu) means to slam-dunk; 进去 (jìnqù) is the directional complement "in-go" showing the ball went into the hoop. This phrase dominates CBA and NBA highlight commentary.',
      'sentence',
      '姚明在世界杯上把球扣进去了。Yáo Míng zài shìjièbēi shàng bǎ qiú kòu jìnqù le.',
      '"Yao Ming dunked the ball in during the World Cup" — using a legendary Chinese basketball figure.',
      [
        { target: '扣 kòu', note: 'to slam dunk; basketball-specific verb' },
        { target: '进去 jìnqù', note: 'directional complement "in-go"; for actions going away from the speaker into something' },
      ],
      [ACT.grammarBa],
    ),
    createContentItem(
      '把球打到界外',
      'bǎ qiú dǎ dào jiè wài',
      '"Hit the ball out of bounds" — a fault or missed shot. 打 (dǎ) for racquet/bat sports + 到 (dào) + 界外 (jiè wài, out of bounds). The 到 + place pattern is the locative directional complement.',
      'sentence',
      '可惜他把球打到界外了。Kěxī tā bǎ qiú dǎ dào jiè wài le.',
      '"What a pity — he hit the ball out of bounds" — 可惜 (kěxī) is the standard regret-expression in sports commentary.',
      [
        { target: '打 dǎ', note: 'to hit / strike — for racquet, bat, and palm sports' },
        { target: '到 + 界外', note: '到 marks "to" + place; 界外 = out of bounds' },
      ],
      [ACT.grammarBa],
    ),
    createContentItem(
      '把-construction requires result',
      'bǎ requires a result complement',
      'CRITICAL RULE: a 把 sentence CANNOT end with just a bare verb. You must include a result/direction/aspect element. 我把球踢 is ungrammatical; you need 我把球踢进 (kick in), 我把球踢了 (kicked-perfective), or 我把球踢飞了 (kicked-flying-away).',
      'sentence',
      'WRONG: 我把球踢。 (I take-the-ball kick.) — incomplete\nRIGHT: 我把球踢进了。 (I kicked the ball in.) — with directional complement\nRIGHT: 我把球踢飞了。 (I kicked the ball away.) — with result complement',
      'The 把 construction inherently implies disposal — there must be a stated result; otherwise the sentence feels suspended in mid-air.',
      [
        { target: 'with 进/出/到', note: 'directional complement; very common in sports' },
        { target: 'with 了 + result', note: 'aspect 了 + result adjective: 踢飞了 (kicked-away), 打坏了 (hit-broken)' },
        { target: 'with 给 + recipient', note: 'transfer pattern: 传给我 (pass to me), 送给他 (give to him)' },
      ],
      [ACT.grammarBa],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar II: V + 得 + degree complement
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'V + 得 + degree complement',
      'V + de + degree — how well/badly someone Vs',
      'The 得 (de, neutral tone, NOT 4th tone 得 = "must") introduces a description of HOW the verb is performed. Pattern: Subject + Verb + 得 + Degree Adverb + Adjective. The degree adverb (很 / 非常 / 特别 / 真) is almost always required — bare V+得+adjective sounds off.',
      'sentence',
      '他跑得很快。Tā pǎo de hěn kuài. ("He runs very fast.")\n马龙打得非常好。Mǎ Lóng dǎ de fēicháng hǎo. ("Ma Long plays exceptionally well.")',
      'Note: 得 here is pronounced "de" with neutral tone — the same character has three different pronunciations (de/děi/dé) depending on function.',
      [
        { target: 'Subject + V', note: 'the actor and the action' },
        { target: '+ 得 (de)', note: 'neutral tone; the descriptive marker' },
        { target: '+ Degree adverb', note: '很 (very, default), 非常 (extremely), 特别 (especially), 真 (really)' },
        { target: '+ Adjective', note: 'the descriptive word: 快 fast, 好 well, 慢 slow, 差 poor' },
      ],
      [ACT.grammarDe],
    ),
    createContentItem(
      '跑得很快',
      'pǎo de hěn kuài',
      '"Runs very fast" — the prototype V+得 sentence. Common in track-and-field commentary and athlete descriptions. The 很 here is a default linker, not a true intensifier — 跑得快 alone is grammatically suspended; 很 anchors it.',
      'sentence',
      '苏炳添跑得非常快。Sū Bǐngtiān pǎo de fēicháng kuài.',
      '"Su Bingtian runs extremely fast" — 苏炳添 is a real Chinese sprinter who broke 10 seconds in the 100m.',
      [
        { target: '跑 pǎo', note: 'to run — the main verb' },
        { target: '得 de', note: 'neutral-tone descriptive marker' },
        { target: '很快 hěn kuài', note: '"very fast"; the degree-adverb + adjective combo describing how the running goes' },
      ],
      [ACT.grammarDe],
    ),
    createContentItem(
      '打得很好',
      'dǎ de hěn hǎo',
      '"Plays very well" — for any sport that uses 打 (basketball, badminton, ping pong, tennis). Most commonly applied to elite-level praise: 国乒打得真好 ("the national ping pong team plays so well").',
      'sentence',
      '樊振东今天打得特别好。Fán Zhèndōng jīntiān dǎ de tèbié hǎo.',
      '"Fan Zhendong played especially well today" — 樊振东 is the current Chinese ping pong world #1.',
      [
        { target: '打 dǎ', note: 'to play (a ball sport) / to hit' },
        { target: '得很好 de hěn hǎo', note: '"to a very good degree"; the standard praise phrase' },
      ],
      [ACT.grammarDe],
    ),
    createContentItem(
      '输得很惨',
      'shū de hěn cǎn',
      '"Lost badly / lost miserably" — 惨 (cǎn) = miserable, tragic. The classic phrase for a humiliating defeat, often applied (with dark humor) to 国足 losses. 输得太惨了 ("lost so miserably") is a common fan complaint.',
      'sentence',
      '昨晚国足又输得很惨。Zuó wǎn guózú yòu shū de hěn cǎn.',
      '"Last night the national men\'s soccer team lost badly again" — 又 (again) is mandatory for full irony.',
      [
        { target: '输 shū', note: 'to lose' },
        { target: '得很惨 de hěn cǎn', note: '"to a tragic degree"; the strongest defeat descriptor' },
      ],
      [ACT.grammarDe],
    ),
    createContentItem(
      'V + 得 + 不 + adjective',
      'negative: V + de + bù + adjective',
      'Negative form: place 不 BEFORE the adjective, NOT before the verb. 打得不好 ("plays badly"), 跑得不快 ("doesn\'t run fast"). Putting 不 before the verb (我不打得好) is ungrammatical — the negation always targets the description, not the action itself.',
      'sentence',
      'CORRECT: 他打得不好。Tā dǎ de bù hǎo. ("He plays badly.")\nWRONG: 他不打得好。 (ungrammatical word order)',
      'Common English-speaker error: trying to negate the verb instead of the complement.',
      [
        { target: '打得不好', note: 'plays badly — 不 between 得 and the adjective' },
        { target: '跑得不快', note: 'doesn\'t run fast — same pattern' },
        { target: '输得不惨', note: 'didn\'t lose too badly — used when the loss was respectable' },
      ],
      [ACT.grammarDe],
    ),
    createContentItem(
      'Question with V + 得 + 怎么样',
      'V + de + zěnmeyàng — how did they play?',
      'To ask HOW someone performed, replace the degree+adjective slot with 怎么样 (zěnmeyàng, "how / how is it"). 他打得怎么样? ("How does he play?"). Answer with degree + adjective: 打得很好 or 打得不太好.',
      'sentence',
      'Q: 国足昨天踢得怎么样? Guózú zuótiān tī de zěnmeyàng? ("How did the national soccer team play yesterday?")\nA: 踢得很差，又输了。Tī de hěn chà, yòu shū le. ("Played badly, lost again.")',
      'The most common question template for asking about an athlete\'s or team\'s performance.',
      null,
      [ACT.grammarDe],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Grammar III: 越来越 + adjective
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '越来越 + adjective',
      'yuè lái yuè + adjective — more and more',
      '越来越 + adjective means "more and more X" or "increasingly X". Used to describe progressive change over time — improving skill, growing popularity, worsening trend. The phrase itself is fixed (literally "more come more").',
      'sentence',
      '他打得越来越好。Tā dǎ de yuè lái yuè hǎo. ("He plays better and better.")\n篮球在中国越来越流行。Lánqiú zài Zhōngguó yuè lái yuè liúxíng. ("Basketball is more and more popular in China.")',
      'Combines naturally with V+得 sentences: V + 得 + 越来越 + adjective.',
      [
        { target: '越来越 yuè lái yuè', note: 'fixed expression "more and more"; appears immediately before the adjective' },
        { target: '+ adjective', note: 'the quality that is changing: 好 better, 快 faster, 流行 more popular, 强 stronger' },
      ],
      [ACT.grammarYueLaiYue],
    ),
    createContentItem(
      '越来越流行',
      'yuè lái yuè liúxíng',
      '"More and more popular" — used to describe a sport, trend, or activity gaining traction. 流行 (liúxíng) = popular / widespread / trendy. Common framing: 这种运动在中国越来越流行 ("this kind of sport is increasingly popular in China").',
      'sentence',
      '滑雪在北京2022以后越来越流行。Huáxuě zài Běijīng 2022 yǐhòu yuè lái yuè liúxíng.',
      '"Skiing has become more and more popular after Beijing 2022" — referencing the Winter Olympics boost.',
      [
        { target: '越来越', note: 'progressive change marker' },
        { target: '流行 liúxíng', note: 'popular / widespread; describes social uptake of a trend' },
      ],
      [ACT.grammarYueLaiYue],
    ),
    createContentItem(
      '越来越强',
      'yuè lái yuè qiáng',
      '"Stronger and stronger" — describes improving athletic strength, team competitiveness, or skill level. Compound usage: 中国女排越来越强 ("Chinese women\'s volleyball is getting stronger"). The contrast is 越来越弱 (weaker and weaker).',
      'sentence',
      '中国女排越来越强了。Zhōngguó nǚpái yuè lái yuè qiáng le.',
      '"Chinese women\'s volleyball is getting stronger" — the trailing 了 marks the new state.',
      [
        { target: '强 qiáng', note: 'strong / powerful / dominant; competitive context' },
      ],
      [ACT.grammarYueLaiYue],
    ),
    createContentItem(
      '越来越进步',
      'yuè lái yuè jìnbù',
      '"Progressing more and more" — describes a learner or developing athlete improving over time. 进步 (jìnbù) = progress / improvement. Often said as encouragement: 你打得越来越进步了 ("you\'re playing with more and more improvement").',
      'sentence',
      '我的中文越来越进步了。Wǒ de Zhōngwén yuè lái yuè jìnbù le.',
      '"My Chinese is getting better and better" — the standard self-encouragement phrase for any learner.',
      [
        { target: '进步 jìnbù', note: 'progress / improve; can be verb ("to progress") or noun ("progress")' },
      ],
      [ACT.grammarYueLaiYue],
    ),
    createContentItem(
      '越来越…的趋势',
      'yuè lái yuè … de qūshì — a more-and-more trend',
      'For formal writing or analysis, combine 越来越 with 趋势 (qūshì, trend): X 有越来越…的趋势 ("X has a more-and-more X trend"). Example: 健身越来越受欢迎的趋势 ("the trend of fitness becoming more and more popular").',
      'sentence',
      '现在年轻人越来越喜欢健身的趋势很明显。Xiànzài niánqīng rén yuè lái yuè xǐhuan jiànshēn de qūshì hěn míngxiǎn.',
      '"The trend of young people increasingly liking fitness is very clear" — formal essay register.',
      null,
      [ACT.grammarYueLaiYue],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Reading & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '国球 — 乒乓球',
      'guóqiú — pīngpāng qiú',
      'A short article on why 乒乓球 is China\'s national sport. Read it aloud with correct tones and rhythm, then explain back in your own words using the unit\'s grammar patterns.',
      'sentence',
      '乒乓球是中国的国球。从1959年容国团拿到中国第一个世界冠军开始，中国乒乓球队就一直越来越强。现在的国乒选手把每一个球都打得非常好。在奥运会上，中国队几乎每次都拿金牌。马龙、樊振东这些运动员，把中国乒乓球的传统传给了新一代。很多人说，中国人从小就会打乒乓球，这不是夸张——清华大学的每一个体育馆都有乒乓球桌。',
      'Translation: "Table tennis is China\'s national sport. Ever since Rong Guotuan won China\'s first world title in 1959, the Chinese ping pong team has gotten stronger and stronger. The current 国乒 players hit every single ball extremely well. At the Olympics, Team China takes gold almost every time. Athletes like Ma Long and Fan Zhendong have passed the tradition of Chinese ping pong to a new generation. Many say that Chinese people learn ping pong from childhood — this isn\'t exaggeration; every gym at Tsinghua University has a ping pong table."',
      [
        { target: '从1959年…开始', note: '"starting from 1959"; the 从…开始 framing for historical narratives' },
        { target: '越来越强', note: '"stronger and stronger"; the unit\'s 越来越 + adjective pattern' },
        { target: '把每一个球都打得非常好', note: '把 + ball + 打 + 得 + degree — combines two grammar patterns from this lesson' },
        { target: '几乎每次都拿金牌', note: '"almost every time takes the gold"; 几乎 (jīhū) = almost' },
        { target: '把中国乒乓球的传统传给了新一代', note: '"passed the tradition to a new generation"; 把 + object + 传 + 给 + recipient' },
        { target: '清华大学', note: 'Tsinghua University — referenced as a real-world example of ping pong\'s ubiquity' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '理解问题',
      'lǐjiě wèntí — comprehension questions',
      'Four standard comprehension questions matching the article. Answer using the unit\'s grammar patterns — at least one V+得 answer, one 越来越 answer, one 把 answer.',
      'sentence',
      'Q1: 中国第一个乒乓球世界冠军是谁?\nQ2: 国乒选手把球打得怎么样?\nQ3: 中国乒乓球队越来越怎么样?\nQ4: 清华大学的体育馆有什么?',
      'Each question is designed to elicit one of the unit\'s grammar patterns in the answer.',
      [
        { target: 'A1: 容国团', note: 'name answer — "Rong Guotuan", the historical figure mentioned' },
        { target: 'A2: 把球打得非常好。', note: 'uses 把 + ball + 打 + 得 + degree complement' },
        { target: 'A3: 越来越强。', note: 'uses 越来越 + adjective' },
        { target: 'A4: 都有乒乓球桌。', note: 'simple existence answer; 都 emphasizes universality' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Listening & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '看CBA决赛 (对话)',
      'kàn CBA juésài (duìhuà) — watching the CBA final',
      'A 6-turn conversation between two Tsinghua students watching the CBA basketball final live in the common room. Casual peer register with running commentary, predictions, and reactions.',
      'conversation',
      '小王: 你看! 他把球扣进去了! 这个球员越来越厉害!\n莎拉: 真的，他今天打得特别好。第三节他进了几个球?\n小王: 至少五个吧。我觉得他们队今年肯定能拿冠军。\n莎拉: 别太早下结论。客场比赛总是难一些。上次他们在客场就输得很惨。\n小王: 但是他们的教练换了，球队越来越强。你看那个传球！\n莎拉: 漂亮! 把球传给空位的队友——这才是真正的球队配合。\n小王: 哇! 又进了! 我们要赢了!',
      'Translation: Xiao Wang: "Look! He dunked the ball in! This player is getting more and more impressive!" / Sarah: "Really, he\'s playing especially well today. How many did he score in the third quarter?" / Xiao Wang: "At least five. I think their team will definitely win the championship this year." / Sarah: "Don\'t conclude too early. Away games are always harder. Last time they lost badly on the road." / Xiao Wang: "But they changed coaches, and the team is getting stronger and stronger. Look at that pass!" / Sarah: "Beautiful! Passed the ball to the open teammate — THAT\'s real teamwork." / Xiao Wang: "Whoa! Another one in! We\'re going to win!"',
      [
        { target: '把球扣进去 (把-construction)', note: 'turn 1 — basketball dunk description; the prototype 把 + ball + verb + direction sentence' },
        { target: '越来越厉害 (越来越 pattern)', note: 'turn 1 — assessment of improving skill' },
        { target: '打得特别好 (V+得 pattern)', note: 'turn 2 — performance evaluation using 得 + 特别 + 好' },
        { target: '输得很惨 (V+得 pattern)', note: 'turn 4 — bad-defeat description using 得 + 很 + 惨' },
        { target: '把球传给空位的队友 (把 + recipient)', note: 'turn 6 — assist description using 把 + 球 + 传 + 给 + recipient' },
        { target: '空位 kōngwèi', note: '"open spot / unguarded position"; basketball-specific tactical term' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      '预测比赛 (对话)',
      'yùcè bǐsài (duìhuà) — predicting the next match',
      'A 4-turn conversation predicting the outcome of an upcoming match. Uses the unit\'s patterns to compare teams, evaluate players, and make a forecast.',
      'conversation',
      '小王: 你觉得明天中国 vs 日本的乒乓球比赛谁会赢?\n莎拉: 这还用问? 国乒越来越强，对方根本不是对手。\n小王: 但是日本的张本智和打得也越来越好，不能小看他。\n莎拉: 没错。但是马龙是世界第一，他能把每个球都打得非常稳。我觉得中国队3比1赢。',
      'Translation: Xiao Wang: "Who do you think will win tomorrow\'s China vs Japan ping pong match?" / Sarah: "Does that even need asking? 国乒 is getting stronger; the opponent isn\'t even a match." / Xiao Wang: "But Japan\'s Tomokazu Harimoto is also getting better and better — don\'t underestimate him." / Sarah: "True. But Ma Long is world #1; he can hit every ball super steadily. I think China wins 3-1."',
      [
        { target: '越来越强', note: 'turn 2 — used twice in this dialogue; the progressive-improvement framing' },
        { target: '打得也越来越好', note: 'turn 3 — combines V+得 with 越来越 in one phrase' },
        { target: '把每个球都打得非常稳', note: 'turn 4 — uses 把 + ball + V + 得 + degree all together' },
        { target: '3比1赢 sān bǐ yī yíng', note: '"win 3 to 1"; the standard scoreline expression with 比' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '国乒 vs 国足',
      'guópīng vs guózú',
      'The two faces of Chinese national sport. 国乒 (table tennis team) is the most decorated team in any Olympic discipline — China has won the majority of ping pong golds since the 1980s. 国足 (men\'s soccer team) has qualified for the World Cup only once (2002), where they lost 0-2, 0-3, 0-4. The contrast is a constant source of humor and frustration in Chinese sports culture.',
      'sentence',
      '国乒: 几乎所有金牌. 国足: 几乎所有笑话. ("国乒: almost all the gold. 国足: almost all the jokes.")',
      'Every Mainland sports fan grows up internalizing this contrast; jokes about 国足 are a national sport in themselves.',
      [
        { target: '国乒 dominance', note: 'Marathon Olympic dominance: 32 of 37 possible golds since ping pong became Olympic in 1988' },
        { target: '国足 frustration', note: 'Despite massive state investment, the men\'s team has never won an Asian Cup; the women\'s team (女足) has been historically stronger' },
        { target: '为国足气哭 wèi guózú qìkū', note: '"cry from anger over 国足" — a common social media meme phrase' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '体育生',
      'tǐyù shēng',
      'Student-athletes in China have a separate admissions track called 体育生 — elite athletes can enter top universities like Tsinghua with reduced academic-score requirements (体育特招 tǐyù tèzhāo). The system has been criticized for creating a parallel track but defended as preserving athletic talent at top schools.',
      'sentence',
      '清华大学每年都招体育生。Qīnghuá dàxué měi nián dōu zhāo tǐyù shēng.',
      '"Tsinghua University admits 体育生 every year" — the major academic-admissions framing for elite athletes.',
      [
        { target: '体育特招 tǐyù tèzhāo', note: 'special admission for athletes — reduced academic threshold' },
        { target: '高水平运动员 gāo shuǐpíng yùndòngyuán', note: '"high-level athlete" — the formal classification' },
        { target: '清华射击队', note: 'Tsinghua University has a famous shooting team that has produced Olympic medalists' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '健身房 vs 广场舞',
      'jiànshēn fáng vs guǎngchǎng wǔ',
      'The generational split in Chinese fitness culture. 健身房 (gym) is the urban, younger, fitness-app-tracked workout culture that exploded post-2015. 广场舞 (guǎngchǎng wǔ, "plaza dance") is the older-generation tradition where retired women (and some men) gather in public squares every evening to dance in synchronized formations to loudspeaker music. Both serve the same need — community + movement — but along very different generational lines.',
      'sentence',
      '我妈妈每天晚上去广场舞，我每天早上去健身房。',
      '"My mom goes to plaza dance every evening; I go to the gym every morning" — a typical generational split.',
      [
        { target: '广场舞大妈 guǎngchǎng wǔ dàmā', note: '"plaza-dance aunties" — the standard nickname for the older women who dominate the practice' },
        { target: '社区舞蹈 shèqū wǔdǎo', note: '"community dance" — the more formal term for organized 广场舞' },
        { target: '撸铁 lū tiě', note: '"lifting iron" — slang for weight training; younger gym vocabulary' },
        { target: '私教 sījiào', note: '"personal trainer" — common upgrade at urban gyms; modern fitness vocabulary' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '金牌民族主义',
      'jīnpái mínzú zhǔyì — gold-medal nationalism',
      'Chinese state sports media has historically framed Olympic medals — especially gold — as a measure of national strength. The phrase 为国争光 (wèi guó zhēng guāng, "win glory for the country") accompanies almost every Chinese athlete\'s gold-medal moment. Since the 2010s, the framing has softened slightly toward celebrating athlete individuality, but the medal count remains a marker of national pride.',
      'sentence',
      '为国争光是每个中国运动员的梦想。Wèi guó zhēng guāng shì měi gè Zhōngguó yùndòngyuán de mèngxiǎng.',
      '"Winning glory for the country is every Chinese athlete\'s dream" — the standard patriotic framing.',
      [
        { target: '为国争光 wèi guó zhēng guāng', note: '"win glory for the country" — the canonical patriotic phrase for athletic achievement' },
        { target: '金牌至上 jīnpái zhìshàng', note: '"gold-above-all" — a slightly critical framing of the medal-obsessed culture' },
        { target: '体育强国 tǐyù qiángguó', note: '"sports great power" — the state-policy aspiration; coined formally in the 2010s' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '任务: 和清华同学聊体育',
      'rènwù: hé Qīnghuá tóngxué liáo tǐyù',
      'Roleplay a casual conversation with a Tsinghua classmate about Chinese sports. The AI tutor will ask which sport you watch or play, then push you to compare players and explain why you root for a particular team. Use all three grammar patterns plus at least 8 vocabulary items.',
      'conversation',
      '[Tsinghua dorm common room, Saturday afternoon]\n同学: 你平时喜欢看什么体育比赛?\n你: [说一个体育运动 + 一支球队 / 一个运动员]\n同学: 哦，那个球员打/踢得怎么样?\n你: [V + 得 + 程度 — 他打得越来越好]\n同学: 你觉得他比对手强吗?\n你: [比较 — 用越来越 + 形容词 + 把球+动词]\n同学: 这个周末他们有比赛，你看吗?\n你: [回答 — 主场 / 客场 + 输赢预测]\n同学: 我也喜欢这个运动. 我们一起看吧!\n你: [告别 + 约定 — 看比赛地点 / 时间]',
      'The AI tutor (your classmate) will respond naturally; aim for a 6-turn exchange that flows like real fan-talk.',
      [
        { target: '体育运动 / 球队 / 运动员', note: 'choose from this unit: 乒乓球 + 国乒 + 马龙 / 篮球 + CBA + 姚明 / 足球 + 国足 + … (pick what you actually know)' },
        { target: 'V + 得 + 程度', note: 'use 打/踢/跑/跳 + 得 + 很/非常 + 好/快/强 — at least once' },
        { target: '越来越 + 形容词', note: 'use 越来越强 / 越来越好 / 越来越流行 — at least once' },
        { target: '把 + 球 + 动词 + 结果', note: 'use 把球踢进 / 把球传给 / 把球扣进去 — at least once' },
        { target: '主场 / 客场 + 输赢', note: 'frame your prediction with home/away + the win/lose/tie vocabulary' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战 — 解释中国体育的两面',
      'tiǎozhàn — jiěshì Zhōngguó tǐyù de liǎngmiàn',
      'Stretch goal: in the same conversation, explain the 国乒/国足 paradox to your classmate. Why is China dominant in ping pong but historically weak in soccer? Use 越来越 to describe the trend and 把 for play-by-play examples.',
      'conversation',
      '同学: 你怎么看中国乒乓球这么强，可是足球这么弱?\n你: 国乒已经把乒乓球训练系统做得越来越完善，从小学就开始选拔。\n同学: 那国足呢?\n你: 国足问题很复杂——青训系统、教练、文化……国足很难把球踢得像欧洲球员那样自然。\n同学: 你觉得国足越来越好还是越来越差?\n你: [你的观点 — 用越来越 + 形容词]',
      'A topic every Mandarin sports fan has opinions on — sharing yours is a fast way to bond with Chinese classmates.',
      [
        { target: '把…做得越来越完善', note: '把 + 系统 + 做 + 得 + 越来越 + 完善 — combines all three grammar patterns in one sentence' },
        { target: '青训系统 qīngxùn xìtǒng', note: '"youth training system"; central to debates about why 国足 underperforms' },
        { target: '把球踢得像欧洲球员那样自然', note: '把 + 球 + 踢 + 得 + 像…那样 + 自然 — "kick the ball as naturally as European players"; advanced comparison framing' },
        { target: '越来越好 vs 越来越差', note: 'the two opposite trajectories; pick one and defend it' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
