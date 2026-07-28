# Stage 2 — Architecture Batch Audit

## Focus Area
- Shared startup lifecycle and bootstrap architecture
- Feature-context/provider boundaries
- Catalog state flow and service contracts

## Findings

### 1. Bootstrap orchestration is cleanly separated from UI and feature code
- The startup lifecycle is centered in src/bootstrap/appBootstrap.js and src/bootstrap/bootstrapOrchestrator.js.
- The app shell in app/_layout.js uses the bootstrap status to gate rendering rather than embedding startup side effects directly.
- This is a strong architectural pattern because it keeps the routing shell thin and makes startup sequencing explicit.

### 2. Provider composition is structured but still somewhat coupled to feature modules
- src/context/AppProviders.js composes core infrastructure providers, session/catalog providers, and user feature providers in a deliberate dependency order.
- The composition is readable and centralized, but it still imports feature-specific providers directly from src/features/*, which slightly couples the shared provider shell to business features.
- This is workable, but it may become harder to maintain as the app grows and more feature-specific providers are added.

### 3. Catalog state uses an explicit in-memory store with a clear boundary
- src/data/catalogState.js acts as the canonical in-memory catalog store and is intentionally free of Firestore and auth dependencies.
- src/data/catalogSync.js bridges external real-time updates into that store using explicit commands and a controlled adapter layer.
- src/features/catalog/CatalogContext.js consumes the store through useSyncExternalStore and transforms the data for UI consumption.
- This is a good architecture because state ownership, transport integration, and view-model shaping are kept separate.

### 4. Service contract wrapping is consistent and improves resilience
- src/services/serviceContract.js standardizes service responses into a consistent success/error shape.
- visitorBootstrap.js uses this contract, which helps isolate startup failures from UI logic and makes failure handling more uniform.

## Architectural Strengths
- Clear bootstrap lifecycle ownership
- Centralized provider composition
- Separation between data transport, state ownership, and UI-facing view-models
- Consistent service error-contract wrapping

## Risks / Watch Items
- Feature-specific providers remain directly imported into the global provider shell, which can increase coupling over time.
- The startup bootstrap currently depends on a small number of hard-coded lifecycle services; adding more startup steps may require ongoing coordination in the orchestrator.
- Some modules still use legacy compatibility exports, which can blur the intended architecture if left uncleaned.

## Recommended Next Step
- Continue the audit into the feature-layer and service-layer boundaries to validate whether the architecture remains consistent as the app expands.
