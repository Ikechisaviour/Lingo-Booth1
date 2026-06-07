# Frontend README

React web application for Lingo Booth, a multi-language learning platform.

## Setup

```bash
npm install
```

## Running

Development mode:
```bash
npm start
```

Builds the app for production:
```bash
npm run build
```

## Features

- **Authentication:** User registration and login
- **Lessons:** Browse and study structured, target-language lessons and class lessons
- **Conversation:** Guided practice partner (relaxed and challenge modes)
- **Flashcards:** Create and study flashcards with spaced repetition
- **Quizzes & Writing:** Target-language quizzes and guided writing practice
- **Progress:** Track learning progress, XP, streaks, and quests
- **Localization:** Fully internationalized across 20 locales (i18next)

## Project Structure

```
src/
├── components/    # Reusable UI components
├── pages/         # Full page components
├── services/      # API service layer
├── App.js         # Main app routing
└── index.js       # React entry point
```

## Available Pages

- `/login` - User login
- `/register` - User registration
- `/` - Dashboard/Home
- `/lessons` - Browse lessons
- `/lessons/:id` - Lesson details
- `/flashcards` - Flashcard study
- `/progress` - Progress dashboard
