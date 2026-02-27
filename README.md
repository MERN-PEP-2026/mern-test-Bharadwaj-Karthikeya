# Student Course Management System

Modern MERN stack workspace for managing courses, enrollments, and role-aware dashboards. The app separates concerns cleanly: a Vite-powered React client handles the UI, while an Express + MongoDB API serves authentication, authorization, and course management logic.

## Frontend Snapshot
- React 18 with Vite, Axios, React Router, and context-based state for auth and theming.
- Tailwind-style utility classes and custom CSS variables power the light/dark experience.
- Feature-rich screens for login, registration, profile management, and course CRUD with confirmation workflows.
- Detailed implementation notes live in [frontend/README.md](frontend/README.md).

## Backend Snapshot
- Express 5 API with JWT auth, bcrypt-secured credentials, and role-aware middleware.
- MongoDB (Mongoose) models drive user and course storage; services/controllers keep business logic modular.
- Request logging via Morgan, CORS with configurable origins, and seed scripts for demo data.
- Dive deeper in [backend/README.md](backend/README.md).

## Quick Start
```bash
# 1. Backend
cd backend
npm install
npm start

# 2. Frontend (new terminal)
cd frontend
npm install
npm run dev
```
Configure the environment variables described in the respective READMEs before running `npm start` / `npm run dev`.

## Deployment
- Frontend (live): _add URL_
- Backend (live): _add URL_

Record the actual production endpoints inside `deployment.txt` (see template committed alongside this README).

## Additional Resources
- [Frontend implementation guide](frontend/README.md)
- [Backend implementation guide](backend/README.md)