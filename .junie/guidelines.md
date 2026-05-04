# Junie Guidelines for AvalynxLightbox

This file contains specific instructions for the Junie agent working on this project.

## Development Environment (Docker)

All development work, especially builds and tests, must be performed within the provided Docker environment.

- **Start Docker:** `docker-compose up -d`
- **Enter Container:** `docker-compose exec -u application web bash`

## Build & Test

Within the Docker container, use the following commands:

- **Install Dependencies:** `npm install`
- **Build Project:** `npm run build`
- **Run Tests:** `npm test`

## Quality Standards

- **Test Coverage:** 100% code coverage is mandatory.
- **Check Coverage:** `npm test -- --coverage`
- **Code Style:** 
    - Maintain existing naming conventions and code structures.
    - Do not add framework dependencies (except Bootstrap >=5.3).
    - Write lightweight, framework-independent JavaScript code.
