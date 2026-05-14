// Level 2 (Adult) Unit 11 — 找工作与面试 (Job Hunting & Interviews) — Mandarin Chinese
// Functions: discussing the Chinese tech-sector job search, talking about
// résumés and recruitment platforms, handling an interview at a Beijing tech
// company, emphasizing past actions with 是…的, listing strengths with 既…又…
// and accomplishments with 不但…而且…, asking about probation / salary, and
// closing the interview politely.
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
  orientation: 'zh-l2au11-orientation',
  pronunciation: 'zh-l2au11-pronunciation',
  vocabularySearch: 'zh-l2au11-vocab-search',
  vocabularyInterview: 'zh-l2au11-vocab-interview',
  vocabularyPlatforms: 'zh-l2au11-vocab-platforms',
  grammarShiDe: 'zh-l2au11-grammar-shi-de',
  grammarBothAnd: 'zh-l2au11-grammar-both-and',
  grammarNotOnly: 'zh-l2au11-grammar-not-only',
  reading: 'zh-l2au11-reading',
  listening: 'zh-l2au11-listening',
  writing: 'zh-l2au11-writing',
  culture: 'zh-l2au11-culture',
  task: 'zh-l2au11-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Talk about a Chinese tech-sector job search end-to-end: identifying openings, sending résumés on platforms like BOSS直聘, taking the 笔试 (written test), and going through 面试 (interview) rounds.',
      'Use 是…的 to emphasize when, where, or how something in your career happened — the construction every Chinese interviewer expects in self-introductions.',
      'Sell strengths with 既…又… and list accomplishments with 不但…而且… — the two parallel-structure patterns that make Chinese interview answers sound polished rather than translated.',
      'Negotiate the soft topics: 试用期 (probation), 期望薪资 (expected salary), 转正 (becoming full-time), 涨工资 (raises), and the 996 question — without losing face.',
    ],
    task: 'Picture yourself walking into the lobby of a Beijing tech company you applied to through BOSS直聘 — the HR partner greets you and the technical lead is already in the room. By the end of this lesson you can handle the whole interview in Mandarin without rehearsing each line.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps for job-hunt vocabulary',
    goals: [
      'Pronounce the four high-frequency job-hunt words 求职 (qiúzhí), 简历 (jiǎnlì), 录用 (lùyòng), and 跳槽 (tiàocáo) cleanly — each one hides a common learner mistake.',
      'Apply tone sandhi correctly inside multi-syllable interview phrases: 你好 → ní hǎo, 我想 (third + third) → wǒ xiǎng, 不是 (4th before 4th) → búshì.',
      'Distinguish the retroflex (zh/ch/sh/r) initials in 招聘 (zhāopìn) and 试用期 (shìyòngqī) from the dental (z/c/s) initials in 自我介绍 (zìwǒ jièshào) — these come up in nearly every interview turn.',
    ],
    task: 'Read each phrase aloud, mark every sandhi shift, and identify the retroflex vs dental contrast where it appears.',
  },
  {
    id: ACT.vocabularySearch,
    section: 'Vocabulary I',
    title: 'The job-search vocabulary set',
    goals: [
      'Use the 15 core job-search verbs and nouns — 求职, 招聘, 应聘, 简历, 投简历, 面试, 笔试, 录用, 入职, 试用期, 转正, 离职, 跳槽, 涨工资, 升职 — in their natural collocations.',
      'Distinguish near-synonyms that look interchangeable but signal different speaker perspectives: 招聘 (recruiter side) vs 应聘 (applicant side), 录用 vs 入职, 离职 vs 跳槽.',
    ],
    task: 'For each of the 15 words, say one short sentence aloud that uses it in a natural workplace context.',
  },
  {
    id: ACT.vocabularyInterview,
    section: 'Vocabulary II',
    title: 'Interview phrases the HR side expects',
    goals: [
      'Deploy the formulaic interview phrases — 自我介绍, 优点, 缺点, 期望薪资, 你为什么想加入我们? — in the order Chinese HR typically asks them.',
      'Build a 30-second 自我介绍 (self-introduction) that sounds Chinese, not translated: leading with 您好, stating 姓名 + 学校 + 专业 + 经验, and closing with a sentence of motivation.',
    ],
    task: 'Prepare a 30-second 自我介绍 in Mandarin covering name, school (清华大学), major, two facts of experience, and one sentence of why this company — then deliver it aloud once without notes.',
  },
  {
    id: ACT.vocabularyPlatforms,
    section: 'Vocabulary III',
    title: 'Chinese job platforms and tech-sector hiring channels',
    goals: [
      'Recognize the major Chinese job platforms — BOSS直聘, 智联招聘, 拉勾网, 脉脉 — and know which one to use for which kind of role (tech, general, startup, professional networking).',
      'Understand the chat-first model of BOSS直聘 (you can message hiring managers directly without applying through an HR funnel) and how it changes job-seeker behavior in China.',
    ],
    task: 'For each of the four platforms, name the role type it specializes in and the kind of company that typically recruits there.',
  },
  {
    id: ACT.grammarShiDe,
    section: 'Grammar I',
    title: '是…的 — emphatic construction for past circumstances',
    goals: [
      'Use 是…的 to spotlight WHEN, WHERE, HOW, or WITH WHOM a past action happened — the framing 是去年毕业的 (graduated last year) is everywhere in interviews.',
      'Know when 是…的 is required vs optional: when the action is already known and the interviewer is asking about its circumstances (when/where/how), 是…的 is the natural answer; for general past events 了 is enough.',
      'Place 是 directly before the emphasized element and 的 at the end of the clause; both bookends must be present.',
    ],
    task: 'Write three answers to interview questions about your past — when you graduated, where you worked, how you learned Chinese — each using 是…的.',
  },
  {
    id: ACT.grammarBothAnd,
    section: 'Grammar II',
    title: '既…又… — both X and Y (selling your strengths)',
    goals: [
      'Use 既…又… to pair two complementary qualities in one sentence — the construction interviewers reward when you talk about 优点 (strengths).',
      'Distinguish 既…又… (slightly formal, written-leaning, often paired with adjectives) from the more colloquial 又…又… — same meaning but 既…又… signals deliberateness.',
      'Place 既 and 又 each before an adjective or short verb phrase; the two halves must be grammatically parallel.',
    ],
    task: 'Write three sentences about yourself using 既…又…, each pairing two relevant interview strengths (e.g., 既细心又有责任心).',
  },
  {
    id: ACT.grammarNotOnly,
    section: 'Grammar III',
    title: '不但…而且… — not only X but also Y (listing accomplishments)',
    goals: [
      'Use 不但…而且… to chain two facts where the second adds force to the first — the standard pattern for listing accomplishments on a résumé read-out.',
      'Distinguish 不但…而且… (slightly stronger and more formal) from the very common 不仅…而且… (semantically nearly identical but a touch softer); both work in interviews, with 不但…而且… reading slightly more written.',
      'Optionally add 还 in the second half (不但…而且还…) for extra emphasis — common in spoken Chinese.',
    ],
    task: 'Write two sentences about your career using 不但…而且…, each chaining one achievement and a stronger second one (e.g., 不但完成了项目，而且提前一个月交付).',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'Read a BOSS直聘 job posting',
    goals: [
      'Read a realistic Beijing tech-sector job posting and extract role, requirements, salary range, and 福利 (benefits).',
      'Apply the 是…的 and 既…又… patterns to talk about the posting aloud — when the role opened, what kind of candidate the company wants, what makes the offer attractive.',
    ],
    task: 'Read the posting aloud once, then answer four comprehension questions in complete short Mandarin sentences.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'A first-round tech interview',
    goals: [
      'Follow a 7-turn mock interview between an HR partner / tech lead and a candidate for a Beijing tech role — every turn uses at least one of the lesson grammar points.',
      'Reproduce the conversation with your own background, switching from candidate-perspective verbs (应聘, 投简历) to scenario-appropriate replies.',
    ],
    task: 'Read the dialogue aloud with the tutor playing the interviewer, then perform it again with your own school, major, and experience swapped in.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Write a one-paragraph cover note for BOSS直聘',
    goals: [
      'Write a 5–6 sentence opening message of the kind candidates send when initiating contact with a hiring manager on BOSS直聘 — concise, polite, and immediately states your fit.',
      'Use 是…的 to specify when/where for at least one past fact, 既…又… or 不但…而且… for at least one self-pitch sentence, and close with a polite next-step request.',
    ],
    task: 'Write your own BOSS直聘 opening message in 5–6 sentences using the model on the left, then read it aloud with correct tones.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: 'Spring recruitment, 公务员 dreams, and the 996 question',
    goals: [
      'Know the Chinese hiring calendar: 春招 (spring recruitment, Feb–May) and 秋招 (autumn recruitment, Sep–Nov), plus the dedicated 应届毕业生 (fresh graduate) channel that opens for ~1 year after graduation.',
      'Understand the prestige hierarchy 国企 vs 私企 vs 外企 vs 创业 (state-owned vs private vs foreign-invested vs startup) and what each one promises in stability, salary, and growth.',
      'Recognize the 996 working hours debate (9 AM–9 PM, 6 days/week) and how candidates handle the inevitable "are you OK with overtime?" question without burning bridges.',
      'Know that the 公务员考试 (civil service exam) is the parallel "stable job" route many graduates pursue alongside corporate applications.',
    ],
    task: 'List the four hiring channels (春招 / 秋招 / 应届 / 公务员), and explain in one Mandarin sentence how a candidate might politely respond if asked about willingness to do 996.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'Mock interview — Beijing tech company',
    goals: [
      'Combine 自我介绍, the 是…的 emphatic pattern, 既…又… or 不但…而且… for strengths, and a salary/probation discussion into one continuous 6–8 turn interview.',
      'Maintain professional register throughout (use 您 with the interviewer, 我 for yourself, keep tone calm and confident), and close politely with a thank-you and a next-step question.',
    ],
    task: 'Roleplay a first-round interview at a Beijing tech company with the tutor playing the HR partner; aim for an 8-turn exchange covering self-intro, motivation, strengths, probation/salary, and farewell.',
  },
];

const lesson = {
  title: 'Level 2 (Adult) · Unit 11: 找工作与面试 — Job Hunting and Interviews',
  category: 'career',
  difficulty: 'intermediate',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'stating-job-intent-zh', label: 'Stating job-hunt intent', goal: 'Tell someone you are 求职 / 应聘 and use 投简历 + a target company in one short sentence.' },
    { id: 'interview-self-intro-zh', label: '30-second 自我介绍', goal: 'Deliver a 30-second self-introduction with 姓名 + 学校 + 专业 + 经验 + motivation — at least one 是…的 emphatic clause.' },
    { id: 'selling-strengths-zh', label: 'Selling strengths', goal: 'Pair two relevant qualities using 既…又… in a single fluent sentence appropriate for the 优点 question.' },
    { id: 'asking-conditions-zh', label: 'Asking about probation and salary', goal: 'Politely ask about 试用期, 期望薪资, and 涨工资 without sounding demanding.' },
    { id: 'closing-interview-zh', label: 'Closing an interview', goal: 'Thank the interviewer, ask one polite next-step question, and exit with 再见 / 期待您的回复.' },
  ],
  relatedPools: ['topic-society', 'topic-people'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '本课目标',
      'běn kè mùbiāo',
      'By the end of this lesson you can talk through a Chinese tech-sector job search — finding listings, sending résumés on BOSS直聘, doing the 笔试 and 面试, and asking about probation and salary — in fluent professional Mandarin.',
      'word',
      'Functions: 求职 qiúzhí (job search) · 投简历 tóu jiǎnlì (send résumé) · 面试 miànshì (interview) · 谈薪资 tán xīnzī (negotiate salary) · 入职 rùzhí (onboard)',
      'These five micro-skills form the spine of every Chinese white-collar job hunt — once they are automatic, you can apply to a Beijing tech role end-to-end in Mandarin.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      '真实场景',
      'zhēnshí chǎngjǐng',
      'You are in the Beijing office of a tech company you applied to last week through BOSS直聘. The HR partner greets you at the lobby and walks you to a small meeting room where the technical lead is already waiting with your résumé open on her laptop.',
      'word',
      'HR: "您好，欢迎来面试。先请您做个自我介绍吧。"',
      'A typical opener from a Beijing HR partner: polite 您好 + 欢迎 + immediate request for 自我介绍 — the universal first turn of a Chinese first-round interview.',
      [
        { target: '您好 nín hǎo', note: 'formal greeting using the honorific 您; the only safe choice with an interviewer regardless of their age' },
        { target: '欢迎来面试 huānyíng lái miànshì', note: 'standard welcoming line; the verb 来 (lái) here means "come [for the purpose of]"' },
        { target: '请您做个自我介绍 qǐng nín zuò gè zìwǒ jièshào', note: 'standard request for a self-introduction; 做个 (zuò gè) literally "do a", a softening pattern that makes the request feel conversational' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '面试三大支柱',
      'miànshì sān dà zhīzhù',
      'A Chinese tech interview rests on three pillars: 自我介绍 (a tight 30-second self-introduction), 为什么加入 (a one-sentence motivation specific to this company), and 优点缺点 (one or two strengths phrased with 既…又…, and one believable weakness phrased as a growth area). Master these three and you can survive any first round.',
      'word',
      'Pillar 1: 自我介绍 zìwǒ jièshào — name, school, major, experience, motivation in ~30 sec\nPillar 2: 为什么加入 wèi shénme jiārù — one specific reason this company, not generic praise\nPillar 3: 优点缺点 yōudiǎn quēdiǎn — strengths in 既…又…, weakness framed as growth',
      'Interviewers expect these three blocks in roughly this order; deviating signals nerves or unfamiliarity with Chinese hiring norms.',
      null,
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '求职',
      'qiúzhí',
      'Job-seeking. The first syllable 求 starts with the palatal initial q (alveolo-palatal aspirated affricate, NOT English /kw/) plus the iou final spelled iu. The second 职 starts with the retroflex zh and uses the r-colored i — tricky for English speakers because the same letter sounds totally different than in 七 (qī).',
      'word',
      '我最近在求职。Wǒ zuìjìn zài qiúzhí. — "I am job-hunting recently."',
      'The most common learner mistake: pronouncing 求 like English "queue" or 职 with a clear /i/ instead of the retroflex r-colored vowel.',
      [
        { target: '求 qiú', note: 'palatal q + iou final (rising tone); never sounds like English q /kw/' },
        { target: '职 zhí', note: 'retroflex zh + r-colored i (rising tone); the tongue is curled back, not flat' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '简历',
      'jiǎnlì',
      'Résumé. Two third tones in a row in the underlying form would trigger sandhi (jiǎn → jián), but in fast speech this two-syllable compound is often pronounced as 2nd + 4th rather than the textbook 3rd + 4th — listen for it. The first 简 carries 简 (simple) + 历 (history) = "a simplified history of you".',
      'word',
      '我已经把简历发给您了。Wǒ yǐjīng bǎ jiǎnlì fā gěi nín le. — "I have already sent you the résumé."',
      'The 把 construction (bǎ jiǎnlì fā) is the natural way to talk about doing something to a definite object like "the résumé".',
      [
        { target: '简 jiǎn', note: 'third tone in isolation, full dip-and-rise; in 简历 it often shifts to second tone in fluent speech' },
        { target: '历 lì', note: 'fourth tone, sharp fall; cognate with 历史 (lìshǐ, "history")' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '录用',
      'lùyòng',
      'To hire / to take on as employee. Both syllables are fourth tone, giving a sharp-fall-sharp-fall rhythm — clip both tones cleanly, do not let either soften. The first 录 starts with l (alveolar lateral, identical to English l) plus the u final; the second 用 is yong (the j-glide + ong final).',
      'word',
      '公司决定录用您。Gōngsī juédìng lùyòng nín. — "The company has decided to hire you."',
      'The phrase HR uses when they make the offer — different from 入职 (rùzhí, "to start the job") which the candidate does later.',
      [
        { target: '录 lù', note: 'fourth tone; do not soften — the sharp fall is what distinguishes it from 路 (lù, road) only by context' },
        { target: '用 yòng', note: 'fourth tone, j-glide + ong final; the y is just a spelling convention for the j-glide before o' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '跳槽',
      'tiàocáo',
      'To switch jobs (literally "jump trough" — the metaphor is a horse jumping from one feeding trough to another). Fourth tone + second tone gives a sharp fall followed by a rise. The verb is slightly informal but extremely common in tech-sector small talk.',
      'word',
      '他去年跳槽到了字节跳动。Tā qùnián tiàocáo dào le Zìjié Tiàodòng. — "He switched jobs to ByteDance last year."',
      'Notice the metaphorical 跳 (jump) in both 跳槽 and 字节跳动 (ByteDance) — Chinese loves verbs of motion in business names.',
      [
        { target: '跳 tiào', note: 'fourth tone, sharp fall; verb of motion meaning "jump"' },
        { target: '槽 cáo', note: 'second tone, rising; literally "trough" — the original metaphor is a livestock image' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '招聘',
      'zhāopìn',
      'To recruit / recruitment. Retroflex zh + first tone, then bilabial aspirated p + fourth tone. Pair it with 应聘 (yìngpìn, "to apply"): same 聘 ending, opposite agent — 招 is the company side, 应 is the candidate side. Knowing which one to use signals fluent business Mandarin.',
      'word',
      '我们公司正在招聘工程师。Wǒmen gōngsī zhèngzài zhāopìn gōngchéngshī. — "Our company is recruiting engineers."',
      'Switching the verb to 应聘 would shift the speaker to the candidate side: 我想应聘工程师 (I want to apply for the engineer position).',
      [
        { target: '招 zhāo', note: 'retroflex zh + first tone (high level); means "to summon / to call in"' },
        { target: '聘 pìn', note: 'aspirated p + fourth tone (sharp fall); means "to invite / to engage"' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Job-search verbs and nouns
    // ────────────────────────────────────────────────────────────────────
    createContentItem('求职', 'qiúzhí', 'The general activity of job-hunting — searching, applying, interviewing, all rolled into one verb-noun. Slightly more formal than 找工作 (zhǎo gōngzuò), which is the everyday spoken equivalent. Use 求职 in cover letters and on platforms; use 找工作 with friends.', 'word', '我最近在求职，想换一个行业。Wǒ zuìjìn zài qiúzhí, xiǎng huàn yí ge hángyè.', '"I am job-hunting recently and want to change industries" — typical opening sentence on a job-search platform profile.', null, [ACT.vocabularySearch]),
    createContentItem('招聘', 'zhāopìn', 'To recruit (from the COMPANY side). The verb HR teams and hiring managers use. Pair with 启事 (qǐshì) to form 招聘启事 "job posting", or with 会 (huì) to form 招聘会 "job fair". Never used by candidates about themselves — that switch matters.', 'word', '我们正在招聘后端工程师。Wǒmen zhèngzài zhāopìn hòuduān gōngchéngshī.', '"We are recruiting backend engineers" — standard recruiter-side announcement; 后端 (hòuduān) means "backend".', null, [ACT.vocabularySearch]),
    createContentItem('应聘', 'yìngpìn', 'To apply for a position (from the CANDIDATE side). The natural verb in your own self-introduction: 我来应聘后端工程师的职位 ("I am applying for the backend engineer position"). Pairs with 应聘者 (yìngpìnzhě, "applicant"). The pair 招聘 / 应聘 is one of the most useful pairs in business Mandarin.', 'word', '我想应聘贵公司的产品经理职位。Wǒ xiǎng yìngpìn guì gōngsī de chǎnpǐn jīnglǐ zhíwèi.', '"I would like to apply for your company\'s Product Manager position" — 贵公司 (guì gōngsī, "your honored company") is the polite term for the company you are interviewing with.', null, [ACT.vocabularySearch]),
    createContentItem('简历', 'jiǎnlì', 'Résumé / CV. The single most important physical document in a Chinese job hunt. Variants: 中文简历 (Chinese-language résumé), 英文简历 (English-language résumé) — applying to a Chinese tech company in Beijing, you submit a 中文简历 first and an 英文简历 only if asked. Maximum length is one page even for senior candidates.', 'word', '我把简历发到您的邮箱了。Wǒ bǎ jiǎnlì fā dào nín de yóuxiāng le.', '"I have sent the résumé to your email" — standard follow-up sentence after an initial chat on BOSS直聘.', null, [ACT.vocabularySearch]),
    createContentItem('投简历', 'tóu jiǎnlì', 'To send / submit a résumé (literally "throw a résumé"). The verb 投 captures the slightly mass-action feel of modern job-hunting — candidates often 投 dozens of résumés on platforms. Compare 海投 (hǎi tóu, "sea-submitting" = mass-applying everywhere) — a slightly self-deprecating term graduates use about their own job search.', 'word', '我上周投了二十份简历。Wǒ shàngzhōu tóu le èrshí fèn jiǎnlì.', '"I submitted twenty résumés last week" — measure word 份 (fèn) is the standard counter for documents like résumés and contracts.', null, [ACT.vocabularySearch]),
    createContentItem('面试', 'miànshì', 'Interview (literally "face-to-face test"). Used as both noun and verb: 面试 X (to interview X) and 去面试 (go to an interview). Modern variants include 视频面试 (video interview), 电话面试 (phone interview), and 群面 (qún miàn, "group interview") — common in big-company campus recruitment.', 'word', '我下周一去字节跳动面试。Wǒ xià zhōuyī qù Zìjié Tiàodòng miànshì.', '"I am going to ByteDance for an interview next Monday" — common spoken pattern combining time + company + 面试.', null, [ACT.vocabularySearch]),
    createContentItem('笔试', 'bǐshì', 'Written test — a coding or aptitude test administered before or alongside the in-person interview, very common in Chinese tech and government recruitment. Companies like Tencent, Alibaba, and ByteDance run online 笔试 rounds with hundreds of candidates per cycle; passing this is the gate to 面试.', 'word', '笔试通过了才能进入面试。Bǐshì tōngguò le cái néng jìnrù miànshì.', '"You can only proceed to the interview after passing the written test" — uses the 只有…才… ("only after…") implicit pattern.', null, [ACT.vocabularySearch]),
    createContentItem('录用', 'lùyòng', 'To hire / take on as employee — the verb HR uses when they make the offer. 录用通知 (lùyòng tōngzhī) = "offer notification". Slightly more formal than the everyday 录取 (lùqǔ) which is used for both jobs and university admissions. 录用 specifically signals the employment offer.', 'word', '我们决定录用您，请查收录用通知。Wǒmen juédìng lùyòng nín, qǐng cháshōu lùyòng tōngzhī.', '"We have decided to hire you, please check for the offer notification" — exact phrasing of an offer email opener.', null, [ACT.vocabularySearch]),
    createContentItem('入职', 'rùzhí', 'To officially start a job / onboard (literally "enter the position"). The verb for the candidate\'s first day. 入职手续 (rùzhí shǒuxù) = "onboarding procedures" — the paperwork, badge, equipment setup. Different from 录用: 录用 is the offer; 入职 is the actual start.', 'word', '我下个月一号入职。Wǒ xià ge yuè yī hào rùzhí.', '"I start on the first of next month" — standard reply to "when can you join us?"', null, [ACT.vocabularySearch]),
    createContentItem('试用期', 'shìyòngqī', 'Probation period — in Chinese tech, typically 3 to 6 months during which the company can terminate with less notice and the employee\'s salary may be 80% of the final agreed amount. Asking about 试用期 length and salary during the interview is normal and expected, not pushy.', 'word', '我们的试用期是三个月。Wǒmen de shìyòngqī shì sān ge yuè.', '"Our probation period is three months" — common HR reply; the legal maximum under Chinese labor law is six months.', null, [ACT.vocabularySearch]),
    createContentItem('转正', 'zhuǎnzhèng', 'To become a full / regular employee after passing probation (literally "turn formal"). The verb captures a meaningful career milestone in China: 转正 means full benefits, full salary, and harder-to-fire status. Common phrase: 转正后 (zhuǎnzhèng hòu, "after becoming full-time") used when discussing future salary.', 'word', '转正后工资会涨到一万五。Zhuǎnzhèng hòu gōngzī huì zhǎng dào yī wàn wǔ.', '"After becoming full-time, the salary will rise to 15,000" — typical conditional offer phrasing.', null, [ACT.vocabularySearch]),
    createContentItem('离职', 'lízhí', 'To resign / leave a job (formal). The standard verb on official paperwork like 离职证明 (lízhí zhèngmíng, "proof of resignation"). Neutral in tone — does NOT imply firing or quitting in anger; it just marks the end of employment. Compare 辞职 (cízhí), which more strongly emphasizes the employee\'s own decision.', 'word', '我上个月从前公司离职了。Wǒ shàng ge yuè cóng qián gōngsī lízhí le.', '"I left my previous company last month" — natural way to describe a recent job transition without revealing the reason.', null, [ACT.vocabularySearch]),
    createContentItem('跳槽', 'tiàocáo', 'To switch jobs (informal). Captures the move from one company to a better one — implies upward mobility, not just leaving. Frequently used in tech-sector small talk: 他又跳槽了 ("he switched jobs again") about a colleague who job-hops. Slightly informal; do not use about yourself in a job interview — use 换工作 or 离职 there.', 'word', '现在互联网行业跳槽很常见。Xiànzài hùliánwǎng hángyè tiàocáo hěn chángjiàn.', '"Job-hopping is very common in the internet industry now" — typical industry observation; 互联网 (hùliánwǎng) = "internet (industry)".', null, [ACT.vocabularySearch]),
    createContentItem('涨工资', 'zhǎng gōngzī', 'To get a raise (literally "salary rises"). 涨 is intransitive — the subject is the salary, not the employee. To say "the company gave me a raise", use 公司给我涨了工资. Different from 升职 (promotion); 涨工资 is purely about money, 升职 is about title and responsibility (the two often go together but not always).', 'word', '我去年涨了一次工资。Wǒ qùnián zhǎng le yí cì gōngzī.', '"I got one raise last year" — measure word 次 (cì, "time/instance") counts the events.', null, [ACT.vocabularySearch]),
    createContentItem('升职', 'shēngzhí', 'Promotion to a higher position / title. Different from 涨工资 (raise in money): 升职 changes your role and responsibility scope, 涨工资 changes only the salary. The two are usually paired (升职加薪 "promotion plus raise") but Chinese companies sometimes grant one without the other, so the distinction matters in salary negotiations.', 'word', '希望两年内能升职到经理。Xīwàng liǎng nián nèi néng shēngzhí dào jīnglǐ.', '"I hope to get promoted to manager within two years" — common answer to the "career plan" interview question.', null, [ACT.vocabularySearch]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: Interview phrases
    // ────────────────────────────────────────────────────────────────────
    createContentItem('自我介绍', 'zìwǒ jièshào', 'Self-introduction — the canonical first turn of any Chinese interview. A good 自我介绍 lasts 30–60 seconds and covers: 姓名 (name), 学校 + 专业 (school + major), 工作经验 (work experience), and 应聘动机 (motivation for this role). Memorize yours and deliver without hesitation; nerves at the very first turn make a bad first impression.', 'word', '请您先做一个自我介绍。Qǐng nín xiān zuò yí ge zìwǒ jièshào.', '"Please do a self-introduction first" — the universal interviewer-opener; 做一个 ("do a") is the natural verb collocation.', null, [ACT.vocabularyInterview]),
    createContentItem('优点', 'yōudiǎn', 'Strength / merit / advantage (literally "excellent point"). The interview question 你的优点是什么? ("What are your strengths?") is universal. Good answers list two specific, job-relevant qualities, ideally paired with 既…又…; bad answers list three generic adjectives with no context. Avoid 优秀 (yōuxiù, "outstanding") about yourself — too immodest.', 'word', '我的优点是既细心又有责任心。Wǒ de yōudiǎn shì jì xìxīn yòu yǒu zérèn xīn.', '"My strengths are being both careful/detail-oriented and having a sense of responsibility" — a polished 既…又… answer.', null, [ACT.vocabularyInterview]),
    createContentItem('缺点', 'quēdiǎn', 'Weakness / shortcoming (literally "missing point"). The standard follow-up to the strength question: 你的缺点是什么?. Chinese interview convention: admit one believable weakness (not 完美主义 "perfectionism" — too cliché) and immediately add what you are doing about it. Refusing to name a weakness reads as evasive.', 'word', '我的缺点是有时候太追求完美，最近我在学习放手。Wǒ de quēdiǎn shì yǒu shíhou tài zhuīqiú wánměi, zuìjìn wǒ zài xuéxí fàngshǒu.', '"My weakness is that I sometimes pursue perfection too much; recently I have been learning to let go" — formula: weakness + present-progressive remedy.', null, [ACT.vocabularyInterview]),
    createContentItem('期望薪资', 'qīwàng xīnzī', 'Expected salary. The interview question 你的期望薪资是多少? requires a number, not a deflection. Best practice: state a range (e.g., "15K–20K monthly") and add 可以根据具体岗位调整 ("adjustable based on the specific position"). Lowballing yourself is read as low confidence; aiming too high without justification ends the interview.', 'word', '我的期望薪资是月薪一万五到两万。Wǒ de qīwàng xīnzī shì yuèxīn yī wàn wǔ dào liǎng wàn.', '"My expected salary is a monthly wage of 15,000 to 20,000" — the standard range-format answer; 月薪 (yuèxīn) = "monthly salary".', null, [ACT.vocabularyInterview]),
    createContentItem('你为什么想加入我们?', 'Nǐ wèi shénme xiǎng jiārù wǒmen?', '"Why do you want to join us?" — the universal motivation question, asked roughly halfway through every Chinese first-round interview. The bad answer is generic ("贵公司很有名" — "your company is famous"); the good answer is specific (a product you used, a team you researched, an industry trend the company is on).', 'sentence', '面试官: 你为什么想加入我们?\n候选人: 因为我一直关注贵公司的AI产品，特别是…\nMiànshìguān: Nǐ wèi shénme xiǎng jiārù wǒmen?\nHòuxuǎnrén: Yīnwèi wǒ yìzhí guānzhù guì gōngsī de AI chǎnpǐn, tèbié shì…', '"Interviewer: Why do you want to join us? — Candidate: Because I have been following your company\'s AI products, especially…" — opening pattern of a strong answer.', [
      { target: '为什么 wèi shénme', note: 'standard "why" question word; placed before the verb' },
      { target: '加入 jiārù', note: '"to join"; preferred over the more generic 来 (lái) in interviews' },
      { target: '我们 wǒmen', note: 'the interviewer says "us" inclusively about the company — candidate echoes back with 贵公司 (your honored company)' },
    ], [ACT.vocabularyInterview]),
    createContentItem('职业规划', 'zhíyè guīhuà', 'Career plan / career planning. The interview question 你的三到五年职业规划是什么? ("What is your 3- to 5-year career plan?") is a Chinese hiring staple. Strong answers tie growth at THIS company to specific milestones (e.g., 转正 within 6 months, 升职 within 2 years, specific skill acquisition within 3 years). Vague answers signal a job-hopping candidate.', 'word', '我的职业规划是先在贵公司学习两年，然后承担更大的项目。Wǒ de zhíyè guīhuà shì xiān zài guì gōngsī xuéxí liǎng nián, ránhòu chéngdān gèng dà de xiàngmù.', '"My career plan is to first learn at your company for two years, then take on bigger projects" — uses the 先…然后… ("first… then…") sequencing pattern.', null, [ACT.vocabularyInterview]),
    createContentItem('您贵姓?', 'Nín guì xìng?', '"What is your honored surname?" — the formal way to ask someone\'s last name, used at the start of an interview if you don\'t already know it. Reply pattern: 我姓 X. Using plain 你叫什么名字? ("What\'s your name?") with an interviewer would sound too casual; 您贵姓 is the safe formal alternative.', 'word', '候选人: 您贵姓?\n面试官: 我姓王，叫我王经理就行。Hòuxuǎnrén: Nín guì xìng? Miànshìguān: Wǒ xìng Wáng, jiào wǒ Wáng jīnglǐ jiù xíng.', '"Candidate: What\'s your surname? — Interviewer: I\'m Wang, just call me Manager Wang" — typical exchange when the candidate doesn\'t know the interviewer\'s name.', null, [ACT.vocabularyInterview]),
    createContentItem('麻烦您了', 'máfan nín le', '"Sorry to bother you / thank you for your trouble" — a polite closing line after the interviewer has done you a favor (answered your questions, arranged the schedule, sent paperwork). Slightly softer and warmer than 谢谢; signals genuine gratitude rather than transactional thanks. Use at the very end of the interview.', 'word', '感谢您今天的时间，麻烦您了。Gǎnxiè nín jīntiān de shíjiān, máfan nín le.', '"Thank you for your time today, sorry to trouble you" — the classic two-part interview closer.', null, [ACT.vocabularyInterview]),
    createContentItem('期待您的回复', 'qīdài nín de huífù', '"I look forward to your reply" — the standard polite closing on a written job application or a post-interview thank-you note. Conveys patience and respect without sounding desperate. Different from English "Looking forward to hearing back" — 期待 (qīdài) carries a slightly more deliberate, formal weight.', 'word', '感谢您的时间，期待您的回复。Gǎnxiè nín de shíjiān, qīdài nín de huífù.', '"Thank you for your time, I look forward to your reply" — a complete one-line follow-up message after an interview.', null, [ACT.vocabularyInterview]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Vocabulary III: Job platforms
    // ────────────────────────────────────────────────────────────────────
    createContentItem('BOSS直聘', 'BOSS Zhípìn', 'The dominant Chinese tech-hiring platform, launched in 2014. Distinctive feature: 直聘 (zhípìn, "direct hiring") — candidates chat directly with hiring managers in-app, bypassing the HR funnel. The chat-first model means a polite, specific opening message is critical; cold templated messages get ignored. Strong choice for tech roles, mid-sized companies, and startups.', 'word', '我在BOSS直聘上联系了字节跳动的HR。Wǒ zài BOSS Zhípìn shàng liánxì le Zìjié Tiàodòng de HR.', '"I contacted ByteDance\'s HR on BOSS Zhipin" — standard self-report of how you reached out; "HR" is used as an English loan in spoken Mandarin.', null, [ACT.vocabularyPlatforms]),
    createContentItem('智联招聘', 'Zhìlián Zhāopìn', 'One of the oldest Chinese job platforms (founded 1997, predates BOSS直聘 by 17 years). Stronger for traditional industries, sales, finance, and middle-management roles than for tech. The interface follows the older "apply through HR" model — candidates submit résumés, recruiters review and contact. Considered more conservative and stable than BOSS直聘.', 'word', '我妈让我去智联招聘看看。Wǒ mā ràng wǒ qù Zhìlián Zhāopìn kànkan.', '"My mom told me to check out Zhilian Zhaopin" — common throwaway line capturing the platform\'s slightly old-school reputation.', null, [ACT.vocabularyPlatforms]),
    createContentItem('拉勾网', 'Lāgōu Wǎng', 'A tech-focused job platform launched in 2013, specializing in internet, software, and product roles. Less general-purpose than BOSS直聘 but with a denser concentration of internet-industry openings. Salary ranges are typically displayed transparently on listings, which is a major draw. Good for candidates specifically targeting互联网 (internet) companies.', 'word', '拉勾网上的工资都是公开的。Lāgōu Wǎng shàng de gōngzī dōu shì gōngkāi de.', '"All salaries on Lagou are public" — the platform\'s selling point relative to the more opaque listings on other sites.', null, [ACT.vocabularyPlatforms]),
    createContentItem('脉脉', 'Màimài', 'The Chinese professional networking platform — most directly comparable to LinkedIn in form but with a stronger emphasis on anonymous industry gossip and salary information. Tech professionals use 脉脉 for backchannel reference checks ("what is it really like to work at company X?"), insider hiring tips, and reading anonymous reviews of managers and companies.', 'word', '我在脉脉上看过这家公司的评价。Wǒ zài Màimài shàng kàn guo zhè jiā gōngsī de píngjià.', '"I have read reviews of this company on Maimai" — the natural use case; candidates check 脉脉 before accepting offers.', null, [ACT.vocabularyPlatforms]),
    createContentItem('猎头', 'liètóu', 'Headhunter / executive recruiter (literally "hunting head", a phonetic-semantic borrowing from English "headhunter"). Used for senior or specialized roles where companies pay external recruiters a commission for successful placements. Being approached 被猎头 (bèi liètóu, "headhunted") signals career success; candidates often namedrop 猎头 contacts when discussing job changes.', 'word', '上周一个猎头给我打了电话。Shàngzhōu yí ge liètóu gěi wǒ dǎ le diànhuà.', '"A headhunter called me last week" — common humble-brag in tech-sector small talk; signals you are senior enough to be visible to recruiters.', null, [ACT.vocabularyPlatforms]),
    createContentItem('内推', 'nèituī', 'Internal referral (literally "internally push / push from inside"). The most effective hiring channel at large Chinese tech companies — an employee submits your résumé internally and gets a referral bonus if you are hired. Candidates often ask LinkedIn or 脉脉 contacts for 内推 before applying cold. Standard request: 能不能帮我内推一下? ("Could you help me with a referral?").', 'word', '我表哥在腾讯，他可以帮我内推。Wǒ biǎogē zài Téngxùn, tā kěyǐ bāng wǒ nèituī.', '"My cousin works at Tencent and can refer me internally" — typical use of family/friend network for internal referrals.', null, [ACT.vocabularyPlatforms]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar I: 是…的 emphatic construction
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '是…的',
      'shì … de',
      'The 是…的 emphatic construction frames a known past action and spotlights its WHEN, WHERE, HOW, or WITH WHOM. Pattern: subject + 是 + [emphasized element] + verb + 的. Used when the listener already knows the action happened and is asking about its circumstances — the standard answer pattern in interviews for "when/where/how did you…?" questions.',
      'sentence',
      '我是去年毕业的。Wǒ shì qùnián bìyè de. — "It was last year that I graduated."',
      'Compare with the plain past 我去年毕业了 ("I graduated last year") — same facts, but 是…的 spotlights the time as the answer to a question, while 了 just reports the event.',
      [
        { target: '是 shì + emphasized element', note: 'place 是 directly BEFORE the element you want to highlight (the time, place, manner, or accompaniment)' },
        { target: 'verb + 的 de', note: '的 closes the construction at the end of the clause; never omit it' },
        { target: 'past-only requirement', note: '是…的 only works for completed past actions where the action itself is already known — never for ongoing or future events' },
      ],
      [ACT.grammarShiDe],
    ),
    createContentItem(
      '是…的 — WHEN',
      'shì … de — when',
      'The most common interview use: spotlighting WHEN something happened. Asked 您是什么时候毕业的? ("When did you graduate?"), the natural answer is 我是 2024 年毕业的, not 我毕业 2024 年. The 是…的 frame is what makes the answer feel like a direct response to the question.',
      'sentence',
      'Q: 您是什么时候来北京的? Nín shì shénme shíhou lái Běijīng de?\nA: 我是去年九月来北京的。Wǒ shì qùnián jiǔ yuè lái Běijīng de.',
      '"Q: When did you come to Beijing? A: It was last September that I came to Beijing." — note that 的 closes the answer even though the question already used 的.',
      [
        { target: 'Q ends with 的', note: 'the question itself uses 的; this is the signal that 是…的 is the expected answer frame' },
        { target: 'A: 我是 + TIME + 来北京的', note: 'place the time element 去年九月 directly after 是 to spotlight it' },
      ],
      [ACT.grammarShiDe],
    ),
    createContentItem(
      '是…的 — WHERE',
      'shì … de — where',
      'Spotlighting WHERE a past action happened. Asked 您是在哪里读的大学? ("Where did you go to university?"), the answer is 我是在清华大学读的大学. The construction makes the location stand out as the answer.',
      'sentence',
      'Q: 您是在哪里学的中文? Nín shì zài nǎli xué de Zhōngwén?\nA: 我是在清华大学学的中文。Wǒ shì zài Qīnghuá Dàxué xué de Zhōngwén.',
      '"Q: Where did you learn Chinese? A: It was at Tsinghua University that I learned Chinese." — place 在 + location directly after 是.',
      [
        { target: '在 + location', note: 'the preposition 在 marks the location; place the whole 在-phrase after 是' },
        { target: 'verb + 的', note: 'the verb 学 (learn) comes before 的, with the object 中文 after; alternative natural order is 学中文 + 的' },
      ],
      [ACT.grammarShiDe],
    ),
    createContentItem(
      '是…的 — HOW',
      'shì … de — how',
      'Spotlighting HOW (by what means) a past action happened. Asked 您是怎么知道我们的招聘信息的? ("How did you hear about our opening?"), the answer is 我是通过BOSS直聘看到的, with 通过BOSS直聘 ("via BOSS Zhipin") in the spotlight slot.',
      'sentence',
      'Q: 您是怎么找到我们公司的? Nín shì zěnme zhǎodào wǒmen gōngsī de?\nA: 我是通过朋友的内推找到您们的。Wǒ shì tōngguò péngyou de nèituī zhǎodào nínmen de.',
      '"Q: How did you find our company? A: I found you through a friend\'s internal referral." — 通过 (tōngguò, "through / via") is the common preposition for the means.',
      [
        { target: '通过 + means', note: '"through / via"; the most common preposition for HOW; place the whole phrase after 是' },
        { target: 'common alternatives', note: '用 + tool (by using X), 坐 + transport (by taking X), 在 + platform (on X)' },
      ],
      [ACT.grammarShiDe],
    ),
    createContentItem(
      '是…的 negation',
      'shì … de negation',
      'Negate 是…的 by placing 不 directly before 是: 不是…的. Pattern: 我不是去年毕业的，是前年。("It wasn\'t last year that I graduated — it was the year before."). The negation form is itself a common interview pattern when the candidate gently corrects an assumption.',
      'sentence',
      'Q: 您是去年来北京的吗? Nín shì qùnián lái Běijīng de ma?\nA: 不，我不是去年来的，是前年来的。Bù, wǒ bú shì qùnián lái de, shì qiánnián lái de.',
      '"Q: Was it last year you came to Beijing? A: No, it wasn\'t last year — it was the year before." — 不是…，是… is the polite correction frame on top of 是…的.',
      null,
      [ACT.grammarShiDe],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar II: 既…又…
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '既…又…',
      'jì … yòu …',
      '"Both X and Y" — pairs two complementary qualities or actions in parallel. Pattern: subject + 既 + adjective/verb1 + 又 + adjective/verb2. The two halves must be grammatically parallel (both adjectives, or both short verb phrases). Slightly more formal and written-leaning than the colloquial 又…又…; well-suited to interviews when you want to sound deliberate.',
      'sentence',
      '我既细心又有责任心。Wǒ jì xìxīn yòu yǒu zérèn xīn. — "I am both detail-oriented and have a sense of responsibility."',
      'The hallmark interview answer to the 优点 (strengths) question — interviewers consciously listen for this construction as a marker of polished Mandarin.',
      [
        { target: '既 jì + quality 1', note: '"both"; introduces the first quality; place directly before the adjective or verb' },
        { target: '又 yòu + quality 2', note: '"and also"; introduces the second quality; place directly before the second adjective or verb' },
        { target: 'parallel structure required', note: 'both halves must be the same grammatical type (both adjectives, both verb phrases, both nouns); mismatched halves sound broken' },
      ],
      [ACT.grammarBothAnd],
    ),
    createContentItem(
      '既…又… (adjectives)',
      'jì … yòu … (adjectives)',
      'Pairing two adjectives is the most common use in interviews. The two adjectives should be complementary (both positive, or both describing the same noun) but not redundant. 既细心又耐心 ("detail-oriented and patient") works; 既好又棒 ("good and excellent") is redundant and sounds empty.',
      'sentence',
      '他既聪明又勤奋。Tā jì cōngming yòu qínfèn. — "He is both intelligent and hardworking."\n这份工作既稳定又有发展。Zhè fèn gōngzuò jì wěndìng yòu yǒu fāzhǎn. — "This job is both stable and has growth potential."',
      'Note the second example pairs an adjective (稳定 stable) with a verb phrase (有发展 has development) — Chinese is more flexible than English here; both halves describe the noun and feel parallel even if technically different parts of speech.',
      [
        { target: '既细心 jì xìxīn', note: '"both careful/detail-oriented"; 细心 is a common interview adjective' },
        { target: '又耐心 yòu nàixīn', note: '"and patient"; 耐心 pairs naturally with 细心' },
      ],
      [ACT.grammarBothAnd],
    ),
    createContentItem(
      '既…又… (verbs)',
      'jì … yòu … (verbs)',
      'Pairing two short verb phrases — describes someone doing two things or having two capabilities at the same time. Less common than the adjective version but useful when listing diverse skills: 既会写代码又会做产品设计 ("can both write code and do product design").',
      'sentence',
      '我既会用Python又会用Java。Wǒ jì huì yòng Python yòu huì yòng Java. — "I can use both Python and Java."',
      'Notice each half repeats the auxiliary 会 (huì, "can"); omitting it on the second half (会用Python又用Java) sounds incomplete in formal Mandarin.',
      null,
      [ACT.grammarBothAnd],
    ),
    createContentItem(
      '既…又… vs 又…又…',
      'jì vs yòu repetition',
      'The colloquial sibling 又…又… means the same thing but feels more casual and more spoken. 既…又… is slightly more deliberate and formal — better in interviews, cover letters, and written professional contexts. 又…又… is fine with friends or in casual descriptions. Same grammar shape, different register.',
      'sentence',
      'INTERVIEW (formal): 我既细心又有耐心。\nCASUAL (with friends): 这家咖啡店又便宜又好喝。Zhè jiā kāfēi diàn yòu piányi yòu hǎohē. — "This café is both cheap and delicious."',
      'A native speaker hears the register shift immediately; mixing them within one sentence sounds confused.',
      [
        { target: '既…又… (formal)', note: 'interviews, cover letters, presentations, written contexts' },
        { target: '又…又… (casual)', note: 'small talk, friend conversation, casual descriptions' },
      ],
      [ACT.grammarBothAnd],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Grammar III: 不但…而且…
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '不但…而且…',
      'búdàn … érqiě …',
      '"Not only X, but also Y" — chains two facts where the second adds force or significance to the first. Pattern: 不但 + clause 1, 而且 + clause 2. Slightly stronger and more formal than the closely related 不仅…而且… (bùjǐn … érqiě), which is everywhere in modern Chinese and reads a touch softer; use 不但 when you want the construction to feel more deliberate or written.',
      'sentence',
      '我不但完成了项目，而且提前一个月交付了。Wǒ búdàn wánchéng le xiàngmù, érqiě tíqián yí ge yuè jiāofù le. — "I not only completed the project, but also delivered it a month early."',
      'The hallmark résumé-read-out pattern: state an accomplishment, then chain a stronger second accomplishment that intensifies the first.',
      [
        { target: '不但 búdàn + clause 1', note: '"not only"; placed at the start of the first clause, OR after the subject if the subject is shared' },
        { target: '而且 érqiě + clause 2', note: '"but also"; placed at the start of the second clause; required, do not omit' },
        { target: 'optional 还 hái', note: 'add 还 inside the second clause for extra emphasis: 不但…，而且还… — common in spoken Mandarin' },
      ],
      [ACT.grammarNotOnly],
    ),
    createContentItem(
      '不但…而且 vs 不仅…而且',
      'búdàn vs bùjǐn',
      'Near-synonyms with subtly different feel. 不但…而且… is slightly stronger and more formal — preferred in written contexts, interviews, and when you want to emphasize the second fact strongly. 不仅…而且… is more common in modern spoken Chinese, slightly softer, and the default in most everyday speech. Both work in interviews; choosing 不但 signals deliberateness.',
      'sentence',
      'STRONGER: 他不但完成了任务，而且超额完成了。Tā búdàn wánchéng le rènwù, érqiě chāo\'é wánchéng le.\nSOFTER: 他不仅完成了任务，而且超额完成了。Tā bùjǐn wánchéng le rènwù, érqiě chāo\'é wánchéng le.',
      '"He not only finished the task but exceeded it" — both translations identical in English; the Chinese register difference is real but subtle.',
      [
        { target: '不但 (stronger)', note: 'written contexts, formal interviews, when you want the second fact to land harder' },
        { target: '不仅 (softer)', note: 'modern spoken Mandarin default; also acceptable in interviews' },
      ],
      [ACT.grammarNotOnly],
    ),
    createContentItem(
      '不但…而且还…',
      'búdàn … érqiě hái …',
      'Add 还 (hái, "also / additionally") inside the second clause for extra emphasis. The triple 不但…而且还… is a common spoken pattern that adds rhythm and weight to the second half. The 还 is optional grammatically but feels natural in spoken Chinese and signals fluency.',
      'sentence',
      '我不但会写代码，而且还会做产品设计。Wǒ búdàn huì xiě dàimǎ, érqiě hái huì zuò chǎnpǐn shèjì. — "I can not only write code, but also do product design."',
      'The 还 (additionally) is what makes the chain feel rhythmically complete; without it the second half sounds slightly abrupt in speech.',
      null,
      [ACT.grammarNotOnly],
    ),
    createContentItem(
      '不但 placement rules',
      'búdàn placement',
      'Placement of 不但 depends on whether the two clauses share a subject. SAME SUBJECT: 不但 goes AFTER the subject (subject + 不但 + verb1 …, 而且 + verb2 …). DIFFERENT SUBJECTS: 不但 goes BEFORE the first subject (不但 + subject1 + verb1 …, 而且 + subject2 + verb2 …). Getting this wrong sounds awkward to native speakers.',
      'sentence',
      'SAME SUBJECT: 我不但会用Python，而且会用Java。Wǒ búdàn huì yòng Python, érqiě huì yòng Java.\nDIFFERENT SUBJECTS: 不但他来了，而且他全家都来了。Búdàn tā lái le, érqiě tā quán jiā dōu lái le.',
      '"I can use not only Python but also Java" (same subject) vs "Not only did he come, but his whole family came" (different subjects within the second clause has a fuller subject).',
      [
        { target: 'same subject → 不但 after subject', note: 'the subject is stated once, before 不但; preferred in most interview answers' },
        { target: 'different subjects → 不但 before subject 1', note: 'each clause states its own subject; less common but grammatically required when subjects differ' },
      ],
      [ACT.grammarNotOnly],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Reading & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'BOSS直聘 招聘信息',
      'BOSS Zhípìn zhāopìn xìnxī',
      'A realistic Beijing tech-sector job posting on BOSS直聘 for a junior backend engineer role. Read it aloud once, then extract role title, requirements, salary range, and benefits.',
      'sentence',
      '【北京】后端工程师 (Java/Python) — 应届毕业生\n· 公司: 北京云算科技有限公司 (Beijing Yún-Suàn Tech)\n· 工作地点: 北京·海淀·中关村\n· 学历要求: 本科及以上 (985/211 院校优先)\n· 工作经验: 应届毕业生或一年以内经验\n· 招聘人数: 5 人\n· 薪资范围: 月薪 15K–22K · 13 薪 · 五险一金 · 餐补 · 健康体检\n· 试用期: 三个月，试用期工资为转正工资的 80%\n· 工作时间: 早 10 点至晚 7 点 (周末双休)\n· 任职要求: 计算机相关专业，熟悉 Java 或 Python 至少一种，了解常见数据结构与算法，沟通能力强\n· 加分项: 实习经验、开源项目、英语流利\n· 投递方式: 通过 BOSS 直聘联系HR或将简历发送至 hr@yunsuan.com\n· 面试流程: 笔试 → 技术面 → HR 面 → offer',
      'Beijing Yun-Suan Tech is hiring 5 fresh-grad backend engineers. Location: Zhongguancun (Beijing\'s tech district). Requirements: bachelor\'s+, 985/211 schools preferred, Java/Python skills. Salary: 15K–22K/mo, 13-month pay, full benefits, meal allowance, health check. 3-month probation at 80% pay. Work hours: 10 AM–7 PM, weekends off (note the absence of 996). Bonus points for internships, open-source contributions, English fluency. Apply via BOSS Zhipin chat or email résumé. Process: written test → tech interview → HR interview → offer.',
      [
        { target: '应届毕业生 yìngjiè bìyèshēng', note: 'fresh graduate (within ~1 year of graduation) — a dedicated hiring channel with its own quota in most Chinese companies' },
        { target: '985/211 院校 yuànxiào', note: 'two tiers of elite Chinese universities (985 is the top ~40, 211 is the next ~115); 清华大学 belongs to both' },
        { target: '五险一金 wǔ xiǎn yī jīn', note: 'the legally mandated benefit package: 5 insurance types (pension, medical, unemployment, work-injury, maternity) + 1 housing fund — always asked about in offers' },
        { target: '13 薪 shísān xīn', note: '13-month pay (one extra month of salary as a year-end bonus); common in Chinese tech, viewed as a basic benefit' },
        { target: '周末双休 zhōumò shuāng xiū', note: '"two-day weekends off" — explicitly mentioned to signal this company does NOT do 996 / 单休 (six-day workweek)' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '阅读理解',
      'yuèdú lǐjiě',
      'Four comprehension questions on the posting. Answer each in one or two short Mandarin sentences using the lesson grammar where natural.',
      'sentence',
      'Q1: 这个职位招聘多少人? Q2: 试用期是多久? 试用期工资是多少? Q3: 这个公司是不是 996? Q4: 投递简历有几种方式?',
      'Q1: How many positions? Q2: How long is probation? What is the probation salary? Q3: Is this a 996 company? Q4: How many ways to submit a résumé?',
      [
        { target: 'A1: 招聘 5 人。', note: 'short answer using the same verb 招聘 from the posting' },
        { target: 'A2: 试用期是三个月，工资是转正工资的 80%。', note: 'compound answer covering both parts of the question' },
        { target: 'A3: 不是。从工作时间看，周末双休，不是 996。', note: 'inference answer using 从…看 ("looking at…") to cite evidence' },
        { target: 'A4: 有两种 — 通过 BOSS 直聘联系 HR 或发邮件到 hr@yunsuan.com。', note: 'short answer listing both methods using 通过 (via) for one and 发邮件到 (email to) for the other' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Listening & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '模拟面试',
      'mónǐ miànshì',
      'A full first-round interview at a Beijing tech company. The HR partner (王经理) covers all the standard blocks: self-intro, motivation, strengths, project experience, probation/salary, candidate questions, close. Read it aloud once with the tutor, then perform it again with your own background swapped in.',
      'conversation',
      '王经理: 您好，欢迎来面试。请先做一个自我介绍吧。\nWáng jīnglǐ: Nín hǎo, huānyíng lái miànshì. Qǐng xiān zuò yí ge zìwǒ jièshào ba.\n\n候选人: 王经理您好。我叫莎拉，来自菲律宾，今年二十五岁。我是去年从清华大学计算机系毕业的，硕士。我在校期间不但完成了三个机器学习项目，而且其中一个还获得了学校的创新奖。毕业后我在一家小型创业公司做了半年后端开发，主要用 Python 和 Java。很高兴有机会来贵公司面试。\nHòuxuǎnrén: Wáng jīnglǐ nín hǎo. Wǒ jiào Shālā, láizì Fēilǜbīn, jīnnián èrshí wǔ suì. Wǒ shì qùnián cóng Qīnghuá Dàxué jìsuànjī xì bìyè de, shuòshì. Wǒ zài xiào qījiān búdàn wánchéng le sān ge jīqì xuéxí xiàngmù, érqiě qízhōng yí ge hái huòdé le xuéxiào de chuàngxīn jiǎng. Bìyè hòu wǒ zài yì jiā xiǎoxíng chuàngyè gōngsī zuò le bànnián hòuduān kāifā, zhǔyào yòng Python hé Java. Hěn gāoxìng yǒu jīhuì lái guì gōngsī miànshì.\n\n王经理: 谢谢。请问您为什么想加入我们?\nWáng jīnglǐ: Xièxie. Qǐngwèn nín wèi shénme xiǎng jiārù wǒmen?\n\n候选人: 主要有两个原因。第一，我一直关注贵公司的 AI 产品，特别是您们最近发布的对话引擎。第二，我希望在一个既专业又年轻的团队里成长，从同事身上学到更多。\nHòuxuǎnrén: Zhǔyào yǒu liǎng ge yuányīn. Dì yī, wǒ yìzhí guānzhù guì gōngsī de AI chǎnpǐn, tèbié shì nínmen zuìjìn fābù de duìhuà yǐnqíng. Dì èr, wǒ xīwàng zài yí ge jì zhuānyè yòu niánqīng de tuánduì lǐ chéngzhǎng, cóng tóngshì shēn shàng xué dào gèng duō.\n\n王经理: 那您觉得自己的优点是什么? 缺点呢?\nWáng jīnglǐ: Nà nín juéde zìjǐ de yōudiǎn shì shénme? Quēdiǎn ne?\n\n候选人: 我的优点是既细心又有责任心。我做项目的时候习惯把每一步都写下来，所以很少出错。缺点是有时候太想把一件事做到最好，反而花太多时间。最近我在学习更早地交付，再慢慢优化。\nHòuxuǎnrén: Wǒ de yōudiǎn shì jì xìxīn yòu yǒu zérèn xīn. Wǒ zuò xiàngmù de shíhou xíguàn bǎ měi yí bù dōu xiě xiàlái, suǒyǐ hěn shǎo chū cuò. Quēdiǎn shì yǒu shíhou tài xiǎng bǎ yí jiàn shì zuò dào zuì hǎo, fǎn\'ér huā tài duō shíjiān. Zuìjìn wǒ zài xuéxí gèng zǎo de jiāofù, zài mànman yōuhuà.\n\n王经理: 好的。我想了解一下您的期望薪资和能入职的时间。\nWáng jīnglǐ: Hǎo de. Wǒ xiǎng liǎojiě yíxià nín de qīwàng xīnzī hé néng rùzhí de shíjiān.\n\n候选人: 我的期望薪资是月薪一万八到两万二，可以根据具体岗位调整。如果一切顺利，我可以下个月一号入职。请问一下，咱们公司的试用期是多久? 试用期工资是怎么算的?\nHòuxuǎnrén: Wǒ de qīwàng xīnzī shì yuèxīn yī wàn bā dào liǎng wàn èr, kěyǐ gēnjù jùtǐ gǎngwèi tiáozhěng. Rúguǒ yíqiè shùnlì, wǒ kěyǐ xià ge yuè yī hào rùzhí. Qǐngwèn yíxià, zánmen gōngsī de shìyòngqī shì duō jiǔ? Shìyòngqī gōngzī shì zěnme suàn de?\n\n王经理: 我们试用期是三个月，工资是转正后的 80%，过了试用期就转正。今天的面试就到这里，结果一周之内通过 BOSS 直聘通知您。\nWáng jīnglǐ: Wǒmen shìyòngqī shì sān ge yuè, gōngzī shì zhuǎnzhèng hòu de bǎi fēn zhī bāshí, guò le shìyòngqī jiù zhuǎnzhèng. Jīntiān de miànshì jiù dào zhèlǐ, jiéguǒ yì zhōu zhī nèi tōngguò BOSS Zhípìn tōngzhī nín.\n\n候选人: 非常感谢您的时间，麻烦您了。期待您的回复，再见。\nHòuxuǎnrén: Fēicháng gǎnxiè nín de shíjiān, máfan nín le. Qīdài nín de huífù, zàijiàn.',
      'A full 7-turn first-round interview between Manager Wang (HR) and Sarah (candidate) for a Beijing AI company. Sarah uses 是…的 to spotlight when/where she graduated, 既…又… for her strengths and the team she wants to join, and 不但…而且… for her project accomplishments. The interview covers the canonical sequence: self-intro → motivation → strengths/weaknesses → salary/probation → close.',
      [
        { target: '我是去年从清华大学毕业的', note: '是…的 spotlights WHEN (去年) and WHERE (清华大学) — model use of the construction in the very first answer' },
        { target: '不但完成了…而且…获得了', note: 'chains two accomplishments; the second (winning an innovation award) intensifies the first (completing three projects)' },
        { target: '既专业又年轻的团队', note: '既…又… pairs two desirable team qualities; common phrasing when answering "why this company"' },
        { target: '既细心又有责任心', note: '既…又… for strengths — note one half is an adjective (细心) and one half is a verb phrase (有责任心), which Chinese allows' },
        { target: '试用期是怎么算的?', note: 'candidate-side 是…的 question — politely asks HOW the probation pay is calculated, a normal interview question, not pushy' },
        { target: '麻烦您了 · 期待您的回复', note: 'standard polite closing — gratitude + forward-looking expectation, both formulaic but expected' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Writing: BOSS直聘 opening message
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'BOSS直聘 开场白模板',
      'BOSS Zhípìn kāichǎngbái múbǎn',
      'A reusable 5–6 sentence template for the opening message you send to a hiring manager on BOSS直聘. Fill in the bracketed slots with your own information — the structure is calibrated to be polite, specific, and immediately actionable.',
      'sentence',
      '【模板】\n您好，我是 [姓名]，是 [清华大学 + 专业] 的 [应届毕业生 / 在职工程师]。我是 [年份] 在 [城市/学校] 毕业的。我看到贵公司在招聘 [职位名称]，很感兴趣。我既 [优点 1] 又 [优点 2]，以前不但 [经历 1]，而且 [经历 2]。方便的话我可以把简历发给您，期待您的回复。麻烦您了。\n\n【Template (Pinyin)】\nNín hǎo, wǒ shì [Xìngmíng], shì [Qīnghuá Dàxué + Zhuānyè] de [yìngjiè bìyèshēng / zàizhí gōngchéngshī]. Wǒ shì [Niánfèn] zài [Chéngshì/Xuéxiào] bìyè de. Wǒ kàn dào guì gōngsī zài zhāopìn [zhíwèi míngchēng], hěn gǎn xìngqù. Wǒ jì [yōudiǎn 1] yòu [yōudiǎn 2], yǐqián búdàn [jīnglì 1], érqiě [jīnglì 2]. Fāngbiàn de huà wǒ kěyǐ bǎ jiǎnlì fā gěi nín, qīdài nín de huífù. Máfan nín le.',
      'A complete opening message in five short sentences: greeting + identity, when/where, the role of interest, a 既…又… strength + 不但…而且… experience pitch, a request to send the résumé, and a polite close. The structure mirrors what experienced Chinese job-seekers send.',
      [
        { target: '[姓名]', note: 'your full Chinese name or transliteration; use family-name-first order if you have a Chinese name' },
        { target: '[清华大学 + 专业]', note: 'your university and major; 清华大学 is shown as the model' },
        { target: '是 [年份] 在 [城市/学校] 毕业的', note: '是…的 emphatic clause for when and where you graduated' },
        { target: '我既 [优点 1] 又 [优点 2]', note: '既…又… pair of complementary strengths' },
        { target: '不但 [经历 1]，而且 [经历 2]', note: '不但…而且… chain of two accomplishments where the second intensifies the first' },
        { target: '方便的话…期待您的回复', note: 'polite next-step request + forward-looking close; do not skip — abrupt endings hurt response rate' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '写作示例',
      'xiězuò shìlì',
      'A filled-in example using the template — write your own version in 5–6 sentences using your real school (清华大学 if applicable), major, and one real piece of experience.',
      'sentence',
      '【示例】\n您好，我是莎拉，是清华大学计算机系的应届硕士毕业生。我是 2024 年 6 月在北京毕业的。我看到贵公司在招聘后端工程师，很感兴趣。我既细心又有责任心，以前不但做过三个机器学习项目，而且其中一个还获得了学校的创新奖。方便的话我可以把简历发给您，期待您的回复。麻烦您了。\n\n【Pinyin】\nNín hǎo, wǒ shì Shālā, shì Qīnghuá Dàxué jìsuànjī xì de yìngjiè shuòshì bìyèshēng. Wǒ shì 2024 nián 6 yuè zài Běijīng bìyè de. Wǒ kàn dào guì gōngsī zài zhāopìn hòuduān gōngchéngshī, hěn gǎn xìngqù. Wǒ jì xìxīn yòu yǒu zérèn xīn, yǐqián búdàn zuò guo sān ge jīqì xuéxí xiàngmù, érqiě qízhōng yí ge hái huòdé le xuéxiào de chuàngxīn jiǎng. Fāngbiàn de huà wǒ kěyǐ bǎ jiǎnlì fā gěi nín, qīdài nín de huífù. Máfan nín le.',
      'Translation: "Hello, I am Sarah, a fresh master\'s graduate from the Computer Science department at Tsinghua University. I graduated in Beijing in June 2024. I saw your company is recruiting backend engineers and I am very interested. I am both detail-oriented and have a sense of responsibility; previously I not only worked on three machine learning projects, but one of them won the school\'s innovation award. If convenient, I can send my résumé to you. I look forward to your reply. Thank you for your trouble."',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '春招与秋招',
      'chūnzhāo yǔ qiūzhāo',
      'The Chinese corporate hiring calendar runs on two main cycles. 秋招 (autumn recruitment, Sep–Nov) is the bigger and more important — most large companies fill their fresh-graduate quotas here, signed for the following July start. 春招 (spring recruitment, Feb–May) is the smaller second chance for candidates who missed 秋招 or whose offers fell through. Internships are recruited continuously throughout the year.',
      'sentence',
      '秋招 (大头): 九月–十一月 · 大公司主战场 · 应届生主要机会\n春招 (补招): 二月–五月 · 小公司更多 · 补充招聘',
      'A graduating senior in China starts preparing in August for 秋招; missing 秋招 means significantly fewer top-company options in 春招.',
      [
        { target: '秋招 qiūzhāo', note: 'autumn recruitment; the main hiring season; Sep–Nov of the year BEFORE the candidate starts (July of the next year)' },
        { target: '春招 chūnzhāo', note: 'spring recruitment; the smaller follow-up season; Feb–May, with a much smaller pool of openings' },
        { target: '校招 xiàozhāo', note: 'campus recruitment; the broader term covering both 秋招 and 春招 at universities' },
        { target: '社招 shèzhāo', note: 'social recruitment; the year-round channel for experienced hires (non-fresh-graduates)' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '应届毕业生',
      'yìngjiè bìyèshēng',
      'Fresh graduate — within ~1 year of finishing your degree (typically the graduation year and the following year). 应届毕业生 status is valuable: it qualifies you for dedicated entry-level pipelines (校招 / 应届生招聘) with their own quotas, tax breaks in some cities, and Beijing/Shanghai 户口 (household registration) sponsorship at large companies. Losing 应届 status (by working full-time elsewhere) closes those doors permanently.',
      'sentence',
      '我是 2024 应届毕业生，今年还可以走应届招聘。Wǒ shì 2024 yìngjiè bìyèshēng, jīnnián hái kěyǐ zǒu yìngjiè zhāopìn.',
      '"I am a 2024 fresh graduate; this year I can still go through the fresh-grad channel" — common framing when explaining your timing to a recruiter.',
      [
        { target: '应届 yìngjiè', note: '"current cohort"; signals you graduated this year or last year' },
        { target: '户口 hùkǒu', note: 'household registration system tied to a specific city; Beijing/Shanghai 户口 is highly valuable and large companies can sponsor it for top 应届毕业生' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '国企 vs 私企 vs 外企 vs 创业',
      'guóqǐ vs sīqǐ vs wàiqǐ vs chuàngyè',
      'Four broad employer categories with distinct reputations and tradeoffs in modern China. 国企 (state-owned, e.g., China Mobile, ICBC) = high stability, moderate pay, low growth, prestige with older generation. 私企 (private, e.g., Alibaba, Tencent, ByteDance) = high pay, high growth, high pressure (often 996). 外企 (foreign-invested, e.g., Google China, Microsoft, P&G) = good work-life balance, moderate pay by Chinese standards, English-friendly. 创业 (startup) = highest variance, equity upside, highest burnout risk.',
      'sentence',
      '国企稳定 · 私企工资高但累 · 外企平衡好 · 创业风险大但有期权\nGuóqǐ wěndìng · sīqǐ gōngzī gāo dàn lèi · wàiqǐ pínghéng hǎo · chuàngyè fēngxiǎn dà dàn yǒu qīquán.',
      'A graduating senior\'s parents often push for 国企; the senior often prefers 私企 for the higher pay; 外企 is the compromise; 创业 is the bold contrarian choice.',
      [
        { target: '国企 guóqǐ', note: 'state-owned enterprise; the "iron rice bowl" tradition; stable, hard-to-fire, modest pay' },
        { target: '私企 sīqǐ', note: 'private enterprise; includes the big Chinese tech firms; high pay, high pressure' },
        { target: '外企 wàiqǐ', note: 'foreign-invested enterprise; multinational China branches; work-life balance + English use are draws' },
        { target: '创业 chuàngyè', note: 'startup work; high equity upside, high risk, demanding hours; popular with risk-tolerant younger candidates' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '996 与加班',
      '996 yǔ jiābān',
      'The 996 system — 9 AM to 9 PM, 6 days a week — became a flashpoint in Chinese tech-labor debates after 2019 protests, and the Supreme People\'s Court formally ruled it illegal in 2021. In practice it still exists in many tech firms under different names (大小周 dà xiǎo zhōu = alternating six-day and five-day weeks). Candidates are routinely asked 你能接受加班吗? in interviews. The polite truthful answer: 项目需要的时候可以加班，但希望工作和生活能平衡 ("I can do overtime when the project needs it, but I hope to balance work and life").',
      'sentence',
      'Interviewer: 我们经常加班，您能接受吗?\nCandidate: 项目需要的时候我可以加班。同时我也希望工作和生活能保持平衡。\nMiànshìguān: Wǒmen jīngcháng jiābān, nín néng jiēshòu ma?\nHòuxuǎnrén: Xiàngmù xūyào de shíhou wǒ kěyǐ jiābān. Tóngshí wǒ yě xīwàng gōngzuò hé shēnghuó néng bǎochí pínghéng.',
      'A direct refusal ends the interview; a blanket yes signals you will be exploited. The hedged answer above is the standard middle path that experienced candidates use.',
      [
        { target: '996', note: '9-to-9, 6 days/week; formally illegal since 2021 but still common in practice; saying the number alone signals you know the debate' },
        { target: '大小周 dà xiǎo zhōu', note: 'alternating-week schedule; one week of 6 days, one week of 5 days; a softer 996 variant some companies adopted after the legal ruling' },
        { target: '加班 jiābān', note: 'overtime; the verb is morally neutral but in context often signals long expected hours' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '公务员考试',
      'gōngwùyuán kǎoshì',
      'The civil service exam — a separate, highly competitive route into government employment. Held nationally (国考) and provincially (省考) each year, with millions of takers chasing a few thousand stable government jobs (公务员 gōngwùyuán). The path appeals to candidates valuing stability, social status, and lifelong job security over private-sector pay; popular with parents and small-city candidates. Many candidates apply to corporate jobs and prepare for 公务员考试 simultaneously as a hedge.',
      'sentence',
      '今年我一边面试一边准备公务员考试。Jīnnián wǒ yìbiān miànshì yìbiān zhǔnbèi gōngwùyuán kǎoshì.',
      '"This year I am interviewing and preparing for the civil service exam at the same time" — the 一边…一边… ("simultaneously") pattern captures the common dual-track strategy.',
      [
        { target: '国考 guókǎo', note: 'national civil service exam; held annually in late November; for central-government roles' },
        { target: '省考 shěngkǎo', note: 'provincial civil service exam; held annually in spring; for provincial and city-level government roles' },
        { target: '公务员 gōngwùyuán', note: '"civil servant"; the formal title for government employees; high social status, modest pay, very stable' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 13 — Task: Mock interview
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '任务: 北京科技公司面试',
      'rènwù: Běijīng kējì gōngsī miànshì',
      'Roleplay a first-round interview at a Beijing tech company with the tutor playing the HR partner. Use every skill from this lesson in one continuous 6–8 turn scene — greeting, self-introduction with 是…的, motivation, strengths with 既…又…, accomplishments with 不但…而且…, probation/salary, close.',
      'conversation',
      '【场景: 北京某科技公司面试室】\n\n面试官: 您好，欢迎来面试。请先做一个自我介绍吧。\nMiànshìguān: Nín hǎo, huānyíng lái miànshì. Qǐng xiān zuò yí ge zìwǒ jièshào ba.\n\n您: [30 秒自我介绍 — 包含: 姓名 + 学校 + 专业 + 至少一个 "是…的" 强调时间或地点 + 一句动机]\n\n面试官: 您为什么想加入我们公司?\nMiànshìguān: Nín wèi shénme xiǎng jiārù wǒmen gōngsī?\n\n您: [一两句话 — 具体说为什么这家公司，最好提到一个产品或团队]\n\n面试官: 您的优点是什么? 缺点呢?\nMiànshìguān: Nín de yōudiǎn shì shénme? Quēdiǎn ne?\n\n您: [优点 — 用 "既…又…" 句型; 缺点 — 一个真实的缺点 + 现在如何改进]\n\n面试官: 请介绍一个让您印象最深的项目或经验。\nMiànshìguān: Qǐng jièshào yí ge ràng nín yìnxiàng zuì shēn de xiàngmù huò jīngyàn.\n\n您: [一个项目 — 用 "不但…而且…" 句型说两个成就]\n\n面试官: 您的期望薪资是多少? 能什么时候入职?\nMiànshìguān: Nín de qīwàng xīnzī shì duōshǎo? Néng shénme shíhou rùzhí?\n\n您: [一个薪资范围 + 入职时间 + 反问试用期]\n\n面试官: 您还有什么想问我的吗?\nMiànshìguān: Nín hái yǒu shénme xiǎng wèn wǒ de ma?\n\n您: [一两个真实问题 — 团队、文化、加班、转正条件等]\n\n面试官: 好的，今天就到这里。结果一周之内通知您。\nMiànshìguān: Hǎo de, jīntiān jiù dào zhèlǐ. Jiéguǒ yì zhōu zhī nèi tōngzhī nín.\n\n您: [感谢 + 期待回复 + 告别]',
      'Eight-turn interview structure with detailed prompts. The tutor plays the HR partner; you fill in each bracketed slot using the constructions you have learned. Aim for natural register throughout — use 您 consistently, keep tone calm and confident, do not over-translate from English.',
      [
        { target: '自我介绍 — 是…的', note: '"It was [year] that I graduated from [school]" — use 是…的 to spotlight when/where naturally' },
        { target: '动机 — 一个具体原因', note: 'pick ONE specific reason (a product, a team, an industry direction); generic praise is the kiss-of-death answer' },
        { target: '优点 — 既…又…', note: 'pair two complementary qualities; do not list three or four; quality over quantity' },
        { target: '缺点 — 真实 + 改进', note: 'admit a real flaw, then say what you are doing about it; refusing to name one reads as evasive' },
        { target: '项目 — 不但…而且…', note: 'chain one accomplishment with a stronger second one; 不但 X，而且 Y where Y intensifies X' },
        { target: '薪资 — 范围 + 反问', note: 'state a range (e.g., 1.5万–2万), reserve room with 可以调整 ("can be adjusted"), then politely ask about 试用期' },
        { target: '提问 — 真实问题', note: 'good questions: team structure, transitioning to 转正, on-call expectations; bad questions: salary again, vacation policy' },
        { target: '告别 — 麻烦您了 + 期待您的回复', note: 'standard close; gratitude + forward expectation + 再见' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战 — 应对 996 问题',
      'tiǎozhàn — yìngduì 996 wèntí',
      'Stretch goal: in the same scene, the interviewer asks the inevitable 996 question — 我们经常加班，您能接受吗? ("We often work overtime. Can you accept that?"). Use the hedged middle-path answer from the culture note; avoid both a flat yes and a flat no.',
      'conversation',
      '面试官: 我们公司经常加班，有时候大小周。您能接受吗?\nMiànshìguān: Wǒmen gōngsī jīngcháng jiābān, yǒu shíhou dà xiǎo zhōu. Nín néng jiēshòu ma?\n\n您 (推荐答案): 项目紧急的时候我可以加班。同时我希望工作和生活能保持平衡，长期高强度对效率不一定好。\nNín (tuījiàn dáàn): Xiàngmù jǐnjí de shíhou wǒ kěyǐ jiābān. Tóngshí wǒ xīwàng gōngzuò hé shēnghuó néng bǎochí pínghéng, chángqī gāo qiángdù duì xiàolǜ bùyídìng hǎo.',
      'The recommended answer: "I can do overtime when projects are urgent. At the same time, I hope to keep work-life balance — long-term high intensity is not necessarily good for efficiency." Acknowledges willingness without surrendering, and adds a reasoned argument that signals you are thoughtful.',
      [
        { target: '项目紧急的时候可以加班', note: 'concedes the principle (overtime is sometimes OK) without committing to permanent 996' },
        { target: '同时希望保持平衡', note: '同时 (tóngshí, "at the same time") is a softener that lets you state your own condition without sounding combative' },
        { target: '长期高强度对效率不一定好', note: 'closes with a reasoned argument — this is the part that distinguishes candidates who can negotiate from those who just refuse' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
