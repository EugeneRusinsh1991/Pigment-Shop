# Problem

The administrative catalog workflow is tightly coupled to the storefront catalog workflow because the admin UI and admin services operate on the same in-memory catalog structures that the public UI consumes. This means that admin-side product and category operations are not isolated behind a dedicated domain boundary, so changes to catalog rules, validation, or data shape can affect both the admin experience and the storefront experience.

What is happening:
- The admin panel and its submodules in [src/components/Admin](src/components/Admin) manipulate catalog data that is also used by the storefront UI.
- The admin services in [src/services/adminProductsService.js](src/services/adminProductsService.js) and [src/services/adminCategoriesService.js](src/services/adminCategoriesService.js) mutate the same shared catalog state that feeds [src/context/CatalogContext.js](src/context/CatalogContext.js).
- The current catalog data layer is still effectively acting as a shared runtime pipeline for both domains.

What should happen instead:
- Admin catalog operations should flow through a dedicated admin-facing boundary or repository layer.
- Storefront consumers should continue to read from a stable catalog view model without depending on admin-side mutation logic.
- Product and category changes should be coordinated through explicit domain boundaries rather than shared direct state manipulation.

When the issue occurs:
- Whenever an admin user adds, updates, or removes products or categories.
- Whenever the storefront catalog context re-derives views from the same mutable data source.
- Whenever catalog persistence, validation, or synchronization logic changes and the coupling causes unintended side effects.

Important edge cases:
- Category tree changes affecting admin editing while storefront navigation is also consuming derived category structures.
- Product edits changing data shape or defaults that the storefront expects to remain stable.
- Firestore-backed category persistence and local in-memory state updates happening through the same shared path.

---

# Project Analysis

The current coupling is visible across the admin UI, admin services, and catalog state layer.

Relevant files and folders:
- [src/components/Admin](src/components/Admin) contains the admin entry points, including [src/components/Admin/AdminPanel.js](src/components/Admin/AdminPanel.js), [src/components/Admin/Products/ProductsManager.js](src/components/Admin/Products/ProductsManager.js), and [src/components/Admin/Categories/CategoriesManager.js](src/components/Admin/Categories/CategoriesManager.js).
- [src/services/adminProductsService.js](src/services/adminProductsService.js) performs product CRUD directly through the catalog state accessors.
- [src/services/adminCategoriesService.js](src/services/adminCategoriesService.js) provides category tree and mutation helpers, but those helpers are still part of the same catalog data flow used by the UI.
- [src/data/CatalogStore.js](src/data/CatalogStore.js) is a compatibility facade that re-exports catalog state and persistence behavior for several consumers.
- [src/data/catalogState.js](src/data/catalogState.js) owns the mutable in-memory products, categories, and banners arrays and notifies subscribers.
- [src/services/adminCatalogBoundary.js](src/services/adminCatalogBoundary.js) already exists as a persistence-oriented boundary for category writes, which confirms that some separation has started but it is not yet complete.
- [src/context/CatalogContext.js](src/context/CatalogContext.js) subscribes to catalog state and derives the storefront-facing catalog structures that the public UI reads.
- [src/services/catalogBuilder.js](src/services/catalogBuilder.js) and [src/services/adminCategoryMerger.js](src/services/adminCategoryMerger.js) build derived storefront structures from the shared data model.

Current behavior:
- The admin UI uses product and category services that mutate the shared catalog arrays directly.
- The storefront context consumes those same arrays and transforms them into product trees and category views.
- The same runtime data path is therefore responsible for both administrative mutations and public catalog presentation.

Related dependencies:
- The storefront catalog context and navigation-related components depend on the derived catalog structures.
- Category depth logic in [src/services/categoryDepth.js](src/services/categoryDepth.js) is used by admin category workflows and is part of the same domain logic as the admin category editing experience.
- Firestore-backed category persistence is currently routed through the shared catalog boundary rather than a fully dedicated admin repository layer.

---

# Root Cause Analysis

The most likely root cause is that the project does not yet have a clearly separated admin catalog domain layer.

1. Shared state ownership
   - The mutable catalog state in [src/data/catalogState.js](src/data/catalogState.js) is the common runtime source of truth for both admin and storefront operations.
   - Because the admin services call the same state mutators as the storefront pipeline, the boundary between the two domains is blurred.

2. Missing admin-specific command layer
   - [src/services/adminProductsService.js](src/services/adminProductsService.js) and [src/services/adminCategoriesService.js](src/services/adminCategoriesService.js) act as direct mutation helpers rather than a dedicated admin command or repository layer.
   - This makes the admin feature a runtime dependency of the storefront data flow.

3. Mixed transformation and mutation responsibilities
   - [src/context/CatalogContext.js](src/context/CatalogContext.js) derives storefront views from the same underlying arrays that admin flows mutate.
   - As a result, any changes to admin-specific business rules can leak into the storefront presentation path.

4. Partial boundary implementation
   - [src/services/adminCatalogBoundary.js](src/services/adminCatalogBoundary.js) demonstrates that the project has already started to separate persistence concerns, but the wider admin/storefront boundary is still incomplete.
   - The remaining gap is the lack of a consistent admin-facing API that owns catalog mutations independently of the storefront state model.

---

# Recommended Solution

The implementation should introduce a dedicated admin catalog boundary that owns admin-side mutations while keeping the storefront catalog context focused on reading and transforming a stable catalog view model.

Stage 1: Map the current data flow and freeze behavior
- Review the current admin components, services, and catalog state consumers to document the behavior that must remain unchanged.
- Identify which modules are reading catalog state, which modules are mutating it, and which modules are deriving storefront views from it.
- Why this is needed: the current system has several overlapping responsibilities, and a safe refactor requires a clear inventory of behavior before changes begin.
- Expected outcome: the team has a precise dependency map and a stable list of behaviors to preserve.

Stage 2: Introduce an admin catalog boundary
- Create a dedicated admin-facing catalog command or repository layer that owns product and category mutations for the admin experience.
- Make this layer responsible for validating, transforming, and publishing admin changes in a controlled way.
- Why this is needed: the current admin services are acting as direct state mutators and therefore blur the domain boundary.
- Expected outcome: admin mutations are explicit and isolated behind a single boundary.

Stage 3: Separate storefront consumption from admin mutation
- Keep the storefront catalog context and its derived structures focused on reading and presenting catalog data.
- Ensure that public UI components receive a stable view model rather than depending directly on admin mutation helpers.
- Why this is needed: storefront consumers should not need to know whether the underlying data came from admin editing or from a different data source.
- Expected outcome: the public UI remains stable while the admin domain becomes more explicit.

Stage 4: Refactor the admin UI to use the new boundary
- Update the admin product and category managers to route create, update, and delete actions through the new boundary.
- Preserve the current user experience, but change the internal flow so the admin UI no longer mutates the storefront state path directly.
- Why this is needed: the UI is currently the visible entry point for the coupling and should be moved to the new abstractions first.
- Expected outcome: admin workflows use the dedicated domain boundary without changing their visible behavior.

Stage 5: Consolidate persistence and sync responsibilities
- Ensure that category persistence, state updates, and synchronization are coordinated through the same explicit domain flow rather than through ad hoc shared state access.
- Why this is needed: the current architecture mixes transaction, persistence, and state update concerns in a way that makes future changes risky.
- Expected outcome: catalog updates become easier to reason about and test.

Stage 6: Validate the refactor and remove legacy coupling
- Verify that storefront catalog rendering, admin product editing, admin category editing, and persistence behavior still work correctly.
- Remove or reduce remaining direct dependencies from admin services to the shared catalog state path once the new boundary is in place.
- Why this is needed: hidden coupling can remain even after the first refactor pass if old access patterns are not removed.
- Expected outcome: the admin and storefront domains are clearly separated and the architecture is easier to evolve.

---

# Expected Result

After the refactor is complete, the admin and storefront catalog flows should be easier to evolve independently.

Functional and user-visible improvements:
- Admin product and category changes should be isolated behind a dedicated boundary rather than mutating the storefront state path directly.
- Storefront catalog rendering should remain stable while admin-specific rules and workflows become more explicit.
- Future catalog changes should be easier to test because the admin and storefront responsibilities will be separated more clearly.
- The architecture should be less fragile when validation rules, persistence logic, or catalog data shape change.

---

# Implementation Prompts (English)

The prompts below are ordered to guide the implementation step by step. Each prompt is focused on one logical task and can be checked off as it is completed.

- [x] 1. Analyze the current admin and storefront catalog data flow end to end, including [src/components/Admin](src/components/Admin), [src/services/adminProductsService.js](src/services/adminProductsService.js), [src/services/adminCategoriesService.js](src/services/adminCategoriesService.js), [src/data/catalogState.js](src/data/catalogState.js), and [src/context/CatalogContext.js](src/context/CatalogContext.js).
- [x] 2. Inventory every module that currently reads or mutates catalog state and list the behavior that must remain intact during the refactor.
- [x] 3. Define the new admin catalog boundary contract for product and category mutations, including the input shape, return shape, and update propagation rules.
- [x] 4. Implement a dedicated admin catalog command or repository layer that owns admin-side product and category mutations without depending directly on the storefront state path.
- [ ] 5. Refactor [src/services/adminProductsService.js](src/services/adminProductsService.js) and [src/services/adminCategoriesService.js](src/services/adminCategoriesService.js) so they delegate to the new boundary while preserving the existing CRUD behavior.
- [ ] 6. Update the admin managers in [src/components/Admin/Products/ProductsManager.js](src/components/Admin/Products/ProductsManager.js) and [src/components/Admin/Categories/CategoriesManager.js](src/components/Admin/Categories/CategoriesManager.js) to use the new boundary and keep the current user experience intact.
- [ ] 7. Refactor [src/context/CatalogContext.js](src/context/CatalogContext.js) so the storefront continues to receive a stable catalog view model without coupling to admin mutation logic.
- [ ] 8. Consolidate persistence and synchronization responsibilities so catalog state updates are coordinated through the new domain boundary rather than through scattered direct mutations.
- [ ] 9. Verify that admin product editing, admin category editing, storefront catalog rendering, and any related persistence behavior still work correctly after the refactor.
- [ ] 10. Review the final module structure to confirm that the storefront and admin catalog domains are now separated by clear responsibilities and that no hidden coupling remains.
