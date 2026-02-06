# Frontend README

React web application for the Korean Learning App.

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
- **Lessons:** Browse and study structured lessons
- **Flashcards:** Create and study flashcards with spaced repetition
- **Progress:** Track learning progress across 4 skills
- **Dashboard:** View personalized recommendations

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
