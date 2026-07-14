High-level architecture
- Single Expo application targeting mobile and web.
- Root app composes global context providers, waits for startup bootstrap, then renders a shell UI.
- Application state is separated into feature contexts and UI state contexts.

Module responsibilities
- `src/App.js`: root entry point that instantiates providers and the main shell.
- `src/context/`: manages feature/state domains such as auth, catalog, cart, favorites, theme, UI menu, and navigation.
- `src/bootstrap/`: startup orchestration and contract management for app initialization.
- `src/components/`: UI screens and reusable interface components for catalog, cart, orders, profile, navigation, and admin surfaces.
- `src/services/`: backend-facing services and catalog/bootstrap support utilities.
- `src/data/` and `src/media/`: application data sources and media assets.

Folder organization
- `src/`: main application source code.
- `src/components/`: UI components and pages.
- `src/context/`: React context providers and hooks.
- `src/bootstrap/`: bootstrap lifecycle coordination.
- `src/services/`: service utilities and data assembly logic.
- `src/assets/`, `src/media/`: static assets used by the app.
- `auditor/`, `backuper/`, `scripts/`: repository tooling for audit, backup, and data/media generation.

Data flow
- Firebase auth state resolves first, then bootstrap orchestrator starts app initialization.
- Catalog data sync is initialized during startup and made available through catalog context.
- UI navigation state is read by the shell and passed to components through the navigation context.
- Feature contexts expose state and actions to component trees without prop drilling.

Important design patterns
- Context-based state management for global feature domains.
- Startup orchestration with a state contract (`idle`, `starting`, `ready`, `failed`).
- Composition of providers in a dedicated root component instead of nested inline logic.
- Separation of UI rendering from startup coordination.

Interactions between major parts
- `App.js` uses `AppProviders` to provide global state, then `AppGate` to block until startup readiness.
- `BootstrapGate` connects auth state from `AuthContext` to startup orchestration in `src/bootstrap/appBootstrap.js`.
- `AppShell` consumes multiple contexts and renders navigation, header, menus, and main content.
- `NavigationContext` mediates screen selection and navigation actions for the UI.
- `services/` modules support catalog and visitor bootstrap processes used during startup.
- Repository tooling folders operate independently from the app runtime and support maintenance tasks.