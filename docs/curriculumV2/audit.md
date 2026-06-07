# Curriculum v2 — Phase 0 Audit

Date: 2026-06-01

## Questions & findings

### 1. Does SRS exist?

**Yes — and it is already wired.** [backend/models/Flashcard.js](../../backend/models/Flashcard.js) has the full SM-2-style field set:

- `ease` (default 2.5)
- `nextReviewAt`, `lastReviewedAt`
- `reviewCount`
- `lastReviewResult` (`correct | incorrect | manual`)
- `masteryLevel` (1-5)
- `correctCount`, `incorrectCount`
- Index on `{ userId: 1, nextReviewAt: 1 }`

SRS references in route handlers: `backend/routes/ai.js`, `backend/routes/flashcards.js`, `backend/routes/users.js`, `backend/routes/levelTests.js`, `backend/routes/learningHub.js`.

**Implication for plan:** Step 9 (SRS) downgrades from "build" to "reuse." VocabDeck v2 lesson type wires into the existing Flashcard SRS without new scheduling code.

### 2. Is the lesson UI parameterized over lesson type?

**No — but it is already split per lesson type at the page level**, which is actually workable.

Existing lesson-rendering pages (frontend/src/pages):

| Page | Lines | Role |
|---|---|---|
| ClassLessonPage.js | 2,197 | Class-track textbook lessons (AI-tutored) |
| FlashcardsPage.js | 1,696 | Flashcard/SRS review |
| ConversationPage.js | 1,943 | Free conversation with AI |
| WritingPracticePage.js | 741 | Writing exercises |
| AdminSpeakingDemo.js | 723 | (admin-only) speaking practice |
| ContextPracticePage.js | 477 | Context-based practice |
| QuizPage.js / QuizDetailPage.js | ? | Quizzes |
| ReviewPage.js | ? | Review |
| ExercisePage.js | 57 | Exercise-track lessons (likely thin wrapper) |

There is **no unified `<Lesson>` component** that takes a lesson shape and renders the right UI. Each page is a monolithic implementation.

**Implication for plan:** Phase 2 (vertical slice) does NOT need to build a generic lesson renderer. Each v2 lesson type can be a new page (or a section in a session-flow shell) that reuses bits from these monoliths. The session planner sequences pages, not components. Lower-risk than I estimated.

**Risk that remains:** the existing pages are large (2,000-line files); reusing them by extraction is non-trivial. New v2 pages may be cleanest written fresh, sharing only services and small utility components (PronunciationGuide, VoicePickerModal).

### 3. AI speaking demo — capability & reusability

`AdminSpeakingDemo.js` (723 lines) is **admin-only** and (per the page name and prior commits) functional enough to do conversational speaking practice. Not yet productized.

`ConversationPage.js` (1,943 lines) is the general-user-facing conversation surface — already non-admin and shipping. ASR/TTS appears to use `speechService` (browser SpeechRecognition / Web Speech) per the `ClassLessonPage` imports.

**Implication for plan:** PronunciationTask v2 lesson type can use the existing `speechService` for capture + the `PronunciationGuide` component for display. No new ASR engine needed for v1 of v2. Pronunciation feedback quality limited by browser ASR — acceptable for vertical slice.

### 4. Session-flow / planner today

No dedicated session planner found. Users navigate **one lesson at a time** via the page surfaces. Per-language lesson progression is handled inside `ClassLessonPage` itself (unit-aware, but no cross-type interleaving).

**Implication for plan:** Step 7 (build a planner) is greenfield. Planner output is a sequence of `{ lessonType, lessonId }` pairs; the UI can be a thin "session shell" page that loads the right surface per item.

## Summary

| Concern | Estimated effort | Actual effort given audit |
|---|---|---|
| SRS infrastructure | Build | **Reuse** |
| Unified lesson UI | Build | **Don't need** — page-per-type already works; build session shell instead |
| ASR / pronunciation | Build | **Reuse `speechService` + `PronunciationGuide`** |
| Session planner | Build | Still build (greenfield) |

**Phase 2 timeline revision:** from 3-4 weeks to **2-3 weeks**, contingent on writing new pages rather than extracting from the existing monoliths.

## Decisions still needed before Phase 4 (content expansion)

- Register vocabulary: confirm `informal | polite | formal | honorific` (4-level).
- Prerequisite model: explicit DAG of concept IDs, or implicit by level number?
- Whether v2 `lessons` collection is separate from v1 or shares via `schemaVersion` field.
