# Implementation Plan: Guest Mode, Profile Page, and Admin Dashboard

## Overview
This plan covers three major features for the Lingo Booth Korean learning app:
1. Guest Mode - Try the app without logging in
2. Profile Page - User information and settings
3. Admin Dashboard - Website administration

---

## 1. Guest Mode Implementation

### Frontend Changes

**App.js**
- Modify route protection to allow guest access to certain pages
- Add `isGuest` state to track guest users
- Allow guests to access: HomePage, LessonsPage (view only), FlashcardsPage (limited practice)
- Restrict guests from: ProgressPage (no saved data), Profile

**LoginPage.js**
- Add "Try as Guest" button
- Guest login sets a `guestMode` flag in localStorage
- Redirect guests to HomePage

**Navbar.js**
- Show different UI for guests vs logged-in users
- Guest: Show "Sign Up" / "Login" buttons instead of profile/logout
- Guest: Hide stats (streak, XP, hearts) or show demo values

**LessonsPage.js & FlashcardsPage.js**
- Add prompts for guests to sign up when trying to save progress
- Show "Sign up to save your progress!" banner for guests

### No Backend Changes Required
- Guests won't make API calls to save progress
- Guest data stays local and ephemeral

---

## 2. Profile Page Implementation

### Frontend Changes

**New File: ProfilePage.js**
- User information section:
  - Username (editable)
  - Email (display only)
  - Member since date
  - Total XP earned
  - Current streak
- Settings section:
  - Change password form
  - Notification preferences (future)
  - Theme preference (light/dark - future)
- Account actions:
  - Logout button
  - Delete account (with confirmation)

**New File: ProfilePage.css**
- Consistent styling with existing pages
- Form styling for settings
- Card-based layout

**Navbar.js**
- Add Profile link to navigation menu
- User avatar/icon that links to profile

**App.js**
- Add `/profile` route

### Backend Changes

**routes/users.js** (modify existing or create)
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile (username, password)
- `DELETE /api/users/:id` - Delete user account

**models/User.js** (may need updates)
- Ensure schema supports all needed fields

---

## 3. Admin Dashboard Implementation

### Frontend Changes

**New File: AdminDashboard.js**
- Overview cards:
  - Total users count
  - Active users (last 7 days)
  - Total lessons
  - Total flashcard decks
- User management section:
  - List of users with search
  - View user details
  - Ability to delete users
- Content overview:
  - Lessons list
  - Flashcards summary

**New File: AdminDashboard.css**
- Dashboard grid layout
- Data tables styling
- Admin-specific color accents

**App.js**
- Add `/admin` route (protected - admin only)
- Check for admin role before rendering

**Navbar.js**
- Show Admin link only for admin users

### Backend Changes

**models/User.js**
- Add `role` field: `{ type: String, enum: ['user', 'admin'], default: 'user' }`

**routes/admin.js** (new file)
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/users` - List all users
- `DELETE /api/admin/users/:id` - Delete a user

**middleware/auth.js** (new file)
- JWT verification middleware
- Admin role check middleware

**server.js**
- Register admin routes

---

## File Changes Summary

### New Files to Create:
1. `frontend/src/pages/ProfilePage.js`
2. `frontend/src/pages/ProfilePage.css`
3. `frontend/src/pages/AdminDashboard.js`
4. `frontend/src/pages/AdminDashboard.css`
5. `backend/middleware/auth.js`
6. `backend/routes/admin.js`

### Files to Modify:
1. `frontend/src/App.js` - Routes, guest mode logic
2. `frontend/src/pages/LoginPage.js` - Guest button
3. `frontend/src/components/Navbar.js` - Profile link, admin link, guest UI
4. `frontend/src/components/Navbar.css` - New button styles
5. `backend/models/User.js` - Add role field
6. `backend/routes/users.js` - Profile endpoints
7. `backend/server.js` - Register new routes

---

## Implementation Order:
1. Guest Mode (frontend only - quickest to implement)
2. Profile Page (frontend + minor backend)
3. Admin Dashboard (frontend + backend with role system)
