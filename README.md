# Korean Learning App

A comprehensive full-stack application for learning Korean with lessons, flashcards, and personalized progress tracking.

## Features

### 📚 Lessons Module
- Structured lessons organized by categories (daily-life, business, travel, greetings, food, shopping, healthcare)
- Multiple difficulty levels (beginner, intermediate, advanced)
- Learn words, sentences, and conversations
- Audio pronunciation guides
- Usage examples with translations
- Progress tracking for each lesson

### 🎴 Flashcard System
- Create custom flashcards
- Interactive spaced repetition learning
- Mastery levels (0-5 stars)
- Track correct and incorrect answers
- Category-based organization

### 📊 Progress Tracking
- Monitor progress across 4 key skills:
  - **Listening** 👂
  - **Speaking** 🗣️
  - **Reading** 📖
  - **Writing** ✍️
- Mastery status levels:
  - 🟢 Mastered
  - 🟡 Comfortable
  - 🔵 Learning
  - 🔴 Struggling

### 🎯 Personalized Learning
- Identifies areas you're struggling with
- Provides recommendations for improvement
- Tracks success rates and attempt counts
- Adaptive feedback based on performance

## Project Structure

```
korean-learning-app/
├── backend/              # Node.js/Express API
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── controllers/      # Business logic
│   ├── server.js        # Main server file
│   └── package.json
├── frontend/            # React web application
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API service
│   │   ├── App.js       # Main app component
│   │   └── index.js     # Entry point
│   └── package.json
└── README.md
```

## Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **Password Hashing:** bcryptjs

### Frontend
- **Framework:** React 18
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Styling:** CSS3
- **State Management:** React Hooks

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   MONGODB_URI=mongodb://localhost:27017/korean-learning
   JWT_SECRET=your_secret_key_here
   PORT=5000
   NODE_ENV=development
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The app will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Lessons
- `GET /api/lessons` - Get all lessons (with optional filters)
- `GET /api/lessons/:id` - Get single lesson
- `POST /api/lessons` - Create lesson (admin)

### Flashcards
- `GET /api/flashcards/user/:userId` - Get user's flashcards
- `POST /api/flashcards` - Create flashcard
- `PUT /api/flashcards/:id` - Update flashcard
- `DELETE /api/flashcards/:id` - Delete flashcard

### Progress
- `GET /api/progress/user/:userId` - Get user progress
- `GET /api/progress/summary/:userId` - Get progress summary
- `POST /api/progress` - Record progress

### Users
- `GET /api/users/:userId` - Get user profile

## Usage Guide

### 1. Register/Login
Start by creating an account or logging in with existing credentials.

### 2. Browse Lessons
Navigate to the Lessons section to find lessons by category and difficulty. Click on a lesson to study it.

### 3. Study with Flashcards
Create flashcards or use lesson-based cards. Use the interactive flashcard UI to study and track mastery.

### 4. Track Progress
Visit the Progress page to see your performance across all four language skills and identify areas for improvement.

### 5. Get Recommendations
The app analyzes your performance and provides personalized recommendations for areas you're struggling with.

## Database Schema

### User
- `username` (String, unique)
- `email` (String, unique)
- `password` (String, hashed)
- `createdAt` (Date)

### Lesson
- `title` (String)
- `category` (String, enum)
- `difficulty` (String, enum)
- `content` (Array of learning items)
  - `type` (word/sentence/conversation)
  - `korean` (String)
  - `romanization` (String)
  - `english` (String)
  - `pronunciation` (String)
  - `audioUrl` (String)
  - `example` (String)
  - `exampleEnglish` (String)

### Flashcard
- `userId` (ObjectId ref)
- `korean` (String)
- `english` (String)
- `romanization` (String)
- `category` (String)
- `masteryLevel` (Number, 0-5)
- `correctCount` (Number)
- `incorrectCount` (Number)
- `lastReviewedAt` (Date)

### Progress
- `userId` (ObjectId ref)
- `lessonId` (ObjectId ref)
- `skillType` (enum: listening/speaking/reading/writing)
- `category` (String)
- `score` (Number, 0-100)
- `masteryStatus` (enum: struggling/learning/comfortable/mastered)
- `attemptCount` (Number)
- `correctAttempts` (Number)
- `timestamp` (Date)

## Future Enhancements

- [ ] Audio recording for speaking practice
- [ ] Speech recognition for pronunciation checking
- [ ] Spaced repetition algorithm
- [ ] Leaderboard and community features
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Integration with language exchange partners
- [ ] Video lessons
- [ ] AI-powered personalized tutoring

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For support, email support@koreanlearningapp.com or open an issue on GitHub.

## Acknowledgments

- Inspired by popular language learning platforms
- Built with modern web technologies
- Designed for effective language acquisition

---

Happy learning! 🇰🇷 화이팅! (Hwaiting!)
