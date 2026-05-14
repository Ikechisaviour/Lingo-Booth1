// Level 1 — Foundation: Mandarin Pinyin & Tones
// First lesson on the Chinese / Foundation track. Pre-grammar, pre-vocabulary.
// Covers the four tones + neutral, the Pinyin initial-final system, tone
// sandhi, a Hanzi overview, and the spelling-to-sound rules a learner needs
// to read aloud from Pinyin and recognize the relationship between Pinyin
// and Hanzi.
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
  // Legacy keys for UI fallback — same convention as the Korean source:
  // the "korean" slot holds the target text, the "english" slot holds the note.
  korean: target,
  english: note,
  example: example || target,
  exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  intro: 'zh-foundation-intro',
  tones: 'zh-foundation-tones',
  initials: 'zh-foundation-initials',
  simpleFinals: 'zh-foundation-simple-finals',
  compoundFinals: 'zh-foundation-compound-finals',
  nasalFinals: 'zh-foundation-nasal-finals',
  toneSandhi: 'zh-foundation-tone-sandhi',
  hanzi: 'zh-foundation-hanzi',
  radicals: 'zh-foundation-radicals',
  strokeOrder: 'zh-foundation-stroke-order',
  simplifiedTraditional: 'zh-foundation-simplified-traditional',
  reading: 'zh-foundation-reading-practice',
};

const activities = [
  {
    id: ACT.intro,
    section: 'Why Pinyin & Tones',
    title: '拼音入门 — How Mandarin sounds are organized',
    goals: [
      'Understand that Mandarin is a tonal language: the same syllable said with a different pitch contour means a different word.',
      'See why Pinyin (the official romanization since 1958) is the bridge between the alphabet you know and the Hanzi characters you will learn.',
      'Know that every Mandarin syllable has three parts — initial (consonant), final (vowel cluster), and tone — and that all three must be correct.',
    ],
    task: 'Read the four structural facts. By the end of this lesson you should be able to read a Pinyin-spelled syllable aloud with the correct tone, even before you know the Hanzi.',
  },
  {
    id: ACT.tones,
    section: 'The 4 Tones + Neutral',
    title: '四声 — Pitch contours that change meaning',
    goals: [
      'Distinguish the four full tones (mā má mǎ mà) plus the neutral tone (ma) by their pitch shapes — high-level, rising, dip-and-rise, sharp-falling, and light/short.',
      'Hear that the SAME syllable "ma" means five different things depending on the tone, so tone is not optional decoration but core meaning.',
    ],
    task: 'Listen to mā má mǎ mà ma five times each and learn to identify which one is which by pitch alone.',
  },
  {
    id: ACT.initials,
    section: 'Pinyin Initials',
    title: '声母 — The 21 consonant initials',
    goals: [
      'Recognize all 21 Pinyin initials (b p m f / d t n l / g k h / j q x / zh ch sh r / z c s), each with its IPA value.',
      'Pay extra attention to the three sound groups that have no English equivalent: the palatal series j/q/x, the retroflex series zh/ch/sh/r, and the dental series z/c/s.',
    ],
    task: 'Read each initial aloud paired with the vowel "a" (ba, pa, ma, fa…) — drill until the unfamiliar initials feel natural.',
  },
  {
    id: ACT.simpleFinals,
    section: 'Simple Finals',
    title: '单韵母 — The 6 basic vowels',
    goals: [
      'Pronounce the 6 simple finals a, o, e, i, u, ü, paying special attention to ü (a sound English does not have) and the back vowel "e".',
      'Hear how the same vowel sounds slightly different after different initials (e.g., "i" after z/c/s is buzzy; after zh/ch/sh/r is r-colored; after most other initials is a clear /i/).',
    ],
    task: 'Read each simple final aloud with the neutral initial (no consonant: a, o, e, yi, wu, yu).',
  },
  {
    id: ACT.compoundFinals,
    section: 'Compound Finals',
    title: '复韵母 — Two- and three-vowel combinations',
    goals: [
      'Read the compound finals: ai, ei, ao, ou, ia, ie, iao, iou (written iu), ua, uo, uai, uei (written ui), üe.',
      'Notice the spelling quirks where the middle vowel of iou and uei is dropped in writing (jiu = jiou, dui = duei) — but pronounced fully.',
    ],
    task: 'Read each compound final aloud after the initial l- (lai, lei, lao, lou, lia, lie, liao, liu, lua, luo).',
  },
  {
    id: ACT.nasalFinals,
    section: 'Nasal Finals',
    title: '鼻韵母 — Finals ending in -n or -ng',
    goals: [
      'Distinguish the -n endings (an, en, in, un, ün) from the -ng endings (ang, eng, ing, ong) — a contrast that signals different words in Mandarin.',
      'Pronounce -n with the tongue tip on the alveolar ridge (like English n) and -ng with the back of the tongue against the soft palate (like English -ng in "sing").',
    ],
    task: 'Read each pair side by side (an/ang, en/eng, in/ing) until the -n/-ng contrast is automatic.',
  },
  {
    id: ACT.toneSandhi,
    section: 'Tone Sandhi',
    title: '变调 — Tone changes in connected speech',
    goals: [
      'Apply the third-tone sandhi rule: when two third tones are adjacent, the first becomes a rising (second) tone — so 你好 nǐ hǎo is actually spoken as ní hǎo.',
      'Apply the 不 (bù) sandhi: bù becomes bú before another fourth tone (不是 bùshì → búshì).',
      'Apply the 一 (yī) sandhi: yī becomes yí before a fourth tone, yì before tones 1/2/3.',
    ],
    task: 'Read each sandhi example pair side by side (written form vs spoken form) until the rule becomes automatic.',
  },
  {
    id: ACT.hanzi,
    section: 'Hanzi Overview',
    title: '汉字入门 — How Chinese characters work',
    goals: [
      'Understand that Hanzi is logographic: each character represents one syllable AND one unit of meaning, unlike the alphabet which represents only sounds.',
      'Know that about 3,500 common characters cover the majority of everyday Chinese reading and that Hanzi visually encode meaning, not pronunciation directly.',
    ],
    task: 'Look at 5 common characters and note how each one packs both sound (one syllable) and meaning into a single unit.',
  },
  {
    id: ACT.radicals,
    section: 'Radicals',
    title: '部首 — Building blocks of characters',
    goals: [
      'Recognize 8 of the most frequent radicals (亻 氵 木 心 口 言 女 火) and the semantic field each one signals.',
      'Understand that radicals serve as both dictionary lookup keys and meaning hints — a character containing 氵 (water) usually relates to liquids.',
    ],
    task: 'For each of the 8 sample radicals, name the semantic field and identify one common character that uses it.',
  },
  {
    id: ACT.strokeOrder,
    section: 'Stroke Order',
    title: '笔顺 — How to write a character',
    goals: [
      'Apply the basic stroke-order rules: top before bottom, left before right, horizontal before vertical, outside before inside, then close the box.',
      'Know that correct stroke order matters for handwriting recognition, character lookup, and muscle memory when learning new characters.',
    ],
    task: 'Write 你 (nǐ, you) following the correct stroke order: 亻 first, then 尔 (中竖, 一横, 撇, 竖弯钩, 长撇).',
  },
  {
    id: ACT.simplifiedTraditional,
    section: 'Simplified vs Traditional',
    title: '简体与繁体 — Two character systems',
    goals: [
      'Know that Mainland China and Singapore use Simplified characters (introduced in the 1950s), while Taiwan, Hong Kong, and Macau use Traditional characters.',
      'Recognize a few common simplified/traditional pairs: 国/國 (country), 学/學 (study), 龙/龍 (dragon), 听/聽 (listen) — same word, different visual form.',
    ],
    task: 'For each of 5 character pairs, identify which is simplified and which is traditional.',
  },
  {
    id: ACT.reading,
    section: 'Reading Practice',
    title: '朗读练习 — Read a full sentence applying every rule',
    goals: [
      'Read a short Pinyin-and-Hanzi sentence aloud with correct initials, finals, tones, and sandhi.',
      'Identify each tone, each sandhi shift, and each initial-final boundary in the example sentence.',
    ],
    task: 'Read aloud: "你好！我叫莎拉，我是清华的学生。" (Nǐ hǎo! Wǒ jiào Shālā, wǒ shì Qīnghuá de xuéshēng.) Then point out where the third-tone sandhi happens.',
  },
];

const level1Foundation = {
  title: 'Foundation: Mandarin Pinyin & Tones — Reading & Pronouncing Chinese',
  category: 'greetings', // foundation lessons live under greetings until a 'foundation' category is added
  difficulty: 'beginner',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'foundation',
  activities,
  expressionPractice: [],
  relatedPools: [],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Why Pinyin & Tones
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '声调改变意义',
      'shēngdiào gǎibiàn yìyì',
      'Mandarin is a tonal language: pitch is part of every syllable, not optional intonation. The same vowels with a different tone are different words — like spelling differences in English.',
      'word',
      'mā 妈 / má 麻 / mǎ 马 / mà 骂',
      'Same vowel and consonant, four different words — only the tone changes; getting the tone wrong yields a different word entirely.',
      [
        { target: 'mā 妈', note: 'first tone — high, level pitch — meaning "mother"' },
        { target: 'má 麻', note: 'second tone — rising pitch — meaning "hemp"' },
        { target: 'mǎ 马', note: 'third tone — dip then rise — meaning "horse"' },
        { target: 'mà 骂', note: 'fourth tone — sharp falling — meaning "scold"' },
      ],
      [ACT.intro],
    ),
    createContentItem(
      '拼音是桥梁',
      'pīnyīn shì qiáoliáng',
      'Pinyin is the official romanization system standardized by Mainland China in 1958. It uses Latin letters with tone marks to spell out Mandarin pronunciation — the bridge for learners between the alphabet and Hanzi characters.',
      'word',
      '汉字 hànzì — 拼音 pīnyīn',
      'Pinyin spells the sound; the Hanzi character carries the meaning. Every Chinese learner uses Pinyin first; Hanzi recognition builds on top of solid Pinyin reading skills.',
      [
        { target: '拼音 pīnyīn', note: 'romanization system using Latin letters + tone marks; standardized 1958' },
        { target: '汉字 hànzì', note: 'Chinese characters; each one carries meaning, not just sound' },
      ],
      [ACT.intro],
    ),
    createContentItem(
      '音节结构',
      'yīnjié jiégòu',
      'Every Mandarin syllable has three parts: an initial (consonant, optional), a final (vowel cluster, required), and a tone (required). Get all three right and the word is intelligible; miss any one and meaning breaks down.',
      'word',
      'mā = m + a + 一声',
      'Syllable structure is fixed: at most one initial + one final + one tone per syllable.',
      [
        { target: 'initial 声母', note: 'the opening consonant (b/p/m/f/d/…); some syllables have no initial' },
        { target: 'final 韵母', note: 'the vowel core, possibly with a glide and/or nasal ending' },
        { target: 'tone 声调', note: 'the pitch contour, marked with a diacritic; always required' },
      ],
      [ACT.intro],
    ),
    createContentItem(
      '学习路径',
      'xuéxí lùjìng',
      'By the end of this Foundation lesson you should be able to read any Pinyin-spelled syllable aloud with its correct tone, even if you have never seen the word, and recognize the relationship between Pinyin and the Hanzi it represents.',
      'word',
      'Goal: read "nǐ hǎo" 你好 aloud with the correct third-tone sandhi (spoken: ní hǎo).',
      'If you can read this greeting correctly with the sandhi, you have all the Foundation tools and can begin Unit 1.',
      null,
      [ACT.intro],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — The Four Tones + Neutral
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '第一声',
      'dì yī shēng (mā)',
      'First tone: high and level, like singing one steady note at the top of your comfortable range. Marked with a flat bar (¯) over the vowel: mā, tā, kāi.',
      'word',
      'mā 妈 mother · tā 他 he · kāi 开 open · gāo 高 tall',
      'Hold the pitch steady — any drop or rise turns this into a different tone and a different word.',
      [
        { target: '¯ tone mark', note: 'flat bar above the vowel; indicates first tone' },
        { target: 'pitch shape: high level', note: 'sing one note at the top of your range, no movement' },
      ],
      [ACT.tones],
    ),
    createContentItem(
      '第二声',
      'dì èr shēng (má)',
      'Second tone: rising from middle to high, like asking a surprised question in English ("What?"). Marked with a rising slash (´) over the vowel: má, pái, lái.',
      'word',
      'má 麻 hemp · pái 牌 sign · lái 来 come · míng 明 bright',
      'Start at middle pitch and glide upward; if you start too high, you cannot rise far enough.',
      [
        { target: '´ tone mark', note: 'rising slash above the vowel; indicates second tone' },
        { target: 'pitch shape: mid to high rise', note: 'like a surprised question in English: "What?"' },
      ],
      [ACT.tones],
    ),
    createContentItem(
      '第三声',
      'dì sān shēng (mǎ)',
      'Third tone: dips down to the lowest pitch, then rises back. In isolation, the full dip-and-rise contour is heard. In running speech it often shortens to a low pitch with no rise. Marked with a v-shape (ˇ): mǎ, nǐ, hǎo.',
      'word',
      'mǎ 马 horse · nǐ 你 you · hǎo 好 good · wǒ 我 I',
      'In careful speech, the full dip-and-rise; in fast speech, often just a low pitch.',
      [
        { target: 'ˇ tone mark', note: 'v-shape above the vowel; indicates third tone' },
        { target: 'pitch shape: dip then rise', note: 'fall to your lowest note, then rise back up — only complete when said alone or at the end of a phrase' },
      ],
      [ACT.tones],
    ),
    createContentItem(
      '第四声',
      'dì sì shēng (mà)',
      'Fourth tone: sharp falling from high to low, like giving a firm command in English ("Stop!"). Marked with a falling slash (`): mà, dào, kàn.',
      'word',
      'mà 骂 scold · dào 到 arrive · kàn 看 look · zài 在 at',
      'Make it sharp and decisive — a soft fall is too weak and merges into other tones.',
      [
        { target: '` tone mark', note: 'falling slash above the vowel; indicates fourth tone' },
        { target: 'pitch shape: high to low sharp fall', note: 'like a firm command in English: "Stop!"' },
      ],
      [ACT.tones],
    ),
    createContentItem(
      '轻声',
      'qīngshēng (ma)',
      'Neutral tone: light, short, unstressed — the pitch is determined by the preceding tone, not by an independent contour. No tone mark is written. Common on grammatical particles (吗, 了, 的) and second syllables of certain compound words (妈妈 māma, 朋友 péngyou).',
      'word',
      '吗 ma (question particle) · 妈妈 māma (mother) · 朋友 péngyou (friend)',
      'Particles and many second syllables of compound words drop their tone in fluent speech.',
      [
        { target: 'no tone mark', note: 'neutral tone is left unmarked in Pinyin' },
        { target: 'pitch determined by previous tone', note: 'after 1st tone → mid; after 2nd → high; after 3rd → low rising; after 4th → low' },
        { target: 'always short', note: 'neutral-tone syllables are noticeably shorter than full-tone syllables' },
      ],
      [ACT.tones],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Pinyin Initials
    // ────────────────────────────────────────────────────────────────────
    createContentItem('b', 'b /p/ (unaspirated)', 'Unvoiced unaspirated bilabial — like English "p" in "spy" with no puff of air. Not voiced like English "b".', 'word', 'bā 八 eight · bù 不 not · bāng 帮 help', 'No throat vibration; no breath puff — distinct from both English b and p.', null, [ACT.initials]),
    createContentItem('p', 'p /pʰ/ (aspirated)', 'Voiceless aspirated bilabial — like English "p" in "pat" with a strong puff of air. The aspirated counterpart of Pinyin b.', 'word', 'pà 怕 fear · pái 牌 sign · péng 朋 friend', 'The puff of air is the key feature distinguishing it from Pinyin b.', null, [ACT.initials]),
    createContentItem('m', 'm /m/', 'Voiced bilabial nasal — identical to English "m".', 'word', 'mā 妈 mother · mǎ 马 horse · měi 美 beautiful', 'One of the easiest initials for English speakers.', null, [ACT.initials]),
    createContentItem('f', 'f /f/', 'Voiceless labiodental fricative — identical to English "f".', 'word', 'fà 发 hair · fēn 分 minute · fáng 房 house', 'Upper teeth on lower lip, push air.', null, [ACT.initials]),
    createContentItem('d', 'd /t/ (unaspirated)', 'Unvoiced unaspirated alveolar — like English "t" in "stop" without the puff. Not voiced like English "d".', 'word', 'dà 大 big · dōu 都 all · děng 等 wait', 'No throat vibration; no breath puff — distinct from both English d and t.', null, [ACT.initials]),
    createContentItem('t', 't /tʰ/ (aspirated)', 'Voiceless aspirated alveolar — like English "t" in "top" with a strong puff. The aspirated counterpart of Pinyin d.', 'word', 'tā 他 he · tóu 头 head · tīng 听 listen', 'The puff of air distinguishes it from Pinyin d.', null, [ACT.initials]),
    createContentItem('n', 'n /n/', 'Voiced alveolar nasal — identical to English "n".', 'word', 'nǐ 你 you · nán 男 male · nián 年 year', 'Familiar sound; same as English n in "no".', null, [ACT.initials]),
    createContentItem('l', 'l /l/', 'Voiced alveolar lateral — identical to English "l".', 'word', 'lǎo 老 old · lái 来 come · lèi 累 tired', 'Familiar sound; same as English l in "long".', null, [ACT.initials]),
    createContentItem('g', 'g /k/ (unaspirated)', 'Unvoiced unaspirated velar — like English "k" in "sky" without the puff. Not voiced like English "g".', 'word', 'gāo 高 tall · gǒu 狗 dog · guò 过 pass', 'No throat vibration; no breath puff — distinct from both English g and k.', null, [ACT.initials]),
    createContentItem('k', 'k /kʰ/ (aspirated)', 'Voiceless aspirated velar — like English "k" in "key" with a strong puff. The aspirated counterpart of Pinyin g.', 'word', 'kāi 开 open · kàn 看 look · kǒu 口 mouth', 'The puff of air distinguishes it from Pinyin g.', null, [ACT.initials]),
    createContentItem('h', 'h /x/', 'Voiceless velar fricative — more throaty than English "h", like the "ch" in Scottish "loch" or German "Bach". Friction is at the back of the throat, not just a breath.', 'word', 'hǎo 好 good · hé 和 and · huà 话 speech', 'English speakers often pronounce this too softly; aim for a slight rasp.', null, [ACT.initials]),
    createContentItem('j', 'j /tɕ/', 'Voiceless unaspirated alveolo-palatal affricate — like a soft English "j" pronounced with the tongue flat and forward against the upper teeth. Only combines with i, u, or ü-finals.', 'word', 'jiā 家 home · jīn 金 gold · jiào 叫 call', 'Part of the palatal series j/q/x — all share the same tongue position, differing only in aspiration and friction.', null, [ACT.initials]),
    createContentItem('q', 'q /tɕʰ/', 'Voiceless aspirated alveolo-palatal affricate — like Pinyin j but with a strong puff of air. Often surprising for English speakers since "q" looks like English /kw/ but sounds like a soft "ch".', 'word', 'qī 七 seven · qù 去 go · qián 钱 money', 'The most commonly mispronounced initial by English speakers; never sounds like English q.', null, [ACT.initials]),
    createContentItem('x', 'x /ɕ/', 'Voiceless alveolo-palatal fricative — like a soft English "sh" with the tongue flatter and farther forward. Only combines with i, u, or ü-finals.', 'word', 'xiè 谢 thank · xiào 笑 laugh · xué 学 study', 'The fricative counterpart of j/q; never sounds like English x /ks/.', null, [ACT.initials]),
    createContentItem('zh', 'zh /ʈʂ/', 'Voiceless unaspirated retroflex affricate — like English "j" but with the tongue tip curled back to touch the roof of the mouth. The "j" of "jam" with a curled tongue.', 'word', 'zhōng 中 middle · zhī 知 know · zhù 住 live', 'Part of the retroflex series zh/ch/sh/r — all share the curled-back tongue position.', null, [ACT.initials]),
    createContentItem('ch', 'ch /ʈʂʰ/', 'Voiceless aspirated retroflex affricate — like Pinyin zh but with a strong puff of air. The English "ch" of "church" pronounced with a curled-back tongue.', 'word', 'chī 吃 eat · chá 茶 tea · chuáng 床 bed', 'Aspirated counterpart of zh; the puff is what distinguishes them.', null, [ACT.initials]),
    createContentItem('sh', 'sh /ʂ/', 'Voiceless retroflex fricative — like English "sh" but with the tongue tip curled back. The "sh" of "shoe" with a curled tongue.', 'word', 'shī 师 teacher · shū 书 book · shēng 生 born', 'The fricative member of the retroflex series; familiar shape but with curled tongue.', null, [ACT.initials]),
    createContentItem('r', 'r /ʐ/', 'Voiced retroflex fricative — partway between English "r" and the "s" in "treasure". Curl the tongue back as for sh, then add throat vibration. Unlike American "r", the tongue is more tense.', 'word', 'rì 日 sun · rén 人 person · ròu 肉 meat', 'Not the American English "r" — closer to a buzzed "zhe" sound.', null, [ACT.initials]),
    createContentItem('z', 'z /ts/ (unaspirated)', 'Voiceless unaspirated dental affricate — like the "ts" in "cats" but at the start of a syllable, with no puff of air.', 'word', 'zài 在 at · zǒu 走 walk · zì 字 character', 'Part of the dental series z/c/s; sharp tongue tip at the upper teeth.', null, [ACT.initials]),
    createContentItem('c', 'c /tsʰ/ (aspirated)', 'Voiceless aspirated dental affricate — like Pinyin z but with a strong puff of air. The English "ts" of "tsunami" with extra breath.', 'word', 'cì 次 time · cài 菜 vegetable · cóng 从 from', 'Aspirated counterpart of z; never sounds like English c /k/.', null, [ACT.initials]),
    createContentItem('s', 's /s/', 'Voiceless dental fricative — like English "s" but pronounced with the tongue closer to the teeth, slightly sharper.', 'word', 'sān 三 three · sì 四 four · suì 岁 years old', 'The fricative counterpart of z/c; similar to English s but cleaner.', null, [ACT.initials]),
    createContentItem('y', 'y /j/', 'Spelling convention only — a written form of i/u/ü when they start a syllable with no other initial. Pronounced as the glide y in English "yes" (for yi/ya/ye/yo/yu) or as ü (for yu when standing for ü).', 'word', 'yī 一 one · yǒu 有 have · yuè 月 month', 'Not a "real" initial but a spelling rule; the sound is the underlying vowel.', null, [ACT.initials]),
    createContentItem('w', 'w /w/', 'Spelling convention only — a written form of u when it starts a syllable with no other initial. Pronounced as English "w".', 'word', 'wǒ 我 I · wǔ 五 five · wén 文 culture', 'Not a "real" initial but a spelling rule for u-initial syllables.', null, [ACT.initials]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Simple Finals
    // ────────────────────────────────────────────────────────────────────
    createContentItem('a', 'a /a/', 'Open central vowel like the "a" in "father". Mouth wide open, tongue low and central.', 'word', 'mā 妈 mother · bā 八 eight · tā 他 he', 'One of the easiest finals for English speakers; matches the English "a" of "father".', null, [ACT.simpleFinals]),
    createContentItem('o', 'o /o/ or /uo/', 'Rounded back vowel like English "o" in "more". After b/p/m/f, often pronounced as the diphthong "uo" (bo = buo).', 'word', 'wǒ 我 I · mō 摸 touch · pó 婆 grandmother', 'Lips firmly rounded; sometimes the "uo" diphthong is more accurate than a pure "o".', null, [ACT.simpleFinals]),
    createContentItem('e', 'e /ɤ/', 'Unrounded back vowel — no English equivalent. Position your mouth as if to say "o" then unround the lips and pull the tongue back slightly. Often sounds like "uh" with a back-of-throat tension.', 'word', 'hē 喝 drink · gē 哥 elder brother · è 饿 hungry', 'One of the trickiest vowels for English speakers; not the "e" of English "bed".', null, [ACT.simpleFinals]),
    createContentItem('i', 'i /i/, /ɨ/, or /ʐ̩/', 'Three different pronunciations depending on the initial. After zh/ch/sh/r → /ʐ̩/ (r-colored); after z/c/s → /ɨ/ (buzzy); elsewhere → /i/ (clear "ee" as in "see").', 'word', 'nǐ 你 you (/i/) · zì 字 character (/ɨ/) · shī 师 teacher (/ʐ̩/)', 'Same letter, three sounds depending on the preceding initial — context is everything.', null, [ACT.simpleFinals]),
    createContentItem('u', 'u /u/', 'Rounded back vowel like English "oo" in "boot". Lips firmly rounded and protruded.', 'word', 'wǔ 五 five · gǔ 古 ancient · bù 不 not', 'Familiar sound; same as English "oo" in "boot".', null, [ACT.simpleFinals]),
    createContentItem('ü', 'ü /y/', 'Rounded front vowel — no English equivalent. Say "ee" then round the lips while keeping the tongue forward. Written as "u" after j/q/x/y (where the dots are dropped); written as "ü" only after n/l.', 'word', 'lǜ 绿 green · nǚ 女 female · jū 居 reside', 'Critical to distinguish nǚ (female) from nǔ (effort); the umlaut matters.', null, [ACT.simpleFinals]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Compound Finals
    // ────────────────────────────────────────────────────────────────────
    createContentItem('ai', 'ai /aɪ/', 'Diphthong like English "eye" or "i" in "ride". Starts open, glides toward "i".', 'word', 'ài 爱 love · lái 来 come · kāi 开 open', 'Same as English "eye"; easy for English speakers.', null, [ACT.compoundFinals]),
    createContentItem('ei', 'ei /eɪ/', 'Diphthong like English "ay" in "day". Starts at mid-front, glides toward "i".', 'word', 'měi 美 beautiful · gěi 给 give · lèi 累 tired', 'Same as the English "ay" diphthong; familiar to learners.', null, [ACT.compoundFinals]),
    createContentItem('ao', 'ao /aʊ/', 'Diphthong like English "ow" in "now". Starts open, glides toward "u".', 'word', 'hǎo 好 good · lǎo 老 old · gāo 高 tall', 'Same as the English "ow" of "now"; familiar shape.', null, [ACT.compoundFinals]),
    createContentItem('ou', 'ou /oʊ/', 'Diphthong like English "oh" in "go". Starts at mid-back, glides toward "u".', 'word', 'gǒu 狗 dog · zǒu 走 walk · ròu 肉 meat', 'Same as the English "oh" diphthong; familiar shape.', null, [ACT.compoundFinals]),
    createContentItem('ie', 'ie /jɛ/', 'Two-vowel glide: starts at "i", glides to "e" (like the "ye" in "yes"). Not the same as English "ie" in "pie".', 'word', 'xiè 谢 thank · jiě 姐 elder sister · tiě 铁 iron', 'Starts high-front, ends mid-front; common after j/q/x/x and t/n/l.', null, [ACT.compoundFinals]),
    createContentItem('iao', 'iao /jaʊ/', 'Three-vowel glide: "i" → "a" → "o". The longest of the common diphthongs; mouth opens during the glide.', 'word', 'xiǎo 小 small · jiào 叫 call · niǎo 鸟 bird', 'A triphthong — three vowel positions blended into one syllable.', null, [ACT.compoundFinals]),
    createContentItem('iu', 'iu /joʊ/ (= iou)', 'Spelling shortcut for iou. The middle "o" is dropped in writing but pronounced lightly in speech: jiu = jiou.', 'word', 'jiǔ 九 nine · liù 六 six · niú 牛 cow', 'Don\'t pronounce as "i + u" — always remember the hidden "o" in the middle.', null, [ACT.compoundFinals]),
    createContentItem('uo', 'uo /wo/', 'Two-vowel glide: starts at "u", glides to "o". Like the "wo" in "won\'t" but more rounded.', 'word', 'wǒ 我 I · guō 锅 pot · duō 多 many', 'A common final; appears after most initials.', null, [ACT.compoundFinals]),
    createContentItem('ui', 'ui /weɪ/ (= uei)', 'Spelling shortcut for uei. The middle "e" is dropped in writing but pronounced lightly: dui = duei.', 'word', 'duì 对 correct · shuǐ 水 water · suì 岁 years old', 'Don\'t pronounce as "u + i" — always remember the hidden "e" in the middle.', null, [ACT.compoundFinals]),
    createContentItem('üe', 'üe /yɛ/', 'Two-vowel glide: starts at "ü" (the rounded front vowel), glides to "e". Written as "ue" after j/q/x/y (no dots needed); written as "üe" only after n/l.', 'word', 'xué 学 study · yuè 月 month · juè 觉 feel', 'Critical for words like 学 (xué, study) — one of the most common verbs in Chinese.', null, [ACT.compoundFinals]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Nasal Finals
    // ────────────────────────────────────────────────────────────────────
    createContentItem('an / ang', 'an /an/ vs ang /aŋ/', '-n endings have the tongue tip on the alveolar ridge (like English "an"). -ng endings have the back of the tongue against the soft palate (like English "ang" in "sang"). Confusing them changes the word.', 'word', 'sān 三 three vs sāng 桑 mulberry · lán 蓝 blue vs láng 狼 wolf', 'Two completely different words; the -n vs -ng split is meaning-bearing in Mandarin.', [
      { target: '-n', note: 'tongue tip on the alveolar ridge, like English "an"' },
      { target: '-ng', note: 'back of the tongue on the soft palate, like English "ang" in "sang"' },
    ], [ACT.nasalFinals]),
    createContentItem('en / eng', 'en /ən/ vs eng /əŋ/', 'Same -n vs -ng contrast with the "e" vowel. The "e" before -n is a schwa; before -ng it sometimes lengthens slightly.', 'word', 'rén 人 person vs réng 仍 still · fēn 分 minute vs fēng 风 wind', 'High-frequency contrast; appears in many common words.', null, [ACT.nasalFinals]),
    createContentItem('in / ing', 'in /in/ vs ing /iŋ/', 'Same -n vs -ng contrast with the "i" vowel. -ing often gets a slight schwa: ing = i-əng for some speakers.', 'word', 'jīn 金 gold vs jīng 京 capital · xīn 心 heart vs xīng 星 star', 'Often heard in city names: 北京 Běijīng (Northern Capital) ends in -ing; 天津 Tiānjīn ends in -in.', null, [ACT.nasalFinals]),
    createContentItem('un / ün', 'un /wən/ vs ün /yn/', '"un" is actually "u + en" with the e dropped in writing: dun = duen. "ün" is the rounded front ü + n; written as "un" after j/q/x/y (no dots).', 'word', 'dūn 吨 ton vs jūn 军 army', 'A spelling trap: "un" after j/q/x/y means ün (rounded front), not un (back vowel).', null, [ACT.nasalFinals]),
    createContentItem('ong', 'ong /ʊŋ/', 'A back-vowel + -ng combination. Lips rounded; the "o" here is closer to /ʊ/ than to pure /o/.', 'word', 'zhōng 中 middle · gōng 工 work · dōng 东 east', 'Common in country names and directional words: 中国 Zhōngguó (China), 东方 dōngfāng (east).', null, [ACT.nasalFinals]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Tone Sandhi
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '三声变调',
      'sān shēng biàndiào',
      'Third-tone sandhi: when two third tones are adjacent, the first one becomes a second (rising) tone. Written form keeps both as third tones; spoken form changes the first one.',
      'sentence',
      '你好 nǐ hǎo → spoken: ní hǎo',
      'The single most important sandhi rule in Mandarin; applies to one of the most common greetings.',
      [
        { target: '你好 (written: nǐ hǎo)', note: 'spelled with two third tones in Pinyin' },
        { target: '你好 (spoken: ní hǎo)', note: 'first 你 actually rises to second tone; second 好 keeps third tone' },
      ],
      [ACT.toneSandhi],
    ),
    createContentItem(
      '不的变调',
      'bù de biàndiào',
      '不 (bù, "not") sandhi: bù changes to bú (rising tone) when followed by another fourth tone. With first, second, or third tones, it stays as bù.',
      'sentence',
      '不是 bùshì → búshì (because 是 is fourth tone)',
      'High-frequency word; the sandhi appears in many common negative sentences.',
      [
        { target: '不 + 1st/2nd/3rd → bù (no change)', note: 'e.g., 不来 bù lái, 不好 bù hǎo' },
        { target: '不 + 4th → bú (rises)', note: 'e.g., 不是 búshì, 不要 búyào' },
      ],
      [ACT.toneSandhi],
    ),
    createContentItem(
      '一的变调',
      'yī de biàndiào',
      '一 (yī, "one") sandhi: yī changes to yí (rising) before a fourth tone; yì (falling) before first, second, or third tones; stays as yī when standing alone or at the end of a number.',
      'sentence',
      '一个 yīgè → yígè (because 个 is fourth) · 一天 yītiān → yìtiān (because 天 is first)',
      'Applies whenever 一 appears before a measure word or noun, which is most of the time.',
      [
        { target: '一 alone or final: yī', note: 'e.g., 第一 dì yī, 十一 shí yī' },
        { target: '一 + 4th → yí', note: 'e.g., 一个 yígè, 一样 yíyàng' },
        { target: '一 + 1st/2nd/3rd → yì', note: 'e.g., 一天 yìtiān, 一年 yìnián' },
      ],
      [ACT.toneSandhi],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Hanzi Overview
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '汉字',
      'hànzì',
      'Chinese characters: a logographic writing system where each character represents one syllable AND one unit of meaning. Unlike alphabets that only encode sounds, Hanzi encode meaning directly.',
      'word',
      '一 yī (one), 人 rén (person), 大 dà (big), 国 guó (country)',
      'Each character is a self-contained meaning unit; learning Hanzi means learning thousands of these units.',
      [
        { target: '一 yī', note: 'one — one horizontal stroke, the simplest character' },
        { target: '人 rén', note: 'person — two strokes shaped like a walking figure' },
        { target: '大 dà', note: 'big — a person 人 with arms outstretched' },
        { target: '国 guó', note: 'country — a "jade" 玉 enclosed in a border, modernized' },
      ],
      [ACT.hanzi],
    ),
    createContentItem(
      '常用字数量',
      'chángyòngzì shùliàng',
      'About 3,500 common characters cover the vast majority of everyday Chinese reading. The official HSK exam levels target ~5,000 characters for advanced fluency; a typical literate adult knows 8,000–10,000.',
      'word',
      'HSK 1: ~150 characters · HSK 3: ~600 · HSK 6: ~2,500 · educated adult: ~8,000+',
      'The learning curve flattens after 1,000 characters because of high overlap in common words.',
      null,
      [ACT.hanzi],
    ),
    createContentItem(
      '一字一音节',
      'yī zì yī yīnjié',
      'One character = one syllable. Multi-syllable words are written as adjacent characters with no spaces. The Hanzi 中国 (China) is written as two characters because it is two syllables: zhōng + guó.',
      'word',
      '中国 Zhōngguó (China) — 2 characters, 2 syllables · 北京 Běijīng (Beijing) — 2 characters, 2 syllables',
      'Multi-character words form the bulk of modern Mandarin vocabulary.',
      null,
      [ACT.hanzi],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Radicals
    // ────────────────────────────────────────────────────────────────────
    createContentItem('亻', 'rén (person)', 'Radical form of 人 (person); appears on the left side of characters. Signals meanings related to people, professions, or human actions.', 'word', '你 nǐ you · 他 tā he · 们 men plural · 体 tǐ body', 'A common radical; recognizing it narrows the semantic field for hundreds of characters.', null, [ACT.radicals]),
    createContentItem('氵', 'shuǐ (water)', 'Radical form of 水 (water); appears on the left side. Signals meanings related to water, liquids, rivers, weather, or cleaning.', 'word', '河 hé river · 海 hǎi sea · 洗 xǐ wash · 酒 jiǔ alcohol', 'The single most predictable semantic radical; almost always signals liquid-related meaning.', null, [ACT.radicals]),
    createContentItem('木', 'mù (wood/tree)', 'A tree; appears as a radical on the left or as a component. Signals meanings related to trees, wood, or things made of wood.', 'word', '林 lín forest · 树 shù tree · 桌 zhuō table · 椅 yǐ chair', 'Easy to recognize visually — looks like a tree with branches and roots.', null, [ACT.radicals]),
    createContentItem('心', 'xīn (heart)', 'Heart; appears either as 心 at the bottom or as 忄 (the "vertical heart") on the left. Signals emotions, mental states, or thinking.', 'word', '想 xiǎng think · 怕 pà fear · 忙 máng busy · 怀 huái cherish', 'Two forms (心 and 忄) with the same meaning — both signal "emotion" or "mind".', null, [ACT.radicals]),
    createContentItem('口', 'kǒu (mouth)', 'A mouth; appears as the full 口 anywhere in the character. Signals meanings related to mouth, speech, eating, or openings.', 'word', '吃 chī eat · 喝 hē drink · 叫 jiào call · 唱 chàng sing', 'Easy to spot — a clean square shape.', null, [ACT.radicals]),
    createContentItem('言 / 讠', 'yán (speech)', 'Speech or language; appears as 言 on its own or as 讠 (the "speech" radical) on the left in Simplified characters. Signals meanings related to language, speaking, or writing.', 'word', '语 yǔ language · 说 shuō say · 话 huà speech · 谢 xiè thank', 'Simplified Chinese uses 讠; Traditional uses 言.', null, [ACT.radicals]),
    createContentItem('女', 'nǚ (woman)', 'A woman; appears on the left or as a component. Signals meanings related to female people, family roles, or relationships.', 'word', '妈 mā mother · 姐 jiě elder sister · 好 hǎo good · 嫁 jià marry (of a woman)', 'Some character compositions (like 好 = woman + child = "good") reflect ancient Chinese cultural concepts.', null, [ACT.radicals]),
    createContentItem('火 / 灬', 'huǒ (fire)', 'Fire; appears as 火 on the left or as 灬 (four dots) on the bottom. Signals heat, fire, cooking, or burning.', 'word', '热 rè hot · 烧 shāo burn · 煮 zhǔ boil · 灯 dēng lamp', 'The bottom-form 灬 looks like four flame dots; both forms mean fire.', null, [ACT.radicals]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Stroke Order
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '基本笔顺规则',
      'jīběn bǐshùn guīzé',
      'Basic stroke-order rules: write top before bottom, left before right, horizontal before vertical, outside before inside, and close the enclosing box last. These rules apply to most characters.',
      'word',
      '十 (shí, ten): horizontal stroke first, then vertical stroke through it.',
      'Correct stroke order matters for handwriting recognition and for muscle memory when writing fast.',
      [
        { target: 'top → bottom', note: 'upper strokes are written before lower ones' },
        { target: 'left → right', note: 'left strokes are written before right ones' },
        { target: 'horizontal → vertical', note: 'horizontals usually precede verticals at the same crossing' },
        { target: 'outside → inside, then close', note: 'box characters: write the three outer sides, fill the inside, then close the bottom' },
      ],
      [ACT.strokeOrder],
    ),
    createContentItem(
      '你的笔顺',
      'nǐ de bǐshùn',
      'Stroke order for 你 (nǐ, "you"): write the 亻 radical first (a slanted stroke then a vertical), then the right component 尔 in five strokes for a total of seven.',
      'word',
      '你 = 亻 (2 strokes: 撇 piě, 竖 shù) + 尔 (5 strokes: 撇 piě, 横 héng, 竖 shù, 撇 piě, 点 diǎn)',
      'Build muscle memory by tracing this character three times following the order.',
      null,
      [ACT.strokeOrder],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Simplified vs Traditional
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '简体字',
      'jiǎntǐzì',
      'Simplified Chinese characters: introduced in the 1950s in Mainland China to increase literacy by reducing the number of strokes in common characters. Used officially in Mainland China and Singapore.',
      'word',
      '国 (Simplified) — replaces 國 (Traditional); 3 fewer strokes',
      'About 2,000 characters were simplified; the rest remain unchanged.',
      null,
      [ACT.simplifiedTraditional],
    ),
    createContentItem(
      '繁体字',
      'fántǐzì',
      'Traditional Chinese characters: the historical form, still used in Taiwan, Hong Kong, and Macau. Often more visually rich and etymologically transparent than the simplified forms.',
      'word',
      '國 (Traditional) — preserves the "jade" 玉 inside the border',
      'For learners targeting Mainland use, focus on Simplified; for Taiwan or HK, Traditional.',
      null,
      [ACT.simplifiedTraditional],
    ),
    createContentItem(
      '简繁对照',
      'jiǎn fán duìzhào',
      'Common simplified/traditional pairs. The simplified form is usually faster to write but loses some etymological information present in the traditional form.',
      'sentence',
      '国/國 (country) · 学/學 (study) · 龙/龍 (dragon) · 听/聽 (listen) · 爱/愛 (love)',
      'About 2,000 characters differ; the rest are identical in both systems.',
      [
        { target: '国 / 國', note: 'country — Simplified vs Traditional' },
        { target: '学 / 學', note: 'study — Simplified vs Traditional' },
        { target: '龙 / 龍', note: 'dragon — Simplified vs Traditional' },
        { target: '听 / 聽', note: 'listen — Simplified vs Traditional' },
        { target: '爱 / 愛', note: 'love — Simplified removes the "heart" 心 in the middle, a frequent criticism of the simplification' },
      ],
      [ACT.simplifiedTraditional],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Reading Practice
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '完整朗读',
      'wánzhěng lǎngdú',
      'A complete sentence exercising every Foundation rule: tones, sandhi, initials, finals, and Hanzi recognition. Reading it fluently means every rule has clicked.',
      'sentence',
      '"你好！我叫莎拉，我是清华的学生。"\nPinyin: "Nǐ hǎo! Wǒ jiào Shālā, wǒ shì Qīnghuá de xuéshēng."',
      'Identify each tone, the third-tone sandhi in 你好, and the breath group boundaries.',
      [
        { target: '你好 nǐ hǎo → spoken ní hǎo', note: 'third-tone sandhi — first 你 rises to second tone' },
        { target: '我 wǒ', note: 'third tone — said at the end of its breath group, keeps full dip-and-rise' },
        { target: '叫 jiào', note: 'fourth tone — sharp falling, "call (oneself)"' },
        { target: '莎拉 Shālā', note: 'transliteration of "Sarah"; two first tones held high and level' },
        { target: '是 shì', note: 'fourth tone copula — "to be"' },
        { target: '清华 Qīnghuá', note: 'short name for Tsinghua University, China\'s top tech school — qīng is first tone (high level), huá is second tone (rising); a clear contrast useful for tone drilling' },
        { target: '的 de', note: 'neutral-tone particle marking possession or attribution' },
        { target: '学生 xuéshēng', note: '"student" — second tone + first tone' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '识别声调',
      'shíbié shēngdiào',
      'Identify the tone of every syllable in the reading sentence. Marking tones correctly is the test of Foundation mastery; once you can hear and label every tone, you can move to Unit 1.',
      'sentence',
      'Nǐ hǎo · Wǒ jiào Shālā · wǒ shì Qīnghuá de xuéshēng',
      'Answer: 3+3 → sandhi to 2+3 (你好), 3+4+1+1 (我叫莎拉), 3+4+1+2+0+2+1 (我是清华的学生 — neutral tone on 的).',
      null,
      [ACT.reading],
    ),
    createContentItem(
      '挑战 — 节奏朗读',
      'tiǎozhàn — jiézòu lǎngdú',
      'Stretch goal: read the sentence at conversational speed with correct tones, sandhi, and natural prosody. Mandarin has its own rhythm — neutral-tone particles fade, full-tone syllables ride the beat.',
      'sentence',
      'BEAT: Ní hǎo · wǒ JIÀO Shālā · wǒ SHÌ Qīnghuá de XUÉSHENG',
      'Stress falls on the content words (jiào, shì, xuésheng); the particle 的 (de) reduces; the rhythm is steady.',
      null,
      [ACT.reading],
    ),
  ],
};

module.exports = level1Foundation;
