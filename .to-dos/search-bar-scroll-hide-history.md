# Search Bar Scroll-Hide Feature — Implementation History

**Date:** 2026-07-31  
**Status:** ⚠️ IN PROGRESS — Not yet confirmed working  
**Feature:** Home page search bar hides on scroll down, reappears on scroll up

---

## 1. Investigation Summary

### Initial Analysis Document
- **Source:** [search-bar-scroll-hide-analysis.md](file:///d:/Magazine/_PigmentShop/.todo/search-bar-scroll-hide-analysis.md)
- **Created during:** Conversations `db216c31` and `8e9c2492`

### Rendering Path
```
app/(store)/_layout.js (StoreLayout)
  ├── <AppHeader />                    (height: 56px, passive sibling)
  ├── <NavMenu />                      (modal overlay, unrelated)
  ├── <CartDrawer />                   (drawer overlay, unrelated)
  ├── <StoreSearchHeader />            ← PRIMARY TARGET
  │     ├── useHomeScrollHide hook     ← PRIMARY TARGET
  │     └── <Animated.View>            ← PRIMARY TARGET
  │           └── <AutocompleteSearch> (search UI, unrelated to scroll)
  └── <View mainContent>
        └── <SharedLayoutWrapper>
              └── <Slot /> → CatalogView (plain Views, no ScrollView/FlatList on Home)
```

### Key Finding: Home Page Has No ScrollView
The Home route (`showCategoryGrid={false}`) renders via the `else` branch of [CatalogView.js](file:///d:/Magazine/_PigmentShop/src/features/catalog/CatalogView.js) (lines 149–176), which uses plain `View` components — **no `ScrollView` or `FlatList`**. Page scrolling is provided by the browser's native document overflow.

---

## 2. Files Analyzed

| File | Role | Modified? |
|---|---|---|
| [StoreSearchHeader.js](file:///d:/Magazine/_PigmentShop/src/features/shell/StoreSearchHeader.js) | Renders the animated search container | ✅ Yes |
| [useHomeScrollHide.js](file:///d:/Magazine/_PigmentShop/src/hooks/useHomeScrollHide.js) | Scroll detection hook, drives translateY animation | ✅ Yes |
| [appStyles.js](file:///d:/Magazine/_PigmentShop/src/theme/appStyles.js) | `stickySearchContainer` style definition | ❌ Not modified |
| [_layout.js (store)](file:///d:/Magazine/_PigmentShop/app/(store)/_layout.js) | Layout structure, renders StoreSearchHeader | ❌ Not modified |
| [SharedLayoutWrapperStyles.js](file:///d:/Magazine/_PigmentShop/src/features/shell/SharedLayoutWrapper/SharedLayoutWrapperStyles.js) | `scrollRoot` — confirmed no `overflow: auto/scroll` | ❌ Not modified |
| [AppHeaderStyles.js](file:///d:/Magazine/_PigmentShop/src/features/shell/AppHeader/AppHeaderStyles.js) | Confirmed `header.height: 56` | ❌ Not modified |
| [layout.js](file:///d:/Magazine/_PigmentShop/src/theme/layout.js) | Token values: `spacing.xs = 6`, `spacing.none = 0` | ❌ Not modified |
| [CatalogView.js](file:///d:/Magazine/_PigmentShop/src/features/catalog/CatalogView.js) | Confirmed Home uses plain Views (no FlatList) | ❌ Not modified |
| [SearchInput.js](file:///d:/Magazine/_PigmentShop/src/components/domain/Search/SearchInput.js) | Pure UI input, no scroll logic | ❌ Not modified |
| [AutocompleteSearch.js](file:///d:/Magazine/_PigmentShop/src/components/domain/Search/AutocompleteSearch.js) | Reports `isSearchActive` upward only | ❌ Not modified |

---

## 3. Root Causes Identified

### Root Cause 1 (CRITICAL): Expo Web `body { overflow: hidden }`
**Discovered in:** Attempt 2 (conversation `06b49a3f`)

Expo Web injects a reset stylesheet at runtime:
```css
/* Injected by Expo as <style id="expo-reset"> */
#root, body, html { height: 100% }
body { overflow: hidden }
#root { display: flex }
```

This prevents `window` from ever receiving scroll events. `window.scrollY` stays at `0` permanently. The original hook listened to `window.addEventListener('scroll', ...)` which never fired.

### Root Cause 2: `position: sticky` + `marginTop` + `transform` CSS Conflict
**Identified in:** Original analysis (P1 priority)

The original `StoreSearchHeader` applied three conflicting CSS properties simultaneously:
```js
style={[
  styles.stickySearchContainer,  // position: sticky, top: 0
  {
    transform: [{ translateY }],                    // visual shift
    marginTop: translateY.interpolate({...}),        // layout collapse
  }
]}
```
On web, `position: sticky; top: 0` combined with negative `marginTop` causes the browser to re-anchor the element, fighting the `translateY` transform.

### Root Cause 3: `TOP_THRESHOLD` Mismatch
**Identified in:** Original analysis (P2 priority)

`TOP_THRESHOLD` was `50` while AppHeader height is `56`. The search bar was forced visible while scrollY ≤ 50, creating a 6px dead zone.

---

## 4. Changes Made (Chronological)

### Attempt 1 — Threshold Fix + Animated `top` (FAILED)
**Rationale:** Address P1 (CSS conflict) and P2 (threshold mismatch)

#### [useHomeScrollHide.js](file:///d:/Magazine/_PigmentShop/src/hooks/useHomeScrollHide.js)
- Changed `TOP_THRESHOLD` from `50` → `56`

#### [StoreSearchHeader.js](file:///d:/Magazine/_PigmentShop/src/features/shell/StoreSearchHeader.js)
- Replaced `transform + marginTop` with `{ top: translateY }` — animate the sticky `top` offset instead

**Result:** ❌ Still not working. The `window` scroll listener never fired because of the Expo `body { overflow: hidden }` reset (Root Cause 1 was unknown at this point).

---

### Attempt 2 — Scroll Container Auto-Detection (FAILED)
**Rationale:** Discovered `body { overflow: hidden }` via HTTP fetch of the page HTML. Tried to find the actual scrolling element.

#### [useHomeScrollHide.js](file:///d:/Magazine/_PigmentShop/src/hooks/useHomeScrollHide.js)
- Added `findScrollContainer()` that checks `#root.scrollHeight > #root.clientHeight`
- Bound scroll listener to `#root` instead of `window`
- Added `window` listener as fallback

#### [StoreSearchHeader.js](file:///d:/Magazine/_PigmentShop/src/features/shell/StoreSearchHeader.js)
- Restored `transform + marginTop` approach (using `hideHeight` from hook)
- Used `hideHeight` from hook return instead of hardcoded `-48`

**Result:** ❌ Still not working. `#root` has `height: 100%` but no `overflow: auto/scroll`, so it isn't actually a scroll container. The scroll mechanism remained unidentified.

---

### Attempt 3 — Body Overflow Override + Simplified Animation (CURRENT)
**Rationale:** Instead of finding the hidden scroll container, override Expo's reset to restore normal document scrolling. Also simplify the animation to avoid the sticky+marginTop CSS conflict.

#### [useHomeScrollHide.js](file:///d:/Magazine/_PigmentShop/src/hooks/useHomeScrollHide.js) — Current State
1. **Added `ensureBodyScrollable()`** — Injects a `<style>` tag that overrides Expo's reset:
   ```css
   body { overflow: visible !important; overflow-y: auto !important; }
   #root { height: auto !important; min-height: 100vh; }
   ```
2. **Kept `window.addEventListener('scroll', ...)`** — Now should work since body overflow is restored
3. **`TOP_THRESHOLD` set to `56`** — Matches AppHeader height
4. Runs once via module-level `bodyOverrideApplied` flag

#### [StoreSearchHeader.js](file:///d:/Magazine/_PigmentShop/src/features/shell/StoreSearchHeader.js) — Current State
1. **Removed `marginTop` interpolation entirely** — Eliminates the P1 CSS conflict
2. **Uses `transform: [{ translateY }]` only** — Clean animation approach
3. **Destructures `hideHeight` from hook** (currently unused since marginTop was removed)

**Result:** ⚠️ NOT YET CONFIRMED. The user reported the feature still not working after Attempt 2. Attempt 3 changes were made but have not been verified by the user.

---

## 5. Current Implementation State

### [useHomeScrollHide.js](file:///d:/Magazine/_PigmentShop/src/hooks/useHomeScrollHide.js) (112 lines)
- Constants: `HIDE_HEIGHT=48`, `SCROLL_THRESHOLD=15`, `TOP_THRESHOLD=56`
- `ensureBodyScrollable()` injects CSS override for Expo's `body { overflow: hidden }`
- Listens to `window` scroll events (passive)
- Accumulated delta pattern: tracks scroll direction, requires 15px consistent delta to trigger
- When `disabled=true` (search active or non-Home page): forces `show()`, resets delta
- Returns `{ translateY: Animated.Value, hideHeight: 48 }`

### [StoreSearchHeader.js](file:///d:/Magazine/_PigmentShop/src/features/shell/StoreSearchHeader.js) (40 lines)
- Returns `null` if `!isHome`
- Disables scroll-hide when `isSearchActive || !isHome`
- Styles: `stickySearchContainer` (sticky, top: 0) + `transform: [{ translateY }]`
- No `marginTop` interpolation

### [appStyles.js](file:///d:/Magazine/_PigmentShop/src/theme/appStyles.js) — Unchanged
- `stickySearchContainer`: `position: sticky` (web) / `relative` (native), `top: 0`, `zIndex: 200`, `paddingVertical: 6px`, `overflow: visible`

---

## 6. Approaches Summary

| # | Approach | Files Changed | Result | Reason |
|---|---|---|---|---|
| 1 | Fix threshold + animated `top` | useHomeScrollHide, StoreSearchHeader | ❌ Failed | Expo body overflow prevents window scroll events |
| 2 | Auto-detect scroll container | useHomeScrollHide, StoreSearchHeader | ❌ Failed | #root isn't a true scroll container (no overflow:auto) |
| 3 | Override body overflow + transform only | useHomeScrollHide, StoreSearchHeader | ⚠️ Unverified | Theoretically sound but untested by user |

---

## 7. Remaining Issues & Known Risks

### Unverified
- **Attempt 3 has not been user-verified.** The body overflow override may not produce the expected result.

### Potential Risks of `ensureBodyScrollable()`
1. **Expo layout breakage** — Overriding `body { overflow }` and `#root { height }` could break modal overlays (NavMenu, CartDrawer), full-screen views, or other Expo-managed layout behavior.
2. **Double scrollbars** — If both `body` and an inner container become scrollable.
3. **Mobile touch behavior** — Body overflow changes could affect iOS momentum scrolling or address bar behavior.

### If Attempt 3 Fails — Next Steps to Try
1. **Capture-phase scroll listener** — `document.addEventListener('scroll', handler, { capture: true })` catches scroll events from any element. Read `event.target.scrollTop`. Was partially implemented but not shipped.
2. **Wheel + touch event approach** — Listen to `document` `wheel` events (desktop) and `touchstart`/`touchmove` (mobile) to detect scroll direction without relying on scroll events at all. Wheel events bubble normally regardless of which element scrolls.
3. **DOM inspection** — Run the debug script at [debug-scroll.js](file:///d:/Magazine/_PigmentShop/.tools/scripts/debug-scroll.js) in the browser console to identify which DOM element actually has `scrollTop > 0` and `overflowY: auto/scroll`. This would definitively reveal the scroll container.
4. **IntersectionObserver** — Place a sentinel element at a known scroll offset and use `IntersectionObserver` to detect when it enters/exits the viewport, triggering show/hide without needing scroll position at all.

### Unmodified Files That May Need Changes
- [appStyles.js](file:///d:/Magazine/_PigmentShop/src/theme/appStyles.js) — `stickySearchContainer` may need `position` changed from `sticky` to something else if sticky doesn't work with the body override
- [_layout.js (store)](file:///d:/Magazine/_PigmentShop/app/(store)/_layout.js) — May need a wrapper element for overflow clipping
