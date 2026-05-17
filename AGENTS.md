# Lingo Booth Implementation Rules

These rules are non-negotiable for every implementation pass in this repo.

## Non-Bypassable Localization And Parity Gate

This gate cannot be ignored, waived, or bypassed for any implementation that touches user-facing behavior, copy, lesson content display, navigation, subscriptions, class lessons, conversation, writing, profile, home, quiz, flashcards, or shared backend language logic.

- The fix must work for **all supported languages**, not only English and Korean, and it must work on **both web and mobile** when the feature exists on both surfaces.
- Before finalizing, run `npm run audit:all` from the repo root. This executes backend language guardrails, frontend guardrails, mobile locale/key/leak checks, and mobile TypeScript checks.
- If `npm run audit:all` fails, the task is not complete. Fix the failing rule rather than weakening, deleting, or bypassing the audit.
- Any new dynamic user-facing copy source must add a matching audit in the same change. Copy hidden inside arrays, constants, backend responses, status helpers, scenario definitions, cards, menus, or seed overlays is still user-facing.
- Any native-language backend field that cannot be translated must render as localized pending/support copy, never as raw English, corrupted `???`, or a stale fallback.
- A change that only fixes web while mobile still leaks copy, or only fixes one language pair while another supported pair regresses, is incomplete.

## Product Language

- Do not show user-facing text that calls the product experience "AI", "AI tutor", "AI practice", "AI conversation", or similar. Use product words such as tutor, conversation, practice partner, class, guided lesson, or personalized practice.
- Internal variable names and backend API names may still use AI when they are not visible to users.

## Language Support

- Do not build new UI or learning logic that assumes English and Korean are the only meaningful pair.
- English/Korean examples are allowed only as examples, not as architecture.
- User-facing text in React screens must use i18n translation keys or localized copy tables. Do not add hardcoded English labels in JSX unless the text is a target-language learning sample.
- User-facing text that is rendered from arrays, constants, scenario objects, plan cards, status strings, or menu definitions must follow the same rule. JSX-only audits do not see these later-rendered constants, so add or extend a guardrail audit whenever introducing a new dynamic copy source.
- Never translate interpolation placeholder names. A localized sentence may move `{{language}}`, `{{scenario}}`, `{{partner}}`, `{{count}}`, etc., but the text inside `{{...}}` must stay exactly the same as the English source.
- Class lesson seeds must keep target-language examples in the target language only. Do not embed English meanings inside target/example fields such as `mā 妈 (mother)`; put meanings in native/example-native fields so they can be localized per learner.
- Class lesson detail views must localize control labels, statuses, item type labels, and section summaries. Avoid raw labels like `Ready`, `Vocabulary`, `Grammar`, `Dialogue`, or `Spoken replies on` in non-English UI.
- Every `t()` call should pass the English string as the second argument: `t('namespace.key', 'English default')`. The harvest script (`npm run i18n:harvest`) extracts those defaults into `en/translation.json`, and the fill script (`npm run i18n:fill-locales`) translates them into all 19 other locales via the same translation pipeline class lessons use. A `t('key')` with no default leaves the key undiscoverable to the harvest pass and risks rendering as the raw key in production.
- The `audit:i18n-leaks` script (web: `frontend/scripts/auditI18nLeaks.js`, mobile: `mobile/scripts/auditI18nLeaks.js`) is the source of truth for "is this surface fully wrapped?" — running it on a clean tree must print "no hardcoded English in JSX." Both surfaces wire it into `audit:guardrails`. Per the **Web/Mobile Parity** section, running it on both surfaces is a hard gate.
- Workflow when you add new user-facing strings: wrap in `t('namespace.key', 'English')` → `npm run i18n:harvest` → `npm run i18n:fill-locales` → `npm run audit:guardrails`.
- Test language-pair behavior with at least these pairs before finishing large language work:
  - English -> Korean
  - Korean -> English
  - Spanish -> Italian
  - Hindi -> Chinese
  - Arabic -> English
- RTL languages such as Arabic and Hebrew must remain readable and correctly aligned.

## Learning Modes And Color

- Relaxed mode and Challenge mode must remain visually distinct.
- Use mode-aware CSS tokens instead of raw green/orange values in feature UI.
- Relaxed mode uses the relaxed token set. Challenge mode uses the challenge token set through `.App.challenge-theme`.
- Do not hardcode challenge colors into ordinary components unless the value is part of a documented, non-mode semantic color such as success/error.

## Web/Mobile Parity

This project ships two parallel UI surfaces: **web** (`frontend/`, React) and **mobile** (`mobile/`, React Native). Almost every user-facing feature exists on both. Changing only one surface creates drift that has bitten this repo repeatedly — treat parity as a hard rule, not an afterthought.

**Default rule:** when a task changes user-facing UI, UX, copy, behavior, or a screen/page that exists on both surfaces, implement it on BOTH `frontend/` and `mobile/` in the same change. The task is not done after the first surface looks right.

**When parity applies (implement on both):**
- New or modified screens, pages, layouts, copy, labels, button text, empty/loading/error states, modals, drawers, navigation flows.
- Form behavior, validation messages, keyboard handling.
- Accessibility, i18n keys, color/theme tokens, RTL handling.
- Bugfixes for behavior driven by shared product logic (conversation, lesson navigation, progress display).
- Adding, removing, renaming, or reordering routes / tabs / screens.

**When parity does NOT apply:**
- The feature is genuinely surface-only: admin dashboards, browser-only APIs, hover-only affordances (web); haptics, native sensors, deep links (mobile).
- The change is purely backend and the existing client code adapts unchanged.
- An iteration is explicitly scoped to one surface (e.g., "fix the mobile-only crash on Android 12") — state that scope in the commit body.

**Before reporting any UI/UX task done:**
1. Locate the counterpart file. From web → mobile, check `mobile/src/screens/**` and `mobile/src/components/**`. From mobile → web, check `frontend/src/pages/**` and `frontend/src/components/**`.
2. If a counterpart exists, the task is not done until the change lands there too.
3. If no counterpart exists yet, note this in the commit body: "web-only — no mobile screen for X yet" or "deliberately web-only because Y".
4. When you read a request like "change the home page" or "fix the conversation screen", assume both surfaces unless the user explicitly scopes to one.

**Agents:** parity is not optional. Auto-include the counterpart in your plan. If you implement on one side and pause for review, say explicitly which surface is done and which is pending — do not let the user discover the omission.

## Shared Policies

- Use shared utilities for language-pair behavior instead of repeating `if English/Korean` checks inside components.
- Conversation/class history should clear when native or target language changes.
- The selected landing-page language should be inherited by login, sign-up, guest setup, reset password, and other public pages.
- Any pair-scoped detail load by ID (quiz, class lesson, certificate status tied to a class lesson, future lesson types) must send both active `targetLang` and `nativeLang`; the backend must reject the request if the stored document's `targetLang` does not match. A stale ID from a previous language pair must fail clearly instead of rendering the wrong target-language content.
- Shared learning UI must not contain target-specific catalogue copy such as "Korean Basics", "Hangul", "Mandarin only", etc. Target-specific words belong in authored lesson content or are generated from the active target language name.
- Canonicalize language codes at every UI/API boundary before selecting localized copy. Legacy aliases such as `kr`, `cn`, and `jp` must become `ko`, `zh`, and `ja`; otherwise pages silently fall back to English.
- Dynamic content is still user-facing copy. Home quests, profile language labels, writing modes/sources/statuses, class track titles, class activity scaffolding, expression-practice labels, conversation scenario labels, and status messages must be localized or passed through shared display helpers before rendering.
- Billing, discount, pricing, institution admin, institution dashboard, and subscription-management screens are user-facing surfaces even when they sit inside the admin area. Plan names, organization types, discount labels, statuses, billing sources, prices, and dates must be rendered through active-locale helpers/keys on web and mobile. The `auditBillingLocalization.js` guardrail must stay wired into frontend guardrails and must be extended whenever these surfaces gain new copy.
- Subscription tier names are product names, not ordinary words. `Free`, `Plus`, `Pro`, `Ultra`, and institution plan names must follow the sound/brand spelling for each locale, never semantic translations such as "added", "approve", "free of charge", or other dictionary meanings.
- If a backend native-side field still looks like raw English for a non-Latin native language, do not show it. Render a localized pending/support message and fix the translation path instead.
- Guard against generated locale corruption. Locale files must never contain `???` placeholders, mojibake, or translated interpolation names inside `{{...}}`; audits must fail when those appear.

## Performance Without Quality Loss

- Do not make class-list pages fetch full class-lesson payloads. Lists must use compact summaries; detail screens must use resume-aware bootstrap payloads plus nearby item windows.
- New and returning learners should feel fast for different reasons: new learners start from the earliest likely class window, returning learners resume from the last selected item window. Do not replace this with one giant “load everything first” request.
- When a learner chooses or changes a language pair, trigger background preparation for the likely first class lessons. Preparation may warm translations, pronunciation guides, and other caches, but it must never mutate canonical lesson content or lower the quality of what is ultimately shown.
- Any cache for translated or generated learning content must be versioned or fingerprinted against the canonical source. Stale cached content is a correctness bug, not an acceptable speed optimization.
- Reuse short-lived reads that are naturally shared across components, but invalidate them after writes. Deduplication is good; stale profile, progress, entitlement, or gamification state is not.
- Prefetch only the next likely material: nearby class windows, likely next audio, and other adjacent content the learner is probably about to use. Do not flood the network or prefetch entire catalogs just to make a benchmark look good.
- Route splitting and deferred loading are preferred for heavy screens that are not needed at startup. A faster shell is useful only if every later screen still preserves full lesson quality, localization, and web/mobile parity.
- Any performance change that removes examples, shortens authored glosses, weakens translations, reduces pronunciation fidelity, or skips required learner-language overlays is a regression and must be reverted or redesigned.

## Class Lesson Content Language

The class-lesson system stores **one** Lesson document per (target-language, unit). The same document serves every native language — the only difference per learner is the translation overlay applied at response time. These rules keep that property:

- Language preparation/generation must preserve three separate layers:
  - **Target layer:** `targetText`, `exampleTarget`, `breakdown[].target`, target-language titles, and target-language samples. These contain only the language being taught plus its official pronunciation where appropriate.
  - **Canonical explanation layer:** `nativeText`, `exampleNative`, `breakdown[].native`, activity goals/tasks, labels, and notes. These are authored once in English as the source for translation.
  - **Learner overlay layer:** translated native-language copy generated at runtime/cached per `(lessonId, nativeLang)`. Do not hardcode this layer into seeds or generated files.
- Never put learner-facing English meanings inside target-language strings, especially parentheticals such as `mā 妈 (mother)`, `안녕하세요 (hello)`, `hola (hello)`, or `車 (car)`. Put the meaning in `nativeText`, `exampleNative`, or `breakdown[].native`.
- If the target example needs an explanation, split it: target field shows the target example only; native/example-native field explains what it means. This applies to every language, not only Chinese, Korean, or Japanese.
- Breakdown rows must follow the same split. For example, a Chinese tone row may use `breakdown[].target = "mā 妈"` and `breakdown[].native = "first tone, high level pitch, meaning mother"`, but must never put that English explanation in `breakdown[].target` or leave `breakdown[].native` untranslated for a non-English learner.
- Generation scripts must not create content by copying Korean-specific, English-specific, or any other language-specific distinctions into all languages. Generate from language-neutral concepts and let target-language data decide whether a distinction exists.
- Any script that prepares language files must keep UTF-8 intact. Do not use shell snippets that can rewrite non-Latin text as `????`; use Node/file APIs with `utf8` or `apply_patch`, and verify non-Latin locales after generation.
- Class-list track headings, subtitles, badges, and empty states must be target-language neutral. Never hardcode shared catalogue labels such as "Korean Basics", "Workplace Korean", "Hangul", or similar target-specific copy in `ClassLessonsPage` / class-list mobile UI. Build those labels from `classList.tracks.*` i18n keys plus the active target language name.
- A class-lesson detail request must include the active `targetLang` as well as `nativeLang`. The backend must reject a class-lesson ID when `lesson.targetLang` does not match the requested target language, and progress writes must perform the same target check. This prevents stale links or old cached IDs from showing Korean content inside a Chinese class, etc. The same target check is required for quiz detail requests.
- `frontend/scripts/auditClassLanguagePolicy.js` is the guardrail for the two rules above and must remain wired into `npm run audit:guardrails`.
- A class-lesson seed file (`backend/textbookLessons/**`) contains **target-language content** plus a **single canonical English source** for any explanation, label, goal, or task. No Spanish, Hindi, Arabic, or other learner-language text belongs in the seed.
- The canonical English source is **never shown directly** to a learner whose native language is not English. It exists only as input to the translation cache. Returning a class lesson with raw English in any `native*` / `goals` / `task` / `label` field to a non-English learner is a regression.
- Every native-displayed field is served through `applyTranslation` and the `Translation` model. The list of native-displayed fields is currently: `title`, `content[].nativeText`, `content[].exampleNative`, `content[].breakdown[].native`, `activities[].section`, `activities[].title`, `activities[].goals[]`, `activities[].task`, `expressionPractice[].label`, `expressionPractice[].goal`. Any new native-displayed field added to the Lesson schema must, in the same commit, extend the `Translation` schema, `applyTranslation`, and the live-translation fallback. A native-displayed field with no translation path is a bug.
- `content[].nativeText` is translated from the canonical English explanation layer, never guessed by translating `targetText`. The learner overlay must preserve authored pedagogy rather than infer meaning from target glyphs or labels.
- Class tutor control prose is user-facing copy. Deterministic class-action turns, provider fallbacks, and client-side fallbacks must use localized prose for every language pair; they may omit unavailable support text, but they must never leak raw English to a non-English learner.
- Auto-play tutor replies must remain understandable with the screen off: announce example/dialogue sections before switching into them, preserve the intended target/native order, and keep distinct target/native voices where the surface supports speech. Any class-tutor audio change must update the audio-safety guardrail on both web and mobile.
- If a legacy target item stores an English scaffold label while the real target-language material lives elsewhere on the item, the served learner payload must expose target-language material, never the English scaffold label. New seeds must not create that shape in the first place.
- Do not use a blunt “Latin text is wrong in non-Latin languages” rule. Some target layers legitimately teach Latin-script systems such as Pinyin. Use the shared target-layer policy so genuine pronunciation material survives while English scaffold labels are still blocked.
- Missing translations are filled lazily via `batchTranslateRaw` on first hit per `(lessonId, nativeLang)` and written back to the cache. Do not bypass the cache; do not call the translation API per-render.
- Backend translation fallbacks must use canonical language codes (`ko`, `zh`, `ja`, etc.) for both cache keys and API calls. Never use raw request aliases like `kr` or `cn` after the boundary normalization step.
- If `batchTranslateRaw` reports a failed translation, do not cache or render the original English fallback for a non-English learner. Mark the field pending/empty so the UI can show localized support copy and the translation can be retried.
- Do not branch class-lesson loading by `nativeLang` (e.g., loading a different seed file for Spanish vs Hindi). The single Lesson document plus the translation overlay is the only allowed shape.
- The AI tutor (conversation system) is the layer for L1-tailored, in-context elaboration. The AI tutor must not write the static `nativeText` / `exampleNative` shown in the focus card — those come from the translation cache so that facts stay anchored to your authored English source and cost stays bounded. The AI tutor stays in the right-pane conversation, on demand, where the learner can challenge it and re-roll.
- When you tune the canonical English source for a lesson, you change it in one place (the seed) and let the lazy-fill repopulate. Do not edit cached `Translation` rows by hand — invalidate them and let the pipeline regenerate.
- Class-lesson seeds remain `targetLang: '<target>'`, `nativeLang: 'en'`. Do not create per-native-language duplicates of the same lesson.

## Gloss Richness

The canonical English source authored in seed files is not just "a translation" — it is what the translation cache and the AI tutor pivot on to deliver every L1 version of the lesson. A flat one-word gloss like `"Hello" → "(polite greeting)"` translates poorly, gives the AI tutor nothing to elaborate on, and produces shallow learning for every native language downstream.

Every `nativeText`, `exampleNative`, and `breakdown[].native` value must carry at least one of:
- **Register / formality** — when is this used (casual / polite / formal), with whom, in what setting?
- **Usage context** — what situation does this fit, what does it pair with, what is the typical exchange?
- **Contrast** — how does this differ from a similar item (synonym, register variant, near-equivalent)?
- **A notable quirk** — a common error, an irregular form, a culturally important nuance.

Keep glosses to **1–3 sentences max** — never a paragraph (that was the L1-pedagogy mistake the rule corrects against), never a single bare word. A good gloss reads like a high-quality dictionary entry: brief, dense, and useful as both a definition and a usage hint.

Why this matters: the gloss is the seed for the translation pipeline. EN→Spanish, EN→Hindi, EN→Tamil translations of `"(polite greeting)"` are nearly useless to a learner. EN→Spanish of `"A polite greeting suitable any time of day; the safest default for first meetings and customer-facing situations"` translates richly and gives the AI tutor real semantic material to work from. The cost of writing the rich version once is paid back across 19 native languages and every learner session.

**This applies to every target language**, not just English. Korean-target lesson glosses, Spanish-target lesson glosses, future target-language lessons — all follow the same rich-gloss rule. The rule scales: the more native languages the cache serves, the more leverage rich glosses provide.

**Anti-patterns to reject in review:**
- Bare definitions: `"(noun)"`, `"to eat"`, `"first letter"`. These need register/usage/contrast added.
- Translation-only when the target IS English: `"Hello" → "Hello"`. Add a usage gloss instead.
- L1-specific framings: `"doesn't exist in Korean"`, `"like Spanish ser"`. Frame universally — the cache serves every L1.
- Long pedagogical paragraphs: 4+ sentences. Tighten to 1–3 sentences carrying real info.

## Pre-Final Checklist

- Run `npm run audit:all` from the repo root before finalizing any user-facing change. This is the required combined gate for backend, frontend, mobile, all supported languages, and parity.
- Run `npm run audit:guardrails` from `frontend` before finalizing frontend changes.
- Run `npm run build` from `frontend` before finalizing frontend changes.
- If backend quiz/flashcard data changes, run backend concept and pronunciation audits.
- Web/mobile parity check: for every UI/UX change, confirm both `frontend/` and `mobile/` have been updated (or document why one was deliberately skipped). See the **Web/Mobile Parity** section.
- Gloss richness check: for every new or edited class-lesson seed, scan that no `nativeText` / `exampleNative` / `breakdown[].native` is a bare definition or one-word gloss. See the **Gloss Richness** section.
