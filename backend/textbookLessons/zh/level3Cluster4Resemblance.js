// Level 3 Cluster 4 — Resemblance, Comparison & Analogy (Mandarin Chinese)
// Advanced patterns for describing similarity, difference, ratio, gradient, and metaphor.
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
  orientation: 'zh-l3c4-orientation',
  pronunciation: 'zh-l3c4-pronunciation',
  vocabularySimile: 'zh-l3c4-vocab-simile',
  vocabularyComparison: 'zh-l3c4-vocab-comparison',
  grammarSimile: 'zh-l3c4-grammar-simile',
  grammarComparison: 'zh-l3c4-grammar-comparison',
  grammarScaling: 'zh-l3c4-grammar-scaling',
  reading: 'zh-l3c4-reading',
  speaking: 'zh-l3c4-speaking',
  writing: 'zh-l3c4-writing',
  culture: 'zh-l3c4-culture',
  task: 'zh-l3c4-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Describe resemblance, difference, ratio, gradient, and metaphor across three registers — casual peer talk (像, 跟…一样), polished essay style (如同, 仿佛, 相比), and literary/journalistic flourish (犹如, 简直就是).',
      'Choose the right comparison frame for the situation: bare 比 for everyday contrasts, A 不如 B for understated put-downs, 越…越… for progressive change, and 倍 for precise multiplicative ratios.',
      'Read a paragraph of Mandarin news or essay prose and identify each metaphor (比喻), simile, and proportional construction the writer deploys.',
    ],
    task: 'Picture yourself reading a 人民日报 (People\'s Daily) commentary at Tsinghua and being asked to rewrite five blunt comparison sentences in the writer\'s literary register. By the end of this lesson you should be able to swap 像 for 犹如 or 仿佛, recognize when a 比 sentence is being amplified by 远远 or 还, and unpack what 把改革比作一场马拉松 ("comparing reform to a marathon") is actually doing rhetorically.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in this lesson',
    goals: [
      'Pronounce the literary simile words crisply: 仿佛 (fǎngfú — two falling-then-rising tones), 犹如 (yóurú — two rising tones), 简直 (jiǎnzhí — third + second), 相对 (xiāngduì — first + fourth), and 倍 (bèi — sharp fourth tone).',
      'Distinguish the near-homophones 像 (xiàng, "resemble") and 向 (xiàng, "towards") — same Pinyin and same tone, only context and Hanzi distinguish them; mis-hearing one for the other is a common learner pitfall.',
      'Apply the 不 sandhi inside 不如 (bùrú → bùrú, no change because rú is 2nd tone) and 不像 (bùxiàng → búxiàng, sandhi because xiàng is 4th tone).',
    ],
    task: 'Read each example aloud, mark the tone shape of every syllable, and identify whether any sandhi rule applies.',
  },
  {
    id: ACT.vocabularySimile,
    section: 'Vocabulary I',
    title: 'The 像 family — simile words from casual to literary',
    goals: [
      'Memorize the six core simile markers (像, 好像, 如同, 仿佛, 犹如, 似的) and rank them on the register gradient from spoken-casual to written-literary.',
      'Know which markers can stand alone as full verbs (像, 好像), which require a noun complement (如同, 犹如), and which attach to the end of a clause (似的).',
    ],
    task: 'For each of six sample sentences, replace the simile marker with one from a different register and judge whether the new sentence still sounds natural.',
  },
  {
    id: ACT.vocabularyComparison,
    section: 'Vocabulary II',
    title: 'Comparison, ratio, and progression vocabulary',
    goals: [
      'Use the comparison toolbox: 比 (compare), 不如 (not as good as), 相比 (compared with), 相似 (similar), 相同 (identical), 相反 (opposite), 相对 (relatively).',
      'Use the scaling toolbox: 倍 (times), 一倍 (twice / one-fold), 两倍 (twice / three-fold depending on parse), 越来越 (more and more), 越…越… (the more X, the more Y).',
    ],
    task: 'Pair each item with the situation it best fits: casual chat, formal report, journalistic essay, or literary description.',
  },
  {
    id: ACT.grammarSimile,
    section: 'Grammar I',
    title: 'Simile constructions — 像/好像/如同/仿佛/犹如/似的 and A 像 B 一样',
    goals: [
      'Form a simile with 像 + N + (一样) + adj: "A is like N (in being adj)". Drop 一样 in conversational speech; keep it in writing for clarity.',
      'Use the literary upgrades 如同, 仿佛, 犹如 — same syntax as 像, higher register; never use them with a peer in casual chat without sounding theatrical.',
      'Use the post-clause marker 似的 (shìde, often pronounced shìde or shìde) attached to the end of a phrase: "好像在做梦似的" — pairs naturally with 好像/像 at the start.',
    ],
    task: 'Write five resemblance sentences in three registers each (casual / essay / literary), and verify that the register signal is consistent across the sentence.',
  },
  {
    id: ACT.grammarComparison,
    section: 'Grammar II',
    title: 'Comparison combinatorics — 比, 不如, 没有…那么…',
    goals: [
      'Use the basic comparison A 比 B + adj: "A is more adj than B". Amplify with degree adverbs: 还 (even more), 更 (even more), 远远 (far more), 略 (slightly).',
      'Use A 不如 B + (adj) for "A is not as good as B" — note that 不如 carries an evaluative tilt ("worse than"), not just "less than".',
      'Use A 没有 B (那么/这么) + adj for "A is not as adj as B" — the neutral negative comparison without the evaluative tilt of 不如.',
      'Use A 跟/和 B 一样 (+ adj) for "A is the same as B (in adj)"; A 跟/和 B 不一样 for "A is different from B".',
    ],
    task: 'Build a 4x4 grid: for each of four comparison patterns, write one sentence in each of four registers.',
  },
  {
    id: ACT.grammarScaling,
    section: 'Grammar III',
    title: 'Scaling and proportion — 越…越…, 越来越, 倍, A 是 B 的 + 倍数',
    goals: [
      'Use 越来越 + adj for "more and more X" describing a continuous change: 天气越来越冷 ("the weather is getting colder and colder").',
      'Use 越 V1 越 V2 / 越 adj1 越 adj2 for "the more X, the more Y": 越学越有意思 ("the more I study, the more interesting it gets").',
      'Use the multiplier patterns: A 是 B 的 N 倍 ("A is N times B"); A 比 B 多 N 倍 (a notorious trap — "A is (N+1) times B in total"); A 是 B 的一半 ("A is half of B").',
    ],
    task: 'For three pairs of numbers, write the proportional statement in three forms (是…倍, 比…多…倍, 是…的几分之几) and verify they describe the same ratio.',
  },
  {
    id: ACT.reading,
    section: 'Reading',
    title: 'Read a journalistic paragraph rich in 比喻',
    goals: [
      'Read a 4-sentence paragraph of news-essay prose and identify every simile (像/如同/仿佛), every comparison (比, 相比), every proportional construction (倍, 越来越), and every dead metaphor that has become a fixed idiom.',
      'Distinguish "live" metaphors (writer\'s creative choice — 把改革比作一场马拉松) from "dead" metaphors built into the vocabulary (经济腾飞 "economy takes flight" — nobody hears the wing-flap anymore).',
    ],
    task: 'Read the paragraph aloud once, then list every figurative device you found with its rhetorical effect in one phrase each.',
  },
  {
    id: ACT.speaking,
    section: 'Speaking',
    title: 'Estimating, comparing, and softening in real-time speech',
    goals: [
      'Combine 越来越, 比, 像 in a single 30-second monologue describing how a person, place, or trend has changed.',
      'Switch register mid-thought: open in casual 好像, escalate to essay-style 仿佛 when you want to sound thoughtful, and pull back to plain 比 when you need to land a concrete comparison.',
    ],
    task: 'Describe how Beijing has changed in the past ten years in 5–7 sentences. Use 越来越 once, 比 once, 像 once, and 相比 once. The AI tutor will play the listener.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Rewrite five blunt comparison sentences in literary register',
    goals: [
      'Take five plain 比/像 sentences and rewrite each using a literary marker (如同 / 仿佛 / 犹如 / 简直就是). The rewrite must preserve the propositional content while shifting the register from neutral to evocative.',
      'After the rewrite, identify one paragraph of Mandarin journalism or essay prose and annotate the 比喻 (metaphor) it deploys: what is being compared to what, and what rhetorical effect does the comparison achieve?',
    ],
    task: 'Write the five rewrites side-by-side with the originals. Then submit one annotated paragraph of news prose (you may use the reading paragraph from Activity 8) with each metaphor labeled.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: '比喻 — Metaphor in Chinese poetry, essay, and political speech',
    goals: [
      'Know that classical Chinese literature, from the 诗经 (Shījīng, "Book of Songs") onward, treats 比喻 (metaphor/simile) as a foundational poetic technique alongside 兴 (xìng, "evocative opening") and 赋 (fù, "direct description").',
      'Recognize that modern Mandarin journalism and political speech rely heavily on extended metaphors: 改革开放 (reform and opening) is regularly compared to a 马拉松 (marathon), 摸着石头过河 (crossing the river by feeling the stones), or 大船 (a great ship) — fixed rhetorical templates that signal a particular ideological frame.',
      'Notice how 比喻 + 成语 (chengyu — four-character idioms) interact: a single chengyu like 如鱼得水 ("like a fish in water") packs a complete simile into four syllables, and is often the punctuation mark of an extended argument.',
    ],
    task: 'Find one Chinese-language news headline using a metaphor, identify the source domain (e.g., marathon, ship, river) and the target domain (e.g., reform, the economy, education), and propose one alternative metaphor that would shift the headline\'s framing.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'Rewrite & analyze — from blunt prose to literary register',
    goals: [
      'Combine every pattern from this lesson: take a paragraph of unadorned everyday Mandarin, rewrite it in three different registers (essay, journalism, literary), and explain in one sentence per rewrite what register signal each version carries.',
      'In conversation with the AI tutor, defend each rewrite — why did you pick 仿佛 over 如同 here, why did you keep 比 plain rather than amplify with 远远?',
    ],
    task: 'Roleplay an editorial meeting at a Beijing newspaper. The AI tutor plays your editor; you pitch one paragraph in three registers and defend each choice. Aim for a 6-turn exchange entirely in Mandarin.',
  },
];

const lesson = {
  title: 'Level 3 · Cluster 4: 比喻、比较与类比 — Resemblance, Comparison & Analogy',
  category: 'daily-life',
  difficulty: 'advanced',
  targetLang: 'zh',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'making-simile', label: 'Making a simile', goal: 'Use 像/好像/如同/仿佛/犹如 to describe one thing in terms of another, choosing the register that matches the situation (peer chat vs essay vs literary).' },
    { id: 'comparing-quantitatively', label: 'Comparing quantitatively', goal: 'Use 比, 不如, 没有…那么, and the multipliers 倍/一倍/两倍 to state how much more/less one thing is than another.' },
    { id: 'describing-progression', label: 'Describing progression', goal: 'Use 越来越 and 越…越… to capture a trend or feedback loop ("the more I learn, the more I want to know").' },
    { id: 'formal-comparison-framing', label: 'Formal comparison framing', goal: 'Open a comparison in essay register with 和 B 相比 / 与 B 相比, then deliver the contrast in a complete sentence.' },
    { id: 'analyzing-metaphor', label: 'Analyzing a metaphor', goal: 'Identify the 比喻 in a piece of journalism or political speech, name the source and target domains, and explain the rhetorical effect.' },
  ],
  relatedPools: ['pos-adverbs-advanced', 'topic-society', 'topic-language'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '本课目标',
      'běn kè mùbiāo',
      'By the end of this lesson, you can describe similarity, difference, ratio, gradient, and metaphor in three registers — casual peer speech, polished essay prose, and literary or journalistic flourish — and you can analyze the 比喻 (metaphors) in a piece of Chinese-language news or commentary.',
      'word',
      '比喻 bǐyù (metaphor) · 比较 bǐjiào (comparison) · 类比 lèibǐ (analogy) · 比例 bǐlì (ratio) · 程度 chéngdù (degree)',
      'Five umbrella terms that cover the entire territory of this cluster — every pattern you learn fits under one of them.',
      [
        { target: '比喻 bǐyù', note: 'umbrella term for metaphor and simile in Chinese rhetorical theory; treated as a unified device rather than split into the two English categories' },
        { target: '比较 bǐjiào', note: 'plain comparison; the everyday cognitive act of holding two things side by side' },
        { target: '类比 lèibǐ', note: 'analogy — using a familiar relationship to explain an unfamiliar one; common in scientific writing and persuasive essay' },
        { target: '比例 bǐlì', note: 'ratio or proportion; the quantitative version of comparison' },
        { target: '程度 chéngdù', note: 'degree, extent — the dimension along which gradient adverbs like 越来越 and 远远 operate' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '真实场景',
      'zhēnshí chǎngjǐng',
      'Imagine you are reading a 人民日报 (People\'s Daily) commentary at Tsinghua University and your professor asks you to rewrite five blunt comparison sentences in the same literary register the editorial uses. You will need every simile marker, every comparison combinator, and every proportional construction in this lesson — and a feel for which register fits which sentence.',
      'word',
      '清华大学的写作课: 把五个直白的比较句改写成评论员文章的文学风格。',
      'A typical Tsinghua advanced-writing assignment: take a flat newswire-style comparison and elevate it into editorial register without distorting the facts.',
      [
        { target: '评论员文章 pínglùnyuán wénzhāng', note: 'editorial article; a fixed genre in Chinese newspapers with a recognizable literary register and rhetorical templates' },
        { target: '改写 gǎixiě', note: '"rewrite" — preserve the propositional content, change the wording and register' },
        { target: '文学风格 wénxué fēnggé', note: 'literary style; in this context means dense use of 比喻 and elevated vocabulary' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      '三种语体',
      'sān zhǒng yǔtǐ',
      'Mandarin distinguishes at least three register tiers in comparison vocabulary. Casual (peer chat, dialogue, daily speech): 像, 好像, 跟…一样, 比. Essay (workplace writing, formal correspondence, academic prose): 如同, 相比, 相对, 越来越. Literary or journalistic (editorials, poetry, oratory): 仿佛, 犹如, 简直就是, plus extended 比喻 with named source and target domains.',
      'word',
      'CASUAL: 你看，他像个小孩。 | ESSAY: 经济发展如同登山。 | LITERARY: 时间犹如流水，一去不返。',
      'Three register tiers, three vocabulary sets — pick the wrong tier and the sentence either feels theatrical or feels lazy.',
      [
        { target: 'CASUAL: 像 / 好像 / 跟…一样 / 比', note: 'peer talk, family conversation, dialogue in fiction — the default for spoken Mandarin' },
        { target: 'ESSAY: 如同 / 相比 / 相对 / 越来越', note: 'workplace writing, formal correspondence, academic prose — slightly elevated, still neutral' },
        { target: 'LITERARY: 仿佛 / 犹如 / 简直就是 / 似的', note: 'editorials, poetry, speeches, fiction with a high-register narrator — evocative and deliberate' },
      ],
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '仿佛',
      'fǎngfú',
      'A two-syllable literary simile marker meaning "as if / as though". Third tone + second tone: the first syllable dips and rises, the second glides up. The dip on 仿 is critical — flatten it and the word sounds like 方夫 (fāngfū), a different and meaningless combination.',
      'word',
      '他仿佛在做梦。 — Tā fǎngfú zài zuòmèng. ("He seems as if he is dreaming.")',
      'A polished essay marker; common in literary fiction and reflective prose. Says the same thing as 好像 but with a more deliberate, thoughtful flavor.',
      [
        { target: '仿 (fǎng, 3rd)', note: 'first syllable; full third-tone dip-and-rise in isolation, shortens to a low pitch in fast connected speech' },
        { target: '佛 (fú, 2nd)', note: 'second syllable; rising tone — same character as 佛 (Buddha) but here pronounced fú, not fó' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '犹如',
      'yóurú',
      'A two-syllable literary simile marker meaning "just like / as if". Two consecutive rising (second) tones — both syllables glide from mid to high. Belongs squarely to written and formal-spoken register; saying 犹如 in casual chat sounds theatrical.',
      'word',
      '时间犹如流水。 — Shíjiān yóurú liúshuǐ. ("Time is like flowing water.")',
      'The most literary of the simile markers; common in poetry, editorials, and ceremonial speech. Sentences using 犹如 tend to be aphoristic.',
      [
        { target: '犹 (yóu, 2nd)', note: 'first syllable; rising tone' },
        { target: '如 (rú, 2nd)', note: 'second syllable; rising tone — same character as 如 in 如同 (rútóng), 如果 (rúguǒ)' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '倍',
      'bèi',
      'The multiplier classifier meaning "times / -fold". Sharp fourth tone — pronounced decisively with a falling pitch from high to low. Pairs with a preceding number: 三倍 (sān bèi, "three times"), 一倍 (yī bèi, "one-fold = twice"). The sharpness of the tone matters because 倍 (bèi) and 备 (bèi, "prepare") share the same Pinyin and tone — context disambiguates.',
      'word',
      'A 是 B 的三倍。 — A shì B de sān bèi. ("A is three times B.")',
      'High-frequency in quantitative writing — statistics, economics, comparisons. The notorious trap with 倍 is that A 比 B 多三倍 means "A is four times B" (the original B plus three more), not "A is three times B".',
      [
        { target: '是 B 的 N 倍', note: '"is N times B" — straightforward multiplier; the safe form' },
        { target: '比 B 多 N 倍', note: '"is (N+1) times B in total" — the trap form; the N is added to the original, not multiplied' },
        { target: '一倍 yī bèi', note: 'one-fold = twice the original; "A is one-fold larger than B" means A is double B' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '简直',
      'jiǎnzhí',
      'An emphatic adverb meaning "simply / utterly / practically". Third tone + second tone: dip then rise. Often pairs with 就是 (jiùshì) to form 简直就是 ("is simply / is nothing less than"), a high-emphasis assertion common in spoken and literary register alike.',
      'word',
      '这简直就是奇迹! — Zhè jiǎnzhí jiùshì qíjì! ("This is simply a miracle!")',
      'Carries strong emphasis; using 简直 marks the speaker\'s emotional investment in the claim. Overuse in formal writing flattens its effect.',
      [
        { target: '简 (jiǎn, 3rd)', note: 'first syllable; third-tone dip-and-rise' },
        { target: '直 (zhí, 2nd)', note: 'second syllable; rising tone — same character as 直 ("straight") in 一直 (yīzhí, "continuously")' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '相对',
      'xiāngduì',
      'A two-syllable word meaning "relatively / relative". First tone + fourth tone: high level then sharp fall. Functions both as an adverb (相对便宜 "relatively cheap") and as part of fixed comparison terms (相对而言 "relatively speaking", 相对论 "relativity theory").',
      'word',
      '相对而言，A 城市的生活成本更低。 — Xiāngduì ér yán, A chéngshì de shēnghuó chéngběn gèng dī. ("Relatively speaking, City A has a lower cost of living.")',
      'Essay-register hedge — softens an otherwise blunt comparison. Pair it with 而言 ("speaking of") to open a comparison clause smoothly.',
      [
        { target: '相 (xiāng, 1st)', note: 'first syllable; high-level tone — same character as 相 in 相同 (xiāngtóng), 相似 (xiāngsì)' },
        { target: '对 (duì, 4th)', note: 'second syllable; sharp falling tone — same character as 对 ("correct") and 对面 (duìmiàn, "opposite side")' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '不如 vs 不像',
      'bùrú vs búxiàng',
      'Two negative comparison openers with different sandhi behavior. 不如 (bùrú) — 不 stays fourth tone because 如 is second tone, no sandhi. 不像 (búxiàng) — 不 changes to second tone because 像 is fourth tone, sandhi applies. Written form is always 不; only pronunciation differs.',
      'word',
      '不如 (bùrú, no sandhi) — A 不如 B 好。 vs 不像 (búxiàng, with sandhi) — A 不像 B 那么好。',
      'A clean illustration of the 不 sandhi rule from Level 1 Foundation reappearing inside Level 3 comparison vocabulary.',
      [
        { target: '不如 — 不 + 2nd tone → no sandhi, bù stays', note: '如 is second tone, so 不 keeps its fourth tone' },
        { target: '不像 — 不 + 4th tone → sandhi, bù becomes bú', note: '像 is fourth tone, so 不 rises to second tone before it' },
      ],
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: The 像 family
    // ────────────────────────────────────────────────────────────────────
    createContentItem('像', 'xiàng', 'The everyday simile verb meaning "to resemble / to be like". Highest-frequency member of the 像 family; works in any register but feels casual when used alone in writing. Functions both as a main verb (他像他爸爸 "he looks like his father") and as a simile marker (像鱼一样 "like a fish").', 'word', '她像她妈妈。', '"She resembles her mother" — bare 像 used as the main verb; complete sentence with no need for 一样.', null, [ACT.vocabularySimile]),
    createContentItem('好像', 'hǎoxiàng', 'A softer simile marker meaning "seems like / appears to be / it\'s as if". The 好 (hǎo) here is a softener, not "good" — adds tentativeness. Compared to 像, 好像 carries more epistemic uncertainty ("I\'m not sure but…") and is the standard hedge in spoken Mandarin.', 'word', '好像下雨了。', '"It seems to be raining" — typical hedge opener; the speaker has evidence (sound, sight) but hasn\'t confirmed.', null, [ACT.vocabularySimile]),
    createContentItem('如同', 'rútóng', 'An essay-register simile marker meaning "just like / similar to". One step up from 像 in formality; common in workplace writing, academic prose, and considered speech. Always followed by a noun: A 如同 B (+ adj/clause).', 'word', '生活如同一场旅行。', '"Life is like a journey" — aphorism-shaped sentence using 如同 instead of casual 像; one register higher.', null, [ACT.vocabularySimile]),
    createContentItem('仿佛', 'fǎngfú', 'A polished literary simile marker meaning "as if / as though". Carries reflective, almost dream-like flavor — common in literary fiction, reflective essays, and considered speech. Syntactically interchangeable with 好像 but registers significantly higher.', 'word', '他仿佛在听一首老歌。', '"He seems as if he is listening to an old song" — 仿佛 evokes a contemplative atmosphere that 好像 would not carry.', null, [ACT.vocabularySimile]),
    createContentItem('犹如', 'yóurú', 'The most literary of the simile markers, meaning "just like / akin to". Belongs to written and ceremonial-spoken register; in casual chat it sounds theatrical. Found in editorials, poetry, formal speeches, and high-register fiction. Pairs with aphoristic content: 时间犹如流水 ("time is like flowing water").', 'word', '青春犹如朝霞。', '"Youth is like the morning glow" — characteristic 犹如 sentence: aphoristic, evocative, would feel wrong in everyday speech.', null, [ACT.vocabularySimile]),
    createContentItem('似的', 'shìde', 'A post-clause simile particle meaning "as if / like". Attaches to the END of a phrase or clause, often paired with 好像/像 at the start: 好像在做梦似的 ("as if dreaming"). Spoken neutral tone — the 的 reduces. The double-marker construction is normal and natural in Mandarin, not redundant.', 'word', '他高兴得像孩子似的。', '"He is happy like a child" — 像…似的 double-marker structure; both markers are required for the construction to feel complete.', null, [ACT.vocabularySimile]),
    createContentItem('A 像 B 一样 + adj', 'A xiàng B yíyàng + adj', 'The full simile construction: "A is like B (in being adj)". 一样 (yíyàng) means "the same / equally" and pins down the dimension of similarity. Dropping 一样 in writing creates ambiguity; in casual speech the drop is normal.', 'sentence', '他像鱼一样会游泳。', '"He swims like a fish" — full construction; the 一样 specifies that the resemblance is in the dimension of swimming skill, not general fishiness.', null, [ACT.vocabularySimile]),
    createContentItem('A 像 B 那样 + V', 'A xiàng B nàyàng + V', 'Variant of A 像 B 一样: replace 一样 with 那样 ("that way") when describing manner or action rather than a static state. 像妈妈那样做菜 ("cook the way mom does") — manner imitation rather than property comparison.', 'sentence', '我想像爸爸那样工作。', '"I want to work the way my dad does" — 那样 marks manner; 一样 would shift the meaning to "I want to work equally hard as my dad".', null, [ACT.vocabularySimile]),
    createContentItem('简直就是', 'jiǎnzhí jiùshì', 'An emphatic identification meaning "is simply / is nothing less than". Not a simile but a stronger move: rather than "A is LIKE B", the speaker asserts "A IS B" with rhetorical heat. Common in journalism, oratory, and emotional speech.', 'sentence', '这简直就是一场马拉松!', '"This is simply a marathon!" — said of a long meeting or grueling task; the speaker is collapsing the simile-vs-identity distinction for emphasis.', null, [ACT.vocabularySimile]),
    createContentItem('比作', 'bǐzuò', 'A two-syllable verb meaning "to compare X to Y / to liken X to Y". Often paired with 把 in the 把…比作… construction: 把改革比作一场马拉松 ("comparing reform to a marathon"). The signature verb of metaphor analysis in Chinese rhetoric.', 'sentence', '记者把这次改革比作一场马拉松。', '"The reporter likens this reform to a marathon" — the explicit metaphor-construction verb; common in news commentary.', null, [ACT.vocabularySimile]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: Comparison & scaling
    // ────────────────────────────────────────────────────────────────────
    createContentItem('比', 'bǐ', 'The basic comparison marker meaning "more than / compared to". Pattern: A 比 B + adj ("A is more adj than B"). Critically, the adjective comes AT THE END and takes NO 很 (hěn) — saying A 比 B 很好 is a learner error; correct is A 比 B 好.', 'sentence', '今天比昨天热。', '"Today is hotter than yesterday" — the canonical 比 construction; 热 (hot) takes no 很 because 比 already supplies the comparative force.', null, [ACT.vocabularyComparison]),
    createContentItem('比 + 还/更', 'bǐ + hái/gèng', 'Amplifiers for 比 sentences: 还 (hái, "even more") and 更 (gèng, "even more"). Pattern: A 比 B 还/更 + adj ("A is even more adj than B"). 还 carries a slight surprise flavor; 更 is neutral intensification.', 'sentence', '他比我更高。 / 他比我还高。', '"He is even taller than me" — both are natural; 还 implies surprise ("he\'s taller than me, of all people"), 更 is plain comparative intensification.', [
      { target: '还 hái', note: 'amplifier with a slight surprise or emphasis flavor — "even more so than you would expect"' },
      { target: '更 gèng', note: 'plain comparative intensifier — "even more"; the neutral choice' },
    ], [ACT.vocabularyComparison]),
    createContentItem('比 + 远远/略', 'bǐ + yuǎnyuǎn/lüè', 'Degree adverbs that scale the comparison: 远远 (yuǎnyuǎn, "far / by a wide margin") and 略 (lüè, "slightly / a bit"). Pattern: A 比 B 远远/略 + adj. These adverbs go BEFORE the adjective, not after.', 'sentence', 'A 国的GDP远远超过 B 国。 / 今天比昨天略冷。', '"A\'s GDP far exceeds B\'s" / "Today is slightly colder than yesterday" — 远远 and 略 are essay-register scalers; the wide-margin vs slight-margin distinction matters in formal writing.', null, [ACT.vocabularyComparison]),
    createContentItem('A 不如 B', 'A bùrú B', 'Negative comparison meaning "A is not as good as B / A falls short of B". Carries an evaluative tilt — 不如 implies B is better, not just larger. Pattern can be bare (A 不如 B) or extended (A 不如 B + adj: A 不如 B 高 "A is not as tall as B" but with a value judgment).', 'sentence', '今天的天气不如昨天。', '"Today\'s weather is not as good as yesterday\'s" — bare 不如 form; the evaluative "worse" is built into the construction even without an explicit adjective.', null, [ACT.vocabularyComparison]),
    createContentItem('A 不像 B 那么…', 'A bú xiàng B nàme…', 'Negative comparison meaning "A is not as adj as B". Pattern: A 不像 B 那么 + adj. Unlike 不如 (which is evaluative), 不像…那么… is a neutral negative comparison — just states that A falls short on the named dimension.', 'sentence', '我不像他那么高。', '"I am not as tall as him" — neutral negative comparison; no value judgment, just a height fact. Compare to 我不如他高 which would tilt evaluative.', null, [ACT.vocabularyComparison]),
    createContentItem('A 没有 B 那么…', 'A méiyǒu B nàme…', 'Another neutral negative comparison: "A is not as adj as B". Pattern: A 没有 B 那么/这么 + adj. Synonymous with 不像 B 那么 in most contexts; slightly more colloquial in feel.', 'sentence', '这家餐厅没有那家那么贵。', '"This restaurant is not as expensive as that one" — natural colloquial negative comparison; the 那么 specifies the dimension (expense, not size or anything else).', null, [ACT.vocabularyComparison]),
    createContentItem('A 跟 B 一样', 'A gēn B yíyàng', 'Equality comparison meaning "A is the same as B (in being adj)". Pattern: A 跟 B 一样 + (adj). 跟 (gēn) is the colloquial connector; 和 (hé) is the slightly more formal variant. Both work identically in this pattern.', 'sentence', '我跟他一样高。 / 这本书和那本一样有趣。', '"I am as tall as him" / "This book is as interesting as that one" — neutral equality comparison; works for any shared adjective.', null, [ACT.vocabularyComparison]),
    createContentItem('A 跟 B 不一样', 'A gēn B bù yíyàng', 'Difference comparison meaning "A is different from B". Negation form of A 跟 B 一样. Often used without specifying the dimension: 我跟他不一样 means "we are different (in some salient way)".', 'sentence', '中文和英语很不一样。', '"Chinese and English are very different" — the 很 here intensifies the difference, equivalent to "very" in English; without 很, the sentence would feel flat.', null, [ACT.vocabularyComparison]),
    createContentItem('和 B 相比 / 与 B 相比', 'hé B xiāngbǐ / yǔ B xiāngbǐ', 'Formal essay-register comparison frame meaning "compared with B / in comparison to B". Opens a clause that sets up the comparison; the actual contrast follows. 与 is the more formal variant of 和; both are common in writing.', 'sentence', '和去年相比，今年的销售额增长了20%。', '"Compared with last year, this year\'s sales grew 20%" — characteristic essay opening; signals that a measured comparison is about to be delivered.', null, [ACT.vocabularyComparison]),
    createContentItem('A 和 B 相似 / 相同', 'A hé B xiāngsì / xiāngtóng', 'Formal sameness statements: 相似 (xiāngsì, "similar to") and 相同 (xiāngtóng, "identical to / the same as"). Both use the 相 prefix that signals reciprocity in formal Mandarin. 相似 allows degree (relatively similar); 相同 implies exact match.', 'sentence', '这两个理论很相似。 / A、B 两组的实验结果相同。', '"These two theories are very similar" / "The experimental results of groups A and B are identical" — academic register; 相似 leaves room for differences, 相同 closes the door.', null, [ACT.vocabularyComparison]),
    createContentItem('A 和 B 相反 / 相对', 'A hé B xiāngfǎn / xiāngduì', 'Formal opposition and relativity statements: 相反 (xiāngfǎn, "opposite to") and 相对 (xiāngduì, "relative to / corresponding to"). 相反 marks polar opposition; 相对 marks a relational pair without implying conflict.', 'sentence', '他的观点和我的相反。 / 自由和责任是相对的。', '"His view is the opposite of mine" / "Freedom and responsibility are relative to each other" — 相反 for direct opposition, 相对 for paired concepts that define each other.', null, [ACT.vocabularyComparison]),
    createContentItem('倍', 'bèi', 'The multiplier classifier meaning "times / -fold". Pattern: number + 倍. Three multiplier constructions live around this character: A 是 B 的 N 倍 (safe), A 比 B 多 N 倍 (trap — adds one), A 增长了 N 倍 (trap — same as 比…多). Master the safe form first.', 'sentence', 'A 城的人口是 B 城的三倍。', '"A city\'s population is three times that of B" — the safe 是…倍 form; if B has 1 million, A has 3 million.', null, [ACT.vocabularyComparison]),
    createContentItem('一倍 / 两倍', 'yī bèi / liǎng bèi', 'Specific multipliers with a famous parsing trap. 一倍 (yī bèi) means "one-fold" — which most native speakers parse as "twice the original" (a 100% increase). 两倍 (liǎng bèi) usually means "twice / two-fold" when used in 是…的两倍; but in 比…多两倍 it would mean "three times". Context disambiguates; when precision matters, use percentages.', 'sentence', '他的工资是我的两倍。 (= 2× my salary) | 他的工资比我多一倍。 (= 2× my salary, 100% more)', 'A classic Mandarin counting trap. In formal economic writing, percentages (增长了100%) are now preferred to avoid the 倍 ambiguity.', null, [ACT.vocabularyComparison]),
    createContentItem('越来越', 'yuèláiyuè', 'A progressive intensifier meaning "more and more / increasingly". Pattern: subject + 越来越 + adj/verb. The construction itself encodes time progression — 越 (yuè) means "the more"; the doubling 越来越 means "the more time passes, the more X". Pairs naturally with adjectives like 冷 (cold), 好 (good), 重要 (important).', 'sentence', '天气越来越冷了。 / 中文越来越重要。', '"The weather is getting colder and colder" / "Chinese is becoming more and more important" — the 了 (le) at the end emphasizes the change; the construction is one of the most common ways to talk about trends.', null, [ACT.vocabularyComparison]),
    createContentItem('越…越…', 'yuè … yuè …', 'A proportional construction meaning "the more X, the more Y". Pattern: 越 + V1/adj1 + 越 + V2/adj2. Two clauses linked by parallel 越…越… — the second clause varies as a function of the first. The English "the more… the more…" maps closely.', 'sentence', '越学越有意思。 / 越想越生气。', '"The more I study, the more interesting it gets" / "The more I think about it, the angrier I get" — the construction captures feedback loops and gradients elegantly; very common in spoken Mandarin.', null, [ACT.vocabularyComparison]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar I: Simile constructions
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '像 family — register gradient',
      'xiàng family — register gradient',
      'The six core simile markers form a gradient from spoken-casual to written-literary: 像 (everyday, all registers) → 好像 (hedge, conversational default) → 如同 (essay) → 仿佛 (literary reflective) → 犹如 (literary aphoristic). 似的 sits orthogonally as a post-clause marker. Pick the one that matches your situation; mixing registers signals carelessness.',
      'sentence',
      'CASUAL: 他像他爸爸。 | ESSAY: 生活如同一场旅行。 | LITERARY: 时间犹如流水。',
      'Three sentences with the same propositional shape (A is like B), three different registers. Switching markers without switching the rest of the sentence creates a jarring tone clash.',
      [
        { target: '像 / 好像', note: 'casual to conversational; safest in spoken Mandarin and dialogue' },
        { target: '如同', note: 'essay register; common in workplace writing and academic prose' },
        { target: '仿佛', note: 'literary reflective; suits considered prose and literary fiction' },
        { target: '犹如', note: 'literary aphoristic; suits poetry, editorials, formal speeches' },
        { target: '似的', note: 'post-clause marker; pairs with 好像/像 at the start; spoken neutral' },
      ],
      [ACT.grammarSimile],
    ),
    createContentItem(
      'A 像 B 一样 + adj',
      'A xiàng B yíyàng + adj',
      'The full simile construction with the dimension of comparison pinned down by 一样. Pattern: A 像 B 一样 + adj/V. Without 一样, the sentence states a general resemblance; with 一样, it specifies the dimension. In writing, keep 一样 to avoid ambiguity; in casual speech, drop it when context makes the dimension obvious.',
      'sentence',
      '他像鱼一样会游泳。 / 她像太阳一样温暖。',
      '"He swims like a fish" / "She is warm like the sun" — full simile construction; the post-一样 adjective specifies what dimension of B is being applied to A.',
      [
        { target: 'A 像 B', note: 'bare form: "A resembles B" generally; works as a complete sentence' },
        { target: 'A 像 B 一样', note: 'with the comparison particle: "A is like B in the same way"' },
        { target: 'A 像 B 一样 + adj', note: 'full form: "A is adj like B (is adj)" — the dimension is specified' },
        { target: '一样 vs 那样', note: '一样 (yíyàng) marks shared property; 那样 (nàyàng) marks manner of action' },
      ],
      [ACT.grammarSimile],
    ),
    createContentItem(
      '如同/仿佛/犹如 — essay & literary',
      'rútóng / fǎngfú / yóurú — essay & literary',
      'The three written-register simile markers share identical syntax with 像 but operate at higher register tiers. 如同 fits essay prose, 仿佛 fits reflective or fictional narration, 犹如 fits aphoristic or ceremonial writing. None of them should appear in casual peer chat without sounding theatrical.',
      'sentence',
      '如同: 教育如同种树。 ("Education is like planting a tree.")\n仿佛: 他仿佛回到了童年。 ("He seems as if he has returned to childhood.")\n犹如: 这段经历犹如一场梦。 ("This experience is like a dream.")',
      'Three examples, three registers — same syntactic frame. Choosing among them is a register decision, not a meaning decision.',
      [
        { target: '如同 rútóng (essay)', note: 'common in workplace writing, academic prose, and considered speech; one step up from 像' },
        { target: '仿佛 fǎngfú (literary reflective)', note: 'common in literary fiction and reflective essays; evokes contemplative atmosphere' },
        { target: '犹如 yóurú (literary aphoristic)', note: 'common in poetry, editorials, formal speeches; pairs with aphorisms' },
      ],
      [ACT.grammarSimile],
    ),
    createContentItem(
      '好像…似的 — double marker',
      'hǎoxiàng … shìde — double marker',
      'A characteristic Mandarin simile construction with markers at BOTH ends of the clause: 好像 (or 像) opens, 似的 closes. Native speakers parse this as a single unified frame, not as redundant; dropping either end weakens the construction.',
      'sentence',
      '他好像在做梦似的。 / 这个孩子像小大人似的。',
      '"He is as if dreaming" / "This child is like a little adult" — the double-marker structure is natural and common in spoken Mandarin; learners often drop 似的 by analogy with English, which sounds incomplete.',
      [
        { target: '好像 (clause opener)', note: 'introduces the simile; carries the epistemic hedge "it seems"' },
        { target: '…似的 (clause closer)', note: 'caps the simile; carries the comparative "like / as"' },
        { target: 'Both required', note: 'dropping either feels incomplete to native speakers; the construction is a unified frame, not redundant' },
      ],
      [ACT.grammarSimile],
    ),
    createContentItem(
      '简直就是 + N — emphatic identification',
      'jiǎnzhí jiùshì + N — emphatic identification',
      'A construction that goes beyond simile to assert identity with rhetorical heat: "A is simply / utterly N". Used when the speaker wants to collapse the distance between A and N for effect. Common in journalism, oratory, and emotional speech; not a literal claim.',
      'sentence',
      '这场会议简直就是马拉松。 / 这道菜简直就是艺术品。',
      '"This meeting is simply a marathon" / "This dish is simply a work of art" — hyperbolic identification; the speaker is not literally claiming the meeting IS a marathon, just leveraging that frame for emphasis.',
      [
        { target: '简直 jiǎnzhí', note: 'emphatic adverb "simply / utterly"; marks the speaker\'s emotional investment in the claim' },
        { target: '就是 jiùshì', note: 'copula intensifier; "is exactly / is precisely"' },
        { target: '+ N', note: 'the noun that A is being collapsed into; usually a vivid image or domain' },
      ],
      [ACT.grammarSimile],
    ),
    createContentItem(
      '仿佛在 + V — as if doing X',
      'fǎngfú zài + V — as if doing X',
      'A variant of 仿佛 used to describe an ongoing action that the subject seems to be performing: 仿佛在 + V ("as if [subject] is doing V"). The 在 marks progressive aspect; the simile is over the ACTION, not over the subject itself.',
      'sentence',
      '他仿佛在听一首老歌。 / 她说话的时候，仿佛在讲故事。',
      '"He seems as if he is listening to an old song" / "When she speaks, it\'s as if she\'s telling a story" — the 仿佛在 + V construction captures impression-of-action elegantly; very common in literary description.',
      [
        { target: '仿佛 (simile marker)', note: 'opens the impression — "as if"' },
        { target: '在 + V (progressive)', note: 'marks ongoing action; equivalent to English "-ing" in the simile' },
      ],
      [ACT.grammarSimile],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar II: Comparison combinatorics
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'A 比 B + adj',
      'A bǐ B + adj',
      'The basic Mandarin comparative: "A is more adj than B". Crucially, the adjective takes NO 很 (hěn) because 比 already supplies the comparative force. Saying A 比 B 很好 is a learner error; correct is A 比 B 好. Word order is rigid: subject + 比 + standard + adjective.',
      'sentence',
      '今天比昨天热。 / 这本书比那本有意思。',
      '"Today is hotter than yesterday" / "This book is more interesting than that one" — the canonical 比 sentence. Note no 很; the comparative force comes from 比 alone.',
      [
        { target: 'A 比 B + adj ✓', note: 'correct comparative; no 很 needed' },
        { target: 'A 比 B 很 + adj ✗', note: 'common learner error; 很 is incompatible with 比 because both encode degree' },
        { target: 'Word order is rigid', note: 'subject + 比 + standard + adjective; no rearrangement allowed' },
      ],
      [ACT.grammarComparison],
    ),
    createContentItem(
      '比 + 还/更/远远/略 + adj',
      'bǐ + hái/gèng/yuǎnyuǎn/lüè + adj',
      'Amplifiers and dampeners for 比 sentences sit BETWEEN the standard and the adjective. 还 (even more, with surprise), 更 (even more, neutral), 远远 (far more, wide margin), 略 (slightly, narrow margin). The position is fixed; moving them elsewhere creates ungrammatical sentences.',
      'sentence',
      '他比我还高。 / 今天比昨天更冷。 / A 国的GDP比 B 国远远高。 / 今天比昨天略冷。',
      'Four sentences with the same structure but four different degree adverbs — each adverb signals a different magnitude of comparison and a slightly different attitudinal stance.',
      [
        { target: '还 hái', note: 'amplifier with surprise — "even more so than expected"' },
        { target: '更 gèng', note: 'plain comparative intensifier — "even more"' },
        { target: '远远 yuǎnyuǎn', note: 'wide-margin amplifier — "far more / by a wide margin"; essay register' },
        { target: '略 lüè', note: 'narrow-margin dampener — "slightly / a bit"; essay register' },
      ],
      [ACT.grammarComparison],
    ),
    createContentItem(
      'A 不如 B — A is not as good as B',
      'A bùrú B — A is not as good as B',
      'A negative comparison with an evaluative tilt: 不如 implies B is better, not just larger. Pattern can be bare (A 不如 B) or specified (A 不如 B + adj). When specified, the adjective names the dimension on which B exceeds A; in either case the speaker is judging B more positively.',
      'sentence',
      'BARE: 今天的天气不如昨天。 ("Today\'s weather isn\'t as good as yesterday\'s.")\nSPECIFIED: A 校的师资不如 B 校强。 ("A\'s faculty isn\'t as strong as B\'s.")',
      'The evaluative tilt distinguishes 不如 from neutral negative comparisons like 不像…那么 and 没有…那么. If you don\'t want to signal a value judgment, choose one of the neutral forms.',
      [
        { target: '不如 — evaluative tilt', note: '"A falls short of B" — implies B is better, not just different' },
        { target: 'Bare form: A 不如 B', note: 'leaves the dimension unspecified; reader infers from context' },
        { target: 'Specified form: A 不如 B + adj', note: 'names the dimension; explicit comparative statement' },
      ],
      [ACT.grammarComparison],
    ),
    createContentItem(
      'A 不像 B 那么 / A 没有 B 那么',
      'A bú xiàng B nàme / A méiyǒu B nàme',
      'Two neutral negative comparisons meaning "A is not as adj as B". Unlike 不如 (which is evaluative), these are purely descriptive — they state that A falls short on the named dimension without implying B is "better". Use them when you want to avoid judging.',
      'sentence',
      '我不像他那么高。 / 这家餐厅没有那家那么贵。',
      '"I am not as tall as him" / "This restaurant isn\'t as expensive as that one" — neutral negative comparisons; no value judgment in either.',
      [
        { target: 'A 不像 B 那么 + adj', note: 'neutral negative comparison; works in any register' },
        { target: 'A 没有 B 那么 + adj', note: 'synonymous; slightly more colloquial in spoken Mandarin' },
        { target: '那么 / 这么', note: '那么 = "that much"; 这么 = "this much" — use 那么 when B is the distant referent' },
      ],
      [ACT.grammarComparison],
    ),
    createContentItem(
      'A 跟/和 B 一样 / 不一样',
      'A gēn/hé B yíyàng / bù yíyàng',
      'Equality and inequality comparisons: A 跟 B 一样 ("A is the same as B") and A 跟 B 不一样 ("A is different from B"). Pattern: A 跟/和 B 一样 + (adj). 跟 (gēn) is the colloquial connector; 和 (hé) is slightly more formal; both work identically in this pattern.',
      'sentence',
      'EQUAL: 我跟他一样高。 ("I am as tall as him.")\nDIFFERENT: 中文和英语很不一样。 ("Chinese and English are very different.")\nDIFFERENT (specified): 这本书和那本不一样有趣。 ("This book is not as interesting as that one.")',
      'The simplest equality/inequality frame; works for any shared dimension. Add 很 before 不一样 to intensify the difference: 很不一样 ("very different") is one of the most common phrases in everyday Mandarin.',
      [
        { target: 'A 跟/和 B 一样 + adj', note: 'equality on a shared dimension; very common in spoken Mandarin' },
        { target: 'A 跟/和 B 不一样', note: 'difference statement; often used without specifying the dimension' },
        { target: '跟 vs 和', note: '跟 is more colloquial, 和 slightly more formal; both work in this pattern' },
        { target: '很不一样', note: 'intensified difference; "very different" — common idiomatic combination' },
      ],
      [ACT.grammarComparison],
    ),
    createContentItem(
      '和/与 B 相比 — formal framing',
      'hé/yǔ B xiāngbǐ — formal framing',
      'Essay-register comparison frame meaning "compared with B / in comparison to B". Opens a clause; the actual contrast follows. 与 (yǔ) is more formal than 和 (hé); both common in writing. Often paired with 而言 ("speaking of") for an even more formal opening: 与 B 相比而言.',
      'sentence',
      '和去年相比，今年的销售额增长了20%。 / 与传统方法相比，这种方法更有效。',
      '"Compared with last year, this year\'s sales grew 20%" / "Compared with traditional methods, this method is more effective" — characteristic essay opening; signals that a measured comparison is about to be delivered.',
      [
        { target: '和 B 相比 (essay)', note: 'essay-register frame; common in workplace writing and analyses' },
        { target: '与 B 相比 (formal essay)', note: 'more formal than 和; common in academic and government writing' },
        { target: '相比而言', note: 'extension with 而言 ("speaking of"); even more formal opening' },
        { target: '相比之下', note: 'common variant: "in comparison" — works as a transitional phrase between sentences' },
      ],
      [ACT.grammarComparison],
    ),
    createContentItem(
      'A 和 B 相似 / 相同 / 相反 / 相对',
      'A hé B xiāngsì / xiāngtóng / xiāngfǎn / xiāngduì',
      'Four formal sameness/difference statements built on the 相 prefix (which signals reciprocity). 相似 (similar, with degree), 相同 (identical, exact match), 相反 (opposite, polar opposition), 相对 (relative, paired relation). All four are essay/academic register; all four take the frame A 和 B (XYZ).',
      'sentence',
      '相似: 这两个理论很相似。 ("These two theories are very similar.")\n相同: A、B 两组的实验结果相同。 ("The experimental results are identical.")\n相反: 他的观点和我的相反。 ("His view is the opposite of mine.")\n相对: 自由和责任是相对的。 ("Freedom and responsibility are relative to each other.")',
      'Four near-synonyms with sharp distinctions: 相似 allows degree, 相同 implies match, 相反 implies opposition, 相对 implies pairing without conflict. Picking among them is a precision decision in academic writing.',
      [
        { target: '相似 xiāngsì (similar)', note: 'allows degree; "somewhat similar" works, "exactly similar" does not' },
        { target: '相同 xiāngtóng (identical)', note: 'implies exact match; does not allow degree modifiers' },
        { target: '相反 xiāngfǎn (opposite)', note: 'polar opposition; common in argumentative writing' },
        { target: '相对 xiāngduì (relative)', note: 'paired relation without conflict; common in philosophical and theoretical writing' },
      ],
      [ACT.grammarComparison],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar III: Scaling & proportion
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '越来越 + adj/V',
      'yuèláiyuè + adj/V',
      'A progressive intensifier meaning "more and more / increasingly". Pattern: subject + 越来越 + adj/V. The construction encodes time progression — 越 (yuè) means "the more"; the doubling 越来越 captures "the more time passes, the more X". Often paired with sentence-final 了 (le) to emphasize the change.',
      'sentence',
      '天气越来越冷了。 / 中文越来越重要。 / 我越来越喜欢这个城市。',
      '"The weather is getting colder and colder" / "Chinese is becoming more and more important" / "I like this city more and more" — three sentences showing 越来越 with an adjective, a stative verb, and an emotion verb.',
      [
        { target: '越来越 + adj', note: 'adjective complement: "increasingly adj" — 越来越冷 ("colder and colder")' },
        { target: '越来越 + V', note: 'verb complement: "increasingly V" — 越来越喜欢 ("like more and more")' },
        { target: '+ 了 (sentence-final)', note: 'emphasizes the change; "has become more and more X"' },
      ],
      [ACT.grammarScaling],
    ),
    createContentItem(
      '越 V1 越 V2 / 越 adj1 越 adj2',
      'yuè V1 yuè V2 / yuè adj1 yuè adj2',
      'A proportional construction meaning "the more X, the more Y". Pattern: 越 + V1/adj1 + 越 + V2/adj2. Two clauses linked by parallel 越…越… — the second clause varies as a function of the first. Captures feedback loops, gradients, and "the more, the more" relationships elegantly.',
      'sentence',
      '越学越有意思。 ("The more I study, the more interesting it gets.")\n越想越生气。 ("The more I think about it, the angrier I get.")\n越走越远。 ("The further I walk, the farther it gets.")',
      'The English "the more… the more…" maps closely. The construction is one of the most common ways to express dynamic relationships in spoken Mandarin.',
      [
        { target: '越 V1 越 V2 (two verbs)', note: '"the more I do V1, the more I do V2" — 越看越喜欢 ("the more I look, the more I like")' },
        { target: '越 adj1 越 adj2 (two adjectives)', note: '"the more adj1 X is, the more adj2 X is" — 越快越好 ("the faster, the better")' },
        { target: '越 V 越 adj (mixed)', note: 'common combination — 越学越有意思 ("the more I study, the more interesting it gets")' },
      ],
      [ACT.grammarScaling],
    ),
    createContentItem(
      'A 是 B 的 N 倍 — safe multiplier',
      'A shì B de N bèi — safe multiplier',
      'The unambiguous multiplier construction: "A is N times B". Pattern: A 是 B 的 + number + 倍. If B has 1 million and N = 3, A has 3 million. This is the form that economists and statisticians prefer because there is no parsing trap.',
      'sentence',
      'A 城的人口是 B 城的三倍。 / 这本书的价格是那本的两倍。',
      '"A city\'s population is three times that of B" / "This book\'s price is twice that one\'s" — the safe form; the multiplier is exactly what it says.',
      [
        { target: 'A 是 B 的 N 倍', note: 'safe form: A = N × B; no ambiguity' },
        { target: 'N 倍 placement', note: 'after 的 and before any classifier; modifies the implied quantity' },
        { target: 'Recommended for precision', note: 'use this form in writing whenever the multiplier matters; avoid 比…多…倍 unless you know its parsing convention' },
      ],
      [ACT.grammarScaling],
    ),
    createContentItem(
      'A 比 B 多 N 倍 — trap multiplier',
      'A bǐ B duō N bèi — trap multiplier',
      'A notorious parsing trap: "A is (N+1) times B in total". The N here is added to the original, not multiplied. If B has 1 million and N = 3, A has 4 million, not 3 million. Native speakers parse this convention automatically; learners and even some careful writers avoid it in favor of percentages.',
      'sentence',
      'A 城的人口比 B 城多三倍。 (= 4× B, not 3× B!) | A 增长了一倍。 (= doubled, = 200% of original)',
      'The same construction with 增长了…倍 also follows this convention. If precision matters, switch to 增长了 N% or 是…的 N 倍 to avoid the trap.',
      [
        { target: '比 B 多 N 倍 = (N+1) × B', note: 'the original B plus N more = total of (N+1) × B' },
        { target: '增长了 N 倍 = (N+1) × original', note: 'same convention for percent-growth statements' },
        { target: 'Modern preference', note: 'percentages (增长了100%) or 是…的…倍 are now preferred in formal writing to avoid the trap' },
      ],
      [ACT.grammarScaling],
    ),
    createContentItem(
      'Fractions & halves',
      'fractions & halves',
      'For partial proportions, Mandarin uses 一半 ("half"), 三分之一 ("one-third"), 四分之三 ("three-quarters") — the pattern 分之 forms denominator-of-numerator fractions. Pattern: A 是 B 的 + fraction. The denominator comes before 分之, the numerator after.',
      'sentence',
      'A 城的人口是 B 城的一半。 / 这个项目完成了三分之二。',
      '"A city\'s population is half of B\'s" / "This project is two-thirds complete" — proportional statements for less-than-one ratios.',
      [
        { target: '一半 yī bàn (one half)', note: 'special form; not formed with 分之 — just one syllable + 半' },
        { target: 'N 分之 M (M/N fraction)', note: 'denominator first, then 分之, then numerator: 三分之一 = 1/3' },
        { target: 'A 是 B 的 + fraction', note: 'frame for proportional statements with less-than-one ratios' },
      ],
      [ACT.grammarScaling],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '阅读: 评论员文章片段',
      'yuèdú: pínglùnyuán wénzhāng piànduàn',
      'A four-sentence excerpt of editorial-register Mandarin prose, dense with similes, comparisons, and proportional constructions. Read it aloud once, then identify each rhetorical device — simile marker, comparison, multiplier, dead metaphor.',
      'sentence',
      '改革开放四十年来，中国经济的发展速度远远超过了世界平均水平。和上世纪八十年代相比，今天的 GDP 增长了近三十倍，城乡居民收入越来越接近，社会面貌焕然一新。这场改革仿佛一场马拉松，跑得越久，参与者越能感受到方向的重要。我们或许可以这样说: 中国的现代化进程，犹如一条奔腾不息的长河，正在汇入世界发展的大海。',
      'Translation: "Over the forty years of reform and opening, China\'s economic growth rate has far exceeded the world average. Compared with the 1980s, today\'s GDP has grown nearly thirtyfold, urban-rural income gaps are narrowing, and the social landscape has been completely renewed. This reform is like a marathon — the longer you run, the more participants come to feel the importance of direction. Perhaps we can put it this way: China\'s modernization is like a surging, unceasing river, flowing into the great sea of global development."',
      [
        { target: '远远超过', note: '"far exceeds" — 远远 amplifier + 超过 verb; essay-register quantitative comparison' },
        { target: '和…相比', note: '"compared with…" — essay-register comparison frame opening the second sentence' },
        { target: '增长了近三十倍', note: '"grown nearly thirtyfold" — uses the 比…多…倍 convention; 近 (jìn, "nearly") softens the claim' },
        { target: '越来越接近', note: '"more and more close" — progressive intensifier describing the narrowing gap' },
        { target: '仿佛一场马拉松', note: '"like a marathon" — literary 仿佛 + the classic reform-as-marathon metaphor in modern Chinese political rhetoric' },
        { target: '越久…越能', note: '"the longer… the more…" — proportional construction inside the marathon simile' },
        { target: '犹如一条奔腾不息的长河', note: '"like a surging, unceasing river" — literary 犹如 + extended metaphor; the river-of-development image is a fixed rhetorical template' },
        { target: '焕然一新', note: 'four-character idiom meaning "completely renewed / takes on an entirely new look"; functions as a dead metaphor with no live image' },
        { target: '奔腾不息', note: 'four-character phrase meaning "surging without ceasing"; a stock literary intensifier' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      '辨认修辞手法',
      'biànrèn xiūcí shǒufǎ',
      'A second pass over the same paragraph, this time labeling each rhetorical device with its function. Distinguish live metaphors (the writer\'s creative choice) from dead metaphors (built into the vocabulary).',
      'sentence',
      '直接比较: 远远超过 / 和八十年代相比 / 越来越接近\n比例说明: 增长了近三十倍\n明喻 (simile): 仿佛一场马拉松 / 犹如一条奔腾不息的长河\n递进 (gradient): 跑得越久，参与者越能感受到\n成语 (set idioms / dead metaphors): 焕然一新 / 奔腾不息',
      'Five categories of rhetorical device, each with its own discourse function. The live metaphors (marathon, river) are the writer\'s creative work; the dead ones (focal-new, surging-ceaseless) are pre-built phrases.',
      [
        { target: 'Live metaphor: marathon', note: 'the writer chose to compare reform to a marathon; this is a creative editorial decision that frames reform as long, paced, requiring endurance' },
        { target: 'Live metaphor: river → sea', note: 'modernization as a river joining a sea; frames China as part of a larger world process, not a separate path' },
        { target: 'Dead metaphor: 焕然一新', note: 'literally "shining-renewed-one-new" — nobody hears the shine anymore; functions as a fixed phrase meaning "completely renewed"' },
        { target: 'Dead metaphor: 奔腾不息', note: 'literally "galloping-without-rest"; functions as a stock intensifier — the horse image is no longer felt' },
        { target: 'Comparison + amplifier', note: '远远超过 uses the wide-margin amplifier to push the claim; this is a quantitative-stylistic choice' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '说话练习: 北京的变化',
      'shuōhuà liànxí: Běijīng de biànhuà',
      'A 5–7 sentence monologue describing how Beijing has changed in the past ten years. Use 越来越 once, 比 once, 像 once, and 相比 once. Switch register mid-thought: open in conversational 好像, escalate to essay-style 仿佛 when you reflect, pull back to plain 比 when you land a concrete fact.',
      'sentence',
      '北京这十年变化太大了。和十年前相比，地铁线路远远比那时候多，空气也比以前好多了。我好像还记得，那时候有些地方仿佛是一个小村子，现在简直就是高科技中心。年轻人越来越多，节奏也越来越快——有时候我觉得这座城市犹如一台不停运转的机器。',
      'Translation: "Beijing has changed so much in these ten years. Compared with ten years ago, the subway lines are far more numerous than before, and the air is much better. I seem to remember that some places back then were like a small village; now they\'re simply high-tech centers. Young people are more and more numerous, and the pace is faster and faster — sometimes I feel this city is like a machine that runs without stopping."',
      [
        { target: '和十年前相比', note: 'essay-register opening; signals a measured comparison is coming' },
        { target: '远远比…多', note: 'wide-margin amplifier inside a 比 sentence' },
        { target: '好像还记得', note: 'conversational hedge; softens the memory claim' },
        { target: '仿佛是一个小村子', note: 'literary 仿佛 for reflective description' },
        { target: '简直就是高科技中心', note: 'emphatic identification; collapses the simile into identity for effect' },
        { target: '越来越多 / 越来越快', note: 'two parallel progressive intensifiers' },
        { target: '犹如一台不停运转的机器', note: 'literary 犹如 + extended machine metaphor; ends the monologue on a high register' },
      ],
      [ACT.speaking],
    ),
    createContentItem(
      '挑战: 即兴比较',
      'tiǎozhàn: jíxìng bǐjiào',
      'Stretch goal: pick any two cities, two languages, or two eras you know and compare them in 30 seconds using at least four constructions from this lesson. The AI tutor will play the listener and may ask one follow-up question.',
      'sentence',
      '例子: 首尔和北京相比，规模没有那么大，但是节奏跟北京一样快。首尔的物价好像比北京略高，但是公共交通和北京一样发达。最大的不同也许是: 首尔仿佛是一座精致的现代城市，而北京则犹如一个巨人——又古老又现代。',
      'Translation: "Compared with Beijing, Seoul is not as large in scale, but the pace is as fast as Beijing\'s. Seoul\'s prices seem slightly higher than Beijing\'s, but public transport is as developed as Beijing\'s. The biggest difference may be this: Seoul is like a refined modern city, while Beijing is like a giant — both ancient and modern."',
      null,
      [ACT.speaking],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '改写练习 1: 时间过得快',
      'gǎixiě liànxí 1: shíjiān guò de kuài',
      'Rewrite a blunt comparison sentence in literary register. Original: "时间过得很快。" ("Time passes quickly.") — flat and informational. Literary rewrite: use 犹如 or 仿佛 to evoke an image; pin the comparison to a concrete source domain (water, arrow, lightning).',
      'sentence',
      'ORIGINAL: 时间过得很快。\nLITERARY: 时间犹如流水，一去不返。 / 时间仿佛箭一般飞逝。',
      'Translation: "Time is like flowing water, gone and never returning" / "Time flies like an arrow." The literary rewrite preserves the propositional content ("time passes quickly") while delivering an image; the reader feels the speed rather than being told about it.',
      [
        { target: 'Original: factual', note: 'flat statement of a property of time; no image, no register signal' },
        { target: 'Literary 1: water metaphor', note: '犹如流水 — borrows the classical Chinese trope of time-as-water from 论语 (Confucius)' },
        { target: 'Literary 2: arrow metaphor', note: '仿佛箭一般 — borrows the speed-of-arrow trope; common in modern essay prose' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '改写练习 2: 他工作很努力',
      'gǎixiě liànxí 2: tā gōngzuò hěn nǔlì',
      'Rewrite: "他工作很努力。" ("He works hard.") — flat. Literary rewrite: deploy a simile that captures the manner and intensity of his work. Common source domains in Chinese writing: machine, soldier, ant, ox.',
      'sentence',
      'ORIGINAL: 他工作很努力。\nLITERARY: 他工作起来仿佛一台不知疲倦的机器。 / 他犹如一头默默耕作的老牛，从不停歇。',
      'Translation: "When he works, he is like a tireless machine" / "He is like an old ox plowing silently, never resting." Two different metaphors — machine evokes precision and endurance, ox evokes humility and persistence; the writer\'s choice signals attitude.',
      [
        { target: 'Original: factual', note: 'states a property without image; no register signal' },
        { target: 'Literary 1: machine metaphor', note: '仿佛一台不知疲倦的机器 — modern industrial image; evokes efficiency and endurance' },
        { target: 'Literary 2: ox metaphor', note: '犹如一头默默耕作的老牛 — classical agricultural image; evokes humility and dignity; the ox is a frequent positive figure in Chinese rhetoric, e.g., 鲁迅 (Lu Xun)\'s "俯首甘为孺子牛"' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '改写练习 3: 这件事很难',
      'gǎixiě liànxí 3: zhè jiàn shì hěn nán',
      'Rewrite: "这件事很难。" ("This task is hard.") — flat. Literary rewrite: use 犹如 or 仿佛 to compare the difficulty to a concrete obstacle. Common source domains: mountain, ocean, marathon, climbing.',
      'sentence',
      'ORIGINAL: 这件事很难。\nLITERARY: 这件事仿佛攀登一座高山。 / 完成这项任务犹如横渡大海。 / 这项改革简直就是一场马拉松。',
      'Translation: "This task is like climbing a high mountain" / "Completing this task is like crossing an ocean" / "This reform is simply a marathon." Three different metaphors — each frames the difficulty in a different shape (vertical, horizontal, durational).',
      [
        { target: 'Mountain metaphor (vertical)', note: '攀登一座高山 — frames difficulty as height to be conquered; common in achievement rhetoric' },
        { target: 'Ocean metaphor (horizontal)', note: '横渡大海 — frames difficulty as distance and risk; common in journey rhetoric' },
        { target: 'Marathon metaphor (durational)', note: '简直就是一场马拉松 — frames difficulty as endurance and pacing; common in modern reform discourse' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '改写练习 4: 他俩很像',
      'gǎixiě liànxí 4: tā liǎ hěn xiàng',
      'Rewrite: "他俩很像。" ("The two of them are very alike.") — flat. Literary rewrite: deploy 仿佛 or 犹如 with a vivid analogue, OR use 简直就是 for emphatic identification (the two are practically the same person).',
      'sentence',
      'ORIGINAL: 他俩很像。\nLITERARY: 他俩犹如一个模子里刻出来的。 / 他俩仿佛镜中的两个影子。 / 他俩简直就是同一个人。',
      'Translation: "The two of them are like carved from the same mold" / "The two of them are like two reflections in a mirror" / "The two of them are practically the same person." Three rewrites — the first uses a fixed idiom (一个模子里刻出来), the second a fresh image, the third the emphatic identification construction.',
      [
        { target: 'Mold metaphor (fixed idiom)', note: '一个模子里刻出来 — set phrase meaning "carved from the same mold"; high-frequency in Chinese descriptions of similarity' },
        { target: 'Mirror reflections metaphor', note: '镜中的两个影子 — fresh image; literary register; common in fiction' },
        { target: '简直就是同一个人', note: 'emphatic identification; collapses similarity into identity for effect' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '改写练习 5: 春天来了',
      'gǎixiě liànxí 5: chūntiān lái le',
      'Rewrite: "春天来了。" ("Spring has come.") — neutral. Literary rewrite: personify or metaphorize the arrival. Common source domains in Chinese spring writing: visitor, gift, awakening, gentle hand.',
      'sentence',
      'ORIGINAL: 春天来了。\nLITERARY: 春天仿佛一位悄悄到访的客人，没有惊动任何人。 / 春天犹如温柔的手，唤醒了沉睡的大地。',
      'Translation: "Spring is like a quietly arriving guest who has disturbed no one" / "Spring is like a gentle hand awakening the slumbering earth." The literary rewrite preserves the arrival of spring as a fact while painting the manner of arrival.',
      [
        { target: 'Quiet-guest metaphor', note: '悄悄到访的客人 — personifies spring as a guest; common in 散文 (essay) prose' },
        { target: 'Gentle-hand metaphor', note: '温柔的手 — personifies spring as a hand awakening the earth; common in poetry' },
        { target: 'Personification', note: 'both rewrites use 拟人 (nǐrén, personification) — a related rhetorical device often combined with 比喻' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      '分析: 一段新闻里的比喻',
      'fēnxī: yī duàn xīnwén lǐ de bǐyù',
      'Take the reading paragraph from Activity 8 (or any Mandarin-language news paragraph) and annotate each metaphor: identify the source domain (the image), the target domain (what is being described), and the rhetorical effect (what the writer gains by using this comparison).',
      'sentence',
      'METAPHOR 1: 这场改革仿佛一场马拉松。\nSOURCE: 马拉松 (marathon — long-distance running)\nTARGET: 改革 (reform — political/economic restructuring)\nEFFECT: frames reform as a multi-decade endurance event; emphasizes pacing, persistence, and the importance of direction (跑得越久，参与者越能感受到方向的重要)\n\nMETAPHOR 2: 中国的现代化进程，犹如一条奔腾不息的长河。\nSOURCE: 奔腾不息的长河 (a surging, unceasing river)\nTARGET: 中国的现代化进程 (China\'s modernization)\nEFFECT: frames modernization as natural, inevitable, and ultimately flowing into a larger world process (汇入世界发展的大海)',
      'Two metaphors, two source-target mappings, two rhetorical effects. The marathon emphasizes effort and direction; the river emphasizes naturalness and integration. The choice of metaphor is the choice of how the reader will frame the topic.',
      [
        { target: 'Source domain', note: 'the image being borrowed (marathon, river); usually concrete and familiar' },
        { target: 'Target domain', note: 'what is being described (reform, modernization); usually abstract or complex' },
        { target: 'Rhetorical effect', note: 'the framing the writer achieves; choosing a different source would deliver a different effect' },
      ],
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '诗经与比喻传统',
      'Shījīng yǔ bǐyù chuántǒng',
      'Classical Chinese poetics, articulated in the preface to the 诗经 (Shījīng, "Book of Songs", c. 11th–7th century BCE), identifies three foundational techniques: 赋 (fù, direct description), 比 (bǐ, comparison/metaphor), and 兴 (xìng, evocative opening through an unrelated image). 比 is the direct ancestor of every simile construction in this lesson — the 像/如同/仿佛/犹如 family is the modern descendant of a 3,000-year tradition.',
      'sentence',
      '关关雎鸠，在河之洲。窈窕淑女，君子好逑。 — 诗经，关雎\n(The osprey calls, on the river shoal. The graceful lady, a fitting match for a noble man.)',
      'The opening lines of the 诗经 use 兴 (xìng) — the image of birds calling on the river shoal evokes the love theme without stating it directly. 比 and 兴 are the bones of Chinese figurative tradition; modern editorial prose is still drawing on them.',
      [
        { target: '赋 fù — direct description', note: 'unornamented statement of fact; the baseline mode' },
        { target: '比 bǐ — comparison/metaphor', note: 'direct ancestor of modern 比喻; uses one thing to describe another' },
        { target: '兴 xìng — evocative opening', note: 'unrelated image that sets emotional tone; common in classical poetry, rarer in modern prose' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '现代散文与比喻',
      'xiàndài sǎnwén yǔ bǐyù',
      'Modern Chinese 散文 (sǎnwén, "loose prose" — essay form) inherits the classical love of 比喻 and deploys it densely. Writers like 朱自清 (Zhu Ziqing), 鲁迅 (Lu Xun), 余光中 (Yu Guangzhong) build extended metaphors as the backbone of their prose. Reading 散文 is one of the fastest ways for an advanced learner to develop a feel for which simile marker fits which moment.',
      'sentence',
      '朱自清: 月光如流水一般，静静地泻在这一片叶子和花上。 ("Moonlight, like flowing water, pours silently over the leaves and flowers.")',
      'A famous line from 朱自清\'s 荷塘月色 ("Moonlight on the Lotus Pond", 1927). Three figurative devices in one sentence: 如流水 (simile), 泻 (verb borrowed from liquids — implicit metaphor), 静静 (personification adverb). Compact and characteristic of modern 散文.',
      [
        { target: '朱自清 Zhu Ziqing (1898–1948)', note: 'master of modern 散文; his prose is a standard reference for richly figurative Mandarin' },
        { target: '鲁迅 Lu Xun (1881–1936)', note: 'pioneer of modern Chinese literature; uses metaphor with sharper political edge — 横眉冷对千夫指，俯首甘为孺子牛' },
        { target: '余光中 Yu Guangzhong (1928–2017)', note: 'Taiwanese poet and essayist; extended metaphors of homeland and language' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '新闻评论里的固定比喻',
      'xīnwén pínglùn lǐ de gùdìng bǐyù',
      'Modern Mandarin journalism and political speech rely on a set of fixed extended metaphors — rhetorical templates that signal a particular ideological frame. The marathon (改革是一场马拉松), the river-crossing (摸着石头过河), the great ship (中国这艘大船), and the boat against the current (逆水行舟，不进则退) are four of the most common. Recognizing them helps you parse the framing of the article.',
      'sentence',
      'TEMPLATE 1: 把改革比作一场马拉松。 ("Comparing reform to a marathon.")\nTEMPLATE 2: 摸着石头过河。 ("Crossing the river by feeling the stones.") — 邓小平\'s famous reform metaphor\nTEMPLATE 3: 中国这艘大船。 ("China this great ship.")\nTEMPLATE 4: 逆水行舟，不进则退。 ("Rowing against the current — not advancing is retreating.")',
      'Four fixed templates, four ideological framings: marathon = endurance and pacing, river-crossing = pragmatic experimentation, ship = collective destiny under leadership, against-the-current = constant effort to maintain progress. Editorial writers signal alignment by choosing which template to deploy.',
      [
        { target: 'Marathon (马拉松)', note: 'frames reform as long, paced, endurance-requiring; signals support for gradualist policy' },
        { target: 'River-crossing (摸着石头过河)', note: '邓小平\'s 1980s metaphor; frames policy as experimental, learning-by-doing; signals pragmatism' },
        { target: 'Great ship (大船)', note: 'frames China as a collective vessel under unified leadership; common in official discourse' },
        { target: 'Against the current (逆水行舟)', note: 'four-character idiom; frames progress as requiring constant effort; common in motivational rhetoric' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '比喻 + 成语',
      'bǐyù + chéngyǔ',
      'A signature feature of literary Mandarin: a single 成语 (chéngyǔ, four-character idiom) often packs a complete simile into four syllables. 如鱼得水 ("like a fish getting water" — perfectly at home), 如虎添翼 ("like a tiger gaining wings" — even more powerful), 度日如年 ("days passing like years" — time dragging). Using a 成语 is the most efficient way to deliver a simile in Mandarin; it also signals literary fluency.',
      'sentence',
      '他在这家公司如鱼得水。 ("He is like a fish in water at this company.")\n这次改革如虎添翼。 ("This reform is like a tiger gaining wings.")\n等你回来的日子，简直度日如年。 ("Waiting for you to return — days felt like years.")',
      'Three chengyu, three complete similes, twelve total syllables. The 如 prefix (the same character as in 如同) is the marker; the four-syllable rhythm makes them memorable and rhetorically heavy.',
      [
        { target: '如鱼得水 rú yú dé shuǐ', note: '"like a fish getting water" — perfectly at home in a context; common in workplace and relationship descriptions' },
        { target: '如虎添翼 rú hǔ tiān yì', note: '"like a tiger gaining wings" — already strong, now even more powerful; common in news about partnerships and policy boosts' },
        { target: '度日如年 dù rì rú nián', note: '"spending days like years" — time dragging painfully; common in waiting/missing contexts' },
        { target: '如临深渊 rú lín shēn yuān', note: '"as if standing at the edge of a deep abyss" — extreme caution; common in policy and safety contexts' },
        { target: '心如止水 xīn rú zhǐ shuǐ', note: '"heart like still water" — calm and undisturbed; common in meditation and resilience contexts' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '任务: 编辑部会议',
      'rènwù: biānjíbù huìyì',
      'Roleplay an editorial meeting at a Beijing newspaper. The AI tutor plays your editor; you pitch one paragraph in three registers (essay, journalism, literary) and defend each choice. Use every pattern from this lesson: simile markers, comparison combinators, scaling and proportion, fixed metaphor templates.',
      'conversation',
      '[Editorial meeting, Beijing newspaper]\n编辑: 这周的评论员文章，你想写什么主题?\n你: [Propose a topic — e.g., 中文学习, 城市变化, 改革开放四十年]\n编辑: 好。你的稿子有三个版本吗?\n你: [Yes — describe each: ESSAY uses 如同 and 和…相比; JOURNALISM uses 比 and 越来越; LITERARY uses 仿佛 and 犹如]\n编辑: 给我念一下文学版本。\n你: [Read your literary version aloud; use at least 仿佛 and 犹如 once each]\n编辑: 这个比喻为什么选河流而不是马拉松?\n你: [Defend the choice — what does river frame that marathon doesn\'t? naturalness, integration, flow]\n编辑: 那新闻版本呢，数字够不够?\n你: [Defend the journalism version — 是 B 的几倍, 增长了百分之几, 越来越]\n编辑: 我们用文学版本作为评论员文章，新闻版本作为新闻稿。',
      'Six turns of fluent exchange, switching among three registers and defending stylistic choices. The AI tutor will probe each rewrite — be ready to explain why your simile fits the framing you want.',
      [
        { target: '议题选择', note: 'choose a topic where a comparison is natural — language learning, city change, reform; avoid topics where comparison feels forced' },
        { target: '三种语体并行', note: 'essay / journalism / literary — each version should be 3–5 sentences; the propositional content should be identical, only the register varies' },
        { target: '为比喻辩护', note: 'when challenged on a metaphor, explain the framing — what source domain you chose, what rhetorical effect you wanted' },
        { target: '数字与意象', note: 'journalism version leans on numbers (倍, 百分之); literary version leans on images (河流, 马拉松)' },
        { target: '语体一致', note: 'within each version, keep the register consistent — no mixing 仿佛 with 跟…一样 in the same sentence' },
      ],
      [ACT.task],
    ),
    createContentItem(
      '挑战: 即兴评论员文章',
      'tiǎozhàn: jíxìng pínglùnyuán wénzhāng',
      'Stretch goal: the editor gives you a fresh topic on the spot (say: 中国年轻人和老一辈的区别 "the difference between young Chinese people and the older generation"). Compose a 6–8 sentence literary-register editorial paragraph in real time, using at least five constructions from this lesson and one fixed metaphor template.',
      'conversation',
      '编辑: 这个题目，三分钟后给我念一段。\n你: 和老一辈相比，今天的中国年轻人仿佛站在一条全新的河流上。他们的生活节奏远远比父辈快，接触的世界也犹如一片无边的海洋——既辽阔又陌生。我们或许可以这样说: 这一代人简直就是中国现代化进程的产物，他们越成长，越能感受到自己与世界的紧密联系。新一代和老一代不一样，但又如同两棵生长在同一片土壤里的树，根系彼此相连。',
      'Translation: "Compared with the older generation, today\'s young Chinese seem to stand on a completely new river. Their pace of life is far faster than their parents\', and the world they encounter is like a boundless ocean — both vast and unfamiliar. Perhaps we can put it this way: this generation is simply a product of China\'s modernization, and the more they grow, the more they sense their tight connection with the world. The new generation differs from the old, yet is like two trees growing in the same soil, their roots intertwined."',
      [
        { target: '和老一辈相比', note: 'essay-register comparison frame opening the paragraph' },
        { target: '仿佛站在一条全新的河流上', note: 'literary 仿佛 + river metaphor; signals the framing of generational difference as a change in landscape' },
        { target: '远远比父辈快', note: '比 sentence with the 远远 wide-margin amplifier' },
        { target: '犹如一片无边的海洋', note: 'literary 犹如 + ocean metaphor; pairs with the river image to build a water-network frame' },
        { target: '简直就是中国现代化进程的产物', note: 'emphatic identification; collapses simile into identity' },
        { target: '越成长，越能感受到', note: 'proportional 越…越… construction inside the metaphor' },
        { target: '如同两棵生长在同一片土壤里的树', note: 'closing simile with 如同 + tree metaphor; resolves the difference-vs-connection tension the paragraph set up' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
