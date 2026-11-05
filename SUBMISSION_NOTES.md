# TaskFlow – Phase 2 Submission Notes

## 1. Overview

Completed the TaskFlow assignment by investigating and fixing six reported bugs and implementing the four requested feature areas.

## 2. Root Causes and Fixes

| Issue | Root Cause | Solution |
|---|---|---|
| Whitespace-only titles | Missing meaningful-title validation | Added frontend and backend validation using trimmed input |
| Status reverted after refresh | Updated fields were not reliably persisted | Corrected the service update logic and database commit |
| New task missing from list | Task list was not refreshed after creation | Reloaded tasks after successful creation |
| Incorrect status filtering | Incorrect filter condition | Corrected status matching logic |
| Nonexistent task deletion returned success | Missing existence check | Added HTTP 404 handling |
| Updated timestamp did not change reliably | Timestamp was not explicitly refreshed | Updated the timestamp when editing a task |

## 3. Features Implemented

- Added Low, Medium, and High task priorities.
- Set Medium as the default priority.
- Added an Alembic migration for the priority column.
- Implemented case-insensitive title search.
- Added dynamic dashboard summary cards.
- Added friendly empty-state messages.
- Added API error feedback and retry functionality.

## 4. Testing

Automated backend tests:

docker compose run --rm backend python -m pytest -q


Result: **7 tests passed.**

Manual testing covered task creation, priority selection, task updates, status persistence, search, filtering, dashboard summaries, validation, and deletion.

## 5. Remaining Tradeoffs

- The application is designed for a single user.
- Search and dashboard summaries are calculated from the task data loaded by the frontend.
- Docker Compose is used for the standard development and execution environment.

## 6. Submission

GitHub Repository: https://github.com/mayuripatil09/TaskFlow

The implementation includes backend and frontend changes, database migration, automated tests, and project documentation.