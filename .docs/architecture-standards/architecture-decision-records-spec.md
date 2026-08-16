# Architecture Decision Records (ADR) Index

> [!NOTE]
> Captures the reasoning behind major architectural decisions to provide historical context for contributors.

---

## ADR 1: Reactive Sub-Managers for Admin State
- **Context**: Admin catalog forms require rapid updates (keystroke-level) that would cause performance bottlenecks if synced directly to React Context.
- **Decision**: Introduced `adminCatalogState.js` as an external reactive store utilizing `useSyncExternalStore` for localized draft mutations.
- **Consequences**: Improved form performance; requires explicit "Save" actions to persist drafts.

## ADR 2: Decomposed Hook Theme Mappers
- **Context**: Passing dark mode booleans through deep component trees causes prop-drilling and bloated component signatures.
- **Decision**: Implemented `use[Primitive]Theme` hooks to encapsulate Context subscriptions directly within the primitive.
- **Consequences**: Cleaner UI APIs; slightly higher hook overhead per component.

## ADR 3: Technical Visitor Sessions
- **Context**: Cart functionality is required for non-authenticated users, but Firebase Anonymous Auth is disabled.
- **Decision**: Implemented a shared technical visitor account and isolated guest session IDs (`visitorBootstrap.js`).
- **Consequences**: Enables pre-login interactions but requires careful scrubbing via `resolveUserSession`.

## ADR 4: Service Contract Wrappers
- **Context**: Inconsistent error handling across async boundaries led to silent failures.
- **Decision**: Mandated `withServiceContract` for all service mutations to normalize `{ success, data, error }` returns.
- **Consequences**: Standardized UI error boundaries; prevents unhandled rejections.
