# Deploy and get your link

---

## Vercel deploying steps

### Step 1: Open terminal
Open PowerShell or Command Prompt.

### Step 2: Go to the frontend folder
```bash
cd c:\Users\moune\Desktop\Kodnest\movie2\frontend
```

### Step 3: Deploy to Vercel
```bash
npx vercel
```
(No need to install Vercel globally; `npx` runs it.)

### Step 4: Follow the prompts
| Prompt | What to do |
|--------|------------|
| **Set up and deploy?** | Press **Enter** (Yes) |
| **Which scope?** | Press **Enter** (your account) |
| **Link to existing project?** | Press **N** then **Enter** (new project) |
| **Project name?** | Press **Enter** (use `movie2` or any name) |
| **In which directory is your code?** | Press **Enter** (use `./` – current folder) |

### Step 5: Get your link
When it finishes, you’ll see something like:
```
✅ Production: https://movie2-xxxx.vercel.app
```
**That URL is your live link.** Open it in a browser.

### Step 6 (optional): Add backend URL for production
If your backend is also deployed (e.g. on Render):

1. Go to [vercel.com](https://vercel.com) → sign in.
2. Open your project (e.g. **movie2**).
3. Go to **Settings** → **Environment Variables**.
4. Add:
   - **Name:** `NEXT_PUBLIC_API_URL`
   - **Value:** `https://your-backend-url.onrender.com/api`
5. Go to **Deployments** → **⋯** on latest → **Redeploy**.

---

## Option A: Deploy with Vercel CLI (same as above)

1. **Install Vercel CLI** (one time): `npm i -g vercel`
2. **Deploy:** `cd frontend` then `vercel`
3. Log in or sign up when asked; accept defaults.
4. Your link: **https://movie2-xxxx.vercel.app**

---

## Option 2: Full deploy (frontend + backend) for a single link

### Backend (Render free tier)

1. Go to [render.com](https://render.com) and sign up.
2. **New** → **Web Service**.
3. Connect your GitHub repo (push this project to GitHub first).
4. Settings:
   - **Root Directory**: `backend`
   - **Build**: leave empty or `npm install`
   - **Start**: `npm start`
5. **Environment**: add `DATABASE_URL`, `JWT_SECRET`, `OMDB_API_KEY` (same as `.env`).
6. Deploy. Note the backend URL, e.g. **https://movie2-api.onrender.com**.

### Frontend (Vercel)

1. Push code to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Add New** → **Project** → import your repo.
3. **Root Directory**: `frontend`.
4. **Environment Variables**: add `NEXT_PUBLIC_API_URL` = your Render backend URL + `/api`, e.g. `https://movie2-api.onrender.com/api`.
5. Deploy. Your **app link** is the Vercel URL, e.g. **https://movie2.vercel.app**.

---

## Your link

- **Frontend only (Vercel)**: Run `cd frontend` then `vercel`; the link is shown in the terminal and in the Vercel dashboard.
- **Full app**: The link you share is the **Vercel (frontend) URL**; it will call the backend you set in `NEXT_PUBLIC_API_URL`.
