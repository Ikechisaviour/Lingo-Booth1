# Implementation Guardrails

This checklist exists to keep Lingo Booth from drifting back into one-off English/Korean behavior or losing the relaxed/challenge visual distinction.

## Non-Bypassable Gate

For any user-facing change, the implementation is not complete until the enforced gate passes for **all supported locales**, **web and mobile**, and the backend language boundary.

Run from the repo root:

```bash
npm run audit:all
```

Do not bypass this gate by weakening audits, deleting locale keys, leaving mobile for later, or accepting raw English fallbacks in non-English experiences. If the gate finds a problem, the correct fix is to localize or sanitize the source and add/strengthen the audit that caught it.

This gate specifically protects against:
- English/Korean-only fixes that break Spanish, Hindi, Arabic, Chinese, Italian, or any future language.
- Web-only fixes where the same screen exists on mobile.
- Dynamic copy leaks from arrays, constants, menus, scenario maps, status helpers, cards, backend responses, or class lesson overlays.
- Backend fallback behavior that caches or returns raw English when translation fails.
- Locale corruption such as `???`, mojibake, or translated interpolation placeholders.

## Before Building

- Identify whether the change touches web, mobile, backend, or all three.
- Identify all user-facing text and decide where it belongs:
  - translation JSON
  - localized landing copy
  - database lesson content
  - target-language learning sample
- Identify any language-pair logic and prefer shared policy utilities.

## Language And Content Checks

- Avoid English/Korean-only branching unless it is explicitly a default pair or target-language sample.
- Check the feature with these language pairs:
  - `en -> ko`
  - `ko -> en`
  - `es -> it`
  - `hi -> zh`
  - `ar -> en`
- For mixed-language output, target-language content appears first unless the user asks for another order.
- If a language pair changes, conversation/class practice history should clear.
- Pair-scoped detail pages must pass both `targetLang` and `nativeLang` when loading by ID. This includes quiz detail, class lesson detail, and any future lesson-like route. The backend must reject mismatched target-language IDs so stale links cannot show the previous language's content.
- Shared list/catalog screens must not hardcode target-specific labels such as "Korean Basics", "Hangul", or "Workplace Korean". Use localized generic track copy plus the active target language name, or render the authored lesson title itself.
- Quiz and flashcard default data must be target-language clean. A German, Spanish, Chinese, or future target deck must not inherit Korean-specific words, Korean romanization, Korea-only places/currency/names, or source-language carryover unless an item is explicitly marked as a curated loanword/borrowed-culture item.
- Quiz and flashcard default data must be target-language authored, not only target-language clean. Build default decks and quiz practice from target teaching profiles and the active target curriculum so German teaches German grammar/sound pain points, Spanish teaches Spanish grammar/sound pain points, Chinese teaches tones/measure words/particles, and every supported language carries its own learning logic.
- Seeded pronunciation belongs to the active target language. If an older source deck carries Korean romanization into a non-Korean flashcard, clear it and let the pronunciation pipeline generate the correct target/native guide.
- Audio should read the actual language text, not pronunciation guides, unless the user asks for pronunciation help.
- Audio-only tutoring must still be understandable with the screen off: cue examples/dialogues before reading them, preserve the intended target/native order, and keep target/native voices distinct when speech is available.
- **Every new user-facing string must use `t('namespace.key', 'English default')`** — never a bare JSX text, attribute, or expression. The pair audit (`npm run audit:i18n-leaks`) flags violations on both surfaces.
- Strings rendered from arrays, constants, status helpers, scenario definitions, menu definitions, plan cards, or other dynamic objects are still user-facing. Put them in translation JSON or an explicit localized copy table, then add/update an audit so the JSX-only leak checker cannot miss them.
- Normalize language codes before copy lookup on both web and mobile. `kr`, `cn`, `jp`, `zh-CN`, and similar legacy/browser aliases should never decide copy directly.
- Dynamic backend values need a display boundary: quest tasks, language option labels, writing notebook sources, class tracks, class activities, expression-practice chips, conversation scenarios, partner labels, and status messages must be translated or sanitized before render.
- For a learner whose native language uses a non-Latin script, raw English native-side lesson fields are a regression. Show a localized "translation pending" message and fix the translation cache/fallback path.
- Interpolation placeholder names are not translatable prose. Keep the names inside braces exactly as the English source: `{{language}}`, `{{scenario}}`, `{{partner}}`, `{{count}}`, `{{amount}}`, etc. Move the placeholder anywhere the sentence needs, but do not rename it.
- Generated locale files must not contain `???` corruption or mojibake. `npm run audit:guardrails` includes locale placeholder/corruption checks and dynamic copy checks; update those audits whenever a new dynamic copy source is introduced.
- After adding strings, run the i18n workflow on the affected surface(s):
  - From `frontend/`: `npm run i18n:harvest && npm run i18n:fill-locales`
  - From `mobile/`: `npm run i18n:harvest && npm run i18n:fill-locales`
  Then `npm run audit:guardrails` from the same surface to confirm parity + zero leaks.
- Inline `defaultValue` for keys with interpolation: `t('class.x', { count, defaultValue: '{{count}} items' })` — the harvest script reads `defaultValue` out of the options object the same way it reads a plain second-arg string.

## UI And Theme Checks

- Use `var(--primary)`, `var(--primary-light)`, `var(--primary-hover)`, `var(--primary-dark)`, and related mode-aware tokens for feature color.
- Do not add raw green/orange values to normal app CSS unless the file is the token source or a documented static marketing surface.
- Confirm relaxed mode remains orange and challenge mode remains green.
- Confirm text fits on mobile and desktop.

## User-Facing Wording Checks

- No visible "AI" wording.
- Prefer:
  - tutor
  - practice partner
  - conversation
  - guided lesson
  - personalized practice
- Avoid developer-facing implementation terms in user messages.

## Class Lesson Translation Checks

Run these checks when a change touches `backend/textbookLessons/**`, the `Lesson` schema, the `Translation` schema, `applyTranslation`, the live-translation fallback, or `routes/lessons.js`.

- Keep target strings and learner explanations separate during preparation/generation:
  - Target strings: `targetText`, `exampleTarget`, `breakdown[].target`, target examples, official pronunciation.
  - Canonical explanation strings: `nativeText`, `exampleNative`, `breakdown[].native`, goals, tasks, labels, notes.
  - Learner overlay strings: runtime/cached translations per native language.
- Do not embed English meanings inside target-language strings. Reject patterns like `mā 妈 (mother)`, `안녕하세요 (hello)`, `hola (hello)`, or `車 (car)` in `targetText`, `exampleTarget`, or `breakdown[].target`.
- Do not store English scaffolding labels such as `Foundation goal`, `Writing prompt`, or `Question intonation` in learner-facing target slots for a non-English target language. If legacy data still contains one, the served payload must normalize it to real target-language material before it reaches web or mobile.
- Do not treat every Latin-script target item in a non-Latin course as a leak. Chinese Pinyin and similar authored pronunciation material are legitimate target content; use the shared target-layer policy instead of a blanket script test.
- Translate `nativeText` from the canonical English explanation layer only. Do not derive it by translating `targetText`; that destroys authored pedagogy and can turn a letter-name or support label into the wrong learner-language gloss.
- Deterministic class tutor turns and client-side tutor fallbacks are user-facing copy too. They must be localized for every pair, and practice actions must always return an actual learner task instead of going silent on pairs that do not include English.
- If a target-language example needs meaning support, the target field stays target-only and the explanation goes into `exampleNative` or `breakdown[].native`.
- Tone tables, pronunciation tables, and other nested breakdowns are not exempt. The learner-facing explanation belongs in `breakdown[].native` and must be translated at serve time for non-English native languages; the target cell stays target-only.
- Generation scripts must not clone one language's grammar/culture distinctions into every other language. Seed from language-neutral concepts and target-language authored data.
- When scripts write locale or lesson files, verify UTF-8 output. Any generated `????` inside non-English locale/class-lesson keys is a failed generation pass.
- Open the modified class lesson with these `nativeLang` values and confirm that **no English appears** anywhere a learner sees: focus card title, gloss, example gloss, breakdown, agenda items, activity title, goals list, learner task, expression-practice labels.
  - `?nativeLang=es`
  - `?nativeLang=hi`
  - `?nativeLang=ar`
  - `?nativeLang=zh`
- If you added or renamed a native-displayed field on the `Lesson` schema, the same commit must:
  - Extend the `Translation` schema with that field (or its parent array).
  - Extend `applyTranslation` to overlay it.
  - Extend the live-translation fallback so an uncached lesson still renders correctly for the first learner who hits it.
- Normalize `nativeLang` / `targetLang` before cache lookup, cache write, translation fallback, pronunciation enrichment, and target mismatch checks. Raw aliases like `kr`, `cn`, or `jp` must not become cache keys.
- A failed backend translation must not be cached or shown as English fallback to a non-English learner. Treat `batchTranslateRaw(...).failed` as pending/empty and let the UI show localized support text.
- If you added a new class-lesson seed file, every `native*` / `goals` / `task` / `label` field in the seed is in English only. No Spanish, no Hindi, no Arabic, no other learner language. The reviewer should grep the diff for non-ASCII text outside `targetText`, `exampleTarget`, `breakdown[].korean`, and the lesson `title`.
- Class-lesson seed files use `nativeLang: 'en'`. Do not create per-native-language duplicates of the same lesson — one Lesson document serves all natives.
- The AI tutor (`backend/utils/aiConversation.js`) must not be the source of the static `nativeText` / `exampleNative` rendered in the focus card. Confirm any new path that writes those fields goes through `Translation` / `applyTranslation`, not through `callAIConversation`.
- After editing a seed's canonical English (e.g., rewording a learner task), invalidate the affected `Translation` rows so the lazy-fill regenerates them in every native language. Do not hand-edit cached translation rows.

Quick smoke-test command from `backend`:

```bash
# Confirms no English leaks for a non-English native lesson load.
curl -s "http://localhost:5001/api/class-lessons/<lessonId>?nativeLang=hi" \
  | jq '.activities[].goals, .activities[].task, .content[].nativeText' \
  | grep -E "[A-Za-z]{4,}"  # any 4+ letter Latin run is suspicious
```

## Curriculum Lesson Page UX

Every learner-facing lesson surface (script onboarding cards, curriculum v2 lesson types, future lesson types in any target language) must satisfy these rules. They are language- and lesson-type-agnostic — re-derive the specific behavior from the principle, not from a prior implementation.

- **Whole-page audio is mandatory.** Every page has a single button that reads its entire visible content top-to-bottom. The page must be usable with the screen off. Each lesson-type component owns a `pageScript` derived from its currently-visible content and renders the shared `LessonAudioButton`.
- **Per-section / per-item audio is opt-in but encouraged.** Any block a learner might want to re-hear in isolation (a contrast section, one mistake row, one anchor example, one card) gets its own play button.
- **Back lives next to the primary forward action.** Back and the primary Continue/Next/Done button sit in the same footer row. Forward and reverse are the same kind of action and should be reachable together.
- **Back rewinds intra-page state first, then steps to the previous lesson.** A page with multiple steps, stages, items, or pairs must undo ONE step on Back; it only steps to the previous lesson (the shell's `onBack`) when already at the page's first step. The learner's model of "back" is "undo my last Continue", not "leave this lesson." Each component defines a `handleBackClick()` that walks its own state machine and falls through to `onBack` at the start.
- **Sequenced playback is cancellable.** Tapping any other play button or a stop control cuts the current sequence cleanly. A learner who heard what they needed shouldn't wait for the rest.
- **Section headers are spoken before their body.** With the screen off the listener still needs to know what they're hearing.

## Audio Quality (Lesson Surfaces)

- **TTS is server-side neural only.** Route every spoken string through the shared speech service. The OS speech synthesizer (`window.speechSynthesis` / `SpeechSynthesisUtterance`) is forbidden in production paths — every platform's built-in voice sounds robotic.
- **Mixed-script strings split per script before TTS.** Detect script runs and route each chunk to the voice of its own language. A target-language voice reading the native (and vice versa) is unintelligible. Maintain a per-target script-detection regex that covers EVERY Unicode block the writing system uses — not just the most common one. Test with edge characters (lone Hangul jamo, half-width kana, Arabic presentation forms, etc.).
- **Target and native voices must match gender on the same page.** One consistent "speaker" feel, not a duet. Resolve gender from the user's saved target voice first, then pick a same-gender native voice; never the reverse.
- **Pattern-template placeholders expand to natural words before TTS.** Single-letter stand-ins for word classes (`V`, `N`, `A`, `Adj`, ...) are substituted word-bounded with their full word ("verb", "noun", "adjective") so real words ("Voice", "Note") stay intact. A learner hearing "vee" for a verb slot learns nothing. Maintain a per-language placeholder map in the language profile.
- **Parenthetical handling is content-aware, not project-wide.** Strip parens whose content is romanization or asides in the native script (visual scaffolding — e.g., `(appa)` next to `아빠`). Keep parens whose content is target-language script — they ARE the lesson (morphemes, alternations, sandhi — e.g., `(으)`, `(있어요)`). Decide per page based on what the lesson is teaching, not as a global flag. Detect by testing for target-script characters inside the parens.
- **Grapheme buttons play the grapheme, not an example.** A button labeled with a single letter/character plays the minimal pronounceable form in the target script — never the example word. Where bare consonants or vowels aren't pronounceable, wrap with neutral support characters per the language's conventions (Korean: prepend `ㅇ` for bare vowels, append `ㅡ` for bare consonants; Arabic: short vowel marks; etc.). Document the wrapping rules in the per-language profile so the same code works across languages.
- **Audio order on grapheme/character cards: the item first, then everything else.** Item → description → example announcer → example → tip. Hearing the description before the sound is backwards pedagogy.
- **Numbered list items get a bilingual announcer.** Example numbers, mistake numbers, question numbers — render as `target announcer + native announcer` (e.g., `예시 1. Example 1.`) for items inside a target-language lesson. Both halves use `t()` with translated keys.
- **Deny-listed voices substitute, never silence.** A saved learner preference for a removed voice falls back to a same-language same-gender alternative automatically. Removing a voice from the picker must not break learners who had it saved.

## Curriculum Reading Semantics

- **Read everything the learner sees.** Section titles, body, every mistake row, cultural notes, examples. An audio-mode learner gets parity with a screen-reading learner.
- **Audio scripts are i18n strings, not English literals.** Spoken tokens (`blank` in cloze prompts, `Mistake N`, `For example`, `Question N`, the V/N/A placeholder expansions) are user-facing and must use `t()` with translations. A Hindi learner should hear the Hindi word for "blank", not the English literal. The voice doesn't translate for you.
- **Audio reads the actual lesson text, not pronunciation guides.** Romanization, IPA, and similar artifacts are visual aids unless the learner has explicitly asked for pronunciation help.

## Curriculum Authoring Discipline

- **Lessons lead with the thing being taught, then describe it.** The first textual content on a letter / morpheme / pattern / word card is the item itself. The description follows. Description-first is backwards.
- **Glosses are 1–3 sentences carrying real information** — register, usage context, contrast against a near-synonym, a common quirk. Never a bare one-word definition. The gloss seeds the translation pipeline serving every native language. See AGENTS.md → Gloss Richness for the full anti-pattern list.
- **Per-language pain points are authored per language.** Korean particles, Spanish ser/estar, Chinese tones, Arabic root patterns — each target's lessons teach that target's grammar, not a translated clone of another language's syllabus.
- **Display order: target language first, native gloss second.** Unless the learner explicitly asks for the reverse.

## Commands

From repo root:

```bash
npm run audit:all
```

From `frontend`:

```bash
npm run audit:guardrails
npm run build
```

The frontend guardrail command includes `scripts/auditClassLanguagePolicy.js`, which checks pair-scoped detail requests and shared class catalogue copy.

From `backend`, when seed/content/pronunciation logic changes:

```bash
npm run audit:concepts
npm run audit:pronunciations
```
