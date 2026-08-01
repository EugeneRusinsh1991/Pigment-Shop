### 4. Layout Recalculation Stale State After Visual Viewport Resizing
- **Codebase Evidence:**
  - Over 25+ project files (e.g., `useAppShell.js`, `useCatalogLayout.js`, `useCardDimensions.js`) import and consume `useWindowDimensions()` from `'react-native'`.
  - `src/components/ui/Modal/Modal.js` and `src/components/ui/Drawer/Drawer.js` lack `window.visualViewport` listeners during soft keyboard display.
- **Root Cause Analysis:**
  - In iOS Safari, when a user focuses a form input (e.g., search or checkout input), the soft keyboard slides up. iOS Safari resizes `window.visualViewport`, but **does not** resize `window.innerWidth`/`innerHeight` or fire standard `window.onresize` events in all modes. React Native Web's `useWindowDimensions()` hook listens exclusively to `window.onresize`.
  - Consequently, `useWindowDimensions()` returns stale dimensions, and Modal/Drawer bounds fail to adjust, causing focused text inputs to be hidden beneath the virtual keyboard.
- **Severity:** Medium
- **Recommended Solution:**
  - Create a web-optimized `useVisualViewportDimensions()` hook that attaches to `window.visualViewport` when `Platform.OS === 'web'`.
- **Alternative Explanations & Rejection:**
  - *Hypothesis:* React Native Web `useWindowDimensions` automatically tracks `window.visualViewport`. (Rejected: React Native Web binds `Dimensions` to standard window resize event dispatchers. `visualViewport` events are non-standard WebKit visual events that require explicit listeners).
- **Confidence Level:** High (90% — Codebase confirms widespread reliance on `useWindowDimensions` without `visualViewport` integration)

---

### Investigation Summary
- **Status:** Probable
- **Severity:** Medium
- **Confidence:** High (90%)
- **Target Locations:** 25+ files via `useWindowDimensions()`
- **Recommended Remediation:** Create `useVisualViewportDimensions()` hook
