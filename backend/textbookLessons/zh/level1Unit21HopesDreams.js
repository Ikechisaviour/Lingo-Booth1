// Level 1 Unit 21 — Hopes & Dreams (Mandarin Chinese)
// Functions: stating a dream job, expressing wishes/plans/intentions,
// sequencing post-graduation events, sharing aspirations in a career-office
// mock interview at Tsinghua University.
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
  orientation: 'zh-l1u21-orientation',
  pronunciation: 'zh-l1u21-pronunciation',
  vocabularyJobs: 'zh-l1u21-vocab-jobs',
  vocabularyFuture: 'zh-l1u21-vocab-future',
  grammarModals: 'zh-l1u21-grammar-modals',
  grammarYaoZhunbei: 'zh-l1u21-grammar-yao-zhunbei',
  grammarYihou: 'zh-l1u21-grammar-yihou',
  reading: 'zh-l1u21-reading',
  listening: 'zh-l1u21-listening',
  writing: 'zh-l1u21-writing',
  culture: 'zh-l1u21-culture',
  task: 'zh-l1u21-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Talk about your dream job and post-graduation plans using a career-noun + 想/希望/打算 pattern that fits a polite professional setting.',
      'Distinguish wishing (想 / 希望), planning (打算), and concrete intention (要 / 准备 + V) so you choose the right verb for the level of commitment.',
      'Sequence future steps with [event]以后… ("after [event] I will…") so your timeline sounds natural, not list-like.',
    ],
    task: 'Picture yourself at the Tsinghua career office for a mock interview — by the end of this lesson you should be able to state your dream job, your post-graduation plan, and one specific step you will take, all in fluent Mandarin.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in this lesson',
    goals: [
      'Pronounce 梦想 (mèngxiǎng) clearly: 4th + 3rd; the third-tone 想 keeps its full dip when it ends a phrase.',
      'Pronounce 希望 (xīwàng) with a clean palatal x (not English "h") and a sharp falling 4th-tone 望 — the two-syllable rhythm is high-flat → high-fall.',
      'Master the affricate 创业 (chuàngyè): aspirated retroflex ch- + the 4th-tone-then-4th-tone rhythm common in two-character career nouns.',
      'Apply 不 (bù) sandhi inside this lesson\'s common negatives: 不想 → bùxiǎng (no sandhi, 想 is 3rd) vs 不要 → búyào (sandhi, 要 is 4th).',
    ],
    task: 'Read each high-frequency career word aloud three times and identify which sandhi rules apply.',
  },
  {
    id: ACT.vocabularyJobs,
    section: 'Vocabulary I',
    title: 'Career nouns and the 当 / 做 patterns',
    goals: [
      'Name 12+ common career nouns (工程师, 医生, 老师, 律师, 记者, 设计师, 程序员…) and recognize the suffix 师 ("master/expert") on many professional titles.',
      'Form "become a/an X" with 当 X (more colloquial: 当老师) or 做 X (more workplace-neutral: 做设计师). Use 成为 X for "to become" in slightly more formal contexts.',
    ],
    task: 'Pick three jobs you might pursue and say each one using both 想当… and 想做… — note which sounds more natural for that job.',
  },
  {
    id: ACT.vocabularyFuture,
    section: 'Vocabulary II',
    title: 'Future, dream, and aspiration words',
    goals: [
      'Use the core future-talk nouns: 梦想 (dream/aspiration), 希望 (hope, also a verb), 计划 (plan), 目标 (goal), 将来/未来 (future), 毕业 (graduate), 工作 (work/job), 留学 (study abroad), 创业 (start a business).',
      'Distinguish 将来 (the indefinite future, "later in life") from 未来 (a more formal "the future") and from 以后 (after / from then on).',
    ],
    task: 'Pair each future-noun with one aspiration verb (想/希望/打算/要/准备) and build a complete one-sentence future statement.',
  },
  {
    id: ACT.grammarModals,
    section: 'Grammar I',
    title: '想 / 希望 / 打算 — three shades of wanting',
    goals: [
      'Use 想 + V for a light wish or want ("I\'d like to…"): 我想当老师 ("I\'d like to be a teacher").',
      'Use 希望 + (subject) + V for a stronger or more formal hope, including hopes about other people: 我希望我妈妈健康 ("I hope my mom stays healthy"). 希望 can take a full subject-verb clause where 想 cannot.',
      'Use 打算 + V for a concrete plan or intention you are already turning into action: 我打算去北京找工作 ("I plan to go to Beijing to look for work").',
      'CRITICAL CONTRAST: 想 = soft wish · 希望 = stronger/formal hope, often about outcomes beyond your control · 打算 = concrete plan, the closest to English "intend to".',
    ],
    task: 'Take one career goal and express it three ways — with 想, 希望, and 打算 — noticing how each shifts the commitment level.',
  },
  {
    id: ACT.grammarYaoZhunbei,
    section: 'Grammar II',
    title: '要 / 准备 + V — strong intention and preparation',
    goals: [
      'Use 要 + V for a firm intention ("I will / I want to"): 我要当工程师 ("I am going to become an engineer"). 要 is stronger than 想 — the speaker has made the decision.',
      'Use 准备 + V for "preparing to / getting ready to" do something concrete: 我准备考研 ("I\'m preparing to take the graduate-school exam").',
      'Know that the negative of 要 is 不想 (soft) or 不要 (firm refusal) — 不要 V can sound like "don\'t want to" or "don\'t" depending on context.',
    ],
    task: 'State three career steps you are firmly intending using 要, then restate them with 准备 to show you are already in motion.',
  },
  {
    id: ACT.grammarYihou,
    section: 'Grammar III',
    title: '以后 — sequencing the future',
    goals: [
      'Use [V/event] + 以后 + [main clause] for "after [event], [main]". The 以后 phrase always comes FIRST: 毕业以后我要去北京 ("After graduating I will go to Beijing"), never 我要去北京毕业以后.',
      'Use 以后 alone at the start of a clause for "in the future / later on": 以后我想自己创业 ("Later on I want to start my own business").',
      'Contrast 以后 with 以前 ("before") which works identically in word order: 毕业以前 ("before graduating").',
    ],
    task: 'Sequence three career steps in time using 毕业以后…, …以后…, and one negative future event (X 以后我不想…).',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'Read a career-statement paragraph',
    goals: [
      'Read a 5-6 sentence career statement aloud with correct tones, sandhi, and natural rhythm.',
      'Answer four comprehension questions identifying the writer\'s dream job, school, post-graduation plan, and one specific preparation step.',
    ],
    task: 'Read the paragraph below aloud once, then answer the comprehension questions in short Mandarin sentences using 想 / 希望 / 打算.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'Two Tsinghua students share their dreams',
    goals: [
      'Follow a 6-turn dream-sharing dialogue between two undergraduates and catch the register-shift markers (peer 你 throughout, casual 怎么样? check-ins).',
      'Reproduce the dialogue swapping in your own dream job, your own city, and one specific preparation step.',
    ],
    task: 'Read the dialogue along with the tutor once, then perform it again with your own information.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Write your own dream-and-plan paragraph',
    goals: [
      'Write 5-6 sentences in Hanzi covering your dream job, your current school/major, your post-graduation plan, and one specific preparation step.',
      'Use 想 or 希望 at least once, 打算 or 要 at least once, and one [event]以后 clause so the writing demonstrates all three grammar points of this lesson.',
    ],
    task: 'Write your own dream paragraph in 5-6 sentences using the model on the left, then read it aloud with correct tones.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: '内卷, 躺平, 海归, 北漂 — the modern Chinese career landscape',
    goals: [
      'Understand 内卷 (nèijuǎn, "involution") — the over-competition treadmill in education and the tech sector where everyone works harder for diminishing returns.',
      'Understand 躺平 (tǎngpíng, "lying flat") — the millennial/Gen-Z counter-culture of opting out of the rat race, doing the minimum, refusing to chase status.',
      'Know the appeal hierarchy: 大厂 (top tech firms like 腾讯/阿里/字节) and 公务员 (civil servant via 公务员考试) at the top for stability/prestige, with 创业 (startup founder) and 海归 (returnee from overseas study) as alternative high-status paths.',
      'Understand 北漂 / 沪漂 — young people who "drift" to Beijing or Shanghai for opportunity, often facing housing costs and registration (户口) hurdles, and the strong family pressure that shapes most career choices.',
    ],
    task: 'Compare 内卷 and 躺平 with your own country\'s career culture in two short sentences using one Mandarin word from each.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'Mock career-office interview at Tsinghua',
    goals: [
      'Combine everything from this lesson into one continuous mock-interview scene with no break between greeting, dream-job statement, post-graduation plan, and one specific step.',
      'Use the polite-but-not-formal student-to-counselor register (你 throughout, no 您 unless explicitly invited) — the standard Tsinghua career-office tone.',
    ],
    task: 'Roleplay a 6-turn mock interview with the tutor playing a Tsinghua career counselor; share your dream job, your plan after graduation, and one concrete preparation step.',
  },
];

const lesson = {
  title: 'Level 1 · Unit 21: 我的梦想 — Hopes and Dreams',
  category: 'career',
  difficulty: 'beginner',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'stating-dream-job', label: 'Stating a dream job', goal: 'Use 想/希望/打算 + 当/做 + career noun to share what you want to be — and pick the verb that matches the level of commitment.' },
    { id: 'expressing-hope', label: 'Expressing a hope or wish', goal: 'Use 希望 + (subject) + V to express a stronger hope, including hopes about people or outcomes beyond your own control.' },
    { id: 'stating-firm-plan', label: 'Stating a concrete plan', goal: 'Use 打算 + V or 准备 + V to state a plan you are already turning into action.' },
    { id: 'sequencing-future', label: 'Sequencing future events', goal: 'Use [event]以后 + clause to put career steps in order (毕业以后…, 工作几年以后…).' },
  ],
  relatedPools: ['topic-people', 'topic-society'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '本课目标',
      'běn kè mùbiāo',
      'By the end of this lesson, you can name your dream job, express how strongly you want it (wish vs hope vs plan), and sequence two or three post-graduation steps — enough to handle a short career-office interview without rehearsing each line.',
      'word',
      'Functions: 谈梦想 tán mèngxiǎng (talk dreams) · 表达希望 biǎodá xīwàng (express hopes) · 说计划 shuō jìhuà (state plans) · 排顺序 pái shùnxù (sequence events)',
      'These four micro-skills are the spine of every career conversation in modern Mandarin — once they are automatic, every later interview, networking event, or job application sentence layers on top.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      '真实场景',
      'zhēnshí chǎngjǐng',
      'You are at the Tsinghua career office for a mock interview. The counselor asks about your dream job and post-graduation plan. The whole exchange takes about a minute and you will need every micro-skill from this lesson.',
      'word',
      '就业指导老师: "你毕业以后打算做什么? 你的梦想是什么?"',
      'A typical opener from a Tsinghua career counselor: polite peer-level register (你, not 您), 打算 for "what are you planning", and a direct dream question — standard Chinese career-office style.',
      [
        { target: '毕业以后 bìyè yǐhòu', note: '"after graduating" — the [event]以后 pattern; sets the future timeline' },
        { target: '打算做什么 dǎsuàn zuò shénme', note: '"plan to do what" — 打算 marks a concrete plan, stronger than 想 (light wish)' },
        { target: '梦想 mèngxiǎng', note: 'noun: dream/aspiration; common in interviews and personal statements, slightly more aspirational than 计划 (plan) or 目标 (goal)' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '三个意愿等级',
      'sān gè yìyuàn děngjí',
      'Mandarin distinguishes three commitment levels for future plans. Light wish: 想 V ("I\'d like to…"). Stronger hope: 希望 V or 希望 (subject) V ("I hope (that)…"). Concrete plan: 打算 V or 要 V ("I plan / I\'m going to…"). Choosing the wrong one signals either over-commitment (too strong) or vagueness (too weak).',
      'word',
      '想当老师 (light wish) → 希望当一名好老师 (stronger hope) → 打算毕业以后当老师 (concrete plan)',
      'Same career, three levels of commitment — the counselor reads this distinction immediately.',
      [
        { target: 'LIGHT: 想 + V', note: 'use when you are still considering options or want to sound humble — the safest verb when you are not yet sure' },
        { target: 'STRONGER: 希望 + V', note: 'use for outcomes you really want, including things beyond your control (other people\'s actions, future health, exam results)' },
        { target: 'CONCRETE: 打算 + V', note: 'use when you have a real plan in mind and are already taking steps — the verb interviewers most want to hear' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '梦想',
      'mèngxiǎng',
      'Fourth tone + third tone: 梦 falls sharply, then 想 dips fully because it ends the word. The two-syllable rhythm is heavy-down then low-rise. Most common dream/aspiration noun in modern Mandarin.',
      'word',
      '我的梦想是当工程师。wǒ de mèngxiǎng shì dāng gōngchéngshī.',
      'A high-frequency career-talk noun; the rhythm is a useful drill for the 4+3 tone pair.',
      [
        { target: '梦 (mèng, 4th)', note: 'sharp falling tone; the consonant m- is voiced and easy for English speakers' },
        { target: '想 (xiǎng, 3rd)', note: 'full dip-and-rise because it is phrase-final; x is the palatal fricative (soft "sh"), not English "h"' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '希望',
      'xīwàng',
      'First tone + fourth tone: 希 is held high and level, then 望 falls sharply. The x is a palatal fricative — tongue flat and forward, not English "h" or "sh". Used both as a noun ("hope") and as a verb ("to hope (that)…").',
      'word',
      '我希望毕业以后留在北京。wǒ xīwàng bìyè yǐhòu liú zài Běijīng.',
      'High-frequency aspiration verb; the high-flat → high-fall rhythm is typical of two-character abstract nouns.',
      [
        { target: '希 (xī, 1st)', note: 'first tone, held steady; the palatal x sounds like a soft "she" with no rounding' },
        { target: '望 (wàng, 4th)', note: 'sharp falling tone; the w- is a glide, almost silent before the a-vowel' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '打算',
      'dǎsuàn',
      'Third tone + fourth tone: 打 dips (or half-dips in fast speech), then 算 falls sharply. The s in 算 is the dental fricative, sharper and more forward than English "s". Most common "plan" verb in career talk.',
      'word',
      '你打算去哪个城市工作? nǐ dǎsuàn qù nǎge chéngshì gōngzuò?',
      'High-frequency planning verb; the 3rd-tone 打 may shorten to a half-third in connected speech but does not change to a rising tone (no sandhi here since 算 is 4th).',
      [
        { target: '打 (dǎ, 3rd)', note: 'third tone; in fast speech often heard as just a low pitch (half-third) rather than the full dip-and-rise' },
        { target: '算 (suàn, 4th)', note: 'fourth tone with the dental s-; sharp falling pitch closes the word' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '创业',
      'chuàngyè',
      'Fourth tone + fourth tone: both syllables fall sharply, giving the word a decisive, punchy rhythm appropriate to its meaning ("start a business"). The aspirated retroflex ch- has a strong puff and a curled-back tongue.',
      'word',
      '我以后想自己创业。wǒ yǐhòu xiǎng zìjǐ chuàngyè.',
      'A culturally heavy word in modern China — associated with the tech boom, returnees (海归), and the entrepreneurship narrative.',
      [
        { target: '创 (chuàng, 4th)', note: 'aspirated retroflex ch- with a strong puff; the rounded -uang final glides from u to a to ng' },
        { target: '业 (yè, 4th)', note: 'fourth tone; the y is a glide ("ye-" as in English "yes"), and the -e final is the front-mid vowel' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '不想 / 不要',
      'bùxiǎng / búyào',
      '不 (bù) sandhi inside this lesson: 不想 stays as bùxiǎng (no sandhi, because 想 is 3rd tone), but 不要 becomes búyào (sandhi, because 要 is 4th tone). Written tones never change; only the spoken pronunciation does.',
      'word',
      '我不想当律师，我不要做这个工作。wǒ bùxiǎng dāng lǜshī, wǒ búyào zuò zhège gōngzuò.',
      'High-frequency negative forms in career talk; getting the sandhi right makes "no thanks, not this path" sound natural rather than robotic.',
      [
        { target: '不 + 3rd (e.g., 想) → bù (no sandhi)', note: 'e.g., 不想 bùxiǎng, 不好 bùhǎo — 不 keeps its fourth tone' },
        { target: '不 + 4th (e.g., 要) → bú (sandhi)', note: 'e.g., 不要 búyào, 不是 búshì — 不 changes to rising tone' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Career nouns + 当 / 做
    // ────────────────────────────────────────────────────────────────────
    createContentItem('工程师', 'gōngchéngshī', 'Engineer in any technical discipline. Compound of 工程 (project/engineering) + 师 (master/expert). High-prestige profession in modern China, especially software (软件工程师) and hardware engineering, deeply tied to Tsinghua\'s reputation as China\'s top tech school.', 'word', '我想当一名软件工程师。', 'Standard "I want to be a software engineer" — note 一名 (yì míng) as the polite measure word for professionals.', null, [ACT.vocabularyJobs]),
    createContentItem('程序员', 'chéngxùyuán', 'Programmer / software developer. Compound of 程序 (program) + 员 (member/-er). Slightly more specific than 工程师 — refers to a coding-focused role; widely used in tech-industry talk and self-deprecating jokes (码农 mǎnóng "code farmer" is the casual self-label).', 'word', '我打算毕业以后当程序员。', 'Standard tech-career plan; 程序员 is the colloquial industry term while 软件工程师 is the formal job title.', null, [ACT.vocabularyJobs]),
    createContentItem('医生', 'yīshēng', 'A medical doctor. Also functions as a title after the family name (李医生 = "Doctor Li"). High-prestige profession but training is long (5+ years undergraduate + residency); culturally seen as a stable, respected path that pleases parents.', 'word', '我妈妈希望我当医生。', '"My mom hopes I become a doctor" — note 希望 + (subject) + V allowing hopes about another person\'s outcome.', null, [ACT.vocabularyJobs]),
    createContentItem('老师', 'lǎoshī', 'A teacher at any level from primary school to university. Used freely as a title after the family name (王老师 = "Teacher Wang"). Considered a respected, stable career; civil-servant teachers (公办老师) have especially high job security.', 'word', '她想当英语老师。', 'Common career goal among humanities-track students; the 当 + role pattern is the most natural form.', null, [ACT.vocabularyJobs]),
    createContentItem('律师', 'lǜshī', 'A lawyer. Compound of 律 (law) + 师 (master/expert). High-prestige career associated with sharp thinking and high income; pass rate for the national legal-profession exam (法考) is notoriously low.', 'word', '我朋友打算考律师。', '"My friend plans to take the bar exam" — 考 + profession-name is the short form for "take the exam for X profession".', null, [ACT.vocabularyJobs]),
    createContentItem('记者', 'jìzhě', 'A journalist or reporter. Compound of 记 (record) + 者 (one who…). The career has lost some of its 1990s-2000s glamour as traditional media has shrunk, but investigative and digital journalism still attract idealistic graduates.', 'word', '我以前想当记者，现在想做设计师。', 'Common dream-shift sentence; uses 以前… 现在… to contrast past and current aspirations.', null, [ACT.vocabularyJobs]),
    createContentItem('设计师', 'shèjìshī', 'A designer (graphic, product, UI/UX, interior). Compound of 设计 (design) + 师 (master/expert). Trendy modern career associated with the creative industries; common goal among art-school and humanities students.', 'word', '她梦想当一名时装设计师。', '"Her dream is to be a fashion designer" — 梦想 + 当 + 一名 + role is the formal aspirational phrasing.', null, [ACT.vocabularyJobs]),
    createContentItem('翻译', 'fānyì', 'A translator/interpreter (also functions as the verb "to translate"). Used as both a job title and an action verb; high-end conference interpreters (同传 tóngchuán "simultaneous interpreter") are well-paid and prestigious.', 'word', '我想当一名中英翻译。', '"I want to be a Chinese-English translator/interpreter" — a common goal for international-relations and language-major students.', null, [ACT.vocabularyJobs]),
    createContentItem('公务员', 'gōngwùyuán', 'A civil servant. Compound of 公务 (public affairs) + 员 (member). The most coveted "stable" career in modern China — guaranteed for life, prestigious within local communities; the entrance exam (公务员考试 or 国考) is one of the most competitive in the country.', 'word', '我哥哥打算考公务员。', '"My older brother plans to take the civil-service exam" — 考公 is the colloquial short form for this exam path.', null, [ACT.vocabularyJobs]),
    createContentItem('企业家', 'qǐyèjiā', 'An entrepreneur / business founder. Compound of 企业 (enterprise) + 家 (-ist/expert). A high-status modern career label, especially after the post-2010 tech boom; closely tied to 创业 (start a business).', 'word', '他的梦想是成为一名企业家。', '"His dream is to become an entrepreneur" — 成为 is slightly more formal than 当, fitting the aspirational tone.', null, [ACT.vocabularyJobs]),
    createContentItem('科学家', 'kēxuéjiā', 'A scientist. Compound of 科学 (science) + 家 (-ist/expert). Especially prestigious in fields where China is investing heavily (AI, biotech, semiconductors, space); a common "childhood dream" answer.', 'word', '小时候我想当科学家。', '"As a child I wanted to be a scientist" — 小时候 sets a past-childhood time frame; 想 takes the past meaning from context, not from any tense marker.', null, [ACT.vocabularyJobs]),
    createContentItem('护士', 'hùshi', 'A nurse. Compound of 护 (protect) + 士 (person/professional). Predominantly female profession in China; nursing-school graduates often have very high employment rates due to chronic hospital staffing shortages.', 'word', '我姐姐是护士，她希望以后当护士长。', '"My older sister is a nurse; she hopes to become head nurse later" — uses 希望 for a career-advancement hope and 以后 for "later on".', null, [ACT.vocabularyJobs]),
    createContentItem('演员', 'yǎnyuán', 'An actor/actress. Compound of 演 (perform) + 员 (member). Glamorous but extremely competitive career; entering the major drama academies (北电, 中戏) is harder than entering Tsinghua for top scorers.', 'word', '她梦想当电影演员。', '"Her dream is to be a film actress" — 演员 is gender-neutral; 电影演员 specifies film vs television.', null, [ACT.vocabularyJobs]),
    createContentItem('当', 'dāng', 'Verb meaning "to be / serve as / become" a profession or role. The most colloquial way to say "become a teacher / doctor / engineer": 当老师 / 当医生 / 当工程师. Slightly warmer than 做; preferred for service-oriented professions.', 'word', '我想当老师，因为我喜欢孩子。', '"I want to be a teacher because I like kids" — 当 + role is the natural form; using 做 here is also fine but less personal.', [
      { target: '当 + role', note: 'colloquial "be / serve as" a profession; works for almost any career noun' },
      { target: '当老师 / 当医生 / 当律师', note: 'most common collocations for teaching, medicine, law' },
    ], [ACT.vocabularyJobs]),
    createContentItem('做', 'zuò', 'Verb meaning "to do / be / work as". An alternative to 当 for stating a profession; slightly more workplace-neutral and common with newer/modern career labels: 做设计师 (be a designer), 做程序员 (be a programmer). Also the all-purpose "do" verb.', 'word', '我打算毕业以后做设计师。', '"After graduating I plan to work as a designer" — 做 is the workplace-neutral choice for design, tech, and business roles.', [
      { target: '做 + role', note: 'workplace-neutral "be/work as" a profession; preferred for modern/creative/tech jobs' },
      { target: '做设计师 / 做程序员 / 做生意', note: 'common with design, tech, and business roles' },
    ], [ACT.vocabularyJobs]),
    createContentItem('成为', 'chéngwéi', 'Verb meaning "to become". A more formal alternative to 当 + role or 做 + role. Used in aspirational, written, or interview contexts: 成为一名工程师 ("to become an engineer"). Often pairs with a 一名 measure word.', 'word', '我希望成为一名优秀的科学家。', '"I hope to become an excellent scientist" — 优秀 (yōuxiù, "excellent") plus 成为 + 一名 + role is the polished interview phrasing.', null, [ACT.vocabularyJobs]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: Future & aspiration words
    // ────────────────────────────────────────────────────────────────────
    createContentItem('梦想', 'mèngxiǎng', 'Dream / aspiration (noun, occasionally verb). The most evocative aspiration word — used in interviews, personal statements, and motivational contexts. More aspirational and emotional than 目标 (goal) or 计划 (plan).', 'word', '我的梦想是当工程师，让世界更好。', '"My dream is to be an engineer and make the world better" — 梦想是 + dream-clause is the standard interview opener.', null, [ACT.vocabularyFuture]),
    createContentItem('希望', 'xīwàng', 'Hope (noun) / to hope (verb). As a verb it can take a full clause: 我希望我朋友身体好 ("I hope my friend stays healthy"). Stronger and more formal than 想; appropriate for serious wishes about outcomes beyond your control.', 'word', '我希望毕业以后能留在北京工作。', '"I hope I can stay in Beijing to work after graduating" — 希望 + 能 (can) + V is the polite "I hope to be able to" pattern.', null, [ACT.vocabularyFuture]),
    createContentItem('计划', 'jìhuà', 'Plan (noun) / to plan (verb). Concrete, executable plans rather than vague hopes; pairs well with 打算 (intend) and 准备 (prepare). 有计划 ("have a plan") is a common compliment in workplace and career contexts.', 'word', '你有什么具体的计划吗?', '"Do you have any concrete plans?" — 具体 (jùtǐ, "concrete/specific") is the adjective that turns vague aspirations into interview-worthy answers.', null, [ACT.vocabularyFuture]),
    createContentItem('目标', 'mùbiāo', 'Goal / target. Specific, measurable endpoints rather than open-ended dreams. Used in education, sports, and career contexts; 设定目标 (shèdìng mùbiāo, "set a goal") is the standard collocation.', 'word', '我的短期目标是通过HSK六级。', '"My short-term goal is to pass HSK level 6" — 短期 (short-term) and 长期 (long-term) are common modifiers.', null, [ACT.vocabularyFuture]),
    createContentItem('将来', 'jiānglái', 'The future / later in life (especially the indefinite, distant future). More colloquial than 未来 and less formal. Used when talking about a person\'s eventual career, family, or life direction.', 'word', '你将来想做什么?', '"What do you want to do in the future?" — the most common form of this question in casual peer-to-peer career chat.', null, [ACT.vocabularyFuture]),
    createContentItem('未来', 'wèilái', 'The future (as a concept or era). More formal and abstract than 将来; common in speeches, written essays, and discussions of society or technology.', 'word', '人工智能的未来非常重要。', '"The future of AI is very important" — typical use as a topic-level abstract noun, common in tech and policy discussion.', null, [ACT.vocabularyFuture]),
    createContentItem('以后', 'yǐhòu', '"After / from then on / later". Functions both as a clause-ender ([event]以后 = "after [event]") and as a standalone time word at the start of a clause ("later on, I want to…"). The most useful future-sequencing word in this lesson.', 'word', '毕业以后我打算去上海工作。', '"After graduating I plan to go to Shanghai to work" — note the [event]以后 phrase comes FIRST, before the main clause.', null, [ACT.vocabularyFuture]),
    createContentItem('毕业', 'bìyè', 'To graduate / graduation. Functions as both a verb (毕业了 "have graduated") and a noun (毕业以后 "after graduation"). The most common future-anchor event in undergraduate career talk.', 'word', '我明年毕业。', '"I graduate next year" — Mandarin uses 明年 + verb without any future tense marker; the time word does all the work.', null, [ACT.vocabularyFuture]),
    createContentItem('工作', 'gōngzuò', 'Work / to work / a job. Used as a verb (我在北京工作 "I work in Beijing"), a noun (找工作 "look for a job"), and informally as the equivalent of "career". In career-office context, 找工作 means the job-search process.', 'word', '毕业以后我要找工作，不读研。', '"After graduating I want to look for a job, not pursue graduate study" — typical contrast between job-track and graduate-school-track plans.', null, [ACT.vocabularyFuture]),
    createContentItem('留学', 'liúxué', 'To study abroad / study-abroad (noun). Compound of 留 (stay/reside) + 学 (study). 留学生 ("study-abroad student") is the standard term for international students in China and Chinese students overseas.', 'word', '我打算去美国留学。', '"I plan to go to the US to study abroad" — destination + 留学 is the standard pattern; the destination always precedes the verb.', null, [ACT.vocabularyFuture]),
    createContentItem('创业', 'chuàngyè', 'To start a business / entrepreneurship. Compound of 创 (create) + 业 (enterprise/career). Strong cultural resonance after the 2010s tech boom; associated with risk-taking, founder narratives, and the "Chinese dream" of becoming a 企业家 (entrepreneur).', 'word', '我以后想自己创业，做一家科技公司。', '"In the future I want to start my own business — a tech company" — uses 自己 (oneself/independently) to emphasize the founder identity.', null, [ACT.vocabularyFuture]),
    createContentItem('考研', 'kǎoyán', 'To take the graduate-school entrance exam / pursue graduate study. Colloquial short form of 考研究生 (kǎo yánjiūshēng). The number of 考研 takers has climbed every year — a major life decision for Chinese undergraduates.', 'word', '我打算先考研，再找工作。', '"I plan to take the grad-school exam first, then look for work" — 先… 再… is the standard "first… then…" sequencer.', null, [ACT.vocabularyFuture]),
    createContentItem('努力', 'nǔlì', 'To work hard / hard-working (adj.) / hard work (noun). Functions as a verb (我会努力 "I will work hard"), an adjective (努力的学生 "a hard-working student"), and a noun. Core value word in modern Chinese self-presentation.', 'word', '为了梦想，我每天都努力学习。', '"For my dream, I study hard every day" — 为了 + goal sets the motivation; 每天都 ("every day") intensifies the consistency.', null, [ACT.vocabularyFuture]),
    createContentItem('成功', 'chénggōng', 'To succeed / success / successful. Functions as a verb (创业成功 "succeed in starting a business"), a noun (成功的关键 "the key to success"), and an adjective. High-frequency aspirational word.', 'word', '我希望以后能成功。', '"I hope to succeed in the future" — 能 (can/be able to) softens the claim and makes it humble.', null, [ACT.vocabularyFuture]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar I: 想 / 希望 / 打算
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '想 — light wish',
      'xiǎng + V',
      '想 + V expresses a soft wish or preference ("I\'d like to / I want to"). The lightest of the three modal verbs in this lesson — does not imply commitment, only inclination. Cannot take a clausal complement with a different subject (use 希望 for that).',
      'sentence',
      '我想当工程师。我想去北京工作。我想学一门新的语言。',
      'Three soft-wish sentences in a row — career, location, and skill. 想 is the safe default when you are still exploring options.',
      [
        { target: '想 + V', note: 'soft wish / would like to; same subject throughout' },
        { target: '不想 + V', note: 'soft refusal / don\'t want to; no sandhi because 想 is 3rd tone' },
        { target: '想 ≠ 希望', note: '想 cannot take a different-subject clause; for "I hope my friend succeeds" you need 希望' },
      ],
      [ACT.grammarModals],
    ),
    createContentItem(
      '希望 — stronger hope',
      'xīwàng + (subject) + V',
      '希望 + (subject) + V expresses a stronger or more formal hope. Critically, 希望 CAN take a full clause with a different subject: 我希望我妈妈健康 ("I hope my mom is healthy"). Use 希望 for outcomes beyond your control or for serious wishes.',
      'sentence',
      '我希望毕业以后能找到好工作。我希望我的朋友也成功。我希望明天不下雨。',
      'Three hope sentences — own outcome, someone else\'s outcome, and a weather wish. The middle and third forms are impossible with 想.',
      [
        { target: '希望 + V (same subject)', note: '"I hope to V" — equivalent to 想 but with more weight; common in formal/professional speech' },
        { target: '希望 + subject + V (different subject)', note: '"I hope (that) someone else does V" — only 希望 can do this, not 想' },
        { target: '希望 + 能 + V', note: 'humble form "hope to be able to V"; 能 softens the claim — common in interview phrasing' },
      ],
      [ACT.grammarModals],
    ),
    createContentItem(
      '打算 — concrete plan',
      'dǎsuàn + V',
      '打算 + V expresses a concrete plan or intention ("I plan to / intend to"). The closest Mandarin equivalent to English "plan to" — implies you have actually thought through the next steps. The verb interviewers and counselors most want to hear.',
      'sentence',
      '我打算毕业以后去深圳工作。我打算先考研，再找工作。我不打算留在北京。',
      'Three concrete-plan sentences — career destination, sequencing, and a negative plan. Note 不打算 ("don\'t plan to") is the natural negative.',
      [
        { target: '打算 + V', note: 'concrete plan / intend to; commits the speaker more than 想 or 希望' },
        { target: '不打算 + V', note: '"don\'t plan to"; the natural negative form, no sandhi (算 is 4th but 打 is 3rd, so 不 + 3rd = bù no sandhi)' },
        { target: '打算 vs 想 vs 希望', note: '打算 = concrete plan · 想 = soft wish · 希望 = stronger hope, often about uncontrollable outcomes — picking the right one signals your commitment level' },
      ],
      [ACT.grammarModals],
    ),
    createContentItem(
      'CONTRAST: same dream, three commitment levels',
      'same dream, three commitment levels',
      'The most important lesson of this grammar point: the SAME career goal can be stated with 想, 希望, or 打算 — and each version sends a different signal about how serious you are. Interview answers using 打算 sound more credible than answers using 想.',
      'sentence',
      'WANT: 我想当老师。\nHOPE: 我希望以后能当一名好老师。\nPLAN: 我打算毕业以后去当老师。',
      'One career, three commitment levels — pick the one that matches your actual situation, not always the strongest.',
      [
        { target: 'WANT (想): lightest', note: 'safe when you are still exploring; sounds humble but uncommitted' },
        { target: 'HOPE (希望): stronger, often about quality or outcome', note: '"a GOOD teacher" — adds quality language; sounds aspirational' },
        { target: 'PLAN (打算): most concrete, with timeline', note: '"after graduating, will go" — adds a real time anchor; sounds executable' },
      ],
      [ACT.grammarModals],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar II: 要 / 准备 + V
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '要 — firm intention',
      'yào + V',
      '要 + V expresses firm intention ("I will / I want to / I am going to"). Stronger than 想 because the decision has been made — the speaker is no longer wavering. In future-time contexts, 要 often translates as English "will" or "am going to".',
      'sentence',
      '我要当工程师，这是我的目标。明年我要毕业。我要好好学习。',
      'Three firm-intention sentences — career commitment, near-future event, and self-resolution. The certainty in 要 makes the speaker sound decisive.',
      [
        { target: '要 + V', note: 'firm intention / "will / am going to"; the decision is made' },
        { target: '要 vs 想', note: '要 is committed, 想 is exploratory — choosing 要 signals you have already decided' },
        { target: 'time word + 要 + V', note: '"明年我要毕业" — adds a time anchor that makes the plan concrete' },
      ],
      [ACT.grammarYaoZhunbei],
    ),
    createContentItem(
      '准备 — preparing to',
      'zhǔnbèi + V',
      '准备 + V means "preparing to / getting ready to / about to" do something. Stronger than a plan (打算) because the speaker is already in motion — taking concrete steps right now. Also functions as the noun "preparation" and the verb "to prepare".',
      'sentence',
      '我准备考研。她准备去美国留学。我们准备明年结婚。',
      'Three "preparing to" sentences — graduate exam, study-abroad application, marriage. Each implies the speaker is already in active preparation.',
      [
        { target: '准备 + V', note: '"preparing to V / getting ready to V"; implies the speaker is already in motion' },
        { target: '准备 vs 打算', note: '打算 = have a plan in mind; 准备 = already taking steps to execute' },
        { target: '准备 + N', note: 'also "to prepare N": 准备晚饭 ("prepare dinner"), 准备考试 ("prepare for an exam")' },
      ],
      [ACT.grammarYaoZhunbei],
    ),
    createContentItem(
      'CONTRAST: 想 / 打算 / 要 / 准备 — the full spectrum',
      'full commitment spectrum',
      'The four future-verbs form a commitment spectrum from softest to most active. Picking the wrong end signals either over-promising (too strong) or vagueness (too weak). In a Tsinghua career interview, 打算 and 准备 land best; 想 sounds uncommitted, and 要 can sound boastful.',
      'sentence',
      'SOFTEST → MOST ACTIVE: 想当工程师 → 打算当工程师 → 要当工程师 → 准备考工程师证书',
      'Same career, four levels of activity — picking the right one is reading the room.',
      [
        { target: '想 (lightest, exploratory)', note: 'I\'d like to' },
        { target: '打算 (concrete plan)', note: 'I plan to / intend to — strong but not boastful' },
        { target: '要 (firm intention)', note: 'I will / I am going to — decisive, sometimes too strong' },
        { target: '准备 (already in motion)', note: 'I\'m preparing to — implies real action right now' },
      ],
      [ACT.grammarYaoZhunbei],
    ),
    createContentItem(
      '不要 vs 不想',
      'búyào vs bùxiǎng',
      'The negatives of 要 and 想 carry different forces. 不要 + V often means "do not / don\'t (do)" — close to a command in some contexts. 不想 + V means "don\'t want to / don\'t feel like" — a soft preference. In career talk, use 不想 to refuse a path politely.',
      'sentence',
      '我不想当公务员。(polite refusal)\n不要担心我!(near-command: "don\'t worry about me")',
      '不想 = soft preference, fine for personal-choice statements. 不要 = firm refusal or near-command, can sound abrupt in career contexts.',
      [
        { target: '不想 + V (soft)', note: '"don\'t want to / don\'t feel like" — the polite refusal form for personal choices' },
        { target: '不要 + V (firm)', note: '"don\'t / don\'t do" — can sound like a command depending on context and tone' },
      ],
      [ACT.grammarYaoZhunbei],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar III: 以后 sequencing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '[event] + 以后',
      '[event] + yǐhòu',
      '[V/event] + 以后 + [main clause] is the standard "after [event], [main]" pattern. The 以后 phrase ALWAYS comes first, never at the end. Word order: TIME-CLAUSE + MAIN-CLAUSE. Reversing the order (main clause first) is ungrammatical.',
      'sentence',
      '毕业以后我要去北京。下班以后我打算学英语。吃饭以后他想出去走走。',
      'Three sequencing sentences — graduation, work-day end, mealtime. Notice how 以后 always anchors to the beginning of the sentence.',
      [
        { target: 'V + 以后 + main clause', note: '"after V-ing, main happens"; the time clause leads' },
        { target: 'N + 以后', note: '"after N": 毕业以后 ("after graduation"), 课以后 ("after class")' },
        { target: 'WRONG: main + V + 以后', note: 'never write "我要去北京毕业以后" — the time clause must come first' },
      ],
      [ACT.grammarYihou],
    ),
    createContentItem(
      '以后 standalone',
      '"later on / from now on"',
      '以后 used alone at the start of a clause means "later on / in the future / from now on" without anchoring to a specific event. Functions like English "later" or "in the future". A frequent way to soften a vague aspiration ("later I want to…").',
      'sentence',
      '以后我想自己创业。以后再说吧。以后我会努力学习。',
      'Three standalone-以后 sentences — vague future plan, deferring a topic, and a self-promise.',
      [
        { target: '以后 + clause', note: '"in the future / later on, clause"; vaguer than [event]以后 which has a specific anchor' },
        { target: '以后再说', note: '"talk about it later" — common deferral phrase, signals the topic is closed for now' },
      ],
      [ACT.grammarYihou],
    ),
    createContentItem(
      '以前 — before',
      'yǐqián',
      '以前 ("before / previously") is the mirror image of 以后. Same word-order rule: [event]以前 + main clause. Used for sequencing both past and future events; can also stand alone meaning "previously / in the past".',
      'sentence',
      '毕业以前我要通过HSK六级。以前我想当医生，现在想当工程师。',
      'Two sequencing sentences — a pre-graduation deadline, and a past-vs-now career shift. The standalone 以前 here means "previously".',
      [
        { target: 'V/N + 以前 + main', note: '"before V/N, main" — same word order as [event]以后' },
        { target: '以前 standalone', note: '"previously / in the past, …" — contrasts with 现在 ("now")' },
      ],
      [ACT.grammarYihou],
    ),
    createContentItem(
      '先 … 再 …',
      'xiān … zài …',
      '先 + V1 + 再 + V2 sequences two events: "first do V1, then do V2". A useful structure for stating multi-step career plans. Works well with 打算 and 准备 — common in interview answers when asked "what is your timeline?"',
      'sentence',
      '我打算先考研，再找工作。她准备先去美国留学，再回国创业。',
      'Two multi-step plan sentences — graduate school then job, study abroad then return to start a business. The 先… 再… rhythm sounds confident and organized.',
      [
        { target: '先 + V1', note: '"first do V1"; the first step in the sequence' },
        { target: '再 + V2', note: '"then do V2"; the second step; do not use 然后 here unless adding a third item' },
        { target: '先… 再… 然后…', note: 'three-step variant: "first V1, then V2, then V3"' },
      ],
      [ACT.grammarYihou],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '我的梦想',
      'wǒ de mèngxiǎng',
      'A complete six-sentence career statement in Mandarin written by a Tsinghua undergraduate. Read it aloud with correct tones, sandhi, and natural rhythm. Notice how the three grammar points (modal verbs, 要/准备, 以后) all appear naturally.',
      'sentence',
      '我叫莎拉，是清华大学计算机系的学生。我的梦想是当一名软件工程师。毕业以后，我打算先在北京找工作，再考研。我希望以后能进大厂，做有意思的项目。我现在准备每天学一个小时算法。我相信只要努力，梦想一定能实现。',
      'Translation: "I\'m Sarah, a Computer Science student at Tsinghua University. My dream is to become a software engineer. After graduating, I plan to first find a job in Beijing, then take the graduate exam. I hope I can join a top tech firm later and work on interesting projects. I\'m currently preparing to study algorithms one hour every day. I believe as long as I work hard, my dream will come true."',
      [
        { target: '我的梦想是当 wǒ de mèngxiǎng shì dāng', note: '"my dream is to be" — the standard aspirational opener using 梦想是 + 当 + role' },
        { target: '毕业以后 bìyè yǐhòu', note: 'time-clause first; uses the [event]以后 + main pattern from Grammar III' },
        { target: '打算先… 再… dǎsuàn xiān… zài…', note: 'concrete two-step plan; 打算 commits the speaker, 先… 再… organizes the timeline' },
        { target: '希望以后能进大厂 xīwàng yǐhòu néng jìn dàchǎng', note: '"hope to be able to join a top tech firm later" — 希望 + 能 is the humble form; 大厂 = "big firm/factory" is the colloquial label for top tech companies' },
        { target: '准备每天学一个小时算法', note: '"preparing to study algorithms one hour every day" — 准备 + 每天 + duration + V is a concrete preparation sentence' },
        { target: '只要努力，梦想一定能实现 zhǐyào nǔlì, mèngxiǎng yídìng néng shíxiàn', note: 'closing inspirational sentence; 只要… 就/一定… ("as long as… then…") + 实现 (realize/achieve) is high-register' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '理解问题',
      'lǐjiě wèntí',
      'Four comprehension questions matching the paragraph. Answer each in a short sentence using 想 / 希望 / 打算 / 要 — the grammar points of this lesson. Full sentences are good practice but not required for natural Mandarin.',
      'sentence',
      'Q1: 莎拉的梦想是什么? Q2: 她毕业以后打算做什么? Q3: 她希望以后能去哪儿工作? Q4: 她现在准备做什么?',
      'Four questions cover the dream, the post-graduation plan, the hoped-for workplace, and the current preparation — testing every grammar point.',
      [
        { target: 'A1: 她的梦想是当软件工程师。', note: 'standard answer; reuses 梦想是 + 当 + role from the source' },
        { target: 'A2: 她打算先找工作，再考研。', note: '"plans to first find work, then take the grad exam" — uses 打算 + 先… 再…' },
        { target: 'A3: 她希望能进大厂工作。', note: '"hopes to join a top tech firm" — uses 希望 + 能 + V' },
        { target: 'A4: 她准备每天学算法。', note: '"preparing to study algorithms every day" — uses 准备 + 每天 + V' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Listening & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '两个学生聊梦想',
      'liǎng gè xuéshēng liáo mèngxiǎng',
      'A natural peer-register conversation between two Tsinghua undergraduates sharing their future plans. Covers all the patterns from this lesson: modal verbs, 要/准备, 以后 sequencing, plus return-the-question phrases. Casual but considered tone.',
      'conversation',
      'A: 王明，你毕业以后想做什么?\nB: 我打算先考研，再去做程序员。你呢?\nA: 我想去美国留学，以后回国创业。\nB: 创业?太厉害了! 你想做什么方向?\nA: 我希望做教育科技。我觉得中国的教育还可以更好。\nB: 听起来很有意义。我也要努力，希望以后能进大厂。\nA: 加油! 我们都会成功的。\nB: 一起加油!',
      'A natural exchange between peers in casual-polite register; uses 你/你呢 throughout, no 您. The closing 加油 (jiāyóu, "go for it / keep at it") is the standard mutual-encouragement phrase among Chinese students.',
      [
        { target: '毕业以后想做什么? bìyè yǐhòu xiǎng zuò shénme?', note: '"what do you want to do after graduating?" — the standard career-talk opener; uses 想 (light wish) to keep the conversation exploratory' },
        { target: '你呢? nǐ ne?', note: '"and you?" — return-the-question particle; essential in any career conversation to avoid being one-sided' },
        { target: '太厉害了! tài lìhai le!', note: '"so impressive!" — common reaction to a strong career goal; expresses genuine admiration' },
        { target: '听起来很有意义 tīng qǐlái hěn yǒu yìyì', note: '"that sounds very meaningful" — polite compliment to someone else\'s career direction' },
        { target: '加油 jiāyóu', note: 'literal "add oil"; mutual-encouragement phrase used among classmates, friends, and teammates; one of the most distinctively Chinese conversational tokens' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      '正式版 — 老师和学生',
      'zhèngshì bǎn — lǎoshī hé xuéshēng',
      'A more formal version of the dream-sharing conversation — between a Tsinghua career counselor and a student. Notice the register markers: counselor uses 你 (peer-friendly, not 您), but the student\'s vocabulary is more polished (成为一名 + role, 希望能, 一定 + V).',
      'conversation',
      '就业指导老师: 你好，请坐。你叫什么名字?\n学生: 老师您好，我叫莎拉。\n就业指导老师: 莎拉，你毕业以后有什么打算?\n学生: 我希望成为一名软件工程师。我打算先在北京工作几年，再考虑要不要创业。\n就业指导老师: 很好。你为什么选择这个方向?\n学生: 我从小就对计算机感兴趣。我希望以后能做一些对社会有用的项目。\n就业指导老师: 听起来你很清楚自己想要什么。继续努力!\n学生: 谢谢老师，我会的。',
      'Same career topic as the peer version but with more polished interview vocabulary: 成为一名 (become a/an), 有什么打算 (what plans do you have), 对…感兴趣 (interested in), 对社会有用 (useful to society).',
      [
        { target: '老师您好 lǎoshī nín hǎo', note: '"hello, teacher" using formal 您 — the student elevates the register even though the counselor uses 你' },
        { target: '有什么打算? yǒu shénme dǎsuàn?', note: '"what are your plans?" — the standard career-counselor question; uses the noun form of 打算' },
        { target: '希望成为一名… xīwàng chéngwéi yì míng…', note: '"hope to become a/an…" — interview-polished version of 希望当 + role; 一名 is the formal measure word for professionals' },
        { target: '考虑要不要 kǎolǜ yào bù yào', note: '"consider whether to…" — sophisticated way to leave a future decision open' },
        { target: '对…感兴趣 duì… gǎn xìngqù', note: '"interested in…"; the standard pattern for stating an interest area' },
        { target: '对社会有用 duì shèhuì yǒu yòng', note: '"useful to society" — values-language that signals broader purpose; reads well in interviews and personal statements' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '写作模板',
      'xiězuò múbǎn',
      'A reusable six-sentence template for any Mandarin career paragraph. Fill in the bracketed slots with your own information — the structure carries the rest. Uses one verb from each grammar point so the writing demonstrates the whole lesson.',
      'sentence',
      '我叫 [名字]，是清华大学 [系] 的学生。我的梦想是当 [职业]。毕业以后，我打算 [短期计划]。我希望以后能 [长期希望]。我现在准备 [具体准备]。我相信只要努力，梦想一定能实现。',
      'Six sentences cover the core: name + school, dream, post-graduation plan, long-term hope, current preparation, closing belief — the minimum complete career paragraph.',
      [
        { target: '[名字] / [系]', note: 'your name and department/major (e.g., 计算机系 Computer Science, 经济系 Economics, 外文系 Foreign Languages)' },
        { target: '[职业]', note: 'your dream job using 当 + role or 成为一名 + role (软件工程师, 医生, 律师, 设计师)' },
        { target: '[短期计划]', note: 'concrete next step using 打算 + V (找工作 find work, 考研 take the grad exam, 留学 study abroad)' },
        { target: '[长期希望]', note: 'longer-term outcome using 希望 + 能 + V (进大厂 join a top firm, 自己创业 start your own business)' },
        { target: '[具体准备]', note: 'one specific preparation step using 准备 + V or 每天 + V (每天学算法, 准备HSK六级)' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '写作练习',
      'xiězuò liànxí',
      'Write your own 5-6 sentence dream paragraph in Hanzi using the template. Use 想 or 希望 at least once, 打算 or 要 at least once, and one [event]以后 clause so the writing demonstrates all three grammar points of this lesson.',
      'sentence',
      '示例: 我叫金智秀，是清华大学外文系的学生。我的梦想是当一名翻译，把中文小说介绍给世界。毕业以后，我打算先回韩国工作两年。我希望以后能成为中韩文学翻译。我现在每天读一本中文书。只要努力，梦想一定会实现!',
      'Translation: "I\'m Kim Ji-su, a Foreign Languages student at Tsinghua. My dream is to be a translator, introducing Chinese novels to the world. After graduating, I plan to first go back to Korea and work for two years. I hope I can become a Chinese-Korean literary translator later. I now read one Chinese book every day. As long as I work hard, my dream will come true!"',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '内卷',
      'nèijuǎn',
      'Literally "involution" — the over-competition treadmill in modern Chinese education and the tech sector. When everyone in a system competes harder for diminishing returns: longer study hours, more credentials, more overtime — with no real winner. A defining word of post-2020 Chinese youth culture.',
      'sentence',
      '现在的大学生都很内卷。',
      '"Today\'s university students are all over-competing." — a high-frequency observation in Tsinghua-style conversations.',
      [
        { target: '内卷 nèijuǎn', note: 'literally "rolling inward"; the over-competition treadmill' },
        { target: '卷王 juǎnwáng', note: 'literally "involution king"; slang for the over-competitor who studies/works longest' },
        { target: '不卷 bù juǎn', note: '"don\'t over-compete"; the casual refusal to participate' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '躺平',
      'tǎngpíng',
      'Literally "lying flat" — the millennial/Gen-Z counter-culture of opting out of the rat race. Doing the minimum, refusing to chase status or material success, rejecting the 内卷 treadmill. A controversial term — some see it as healthy resistance, others as defeatism.',
      'sentence',
      '我不想内卷，我想躺平。',
      '"I don\'t want to over-compete; I want to lie flat." — a sentence that captures the whole post-2020 generational debate in one breath.',
      [
        { target: '躺平 tǎngpíng', note: 'literally "lying flat"; opt-out / minimum-effort culture' },
        { target: '内卷 vs 躺平', note: 'the two opposite responses to modern Chinese pressure: over-compete or check out entirely' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '大厂 / 公务员 / 创业 / 海归',
      'dàchǎng / gōngwùyuán / chuàngyè / hǎiguī',
      'Four high-status career paths in modern China. 大厂 (top tech firms like 腾讯 Tencent, 阿里 Alibaba, 字节 ByteDance) — high pay, high stress, prestige. 公务员 (civil servant via the brutal 公务员考试 exam) — stability and lifelong tenure. 创业 (start a business) — high risk, high reward, founder narrative. 海归 (returnee from overseas study) — added prestige from foreign credentials.',
      'sentence',
      '清华学生大概有四个选择: 进大厂、考公务员、自己创业、或者出国留学当海归。',
      'A characteristic Tsinghua-undergraduate career-decision summary; these four paths capture most ambitious Chinese students\' post-graduation thinking.',
      [
        { target: '大厂 dàchǎng', note: '"big firm/factory" — colloquial for top tech firms (BAT, ByteDance, Meituan); contrasts with 小公司 (small company)' },
        { target: '公务员考试 gōngwùyuán kǎoshì', note: 'the civil-service entrance exam; one of the most competitive in China — pass rates often below 5%' },
        { target: '创业 chuàngyè', note: '"start a business / entrepreneurship"; cultural resonance after the 2010s tech boom and the 双创 "mass entrepreneurship" policy push' },
        { target: '海归 hǎiguī', note: 'literally "sea-turtle"; phonetic pun on 海外回来 ("returned from overseas"); returnees from foreign study, carries prestige but also debate about real value' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '北漂 / 沪漂',
      'běipiāo / hùpiāo',
      'Young people who "drift" (漂 piāo) to Beijing (北京 → 北漂) or Shanghai (沪 → 沪漂) for career opportunity, often without local registration (户口 hùkǒu) and facing high housing costs. A modern social category — captures both the ambition and the precariousness of post-graduation big-city life.',
      'sentence',
      '很多清华毕业生选择当北漂，因为北京的工作机会最多。',
      '"Many Tsinghua graduates choose to be Beijing-drifters because Beijing has the most job opportunities." — captures the central role of Beijing in Chinese ambition.',
      [
        { target: '北漂 běipiāo', note: '"Beijing drifter"; young migrant worker or graduate without Beijing 户口' },
        { target: '沪漂 hùpiāo', note: 'Shanghai equivalent of 北漂; 沪 is the abbreviated name for Shanghai' },
        { target: '户口 hùkǒu', note: 'household registration; ties social services (healthcare, schooling, retirement) to a specific city — non-local 户口 makes daily life harder' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '清华 — 中国的"MIT"',
      'Qīnghuá — Zhōngguó de "MIT"',
      'Tsinghua University is widely regarded as China\'s top engineering and technology school — often called "China\'s MIT". Founded 1911, located in Beijing. Its computer-science and engineering departments produce many of the country\'s top tech founders, AI researchers, and civil-engineering leaders. Admission requires top scores on the 高考 (national university entrance exam).',
      'sentence',
      '清华大学的工科和计算机专业在中国排名第一。',
      '"Tsinghua University\'s engineering and computer science programs rank #1 in China." — a culturally embedded statement that almost every Chinese person knows.',
      [
        { target: '清华大学 Qīnghuá Dàxué', note: 'full name; located in 北京 Beijing; founded 1911' },
        { target: '高考 gāokǎo', note: 'the national university entrance exam; admission to Tsinghua requires being in the top fraction of a percent in your province' },
        { target: '工科 gōngkē', note: '"engineering disciplines"; Tsinghua\'s historical strength; covers civil, mechanical, electrical, and software engineering' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '任务: 清华就业办的模拟面试',
      'rènwù: Qīnghuá jiùyè bàn de mónǐ miànshì',
      'Roleplay a mock career-office interview with the tutor playing a Tsinghua career counselor. Use every skill from this lesson in one continuous scene — greet, state dream job, sequence post-graduation steps, share one concrete preparation step, and close politely. Aim for 6 turns total.',
      'conversation',
      '[Tsinghua University career office]\n就业指导老师: 你好，请坐。今天我们聊聊你毕业以后的打算。\n你: [打招呼 + 简单自我介绍]\n就业指导老师: 你的梦想是什么? 想做什么职业?\n你: [梦想 + 当/做/成为 + 职业]\n就业指导老师: 听起来不错。那你毕业以后具体打算怎么走?\n你: [打算 + 先… 再…, with [event]以后]\n就业指导老师: 你现在为这个目标准备什么呢?\n你: [准备 + V, with 每天 / 每周]\n就业指导老师: 很好，你很清楚自己想要什么。继续努力!\n你: [告别 + 谢谢]',
      'Six turns of fluent exchange; the tutor will prompt you and respond naturally to whatever you say. The counselor uses casual-polite peer 你 throughout, matching real Tsinghua career-office tone.',
      [
        { target: '打招呼 + 简单自我介绍', note: '老师您好 + 我叫…，是…系的学生 — opening register can elevate to 您 since the counselor is staff' },
        { target: '梦想 + 当/做/成为 + 职业', note: '我的梦想是当… / 我希望成为一名… — pick the verb that matches your commitment level' },
        { target: '打算 + 先… 再…', note: '我打算先…，再… — concrete two-step plan using the 先… 再… sequencer' },
        { target: '[event]以后 + main', note: '毕业以后 / 工作几年以后 — the [event]以后 + main clause word order' },
        { target: '准备 + V (specific)', note: '我现在准备每天学算法 / 我准备考HSK六级 — one concrete, measurable preparation step' },
        { target: '告别 + 谢谢', note: '谢谢老师 / 谢谢您 — close politely, optionally with 我会努力的 ("I will work hard")' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战 — 当老师问"为什么?"',
      'tiǎozhàn — dāng lǎoshī wèn "wèishénme?"',
      'Stretch goal: in the same interview, the career counselor asks WHY you want this career. Answer using 因为 (because) + a personal-experience or values reason. Adding a "why" turns a list of plans into a credible story.',
      'conversation',
      '就业指导老师: 你为什么想当软件工程师?\n你: 因为我从小就喜欢电脑。我觉得软件可以改变世界，让生活更方便。我希望以后能做一些真正有用的产品。\n就业指导老师: 很好的理由。',
      'A strong "why" answer combines a personal-origin story (从小就喜欢) with a values statement (改变世界 / 让生活更方便) and a forward-looking aspiration (希望以后能…). This three-part structure is the gold standard for Chinese interview answers.',
      [
        { target: '因为 yīnwèi', note: '"because"; the standard reason-giver — can appear at the start or in the middle of the sentence' },
        { target: '从小就… cóngxiǎo jiù…', note: '"ever since I was little…"; opens a personal-origin story; signals authentic interest, not a recent decision' },
        { target: '改变世界 gǎibiàn shìjiè', note: 'literally "change the world"; a high-aspiration phrase common in tech and engineering interviews' },
        { target: '让生活更方便 ràng shēnghuó gèng fāngbiàn', note: '"make life more convenient"; a values phrase that resonates in consumer-tech and product contexts' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
