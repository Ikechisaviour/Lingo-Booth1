// Level 1 Unit 16 — Clubs & Leisure (Mandarin Chinese)
// Functions: introducing a student club, talking about hobbies and leisure
// activities, expressing frequency, joining clubs.
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
  orientation: 'zh-l1u16-orientation',
  pronunciation: 'zh-l1u16-pronunciation',
  vocabularyClubs: 'zh-l1u16-vocab-clubs',
  vocabularyLeisure: 'zh-l1u16-vocab-leisure',
  grammarFrequency: 'zh-l1u16-grammar-frequency',
  grammarYihuir: 'zh-l1u16-grammar-yihuir',
  grammarYibian: 'zh-l1u16-grammar-yibian',
  reading: 'zh-l1u16-reading',
  listening: 'zh-l1u16-listening',
  writing: 'zh-l1u16-writing',
  culture: 'zh-l1u16-culture',
  task: 'zh-l1u16-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Talk about Chinese university student clubs (学生社团) and your hobbies in two short sentences using 加入 and 参加.',
      'Express how often you do an activity using frequency adverbs 经常 (often), 偶尔 (occasionally), and time-quantity phrases like 每周一次 (once a week).',
      'Describe short-duration leisure with V + 一会儿 ("do a bit / for a while") and simultaneous actions with 一边…一边… ("do A while doing B").',
    ],
    task: 'Picture your first semester at Tsinghua University — the 社团招新 (club recruitment) fair is on and you have to decide which club to join. By the end of this lesson you should be able to walk up to a club table, ask what they do, find out how often they meet, and commit to joining — all in Mandarin.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in this lesson',
    goals: [
      'Apply 一 sandhi inside 一边 (yìbiān) and 一会儿 (yíhuìr) — the same 一 changes tone depending on the tone that follows it.',
      'Master the 儿化 (érhuà) ending in 一会儿 (yíhuìr) — a hallmark of Beijing-area speech that adds an r-coloring to the previous final.',
      'Distinguish the j/q/x palatal initials in 加入 (jiārù), 经常 (jīngcháng), and 兴趣 (xìngqù) — three of the most frequent club-vocabulary words.',
    ],
    task: 'Read each example aloud, decide where 一 sandhi applies, then pronounce the spoken version (not the written-tone version).',
  },
  {
    id: ACT.vocabularyClubs,
    section: 'Vocabulary I',
    title: 'Clubs and joining',
    goals: [
      'Use the 12 core noun + verb pairs for clubs: 学生社团, 兴趣小组, 加入, 参加, 招新, 会员, 活动, 社长, plus the four most common Tsinghua-style clubs (摄影社, 篮球队, 合唱团, 书法社).',
      'Distinguish 加入 (join, become a member) from 参加 (participate in, attend once or repeatedly) — using the wrong one creates real meaning differences.',
    ],
    task: 'Pick three clubs from the vocabulary list and write one sentence for each using 我想加入… or 我经常参加….',
  },
  {
    id: ACT.vocabularyLeisure,
    section: 'Vocabulary II',
    title: 'Leisure verbs and hobby words',
    goals: [
      'Use the 12 high-frequency leisure verbs: 玩, 休息, 散步, 逛街, 看电影, 看比赛, 旅游, 看书, 打球, 唱歌, 跳舞, 健身.',
      'Pair each leisure verb with a frequency adverb (经常 / 偶尔 / 每周一次) so the description carries register and habit information, not just the activity name.',
    ],
    task: 'For each of three leisure verbs, write one sentence that includes how often you do it and one feeling word (累 tired / 开心 happy / 放松 relaxed).',
  },
  {
    id: ACT.grammarFrequency,
    section: 'Grammar I',
    title: '经常 / 偶尔 + V — frequency adverbs',
    goals: [
      'Place 经常 (jīngcháng, often) and 偶尔 (ǒu\'ěr, occasionally) DIRECTLY BEFORE the verb — adverbs in Mandarin never go at the end of the sentence as they often do in English ("I go often").',
      'Use the time-quantity pattern 一周 X 次 / 一个月 X 次 ("X times per week / month") in the SLOT AFTER the verb to give an exact frequency: 我一周打两次篮球 ("I play basketball twice a week").',
      'Know that 经常 and 总是 (always) sit in the same adverb slot, but 总是 is stronger and can sound critical when used about other people.',
    ],
    task: 'Write three frequency sentences: one with 经常, one with 偶尔, one with 一周/一个月 + 一/两/三 + 次.',
  },
  {
    id: ACT.grammarYihuir,
    section: 'Grammar II',
    title: 'V + 一会儿 — do something for a short while',
    goals: [
      'Use V + 一会儿 (yíhuìr) AFTER the verb to express a short duration: 休息一会儿 ("rest for a bit"), 看一会儿书 ("read for a while").',
      'Place the object AFTER 一会儿 when the verb takes an object: 看一会儿电视 (watch TV for a while), NOT 看电视一会儿.',
      'Apply 一 sandhi: in 一会儿, 一 changes from yī to yí because 会 is fourth tone — written form stays 一, only pronunciation changes.',
    ],
    task: 'Convert three regular sentences (我看书 / 我休息 / 我打球) into short-duration sentences using V + 一会儿.',
  },
  {
    id: ACT.grammarYibian,
    section: 'Grammar III',
    title: '一边…一边… — doing A while doing B',
    goals: [
      'Use 一边 V₁ 一边 V₂ to express two simultaneous actions performed by the SAME subject: 一边看电影一边吃东西 ("watch a movie while eating").',
      'Know that the two verbs must be of similar weight — pairing a long activity (旅游) with a momentary one (开门) sounds off. Native speakers keep both sides at similar duration.',
      'Apply 一 sandhi: in 一边, 一 changes from yī to yì because 边 is first tone — written stays 一, only pronunciation changes.',
    ],
    task: 'Write three 一边…一边… sentences describing real combinations you do (e.g., walking + listening to music, eating + watching TV).',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'A Tsinghua club recruitment poster',
    goals: [
      'Read a 5-sentence club recruitment poster aloud with correct tones, sandhi, and natural rhythm.',
      'Answer four comprehension questions about the club name, weekly meeting time, member count, and main activities.',
    ],
    task: 'Read the poster aloud once, then answer the four comprehension questions in short sentences.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'A club recommendation chat',
    goals: [
      'Follow a 6-turn dialogue in which a senior student recommends a club to a newcomer; identify the recommendation, the frequency, and the venue.',
      'Reproduce the dialogue with your own preferences (different hobby, different desired frequency).',
    ],
    task: 'Read the dialogue along with the AI tutor first, then perform it again with your own information swapped in.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Describe a club you would join',
    goals: [
      'Write 4–5 sentences in Hanzi describing a real or imagined Tsinghua student club: name, what they do, frequency, members, and one feeling word.',
      'Use 经常 or 偶尔 at least once and either V + 一会儿 or 一边…一边… at least once so the writing demonstrates the core grammar of this lesson.',
    ],
    task: 'Write your own club description in 4–5 sentences using the model on the left, then read it aloud with correct tones.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: '学生社团 culture, 双休, and modern Chinese leisure',
    goals: [
      'Know that every major Chinese university has dozens of 学生社团 (student clubs), often run far more independently by students than at Western universities — 招新 (recruitment season) is one of the biggest events of the academic calendar.',
      'Distinguish 双休 (two-day weekend, the modern norm in white-collar work) from 单休 (one-day weekend, still common in retail and manufacturing) — these weekend formats shape who has time for leisure.',
      'Recognize three modern leisure trends: 健身 (gym/fitness boom in urban China), 广场舞 (plaza-dance, an organized older-generation pastime), and 网游/手游 (online and mobile video games dominating youth leisure time).',
    ],
    task: 'Pick one Tsinghua-style club you would join and one leisure activity you would do on a 双休 weekend; give a one-sentence reason for each.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'Join a Tsinghua club',
    goals: [
      'Combine vocabulary, frequency adverbs, V + 一会儿, and 一边…一边… in one continuous scene at the 社团招新 fair.',
      'Ask about activities, frequency, and member count; commit to joining or politely decline with a reason.',
    ],
    task: 'Roleplay the 社团招新 fair with the AI tutor playing a 社长 (club president) recruiting at the Tsinghua photography club booth; aim for a 6-turn exchange.',
  },
];

const lesson = {
  title: 'Level 1 · Unit 16: 学生社团 — Clubs and Leisure',
  category: 'daily-life',
  difficulty: 'beginner',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'introducing-club', label: 'Introducing a club', goal: 'Describe a club with its activities and meeting frequency in two short Mandarin sentences using 经常 / 一周…次.' },
    { id: 'sharing-hobby', label: 'Sharing a hobby', goal: 'State your favorite leisure activity and how often you do it using 经常 V or 一周 V X 次.' },
    { id: 'recommending-club', label: 'Recommending a club', goal: 'Recommend a club to a newcomer using 你可以加入… and one reason connecting their interest to the club.' },
    { id: 'simultaneous-actions', label: 'Doing two things at once', goal: 'Use 一边…一边… to describe a real combination of activities you do (e.g., walking + listening to music).' },
  ],
  relatedPools: ['topic-school', 'topic-leisure'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '本课目标',
      'běn kè mùbiāo',
      'By the end of this lesson you can describe a Chinese university student club, say what activities you do for leisure, how often you do them, and join a club at a recruitment fair — all in continuous Mandarin without rehearsing each line.',
      'word',
      'Functions: 介绍社团 jièshào shètuán (introduce a club) · 谈爱好 tán àihào (talk about hobbies) · 说频率 shuō pínlǜ (state frequency) · 加入社团 jiārù shètuán (join a club)',
      'These four micro-skills are the backbone of every Chinese campus social interaction; once they are automatic you can navigate any 招新 booth.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      '真实场景',
      'zhēnshí chǎngjǐng',
      'It is the second week of fall semester at Tsinghua University. The 学生社团招新 (club recruitment) fair has taken over the main walkway and dozens of clubs are calling out to new students. You stop at the photography-club table because you have always wanted to learn 摄影 (photography).',
      'word',
      '社长: "同学，你好！我们是清华摄影社。你想加入吗？" / 你: "我想了解一下你们的活动。"',
      'A typical 招新 opener: the 社长 calls out 同学 (classmate) + greeting + club name + 你想加入吗 — direct, friendly, expects an answer in one turn.',
      [
        { target: '社长 shèzhǎng', note: 'club president; the standard title for the student leader of a 社团' },
        { target: '同学 tóngxué', note: 'a polite address form between students; literal "fellow student", much friendlier than 你 alone' },
        { target: '了解一下 liǎojiě yíxià', note: '"just want to learn a bit"; softens the inquiry so you are not committed yet' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '社团 vs 兴趣小组',
      'shètuán vs xìngqù xiǎozǔ',
      'Mandarin has two near-equivalents for "club" with different scale and register. 社团 (shètuán) is the formal, official term used in university administration — most schools have 校级社团 (school-level clubs) registered with the student affairs office. 兴趣小组 (xìngqù xiǎozǔ, "interest group") is smaller, more informal, often a self-organized group of friends with a shared hobby.',
      'word',
      '清华大学的学生社团 (formal: registered Tsinghua clubs) vs 我们宿舍的篮球兴趣小组 (informal: our dorm basketball group)',
      'Use 社团 when talking about the official university scene and 兴趣小组 for informal peer groups.',
      [
        { target: '社团 shètuán', note: 'formal, registered, university-level club; has a 社长 and official membership' },
        { target: '兴趣小组 xìngqù xiǎozǔ', note: 'informal interest group, usually self-organized; no official status' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '一边 yìbiān',
      'yìbiān (一 sandhi: yī → yì)',
      '一 sandhi rule for first/second/third tones: when 一 is followed by a first-tone syllable like 边 (biān), 一 changes from its default first tone (yī) to fourth tone (yì). Written form stays 一; only pronunciation changes.',
      'word',
      '一边看电影一边吃东西。yìbiān kàn diànyǐng yìbiān chī dōngxi.',
      '一边 appears in nearly every "simultaneous actions" sentence in this lesson — getting the sandhi right is non-negotiable for natural speech.',
      [
        { target: '一 (written: yī, 1st)', note: 'default first tone in isolation' },
        { target: '一 (spoken before 1st/2nd/3rd: yì, 4th)', note: 'changes to falling tone — the sandhi rule before non-fourth tones' },
        { target: '边 (biān, 1st, unchanged)', note: 'noun "side"; high level tone preserved' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '一会儿 yíhuìr',
      'yíhuìr (一 sandhi + 儿化 érhuà)',
      'Two pronunciation phenomena in one word. First, 一 sandhi: 一 changes from yī to yí (rising) because the following syllable 会 is fourth tone. Second, 儿化: the final 儿 (ér) merges with the previous syllable, turning huì into huìr — a hallmark of Beijing-area Mandarin.',
      'word',
      '休息一会儿。xiūxi yíhuìr. ("Rest for a bit.")',
      'In southern China the 儿化 is often dropped (一会 yíhuì); on standard Beijing-based Mandarin the r-coloring is mandatory and gives the word its characteristic sound.',
      [
        { target: '一 (written: yī, 1st)', note: 'default first tone' },
        { target: '一 (spoken: yí, 2nd)', note: 'rises before the following fourth tone — sandhi rule' },
        { target: '会儿 (huìr)', note: '会 (4th) plus 儿化 ending; pronounced as a single r-colored syllable' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '经常 jīngcháng',
      'jīngcháng',
      'Two clear tones with no sandhi: first tone 经 (jīng) held high and level, then second tone 常 (cháng) rising from mid to high. The j- is the palatal initial (tongue flat against upper teeth) — never a hard English /dʒ/.',
      'word',
      '我经常去图书馆。wǒ jīngcháng qù túshūguǎn. ("I often go to the library.")',
      'The most useful frequency adverb in this lesson; ride the high level of jīng straight into the rising cháng without pausing.',
      [
        { target: '经 (jīng, 1st)', note: 'palatal initial j-; high level tone; do not aspirate' },
        { target: '常 (cháng, 2nd)', note: 'retroflex initial ch-; rising from mid to high pitch' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '加入 jiārù',
      'jiārù',
      'First-tone jiā followed by fourth-tone rù. The j- is the palatal initial; the r- is the retroflex with curled tongue tip. Two of the trickiest initials for English speakers appear back to back — drill this one until it feels natural.',
      'word',
      '我想加入摄影社。wǒ xiǎng jiārù shèyǐngshè. ("I want to join the photography club.")',
      'High-frequency verb in this lesson; the j-/r- contrast is the standard challenge.',
      [
        { target: '加 (jiā, 1st)', note: 'palatal initial j-, high level tone; literally "add"' },
        { target: '入 (rù, 4th)', note: 'retroflex initial r- with curled tongue tip; sharp falling tone; literally "enter"' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '兴趣 xìngqù',
      'xìngqù',
      'Two palatal-series syllables back to back: x- in 兴 and q- in 趣. Both initials share the same tongue position (flat against upper teeth); the difference is x- is a fricative while q- is an affricate with aspiration.',
      'word',
      '我对摄影很有兴趣。wǒ duì shèyǐng hěn yǒu xìngqù. ("I am very interested in photography.")',
      'Common compound; double fourth-tone with the same initial family is a useful tongue-twister.',
      [
        { target: '兴 (xìng, 4th)', note: 'fricative initial x-; sharp falling tone; "interest" sense' },
        { target: '趣 (qù, 4th)', note: 'aspirated affricate q-; same flat-tongue position as x-' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Clubs and joining
    // ────────────────────────────────────────────────────────────────────
    createContentItem('学生社团', 'xuésheng shètuán', 'A registered university student club — the formal term used in university administration and on official posters. Every major Chinese university has dozens, ranging from sports to academic to volunteering, all overseen by the student affairs office.', 'word', '清华大学有几百个学生社团。', '"Tsinghua University has several hundred student clubs" — typical scale for a top-tier Chinese university.', null, [ACT.vocabularyClubs]),
    createContentItem('兴趣小组', 'xìngqù xiǎozǔ', 'An informal interest group, smaller and less official than 社团. Usually self-organized among friends or dormmates around a shared hobby. No official membership rolls or 社长.', 'word', '我们宿舍有一个篮球兴趣小组。', '"Our dorm has a basketball interest group" — exactly the informal scale where 兴趣小组 is the right word.', null, [ACT.vocabularyClubs]),
    createContentItem('加入', 'jiārù', 'To join (a club, team, organization) — implies becoming an official member with a membership status. Contrasts with 参加 (cānjiā), which means to participate in or attend without necessarily becoming a member.', 'word', '我想加入摄影社。', '"I want to join the photography club" — declares the intent to become a registered member.', null, [ACT.vocabularyClubs]),
    createContentItem('参加', 'cānjiā', 'To participate in, attend, or take part in — an event, activity, or meeting. Used for one-time or repeated attendance without implying membership. 参加比赛 (enter a competition), 参加活动 (attend an event).', 'word', '我经常参加他们的活动。', '"I often attend their events" — repeated participation without necessarily being a member.', null, [ACT.vocabularyClubs]),
    createContentItem('招新', 'zhāoxīn', 'Recruitment of new members — the formal term for the start-of-semester club-fair season when 社团 actively recruit 新生 (new students). 招新季 (recruitment season) is one of the biggest events of the campus calendar.', 'word', '九月是社团招新的时候。', '"September is club recruitment season" — the standard timing on Chinese university campuses.', null, [ACT.vocabularyClubs]),
    createContentItem('会员', 'huìyuán', 'A member of a club, association, or organization. Implies registered status as opposed to a casual participant. 会员卡 (membership card) is common in gyms and clubs.', 'word', '这个社团有五十个会员。', '"This club has fifty members" — standard sentence describing club size.', null, [ACT.vocabularyClubs]),
    createContentItem('活动', 'huódòng', 'An activity, event, or organized program — extremely common noun covering club meetings, outings, competitions, and any structured gathering. 课外活动 (extracurricular activities) is a key phrase in school contexts.', 'word', '我们每周都有活动。', '"We have activities every week" — typical frequency for an active club.', null, [ACT.vocabularyClubs]),
    createContentItem('社长', 'shèzhǎng', 'Club president — the student leader of a 社团, elected or appointed by members. Distinct from 队长 (duìzhǎng, "team captain") used for sports teams.', 'word', '我们的社长很负责任。', '"Our club president is very responsible" — common positive evaluation of student leadership.', null, [ACT.vocabularyClubs]),
    createContentItem('摄影社', 'shèyǐngshè', 'Photography club. Compound of 摄影 (shèyǐng, photography) + 社 (shè, society/club). One of the most popular hobby clubs at Chinese universities — equipment-heavy and welcomes both digital and film enthusiasts.', 'word', '清华摄影社拍校园风景。', '"Tsinghua photography club shoots campus scenery" — typical activity description.', null, [ACT.vocabularyClubs]),
    createContentItem('篮球队', 'lánqiú duì', 'Basketball team. 队 (duì) is the standard suffix for sports teams; contrasts with 社 (shè, club/society) which is used for non-sport groups. Joining a 队 typically requires tryouts (选拔).', 'word', '他是清华篮球队的队员。', '"He is a member of the Tsinghua basketball team" — uses 队员 (team member) rather than 会员.', null, [ACT.vocabularyClubs]),
    createContentItem('合唱团', 'héchàng tuán', 'Choir, choral group. 团 (tuán) is used for larger performance groups: 合唱团 (choir), 舞蹈团 (dance troupe), 乐团 (orchestra). Tsinghua\'s 学生合唱团 is one of China\'s most prestigious university choirs.', 'word', '我每周三去合唱团排练。', '"I go to choir rehearsal every Wednesday" — typical weekly commitment.', null, [ACT.vocabularyClubs]),
    createContentItem('书法社', 'shūfǎ shè', 'Calligraphy society. 书法 (shūfǎ) is traditional Chinese brush calligraphy — both a fine art and a respected hobby; calligraphy clubs are common at universities and often attended by both Chinese and international students.', 'word', '书法社每周日下午有活动。', '"The calligraphy club meets every Sunday afternoon" — common scheduling.', null, [ACT.vocabularyClubs]),
    createContentItem('舞蹈社', 'wǔdǎo shè', 'Dance club. Covers everything from classical Chinese dance (古典舞) to modern, hip-hop, and ballroom. At Tsinghua, the 舞蹈社 often performs at major campus events (校庆 anniversary, 迎新晚会 freshman welcome gala).', 'word', '舞蹈社的会员很多。', '"The dance club has many members" — popularity statement.', null, [ACT.vocabularyClubs]),
    createContentItem('辩论社', 'biànlùn shè', 'Debate club. 辩论 (biànlùn) means debate or argue formally. Highly prestigious clubs at top Chinese universities — Tsinghua and Peking University compete at the national level (国际华语辩论赛).', 'word', '辩论社的人都很聪明。', '"People in the debate club are all smart" — common reputation.', null, [ACT.vocabularyClubs]),
    createContentItem('围棋社', 'wéiqí shè', 'Go (board game) club. 围棋 (wéiqí) is the traditional Chinese board game known as 碁 (Go) in Japanese and Western contexts. Strong cultural prestige; many universities have competitive Go clubs.', 'word', '围棋社每周六比赛。', '"The Go club holds matches every Saturday" — typical competitive schedule.', null, [ACT.vocabularyClubs]),
    createContentItem('爱好', 'àihào', 'Hobby, personal interest. Slightly more emotional than 兴趣 (interest) — 爱好 implies something you actively pursue and care about; 兴趣 implies curiosity. The standard question is 你的爱好是什么? ("What\'s your hobby?")', 'word', '我的爱好是摄影。', '"My hobby is photography" — standard self-description.', null, [ACT.vocabularyClubs]),
    createContentItem('新生', 'xīnshēng', 'A new student / freshman — literally "new birth/life". The primary target of 招新 (recruitment) every September. Contrasts with 老生 (lǎoshēng, "returning students"). 新生 are heavily courted by clubs in the first two weeks of fall semester.', 'word', '社团招新主要面向新生。', '"Club recruitment is mainly aimed at freshmen" — standard description of the recruitment season.', null, [ACT.vocabularyClubs]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: Leisure verbs
    // ────────────────────────────────────────────────────────────────────
    createContentItem('玩', 'wán', 'To play, hang out, have fun — very broad leisure verb. 玩游戏 (play games), 玩手机 (mess around on the phone), 出去玩 (go out and hang out). Less specific than English "play" — the object determines the meaning.', 'word', '周末我喜欢和朋友出去玩。', '"On weekends I like to go out with friends" — the all-purpose hanging-out verb.', null, [ACT.vocabularyLeisure]),
    createContentItem('休息', 'xiūxi', 'To rest, take a break — covers both short pauses (between classes) and longer rest (a day off). The second syllable xi is neutral tone. Common in workplace contexts as 休息一下 ("take a short break").', 'word', '我太累了，要休息一会儿。', '"I am too tired, I need to rest for a bit" — pairs naturally with the V + 一会儿 pattern from this lesson.', null, [ACT.vocabularyLeisure]),
    createContentItem('散步', 'sànbù', 'To take a walk, stroll — leisurely walking with no specific destination, typically after dinner or in a park. Common evening activity for older Chinese; also popular among students on tree-lined campuses like Tsinghua.', 'word', '吃完饭我们去校园里散步。', '"After dinner we take a stroll around campus" — quintessential Tsinghua leisure activity.', null, [ACT.vocabularyLeisure]),
    createContentItem('逛街', 'guàngjiē', 'To window-shop, stroll through shopping streets. Distinct from 买东西 (buy things) — 逛街 is the experience of walking around shops with no commitment to buy. Common Beijing weekend activity in 三里屯 or 王府井.', 'word', '我和朋友周末去王府井逛街。', '"My friend and I go window-shopping at Wangfujing on the weekend" — uses Beijing\'s most famous shopping street.', null, [ACT.vocabularyLeisure]),
    createContentItem('看电影', 'kàn diànyǐng', 'To watch a movie. 看 (look/watch) + 电影 (movie). Standard weekend activity for university students; cinema chains like 万达 (Wanda) and 大地 (Dadi) are everywhere in urban China.', 'word', '我一个月看两次电影。', '"I watch movies twice a month" — uses the frequency pattern from Grammar I.', null, [ACT.vocabularyLeisure]),
    createContentItem('看比赛', 'kàn bǐsài', 'To watch a sports game or competition. 比赛 covers any competition — sports, academic debates, e-sports. NBA games and Chinese Super League football are common viewing among students.', 'word', '我经常看篮球比赛。', '"I often watch basketball games" — combines 经常 frequency adverb with this verb.', null, [ACT.vocabularyLeisure]),
    createContentItem('旅游', 'lǚyóu', 'To travel for leisure, go on a trip. Distinct from 出差 (chūchāi, business travel) and 留学 (study abroad). National holiday weeks (国庆 October 1, 春节 Spring Festival) drive massive domestic tourism in China.', 'word', '我假期想去云南旅游。', '"I want to travel to Yunnan during the break" — Yunnan is one of the most popular domestic destinations.', null, [ACT.vocabularyLeisure]),
    createContentItem('看书', 'kàn shū', 'To read (books) for leisure. Note that 读书 (dúshū) is "study" in Mandarin, NOT casual reading — to say "I read for fun" you must use 看书. Avoid this common English-speaker confusion.', 'word', '我每天晚上看一会儿书。', '"I read a bit every night" — uses the V + 一会儿 pattern with the object after 一会儿.', null, [ACT.vocabularyLeisure]),
    createContentItem('打球', 'dǎ qiú', 'To play ball — covers basketball, badminton, tennis, table tennis. The verb 打 (hit) pairs with most racket and ball sports; for kicking-sports like soccer the verb is 踢 (tī). 打篮球, 打羽毛球, 打乒乓球.', 'word', '我们周末一起去打球吧。', '"Let\'s go play ball together on the weekend" — standard friend invitation.', null, [ACT.vocabularyLeisure]),
    createContentItem('唱歌', 'chàng gē', 'To sing — extremely common leisure activity in China, often at 卡拉OK / KTV which are private-room karaoke clubs. Different culture from Western public karaoke: groups of friends rent a private room with food.', 'word', '周末我们经常去KTV唱歌。', '"On weekends we often go sing at KTV" — typical urban Chinese youth leisure.', null, [ACT.vocabularyLeisure]),
    createContentItem('跳舞', 'tiào wǔ', 'To dance. 跳 (jump) + 舞 (dance) form the standard verb; the noun is 舞蹈 (wǔdǎo). 广场舞 (plaza-dance, performed by middle-aged and elderly women in public squares) is a hugely visible part of Chinese urban life.', 'word', '我妈妈每天晚上去广场跳舞。', '"My mother goes to the plaza to dance every evening" — references the 广场舞 culture.', null, [ACT.vocabularyLeisure]),
    createContentItem('健身', 'jiànshēn', 'To work out, exercise, go to the gym — covers cardio, weight training, group fitness. 健身房 (jiànshēnfáng) means gym. Has exploded in popularity in urban China since the 2010s, especially among young professionals.', 'word', '我一周健身三次。', '"I go to the gym three times a week" — uses the frequency pattern from Grammar I.', null, [ACT.vocabularyLeisure]),
    createContentItem('打游戏', 'dǎ yóuxì', 'To play video games. The verb is 打 (hit/strike), NOT 玩 (play) — a fixed collocation. Covers PC online games (网游) and mobile games (手游) alike; dominant leisure activity for university-age Chinese.', 'word', '我室友一边打游戏一边吃零食。', '"My roommate plays games while eating snacks" — uses the 一边…一边… pattern with a leisure verb pair.', null, [ACT.vocabularyLeisure]),
    createContentItem('听音乐', 'tīng yīnyuè', 'To listen to music. The verb 听 (listen) plus 音乐 (music). 网易云音乐 (NetEase Cloud Music) and QQ音乐 (QQ Music) dominate the Chinese streaming market — most students have one or both on their phones.', 'word', '我一边散步一边听音乐。', '"I listen to music while taking a walk" — another natural 一边…一边… pairing.', null, [ACT.vocabularyLeisure]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar I: Frequency adverbs and time-quantity
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '经常 + V',
      'jīngcháng + V (often + verb)',
      'The frequency adverb 经常 (jīngcháng, "often") sits DIRECTLY BEFORE the verb. Mandarin places frequency adverbs in the pre-verb slot — never at the end of the sentence as English does ("I go often"). The English-speaker trap is putting 经常 at the end.',
      'sentence',
      'CORRECT: 我经常去图书馆。("I often go to the library.")\nWRONG: 我去图书馆经常。',
      'One of the most useful adverbs in everyday Mandarin; getting the position right is half the battle.',
      [
        { target: '我 (subject) + 经常 (adverb) + V', note: 'fixed order; adverb always comes before the verb' },
        { target: '经常 jīngcháng', note: '"often, frequently"; neutral register, safe in any context' },
        { target: '总是 zǒngshì', note: '"always" — sits in the same slot but is stronger and can sound critical about other people' },
      ],
      [ACT.grammarFrequency],
    ),
    createContentItem(
      '偶尔 + V',
      'ǒu\'ěr + V (occasionally + verb)',
      'The frequency adverb 偶尔 (ǒu\'ěr, "occasionally, once in a while") also sits before the verb. Useful when 经常 would overstate the frequency. Pairs naturally with leisure activities you do sometimes but not regularly.',
      'sentence',
      '我偶尔去KTV唱歌。("I occasionally go sing at KTV.")',
      'Same slot as 经常; choose 偶尔 when honesty about a low frequency matters.',
      [
        { target: '偶尔 ǒu\'ěr', note: '"occasionally" — lower frequency than 经常 but more than 几乎不 (almost never)' },
        { target: 'frequency scale', note: '总是 always → 经常 often → 有时候 sometimes → 偶尔 occasionally → 几乎不 hardly ever → 从来不 never' },
      ],
      [ACT.grammarFrequency],
    ),
    createContentItem(
      '一周 X 次',
      'yī zhōu X cì (X times per week)',
      'Time-quantity pattern for stating an exact frequency. Structure: time-period + number + 次 ("times"). Goes AFTER the verb (and after the object if there is one) in most natural sentences. Apply 一 sandhi: 一周 → yìzhōu (rises) because 周 is first tone.',
      'sentence',
      '我一周打两次篮球。("I play basketball twice a week.")\n我一个月看一次电影。("I watch a movie once a month.")',
      'High-frequency pattern in any habit description; the time-quantity phrase typically follows the verb.',
      [
        { target: '一周 yìzhōu', note: '"per week"; 一 sandhi changes yī to yì before first-tone 周' },
        { target: '一个月 yí gè yuè', note: '"per month"; 一 sandhi changes yī to yí before fourth-tone 个' },
        { target: '一年 yì nián', note: '"per year"; 一 sandhi changes yī to yì before second-tone 年' },
        { target: 'X 次', note: 'number + 次 ("times"): 一次 once, 两次 twice, 三次 three times' },
      ],
      [ACT.grammarFrequency],
    ),
    createContentItem(
      '经常 vs 一周…次',
      'jīngcháng vs yīzhōu…cì',
      'Two ways to express frequency with different precision. 经常 is vague but warm (just means "often, regularly"); 一周三次 is exact but more clinical. Native speakers mix them: 我经常打球，一周三次 ("I often play ball — three times a week") combines warmth with precision.',
      'sentence',
      '我经常去健身。 ("I often go to the gym." — vague) vs 我一周健身三次。 ("I work out three times a week." — exact)',
      'Use 经常 in casual conversation; switch to the exact pattern when someone asks 多久一次 ("how often?").',
      [
        { target: '经常 + V', note: 'qualitative, warm; "I often do X"' },
        { target: '时间 + 数字 + 次 + V', note: 'quantitative, precise; "X times per period"' },
      ],
      [ACT.grammarFrequency],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar II: V + 一会儿
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'V + 一会儿',
      'V + yíhuìr (do something for a short while)',
      'The phrase 一会儿 (yíhuìr) goes AFTER the verb to express a short, indefinite duration ("for a bit / a little while"). Apply 一 sandhi: 一 changes from yī to yí because the following 会 is fourth tone. Standard Beijing-area pronunciation includes the 儿化 r-coloring.',
      'sentence',
      '我休息一会儿。("I am going to rest for a bit.")\n等我一会儿。("Wait for me a moment.")',
      'One of the most useful duration patterns in everyday speech; pairs with rest, wait, look, talk, and most short-duration verbs.',
      [
        { target: '休息 + 一会儿', note: '"rest for a bit"; pattern: V + 一会儿' },
        { target: '等 + 一会儿', note: '"wait a moment"' },
        { target: '一 sandhi', note: '一 (default yī) becomes yí before fourth-tone 会 — written 一 unchanged' },
        { target: '儿化 érhuà', note: 'final 儿 merges with previous syllable into r-colored huìr — Beijing-area feature' },
      ],
      [ACT.grammarYihuir],
    ),
    createContentItem(
      'V + 一会儿 + Object',
      'V + yíhuìr + Object placement',
      'When the verb takes an object, 一会儿 goes BETWEEN the verb and the object: V + 一会儿 + Object. NOT V + Object + 一会儿. This placement is fixed and common in Mandarin duration phrases.',
      'sentence',
      'CORRECT: 看一会儿电视 ("watch TV for a while")\nWRONG: 看电视一会儿',
      'A frequent English-speaker error — English puts duration at the end; Mandarin puts it between the verb and object.',
      [
        { target: '看一会儿电视', note: '"watch TV for a while" — 一会儿 between V and O' },
        { target: '看一会儿书', note: '"read for a while" — same V-一会儿-O order' },
        { target: '听一会儿音乐', note: '"listen to music for a while" — same pattern' },
      ],
      [ACT.grammarYihuir],
    ),
    createContentItem(
      '一会儿 = both duration and "in a moment"',
      'yíhuìr — two meanings',
      '一会儿 has two related meanings depending on position. After a verb it means "for a short while" (duration). Before a verb at the start of a sentence it means "in a little while / soon" (delay): 一会儿见 ("see you in a bit").',
      'sentence',
      'DURATION: 休息一会儿。("Rest for a bit.")\nDELAY: 一会儿见。("See you in a bit.")',
      'Same word, two functions; position relative to the verb tells you which one is meant.',
      [
        { target: 'V + 一会儿', note: 'duration: "do V for a short while"' },
        { target: '一会儿 + (V)', note: 'delay: "in a little while" — often standalone as 一会儿见' },
      ],
      [ACT.grammarYihuir],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar III: 一边…一边…
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '一边 V₁ 一边 V₂',
      'yìbiān V₁ yìbiān V₂ (do A while doing B)',
      'The 一边…一边… pattern expresses two simultaneous actions performed by the SAME subject. Pattern: Subject + 一边 + V₁ + 一边 + V₂. Apply 一 sandhi: 一 becomes yì before first-tone 边. Both verbs share the subject and happen at the same time.',
      'sentence',
      '我一边看电影一边吃东西。("I watch movies while eating.")\n他一边走路一边听音乐。("He listens to music while walking.")',
      'The standard pattern for "doing X while doing Y" — works for almost any pair of simultaneous activities at similar duration.',
      [
        { target: '一边 V₁ 一边 V₂', note: 'pattern: 一边 marks each simultaneous verb' },
        { target: '一 sandhi', note: '一 becomes yì (fourth tone) before first-tone 边 — written 一 unchanged' },
        { target: 'same subject', note: 'both actions must belong to the same subject; for different subjects use other connectives' },
      ],
      [ACT.grammarYibian],
    ),
    createContentItem(
      'Verbs must be similar weight',
      'similar-duration constraint',
      'Both actions in 一边…一边… should be of SIMILAR DURATION and weight — typically both ongoing activities, not one long + one momentary. Pairing 旅游 (travel) with 开门 (open the door) sounds wrong because the actions are radically different in scope.',
      'sentence',
      'GOOD: 一边走路一边打电话 (both ongoing — walk + phone call)\nODD: 一边旅游一边眨眼 (mismatched scope — travel + blink)',
      'Native ear test: both sides feel like they could continue for the same stretch of time.',
      [
        { target: 'GOOD pairings', note: '走路+打电话, 看电视+吃饭, 听音乐+学习 — all ongoing activities' },
        { target: 'AVOID', note: 'pairing a long activity with a momentary one — sounds odd to native speakers' },
      ],
      [ACT.grammarYibian],
    ),
    createContentItem(
      '一边…一边… vs 同时',
      'yìbiān vs tóngshí',
      'Two ways to say "at the same time" with different register. 一边…一边… is informal-conversational and structurally tied to two verbs. 同时 (tóngshí, "simultaneously") is more formal and can apply to many situations including non-action descriptions.',
      'sentence',
      'CASUAL: 一边吃饭一边看电视。("I eat while watching TV.")\nFORMAL: 我吃饭，同时看电视。("I eat while simultaneously watching TV.")',
      'Use 一边…一边… in everyday speech; switch to 同时 in writing or formal contexts.',
      [
        { target: '一边…一边…', note: 'conversational; binds two simultaneous verbs together rhythmically' },
        { target: '同时 tóngshí', note: 'formal; can connect any two events or describe abstract simultaneity' },
      ],
      [ACT.grammarYibian],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading and Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '社团招新海报',
      'shètuán zhāoxīn hǎibào',
      'A complete five-sentence club recruitment poster from Tsinghua\'s photography club. Read it aloud with correct tones, sandhi, and natural rhythm. Notice how nearly every sentence is short — recruitment posters favor punchy, declarative phrasing.',
      'sentence',
      '清华摄影社招新啦！我们是一个有趣的学生社团，会员有六十多人。我们一边拍照一边交朋友，活动经常很热闹。我们每周六下午三点在艺术馆有摄影课。欢迎喜欢摄影的同学加入！',
      'Translation: "The Tsinghua Photography Club is recruiting! We are a fun student club with over sixty members. We make friends while taking photos — events are often lively. We have photography classes every Saturday at 3 PM in the Art Building. Photography lovers welcome to join!"',
      [
        { target: '招新啦', note: '招新 (recruit new members) + 啦 (enthusiastic sentence-final particle) — typical poster tone' },
        { target: '有趣的学生社团', note: '"a fun student club" — 的 links the descriptive adjective 有趣 (fun) to the noun' },
        { target: '六十多人', note: '"over sixty people"; 多 after a round number means "more than"' },
        { target: '一边拍照一边交朋友', note: '"take photos while making friends" — the simultaneous-actions pattern from Grammar III' },
        { target: '活动经常很热闹', note: '"events are often lively"; 经常 (often) is the frequency adverb from Grammar I' },
        { target: '每周六下午', note: '"every Saturday afternoon"; 每周 + 六 ("every-week sixth-day") is the frequency time-phrase' },
        { target: '欢迎…加入', note: '"welcome to join…"; standard recruitment closing line' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '理解问题',
      'lǐjiě wèntí',
      'Four comprehension questions matching the poster. Answer each with a short sentence — full sentences are not required for natural Mandarin in this kind of Q&A.',
      'sentence',
      'Q1: 这是什么社团? Q2: 一共有多少会员? Q3: 什么时候有活动? Q4: 他们做什么活动?',
      'Translation: Q1: What club is this? Q2: How many members? Q3: When are the activities? Q4: What do they do?',
      [
        { target: 'A1: 摄影社。', note: 'short answer; "the photography club"' },
        { target: 'A2: 六十多人。', note: 'short numerical answer; "over sixty people"' },
        { target: 'A3: 每周六下午三点。', note: 'time-phrase answer; "every Saturday at 3 PM"' },
        { target: 'A4: 拍照和交朋友。', note: 'short list answer; "take photos and make friends"' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Listening and Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '推荐社团 (对话)',
      'tuījiàn shètuán (duìhuà)',
      'A natural six-turn dialogue between a new student and a senior at the 招新 fair. The senior recommends a club based on the new student\'s stated hobby. Covers all four micro-skills of this lesson: greet, ask about hobbies, give frequency, commit to joining.',
      'conversation',
      'A: 同学，你好！想加入哪个社团?\nB: 我还没决定。我喜欢拍照，有摄影社吗?\nA: 当然有！清华摄影社每周六下午有活动。\nB: 活动多吗?\nA: 经常有。一边学摄影一边交朋友，很有意思。\nB: 一周一次吗?\nA: 一周一次，有时候周末还有外拍。\nB: 听起来不错。我加入！',
      'A: Hi, classmate! Which club do you want to join? B: I haven\'t decided. I like taking photos — is there a photography club? A: Of course! The Tsinghua Photography Club meets every Saturday afternoon. B: Are there many activities? A: Often. You learn photography while making friends — really interesting. B: Once a week? A: Once a week, with occasional weekend outdoor shoots. B: Sounds great. I\'ll join!',
      [
        { target: '加入哪个社团', note: '"join which club"; question word 哪个 stays in object position — no movement to the front' },
        { target: '还没决定', note: '"haven\'t decided yet"; 还没 + V is the standard "not yet" pattern' },
        { target: '一边学摄影一边交朋友', note: 'the 一边…一边… pattern from Grammar III applied in a recruitment pitch' },
        { target: '一周一次', note: '"once a week"; the time-quantity pattern from Grammar I' },
        { target: '外拍 wàipāi', note: 'outdoor/location photography shoot; jargon used by photography clubs' },
        { target: '听起来不错 tīng qǐlái búcuò', note: '"sounds good"; standard positive reaction to a recommendation' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      '聊爱好 (对话)',
      'liáo àihào (duìhuà)',
      'A casual conversation between two students about hobbies and weekend leisure. Uses several frequency adverbs (经常, 偶尔) and the V + 一会儿 pattern from Grammar II.',
      'conversation',
      'A: 你周末经常做什么?\nB: 我经常和朋友打篮球，偶尔去看电影。你呢?\nA: 我喜欢看书。每天晚上看一会儿书。\nB: 真好。我也想多看书，但是太忙了。\nA: 那你一周打几次球?\nB: 一周三次，每次一个小时。\nA: 哇，你很爱运动!',
      'A: What do you usually do on weekends? B: I often play basketball with friends, occasionally go to a movie. You? A: I like to read. I read for a bit every evening. B: That\'s nice. I want to read more too, but I\'m too busy. A: How often do you play ball? B: Three times a week, an hour each time. A: Wow, you really love sports!',
      [
        { target: '周末经常做什么', note: '"what do you usually do on weekends"; 经常 (often) in the standard pre-verb slot' },
        { target: '偶尔去看电影', note: '"occasionally go to the movies"; 偶尔 as the lower-frequency alternative to 经常' },
        { target: '看一会儿书', note: '"read for a while"; V + 一会儿 + Object from Grammar II' },
        { target: '一周三次', note: '"three times a week"; time-quantity pattern from Grammar I' },
        { target: '每次一个小时', note: '"an hour each time"; common follow-up describing duration per session' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '写作模板',
      'xiězuò múbǎn',
      'A reusable five-sentence template for describing a Chinese university club. Fill in the bracketed slots with your own information — the structure carries the rest. Hits all three grammar points of this lesson.',
      'sentence',
      '我加入了[社团名]。我们社团有[人数]个会员。我们[频率词]有活动，[时间]在[地点]见面。大家一边[活动₁]一边[活动₂]，特别开心。我[频率词]参加，[感觉]。',
      'Template: I joined [club name]. We have [number] members. We have activities [frequency], meet [time] at [place]. Everyone does [activity 1] while doing [activity 2] — really fun. I attend [frequency], and it makes me feel [emotion].',
      [
        { target: '[社团名]', note: 'a real club name: 摄影社, 篮球队, 合唱团, 书法社, 舞蹈社, 辩论社, 围棋社' },
        { target: '[频率词]', note: '经常 / 偶尔 / 每周一次 / 一周两次 — pick the one that matches the truth' },
        { target: '[活动₁]…[活动₂]', note: 'the two paired activities for the 一边…一边… sentence' },
        { target: '[感觉]', note: '开心 happy / 放松 relaxed / 累 tired / 兴奋 excited — closing emotion word' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '写作练习',
      'xiězuò liànxí',
      'Write your own 4–5 sentence description of a club using the template. Use 经常 or 偶尔 at least once and either V + 一会儿 or 一边…一边… at least once so the writing demonstrates the core grammar of this lesson.',
      'sentence',
      '示例: 我加入了清华书法社。我们有四十个会员，每周日下午在艺术楼写一会儿毛笔字。一边练习一边聊天，气氛很轻松。我经常参加，觉得心情很平静。',
      'Translation: "I joined the Tsinghua Calligraphy Club. We have forty members and on Sunday afternoons we practice brush writing for a while in the Arts Building. Everyone practices and chats at the same time — the atmosphere is very relaxed. I often attend; I feel very peaceful."',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '学生社团 culture',
      'xuésheng shètuán culture',
      'Every major Chinese university has dozens to hundreds of registered 学生社团. Tsinghua has over 200, spanning academics, sports, arts, volunteering, and tech. Crucially, Chinese campus clubs are MORE student-led than at most Western universities — faculty advisors are typically minimal, and the 社长 has real authority over budget and activities.',
      'sentence',
      '清华大学有两百多个学生社团 — 学术、运动、艺术、志愿者，什么都有。',
      'Translation: "Tsinghua has over 200 student clubs — academic, sports, arts, volunteer, you name it."',
      [
        { target: '招新季 zhāoxīn jì', note: 'recruitment season; usually the first 1–2 weeks of fall semester' },
        { target: '社长 shèzhǎng', note: 'club president; has real budget and decision-making authority' },
        { target: '校级 vs 院级', note: 'school-wide clubs vs department-wide clubs; school-level are larger and more prestigious' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '双休 vs 单休',
      'shuāngxiū vs dānxiū',
      'Modern Chinese work weeks come in two formats. 双休 (two-day weekend, Saturday + Sunday off) is the standard for white-collar office work, civil service, and education. 单休 (one-day weekend, only Sunday off) is still common in retail, manufacturing, and some service industries — which shapes who has time for weekend leisure activities.',
      'sentence',
      '清华学生周末双休，所以社团活动经常在周末。',
      'Translation: "Tsinghua students have two-day weekends, so club activities are often on weekends."',
      [
        { target: '双休 shuāngxiū', note: 'two-day weekend (Sat + Sun); office workers, students, civil servants' },
        { target: '单休 dānxiū', note: 'one-day weekend (Sun only); retail, manufacturing, some service' },
        { target: '大小周 dà xiǎo zhōu', note: 'alternating double/single weekends — common in tech and finance' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '健身 boom',
      'jiànshēn boom',
      'The 健身房 (gym) boom transformed urban Chinese leisure starting in the 2010s. Chains like Will\'s (威尔仕), Pure (舒适堡), and Super Monkey (超级猩猩) opened thousands of locations. Young professionals especially treat 健身 as a lifestyle signal alongside coffee, brunch, and travel.',
      'sentence',
      '我室友每天下班以后去健身房健身一个小时。',
      'Translation: "My roommate goes to the gym for an hour every day after work."',
      [
        { target: '健身房 jiànshēnfáng', note: 'gym; the physical facility' },
        { target: '私教 sījiào', note: 'personal trainer; abbreviated form of 私人教练' },
        { target: '撸铁 lūtiě', note: 'slang "pump iron"; lift weights — informal urban youth term' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '广场舞',
      'guǎngchǎng wǔ',
      '广场舞 ("plaza dance") is a unique Chinese urban phenomenon: groups of middle-aged and elderly women (sometimes hundreds) gather in public squares every evening to dance synchronized routines to loud music. Visible in every Chinese city and a frequent topic of urban-planning debates over noise.',
      'sentence',
      '每天晚上，公园里都有阿姨跳广场舞。',
      'Translation: "Every evening, aunties dance plaza dance in the park."',
      [
        { target: '阿姨 āyí', note: 'auntie; respectful address for any middle-aged woman' },
        { target: '广场 guǎngchǎng', note: 'public plaza; the staging ground for the dance' },
        { target: '广场舞大妈', note: '"plaza-dance auntie"; affectionate-and-slightly-teasing nickname for the dancers' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '网游 / 手游',
      'wǎngyóu / shǒuyóu',
      'Online and mobile gaming dominate Chinese youth leisure. 网游 (network/online games on PC) and 手游 (mobile games) collectively employ millions and generate enormous revenue. Games like 王者荣耀 (Honor of Kings), 原神 (Genshin Impact), and 和平精英 (Peacekeeper Elite) are cultural touchstones for university-age Chinese.',
      'sentence',
      '我们宿舍的男生晚上经常一边打游戏一边聊天。',
      'Translation: "The boys in our dorm often play games while chatting in the evening."',
      [
        { target: '打游戏 dǎ yóuxì', note: '"play video games"; the verb is 打 (hit) not 玩 (play)' },
        { target: '电竞 diànjìng', note: 'e-sports; growing as both leisure and recognized competitive industry' },
        { target: '吃鸡 chī jī', note: 'slang "play battle-royale games"; literally "eat chicken" from the PUBG victory line' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '任务: 清华社团招新',
      'rènwù: Qīnghuá shètuán zhāoxīn',
      'Roleplay your first 招新 fair at Tsinghua University with the AI tutor playing the 社长 (club president) of the photography club. Use every skill from this lesson in one continuous scene — greet, ask about activities, get frequency, commit to joining.',
      'conversation',
      '[清华大学社团招新现场]\n社长: 同学，你好！欢迎来摄影社。\n你: [打招呼 + 表达兴趣]\n社长: 你以前拍过照吗?\n你: [回答 + 你的爱好]\n社长: 我们一周一次活动，周六下午三点在艺术馆。你的时间合适吗?\n你: [频率词 + 确认时间]\n社长: 我们经常一边拍照一边聊天，特别有意思。\n你: [反应 + 加入决定]\n社长: 太好了，欢迎加入!\n你: [告别]',
      'Six turns of fluent exchange; the AI tutor will prompt you and respond naturally to whatever you say.',
      [
        { target: '打招呼', note: '同学好 / 你好 — match the 社长\'s opening register' },
        { target: '表达兴趣', note: '我想加入 / 我对摄影很有兴趣 — declare your reason for stopping at the table' },
        { target: '频率词', note: '经常 / 偶尔 / 每周 — use one of the frequency expressions from Grammar I' },
        { target: '一边…一边…', note: 'reuse the simultaneous-actions pattern when describing what you want to do in the club' },
        { target: '加入决定', note: '我加入！ / 让我考虑一下 — commit to joining or politely defer' },
        { target: '告别', note: '谢谢，再见 / 周六见 — match the recruitment-fair register' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战 — 礼貌拒绝',
      'tiǎozhàn — lǐmào jùjué',
      'Stretch goal: in the same scene, you decide the photography club is not the right fit (maybe the time conflicts with your classes). Politely decline without making the 社长 lose face — use 不好意思 (sorry) + a reason + 谢谢 (thank you).',
      'conversation',
      '社长: 我们一周六次活动。你想加入吗?\n你: 不好意思，我一周已经有三个社团了，时间不够。\n社长: 没关系，下次有兴趣再来。\n你: 好的，谢谢你！',
      'Translation: Club president: "We have six activities a week. Want to join?" You: "Sorry, I already have three clubs a week — not enough time." Club president: "No problem, drop by again if interested." You: "OK, thanks!"',
      [
        { target: '不好意思 bù hǎoyìsi', note: 'mild apology, used to soften a refusal; lighter than 对不起' },
        { target: '时间不够 shíjiān bú gòu', note: '"don\'t have enough time"; the universal polite refusal reason in Chinese context' },
        { target: '没关系 méi guānxi', note: '"no problem"; standard response to any small apology' },
        { target: '下次有兴趣再来', note: '"come back next time if interested"; classic face-saving closing from the recruiter side' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
