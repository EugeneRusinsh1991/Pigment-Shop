### 7. Viewport Offset Displacement After Virtual Keyboard Dismissal
- **Context & Risk Analysis:**
  - A documented WebKit rendering anomaly occurs when a user types into an input field inside an overlay (`Modal` or `CartDrawer`) and dismisses the iOS on-screen keyboard. Mobile Safari sometimes fails to recalculate document scroll bounds, leaving the visual viewport displaced vertically with an unresponsive blank area at the bottom.
- **Validation Requirements:**
  - Test opening the search input or profile form on a physical iPhone, focusing the field, and tapping "Done" on the virtual keyboard to observe whether the header/footer alignment remains intact.
- **Recommended Solution (Conditional upon runtime verification):**
  - If observed, attach a lightweight scroll reset handler on input `blur`:
    ```javascript
    if (Platform.OS === 'web' && /iPhone|iPad|iPod/.test(navigator.userAgent)) {
      window.scrollTo({ top: window.scrollY, behavior: 'instant' });
    }
    ```

---

### Investigation Summary
- **Status:** Risk
- **Severity:** Low-Med
- **Confidence:** High (85%)
- **Target Locations:** `Modal`, `Drawer` forms
- **Recommended Remediation:** Add `blur` event scroll recalculation if reproduced
