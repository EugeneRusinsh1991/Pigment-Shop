# Pull-to-Refresh 404 on Dynamic Product Routes — Investigation

## 1. Problem Statement
- **Symptom**: Pulling to refresh on `/product/[id]` routes on mobile web returns a **404**.
- **Works**: Desktop F5 reload, opening the same URL in a new browser window.
- **Fails**: Only the custom pull-to-refresh gesture on mobile web.

---

## 2. Refined Root-Cause Analysis: Facts vs. Assumptions

To definitively find the root cause, we must separate verified facts from speculative assumptions from previous analyses.

### ❌ Eliminated Assumption: The "Race Condition" Hypothesis
The previous investigation assumed that Native Pull-to-Refresh (PTR) racing with `window.location.reload()` caused the Metro Dev Server to cancel requests and return a 404.
**Fact Check**: 
1. Stress tests sending simultaneous requests to the Metro Dev Server for `/product/1` consistently return `200 OK`. 
2. Triggering the custom JS touch gesture concurrently with native browser actions in a simulated mobile environment yields a `200 OK` and successful client-side route match.
**Conclusion**: The Metro Dev Server handles race conditions robustly and does not return HTTP 404s or Expo Router "Unmatched" screens for these scenarios.

### ✅ Verified Fact 1: `usePullToRefresh` Fallback Behavior
The custom pull-to-refresh hook (`usePullToRefresh.js`) falls back to a hard browser reload (`window.location.reload()`) if a `customRefresh` function is not provided.
- On the `/catalog` route, `ProductGrid.js` **passes** a custom refresh function (data refetching), bypassing the hard reload entirely.
- On the `/product/[id]` route, `ProductPage.js` **does not pass** a custom function, triggering the hard reload.
**Conclusion**: This perfectly explains why the issue is strictly isolated to the `/product/[id]` route.

### ✅ Verified Fact 2: Static Export Configuration
The project's `app.json` specifies `"web": { "output": "static" }`. 
- Because `app/(store)/product/[id].js` does not export `generateStaticParams`, the static build process (`npm run build`) generates a literal file `dist/product/[id].html` instead of specific product files like `123.html`.
- On any standard static web host (without SPA rewrites configured), a hard request to `/product/123` will inherently result in an HTTP 404 Not Found, because `123.html` does not exist on disk.

---

## 3. Current Strongest Hypothesis (Unconfirmed)

While the facts perfectly align with an SPA routing mismatch on a statically hosted environment, the available evidence is **insufficient to confirm this as the definitive root cause**. 

The current analysis relies on a critical **unverified assumption**: that the "Desktop F5 works, Mobile PTR fails" discrepancy is caused by testing the two scenarios in different environments.

1. **Verified**: The local Metro Dev Server correctly handles hard reloads for `/product/1` and returns `200 OK`. (F5 works here).
2. **Verified**: A statically exported build without SPA rewrites or `generateStaticParams` will inherently return a `404 Not Found` on a hard request to `/product/123`.
3. **Unverified Assumption**: We are *assuming* the Mobile Pull-to-Refresh test was conducted on a statically exported build (e.g., `npx serve dist` or a static host). If the Mobile PTR test was actually conducted against the Metro Dev Server, this entire hypothesis is disproven, and the 404 must stem from an unknown mechanism within the Expo/Metro stack.

**Conclusion**: We cannot confirm this root-cause analysis without explicitly verifying the environment where the Mobile PTR 404 was observed. Until then, it remains our strongest hypothesis, but unconfirmed.

---

## 4. Implementation Tasks

The recommended solution is to **Implement Client-Side Refetching**. We will stop relying on `window.location.reload()` and instead pass a custom data-refetching function to `usePullToRefresh` in `ProductPage.js` (just as it is done in `ProductGrid.js`). This keeps the user within the SPA, provides a seamless experience, and completely avoids server-side 404s.

### Task List:

- [x] **1. Expose Refetch Logic** `◐ FM — 1d 1f +1r`
  - **File**: `src/hooks/useProductPageState.js`
  - **Action**: Ensure the hook exposes a `refresh` or `refetch` function that re-fetches the current product's data from the backend/store.

- [x] **2. Wire Up Pull-to-Refresh** `◐ FM — 1d 1f +1r`
  - **File**: `src/features/product/ProductPage.js`
  - **Action**: Extract the refetch method from the state object returned by `useProductPageState` and pass it to the `usePullToRefresh` hook.
  - **Example**:
    ```javascript
    const state = useProductPageState({ initialProduct, onBack, isFromAllProductsProp });
    
    const handleRefresh = async () => {
      if (state.refresh) {
        await state.refresh();
      }
    };
    
    usePullToRefresh(handleRefresh);
    ```

- [x] **3. Verification** `○ FL — 1d 0f +0r`
  - **Action**: Test the pull-to-refresh gesture on the `/product/[id]` route on mobile web (or simulated mobile in dev server) to confirm that the data reloads smoothly without triggering a hard browser reload or 404 error.
