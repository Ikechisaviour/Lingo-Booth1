// Level 2 Adult Unit 7 — Safety & Emergencies (Mandarin Chinese)
// Functions: report an emergency, describe what happened, give and receive
// safety instructions, file a police report at the local 派出所.
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
  orientation: 'zh-l2au7-orientation',
  pronunciation: 'zh-l2au7-pronunciation',
  vocabularyEmergency: 'zh-l2au7-vocab-emergency',
  vocabularyIncidents: 'zh-l2au7-vocab-incidents',
  vocabularyInstructions: 'zh-l2au7-vocab-instructions',
  grammarBei: 'zh-l2au7-grammar-bei',
  grammarYibian: 'zh-l2au7-grammar-yibian',
  grammarObligation: 'zh-l2au7-grammar-obligation',
  reading: 'zh-l2au7-reading',
  listening: 'zh-l2au7-listening',
  writing: 'zh-l2au7-writing',
  culture: 'zh-l2au7-culture',
  task: 'zh-l2au7-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Report an emergency by phone in Mandarin — say what happened, where, and to whom — using the correct emergency number (110/119/120/122).',
      'Describe a past incident using the 被 (bèi) passive marker for things that happened TO you (我的钱包被偷了).',
      'Give and receive urgent safety instructions (别动! 站住! 小心!) and graded obligation language (应该 / 必须 / 不能).',
    ],
    task: 'Picture this: you finish a late dinner near 清华大学 and realize your phone is missing. You walk to the nearest 派出所 (local police box) to file a report. By the end of this lesson you should handle the full exchange in Mandarin.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: '发音 — Emergency phrases that must come out clearly',
    goals: [
      'Pronounce 报警 (bàojǐng) with the 4+3 contour — the second syllable carries third-tone sandhi when followed by another third-tone syllable in connected speech.',
      'Pronounce 救护车 (jiùhùchē) cleanly across three sharp fourth tones followed by a first tone — common stumbling block for English speakers.',
      'Apply the 着 (zháo vs zhe) reading rule: in 着火 (zháohuǒ, "on fire") the character reads zháo, NOT the toneless zhe used as a verb suffix.',
      'Pronounce 被 (bèi) with a sharp fourth tone — under-stressing it makes the passive structure ambiguous and hard for listeners to parse.',
    ],
    task: 'Read each emergency phrase aloud three times with the correct tones; an unclear emergency call wastes seconds you may not have.',
  },
  {
    id: ACT.vocabularyEmergency,
    section: 'Vocabulary I',
    title: 'Emergency numbers, services, and core nouns',
    goals: [
      'Memorize the four Chinese emergency numbers (110 police, 119 fire, 120 ambulance, 122 traffic) and which situation each one is for.',
      'Use the core emergency nouns: 救护车 (ambulance), 消防车 (fire truck), 警察 (police), 派出所 (local police station), 急救 (first aid), 紧急 (urgent), 安全 (safe), 危险 (dangerous).',
    ],
    task: 'Match each of the four emergency numbers to a scenario (kitchen fire, car crash with injuries, stolen wallet, fender-bender) and explain why.',
  },
  {
    id: ACT.vocabularyIncidents,
    section: 'Vocabulary II',
    title: 'Describing what happened — incident verbs',
    goals: [
      'Describe incidents using high-frequency verbs: 出事了 (something happened), 出车祸 (had a car accident), 着火 (on fire), 漏水 (water leak), 漏电 (electrical leak), 受伤 (injured), 摔倒 (fell down), 偷 (steal), 抢 (rob), 报案 (file a report).',
      'Form the perfective with 了 to mark a completed incident: 出事了, 着火了, 摔倒了 — the 了 signals "it has happened, deal with it now".',
    ],
    task: 'Describe five different incidents using the correct verb + 了 pattern; then say which emergency number you would call for each.',
  },
  {
    id: ACT.vocabularyInstructions,
    section: 'Vocabulary III',
    title: 'Urgent instructions and warnings',
    goals: [
      'Give urgent one-word commands: 别动! (don\'t move!), 站住! (stop!), 离开! (leave!), 让开! (step aside!), 小心! (be careful!).',
      'Distinguish 别 (bié, don\'t) from 不要 (bùyào, also "don\'t") — 别 is shorter, sharper, and more common in spoken emergencies.',
    ],
    task: 'Practice giving each instruction with the right urgency and volume; emergency commands fail if delivered too softly or politely.',
  },
  {
    id: ACT.grammarBei,
    section: 'Grammar I',
    title: '被 + agent + V — the passive construction',
    goals: [
      'Use the 被 (bèi) passive to say something happened TO the subject: 我的钱包被偷了 ("my wallet got stolen"). Companion structure to last unit\'s 把 (active disposal).',
      'Form: SUBJECT + 被 + (AGENT) + V + 了/COMPLEMENT. The agent (the person/thing doing the action) is optional and often omitted when unknown.',
      'Know that 被 in Mandarin carries a slight "adversity" connotation — it\'s used most often for unfortunate things that happen to you (theft, injury, scolding), less often for neutral or positive events.',
    ],
    task: 'Convert five active sentences (someone stole X, someone hit Y) into passive form using 被 — then say each one aloud as if reporting it to a police officer.',
  },
  {
    id: ACT.grammarYibian,
    section: 'Grammar II',
    title: '一边…一边… — two actions at once',
    goals: [
      'Use the paired construction 一边 V1 一边 V2 to express two simultaneous actions performed by the same subject: 一边打电话一边按住伤口 ("call 120 while pressing on the wound").',
      'Know that both 一边 phrases share the same subject — you cannot use this pattern when two different people are doing the two actions.',
      'Recognize that emergency situations frequently call for simultaneous actions (calling for help while applying first aid, watching the scene while waving for an ambulance), making this construction core safety vocabulary.',
    ],
    task: 'Form three 一边…一边… sentences describing what you would do simultaneously in three different emergencies.',
  },
  {
    id: ACT.grammarObligation,
    section: 'Grammar III',
    title: '应该 / 必须 / 不能 — three levels of obligation',
    goals: [
      'Use 应该 (yīnggāi, "should") for soft obligation or expectation — 你应该报警 ("you should call the police").',
      'Use 必须 (bìxū, "must") for strict requirement — 必须戴安全帽 ("must wear a safety helmet"). Stronger than 应该, used in workplace rules and legal contexts.',
      'Use 不能 (bùnéng, "cannot / must not") for prohibition — 不能在这里抽烟 ("cannot smoke here"). The everyday spoken negative of 必须.',
      'Order from softest to strongest: 应该 < 必须. The negative scale: 不应该 < 不能 < 不可以 < 禁止.',
    ],
    task: 'Write three safety rules at three different strength levels — one with 应该, one with 必须, one with 不能 — and read them aloud as if you were a building safety officer.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: '安全须知 — Safety notice on the dormitory wall',
    goals: [
      'Read a posted safety notice from a Tsinghua dormitory and extract the rules, prohibited items, and emergency contact procedure.',
      'Answer comprehension questions about which number to call in different scenarios using complete short sentences.',
    ],
    task: 'Read the notice aloud, then answer five comprehension questions about which procedure applies to which incident.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: '听和说 — Reporting a stolen phone at the 派出所',
    goals: [
      'Follow a 6-turn dialogue between a foreign student and a 警察 (police officer) at the neighborhood 派出所 near Tsinghua.',
      'Reproduce the dialogue with your own stolen item — replace the phone with a wallet, a backpack, or a bicycle and adjust the timeline accordingly.',
    ],
    task: 'Listen to the model dialogue, then perform it again as the victim with your own details swapped in.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: '写作 — Filing a written incident report',
    goals: [
      'Write a 5-line incident report covering: date/time, location, what was lost, what you were doing when it happened, and the contact information for follow-up.',
      'Use 被 at least twice (for the stolen item and for any related actions you experienced) and a graded-obligation modal at least once.',
    ],
    task: 'Write a complete 报案记录 (incident report) for a stolen phone using the model on the left as a template.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: '文化 — Safety culture in Mainland China',
    goals: [
      'Know which emergency number to call when (110 police, 119 fire, 120 ambulance, 122 traffic) — calling the wrong one wastes time.',
      'Understand the role of 物业 (property management) in apartment emergencies and 保安 (security guards) at building entrances — often your first responders before the police arrive.',
      'Recognize what a 派出所 looks like: a small neighborhood police box, usually within a 10-minute walk of any residential area, NOT a large precinct station.',
      'Understand 平安出行 (peaceful travel) culture and the ubiquity of 摄像头 (CCTV cameras) in Chinese cities — public crime is often resolved by reviewing nearby camera footage.',
    ],
    task: 'For each of five emergency scenarios, decide whether to call 110, 119, 120, 122, the 物业, or the building 保安 first — and explain why.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: '任务 — Roleplay: reporting a stolen phone at the 派出所 near Tsinghua',
    goals: [
      'Combine vocabulary + grammar (被 passive, 一边 simultaneity, obligation modals) into a continuous roleplay at the 派出所.',
      'Answer the officer\'s follow-up questions about when and where it happened, what you were doing, what was stolen, and your contact information.',
    ],
    task: 'Roleplay reporting a stolen phone at the 派出所 near 清华大学 — describe when/where it happened, what you were doing, what was stolen, and answer the officer\'s follow-up questions.',
  },
];

const lesson = {
  title: 'Level 2 (Adult) · Unit 7: 出事了 — Safety & Emergencies',
  category: 'business',
  difficulty: 'intermediate',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'calling-emergency', label: 'Calling an emergency number', goal: 'Open with the correct number (110/119/120/122), state what happened and where, in 2-3 sentences without panicking.' },
    { id: 'describing-incident', label: 'Describing what happened', goal: 'Use 被 + agent + V + 了 to report something that happened to you (theft, injury, accident).' },
    { id: 'filing-police-report', label: 'Filing a report at the 派出所', goal: 'Walk into a neighborhood police station, explain the incident, and answer the officer\'s follow-up questions.' },
    { id: 'giving-urgent-instructions', label: 'Giving urgent instructions', goal: 'Issue clear emergency commands (别动! 站住! 小心!) and the appropriate obligation modal for the situation.' },
  ],
  relatedPools: ['topic-society', 'topic-health'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '本课目标',
      'běn kè mùbiāo',
      'By the end of this lesson, you can report an emergency by phone, describe what happened using the 被 passive, give and receive urgent instructions, and file a written incident report at the local 派出所 — all in fluent Mandarin without rehearsing each line.',
      'word',
      'Functions: 报警 bàojǐng (call police) · 描述事故 miáoshù shìgù (describe accident) · 求救 qiújiù (call for help) · 报案 bào\'àn (file a report)',
      'These four micro-skills are the spine of every safety encounter in Mandarin-speaking environments — once they are automatic, you can navigate any emergency in China.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      '今天的情境',
      'jīntiān de qíngjìng',
      'You finish a late dinner near 清华大学 and realize on the subway home that your phone is gone. You get off at the next stop, walk back to the nearest 派出所, and file a report. The whole exchange takes about 5 minutes and you need every micro-skill from this lesson.',
      'word',
      '你: 警察同志，我要报案。我的手机被偷了。\n警察: 什么时候、在哪里被偷的?',
      'A typical opening: address the officer as 警察同志 ("officer comrade", neutral and respectful) + state your purpose with 报案 + use the 被 passive to describe the loss. The officer immediately asks for time and place.',
      [
        { target: '警察同志 jǐngchá tóngzhì', note: 'standard respectful address for a police officer; 同志 ("comrade") is neutral and broadly safe in official contexts' },
        { target: '报案 bào\'àn', note: 'to file a police report; the technical verb for what you are doing at the 派出所' },
        { target: '被偷了 bèi tōu le', note: 'passive: "got stolen"; the 被 + V + 了 pattern carries the grammar load of this whole lesson' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '中国的紧急电话',
      'Zhōngguó de jǐnjí diànhuà',
      'Mainland China has four separate emergency numbers, each for a different service. Calling the wrong one wastes precious seconds and may trigger a transfer — know which number maps to which crisis before you need to dial.',
      'word',
      '110 警察 · 119 消防 · 120 急救 · 122 交通',
      'These four numbers cover ~95% of emergency situations in Mainland China; memorize them as automatically as you know "911".',
      [
        { target: '110 警察 jǐngchá', note: 'police — for theft, assault, lost children, suspicious activity, missing persons' },
        { target: '119 消防 xiāofáng', note: 'fire department — for fires, gas leaks, structural collapse, people trapped in elevators' },
        { target: '120 急救 jíjiù', note: 'ambulance / medical emergency — for injuries, heart attacks, breathing problems' },
        { target: '122 交通 jiāotōng', note: 'traffic police — for car accidents without serious injuries; if there are injuries call 120 AND 122' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '紧急程度',
      'jǐnjí chéngdù',
      'Mandarin distinguishes three rough urgency levels in safety language. Soft (should do): 应该 yīnggāi. Strict (must do): 必须 bìxū. Prohibition (must not do): 不能 bùnéng. Match the modal to the situation — a fire is 必须离开, a slippery floor is 应该小心.',
      'word',
      '应该 yīnggāi (should) < 必须 bìxū (must) — and 不能 bùnéng / 禁止 jìnzhǐ as the negative scale.',
      'The choice of modal signals how urgently you need the listener to act; matching the modal to the real urgency is part of speaking like a native.',
      [
        { target: 'SOFT: 应该 yīnggāi', note: 'used for recommendations and expectations — 你应该报警 "you should call the police"' },
        { target: 'STRICT: 必须 bìxū', note: 'used for legal/safety requirements — 必须戴安全帽 "must wear a safety helmet"' },
        { target: 'PROHIBITION: 不能 bùnéng / 禁止 jìnzhǐ', note: '不能 is conversational; 禁止 appears on signs — 禁止吸烟 "no smoking"' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '报警',
      'bàojǐng',
      '"Call the police" — fourth tone 报 (sharp falling) + third tone 警 (dip-and-rise). Said in isolation the third tone is full; in fast speech before another word starting on a tone the 警 often shortens to a low pitch.',
      'word',
      '我要报警! wǒ yào bàojǐng! ("I want to call the police!")',
      'Pronounce the 报 with a decisive falling pitch — undersold, it merges with other 4th-tone words and slows the listener down.',
      [
        { target: '报 (bào, 4th)', note: 'sharp falling tone; "report"' },
        { target: '警 (jǐng, 3rd)', note: 'dip-and-rise; "police / alert"' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '救护车',
      'jiùhùchē',
      '"Ambulance" — three syllables: 4th + 4th + 1st. The three sharp falls followed by a high level tone are a common English-speaker stumble; rehearse the rhythm DA-DA-MA (fall-fall-flat).',
      'word',
      '快叫救护车! kuài jiào jiùhùchē! ("Call an ambulance quickly!")',
      'If you blur the tones, native listeners may hear 救护车 as something else under stress — clean fourth tones save seconds.',
      [
        { target: '救 (jiù, 4th)', note: 'sharp falling tone; "rescue"' },
        { target: '护 (hù, 4th)', note: 'sharp falling tone; "protect / nurse"' },
        { target: '车 (chē, 1st)', note: 'high level tone; "vehicle"' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '着火',
      'zháohuǒ',
      '"On fire / catch fire" — a critical reading trap. The character 着 has three readings: zháo (catch / be affected by), zhe (verb-suffix marking ongoing action, neutral tone), and zhāo (move in chess). In 着火, the reading is zháo (2nd tone), NEVER the toneless zhe.',
      'word',
      '楼上着火了! lóushàng zháohuǒ le! ("The upstairs is on fire!")',
      'Reading 着火 as "zhe huǒ" instead of "zháo huǒ" sounds like nonsense to native ears — this is one of the most-tested pronunciation distinctions in HSK.',
      [
        { target: '着 (zháo, 2nd)', note: 'rising tone; "catch / be affected by" — the reading used in 着火, 着急 (zháojí, anxious)' },
        { target: '着 (zhe, neutral)', note: 'toneless suffix marking ongoing action — 看着 kànzhe "looking at"; do NOT use this reading in 着火' },
        { target: '火 (huǒ, 3rd)', note: 'dip-and-rise; "fire"' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '被',
      'bèi',
      'Fourth tone — the passive marker that carries the grammar of this entire lesson. Under-stressing 被 makes the passive structure ambiguous; aim for a sharp, decisive fall.',
      'word',
      '我的钱包被偷了。wǒ de qiánbāo bèi tōu le. ("My wallet got stolen.")',
      'Compare with 杯 (bēi, 1st, "cup") which has the same vowel but a different tone — careless pronunciation can turn a serious report into noise.',
      [
        { target: '被 (bèi, 4th)', note: 'passive marker; always sharp falling' },
        { target: '杯 (bēi, 1st) — contrast', note: 'first tone, level pitch; means "cup" — same vowel as 被 but different tone and meaning' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '出事了',
      'chū shì le',
      '"Something happened / there\'s been an accident" — three syllables: 1st + 4th + neutral. The 了 reduces to a quick neutral-tone fade after the strong fourth tone of 事 (shì).',
      'word',
      '出事了! 快来! chū shì le! kuài lái! ("Something happened! Come quick!")',
      'The phrase carries no specific content — listeners infer urgency from the rising panic in your voice, so emphasize the 事 with a sharp fall.',
      [
        { target: '出 (chū, 1st)', note: 'high level; "occur / come out"' },
        { target: '事 (shì, 4th)', note: 'sharp falling; "matter / incident"' },
        { target: '了 (le, neutral)', note: 'perfective marker; reduced to a quick fade' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Emergency numbers, services, core nouns
    // ────────────────────────────────────────────────────────────────────
    createContentItem('110', '一一零 yāo yāo líng', 'The Chinese police emergency number — call for theft, assault, lost children, suspicious activity, missing persons. Note that "1" is pronounced "yāo" (not "yī") when reading numbers digit-by-digit, to avoid confusion with "7" (qī).', 'word', '请打110报警。 qǐng dǎ yāo yāo líng bàojǐng. ("Please dial 110 to call the police.")', 'Memorize as automatically as "911"; the digit-by-digit "yāo yāo líng" reading is mandatory for emergency numbers.', null, [ACT.vocabularyEmergency]),
    createContentItem('119', '一一九 yāo yāo jiǔ', 'The Chinese fire department emergency number — call for fires, gas leaks, structural collapse, people trapped in elevators. 119 firefighters in Chinese cities often arrive within 5-8 minutes in dense urban areas.', 'word', '着火了！快打119！ zháohuǒ le! kuài dǎ yāo yāo jiǔ! ("Fire! Quickly dial 119!")', 'Mnemonic: think "fire is rare so the number is rare-sounding (yāo yāo jiǔ)".', null, [ACT.vocabularyEmergency]),
    createContentItem('120', '一二零 yāo èr líng', 'The Chinese medical emergency / ambulance number — call for injuries, heart attacks, breathing problems, anything requiring an ambulance. 120 dispatches the nearest 救护车 (ambulance) and an emergency medical team.', 'word', '有人受伤了，请叫120。 yǒu rén shòushāng le, qǐng jiào yāo èr líng. ("Someone is injured, please call 120.")', 'If both an ambulance AND police are needed (e.g., a serious accident), call 120 first because medical care is time-critical, then 122.', null, [ACT.vocabularyEmergency]),
    createContentItem('122', '一二二 yāo èr èr', 'The Chinese traffic-police emergency number — call for car accidents without serious injuries (fender-benders, minor scrapes). For accidents with injuries, call 120 first and 122 second.', 'word', '出车祸了，请打122。 chū chēhuò le, qǐng dǎ yāo èr èr. ("There\'s been a car accident, please dial 122.")', '122 handles vehicle accident documentation and insurance paperwork on-scene; many Chinese drivers call 122 even for tiny scrapes to get the official report needed for insurance claims.', null, [ACT.vocabularyEmergency]),
    createContentItem('警察', 'jǐngchá', 'Police officer; the standard term used both for the profession and as direct address. The official-sounding alternative 民警 (mínjǐng, "people\'s police") appears in formal contexts and on uniforms.', 'word', '警察来了。 jǐngchá lái le. ("The police are here.")', 'Address an officer directly as 警察同志 (jǐngchá tóngzhì, "officer-comrade"); 同志 is a neutral honorific that remains safe in official settings.', null, [ACT.vocabularyEmergency]),
    createContentItem('派出所', 'pàichūsuǒ', 'Local neighborhood police station — a small precinct, typically the size of a corner shop, located within a 10-minute walk of any residential area. The first point of contact for most non-emergency reports and the place you visit to file a 报案 (report).', 'word', '附近有派出所吗? fùjìn yǒu pàichūsuǒ ma? ("Is there a local police station nearby?")', 'Distinct from 公安局 (gōng\'ānjú, "Public Security Bureau") which is the larger district headquarters; for student-life incidents (lost phone, stolen bike, noise complaint) you go to 派出所, not 公安局.', null, [ACT.vocabularyEmergency]),
    createContentItem('救护车', 'jiùhùchē', 'Ambulance — the vehicle dispatched by 120. Note the three-character compound: 救 (rescue) + 护 (protect/nurse) + 车 (vehicle).', 'word', '救护车马上就到。 jiùhùchē mǎshàng jiù dào. ("The ambulance is arriving immediately.")', '马上 (mǎshàng, "immediately") is the standard adverb for imminent arrival in emergency contexts.', null, [ACT.vocabularyEmergency]),
    createContentItem('消防车', 'xiāofángchē', 'Fire truck — the vehicle dispatched by 119. Compound: 消 (extinguish) + 防 (defend) + 车 (vehicle).', 'word', '消防车堵在路上了。 xiāofángchē dǔ zài lùshàng le. ("The fire truck is stuck in traffic.")', 'In dense Chinese cities, 消防车 sometimes face heavy traffic — the fire department asks bystanders to clear lanes by waving and shouting 让开 (làngkāi, "step aside!").', null, [ACT.vocabularyEmergency]),
    createContentItem('急救', 'jíjiù', 'First aid / emergency medical care; both the noun (first aid as a service) and the verb (to administer first aid). The 120 system is sometimes called 急救中心 (jíjiù zhōngxīn, "emergency care center").', 'word', '我会急救。 wǒ huì jíjiù. ("I know first aid.")', 'In Chinese workplaces and schools, basic 急救 training is increasingly mandatory; many companies require staff to renew certification annually.', null, [ACT.vocabularyEmergency]),
    createContentItem('紧急', 'jǐnjí', 'Urgent / emergency (as an adjective). Used in compounds like 紧急情况 (jǐnjí qíngkuàng, "emergency situation"), 紧急出口 (jǐnjí chūkǒu, "emergency exit"), 紧急联系人 (jǐnjí liánxìrén, "emergency contact").', 'word', '这是紧急情况。 zhè shì jǐnjí qíngkuàng. ("This is an emergency.")', 'Stronger than 急 (jí, "anxious/quick"); 紧急 signals "drop everything else now".', null, [ACT.vocabularyEmergency]),
    createContentItem('安全', 'ānquán', '"Safe / safety" — both adjective and noun. Used as 安全 (safe), 安全带 (seatbelt), 安全帽 (safety helmet), 安全门 (safety door). The opposite of 危险.', 'word', '这里安全吗? zhèlǐ ānquán ma? ("Is it safe here?")', 'High-frequency word in any safety context; pair it with the modals you learn this lesson (必须安全, 应该注意安全).', null, [ACT.vocabularyEmergency]),
    createContentItem('危险', 'wēixiǎn', '"Dangerous / danger" — both adjective and noun. The opposite of 安全. Frequently appears on warning signs as 危险! (DANGER!) followed by a specific hazard.', 'word', '小心！前面有危险！ xiǎoxīn! qiánmiàn yǒu wēixiǎn! ("Careful! There\'s danger ahead!")', 'Use 很危险 (hěn wēixiǎn, "very dangerous") for everyday warnings and bare 危险! on signage.', null, [ACT.vocabularyEmergency]),
    createContentItem('受伤', 'shòushāng', '"Injured / get injured" — a stative verb. 受 (receive) + 伤 (wound). Inserts a measure word or noun between the two characters for severity: 受重伤 (shòu zhòng shāng, "seriously injured"), 受轻伤 (shòu qīng shāng, "lightly injured").', 'word', '有人受伤了吗? yǒu rén shòushāng le ma? ("Is anyone injured?")', 'Standard first question from emergency dispatchers — be ready to answer 有 (yes) or 没有 (no) immediately.', null, [ACT.vocabularyEmergency]),
    createContentItem('保安', 'bǎo\'ān', '"Security guard" — the uniformed staff at the entrance of every Chinese residential compound, office building, mall, and university. Often your fastest first responder; report incidents to the 保安 before walking to the 派出所.', 'word', '门口的保安看见了。 ménkǒu de bǎo\'ān kànjiàn le. ("The security guard at the entrance saw it.")', '保安 typically have direct radio contact with 派出所 and can call in officers within minutes for serious incidents.', null, [ACT.vocabularyEmergency]),
    createContentItem('物业', 'wùyè', 'Property management — the company that runs your apartment compound or office building. For leaks, broken locks, lost-and-found, and many non-criminal emergencies, you contact 物业 BEFORE the police. They have keys, contractors, and 24-hour staff.', 'word', '漏水了，先找物业。 lòushuǐ le, xiān zhǎo wùyè. ("There\'s a leak, contact property management first.")', 'A core piece of Mainland apartment life — 物业 handles water, electricity, elevators, parking, and security inside the compound.', null, [ACT.vocabularyEmergency]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: Incidents and what happened
    // ────────────────────────────────────────────────────────────────────
    createContentItem('出事了', 'chū shì le', '"Something happened / there\'s been an incident" — the universal "we have a problem" opener. Carries no specific content; the listener responds 什么事? (shénme shì? "what is it?") to get details. Pairs with 急! (jí! "urgent!") for added urgency.', 'word', '快来！出事了！ kuài lái! chū shì le! ("Come quick! Something happened!")', 'Used by everyone from kids reporting a broken vase to building security calling the police — the urgency comes from the tone, not the words.', null, [ACT.vocabularyIncidents]),
    createContentItem('出车祸', 'chū chēhuò', '"Have / get into a car accident" — the verb 出 (occur) + the noun 车祸 (car accident). The 出 + INCIDENT pattern is productive: 出事 (something happened), 出车祸 (car accident), 出问题 (have a problem).', 'word', '路口出车祸了。 lùkǒu chū chēhuò le. ("There was a car accident at the intersection.")', 'For accidents with injuries, follow with 有人受伤 ("there are injuries") so dispatchers know to send 120 alongside 122.', null, [ACT.vocabularyIncidents]),
    createContentItem('出事故', 'chū shìgù', '"Have / get into an accident" — a slightly more formal alternative to 出车祸, used for any kind of accident (not just vehicles). 事故 (shìgù) is the formal "accident / incident".', 'word', '工地上出事故了。 gōngdì shàng chū shìgù le. ("There\'s been an accident at the construction site.")', 'Standard term in news reports, insurance claims, and workplace incident logs.', null, [ACT.vocabularyIncidents]),
    createContentItem('着火', 'zháohuǒ', '"To catch fire / be on fire" — a verb. Reading note: the 着 here is zháo (2nd tone), NOT the toneless zhe used as a verb suffix elsewhere. Pair with 了 to report a current fire: 着火了! ("Fire!").', 'word', '楼上着火了，快下楼! lóushàng zháohuǒ le, kuài xiàlóu! ("The upstairs is on fire, get downstairs quickly!")', 'The single most important fire-related verb; getting the zháo reading right matters when you only have seconds to communicate.', null, [ACT.vocabularyIncidents]),
    createContentItem('漏水', 'lòushuǐ', '"Water leak" — both noun and verb. 漏 (leak) + 水 (water). Pair with the source: 楼上漏水 ("upstairs is leaking water"), 水管漏水 ("the water pipe is leaking").', 'word', '厨房漏水了。 chúfáng lòushuǐ le. ("The kitchen has a leak.")', 'First call: 物业 (property management), not 110 — water leaks are maintenance issues, not police matters.', null, [ACT.vocabularyIncidents]),
    createContentItem('漏电', 'lòudiàn', '"Electrical leak / electric leakage" — 漏 (leak) + 电 (electricity). A serious hazard that can cause fires and electric shocks. Often the cause behind unexplained breaker trips.', 'word', '插座漏电，别碰! chāzuò lòudiàn, bié pèng! ("The outlet has an electrical leak, don\'t touch it!")', 'If you suspect 漏电, cut the power at the breaker first, then contact 物业 for a licensed electrician; do NOT touch the outlet yourself.', null, [ACT.vocabularyIncidents]),
    createContentItem('摔倒', 'shuāidǎo', '"To fall down" — 摔 (fall) + 倒 (collapse). For describing slips and falls, especially of elderly people, where the fall itself can cause serious injury. Pair with 了 for past events.', 'word', '老人摔倒了，需要急救。 lǎorén shuāidǎo le, xūyào jíjiù. ("The elderly person has fallen, needs first aid.")', 'Falls among the elderly are a leading cause of 120 ambulance calls in Chinese cities — recognize the verb and act fast.', null, [ACT.vocabularyIncidents]),
    createContentItem('偷', 'tōu', '"To steal" — a transitive verb. The agent (the thief) is usually unknown in passive reports, which is the prototype use case for the 被 construction: 我的手机被偷了 ("my phone got stolen"). For the thief as a noun, use 小偷 (xiǎotōu).', 'word', '我的钱包被偷了。 wǒ de qiánbāo bèi tōu le. ("My wallet got stolen.")', 'Standard verb for any non-violent theft (pickpocketing, bag-snatching). For violent robbery, use 抢 instead.', null, [ACT.vocabularyIncidents]),
    createContentItem('抢', 'qiǎng', '"To rob / snatch" — implies violence or threat, unlike 偷 (sneak-steal). Snatching a bag from someone\'s shoulder on a crowded street is 抢; pickpocketing the same bag is 偷.', 'word', '他被抢了! tā bèi qiǎng le! ("He got robbed!")', 'A more serious incident than 偷 — police treat 抢 as a violent crime and respond accordingly.', null, [ACT.vocabularyIncidents]),
    createContentItem('小偷', 'xiǎotōu', '"Thief / pickpocket" — the noun form of the actor in 偷 (steal). Used in news reports and police descriptions: 小偷已经跑了 ("the thief has already fled").', 'word', '小心小偷! xiǎoxīn xiǎotōu! ("Watch out for pickpockets!")', 'Common warning sign in crowded tourist areas and subway stations — see it and put your phone away.', null, [ACT.vocabularyIncidents]),
    createContentItem('报案', 'bào\'àn', '"To file a police report" — the technical verb for the act of going to a 派出所 and registering an incident. Different from 报警 (bàojǐng, "call the police via 110"); 报案 happens in person, 报警 by phone.', 'word', '我要去派出所报案。 wǒ yào qù pàichūsuǒ bào\'àn. ("I need to go to the police station to file a report.")', 'For a stolen item, you typically 报警 first (by phone) for an immediate response, then 报案 in person at the 派出所 to get the formal report needed for insurance.', null, [ACT.vocabularyIncidents]),
    createContentItem('报警', 'bàojǐng', '"To call the police" — the verb for dialing 110. 报 (report) + 警 (alarm/police). Distinct from 报案 (file a report in person); 报警 is the phone call, 报案 is the paperwork.', 'word', '快报警! kuài bàojǐng! ("Quickly call the police!")', 'Often shouted to bystanders during an incident — anyone within earshot is expected to dial 110 if they have a phone.', null, [ACT.vocabularyIncidents]),
    createContentItem('丢', 'diū', '"To lose (an item)" — the verb for non-criminal loss. 我把手机丢了 ("I lost my phone, perhaps misplaced") implies you may have dropped it; 我的手机被偷了 ("my phone got stolen") implies a thief. The distinction matters for the police report.', 'word', '我把钥匙丢了。 wǒ bǎ yàoshi diū le. ("I lost my keys.")', 'For a confirmed theft, use 被偷了 not 丢了; using 丢 when you mean theft downgrades the urgency in the officer\'s eyes.', null, [ACT.vocabularyIncidents]),
    createContentItem('找不到', 'zhǎo bú dào', '"Can\'t find" — the potential-complement form 找 (look for) + 不 + 到 (reach/achieve). Less alarming than 被偷, more accurate when you genuinely don\'t know whether something was stolen or just misplaced.', 'word', '我找不到我的手机。 wǒ zhǎo bú dào wǒ de shǒujī. ("I can\'t find my phone.")', 'A useful first phrase when reporting at the 派出所 if you\'re uncertain — the officer will help you decide if it qualifies as 被偷.', null, [ACT.vocabularyIncidents]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Vocabulary III: Urgent instructions
    // ────────────────────────────────────────────────────────────────────
    createContentItem('别动', 'bié dòng', '"Don\'t move!" — sharp two-syllable command. 别 (don\'t) + 动 (move). Used to freeze someone in place: a suspect, an injured person who shouldn\'t aggravate the injury, or a child near danger.', 'word', '警察: 别动! 举起手来! jǐngchá: bié dòng! jǔ qǐ shǒu lái! ("Police: Don\'t move! Hands up!")', 'Standard police command at scenes; also used by paramedics asking an injured person to stay still until backboard arrives.', null, [ACT.vocabularyInstructions]),
    createContentItem('站住', 'zhàn zhù', '"Stop! / Halt!" — said to someone fleeing or walking away. 站 (stand) + 住 (firmly). Different from 停 (tíng, "stop" as in stop the car) — 站住 implies the addressee is moving on foot and should freeze where they are.', 'word', '小偷! 站住! xiǎotōu! zhàn zhù! ("Thief! Stop!")', 'A classic shout heard in Chinese streets when a pickpocket flees; bystanders often join in to help block the escape.', null, [ACT.vocabularyInstructions]),
    createContentItem('离开', 'líkāi', '"Leave / get away" — for ordering someone to clear a dangerous area. 离 (separate) + 开 (open/away). Pair with the location: 离开这里! ("Leave here!"), 离开现场! ("Leave the scene!").', 'word', '危险! 快离开! wēixiǎn! kuài líkāi! ("Danger! Leave quickly!")', 'Used by firefighters and security clearing bystanders from accident scenes; 快 (kuài, "quickly") usually precedes it to add urgency.', null, [ACT.vocabularyInstructions]),
    createContentItem('让开', 'ràng kāi', '"Step aside / make way" — for asking people to clear a path for emergency responders. 让 (yield) + 开 (away). Less harsh than 离开; the addressee just needs to move a few steps.', 'word', '让开! 救护车要过! ràng kāi! jiùhùchē yào guò! ("Make way! The ambulance needs to pass!")', 'Standard shout when clearing a path for emergency vehicles in crowded spaces; rude in everyday contexts but expected in emergencies.', null, [ACT.vocabularyInstructions]),
    createContentItem('小心', 'xiǎoxīn', '"Be careful / watch out" — the all-purpose caution word. 小 (small) + 心 (heart). Used both as a verb (你要小心 "you should be careful") and as a warning shout (小心! "watch out!").', 'word', '小心地滑! xiǎoxīn dì huá! ("Careful, slippery floor!")', 'Appears constantly on signs and labels: 小心台阶 (mind the step), 小心烫 (caution: hot), 小心碰头 (mind your head).', null, [ACT.vocabularyInstructions]),
    createContentItem('帮我一下', 'bāng wǒ yīxià', '"Help me a moment / give me a hand" — a softer call for help than the dramatic 救命! Used for non-life-threatening situations where you need a hand: helping an elderly person up, holding a door, calling someone\'s number when you can\'t reach your phone.', 'word', '帮我一下，我搬不动这个。 bāng wǒ yīxià, wǒ bān bú dòng zhè ge. ("Give me a hand, I can\'t move this.")', '一下 (yīxià, "a bit") softens the request to "just a moment"; without it, 帮我 alone can sound demanding.', null, [ACT.vocabularyInstructions]),
    createContentItem('救命', 'jiùmìng', '"Help! / Save me!" — the dramatic call for life-threatening emergencies. 救 (rescue) + 命 (life). Reserved for situations where your life is in danger — drowning, fire, attack. Overusing it dilutes its power.', 'word', '救命! 着火了! jiùmìng! zháohuǒ le! ("Help! Fire!")', 'In Chinese culture, shouting 救命 is the universal signal that bystanders should call 110/119/120 immediately; do not use it for trivial situations.', null, [ACT.vocabularyInstructions]),
    createContentItem('快', 'kuài', '"Quickly / fast" — the urgency intensifier prepended to any command. 快来! ("come quick!"), 快走! ("leave quickly!"), 快打电话! ("call quickly!"). Reduplicate as 快快! for extra urgency.', 'word', '快! 快叫救护车! kuài! kuài jiào jiùhùchē! ("Quick! Quickly call an ambulance!")', 'The most-used adverb in any Chinese emergency; a command without 快 sounds calm, with 快 sounds urgent.', null, [ACT.vocabularyInstructions]),
    createContentItem('注意', 'zhùyì', '"Pay attention / be aware" — softer than 小心 (which warns of immediate physical danger). 注 (concentrate) + 意 (mind). Used for cognitive caution: 注意安全 ("pay attention to safety"), 注意听 ("listen carefully").', 'word', '注意安全。 zhùyì ānquán. ("Pay attention to safety / be safe.")', 'Standard parting phrase from Chinese parents and elders before any departure; the verbal equivalent of "stay safe".', null, [ACT.vocabularyInstructions]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar I: 被 passive
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '被 — the passive marker',
      'bèi — passive marker',
      'The 被 (bèi) passive expresses that something happened TO the subject. Form: SUBJECT + 被 + (AGENT) + V + 了/COMPLEMENT. The AGENT is optional and often omitted when the doer is unknown or unimportant — which is the prototype case for emergencies.',
      'sentence',
      '我的钱包被偷了。 ("My wallet got stolen." — agent unknown)\n我的手机被那个人偷了。 ("My phone was stolen by that person." — agent specified)',
      'Compare with last unit\'s 把 construction: 把 = ACTIVE disposal ("I [did something to] X"), 被 = PASSIVE undergoing ("X [had something done to it]"). They are mirror grammatical partners.',
      [
        { target: 'SUBJECT + 被 + V + 了', note: 'minimal passive: agent omitted; emphasis on what happened to the subject' },
        { target: 'SUBJECT + 被 + AGENT + V + 了', note: 'full passive: agent named; used when the doer is known and worth mentioning' },
        { target: 'CONTRAST: 把 (active disposal)', note: '我把钱包丢了 "I lost my wallet" (active) vs 我的钱包被偷了 "my wallet got stolen" (passive)' },
      ],
      [ACT.grammarBei],
    ),
    createContentItem(
      '被 — adversity connotation',
      'bèi — adversity connotation',
      'Critical nuance: 被 in Mandarin carries a slight "adversity" or "unwanted" feeling — it is most natural with unfortunate events that happen TO the subject (theft, injury, scolding, being deceived). For neutral or positive passives, Mandarin often prefers active phrasing or other markers.',
      'sentence',
      '✓ 我被骗了。 ("I got tricked.") — adversity, natural\n✓ 他被老板骂了。 ("He got scolded by the boss.") — adversity, natural\n△ 他被选为班长。 ("He was elected class monitor.") — neutral/positive, technically grammatical but stilted',
      'In emergency reporting, 被 is the natural choice because almost every incident reported IS unfortunate (theft, injury, attack).',
      [
        { target: 'Adversity examples ✓', note: '被偷了 (stolen), 被打了 (hit), 被骂了 (scolded), 被骗了 (tricked) — all natural' },
        { target: 'Neutral/positive examples △', note: '被选为 (elected), 被称为 (called) — grammatically valid but less natural than active versions' },
      ],
      [ACT.grammarBei],
    ),
    createContentItem(
      '被 + 给 + V — colloquial reinforcement',
      'bèi + gěi + V — colloquial reinforcement',
      'In spoken Mandarin, 给 (gěi) is sometimes inserted between the agent and the verb for emphasis: 我的手机被小偷给偷了。 The 给 has no separate meaning here — it strengthens the passive feel and is common in Northern speech.',
      'sentence',
      '我的手机被小偷给偷了。 ("My phone got stolen by a thief." — colloquial)\n他被老师给批评了。 ("He got scolded by the teacher." — colloquial)',
      'Optional in writing; common in spoken Beijing-area Mandarin; safe to drop in formal writing.',
      [
        { target: '被 + AGENT + 给 + V', note: 'colloquial; the 给 adds emphasis but no new meaning' },
        { target: '被 + AGENT + V (no 给)', note: 'standard written form; equally valid in speech' },
      ],
      [ACT.grammarBei],
    ),
    createContentItem(
      '让 / 叫 — colloquial passive alternatives',
      'ràng / jiào — colloquial passive alternatives',
      'In spoken Mandarin, 让 (ràng) and 叫 (jiào) can replace 被 in passive sentences, especially in casual speech. 我的伞让人拿走了 ("my umbrella got taken by someone"). The agent is REQUIRED with 让/叫 — you cannot drop it the way you can with 被.',
      'sentence',
      '我的伞被拿走了。 (agent optional, standard) ≈ 我的伞让人拿走了。 (agent required, colloquial)',
      'Choose 被 for written reports and formal speech; 让/叫 in casual conversation with friends.',
      [
        { target: '被 — formal, agent optional', note: 'used in police reports, news, formal writing' },
        { target: '让 / 叫 — colloquial, agent required', note: 'used in casual conversation; cannot drop the agent' },
      ],
      [ACT.grammarBei],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar II: 一边…一边…
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '一边…一边…',
      'yībiān…yībiān…',
      'The paired construction 一边 V1 一边 V2 expresses two simultaneous actions by the SAME subject. Both halves take the same subject — the construction cannot link actions of two different people.',
      'sentence',
      '一边打电话一边按住伤口。 ("Call 120 while pressing on the wound.")\n我一边走一边打电话。 ("I walk and make a phone call at the same time.")',
      'High-frequency in emergency contexts because real emergencies require simultaneous action (calling for help while applying first aid, watching the patient while waving for the ambulance).',
      [
        { target: '一边 V1 一边 V2', note: 'two simultaneous actions, same subject; both verbs take 一边 directly before them' },
        { target: 'SAME subject only', note: 'you cannot say "I walk and you call"; for two-person simultaneous actions, use other constructions' },
      ],
      [ACT.grammarYibian],
    ),
    createContentItem(
      '一边 — register and contractions',
      'yībiān — register and contractions',
      'In casual speech, 一边…一边… contracts to 边…边… (without 一). Both forms mean the same thing; the shorter is more colloquial and the longer slightly more deliberate. Same construction rules apply.',
      'sentence',
      '一边走一边看 ≈ 边走边看 (both: "walking while looking around")',
      'Use the full 一边…一边… in writing; the shorter 边…边… is fine in conversation.',
      [
        { target: '一边 V1 一边 V2 — full form', note: 'standard written form; slightly more deliberate' },
        { target: '边 V1 边 V2 — short form', note: 'colloquial; very common in spoken Mandarin' },
      ],
      [ACT.grammarYibian],
    ),
    createContentItem(
      '一边 — emergency scenarios',
      'yībiān — emergency scenarios',
      'Three high-frequency 一边…一边… patterns in emergencies: (1) calling while applying first aid, (2) watching the patient while flagging help, (3) running while shouting for backup. Each pattern combines a CRITICAL action with a NECESSARY action that cannot wait.',
      'sentence',
      '一边打120一边按住伤口。 ("Call 120 while pressing on the wound.")\n一边看着伤员一边等救护车。 ("Watch the injured person while waiting for the ambulance.")\n一边追小偷一边喊救命。 ("Chase the thief while shouting for help.")',
      'Knowing these three sentence-templates by heart gives you instant fluency in describing what you did during an emergency.',
      [
        { target: '一边 V (call) 一边 V (first aid)', note: 'most common emergency pattern; one hand on the phone, the other on the wound' },
        { target: '一边 V (watch) 一边 V (wait)', note: 'second-most common; the responder stays vigilant while waiting for backup' },
        { target: '一边 V (chase) 一边 V (shout)', note: 'theft / robbery scenarios; bystanders join in based on the shouting' },
      ],
      [ACT.grammarYibian],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Grammar III: 应该 / 必须 / 不能
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '应该 — soft obligation',
      'yīnggāi — soft obligation',
      'The modal 应该 (yīnggāi, "should / ought to") expresses soft obligation, expectation, or what a reasonable person would do. Comes BEFORE the main verb. Used for recommendations and what is "right" in general, not strict requirements.',
      'sentence',
      '你应该报警。 ("You should call the police.")\n看到危险应该躲开。 ("When you see danger, you should move away.")',
      'Often softened further by adding 我觉得 (wǒ juéde, "I think") at the front: 我觉得你应该报警 ("I think you should call the police"); a polite way to suggest action without commanding.',
      [
        { target: 'SUBJECT + 应该 + V', note: 'soft obligation / recommendation; should do' },
        { target: '不应该 — soft prohibition', note: '"shouldn\'t" — softer than 不能; reserves judgment more than enforcement' },
      ],
      [ACT.grammarObligation],
    ),
    createContentItem(
      '必须 — strict requirement',
      'bìxū — strict requirement',
      'The modal 必须 (bìxū, "must") expresses strict requirement, often legal or safety-mandated. Comes BEFORE the main verb. Used in workplace rules, safety regulations, and contexts where non-compliance has consequences.',
      'sentence',
      '工地上必须戴安全帽。 ("Must wear a safety helmet on the construction site.")\n必须在24小时内报案。 ("Must file the report within 24 hours.")',
      'Stronger than 应该; 必须 frames the action as non-negotiable. The negative 不必 means "not required" (not the same as "must not"); for "must not" use 不能 or 不许.',
      [
        { target: 'SUBJECT + 必须 + V', note: 'strict requirement; must do (legal/safety mandate)' },
        { target: '不必 ≠ 必须 + 不', note: '不必 means "not required to" (optional); for "must not do X" use 不能 or 不许' },
      ],
      [ACT.grammarObligation],
    ),
    createContentItem(
      '不能 — prohibition',
      'bùnéng — prohibition',
      'The modal 不能 (bùnéng, "cannot / must not") expresses prohibition or impossibility. The everyday spoken negative of 必须. Comes BEFORE the main verb.',
      'sentence',
      '这里不能抽烟。 ("Can\'t smoke here.")\n开车不能喝酒。 ("Can\'t drink and drive.")',
      'Distinguish from 不会 (bùhuì, "can\'t / not know how to") — 不能 is about permission/safety, 不会 is about ability.',
      [
        { target: 'SUBJECT + 不能 + V', note: 'prohibition; must not / cannot (used in conversational safety contexts)' },
        { target: '不能 vs 禁止', note: '不能 is conversational ("you can\'t"); 禁止 (jìnzhǐ) is the formal sign-language ("PROHIBITED")' },
      ],
      [ACT.grammarObligation],
    ),
    createContentItem(
      '应该 < 必须 — strength scale',
      'yīnggāi < bìxū — strength scale',
      'The two main positive obligation modals stack from softest to strongest: 应该 (should) < 必须 (must). The negative scale: 不应该 (shouldn\'t) < 不能 (mustn\'t / can\'t) < 禁止 (prohibited on signs). Choose by matching the urgency to the modal.',
      'sentence',
      '应该看路 ("should watch the road") < 必须看路 ("must watch the road") < 不能闭眼 ("must not close your eyes") — same advice, three urgency levels.',
      'Beginners often default to 应该 for everything, which makes safety advice sound optional; mastering all three lets you communicate real urgency.',
      [
        { target: '应该 — soft', note: 'recommendation; "you should"' },
        { target: '必须 — strict', note: 'requirement; "you must"' },
        { target: '不能 — prohibition', note: '"you must not / cannot"' },
        { target: '禁止 — signage', note: 'formal prohibition on signs; rarely spoken in conversation' },
      ],
      [ACT.grammarObligation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Reading & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '宿舍楼安全须知',
      'sùshèlóu ānquán xūzhī',
      'A safety notice posted in a Tsinghua dormitory. Read each rule and identify which obligation modal it uses and which emergency number applies if the rule is violated.',
      'sentence',
      '⚠️ 清华大学宿舍楼安全须知 ⚠️\n1. 楼内禁止吸烟。违反者罚款500元。\n2. 必须随身携带学生证。\n3. 着火时，应该立即离开宿舍，并拨打119。\n4. 看到陌生人不能让他进入宿舍楼。\n5. 发生紧急情况，请联系门口保安或拨打110。\n6. 漏水或漏电，请先联系物业（电话: 010-xxxx-xxxx）。',
      '⚠️ Tsinghua University Dormitory Safety Notice ⚠️\n1. Smoking is prohibited inside the building. Violators face a 500-yuan fine.\n2. You must carry your student ID at all times.\n3. In case of fire, you should leave the dormitory immediately and dial 119.\n4. You must not let strangers into the dormitory.\n5. In an emergency, contact the entrance security guard or dial 110.\n6. For water or electrical leaks, contact property management first (phone: 010-xxxx-xxxx).',
      [
        { target: '禁止 jìnzhǐ', note: '"prohibited" — formal sign-language; used in rule 1 for smoking ban' },
        { target: '违反者 wéifǎn zhě', note: '"violators" — 违反 (violate) + 者 (one who); standard regulatory phrasing' },
        { target: '罚款 fákuǎn', note: '"fine / penalty"; the typical consequence on safety notices' },
        { target: '随身携带 suíshēn xiédài', note: '"carry on one\'s person"; 随身 (on one\'s body) + 携带 (carry)' },
        { target: '立即 lìjí', note: '"immediately"; formal alternative to 马上 (mǎshàng), preferred in written rules' },
        { target: '陌生人 mòshēng rén', note: '"stranger"; 陌生 (unfamiliar) + 人' },
        { target: '联系 liánxì', note: '"contact"; the verb for reaching out to a person or department' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '理解问题',
      'lǐjiě wèntí',
      'Five comprehension questions matching the safety notice. Answer each with the correct emergency number, contact, or obligation modal — full sentences are optional.',
      'sentence',
      'Q1: 在宿舍楼里能吸烟吗? Q2: 着火了应该打哪个号码? Q3: 漏水应该先找谁? Q4: 罚款多少钱? Q5: 看到陌生人怎么办?',
      'Five comprehension questions: Q1: Can you smoke in the dormitory? Q2: What number to call in case of fire? Q3: Who to contact first for a water leak? Q4: How much is the fine? Q5: What to do if you see a stranger?',
      [
        { target: 'A1: 不能。楼内禁止吸烟。', note: 'short answer using 不能 from the prohibition scale' },
        { target: 'A2: 应该打119。', note: 'fire emergency number; uses 应该 from rule 3' },
        { target: 'A3: 应该先找物业。', note: 'water leak handled by property management, not police' },
        { target: 'A4: 500元。', note: 'shortest possible answer; the question asks only for the amount' },
        { target: 'A5: 不能让他进入宿舍楼。', note: 'echoes the prohibition from rule 4' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Listening & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '报案 — 手机被偷了',
      'bào\'àn — shǒujī bèi tōu le',
      'A natural 6-turn dialogue between a foreign student (莎拉) and a police officer at the 派出所 near Tsinghua. The student reports a stolen phone, the officer asks follow-up questions, and the report is filed.',
      'conversation',
      '莎拉: 警察同志，您好。我要报案。我的手机被偷了。\n警察: 请坐。什么时候、在哪里被偷的?\n莎拉: 大概一个小时前，在五道口的地铁站。我一边看手机一边走路，下了车以后才发现手机不见了。\n警察: 是什么样的手机? 颜色、品牌?\n莎拉: 黑色的iPhone 15。我的手机号是138-xxxx-xxxx。\n警察: 你当时身边有人吗? 有没有人靠得很近?\n莎拉: 嗯…有一个穿黑色外套的男人挤得很近，可能是他偷的。\n警察: 好，我们查一下附近的摄像头。请填一下这张表格，留下你的联系方式。',
      'Sarah: Officer, hello. I want to file a report. My phone got stolen.\nPolice: Please sit. When and where did it get stolen?\nSarah: About an hour ago, at the Wudaokou subway station. I was looking at my phone while walking, and after getting off the train I realized the phone was gone.\nPolice: What kind of phone? Color and brand?\nSarah: A black iPhone 15. My phone number is 138-xxxx-xxxx.\nPolice: Was anyone next to you at the time? Did anyone get very close to you?\nSarah: Hmm... there was a man in a black jacket who pushed very close, maybe he stole it.\nPolice: OK, we will check the nearby CCTV cameras. Please fill out this form and leave your contact details.',
      [
        { target: '警察同志 jǐngchá tóngzhì', note: 'respectful address for an officer; safe in any official setting' },
        { target: '被偷的 bèi tōu de', note: 'completing the 被 passive with 的 in time/place questions: "when was it stolen?"' },
        { target: '大概 dàgài', note: '"approximately"; softens the time estimate, expected in police reports where exactness is unclear' },
        { target: '五道口 Wǔdàokǒu', note: 'subway station and neighborhood just east of Tsinghua; major student hub' },
        { target: '一边…一边… (in context)', note: 'lesson grammar in action: "looking at the phone while walking"' },
        { target: '才发现 cái fāxiàn', note: '"only then realized"; 才 (only then) marks the late discovery — typical theft-report phrasing' },
        { target: '挤 jǐ', note: '"squeeze / push close"; the classic move of a pickpocket in a crowded subway' },
        { target: '摄像头 shèxiàngtóu', note: '"surveillance camera"; ubiquitous in Chinese cities and a routine investigative tool' },
        { target: '联系方式 liánxì fāngshì', note: '"contact information"; standard form-filling term' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      '报案 — 出车祸',
      'bào\'àn — chū chēhuò',
      'A second listening sample: reporting a minor car accident to 122. The driver is uninjured but needs the official accident report for insurance.',
      'conversation',
      '司机: 喂，122吗? 我在中关村大街出车祸了。\n接线员: 有没有人受伤?\n司机: 没有人受伤，只是两辆车撞到一起了。\n接线员: 在中关村大街的哪个路口?\n司机: 中关村大街和成府路的路口，西北角。\n接线员: 好，请你们都不要离开现场，民警马上到。\n司机: 好的，谢谢。',
      'Driver: Hello, is this 122? I had a car accident on Zhongguancun Avenue.\nDispatcher: Is anyone injured?\nDriver: No injuries, just two cars hit each other.\nDispatcher: Which intersection on Zhongguancun Avenue?\nDriver: The intersection of Zhongguancun Avenue and Chengfu Road, northwest corner.\nDispatcher: OK, please both of you don\'t leave the scene, an officer will be there shortly.\nDriver: OK, thanks.',
      [
        { target: '撞到一起 zhuàng dào yīqǐ', note: '"crashed into each other"; the standard verb for vehicle collisions' },
        { target: '现场 xiànchǎng', note: '"scene of the incident"; 不要离开现场 ("don\'t leave the scene") is dispatcher boilerplate' },
        { target: '民警 mínjǐng', note: '"police officer"; the formal term used in official communications and on uniforms' },
        { target: '马上到 mǎshàng dào', note: '"arriving immediately"; standard reassurance phrase from emergency dispatchers' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '报案记录模板',
      'bào\'àn jìlù múbǎn',
      'A reusable template for filing a written incident report at the 派出所. Use the five-line structure as a backbone — every Chinese 报案 form covers these five fields.',
      'sentence',
      '【报案记录】\n· 时间: 2026年5月13日 晚上8点左右\n· 地点: 海淀区五道口地铁站\n· 失物: 黑色iPhone 15, 手机号138-xxxx-xxxx\n· 经过: 我一边看手机一边走出地铁，到出口才发现手机被偷了。当时身边有一个穿黑色外套的男人靠得很近。\n· 联系方式: 莎拉·金, 188-xxxx-xxxx, 清华大学学生宿舍',
      '【Incident Report】\n· Time: May 13, 2026, around 8 PM\n· Location: Wudaokou subway station, Haidian District\n· Lost item: Black iPhone 15, phone number 138-xxxx-xxxx\n· What happened: I was looking at my phone while walking out of the subway, and only realized at the exit that the phone had been stolen. At the time there was a man in a black jacket standing very close to me.\n· Contact: Sarah Kim, 188-xxxx-xxxx, Tsinghua University student dormitory',
      [
        { target: '时间 / 地点 / 失物 / 经过 / 联系方式', note: 'the five standard fields in any Chinese incident report' },
        { target: '【经过】 jīngguò', note: '"course of events"; the narrative paragraph where 被 passive and 一边…一边… get heavy use' },
        { target: '失物 shīwù', note: '"lost item"; the formal term for what was stolen or lost' },
        { target: '海淀区 Hǎidiàn qū', note: 'the district of Beijing containing Tsinghua, Peking University, and most of the tech sector' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '写作练习',
      'xiězuò liànxí',
      'Write your own 5-line incident report for a stolen item, using the template. Use 被 at least twice (for the stolen item and one related action) and an obligation modal at least once.',
      'sentence',
      '示例: 【报案记录】\n· 时间: 2026年5月12日 下午3点\n· 地点: 清华大学东门外\n· 失物: 黑色双肩包，里面有笔记本电脑和护照\n· 经过: 我在路边一边等朋友一边看手机，背包放在脚边。一分钟以后发现包被偷了。我应该把包背在身上。\n· 联系方式: 金智秀, 159-xxxx-xxxx, 清华大学留学生宿舍3栋301',
      '【Incident Report】\n· Time: May 12, 2026, 3 PM\n· Location: Outside Tsinghua East Gate\n· Lost item: Black backpack, containing laptop and passport\n· What happened: I was waiting for a friend on the roadside while looking at my phone, with the backpack at my feet. A minute later I noticed the bag had been stolen. I should have kept the bag on my back.\n· Contact: Kim Ji-su, 159-xxxx-xxxx, Tsinghua International Student Dormitory Building 3, Room 301',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '哪个号码该打',
      'nǎ ge hàomǎ gāi dǎ',
      'The four Chinese emergency numbers split the workload by service, unlike the unified "911" in the US or "999" in the UK. Calling the wrong number wastes time as dispatchers transfer the call — learn the mapping cold before you need it.',
      'sentence',
      '110 (police) · 119 (fire) · 120 (medical) · 122 (traffic) — four lines, four services.',
      'If you are uncertain, default to 110 — police can dispatch other services through internal channels, but they cannot replace an ambulance for medical care.',
      [
        { target: '110 警察', note: 'theft, assault, suspicious activity, lost children, all crimes — your default if uncertain' },
        { target: '119 消防', note: 'fires, gas leaks, structural collapse, people trapped — anything involving 消防车 (fire truck)' },
        { target: '120 急救', note: 'medical emergencies, ambulance dispatch — call first when there are injuries' },
        { target: '122 交通', note: 'traffic accidents without serious injuries — for insurance documentation' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '物业和保安',
      'wùyè hé bǎo\'ān',
      'For everyday emergencies inside a Chinese apartment compound or campus, the police are rarely your first call. 物业 (property management) handles leaks, broken locks, lost-and-found, and noise complaints; 保安 (security guards) handle suspicious persons, package theft, and crowd control. Both can escalate to 110 if needed.',
      'sentence',
      '漏水 → 物业 first · 陌生人 → 保安 first · 着火 → 119 directly · 受伤 → 120 directly',
      'Knowing who to call first is half the battle in Chinese urban life — calling 110 for a leaky pipe wastes everyone\'s time and may earn a polite scolding.',
      [
        { target: '物业 wùyè', note: 'property management; first call for leaks, broken locks, elevators, parking, lost-and-found' },
        { target: '保安 bǎo\'ān', note: 'security guard at the entrance gate; first call for suspicious persons, package theft, gate access' },
        { target: 'When to escalate to 110', note: 'whenever a crime has been committed or a person is in danger — 物业 and 保安 will not pursue criminals themselves' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '派出所是什么样的',
      'pàichūsuǒ shì shénme yàng de',
      'A 派出所 is a small neighborhood police box, typically the size of a corner store, located within a 10-minute walk of any residential area. Inside: a desk, a few officers, a holding bench, and forms to fill out. Distinct from 公安局 (gōng\'ānjú), the larger district headquarters.',
      'sentence',
      '派出所 (neighborhood box) ≠ 公安局 (district HQ) — for student incidents, always go to 派出所 first.',
      'Most Chinese cities have one 派出所 per neighborhood; finding the nearest one on a map app (using "派出所" as the search term) is your first step after any incident.',
      [
        { target: '派出所 — small, local', note: 'corner-shop size; staffed by 2-5 officers; handles most everyday reports' },
        { target: '公安局 — large, district', note: 'multi-story HQ; handles serious crimes, residence permits, foreigner registration' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '摄像头无处不在',
      'shèxiàngtóu wú chù bù zài',
      'Chinese cities have dense CCTV coverage — almost every street, subway, building entrance, and intersection has cameras. A consequence: many public-space crimes (pickpocketing, hit-and-run) are solved within days by reviewing nearby 摄像头 footage. When filing a report, always mention the time and exact location so police can pull the relevant cameras.',
      'sentence',
      '别担心，附近有摄像头。 ("Don\'t worry, there are CCTV cameras nearby.")',
      'Standard reassurance from a 派出所 officer; reflects the real investigative practice of camera-review-first.',
      [
        { target: '摄像头 shèxiàngtóu', note: '"surveillance camera"; visible at every major intersection and entrance' },
        { target: '查摄像头 chá shèxiàngtóu', note: '"to check the cameras"; standard police investigative step in public-space incidents' },
        { target: 'Time + location matter', note: 'precise time/place lets the police pull specific camera footage; vague reports yield no leads' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '平安出行',
      'píng\'ān chūxíng',
      '平安出行 (literally "peaceful travel") is a cultural slogan and shared expectation in Mainland China — that public life should be safe, calm, and predictable. Crime statistics in major Chinese cities are low for violent crime; the main risks for foreign students are pickpocketing, bike theft, and scams targeting non-Chinese speakers.',
      'sentence',
      '出门小心，平安回家。 ("Be careful when you go out, come home safely.")',
      'A standard parting phrase from Chinese friends and family; reflects the cultural emphasis on collective safety.',
      [
        { target: '平安 píng\'ān', note: '"peace / safety"; both a personal blessing and a cultural value' },
        { target: '低犯罪率 dī fànzuì lǜ', note: '"low crime rate"; the data backing the cultural expectation' },
        { target: 'Main risks for foreign students', note: 'pickpocketing in crowded transit, bike/phone theft on campus, language-based scams' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 13 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '任务: 在派出所报案',
      'rènwù: zài pàichūsuǒ bào\'àn',
      'Roleplay reporting a stolen phone at the 派出所 near 清华大学 with the tutor playing the on-duty officer. Use every skill from this lesson in one continuous scene — describe when/where it happened, what you were doing, what was stolen, and answer the officer\'s follow-up questions.',
      'conversation',
      '[派出所, 五道口附近, 晚上9点]\n警察: 同学，你好。请问要报什么案?\n你: [打招呼 + 用 被 描述你的手机被偷了]\n警察: 什么时候、在哪里被偷的?\n你: [说时间 + 地点; 用 一边…一边… 描述你当时在做什么]\n警察: 手机是什么样的? 有没有可疑的人?\n你: [描述手机 + 提到旁边的人]\n警察: 好，我们去查附近的摄像头。请填表，留下联系方式。\n你: [道谢 + 用 应该 / 必须 表达对自己的反思]',
      'Six turns of fluent exchange; the tutor will prompt you and respond naturally to whatever you say. The minimum to pass: use 被 at least once, 一边…一边… at least once, and one obligation modal.',
      [
        { target: '打招呼 + 报案目的', note: '警察同志，您好。我要报案。— start with respect, state the purpose' },
        { target: '被 + V + 了', note: '我的手机被偷了 — the core grammar of this lesson; use it in your first content turn' },
        { target: '时间 + 地点', note: '大概一个小时前，在五道口地铁站 — be specific so the police can pull camera footage' },
        { target: '一边…一边…', note: '我一边看手机一边走路 — describe what you were doing when it happened' },
        { target: '应该 / 必须 self-reflection', note: '我应该把手机放在口袋里 — close with one self-reflective sentence; signals you took the incident seriously' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战 — 报告现场的车祸',
      'tiǎozhàn — bàogào xiànchǎng de chēhuò',
      'Stretch goal: you witness a car accident on the way home, and a pedestrian is injured. Call 120 first (medical), then 122 (traffic), and report to both dispatchers. Use 一边…一边… for what you do while waiting, and 必须 for what the dispatcher tells you.',
      'conversation',
      '你: 喂，120吗? 中关村大街出车祸了，有人受伤。\n120: 受伤的人怎么样? 还有意识吗?\n你: 还有意识，但是流了很多血。我一边按住伤口一边等救护车。\n120: 好，救护车马上到。你必须保持冷静，不要移动伤员。\n你: 好的。\n[挂电话，然后打122]\n你: 喂，122吗? 中关村大街和成府路的路口出车祸了，已经叫了120。',
      'A 5-turn drill combining 一边…一边… (pressing the wound while waiting), 必须 (must stay calm, must not move the injured person), and the realistic two-call sequence (120 first for medical, then 122 for traffic).',
      [
        { target: '120 first for injuries', note: 'medical care is time-critical; police can wait for the second call' },
        { target: '一边按住伤口一边等', note: '"pressing the wound while waiting" — the prototypical emergency 一边…一边… sentence' },
        { target: '必须保持冷静', note: '"must stay calm" — the dispatcher\'s standard instruction; uses the 必须 modal of strict obligation' },
        { target: '不要移动伤员', note: '"don\'t move the injured person" — using 不要 (informal "don\'t") rather than 不能 (formal prohibition); 伤员 = injured person' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
