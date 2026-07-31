# Phase 4.2 — Store Screen 4-State UI Migration Guide

> **For the next AI iteration.** This guide documents exactly what needs to be done, what files to touch, and what the pattern looks like. Execute without asking for approval — this is a continuation of the approved error-handling-state-machine todo.

---

## Context

The following infrastructure is already in place:
- `UI_STATES` — `src/constants/uiStates.js`
- `useAsyncState(asyncFn, options)` — `src/hooks/useAsyncState.js`
- `ErrorBoundary` — `src/components/Feedback/ErrorBoundary/ErrorBoundary.js`
- `EmptyState` (with `onRetry` prop) — `src/components/Feedback/EmptyState/EmptyState.js`
- `SkeletonLoader` — `src/components/Feedback/Skeleton/SkeletonLoader.js`

**The route files are thin wrappers.** The real state logic lives inside the feature `View` / `Page` components they render. Do NOT refactor the route files themselves — refactor the **feature components** they delegate to.

---

## Target Screens & Their Feature Components

| Route file | Feature component to refactor | Async data source to find |
|---|---|---|
| `app/(store)/index.js` | `src/features/catalog/CatalogView.js` + `useCatalogRootData` | `useCatalog()` → `categoryTree` loading state |
| `app/(store)/cart.js` | `src/features/cart/CartView.js` | `items` from `useCartContext()` |
| `app/(store)/favorites.js` | Find `FavoritesPage.js` in `src/features/favorites/` | favorites array loading state |
| `app/(store)/orders.js` | Find `OrdersPage.js` in `src/features/orders/` | orders array loading state |

---

## The Pattern to Apply (copy this)

For each feature component:

### Step 1 — Find where data loads
Look for the hook that fetches async data (e.g., `useCatalog`, `useUserOrders`, `useFavorites`). Identify:
- Where `loading` / `isLoading` boolean is currently tracked
- Where the data array/object is stored
- Where errors are currently caught (or ignored)

### Step 2 — Apply `useAsyncState` if the hook does raw fetching
If the feature hook does its own `useEffect` + `setState` pattern, integrate `useAsyncState`:
```js
import { useAsyncState } from '@/hooks/useAsyncState';
import { useErrorHandler } from '@/hooks/useErrorHandler';

const { handleError } = useErrorHandler();
const { data, isLoading, isError, isEmpty, execute } = useAsyncState(fetchFn, {
  onError: (err) => handleError(err),
});

useEffect(() => { execute(); }, []);
```

If the hook already exposes `isLoading` / `error` / `data`, **do not add `useAsyncState`**. Instead just map those values to the 4-state render pattern below.

### Step 3 — Apply 4-state render in the View component
Replace ad-hoc conditional rendering with an explicit state switch:

```jsx
import { SkeletonLoader } from '@/components/Feedback';
import { EmptyState } from '@/components/Feedback';

// Inside render:
if (isLoading) return <SkeletonLoader />;
if (isError)   return <EmptyState title="Something went wrong" onRetry={execute} />;
if (isEmpty)   return <EmptyState title="Nothing here yet" description="..." />;
return <ActualContent data={data} />;
```

---

## Per-Screen Notes

### 1. Home / Catalog (`CatalogView.js`)
- `useCatalogRootData()` reads `categoryTree` from `useCatalog()` context — **do not replace with `useAsyncState`**.
- Check `CatalogContext.js` to see if it already exposes `isLoading` / `error`. If yes, map those to 4-state render in `CatalogView.js`.
- The loading state should render `<SkeletonLoader count={6} />` (card-sized skeletons).
- Empty state: "No categories yet" with no retry (data is bootstrapped, not user-triggered).

### 2. Cart (`CartView.js`)
- Cart items come from `useCartContext()` synchronously (in-memory). No async fetch → **no `useAsyncState` needed**.
- Only `empty` and `data` states are relevant.
- `isEmpty` = `items.length === 0`.
- Empty state: "Your cart is empty" with an action button → navigate to `/`.

### 3. Favorites (`FavoritesPage.js`)
- Read the file first. Find the hook that loads favorites.
- If favorites are fetched from Firestore, apply `useAsyncState`.
- Empty state: "No favorites yet" — no retry needed (it's user-curated data).

### 4. Orders (`OrdersPage.js`)
- Read the file first. Find the hook that loads orders (likely hits `ordersRepository`).
- Apply `useAsyncState` if there is a live fetch.
- Empty state: "No orders yet".
- Error state: "Could not load orders" with `onRetry`.

---

## After Making Changes

1. Update the todo: mark `[ ] Refactor store screens...` as `[x]` in:
   `d:\Magazine\_PigmentShop\.todos\error-handling-state-machine\todo.md`
2. Also mark Phase 6 verification tasks as done after running:
   ```
   npm run health
   npm run audit:ui
   ```

---

## Files to Read Before Starting

Read these files in order before touching anything:
1. `src/features/catalog/CatalogContext.js` — check if `isLoading`/`error` are already exposed
2. `src/features/catalog/CatalogView.js` — find where loading/empty/error is currently handled
3. `src/features/favorites/FavoritesPage.js` — understand data flow
4. `src/features/orders/OrdersPage.js` — understand data flow
5. `src/hooks/useAsyncState.js` — confirm the API before using it
