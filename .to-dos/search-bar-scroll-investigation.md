# Root Cause Investigation: Home Page Search Bar Hide/Show Scroll Behavior

## 1. Verified Single Root Cause

The single root cause of the failed hide-on-scroll implementation is a **CSS position & layout space mismatch**:

`StoreSearchHeader` relies on `position: 'sticky'` with `top: 0` in CSS (`appStyles.js:125-126`), while applying visual transformation (`transform: [{ translateY }]`) in [`StoreSearchHeader.js`](file:///d:/Magazine/_PigmentShop/src/features/shell/StoreSearchHeader.js#L28). 

Because CSS `position: sticky` positions the element in normal document flow and `transform: translateY(-48px)` shifts only the **visual paint position** without altering element box height or layout geometry:

1. Translating the search header upwards (`-48px`) does not reduce or collapse its container's physical 48px box size in document flow.
2. The empty 48px box remains in place between `AppHeader` (which is in normal document flow above it) and the main content below it, leaving a persistent 48px blank space / gap on page scroll.
3. Because `top: 0` is set without accounting for `AppHeader`'s 56px height (`AppHeaderStyles.js:6`), `StoreSearchHeader` stickies to the top of the viewport (`top: 0`) and overlaps under `AppHeader` (56px high) during scrolling rather than sticking below `AppHeader`.

---

## 2. Evidence Supporting the Root Cause

1. **[`src/theme/appStyles.js:124-132`](file:///d:/Magazine/_PigmentShop/src/theme/appStyles.js#L124-L132)**:
   ```javascript
   stickySearchContainer: {
     ...(Platform.OS === 'web' ? { position: 'sticky' } : { position: 'relative' }),
     top: layout.spacing.none, // top: 0
     zIndex: layout.zIndices.sticky,
     width: '100%',
     paddingVertical: layout.spacing.xs,
     alignItems: 'center',
     overflow: 'visible',
   }
   ```
2. **[`src/features/shell/StoreSearchHeader.js:23-29`](file:///d:/Magazine/_PigmentShop/src/features/shell/StoreSearchHeader.js#L23-L29)**:
   ```javascript
   <Animated.View
     style={[
       styles.stickySearchContainer,
       ic(isDark, styles.stickySearchContainerDark, styles.stickySearchContainerLight),
       isSearchActive && { zIndex: layout.zIndices.tooltip },
       { transform: [{ translateY }] }
     ]}
   >
   ```
3. **[`src/hooks/useHomeScrollHide.js:45-50`](file:///d:/Magazine/_PigmentShop/src/hooks/useHomeScrollHide.js#L45-L50)**:
   ```javascript
   Animated.timing(translateY, {
     toValue: targetValue, // toggles between 0 and -48
     duration: 200,
     useNativeDriver: false,
   }).start();
   ```

---

## 3. Why the Previous Implementation Failed

* **Scroll Calculation Execution**: The window `scroll` listener in [`useHomeScrollHide.js`](file:///d:/Magazine/_PigmentShop/src/hooks/useHomeScrollHide.js) correctly executes and updates `translateY` from `0` to `-48`.
* **Rendering Defect**: Shifting `translateY` to `-48px` moves the rendered visual pixels of the search bar behind `AppHeader`. However, the element's block layout (`height: 48px`) remains pinned in layout flow.
* **Result**: Scrolling down leaves a blank 48px gap in page flow where the search bar was originally situated, creating the appearance of broken layout or overlapping content.

---

## 4. Minimal Change Required to Fix

To fix this specific issue cleanly without architectural refactoring:

1. In `useHomeScrollHide`, animate a single continuous parameter or collapse the container height/margin (`marginTop` or `height` from `48` to `0` alongside `translateY` from `0` to `-48`), or adjust sticky positioning so `AppHeader` and `StoreSearchHeader` share a common height-collapsing container.
