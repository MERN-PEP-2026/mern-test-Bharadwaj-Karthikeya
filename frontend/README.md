## Frontend Overview
The student dashboard is a React 18 + Vite single-page application. It delivers a lightweight yet expressive UI with:
- Authentication-aware navigation, contextual routing, and protected views.
- ThemeContext-powered light/dark palette that syncs with `localStorage` and CSS variables.
- Course catalog, detail, and management flows (create, edit, delete with confirmations) tailored to user roles.
- Glassmorphism-inspired surfaces built with Tailwind-esque utility classes plus custom tokens in `src/index.css`.

## Tech Stack
- React 18, React Router 6
- Vite 5 build toolchain
- Axios (centralized instance at `src/api/axios.js`)
- Context API (`AuthContext`, `ThemeContext`)

## Key Features
- **Authentication:** Login/Register screens call the backend via `auth.api.js`, persist JWTs, and hydrate the `AuthContext`.
- **Role-aware UI:** `ProtectedRoute` gates course/profile pages; components adjust actions (create/delete) based on `user.role`.
- **Course Management:** `CourseCard`, `CourseFormModal`, and `ConfirmModal` coordinate CRUD flows with a consistent modal experience.
- **Profile tools:** Editable profile panel synced with backend endpoints and styled to match the dashboard shell.

## Project Structure
```
src/
├── api/            # Axios instance + auth/course service helpers
├── components/     # Navbar, CourseCard, CourseFormModal, ConfirmModal, etc.
├── context/        # AuthContext and ThemeContext providers
├── pages/          # Login, Register, Courses, Profile screens
├── routes/         # AppRoutes and ProtectedRoute
├── App.jsx         # Wraps providers + router
└── main.jsx        # Vite entry point
```

## Environment Variables
Create `frontend/.env` (or `.env.local`) with:
```
VITE_BACK_API_URL=http://localhost:5000/api
```
Adjust the host when pointing to staging/production APIs.

## Available Scripts
```bash
# install deps
npm install

# start Vite dev server
npm run dev

# create production build
npm run build

# preview the production bundle locally
npm run preview
```

## Styling & UX Notes
- Typography and colors flow from `src/index.css`; utility classes supplement transitions, glass panels, and layout grids.
- Theme toggling is handled in `ThemeContext`; components read `darkMode` to dynamically choose classes.
- Forms share rounded inputs with consistent focus/placeholder treatment across modes.

## API Integration
All requests route through `src/api/axios.js`, which injects the JWT bearer token when available. Feature-specific helpers (`auth.api.js`, `course.api.js`) keep components declarative and make it easy to mock or swap endpoints in future iterations.

For a holistic picture of how this client interacts with the server, see the root README or the backend guide in `../backend/README.md`.
