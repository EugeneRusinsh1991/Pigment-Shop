### 3. Runtime CSS Overflow Injection Causing Sticky Instability & Scroll Leaks
*(Note: Consolidates previous findings on Scroll Lock Conflicts & Fixed Position Instability)*
- **Codebase Evidence:**
  - `src/hooks/useHomeScrollHide.js:19-20` dynamically injects global CSS: `#root > [data-testid] { overflow-x: clip !important; overflow-y: visible !important; }` and `#root > div { overflow-x: clip !important; }`.
  - `src/hooks/useHomeScrollHide.js:37-41` animates `translateY` on header view during scroll events.
  - `src/components/ui/Drawer/Drawer.js:58-101` renders `<Modal>` overlay without locking `document.body` scroll or applying `overscroll-behavior: contain`.
- **Root Cause Analysis:**
  - **Scroll Leaks:** iOS Safari implements native physics-based elastic overscroll. When scrolling inside a `ScrollView` inside `CartDrawer` hits its boundary, WebKit propagates touch scroll deltas upward. Because `useHomeScrollHide.js` explicitly sets `overflow-y: visible !important` on root containers, the momentum passes directly to `document.body`, causing background page rubber-banding.
  - **Sticky Instability:** To workaround React Native Web's default `overflow: hidden` containers (which break CSS `position: sticky`), `useHomeScrollHide.js` injects `#root > div { overflow-x: clip !important; }`. However, WebKit engines on iOS Safari prior to iOS 16 fallback `overflow: clip` to `overflow: hidden`, which silently disables `position: sticky`. Furthermore, animating `translateY` on sticky/fixed elements without WebKit hardware acceleration triggers repaints on the main thread, causing header flickering.
- **Severity:** High
- **Recommended Solution:**
  - Apply `document.body.style.overflow = 'hidden'` dynamically when drawers/modals are active on web.
  - Apply CSS `overscroll-behavior: contain` to scrollable panel containers in `DrawerStyles.js`.
  - Move global `overflow-x: clip` overrides from runtime JS injection into static application CSS (`appStyles.js`).
  - Add GPU compositor layer hints (`transform: translateZ(0)` or `will-change: transform`) to animated sticky headers.
- **Confidence Level:** High (95% — Direct codebase evidence of dynamic head injection and missing scroll locks)

---

### Investigation Summary
- **Status:** Confirmed
- **Severity:** High
- **Confidence:** High (95%)
- **Target Locations:** `useHomeScrollHide.js`, `Drawer.js`
- **Recommended Remediation:** Body scroll locks; move CSS to static files; GPU hints
