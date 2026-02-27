# Backend Overview
Express 5 service that authenticates users, enforces role-based access control, and manages course data for the Student Course Management System.

## Tech Stack
- Node.js + Express 5
- MongoDB with Mongoose ODM
- JSON Web Tokens (JWT) via `jsonwebtoken`
- Password hashing with `bcryptjs`
- Request logging (`morgan`) and CORS middleware

## Project Structure
```
backend/
├── app.js              # Express app configuration
├── server.js           # HTTP bootstrap (reads PORT env)
├── config/db.js        # Mongo connection helper
├── controllers/        # Route-level orchestration
├── services/           # Business logic (auth, course)
├── middleware/         # Auth/JWT guards
├── models/             # Mongoose schemas
├── routes/             # Auth & course routers
├── seedCourses.js      # Utility script to pre-populate data
└── package.json
```

## Environment Variables
Create `backend/.env` and define:
```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster/test
JWT_SECRET=super-secret-value
FRONTEND_URL=http://localhost:5173
```
- `FRONTEND_URL` is whitelisted by CORS.
- `PORT` defaults to 5000 if unset.

## Scripts
```bash
# install
npm install

# start in dev/prod (uses server.js)
npm start

# optional: seed example courses
node seedCourses.js
```

## API Surface
Base URL: `/api`

| Route | Method | Description | Auth |
|-------|--------|-------------|------|
| `/auth/register` | POST | Register user, returns JWT | public |
| `/auth/login` | POST | Authenticate user, returns JWT | public |
| `/auth/profile` | GET | Fetch current user | bearer token |
| `/auth/profile` | PATCH | Update profile fields | bearer token |
| `/auth/profile` | DELETE | Remove user | bearer token |
| `/courses/` | GET | List courses | bearer token |
| `/courses/:id` | GET | Course details | bearer token |
| `/courses/` | POST | Create course | roles: admin, instructor |
| `/courses/:id` | PATCH | Update course | roles: admin, instructor |
| `/courses/:id` | DELETE | Delete course | roles: admin, instructor |

`authenticate` middleware validates the JWT and attaches `req.user`. `authorize([roles])` ensures only admins/instructors manage course data.

## Development Notes
- All responses are JSON; errors bubble up with `message` keys.
- Morgan (`dev` preset) logs each request in console for rapid debugging.
- Update `cors` origins or `FRONTEND_URL` when deploying to another host.

For details on how the frontend consumes these endpoints, see `../frontend/README.md` or the project-level README in the repository root.
