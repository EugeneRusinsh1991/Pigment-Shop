# Stage 1 — Architectural Project Inventory & Batching Strategy

## 🎯 Audit Scope & Parameters
- **Target Scope**: Whole Project (`.`)
- **Audit Profile**: Architectural (`architectural`)
- **Repository Technology**: Expo / React Native Web (Expo Router), React Context, Custom Tokenized Theme.

---

## 🏗️ Architectural Sub-Batches

### Batch 2.1: `routing-shell`
- **Scope**: `app/`
- **Key Modules**: Root Layout (`app/_layout.js`), Storefront Routes (`app/(store)/`), Admin Routes (`app/admin/`).
- **Focus**: Routing boundaries, layout compositions, navigation guards, global provider hierarchy.

### Batch 2.2: `state-and-context`
- **Scope**: `src/context/`, `src/domain/`, `src/hooks/`
- **Key Modules**: Context providers (Auth, Cart, Theme, Language), domain models, state hooks.
- **Focus**: State encapsulation, context re-render triggers, state mutation flows, hooks abstractions.

### Batch 2.3: `services-and-api`
- **Scope**: `src/services/`
- **Key Modules**: Storage services, API client layers, mock/Firebase implementations.
- **Focus**: Service boundaries, data contract consistency, error handling, storage decoupling.

### Batch 2.4: `components-and-primitives`
- **Scope**: `src/components/`, `src/theme/`
- **Key Modules**: Shared UI components, admin UI components, design tokens (`tokens.js`).
- **Focus**: Presentation vs domain logic separation, design token usage, component reuse.

---

## 🏁 Exit Verification
Stage 1 initialized successfully with 4 architectural batches covering the entire repository.
