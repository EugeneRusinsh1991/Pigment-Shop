# Task 04 — Enforce Storage Boundaries Plan

## Goal
Prevent direct Firestore primitives from leaking into feature-level hooks and UI logic.

## Step-by-Step Plan

1. Review the storage architecture.
   - Open `src/features/favorites/useFavorites.js`.
   - Open `src/features/cart/useCart.js`.
   - Open `src/features/catalog/CatalogContext.js`.
   - Open `src/services/repositories/*`.
   - Open `src/services/firebase/index.js`.

2. Identify all direct Firestore/Firebase imports in feature modules.
   - Search `src/features/**` for imports from `firebase/firestore`, `firebase/auth`, `firebase/app`, or `src/services/firebase`.
   - Record modules where primitives are imported directly.

3. Define the repository/service boundary.
   - Confirm `src/services/firebase/index.js` initializes and exports the Firebase app and Firestore client.
   - Confirm `src/services/repositories/*` contains low-level accessors using those primitives.
   - Decide if feature modules should depend on repository wrappers or service layer functions.

4. Refactor feature modules to use wrappers.
   - Replace direct Firestore imports in `useFavorites.js`, `useCart.js`, `CatalogContext.js`, and any other affected feature modules.
   - If necessary, add repository functions or service methods to expose the required persistence operations.
   - Keep repository modules as the only modules importing Firebase primitives.

5. Preserve persistence semantics.
   - Ensure favorites, cart, and catalog read/write behaviors remain correct.
   - Keep existing listeners, add/remove logic, and save flows functional.

6. Validate the boundary.
   - Confirm no feature-level code imports `firebase/firestore` or `firebase/auth` directly.
   - Confirm `src/services/repositories/*` remains the sole direct importer of Firestore primitives.
   - Confirm `src/services/firebase/index.js` remains the only Firebase initializer.

7. Prepare verification checklist.
   - Feature hooks/components no longer import Firestore primitives directly.
   - Persistence still works for favorites, cart, and catalog operations.
   - Repository layer remains the only code path with direct Firebase imports.

8. Optional extra confidence.
   - Add or update a code comment in each repository module explaining the storage boundary.
   - Add a small automated audit script or search query for direct Firebase imports in `src/features/**`.
