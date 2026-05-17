// Level 1 — Foundation: Portuguese Phonology & Orthography
// First lesson on the Portuguese / Foundation track. Pre-grammar, pre-vocabulary.
// Covers the Portuguese alphabet, nasal vowels (ã, õ, ãe, õe), open/closed
// mid vowels (é/ê, ó/ô), Brazilian Portuguese (BP) palatalization of /t,d/
// before /i/, syllable-timing in BP vs stress-timing in European Portuguese
// (EP), EP vowel reduction, the sh-sound of final /s/ in EP, nasal -ão
// diphthongs, and the diacritics every learner must read at sight.
//
// All content is authored with Portuguese (target, Latin script) + a
// pronunciation cue (romanization slot) + English glosses (canonical source).
// The AI conversation tutor reads this curriculum and delivers it to each
// learner in their preferred native language at runtime — never assume a
// specific L1 in this file.
//
// Glosses follow the rich-gloss rule (AGENTS.md → "Gloss Richness"):
// every nativeText, exampleNative, and breakdown.native carries register,
// usage context, or contrast info — not a bare definition. BP is treated as
// the primary register; EP contrasts are flagged explicitly.

const createContentItem = (
  target,
  pronunciation,
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
  romanization: pronunciation,
  nativeText: note,
  pronunciation,
  exampleTarget: example || target,
  exampleNative: exampleNote || note,
  // Legacy keys for UI fallback — "korean" slot holds the target text,
  // the "english" slot holds the note.
  korean: target,
  english: note,
  example: example || target,
  exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  intro: 'pt-foundation-intro',
  alphabet: 'pt-foundation-alphabet',
  oralVowels: 'pt-foundation-oral-vowels',
  nasalVowels: 'pt-foundation-nasal-vowels',
  diphthongs: 'pt-foundation-diphthongs',
  consonants: 'pt-foundation-consonants',
  palatalization: 'pt-foundation-palatalization',
  finalS: 'pt-foundation-final-s',
  stress: 'pt-foundation-stress',
  diacritics: 'pt-foundation-diacritics',
  bpEp: 'pt-foundation-bp-ep',
  reading: 'pt-foundation-reading',
};

const activities = [
  {
    id: ACT.intro,
    section: 'Why pronunciation first',
    title: 'How Portuguese sounds are organized',
    goals: [
      'Understand that Portuguese has TWO mainstream standards (Brazilian/BP and European/EP) that share a written language but diverge sharply in pronunciation, so picking BP as your primary reference saves you from sounding inconsistent.',
      'Recognize that the most distinctive feature of Portuguese is its system of NASAL vowels (ã, õ, ãe, õe, -im, -em, -om, -um) — these are not optional, and skipping the nasal turns "pão" (bread) into "pau" (stick).',
      'Know that every Portuguese syllable has three things to track: vowel quality (open é vs closed ê, open ó vs closed ô), nasality (oral vs nasal), and stress (which syllable carries the accent).',
    ],
    task: 'Read the four structural facts. By the end of this lesson you should be able to read any written Portuguese word aloud with the correct vowel, nasal, and stress — even if you have never seen the word before.',
  },
  {
    id: ACT.alphabet,
    section: 'The Portuguese Alphabet',
    title: '26 letters + diacritics',
    goals: [
      'Recognize the 26-letter Latin alphabet used in Portuguese, including the post-2009 official integration of K, W, Y (used mostly in foreign words and units like km, watt, yoga).',
      'Read the names of each letter aloud — letter names are useful when spelling your name on the phone (especially "é" /ɛ/ vs "ê" /e/ if you have one in your name).',
    ],
    task: 'Say the alphabet aloud once in BP order (a, bê, cê, dê, é, efe, gê, agá, i, jota, ká, ele, eme, ene, ó, pê, quê, erre, esse, tê, u, vê, dáblio, xis, ípsilon, zê).',
  },
  {
    id: ACT.oralVowels,
    section: 'Oral Vowels',
    title: 'Open vs closed mid vowels (é/ê, ó/ô)',
    goals: [
      'Distinguish open /ɛ/ (é, café) from closed /e/ (ê, você) and open /ɔ/ (ó, avó "grandmother") from closed /o/ (ô, avô "grandfather") — same letter shape, opposite meaning when stressed.',
      'Notice that BP and EP differ on unstressed vowel REDUCTION: BP keeps unstressed /e/ as a clear /i/ at word-end (verde → "vérdji"), while EP reduces it almost to silence (verde → "vérd").',
    ],
    task: 'Read pairs like avó/avô, pé/pê, nós/nos aloud and mark which is open and which is closed.',
  },
  {
    id: ACT.nasalVowels,
    section: 'Nasal Vowels',
    title: 'ã, õ, -im, -em, -om, -um + nasal diphthongs',
    goals: [
      'Pronounce the five nasal vowels (ã, ẽ, ĩ, õ, ũ) by routing airflow through the nose — there is no "n" or "m" consonant after, just nasalization of the vowel itself.',
      'Recognize the nasal diphthongs ão (pão, mão, não), ãe (mãe, pães), õe (põe, lições), ui (muito) — most common is -ão, which marks many nouns and the third-person plural of -ar verbs in the future.',
    ],
    task: 'Say "pão, mão, não, sim, bem, bom, um" with full nasalization; if you can hear yourself through your nose, you are doing it right.',
  },
  {
    id: ACT.diphthongs,
    section: 'Oral Diphthongs',
    title: 'ai, ei, oi, ui, au, eu, iu, ou',
    goals: [
      'Read the eight common oral diphthongs (pai, lei, dois, fui, mau, seu, viu, sou) — both vowels are pronounced in a single syllable, with the first vowel taking most of the weight.',
      'Note one BP-specific simplification: the diphthong "ou" is often pronounced just /o/ in everyday BP speech (sou → /so/, but EP keeps it as /ow/).',
    ],
    task: 'Read each diphthong aloud paired with an everyday word (pai, lei, sou, sei, dois, fui, viu, mau, seu).',
  },
  {
    id: ACT.consonants,
    section: 'Consonants',
    title: 'C, G, J, Lh, Nh, R, Rr, S, X, Z',
    goals: [
      'Read the soft/hard pairs: c before e/i = /s/ (cidade), c elsewhere = /k/ (casa); g before e/i = /ʒ/ (gente), g elsewhere = /g/ (gato).',
      'Recognize the digraphs lh /ʎ/ (milho, filho) and nh /ɲ/ (banho, manhã) — these are SINGLE sounds, not L+H or N+H.',
      'Distinguish single r (caro = /ɾ/ tap) from rr / initial r (carro, rato = uvular /ʁ/ in BP, trill /r/ in EP) — same letter shape, very different sound depending on position.',
    ],
    task: 'Read each consonant aloud paired with a vowel (ca, ce, ci, co, cu / ga, ge, gi, go, gu / nha, nhe, nhi / lha, lhe, lhi / ra, rra).',
  },
  {
    id: ACT.palatalization,
    section: 'BP Palatalization',
    title: '/t/ and /d/ before /i/ become /tʃ/ and /dʒ/',
    goals: [
      'Apply BP palatalization automatically: t + i = /tʃi/ (tia → "chia"), d + i = /dʒi/ (dia → "djia"); this is the single biggest BP-vs-EP pronunciation difference and instantly marks a BP accent.',
      'Notice the rule also applies at word-end before unstressed e (which BP reduces to /i/): noite → "nóitchi", verdade → "verdádji".',
      'Know that EP does NOT palatalize: in Portugal, tia stays "tia" and dia stays "dia".',
    ],
    task: 'Read tia, dia, noite, verdade, tudo (NO palatalization: stressed u, not i), gente (no t/d) — identify which words trigger palatalization.',
  },
  {
    id: ACT.finalS,
    section: 'Final /s/ and /z/',
    title: 'BP /s/ vs EP /ʃ/ — the sh-sound of Lisbon',
    goals: [
      'Distinguish the BP pronunciation of final s as /s/ (mais → "máis", os meninos → "os meninus") from the EP pronunciation as /ʃ/ (mais → "maish", os meninos → "ush meninush") — same spelling, completely different acoustic signature.',
      'Note that Rio de Janeiro (carioca accent) ALSO uses /ʃ/ for final /s/, so the BP/EP line is not absolute — São Paulo, Bahia, and most of Brazil keep /s/, but Rio and EP share the sh-sound.',
    ],
    task: 'Say "as casas dos meninos" in three accents: paulista (everything /s/), carioca (final /ʃ/), and EP-Lisbon (final /ʃ/ + reduced vowels).',
  },
  {
    id: ACT.stress,
    section: 'Stress',
    title: 'Default stress + accent marks',
    goals: [
      'Apply the default Portuguese stress rule: stress falls on the second-to-last syllable (penultimate) UNLESS the word ends in r, l, z, im, um, om, us (then stress is on the LAST syllable) — examples: casa (CAsa, penult), falar (faLAR, ult), feliz (feLIZ, ult).',
      'Recognize accent marks as STRESS OVERRIDES: any word with á, é, í, ó, ú, â, ê, ô takes stress on the marked vowel — café (caFÉ), médico (MÉdico), você (voCÊ).',
      'Know that the tilde ~ marks nasalization (ã, õ), and ç ("cê-cedilha") is /s/ before a, o, u (não c, otherwise /k/).',
    ],
    task: 'Mark the stressed syllable in each word: casa, falar, médico, você, paí­s, açúcar, sábado.',
  },
  {
    id: ACT.diacritics,
    section: 'Diacritics',
    title: 'Acute, circumflex, tilde, grave, cedilla',
    goals: [
      'Read each diacritic correctly: á/é/í/ó/ú = stress + open vowel for é/ó; â/ê/ô = stress + closed vowel; ã/õ = nasal; à = grave for crase (preposition + article); ç = /s/ before a, o, u.',
      'Distinguish minimal pairs that hinge on a diacritic: pode "he can" (closed ô) vs pôde "he was able" (closed ô + past, BP no longer marks); avó "grandmother" (open ó) vs avô "grandfather" (closed ô).',
    ],
    task: 'Read each pair: avó/avô, é/é (same), por/pôr, ave/avê (not a pair), pé/pê — identify which diacritic carries which sound.',
  },
  {
    id: ACT.bpEp,
    section: 'BP vs EP overview',
    title: 'Syllable-timing vs stress-timing',
    goals: [
      'Hear the rhythmic difference: BP is SYLLABLE-timed (every syllable gets near-equal length, like Spanish) while EP is STRESS-timed (unstressed syllables compressed almost out of existence, like English). The "sing-song" of BP vs the "machine-gun" of EP is largely this rhythm difference.',
      'Note three other quick BP/EP cues: BP uses gerund (estou falando) where EP uses infinitive (estou a falar); BP "você" is the default you-singular, EP "tu" is; BP "trem" = "train", EP "comboio" = "train".',
    ],
    task: 'Read the same sentence "Estou falando com você no telefone" in BP and "Estou a falar consigo ao telefone" in EP — feel the difference in tempo and word choice.',
  },
  {
    id: ACT.reading,
    section: 'Reading Practice',
    title: 'First Portuguese aloud',
    goals: [
      'Read a four-sentence Brazilian Portuguese paragraph aloud applying every rule from this lesson: nasal vowels, palatalization, default stress, and BP final /s/.',
      'Self-check by recording yourself and listening back — most learners discover they forgot the nasal in "São" or skipped palatalization on "dia".',
    ],
    task: 'Read the practice paragraph aloud twice, then identify three rules you applied correctly and one you still need to drill.',
  },
];

const content = [
  // ────────────────────────────────────────────────────────────────────
  // Activity 1 — Intro
  // ────────────────────────────────────────────────────────────────────
  createContentItem(
    'Por que pronúncia primeiro',
    'por kê pro-NUN-sia pri-MEI-ru',
    'BP and EP share one written language but diverge sharply in spoken form. Locking BP pronunciation first means you can READ ALOUD any Portuguese text — even one written for Lisbon readers — without sounding inconsistent.',
    'word',
    'Português brasileiro (BP) — Português europeu (EP)',
    'Both are correct standards; the choice is about WHICH ONE to drill into your ear first. This course treats BP as the primary register and flags EP contrasts explicitly.',
    [
      { target: 'BP — Brasil (210M speakers)', note: 'paulista, carioca, nordestino, gaúcho, mineiro — multiple sub-accents, all syllable-timed' },
      { target: 'EP — Portugal (10M speakers)', note: 'Lisbon/northern split; stress-timed, heavy vowel reduction, /ʃ/ for final s' },
      { target: 'African PT — Angola, Mozambique, Cape Verde', note: 'closer to EP grammar, distinctive local phonology and lexicon; culturally significant' },
    ],
    [ACT.intro],
  ),
  createContentItem(
    'Os três sistemas',
    'us treis sis-TE-mas',
    'Every Portuguese syllable carries THREE pieces of information: vowel quality (open é vs closed ê, open ó vs closed ô), nasality (oral vs nasal), and stress (which syllable wins). Miss any one of the three and the word is mispronounced.',
    'word',
    'vogal × nasalidade × tonicidade',
    'These three axes are independent — café has open é + oral + final stress, while pão has nasal vowel + oral consonant + monosyllabic stress.',
    [
      { target: 'Vowel quality', note: 'open vs closed mid vowels; not a stress feature, but a phonemic one' },
      { target: 'Nasality', note: 'distinct nasal vowels (ã, õ, ẽ, ĩ, ũ) and nasal diphthongs (ão, ãe, õe)' },
      { target: 'Stress', note: 'default penultimate, overridden by accent marks or by certain final letters (r, l, z, im, um, om)' },
    ],
    [ACT.intro],
  ),
  createContentItem(
    'Por que a USP',
    'por kê a USP',
    'This curriculum anchors most BP examples at the Universidade de São Paulo (USP) — the largest research university in Latin America and the BP-speaking world\'s flagship campus. Naming a specific place gives every dialogue a real location, accent, and student population to picture.',
    'word',
    'Universidade de São Paulo (USP), São Paulo, SP, Brasil',
    'Founded 1934. Public, free tuition. The default referent whenever the curriculum says "the university" — switch to Universidade de Lisboa when an EP contrast is the focus.',
    null,
    [ACT.intro],
  ),

  // ────────────────────────────────────────────────────────────────────
  // Activity 2 — Alphabet
  // ────────────────────────────────────────────────────────────────────
  createContentItem('a', 'á', 'First letter; vowel /a/. Letter name "á" /a/. Both BP and EP agree on letter names; differences only emerge in word-internal pronunciation.', 'word', 'a — amor, água, aqui', 'Word-initial /a/ is open and clear in BP; EP unstressed initial a often centralizes toward /ɐ/.', null, [ACT.alphabet]),
  createContentItem('b', 'bê', 'Letter name "bê" /be/. Sound is /b/ everywhere — Portuguese b is a true stop, unlike Spanish where intervocalic b becomes a fricative.', 'word', 'b — bom, beber, bola', 'Spanish learners must NOT soften intervocalic /b/ in Portuguese — say "be-BER", not the Spanish-style fricative.', null, [ACT.alphabet]),
  createContentItem('c', 'cê', 'Letter name "cê" /se/. Sound depends on the next letter: c + e/i = /s/, c + a/o/u = /k/. With cedilla (ç) = /s/ before a/o/u.', 'word', 'c — casa /k/, cidade /s/, açúcar (with ç) /s/', 'Soft-c-before-e/i is identical to Spanish; the ç-cedilha handles cases where you need /s/ before a/o/u.', null, [ACT.alphabet]),
  createContentItem('d', 'dê', 'Letter name "dê" /de/. Sound is /d/ — BUT in BP, /d/ palatalizes to /dʒ/ before /i/ (dia = "djia"). EP keeps /d/ unchanged in all contexts.', 'word', 'd — dois, dia (BP /dʒi.a/), verdade (BP /-dʒi/)', 'The palatalization rule is the single biggest BP-vs-EP cue; you will hear it on every other word in São Paulo speech.', null, [ACT.alphabet]),
  createContentItem('e', 'é', 'Letter name in BP is /ɛ/ ("é" open). Pronunciation of letter e in words depends on stress: stressed = /e/ or /ɛ/, unstressed = /i/ at word-end in BP (verde → "vérdji").', 'word', 'e — você (closed ê), café (open é), de (BP /dʒi/)', 'BP word-final unstressed -e raises to /i/; EP reduces it nearly to schwa or silence.', null, [ACT.alphabet]),
  createContentItem('f', 'efe', 'Letter name "efe" /ɛfi/. Sound is /f/ — fully matches English and Spanish.', 'word', 'f — falar, filho, frio', 'No phonological surprises; one of the safest consonants for English speakers.', null, [ACT.alphabet]),
  createContentItem('g', 'gê', 'Letter name "gê" /ʒe/. Sound: g + e/i = /ʒ/ (gente "ZHEN-tchi"), g + a/o/u = /g/ (gato). To force /g/ before e/i, write gu (guerra /ge-/).', 'word', 'g — gato /g/, gente /ʒ/, guerra /g/ (silent u)', 'Same soft/hard pattern as Spanish but with /ʒ/ instead of /x/ for soft g — a much "softer" sound than Spanish jota.', null, [ACT.alphabet]),
  createContentItem('h', 'agá', 'Letter name "agá" /aˈga/. ALWAYS SILENT in Portuguese — hora = "óra", homem = "ómem". H survives only in digraphs (ch, lh, nh).', 'word', 'h — hora, homem, hotel (all silent h)', 'English speakers tend to over-pronounce h; resist the urge — Portuguese h is purely orthographic.', null, [ACT.alphabet]),
  createContentItem('i', 'i', 'Letter name "i" /i/. Vowel /i/ in nearly all positions. Triggers BP palatalization of preceding t and d (tia → "TCHI-a", dia → "DJI-a").', 'word', 'i — sim, ir, viver', 'When i follows t or d in BP, expect palatalization; in EP, no change.', null, [ACT.alphabet]),
  createContentItem('j', 'jota', 'Letter name "jota" /ˈʒɔta/. Sound is /ʒ/ — the same as soft g. Unlike Spanish jota (/x/), Portuguese j is a voiced fricative like the s in English "measure".', 'word', 'j — jogo, já, hoje', 'A frequent Spanish-speaker error: do NOT pronounce Portuguese j as /x/. Use /ʒ/.', null, [ACT.alphabet]),
  createContentItem('k', 'ká', 'Letter name "ká" /ka/. Officially added to the Portuguese alphabet in the 2009 Acordo Ortográfico, but used only in foreign words and unit abbreviations (km, kg, Kafka).', 'word', 'k — km, kg, Kafka', 'Native Portuguese words never use k; the letter is reserved for loanwords and SI units.', null, [ACT.alphabet]),
  createContentItem('l', 'ele', 'Letter name "ele" /ˈɛli/. Sound: /l/ at word start (lá, livro). At syllable end, BP velarizes to /w/ (Brasil = "bra-ZIU"), EP keeps clear /ɫ/.', 'word', 'l — lá, livro, Brasil (BP /-iw/, EP /-iɫ/)', 'The "w-ization" of final l is the second-biggest BP-vs-EP cue after t/d palatalization.', null, [ACT.alphabet]),
  createContentItem('m', 'eme', 'Letter name "eme" /ˈemi/. Sound /m/ at syllable start; at syllable end (sim, bem, bom, um), m does NOT make a consonant — it nasalizes the preceding vowel.', 'word', 'm — mãe (consonant /m/), sim (nasal vowel, no /m/), bom (nasal vowel)', 'The "silent" m at syllable end is one of the hardest features for English speakers, who keep saying "sim" with an audible /m/.', null, [ACT.alphabet]),
  createContentItem('n', 'ene', 'Letter name "ene" /ˈeni/. Sound /n/ at syllable start. At syllable end before another consonant (canto, lento), n nasalizes the preceding vowel — same nasal-vowel rule as m.', 'word', 'n — nada (consonant /n/), canto (nasal vowel + /t/), bom-dia (nasal)', 'Pair n and m mentally as "nasalization-only at syllable end".', null, [ACT.alphabet]),
  createContentItem('o', 'ó', 'Letter name "ó" /ɔ/. Pronunciation in words: stressed = /o/ or /ɔ/; unstressed (esp. word-final) = /u/ in BP (livro → "LI-vru"); EP reduces further.', 'word', 'o — avô /o/ (closed), avó /ɔ/ (open), livro /-vru/ in BP', 'Word-final unstressed o → /u/ is a defining BP feature; saying "LI-vroh" is a beginner tell.', null, [ACT.alphabet]),
  createContentItem('p', 'pê', 'Letter name "pê" /pe/. Sound /p/ — like English but UNASPIRATED (no puff of air after). Compare "pen" English (aspirated) vs "pé" Portuguese (clean /p/).', 'word', 'p — pão, pé, perto', 'English speakers must suppress the aspiration; hold a tissue to your mouth and you should NOT see it move.', null, [ACT.alphabet]),
  createContentItem('q', 'quê', 'Letter name "quê" /ke/. Always written as qu before e/i (silent u: que = /ke/, quero = /ˈkɛɾu/) or qu before a/o (audible u: quando = /ˈkwɐ̃du/, quote = /ˈkwɔ.tʃi/).', 'word', 'q — que /ke/, quando /kw-/, querer /ke-/', 'Same rule as Spanish; the u is silent only before e/i unless marked with a diaeresis (no longer used after 2009).', null, [ACT.alphabet]),
  createContentItem('r', 'erre', 'Letter name "erre" /ˈɛʁi/ in BP, /ˈɛr/ in EP. Sound depends on POSITION: single intervocalic r = /ɾ/ tap (caro); initial r or rr = /ʁ/ uvular in BP, /r/ trill in EP. Final r often dropped in BP (falar → "fa-LÁ").', 'word', 'r — caro /ɾ/, carro /ʁ/, rato /ʁ/, falar (BP /-la/, EP /-laɾ/)', 'The most position-dependent consonant in Portuguese. Single intervocalic = soft tap; doubled or initial = strong uvular or trilled.', null, [ACT.alphabet]),
  createContentItem('s', 'esse', 'Letter name "esse" /ˈɛsi/. Sound: word-initial or after consonant = /s/; intervocalic = /z/ (casa /ˈka.za/); doubled ss = /s/ always. At syllable end, BP = /s/, EP and carioca BP = /ʃ/.', 'word', 's — sol /s/, casa /z/, isso /s/, mais (BP /s/, EP /ʃ/)', 'Intervocalic-z is the Spanish-learner trap: casa in Spanish = /ˈka.sa/, in Portuguese = /ˈka.za/.', null, [ACT.alphabet]),
  createContentItem('t', 'tê', 'Letter name "tê" /te/. Sound /t/ — BUT in BP, /t/ palatalizes to /tʃ/ before /i/ (tia = "TCHI-a"). EP keeps /t/ unchanged in all contexts.', 'word', 't — tudo /t/, tia (BP /tʃi-/), noite (BP /-tʃi/)', 'Palatalization rule pairs with d. If you say "TI-a" not "TCHI-a", you sound European or Spanish-influenced.', null, [ACT.alphabet]),
  createContentItem('u', 'u', 'Letter name "u" /u/. Sound /u/ in nearly all positions. Silent after q before e/i (que, quero) and after g before e/i (guerra), unless marked.', 'word', 'u — uva, um, mundo, que (silent u)', 'Spanish-style /u/ everywhere except in the qu/gu silent-u contexts.', null, [ACT.alphabet]),
  createContentItem('v', 'vê', 'Letter name "vê" /ve/. Sound /v/ — fully labiodental, NOT bilabial /b/. Unlike Spanish (which neutralizes b and v), Portuguese keeps them distinct: bem ≠ vem.', 'word', 'v — vamos, viver, ver', 'Spanish speakers MUST drill /v/ as a labiodental — touch upper teeth to lower lip.', null, [ACT.alphabet]),
  createContentItem('w', 'dáblio', 'Letter name "dáblio" /ˈdabliu/ — phonetic adaptation of English "double-u". Added in 2009. Used in foreign words (Walter, watt) and abbreviations.', 'word', 'w — Walter, watt, web', 'Native Portuguese never uses w; pronounce loanwords with the closest /v/ or /w/ sound depending on origin.', null, [ACT.alphabet]),
  createContentItem('x', 'xis', 'Letter name "xis" /ʃis/. Sound is UNPREDICTABLE — can be /ʃ/ (xícara, peixe), /ks/ (táxi, fixo), /s/ (próximo), or /z/ (exame). Memorize per word.', 'word', 'x — xícara /ʃ/, táxi /ks/, próximo /s/, exame /z/', 'Portuguese x is famously irregular; native speakers also occasionally misread unfamiliar x-words.', null, [ACT.alphabet]),
  createContentItem('y', 'ípsilon', 'Letter name "ípsilon" /ˈipsilon/. Added in 2009. Used in foreign words (yoga, hobby), proper names (Mary), and abbreviations.', 'word', 'y — yoga, hobby, Mary', 'Native Portuguese uses i where Y would appear in English/Greek-origin words.', null, [ACT.alphabet]),
  createContentItem('z', 'zê', 'Letter name "zê" /ze/. Sound /z/ at word start and intervocalic (zero, dizer). At syllable end, behaves like /s/: BP = /s/, EP = /ʃ/ (feliz, paz).', 'word', 'z — zero /z/, dizer /z/, feliz (BP /-is/, EP /-iʃ/)', 'Final z follows the same BP/EP split as final s.', null, [ACT.alphabet]),

  // ────────────────────────────────────────────────────────────────────
  // Activity 3 — Oral Vowels (open/closed)
  // ────────────────────────────────────────────────────────────────────
  createContentItem(
    'a',
    'a /a/',
    'The Portuguese a is OPEN and CENTRAL — the same /a/ you find in Spanish or Italian. In BP, unstressed a remains clearly /a/; in EP, unstressed a centralizes to /ɐ/ (the schwa-like back-of-mouth vowel).',
    'word',
    'casa /ˈka.za/, falar /faˈlaɾ/, dama /ˈda.ma/',
    'Compare BP "FA-LÁ" (clear a both syllables) with EP "fɐ-LAɾ" (reduced first a). The reduction is one of the clearest BP/EP cues.',
    null,
    [ACT.oralVowels],
  ),
  createContentItem(
    'é (open)',
    'é /ɛ/',
    'Open mid front vowel — like English "bed" or French "père". Written é when stressed. Appears in café (caFÉ), pé (pé), médico (MÉdico).',
    'word',
    'café /kaˈfɛ/, pé /pɛ/, é (verb "is") /ɛ/',
    'CRITICAL pair: é (open, the verb "is") vs ê (closed, used in "três" /tres/ "three"). Mixing them gives wrong words.',
    [
      { target: 'é open /ɛ/', note: 'jaw drops more, tongue lower; the verb "to be" 3rd person singular' },
      { target: 'ê closed /e/', note: 'jaw tighter, tongue higher; appears in "você" /voˈse/' },
    ],
    [ACT.oralVowels],
  ),
  createContentItem(
    'ê (closed)',
    'ê /e/',
    'Closed mid front vowel — like English "hey" without the y-glide, or French "été". Written ê when stressed. Appears in você (voCÊ), três (três), mês (mês).',
    'word',
    'você /voˈse/, três /tres/, mês /mes/',
    'You can hear the difference clearly between "três" (closed ê) and "pé" (open é) — same length, different jaw position.',
    null,
    [ACT.oralVowels],
  ),
  createContentItem(
    'ó (open)',
    'ó /ɔ/',
    'Open mid back vowel — like English "law" (UK) or French "porte". Written ó when stressed. Appears in avó (aVÓ "grandmother"), nós (nós "we"), só (só "only").',
    'word',
    'avó /aˈvɔ/, nós /nɔs/, só /sɔ/',
    'CRITICAL pair: avó (grandmother, open ó) vs avô (grandfather, closed ô). Brazilian dialogues rely on this contrast every day.',
    [
      { target: 'ó open /ɔ/', note: 'avó = grandmother; jaw drops, lips less rounded' },
      { target: 'ô closed /o/', note: 'avô = grandfather; jaw tighter, lips more rounded' },
    ],
    [ACT.oralVowels],
  ),
  createContentItem(
    'ô (closed)',
    'ô /o/',
    'Closed mid back vowel — like English "go" without the w-glide, or French "beau". Written ô when stressed. Appears in avô (aVÔ "grandfather"), pôr (pôr "to put"), vovô (voVÔ "grandpa").',
    'word',
    'avô /aˈvo/, pôr /poɾ/, vovô /voˈvo/',
    'The accent circumflex (ô) marks "high closed" while the acute (ó) marks "low open" — once you internalize the mark = mouth-shape link, reading is easy.',
    null,
    [ACT.oralVowels],
  ),
  createContentItem(
    'i',
    'i /i/',
    'High front vowel — like English "ee" in "see". Letter name and vowel value are the same. In BP, unstressed final e raises to /i/ at word-end (verde → /ˈveɾ.dʒi/).',
    'word',
    'sim /sĩ/, vida /ˈvi.da/, ali /aˈli/',
    'i triggers BP palatalization of preceding t/d (tia, dia) but is otherwise the most stable vowel.',
    null,
    [ACT.oralVowels],
  ),
  createContentItem(
    'u',
    'u /u/',
    'High back vowel — like English "oo" in "boot". Letter name and vowel value are the same. In BP, unstressed final o raises to /u/ at word-end (livro → /ˈli.vɾu/).',
    'word',
    'tudo /ˈtu.du/, mundo /ˈmũ.du/, uva /ˈu.va/',
    'Word-final u may sound clipped to English ears; do not lengthen it into "oo-uh".',
    null,
    [ACT.oralVowels],
  ),
  createContentItem(
    'BP reduction',
    'redução vocálica brasileira',
    'In BP, unstressed final e → /i/ and unstressed final o → /u/ — automatic, no exceptions. EP goes further: unstressed e → /ɨ/ (centralized) or silence; unstressed o → /u/ similar to BP.',
    'word',
    'verde BP /ˈveɾ.dʒi/, EP /ˈvɛɾd/. livro BP /ˈli.vɾu/, EP /ˈli.vɾu/.',
    'BP keeps final-vowel signal strong; EP weakens it almost to vanishing point — a beginning EP learner often cannot hear the word boundaries because vowels disappear.',
    [
      { target: 'BP final -e → /i/', note: 'verde "VER-dji", noite "NOI-tchi"' },
      { target: 'BP final -o → /u/', note: 'livro "LI-vru", carro "KA-hu"' },
      { target: 'EP final -e → /ɨ/ or silent', note: 'verde "VERD", noite "NOIT"' },
    ],
    [ACT.oralVowels],
  ),

  // ────────────────────────────────────────────────────────────────────
  // Activity 4 — Nasal Vowels
  // ────────────────────────────────────────────────────────────────────
  createContentItem(
    'ã',
    'ã /ɐ̃/',
    'Nasal a — central, slightly raised, with airflow routed through the nose. Written with tilde (ã) or as an + consonant (canto). The single most distinctive Portuguese sound.',
    'word',
    'irmã /iʁˈmɐ̃/, lã /lɐ̃/, canto /ˈkɐ̃.tu/',
    'There is NO /m/ or /n/ consonant after — only the vowel is nasalized.',
    [
      { target: 'ã with tilde', note: 'word-final or stressed: irmã, lã, manhã' },
      { target: 'an + consonant', note: 'within a word: canto, manso, ambos (b counts as consonant)' },
    ],
    [ACT.nasalVowels],
  ),
  createContentItem(
    'ẽ',
    'ẽ /ẽ/ (written em/en)',
    'Nasal e — written as em or en + consonant (or word-final em). Same closed mid front position as oral e, plus nasalization. Final -em is also often diphthongized to /ẽj̃/ in BP.',
    'word',
    'bem /bẽj̃/, sempre /ˈsẽ.pɾi/, vento /ˈvẽ.tu/',
    'Final -em often sounds like "bayng" with a final nasal glide — a BP feature.',
    null,
    [ACT.nasalVowels],
  ),
  createContentItem(
    'ĩ',
    'ĩ /ĩ/ (written im/in)',
    'Nasal i — written as im or in + consonant (or word-final im). Same high front position as oral i, plus nasalization. Common in word-final -im (sim, fim, mim).',
    'word',
    'sim /sĩ/, fim /fĩ/, lindo /ˈlĩ.du/',
    'NO /m/ consonant; the m is purely orthographic, signaling nasalization.',
    null,
    [ACT.nasalVowels],
  ),
  createContentItem(
    'õ',
    'õ /õ/',
    'Nasal o — closed mid back position with nasalization. Written with tilde (õ) typically only in plural diphthongs (lições). Single õ also appears as on + consonant (bom, com, conto).',
    'word',
    'bom /bõ/, com /kõ/, conta /ˈkõ.ta/',
    'Final -om is the standard nasalization, equivalent to written ã in a/e/i pattern.',
    null,
    [ACT.nasalVowels],
  ),
  createContentItem(
    'ũ',
    'ũ /ũ/ (written um/un)',
    'Nasal u — high back position with nasalization. Written as um or un + consonant (or word-final um). One of the more rare nasal vowels but appears in extremely common words.',
    'word',
    'um /ũ/, tudo not nasal, mundo /ˈmũ.du/, juntos /ˈʒũ.tus/',
    'Watch out: "uma" has a CONSONANTAL /m/ before the a — not nasal. Only word-final or pre-consonant um is the nasal vowel.',
    null,
    [ACT.nasalVowels],
  ),
  createContentItem(
    'ão',
    'ão /ɐ̃w̃/',
    'The most common Portuguese nasal diphthong — nasal a + nasal u glide. Appears in extremely frequent words: pão, mão, não, são. Also marks plural of words ending in -ão and 3rd-person plural future of -ar verbs.',
    'word',
    'pão /pɐ̃w̃/, mão /mɐ̃w̃/, não /nɐ̃w̃/, são /sɐ̃w̃/',
    'If you skip the final w-glide and just say "pã", you sound foreign; if you nasalize neither vowel, "pão" becomes "pau" (stick).',
    [
      { target: 'pão (bread)', note: 'singular noun; one of the first words every Portuguese learner says' },
      { target: 'pães (breads)', note: 'plural — note ãe diphthong replaces ão for many such nouns' },
      { target: 'falarão (they will speak)', note: '3rd person plural future of falar; same ão ending' },
    ],
    [ACT.nasalVowels],
  ),
  createContentItem(
    'ãe',
    'ãe /ɐ̃j̃/',
    'Nasal a + nasal i glide. Less frequent than ão but appears in critical words: mãe, pães, alemães. Often the plural form of singular -ão nouns (cão → cães).',
    'word',
    'mãe /mɐ̃j̃/, pães /pɐ̃j̃s/, cães /kɐ̃j̃s/',
    'The /j̃/ off-glide is what distinguishes ãe from plain ã — keep nasalizing through both vowels.',
    null,
    [ACT.nasalVowels],
  ),
  createContentItem(
    'õe',
    'õe /õj̃/',
    'Nasal o + nasal i glide. Most common as the plural ending for nouns ending in -ão (lição → lições, ação → ações). Also appears in the verb põe ("puts").',
    'word',
    'lições /liˈsõj̃s/, ações /aˈsõj̃s/, põe /põj̃/',
    'The three -ão plural patterns are pão→pães, lição→lições, mão→mãos. Memorize per word.',
    null,
    [ACT.nasalVowels],
  ),
  createContentItem(
    'ui',
    'ui /ũj/',
    'Nasal diphthong appearing in just one common word: "muito" /ˈmũj.tu/. Despite no diacritic, the vowel is nasalized — an exceptional spelling.',
    'word',
    'muito /ˈmũj.tu/',
    'Beginners often miss the nasalization because the spelling looks oral. Listen for a slight nasal coloring on the u.',
    null,
    [ACT.nasalVowels],
  ),

  // ────────────────────────────────────────────────────────────────────
  // Activity 5 — Oral Diphthongs
  // ────────────────────────────────────────────────────────────────────
  createContentItem('ai', 'ai /aj/', 'Open a + i off-glide. Like English "eye" or Spanish "hay". Word-final and word-internal both common.', 'word', 'pai /paj/, mais /majs/, vai /vaj/', 'One of the cleanest English-to-Portuguese sound mappings.', null, [ACT.diphthongs]),
  createContentItem('ei', 'ei /ej/', 'Closed e + i off-glide. Like English "hey" but cleaner — no extra y-drag. In BP, often reduced to plain /e/ in fast speech (sei → /se/).', 'word', 'lei /lej/, sei /sej/, primeiro /pɾiˈmej.ɾu/', 'The reduction sei → /se/ is informal BP; in careful speech, keep the diphthong.', null, [ACT.diphthongs]),
  createContentItem('oi', 'oi /oj/', 'Closed o + i off-glide. Like English "boy". Word "oi" by itself is the most common informal Brazilian greeting.', 'word', 'oi /oj/ (hi), dois /dojs/, foi /foj/', '"Oi!" is the all-purpose BP hello — like English "hi".', null, [ACT.diphthongs]),
  createContentItem('ui', 'ui /uj/', 'High u + i off-glide. Appears in just a few words; the most common is "fui" (I went/was).', 'word', 'fui /fuj/, cuidado /kujˈda.du/', 'Compare oral "fui" (I went) with nasal "muito" — same vowel cluster, different nasalization.', null, [ACT.diphthongs]),
  createContentItem('au', 'au /aw/', 'Open a + u off-glide. Like English "ow" in "cow". Common in adjectives and verb forms.', 'word', 'mau /maw/, pau /paw/, causa /ˈkaw.za/', 'Compare mau (bad) — oral — with mão (hand) — nasal. Skipping nasalization changes the meaning.', null, [ACT.diphthongs]),
  createContentItem('eu', 'eu /ew/', 'Closed e + u off-glide. The word "eu" (I) is the most frequent example — every BP sentence with first person uses it.', 'word', 'eu /ew/ (I), meu /mew/, seu /sew/', '"Eu" is the BP first-person subject pronoun — required in many sentences unlike Spanish or Italian.', null, [ACT.diphthongs]),
  createContentItem('iu', 'iu /iw/', 'High i + u off-glide. Less common; appears in past tense forms of -ir verbs (partiu, viu, ouviu).', 'word', 'viu /viw/, partiu /paʁˈtʃiw/, abriu /aˈbɾiw/', 'The 3rd-person preterite ending -iu is one of the few cases this diphthong appears.', null, [ACT.diphthongs]),
  createContentItem('ou', 'ou /ow/ or /o/', 'Closed o + u off-glide. In CAREFUL BP and EP, pronounced /ow/. In EVERYDAY BP, very often simplified to /o/ — sou /so/, falou /faˈlo/. Both are fully native.', 'word', 'sou /so/ (BP) or /sow/ (EP), falou /faˈlo/ (BP)', 'The BP /o/ pronunciation of ou is so common that learners often question whether the u is even there in writing.', null, [ACT.diphthongs]),

  // ────────────────────────────────────────────────────────────────────
  // Activity 6 — Consonants (groups)
  // ────────────────────────────────────────────────────────────────────
  createContentItem(
    'soft c / hard c',
    'c+e/i = /s/; c+a/o/u = /k/',
    'C follows the Romance soft/hard rule: before front vowels e/i, c is /s/ (cidade /si-/, cebola /se-/); before back vowels a/o/u or consonants, c is /k/ (casa, copa, cravo).',
    'word',
    'cidade /siˈda.dʒi/, casa /ˈka.za/, cravo /ˈkɾa.vu/',
    'To get /s/ before back vowels, write ç (cedilha): açúcar, coração.',
    null,
    [ACT.consonants],
  ),
  createContentItem(
    'soft g / hard g',
    'g+e/i = /ʒ/; g+a/o/u = /g/',
    'G follows the same soft/hard pattern: before e/i, g is /ʒ/ (gente, girassol); before a/o/u, g is /g/ (gato, gola, guru). For /g/ before e/i, write gu (silent u): guerra /ˈge.ʁa/.',
    'word',
    'gente /ˈʒẽ.tʃi/, gato /ˈga.tu/, guerra /ˈge.ʁa/',
    'Unlike Spanish, Portuguese soft g is /ʒ/ (like English "measure"), NOT /x/.',
    null,
    [ACT.consonants],
  ),
  createContentItem(
    'lh',
    'lh /ʎ/',
    'Palatal lateral — a single sound, not L+H. Tongue body raised against hard palate, lateral airflow. Similar to Italian gl in "figlio" or Spanish ll in conservative dialects.',
    'word',
    'filho /ˈfi.ʎu/, milho /ˈmi.ʎu/, trabalho /tɾaˈba.ʎu/',
    'Easy English-speaker error: pronouncing "lh" as two sounds (l-h) or as Spanish /j/ (ll = yeísmo). Drill the palatal /ʎ/.',
    null,
    [ACT.consonants],
  ),
  createContentItem(
    'nh',
    'nh /ɲ/',
    'Palatal nasal — a single sound, not N+H. Like Spanish ñ in "año" or French gn in "agneau". Tongue body raised against hard palate, airflow through the nose.',
    'word',
    'banho /ˈbɐ̃.ɲu/, manhã /mɐˈɲɐ̃/, sonho /ˈso.ɲu/',
    'Spanish ñ ≈ Portuguese nh — same sound, different spelling.',
    null,
    [ACT.consonants],
  ),
  createContentItem(
    'r vs rr',
    'r tap /ɾ/, rr or initial r /ʁ/',
    'Portuguese has TWO r sounds: a soft TAP /ɾ/ for intervocalic single r (caro, marido) and a STRONG sound (BP /ʁ/ uvular, EP /r/ trill) for initial r (rato), rr (carro), and r after n/s.',
    'word',
    'caro /ˈka.ɾu/ (tap), carro /ˈka.ʁu/ (strong), rato /ˈʁa.tu/ (strong)',
    'Beginning learners struggle most with carro vs caro — same spelling minus one r, opposite sounds, different meanings (expensive vs car).',
    [
      { target: 'r tap /ɾ/', note: 'between vowels, single r: caro, marido, claro' },
      { target: 'r strong /ʁ/ (BP) or /r/ (EP)', note: 'word-initial r, double rr, or r after n/s/l: rato, carro, honra' },
      { target: 'final r in BP', note: 'often DROPPED entirely: falar → "fa-LÁ", comer → "co-MÊ"' },
    ],
    [ACT.consonants],
  ),
  createContentItem(
    's between vowels',
    's intervocalic /z/',
    'Single s BETWEEN two vowels = /z/, not /s/. casa /ˈka.za/, mesa /ˈme.za/, asa /ˈa.za/. To force /s/ between vowels, write ss: nosso /ˈnɔ.su/, passar.',
    'word',
    'casa /z/, mesa /z/, nosso /s/, passar /s/',
    'Spanish speakers especially must drill this — casa in Spanish is /s/, in Portuguese is /z/.',
    null,
    [ACT.consonants],
  ),
  createContentItem(
    'x — unpredictable',
    'x /ʃ/ /ks/ /s/ /z/',
    'Portuguese x has FOUR possible sounds and no reliable rule: /ʃ/ (xícara, peixe — most common), /ks/ (táxi, fixo), /s/ (próximo, máximo), /z/ (exame, exercício). Memorize per word.',
    'word',
    'xícara /ʃ/, táxi /ks/, próximo /s/, exame /z/',
    'Even native speakers occasionally hesitate on unfamiliar x-words — this letter is famously irregular.',
    null,
    [ACT.consonants],
  ),

  // ────────────────────────────────────────────────────────────────────
  // Activity 7 — BP Palatalization
  // ────────────────────────────────────────────────────────────────────
  createContentItem(
    't + i = /tʃi/',
    'BP palatalization rule (t)',
    'In Brazilian Portuguese, every /t/ followed by /i/ becomes /tʃ/ — the "ch" sound. tia → "TCHI-a", time → "TCHI-mi", tive → "TCHI-vi". The rule applies whether the i is written or just a reduced final -e (noite → "NOI-tchi").',
    'word',
    'tia /ˈtʃi.a/, tive /ˈtʃi.vi/, noite /ˈnoj.tʃi/, gente /ˈʒẽ.tʃi/',
    'Saying "TI-a" not "TCHI-a" marks you as European or as a Spanish-influenced learner — the palatalization is the single clearest BP accent marker.',
    [
      { target: 't + stressed i', note: 'tia, time, tio — clear palatalization' },
      { target: 't + reduced final -e (= /i/)', note: 'noite, gente, sete — palatalization applies because reduced e raises to /i/' },
      { target: 'EP does NOT palatalize', note: 'in Lisbon, tia stays /ˈti.a/, noite stays /ˈnoj.tɨ/' },
    ],
    [ACT.palatalization],
  ),
  createContentItem(
    'd + i = /dʒi/',
    'BP palatalization rule (d)',
    'Mirror rule for d: every /d/ followed by /i/ becomes /dʒ/ — the "j" sound in English "jam". dia → "DJI-a", verdade → "ver-DA-dji", dizer → "DJI-ZÊ".',
    'word',
    'dia /ˈdʒi.a/, dizer /dʒiˈze/, verdade /veʁˈda.dʒi/, cidade /siˈda.dʒi/',
    'The rule pairs with t/+/i/. Both rules apply together and identify the BP accent instantly.',
    null,
    [ACT.palatalization],
  ),
  createContentItem(
    'No palatalization',
    't, d + other vowels',
    'Critical: the rule applies ONLY before /i/. With /a/, /e/-stressed, /o/, /u/, the /t/ and /d/ stay clean. tudo /ˈtu.du/ (NOT "TCHU-du"), data /ˈda.ta/ (NOT "DA-cha").',
    'word',
    'tudo /ˈtu.du/, data /ˈda.ta/, todo /ˈto.du/, dama /ˈda.ma/',
    'Beginners over-apply the rule and palatalize tudo into "tchu-du" — drill the contrast tia (palatalized) vs tudo (clean).',
    null,
    [ACT.palatalization],
  ),

  // ────────────────────────────────────────────────────────────────────
  // Activity 8 — Final /s/ split
  // ────────────────────────────────────────────────────────────────────
  createContentItem(
    'BP final /s/',
    'final s = /s/ in São Paulo',
    'In standard BP (São Paulo, Minas Gerais, the South, Bahia), word-final s and syllable-final s = /s/. mais /majs/, dois /dojs/, os meninos /us meˈni.nus/.',
    'word',
    'mais /majs/, os /us/, meninos /meˈni.nus/, três /tɾes/',
    'This is the "default" BP pronunciation; if you are unsure which accent to imitate, use /s/ for final s.',
    null,
    [ACT.finalS],
  ),
  createContentItem(
    'Carioca + EP /ʃ/',
    'final s = /ʃ/ in Rio and Lisbon',
    'In carioca BP (Rio de Janeiro) AND in EP (all of Portugal), word-final s and syllable-final s = /ʃ/ — the "sh" sound. mais → "maish", dois → "doish", os meninos → "ush meninush".',
    'word',
    'mais /majʃ/, os /uʃ/, meninos /meˈni.nuʃ/, três /tɾeʃ/',
    'Once you hear it, the carioca/EP /ʃ/ is unmistakable. Many Portuguese learners pick the variant that matches their cultural target.',
    [
      { target: 'BP standard (paulista)', note: 'final /s/; clear and crisp' },
      { target: 'BP carioca (Rio)', note: 'final /ʃ/; gives the famous Rio accent its sound' },
      { target: 'EP (Portugal)', note: 'final /ʃ/ + heavy vowel reduction; can sound mysterious to untrained ears' },
    ],
    [ACT.finalS],
  ),
  createContentItem(
    'liaison',
    's links into next vowel',
    'Final /s/ that meets a following vowel undergoes LIAISON: the s becomes /z/ and links into the next word. os amigos → "u-za-MI-gus" (NOT "us a-MI-gus"); as outras → "a-ZÔ-trus".',
    'word',
    'os amigos /u.zaˈmi.gus/, as outras /a.ˈzo.tɾas/',
    'Critical for natural flow; without liaison, BP sounds choppy and foreign.',
    null,
    [ACT.finalS],
  ),

  // ────────────────────────────────────────────────────────────────────
  // Activity 9 — Stress
  // ────────────────────────────────────────────────────────────────────
  createContentItem(
    'Default penultimate',
    'paroxítona — default stress',
    'The default Portuguese stress is on the SECOND-to-last (penultimate) syllable. casa = CA-sa, falamos = fa-LA-mos, livro = LI-vro. Words following this default carry NO accent mark.',
    'word',
    'casa /ˈka.za/, falamos /faˈla.mus/, livro /ˈli.vɾu/',
    'About 70 percent of Portuguese words follow this default — read penultimate stress as the safe guess.',
    null,
    [ACT.stress],
  ),
  createContentItem(
    'Final-syllable stress',
    'oxítona — stress on last',
    'When the word ends in r, l, z, im, um, om, us (plus a few other patterns), stress falls on the LAST syllable. falar = fa-LAR, anel = a-NEL, feliz = fe-LIZ. No accent mark needed — the ending signals stress.',
    'word',
    'falar /faˈlaɾ/, anel /aˈnɛɫ/, feliz /feˈlis/, jardim /ʒaʁˈdʒĩ/',
    'This rule covers all infinitives (every -ar/-er/-ir verb), so it appears constantly.',
    [
      { target: 'ends in -r', note: 'all infinitives: falar, comer, partir; stress on final syllable' },
      { target: 'ends in -l', note: 'jornal, anel, papel' },
      { target: 'ends in -z', note: 'feliz, paz, voz' },
      { target: 'ends in -im, -um, -om', note: 'jardim, atum, marrom' },
    ],
    [ACT.stress],
  ),
  createContentItem(
    'Accent overrides',
    'agudo/circunflexo overrides default',
    'Any word with an acute (á, é, í, ó, ú) or circumflex (â, ê, ô) accent takes stress on the MARKED vowel — overriding both default rules. café = ca-FÉ, médico = MÉ-di-co, sábado = SÁ-ba-do.',
    'word',
    'café /kaˈfɛ/, médico /ˈmɛ.dʒi.ku/, sábado /ˈsa.ba.du/',
    'Accent marks have a SECOND function (signaling open vs closed vowel for é/ê/ó/ô) but the primary one is always stress.',
    null,
    [ACT.stress],
  ),
  createContentItem(
    'Antepenultimate stress',
    'proparoxítona — three back',
    'Words with stress THREE syllables from the end (antepenultimate) are always marked with an accent. médico = MÉ-di-co, sábado = SÁ-ba-do, lâmpada = LÂM-pa-da. No exceptions — if you see an accent on the third-from-last syllable, it stresses that vowel.',
    'word',
    'médico /ˈmɛ.dʒi.ku/, sábado /ˈsa.ba.du/, lâmpada /ˈlɐ̃.pa.da/',
    'A nice diagnostic: if the accent appears far from the end, the word is proparoxítona — always written with accent.',
    null,
    [ACT.stress],
  ),

  // ────────────────────────────────────────────────────────────────────
  // Activity 10 — Diacritics
  // ────────────────────────────────────────────────────────────────────
  createContentItem('´ (acute)', 'acento agudo — open + stress', 'Acute accent: marks stress AND open vowel quality for é (open /ɛ/) and ó (open /ɔ/). For á, í, ú, only marks stress (no quality contrast).', 'word', 'café (open é), avó (open ó), médico (open ó in /mɛ/)', 'The agudo is the most common Portuguese accent.', null, [ACT.diacritics]),
  createContentItem('^ (circumflex)', 'acento circunflexo — closed + stress', 'Circumflex: marks stress AND closed vowel quality for ê (closed /e/), ô (closed /o/), â (closed /ɐ/). Used on words where the vowel is closed but stress falls in an unexpected place.', 'word', 'você (closed ê), avô (closed ô), câmera (closed â)', 'Mnemonic: ^ looks like a "lid" closing the vowel — closed quality.', null, [ACT.diacritics]),
  createContentItem('~ (tilde)', 'til — nasalization', 'Tilde marks nasalization on ã and õ. Often paired with vowels in diphthongs: ão (pão), ãe (mãe), õe (lições). No accent-mark stress function — stress is determined by other rules.', 'word', 'pão, mãe, lições, irmã', 'The tilde always means "route this through the nose".', null, [ACT.diacritics]),
  createContentItem('` (grave)', 'acento grave — crase', 'Grave accent appears ONLY on à — it marks "crase", the contraction of preposition a + feminine article a. Vou à praia = "I am going to the beach". Does NOT change pronunciation; it is a grammatical marker.', 'word', 'à (a + a) — vou à praia /vow a ˈpɾa.ja/', 'Crase is one of the trickiest grammar topics in Portuguese; you will revisit it in Level 2.', null, [ACT.diacritics]),
  createContentItem('ç (cedilha)', 'cê-cedilha /s/', 'Cedilla turns c into /s/ before a, o, u. açúcar /aˈsu.kaɾ/, coração /ko.ɾaˈsɐ̃w̃/, almoço /awˈmo.su/. Never appears before e or i (no need — c is already /s/ there).', 'word', 'açúcar /s/, coração /s/, almoço /s/', 'The little squiggle under c is the only diacritic on a consonant in Portuguese.', null, [ACT.diacritics]),

  // ────────────────────────────────────────────────────────────────────
  // Activity 11 — BP vs EP
  // ────────────────────────────────────────────────────────────────────
  createContentItem(
    'Rhythm split',
    'syllable-timed BP vs stress-timed EP',
    'BP is SYLLABLE-TIMED: every syllable gets roughly equal duration, like Spanish or Italian. EP is STRESS-TIMED: stressed syllables long, unstressed syllables compressed, like English or German. This rhythm difference is the single biggest "feel" gap between the two varieties.',
    'word',
    'BP: "Es-tou-fa-LAN-do-com-vo-CÊ" (8 even syllables)\nEP: "Stó-flar-c\'sí-gu" (4 perceptual chunks, vowels swallowed)',
    'If you can master only ONE BP feature, master syllable-timing — it instantly distinguishes BP from EP.',
    null,
    [ACT.bpEp],
  ),
  createContentItem(
    'Gerund vs infinitive',
    'estou falando (BP) vs estou a falar (EP)',
    'Progressive aspect is constructed differently: BP uses estar + GERUND (estou falando = "I am speaking"); EP uses estar a + INFINITIVE (estou a falar = same meaning). Both are grammatically correct in their own region but sound wrong if swapped.',
    'word',
    'BP: Estou falando com você. EP: Estou a falar consigo.',
    'You will hear BP speakers occasionally use a+infinitive in formal writing, and EP speakers occasionally use gerund in song lyrics, but the default split is firm.',
    null,
    [ACT.bpEp],
  ),
  createContentItem(
    'você vs tu',
    'BP você (you) vs EP tu (you-informal) / você (you-formal/condescending)',
    'BP default singular "you" is "você" (with 3rd-person verbs: você fala "you speak"). EP default singular "you" is "tu" (with 2nd-person verbs: tu falas "you speak"). EP also has "você" but it can sound CONDESCENDING — use "tu" with friends, "você" rarely with adults, or the full name + 3rd-person ("Como está, Maria?").',
    'word',
    'BP: Você fala português? EP: Tu falas português?',
    'EP-você is a register landmine; never use it to address someone you would call "you" in English casually — it sounds like talking down.',
    [
      { target: 'BP você (default)', note: 'singular informal AND polite; takes 3rd person verb' },
      { target: 'EP tu (default)', note: 'singular informal; takes 2nd person verb (tu falas, tu comes)' },
      { target: 'EP você (condescending)', note: 'avoid except in very specific contexts; use full name or o senhor/a senhora for politeness' },
    ],
    [ACT.bpEp],
  ),
  createContentItem(
    'Lexical splits',
    'trem vs comboio, ônibus vs autocarro',
    'Many everyday nouns differ between BP and EP. trem (BP) = comboio (EP) "train". ônibus (BP) = autocarro (EP) "bus". celular (BP) = telemóvel (EP) "cell phone". geladeira (BP) = frigorífico (EP) "refrigerator". cafézinho (BP) = bica (EP-Lisbon) "espresso".',
    'word',
    'BP: o trem, o ônibus, o celular, a geladeira, um cafézinho.\nEP: o comboio, o autocarro, o telemóvel, o frigorífico, uma bica.',
    'Speakers understand each other across the divide, but using a BP word in EP marks you as Brazilian and vice versa — pick your target and stick with it.',
    null,
    [ACT.bpEp],
  ),

  // ────────────────────────────────────────────────────────────────────
  // Activity 12 — Reading Practice
  // ────────────────────────────────────────────────────────────────────
  createContentItem(
    'Texto de prática (BP)',
    'práctice paragraph — Brazilian',
    'A four-sentence Brazilian Portuguese paragraph that uses every Foundation rule: nasal vowels, palatalization, default and override stress, BP final /s/, and final-r dropping. Read aloud TWICE.',
    'paragraph',
    'Oi! Meu nome é Sofia e eu sou estudante na USP. Eu moro em São Paulo, perto da Avenida Paulista. Todo dia eu acordo cedo, tomo café da manhã, e vou de ônibus para a universidade. Gosto muito de estudar engenharia!',
    'Translation: "Hi! My name is Sofia and I am a student at USP. I live in São Paulo, near Avenida Paulista. Every day I wake up early, eat breakfast, and take the bus to the university. I really enjoy studying engineering!"',
    [
      { target: 'Oi!', note: 'oral diphthong oi /oj/; the universal BP informal greeting' },
      { target: 'estudante', note: 'palatalization: -te becomes /tʃi/ → "es-tu-DAN-tchi"' },
      { target: 'USP', note: 'spelled out: U-S-P "u-ESS-pê"; the São Paulo flagship university' },
      { target: 'São Paulo', note: 'nasal diphthong ão; the largest city in Brazil and the BP cultural anchor' },
      { target: 'todo dia', note: 'palatalization: di- becomes /dʒi/ → "TÔ-du DJI-a"' },
      { target: 'café da manhã', note: 'café open é; manhã nasal ã + palatal nh; literal "morning coffee" = "breakfast"' },
      { target: 'ônibus', note: 'BP word for "bus" (EP = autocarro); proparoxítona stress on Ô' },
      { target: 'engenharia', note: 'two palatalizations stack: gen- /ʒẽ/, -ria normal; major name "engineering"' },
    ],
    [ACT.reading],
  ),
  createContentItem(
    'Texto de prática (EP contrast)',
    'practice paragraph — European contrast',
    'The SAME four-sentence content rewritten in EP register: tu-verbs, gerund→infinitive shift, BP-vs-EP lexical swaps. Read aloud and notice how rhythm and word choice differ.',
    'paragraph',
    'Olá! Chamo-me Sofia e sou estudante na Universidade de Lisboa. Moro em Lisboa, perto do Marquês de Pombal. Todos os dias acordo cedo, tomo o pequeno-almoço, e vou de autocarro para a universidade. Gosto muito de estudar engenharia!',
    'Translation: same meaning, EP wording. "Chamo-me" uses clitic ênclise; "pequeno-almoço" replaces BP "café da manhã"; "autocarro" replaces "ônibus".',
    [
      { target: 'Olá vs Oi', note: 'EP greeting default is "Olá" (more formal); "Oi" is BP and sounds Brazilian in Portugal' },
      { target: 'Chamo-me', note: 'ênclise — clitic AFTER the verb (typical EP); BP would say "Me chamo Sofia" with próclise' },
      { target: 'pequeno-almoço', note: 'EP "small lunch" = breakfast; BP equivalent "café da manhã" sounds Brazilian in Lisbon' },
      { target: 'autocarro', note: 'EP "bus"; BP equivalent "ônibus"' },
    ],
    [ACT.reading],
  ),
  createContentItem(
    'Auto-checagem',
    'self-check rubric',
    'Three checkpoints to confirm your reading: (1) did you nasalize "São" and "engenharia"? (2) did you palatalize "estudante", "dia", "todo dia"? (3) did you drop the final -r in "estudar" (BP only)? Read once more applying any rule you missed.',
    'word',
    'Checklist: nasalização ✓ / palatalização ✓ / -r final em BP ✓',
    'Most learners on first reading skip nasalization on one of São or manhã; come back to those if you scored ≤ 2/3.',
    null,
    [ACT.reading],
  ),
];

module.exports = {
  title: 'Level 1 · Foundation: Portuguese Phonology & Orthography',
  category: 'foundation',
  difficulty: 'beginner',
  targetLang: 'pt',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'foundation',
  activities,
  expressionPractice: [
    { id: 'read-aloud-bp', label: 'Reading aloud (BP)', goal: 'Apply default penultimate stress, BP palatalization, and final /s/ correctly when reading any new Portuguese word.' },
    { id: 'distinguish-bp-ep', label: 'BP vs EP cue', goal: 'Identify whether a sample is Brazilian or European by listening for palatalization, rhythm, and final /s/.' },
    { id: 'nasal-vowels', label: 'Nasal vowels', goal: 'Pronounce ã, õ, ãe, õe, ão with full nasalization, distinguishing oral pau/mau from nasal pão/mão.' },
    { id: 'stress-marks', label: 'Stress and diacritics', goal: 'Read a word with no accent using the default rule, and override the default correctly when an acute or circumflex appears.' },
  ],
  relatedPools: ['topic-language', 'topic-pronunciation'],
  content,
};
