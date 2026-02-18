# Netflix-like Movie Streaming App

Full-stack app with **Next.js 14** frontend and **Node.js + Express + MySQL (Aiven)** backend, JWT auth, and Netflix-style UI.

## Tech Stack

- **Frontend:** Next.js 14 (App Router), React, Tailwind CSS, Framer Motion, Axios
- **Backend:** Node.js, Express, MySQL (Aiven), JWT, bcrypt, mysql2, cors, dotenv

## Setup

### Backend

```bash
cd backend
npm install
```

Ensure `.env` exists with:

- `PORT=5000`
- `DATABASE_URL=mysql://...` (your Aiven MySQL URL with `?ssl-mode=REQUIRED`)
- `JWT_SECRET=...`

Start the server (creates `users` table on first run):

```bash
npm start
```

API base: `http://localhost:5000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App: `http://localhost:3000`

## Usage

1. Open `http://localhost:3000`
2. Sign up at `/signup`, then sign in at `/login`
3. After login you are redirected to the homepage (protected)
4. Use **Logout** in the navbar to clear the token and return to login

## API

- `POST /api/auth/signup` — name, email, password, phone (optional)
- `POST /api/auth/login` — email, password → returns JWT and user
- `GET /api/auth/me` — Bearer token required → current user

Secrets (DATABASE_URL, JWT_SECRET) stay in backend `.env` only; frontend never sees them.
