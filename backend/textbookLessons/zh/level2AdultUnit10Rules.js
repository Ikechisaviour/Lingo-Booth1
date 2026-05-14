// Level 2 (Adult Track) · Unit 10 — Rules, Policies & Permissions (Mandarin Chinese)
// Functions: stating obligations and prohibitions, explaining workplace and
// public-space rules, describing consequences of violations, and navigating
// real-name verification, security checks, and management-enforced policies
// common to life in Beijing.
//
// Authored with Hanzi (target) + Pinyin (romanization) + English glosses
// (canonical source). The conversation tutor reads this curriculum and delivers
// it to each learner in their preferred native language at runtime — never
// assume a specific L1 in this file.
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
  orientation: 'zh-l2au10-orientation',
  pronunciation: 'zh-l2au10-pronunciation',
  vocabularyRules: 'zh-l2au10-vocab-rules',
  vocabularyPublicWorkplace: 'zh-l2au10-vocab-public-workplace',
  grammarModals: 'zh-l2au10-grammar-modals',
  grammarOnlyIf: 'zh-l2au10-grammar-only-if',
  grammarUnless: 'zh-l2au10-grammar-unless',
  reading: 'zh-l2au10-reading',
  listening: 'zh-l2au10-listening',
  writing: 'zh-l2au10-writing',
  culture: 'zh-l2au10-culture',
  task: 'zh-l2au10-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Explain Beijing public-space and workplace rules in clear formal Mandarin, distinguishing what is required, recommended, allowed, and forbidden.',
      'Use four obligation/permission modals — 必须 (must), 应该 (should), 可以 (may), 不能 (cannot) — to grade your statements from strict requirement to soft suggestion.',
      'Describe the consequences of breaking a rule using 罚款 (fines), 警告 (warnings), and 违规 (violation) vocabulary so a listener understands the stakes, not just the rule.',
    ],
    task: 'Imagine a new exchange student has just moved into your Tsinghua dormitory — by the end of this lesson you should walk them through what is required, what is forbidden, and what happens if they break each rule, all in one continuous Mandarin explanation.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: '发音 — Sound traps in rule vocabulary',
    goals: [
      'Pronounce 禁止 (jìnzhǐ, "forbidden") with two consecutive falling-then-rising tones — the canonical opening word of every public-space prohibition sign.',
      'Pronounce 必须 (bìxū, "must") with the sharp fourth-tone 必 followed by the first-tone 须, the most common modal in formal rule statements.',
      'Master 实名 (shímíng) and 违规 (wéiguī) — both rising-tone compounds — without flattening to a neutral middle pitch.',
    ],
    task: 'Read each of the four key terms aloud three times with the marked tones, then drill them inside a short rule phrase to lock in the rhythm.',
  },
  {
    id: ACT.vocabularyRules,
    section: 'Vocabulary I',
    title: 'Rules, compliance, and consequences',
    goals: [
      'Build a working set of 12 rule-and-compliance terms (规定, 政策, 禁止, 允许, 必须, 不许, 罚款, 警告, 违规, 遵守, 安检, 验证, 实名, 登记) so you can name any rule you encounter in Beijing.',
      'Distinguish the formal-policy register (政策, 规定) from the everyday-rule register (规矩) and from the bureaucratic-procedure register (登记, 验证, 实名).',
    ],
    task: 'For each of the 14 terms, say one short sentence applying it in context — a posted sign, a workplace handbook, or a verbal warning from management.',
  },
  {
    id: ACT.vocabularyPublicWorkplace,
    section: 'Vocabulary II',
    title: 'Public-space signs and workplace policies',
    goals: [
      'Read the three universal Beijing prohibition phrases — 禁止吸烟 (no smoking), 禁止拍照 (no photos), 禁止入内 (no entry) — and identify the contexts where you will see each posted.',
      'Use the five workplace-policy compounds — 上班时间 (office hours), 着装要求 (dress code), 出差报销 (business-trip reimbursement), 加班政策 (overtime policy), 请假流程 (leave-request procedure) — to discuss your own job.',
    ],
    task: 'Pair each public-space prohibition with one Beijing location where you have seen it, and pair each workplace-policy term with the document where it would be defined.',
  },
  {
    id: ACT.grammarModals,
    section: 'Grammar I',
    title: '必须 / 应该 / 可以 / 不能 — escalating obligation and permission',
    goals: [
      'Use 必须 (bìxū) for hard requirements where non-compliance triggers a penalty — the modal of choice for posted rules and contractual obligations.',
      'Use 应该 (yīnggāi) for moral or expected behavior that is strongly recommended but not strictly enforced — softer than 必须, firmer than a casual suggestion.',
      'Use 可以 (kěyǐ) to grant permission and 不能 (bùnéng) to deny it — the everyday yes/no permission pair posted at gates, counters, and inside workplaces.',
    ],
    task: 'Convert one rule four times — once with each modal — and notice how the same factual content shifts from absolute requirement to optional preference as the modal changes.',
  },
  {
    id: ACT.grammarOnlyIf,
    section: 'Grammar II',
    title: '只有…才… — only if A, then B (exclusive necessary condition)',
    goals: [
      'Use the 只有…才… (zhǐyǒu… cái…) frame to mark A as the ONLY way to achieve B — stronger than 如果 (if), narrower than 要 (when/if).',
      'Place 只有 directly before the necessary condition and 才 (always before the verb) inside the result clause — the word order is fixed and not interchangeable.',
      'Avoid the common error of swapping 才 for 就 (jiù), which weakens the exclusivity and changes the meaning to "as soon as".',
    ],
    task: 'Build three rule sentences using 只有…才… — for example, "Only after real-name registration can you enter the dorm" — and explain why no other condition would suffice.',
  },
  {
    id: ACT.grammarUnless,
    section: 'Grammar III',
    title: '除非…否则… — unless A, otherwise B',
    goals: [
      'Use 除非…否则… (chúfēi… fǒuzé…) to state that A is the only exception to a default consequence — the standard phrasing on Chinese policy documents and warning signs.',
      'Place 除非 before the exception clause and 否则 before the default-consequence clause; the order is fixed and the two halves must both appear.',
      'Distinguish 除非…否则… from 如果不…就… (if not A, then B) — the 除非 frame is more formal and emphasizes the consequence; 如果不 is everyday speech.',
    ],
    task: 'Convert three "if not" rule statements into 除非…否则… form, and read them aloud with the formal cadence of a posted notice.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: '阅读 — Beijing subway rules and a workplace handbook',
    goals: [
      'Read a posted-style notice and a workplace-handbook excerpt, identifying which rules use 必须, which use 不能/不许, and which describe consequences.',
      'Answer four short questions about the texts using the lesson vocabulary, with one answer per text type.',
    ],
    task: 'Read both texts aloud once, then in your own words summarize the three strictest rules in each — the ones whose violation triggers a 罚款 or 警告.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: '听力 — A senior colleague explains the rules',
    goals: [
      'Follow a 6-turn dialogue in which a senior colleague at a Beijing office walks a new hire through office hours, dress code, overtime, and the leave-request procedure.',
      'Track which rules carry penalties (罚款, 警告) versus which are merely 应该 / 不应该 — the difference between policy and culture.',
    ],
    task: 'Listen once and identify each rule\'s consequence, then re-perform the dialogue with your own job swapped in, keeping the modal choices true to the consequence weight.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: '写作 — A dorm welcome notice',
    goals: [
      'Write a 5–6 line welcome notice for a new exchange student arriving at the Tsinghua dormitory, listing what is required (real-name registration, ID at the gate), what is forbidden (overnight visitors, smoking), and the consequences for breaking each rule.',
      'Use 必须 at least once, 不能 / 不许 at least once, 除非…否则… at least once, and one 只有…才… clause — so the writing demonstrates the full grammar of this lesson.',
    ],
    task: 'Write your own version using the template, then read it aloud as if you were posting it on the bulletin board of your dorm floor.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: '文化 — 实名制, 安检, and how rules are enforced in China',
    goals: [
      'Understand 实名制 (real-name verification) — the legal requirement that mobile phones, train tickets, internet posts, and even some convenience-store purchases must be tied to a verified ID.',
      'Know the 24-hour 安检 at every Beijing subway station, the post-2020 legacy of QR-code health codes, and how 物业 (apartment management) enforces residential rules with notices and door visits.',
      'Recognize the 党的政策 ("the Party\'s policy") framing common to any official rule announcement — the phrase that signals the rule is non-negotiable and centrally directed.',
    ],
    task: 'Compare one rule in this lesson with the equivalent in your home country — name what is required to register, the security-check intensity, and who enforces residential rules.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: '任务 — Brief a new Tsinghua exchange student',
    goals: [
      'Combine 必须 / 应该 / 可以 / 不能, the 只有…才… frame, and the 除非…否则… frame in one continuous explanation of Tsinghua dormitory rules.',
      'Cover the required real-name registration, the gate ID check, the forbidden overnight visitor and smoking rules, and the consequences for each violation — so the new student leaves with no ambiguity about what to do.',
    ],
    task: 'Roleplay welcoming a new exchange student to your Tsinghua dormitory; aim for an 8-turn exchange in Mandarin where you answer their follow-up questions about each rule.',
  },
];

const lesson = {
  title: 'Level 2 (Adult) · Unit 10: 规章制度 — Rules, Policies & Permissions',
  category: 'business',
  difficulty: 'intermediate',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'stating-requirement', label: 'Stating a requirement', goal: 'Use 必须 + verb to mark a non-negotiable rule whose violation carries a penalty.' },
    { id: 'stating-prohibition', label: 'Stating a prohibition', goal: 'Use 不能 / 不许 / 禁止 to forbid an action, escalating from everyday refusal to posted-sign formality.' },
    { id: 'granting-permission', label: 'Granting permission', goal: 'Use 可以 + verb to allow an action and 应该 + verb to recommend without compelling.' },
    { id: 'exclusive-condition', label: 'Exclusive necessary condition', goal: 'Use 只有…才… to mark A as the only path to B — for procedural gates like real-name registration.' },
    { id: 'unless-default', label: 'Unless / otherwise frame', goal: 'Use 除非…否则… to write a posted-notice-style consequence: unless the exception applies, the default penalty stands.' },
  ],
  relatedPools: ['topic-society', 'topic-work'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '本课目标',
      'běn kè mùbiāo',
      'By the end of this lesson you can explain Beijing public-space and workplace rules to a newcomer, grading each statement from absolute requirement (必须) down to soft suggestion (应该), and naming the consequence (罚款, 警告) that follows violation. The output is one continuous spoken brief, not a list.',
      'word',
      'Functions: 规定 (state rule) · 禁止 (forbid) · 允许 (permit) · 罚款 (impose fine) · 遵守 (obey)',
      'Five micro-functions form the spine of any rule explanation in Mandarin; once they are automatic, the Grammar I/II/III patterns are just word-order rules.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      '真实场景',
      'zhēnshí chǎngjǐng',
      'A new exchange student has just moved into your floor of the Tsinghua dormitory and asks you what the rules are. You have about two minutes to cover the required real-name registration, the gate ID check, the forbidden overnight visitors and smoking, and the consequences — clearly enough that they will not get a warning notice in their first week.',
      'word',
      '新生: "我刚搬进来，宿舍有什么规定吗？" 你: "必须实名登记，不能…"',
      'A typical first-week question; the new student opens with the casual question particle 吗, and you answer with the formal 必须 / 不能 register because you are stating policy, not opinion.',
      [
        { target: '规定 guīdìng', note: 'a stated rule or regulation; the noun used in handbooks, contracts, and posted notices' },
        { target: '实名登记 shímíng dēngjì', note: 'real-name registration — the legal procedure of recording your ID against your name in any official system' },
        { target: '违规 wéiguī', note: 'violation; the umbrella term for breaking a 规定, regardless of the specific rule broken' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '四种力度',
      'sì zhǒng lìdù',
      'Mandarin grades obligation with four core modals. Hard requirement: 必须 (bìxū, must — penalty if broken). Strong recommendation: 应该 (yīnggāi, should — moral or expected). Permission: 可以 (kěyǐ, may — allowed but not required). Denial: 不能 (bùnéng, cannot — not allowed).',
      'word',
      '必须 must · 应该 should · 可以 may · 不能 cannot — same factual content shifts in weight as the modal changes.',
      'Picking the right modal is the difference between sounding like a posted sign (必须) and sounding like a friendly tip (应该); learners often default to 必须 for everything and come across as rigid.',
      [
        { target: '必须 bìxū', note: 'hard requirement; non-compliance triggers a defined penalty (罚款, 警告, 开除)' },
        { target: '应该 yīnggāi', note: 'strong recommendation; expected by community or supervisor but not strictly enforced' },
        { target: '可以 kěyǐ', note: 'permission granted; the action is allowed but not required' },
        { target: '不能 bùnéng', note: 'permission denied; the action is forbidden, often paired with an explanation of why' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '禁止',
      'jìnzhǐ',
      'Fourth-tone 禁 (jìn, "prohibit") followed by third-tone 止 (zhǐ, "stop"). The canonical opening of every public-space prohibition sign in China — once you can read this compound aloud, you can read every "no X" sign in Beijing.',
      'word',
      '禁止吸烟 jìnzhǐ xīyān ("no smoking") · 禁止拍照 jìnzhǐ pāizhào ("no photos") · 禁止入内 jìnzhǐ rùnèi ("no entry")',
      'Falling-then-dipping rhythm; both syllables are stressed, no neutralization on the second.',
      [
        { target: '禁 (jìn, 4th tone)', note: 'sharp falling pitch; the prohibition verb' },
        { target: '止 (zhǐ, 3rd tone)', note: 'full dip-and-rise at the end of the compound; stays third tone because nothing follows' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '必须',
      'bìxū',
      'Fourth-tone 必 (bì, "necessarily") followed by first-tone 须 (xū, "require"). The most common modal in formal rule statements; the sharp 必 sets up the high-level 须 for a decisive, no-room-for-negotiation tone.',
      'word',
      '必须实名登记 bìxū shímíng dēngjì ("must register with real name")',
      'Avoid softening 必 — a weak fourth tone makes it sound like 比 (bǐ, "compare") and breaks the modal force.',
      [
        { target: '必 (bì, 4th tone)', note: 'sharp falling pitch; carries the modal weight of the compound' },
        { target: '须 (xū, 1st tone)', note: 'high level; pronounced with rounded lips like ü' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '实名',
      'shímíng',
      'Two consecutive second tones — 实 (shí, "real") and 名 (míng, "name"). The compound that opens 实名制 (the real-name verification system) and 实名登记 (real-name registration); both syllables rise without dipping or leveling.',
      'word',
      '实名制 shímíngzhì ("real-name system") · 实名验证 shímíng yànzhèng ("real-name verification")',
      'A common learner error is to flatten 实 to a neutral middle pitch; the second tone must rise audibly or the word loses its formal weight.',
      [
        { target: '实 (shí, 2nd tone)', note: 'rising pitch; not to be confused with the 4th tone 是 (shì)' },
        { target: '名 (míng, 2nd tone)', note: 'rising pitch with a nasal -ng ending; back of the tongue on the soft palate' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '违规',
      'wéiguī',
      'Two consecutive second tones — 违 (wéi, "violate") and 规 (guī, "rule"). The umbrella term for any rule violation; appears in handbooks, posted notices, and disciplinary warnings.',
      'word',
      '违规行为 wéiguī xíngwéi ("violating behavior") · 违规处罚 wéiguī chǔfá ("punishment for violation")',
      'Both syllables rise; the rhythm mirrors 实名 and contrasts with the falling-then-level rhythm of 必须.',
      [
        { target: '违 (wéi, 2nd tone)', note: 'rising pitch; means "violate / go against"' },
        { target: '规 (guī, 1st tone)', note: 'first tone — high level; shortens the compound name for 规定 (rule)' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '一定',
      'yīdìng (spoken: yídìng)',
      '一 (yī) sandhi rule: yī becomes yí (rising) before a fourth-tone syllable. 一定 ("definitely / certainly") is one of the most common adverbs paired with rule statements — "一定要遵守" means "must definitely obey".',
      'word',
      '一定要遵守 yídìng yào zūnshǒu ("definitely must obey")',
      'Written 一定 always; only the spoken tone shifts. Skipping the sandhi makes the speech sound robotic.',
      [
        { target: '一 (written: yī)', note: 'first-tone in dictionary form' },
        { target: '一 (spoken: yí)', note: 'rises to second tone because 定 (dìng) is fourth — sandhi rule from Foundation' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Rules, compliance, consequences
    // ────────────────────────────────────────────────────────────────────
    createContentItem('规定', 'guīdìng', 'A stated rule or regulation; the formal noun appearing in handbooks, contracts, and posted notices. Used as both a noun ("the rule") and a verb ("to regulate / stipulate"). More formal than 规矩 (guījǔ), which refers to everyday social customs.', 'word', '公司有严格的规定。', 'Company-handbook register; the firm has strict regulations covering attendance, dress, and conduct.', null, [ACT.vocabularyRules]),
    createContentItem('政策', 'zhèngcè', 'Policy — typically used for organization-wide or government-level rules rather than individual prohibitions. A 政策 sets the framework; specific 规定 implement it. Phrases like 公司政策 (company policy) and 党的政策 (the Party\'s policy) are common.', 'word', '加班政策最近调整了。', 'HR-register language; "the overtime policy was recently adjusted" — typical handbook update phrasing.', null, [ACT.vocabularyRules]),
    createContentItem('禁止', 'jìnzhǐ', 'To forbid / prohibit — the formal verb used on signs, in laws, and in official notices. Always negative and always non-negotiable; you will not see 禁止 on a recommendation. Pairs directly with the forbidden action: 禁止 + verb.', 'word', '此处禁止停车。', 'Posted-sign register; "parking is forbidden here" — typical street-corner notice.', null, [ACT.vocabularyRules]),
    createContentItem('允许', 'yǔnxǔ', 'To permit / allow — the formal verb opposite of 禁止. Used in policy language and conditional statements ("X is permitted only if Y"). More formal than 可以; you would not say 允许 in casual speech about everyday choices.', 'word', '不允许带宠物入内。', 'Posted-sign register; "pets are not permitted inside" — common on shop and lobby doors.', null, [ACT.vocabularyRules]),
    createContentItem('必须', 'bìxū', 'Must — the strongest obligation modal in formal rule statements. Used before a verb to state a hard requirement whose violation triggers a defined penalty. Stronger than 要 (yào, "need to") and unlike 应该 (should), carries enforcement weight.', 'word', '员工必须按时打卡。', 'Workplace-handbook register; "employees must clock in on time" — typical attendance-policy phrasing.', null, [ACT.vocabularyRules]),
    createContentItem('不许', 'bùxǔ', 'Not allowed — the everyday spoken counterpart to 禁止. Slightly less formal than 禁止 but stronger than 不能 (cannot); often used by parents to children, teachers to students, and supervisors to employees in spoken instruction.', 'word', '不许在走廊里跑。', 'School-rule register; "no running in the hallway" — direct, authoritative spoken prohibition.', null, [ACT.vocabularyRules]),
    createContentItem('罚款', 'fákuǎn', 'Fine — both a noun ("a fine") and a verb ("to fine someone"). The standard monetary penalty for rule violations in China; you will hear it linked to traffic, public-smoking, and waste-separation rules. Amounts are usually stated as 罚款 + 金额.', 'word', '违规停车罚款两百元。', 'Posted-sign register; "illegal parking fine 200 yuan" — typical Beijing street-sign wording.', null, [ACT.vocabularyRules]),
    createContentItem('警告', 'jǐnggào', 'Warning — both a noun and a verb. A formal warning issued before a heavier penalty; in workplaces, written warnings (书面警告) build up to dismissal. Lighter than 罚款 in financial impact but heavier in personnel record.', 'word', '第一次违规给予警告。', 'HR-register language; "a warning is issued on the first violation" — standard progressive-discipline phrasing.', null, [ACT.vocabularyRules]),
    createContentItem('违规', 'wéiguī', 'To violate the rules / a rule violation. The umbrella term covering any breach of 规定 — used as a verb ("to violate") and as a modifier ("violating behavior / violator"). Appears constantly in disciplinary notices and posted warnings.', 'word', '违规者将被处罚。', 'Posted-sign register; "violators will be punished" — common notice language at gates and entryways.', null, [ACT.vocabularyRules]),
    createContentItem('遵守', 'zūnshǒu', 'To obey / comply with — the formal verb for following rules, contracts, laws, or agreements. Pairs with abstract objects like 规定, 法律, 协议, 纪律. The active counterpart of 违规.', 'word', '请大家遵守宿舍规定。', 'Dormitory-notice register; "everyone please comply with dorm rules" — polite formal request to a group.', null, [ACT.vocabularyRules]),
    createContentItem('安检', 'ānjiǎn', 'Security check — short for 安全检查 (ānquán jiǎnchá). Universal in China at subway stations (24-hour), airports, train stations, government buildings, and major shopping malls. Always involves X-ray scanning of bags and often a quick personal scan.', 'word', '过安检需要五分钟。', 'Subway-station register; "going through security takes five minutes" — practical commuter timing language.', null, [ACT.vocabularyRules]),
    createContentItem('验证', 'yànzhèng', 'To verify / verification — used for identity, account, ticket, and document verification. The procedural verb that often pairs with 实名: 实名验证 is the act of confirming your real identity against your registered name.', 'word', '请完成手机号验证。', 'App-and-service register; "please complete phone-number verification" — standard onboarding instruction.', null, [ACT.vocabularyRules]),
    createContentItem('实名', 'shímíng', 'Real-name (as opposed to anonymous or pseudonymous). The legally required identity-binding standard in China for mobile phones, train tickets, internet posts, hotel check-ins, and many app accounts. Often appears as 实名制 (the real-name system) or 实名登记.', 'word', '买高铁票必须实名。', 'Policy-statement register; "buying a high-speed-rail ticket requires real-name ID" — example of the 实名制 in practice.', null, [ACT.vocabularyRules]),
    createContentItem('登记', 'dēngjì', 'To register / sign in — used for hotel check-in, visitor registration at gated buildings, government services, and any official record-keeping. Closely paired with 实名 in the compound 实名登记 (registering under your real name).', 'word', '访客请在门口登记。', 'Gated-building register; "visitors please register at the gate" — typical sign at workplace and apartment-compound entrances.', null, [ACT.vocabularyRules]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: Public-space + workplace
    // ────────────────────────────────────────────────────────────────────
    createContentItem('禁止吸烟', 'jìnzhǐ xīyān', 'No smoking — the universal Chinese public-space prohibition. Posted in all indoor public buildings, on subways, in airports, in restaurants, and on most office floors. Violation typically carries a 罚款 in regulated buildings.', 'word', '本楼禁止吸烟，违者罚款。', 'Posted-sign register; "this building is non-smoking; violators will be fined" — common workplace and hotel signage.', null, [ACT.vocabularyPublicWorkplace]),
    createContentItem('禁止拍照', 'jìnzhǐ pāizhào', 'No photos — common in museums, government buildings, military zones, certain religious sites, and inside some workplaces (especially R&D and finance). Often paired with a no-video phrase 禁止录像.', 'word', '展厅内禁止拍照。', 'Museum-and-gallery register; "no photography inside the exhibition hall" — standard institutional posting.', null, [ACT.vocabularyPublicWorkplace]),
    createContentItem('禁止入内', 'jìnzhǐ rùnèi', 'No entry — posted at restricted areas, employee-only zones, ongoing-construction sites, and after-hours buildings. Sometimes qualified: 非工作人员禁止入内 ("non-staff no entry"). Heavier than 谢绝入内, which is a polite refusal.', 'word', '施工区域禁止入内。', 'Worksite register; "no entry to the construction area" — safety-critical posting at any active site.', null, [ACT.vocabularyPublicWorkplace]),
    createContentItem('禁止携带', 'jìnzhǐ xiédài', 'Prohibited from carrying — the security-check phrase listing forbidden items. Always followed by a specific item: 禁止携带液体, 禁止携带打火机, 禁止携带刀具. The grammatical frame Beijing subway passengers see daily.', 'word', '安检处禁止携带液体超过100毫升。', 'Subway-security register; "liquids over 100mL prohibited at security" — universal Beijing subway rule.', null, [ACT.vocabularyPublicWorkplace]),
    createContentItem('请勿', 'qǐng wù', 'Please do not — the polite-formal alternative to 禁止. Used on signs that want to soften the prohibition while keeping it clear; common in libraries, hotels, and high-end stores. 请勿 + verb is the typical pattern: 请勿吸烟, 请勿喧哗.', 'word', '请勿大声喧哗。', 'Library-and-quiet-zone register; "please do not make loud noise" — softened formal prohibition.', null, [ACT.vocabularyPublicWorkplace]),
    createContentItem('上班时间', 'shàngbān shíjiān', 'Office hours / working hours — the contracted working period stated in your employment agreement. Beijing standard is 9-to-6 (often 朝九晚六) or 9-to-9-6-days-a-week (the controversial 996 schedule); precise hours vary widely.', 'word', '上班时间是早上九点到下午六点。', 'HR-handbook register; "working hours are 9 AM to 6 PM" — standard contract-clause phrasing.', null, [ACT.vocabularyPublicWorkplace]),
    createContentItem('着装要求', 'zhuózhuāng yāoqiú', 'Dress code — the workplace-policy term for what clothing employees must wear. Beijing offices range from 商务正装 (business formal) at banks and law firms to 商务休闲 (business casual) at most tech and design firms.', 'word', '客户会议有正式着装要求。', 'HR-handbook register; "client meetings have a formal dress-code requirement" — typical policy line.', null, [ACT.vocabularyPublicWorkplace]),
    createContentItem('出差报销', 'chūchāi bàoxiāo', 'Business-trip expense reimbursement — the procedure for getting back money you spent on a work trip. Requires 发票 (official tax receipts) attached to a reimbursement form; in China, the 发票 system is heavily regulated and you cannot reimburse without one.', 'word', '出差报销需要原始发票。', 'Finance-policy register; "business-trip reimbursement requires original receipts" — universal Chinese workplace rule.', null, [ACT.vocabularyPublicWorkplace]),
    createContentItem('加班政策', 'jiābān zhèngcè', 'Overtime policy — the rules governing extra work hours and their compensation. Chinese labor law (劳动法) specifies maximum overtime hours and pay multipliers; many companies have their own internal policy on top.', 'word', '加班政策最近做了调整。', 'HR-handbook register; "the overtime policy was recently adjusted" — common internal-memo phrasing.', null, [ACT.vocabularyPublicWorkplace]),
    createContentItem('请假流程', 'qǐngjià liúchéng', 'Leave-request procedure — the steps an employee must follow to request time off (sick leave 病假, personal leave 事假, annual leave 年假). Usually involves an OA system request and supervisor approval at least one day in advance.', 'word', '请假流程要在系统里提交申请。', 'HR-handbook register; "the leave procedure requires submitting a request in the system" — typical internal-process phrasing.', null, [ACT.vocabularyPublicWorkplace]),
    createContentItem('考勤', 'kǎoqín', 'Attendance tracking — the system of recording when employees arrive and leave. Done via 打卡 (clocking in, often by facial recognition or fingerprint) at the office entrance. Monthly 考勤记录 feeds into payroll and performance reviews.', 'word', '考勤记录每月发邮件。', 'HR-system register; "attendance records are emailed each month" — typical company practice.', null, [ACT.vocabularyPublicWorkplace]),
    createContentItem('打卡', 'dǎkǎ', 'To clock in / out — the act of registering attendance at the office. Modern Chinese offices typically use facial recognition or app-based 打卡; older systems use ID cards or fingerprints. Phrase: 上班打卡 (clock in), 下班打卡 (clock out).', 'word', '迟到没打卡的算违规。', 'HR-policy register; "late arrival without clocking in counts as a violation" — typical attendance rule.', null, [ACT.vocabularyPublicWorkplace]),
    createContentItem('保密协议', 'bǎomì xiéyì', 'Non-disclosure agreement (NDA) — the legal document binding employees to confidentiality about company information. Standard in tech, finance, and consulting roles; violation carries both civil liability and possible criminal penalties.', 'word', '入职时要签保密协议。', 'HR-onboarding register; "an NDA must be signed at onboarding" — universal practice in professional firms.', null, [ACT.vocabularyPublicWorkplace]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar I: 必须 / 应该 / 可以 / 不能
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '必须',
      'bìxū — must (hard requirement)',
      'Place 必须 directly before the verb. 必须 + V states a non-negotiable requirement whose violation triggers a defined penalty (罚款, 警告, 开除). Stronger than 要 (yào, "need to") and unlike 应该 (should), carries enforcement weight.',
      'sentence',
      '员工必须按时打卡。 ("Employees must clock in on time.")',
      'The default modal in posted handbooks and contracts; if you can name a penalty for breaking the rule, 必须 is the right modal.',
      [
        { target: '必须 + verb', note: 'fixed pattern; modal stays the same regardless of subject' },
        { target: '员工必须打卡', note: 'employees must clock in — typical workplace rule' },
        { target: '游客必须出示证件', note: 'visitors must present ID — typical gated-building rule' },
      ],
      [ACT.grammarModals],
    ),
    createContentItem(
      '应该',
      'yīnggāi — should (strong recommendation)',
      'Place 应该 directly before the verb. 应该 + V marks behavior that is morally or culturally expected but not strictly enforced; non-compliance attracts social pressure or supervisor disapproval but no formal penalty. Softer than 必须, firmer than 最好 (it would be best).',
      'sentence',
      '同事生病的时候，你应该问候一下。 ("When a colleague is sick, you should send a polite check-in message.")',
      'The modal of choice for office etiquette, professional courtesy, and unwritten cultural expectations.',
      [
        { target: '应该 + verb', note: 'fixed pattern; modal stays the same regardless of subject' },
        { target: '不应该 + verb', note: 'should not — the negated form for things one is expected not to do' },
        { target: '应该 vs 必须', note: 'same factual content, lighter enforcement — switching between them is a register choice, not a content change' },
      ],
      [ACT.grammarModals],
    ),
    createContentItem(
      '可以',
      'kěyǐ — may (permission granted)',
      'Place 可以 directly before the verb. 可以 + V grants permission — the action is allowed but not required. Common at gates and counters when staff confirm what visitors are allowed to do. The negation 不可以 means "may not" and is slightly more formal than 不能.',
      'sentence',
      '午休时间可以使用手机。 ("You may use your phone during lunch break.")',
      'The permission counterpart to 不能; the everyday yes/no permission pair in workplaces and public spaces.',
      [
        { target: '可以 + verb', note: 'permission granted; action is allowed' },
        { target: '不可以 + verb', note: 'permission denied; slightly more formal than 不能, common on signs' },
        { target: '可以…，但是…', note: 'common qualifier frame: "you may X, but Y" — for conditional permissions' },
      ],
      [ACT.grammarModals],
    ),
    createContentItem(
      '不能',
      'bùnéng — cannot (permission denied)',
      'Place 不能 directly before the verb. 不能 + V denies permission and typically pairs with a reason ("because the rule states…"). The everyday spoken counterpart of 不许; less formal than 禁止 but covers the same prohibition function in conversation.',
      'sentence',
      '宿舍里不能留宿外人。 ("You cannot have outsiders stay overnight in the dormitory.")',
      'Use when you are stating the rule conversationally rather than reading it off a sign — sounds natural in a senior-to-junior briefing.',
      [
        { target: '不能 + verb', note: 'permission denied; the everyday prohibition modal' },
        { target: '不能 vs 不许', note: '不许 is slightly stronger and more authoritative; 不能 leaves room to explain why' },
        { target: '不能 vs 禁止', note: '禁止 is sign-language formal; 不能 is spoken-conversation register' },
      ],
      [ACT.grammarModals],
    ),
    createContentItem(
      '四种力度对比',
      'sì zhǒng lìdù duìbǐ',
      'The four modals graded on the same factual content: leaving the office at lunch. 必须 leave (forced break by policy) → 应该 leave (recommended for health) → 可以 leave (allowed if you want) → 不能 leave (must stay at desk). Same verb, four different rule weights.',
      'sentence',
      '午休你必须 / 应该 / 可以 / 不能离开办公室。',
      'Drill this contrast to feel the register difference — learners who only use 必须 sound robotic; mixing modals signals a competent rule briefer.',
      [
        { target: '必须离开', note: 'enforced lunch policy; staying would be a violation' },
        { target: '应该离开', note: 'culturally expected; staying signals workaholism' },
        { target: '可以离开', note: 'permitted; many people stay at their desk by choice' },
        { target: '不能离开', note: 'forbidden; perhaps you are on duty or covering reception' },
      ],
      [ACT.grammarModals],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar II: 只有…才…
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '只有…才…',
      'zhǐyǒu… cái… — only if A, then B',
      'The exclusive-necessary-condition frame: A is the ONLY way to achieve B. Place 只有 directly before the necessary condition (A), and 才 immediately before the verb in the result clause (B). Stronger than 如果 (if), which allows other paths; narrower than 要 (when/if).',
      'sentence',
      '只有完成实名登记，才能入住宿舍。 ("Only after completing real-name registration can you move into the dormitory.")',
      'The standard frame for procedural gates — registration, verification, security checks — where there is genuinely only one path forward.',
      [
        { target: '只有 + condition', note: 'marks A as the sole necessary condition' },
        { target: '才 + verb', note: 'placed immediately before the verb in the result clause; never moves to the front' },
        { target: '只有 A，才 B', note: 'fixed word order; both halves must appear together' },
      ],
      [ACT.grammarOnlyIf],
    ),
    createContentItem(
      '才 vs 就 contrast',
      'cái vs jiù',
      'Critical distinction: 才 marks something happening LATER or ONLY UNDER A condition; 就 marks something happening EARLIER or SIMPLY because of a condition. 只有…才… means "only if A, then B happens at all"; 只要…就… means "as long as A, then B easily happens".',
      'sentence',
      '只有实名登记才能入住。 ("Only with real-name registration can you move in.")\n只要带身份证就能入住。 ("As long as you bring your ID, you can move in.")',
      'A common learner error is to use 就 where 才 belongs — this weakens the exclusivity and accidentally makes the rule sound easy to meet.',
      [
        { target: '只有 A 才 B', note: 'exclusive — A is the only path to B; if not A, then no B' },
        { target: '只要 A 就 B', note: 'sufficient — A is enough for B; other paths might also exist' },
        { target: 'wrong: 只有 A 就 B', note: 'ungrammatical mixing of the two frames; results in incoherent meaning' },
      ],
      [ACT.grammarOnlyIf],
    ),
    createContentItem(
      '只有…才… in policy',
      'zhǐyǒu… cái… in policy contexts',
      'Three common applications. Procedural gate: 只有通过安检，才能进站 ("only after passing security can you enter the station"). Authorization: 只有经理批准，才可以加班 ("only with manager approval may you work overtime"). Eligibility: 只有员工才能进入这间办公室 ("only employees may enter this office").',
      'sentence',
      '只有完成所有培训，才能正式上岗。 ("Only after completing all training can you officially start work.")',
      'A trademark frame of Chinese workplace and public-space policy; recognizable on signs and in handbooks.',
      [
        { target: 'procedural gate', note: 'security check, registration — the sole path to the next step' },
        { target: 'authorization', note: 'manager approval, official permit — the sole valid trigger' },
        { target: 'eligibility', note: 'staff status, age, ID — the sole qualifying attribute' },
      ],
      [ACT.grammarOnlyIf],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar III: 除非…否则…
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '除非…否则…',
      'chúfēi… fǒuzé… — unless A, otherwise B',
      'The exception-and-default-consequence frame: B will happen by default; A is the only exception that prevents it. Place 除非 before the exception clause (A) and 否则 before the default-consequence clause (B). Both halves are required; the order is fixed.',
      'sentence',
      '除非有特殊情况，否则不能请假。 ("Unless there is a special circumstance, you cannot take leave.")',
      'The standard phrasing of Chinese policy documents and posted warning signs — formal, anticipatory, and emphasis on the consequence.',
      [
        { target: '除非 + exception', note: 'marks A as the sole condition that prevents the default' },
        { target: '否则 + consequence', note: 'marks B as the default outcome when A does not apply' },
        { target: '除非 A，否则 B', note: 'fixed word order; never reverse 除非 and 否则' },
      ],
      [ACT.grammarUnless],
    ),
    createContentItem(
      '除非 vs 如果不',
      'chúfēi vs rúguǒ bù',
      '除非…否则… and 如果不…就… can both express "if not A, then B". 除非…否则… is more formal and emphasizes the consequence as a default; 如果不…就… is everyday speech and emphasizes the condition.',
      'sentence',
      'Formal: 除非有医生证明，否则不能销假。 ("Unless there is a doctor\'s note, the leave cannot be cleared.")\nCasual: 如果没有医生证明，就不能销假。 ("If you don\'t have a doctor\'s note, you can\'t clear the leave.")',
      'Use 除非…否则… for written policy and formal explanations; use 如果不…就… for friendly conversation about the same rule.',
      [
        { target: '除非…否则…', note: 'formal register; posted notices, handbooks, official emails' },
        { target: '如果不…就…', note: 'casual register; conversation, friendly explanations' },
        { target: 'same content, different weight', note: 'switching between them is a register choice, not a content change' },
      ],
      [ACT.grammarUnless],
    ),
    createContentItem(
      '除非…否则… in notices',
      'chúfēi… fǒuzé… in posted notices',
      'Three common applications. Gate-keeping: 除非出示员工证，否则禁止入内 ("unless you show your staff ID, entry is prohibited"). Penalty: 除非提前申请，否则视为违规 ("unless applied in advance, this is treated as a violation"). Time-bound: 除非紧急情况，否则下班后不接电话 ("unless an emergency, no calls after work hours").',
      'sentence',
      '除非已完成保密协议，否则不能进入实验室。 ("Unless the NDA has been signed, you cannot enter the laboratory.")',
      'A trademark frame in Chinese workplace policy notices; recognizable instantly to native readers as formal rule language.',
      [
        { target: 'gate-keeping', note: 'who is allowed past the threshold and on what condition' },
        { target: 'penalty trigger', note: 'what counts as a violation and what the default consequence is' },
        { target: 'time-bound exception', note: 'when a normally-prohibited action is permitted under specific circumstances' },
      ],
      [ACT.grammarUnless],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading and Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '北京地铁规则',
      'Běijīng dìtiě guīzé',
      'A posted-notice-style excerpt of Beijing subway passenger rules. Read aloud with the deliberate cadence of a public sign — short clauses, clear modals, explicit consequences. Identify which rules use 禁止, which use 必须, and which describe penalties.',
      'sentence',
      '◆ 北京地铁乘客须知 ◆\n1. 所有乘客必须接受安检。禁止携带液体超过100毫升。\n2. 车厢内禁止吸烟、禁止饮食。违规者将被罚款。\n3. 只有持有效车票，才能进站。\n4. 老人、孕妇、残疾人应该优先就座。\n5. 除非紧急情况，否则不能使用紧急制动按钮。\n· 违反以上规定的乘客，将依法处理。',
      'Translation: "Beijing Subway Passenger Notice — 1. All passengers must undergo security check. Carrying liquids over 100mL is prohibited. 2. Smoking and eating are forbidden in the car. Violators will be fined. 3. Only with a valid ticket can you enter the station. 4. Elderly, pregnant, and disabled passengers should be given priority seating. 5. Unless in an emergency, the emergency brake button must not be used. — Passengers who violate the above rules will be dealt with according to law."',
      [
        { target: '必须接受安检', note: 'mandatory security check — the universal Beijing subway rule' },
        { target: '禁止携带 / 禁止吸烟 / 禁止饮食', note: 'three posted prohibitions stacked in one notice — typical sign density' },
        { target: '只有持有效车票，才能进站', note: 'Grammar II frame applied to a gate-keeping rule' },
        { target: '除非紧急情况，否则不能…', note: 'Grammar III frame applied to a safety-equipment rule' },
        { target: '将依法处理', note: '"will be dealt with according to law" — the standard closing of any official notice' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '清华公司员工手册',
      'Qīnghuá gōngsī yuángōng shǒucè',
      'A workplace-handbook excerpt from a Beijing tech company. Compared with the subway notice, the register is more procedural — fewer 禁止, more 必须 and 应该 — because workplace rules emphasize attendance, dress, and process rather than safety prohibitions.',
      'sentence',
      '◆ 员工手册节选 ◆\n1. 上班时间为周一至周五，早九点至晚六点。员工必须按时打卡。\n2. 着装要求商务休闲，会见客户时应该穿正装。\n3. 出差报销必须提供原始发票，否则不予报销。\n4. 加班需提前申请。只有经理批准，才可以加班。\n5. 请假流程：在OA系统提交申请，至少提前一天。除非紧急情况，否则不接受当日请假。\n· 违反规定者，第一次警告，第二次罚款，第三次记入档案。',
      'Translation: "Employee Handbook Excerpt — 1. Working hours: Mon–Fri, 9 AM to 6 PM. Employees must clock in on time. 2. Dress code is business casual; formal wear should be worn when meeting clients. 3. Business-trip reimbursement requires original receipts; otherwise it will not be reimbursed. 4. Overtime requires advance application. Only with manager approval may overtime be worked. 5. Leave procedure: submit a request in the OA system at least one day in advance. Unless an emergency, same-day leave requests are not accepted. — For rule violators: warning on first offense, fine on second, recorded in file on third."',
      [
        { target: '必须按时打卡', note: 'attendance is the most enforced workplace rule' },
        { target: '应该穿正装', note: 'dress is recommended, not enforced — note the 应该 register shift' },
        { target: '只有经理批准，才可以加班', note: 'Grammar II frame as overtime gate-keeper' },
        { target: '除非紧急情况，否则不接受当日请假', note: 'Grammar III frame defining the exception window' },
        { target: '警告 → 罚款 → 记入档案', note: 'progressive discipline sequence — typical Beijing-workplace penalty stack' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '阅读理解',
      'yuèdú lǐjiě',
      'Four standard comprehension questions covering both texts. Answer each in a short sentence; full sentences are not required for natural spoken Mandarin.',
      'sentence',
      'Q1: 地铁里能带多少毫升的液体? Q2: 地铁里禁止做什么? Q3: 公司加班需要什么? Q4: 违规三次会有什么后果?',
      'Two factual lookup questions, one rule-recall, one consequence-chain — designed to exercise all four obligation modals and both grammar frames.',
      [
        { target: 'A1: 不超过100毫升。', note: 'short factual answer; "not exceeding 100mL"' },
        { target: 'A2: 禁止吸烟和饮食。', note: 'two-item prohibition answer using 禁止' },
        { target: 'A3: 经理批准。', note: 'short authorization answer; full sentence: 只有经理批准才可以加班' },
        { target: 'A4: 记入档案。', note: 'consequence answer; literally "recorded in file"' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Listening and Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '入职说明',
      'rùzhí shuōmíng',
      'A 6-turn onboarding dialogue between a senior colleague (前辈) and a new hire (新同事) at a Beijing office. Covers attendance, dress code, overtime, and the leave-request procedure. Notice the modal grading — strict rules use 必须, recommendations use 应该, permissions use 可以.',
      'conversation',
      '前辈: 欢迎加入公司! 我先把基本规定告诉你。\n新同事: 好的，麻烦您了。\n前辈: 首先，上班时间是早九晚六，必须按时打卡。迟到三次就算违规，要罚款。\n新同事: 明白。那着装方面呢?\n前辈: 平时商务休闲就可以，但会见客户的时候应该穿正装。\n新同事: 加班政策是怎么样的?\n前辈: 只有经理批准才可以加班。除非项目紧急，否则我们不鼓励加班。\n新同事: 那请假流程呢?\n前辈: 在OA系统提交申请，至少提前一天。除非生病或者紧急情况，否则不能当天请假。\n新同事: 都记住了。谢谢您!\n前辈: 不客气，有不清楚的随时问。',
      'Notice how the senior shifts modals: 必须 for attendance (hard rule with penalty), 可以 for dress (everyday permission), 应该 for client meetings (recommendation), 只有…才… for overtime (gate-keeping), 除非…否则… for same-day leave (exception frame).',
      [
        { target: '必须按时打卡', note: 'attendance — hard rule, modal 必须, penalty 罚款' },
        { target: '应该穿正装', note: 'client-meeting dress — recommendation, modal 应该, no formal penalty' },
        { target: '只有经理批准才可以加班', note: 'overtime — gate-keeping, Grammar II frame' },
        { target: '除非紧急情况，否则不能当天请假', note: 'leave — exception frame, Grammar III' },
        { target: '不客气', note: '"you\'re welcome" — standard closing courtesy phrase' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      '问答练习',
      'wèndá liànxí',
      'Three follow-up questions you might ask the senior colleague after the briefing. Practice asking each one and predicting how the senior would respond using the modals from this lesson.',
      'sentence',
      'Q1: 如果我感冒了，可以当天请假吗? Q2: 加班有加班费吗? Q3: 着装要求包括鞋子吗?',
      'Each question tests a different modal in the expected answer: Q1 wants 可以 (permission), Q2 wants 必须 (mandatory pay) or 应该 (negotiable), Q3 wants 应该 (cultural expectation) or no answer.',
      [
        { target: 'A1: 生病可以，但需要医生证明。', note: 'conditional permission — 可以 paired with a 但 qualifier' },
        { target: 'A2: 按公司政策，加班应该有加班费。', note: 'expected practice — 应该 plus reference to 公司政策' },
        { target: 'A3: 鞋子也应该正式，特别是见客户的时候。', note: 'cultural expectation — 应该 plus contextual qualifier' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '写作模板',
      'xiězuò múbǎn',
      'A reusable template for a dorm welcome notice covering required actions, forbidden actions, and consequences. Slot your own dorm-specific details in for each bracket.',
      'sentence',
      '◆ 新生须知 ◆\n欢迎来到 [宿舍名称]! 入住前请阅读以下规定。\n1. 必须 [required action 1]，否则不能入住。\n2. 进出大门必须 [required action 2]。\n3. 宿舍内不能 [forbidden action 1]，违规将 [consequence 1]。\n4. 不许 [forbidden action 2]，第一次警告，第二次罚款。\n5. 只有 [exception condition]，才可以 [normally-forbidden action]。\n6. 除非 [emergency exception]，否则 [default rule].\n请大家自觉遵守，有问题请联系宿管。',
      'Six slots cover the core: registration, gate ID, two prohibitions, one exclusive condition, one exception frame — the minimum complete dorm rule notice.',
      [
        { target: '[required action 1]', note: 'most commonly: 完成实名登记 (complete real-name registration)' },
        { target: '[required action 2]', note: 'most commonly: 出示学生证 (show your student ID)' },
        { target: '[forbidden action 1]', note: 'most commonly: 留宿外人 (host overnight visitors)' },
        { target: '[forbidden action 2]', note: 'most commonly: 吸烟 (smoking) or 使用大功率电器 (use high-wattage appliances)' },
        { target: '[exception condition]', note: 'most commonly: 提前向宿管申请 (request from the dorm manager in advance)' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '写作练习',
      'xiězuò liànxí',
      'Write your own dorm welcome notice using the template, including at least one 必须, one 不能 / 不许, one 只有…才… clause, and one 除非…否则… clause. Read it aloud as if posting it on the bulletin board of your floor.',
      'sentence',
      '示例: ◆ 紫荆公寓新生须知 ◆\n欢迎来到清华大学紫荆公寓! 入住前请注意以下规定。\n1. 必须完成实名登记，并提交身份证复印件，否则不能入住。\n2. 进出大门必须刷学生证。访客需要在门口登记。\n3. 宿舍内不能留宿外人，违规将给予警告并罚款。\n4. 不许吸烟，也不许使用大功率电器，第一次警告，第二次记入档案。\n5. 只有提前向宿管申请，才可以请假外宿。\n6. 除非紧急情况，否则晚上11点以后禁止进出大门。\n请大家自觉遵守，有问题请联系宿管阿姨。',
      'Translation: "Welcome to Tsinghua Ziqing Dormitory! Please note the following rules before moving in. 1. Real-name registration and a copy of your ID are required; otherwise you cannot move in. 2. Swipe your student ID at the gate. Visitors must register at the gate. 3. Overnight visitors are forbidden; violations bring a warning and a fine. 4. No smoking and no high-wattage appliances; warning on first offense, recorded on second. 5. Only with prior request to the dorm manager may you stay outside overnight. 6. Unless in an emergency, no gate entry/exit after 11 PM. Please comply; contact the dorm aunty with questions."',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '实名制',
      'shímíngzhì',
      'China\'s real-name verification system requires identity-binding for an unusually wide range of services: mobile phone numbers, train and plane tickets, hotel check-ins, internet platform accounts (Weibo, WeChat), online posts, and in some cities even bicycle-share and convenience-store purchases. Originally rolled out for security reasons in the 2010s, the system is now infrastructural — almost no anonymous activity is possible in everyday life.',
      'sentence',
      '在中国，买手机卡必须实名，发微博也必须实名。',
      'For learners, the practical consequence is: keep your passport or residence permit on you at all times — almost any registration counter will ask for it.',
      [
        { target: '手机卡 shǒujīkǎ', note: 'SIM card — buying one requires showing ID since 2013' },
        { target: '车票 chēpiào', note: 'train/plane tickets — name on ticket must match name on ID' },
        { target: '网络发言 wǎngluò fāyán', note: 'online posting — major platforms require ID verification to post' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '地铁安检',
      'dìtiě ānjiǎn',
      'Beijing subway has 24-hour security checks at every station — bags through an X-ray scanner, sometimes a personal wand scan. Daily ridership exceeds 10 million; the scale of the operation is unique to Chinese cities. Allow 3–5 extra minutes per trip, more during rush hour. Liquids over 100mL, knives, lighters in bulk, and any weapons are forbidden.',
      'sentence',
      '所有进站乘客必须接受安检。',
      'A useful Chinese-specific commuting habit: pack a small bag, drink your bottled water before entering the station, and avoid carrying anything sharp.',
      [
        { target: '安检处 ānjiǎn chù', note: 'security checkpoint — the X-ray belt at every subway station entrance' },
        { target: '液体 yètǐ', note: 'liquids — anything over 100mL must be inspected; opened containers may be tasted' },
        { target: '违禁物品 wéijìn wùpǐn', note: 'contraband items — knives, lighters in quantity, weapons, etc.' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '健康码 legacy',
      'jiànkāngmǎ legacy',
      'During 2020–2022, the QR-code health code (健康码) was a daily requirement for entering any public building — green code to enter, yellow or red triggered quarantine. The system was retired in late 2022, but its legacy lives on: the public is now used to QR-code entry checks, and many gated communities, workplaces, and event venues still use QR codes for registration and access control.',
      'sentence',
      '健康码已经取消了，但很多地方还要扫码登记。',
      'Useful context for any Beijing arrival — expect to scan a QR code at gates, lobbies, and event venues even though the health-code regime itself has ended.',
      [
        { target: '健康码 jiànkāngmǎ', note: 'health code — the 2020–2022 daily-status QR app, now retired' },
        { target: '扫码 sǎo mǎ', note: 'to scan a QR code — universal action at any building entry or counter' },
        { target: '出入登记 chūrù dēngjì', note: 'entry/exit registration — common at gated compounds and offices' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '物业 management',
      'wùyè management',
      '物业 (wùyè) is the property-management company that runs a residential compound — handling security guards, gate access, common-area maintenance, parking enforcement, and rule disputes. They post notices on bulletin boards, send WeChat-group messages, and conduct door visits for serious violations. The 物业 office is your first point of contact for any apartment rule issue; they are not the landlord but they enforce the residential rules.',
      'sentence',
      '小区的规定由物业管理。',
      'For learners renting in Beijing, knowing how to interact with the 物业 is essential — they hold the keys to access cards, parking permits, and dispute resolution.',
      [
        { target: '物业 wùyè', note: 'property management company; runs the day-to-day operations of a residential compound' },
        { target: '小区 xiǎoqū', note: 'residential compound; a gated cluster of apartment buildings — the standard Beijing housing form' },
        { target: '门禁卡 ménjìnkǎ', note: 'access card — issued by 物业 for entry through the compound gate' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '党的政策',
      'dǎng de zhèngcè',
      '"The Party\'s policy" — the rhetorical framing common to any official rule announcement from a state-affiliated source. The phrase signals that the rule is non-negotiable, centrally directed, and politically authorized. You will see it in workplace bulletins, school notices, and any government-adjacent announcement. Foreign learners should recognize the phrase without engaging politically — it functions as a formal-register marker rather than an invitation to debate.',
      'sentence',
      '根据党的政策，公司决定…',
      'Distinguishes top-down policy directives from ordinary 公司政策 (company policy) — the former carries political weight, the latter is internal management.',
      [
        { target: '党的政策', note: '"the Party\'s policy" — top-down state-affiliated directive' },
        { target: '公司政策', note: '"company policy" — internal management decision' },
        { target: '国家规定', note: '"state regulations" — legally enforceable government rules' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '任务: 清华宿舍新生briefing',
      'rènwù: Qīnghuá sùshè xīnshēng briefing',
      'Roleplay welcoming a new exchange student to your floor of the Tsinghua dormitory. Cover the required actions, the forbidden actions, the consequences, and at least one 只有…才… clause and one 除非…否则… clause. The new student will ask follow-up questions; answer naturally.',
      'conversation',
      '[Tsinghua dorm hallway]\n新生: 你好! 我刚搬过来，请问宿舍有什么规定吗?\n你: [打招呼 + 介绍主要规定]\n新生: 我必须做什么登记?\n你: [实名登记 + 身份证]\n新生: 那哪些事不能做呢?\n你: [禁止吸烟 + 不能留宿外人]\n新生: 如果我违规会怎么样?\n你: [警告 + 罚款 + 记档案]\n新生: 有什么例外情况吗?\n你: [除非…否则… + 只有…才…]\n新生: 明白了，谢谢你!\n你: [道别 + 提供联系方式]',
      'Eight turns covering the full rule briefing. The tutor will play the new student and follow up with realistic questions about each rule.',
      [
        { target: '打招呼', note: '你好 / 欢迎 — open warmly with the polite register' },
        { target: '必须 + 实名登记 + 身份证', note: 'state the required actions with the hard-requirement modal' },
        { target: '禁止 / 不能 + 吸烟 / 留宿外人', note: 'state the forbidden actions with prohibition vocabulary' },
        { target: '警告 → 罚款 → 记档案', note: 'state the progressive consequence chain' },
        { target: '除非…否则… / 只有…才…', note: 'apply both grammar frames at least once in the explanation' },
        { target: '道别', note: '有问题随时找我 / 加个微信 — friendly close with offer to stay in touch' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战 — 处理质疑',
      'tiǎozhàn — chǔlǐ zhíyí',
      'Stretch goal: in the same scene, the new student pushes back on one of the rules — for example, "Why can\'t I have a friend stay over just for one night?" Respond by acknowledging the question, restating the rule with its consequence, and explaining the cultural reason (security, 物业 enforcement, 实名制 requirement).',
      'conversation',
      '新生: 为什么不能让朋友留宿一晚呢? 在我们国家都可以。\n你: 我理解。不过宿舍的规定是不允许的，因为有实名制要求 — 每个进入宿舍的人都必须登记。\n新生: 那如果只是来访呢?\n你: 来访可以，但是必须在门口登记，而且11点之前要离开。除非提前申请，否则不能留过夜。\n新生: 好的，我知道了。',
      'A natural pushback exchange; demonstrates the cultural reasoning behind the rule without dismissing the student\'s perspective.',
      [
        { target: '我理解', note: '"I understand" — empathetic opener that acknowledges the question before stating the rule' },
        { target: '实名制要求', note: '"real-name system requirement" — cultural-policy explanation, not personal preference' },
        { target: '来访可以，但是…', note: '"visits are OK, but…" — partial permission with a qualifier' },
        { target: '除非提前申请，否则不能留过夜', note: 'Grammar III applied to the specific exception' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
