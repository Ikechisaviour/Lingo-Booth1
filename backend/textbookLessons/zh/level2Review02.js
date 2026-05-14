// Level 2 · Review 2 — Second Wave Consolidation (Mandarin Chinese)
// Consolidates Level 2 Adult Units 7-12 (Safety, Medical, Weekend, Rules, Job
// Hunting, Housing) and Level 2 thematic Units 4-6 (Men/Women, Chengyu &
// Proverbs, Performances & Festivals). Picture the second half of a year in
// Beijing — your daily life is now thicker: you handle emergencies, navigate
// hospitals, sign rental contracts, search for jobs, and weave proverbs into
// real conversations about culture and performance.
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
  orientation: 'zh-l2r2-orientation',
  pronunciation: 'zh-l2r2-pronunciation',
  vocabularyOne: 'zh-l2r2-vocab-one',
  vocabularyTwo: 'zh-l2r2-vocab-two',
  grammarObligation: 'zh-l2r2-grammar-obligation',
  grammarShiDe: 'zh-l2r2-grammar-shi-de',
  grammarLayered: 'zh-l2r2-grammar-layered',
  reading: 'zh-l2r2-reading',
  listening: 'zh-l2r2-listening',
  writing: 'zh-l2r2-writing',
  drillsChengyu: 'zh-l2r2-drills-chengyu',
  task: 'zh-l2r2-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What this review covers',
    goals: [
      'Recall vocabulary, grammar, and culture notes from Level 2 Adult Units 7-12 (Safety, Medical, Weekend, Rules, Job Hunting, Housing) and Level 2 thematic Units 4-6 (Men/Women, Chengyu & Proverbs, Performances).',
      'Layer obligation/permission, past-circumstance emphasis, and richly-modified description in one continuous Beijing scene — the kinds of paragraphs you now produce in real life.',
      'Notice that everything you learned in the first half (greetings, food, commute, shopping, dorm life) is still active — Review 2 stacks on top of Review 1, it does not replace it.',
    ],
    task: 'Picture a difficult week in Beijing: a minor accident, a clinic visit, a frustrating workplace rule, a job interview, an apartment lease, and a weekend festival to recover. By the end of this review you can narrate the whole week in continuous Mandarin without rehearsing each line.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: '发音 — Sound traps consolidated from Units 7-12 / 4-6',
    goals: [
      'Distinguish 被 (bèi, passive marker) from 病 (bìng, illness) — both sharp fourth tones with similar finals; mishearing them in 我被病了 (a wrong sentence anyway) versus 我生病了 makes the whole report incoherent.',
      'Pronounce 必须 (bìxū) and 应该 (yīnggāi) so the modal weight is audible — flat or mumbled modals make a strict rule sound like a casual suggestion.',
      'Read 面试 (miànshì) and 面子 (miànzi) cleanly — same opening character, different second-syllable tones (4th vs neutral) and very different meanings (job interview vs social face).',
      'Apply 不 sandhi inside the high-frequency phrase 不仅…而且… (bùjǐn… érqiě…) — the 不 stays 4th tone before 仅 (3rd), but flips to bú in 不是…而是… before 是 (4th).',
      'Read 押金 (yājīn, deposit) and 中介 (zhōngjiè, broker) — common housing terms that compress fourth + first / first + fourth into rapid two-syllable units.',
      'Drill chengyu rhythm: 入乡随俗 rù xiāng suí sú, 班门弄斧 bān mén nòng fǔ, 千里之行 qiān lǐ zhī xíng — four-syllable units land with even spacing, not the trailing-off pattern English speakers default to.',
    ],
    task: 'Read each pronunciation trap aloud three times, then drop it into a short Beijing-life sentence so the sound is locked into context, not isolated drills.',
  },
  {
    id: ACT.vocabularyOne,
    section: 'Vocabulary I',
    title: '词汇一 — Safety, medical, and workplace rules (U7 + U8 + U10)',
    goals: [
      'Recall the safety-and-emergency core from Unit 7: emergency numbers, incident verbs, and urgent commands.',
      'Recall the medical core from Unit 8: hospital departments, symptom verbs, and payment vocabulary.',
      'Recall the rules-and-policies core from Unit 10: compliance, prohibition, and consequences for violation.',
    ],
    task: 'For each of the 12 items below, say one Beijing-context sentence that places the word in a real scene — a 派出所 report, a 挂号 line, or a posted dormitory notice.',
  },
  {
    id: ACT.vocabularyTwo,
    section: 'Vocabulary II',
    title: '词汇二 — Housing, jobs, and performances (U12 + U11 + Thematic U6)',
    goals: [
      'Recall the housing core from Unit 12: 押金 (deposit), 房东 (landlord), 中介 (broker), 合同 (contract), 水电费 (utilities).',
      'Recall the job-hunting core from Unit 11: 简历 (résumé), 面试 (interview), 招聘 (recruiting), 入职 (onboarding), 薪资 (salary).',
      'Recall the performance and festival core from Thematic Unit 6: 京剧 (Peking opera), 春晚 (Spring Festival Gala), 庙会 (temple fair), 表演 (performance), 演员 (performer).',
    ],
    task: 'For each of the 12 items below, pair it with the kind of conversation in which it would appear — apartment lease signing, job offer call, weekend festival outing — and say one sentence to anchor it.',
  },
  {
    id: ACT.grammarObligation,
    section: 'Grammar I',
    title: '语法一 — 应该 / 必须 / 可以 / 不能 obligation–permission scale (U7 + U10)',
    goals: [
      'Use 应该 (yīnggāi) for soft obligation — what one ought to do — recommended but not enforced.',
      'Use 必须 (bìxū) for hard obligation — a non-negotiable requirement whose violation triggers a 罚款 (fine) or 警告 (warning).',
      'Use 可以 (kěyǐ) for granted permission — what is allowed — and 不能 (bùnéng) for the everyday spoken prohibition.',
      'Order the full scale from softest to strongest: 可以 (permitted) → 应该 (recommended) → 必须 (required); negative scale: 不应该 (shouldn\'t) → 不能 (can\'t) → 不许 (forbidden) → 禁止 (strictly prohibited).',
    ],
    task: 'Take ONE rule (e.g., wearing a mask in a Beijing hospital) and rewrite it four times with each modal — notice how the same factual content shifts from a casual hint to a posted-sign command.',
  },
  {
    id: ACT.grammarShiDe,
    section: 'Grammar II',
    title: '语法二 — 是…的 emphatic structure for past circumstances (U7 + U11)',
    goals: [
      'Use 是…的 to focus on the WHEN / WHERE / HOW / WHO of a completed past event whose occurrence is already established between speakers — the listener already knows it happened, and you are now clarifying one detail.',
      'Form: SUBJECT + 是 + [time/place/manner phrase] + V + (object) + 的. The 是 sits before the focused phrase; the 的 sits after the verb (and usually before the object if there is one).',
      'Contrast 我昨天来的 ("[the fact is] I came yesterday" — when-focus) with 我昨天来了 ("I came yesterday" — neutral statement of completion). The 是…的 structure clarifies one slot; 了 simply marks completion.',
      'Apply to incident reports (Unit 7) and job interviews (Unit 11) — the two places where a follow-up question is almost always about WHEN, WHERE, or HOW something happened.',
    ],
    task: 'Convert three plain past statements into 是…的 form, then answer three follow-up questions about a stolen-phone report using the structure.',
  },
  {
    id: ACT.grammarLayered,
    section: 'Grammar III',
    title: '语法三 — Layered descriptions: 不仅…而且… / 既…又… / 又…又… (U8 + Thematic U4 + U6)',
    goals: [
      'Use 不仅…而且… (bùjǐn… érqiě…) to escalate from one feature to a stronger one — formal-written register, common in 简历 (résumés) and 招聘 (recruiting) descriptions; the second clause carries more weight than the first.',
      'Use 既…又… (jì… yòu…) to list two compatible qualities of the same subject — slightly literary, common when describing a person\'s character (a person is BOTH X AND Y), often paired with positive evaluation.',
      'Use 又…又… (yòu… yòu…) as the everyday spoken form of "both X and Y" — neutral register, fits casual descriptions of food, weather, weekend plans, or performances.',
      'Choose the right pattern by register: 不仅…而且… (written / persuasive) > 既…又… (literary / character) > 又…又… (spoken / everyday).',
    ],
    task: 'Describe one person, one performance, and one apartment using all three patterns in turn — notice how the same factual material reads differently at each register.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: '阅读 — A multi-topic Beijing paragraph',
    goals: [
      'Read a short integrated paragraph that mixes safety, medical, rules, housing, and weekend material in one continuous text — the kind of email or WeChat update a Beijing exchange student writes home after a hard week.',
      'Identify each topic\'s vocabulary in context, then answer four comprehension questions tying detail back to its source unit.',
    ],
    task: 'Read the paragraph aloud once, then summarize the writer\'s week in three Mandarin sentences naming the topic of each sentence (safety / medical / rules / housing / weekend).',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: '听力 — A multi-context dialogue at 清华大学',
    goals: [
      'Follow a dialogue where one student vents about a difficult week — accident, clinic, strict dorm rule, job interview, apartment search — and a friend responds with consolation, advice, and a festival invitation that blends a chengyu in naturally.',
      'Track which modal (应该 / 必须 / 可以 / 不能) each speaker uses and notice the register shift from formal complaint to casual consolation.',
    ],
    task: 'Listen once and name the topic of each turn, then re-perform the dialogue with your own week of complaints swapped in — keep the modal weights honest to the consequences.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: '写作 — A reflection on a hard week in Beijing',
    goals: [
      'Write a 6-8 sentence reflection covering at least four of the six adult units (Safety / Medical / Rules / Job / Housing / Weekend) plus one chengyu from Thematic Unit 5.',
      'Use 应该 or 必须 at least once, 是…的 at least once, and one of the three layered-description patterns (不仅…而且… / 既…又… / 又…又…) at least once — so the writing demonstrates this review\'s grammar.',
    ],
    task: 'Write your own reflection paragraph using the model below as a template, then read it aloud with correct tones.',
  },
  {
    id: ACT.drillsChengyu,
    section: 'Mixed Drills',
    title: '混合练习 — Chengyu and proverbs in real contexts',
    goals: [
      'Drop chengyu from Thematic Unit 5 into the everyday contexts of the adult units: 入乡随俗 (do as the locals do) at the 派出所 / clinic / new apartment; 千里之行始于足下 at a job interview; 失败是成功之母 after a rejected lease application.',
      'Avoid the over-deployment trap noted in Unit 5 — one or two chengyu per paragraph reads as cultured, three or more reads as a translated dictionary.',
    ],
    task: 'For each of three life situations below, drop in ONE chengyu and write the surrounding sentence so the idiom is grammatical, register-appropriate, and earned.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: '任务 — Narrate a difficult week in Beijing',
    goals: [
      'Combine vocabulary and grammar from all six adult units plus at least one chengyu from Thematic Unit 5 into one continuous Mandarin narration of a hard week.',
      'Hit at least four of: a 派出所 incident report (U7), a clinic visit (U8), a dorm rule violation (U10), a job interview (U11), an apartment search with 中介 (U12), and a festival outing (U6) — bridged by the modals and layered-description patterns from this review.',
    ],
    task: 'Roleplay this narration with the conversation tutor playing a friend back home who asks follow-up questions about each event — aim for a 10-turn exchange where you answer in fully integrated Mandarin paragraphs.',
  },
];

const lesson = {
  title: 'Level 2 · Review 2: 第二轮复习 — Second Wave Consolidation (Units 7-12 + Thematic 4-6)',
  category: 'daily-life',
  difficulty: 'intermediate',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'review-grading-obligation', label: 'Grading obligation across topics', goal: 'Pick one rule from a different unit each time (safety, medical, housing, work) and grade it with 可以 / 应该 / 必须 / 不能 so the listener hears how strict the rule is.' },
    { id: 'review-shi-de-emphasis', label: 'Past-circumstance emphasis with 是…的', goal: 'Answer a follow-up question about WHEN / WHERE / HOW a past event happened using 是…的 — works for a stolen wallet report, a clinic visit timing, or a job-application date.' },
    { id: 'review-layered-description', label: 'Layered description at three registers', goal: 'Use 不仅…而且… (written/persuasive), 既…又… (literary/character), and 又…又… (spoken/everyday) for the same subject and feel the register shift.' },
    { id: 'review-chengyu-in-context', label: 'Chengyu in adult-life contexts', goal: 'Drop one chengyu into a paragraph about safety, work, or housing — never more than one per paragraph, never floating without a surrounding sentence.' },
  ],
  relatedPools: ['topic-society', 'topic-business', 'topic-health', 'topic-housing', 'topic-culture', 'pos-chengyu'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '本次复习目标',
      'běn cì fùxí mùbiāo',
      'By the end of this review you can narrate a multi-topic Beijing scene in continuous Mandarin: handle a safety incident, navigate a clinic, follow a dorm rule, manage a job interview, sign an apartment lease, and unwind at a weekend festival — without losing the thread or rehearsing each turn.',
      'word',
      'Units 7+8+9+10+11+12 (Adult Track) + Units 4+5+6 (Thematic) combined into one continuous adult life.',
      'Review 2 is consolidation, not new material — its job is to weave the second half of Level 2 into the kind of paragraph you actually produce in daily life.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      '场景设定 — 清华大学的难熬一周',
      'chǎngjǐng shèdìng — Qīnghuá Dàxué de nán\'áo yī zhōu',
      'You are an exchange student at 清华大学. This week your phone got stolen near the south gate, you spent a morning at the campus clinic with a fever, your dorm tightened the curfew rule, you had a job interview at a Beijing startup, you signed an apartment lease for after graduation, and you finally caught a 庙会 (temple fair) on the weekend to recover. Every grammar pattern in this review is anchored to one of these scenes.',
      'word',
      'Phone stolen (U7) → clinic visit (U8) → curfew rule (U10) → job interview (U11) → apartment lease (U12) → 庙会 festival (Thematic U6).',
      'The scene is denser than Review 1 — this is intentional, since adult life in Beijing is denser than the first month of dormitory life.',
      [
        { target: '派出所报案 (U7)', note: 'reporting the stolen phone at the neighborhood police box near the south gate' },
        { target: '清华校医院 (U8)', note: 'morning visit to the campus clinic with a fever and sore throat' },
        { target: '宿舍宵禁 (U10)', note: 'newly posted curfew rule with a 罚款 (fine) for late returns' },
        { target: '面试 (U11)', note: 'job interview at a Beijing startup with the 入职 (onboarding) policy explained' },
        { target: '中介签合同 (U12)', note: 'apartment broker meeting to sign a 押金 (deposit) and 合同 (lease)' },
        { target: '地坛庙会 (Thematic U6)', note: 'weekend trip to the Ditan Temple Fair to recover from the week' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '复习方法',
      'fùxí fāngfǎ',
      'How to work through this review: re-listen to your own audio from each source unit before starting, then attempt every drill once without looking. Where you stumble, mark the source unit (U7-12 or Thematic U4-6) and revisit only that unit\'s grammar card. The point is consolidation, not perfection on first pass.',
      'word',
      'Listen → drill without notes → mark the source unit of each stumble → revisit only that one card.',
      'Spending one focused hour per stumble beats re-reading every unit cover to cover.',
      null,
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '被 vs 病',
      'bèi vs bìng',
      'Both sharp fourth tones, both extremely common in incident-and-clinic narration. 被 (bèi) marks the passive ("my wallet got stolen"); 病 (bìng) means "illness / to be sick". Slurring them turns a coherent emergency report into nonsense.',
      'word',
      '我的钱包被偷了。(My wallet got stolen.) vs 我生病了。(I got sick.)',
      'A common stumble for English speakers because the two finals (-ei vs -ing) feel similar at speed.',
      [
        { target: '被 bèi', note: 'passive marker; 4th tone with -ei final; from Unit 7' },
        { target: '病 bìng', note: 'illness; 4th tone with -ing final; from Unit 8' },
        { target: 'pair drill', note: 'alternate 被 / 病 ten times until the -ei vs -ing contrast is automatic' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '必须 / 应该',
      'bìxū / yīnggāi',
      'The weight of an obligation is audible in the tones. 必须 (bìxū) — sharp 4th + light 1st — lands like a verdict; 应该 (yīnggāi) — gentle 1st + 1st — sounds like a recommendation. Flatten either modal and your rule loses its register.',
      'word',
      '必须戴口罩 (must wear a mask) vs 应该戴口罩 (should wear a mask)',
      'Same factual content, completely different consequences for breaking the rule.',
      [
        { target: '必须 bìxū', note: '4th + 1st; non-negotiable requirement; from Units 7 and 10' },
        { target: '应该 yīnggāi', note: '1st + 1st; recommendation; from Units 7 and 10' },
        { target: 'contrast', note: '必须 escalates; 应该 advises — pronunciation must support the meaning' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '面试 vs 面子',
      'miànshì vs miànzi',
      'Two compounds sharing the opening 面 (miàn) but diverging in the second syllable. 面试 (miànshì) = job interview, with both syllables full-toned; 面子 (miànzi) = social face / reputation, with neutral-tone second syllable. Mixing them up in a workplace conversation is memorable for all the wrong reasons.',
      'word',
      '明天有面试 (I have an interview tomorrow) vs 给他留面子 (save face for him)',
      'The neutral vs full tone in the second syllable is the only distinguishing cue at conversational speed.',
      [
        { target: '面试 miànshì', note: '4th + 4th; job interview; from Unit 11' },
        { target: '面子 miànzi', note: '4th + neutral; social face / reputation; from Unit 1 culture note, still active' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '不仅…而且… (不 sandhi)',
      'bùjǐn… érqiě… (bù sandhi)',
      '不 (bù) sandhi inside the layered-description connector. 仅 (jǐn) is 3rd tone, so 不 stays as 4th-tone bù in 不仅. Compare with 不是 → búshì where 是 (shì) is 4th tone and 不 flips to bú. Same word, two pronunciations depending on the next syllable.',
      'word',
      '不仅… bùjǐn… (stays bù) vs 不是… búshì… (flips to bú)',
      'The 不-sandhi rule from Unit 1 / Foundation is still active at every level — it never goes away.',
      [
        { target: '不 + 1st/2nd/3rd → bù', note: 'no sandhi; e.g., 不仅 bùjǐn (3rd follows)' },
        { target: '不 + 4th → bú', note: 'sandhi; e.g., 不是 búshì, 不要 búyào' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '押金 / 中介',
      'yājīn / zhōngjiè',
      'Two housing terms that compress rapid tone shifts into a single two-syllable unit. 押金 (yājīn) = security deposit, 1st + 1st, evenly stressed. 中介 (zhōngjiè) = real-estate broker, 1st + 4th, with the second syllable falling sharply. Both appear in every Beijing apartment conversation.',
      'word',
      '中介要押金 (the broker wants a deposit) — five syllables across four tones; common rhythm in housing talk',
      'From Unit 12 — the two terms that anchor every apartment-search conversation in Beijing.',
      [
        { target: '押金 yājīn', note: '1st + 1st; security deposit; usually one to three months\' rent' },
        { target: '中介 zhōngjiè', note: '1st + 4th; broker; takes one month\'s rent as commission in Beijing' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '成语节奏',
      'chéngyǔ jiézòu',
      'Four-syllable chengyu land with EVEN spacing, not the trailing-off pattern English speakers default to. Each of the four syllables carries its own weight; weak final syllables make the chengyu sound mumbled. Drill: 入乡随俗, 班门弄斧, 千里之行 — say each at a metronome-steady pace.',
      'word',
      '入乡随俗 rù xiāng suí sú · 班门弄斧 bān mén nòng fǔ · 千里之行 qiān lǐ zhī xíng',
      'From Thematic Unit 5. The rhythm itself is part of what makes a chengyu sound natural to a native ear.',
      [
        { target: '入乡随俗 rù xiāng suí sú', note: '"when in Rome" — do as the locals do; even four-beat pace' },
        { target: '班门弄斧 bān mén nòng fǔ', note: 'show off in front of the expert; final 斧 (fǔ) stays sharp' },
        { target: '千里之行 qiān lǐ zhī xíng', note: 'a thousand-mile journey [begins with one step]; opener of the most famous Lao-tzu proverb' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I (Safety + Medical + Rules)
    // ────────────────────────────────────────────────────────────────────
    createContentItem('报案 (U7)', 'bào\'àn', 'To file an incident report at a 派出所 (local police box). The standard verb for officially registering a theft, an assault, or any non-emergency crime — pairs with stolen-item nouns and with the 是…的 structure when the officer asks WHEN it happened.', 'word', '我想报案，我的手机被偷了。', 'Opening line at the police-box counter from Unit 7; pairs with 被 passive.', null, [ACT.vocabularyOne]),
    createContentItem('救护车 (U7)', 'jiùhùchē', 'Ambulance. Dial 120 to summon one. The compound literally means "rescue-care-car"; written and spoken identically. Pairs with 叫 (jiào, "call/summon") in spoken Mandarin — 叫救护车 ("call an ambulance").', 'word', '快叫救护车，他受伤了！', 'Urgent command pattern from Unit 7; pairs with 受伤 (shòushāng, "injured").', null, [ACT.vocabularyOne]),
    createContentItem('受伤 (U7)', 'shòushāng', 'To be injured / get hurt. The standard verb for any physical injury from a fall, a fight, or a traffic incident. Pairs naturally with 被 in passive constructions and with 严重 (yánzhòng, "serious") to grade severity.', 'word', '她在车祸里受伤了，伤得很严重。', 'Incident report verb; 伤得很严重 uses the 得 resultative complement.', null, [ACT.vocabularyOne]),
    createContentItem('挂号 (U8)', 'guàhào', 'To register at a hospital outpatient counter and receive a queue number. The first step of any Chinese hospital visit — without 挂号 you cannot see a doctor. The system is now usually app-based but the term is still ubiquitous.', 'word', '请先去挂号，然后等叫号。', 'Standard front-desk instruction from Unit 8; pairs with 等 (wait) and 叫号 (call number).', null, [ACT.vocabularyOne]),
    createContentItem('发烧 (U8)', 'fāshāo', 'To have a fever. Common verb form; pairs with 度 (dù, degree) to specify temperature — 烧到三十九度 ("burning up to 39 degrees"). Note Mandarin uses Celsius; a 38° fever is moderate, 39° is concerning.', 'word', '我从昨天晚上开始发烧，烧到三十八度五。', 'Symptom report from Unit 8; the .5 in Celsius is read as 三十八度五 ("38-degrees-5").', null, [ACT.vocabularyOne]),
    createContentItem('医保 (U8)', 'yībǎo', 'Medical insurance. Short for 医疗保险 (yīliáo bǎoxiǎn). At the payment counter you are asked 你有医保吗? — if you do, you swipe the 医保卡; if not, you pay 自费 (zìfèi, "out of pocket"). Foreign students at 清华大学 often have a school-provided 医保.', 'word', '挂号费用医保可以报销吗?', 'Payment-window question from Unit 8; pairs with 报销 (bàoxiāo, "reimburse").', null, [ACT.vocabularyOne]),
    createContentItem('规定 (U10)', 'guīdìng', 'Rule / regulation in the formal-policy register. Used for posted signs, workplace handbooks, and university policies — stronger than 规矩 (guījǔ, "everyday rules / customs"). The verb form means "to stipulate / lay down".', 'word', '宿舍规定晚上十一点以后不能回来。', 'Formal posted-rule register from Unit 10; pairs with the 不能 modal for prohibition.', null, [ACT.vocabularyOne]),
    createContentItem('罚款 (U10)', 'fákuǎn', 'Fine / monetary penalty. The standard consequence-word in posted rules — appears with both 必须 ("must … or face a 罚款") and 违规 ("violation triggers a 罚款"). Can be used as a verb or noun without form change.', 'word', '违反规定要罚款两百块。', 'Consequence register from Unit 10; the amount is specified after the verb.', null, [ACT.vocabularyOne]),
    createContentItem('禁止 (U10)', 'jìnzhǐ', 'Strictly forbidden / prohibited. The strongest negative on the obligation scale; reserved for posted signs (禁止吸烟, 禁止拍照, 禁止入内) and official notices. In speech, 不能 (bùnéng) covers most prohibitions; 禁止 is for signs and announcements.', 'word', '医院里禁止吸烟，违者罚款。', 'Posted-sign register from Unit 10; combines two units (hospital + rules).', null, [ACT.vocabularyOne]),
    createContentItem('小心 (U7)', 'xiǎoxīn', 'Be careful! / watch out! An urgent two-character command in the lighter end of the warning register. Sharper than 注意 (zhùyì, "pay attention"), gentler than 危险 (wēixiǎn, "dangerous"). Common before stairs, slippery floors, low ceilings, and traffic.', 'word', '小心地滑！(careful, slippery floor) · 过马路小心！(careful crossing the road)', 'Warning command from Unit 7; the 地滑 / 马路 etc. follow as a noun phrase.', null, [ACT.vocabularyOne]),
    createContentItem('过敏 (U8)', 'guòmǐn', 'To be allergic to / have an allergy. Critical clinic vocabulary — your doctor will ask 你对什么过敏吗? before prescribing antibiotics. Pairs with 对 (duì, "to") to mark the allergen.', 'word', '我对青霉素过敏，请不要开。', 'Medical-history sentence from Unit 8; 青霉素 (qīngméisù) = penicillin.', null, [ACT.vocabularyOne]),
    createContentItem('安全 vs 危险 (U7)', 'ānquán vs wēixiǎn', 'The safety-versus-danger axis. 安全 (ānquán) = safe; 危险 (wēixiǎn) = dangerous. Both work as adjectives ("the area is safe / dangerous") and as nouns ("safety / danger"). Common in posted warnings and in incident-prevention talk.', 'word', '这条路晚上不安全，很危险。', 'Both terms in one breath; standard safety-advice frame from Unit 7.', null, [ACT.vocabularyOne]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II (Housing + Jobs + Performances)
    // ────────────────────────────────────────────────────────────────────
    createContentItem('押金 (U12)', 'yājīn', 'Security deposit on a Beijing apartment lease. Typically one to three months\' rent, refundable on move-out if the apartment is undamaged. The full lease conversation centers on 押金 + 一个月房租 (first month\'s rent) + 中介费 (broker fee).', 'word', '押金一般是两个月的房租。', 'Lease conversation from Unit 12; 房租 (fángzū) = monthly rent.', null, [ACT.vocabularyTwo]),
    createContentItem('房东 (U12)', 'fángdōng', 'Landlord. The owner of the apartment, who signs the lease with you. In Beijing, you often communicate with the 房东 only through the 中介 until move-in day; problems with the apartment go through the 中介 first.', 'word', '房东人很好，但是我们通过中介签合同。', 'Standard lease description from Unit 12; 通过 = "through".', null, [ACT.vocabularyTwo]),
    createContentItem('中介 (U12)', 'zhōngjiè', 'Real-estate broker / agent. The middleman who shows you apartments, negotiates with the 房东, and takes one month\'s rent as 中介费 (commission) on signing. Reputation varies wildly; check reviews before signing.', 'word', '这家中介口碑很好，我朋友推荐的。', 'Broker selection conversation from Unit 12; 口碑 (kǒubēi) = reputation.', null, [ACT.vocabularyTwo]),
    createContentItem('合同 (U12)', 'hétong', 'Contract / lease. Read it carefully before signing — important clauses cover 押金 refund conditions, 水电费 responsibility, and 违约 (wéiyuē, "breach") penalties. A standard Beijing lease runs one to two pages.', 'word', '合同签一年，押金最后退还。', 'Lease-signing day vocabulary from Unit 12; 退还 (tuìhuán) = refund.', null, [ACT.vocabularyTwo]),
    createContentItem('简历 (U11)', 'jiǎnlì', 'Résumé / CV. The standard Chinese tech-industry résumé is one page in PDF; longer in academia. Sent through 招聘 (recruiting) platforms like 51Job, 智联招聘, BOSS直聘 — and increasingly through WeChat referrals from contacts.', 'word', '请把你的简历发到我邮箱。', 'Job-search ask from Unit 11; 邮箱 (yóuxiāng) = email inbox.', null, [ACT.vocabularyTwo]),
    createContentItem('面试 (U11)', 'miànshì', 'Job interview. Often multi-round in Chinese tech companies: 一面 (first round, screening), 二面 (technical), 三面 (manager / HR final). Common closing question: 你还有什么要问的吗? ("Do you have any other questions?") — always have one ready.', 'word', '下周二我有第二轮面试。', 'Interview-scheduling phrase from Unit 11; 第二轮 = "second round".', null, [ACT.vocabularyTwo]),
    createContentItem('薪资 (U11)', 'xīnzī', 'Salary, slightly formal. Less casual than 工资 (gōngzī, "wages"), more compact than 薪酬 (xīnchóu, "compensation package"). Standard term in formal recruiting documents and offer letters. The number is usually given as 月薪 (monthly salary) in 千 (thousand RMB).', 'word', '这个职位的薪资是月薪一万五。', 'Offer conversation from Unit 11; 一万五 = 15,000 RMB / month.', null, [ACT.vocabularyTwo]),
    createContentItem('入职 (U11)', 'rùzhí', 'Onboard / start a new job. Marks the official first day of employment; pairs with a 入职手续 (onboarding paperwork) checklist that includes 体检 (medical check), 签合同 (sign contract), and 培训 (training). The opposite is 离职 (lízhí, "leave the job").', 'word', '我下个月一号入职。', 'New-hire start-date sentence from Unit 11; 一号 = "the 1st".', null, [ACT.vocabularyTwo]),
    createContentItem('京剧 (Thematic U6)', 'Jīngjù', 'Peking opera. The most internationally recognized Chinese performance art, characterized by stylized 脸谱 (liǎnpǔ, painted facial masks), high-pitched singing, and elaborate sleeve work. A 京剧 evening at 长安大戏院 is a classic Beijing cultural date.', 'word', '京剧的脸谱颜色都有特别的意思。', 'Culture description from Thematic Unit 6; 脸谱 (liǎnpǔ) = painted masks.', null, [ACT.vocabularyTwo]),
    createContentItem('春晚 (Thematic U6)', 'Chūnwǎn', 'Spring Festival Gala. Short for 春节联欢晚会 (Chūnjié Liánhuān Wǎnhuì), the CCTV broadcast on 除夕 (Chinese New Year\'s Eve) — the most-watched TV program in the world by viewership. Critiquing this year\'s 春晚 is a national pastime on 大年初一 (New Year\'s Day).', 'word', '今年的春晚你看了吗？', 'Day-after-New-Year conversation opener from Thematic Unit 6.', null, [ACT.vocabularyTwo]),
    createContentItem('庙会 (Thematic U6)', 'miàohuì', 'Temple fair. Traditional Lunar New Year fairs held at Beijing temples (地坛 Ditan, 龙潭湖 Longtanhu) featuring 小吃 (street food), 表演 (performances), and 民俗 (folk traditions). A daytime cultural outing equivalent to a Western Christmas market.', 'word', '春节我们去地坛庙会，看表演吃小吃。', 'Festival outing description from Thematic Unit 6; 地坛 = Temple of Earth.', null, [ACT.vocabularyTwo]),
    createContentItem('演员 (Thematic U6)', 'yǎnyuán', 'Performer / actor. Covers stage, screen, and traditional opera. The compound is 演 (perform) + 员 (member of a profession) — the same -员 suffix as 服务员 (waiter) or 售货员 (shop clerk). Pair with 角色 (juésè, "role") to talk about parts played.', 'word', '这个演员演了三十年京剧，是国家一级演员。', 'Career description from Thematic Unit 6; 国家一级演员 = "state first-class performer" (a formal honor).', null, [ACT.vocabularyTwo]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar I: Obligation/Permission Scale
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '应该 / 必须 / 可以 / 不能 — 义务和许可阶梯',
      'yīnggāi / bìxū / kěyǐ / bùnéng — yìwù hé xǔkě jiētī',
      'The four modals that grade an action from optional to forbidden. 可以 (kěyǐ) grants permission; 应该 (yīnggāi) recommends; 必须 (bìxū) requires; 不能 (bùnéng) forbids. The same factual content (smoking, late return, sick leave) shifts register entirely as you swap modals.',
      'sentence',
      '可以请假 (may take leave) → 应该请假 (should take leave) → 必须请假 (must take leave) → 不能请假 (cannot take leave)',
      'From Units 7 and 10 — the backbone of every rule, every doctor\'s recommendation, every workplace policy.',
      [
        { target: '可以 kěyǐ', note: 'permission granted; the everyday yes on a posted-sign or counter conversation' },
        { target: '应该 yīnggāi', note: 'soft obligation; "ought to" — a recommendation from a doctor, friend, or advisor' },
        { target: '必须 bìxū', note: 'hard obligation; non-negotiable; violation triggers a 罚款 or 警告' },
        { target: '不能 bùnéng', note: 'spoken prohibition; the everyday no — softer than 禁止 (posted sign)' },
      ],
      [ACT.grammarObligation],
    ),
    createContentItem(
      '同一规则，四种语气',
      'tóngyī guīzé, sì zhǒng yǔqì',
      'Take ONE rule — wearing a mask in a Beijing hospital — and grade it four times. The factual content stays identical; the listener\'s sense of how strict the rule is shifts entirely. Test of mastery: can you tell which modal a posted sign would use vs which a doctor would use in a casual recommendation?',
      'sentence',
      '医院里可以戴口罩。(may) · 医院里应该戴口罩。(should) · 医院里必须戴口罩。(must) · 医院里不能不戴口罩。(double negative for emphasis: cannot NOT wear)',
      'A drill from Unit 10; same content, four registers, all useful.',
      [
        { target: '可以 (permitted)', note: 'used at counters, gates, and ticket windows to grant a specific allowance' },
        { target: '应该 (recommended)', note: 'used by doctors, advisors, friends; not enforced but expected' },
        { target: '必须 (required)', note: 'used in posted rules, workplace handbooks, contracts; enforced by penalty' },
        { target: '不能 (forbidden, spoken)', note: 'used at counters and gates to deny; 不许 / 禁止 are stronger written forms' },
      ],
      [ACT.grammarObligation],
    ),
    createContentItem(
      '负向阶梯',
      'fùxiàng jiētī',
      'The negative scale, from advice to absolute prohibition. 不应该 (shouldn\'t) → 不能 (can\'t) → 不许 (forbidden) → 禁止 (strictly prohibited). Each step up changes who enforces the rule: friend / clerk / boss / posted sign with legal force.',
      'sentence',
      '不应该抽烟 (shouldn\'t smoke — friend\'s advice) → 不能抽烟 (can\'t smoke — clerk at the gate) → 不许抽烟 (forbidden — boss / sign) → 禁止吸烟 (strictly prohibited — legal posted sign)',
      'From Unit 10. Pick the right rung based on who is doing the enforcing and how harsh the consequence is.',
      [
        { target: '不应该 bù yīnggāi', note: 'soft "shouldn\'t"; used by doctors, friends, advisors' },
        { target: '不能 bùnéng', note: 'everyday spoken "can\'t"; the most common prohibition in conversation' },
        { target: '不许 bùxǔ', note: 'firmer prohibition; used by managers, parents, posted dorm rules' },
        { target: '禁止 jìnzhǐ', note: 'strict legal prohibition; used in posted signs with explicit penalty' },
      ],
      [ACT.grammarObligation],
    ),
    createContentItem(
      '跨单元应用',
      'kuà dānyuán yìngyòng',
      'Apply the four modals across the second half of Level 2. Each adult unit has rules at different strength levels; getting the modal right is half of sounding native in formal Mandarin.',
      'sentence',
      'Safety (U7): 受伤了应该叫救护车 · Medical (U8): 必须先挂号才能看病 · Rules (U10): 宿舍十一点以后不能回 · Job (U11): 入职必须体检 · Housing (U12): 退房应该提前一个月通知 · Festival (U6): 庙会里可以吃小吃但不能乱扔垃圾',
      'One sentence per unit; the modal varies to fit the actual strictness of the rule.',
      [
        { target: 'U7 应该', note: 'recommendation: SHOULD call ambulance when injured — listener\'s choice' },
        { target: 'U8 必须 + 才', note: 'requirement: MUST register before seeing doctor — hard procedural gate' },
        { target: 'U10 不能', note: 'spoken prohibition: dorm curfew — enforced by management' },
        { target: 'U11 必须', note: 'requirement: onboarding medical exam — contractual condition' },
        { target: 'U12 应该', note: 'recommendation: move-out notice timing — courtesy, not contractually required everywhere' },
        { target: 'U6 可以 / 不能', note: 'paired permission and prohibition: can eat, cannot litter — typical festival sign register' },
      ],
      [ACT.grammarObligation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar II: 是…的 Emphatic Past
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '是…的 — 强调过去事件的细节',
      'shì… de — qiángdiào guòqù shìjiàn de xìjié',
      'The 是…的 structure focuses on the WHEN / WHERE / HOW / WHO of a past event whose occurrence is already established between speakers. The fact "X happened" is shared common ground; the question is which detail. Form: SUBJECT + 是 + [time / place / manner phrase] + V + (object) + 的.',
      'sentence',
      '我是昨天晚上来的。([the fact is] I came last night — focus on WHEN, not on the fact of arriving.)',
      'From Units 7 and 11 — the two places where follow-up questions about a past event are most common (police asking when a theft happened; interviewer asking when you graduated).',
      [
        { target: 'SUBJECT + 是 + [focus phrase] + V + 的', note: 'fixed slot order; 是 before the focus, 的 after the verb' },
        { target: 'focus on WHEN', note: '我是昨天来的 ("I came YESTERDAY")' },
        { target: 'focus on WHERE', note: '我是在派出所报的案 ("I filed the report AT THE POLICE BOX")' },
        { target: 'focus on HOW', note: '我是坐地铁来的 ("I came BY SUBWAY")' },
        { target: 'focus on WHO', note: '是我朋友告诉我的 ("MY FRIEND told me")' },
      ],
      [ACT.grammarShiDe],
    ),
    createContentItem(
      '是…的 vs 了',
      'shì… de vs le',
      'Critical contrast. 是…的 clarifies ONE specific slot (when / where / how / who) of an event the listener already knows happened. 了 simply marks completion ("it happened, fact").',
      'sentence',
      'PLAIN COMPLETION: 我昨天来了。(I came yesterday.) — neutral statement of fact.\nFOCUSED 是…的: 我是昨天来的。([as for the question of WHEN] I came yesterday.) — clarifies one slot.',
      'Often mis-translated by learners as "I came yesterday" in both cases. The 是…的 form is what answers a follow-up question; 了 is what reports an event for the first time.',
      [
        { target: '了 (le) — completion marker', note: 'marks an event\'s occurrence; neutral; opens new information for the listener' },
        { target: '是…的 — focus on one slot', note: 'assumes the event is already known; clarifies one detail; answers a wh-question' },
        { target: 'usage cue', note: 'if the listener already knows the event happened, use 是…的 to focus the detail; if reporting the event for the first time, use 了' },
      ],
      [ACT.grammarShiDe],
    ),
    createContentItem(
      '派出所对话 — U7 应用',
      'pàichūsuǒ duìhuà — U7 yìngyòng',
      'At the 派出所 (local police box), the officer already knows your phone was stolen (you just said so). His follow-up questions ask WHEN, WHERE, HOW — exactly the slots the 是…的 structure exists to focus.',
      'sentence',
      '警察: 是什么时候丢的? — 你: 是昨天晚上八点丢的。\n警察: 是在哪儿丢的? — 你: 是在清华南门附近丢的。\n警察: 是怎么丢的? — 你: 我也不知道，应该是在地铁上被偷的。',
      'Three-turn standard exchange from Unit 7; each turn uses 是…的 to focus a different slot.',
      [
        { target: '是什么时候 + V + 的?', note: 'WHEN-focus question; standard police follow-up' },
        { target: '是在哪儿 + V + 的?', note: 'WHERE-focus question; pairs with location nouns' },
        { target: '是怎么 + V + 的?', note: 'HOW-focus question; the answer often contains 被 passive for thefts' },
      ],
      [ACT.grammarShiDe],
    ),
    createContentItem(
      '面试对话 — U11 应用',
      'miànshì duìhuà — U11 yìngyòng',
      'In a job interview, the interviewer already knows from your résumé that you graduated, worked at company X, and have certain skills. Follow-up questions focus on WHEN you graduated, WHERE you worked, HOW you learned each skill.',
      'sentence',
      '面试官: 你是什么时候毕业的? — 你: 我是2025年六月毕业的。\n面试官: 你是在哪儿实习的? — 你: 我是在北京字节跳动实习的。\n面试官: 你的英语是怎么学的? — 你: 我是在美国交换一年学的。',
      'Three follow-up patterns from Unit 11; same structure as the 派出所 dialogue, different context.',
      [
        { target: '是什么时候毕业的?', note: 'graduation date — almost guaranteed first follow-up' },
        { target: '是在哪儿实习的?', note: 'internship location — pairs with company names' },
        { target: '是怎么 + V + 的?', note: 'method / how-learned — often answered with 通过 (through) or 在…(at)' },
      ],
      [ACT.grammarShiDe],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar III: Layered Descriptions
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '不仅…而且… (written escalation, U8)',
      'bùjǐn… érqiě… (written escalation, U8)',
      'Formal-written escalator: the second clause carries MORE weight than the first. Common in 简历 (résumés), 招聘 (recruiting copy), and persuasive arguments. Apply when you want the listener to feel that the second feature is the stronger sell.',
      'sentence',
      '这家医院不仅设备好，而且医生都很有经验。(This hospital not only has good equipment, but also has experienced doctors.)',
      'From Unit 8. The second clause is what you really want to highlight; the first sets up the upgrade.',
      [
        { target: '不仅 A，而且 B', note: 'B is stronger / more important than A; written / persuasive register' },
        { target: 'use in résumés', note: '不仅会编程，而且有三年管理经验 — programming is baseline, management is the key sell' },
        { target: 'use in product descriptions', note: '不仅便宜，而且质量好 — cheap is the hook, quality is the closer' },
      ],
      [ACT.grammarLayered],
    ),
    createContentItem(
      '既…又… (literary compatibility, U4)',
      'jì… yòu… (literary compatibility, U4)',
      'Slightly literary "BOTH X AND Y" — for two compatible qualities of the same subject. Common when describing a person\'s character (intelligent AND hardworking) or a culturally valued combination (modest AND capable). Often paired with positive evaluation.',
      'sentence',
      '她既聪明又勤奋，是一个很优秀的学生。(She is both intelligent and hardworking — an excellent student.)',
      'From Thematic Unit 4 (men/women, character traits). Slightly more formal than 又…又…, less formal than 不仅…而且….',
      [
        { target: '既 A 又 B', note: 'two compatible qualities of the SAME subject; literary / character-description register' },
        { target: 'usage tone', note: 'almost always positive — a flattering frame for someone\'s character or capabilities' },
        { target: 'contrast with 不仅…而且…', note: '既…又… lists two qualities as equally important; 不仅…而且… escalates from minor to major' },
      ],
      [ACT.grammarLayered],
    ),
    createContentItem(
      '又…又… (spoken everyday, U6)',
      'yòu… yòu… (spoken everyday, U6)',
      'The everyday spoken "BOTH X AND Y" — neutral register, fits casual descriptions of food, weather, weekend plans, performances. Less elevated than 既…又…; you would not use 又…又… in a résumé.',
      'sentence',
      '昨天的庙会又热闹又有意思！(Yesterday\'s temple fair was both lively AND interesting!)',
      'From Thematic Unit 6. The natural spoken description after a fun outing.',
      [
        { target: '又 A 又 B', note: 'two qualities of the same subject; casual spoken register' },
        { target: 'use after experiences', note: '这部京剧又好看又感人 — both watchable and moving (after watching opera)' },
        { target: 'use for food', note: '这家小吃又便宜又好吃 — both cheap and delicious' },
      ],
      [ACT.grammarLayered],
    ),
    createContentItem(
      '三种语气对比',
      'sān zhǒng yǔqì duìbǐ',
      'Take ONE subject (a Beijing apartment) and describe it at three registers. The factual content stays identical; the register tells the listener whether you are writing a 中介 listing, recommending to a friend, or chatting after dinner.',
      'sentence',
      'WRITTEN (listing): 这套公寓不仅离地铁近，而且有家具。(Not only close to subway, also furnished — listing copy.)\nLITERARY (recommend): 这套公寓既方便又舒适。(Both convenient and comfortable — friend recommendation.)\nSPOKEN (chat): 这套公寓又便宜又干净！(So cheap AND clean! — casual chat.)',
      'Pick the register before the words. Mixing registers in one paragraph reads as a translated-Chinese textbook.',
      [
        { target: '不仅…而且… (formal written)', note: 'used in 简历 / 中介 listings / persuasive copy; second clause is the bigger sell' },
        { target: '既…又… (literary)', note: 'used for character / sophisticated descriptions; usually positive' },
        { target: '又…又… (spoken everyday)', note: 'used in casual chat about food / weather / events; neutral' },
      ],
      [ACT.grammarLayered],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '一周日记 — A week-in-Beijing paragraph',
      'yī zhōu rìjì — A week-in-Beijing paragraph',
      'Read this short multi-topic paragraph that a Tsinghua exchange student wrote in a WeChat update to friends back home. It moves through safety, medical, rules, housing, and festival topics in one continuous text — the kind of integrated paragraph this review exists to make natural.',
      'sentence',
      '这个星期真是太难熬了。星期一晚上，我的手机在清华南门附近被偷了，我是第二天上午去派出所报的案。星期三我发烧，烧到三十八度五，去校医院挂号，医生说我应该多休息，不能太累。宿舍这周又出了新规定：晚上十一点以后不能回宿舍，违反规定要罚款两百块。本来我还想搬出去住，约了中介看房，但是押金太贵，合同还要签一年。星期五我有一个面试，面试官问我是什么时候毕业的，我都没回答好。还好周末跟朋友去了地坛庙会，演员表演的京剧又好看又热闹，心情才好一点。正所谓"入乡随俗"，在北京生活就是要慢慢适应。',
      'Translation: "This week was really tough. Monday night, my phone got stolen near Tsinghua\'s south gate — I went to the police box to file the report the next morning. Wednesday I had a fever, 38.5 degrees, registered at the school clinic, the doctor said I should rest more and not push myself. The dorm posted a new rule this week: cannot return after 11 PM; violation triggers a 200-yuan fine. I considered moving out and met with a broker to view apartments, but the deposit is too expensive and the lease has to be a full year. Friday I had an interview; the interviewer asked when I graduated and I didn\'t answer well. Luckily I went to the Ditan Temple Fair with friends on the weekend — the Peking opera performance was both fun and lively, my mood finally lifted. As the saying goes, when in Rome — life in Beijing is about adapting slowly."',
      [
        { target: '被偷了 (U7)', note: '被 passive marker — phone got stolen; pairs with 是…的 next' },
        { target: '是…去派出所报的案 (U7 + grammar)', note: '是…的 focus on WHEN: "the next morning" is the focused slot' },
        { target: '应该多休息 / 不能太累 (U8 + U10)', note: 'doctor recommendation + soft prohibition; modal scale in action' },
        { target: '违反规定要罚款 (U10)', note: 'rule-and-consequence pairing; standard posted-sign register' },
        { target: '押金太贵 / 合同要签一年 (U12)', note: 'housing vocabulary in actual conversation context' },
        { target: '面试官问我是什么时候毕业的 (U11 + grammar)', note: '是…的 question form embedded in a job-interview narration' },
        { target: '又好看又热闹 (Thematic U6 + grammar)', note: '又…又… spoken-register layered description after a festival' },
        { target: '正所谓"入乡随俗" (Thematic U5)', note: 'chengyu drop with the connector 正所谓 — one chengyu per paragraph, earned by the surrounding sentences' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '理解问题',
      'lǐjiě wèntí',
      'Four comprehension questions to test that you can extract the unit-by-unit detail from the integrated paragraph. Answer each in a short sentence using the relevant grammar from this review.',
      'sentence',
      'Q1: 他是什么时候去派出所的? — A: 他是星期二上午去的。\nQ2: 医生让他做什么? — A: 医生说他应该多休息，不能太累。\nQ3: 他为什么没搬出去住? — A: 因为押金太贵，合同还要签一年。\nQ4: 周末他做了什么让心情好一点? — A: 他去地坛庙会看京剧，又好看又热闹。',
      'Each answer uses one grammar pattern from this review (是…的, 应该/不能, 因为, 又…又…).',
      null,
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Listening
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '清华大学校园对话',
      'Qīnghuá Dàxué xiàoyuán duìhuà',
      'A natural multi-context dialogue between two exchange students at 清华大学. One is venting about the same hard week as the reading paragraph; the other is consoling, advising, and ultimately inviting to a festival. Tracks register shifts from formal-complaint to casual-comfort.',
      'conversation',
      'A: 这周真的太累了。手机被偷了，又生病发烧，宿舍还出了新规定。\nB: 你的手机是在哪儿丢的?\nA: 是在南门地铁站附近丢的，应该是被人趁我没注意偷走的。\nB: 你报案了吗?\nA: 报了，警察问了我半天，是什么时候、是怎么丢的都问了。\nB: 那现在怎么办?\nA: 我打算再买一个。还有，我面试也没准备好，简历不仅写得不够好，而且我对那家公司也不太了解。\nB: 不用太担心，失败是成功之母嘛。周末跟我去地坛庙会吧，那儿又有京剧又有小吃，肯定能让你心情好一点。\nA: 好啊！正所谓入乡随俗，来北京当然要去庙会看看。',
      'Eight turns of fluent multi-topic exchange; the conversation tutor can play either role and re-perform with your own week swapped in.',
      [
        { target: '被偷了 (U7)', note: 'passive for theft; classic incident-narration opening' },
        { target: '是在哪儿丢的? / 是什么时候 / 是怎么 (grammar II)', note: 'three slot-focus questions in a row — typical 派出所 follow-up sequence' },
        { target: '不仅…而且… (grammar III, written register)', note: 'used by A in self-criticism — résumé and company-knowledge both inadequate' },
        { target: '失败是成功之母 (Thematic U5)', note: 'classic proverb in consolation context; one of the safest beginner-friendly proverbs' },
        { target: '又…又… (grammar III, spoken register)', note: 'used by B to describe the festival — natural casual register' },
        { target: '正所谓"入乡随俗" (Thematic U5)', note: 'A drops one chengyu to close the dialogue gracefully; 正所谓 is the standard chengyu-introducer' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      '功能识别',
      'gōngnéng shíbié',
      'After listening, identify the FUNCTION of each turn. A native-feeling conversation flows through complaint → focused question → response → consolation → invitation — and each turn pulls from a different source unit.',
      'sentence',
      'A1 vent (U7+U8+U10) → B2 focus-question (是…的) → A3 detailed answer (被 passive + 是…的) → B4 next-step question → A5 plan + self-criticism (不仅…而且…) → B6 consolation (proverb + invitation) → A7 acceptance (chengyu close)',
      'The function map is the test — if you can name each turn\'s function in Mandarin, you have integrated the second half of Level 2.',
      null,
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '写作模板',
      'xiězuò múbǎn',
      'A reusable template for the "hard week in Beijing" reflection paragraph. Fill in the bracketed slots with your own experiences — the structure carries the narrative thread across at least four adult units plus one chengyu.',
      'sentence',
      '这周真的太[形容词]了。[安全事件 U7]，我[应该/必须 modal][动作]。后来[医院事件 U8]，医生说我[modal][动作]。[宿舍/规则事件 U10]，规定[必须/不能][动作]。我[面试/工作事件 U11]，面试官问我[是…的 question]。还有[房子事件 U12]，[押金/合同 detail]。还好周末[庙会/演出事件 U6]，[又…又…/既…又… description]。正所谓"[chengyu]"，在北京生活就是这样。',
      'Eight sentences covering all six adult units plus a chengyu close — the model integrated paragraph.',
      [
        { target: '[安全事件 U7]', note: 'a U7-style incident: stolen item, accident, injury' },
        { target: '[医院事件 U8]', note: 'a U8-style clinic visit: fever, cough, allergy, prescription' },
        { target: '[规则事件 U10]', note: 'a U10-style rule encounter: curfew, smoking ban, dress code' },
        { target: '[工作事件 U11]', note: 'a U11-style job event: interview, application, offer' },
        { target: '[房子事件 U12]', note: 'a U12-style housing event: viewing, signing, moving' },
        { target: '[festival/show U6]', note: 'a U6-style cultural outing: 庙会, 京剧, 春晚, 演唱会' },
        { target: '[chengyu]', note: 'one chengyu from Thematic U5; "入乡随俗", "千里之行始于足下", "失败是成功之母" are safe choices' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '写作练习',
      'xiězuò liànxí',
      'Write your own 6-8 sentence reflection on a real or imagined hard week in Beijing. Use 应该 or 必须 at least once, 是…的 at least once, one of the three layered patterns (不仅…而且… / 既…又… / 又…又…) at least once, and ONE chengyu from Thematic Unit 5. No more than one chengyu — over-deployment was the trap flagged in Unit 5.',
      'sentence',
      '示例: 这周我真的累坏了。星期一我在公交车上钱包被偷了，我是去附近的派出所报的案。星期三去校医院看病，医生说我必须多休息。最难的是星期五的面试，面试官的问题不仅多，而且都很难。周末跟朋友去看了一场京剧，演员又年轻又有才华，心情好多了。正所谓"失败是成功之母"，我会继续努力。',
      'A model student response using one item from each of U7, U8, U11, Thematic U6, plus one chengyu — clean and earned.',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Mixed Drills (Chengyu / Proverbs)
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '入乡随俗 — for new arrivals',
      'rù xiāng suí sú — for new arrivals',
      'Drop this chengyu (Thematic U5) into the new-rules contexts of the adult units. Works perfectly for: a new exchange student adjusting to dorm rules (U10), a new hire learning office customs (U11), a new tenant adjusting to apartment management rules (U12). Pairs with 慢慢 (slowly) and 适应 (adapt).',
      'sentence',
      '到了新公司，正所谓"入乡随俗"，应该先了解公司的规矩。(At a new company — as the saying goes, "when in Rome" — you should first learn the company\'s rules.)',
      'One chengyu, one supporting sentence; the surrounding sentence MUST give the chengyu work to do.',
      [
        { target: '入乡随俗 rù xiāng suí sú', note: 'literally "enter the village, follow the customs"; figurative "when in Rome do as the Romans"' },
        { target: 'connector: 正所谓 zhèng suǒwèi', note: 'standard chengyu-introducer; signals "as the saying goes…" before quoting' },
        { target: 'pair with', note: '慢慢适应 (slowly adapt), 先了解 (first understand), 不能太着急 (cannot rush)' },
      ],
      [ACT.drillsChengyu],
    ),
    createContentItem(
      '千里之行始于足下 — for new starts',
      'qiān lǐ zhī xíng shǐ yú zú xià — for new starts',
      'A proverb (Thematic U5) — full sentence rather than four characters. Drop it into job-interview (U11), apartment-search (U12), or fitness/study contexts where you are at the start of a long journey. The English equivalent is "a journey of a thousand miles begins with a single step".',
      'sentence',
      '面试的时候老板说："千里之行始于足下，先做好今天的事。"(In the interview the boss said: "A journey of a thousand miles begins with one step — first do today\'s work well.")',
      'Proverbs are spoken as complete sentences, often inside quotation marks; chengyu are dropped IN to a sentence as a unit.',
      [
        { target: '千里之行始于足下', note: 'origin: 老子《道德经》; figurative "long journeys start with small steps"' },
        { target: 'usage register', note: 'motivational; advice from elder to younger; opening speeches at school or work' },
        { target: 'pair with', note: '坚持 (persist), 慢慢来 (slowly), 一步一步 (step by step)' },
      ],
      [ACT.drillsChengyu],
    ),
    createContentItem(
      '失败是成功之母 — for setbacks',
      'shībài shì chénggōng zhī mǔ — for setbacks',
      'A proverb (Thematic U5) used to console after a setback — "failure is the mother of success". Universal application: a failed exam (U10 schoolwork), a rejected lease application (U12), a botched interview (U11), a missed flight. Pairs with 别难过 (don\'t be sad) and 下次会更好 (next time will be better).',
      'sentence',
      '别太难过，失败是成功之母嘛，下次面试肯定能成功。(Don\'t be too sad — failure is the mother of success — you\'ll definitely succeed at the next interview.)',
      'The 嘛 (ma, soft particle) softens the proverb so it sounds like consolation rather than lecture.',
      [
        { target: '失败是成功之母', note: 'figurative "failure is the mother of success"; near-universal consolation proverb' },
        { target: 'softening particle 嘛', note: 'adds a casual / reassuring tone; common when the speaker is consoling rather than instructing' },
        { target: 'pair with', note: '别难过 (don\'t be sad), 下次会更好 (next time better), 继续努力 (keep trying)' },
      ],
      [ACT.drillsChengyu],
    ),
    createContentItem(
      '过度使用警告',
      'guòdù shǐyòng jǐnggào',
      'The over-deployment trap (flagged in Thematic Unit 5). A paragraph with three or four chengyu reads as a translated dictionary, not as a person speaking Mandarin. One chengyu per paragraph is cultured; two is borderline; three is awkward. Less is more.',
      'sentence',
      'BAD (over-deployed): 千里之行始于足下，正所谓入乡随俗，失败是成功之母，所以我们应该一鼓作气！(Reads like a textbook of proverbs.)\nGOOD (one chengyu, earned): 这周很累，但正所谓"千里之行始于足下"，我会继续努力。(Reads like a person.)',
      'When in doubt, cut chengyu. The surrounding sentences are doing the real work.',
      [
        { target: 'BAD pattern', note: 'three or more chengyu in a paragraph; learner-textbook stiffness' },
        { target: 'GOOD pattern', note: 'one chengyu earned by the surrounding sentence; native-feeling cultured register' },
        { target: 'rule of thumb', note: 'if removing the chengyu changes nothing meaningful, you didn\'t need it' },
      ],
      [ACT.drillsChengyu],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '任务: 在北京的难熬一周',
      'rènwù: zài Běijīng de nán\'áo yī zhōu',
      'Roleplay this narration with the conversation tutor playing a friend from back home who has just sent a WeChat asking "how is your week going?" You answer in one continuous Mandarin paragraph that hits at least four of the six adult units (Safety / Medical / Rules / Job / Housing / Weekend) plus one chengyu from Thematic Unit 5. Aim for a 10-turn back-and-forth where the friend asks follow-up questions and you answer with 是…的, 应该 / 必须 / 不能, and one of 不仅…而且… / 既…又… / 又…又….',
      'conversation',
      '朋友: 最近怎么样? 你的WeChat朋友圈都没怎么更新。\n你: [叹气] 这周真的太累了。[U7 incident with 被 passive]\n朋友: 啊? 那你报案了吗? 是什么时候发生的?\n你: [是…的 answer + 应该/必须 modal]\n朋友: 那你身体怎么样?\n你: [U8 clinic visit + doctor advice with 应该/不能]\n朋友: 宿舍最近怎么样?\n你: [U10 new rule + consequence with 必须/不能/罚款]\n朋友: 工作方面呢? 你之前不是说有面试吗?\n你: [U11 interview + 是…的 detail + 不仅…而且… self-criticism]\n朋友: 那你打算怎么办? 要搬出去吗?\n你: [U12 housing with 押金/合同/中介]\n朋友: 唉，确实辛苦。周末有什么放松的活动吗?\n你: [U6 festival with 又…又… or 既…又… + chengyu close]\n朋友: 加油! [proverb encouragement]\n你: 谢谢。正所谓"[chengyu]"，慢慢来吧。',
      'Ten turns of fully integrated multi-topic Mandarin. The conversation tutor will adapt to whatever week you actually narrate.',
      [
        { target: 'open with U7 incident', note: '被 passive; "phone/wallet/bike stolen" or "minor accident" sets the tone' },
        { target: '是…的 follow-up', note: 'friend asks WHEN/WHERE/HOW; you answer with the focus structure from grammar II' },
        { target: 'U8 medical with modal', note: 'doctor told you what you 应该 do and 不能 do — apply both modals' },
        { target: 'U10 rule with consequence', note: 'name the rule + the modal (必须 / 不能) + the consequence (罚款 / 警告)' },
        { target: 'U11 interview with layered description', note: 'use 不仅…而且… in self-criticism — formal-written register inside spoken narration' },
        { target: 'U12 housing decision', note: 'name 押金, 合同, 中介, 房东 in the apartment-decision context' },
        { target: 'U6 festival close', note: 'recovery outing; use 又…又… or 既…又… for the layered description' },
        { target: 'chengyu close', note: 'one chengyu from Thematic U5; 入乡随俗 / 千里之行始于足下 / 失败是成功之母 are the safest' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战 — 文化对比',
      'tiǎozhàn — wénhuà duìbǐ',
      'Stretch goal: after narrating your hard week, the friend asks "would this have been easier back home?" Compare ONE event from your week (the 派出所 / clinic / dorm rule / housing search / festival) with the equivalent back home — name what is different about the rules, the language, the customs. Use 不仅…而且… or 既…又… to make the comparison feel native.',
      'conversation',
      '朋友: 在你的国家，发生这种事会怎么样?\n你: [comparison with 不仅…而且… or 既…又…]\n朋友: 啊，差别这么大!\n你: 是啊，正所谓"入乡随俗"，我也得慢慢适应。',
      'Cross-cultural reflection is the test of integration; the chengyu 入乡随俗 fits perfectly here.',
      [
        { target: 'comparison frame', note: '不仅…而且…(formal) / 既…又…(literary) — both work; pick the register that fits the topic' },
        { target: 'evaluation tone', note: 'avoid judgmental "China is worse / better" — name differences neutrally as part of cultural adaptation' },
        { target: 'chengyu close', note: '入乡随俗 is the canonical close; signals you understand and accept the cultural difference' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
