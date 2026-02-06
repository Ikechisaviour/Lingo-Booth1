# Copilot Custom Instructions

This workspace contains a comprehensive Korean Language Learning Application with the following structure and guidelines:

## Workspace Overview

- **Backend:** Node.js/Express API with MongoDB
- **Frontend:** React web application
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT-based user authentication

## Development Guidelines

### Backend Development
- All API routes are in `/backend/routes/`
- Database models are in `/backend/models/`
- Use Express middleware for authentication and validation
- Follow RESTful API conventions
- Test APIs using the provided endpoints

### Frontend Development
- Components are in `/frontend/src/components/`
- Pages are in `/frontend/src/pages/`
- API communication through `/frontend/src/services/api.js`
- Use React Hooks for state management
- CSS modules or component-specific CSS files for styling

### Database
- MongoDB connection string in `.env` file
- Use Mongoose for schema definition and validation
- Keep schemas flexible for future additions

## Key Features to Maintain

1. **User Authentication:** Register, Login, Profile Management
2. **Lesson Management:** Categories, difficulty levels, multi-type content
3. **Flashcard System:** Create, update, delete, mastery tracking
4. **Progress Tracking:** Four skills (listening, speaking, reading, writing)
5. **Analytics:** Identify struggling areas and provide recommendations

## Common Tasks

### Adding New API Endpoint
1. Create route in `/backend/routes/`
2. Import route in `server.js`
3. Create corresponding frontend service method in `/frontend/src/services/api.js`
4. Create or update React component to use the endpoint

### Adding New Feature
1. Update relevant database model if needed
2. Create API endpoints for CRUD operations
3. Build React components/pages for UI
4. Test integration between frontend and backend

### Debugging
- Backend: Check console logs and MongoDB connection
- Frontend: Use React Developer Tools and browser DevTools
- API: Use tools like Postman or VS Code REST Client extension

## Environment Setup

The app requires MongoDB connection. Update `.env` file in backend with your MongoDB URI.

Default ports:
- Backend API: `5000`
- Frontend: `3000`

## Testing the App

1. Start MongoDB
2. Install backend dependencies: `cd backend && npm install`
3. Install frontend dependencies: `cd frontend && npm install`
4. Start backend: `cd backend && npm run dev`
5. Start frontend: `cd frontend && npm start`
6. Open browser to `http://localhost:3000`

## Code Quality

- Use meaningful variable and function names
- Add comments for complex logic
- Keep components focused and reusable
- Follow existing code patterns and conventions

---

For more detailed information, see the main README.md file.
