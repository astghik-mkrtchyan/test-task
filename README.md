# Project Walkthrough

## Overview
This project is a Task Management Application built with **Symfony 7** (Backend) and **Angular 17** (Frontend), orchestrated via **Docker**.

## Project Structure
- `backend/`: Symfony REST API with SQLite database.
- `frontend/`: Angular Standalone Application.
- `docker-compose.yml`: Orchestration for running the stack.

## Running the Project
1. Ensure Docker is installed.
2. Run the following command in the root directory:
   ```bash
   docker compose up --build
   ```
3. Access the application:
   - **Frontend**: http://localhost:4200
   - **Backend API**: http://localhost:8000/api/tasks

## Technical Decisions
- **Backend**: Used Symfony Skeleton for minimal footprint, adding Doctrine, Serializer, Validator, and CORS support mainly.
- **Database**: SQLite was chosen for simplicity and zero-conf, embedded in the container (volume mounted).
- **Frontend**: Angular 17 with Standalone Components and Signals/Observables for a modern, boilerplate-free approach.
- **Docker**: Separate containers for Backend (PHP) and Frontend (Nginx). Nginx serves the production build of Angular.

## Tests
Backend tests are located in `backend/tests/Controller/TaskControllerTest.php`.
To run them (inside the container):
```bash
docker compose exec backend bin/phpunit
```

