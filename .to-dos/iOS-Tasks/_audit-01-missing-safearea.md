### 1. Missing `SafeAreaProvider` Hierarchy & Unhandled Safe Area Insets (iOS, Android, Web)
- **Codebase Evidence (Cross-Platform):**
  - `package.json:16` defines dependency `"react-native-safe-area-context": "~5.7.0"`.
  - `src/context/AppProviders.js` and `app/_layout.js` **do not import or render `<SafeAreaProvider>`** in the component tree.
  - `src/features/shell/AppHeader/AppHeaderStyles.js:5-13` sets a static header height (`height: 56`) without `safe-area-inset` allowances.
  - `src/features/cart/CartDrawer/CartDrawerFooter.js:43-47` sets static vertical padding (`paddingVertical: layout.spacing.lg`) without bottom safe-area insets.
  - `src/components/ui/Drawer/Drawer.js:81` uses `SafeAreaView` from `'react-native'`, which is deprecated in core React Native and renders as a plain `div` in React Native Web without CSS environment variable mapping.

- **Root Cause Analysis & Platform Impact:**
  - **Shared Mobile Behavior:** Without `SafeAreaProvider` wrapping the root application, any native safe-area hook (`useSafeAreaInsets()`) returns `0` for all margins, disabling dynamic padding on both iOS and Android devices.
  - **iOS Specific (Primary):** Omitting safe area insets causes the top header to underlap the Notch or Dynamic Island. At the bottom, static padding in components like `CartDrawerFooter` causes content to overlap with the iOS Home Indicator, breaking touch targets.
  - **Android Specific:** While Android typically handles system bar offsets at the OS level, edge-to-edge layouts (often the default in Expo Router) or devices with camera cutouts (hole-punch displays) will see content obscured by the hardware camera or bottom software navigation bar when insets are assumed to be `0`.
  - **Cross-Platform / Web (iOS Safari):** On Expo Web (WebKit), static dimensions do not respect `env(safe-area-inset-top)` or `env(safe-area-inset-bottom)`. If `viewport-fit=cover` is omitted from the HTML viewport meta tag, iOS Safari renders black bars or overlays system bars directly across interactive controls.

- **Severity:** High
- **Recommended Solution:**
  1. **Shared Mobile:** Wrap the application shell in `AppProviders.js` with `<SafeAreaProvider>`.
  2. **Cross-Platform:** Replace deprecated `'react-native'` `SafeAreaView` imports with `SafeAreaView` from `react-native-safe-area-context` in `Drawer.js`.
  3. **iOS & Android Dynamic Layouts:** Use `useSafeAreaInsets()` for dynamic top/bottom padding instead of static values in components like `AppHeader` and `CartDrawerFooter`.
  4. **Web:** For Expo Web styles, use platform-selective CSS environment variables:
     ```javascript
     header: {
       ...Platform.select({
         web: { paddingTop: 'max(12px, env(safe-area-inset-top))' },
         default: {}
       })
     }
     ```

- **Trade-offs & Possible Side Effects:**
  - Using `env(safe-area-inset-*)` on Web requires ensuring `<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">` is present in the document head.
  - Care must be taken not to double-apply padding on native iOS/Android builds when combining CSS insets with `useSafeAreaInsets()`.
- **Confidence Level:** High (100% — Confirmed by code inspection)

---

### Investigation Summary
- **Status:** Confirmed
- **Severity:** High
- **Confidence:** High (100%)
- **Target Locations:** `AppProviders.js`, `AppHeaderStyles.js`, `CartDrawerFooter.js`, `Drawer.js`
- **Recommended Remediation:** Mount `SafeAreaProvider`; replace core `SafeAreaView`; use `useSafeAreaInsets()` natively and `env(safe-area-inset-*)` on Web.
- **Model Recommendation:** `◕ FH — 2d 5f +2r`

---

### Implementation Plan

**Task 1: Mount `SafeAreaProvider`** (`◐ FM — 1d 1f +1r`)
- **Objective:** Wrap the application root to enable native safe area insets.
- **Affected Areas:** `src/context/AppProviders.js`
- **Dependencies:** None
- **Expected Outcome:** `useSafeAreaInsets()` returns valid dynamic insets on iOS/Android.

**Task 2: Replace Deprecated `SafeAreaView`** (`○ FL — 1d 1f +0r — Task 2 [Parallel with Task 3, Task 4]`)
- **Objective:** Swap core React Native `SafeAreaView` with the `react-native-safe-area-context` equivalent.
- **Affected Areas:** `src/components/ui/Drawer/Drawer.js`
- **Dependencies:** Task 1
- **Expected Outcome:** `Drawer` respects safe areas consistently across Native and Web.

**Task 3: Refactor App Header for Dynamic Top Insets** (`◐ FM — 1d 2f +1r — Task 3 [Parallel with Task 2, Task 4]`)
- **Objective:** Convert static header height to dynamic padding using `useSafeAreaInsets()` and Web CSS variables.
- **Affected Areas:** `src/features/shell/AppHeader/AppHeaderStyles.js`, `src/features/shell/AppHeader/AppHeader.js`
- **Dependencies:** Task 1
- **Expected Outcome:** Header avoids overlapping Notch/Dynamic Island and Android cutouts.

**Task 4: Refactor Cart Drawer for Dynamic Bottom Insets** (`◐ FM — 1d 1f +1r — Task 4 [Parallel with Task 2, Task 3]`)
- **Objective:** Add safe area padding to prevent overlapping the Home Indicator.
- **Affected Areas:** `src/features/cart/CartDrawer/CartDrawerFooter.js`
- **Dependencies:** Task 1
- **Expected Outcome:** Interactive elements do not overlap system bars.
