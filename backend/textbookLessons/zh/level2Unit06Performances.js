// Level 2 Unit 6 — 演出与节目 (Performances & Shows) — Mandarin Chinese
// Functions: talking about Chinese performances and shows — concerts, films,
// TV series, cross-talk, opera; reacting to them; recommending something to
// a foreign classmate at Tsinghua University.
//
// Grammar focus:
//   I.  让 + person + 感动/哭/笑 — emotional causative ("makes someone feel/do")
//   II. 不仅…还… — "not only…but also…" for layered praise
//   III. V + 起来 + adj — "V'd, comes across as adj" (看起来很好, 听起来不错)
//
// All content is authored with Hanzi (target) + Pinyin (romanization) +
// English glosses (canonical source). The conversation tutor reads this
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
  orientation: 'zh-l2u6-orientation',
  pronunciation: 'zh-l2u6-pronunciation',
  vocabularyForms: 'zh-l2u6-vocab-forms',
  vocabularyPeopleReactions: 'zh-l2u6-vocab-people-reactions',
  grammarCausative: 'zh-l2u6-grammar-causative',
  grammarLayered: 'zh-l2u6-grammar-layered',
  grammarQilai: 'zh-l2u6-grammar-qilai',
  reading: 'zh-l2u6-reading',
  listening: 'zh-l2u6-listening',
  writing: 'zh-l2u6-writing',
  culture: 'zh-l2u6-culture',
  task: 'zh-l2u6-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Talk about Chinese performances and shows — concerts, films, TV series, cross-talk (相声), and Beijing opera — naming each form correctly.',
      'React to a show emotionally with the 让 + person + emotion pattern: 让我感动 ("moved me"), 让我笑死了 ("had me dying of laughter").',
      'Recommend a Chinese show or movie to a foreign classmate at Tsinghua, layering praise with 不仅…还… and giving impressions with V + 起来 + adj.',
    ],
    task: 'Picture a foreign exchange student at Tsinghua asking what to watch this weekend — by the end of this lesson, you should recommend one Chinese show or movie, describe it, react to it, and explain why they should watch.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in performance vocabulary',
    goals: [
      'Pronounce 演出 (yǎnchū) with the third-tone-to-first-tone shift — full dip on 演, then high level on 出.',
      'Master 综艺 (zōngyì) — tricky for English speakers because of the dental z (no English /z/ equivalent) followed by the rising tone on 艺.',
      'Distinguish 票房 (piàofáng) — fourth-tone falling 票 then rising-tone 房 — from 票 房 said separately.',
      'Hold 感动 (gǎndòng) — full third-tone dip then sharp fourth-tone drop; the emotional content depends on landing both tones cleanly.',
    ],
    task: 'Read each pronunciation example aloud three times, focusing on tone shapes rather than syllable timing.',
  },
  {
    id: ACT.vocabularyForms,
    section: 'Vocabulary I',
    title: 'Performance forms — what kind of show?',
    goals: [
      'Name 9 distinct Chinese performance forms and know which audience and venue each belongs to.',
      'Distinguish 电影 (cinema) from 电视剧 (TV series) and 综艺 (variety show) — each has its own viewing context in modern China (cinema vs streaming vs short-clip platforms).',
    ],
    task: 'For each performance form, name one well-known Chinese example (a movie title, a singer, a comedy duo) — the AI tutor will help if you draw a blank.',
  },
  {
    id: ACT.vocabularyPeopleReactions,
    section: 'Vocabulary II',
    title: 'People, reception, and reactions',
    goals: [
      'Use the role nouns 演员, 歌手, 主角, 配角, 导演, 编剧 — and the reception metrics 票房 (box office) and 评分 (ratings), the two numbers every Chinese moviegoer checks.',
      'Use the 7 most common reaction words — 好看 / 难看 (visual baseline), 精彩 / 无聊 (quality verdict), 感动 / 笑死了 / 不值得看 (emotional verdict) — and match each to its register (casual / written / polite-dismissive).',
    ],
    task: 'For one show you know, name the lead actor and director, give a 票房 or 评分 figure if you remember it, and assign one reaction word — defend the choice in one sentence.',
  },
  {
    id: ACT.grammarCausative,
    section: 'Grammar I',
    title: '让 + person + emotion — emotional causative',
    goals: [
      'Use 让 (ràng) + person + emotion verb/adjective to express what a show DID to you emotionally: 让我感动 ("moved me"), 让我哭 ("made me cry"), 让我笑 ("made me laugh"), 让人感动 ("moves people").',
      'Know that 让 here is the causative "make / let / cause" — different from 让 meaning "yield" or 让 meaning "let (permit)" — context decides which.',
      'Use 让 + 人 (generic "people") when you want a universal reaction, not just your own: 这部电影让人感动 ("This movie moves people").',
    ],
    task: 'Write three sentences using 让 + 我 + emotion for shows YOU reacted to, then rewrite each using 让 + 人 for the universal version.',
  },
  {
    id: ACT.grammarLayered,
    section: 'Grammar II',
    title: '不仅…还… — not only…but also…',
    goals: [
      'Use the two-part connector 不仅 A 还 B to layer two pieces of praise (or critique) onto the same subject: "this show not only A, but also B".',
      'Know that 不仅 is slightly more formal/written than the equivalent 不但 — both work, but 不仅 reads better in reviews and 不但 sounds more conversational.',
      'Put 还 (hái) before the verb of the second clause, NOT at the start — the structure is "subject 不仅 verb1, (subject) 还 verb2".',
    ],
    task: 'Write three sentences using 不仅…还… to layer praise on one show — once for acting, once for music, once for plot.',
  },
  {
    id: ACT.grammarQilai
    ,
    section: 'Grammar III',
    title: 'V + 起来 + adj — comes across as',
    goals: [
      'Use the V + 起来 + adj pattern to give a sensory impression: 看起来 (looks), 听起来 (sounds), 想起来 (when you think about it), all + an adjective like 不错 / 很好 / 有意思.',
      'Know that 起来 here is NOT directional ("get up") — it is the impression-giving construction, similar to English "comes across as" or "seems".',
      'Distinguish 看起来很好 ("looks good — based on what I can see") from 看着很好 ("looks good — when I look at it") and 好像很好 ("seems good — speculative"); 起来 sits between sensory and judgment-based.',
    ],
    task: 'For one Chinese show you recommend, write three V + 起来 impressions: how it looks, how it sounds, and what it feels like when you think back on it.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'Read a movie recommendation',
    goals: [
      'Read a Tsinghua student\'s movie recommendation written for an exchange student, applying all three grammar patterns of the lesson in context.',
      'Answer comprehension questions about the recommended movie\'s form, lead actor, box office, ratings, and emotional impact.',
    ],
    task: 'Read the recommendation aloud, then answer four comprehension questions in short sentences.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'Two Tsinghua students compare shows',
    goals: [
      'Follow a 6-turn conversation in which two Tsinghua classmates compare a movie and a TV series, agreeing and disagreeing politely.',
      'Reproduce one full turn using your own example show — pick something you have watched and react to it the way the speakers do.',
    ],
    task: 'Listen to the conversation with the AI tutor first, then perform your own turn swapping in a show you actually watched.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Write your own recommendation',
    goals: [
      'Write a 5-sentence recommendation of a Chinese show or movie for a foreign classmate, using 让 + emotion at least once, 不仅…还… at least once, and V + 起来 + adj at least once.',
      'Hit a clear structure: name the show, name the form, react emotionally, give layered reasons, close with a recommendation verb.',
    ],
    task: 'Write your own recommendation using the template, then read it aloud with correct tones.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: 'Theater, cinema, pop music, and the rise of 弹幕',
    goals: [
      'Know the prestige hierarchy of traditional performance: 京剧 (Beijing opera) as high-prestige heritage, 相声 (cross-talk) as still beloved popular comedy, 茶馆 (teahouse) culture as the historical venue for both.',
      'Understand the 春节档 (Spring Festival blockbuster window) — the single biggest box-office period in China — and the 国产片 (domestic) vs 进口片 (imported film) commercial divide.',
      'Recognize the shift from cinema to streaming: 优酷 (Youku), 爱奇艺 (iQiyi), and 腾讯视频 (Tencent Video) now drive most TV-series viewing, with 弹幕 (bullet comments) on Bilibili adding a uniquely Chinese social layer.',
      'Trace the Chinese pop music arc: the 周杰伦 (Jay Chou) era of the 2000s, the rise of 国风 (traditional-style modern music), and the 选秀 (talent show) wave that produced today\'s biggest pop idols.',
    ],
    task: 'Pick one cultural item (京剧, 春节档, 弹幕, or 国风) and explain to the AI tutor what it is and why it matters in Chinese pop culture.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'Recommend a show to a Tsinghua classmate',
    goals: [
      'Combine vocabulary, reactions, and all three grammar patterns into one continuous recommendation scene with no break between describing, reacting, and recommending.',
      'Handle pushback: when the classmate asks "is it really that good?", defend your recommendation with a layered 不仅…还… reply.',
    ],
    task: 'Roleplay a hallway conversation at Tsinghua with the AI tutor playing a foreign exchange student asking for a weekend watch — aim for a 6-turn exchange.',
  },
];

const lesson = {
  title: 'Level 2 · Unit 6: 演出与节目 — Performances and Shows',
  category: 'daily-life',
  difficulty: 'intermediate',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'recommending-show', label: 'Recommending a show', goal: 'Use the V + 起来 + adj pattern with a closing 我推荐你看 ("I recommend you watch it") to land a recommendation.' },
    { id: 'reacting-emotionally', label: 'Reacting emotionally to a show', goal: 'Use 让 + 我/人 + emotion ("moved me" / "made me laugh") to give a vivid one-line reaction.' },
    { id: 'layered-praise', label: 'Layering praise', goal: 'Use 不仅…还… to praise two different aspects of one show in one sentence.' },
    { id: 'dismissing-show', label: 'Politely dismissing a show', goal: 'Use 不值得看 ("not worth watching") instead of harsher words like 烂 — saves face on both sides.' },
  ],
  relatedPools: ['topic-culture', 'topic-entertainment'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '本课目标',
      'běn kè mùbiāo',
      'By the end of this lesson, you can recommend a Chinese show or movie to a foreign classmate at Tsinghua — name its form, react to it emotionally, layer your praise, and give an overall impression — all in one continuous turn.',
      'word',
      'Functional skills: 介绍演出 jièshào yǎnchū (introduce a show) · 表达感受 biǎodá gǎnshòu (express reactions) · 推荐 tuījiàn (recommend) · 反驳 fǎnbó (defend the recommendation)',
      'These four micro-skills are the spine of any "what should I watch?" conversation in Mandarin — useful far beyond this unit because the same patterns work for books, restaurants, and places.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      '真实场景',
      'zhēnshí chǎngjǐng',
      'A foreign exchange student in your Tsinghua dorm asks what Chinese movie or show they should watch this weekend. They have a streaming subscription and want something they will actually remember — not just kill time with.',
      'word',
      '同学: "周末想看一部中国电影或者电视剧，你推荐什么？"',
      'A typical Tsinghua-dorm opener — the question itself is casual, but the answer needs structure (name + form + reaction + reason) to be useful.',
      [
        { target: '推荐 tuījiàn', note: '"recommend"; the verb that anchors any "what should I watch?" answer — pairs with both shows (推荐这部电影) and people (推荐你看)' },
        { target: '一部 yī bù', note: 'measure word for movies and TV series; 部 (bù) is the standard counter — never use 个 for full-length productions' },
        { target: '电影或者电视剧', note: '"movie or TV series" — 或者 (huòzhě) is the "or" used in statements (not questions); the listener implicitly accepts either form' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '推荐的四个要素',
      'tuījiàn de sì gè yàosù',
      'A good Mandarin show recommendation has four parts: NAME the show (是什么), NAME the form (电影/电视剧/综艺), REACT to it emotionally (让我感动/笑死了), and LAYER reasons (不仅…还…). Drop any one of these and the recommendation feels half-finished.',
      'word',
      'Template: 这部 [电影/剧] 叫… 它让我… 它不仅… 还… 看起来…',
      'Filling in this template once with any show you love is the fastest way to internalize the pattern; the AI tutor can drill it with five different shows.',
      [
        { target: '名字', note: 'name of the show — say it slowly the first time for a non-fluent listener' },
        { target: '类型', note: 'form: 电影 (movie), 电视剧 (TV series), 综艺 (variety), 话剧 (play)' },
        { target: '情感反应', note: 'emotional reaction: 让我感动 / 让我笑 / 让我哭 / 让我害怕' },
        { target: '层层夸赞', note: 'layered praise with 不仅…还…; gives the recommendation depth' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '演出',
      'yǎnchū',
      'Two-syllable word with a tricky 3rd → 1st tone shape. 演 (yǎn) is a full third tone — dip and rise — and 出 (chū) is a high level first tone. The full third tone is preserved here because 出 is NOT third, so no sandhi applies.',
      'word',
      '今天有一场演出。 jīntiān yǒu yī chǎng yǎnchū',
      '"There is a performance today" — 一场 (yī chǎng) is the measure-word phrase for a single live performance; 一场演出 is fixed phrasing in event-announcement contexts.',
      [
        { target: '演 (yǎn, 3rd)', note: 'full dip-and-rise — do not shorten; emotional word that needs the full contour' },
        { target: '出 (chū, 1st)', note: 'high level, no movement; pinyin "ch" is the aspirated retroflex affricate — strong puff with curled tongue' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '综艺',
      'zōngyì',
      'Two-syllable word with the dental initial z (no English equivalent — like "ts" in "cats" but at the start, no aspiration) followed by 艺 (yì, fourth tone). English speakers commonly mispronounce z as English /z/; aim for the sharp dental "ts" instead.',
      'word',
      '我喜欢看综艺节目。 wǒ xǐhuan kàn zōngyì jiémù',
      '"I like watching variety shows" — 节目 (jiémù) means "program/show"; 综艺节目 is the full compound for "variety show".',
      [
        { target: '综 (zōng, 1st)', note: 'high level; the z is dental affricate /ts/, NOT English /z/' },
        { target: '艺 (yì, 4th)', note: 'sharp falling; means "art/skill" — also appears in 艺术家 (artist)' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '票房',
      'piàofáng',
      'Two-syllable word: 票 (piào, fourth tone, sharp falling) + 房 (fáng, second tone, rising). The 4th-to-2nd combo is common in compounds; do not bleed the falling tone into the rising one — keep them as two distinct shapes.',
      'word',
      '这部电影的票房很高。 zhè bù diànyǐng de piàofáng hěn gāo',
      '"This movie\'s box office is very high" — fixed phrasing in Chinese film journalism; 票房 = the total ticket revenue, the universal metric for commercial success.',
      [
        { target: '票 (piào, 4th)', note: 'sharp fall; means "ticket" — also 车票 (train ticket), 机票 (plane ticket)' },
        { target: '房 (fáng, 2nd)', note: 'rising; means "room/building" — here used metaphorically for "room (of tickets)" = box office' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '感动',
      'gǎndòng',
      'The reaction word for "moved/touched". 感 (gǎn, third tone) + 动 (dòng, fourth tone). Critical to land both tones: the dip on 感 then the sharp fall on 动 give the word its emotional weight. A flat pronunciation kills the meaning.',
      'word',
      '这部电影让我很感动。 zhè bù diànyǐng ràng wǒ hěn gǎndòng',
      '"This movie moved me very much" — the most common construction for emotional reaction; pairs with the 让 causative pattern of Grammar I.',
      [
        { target: '感 (gǎn, 3rd)', note: 'full third tone — dip and rise; means "to feel"' },
        { target: '动 (dòng, 4th)', note: 'sharp falling; means "to move" — here "to be moved emotionally"' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '笑死了',
      'xiào sǐ le',
      'A three-syllable expression: 笑 (xiào, 4th) + 死 (sǐ, 3rd) + 了 (le, neutral). 死 is a full third tone in isolation but here it is the middle of a phrase, so it often shortens to a low pitch with no rise. 了 is light and unstressed.',
      'word',
      '这个相声让我笑死了！ zhè gè xiàngsheng ràng wǒ xiào sǐ le',
      '"This cross-talk had me dying of laughter!" — extremely common internet-casual reaction; do NOT use in formal review writing.',
      [
        { target: '笑 (xiào, 4th)', note: 'sharp fall; "to laugh"' },
        { target: '死 (sǐ, 3rd, often low-flat)', note: 'in mid-phrase position, often reduces to a low pitch — the dip-and-rise compresses' },
        { target: '了 (le, neutral)', note: 'aspect particle; here marks completed state — "laughed (to death)"' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Performance forms
    // ────────────────────────────────────────────────────────────────────
    createContentItem('演出', 'yǎnchū', 'A live performance of any kind — concert, play, opera, dance, magic show. The umbrella term for "show"; specific forms (演唱会, 话剧, 京剧) are subcategories of 演出. Often paired with the measure word 场 (chǎng).', 'word', '今晚有一场精彩的演出。', '"Tonight there is a brilliant performance" — 一场演出 is the canonical phrase for a single live event.', null, [ACT.vocabularyForms]),
    createContentItem('演唱会', 'yǎnchànghuì', 'A pop or rock concert by a singer or band. Distinct from 音乐会 (classical concert) — 演唱会 specifically implies vocal performance and a popular-music context. Often abbreviated to 演唱会 even when an instrumentalist headlines.', 'word', '周杰伦的演唱会票卖光了。', '"Jay Chou\'s concert tickets sold out" — 周杰伦 (Jay Chou) is the iconic Taiwanese pop star of the 2000s and 2010s.', null, [ACT.vocabularyForms]),
    createContentItem('音乐会', 'yīnyuèhuì', 'A classical or instrumental concert — symphony, recital, chamber music. Distinct from 演唱会; 音乐会 carries a more refined, formal register and tends to mean orchestral or instrumental music.', 'word', '国家大剧院的音乐会非常正式。', '"Concerts at the National Centre for the Performing Arts are very formal" — 国家大剧院 is Beijing\'s iconic glass-dome opera house.', null, [ACT.vocabularyForms]),
    createContentItem('话剧', 'huàjù', 'A spoken-word play / stage drama. The Chinese form of Western-style theater (as opposed to traditional opera 戏曲). Performed in modern Mandarin with naturalistic acting; Beijing\'s 人艺 (People\'s Art Theatre) is the most prestigious troupe.', 'word', '《茶馆》是中国最有名的话剧。', '"Teahouse is China\'s most famous spoken drama" — 老舍 (Lao She)\'s play, written 1957, the canonical work of modern Chinese theater.', null, [ACT.vocabularyForms]),
    createContentItem('京剧', 'jīngjù', 'Beijing opera — the high-prestige traditional Chinese theatrical form combining song, mime, dance, and acrobatics, with stylized makeup and costumes. UNESCO Intangible Cultural Heritage; the role types (生旦净丑) are a whole semiotic system.', 'word', '京剧的脸谱非常有特色。', '"Beijing opera\'s facial makeup is very distinctive" — 脸谱 (liǎnpǔ) refers to the iconic painted face patterns that encode each character type.', null, [ACT.vocabularyForms]),
    createContentItem('相声', 'xiàngsheng', 'Cross-talk — Chinese traditional comedic dialogue performed by two performers, one straight man and one funny man. Originated in Tianjin teahouses; still hugely popular today via televised shows and stars like Guo Degang (郭德纲) and Yue Yunpeng (岳云鹏).', 'word', '德云社的相声特别火。', '"Deyunshe\'s cross-talk is especially hot" — 德云社 (Deyunshe) is the famous Beijing-based cross-talk troupe led by Guo Degang.', null, [ACT.vocabularyForms]),
    createContentItem('杂技', 'zájì', 'Acrobatics — traditional Chinese acrobatic performance featuring balance, contortion, juggling, and animal acts. A 2,000-year-old performance tradition; modern troupes like the China National Acrobatic Troupe (中国杂技团) tour worldwide.', 'word', '中国杂技在世界上很有名。', '"Chinese acrobatics is world-famous" — frequent tourism marketing phrase; Shanghai\'s ERA show is the most-visited acrobatic production.', null, [ACT.vocabularyForms]),
    createContentItem('电影', 'diànyǐng', 'A movie / film. The universal noun for cinema. Measure word: 部 (bù) for the work itself, 场 (chǎng) for a specific screening session. Note that 看电影 (watch a movie) is the verb-object phrase.', 'word', '我们去看一部新电影吧。', '"Let\'s go watch a new movie" — 一部新电影 uses 部 as the measure word; saying 一个电影 sounds like a beginner error.', null, [ACT.vocabularyForms]),
    createContentItem('电视剧', 'diànshìjù', 'A TV series / drama serial. Distinct from 电影 (single film) and 综艺 (variety show). Most popular Chinese 电视剧 are 30–50 episodes long; the medium is dominant on streaming platforms like 爱奇艺 (iQiyi) and 腾讯视频 (Tencent Video).', 'word', '这部电视剧有四十集。', '"This TV series has forty episodes" — 集 (jí) is the measure word for episodes; 一集 = one episode.', null, [ACT.vocabularyForms]),
    createContentItem('综艺', 'zōngyì', 'A variety show — typically with celebrity panels, games, talent competitions, or reality-TV formats. Hugely commercially successful in mainland China; flagship shows like 奔跑吧 (Running Man China) and 中国好声音 (The Voice of China) drive prime-time viewing.', 'word', '我最喜欢看综艺节目。', '"My favorite thing to watch is variety shows" — 综艺节目 is the full term; 综艺 alone is also fine in casual speech.', null, [ACT.vocabularyForms]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II (part 1): People + commercial reception
    // ────────────────────────────────────────────────────────────────────
    createContentItem('演员', 'yǎnyuán', 'An actor / actress — covers both genders and all forms (film, TV, stage). The standard professional noun; 男演员 / 女演员 for gendered specificity. Not used for singers (歌手) or comedians (相声演员 is a fixed compound).', 'word', '这部电影的演员都很有名。', '"All the actors in this movie are famous" — typical commentary on a star-studded cast.', null, [ACT.vocabularyPeopleReactions]),
    createContentItem('歌手', 'gēshǒu', 'A singer — pop, rock, folk, any genre. Distinct from 歌唱家 (gēchàngjiā, "vocalist") which carries a more formal/classical connotation for opera and art-song singers. 歌手 is the everyday term for any commercial singer.', 'word', '他是中国最红的歌手之一。', '"He is one of China\'s most popular singers" — 最红的 (zuì hóng de, "reddest/hottest") is the standard slang for "most famous".', null, [ACT.vocabularyPeopleReactions]),
    createContentItem('主角', 'zhǔjué', 'The lead role / protagonist. Distinct from 配角 (supporting role). In film credits, the 主角 is the actor whose name appears first; in industry talk, "他演主角" means "he plays the lead". Tone note: 角 here is jué (fourth tone), NOT jiǎo (third tone, meaning "corner").', 'word', '她演主角，演得特别好。', '"She plays the lead, and performs especially well" — 演得 + adverb is the complement-of-degree construction for performance quality.', null, [ACT.vocabularyPeopleReactions]),
    createContentItem('配角', 'pèijué', 'A supporting role. The opposite of 主角. In Chinese film discourse, 配角 is not pejorative — well-played 配角 are highly respected, and the 最佳配角 (best supporting actor/actress) award is a serious honor.', 'word', '配角的表演也非常出色。', '"The supporting roles\' performance is also excellent" — common review observation when an ensemble cast outshines the lead.', null, [ACT.vocabularyPeopleReactions]),
    createContentItem('导演', 'dǎoyǎn', 'A director — of film, TV, or theater. Also used as a form of address: 张导 (Zhāng dǎo) = "Director Zhang", with 导 as the truncated honorific. Famous mainland directors include 张艺谋 (Zhang Yimou) and 陈凯歌 (Chen Kaige).', 'word', '这部电影的导演是张艺谋。', '"The director of this movie is Zhang Yimou" — 张艺谋 is the iconic fifth-generation director of Hero, House of Flying Daggers, etc.', null, [ACT.vocabularyPeopleReactions]),
    createContentItem('编剧', 'biānjù', 'A screenwriter / playwright — the person who writes the script. Distinct from 作家 (writer of novels/literature). In Chinese film industry, 编剧 are often less famous than directors but increasingly credited and award-recognized.', 'word', '这部电视剧的编剧很有才华。', '"The screenwriter of this TV series is very talented" — 才华 (cáihuá) means "creative talent", a higher-register word than plain 厉害 (lìhai).', null, [ACT.vocabularyPeopleReactions]),
    createContentItem('票房', 'piàofáng', 'Box office (the commercial revenue from ticket sales). The metric that Chinese audiences and media check obsessively — 票房破亿 ("box office breaking 100 million") is the headline benchmark for a hit. Reported in 亿 (yì, hundred million) for blockbusters.', 'word', '这部电影的票房破了十亿。', '"This movie\'s box office broke one billion (yuan)" — 破 (pò, "break/exceed") is the standard verb for crossing a box-office threshold.', null, [ACT.vocabularyPeopleReactions]),
    createContentItem('评分', 'píngfēn', 'A rating / score (from critics or audiences). On Chinese platforms, 豆瓣评分 (Douban rating, out of 10) is the most trusted critical metric — anything above 8.0 is considered very good, above 9.0 is rare and prestigious.', 'word', '这部剧的豆瓣评分是9.2。', '"This drama\'s Douban rating is 9.2" — 豆瓣 (Douban) is China\'s leading film/TV review aggregator; the rating is THE shorthand for quality.', null, [ACT.vocabularyPeopleReactions]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II (part 2): Reactions
    // ────────────────────────────────────────────────────────────────────
    createContentItem('好看', 'hǎokàn', 'Good-looking / nice to watch / visually enjoyable. The baseline positive reaction for any visual medium — applies to shows, movies, scenery, and even people. The most common adjective Chinese audiences use to describe a show they enjoyed.', 'word', '这部电影真好看。', '"This movie is really good" — 真 (zhēn) intensifies; the simplest possible positive verdict on a show.', null, [ACT.vocabularyPeopleReactions]),
    createContentItem('难看', 'nánkàn', 'Bad-looking / ugly / not worth watching. The direct opposite of 好看. Stronger than 不好看 — saying 难看 is a clear negative verdict, while 不好看 leaves more room for "just not for me". Use with care in polite contexts.', 'word', '这个综艺很难看，我看了五分钟就关了。', '"This variety show is awful — I watched five minutes and turned it off" — the verb 关 (guān) here means "turn off/close".', null, [ACT.vocabularyPeopleReactions]),
    createContentItem('精彩', 'jīngcǎi', 'Brilliant / splendid / outstanding. A higher-register positive adjective than 好看 — feels more written and considered, often used in reviews and award commentary. Works for performances, speeches, and events, not just visual quality.', 'word', '昨晚的演出非常精彩。', '"Last night\'s performance was brilliant" — 非常精彩 is the canonical review-language phrase for an outstanding live show.', null, [ACT.vocabularyPeopleReactions]),
    createContentItem('无聊', 'wúliáo', 'Boring / dull / uninteresting. Can describe a show OR a state of mind ("I\'m bored"). For shows, slightly softer than 难看 — 无聊 suggests "didn\'t engage me" rather than "actively bad". A common, polite-ish negative.', 'word', '这部剧太无聊了，我看不下去。', '"This drama is too boring — I can\'t watch any further" — 看不下去 (kàn bù xià qù) is the fixed phrase for "unable to continue watching".', null, [ACT.vocabularyPeopleReactions]),
    createContentItem('感动', 'gǎndòng', 'Moved / touched (emotionally). Used as both a verb ("to be moved") and an adjective ("moving"). The canonical word for tear-jerker shows and family dramas; pairs constantly with the 让 causative pattern.', 'word', '这个故事让我很感动。', '"This story moved me deeply" — the 让 + 我 + 感动 pattern is the structural backbone of Grammar I in this lesson.', null, [ACT.vocabularyPeopleReactions]),
    createContentItem('笑死了', 'xiào sǐ le', 'Hilariously funny — literally "laughed to death". Internet-casual register; common in social media reviews and casual speech, but inappropriate for formal writing. Used after the fact to describe a show that had you in tears of laughter.', 'word', '岳云鹏的相声笑死我了。', '"Yue Yunpeng\'s cross-talk had me dying of laughter" — note the topic-comment word order; 我 can sit between 笑死 and 了 for emphasis.', null, [ACT.vocabularyPeopleReactions]),
    createContentItem('不值得看', 'bù zhídé kàn', 'Not worth watching. A polite-dismissive verdict — softer than 难看 because it focuses on cost-benefit rather than quality. Pairs naturally with reasons: 不值得看，故事太老套 ("not worth watching — plot is too cliché").', 'word', '这部电影不值得看，浪费时间。', '"This movie is not worth watching — waste of time" — 浪费时间 (làngfèi shíjiān) is the classic follow-up reason for a 不值得看 verdict.', null, [ACT.vocabularyPeopleReactions]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar I: 让 + person + emotion
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '让 + person + emotion',
      'ràng + person + emotion',
      'The emotional causative: SUBJECT 让 PERSON EMOTION = "subject causes person to feel/do EMOTION". The subject is the show/event; the person is the experiencer; the emotion is a verb or adjective. 让 here means "cause/make", not "yield" or "permit".',
      'sentence',
      '这部电影让我感动。 zhè bù diànyǐng ràng wǒ gǎndòng\n这首歌让我哭了。 zhè shǒu gē ràng wǒ kū le\n这个相声让我笑了一整晚。 zhè gè xiàngsheng ràng wǒ xiào le yī zhěng wǎn',
      'Three uses of the same pattern: a movie that moved you, a song that made you cry, a cross-talk that made you laugh all night. Same structure, different emotion.',
      [
        { target: '让 (ràng)', note: 'causative "make/cause"; the structural heart of the pattern' },
        { target: '我 / 你 / 他 / 人', note: 'the experiencer slot; use 人 for a universal "people" reaction' },
        { target: 'emotion verb/adj', note: '感动, 哭, 笑, 害怕, 兴奋, 紧张 — any emotional verb or state adjective' },
      ],
      [ACT.grammarCausative],
    ),
    createContentItem(
      '让人 + emotion',
      'ràng rén + emotion',
      'For a UNIVERSAL reaction (anyone watching would feel this), use 让人 instead of 让我. 让人感动 = "moves people in general", carries more rhetorical weight than 让我感动 in reviews and discussion.',
      'sentence',
      '这部电影非常让人感动。 zhè bù diànyǐng fēicháng ràng rén gǎndòng\n那个场面让人难忘。 nà gè chǎngmiàn ràng rén nánwàng',
      'Use 让人 when you want to say "this isn\'t just my reaction — anyone would feel this"; common in written reviews and critical commentary.',
      [
        { target: '让人 (ràng rén)', note: '"makes people"; universal experiencer; more formal than 让我' },
        { target: '让人感动 / 让人难忘 / 让人害怕', note: 'standard collocations for universal emotional reactions' },
        { target: '非常让人… / 真让人…', note: 'intensifiers 非常 / 真 sit BEFORE 让人 for emphasis' },
      ],
      [ACT.grammarCausative],
    ),
    createContentItem(
      '让 + person + action verb',
      'ràng + person + action verb',
      '让 + person can also take an ACTION verb (cry, laugh, scream), not just an emotion adjective. 让我哭 ("made me cry"), 让我笑 ("made me laugh"), 让我害怕 ("scared me"). The structure is identical; only the predicate changes.',
      'sentence',
      '这个结局让我哭了。 zhè gè jiéjú ràng wǒ kū le\n《让子弹飞》让所有人都笑了。 ràng zǐdàn fēi ràng suǒyǒu rén dōu xiào le',
      'Note the title 《让子弹飞》("Let the Bullets Fly", the 2010 Jiang Wen film) — itself contains 让 in a different causative sense ("let bullets fly").',
      [
        { target: '让 + 我 + 哭', note: '"made me cry"; the verb 哭 sits directly after the experiencer' },
        { target: '让 + 我 + 笑', note: '"made me laugh"' },
        { target: '让 + 我 + 害怕', note: '"scared me"; emotion-adjective treated as a stative predicate' },
      ],
      [ACT.grammarCausative],
    ),
    createContentItem(
      '让 — three meanings',
      'ràng — three meanings',
      'CRITICAL: 让 has three different meanings in different contexts. (1) Causative "make/cause" — this lesson\'s focus. (2) Permissive "let/allow" — 让我看看 ("let me see"). (3) Yielding "give way" — 让座 ("yield a seat"). Context tells you which.',
      'sentence',
      '(1) 这让我感动 ("this moves me" — causative)\n(2) 让我试试 ("let me try" — permissive)\n(3) 请让一下 ("please make way" — yielding)',
      'All three are extremely common; misreading them in context will produce sentences that sound off. The lesson focuses on (1), but recognize (2) and (3) when they appear.',
      [
        { target: '让 (causative)', note: '"cause to feel/do"; pattern: thing 让 person emotion/action' },
        { target: '让 (permissive)', note: '"let/allow"; pattern: 让 + person + verb-of-action' },
        { target: '让 (yielding)', note: '"give way / yield"; pattern: 让 + noun (let me pass / give up the seat)' },
      ],
      [ACT.grammarCausative],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar II: 不仅…还…
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '不仅…还…',
      'bùjǐn … hái …',
      'Two-part connector for layered praise: 不仅 A 还 B = "not only A, but also B". 不仅 goes at the start of clause 1; 还 goes BEFORE the verb of clause 2 (not at the start). Both clauses share the same subject by default.',
      'sentence',
      '这部电影不仅票房高，还得了很多奖。 zhè bù diànyǐng bùjǐn piàofáng gāo, hái dé le hěnduō jiǎng',
      '"This movie not only had high box office, but also won many awards" — canonical structure: subject 不仅 V1 O1, 还 V2 O2.',
      [
        { target: '不仅 + clause 1', note: 'opens the first praise; "not only…"' },
        { target: '还 + clause 2', note: '"…but also"; 还 sits BEFORE the verb of the second clause' },
        { target: 'shared subject', note: 'the second clause omits its subject if it is the same as clause 1\'s — Chinese drops subjects freely' },
      ],
      [ACT.grammarLayered],
    ),
    createContentItem(
      '不仅 vs 不但',
      'bùjǐn vs bùdàn',
      '不仅 and 不但 both mean "not only" — but the register differs. 不仅 is slightly more formal, common in writing and reviews. 不但 is more conversational, common in spoken Mandarin. Both pair with 还; you can also pair 不但 with 而且 (érqiě) in even more formal writing.',
      'sentence',
      '不仅 / 不但 + 还 (most common)\n不仅 + 而且 (most formal, written register)\n他不仅是好演员，还是个好导演。 (review register)\n他不但好看，还很会演。 (casual register)',
      'Pick the register based on the medium: 不仅 in essays/reviews, 不但 in chat with classmates. Both are correct.',
      [
        { target: '不仅 (slightly formal)', note: 'preferred in writing, reviews, news commentary' },
        { target: '不但 (conversational)', note: 'preferred in spoken Mandarin and casual chat' },
        { target: '还 (most flexible second-half)', note: 'pairs naturally with both 不仅 and 不但 in all registers' },
      ],
      [ACT.grammarLayered],
    ),
    createContentItem(
      '不仅…还… for negatives',
      'bùjǐn … hái … for negatives',
      'The same structure can stack negatives or critiques: "not only is it boring, but it\'s also long". Useful for layered complaints — not just praise.',
      'sentence',
      '这部剧不仅无聊，还特别长。 zhè bù jù bùjǐn wúliáo, hái tèbié cháng\n这首歌不仅难听，还让人头疼。',
      '"This drama is not only boring, it\'s also extremely long" — Chinese complaint structure mirrors the praise structure exactly.',
      [
        { target: '不仅 + negative1', note: '"not only [bad thing 1]"' },
        { target: '还 + negative2', note: '"but also [bad thing 2]"; 还 sits before the second predicate' },
        { target: 'symmetry', note: 'the pattern is identical for praise and critique — the only difference is which adjectives you fill in' },
      ],
      [ACT.grammarLayered],
    ),
    createContentItem(
      '不仅 + 他, 还 + 我',
      'bùjǐn + tā, hái + wǒ',
      'When the SECOND clause has a DIFFERENT subject, put that new subject between 还 and the verb: 不仅他喜欢，连我都喜欢 ("not only does he like it, even I like it"). Note 连…都… here is a stronger emphatic that often pairs with 不仅.',
      'sentence',
      '这部综艺不仅年轻人喜欢，老人也很爱看。 zhè bù zōngyì bùjǐn niánqīng rén xǐhuan, lǎorén yě hěn ài kàn',
      '"This variety show is liked not only by young people — older folks love watching it too" — the second subject 老人 appears explicitly because it is different from 年轻人.',
      [
        { target: '不仅 + subject1 + V1', note: 'when subjects differ, both appear explicitly' },
        { target: '还 / 也 + subject2 + V2', note: '也 (yě) often replaces 还 when the second subject is different and you want "also"' },
        { target: '连…都… (强调)', note: '"even…also…"; pairs naturally with 不仅 for maximum emphasis' },
      ],
      [ACT.grammarLayered],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar III: V + 起来 + adj
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'V + 起来 + adj',
      'V + qǐlái + adj',
      'The impression-giving construction: VERB + 起来 + ADJECTIVE = "VERB-d, comes across as ADJECTIVE". 看起来 (looks), 听起来 (sounds), 想起来 (when you think about it), 用起来 (when you use it). The adjective is what the impression IS.',
      'sentence',
      '这部电影看起来不错。 zhè bù diànyǐng kàn qǐlái bùcuò\n这首歌听起来很轻快。 zhè shǒu gē tīng qǐlái hěn qīngkuài',
      '"This movie looks pretty good" / "This song sounds light and cheerful" — the V tells you HOW you got the impression; the adj tells you WHAT it is.',
      [
        { target: '看 + 起来', note: '"looks (visually)"; based on what you see' },
        { target: '听 + 起来', note: '"sounds (audibly)"; based on what you hear' },
        { target: '想 + 起来', note: '"when you think about it"; based on reflection' },
        { target: 'adj after 起来', note: 'the impression itself: 不错, 很好, 有意思, 无聊, 美 — any descriptive word' },
      ],
      [ACT.grammarQilai],
    ),
    createContentItem(
      '起来 — NOT directional here',
      'qǐlái — NOT directional here',
      'CAUTION: 起来 has two unrelated uses. (1) Directional "get up/rise up" — 站起来 (stand up), 拿起来 (pick up). (2) Impression-giving with adj — 看起来不错. The TWO can ONLY be told apart by what follows: if an adjective follows, it is the impression construction.',
      'sentence',
      '(1) 他站起来了。 ("He stood up" — directional)\n(2) 他看起来很累。 ("He looks tired" — impression)',
      'Two completely different meanings of 起来; learners often confuse them. The presence of an adjective after 起来 reliably signals the impression reading.',
      [
        { target: 'V + 起来 (directional)', note: '"up/rise" sense; followed by noun or 了 ("stood up", "picked up")' },
        { target: 'V + 起来 + adj (impression)', note: '"comes across as"; followed by adjective ("looks good", "sounds nice")' },
      ],
      [ACT.grammarQilai],
    ),
    createContentItem(
      '看起来 vs 看着 vs 好像',
      'kàn qǐlái vs kàn zhe vs hǎoxiàng',
      'Three related ways to express "seems/looks": 看起来 is the most neutral impression ("looks/seems"); 看着 puts you actively looking at it now ("looking at it, it seems"); 好像 is more speculative ("seems like, but I am not sure"). All three work for visual impressions but carry slightly different weights.',
      'sentence',
      '这部电影看起来不错。 (neutral impression: "looks pretty good")\n这部电影看着不错。 (active viewing: "looking at it, it seems good")\n这部电影好像不错。 (speculative: "seems good, but I am not sure")',
      'Pick based on how committed you want to sound: 看起来 is the safest default; 好像 hedges more; 看着 implies you are actively viewing right now.',
      [
        { target: '看起来 (impression)', note: 'the safest, most common — neutral confidence' },
        { target: '看着 (active viewing)', note: 'in the moment of looking; slightly more vivid' },
        { target: '好像 (speculative)', note: '"seems like"; hedges your commitment to the judgment' },
      ],
      [ACT.grammarQilai],
    ),
    createContentItem(
      '起来 with non-sense verbs',
      'qǐlái with non-sense verbs',
      'Beyond 看/听/想, the construction also works with action verbs to mean "comes across as when you V it". 用起来很方便 ("convenient when used"), 吃起来很香 ("tastes great when you eat it"), 做起来很难 ("hard when you actually do it"). Useful for shows: 演起来 (when acting it).',
      'sentence',
      '这首歌唱起来不容易。 ("This song is hard to sing")\n这个角色演起来很有挑战。 ("This role is challenging to act")',
      'The pattern is productive — almost any action verb can take 起来 + adj to give the "doing-it impression".',
      [
        { target: '唱 + 起来', note: '"when sung"; useful for music' },
        { target: '演 + 起来', note: '"when acted"; useful for actor commentary' },
        { target: '做 + 起来', note: '"when done"; useful for tasks and projects' },
      ],
      [ACT.grammarQilai],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '推荐《长安三万里》',
      'tuījiàn Cháng\'ān Sān Wàn Lǐ',
      'A complete Chinese-style movie recommendation written for a foreign exchange student at Tsinghua. Read it aloud with natural tones and sandhi; notice how all three grammar patterns of this lesson appear at least once.',
      'sentence',
      '《长安三万里》是一部非常精彩的动画电影。它不仅讲了李白和高适的友谊，还展现了唐朝的诗歌文化。电影看起来画面非常美，听起来配乐也很动人。结局让我哭了，我朋友也很感动。票房破了十八亿，豆瓣评分8.3。我特别推荐你看，看完一定让你对中国古代文化更感兴趣。',
      'Translation: "Chang\'an Thirty Thousand Li is an exceptionally brilliant animated film. It not only tells the story of Li Bai and Gao Shi\'s friendship — it also showcases the poetry culture of the Tang Dynasty. The movie looks visually beautiful, and sounds — its soundtrack — is also moving. The ending made me cry, and my friend was also deeply moved. Box office broke 1.8 billion yuan, Douban rating 8.3. I especially recommend you watch it — afterwards it will definitely make you more interested in ancient Chinese culture."',
      [
        { target: '《长安三万里》', note: 'Chang\'an Thirty Thousand Li — 2023 animated film about Tang-dynasty poets Li Bai (李白) and Gao Shi (高适); a major commercial and critical hit' },
        { target: '不仅讲了…还展现了…', note: 'Grammar II pattern applied to plot + theme; layered praise' },
        { target: '看起来…听起来…', note: 'Grammar III pattern doubled — visual then audio impression' },
        { target: '让我哭了 / 让你对…感兴趣', note: 'Grammar I causative twice — emotional reaction + universal expected reaction' },
        { target: '票房破了十八亿 / 豆瓣评分8.3', note: 'commercial credibility (票房) + critical credibility (豆瓣评分) in one sentence' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '理解问题',
      'lǐjiě wèntí',
      'Four comprehension questions for the recommendation paragraph. Answer each in one short sentence — full sentences are not required for natural spoken Mandarin.',
      'sentence',
      'Q1: 这部电影是什么类型? Q2: 主要讲了什么? Q3: 票房怎么样? Q4: 看完会让你对什么更感兴趣?',
      'One form question, one plot question, one commercial question, one effect question — covering vocabulary, content, reception, and outcome.',
      [
        { target: 'A1: 动画电影。', note: '"Animated film" — short noun answer; full sentence (这是一部动画电影) is also fine' },
        { target: 'A2: 讲了李白和高适的友谊和唐朝的诗歌文化。', note: 'plot summary using 讲了 ("told the story of") + 不仅…还… or simple 和' },
        { target: 'A3: 票房破了十八亿，非常好。', note: 'box-office answer combining the figure and a quality verdict' },
        { target: 'A4: 会让我对中国古代文化更感兴趣。', note: 'effect answer using the 让 causative pattern' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Listening & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '两个同学聊节目',
      'liǎng gè tóngxué liáo jiémù',
      'A natural casual-register conversation between two Tsinghua classmates — one Mainland Chinese, one foreign exchange — comparing a movie and a TV series. Listen for the back-and-forth of recommendation and counter-recommendation.',
      'conversation',
      'A: 周末你看了什么？\nB: 我看了一部叫《流浪地球2》的电影，特别精彩！\nA: 真的吗？听起来不错。讲什么的？\nB: 是科幻片，不仅特效厉害，还让人挺感动的。票房特别高。\nA: 那我也想看。最近有没有好看的电视剧？\nB: 《漫长的季节》怎么样？豆瓣评分9.4，看起来画面很文艺，但故事让我哭了好几次。\nA: 哇，9.4分，那肯定值得看。你推荐的我都想试试！\nB: 不过《漫长的季节》比较慢，看的时候要有耐心。',
      'A natural exchange between peers — Mainland student recommending a hit blockbuster + a critically acclaimed series; the foreigner accepts both with curiosity.',
      [
        { target: '《流浪地球2》 (Liúlàng Dìqiú 2)', note: 'The Wandering Earth 2 (2023) — major Chinese sci-fi blockbuster, the highest-grossing Chinese sci-fi film' },
        { target: '《漫长的季节》(Màncháng de Jìjié)', note: 'The Long Season (2023) — critically acclaimed TV series, Douban rating 9.4; literary, slow-burn style' },
        { target: '听起来不错 / 看起来很文艺', note: 'Grammar III in action: audio impression then visual impression' },
        { target: '不仅特效厉害，还让人挺感动的', note: 'Grammar II + Grammar I together: layered praise with emotional reaction' },
        { target: '看的时候要有耐心', note: 'caveat phrasing: "when watching, you need patience"; common honest qualifier' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      '反驳推荐',
      'fǎnbó tuījiàn',
      'A short follow-up exchange in which one classmate pushes back on the recommendation. The recommender defends with a 不仅…还… layered reply. Practice the rhythm of give-and-take in Chinese show talk.',
      'conversation',
      'A: 9.4分听起来太高了，是不是网友刷的？\nB: 不是的，这部剧不仅故事好，还演员演得特别棒。每一集都让观众回味很久。\nA: 那好吧，我相信你，今晚就开始看。\nB: 你看完一定会喜欢，我保证！',
      'Notice 刷的 (shuā de) — slang for "manipulated/inflated by fake reviews"; a common skepticism toward very high ratings.',
      [
        { target: '是不是网友刷的？', note: '"Is it fake-inflated by netizens?" — common skepticism toward high Douban scores' },
        { target: '不仅故事好，还演员演得特别棒', note: 'Grammar II defending the rating with layered evidence' },
        { target: '让观众回味很久', note: 'Grammar I universal causative: "makes audiences savor/reflect long after"' },
        { target: '我保证 (wǒ bǎozhèng)', note: '"I guarantee it" — a confident closer to a recommendation' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '写作模板',
      'xiězuò múbǎn',
      'A reusable five-sentence template for any Chinese show recommendation. Fill in the bracketed slots and the structure carries the rest — the AI tutor will help with anything you do not know how to say.',
      'sentence',
      '我特别推荐 [一部电影/电视剧/综艺] — 《[名字]》。\n它不仅 [优点1]，还 [优点2]。\n[看/听/想] 起来 [感受形容词]。\n[结局/某个场面] 让我 [感动/笑/哭]。\n这部 [类型] 的票房 [破了X亿] / 评分 [是X.X] — 值得看！',
      'Five sentences cover: name + form, layered praise, sensory impression, emotional reaction, commercial/critical credibility — the minimum complete recommendation.',
      [
        { target: '[一部 + 类型]', note: 'measure word 部 + form (电影 / 电视剧 / 综艺 / 话剧)' },
        { target: '[《名字》]', note: 'use guillemets 《》 in writing; in speech just say the title' },
        { target: '不仅 [A]，还 [B]', note: 'Grammar II — layered praise; pick two different aspects (acting + plot, music + visuals, etc.)' },
        { target: 'V + 起来 + adj', note: 'Grammar III — sensory impression; use 看起来 for visual, 听起来 for audio' },
        { target: '让我 + emotion', note: 'Grammar I — emotional reaction; use 感动 / 哭 / 笑 / 害怕' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '写作练习',
      'xiězuò liànxí',
      'Write your own 5-sentence recommendation in Hanzi using the template. Use 让 + emotion at least once, 不仅…还… at least once, and V + 起来 + adj at least once.',
      'sentence',
      '示例: 我特别推荐一部电影 — 《你好，李焕英》。它不仅故事很温暖，还让人笑中带泪。看起来画面很怀旧，听起来音乐也很动人。结局让我哭了好久。这部电影的票房破了五十亿，豆瓣评分8.0 — 值得看！',
      'Translation: "I especially recommend a movie — Hi, Mom. It not only has a heartwarming story, it also makes you laugh through tears. It looks visually nostalgic, and sounds — the music is also moving. The ending made me cry for a long time. This movie\'s box office broke 5 billion yuan, Douban rating 8.0 — worth watching!"',
      [
        { target: '《你好，李焕英》(Nǐ Hǎo, Lǐ Huànyīng)', note: 'Hi, Mom (2021) — directed by and starring Jia Ling (贾玲); one of China\'s all-time highest-grossing films' },
        { target: '笑中带泪 (xiào zhōng dài lèi)', note: '"laughter mixed with tears"; idiomatic phrase for tragicomic content; high-register reaction descriptor' },
        { target: '怀旧 (huáijiù)', note: '"nostalgic"; adjective for retro visual style; common in reviews of period-set films' },
        { target: '五十亿 (wǔshí yì)', note: '5 billion yuan; 亿 (yì) is hundred-million, the standard unit for blockbuster box office' },
      ],
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '京剧 — 传统的高峰',
      'jīngjù — chuántǒng de gāofēng',
      'Beijing opera (京剧) is the most prestigious traditional Chinese performing art — a synthesis of singing, recitation, acting, mime, dance, and acrobatics that crystallized in late 18th-century Beijing. UNESCO Intangible Cultural Heritage since 2010. The role types (生 male, 旦 female, 净 painted-face, 丑 clown) are a whole semiotic system that audiences read at a glance.',
      'sentence',
      '京剧大师梅兰芳 (Méi Lánfāng) 是20世纪最有名的京剧演员，他的"梅派"风格至今仍是经典。',
      'Mei Lanfang (1894–1961) — the most famous Beijing opera performer of the 20th century, world-renowned for his female-role (旦) performances; his "Mei school" (梅派) style is still studied.',
      [
        { target: '京剧 (jīngjù)', note: 'Beijing opera; UNESCO heritage; the high-prestige traditional performance form' },
        { target: '梅兰芳 (Méi Lánfāng)', note: 'the most famous 京剧 actor of the 20th century; established the 旦 role as central artistry' },
        { target: '脸谱 (liǎnpǔ)', note: 'painted face makeup encoding character type — red = loyal, white = treacherous, black = honest-rough' },
        { target: '生旦净丑 (shēng dàn jìng chǒu)', note: 'four main role types: male, female, painted-face, clown — every Beijing opera character belongs to one' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '相声和茶馆',
      'xiàngsheng hé cháguǎn',
      'Cross-talk (相声) — Chinese stand-up-style comedic dialogue performed by two actors — originated in late Qing-dynasty teahouses (茶馆), especially in Tianjin and Beijing. It remains hugely popular today through televised broadcasts and contemporary stars like Guo Degang (郭德纲) and Yue Yunpeng (岳云鹏) of the Deyunshe troupe (德云社). Modern cross-talk has adapted to short-video platforms but retains its teahouse rhythm and audience-callback structure.',
      'sentence',
      '相声在德云社的演出中重新走红 — 郭德纲和岳云鹏让年轻观众也喜欢上了这门传统艺术。',
      'Cross-talk regained popularity through Deyunshe performances — Guo Degang and Yue Yunpeng made young audiences fall in love with this traditional art form again.',
      [
        { target: '相声 (xiàngsheng)', note: 'cross-talk — two-performer comedic dialogue; oldest Chinese stand-up comedy tradition' },
        { target: '茶馆 (cháguǎn)', note: 'teahouse — historical venue for 相声, 京剧, 杂技, and storytelling; cultural institution' },
        { target: '德云社 (Déyúnshè)', note: 'Deyunshe — Beijing-based cross-talk troupe founded by Guo Degang in 1996; revived the form for modern audiences' },
        { target: '郭德纲 / 岳云鹏', note: 'Guo Degang (founder) and Yue Yunpeng (star pupil) — the two faces of contemporary 相声' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '电影 — 春节档和国产片',
      'diànyǐng — Chūnjié dàng hé guóchǎn piàn',
      'Chinese cinema is shaped by two structural facts. (1) The 春节档 (Spring Festival window, roughly Lunar New Year + 7 days) is the single biggest box-office period of the year — Chinese New Year releases regularly break records. (2) The 国产片 (domestic) vs 进口片 (imported) split is commercial and cultural: domestic blockbusters now consistently outsell Hollywood imports, a reversal of the 2000s pattern.',
      'sentence',
      '2023年春节档票房破了67亿，国产片如《流浪地球2》《满江红》占了大部分。',
      '"Spring Festival 2023 box office broke 6.7 billion yuan — domestic films like Wandering Earth 2 and Full River Red took the largest share." A typical headline pattern in Chinese film journalism.',
      [
        { target: '春节档 (Chūnjié dàng)', note: 'Spring Festival blockbuster window; biggest commercial period of the year for cinema' },
        { target: '国产片 (guóchǎn piàn)', note: 'domestic Chinese film — increasingly dominant at the box office since the 2010s' },
        { target: '进口片 (jìnkǒu piàn)', note: 'imported foreign film — mostly Hollywood, subject to annual import quotas' },
        { target: '《流浪地球2》《满江红》', note: 'Wandering Earth 2 + Full River Red — twin 2023 Spring Festival mega-hits' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '电视剧 — 优酷、爱奇艺、腾讯视频',
      'diànshìjù — Yōukù, Àiqíyì, Téngxùn Shìpín',
      'Chinese TV viewing has shifted from broadcast to streaming. The three dominant platforms — 优酷 (Youku, Alibaba), 爱奇艺 (iQiyi, Baidu-affiliated), and 腾讯视频 (Tencent Video) — produce and host most major 电视剧 today. They run on subscription models with ad-supported tiers; a hit series can rack up billions of views on a single platform.',
      'sentence',
      '《狂飙》在爱奇艺上播出后火遍全国，观看次数超过百亿。',
      '"After airing on iQiyi, The Knockout went viral nationwide, with over 10 billion views." Typical streaming-platform hit-show framing.',
      [
        { target: '优酷 (Yōukù)', note: 'Youku — Alibaba-owned streaming platform; one of the "Big Three"' },
        { target: '爱奇艺 (Àiqíyì)', note: 'iQiyi — Baidu-affiliated; produced many of the highest-rated dramas of the late 2010s' },
        { target: '腾讯视频 (Téngxùn Shìpín)', note: 'Tencent Video — part of the WeChat ecosystem; massive subscriber base' },
        { target: '《狂飙》(Kuángbiāo)', note: 'The Knockout (2023) — crime drama, one of the biggest Chinese streaming hits ever' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '弹幕和B站',
      'dànmù hé B zhàn',
      '弹幕 (dànmù, "bullet comments") are scrolling on-screen text messages overlaid on video — viewers post in real time, and the comments appear over the action. Originated on Japanese site Niconico but became a defining feature of Chinese video culture via Bilibili (哔哩哔哩, "B站"). Watching with 弹幕 on is a uniquely Chinese social experience — viewers react together to plot twists, share inside jokes, and call out flaws live.',
      'sentence',
      '在B站看综艺，开弹幕比关弹幕有意思多了。',
      '"Watching variety shows on Bilibili — with bullet comments on is way more fun than with them off." A common viewer sentiment that captures the social value of 弹幕.',
      [
        { target: '弹幕 (dànmù)', note: 'bullet comments — scrolling text overlaid on video in real time; viewer community feature' },
        { target: 'B站 / 哔哩哔哩 (Bīlibīli)', note: 'Bilibili — China\'s leading youth-focused video platform; pioneered 弹幕 in Chinese' },
        { target: '开弹幕 / 关弹幕', note: '"turn on / turn off bullet comments"; standard verb-object phrasing' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '华语流行音乐',
      'Huáyǔ liúxíng yīnyuè',
      'Mandarin pop music has three eras worth knowing. (1) The 周杰伦 (Jay Chou) era of the 2000s defined modern Mandopop with R&B-influenced ballads. (2) The rise of 国风 (guófēng, "traditional-style modern music") in the 2010s — pop with classical Chinese instruments and lyrical references. (3) The 选秀 (xuǎnxiù, "talent show") wave from 2018 onward, producing today\'s biggest pop idols through reality competitions like 创造营 and 青春有你.',
      'sentence',
      '周杰伦的歌让两代人都听不腻；国风音乐让传统文化以新方式回到主流；选秀节目让新人快速走红。',
      '"Jay Chou\'s songs never bore two generations; guofeng music lets traditional culture return to the mainstream in a new way; talent shows let new artists become famous quickly." Notice three uses of the 让 causative pattern in one sentence — the construction is everywhere in cultural commentary.',
      [
        { target: '周杰伦 (Zhōu Jiélún)', note: 'Jay Chou — Taiwanese singer-songwriter; THE defining Mandopop star of the 21st century' },
        { target: '国风 (guófēng)', note: '"national wind / traditional style"; modern pop blended with classical Chinese instruments and lyrical aesthetics' },
        { target: '选秀 (xuǎnxiù)', note: 'talent show / idol competition; format that produces today\'s C-pop idols' },
        { target: '《创造营》《青春有你》', note: 'CHUANG and Youth With You — the two biggest Chinese idol talent shows of the late 2010s and early 2020s' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '任务: 给清华同学推荐节目',
      'rènwù: gěi Qīnghuá tóngxué tuījiàn jiémù',
      'Roleplay a hallway conversation at Tsinghua with the AI tutor playing a foreign exchange student who wants to watch a Chinese show this weekend. Use every skill from this lesson in one continuous scene — describe, react, layer praise, and recommend.',
      'conversation',
      '[清华大学，宿舍走廊]\n外国同学: 周末我想看一部中国电影或者电视剧，你推荐什么？\n你: [推荐 + 名字 + 类型]\n外国同学: 听起来不错！讲什么的？\n你: [简介 + 不仅…还…]\n外国同学: 真的那么好吗？\n你: [情感反应 + 让我/让人 + emotion]\n外国同学: 评分高吗？\n你: [评分 + 票房 — 数据支持]\n外国同学: 好，那我今晚就看。\n你: [结尾 + 看起来 + adj — 信心鼓励]',
      'Six turns of fluent exchange; the AI tutor will improvise as the foreign exchange student, asking follow-up questions and pushing back if you give a half-recommendation.',
      [
        { target: '[推荐 + 名字]', note: 'open with 我推荐 + 一部 + 类型 + 《name》 — slow down on the title for a non-fluent listener' },
        { target: '[不仅…还…]', note: 'Grammar II for layered praise — two different aspects (acting + plot, music + visuals)' },
        { target: '[让我/让人 + emotion]', note: 'Grammar I for emotional reaction — pick 感动 / 哭 / 笑 / 害怕 based on the show' },
        { target: '[V + 起来 + adj]', note: 'Grammar III for sensory impression — 看起来很好 / 听起来不错 / 想起来很有意思' },
        { target: '[评分 + 票房]', note: 'commercial credibility: 豆瓣评分X.X + 票房破X亿 — the two metrics every Chinese viewer checks' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战 — 反驳和坚持',
      'tiǎozhàn — fǎnbó hé jiānchí',
      'Stretch goal: in the same scene, the foreign student pushes back on your recommendation. Defend it confidently using a layered 不仅…还… reply plus 让 emotional appeal. Closes the loop without giving up the recommendation.',
      'conversation',
      '外国同学: 但是9.4分听起来太高了，是不是网友刷的？\n你: 不是的，这部剧不仅故事好，还演员演得特别棒。每一集都让观众回味很久。我自己看完后哭了好几次。看起来画面也很美，绝对值得看。\n外国同学: 那好吧，我相信你！\n你: 看完后告诉我你的感受。',
      'A confident defense uses both Grammar I + II + III layered together — the cumulative effect of all three patterns is what makes the recommendation feel authoritative.',
      [
        { target: '是不是网友刷的？', note: 'common skepticism toward high ratings; "is it inflated by fake reviews?"' },
        { target: '不仅故事好，还演员演得特别棒', note: 'Grammar II — layered defense with two pieces of evidence' },
        { target: '让观众回味很久', note: 'Grammar I — universal causative for shared audience reaction' },
        { target: '看起来画面也很美', note: 'Grammar III — visual impression as a closing piece of evidence' },
        { target: '绝对值得看 (juéduì zhídé kàn)', note: '"absolutely worth watching"; firm closing verdict, opposite of 不值得看' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
