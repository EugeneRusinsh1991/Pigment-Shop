# Deep Architectural & Dependency Analysis

> [!NOTE]
> This document extends [01-architecture-discovery.md](file:///d:/Magazine/_PigmentShop/.docs/architecture-audit/01-architecture-discovery.md) with an in-depth analysis of dependency graphs, layer/boundary violations, component bloat, and global mutable state patterns across PigmentShop.

---

## 1. Dependency Graph & Structural Layering

```mermaid
graph TD
    UI Layer: app/(store), app/admin --> Context Layer: src/context/*
    Context Layer --> Data Sync / ViewModel: src/services/catalogViewModel.js
    Context Layer --> Direct Stores: src/data/catalogState.js
    UI Layer -. Cross-Layer Leak .-> Direct Stores
    UI Layer -. Cross-Layer Leak .-> Service Transforms: src/services/adminProductsTransforms.js
    Services Layer --> Firebase SDK / Network Repositories
```

### Key Observations
- **Top-Down Flow**: Clean hierarchy from UI $\rightarrow$ Context $\rightarrow$ ViewModel / Data Store $\rightarrow$ Repositories.
- **Bypass Violations**: Components and view hooks occasionally bypass context or domain hooks to access low-level transform scripts directly.

---

## 2. Layer & Feature Boundary Violations

1. **Direct Low-Level Imports in UI Components**:
   - Presentation pages directly import data transformation helpers instead of consuming normalized context models or hooks.
   - *Example*: Components importing [adminProductsTransforms.js](file:///d:/Magazine/_PigmentShop/src/services/adminProductsTransforms.js) directly rather than going through an Admin Domain hook.

2. **Feature Encapsulation Leakage (`src/features/`)**:
   - The `src/features/` folder contains domain features like `auth`, `orders`, `profile`, and `favorites`.
   - However, equivalent storefront feature logic is duplicated directly in route files under `app/(store)/` and `app/admin/`.

3. **Domain Layer Underutilization**:
   - `src/domain/` contains only `catalogEntityContract.ts`.
   - Core domain entity validations and domain behavior rules are placed inside `src/services/` instead of `src/domain/`.

---

## 3. Component & Hook Bloat

| Asset | Type | File Path | Responsibility Issues |
| :--- | :--- | :--- | :--- |
| `useHomeScrollHide.js` | Custom Hook | [useHomeScrollHide.js](file:///d:/Magazine/_PigmentShop/src/hooks/useHomeScrollHide.js) | Mixes DOM scroll calculation math, Animated API springs, document scroll event listeners, and threshold debouncing (178 lines). |
| `CatalogContext.js` | Context Provider | [CatalogContext.js](file:///d:/Magazine/_PigmentShop/src/context/CatalogContext.js) | Computes multi-field tokenized search indexes and category trees synchronously during re-renders. |
| `bootstrapOrchestrator.js` | Bootstrap Service | [bootstrapOrchestrator.js](file:///d:/Magazine/_PigmentShop/src/bootstrap/bootstrapOrchestrator.js) | Coordinates startup steps, validates dependencies, handles step failures, and registers lifecycle services. |

---

## 4. Context & Global Mutable State

- **Hybrid External Store Architecture**:
  - `src/data/catalogState.js` acts as an in-memory singleton external store.
  - Subscribed to by `CatalogContext.js` via `useSyncExternalStore`.
- **Strengths**: Isolates network updates from React tree renders.
- **Risks**: Potential synchronization lag or state mismatches if background jobs modify `catalogState.js` directly without triggering listeners.

---

## 5. Architectural Technical Debt Summary

1. **Scattered Validation Rules**: Form validation rules are fragmented across `useForm.js`, `useLoginForm.js`, and `useCartViewForm.js`.
2. **Heavy Index Calculations**: In-memory search indexing takes place in React render loops rather than worker threads or lazy selectors.
3. **Leaky Service Abstractions**: Network request services also manage state mutation, blurring the boundary between infrastructure and domain state.

---

## 6. Priority Refactoring Targets

1. **Move Search Indexing to Web Worker / Lazy Selector**: Extract tokenized index generation from `CatalogContext.js`.
2. **Promote `src/domain/`**: Transfer entity transformation rules out of `src/services/` into pure TypeScript domain models.
3. **Harmonize Feature Directories**: Move screen sub-components from `app/` into matching modules under `src/features/`.
