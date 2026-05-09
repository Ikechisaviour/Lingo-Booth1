# Merged Korean Curriculum (Levels 1–3)

This document is the source of truth for what gets built into the **class area**
of the app. It merges the contents of every Korean textbook the user has
shared so far, deduplicates overlapping topics, and assigns each book to the
right place — lesson curriculum vs reference material.

**Scope:** what to build, in what order, sourced from where. Not the actual
lesson text — that lives in `backend/textbookLessons/<unit>.js`.

**Authoring source:** lessons are AI-authored from the textbook metadata
(table of contents, scope-and-sequence, grammar pattern lists). They are
faithful to the topic and grammar pattern but are not transcriptions of the
books.

**Review cadence:** by cluster (3–5 related units), per Phase 4 below.

## Source books and how each one is used

| Book | Role | Why |
|---|---|---|
| 1A — School-student Level 1 (16 lessons) | **Lesson curriculum** | Foundation Korean for school-aged learners |
| 1B — Multicultural Korean Level 1 (16 lessons) | **Lesson curriculum** | Foundation Korean for multicultural learners |
| 2A — Migrant-worker Korean (12 chapters) | **Lesson curriculum** | Adult workplace Korean — Track 2-Adult |
| 2B — Topic vocabulary (11 chapters) | **Reference pool** | Word lists by theme — not a lesson sequence |
| 2C — Level 2 workbook (9 units + 3 reviews) | **Enriches Track 2-Thematic** | Adds Expression Practice + reviews |
| 2D — Level 2 main textbook (9 units, 10-column scope) | **Lesson curriculum** | Track 2-Thematic core |
| 3A — TTMIK Workbook Level 3 (30 grammar lessons) | **Lesson curriculum** | Grammar-pattern lessons |
| 3B — Parts-of-speech vocabulary (17 chapters) | **Reference pool** | Reference dictionary |
| 3C — 쏙쏙 Day 50 + LKWB KIIP vocabulary | **Reference pool** | Spaced-repetition + KIIP-aligned reference |

Books 1A and 1B have heavy topic overlap; their unique contributions are
merged into one Level 1 sequence below. Books 2A and 2D target different
audiences and are exposed as two parallel tracks.

## Level 1 — Foundation Korean (21 units)

Sources: 1A ⊕ 1B. Topics that appear in both books are merged; both books
contribute vocabulary and example dialogues so the AI tutor can adapt for
school-aged or multicultural learners.

| # | Title | Themes / functions | Source |
|---|---|---|---|
| F | Hangul foundation (모음 I, 모음 II, 받침) | Reading & writing 한글 | 1A only |
| 1 | Greetings & self-introduction | Names, nationality, 입니다/예요/이에요 | 1A·4 + 1B·1 |
| 2 | Classroom & everyday objects | 이/가, 이거/그거/저거, 사물 | 1A·5 + 1B·2 |
| 3 | Locations & directions | 어디에 있어요?, 위·아래·옆·앞·뒤 | 1A·6 + 1B·3 |
| 4 | Daily routines | -아/어요, 일상 동사 | 1A·7 + 1B·4 |
| 5 | Life in Korea & first impressions | -ㅂ/습니다, opinions about Korea | 1B·5 |
| 6 | Dates & calendar | 월·일, 요일, 생일 | 1B·6 |
| 7 | Going places (now & later) | 가다, -(으)러, 미래 -(으)ㄹ 거예요 | 1A·8 + 1B·10 |
| 8 | Shopping & bargaining | 가격, 좀 비싸요, 깎아 주세요 | 1A·9 + 1B·8 |
| 9 | Ordering food | 식당 표현, 인분, 주세요 | 1A·12 + 1B·7 |
| 10 | Weather & preferences | 계절, -아/어서 (cause), 좋아하다/싫어하다 | 1A·10 |
| 11 | Scheduling & invitations | 시간, -(으)ㄹ까요?, 같이 | 1A·11 |
| 12 | Past activities | -았/었어요, 주말 활동 | 1B·9 |
| 13 | Transportation | 교통수단, 어떻게 가요? | 1B·11 |
| 14 | Ability | -(으)ㄹ 수 있다/없다, 못 | 1B·12 |
| 15 | Phone & taking messages | 전화, 'ㄹ' 탈락, 존댓말 entry | 1A·13 |
| 16 | Clubs & leisure | 동아리, 여가 활동, -지 못하다 | 1A·14 |
| 17 | Sending & post office | 우체국, -에게/한테, -고 싶어요 | 1B·13 + 1B·14 |
| 18 | Health & body | 신체, 증상, -아/어도 되다 | 1B·15 |
| 19 | Korean holidays | 명절, 추석, 송편, -(으)ㄹ 거예요 (intent) | 1A·15 |
| 20 | Suggestions & plans | -(으)ㄹ까요?, 약속 정하기 | 1B·16 |
| 21 | Hopes & dreams | -았/었으면 좋겠다, 미래 직업 | 1A·16 |

## Level 2 — Intermediate (two parallel tracks)

The migrant-worker book and the main thematic book don't share a learner
profile. Merging them into one ordered sequence would make every unit feel
slightly wrong for both audiences. Better to expose them as parallel tracks
the learner picks at start.

### Track 2-Adult — Workplace & Living in Korea (12 units + appendix)

Source: Book 2A.

| # | Title | Function |
|---|---|---|
| 1 | 안녕하세요? | Workplace greetings (formal register) |
| 2 | 저는 9시에 출근해요 | Work schedule |
| 3 | 돼지고기를 안 먹어요 | Food preferences & restrictions |
| 4 | 버스를 어디서 타나요? | Commuting |
| 5 | 얼마예요? | Buying in adult context |
| 6 | 기숙사 생활이 어때요? | Dormitory life |
| 7 | 안전모를 벗지 마세요 | Workplace safety, prohibitions |
| 8 | 어디가 아파요? | Workplace medical situations |
| 9 | 주말에 뭐해요? | Weekend conversation |
| 10 | 잘 지켜야 돼요 | Rules and obligations |
| 11 | 새 일자리를 찾고 있어요 | Job hunting |
| 12 | 함께 살 집이 필요해요 | Housing search |
| Appx | Forms & contracts | 높임말, 맞춤법, 통합신고서, 부동산 임대차계약서 |

### Track 2-Thematic — Academic Intermediate (9 units + 3 reviews)

Source: Book 2D ⊕ Book 2C (workbook). The workbook contributes Expression
Practice (functional language goals per unit) and three review units;
the main book contributes the full 10-column scope. **Unit 1 already
exists in the app.**

For each unit the activities cover: Speaking (말하기), Reading and Speaking
(읽고 말하기), Listening and Speaking (듣고 말하기), Reading and Writing
(읽고 쓰기), Task (과제), Vocabulary (어휘), Grammar and Expression (문법과
표현), Pronunciation (발음), Culture Note (문화 산책).

| # | Title | Vocabulary | Pronunciation | Culture Note | Expression Practice (workbook) |
|---|---|---|---|---|---|
| 1 | 적성과 진로 (Aptitude and career) | 능력, 적성, ~적 | 경음화 '여권' | Colleges and majors in Korea | Seeking advice + Giving advice |
| 2 | 건강한 삶 (Healthy life) | 증상, 과- | 경음화 '손가락' | Oriental medicine clinic | Expressing degree + Habitual circumstances |
| 3 | 스포츠의 세계 (World of sports) | 운동 경기, 승부와 상황 | 경음화 '바쁠걸요' | Korean wrestling 씨름 | Expressing certainty + Disagreeing with expectations |
| R1 | 복습 1 (covers 1–3) | mixed | — | — | mixed |
| 4 | 남자와 여자 (Men and women) | 태도와 불만, 능력, -스럽다 | Intonation of '-(으)ㄹ 게 뻔하다' | Job of men and women | Predicting negative outcomes + Expressing dissatisfaction |
| 5 | 속담과 관용어 (Proverbs and idioms) | 속담, 관용어 | Final ㄹㄱ, ㄹㅁ pronunciation | Main characters of proverbs | Quoting + Consoling |
| 6 | 공연과 축제 (Performances and festivals) | 감상, 평가, -거리 | Intonation of '-기는요' | Korea's Arirang | Introducing + Rating/assessing |
| R2 | 복습 2 (covers 4–6) | mixed | — | — | mixed |
| 7 | 옳고 그름 (Right and wrong) | 의견, 행동, -질 | Liquidization '논란' | Sinmungo: petition drum | Presenting opinions + Explaining with examples |
| 8 | 흥미로운 세상 (Intriguing world) | 문화, 특징, -별 | Aspiration '비롯해서' | Jeju-do pole-fence gates | Asking questions + Replying |
| 9 | 한국의 대중문화 (Korea's popular culture) | 기분, 작품 설명, -히 | Intonation of '-거든' | K-Pop | Interview questions + Interview answers |
| R3 | 복습 3 (covers 7–9) | mixed | — | — | mixed |

Grammar patterns per unit are listed in the project notes; they're long and
will be authored directly into the lesson data files rather than restated
here.

## Level 3 — Advanced Grammar Patterns

Source: Book 3A (TTMIK Workbook Level 3). 30 lessons + 3 culture blogs.
Patterns are grouped into clusters so the AI tutor can teach related forms
together. Each cluster is one Lesson document; its `content[]` items are the
individual patterns.

| Cluster | Lessons | Patterns |
|---|---|---|
| Connectors | 2, 7, 12, 15, 21 | -고 · -아/어/여서 · 그래도 · 그러면/그럼 · -는/은/ㄴ데 |
| Tense & Sequence | 6, 10, 19 | -(으)ㄹ 거예요 vs -(으)ㄹ게요 · -기 전에 · 다음에/후에/뒤에 |
| Modality & Possibility | 4, 17, 18, 20, 22 | -(으)ㄹ까요? · 위해(서) · -밖에 + 부정형 · -아/어/여도 · -(으)ㄹ 수도 있어요 |
| Comparison & Resemblance | 1, 5, 8, 9 | 너무 · -쯤/정도/약 · 같다 · -(으)ㄴ/는/(으)ㄹ 것 같아요 |
| Modifiers | 13, 14 | adjectives + -(으)ㄴ + 명사 · verbs + -는 + 명사 |
| Position & Direction | 3 | 앞·뒤·옆·위·밑에 |
| Endings & Register | 16, 25, 27, 28 | 청유형 -아/어/여요 · -네요 · 반말/존댓말 · -자 (반말 청유형) |
| Word Builders (Hanja) | 23, 30 | 학(學) · 실(室) |
| Irregulars | 11, 24, 26, 29 | ㅂ · 르 · ㄷ · ㅅ |
| Culture Blogs | — | Daehakro · Board Game Cafes · Chuseok |

## Shared Reference Pools

These are dictionaries / reference works, not lesson sequences. They support
every level by giving the AI tutor a richer vocabulary bank and example
sentences when explaining. Each pool is a `VocabPool` document referenced
from any number of Lessons via `relatedPools[]`.

| Pool | Source | What it provides |
|---|---|---|
| `topic-people` | Book 2B ch.1 | 사람 — people-related vocabulary |
| `topic-daily-life` | Book 2B ch.2 | 일상생활 |
| `topic-health` | Book 2B ch.3 | 건강 |
| `topic-food` | Book 2B ch.4 | 음식 |
| `topic-family` | Book 2B ch.5 | 가정 |
| `topic-relationships` | Book 2B ch.6 | 인간관계 |
| `topic-school` | Book 2B ch.7 | 학교와 수업 |
| `topic-economy` | Book 2B ch.8 | 경제 |
| `topic-society` | Book 2B ch.9 | 사회 |
| `topic-culture` | Book 2B ch.10 | 문화 |
| `topic-proverbs-idioms` | Book 2B ch.11 | 속담·관용어·한자성어·의태어·의성어 |
| `pos-verbs-1` … `pos-verbs-3` | Book 3B ch.1–3 | 동사 by frequency tier |
| `pos-nouns-1` … `pos-nouns-3` | Book 3B ch.4–6 | 명사 by frequency tier |
| `pos-adjectives-1` … `pos-adjectives-3` | Book 3B ch.7–9 | 형용사 |
| `pos-adverbs-1` … `pos-adverbs-3` | Book 3B ch.10–12 | 부사 |
| `pos-mimetic-words` | Book 3B ch.13 | 의성어·의태어 |
| `pos-prefix-suffix` | Book 3B ch.14 | 접두사·접미사 |
| `pos-proverbs` | Book 3B ch.15 | 속담 |
| `pos-idioms` | Book 3B ch.16 | 관용어 |
| `pos-hanja-phrases` | Book 3B ch.17 | 한자성어 |
| `kiip-level-0` … `kiip-level-5` | Book 3C (LKWB) | KIIP exam vocabulary by level |
| `srs-day50-nouns` etc. | Book 3C (쏙쏙) | Spaced-repetition vocabulary by part of speech |

## Schema (set in Phase 1)

The class area uses these models. Each lesson lives in a `Course`, declares
its `lessonType`, optionally lists `expressionPractice` goals, optionally
references `relatedPools` for vocabulary, and (for review lessons)
references its source units via `reviewOf`.

- `Course { level, track, title, description, lessons: [{position, lessonId, kind}] }`
- `Lesson` adds: `lessonType`, `expressionPractice[]`, `reviewOf[]`, `relatedPools[]`
- `VocabPool { key, title, source, language, items[] }`

## Build order

Per the agreed plan:

1. Phase 0 — this document.
2. Phase 1 — schema additions.
3. Phase 2 — backfill Unit 1's Expression Practice.
4. Phase 3 — start authoring `VocabPool` documents (parallel to authoring).
5. Phase 4 — author lessons in this order, reviewing in clusters of 3–5:
   - Level 1 Foundation (Hangul) → cluster 1
   - Level 1 Units 1–6 → cluster 2
   - Level 1 Units 7–14 → cluster 3
   - Level 1 Units 15–21 → cluster 4
   - Level 2 Track-Thematic Units 2–4 + 복습 1 → cluster 5
   - Level 2 Track-Thematic Units 5–6 + 복습 2 → cluster 6
   - Level 2 Track-Thematic Units 7–9 + 복습 3 → cluster 7
   - Level 2 Track-Adult Units 1–4 → cluster 8
   - Level 2 Track-Adult Units 5–8 → cluster 9
   - Level 2 Track-Adult Units 9–12 + appendix → cluster 10
   - Level 3 grammar clusters (10 cluster lessons) → clusters 11–12
6. Phase 5 — Class hub redesign (Level → Track → Unit browse).

## Out of scope (for now)

- Audio recording / TTS quality. Current TTS handles all items adequately.
- Per-learner adaptive ordering. Lessons are taken in the listed sequence.
- Localized translations of lesson titles into non-English native languages.
  The `Translation` model already handles this for existing lessons; same
  pattern applies here.
- The `Exercise` quiz path. That's a separate surface (see project memory
  on Class vs Exercise).
