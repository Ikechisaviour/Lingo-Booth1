# Curriculum v2 — Follow-up backlog

Things deferred from the pilot. Ordered by priority within each section.

**Maintenance rule.** When an item ships, **delete its entry from this
file** in the same PR. Do not move it to an archive section, do not
mark it `[done]`, do not leave a tombstone. The list is the work — if
it's not on the list, it's done. This keeps the file scannable and
prevents stale references from accumulating.

---

## Production blockers

These must be resolved before v2 graduates from "pilot for admins / opted-in users" to "default learning surface."

### 1. Whisper self-hosted ASR

**Why.** Current pronunciation feedback relies on the browser's
`webkitSpeechRecognition`. Two problems with that as production:

- Chrome / Edge only (Firefox doesn't implement it; Safari is partial).
- Chromium docs label it experimental; audio is sent to Google with no SLA.
  Not licensed for production-scale use.

The fix is **self-hosted Whisper** — MIT-licensed, covers all 20 target
languages we support, accuracy matches or beats paid APIs.

**Approach.**

1. Pick a Whisper variant:
   - `whisper.cpp` with `base` or `small` model — runs on CPU, ~$5-20/mo VPS.
     Good enough for non-tonal languages and short utterances (our use case).
   - `whisper-large-v3` on GPU — overkill for short phrases; revisit if quality
     complaints come in.
2. Deploy whisper.cpp behind a small Node wrapper:
   - `POST /api/curriculum/v2/asr` accepting `audio/webm` blob + `lang` query.
   - Returns `{ transcript, confidence }`.
   - 10-second hard timeout; reject audio > 30s.
3. Replace the `webkitSpeechRecognition` call in
   [PronunciationTaskPage.js](../../frontend/src/pages/curriculumV2/lessonTypes/PronunciationTaskPage.js):
   - Use `MediaRecorder` to capture audio (cross-browser).
   - POST blob to the new endpoint.
   - Feed transcript to the existing `/pronunciation-check` AI scorer.
4. Keep the existing browser ASR as a fallback when the user's network is bad
   or the Whisper host is unreachable.

**Effort.** ~2 days for a working endpoint + frontend swap. Plus ongoing
ops (monitoring, scaling).

**Dependencies.** A VPS / cloud instance. None code-wise.

---

### 2. Multi-language target support

**Why.** v2 currently hardcodes Korean. The app supports 20 target
languages — v2 must too before it can replace v1.

**What's Korean-hardcoded today:**

| Location | Hardcoded value |
|---|---|
| All 6 lesson files in `backend/curriculum/lessons/` | `targetLang: 'ko'` |
| `backend/curriculum/schema/concepts.js` | Single `target` field (Korean string) |
| `backend/curriculum/ai.js` | "You are a Korean language tutor", `-요` form references |
| `PronunciationTaskPage` | `recognition.lang = 'ko-KR'` |
| TTS calls | `locale: 'ko-KR'` |
| ContrastNotes | "English speakers often…" assumes L1=English |

**Approach.**

1. **Concepts schema** — change each lexeme from `target: '제주도'` to
   `targets: { ko: '제주도', ja: '済州', zh: '济州', ... }`. The hydrator in
   `routes/curriculumV2.js` already prefers `targets[targetLang]` over `target`,
   so this is backward-compatible.
2. **Lessons** — author one file per (concept, target language) OR one file
   per concept that exports an array of language variants. Prefer the latter
   to keep grammar+pedagogy notes co-located.
3. **AI prompts** — parameterize by `targetLang` and `nativeLang`. Drop
   Korean-specific examples from the system prompt; the LLM knows each
   language's quirks. Pass language names ("You are a {language} tutor…").
4. **Locales** — map `targetLang` → BCP-47 in one helper (`ko → ko-KR`,
   `ja → ja-JP`, etc.). Read from lesson, not hardcoded.
5. **ContrastNotes** — these are inherently L1↔L2 pair-specific. Either:
   - Author per pair (manual, high quality, slow), or
   - Have AI generate them on first request and cache (faster, lower quality).

**Effort.** ~3 days to retrofit the existing 6 patterns + AI prompts.
Content creation for new languages is open-ended.

**Dependencies.** None.

---

### 3. Cost guardrails for AI calls

**Why.** Each PatternLesson production attempt is an LLM call. Each
PronunciationTask item is another. At pilot scale this is trivial; at
thousands of users it's a real bill and a DOS risk.

**Approach.**

1. **Per-user rate limit** on `/feedback` and `/pronunciation-check` — wire
   into the existing `rateLimit` middleware in `server.js`. Suggested:
   60 / hour for free tier, 300 / hour for paid.
2. **Token quota integration** — reuse the existing
   `recordTokenUsage` / `getDailyTokenUsage` machinery from
   `backend/utils/tokenUsage.js` so v2 calls count toward the same daily
   ceiling as conversation calls.
3. **Cache identical evaluations** — same `(lessonId, fillerConceptId, learnerText)`
   tuple should return cached feedback for ~1 hour. Cuts the cost of "learner
   submits twice" scenarios.

**Effort.** ~1 day.

**Dependencies.** None.

---

### 4. Backend integration tests for v2 routes

**Why.** We have unit tests for the validator + planner. We have **no** tests
for the route layer. A change to the auth gate, hydrator, or AI helper could
break production silently.

**Approach.** Add `backend/__tests__/curriculumV2.test.js` covering:

- `GET /plan` returns hydrated lessons when v2 is enabled.
- `GET /plan` returns 403 when v2 is not enabled.
- `POST /lessons/:id/complete` upserts progress.
- `POST /feedback` validates required fields, looks up the right drill,
  falls through gracefully when `DEEPSEEK_API_KEY` is unset.
- `POST /pronunciation-check` same.

Mock the LLM call (don't hit DeepSeek in CI).

**Effort.** ~0.5 day.

---

### 5. v2 progress recovery + mid-session resilience

**Why.** Currently if the user reloads the page mid-session, they restart
from step 1. Progress is persisted only at lesson-complete boundaries.

**Approach.**

- Persist the current `plan.sequence` + `currentIdx` server-side per user
  (small addition to `CurriculumV2Progress` model).
- On `SessionShellPage` mount, ask the server "do I have an in-flight
  session?" — if yes, resume; if not, build a fresh plan.

**Effort.** ~0.5 day.

---

## High-value enhancements

Worth doing once production blockers are clear.

### 7. Mobile parity (React Native)

The 7 lesson-type pages live in `frontend/src/pages/curriculumV2/lessonTypes/`.
Mobile has no v2 surface yet. The backend API is RN-ready.

**Approach.** Port each page to React Native — same data shapes, same
service calls (already use axios via the existing mobile API client).

**Effort.** ~3-5 days for one developer.

**Dependencies.** Multi-language retrofit should land first if mobile users
are non-English-speakers.

---

### 8. More patterns

Current: 6 beginner Korean patterns (have-you-ever, want-to, going-to,
can/cannot, because, if). Beginner Korean realistically needs ~30 patterns
for meaningful coverage.

**Next 5 to author** (in suggested order):

- Past tense: -았/었어요
- Negation: 안 / 못 / -지 않다
- Existence + location: 있다 / 없다 + -에
- Requests: -아/어 주세요
- Time markers: -ㄹ 때 (when), -기 전에 (before), -은 후에 (after)

**Effort.** ~2 hours per pattern using the existing template. AI can draft
anchors, drills, and clozes; human verification needed.

---

### 9. AI-generated content tooling

Authoring 30 patterns × 20 languages = 600 lesson files. Most of that
content is mechanically derivable from the schema.

**Approach.** A CLI script `backend/scripts/curriculum/draftLesson.js`:

- Takes a concept ID + target language.
- Asks the LLM to draft anchors, drills, cloze items, a story, and contrast
  notes.
- Writes a candidate lesson file to a `drafts/` subfolder.
- Human reviewer edits and moves to `lessons/`.

**Effort.** ~1 day.

---

## Hygiene / debt

### 10. Git repo health — bad tree object

`fatal: bad tree object a32555872629b4a4b81dd193ec46c2ff82abc71b` appeared
in `git pull` output and `.git/gc.log`. Not currently blocking, but `git gc`
won't run cleanly until fixed.

**Approach.**

```bash
rm .git/gc.log
git fsck --full
# follow git's repair recommendations; often `git gc --prune=now`
# after identifying the dangling object
```

If unrecoverable: re-clone, cherry-pick local commits.

---

### 11. Unrelated `/api/users/.../learning-events` 500

Observed during v2 testing. Not a v2 endpoint — exists in
`backend/routes/users.js` or `backend/routes/learningHub.js`. Worth a
look once v2 is stable.

---

### 12. v1 deprecation execution

`backend/lessonData/` and `backend/textbookLessons/` are tagged DEPRECATED
but still power v1 in production. Plan from `docs/curriculumV2/audit.md`:

1. Wait until v2 covers 100% of v1 for a target language.
2. Migrate stragglers from v1 lessons to v2 equivalents.
3. Mark v1 lesson documents `deprecated: true, schemaVersion: 1`.
4. Delete v1 seeders and audit/repair scripts from `backend/scripts/`.
5. Delete `lessonData/*.js`, `intermediateAdvancedLessons.js`,
   `sentenceLessons.js`.

---

## Nice-to-haves

Pure-upside items with no critical user impact.

### 13. Story comprehension AI grading

`StoryLesson.comprehensionQuestions` are currently listed but ungraded. AI
could accept free-text answers and grade them. Similar shape to
`/feedback` but with comprehension prompts.

### 14. Free conversation surface tied to a pattern

After completing a pattern lesson, offer a 3-5 turn free conversation with
the AI tutor constrained to that pattern. Wires into the existing
`/api/ai/conversation` endpoint with a pattern brief.

### 15. Per-language slot category overrides

Some slot categories don't generalize (e.g., `KOREAN_HOLIDAYS` doesn't apply
to Spanish curriculum). Add per-language enable/disable to
`SLOT_CATEGORIES`.

### 16. Learner-facing analytics

A `/progress` UI page showing patterns mastered, common-mistake patterns,
session streak, etc. Drives motivation; useful for content authors to see
where lessons fail.

