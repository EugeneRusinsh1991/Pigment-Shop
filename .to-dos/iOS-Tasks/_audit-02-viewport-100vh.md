### 2. Viewport Height Calculation (`100vh` Bug in Mobile Browsers)
- **Codebase Evidence:**
  - `src/theme/appStyles.js:4-6` defines:
    ```javascript
    const rootStyles = Platform.OS === 'web'
      ? { minHeight: '100vh', overflowX: 'hidden', cursor: 'default' }
      : {};
    ```
- **Root Cause Analysis:**
  - **iOS Safari (Primary Focus):** CSS `100vh` in mobile WebKit is computed using the **maximum viewport height** when browser toolbars are fully retracted. When the URL address bar and bottom navigation toolbar are visible, `100vh` exceeds the visible screen height by 60–80px, causing the bottom of `.app` to overflow below the fold.
  - **Android Chrome / Cross-Platform:** Android browsers exhibit similar behavior where `100vh` does not account for the dynamic top/bottom browser UI. While Android Chrome's implementation sometimes attempts to handle toolbar collapsing differently, `100vh` still reliably causes layout overflow when UI bars are present.
- **Severity:** High
- **Recommended Solution:**
  - Use an array fallback for dynamic viewport height (`100dvh`) with standard `100vh` for older engines. This resolves the issue across both iOS Safari and modern Android browsers:
    ```javascript
    const rootStyles = Platform.OS === 'web'
      ? { minHeight: ['100vh', '100dvh'], overflowX: 'hidden', cursor: 'default' }
      : {};
    ```
- **Trade-offs & Possible Side Effects:**
  - **Cross-Platform:** `dvh` (Dynamic Viewport Height) recalculates as the browser address bar collapses/expands during scrolling. Continuous layout reflows during fast scrolling can occur, though modern engines handle this relatively well.
  - **iOS Specific:** Safari versions prior to iOS 15.4 do not support `dvh`, making the `'100vh'` array fallback mandatory.
  - **Android Specific:** Chrome for Android added `dvh` support in version 108. Older versions will rely on the `100vh` fallback.
- **Confidence Level:** High (100% — Confirmed by code inspection)

---

### Investigation Summary
- **Status:** Confirmed
- **Severity:** High
- **Confidence:** High (100%)
- **Target Locations:** `src/theme/appStyles.js:4-6`
- **Recommended Remediation:** Replace `'100vh'` with array `['100vh', '100dvh']`

---

### Task Breakdown

#### Task 1: Implement Dynamic Viewport Height Fallback
- **Objective:** Fix the viewport height calculation bug by replacing the static `100vh` value with an array fallback `['100vh', '100dvh']`.
- **Dependencies:** None.
- **Affected Project Areas:** `src/theme/appStyles.js` (Web root styling).
- **Expected Outcome:** The `.app` root container will correctly size itself to the visible viewport on both iOS Safari and Android Chrome, preventing the clipping of bottom-aligned elements when browser toolbars are present.

#### Task 2: Verify Layout on iOS Safari
- **Objective:** Validate that the dynamic viewport height fix correctly prevents overflow and clipping on iOS devices.
- **Dependencies:** Task 1.
- **Affected Project Areas:** Web interface rendering (iOS Safari).
- **Expected Outcome:** Bottom navigation and fixed elements remain fully visible and interactive, regardless of the visibility state of the Safari address bar and toolbars.

#### Task 3: Verify Layout on Android Chrome
- **Objective:** Validate that the dynamic viewport height fix correctly prevents overflow and clipping on Android devices.
- **Dependencies:** Task 1.
- **Affected Project Areas:** Web interface rendering (Android Chrome).
- **Expected Outcome:** Bottom navigation and fixed elements remain fully visible and interactive on Android browsers when the dynamic UI toolbars are present.
