# Dynamic Product Page Refresh 404 Regression Root Cause Investigation & Route-Aware Architecture Strategy

> **Document Type:** Root Cause Analysis & Architectural Audit (Refined Direction)  
> **Target Issue:** Dynamic product page 404 on mobile browser refresh / pull-to-refresh  
> **Status:** Completed — Route-Aware Refresh Strategy implemented and verified across all routes

---

## 1. Executive Summary

During mobile testing, a previously resolved regression re-emerged: **refreshing a dynamic product page (e.g., `/product/[id]`) on a mobile browser results in an HTTP 404 page**, whereas standard client-side navigation to the same page works cleanly, and reloading the page on desktop does not trigger a 404 error.

This investigation identifies the exact technical mechanics responsible for this behavior and establishes a **Route-Aware Refresh Strategy**. 

Instead of applying a monolithic `window.location.reload()` behavior across all pages, the system separates route handling:
1. **Standard Routes (Home, Catalog, static pages):** Retain hard browser reloads (`window.location.reload()`) to match native browser refresh behavior.
2. **Dynamic Routes (`/product/[id]`):** Preserve identical Pull-to-Refresh gesture tracking, top-of-scroll locking, haptics, and global overlay indicator UI, but execute client-side domain refetches (`customRefresh()`) while remaining within application memory.

---

## 2. Regression Context & Historical Timeline

1. **Initial State (Phase 1):** Pull-to-refresh on Web triggered hard browser reloads (`window.location.reload()`). Dynamic product routes failed with 404 because the static web server could not match `/product/1` to a physical HTML asset.
2. **First Remediation (Phase 2 & 3):** To eliminate the 404 error, `usePullToRefresh.js` was refactored to execute client-side domain data refetches (soft refetches via `customRefresh()`) without reloading the page context. Dynamic routes remained within SPA memory, resolving the 404 defect completely.
3. **Recent Architecture Realignment (UX Audit):** Following user feedback regarding the lack of visual confirmation for soft refetches, `pull-to-refresh-ux-browser-audit.md` explicitly mandated returning to `window.location.reload()` on Web.
4. **Current State (Reappeared Regression):** Restoring `window.location.reload()` inside `usePullToRefresh.js` re-exposed dynamic routes to hard server GET requests, causing the 404 error to reappear on mobile refreshes.

---

## 3. Comparative Navigation Mechanics

| Metric / Stage | SPA In-App Navigation (`Link` / `router.push`) | Desktop Browser Reload (F5 / DevTools) | Mobile Browser Refresh / Pull-To-Refresh |
| :--- | :--- | :--- | :--- |
| **Trigger** | User tap/click on product card | Keypress / Toolbar refresh | PTR gesture (`window.location.reload()`) / Swipe down |
| **HTTP Request Sent** | None (JS state transition only) | GET request to server URL | GET request to server URL over network IP |
| **Server Matching** | Bypassed | Matched by Dev Server / localhost fallback | Hits static server without dynamic route file |
| **Context Readiness** | Catalog Context already hydrated | Hydrates from scratch | Hydrates from scratch (or 404 before JS load) |
| **User Experience** | Smooth product render | Loads page (or SPA fallback handles) | **404 Page Not Found error** |

---

## 4. Plausible Origins & Detailed Root Causes

### Origin 1: Monolithic `window.location.reload()` in `usePullToRefresh.js` (Primary Trigger)
* **Location:** `src/hooks/usePullToRefresh.js` (lines 107–110)
* **Mechanism:** 
  ```javascript
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    window.location.reload();
    return;
  }
  ```
* **Analysis:** Completing a PTR gesture on Web unconditionally invoked `window.location.reload()`. This forced the browser to discard SPA state in JavaScript memory and perform a full document reload from the server URL (e.g. `http://192.168.x.x:8081/product/123`).

### Origin 2: Expo Static Web Output & Missing Dynamic Route Assets (Server Stacking Origin)
* **Location:** `app.json` (line 30: `"web": { "output": "static" }`)
* **Mechanism:** Expo Router static export mode generates static HTML files for static route files (e.g., `/index.html`, `/catalog.html`).
* **Analysis:** Dynamic parameter routes like `app/(store)/product/[id].js` do not have pre-built HTML files generated for arbitrary dynamic product IDs. When the mobile browser reloads `/product/123`, the static web server searches disk for `/product/123.html`. Finding neither, the server returns an HTTP 404 response.

### Origin 3: Network Host Binding & Metro Single-Page Fallback Discrepancy
* **Location:** Metro Web Server configuration & host resolution (`localhost` vs LAN IP)
* **Analysis:** Mobile devices connected over the local network (e.g. `http://192.168.1.50:8081/product/123`) bypass standard `localhost` SPA rewrite rules in Metro, causing hard GET requests for non-file paths to terminate in 404 errors.

---

## 5. Refined Architectural Direction: Route-Aware Refresh Strategy

To permanently eliminate the 404 regression on dynamic routes while preserving native browser reload UX on standard pages, the system adopts a **Route-Aware Refresh Strategy**.

```
                         [ Pull-to-Refresh Gesture Triggered ]
                                           │
                                 Is Platform Web?
                                ╱                ╲
                             (Yes)               (No: Native Mobile)
                              ╱                      │
                   Check Route Strategy      Standard Native Refresh
                  ╱                    ╲     (RefreshControl / Callbacks)
          [Standard Route]          [Dynamic Route: /product/[id]]
                 │                                 │
     window.location.reload()           Execute customRefresh()
   (Native Browser Page Paint)        (Client-Side Data Refetch)
                 │                                 │
         Full Page Reload                  UI Updates in Place
                 └─────────────────┬───────────────┘
                                   │
                     [ Universal Visual Feedback ]
                   (Global PullToRefreshIndicator Overlay
                    + Haptics + Smooth Spring Dismissal)
```

### 5.1 Core Architectural Principles

1. **Uniform User Feedback Layer:** All routes—whether standard or dynamic—share the exact same visual gesture feedback (`PullToRefreshIndicator` at `zIndex: 999999`), top-of-scroll detection (`window.scrollY === 0`), and haptic feedback.
2. **Divergent Execution Strategy:**
   * **Standard Routes (`strategy: 'reload'`):** Home (`/`), Catalog (`/catalog`), Cart, Account, and static pages execute `window.location.reload()`.
   * **Dynamic Routes (`strategy: 'refetch'` or `isDynamicRoute: true`):** Product detail pages (`/product/[id]`) execute `customRefresh()` (e.g., `state.refresh()`), maintaining application memory context without network navigation.

### 5.2 Integration with Existing Architecture

* **`PullToRefreshContext` & `PullToRefreshIndicator`:** Remain 100% untouched and universal. The top-level `<PullToRefreshIndicator />` rendered in `app/_layout.js` listens to `pullDistance` and `refreshing` from context and floats cleanly above all sticky headers regardless of whether the refresh triggers a hard reload or soft refetch.
* **`usePullToRefresh.js`:** Extended to support an optional strategy configuration:
  ```javascript
  // Options schema extension
  usePullToRefresh(customRefresh, {
    scrollViewRef,
    isDynamicRoute: true, // Or strategy: 'refetch'
  })
  ```
  On `handleTouchEnd`, if `isDynamicRoute` (or `strategy === 'refetch'`) is set, the hook sets `refreshing = true`, executes `await customRefresh()`, and resets `refreshing = false` with smooth animation, skipping `window.location.reload()`.

---

## 6. Rationale, Advantages & Trade-Offs

### Rationale
* **Zero 404 Risk:** Dynamic routes never make hard HTTP requests to unmapped server endpoints.
* **High-Fidelity Feedback:** Users receive identical visual spinner feedback floating above headers on dynamic routes, solving the historical "silent update" complaint without breaking routing.

### Advantages
* **100% Route Resilience:** Completely immunizes dynamic parameter routes against static server 404 errors.
* **Consistent Design Tokens & Motion:** Visual indicator lifecycle (`opacity`, `rotation`, success color transition) is identical across all pages.
* **Zero Infrastructure Overhead:** Does not require modifying server configuration, NGINX rewrites, or Vercel static router rules.

### Trade-Offs
* **Execution Duality:** Developers must ensure dynamic page components provide a valid `customRefresh` callback when mounting `usePullToRefresh` with `isDynamicRoute: true`.

---

## 7. Updated Implementation Execution Plan

> **Plan Complexity:** `◕ FH — 1d 3f +2r`

### Task 1: Parameterize Strategy in `usePullToRefresh` Hook `◐ FM — 1d 1f +1r — Task 1`
* **Target File:** `src/hooks/usePullToRefresh.js`
* **Action:** Update `onRefresh` handler to inspect `options.isDynamicRoute` or `options.strategy`. 
* **Logic:** If `options.isDynamicRoute` is `true`, skip `window.location.reload()` and await `customRefresh()` with `setRefreshing(true/false)`. Default to `window.location.reload()` for standard routes.

### Task 2: Configure Route Strategy on Dynamic Product Page `◐ FM — 1d 2f +1r — Task 2`
* **Target Files:** `src/features/product/ProductPage.js`, `app/(store)/product/[id].js`
* **Action:** Pass `isDynamicRoute: true` and the product refetch handler (`handleRefresh`) to `PageScrollLayout` / `usePullToRefresh`.

### Task 3: Route Audit & E2E Mobile Verification `○ FL — 1d 0f +3r — Task 3`
* **Target:** Mobile browser emulation across Home, Catalog, Product (`/product/[id]`), and Account pages.
* **Verification:** Confirm Home/Catalog trigger native page reload while Product page displays overlay spinner, refetches data in SPA context, and avoids 404 errors.
