# G-Scores

## Overview

G-Scores is a fullstack web application for student score management and reporting, built with **TypeScript** for both backend (Node.js/Express/Prisma) and frontend (React/TailwindCSS).

---

## Project Structure

- `backend/` — Node.js, Express, Prisma ORM, PostgreSQL, Redis, TypeScript
  - `src/controllers/` — API controllers (Student, Report, TopBlock)
  - `src/services/` — Business logic (StudentService)
  - `src/models/` — Domain models (Block, Subject)
  - `src/routes/` — API route definitions
  - `src/utils/` — Utilities (import CSV, Redis client)
  - `prisma/schema.prisma` — Database schema (Student, Subject)
- `frontend/` — React (Create React App), TypeScript, TailwindCSS
  - `src/components/` — UI components (Layout, Common, Report, UI)
  - `src/pages/` — Main pages (Dashboard, SearchScores, Reports, Settings)
  - `src/hooks/` — Custom hooks (useTopBlock, useSubjectReport, useApi)
  - `src/services/` — **All API calls are centralized in `apiService`**
  - `src/types/` — TypeScript types for API, domain, UI
  - `src/context/` — App-wide state management (AppContext)
  - `src/utils/` — Constants, helpers

---

## Technology Stack
- **TypeScript** everywhere (strict mode)
- **Backend:** Node.js, Express, Prisma ORM, PostgreSQL, Redis
- **Frontend:** React, TypeScript, TailwindCSS
- **Docker** for both FE & BE

---

## Getting Started

### Backend (API)
```bash
cd backend
npm install
npx prisma generate
npm run dev
```
- Runs at http://localhost:3001
- Configure DB/Redis in `.env` (see `prisma/schema.prisma` for models)

#### Build & Production
```bash
npm run build
npm start
```

#### Docker
```bash
docker build -t g-scores-backend ./backend
docker run -p 3001:3001 g-scores-backend
```

---

### Frontend (React)
```bash
cd frontend
npm install
npm start
```
- Runs at http://localhost:3000
- Set `REACT_APP_API_BASE_URL` in `.env` to point to backend (e.g. `REACT_APP_API_BASE_URL=http://localhost:3001`)

#### Build & Production
```bash
npm run build
```
- Output in `frontend/build`

#### Docker
```bash
docker build -t g-scores-frontend ./frontend
docker run -p 80:80 g-scores-frontend
```
- Pass `REACT_APP_API_BASE_URL` as build arg if needed.

---

## API Call Structure (Frontend)
- **All API calls are centralized in `src/services/api.ts` (`apiService`).**
- No direct `fetch` in components/hooks.
- Easy to maintain, extend, and test.

---

## TypeScript Notes
- Both FE & BE use strict TypeScript (`tsconfig.json` in each).
- All business logic, API, and UI are strongly typed.
- Types are organized in `src/types/` (FE) and inline/`types/` (BE).

---

## Deployment Notes
- Always set environment variables before build (especially for FE).
- For Docker, ensure build-time env for FE.
- See `frontend/README.md` and `backend/Dockerfile` for more.

---

## License
MIT
