### 2. Touch Event & Pointer Event Interception in WebKit
- **Codebase Evidence:**
  - `src/hooks/useHomeScrollHide.js:73-89` attaches raw `touchstart`, `touchmove`, and `touchend` listeners directly to `document` in passive mode.
  - `src/components/ui/Drawer/Drawer.js:82-88` wraps drawer contents in `<Pressable onPress={(e) => e?.stopPropagation?.()} />`.
- **Root Cause Analysis:**
  - In `useHomeScrollHide.js`, binding un-passified logic or document-level `touchmove` listeners intercepts vertical touch drags. Because React Native Web uses synthetic event delegation at the `document` root, direct DOM event handlers fire prior to React's synthetic event batching.
  - In `Drawer.js`, calling `e.stopPropagation()` on React Native Web's synthetic `Pressable` event does not invoke `e.nativeEvent.stopImmediatePropagation()`. This allows touch gestures inside the drawer to leak to the underlying document touch listener, causing scroll/hide animations to trigger accidentally while the user interacts with inner drawer components.
- **Severity:** Medium
- **Recommended Solution:**
  - Scope touch event listeners in `useHomeScrollHide.js` to specific container refs rather than the global `document`.
- **Alternative Explanations & Rejection:**
  - *Hypothesis:* Touch issues stem from React Native's synthetic event system being broken on Web. (Rejected: React Native Web's pointer implementation is stable; the issue arises strictly because custom document-level DOM listeners bypass React's synthetic tree).
- **Confidence Level:** High (90% — Direct codebase evidence of raw DOM touch listeners)

---

### Investigation Summary
- **Status:** Confirmed
- **Severity:** Medium
- **Confidence:** High (90%)
- **Target Locations:** `useHomeScrollHide.js`, `Drawer.js`
- **Recommended Remediation:** Scope touch listeners to refs; fix synthetic isolation
