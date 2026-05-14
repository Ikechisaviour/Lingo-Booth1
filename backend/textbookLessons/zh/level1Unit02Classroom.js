// Level 1 Unit 2 — Classroom & everyday objects (Mandarin Chinese)
// Functions: identifying classroom objects, naming people and actions in class,
// pointing at things with 这/那, locating things with 在 + place words, and
// stating existence with 有/没有.
// This lesson sits between Unit 1 (Greetings) and Unit 3 (Family/Counting)
// on the Chinese / Level 1 / textbook track.
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
  orientation: 'zh-l1u2-orientation',
  pronunciation: 'zh-l1u2-pronunciation',
  vocabularyObjects: 'zh-l1u2-vocab-objects',
  vocabularyPeopleActions: 'zh-l1u2-vocab-people-actions',
  grammarDemonstratives: 'zh-l1u2-grammar-demonstratives',
  grammarLocation: 'zh-l1u2-grammar-location',
  grammarExistence: 'zh-l1u2-grammar-existence',
  reading: 'zh-l1u2-reading',
  listening: 'zh-l1u2-listening',
  writing: 'zh-l1u2-writing',
  culture: 'zh-l1u2-culture',
  task: 'zh-l1u2-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Name 18+ common classroom objects and the people and actions that fill a Mandarin classroom — enough vocabulary to describe any scene around you.',
      'Point at things using 这 (zhè, this) and 那 (nà, that) and form short identification sentences like 这是书 ("this is a book").',
      'Say where someone or something is using 在 + place words (里, 上, 下, 旁边) and state existence with 有 / 没有.',
    ],
    task: 'Picture your first day in a Tsinghua University classroom — the teacher walks in, you greet 王老师, you look around and need to ask about the textbook, the projector, and the seat next to you. By the end of this lesson, you handle that whole opening without rehearsing each line.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in this lesson',
    goals: [
      'Distinguish 这 (zhè, 4th tone) from 那 (nà, 4th tone) — same falling pitch, different retroflex vs alveolar initial; mixing them up flips "this" and "that".',
      'Separate 是 (shì, copula "to be") from 四 (sì, "four") — retroflex sh- versus dental s-; both are 4th tone, so the initial carries the whole contrast.',
      'Apply third-tone sandhi to 你好 and 哪里 — the first 3rd tone rises to 2nd before another 3rd, so 哪里 (nǎlǐ) is actually spoken nálǐ.',
    ],
    task: 'Read each example aloud, identify whether sandhi applies, then pronounce the spoken version (not the written tones).',
  },
  {
    id: ACT.vocabularyObjects,
    section: 'Vocabulary I',
    title: 'Classroom objects on the desk and around the room',
    goals: [
      'Memorize 13 high-frequency classroom object nouns (book, pen, desk, board, projector, window, door, etc.) — the items you can literally point at during any lesson.',
      'Pair each item with its standard measure word so later lessons on counting (一本书 "one book", 一支笔 "one pen") flow naturally.',
    ],
    task: 'Walk around your real room or imagine the Tsinghua lecture hall — point at 5 objects in turn and name each one in Mandarin with correct tones.',
  },
  {
    id: ACT.vocabularyPeopleActions,
    section: 'Vocabulary II',
    title: 'People, classroom roles, and core actions',
    goals: [
      'Use 学生 (student), 老师 (teacher), 同学 (classmate) and the family-name + 老师 address pattern (王老师, 李老师).',
      'Use the six core classroom action verbs (上课 start class, 下课 finish class, 听 listen, 说 speak, 读 read, 写 write) and the question/answer pair 问问题 / 回答.',
    ],
    task: 'Describe what three people in the classroom are doing right now using subject + action verb.',
  },
  {
    id: ACT.grammarDemonstratives,
    section: 'Grammar I',
    title: '这 / 那 + 是 — pointing and identifying',
    goals: [
      'Use 这 (zhè, this — near speaker) and 那 (nà, that — away from speaker) to point at single items, then add 是 + noun to identify: 这是书 ("this is a book").',
      'Add a classifier with 这个 / 那个 (zhège / nàge) to point at a specific countable item, then form questions with 这是什么? / 那是谁?',
    ],
    task: 'Make three identification sentences pointing at objects close to you and three pointing at objects across the room.',
  },
  {
    id: ACT.grammarLocation,
    section: 'Grammar II',
    title: '在 (zài) + place — saying where someone or something is',
    goals: [
      'Use 在 as a verb meaning "to be at/in/on": subject + 在 + place word. 老师在教室里 ("the teacher is in the classroom").',
      'Combine 在 with place-suffix words 里 (lǐ, in), 上 (shàng, on top of), 下 (xià, under), 旁边 (pángbiān, next to), 前面 (qiánmiàn, in front of), 后面 (hòumiàn, behind).',
      'Ask location questions with 哪里 (nǎlǐ) or the casual 哪儿 (nǎr) — "where is X?".',
    ],
    task: 'Pick three items around you and say where each one is using 在 + a place word; then ask the AI tutor where one of them is.',
  },
  {
    id: ACT.grammarExistence,
    section: 'Grammar III',
    title: '有 / 没有 — saying what exists in a place',
    goals: [
      'Use 有 (yǒu, "there is/are") in the pattern Place + 有 + Thing. 教室里有学生 ("there are students in the classroom"). This is the standard existential sentence.',
      'Negate with 没有 (méiyǒu) — note the IRREGULAR negation: 有 is the only verb that pairs with 没 instead of 不. NEVER say 不有.',
      'Form yes/no questions by adding 吗 (有吗?) or by repeating the verb (有没有?) — both are common in conversation.',
    ],
    task: 'Describe what is in your bag in two sentences using 有 + noun, then ask a classmate 你有……吗? to find out if they have a specific item.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'Read about a Tsinghua classroom',
    goals: [
      'Read a short paragraph describing a Tsinghua classroom aloud with correct tones, sandhi, and natural rhythm.',
      'Answer comprehension questions about what is in the room, where things are located, and who is present, using full 有 / 在 sentences.',
    ],
    task: 'Read the paragraph below aloud once, then answer four comprehension questions in complete short sentences.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'Asking about a classmate\'s desk',
    goals: [
      'Follow a 4-turn dialogue between two students locating shared items (book, pen, laptop) using 这/那 + 是 and 在 + place word.',
      'Reproduce the dialogue replacing the items with what is actually on your desk right now.',
    ],
    task: 'Read the dialogue along with the AI tutor first, then perform it again with your own items swapped in.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Write a 4-sentence description of your classroom',
    goals: [
      'Write 4–5 sentences in Hanzi covering one identification sentence with 这/那 + 是, one location sentence with 在, and one existence sentence with 有 or 没有.',
      'Use at least three different place words (里, 上, 旁边, 前面…) so the description gives a clear spatial picture.',
    ],
    task: 'Write your description of your own classroom in 4–5 sentences using the model on the left, then read it aloud with correct tones.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: 'Chinese classroom etiquette and the 起立 / 敬礼 / 坐下 ritual',
    goals: [
      'Address teachers by family name + 老师 (王老师, 李老师) — never by given name alone, never by 你 in formal contexts.',
      'Recognize the traditional class-opening ritual 起立 (qǐlì, stand up) / 敬礼 (jìnglǐ, salute) / 老师好 (greet the teacher) / 坐下 (zuòxià, sit down) still used in many Mainland primary and middle schools.',
      'Know the modern university etiquette — standing is rare in lecture halls, but quietness, punctuality, and addressing the lecturer as 老师 remain.',
    ],
    task: 'Decide how you would (1) greet a teacher named 王芳 entering your classroom, (2) ask permission to sit down, (3) raise a question politely — give the full Mandarin form for each.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'First day in a Tsinghua classroom — in Mandarin',
    goals: [
      'Combine vocabulary, demonstratives, location, and existence into one continuous scene with no break between greeting, identifying, locating, and asking.',
      'Adjust register: 老师 + 您 with the teacher, 你 with a peer classmate; stay consistent within each turn.',
    ],
    task: 'Roleplay your first day in a Tsinghua classroom with the AI tutor playing your teacher 王老师 and a friendly classmate; aim for an 8-turn exchange covering greetings, identifying three objects, locating two of them, and asking one question with 有.',
  },
];

const lesson = {
  title: 'Level 1 · Unit 2: 教室里有什么? — Classroom and Everyday Objects',
  category: 'daily-life',
  difficulty: 'beginner',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'asking-what-this-is', label: 'Asking what something is', goal: 'Use 这是什么? / 那是什么? to ask about an object and respond with 这是… / 那是….' },
    { id: 'saying-where-it-is', label: 'Saying where something is', goal: 'Use subject + 在 + place + 里/上/旁边… to say where an object or person is.' },
    { id: 'asking-if-exists', label: 'Asking what is in a place', goal: 'Use Place + 有什么? and Place + 有 + Thing 吗? to ask what is in a room or container.' },
    { id: 'borrowing-item', label: 'Asking to borrow a classroom item', goal: 'Use 你有……吗? + 借我用一下 to politely ask a classmate to lend you something.' },
  ],
  relatedPools: ['topic-school', 'topic-objects'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '本课目标',
      'běn kè mùbiāo',
      'By the end of this lesson, you can name 18+ classroom items and people, point at things using 这/那, locate them with 在 + place words, and state what exists in a room using 有 / 没有 — enough to describe almost any classroom scene out loud.',
      'word',
      'Functional language: 识别 shíbié (identify) · 指物 zhǐ wù (point at things) · 定位 dìngwèi (locate) · 存在 cúnzài (state existence) · 提问 tíwèn (ask a question)',
      'These five micro-skills cover most "where is X / what is Y / does Z exist" conversation in Mandarin — the spatial spine of every classroom encounter.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      '真实场景',
      'zhēnshí chǎngjǐng',
      'It is your first day in a Tsinghua University classroom. 王老师 walks in, the projector is already on, the seat next to you is empty, and you cannot find your pen. Within the first minute you will greet the teacher, identify the textbook, locate the missing pen, and ask the classmate next to you for help — every micro-skill from this lesson, in one short stretch.',
      'word',
      '同学: 这是你的书吗? 你的笔在哪里?',
      'A typical opener from a friendly classmate: 这 + 是 identification + 在哪里 location question — exactly the patterns this lesson trains.',
      [
        { target: '这是你的书吗?', note: '"is this your book?" — 这是 identification pattern + 吗 yes/no question, two grammar points from this lesson combined' },
        { target: '你的笔在哪里?', note: '"where is your pen?" — 在 + 哪里 location question, the standard form for asking where something is' },
        { target: '王老师 Wáng lǎoshī', note: 'family name + 老师 address; the polite default for any Mainland teacher regardless of rank' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '从识别到定位',
      'cóng shíbié dào dìngwèi',
      'Mandarin builds spatial conversation in three layers: identify (这是… / 那是…), locate (… 在 + place), then exist (place + 有 + thing). Mastering all three lets you describe any room in two or three short sentences — the natural rhythm Mandarin speakers use when introducing a space.',
      'word',
      '这是书。书在桌子上。桌子上有书和笔。',
      'Three layered sentences from the SAME scene: identify the book, locate it on the desk, then list everything on the desk — each adds one piece of new spatial information.',
      [
        { target: '这是书 (identify)', note: 'first layer — name what the item IS using 这是 + noun' },
        { target: '书在桌子上 (locate)', note: 'second layer — say WHERE the named item is using subject + 在 + place + suffix' },
        { target: '桌子上有书和笔 (exist)', note: 'third layer — list WHAT is in the place using place + 有 + things connected with 和 (hé, "and")' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '这 vs 那',
      'zhè vs nà',
      'Both demonstratives are 4th tone (sharp falling), so the only difference is the initial: 这 starts with retroflex zh- (tongue curled back), 那 starts with alveolar n- (tongue tip on the ridge). Confusing them flips "this" and "that", which can change which object the listener looks at.',
      'word',
      '这是书 zhè shì shū ("this is a book") vs 那是书 nà shì shū ("that is a book")',
      'Same falling tone, completely different meaning; the retroflex zh- is what locks "this" in place.',
      [
        { target: '这 zhè', note: 'retroflex initial zh- + 4th tone; "this" — for objects near YOU' },
        { target: '那 nà', note: 'alveolar n- + 4th tone; "that" — for objects away from you' },
        { target: 'Both 4th tone', note: 'tone alone won\'t disambiguate; you must pronounce the initial cleanly' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '是 vs 四',
      'shì vs sì',
      'Two extremely common syllables that English-speaker learners often merge: 是 (shì, "to be") uses retroflex sh- with the tongue curled back, while 四 (sì, "four") uses dental s- with the tongue tip near the upper teeth. Both are 4th tone, so the retroflex contrast carries the entire distinction.',
      'word',
      '我是学生 wǒ shì xuésheng ("I am a student") vs 四个学生 sì gè xuésheng ("four students")',
      'A high-frequency contrast; mispronouncing either yields a nonsense sentence and is a top-five intelligibility problem for beginners.',
      [
        { target: '是 shì', note: 'retroflex sh-; tongue curled back, like English "sh" with the tongue raised toward the roof' },
        { target: '四 sì', note: 'dental s-; tongue near the upper teeth, sharper and farther forward than English "s"' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '哪里 — 三声变调',
      'nǎlǐ — sān shēng biàndiào',
      'Third-tone sandhi: 哪 (nǎ, 3rd) + 里 (lǐ, 3rd) — two 3rd tones in a row mean the first one rises to 2nd in speech. Written: nǎlǐ; spoken: nálǐ. Same rule that gave you 你好 → ní hǎo in the Foundation lesson.',
      'word',
      '书在哪里? written: shū zài nǎlǐ → spoken: shū zài nálǐ',
      'One of the most common location questions in beginner Mandarin; getting the sandhi right makes it sound natural rather than textbook.',
      [
        { target: '哪 (written: nǎ, 3rd)', note: 'isolation form is full 3rd tone' },
        { target: '哪 (spoken: ná, 2nd)', note: 'rises to 2nd tone because the next syllable is also 3rd tone — sandhi rule applies' },
        { target: '里 (lǐ, 3rd, unchanged)', note: 'second syllable keeps its full 3rd-tone dip-and-rise' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '老师 — 半三声',
      'lǎoshī — bàn sān shēng',
      'Half-third tone: when a 3rd tone (老 lǎo) is followed by a non-3rd tone (师 shī, 1st), the 3rd tone in fast speech drops to a low pitch with NO rise back up. Written tone mark stays the same; pronunciation simplifies.',
      'word',
      '老师好 lǎoshī hǎo ("hello teacher") — 老 dips low without rising, 师 stays high level',
      'Knowing this rule keeps your speech from sounding labored as you over-pronounce every 3rd tone in full.',
      [
        { target: '老 (written: lǎo, 3rd)', note: 'low dip; in fast speech the rise back up is suppressed' },
        { target: '师 (shī, 1st)', note: 'high level; provides the contrast that lets the half-third "rest" at the bottom' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '同学',
      'tóngxué',
      '2nd tone + 2nd tone — two consecutive rising tones, no sandhi. The trick is keeping BOTH syllables clearly rising rather than letting the second one flatten; English speakers tend to drop the second rise.',
      'word',
      '我的同学 wǒ de tóngxué ("my classmate")',
      'A high-frequency two-rising-tone word; getting both rises right marks you as someone who has internalized Mandarin tone shape, not just tone marks.',
      [
        { target: '同 tóng (2nd)', note: 'full rising tone from mid to high' },
        { target: '学 xué (2nd)', note: 'full rising tone again — do NOT let it flatten' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Classroom objects
    // ────────────────────────────────────────────────────────────────────
    createContentItem('书', 'shū', 'A book; the canonical countable object in beginner Mandarin. Standard measure word is 本 (běn): 一本书 = "one book". Used in compounds like 课本 (textbook), 书包 (school bag), 图书馆 (library).', 'word', '这是我的书。', '"This is my book." — the simplest 这是 + possessive + noun identification sentence; appears in every classroom.', null, [ACT.vocabularyObjects]),
    createContentItem('课本', 'kèběn', 'A textbook — specifically a classroom textbook, not just any book. Compound of 课 (kè, "lesson") + 本 (běn, "volume"). Distinct from 小说 (xiǎoshuō, "novel") or general 书; appears on every desk in a Mandarin classroom.', 'word', '老师，今天用哪本课本?', '"Teacher, which textbook do we use today?" — natural classroom question combining title + day + measure-word question.', null, [ACT.vocabularyObjects]),
    createContentItem('笔', 'bǐ', 'A pen or writing instrument (general term). Measure word 支 (zhī): 一支笔 = "one pen". Specific types: 铅笔 (qiānbǐ, pencil), 钢笔 (gāngbǐ, fountain pen), 圆珠笔 (yuánzhūbǐ, ballpoint).', 'word', '我没有笔，你有吗?', '"I don\'t have a pen, do you?" — combines 没有 negation, 有 affirmative, and a 吗 question in one classroom exchange.', null, [ACT.vocabularyObjects]),
    createContentItem('本子', 'běnzi', 'A notebook or exercise book — the kind you take notes in, distinct from a textbook (课本). 本 here means "volume/book"; 子 is a noun-forming suffix. Measure word 本 (one notebook = 一本本子).', 'word', '我的本子在桌子上。', '"My notebook is on the desk." — identification + location with 在 + place + 上.', null, [ACT.vocabularyObjects]),
    createContentItem('桌子', 'zhuōzi', 'A desk or table — the generic seated work surface in classrooms, dining rooms, and offices. 桌 is the root; 子 is the noun suffix. Measure word 张 (zhāng): 一张桌子 = "one desk".', 'word', '桌子上有什么?', '"What is on the desk?" — uses the 上 (on top of) place suffix and 有什么? existence-question pattern.', null, [ACT.vocabularyObjects]),
    createContentItem('椅子', 'yǐzi', 'A chair. 椅 is the root; 子 is the noun suffix as in 桌子. Measure word 把 (bǎ): 一把椅子 = "one chair". Common pair with 桌子 in any room description.', 'word', '椅子在桌子旁边。', '"The chair is next to the desk." — uses the 旁边 (next to) place word from Grammar II.', null, [ACT.vocabularyObjects]),
    createContentItem('黑板', 'hēibǎn', 'A blackboard — literally "black-board". The traditional chalk board still common in Chinese classrooms alongside whiteboards. Measure word 块 (kuài): 一块黑板.', 'word', '老师在黑板上写字。', '"The teacher is writing on the blackboard." — combines person + location + 上 + verb.', null, [ACT.vocabularyObjects]),
    createContentItem('白板', 'báibǎn', 'A whiteboard — literally "white-board". Increasingly common in modern Chinese classrooms; uses dry-erase markers (白板笔) rather than chalk. Same measure word as 黑板.', 'word', '今天我们用白板。', '"Today we are using the whiteboard."', null, [ACT.vocabularyObjects]),
    createContentItem('电脑', 'diànnǎo', 'A computer — literally "electric-brain", one of the most elegant compound coinings in modern Mandarin. Measure word 台 (tái): 一台电脑. 笔记本电脑 (bǐjìběn diànnǎo) means laptop.', 'word', '老师的电脑在桌子上。', '"The teacher\'s computer is on the desk." — possessive 的 + location 在 + 上 combined.', null, [ACT.vocabularyObjects]),
    createContentItem('投影仪', 'tóuyǐngyí', 'A projector — literally "throw-shadow-instrument". The standard piece of classroom equipment in Mainland university lecture halls. Measure word 台 (tái).', 'word', '教室里有一台投影仪。', '"There is a projector in the classroom." — existence sentence with place + 有 + measure word + noun.', null, [ACT.vocabularyObjects]),
    createContentItem('教室', 'jiàoshì', 'A classroom — literally "teach-room". The room where formal classes are held; distinct from 办公室 (office) or 图书馆 (library). Measure word 间 (jiān): 一间教室.', 'word', '我们的教室在三楼。', '"Our classroom is on the third floor." — uses the 在 + floor location pattern.', null, [ACT.vocabularyObjects]),
    createContentItem('窗户', 'chuānghu', 'A window. Compound of 窗 (chuāng, "window") + 户 (hù, neutral-tone suffix). The 户 reduces to neutral tone — note no tone mark on the second syllable.', 'word', '窗户旁边有一张桌子。', '"There is a desk next to the window." — combines 旁边 place word, 有 existence, and measure word 张.', null, [ACT.vocabularyObjects]),
    createContentItem('门', 'mén', 'A door. The simplest one-syllable noun for an opening in a wall; the simplified character is a stylized rendering of double doors. Measure word 扇 (shàn): 一扇门 = "one door".', 'word', '请关门。', '"Please close the door." — polite imperative using 请 (qǐng, "please") + verb + object.', null, [ACT.vocabularyObjects]),
    createContentItem('书包', 'shūbāo', 'A school bag or backpack — literally "book-bag". The standard term for any student\'s backpack from primary school through university. Measure word 个 (gè) for casual, 只 (zhī) more formal.', 'word', '我的书包在椅子旁边。', '"My school bag is next to the chair." — possessive + location + 旁边 place word.', null, [ACT.vocabularyObjects]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: People & classroom actions
    // ────────────────────────────────────────────────────────────────────
    createContentItem('学生', 'xuésheng', 'A student — at any level from primary school to graduate research. The second syllable is neutral tone (sheng, NOT shēng — no tone mark). Plural with 们: 学生们 = "the students (as a group)".', 'word', '我们都是学生。', '"We are all students." — 都 (dōu, "all") inserted before the verb is a common adverb pattern.', null, [ACT.vocabularyPeopleActions]),
    createContentItem('老师', 'lǎoshī', 'A teacher — and also a respectful title used after a family name (王老师 = "Teacher Wang"). High-status address; can be used for any educator from primary school through university lecturers. Half-third sandhi: 老 dips low without full rise.', 'word', '王老师好!', '"Hello, Teacher Wang!" — the standard student-to-teacher greeting; family-name + 老师 is the polite default address.', null, [ACT.vocabularyPeopleActions]),
    createContentItem('同学', 'tóngxué', 'A classmate or fellow student — literally "same-study". Can be used as a noun ("my classmate") OR as a form of address from a teacher to a student ("同学，请回答" = "Student, please answer"). Two rising tones in a row.', 'word', '他是我的同学。', '"He is my classmate." — simple identification of a peer using 是 + possessive + noun.', null, [ACT.vocabularyPeopleActions]),
    createContentItem('上课', 'shàngkè', 'To attend class or "class starts" — a verb-object compound (上 + 课, literally "ascend lesson"). Used for both starting a class and being in a class. 上课了 means "class has started / time for class!".', 'word', '现在上课。', '"Class begins now." — typical announcement from a teacher at the start of a period.', null, [ACT.vocabularyPeopleActions]),
    createContentItem('下课', 'xiàkè', 'To finish class or "class ends" — verb-object compound (下 + 课, "descend lesson"); the natural opposite of 上课. 下课了 means "class is dismissed!".', 'word', '下课以后我们去吃饭。', '"After class we go eat." — uses 以后 (yǐhòu, "after") for sequencing.', null, [ACT.vocabularyPeopleActions]),
    createContentItem('听', 'tīng', 'To listen or to hear. Used both for active listening (listening to the teacher) and for the language skill (听力 tīnglì = "listening comprehension"). Simple object pattern: 听 + thing.', 'word', '请听老师说。', '"Please listen to what the teacher says." — combines 请 polite imperative + 听 + complement clause.', null, [ACT.vocabularyPeopleActions]),
    createContentItem('说', 'shuō', 'To speak or to say. Used for both reported speech ("she says…") and the language skill (口语 kǒuyǔ = "spoken language", 说话 shuōhuà = "talk"). Retroflex sh- initial — pair with practice from Activity 2.', 'word', '请用中文说。', '"Please say it in Chinese." — uses 用 (yòng, "use") to mark the means/instrument.', null, [ACT.vocabularyPeopleActions]),
    createContentItem('读', 'dú', 'To read or to read aloud. Distinct from 看书 (kàn shū, "to read a book silently") — 读 emphasizes vocal reading or studying out loud, as in 读课文 ("read the lesson text"). Also means "to study a subject" in compounds.', 'word', '请大家一起读。', '"Everyone please read together." — common classroom instruction; 一起 (yìqǐ, "together") modifies the verb.', null, [ACT.vocabularyPeopleActions]),
    createContentItem('写', 'xiě', 'To write. Used for any writing — characters, sentences, essays. Common compound: 写字 (xiě zì, "write characters"). 3rd-tone verb; in compounds like 写好 (write well) the sandhi can shift.', 'word', '请在本子上写字。', '"Please write the characters in your notebook." — combines 在 + place + 上 with verb-object 写字.', null, [ACT.vocabularyPeopleActions]),
    createContentItem('问', 'wèn', 'To ask (a question or a person). Standard pattern: 问 + person + question, or 问问题 (wèn wèntí, "ask a question"). Distinct from 请问 (qǐngwèn, "may I ask") which opens a polite inquiry.', 'word', '我可以问一个问题吗?', '"May I ask a question?" — combines modal 可以 (kěyǐ, "may") + 问 + measure word 个 + 问题 + 吗.', null, [ACT.vocabularyPeopleActions]),
    createContentItem('问题', 'wèntí', 'A question or a problem (both senses). Measure word 个 (gè): 一个问题 = "one question". Common in classroom phrases: 有问题吗? ("are there questions?"), 没问题 ("no problem").', 'word', '老师，我有一个问题。', '"Teacher, I have a question." — combines polite address + 有 + measure word + noun, a classroom staple.', null, [ACT.vocabularyPeopleActions]),
    createContentItem('回答', 'huídá', 'To answer (a question). Standard pattern: 回答 + question, or 回答问题 (huídá wèntí, "answer the question"). Verb-object structure; both syllables full-tone.', 'word', '请回答这个问题。', '"Please answer this question." — combines 请 polite + 回答 + demonstrative + measure word + noun, a typical teacher-to-student instruction.', null, [ACT.vocabularyPeopleActions]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar I: 这 / 那 + 是 demonstratives
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '这 vs 那',
      'zhè vs nà',
      'The two basic demonstratives. 这 (zhè) points at things CLOSE to the speaker; 那 (nà) points at things AWAY from the speaker (regardless of how close they are to the listener — Mandarin does NOT make the three-way "this/that-near-you/that-over-there" distinction that some languages do).',
      'sentence',
      '这是我的书。那是老师的书。',
      '"This is my book. That is the teacher\'s book." — same identification pattern, two different demonstratives based on distance from the speaker.',
      [
        { target: '这 zhè', note: '"this" — for objects near YOU (the speaker); retroflex zh- + 4th tone' },
        { target: '那 nà', note: '"that" — for objects AWAY from you, no further three-way split; alveolar n- + 4th tone' },
        { target: 'Two-way system', note: 'Unlike English ("this/that") or Spanish ("este/ese/aquel"), Mandarin makes only the near-vs-far split — listener distance does not change the choice' },
      ],
      [ACT.grammarDemonstratives],
    ),
    createContentItem(
      '这是 + Noun',
      'zhè shì + noun',
      'The standard identification pattern: 这 / 那 + 是 + noun. The copula 是 (from Unit 1) does not change form. To make it possessive, insert 的 + possessor between 是 and the noun: 这是我的书 ("this is my book").',
      'sentence',
      '这是书。这是我的书。那是老师的电脑。',
      'Three identification sentences building from bare noun → possessive noun → third-person possessive; the pattern stays identical, only the slot fillers change.',
      [
        { target: '这是 + noun', note: 'simplest identification: "this is X"' },
        { target: '这是 + 我的 + noun', note: 'with first-person possessive: "this is my X"; 的 (de) marks possession' },
        { target: '那是 + 老师的 + noun', note: 'third-person possessive with a named owner: "that is the teacher\'s X"' },
      ],
      [ACT.grammarDemonstratives],
    ),
    createContentItem(
      '这个 / 那个 + 量词',
      'zhège / nàge + measure word',
      'When pointing at a SPECIFIC countable item, insert a classifier (measure word) between the demonstrative and the noun. The default classifier 个 (gè, neutral tone) works in most casual contexts: 这个书 → "this book". With other measure words: 这本书 (one volume), 这支笔 (one stick).',
      'sentence',
      '这个学生 — "this student" · 这本书 — "this (volume of) book" · 那支笔 — "that (one) pen"',
      'Mandarin requires a measure word for any specific countable object — there is no bare 这+noun for specific items in formal speech (一 + measure + noun pattern carries over from quantities).',
      [
        { target: '这个/那个 + noun', note: 'generic measure-word 个; works with most nouns in casual speech' },
        { target: '这本 + book', note: '本 is the measure word for bound volumes (books, magazines, notebooks)' },
        { target: '这支 + pen', note: '支 is the measure word for stick-shaped objects (pens, cigarettes, chopsticks)' },
        { target: '这张 + desk/paper', note: '张 is the measure word for flat objects (desks, paper, tickets, photos)' },
      ],
      [ACT.grammarDemonstratives],
    ),
    createContentItem(
      '这是什么? / 那是谁?',
      'zhè shì shénme? / nà shì shéi?',
      'Form identification questions by replacing the predicate noun with a question word: 什么 (shénme, "what") for things, 谁 (shéi, "who") for people. Word order does NOT change — the question word stays where the answer noun would go.',
      'sentence',
      '这是什么? — 这是课本。\n那是谁? — 那是王老师。',
      'Mirror pairs of question and answer; notice the question word and the answer noun occupy the same slot — Mandarin question-formation is much simpler than English wh-movement.',
      [
        { target: '这是什么?', note: '"What is this?" — for asking about a thing' },
        { target: '那是谁?', note: '"Who is that?" — for asking about a person' },
        { target: 'No movement', note: 'The question word stays in place; this is the same pattern from Unit 1 (你叫什么名字?)' },
      ],
      [ACT.grammarDemonstratives],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar II: 在 + place words
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '在 — to be at/in/on',
      'zài',
      '在 (zài) is a verb meaning "to be located at/in/on". Standard pattern: subject + 在 + place. Unlike English "to be", 在 is used ONLY for location — for identity you still use 是 (from Unit 1). Mixing them up is a top beginner error.',
      'sentence',
      '老师在教室。学生在外面。书在桌子上。',
      '"The teacher is in the classroom. The students are outside. The book is on the desk." — three location sentences using the same 在 + place pattern.',
      [
        { target: '在 vs 是', note: '在 = location ("is AT"); 是 = identity ("is A"). 我是学生 ≠ 我在学生 (the latter is wrong/nonsense)' },
        { target: 'Subject + 在 + place', note: 'no preposition needed — 在 itself is the verb meaning "to be at"' },
        { target: 'Negation 不在', note: '"is not at"; 不 directly precedes 在: 老师不在 = "the teacher is not here"' },
      ],
      [ACT.grammarLocation],
    ),
    createContentItem(
      '里 / 上 / 下',
      'lǐ / shàng / xià',
      'Place-suffix words attached AFTER a noun to specify exactly where: 里 (lǐ, "inside"), 上 (shàng, "on top of"), 下 (xià, "underneath"). Pattern: subject + 在 + noun + 里/上/下. The noun + suffix combination together forms the "place" argument of 在.',
      'sentence',
      '书在书包里。 (in the bag)\n本子在桌子上。 (on the desk)\n笔在椅子下。 (under the chair)',
      'Three minimal contrastive sentences showing the three core suffixes; the noun stays the same shape, only the suffix changes the spatial meaning.',
      [
        { target: '里 lǐ', note: '"inside" — for containers, rooms, buildings (书包里 in the bag, 教室里 in the classroom)' },
        { target: '上 shàng', note: '"on top of / on the surface of" — for flat surfaces (桌子上 on the desk, 黑板上 on the board)' },
        { target: '下 xià', note: '"underneath / below" — for vertical positioning (椅子下 under the chair)' },
      ],
      [ACT.grammarLocation],
    ),
    createContentItem(
      '旁边 / 前面 / 后面',
      'pángbiān / qiánmiàn / hòumiàn',
      'Two-syllable place words for relational positioning. Same pattern: noun + 旁边 / 前面 / 后面 forms the place argument of 在. These are full-noun phrases, so they can also be the SUBJECT of a sentence (旁边有一把椅子 = "next to it there is a chair").',
      'sentence',
      '老师在黑板前面。 (in front of the board)\n学生在老师后面。 (behind the teacher)\n椅子在桌子旁边。 (next to the desk)',
      'Three contrasted relational positions; common in describing classroom layout or seating arrangements.',
      [
        { target: '旁边 pángbiān', note: '"next to / beside" — adjacent positioning, either side' },
        { target: '前面 qiánmiàn', note: '"in front of" — for spatial or sequential ordering' },
        { target: '后面 hòumiàn', note: '"behind / at the back of" — opposite of 前面' },
      ],
      [ACT.grammarLocation],
    ),
    createContentItem(
      '在哪里? / 在哪儿?',
      'zài nǎlǐ? / zài nǎr?',
      'Ask where something is by replacing the place argument with 哪里 (nǎlǐ, southern/standard) or 哪儿 (nǎr, northern/Beijing-flavored). Both mean "where"; the choice is regional rather than registral. Sandhi: 哪里 spoken as nálǐ.',
      'sentence',
      '老师在哪里? — 老师在教室里。\n书在哪儿? — 在桌子上。',
      'Question + answer pairs showing the two variants 哪里 and 哪儿; both are correct, choice depends on speaker region.',
      [
        { target: '哪里 nǎlǐ', note: '"where" — standard / southern variant; universally understood' },
        { target: '哪儿 nǎr', note: '"where" — Beijing / northern variant; very common in Mainland speech' },
        { target: 'Same word order', note: 'Question word stays in the place slot; no fronting — same rule as 什么 from Grammar I' },
      ],
      [ACT.grammarLocation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar III: 有 / 没有 existence
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '有 — there is/are',
      'yǒu',
      '有 (yǒu) covers BOTH "to have" (possession) AND "there is/are" (existence). For existence, the pattern is: Place + 有 + Thing. The place comes FIRST — unlike English "there is a book in the classroom", Mandarin says 教室里有书 ("classroom-in have book").',
      'sentence',
      '教室里有学生。 桌子上有书和笔。',
      '"There are students in the classroom. There are books and pens on the desk." — place-first word order is the defining feature of existence sentences in Mandarin.',
      [
        { target: 'Place + 有 + Thing', note: 'existence: "in PLACE there is/are THING"; place comes FIRST' },
        { target: 'Person + 有 + Thing', note: 'possession: "PERSON has THING" (我有书 = "I have a book")' },
        { target: '有 = "have" + "exist"', note: 'one verb covers both meanings — the subject (place vs person) tells you which reading' },
      ],
      [ACT.grammarExistence],
    ),
    createContentItem(
      '没有 — irregular negation',
      'méiyǒu',
      'IMPORTANT IRREGULARITY: 有 is the ONE verb that does NOT pair with 不 for negation. Instead, use 没 (méi): 没有 = "do not have / there is/are not". NEVER say 不有 — this is one of the most marked beginner errors. All other verbs use 不.',
      'sentence',
      '我没有笔。 教室里没有投影仪。',
      '"I don\'t have a pen. There is no projector in the classroom." — same place-first / person-first structure as 有, only the negation changes.',
      [
        { target: '没有 méiyǒu', note: 'correct negation of 有; literally "not-have"' },
        { target: '不有 (WRONG)', note: 'ungrammatical — never used by native speakers; one of the top-three beginner errors' },
        { target: 'Why this exception?', note: '没 historically negates existence and past events; 有 belongs to that semantic family so it took 没 instead of 不' },
      ],
      [ACT.grammarExistence],
    ),
    createContentItem(
      '有……吗? — yes/no question',
      'yǒu … ma?',
      'Form a yes/no question about possession or existence by adding 吗 at the end. Standard short answers: 有 (affirmative) or 没有 (negative) — repeat the verb, do not use English-style 是 / 不是 ("yes/no").',
      'sentence',
      '你有笔吗? — 有。/ 没有。\n教室里有电脑吗? — 有，有两台。',
      'Mirror pairs of question and short answer; notice the short answer just repeats the verb in either polarity — much simpler than English yes/no.',
      [
        { target: '你有……吗?', note: '"do you have…?" — for possession questions' },
        { target: 'Place + 有……吗?', note: '"is there… in PLACE?" — for existence questions' },
        { target: 'Answer: 有 / 没有', note: 'short answer = repeat the verb; "是/不是" is for 是 questions only' },
      ],
      [ACT.grammarExistence],
    ),
    createContentItem(
      '有没有 — V-not-V question',
      'yǒu méi yǒu',
      'Alternative question form: place the verb and its negation back-to-back to ask a yes/no question without 吗. 你有没有笔? = 你有笔吗? Both mean "do you have a pen?". The 有没有 form sounds slightly more casual and is very common in conversation.',
      'sentence',
      '你有没有问题? — 没有。\n桌子上有没有书? — 有，有三本。',
      'The V-not-V form gives the listener both options explicitly — a politeness softener in some contexts, a casual tag in others.',
      [
        { target: '有没有 + N?', note: '"have-not-have N?" — V-not-V yes/no question form' },
        { target: 'Equivalent to V + 吗?', note: 'same meaning as 有……吗; choice is mostly stylistic' },
        { target: 'Works with most verbs', note: '是不是, 去不去, 听不听 — the same V-not-V pattern generalizes' },
      ],
      [ACT.grammarExistence],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '清华的一间教室',
      'Qīnghuá de yī jiān jiàoshì',
      'A short five-sentence paragraph describing a typical Tsinghua classroom. Read aloud with correct tones, sandhi, and natural rhythm. Notice the layered structure: identify the room → list what is in it → say where each thing is → close with people.',
      'sentence',
      '这是清华大学的一间教室。教室里有黑板、桌子和椅子。黑板前面有一张大桌子，是老师的桌子。桌子上有一台电脑和一本课本。教室里有很多学生，他们都在听王老师讲课。',
      'Translation: "This is a classroom at Tsinghua University. In the classroom there is a blackboard, desks, and chairs. In front of the blackboard there is a big desk — that\'s the teacher\'s desk. On the desk there is a computer and a textbook. There are many students in the classroom; they are all listening to Teacher Wang lecture."',
      [
        { target: '这是清华大学的一间教室', note: '"This is a classroom at Tsinghua University" — opening identification with 这是 + possessive 的 + measure word 间' },
        { target: '教室里有……', note: '"in the classroom there is/are…" — Place + 有 + Things existence pattern with items connected by 和' },
        { target: '黑板前面有一张大桌子', note: '"in front of the blackboard there is a big desk" — place + 前面 + 有 + measure word 张 + adjective + noun' },
        { target: '桌子上有……', note: '"on the desk there is…" — narrowing the location with 上 to a specific surface' },
        { target: '他们都在听王老师讲课', note: '"they are all listening to Teacher Wang lecture" — 都 (all) + 在 progressive marker + verb + object; introduces 在 as a progressive in addition to its locative use' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '理解问题',
      'lǐjiě wèntí',
      'Four standard comprehension questions matching the paragraph. Answer each in a short sentence using 有 / 在 / 是 from this lesson. Full sentences are encouraged here — they reinforce the grammar.',
      'sentence',
      'Q1: 教室里有什么? Q2: 老师的桌子在哪里? Q3: 桌子上有什么? Q4: 学生在做什么?',
      'Four questions covering existence (Q1, Q3), location (Q2), and action (Q4) — exactly the three grammar points this lesson trains.',
      [
        { target: 'A1: 教室里有黑板、桌子和椅子。', note: 'existence answer using place + 有 + listed things; reuses the paragraph\'s phrasing' },
        { target: 'A2: 老师的桌子在黑板前面。', note: 'location answer using 在 + place + 前面; the noun + place-suffix forms the answer slot' },
        { target: 'A3: 桌子上有一台电脑和一本课本。', note: 'existence answer with measure words 台 (for computer) and 本 (for book)' },
        { target: 'A4: 学生在听王老师讲课。', note: 'action answer using 在 + verb to express ongoing action; reuses the paragraph\'s verb' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Listening & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '同学之间 (对话)',
      'tóngxué zhī jiān (duìhuà)',
      'A 4-turn casual dialogue between two Tsinghua students before class starts. Covers identification (这是…), location (在…里), existence (有/没有), and the polite borrowing micro-pattern — all the grammar from this lesson in one short scene.',
      'conversation',
      'A: 这是你的课本吗?\nB: 是，这是我的中文课本。你的呢?\nA: 我的课本在书包里。我的笔不见了 — 你有笔吗?\nB: 有，我有一支铅笔。给你。\nA: 谢谢! 对了，王老师在哪里?\nB: 王老师在前面，他在跟另一个同学说话。',
      'Translation: "A: Is this your textbook? B: Yes, this is my Chinese textbook. What about yours? A: My textbook is in my bag. My pen is missing — do you have a pen? B: Yes, I have a pencil. Here. A: Thanks! By the way, where is Teacher Wang? B: Teacher Wang is at the front — he\'s talking to another classmate."',
      [
        { target: '这是你的课本吗?', note: 'identification + 吗 question; the opening "is this yours?" used when picking up an unfamiliar item' },
        { target: '你的呢? nǐ de ne?', note: '"and yours?" — return-the-question pattern using 呢 to shift focus to the listener; high-frequency in casual conversation' },
        { target: '不见了 bù jiàn le', note: '"is missing / has disappeared" — set phrase for things you cannot find; preview of the 了 aspect marker' },
        { target: '给你 gěi nǐ', note: '"here you go" — set phrase used when handing something over; literal "give-you"' },
        { target: '对了 duì le', note: '"oh, by the way" — discourse marker for introducing a new topic mid-conversation; high-frequency in spoken Mandarin' },
        { target: '在跟……说话', note: '"is talking to…" — 在 progressive marker + 跟 (gēn, "with") + person + 说话 (talk); preview of how 在 functions both as locative and progressive' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      '老师与学生 (对话 — 正式)',
      'lǎoshī yǔ xuésheng (duìhuà — zhèngshì)',
      'A formal first-class dialogue between a Tsinghua professor and a new student. Notice the register markers: 您 instead of 你, family-name + 老师 address, 同学 used by the teacher to address the student. Vocabulary and grammar are the same; only the register shifts.',
      'conversation',
      '老师: 同学，请问你叫什么名字?\n学生: 老师好! 我叫莎拉。我是您今年的新学生。\n老师: 欢迎，欢迎。这是我们今天的课本，您看过吗?\n学生: 还没有看过。请问课本在哪里买?\n老师: 教室外面有一个小书店，那里有这本课本。\n学生: 好的，谢谢老师。',
      'Translation: "Teacher: Student, may I ask your name? Student: Hello, Teacher! My name is Sarah. I am one of your new students this year. Teacher: Welcome, welcome. This is today\'s textbook — have you read it? Student: Not yet. Where can I buy the textbook? Teacher: Outside the classroom there is a small bookstore; they have this textbook. Student: Okay, thank you, Teacher."',
      [
        { target: '同学 used as address', note: 'teachers commonly address individual students as 同学 ("classmate") rather than by name in initial encounters; polite and neutral' },
        { target: '请问 qǐngwèn', note: '"may I ask" — opens a polite question; standard in formal or service contexts' },
        { target: '您 nín', note: 'student uses 您 with the teacher; a teacher may use either 你 or 您 with a student — using 您 shows extra respect for an older student or graduate' },
        { target: '看过 kàn guò', note: '"have read" — preview of the experiential aspect marker 过 (guo); means "have done X at some point"' },
        { target: '教室外面有……', note: 'place + 外面 + 有 existence pattern; uses 外面 (outside) as a complementary place-suffix to the 里 (inside) you learned in Grammar II' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '写作模板',
      'xiězuò múbǎn',
      'A reusable 5-sentence template for describing any classroom or room. Fill in the bracketed slots with your real environment — the structure walks you through identification, existence, location, and a personal observation.',
      'sentence',
      '这是 [房间名]。[房间] 里有 [物品1]、[物品2] 和 [物品3]。[物品1] 在 [位置]。[人] 在 [位置]，他/她在 [动作]。我喜欢这间 [房间]。',
      'Translation: "This is [room name]. In [room] there is [item 1], [item 2], and [item 3]. [Item 1] is at/on/in [position]. [Person] is at [position]; he/she is [doing action]. I like this [room]."',
      [
        { target: '[房间名]', note: 'name of the room: 教室 (classroom), 图书馆 (library), 宿舍 (dorm), 办公室 (office)' },
        { target: '[物品]', note: 'objects from Vocab I, joined with 、(enumeration comma) and final 和 (and) before the last item' },
        { target: '[位置]', note: 'noun + place suffix (里/上/下/旁边/前面/后面) — use a different one for each sentence to vary your description' },
        { target: '[动作]', note: 'verb from Vocab II (听 / 说 / 读 / 写 / 看书…) — pair with 在 as a progressive marker for ongoing action' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '写作练习',
      'xiězuò liànxí',
      'Write your own 4–5 sentence description of the real room you are sitting in right now. Use the template, but pick a different verb and different place words from the model. Use 有 at least twice (one affirmative, one negative) and 在 at least twice.',
      'sentence',
      '示例: 这是我的宿舍。宿舍里有桌子、椅子和一张床。我的电脑在桌子上，书在桌子旁边。我在书桌前面学习。宿舍里没有投影仪，但是有一台小电视。我很喜欢我的宿舍。',
      'Translation: "This is my dorm room. In the dorm there is a desk, a chair, and a bed. My computer is on the desk; my books are next to the desk. I am studying in front of my desk. There is no projector in the dorm, but there is a small TV. I really like my dorm."',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '姓 + 老师',
      'xìng + lǎoshī',
      'In Mandarin-speaking classrooms, teachers are addressed by family name + 老师, NEVER by given name alone. 王芳 (a teacher) is 王老师, not 芳老师 and not just 王. This applies from primary school through university — even a graduate student calling a professor by first name would be a serious social error.',
      'sentence',
      '王老师 (Teacher Wang) · 李老师 (Teacher Li) · 陈老师 (Teacher Chen)',
      'Family-name-first ordering carries over from Unit 1; the title 老师 attaches to the family name and the given name is not used.',
      [
        { target: '王 + 老师 = 王老师', note: 'standard polite teacher address; works for any educator' },
        { target: 'NEVER 芳老师', note: 'given name + title is wrong; only family name + title is correct' },
        { target: 'Variation: 教授 (jiàoshòu)', note: 'for university professors specifically; family name + 教授 (李教授 = "Professor Li") is even more formal' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '起立 / 敬礼 / 老师好 / 坐下',
      'qǐlì / jìnglǐ / lǎoshī hǎo / zuòxià',
      'In many Mainland primary and middle schools, every class begins with a formal ritual. When the teacher enters, a student calls 起立 (stand up); everyone stands. The class then says 敬礼 (salute) or 老师好 (hello teacher); the teacher responds 同学们好 (hello students). Then 坐下 (sit down). The ritual is fading in universities but still common K-12.',
      'sentence',
      '班长: 起立! 全体: 老师好! 老师: 同学们好! 班长: 坐下!',
      'The class monitor (班长 bānzhǎng) leads the ritual; everyone responds in chorus — a remnant of Confucian classroom etiquette adapted into the modern Chinese school day.',
      [
        { target: '起立 qǐlì', note: '"stand up" — call from the class monitor' },
        { target: '敬礼 jìnglǐ / 老师好 lǎoshī hǎo', note: '"salute" (older form) or "hello teacher" (modern form) — chorus from the students' },
        { target: '同学们好 tóngxuémen hǎo', note: '"hello students" — chorus reply from the teacher; uses 们 to mark plural' },
        { target: '坐下 zuòxià', note: '"sit down" — final call from the monitor to begin class' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '大学的礼仪',
      'dàxué de lǐyí',
      'Modern Chinese university etiquette is less ritualized than K-12 but maintains key respect markers. The standing ritual is rare in lecture halls. However, addressing professors as family-name + 老师 (or 教授 for senior faculty), arriving on time, and not interrupting are non-negotiable. Asking questions usually means raising a hand and waiting for the lecturer to call on you.',
      'sentence',
      '老师，我可以问一个问题吗? — Standard polite raise-a-question form in any Chinese university classroom.',
      'Even informal Mainland universities maintain a hierarchy gap between students and faculty larger than the typical American classroom.',
      [
        { target: '我可以……吗?', note: '"may I…?" — polite request form using modal 可以' },
        { target: '老师 vs 教授', note: 'all faculty get 老师 as a safe default; only full professors specifically get 教授' },
        { target: 'Hand-raising', note: 'standard signal to ask a question; standing while asking is no longer required' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '任务: 清华课堂第一天',
      'rènwù: Qīnghuá kètáng dì yī tiān',
      'Roleplay your first day in a Tsinghua University classroom with the AI tutor playing your teacher 王老师 and one friendly classmate. Use every skill from this lesson in one continuous 8-turn scene — greet, identify three objects, locate two of them, ask one question about what is in the room.',
      'conversation',
      '[Tsinghua University, classroom, 9:00 AM]\n王老师: 同学，你好! 你叫什么名字?\n你: [打招呼 + 自我介绍]\n王老师: 欢迎! 这是今天的课本，给你。\n你: [谢谢老师 + 这是 identification of textbook]\n王老师: 你的同学坐在你旁边。\n[turn to classmate]\n同学: 你好，我叫李伟。请问你有笔吗?\n你: [回答 + 给笔 OR 没有笔]\n同学: 王老师的电脑在哪里? 我看不见。\n你: [使用 在 + 位置 回答]\n同学: 谢谢! 教室里有投影仪吗?\n你: [使用 有/没有 回答]\n你: [告别 to classmate]',
      'Eight turns of fluent exchange; the AI tutor will play both characters and respond naturally to whatever you say.',
      [
        { target: '打招呼 + 自我介绍', note: 'reuse the Unit 1 greeting + 我叫… + 我是…人 pattern' },
        { target: '这是 identification', note: 'point at the textbook and identify it using 这是 + noun (with possessive 的 if appropriate)' },
        { target: '有 / 没有', note: 'for the "do you have a pen" exchange — affirmative 有 or negative 没有 + reason' },
        { target: '在 + 位置', note: 'for the "where is the computer" question — subject + 在 + place + suffix' },
        { target: 'Place + 有 + Thing 吗?', note: 'for the "is there a projector" question — existential with 吗 yes/no marker' },
        { target: 'Register switch', note: 'use 您 with the teacher, 你 with the classmate — register consistency within each turn' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战 — 描述教室',
      'tiǎozhàn — miáoshù jiàoshì',
      'Stretch goal: in the same scene, the teacher asks you to describe the classroom to a new visiting student. Combine ALL three grammar points (这/那 + 是, 在 + place, place + 有) into a continuous 5-sentence description.',
      'conversation',
      '王老师: 莎拉，请你跟新同学介绍一下我们的教室。\n你: 好的! 这是清华的教室。教室里有……。 黑板在……。桌子上有……。门旁边有……。教室里没有……，但是有……。\n王老师: 很好! 你说得很好。',
      'A natural stretch task: same grammar, same vocab, but stitched into a coherent multi-sentence description; tests fluency over isolated patterns.',
      [
        { target: '这是清华的教室 (identification)', note: 'open with 这是 + possessive — Grammar I' },
        { target: '教室里有…… (existence)', note: 'list items using Place + 有 + things connected with 和 — Grammar III' },
        { target: '黑板在…… (location)', note: 'locate specific items using subject + 在 + place + suffix — Grammar II' },
        { target: '没有…… 但是有…… (negation + contrast)', note: 'use 没有 for what is absent and contrast with 但是 (dànshì, "but") + 有 for what is present' },
        { target: '说得很好', note: '"speak very well" — preview of the 得 (de) complement marker; the teacher\'s encouragement closes the scene' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
