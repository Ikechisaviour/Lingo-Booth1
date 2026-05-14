// Level 2 Adult Unit 6 — 室友与合租生活 (Roommates & Living Together)
// Functions: name living-together vocabulary, raise grievances politely,
// propose chore rotations and shared-cost agreements, navigate landlords
// and property management in Beijing 合租 reality, and use the causative-
// permissive 让 verb, the descriptive 又…又… coordination, and 是不是
// confirmation questions to negotiate without conflict.
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
  orientation: 'zh-l2au6-orientation',
  pronunciation: 'zh-l2au6-pronunciation',
  vocabularyLiving: 'zh-l2au6-vocab-living',
  vocabularyGrievance: 'zh-l2au6-vocab-grievance',
  grammarRang: 'zh-l2au6-grammar-rang',
  grammarYouYou: 'zh-l2au6-grammar-you-you',
  grammarShiBuShi: 'zh-l2au6-grammar-shi-bu-shi',
  reading: 'zh-l2au6-reading',
  listening: 'zh-l2au6-listening',
  writing: 'zh-l2au6-writing',
  culture: 'zh-l2au6-culture',
  task: 'zh-l2au6-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Describe your roommate situation and shared living space at Tsinghua University or in a Beijing 合租 apartment using domain-specific vocabulary (室友, 房东, 房租, 公共区域).',
      'Raise a grievance about something a roommate does — left dishes, loud noise, unclean common area — without sounding accusatory, using polite confirmation questions and softeners.',
      'Propose a fair shared-living agreement (chore rotation, split costs, quiet hours) using 让, 商量, 轮流, and 分担 to keep the tone collaborative rather than confrontational.',
    ],
    task: 'Imagine you and a Tsinghua roommate have a conflict — they leave dishes in the sink for days. By the end of this lesson, you should be able to politely raise the issue and propose a chore rotation in Mandarin, all in one continuous conversation.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in this lesson',
    goals: [
      'Distinguish the retroflex initial sh- (室友 shìyǒu, 是不是 shì bu shì) from the palatal initial x- (洗碗 xǐ wǎn, 商量 shāngliang) — confusing them creates very different words.',
      'Handle the long vowel sequences and tone contrasts in 押金 (yājīn, 1+1), 房东 (fángdōng, 2+1), and 公共 (gōnggòng, 1+4) — all high-frequency words you will use whenever the topic is housing.',
      'Apply 不 sandhi inside 是不是 (shì bu shì): the middle 不 reduces to a neutral-tone "bu" because it is sandwiched between two stressed syllables in a confirmation question.',
    ],
    task: 'Read each example aloud three times, paying attention to the retroflex/palatal contrast and the neutral-tone reduction of 不 in 是不是 questions.',
  },
  {
    id: ACT.vocabularyLiving,
    section: 'Vocabulary I',
    title: 'Roommates, landlords, and the shared apartment',
    goals: [
      'Use the core living-together vocabulary: 室友 (roommate), 合租 (co-rent / share an apartment), 房东 (landlord), 押金 (deposit), 房租 (rent), 水电费 (utilities), 物业 (property management), 公共区域 (common area).',
      'Use the daily-chore and shared-space vocabulary: 卫生 (hygiene), 打扫 (clean), 倒垃圾 (take out trash), 洗碗 (wash dishes), 邻居 (neighbor).',
    ],
    task: 'Describe your current or hypothetical living arrangement in 4–5 sentences, using at least 6 of the new vocabulary items.',
  },
  {
    id: ACT.vocabularyGrievance,
    section: 'Vocabulary II',
    title: 'Grievances, agreements, and softeners',
    goals: [
      'Voice grievances politely: 太吵了 (too loud), 太脏了 (too dirty), 不公平 (unfair), 影响 (affect / disturb someone) — combined with hedges so the complaint lands without confrontation.',
      'Propose agreements collaboratively: 轮流 (take turns), 分担 (share / split costs), 商量 (discuss), 互相 (mutually) — the toolkit for fixing the grievance rather than just airing it.',
    ],
    task: 'For each of three grievances (noise, dirt, unfair workload), pair it with one matching agreement word and write the resulting two-sentence pattern.',
  },
  {
    id: ACT.grammarRang,
    section: 'Grammar I',
    title: '让 X V — have/make/let X do something',
    goals: [
      'Use 让 (ràng) as the all-purpose causative-permissive verb: 让 X V can mean "have X do V", "make X V", or "let X V" depending on context. Pattern: SUBJECT + 让 + OBJECT (the do-er) + VERB.',
      'Combine 让 with softeners (能不能, 可不可以) to turn a request into a polite proposal: 能不能让我们商量一下? ("Could we please discuss this?") — much softer than the bare imperative.',
      'Negate with 不 placed BEFORE 让 to deny permission: 房东不让我们养宠物 ("The landlord doesn\'t let us keep pets") — never insert 不 between 让 and the verb.',
    ],
    task: 'Write 4 sentences using 让: two causative ("ask someone to do X"), one permissive ("allow someone to do X"), and one negative ("not allow someone to do X").',
  },
  {
    id: ACT.grammarYouYou,
    section: 'Grammar II',
    title: '又…又… — both… and…',
    goals: [
      'Use 又…又… to coordinate two qualities of the same subject — "both A and B" — when describing people, rooms, or situations. Pattern: SUBJECT + 又 + ADJ/V1 + 又 + ADJ/V2.',
      'Apply 又…又… specifically to roommate and room descriptions: 这个房间又小又脏 ("This room is both small and dirty"), 我的室友又懒又吵 ("My roommate is both lazy and loud").',
      'Distinguish 又…又… (parallel qualities of the SAME subject, simultaneous) from 既…又… (more formal, written register) and from 一边…一边… (two ACTIONS happening at the same time).',
    ],
    task: 'Describe three things in your living space — yourself, your roommate, your apartment — using 又…又… for each, one positive description and two complaints.',
  },
  {
    id: ACT.grammarShiBuShi,
    section: 'Grammar III',
    title: '是不是 + clause — softer confirmation/suggestion questions',
    goals: [
      'Use 是不是 + CLAUSE to soften a direct accusation or suggestion into a confirmation question: 你是不是觉得… ("Do you happen to feel that…?"). The 是不是 invites agreement rather than demanding it.',
      'Position 是不是 either at the start (是不是你忘了倒垃圾?) or right before the verb (你是不是忘了倒垃圾?) — both work, but the second is more conversational and slightly softer.',
      'Distinguish 是不是 confirmation from 吗 yes/no questions: 你忘了倒垃圾吗? sounds neutral, 你是不是忘了倒垃圾? presupposes the answer is "yes" and invites the listener to admit it gently.',
    ],
    task: 'Rewrite three direct grievances ("you didn\'t wash the dishes", "the rent is too high", "the apartment is dirty") as 是不是 questions that invite admission rather than demand it.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'A Tsinghua dorm group-chat exchange',
    goals: [
      'Read a 4-message WeChat group-chat exchange between three Tsinghua roommates negotiating a chore rotation, applying the new vocabulary and grammar in a natural digital-communication register.',
      'Answer four short comprehension questions about the proposed rotation, the disagreement, and how it gets resolved using 让, 商量, 轮流.',
    ],
    task: 'Read the group chat aloud once, then answer the four comprehension questions in short Mandarin sentences.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: '合租谈判 — a Beijing share-flat negotiation',
    goals: [
      'Follow a 6-turn conversation between a fresh-graduate tenant and a 二房东 (sublet landlord) about deposit, rent, utilities, and common-area cleaning rules in a Beijing share-flat.',
      'Reproduce the dialogue with your own numbers and concerns, recognizing the register markers that distinguish landlord-tenant talk from peer-to-peer roommate talk.',
    ],
    task: 'Read the dialogue along with the tutor first, then perform it again with your own preferred rent, deposit, and concerns swapped in.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Write a roommate agreement',
    goals: [
      'Write a 5–7 sentence Mandarin roommate agreement (室友协议) covering chores, quiet hours, guests, and shared-expense splits.',
      'Use 让 at least twice, 又…又… at least once, and 是不是 at least once so the writing demonstrates all three grammar points of this lesson.',
    ],
    task: 'Write your own short roommate agreement using the model on the right, then read it aloud with correct tones.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: '中国大学宿舍文化与北京合租 — From Tsinghua dorms to Beijing share-flats',
    goals: [
      'Know that Chinese university dorms typically house 4–6 students per room with shared communal bathrooms (older buildings have only floor-level showers), creating a no-privacy norm that shapes how roommate conflicts are negotiated.',
      'Understand the Beijing 合租 (share-flat) economy fresh graduates face: 10 m² rooms inside a 4-bedroom apartment, 中介 (real-estate broker) commissions of one month\'s rent, and 二房东 (illegal sublet "secondary landlords") who hold the master lease.',
      'Recognize the 燕郊 (Yanjiao) commuter satellite town phenomenon — "离北京只有一站地的燕郊" — where many graduates live because rents inside Beijing\'s sixth ring are unaffordable.',
    ],
    task: 'In 3–4 sentences, compare the Chinese university dorm + Beijing 合租 reality with the housing situation of fresh graduates in your home country.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: '过任务: Raising the dishes-in-the-sink issue',
    goals: [
      'Combine every skill from this lesson into one continuous conversation: greet the roommate, raise the grievance (dishes left for days) using 是不是, propose a 轮流 chore rotation using 让, and close with agreement.',
      'Maintain a collaborative tone throughout — use 商量, 互相, and 分担 to keep the conversation as a joint problem-solving exercise, not an accusation.',
    ],
    task: 'Roleplay the scene with the tutor playing your Tsinghua roommate; aim for a 6-turn exchange that resolves the issue with a concrete rotation agreement.',
  },
];

const lesson = {
  title: 'Level 2 (Adult) · Unit 6: 室友与合租生活 (Roommates & Living Together)',
  category: 'daily-life',
  difficulty: 'intermediate',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'adult',
  activities,
  expressionPractice: [
    { id: 'raising-grievance', label: 'Raising a roommate grievance', goal: 'Use 是不是 + clause to surface a complaint (dishes, noise, dirt) as a confirmation question rather than a direct accusation.' },
    { id: 'proposing-rotation', label: 'Proposing a chore rotation', goal: 'Use 让 + 轮流 + 商量 to suggest taking turns on chores without sounding bossy.' },
    { id: 'describing-roommate', label: 'Describing a roommate or room', goal: 'Use 又…又… to coordinate two qualities ("both quiet and clean", "both small and dirty") of the same subject in one sentence.' },
    { id: 'negotiating-landlord', label: 'Negotiating with a landlord', goal: 'Discuss 房租, 押金, 水电费, and 物业 with a 房东 or 二房东 using a polite but firm register.' },
  ],
  relatedPools: ['topic-people', 'topic-daily-life'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '本课目标',
      'běn kè mùbiāo',
      'By the end of this lesson you can describe a Tsinghua dorm or Beijing share-flat, raise a roommate grievance politely without sounding accusatory, and propose a fair chore rotation — all in one continuous Mandarin conversation.',
      'word',
      'Functional language: 描述合住空间 miáoshù hézhù kōngjiān (describe shared space) · 提出问题 tíchū wèntí (raise an issue) · 商量解决方案 shāngliang jiějué fāng\'àn (discuss solutions) · 达成协议 dáchéng xiéyì (reach an agreement)',
      'These four micro-skills together form the toolkit any cohabiting adult needs in a Mandarin-speaking environment, from university dorms to share-flats to married life.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      '真实场景',
      'zhēnshí chǎngjǐng',
      'You and your roommate share a 4-person room in Tsinghua University\'s 紫荆 dormitory. For four days running, your roommate has left used dishes in the sink. You want to address it without damaging the relationship — both of you have another year together in this room.',
      'word',
      'You: "小王，咱们是不是商量一下打扫的事?" Roommate: "对不起，我最近实验太忙了…"',
      'A typical opener combining the soft 是不是 confirmation question with the collaborative 咱们 ("we, you-and-I") — the Mainland-Mandarin signal that this is a joint problem, not a one-sided complaint.',
      [
        { target: '咱们 zánmen', note: '"we" — inclusive of the listener; warmer and more collaborative than 我们 in northern-Mandarin speech' },
        { target: '是不是 shì bu shì', note: 'softens the question into a confirmation: "could it be that we should…?"' },
        { target: '商量一下 shāngliang yīxià', note: '"have a brief discussion" — the 一下 makes the request low-stakes and casual' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '三种合住情境',
      'sān zhǒng hézhù qíngjìng',
      'Mandarin speakers in 2026 China usually live in one of three shared-living arrangements. (1) University dorm: 4–6 person rooms, shared bathrooms, no privacy. (2) Beijing/Shanghai 合租: 10 m² private room inside a 3–4 bedroom apartment, peer-roommates. (3) 二房东 sublet: an unofficial landlord who took the master lease and re-rents room by room.',
      'word',
      '宿舍 sùshè (dorm) · 合租房 hézūfáng (share-flat) · 二房东 èrfángdōng (sublet landlord)',
      'Each arrangement has its own conflict patterns and its own register — dorm conflicts go through 宿管 (dorm warden), share-flat conflicts are negotiated peer-to-peer, sublet conflicts often involve the 二房东 dodging responsibility.',
      [
        { target: '宿舍 sùshè', note: 'university or company dormitory; 4–6 students per room is standard at Tsinghua and similar schools' },
        { target: '合租房 hézūfáng', note: 'a private market apartment shared by unrelated working adults; the typical arrangement for Beijing fresh graduates' },
        { target: '二房东 èrfángdōng', note: '"secondary landlord" — someone who rents the whole apartment then sublets rooms, often without the real owner\'s permission' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '室友',
      'shìyǒu',
      'Two-syllable word with the retroflex initial sh- in the first syllable (室 shì) and a clear glide y- in the second (友 yǒu). The tone pattern is 4+3 — sharp fall, then dip-and-rise — a common rhythm in Chinese two-syllable nouns.',
      'word',
      '我的室友是清华大学的学生 wǒ de shìyǒu shì Qīnghuá Dàxué de xuéshēng',
      'Note the retroflex sh- in both 室 (shì) and 是 (shì) — repeated in the same sentence; tongue tip curls back for both.',
      [
        { target: '室 (shì, 4th)', note: 'retroflex sh- — tongue tip curled back; "room"' },
        { target: '友 (yǒu, 3rd)', note: 'glide y- + diphthong -ou + 3rd tone; "friend"' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '押金',
      'yājīn',
      'Two first-tone syllables held high and level (yā jīn). The initial y- in 押 is a spelling convention for i-, and the initial j- in 金 is the palatal series — tongue flat and forward, NOT retroflex. A common landlord-tenant word.',
      'word',
      '房东要两个月的押金 fángdōng yào liǎng ge yuè de yājīn',
      'Two first tones — keep the pitch flat and high for both syllables; do not let the second one droop into a fourth tone.',
      [
        { target: '押 (yā, 1st)', note: 'glide y- + a + 1st tone; "to pledge" or in this compound "deposit"' },
        { target: '金 (jīn, 1st)', note: 'palatal j- + in + 1st tone; "gold / money"' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '房东',
      'fángdōng',
      'A 2+1 tone pattern — rising tone on 房 (fáng) followed by a high-level tone on 东 (dōng). The initial f- is the same as English, and the -ang/-ong nasals are clearly distinguished: 房 ends in -ang (mouth open), 东 ends in -ong (lips rounded).',
      'word',
      '我们的房东人很好 wǒmen de fángdōng rén hěn hǎo',
      'Practice the 2+1 rhythm by saying it three times — the second syllable must stay high, not droop.',
      [
        { target: '房 (fáng, 2nd)', note: 'rising tone + -ang nasal; "house" or "room"' },
        { target: '东 (dōng, 1st)', note: 'high-level tone + -ong nasal; "east", here used as the agentive suffix' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '公共',
      'gōnggòng',
      'A 1+4 tone contrast — high-level on 公 (gōng), then sharp falling on 共 (gòng). Note that BOTH syllables end in -ong and BOTH start with g- (unaspirated); the only difference is the tone. Native speakers rely entirely on that tone contrast.',
      'word',
      '公共区域要保持卫生 gōnggòng qūyù yào bǎochí wèishēng',
      'A classic minimal-pair pattern — same initials and finals, different tones produce different syllables and a complete word.',
      [
        { target: '公 (gōng, 1st)', note: 'high level + -ong; "public / shared"' },
        { target: '共 (gòng, 4th)', note: 'sharp falling + -ong; "together / common"' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '是不是',
      'shì bu shì',
      'Three syllables but only two carry full stress. The first 是 (shì) and final 是 (shì) are full fourth tones; the middle 不 reduces to neutral-tone "bu" because it is sandwiched between two stressed syllables in this confirmation-question structure. Written tones never change, only spoken stress.',
      'word',
      '你是不是忘了洗碗? nǐ shì bu shì wàng le xǐ wǎn?',
      'The reduced "bu" is what makes the question sound natural and conversational — say the middle 不 with full fourth tone and you sound robotic.',
      [
        { target: '是 (shì, 4th, full)', note: 'first 是 stays full fourth tone; carries the question stress' },
        { target: '不 (bu, neutral)', note: 'middle 不 reduces to short, light neutral-tone "bu" between the two 是' },
        { target: '是 (shì, 4th, full)', note: 'final 是 also full fourth tone; closes the confirmation frame' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '洗碗',
      'xǐ wǎn',
      'A 3+3 tone pair that triggers third-tone sandhi: the first 洗 (xǐ) is spoken as a rising (second) tone, while 碗 (wǎn) keeps its full dip-and-rise. Both initials are unfamiliar to English speakers — palatal x- on the first, glide w- on the second.',
      'word',
      '我每天洗碗 wǒ měi tiān xǐ wǎn (sandhi: wǒ měi tiān xí wǎn — actually wǒ → wó too because 我每 = 3+3)',
      'A chain of third tones may stack multiple sandhi shifts: in 我每天洗碗, both 我 and 洗 effectively rise to second tone in fluent speech.',
      [
        { target: '洗 (written: xǐ, 3rd)', note: 'would be full third tone in isolation; sandhi shifts it to rising' },
        { target: '洗 (spoken: xí, 2nd)', note: 'rises because the next syllable is also third tone' },
        { target: '碗 (wǎn, 3rd)', note: 'keeps the full dip-and-rise as the final third tone in the phrase' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Roommates, landlords, shared apartment
    // ────────────────────────────────────────────────────────────────────
    createContentItem('室友', 'shìyǒu', 'Roommate — anyone you share a bedroom or apartment with; covers both dorm roommates and 合租 share-flat housemates. The closest English equivalent is "roommate", and like English it does not imply close friendship — just shared space.', 'word', '我和我的室友是同班同学。', 'A typical Tsinghua context: roommates are often also classmates, especially in undergraduate dorms where rooms are assigned by major.', null, [ACT.vocabularyLiving]),
    createContentItem('合租', 'hézū', 'To co-rent / share an apartment — the verb (or modifier) for the Beijing/Shanghai fresh-graduate housing reality where 3–4 unrelated adults each rent one bedroom in a single apartment. Distinct from 同居 (tóngjū, "cohabit" with a romantic partner).', 'word', '我和两个同事合租一套三居室。', '"I co-rent a three-bedroom apartment with two colleagues" — the standard arrangement for first-job Beijing graduates.', null, [ACT.vocabularyLiving]),
    createContentItem('房东', 'fángdōng', 'Landlord — the official owner who holds the property and signs the lease. In Beijing 合租 reality the actual contact may be a 二房东 (sublet landlord) rather than the real 房东; check whose name is on the lease.', 'word', '房东每个月十号来收房租。', 'A common landlord routine — collecting rent in person on a fixed monthly date.', null, [ACT.vocabularyLiving]),
    createContentItem('押金', 'yājīn', 'Security deposit — usually equal to one month\'s rent (一个月押金) or two (二押), refunded at move-out minus damages. Notorious for disputes; many Beijing landlords find reasons to withhold part or all of it. Always document apartment condition with photos at move-in.', 'word', '押二付一 yā èr fù yī — "two months deposit, pay one month forward" — a common rent structure.', '"押二付一" is one of three standard rent-payment structures along with 押一付三 (1 deposit + 3 months forward) and 押一付一 (1+1, lowest barrier to entry but disliked by landlords).', null, [ACT.vocabularyLiving]),
    createContentItem('房租', 'fángzū', 'Rent — the monthly housing payment. Beijing share-flat rents in 2026 range from ¥2,500–¥5,000 per room depending on ring road and proximity to subway. Often does NOT include utilities (水电费 charged separately) or property fee (物业费).', 'word', '我每个月的房租是三千五。', '"My rent is 3,500 a month" — a typical Beijing 合租 room price near the fourth ring road.', null, [ACT.vocabularyLiving]),
    createContentItem('水电费', 'shuǐdiànfèi', 'Utilities — literally "water-electricity fee", though in practice it covers water, electricity, and often gas. Split evenly among 合租 roommates each month; one person usually fronts the bill and the others 转账 (zhuǎnzhàng, transfer) their share via WeChat.', 'word', '水电费这个月一共四百块，每人一百。', '"Utilities are 400 total this month, 100 per person" — the standard 4-roommate split phrasing.', null, [ACT.vocabularyLiving]),
    createContentItem('物业', 'wùyè', 'Property management — the building-level company that handles common-area cleaning, elevator maintenance, security, and resident complaints. Separate from the landlord; you pay them a 物业费 (property fee) on top of rent. Calling them for a leaky pipe is faster than calling the landlord.', 'word', '物业，我们家厨房漏水了。', '"Property management, our kitchen is leaking" — the standard opening when calling in a maintenance issue.', null, [ACT.vocabularyLiving]),
    createContentItem('公共区域', 'gōnggòng qūyù', 'Common area — the shared spaces in a 合租 apartment: kitchen (厨房), living room (客厅), bathroom (卫生间), hallway (走廊). The places where most roommate conflicts originate because no one feels personal responsibility for them.', 'word', '公共区域要轮流打扫。', '"Common areas have to be cleaned in rotation" — the foundational rule of any functional 合租 arrangement.', null, [ACT.vocabularyLiving]),
    createContentItem('卫生', 'wèishēng', 'Hygiene / cleanliness — both the abstract noun and the practical state of "being clean". 搞卫生 (gǎo wèishēng) is a common colloquial verb phrase meaning "do the cleaning", interchangeable with 打扫卫生.', 'word', '室友很注意卫生。', '"My roommate is very mindful of hygiene" — a compliment that signals you got a good roommate.', null, [ACT.vocabularyLiving]),
    createContentItem('打扫', 'dǎsǎo', 'To clean — usually the larger sweep-mop-wipe routine, distinct from 擦 (cā, "to wipe a specific surface") or 洗 (xǐ, "to wash with water"). 打扫房间 (clean the room), 打扫卫生间 (clean the bathroom).', 'word', '今天轮到我打扫客厅。', '"Today it\'s my turn to clean the living room" — combines 轮到 (it\'s X\'s turn) with 打扫.', null, [ACT.vocabularyLiving]),
    createContentItem('倒垃圾', 'dào lājī', 'Take out the trash — literally "pour/dump trash". In Beijing 2026 trash sorting (垃圾分类) is mandatory: 厨余 (kitchen waste), 可回收 (recyclables), 有害 (hazardous), 其他 (other). Throwing all four in one bag will get the bag rejected and brought back.', 'word', '今天我倒垃圾，明天你倒。', '"Today I take out the trash, tomorrow you do" — the simplest possible rotation pattern.', null, [ACT.vocabularyLiving]),
    createContentItem('洗碗', 'xǐ wǎn', 'Wash dishes — literally "wash bowls". Includes washing pots, pans, and chopsticks too; 洗碗 covers all dishwashing as a category. The single most-cited source of roommate conflict in Chinese share-flats.', 'word', '谁做饭谁洗碗?还是分开?', '"Whoever cooks, washes? Or split it?" — the classic chore-rotation negotiation opener.', null, [ACT.vocabularyLiving]),
    createContentItem('噪音', 'zàoyīn', 'Noise — the formal/technical word for noise as a problem, distinct from 声音 (shēngyīn, "sound" in general). 噪音 carries a negative connotation: 噪音污染 ("noise pollution"). Often heard in 物业 complaints and city ordinances.', 'word', '楼上的噪音太大了。', '"The noise from upstairs is too loud" — a standard 物业 complaint about a neighbor.', null, [ACT.vocabularyLiving]),
    createContentItem('邻居', 'línjū', 'Neighbor — the person in the next room, apartment, or unit. In a 合租 context, your "neighbor" can be the person in the bedroom next to yours behind the same front door. Building-level neighbors are 楼上的邻居 (upstairs) and 楼下的邻居 (downstairs).', 'word', '我们和邻居关系很好。', '"We have a good relationship with our neighbors" — a positive note about the building dynamic.', null, [ACT.vocabularyLiving]),
    createContentItem('中介', 'zhōngjiè', 'Real-estate broker / agent — the middleman who shows apartments to tenants. Standard commission is 一个月房租 (one full month\'s rent), paid upfront on top of deposit and first month — often the largest single move-in cost. Platforms like 链家 (Lianjia) dominate the Beijing market.', 'word', '中介费要一个月房租，太贵了。', '"The broker fee is a full month\'s rent, way too expensive" — a near-universal Beijing fresh-graduate complaint.', null, [ACT.vocabularyLiving]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: Grievances + agreements
    // ────────────────────────────────────────────────────────────────────
    createContentItem('太吵了', 'tài chǎo le', 'Too loud / too noisy — the standard grievance phrase. 太…了 is the universal "too…!" frame, and 吵 (chǎo) is the everyday word for "noisy / loud / annoying". Used for music, TV, neighbors, construction, and arguing roommates alike.', 'word', '你的音乐太吵了，能不能小一点儿?', '"Your music is too loud, could you turn it down a bit?" — pairs the complaint with a softening 能不能 request.', null, [ACT.vocabularyGrievance]),
    createContentItem('太脏了', 'tài zāng le', 'Too dirty — the cleanliness-grievance counterpart of 太吵了. Used for common areas, dishes, bathroom, and clothes. 脏 (zāng) is the basic word for "dirty"; the milder 不干净 (bù gānjìng, "not clean") sounds less accusatory.', 'word', '厨房太脏了，咱们一起打扫一下吧。', '"The kitchen is too dirty, let\'s clean it together" — pairs the complaint with a collaborative 咱们 + 一起 proposal so it does not sound one-sided.', null, [ACT.vocabularyGrievance]),
    createContentItem('不公平', 'bù gōngpíng', 'Unfair — the structural-grievance phrase for situations where workload is uneven. 公平 (gōngpíng, "fair") is a high-stakes word in Chinese culture; using 不公平 directly signals you feel you are being mistreated, so save it for genuine inequity.', 'word', '我每天洗碗，你都不洗，这样不公平。', '"I wash dishes every day and you never do — this isn\'t fair" — a direct grievance combining the routine complaint with the structural framing.', null, [ACT.vocabularyGrievance]),
    createContentItem('影响', 'yǐngxiǎng', 'To affect / disturb (someone) — a high-frequency complaint verb when you do not want to use the harsher 打扰 (dǎrǎo, "bother") or 干扰 (gānrǎo, "interfere"). 影响 sounds diagnostic rather than accusatory: "your X is affecting my Y" feels like reporting a fact, not assigning blame.', 'word', '你的音乐影响我学习。', '"Your music is affecting my studying" — a softer way to say "your music is disturbing me", common in dorm conflicts.', null, [ACT.vocabularyGrievance]),
    createContentItem('受不了', 'shòubuliǎo', 'Can\'t stand (it) — the dramatic-grievance phrase reserved for situations that have reached a limit. 受 (shòu, "to receive/bear") + 不 + 了 ("able to"); literally "cannot bear it any longer". Use sparingly; saying it about a roommate is a significant escalation.', 'word', '他每天晚上打游戏到三点，我真的受不了了。', '"He plays games until 3 AM every night, I really can\'t take it anymore" — venting to a friend, not yet a face-to-face complaint.', null, [ACT.vocabularyGrievance]),
    createContentItem('麻烦', 'máfan', 'Bothersome / a hassle — both noun and adjective. 麻烦 covers everything from "inconvenient" to "a real headache". 给你添麻烦了 ("I added trouble for you") is a standard polite acknowledgment when you have inconvenienced someone.', 'word', '不好意思，麻烦你帮我倒一下垃圾。', '"Sorry to bother you, could you take out the trash for me?" — combines 麻烦 with 一下 to keep the request low-stakes.', null, [ACT.vocabularyGrievance]),
    createContentItem('轮流', 'lúnliú', 'Take turns / rotate — the foundational chore-rotation verb. Pattern: 轮流 V or 轮流做 N. The English "rotation" maps directly onto 轮流, and proposing 轮流 anything is the standard way to convert a recurring grievance into a fair schedule.', 'word', '我们轮流洗碗吧。', '"Let\'s take turns washing dishes" — the canonical opening of a chore-rotation proposal.', null, [ACT.vocabularyGrievance]),
    createContentItem('分担', 'fēndān', 'Share / split (a burden or cost) — used for costs (分担房租, "split the rent"), workload (分担家务, "share the housework"), and responsibility (分担责任, "share the responsibility"). Different from 分 (fēn, "to divide") because 分担 emphasizes shouldering something difficult together.', 'word', '水电费咱们四个人分担。', '"Let\'s split the utilities four ways among us" — combines 分担 with 咱们 to make the cost-split collaborative.', null, [ACT.vocabularyGrievance]),
    createContentItem('商量', 'shāngliang', 'To discuss / consult — the collaborative-conversation verb specifically used when you want input before deciding. Crucially DIFFERENT from 讨论 (tǎolùn, "discuss" in a more formal/intellectual sense) — 商量 implies "let\'s figure something out together as equals".', 'word', '咱们商量一下打扫卫生的事。', '"Let\'s discuss the cleaning situation" — the standard opener for a roommate negotiation; the 一下 softens it further.', null, [ACT.vocabularyGrievance]),
    createContentItem('互相', 'hùxiāng', 'Mutually / each other — an adverb placed BEFORE a verb to mean "do V to each other". Pattern: SUBJECT(plural) + 互相 + V. 互相帮助 ("help each other"), 互相理解 ("understand each other"), 互相尊重 ("respect each other") — common in roommate-agreement language.', 'word', '室友之间应该互相理解。', '"Roommates should understand each other" — the standard appeal to mutual goodwill in any conflict-resolution conversation.', null, [ACT.vocabularyGrievance]),
    createContentItem('达成协议', 'dáchéng xiéyì', 'Reach an agreement — the formal phrase for closing a successful negotiation. 达成 (dáchéng, "achieve / reach") + 协议 (xiéyì, "agreement"). Sounds slightly more weighty than 同意 (tóngyì, "agree"); use it when you want to mark the end of a negotiation, not a single yes/no.', 'word', '我们达成协议了:轮流洗碗，每周打扫两次。', '"We reached an agreement: take turns washing dishes, clean twice a week" — the formal "agreement reached" closing of a roommate meeting.', null, [ACT.vocabularyGrievance]),
    createContentItem('能不能', 'néng bu néng', 'Could you / can you (please)? — the softer "can you" question form. Adding 能不能 in front of a request transforms it from imperative to polite proposal. Even softer with the diminutive 一下 (yīxià) after the verb. The default polite-request softener in Mainland Mandarin.', 'word', '能不能麻烦你小声一点儿?', '"Could I trouble you to be a bit quieter?" — a maximally polite noise-complaint phrasing combining 能不能 + 麻烦 + 一点儿.', null, [ACT.vocabularyGrievance]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar I: 让 X V
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '让 X V — causative/permissive',
      'ràng X V',
      'The all-purpose causative-permissive verb. Pattern: SUBJECT + 让 + OBJECT (do-er) + VERB. Translates as "have X do V", "make X V", or "let X V" depending on context. Mandarin does not distinguish "make" vs "let" lexically — 让 covers both, and tone of voice or context disambiguates.',
      'sentence',
      '让我看看 ràng wǒ kànkan ("let me take a look")\n房东让我们交押金 fángdōng ràng wǒmen jiāo yājīn ("the landlord has us pay the deposit")\n他让我等了一个小时 tā ràng wǒ děng le yī ge xiǎoshí ("he made me wait an hour")',
      'Same 让 in all three sentences — context (a request, an instruction, a complaint) determines whether it reads as "let", "have", or "make" in English.',
      [
        { target: 'SUBJECT + 让 + OBJECT + V', note: 'the core pattern; OBJECT is whoever ends up doing the verb' },
        { target: '"让" = causative or permissive', note: 'covers both "have someone do" and "let someone do"; English splits these but Chinese does not' },
        { target: 'tone disambiguates', note: 'a forceful 让 reads as "make"; a soft 让 reads as "let"' },
      ],
      [ACT.grammarRang],
    ),
    createContentItem(
      '让 X V — polite proposal',
      'ràng X V — polite use',
      'Combine 让 with the softener 能不能 to turn a request into a polite proposal: 能不能让我们… ("Could we please…?"). This is the most useful form for roommate negotiations — it positions the speaker as inviting permission rather than asserting.',
      'sentence',
      '能不能让咱们商量一下打扫的事? néng bu néng ràng zánmen shāngliang yīxià dǎsǎo de shì?',
      'Translation: "Could we have a chat about the cleaning situation?" — combines 能不能 (softener) + 让 (causative) + 咱们 (inclusive we) + 一下 (low-stakes marker). A maximally collaborative opening.',
      [
        { target: '能不能 néng bu néng', note: 'opens the request softly: "could (we/you)…?"' },
        { target: '让 ràng', note: 'introduces the do-er; here "let us…"' },
        { target: '咱们 zánmen', note: 'inclusive "we, you-and-I"; warmer than 我们 in northern Mandarin' },
        { target: '一下 yīxià', note: 'low-stakes diminutive; "for a moment", makes the request small' },
      ],
      [ACT.grammarRang],
    ),
    createContentItem(
      '不让 — denying permission',
      'bù ràng',
      'Negate by placing 不 BEFORE 让 (never between 让 and the verb). 不让 X V means "not let X V" or "not allow X to V". The most common negative usage in housing contexts is the landlord disallowing things: 房东不让我们养宠物 ("The landlord doesn\'t let us keep pets").',
      'sentence',
      '房东不让我们养宠物。\n物业不让在阳台上抽烟。\n爸爸不让我熬夜。',
      'Three typical "not allowed" sentences: landlord vs pets, property management vs smoking, parent vs staying up late — 不让 covers all of them in the same structure.',
      [
        { target: '不 + 让 + X + V', note: 'correct order — 不 immediately before 让' },
        { target: '不让 ≠ 让不', note: 'WRONG: 让不 — never insert 不 after 让; place it before' },
      ],
      [ACT.grammarRang],
    ),
    createContentItem(
      '让 in roommate negotiations',
      'ràng in negotiations',
      'In a roommate conflict, 让 is the verb that converts complaints into proposals. Instead of accusing ("你不洗碗!"), use 让 to suggest a structure: 咱们让自己轮流洗碗 ("let\'s have ourselves take turns washing dishes"). The 让 makes the rule structural rather than personal.',
      'sentence',
      '咱们让自己轮流倒垃圾，怎么样? zánmen ràng zìjǐ lúnliú dào lājī, zěnmeyàng?',
      '"How about we have ourselves take turns taking out the trash?" — the 让 + 自己 + 轮流 + V pattern depersonalizes the chore so neither roommate feels singled out.',
      [
        { target: '让自己 ràng zìjǐ', note: '"have ourselves" — frames the agreement as self-imposed, not other-imposed' },
        { target: '轮流 V lúnliú V', note: '"take turns V" — the canonical chore-rotation verb' },
        { target: '怎么样? zěnmeyàng?', note: '"how about it?" — invites the listener to agree, refuse, or modify' },
      ],
      [ACT.grammarRang],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar II: 又…又…
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '又…又… — both A and B',
      'yòu … yòu …',
      'Coordinates two qualities of the SAME subject — "both A and B". Pattern: SUBJECT + 又 + ADJ/V1 + 又 + ADJ/V2. The qualities must apply simultaneously to the same subject; both 又 are mandatory (you cannot say just one).',
      'sentence',
      '这个房间又小又脏 zhè ge fángjiān yòu xiǎo yòu zāng ("this room is both small and dirty")\n我的室友又懒又吵 wǒ de shìyǒu yòu lǎn yòu chǎo ("my roommate is both lazy and loud")',
      'The classic complaint structure — packs two grievances about the same target into one tight sentence; reverse to praise: 又便宜又干净 ("both cheap and clean").',
      [
        { target: 'SUBJ + 又 ADJ1 + 又 ADJ2', note: 'the canonical pattern; both 又 are required' },
        { target: 'simultaneous qualities', note: 'A and B must apply to the same subject at the same time' },
        { target: 'works with verbs too', note: '又哭又笑 ("both crying and laughing"); not only for adjectives' },
      ],
      [ACT.grammarYouYou],
    ),
    createContentItem(
      '又…又… for room/person',
      'yòu … yòu … for descriptions',
      'The most common roommate-and-room use of 又…又…. For rooms: 又小 (small) + 又脏 / 又乱 / 又吵 / 又冷. For people: 又懒 + 又吵 / 又脏 / 又不讲理. For positive descriptions: 又便宜 + 又干净, 又安静 + 又方便.',
      'sentence',
      '这套合租房又便宜又靠近地铁。zhè tào hézūfáng yòu piányi yòu kàojìn dìtiě.',
      '"This share-flat is both cheap and close to the subway" — the dream property listing; pairs 便宜 with 靠近地铁, the two top concerns of Beijing fresh graduates.',
      [
        { target: '又 + 小/脏/乱', note: 'common negative room descriptors paired in complaints' },
        { target: '又 + 便宜/方便/干净', note: 'common positive room descriptors paired in listings' },
        { target: '又 + 懒/吵/不讲理', note: 'common negative roommate descriptors paired in venting' },
      ],
      [ACT.grammarYouYou],
    ),
    createContentItem(
      '又…又… vs 既…又…',
      'yòu … yòu … vs jì … yòu …',
      'Distinguish 又…又… (everyday, spoken, can carry positive or negative tone) from 既…又… (more formal, written, neutral-to-positive only). 既…又… is what you would write in a property listing or formal review; 又…又… is what you say to your roommate.',
      'sentence',
      'SPOKEN: 这房间又小又贵 ("this room is small AND expensive") — complaint.\nFORMAL: 这套公寓既宽敞又安静 ("this apartment is both spacious and quiet") — listing.',
      'A register-marker pair — knowing when to use which signals you have command of spoken-vs-written Chinese.',
      [
        { target: '又…又… (spoken)', note: 'casual, conversational; negative or positive' },
        { target: '既…又… (formal)', note: 'written, listings, reviews; usually positive/neutral' },
      ],
      [ACT.grammarYouYou],
    ),
    createContentItem(
      '又…又… vs 一边…一边…',
      'yòu … yòu … vs yībiān … yībiān …',
      'Distinguish 又…又… (coordinates two QUALITIES of the same subject) from 一边…一边… (coordinates two ACTIONS happening simultaneously by the same subject). Different structures for different relations.',
      'sentence',
      'QUALITY: 他又高又瘦 ("he is both tall and thin") — two STATES.\nACTION: 他一边洗碗一边唱歌 ("he washes dishes while singing") — two ACTIVITIES.',
      'Easy to confuse because both translate as "both"; the test is whether you are describing what something IS (use 又…又…) or what something DOES (use 一边…一边…).',
      [
        { target: '又 + ADJ/V', note: 'qualities or states; "is both A and B"' },
        { target: '一边 + V', note: 'simultaneous actions; "is doing A while doing B"' },
      ],
      [ACT.grammarYouYou],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar III: 是不是 + clause
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '是不是 + clause',
      'shì bu shì + clause',
      'Adds confirmation framing to a statement: "is it that…?" or "could it be that…?". Pattern: SUBJECT + 是不是 + CLAUSE. Softer than a direct accusation because it FRAMES the statement as a hypothesis the listener can confirm or correct, rather than asserting it as a fact.',
      'sentence',
      'DIRECT: 你忘了倒垃圾 ("You forgot to take out the trash") — accusation.\nSOFTENED: 你是不是忘了倒垃圾? ("Could it be that you forgot to take out the trash?") — invites the listener to admit gently.',
      'The same factual content, but the 是不是 frame invites cooperative confirmation rather than triggering defensive denial.',
      [
        { target: 'X 是不是 Y?', note: '"is it the case that X Y?" — invites confirmation' },
        { target: 'softer than direct 吗', note: '是不是 presupposes a probable "yes"; 吗 is more neutral' },
        { target: 'common in conflict resolution', note: 'standard structure for raising sensitive topics' },
      ],
      [ACT.grammarShiBuShi],
    ),
    createContentItem(
      '是不是 positioning',
      'shì bu shì positioning',
      'You can place 是不是 either at the START of the question (是不是你忘了…?) or right before the VERB (你是不是忘了…?). Both are correct; the verb-position version is more conversational and slightly softer. The clause-start version is slightly more emphatic.',
      'sentence',
      'EMPHATIC: 是不是你又忘了洗碗? — "Is it the case that you forgot dishes AGAIN?"\nSOFT: 你是不是又忘了洗碗? — "Did you maybe forget the dishes again?"',
      'Same content, different stress placement — the position of 是不是 maps onto whether you want emphasis or softness.',
      [
        { target: 'CLAUSE-START 是不是', note: 'emphatic; the question opens with the confirmation frame' },
        { target: 'PRE-VERB 是不是', note: 'softer, conversational; embeds the frame into the sentence flow' },
      ],
      [ACT.grammarShiBuShi],
    ),
    createContentItem(
      '是不是 vs 吗',
      'shì bu shì vs ma',
      'Both form yes/no questions but with different attitudes. 吗 is neutral information-seeking ("is this true?"). 是不是 presupposes the answer is probably "yes" and invites the listener to confirm. Use 是不是 when you already suspect the answer.',
      'sentence',
      'NEUTRAL: 你累了吗? ("Are you tired?") — genuine question, expects yes or no.\nPRESUPPOSED: 你是不是累了? ("You\'re tired, aren\'t you?") — already suspects yes, invites confirmation.',
      'In a roommate conflict 是不是 is usually what you want: you have already noticed the dishes piling up; the 是不是 invites the roommate to acknowledge what is already visible.',
      [
        { target: '吗 (neutral)', note: 'true info question; yes or no equally expected' },
        { target: '是不是 (presupposed)', note: 'tagged question; probable yes; invites soft admission' },
      ],
      [ACT.grammarShiBuShi],
    ),
    createContentItem(
      '是不是 + feeling/opinion',
      'shì bu shì + opinions',
      'Combine 是不是 with feeling/opinion verbs (觉得 juéde "feel", 觉着 juézhe "sense", 认为 rènwéi "believe") to softly probe what the other person thinks: 你是不是觉得…? ("Do you feel that…?"). One of the most useful patterns for raising disagreements without confrontation.',
      'sentence',
      '你是不是觉得我们应该轮流打扫? nǐ shì bu shì juéde wǒmen yīnggāi lúnliú dǎsǎo?',
      '"Do you feel that we should take turns cleaning?" — a polite proposal disguised as a question about the listener\'s feelings. Makes the suggestion sound like the listener\'s own idea.',
      [
        { target: '你是不是觉得 + 提议', note: 'pattern: invites the listener to "feel" the proposal — a face-saving move' },
        { target: 'covers proposals and complaints', note: 'works for both raising issues and suggesting solutions' },
      ],
      [ACT.grammarShiBuShi],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading & Speaking: Tsinghua dorm group chat
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '紫荆303宿舍群',
      'zǐjīng 303 sùshè qún',
      'A 4-message WeChat group-chat exchange between three roommates in Tsinghua University\'s 紫荆 dormitory, room 303, working out a chore rotation. Notice how 是不是 surfaces the issue, 让 + 轮流 proposes the fix, and 商量 closes the agreement.',
      'sentence',
      '小李: 大家是不是觉得最近厨房有点儿脏?水槽里的碗已经放了四天了。\n小王: 对不起!那个碗是我的。最近实验太忙，我一直没时间洗。\n小张: 没事，咱们商量一下吧。要不咱们让自己轮流洗碗、轮流倒垃圾，怎么样?\n小李: 行!那这样:周一周二小王，周三周四小张，周五周六我，周日大家自己负责。公平吗?\n小王: 公平!太感谢了。我之后一定注意。\n小张: 这样又公平又简单。咱们就这么定了。',
      'Translation: 小李: "Do you guys feel the kitchen has been a bit dirty lately? The dishes in the sink have been there for four days." 小王: "Sorry! Those are mine. Labs have been busy, I haven\'t had time." 小张: "It\'s okay, let\'s talk it through. How about we take turns washing dishes and taking out trash?" 小李: "Sure! Mon-Tue 小王, Wed-Thu 小张, Fri-Sat me, Sunday everyone for themselves. Fair?" 小王: "Fair! Thanks, I\'ll be careful from now on." 小张: "Both fair and simple. Settled."',
      [
        { target: '大家是不是觉得 dàjiā shì bu shì juéde', note: '"do you all feel" — the soft confirmation opener; lets the group raise the issue collectively' },
        { target: '咱们商量一下吧 zánmen shāngliang yīxià ba', note: '"let\'s talk it through" — the collaborative-discussion frame with 一下 + 吧 to lower stakes' },
        { target: '让自己轮流 ràng zìjǐ lúnliú', note: '"have ourselves take turns" — the depersonalized rotation proposal from Grammar I' },
        { target: '又公平又简单 yòu gōngpíng yòu jiǎndān', note: '"both fair and simple" — the 又…又… closing endorsement from Grammar II' },
        { target: '咱们就这么定了 zánmen jiù zhème dìng le', note: '"settled, then" — the agreement-reached closing for any negotiation' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '理解问题',
      'lǐjiě wèntí',
      'Four comprehension questions matching the group chat. Answer each in one short sentence; full-sentence rewriting of the chat is not required.',
      'sentence',
      'Q1: 厨房里的碗放了多久? Q2: 是谁的碗? 为什么没洗? Q3: 他们达成了什么协议? Q4: 周日谁负责洗碗?',
      'Four questions cover duration, responsibility, agreement, and exception — the four parts of any real negotiation closing.',
      [
        { target: 'A1: 放了四天了。', note: 'duration answer using 了…了; "it has been four days"' },
        { target: 'A2: 是小王的，因为实验太忙没时间。', note: 'responsibility + cause; standard short answer with 因为' },
        { target: 'A3: 他们让自己轮流洗碗和倒垃圾。', note: 'agreement statement using the lesson grammar 让 + 轮流' },
        { target: 'A4: 周日大家自己负责，不轮流。', note: 'exception clause; "Sunday is self-responsibility, no rotation"' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Listening & Speaking: Beijing share-flat negotiation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '北京合租谈判',
      'Běijīng hézū tánpàn',
      'A 6-turn conversation between a fresh-graduate tenant (potential roommate) and a 二房东 (sublet landlord) viewing a 10 m² bedroom in a 4-bedroom share-flat near 国贸 (Guomao). Covers rent, deposit, utilities, common-area cleaning, and curfew. Notice the slightly formal register of landlord-tenant talk.',
      'conversation',
      '二房东: 这个房间多少钱?三千五一个月，押二付一。\n租客: 水电费包含在房租里吗?\n二房东: 不包含。水电费四个人分担，平均一个人一百多。\n租客: 公共区域的卫生是怎么安排的?\n二房东: 室友之间商量。一般都是轮流打扫，每周一次。\n租客: 那房东您是不是有规定?比如说几点以后要安静?\n二房东: 我们这儿没有通宵限制，但是十一点以后建议小声一点儿，不要影响别的室友。\n租客: 我明白了。能不能让我先看看其他三个室友的情况，再决定?\n二房东: 当然可以。他们都是工作的年轻人，又爱干净又安静，您放心。',
      'A typical Beijing share-flat showing — the 二房东 sells the room (¥3,500 rent, 押二付一), the tenant probes for utilities and rules, and the negotiation closes with a 又…又… endorsement of the existing roommates.',
      [
        { target: '押二付一 yā èr fù yī', note: '"two months deposit, one month forward" — a common rent-payment structure' },
        { target: '水电费四个人分担 shuǐdiànfèi sì ge rén fēndān', note: 'utilities split four ways; uses 分担 from Vocabulary II' },
        { target: '是不是有规定 shì bu shì yǒu guīdìng', note: '"are there any rules?" — uses 是不是 from Grammar III to probe softly' },
        { target: '能不能让我先看看 néng bu néng ràng wǒ xiān kànkan', note: '"could I take a look first" — uses 能不能 + 让 from Grammar I as a polite request' },
        { target: '又爱干净又安静 yòu ài gānjìng yòu ānjìng', note: '"both clean-loving and quiet" — uses 又…又… from Grammar II as a roommate endorsement' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing: roommate agreement
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '室友协议模板',
      'shìyǒu xiéyì múbǎn',
      'A reusable 7-clause template for any Mandarin roommate agreement (室友协议). Each clause uses one of the grammar points from this lesson. Sign and date at the bottom for added effect.',
      'sentence',
      '【室友协议】\n1. 房租:每人每月 [金额]元，月初付清。\n2. 水电费:四个人分担，每月 [日期] 结算一次。\n3. 公共区域卫生:让自己轮流打扫，每周一次。\n4. 倒垃圾:每天晚上轮流，按顺序进行。\n5. 噪音:晚上11点以后要安静，不要影响别的室友。\n6. 客人:要先互相商量，不能随便带过夜的客人。\n7. 如果有问题:我们是不是可以坐下来好好商量?\n签名: ____________  日期: ____________',
      'Seven clauses cover the core: rent, utilities, cleaning, trash, noise, guests, and conflict-resolution — the spine of any functional 合租 agreement.',
      [
        { target: 'Clause 3 — 让自己轮流', note: 'uses 让 (Grammar I) + 轮流 (Vocabulary II) to depersonalize the cleaning rotation' },
        { target: 'Clause 5 — 不要影响别的室友', note: 'uses 影响 (Vocabulary II) as the soft cohabitation rule' },
        { target: 'Clause 6 — 互相商量', note: 'uses 互相 + 商量 (Vocabulary II) to make guest-permission collaborative' },
        { target: 'Clause 7 — 是不是可以…?', note: 'uses 是不是 (Grammar III) to keep the conflict-resolution clause non-confrontational' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '写作练习',
      'xiězuò liànxí',
      'Write your own 5–7 clause roommate agreement in Hanzi using the template. Use 让 at least twice, 又…又… at least once, and 是不是 at least once so the writing demonstrates all three grammar points of this lesson.',
      'sentence',
      '示例: 1. 我和室友合租一间又大又便宜的房间。 2. 房租每人一千五一个月。 3. 我们让自己轮流打扫卫生。 4. 噪音方面，咱们让自己晚上小声一点儿。 5. 如果有问题，咱们是不是可以坐下来商量?',
      'Translation: "1. My roommate and I share a room that is both big and cheap. 2. Rent is 1,500 each per month. 3. We have ourselves take turns cleaning. 4. About noise, we keep our voices down at night. 5. If there are issues, can we sit down and discuss?"',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Culture Note: Chinese dorm + Beijing 合租
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '中国大学宿舍',
      'Zhōngguó dàxué sùshè',
      'Chinese university dorms typically house 4–6 students per room, with shared bathrooms either on the floor or in a separate building. Older buildings (built before 2000) often have communal shower rooms with no individual stalls. Privacy is essentially nonexistent — you live, study, and sleep in the same 25 m² room as your roommates for four years.',
      'sentence',
      '清华大学的本科生通常住在四人间，研究生住在两人间。本科生宿舍楼里有公共浴室，每层楼一个。',
      'Translation: "Tsinghua undergrads usually live in 4-person rooms; grad students in 2-person rooms. Undergrad dorm buildings have shared bathrooms, one per floor."',
      [
        { target: '四人间 sì rén jiān', note: '"4-person room" — the standard Mainland undergraduate dorm size' },
        { target: '两人间 liǎng rén jiān', note: '"2-person room" — typical for graduate students; rare for undergrads' },
        { target: '公共浴室 gōnggòng yùshì', note: '"public bathhouse / shower room" — communal showers, often no individual stalls in older buildings' },
        { target: '宿管 sùguǎn', note: '"dorm warden" — the on-site staff who enforce curfew and resolve disputes; equivalent to 사감 in Korean dorms' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '北京合租现实',
      'Běijīng hézū xiànshí',
      'After graduation, the Beijing housing reality is sharp: monthly salaries of ¥8,000–¥15,000 vs. one-bedroom rents of ¥6,000+ inside the third ring road. The solution is 合租: rent one bedroom (often as small as 10 m²) in a 3- or 4-bedroom apartment shared with unrelated working adults. Common features: a 中介 (broker) charges one full month\'s commission, a 二房东 may hold the master lease, and you share kitchen and bathroom with strangers.',
      'sentence',
      '应届毕业生在北京的合租房间一般10平米左右，月租三千五到五千，加上水电费、物业费、中介费，第一个月的总成本可以达到两万。',
      'Translation: "Beijing fresh-graduate share-flat rooms are usually around 10 m², monthly rent ¥3,500-5,000; adding utilities, property fees, and broker commission, total move-in cost can reach ¥20,000."',
      [
        { target: '应届毕业生 yìngjiè bìyèshēng', note: '"current-year graduate" — official term for someone graduating in the current academic year, eligible for entry-level recruitment' },
        { target: '中介费 zhōngjiè fèi', note: '"broker fee" — usually one month\'s rent, paid upfront; the most-resented Beijing move-in cost' },
        { target: '二房东 èr fángdōng', note: '"secondary landlord" — sublets rooms; technically against the master lease, but the dominant arrangement in cheap share-flats' },
        { target: '物业费 wùyè fèi', note: '"property management fee" — separate from rent; usually charged once a year' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '燕郊通勤',
      'Yānjiāo tōngqín',
      '燕郊 (Yanjiao) is a satellite commuter town in Hebei province, technically outside Beijing\'s administrative boundary but only one bus stop away from the eastern sixth ring road. Rents are roughly half of comparable Beijing 合租, attracting tens of thousands of commuters who endure 1.5–2 hour each-way trips on the 燕郊公交 buses. The common phrase 离北京只有一站地的燕郊 ("Yanjiao, only one bus stop from Beijing") captures both the proximity and the bitter irony.',
      'sentence',
      '在燕郊住，每天通勤要四个小时，但是房租可以省一半。',
      'Translation: "Living in Yanjiao, the daily commute is 4 hours, but you save half on rent" — the standard Yanjiao commuter\'s calculation.',
      [
        { target: '燕郊 Yānjiāo', note: 'Hebei satellite town adjacent to Beijing\'s eastern boundary; rent capital of the Beijing commuter belt' },
        { target: '通勤 tōngqín', note: '"commute" — a relatively recent loan-translation; older Chinese used 上下班 (commuting to/from work)' },
        { target: '一站地 yī zhàn dì', note: '"one bus stop away" — colloquial; 站地 literally "stop-distance"' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task: dishes-in-the-sink scene
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '任务: 水槽里的碗',
      'rènwù: shuǐcáo lǐ de wǎn',
      'Roleplay the dishes-in-the-sink conflict with the tutor playing your Tsinghua roommate (小王). For four days running 小王 has left used dishes in the sink. Open with a 是不是 confirmation question, propose a 让 + 轮流 rotation, and close with 商量 agreement. The whole exchange should feel like joint problem-solving, not an argument.',
      'conversation',
      '[紫荆303宿舍, 周五晚上]\n你: [开场 + 用是不是引出问题]\n小王: 啊…对不起，我最近实验真的很忙。\n你: [理解 + 让 X V 提议轮流方案]\n小王: 那怎么轮流呢?咱们四个人怎么安排?\n你: [具体方案 — 周几谁洗 + 又…又… 评价方案]\n小王: 听起来又公平又简单。咱们就这么定。\n你: [感谢 + 互相 + 结尾]',
      'Six turns covering grievance, acknowledgment, proposal, schedule, endorsement, and close — the complete arc of a collaborative roommate negotiation in Mandarin.',
      [
        { target: '开场 — 是不是觉得…?', note: 'use Grammar III to surface the issue: "do you feel that the kitchen has been…?"' },
        { target: '提议 — 咱们让自己轮流…', note: 'use Grammar I + 轮流 to propose: "how about we have ourselves take turns…?"' },
        { target: '评价 — 又…又…', note: 'use Grammar II to endorse the proposal: "this is both fair and simple"' },
        { target: '结尾 — 互相理解 / 互相商量', note: 'close with 互相 (Vocabulary II) to reinforce the collaborative tone' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战 — 升级冲突',
      'tiǎozhàn — shēngjí chōngtū',
      'Stretch goal: extend the scene with a second conflict. After the dishes are resolved, 小王 reveals he has been letting his girlfriend stay over without asking the other roommates. Raise THIS new concern using 是不是 + 商量, then propose a guest-overnight rule using 互相 + 让.',
      'conversation',
      '小王: 对了，我可以问你一个事吗?我女朋友最近想过来住两天，可以吗?\n你: [惊讶 + 用是不是确认这已经发生了多久]\n小王: 呃…其实她已经住了一个礼拜了。\n你: [态度坚定但不指责 — 互相商量 + 让 + 提议规则]\n小王: 你说得对，我应该先和大家商量。我下次一定先说。\n你: [感谢 + 总结新规则]',
      'A second-order conflict that tests whether the same grammar tools work for a less neutral situation. 商量 again becomes the central verb — what makes the conversation civil is that you both choose to negotiate rather than fight.',
      [
        { target: '过夜的客人 guò yè de kèrén', note: '"overnight guest" — a flashpoint topic in any 合租 because everyone shares the kitchen and bathroom' },
        { target: '我应该先和大家商量 wǒ yīnggāi xiān hé dàjiā shāngliang', note: '"I should have discussed with everyone first" — the standard self-correction in a roommate conflict' },
        { target: '互相尊重 hùxiāng zūnzhòng', note: '"mutual respect" — the most common roommate-agreement principle to invoke when discussing guest rules' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
