# Root Cause Analysis & Architecture Investigation: Dynamic Route Direct Navigation & Refresh 404 in Deployed Environment

> **Document Type:** Root Cause Analysis & Architecture Investigation  
> **Target Subsystem:** Expo Router Web Architecture, Build Pipeline & Vercel Edge Routing  
> **Affected Routes:** Dynamic Storefront Routes (`/product/[id]`, `/catalog/[categoryId]`)  
> **Impact:** Deep linking failure, direct URL entry 404, hard refresh 404, pull-to-refresh hard reload 404 in production  
> **Status:** Investigation Complete — Ready for Architectural Alignment & Implementation  

---

## 1. Executive Summary

### 1.1 The Problem Statement
In the Pigment Shop application, dynamic storefront routes (such as Product Details `/product/[id]` and Category Catalog `/catalog/[categoryId]`) exhibit divergent routing behavior depending on execution context:
1. **Client-Side In-App Navigation:** Navigating between screens within the running Single Page Application (SPA) works smoothly without error.
2. **Local Development Server (`localhost:8081`):** Direct URL entry, deep links, and browser refreshes (F5 / reload) on dynamic routes resolve and render properly.
3. **Deployed Production Environment (Vercel):** Direct URL entry, deep links, and page reloads on any dynamic route immediately fail with an HTTP 404 Page Not Found error.

This defect disrupts critical user journeys: users cannot bookmark product pages, share direct product links via messaging/social platforms, or refresh dynamic pages without losing access.

### 1.2 Root Cause Summary
The failure stems from an architectural mismatch between **Expo Router's static build output (`output: "static"`)**, **missing static parameter generation (`generateStaticParams`)**, and **Vercel's static file routing pipeline**:
* During build (`expo export -p web`), Expo Router in `"static"` mode pre-renders static HTML files per route. For dynamic routes without pre-defined params, it generates fallback templates named literally with brackets: `dist/product/[id].html` and `dist/catalog/[categoryId].html`.
* In local development, the Metro development server runs an active Node.js middleware that dynamically resolves route patterns against AST definitions at runtime.
* In Vercel, incoming HTTP GET requests for `/product/1` query the static file system. Because `dist/product/1` and `dist/product/1.html` do not exist on disk, and Vercel does not automatically map dynamic pattern `/product/:id` to `dist/product/[id].html`, the static CDN returns a 404 error (or serves `dist/index.html` which fails client-side hydration because the pre-rendered shell belongs to the Home route `/`).

---

## 2. Detailed Execution Flow Comparison

The following comparative breakdown illustrates the exact lifecycle of a dynamic route request across all four execution contexts.

### 2.1 Context Comparison Matrix

| Lifecycle Stage | 1. Local Dev: Client Navigation | 2. Local Dev: Direct / Refresh | 3. Vercel: Client Navigation | 4. Vercel: Direct / Refresh (Failing) |
| :--- | :--- | :--- | :--- | :--- |
| **Trigger** | In-app tap (`Link` / `router.push`) | Address bar input / `F5` / reload | In-app tap (`Link` / `router.push`) | Address bar input / `F5` / reload |
| **Network Request** | **None** (In-memory) | `GET /product/123` to Metro | **None** (In-memory) | `GET /product/123` to Vercel CDN |
| **Server Routing Layer** | Bypassed | Metro Expo Router Middleware | Bypassed | Vercel Edge Static File Engine |
| **Asset Matching** | N/A | Evaluates route AST on the fly | N/A | Searches for `dist/product/123(.html)` |
| **HTTP Response** | N/A | `200 OK` (Dynamic HTML / JS) | N/A | **`404 Not Found`** (or mismatched `/index.html`) |
| **Client Hydration** | Context already resident | Hydrates route from URL params | Context already resident | Fails to boot or displays 404 |
| **User Experience** | Instant seamless transition | Screen renders correctly | Instant seamless transition | **Broken 404 Error Screen** |

---

### 2.2 Visual Execution Flow Diagrams

#### Flow A: Client-Side In-App Navigation (Localhost & Deployed)
```
[ User Clicks Product Card ]
             │
             ▼
[ Expo Router Client Router (expo-router) ]
             │
             ├─► history.pushState(null, '', '/product/123')  [URL bar updates without network request]
             ├─► Extracts params: { id: '123' } via useLocalSearchParams()
             ├─► Mounts app/(store)/product/[id].js inside <Slot />
             │
             ▼
[ ProductPage Component Renders ] ──► (Catalog Context / Firebase cache hydrates data) ──► SUCCESS
```

#### Flow B: Local Development Server Direct Request (`http://localhost:8081/product/123`)
```
[ Browser Sends GET /product/123 HTTP/1.1 ]
             │
             ▼
[ Metro Dev Server (Node.js Process) ]
             │
             ▼
[ Expo Router Dev Middleware ]
             │
             ├─► Inspects route tree in file system: app/(store)/product/[id].js
             ├─► Matches '/product/123' -> pattern '/product/[id]' with params { id: '123' }
             ├─► Generates dynamic HTML document on the fly with injected bundle script tags
             │
             ▼
[ Browser Receives HTTP 200 OK HTML ]
             │
             ▼
[ Browser Executes JS Bundle ] ──► Hydrates Expo Router with route '/product/123' ──► SUCCESS
```

#### Flow C: Deployed Environment Direct Request (`https://pigment-shop.vercel.app/product/123`) — THE POINT OF FAILURE
```
[ Browser Sends GET /product/123 HTTP/1.1 to Vercel Edge ]
             │
             ▼
[ Vercel CDN / Static File Engine ]
             │
             ├─► Step 1: Check exact static file: 'dist/product/123' ──► NOT FOUND
             ├─► Step 2: Check cleanUrls static file: 'dist/product/123.html' ──► NOT FOUND
             │           (Actual file on disk is literally 'dist/product/[id].html')
             ├─► Step 3: Check vercel.json rewrite rules:
             │           Rewrite: source "/(.*)" -> destination "/index.html"
             │
             ▼
       ┌─────────────────────────────────────────────────────────────┐
       │ DIVERGENCE PATHWAY:                                         │
       │ Scenario 1 (Static file missing & no dynamic rule): 404     │
       │ Scenario 2 (Rewritten to /index.html):                      │
       │   - Vercel returns dist/index.html (Pre-rendered for '/')   │
       │   - Browser loads HTML containing Home DOM + metadata       │
       │   - JS bundle boots with globalThis.__EXPO_ROUTER_HYDRATE__ │
       │   - Hydration mismatch / route mismatch occurs              │
       │   - Expo Router resolves route as Unmatched -> 404 Screen   │
       └─────────────────────────────────────────────────────────────┘
             │
             ▼
[ User Sees 404 Page Not Found ] ──► FAILURE
```

---

## 3. Exact Point of Execution Path Divergence

The exact architectural point where execution diverges occurs at the **Network Boundary**:

```
                              [ Navigation Trigger ]
                                        │
                      Is it In-App (Link) or Direct (GET)?
                                    ╱        ╲
                       (In-App Link)          (Direct GET Request)
                            ╱                    ╲
         [ Client In-Memory Router ]        [ Server / CDN Network Layer ]
                    │                                     │
           Browser History API              Which Environment Handles GET?
          Zero Network Overhead                          ╱            ╲
                    │                             (Localhost)       (Vercel)
                    ▼                                 │                 │
              [ SUCCESS ]                      [ Metro Middleware ] [ Static File Engine ]
                                               (Runtime AST Match)  (Disk Lookup)
                                                      │                 │
                                                      ▼                 ▼
                                                 [ SUCCESS ]       [ 404 ERROR ]
```

1. **Client Navigation never touches the server:** In-app navigation via `expo-router` is purely synchronous client-side state manipulation within the browser's JavaScript execution thread.
2. **Direct Navigation requires the host to resolve the route:** When a URL is entered directly or reloaded, the host server must supply the initial HTML document and bootstrap script.
3. **Metro resolves routes dynamically; Vercel resolves statically:** Metro executes server-side JavaScript to resolve dynamic parameters in real time. Vercel serves static files from disk based on strict filesystem paths and declarative rewrite patterns.

---

## 4. Plausible Origins & Root Cause Analysis

### Origin 1: Static Export Mode (`output: "static"`) Without `generateStaticParams`
* **Configuration Evidence:** [app.json](file:///d:/Magazine/_PigmentShop/app.json#L30) line 30:
  ```json
  "web": {
    "output": "static",
    "favicon": "./src/assets/favicon.png"
  }
  ```
* **Build Artifact Evidence:** Inspecting the generated `dist/` directory shows:
  ```
  dist/
  ├── (store)/
  ├── index.html                  <-- Pre-rendered Home page
  ├── catalog/
  │   ├── index.html              <-- Pre-rendered Catalog main
  │   └── [categoryId].html       <-- Literal bracket template
  ├── product/
  │   └── [id].html               <-- Literal bracket template
  ├── cart.html                   <-- Pre-rendered Cart page
  └── +not-found.html
  ```
* **Analysis:** `output: "static"` instructs Expo CLI (`expo export -p web`) to generate static HTML for every route. Because `app/(store)/product/[id].js` and `app/(store)/catalog/[categoryId].js` do not implement `generateStaticParams()`, Expo cannot pre-generate static pages for specific IDs (`dist/product/1.html`, `dist/product/2.html`). Instead, it emits generic template files named `[id].html` and `[categoryId].html`. A standard web server does not map `/product/123` to `[id].html` without explicit routing configuration.

---

### Origin 2: Catch-All SPA Rewrite Mismatch with Static Export Hydration
* **Configuration Evidence:** [vercel.json](file:///d:/Magazine/_PigmentShop/vercel.json#L6-L11):
  ```json
  {
    "cleanUrls": true,
    "rewrites": [
      {
        "source": "/(.*)",
        "destination": "/index.html"
      }
    ]
  }
  ```
* **Analysis:**
  1. In `output: "static"` mode, `dist/index.html` is **not** a generic SPA shell. It is the static HTML pre-rendered specifically for the Home screen (`/`), containing Home DOM nodes, pre-rendered markup, and Home-specific hydration state (`globalThis.__EXPO_ROUTER_HYDRATE__ = true`).
  2. When Vercel applies the catch-all rewrite to `/product/123`, it serves `dist/index.html`.
  3. When the browser executes the JavaScript bundle (`entry-xxx.js`), Expo Router encounters a route mismatch between the active URL (`/product/123`) and the static DOM/manifest of `index.html`.
  4. Expo Router's client runtime fails hydration and falls back to rendering its internal `<Unmatched />` component, displaying a 404 page inside the app shell.

---

### Origin 3: Absence of Dynamic Route Template Rewrites in `vercel.json`
* **Analysis:** If `output: "static"` is utilized, Vercel must be explicitly informed that requests matching `/product/:id` must be served by `dist/product/[id].html`, and requests matching `/catalog/:categoryId` must be served by `dist/catalog/[categoryId].html`.
* **Evidence:** `vercel.json` contains only a single catch-all rewrite to `/index.html`, omitting all dynamic segment rewrite definitions.

---

### Origin 4: Development Environment False Parity (Metro Dev Middleware)
* **Analysis:** `npm run dev` / `expo start` runs Metro with Expo Router's local development server. The development server intercepts every incoming HTTP request and performs dynamic runtime route matching using Node.js filesystem watchers. This masks static export routing defects, giving the illusion that direct navigation and reloads work out of the box.

---

## 5. Architectural Findings

1. **Static Export (`output: "static"`) vs SPA (`output: "single"`):**
   * `output: "static"` is designed for Static Site Generation (SSG) where all route paths are known at build time or where each dynamic template is served by a smart edge server.
   * `output: "single"` is designed for Single Page Applications (SPAs) where a single universal `index.html` shell is emitted and all routing is dynamically resolved on the client at runtime.
2. **E-Commerce Catalog Dynamics:**
   * Pigment Shop's product inventory and category catalog are dynamically fetched from Firebase and local mock stores. Products can be added, updated, or modified without triggering a full site rebuild.
   * Pre-rendering all possible dynamic IDs via `generateStaticParams()` creates a build-time dependency on database state and fails for newly created products unless re-exported.
3. **Pull-to-Refresh & Deep Linking Cohesion:**
   * The issue observed during mobile browser refresh and Pull-to-Refresh is directly tied to this host routing gap. When a dynamic page triggers a browser reload, the browser initiates a hard `GET` request to the server URL, triggering the exact same 404 failure pathway.

---

## 6. Evaluation of Architectural Solutions

| Strategy | Mechanism | Pros | Cons | Feasibility |
| :--- | :--- | :--- | :--- | :--- |
| **Strategy A: Pure SPA Mode (`output: "single"`)** | Change `web.output` to `"single"` in `app.json`. Generates universal `index.html`. | • Universal deep linking support<br>• Fully compatible with standard Vercel SPA rewrite `/(.*) -> /index.html`<br>• Zero build-time database dependency<br>• 100% immune to dynamic 404s | • Does not pre-render static HTML per route for SEO | **Highest (Recommended)** |
| **Strategy B: Dynamic Route Rewrites in `vercel.json`** | Keep `output: "static"`, add specific rewrites in `vercel.json` mapping `/product/:id` -> `/product/[id].html`. | • Preserves static pre-rendered HTML for static pages (`/`, `/catalog`, `/cart`)<br>• Serves dedicated fallback template | • Requires maintaining manual rewrite list in `vercel.json` whenever dynamic routes change<br>• Brackets in URLs may need encoding | **High (Viable Alternative)** |
| **Strategy C: Build-Time SSG (`generateStaticParams`)** | Implement `generateStaticParams()` in `[id].js` to export physical HTML for all products at build time. | • Full static HTML for all existing products (Optimal SEO) | • New products added post-build will still 404<br>• Increases build time linearly with catalog size | **Low (Fragile for dynamic data)** |
| **Strategy D: Server-Side Rendering (`output: "server"`)** | Deploy Expo server functions on Vercel Edge / Node runtime. | • On-demand dynamic SSR with full SEO | • Requires complex serverless adapter setup and deployment overhead | **Medium (Excessive complexity)** |

---

## 7. Recommended Long-Term Architectural Direction

### Primary Recommendation: Adopt Single-Page Application (SPA) Mode (`output: "single"`)

For Pigment Shop's current architecture (client-hydrated React Native Web application with Firebase backend and dynamic catalog):
1. **Configure Web Output as `"single"`:**
   Update [app.json](file:///d:/Magazine/_PigmentShop/app.json#L30) to specify `"web": { "output": "single" }`.
   * Expo CLI will export a single universal `dist/index.html` shell designed to mount any route on initial load.
2. **Align Vercel Routing Configuration:**
   Maintain the standard SPA catch-all rewrite in [vercel.json](file:///d:/Magazine/_PigmentShop/vercel.json#L6-L11):
   ```json
   {
     "$schema": "https://openapi.vercel.sh/vercel.json",
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "cleanUrls": true,
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```
3. **Universal Deep Linking & Reload Resilience:**
   * Direct navigation to `/product/123`, `/catalog/pigments`, `/profile`, `/orders` will serve `dist/index.html`.
   * Expo Router initializes on the client, parses `window.location.pathname`, extracts params `{ id: '123' }`, and mounts the correct route component without 404 errors.
   * Pull-to-Refresh hard browser reloads (`window.location.reload()`) on dynamic routes will succeed natively.

---

## 8. Sequential Implementation Plan

> **Plan Scope:** Documentation & Architectural Implementation Blueprint  
> **Complexity:** Low Risk / High Impact (Config & Verification)

### Phase 1: Configuration Alignment `◐ FM — 1d 2f +1r — Phase 1`
1. **Target File:** [app.json](file:///d:/Magazine/_PigmentShop/app.json#L29-L32)
   * Modify `"web": { "output": "static" }` to `"web": { "output": "single" }`.
2. **Target File:** [vercel.json](file:///d:/Magazine/_PigmentShop/vercel.json#L1-L13)
   * Verify output directory is `"dist"` and rewrites point `/(.*)` to `/index.html`.

### Phase 2: Build Artifact Validation `○ FL — 1d 0f +2r — Phase 2`
1. Execute web export locally:
   ```bash
   npx expo export -p web
   ```
2. Verify exported directory structure:
   * Confirm `dist/index.html` is generated as a universal SPA shell.
   * Confirm asset paths (`_expo/static/...`, `media/...`, `favicon.ico`) remain intact.

### Phase 3: Local Static Server Emulation `○ FL — 1d 0f +1r — Phase 3`
1. Run a local static file server with SPA fallback to test production behavior before deploying:
   ```bash
   npx serve dist -s
   ```
2. Test direct URL navigation:
   * Navigate directly to `http://localhost:3000/product/1`
   * Navigate directly to `http://localhost:3000/catalog/pigments`
   * Reload dynamic pages in browser.

### Phase 4: Route Resilience & Pull-to-Refresh Verification `○ FL — 1d 0f +2r — Phase 4`
1. Verify that `usePullToRefresh` hard browser reloads on dynamic pages function seamlessly without 404 errors.
2. Confirm deep linking and direct URL sharing across mobile and desktop browsers.

---

## 9. Validation Criteria & Acceptance Tests

| Test Case ID | Test Scenario | Execution Step | Expected Result | Pass/Fail Criteria |
| :--- | :--- | :--- | :--- | :--- |
| **TC-DIR-01** | Direct Dynamic Product URL Navigation | Paste `https://<domain>/product/1` directly into empty browser tab | Page loads directly into Product 1 details | HTTP 200, product details visible, no 404 |
| **TC-DIR-02** | Direct Dynamic Category URL Navigation | Paste `https://<domain>/catalog/pigments` directly into empty browser tab | Page loads directly into Category view | HTTP 200, filtered products visible, no 404 |
| **TC-REF-01** | Dynamic Product Page Browser Refresh | While on `/product/1`, press `F5` / browser reload button | Page reloads and re-mounts Product 1 | No 404, clean reload |
| **TC-REF-02** | Dynamic Category Page Browser Refresh | While on `/catalog/pigments`, press `F5` / browser reload button | Page reloads and re-mounts Category | No 404, clean reload |
| **TC-PTR-01** | Dynamic Route Pull-to-Refresh Reload | Perform PTR gesture on mobile browser while on `/product/1` | Reloads or refetches without routing failure | Full UI recovery, no 404 |
| **TC-SPA-01** | In-App Client Navigation Integrity | Click between Home -> Catalog -> Product -> Cart | Instant client transitions | Zero regressions in SPA transitions |
| **TC-SHR-01** | Deep Link Sharing via Messaging | Open shared link from external app on mobile device | App opens directly to designated product | Complete deep link resolution |
