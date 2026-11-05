# TaskFlow

TaskFlow is a single-user task management dashboard built with FastAPI, PostgreSQL, Next.js, and TypeScript. It allows users to create, manage, search, filter, and prioritize tasks through a simple dashboard.

## Tech Stack

**Backend**
- Python 3.12+
- FastAPI
- SQLAlchemy 2
- Pydantic 2
- PostgreSQL
- Alembic
- Pytest

**Frontend**
- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Native Fetch API

**Environment**
- Docker
- Docker Compose

## Prerequisites

Docker Desktop or Docker Engine with Docker Compose is required for the standard setup.

- [Docker Desktop](https://docs.docker.com/desktop/)
- [Docker Engine](https://docs.docker.com/engine/install/)

Python 3.12+ and Node.js 22+ are useful for local development outside Docker.

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd TaskFlow
```

### 2. Configure environment variables (optional)

Copy `.env.example` to `.env` if you want to customize local database credentials.

The example credentials are intended only for local development.

### 3. Start the application

Run this command from the repository root:

```bash
docker compose up --build
```

Docker Compose starts PostgreSQL, the FastAPI backend, and the Next.js frontend.

### 4. Access the application

- **Frontend:** http://localhost:3000
- **Backend health:** http://localhost:8000/health
- **API documentation:** http://localhost:8000/docs

The frontend sends browser requests through its `/api` path, which Next.js proxies to the backend. The backend connects to PostgreSQL through the Docker Compose service named `db`.

### 5. Stop the application

Press `Ctrl + C`, then run:

```bash
docker compose down
```

This removes the containers but retains the named database volume.

**Warning:** The following command also deletes the database volume and all stored task data:

```bash
docker compose down -v
```

The sample tasks are inserted only when the tasks table is empty.

## Features Implemented

- Create tasks with a title and description.
- Assign Low, Medium, or High priority to tasks.
- Default new tasks to Medium priority.
- Update task status.
- Update task priority.
- Delete tasks.
- Search task titles case insensitively.
- Filter tasks by status.
- Display dynamic dashboard summary cards for Total, To Do, In Progress, and Completed tasks.
- Display friendly empty-state messages when no tasks match the current search or filter.
- Display error feedback when API requests fail, with a retry option.
- Validate task titles and prevent whitespace-only titles.

## Bug Fixes and Root Causes

| Reported issue | Root cause and fix |
|---|---|
| Whitespace-only titles could be saved | Added backend title validation and frontend validation using trimmed input. |
| Status changes reverted after refresh | Corrected the update service to apply supplied fields, commit changes, and refresh the task from the database. |
| Newly created tasks did not appear immediately | Reloaded the task list after successful task creation. |
| Status filters showed incorrect tasks | Corrected the filtering logic to match the selected status. |
| Deleting a nonexistent task appeared successful | Added a task existence check and return HTTP 404 when the task does not exist. |
| Last-modified timestamp did not reliably change | Explicitly update `updated_at` when a task is edited. |

## Additional Features and Implementation

### Task Priority

Added three priority levels:

- Low
- Medium
- High

Medium is the default priority for new and existing tasks.

The priority feature includes:
- SQLAlchemy model updates.
- Pydantic API schema updates.
- Task creation and update service changes.
- Priority display and selection in the frontend.
- An Alembic database migration.

### Search and Filtering

- Search matches task titles without case sensitivity.
- An empty search displays all tasks.
- Status filters work independently and can be combined with search.

### Dashboard Summary

The four dashboard summary cards are calculated dynamically from the current task data.

### Error and Empty-State Handling

The application displays helpful messages when:
- No tasks have been created.
- No tasks match the search or selected filter.
- An API request fails.

A retry action is available for failed data-loading requests.

## Database Migrations

The project uses Alembic to manage database schema changes.

Apply migrations with:

```bash
docker compose exec backend alembic upgrade head
```

The task priority migration adds a non-nullable `priority` column with a default value of `medium`.

## Running Tests

Run the automated backend test suite:

```bash
docker compose run --rm backend python -m pytest -q
```

**Latest test result:** 7 passed.

The tests use a fresh in-memory database per test and do not modify the development database.

Manual verification was also performed for task creation, priority selection and updates, status persistence, search, filters, dashboard summaries, validation, and deletion.

## Project Structure
TaskFlow/
├── backend/
│   ├── app/
│   │   ├── models/
│   │   ├── routers/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   ├── alembic/
│   │   ├── versions/
│   │   ├── env.py
│   │   └── script.py.mako
│   └── tests/
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── types/
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md

Implementation Notes and Tradeoffs

Docker Compose is used to provide a consistent development environment.

PostgreSQL stores task data persistently through a named Docker volume.

Alembic migrations manage database schema changes.

Frontend filtering and dashboard summaries are calculated from the task data loaded by the application.

The application is designed as a single-user task dashboard and does not currently implement multi-user authentication or authorization.

Useful References

FastAPI

Pydantic

SQLAlchemy

Alembic

Next.js

Docker Compose