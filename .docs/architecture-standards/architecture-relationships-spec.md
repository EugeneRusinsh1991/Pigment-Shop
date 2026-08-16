# Architecture Relationships

> [!NOTE]
> Describes how PigmentShop's architectural layers interact and operate as a unified system.

---

## 1. Layer Topology

1. **Feature Layer (Top)**: Composes UI, domain hooks, and contexts into screen-level experiences.
2. **Domain/Hook Layer**: Encapsulates business rules and state bridging between UI and services.
3. **Service Layer**: Handles data fetching, DTO transformations, and third-party integrations (e.g., Firebase, Storage).
4. **UI Primitive Layer (Base)**: Dumb, reusable visual elements governed by design tokens.

## 2. Cross-Boundary Communication

- **UI to Services**: UI components *never* call services directly. They invoke custom hooks (e.g., `useCartLogic`), which in turn delegate to service adapters.
- **State to Persistence**: Reactive sub-managers (like `adminCatalogState`) interact with the service layer via explicit actions (e.g., `useAdminActions`), transforming draft state into persistent backend updates.
- **Hooks to Context**: Hooks are the primary consumers of React Context, abstracting away the provider hierarchy from the presentational components.
