// Level 2 Adult Unit 8 — 看病与医院 (Medical Care & Hospitals)
// Functions: navigate a Beijing 三甲医院 from registration to discharge,
// name hospital departments and procedures, describe symptoms with
// duration and progression, read a prescription, ask about insurance and
// reimbursement, and use V-过 for past experience, 不仅…而且… for listing
// symptoms, and 越来越 + adjective for symptom progression.
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
  orientation: 'zh-l2au8-orientation',
  pronunciation: 'zh-l2au8-pronunciation',
  vocabularyHospital: 'zh-l2au8-vocab-hospital',
  vocabularySymptoms: 'zh-l2au8-vocab-symptoms',
  grammarGuo: 'zh-l2au8-grammar-guo',
  grammarBujin: 'zh-l2au8-grammar-bujin',
  grammarYueYue: 'zh-l2au8-grammar-yue-yue',
  reading: 'zh-l2au8-reading',
  listening: 'zh-l2au8-listening',
  writing: 'zh-l2au8-writing',
  culture: 'zh-l2au8-culture',
  task: 'zh-l2au8-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Navigate a full visit to a Beijing 三甲医院 (top-tier hospital): register at 挂号, find the right 科 (department), describe symptoms to the doctor, undergo a 化验 (lab test), and pick up your 处方 (prescription) — all in Mandarin.',
      'Describe a symptom with three layers of detail — what hurts, how long it has lasted, and whether it is getting better or worse — using 已经…天了 (already N days), 不仅…而且… (not only…but also…), and 越来越 + adjective (more and more).',
      'Ask about insurance and payment: whether your 医保 (health insurance) is accepted, what is 自费 (out-of-pocket), and how much can be 报销 (reimbursed) — the survival vocabulary for navigating Chinese hospital billing.',
    ],
    task: 'Imagine you are studying at Tsinghua University and have had a worsening cough and chest pain for five days. By the end of this lesson, you should be able to walk into a Beijing 三甲医院, register at 内科, describe your symptoms, get a blood test, receive a prescription, and ask about reimbursement — all in one continuous Mandarin exchange.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in this lesson',
    goals: [
      'Master the high-frequency medical terms with tricky tone or initial combinations: 挂号 (guàhào, 4+4 — two sharp fourth tones), 急诊 (jízhěn, 2+3 — rising then dipping), 化验 (huàyàn, 4+4), 处方 (chǔfāng, 3+1 — dip then high level), 病历 (bìnglì, 4+4).',
      'Distinguish the retroflex initials in 出院 (chū yuàn, "discharge") and 住院 (zhù yuàn, "be hospitalized") from the palatals in 急诊 (jízhěn) and 检查 (jiǎnchá) — confusing them changes the medical action entirely.',
      'Apply tone sandhi inside 不仅 (bùjǐn): although 仅 is third tone, 不 stays fourth here because 仅 is third — only 不 + fourth-tone syllable triggers the 不 → bú sandhi. Useful contrast with 不是 (búshì).',
    ],
    task: 'Read each medical term aloud three times, paying attention to the retroflex/palatal contrast and the tone shapes that distinguish similar-looking words like 住院 (zhùyuàn) and 出院 (chūyuàn).',
  },
  {
    id: ACT.vocabularyHospital,
    section: 'Vocabulary I',
    title: 'Hospitals, departments, and medical procedures',
    goals: [
      'Use the core hospital vocabulary: 医院 (hospital), 三甲医院 (top-tier hospital), 急诊 (emergency), 门诊 (outpatient), 挂号 (register at reception), 科 (department), 医生 (doctor), 护士 (nurse), 病人 (patient), 病历 (medical record).',
      'Name the major departments by their Mandarin term: 内科 (internal medicine), 外科 (surgery), 儿科 (pediatrics), 眼科 (ophthalmology), 牙科 (dentistry), 中医 (Traditional Chinese Medicine) — 中医 vs 西医 is a real structural divide in Chinese hospitals.',
      'Use the procedure and treatment vocabulary: 化验 (lab test), 抽血 (draw blood), 拍片 (X-ray), 手术 (surgery), 住院 (hospitalize), 出院 (discharge), 处方 (prescription), 药 (medicine).',
    ],
    task: 'Describe a complete hypothetical hospital visit in 5–6 sentences, naming the department you visit and at least three procedures you undergo.',
  },
  {
    id: ACT.vocabularySymptoms,
    section: 'Vocabulary II',
    title: 'Symptoms, insurance, and payment',
    goals: [
      'Describe symptoms with the standard patterns: 我有 X 病 ("I have X disease"), X 不舒服 ("X feels uncomfortable"), 已经…天了 ("already N days") — combine all three to give a doctor a clear, three-part complaint.',
      'Use the insurance and payment vocabulary: 医保 (health insurance, short for 医疗保险), 自费 (out-of-pocket), 报销 (reimburse), 挂号费 (registration fee) — the four words you need to talk about every yuan of a Chinese hospital bill.',
      'Use the common symptom words: 发烧 (fever), 咳嗽 (cough), 头疼 (headache), 肚子疼 (stomachache), 胸痛 (chest pain), 喘不上气 (short of breath) — the granular vocabulary the doctor will probe for once you say you feel sick.',
    ],
    task: 'Write a three-part symptom complaint: name the symptom, say how long it has lasted, and add one progression detail using 越来越 (more and more).',
  },
  {
    id: ACT.grammarGuo,
    section: 'Grammar I',
    title: 'V + 过 — "have V\'d (at some point)"',
    goals: [
      'Use V + 过 (guo, neutral tone) to mark a past EXPERIENCE — that the speaker has done V at least once in their life, without specifying when. Pattern: SUBJECT + V + 过 + OBJECT. CRITICALLY: 过 is about experience ("have you ever…"), not about completed action — that is 了 (le).',
      'Apply V 过 to the medical context where it is the natural way to ask about prior treatment, hospitalization, or illness history: 你以前住过院吗? ("Have you ever been hospitalized?"), 我从来没做过手术 ("I have never had surgery").',
      'Negate with 没 (méi) — NOT 不 — placed BEFORE the verb: 我没做过手术 ("I have not had surgery"). 不做过 is ungrammatical; experience-aspect negation requires 没.',
    ],
    task: 'Write 4 medical-history questions using V 过: two affirmative ("Have you ever…"), one negative answer ("I have never…"), and one with 从来 ("never at all") for emphasis.',
  },
  {
    id: ACT.grammarBujin,
    section: 'Grammar II',
    title: '不仅…而且… — "not only…but also…"',
    goals: [
      'Use the paired conjunction 不仅 A 而且 B ("not only A but also B") to list two related facts, symptoms, or properties. The first clause names the obvious or initial detail; the second adds an escalating or surprising one. Pattern: SUBJECT + 不仅 + CLAUSE_A + 而且 + CLAUSE_B.',
      'Apply 不仅…而且… specifically to symptom description, where it is the standard register for stacking two symptoms naturally: 我不仅咳嗽，而且胸痛 ("I not only cough but also have chest pain") — clearer and more medical-sounding than just listing them with a comma.',
      'Know the register: 不仅…而且… is slightly more formal than the casual 又…又… (Unit 6) — use 不仅…而且… when speaking to a doctor or writing a medical complaint; reserve 又…又… for casual peer description.',
    ],
    task: 'Write three two-symptom complaints using 不仅…而且…, escalating from minor to major (cough → chest pain, fever → dizziness, stomachache → cannot eat).',
  },
  {
    id: ACT.grammarYueYue,
    section: 'Grammar III',
    title: '越来越 + adjective — "more and more"',
    goals: [
      'Use 越来越 + ADJECTIVE/STATE-VERB to describe a progressively intensifying quality over time. Pattern: SUBJECT + 越来越 + ADJ. The adjective takes NO 很 (hěn) — 越来越 already supplies the degree.',
      'Apply 越来越 specifically to symptom progression, which is exactly what doctors need to hear: 越来越疼 ("more and more painful"), 越来越严重 ("more and more serious"), 越来越没力气 ("more and more weak").',
      'Distinguish 越来越 + adj (progression over time) from 越…越… (the more X, the more Y — paired construction, e.g., 越吃越饿 "the more I eat, the hungrier I get"). Same 越 character, different patterns.',
    ],
    task: 'Write three progression sentences using 越来越: one describing a worsening symptom, one improving, and one neutral change (e.g., taller, busier).',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: '读处方 — Reading a hospital prescription',
    goals: [
      'Decode a Beijing hospital prescription: patient info, diagnosis (诊断), prescription list with dosage, and reimbursement breakdown (医保 vs 自费).',
      'Answer four comprehension questions about the prescription in short Mandarin sentences using vocabulary from Activities 3 and 4.',
    ],
    task: 'Read the prescription aloud once, then answer the four comprehension questions in short complete sentences.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: '门诊对话 — At the outpatient desk',
    goals: [
      'Follow a 6-turn dialogue between a patient and a Beijing 内科 (internal medicine) doctor: symptom description, history questions, blood test order, and prescription handoff.',
      'Reproduce the dialogue with your own symptoms swapped in — same six functional turns, different content.',
    ],
    task: 'Read the polite outpatient dialogue along with the AI tutor first, then perform it again with a different symptom of your choice.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: '写病历 — Write a short medical complaint',
    goals: [
      'Write a 4–5 sentence medical complaint suitable for reading aloud to a doctor: symptom + duration + progression + history + question. Use V 过 at least once, 不仅…而且… at least once, and 越来越 at least once.',
      'Notice the register — written and read-aloud complaints in Chinese hospitals lean slightly formal; avoid casual interjections like 啊 or 吧.',
    ],
    task: 'Write your own four-sentence complaint using the template, then read it aloud as if you were sitting in front of a 内科 doctor.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: '中国医院文化 — Hospital tiers, 黄牛, and 中医 vs 西医',
    goals: [
      'Know the three-tier hospital system: 一甲 (basic local clinic), 二甲 (mid-level district), and 三甲 (top-tier national/provincial). 三甲医院 are perpetually overcrowded because patients across China bypass local clinics and travel to top-tier facilities for trust reasons.',
      'Understand the 挂号 registration system and the 黄牛 (scalpers) phenomenon: appointment slots at top doctors disappear in seconds online, so a black-market industry of slot-resellers (黄牛) has grown around major hospitals — illegal but persistent.',
      'Know the 医保 universal coverage system: most procedures are partially reimbursable, but learners on student visas often need separate private insurance. The personal copay (自付) varies by drug and procedure.',
      'Recognize that 中医 (Traditional Chinese Medicine) and 西医 (Western medicine) operate in separate hospital departments — sometimes separate hospitals. Patients freely choose between them and a 三甲医院 typically offers both.',
      'Acknowledge the historical 红包 (red envelope) practice — informal tipping of surgeons before operations — which is now officially banned but lingers as a topic of public discussion. Modern alternatives include using 关系 (personal connections) to skip queues or access top doctors.',
    ],
    task: 'For each cultural concept (三甲, 黄牛, 医保, 中医 vs 西医, 红包), name one practical implication for a foreign student seeking care in Beijing.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: '过过任务: A Beijing hospital visit',
    goals: [
      'Combine every skill from this lesson into one continuous 三甲医院 visit: register, describe symptoms with duration and progression, answer history questions with V 过, receive a blood test, get a prescription, and ask about 医保 reimbursement.',
      'Use the correct register: speak with the doctor in polite-formal Mandarin (您, 请, 谢谢) and reserve casual phrasing for inner-monologue side comments.',
    ],
    task: 'Roleplay a full Beijing 三甲医院 visit with the AI tutor playing the registration clerk, the doctor, and the pharmacy cashier. Aim for an 8-turn exchange covering registration → symptoms → history → blood test → prescription → reimbursement.',
  },
];

const lesson = {
  title: 'Level 2 (Adult) · Unit 8: 看病与医院 — Medical Care & Hospitals',
  category: 'healthcare',
  difficulty: 'intermediate',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'registering-at-hospital', label: 'Registering at the hospital', goal: 'Use 挂号 + 内科 + 普通号/专家号 to register for the right department at a Beijing 三甲医院.' },
    { id: 'describing-symptoms', label: 'Describing symptoms to a doctor', goal: 'Use 不仅…而且… + 已经…天了 + 越来越 to give a doctor a three-part symptom report.' },
    { id: 'answering-medical-history', label: 'Answering medical history questions', goal: 'Use V 过 (affirmative) and 没 V 过 (negative) to answer the doctor\'s history questions about past surgeries, hospitalizations, and chronic conditions.' },
    { id: 'asking-about-reimbursement', label: 'Asking about insurance reimbursement', goal: 'Use 医保 + 报销 + 自费 to ask which parts of the bill the insurance covers and what you must pay out of pocket.' },
  ],
  relatedPools: ['topic-health', 'topic-services'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '本课目标',
      'běn kè mùbiāo',
      'By the end of this lesson, you can walk into a Beijing top-tier hospital, register at the right department, describe a multi-symptom complaint with duration and progression, undergo a lab test, pick up a prescription, and ask about insurance reimbursement — the full healthcare encounter in Mandarin.',
      'word',
      'Functional language: 挂号 guàhào (register) · 看病 kànbìng (see a doctor) · 化验 huàyàn (lab test) · 开处方 kāi chǔfāng (write a prescription) · 报销 bàoxiāo (reimburse)',
      'These five micro-skills cover every stage of a Chinese hospital visit; once they are automatic, every follow-up appointment is just a recombination of the same building blocks.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      '真实场景',
      'zhēnshí chǎngjǐng',
      'You are a Tsinghua University student in your second semester. For the past five days you have had a cough that is getting worse and now chest pain when you breathe in. You decide to visit a top-tier hospital in Beijing to find out what is going on.',
      'word',
      '你: 已经咳嗽五天了，而且越来越严重，今天开始胸痛。',
      '"It has been five days of coughing, getting more and more severe, and chest pain started today." — three-part report combining duration (已经…天了), progression (越来越), and a new symptom (而且).',
      [
        { target: '已经咳嗽五天了', note: 'duration pattern: 已经 + V/SYMPTOM + duration + 了; the 了 at the end is required for the "up to now" meaning' },
        { target: '越来越严重', note: 'progression pattern: 越来越 + ADJ; no 很 (hěn) needed because the degree is built into 越来越' },
        { target: '今天开始胸痛', note: '"chest pain started today" — adds a new symptom on top of the existing one; sets up the 不仅…而且… combination' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '三个新工具',
      'sān gè xīn gōngjù',
      'This unit introduces three new grammar tools and the medical vocabulary to use them with. Grammar I: V 过 (have ever V\'d). Grammar II: 不仅…而且… (not only…but also…). Grammar III: 越来越 + adj (more and more). Vocabulary builds on Level 1 Unit 18 (simple infirmary visits) but adds full hospital infrastructure.',
      'word',
      '你以前住过院吗? (V 过) · 我不仅咳嗽，而且胸痛 (不仅…而且…) · 越来越疼 (越来越)',
      'Three sentence patterns the doctor will probe you for in any hospital visit; once you can produce all three, your medical Mandarin sounds native-paced.',
      [
        { target: 'V 过 — past experience', note: 'use whenever the question is "have you ever…" rather than "did you just…"' },
        { target: '不仅…而且… — stack symptoms', note: 'preferred over a bare comma when listing related but escalating symptoms' },
        { target: '越来越 + adj — progression', note: 'the doctor\'s favorite trigger word; signals that the symptom is changing, not static' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '挂号',
      'guàhào',
      'Two consecutive fourth tones — both sharp, falling, and stressed. The vowel "ua" in 挂 (guà) is a true glide from "u" to "a"; the "ao" in 号 (hào) is the standard "ow" diphthong. CRITICAL TERM: this is the first word you say at every Chinese hospital, so the tone shape must be unambiguous.',
      'word',
      '请问，挂号在哪儿? (Excuse me, where do I register?)',
      'A 4+4 tone pattern with no sandhi between the two syllables; both fall sharply from high to low.',
      [
        { target: '挂 guà (4th)', note: 'sharp falling tone; "hang / register / hook"' },
        { target: '号 hào (4th)', note: 'sharp falling tone; "number / slot"; here "registration slot"' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '急诊',
      'jízhěn',
      'Rising tone + dipping tone (2+3). The palatal initial j- is pronounced with the tongue flat and forward, NOT like English "j" in "jam" — confusing it with zh- (retroflex, as in 诊 — wait, 诊 is zhěn) is a frequent learner trap because BOTH initials appear in this single word.',
      'word',
      '急诊在一楼。(Emergency is on the first floor.)',
      'Note the two different initials side by side: j- (palatal, flat tongue) then zh- (retroflex, curled tongue).',
      [
        { target: '急 jí (2nd)', note: 'rising tone; palatal initial j-; "urgent / emergency"' },
        { target: '诊 zhěn (3rd)', note: 'dipping tone; retroflex initial zh-; "examine / diagnose"' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '化验',
      'huàyàn',
      'Two fourth tones (4+4), same pattern as 挂号 but the initials are gentler: h- (a throaty fricative) and y- (a glide standing in for i-). The phrase you hear when the doctor orders blood work or urine analysis.',
      'word',
      '请去化验室抽血。(Please go to the lab for a blood draw.)',
      'The 化验室 is the lab; 化验 alone is the test/analysis itself.',
      [
        { target: '化 huà (4th)', note: 'sharp falling; "transform / analyze"' },
        { target: '验 yàn (4th)', note: 'sharp falling; "examine / verify"' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '处方',
      'chǔfāng',
      'Third tone + first tone (3+1). The retroflex initial ch- in 处 requires the tongue curled back; the first tone in 方 is held high and steady. CONTRAST: 处方 (chǔfāng, "prescription") vs 厨房 (chúfáng, "kitchen") — same syllables, different tones, completely different domains.',
      'word',
      '医生给我开了处方。(The doctor wrote me a prescription.)',
      'Be careful: 处 (chǔ, 3rd) is the prescription word; 厨 (chú, 2nd) is the kitchen word. A small tone slip changes the meaning.',
      [
        { target: '处 chǔ (3rd)', note: 'dipping tone; retroflex ch-; "deal with / place"; here "prescription"' },
        { target: '方 fāng (1st)', note: 'high-level tone; "method / way / recipe"' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '病历',
      'bìnglì',
      'Two fourth tones (4+4). The medical-record file the doctor opens or you carry between appointments. Critical to distinguish 病历 (bìnglì, "medical record") from 病例 (bìnglì, "medical CASE") — same pinyin and tones, different second character and meaning.',
      'word',
      '请把您的病历给我。(Please give me your medical record.)',
      'In speech the two terms (历 history-record vs 例 case-example) are indistinguishable; context disambiguates.',
      [
        { target: '病 bìng (4th)', note: 'sharp falling; "illness"' },
        { target: '历 lì (4th)', note: 'sharp falling; "history / experience"; here "personal medical record"' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '住院 vs 出院',
      'zhùyuàn vs chūyuàn',
      'Two near-pair terms with opposite meanings — 住院 (zhùyuàn, "be hospitalized / admitted") vs 出院 (chūyuàn, "be discharged"). Both share 院 (yuàn, "courtyard / institution"). The first character carries the direction: 住 (zhù, "reside") = enter; 出 (chū, "exit") = leave.',
      'word',
      '我妈妈昨天住院了，希望下周可以出院。(My mother was hospitalized yesterday; hopefully she can be discharged next week.)',
      'Both initials are retroflex (zh-, ch-) so tongue position is the same; tone and meaning are the contrast.',
      [
        { target: '住院 zhùyuàn (4+4)', note: '"be admitted / hospitalized"; the patient enters' },
        { target: '出院 chūyuàn (1+4)', note: '"be discharged"; the patient leaves' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Hospital, departments, procedures
    // ────────────────────────────────────────────────────────────────────
    createContentItem('医院', 'yīyuàn', 'The generic word for a hospital — covering everything from a small neighborhood clinic up to a national-flagship facility. In Chinese usage, even modest facilities are routinely called 医院 if they offer inpatient beds; outpatient-only clinics are 诊所 (zhěnsuǒ).', 'word', '清华大学附近有一家很大的医院。', 'A typical sentence locating a hospital relative to a landmark; the 一家 measure word is standard for hospitals.', null, [ACT.vocabularyHospital]),
    createContentItem('三甲医院', 'sānjiǎ yīyuàn', 'A "Tier-3 Grade-A" hospital — the top rank in China\'s three-tier hospital system. Reserved for the largest, best-equipped, teaching-affiliated facilities. Patients across China bypass smaller clinics to come here, which is why 三甲医院 are perpetually crowded and registration slots vanish in seconds.', 'word', '北京协和医院是有名的三甲医院。', '"Peking Union Medical College Hospital is a famous Tier-3 Grade-A hospital" — a real-world example of the most prestigious 三甲 in Beijing.', null, [ACT.vocabularyHospital]),
    createContentItem('急诊', 'jízhěn', 'Emergency department — the 24-hour walk-in section of a hospital. Higher 挂号费 than 门诊 and typically reserved for sudden, severe symptoms. Foreign students should know the location of the nearest 急诊 entry before they need it.', 'word', '深夜如果突然不舒服，可以去急诊。', '"If you suddenly feel unwell late at night, you can go to the emergency department" — standard advice for after-hours care.', null, [ACT.vocabularyHospital]),
    createContentItem('门诊', 'ménzhěn', 'Outpatient — the daytime, by-appointment side of the hospital. Covers most non-emergency visits: routine check-ups, follow-ups, prescription refills, specialist consultations. The default starting point for almost any non-acute medical question.', 'word', '门诊时间是早上八点到下午五点。', '"Outpatient hours are 8 AM to 5 PM" — typical schedule signage at a Beijing 三甲.', null, [ACT.vocabularyHospital]),
    createContentItem('挂号', 'guàhào', 'To register at the reception window for a doctor visit. EVERY hospital visit in China begins with 挂号 — you cannot just walk into a department and ask to be seen. The 挂号费 (registration fee) varies by department and doctor level (普通号 vs 专家号).', 'word', '我要挂内科的号。', '"I want to register for internal medicine" — standard request at the registration window using the 挂…的号 pattern.', null, [ACT.vocabularyHospital]),
    createContentItem('科', 'kē', 'A department or specialty inside the hospital. Combines with body-part or specialty words to name specific departments: 内科 (internal), 外科 (surgery), 儿科 (pediatrics). When you 挂号, you must specify a 科.', 'word', '您要看哪个科?', '"Which department do you want to see?" — the registration clerk\'s standard opening question.', null, [ACT.vocabularyHospital]),
    createContentItem('内科', 'nèikē', 'Internal medicine — the catch-all department for non-surgical adult conditions: cough, fever, digestive issues, fatigue, suspected infections. The default starting department when you don\'t know what is wrong but you feel sick. Foreign students should learn this word first.', 'word', '咳嗽还是发烧的话，先看内科。', '"For cough or fever, see internal medicine first" — typical triage advice for adult patients.', null, [ACT.vocabularyHospital]),
    createContentItem('外科', 'wàikē', 'Surgery / surgical department — for conditions requiring an operation or that involve injury, fractures, wounds. Subspecialties include 普外科 (general surgery), 骨外科 (orthopedic surgery), 神经外科 (neurosurgery).', 'word', '骨折要去骨外科。', '"For a bone fracture, you need to go to orthopedic surgery" — typical triage for an injury.', null, [ACT.vocabularyHospital]),
    createContentItem('儿科', 'érkē', 'Pediatrics — for children typically under 14 years old. A separate department because pediatric dosing and diagnostics differ significantly from adult medicine. Foreign families in Beijing should know which nearby hospital has a strong 儿科.', 'word', '小孩生病要去儿科。', '"For sick children, go to pediatrics" — standard parenting advice.', null, [ACT.vocabularyHospital]),
    createContentItem('眼科', 'yǎnkē', 'Ophthalmology — for eye conditions, vision checks, contact lens fitting, eye injuries. In China, 眼科 also typically handles routine eyewear prescriptions, although optical shops are a separate (cheaper) option.', 'word', '我最近视力不好，想去眼科看看。', '"My vision has been poor recently; I want to go to ophthalmology to check" — typical reason for an eye visit.', null, [ACT.vocabularyHospital]),
    createContentItem('牙科', 'yákē', 'Dentistry — for tooth pain, cleanings, fillings, extractions. In China, 牙科 is offered both at 三甲医院 (more expensive, better insurance coverage) and at private dental clinics (faster appointments). Major dental work is often not fully reimbursed.', 'word', '我牙疼，要去牙科。', '"My tooth hurts; I need to go to dentistry" — the standard reason for a dental visit.', null, [ACT.vocabularyHospital]),
    createContentItem('中医', 'zhōngyī', 'Traditional Chinese Medicine — herbal remedies, acupuncture (针灸), tuina massage, and diagnostic methods based on TCM theory. Operates in PARALLEL with 西医 (Western medicine) in most Chinese hospitals; a 三甲医院 typically has a separate 中医科 department or even a sister 中医院 hospital.', 'word', '我朋友相信中医，他每周去看中医。', '"My friend believes in TCM; he visits a TCM practitioner weekly" — captures the everyday relevance of 中医 in modern China.', null, [ACT.vocabularyHospital]),
    createContentItem('医生', 'yīshēng', 'A medical doctor — usable both as a job title and as a form of address: 李医生 (Doctor Li). The 医生 + family-name reverse form (Western "Dr. Li") does NOT work in Mandarin; the family name comes first.', 'word', '李医生很有经验。', '"Doctor Li is very experienced" — typical patient feedback.', null, [ACT.vocabularyHospital]),
    createContentItem('护士', 'hùshi', 'A nurse — the second-syllable 士 reduces to neutral tone in speech. Nurses in Chinese hospitals handle blood draws, IV setup, wound care, and discharge instructions. Use 护士 in address only with a family name (王护士) or as a polite group address (护士们).', 'word', '护士来给我抽血了。', '"The nurse came to draw my blood" — typical hospital narration.', null, [ACT.vocabularyHospital]),
    createContentItem('病人', 'bìngrén', 'A patient — the sick person under medical care. The neutral term; 患者 (huànzhě) is the more formal alternative used in hospital signage and medical literature.', 'word', '医生正在跟病人说话。', '"The doctor is talking to the patient" — typical waiting-room observation.', null, [ACT.vocabularyHospital]),
    createContentItem('病历', 'bìnglì', 'A personal medical record — a small booklet or, increasingly, an electronic file maintained per patient at each hospital. The patient typically CARRIES their 病历 between appointments. Different hospitals do NOT share 病历 automatically.', 'word', '请把您的病历给我看一下。', '"Please let me see your medical record" — a standard request from the doctor at the start of a visit.', null, [ACT.vocabularyHospital]),
    createContentItem('化验', 'huàyàn', 'A laboratory test — covers blood, urine, stool, and other sample-based diagnostics. 化验室 is the lab; 化验单 is the test order slip; 化验结果 is the results report. Most lab tests in a 三甲医院 take 1–3 hours.', 'word', '医生让我去化验一下血。', '"The doctor asked me to go get a blood test" — captures the typical referral flow from doctor to lab.', null, [ACT.vocabularyHospital]),
    createContentItem('抽血', 'chōuxuè', 'To draw blood — the procedure itself. Note 血 has two readings: xuè (formal, written, compounds) and xiě (colloquial, standalone). 抽血 specifically uses xuè. Most hospitals do morning blood draws before food intake.', 'word', '抽血之前不能吃东西。', '"You cannot eat before having blood drawn" — standard pre-test instruction for fasting blood work.', null, [ACT.vocabularyHospital]),
    createContentItem('拍片', 'pāipiàn', 'To take an X-ray (or other imaging film). Colloquial term that covers X-ray and sometimes CT/MRI by extension. The formal term for X-ray is X光 (X-guāng); 拍片 is what nurses and doctors say.', 'word', '医生让我拍个胸片。', '"The doctor asked me to get a chest X-ray" — typical referral when chest pain or persistent cough is reported.', null, [ACT.vocabularyHospital]),
    createContentItem('手术', 'shǒushù', 'A surgical operation. Combines 手 (hand) + 术 (technique). Use with 做 (do/perform): 做手术 ("have / perform surgery"). Surgery in a 三甲医院 typically requires inpatient admission (住院).', 'word', '他下个月要做手术。', '"He is going to have surgery next month" — typical announcement of a scheduled operation.', null, [ACT.vocabularyHospital]),
    createContentItem('住院', 'zhùyuàn', 'To be admitted to the hospital as an inpatient. Combines 住 (reside) + 院 (institution / hospital). The opposite is 出院 (chūyuàn, discharge). Major surgeries, severe infections, and complicated births typically require 住院.', 'word', '医生说我要住院三天。', '"The doctor said I need to be hospitalized for three days" — typical doctor-to-patient announcement of an admission.', null, [ACT.vocabularyHospital]),
    createContentItem('出院', 'chūyuàn', 'To be discharged from the hospital. Combines 出 (exit) + 院 (institution). Discharge requires medical clearance and final billing; foreign patients often need to coordinate with insurance before 出院.', 'word', '希望明天可以出院。', '"Hopefully I can be discharged tomorrow" — typical patient statement at the end of a hospital stay.', null, [ACT.vocabularyHospital]),
    createContentItem('处方', 'chǔfāng', 'A written prescription — issued by the doctor and filled at the hospital pharmacy or an external pharmacy. CRITICAL TONE DISTINCTION: 处方 (chǔfāng, 3+1, prescription) vs 厨房 (chúfáng, 2+2, kitchen) — same syllables, different tones, completely different domains.', 'word', '医生开了一张处方给我。', '"The doctor wrote me a prescription" — the 一张 measure word is standard for paper prescriptions.', null, [ACT.vocabularyHospital]),
    createContentItem('药', 'yào', 'Medicine / medication. Combines with verbs: 吃药 (take medicine, by mouth), 打药 (inject medicine), 抓药 (fill a Traditional Chinese herbal prescription). The pharmacy where you pick up 药 is 药房 (yàofáng) or 药店 (yàodiàn).', 'word', '请记得按时吃药。', '"Please remember to take your medicine on time" — standard reminder from a doctor or family member.', null, [ACT.vocabularyHospital]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: Symptoms, insurance, payment
    // ────────────────────────────────────────────────────────────────────
    createContentItem('发烧', 'fāshāo', 'To have a fever — the body has an elevated temperature. Used as a verb: 我发烧了 ("I have a fever / I am running a fever"). The standard symptom report; the doctor will ask 多少度? ("how many degrees?") immediately.', 'word', '我从昨天开始发烧。', '"I have had a fever since yesterday" — pairs naturally with 从…开始 ("starting from") for duration.', null, [ACT.vocabularySymptoms]),
    createContentItem('咳嗽', 'késou', 'To cough — second syllable reduces to neutral tone in speech. The verb is used both for the action and for the symptom: 我一直咳嗽 ("I have been coughing nonstop"). The doctor will ask whether it is dry or with phlegm (干咳 vs 有痰).', 'word', '我已经咳嗽五天了。', '"I have already been coughing for five days" — uses the duration pattern 已经…天了 from Activity 1.', null, [ACT.vocabularySymptoms]),
    createContentItem('头疼', 'tóuténg', 'Headache. Combines 头 (head) + 疼 (hurt). Standalone form 我头疼 ("my head hurts / I have a headache"). The intensity follows the verb: 头疼得厉害 ("the headache is severe").', 'word', '我从早上开始头疼。', '"I have had a headache since this morning" — duration phrasing for an acute headache.', null, [ACT.vocabularySymptoms]),
    createContentItem('肚子疼', 'dùzi téng', 'Stomachache / abdominal pain. Used for a broad range of belly pain; the doctor will probe for location (上 / 下 / 左 / 右) and trigger (饭后 after meals / 空腹 on empty stomach).', 'word', '我吃完饭就肚子疼。', '"My stomach hurts right after I eat" — a specific complaint that points the doctor toward digestive workup.', null, [ACT.vocabularySymptoms]),
    createContentItem('胸痛', 'xiōngtòng', 'Chest pain. Combines 胸 (chest) + 痛 (pain) — note 痛 (tòng) and 疼 (téng) are near-synonyms, with 痛 slightly more formal/medical. Chest pain is treated as a potential emergency; the doctor will rule out cardiac causes first.', 'word', '我深呼吸的时候胸痛。', '"My chest hurts when I take a deep breath" — a specific complaint that triggers an immediate chest X-ray order.', null, [ACT.vocabularySymptoms]),
    createContentItem('喘不上气', 'chuǎn bu shàng qì', 'To be short of breath / unable to catch one\'s breath. A potential-complement structure: V-不上 ("cannot manage to V"). A serious symptom that should be reported immediately and may trigger an emergency-department referral.', 'word', '上楼的时候我喘不上气。', '"I cannot catch my breath when climbing stairs" — captures both the symptom and its trigger.', null, [ACT.vocabularySymptoms]),
    createContentItem('不舒服', 'bù shūfu', 'To feel unwell / uncomfortable. The general-purpose "I feel sick" phrase when you cannot pinpoint a specific symptom yet. Pairs with body parts: 肚子不舒服 ("stomach feels off"), 喉咙不舒服 ("throat feels off"), 整个人不舒服 ("the whole body feels off").', 'word', '我今天有点儿不舒服。', '"I feel a bit unwell today" — the soft opener before describing specific symptoms.', null, [ACT.vocabularySymptoms]),
    createContentItem('已经…天了', 'yǐjīng…tiān le', 'Duration pattern: "already N days (and counting up to now)". The final 了 is REQUIRED — it signals that the situation is ongoing as of the speech moment. Without 了, the sentence would mean a completed past duration.', 'sentence', '我已经发烧三天了。', '"I have already had a fever for three days (and still do)" — the canonical "ongoing symptom" frame the doctor expects.', [
      { target: '已经 yǐjīng', note: 'adverb "already"; placed before the verb' },
      { target: 'N 天 / 周 / 个月', note: 'the duration; can also be 几小时, 一年' },
      { target: '了 le', note: 'sentence-final particle; signals "and still ongoing" — dropping it changes the meaning' },
    ], [ACT.vocabularySymptoms]),
    createContentItem('医保', 'yībǎo', 'Health insurance — short for 医疗保险 (yīliáo bǎoxiǎn). China\'s universal health insurance system covers citizens by city and rural area. Foreign students typically have separate university-arranged or private insurance; ALWAYS confirm whether your card is accepted at the registration window.', 'word', '请问，这家医院能用医保吗?', '"Excuse me, can my health insurance be used at this hospital?" — the question every foreign patient should ask at registration.', null, [ACT.vocabularySymptoms]),
    createContentItem('自费', 'zìfèi', 'Out-of-pocket / self-paid. Combines 自 (self) + 费 (cost). The amount NOT covered by 医保 — usually a percentage that varies by drug and procedure. Imported medications and elective procedures are commonly 100% 自费.', 'word', '这个药是进口的，需要自费。', '"This medicine is imported and must be paid out of pocket" — typical pharmacy warning when imported drugs are dispensed.', null, [ACT.vocabularySymptoms]),
    createContentItem('报销', 'bàoxiāo', 'To reimburse / be reimbursed. The reverse of paying out of pocket — the insurer (or employer, or government) refunds you for an expense already paid. Foreign students often submit receipts to their university or private insurer for 报销.', 'word', '这部分可以报销吗?', '"Can this part be reimbursed?" — the canonical reimbursement question at the billing window.', null, [ACT.vocabularySymptoms]),
    createContentItem('挂号费', 'guàhàofèi', 'Registration fee — the small fee charged at 挂号 reception when you sign up for a doctor visit. Varies by department and doctor seniority: 普通号 (general doctor) is cheap (10–50 元 typical); 专家号 (specialist) is higher (50–300 元 or more).', 'word', '专家的挂号费比较贵。', '"Specialist registration fees are relatively expensive" — the standard cost expectation.', null, [ACT.vocabularySymptoms]),
    createContentItem('普通号 vs 专家号', 'pǔtōng hào vs zhuānjiā hào', 'Two registration tiers. 普通号 (general slot) — a regular doctor, cheaper, easier to get. 专家号 (specialist slot) — a senior/famous doctor, more expensive, scarce, often the target of 黄牛 (scalpers). Foreign students should start with 普通号 unless a referral specifies otherwise.', 'word', '你要普通号还是专家号?', '"Do you want a general slot or a specialist slot?" — the registration clerk\'s tier question.', [
      { target: '普通号', note: '"general slot"; cheaper, available, regular doctor on rotation' },
      { target: '专家号', note: '"specialist slot"; expensive, scarce, named senior doctor' },
    ], [ACT.vocabularySymptoms]),
    createContentItem('挂内科', 'guà nèikē', 'To register for internal medicine. The 挂 + DEPARTMENT shortened form is what you actually say at the window — the full 挂内科的号 also works but the shorter form is faster.', 'word', '我要挂内科。', '"I want to register for internal medicine" — the minimum sentence to get registered.', null, [ACT.vocabularySymptoms]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar I: V 过 (past experience)
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'V 过 — experiential aspect',
      'V guo — experiential aspect',
      'Place 过 (guo, neutral tone) AFTER the verb to mark a PAST EXPERIENCE — that the speaker has done V at least once in their life. Pattern: SUBJECT + V + 过 + (OBJECT). CRITICAL CONTRAST: V 过 ≠ V 了. V 了 says "the action happened / is done"; V 过 says "the speaker has the experience of having done it".',
      'sentence',
      '我去过北京。("I have been to Beijing." — at some point in life)\nvs 我去了北京。("I went to Beijing." — a specific completed trip)',
      'Same verb, different aspect markers, completely different meanings. The medical context favors 过 because medical history is about lifetime experience, not specific completed events.',
      [
        { target: 'V + 过 — experience', note: '"have ever V\'d"; lifetime aspect; pairs naturally with 以前 ("before") and 从来 ("ever / never")' },
        { target: 'V + 了 — completed action', note: '"V\'d / did V"; specific event aspect; pairs with time expressions like 昨天, 上周' },
        { target: '过 is neutral tone', note: 'always reduced; no tone mark — distinguishes it from 过 (guò, 4th tone) meaning "to pass / cross"' },
      ],
      [ACT.grammarGuo],
    ),
    createContentItem(
      'V 过 — medical history',
      'V guo — medical history',
      'In the hospital, V 过 is THE pattern the doctor uses to ask about your medical history. Every history question — surgery, hospitalization, allergies, chronic conditions — is framed with V 过.',
      'sentence',
      '你以前住过院吗? ("Have you ever been hospitalized?")\n你做过手术吗? ("Have you ever had surgery?")\n你吃过这个药吗? ("Have you ever taken this medicine?")',
      'These are word-for-word the questions the 内科 doctor will run through before writing a prescription; memorize the rhythm.',
      [
        { target: '住过院 zhù guo yuàn', note: '"have been hospitalized"; note 过 splits the compound — sits BETWEEN 住 and 院, not after the whole compound' },
        { target: '做过手术 zuò guo shǒushù', note: '"have had surgery"; 过 immediately follows 做, then 手术 as object' },
        { target: '吃过…药 chī guo … yào', note: '"have taken … medicine"; medication trial history' },
      ],
      [ACT.grammarGuo],
    ),
    createContentItem(
      'Negation: 没 V 过',
      'méi V guo',
      'Negate experiential V 过 with 没 (méi) placed BEFORE the verb — NOT 不. 不 V 过 is ungrammatical because 不 negates present/future and habitual actions, while 没 negates past actions and experiences. The pattern is: SUBJECT + 没 + V + 过 + (OBJECT).',
      'sentence',
      '我没住过院。("I have never been hospitalized.")\n我没做过手术。("I have never had surgery.")\n我从来没吃过这个药。("I have never taken this medicine.")',
      'The 从来 ("ever / always") intensifier strengthens the negative — "never EVER" rather than just "haven\'t happened to".',
      [
        { target: '没 + V + 过', note: 'standard negation of experience' },
        { target: '从来没 + V + 过', note: 'intensified "never ever" form; very common in medical history denials' },
        { target: 'NOT 不 V 过', note: 'common learner error; 不 negates habit/future, not past experience' },
      ],
      [ACT.grammarGuo],
    ),
    createContentItem(
      'Question: V 过…吗?',
      'V guo … ma?',
      'Form a yes/no question by adding 吗 (ma) at the end of a V 过 statement: V 过…吗? The short answer pattern echoes the verb: 是 (no — wait, this is wrong, the right echo is 过…/没过…). The correct short answers are V 过 (yes) or 没 V 过 (no), repeating the verb plus the aspect marker.',
      'sentence',
      'Q: 你住过院吗? — A: 住过。/ 没住过。\nQ: 你做过手术吗? — A: 做过。/ 没做过。',
      'Echo-answers are typical of Mandarin — you repeat the verb-aspect combo rather than saying a bare yes/no.',
      [
        { target: '住过 (yes)', note: 'short affirmative answer; echoes the verb-aspect form' },
        { target: '没住过 (no)', note: 'short negative answer; uses 没 before the verb-aspect form' },
        { target: 'NOT 是 / 不是', note: 'wrong echo pattern; 是/不是 is for 是 sentences, not for experiential V 过' },
      ],
      [ACT.grammarGuo],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar II: 不仅…而且…
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '不仅…而且…',
      'bùjǐn … érqiě …',
      'A paired conjunction meaning "not only … but also …". Use to link two related facts, qualities, or symptoms — the second clause typically ESCALATES or ADDS to the first. Pattern: SUBJECT + 不仅 + CLAUSE_A + 而且 + CLAUSE_B. The subject may repeat in CLAUSE_B for emphasis or drop if obvious.',
      'sentence',
      '我不仅咳嗽，而且胸痛。("I not only cough but also have chest pain.")\n这家医院不仅大，而且很有名。("This hospital is not only big but also very famous.")',
      'The hallmark of medical-Mandarin symptom reporting: name the obvious symptom first, escalate to the worrying one second.',
      [
        { target: '不仅 bùjǐn', note: '"not only"; opens the first clause; 不 keeps its 4th tone here because 仅 is 3rd tone (no 不-sandhi)' },
        { target: '而且 érqiě', note: '"and also / moreover"; opens the second clause; written register slightly more formal than the casual 还 (also)' },
        { target: 'CLAUSE_A → CLAUSE_B (escalating)', note: 'natural reading order is "minor → major" or "expected → unexpected"' },
      ],
      [ACT.grammarBujin],
    ),
    createContentItem(
      '不仅…而且 — register',
      'bùjǐn … érqiě — register',
      'Register note: 不仅…而且… is slightly more FORMAL than the casual 又…又… (Unit 6). Use 不仅…而且… when speaking to a doctor, writing a medical complaint, or describing something in a structured way. Reserve 又…又… for casual peer description and emotional venting.',
      'sentence',
      'TO DOCTOR (formal): 我不仅咳嗽，而且胸痛。\nTO FRIEND (casual): 我又咳嗽又胸痛，难受死了!',
      'Same two symptoms, two registers — the doctor gets a clean clinical pair, the friend gets the emotional extra (难受死了 "I\'m dying of discomfort").',
      [
        { target: '不仅…而且… (formal)', note: 'medical, written, structured contexts' },
        { target: '又…又… (casual)', note: 'peer venting, descriptive complaints in conversation' },
        { target: '还 (informal also)', note: 'casual additive; "我咳嗽，还胸痛" is grammatical but flat' },
      ],
      [ACT.grammarBujin],
    ),
    createContentItem(
      '不仅 — variant 不但',
      'bùjǐn — variant bùdàn',
      'A common alternative form: 不但…而且… (bùdàn … érqiě …) — same meaning and register as 不仅…而且…. 不但 is slightly more common in spoken Mandarin; 不仅 has a slight written-register flavor. Both are correct in medical contexts.',
      'sentence',
      '我不但咳嗽，而且胸痛。(= 我不仅咳嗽，而且胸痛。)',
      'Treat the two as interchangeable; native speakers do not draw a sharp line.',
      [
        { target: '不但…而且…', note: 'slightly more spoken; same meaning' },
        { target: '不仅…而且…', note: 'slightly more written; same meaning' },
        { target: '不仅…还… / 不但…还…', note: 'casual variants using 还 (hái) in place of 而且' },
      ],
      [ACT.grammarBujin],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar III: 越来越 + adj
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '越来越 + adj',
      'yuè lái yuè + adj',
      'A fixed adverbial phrase meaning "more and more" — placed before an ADJECTIVE or STATE VERB to describe a progressively intensifying quality over time. Pattern: SUBJECT + 越来越 + ADJ. CRITICAL: do NOT add 很 (hěn) — the degree is built into 越来越.',
      'sentence',
      '我的咳嗽越来越严重。("My cough is getting more and more severe.")\n天气越来越冷。("The weather is getting colder and colder.")\n他越来越累。("He is getting more and more tired.")',
      'The medical context favors this pattern because the doctor needs to know whether a symptom is static, improving, or worsening — and 越来越 is the canonical "worsening" frame.',
      [
        { target: '越来越 + ADJ', note: 'standard pattern; ADJ takes no degree word like 很 or 非常' },
        { target: '越来越 + STATE VERB', note: 'works with state verbs like 喜欢, 累, 害怕 — 我越来越喜欢这家医院 ("I like this hospital more and more")' },
        { target: 'NOT 越来越很 ADJ', note: 'common learner error; 很 is redundant and ungrammatical here' },
      ],
      [ACT.grammarYueYue],
    ),
    createContentItem(
      '越来越 — symptom progression',
      'yuè lái yuè — symptom progression',
      'The medical sentences the doctor needs to hear. Pair 越来越 with the right adjective to give a clear progression report: 越来越疼 (more and more painful), 越来越严重 (more and more serious), 越来越没力气 (weaker and weaker).',
      'sentence',
      '从昨天开始，我的胸痛越来越严重。("Since yesterday, my chest pain has been getting more and more severe.")\n我越来越没力气。("I am getting weaker and weaker.")\n这个药吃了以后，我感觉越来越好。("After taking this medicine, I feel better and better.")',
      'Notice that 越来越 also works for POSITIVE progression (越来越好) — useful for follow-up appointments to report improvement.',
      [
        { target: '越来越疼 / 越来越严重', note: 'worsening symptom report; the doctor will adjust the workup based on this' },
        { target: '越来越好', note: 'improving report; standard at a follow-up visit' },
        { target: '越来越没力气', note: '"weaker and weaker"; 没力气 is a 没-negative-state phrase ("without strength")' },
      ],
      [ACT.grammarYueYue],
    ),
    createContentItem(
      '越来越 vs 越…越…',
      'yuè lái yuè vs yuè…yuè…',
      'Two different patterns sharing the character 越 — easy to confuse. 越来越 + adj is "more and more" (progression over time). 越…越… is "the more X, the more Y" (paired clauses, conditional relationship). Don\'t mix them up.',
      'sentence',
      '我越来越饿。("I am getting hungrier and hungrier." — progression over time)\n我越吃越饿。("The more I eat, the hungrier I get." — paired clauses)',
      'The two patterns are distinct in structure, meaning, and use — but both use 越, which trips learners.',
      [
        { target: '越来越 + adj', note: 'single clause; "more and more X" over time' },
        { target: '越 V1 越 V2 / adj', note: 'paired clause; "the more V1, the more V2/adj" — conditional relationship between two changes' },
      ],
      [ACT.grammarYueYue],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '清华校医院处方单',
      'Qīnghuá xiào yīyuàn chǔfāng dān',
      'A complete Tsinghua University hospital prescription slip from an internal-medicine consultation. Notice the structure: patient block, diagnosis, prescription list with dosage and duration, then a payment breakdown showing what 医保 covered and what is 自费.',
      'sentence',
      '处方单\n· 病人: 莎拉 (Sarah)\n· 学号: 2024-CS-1138\n· 科室: 内科 (李医生)\n· 诊断: 急性支气管炎\n· 处方:\n  1. 阿莫西林胶囊 0.5g, 一日三次, 饭后服用, 共五天\n  2. 复方甘草片 3片, 一日三次, 共五天\n  3. 多喝水, 多休息\n· 化验: 血常规 (已完成)\n· 费用:\n  - 挂号费: 50元 (医保报销 40元, 自费 10元)\n  - 化验费: 80元 (医保报销 60元, 自费 20元)\n  - 药费: 120元 (医保报销 80元, 自费 40元)\n  - 自费合计: 70元\n· 复诊: 三天后, 如果症状没有改善, 请回来复诊。',
      '"Prescription Slip · Patient: Sarah · Student ID: 2024-CS-1138 · Department: Internal Medicine (Dr. Li) · Diagnosis: Acute bronchitis · Prescription: 1) Amoxicillin capsules 0.5g, 3x/day after meals for 5 days; 2) Compound licorice tablets 3 tablets, 3x/day for 5 days; 3) Drink more water, rest more. · Lab: Blood count (completed) · Costs: Registration 50元 (insurance reimburses 40, out-of-pocket 10); Lab 80元 (insurance 60, out-of-pocket 20); Medicine 120元 (insurance 80, out-of-pocket 40); Total out-of-pocket: 70元 · Follow-up: In 3 days, return if symptoms have not improved."',
      [
        { target: '急性支气管炎 jíxìng zhīqìguǎnyán', note: '"acute bronchitis" — the specific diagnosis written on a prescription; you do not need to produce this term but should recognize it' },
        { target: '一日三次 yī rì sān cì', note: '"three times a day" — standard dosing phrase on prescriptions' },
        { target: '饭后服用 fàn hòu fúyòng', note: '"take after meals" — common timing instruction; 服用 is the formal word for "take" (medicine)' },
        { target: '医保报销 / 自费', note: 'each line shows BOTH the insurance reimbursement amount AND the out-of-pocket amount — the standard transparency at Chinese hospital billing windows' },
        { target: '复诊 fùzhěn', note: '"follow-up visit"; pairs with 三天后 ("three days later") for short follow-ups' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '理解问题',
      'lǐjiě wèntí',
      'Four standard comprehension questions matching the prescription. Answer each in a short sentence using vocabulary from Activities 3 and 4. Full sentences are not required for natural Mandarin.',
      'sentence',
      'Q1: 莎拉看的是什么科?\nQ2: 医生开了几种药?\nQ3: 这次莎拉一共自费多少钱?\nQ4: 如果症状没有改善, 莎拉应该怎么办?',
      'Department question, prescription-count question, financial question, and follow-up question — covering the four practical pieces of information a patient extracts from a prescription slip.',
      [
        { target: 'A1: 内科。/ 她看的是内科。', note: 'department name as a short answer' },
        { target: 'A2: 两种药。', note: 'count with the measure word 种 ("kind / type")' },
        { target: 'A3: 70元。', note: 'numeric answer pulled from the 自费合计 line' },
        { target: 'A4: 三天后回来复诊。', note: 'short answer using the 复诊 vocabulary from the slip' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Listening
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '门诊对话 (内科)',
      'ménzhěn duìhuà (nèikē)',
      'A natural 6-turn doctor-patient dialogue at a Beijing 三甲医院 内科 (internal medicine) outpatient desk. Covers all the patterns from this unit: symptom report with duration and progression (Activity 1), V 过 history questions (Grammar I), 不仅…而且… symptom stacking (Grammar II), and 越来越 progression (Grammar III).',
      'conversation',
      '医生: 你好，请坐。哪里不舒服?\n病人: 医生您好。我已经咳嗽五天了，而且越来越严重，今天开始胸痛。\n医生: 嗯，你不仅咳嗽，而且胸痛，那需要查一下。你以前住过院吗?\n病人: 没住过院，也没做过手术。\n医生: 有没有药物过敏?\n病人: 我对青霉素过敏，其他没有。\n医生: 好的。先去化验室抽个血，然后回来拍个胸片。等结果出来我再给你开处方。\n病人: 好的，谢谢医生。请问，这些化验费医保可以报销吗?\n医生: 大部分可以报销，但是有一小部分需要自费。具体的等结账的时候问一下窗口。',
      'A complete first-visit interaction — symptom intake, history check, allergy check, lab and imaging order, prescription promise, and reimbursement question. Notice the doctor uses 您 (formal you) only initially; both shift to 你 once the medical conversation is underway, which is standard Beijing hospital practice.',
      [
        { target: '哪里不舒服?', note: 'doctor\'s standard opening — "where does it hurt / feel off?"' },
        { target: '已经…天了 + 越来越…', note: 'the duration + progression combo from Activity 1; the most expected three-part symptom report' },
        { target: '不仅…而且…', note: 'the doctor REPEATS the patient\'s pairing back at them with 不仅…而且 — a natural medical-Mandarin acknowledgment' },
        { target: '你以前住过院吗?', note: 'V 过 history question (Grammar I)' },
        { target: '药物过敏 yàowù guòmǐn', note: '"medication allergy" — a key history question; you must be ready to name the drug you are allergic to' },
        { target: '医保可以报销吗?', note: 'the patient closes with the reimbursement question; never let the visit end without asking' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      '挂号窗口对话',
      'guàhào chuāngkǒu duìhuà',
      'A short 4-turn dialogue at the 挂号 registration window — the FIRST interaction at every Chinese hospital visit. Use this to set up the longer doctor dialogue above.',
      'conversation',
      '前台: 您好，请问挂哪个科?\n你: 我要挂内科。\n前台: 普通号还是专家号?\n你: 普通号就可以。\n前台: 五十块，您扫码付款。需要带医保卡吗?\n你: 这是我的医保卡，可以用吗?\n前台: 可以的，您稍等。\n[扫卡之后]\n前台: 好了, 你的号是32号, 三楼内科候诊。',
      'Compact and practical — exactly the words you need in the first 60 seconds of any hospital visit. Notice the registration clerk\'s 您 → 你 shift mid-conversation, mirroring the doctor dialogue above.',
      [
        { target: '挂哪个科?', note: '"register for which department?" — the canonical clerk question' },
        { target: '普通号还是专家号?', note: 'tier question; foreign students typically answer 普通号 unless they have a referral' },
        { target: '扫码付款 sǎo mǎ fùkuǎn', note: '"scan QR code to pay"; standard Chinese mobile payment at the hospital window' },
        { target: '候诊 hòuzhěn', note: '"wait to be seen"; the verb for waiting in the outpatient area for your number to be called' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '病情描述模板',
      'bìngqíng miáoshù múbǎn',
      'A reusable five-sentence template for describing your medical complaint to a doctor — written first, then read aloud. Fill in the bracketed slots with your own symptoms. Use V 过 at least once, 不仅…而且… at least once, and 越来越 at least once.',
      'sentence',
      '医生您好。我已经 [症状] [N] 天了，而且 [越来越…]。我不仅 [症状A], 而且 [症状B]。我以前 [V 过 / 没 V 过] 这种情况。请问我应该 [挂哪个科 / 做什么检查]?',
      '"Doctor, hello. I have already had [symptom] for [N] days, and it is getting [more and more …]. I not only [symptom A] but also [symptom B]. I have [had / never had] this situation before. May I ask whether I should [register for which department / get what test]?"',
      [
        { target: '[症状] [N] 天了', note: 'duration block: name a symptom + number of days + 了' },
        { target: '越来越 [adj]', note: 'progression block; pick from 严重, 疼, 没力气, 好' },
        { target: '不仅 [A] 而且 [B]', note: 'symptom-stacking block; minor → major' },
        { target: 'V 过 / 没 V 过', note: 'history block; ties back to Grammar I' },
        { target: '挂哪个科 / 做什么检查', note: 'closing question; signals you expect concrete next steps' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '写作练习',
      'xiězuò liànxí',
      'Write your own 4–5 sentence medical complaint using the template. Read it aloud once with formal-polite tone (您 with the doctor, no casual interjections), then revise for natural rhythm.',
      'sentence',
      '示例: 医生您好。我已经发烧三天了, 而且越来越没力气。我不仅发烧, 而且头疼得厉害。我以前没住过院, 也没做过手术。请问我应该挂内科还是急诊?',
      '"Doctor, hello. I have already had a fever for three days, and I am getting weaker and weaker. I not only have a fever but also a severe headache. I have never been hospitalized or had surgery. Should I register for internal medicine or the emergency department?"',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '医院分级',
      'yīyuàn fēnjí',
      'China\'s hospital system is officially divided into three tiers (级 jí) and three grades (等 děng): 一甲 (Tier-1, basic local clinic), 二甲 (Tier-2, district hospital), 三甲 (Tier-3, top-tier national/provincial). The "甲" (jiǎ, "Grade A") suffix marks the highest grade within each tier. In practice, "三甲医院" is the household phrase — patients across China bypass smaller clinics to come to a 三甲, which is why these hospitals are perpetually crowded.',
      'sentence',
      '我邻居从四川来北京看病, 一定要去三甲医院。',
      '"My neighbor came from Sichuan to Beijing for medical care; she insists on going to a Tier-3 Grade-A hospital." — captures the cross-provincial migration to top hospitals that defines Chinese healthcare strain.',
      [
        { target: '一甲 yījiǎ', note: 'Tier-1 Grade-A; basic local / community clinic; cheap but limited specialties' },
        { target: '二甲 èrjiǎ', note: 'Tier-2 Grade-A; district hospital; mid-range capability' },
        { target: '三甲 sānjiǎ', note: 'Tier-3 Grade-A; top tier; teaching, research, full specialty range; perpetually crowded' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '挂号难 + 黄牛',
      'guàhào nán + huángniú',
      'Top doctors\' 挂号 slots at famous 三甲医院 disappear within seconds of opening online. This scarcity has spawned the 黄牛 (literally "yellow ox") phenomenon — scalpers who buy slots and resell at a markup, often for 500–3000 yuan above the official fee. The practice is officially illegal and periodically cracked down on, but persists because demand far outstrips supply. Foreign students should NOT use 黄牛 — your university health office can usually arrange legitimate referrals.',
      'sentence',
      '专家号被黄牛抢走了, 普通人很难挂上号。',
      '"Specialist slots have been snatched up by scalpers; ordinary people find it very hard to register." — a common patient complaint heard outside any major 三甲.',
      [
        { target: '挂号难 guàhào nán', note: '"registering is hard"; the famous national-policy phrase capturing the structural shortage' },
        { target: '黄牛 huángniú', note: '"scalper"; literally "yellow ox"; sells scarce slots/tickets above face value' },
        { target: '抢号 qiǎng hào', note: '"snatch a slot"; describes the online race to register the moment slots open' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '医保覆盖',
      'yībǎo fùgài',
      'China\'s 医保 (universal health insurance) covers most citizens — under different schemes for urban employees, urban residents, and rural residents — but coverage is partial. Each procedure and drug has a reimbursement ratio; the rest is 自费 (out-of-pocket). Foreign students typically have a SEPARATE university-arranged or private policy; always confirm at the registration window whether your card is accepted before assuming coverage.',
      'sentence',
      '留学生需要单独买医疗保险, 中国的医保一般不直接覆盖。',
      '"International students need to buy separate medical insurance; Chinese national health insurance generally does not directly cover them." — the standard policy fact every foreign student in China should know.',
      [
        { target: '医保覆盖率', note: '"insurance coverage rate"; the percentage of a given expense that gets reimbursed' },
        { target: '自付比例 zìfù bǐlì', note: '"out-of-pocket ratio"; the percentage you pay yourself' },
        { target: '留学生医保', note: '"international student health insurance"; usually arranged through the university, not the national 医保 system' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '中医 vs 西医',
      'zhōngyī vs xīyī',
      'Chinese hospitals operate Traditional Chinese Medicine (中医) and Western medicine (西医) in PARALLEL — sometimes in separate departments within a 三甲医院, sometimes in entirely separate hospitals (中医院). Patients freely choose between them. Chronic and lifestyle conditions are often treated with 中医; acute trauma, infection, and surgery default to 西医. Both are covered by 医保 at different rates.',
      'sentence',
      '我感冒先吃中药, 不行再去西医看。',
      '"For a cold I first take Chinese medicine; if that doesn\'t work, I see a Western-medicine doctor." — captures the everyday parallel use most Chinese patients practice.',
      [
        { target: '中医院 zhōngyī yuàn', note: 'a hospital specializing in TCM; many large cities have one' },
        { target: '西医 xīyī', note: '"Western medicine"; biomedicine in Chinese hospital terminology' },
        { target: '中西医结合 zhōng-xī yī jiéhé', note: '"integrated Chinese and Western medicine"; a recognized specialty in modern Chinese hospitals' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '红包 + 关系',
      'hóngbāo + guānxi',
      'Historically, patients tipped surgeons with 红包 (red envelopes of cash) before operations to secure attentive care. The practice was officially banned in the 2010s and is now illegal, but lingers as a public-discussion topic. The related but distinct practice of using 关系 (personal connections) to skip queues or access top doctors is technically legal but ethically contested. Foreign patients should NEITHER offer 红包 NOR rely on 关系 — both can create more problems than they solve.',
      'sentence',
      '红包现在禁止了, 但是有些病人还是会偷偷给。',
      '"Red envelopes are now banned, but some patients still give them in secret." — captures the gap between official policy and lingering practice.',
      [
        { target: '红包 hóngbāo', note: '"red envelope"; cash tip historically given to doctors before surgery; now banned' },
        { target: '关系 guānxi', note: '"personal connections / network"; can open doors at hospitals but ethically contested' },
        { target: '插队 chā duì', note: '"cutting the queue"; what 关系 effectively does at busy 三甲医院' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '任务: 一次完整的看病',
      'rènwù: yī cì wánzhěng de kànbìng',
      'Roleplay a full visit to a Beijing 三甲医院 with the AI tutor playing three roles in turn — the 挂号 clerk, the 内科 doctor, and the 药房 / 结账 cashier. Combine every skill from this lesson into one continuous scene: register at internal medicine, describe symptoms with duration and progression, answer medical history questions with V 过, agree to a blood test, receive a prescription, and ask about reimbursement at the cashier.',
      'conversation',
      '[挂号窗口]\n前台: 您好，请问挂哪个科?\n你: [挂号 + 选普通号/专家号]\n前台: 这是您的号, 三楼候诊。\n\n[内科 — 李医生]\n医生: 请坐。哪里不舒服?\n你: [症状报告: 已经…天了 + 越来越… + 不仅…而且…]\n医生: 你以前住过院吗? 做过手术吗?\n你: [V 过 / 没 V 过 答案]\n医生: 那我们先抽个血看看。这是化验单。\n你: [接化验单 + 谢谢]\n\n[抽血 + 等结果]\n护士: 请坐这里, 把袖子卷起来。\n你: [配合 + 简短回应]\n\n[回到诊室]\n医生: 化验结果出来了, 我给你开个处方。\n你: [谢谢 + 问问题]\n\n[药房 / 结账]\n收费: 一共120元。\n你: [问 医保 + 报销]',
      'Eight-turn flow covering every stage of a Chinese hospital visit; the AI tutor will adapt to your specific symptoms and history answers.',
      [
        { target: '挂号', note: 'opening turn; use 我要挂内科 + 普通号就可以' },
        { target: '症状报告', note: 'three-part: 已经…天了 + 越来越… + 不仅…而且…' },
        { target: 'V 过 答案', note: 'medical history; affirmative (V 过) or negative (没 V 过 / 从来没 V 过)' },
        { target: '问 医保', note: 'closing turn at the cashier; "这些可以报销吗?" + "自费多少?"' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战: 急诊版本',
      'tiǎozhàn: jízhěn bǎnběn',
      'Stretch goal: in the same scene, run the emergency-department variant instead of outpatient. The pace is faster, the triage is sharper, and the doctor will press you for the WORST symptom first. Use 越来越 + 严重 to communicate urgency.',
      'conversation',
      '急诊护士: 怎么了? 哪里最不舒服?\n你: 我胸痛, 而且越来越严重, 还喘不上气。\n急诊医生: 从什么时候开始的?\n你: 大概两个小时前。我以前没做过心脏检查。\n急诊医生: 好, 我们先做心电图, 然后拍胸片。可能需要住院观察。\n你: 好的, 谢谢医生。请问家属需要做什么?',
      'The emergency variant compresses everything into 4 turns; the doctor jumps straight to imaging and admission. Notice the patient closes with a 家属 (family) question — a culturally expected concern in Chinese emergency contexts.',
      [
        { target: '哪里最不舒服?', note: '"where is the WORST (discomfort)?" — emergency triage version of 哪里不舒服?' },
        { target: '越来越严重', note: 'urgency signal; the doctor will fast-track based on this phrase' },
        { target: '心电图 xīndiàntú', note: '"ECG / EKG"; standard first test for chest pain in emergency' },
        { target: '家属 jiāshǔ', note: '"family member"; Chinese emergency departments expect a family contact and may ask the patient to call one' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
