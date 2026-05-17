// Level 1 Unit 2 — Classroom Language & Objects (Filipino/Tagalog)
// Functions: classroom objects, where-is questions, polite requests, asking and
// answering simple yes/no, basic locative sa/nasa, the may/wala existential pair.

const createContentItem = (target, pron, note, type = 'word', example = '', exampleNote = '', breakdown = null, activityIds = []) => ({
  type, activityIds, targetText: target, romanization: pron, nativeText: note,
  pronunciation: pron, exampleTarget: example || target, exampleNative: exampleNote || note,
  korean: target, english: note, example: example || target, exampleEnglish: exampleNote || note,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.target, native: b.note, korean: b.target, english: b.note })) } : {}),
});

const ACT = {
  orientation: 'fil-l1u2-orientation',
  pronunciation: 'fil-l1u2-pronunciation',
  vocabularyObjects: 'fil-l1u2-vocab-objects',
  vocabularyActions: 'fil-l1u2-vocab-actions',
  grammarLocative: 'fil-l1u2-grammar-locative',
  grammarMayWala: 'fil-l1u2-grammar-may-wala',
  grammarDemonstratives: 'fil-l1u2-grammar-demonstratives',
  reading: 'fil-l1u2-reading',
  listening: 'fil-l1u2-listening',
  writing: 'fil-l1u2-writing',
  culture: 'fil-l1u2-culture',
  task: 'fil-l1u2-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'What you will be able to do', goals: ['Identify and name 20+ classroom objects in Filipino, using both native Tagalog and Spanish-loan vocabulary correctly.', 'Ask "where is X?" using Nasaan ang… and answer using nasa + location.', 'Make polite classroom requests with pakí- prefix (pakikuha "please get") and pwede (may I/can I).'], task: 'Picture an Intro to Filipino class at UP Diliman — by the end of this lesson you should be able to ask the teacher for a marker, find your seat, and confirm what assignments are due, all in Filipino.' },
  { id: ACT.pronunciation, section: 'Pronunciation', title: 'Sound traps', goals: ['Pronounce the locative marker "sa" /sa/ as a separate clitic, not fused with the next word.', 'Master the "nasaan" /naˈsaʔan/ contraction: nasa "at" + saan "where" = nasaan "at where?", with internal glottal stop.', 'Apply penultimate stress correctly on the demonstrative pair ito (this) and iyan (that-near-listener).'], task: 'Read each example aloud; mark the sa-clitic boundary; produce nasaan with the medial glottal.' },
  { id: ACT.vocabularyObjects, section: 'Vocabulary I', title: 'Classroom objects (20 words)', goals: ['Memorize 20 classroom objects covering writing tools, reading materials, furniture, and digital tools.', 'Distinguish Spanish-origin loans (libro, kuwaderno, lapis) from native Tagalog (papel, mesa, silya) and English-origin (whiteboard, marker, laptop).'], task: 'Point to each object in your environment and name it in Filipino.' },
  { id: ACT.vocabularyActions, section: 'Vocabulary II', title: 'Classroom verbs and requests', goals: ['Recognize 10 classroom verbs in their root form (basa "read", sulat "write", kuha "get", bigay "give", tingin "look at").', 'Use the pakí- prefix and pwede ba pattern for polite requests.'], task: 'Form one polite request for each of five common classroom needs (pen, paper, the textbook page, repeating instructions, going to the bathroom).' },
  { id: ACT.grammarLocative, section: 'Grammar I', title: 'Sa and nasa — locative case', goals: ['Use sa as the locative case marker meaning "at / to / in / on" depending on context.', 'Use nasa (a contraction of "na" + "sa") as the existential locative: "is at/in".', 'Form the question word nasaan "where (is)" and answer with nasa + place.'], task: 'Form three sentences using nasa + location, then turn each into a Nasaan…? question.' },
  { id: ACT.grammarMayWala, section: 'Grammar II', title: 'May and wala — there is / there is not', goals: ['Use may (pronounced /maj/) to mean "there is / there are / I have / etc.".', 'Use walâ (with final glottal) to mean "there is no / there is none / I do not have".', 'Form may/wala questions: May libro ka ba? "Do you have a book?"'], task: 'Form three may sentences (existence/possession) and convert each to wala.' },
  { id: ACT.grammarDemonstratives, section: 'Grammar III', title: 'Ito, iyan, iyon — the three-way demonstrative system', goals: ['Use the three-way demonstrative system: ito "this (near me)", iyan "that (near you)", iyon "that (far from both of us)". Unlike English\'s two-way this/that, Filipino has three based on distance from each speaker.', 'Recognize that demonstratives have three case sets like pronouns: ang-case (ito, iyan, iyon), ng-case (nito, niyan, niyon), sa-case (dito, diyan, doon).'], task: 'Practice the three-way distinction with five different objects at different distances.' },
  { id: ACT.reading, section: 'Reading', title: 'Reading a classroom description', goals: ['Read a short classroom paragraph aloud and answer comprehension questions.', 'Apply nasa, may/wala, and demonstratives in answers.'], task: 'Read the paragraph; answer four comprehension questions.' },
  { id: ACT.listening, section: 'Listening', title: 'Classroom dialogue', goals: ['Follow a 4-turn dialogue between teacher and students about classroom materials.', 'Identify register markers (pô from students to teacher, no pô teacher to students).'], task: 'Listen, then perform with role-swap.' },
  { id: ACT.writing, section: 'Writing', title: 'Describe your classroom', goals: ['Write 4-5 sentences describing your classroom or workspace using may/wala, nasa, and demonstratives.'], task: 'Write and read aloud.' },
  { id: ACT.culture, section: 'Culture', title: 'Philippine classroom culture', goals: ['Know that students stand to greet teachers ("Good morning, Ma\'am Reyes"), call teachers "Ma\'am" or "Sir" + last name, and that pô is obligatory throughout.', 'Recognize the influence of American education (the Philippine school system runs K-12 like the US since 2013).'], task: 'Compare two classroom rituals you experienced with the Philippine norm.' },
  { id: ACT.task, section: 'Task', title: 'First class day', goals: ['Combine everything: enter the classroom, greet teacher with pô, find seat, ask classmate (ate/kuya) for materials, answer teacher\'s yes/no questions.'], task: 'Roleplay the first class day at UP Diliman with the AI tutor as teacher and a classmate.' },
];

const lesson = {
  title: 'Level 1 · Unit 2: Sa Silid-Aralan — Classroom Language & Objects',
  category: 'classroom',
  difficulty: 'beginner',
  targetLang: 'fil',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'asking-where', label: 'Asking where something is', goal: 'Use Nasaan ang…? and reply with nasa + place.' },
    { id: 'polite-request', label: 'Making a polite request', goal: 'Use pakí- or Pwede ba… for classroom requests, adding pô when addressing the teacher.' },
    { id: 'existence', label: 'Talking about existence/possession', goal: 'Use may and walâ to talk about what is or is not present in the classroom.' },
    { id: 'demonstratives', label: 'Pointing things out', goal: 'Use ito, iyan, iyon based on distance from speaker and listener.' },
  ],
  relatedPools: ['topic-classroom', 'topic-education'],
  content: [
    createContentItem('Layunin', 'la-YU-nin', 'By the end of this lesson, you can navigate a Filipino classroom — name objects, find them, request them politely, and describe the room — all with the right register for talking to a teacher (pô throughout) vs a classmate (no pô).', 'word', 'Functional language: pagtukoy sa bagay (identifying objects) · paghingi (requesting) · paghahanap (finding) · paglalarawan (describing)', 'These four micro-skills cover most classroom interaction beyond the greeting.', null, [ACT.orientation]),
    createContentItem('Tunay na sitwasyon', 'TU-nay na sit-wa-SYON', 'Your first Intro to Filipino class at UP Diliman. The professor walks in, you stand, greet, sit, and realize you forgot a pen. You need to politely ask a classmate (kuya/ate, depending on age) for one. Then the professor calls on you to read from page 12 — you need to find your book and the page.', 'word', 'Ma\'am Reyes: "Buksan ninyo pô ang libro sa pahina 12." / Ikaw (sa katabi): "Kuya, pakihiram ng lapis pô."', 'Teacher uses pô addressing the class as a respectful courtesy; student uses pô + pakí- for a polite request.', null, [ACT.orientation]),

    createContentItem('sa', 'sa', 'The locative case marker. Translates to "at / to / in / on / from" depending on context. One of the three core case markers (ang, ng, sa). Always precedes the noun: sa silid-aralan "in the classroom", sa bahay "at home", sa Maynila "in Manila".', 'word', 'Nasa silid-aralan ako. Pupunta ako sa palengke.', '"I am in the classroom. I will go to the market." — sa works for static location (nasa) and movement (pupunta… sa).', [
      { target: 'sa + place (location)', note: 'with verb of being (nasa, ay) = "at/in/on"' },
      { target: 'sa + place (direction)', note: 'with verb of motion (punta, alis) = "to/toward"' },
      { target: 'sa + person/place (origin)', note: 'with verb of giving/sending = "to (recipient)"' },
    ], [ACT.pronunciation, ACT.grammarLocative]),
    createContentItem('nasa', 'NA-sa', 'A contraction of na + sa, used to say "is at / is in / is on". Functions as an existential locative — "to be (somewhere)". Nasa silid-aralan ako = "I am in the classroom".', 'word', 'Nasaan ang libro? — Nasa mesa ang libro.', '"Where is the book? — The book is on the table." — nasaan is the question (where-is), nasa is the answer (is-at).', null, [ACT.pronunciation, ACT.grammarLocative]),
    createContentItem('nasaan', 'na-SA-an', '"Where is…?" — the existential location question. From nasa + saan ("at where"). Internal glottal stop in careful pronunciation: /naˈsaʔan/. Used with ang + subject: Nasaan ang [subject]? "Where is the [subject]?"', 'word', 'Nasaan ang lapis ko? — Nasa bag mo.', '"Where is my pencil? — In your bag." — typical classroom question.', null, [ACT.pronunciation, ACT.grammarLocative]),

    createContentItem('libro', 'LIB-ro', '"Book". From Spanish "libro". Replaced any native term in everyday use. Mga libro = "books" (plural).', 'word', 'Buksan ninyo ang libro sa pahina 12.', '"Open your books to page 12" — typical classroom command.', null, [ACT.vocabularyObjects]),
    createContentItem('kuwaderno', 'kuw-a-DER-no', '"Notebook". From Spanish "cuaderno". The standard word; English "notebook" is also used in Taglish.', 'word', 'Isulat ninyo sa kuwaderno.', '"Write it in your notebook" — classroom command.', null, [ACT.vocabularyObjects]),
    createContentItem('lapis', 'LA-pis', '"Pencil". From Spanish "lápiz". Final s pronounced. Plural: mga lapis.', 'word', 'May lapis ka ba? — Wala, may pen lang ako.', '"Do you have a pencil? — No, I only have a pen" — typical classroom exchange.', null, [ACT.vocabularyObjects]),
    createContentItem('papel', 'pa-PEL', '"Paper". From Spanish "papel". Used both for sheets of paper and abstractly (papel-bagsak "official document").', 'word', 'Pakikuha ng papel.', '"Please get some paper" — pakí- prefix making a polite request.', null, [ACT.vocabularyObjects]),
    createContentItem('pen / panulat', 'PEN / pa-NU-lat', '"Pen". English "pen" is most common in casual speech; "panulat" is the formal native word (from sulat "to write"). Both correct; pen dominates classroom register.', 'word', 'Pakihiram ng pen pô.', '"Please lend me a pen, sir/ma\'am" — polite request with pakí- + pô.', null, [ACT.vocabularyObjects]),
    createContentItem('mesa', 'ME-sa', '"Table / desk". From Spanish "mesa". In classroom: the student\'s desk. Also used for any flat-surface furniture.', 'word', 'Nasa mesa mo ang libro.', '"The book is on your desk."', null, [ACT.vocabularyObjects]),
    createContentItem('silya', 'SIL-ya', '"Chair". From Spanish "silla". Classroom chairs, household chairs, all silya.', 'word', 'Umupo ka sa silya.', '"Sit on the chair" — typical instruction.', null, [ACT.vocabularyObjects]),
    createContentItem('pisara', 'pi-SA-ra', '"Blackboard / whiteboard". From Spanish "pizarra". Older usage = blackboard; modern usage = whiteboard. English "whiteboard" also common.', 'word', 'Tingnan ninyo ang nakasulat sa pisara.', '"Look at what is written on the board."', null, [ACT.vocabularyObjects]),
    createContentItem('marker', 'MAR-ker', '"Marker / whiteboard marker". English loan, kept in original spelling. Common in modern classrooms.', 'word', 'Nawawala ang marker.', '"The marker is missing/lost."', null, [ACT.vocabularyObjects]),
    createContentItem('pahina', 'pa-HI-na', '"Page". From Spanish "página". Used for textbook pages, notebook pages, etc.', 'word', 'Sa pahina 12 tayo.', '"We are on page 12" — sa = locative.', null, [ACT.vocabularyObjects]),
    createContentItem('eksamen', 'ek-SA-men', '"Exam". From Spanish "examen". English "exam" or "test" also used. Filipino students worry about eksamen as much as anyone.', 'word', 'Kailan ang eksamen?', '"When is the exam?" — kailan = "when"; a foundational question word.', null, [ACT.vocabularyObjects]),
    createContentItem('takdang-aralin', 'TAK-dang-a-RA-lin', '"Homework / assignment". Native compound: takda "assignment" + linker -ng + aralin "lesson". Also: "assignment" (English) freely used.', 'word', 'May takdang-aralin tayo bukas.', '"We have homework tomorrow" — tayo = we-inclusive.', null, [ACT.vocabularyObjects]),
    createContentItem('laptop', 'LAP-top', '"Laptop computer". English loan, kept intact. Most UP students bring laptops; in some classrooms they are required.', 'word', 'Dalhin ninyo ang laptop bukas.', '"Bring your laptops tomorrow."', null, [ACT.vocabularyObjects]),
    createContentItem('cellphone / selpon', 'SEL-pon', '"Mobile phone". Old spelling selpon, new spelling cellphone. Strict no-phone rules in some classes; "Patayin ninyo ang cellphone" = "Turn off your phones".', 'word', 'Patayin ninyo ang cellphone pô.', '"Please turn off your phones."', null, [ACT.vocabularyObjects]),
    createContentItem('aklat / textbook', 'AK-lat / TEX-buk', '"Textbook". Native aklat = "book" (formal/literary); modern speech prefers libro for general books and textbook (English) or aklat-aralin for school textbooks.', 'word', 'Buksan ninyo ang aklat sa pahina 12.', '"Open your textbooks to page 12."', null, [ACT.vocabularyObjects]),
    createContentItem('silid-aralan', 'SI-lid-a-RA-lan', '"Classroom". Native compound: silid "room" + aralan "learning place". Formal/standard word; many speakers just say "klase" (class) or "room".', 'word', 'Pumunta tayo sa silid-aralan.', '"Let\'s go to the classroom."', null, [ACT.vocabularyObjects]),
    createContentItem('lapis na ballpen', 'LA-pis na BAL-pen', '"Ballpoint pen". A loanword compound: lapis (Spanish-origin "pencil") + ballpen (English). Many older speakers use this to specify "pen" as distinct from "pencil".', 'word', 'May ballpen ka ba?', '"Do you have a ballpen/pen?"', null, [ACT.vocabularyObjects]),
    createContentItem('eraser / pambura', 'i-RAY-ser / pam-BU-ra', '"Eraser". English "eraser" is common; native pambura (pam- "instrument" + bura "erase").', 'word', 'Pakihiram ng pambura.', '"Please lend me the eraser."', null, [ACT.vocabularyObjects]),
    createContentItem('ruler / panukat', 'RUL-er / pa-NU-kat', '"Ruler". English "ruler" or native panukat (pan- "instrument" + sukat "measure"). Used for measuring and drawing straight lines.', 'word', 'May ruler ka ba?', '"Do you have a ruler?"', null, [ACT.vocabularyObjects]),
    createContentItem('hapag-aralan', 'HA-pag-a-RA-lan', '"Study table / desk". Formal native word; hapag = "table" (older usage) + aralan. Modern speech: mesa for both household and classroom desks.', 'word', 'Nasa hapag-aralan ang libro.', '"The book is on the study desk."', null, [ACT.vocabularyObjects]),

    createContentItem('basa (root)', 'BA-sa', '"Read" (verb root). Conjugates with focus affixes: bumasa (actor focus, "read") / basahin (object focus, "read it") / pinapabasa (causative). In imperatives: Basahin mo "Read it".', 'word', 'Basahin mo ang pahina 12.', '"Read page 12" — object-focus imperative.', null, [ACT.vocabularyActions]),
    createContentItem('sulat (root)', 'SU-lat', '"Write" (verb root). Conjugates: sumulat (write, actor focus) / isulat (write it, benefactive/object) / panulat (instrument noun, "pen").', 'word', 'Isulat mo sa kuwaderno.', '"Write it in your notebook."', null, [ACT.vocabularyActions]),
    createContentItem('kuha (root)', 'KU-ha', '"Get / fetch / take" (verb root). With pakí- prefix: pakikuha "please get". With kumuha actor focus: "I/he/she got". One of the highest-frequency verbs in classroom requests.', 'word', 'Pakikuha ng papel.', '"Please get some paper" — pakí- + kuha + ng + object.', null, [ACT.vocabularyActions]),
    createContentItem('bigay (root)', 'bi-GAY', '"Give" (verb root). With pakí-: pakibigay "please give". Common in classroom: Pakibigay sa akin ang libro "Please give me the book".', 'word', 'Pakibigay sa akin ang libro pô.', '"Please give me the book" — pakí- request with pô.', null, [ACT.vocabularyActions]),
    createContentItem('hiram (root)', 'hi-RAM', '"Borrow" (verb root). With pakí-: pakihiram "please lend". Most common classroom request — you borrow pens, erasers, books from classmates. Note semantic shift: pakihiram = "please lend (to me)", not "borrow on my behalf".', 'word', 'Pakihiram ng lapis.', '"Please lend me a pencil" — classroom staple.', null, [ACT.vocabularyActions]),
    createContentItem('tingin (root)', 'ti-NGIN', '"Look at" (verb root). With pakí-: pakitingnan. As tumingin: actor-focus "to look".', 'word', 'Tingnan ninyo ang pisara.', '"Look at the board."', null, [ACT.vocabularyActions]),
    createContentItem('pakí- (prefix)', 'pa-KI-', 'Politeness/request prefix attached to verb roots: pakí- + root = "please (do verb)". Used for requests. Pakí- + kuha = pakikuha "please get"; pakí- + hiram = pakihiram "please lend".', 'word', 'Pakikuha pô ng tubig.', '"Please get some water" — pakí- + kuha + pô (the polite layered request).', [
      { target: 'pakí- attaches to verb root', note: 'forms a polite imperative-request' },
      { target: '+ pô = maximum politeness', note: 'add pô when addressing elders or in formal contexts' },
      { target: 'casual variant: pakí- alone', note: 'pakí- without pô is peer-polite' },
    ], [ACT.vocabularyActions]),
    createContentItem('Pwede ba', 'PWE-de ba', '"May I / Can we / Is it possible". Used for permission and possibility. Pwede ba akong umalis? "May I leave?". With pô: Pwede pô ba akong umalis? for elder/teacher addressee.', 'word', 'Pwede pô ba akong magtanong?', '"May I ask a question?" — classroom polite request.', null, [ACT.vocabularyActions]),
    createContentItem('Salamat', 'sa-LA-mat', '"Thank you". Universal thanks; not limited to classroom. With pô = Salamat pô (respectful). Standard reply: Walang anuman "You\'re welcome".', 'word', 'Salamat pô, Ma\'am.', '"Thank you, Ma\'am" — student to teacher.', null, [ACT.vocabularyActions]),
    createContentItem('Paumanhin / Pasensya na', 'pa-u-man-HIN / pa-SEN-sya na', '"Excuse me / Sorry / Please pardon". Paumanhin is formal; Pasensya na (from Spanish paciencia "patience") is everyday casual. Both: "I beg your pardon, sorry".', 'word', 'Pasensya na pô, late ako.', '"Sorry, I\'m late" — typical student apology with pô.', null, [ACT.vocabularyActions]),

    createContentItem('may', 'MAY', 'EXISTENTIAL marker: "there is / there are / has / have". The most common way to express possession or existence. May libro ako = "I have a book / There is a book of mine". May tao = "there is someone".', 'sentence', 'May libro ako. May estudyante sa silid. May aso siya.', 'Three usages: possession (I have a book), existence in a place (there is a student in the room), possession by third person (he has a dog).', [
      { target: 'may + noun + actor (pronoun)', note: 'expresses possession: may libro ako = I have a book' },
      { target: 'may + noun + sa + place', note: 'expresses existence in a place' },
      { target: 'never inflects', note: 'may is a particle, not a verb — does not change for person/number/tense' },
    ], [ACT.grammarMayWala]),
    createContentItem('walâ', 'wa-LAH', 'NEGATIVE existential: "there is no / there is none / has no / have no". Always pronounced with final glottal stop. Walâ akong libro = "I don\'t have a book". Walang tao = "there is no one" (with linker -ng).', 'sentence', 'Walâ akong libro. Walang tao sa silid. Walang problema.', 'Three negative existential sentences. Note linker -ng attaches when walâ comes before another word.', [
      { target: 'walâ — final glottal stop', note: 'pronounced /waˈlaʔ/; the glottal is essential' },
      { target: 'walâ + linker -ng + noun', note: 'walang libro = "no book"' },
      { target: 'standard answer "no problem"', note: 'Walang problema = formulaic "no problem"' },
    ], [ACT.grammarMayWala]),
    createContentItem('May/Wala ba…?', 'MAY/wa-LAH ba', 'Form yes/no questions about existence by inserting ba after may or walâ: May libro ba kayo? "Do you have a book?". Answer: Oo, may libro ako / Walâ akong libro / Walâ pô.', 'sentence', 'May tanong ba kayo? — Walâ pô.', '"Do you have a question? — No, sir/ma\'am" — typical classroom check.', null, [ACT.grammarMayWala]),

    createContentItem('ito', 'i-TO', '"This (near me)". One of the three demonstratives. Use ito for objects within the speaker\'s personal space. Ito ang libro ko = "This is my book".', 'sentence', 'Ito ang lapis ko. / Ito ay maganda.', '"This is my pencil. / This is beautiful." — first sentence predicate-first, second with ay.', null, [ACT.grammarDemonstratives]),
    createContentItem('iyan', 'i-YAN', '"That (near you)". Distance is from LISTENER, not from speaker. Iyan ang libro mo = "That is your book" (the book is near the listener).', 'sentence', 'Iyan ba ang libro mo?', '"Is that your book?" — book near listener; speaker asks.', null, [ACT.grammarDemonstratives]),
    createContentItem('iyon / iyun', 'i-YON', '"That over there (far from both)". Used when the object is far from both speaker and listener. Often shortened to iyun or yun in fast speech.', 'sentence', 'Iyon ang silid-aralan namin.', '"That over there is our classroom" — pointing across a campus.', null, [ACT.grammarDemonstratives]),
    createContentItem('dito, diyan, doon (sa-case demonstratives)', 'DI-to, di-YAN, do-ON', 'The sa-case demonstratives: dito "here (near me)", diyan "there (near you)", doon "over there (far)". Used after location prepositions or as the location itself: Nasa dito ang libro = Dito ang libro "the book is here".', 'sentence', 'Dito ang silid-aralan. Doon ang opisina.', '"Here is the classroom. Over there is the office."', null, [ACT.grammarDemonstratives]),

    createContentItem('Pagbasa', 'pag-BA-sa', 'Read: Si Maria ay nasa silid-aralan. May libro siya, may kuwaderno, at may dalawang lapis. Wala siyang ruler. Nasa mesa niya ang lahat ng gamit. Nasa pisara ang nakasulat na takdang-aralin. Inaayos niya ang kanyang mesa habang naghihintay sa guro.', 'sentence', 'Maria is in the classroom. She has a book, a notebook, and two pencils. She does not have a ruler. All her materials are on her desk. The homework is written on the board. She is arranging her desk while waiting for the teacher.', 'Notes: nasa silid-aralan = "in the classroom"; may libro siya (possession); wala siyang ruler (negation with linker -ng); nasa mesa niya ang lahat (everything on her desk); naghihintay sa guro (waiting for the teacher).', [
      { target: 'nasa silid-aralan ay siya', note: 'nasa expresses "is at/in"' },
      { target: 'may dalawang lapis', note: 'dalawang = dalawa "two" + linker -ng' },
      { target: 'walang ruler', note: 'no ruler — walâ + linker' },
      { target: 'lahat ng gamit', note: 'lahat = "all"; ng = genitive marker; gamit = "materials/things"' },
    ], [ACT.reading]),
    createContentItem('Mga tanong', 'MA-nga ta-NONG', 'Comprehension questions: 1) Nasaan si Maria? 2) Ano ang mga gamit niya? 3) May ruler ba siya? 4) Saan ang takdang-aralin?', 'sentence', 'Sample answers: 1) Nasa silid-aralan si Maria. 2) May libro, kuwaderno, at dalawang lapis siya. 3) Walâ, walang ruler si Maria. 4) Nasa pisara ang takdang-aralin.', 'Use nasa + place / may + noun / walâ + linker patterns in your answers.', null, [ACT.reading]),

    createContentItem('Diyalogo', 'di-YA-lo-go', 'Dialogue: Estudyante 1: "Kuya, may pen ka ba?" / Estudyante 2: "Wala eh, pero meron akong lapis. Pakihiram?" / Estudyante 1: "Oo, salamat! Eto." / Ma\'am Reyes: "Buksan ninyo ang libro sa pahina 12 pô."', 'sentence', 'Student 1: "Bro, do you have a pen?" / Student 2: "I don\'t, but I have a pencil. Want to borrow?" / Student 1: "Yes, thanks! Here." / Ma\'am Reyes: "Open your books to page 12."', 'Peer register (no pô between classmates); teacher uses pô as a polite layer addressing the whole class.', [
      { target: 'kuya (peer kinship address)', note: 'classmate of perceived age uses kuya/ate' },
      { target: 'wala eh (casual "no")', note: 'eh = casual particle softening the negative' },
      { target: 'meron = may variant', note: 'meron = "there is" — emphatic variant of may used at end-position' },
      { target: 'pakihiram', note: 'polite "lend me"' },
    ], [ACT.listening]),

    createContentItem('Pagsulat', 'pag-SU-lat', 'Write 4-5 sentences describing your classroom. Required: at least one nasa, one may, one walâ, one demonstrative (ito/iyan/iyon), and the linker -ng/na.', 'sentence', 'Modelo: Nasa silid-aralan ako. May labindalawang mesa at silya. Ito ang mesa ko. Walang aircon, pero may bintana. Iyon ang pisara.', '"I am in the classroom. There are 12 desks and chairs. This is my desk. There is no AC, but there is a window. That over there is the board."', null, [ACT.writing]),

    createContentItem('Kulturang silid-aralan', 'kul-TU-rang si-LID-a-RA-lan', 'Philippine classroom culture is influenced by American education (the K-12 system was adopted in 2013, modeled on US K-12). Students stand to greet the teacher (Good morning, Ma\'am Reyes) and sit on cue. Teachers are addressed as Ma\'am + last name or Sir + last name. Pô is universal. Public school classrooms are often overcrowded (50+ students); private schools and UP campuses have smaller classes.', 'word', '"Good morning, Ma\'am Reyes po." / "Good morning, class. You may sit."', 'Daily classroom opening ritual — pô + Ma\'am-Sir + name is the default address.', [
      { target: 'Stand-and-greet ritual', note: 'standard at start of every class' },
      { target: 'Ma\'am/Sir + last name', note: 'preferred over Filipino "guro" in direct address' },
      { target: 'K-12 system since 2013', note: 'kindergarten + 6 years elementary + 4 years junior HS + 2 years senior HS' },
      { target: 'Mother tongue years (K-3)', note: 'in many schools, K-3 uses the local language (Cebuano, Ilocano, etc.) rather than Filipino' },
    ], [ACT.culture]),

    createContentItem('Gawain', 'ga-WA-in', 'Task: Roleplay the first day at UP Diliman. 5-6 turns. Required: greet teacher with pô, find your seat, ask a classmate (kuya/ate) for a pen, answer teacher\'s yes/no with opò/hindî pô, ask about page number.', 'sentence', 'Halimbawa flow: 1) "Magandang umaga pô, Ma\'am." 2) Sit. 3) "Kuya, may pen ka ba?" 4) "Salamat!" 5) Teacher: "Buksan ninyo ang libro sa pahina 12." 6) "Opò, Ma\'am."', '6 turns covering greeting → seating → borrow request → teacher instruction → respectful confirmation.', null, [ACT.task]),
  ],
};

module.exports = lesson;
