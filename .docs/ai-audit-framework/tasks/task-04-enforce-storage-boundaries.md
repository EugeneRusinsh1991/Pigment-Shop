# Task 04 — Enforce Storage Boundaries

## Goal
Prevent direct Firestore primitives from leaking into feature-level hooks and UI logic.

## Target Files
- src/features/favorites/useFavorites.js
- src/features/cart/useCart.js
- src/features/catalog/CatalogContext.js
- src/services/repositories/*
- src/services/firebase/index.js

## Description
- Identify feature modules that import Firestore or Firebase primitives directly.
- Refactor those dependencies to go through repository or service wrappers instead.
- Keep `src/services/firebase/index.js` as the only module that initializes Firebase.

## Verification
- No Firestore primitives are imported directly in feature hooks or components.
- Persistence behavior remains functional.
- The repository layer remains the only code path with direct Firebase imports.
