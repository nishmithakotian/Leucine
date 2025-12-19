# Equipment Tracker

A simple web application to manage equipment, built with **React + TypeScript** (frontend) and **Node.js + Express + TypeORM + PostgreSQL (Neon)** (backend).

---

## Features

- View a list of equipment in a **table**
- Add new equipment
- Edit existing equipment
- Delete equipment with **confirmation**
- Search by name
- Filter by type and status
- Sort equipment by name, last cleaned date, or creation date
- Responsive design for **mobile and desktop**
- Toast notifications for success/error actions

---

## Tech Stack

**Frontend:**

- React + TypeScript
- Functional components with hooks
- Controlled forms
- Responsive CSS (no external UI library)

**Backend:**

- Node.js + Express
- TypeScript
- TypeORM
- PostgreSQL (Neon)
- RESTful API endpoints

---

## API Endpoints


| Method | Endpoint           | Description            |
| ------ | ------------------ | ---------------------- |
| GET    | /api/equipment     | Get all equipment      |
| POST   | /api/equipment     | Add new equipment      |
| PUT    | /api/equipment/:id | Update equipment by ID |
| DELETE | /api/equipment/:id | Delete equipment by ID |

**Query Parameters (GET /api/equipment):**

- `search` — filter by name (case-insensitive)
- `type` — filter by equipment type (`Machine`, `Vessel`, `Tank`, `Mixer`)
- `status` — filter by status (`Active`, `Inactive`, `Under Maintenance`)
- `sortBy` — `name`, `lastCleanedDate`, `createdAt`
- `order` — `asc` or `desc`

---

## Setup Instructions

### Backend

1. Navigate to backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a .env file with your Neon PostgreSQL credentials:

```bash
DB_HOST=<your-host>
DB_PORT=5432
DB_USERNAME=<your-username>
DB_PASSWORD=<your-password>
DB_NAME=<your-db-name>
```

4. Run database migrations (TypeORM will auto-create tables if synchronize: true):

```bash
pnpm dev
```

The backend server will run on http://localhost:5000.

### Frontend

1. Navigate to frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the frontend server:

```bash
pnpm start
```

The frontend will run on http://localhost:3000.

## Project Structure

### Backend

```bash
backend/
├── src/
│   ├── entity/Equipment.ts       # TypeORM entity
│   ├── routes/equipment.routes.ts # CRUD routes
│   ├── data-source.ts            # TypeORM DataSource
│   └── index.ts                  # Express app
```

### Frontend

```bash
frontend/
├── src/
│   ├── components/
│   │   ├── EquipmentTable.tsx
│   │   ├── EquipmentForm.tsx
│   │   └── Toast.tsx
│   ├── services/api.ts           # API calls
│   ├── types/Equipment.ts        # Type definitions
│   └── App.tsx
```

## Assumptions Made

- Users do not require authentication
- All equipment names are unique for simplicity
- Frontend filtering is done client-side (could be moved to backend for large datasets)
- Table uses simple responsive CSS; no UI frameworks were used
- Toast notifications and delete confirmation enhance UX

## How to Use

1. Click Add Equipment to create new equipment.
2. Use the Edit button to update details.
3. Use the Delete button to remove an item (confirmation required).
4. Use Search or Filter options to find equipment quickly.
5. Click column headers to sort (if implemented sorting UI).

## Potential Improvements (if more time)

- Pagination for large equipment lists
- Backend filtering + sorting via query params for scalability
- Enhanced UI/UX using a component library (Material-UI / Tailwind)
- Unit tests for backend and frontend
- Deployment scripts for hosting (Vercel, Render, or Heroku)
- Image upload for equipment or additional metadata

## Author

__Lekha Kotian__ – Intern Take-Home Assignment
