# Lingo Booth

A full-stack, multi-language learning platform. Lingo Booth lets learners study any supported language from their own native language through guided lessons, conversation practice, flashcards, quizzes, and writing practice — with progress tracking, gamification, and subscriptions. It ships parallel **web** and **mobile** apps plus an **admin** surface, all kept at feature parity.

## Supported Languages

Lingo Booth supports 20 languages as both learning targets and interface/native languages:

Arabic (ar), Bengali (bn), Chinese (zh), Dutch (nl), English (en), Filipino (fil), French (fr), German (de), Hebrew (he), Hindi (hi), Indonesian (id), Italian (it), Japanese (ja), Korean (ko), Malay (ms), Portuguese (pt), Russian (ru), Spanish (es), Tamil (ta), and Turkish (tr).

Any native→target pair is supported (e.g. English→Korean, Korean→English, Spanish→Italian, Hindi→Chinese, Arabic→English). English/Korean is only one example pairing, not a built-in assumption. Right-to-left languages such as Arabic and Hebrew are fully supported. The canonical list lives in `backend/config/languages.js`.

## Features

The learning experience is built to be language-agnostic. Lessons, decks, and quizzes are authored or generated per target language rather than translated from a single source language, and all user-facing copy flows through the i18n pipeline.

- **Guided lessons & class lessons** — structured, target-authored content with resume-aware loading.
- **Conversation practice** — a guided practice partner for spoken and written practice (relaxed and challenge modes).
- **Flashcards** — spaced-repetition study with mastery tracking, seeded from target-language teaching profiles.
- **Quizzes** — target-language-clean quiz decks validated against concept audits.
- **Writing practice** — guided writing with localized modes, sources, and statuses.
- **Progress & gamification** — XP, streaks, quests, and skill tracking.
- **Certificates** — class-lesson certificates rendered to downloadable PDFs.
- **Subscriptions & billing** — Free / Plus / Pro / Ultra tiers plus institution plans, via Stripe (web) and store products (mobile).
- **Localization guardrails** — automated audits enforce that every surface is fully translated across all 20 locales, with no hardcoded English, mojibake, or leaked placeholders.

## Architecture

Lingo Booth is an npm workspace with four parts:

```
lingo-booth/
├── backend/          # Node.js/Express API, MongoDB, language + content pipelines
├── frontend/         # React web application
├── admin-frontend/   # React admin dashboard
├── mobile/           # React Native / Expo app (iOS + Android)
└── docs/             # Curriculum design, XP policy, guardrails, quality scorecards
```

### Web / Mobile parity

Almost every user-facing feature exists on both `frontend/` (React) and `mobile/` (React Native). Changes to shared UI, copy, behavior, or navigation must land on both surfaces in the same change. See `AGENTS.md` for the full parity, localization, device-coverage, and performance rules — they are the source of truth for implementation.

### Device coverage

The web app targets desktop, tablet, phone, and foldable/split-screen widths. The mobile apps target phones, Android tablets, and iPads, including foldables. Layouts must remain usable across all of these, not just one screen size.

## Tech Stack

**Backend** — Node.js, Express, MongoDB (Mongoose), JWT + Google OAuth auth, translation pipeline (`google-translate-api-x`), TTS (`msedge-tts`), email (Resend), Stripe billing.

**Web frontend** — React 18, React Router v6, i18next / react-i18next, Axios, Chart.js.

**Mobile** — React Native, Expo, TypeScript.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or cloud instance)
- npm

### Backend

```bash
cd backend
npm install
cp .env.example .env    # then fill in values
npm run dev
```

The API runs at `http://localhost:5001` by default.

### Web frontend

```bash
cd frontend
npm install
npm start
```

The web app runs at `http://localhost:3000`.

### Mobile

```bash
cd mobile
npm install
npx expo start
```

## Localization Workflow

When adding user-facing strings, wrap them in `t('namespace.key', 'English default')`, then run, from the relevant package:

```bash
npm run i18n:harvest        # extract English defaults into en/translation.json
npm run i18n:fill-locales   # translate into the other 19 locales
npm run audit:guardrails    # verify no leaks/missing keys
```

## Audits

Localization and content quality are enforced by automated audits. From the repo root:

```bash
npm run audit:all
```

This runs backend language guardrails, frontend guardrails, and mobile locale/key/leak/TypeScript checks. A change is not complete until `audit:all` passes. Do not weaken or bypass an audit to make it pass — fix the underlying issue. See `AGENTS.md` for details.

## License

This project is open source and available under the MIT License.
