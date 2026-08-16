# AI Architectural Entry Point & Standards Index

> [!IMPORTANT]
> **AI Agent Operating Directive:**
> Before creating, refactoring, or modifying code in `src/`, AI agents MUST consult the relevant architectural standard below to ensure strict adherence to PigmentShop patterns, layer boundaries, and API contracts.

---

## Architecture Navigation Map

### Foundational Architecture Documents
- **Architecture Principles:** [`architecture-principles-spec.md`](./architecture-principles-spec.md)
- **Architecture Relationships:** [`architecture-relationships-spec.md`](./architecture-relationships-spec.md)
- **Architectural Invariants:** [`architectural-invariants-spec.md`](./architectural-invariants-spec.md)
- **Architecture Decision Records:** [`architecture-decision-records-spec.md`](./architecture-decision-records-spec.md)
- **Architecture Lifecycles:** [`architecture-lifecycles-spec.md`](./architecture-lifecycles-spec.md)

### 1. [UI Layer Standards](./ui/README.md) (`src/components/ui/`, `src/components/domain/`, `src/components/Icons/`)
Focuses on presentational UI primitives, styling tokenization, accessibility, state isolation, and component decomposition.
- **Parent Reference Spec:** [`ui/_reference-module-spec.md`](./ui/_reference-module-spec.md)
- **AI Entry Point:** [`ui/README.md`](./ui/README.md) (Contains specifications for UI primitives, UI subsystems, domain components, and icon modules).

### 2. [Service Layer Standards](./services/README.md) (`src/services/`)
Defines database interactions (Firestore), Data Transfer Objects (DTOs), Repository contracts, and domain business services.
- **Parent Reference Spec:** [`services/_reference-service-spec.md`](./services/_reference-service-spec.md)
- **AI Entry Point:** [`services/README.md`](./services/README.md) (Contains specifications for repositories, transforms, Auth/RBAC, catalog services, storage, and bootstrap).

### 3. [Feature Layer Standards](./features/README.md) (`src/features/`)
Governs page-level screens, complex business flows, routing integrations, and domain hooks.
- **Parent Reference Spec:** [`features/_reference-feature-spec.md`](./features/_reference-feature-spec.md)
- **AI Entry Point:** [`features/README.md`](./features/README.md) (Contains specifications for all feature modules including Admin).

### 4. [Hooks Layer Documentation](../src/hooks/README.md) (`src/hooks/`)
Encapsulates business logic, state management, and data fetching through reusable React hooks.
- **Documentation:** [`src/hooks/README.md`](../src/hooks/README.md) (Contains comprehensive documentation for all 32 hooks).

### 5. Cross-Cutting & System Architecture Standards
- **State Management:** [`state-management-spec.md`](./state-management-spec.md) (React Context, custom hooks, reactive sub-managers).
- **Observability & Error Handling:** [`observability-and-error-handling-spec.md`](./observability-and-error-handling-spec.md) (Error boundaries, toast alerts, telemetry).
- **Automation & Quality Inspection:** [`automation-and-testing-spec.md`](./automation-and-testing-spec.md) (Playwright E2E automation, code hygiene auditors).

---

## AI Agent Decision Matrix

| Task Type | Target Location | Mandatory Standard |
| :--- | :--- | :--- |
| Creating / editing an atomic UI primitive | `src/components/ui/<Component>` | [`ui/_reference-module-spec.md`](./ui/_reference-module-spec.md) & specific component spec |
| Creating / editing a reusable domain component | `src/components/domain/<Component>` | [`ui/_reference-module-spec.md`](./ui/_reference-module-spec.md) & specific component spec |
| Creating / editing SVG icon wrappers | `src/components/Icons/` | [`ui/icons-module-spec.md`](./ui/icons-module-spec.md) |
| Database queries, API integrations, DTO transformations | `src/services/` | [`services/_reference-service-spec.md`](./services/_reference-service-spec.md) & service specs |
| Building pages, user flows, admin tools | `src/features/<Feature>` | [`features/_reference-feature-spec.md`](./features/_reference-feature-spec.md) & feature specs |
| Modifying state logic or context boundaries | `src/context/`, `src/services/` | [`state-management-spec.md`](./state-management-spec.md) |
| Adding error logging or toast notifications | `src/components/`, `src/hooks/` | [`observability-and-error-handling-spec.md`](./observability-and-error-handling-spec.md) |
