# Curriculum v2 — Batch 1 review sheet

_Generated from `backend/curriculum/lessons/*.js` — the source of truth is the JS files, this is a read-only view for the accuracy pass._

**How to use:** read the Korean in each row. Flag anything wrong: particle choice, conjugation, honorific/register level, spacing (띄어쓰기), or unnatural phrasing. The structural validator already passed, so this pass is purely about *correctness of the Korean*.

## Inventory

| Concept | Status | Level | Lessons |
|---|---|---|---|
| pattern.ability.can_cannot | scaffold | A1 / TOPIK 1 | 7 |
| pattern.condition.if | scaffold | A2 / TOPIK 2 | 7 |
| pattern.existence.iss_eobs | 🆕 new | A1 / TOPIK 1 | 7 |
| pattern.experience.have_you_ever | scaffold | A2 / TOPIK 2 | 7 |
| pattern.identification.be | 🆕 new | A1 / TOPIK 1 | 7 |
| pattern.intention.going_to | scaffold | A1 / TOPIK 1 | 7 |
| pattern.location.e | 🆕 new | A1 / TOPIK 1 | 7 |
| pattern.negation.an | 🆕 new | A1 / TOPIK 1 | 7 |
| pattern.negation.mot | 🆕 new | A1 / TOPIK 1 | 7 |
| pattern.preference.want_to | scaffold | A1 / TOPIK 1 | 7 |
| pattern.question.what | 🆕 new | A1 / TOPIK 1 | 7 |
| pattern.question.who | 🆕 new | A1 / TOPIK 1 | 7 |
| pattern.reason.because | scaffold | A2 / TOPIK 2 | 7 |
| pattern.subject.i_ga | 🆕 new | A1 / TOPIK 1 | 7 |
| pattern.topic.eun_neun | 🆕 new | A1 / TOPIK 1 | 7 |

**Total: 15 concepts × 7 lesson types = 105 lessons.** 🆕 = authored since the 6-pattern scaffold (this batch is the primary review target).

---

# 🆕 Newly authored (batch 1 — review these first)

## pattern.existence.iss_eobs  🆕

**Gloss:** Existence / possession — 있어요 / 없어요  ·  **Level:** A1 / TOPIK 1  ·  **File:** `lessons/pattern.existence.iss_eobs.js`

### ContrastNote — `contrast.existence.iss_eobs.ko-en`

- **L2 pattern:** Korean does both with ONE pair of verbs: 있다 (exist / have) and 없다 (not exist / not have). 책이 있어요 = "there is a book" / "I have a book". Context tells you which.
- **Explanation:** In Korean, possession is rephrased as existence: "money exists (to me)" → "I have money". The subject (what exists) takes 이/가. If you want to say WHO has it, add that person + 은/는 at the front: "저는 돈이 있어요" = "as for me, there is money" = "I have money". Negation flips 있다 ↔ 없다. There is no "don't" auxiliary added — they are two separate verbs. 있어요 / 없어요 are also the verb used to say WHERE something is, paired with 에: "책이 가방에 있어요" = "the book is in the bag".
- **Common mistakes (contain ✗/✓ Korean — check both):**
  - WRONG: "저는 책을 있어요" (using object marker 을 with 있다). RIGHT: "저는 책이 있어요". 있다 takes a SUBJECT (the thing that exists), not an OBJECT.
  - WRONG: "저는 책 있어요" (dropping the subject particle). RIGHT: "저는 책이 있어요". Beginners can sometimes drop particles in fast speech, but write/say it with 이/가 in lesson exercises.
  - WRONG: "책이 안 있어요" (negating 있다 with 안). RIGHT: "책이 없어요". 있다's negation is the separate verb 없다, not 안 + 있다.
  - WRONG: "물이 있다 카페에" (placing the location after the verb). RIGHT: "카페에 물이 있어요". Korean is verb-final: location goes BEFORE the verb.
  - WRONG: "시간있어요?" with no particle. RIGHT: "시간 있어요?" (no particle in fast colloquial use is okay) OR "시간이 있어요?" (full form). Either form is heard; don't pile both 이 and zero into one sentence.
- **Cultural note:** Asking "시간 있어요?" ("do you have time?") is the standard way Koreans propose meeting up. It's direct but polite. The answer is rarely a flat "no" — even when busy, native speakers soften: "지금은 좀 바빠요" ("As for now, I'm a bit busy"), using 은 for contrastive softening. Beginners who answer "없어요." flat sound abrupt.
  - _Example:_ A: 시간 있어요?  B: 네, 있어요. / 지금은 좀 바빠요.

### PatternLesson — `pattern.existence.iss_eobs.ko`

**Pattern template:** `{filler}이 / {filler}가 있어요 (없어요)` — There is {filler} / I have {filler} (negation: there is no {filler})

| Korean | Romanization | English | Gloss |
|---|---|---|---|
| 책이 있어요. | chaeg-i isseoyo. | There is a book. / I have a book. | 책+이(SUBJ) \| 있어요(exists) |
| 시간이 없어요. | shigan-i eopseoyo. | I don't have time. | 시간(time)+이 \| 없어요(does not exist) |
| 저는 친구가 있어요. | jeoneun chinguga isseoyo. | I have a friend. | 저+는(TOPIC, "as for me") \| 친구(friend)+가(SUBJ) \| 있어요 |
| 가방에 책이 있어요. | gabang-e chaeg-i isseoyo. | The book is in the bag. | 가방(bag)+에(LOC) \| 책+이 \| 있어요 |
| 집에 고양이가 없어요. | jib-e goyangiga eopseoyo. | There's no cat at home. | 집+에 \| 고양이(cat)+가 \| 없어요 |

**Drills:**
- _Say "I have {filler}." Use 저는 … 있어요._
  - Fillers: 책 (book) · 물 (water) · 돈 (money) · 핸드폰 (phone) · 가방 (bag)
- _Say "I don't have {filler}." Use 저는 … 없어요._
  - Fillers: 돈 (money) · 시간 (time) · 물 (water)
- _Say "There is water at {filler}." Use 물 + 에 location._
  - Fillers: 카페 (café) · 도서관 (library) · 공원 (park) · 집 (home / house)
- _Ask "Is {filler} at school?" — use 학교에 + subject marker + 있어요?_
  - Fillers: 친구 (friend) · 사라 (Sarah (name)) · 민호 (Minho (name))

**Production task:** I will ask you "X 있어요?" — "Do you have X?" or "Is there X at Y?". Answer with the noun + 이/가 + 있어요 or 없어요. If you need to add a place, put PLACE + 에 BEFORE the subject. If you need to specify "for me", start with 저는.

### ClozeLesson — `cloze.existence.iss_eobs.ko`

| Sentence (blank = ___) | Answer | English | Distractors |
|---|---|---|---|
| 저는 친구___ 있어요. | **가** | I have a friend. | 이, 을, 는 |
| 시간___ 없어요. | **이** | I don't have time. | 가, 을, 는 |
| 가방___ 책이 있어요. | **에** | There is a book in the bag. | 가, 에서, 을 |
| 돈이 ___. | **없어요** | I don't have money. | 있어요, 안 있어요, 못 있어요 |
| Q: 시간 있어요? A: 네, ___. | **있어요** | Q: Do you have time? A: Yes, I do. | 없어요, 돼요, 그래요 |

### StoryLesson — `story.existence.iss_eobs.coffee-shop.ko`

_dialogue: At the coffee shop_

| Speaker | Korean | Romanization | English |
|---|---|---|---|
| 직원 | 안녕하세요. 자리 있어요? | annyeong-haseyo. jari isseoyo? | Hello. Do you have a seat? (i.e., Do you have a reservation / a seat to sit at?) |
| 사라 | 아니요, 없어요. 자리 있어요? | aniyo, eopseoyo. jari isseoyo? | No, I don't. Are there seats available? |
| 직원 | 네, 창가에 자리가 있어요. | ne, changga-e jariga isseoyo. | Yes, there's a seat by the window. |
| 사라 | 좋아요. 메뉴 있어요? | joayo. menyu isseoyo? | Great. Do you have a menu? |
| 직원 | 여기 있어요. 시간 충분히 있어요. 천천히 보세요. | yeogi isseoyo. shigan chungbunhi isseoyo. cheoncheonhi boseyo. | Here you go. You have plenty of time. Take your time. |

**Comprehension Qs:** How does the staff ask whether Sarah has a seat? / Where in the café is the available seat? / How does the staff say "here you go" when handing over the menu? / Find the sentence where 있어요 means "there is plenty / you have plenty". What is the subject?

### VocabDeck — `vocab.existence.iss_eobs.daily-things.ko`

| Korean | English |
|---|---|
| 책 | book |
| 물 | water |
| 돈 | money |
| 핸드폰 | phone |
| 가방 | bag |
| 시간 | time |
| 차 | car |
| 개 | dog |
| 고양이 | cat |
| 친구 | friend |
| 카페 | café |
| 도서관 | library |
| 집 | home / house |

### PronunciationTask — `pronunciation.existence.iss_eobs.ko`

| Korean | Romanization | English | Focus sounds |
|---|---|---|---|
| 있어요 | isseoyo | (it) exists / I have | Tense ㅆ — hold the s a beat longer than in English /s/ — 있어요 links → /i-sseo-yo/, three crisp syllables |
| 없어요 | eopseoyo | (it) does not exist / I don't have | 없 has the two-letter batchim ㅄ — only ㅂ is voiced in the syllable, then ㅅ links to 어 — reads as /eop-seo-yo/ — sounds like "up-suh-yo" with rounded ㅓ |
| 가방에 책이 있어요 | gabang-e chaeg-i isseoyo | There is a book in the bag | 가방에: ㅇ batchim + 에 → smooth /ba-nge/ — 책이: ㄱ batchim + 이 → /chae-gi/ — whole sentence: keep a slight pause after 에, smooth after that |
| 시간이 없어요 | shigan-i eopseoyo | I don't have time | 시간이: ㄴ batchim + 이 → /shi-ga-ni/ — common chunk in conversation — practice it as a unit, not three separate words |

### MinimalPairTask — `minimal-pair.existence.iss_eobs.lax-tense.ko`

| A | B | Contrast |
|---|---|---|
| 있어요 | 이서요 | Tense ㅆ vs lax ㅅ. Only 있어요 is a real word. The second tests whether you hear the gemination — the held quality of the tense sibilant. |
| 있어요 | 없어요 | Existence vs non-existence — the most important verb-pair contrast in beginner Korean. Listen for /i/ vs /eo/ in the first vowel. |
| 책이 있어요 | 책이 없어요 | Same sentence frame, opposite meaning. Learners who lose the first vowel of the final verb miss the entire claim. |

---

## pattern.identification.be  🆕

**Gloss:** I am X / This is X — copula 이에요 / 예요  ·  **Level:** A1 / TOPIK 1  ·  **File:** `lessons/pattern.identification.be.js`

### ContrastNote — `contrast.identification.be.ko-en`

- **L2 pattern:** Korean: "저는 학생이에요" — the copula attaches to the noun. No separate "be" verb floating between them.
- **Explanation:** English uses a free-standing "be" verb that agrees with the subject (I am, you are, she is). Korean attaches the copula directly to the noun as a suffix: 학생이에요. There is one rule that decides which form: does the noun end in a CONSONANT (a batchim) or a VOWEL? Consonant → -이에요. Vowel → -예요. In conversation the subject is often dropped — "학생이에요" alone can mean "I am a student" or "She is a student" or "It is a student" depending on context. You add 저는 ("as for me") when you need to specify yourself.
- **Common mistakes (contain ✗/✓ Korean — check both):**
  - WRONG: "저는 학생예요" (using -예요 after the consonant ending 학생). RIGHT: "저는 학생이에요". The noun 학생 ends in ㅇ (a batchim), so it takes -이에요.
  - WRONG: "저는 사라이에요" (using -이에요 after the vowel ending 사라). RIGHT: "저는 사라예요". 사라 ends in ㅏ (a vowel), so it takes -예요.
  - WRONG: "저 학생이에요" (dropping the topic marker entirely). RIGHT: "저는 학생이에요". When you introduce yourself, the marker 는 attaches to 저 ("I/me", humble form).
  - WRONG: "I am 학생이에요" / "저는 am 학생". RIGHT: "저는 학생이에요". Resist the urge to add an English-style "am". The wanting/being is built into 이에요.
- **Cultural note:** In Korean introductions, your role often comes before your name: "회사원이에요. 사라예요." ("I am an office worker. I am Sarah.") This reflects how identity in Korean conversations often anchors on what you do or where you belong before personal details.
  - _Example:_ "안녕하세요. 회사원이에요. 사라예요." — "Hello. I am an office worker. I am Sarah."

### PatternLesson — `pattern.identification.be.ko`

**Pattern template:** `{filler}이에요 / {filler}예요` — (I/it/this) am/is {filler}

| Korean | Romanization | English | Gloss |
|---|---|---|---|
| 저는 학생이에요. | jeoneun haksaeng-ieyo. | I am a student. | 저(I, humble)+는(TOPIC) \| 학생(student)+이에요(am, consonant ending) |
| 저는 사라예요. | jeoneun sara-yeyo. | I am Sarah. | 저+는 \| 사라(Sarah)+예요(am, vowel ending) |
| 이건 책이에요. | igeon chaeg-ieyo. | This is a book. | 이건(this, contracted from 이것은) \| 책(book)+이에요 |
| 저는 한국 사람이에요. | jeoneun hanguk saram-ieyo. | I am Korean / a Korean person. | 한국(Korea) \| 사람(person)+이에요 |

**Drills:**
- _Say "I am a {filler}."_
  - Fillers: 학생 (student) · 선생님 (teacher) · 의사 (doctor) · 친구 (friend)
- _Say "I am {filler}." (Watch the batchim rule: 사라 ends in a vowel, 민호 ends in a vowel — both take 예요.)_
  - Fillers: 사라 (Sarah (name)) · 민호 (Minho (name))
- _Point at the item and say "This is {filler}." Use 이건._
  - Fillers: 책 (book) · 핸드폰 (phone) · 가방 (bag) · 물 (water)
- _Point at the building and say "This is {filler}." Use 이건._
  - Fillers: 학교 (school) · 카페 (café) · 도서관 (library) · 식당 (restaurant)

**Production task:** I will say a noun in English (a person or a thing). Reply in Korean polite form: "저는 X이에요/예요" for a person ("I am X") or "이건 X이에요/예요" for a thing ("This is X"). Pick the right -이에요/-예요 based on whether the noun ends in a consonant or a vowel.

### ClozeLesson — `cloze.identification.be.ko`

| Sentence (blank = ___) | Answer | English | Distractors |
|---|---|---|---|
| 저는 학생___. | **이에요** | I am a student. | 예요, 에요, 이요 |
| 저는 사라___. | **예요** | I am Sarah. | 이에요, 에요, 이예요 |
| 이건 책___. | **이에요** | This is a book. | 예요, 에요, 이요 |
| 저___ 한국 사람이에요. | **는** | I am Korean. | 은, 이, 가 |
| 이건 ___예요. | **카페** | This is a café. | 카페가, 카페는, 카페이에요 |

### StoryLesson — `story.identification.be.first-meeting.ko`

_dialogue: First meeting_

| Speaker | Korean | Romanization | English |
|---|---|---|---|
| 민호 | 안녕하세요. 저는 민호예요. | annyeong-haseyo. jeoneun minho-yeyo. | Hello. I am Minho. |
| 사라 | 안녕하세요. 저는 사라예요. 만나서 반가워요. | annyeong-haseyo. jeoneun sara-yeyo. mannaseo bangawoyo. | Hello. I am Sarah. Nice to meet you. |
| 민호 | 사라 씨, 학생이에요? | sara-ssi, haksaeng-ieyo? | Sarah, are you a student? |
| 사라 | 네, 학생이에요. 민호 씨도 학생이에요? | ne, haksaeng-ieyo. minho-ssi-do haksaeng-ieyo? | Yes, I am a student. Are you also a student, Minho? |
| 민호 | 아니요, 저는 회사원이에요. | aniyo, jeoneun hoesa-won-ieyo. | No, I am an office worker. |

**Comprehension Qs:** What does Sarah say her job is? / What does Minho say his job is? / Which suffix (-이에요 or -예요) attaches to 회사원? Why?

### VocabDeck — `vocab.identification.be.people-and-things.ko`

| Korean | English |
|---|---|
| 학생 | student |
| 선생님 | teacher |
| 의사 | doctor |
| 친구 | friend |
| 한국 사람 | Korean person |
| 미국 사람 | American person |
| 책 | book |
| 핸드폰 | phone |
| 가방 | bag |
| 물 | water |
| 사라 | Sarah (name) |
| 민호 | Minho (name) |

### PronunciationTask — `pronunciation.identification.be.ko`

| Korean | Romanization | English | Focus sounds |
|---|---|---|---|
| 학생이에요 | haksaeng-ieyo | am / is a student | 학생: the ㄱ batchim before ㅅ — keep the ㄱ as a quick stop, do NOT release it as "k" — 생이에요: ㅇ batchim + 이 — the link sounds like /saeng-ieyo/, smooth, no break |
| 사라예요 | sara-yeyo | am Sarah | 예요: a single syllable /ye-yo/, light and short — not "yay-yo" |
| 한국 사람이에요 | hanguk saram-ieyo | am Korean | 한국: ㄴ batchim → /han/; ㄱ batchim → light /guk/, no aspiration — 사람이에요: link 람 + 이 → /sa-ra-mi-e-yo/, the ㅁ batchim flows into 이 |
| 아니요, 회사원이에요 | aniyo, hoesa-won-ieyo | no, I am an office worker | 회사원: ㅚ pronounced like /we/ in modern Seoul Korean — 원이에요: link 원 + 이 → /wo-ni-e-yo/, smooth |

### MinimalPairTask — `minimal-pair.identification.be.copula.ko`

| A | B | Contrast |
|---|---|---|
| 학생이에요 | 학생예요 | Correct vs incorrect copula attachment. 학생 ends in a consonant, so only 이에요 is valid; 예요 is what a beginner who skipped the batchim rule produces. |
| 사라예요 | 사라이에요 | Same lesson in reverse. 사라 ends in a vowel; 예요 is correct, 이에요 is the common over-application error. |
| 학생이에요 | 학생이세요 | Plain copula (-이에요) vs honorific copula (-이세요). Use 이에요 for yourself; 이세요 elevates the subject ("You/elder ARE a student"). |

---

## pattern.location.e  🆕

**Gloss:** Location / destination particle 에 — at / to a place  ·  **Level:** A1 / TOPIK 1  ·  **File:** `lessons/pattern.location.e.js`

### ContrastNote — `contrast.location.e.ko-en`

- **L2 pattern:** Korean uses ONE particle — 에 — for both "at" and "to", attached AFTER the noun: 학교에. The verb tells you whether you're sitting or moving.
- **Explanation:** Attach 에 to any place or time noun. The verb decides the meaning: 학교에 있어요 = "I AM at school" (static, 있다 = exist), 학교에 가요 = "I GO to school" (movement, 가다 = go). No batchim rule applies to 에 — it's the same after every noun. Caution: 에 is for EXISTENCE-AT and MOVEMENT-TO. For the place where you actively DO something ("I study AT a café"), Korean uses a different particle 에서. Beginners overuse 에 — when in doubt, ask yourself: is this static location, or is action happening here? If action, you'll later switch to 에서.
- **Common mistakes (contain ✗/✓ Korean — check both):**
  - WRONG: "학교에서 가요" (using -에서 for destination). RIGHT: "학교에 가요". -에서 means "from" or "the place where an action happens", not "to".
  - WRONG: "학교에서 있어요" (using -에서 for static location). RIGHT: "학교에 있어요". 있다/없다 take -에, never -에서.
  - WRONG: "월요일에서 가요". RIGHT: "월요일에 가요" — time uses 에, same as location.
  - WRONG: "집에 가요" said when you are leaving from home. RIGHT: "집에 가요" only means "I go (TO) home". To say "I come FROM home", you need 집에서 (with movement verbs other than 가다, 오다).
- **Cultural note:** Native speakers often drop "에" in fast colloquial speech: "어디 가요?" instead of "어디에 가요?" ("Where are you going?"). In writing and careful speech, keep it in. For the learner, leave it in until you have heard hundreds of dropped examples — overusing the dropped form sounds sloppy from a non-native.

### PatternLesson — `pattern.location.e.ko`

**Pattern template:** `{filler}에 …` — at / to {filler}

| Korean | Romanization | English | Gloss |
|---|---|---|---|
| 학교에 가요. | hakgyo-e gayo. | I go to school. | 학교(school)+에(LOC) \| 가요(go) |
| 집에 있어요. | jib-e isseoyo. | I am at home. | 집(home)+에 \| 있어요(exist / am present) |
| 카페에 가요. | kape-e gayo. | I go to the café. | 카페(café)+에 \| 가요 |
| 도서관에 책이 있어요. | doseogwan-e chaeg-i isseoyo. | There is a book in the library. | 도서관(library)+에 \| 책(book)+이(SUBJ) \| 있어요 |

**Drills:**
- _Say "I go to {filler}." Use 가요._
  - Fillers: 학교 (school) · 집 (home / house) · 회사 (company / office) · 카페 (café)
- _Say "I am at {filler}." Use 있어요._
  - Fillers: 도서관 (library) · 식당 (restaurant) · 공원 (park) · 시장 (market)
- _Say "There is a book at {filler}." Use 책이 + 있어요._
  - Fillers: 학교 (school) · 카페 (café) · 도서관 (library)
- _Say "On {filler}, I go to school." Pattern: {filler}에 학교에 가요._
  - Fillers: 오늘 (today) · 내일 (tomorrow) · 주말 (weekend) · 아침 (morning)
- _Say "The {filler} is in the bag." Pattern: {filler}이/가 가방에 있어요._
  - Fillers: 책 (book) · 핸드폰 (phone) · 물 (water)

**Production task:** I will give you a place in English plus an action (go / be / there is a book). Produce the Korean sentence: PLACE + 에 + verb. Remember: 에 never changes for batchim, and 있다/가다/오다 all take 에 (never 에서 — yet).

### ClozeLesson — `cloze.location.e.ko`

| Sentence (blank = ___) | Answer | English | Distractors |
|---|---|---|---|
| 학교___ 가요. | **에** | I go to school. | 에서, 는, 가 |
| 집___ 있어요. | **에** | I am at home. | 에서, 는, 을 |
| 카페에 ___. | **가요** | I go to the café. | 가서, 갔어요, 간다 |
| 도서관에 책___ 있어요. | **이** | There is a book in the library. | 가, 에, 은 |
| 7시___ 만나요. | **에** | Let's meet at 7 o'clock. | 에서, 에는, 가 |

### StoryLesson — `story.location.e.where-are-you.ko`

_dialogue: Where are you?_

| Speaker | Korean | Romanization | English |
|---|---|---|---|
| 민호 | 사라 씨, 지금 어디에 있어요? | sara-ssi, jigeum eodi-e isseoyo? | Sarah, where are you right now? |
| 사라 | 카페에 있어요. 친구가 와요. | kape-e isseoyo. chinguga wayo. | I'm at the café. My friend is coming. |
| 민호 | 저도 카페에 가요. 어느 카페예요? | jeo-do kape-e gayo. eoneu kape-yeyo? | I'm going to a café too. Which café is it? |
| 사라 | 학교 옆에 있어요. 도서관 근처예요. | hakgyo yeop-e isseoyo. doseogwan geuncheo-yeyo. | It's next to the school. Near the library. |
| 민호 | 알았어요. 곧 가요! | arasseoyo. got gayo! | Got it. I'll be there soon! |

**Comprehension Qs:** Where is Sarah? / Where is the café? / Why does Minho use 카페에 가요 and Sarah use 카페에 있어요? What's the difference in meaning of 에 here?

### VocabDeck — `vocab.location.e.places.ko`

| Korean | English |
|---|---|
| 학교 | school |
| 집 | home / house |
| 회사 | company / office |
| 카페 | café |
| 도서관 | library |
| 식당 | restaurant |
| 공원 | park |
| 시장 | market |
| 제주도 | Jeju (island) |
| 부산 | Busan |
| 서울 | Seoul |

### PronunciationTask — `pronunciation.location.e.ko`

| Korean | Romanization | English | Focus sounds |
|---|---|---|---|
| 학교에 가요 | hakgyo-e gayo | I go to school | 학교에: ㄱ batchim before another ㄱ → tense /haek-kkyo/, then /e/ — 가요: soft /ga-yo/, not /ka-yo/ |
| 집에 있어요 | jib-e isseoyo | I am at home | 집에: ㅂ batchim links into 에 → /ji-be/, NOT "jip-e" — 있어요: tense ㅆ, smooth /i-sseo-yo/ |
| 도서관에 책이 있어요 | doseogwan-e chaeg-i isseoyo | There is a book in the library | 도서관에: ㄴ batchim + 에 → /gwa-ne/, smooth — 책이: ㄱ batchim + 이 → /chae-gi/ |

### MinimalPairTask — `minimal-pair.location.e.vs-eseo.ko`

| A | B | Contrast |
|---|---|---|
| 학교에 있어요 | 학교에서 있어요 | Static location: only 에 works with 있다. -에서 is ungrammatical here. |
| 학교에 가요 | 학교에서 가요 | Destination: 에 = "TO school". 에서 = "FROM school". Both grammatical, opposite meaning. |
| 집에 | 지베 | Pronunciation only — 집에 is read as /ji-be/ because of batchim linking. The romanization 지베 captures the actual sound; the spelling 집에 preserves the morphemes. |

---

## pattern.negation.an  🆕

**Gloss:** Short negation — 안 + V/A  ·  **Level:** A1 / TOPIK 1  ·  **File:** `lessons/pattern.negation.an.js`

### ContrastNote — `contrast.negation.an.ko-en`

- **L2 pattern:** Korean drops a single word 안 in front of the verb: "저는 안 먹어요", "사라는 안 와요". No auxiliary.
- **Explanation:** Place 안 right before the verb or adjective. Order matters: 안 hugs the verb. Subject + object + 안 + verb. Two important wrinkles: (1) Compound verbs built on 하다 — like 공부하다 (to study), 운동하다 (to exercise) — SPLIT for negation. Put 안 between the noun part and 하다: "공부 안 해요", not "안 공부해요". (2) The existence verb 있다 has its own negative form: 없다. Say "물이 없어요", never "물이 안 있어요" (the latter is ungrammatical).
- **Common mistakes (contain ✗/✓ Korean — check both):**
  - WRONG: "안 공부해요" (treating 공부하다 as a single unit). RIGHT: "공부 안 해요" — split the 하다 compound.
  - WRONG: "물이 안 있어요" (using 안 with 있다). RIGHT: "물이 없어요" — 있다 has its own negative 없다.
  - WRONG: "저는 먹어요 안" (placing 안 after the verb). RIGHT: "저는 안 먹어요" — 안 always comes BEFORE the verb.
  - WRONG: "저는 안 학생이에요" (using 안 with the copula). RIGHT: "저는 학생이 아니에요" — the copula 이에요/예요 has a separate negative form 아니에요. Don't use 안 with it.
- **Cultural note:** A flat "안 가요" ("I'm not going") can sound abrupt in Korean — like a curt refusal. In real conversation, soften with a connector: "오늘은 안 가요" ("I'm not going TODAY", using 은 for contrast) or add a reason ("좀 바빠서 안 가요" — "I'm a bit busy so I'm not going"). Beginners who just say "안 가요" can come across as cold.
  - _Example:_ A: 같이 갈래요?  B (abrupt): 안 가요.  B (softer): 오늘은 좀 바빠서요.

### PatternLesson — `pattern.negation.an.ko`

**Pattern template:** `… 안 {verb}요` — I/you/we don't {verb}

| Korean | Romanization | English | Gloss |
|---|---|---|---|
| 저는 안 가요. | jeoneun an gayo. | I don't go. | 저는(TOPIC) \| 안(NEG) + 가요(go) |
| 오늘은 안 먹어요. | oneur-eun an meogeoyo. | Today I'm not eating. | 오늘(today)+은(TOPIC, contrast) \| 안 + 먹어요 |
| 저는 공부 안 해요. | jeoneun gongbu an haeyo. | I don't study. | 저는 \| 공부(study) + 안 + 해요 — split 하다 compound |
| 사라는 안 와요. | sara-neun an wayo. | Sarah isn't coming. | 사라(Sarah)+는 \| 안 + 와요(comes) |

**Drills:**
- _Say "I don't {filler}." Pattern: 저는 안 + the polite -요 form of {filler}. Use the regular (non-compound) form._
  - Fillers: 먹다 (to eat) · 마시다 (to drink) · 가다 (to go) · 보다 (to see / watch) · 자다 (to sleep)
- _Say "I don't {filler}." These are 하다 compound verbs — split the 안: NOUN + 안 + 해요._
  - Fillers: 공부하다 (to study) · 일하다 (to work) · 운동하다 (to exercise) · 여행하다 (to travel)
- _Say "On {filler}, I don't go." Pattern: {filler}에는 안 가요. Note the topic 은 for contrastive flavor._
  - Fillers: 오늘 (today) · 내일 (tomorrow) · 주말 (weekend) · 아침 (morning)
- _Say "I don't eat {filler}." Pattern: 저는 {filler}을/를 안 먹어요. Pick the object marker by batchim._
  - Fillers: 김치 (kimchi) · 비빔밥 (bibimbap) · 떡볶이 (tteokbokki)

**Production task:** I will give you a verb (or a noun + 하다 verb) in English plus an optional time. Produce a negative sentence in polite -요 form. Remember: 안 hugs the verb; 하다 compounds split; 있다 → 없다, never 안 있다.

### ClozeLesson — `cloze.negation.an.ko`

| Sentence (blank = ___) | Answer | English | Distractors |
|---|---|---|---|
| 저는 ___ 가요. | **안** | I don't go. | 못, 아니, 없 |
| 저는 공부 ___ 해요. | **안** | I don't study. | 못, 안 해, 아니 |
| 물이 ___. | **없어요** | There is no water. | 안 있어요, 못 있어요, 아니예요 |
| 저는 학생이 ___. | **아니에요** | I am not a student. | 안 이에요, 없어요, 안 학생이에요 |
| 오늘은 ___ 운동해요. | **운동 안** | I'm not exercising today. | 안 운동, 안, 못 운동 |

### StoryLesson — `story.negation.an.busy-day.ko`

_dialogue: Busy day_

| Speaker | Korean | Romanization | English |
|---|---|---|---|
| 민호 | 오늘 카페에 가요? | oneul kape-e gayo? | Are you going to the café today? |
| 사라 | 아니요, 안 가요. 좀 바빠요. | aniyo, an gayo. jom bappayo. | No, I'm not going. I'm a bit busy. |
| 민호 | 내일은요? 운동해요? | naeireun-yo? undong-haeyo? | How about tomorrow? Are you exercising? |
| 사라 | 내일도 운동 안 해요. 친구가 와요. | naeil-do undong an haeyo. chinguga wayo. | I'm not exercising tomorrow either. A friend is coming. |
| 민호 | 아, 시간이 없어요? | a, shigan-i eopseoyo? | Ah, you have no time? |
| 사라 | 네, 이번 주는 시간이 없어요! | ne, ibeon ju-neun shigan-i eopseoyo! | Yeah, this week I have no time! |

**Comprehension Qs:** Why does Sarah split "운동 안 해요" instead of saying "안 운동해요"? / When Minho asks if Sarah has no time, why does Sarah say "시간이 없어요" instead of "시간이 안 있어요"? / Translate "I don't go to the café today."

### VocabDeck — `vocab.negation.an.actions.ko`

| Korean | English |
|---|---|
| 먹다 | to eat |
| 마시다 | to drink |
| 가다 | to go |
| 보다 | to see / watch |
| 자다 | to sleep |
| 공부하다 | to study |
| 일하다 | to work |
| 운동하다 | to exercise |
| 여행하다 | to travel |
| 오늘 | today |
| 내일 | tomorrow |
| 주말 | weekend |

### PronunciationTask — `pronunciation.negation.an.ko`

| Korean | Romanization | English | Focus sounds |
|---|---|---|---|
| 안 가요 | an gayo | don't go | 안: short /an/, ㄴ batchim is clipped — do NOT blend into 가 — 가요: light /ga-yo/ |
| 안 먹어요 | an meogeoyo | don't eat | 안 먹: ㄴ batchim links into ㅁ → /an-meo/, slight nasal blend — 먹어요: ㄱ batchim of 먹 links into 어 → /meo-geo-yo/ |
| 공부 안 해요 | gongbu an haeyo | don't study | 공부: smooth /gong-bu/, both syllables light — pause before 안 — slight separation when splitting a 하다 compound — 해요: ㅎ is light, almost /ae-yo/ in fast speech |

### MinimalPairTask — `minimal-pair.negation.an.placement.ko`

| A | B | Contrast |
|---|---|---|
| 안 가요 | 못 가요 | Won't go (choice / habit) vs can't go (impossibility / external block). Both grammatical, different meaning. |
| 공부 안 해요 | 안 공부해요 | Correct split vs wrong placement. 공부하다 must split for negation — the second form is what beginners produce by analogy with English. |
| 없어요 | 안 있어요 | 있다's real negative form vs the ungrammatical analogy. Only 없어요 is correct. |

---

## pattern.negation.mot  🆕

**Gloss:** Impossibility — 못 + V ("cannot do")  ·  **Level:** A1 / TOPIK 1  ·  **File:** `lessons/pattern.negation.mot.js`

### ContrastNote — `contrast.negation.mot.ko-en`

- **L2 pattern:** Korean uses two SHORT particles with parallel placement: 안 (don't / won't) vs 못 (can't). Both sit right before the verb.
- **Explanation:** 못 means an external block stops you from doing the verb. Use it when (a) you lack the skill ("저는 수영 못 해요" — "I can't swim"), (b) something prevents you ("바빠서 못 가요" — "I can't go because I'm busy"), (c) you're not allowed ("미성년자는 술을 못 마셔요" — "minors can't drink alcohol"). 안 means you choose not to OR it's a habit. Same placement rules as 안: 못 hugs the verb, 하다 compounds split (운동 못 해요). There's also a long form V-지 못하다 ("운동하지 못해요") that's more formal/written — you'll meet it at A2.
- **Common mistakes (contain ✗/✓ Korean — check both):**
  - WRONG: "저는 안 수영해요" when you mean you don't know how. RIGHT: "저는 수영 못 해요" — inability calls for 못, not 안. (Plus split: 수영하다 → 수영 + 못 + 해요.)
  - WRONG: "못 안 가요" or "안 못 가요" (stacking). RIGHT: pick one — they're alternatives, not modifiers.
  - WRONG: "저는 안 있어요" (using 안 with 있다). 못 도 안 됨. RIGHT: "저는 없어요" — 있다's negation is always 없다, never 안 / 못.
  - WRONG: Reaching for 못 every time something fails in English. RIGHT: "I didn't do it (forgot)" is "안 했어요" (I didn't do it / I didn't bother); "I couldn't do it (was prevented)" is "못 했어요".
- **Cultural note:** Saying "오늘은 못 가요" ("I can't go today, sorry") is a more polite, face-saving way to decline than "안 가요". 못 implies "circumstances prevent me", which the listener can't reasonably push back on; 안 sounds more like a personal choice and invites "why?". Beginners who default to 안 can come across as standoffish; defaulting to 못 with a soft tone is the safer social move.
  - _Example:_ Invitation: 같이 갈래요?  Polite decline: 죄송해요, 오늘은 못 가요. (vs the abrupt 안 가요.)

### PatternLesson — `pattern.negation.mot.ko`

**Pattern template:** `… 못 {verb}요` — I/you/we can't {verb}

| Korean | Romanization | English | Gloss |
|---|---|---|---|
| 저는 수영 못 해요. | jeoneun suyeong mot haeyo. | I can't swim. | 저는 \| 수영(swimming) + 못 + 해요 — split 하다 compound, inability |
| 오늘은 못 가요. | oneur-eun mot gayo. | I can't go today. | 오늘+은(TOPIC) \| 못(impossibility) + 가요 |
| 한국어를 잘 못 해요. | hangug-eo-reul jal mot haeyo. | I can't do Korean well. (= My Korean isn't good.) | 한국어(Korean)+를(OBJ) \| 잘(well) \| 못 + 해요 — common self-deprecating phrase |
| 돈이 없어서 못 사요. | don-i eopseoseo mot sayo. | I can't buy it because I have no money. | 돈이 없어서(because no money) \| 못 + 사요(buy) |

**Drills:**
- _Say "I can't {filler}." Most of these are 하다 compounds — split for 못: NOUN + 못 + 해요._
  - Fillers: 수영하다 (to swim) · 요리하다 (to cook) · 운전하다 (to drive) · 노래하다 (to sing)
- _Say "I can't {filler} today." Pattern: 오늘은 못 + verb-요._
  - Fillers: 가다 (to go) · 오다 (to come) · 보다 (to see / watch) · 읽다 (to read) · 먹다 (to eat)
- _Say "I can't go to {filler}." Pattern: {filler}에 못 가요._
  - Fillers: 학교 (school) · 카페 (café) · 도서관 (library) · 공원 (park)
- _Say "I can't eat {filler}." Pattern: 저는 {filler}을/를 못 먹어요. (Useful for allergies or spice tolerance.)_
  - Fillers: 김치 (kimchi) · 비빔밥 (bibimbap) · 떡볶이 (tteokbokki)

**Production task:** I will name a skill you don't have, a place you can't reach today, or a thing you can't do. Respond in polite -요 form using 못. Use 안 ONLY if the meaning is "I choose not to" — otherwise default to 못.

### ClozeLesson — `cloze.negation.mot.ko`

| Sentence (blank = ___) | Answer | English | Distractors |
|---|---|---|---|
| 저는 수영 ___ 해요. | **못** | I can't swim. | 안, 아니, 없 |
| 오늘은 ___ 가요. 좀 바빠요. | **못** | I can't go today. I'm a bit busy. | 안, 아니, 없어요 |
| 돈이 없어서 ___ 사요. | **못** | I can't buy it because I have no money. | 안, 아니, 없 |
| 저는 운동 ___ 해요. 시간이 없어요. | **못** | I can't exercise. I don't have time. | 안, 못 해, 못 안 |
| 저는 김치를 ___ 먹어요. 안 좋아해요. | **안** | I don't eat kimchi. I don't like it. | 못, 못 해, 없어요 |

### StoryLesson — `story.negation.mot.cant-make-it.ko`

_dialogue: Can't make it_

| Speaker | Korean | Romanization | English |
|---|---|---|---|
| 민호 | 주말에 시간 있어요? 같이 영화 봐요. | jumar-e shigan isseoyo? gachi yeonghwa bwayo. | Do you have time on the weekend? Let's watch a movie together. |
| 사라 | 아, 죄송해요. 주말에는 못 가요. | a, joesong-haeyo. jumar-e-neun mot gayo. | Oh, I'm sorry. I can't go on the weekend. |
| 민호 | 왜요? 일해요? | wae-yo? ir-haeyo? | Why? Are you working? |
| 사라 | 네, 토요일은 일해요. 그리고 일요일에 친구가 와요. | ne, toyoir-eun ir-haeyo. geurigo iryoir-e chinguga wayo. | Yes, Saturday I work. And on Sunday a friend is coming. |
| 민호 | 아 그래요? 그럼 다음 주는 어때요? | a geuraeyo? geureom daeum ju-neun eottaeyo? | Oh, is that so? Then how about next week? |
| 사라 | 네! 다음 주에는 시간 있어요! | ne! daeum ju-e-neun shigan isseoyo! | Yes! Next week I have time! |

**Comprehension Qs:** Why does Sarah say "못 가요" instead of "안 가요"? / What two things prevent Sarah from going? / When does Sarah say she'll be free? / Translate "I can't come on Saturday."

### VocabDeck — `vocab.negation.mot.inability.ko`

| Korean | English |
|---|---|
| 수영하다 | to swim |
| 요리하다 | to cook |
| 운전하다 | to drive |
| 노래하다 | to sing |
| 가다 | to go |
| 오다 | to come |
| 보다 | to see / watch |
| 읽다 | to read |
| 먹다 | to eat |
| 학교 | school |
| 카페 | café |
| 도서관 | library |

### PronunciationTask — `pronunciation.negation.mot.ko`

| Korean | Romanization | English | Focus sounds |
|---|---|---|---|
| 못 가요 | mot gayo | can't go | 못: the final ㅅ is pronounced as a held ㄷ (no release) → /mot̚/ — before a soft consonant (ㄱ in 가), the held ㄷ becomes a tense /tk/ blend → sounds almost like /mot-kka-yo/ |
| 못 먹어요 | mot meogeoyo | can't eat | 못 먹: ㅅ batchim assimilates with following ㅁ → /mon-meo/, NOT /mot-meo/ — this assimilation is automatic — listen for it in fast speech |
| 수영 못 해요 | suyeong mot haeyo | can't swim | 수영: smooth /su-yeong/, ㅇ batchim is the nasal /ng/ — 못 해요: ㅅ batchim + ㅎ → tense /t-h/ → reads as /mo-tae-yo/ in fast speech |
| 한국어를 잘 못 해요 | hangugeo-reul jal mot haeyo | I can't do Korean well | a common chunk — practice as one unit — 잘 못 해요: smooth flow, slight pause is fine after 잘 |

### MinimalPairTask — `minimal-pair.negation.mot.an-vs-mot.ko`

| A | B | Contrast |
|---|---|---|
| 안 가요 | 못 가요 | Choice (won't / don't) vs inability (can't). Same grammar, different meaning. The most important A1 negation distinction. |
| 못 해요 | 안 해요 | "Can't do it" vs "don't do it / won't do it". Same lesson at the verb level. |
| 수영 못 해요 | 수영 안 해요 | "I can't swim (don't know how)" vs "I don't swim (choice / habit)". Choose by intent. |

---

## pattern.question.what  🆕

**Gloss:** Asking "what?" — 뭐 / 무엇  ·  **Level:** A1 / TOPIK 1  ·  **File:** `lessons/pattern.question.what.js`

### ContrastNote — `contrast.question.what.ko-en`

- **L2 pattern:** Korean: 뭐 / 무엇 sits where the answer would go — "이건 뭐예요?" / "뭐 먹어요?"
- **Explanation:** Korean question words occupy the SAME position the answer would. "What is this?" is literally "this thing is WHAT?" — 이건 뭐예요? You don't flip the sentence; you swap the unknown for 뭐. 뭐 is the spoken form everyone uses in conversation. 무엇 is the careful, formal cousin you'll see in writing, news headlines, and survey questions. Both work the same way grammatically. Add the question intonation by raising the pitch on the last syllable; no question mark particle is needed.
- **Common mistakes (contain ✗/✓ Korean — check both):**
  - WRONG: "뭐 이건이에요?" (fronting 뭐 like English "what"). RIGHT: "이건 뭐예요?" — leave the order alone; just swap the unknown for 뭐.
  - WRONG: "뭐 가요?" without context (ambiguous between subject and object). RIGHT: depending on what you mean — "뭐 먹어요?" ("what do you eat?", 뭐 is object) or "뭐가 있어요?" ("what is there?", 뭐가 is subject).
  - WRONG: Using 무엇 in casual conversation ("무엇 먹어요?"). RIGHT: "뭐 먹어요?" — 무엇 sounds stiff and bookish among friends; use 뭐.
  - WRONG: "이건 뭐이에요?" (adding the consonant copula -이에요 after the vowel-final 뭐). RIGHT: "이건 뭐예요?" — 뭐 ends in a vowel, so the copula is -예요.
- **Cultural note:** Don't worry about choosing between 뭐 and 무엇 as a beginner — 뭐 is correct in 95% of A1 situations. You'll meet 무엇 in printed quizzes, restaurant signs ("오늘의 메뉴: 무엇을 드시겠어요?"), and formal interviews. Listening for 무엇 is more important than speaking it.
  - _Example:_ "뭐예요?" (everyday, between friends) vs "무엇입니까?" (formal: news anchor, written survey).

### PatternLesson — `pattern.question.what.ko`

**Pattern template:** `… 뭐 / 뭐가 / 뭐를 …요?` — What is / what does / what …?

| Korean | Romanization | English | Gloss |
|---|---|---|---|
| 이건 뭐예요? | igeon mwo-yeyo? | What is this? | 이건(this, contracted from 이것은) \| 뭐(what)+예요(is, vowel-ending copula) |
| 뭐 먹어요? | mwo meogeoyo? | What are you eating? / What do you eat? | 뭐(what, object) \| 먹어요(eat) — particle 를 dropped in casual speech |
| 뭐가 있어요? | mwoga isseoyo? | What is there? | 뭐(what)+가(SUBJ) \| 있어요(exists) |
| 이름이 뭐예요? | ireum-i mwo-yeyo? | What is your name? | 이름(name)+이(SUBJ) \| 뭐예요(is what) |

**Drills:**
- _Point at a {filler} and ask "What is this?" Answer with "이건 {filler}이에요/예요."_
  - Fillers: 책 (book) · 물 (water) · 가방 (bag) · 핸드폰 (phone)
- _Ask "What are you eating?" then answer with "(저는) {filler}을/를 먹어요." Use the object marker that fits the filler's batchim._
  - Fillers: 김치 (kimchi) · 비빔밥 (bibimbap) · 떡볶이 (tteokbokki)
- _Ask "What is at the {filler}?" Frame: "{filler}에 뭐가 있어요?" Then answer with one thing._
  - Fillers: 카페 (café) · 도서관 (library) · 공원 (park)

**Production task:** I will hold up a thing, mention a place, or describe a vague situation. Ask the matching "what" question in polite -요 form. Use 뭐예요? for identity, 뭐 + verb for actions, 뭐가 + 있어요 for existence. Stop second-guessing 뭐 vs 무엇 — 뭐 is correct here.

### ClozeLesson — `cloze.question.what.ko`

| Sentence (blank = ___) | Answer | English | Distractors |
|---|---|---|---|
| 이건 ___? | **뭐예요** | What is this? | 뭐이에요, 무엇이에요, 뭐가 |
| ___ 먹어요? | **뭐** | What are you eating? | 뭐가, 뭐를, 무엇은 |
| 가방에 ___ 있어요? | **뭐가** | What is in the bag? | 뭐를, 뭐예요, 뭐는 |
| 이름___ 뭐예요? | **이** | What is (your) name? | 가, 은, 를 |
| Q: 뭐가 있어요?  A: ___ 있어요. | **책이** | Q: What is there? A: There is a book. | 책은, 책을, 책가 |

### StoryLesson — `story.question.what.cafe-order.ko`

_dialogue: Cafe order_

| Speaker | Korean | Romanization | English |
|---|---|---|---|
| 직원 | 안녕하세요. 뭐 드릴까요? | annyeong-haseyo. mwo deurilkkayo? | Hello. What may I get you? |
| 사라 | 음… 메뉴가 뭐 있어요? | eum… menyu-ga mwo isseoyo? | Hmm… what's on the menu? (Lit. "what is there in the menu?") |
| 직원 | 커피, 차, 그리고 주스가 있어요. | keopi, cha, geurigo juseu-ga isseoyo. | We have coffee, tea, and juice. |
| 사라 | 커피가 뭐예요? | keopi-ga mwo-yeyo? | What (kind of) coffee is it? (asking which coffees they have) |
| 직원 | 아메리카노, 라떼, 카푸치노가 있어요. | amerikano, latte, kapuchino-ga isseoyo. | We have Americano, latte, and cappuccino. |
| 사라 | 아메리카노 주세요! | amerikano juseyo! | Americano, please! |

**Comprehension Qs:** What does the staff say first to ask what Sarah wants? / How does Sarah ask what's on the menu? / What three options does the staff offer? / What does Sarah end up ordering?

### VocabDeck — `vocab.question.what.things.ko`

| Korean | English |
|---|---|
| 책 | book |
| 물 | water |
| 가방 | bag |
| 핸드폰 | phone |
| 돈 | money |
| 김치 | kimchi |
| 비빔밥 | bibimbap |
| 떡볶이 | tteokbokki |
| 카페 | café |
| 도서관 | library |

### PronunciationTask — `pronunciation.question.what.ko`

| Korean | Romanization | English | Focus sounds |
|---|---|---|---|
| 뭐예요? | mwo-yeyo? | What is it? | 뭐: ㅝ is a single glide /wo/ — like "wuh", not two syllables — rising intonation on the final syllable signals the question |
| 이건 뭐예요? | igeon mwo-yeyo? | What is this? | 이건: ㄴ batchim links into 뭐 → /i-geon-mwo/ with a soft transition — overall melody: high-high-mid-high? — final 요 rises |
| 뭐 먹어요? | mwo meogeoyo? | What are you eating? | 뭐 + 먹어요: brief pause between 뭐 and 먹 — both stay light — 먹어요: ㄱ batchim links → /meo-geo-yo/ |

### MinimalPairTask — `minimal-pair.question.what.mwo-mu.ko`

| A | B | Contrast |
|---|---|---|
| 뭐예요? | 뭐이에요? | Correct vs wrong copula. 뭐 ends in a vowel → -예요 is correct. -이에요 is the over-applied beginner error. |
| 뭐 | 무엇 | Casual vs formal "what". Same meaning, different register. 뭐 is conversation; 무엇 is news anchor. |
| 뭐 먹어요? | 뭐가 먹어요? | Object what vs subject what. "What do you eat?" vs "What is eating?" (eerie second meaning — only used when an animal/agent is doing the eating). |

---

## pattern.question.who  🆕

**Gloss:** Asking "who?" — 누구 / 누가  ·  **Level:** A1 / TOPIK 1  ·  **File:** `lessons/pattern.question.who.js`

### ContrastNote — `contrast.question.who.ko-en`

- **L2 pattern:** Korean has two: 누구 (base) and 누가 (contracted subject — 누구+가). "누가 학생이에요?" but "누구를 만나요?".
- **Explanation:** 누구 is the everyday "who" — use it after particles (누구를, 누구에게) and as a copula complement ("저 사람은 누구예요?"). 누가 is the special contracted form when "who" is the SUBJECT — literally 누구 + 가, with the middle dropped for ease. The most important pairing rule in beginner Korean: an answer to a 누가 question must use 이/가 on the answerer. Q: "누가 사라예요?" ("Who is Sarah?") A: "제가 사라예요" ("I am Sarah"). Answering "저는 사라예요" changes the topic from "who is Sarah" to "as for me, …" — it sounds like dodging the question.
- **Common mistakes (contain ✗/✓ Korean — check both):**
  - WRONG: "누구가 와요?" (using 누구 + 가 explicitly). RIGHT: "누가 와요?" — the contraction 누가 is mandatory when "who" is the subject.
  - WRONG: Answering "누가 학생이에요?" with "저는 학생이에요". RIGHT: "제가 학생이에요" — the question used 누가 (subject), so the answer must use 가 too.
  - WRONG: "누가 만나요?" when you mean "Who(m) do you meet?". RIGHT: "누구를 만나요?" — when "who" is the OBJECT, you need 누구 + 를, not the subject form.
  - WRONG: "누가는 의사예요?" (stacking the subject 누가 with topic 는). RIGHT: "누가 의사예요?" — question words don't take 은/는.
- **Cultural note:** Asking "누구세요?" ("Who is it?") is the standard polite phrase when answering the door or a phone call from an unknown number. The honorific suffix -세요 elevates the asker's respect for whoever's on the other end — useful even when you don't know who it is yet.
  - _Example:_ phone rings → 사라: 여보세요. → 모르는 사람: 안녕하세요. → 사라: 누구세요?

### PatternLesson — `pattern.question.who.ko`

**Pattern template:** `누가 …요? / … 누구 …요?` — Who is / who does / whom …?

| Korean | Romanization | English | Gloss |
|---|---|---|---|
| 누가 학생이에요? | nuga haksaeng-ieyo? | Who is a student? | 누가(who, SUBJ contraction) \| 학생이에요 |
| 누가 와요? | nuga wayo? | Who is coming? | 누가(who, SUBJ) \| 와요(comes) |
| 저 사람은 누구예요? | jeo saram-eun nugu-yeyo? | Who is that person? | 저 사람(that person)+은(TOPIC) \| 누구예요(is who) |
| 누구를 만나요? | nugureul mannayo? | Whom are you meeting? | 누구(who)+를(OBJ) \| 만나요(meet) |

**Drills:**
- _Ask "Who is a {filler}?" using 누가. Then answer with "제가 {filler}이에요/예요" if it's you._
  - Fillers: 학생 (student) · 선생님 (teacher) · 의사 (doctor) · 친구 (friend)
- _Ask "Who is at the {filler}?" Frame: "{filler}에 누가 있어요?"_
  - Fillers: 카페 (café) · 도서관 (library) · 학교 (school)
- _Ask "Who is coming on {filler}?" Frame: "{filler}에 누가 와요?"_
  - Fillers: 오늘 (today) · 내일 (tomorrow) · 주말 (weekend)

**Production task:** I'll point at a scene or describe a situation. Ask the matching "who" question. Use 누가 + verb when "who" is the subject ("who is coming"). Use 누구예요 / 누구를 / 누구에게 when "who" is the copula complement, object, or in another role.

### ClozeLesson — `cloze.question.who.ko`

| Sentence (blank = ___) | Answer | English | Distractors |
|---|---|---|---|
| ___ 학생이에요? | **누가** | Who is a student? | 누구가, 누구는, 누구를 |
| 저 사람은 ___? | **누구예요** | Who is that person? | 누구이에요, 누가예요, 누가이에요 |
| ___ 만나요? | **누구를** | Whom are you meeting? | 누가, 누구가, 누구는 |
| Q: 누가 와요?  A: ___ 와요. | **사라가** | Q: Who is coming? A: Sarah is coming. | 사라는, 사라이, 사라를 |
| Q: 누가 학생이에요?  A: ___ 학생이에요. | **제가** | Q: Who is a student? A: I am a student. | 저는, 저가, 제는 |

### StoryLesson — `story.question.who.at-the-cafe.ko`

_dialogue: Who's at the café?_

| Speaker | Korean | Romanization | English |
|---|---|---|---|
| 사라 | 저기 사람이 있어요. 누구예요? | jeogi saram-i isseoyo. nugu-yeyo? | There's a person over there. Who is it? |
| 민호 | 제 친구예요. 이름이 지수예요. | je chingu-yeyo. ireum-i jisu-yeyo. | It's my friend. Her name is Jisu. |
| 사라 | 오, 옆 사람은 누구예요? | o, yeop saram-eun nugu-yeyo? | Oh, and who's the person next to her? |
| 민호 | 지수 동생이에요. 학생이에요. | jisu dongsaeng-ieyo. haksaeng-ieyo. | That's Jisu's younger sibling. (They're) a student. |
| 사라 | 누가 의사예요? | nuga uisa-yeyo? | Who is the doctor? |
| 민호 | 지수가 의사예요! | jisu-ga uisa-yeyo! | Jisu is the doctor! |

**Comprehension Qs:** How does Sarah ask "who is that?" — note the form she uses. / When Sarah asks "누가 의사예요?", why does Minho answer "지수가" and not "지수는"? / Translate "Who is your friend?"

### VocabDeck — `vocab.question.who.roles.ko`

| Korean | English |
|---|---|
| 학생 | student |
| 선생님 | teacher |
| 의사 | doctor |
| 친구 | friend |
| 한국 사람 | Korean person |
| 미국 사람 | American person |
| 사라 | Sarah (name) |
| 민호 | Minho (name) |

### PronunciationTask — `pronunciation.question.who.ko`

| Korean | Romanization | English | Focus sounds |
|---|---|---|---|
| 누가 와요? | nuga wayo? | Who is coming? | 누가: smooth /nu-ga/, the ㄱ is soft (not aspirated) — 와요: /wa-yo/, light glide on the ㅘ |
| 저 사람은 누구예요? | jeo saram-eun nugu-yeyo? | Who is that person? | 사람은: ㅁ batchim links → /sa-ra-meun/ — 누구예요: /nu-gu-ye-yo/, four light syllables — rising on the last |
| 누구를 만나요? | nugureul mannayo? | Whom are you meeting? | 누구를: /nu-gu-reul/, the ㄹ tap is light — 만나요: double ㄴ — slight gemination — /man-na-yo/ |

### MinimalPairTask — `minimal-pair.question.who.nuga-nugu.ko`

| A | B | Contrast |
|---|---|---|
| 누가 와요? | 누구 와요? | 누가 is the correct subject form. 누구 (without 가) here sounds like the start of an unfinished sentence — beginner error. |
| 누가 학생이에요? | 누구는 학생이에요? | Subject question vs ungrammatical topic question. Question words refuse 은/는 in modern Korean — only 누가 is correct. |
| 제가 학생이에요 | 저는 학생이에요 | Answer with 제가 (subject) when the question used 누가; answer with 저는 (topic) when introducing yourself in fresh conversation. Different conversational moves. |

---

## pattern.subject.i_ga  🆕

**Gloss:** Subject marker 이 / 가  ·  **Level:** A1 / TOPIK 1  ·  **File:** `lessons/pattern.subject.i_ga.js`

### ContrastNote — `contrast.subject.i_ga.ko-en`

- **L2 pattern:** Korean: subject is marked by the particle 이 / 가 attached to the noun: "고양이가 생선을 먹어요". Korean word order is flexible because particles do the work.
- **Explanation:** Korean tells you WHO/WHAT is doing the action by tagging it with 이 (after a consonant) or 가 (after a vowel). Because the particle marks the role, word order can shift without losing meaning. The hard part for English speakers is choosing between 이/가 (subject) and 은/는 (topic). Both can sit next to a noun in introductions. The rule that helps most: use 이/가 when you are INTRODUCING new information into the conversation, ANSWERING a question with "who? / what?", or stating that something EXISTS / a state holds ("물이 있어요" — there is water). Use 은/는 when you are CONTINUING the conversation on a topic, or CONTRASTING two things. A practical rule: 있어요/없어요 sentences (existence) almost always pair with 이/가.
- **Common mistakes (contain ✗/✓ Korean — check both):**
  - WRONG: "물은 있어요?" when ordering water for the first time. RIGHT: "물이 있어요?" — you're introducing "water" into the conversation, not contrasting it with something else.
  - WRONG: "사라가 학생이에요. 사라가 미국 사람이에요." (using 가 repeatedly). RIGHT: After introducing Sarah, drop her or switch to 는. "사라는 학생이에요. (사라는) 미국 사람이에요." 이/가 keeps re-introducing.
  - WRONG: "내가는 사라예요" (stacking subject and topic markers). RIGHT: pick one — "저는 사라예요" (topic) or, in a contest like answering "누가 사라예요?" → "제가 사라예요" (subject).
  - WRONG: "고양이은 작아요". RIGHT: "고양이는 작아요" (topic, vowel ending) OR "고양이가 작아요" (subject — focused on the cat being small). 고양이 ends in ㅣ — a vowel — so the consonant-form -은 is wrong either way.
- **Cultural note:** A question containing 누가 ("who?") forces an answer with 이/가, not 은/는. "누가 사라예요?" — "Who is Sarah?" — must be answered "제가 사라예요" ("I am Sarah", subject-focused). Answering "저는 사라예요" sounds like a topic-shift, not an answer to the question. Beginner learners default to 저는 and end up answering wrong questions.
  - _Example:_ Q: 누가 학생이에요? ("Who is a student?")  A: 제가 학생이에요. ("I am.")

### PatternLesson — `pattern.subject.i_ga.ko`

**Pattern template:** `{filler}이 / {filler}가 …` — {filler} is / does / exists

| Korean | Romanization | English | Gloss |
|---|---|---|---|
| 책이 있어요. | chaeg-i isseoyo. | There is a book. (consonant + 이; existence) | 책(book)+이(SUBJ) \| 있어요(exists) |
| 물이 없어요. | mul-i eopseoyo. | There is no water. (consonant + 이; negation of existence) | 물(water)+이 \| 없어요(does not exist) |
| 사라가 와요. | sara-ga wayo. | Sarah is coming. (vowel + 가; subject of an action) | 사라(Sarah)+가(SUBJ) \| 와요(comes) |
| 날씨가 좋아요. | nalssi-ga joayo. | The weather is nice. (vowel + 가; subject of a quality) | 날씨(weather)+가 \| 좋아요(is good) |

**Drills:**
- _Say "There is a {filler}." Use 있어요. Watch the batchim of {filler}._
  - Fillers: 책 (book) · 물 (water) · 가방 (bag) · 핸드폰 (phone) · 돈 (money)
- _Say "There is no {filler}." Use 없어요._
  - Fillers: 책 (book) · 물 (water) · 돈 (money) · 시간 (time)
- _Answer "Who is coming?" by saying "{filler} is coming." Use 와요._
  - Fillers: 사라 (Sarah (name)) · 민호 (Minho (name)) · 친구 (friend) · 선생님 (teacher)
- _Say "{filler} is busy." (시간이 없어요 — "no time"). Build it as: TIME + 은/는 + 바빠요 if you want — but for THIS drill use the SUBJECT particle: "{filler}이/가 바빠요."_
  - Fillers: 오늘 (today) · 주말 (weekend) · 아침 (morning)

**Production task:** I will ask you "누가 …?" ("who …?") or "뭐가 있어요?" ("what is there?"). Answer with NOUN + 이/가 + verb. Pick the particle by batchim, not by what feels natural in English.

### ClozeLesson — `cloze.subject.i_ga.ko`

| Sentence (blank = ___) | Answer | English | Distractors |
|---|---|---|---|
| 책___ 있어요. | **이** | There is a book. | 가, 은, 을 |
| 사라___ 와요. | **가** | Sarah is coming. | 이, 는, 을 |
| 날씨___ 좋아요. | **가** | The weather is nice. | 이, 는, 도 |
| 돈___ 없어요. | **이** | I have no money. | 가, 는, 을 |
| Q: 누가 학생이에요? A: ___ 학생이에요. | **제가** | Q: Who is a student? A: I am a student. | 저는, 제는, 저가 |

### StoryLesson — `story.subject.i_ga.what-is-in-the-bag.ko`

_dialogue: What's in the bag?_

| Speaker | Korean | Romanization | English |
|---|---|---|---|
| 민호 | 가방에 뭐가 있어요? | gabang-e mwoga isseoyo? | What is in the bag? |
| 사라 | 책이 있어요. 그리고 물도 있어요. | chaeg-i isseoyo. geurigo mul-do isseoyo. | There is a book. And there is also water. |
| 민호 | 핸드폰은요? | haendeupon-eun-yo? | And the phone? (Lit. "as for the phone?") |
| 사라 | 핸드폰은 없어요. 집에 있어요. | haendeupon-eun eopseoyo. jib-e isseoyo. | The phone, I don't have it. It's at home. |
| 민호 | 돈이 있어요? | don-i isseoyo? | Do you have money? |
| 사라 | 네, 조금 있어요! | ne, jogeum isseoyo! | Yes, I have a little! |

**Comprehension Qs:** Why does Sarah say "책이" but "핸드폰은"? What is the conversational signal that triggers each? / Why doesn't Sarah say "돈이 있어요" — she uses just "조금 있어요"? / Translate: "There is also money."

### VocabDeck — `vocab.subject.i_ga.things-and-people.ko`

| Korean | English |
|---|---|
| 책 | book |
| 물 | water |
| 가방 | bag |
| 핸드폰 | phone |
| 돈 | money |
| 개 | dog |
| 고양이 | cat |
| 차 | car |
| 시간 | time |
| 사라 | Sarah (name) |
| 민호 | Minho (name) |
| 친구 | friend |

### PronunciationTask — `pronunciation.subject.i_ga.ko`

| Korean | Romanization | English | Focus sounds |
|---|---|---|---|
| 책이 있어요 | chaeg-i isseoyo | there is a book | 책이: ㄱ batchim of 책 links into 이 → /chae-gi/, NOT "chaek-i" — 있어요: tense ㅆ — hold the s briefly before the 어 → /i-sseo-yo/ |
| 돈이 없어요 | don-i eopseoyo | I have no money | 돈이: ㄴ batchim links → /do-ni/ — 없어요: ㅄ batchim is silent ㅅ, voiced ㅂ → reads as /eop-seo-yo/ |
| 사라가 와요 | sara-ga wayo | Sarah is coming | 사라가: smooth /sa-ra-ga/, the ㄱ in 가 is a soft "g" — 와요: diphthong /wa/ — like English "wah" |

### MinimalPairTask — `minimal-pair.subject.i_ga.vs-topic.ko`

| A | B | Contrast |
|---|---|---|
| 책이 있어요 | 책은 있어요 | Subject-marked: "there is a book" (new info). Topic-marked: "as for the book, (we do) have it" (contrast — implies "but not other things"). Both grammatical, very different meaning. |
| 누가 와요? | 누구는 와요? | The 누 ("who") + 가 form is the natural Korean question for "who is coming?". The topic-marked version is ungrammatical in modern speech — interrogative pronouns refuse 은/는. |
| 제가 사라예요 | 저는 사라예요 | Both translate "I am Sarah". 제가 answers "WHO is Sarah?" (subject focus). 저는 introduces yourself in a fresh conversation (topic setup). Different conversational moves. |

---

## pattern.topic.eun_neun  🆕

**Gloss:** Topic marker 은 / 는 ("as for X")  ·  **Level:** A1 / TOPIK 1  ·  **File:** `lessons/pattern.topic.eun_neun.js`

### ContrastNote — `contrast.topic.eun_neun.ko-en`

- **L2 pattern:** Korean uses 은 / 는 as a topic particle attached AFTER the noun: 저는, 학생은, 사라는.
- **Explanation:** Korean asks: "what is this sentence ABOUT?" That noun gets 은 (after a consonant) or 는 (after a vowel). Once a topic is set, you can drop it from later sentences until the topic changes. 은/는 carries a flavor of contrast or "speaking of…". "저는 학생이에요" implies "I (as for me) am a student" — perhaps inviting comparison ("…and what about you?"). Crucially: 은/는 is NOT the subject. Korean has a separate subject marker 이/가, which you learn next. The two overlap a lot in introductions but diverge fast in real sentences.
- **Common mistakes (contain ✗/✓ Korean — check both):**
  - WRONG: "저은 학생이에요" (using -은 after a vowel). RIGHT: "저는 학생이에요". 저 ends in a vowel, so it takes -는.
  - WRONG: "학생는 책이에요" (using -는 after a consonant). RIGHT: "학생은 책이에요". 학생 ends in ㅇ (a batchim), so it takes -은.
  - WRONG: Treating every English subject as a topic. RIGHT: 은/는 marks what the conversation is ABOUT, not just "whoever does the action". You'll often introduce yourself with 저는 once, then drop it for the next several sentences.
  - WRONG: "저는 책은 읽어요" with no special meaning intended. RIGHT: Either "저는 책을 읽어요" (book is the object) or "저는 책은 읽어요" only if you mean "as for books, I read them (but not magazines)". Stacking topics carries contrast — don't do it accidentally.
- **Cultural note:** When you introduce yourself in Korean, you almost always start with 저는 ("as for me"). Skipping it sounds blunt. But once you've set yourself as the topic, you don't need to repeat it — Korean omits the subject until the topic changes. This is why a beginner who keeps saying "저는… 저는… 저는…" sounds odd to native speakers.
  - _Example:_ "저는 사라예요. 학생이에요. 미국 사람이에요." (Not "저는 사라예요. 저는 학생이에요. 저는 미국 사람이에요.")

### PatternLesson — `pattern.topic.eun_neun.ko`

**Pattern template:** `{filler}은 / {filler}는 …` — As for {filler}, …

| Korean | Romanization | English | Gloss |
|---|---|---|---|
| 저는 학생이에요. | jeoneun haksaeng-ieyo. | I am a student. (vowel + 는) | 저(I)+는(TOPIC) \| 학생이에요 |
| 민호는 의사예요. | minho-neun uisa-yeyo. | Minho is a doctor. (vowel + 는) | 민호(Minho)+는 \| 의사예요(is a doctor) |
| 책은 가방에 있어요. | chaeg-eun gabang-e isseoyo. | The book is in the bag. (consonant + 은) | 책(book)+은 \| 가방에(in the bag) 있어요 |
| 한국 사람은 친절해요. | hanguk saram-eun chinjeolhaeyo. | Koreans are kind. (consonant + 은) | 한국 사람(Korean person)+은 \| 친절하다(to be kind) |

**Drills:**
- _Say "{filler} is a student." Use the correct topic marker after {filler}._
  - Fillers: 사라 (Sarah (name)) · 민호 (Minho (name)) · 친구 (friend) · 선생님 (teacher)
- _Say "The {filler} is in the bag." Mark {filler} as the topic._
  - Fillers: 책 (book) · 가방 (bag) · 핸드폰 (phone) · 물 (water)
- _Say "{filler} is nearby." (가깝다 = to be close) — mark {filler} as the topic._
  - Fillers: 학교 (school) · 집 (home / house) · 카페 (café) · 도서관 (library)

**Production task:** I will give you a person, a thing, or a place in English. Make a Korean sentence with the noun as the TOPIC, using -은 after a consonant or -는 after a vowel. Then say something simple ABOUT it (it's tall / nearby / kind / mine — whatever you can manage in polite -요 form).

### ClozeLesson — `cloze.topic.eun_neun.ko`

| Sentence (blank = ___) | Answer | English | Distractors |
|---|---|---|---|
| 저___ 한국 사람이에요. | **는** | I am Korean. | 은, 이, 가 |
| 학생___ 도서관에 있어요. | **은** | The student is in the library. | 는, 이, 가 |
| 사라___ 미국 사람이에요. | **는** | Sarah is American. | 은, 이, 가 |
| 책___ 가방에 있어요. | **은** | The book is in the bag. | 는, 를, 에 |
| ___은 학생이에요. | **민호** | Minho is a student. | 민호는, 민호가, 저는 |

### StoryLesson — `story.topic.eun_neun.about-my-family.ko`

_monologue: About my family_

| Speaker | Korean | Romanization | English |
|---|---|---|---|
|  | 저는 사라예요. 미국 사람이에요. | jeoneun sara-yeyo. miguk saram-ieyo. | I am Sarah. I am American. |
|  | 아버지는 의사예요. 어머니는 선생님이에요. | abeoji-neun uisa-yeyo. eomeoni-neun seonsaengnim-ieyo. | My father is a doctor. My mother is a teacher. |
|  | 동생은 학생이에요. 학교에 가요. | dongsaeng-eun haksaeng-ieyo. hakgyo-e gayo. | My younger sibling is a student. They go to school. |
|  | 저는 한국어를 공부해요. 어렵지만 재미있어요. | jeoneun hangug-eo-reul gongbuhaeyo. eoryeopjiman jaemiisseoyo. | I study Korean. It's hard, but it's fun. |

**Comprehension Qs:** How does Sarah introduce her father? / What does Sarah's younger sibling do? / In "동생은 학생이에요", why is it 은 and not 는? / Sarah only uses 저는 ONCE in this monologue. Why is that natural in Korean?

### VocabDeck — `vocab.topic.eun_neun.family-and-roles.ko`

| Korean | English |
|---|---|
| 학생 | student |
| 선생님 | teacher |
| 의사 | doctor |
| 친구 | friend |
| 한국 사람 | Korean person |
| 미국 사람 | American person |
| 사라 | Sarah (name) |
| 민호 | Minho (name) |
| 책 | book |
| 가방 | bag |
| 핸드폰 | phone |

### PronunciationTask — `pronunciation.topic.eun_neun.ko`

| Korean | Romanization | English | Focus sounds |
|---|---|---|---|
| 저는 | jeoneun | as for me | 저는 is two syllables, smooth and unstressed: /jeo-neun/ — The ㅡ vowel in 는 is the flat-smile vowel — do not round it like English "u" in "but" |
| 학생은 도서관에 있어요 | haksaeng-eun doseogwan-e isseoyo | The student is in the library | 학생은: ㅇ batchim links into 은 → /haek-sae-ngeun/, the ㅇ and the following ㅇ blend — 도서관에: ㄴ batchim of 관 + 에 → /gwa-ne/, smooth — 있어요: ㅆ batchim is tense; link into 어요 → /i-sseo-yo/ |
| 사라는 미국 사람이에요 | sara-neun miguk saram-ieyo | Sarah is American | 사라는: smooth /sa-ra-neun/, no break between 라 and 는 |

### MinimalPairTask — `minimal-pair.topic.eun_neun.batchim.ko`

| A | B | Contrast |
|---|---|---|
| 저는 | 저은 | 저 ends in a vowel — correct: 저는. 저은 is the over-application error from learners who memorize "은" first. |
| 학생은 | 학생는 | 학생 ends in ㅇ batchim — correct: 학생은. 학생는 is the parallel error from learners who default to "는". |
| 책은 | 책이 | Topic marker (은) vs subject marker (이). 책은 = "as for the book…"; 책이 = "the book (as the subject of an action)". Both grammatical, different meaning. |

---

# Original scaffold (6 patterns — re-check only if desired)

## pattern.ability.can_cannot

**Gloss:** I can / cannot V  ·  **Level:** A1 / TOPIK 1  ·  **File:** `lessons/pattern.ability.can_cannot.js`

### ContrastNote — `contrast.ability.can_cannot.ko-en`

- **L2 pattern:** Korean: "V-(으)ㄹ 수 있어요" / "V-(으)ㄹ 수 없어요"
- **Explanation:** Korean expresses ability with a noun phrase: "(으)ㄹ 수" literally means "the possibility of V-ing". You then say "exists" (있어요) for can, or "does not exist" (없어요) for cannot. The "(으)" links a consonant-final stem to ㄹ. Note also "못" — a short negative adverb that means "cannot (due to inability)". 못 가요 ≈ 갈 수 없어요, but 못 is more colloquial.
- **Common mistakes (contain ✗/✓ Korean — check both):**
  - WRONG: "갈 수 안 있어요" (using 안 to negate). RIGHT: "갈 수 없어요" — the negative is built into 없어요, not 안.
  - WRONG: "할 수 있다요" (mixing dictionary form with polite ending). RIGHT: "할 수 있어요" — conjugate 있다 → 있어요.
  - WRONG: "수영을 할 수 있어요" with the verb 하다 marked as object. RIGHT: Either "수영할 수 있어요" (verb as one unit) or "수영을 잘 해요" — keep 하다 as a verb.

### PatternLesson — `pattern.ability.can_cannot.ko`

**Pattern template:** `{filler}-(으)ㄹ 수 있어요 / 없어요` — I can V / I cannot V

| Korean | Romanization | English | Gloss |
|---|---|---|---|
| 한국어를 할 수 있어요. |  | I can speak Korean. | 한국어(Korean)+를 \| 할 수(possibility-to-do) 있어요(exists) |
| 매운 음식을 먹을 수 있어요. |  | I can eat spicy food. | 매운 음식(spicy food)+을 \| 먹을 수 있어요 |
| 내일은 갈 수 없어요. |  | I can't go tomorrow. | 내일은(as for tomorrow) \| 갈 수 없어요(cannot-go) |

**Drills:**
- _Say whether you can {filler}._
  - Fillers: 수영하다 (to swim) · 요리하다 (to cook) · 운전하다 (to drive) · 노래하다 (to sing) · 읽다 (to read)
- _Say you can / cannot eat {filler}._
  - Fillers: 김치 (kimchi) · 떡볶이 (tteokbokki) · 삼겹살 (samgyeopsal)
- _Say you can / cannot go to {filler} today._
  - Fillers: 제주도 (Jeju (island)) · 서울 (Seoul) · 부산 (Busan)

**Production task:** I will say a verb, a food, or a place. State whether you can do it / eat it / go there. Use 있어요 for can, 없어요 for cannot.

### ClozeLesson — `cloze.ability.can_cannot.ko`

| Sentence (blank = ___) | Answer | English | Distractors |
|---|---|---|---|
| 한국어를 ___ 수 있어요. | **할** | I can speak Korean. | 하는, 한, 해서 |
| 매운 음식을 ___ 수 있어요. | **먹을** | I can eat spicy food. | 먹는, 먹은, 먹어서 |
| 내일은 갈 수 ___. | **없어요** | I can't go tomorrow. | 있어요, 안 돼요, 못 해요 |
| 저는 수영___ 수 있어요. | **할** | I can swim. | 하는, 하서, 해 |

### StoryLesson — `story.ability.can_cannot.spicy-food.ko`

_dialogue: Can you handle spicy?_

| Speaker | Korean | Romanization | English |
|---|---|---|---|
| 민지 | 매운 음식 먹을 수 있어요? |  | Can you eat spicy food? |
| Alex | 네, 먹을 수 있어요. 그런데 너무 매운 건 못 먹어요. |  | Yes, I can. But I can't eat things that are too spicy. |
| 민지 | 떡볶이는요? |  | What about tteokbokki? |
| Alex | 떡볶이는 먹을 수 있어요. 좋아해요! |  | I can eat tteokbokki. I like it! |

**Comprehension Qs:** Can Alex eat spicy food in general? / What can Alex NOT eat? / How does Alex feel about tteokbokki?

### VocabDeck — `vocab.ability.can_cannot.slots.ko`

| Korean | English |
|---|---|
| 수영하다 | to swim |
| 요리하다 | to cook |
| 운전하다 | to drive |
| 노래하다 | to sing |
| 읽다 | to read |
| 쓰다 | to write |
| 먹다 | to eat |
| 가다 | to go |
| 운동하다 | to exercise |

### PronunciationTask — `pronunciation.ability.can_cannot.ko`

| Korean | Romanization | English | Focus sounds |
|---|---|---|---|
| 할 수 있어요 |  | I can do (it) | 할 수: ㄹ + ㅅ → /hal-ssu/ — ㅅ tenses — 있어요: ㅆ links → /isseoyo/ |
| 갈 수 없어요 |  | I can't go | 없어요: silent ㅂ link to 어 → /eopseoyo/ |
| 수영할 수 있어요 |  | I can swim | 수영할: smooth flow, careful with the ㅇ codas (silent) |

### MinimalPairTask — `minimal-pair.ability.can_cannot.s-tense.ko`

| A | B | Contrast |
|---|---|---|
| 수 | 쑤 | lax ㅅ vs tense ㅆ — "수" is the noun used in this pattern; "쑤" tests perception of the tense onset. |
| 있어요 | 잇어요 | ㅆ vs ㅅ at the patchim — "있어요" (to exist) is the real form. |

---

## pattern.condition.if

**Gloss:** If V/A, ...  ·  **Level:** A2 / TOPIK 2  ·  **File:** `lessons/pattern.condition.if.js`

### ContrastNote — `contrast.condition.if.ko-en`

- **L2 pattern:** Korean: "[condition]-(으)면 [result]" — condition always comes first
- **Explanation:** Korean does not put "if" / "when" in a separate word. Attach -(으)면 to the verb / adjective stem. Use -(으) only if the stem ends in a consonant; vowel-ending stems take just -면. Korean -(으)면 covers BOTH English "if" (hypothetical) and "when" (whenever) — context disambiguates. Unlike -아/어서, -(으)면 is fine before commands and suggestions ("if it rains, take an umbrella" → "비가 오면 우산을 가져가세요").
- **Common mistakes (contain ✗/✓ Korean — check both):**
  - WRONG: "비가 오ㅁ" / "비가 옴면" (forgetting the 으 link). RIGHT: 오다 is vowel-final, so it is "비가 오면" — but consonant-final stems like 먹- need "먹으면".
  - WRONG: Using -아/어서 for hypotheticals ("배고파서 먹으세요"). RIGHT: "배고프면 먹으세요" — -(으)면 for "if/when" + command.
  - WRONG: "할면" instead of "하면". RIGHT: 하다 is vowel-final → "하면". Only consonant-final stems get the 으 link.

### PatternLesson — `pattern.condition.if.ko`

**Pattern template:** `{filler}-(으)면, ...` — If / when [condition], [result]

| Korean | Romanization | English | Gloss |
|---|---|---|---|
| 시간이 있으면 같이 가요. |  | If you have time, let's go together. | 시간(time)+이(SUBJ) \| 있(have)+으면 \| 같이(together) 가요(go) |
| 비가 오면 집에 있어요. |  | When it rains, I stay home. | 비가 오(rain-come)+면 \| 집에(at home) 있어요(am) |
| 한국에 가면 김밥을 꼭 먹어 보세요. |  | If you go to Korea, definitely try kimbap. | 가(go)+면 \| 꼭(definitely) 먹어 보세요(try eating) |

**Drills:**
- _Make a sentence starting "{filler}-면" + a natural result._
  - Fillers: 비가 오다 (rain) · 눈이 오다 (snow)
- _If you are {filler}, what do you do? Use -(으)면._
  - Fillers: 피곤하다 (tired) · 배고프다 (hungry) · 바쁘다 (busy) · 아프다 (sick)
- _If you {filler}, you feel better. Express that._
  - Fillers: 공부하다 (to study) · 운동하다 (to exercise) · 쉬다 (to rest)

**Production task:** I will give you a condition (a weather event, state, or verb). Produce a full sentence: condition + -(으)면 + a sensible consequence in polite form.

### ClozeLesson — `cloze.condition.if.ko`

| Sentence (blank = ___) | Answer | English | Distractors |
|---|---|---|---|
| 시간이 ___ 같이 가요. | **있으면** | If you have time, let's go together. | 있면, 있어서, 있고 |
| 비가 ___ 집에 있어요. | **오면** | When it rains, I stay home. | 오으면, 와서, 온다 |
| 한국에 ___ 김밥을 꼭 드세요. | **가면** | If you go to Korea, please try kimbap. | 가아면, 갈면, 가서 |
| 피곤___ 좀 쉬세요. | **하면** | If you are tired, rest a bit. | 해서, 한다면, 한 |

### StoryLesson — `story.condition.if.umbrella.ko`

_dialogue: Maybe take an umbrella_

| Speaker | Korean | Romanization | English |
|---|---|---|---|
| 엄마 | 오늘 비가 오면 우산을 가져 가세요. |  | If it rains today, take an umbrella. |
| Alex | 네. 시간이 있으면 빵도 사 올까요? |  | Okay. If I have time, shall I also buy bread? |
| 엄마 | 좋아요. 그리고 피곤하면 일찍 와요. |  | Good. And if you are tired, come home early. |
| Alex | 네, 알겠어요. 다녀올게요! |  | Okay, got it. I'll be back! |

**Comprehension Qs:** What should Alex take if it rains? / What does Alex offer to buy if there is time? / What should Alex do if tired?

### VocabDeck — `vocab.condition.if.slots.ko`

| Korean | English |
|---|---|
| 비가 오다 | rain |
| 눈이 오다 | snow |
| 피곤하다 | tired |
| 배고프다 | hungry |
| 바쁘다 | busy |
| 아프다 | sick |
| 공부하다 | to study |
| 운동하다 | to exercise |
| 쉬다 | to rest |

### PronunciationTask — `pronunciation.condition.if.ko`

| Korean | Romanization | English | Focus sounds |
|---|---|---|---|
| 비가 오면 |  | if it rains | 오면: /o-myeon/ — single fluid sound |
| 있으면 |  | if (you / there) have | 있으: ㅆ + ㅡ → /i-sseu/ — 있으면 → /isseumyeon/ |
| 피곤하면 |  | if (you are) tired | 하면: /ha-myeon/ — link smoothly |

### MinimalPairTask — `minimal-pair.condition.if.eu-link.ko`

| A | B | Contrast |
|---|---|---|
| 먹으면 | 먹면 | with 으 link vs without — only 먹으면 is correct after a consonant-final stem; 먹면 is ungrammatical. |
| 오면 | 오으면 | no 으 vs added 으 — only 오면 is correct after a vowel-final stem; 오으면 is ungrammatical. |

---

## pattern.experience.have_you_ever

**Gloss:** Have you ever V-ed?  ·  **Level:** A2 / TOPIK 2  ·  **File:** `lessons/pattern.experience.have_you_ever.js`

### ContrastNote — `contrast.experience.have_you_ever.ko-en`

- **L2 pattern:** Korean: "(object)-에/를 V-아/어 본 적이 있어요?"
- **Explanation:** English bolts "have ever" onto an auxiliary verb. Korean instead changes the main verb itself: take the verb stem, attach -아/어, then add the fixed tail "본 적이 있어요?". The object comes BEFORE the verb (SOV order). Three things English speakers must remember: (1) the pattern is one tail you memorize as a chunk — don't parse it word by word; (2) the verb form changes, not an auxiliary; (3) for "have you been to X" the verb is 가다 → 가 본 적이 있어요? — same pattern.
- **Common mistakes (contain ✗/✓ Korean — check both):**
  - WRONG: "당신은 가지고 있어요 갔어요 제주도?" (literally translating "have you been to Jeju"). RIGHT: "제주도에 가 본 적이 있어요?"
  - WRONG: "Have 먹어요 김치 ever?" (mixing English word order). RIGHT: "김치를 먹어 본 적이 있어요?"
  - WRONG: forgetting the 본 — "제주도에 가 적이 있어요?" RIGHT: "제주도에 가 본 적이 있어요?" (the 본 is non-optional in this pattern).

### PatternLesson — `pattern.experience.have_you_ever.ko`

**Pattern template:** `{filler} V-아/어 본 적이 있어요?` — Have you ever V-ed (the filler)?

| Korean | Romanization | English | Gloss |
|---|---|---|---|
| 제주도에 가 본 적이 있어요? |  | Have you ever been to Jeju? | 제주도(Jeju)+에(to) \| 가(go)+ㅏ본(have-tried) \| 적이 있어요?(ever?) |
| 김치를 먹어 본 적이 있어요? |  | Have you ever eaten kimchi? | 김치(kimchi)+를(OBJ) \| 먹어(eat)+ㅓ본 \| 적이 있어요? |
| 한국 영화를 본 적이 있어요? |  | Have you ever watched a Korean movie? | 한국 영화(Korean movie)+를(OBJ) \| 본(watched) \| 적이 있어요? |

**Drills:**
- _Ask if I have ever been to {filler}._
  - Fillers: 제주도 (Jeju (island)) · 부산 (Busan) · 서울 (Seoul) · 미국 (United States) · 일본 (Japan)
- _Ask if I have ever eaten {filler}._
  - Fillers: 김치 (kimchi) · 비빔밥 (bibimbap) · 떡볶이 (tteokbokki) · 삼겹살 (samgyeopsal)
- _Ask if I have ever done: {filler}._
  - Fillers: 운전하다 (to drive) · 노래하다 (to sing) · 한국 영화 보다 (to watch a Korean movie)

**Production task:** I will say a place, food, or action. You ask me, in Korean, whether I have ever been there / eaten it / done it. Use the polite (-요) form.

### ClozeLesson — `cloze.experience.have_you_ever.ko`

| Sentence (blank = ___) | Answer | English | Distractors |
|---|---|---|---|
| 제주도에 가 ___ 적이 있어요? | **본** | Have you ever been to Jeju? | 간, 가서, 갈 |
| 김치를 ___ 본 적이 있어요? | **먹어** | Have you ever eaten kimchi? | 먹는, 먹은, 먹고 |
| 한국 영화를 본 적이 ___? | **있어요** | Have you ever watched a Korean movie? | 없어요, 돼요, 해요 |
| 운전 ___ 본 적이 있어요? | **해** | Have you ever driven? | 한, 하고, 하는 |

### StoryLesson — `story.experience.have_you_ever.cafe-chat.ko`

_dialogue: Cafe chat: weekend plans_

| Speaker | Korean | Romanization | English |
|---|---|---|---|
| 민지 | 주말에 뭐 할 거예요? |  | What are you doing this weekend? |
| Alex | 제주도에 가려고요. 가 본 적이 있어요? |  | I'm planning to go to Jeju. Have you ever been? |
| 민지 | 네, 두 번 가 봤어요! 흑돼지 먹어 본 적이 있어요? |  | Yes, I've been twice! Have you ever eaten heuk-dwaeji (Jeju black pork)? |
| Alex | 아니요, 아직 못 먹어 봤어요. 맛있어요? |  | No, I haven't tried it yet. Is it tasty? |
| 민지 | 정말 맛있어요. 꼭 먹어 보세요! |  | Really delicious. You must try it! |

**Comprehension Qs:** Where is Alex planning to go this weekend? / How many times has 민지 been there? / What food does 민지 recommend? / Has Alex eaten it before?

### VocabDeck — `vocab.experience.have_you_ever.slots.ko`

| Korean | English |
|---|---|
| 제주도 | Jeju (island) |
| 부산 | Busan |
| 서울 | Seoul |
| 미국 | United States |
| 일본 | Japan |
| 김치 | kimchi |
| 비빔밥 | bibimbap |
| 떡볶이 | tteokbokki |
| 삼겹살 | samgyeopsal |
| 운전하다 | to drive |
| 노래하다 | to sing |
| 한국 영화 보다 | to watch a Korean movie |

### PronunciationTask — `pronunciation.experience.have_you_ever.ko`

| Korean | Romanization | English | Focus sounds |
|---|---|---|---|
| 가 본 적이 있어요? |  | Have you ever been (there)? | 적 (jeok) — final ㄱ is unreleased — 있 (it) — final ㅆ becomes /t/ before pause |
| 먹어 본 적이 있어요? |  | Have you ever eaten (it)? | 먹어 — link 먹+어 as /meogeo/, do not insert a glottal break |
| 한국 영화를 본 적이 있어요? |  | Have you ever watched a Korean movie? | 영화 (yeonghwa) — careful with the ㅎ — 를 (reul) — flap r, not English /r/ |

### MinimalPairTask — `minimal-pair.experience.have_you_ever.k-series.ko`

| A | B | Contrast |
|---|---|---|
| 가다 | 카다 | lax ㄱ (g) vs aspirated ㅋ (k) — only the first is a real verb (to go); the second tests perception. |
| 적 | 책 | lax ㅈ (j) vs aspirated ㅊ (ch) — both are real words; "적" is the marker in our pattern, "책" means "book". |
| 본 | 뽄 | lax ㅂ (b) vs tense ㅃ (pp) — only the first is a real word in this pattern. |

---

## pattern.intention.going_to

**Gloss:** I will / am going to V  ·  **Level:** A1 / TOPIK 1  ·  **File:** `lessons/pattern.intention.going_to.js`

### ContrastNote — `contrast.intention.going_to.ko-en`

- **L2 pattern:** Korean: "V-(으)ㄹ 거예요"
- **Explanation:** English splits future into "will" (intent) and "going to" (plan). Korean uses one pattern for both: attach "-(으)ㄹ 거예요" to the verb stem. The "(으)" appears only if the stem ends in a consonant — vowel-ending stems take just "-ㄹ 거예요". This is the most common neutral-future form; learn it before "-(으)ㄹ게요" which carries a promise nuance.
- **Common mistakes (contain ✗/✓ Korean — check both):**
  - WRONG: "먹ㄹ 거예요" (forgetting the 으 link after a consonant-final stem). RIGHT: "먹을 거예요" — consonant + 을 거예요.
  - WRONG: "갈을 거예요" (adding 으 to a vowel-final stem). RIGHT: "갈 거예요" — vowel-ending stem 가- already glides into ㄹ.
  - WRONG: "거에요" (using ㅔ where Korean writes ㅖ). RIGHT: "거예요" — note the ㅖ spelling.

### PatternLesson — `pattern.intention.going_to.ko`

**Pattern template:** `{filler}-(으)ㄹ 거예요` — I will / am going to V

| Korean | Romanization | English | Gloss |
|---|---|---|---|
| 내일 한국에 갈 거예요. |  | Tomorrow I will go to Korea. | 내일(tomorrow) \| 한국에(to Korea) \| 갈 거예요(will-go) |
| 저녁에 한국어를 공부할 거예요. |  | I'm going to study Korean in the evening. | 저녁에(in the evening) \| 공부할 거예요(will-study) |
| 주말에 영화를 볼 거예요. |  | I'll watch a movie on the weekend. | 주말에(on the weekend) \| 볼 거예요(will-watch) |

**Drills:**
- _Say what you will do later: {filler}._
  - Fillers: 먹다 (to eat) · 가다 (to go) · 보다 (to see / watch) · 공부하다 (to study) · 자다 (to sleep) · 일하다 (to work)
- _Say you will go to {filler} tomorrow._
  - Fillers: 제주도 (Jeju (island)) · 서울 (Seoul) · 부산 (Busan)
- _Say you will eat {filler} for dinner._
  - Fillers: 김치 (kimchi) · 비빔밥 (bibimbap) · 삼겹살 (samgyeopsal)

**Production task:** I will say a verb or destination. Make a full sentence with "-(으)ㄹ 거예요" stating what you will do or where you will go. Add a time word (내일 / 주말에 / 저녁에) if you can.

### ClozeLesson — `cloze.intention.going_to.ko`

| Sentence (blank = ___) | Answer | English | Distractors |
|---|---|---|---|
| 내일 한국에 ___ 거예요. | **갈** | I will go to Korea tomorrow. | 가는, 간, 가서 |
| 저녁에 한국어를 공부___ 거예요. | **할** | I'm going to study Korean in the evening. | 하는, 한, 해서 |
| 주말에 영화를 볼 ___. | **거예요** | I'll watch a movie on the weekend. | 거에요, 게요, 봐요 |
| 저는 김치를 ___ 거예요. | **먹을** | I will eat kimchi. | 먹는, 먹어서, 먹어 |

### StoryLesson — `story.intention.going_to.weekend-plans.ko`

_dialogue: Weekend plans_

| Speaker | Korean | Romanization | English |
|---|---|---|---|
| 준호 | 주말에 뭐 할 거예요? |  | What are you going to do this weekend? |
| Alex | 친구하고 부산에 갈 거예요. |  | I'll go to Busan with a friend. |
| 준호 | 거기에서 뭐 먹을 거예요? |  | What will you eat there? |
| Alex | 회를 먹을 거예요. 그리고 바다도 볼 거예요. |  | I'll eat raw fish. And I'll also see the ocean. |

**Comprehension Qs:** Where will Alex go this weekend? / Who is going with Alex? / What two things will Alex do in Busan?

### VocabDeck — `vocab.intention.going_to.slots.ko`

| Korean | English |
|---|---|
| 먹다 | to eat |
| 가다 | to go |
| 보다 | to see / watch |
| 공부하다 | to study |
| 자다 | to sleep |
| 일하다 | to work |
| 읽다 | to read |
| 쓰다 | to write |
| 여행하다 | to travel |
| 요리하다 | to cook |

### PronunciationTask — `pronunciation.intention.going_to.ko`

| Korean | Romanization | English | Focus sounds |
|---|---|---|---|
| 갈 거예요 |  | I will go | 갈 거: ㄹ + ㄱ → ㄹ becomes silent-like, ㄱ becomes tense /kk/ → /gal-kkeoyo/ |
| 먹을 거예요 |  | I will eat | 먹을: ㄱ links to ㅡ → /meo-geul/ — 거예요: /kkeoyeyo/ — note the tense onset after ㄹ |
| 공부할 거예요 |  | I will study | 공부할: rolling, no break between 공부 and 할 |

### MinimalPairTask — `minimal-pair.intention.going_to.r-final.ko`

| A | B | Contrast |
|---|---|---|
| 갈 | 간 | final ㄹ vs final ㄴ — 갈 is the future modifier of 가다; 간 is past modifier. |
| 먹을 | 먹은 | ㅡㄹ vs ㅡㄴ — future "will eat" vs past "ate" modifier. |

---

## pattern.preference.want_to

**Gloss:** I want to V  ·  **Level:** A1 / TOPIK 1  ·  **File:** `lessons/pattern.preference.want_to.js`

### ContrastNote — `contrast.preference.want_to.ko-en`

- **L2 pattern:** Korean: "V-고 싶어요" — the verb itself carries the wanting
- **Explanation:** English uses an auxiliary ("want to") and the main verb stays bare ("eat"). Korean has no separate "want" verb in this construction — you take the verb stem and attach "-고 싶어요" directly. Word order flips: in English "want" comes first; in Korean the verb comes first, with the wanting tail at the end. The object marker -을/를 stays on the object as usual.
- **Common mistakes (contain ✗/✓ Korean — check both):**
  - WRONG: "저는 원해요 김치 먹다" (translating "want" as a separate verb). RIGHT: "김치를 먹고 싶어요" — the wanting is built into the verb form.
  - WRONG: "먹어 고 싶어요" (using the -아/어 form instead of the bare stem). RIGHT: "먹고 싶어요" — attach 고 to the bare stem 먹-, not to the conjugated form.
  - WRONG: "한국에서 가고 싶어요" (using -에서 for destination). RIGHT: "한국에 가고 싶어요" — destination takes -에, not -에서.

### PatternLesson — `pattern.preference.want_to.ko`

**Pattern template:** `{filler}-고 싶어요` — I want to V

| Korean | Romanization | English | Gloss |
|---|---|---|---|
| 김치를 먹고 싶어요. |  | I want to eat kimchi. | 김치(kimchi)+를(OBJ) \| 먹(eat)+고 싶어요(want-to) |
| 한국에 가고 싶어요. |  | I want to go to Korea. | 한국(Korea)+에(to) \| 가(go)+고 싶어요 |
| 한국어를 배우고 싶어요. |  | I want to learn Korean. | 한국어(Korean)+를(OBJ) \| 배우(learn)+고 싶어요 |

**Drills:**
- _Tell me you want to {filler}._
  - Fillers: 먹다 (to eat) · 마시다 (to drink) · 자다 (to sleep) · 공부하다 (to study)
- _Tell me you want to go to {filler}._
  - Fillers: 제주도 (Jeju (island)) · 부산 (Busan) · 서울 (Seoul)
- _Tell me you want to eat {filler}._
  - Fillers: 김치 (kimchi) · 비빔밥 (bibimbap) · 떡볶이 (tteokbokki)

**Production task:** I will say a verb, a place, or a food. Tell me, in Korean polite form, that you want to do that thing / go there / eat it. Use "-고 싶어요".

### ClozeLesson — `cloze.preference.want_to.ko`

| Sentence (blank = ___) | Answer | English | Distractors |
|---|---|---|---|
| 김치를 먹___ 싶어요. | **고** | I want to eat kimchi. | 아, 어, 을 |
| 한국에 ___ 싶어요. | **가고** | I want to go to Korea. | 가서, 가는, 갈 |
| 영화를 보고 ___. | **싶어요** | I want to watch a movie. | 있어요, 돼요, 봐요 |
| 한국어를 ___ 싶어요. | **배우고** | I want to learn Korean. | 배워서, 배운, 배웠 |

### StoryLesson — `story.preference.want_to.travel-plans.ko`

_dialogue: Travel plans_

| Speaker | Korean | Romanization | English |
|---|---|---|---|
| 수진 | 여행 가고 싶어요? |  | Do you want to travel? |
| Alex | 네, 한국에 가고 싶어요. 한국어도 배우고 싶어요. |  | Yes, I want to go to Korea. I also want to learn Korean. |
| 수진 | 뭐 먹고 싶어요? |  | What do you want to eat? |
| Alex | 삼겹살을 먹고 싶어요. 막걸리도 마시고 싶어요! |  | I want to eat samgyeopsal. I also want to drink makgeolli! |

**Comprehension Qs:** Where does Alex want to go? / What does Alex want to learn? / Name two things Alex wants to eat or drink.

### VocabDeck — `vocab.preference.want_to.slots.ko`

| Korean | English |
|---|---|
| 먹다 | to eat |
| 마시다 | to drink |
| 가다 | to go |
| 보다 | to see / watch |
| 배우다 | to learn |
| 자다 | to sleep |
| 공부하다 | to study |
| 사다 | to buy |
| 여행하다 | to travel |
| 쉬다 | to rest |

### PronunciationTask — `pronunciation.preference.want_to.ko`

| Korean | Romanization | English | Focus sounds |
|---|---|---|---|
| 먹고 싶어요 |  | I want to eat | 먹고: the ㄱ in 먹 assimilates with ㄱ in 고 → tense /kk/ — 싶어요: 싶 ends in ㅍ, links to 어요 → /sipeoyo/ |
| 가고 싶어요 |  | I want to go | 가고: smooth /gago/ — no break between 가 and 고 |
| 배우고 싶어요 |  | I want to learn | 배우: diphthong, glides /bae-u/ |

### MinimalPairTask — `minimal-pair.preference.want_to.s-series.ko`

| A | B | Contrast |
|---|---|---|
| 싶다 | 십다 | ㅅ vs ㅆ — only 싶다 (to want) is a real word; 십다 tests if you hear the lax/tense distinction. |
| 가다 | 카다 | lax ㄱ (g) vs aspirated ㅋ (k) — 가다 means "to go"; the second is not a verb. |

---

## pattern.reason.because

**Gloss:** Because V/A, ...  ·  **Level:** A2 / TOPIK 2  ·  **File:** `lessons/pattern.reason.because.js`

### ContrastNote — `contrast.reason.because.ko-en`

- **L2 pattern:** Korean: "[reason]-아/어서 [result]" — reason always comes first
- **Explanation:** Korean does not put "because" in a separate word. You take the reason verb / adjective, conjugate it to -아/어 form, and attach 서. The reason clause ALWAYS comes first. Critical rule: -아/어서 cannot take past or future tense on the reason clause. To say "because I WAS tired", the reason verb still goes in plain -아/어서 form — the tense lives on the main verb. Also: do not use -아/어서 with commands or suggestions — use -(으)니까 for those.
- **Common mistakes (contain ✗/✓ Korean — check both):**
  - WRONG: "어제 피곤했어서 못 갔어요" (past tense on the reason). RIGHT: "어제 피곤해서 못 갔어요" — past tense stays on the main verb only.
  - WRONG: "비가 와서 우산을 가져 가세요!" (using -아/어서 with a command). RIGHT: "비가 오니까 우산을 가져 가세요!" — commands take -(으)니까.
  - WRONG: "배고프어서" (mechanically adding 어서). RIGHT: "배고파서" — 배고프다 conjugates 으-deletion + 아 vowel harmony.

### PatternLesson — `pattern.reason.because.ko`

**Pattern template:** `{filler}-아/어서, ...` — Because [reason], [result]

| Korean | Romanization | English | Gloss |
|---|---|---|---|
| 피곤해서 일찍 잤어요. |  | I went to bed early because I was tired. | 피곤하(tired)+아/어서 \| 일찍(early) \| 잤어요(slept) |
| 배가 고파서 김밥을 먹었어요. |  | I ate kimbap because I was hungry. | 배고프(hungry)+아서 \| 김밥(kimbap)+을 \| 먹었어요(ate) |
| 비가 와서 집에 있어요. |  | It's raining, so I'm staying home. | 비가(rain) 오(come)+아서 \| 집에(at home) \| 있어요(am) |

**Drills:**
- _I will give you a state ({filler}). Give a reason-clause with -아/어서 and any natural result._
  - Fillers: 피곤하다 (tired) · 배고프다 (hungry) · 바쁘다 (busy) · 아프다 (sick) · 행복하다 (happy)
- _Use {filler} as the reason; finish with any result._
  - Fillers: 일하다 (to work) · 공부하다 (to study) · 운동하다 (to exercise)
- _Start with "{filler}-아/어서…" then say a consequence._
  - Fillers: 비가 오다 (rain) · 눈이 오다 (snow)

**Production task:** I will say a reason word (tired / hungry / rain / etc.). Make a "because" sentence: reason + 아/어서 + a natural result. Keep tense on the main verb, not the reason clause.

### ClozeLesson — `cloze.reason.because.ko`

| Sentence (blank = ___) | Answer | English | Distractors |
|---|---|---|---|
| 피곤___ 일찍 잤어요. | **해서** | I went to bed early because I was tired. | 했어서, 하니까, 하고 |
| 배가 ___ 김밥을 먹었어요. | **고파서** | I was hungry, so I ate kimbap. | 고프어서, 고프니까, 고픈데 |
| 비가 ___ 집에 있어요. | **와서** | It's raining so I'm staying home. | 오아서, 왔어서, 오니까 |
| 바빠서 못 ___. | **갔어요** | I was busy, so I couldn't go. | 갔어서요, 가서요, 가요 |

### StoryLesson — `story.reason.because.late-text.ko`

_dialogue: Sorry I am late_

| Speaker | Korean | Romanization | English |
|---|---|---|---|
| 하늘 | 왜 늦었어요? |  | Why are you late? |
| Alex | 미안해요. 비가 너무 많이 와서 지하철이 늦었어요. |  | Sorry. It was raining so heavily that the subway was late. |
| 하늘 | 괜찮아요. 저도 어제 바빠서 못 왔어요. |  | It's okay. I was busy yesterday so I couldn't come either. |
| Alex | 아, 그래요? 그럼 오늘 같이 저녁 먹어요. |  | Oh, really? Then let's eat dinner together today. |

**Comprehension Qs:** Why was Alex late? / Why was 하늘 busy yesterday? / What does Alex suggest at the end?

### VocabDeck — `vocab.reason.because.slots.ko`

| Korean | English |
|---|---|
| 피곤하다 | tired |
| 배고프다 | hungry |
| 바쁘다 | busy |
| 아프다 | sick |
| 행복하다 | happy |
| 비가 오다 | rain |
| 눈이 오다 | snow |
| 일하다 | to work |
| 공부하다 | to study |

### PronunciationTask — `pronunciation.reason.because.ko`

| Korean | Romanization | English | Focus sounds |
|---|---|---|---|
| 피곤해서 |  | because (I am) tired | 피곤: /pi-gon/ — 해서: /hae-seo/ — link 해 to 서 |
| 배가 고파서 |  | because (I am) hungry | 고파서: 으-irregular gives /go-pa-seo/ |
| 비가 와서 |  | because it is raining | 와서: /wa-seo/ — careful with the ㅘ glide |

### MinimalPairTask — `minimal-pair.reason.because.aspirated.ko`

| A | B | Contrast |
|---|---|---|
| 피곤 | 비곤 | aspirated ㅍ vs lax ㅂ — only 피곤 (tired) is a real word. |
| 바빠서 | 바파서 | tense ㅃ vs aspirated ㅍ in 바쁘다 (busy) → 바빠서. |

---
