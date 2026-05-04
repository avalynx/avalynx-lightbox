# GitHub Copilot Instructions for AvalynxLightbox

- **Environment**: All commands (npm install, build, test) must be executed within the Docker container (`web` service).
- **Docker Access**: `docker-compose exec -u application web bash`.
- **Testing**: 
    - 100% code coverage is MANDATORY.
    - Use Jest for testing.
    - Run `npm test -- --coverage` to ensure compliance.
- **Code Style**: 
    - Keep it simple, lightweight, and framework-independent.
    - Only Bootstrap >=5.3 is allowed as a dependency.
    - Follow ESM (ECMAScript Modules) standards where applicable.
