### 3. Automatic iOS Zoom on Form Input Focus (`font-size < 16px`)
- **Codebase Evidence:**
  - `src/theme/typography.js:12-13` defines font size tokens: `xs: 12`, `sm: 14`.
  - `src/components/ui/TextField/TextFieldStyles.js:4-18` maps Small (`sm`) inputs to `fontSize: typography.sizes.xs` (`12px`) and Medium (`md`) inputs to `fontSize: typography.sizes.sm` (`14px`).
- **Root Cause Analysis:**
  - **iOS Safari (Primary Issue):** iOS Safari's native accessibility specification mandates an **automatic viewport zoom** (Pinch Zoom) whenever a focused form control (`<input>`, `<textarea>`, `<select>`) has a computed CSS `font-size` smaller than `16px`. Once zoomed in, iOS Safari does not automatically restore the original zoom scale upon input blur, leaving the entire web UI scaled and horizontally displaced.
  - **Android Chrome & Shared Mobile Impact:** Android Chrome does *not* auto-zoom on focused inputs with `font-size < 16px`. However, utilizing `12px` or `14px` font sizes for form inputs on any mobile web platform often falls below recommended accessibility guidelines (WCAG) for legibility and minimum touch target constraints. 
  - **Native Environments:** Native iOS and Android apps (`Platform.OS === 'ios' | 'android'`) handle `<TextInput>` font scaling differently without forcing a viewport-level zoom. This issue is strictly confined to the Web environment (and WebViews).
- **Severity:** High (iOS Web) / Medium (Cross-platform Web Accessibility)
- **Recommended Solution:**
  - Ensure that on Web platforms (`Platform.OS === 'web'`), all interactive `TextField` components enforce a minimum computed font size of `16px` to resolve the iOS zoom bug and improve cross-platform mobile accessibility:
    ```javascript
    import { Platform } from 'react-native';

    // In TextFieldStyles.js
    const isWeb = Platform.OS === 'web';
    const webMinFontSize = isWeb ? Math.max(16, sizeTokens.fontSize) : sizeTokens.fontSize;
    ```
- **Trade-offs & Possible Side Effects:**
  - Increasing text size from `12px`/`14px` to `16px` on `sm`/`md` inputs increases glyph dimensions for all web users (including Android and Desktop). 
  - Compact form layouts may require increasing input container height from `36px` to `38-40px` to maintain balanced vertical padding across platforms.
- **Confidence Level:** High (100% — Confirmed by code inspection and known browser behaviors)

---

### Investigation Summary
- **Status:** Confirmed
- **Severity:** High (iOS) / Medium (Cross-Platform Web)
- **Confidence:** High (100%)
- **Target Locations:** `TextFieldStyles.js:4-18`
- **Recommended Remediation:** Enforce `min-size: 16px` on Web text inputs for consistent cross-platform accessibility and to prevent iOS Safari auto-zoom.

---

### Task Breakdown

**Task 1: Enforce Minimum Font Size for Web Inputs**
- **Objective:** Update `TextFieldStyles.js` to ensure the computed font size for text inputs on web platforms is at least `16px`.
- **Affected Files:** `src/components/ui/TextField/TextFieldStyles.js`
- **Dependencies:** None.
- **Expected Outcome:** The input styles apply a minimum `fontSize` of `16px` when `Platform.OS === 'web'`, preventing iOS Safari auto-zoom while maintaining existing design tokens for native platforms.

**Task 2: Adjust Input Container Heights for Balanced Padding**
- **Objective:** Review and adjust the container height for `sm` and `md` sizes on web platforms to accommodate the larger `16px` text without clipping or unbalanced vertical padding.
- **Affected Files:** `src/components/ui/TextField/TextFieldStyles.js`
- **Dependencies:** Task 1.
- **Expected Outcome:** Input heights dynamically scale (e.g., from `36px` to `38-40px` for `sm`) on the web to fit the `16px` text comfortably, ensuring visual consistency across Web, iOS, and Android.

**Task 3: Cross-Platform Regression Testing**
- **Objective:** Verify the font size and padding adjustments across all target environments.
- **Affected Files:** N/A (Testing Phase)
- **Dependencies:** Task 1, Task 2.
- **Expected Outcome:** 
  - **iOS Safari:** No auto-zoom occurs when focusing form fields.
  - **Android Web:** Inputs remain accessible with improved touch target heights and legibility.
  - **Native iOS/Android:** No layout changes occur, preserving the original `12px`/`14px` behavior for native.
