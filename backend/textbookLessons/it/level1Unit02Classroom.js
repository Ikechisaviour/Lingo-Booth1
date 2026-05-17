// Level 1 Unit 2 — Classroom & Numbers 1-100 (Italian)
// Functions: classroom objects and instructions, basic numbers, time of day,
// asking for/about classroom items, polite please/thank you, classroom verbs.

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
  korean: target,
  english: note,
  example: example || target,
  exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  orientation: 'it-l1u2-orientation',
  pronunciation: 'it-l1u2-pronunciation',
  vocabularyObjects: 'it-l1u2-vocab-objects',
  vocabularyNumbers: 'it-l1u2-vocab-numbers',
  grammarHaveAvere: 'it-l1u2-grammar-avere',
  grammarThereIs: 'it-l1u2-grammar-there-is',
  grammarQuanto: 'it-l1u2-grammar-quanto',
  reading: 'it-l1u2-reading',
  listening: 'it-l1u2-listening',
  writing: 'it-l1u2-writing',
  culture: 'it-l1u2-culture',
  task: 'it-l1u2-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Name the 12 most common classroom objects in Italian (libro, quaderno, penna, matita, zaino, lavagna, sedia, banco, finestra, porta, computer, orologio) with the correct gender and article.',
      'Count from 1 to 100 in Italian, including the tricky decade names (venti, trenta, quaranta…) and the special forms 11–16 (undici, dodici, …, sedici).',
      'Ask "how many?" with quanti/quante (agreeing with the noun) and answer with a number + noun (tre libri, due penne).',
    ],
    task: 'Picture your first Italian-language class at Università di Bologna. By the end of this lesson you can name everything on your desk, count classmates, and ask the teacher about quantities — entirely in Italian.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: 'Sound traps in classroom vocabulary',
    goals: [
      'Pronounce the geminated tt in quattro /ˈkwat.tro/ "four" and otto /ˈɔt.to/ "eight" — single t would change the meaning of bottè/botte for example.',
      'Distinguish the open and closed e in numbers: tre /tre/ closed vs sette /ˈsɛt.te/ open vs venti /ˈven.ti/ closed vs cinque /ˈtʃiŋ.kwe/.',
      'Apply final-stress rule on città, perché, ventitré — written grave/acute mandatory.',
    ],
    task: 'Read each number 1-20 aloud and produce the geminates and stress correctly.',
  },
  {
    id: ACT.vocabularyObjects,
    section: 'Vocabulary I',
    title: 'Classroom objects with gender and article',
    goals: [
      'Memorize 14 classroom items with their definite article: il libro, il quaderno, la penna, la matita, lo zaino, la lavagna, la sedia, il banco, la finestra, la porta, il computer, l\'orologio, la gomma, il cellulare.',
      'Pluralize each one: libro → libri (m.pl.), penna → penne (f.pl.), lavagna → lavagne, zaino → zaini.',
    ],
    task: 'Look around the room (or imagine it) and name five objects with the correct article and a number: "due penne, tre libri…"',
  },
  {
    id: ACT.vocabularyNumbers,
    section: 'Vocabulary II',
    title: 'Numbers 1-100 — patterns and exceptions',
    goals: [
      'Memorize 1-10: uno, due, tre, quattro, cinque, sei, sette, otto, nove, dieci.',
      'Recognize the special teens 11-16 (undici, dodici, tredici, quattordici, quindici, sedici) and the inverted forms 17-19 (diciassette, diciotto, diciannove).',
      'Build numbers 21-99 by combining decade + unit: ventuno (with apocope on -i), ventidue, ventitré (with grave on é).',
    ],
    task: 'Count aloud from 1 to 30, then say five random numbers between 30 and 100 (forty-two, sixty-five, etc.).',
  },
  {
    id: ACT.grammarHaveAvere,
    section: 'Grammar I',
    title: 'avere (to have) — the second essential verb',
    goals: [
      'Conjugate avere in the present: io ho, tu hai, lui/lei ha, noi abbiamo, voi avete, loro hanno. Note the SILENT h in ho, hai, ha, hanno — purely orthographic.',
      'Use avere to say what you have: ho un libro, hai una penna? — for possession of objects, ages (ho 25 anni), and idiomatic states (ho fame "I\'m hungry", ho freddo "I\'m cold").',
      'Recognize that English "be" maps to Italian avere in many idioms: ho fame (not sono affamato), ho 25 anni (not sono 25), ho ragione "I\'m right" (not sono giusto).',
    ],
    task: 'Conjugate avere with each personal pronoun, then write three sentences using it for possession, age, and a state.',
  },
  {
    id: ACT.grammarThereIs,
    section: 'Grammar II',
    title: 'c\'è / ci sono — there is / there are',
    goals: [
      'Use c\'è ("there is") for singular: c\'è un libro sulla scrivania, c\'è una finestra in classe.',
      'Use ci sono ("there are") for plural: ci sono tre libri, ci sono molti studenti.',
      'Negate with non: non c\'è ("there isn\'t"), non ci sono ("there aren\'t"). Form question by intonation alone: c\'è un computer?',
    ],
    task: 'Describe the contents of your classroom with five c\'è / ci sono sentences using different numbers and objects.',
  },
  {
    id: ACT.grammarQuanto,
    section: 'Grammar III',
    title: 'quanto/quanta/quanti/quante — how much / how many',
    goals: [
      'Use quanto (m.s.), quanta (f.s.), quanti (m.pl.), quante (f.pl.) to ask "how much / how many" — agreeing with the noun: quanti libri? (m.pl.), quante penne? (f.pl.).',
      'Use quanto as an adverb (uninflected) to ask "how much" with abstract quantities: quanto costa? "how much does it cost?".',
      'Answer with a number + noun: tre libri, due penne, molte sedie.',
    ],
    task: 'Ask three quanti/quante questions about classroom objects and answer each with a specific number.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: 'Read a classroom description',
    goals: [
      'Read a short paragraph describing an Italian classroom at Università di Bologna with correct stress and gender agreement.',
      'Answer five comprehension questions about quantities and items using c\'è / ci sono / ho / non c\'è.',
    ],
    task: 'Read the paragraph aloud, then answer the comprehension questions in short Italian sentences.',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: 'A student asks the teacher for supplies',
    goals: [
      'Follow a 6-turn dialogue between a student and a teacher about borrowing classroom items.',
      'Reproduce the dialogue using your own needs (one more pen, two more pieces of paper).',
    ],
    task: 'Perform the dialogue with the AI tutor twice — once reading, once swapping in your own quantities.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: 'Write a classroom inventory',
    goals: [
      'Write 5 sentences listing what is in your classroom (real or imagined) using c\'è/ci sono and numbers.',
      'Include at least 3 different genders/numbers to show agreement mastery.',
    ],
    task: 'Write the inventory and read it aloud.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: 'Italian classroom culture',
    goals: [
      'Know that Italian university students often use Lei with professors even after years; the switch to tu must be explicitly invited.',
      'Recognize the centrality of esami orali (oral exams) in Italian universities — most exams are oral, in front of the professor, with grades on a 30-point scale (30 e lode is "honors").',
      'Understand that the Italian academic year runs October to mid-July with major exam sessions in January, June, and September.',
    ],
    task: 'Describe in three sentences how your home academic system differs from the Italian one.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: 'First day in an Italian-language class',
    goals: [
      'Combine numbers, classroom objects, c\'è/ci sono, and avere into one continuous scene.',
      'Politely ask the teacher for an extra item using "scusi" and "per favore".',
    ],
    task: 'Roleplay your first Italian-language class at UniBo with the AI tutor as the teacher.',
  },
];

const lesson = {
  title: 'Level 1 · Unit 2: In aula — Classroom and Numbers',
  category: 'classroom',
  difficulty: 'beginner',
  targetLang: 'it',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'asking-for-item', label: 'Asking for a classroom item', goal: 'Politely request an item with "Mi scusi, posso avere una penna?" and "per favore".' },
    { id: 'counting-aloud', label: 'Counting aloud', goal: 'Count from 1 to 20 fluently and produce decade names through 100.' },
    { id: 'describing-room', label: 'Describing the room', goal: 'Use c\'è / ci sono with appropriate articles to describe what is in the classroom.' },
    { id: 'expressing-states', label: 'Expressing states with avere', goal: 'Use avere idioms (ho fame, ho freddo, ho sonno, ho sete) to describe how you feel.' },
  ],
  relatedPools: ['topic-school', 'topic-numbers'],
  content: [
    createContentItem('Aula universitaria', 'AU-la u-ni-ver-si-TA-rja', 'A classroom at the university. Italian university classrooms often have rows of fixed wooden desks (banchi), a large blackboard or whiteboard (lavagna), and a lectern (cattedra) for the professor. The atmosphere is more formal than American classrooms.', 'word', 'Sono in aula al primo piano.', 'Vocabulary anchor; the location of this entire unit.', null, [ACT.orientation]),
    createContentItem('Università di Bologna', "u-ni-ver-si-TA di bo-LO-nya", 'The oldest continuously operating university in Europe (1088), located in Bologna. UniBo students often take their first Italian for foreigners courses here in shared classrooms with other Erasmus students.', 'word', 'Studio italiano all\'Università di Bologna.', 'Anchor school for the Italian curriculum.', null, [ACT.orientation]),
    createContentItem('Scenario reale', 'ske-NA-rjo re-A-le', 'You walk into your first Italian-language class. The teacher asks who has a pen, who is missing a book. You need numbers (how many), classroom items (with gender), and the verbs avere and esserci.', 'word', 'Insegnante: Quanti studenti ci sono oggi?', 'Realistic teacher question opening the unit.', null, [ACT.orientation]),

    createContentItem('quattro', '/ˈkwat.tro/', 'Number 4. Geminate tt fully held — clearly longer than single t. Penultimate stress: QUAT-tro. Initial qu /kw/.', 'word', 'Ho quattro libri nello zaino.', 'Geminate t distinguishes from no Italian word with single t in this slot.', null, [ACT.pronunciation]),
    createContentItem('otto', '/ˈɔt.to/', 'Number 8. Geminate tt + open ò /ɔ/. Note the open o is automatic before a geminate; closed o would be wrong here.', 'word', 'Ci sono otto sedie.', 'Open o + geminate t — two pronunciation features in one word.', null, [ACT.pronunciation]),
    createContentItem('ventitré', '/ven.tiˈtre/', 'Number 23. Final stress on -tré with ACUTE accent é (closed e). The acute distinguishes from a hypothetical grave. Same applies to all -tré compounds: trentatré, quarantatré.', 'word', 'Abbiamo ventitré studenti in classe.', 'Composed of venti + tre; final stress with acute on closed é.', null, [ACT.pronunciation]),
    createContentItem('cinque', '/ˈtʃiŋ.kwe/', 'Number 5. Soft c /tʃ/ before i; then nq cluster (often pronounced /ŋk/ from assimilation). Closed e at the end.', 'word', 'Ho cinque amici a Bologna.', 'Soft c — most learners try /sin.kwe/ which is wrong.', null, [ACT.pronunciation]),
    createContentItem('sedici', '/ˈseː.di.tʃi/', 'Number 16. Antepenultimate stress (sdrucciola): SE-di-ci. Soft c /tʃ/ before i. Many "teen" numbers in Italian have antepenultimate stress.', 'word', 'In classe siamo sedici.', 'Sdrucciola — third-from-last stress; common in numbers 11-16.', null, [ACT.pronunciation]),

    createContentItem('il libro', '/il ˈliː.bro/', 'The book (m.s.). Definite article il + masculine consonant-initial noun. Plural i libri.', 'word', 'Il libro è sulla scrivania.', 'Most common -o noun in any classroom unit.', null, [ACT.vocabularyObjects]),
    createContentItem('il quaderno', '/il kwaˈdɛr.no/', 'The notebook (m.s.). Open è in -dèrno. Plural i quaderni.', 'word', 'Ho due quaderni di italiano.', 'Distinct from libro (textbook); quaderno is for writing.', null, [ACT.vocabularyObjects]),
    createContentItem('la penna', '/la ˈpen.na/', 'The pen (f.s.). Geminate nn held; penultimate stress. Plural le penne.', 'word', 'Mi presti la penna?', 'Common classroom request: "lend me your pen".', null, [ACT.vocabularyObjects]),
    createContentItem('la matita', '/la maˈtiː.ta/', 'The pencil (f.s.). Penultimate stress. Plural le matite.', 'word', 'Disegno con la matita.', '"I draw with the pencil"; distinct from penna (pen).', null, [ACT.vocabularyObjects]),
    createContentItem('lo zaino', '/lo ˈdzai.no/', 'The backpack (m.s.). Article LO (not il) because zaino starts with z. Voiced /dz/. Plural gli zaini.', 'word', 'Metto i libri nello zaino.', 'Triggers article rule: z requires lo, not il.', null, [ACT.vocabularyObjects]),
    createContentItem('la lavagna', '/la laˈvaɲ.ɲa/', 'The blackboard / whiteboard (f.s.). gn → /ɲ/ palatal nasal, phonetically geminated. Plural le lavagne.', 'word', 'Il professore scrive alla lavagna.', '"The professor writes on the board".', null, [ACT.vocabularyObjects]),
    createContentItem('la sedia', '/la ˈsɛː.dja/', 'The chair (f.s.). Open è /ɛ/. The -ia ending is one syllable: dja. Plural le sedie.', 'word', 'Quante sedie ci sono?', 'Common counting target in classroom inventory.', null, [ACT.vocabularyObjects]),
    createContentItem('il banco', '/il ˈbaŋ.ko/', 'The desk (m.s., student desk specifically). Distinct from scrivania (a personal desk in a study or office). Plural i banchi (with h to keep c hard).', 'word', 'Ogni studente ha un banco.', 'Banchi for plural — note the h to preserve hard c /k/ before i.', null, [ACT.vocabularyObjects]),
    createContentItem('la finestra', '/la fiˈnɛs.tra/', 'The window (f.s.). Open è. Plural le finestre.', 'word', 'L\'aula ha tre finestre.', 'Standard classroom feature.', null, [ACT.vocabularyObjects]),
    createContentItem('la porta', '/la ˈpɔr.ta/', 'The door (f.s.). Open ò /ɔ/. Plural le porte.', 'word', 'Chiudi la porta, per favore.', '"Close the door, please" — common classroom request.', null, [ACT.vocabularyObjects]),
    createContentItem('il computer', '/il komˈpjuː.ter/', 'The computer (m.s.). Loanword from English; pronounced approximately as /komˈpjuː.ter/ but spelled English. Invariable in plural: i computer.', 'word', 'Ogni studente ha un computer.', 'Foreign loanwords like computer, weekend, mouse are invariable.', null, [ACT.vocabularyObjects]),
    createContentItem("l'orologio", '/lo.roˈlɔː.dʒo/', 'The clock / watch (m.s.). Article elided lo → l\' before vowel. gi /dʒ/ soft g. Plural gli orologi.', 'word', 'Guardo l\'orologio: è mezzogiorno.', 'Vocab piece + elision example combined.', null, [ACT.vocabularyObjects]),
    createContentItem('la gomma', '/la ˈɡom.ma/', 'The eraser (f.s.). Geminate mm. Also means "rubber/tire". Plural le gomme.', 'word', 'Cancello con la gomma.', '"I erase with the rubber".', null, [ACT.vocabularyObjects]),
    createContentItem('il cellulare', '/il tʃel.luˈlaː.re/', 'The mobile phone (m.s.). Soft c /tʃ/ before e; geminate ll. Plural i cellulari. Also called telefonino.', 'word', 'Spegni il cellulare in classe!', '"Turn off the phone in class" — common teacher line.', null, [ACT.vocabularyObjects]),

    createContentItem('uno, due, tre', '/ˈuː.no/, /ˈduː.e/, /tre/', '1, 2, 3. Note that uno is the same word as the masculine indefinite article — Italian uses one word. Tre takes a grave accent only in compound numbers (ventitré).', 'word', 'uno + due = tre', 'The opening trio of any counting sequence.', null, [ACT.vocabularyNumbers]),
    createContentItem('quattro, cinque, sei', '/ˈkwat.tro/, /ˈtʃiŋ.kwe/, /sɛi/', '4, 5, 6. Cinque has soft c /tʃ/; sei has open e /ɛ/.', 'word', '4 + 5 + 6 = 15', 'Numbers with two phonetic traps: soft c and open e.', null, [ACT.vocabularyNumbers]),
    createContentItem('sette, otto, nove', '/ˈsɛt.te/, /ˈɔt.to/, /ˈnɔː.ve/', '7, 8, 9. Geminates in sette and otto; open vowels in all three.', 'word', '7 + 8 + 9 = 24', 'Open mid vowels are systematic in these decade-units.', null, [ACT.vocabularyNumbers]),
    createContentItem('dieci', '/ˈdjɛː.tʃi/', '10. Open e + soft c /tʃ/ before i. Penultimate stress.', 'word', 'Ho dieci euro.', 'Round number; opens the teens.', null, [ACT.vocabularyNumbers]),
    createContentItem('undici, dodici, tredici', '/ˈun.di.tʃi/, /ˈdoː.di.tʃi/, /ˈtreː.di.tʃi/', '11, 12, 13. Antepenultimate stress (sdrucciole). Pattern: unit + dici (compressed from "ten"). Note c soft /tʃ/ before i.', 'word', '11, 12, 13 — undici, dodici, tredici', 'All sdrucciole — third-from-last stress.', null, [ACT.vocabularyNumbers]),
    createContentItem('quattordici, quindici, sedici', '/kwatˈtor.di.tʃi/, /ˈkwin.di.tʃi/, /ˈseː.di.tʃi/', '14, 15, 16. Same pattern: unit + dici. Note quindici (not "cinquedici") — irregular reduction.', 'word', '14, 15, 16 — quattordici, quindici, sedici', 'Antepenultimate stress group.', null, [ACT.vocabularyNumbers]),
    createContentItem('diciassette, diciotto, diciannove', '/di.tʃasˈsɛt.te/, /diˈtʃɔt.to/, /di.tʃanˈnɔː.ve/', '17, 18, 19. Pattern INVERTS: dici (ten) + unit. Different from 11-16. Geminates appear because of the combination: dici+sette → diciassette.', 'word', '17, 18, 19 — diciassette, diciotto, diciannove', 'The teens flip at 17; new pattern matches 21+.', null, [ACT.vocabularyNumbers]),
    createContentItem('venti, trenta, quaranta', '/ˈven.ti/, /ˈtren.ta/, /kwaˈran.ta/', '20, 30, 40. Decade names. Build 21-29 by adding the unit: ventuno (apocope of venti+uno), ventidue, ventitré (with acute é).', 'word', 'Ho 24 anni — ho ventiquattro anni.', 'Decade pattern continues to 90 (novanta).', null, [ACT.vocabularyNumbers]),
    createContentItem('cinquanta, sessanta, settanta', '/tʃiŋˈkwan.ta/, /sesˈsan.ta/, /setˈtan.ta/', '50, 60, 70. All decade names ending in -anta. Geminate ss in sessanta, tt in settanta.', 'word', 'Mia nonna ha settanta anni.', '"My grandmother is seventy years old".', null, [ACT.vocabularyNumbers]),
    createContentItem('ottanta, novanta, cento', '/otˈtan.ta/, /noˈvan.ta/, /ˈtʃɛn.to/', '80, 90, 100. Cento is the round hundred. Geminate tt in ottanta. Soft c in cento.', 'word', 'Lo zaino costa cento euro.', '"The backpack costs 100 euros".', null, [ACT.vocabularyNumbers]),
    createContentItem('ventuno, ventidue, ventitré', '/venˈtuː.no/, /ven.tiˈduː.e/, /ven.tiˈtre/', '21, 22, 23. Note the APOCOPE in 21: venti drops final -i before uno (also before otto: ventotto). 23 takes acute é (mandatory). Same pattern for trentuno, trentadue, trentatré.', 'word', '21 = venti + uno → ventuno (apocope) · 23 = venti + tre → ventitré (acute é)', 'Two spelling features: apocope before uno/otto, and the acute on -tré.', null, [ACT.vocabularyNumbers]),

    createContentItem('avere — presente indicativo', 'present indicative of "to have"', 'avere is the second essential irregular verb. Six forms: io ho, tu hai, lui/lei ha, noi abbiamo, voi avete, loro hanno. Note the SILENT h in ho, hai, ha, hanno — purely orthographic, distinguishing these verb forms from other words (ho vs o "or").', 'sentence', 'io HO / tu HAI / lui-lei HA / noi ab-BIA-mo / voi a-VE-te / loro HAN-no', 'Memorize together with essere — the two pillar verbs of Italian.', [
      { target: 'io ho', note: '"I have"; silent h; same sound as "o" (or)' },
      { target: 'tu hai', note: '"you have" (informal); silent h; same sound as "ai" (to the m.pl.)' },
      { target: 'lui/lei ha', note: '"he/she has"; silent h; same sound as "a" (to)' },
      { target: 'noi abbiamo', note: '"we have"; geminate bb; stress on -BIA-' },
      { target: 'voi avete', note: '"you all have"; no silent h here' },
      { target: 'loro hanno', note: '"they have"; silent h; geminate nn distinguishes from anno "year"' },
    ], [ACT.grammarHaveAvere]),
    createContentItem('avere per il possesso', 'avere for possession', 'Use avere with a direct object to express possession: ho un libro, hai una penna, ha tre fratelli. The article (un/una/il/la) is normally required before the noun.', 'sentence', 'Ho un libro. Hai una matita? Ha due gatti.', 'Standard use; works for any concrete possession.', null, [ACT.grammarHaveAvere]),
    createContentItem('avere per l\'età', 'avere for age — NOT essere', 'Italian uses AVERE for age, NOT essere. "I am 25 years old" is "ho venticinque anni" (literally "I have 25 years"), NEVER "sono 25 anni". This is one of the most common errors English speakers make.', 'sentence', 'Quanti anni hai? — Ho venticinque anni.', 'A key idiomatic difference between English and Italian.', [
      { target: 'ho 25 anni ✓', note: 'literal "I have 25 years"; the correct Italian form' },
      { target: 'sono 25 anni ✗', note: 'WRONG; English-style structure that does not work in Italian' },
    ], [ACT.grammarHaveAvere]),
    createContentItem('avere idiomatico', 'avere idioms — states English uses "be" for', 'Italian uses avere for many states English expresses with "be": ho fame "I\'m hungry", ho sete "I\'m thirsty", ho freddo "I\'m cold", ho caldo "I\'m hot", ho sonno "I\'m sleepy", ho paura "I\'m afraid", ho ragione "I\'m right", ho torto "I\'m wrong".', 'sentence', 'Ho fame, mangiamo? · Hai freddo? · Ha ragione il professore.', 'Memorize as a list — they all use avere where English uses "be".', [
      { target: 'ho fame', note: '"I\'m hungry"; literal "I have hunger"' },
      { target: 'ho sete', note: '"I\'m thirsty"; literal "I have thirst"' },
      { target: 'ho freddo / caldo', note: '"I\'m cold / hot"; for body temperature' },
      { target: 'ho sonno', note: '"I\'m sleepy"; literal "I have sleep"' },
      { target: 'ho ragione / torto', note: '"I\'m right / wrong"' },
    ], [ACT.grammarHaveAvere]),

    createContentItem("c'è", "/tʃɛ/", '"there is" — singular. Contraction of ci + è ("there is" literally). The c is soft /tʃ/ before è; the apostrophe is mandatory. Negate with non c\'è; question with rising intonation: c\'è un computer?', 'sentence', "C'è un libro sulla scrivania. C'è una finestra aperta.", 'Used for singular existence/presence; equivalent to English "there is".', null, [ACT.grammarThereIs]),
    createContentItem('ci sono', '/tʃi ˈsoː.no/', '"there are" — plural. ci (locative) + sono (essere 3rd plural). Pronounced as two separate words. Negate with non ci sono; question with rising intonation: ci sono studenti qui?', 'sentence', 'Ci sono tre libri. Ci sono molti studenti in aula.', 'Plural counterpart of c\'è.', null, [ACT.grammarThereIs]),
    createContentItem('Distinzione c\'è vs è', "c'è vs è — there is vs is", 'Critical contrast: c\'è = "there is" (presents existence/location); è = "is" (links subject to predicate). C\'è un libro = "there is a book (somewhere)"; il libro è interessante = "the book is interesting".', 'sentence', "C'è un libro. (existence) vs Il libro è interessante. (identity)", 'Confusing these is a common learner error.', [
      { target: "c'è = there is", note: 'introduces existence; "there is [something] [somewhere]"' },
      { target: 'è = is', note: 'links subject to predicate; "X is Y"' },
    ], [ACT.grammarThereIs]),
    createContentItem('Negazione e domanda', 'negation and question with c\'è/ci sono', 'Negate by putting non before c\'è / ci sono: non c\'è un computer, non ci sono studenti. Form yes/no questions by intonation only: c\'è un computer? ci sono studenti?', 'sentence', 'Non c\'è il professore oggi. Ci sono solo cinque studenti? · C\'è qualcuno?', 'Standard negation pattern from Unit 1 applies here too.', null, [ACT.grammarThereIs]),

    createContentItem('quanto, quanta, quanti, quante', "agreement: quanto/-a/-i/-e", 'The interrogative "how much / how many" agrees with the noun: quanto (m.s. — uncountable: quanto tempo "how much time"), quanta (f.s.: quanta pasta "how much pasta"), quanti (m.pl.: quanti libri "how many books"), quante (f.pl.: quante penne "how many pens").', 'sentence', 'Quanti libri hai? · Quante penne ci sono? · Quanto tempo abbiamo? · Quanta acqua bevi?', 'Agreement is automatic; getting it wrong sounds clearly foreign.', [
      { target: 'quanto (m.s. uncount)', note: 'with uncountable masculine: quanto tempo, quanto zucchero' },
      { target: 'quanta (f.s. uncount)', note: 'with uncountable feminine: quanta acqua, quanta pasta' },
      { target: 'quanti (m.pl.)', note: 'with countable masculine plural: quanti libri, quanti euro' },
      { target: 'quante (f.pl.)', note: 'with countable feminine plural: quante penne, quante sedie' },
    ], [ACT.grammarQuanto]),
    createContentItem('quanto come avverbio', 'quanto as adverb — uninflected', 'When quanto modifies a verb (not a noun), it stays UNINFLECTED: quanto costa? "how much does it cost?", quanto pesa? "how much does it weigh?". No agreement because there is no noun to agree with.', 'sentence', 'Quanto costa il libro? · Quanto pesa lo zaino?', 'Adverb use is invariable.', null, [ACT.grammarQuanto]),

    createContentItem('La mia aula', 'my classroom (paragraph)', 'A complete description of an Italian classroom at UniBo. Read aloud with attention to gender agreement, c\'è / ci sono, and number forms.', 'sentence', 'La mia aula all\'Università di Bologna è grande e luminosa. Ci sono venti banchi e venti sedie. Sulla lavagna c\'è un programma del corso. Ogni studente ha un quaderno, una penna e un libro. Il professore ha un computer e un proiettore. Vicino alla porta c\'è un orologio: sono le nove di mattina.', 'Translation: "My classroom at the University of Bologna is large and bright. There are twenty desks and twenty chairs. On the board there is a course program. Every student has a notebook, a pen, and a book. The professor has a computer and a projector. Near the door there is a clock: it\'s 9 AM."', [
      { target: "all'Università", note: 'elision of a + la → alla, then dell\' is wrong here; alla università → all\'università' },
      { target: 'ci sono venti', note: '"there are twenty" — plural existence' },
      { target: 'sulla lavagna', note: 'su + la → sulla — preposition + article contraction' },
      { target: "c'è un programma", note: '"there is a program" — singular existence' },
      { target: 'sono le nove', note: '"it is 9 o\'clock" — time uses ESSERE plural for hours after 1' },
    ], [ACT.reading]),
    createContentItem('Domande di comprensione', 'comprehension questions', 'Five questions checking inventory and quantities.', 'sentence', 'D1: Quanti banchi ci sono in aula? · D2: Cosa c\'è sulla lavagna? · D3: Quanti computer ha ogni studente? · D4: Dove c\'è l\'orologio? · D5: Che ora è?', 'Answers should use ci sono/c\'è and numbers.', [
      { target: 'R1: Ci sono venti banchi.', note: 'plural inventory with ci sono' },
      { target: 'R2: C\'è un programma del corso.', note: 'singular item on the board' },
      { target: 'R3: Zero, non hanno computer.', note: 'trick question; the professor has the computer' },
      { target: 'R4: L\'orologio è vicino alla porta.', note: 'location using essere + prepositional phrase' },
      { target: 'R5: Sono le nove di mattina.', note: '"it\'s 9 AM" — sono le + hour' },
    ], [ACT.reading]),

    createContentItem('In aula — dialogo', 'classroom dialogue', 'A student asks the teacher for an extra item.', 'conversation', 'Studente: Mi scusi, professoressa, ho dimenticato la penna. Posso averne una?\nProfessoressa: Certo, eccone una. Ne hai bisogno anche di altro?\nStudente: Sì, mi serve anche un foglio, per favore.\nProfessoressa: Ecco un foglio. Quanti ne vuoi?\nStudente: Uno è sufficiente, grazie mille.\nProfessoressa: Prego. Iniziamo la lezione: aprite il libro a pagina ventidue.', 'Classroom interaction — politely asking for missing supplies and getting a quantity-question response.', [
      { target: 'mi scusi', note: 'formal "excuse me" — Lei form imperative' },
      { target: 'posso averne una?', note: '"may I have one?" — modal posso + avere + ne pronoun' },
      { target: 'eccone una', note: '"here\'s one" — ecco + ne + numeral' },
      { target: 'aprite il libro a pagina 22', note: '"open the book to page 22" — voi imperative form aprite' },
    ], [ACT.listening]),

    createContentItem('Inventario di classe', 'classroom inventory writing', '5-sentence template for inventory description using c\'è/ci sono + numbers + articles.', 'sentence', 'Esempio: Nella mia aula ci sono quindici banchi. C\'è una lavagna grande e c\'è un computer. Ho un libro, due quaderni e tre penne. Non c\'è un orologio, ma c\'è una finestra. Vicino alla porta ci sono molte sedie.', 'Use this as a model; substitute your own quantities.', null, [ACT.writing]),

    createContentItem("Sistema universitario italiano", 'Italian university system', 'Italian universities use a 30-point grading scale; 18 is the minimum pass, 30 the maximum, and 30 e lode ("30 with honors") is the highest. Most exams are ORAL — students sit before the professor and discuss the material. The academic year runs from October to mid-July with sessions in January, June, and September. The bachelor (laurea triennale) is 3 years; the master (laurea magistrale) adds 2 more.', 'sentence', 'Ho preso 28 all\'esame di latino. Voglio prendere 30 e lode alla prossima sessione.', 'Cultural literacy item; most international students are surprised by the oral-exam tradition.', [
      { target: '30 (trenta) e lode', note: 'maximum grade with honors; very prestigious' },
      { target: 'esami orali', note: 'oral exams; the Italian academic norm' },
      { target: 'laurea triennale / magistrale', note: 'bachelor (3 years) / master (2 more)' },
      { target: 'sessione (gennaio, giugno, settembre)', note: 'three main exam sessions per academic year' },
    ], [ACT.culture]),
    createContentItem("Lei con il professore", 'Lei with the professor — long-term', 'Italian university students typically use Lei with their professors throughout their entire studies, even after years. The professor must explicitly invite the switch to tu (usually with "dammi del tu"). Some senior professors never invite the switch; tu would be inappropriate even after graduation.', 'sentence', 'Buongiorno, professoressa. Lei pensa che possa fare l\'esame a giugno?', 'A point where Italian formality goes further than most other Western cultures.', null, [ACT.culture]),

    createContentItem('Compito: prima lezione di italiano', 'task: first Italian-language class', 'Roleplay the first class with the AI tutor as your insegnante. Use numbers, classroom items, c\'è/ci sono, avere, and polite request phrases.', 'conversation', '[Aula 12, Università di Bologna]\nInsegnante: Buongiorno a tutti. Quanti studenti ci sono oggi?\nTu: [count classmates including yourself]\nInsegnante: Bene. Avete tutti il libro e il quaderno?\nTu: [confirm what you have, mention if missing]\nInsegnante: C\'è qualcuno che ha bisogno di una penna?\nTu: [ask for one if needed, politely]\nInsegnante: Ottimo, allora iniziamo. Aprite il libro a pagina dieci.', 'Six-turn class opening; covers all the lesson\'s grammar.', [
      { target: 'count classmates', note: 'Ci sono… studenti / Siamo in…' },
      { target: 'avere check', note: 'Ho il libro / Non ho la penna' },
      { target: 'polite request', note: 'Mi scusi, posso avere una penna, per favore?' },
    ], [ACT.task]),
    createContentItem("Sfida — l'ora", 'stretch — telling the time', 'Stretch goal: ask and answer "what time is it" with the unit\'s vocabulary. Italian uses essere: che ora è? / che ore sono? — sono le nove (it\'s 9), è l\'una (it\'s 1), è mezzogiorno (noon), è mezzanotte (midnight).', 'sentence', '— Che ora è? — Sono le dieci e quindici. · — Che ora è? — È mezzogiorno.', 'Time uses sono le + plural for 2-12; è l\'una/mezzogiorno/mezzanotte are special.', null, [ACT.task]),
  ],
};

module.exports = lesson;
