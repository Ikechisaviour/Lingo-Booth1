// Level 3 Cluster 6 — 正式语体与文言遗存 (Formal Register & Classical Echoes in Modern Chinese)
// Final Level 3 cluster. The Korean source cluster covers Hanja (Sino-Korean
// characters embedded in modern Korean) — a topic that does not transfer to
// a Chinese-target curriculum because Mandarin learners already work with
// Hanzi natively. We REFRAME this capstone cluster as the closest analog:
// the way modern Mandarin still preserves classical Chinese (文言文) elements
// in formal contexts. Learners equipped with this cluster can decode formal
// writing — government documents, academic papers, news editorials, legal
// language, classical-flavored idioms, formal letter conventions, and the
// short classical-flavored sentences that punctuate political speeches and
// scholarly prose.
//
// Cluster structure mirrors the Korean capstone (an "endings" cluster that
// caps advanced study) without inheriting the Hanja content. Structure:
// orientation → pronunciation → classical pronouns → classical verbs/copulas
// → classical conjunctions → classical negation → formal nominalizers →
// classical-structure chengyu → formal letter conventions → grammar
// (classical→modern mappings; 文白夹杂 mixed register; parsing) → culture
// (the 五四 vernacular shift) → task. Build for any Level-3 learner, not
// just one L1.
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
  orientation: 'zh-l3c6-orientation',
  pronunciation: 'zh-l3c6-pronunciation',
  pronouns: 'zh-l3c6-pronouns',
  copulas: 'zh-l3c6-copulas',
  conjunctions: 'zh-l3c6-conjunctions',
  negation: 'zh-l3c6-negation',
  nominalizers: 'zh-l3c6-nominalizers',
  chengyu: 'zh-l3c6-chengyu',
  letters: 'zh-l3c6-letters',
  grammarMapping: 'zh-l3c6-grammar-mapping',
  grammarMixed: 'zh-l3c6-grammar-mixed',
  grammarParsing: 'zh-l3c6-grammar-parsing',
  culture: 'zh-l3c6-culture',
  task: 'zh-l3c6-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Read a formal modern Chinese editorial, government notice, or academic abstract and recognize which words and structures come from classical Chinese (文言文) rather than colloquial vernacular (白话).',
      'Map the most common classical particles, pronouns, conjunctions, and negations to their modern equivalents (吾 → 我, 而 → 但是/而且, 故 → 所以, 非 → 不是) so that formal Chinese stops feeling alien.',
      'Write a short formal-register paragraph that mixes classical elements with modern Mandarin (文白夹杂) at the level expected in academic essays, official letters, and ceremonial speeches.',
    ],
    task: 'Picture defending your thesis at 清华大学 in front of a senior committee — your written abstract needs the formal register, your oral remarks need a few classical-flavored phrases, and the closing letter to your advisor needs the right ceremonial conventions. By the end of this cluster, that whole register feels natural rather than foreign.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in classical-flavored vocabulary',
    goals: [
      'Pronounce the classical pronouns and particles cleanly: 吾 (wú, 2nd), 汝 (rǔ, 3rd), 其 (qí, 2nd), 之 (zhī, 1st), 何 (hé, 2nd) — most are single high-frequency syllables, and a wrong tone makes the whole formal sentence sound off.',
      'Distinguish the two classical "to be" verbs by tone and shape: 乃 (nǎi, 3rd) sounds decisive and final; 为 (wéi when "is/to be", but wèi when "for the sake of") — the same Hanzi has two register-bearing tones.',
      'Read 谓 (wèi, 4th), 弗 (fú, 2nd), 莫 (mò, 4th) without anglicizing — these survive mainly in idioms and ceremonial speech, so accuracy here is the marker between a learner who can quote 成语 fluently and one who cannot.',
    ],
    task: 'Read each classical syllable aloud (吾 wú · 汝 rǔ · 其 qí · 之 zhī · 何 hé · 乃 nǎi · 谓 wèi · 非 fēi · 弗 fú · 莫 mò). Mark which ones already feel natural and which need extra drilling.',
  },
  {
    id: ACT.pronouns,
    section: 'Vocabulary I',
    title: 'Classical pronouns — 吾 汝 其 之 何',
    goals: [
      'Recognize the five classical pronouns that survive in formal writing and chengyu: 吾 (I/my), 汝 (you), 其 (his/her/its/their), 之 (him/her/it as object), 何 (what/which/how).',
      'Map each one to its modern equivalent and know the genre signal: 吾 in a personal essay or philosophical treatise (吾辈 "we / our generation"), 汝 in an admonishing or solemn address, 其 woven into nearly every formal document, 之 in fixed phrases and post-verbal positions, 何 in rhetorical questions (何必 "why bother", 如何 "how", 何以 "by what means").',
    ],
    task: 'For each of 5 modern colloquial sentences, rewrite the pronoun in its classical-flavored register and identify what kind of document that register fits (essay, speech, letter, idiom).',
  },
  {
    id: ACT.copulas,
    section: 'Vocabulary II',
    title: 'Classical verbs and copulas — 乃 为 谓',
    goals: [
      'Use 乃 as the classical "is / namely / thereupon" linker (乃 = 就是 / 于是) — typical of biographical and historical writing, and of ceremonial declarations such as 乃父 ("his father"), 乃至 ("even to the point of").',
      'Use 为 in its classical readings — as the copula "is / serves as" (wéi) in formal expository writing, and as the preposition "for the sake of" (wèi) in everyday speech — the same character carries two registers via tone.',
      'Recognize 谓 ("is called / refers to / says") in academic definitions and idioms: 所谓 ("so-called"), 谓之 ("call it"), 可谓 ("can be said to be").',
    ],
    task: 'Rewrite three modern Chinese definitions ("X 是 Y") as formal-register definitions using 乃 / 为 / 谓 respectively. Notice the shift in feel from colloquial to scholarly.',
  },
  {
    id: ACT.conjunctions,
    section: 'Vocabulary III',
    title: 'Classical conjunctions — 而 则 故 然 若',
    goals: [
      'Use 而 (ér, "and / but / yet") as the all-purpose classical connector: it can join verbs (学而时习之 "study and at times practice"), oppose clauses (富而不骄 "rich yet not arrogant"), or chain manner adverbs to verbs (默而识之 "silently and remember it").',
      'Use 则 (zé, "then / in that case"), 故 (gù, "therefore / hence"), 然 (rán, "however / thus") in the right slots — these are the formal counterparts of 那 / 就 / 所以 / 但是 / 这样 and they dominate editorials and legal writing.',
      'Use 若 (ruò, "if / as if") in conditional clauses to replace colloquial 如果 — common in legal documents (若有不实 "if any falsehood is found") and chengyu (旁若无人 "as if no one were beside").',
    ],
    task: 'Connect 5 modern clause pairs using a classical conjunction (而 / 则 / 故 / 然 / 若) and explain the register shift in each case.',
  },
  {
    id: ACT.negation,
    section: 'Vocabulary IV',
    title: 'Classical negation — 非 无 勿 莫 弗',
    goals: [
      'Distinguish the five classical negators by what they negate and how strong they sound: 非 ("is not / not so" — negates nouns and noun-like predicates), 无 ("without / there is no" — negates existence; modern equivalent 没有), 勿 ("don\'t / shall not" — formal imperative prohibition), 莫 ("no one / don\'t / no" — universal negation in classical, exhortative don\'t in formal), 弗 ("not" — emphatic, rare today but alive in chengyu).',
      'Recognize the high-frequency formal compounds: 非常 ("extraordinary / very" — literally "not ordinary"), 无论 ("regardless"), 勿忘 ("do not forget"), 莫名其妙 ("inexplicable"), 自愧弗如 ("ashamed to be not as good").',
    ],
    task: 'For each of 5 prompt sentences (a definitional negation, an existential negation, a prohibition, a universal negation, a chengyu fill-in), choose the right classical negator and explain the contrast with the colloquial equivalent.',
  },
  {
    id: ACT.nominalizers,
    section: 'Vocabulary V',
    title: 'Formal nominalizers — 所…者 / 之 / 以',
    goals: [
      'Use 所 + verb as the formal nominalizer — extends the Level-3 Cluster-5 baseline (所说的 "what was said") into a classical-flavored form 所…者 ("the one who / the thing which"): 所谓者 "what is called", 所知者 "what is known", common in academic and legal texts.',
      'Use 之 as the post-verbal object pronoun and as the attributive linker in classical-flavored phrases (爱之 "love him/it", 国家之未来 "the future of the nation") — both are formal substitutes for 他/它 and 的.',
      'Use 以 ("by means of / in order to / using") to link an instrument or purpose to a verb — 以…为… ("take X as Y") is the classical pattern that powers idioms like 以人为本 ("put people first") and 以德报怨 ("repay enmity with virtue").',
    ],
    task: 'Convert 3 modern colloquial sentences into a formal-register version using one nominalizer (所 / 之 / 以) each. State which document genre the new sentence would fit (academic paper, government decree, op-ed).',
  },
  {
    id: ACT.chengyu,
    section: 'Vocabulary VI',
    title: 'Chengyu with classical structure',
    goals: [
      'Recite and explain 6 high-frequency chengyu whose internal grammar is pure classical Chinese: 学而时习之, 知之为知之, 不亦乐乎, 由此可见, 不言而喻, 以德报怨.',
      'Parse each one as classical (subject — verb — object or topic — comment) so the four-character compression makes sense, instead of memorizing it as a black box.',
    ],
    task: 'For each chengyu, identify the classical pronoun / particle / negator it contains and write one modern Chinese sentence that quotes it correctly in a real context.',
  },
  {
    id: ACT.letters,
    section: 'Vocabulary VII',
    title: 'Formal letter conventions — 敬启者 / 此致敬礼 / 顺颂时祺',
    goals: [
      'Open a formal letter or email with the right addressee phrase: 敬启者 ("Dear Sir/Madam — to be opened with respect"), 尊敬的 X 先生/女士 ("Respected Mr./Ms. X") — register markers that signal a formal-letter context the moment the reader sees them.',
      'Close a formal letter with the right valediction: 此致敬礼 ("with respectful salute"), 顺颂时祺 ("with seasonal best wishes"), 敬上 / 谨上 ("respectfully submitted") — each closure is paired to a specific genre (business, academic, personal-formal).',
      'Recognize that mainland business email today still uses these classical-flavored conventions in formal contexts, and that omitting them in a 求职信 (cover letter) or 推荐信 (recommendation letter) is read as careless.',
    ],
    task: 'Draft the opening and closing lines (no body) of three formal communications: (1) a recommendation letter from a 清华大学 professor, (2) a job application to a state-owned company, (3) a thank-you letter to a senior scholar. Use a different classical-flavored closing for each.',
  },
  {
    id: ACT.grammarMapping,
    section: 'Grammar I',
    title: 'Classical → modern mappings',
    goals: [
      'Build a one-to-one table mapping the high-frequency classical words to their modern Mandarin equivalents (吾 → 我, 汝 → 你, 其 → 他的, 之 → 他/的, 而 → 但是/而且, 故 → 所以, 然 → 但是/这样, 若 → 如果, 非 → 不是, 无 → 没有, 勿 → 不要, 乃 → 就是/于是).',
      'Translate a classical-flavored sentence into modern Mandarin by substituting each classical element with its modern counterpart, then verify the result reads as plain spoken Chinese.',
    ],
    task: 'Translate one chengyu and one editorial sentence into plain modern Mandarin using the mapping table. Note which classical elements have no perfect modern substitute and have to be paraphrased.',
  },
  {
    id: ACT.grammarMixed,
    section: 'Grammar II',
    title: '文白夹杂 — the real register of formal modern Chinese',
    goals: [
      'Understand that modern formal Chinese is not pure classical (文言) and not pure colloquial (白话) — it is a mixed register (文白夹杂, "mixed literary and vernacular") in which a sentence might carry a classical particle (而, 之, 故) inside an otherwise modern syntactic frame.',
      'Read 3 sample sentences from a modern academic abstract and identify which words are colloquial-modern, which are classical-derived, and how the mixture sets the formal-but-readable tone.',
    ],
    task: 'Underline every classical-derived word in a 6-sentence editorial paragraph and rate the density (low / medium / high). Compare with a casual blog post on the same topic to feel the contrast.',
  },
  {
    id: ACT.grammarParsing,
    section: 'Grammar III',
    title: 'Parsing a short classical-flavored sentence',
    goals: [
      'Apply a 4-step parsing routine to any short classical-flavored sentence: (1) bracket the noun phrases, (2) identify the verb (no inflection clues — look for action words), (3) match each particle (之 / 而 / 则 / 也) to its function, (4) restate in plain modern Mandarin to check.',
      'Recognize the most common structural patterns: A 之 B = "B of A"; A 而 B = "A and/but B"; A 则 B = "if A then B"; X 也 = "(it) is X" (sentence-final 也 is the classical declarative copula).',
    ],
    task: 'Parse the sentence "学而时习之，不亦说乎？" step by step using the 4-step routine, then translate it into plain modern Mandarin and into your native language.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: 'Why classical echoes still live in modern Chinese',
    goals: [
      'Know the historical pivot: the 五四运动 (May 4th Movement, 1919) pushed mainstream writing from 文言 (classical) to 白话 (vernacular), with 鲁迅, 胡适, and 陈独秀 arguing that classical writing locked literacy away from ordinary people.',
      'Understand why classical echoes survived the vernacular shift: 成语 are still everywhere; official government documents and party communiqués deliberately use classical-flavored phrasing for gravitas; calligraphy art and classical poetry remain part of mainstream Chinese culture; state institutions are named in classical-flavored compounds (中华人民共和国, 国务院, 人民大会堂).',
      'Place yourself on the gradient from pure 文言 (Confucian classics, Tang poetry) to modern 白话 (a WeChat message), with the formal-modern register (a 清华大学 academic paper, a People\'s Daily editorial) sitting in the middle.',
    ],
    task: 'Choose one classical-flavored phrase you have seen recently (signage, news headline, slogan) and explain to a classmate what genre it signals and why a modern speechwriter chose the classical form over the colloquial.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: '正式语体写作 — formal register writing assignment',
    goals: [
      'Read a short formal modern news editorial (provided) and identify every classical-derived expression in it: pronouns, conjunctions, negations, nominalizers, chengyu, formal letter conventions if any.',
      'Write a brief formal-register paragraph (3–5 sentences) on a topic of your choice that uses at least 5 distinct classical elements correctly. The AI tutor will read the paragraph back and point out which elements work and which feel forced.',
    ],
    task: 'Complete both parts in one continuous session: first read and annotate the provided editorial; then write your formal-register paragraph and discuss it with the AI tutor.',
  },
];

const lesson = {
  title: 'Level 3 · Cluster 6: 正式语体与文言遗存 — Formal Register and Classical Echoes in Modern Chinese',
  category: 'daily-life',
  difficulty: 'advanced',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'mapping-classical-to-modern', label: 'Mapping classical to modern', goal: 'Substitute classical particles and pronouns with their modern Mandarin counterparts so a formal sentence becomes plain spoken Chinese.' },
    { id: 'using-formal-letter-conventions', label: 'Using formal letter conventions', goal: 'Open and close a formal letter or email with the classical-flavored conventions (敬启者 / 此致敬礼 / 顺颂时祺) appropriate to the genre.' },
    { id: 'quoting-chengyu-in-context', label: 'Quoting chengyu in context', goal: 'Slot a classical-structure chengyu (学而时习之, 不言而喻, 由此可见) into a real modern sentence without sounding forced.' },
    { id: 'parsing-a-classical-sentence', label: 'Parsing a classical sentence', goal: 'Apply the 4-step parsing routine (bracket nouns → find verb → match particles → restate in modern Mandarin) to any short classical-flavored sentence.' },
  ],
  relatedPools: ['topic-society', 'topic-academia'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '本课目标',
      'běn kè mùbiāo',
      'By the end of this final Level 3 cluster, you should read a formal modern Chinese editorial, abstract, or government notice and recognize which words and structures come from classical Chinese rather than the colloquial vernacular — and write a short paragraph in that mixed register yourself.',
      'word',
      'Targets: 文言遗存 wényán yícún (classical survivals) · 正式语体 zhèngshì yǔtǐ (formal register) · 文白夹杂 wén-bái jiāzá (mixed literary-vernacular) · 成语 chéngyǔ (set idioms) · 公文 gōngwén (official documents)',
      'These five labels are the spine of this cluster — once you can spot a classical element in a modern document, the formal register stops feeling like a foreign language inside a familiar one.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      '真实场景',
      'zhēnshí chǎngjǐng',
      'You are defending your thesis at 清华大学 in front of a senior committee. Your written abstract uses formal academic register; your oral defense quotes a chengyu or two; the closing thank-you letter to your advisor uses classical-flavored conventions. Every part of this scene needs the cluster you are about to study.',
      'word',
      'Genres in scope: 学术论文 xuéshù lùnwén (academic paper) · 新闻社论 xīnwén shèlùn (news editorial) · 政府公告 zhèngfǔ gōnggào (government notice) · 推荐信 tuījiànxìn (recommendation letter) · 演讲 yǎnjiǎng (formal speech)',
      'Each genre uses classical echoes for a slightly different reason — gravitas in editorials, precision in legal documents, ceremony in letters, authority in speeches — and learners need to feel that gradient.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      '为什么文言还活着',
      'wèishéme wényán hái huózhe',
      'Even though the May 4th Movement (1919) pushed mainstream writing toward 白话 (vernacular), classical Chinese never disappeared — it survives in chengyu, official documents, calligraphy, classical poetry, and the names of state institutions. A Level 3 learner who avoids the formal register can read texts but cannot write or speak in formal Chinese society.',
      'word',
      'Survivals: 成语 (~5,000 idioms with classical grammar) · 公文 (party communiqués drafted in classical-flavored prose) · 牌匾 páibiǎn (signage and calligraphy art) · 古诗 gǔshī (Tang and Song poetry) · 国名 / 机构名 (中华人民共和国, 国务院)',
      'The vernacular shift was a literacy revolution, not the erasure of classical Chinese — and the formal register today is the negotiated truce between the two.',
      [
        { target: '成语', note: 'four-character set idioms — most retain pure classical grammar inside the four-character window' },
        { target: '公文', note: 'official documents — deliberately draft in classical-flavored prose to signal gravitas and continuity with state tradition' },
        { target: '国名 / 机构名', note: 'state institution names — almost all are coined in classical compounds (人民大会堂, 中央人民政府)' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '吾',
      'wú (2nd tone)',
      'Classical first-person pronoun "I / my". Modern equivalent is 我 (wǒ); 吾 survives in formal writing, chengyu (吾辈 "we / our generation", 吾爱 "my love" in poetry), and the philosophical register typical of essays and speeches.',
      'word',
      '吾爱 wú ài ("my love" — poetic) · 吾辈 wúbèi ("we / our generation" — essayistic)',
      'A reliable register marker: the moment you read 吾 in modern prose, the writer is reaching for a classical or solemn tone.',
      [
        { target: 'wú (2nd tone, rising)', note: 'rising pitch, like a second-tone "wu" — not to be confused with 五 wǔ (third tone, "five")' },
        { target: 'modern equivalent 我', note: '我 is colloquial and neutral; 吾 raises the register by several notches' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '汝',
      'rǔ (3rd tone)',
      'Classical second-person pronoun "you". Modern equivalent is 你. 汝 survives in solemn or admonishing address (汝当自勉 "you ought to encourage yourself"), in pre-1949 letters, and in classical literature; reaching for 汝 today signals deliberate ceremony.',
      'word',
      '汝等 rǔ děng ("you all" — addressing a group with classical gravity)',
      'Less frequent than 吾 in modern formal prose, but instantly recognizable; mishearing it as a colloquial pronoun marks a learner.',
      [
        { target: 'rǔ (3rd tone, dip-and-rise)', note: 'careful — same syllable structure as 乳 rǔ ("milk") but the meaning is purely pronominal' },
        { target: 'modern equivalent 你', note: '你 is everyday; 汝 is ceremonial and almost archaic in feel' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '其',
      'qí (2nd tone)',
      'Classical pronoun and determiner: "his / her / its / their". Modern equivalents are 他的 / 她的 / 它的 / 他们的. 其 is the single most frequent classical pronoun still woven into formal prose — appears in essentially every academic paper and government document at least once.',
      'word',
      '其中 qízhōng ("among them") · 其他 qítā ("the others") · 因其… yīn qí… ("because of its…")',
      'High-frequency word — feels formal in isolation but is so embedded in modern compounds that you already meet it in Level 1.',
      [
        { target: 'qí (2nd tone, rising)', note: 'rising pitch; common in compounds where the tone is preserved' },
        { target: 'modern equivalent 他/她/它的', note: '其 covers all genders and number without inflection, like its modern equivalents' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '之',
      'zhī (1st tone)',
      'Classical particle with two main jobs: (1) attributive linker "of / \'s" — modern equivalent 的; (2) post-verbal object pronoun "him / her / it" — modern equivalent 他 / 她 / 它. 之 is by far the most frequent classical particle in formal modern prose.',
      'word',
      '国家之未来 guójiā zhī wèilái ("the future of the nation") · 知之 zhī zhī ("know it") · 之间 zhī jiān ("between")',
      'When in doubt, "X 之 Y" means "Y of X"; the order is the opposite of English "X of Y".',
      [
        { target: 'zhī (1st tone, high level)', note: 'high level pitch; same syllable as 知 zhī ("know") and 织 zhī ("weave"), distinguished by character only' },
        { target: 'attributive job', note: 'A 之 B = "B of A" — modern equivalent A 的 B' },
        { target: 'object-pronoun job', note: '动词 + 之 = verb + "it/him/her" — modern equivalent verb + 他/她/它' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '何',
      'hé (2nd tone)',
      'Classical question word "what / which / how / why". Modern equivalents are 什么 / 哪 / 怎么 / 为什么. 何 survives mainly in rhetorical questions and idiomatic compounds: 何必 ("why bother"), 如何 ("how"), 何以 ("by what means"), 何况 ("let alone").',
      'word',
      '何必 hébì ("why bother") · 如何 rúhé ("how") · 何以 héyǐ ("by what means")',
      'Almost always shows up in rhetorical questions in modern prose — a writer who chooses 何必 over 为什么 is signaling formal stance.',
      [
        { target: 'hé (2nd tone, rising)', note: 'rising pitch; same syllable as 河 hé ("river"), distinguished by character only' },
        { target: 'modern equivalent 什么/怎么', note: '何 covers several modern question words depending on slot in the sentence' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '乃 / 谓 / 弗 / 莫',
      'nǎi (3rd) / wèi (4th) / fú (2nd) / mò (4th)',
      'Four classical verbs and negators that need careful pronunciation because they survive mainly in chengyu and formal speech, where a wrong tone makes the listener miss the classical signal entirely. 乃 = "is / namely"; 谓 = "is called"; 弗 = "not" (emphatic); 莫 = "no one / don\'t".',
      'word',
      '乃 nǎi (classical "is/namely") · 谓 wèi (classical "call / refer to") · 弗 fú (emphatic "not") · 莫 mò ("no one / don\'t")',
      'These four are the test of whether you have mastered the classical phonology layer; sloppy tones here flatten the formal sentence into mush.',
      [
        { target: '乃 nǎi (3rd tone)', note: 'dip-and-rise; never neutralize the tone — the dramatic dip is what makes 乃 sound decisive' },
        { target: '谓 wèi (4th tone)', note: 'sharp falling; distinct from 为 wéi ("for the sake of"); appears in 所谓, 谓之, 可谓' },
        { target: '弗 fú (2nd tone)', note: 'rising; rare in modern conversation but alive in chengyu like 自愧弗如' },
        { target: '莫 mò (4th tone)', note: 'sharp falling; appears in 莫名其妙, 莫不, 勿…莫…' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Classical pronouns
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '吾',
      'wú',
      'Classical first-person pronoun "I / my". Today survives in formal essays, ceremonial speech, and chengyu. Reaching for 吾 instead of 我 marks the writer as deliberately invoking a literary or solemn tone — common in op-eds, eulogies, manifestos, and academic prose.',
      'word',
      '吾辈当自强 wúbèi dāng zìqiáng ("our generation ought to grow strong")',
      'High register only — using 吾 in casual chat sounds pretentious; using 吾 in a manifesto sounds rousing.',
      [
        { target: '吾 = 我', note: '"I / my" — same referent, raised register' },
        { target: '吾辈 = 我们这一代', note: '"we / our generation" — fixed compound, common in essays' },
        { target: '吾爱 = 我的爱人', note: '"my love" — poetic compound; appears in lyrics, poetry, and old letters' },
      ],
      [ACT.pronouns],
    ),
    createContentItem(
      '汝',
      'rǔ',
      'Classical second-person pronoun "you". Today reserved for solemn or admonishing address: in elder-to-younger speech inside ceremonies, in classical-literature quotations, and in pre-modern letters. Modern equivalent is 你; 汝 outranks 你 in gravity, comparable to "thou shalt" in English.',
      'word',
      '汝当自勉 rǔ dāng zì miǎn ("you ought to encourage yourself") — a parent or elder addressing a younger relative on a formal occasion',
      'Rarely used today outside of ceremony or quotation — but every educated Mandarin speaker recognizes it.',
      [
        { target: '汝 = 你', note: '"you" — same referent, raised register; signals solemnity' },
        { target: '汝等 = 你们', note: '"you all / you-plural" with classical gravity; rare today' },
      ],
      [ACT.pronouns],
    ),
    createContentItem(
      '其',
      'qí',
      'Classical pronoun and determiner: "his / her / its / their / its (relating to)". The most frequent classical pronoun still alive in modern prose — appears in essentially every academic paper and government document. Used both attributively (其特点 "its characteristics") and pronominally (因其… "because of its…").',
      'word',
      '其特点 qí tèdiǎn ("its characteristics") · 其原因 qí yuányīn ("its cause / the reason for it") · 各得其所 gè dé qí suǒ ("each gets what they need")',
      'Already familiar from Level 1 compounds like 其中 ("among them") and 其他 ("the others") — the classical flavor is invisible in those compounds and very visible in formal sentence usage.',
      [
        { target: '其 = 他的 / 她的 / 它的 / 他们的', note: 'covers all genders and numbers; no inflection — same as its modern equivalents' },
        { target: '其中 qízhōng', note: 'fixed compound meaning "among them / inside it"; everyday word in spite of classical roots' },
        { target: '其他 qítā', note: '"the others / the rest"; everyday word' },
        { target: '因其 yīn qí', note: '"because of its…" — formal-register only' },
      ],
      [ACT.pronouns],
    ),
    createContentItem(
      '之',
      'zhī',
      'Classical particle that wears two hats. Attributively, it links a possessor to a possessed noun: A 之 B = "B of A" (modern 的). Pronominally, it follows a verb and means "him / her / it" (modern 他/她/它). 之 is the single most frequent classical particle still in heavy use today.',
      'word',
      '国家之未来 guójiā zhī wèilái ("the future of the nation") · 学而时习之 xué ér shí xí zhī ("learn and at times practice it")',
      'A reliable register signal: a writer who reaches for 之 in an attributive slot where 的 would do is choosing gravitas; in a post-verbal slot where 他/它 would do, also gravitas.',
      [
        { target: 'A 之 B = B of A (attributive)', note: 'modern equivalent A 的 B; formal-register substitute' },
        { target: 'V 之 = V + him/her/it (pronoun)', note: 'modern equivalent V + 他/她/它; literary and chengyu register' },
        { target: '之间 zhī jiān', note: '"between / among" — fixed locative compound; everyday use' },
        { target: '之一 zhī yī', note: '"one of (the)…" — fixed quantifier compound; everyday use' },
      ],
      [ACT.pronouns],
    ),
    createContentItem(
      '彼 / 此',
      'bǐ / cǐ',
      'Two classical demonstratives that still appear in modern formal prose. 彼 ("that / the other / the former") and 此 ("this / the present"). Modern equivalents are 那 and 这. Survives in fixed compounds: 彼此 ("each other"), 此外 ("besides / moreover"), 由此 ("from this"), 因此 ("because of this"), 至此 ("up to this point").',
      'word',
      '彼此尊重 bǐcǐ zūnzhòng ("mutual respect") · 由此可见 yóucǐ kějiàn ("from this we can see") · 此乃事实 cǐ nǎi shìshí ("this is the truth")',
      'A very common pair in formal writing — 因此 and 此外 are everyday formal-register words built on these classical demonstratives.',
      [
        { target: '彼 = 那 / 那个 / 对方', note: '"that / the other party" — classical demonstrative; rare standalone, common in compounds' },
        { target: '此 = 这 / 这个', note: '"this" — classical demonstrative; alive in 因此, 此外, 由此, 至此' },
        { target: '彼此', note: 'compound "each other / mutual"; everyday formal' },
        { target: '因此 yīncǐ', note: 'compound "because of this / therefore"; high-frequency in modern formal prose' },
      ],
      [ACT.pronouns],
    ),
    createContentItem(
      '何',
      'hé',
      'Classical interrogative "what / which / how / why". Modern equivalents are 什么 / 哪 / 怎么 / 为什么. 何 survives most often in rhetorical questions and fixed compounds (何必 "why bother", 如何 "how", 何以 "by what means", 何况 "let alone"). A 何 question in modern prose is almost always rhetorical.',
      'word',
      '何必如此？hé bì rúcǐ? ("why bother (going to such trouble)?") · 后果如何？hòuguǒ rúhé? ("how does the consequence stand?")',
      'Use 何 to ask the reader to reflect, not to request information — that is the modern rhetorical convention.',
      [
        { target: '何必 hébì', note: '"why bother / why must…" — common rhetorical opener' },
        { target: '如何 rúhé', note: '"how" — formal substitute for 怎么样 / 怎么' },
        { target: '何以 héyǐ', note: '"by what means / why" — fixed formal compound' },
        { target: '何况 hékuàng', note: '"let alone / not to mention" — fixed connective compound' },
      ],
      [ACT.pronouns],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: Classical verbs and copulas
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '乃',
      'nǎi',
      'Classical copula and connective: "is / namely / thereupon". Modern equivalents are 就是 (in identification) and 于是 (in narrative succession). Today survives mainly in biographical writing, ceremonial declarations, and fixed compounds (乃父 "his father", 乃至 "even to the point of").',
      'word',
      '此乃事实 cǐ nǎi shìshí ("this is the truth") · 乃至于今 nǎizhì yú jīn ("even up until today")',
      'A dramatic emphatic — use 乃 when you want the sentence to thunder rather than walk.',
      [
        { target: '乃 = 就是 (identification)', note: '"is namely" — emphatic copula in formal declarative' },
        { target: '乃 = 于是 (narrative)', note: '"thereupon / and so" — narrative connective in biographical writing' },
        { target: '乃父 / 乃母', note: 'classical "his father / his mother" — used in literary biography' },
        { target: '乃至 nǎizhì', note: 'fixed compound "even to / extending to"; appears in modern prose without sounding archaic' },
      ],
      [ACT.copulas],
    ),
    createContentItem(
      '为',
      'wéi / wèi',
      'Two-reading classical verb. As wéi (2nd tone) it is the classical copula "is / serves as / becomes" (modern 是 / 当作); as wèi (4th tone) it is the preposition "for / for the sake of" (modern 为了). The same Hanzi carries two registers and two functions via tone alone.',
      'word',
      'wéi: 以人为本 yǐ rén wéi běn ("take people as the foundation") · 化险为夷 huà xiǎn wéi yí ("turn danger into safety")\nwèi: 为人民服务 wèi rénmín fúwù ("serve the people")',
      'Tone disambiguation matters: 以…为… (wéi) is the chengyu pattern "take X as Y"; 为…而… (wèi) is the purposive frame "for the sake of X, do Y".',
      [
        { target: '为 wéi = 是 / 当作', note: 'classical copula; appears in 以…为… ("take as") and academic definitions' },
        { target: '为 wèi = 为了 / 替', note: 'preposition; everyday use; appears in 为人民服务, 为你 ("for you")' },
        { target: '以…为…', note: 'fixed pattern "take X as Y" — the spine of countless chengyu and slogans' },
      ],
      [ACT.copulas],
    ),
    createContentItem(
      '谓',
      'wèi',
      'Classical verb "to call / to say / to be called / to refer to". Modern equivalents are 叫 / 说 / 称 / 指. Survives mainly in fixed compounds (所谓 "so-called", 谓之 "call it", 可谓 "can be said to be") and in academic definitions.',
      'word',
      '所谓人工智能… suǒwèi réngōng zhìnéng… ("so-called artificial intelligence…" — typical academic opener) · 可谓壮举 kě wèi zhuàngjǔ ("can be called a feat")',
      'Pair 谓 with 所 (所谓) or 可 (可谓) and you have two of the most common formal-register openers in Chinese academic prose.',
      [
        { target: '所谓 suǒwèi', note: '"so-called" — formal academic opener; signals the term is about to be defined or critiqued' },
        { target: '谓之 wèi zhī', note: '"call it / refer to it as" — classical-flavored definition formula' },
        { target: '可谓 kě wèi', note: '"can be said to be / one can call this" — appears in op-eds and reviews' },
      ],
      [ACT.copulas],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Vocabulary III: Classical conjunctions
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '而',
      'ér',
      'The single most versatile classical connector: can mean "and", "but", "yet", or "and (then)" depending on the context. Modern equivalents are 而且 / 但是 / 然而 / 并 — but 而 alone covers all of them in classical and formal prose. Connects verbs, clauses, and manner adverbs to verbs.',
      'word',
      '学而时习之 xué ér shí xí zhī ("study and at times practice it") · 富而不骄 fù ér bù jiāo ("rich yet not arrogant") · 不言而喻 bù yán ér yù ("understood without being said")',
      'When parsing classical prose, treat 而 as "the connector" and let context tell you whether it leans toward "and" or "but".',
      [
        { target: '而 = 而且 (additive)', note: '"and / and also" — chains verbs or clauses additively' },
        { target: '而 = 但是 / 却 (adversative)', note: '"but / yet" — opposes the clauses on either side' },
        { target: '而 = 并 (manner)', note: 'links a manner adverb to a verb: 默而识之 ("silently and remember it")' },
        { target: '而后 / 而已 / 而是', note: 'fixed compounds; all everyday in modern formal Chinese' },
      ],
      [ACT.conjunctions],
    ),
    createContentItem(
      '则',
      'zé',
      'Classical "then / in that case / on the other hand". Modern equivalents are 就 / 那 / 而 / 却. Appears in conditional consequents (若…则… "if X then Y"), in contrastive pairs (A 则… B 则… "A on the one hand…, B on the other…"), and in clause-final position to draw a conclusion.',
      'word',
      '若不努力，则难以成功 ruò bù nǔlì, zé nányǐ chénggōng ("if one does not work hard, then success is hard") · 一则…二则… yī zé… èr zé… ("first… second…")',
      'A high-frequency formal connector — switching from 就 to 则 in writing instantly raises the register.',
      [
        { target: '若…则… ruò…zé…', note: 'classical conditional frame "if X then Y" — equivalent to modern 如果…就…' },
        { target: 'A 则…，B 则…', note: 'classical contrastive frame "as for A, …; as for B, …"' },
        { target: '一则…二则…', note: 'enumeration frame "first, … second, …" — formal essayistic' },
      ],
      [ACT.conjunctions],
    ),
    createContentItem(
      '故',
      'gù',
      'Classical "therefore / hence / for this reason". Modern equivalent is 所以. Used in formal arguments to draw a conclusion from a stated premise. Appears in fixed compounds (故而 "therefore", 故此 "for this reason", 是故 "and so") and is the backbone of academic argument prose.',
      'word',
      '故曰：欲速则不达 gù yuē: yù sù zé bù dá ("therefore it is said: haste makes waste") · 故而 / 故此',
      'A sentence with 故 sounds like an argument; a sentence with 所以 sounds like a chat — and that contrast is exactly the register choice the writer is making.',
      [
        { target: '故 = 所以', note: '"therefore" — formal substitute for 所以; raises the register of any sentence it enters' },
        { target: '故而 gù\'ér', note: 'fixed compound "therefore" — common in academic and editorial prose' },
        { target: '是故 shìgù', note: '"and so / for this reason" — slightly more archaic; appears in philosophical quotations' },
        { target: '无缘无故 wúyuán wúgù', note: 'chengyu "without rhyme or reason" — uses 故 in its noun sense "reason"' },
      ],
      [ACT.conjunctions],
    ),
    createContentItem(
      '然',
      'rán',
      'Classical adverb/conjunction with two readings: (1) "however / but" (modern 但是 / 然而 — note 然而 is itself a compound built on 然), (2) "thus / so / in this way" (modern 这样 / 如此). Survives both as a standalone connector and inside high-frequency compounds.',
      'word',
      '虽…然… suī…rán… ("although X, however Y") · 然而 rán\'ér ("however") · 不然 bùrán ("otherwise") · 自然 zìrán ("naturally")',
      'The "however" reading 然 = 但是 is sharp and formal; the "thus" reading 然 = 如此 shows up almost only in fixed compounds today.',
      [
        { target: '然 = 但是 / 然而', note: 'adversative "however / but" — formal writing only' },
        { target: '然 = 如此 / 这样', note: '"thus / in this way" — survives in compounds like 不然, 自然, 然后, 显然' },
        { target: '然而 rán\'ér', note: 'compound "however / yet" — everyday formal writing' },
        { target: '不然 bùrán', note: '"otherwise / if not" — colloquial-acceptable but classically derived' },
      ],
      [ACT.conjunctions],
    ),
    createContentItem(
      '若',
      'ruò',
      'Classical conditional "if / supposing / as if". Modern equivalent is 如果 (and 假如, 倘若). Survives in legal documents (若有不实 "if any falsehood is found"), in classical-flavored compounds (旁若无人 "as if no one were beside"), and in formal hypothetical statements.',
      'word',
      '若有不实，依法处理 ruò yǒu bùshí, yī fǎ chǔlǐ ("if any falsehood is found, it will be handled according to law") · 旁若无人 páng ruò wú rén ("as if no one were beside")',
      'Reach for 若 when you want a hypothetical to feel weighty; use 如果 when you want it to feel ordinary.',
      [
        { target: '若 = 如果', note: '"if" — formal substitute; survives heavily in legal and ceremonial documents' },
        { target: '若…则…', note: 'classical paired conditional "if X then Y" — pair with 则 for full classical flavor' },
        { target: '若 = 好像 / 如', note: '"as if / like" — appears in 旁若无人 and similar chengyu' },
        { target: '倘若 tǎngruò', note: 'compound "if / supposing"; formal but not as archaic as bare 若' },
      ],
      [ACT.conjunctions],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Vocabulary IV: Classical negation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '非',
      'fēi',
      'Classical "is not / not so" — negates nouns and noun-like predicates. Modern equivalents are 不是 (negating the copula 是) and 不 (negating an adjective phrase). 非 is the spine of negation in formal modern Chinese, alive in everyday compounds like 非常 ("extraordinary / very" — literally "not ordinary") and 非法 ("illegal" — literally "not lawful").',
      'word',
      '此非小事 cǐ fēi xiǎoshì ("this is not a small matter") · 非常 fēicháng ("very / extraordinary") · 非法 fēifǎ ("illegal") · 非凡 fēifán ("extraordinary")',
      'Once you spot the 非 + noun pattern, you have spotted formal register; 非常 and 非凡 wear their classical roots invisibly.',
      [
        { target: '非 = 不是 (predicate negation)', note: 'negates "is X" → "is not X"; formal-register only when standalone' },
        { target: '非常 fēicháng', note: 'compound "very / extraordinary" — everyday usage in spite of classical roots' },
        { target: '非法 fēifǎ', note: 'compound "illegal" — formal/legal register; literal "not lawful"' },
        { target: '是非 shìfēi', note: '"right and wrong" — noun compound built on the 是 vs 非 contrast' },
      ],
      [ACT.negation],
    ),
    createContentItem(
      '无',
      'wú',
      'Classical "without / there is no / lacking" — negates existence or possession. Modern equivalents are 没有 ("there is no") and 不…的 ("without …-ing"). Heavily alive in modern formal prose and chengyu: 无论 ("regardless"), 无关 ("unrelated"), 无奈 ("helpless"), 无穷 ("inexhaustible").',
      'word',
      '无论如何 wúlùn rúhé ("regardless of how") · 无关紧要 wúguān jǐnyào ("unimportant") · 无中生有 wú zhōng shēng yǒu ("create something out of nothing")',
      'Reach for 无 when you want existential negation with formal weight; use 没有 for everyday speech.',
      [
        { target: '无 = 没有', note: '"there is no / without" — formal-register substitute; raises gravity' },
        { target: '无论 wúlùn', note: 'compound "regardless / no matter" — universal in modern formal prose' },
        { target: '无关 wúguān', note: 'compound "unrelated / having nothing to do with"; everyday formal' },
        { target: '无奈 wúnài', note: 'compound "having no choice / helplessly" — common in journalism and op-eds' },
      ],
      [ACT.negation],
    ),
    createContentItem(
      '勿',
      'wù',
      'Classical "do not / shall not" — a formal imperative prohibition. Modern equivalents are 不要 / 别. Most often seen on public signage and in ceremonial speech: 勿忘 ("do not forget"), 勿打扰 ("do not disturb"), 请勿吸烟 ("please do not smoke"). The 请勿 + verb pattern is the standard formal-prohibition frame on signage.',
      'word',
      '请勿吸烟 qǐng wù xī yān ("please do not smoke") · 勿忘历史 wù wàng lìshǐ ("do not forget history") · 己所不欲，勿施于人 jǐ suǒ bù yù, wù shī yú rén ("do not do unto others what you do not want done to yourself")',
      'High-frequency on signage and in slogans — instantly recognized as formal/imperative; using 不要 instead would make a sign feel casual.',
      [
        { target: '勿 = 不要 / 别', note: '"do not" — formal-imperative substitute; signage and ceremonial speech' },
        { target: '请勿 qǐng wù', note: 'fixed polite-formal prohibition frame; everywhere on public signage' },
        { target: '勿忘 wù wàng', note: 'fixed "do not forget" — ceremonial and memorial register' },
      ],
      [ACT.negation],
    ),
    createContentItem(
      '莫',
      'mò',
      'Classical "no one / nothing / don\'t". Today survives in two roles: (1) universal negation in chengyu (莫不 "everyone (none does not)", 莫名其妙 "inexplicable — literally \'no one can name its strangeness\'"), and (2) exhortative "don\'t" in formal speech (莫忘 "don\'t forget"). Modern equivalents are 没有人 / 不要 depending on context.',
      'word',
      '莫名其妙 mò míng qí miào ("inexplicable") · 莫忘初心 mò wàng chū xīn ("don\'t forget your original aspiration") · 一筹莫展 yī chóu mò zhǎn ("at one\'s wit\'s end")',
      'Almost exclusively in chengyu and ceremonial slogans; using 莫 in a casual sentence sounds like quoting an ancient text.',
      [
        { target: '莫 = 没有人 / 没有什么', note: '"no one / nothing" — universal negation in chengyu' },
        { target: '莫 = 不要 / 别', note: '"don\'t" — formal exhortative; appears in ceremonial speech and slogans' },
        { target: '莫名其妙', note: 'chengyu "inexplicable" — literally "no one can name its strangeness"; everyday usage' },
      ],
      [ACT.negation],
    ),
    createContentItem(
      '弗',
      'fú',
      'Classical "not" — emphatic, rare in modern conversation. Modern equivalent is 不. Survives almost only in chengyu and historical quotations: 自愧弗如 ("ashamed to be not as good"), 欲罢不能 (sometimes 欲罢弗能), 弗能 ("cannot"). An educated speaker recognizes 弗 but never produces it in everyday speech.',
      'word',
      '自愧弗如 zì kuì fú rú ("ashamed to be not as good") · 弗能 fú néng ("cannot" — classical)',
      'A passive-recognition item for most learners — you read it, you don\'t write it.',
      [
        { target: '弗 = 不', note: '"not" — emphatic classical substitute; modern conversation uses 不' },
        { target: '自愧弗如', note: 'chengyu "ashamed to be not as good as (someone)" — common in modesty formulas' },
      ],
      [ACT.negation],
    ),
    createContentItem(
      '未',
      'wèi',
      'Classical "not yet / have not yet". Modern equivalents are 还没 and 没. Heavily alive in modern formal prose and compounds: 未来 ("future" — literally "not yet come"), 未必 ("not necessarily"), 未曾 ("never before"), 前所未有 ("never before existed"). The 未 + verb pattern marks negation with a temporal "not yet" flavor.',
      'word',
      '未来 wèilái ("future") · 未必 wèibì ("not necessarily") · 前所未有 qián suǒ wèi yǒu ("unprecedented")',
      'A high-frequency classical negator that hides inside everyday compounds — 未来 is one of the most common modern Chinese nouns and its grammar is pure classical.',
      [
        { target: '未 = 还没 / 没', note: '"not yet" — formal substitute with temporal flavor' },
        { target: '未来 wèilái', note: 'compound "future" — literal "not yet come"; everyday usage' },
        { target: '未必 wèibì', note: 'compound "not necessarily" — common in op-eds and academic prose' },
        { target: '前所未有', note: 'chengyu "unprecedented" — combines 所 nominalizer with 未 negation' },
      ],
      [ACT.negation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Vocabulary V: Formal nominalizers
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '所',
      'suǒ',
      'Classical nominalizer that turns a verb phrase into a noun phrase. Pattern: 所 + verb = "what is V-ed / the thing that is V-ed". Examples: 所说的 ("what was said"), 所知 ("what is known"), 所谓 ("what is called / so-called"). Extends into the formal frame 所…者 ("the one / thing that…"): 所知者 ("what is known").',
      'word',
      '我所知道的 wǒ suǒ zhīdào de ("what I know") · 所谓人工智能 suǒwèi réngōng zhìnéng ("so-called AI") · 力所能及 lì suǒ néng jí ("within one\'s ability")',
      'Almost every academic abstract uses 所 at least once; learning to slot it correctly is a Level 3 milestone.',
      [
        { target: '所 + V (+ 的)', note: '"the thing that is V-ed / what is V-ed" — formal nominalizer' },
        { target: '所…者 (literary)', note: '"the one who / the thing which" — same function with classical flair; common in academic prose' },
        { target: '所谓 suǒwèi', note: 'fixed compound "so-called" — academic opener for critiqued terms' },
        { target: '力所能及', note: 'chengyu "within one\'s power" — 所 nominalizes the verb 能及' },
      ],
      [ACT.nominalizers],
    ),
    createContentItem(
      '之 (attributive linker)',
      'zhī',
      'Classical attributive linker, parallel to 所 nominalizer. Pattern: A 之 B = "B of A". Modern equivalent is A 的 B but 之 raises the register sharply. Heavily alive in formal phrasing: 国家之未来 ("the nation\'s future"), 人之常情 ("ordinary human feeling"), 言外之意 ("what is said beyond words / implication").',
      'word',
      '国家之未来 guójiā zhī wèilái ("the nation\'s future") · 言外之意 yán wài zhī yì ("the implied meaning") · 人之常情 rén zhī chángqíng ("ordinary human feeling")',
      'Whenever you want a noun phrase to sound like a section heading, swap 的 for 之 and it becomes one.',
      [
        { target: 'A 之 B = A 的 B', note: 'attributive linker; raises register from colloquial to formal/literary' },
        { target: '之间 / 之一 / 之中', note: 'fixed locative or quantifier compounds — everyday in spite of classical roots' },
        { target: '言外之意', note: 'chengyu "implication / what is said beyond words"' },
      ],
      [ACT.nominalizers],
    ),
    createContentItem(
      '以',
      'yǐ',
      'Classical "by means of / using / in order to / take (X) as…". Modern equivalents are 用 (instrumental) and 为了 (purposive). The most important pattern is 以…为… ("take X as Y" — modern 把…当作…), the backbone of slogans and chengyu: 以人为本 ("put people first"), 以德报怨 ("repay enmity with virtue").',
      'word',
      '以人为本 yǐ rén wéi běn ("put people first") · 以德报怨 yǐ dé bào yuàn ("repay enmity with virtue") · 以…为荣 yǐ…wéi róng ("take pride in…")',
      'The 以…为… frame is the spine of countless modern slogans — once you can parse it, you can read every government banner.',
      [
        { target: '以 = 用 (instrumental)', note: '"by means of / using" — formal instrumental marker' },
        { target: '以 = 为了 (purposive)', note: '"in order to" — formal purposive marker' },
        { target: '以…为… (frame)', note: '"take X as Y" — fixed pattern; powers slogans and chengyu' },
        { target: '以人为本', note: 'slogan "put people first" — common in policy and party communiqués' },
      ],
      [ACT.nominalizers],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Vocabulary VI: Chengyu with classical structure
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '学而时习之',
      'xué ér shí xí zhī',
      'Chengyu from the opening of the Analects: "study and at times practice it". The grammar is pure classical — 学 (verb "study") + 而 (connector "and") + 时 (adverb "at times") + 习 (verb "practice") + 之 (object pronoun "it"). The "it" refers to what has been studied.',
      'sentence',
      'Original: 子曰：学而时习之，不亦说乎? Confucius said: "To study and at times practice it — is it not joyful?"',
      'A foundational chengyu — every Mandarin speaker knows this line; using it in a speech instantly anchors you to the Confucian tradition.',
      [
        { target: '学 xué', note: '"to study" — verb, the action being recommended' },
        { target: '而 ér', note: '"and" — classical connector linking the two verbs' },
        { target: '时 shí', note: '"at times / from time to time" — classical adverb (not modern "time")' },
        { target: '习 xí', note: '"to practice / to review" — verb' },
        { target: '之 zhī', note: '"it" — object pronoun referring to what was studied' },
      ],
      [ACT.chengyu],
    ),
    createContentItem(
      '知之为知之',
      'zhī zhī wéi zhī zhī',
      'Chengyu from the Analects: "to know it is to know it". Full quotation: 知之为知之，不知为不知，是知也 ("To know it is to know it; not to know it is not to know it — this is wisdom"). The structure 知 + 之 (verb + object pronoun) + 为 (classical copula "is") + 知 + 之 is fully classical.',
      'sentence',
      'Original: 子曰：知之为知之，不知为不知，是知也。Confucius said: "To know it is to know it; not to know it is not to know it — this is true knowledge."',
      'Quote this when calling for intellectual honesty — used in academic settings, debate, and op-eds.',
      [
        { target: '知 zhī', note: '"to know" — verb (note: classical 知 is mostly verbal; modern 知道 is the compound)' },
        { target: '之 zhī', note: '"it" — object pronoun' },
        { target: '为 wéi', note: '"is" — classical copula (note tone: wéi, not wèi)' },
        { target: '也 yě', note: 'classical sentence-final declarative particle — emphasizes "this is so"; no modern equivalent' },
      ],
      [ACT.chengyu],
    ),
    createContentItem(
      '不亦乐乎',
      'bù yì lè hū',
      'Chengyu from the Analects: "is it not joyful?". The structure 不 (negation) + 亦 (classical "also") + 乐 (verb/adjective "joyful") + 乎 (classical question particle) is pure classical. Used today to exclaim that some activity is intensely engaging (with a slight ironic or self-deprecating tone in modern usage).',
      'sentence',
      'Original: 有朋自远方来，不亦乐乎? ("When friends come from afar — is it not joyful?")\nModern usage: 他天天打游戏，不亦乐乎 ("He plays games every day — having a grand old time").',
      'In modern speech often slightly ironic — "having a great time (at the expense of more important things)".',
      [
        { target: '不 bù', note: '"not" — negation' },
        { target: '亦 yì', note: '"also" — classical particle; modern equivalent 也' },
        { target: '乐 lè', note: '"joyful / happy" — verb/adjective' },
        { target: '乎 hū', note: 'classical sentence-final question particle — modern equivalent 吗' },
      ],
      [ACT.chengyu],
    ),
    createContentItem(
      '由此可见',
      'yóu cǐ kě jiàn',
      'Chengyu / fixed connector: "from this it can be seen / from this we can see". The structure is 由 (preposition "from") + 此 (classical "this") + 可 (modal "can") + 见 (verb "see"). The most common formal-register conclusion marker in academic writing — equivalent to "thus we conclude" or "it is therefore clear that".',
      'sentence',
      '由此可见，人工智能的发展将彻底改变教育 ("From this we can see that the development of AI will fundamentally change education").',
      'A reliable opener for the concluding paragraph of an academic abstract or op-ed.',
      [
        { target: '由 yóu', note: '"from / by" — preposition' },
        { target: '此 cǐ', note: '"this" — classical demonstrative; modern equivalent 这' },
        { target: '可见 kě jiàn', note: '"can be seen" — modal + verb; the conclusion frame' },
      ],
      [ACT.chengyu],
    ),
    createContentItem(
      '不言而喻',
      'bù yán ér yù',
      'Chengyu: "understood without being said / self-evident". Structure: 不 (not) + 言 (verb "speak") + 而 (connector "but") + 喻 (verb "understand"). Used in modern op-eds and academic writing to mark a premise as obvious — "needless to say". A close English parallel is "it goes without saying".',
      'sentence',
      '教育的重要性不言而喻 ("The importance of education is self-evident").',
      'Common in editorial openings — sets up a premise the writer expects the reader to accept without argument.',
      [
        { target: '不言 bù yán', note: '"without speaking" — negation + verb' },
        { target: '而 ér', note: '"yet / but" — classical adversative connector' },
        { target: '喻 yù', note: '"understand / be made clear" — verb' },
      ],
      [ACT.chengyu],
    ),
    createContentItem(
      '温故而知新',
      'wēn gù ér zhī xīn',
      'Chengyu from the Analects: "review the old and know the new" — a classic statement of how learning works. Structure: 温 ("review") + 故 ("the old / past learning") + 而 ("and") + 知 ("know") + 新 ("the new"). Note that 故 here is a noun "the old / past", a different reading from the conjunction 故 ("therefore").',
      'sentence',
      'Original: 子曰：温故而知新，可以为师矣。Confucius said: "Review the old and know the new — one can then be a teacher."',
      'Frequently invoked in education contexts; signals the speaker is talking about learning method or pedagogy.',
      [
        { target: '温 wēn', note: '"to warm / to review" — verb' },
        { target: '故 gù', note: '"the old / what was learned before" — noun (different from 故 "therefore")' },
        { target: '而 ér', note: '"and" — classical connector' },
        { target: '知 zhī', note: '"to know" — verb' },
        { target: '新 xīn', note: '"the new" — noun' },
      ],
      [ACT.chengyu],
    ),
    createContentItem(
      '以德报怨',
      'yǐ dé bào yuàn',
      'Chengyu: "repay enmity with virtue". Structure: 以 (preposition "with / by means of") + 德 (noun "virtue") + 报 (verb "repay") + 怨 (noun "enmity"). Uses the classical 以 instrumental frame. Sometimes invoked positively (as moral ideal) and sometimes critically (as too lenient toward wrongdoing) — both readings are alive in modern discourse.',
      'sentence',
      '以德报怨虽是美德，但也需有原则 ("Repaying enmity with virtue is a virtue, yet it also requires principle").',
      'Notice the structural mirror: 以 + 德 + 报 + 怨 = "with virtue, repay enmity"; the inverted English word order is exactly the classical instrumental frame.',
      [
        { target: '以 yǐ', note: '"with / by means of" — classical instrumental preposition' },
        { target: '德 dé', note: '"virtue / moral excellence" — noun' },
        { target: '报 bào', note: '"to repay / to requite" — verb' },
        { target: '怨 yuàn', note: '"enmity / grudge" — noun' },
      ],
      [ACT.chengyu],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Vocabulary VII: Formal letter conventions
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '敬启者',
      'jìng qǐ zhě',
      'Standard opening of a formal letter or formal email — "Dear Sir/Madam — to be opened with respect". Literal sense: "the one (者) who opens (启) this respectfully (敬)". Survives unchanged from classical letter conventions; appears at the top of cover letters, official inquiries, and ceremonial communications.',
      'word',
      '敬启者：兹有一事相商… ("Dear Sir/Madam: There is a matter I would like to discuss with you…")',
      'Pair with a formal closing (此致敬礼) to bracket the whole letter in classical register.',
      [
        { target: '敬 jìng', note: '"respectfully" — classical adverb signaling respect' },
        { target: '启 qǐ', note: '"to open" — verb, here meaning "open this letter"' },
        { target: '者 zhě', note: 'classical nominalizer "the one who…"; turns the verb phrase into "the one who opens this respectfully"' },
      ],
      [ACT.letters],
    ),
    createContentItem(
      '尊敬的',
      'zūnjìng de',
      'Standard formal-letter addressee opener: 尊敬的 + name/title — "Respected (Mr./Ms./Professor) X". The modern compound 尊敬 is built on classical roots (尊 "honor" + 敬 "respect") but functions as everyday formal address. Now the most common opener for cover letters and business correspondence.',
      'word',
      '尊敬的李教授： zūnjìng de Lǐ jiàoshòu: ("Respected Professor Li:") — typical opener of a recommendation request',
      'Slightly less archaic than 敬启者 but still firmly formal — the safe choice for most modern business and academic letters.',
      [
        { target: '尊敬 zūnjìng', note: '"to respect / respectful" — compound built on classical 尊 + 敬' },
        { target: '尊敬的 + 称呼', note: '"Respected (title) (family name)" — standard formal-letter opener' },
        { target: 'pair with 您', note: 'after this opener, switch the pronoun from 你 to 您 throughout the letter' },
      ],
      [ACT.letters],
    ),
    createContentItem(
      '此致敬礼',
      'cǐ zhì jìng lǐ',
      'Standard closing of a formal letter — "with respectful salute / yours respectfully". Literal sense: "to this point (此致) I salute respectfully (敬礼)". The two-clause structure is conventionally split across two lines, with 此致 ending one line and 敬礼 starting the next — that visual layout is part of the convention.',
      'word',
      '此致\n敬礼\n[ signature ]',
      'The default formal closing for letters; safe for nearly any formal letter — business, academic, ceremonial.',
      [
        { target: '此致 cǐ zhì', note: '"to this point" — classical phrase ending the body of the letter' },
        { target: '敬礼 jìng lǐ', note: '"with respectful salute" — the actual valediction' },
        { target: 'two-line layout', note: 'visual convention: 此致 ends a line, 敬礼 starts the next, signature follows' },
      ],
      [ACT.letters],
    ),
    createContentItem(
      '顺颂时祺',
      'shùn sòng shí qí',
      'Highly formal letter closing — "wishing you well in this season". Literal sense: "and so (顺) wishing (颂) seasonal (时) auspice (祺)". More elegant and ceremonial than 此致敬礼; used in scholarly, ceremonial, and ceremonial-business letters. Common variant: 顺颂时绥 (same meaning, slightly different last character).',
      'word',
      '… 顺颂\n时祺\n[ signature ]',
      'Reach for 顺颂时祺 when the recipient is senior or the occasion is ceremonial; 此致敬礼 is the safer default for routine formal letters.',
      [
        { target: '顺 shùn', note: '"and so / accordingly" — connective adverb' },
        { target: '颂 sòng', note: '"to wish / to send (good wishes)" — classical verb' },
        { target: '时 shí', note: '"seasonal / of the season" — classical adjective' },
        { target: '祺 qí', note: '"auspice / good fortune" — classical noun; rarely used outside this closure' },
      ],
      [ACT.letters],
    ),
    createContentItem(
      '敬上 / 谨上',
      'jìng shàng / jǐn shàng',
      'Signature-line formula meaning "respectfully submitted / yours respectfully". Appears after the writer\'s name at the bottom: [name] 敬上 or [name] 谨上. 敬上 is slightly warmer/personal; 谨上 is slightly more ceremonial. Common alternative: 致上 ("submitted to you"), 拜上 ("respectfully presented" — for elders or superiors).',
      'word',
      '李伟 敬上 / 王芳 谨上 / [name] 拜上',
      'The signature formula completes the formal-letter bracket — opener (敬启者), closing (此致敬礼), signature (敬上). All three together = unmistakable classical register.',
      [
        { target: '敬上 jìng shàng', note: '"respectfully submitted" — warm formal signature' },
        { target: '谨上 jǐn shàng', note: '"submitted with care" — slightly more ceremonial' },
        { target: '拜上 bài shàng', note: '"presented with a bow" — used to elders or seniors' },
      ],
      [ACT.letters],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Grammar I: Classical → modern mappings
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '一对一映射',
      'yī duì yī yìngshè',
      'A high-frequency mapping table. Each classical word on the left has a modern Mandarin equivalent on the right; substituting one for the other lowers the register from formal to colloquial. Knowing the table both directions (recognize classical → recall modern; recognize modern → reach for classical) is the Level 3 milestone of this cluster.',
      'sentence',
      '吾→我 · 汝→你 · 其→他的 · 之→他/的 · 何→什么/怎么 · 而→但是/而且 · 则→那么/就 · 故→所以 · 然→但是/这样 · 若→如果 · 非→不是 · 无→没有 · 勿→不要 · 乃→就是/于是 · 谓→叫/称为',
      'A 15-row mapping table — memorize these and you can decode most formal-register substitutions.',
      [
        { target: '吾 → 我', note: 'first-person; classical → colloquial' },
        { target: '汝 → 你', note: 'second-person; classical → colloquial' },
        { target: '其 → 他的 / 她的 / 它的', note: 'third-person possessive; classical → colloquial' },
        { target: '之 → 他 (object) / 的 (attributive)', note: 'two jobs; choose modern equivalent by syntactic slot' },
        { target: '何 → 什么 / 怎么 / 为什么', note: 'interrogative; choose modern equivalent by question type' },
        { target: '而 → 但是 / 而且 / 并', note: 'connector; choose modern equivalent by additive vs adversative reading' },
        { target: '故 → 所以', note: 'causal connector; classical → colloquial' },
        { target: '若 → 如果', note: 'conditional; classical → colloquial' },
        { target: '非 → 不是', note: 'predicate negation; classical → colloquial' },
        { target: '无 → 没有', note: 'existential negation; classical → colloquial' },
        { target: '勿 → 不要 / 别', note: 'imperative prohibition; classical → colloquial' },
        { target: '乃 → 就是 / 于是', note: 'copula / narrative connector; classical → colloquial' },
      ],
      [ACT.grammarMapping],
    ),
    createContentItem(
      '常见替换组合',
      'chángjiàn tìhuàn zǔhé',
      'Three highest-leverage substitution combos to remember. Combo 1: 但是 → 然而 / 而 (adversative). Combo 2: 所以 → 故 / 因此 / 是故 (causal). Combo 3: 的 → 之 (attributive between noun phrases). Apply any combo to a modern sentence and you have raised the register one notch.',
      'sentence',
      'COMBO 1: 他很努力，但是没有成功 → 他虽勤奋，然而未能成功。\nCOMBO 2: 因为下雨，所以取消 → 因雨故取消 (extreme classical) / 因雨而取消 (moderate).\nCOMBO 3: 中国的未来 → 中国之未来。',
      'These three combos cover the bulk of register-raising substitutions in modern formal writing — useful as a starting toolkit.',
      [
        { target: 'COMBO 1: 但是 → 然而 / 而', note: 'adversative; the easiest register-raise' },
        { target: 'COMBO 2: 所以 → 故 / 因此', note: 'causal; instantly formal' },
        { target: 'COMBO 3: 的 → 之', note: 'attributive between two noun phrases; appears in nearly every formal headline' },
      ],
      [ACT.grammarMapping],
    ),
    createContentItem(
      '反向映射',
      'fǎnxiàng yìngshè',
      'Reverse mapping: take a modern sentence and substitute one or two colloquial words with their classical equivalents to raise the register. This is the writer\'s direction (modern → classical-flavored). One classical substitution per sentence is usually enough; over-substitution sounds parodic.',
      'sentence',
      'MODERN: 教育对国家发展非常重要。\nRAISED: 教育之于国家发展，至关重要。\nMEANING: "Education, with respect to national development, is of paramount importance."',
      'Compare the two — same meaning, but the raised version sounds like an editorial headline; the original sounds like a textbook sentence.',
      [
        { target: '对 → 之于', note: '"with respect to" — colloquial preposition → classical-flavored preposition' },
        { target: '非常重要 → 至关重要', note: '"very important" → chengyu "of paramount importance"' },
      ],
      [ACT.grammarMapping],
    ),
    createContentItem(
      '映射示范',
      'yìngshè shìfàn',
      'Worked example: take a classical-flavored sentence, substitute each classical element with its modern equivalent, and verify the result reads as plain modern Mandarin. The reverse direction (modern → classical-flavored) is harder and is the writing exercise in the Task activity.',
      'sentence',
      'CLASSICAL: 若不努力，则难以成功。\nMAPPED: 如果不努力，那就很难成功。\nMEANING: "If you don\'t work hard, then success is hard to come by."',
      'Notice the modern version reads naturally but loses the rhetorical weight of the classical; the classical version sounds like a slogan or proverb.',
      [
        { target: '若 → 如果', note: 'conditional' },
        { target: '则 → 那就 / 就', note: 'consequent marker' },
        { target: '难以成功 (already modern)', note: '"hard to succeed" — no substitution needed' },
      ],
      [ACT.grammarMapping],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Grammar II: 文白夹杂
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '文白夹杂',
      'wén-bái jiāzá',
      'The real register of formal modern Chinese is neither pure 文言 (classical) nor pure 白话 (vernacular) — it is 文白夹杂 ("mixed literary-vernacular"), in which a sentence might carry a classical particle (而, 之, 故) inside an otherwise modern syntactic frame. Academic writing, op-eds, government documents, and ceremonial speech all live in this mixed register.',
      'sentence',
      'Sample: 由此可见，教育之于国家发展至关重要。\nGloss: "From this we can see that education, with respect to national development, is of paramount importance."',
      'Spot the classical elements: 由此可见 (formal connector), 之于 (classical "with respect to"), 至关重要 (chengyu); the rest is modern vocabulary in modern syntax — that mixture is the register.',
      [
        { target: '由此可见', note: 'classical-derived conclusion connector' },
        { target: '之于', note: 'classical preposition "with respect to / regarding"' },
        { target: '至关重要', note: 'chengyu "of paramount importance"; modern usage but classical compression' },
        { target: '教育 / 国家发展', note: 'modern compounds; the bulk of the sentence is vernacular vocabulary' },
      ],
      [ACT.grammarMixed],
    ),
    createContentItem(
      '密度差异',
      'mìdù chāyì',
      'Density of classical elements is a register dial. Low density (1 classical word per paragraph) = neutral formal; medium density (2–3 per paragraph) = op-ed and academic; high density (5+ per paragraph) = ceremonial or party-document register. Choose the density to match your genre.',
      'sentence',
      'LOW (neutral formal, casual blog): 现在AI发展很快，我们都要适应。\nMEDIUM (op-ed): 当下人工智能发展迅猛，吾辈不可不察。\nHIGH (party document): 人工智能之发展势不可挡，而吾国唯有自强不息，方能立于不败之地。',
      'Same idea, three densities — choose the dial to match the audience.',
      [
        { target: 'LOW', note: 'casual / blog register; mostly vernacular' },
        { target: 'MEDIUM', note: 'op-ed / academic register; some classical particles (吾辈, 当下, 不可不察)' },
        { target: 'HIGH', note: 'ceremonial / party document register; dense classical particles (吾国, 唯有, 方能, 之, 而, 立于不败之地)' },
      ],
      [ACT.grammarMixed],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Grammar III: Parsing a classical sentence
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '4步解析法',
      'sì bù jiěxī fǎ',
      'A 4-step parsing routine for any short classical-flavored sentence: (1) bracket the noun phrases; (2) identify the verb (no inflection clues — look for action words); (3) match each particle (之 / 而 / 则 / 也) to its function (linker / connector / consequent / declarative); (4) restate in plain modern Mandarin to verify. Run the routine in order; do not skip steps.',
      'sentence',
      'Sample: 学而时习之，不亦说乎？\nStep 1 (noun phrases): none — the implicit subject is "one / a learner".\nStep 2 (verbs): 学 ("study"), 习 ("practice").\nStep 3 (particles): 而 = connector "and"; 之 = object pronoun "it"; 不亦…乎 = classical rhetorical question frame "is it not…?"\nStep 4 (modern restatement): 学习并且经常温习它，不也是一件令人愉快的事吗？',
      'Once the four steps become reflex, any short classical-flavored sentence opens up — including in chengyu, idioms, and quoted classical passages.',
      [
        { target: 'Step 1 — bracket nouns', note: 'find what is being talked about; in classical, subjects are often elided' },
        { target: 'Step 2 — find verb(s)', note: 'no inflection in Chinese, so look for action words; multiple verbs are common' },
        { target: 'Step 3 — match particles', note: '之 / 而 / 则 / 也 / 乎 — each has a specific job; identify which slot the particle fills' },
        { target: 'Step 4 — restate in modern', note: 'translate the parse into plain modern Mandarin to verify the reading' },
      ],
      [ACT.grammarParsing],
    ),
    createContentItem(
      '解析示范 — 故曰',
      'jiěxī shìfàn — gù yuē',
      'Worked parse on a second example: 故曰：欲速则不达。Step 1 (nouns): none — implicit subject "one (who acts hastily)". Step 2 (verbs): 曰 ("says"), 欲 ("wants"), 速 ("be fast"), 达 ("reach the goal"). Step 3 (particles): 故 = "therefore"; 则 = "then"; 不 = negation. Step 4 (modern): 所以说：想快反而到不了 ("therefore it is said: wanting to be fast actually prevents arriving").',
      'sentence',
      'Sample: 故曰：欲速则不达。\nMODERN RESTATEMENT: 所以说：想快反而达不到目的。\nMEANING: "Therefore it is said: haste makes waste (literally: wanting to be fast then not reaching)."',
      'Notice how the four-character classical compresses what modern Chinese needs eight or nine characters to say — that compression is exactly what makes chengyu memorable.',
      [
        { target: '故 → 所以', note: 'classical "therefore" → modern' },
        { target: '曰 → 说', note: 'classical "say" → modern 说; 曰 is a classical-only verb' },
        { target: '则 → 反而 / 就', note: 'classical "then" → modern; here adversative "instead"' },
        { target: '欲速 / 不达', note: '"want-fast / not-reach" — classical verb phrases with no inflection' },
      ],
      [ACT.grammarParsing],
    ),
    createContentItem(
      'A 之 B = B of A',
      'A zhī B = B of A',
      'The single most useful classical structural pattern: A 之 B = "B of A". The order is the opposite of English "X of Y" — in Chinese, the possessor comes first and the possessed second, linked by 之. This pattern powers almost every formal-register compound noun phrase.',
      'sentence',
      '国家 之 未来 → "the nation\'s future" (literally "nation\'s future")\n孔子 之 言 → "Confucius\'s words"\n言外 之 意 → "the meaning beyond the words / the implication"',
      'When you see 之 between two noun-like elements, read the left as the possessor and the right as the possessed — same as modern A 的 B.',
      null,
      [ACT.grammarParsing],
    ),
    createContentItem(
      'X 也 = (it) is X',
      'X yě = (it) is X',
      'A classical sentence-final 也 (yě) is the declarative copula — completely different from modern 也 ("also / too"). In classical sentences, X 也 means "(this) is X". Survives mainly in chengyu and quotations: 是知也 ("this is wisdom"), 何如人也 ("what kind of person is this"). Do not confuse with modern 也.',
      'sentence',
      '是知也 shì zhī yě ("this is true wisdom" — from the Analects)',
      'A famous false friend: modern 我也 ("me too") vs. classical 是知也 ("this is wisdom") — same character, two completely different jobs.',
      [
        { target: 'classical 也 (sentence-final)', note: 'declarative copula "is" — only at end of classical sentences' },
        { target: 'modern 也 (pre-verbal)', note: '"also / too" — placed before the verb in modern sentences' },
        { target: 'context disambiguates', note: 'position in sentence (final vs pre-verbal) tells you which 也 is in play' },
      ],
      [ACT.grammarParsing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 13 — Culture Note: the vernacular shift
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '五四运动',
      'Wǔ-Sì Yùndòng',
      'The May 4th Movement (1919) was the political and cultural turning point that pushed mainstream Chinese writing from 文言 (classical) to 白话 (vernacular). Reformers like 鲁迅 (Lǔ Xùn), 胡适 (Hú Shì), and 陈独秀 (Chén Dúxiù) argued that classical writing locked literacy away from ordinary people, and they demonstrated by writing novels, essays, and journalism in the vernacular.',
      'sentence',
      '胡适《文学改良刍议》(1917): 提倡白话文，反对古文 ("advocating vernacular writing, opposing classical writing").',
      'A century later, the vernacular shift is essentially complete in everyday speech and most journalism — but classical echoes remain in chengyu, official documents, calligraphy, and ceremonial language.',
      [
        { target: '五四运动 (1919)', note: 'political/cultural movement; demanded literary modernization alongside political reform' },
        { target: '鲁迅 Lǔ Xùn', note: 'wrote the first major vernacular short story 《狂人日记》 (1918)' },
        { target: '胡适 Hú Shì', note: 'philosopher who articulated the case for vernacular writing in 1917' },
        { target: '陈独秀 Chén Dúxiù', note: 'founder of 《新青年》 (New Youth) magazine; vehicle for vernacular literature' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '为何遗存',
      'wèihé yícún',
      'Why classical echoes survived the vernacular shift. (1) Chengyu carry the historical core of Chinese rhetoric and are too useful to retire. (2) Official documents and party communiqués deliberately use classical-flavored phrasing for gravitas and continuity with state tradition. (3) Calligraphy art and classical poetry remain mainstream cultural practice. (4) State institutions are named in classical compounds (中华人民共和国, 国务院, 人民大会堂).',
      'sentence',
      '"以人为本，依法治国" ("put people first, govern according to law") — a four-character slogan that compresses two classical structures (以…为… and 依…治…) into eight characters.',
      'These four reasons explain why Level 3 learners who skip the formal register can read Weibo posts but cannot read 人民日报 editorials — the language is different in a real and meaningful way.',
      [
        { target: '成语 ~5,000', note: 'set idioms; most retain classical grammar inside the four-character compression' },
        { target: '公文', note: 'official documents; deliberately classical-flavored for gravitas' },
        { target: '牌匾 / 古诗', note: 'calligraphy art and classical poetry; mainstream cultural practice' },
        { target: '机构名', note: 'institution names coined in classical compounds — invisible inheritance' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '语体梯度',
      'yǔtǐ tīdù',
      'Place yourself on the register gradient. Pure 文言 (Confucian classics, Tang poetry): only specialists read it fluently. Classical-flavored modern (academic abstracts, People\'s Daily editorials, ceremonial speeches): every educated speaker handles it. Standard formal modern (most journalism, business letters): the everyday formal register. Casual modern (WeChat, conversation, blogs): pure vernacular. The gradient is continuous, not discrete.',
      'sentence',
      'PURE 文言 → CLASSICAL-FLAVORED MODERN → STANDARD FORMAL MODERN → CASUAL MODERN\n(Analects) (academic paper) (newspaper article) (WeChat message)',
      'Once you can place a sample on the gradient, you can choose the right register for your own writing — and read formal Chinese without resistance.',
      [
        { target: 'pure 文言', note: 'requires specialist training; rare today outside classical-studies and ceremonial readings' },
        { target: 'classical-flavored modern', note: 'academic and editorial; the target of this cluster' },
        { target: 'standard formal modern', note: 'most journalism, business communication; covered earlier in the curriculum' },
        { target: 'casual modern', note: 'conversation and casual writing; covered in Level 1' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 14 — Task: read and write
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '阅读练习 — 新闻社论',
      'yuèdú liànxí — xīnwén shèlùn',
      'Read this short formal-register news editorial and identify every classical-derived expression. Mark each with its category: pronoun (吾/汝/其/之/何), copula/verb (乃/为/谓), conjunction (而/则/故/然/若), negation (非/无/勿/莫/弗), nominalizer (所/之/以), or chengyu.',
      'sentence',
      '《教育乃国家之根本》\n教育乃国家之根本，其重要性不言而喻。当今之世，人工智能发展迅猛，故吾辈不可不察。若教育之改革不能与时俱进，则人才之培养必将滞后。由此可见，唯有以人为本，方能立于不败之地。',
      'Editorial draft from a 清华大学 op-ed: "Education is the Foundation of the Nation". Translation: "Education is the foundation of the nation, and its importance is self-evident. In today\'s world, AI is developing rapidly, and therefore we of this generation cannot fail to observe. If educational reform cannot keep pace with the times, then the cultivation of talent will inevitably lag. From this we can see: only by putting people first can we stand on undefeated ground."',
      [
        { target: '乃', note: 'classical copula "is"; appears twice in 教育乃国家之根本' },
        { target: '之 (×6)', note: 'classical attributive linker "of"; 国家之根本, 当今之世, 教育之改革, 人才之培养, 立于不败之地' },
        { target: '其', note: 'classical possessive "its" → 其重要性' },
        { target: '不言而喻', note: 'chengyu "self-evident"' },
        { target: '故', note: 'classical "therefore"' },
        { target: '吾辈', note: 'classical "we / our generation"' },
        { target: '不可不察', note: 'classical double-negative "cannot fail to observe"' },
        { target: '若…则…', note: 'classical conditional pair "if…then…"' },
        { target: '与时俱进', note: 'chengyu "keep pace with the times"' },
        { target: '由此可见', note: 'classical-derived conclusion connector "from this we can see"' },
        { target: '以人为本', note: 'slogan / chengyu "put people first" using 以…为… frame' },
        { target: '方能', note: 'classical "only then can" — 方 = "only then"' },
        { target: '立于不败之地', note: 'chengyu "stand on undefeated ground"' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '写作练习 — 正式语体段落',
      'xiězuò liànxí — zhèngshì yǔtǐ duànluò',
      'Write a 3–5 sentence formal-register paragraph on a topic of your choice (suggested topics: 科技与社会, 文化传承, 终身学习). Use at least 5 distinct classical elements — choose from pronouns (吾/其/之/何), conjunctions (而/则/故/若), negations (非/无/勿), nominalizers (所/以), or chengyu (不言而喻 / 由此可见 / 以人为本 / 不亦乐乎). The AI tutor will read it back and point out which elements work and which feel forced.',
      'sentence',
      'Model paragraph (终身学习): 终身学习乃当代社会之必然。今之世，知识更新日新月异，而墨守成规者，必将落伍。故吾辈当以学为本，活到老学到老。所谓学无止境，由此可见。',
      'Translation: "Lifelong learning is a necessity of contemporary society. In today\'s world, knowledge updates daily, and those who cling to old ways must fall behind. Therefore we of this generation should take learning as the foundation — keep learning until old age. The saying \'learning has no end\' — from this we can see (its truth)."',
      [
        { target: '乃', note: 'classical copula in "终身学习乃必然"' },
        { target: '之 (×3)', note: 'attributive linker in 社会之必然, 学无止境之 (implied)' },
        { target: '而', note: 'adversative connector in "更新日新月异，而墨守成规者…"' },
        { target: '者', note: 'classical nominalizer "the one who" → 墨守成规者 ("those who cling to old ways")' },
        { target: '故', note: 'classical conclusion connector "therefore"' },
        { target: '吾辈', note: 'classical "we / our generation"' },
        { target: '以…为…', note: 'classical instrumental frame "take learning as the foundation"' },
        { target: '所谓', note: 'classical "so-called" — academic opener' },
        { target: '由此可见', note: 'classical conclusion connector "from this we can see"' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战 — 撰写正式信件',
      'tiǎozhàn — zhuànxiě zhèngshì xìnjiàn',
      'Stretch goal: draft a complete formal letter to a senior 清华大学 professor (3–4 short paragraphs), using 敬启者 or 尊敬的 as the opening, at least 6 classical elements in the body, and 此致敬礼 or 顺颂时祺 as the closing. Suggested context: a request for a recommendation letter or a follow-up after meeting at a conference.',
      'conversation',
      '敬启者：\n\n  顺颂时祺。学生李伟，现就读于清华大学计算机系。日前于人工智能研讨会上有幸聆听教授之报告，受益匪浅，感激不尽。\n\n  学生欲申请贵实验室之博士项目，故冒昧请求教授赐予推荐信一封。若蒙允诺，吾必不负教授之期望。\n\n  此致\n敬礼\n\n李伟 谨上\n2026年5月14日',
      'A full-bracket formal letter: opener 敬启者 + 顺颂时祺 (warm seasonal wish at the start), body with classical particles (之 ×3, 故, 若, 吾, 蒙), closing 此致敬礼, signature 谨上. The AI tutor will critique the register density and suggest tightening.',
      [
        { target: '敬启者', note: 'classical letter opener' },
        { target: '顺颂时祺', note: 'classical seasonal valediction; here used unusually at the opening for extra warmth' },
        { target: '之 (×3)', note: 'attributive linker; 教授之报告, 贵实验室之博士项目, 教授之期望' },
        { target: '故', note: 'classical conclusion connector "therefore"' },
        { target: '若蒙允诺', note: 'classical conditional + classical "to receive (a favor)"; "if granted permission"' },
        { target: '吾', note: 'classical "I"; raises register from 我' },
        { target: '此致敬礼', note: 'classical letter closing' },
        { target: '谨上', note: 'classical signature formula "submitted with care"' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
