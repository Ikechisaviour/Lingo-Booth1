// Level 2 Review 3 — Final Consolidation (Mandarin Chinese)
// The closing review for Level 2. Spans the entire Level 2 corpus, with
// emphasis on the harder cumulative material from thematic Units 7-9
// (Right/Wrong/Apologies, Intriguing World, Pop Culture) plus a broad
// synthesis across every Level 2 unit. This is the graduation checkpoint
// before the learner moves on to Level 3.
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
  orientation: 'zh-l2r3-orientation',
  pronunciation: 'zh-l2r3-pronunciation',
  vocabularyApology: 'zh-l2r3-vocab-apology',
  vocabularyPop: 'zh-l2r3-vocab-pop',
  grammarRegret: 'zh-l2r3-grammar-regret',
  grammarCausative: 'zh-l2r3-grammar-causative',
  grammarChoice: 'zh-l2r3-grammar-choice',
  reading: 'zh-l2r3-reading',
  listening: 'zh-l2r3-listening',
  writing: 'zh-l2r3-writing',
  chengyu: 'zh-l2r3-chengyu',
  task: 'zh-l2r3-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'You finished Level 2 — now stress-test it',
    goals: [
      'Celebrate the milestone: you have moved from beginner survival Mandarin (Level 1) through intermediate thematic Mandarin (Level 2, 20 units across travel, health, sports, gender, idioms, performances, ethics, world cultures, and pop culture).',
      'Stress-test the cumulative grammar — the easy patterns from early Level 2 should be automatic, but the harder Unit 7-9 material (rhetorical questions, regret counterfactuals, causative emotion, idiomatic comparison) still needs deliberate rehearsal.',
      'Plan how you will combine apology, curiosity, pop-culture commentary, and pure preference patterns in a single graduation-level scene at 清华大学.',
    ],
    task: 'Picture yourself one year into life at 清华大学 (Tsinghua University) being interviewed by a Chinese campus magazine. Three topics on the table: a mistake you regret, the most intriguing thing you have found in China, and what you think of Chinese pop culture. By the end of this review you should hold all three in one conversation.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Final sound check — the hardest tones and sandhi from Level 2',
    goals: [
      'Re-drill the 5–6 highest-stakes pronunciation traps that recurred across Level 2 — the ones that still trip you up at speed: rhetorical 难道 (4+4 with sandhi), regretful 要是…就好了 (4+4+3+4+3+0), causative 让 (4th-tone burst), 偶像 (3+4) and 网红 (3+2) pop-culture pairs, and the chengyu 入乡随俗 (4+1+2+2).',
      'Apply chained sandhi inside multi-syllable formal phrases (之所以…是因为… stacks three sandhi-relevant tones in a row), and remember the 一/不 sandhi rules from Foundation every time you say 一样, 不一样, 不如, or 不仅.',
    ],
    task: 'Read each pronunciation card aloud three times at conversational speed. If any one still slows you down, mark it and re-drill before moving on.',
  },
  {
    id: ACT.vocabularyApology,
    section: 'Vocabulary I',
    title: 'Apology, regret, and ethical-debate vocab (U7)',
    goals: [
      'Reactivate the apology and ethics vocabulary from Unit 7 — 道歉 (apologize), 对不起 (sorry), 抱歉 (formal sorry), 原谅 (forgive), 后悔 (regret), 借口 (excuse), 责任 (responsibility), 是非 (right and wrong).',
      'Distinguish the registers: 对不起 (everyday), 抱歉 (slightly more formal / written), 不好意思 (light social sorry), 万分抱歉 (formal-business deep apology) — using the wrong register breaks the apology.',
    ],
    task: 'Pick five of the apology-and-regret words and use each one in a fresh single-sentence example that matches the right register.',
  },
  {
    id: ACT.vocabularyPop,
    section: 'Vocabulary II',
    title: 'Pop-culture, internet, and curiosity vocab (U8 + U9)',
    goals: [
      'Reactivate the U8 travel/curiosity vocab — 风景 (scenery), 名胜古迹 (famous historical sites), 难以置信 (unbelievable), 据说 (it is said), 听说 (I heard), 让人惊叹 (awe-inspiring).',
      'Reactivate the U9 pop-culture vocab — 偶像 (idol), 网红 (internet celebrity), 粉丝 (fans), 直播 (livestream), 火 / 红 (viral / famous), 内卷 (rat-race competition), 躺平 (lying flat / opting out), yyds (greatest of all time).',
    ],
    task: 'Build two short paragraphs — one about a real place you would describe with U8 vocab, one about a real Chinese internet trend you would describe with U9 vocab.',
  },
  {
    id: ACT.grammarRegret,
    section: 'Grammar I',
    title: 'Regret, explanation, and rhetorical push-back (U7 recap)',
    goals: [
      'Combine three U7 patterns in a single apology paragraph: 之所以 X 是因为 Y (formal cause-explanation, result first), 要是 X 就好了 (counterfactual regret), and 难道 X 吗? (rhetorical "is it really…?" — pushing back on an assumption).',
      'Sequence them correctly: admit fault first, then 之所以…是因为… for context (not for excuse), then 要是…就好了 to wish things had been different — never use 难道…吗? IN an apology (it sounds defensive), but use it in a debate or interview.',
    ],
    task: 'Write a 3-sentence apology that admits a small mistake, explains with 之所以…是因为…, and softens with 要是…就好了 — then add one rhetorical 难道…吗? to a separate debate sentence to feel the contrast.',
  },
  {
    id: ACT.grammarCausative,
    section: 'Grammar II',
    title: 'Causative emotion and sensory impression (U6 + U8 + U9)',
    goals: [
      'Use 让 + person + emotion to describe what a place, show, or trend DID to you: 这部电影让我哭了 ("This film made me cry"), 中国的高铁让外国人惊叹 ("China\'s high-speed rail awes foreigners").',
      'Use V + 起来 + adj to give an impression about a place or thing: 长城看起来很壮观 ("The Great Wall looks magnificent"), 抖音听起来很有意思 ("Douyin sounds interesting"), 想起来还是觉得不可思议 ("Looking back, it still feels unbelievable").',
      'Combine both in one breath when describing a real experience: 这次旅行让我感动，回想起来还是觉得不可思议 ("This trip moved me; looking back it still feels unreal").',
    ],
    task: 'Write three sentences using 让 + person + emotion about three different Chinese experiences (a show, a place, a trend), then add a follow-up sentence to each using V + 起来 + adj for the impression.',
  },
  {
    id: ACT.grammarChoice,
    section: 'Grammar III',
    title: 'Broad synthesis — comparison and choice patterns (U2 + U8 + U9)',
    goals: [
      'Use 越…越… (the more X, the more Y) for escalating descriptions: 中国大城市越来越国际化 ("China\'s big cities are getting more and more international").',
      'Use 比起 X 来…, Y… for layered comparison: 比起去年来，今年的春节晚会更有创意 ("Compared with last year, this year\'s Spring Festival gala is more creative").',
      'Use 与其 X 不如 Y for preference choices: 与其抱怨内卷，不如试一试躺平 ("Rather than complaining about the rat-race, why not try lying flat?").',
      'Use 既不 X 也不 Y for parallel negation: 我既不追星，也不刷抖音 ("I neither chase celebrities nor scroll Douyin").',
    ],
    task: 'Write four sentences — one with each of 越…越…, 比起来, 与其…不如…, 既不…也不… — about your real Level 2 life: study, travel, pop culture, food, anything.',
  },
  {
    id: ACT.reading,
    section: 'Reading',
    title: 'A substantial pop-culture paragraph',
    goals: [
      'Read a 6–7-sentence integrated paragraph on current events in Chinese pop culture (idol scandals, livestream e-commerce, the 内卷 / 躺平 debate, regulatory tightening) — every Level 2 grammar pattern you need is in it.',
      'Identify in the margin which grammar pattern each sentence uses and which unit it traces back to.',
    ],
    task: 'Read the paragraph aloud once, then answer the four cross-unit comprehension questions in complete Mandarin sentences using at least three different grammar patterns.',
  },
  {
    id: ACT.listening,
    section: 'Listening',
    title: 'A demanding cross-unit dialogue',
    goals: [
      'Follow the most challenging dialogue in Level 2 — a campus-magazine interview that hops between apology, travel curiosity, pop-culture commentary, and a polite disagreement within eight turns.',
      'Label each turn with the U7 / U8 / U9 / cross-unit grammar pattern it deploys: 之所以…是因为…, 听说, 让人惊叹, 越来越, 比起来, 难道…吗?, V + 起来, 既不…也不…',
    ],
    task: 'Listen (or read) twice, then re-perform the role of the interviewee with your OWN content, hitting the same grammar pattern in each turn.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Open prompt — integrate everything',
    goals: [
      'Write 7–9 sentences about a recent experience in China that brought together a mistake (you apologized for or regret), a place or thing that intrigued you, and a pop-culture trend you formed an opinion about.',
      'Hit at least one grammar pattern from each of Units 7, 8, and 9 — and at least one of the synthesis patterns (越…越…, 比起来, 与其…不如…, 既不…也不…). Mark each pattern in parentheses after the sentence so you can audit your own coverage.',
    ],
    task: 'Write the integrated paragraph; reread it once for tone-mark errors and one for natural rhythm.',
  },
  {
    id: ACT.chengyu,
    section: 'Chengyu Sprinkling',
    title: 'Drop three U5 chengyu naturally',
    goals: [
      'Use three of the U5 chengyu from earlier in Level 2 in real conversational sentences — 入乡随俗 (when in Rome), 百闻不如一见 (seeing is believing), 名不虚传 (it lives up to its reputation), 班门弄斧 (showing off in front of an expert), 滴水穿石 (persistence wears down obstacles).',
      'Know when NOT to drop a chengyu — they sound bookish in casual peer chat. Save them for moments of reflection, summary, or polite emphasis.',
    ],
    task: 'Write three sentences each using a different chengyu in a natural context (travel summary, study reflection, interview answer); ask the tutor whether each one lands naturally or sounds forced.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'Graduation challenge — a year in Beijing',
    goals: [
      'Combine every Level 2 toolkit in one continuous extended exchange — apology, regret, travel impressions, pop-culture commentary, comparison, preference, and at least one chengyu.',
      'Sustain a 10-turn dialogue with the AI tutor playing a curious Beijing-based friend; cover real logistics (housing, transport, food, social life, internet, pop culture, study, mistakes you might make as a foreigner).',
    ],
    task: 'Roleplay: "If you had to live in Beijing for a year, what would you need to handle?" Use everything from Level 2; let the tutor probe the weak spots in your answer.',
  },
];

const lesson = {
  title: 'Level 2 · Review 3: Final Consolidation — Apology, Curiosity, Pop Culture, and the Whole of Level 2',
  category: 'daily-life',
  difficulty: 'intermediate',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'apologize-and-explain', label: 'Apologize and explain without making excuses', goal: 'Admit fault, then use 之所以…是因为… plus 要是…就好了 to give context and regret without dodging blame.' },
    { id: 'react-to-intriguing', label: 'React to something intriguing in China', goal: 'Use 让人惊叹 / 让我… plus V + 起来 + adj to convey impression and emotional impact in one sentence.' },
    { id: 'compare-and-choose', label: 'Compare and choose with synthesis patterns', goal: 'Use 越…越…, 比起来, 与其…不如…, or 既不…也不… to make a layered comparison or preference statement.' },
    { id: 'rhetorical-pushback', label: 'Push back politely with rhetoric', goal: 'Challenge an assumption with 难道…吗? in a debate or interview context — never in a direct apology.' },
    { id: 'drop-a-chengyu', label: 'Drop a chengyu at the right moment', goal: 'Insert one U5 chengyu in a reflective or summarizing slot — pick the chengyu by what the moment is doing (Rome → 入乡随俗, reputation → 名不虚传, persistence → 滴水穿石).' },
  ],
  relatedPools: ['topic-society', 'topic-culture', 'topic-internet'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '恭喜你 — 二级结业',
      'gōngxǐ nǐ — èr jí jiéyè',
      'Congratulations — you have completed Level 2. From "你好, 我是…" at the start of Level 1 to debating pop culture and apologizing in formal register, you now hold a real intermediate Mandarin toolkit. This Review 3 is the final stress test before Level 3.',
      'word',
      '一级 → 二级 → 二级复习三 (here)',
      'Level 1 = survival Mandarin. Level 2 = thematic intermediate Mandarin (20 units). Review 3 = the closer that locks in U7-9 plus the whole Level 2 corpus.',
      [
        { target: '恭喜 gōngxǐ', note: '"congratulations"; both word and verb, used freely for any milestone' },
        { target: '结业 jiéyè', note: '"complete the course / graduate from a level"; less weighty than 毕业 (formal graduation) but still meaningful' },
        { target: '二级 èr jí', note: '"Level 2"; matches the HSK/CEFR-style level naming familiar in Chinese language pedagogy' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '本课重点',
      'běn kè zhòngdiǎn',
      'Focus areas for this review: the harder U7-9 material (apology + regret rhetoric, travel + curiosity narration, pop-culture commentary) plus a broad synthesis across all 20 Level 2 units. The easy patterns from early Level 2 (为了, 通过, 既…又…) should already be reflexive — this review only re-drills them in passing.',
      'word',
      'U7 apology · U8 curiosity · U9 pop culture · cross-unit comparison/choice',
      'Four pillars; lose any one and the final 10-turn task at the end will stumble.',
      [
        { target: 'U7 = 是非 / 道歉', note: 'right-and-wrong + apology — the most emotionally weighted unit in Level 2' },
        { target: 'U8 = 兴味盎然的世界', note: 'travel + curiosity + retelling stories you have not personally lived' },
        { target: 'U9 = 流行文化', note: 'pop culture + internet celebrity + gen-Z slang — the most contemporary unit' },
        { target: 'Cross-unit', note: 'comparison and choice patterns drawn from across Level 2: 越…越…, 比起来, 与其…不如…, 既不…也不…' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '真实场景 — 清华校刊采访',
      'zhēnshí chǎngjǐng — Qīnghuá xiàokān cǎifǎng',
      'You have been at 清华大学 for a year. The Tsinghua campus magazine wants a feature on foreign-student perspectives. The reporter\'s three topics: a mistake you regret (U7), the most intriguing thing about China (U8), and your honest opinion on Chinese pop culture (U9). One conversation, three Level 2 units.',
      'word',
      '校刊记者: "在中国一年了，最让你后悔的事是什么? 最让你惊叹的呢? 你怎么看中国的流行文化?"',
      'A real Tsinghua campus-magazine question chain. Each question maps to one unit; the trick of this lesson is sustaining the same conversation across all three.',
      [
        { target: '校刊 xiàokān', note: 'campus magazine / school journal — a real Tsinghua publication, English-language version called "Tsinghua Today"' },
        { target: '记者 jìzhě', note: 'reporter / journalist; the interviewer in this scenario' },
        { target: '后悔 hòuhuǐ', note: 'U7 regret vocab — the first topic of the interview' },
        { target: '惊叹 jīngtàn', note: 'U8 awe/intrigue vocab — the second topic' },
        { target: '流行文化 liúxíng wénhuà', note: 'U9 pop culture — the third topic' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '挑战自我',
      'tiǎozhàn zìwǒ',
      'Self-test before you start: can you answer "你在中国最后悔的事是什么?" in three sentences combining admission of fault, 之所以…是因为… for context, and 要是…就好了 for regret — at conversational speed and without scripting? If yes, you have already absorbed U7. If you stumble, this review is exactly the rehearsal you need.',
      'word',
      'Self-test response: "我在中国最后悔的事是没去看长城。我之所以没去，是因为那天加班了。要是那天去了就好了，听说景色真的让人惊叹。"',
      'This single sample answer combines U7 regret rhetoric + U8 listening-narration + U8 awe vocab. If it reads naturally, you are ready for the harder Activity 7-8 material.',
      [
        { target: '我在中国最后悔的事是…', note: 'topic-comment framing common in interview answers — sets up the U7 apology mode' },
        { target: '之所以…是因为…', note: 'U7 explanation pattern; placed AFTER the admission, never as a substitute for it' },
        { target: '要是…就好了', note: 'U7 counterfactual regret; closes the sentence with the wished-for alternative' },
        { target: '听说…让人惊叹', note: 'U8 narration + awe; piped into the regret turn for emotional weight' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '难道',
      'nándào (2+4)',
      'Rhetorical question opener from U4 / U7. Second tone (rising) on 难, fourth tone (sharp fall) on 道 — a clean rise-then-fall that should sound emphatic rather than flat. Mispronouncing 难 as 4th tone (nàndào) yields a non-word and breaks the rhetorical effect entirely.',
      'word',
      '难道你不知道吗? Nándào nǐ bù zhīdào ma? ("Do you really not know?")',
      'The rhetorical pattern only lands if the pitch lifts up sharply on 难 — flat speakers sound puzzled instead of pushing back.',
      [
        { target: '难 (nán, 2nd)', note: 'rising tone; do NOT confuse with 4th-tone 难 (nàn, "disaster / difficulty as a noun")' },
        { target: '道 (dào, 4th)', note: 'sharp falling; carries the punch of the rhetorical move' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '要是…就好了',
      'yàoshi … jiù hǎo le (4+0+4+3+0)',
      'The U7 counterfactual regret pattern. 要是 (4+0 with weak neutral on 是), then your clause, then 就好了 — 就 (4th, sharp), 好 (3rd, full dip-and-rise in this final-position slot), 了 (neutral). The 3rd tone on 好 keeps its full contour here because it is at the end of the breath group.',
      'word',
      '要是我去了就好了。Yàoshi wǒ qù le jiù hǎo le. ("If only I had gone.")',
      'Final-position 好 keeps the full dip-and-rise; trying to shorten it makes the regret sound clipped and insincere.',
      [
        { target: '要是 yàoshi', note: '4+0; the 是 here is reduced to neutral tone, despite its 4th-tone citation form' },
        { target: '就 jiù', note: '4th-tone sharp fall — the pivot from condition to evaluation' },
        { target: '好 hǎo (3rd, full)', note: 'final-position third tone keeps its full dip-and-rise; do not clip' },
        { target: '了 le', note: 'neutral particle; soft and short' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '让',
      'ràng (4th)',
      'The U6 / U9 causative initiator. A single sharp falling fourth tone — too soft and the causative force is lost. Note the retroflex r initial (curl the tongue back) and the -ang final (open mouth, soft palate ng). 让 introduces who feels what: 让我感动, 让人惊叹, 让外国人觉得不可思议.',
      'word',
      '这部电影让我哭了三次。Zhè bù diànyǐng ràng wǒ kū le sān cì. ("This film made me cry three times.")',
      'The sharper the 让 falls, the more emotional weight the sentence carries — a soft 让 sounds tentative.',
      [
        { target: 'r initial', note: 'retroflex /ʐ/ — curl tongue back; not the American English r' },
        { target: 'ang final', note: 'open mouth, back of tongue on soft palate; like English "ahng"' },
        { target: '4th tone', note: 'sharp falling — gives the causative its punch' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '偶像 / 网红',
      'ǒuxiàng (3+4) / wǎnghóng (3+2)',
      'Two flagship U9 pop-culture words that share the same opening 3rd-tone — perfect drill for paired tone control. 偶像 ends with sharp 4th-tone fall (clean ending); 网红 ends with 2nd-tone rise (open ending). Switching them at speed trains your pitch agility.',
      'word',
      '我的偶像是周杰伦，我最喜欢的网红是李子柒。Wǒ de ǒuxiàng shì Zhōu Jiélún, wǒ zuì xǐhuan de wǎnghóng shì Lǐ Zǐqī.',
      'Drill back-to-back until 3+4 and 3+2 sound clearly different in your mouth — these two contours dominate intermediate vocabulary.',
      [
        { target: '偶 / 网 (both 3rd)', note: 'low-pitch start; full dip-and-rise only at end of breath group' },
        { target: '像 (4th, sharp fall)', note: 'closes the word with a punch' },
        { target: '红 (2nd, rise)', note: 'closes the word with an upward sweep — opposite shape from 像' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '入乡随俗',
      'rù xiāng suí sú (4+1+2+2)',
      'A U5 chengyu — "enter the village, follow the customs / when in Rome, do as the Romans". Four clean tones, no sandhi (4+1+2+2). The challenge is keeping each syllable distinct at conversational speed — chengyu rhythm is even, never rushed. Useful summary phrase for any cross-cultural reflection.',
      'word',
      '在中国生活，最好入乡随俗。Zài Zhōngguó shēnghuó, zuì hǎo rù xiāng suí sú. ("Living in China, it is best to do as the locals do.")',
      'A high-leverage chengyu for the final task — it summarizes a whole year of cultural adjustment in four syllables.',
      [
        { target: '入 rù (4th)', note: 'sharp fall on "enter"' },
        { target: '乡 xiāng (1st)', note: 'high level on "village/locality"' },
        { target: '随 suí (2nd)', note: 'rise on "follow"' },
        { target: '俗 sú (2nd)', note: 'rise on "customs"' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '之所以…是因为…',
      'zhī suǒ yǐ … shì yīn wèi …',
      'The U7 formal cause-explanation pattern stacks five tones that need careful pacing — 之 (1st) 所 (3rd) 以 (3rd, with sandhi → 之所以 becomes zhī suǒyǐ where 所 rises to 2nd) 是 (4th) 因 (1st) 为 (4th). Speakers often rush this and lose the third-tone sandhi inside 所以.',
      'word',
      '我之所以没来，是因为家里有事。Wǒ zhī suǒyǐ méi lái, shì yīnwèi jiā lǐ yǒu shì.',
      'A six-syllable formal phrase is enough to test whether your chained sandhi is automatic — drill until it flows without conscious effort.',
      [
        { target: '所以 (written: suǒyǐ, spoken: suóyǐ)', note: 'third-tone sandhi inside the word — 所 rises to 2nd before 以 (3rd)' },
        { target: '是因为 shì yīnwèi', note: '4+1+4; clean tones, no sandhi; the cause-marker proper' },
        { target: 'pacing', note: 'a deliberate pace makes the explanation sound sincere; rushing it sounds like an excuse' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Apology + Curiosity
    // ────────────────────────────────────────────────────────────────────
    createContentItem('道歉', 'dàoqiàn', 'To apologize — the verb itself (距离比 "对不起" 高一级). 我向你道歉 ("I apologize to you"); 公开道歉 ("public apology"). More formal than 说对不起; usable in writing, official statements, and weighty interpersonal moments.', 'word', '公司发了一份正式的道歉声明。', '"The company issued a formal apology statement" — typical corporate-PR usage.', null, [ACT.vocabularyApology]),
    createContentItem('对不起', 'duìbuqǐ', 'The everyday "sorry" — the most common spoken apology, suitable for friends, classmates, customers, and any non-formal context. Literal sense "I cannot face you" with the resultative 不起. Use 对不起，是我的错 to admit fault clearly.', 'word', '对不起，我迟到了。', '"Sorry, I am late" — the everyday workplace/classroom apology opener.', null, [ACT.vocabularyApology]),
    createContentItem('抱歉', 'bàoqiàn', 'Slightly more formal than 对不起 — common in written form, professional emails, and politely-distant spoken contexts. Often paired with 万分 (万分抱歉, "a thousand times sorry") for serious business apologies. In casual conversation, 对不起 is warmer; 抱歉 sounds more measured.', 'word', '万分抱歉，让您久等了。', '"Deeply sorry to have kept you waiting" — formal business or customer-service register.', null, [ACT.vocabularyApology]),
    createContentItem('不好意思', 'bù hǎo yìsi', 'A light social "sorry" / "excuse me" — used to apologize for small inconveniences (squeezing past someone, interrupting, asking a favor). Lighter than 对不起; using 对不起 for a tiny apology can sound oddly heavy. Also doubles as "I feel embarrassed" depending on context.', 'word', '不好意思，请问洗手间在哪儿?', '"Excuse me, where is the restroom?" — standard polite-interrupt opener.', null, [ACT.vocabularyApology]),
    createContentItem('原谅', 'yuánliàng', 'To forgive — the reciprocal of 道歉. 请原谅我 ("please forgive me") is the standard plea after a serious apology. Common response to 对不起 is 没关系 (no problem) or 我原谅你 (I forgive you) for more serious offenses.', 'word', '请原谅我这次的失误。', '"Please forgive my mistake this time" — formal apology closer.', null, [ACT.vocabularyApology]),
    createContentItem('后悔', 'hòuhuǐ', 'To regret — stronger and more personal than 遗憾 (yíhàn, "regret as a feeling of pity"). 后悔 implies you wish you had acted differently. Almost always paired with 要是…就好了 in spoken regret: 我现在很后悔，要是当初没那么做就好了.', 'word', '我很后悔没去看长城。', '"I really regret not going to see the Great Wall" — typical foreigner-in-China regret.', null, [ACT.vocabularyApology]),
    createContentItem('借口', 'jièkǒu', 'An excuse — pejorative. 这只是借口 ("this is just an excuse") shuts down a defensive explanation. Important to distinguish from 之所以…是因为… (which is a sincere explanation, not an excuse) — 借口 is what the OTHER person calls your explanation when they reject it.', 'word', '别找借口，承担责任。', '"Stop making excuses, take responsibility" — sharp rebuke; only for close relationships.', null, [ACT.vocabularyApology]),
    createContentItem('责任', 'zérèn', 'Responsibility / accountability — both legal and moral. 负责任 ("take responsibility") is the standard verb phrase; 我的责任 ("my responsibility") is the standard admission. A pillar word of any U7 apology paragraph.', 'word', '这件事是我的责任，我会处理。', '"This is my responsibility, I will handle it" — the model accountability sentence.', null, [ACT.vocabularyApology]),
    createContentItem('是非', 'shì fēi', 'Right and wrong; the moral question itself — also "gossip / dispute" in different contexts. 分清是非 ("distinguish right from wrong") is the standard ethical phrase; 别管别人的是非 ("do not get involved in others\' disputes") is the gossip sense.', 'word', '这件事的是非很难分清。', '"The right-and-wrong of this matter is hard to sort out" — typical ethical-debate framing.', null, [ACT.vocabularyApology]),
    createContentItem('风景', 'fēngjǐng', 'Scenery / landscape — U8 vocab. The standard noun for what you see when you travel. 风景很美 ("the scenery is beautiful") is the everyday description; 风景如画 ("scenery like a painting") is the polished version. More everyday than 景色 in spoken Mandarin.', 'word', '桂林的风景让人惊叹。', '"Guilin\'s scenery is awe-inspiring" — combines U8 vocab with U9-style 让人 causative.', null, [ACT.vocabularyApology]),
    createContentItem('名胜古迹', 'míngshèng gǔjì', '"Famous scenic spots and historical sites" — a four-character set phrase that names the whole category of must-see tourist destinations. Used in travel brochures, school trips, and any formal tourism context: 北京的名胜古迹 ("Beijing\'s famous historical sites").', 'word', '北京有许多名胜古迹，比如长城、故宫、颐和园。', '"Beijing has many famous historical sites, such as the Great Wall, the Forbidden City, and the Summer Palace" — model U8 enumeration.', null, [ACT.vocabularyApology]),
    createContentItem('难以置信', 'nán yǐ zhì xìn', '"Hard to believe / unbelievable" — a four-character expression (technically a 成语 by feel, though more contemporary than classical). The natural reaction word for U8 culture shock. Common pairing: 真的难以置信 ("truly unbelievable") plus 让人 to share the shock.', 'word', '中国高铁的速度真的让人难以置信。', '"The speed of China\'s high-speed rail is truly unbelievable" — Tsinghua-student favorite reaction.', null, [ACT.vocabularyApology]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: Pop Culture + Internet
    // ────────────────────────────────────────────────────────────────────
    createContentItem('偶像', 'ǒuxiàng', 'Idol — a singer, actor, or performer whose fans organize around them. U9 core word. Different from 明星 (general celebrity) — 偶像 implies an active fan community (粉丝), often K-pop-style. 我的偶像是… ("my idol is…") is the standard fan declaration.', 'word', '我的偶像是周杰伦。', '"My idol is Jay Chou" — model fan introduction.', null, [ACT.vocabularyPop]),
    createContentItem('明星', 'míngxīng', 'Celebrity / star — broader than 偶像. Covers actors, singers, hosts, athletes; anyone with mass public recognition. The neutral / journalistic term — newspapers say 明星; fans say 偶像.', 'word', '这次活动来了很多明星。', '"Many celebrities came to this event" — typical media phrasing.', null, [ACT.vocabularyPop]),
    createContentItem('网红', 'wǎnghóng', '"Internet celebrity" — literally "net + red/popular". Coined in the 2010s for influencers, livestreamers, and viral personalities; now also used as an adjective for any place/food that has gone viral (网红餐厅, "viral restaurant"). Younger and more contemporary than 明星.', 'word', '这家咖啡店是抖音上的网红打卡点。', '"This cafe is a viral Douyin check-in spot" — model use of 网红 as adjective.', null, [ACT.vocabularyPop]),
    createContentItem('粉丝', 'fěnsī', 'Fan(s) — a phonetic borrowing of English "fans" that puns on the existing word 粉丝 ("vermicelli noodles"). Active in fan-community contexts: 粉丝团 (fan club), 粉丝应援 (fan support events). 我是他的粉丝 ("I am his fan") is the standard self-introduction.', 'word', '他在中国有上千万粉丝。', '"He has tens of millions of fans in China" — typical scale of Chinese pop-culture fandom.', null, [ACT.vocabularyPop]),
    createContentItem('直播', 'zhíbō', 'Livestream — both the verb (to livestream) and the noun (a livestream session). The dominant medium of 2020s Chinese internet culture: 直播带货 (livestream e-commerce), 直播打赏 (livestream tipping). The defining U9 concept.', 'word', '李佳琦的直播一晚上能卖几个亿。', '"Li Jiaqi\'s livestream can sell several hundred million in one night" — flagship 直播带货 reference.', null, [ACT.vocabularyPop]),
    createContentItem('火 / 红', 'huǒ / hóng', '"Viral" / "famous" — the two adjectives that describe popularity. 火 is short-burst viral heat ("hot right now"); 红 is broader sustained fame. 这首歌火了 ("this song went viral"); 他红了 ("he became famous"). Used as resultative with V + 火/红 + 了 (U9 Grammar I).', 'word', '中国流行文化在海外越来越火。', '"Chinese pop culture is getting more and more viral overseas" — combines 火 with the cross-unit 越…越… pattern.', null, [ACT.vocabularyPop]),
    createContentItem('内卷', 'nèi juǎn', '"Involution / rat-race over-competition" — gen-Z buzzword for the experience of pointless escalating effort (taking ten extra classes, working ten extra hours) just to keep up with peers. Coined from sociology, viral on Chinese social media since ~2020. Critical to understand for any conversation with Chinese university students.', 'word', '清华太卷了，我都快撑不住了。', '"Tsinghua is too cutthroat, I can barely cope" — quintessential student complaint.', null, [ACT.vocabularyPop]),
    createContentItem('躺平', 'tǎng píng', '"Lying flat / opting out of the rat-race" — the counter-response to 内卷. Coined around 2021 as gen-Z\'s rejection of relentless competition: refuse to overwork, accept a simple life, do not strive. Carries both rebellious pride and mock-defeat connotations. Pairs with 内卷 in almost every Chinese gen-Z conversation.', 'word', '与其每天加班，不如躺平算了。', '"Rather than work overtime every day, just lie flat" — model 与其…不如… preference plus 躺平.', null, [ACT.vocabularyPop]),
    createContentItem('yyds', 'yǒng yuǎn de shén (= 永远的神)', '"Eternal god / greatest of all time" — pinyin initialism gen-Z slang, equivalent to English "GOAT". Used in praise of anything from a singer to a noodle shop: 周杰伦yyds! ("Jay Chou is the GOAT!"). Casual register only; never appropriate in formal contexts.', 'word', '周杰伦yyds! 我从小听到大。', '"Jay Chou is the GOAT! I have been listening since childhood" — typical fan praise.', null, [ACT.vocabularyPop]),
    createContentItem('破防', 'pò fáng', '"My defenses broke / I am emotionally wrecked" — gen-Z slang for being unexpectedly moved (often to tears). Originally gaming jargon ("defense broken"); now widely used for any moment a song, video, or news clip makes you cry. Pairs naturally with 让我 from U6: 这段视频让我破防了.', 'word', '这段视频让我破防了，太感人了。', '"This video wrecked me emotionally, so moving" — model gen-Z reaction.', null, [ACT.vocabularyPop]),
    createContentItem('听说', 'tīng shuō', '"I heard / it is said" — U8 narration marker for stories you did not personally witness. Place at the start of a clause to flag that what follows is hearsay: 听说他要回国了 ("I heard he is going back home"). The casual register version of 据说 (more formal / written).', 'word', '听说北京的春节庙会真的很热闹。', '"I heard Beijing\'s Spring Festival temple fairs are really lively" — model U8 hearsay narration.', null, [ACT.vocabularyPop]),
    createContentItem('据说', 'jù shuō', '"It is said / reportedly" — more formal counterpart of 听说. Used in writing, news, and slightly-distant spoken contexts. 据说 has no clear source attribution ("they say"); 听 X 说 ("I heard from X") is more specific. Standard opener for travel-rumor stories.', 'word', '据说兵马俑是世界第八大奇迹。', '"The Terracotta Army is said to be the eighth wonder of the world" — model travel-rumor citation.', null, [ACT.vocabularyPop]),
    createContentItem('让人惊叹', 'ràng rén jīngtàn', '"Awe-inspiring / makes people marvel" — a high-frequency U8 reaction phrase combining U6 causative 让 + U8 awe vocab 惊叹. Used to describe scenery, technology, or any unexpectedly impressive thing. More formal than 太厉害了 (casual "amazing"); appropriate in writing and polite spoken contexts.', 'word', '黄山的日出真的让人惊叹。', '"Sunrise on Mount Huang is truly awe-inspiring" — model travel-narration reaction.', null, [ACT.vocabularyPop]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar I: U7 recap (regret + rhetoric)
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '之所以…是因为… (U7)',
      'zhī suǒyǐ … shì yīnwèi …',
      'Formal cause-explanation pattern from Unit 7. RESULT first (之所以 X), CAUSE second (是因为 Y). Opposite order of casual 因为…所以…. Foregrounds what needs explaining — useful when the result is already known to your interlocutor. Critical rule: use AFTER admitting fault, never INSTEAD of it (otherwise it sounds like 借口, an excuse).',
      'sentence',
      '我错了。我之所以没来开会，是因为我妈妈临时住院了。',
      '"I was wrong. The reason I did not come to the meeting is because my mother was unexpectedly hospitalized." — admission first, then explanation; the sequence is what makes it a real apology rather than an excuse.',
      [
        { target: '之所以 + result', note: 'open with the result that needs explaining; assumes the listener already knows the outcome' },
        { target: '是因为 + cause', note: 'follow with the reason; the formal cause marker (more weighty than plain 因为)' },
        { target: 'vs casual 因为…所以…', note: 'casual order: cause first, result second; less formal weight, no foregrounding effect' },
        { target: 'placement in apology', note: 'AFTER admission (我错了 / 对不起); placing it BEFORE makes it sound like a dodge' },
      ],
      [ACT.grammarRegret],
    ),
    createContentItem(
      '要是…就好了 (U7)',
      'yàoshi … jiù hǎo le',
      'Counterfactual regret pattern from Unit 7. 要是 X 就好了 = "if only X had happened, it would have been good". Used to express regret without bluntly admitting fault — the pattern foregrounds the wished-for alternative, not the failure. Pairs naturally with 后悔 (regret) and the U7 apology framework.',
      'sentence',
      '要是我那天去看了长城就好了。',
      '"If only I had gone to see the Great Wall that day." — classic foreigner-in-China regret; the regret is implied without harsh self-criticism.',
      [
        { target: '要是 (informal "if")', note: 'less formal than 如果 / 假如; standard in friend-to-friend regret' },
        { target: '就好了', note: '"would have been good"; the evaluation that turns the hypothetical into a regret' },
        { target: 'softening effect', note: 'foregrounds the wish rather than the failure — useful for self-criticism without harshness' },
        { target: 'vs blunt admission', note: '我忘了 (blunt fact) vs 要是我记得就好了 (softened regret) — same fact, different emotional weight' },
      ],
      [ACT.grammarRegret],
    ),
    createContentItem(
      '难道…吗? (U4 / U7)',
      'nándào … ma?',
      'Rhetorical question pattern — expects the answer "no, of course not". Used to challenge an assumption politely or push back without bluntly disagreeing. Place 难道 right after the subject (or at sentence start); keep 吗 at the end. CRITICAL: never use 难道…吗? IN your own apology — it sounds defensive. Save it for debate, interview, and interpersonal push-back contexts.',
      'sentence',
      '难道你不知道这个规定吗? Nándào nǐ bù zhīdào zhège guīdìng ma?',
      '"Do you really not know about this rule?" — pushes back on the assumption that the listener was unaware; expects them to admit they did know.',
      [
        { target: '难道 + assumption', note: 'the assumption being challenged; usually a negative or surprising claim' },
        { target: '吗 at end', note: 'always keep the question particle; without 吗 it becomes a flat statement, losing the rhetorical force' },
        { target: 'expected answer', note: 'NO — the rhetorical question expects the listener to disavow what 难道 implies' },
        { target: 'DO NOT use in your own apology', note: 'sounds defensive; reserved for debate, interview, and challenging an external claim' },
      ],
      [ACT.grammarRegret],
    ),
    createContentItem(
      '组合: 道歉三步 (U7)',
      'zǔhé: dàoqiàn sān bù',
      'The three-step U7 apology paragraph: (1) admit fault — 我错了 / 对不起 / 是我的责任; (2) explain WITHOUT excusing — 之所以…是因为…; (3) wish for the alternative — 要是…就好了. All three together is the template for any serious Mandarin apology.',
      'sentence',
      '对不起，是我的错。我之所以没来，是因为家里临时有急事。要是我能提前告诉你就好了。',
      '"Sorry, it was my fault. The reason I did not come is because there was an urgent matter at home. If only I had been able to tell you in advance."',
      [
        { target: '步骤 1: 承认 (admit)', note: '对不起 / 我错了 / 是我的责任 — sets up the rest as sincere, not defensive' },
        { target: '步骤 2: 解释 (explain)', note: '之所以…是因为… — context, not excuse; only valid AFTER admission' },
        { target: '步骤 3: 后悔 (regret)', note: '要是…就好了 — closes with the wished-for alternative; softens self-criticism' },
      ],
      [ACT.grammarRegret],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar II: Causative + Impression (U6 + U8 + U9)
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '让 + person + emotion (U6)',
      'ràng + person + emotion',
      'Causative pattern from Unit 6: 让 (ràng) + person + emotion-verb-or-adjective. Says what something DID to someone emotionally. 让我感动 ("moved me"); 让我哭了 ("made me cry"); 让人惊叹 ("awe-inspiring"). Use 让 + 我 for personal reaction; 让 + 人 for the universal version.',
      'sentence',
      '这部电影让我哭了三次。中国的高铁让外国游客惊叹。',
      '"This film made me cry three times. China\'s high-speed rail awes foreign tourists." — personal version + universal version of the same pattern.',
      [
        { target: '让我 + 感动 / 哭 / 笑', note: 'personal reaction; first-person emotional response' },
        { target: '让人 + 感动 / 惊叹', note: 'universal version; uses 人 (generic "people") instead of 我; suitable for descriptive writing' },
        { target: '让外国人觉得 + adj', note: 'expanded version with 觉得 ("feel") — softer than direct emotion verb; more thoughtful' },
        { target: 'usage range', note: 'works for films, shows, places, technology, food — anything that has an emotional impact' },
      ],
      [ACT.grammarCausative],
    ),
    createContentItem(
      'V + 起来 + adj (U6 / U8)',
      'V + qǐlái + adj',
      'Impression pattern from Unit 6 / 8: a sensory verb + 起来 + an adjective gives an "impression" reading. 看起来很好 ("looks good"), 听起来不错 ("sounds nice"), 想起来真有意思 ("when you think about it, really interesting"). The construction softens claims — you are reporting an impression, not a fact.',
      'sentence',
      '这部电影听起来很有意思，看起来也不错。',
      '"This film sounds interesting; it also looks good." — chained impression; less assertive than 这部电影很有意思 (flat statement).',
      [
        { target: '看起来 + adj', note: 'visual impression; "looks…" — the most common; works for places, things, and people' },
        { target: '听起来 + adj', note: 'auditory impression; "sounds…" — also used metaphorically: 听起来很有道理 ("sounds reasonable")' },
        { target: '想起来 + adj', note: 'mental impression; "when you think about it…" — useful for reflective summaries' },
        { target: '吃起来 + adj', note: 'tasting impression; "tastes…" — for food descriptions' },
      ],
      [ACT.grammarCausative],
    ),
    createContentItem(
      '组合: 让 + 起来 (U6 + U8)',
      'zǔhé: ràng + qǐlái',
      'Combine the two patterns in one breath when describing a real experience: 让 X 觉得 Y (causative emotion) + V + 起来 + adj (impression). The combination is the standard intermediate-Mandarin shape for reflective travel narration: "this DID X to me, and now thinking back it FEELS Y".',
      'sentence',
      '这次旅行让我很感动，回想起来还是觉得不可思议。',
      '"This trip moved me deeply; thinking back, it still feels unbelievable." — the two patterns chained for emotional depth.',
      [
        { target: 'first half: 让 + emotion', note: 'the emotional impact at the time of experience' },
        { target: 'second half: V + 起来 + adj', note: 'the impression on reflection; gives the sentence a "looking back" quality' },
        { target: 'natural shape', note: '让…回想/想起来… — the standard intermediate frame for a travel or culture story' },
      ],
      [ACT.grammarCausative],
    ),
    createContentItem(
      '强化: 让人难以置信 (U7 + U8)',
      'qiánghuà: ràng rén nán yǐ zhì xìn',
      'A high-leverage stock phrase that combines U6 causative 让 + U7-style 难以置信 (unbelievable). Use it whenever something exceeds expectations — scenery, achievement, news. Reads as a finished, polished reaction rather than a raw 太好了.',
      'sentence',
      '兵马俑的规模让人难以置信。',
      '"The scale of the Terracotta Army is unbelievable." — single-sentence stock reaction; fits any awe-inspiring topic.',
      [
        { target: '让人 (universal)', note: 'use 人 (generic "people") for descriptive writing; use 我 for personal reaction' },
        { target: '难以置信 nányǐ zhìxìn', note: '"hard to believe"; four-character compound, more formal than 太厉害了' },
        { target: 'usage moment', note: 'reflective summary slot — typical at the END of a paragraph, not the start' },
      ],
      [ACT.grammarCausative],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar III: Broad synthesis (comparison + choice)
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '越…越… (cross-unit)',
      'yuè … yuè …',
      'Escalating-correlation pattern from across Level 2: the more X, the more Y. Two clauses linked by 越; each takes a verb or adjective. Also seen as 越来越 + adj ("more and more X") for the single-variable version. Used constantly in descriptive intermediate Mandarin.',
      'sentence',
      '我越学中文越觉得有意思。中国大城市越来越国际化。',
      '"The more I study Chinese, the more interesting I find it. China\'s big cities are getting more and more international." — two-clause escalation + single-variable escalation.',
      [
        { target: '越 X 越 Y', note: 'two-clause "the more…the more…"; X and Y are different verbs/adjectives' },
        { target: '越来越 + adj', note: 'single-variable "more and more X"; common for trends and changes over time' },
        { target: 'placement of 越', note: 'right before the verb or adjective; nothing else can come between 越 and what it modifies' },
        { target: 'usage range', note: 'study, weather, trends, relationships — anything that escalates' },
      ],
      [ACT.grammarChoice],
    ),
    createContentItem(
      '比起 X 来…, Y… (cross-unit)',
      'bǐqǐ X lái …, Y …',
      'Layered comparison pattern: 比起 X 来 sets up a point of comparison (X), then the main clause makes the comparison (Y is more/less than X on the relevant axis). More polished than the basic A 比 B + adj pattern; useful for nuanced opinion sentences.',
      'sentence',
      '比起去年来，今年的春节晚会更有创意。',
      '"Compared with last year, this year\'s Spring Festival gala is more creative." — layered comparison setting up a frame, then making the comparison.',
      [
        { target: '比起 X 来', note: 'sets up the comparison frame; X is the reference point' },
        { target: 'main clause', note: 'makes the actual comparison; usually contains 更 + adj ("more X")' },
        { target: 'vs A 比 B + adj', note: 'basic comparison is flatter; 比起来 sounds more reflective and considered' },
        { target: 'register', note: 'slightly formal; common in interviews, written opinion, and thoughtful spoken comparisons' },
      ],
      [ACT.grammarChoice],
    ),
    createContentItem(
      '与其 X 不如 Y (cross-unit)',
      'yǔqí X bùrú Y',
      'Preference-choice pattern: "rather than X, [it would be better to] Y". Used to argue for one option over another, gently. Two clauses with 与其 (rather than X) and 不如 (better to Y). Classic intermediate move for any opinion paragraph.',
      'sentence',
      '与其每天抱怨内卷，不如试一试躺平。',
      '"Rather than complaining about the rat-race every day, why not try lying flat?" — gen-Z preference choice using two U9 buzzwords.',
      [
        { target: '与其 X', note: 'introduces the option being rejected; placed before the verb or full clause' },
        { target: '不如 Y', note: 'introduces the preferred option; the recommendation' },
        { target: 'softening effect', note: 'frames a recommendation as preference comparison, not blunt directive' },
        { target: 'usage moment', note: 'opinion pieces, advice, gentle persuasion — never abrupt commands' },
      ],
      [ACT.grammarChoice],
    ),
    createContentItem(
      '既不 X 也不 Y (U2)',
      'jì bù X yě bù Y',
      'Parallel negation pattern from Unit 2: "neither X nor Y". Both items must be parallel parts of speech (two verbs OR two adjectives). 既不 + verb/adj + 也不 + verb/adj. Used for declining two options at once.',
      'sentence',
      '我既不追星，也不刷抖音。',
      '"I neither chase celebrities nor scroll Douyin." — model parallel negation using U9 pop-culture verbs.',
      [
        { target: '既不 + verb/adj', note: 'first negated item; 既 emphasizes the pairing with the second' },
        { target: '也不 + verb/adj', note: 'second negated item; the two must be parallel in part of speech' },
        { target: 'parallel rule', note: 'two verbs OR two adjectives — never one verb and one adjective; mixing breaks the pattern' },
      ],
      [ACT.grammarChoice],
    ),
    createContentItem(
      '组合句 — 三模式混用',
      'zǔhé jù — sān móshì hùnyòng',
      'Putting three synthesis patterns in one breath: 越…越…, 比起来, 与其…不如…. Test of whether you can chain patterns from across Level 2 in a single fluid opinion sentence.',
      'sentence',
      '比起去年来，我越来越觉得在清华生活有意思。与其抱怨内卷，不如把时间用在自己感兴趣的事情上。',
      '"Compared with last year, I find life at Tsinghua more and more interesting. Rather than complaining about the rat-race, better to spend time on what I actually care about." — two sentences each combining two patterns.',
      [
        { target: '比起去年来', note: 'comparison frame from Grammar III' },
        { target: '越来越觉得有意思', note: 'escalating correlation; positive trend over time' },
        { target: '与其抱怨…不如把时间用在…', note: 'preference choice; closes with a recommendation' },
      ],
      [ACT.grammarChoice],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '阅读 — 当代中国流行文化',
      'yuèdú — dāngdài Zhōngguó liúxíng wénhuà',
      'A substantial integrated paragraph on current events in Chinese pop culture. The text contains every grammar pattern from this review and many from earlier Level 2 units. Read aloud, then identify which sentence uses which pattern.',
      'sentence',
      '最近几年，中国流行文化在海外越来越火。比起十年前来，现在的中国偶像、网红、综艺节目都更国际化。直播带货是一个特别的例子——李佳琦、薇娅之所以能红起来，是因为他们用直播把购物变成了娱乐。但是听说，年轻人对内卷越来越反感，越来越多的人选择躺平。与其每天加班加点，不如过自己想要的生活。这个变化让很多专家觉得难以置信，回想起来还是觉得不可思议。难道这就是新一代中国年轻人的态度吗?',
      '"In recent years, Chinese pop culture has been getting more and more popular overseas. Compared with ten years ago, today\'s Chinese idols, internet celebrities, and variety shows are all more international. Livestream e-commerce is a special example — the reason Li Jiaqi and Viya could become viral is because they used livestreaming to turn shopping into entertainment. But it is said that young people are increasingly fed up with the rat-race, and more and more are choosing to lie flat. Rather than working overtime every day, [they prefer] living the life they want. This change leaves many experts in disbelief; thinking back, it still feels unreal. Is this really the attitude of the new generation of Chinese youth?"',
      [
        { target: '越来越火', note: 'sentence 1 — 越来越 + adj escalation (U2 / cross-unit)' },
        { target: '比起十年前来', note: 'sentence 2 — 比起来 layered comparison (cross-unit Grammar III)' },
        { target: '之所以…是因为…', note: 'sentence 3 — U7 formal cause-explanation' },
        { target: '听说…越来越…', note: 'sentence 4 — U8 hearsay narration + escalation' },
        { target: '与其…不如…', note: 'sentence 5 — preference-choice (cross-unit Grammar III)' },
        { target: '让…觉得 + 回想起来', note: 'sentence 6 — U6 causative + U6/U8 impression chained' },
        { target: '难道…吗?', note: 'sentence 7 — U4/U7 rhetorical push-back' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '理解问题 — 跨单元',
      'lǐjiě wèntí — kuà dānyuán',
      'Four cross-unit comprehension questions on the pop-culture paragraph. Answer each in a complete Mandarin sentence using at least one grammar pattern from the review.',
      'sentence',
      'Q1: 中国流行文化在海外的趋势是什么? Q2: 李佳琦、薇娅为什么能红起来? Q3: 年轻人对内卷的态度怎么样? Q4: 你觉得"躺平"是好是坏?',
      'Four questions covering trends (Q1: U2/cross-unit), causal explanation (Q2: U7), opinion description (Q3: U9), and personal-opinion debate (Q4: open).',
      [
        { target: 'A1: 中国流行文化在海外越来越火。', note: 'use 越来越 + adj — direct from sentence 1 of the reading' },
        { target: 'A2: 他们之所以能红起来，是因为把购物变成了娱乐。', note: 'use 之所以…是因为… — U7 formal cause-explanation' },
        { target: 'A3: 越来越多的年轻人选择躺平，与其加班不如过自己的生活。', note: 'use 越来越多 + 与其…不如… — escalation plus preference choice' },
        { target: 'A4: open answer', note: 'use 比起…来…, 让我觉得…, or 难道…吗? — whichever pattern fits your view' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Listening
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '听力 — 校刊采访',
      'tīnglì — xiàokān cǎifǎng',
      'The most challenging dialogue in Level 2 — a campus-magazine interview that hops between apology (U7), travel curiosity (U8), pop-culture commentary (U9), and a polite disagreement within eight turns. Read each turn, then identify which unit\'s grammar pattern it deploys.',
      'conversation',
      '记者: 在中国生活了一年，你最后悔的事是什么?\n你: 我最后悔的是没去看长城。我之所以没去，是因为那时候作业太多，根本抽不出时间。要是当时去了就好了，听说长城的景色真的让人惊叹。\n记者: 那最让你惊叹的中国体验是什么?\n你: 是中国高铁。比起我国家的火车来，中国高铁又快又安静。回想起来，第一次坐高铁的时候我都觉得难以置信。\n记者: 那你怎么看中国的流行文化呢?\n你: 越看越喜欢。中国偶像和网红跟海外的不太一样——他们的粉丝文化更强。不过有时候我也会觉得太卷了。\n记者: 有人说"躺平"是一种消极态度，你同意吗?\n你: 难道追求平衡的生活就是消极吗? 我倒是觉得，与其每天内卷，不如找到自己的节奏。\n记者: 最后给读者一句话?\n你: 入乡随俗——既不放弃自己的文化，也不拒绝新的体验。',
      'Eight turns spanning U7 / U8 / U9 / cross-unit / chengyu. Each interviewee turn deploys a different grammar pattern from Level 2 — a graduation-level demonstration.',
      [
        { target: 'turn 2 — U7 regret', note: '我之所以没去，是因为… + 要是…就好了 — full U7 apology-rhetoric stack' },
        { target: 'turn 2 — U8 narration', note: '听说…让人惊叹 — U8 hearsay + awe causative' },
        { target: 'turn 4 — U6/U8 comparison + impression', note: '比起…来…，又快又安静 + 回想起来…难以置信 — layered comparison plus impression chain' },
        { target: 'turn 6 — U9 + cross-unit escalation', note: '越看越喜欢 + 跟…不太一样 + 太卷了 — escalation, comparison, U9 slang' },
        { target: 'turn 8 — U4/U7 rhetoric + cross-unit choice', note: '难道…吗? + 与其…不如… — push-back rhetoric followed by preference choice' },
        { target: 'turn 10 — U5 chengyu + U2 parallel negation', note: '入乡随俗 + 既不…也不… — chengyu closing plus parallel negation' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      '听力 — 角色互换',
      'tīnglì — juésè hùhuàn',
      'Stretch: re-perform the interviewee role with your OWN content. Keep the same grammar pattern in each turn but swap the topic — a different regret, a different intriguing experience, a different pop-culture take, a different summary chengyu. Tests whether the patterns are truly portable.',
      'conversation',
      '记者: 你最后悔的事是什么?\n你: [your regret + 之所以…是因为… + 要是…就好了]\n记者: 最让你惊叹的中国体验?\n你: [your awe moment + 比起…来 + 让人难以置信]\n记者: 你怎么看中国的流行文化?\n你: [your view + 越…越… + 跟…不一样]\n记者: 有人说…你同意吗?\n你: [push back + 难道…吗? + 与其…不如…]\n记者: 给读者一句话?\n你: [a chengyu summary + 既不…也不…]',
      'AI tutor will play the reporter; you fill in each turn with the right grammar pattern but your own content.',
      null,
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '写作 — 综合反思',
      'xiězuò — zōnghé fǎnsī',
      'Open prompt: write 7–9 sentences about a recent experience in China that brought together a mistake (regret), an intriguing thing, and a pop-culture trend you formed an opinion about. Hit at least one pattern from each of U7, U8, U9, plus at least one synthesis pattern (越…越…, 比起来, 与其…不如…, 既不…也不…). Mark each pattern in parentheses for self-audit.',
      'sentence',
      '示例: 在中国一年了，我最后悔的事是没在春节回家看朋友。我之所以没回去，是因为机票太贵了。(U7) 要是当时早点订就好了。(U7) 不过这一年最让我惊叹的是中国的高铁——比起国外的火车来，它又快又便宜。(U8 + 比起来) 听说中国还在修很多新线路，让人难以置信。(U8) 至于流行文化，我越来越喜欢中国的综艺节目——又有意思又有创意。(越…越…) 我既不像有些人那样追星，也不完全躺平。(U2 + U9) 与其抱怨内卷，不如找到自己的节奏。(与其…不如…)',
      '"I have been in China for a year, and the thing I regret most is not going home to see friends for Spring Festival. The reason I did not go back is because the plane tickets were too expensive. If only I had booked earlier. The most awe-inspiring thing this year, though, was China\'s high-speed rail — compared with trains overseas, it is both fast and cheap. I heard China is still building many new lines, which is unbelievable. As for pop culture, I am liking Chinese variety shows more and more — both interesting and creative. I neither chase celebrities like some people do nor fully lie flat. Rather than complaining about the rat-race, it is better to find my own rhythm." — eight sentences, all four units, four synthesis patterns explicit.',
      [
        { target: '我之所以…是因为… (U7)', note: 'cause-explanation; placed AFTER the admission' },
        { target: '要是…就好了 (U7)', note: 'counterfactual regret; softens self-criticism' },
        { target: '比起…来…(cross-unit)', note: 'layered comparison setting up a frame, then making the comparison' },
        { target: '听说…让人难以置信 (U8)', note: 'hearsay narration + awe causative — high-leverage U8 combination' },
        { target: '越来越喜欢 (cross-unit)', note: 'single-variable escalation; positive trend' },
        { target: '既不…也不… (U2)', note: 'parallel negation; both items parallel parts of speech' },
        { target: '与其…不如… (cross-unit)', note: 'preference choice; closes the paragraph with a recommendation' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '写作清单 — 自查',
      'xiězuò qīngdān — zìchá',
      'Self-audit checklist for the writing piece. Run through it once before submitting: every Level 2 graduate should be able to tick every box on a 7-9-sentence integrated paragraph.',
      'sentence',
      '□ U7 apology/regret pattern used (之所以…是因为… or 要是…就好了)\n□ U8 curiosity/narration pattern used (听说 / 据说 / 让人惊叹 / V + 起来)\n□ U9 pop-culture vocab used (偶像/网红/直播/内卷/躺平/yyds)\n□ One cross-unit synthesis pattern (越…越…, 比起来, 与其…不如…, 既不…也不…)\n□ Tone marks correct throughout\n□ At least one U5 chengyu dropped naturally',
      'A six-item self-check; if any box is empty, revise that sentence before moving on.',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Chengyu Sprinkling
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '入乡随俗',
      'rù xiāng suí sú',
      'U5 chengyu — "enter the village, follow the customs / when in Rome, do as the Romans do". The single highest-leverage chengyu for any year-in-China reflection: summarizes the whole cultural-adjustment arc in four syllables. Drop it in the closing slot of a reflective paragraph or interview answer.',
      'sentence',
      '在中国生活，最好入乡随俗——既尊重当地文化，也保留自己的特色。',
      '"Living in China, it is best to do as the locals do — both respect the local culture and preserve your own character." — chengyu plus 既…也… parallel; classic closing line.',
      [
        { target: '入乡随俗 (literal)', note: '"enter village, follow customs"; the literal image is from the Tang dynasty' },
        { target: '入乡随俗 (figurative)', note: '"adapt to local customs when in a new place"; the everyday usage' },
        { target: 'best slot', note: 'closing summary in a reflective paragraph; do not open with it' },
      ],
      [ACT.chengyu],
    ),
    createContentItem(
      '百闻不如一见',
      'bǎi wén bù rú yī jiàn',
      'U5 chengyu — "hearing a hundred times is not as good as seeing once" / "seeing is believing". Perfect for U8 travel reflection: use it to praise a place that exceeded its reputation. Drop in the middle of a travel-narration paragraph for added weight.',
      'sentence',
      '我以前只是听说长城很壮观，亲眼看了才知道——真的是百闻不如一见!',
      '"I had only heard that the Great Wall was magnificent; seeing it in person made me realize — truly, seeing is believing!" — natural integration with 听说 narration.',
      [
        { target: '百闻 (a hundred hearings)', note: 'hyperbolic — "even a hundred reports are not enough"' },
        { target: '不如 (not as good as)', note: 'the cross-unit Grammar III preference operator; here used inside the chengyu itself' },
        { target: '一见 (one viewing)', note: 'a single direct experience trumps any second-hand account' },
        { target: 'usage moment', note: 'after describing a place you finally saw in person — emphasizes the gap between rumor and reality' },
      ],
      [ACT.chengyu],
    ),
    createContentItem(
      '名不虚传',
      'míng bù xū chuán',
      'U5 chengyu — "the reputation is not falsely transmitted / it lives up to its name". Use when something met or exceeded its reputation. Pairs naturally with U8 travel narration: 北京烤鸭名不虚传 ("Peking duck lives up to its reputation"). Slightly polished register; appropriate for written reflection and interview answers.',
      'sentence',
      '都说北京的烤鸭是一绝，吃了之后我才发现——果然名不虚传。',
      '"They say Peking duck is one-of-a-kind; after tasting it, I realized — it really does live up to its reputation."',
      [
        { target: '名 (reputation)', note: 'one\'s name or reputation, especially in the cultural-fame sense' },
        { target: '不虚 (not false / not empty)', note: '虚 = "empty / unsubstantiated"; 不虚 = "substantiated"' },
        { target: '传 (transmitted)', note: 'word-of-mouth transmission; how reputations travel' },
        { target: 'pairing with 听说', note: '听说 sets up the rumor; 名不虚传 confirms it after direct experience' },
      ],
      [ACT.chengyu],
    ),
    createContentItem(
      '滴水穿石',
      'dī shuǐ chuān shí',
      'U5 chengyu — "dripping water bores through stone / persistence wears down any obstacle". Use for sustained-effort reflection: learning Mandarin for a year, training for a marathon, building a habit. Pairs naturally with U7 study reflection. Tone reading: 1+3+1+2 (no sandhi).',
      'sentence',
      '学中文要有滴水穿石的精神——每天进步一点，一年后回头看，已经走了很远。',
      '"Learning Chinese requires the spirit of dripping water boring through stone — progress a little each day, look back after a year and you will have come a long way." — Tsinghua-student favorite reflection.',
      [
        { target: '滴水 (dripping water)', note: 'tiny, slow, individually weak — but persistent' },
        { target: '穿石 (bore through stone)', note: 'overcome an obstacle that single drops could not — through repetition' },
        { target: 'usage moment', note: 'any reflection on long, slow effort; especially fitting for a Level 2 graduation paragraph' },
      ],
      [ACT.chengyu],
    ),
    createContentItem(
      '使用建议',
      'shǐyòng jiànyì',
      'When NOT to drop a chengyu: in casual peer chat (sounds bookish), in a direct apology (changes the tone), or stacked back-to-back (overwhelming). Best slots: reflective summary, interview answer, formal writing close, polite emphasis. The U5 rule of thumb — one chengyu per paragraph is plenty; two is the maximum; three sounds like you are showing off (班门弄斧, ironically).',
      'sentence',
      'GOOD: "这一年下来真的让我感动，也让我学会了入乡随俗。" (one chengyu, reflective close)\nBAD: "对不起。我之所以没来是因为入乡随俗，百闻不如一见，名不虚传。" (apology with three stacked chengyu — sounds absurd)',
      'Sprinkle, do not stack — the right chengyu at the right moment lands; the wrong chengyu (or too many) sounds like showing off in front of an expert (班门弄斧).',
      [
        { target: '一个段落一个 (one per paragraph)', note: 'the rule of thumb; respect the listener\'s register' },
        { target: '反思 / 总结的位置', note: 'reflective summary slot — at the END of a paragraph, not the middle' },
        { target: '别叠加 (do not stack)', note: 'two chengyu in one breath is the absolute ceiling; three is comical' },
      ],
      [ACT.chengyu],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task: graduation challenge
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '毕业任务 — 北京一年',
      'bìyè rènwù — Běijīng yī nián',
      'Graduation challenge: roleplay the interview "If you had to live in Beijing for a year, what would you need to handle?" Sustain a 10-turn dialogue with the AI tutor playing a curious Beijing-based friend. Cover housing, transport, food, social life, internet, pop culture, study, and at least one mistake you might make as a foreigner. Use every Level 2 toolkit you have built.',
      'conversation',
      '[Beijing café]\n朋友: 听说你要在北京住一年! 你最担心什么?\n你: [housing/transport concern + 之所以…是因为… or 要是…就好了 — U7]\n朋友: 在北京吃饭怎么办? 北京菜你受得了吗?\n你: [food impression + 让我觉得 + V + 起来 + adj — U6/U8]\n朋友: 那中国的社交圈呢? 怎么交朋友?\n你: [social plan + 比起…来…, 越…越… — cross-unit]\n朋友: 你怎么看中国的流行文化? 看不看抖音?\n你: [pop-culture take + 既不…也不…, 与其…不如… — U2/cross-unit/U9]\n朋友: 有人说外国人在中国都会犯一些错误，你觉得呢?\n你: [push-back + 难道…吗? — U4/U7]\n朋友: 学习方面准备得怎么样?\n你: [study reflection + 滴水穿石 / U5 chengyu + 越…越…]\n朋友: 给自己一年后的自己一句话?\n你: [closing + 入乡随俗 or 名不虚传 — U5 chengyu]',
      'Ten turns; the AI tutor will probe weak spots in your answers and force every Level 2 pattern into use. Aim for at least one pattern from each of U7, U8, U9, plus two cross-unit synthesis patterns, plus one chengyu in the closing turn.',
      [
        { target: '住房/交通 (turn 2)', note: 'housing or transport concern; use U7 regret/explanation pattern' },
        { target: '饮食 (turn 4)', note: 'food impression; use U6/U8 causative + impression chain' },
        { target: '社交 (turn 6)', note: 'social life; use cross-unit comparison + escalation' },
        { target: '流行文化 (turn 8)', note: 'pop culture; use U9 vocab + cross-unit choice/negation' },
        { target: '反驳 (turn 10)', note: 'push back politely on the foreigner-mistake claim; use 难道…吗?' },
        { target: '学习 (turn 12)', note: 'study reflection; drop 滴水穿石 chengyu naturally' },
        { target: '结尾 (turn 14)', note: 'closing message; one chengyu — 入乡随俗 or 名不虚传 — to seal the interview' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战 — 道歉子任务',
      'tiǎozhàn — dàoqiàn zǐ rènwù',
      'Stretch: in the same scene, the Beijing friend mentions a small social blunder you might make — interrupting an elder, refusing tea improperly, calling someone by their given name instead of family-name + title. Respond with a full three-step U7 apology paragraph: admit fault, explain with 之所以…是因为…, then close with 要是…就好了. Tests whether the apology framework is automatic under conversational pressure.',
      'conversation',
      '朋友: 比如说，你可能会直接叫老师的名字，不加"老师"两个字。\n你: 啊，是的，对不起，我之前不知道这是不礼貌的——我之所以这样做，是因为在我国家直呼其名是正常的。要是我早点知道这个文化差异就好了，以后我一定会注意。',
      '"Ah, yes, sorry, I did not know before that this was impolite — the reason I did this is because in my country calling someone by their first name is normal. If only I had known about this cultural difference earlier, from now on I will definitely be careful."',
      [
        { target: '对不起 (admit)', note: 'step 1 — admission of fault; opens the apology sincerely' },
        { target: '我之所以…是因为… (explain)', note: 'step 2 — explanation; placed AFTER admission so it is not an excuse' },
        { target: '要是…就好了 (regret)', note: 'step 3 — counterfactual regret; closes the apology with the wished-for alternative' },
        { target: '以后…一定会 (commitment)', note: 'optional fourth step — commitment to change; sometimes added to the close' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战 — 反向辩护',
      'tiǎozhàn — fǎnxiàng biànhù',
      'Stretch: the Beijing friend pushes back: "But surely all foreigners eventually go home — why even adapt? Just stay tourist." Defend your decision to adapt using 难道…吗? rhetorical + 与其…不如… preference + one chengyu. Tests whether you can deploy combat-mode Mandarin without losing politeness.',
      'conversation',
      '朋友: 不过外国人迟早都要回国，何必入乡随俗呢? 当游客就好了。\n你: 难道一年的时间不够长吗? 与其当一年的游客，不如真正了解这个文化。百闻不如一见——我想亲眼看，亲耳听，亲身体验。这一年下来，对我自己的成长越来越重要。',
      '"Wait, foreigners go home sooner or later, why bother adapting? Just be a tourist. — Is a year really not long enough? Rather than being a tourist for a year, better to truly understand the culture. Seeing is believing — I want to see with my own eyes, hear with my own ears, experience for myself. This year is more and more important for my own growth."',
      [
        { target: '难道…吗? (push back)', note: 'U4/U7 rhetorical — opens the defense without bluntly disagreeing' },
        { target: '与其…不如… (preference)', note: 'cross-unit choice — frames your decision as a considered preference' },
        { target: '百闻不如一见 (chengyu)', note: 'U5 chengyu — perfect for arguing the value of direct experience' },
        { target: '越来越重要 (escalation)', note: 'cross-unit 越来越 + adj — closes with a positive trend' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '毕业感言',
      'bìyè gǎnyán',
      'Closing reflection — one sentence for the magazine to print. Combine one chengyu, one synthesis pattern, and one personal note. This is the moment Level 2 graduates leave their signature.',
      'sentence',
      '示例: 这一年让我深深地感受到——百闻不如一见，与其在屏幕前看中国，不如亲自来走一走，看一看。',
      '"This year has made me feel deeply that seeing is believing — rather than watching China through a screen, it is better to come walk a little, look a little, in person." — single sentence closing, two grammar patterns + one chengyu + one personal note.',
      [
        { target: '让我深深感受到 (causative)', note: 'U6 让 + emotion; opens the reflection with personal impact' },
        { target: '百闻不如一见 (chengyu)', note: 'U5 chengyu; the reflection\'s emotional core' },
        { target: '与其…不如… (choice)', note: 'cross-unit preference; closes the sentence with a recommendation for future readers' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
