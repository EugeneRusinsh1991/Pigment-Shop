### 4. `overflow-x: clip` vs. `position: sticky` Compatibility in WebKit
- **Codebase Evidence:**
  - `src/hooks/useHomeScrollHide.js:13-22` dynamically injects a stylesheet into `document.head`:
    ```javascript
    style.textContent = `#root > [data-testid] { overflow-x: clip !important; overflow-y: visible !important; }
    #root > div { overflow-x: clip !important; }`;
    ```
- **Root Cause & Alternative Hypotheses:**
  - *Primary Hypothesis (iOS-Specific Focus):* React Native Web wraps root views in containers with `overflow: hidden`. In WebKit (iOS Safari) CSS specifications, any ancestor with `overflow: hidden` strictly disables `position: sticky` on descendant elements (`StoreSearchHeader`). The author injected `overflow-x: clip` to suppress horizontal overflow without creating a scroll container. However, older iOS Safari versions (prior to iOS 16) and certain WKWebView embedders do not fully support `overflow: clip`, falling back to `hidden` (breaking sticky behavior) or `visible` (allowing horizontal scroll overflow).
  - *Cross-Platform Context (Android/Web):* Unlike iOS Safari, Android Chrome and standard desktop browsers are generally more forgiving with `position: sticky` within `overflow: hidden` containers. Standardizing on `overflow: clip` fixes the strict WebKit layout bug, but we must verify that `clip` does not degrade into `visible` on older Android WebViews, which could inadvertently allow horizontal overflow on Android.
  - *Secondary Hypothesis:* Injecting `<style>` tags via JavaScript DOM manipulation during `useEffect` occurs after browser paint, which can cause layout shifts or Flash of Unstyled Content (FOUC) when navigating back to the home screen across all platforms.
- **Severity:** Medium
- **Recommended Solution:**
  - Move the `overflow-x: clip` override from runtime JS injection into static CSS (`src/theme/appStyles.js` or global stylesheet) and test compatibility in Safari 15/16.
- **Validation Requirements:**
  - *iOS (Primary Focus):* Verify on iOS 15 / 16 Safari simulators that `StoreSearchHeader` remains sticky during vertical scrolling and does not allow horizontal swipe overflow.
  - *Cross-Platform (Secondary):* Ensure no regressions on Android Chrome or Web, specifically confirming that horizontal overflow remains suppressed.
- **Confidence Level:** High (90% — Architectural probability)

---

### Investigation Summary
- **Status:** Probable
- **Severity:** Medium
- **Confidence:** High (90%)
- **Target Locations:** `useHomeScrollHide.js:13-22`
- **Recommended Remediation:** Migrate JS style injection to static CSS tokens

### Task Breakdown

1. **Analyze Global CSS Entry Points**
   - **Dependencies:** None
   - **Affected Areas:** `src/theme/appStyles.js`, `src/App.js` or `src/index.js`
   - **Expected Outcome:** Identify the optimal static location to apply global layout overrides for the `#root` container.

2. **Migrate CSS Rules**
   - **Dependencies:** Task 1
   - **Affected Areas:** Selected static CSS file (e.g., `src/theme/appStyles.js`)
   - **Expected Outcome:** The CSS rules (`overflow-x: clip !important`, etc.) for `#root > [data-testid]` and `#root > div` are permanently defined in the static stylesheet.

3. **Refactor `useHomeScrollHide.js`**
   - **Dependencies:** Task 2
   - **Affected Areas:** `src/hooks/useHomeScrollHide.js` and components consuming the hook
   - **Expected Outcome:** The runtime DOM style injection logic is completely removed. The hook is simplified or deleted if it no longer serves another purpose, eliminating FOUC.

4. **Platform Compatibility Verification**
   - **Dependencies:** Task 3
   - **Affected Areas:** iOS Simulator (Safari 15/16), Android Emulator, Web Browser
   - **Expected Outcome:** 
     - *iOS (Primary):* Verified that `StoreSearchHeader` retains sticky behavior during vertical scroll and horizontal overflow is explicitly suppressed.
     - *Android/Web (Cross-Platform):* Confirmed no layout regressions occur; older WebViews appropriately suppress horizontal overflow without disrupting standard layout flow.
