# AI Architectural Entry Point & Standards Index

> [!IMPORTANT]
> **AI Agent Operating Directive:**
> Before creating, refactoring, or modifying code in `src/`, AI agents MUST consult the relevant architectural standard below to ensure strict adherence to PigmentShop patterns, layer boundaries, and API contracts.

---

## Architecture Navigation Map

### 1. [UI Layer Standards](./ui/README.md) (`src/components/`)
Focuses on presentational UI primitives, styling tokenization, accessibility, state isolation, and component decomposition.
- **Parent Reference Spec:** [`ui/_reference-module-spec.md`](./ui/_reference-module-spec.md)
- **AI Entry Point:** [`ui/README.md`](./ui/README.md) (Contains specifications for all 19 UI component primitives).

### 2. [Service Layer Standards](./services/README.md) (`src/services/`)
Defines database interactions (Firestore), Data Transfer Objects (DTOs), Repository contracts, and domain business services.
- **Parent Reference Spec:** [`services/_reference-service-spec.md`](./services/_reference-service-spec.md)
- **AI Entry Point:** [`services/README.md`](./services/README.md) (Contains specifications for repositories, transforms, and domain services).

### 3. [Feature Layer Standards](./features/README.md) (`src/features/`)
Governs page-level screens, complex business flows, routing integrations, and domain hooks.
- **Parent Reference Spec:** [`features/_reference-feature-spec.md`](./features/_reference-feature-spec.md)
- **AI Entry Point:** [`features/README.md`](./features/README.md) (Contains specifications for all 11 feature modules).

### 4. [Hooks Layer Documentation](../src/hooks/README.md) (`src/hooks/`)
Encapsulates business logic, state management, and data fetching through reusable React hooks.
- **Documentation:** [`src/hooks/README.md`](../src/hooks/README.md) (Contains comprehensive documentation for all hooks including usage patterns, best practices, and error handling).

---

## AI Agent Decision Matrix

| Task Type | Target Location | Mandatory Standard |
| :--- | :--- | :--- |
| Creating / editing a reusable UI element | `src/components/<Component>` | [`ui/_reference-module-spec.md`](./ui/_reference-module-spec.md) & specific component spec |
| Database queries, API integrations, DTO transformations | `src/services/` | [`services/_reference-service-spec.md`](./services/_reference-service-spec.md) |
| Building pages, user flows, admin tools | `src/features/<Feature>` | [`features/_reference-feature-spec.md`](./features/_reference-feature-spec.md) |
