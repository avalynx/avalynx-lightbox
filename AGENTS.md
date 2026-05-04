# AGENTS

This document contains instructions for AI agents and developers working on this project.

## Development Environment (Docker)

All development work, especially builds and tests, must be performed within the provided Docker environment.

### Start Docker

```bash
docker-compose up -d
```

### Enter Container

```bash
docker-compose exec -u application web bash
```

## Build & Test

Within the Docker container, use the following commands:

### Install Dependencies

```bash
npm install
```

### Build Project

```bash
npm run build
```

### Run Tests

```bash
npm test
```

## Quality Standards

### Test Coverage (Codecov)

*   **IMPORTANT:** All tests must achieve **100%** code coverage.
*   No changes shall be accepted that lower the coverage below 100%.
*   Coverage can be checked with the following command:
    ```bash
    npm test -- --coverage
    ```

### Code Style

*   Maintain existing naming conventions and code structures.
*   Do not add framework dependencies (except Bootstrap >=5.3).
