# Architecture Principles

> [!NOTE]
> Defines the fundamental architectural philosophy and core engineering principles guiding PigmentShop's design.

---

## 1. Separation of Concerns
- **UI vs Logic**: Presentational components (`src/components/ui/`) must remain dumb and stateless. Business logic must be encapsulated in custom hooks (`src/hooks/`) or service layers.
- **Domain Independence**: Features (`src/features/`) should compose domain elements but avoid direct coupling to sibling features.

## 2. Decoupled Persistence
- **Storage Abstraction**: The application code must interact with the abstract `storageService` rather than directly binding to Firebase Storage or local storage, allowing seamless backend replacement.
- **Draft Mutations**: Admin state edits are isolated in memory (`adminCatalogState.js`) until explicitly committed, preventing premature writes to production data.

## 3. Predictable State Flow
- **Unidirectional Data Flow**: State flows top-down via React Context or reactive sub-managers. Components only emit actions or trigger callbacks.
- **Single Source of Truth**: Cached data lives in repositories or global store; components subscribe to this truth rather than maintaining local copies.

## 4. Progressive Enhancement & Fallbacks
- **Offline Capabilities**: Cross-platform storage fallbacks ensure functional continuity when connectivity drops.
- **Anonymous Sessions**: The application gracefully falls back to technical visitor sessions when explicit authentication is absent.
