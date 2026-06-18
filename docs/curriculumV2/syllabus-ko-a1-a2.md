# Korean Curriculum v2 — Syllabus A1 + A2

**Status:** Draft scaffold, awaiting review.
**Target:** CEFR A1 + A2 (≈ TOPIK 1 + early TOPIK 2). This is the v1.0 "complete Korean" definition.
**Owner:** TBD. This document is the spec; lesson files in `backend/curriculum/lessons/` are the implementation.

---

## Framing

CEFR is the internal anchor (portable across other languages later). Korean learners see TOPIK labels in the UI. Every concept in `schema/concepts.js` carries both tags:

```js
{ id: 'pattern.…', cefr: 'A1', topik: 1, ... }
```

| Internal level (existing `LEVEL_ALLOWS_DIFFICULTY`) | CEFR  | TOPIK | Roughly       |
| --------------------------------------------------- | ----- | ----- | ------------- |
| `beginner`                                          | A1    | 1     | "Survival"    |
| `beginner` (upper)                                  | A2    | 2     | "Get-by"      |
| `intermediate`                                      | B1    | 3     | (out of scope) |
| `intermediate` (upper)                              | B2    | 4     | (out of scope) |

Scope cap for this milestone: **A1 + A2 only.** B1+ is a follow-up.

---

## What's already in `backend/curriculum/lessons/`

6 patterns, all `beginner`, all in the spirit of A2:

| Concept                              | CEFR | TOPIK | Function    |
| ------------------------------------ | ---- | ----- | ----------- |
| pattern.experience.have_you_ever     | A2   | 2     | experience  |
| pattern.preference.want_to           | A1   | 1     | preference  |
| pattern.intention.going_to           | A1   | 1     | intention   |
| pattern.ability.can_cannot           | A1   | 1     | ability     |
| pattern.reason.because               | A2   | 2     | reason      |
| pattern.condition.if                 | A2   | 2     | condition   |

These six need:
- `cefr` and `topik` fields back-filled on their `concepts.js` entries.
- An audit pass for accuracy (any honorific/conjugation footguns).

---

## Functional spine (A1 + A2)

The planner already orders by `function`. Coverage targets — at least 1 pattern per cell, ideally 2–3:

| Function           | A1 patterns                                                | A2 patterns                                              |
| ------------------ | ---------------------------------------------------------- | -------------------------------------------------------- |
| **identification** | 이에요/예요 (copula), 입니다 (formal), 이 / 가 (subject)        | 인 것 같다 (looks like)                                  |
| **topic / focus**  | 은 / 는, 도 (also), 만 (only)                              | —                                                        |
| **location**       | 에 (at/to), 에서 (from), 있다/없다 (have/not), 어디 (where) | —                                                        |
| **time**           | 에 (time particle), 언제, 지금 / 오늘, 몇 시                | 기 전에 / ㄴ 후에 (before/after), 동안 (during), ㄹ 때    |
| **negation**       | 안 (don't), 못 (can't, simple)                             | 지 않다 (long-form), 지 마세요 (don't do)                |
| **politeness**     | 아 / 어요, ㅂ / 습니다, 세요 (honorific verb endings)        | (시) honorific infix, special verbs (드시다, 주무시다)    |
| **questions**      | 누가, 무엇, 어디, 언제, 왜, 어떻게, 몇                       | ㄹ까요? (suggestion-question)                            |
| **quantity / counters** | sino numbers (일이삼…), 몇 + counter, 개 / 명 / 권 / 마리 | native numbers (하나둘…), age 살, 시 vs 분                |
| **ability**        | ㄹ 수 있다 / 없다 ✅                                        | ㄹ 줄 알다 / 모르다 (know how)                            |
| **intention**      | ㄹ 거예요 ✅, 고 싶다 ✅                                     | 으려고 하다, 기로 하다                                    |
| **experience**     | —                                                          | 아 / 어 본 적이 있다 ✅                                   |
| **reason / cause** | 왜냐하면 (intro form)                                       | 아 / 어서 ✅, 기 때문에                                   |
| **condition**      | —                                                          | (으)면 ✅, ㄹ까 봐                                       |
| **comparison**     | —                                                          | 보다, 더, 가장 / 제일                                     |
| **connectives**    | 그리고, 그런데, 하지만                                       | 아 / 어서 (sequence), 면서, 거나 / 나                     |
| **commands / requests** | 세요, 주세요                                            | 아 / 어 주세요, ㅂ시다 (let's)                            |
| **modality**       | —                                                          | ㄹ 것 같다 (look like), 아 / 어야 하다 (must), 아 / 어도 되다 (may) |
| **reported speech** | —                                                          | 다 / 라 / 자 / 냐고 하다 (basic)                          |
| **deixis**         | 이 / 그 / 저 + thing (이것/그것/저것)                        | —                                                        |
| **plural / approx** | 들 (plural marker)                                         | 쯤, 정도 (approximately)                                  |

**Rough total:** ~60–80 grammar patterns once filled in. Match the existing 6 against this table during the first review pass and we'll know exactly what's missing.

---

## Vocab scope

A1: ~500–800 high-frequency lexemes
A2: cumulative ~1500

Existing 30 lexemes in `schema/concepts.js` are a thin slice. We'll need to:
- Pull the TOPIK 1 + TOPIK 2 official word lists as a reference (~1500 total).
- Filter to a core 1200 (drop archaic, regional, or obscure entries).
- Group by semantic domain (food, family, places, body, time, weather, transportation, work, school, daily routine, emotions, common verbs, common adjectives, numbers, time expressions, particles, common adverbs).
- Each VocabDeck lesson holds ~10–15 lexemes from one domain; ~80–100 vocab decks total.

---

## Lesson coverage per concept

Every concept gets the full 7-type treatment (as the existing 6 patterns do):

1. **ContrastNote** — L1↔L2 grammar contrast + common-mistake list.
2. **PatternLesson** — 3–5 anchored exemplars, 3–5 templated drill slots.
3. **Cloze** — 4–6 fill-in items, mix of supported and from-scratch production.
4. **Story** — 4–8-turn dialogue (or short narrative) using the pattern in context.
5. **VocabDeck** — Filler lexemes used by the drills/story (5–15 items).
6. **PronunciationTask** — Focus sounds the pattern surfaces (e.g. ㄹ vs ㄴ for ㄹ-irregulars).
7. **MinimalPair** — Listening discrimination for nearby sounds (ㅓ vs ㅗ, plain vs aspirated stops, etc.).

Estimated content volume for A1 + A2:
- ~80 patterns × 7 lesson types = **~560 lessons**
- Plus ~80 standalone VocabDeck lessons (one per domain).
- Total: **~640 lesson files**, each 200–400 lines.

---

## Authoring workflow (proposed)

1. **Spec round** — flesh out this document into a concrete pattern-by-pattern table with: id, function, prereqs, target sentence template, 3 example sentences, common-mistake list. Owner: native-speaker reviewer + me. Goal: 80 lines of accuracy-checked spec per pattern.
2. **AI drafting** — `backend/curriculum/ai.js` (currently a stub) becomes a CLI: `node curriculum/ai.js draft pattern.foo.bar > lessons/pattern.foo.bar.js`. Prompts include the schema, the spec row, and the existing 6 lessons as few-shot examples.
3. **Human review** — every draft reviewed by a native speaker for accuracy (particles, conjugation, honorific level, naturalness). Korean is unforgiving here.
4. **Batch commits** — ~10 patterns per PR. Each PR's smoke-test: `/learn/v2` planner picks up the new concepts; the resulting session is sensible.
5. **Backlog blockers stay separate** — Whisper ASR, integration tests, session recovery are tracked in `docs/curriculumV2/backlog.md` and don't block content authoring.

---

## Settled decisions

1. **Word-list source: NIIED's TOPIK official lists.** Canonical source for both A1 (TOPIK 1) and A2 (TOPIK 2) vocab. Pull the published lists, filter to ~1200 high-frequency items, then group by semantic domain. Other lists (Sejong, TTMIK) are only consulted when NIIED is missing a high-frequency item that learners obviously need.

2. **Hangul: separate onboarding flow, but always reachable later.**
   - First-time learners hit a Hangul onboarding route (e.g. `/learn/v2/hangul`) *before* the A1 planner starts. Completed status is persisted on the user (`hangulCompleted: true`).
   - Once completed, A1 patterns become the default destination on `/learn/v2`.
   - Hangul stays linkable from: (a) the curriculum-version settings card, (b) a "Hangul refresher" tile inside the v2 session shell, (c) a deep link `/learn/v2/hangul` users can bookmark. Re-entry is non-destructive — replaying onboarding doesn't reset their A1 progress.
   - Authoring: Hangul lessons aren't `pattern.*` concepts; they live in a new `backend/curriculum/hangul/` folder with their own lightweight schema (consonant, vowel, batchim block, syllable structure). They're outside the planner's normal sequencing.

3. **Romanization: per-lesson toggle (default OFF).**
   - Every lesson page renders a single "Show romanization" toggle in the header. State persists in `localStorage` (`showRomanization=true|false`) so it's sticky across sessions.
   - Default is OFF — keep learners attached to Hangul. Toggle ON exposes Revised Romanization (RR) underneath Hangul. Lesson copy carries `romanization` fields next to `target` so the toggle is purely a CSS show/hide; no re-fetch.
   - When the user picks ON, also accept McCune-Reischauer as a fallback display style behind a small dropdown (most academic resources still use M-R) — but RR is the default rendering.

4. **ConjugationDrill as a future lesson type — deferred.** Confirmed. For A1+A2 we still embed conjugation work inside `PatternLesson.drills` (slot fillers cover the conjugation variants we need), and we tag the relevant patterns with `requiresConjugation: ['ㅂ-irregular', 'ㄷ-irregular', ...]` so a future `ConjugationDrill` lesson type can pick them up retroactively. The schema change for the new lesson type is a follow-up PR, not a blocker for content authoring.

5. **CulturalNote folded into ContrastNote.** Confirmed. Every `ContrastNote` lesson has an optional `culturalNote` field (free-text + a short illustrative example). Examples: age-counting (Korean vs Western age), family-vocabulary-by-relationship (할머니 vs 외할머니), bowing/honorific situational triggers. We avoid creating a separate lesson type.

---

## Roadmap-relevant follow-ups noted

- **Hangul onboarding feature** (must ship alongside the first A1 lesson batch — otherwise new learners hit grammar with no script knowledge):
  - New collection or User field: `hangulProgress: { jamoCompleted: [...], onboardingCompletedAt: Date|null }`.
  - New route `/learn/v2/hangul` with an interactive jamo learner (consonants → vowels → batchim → syllable assembly). Reuse the v2 lesson-type renderers where possible (e.g. PronunciationTask for jamo sounds, MinimalPair for ㅂ/ㅍ/ㅃ contrasts).
  - Gate on `/learn/v2`: if `!hangulProgress.onboardingCompletedAt`, redirect to onboarding before the planner runs.
  - Always-accessible link in the v2 SessionShell header ("Review Hangul").

- **Romanization toggle**:
  - Add `romanization` field to lesson JSON for every line of Korean text (anchor, drill, cloze item, story turn, vocab item).
  - SessionShell-level toggle + per-lesson CSS handling.
  - Default OFF. Use Revised Romanization. McCune-Reischauer as an alt-display dropdown.

- **`ConjugationDrill` schema** — defer. When we add it, plan to back-fill existing PatternLesson drills with `conjugationFocus` tags so the new lesson type can find them.

- **CulturalNote**: extend `ContrastNote` schema with optional `culturalNote: { text, example }`. Tiny change, ship with the existing 6 lessons' audit pass.

---

## Next concrete steps (in order)

**1. Back-fill the existing 6 concepts** with `cefr` + `topik` fields (1 small commit, no risk).

**2. Schema extensions for the new fields** (one commit):
- `ContrastNote.culturalNote?` (optional).
- All lesson types: every Korean-text-bearing field gains a paired `romanization?` (optional — drafts can ship without it; the toggle just won't show that line).
- Concepts: optional `requiresConjugation: string[]` tag for future ConjugationDrill harvesting.

**3. Hangul onboarding** (medium PR): User field, new route, lightweight authoring of consonants + vowels + batchim + syllable assembly. ~10 jamo-lesson files + an entry page.

**4. Build the AI drafting CLI** at `backend/curriculum/ai.js`. Takes `--concept pattern.foo.bar --spec syllabus-row.json` and emits a draft lesson file (all 7 lesson types). Few-shot prompt with the existing 6 lessons. NIIED vocab list lookup baked in.

**5. First authoring batch: A1 identification + location + time core** (~12 patterns × 7 lesson types = ~84 files):
- 이에요/예요 (copula), 입니다 (formal copula)
- 은/는 (topic), 이/가 (subject), 을/를 (object)
- 에 (location/time), 에서 (origin)
- 있다/없다 (have/not), 어디 (where), 언제 (when)
- sino numbers, native numbers, basic counters (개/명/시/분)

That's enough for a 4-hour learner journey from "I am Sarah" → "I went to Seoul on Monday." Each lesson gets a native-speaker review pass before merge.

**6. Expand outward** in the order: questions → negation → politeness → ability/intention/preference → time expressions → connectives → modality → reported speech. Each new function ships as a batch of ~10 patterns.

