// Level 1 Unit 1 — Greetings & Self-Introduction (Mandarin Chinese)
// Functions: greeting, introducing yourself, asking where someone is from,
// correcting a wrong assumption, farewells.
// This lesson is the canonical TEMPLATE for all Chinese thematic Level 1 lessons.
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
  orientation: 'zh-l1u1-orientation',
  pronunciation: 'zh-l1u1-pronunciation',
  vocabularyGreetings: 'zh-l1u1-vocab-greetings',
  vocabularyPeople: 'zh-l1u1-vocab-people',
  grammarShi: 'zh-l1u1-grammar-shi',
  grammarPronounsParticles: 'zh-l1u1-grammar-pronouns-particles',
  grammarNegation: 'zh-l1u1-grammar-negation',
  reading: 'zh-l1u1-reading',
  listening: 'zh-l1u1-listening',
  writing: 'zh-l1u1-writing',
  culture: 'zh-l1u1-culture',
  task: 'zh-l1u1-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Greet someone in Mandarin and say goodbye in three registers (casual, polite, formal) so you can match the situation.',
      'Introduce yourself with your name, country, and one role (student / teacher / engineer) using the 我是… and 我叫… patterns.',
      'Ask another person their name and where they are from, then respond appropriately to their answer.',
    ],
    task: 'Picture your first day at Tsinghua University — you walk into a research meeting and meet a visiting scholar from Beijing. By the end of this lesson you should handle the whole exchange in Mandarin without rehearsing each line.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in this lesson',
    goals: [
      'Apply third-tone sandhi automatically in 你好 (nǐ hǎo → spoken ní hǎo) — the single most common Mandarin greeting.',
      'Distinguish the retroflex initials (zh/ch/sh/r) from the palatal initials (j/q/x) when introducing yourself with words like 是 shì, 叫 jiào, and 谢谢 xièxie.',
      'Apply 不 (bù) sandhi: bù becomes bú before another fourth tone, as in 不是 bùshì → búshì.',
    ],
    task: 'Read each example aloud and identify whether sandhi applies, then pronounce the spoken version (not the written tones).',
  },
  {
    id: ACT.vocabularyGreetings,
    section: 'Vocabulary I',
    title: 'Greetings, farewells, and first-meeting phrases',
    goals: [
      'Memorize 12 greetings and farewells across three registers, with the right phrase for each situation.',
      'Distinguish 你好 (informal/peer) from 您好 (formal/honorific) — using the wrong one with the wrong person signals disrespect or excessive distance.',
    ],
    task: 'Say each phrase out loud three times with the correct tones, then pair each one with the situation where you would use it.',
  },
  {
    id: ACT.vocabularyPeople,
    section: 'Vocabulary II',
    title: 'People, roles, and nationalities',
    goals: [
      'Use the 7 personal pronouns (我 你 您 他 她 我们 你们 他们) correctly, including the formal-you 您.',
      'State your role (学生 / 老师 / 工程师) and nationality (国名 + 人) in a complete short sentence.',
    ],
    task: 'Say your own role and nationality using the 我是…人 pattern, then describe one classmate using 他/她是…人.',
  },
  {
    id: ACT.grammarShi,
    section: 'Grammar I',
    title: '是 (shì) — the copula',
    goals: [
      'Use 是 as the linking verb between two nouns: A 是 B ("A is B"). Unlike English "to be", 是 does NOT change form for different subjects.',
      'Form a yes/no question by adding 吗 (ma) at the end: 你是学生吗? ("Are you a student?").',
      'Know that 是 is ONLY used between nouns; for adjectives, 是 is dropped (我很好, not 我是好).',
    ],
    task: 'Write six sentences using 是 to identify yourself, then convert three of them into yes/no questions with 吗.',
  },
  {
    id: ACT.grammarPronounsParticles,
    section: 'Grammar II',
    title: 'Subject pronouns + 的 (de) possessive particle',
    goals: [
      'Use the 7 personal pronouns: 我 wǒ (I), 你 nǐ (you), 您 nín (you-formal), 他/她/它 tā (he/she/it), 我们 wǒmen (we), 你们 nǐmen (you-plural), 他们 tāmen (they).',
      'Use 的 (de) to mark possession: 我的名字 ("my name"), 你的老师 ("your teacher"). 的 also drops in close relationships: 我妈妈 ("my mom") sounds warmer than 我的妈妈.',
    ],
    task: 'Construct three possessive phrases using 的, then rewrite one without 的 to feel the warmth difference.',
  },
  {
    id: ACT.grammarNegation,
    section: 'Grammar III',
    title: 'Negation with 不 (bù) and the 不是…是… correction pattern',
    goals: [
      'Negate a 是 sentence by placing 不 directly before it: 我不是日本人 ("I am not Japanese").',
      'Apply 不 sandhi: bù becomes bú before a fourth-tone syllable. 不是 → búshì in speech.',
      'Apply the 不是…，是… pattern to correct someone\'s wrong guess politely.',
    ],
    task: 'Imagine a classmate guesses your nationality wrong; correct them in one polite sentence using the 不是…，是… pattern.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'Read a self-introduction',
    goals: [
      'Read a short self-introduction paragraph aloud with correct tones, sandhi, and natural rhythm.',
      'Answer comprehension questions about the speaker\'s name, country, role, and department using 是 / 不是 short answers.',
    ],
    task: 'Read the paragraph below aloud once, then answer four comprehension questions in complete short sentences.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'A first meeting',
    goals: [
      'Follow a 4-turn first-meeting dialogue and recognize the casual vs formal register markers (你好 vs 您好, 你 vs 您, family name with title).',
      'Reproduce the dialogue with your own name and country, swapping in the relevant phrases naturally.',
    ],
    task: 'Read the polite dialogue along with the AI tutor first, then perform it again with your own information swapped in.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Write your own self-introduction',
    goals: [
      'Write 3–5 sentences in Hanzi covering greeting, name, country, role, and one extra fact.',
      'Use 是 at least twice and 的 at least once so the writing demonstrates the core grammar of this lesson.',
    ],
    task: 'Write your own self-introduction in 3–5 sentences using the model on the left, then read it aloud with correct tones.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: 'Family-name first, titles, and saving face',
    goals: [
      'Use the family-name-first naming order (李明 Lǐ Míng = family name Li, given name Ming) — opposite of Western convention.',
      'Address professionals by family name + title (王老师 Wáng lǎoshī "Teacher Wang", 李医生 Lǐ yīshēng "Doctor Li") — much more common than first-name basis.',
      'Avoid direct disagreement in formal contexts; Mandarin culture places high value on face-saving (面子 miànzi) and indirect language.',
    ],
    task: 'Decide how you would address (1) a classmate named 张明, (2) a teacher named 王芳, (3) a senior researcher named 李伟 — give the full Mandarin form for each.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'First day at Tsinghua — in Mandarin',
    goals: [
      'Combine everything from this lesson into one continuous scene with no break between greeting, introduction, question, answer, correction, and farewell.',
      'Use the correct register (formal/casual) based on the relationship; switch from 你 to 您 if the interlocutor is older or more senior.',
    ],
    task: 'Roleplay your first day at Tsinghua University with the AI tutor playing a visiting scholar from Beijing; aim for a 6-turn exchange in Mandarin.',
  },
];

const lesson = {
  title: 'Level 1 · Unit 1: 你好 — Greetings and Self-Introduction',
  category: 'greetings',
  difficulty: 'beginner',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'greeting-someone', label: 'Greeting someone', goal: 'Open and close a brief encounter politely (你好 / 您好 / 再见) and match the register to the relationship.' },
    { id: 'introducing-yourself', label: 'Introducing yourself', goal: 'Give your name, nationality, and one fact about yourself in two short sentences using 我叫… and 我是….' },
    { id: 'asking-where-from', label: 'Asking where someone is from', goal: 'Ask 你是哪国人? or 你从哪里来? and respond naturally with country + 人.' },
    { id: 'correcting-assumption', label: 'Correcting an assumption', goal: 'Use the 不是…，是… pattern to politely correct a wrong guess about your nationality or role.' },
  ],
  relatedPools: ['topic-people', 'topic-society'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '本课目标',
      'běn kè mùbiāo',
      'By the end of this lesson, you can greet someone in Mandarin, give your name, say where you are from, ask the same back, and farewell — all in one short conversation without pausing to think.',
      'word',
      'Functional language: 打招呼 dǎ zhāohu (greet) · 自我介绍 zìwǒ jièshào (introduce yourself) · 问国籍 wèn guójí (ask origin) · 否定 fǒudìng (negate) · 告别 gàobié (farewell)',
      'These five micro-skills are the spine of every social encounter in Mandarin — once they\'re automatic, every later lesson layers on top.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      '真实场景',
      'zhēnshí chǎngjǐng',
      'You are at Tsinghua University on your first day and a visiting scholar from Beijing turns to you in the lab. The whole encounter takes about 30 seconds and you will need every micro-skill from this lesson.',
      'word',
      '访问学者: "你好！我叫王伟。你是哪国人？"',
      'A typical opener from a Mainland visiting scholar: polite 你好 + name introduction + immediate origin question — a common Chinese workplace pattern.',
      [
        { target: '你好 nǐ hǎo', note: 'standard polite greeting; safe with peers, colleagues, and most professional contexts' },
        { target: '我叫… wǒ jiào…', note: 'self-introduction with the verb 叫 (jiào, "to be called"); more casual than 我的名字是…' },
        { target: '你是哪国人? nǐ shì nǎ guó rén?', note: 'literal: "you are which-country person?"; the standard origin question' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '三种礼貌等级',
      'sān zhǒng lǐmào děngjí',
      'Mandarin distinguishes three rough politeness registers. Casual (peers, friends): 嗨 hāi / 你 nǐ / 再见 zàijiàn. Polite (workplace, first meetings): 你好 nǐ hǎo / 您 nín occasionally. Formal (elders, customers, ceremonies): 您好 nín hǎo / 您 nín / 久仰 jiǔyǎng "long admired".',
      'word',
      '嗨 hāi (casual) / 你好 nǐ hǎo (polite) / 您好 nín hǎo (formal) — same greeting function, three social levels.',
      'Switching from 你 to 您 mid-conversation signals increased respect; the reverse signals familiarity.',
      [
        { target: 'CASUAL: 嗨 hāi, 你 nǐ', note: 'use with peers, close friends, and clearly informal settings' },
        { target: 'POLITE: 你好 nǐ hǎo', note: 'the safe default for first meetings, workplace, and customer-facing situations' },
        { target: 'FORMAL: 您好 nín hǎo', note: 'reserved for elders, senior officials, customers in formal industries, and ceremonies' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '你好',
      'nǐ hǎo (spoken: ní hǎo)',
      'Two third tones in a row trigger third-tone sandhi: the first 你 becomes a rising (second) tone, while the second 好 keeps the full third tone. Written tones do not change; only spoken pronunciation does.',
      'word',
      '你好 → spoken: ní hǎo /ni³⁵ haʊ²¹⁴/',
      'The most heard sandhi in Mandarin; appears every time you greet someone politely.',
      [
        { target: '你 (written: nǐ, 3rd)', note: 'first syllable; would be full third tone in isolation' },
        { target: '你 (spoken: ní, 2nd)', note: 'becomes rising because the next syllable is also third tone — sandhi rule' },
        { target: '好 (hǎo, 3rd, unchanged)', note: 'second syllable; keeps the full third-tone dip-and-rise' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '不是',
      'bùshì (spoken: búshì)',
      '不 (bù) sandhi: when followed by a fourth-tone syllable like 是 (shì), 不 changes from fourth tone to rising tone — 不是 sounds like búshì in speech. Written tones do not change.',
      'word',
      '不是 bùshì → spoken: búshì /pu³⁵ ʂʐ̩⁵¹/',
      'Critical for natural-sounding negative sentences; appears constantly in everyday speech.',
      [
        { target: '不 (written: bù, 4th)', note: 'default fourth tone in isolation' },
        { target: '不 (spoken: bú, 2nd)', note: 'changes to rising tone before another fourth-tone syllable — sandhi rule' },
        { target: '是 (shì, 4th, unchanged)', note: 'copula; always fourth tone' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '我是',
      'wǒ shì',
      'Two consecutive tones with no sandhi: third tone 我 (wǒ) keeps its dip-and-rise, then fourth tone 是 (shì) falls sharply. The most common opening of any Chinese self-introduction.',
      'word',
      '我是中国人 wǒ shì Zhōngguórén ("I am Chinese")',
      'No sandhi applies here; both tones are pronounced as written.',
      [
        { target: '我 (wǒ, 3rd)', note: 'full third-tone dip-and-rise; pronoun "I"' },
        { target: '是 (shì, 4th)', note: 'copula "to be"; sharp falling tone' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '谢谢',
      'xièxie',
      'A fourth-tone syllable followed by a neutral-tone syllable. The first 谢 (xiè) is fully stressed; the second xie reduces to a light neutral tone. Common pattern in two-syllable polite words.',
      'word',
      '谢谢你 xièxie nǐ ("thank you")',
      'Notice the second 谢 has no tone mark — neutral tone is written without a mark.',
      [
        { target: '谢 (xiè, 4th)', note: 'first syllable; full fourth tone with sharp falling pitch' },
        { target: '谢 (xie, neutral)', note: 'second syllable; light and short, pitch determined by previous tone' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '叫什么名字',
      'jiào shénme míngzi',
      'The full phrase "what is your name" combines three high-frequency pronunciation patterns: fourth tone 叫, full first+neutral 什么 (shénme), and second+neutral 名字 (míngzi). The rising-then-neutral rhythm is typical of polite questions.',
      'word',
      '你叫什么名字? nǐ jiào shénme míngzi?',
      'Hear the rhythm: STRONG-STRONG-strong-STRONG-strong; the question intonation does not rise like in English wh-questions.',
      [
        { target: '叫 jiào', note: 'fourth tone; "to be called"' },
        { target: '什么 shénme', note: 'second + neutral; "what" — extremely high frequency' },
        { target: '名字 míngzi', note: 'second + neutral; "name"' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Greetings & farewells
    // ────────────────────────────────────────────────────────────────────
    createContentItem('你好', 'nǐ hǎo', 'A polite greeting suitable any time of day; the safest default for first meetings, workplace, and customer-facing situations. Always pronounced with third-tone sandhi as ní hǎo.', 'word', '你好！我叫莎拉。', 'Standard polite opener paired with a self-introduction; a typical first turn in any conversation.', null, [ACT.vocabularyGreetings]),
    createContentItem('您好', 'nín hǎo', 'A formal greeting that replaces 你 with the honorific 您 (nín). Used with elders, customers, government officials, and anyone significantly senior. In business, signals respect; in customer service, signals attentiveness.', 'word', '您好，欢迎光临。', 'Formal customer-facing greeting; common in hotels, banks, and upscale restaurants.', null, [ACT.vocabularyGreetings]),
    createContentItem('嗨', 'hāi', 'A casual greeting used among close friends, peers, and family. Borrowed from English "hi" and feels modern/youthful. Not appropriate with anyone senior or in any formal context.', 'word', '嗨，最近怎么样？', 'Friend-to-friend opener; "最近怎么样?" means "how have you been recently?"', null, [ACT.vocabularyGreetings]),
    createContentItem('早上好', 'zǎoshang hǎo', 'A polite-to-formal morning greeting used roughly from sunrise to 10 AM. The time-of-day variants are slightly more formal than 你好 and common in workplaces, classrooms, and broadcasts. Also written 早 alone for a shorter casual form.', 'word', '早上好，王老师！', 'Polite morning greeting to a teacher using family-name + title pattern.', null, [ACT.vocabularyGreetings]),
    createContentItem('下午好', 'xiàwǔ hǎo', 'A polite-to-formal afternoon greeting used roughly from noon to early evening. Same register as 早上好; less common in casual speech, where 你好 covers all times of day.', 'word', '下午好，各位。', 'Polite group greeting for an afternoon meeting or class.', null, [ACT.vocabularyGreetings]),
    createContentItem('晚上好', 'wǎnshang hǎo', 'A polite-to-formal evening greeting used after sunset. Distinct from 晚安 (wǎn\'ān, "good night") which is a farewell — 晚上好 is a greeting (arriving), 晚安 is a farewell (leaving).', 'word', '晚上好，欢迎大家。', 'Formal evening opener for a dinner event or public address.', null, [ACT.vocabularyGreetings]),
    createContentItem('很高兴认识你', 'hěn gāoxìng rènshi nǐ', 'The standard polite phrase said at a first meeting; literal translation is "very happy to know you". Used in almost every register from casual to formal; the universal safe response to a new introduction.', 'word', '很高兴认识你，王先生。', 'Combines the meeting-acknowledgment phrase with the family-name + 先生 (Mr.) honorific.', null, [ACT.vocabularyGreetings]),
    createContentItem('久仰', 'jiǔyǎng', 'A very formal first-meeting phrase meaning "I have long admired you / your reputation precedes you". Used when meeting someone respected for the first time — academics, senior executives, accomplished elders. Rarely used in casual contexts.', 'word', '李教授，久仰，久仰。', 'Formal repeated form (久仰久仰) intensifies the respect; standard for meeting a renowned scholar.', null, [ACT.vocabularyGreetings]),
    createContentItem('你好吗', 'nǐ hǎo ma', 'A ritual inquiry into wellbeing, less formulaic than English "how are you?" — in Mandarin it can be a real question among close friends. Standard reply: 我很好，谢谢，你呢? ("I\'m fine, thanks, you?"). Less common in casual peer-to-peer chat where 怎么样? (zěnmeyàng?) is preferred.', 'word', '你好吗? — 我很好，谢谢，你呢?', 'Standard everyday exchange; both turns are formulaic and quick.', null, [ACT.vocabularyGreetings]),
    createContentItem('再见', 'zàijiàn', 'A polite farewell suitable for most workplace, customer, and acquaintance contexts. Literal meaning "see again". Slightly more deliberate than 拜拜 (bàibai) but less formal than 后会有期 (hòu huì yǒu qī, "may we meet again later").', 'word', '再见！明天见。', 'Polite farewell paired with "see you tomorrow" — a common workplace closing.', null, [ACT.vocabularyGreetings]),
    createContentItem('拜拜', 'bàibai', 'A casual farewell borrowed from English "bye-bye". Used among friends, peers, and family — equivalent to English "bye". More casual than 再见; common in modern urban speech.', 'word', '拜拜！周末愉快！', 'Friend-to-friend close; "周末愉快" means "have a nice weekend".', null, [ACT.vocabularyGreetings]),
    createContentItem('明天见', 'míngtiān jiàn', 'A casual farewell that explicitly expects a meeting tomorrow. Variants: 一会儿见 (yīhuìr jiàn, "see you in a bit"), 周末见 (zhōumò jiàn, "see you on the weekend"), 下次见 (xià cì jiàn, "see you next time"). More personal than plain 再见.', 'word', '明天见！', 'Brief expectation-setting close; common when leaving a daily-meeting context.', null, [ACT.vocabularyGreetings]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: People, roles, nationalities
    // ────────────────────────────────────────────────────────────────────
    createContentItem('我', 'wǒ', 'First-person singular subject pronoun. Unlike English "I", 我 does not require capitalization (Chinese has no capital letters) and is used in identical form for subject and object.', 'word', '我是学生。', 'The simplest possible self-introduction: 我 + 是 + role.', null, [ACT.vocabularyPeople]),
    createContentItem('你', 'nǐ', 'Second-person pronoun used for casual address to peers, friends, and equals. Avoid with elders, senior officials, or in customer-facing roles — use 您 instead. Singular form (plural is 你们).', 'word', '你是日本人吗?', 'Casual question about nationality using 你 + 是 + adjective-noun + 吗.', null, [ACT.vocabularyPeople]),
    createContentItem('您', 'nín', 'Honorific second-person pronoun used for elders, customers, senior officials, and anyone you wish to show extra respect to. The "polite you" — equivalent in function to formal pronouns in many European languages (vous, Sie, usted).', 'word', '您是哪位?', 'Formal "who are you?" — appropriate when answering the door or phone to someone you don\'t know.', null, [ACT.vocabularyPeople]),
    createContentItem('他', 'tā', 'Third-person singular pronoun for male persons. Written form is distinct (uses the 亻 radical for "person") but the spoken sound is identical to 她 (she) and 它 (it).', 'word', '他是我的朋友。', 'Standard third-person introduction; 朋友 (péngyou) means "friend".', null, [ACT.vocabularyPeople]),
    createContentItem('她', 'tā', 'Third-person singular pronoun for female persons. Identical pronunciation to 他 (he) and 它 (it) — distinction is only visible in writing (uses 女 "female" radical).', 'word', '她是我的老师。', 'Third-person introduction using the female form 她 + 老师 ("teacher").', null, [ACT.vocabularyPeople]),
    createContentItem('它', 'tā', 'Third-person singular pronoun for things, animals, and abstract concepts. Used much less often than English "it" — Mandarin often drops the subject when context makes it clear.', 'word', '它是一只猫。', '"It is a cat." — 它 used because the referent is an animal.', null, [ACT.vocabularyPeople]),
    createContentItem('我们', 'wǒmen', 'First-person plural subject pronoun (inclusive or exclusive). 们 (men) is the standard plural marker for pronouns referring to humans. Includes the speaker.', 'word', '我们是学生。', 'Group self-identification; same 是 copula works for plural subjects without changing form.', null, [ACT.vocabularyPeople]),
    createContentItem('你们', 'nǐmen', 'Second-person plural pronoun used to address multiple peers/friends. Casual register, like singular 你. For a formal plural, 您 doesn\'t typically take 们 — repeat 您 or use 各位 (gèwèi, "everyone-honored") instead.', 'word', '你们是哪国人?', 'Casual group question; "you-plural are which-country people?"', null, [ACT.vocabularyPeople]),
    createContentItem('他们', 'tāmen', 'Third-person plural pronoun. Default form 他们 (using the masculine 他) covers mixed-gender or male-only groups. All-female groups can use 她们; this distinction matters in writing but the spoken sound is identical.', 'word', '他们是中国人。', 'Plural reference to a group whose origin is being identified.', null, [ACT.vocabularyPeople]),
    createContentItem('名字', 'míngzi', 'A person\'s given name (vs 姓 xìng = family name). Used in the common phrases 你叫什么名字? ("what is your name?") and 我的名字是… ("my name is…"). Note that 名字 specifically refers to the given name, not the full name.', 'word', '我的名字是莎拉。', '"My name is Sarah" — slightly more formal than 我叫莎拉.', null, [ACT.vocabularyPeople]),
    createContentItem('姓', 'xìng', 'A person\'s family name (surname). Mandarin places family name FIRST, opposite of Western convention. The question 您贵姓? (nín guì xìng?, literally "your honored surname?") is the formal way to ask for a family name.', 'word', '您贵姓? — 我姓王。', 'Formal exchange asking for and giving a family name; common in business and formal introductions.', null, [ACT.vocabularyPeople]),
    createContentItem('先生', 'xiānsheng', 'Title used after a man\'s family name (王先生 = Mr. Wang). Also used alone as a polite address to a stranger man, equivalent to "sir". In some contexts (academia, older usage), can mean "teacher" or "expert" regardless of gender.', 'word', '王先生，您好。', 'Formal address combining family name + title; standard polite form for adult men.', null, [ACT.vocabularyPeople]),
    createContentItem('女士', 'nǚshì', 'Honorific title used after a woman\'s family name (王女士 = Ms. Wang). Marital status is not implied — the modern safe default for any adult woman in formal contexts. Replaces older 太太 (tàitài, "Mrs.") and 小姐 (xiǎojiě, "Miss") in most professional settings.', 'word', '李女士是我们的经理。', 'Formal reference to a female manager using family name + 女士.', null, [ACT.vocabularyPeople]),
    createContentItem('老师', 'lǎoshī', 'Title meaning "teacher" — used after a family name (王老师 = Teacher Wang) as a respectful form of address. In Mandarin-speaking cultures, 老师 is a high-status title used freely for any educator from primary school to university.', 'word', '王老师好！', 'Standard student-to-teacher greeting; "Teacher Wang, hello!"', null, [ACT.vocabularyPeople]),
    createContentItem('教授', 'jiàoshòu', 'Title meaning "professor" — used after a family name (李教授 = Professor Li) for university faculty with the professorial rank. More specific than 老师; reserved for senior academics.', 'word', '李教授今天讲课。', '"Professor Li is lecturing today" — formal academic reference.', null, [ACT.vocabularyPeople]),
    createContentItem('学生', 'xuésheng', 'A person currently studying — at any level from primary school to graduate research. The second syllable is neutral tone (sheng, not shēng).', 'word', '我是学生。', 'Most common role self-identifier in academic contexts.', null, [ACT.vocabularyPeople]),
    createContentItem('工程师', 'gōngchéngshī', 'Engineer (any discipline). Compound of 工程 (gōngchéng, "engineering project") + 师 (shī, "master/expert"). Higher-status connotation than the English "engineer" in some workplace contexts.', 'word', '他是软件工程师。', '"He is a software engineer" — 软件 (ruǎnjiàn) means "software".', null, [ACT.vocabularyPeople]),
    createContentItem('医生', 'yīshēng', 'A medical professional. Also used as a title after the family name: 李医生 (Lǐ yīshēng = "Doctor Li"). The most common job-title used as an address form alongside 老师.', 'word', '我妈妈是医生。', '"My mother is a doctor" — standard profession description.', null, [ACT.vocabularyPeople]),
    createContentItem('中国人', 'Zhōngguórén', 'A Chinese person — formed by 中国 (China) + 人 (person). This compound pattern is universal for nationalities: country name + 人.', 'word', '我是中国人。', 'Standard nationality self-identification using the country + 人 pattern.', null, [ACT.vocabularyPeople]),
    createContentItem('韩国人', 'Hánguórén', 'A Korean person — 韩国 (Korea) + 人 (person). Follows the same country + 人 pattern as 中国人.', 'word', '我是韩国人，从首尔来。', '"I\'m Korean, from Seoul" — nationality + city of origin.', null, [ACT.vocabularyPeople]),
    createContentItem('美国人', 'Měiguórén', 'An American — 美国 (USA, literally "beautiful country") + 人 (person). 美国 specifically refers to the United States, not the Americas in general.', 'word', '莎拉是美国人。', 'Third-person reference using 美国人.', null, [ACT.vocabularyPeople]),
    createContentItem('英国人', 'Yīngguórén', 'A British person — 英国 (UK, originally a phonetic rendering of "England") + 人. Used for the UK as a whole.', 'word', '詹姆斯是英国人。', '"James is British" — using the country + 人 pattern.', null, [ACT.vocabularyPeople]),
    createContentItem('日本人', 'Rìběnrén', 'A Japanese person — 日本 (Japan, literally "sun origin") + 人. One of the most common nationality words in Chinese contexts due to geographic proximity.', 'word', '田中先生是日本人。', '"Mr. Tanaka is Japanese" — family name + title + nationality.', null, [ACT.vocabularyPeople]),
    createContentItem('越南人', 'Yuènánrén', 'A Vietnamese person — 越南 (Vietnam) + 人. Follows the country + 人 pattern.', 'word', '我的室友是越南人。', '"My roommate is Vietnamese" — 室友 (shìyǒu) means "roommate".', null, [ACT.vocabularyPeople]),
    createContentItem('菲律宾人', 'Fēilǜbīnrén', 'A Filipino person — 菲律宾 (Philippines, phonetic transliteration) + 人. The country name is a four-syllable phonetic adaptation, unusual among Asian country names.', 'word', '我的朋友是菲律宾人。', '"My friend is Filipino" — using the standard country + 人 pattern.', null, [ACT.vocabularyPeople]),
    createContentItem('尼日利亚人', 'Nírìlìyàrén', 'A Nigerian person — 尼日利亚 (Nigeria, phonetic transliteration) + 人. Like 菲律宾, the country name is a phonetic adaptation of the original.', 'word', '我是尼日利亚人。', 'Self-identification as Nigerian using the country + 人 pattern.', null, [ACT.vocabularyPeople]),
    createContentItem('留学生', 'liúxuéshēng', 'An international student — literally "stay-study-student" or "student studying abroad". The preferred term in academic contexts; older terms like 外国学生 (foreign student) are now considered slightly othering.', 'word', '清华大学有很多留学生。', '"Tsinghua University has many international students" — typical academic-policy phrasing.', null, [ACT.vocabularyPeople]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar I: 是 copula
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '是',
      'shì',
      'The copula 是 ("to be") links two nouns: A 是 B = "A is B". CRITICALLY: 是 does NOT conjugate — it stays the same regardless of subject (我是, 你是, 他是, 我们是 all use the same 是). Mandarin verbs never change form for person, number, or tense.',
      'sentence',
      '我是莎拉。你是学生。他是中国人。我们是朋友。',
      'Four different subjects, four identical uses of 是 — the no-conjugation rule is one of the easiest features of Mandarin for English speakers.',
      [
        { target: '我是 wǒ shì', note: 'first-person singular; no change' },
        { target: '你是 nǐ shì', note: 'second-person; same 是' },
        { target: '他/她是 tā shì', note: 'third-person singular; same 是' },
        { target: '我们/你们/他们是', note: 'plurals; still same 是' },
      ],
      [ACT.grammarShi],
    ),
    createContentItem(
      '是 only between nouns',
      'shì only between nouns',
      'CRITICAL RULE: 是 connects TWO NOUNS only. For adjectives, drop 是 — use 很 (hěn, "very") as a default linker instead. 我很好 ("I am well"), NOT 我是好.',
      'sentence',
      'CORRECT: 我是学生 ("I am a student" — noun)\nWRONG: 我是好 (should be 我很好 "I am well")',
      'The English-speaker trap; learners often overuse 是 because English "to be" works with both nouns and adjectives.',
      [
        { target: '是 + noun ✓', note: 'A 是 B where B is a noun ("student", "Korean", "engineer")' },
        { target: '是 + adjective ✗', note: 'wrong pattern; use 很 + adjective instead' },
      ],
      [ACT.grammarShi],
    ),
    createContentItem(
      '吗 question',
      'ma question particle',
      'Form a yes/no question by adding the neutral-tone particle 吗 (ma) at the end of any statement. Word order does NOT change — unlike English, you do not invert anything.',
      'sentence',
      '你是学生 → 你是学生吗? ("Are you a student?")',
      'The simplest question pattern in Mandarin; works with any statement.',
      [
        { target: '你是学生', note: 'statement: "You are a student."' },
        { target: '你是学生吗?', note: 'question: "Are you a student?" — only 吗 is added' },
        { target: 'Answer 是 / 不是', note: '"Yes (am)" or "No (am not)" — short answers repeat the verb' },
      ],
      [ACT.grammarShi],
    ),
    createContentItem(
      '问句 — 什么 / 哪',
      'wèn jù — shénme / nǎ',
      'Information questions in Mandarin keep the SAME word order as statements — you replace the unknown noun with a question word (什么 = what, 哪 = which, 谁 = who, 哪里/哪儿 = where). NO movement of the question word to the front.',
      'sentence',
      '你叫什么名字? ("What\'s your name?")\n你是哪国人? ("Which country are you from?")\n你是谁? ("Who are you?")',
      'Same word order as statements — much simpler than English wh-question movement.',
      [
        { target: '你叫什么名字?', note: 'literal: "you called what name?" — 什么 stays in object position' },
        { target: '你是哪国人?', note: 'literal: "you are which-country person?" — 哪 stays in attributive position' },
        { target: '你是谁?', note: 'literal: "you are who?" — 谁 stays in predicate position' },
      ],
      [ACT.grammarShi],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar II: Pronouns + 的
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '人称代词',
      'rénchēng dàicí',
      'Mandarin has 7 personal pronouns. Same form for subject and object — unlike English (I/me, he/him). The plural is formed by adding 们 (men) to the singular: 我们, 你们, 他们.',
      'sentence',
      '我 wǒ (I/me) · 你 nǐ (you) · 您 nín (you-formal) · 他 tā (he/him) · 她 tā (she/her) · 它 tā (it) · 我们 wǒmen (we/us) · 你们 nǐmen (you-pl) · 他们 tāmen (they/them)',
      'One-form-fits-all: no subject/object change, no case marking — much simpler than English pronoun system.',
      null,
      [ACT.grammarPronounsParticles],
    ),
    createContentItem(
      '的 possessive',
      'de — possessive particle',
      'The particle 的 (de, neutral tone) marks possession or attribution. Pattern: A 的 B = "A\'s B" or "B of A". 我的名字 = "my name". Works the same way for any owner-owned pair.',
      'sentence',
      '我的名字 ("my name") · 你的老师 ("your teacher") · 他的书 ("his book")',
      'The all-purpose possessive marker; works for human, animal, and inanimate possessors.',
      [
        { target: '我的 wǒ de', note: '"my" — pronoun + 的' },
        { target: '你的 nǐ de', note: '"your"' },
        { target: '他的/她的 tā de', note: '"his/her" — note same sound, different writing' },
      ],
      [ACT.grammarPronounsParticles],
    ),
    createContentItem(
      '的 dropped',
      'de often dropped in close relationships',
      'For close family members, body parts, and very intimate relationships, 的 is OFTEN dropped: 我妈妈 ("my mom"), 我哥 ("my elder brother"). Including 的 (我的妈妈) sounds slightly more distant or formal.',
      'sentence',
      '我妈妈 ("my mom" — warm) vs 我的妈妈 ("my mother" — slightly formal)',
      'Dropping 的 conveys warmth; including it adds distance. A native-speaker nuance worth knowing.',
      [
        { target: '我妈妈', note: 'no 的; warm everyday usage' },
        { target: '我哥', note: 'no 的; "my elder brother" said casually' },
        { target: '我的妈妈', note: 'with 的; slightly more formal or contrastive ("my mother specifically")' },
      ],
      [ACT.grammarPronounsParticles],
    ),
    createContentItem(
      '主题 — 我 / 你 patterns',
      'topic — wǒ / nǐ patterns',
      'Mandarin is a topic-prominent language: the topic comes first, then the comment. 我，我是中国人 ("As for me, I am Chinese") — the topic 我 is often the same as the subject but can be separate. In simple sentences this collapses to subject-verb-object.',
      'sentence',
      '我是中国人。(simple: subject = topic)\n中国，我去过。("As for China, I have been there." — separate topic and subject)',
      'In Level 1, treat Mandarin as subject-first; the topic-comment distinction matters more at higher levels.',
      null,
      [ACT.grammarPronounsParticles],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar III: Negation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '不 negation',
      'bù — negation marker',
      'Place 不 (bù) directly BEFORE the verb to negate. For 是, the negation is 不是 ("am/is/are not"). 不 is the all-purpose present/future negation; for past tense and "have/exist", use 没 (méi) instead.',
      'sentence',
      '我不是日本人。("I am not Japanese.")\n你不是学生吗? ("Aren\'t you a student?")',
      '不 always precedes the verb it negates; word order does not change otherwise.',
      [
        { target: '不 + 是 → 不是', note: '"am/is/are not" — negation of the copula' },
        { target: '不 + verb', note: 'all-purpose present/future negation; 不去 ("don\'t go"), 不吃 ("don\'t eat")' },
        { target: '不 vs 没', note: '不 = general/present/future; 没 = past tense and existential negation' },
      ],
      [ACT.grammarNegation],
    ),
    createContentItem(
      '不 sandhi',
      'bù sandhi rule',
      '不 (bù, normally 4th tone) becomes 不 (bú, 2nd tone) when followed by a fourth-tone syllable. Most commonly heard in 不是 → búshì. Written form is always 不; only pronunciation changes.',
      'sentence',
      '不是 written: bùshì → spoken: búshì\n不去 (qù = 4th) written: bùqù → spoken: búqù\n不来 (lái = 2nd) bùlái — no sandhi',
      'Critical for natural-sounding negative sentences; ignore the sandhi and you sound robotic.',
      [
        { target: '不 + 1st/2nd/3rd → bù', note: 'no sandhi; full fourth tone preserved' },
        { target: '不 + 4th → bú', note: 'changes to second (rising) tone; the most common case' },
      ],
      [ACT.grammarNegation],
    ),
    createContentItem(
      '不是…，是… correction',
      'bú shì …, shì … pattern',
      'The standard polite pattern for correcting someone\'s wrong guess: 不是 X，是 Y ("not X, but Y"). Three parts: denial (不是), wrong item (X), then the correct item (是 Y). Skipping any of these makes the correction sound abrupt.',
      'sentence',
      'A: 你是日本人吗? — B: 不是，我是韩国人。',
      'The three-part rhythm is what makes the correction feel natural rather than blunt.',
      [
        { target: '不是 (denial)', note: '"not so"; opens the correction politely' },
        { target: '我是韩国人 (offered alternative)', note: 'closes the loop and gives the asker the right answer' },
      ],
      [ACT.grammarNegation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '自我介绍',
      'zìwǒ jièshào',
      'A complete five-sentence self-introduction in Mandarin. Read it aloud with correct tones, sandhi, and natural rhythm. Notice the parallel structure: nearly every sentence starts with 我.',
      'sentence',
      '你好！我叫莎拉，我是美国人。我是清华大学的学生，我的专业是计算机工程。很高兴认识你。',
      'Translation: "Hello! I\'m Sarah, I\'m American. I\'m a student at Tsinghua University, my major is Computer Engineering. Nice to meet you."',
      [
        { target: '我叫莎拉 wǒ jiào Shālā', note: 'name introduction using 叫; warmer than 我的名字是…' },
        { target: '我是美国人 wǒ shì Měiguórén', note: 'nationality using the country + 人 pattern' },
        { target: '清华大学的学生', note: '"student of Tsinghua University" — possessive 的 links school to student' },
        { target: '我的专业是计算机工程', note: '"my major is Computer Engineering" — 专业 (zhuānyè) = major; 计算机 (jìsuànjī) = computer' },
        { target: '很高兴认识你 hěn gāoxìng rènshi nǐ', note: 'standard polite closing of a first-meeting introduction' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '理解问题',
      'lǐjiě wèntí',
      'Four standard comprehension questions matching the paragraph. Answer each in a short sentence using 是 or 我叫…; full sentences are not required for natural Mandarin.',
      'sentence',
      'Q1: 你叫什么名字? Q2: 你是哪国人? Q3: 你是学生吗? Q4: 你的专业是什么?',
      'Two name questions, one nationality, one yes/no, one specific information — covering all the question patterns from this lesson.',
      [
        { target: 'A1: 我叫莎拉。', note: 'name answer using 叫; the natural form' },
        { target: 'A2: 我是美国人。', note: 'country + 人 nationality answer' },
        { target: 'A3: 是。/ 我是学生。', note: 'short positive answer; can repeat verb or full sentence' },
        { target: 'A4: 计算机工程。', note: 'short answer drops the redundant phrase; full sentence is also fine' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Listening & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '初次见面 (对话 — 礼貌)',
      'chū cì jiànmiàn (duìhuà — lǐmào)',
      'A natural polite-register first-meeting conversation between two students at Tsinghua. Covers all the patterns from this lesson: greetings, names, origins, roles, agreements, and farewells.',
      'conversation',
      'A: 你好！很高兴认识你。我叫王明。\nB: 你好，王明！我叫莎拉。也很高兴认识你。\nA: 你是哪国人?\nB: 我是美国人。你呢?\nA: 我是中国人，从北京来。你是这里的学生吗?\nB: 是的，我在清华学计算机工程。你呢?\nA: 我也是计算机工程的学生! 太巧了。\nB: 那以后课上见!',
      'A natural exchange between peers using polite-but-casual register — the default for student-age interactions in Mainland China.',
      [
        { target: '很高兴认识你', note: 'first-meeting polite phrase; appears in both speakers\' opening turns' },
        { target: '你呢? nǐ ne?', note: 'standard return-the-question phrase after answering your own turn — "and you?"' },
        { target: '从…来 cóng…lái', note: '"come from…" pattern; 从 marks origin' },
        { target: '我也是 wǒ yě shì', note: '"I am also"; 也 (yě) inserted before the verb' },
        { target: '太巧了 tài qiǎo le', note: '"what a coincidence!" — common reaction expression' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      '初次见面 (对话 — 正式)',
      'chū cì jiànmiàn (duìhuà — zhèngshì)',
      'A formal first-meeting conversation suitable for academic or professional contexts. Notice the formal vocabulary: 您, 您贵姓, 久仰, family-name + title — register markers signaling a more deliberate interaction.',
      'conversation',
      '学生: 教授您好！我叫莎拉·金。久仰大名。\n教授: 你好，莎拉。欢迎来到清华。请坐。\n学生: 谢谢。这学期能上您的课，我很期待。\n教授: 我也很高兴。您是从哪儿来的?\n学生: 我从美国波士顿来的。\n教授: 很好。希望您在这里学习愉快。\n学生: 谢谢您，教授。',
      'Same information as the polite version but with formal phrasing throughout — appropriate for hierarchical (student-professor) relationships.',
      [
        { target: '久仰大名 jiǔyǎng dàmíng', note: 'formal first-meeting phrase "long admired your great name"; signals respect for the senior person' },
        { target: '教授 jiàoshòu', note: 'formal title "professor"; used without family name when addressing directly' },
        { target: '您 nín', note: 'honorific "you" used throughout; switching to 你 mid-conversation would be a social error' },
        { target: '从…来的 cóng…lái de', note: '"came from…"; the 的 marks past origin in this sentence pattern' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '写作模板',
      'xiězuò múbǎn',
      'A reusable five-sentence template for any Mandarin self-introduction. Fill in the bracketed slots with your own information — the structure carries the rest.',
      'sentence',
      '你好！我叫 [名字]。我是 [国籍]人。我是清华的 [职业]。我 [一个额外的事实]。很高兴认识你。',
      'Five sentences cover the core: greeting, name, nationality, role, personal fact, closing — the minimum complete self-introduction.',
      [
        { target: '[名字]', note: 'your name — given name only for casual, family-first-then-given for formal' },
        { target: '[国籍]人', note: 'your nationality using country + 人 pattern (美国人, 中国人, 越南人)' },
        { target: '[职业]', note: '学生 / 老师 / 工程师 / etc. — the noun for your professional or academic identity' },
        { target: '[一个额外的事实]', note: 'something specific that distinguishes you (hobby, major, favorite thing); avoid generic facts' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '写作练习',
      'xiězuò liànxí',
      'Write your own 3–5 sentence self-introduction in Hanzi using the template. Use 是 at least twice and 的 at least once so the writing demonstrates the core grammar of this lesson.',
      'sentence',
      '示例: 你好！我叫金智秀。我是韩国人。我是清华的学生。我喜欢英语和吉他。很高兴认识你！',
      'Translation: "Hello! I\'m Kim Ji-su. I\'m Korean. I\'m a student at Tsinghua. I like English and guitar. Nice to meet you!"',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '姓在前',
      'xìng zài qián',
      'In Mandarin Chinese, the family name always comes FIRST — opposite of Western convention. 李明 (Lǐ Míng) = family name 李 (Li) + given name 明 (Ming). Westerners often confuse the two when introducing a Chinese person; remember that the SHORTER part is usually the family name.',
      'sentence',
      '王伟 — 王 is the family name (Wang), 伟 is the given name (Wei).',
      'When transliterated into English, the order may flip to "Wei Wang" to match Western expectations, but in Mandarin contexts always say family-name-first.',
      [
        { target: '姓 + 名 (Chinese order)', note: 'family name first, then given name' },
        { target: '李 (Lǐ)', note: 'family name; one of the most common Chinese surnames' },
        { target: '明 (Míng)', note: 'given name; comes second' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '姓 + 老师/医生',
      'xìng + lǎoshī/yīshēng',
      'In Mandarin-speaking cultures, professionals are addressed by family name + title much more often than by first name. 王老师 (Teacher Wang), 李医生 (Doctor Li), 张经理 (Manager Zhang). Calling a teacher or doctor by their given name alone would be inappropriate in most contexts.',
      'sentence',
      '王老师 (Teacher Wang) · 李医生 (Doctor Li) · 张经理 (Manager Zhang) · 陈总 (Chief Chen, short for 总经理)',
      'Many job titles double as forms of address; 总 (zǒng) is a common abbreviation for "general manager / chief".',
      [
        { target: '姓 + 老师', note: 'teachers — most common title-based address' },
        { target: '姓 + 医生', note: 'doctors — also extremely common' },
        { target: '姓 + 经理 / 总', note: 'managers — workplace hierarchy makes this very frequent' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '您 vs 你',
      'nín vs nǐ',
      '您 (nín) is the honorific "you" used with elders, customers, senior officials, and anyone you wish to show extra respect to. 你 (nǐ) is the everyday "you" for peers, friends, and casual contexts. Using 你 with someone who expects 您 signals disrespect; using 您 with a close peer can create cold distance.',
      'sentence',
      '您好，王教授。(formal) vs 嗨，明明！(casual)',
      'Switching from 你 to 您 mid-conversation signals increased respect; the reverse signals familiarity.',
      [
        { target: '您 (formal)', note: 'use with elders, customers, senior officials, in formal industries' },
        { target: '你 (casual)', note: 'use with peers, friends, classmates, in casual workplaces' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '面子',
      'miànzi',
      'The concept of 面子 (literally "face") refers to one\'s public reputation, dignity, and social standing. Mandarin-speaking cultures place high value on preserving face — both one\'s own and others\'. Avoid direct disagreement, public correction, or causing embarrassment in formal contexts; use indirect language to suggest alternatives.',
      'sentence',
      'Instead of "你错了" ("you are wrong"), use "可能…" ("perhaps…") or "我觉得也许…" ("I think maybe…").',
      'Face-saving language is not "fake politeness" — it is core social skill in any Mandarin-speaking professional context.',
      [
        { target: '给面子 gěi miànzi', note: '"give face" — show someone respect publicly' },
        { target: '没面子 méi miànzi', note: '"no face" — to be humiliated or lose standing' },
        { target: '丢面子 diū miànzi', note: '"lose face" — typically by being publicly corrected or shamed' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '任务: 清华的第一天',
      'rènwù: Qīnghuá de dì yī tiān',
      'Roleplay your first day at Tsinghua University with the AI tutor playing a friendly visiting scholar from Beijing. Use every skill from this lesson in one continuous scene — greet, introduce, ask, answer, farewell.',
      'conversation',
      '[Lab, Tsinghua University]\n访问学者: 你好！很高兴认识你。我叫王伟。\n你: [打招呼 + 自我介绍]\n访问学者: 你是哪国人?\n你: [说你的国家/城市]\n访问学者: 你是这里的学生吗?\n你: [确认 + 加上你的专业]\n访问学者: 哦，好啊! 你的专业是什么?\n你: [回答]\n访问学者: 很高兴跟你聊天！\n你: [告别]',
      'Six turns of fluent exchange; the AI tutor will prompt you and respond naturally to whatever you say.',
      [
        { target: '打招呼', note: '你好 / 您好 / 很高兴认识你 — pick the register that matches the scholar\'s opening' },
        { target: '自我介绍', note: '我叫… or 我是… — use the natural form' },
        { target: '国家', note: '我是…人 — use the country + 人 pattern' },
        { target: '专业', note: '我学… or 我的专业是… — state your major' },
        { target: '告别', note: '再见 / 拜拜 / 下次见 — match the register you opened with' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战 — 纠正假设',
      'tiǎozhàn — jiūzhèng jiǎshè',
      'Stretch goal: in the same scene, the visiting scholar guesses your country incorrectly. Politely correct using the 不是…，是… pattern. Closes the loop without making the asker lose face.',
      'conversation',
      '访问学者: 哦，你是日本人吗?\n你: 不是，我不是日本人。我是韩国人，从首尔来。\n访问学者: 啊，抱歉，我搞错了!\n你: 没关系，没关系。',
      '"没关系" (méi guānxi) is a casual reassurance — "it\'s no problem" — common after any small mistake or apology.',
      [
        { target: '不是…，是…', note: 'the standard three-part polite correction pattern from Grammar III' },
        { target: '没关系 méi guānxi', note: 'casual reassurance ("it\'s no problem"); standard response to a small apology' },
        { target: '抱歉 bàoqiàn', note: '"sorry"; slightly more formal than 对不起' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
