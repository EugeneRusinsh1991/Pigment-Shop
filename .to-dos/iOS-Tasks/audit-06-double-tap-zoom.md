### 6. Double-Tap Gesture Zoom on Interactive Touch Targets
- **Context & Risk Analysis:**
  - In iOS Safari, rapidly tapping any button, toggle, or interactive chip (such as quantity selector buttons or cart items) can be interpreted by WebKit as a double-tap gesture to zoom.
- **Codebase Status:**
  - Interactive primitives (`Button`, `IconButton`, `Pressable` wrappers in `AppHeaderControls`) do not explicitly define CSS `touch-action: manipulation`.
- **Recommended Solution:**
  - Apply `touch-action: manipulation` globally to interactive web elements in root styles:
    ```css
    button, input, select, textarea, [role="button"], [data-focusable="true"] {
      touch-action: manipulation;
    }
    ```
- **Accessibility & Trade-offs:**
  - Unlike `<meta name="viewport" content="... user-scalable=no">`, which aggressively impairs web accessibility for visually impaired users by disabling Pinch-to-Zoom, `touch-action: manipulation` **disables only the double-tap zoom gesture** on buttons while preserving standard pinch zooming across the page.

---

### Investigation Summary
- **Status:** Risk
- **Severity:** Medium
- **Confidence:** High (95%)
- **Target Locations:** `Button`, `IconButton` components
- **Recommended Remediation:** Add `touch-action: manipulation` globally
