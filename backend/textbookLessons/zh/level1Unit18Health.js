// Level 1 Unit 18 — Health & Medical (Mandarin Chinese)
// Functions: naming body parts, describing symptoms, talking to a doctor at
// the campus infirmary, taking medicine, asking and receiving advice about
// what you should or shouldn't do while recovering.
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
  orientation: 'zh-l1u18-orientation',
  pronunciation: 'zh-l1u18-pronunciation',
  vocabularyBody: 'zh-l1u18-vocab-body',
  vocabularySymptoms: 'zh-l1u18-vocab-symptoms',
  grammarPain: 'zh-l1u18-grammar-pain',
  grammarFeel: 'zh-l1u18-grammar-feel',
  grammarShould: 'zh-l1u18-grammar-should',
  reading: 'zh-l1u18-reading',
  listening: 'zh-l1u18-listening',
  writing: 'zh-l1u18-writing',
  culture: 'zh-l1u18-culture',
  task: 'zh-l1u18-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Name 15+ body parts and describe pain in any of them using the body-part + 疼 pattern that needs no "have" verb.',
      'Describe four to six common cold-and-flu symptoms (发烧, 咳嗽, 流鼻涕, 嗓子疼, 头疼, 难受) the way a Chinese patient describes them to a doctor.',
      'Follow doctor\'s instructions delivered with 应该 / 不应该 (should / shouldn\'t) and respond to 多 + V advice (多喝水, 多休息, 多睡觉).',
    ],
    task: 'Picture waking up in your Tsinghua dorm with a sore throat and a low fever — you walk over to the 校医院 (campus infirmary), describe your symptoms, follow the doctor\'s advice, and ask one practical question about what you may or may not do while recovering.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in this lesson',
    goals: [
      'Pronounce 疼 (téng) cleanly — second tone, rising — and distinguish it from 痛 (tòng, fourth tone) which is the more formal/medical-writing variant of the same meaning.',
      'Hit both first tones of 应该 (yīnggāi) at the same high level — a falling pitch on either syllable turns it into a different word and breaks the "should" advice pattern.',
      'Manage the second-tone-plus-fourth-tone rhythm in 难受 (nánshòu), 觉得 (juéde, second + neutral), and 咳嗽 (késou, second + neutral) — three of the highest-frequency illness words.',
    ],
    task: 'Read each example aloud, identify the tone pattern, then say it again at conversational speed without flattening the contour.',
  },
  {
    id: ACT.vocabularyBody,
    section: 'Vocabulary I',
    title: 'Body parts from head to foot',
    goals: [
      'Name 15 body parts covering the head (头, 眼睛, 耳朵, 鼻子, 嘴, 牙), upper body (脖子, 肩膀, 胳膊, 手, 背), lower body (腿, 脚), and inner organs (胃, 心) — enough to point to anywhere a doctor would ask about.',
      'Notice the two-syllable pattern that dominates body-part vocabulary (眼睛 yǎnjing, 耳朵 ěrduo, 鼻子 bízi, 肩膀 jiānbǎng) — many of these compounds drop the second syllable\'s tone to neutral.',
    ],
    task: 'Touch each body part as you say its Mandarin name aloud; then pair five of them with 疼 to form a complete "X hurts" sentence.',
  },
  {
    id: ACT.vocabularySymptoms,
    section: 'Vocabulary II',
    title: 'Symptoms, illnesses, and medical actions',
    goals: [
      'Describe the eight most common cold-and-flu symptoms a Chinese patient brings to a clinic: 发烧, 咳嗽, 感冒, 流鼻涕, 嗓子疼, 头疼, 肚子疼, 难受.',
      'Pair the right medical action verb with each scenario: 看医生 (see a doctor), 吃药 (take medicine), 量体温 (take temperature), 打针 (get a shot), 休息 (rest), 多喝水 (drink lots of water).',
    ],
    task: 'For each of three symptoms, say one sentence describing the symptom and one sentence describing what action you should take.',
  },
  {
    id: ACT.grammarPain,
    section: 'Grammar I',
    title: 'Body part + 疼 — no "have" verb needed',
    goals: [
      'Form pain sentences directly with body-part + 疼: 我头疼 (literally "I head-hurt" = "I have a headache"). There is NO 有 ("have") and NO 是 ("am") — the body part itself takes the verb.',
      'Use 我的头疼 vs 我头疼 — both are grammatical; the version without 的 is more idiomatic and warmer, exactly like 我妈妈 vs 我的妈妈.',
      'Add intensity adverbs before 疼: 很 (quite), 非常 (very), 有点 (a bit), 一直 (continuously). Position is fixed: subject + body-part + intensity adverb + 疼.',
    ],
    task: 'Describe pain in three different body parts; for each one, say the sentence twice — once with 很 and once with 有点 — to feel the intensity difference.',
  },
  {
    id: ACT.grammarFeel,
    section: 'Grammar II',
    title: '觉得 + adjective — "feel" + state',
    goals: [
      'Use 觉得 (juéde) before an adjective phrase to describe an internal state: 我觉得不舒服 ("I feel unwell"). 觉得 cannot take a noun directly — the slot after it is an adjective or a clause.',
      'Distinguish 觉得 + adjective ("feel [state]") from 觉得 + clause ("think that [statement]"): 我觉得难受 = "I feel awful"; 我觉得他生病了 = "I think he is sick".',
      'Combine 觉得 with the most common illness adjectives: 不舒服 (unwell), 难受 (miserable/awful), 累 (tired), 冷 (cold), 热 (hot).',
    ],
    task: 'Describe your current physical state in three sentences using 觉得; make sure at least one of them uses an illness adjective and one uses a temperature adjective.',
  },
  {
    id: ACT.grammarShould,
    section: 'Grammar III',
    title: '应该 / 不应该 + V — should / shouldn\'t',
    goals: [
      'Use 应该 (yīnggāi) before any verb to give or receive medical advice: 你应该多休息 ("you should rest more"). Negation goes BEFORE 应该: 不应该 (shouldn\'t).',
      'Combine 应该 with the 多 + V pattern (do more of …) for the most common cold-recovery advice: 应该多喝水, 应该多休息, 应该多睡觉.',
      'Distinguish 应该 ("should" — advice/expectation) from 要 ("need to" — necessity) and 必须 ("must" — strong obligation). A doctor giving advice uses 应该; a doctor laying down a rule uses 要 or 必须.',
    ],
    task: 'Roleplay a doctor giving four pieces of advice to a cold patient: two with 应该 + V (positive) and two with 不应该 + V (prohibition).',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'Read a doctor\'s note from the Tsinghua infirmary',
    goals: [
      'Read a 校医院 (campus infirmary) doctor\'s note aloud with correct tones and recognize the standard structure: diagnosis (诊断), prescription (处方), dosage (用法), notes (注意事项).',
      'Answer comprehension questions about the diagnosis, the number of pills per day, and the prohibitions in short sentences using 应该 / 不应该.',
    ],
    task: 'Read the note aloud once, then answer four comprehension questions about diagnosis, dosage, and the doctor\'s advice.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'A consultation at the Tsinghua infirmary',
    goals: [
      'Follow a 6-turn doctor-patient dialogue that covers symptom description (头疼, 嗓子疼, 发烧), the doctor\'s diagnosis (感冒), and 应该 / 不应该 advice.',
      'Reproduce the dialogue with your own symptoms, swapping in different body parts and a different lifestyle question (coffee, running, swimming) using 我可以…吗?.',
    ],
    task: 'Read the dialogue along with the AI tutor first, then perform it again with your own symptoms and one lifestyle question swapped in.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Write a symptom note for the doctor',
    goals: [
      'Write 3–5 sentences in Hanzi describing when the symptoms started, what hurts, and one question for the doctor about activities while recovering.',
      'Use the body-part + 疼 pattern at least twice, 觉得 + adjective at least once, and 应该 / 不应该 at least once so the writing demonstrates the core grammar of this lesson.',
    ],
    task: 'Write your own symptom note in 3–5 sentences using the model on the left, then read it aloud with correct tones.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: 'Chinese medicine, 上火, and the campus infirmary',
    goals: [
      'Know the difference between 中医 (Traditional Chinese Medicine — herbs, 拔罐 cupping, 针灸 acupuncture) and 西医 (Western medicine — pharmaceuticals, IVs, surgery), and that most Chinese patients freely use both depending on the illness.',
      'Understand 上火 (shànghuǒ, "excess internal heat") — a TCM concept that many Chinese people use to explain mouth ulcers, sore throats, and acne. Western doctors typically dismiss the concept, but in Mandarin small-talk it is real and shared.',
      'Know how the Tsinghua 校医院 (campus infirmary) works: 急诊 (ER) for emergencies, 门诊 (outpatient) for everyday illness — and that most foreign students use 门诊 with the campus student health insurance.',
    ],
    task: 'Describe the flow in three short sentences: when you would use 门诊 vs 急诊, and when a Chinese friend might tell you "你上火了, 多喝水".',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'Visit to the Tsinghua infirmary — in Mandarin',
    goals: [
      'Combine everything from this lesson into one continuous infirmary visit: describe symptoms, take the doctor\'s diagnosis, follow the 应该 / 不应该 advice, and ask one practical follow-up question.',
      'Stay in role as a patient — patients use 觉得 + adjective and body-part + 疼; doctors use 应该 / 不应该 and 多 + V. Mixing the roles breaks the realism.',
    ],
    task: 'Roleplay a visit to the Tsinghua 校医院 with the AI tutor playing the doctor; aim for a 6-turn exchange ending with one polite thank-you and one practical follow-up question.',
  },
];

const lesson = {
  title: 'Level 1 · Unit 18: 我头疼 — Health, Symptoms, and the Infirmary',
  category: 'healthcare',
  difficulty: 'beginner',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'describing-symptoms', label: 'Describing symptoms', goal: 'Use body-part + 疼 and 觉得 + adjective to give a doctor a complete picture of where it hurts and how you feel overall.' },
    { id: 'receiving-medical-advice', label: 'Receiving medical advice', goal: 'Understand a doctor\'s 应该 / 不应该 + V instructions and the 多 + V recovery pattern (多喝水, 多休息).' },
    { id: 'asking-permission-recovery', label: 'Asking what you may do while recovering', goal: 'Use 我可以…吗? to ask the doctor whether you may drink coffee, run, swim, or attend class while still sick.' },
    { id: 'reporting-onset', label: 'Reporting when symptoms started', goal: 'Use 从…开始 ("starting from…") or 昨天 / 今天早上 to anchor when the symptoms began.' },
  ],
  relatedPools: ['topic-health', 'topic-body'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '本课目标',
      'běn kè mùbiāo',
      'By the end of this lesson, you can name 15+ body parts, describe pain and feverish symptoms the way a Chinese patient describes them, follow a doctor\'s 应该 / 不应该 instructions, and ask one practical lifestyle question while recovering — all in one short infirmary visit.',
      'word',
      'Functional language: 描述疼痛 miáoshù téngtòng (describe pain) · 报告症状 bàogào zhèngzhuàng (report symptoms) · 接受医嘱 jiēshòu yīzhǔ (accept doctor\'s orders) · 询问可不可以 xúnwèn kě bù kěyǐ (ask permission)',
      'These four micro-skills are the spine of any Mandarin medical encounter — once they\'re automatic, every later health topic layers on top.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      '今天的情景',
      'jīntiān de qíngjǐng',
      'You wake up in your Tsinghua dorm with a low fever, a sore throat, and a headache. You walk to the 校医院 (xiào yīyuàn, campus infirmary), describe your symptoms to the doctor, accept a prescription, and ask whether you may still attend class tomorrow.',
      'word',
      '医生: 你哪里不舒服? — 你: 我头疼，嗓子也疼，还有点发烧。',
      'A typical infirmary opening: the doctor asks "where is uncomfortable?" and you answer with one body-part + 疼 sentence and one extra symptom; mirror the structure exactly.',
      [
        { target: '哪里不舒服? nǎlǐ bù shūfu?', note: 'literal: "where is uncomfortable?"; the universal Chinese opening question from any doctor or nurse' },
        { target: '我头疼 wǒ tóu téng', note: 'body-part + 疼 pattern; needs no "have" — the body part itself takes the verb' },
        { target: '有点发烧 yǒudiǎn fāshāo', note: '"a little feverish"; 有点 softens the adjective and is more natural than 很 for self-reported mild symptoms' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '校医院 vs 大医院',
      'xiào yīyuàn vs dà yīyuàn',
      'Chinese campuses have a 校医院 (small on-campus infirmary) for everyday illness — walk-in, cheap, and the default for students. Serious cases go to a 大医院 (large city hospital) like 北京协和医院. Knowing which to choose saves both time and money.',
      'word',
      '小问题去校医院，大问题去大医院。',
      'A common student rule of thumb: head colds and sprains go to the campus infirmary; broken bones, chest pain, or a high fever go to a city hospital with full ER capacity.',
      [
        { target: '校医院 xiào yīyuàn', note: 'campus infirmary; free or near-free for enrolled students at Tsinghua, walk-in, basic outpatient care' },
        { target: '大医院 dà yīyuàn', note: 'large city hospital; full specialties and ER, but long waits and higher cost without an appointment' },
        { target: '门诊 vs 急诊', note: 'outpatient department (for normal illness) vs emergency room (for urgent cases) — both exist at the campus infirmary too' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '疼',
      'téng (2nd tone)',
      'A rising second tone — start mid pitch and glide up. Many learners flatten it into a first tone or drop it into a fourth tone; both turn the meaning ambiguous. The more formal/written variant is 痛 (tòng, fourth tone) — same meaning, different register.',
      'word',
      '头疼 tóu téng (headache) · 肚子疼 dùzi téng (stomachache)',
      'The single most important pronunciation in this lesson; every pain sentence ends with this rising tone.',
      [
        { target: '疼 (téng, 2nd, spoken)', note: 'colloquial "hurt/ache"; the everyday form patients use' },
        { target: '痛 (tòng, 4th, written)', note: 'same meaning, more formal/medical-writing variant; e.g., 头痛 in a doctor\'s note' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '应该',
      'yīnggāi (1st + 1st)',
      'Two first tones in a row — both syllables held at the same high, level pitch. Letting either syllable fall makes it sound like a question or like a different word entirely. The advice register depends on hitting both first tones cleanly.',
      'word',
      '你应该多喝水。Nǐ yīnggāi duō hē shuǐ.',
      'A standard piece of doctor\'s advice — practice the flat-flat-flat-flat-falling pitch shape of 应该多喝.',
      [
        { target: '应 (yīng, 1st)', note: 'first syllable; high level pitch, no movement' },
        { target: '该 (gāi, 1st)', note: 'second syllable; same high level pitch as 应' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '难受',
      'nánshòu (2nd + 4th)',
      'A rising 难 (nán, "difficult") followed by a sharp falling 受 (shòu). The contrast in contour — up, then sharp down — is the audible signature of this word; flattening either tone makes it merge with similar-sounding words like 男生 (nánshēng, "male student").',
      'word',
      '我觉得很难受。Wǒ juéde hěn nánshòu.',
      '"I feel awful" — the standard patient self-description; the rising-then-falling rhythm matches the meaning emotionally.',
      [
        { target: '难 (nán, 2nd)', note: 'rising tone; "difficult"' },
        { target: '受 (shòu, 4th)', note: 'sharp falling tone; "endure / receive"' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '觉得',
      'juéde (2nd + neutral)',
      'A rising 觉 (jué) followed by a light, short neutral 得 (de). The second syllable is unstressed and short — pronouncing it with a full tone (like dé) sounds robotic. Compare with the same character 得 in 必须 contexts where it takes a full tone.',
      'word',
      '我觉得不舒服。Wǒ juéde bù shūfu.',
      '"I feel unwell" — the universal opener for self-reported symptoms.',
      [
        { target: '觉 (jué, 2nd)', note: 'rising tone; "feel/sense"' },
        { target: '得 (de, neutral)', note: 'unstressed second syllable; written without a tone mark' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '咳嗽',
      'késou (2nd + neutral)',
      'A rising 咳 (ké) followed by a neutral 嗽 (sou). Both syllables share the same 口 (mouth) radical, signaling a mouth-related action. The full-tone variant késòu sounds bookish; conversational Mandarin uses késou.',
      'word',
      '我咳嗽得很厉害。Wǒ késou de hěn lìhai.',
      '"I have a really bad cough" — the 得很厉害 (de hěn lìhai) intensifier is the typical patient way to report severity.',
      [
        { target: '咳 (ké, 2nd)', note: 'rising tone; "cough" (verb root)' },
        { target: '嗽 (sou, neutral)', note: 'second syllable; light and short, no tone mark' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Body parts
    // ────────────────────────────────────────────────────────────────────
    createContentItem('头', 'tóu', 'The head — used both for the physical part and in compounds like 头发 (tóufa, "hair") and 头疼 (tóu téng, "headache"). One of the highest-frequency body-part words; almost every medical conversation includes it.', 'word', '我头疼。Wǒ tóu téng.', '"I have a headache" — body-part + 疼 with no "have" verb; the canonical Unit 18 sentence.', null, [ACT.vocabularyBody]),
    createContentItem('眼睛', 'yǎnjing', 'The eyes — the second syllable 睛 (jing) is neutral tone, NOT jīng. Used for both physical anatomy and abstract expressions like 眼睛大 (big eyes) as a feature description. Single character 眼 also appears in compounds like 眼药水 (eye drops).', 'word', '眼睛痒。Yǎnjing yǎng.', '"My eyes itch" — 痒 (yǎng) is the standard word for "itch", used the same way as 疼 (subject takes the symptom verb directly).', null, [ACT.vocabularyBody]),
    createContentItem('耳朵', 'ěrduo', 'The ears — second syllable 朵 (duo) is neutral. The base character 耳 also means "ear" alone, and the radical 耳 signals hearing-related characters like 听 (listen) and 聪 (smart, lit. "with sharp hearing").', 'word', '耳朵疼。Ěrduo téng.', '"My ear hurts" — typical earache reporting; doctor will likely ask 哪只耳朵? ("which ear?") because Mandarin requires the side specified.', null, [ACT.vocabularyBody]),
    createContentItem('鼻子', 'bízi', 'The nose — second syllable 子 (zi) is neutral, a common diminutive/nominalizer suffix. Pairs with 流鼻涕 (liú bítì, "runny nose") and 鼻塞 (bísè, "stuffy nose"), two of the most common cold symptoms.', 'word', '我流鼻涕。Wǒ liú bítì.', '"My nose is running" — uses 流 ("flow") as the verb, not 疼; not all symptoms use the 疼 pattern.', null, [ACT.vocabularyBody]),
    createContentItem('嘴', 'zuǐ', 'The mouth — third tone. The two-syllable form 嘴巴 (zuǐbā) is also common and slightly more colloquial. The radical 口 (kǒu) is a more abstract/written equivalent that appears in compounds like 口腔 (oral cavity).', 'word', '嘴里有点苦。Zuǐ lǐ yǒudiǎn kǔ.', '"My mouth tastes a bit bitter" — a common side-effect complaint after taking Chinese herbal medicine.', null, [ACT.vocabularyBody]),
    createContentItem('牙', 'yá', 'A tooth / teeth — second tone. Used in 牙疼 (toothache) and in compounds like 牙医 (yáyī, dentist) and 刷牙 (shuā yá, brush teeth). The two-syllable form 牙齿 (yáchǐ) is more anatomical/medical.', 'word', '我牙疼。Wǒ yá téng.', '"I have a toothache" — the dentist (牙医) does not work at the campus infirmary; you would be referred to a separate 口腔医院.', null, [ACT.vocabularyBody]),
    createContentItem('脖子', 'bózi', 'The neck — second syllable 子 (zi) is neutral. Includes the front (throat side) and back (cervical-spine side); for the inside-the-throat soreness of a cold, Mandarin uses 嗓子 (sǎngzi) instead.', 'word', '脖子有点僵。Bózi yǒudiǎn jiāng.', '"My neck is a bit stiff" — 僵 (jiāng, "stiff") is the typical adjective for cold-and-flu neck tension; not all symptoms use 疼.', null, [ACT.vocabularyBody]),
    createContentItem('肩膀', 'jiānbǎng', 'The shoulder — first + third tone. Used freely in both singular and plural meaning ("a shoulder" or "the shoulders"); Mandarin nouns do not mark number. The compound is also used metaphorically: 肩膀 in 担在肩膀上 (carry on one\'s shoulders).', 'word', '肩膀酸。Jiānbǎng suān.', '"My shoulder is sore" — 酸 (suān, "sore from overuse") is distinct from 疼 (sharp pain); choosing the right one signals you understand the difference.', null, [ACT.vocabularyBody]),
    createContentItem('胳膊', 'gēbo', 'The arm — second syllable 膊 (bo) is neutral. Refers to the whole arm from shoulder to wrist; the hand alone is 手 (shǒu). A typical injury report would specify 左胳膊 (left arm) or 右胳膊 (right arm).', 'word', '右胳膊很疼。Yòu gēbo hěn téng.', '"My right arm hurts a lot" — note Mandarin places 左/右 (left/right) BEFORE the body part, unlike English "right arm" which feels parallel but is reversed in compound nouns.', null, [ACT.vocabularyBody]),
    createContentItem('手', 'shǒu', 'The hand — single character, third tone. Used in dozens of compounds: 手指 (finger), 手腕 (wrist), 手心 (palm). For "hands and feet" together, the idiom 手脚 (shǒujiǎo) refers to limbs broadly.', 'word', '我手疼。Wǒ shǒu téng.', '"My hand hurts" — common after long writing/typing sessions during exam week.', null, [ACT.vocabularyBody]),
    createContentItem('腿', 'tuǐ', 'The leg — single character, third tone. Refers to the whole leg from hip to ankle; the foot alone is 脚 (jiǎo). Compounds: 大腿 (thigh), 小腿 (calf), 腿肚子 (calf, colloquial).', 'word', '腿很累。Tuǐ hěn lèi.', '"My legs are very tired" — common after walking around Tsinghua\'s huge campus; the verb is 累 (tired), not 疼.', null, [ACT.vocabularyBody]),
    createContentItem('脚', 'jiǎo', 'The foot — third tone. Distinct from 腿 (leg); a sprained ankle would specifically be 脚 territory, not 腿. The two-syllable form 脚丫 (jiǎoyā) is a very casual/childish variant.', 'word', '脚扭了。Jiǎo niǔ le.', '"I twisted my foot" — 扭 (niǔ, "twist") is the standard verb for sprains; pair with 脚 or 脚踝 (ankle).', null, [ACT.vocabularyBody]),
    createContentItem('胃', 'wèi', 'The stomach (organ) — fourth tone. Used for medical references to the actual organ: 胃疼 (stomachache from the organ), 胃炎 (gastritis), 胃口 (appetite). For the belly area more broadly, Mandarin uses 肚子 (dùzi).', 'word', '我胃不好。Wǒ wèi bù hǎo.', '"My stomach is not in good shape" — common chronic-condition self-report; 胃不好 implies long-term sensitivity, not a one-time ache.', null, [ACT.vocabularyBody]),
    createContentItem('肚子', 'dùzi', 'The belly / abdomen (general area) — second syllable 子 is neutral. Used for the everyday "tummy ache" sense: 肚子疼 (dùzi téng) covers everything from a mild ache to food poisoning, while 胃疼 is more specifically the stomach organ.', 'word', '我肚子疼。Wǒ dùzi téng.', '"My belly hurts" — the patient-friendly default; 胃疼 is what the doctor might write in the chart.', null, [ACT.vocabularyBody]),
    createContentItem('心', 'xīn', 'The heart — first tone. Used both for the physical organ (心脏 xīnzàng is the more formal/medical term) and for emotions/mind (心情 mood, 心里 in one\'s heart). The radical 心 / 忄 appears in many emotion characters like 想 (think) and 怕 (fear).', 'word', '心跳很快。Xīn tiào hěn kuài.', '"My heart is beating fast" — symptom worth reporting if it pairs with fever or weakness.', null, [ACT.vocabularyBody]),
    createContentItem('背', 'bèi', 'The back — fourth tone. Used for the whole back from shoulders to waist; for lower back specifically, Mandarin uses 腰 (yāo). Compounds: 背痛 (back pain), 后背 (the back, more anatomical).', 'word', '背很疼。Bèi hěn téng.', '"My back hurts a lot" — common after long study sessions; the campus infirmary often prescribes a heat pack and rest.', null, [ACT.vocabularyBody]),
    createContentItem('嗓子', 'sǎngzi', 'The throat (inside the neck) — second syllable 子 is neutral. Distinct from 脖子 (neck, external): cold-related soreness goes in 嗓子, not 脖子. The compound 嗓子疼 is one of the top three reported cold symptoms.', 'word', '嗓子疼。Sǎngzi téng.', '"My throat is sore" — the doctor will almost certainly diagnose 感冒 (a cold) when this appears together with 发烧.', null, [ACT.vocabularyBody]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: Symptoms & medical actions
    // ────────────────────────────────────────────────────────────────────
    createContentItem('疼', 'téng', 'To hurt / be in pain — the verb that takes a body part as its subject, NOT its object. The body part itself "does the hurting": 头疼 = "head hurts" = "I have a headache". The more formal/written variant is 痛 (tòng).', 'word', '我头疼。Wǒ tóu téng.', 'Canonical Unit 18 sentence: subject + body part + 疼. No "have" verb anywhere.', null, [ACT.vocabularySymptoms]),
    createContentItem('发烧', 'fāshāo', 'To have a fever — literally "issue heat". Used as a verb, not a noun: 我发烧 ("I have a fever"), not 我有发烧. Add intensifiers: 有点发烧 (mild), 高烧 (high fever, used as a noun: 我有高烧).', 'word', '我有点发烧。Wǒ yǒudiǎn fāshāo.', '"I\'m a bit feverish" — 有点 softens the symptom; for high fever say 我发高烧 or 我烧到三十九度 ("I burned to 39 degrees").', null, [ACT.vocabularySymptoms]),
    createContentItem('咳嗽', 'késou', 'To cough — verb-verb compound, second syllable neutral tone. Used both as a noun ("a cough") and verb ("to cough"): 我咳嗽 (I cough) and 咳嗽很厉害 (the cough is severe). Pair with 干 (gān, "dry") or 湿 (shī, "wet/productive") to specify type.', 'word', '我咳嗽。Wǒ késou.', '"I cough / I have a cough" — the same form covers both noun and verb meanings in Mandarin.', null, [ACT.vocabularySymptoms]),
    createContentItem('感冒', 'gǎnmào', 'A cold / to catch a cold — used both as a noun and a verb. 我感冒了 ("I have caught a cold" — note the change-of-state 了) is more common than 我有感冒 ("I have a cold"). The 了 marks the new state, exactly like Spanish "me he resfriado".', 'word', '我感冒了。Wǒ gǎnmào le.', '"I\'ve caught a cold" — the 了 is essential; without it, the sentence sounds like a general claim about colds.', null, [ACT.vocabularySymptoms]),
    createContentItem('流鼻涕', 'liú bítì', 'To have a runny nose — literally "flow nose-mucus". The verb is 流 (flow), not 有 (have); 我有鼻涕 sounds clinical/odd. Pair with 流 + body fluid for similar symptoms: 流眼泪 (cry), 流血 (bleed).', 'word', '我一直流鼻涕。Wǒ yìzhí liú bítì.', '"My nose has been running non-stop" — 一直 (continuously) is the standard intensifier for a persistent runny nose.', null, [ACT.vocabularySymptoms]),
    createContentItem('嗓子疼', 'sǎngzi téng', 'A sore throat — body-part + 疼 pattern with 嗓子 (throat). One of the top three cold symptoms; pair with 发烧 and 咳嗽 to complete a textbook 感冒 (cold) description. Western "throat" sometimes maps to 脖子 (external neck), but for soreness Mandarin always uses 嗓子.', 'word', '嗓子很疼，咽东西都难。Sǎngzi hěn téng, yàn dōngxi dōu nán.', '"My throat hurts a lot — even swallowing is hard" — 咽 (yàn, swallow) signals real severity to the doctor.', null, [ACT.vocabularySymptoms]),
    createContentItem('头疼', 'tóu téng', 'A headache — body-part + 疼 pattern with 头 (head). Used so frequently it functions like a single noun in casual speech; you can even say 我有点头疼 ("I have a bit of a headache") treating the whole phrase as one unit.', 'word', '我有点头疼。Wǒ yǒudiǎn tóu téng.', '"I have a slight headache" — the most common patient self-report; doctor will follow up with 哪里疼? (where exactly?) to locate the pain.', null, [ACT.vocabularySymptoms]),
    createContentItem('肚子疼', 'dùzi téng', 'A stomachache — body-part + 疼 pattern with 肚子 (belly). Covers everything from mild gas to food poisoning; the doctor will follow up with 拉肚子吗? ("diarrhea?") to narrow it down. More general/colloquial than 胃疼.', 'word', '我肚子疼，可能吃坏了。Wǒ dùzi téng, kěnéng chī huài le.', '"My belly hurts — I might have eaten something bad" — 吃坏了 ("ate badly") is the standard self-diagnosis for food-related stomachache.', null, [ACT.vocabularySymptoms]),
    createContentItem('难受', 'nánshòu', 'To feel awful / miserable — adjective, not a verb. Used with 觉得 (我觉得难受) or with 很 (我很难受). Captures whole-body misery beyond a single symptom — fever + headache + body aches combined. Distinct from 不舒服 (slightly milder, more "uncomfortable").', 'word', '我觉得很难受。Wǒ juéde hěn nánshòu.', '"I feel awful" — the universal patient summary when no single body part stands out; doctor will probe for specifics.', null, [ACT.vocabularySymptoms]),
    createContentItem('不舒服', 'bù shūfu', 'Unwell / uncomfortable — adjective, lighter than 难受. The opening sentence in most Chinese medical visits is the doctor asking 哪里不舒服? ("where is uncomfortable?"). Implies discomfort, not severe pain.', 'word', '我有点不舒服。Wǒ yǒudiǎn bù shūfu.', '"I\'m a bit unwell" — the polite, understated self-report; common as the first thing said when registering at the front desk.', null, [ACT.vocabularySymptoms]),
    createContentItem('医生', 'yīshēng', 'A doctor — used as both a job title and a form of address (李医生 = "Doctor Li"). Common alternative term is 大夫 (dàifu), more colloquial and Northern Chinese. The campus infirmary uses 校医 (xiào yī) as a job-specific variant.', 'word', '李医生，您好。Lǐ yīshēng, nín hǎo.', '"Hello, Doctor Li" — family-name + title is the standard form of address; using 您 (formal you) is appropriate with all medical staff.', null, [ACT.vocabularySymptoms]),
    createContentItem('看医生', 'kàn yīshēng', 'To see a doctor — verb-object phrase. The verb 看 (look) is fixed; you cannot say 见医生 in this idiom. Alternative: 看病 (kàn bìng, "see-illness", "go for a medical visit") — the more general/colloquial form.', 'word', '我应该看医生。Wǒ yīnggāi kàn yīshēng.', '"I should see a doctor" — Grammar III application combining 应该 + verb phrase.', null, [ACT.vocabularySymptoms]),
    createContentItem('吃药', 'chī yào', 'To take medicine — literally "eat medicine". The verb 吃 (eat) covers pills, capsules, and tablets; for liquid medicine use 喝药 (drink medicine); for injections use 打针 (get a shot). Different verbs for different delivery methods.', 'word', '一天吃三次药。Yī tiān chī sān cì yào.', '"Take medicine three times a day" — the standard dosage phrasing; 一天 (per day) + 几次 (how many times) is the universal frequency pattern.', null, [ACT.vocabularySymptoms]),
    createContentItem('量体温', 'liáng tǐwēn', 'To take one\'s temperature — verb 量 (measure) + noun 体温 (body temperature). Used by both medical staff and parents at home. Fever threshold in Chinese medicine: 38°C (一百度 Fahrenheit equivalent feel) is generally when 发烧 starts being used clinically.', 'word', '医生给我量了体温。Yīshēng gěi wǒ liáng le tǐwēn.', '"The doctor took my temperature" — passive-construction equivalent built with 给 (gěi, "for/to"); a common medical-encounter sentence.', null, [ACT.vocabularySymptoms]),
    createContentItem('打针', 'dǎ zhēn', 'To get an injection / shot — literally "strike needle". Verb-object structure: the verb is 打, the object is 针. Both for vaccines (打疫苗) and for IV/injection medicine. Many Chinese clinics still use IV drips (输液 shū yè) for stronger illnesses, which Western clinics rarely do.', 'word', '感冒不用打针，吃药就行。Gǎnmào búyòng dǎ zhēn, chī yào jiù xíng.', '"For a cold you don\'t need an injection — medicine alone is fine" — a doctor reassuring a worried patient.', null, [ACT.vocabularySymptoms]),
    createContentItem('休息', 'xiūxi', 'To rest — verb, second syllable neutral tone. Used for any kind of rest: sleeping, lying down, taking a break from work or school. The most common medical advice verb after 多 (more): 多休息 ("rest more") appears in virtually every doctor\'s instructions.', 'word', '你应该多休息。Nǐ yīnggāi duō xiūxi.', '"You should rest more" — the canonical doctor\'s advice sentence; 多 + V is the high-frequency recovery pattern.', null, [ACT.vocabularySymptoms]),
    createContentItem('多喝水', 'duō hē shuǐ', 'Drink lots of water — 多 (more) + 喝 (drink) + 水 (water). The single most common piece of advice from any Chinese doctor, parent, or friend when you mention you\'re unwell. Also functions as a casual expression of care, like English "stay hydrated".', 'word', '你应该多喝水，多休息。Nǐ yīnggāi duō hē shuǐ, duō xiūxi.', '"You should drink lots of water and rest" — the universal two-piece advice combo; you will hear this in almost every Mandarin health conversation.', null, [ACT.vocabularySymptoms]),
    createContentItem('药', 'yào', 'Medicine / drug — single character, fourth tone. Covers everything from cold tablets to herbal remedies. Compounds: 药店 (pharmacy), 药方 (prescription), 中药 (traditional Chinese medicine), 西药 (Western medicine).', 'word', '这种药一天吃两次。Zhè zhǒng yào yī tiān chī liǎng cì.', '"Take this kind of medicine twice a day" — the standard pharmacist instruction; 这种 (this kind of) marks the specific medicine.', null, [ACT.vocabularySymptoms]),
    createContentItem('处方', 'chǔfāng', 'A prescription — used in formal/written contexts; the colloquial alternative is 药方 (yàofāng). At the campus infirmary, the doctor writes a 处方 and you pick up the medicine at the on-site 药房 (pharmacy counter).', 'word', '医生给我开了处方。Yīshēng gěi wǒ kāi le chǔfāng.', '"The doctor wrote me a prescription" — the verb is 开 (lit. "open"), the standard medical-paperwork verb in Mandarin.', null, [ACT.vocabularySymptoms]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar I: Body part + 疼
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'X 疼 pattern',
      'X téng — body part hurts',
      'CRITICAL PATTERN: in Mandarin, to say "I have a headache", you do NOT use "have" — the body part itself takes the verb 疼. Structure: subject + body-part + 疼. 我头疼 = literally "I head-hurts" = English "I have a headache".',
      'sentence',
      '我头疼。Wǒ tóu téng. ("I have a headache" — lit. "I head-hurts")',
      'No 有 ("have"), no 是 ("am") — the body part itself is the subject of 疼. This is one of the biggest English-speaker traps in medical Mandarin.',
      [
        { target: '我 + 头 + 疼', note: 'pronoun-topic + body-part-subject + verb 疼; both pronouns can stack as topic + subject' },
        { target: 'NOT 我有头疼 ✗', note: 'wrong; do NOT use 有 ("have") with body-part + 疼 — that is direct translation from English' },
        { target: 'NOT 我是头疼 ✗', note: 'wrong; do NOT use 是 ("am") either — 疼 already does the verb work' },
      ],
      [ACT.grammarPain],
    ),
    createContentItem(
      '我的 X 疼 vs 我 X 疼',
      'wǒ de X téng vs wǒ X téng',
      'Both 我的头疼 ("my head hurts") and 我头疼 (literally "I head-hurts") are grammatical, but the version without 的 is warmer and more idiomatic — the same effect as 我妈妈 vs 我的妈妈 from Unit 1. Native speakers default to no 的 for body parts.',
      'sentence',
      '我头疼。 (idiomatic, warm)\n我的头疼。 (grammatical, slightly formal/contrastive)',
      'Drop 的 for body parts you "own" the way you own family — they are intimately yours and don\'t need the possessive marker.',
      [
        { target: '我头疼 (no 的)', note: 'the everyday warm form; what natives actually say' },
        { target: '我的头疼 (with 的)', note: 'grammatical but slightly formal/contrastive — implies "my head specifically (not yours)"' },
      ],
      [ACT.grammarPain],
    ),
    createContentItem(
      'Intensity adverbs',
      'how much it hurts',
      'Add an intensity adverb BEFORE 疼: 很 (quite/very, default), 非常 (extremely), 有点 (a bit, softens), 一直 (continuously). Word order is fixed: subject + body-part + adverb + 疼.',
      'sentence',
      '我头很疼。Wǒ tóu hěn téng. ("My head hurts a lot")\n我头有点疼。Wǒ tóu yǒudiǎn téng. ("My head hurts a bit")',
      'Mandarin adjective sentences usually require some adverb in front of the adjective — bare 我头疼 in writing often gets a 很 added in speech.',
      [
        { target: '很 + 疼', note: 'default intensifier; "quite hurts / hurts a lot" — note 很 is grammatically required in many adjective sentences but light in meaning' },
        { target: '非常 + 疼', note: 'strong; "extremely hurts" — reserve for real severity' },
        { target: '有点 + 疼', note: 'softener; "hurts a bit" — used to downplay self-reported symptoms politely' },
        { target: '一直 + 疼', note: 'continuous; "keeps hurting" — useful for symptoms that won\'t go away' },
      ],
      [ACT.grammarPain],
    ),
    createContentItem(
      'Multiple body parts with 也',
      'also — second symptom',
      'To add a second hurting body part, use 也 (yě, "also") BEFORE the verb 疼: 我头疼，嗓子也疼 ("My head hurts, and my throat also hurts"). 也 always comes before the verb, never at the end like English "also/too".',
      'sentence',
      '我头疼，嗓子也疼。Wǒ tóu téng, sǎngzi yě téng.',
      'A natural symptom-stacking pattern; the doctor will hear this and immediately suspect 感冒 (a cold).',
      [
        { target: '也 + verb', note: 'placement is BEFORE the verb, never at sentence-end like English' },
        { target: '嗓子也疼', note: 'fragment with 也 — the subject of the second clause; complete only because 嗓子 is understood from context' },
      ],
      [ACT.grammarPain],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar II: 觉得 + adjective
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '觉得 + adjective',
      'juéde + adjective — "feel" + state',
      'Use 觉得 (juéde) before an adjective phrase to describe how you feel — internal state, not external observation. 我觉得不舒服 ("I feel unwell") is the classic medical self-report. 觉得 takes an adjective or a clause AFTER it; it does NOT take a noun directly.',
      'sentence',
      '我觉得不舒服。Wǒ juéde bù shūfu. ("I feel unwell")\n我觉得很难受。Wǒ juéde hěn nánshòu. ("I feel awful")',
      'The universal sentence opener for self-reported symptoms; expect to use it in every medical encounter.',
      [
        { target: '我觉得 + adjective', note: 'pattern for physical/emotional state — internal subjective experience' },
        { target: '我觉得 + 不舒服', note: '"I feel unwell"; the safe, polite opener at any clinic' },
        { target: '我觉得 + 很难受', note: '"I feel awful"; stronger, suggests multi-symptom misery' },
      ],
      [ACT.grammarFeel],
    ),
    createContentItem(
      '觉得 + clause',
      'juéde + clause — "think / believe"',
      'When followed by a full clause (subject + verb), 觉得 means "think" or "believe" — not "feel" physically. 我觉得他生病了 = "I think he is sick". Same word, two meanings; the structure after 觉得 tells you which.',
      'sentence',
      '我觉得我感冒了。Wǒ juéde wǒ gǎnmào le. ("I think I\'ve caught a cold" — clause)\nvs 我觉得不舒服。 ("I feel unwell" — adjective)',
      'The clause-vs-adjective distinction is what flips the meaning; English uses two different verbs ("feel" vs "think") where Mandarin uses one.',
      [
        { target: '觉得 + adjective → "feel"', note: 'physical sensation; followed by a state word (不舒服, 难受, 累)' },
        { target: '觉得 + clause → "think"', note: 'belief/opinion; followed by a full sentence (我感冒了, 他生病了)' },
      ],
      [ACT.grammarFeel],
    ),
    createContentItem(
      'Common illness adjectives',
      'state words with 觉得',
      'The most useful state words to follow 觉得 in a medical context: 不舒服 (unwell), 难受 (awful), 累 (tired), 头晕 (dizzy), 没力气 (weak / no energy), 冷 (cold), 热 (hot).',
      'sentence',
      '我觉得头晕。Wǒ juéde tóu yūn. ("I feel dizzy")\n我觉得没力气。Wǒ juéde méi lìqi. ("I feel weak / I have no energy")',
      'Practice rotating through these adjectives — they cover the symptom space the body-part + 疼 pattern doesn\'t reach (whole-body feelings, not localized pain).',
      [
        { target: '不舒服 bù shūfu', note: 'mild general discomfort; the safe opening word' },
        { target: '难受 nánshòu', note: 'severe whole-body misery; multi-symptom' },
        { target: '累 lèi', note: 'tired/exhausted; common with fever or after exertion' },
        { target: '头晕 tóu yūn', note: 'dizzy; specific symptom, but takes 觉得 not 疼' },
        { target: '没力气 méi lìqi', note: 'weak / no energy; very common cold symptom' },
      ],
      [ACT.grammarFeel],
    ),
    createContentItem(
      '从…开始',
      'cóng…kāishǐ — starting from…',
      'To report when symptoms started, use 从 (from) + time + 开始 (start). 从昨天开始 = "starting from yesterday". Combines naturally with 觉得 sentences: 我从昨天开始觉得不舒服 ("I\'ve felt unwell since yesterday").',
      'sentence',
      '我从昨天开始觉得不舒服。Wǒ cóng zuótiān kāishǐ juéde bù shūfu.',
      'Word order: 从 + time + 开始 comes BEFORE the verb phrase, not after — opposite of English "since yesterday" which comes at the end.',
      [
        { target: '从昨天开始', note: '"starting from yesterday"; standard onset marker for symptoms' },
        { target: '从今天早上开始', note: '"starting from this morning"; for symptoms that began today' },
        { target: '从上周开始', note: '"starting from last week"; for chronic or lingering symptoms' },
      ],
      [ACT.grammarFeel],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar III: 应该 / 不应该
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '应该 + V',
      'yīnggāi + V — should',
      'Place 应该 (yīnggāi) directly BEFORE a verb to express "should". 你应该多休息 ("you should rest more"). The full negation is 不应该 (shouldn\'t) — 不 goes BEFORE 应该, not between 应该 and the verb.',
      'sentence',
      '你应该多休息。Nǐ yīnggāi duō xiūxi. ("You should rest more")\n你不应该出去。Nǐ bù yīnggāi chūqù. ("You shouldn\'t go out")',
      'The universal modal verb for advice in Mandarin; doctors, parents, and friends all use it constantly.',
      [
        { target: '应该 + V', note: 'positive advice; "should do…"' },
        { target: '不应该 + V', note: 'negative advice; "shouldn\'t do…" — 不 attaches BEFORE 应该' },
        { target: 'NOT 应该不 ✗', note: 'wrong order; would sound like a broken sentence' },
      ],
      [ACT.grammarShould],
    ),
    createContentItem(
      '多 + V — do more of…',
      'duō + V advice pattern',
      'The standard Mandarin recovery-advice pattern: 多 (more) + Verb. 多喝水 ("drink lots of water"), 多休息 ("rest more"), 多睡觉 ("sleep more"). 多 is placed directly before the verb. Pair with 应该 for full advice: 应该多 + V.',
      'sentence',
      '应该多喝水。Yīnggāi duō hē shuǐ. ("You should drink lots of water")\n应该多睡觉。Yīnggāi duō shuì jiào. ("You should sleep more")',
      'The single most common Chinese piece of medical advice; expect to hear 多喝水 dozens of times during any illness.',
      [
        { target: '多喝水', note: '"drink lots of water"; the universal advice' },
        { target: '多休息', note: '"rest more"; second most common doctor sentence' },
        { target: '多睡觉', note: '"sleep more"; common in addition to 多休息' },
        { target: '少 + V (opposite)', note: '"do less of…"; e.g., 少吃辣的 ("eat less spicy food")' },
      ],
      [ACT.grammarShould],
    ),
    createContentItem(
      '应该 vs 要 vs 必须',
      'should / need to / must',
      'Three modal verbs of increasing strength. 应该 = "should" (advice/expectation, can be ignored). 要 = "need to / want to" (necessity, stronger). 必须 = "must" (strong obligation, cannot be ignored). A doctor giving friendly advice uses 应该; laying down a rule uses 要 or 必须.',
      'sentence',
      '你应该多休息。(advice; you can choose not to)\n你要按时吃药。(necessity; standard instruction)\n你必须先量体温。(strict; cannot skip)',
      'Picking the right modal signals how serious the speaker is; mixing them up makes advice sound either preachy (using 必须 for casual things) or weak (using 应该 for mandatory steps).',
      [
        { target: '应该 yīnggāi', note: 'should; advice or expectation, not a rule' },
        { target: '要 yào', note: 'need to; necessity, stronger than 应该' },
        { target: '必须 bìxū', note: 'must; strict obligation, no flexibility' },
      ],
      [ACT.grammarShould],
    ),
    createContentItem(
      '可以…吗?',
      'kěyǐ…ma — may I…?',
      'To ask permission, use 可以 (kěyǐ, "may/can") + V + 吗?. 我可以喝咖啡吗? ("May I drink coffee?"). Reply 可以 (yes, you may) or 不可以 (no, you may not). The doctor-patient permission exchange is the heart of Activity 9 listening practice.',
      'sentence',
      '我可以喝咖啡吗? Wǒ kěyǐ hē kāfēi ma? ("May I drink coffee?")\n— 不可以，应该喝水。 ("No, you should drink water.")',
      'The standard polite permission pattern; pair with the 不应该 reply to form a complete advice exchange.',
      [
        { target: '可以 + V + 吗?', note: 'permission question; verb stays in normal position' },
        { target: 'Yes reply: 可以', note: 'short positive; can also expand to 可以的 (more reassuring)' },
        { target: 'No reply: 不可以', note: 'short negative; can soften to 最好不要 ("better not")' },
      ],
      [ACT.grammarShould],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '校医院处方',
      'xiào yīyuàn chǔfāng',
      'A complete prescription note from the Tsinghua 校医院 (campus infirmary). Read it aloud with correct tones and recognize the standard four-part structure: patient + diagnosis + prescription + notes/warnings. The doctor\'s handwriting and abbreviations make Chinese medical notes a real reading challenge.',
      'sentence',
      '患者: 莎拉 (清华大学留学生)\n诊断: 感冒\n处方: 感冒清热颗粒 三天 / 一天三次 / 一次一袋 / 饭后服用\n注意事项: 1) 多喝水。2) 多休息。3) 不应该喝咖啡。4) 不应该剧烈运动。5) 三天后还不好，应该来复诊。',
      'Translation: "Patient: Sarah (Tsinghua University international student). Diagnosis: cold. Prescription: cold-clearing granules, 3 days, 3x daily, 1 packet per dose, after meals. Notes: 1) drink lots of water; 2) rest more; 3) shouldn\'t drink coffee; 4) shouldn\'t do strenuous exercise; 5) if not better in 3 days, return for a follow-up."',
      [
        { target: '患者 huànzhě', note: '"patient"; formal medical term — colloquial alternative is 病人 (bìngrén)' },
        { target: '诊断 zhěnduàn', note: '"diagnosis"; the doctor\'s identification of the illness' },
        { target: '处方 chǔfāng', note: '"prescription"; the formal written instruction for medication' },
        { target: '感冒清热颗粒', note: '"cold-clearing granules"; a common Chinese-medicine cold remedy sold in single-dose packets' },
        { target: '饭后服用 fàn hòu fúyòng', note: '"take after meals"; 服用 (take medicine) is the formal verb, equivalent to colloquial 吃' },
        { target: '注意事项 zhùyì shìxiàng', note: '"things to pay attention to"; the doctor\'s do-and-don\'t list' },
        { target: '复诊 fùzhěn', note: '"follow-up visit"; standard medical term — return for re-examination' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '理解问题',
      'lǐjiě wèntí',
      'Four standard comprehension questions matching the prescription. Answer each in a short sentence using complete grammar from this lesson — 应该 / 不应该, body-part + 疼 if relevant, or short noun-phrase answers for direct factual questions.',
      'sentence',
      'Q1: 莎拉的诊断是什么?\nQ2: 一天吃几次药?\nQ3: 莎拉应该做什么? (两个)\nQ4: 莎拉不应该做什么? (两个)',
      'One factual, one numerical, two grammar-application — covering all the patterns from Activities 5–7.',
      [
        { target: 'A1: 她的诊断是感冒。', note: '"Her diagnosis is a cold" — direct noun-phrase answer' },
        { target: 'A2: 一天吃三次。', note: '"3 times a day" — number + 次 (occurrences) is the standard frequency form' },
        { target: 'A3: 她应该多喝水，应该多休息。', note: 'two positive advice clauses chained — applies Grammar III directly' },
        { target: 'A4: 她不应该喝咖啡，也不应该剧烈运动。', note: 'two negative advice clauses with 也 to chain — combines Grammar III and the 也 pattern from Activity 5' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Listening & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '校医院看病 (对话)',
      'xiào yīyuàn kàn bìng (duìhuà)',
      'A natural 8-turn doctor-patient dialogue at the Tsinghua 校医院. Covers all the patterns from this lesson: symptom description (body-part + 疼, 觉得 + adjective), onset reporting (从…开始), diagnosis, and 应该 / 不应该 advice.',
      'conversation',
      '医生: 你好，哪里不舒服?\n莎拉: 医生您好。我头疼，嗓子也疼，还有点发烧。\n医生: 从什么时候开始的?\n莎拉: 从昨天晚上开始。我觉得很难受，没力气。\n医生: 我给你量一下体温。…三十八度二，有点烧。是感冒了。\n莎拉: 严重吗? 我可以去上课吗?\n医生: 不严重，是普通感冒。今天不应该去上课，应该回宿舍休息。多喝水，多睡觉。\n莎拉: 我可以喝咖啡吗?\n医生: 最好不要。喝白开水或者热茶。三天的药，一天三次，饭后吃。\n莎拉: 好的，谢谢医生。\n医生: 三天后还不好就来复诊。',
      'A natural infirmary visit in polite register — the default doctor-student interaction. Notice the doctor uses 多 + V four times and 应该/不应该 twice; the patient uses 觉得 + adjective and body-part + 疼 to layer symptoms.',
      [
        { target: '哪里不舒服?', note: 'doctor\'s standard opening question; equivalent to English "what brings you in?"' },
        { target: '从什么时候开始的?', note: 'doctor\'s onset question; uses the same 从…开始 pattern from Grammar II' },
        { target: '我给你量一下体温', note: '"let me take your temperature"; 一下 softens the verb to "do briefly"' },
        { target: '三十八度二', note: '"38.2 degrees"; Chinese reports the decimal as 度+digit (38度2 = 38.2°C)' },
        { target: '最好不要', note: '"better not to"; softer than 不可以 — the doctor declines politely' },
        { target: '复诊 fùzhěn', note: '"follow-up visit"; standard discharge instruction' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      '简化版对话',
      'jiǎnhuà bǎn duìhuà',
      'A shorter 4-turn version of the consultation for repeated practice; use it as a scaffold to roleplay with your own symptoms swapped in. The minimum complete medical exchange in Mandarin.',
      'conversation',
      '医生: 你哪里不舒服?\n你: 我[body part]疼，[symptom 2]。\n医生: 从什么时候开始的?\n你: 从[time]开始。\n医生: 是[diagnosis]。应该[advice 1]，不应该[prohibition]。\n你: 我可以[lifestyle question]吗?\n医生: [可以 / 不可以], [reason].',
      'The four-turn minimum exchange — try filling in each bracket with three different choices to build flexibility.',
      [
        { target: '[body part]疼', note: 'body-part + 疼 pattern; pick from 头, 嗓子, 肚子, 牙, 背' },
        { target: '从[time]开始', note: 'onset marker; pick from 昨天, 今天早上, 上周, 前天' },
        { target: '应该[V] / 不应该[V]', note: 'positive vs negative advice; the doctor\'s slot' },
        { target: '我可以[V]吗?', note: 'permission question; the patient\'s slot' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '症状记录模板',
      'zhèngzhuàng jìlù múbǎn',
      'A reusable five-sentence template for any symptom note. Fill in the bracketed slots with your own symptoms — the structure carries the rest. Used at the registration desk or to prepare what you\'ll say before walking in.',
      'sentence',
      '医生您好。我从[时间]开始觉得不舒服。我[身体部位]疼，[第二症状]。我觉得[整体状态]。我应该[做什么]吗? 我可以[问题]吗?',
      'Five sentences cover the core: greeting, onset, body-part pain, second symptom, overall state, request for advice, permission question — the minimum complete symptom report.',
      [
        { target: '[时间]', note: 'when symptoms started — 昨天 / 今天早上 / 上周; the onset marker is critical for diagnosis' },
        { target: '[身体部位]', note: 'body part that hurts — 头, 嗓子, 肚子, 背, 牙; use body-part + 疼' },
        { target: '[第二症状]', note: 'additional symptom — 也发烧 / 也咳嗽 / 流鼻涕; chain with 也 for the second body part' },
        { target: '[整体状态]', note: 'overall feeling — 难受 / 没力气 / 头晕; use 觉得 + adjective' },
        { target: '[问题]', note: 'lifestyle permission — 喝咖啡 / 去上课 / 跑步; use 可以…吗?' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '写作练习',
      'xiězuò liànxí',
      'Write your own 3–5 sentence symptom note in Hanzi using the template. Use body-part + 疼 at least twice, 觉得 + adjective at least once, 应该 or 不应该 at least once, and 可以…吗? at least once to demonstrate the four core grammar patterns of this lesson.',
      'sentence',
      '示例: 医生您好。我从昨天晚上开始觉得很难受。我头疼，嗓子也疼，还有点发烧。我觉得没力气。我应该吃什么药? 我可以明天去上课吗?',
      'Translation: "Hello, Doctor. Since last night I have felt awful. My head hurts, my throat also hurts, and I have a slight fever. I feel weak. What medicine should I take? May I go to class tomorrow?"',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '中医 vs 西医',
      'zhōngyī vs xīyī',
      'Two parallel medical systems in China. 中医 (Traditional Chinese Medicine) uses herbs (中药), acupuncture (针灸), and cupping (拔罐); diagnoses through pulse, tongue, and symptom-balance reading. 西医 (Western medicine) uses pharmaceuticals, surgery, and lab tests. Most Chinese patients freely use both — they pick whichever fits the illness.',
      'sentence',
      '小问题用中医，大问题用西医。Xiǎo wèntí yòng zhōngyī, dà wèntí yòng xīyī.',
      'A common pragmatic rule: chronic, mild, or balance-related issues (poor sleep, weak digestion) go to 中医; acute, sharp, or surgical issues go to 西医. The campus infirmary is 西医 by default.',
      [
        { target: '中医 zhōngyī', note: 'Traditional Chinese Medicine; treats imbalances and chronic conditions; uses herbs and physical therapies' },
        { target: '西医 xīyī', note: 'Western/conventional medicine; treats acute conditions; uses pharmaceuticals and surgery' },
        { target: '中药 zhōngyào / 西药 xīyào', note: 'TCM herbs / Western drugs — same suffix 药 (medicine), different prefix' },
        { target: '针灸 zhēnjiǔ / 拔罐 báguàn', note: 'acupuncture / cupping — two classic TCM physical therapies still widely used' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '上火',
      'shànghuǒ',
      'A TCM concept meaning "excess internal heat / fire". Used in everyday Chinese conversation to explain symptoms like sore throat, mouth ulcers, acne, or constipation — especially after eating spicy/fried food, missing sleep, or feeling stressed. Western doctors typically dismiss the concept, but Chinese friends and family treat it as real and shared.',
      'sentence',
      '你嗓子疼? 你上火了，多喝水。Nǐ sǎngzi téng? Nǐ shànghuǒ le, duō hē shuǐ.',
      'A typical Chinese friend\'s response to your sore throat — diagnosing 上火 and prescribing 多喝水 in one breath. Smile and accept the advice even if you don\'t share the framework.',
      [
        { target: '上火 shànghuǒ', note: 'excess internal heat (TCM); cause attributed to spicy food, fried food, stress, or sleep deprivation' },
        { target: '去火 qù huǒ', note: '"remove the heat"; eating cooling foods (pear, watermelon, mung bean soup) to fix 上火' },
        { target: '凉茶 liángchá', note: '"cool tea"; herbal tea drunk to counteract 上火; common in southern China' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '校医院 vs 急诊',
      'xiào yīyuàn vs jí zhěn',
      'The Tsinghua 校医院 (campus infirmary) is a 门诊 (outpatient clinic) for everyday illness — walk-in, free or near-free with the campus health card. For real emergencies — chest pain, broken bones, high fever above 39°C, severe injuries — go to a 大医院 (large city hospital) 急诊 (ER) instead. Knowing the difference saves time when it matters.',
      'sentence',
      '感冒去校医院，骨折去急诊。Gǎnmào qù xiào yīyuàn, gǔzhé qù jí zhěn.',
      'A practical Tsinghua-student rule: a cold (感冒) goes to the campus infirmary; a broken bone (骨折) goes to the city-hospital ER.',
      [
        { target: '校医院 xiào yīyuàn', note: 'campus infirmary; outpatient walk-in for everyday illness; near-free for enrolled students' },
        { target: '门诊 ménzhěn', note: 'outpatient department; for routine illness, regular check-ups, prescription refills' },
        { target: '急诊 jí zhěn', note: 'emergency room; for urgent/serious cases; open 24/7 at major hospitals' },
        { target: '住院 zhùyuàn', note: 'to be hospitalized; what follows 急诊 when the case is serious enough' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '医生的语气',
      'yīshēng de yǔqì',
      'Chinese doctors typically speak directly and quickly — short sentences, minimal pleasantries, frequent use of 应该 / 不应该 / 要 / 必须. To Western patients this can feel curt, but in Mandarin medical context it is professional and reassuring. Doctors prioritize accuracy and efficiency over rapport-building chit-chat.',
      'sentence',
      '"是感冒。三天的药，一天三次。多喝水，多休息。不要剧烈运动。"',
      'A typical complete doctor sentence — five facts in one breath, no softening phrases like "I think" or "perhaps". Listen for the modal verbs to know whether each instruction is advice (应该) or a rule (要 / 必须).',
      [
        { target: 'Direct register', note: 'short sentences, modal-heavy, no small talk; the Chinese medical professional norm' },
        { target: 'Modal verbs as signals', note: '应该 = advice; 要 = need to; 必须 = must — listen for which one to gauge strictness' },
        { target: 'Patient responds with 谢谢', note: 'after instructions, the polite patient response is 谢谢医生; rarely a follow-up "why?" question' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '任务: 校医院看病',
      'rènwù: xiào yīyuàn kàn bìng',
      'Roleplay a visit to the Tsinghua 校医院 with the AI tutor playing the doctor. Use every skill from this lesson in one continuous scene — describe symptoms, give onset, take the diagnosis, accept the 应该 / 不应该 advice, and ask one practical permission question.',
      'conversation',
      '[Tsinghua campus infirmary, outpatient clinic]\n医生: 你好，哪里不舒服?\n你: [打招呼 + 描述症状 (用 X 疼 + 觉得 adjective)]\n医生: 从什么时候开始的?\n你: [说明时间 (用 从…开始)]\n医生: 我给你量一下体温。…是[诊断]。\n你: [接受诊断 + 问一个 lifestyle 问题 (用 可以…吗?)]\n医生: [可以 / 不可以 + 给出建议 (用 应该 / 不应该 / 多 + V)]\n你: [告别 + 谢谢]',
      'Seven turns of fluent exchange; the AI tutor will prompt you and respond naturally to whatever you say. Aim to hit body-part + 疼, 觉得 + adjective, 从…开始, 应该 / 不应该, and 可以…吗? at least once each.',
      [
        { target: '打招呼 + 描述症状', note: '医生您好 + 我[body part]疼，[第二个症状]; the opening turn' },
        { target: '说明时间', note: '从昨天开始 / 从今天早上开始; onset marker is essential for diagnosis' },
        { target: '接受诊断', note: '哦，是感冒 / 好的; brief acknowledgment, then move to your question' },
        { target: '问 lifestyle 问题', note: '我可以喝咖啡吗? / 我可以去上课吗? / 我可以跑步吗?; use 可以…吗?' },
        { target: '告别', note: '谢谢医生 / 再见医生; the polite close — keep it short like the doctor\'s register' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战 — 给朋友传话',
      'tiǎozhàn — gěi péngyou chuán huà',
      'Stretch goal: after the infirmary visit, your Chinese roommate asks how it went. Re-tell the whole encounter in 4-5 sentences using 应该 / 不应该 and indirect-speech reporting (医生说…). Closes the loop by practicing the same advice from a third-person angle.',
      'conversation',
      '室友: 你去校医院怎么样了?\n你: 医生说我感冒了。他说我应该多喝水，多休息，不应该喝咖啡。还说三天后还不好就要去复诊。\n室友: 你拿药了吗?\n你: 拿了，三天的药，一天三次。\n室友: 那你今天就别出门了，好好休息。',
      '"室友" (shìyǒu, "roommate") is the casual addressee; the report uses 医生说… ("the doctor said…") to convert direct advice into reported advice.',
      [
        { target: '医生说…', note: 'reported-speech opener; turns the doctor\'s direct advice into your retelling' },
        { target: '应该 / 不应该 in indirect', note: 'modal verbs survive the shift to indirect speech unchanged — no tense agreement needed' },
        { target: '别 + V (casual prohibition)', note: '别出门 ("don\'t go out"); the roommate\'s casual equivalent of the doctor\'s 不应该出门' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
