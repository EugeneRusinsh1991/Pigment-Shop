# Task 01 — Refactor Favorites Service Plan

## Goal
Introduce a higher-level favorites service and refactor `useFavorites` to depend on it instead of direct repository imports.

## Resolved Design Decisions (read first — these override the task brief)

1. **`subscribeFavorites` MUST NOT be wrapped in `withServiceContract`.**
   The contract wrapper is `async` and returns `{ success, data }`. Wrapping a subscription would
   turn the Firestore `unsubscribe` function into a `Promise`, and `useEffect` would return a
   Promise instead of a cleanup function — favorites would leak listeners and never unsubscribe.
   Rule: only `getFavorites` and `toggleFavor[task-01-refactor-favorites-service.md](task-01-refactor-favorites-service.md)ite` (async, one-shot) get the contract.
   `subscribeFavorites` stays **synchronous** and returns the raw `unsubscribe` function.

2. **`toggleFavorite` signature is 3 arguments: `(userId, product, isFavorite)`.**
   The task brief lists 2 args, but the hook already knows the current membership from local
   state, and the repository has separate `addFavorite` / `removeFavorite` atomic operations.
   Passing `isFavorite` avoids an extra Firestore read inside the service. This supersedes the
   2-arg form in `task-01-refactor-favorites-service.md`.

3. **`getFavorites(userId)` requires a new one-shot read in the repository.**
   `favoritesRepository.js` currently has no `getDoc`-based getter (only `onSnapshot`). Add
   `getFavoritesOnce(uid)` to the repository — do NOT put `getDoc`/`db` access in the service,
   the service layer must stay free of Firestore imports.

## Files To Touch (final list)
- `src/services/repositories/favoritesRepository.js` — add `getFavoritesOnce`
- `src/services/favoritesService.js` — **new**
- `src/features/favorites/useFavorites.js` — consume the service
- `src/hooks/README.md` — line 65: dependency `favoritesRepository` → `favoritesService`

**Not touched:** `src/context/AppProviders.js` and `src/features/favorites/FavoritesContext.js`.
The hook's public return shape `{ favorites, toggleFavorite, isFavorite }` is unchanged, so
`FavoritesProvider` wiring and provider registration need no edits. Do not open them.

## Step-by-Step Plan

### Step 1 — Extend the repository with a one-shot getter
In `src/services/repositories/favoritesRepository.js`:
- Add `getDoc` to the existing `firebase/firestore` import.
- Add and export:
  ```js
  /**
   * Read the favorites list for a user once (no subscription).
   *
   * @param {string} uid
   * @returns {Promise<Array>}
   */
  export async function getFavoritesOnce(uid) {
    const docRef = doc(db, COLLECTIONS.USERS, uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() && docSnap.data().favorites ? docSnap.data().favorites : [];
  }
  ```
- Add `getFavoritesOnce` to the `favoritesRepository` object literal at the bottom of the file.
- Change nothing else in this file.

### Step 2 — Create `src/services/favoritesService.js`
File header comment: state that this is the favorites service layer, that async operations
return the canonical `{ success, data?, error?, code? }` contract, and that
`subscribeFavorites` is the one intentional exception (returns `unsubscribe` synchronously).

Imports:
- `withServiceContract` from `./serviceContract.js`
- `getFavoritesOnce`, `addFavorite`, `removeFavorite`, `subscribeFavorites as subscribeFavoritesRepo`
  from `./repositories/favoritesRepository.js`

Exports:
- ```js
  export const getFavorites = withServiceContract(
    (userId) => getFavoritesOnce(userId),
    'Failed to load favorites'
  );
  ```
- ```js
  export const toggleFavorite = withServiceContract(
    (userId, product, isFavorite) =>
      isFavorite ? removeFavorite(userId, product) : addFavorite(userId, product),
    'Failed to update favorites'
  );
  ```
  Semantics: `isFavorite` describes the state **before** the toggle — `true` means the product is
  currently a favorite and must be removed.
- ```js
  /** NOT contract-wrapped by design — must return the raw unsubscribe fn synchronously. */
  export function subscribeFavorites(userId, onData, onError) {
    return subscribeFavoritesRepo(userId, onData, onError);
  }
  ```
- A `favoritesService` object literal aggregating the three exports, mirroring the
  `favoritesRepository` pattern.

### Step 3 — Refactor `src/features/favorites/useFavorites.js`
- Replace the repository import with:
  `import { subscribeFavorites, toggleFavorite as toggleFavoriteService } from '../../services/favoritesService';`
- `useEffect`: keep the `if (!user) { setFavorites([]); return; }` guard, then
  `return subscribeFavorites(user.uid, setFavorites);` — the returned value is still the raw
  unsubscribe function, so cleanup keeps working.
- `toggleFavorite` callback: keep the existing optimistic `setFavorites` updater and its
  `existing` / `isFav` / `next` logic untouched. Replace only the two repository calls with a
  single service call:
  ```js
  if (user) {
    toggleFavoriteService(user.uid, existing || product, isFav).then((res) => {
      if (!res.success) console.error('[useFavorites] toggle failed:', res.error);
    });
  }
  ```
  Note: the contract wrapper never rejects, so `.catch(console.error)` is no longer needed —
  check `res.success` instead.
- Leave `isFavorite` and the `useMemo` return block exactly as they are.
- Do not import `getFavorites` in the hook; the subscription already supplies initial data.
  `getFavorites` exists for non-reactive callers.

### Step 4 — Update `src/hooks/README.md`
- Line 65, `useFavorites` section: change `**Dependencies:** \`AuthContext\`, \`favoritesRepository\``
  to `**Dependencies:** \`AuthContext\`, \`favoritesService\``.
- Change nothing else in the file.

### Step 5 — Confirm the dependency boundary
- Grep `src/` for `favoritesRepository`. Expected remaining hits after the refactor:
  - `src/services/repositories/favoritesRepository.js` (the definition itself)
  - `src/services/favoritesService.js` (the only legitimate consumer)
- Any hit inside `src/features/**`, `src/hooks/**`, or `src/components/**` means the refactor is
  incomplete.

## Verification Checklist (manual, after implementation)
- App loads; favorites context is available (no `useFavorites must be used within FavoritesProvider` error).
- Signed-in user: toggling a favorite updates the UI immediately and persists across reload.
- Signing out clears the favorites list; no Firestore listener errors in the console.
- No `favoritesRepository` imports outside the service layer (Step 5 grep).
