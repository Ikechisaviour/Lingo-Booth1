# Plan: Email Verification Before Signup Completion

## Goal
Require users to verify their email before their account becomes fully active. Registration creates a pending account, sends a verification email, and the user must click the link to activate.

## Current State
- User model already has `emailVerified`, `verificationToken`, `verificationTokenExpires` fields
- Frontend `VerifyEmailPage.js` already exists with verifying/success/error states
- **Missing**: no email package, no backend verify endpoint, no email sending, registration auto-sets `emailVerified: true`

---

## Changes

### 1. Install `nodemailer` (backend)
- `npm install nodemailer` in `/backend`

### 2. Create Email Utility — **NEW** `backend/utils/email.js`
- `sendVerificationEmail(to, token)` using nodemailer + SMTP env vars
- Verification link: `{FRONTEND_URL}/verify-email?token={token}`

### 3. Modify Backend Registration — `backend/routes/auth.js`
**POST /register** changes:
- Set `emailVerified: false` (was `true`)
- Generate token: `crypto.randomBytes(32).toString('hex')`
- Set `verificationTokenExpires` = 24 hours from now
- Send verification email
- Return `{ message: "Verification email sent" }` — **no JWT returned**

**New: GET /verify-email**
- Find user by token where expiry > now
- Set `emailVerified: true`, clear token fields
- Return success

**New: POST /resend-verification**
- Accept `email`, find unverified user, generate new token, resend email

### 4. Modify Backend Login — `backend/routes/auth.js`
- If `emailVerified === false`, reject with `{ needsVerification: true, message: "Please verify your email first" }`

### 5. Modify Frontend Register Page — `frontend/src/pages/RegisterPage.js`
- On successful registration, show a **"Check your email"** screen instead of auto-login
- Add "Resend verification email" button
- Do NOT store token or redirect to home

### 6. Review Frontend Verify Page — `frontend/src/pages/VerifyEmailPage.js`
- Adjust to match new backend response format if needed
- On success → redirect to login

### 7. Modify Frontend Login Page — `frontend/src/pages/LoginPage.js`
- If login fails with `needsVerification`, show message + "Resend verification email" button

### 8. Update Frontend API Service — `frontend/src/services/api.js`
- Add `authService.resendVerification(email)` → `POST /auth/resend-verification`

### 9. Add Env Vars — `backend/.env.example`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `FRONTEND_URL`

---

## File Changes Summary

| File | Action |
|------|--------|
| `backend/package.json` | Add `nodemailer` |
| `backend/utils/email.js` | **New** — email utility |
| `backend/routes/auth.js` | Modify register, add verify & resend endpoints |
| `backend/.env.example` | Add SMTP + FRONTEND_URL vars |
| `frontend/src/pages/RegisterPage.js` | Show "check email" after register |
| `frontend/src/pages/Auth.css` | Style verification pending UI |
| `frontend/src/pages/VerifyEmailPage.js` | Adjust for backend response |
| `frontend/src/pages/LoginPage.js` | Handle unverified email error |
| `frontend/src/services/api.js` | Add resend verification call |

---

## User Flow

```
Register → POST /register → account created (unverified) → email sent
  → Frontend shows "Check your email" screen
  → User can click "Resend" if needed

Click email link → /verify-email?token=xxx → GET /verify-email
  → Account activated → Frontend shows success → redirect to login

Login → POST /login
  → If verified: JWT returned, normal flow
  → If not verified: error + resend option shown
```
