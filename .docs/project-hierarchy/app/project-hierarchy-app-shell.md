# App Shell

## Responsibility
Expo Router layout wiring, startup coordination, root wrapper composition, and early gate rendering.

## When to use
Open when troubleshooting startup sequence, router layout behavior, or the root shell composition.

## Routing overview
This area captures route groups, layouts, nested routes, dynamic routes, and index routes so navigation flow can be traced from entry points to feature implementations.

## Logical Modules

### Root Entry Points
- **Purpose**: Provides Expo Router entry points, root bootstrap wrappers, and the shared application shell composition.
- **Link**: [project-hierarchy-app-shell-root-entry-points.md](project-hierarchy-app-shell-root-entry-points.md)

### Bootstrap and Startup Logic
- **Purpose**: Coordinates application startup gates and auth bootstrap workflows.
- **Link**: [project-hierarchy-app-shell-bootstrap.md](project-hierarchy-app-shell-bootstrap.md)

### Application Shell Container
- **Purpose**: Houses the main container views, layout content, and controller logic.
- **Link**: [project-hierarchy-app-shell-container.md](project-hierarchy-app-shell-container.md)
