# Backend README

Node.js/Express API server for the Korean Learning App.

## Setup

```bash
npm install
```

Create `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/korean-learning
JWT_SECRET=your_secret_key
PORT=5000
NODE_ENV=development
```

## Running

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Routes

- `/api/auth/` - Authentication endpoints
- `/api/lessons/` - Lesson management
- `/api/flashcards/` - Flashcard CRUD operations
- `/api/progress/` - Progress tracking
- `/api/users/` - User profile

## Database Models

- User - User accounts and authentication
- Lesson - Learning content organized by category
- Flashcard - User's flashcard collection with mastery tracking
- Progress - User's progress in each skill and category
