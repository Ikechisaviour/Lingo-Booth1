// Level 1 Unit 14 — Ability (Mandarin Chinese)
// Functions: stating learned skills, current/situational ability, asking and
// granting permission, distinguishing the three Mandarin modal verbs for
// "can" — 会 (huì, learned skill), 能 (néng, situational ability), and
// 可以 (kěyǐ, permission/possibility) — plus their three different "cannot"
// counterparts.
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
  orientation: 'zh-l1u14-orientation',
  pronunciation: 'zh-l1u14-pronunciation',
  vocabularySkills: 'zh-l1u14-vocab-skills',
  vocabularyDegree: 'zh-l1u14-vocab-degree',
  grammarHui: 'zh-l1u14-grammar-hui',
  grammarNeng: 'zh-l1u14-grammar-neng',
  grammarKeyi: 'zh-l1u14-grammar-keyi',
  reading: 'zh-l1u14-reading',
  listening: 'zh-l1u14-listening',
  writing: 'zh-l1u14-writing',
  culture: 'zh-l1u14-culture',
  task: 'zh-l1u14-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Pick the right modal — 会 / 能 / 可以 — for each situation: 会 for a learned skill, 能 for current physical or situational ability, 可以 for permission or possibility.',
      'Negate all three with 不会 / 不能 / 不可以 and feel the three different "cannot" meanings they carry.',
      'Ask another person what they can do, grade your own answer (会一点 / 会一些 / 还不太会), and reply modestly when complimented.',
    ],
    task: 'Picture yourself at a Tsinghua University club fair — a club leader asks 你会做什么? ("What can you do?"). By the end of this lesson you can describe your real skills truthfully and politely without mixing up the three modals.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in this lesson',
    goals: [
      'Pronounce 会 (huì) — the falling-tone fourth with rounded lips — distinctly from 回 (huí, second tone) and 灰 (huī, first tone); the tone alone separates these three high-frequency syllables.',
      'Pronounce 能 (néng) — second tone with the -ng nasal ending — without flattening it into 嫩 (nèn) or 冷 (lěng); the -ng ending is critical here.',
      'Apply the third-tone sandhi inside 可以 (kěyǐ): both syllables are written third tone, but the first 可 rises to second tone in speech, giving spoken kéyǐ — the same rule you already know from 你好.',
    ],
    task: 'Read each modal aloud three times: 会, 能, 可以 — then chain them in 我会, 我能, 我可以 and hear the rhythm difference.',
  },
  {
    id: ACT.vocabularySkills,
    section: 'Vocabulary I',
    title: 'Skill verbs — what people can do',
    goals: [
      'Use the 16 high-frequency skill verbs for languages, instruments, sports, art, daily-life skills, and digital skills.',
      'Notice which skill verbs take a built-in object (说英语 vs 唱歌 vs 跳舞) versus a free object (弹钢琴 / 弹吉他) — the structure changes how you negate or grade.',
    ],
    task: 'Pick three skills you actually have at different levels and one you wish you had — say each aloud with the right modal.',
  },
  {
    id: ACT.vocabularyDegree,
    section: 'Vocabulary II',
    title: 'Grading skills — how well, how much',
    goals: [
      'Use 一点 / 一些 / 一点点 to mean "a little" after the verb (会说一点 中文) — the degree comes AFTER the verb-object, not before like Korean 좀.',
      'Use 很会 ("very good at"), 还不太会 ("still not very good"), 完全不会 ("totally can\'t") to grade self-rating from high to zero.',
      'Use 还 (hái, "still / yet") + 不会 to signal "not yet" — softer than a flat 不会 because it implies you are still learning.',
    ],
    task: 'Pair each grading adverb with one of the skill verbs from Vocabulary I — say six rated self-evaluations aloud.',
  },
  {
    id: ACT.grammarHui,
    section: 'Grammar I',
    title: '会 (huì) — learned skill',
    goals: [
      'Use 会 + V for a skill you have LEARNED through study or practice: 我会说中文 ("I know how to speak Chinese"), 我会弹钢琴 ("I know how to play piano"). The defining feature is that the skill was acquired, not innate.',
      'Negate with 不会 — the standard "can\'t" for a skill you have not learned: 我不会开车 ("I don\'t know how to drive"). Different from 不能 ("can\'t right now") and 不可以 ("not allowed to").',
      'Use 会 a little (会一点 / 会一些) for modest self-rating — high-frequency in Chinese culture where overt skill-bragging is uncomfortable.',
    ],
    task: 'Write five sentences using 会 to describe skills you have learned, then add 一点 or 一些 to grade three of them.',
  },
  {
    id: ACT.grammarNeng,
    section: 'Grammar II',
    title: '能 (néng) — situational / physical ability',
    goals: [
      'Use 能 + V for an ability that depends on current circumstances — physical condition, time available, conditions allowing: 我今天能去 ("I can go today"), 我能游 一公里 ("I can swim one kilometer").',
      'Negate with 不能 — "can\'t under the current circumstances", not "don\'t know how": 我今天不能开车，我喝酒了 ("I can\'t drive today, I drank alcohol"). Implies the skill exists but conditions block it.',
      'Distinguish 会 vs 能 with the swim example: 我会游泳 (I know how to swim — learned skill) vs 我今天能游泳 (I can swim today — pool is open and I feel up to it).',
    ],
    task: 'For three skills, write one 会 sentence and one 能 sentence — feel the difference between "know how" and "can right now".',
  },
  {
    id: ACT.grammarKeyi,
    section: 'Grammar III',
    title: '可以 (kěyǐ) — permission and possibility',
    goals: [
      'Use 可以 + V to ASK or GRANT permission: 我可以进来吗? ("May I come in?"), 你可以坐这里 ("You may sit here"). The default modal for politeness with strangers and superiors.',
      'Use 可以 for general possibility — what is OPEN to be done — even when no specific person is asking: 这里可以拍照 ("Photos are allowed here").',
      'Negate with 不可以 — "not allowed", a soft prohibition often used on signs (不可以吸烟 "no smoking") or by teachers/parents. Different from 不能 ("conditions block") and 不会 ("can\'t / don\'t know how").',
    ],
    task: 'Ask three polite permission questions with 可以 + V + 吗 (entering a room, borrowing a pen, taking a photo), then practice the granting reply.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'Read a skills self-evaluation',
    goals: [
      'Read a 6-sentence skills paragraph aloud with correct modals, tones, and 第三声 sandhi inside 可以 and 我.',
      'Answer comprehension questions about WHICH modal is used WHEN — the test of whether the 会 / 能 / 可以 distinction has clicked.',
    ],
    task: 'Read the paragraph below, then answer four comprehension questions covering one example of each modal plus a negation.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'Comparing skills with a friend',
    goals: [
      'Follow a 6-turn dialogue between two Tsinghua students comparing language, music, and sport skills using all three modals.',
      'Reproduce the dialogue with your own real skills, swapping in the verbs and grades that fit you.',
    ],
    task: 'Read each turn aloud after the AI tutor, then perform the dialogue again with your own information in the same modal slots.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Write your own skill paragraph',
    goals: [
      'Write 4-5 sentences in Hanzi using ALL THREE modals (会 / 能 / 可以) plus one negation, so the writing demonstrates the core grammar contrast.',
      'Use one grading adverb (一点 / 一些 / 很 / 还不太会) so the paragraph shows realistic modesty rather than flat self-evaluation.',
    ],
    task: 'Write your own 4-5 sentence skill paragraph following the template, then read it aloud with correct sandhi and modal stress.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: 'Modesty, 才艺 culture, and Chinese clubs',
    goals: [
      'Reply to a skill compliment with 哪里哪里 ("not at all"), 还好 ("so-so"), or 还不太会 ("still not very good") — direct agreement ("是的，我很厉害") sounds arrogant in most Chinese contexts.',
      'Recognize the 才艺 (cáiyì, "talents and arts") culture in Chinese variety shows — variety contestants are expected to display 才艺 like singing, dancing, or playing a Chinese instrument, often introduced with 我会….',
      'Know that 学生社团 (xuésheng shètuán, "student clubs") at Chinese universities heavily emphasize traditional 才艺 like 古筝 (gǔzhēng) and 二胡 (èrhú) alongside modern ones like guitar and dance.',
    ],
    task: 'Practice the three modest replies to "你中文说得真好!" ("You speak Chinese really well!") and use whichever fits your real comfort level.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'Club fair at Tsinghua — in Mandarin',
    goals: [
      'Combine all three modals plus one negation in one continuous club-fair scene at Tsinghua University.',
      'Ask a club leader 你们这里可以学什么? ("What can I learn here?") and respond to their follow-up questions about your existing skills.',
    ],
    task: 'Roleplay the Tsinghua club fair with the AI tutor playing a 古筝社 (Guzheng Club) leader; aim for a 6-turn exchange using 会 / 能 / 可以 naturally.',
  },
];

const lesson = {
  title: 'Level 1 · Unit 14: 我会说中文 — Ability (会 / 能 / 可以)',
  category: 'daily-life',
  difficulty: 'beginner',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'stating-learned-skill', label: 'Stating a learned skill', goal: 'Use 会 + V to describe a skill you acquired through study or practice, optionally graded with 一点 / 一些.' },
    { id: 'stating-current-ability', label: 'Stating current ability', goal: 'Use 能 + V to describe what you can do under the current circumstances (today, this hour, with these conditions).' },
    { id: 'asking-permission', label: 'Asking permission politely', goal: 'Use 可以 + V + 吗? to ask whether you are allowed to do something; reply with 可以 / 不可以 to grant or refuse.' },
    { id: 'replying-modestly', label: 'Replying modestly to a compliment', goal: 'Deflect a skill compliment with 哪里哪里 or 还不太会 instead of direct agreement — the culturally expected response.' },
  ],
  relatedPools: ['topic-people', 'topic-hobbies'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '本课目标',
      'běn kè mùbiāo',
      'By the end of this lesson, you can pick the right modal — 会 / 能 / 可以 — for each situation, grade your skill level with 一点 / 一些 / 还不太, and reply modestly when complimented. The three-modal distinction is the heart of describing ability in Mandarin.',
      'word',
      'Functions: 学过的技能 xuéguo de jìnéng (learned skill, 会) · 当前的能力 dāngqián de nénglì (current ability, 能) · 许可 xǔkě (permission, 可以) · 谦虚 qiānxū (modest reply)',
      'These four micro-skills are the spine of any "what can you do" conversation in Mandarin — getting the modal right is more important than getting the verb right.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      '真实场景',
      'zhēnshí chǎngjǐng',
      'You are at the Tsinghua University club fair (清华大学社团招新) and a club leader walks up with a clipboard. The whole encounter takes about 30 seconds and you will need to choose 会, 能, or 可以 correctly several times.',
      'word',
      '社团负责人: "你好！我们是古筝社。你会弹乐器吗?"',
      'A typical opener from a Tsinghua student-club leader: polite 你好 + club introduction + immediate skill question with 会 — the canonical "learned skill" frame for music.',
      [
        { target: '古筝社 gǔzhēng shè', note: 'Guzheng Club; one of the most common Chinese-instrument clubs at universities' },
        { target: '你会弹乐器吗?', note: 'literal: "you know how to play instruments?" — uses 会 because instrument-playing is a learned skill' },
        { target: '我会一点 / 我不会', note: 'two natural answers; both rate honestly, with 一点 the modest middle option' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '三个 "能" 的对比',
      'sān gè "néng" de duìbǐ',
      'Mandarin has THREE different modal verbs that English translates as "can": 会 (huì) for learned skills, 能 (néng) for current physical or situational ability, 可以 (kěyǐ) for permission or possibility. Mixing them up is the single biggest "can" error for English speakers.',
      'word',
      '我会游泳 (I know how to swim — learned skill) · 我今天能游泳 (I can swim today — feel well, pool open) · 我可以在这里游泳吗? (May I swim here? — permission)',
      'Three sentences, three different "cans" — only one is grammatically correct for any given situation, and they are not interchangeable.',
      [
        { target: '会 huì — learned skill', note: 'a skill you acquired through study or practice; negation 不会 = "don\'t know how"' },
        { target: '能 néng — current ability', note: 'an ability that depends on conditions right now; negation 不能 = "can\'t in these conditions"' },
        { target: '可以 kěyǐ — permission', note: 'something you are allowed to do or that is possible; negation 不可以 = "not allowed"' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '会',
      'huì',
      'Single fourth-tone syllable with rounded lips and sharp falling pitch. Tone alone separates this from 回 (huí, "return", second tone) and 灰 (huī, "ash", first tone) — three high-frequency words sharing the same initial and final.',
      'word',
      '会 huì (can / will) · 回 huí (return) · 灰 huī (ash) — same letters, three different tones, three different words',
      'A textbook minimal tone-triple; mastering it locks in fourth-tone production with rounded lips.',
      [
        { target: '会 huì (4th)', note: 'sharp falling pitch; "can / will / a meeting"' },
        { target: '回 huí (2nd)', note: 'rising pitch; "to return"' },
        { target: '灰 huī (1st)', note: 'high level pitch; "gray / ash"' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '能',
      'néng',
      'Second-tone syllable with the -ng nasal ending (back of tongue against soft palate). Distinct from 嫩 (nèn, "tender", fourth tone with -n ending) and 冷 (lěng, "cold", different vowel) — the -ng and the rising tone together are the diagnostic features.',
      'word',
      '能 néng (can) · 嫩 nèn (tender) · 冷 lěng (cold) — three nasal-ending syllables to distinguish',
      'Mandarin\'s -n vs -ng contrast is meaning-bearing; pronouncing 能 as nén (with -n) sounds like a different word entirely.',
      [
        { target: '能 néng', note: '-ng ending: back of tongue on soft palate, like English "-ng" in "sing"' },
        { target: '2nd tone', note: 'rising pitch from middle to high; distinct from the 4th tone of 会' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '可以',
      'kěyǐ (spoken: kéyǐ)',
      'Two third tones in a row trigger third-tone sandhi: the first 可 (kě) rises to second tone in speech, while the second 以 (yǐ) keeps the full third tone. Written tones do not change; same sandhi rule you already know from 你好 (nǐ hǎo → ní hǎo).',
      'word',
      '可以 written: kěyǐ → spoken: kéyǐ /kʰə³⁵ i²¹⁴/',
      'A high-frequency permission word; ignoring the sandhi makes the polite request sound robotic.',
      [
        { target: '可 (written: kě, 3rd)', note: 'first syllable; would be full third tone in isolation' },
        { target: '可 (spoken: ké, 2nd)', note: 'becomes rising because the next syllable is also third tone — sandhi rule' },
        { target: '以 (yǐ, 3rd, unchanged)', note: 'second syllable; keeps the full third-tone dip-and-rise' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '不会 / 不能 / 不可以',
      'bú huì / bù néng / bù kěyǐ',
      'Three negations with three different sandhi outcomes. 不会: 不 becomes bú (rising) before the fourth-tone 会. 不能: 不 stays bù (fourth) because 能 is second tone. 不可以: 不 stays bù (fourth) because 可 is third tone — but inside 可以 the sandhi still applies (kéyǐ).',
      'word',
      '不会 bùhuì → búhuì · 不能 bùnéng (no sandhi) · 不可以 bù kéyǐ (no sandhi on 不, sandhi inside 可以)',
      'Three high-frequency "cannot" forms; each follows the 不 sandhi rule independently — applying it wrong sounds non-native.',
      [
        { target: '不 + 4th → bú (rises)', note: '不会, 不去, 不要 — all rise to bú in speech' },
        { target: '不 + 1st/2nd/3rd → bù (no change)', note: '不能, 不可, 不来 — keep the full fourth tone' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '我会说中文',
      'wǒ huì shuō Zhōngwén',
      'The most common Chinese-learner sentence stacks three different tones: 3rd (我) + 4th (会) + 1st (说) + 1st-2nd (中文). The third-tone 我 keeps its dip-and-rise because the next syllable is a different tone. The whole sentence is a tone-drilling minigym.',
      'sentence',
      '我会说中文 wǒ huì shuō Zhōngwén ("I can speak Chinese")',
      'Identify each tone aloud, then run it at conversational speed without losing the contour.',
      [
        { target: '我 wǒ (3rd)', note: 'full third-tone dip-and-rise; first syllable of the sentence' },
        { target: '会 huì (4th)', note: 'sharp falling fourth tone; the modal' },
        { target: '说 shuō (1st)', note: 'high level first tone; "to speak"' },
        { target: '中文 Zhōngwén (1st+2nd)', note: 'high level + rising; "Chinese language"' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Skill verbs
    // ────────────────────────────────────────────────────────────────────
    createContentItem('说', 'shuō', 'Verb "to speak / to say". Paired with a language name (说中文, 说英语) it is the default verb for language-skill statements. Replaces 说 with 讲 (jiǎng) in slightly more formal contexts.', 'word', '我会说一点中文。', 'Standard learner-level self-rating; the 一点 ("a little") signals modest skill — the expected Chinese register.', null, [ACT.vocabularySkills]),
    createContentItem('说英语', 'shuō Yīngyǔ', 'Speak English — fixed verb-object compound. Use with 会 for learned-skill ability: 你会说英语吗? ("Do you know English?"). The default first-meeting language-skill question.', 'word', '你会说英语吗? — 会说一点。', 'Polite peer-level exchange; 一点 keeps the answer modest even if the speaker is actually fluent.', null, [ACT.vocabularySkills]),
    createContentItem('说中文', 'shuō Zhōngwén', 'Speak Chinese (Mandarin). The expected response from a foreign learner at Tsinghua is 我会说一点 ("I can speak a little"), even at intermediate level — flat 我会 sounds too confident.', 'word', '我会说中文，不过还不太好。', 'Modest self-introduction; 不过 ("but / however") + 还不太好 ("still not very good") softens any claim of skill.', null, [ACT.vocabularySkills]),
    createContentItem('说日语', 'shuō Rìyǔ', 'Speak Japanese — same verb-object compound pattern as 说英语 / 说中文. Often combined with 一点 when the speaker is a non-Asian learner, who is presumed by default not to know Japanese.', 'word', '我也会说日语，可是说得不好。', '"I also speak Japanese, but not well" — uses 也 ("also") and 说得不好 ("speak it badly") as a layered modest reply.', null, [ACT.vocabularySkills]),
    createContentItem('弹', 'tán', 'Verb "to play (a string or keyboard instrument)". Specific to 钢琴 (piano), 吉他 (guitar), 古筝 (guzheng), 琵琶 (pipa) — instruments where you strike strings or keys. Different from 拉 (lā, used for bowed strings) and 吹 (chuī, used for wind instruments).', 'word', '我会弹一点钢琴。', 'The verb is fixed by the instrument family; never say 玩钢琴 or 做钢琴 — both are wrong.', null, [ACT.vocabularySkills]),
    createContentItem('弹钢琴', 'tán gāngqín', 'Play piano — the canonical example of a 弹 instrument. 钢琴 is the universal piano; piano lessons (钢琴课) are extremely common in Chinese middle-class households, so this skill is high-frequency in self-introductions.', 'word', '我从小就会弹钢琴。', '"I have known how to play piano since I was a child" — 从小 ("from childhood") signals long-acquired skill.', null, [ACT.vocabularySkills]),
    createContentItem('弹吉他', 'tán jítā', 'Play guitar — 吉他 is a phonetic transliteration of English "guitar". A common university-club skill; 吉他社 (Guitar Club) exists at almost every Chinese campus.', 'word', '我朋友会弹吉他，他参加了吉他社。', '"My friend plays guitar; he joined the Guitar Club" — 参加 ("join") + 社 ("club") is the canonical club-membership phrasing.', null, [ACT.vocabularySkills]),
    createContentItem('唱歌', 'chàng gē', 'Sing — verb-object compound 唱 ("sing") + 歌 ("song"). Cannot be split; you do not need a song as object since 歌 is built in. Use 唱中文歌 to specify "sing Chinese songs".', 'word', '我会唱歌，可是唱得不好。', '"I can sing, but I don\'t sing well" — 唱得不好 uses the 得 complement to grade the action.', null, [ACT.vocabularySkills]),
    createContentItem('跳舞', 'tiào wǔ', 'Dance — verb-object compound 跳 ("jump") + 舞 ("dance"). Built-in object structure; you do not need to add 舞蹈 separately. 跳舞 is the everyday word; 舞蹈 (wǔdǎo) is the formal/artistic noun.', 'word', '她会跳舞，是舞蹈社的。', '"She dances; she\'s in the Dance Club" — distinguishes the everyday verb 跳舞 from the academic-noun 舞蹈.', null, [ACT.vocabularySkills]),
    createContentItem('打篮球', 'dǎ lánqiú', 'Play basketball — 打 ("strike / hit") is the verb used for ball-hitting sports (basketball, tennis, table tennis). Different from 踢 (tī, used for kicking sports like soccer) and 滑 (huá, used for sliding sports like skating).', 'word', '我会打篮球，但是打得不太好。', 'Modest self-rating; 但是 ("but") + 打得不太好 ("don\'t hit it very well") follows the standard layered structure.', null, [ACT.vocabularySkills]),
    createContentItem('踢足球', 'tī zúqiú', 'Play soccer — 踢 ("kick") + 足球 ("foot-ball"). The verb is fixed by the sport: you 踢足球 but 打篮球. Mixing them up (打足球) is a learner error that natives notice instantly.', 'word', '我会踢足球，可是不会打篮球。', 'Pairs the two big-team sports with their correct verbs; useful contrast for memorizing 打 vs 踢.', null, [ACT.vocabularySkills]),
    createContentItem('打网球', 'dǎ wǎngqiú', 'Play tennis — 打 ("hit") + 网球 ("net-ball"). Same verb pattern as 打篮球; both ball sports use 打 because the verb describes hitting the ball, not kicking it.', 'word', '清华有很多网球场，可以打网球。', '"Tsinghua has many tennis courts where you can play tennis" — uses 可以 (possibility) plus the activity.', null, [ACT.vocabularySkills]),
    createContentItem('游泳', 'yóu yǒng', 'Swim — verb-object compound 游 ("swim") + 泳 ("swimming"). The verb 游 alone is rare; the full 游泳 is the conversational word. This is the classic example for distinguishing 会 (learned skill) from 能 (today\'s ability).', 'word', '我会游泳，但是今天不能游 — 我感冒了。', '"I know how to swim, but I can\'t today — I have a cold." — the canonical sentence that shows 会 vs 能 difference.', null, [ACT.vocabularySkills]),
    createContentItem('做饭', 'zuò fàn', 'Cook — verb-object compound 做 ("make / do") + 饭 ("food / rice / meal"). 做饭 covers cooking in general, not just rice. The formal-noun version 烹饪 (pēngrèn, "culinary art") is rare in everyday speech.', 'word', '我会做饭，最喜欢做面条。', '"I can cook, I most like making noodles" — adds specificity with 最喜欢 ("most like") + 面条 ("noodles").', null, [ACT.vocabularySkills]),
    createContentItem('开车', 'kāi chē', 'Drive — verb-object compound 开 ("open / operate") + 车 ("vehicle / car"). 开 is the verb used for operating any vehicle (车 car, 飞机 plane, 船 boat). 不会开车 ("don\'t know how to drive") is a common confession from young urban Chinese who rely on subways.', 'word', '我还不会开车，每天坐地铁。', '"I still can\'t drive; I take the subway every day" — 还 ("still") softens the admission by implying "but I might learn".', null, [ACT.vocabularySkills]),
    createContentItem('画画', 'huà huà', 'Paint / draw — verb-object compound 画 ("paint / draw") + 画 ("picture"). Two characters look identical but the second one is the noun. The compound covers both painting and sketching; for specific media use 画油画 (oil painting) or 画水墨画 (ink wash painting).', 'word', '她会画画，画得很好。', '"She can draw; she draws well" — uses 画得很好 with the 得 complement; 很好 means "very good", the high-grade rating.', null, [ACT.vocabularySkills]),
    createContentItem('写汉字', 'xiě Hànzì', 'Write Chinese characters — 写 ("write") + 汉字 ("Chinese characters"). For non-Asian learners, this skill is often more impressive to native speakers than speaking; Chinese friends will frequently ask 你会写汉字吗? to gauge your level.', 'word', '我会写一些汉字，可是写得不好看。', '"I can write some Chinese characters, but they don\'t look nice" — 写得不好看 ("don\'t write them nice-looking") is the standard handwriting-grade phrase.', null, [ACT.vocabularySkills]),
    createContentItem('用筷子', 'yòng kuàizi', 'Use chopsticks — 用 ("use") + 筷子 ("chopsticks"). 用筷子 is the everyday phrasing; the skill is taken for granted in Chinese contexts, so a foreigner saying 我会用筷子 often draws genuine appreciation. Negation 不会用 ("don\'t know how to use") is the polite phrasing for asking for a fork.', 'word', '我会用筷子，已经习惯了。', '"I can use chopsticks; I am already used to it" — 已经习惯了 ("already accustomed") adds the natural follow-up.', null, [ACT.vocabularySkills]),
    createContentItem('编程', 'biān chéng', 'Program (computer code) — verb-object compound 编 ("compile / arrange") + 程 (from 程序 "program"). The everyday term for programming in mainland China; alternate noun 编程 also works as a noun ("programming"). 写代码 (xiě dàimǎ, "write code") is the more colloquial verb among developers.', 'word', '我会编程，主要用 Python。', '"I can program, mainly using Python" — pairs the skill with a tool, a common tech-self-introduction pattern at Tsinghua.', null, [ACT.vocabularySkills]),
    createContentItem('滑冰 / 滑雪', 'huá bīng / huá xuě', 'Skate / ski — both use 滑 ("slide"), the universal verb for sliding sports. 滑冰 = ice skating, 滑雪 = skiing. Both are popular winter activities in northern China; Tsinghua has a campus ice rink that opens December–February.', 'word', '冬天我会去滑冰，可是不会滑雪。', '"In winter I go skating, but I can\'t ski" — a typical contrast statement pairing 会 and 不会 with the two 滑 sports.', null, [ACT.vocabularySkills]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: Grading skills
    // ────────────────────────────────────────────────────────────────────
    createContentItem('一点', 'yìdiǎn', '"A little" — placed AFTER the verb-object to grade a learned skill down to modest level. 我会说一点中文 ("I can speak a little Chinese"). Different from Korean 좀 or English "a little" in that 一点 follows the action, not the noun.', 'word', '我会弹一点钢琴。', '"I can play piano a little" — the most common modest self-rating phrasing for any 会 skill.', null, [ACT.vocabularyDegree]),
    createContentItem('一些', 'yìxiē', '"Some / a few" — similar to 一点 but feels slightly more substantial. Use with countable-sounding objects: 我会写一些汉字 ("I can write some Chinese characters"). Both 一点 and 一些 follow the verb-object.', 'word', '我会做一些中国菜。', '"I can make some Chinese dishes" — 一些 because 菜 (dishes) is implicitly countable.', null, [ACT.vocabularyDegree]),
    createContentItem('一点点', 'yìdiǎndiǎn', '"Just a tiny bit" — emphatic version of 一点, signaling very modest skill. Use to deflect a compliment or to be extra-humble: 我只会说一点点 ("I can only speak just a little"). The doubled 点点 adds the cuteness/softness.', 'word', '只会说一点点，请慢点说。', '"I can only speak a tiny bit, please speak slowly" — pairs the modest claim with a polite request.', null, [ACT.vocabularyDegree]),
    createContentItem('很会', 'hěn huì', '"Very good at" — emphatic high-grade rating; 很 ("very") before 会 means the skill is solid. 他很会做饭 ("He\'s really good at cooking"). Often used to praise OTHERS; using it about yourself in Chinese culture borders on bragging.', 'word', '我妈妈很会做饭。', '"My mom is really good at cooking" — third-person praise, the culturally safe use of 很会.', null, [ACT.vocabularyDegree]),
    createContentItem('还不太会', 'hái bú tài huì', '"Still not very good at" — high-frequency modest phrasing combining 还 ("still"), 不太 ("not very"), and 会. Carries the implication that the speaker is learning. The default reply to "你会X吗?" when you DO know a little but want to sound humble.', 'word', '我还不太会用筷子。', '"I am still not very good at using chopsticks" — 还 + 不太 + 会 is the formula for "learning, not there yet".', null, [ACT.vocabularyDegree]),
    createContentItem('完全不会', 'wánquán bú huì', '"Totally can\'t / not at all" — flat zero-skill admission with 完全 ("completely") + 不会. Use when you genuinely have zero skill, as in 我完全不会跳舞 ("I cannot dance at all").', 'word', '我完全不会开车。', '"I totally cannot drive" — clear zero-skill statement; pairs naturally with the follow-up 我坐地铁 ("I take the subway").', null, [ACT.vocabularyDegree]),
    createContentItem('还 — yet', 'hái', '"Still / yet" — adverb placed before 不会 / 不能 to mean "not YET". Softens the negation by implying ongoing progress. 我还不会开车 ("I don\'t know how to drive yet") sounds learner-friendly, while flat 我不会开车 ("I can\'t drive") sounds final.', 'word', '我还不会写汉字，我在学。', '"I cannot write Chinese characters yet; I am learning" — pairs 还不会 with 在学 ("in the process of learning").', null, [ACT.vocabularyDegree]),
    createContentItem('得 — grading complement', 'de — V-degree marker', 'After a verb, 得 (neutral tone) introduces a degree-of-action complement: V 得 + adjective. 唱得好 ("sing well"), 说得不好 ("don\'t speak well"). Different from 的 (possessive 的) and 地 (adverb 地) — three different "de" characters with identical pronunciation but different functions.', 'sentence', '她唱得很好 ("She sings very well") vs 她唱得不好 ("She doesn\'t sing well")', 'The V 得 + adjective frame grades how well an action is performed; one of the most flexible self-rating patterns in Mandarin.', [
      { target: '得 grading particle', note: 'neutral tone; placed AFTER the verb to introduce a degree complement' },
      { target: '的 possessive', note: 'between A and B; "A\'s B"' },
      { target: '地 adverbial', note: 'between adverb and verb; turns adjectives into adverbs' },
    ], [ACT.vocabularyDegree]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar I: 会
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '会 + V',
      'huì + verb',
      'The modal 会 (huì) + verb signals a LEARNED skill — something the subject acquired through study or practice. 我会说中文 ("I know how to speak Chinese"). The defining feature is acquisition; you cannot use 会 for innate abilities like breathing.',
      'sentence',
      '我会说中文。我会弹钢琴。我会做饭。',
      'Three different skill verbs, three identical uses of 会 — the modal does not conjugate for person, number, or tense.',
      [
        { target: '我会说中文', note: '"I know how to speak Chinese" — learned language skill' },
        { target: '我会弹钢琴', note: '"I know how to play piano" — learned instrument skill' },
        { target: '我会做饭', note: '"I know how to cook" — learned daily-life skill' },
      ],
      [ACT.grammarHui],
    ),
    createContentItem(
      '不会 + V',
      'bú huì + verb',
      'The negation 不会 ("don\'t know how") signals lack of learned skill. Pronounced búhuì in speech (不 sandhi rule). Different from 不能 ("can\'t right now") and 不可以 ("not allowed"). 我不会开车 means "I never learned to drive", NOT "I can\'t drive today".',
      'sentence',
      '我不会开车。我不会弹吉他。我不会游泳。',
      'Three flat-negation statements; each implies the skill was never acquired, not that conditions block it.',
      [
        { target: '不会开车', note: '"don\'t know how to drive" — never learned, not licensed' },
        { target: '不会弹吉他', note: '"don\'t know how to play guitar" — never took guitar lessons' },
        { target: '不会游泳', note: '"don\'t know how to swim" — never learned to swim' },
      ],
      [ACT.grammarHui],
    ),
    createContentItem(
      '会 + V + 一点 / 一些',
      'huì + verb + yìdiǎn / yìxiē',
      'Add 一点 ("a little") or 一些 ("some") AFTER the verb-object to grade the skill down to modest level. The position matters: in Mandarin the degree comes AFTER the action, unlike English "a little Chinese" (before noun) or Korean 좀 (before verb).',
      'sentence',
      '我会说一点中文。我会弹一点钢琴。我会做一些中国菜。',
      'High-frequency modest self-rating; the 一点 / 一些 are essentially required for culturally appropriate self-praise.',
      [
        { target: 'V + Obj + 一点', note: 'degree follows the verb-object; e.g., 说中文 → 说一点中文' },
        { target: '会说一点中文', note: 'literal: "know-speak a-little Chinese" — modest self-rating' },
        { target: '会做一些中国菜', note: 'literal: "know-make some Chinese-dishes" — quantified modest claim' },
      ],
      [ACT.grammarHui],
    ),
    createContentItem(
      '会 question',
      'huì question pattern',
      'Form a yes/no question by adding 吗 (ma) at the end: 你会X吗? ("Do you know how to X?"). Or use 会不会 ("can or can\'t") in the middle for the A-not-A question form, which carries slightly more nuance — closer to "Can you, or not?".',
      'sentence',
      '你会说中文吗? — 会一点。\n你会不会开车? — 我不会。',
      'Two equivalent question forms; 吗 is more universal, 会不会 sounds slightly more deliberate or probing.',
      [
        { target: '你会X吗?', note: 'standard yes/no question; works with any modal' },
        { target: '你会不会X?', note: 'A-not-A form; slightly more direct, asks for a definite yes or no' },
        { target: 'Answer: 会 / 不会', note: 'short answers repeat the modal; 一点 added for modest yes' },
      ],
      [ACT.grammarHui],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar II: 能
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '能 + V',
      'néng + verb',
      'The modal 能 (néng) + verb signals current ability — something the subject CAN do under present conditions: physical state, time available, conditions permitting. 我今天能去 ("I can go today"). Different from 会 (learned skill); 能 is about the moment, not the lifetime.',
      'sentence',
      '我今天能游泳。我现在能开车。我们明天能见面。',
      'Three conditional-ability statements; each depends on the current time or conditions, not on whether the skill exists in principle.',
      [
        { target: '今天能游泳', note: '"can swim today" — feel well, pool is open, time is right' },
        { target: '现在能开车', note: '"can drive now" — sober, alert, vehicle available' },
        { target: '明天能见面', note: '"can meet tomorrow" — schedule allows' },
      ],
      [ACT.grammarNeng],
    ),
    createContentItem(
      '不能 + V',
      'bù néng + verb',
      'The negation 不能 ("can\'t right now") signals that conditions BLOCK the action. The skill exists, but the moment doesn\'t allow it. 我今天不能开车 ("I can\'t drive today") implies you know how, but something stops you — illness, alcohol, no car.',
      'sentence',
      '我今天不能开车，我喝酒了。我现在不能去，我有课。',
      'Two conditional negations; 喝酒了 ("drank alcohol") and 有课 ("have class") are the BLOCKERS, not the absence of skill.',
      [
        { target: '不能开车 (today, drank alcohol)', note: 'skill exists, but legal/safety conditions block it' },
        { target: '不能去 (have class)', note: 'skill is irrelevant; schedule blocks it' },
        { target: 'Reason often follows', note: 'Mandarin 不能 + V is typically followed by 因为/因为… ("because") explaining the blocker' },
      ],
      [ACT.grammarNeng],
    ),
    createContentItem(
      '会 vs 能 — the swimming test',
      'huì vs néng — the swimming test',
      'The classic minimal pair for distinguishing 会 vs 能: 我会游泳 ("I know how to swim" — lifetime skill) vs 我今天能游泳 ("I can swim today" — conditions permit). Both are true at the same time, but they mean different things — get this contrast right and the rest follows.',
      'sentence',
      '我会游泳，但是我今天不能游 — 我感冒了。',
      'Literal: "I know how to swim, but I can\'t swim today — I have a cold." The 会 / 不能 contrast shows the skill exists, just blocked.',
      [
        { target: '我会游泳', note: 'learned skill exists, lifetime fact; uses 会' },
        { target: '我今天不能游泳', note: 'today\'s conditions block the action; uses 不能' },
        { target: '我感冒了', note: 'the blocker — completed-action marker 了 signals "have caught a cold (now)"' },
      ],
      [ACT.grammarNeng],
    ),
    createContentItem(
      '能 + amount — capacity',
      'néng + amount — capacity ability',
      'Use 能 + V + amount to state HOW MUCH you can do: 我能游一公里 ("I can swim one kilometer"), 我能喝三瓶啤酒 ("I can drink three bottles of beer"). This capacity meaning is unique to 能 — you cannot say 我会游一公里 because 会 only handles "know how", not "how much".',
      'sentence',
      '我能游一公里。我能跑十公里。我能记五十个汉字。',
      'Three capacity statements about distance, speed, and memory; each is about how MUCH, not whether the skill exists.',
      [
        { target: '能游一公里', note: 'capacity: "can swim 1 km" — measures the ability' },
        { target: '能跑十公里', note: 'capacity: "can run 10 km"' },
        { target: '能记五十个汉字', note: 'capacity: "can memorize 50 characters" — common learner-progress claim' },
      ],
      [ACT.grammarNeng],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar III: 可以
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '可以 + V — permission',
      'kěyǐ + verb — asking permission',
      'The modal 可以 (kěyǐ) + verb asks or grants PERMISSION. 我可以进来吗? ("May I come in?") is the default polite request in any context — knocking on a professor\'s door, entering a meeting, joining a group. The 吗 makes it a question; without it, 你可以坐这里 grants permission to sit.',
      'sentence',
      '我可以进来吗? 我可以坐这里吗? 我可以问一个问题吗?',
      'Three classic permission requests; each ends with 吗 and is the safe polite phrasing for any first encounter.',
      [
        { target: '可以进来吗?', note: '"May I come in?" — used when knocking on a door' },
        { target: '可以坐这里吗?', note: '"May I sit here?" — used in cafes, libraries, classrooms' },
        { target: '可以问一个问题吗?', note: '"May I ask a question?" — used in meetings or after a lecture' },
      ],
      [ACT.grammarKeyi],
    ),
    createContentItem(
      '可以 + V — general possibility',
      'kěyǐ + verb — possibility / openness',
      'Use 可以 + V to state that something IS POSSIBLE or OPEN to be done — not asking a specific person, but signaling that the option is available. 这里可以拍照 ("Photos are allowed here"), 周末可以来 ("[You] can come on weekends"). Often appears on public signs.',
      'sentence',
      '这里可以拍照。周末可以来。这家餐厅可以刷卡。',
      'Three general-possibility statements; each describes what is OPEN, with no specific subject required.',
      [
        { target: '可以拍照', note: '"photo-taking is allowed" — common on museum/park signs' },
        { target: '周末可以来', note: '"can come on weekends" — describes availability' },
        { target: '可以刷卡', note: '"card payment accepted" — common shop sign' },
      ],
      [ACT.grammarKeyi],
    ),
    createContentItem(
      '不可以 + V — soft prohibition',
      'bù kěyǐ + verb — not allowed',
      'The negation 不可以 ("not allowed") softly forbids an action — common on signs and from teachers/parents. 不可以吸烟 ("no smoking"), 上课不可以玩手机 ("phones aren\'t allowed in class"). Different from 不能 ("conditions block") and 不会 ("don\'t know how").',
      'sentence',
      '不可以吸烟。上课不可以玩手机。图书馆不可以吃东西。',
      'Three rule-style prohibitions; each is a soft "not allowed", standard on signs and in classroom rules.',
      [
        { target: '不可以吸烟', note: '"no smoking" — common public sign' },
        { target: '不可以玩手机 (in class)', note: 'teacher-to-student rule; 玩手机 is the casual phrase for "play with your phone"' },
        { target: '不可以 vs 不能', note: '不可以 = social/rule prohibition; 不能 = physical/situational block' },
      ],
      [ACT.grammarKeyi],
    ),
    createContentItem(
      '三个 "不" 的对比',
      'sān gè "bù" de duìbǐ',
      'The three negations 不会 / 不能 / 不可以 are all "cannot" but with three different meanings. Mastering this triple is the test of whether the modal distinction has clicked. 我不会开车 (never learned) vs 我今天不能开车 (drank alcohol) vs 这里不可以开车 (no-driving zone).',
      'sentence',
      '我不会开车 (没学过) · 我今天不能开车 (喝酒了) · 这里不可以开车 (规定不让)',
      'Three sentences about the same action — driving — with three different "cannot" meanings. The Mandarin distinction is sharper than English "can\'t".',
      [
        { target: '不会 — never learned', note: 'skill doesn\'t exist; the speaker simply doesn\'t know how' },
        { target: '不能 — conditions block', note: 'skill exists, but the moment blocks the action' },
        { target: '不可以 — rule forbids', note: 'social/legal rule prohibits the action regardless of skill' },
      ],
      [ACT.grammarKeyi],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '我的技能',
      'wǒ de jìnéng',
      'A complete six-sentence self-evaluation in Mandarin using all three modals naturally. Read it aloud with correct tones, sandhi (kéyǐ inside 可以), and 不 sandhi (búhuì inside 不会). Notice how each modal lines up with its proper meaning.',
      'sentence',
      '你好！我叫莎拉。我会说一点中文，但是还不太好。我会弹钢琴，从小就开始学了。我今天能游泳，因为天气很好。我还不会开车，所以每天坐地铁。在清华，我可以学很多新的东西。',
      'Translation: "Hello! I\'m Sarah. I can speak a little Chinese, but still not very well. I can play piano; I started learning as a child. I can swim today because the weather is good. I still don\'t know how to drive, so I take the subway every day. At Tsinghua, I can learn many new things."',
      [
        { target: '会说一点中文 (modest learned)', note: '会 + V + 一点 — modest claim about a language skill' },
        { target: '会弹钢琴 (lifetime learned)', note: '会 — uses 从小 ("since childhood") to emphasize long-acquired status' },
        { target: '能游泳 (today, conditions)', note: '能 — uses 因为天气很好 ("because the weather is good") to give the blocker-removal reason' },
        { target: '还不会开车 (never learned)', note: '还不会 — softens with 还 to imply learning is possible later' },
        { target: '可以学新的东西 (possibility)', note: '可以 — describes what is OPEN to do at Tsinghua, not a specific permission request' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '理解问题',
      'lǐjiě wèntí',
      'Four standard comprehension questions covering each modal plus a negation. Answer in short sentences using the same modal as the question; do not switch modals — that would change the meaning.',
      'sentence',
      'Q1: 莎拉会说中文吗? Q2: 她今天能游泳吗? Q3: 她可以在清华学新东西吗? Q4: 她会开车吗?',
      'Four questions targeting one example each of 会 (Q1), 能 (Q2), 可以 (Q3), and 不会 (Q4) — full coverage of the lesson\'s modal grid.',
      [
        { target: 'A1: 会一点。', note: 'modest yes; 一点 keeps the claim humble even though she does speak some' },
        { target: 'A2: 能，今天天气很好。', note: 'yes plus the reason — Mandarin 能 answers usually justify the condition' },
        { target: 'A3: 可以，可以学很多新东西。', note: 'yes plus an elaboration; 可以 is repeated to confirm the openness' },
        { target: 'A4: 还不会，她坐地铁。', note: 'no, with the softener 还 ("yet") and the substitute behavior — typical Mandarin "I haven\'t learned, but…" structure' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Listening & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '比较技能',
      'bǐjiào jìnéng',
      'A natural peer-level conversation between two Tsinghua students comparing language, music, and sport skills. Covers all three modals plus the grading adverbs. Notice the modesty patterns — both speakers downgrade their own claims.',
      'conversation',
      'A: 莎拉，你中文说得真好！\nB: 哪里哪里，我还说得不太好。我会说一点，但是还在学。\nA: 你会弹钢琴吗?\nB: 会一点。从小学的，但是现在弹得不好了。你呢?\nA: 我不会弹钢琴，但是我会弹吉他。我在清华吉他社。\nB: 真的吗! 我也想学吉他，可以教我吗?\nA: 当然可以！周末我们在 C 楼练习，你可以来。\nB: 太好了，谢谢！',
      'Translation: A: "Sarah, your Chinese is really good!" B: "Not at all, I still don\'t speak it well. I can speak a little, but I\'m still learning." A: "Can you play piano?" B: "A little. Learned as a kid, but I don\'t play well now. You?" A: "I can\'t play piano, but I can play guitar. I\'m in the Tsinghua Guitar Club." B: "Really! I want to learn guitar too, can you teach me?" A: "Of course! We practice in Building C on weekends, you can come." B: "Great, thanks!"',
      [
        { target: '哪里哪里', note: 'standard polite deflection of a compliment; literal "where where" but functions as "not at all"' },
        { target: '会一点 (modest yes)', note: 'minimal-commitment positive answer; the safe Chinese response to any skill question' },
        { target: '可以教我吗?', note: '"can you teach me?" — permission/possibility question using 可以' },
        { target: '当然可以', note: '"of course!" — emphatic grant of permission; 当然 (dāngrán) = "naturally"' },
        { target: '你可以来 (invitation)', note: '可以 here means "you are welcome to" — invitation, not literal permission' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      '社团招新',
      'shètuán zhāoxīn',
      'A formal club-fair conversation at Tsinghua. A Guzheng Club leader asks a new student about her interests and existing skills using all three modals. The register is polite-but-not-overly-formal — the standard student-leader register.',
      'conversation',
      '社团负责人: 你好！我们是清华古筝社。你会弹乐器吗?\n学生: 我会弹一点钢琴，但是不会弹古筝。\n社团负责人: 没关系！在我们社团你可以从零开始学。你周末有时间吗?\n学生: 周末我能来。一星期能练几次?\n社团负责人: 看你想学多快。每周一次也可以，三次也可以。\n学生: 太好了。我可以试一节课吗?\n社团负责人: 当然！这个周六下午两点，C 楼 301。',
      'Translation: Leader: "Hello, we\'re the Tsinghua Guzheng Club. Can you play an instrument?" Student: "I can play piano a little, but I don\'t play guzheng." Leader: "No problem! In our club, you can start from zero. Do you have time on weekends?" Student: "I can come on weekends. How many times a week can I practice?" Leader: "Depends on how fast you want to learn. Once a week is fine, three times is fine." Student: "Great. Can I try one class?" Leader: "Of course! This Saturday at 2 pm, Building C, Room 301."',
      [
        { target: '会弹一点 vs 不会弹', note: 'a positive AND a negative 会 statement in one breath — natural Chinese self-rating' },
        { target: '可以从零开始学', note: '"can start from zero" — 可以 + V signals the openness/possibility' },
        { target: '周末能来', note: '能 because the answer depends on the student\'s weekend availability — situational' },
        { target: '一星期能练几次?', note: '"how many times a week can [I] practice?" — 能 + amount question (capacity)' },
        { target: '可以试一节课吗?', note: 'final polite permission request; 可以 + V + 吗 is the closing pattern' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '写作模板',
      'xiězuò múbǎn',
      'A reusable 4-sentence template for any Mandarin skill self-evaluation. Each sentence uses a different modal so the writing demonstrates all three contrasts. Fill in the bracketed slots with your own real skills.',
      'sentence',
      '我会 [学过的技能 1]，[一点 / 一些 / 很好]。我也会 [学过的技能 2]。但是我还不会 [没学过的技能]。我希望以后能 [未来想做的事]。在清华，我可以 [可能性 / 机会].',
      'Five sentences cover the core modal grid: 会 (twice), 不会 (once), 能 (once, future), 可以 (once, possibility) — the minimum complete skill paragraph.',
      [
        { target: '[学过的技能 1] — 会 + grade', note: 'a learned skill you can actually do; pair with 一点 / 一些 / 很好' },
        { target: '[学过的技能 2] — 会', note: 'a second learned skill; uses 也 ("also") to chain' },
        { target: '[没学过的技能] — 还不会', note: 'a skill you haven\'t learned; 还 softens to "not yet"' },
        { target: '[未来想做的事] — 能', note: 'something you hope to be able to do later; 希望以后能 = "hope to be able to in the future"' },
        { target: '[可能性 / 机会] — 可以', note: 'something open to do at Tsinghua; 可以 marks the opportunity' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '写作练习',
      'xiězuò liànxí',
      'Write your own 4-5 sentence skill paragraph in Hanzi using the template. Use 会, 不会, 能, and 可以 at least once each, plus one grading adverb (一点 / 一些 / 还不太 / 很). Read it aloud after writing.',
      'sentence',
      '示例: 我会说英语，说得很好。我也会编程，主要用 Python。但是我还不会说法语。我希望以后能去法国学法语。在清华，我可以参加法语社。',
      'Translation: "I speak English very well. I can also program, mainly using Python. But I still don\'t speak French. I hope I can go to France to learn French in the future. At Tsinghua, I can join the French Club."',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '谦虚 — Chinese modesty',
      'qiānxū — Chinese modesty',
      'Chinese culture places strong value on 谦虚 (qiānxū, "modesty") in self-evaluation. Saying 我中文很好 ("My Chinese is very good") sounds arrogant even if it\'s true; the expected reply to "你中文说得真好!" is 哪里哪里 ("not at all") or 还不太好 ("still not very good"). Direct agreement breaks the social rhythm.',
      'sentence',
      '"你中文说得真好!" — "哪里哪里，还说得不太好。"',
      'The deflection is not denial — it acknowledges the compliment while preserving social harmony. Doing it wrong (agreeing flatly) makes Chinese speakers uncomfortable.',
      [
        { target: '哪里哪里 nǎli nǎli', note: '"not at all" — literal "where where", the default compliment deflection; doubled for emphasis' },
        { target: '还不太好 hái bú tài hǎo', note: '"still not very good" — pairs the deflection with a concrete claim of work-in-progress' },
        { target: '过奖了 guòjiǎng le', note: 'slightly more formal: "you praise too much"; common in business and academic contexts' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '才艺 — Chinese variety-show talents',
      'cáiyì — performance talents',
      '才艺 (cáiyì, "talents and arts") refers to performance-worthy skills like singing, dancing, playing a Chinese instrument, calligraphy, or magic. Chinese variety shows (综艺节目) routinely ask contestants 你有什么才艺? ("What talents do you have?") and expect a 1-minute demonstration. The expected answer pattern is 我会 + skill.',
      'sentence',
      '主持人: "你有什么才艺?" — 嘉宾: "我会唱一首歌 / 我会弹古筝。"',
      'The 才艺 culture is one reason 会 is so high-frequency in everyday Chinese — every Chinese student is asked at some point to display a 才艺.',
      [
        { target: '才艺 cáiyì', note: '"talents and arts" — performance-worthy learned skills; high cultural value' },
        { target: '我会唱一首歌', note: '"I can sing a song" — standard 才艺 introduction at a school or club event' },
        { target: '我会弹古筝', note: '"I can play the guzheng" — traditional Chinese instrument; 才艺 high-prestige choice' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '中国乐器',
      'Zhōngguó yuèqì',
      'Traditional Chinese instruments have their own canonical names and verbs. 古筝 (gǔzhēng, 21-string plucked zither) and 二胡 (èrhú, 2-string bowed fiddle) are the two most common at university clubs. 古筝 uses 弹 (pluck); 二胡 uses 拉 (lā, "draw / pull / bow"). Mixing the verbs (拉古筝 or 弹二胡) is a learner error.',
      'sentence',
      '古筝 gǔzhēng — 弹 (pluck) · 二胡 èrhú — 拉 (bow) · 琵琶 pípá — 弹 · 笛子 dízi — 吹 (blow)',
      'The verb is tied to the playing motion: 弹 for plucked/keyed, 拉 for bowed, 吹 for wind — these verb-instrument pairings are fixed.',
      [
        { target: '古筝 — 弹', note: 'plucked-string zither, 21 strings on a long wooden board; one of the most photogenic Chinese instruments' },
        { target: '二胡 — 拉', note: '2-string bowed fiddle; the soul instrument of Chinese folk music' },
        { target: '琵琶 — 弹', note: '4-string plucked lute, held upright across the chest' },
        { target: '笛子 — 吹', note: 'bamboo flute; 吹 ("blow") matches all wind instruments' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '学生社团',
      'xuéshēng shètuán',
      'Chinese university clubs (社团) are a major part of student life. Tsinghua has hundreds — split between 才艺-focused (古筝社, 吉他社, 街舞社, 合唱团), academic (机器人社, 编程社), and sport (篮球社, 网球社, 游泳社). Joining (加入 / 参加) a 社团 is a standard part of student self-introduction at every Chinese university.',
      'sentence',
      '我加入了 [社团名]。Or: 我在 [社团名]。',
      'Two interchangeable membership phrasings; 加入 emphasizes the joining action, 在 emphasizes the current membership.',
      [
        { target: '古筝社 / 二胡社', note: 'traditional Chinese instrument clubs; high prestige in 才艺 culture' },
        { target: '吉他社 / 钢琴社 / 街舞社', note: 'modern music & dance clubs; popular among urban students' },
        { target: '机器人社 / 编程社', note: 'academic-tech clubs; Tsinghua is famous for these' },
        { target: '社团招新 shètuán zhāoxīn', note: '"club fair / new-member recruitment week" — held at the start of each semester' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '任务: 清华社团招新',
      'rènwù: Qīnghuá shètuán zhāoxīn',
      'Roleplay the Tsinghua University club fair with the AI tutor playing a 古筝社 (Guzheng Club) leader. Use all three modals — 会 for your learned skills, 能 for time availability, 可以 for asking permission — in one continuous 6-turn exchange.',
      'conversation',
      '[Tsinghua main quad, club-fair day]\n社团负责人: 你好！我们是古筝社。你会弹乐器吗?\n你: [回答 — 会 + 哪个乐器 + 一点 / 不会]\n社团负责人: 太好了！我们这里你可以学古筝，从零开始。你周末有时间吗?\n你: [回答 — 能 + 哪天 + 几次]\n社团负责人: 学费一学期 300 元，可以接受吗?\n你: [回答 — 可以 / 不可以 + 理由]\n社团负责人: 那这个周六下午两点，C 楼 301，可以来试一节课。\n你: [回答 — 可以 / 谢谢 + 告别]',
      'Six turns of fluent exchange using all three modals; the AI tutor will respond naturally to whatever you say and probe deeper if needed.',
      [
        { target: '你会弹乐器吗? — answer with 会', note: 'use 会 + instrument + 一点 to rate yourself modestly; or flat 不会 + explanation' },
        { target: '周末有时间吗? — answer with 能', note: 'use 能 + day + frequency to state your actual availability; e.g., 我周六能来，一星期能来两次' },
        { target: '可以接受吗? — answer with 可以 / 不可以', note: '可以接受 ("can accept") for tuition; reply with 可以 ("yes I can pay") or 不可以 ("no, too expensive") plus reason' },
        { target: '可以来试一节课 — answer with 可以', note: 'accept the trial-class invitation by repeating 可以 + 谢谢; standard polite closing' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战 — 三个 "不" 的对比',
      'tiǎozhàn — sān gè "bù" de duìbǐ',
      'Stretch goal: in the same club-fair scene, the leader asks 你会开车吗? Use the three different "cannot" forms — 不会, 不能, 不可以 — across the next three turns to show full mastery of the modal contrast. Each negation must match its proper meaning.',
      'conversation',
      '社团负责人: 你会开车吗? 周末我们要去郊外练习。\n你: 不会，我还没学过。\n社团负责人: 没关系，你坐我们的车。今天能跟我去看看吗?\n你: 今天不能，下午我有课。\n社团负责人: 那周末呢? 可以喝点酒吗?\n你: 不可以，我们去练习古筝，喝酒影响学习。',
      'Translation: Leader: "Can you drive? On weekends we go to the suburbs to practice." You: "I can\'t, I never learned." Leader: "No problem, ride with us. Can you come check it out with me today?" You: "Not today, I have class this afternoon." Leader: "How about the weekend? Can we drink some alcohol?" You: "We can\'t — we\'re going to practice guzheng, drinking affects learning."',
      [
        { target: '不会 — never learned', note: '不会 (never learned to drive) + 没学过 ("haven\'t studied [driving]") — the SKILL-DOESN\'T-EXIST negation' },
        { target: '不能 — conditions block', note: '不能 (today blocked) + 有课 ("have class") — the SCHEDULE-BLOCKS negation' },
        { target: '不可以 — rule prohibits', note: '不可以 (alcohol forbidden) + 影响学习 ("affects learning") — the SOCIAL-RULE negation' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
