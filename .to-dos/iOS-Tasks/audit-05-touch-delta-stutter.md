### 5. Touch Delta Calculation Stutter During iOS Rubber-Band Overscroll
- **Codebase Evidence:**
  - `src/hooks/useHomeScrollHide.js:73-89` binds `touchstart` and `touchmove` listeners globally to `document` to compute vertical scroll deltas (`delta = lastTouchY - currentY`) and trigger search bar hide/reveal animations.
- **Root Cause Analysis:**
  - When an iPhone user scrolls past the top (`scrollY <= 0`) or bottom of the page, mobile Safari initiates a native "rubber-band" bounce animation.
  - During this bounce, `touchmove` events continue to emit positive and negative coordinate deltas even though the document scroll position is clamped or bouncing. This causes the search bar animation trigger (`onDirectionChange`) to fire repeatedly, creating visual flickering.
- **Severity:** Medium
- **Recommended Solution:**
  - Guard touch delta accumulation against overscroll boundaries:
    ```javascript
    const onTouchMove = (e) => {
      if (window.scrollY <= 0 || (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        return; // Ignore deltas during iOS overscroll bounce
      }
      // existing calculation...
    };
    ```
- **Trade-offs & Possible Side Effects:**
  - Reading `window.scrollY` inside a `touchmove` handler is safe and non-blocking provided the listener is passive (`{ passive: true }`, which is already specified in line 88).
- **Confidence Level:** High (95% — Architectural probability)

---

### Investigation Summary
- **Status:** Probable
- **Severity:** Medium
- **Confidence:** High (95%)
- **Target Locations:** `useHomeScrollHide.js:73-89`
- **Recommended Remediation:** Ignore deltas when `window.scrollY <= 0`
