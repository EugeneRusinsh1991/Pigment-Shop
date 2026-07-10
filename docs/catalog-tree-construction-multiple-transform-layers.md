# Problem

The storefront catalog tree is currently assembled through multiple separate transformation steps that each contribute part of the final structure. The catalog context localizes product data, the catalog builder constructs the product category tree, the admin category service builds a category hierarchy from admin categories, and the admin category merger combines those two shapes into the final tree used by the UI.

What is happening:
- Catalog tree construction is distributed across several modules instead of being owned by one catalog-domain boundary.
- Each layer applies its own assumptions about node shape, localization, metadata, and category hierarchy.
- The UI receives a merged structure that depends on a fragile chain of transforms rather than a single, explicit view model.

What should happen instead:
- Catalog assembly should be centralized in one domain-oriented service or builder.
- The storefront should receive a stable catalog view model that already includes localized labels, category hierarchy, and merged admin metadata.
- The transformation logic should be defined in one place so that category structure and metadata remain consistent.

When the issue occurs:
- Whenever the storefront catalog tree is generated for browsing, filtering, or navigation.
- Whenever product data, admin category data, or localization values change.
- Whenever new catalog-related behavior needs to rely on the tree structure and metadata.

Important edge cases:
- Localization values for products and categories that may be missing or vary by language.
- Admin category nodes that should override or supplement product-derived nodes.
- Category nodes that are missing product data but still need to appear in the storefront tree.
- Different node shapes between product-derived trees and admin-derived trees.

---

# Project Analysis

The current catalog assembly flow spans several modules and mixes responsibility for transformation, localization, and merging.

Relevant files and modules:
- [src/context/CatalogContext.js](../src/context/CatalogContext.js) is the public catalog context used by storefront components. It localizes product fields, builds the flat product list, builds the product-derived tree, builds the admin category tree, and merges both into the final category tree.
- [src/services/catalogBuilder.js](../src/services/catalogBuilder.js) constructs the storefront product tree from flat product data. It creates category nodes, subcategory nodes, and product leaves and supplies default category images.
- [src/services/adminCategoriesService.js](../src/services/adminCategoriesService.js) builds a tree from the admin category list and is responsible for category hierarchy construction from the admin data model.
- [src/services/adminCategoryMerger.js](../src/services/adminCategoryMerger.js) merges the product-derived tree with the admin category tree and resolves metadata such as image and description.
- [src/data/catalogState.js](../src/data/catalogState.js) is the shared state source that provides products, categories, and banners to the context.
- [src/components/CatalogPage.js](../src/components/CatalogPage.js), [src/components/Catalog/CatalogFilterSidebar.js](../src/components/Catalog/CatalogFilterSidebar.js), and [src/hooks/useNavigationState.js](../src/hooks/useNavigationState.js) consume the catalog tree or flat list and rely on the shape produced by the current transformation stack.

Current flow:
- The catalog context subscribes to product, category, and banner state from the shared catalog state store.
- It localizes product values directly in the context.
- It derives the product tree with the catalog builder.
- It derives the admin category tree with the admin category service.
- It merges the two trees through the admin category merger to create the final category tree shown in the storefront.

Dependencies involved:
- The storefront UI depends on the final category tree structure for browsing and navigation.
- The catalog context is also coupled to the theme language context because localization occurs there.
- Admin category metadata and product-derived metadata both influence the final tree, so changes in either source can affect the UI.

---

# Root Cause Analysis

The main issue is that the current implementation splits the catalog view model across multiple independent transform layers.

1. The responsibility for constructing the storefront catalog view is not centralized.
   - The catalog context performs localization and orchestration.
   - The catalog builder creates the product-based tree.
   - The admin category service creates the admin category tree.
   - The merger combines the two trees afterward.

2. Each layer assumes a different data shape.
   - Product data is flat and includes product fields such as category, subcategory, label, and description.
   - Admin category data is hierarchical and uses fields such as parentId, name, id, and depth.
   - The merger has to reconcile these two shapes with custom fallback behavior.

3. The catalog context mixes view-model construction with data subscription.
   - Localization and derived tree construction are performed in the same module that exposes the catalog context.
   - That makes the catalog contract more complex and harder to evolve safely.

4. The UI depends on a chain of transformations instead of a single stable contract.
   - Any change in one transformation step can subtly affect the final tree shape.
   - This creates drift risk between product data, category metadata, and the storefront experience.

---

# Recommended Solution

The implementation should introduce a single catalog assembly boundary that owns the full storefront catalog view model.

Stage 1: Define the canonical catalog view model
- Establish the structure for category nodes, subcategory nodes, product leaves, and metadata fields that the UI expects.
- Make the model explicit so that all catalog consumers depend on one stable contract.
- This will remove hidden assumptions about node shape and avoid partial transformations spread across modules.

Why this is needed:
- The current implementation relies on several implicit data contracts.
- A canonical model will make the data flow easier to reason about and safer to extend.

Expected outcome:
- The storefront catalog has one clear shape that is understood by the UI and the catalog services.

Stage 2: Consolidate catalog assembly into one service
- Create a dedicated catalog assembly service that takes the current product and category data sources as input and produces the storefront category tree, flat product list, and any supporting metadata in one place.
- Move the localization and metadata resolution logic into that service instead of leaving it distributed across the context and merger layers.
- Keep the current user experience intact while simplifying the assembly path.

Why this is needed:
- The current tree is assembled by multiple layers with overlapping responsibilities.
- Centralizing the transformation reduces drift and makes future changes easier.

Expected outcome:
- Catalog tree creation becomes a single explicit workflow rather than a chain of separate transforms.

Stage 3: Refactor the catalog context to consume the new assembly contract
- Adjust [src/context/CatalogContext.js](../src/context/CatalogContext.js) so it delegates catalog view-model construction to the new service.
- Keep the context focused on exposing catalog data to the UI rather than performing transformation work directly.
- Preserve the existing public values used by components while using the new internal assembly path.

Why this is needed:
- The current context mixes subscription, localization, and transformation responsibilities.
- Simplifying that boundary will reduce coupling and make the context easier to maintain.

Expected outcome:
- The UI receives the catalog model through a simpler and more predictable interface.

Stage 4: Update consumers to rely on the new stable contract
- Review components and hooks that depend on the catalog tree and flat list to confirm they work with the unified shape.
- Adjust any assumptions that currently depend on the previous multi-step transformation behavior.
- Keep the storefront behavior stable while reducing the number of transformation layers involved.

Why this is needed:
- Even with the assembly logic consolidated, consumers may still rely on older assumptions or informal shape conventions.
- A small migration step will prevent regressions.

Expected outcome:
- The UI consumes one consistent catalog view model without depending on intermediate transform details.

Stage 5: Remove or minimize the old transformation helpers
- Once the new catalog assembly path is fully in place, retire or reduce the use of the old helper modules that each perform only part of the tree construction.
- Preserve only the pieces that still provide clear value after the consolidation.

Why this is needed:
- The old layers create duplication and increase maintenance cost.
- Removing them will reduce the chance of inconsistent behavior in the future.

Expected outcome:
- The catalog domain becomes simpler and easier to evolve.

---

# Expected Result

After the refactor is complete, the storefront catalog should be assembled through one explicit catalog-domain flow rather than a chain of overlapping transforms.

Expected functional and user-visible improvements:
- The catalog tree should be built consistently from one source of truth.
- Product localization, category metadata, and hierarchy should remain aligned across browsing, filtering, and navigation.
- The catalog context should expose a stable and predictable model to the UI.
- Future catalog changes should be easier to implement because the transformation logic will no longer be spread across several modules.

---

# Implementation Prompts (English)

1. [x] Review the current catalog assembly flow end to end and document the exact responsibilities handled by [src/context/CatalogContext.js](../src/context/CatalogContext.js), [src/services/catalogBuilder.js](../src/services/catalogBuilder.js), [src/services/adminCategoriesService.js](../src/services/adminCategoriesService.js), and [src/services/adminCategoryMerger.js](../src/services/adminCategoryMerger.js).

2. Identify every storefront component and hook that consumes the catalog tree or flat product list and list the fields and node shapes they depend on.

3. Define a single canonical catalog view model that covers category nodes, subcategory nodes, product leaves, localization, images, descriptions, and merged admin metadata.

4. Create a dedicated catalog assembly service that builds the full storefront catalog view model from the current product and category sources in one place.

5. Move localization and fallback resolution logic into the new assembly service so that the catalog context no longer performs those transformations directly.

6. Refactor [src/context/CatalogContext.js](../src/context/CatalogContext.js) to delegate catalog construction to the new assembly service and expose the resulting view model through a stable contract.

7. Update catalog consumers such as [src/components/CatalogPage.js](../src/components/CatalogPage.js), [src/components/Catalog/CatalogFilterSidebar.js](../src/components/Catalog/CatalogFilterSidebar.js), and [src/hooks/useNavigationState.js](../src/hooks/useNavigationState.js) to use the consolidated catalog model without breaking their current behavior.

8. Remove or reduce the old transformation steps that are no longer necessary once the new assembly service is fully wired up.

9. Verify that category browsing, product listing, localization, and admin category overrides still behave correctly after the refactor.

10. Review the final structure to ensure catalog tree construction now lives in one focused domain module and the UI relies on a single stable catalog contract.
