# MARI.A Launch — API Contracts

## Stack
- FastAPI + Motor (async MongoDB) + JWT (PyJWT) + Passlib (bcrypt)
- All routes prefixed `/api`
- MongoDB collection: `users`

## Models

### User (DB)
```
{
  id: str (uuid),
  name: str,
  email: str (lowercased, unique),
  password_hash: str,
  created_at: datetime (UTC iso)
}
```

### UserPublic (response)
```
{ id, name, email, created_at }
```

## Endpoints

### POST `/api/auth/signup`
Body: `{ name: str, email: str, password: str (min 6) }`
- 409 if email exists
- 201 → `{ token: str, user: UserPublic }`

### POST `/api/auth/login`
Body: `{ email: str, password: str }`
- 401 if invalid
- 200 → `{ token: str, user: UserPublic }`

### GET `/api/auth/me`
Headers: `Authorization: Bearer <token>`
- 401 if invalid/expired
- 200 → `UserPublic`

## JWT
- Algorithm: HS256
- Secret: `JWT_SECRET` from backend `.env` (generated)
- Payload: `{ sub: user.id, email, exp: now + 7 days }`

## Frontend integration

### Mock data to remove
- None in `/app/frontend/src/data/mock.js` (mock stays for marketing visuals)

### New state
- `AuthContext` exposes `{ user, token, signup, login, logout, loading }`
- Token stored in `localStorage` under `maria_token`
- On mount: if token exists, call `/auth/me` and hydrate user

### UI changes
- All "Get started free" / "Start with X" CTAs open `<AuthDialog>` with `defaultTab='signup'` (or login)
- After successful signup → show `<WelcomeView>` ("You're in") inside the same dialog with confetti-free luxury styling
- Navbar: if `user`, show user initial pill + Logout; else "Get started free"

## Files to add / modify
- `backend/server.py` — add auth router, JWT helpers, password hashing
- `backend/requirements.txt` — already has `pyjwt`, `passlib`, `email-validator`, `motor`. No change needed unless bcrypt missing.
- `frontend/src/context/AuthContext.jsx`
- `frontend/src/components/AuthDialog.jsx`
- `frontend/src/lib/api.js` — axios client with auth interceptor
- Wire CTAs in Navbar, Hero, Pricing, CtaSection
