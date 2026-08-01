# App Shell & Routing Layer

## Responsibility
Expo Router layout wiring, startup coordination, root wrapper composition, and early gate rendering.

## When to use
Open when troubleshooting startup sequence, Expo Router layout behavior, or root shell context composition.

## Sub-modules

### Root Entry Points & Routing
- **Purpose**: Provides Expo Router entry points, layout wrappers (`app/_layout.js`), store routes (`app/(store)/`), and admin dashboard routes (`app/admin/`).
- **Link**: [project-hierarchy-app-shell-root-entry-points.md](project-hierarchy-app-shell-root-entry-points.md)

### Bootstrap & Startup Logic
- **Purpose**: Application startup gates, auth state bootstrap, and initialization modules (`src/bootstrap/`).
- **Link**: [project-hierarchy-app-shell-bootstrap.md](project-hierarchy-app-shell-bootstrap.md)

### Application Shell Container
- **Purpose**: Houses the shell layout container (`src/features/shell/`).
- **Link**: [project-hierarchy-app-shell-container.md](project-hierarchy-app-shell-container.md)
