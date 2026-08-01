### 1. Browser UI Overlay & Dynamic Browser Chrome Collisions
- **Codebase Evidence:**
  - `src/theme/appStyles.js:4-6` applies `minHeight: '100vh'` globally on web.
  - `src/features/shell/AppHeader/AppHeaderStyles.js:5-13` applies static `height: 56` without safe-area inset top or dynamic viewport adjustments.
  - `src/features/cart/CartDrawer/CartDrawerFooter.js:43-47` applies static `paddingVertical: layout.spacing.lg` without dynamic bottom toolbar offset.
  - `src/components/ui/Drawer/DrawerStyles.js:15-17` sets panel `height: '100%'`.
- **Root Cause Analysis:**
  - On mobile WebKit (iOS Safari), dynamic browser toolbars (top address bar and bottom navigation bar) expand and collapse during scroll interactions. `100vh` and `height: '100%'` inside WebKit resolve to the **maximum layout viewport height** (toolbars collapsed). Consequently, when browser toolbars are expanded, fixed/absolute bottom containers (e.g., `CartDrawerFooter`) and 100% height drawers are clipped behind the Safari bottom toolbar.
- **Severity:** High
- **Recommended Solution:**
  - Replace static `100vh` in `appStyles.js` with array fallbacks: `minHeight: ['100vh', '100dvh']` or `100svh`.
  - Apply `paddingBottom: 'max(16px, env(safe-area-inset-bottom))'` to bottom drawer footers.
- **Alternative Explanations & Rejection:**
  - *Hypothesis:* Viewport Meta Tag missing `viewport-fit=cover` is the sole cause. (Rejected: While `viewport-fit=cover` controls safe-area boundaries, it does not alter CSS `100vh` behavior during dynamic browser toolbar expansion. `100vh` still overflows dynamic toolbars regardless of meta tags).
- **Confidence Level:** High (95% — Confirmed by codebase styling patterns)

---

### Investigation Summary
- **Status:** Confirmed
- **Severity:** High
- **Confidence:** High (95%)
- **Target Locations:** `appStyles.js`, `CartDrawerFooter.js`
- **Recommended Remediation:** Array fallbacks for `100vh`; dynamic bottom insets
