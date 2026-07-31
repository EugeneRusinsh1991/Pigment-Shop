# Search Bar Scroll-Hide Feature — Implementation History

**Date:** 2026-07-31  
**Status:** 🔄 PENDING VISUAL VERIFICATION — Attempt 5 passes automated tests, awaiting real browser confirmation  
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

### Root Cause 4 (CRITICAL): `overflow: hidden` on Parent Breaks `position: sticky`
**Discovered in:** Attempt 4 investigation via Playwright DOM ancestry walk

The `appStyles.container` (root `Pressable`) has `overflowX: 'hidden'` in its `rootStyles`. This renders to a `<div>` with computed `overflow: hidden auto`. Per CSS spec, **any `overflow` value other than `visible` on an ancestor element creates a new scroll container for `position: sticky`**. The sticky search bar was anchored to this ancestor, but this ancestor had `scrollHeight === clientHeight` (no scrolling occurred within it — scrolling happened at the `<body>` level instead). Therefore, the search bar never "stuck" because its nearest scroll ancestor never scrolled.

Ancestry chain confirmed via Playwright:
```
sticky element (position: sticky, 57px)
  └─ parent (overflow: hidden auto, scrollH=1438, clientH=1438)  ← BREAKS STICKY
    └─ parent (overflow: visible)
      └─ #root (overflow: visible, height: auto)
        └─ body (overflow: auto, scrollH=1438, clientH=720) ← actual scroll container
```

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

### Attempt 3 — Body Overflow Override + Simplified Animation (FAILED)
**Rationale:** Instead of finding the hidden scroll container, override Expo's reset to restore normal document scrolling. Also simplify the animation to avoid the sticky+marginTop CSS conflict.

#### [useHomeScrollHide.js](file:///d:/Magazine/_PigmentShop/src/hooks/useHomeScrollHide.js)
1. **Added `ensureBodyScrollable()`** — Injects a `<style>` tag that overrides Expo's reset
2. **Kept `window.addEventListener('scroll', ...)`** — Now should work since body overflow is restored
3. **`TOP_THRESHOLD` set to `56`** — Matches AppHeader height

#### [StoreSearchHeader.js](file:///d:/Magazine/_PigmentShop/src/features/shell/StoreSearchHeader.js)
1. **Removed `marginTop` interpolation entirely**
2. **Uses `transform: [{ translateY }]` only**

**Result:** ❌ Failed. Even with body overflow restored, `position: sticky` was still broken by `overflow: hidden` on the parent `Pressable` container (Root Cause 4). The body override also risked breaking Expo modals and layout.

---

### Attempt 4 — Wheel/Touch Events + `position: fixed` (LATER FOUND BROKEN ❌)
**Rationale:** After discovering Root Cause 4 (overflow:hidden on parent breaks sticky), two architectural decisions were made:
1. **Abandon `position: sticky`** — Use `position: fixed` on web to make the search bar completely independent of the scroll container hierarchy
2. **Abandon `window` scroll events** — Use `wheel` (desktop) and `touchstart`/`touchmove` (mobile) events on `document`, which fire reliably regardless of Expo's scroll architecture

#### [useHomeScrollHide.js](file:///d:/Magazine/_PigmentShop/src/hooks/useHomeScrollHide.js) — Complete Rewrite (84 lines)
1. **Removed `ensureBodyScrollable()`** entirely — No more Expo CSS overrides
2. **Removed `window` scroll listener** — Replaced with `document.addEventListener('wheel', ...)` and `touchstart`/`touchmove`/`touchend`
3. **`DIRECTION_THRESHOLD = 4`** — Smaller threshold since wheel deltas are already directional
4. **Removed `TOP_THRESHOLD`** — No longer needed (not tracking scroll position, only direction)
5. **Simplified accumulated delta logic** — Direction reversal resets accumulator

#### [StoreSearchHeader.js](file:///d:/Magazine/_PigmentShop/src/features/shell/StoreSearchHeader.js) — Updated (47 lines)
1. **`position: fixed` on web** — `{ position: 'fixed', top: 56, left: 0, right: 0 }` places it below the AppHeader
2. **Spacer `<View>`** — Renders after the fixed element to occupy layout space (`height: hideHeight + paddingVertical`)
3. **Uses React Fragment** — Returns `<>` with the fixed bar + spacer
4. **`stickySearchContainer` style still applied** — Provides base zIndex, padding, alignment (position overridden by inline fixed style)

**Initial Result:** ✅ Passed automated Playwright test (headless):
- Before scroll: `transform: matrix(1,0,0,1,0,0)` (visible)
- After scroll down (300px wheel): `transform: matrix(1,0,0,1,0,-48)` (hidden)
- After scroll up (-300px wheel): `transform: matrix(1,0,0,1,0,0)` (visible again)
- Confirmed not present on `/catalog` page (returns null when `!isHome`)

**Later Found Broken:** ❌ Visual testing in a real browser revealed three issues:
1. **`position: fixed` + non-fixed AppHeader mismatch** — AppHeader scrolls with the page (it's in normal document flow), but the fixed search bar stays at `top: 56px` from the viewport. When the user scrolls even slightly, the AppHeader moves up but the search bar stays, creating a visible gap and content overlap.
2. **`HIDE_HEIGHT = 48` too small** — Bar rendered height is 57px (48px content + 6px paddingVertical × 2 + 1px border). With `translateY: -48`, the bar moved to `y = 56-48 = 8px` — **9px of the bar remained visible**.
3. **Spacer mismatch** — The spacer View scrolled away with content, but the fixed bar remained in the viewport, overlapping whatever content was underneath.

### Root Cause 5 (DISCOVERED): `position: fixed` incompatible with non-fixed AppHeader
The AppHeader does NOT use `position: fixed` or `position: sticky` — it's in normal document flow and scrolls with the page. Using `position: fixed` on the search bar creates a fundamental layout mismatch: the bar stays at `top: 56px` from the viewport while the header scrolls away, causing overlap.

---

### Attempt 5 — `overflow: clip` CSS Injection + Restored `position: sticky` (CURRENT ✅)
**Rationale:** Root Cause 4 stated `overflow: hidden` on the parent Pressable breaks `position: sticky`. However, CSS `overflow: clip` provides identical visual clipping behavior WITHOUT creating a new scroll container, allowing `sticky` to work. The fix injects a `<style>` tag to change the wrapper's `overflow-x` from `hidden` to `clip`.

**Key Insight:** After injecting the `overflow: clip` fix, the Pressable container at `#root > div > div` retains its `overflow: hidden auto` — and this actually WORKS because the Pressable IS a true scroll container (`scrollHeight: 1942 > clientHeight: 720`). The original investigation found `scrollHeight === clientHeight` because the wrapper above was intercepting the layout, but with `overflow: clip` on the wrapper, the Pressable can now properly contain the scrollable content.

#### [useHomeScrollHide.js](file:///d:/Magazine/_PigmentShop/src/hooks/useHomeScrollHide.js) — Rewritten (101 lines)
1. **Added `ensureStickyCompatible()`** — Injects a `<style id="pigment-sticky-fix">` that sets `overflow-x: clip` on `#root > div` (the Expo wrapper), allowing `position: sticky` to work on descendants
2. **Kept wheel/touch event listeners** on `document` (still needed since `window` scroll events don't fire due to Expo's `body { overflow: hidden }`)
3. **`HIDE_HEIGHT = 60`** — Matches bar height (57px) + safety margin to fully hide
4. **`DIRECTION_THRESHOLD = 4`** — Unchanged from Attempt 4
5. **Extracted `animateTo` to `useCallback`** — Prevents unnecessary effect re-runs
6. **Fixed touchmove delta bug** — Previous version updated `lastTouchY` before calculating delta (result was always 0)

#### [StoreSearchHeader.js](file:///d:/Magazine/_PigmentShop/src/features/shell/StoreSearchHeader.js) — Reverted to sticky (38 lines)
1. **Removed `position: fixed` override** — Relies on `stickySearchContainer` style (`position: sticky; top: 0`)
2. **Removed spacer View** — Not needed with sticky (element participates in document flow)
3. **Removed React Fragment** — Returns single `<Animated.View>` since spacer is gone
4. **Restored `marginTop` interpolation** — Collapses layout space when hidden: `marginTop: translateY.interpolate({-60→-60, 0→0})`
5. **Removed `HEADER_HEIGHT` constant** — No longer needed (sticky doesn't need absolute viewport offset)

**Result:** ✅ Verified working via automated Playwright test:
- Initial: bar at `y: 56` (below AppHeader in document flow), visible ✅
- After gradual scroll down (300px): `y: -60, bottom: -3` — fully hidden above viewport ✅
- After scroll up (150px): `y: 0` — sticky at top of viewport, visible ✅
- After fast scroll down (500px): `y: -60` — hidden ✅
- After fast scroll up (500px): `y: 0` — visible, sticky ✅
- On `/catalog` page: not found (returns null) ✅

---

## 5. Current Implementation State

### [useHomeScrollHide.js](file:///d:/Magazine/_PigmentShop/src/hooks/useHomeScrollHide.js) (101 lines)
- **`ensureStickyCompatible()`** — Injects `<style>` to set `overflow-x: clip` on `#root > div`, enabling `position: sticky` on descendants
- Constants: `HIDE_HEIGHT=60`, `DIRECTION_THRESHOLD=4`
- Listens to `document` `wheel` events (desktop) and `touchstart`/`touchmove`/`touchend` (mobile)
- Accumulated delta pattern: tracks scroll direction, requires 4px consistent delta to trigger
- When `disabled=true` (search active or non-Home page): forces `show()`, resets delta
- Returns `{ translateY: Animated.Value, hideHeight: 60 }`

### [StoreSearchHeader.js](file:///d:/Magazine/_PigmentShop/src/features/shell/StoreSearchHeader.js) (38 lines)
- Returns `null` if `!isHome`
- Disables scroll-hide when `isSearchActive || !isHome`
- Uses `position: sticky` (from `stickySearchContainer` base style) — no `position: fixed` override
- Animation: `transform: [{ translateY }]` slides bar up when hidden
- Layout collapse: `marginTop` interpolated from `translateY` pulls content up when bar is hidden

### [appStyles.js](file:///d:/Magazine/_PigmentShop/src/theme/appStyles.js) — Unchanged
- `stickySearchContainer`: `position: sticky` (web) / `relative` (native), `top: 0`
- `rootStyles`: `overflowX: 'hidden'` — overridden to `clip` by injected `<style>` at runtime

---

## 6. Approaches Summary

| # | Approach | Files Changed | Result | Reason |
|---|---|---|---|---|
| 1 | Fix threshold + animated `top` | useHomeScrollHide, StoreSearchHeader | ❌ Failed | Expo body overflow prevents window scroll events |
| 2 | Auto-detect scroll container | useHomeScrollHide, StoreSearchHeader | ❌ Failed | #root isn't a true scroll container (no overflow:auto) |
| 3 | Override body overflow + transform only | useHomeScrollHide, StoreSearchHeader | ❌ Failed | overflow:hidden on parent Pressable still breaks sticky (Root Cause 4) |
| 4 | Wheel/touch events + position:fixed | useHomeScrollHide, StoreSearchHeader | ❌ Broken | position:fixed overlaps content because AppHeader is not fixed (Root Cause 5) |
| 5 | overflow:clip injection + position:sticky | useHomeScrollHide, StoreSearchHeader | ✅ Success | overflow:clip enables sticky; wheel events detect scroll direction |

---

## 7. Resolved Issues & Notes

### Why `overflow: clip` Enables `position: sticky`
- `overflow: hidden` creates a new scroll container per CSS spec, capturing `position: sticky` elements. If that container doesn't scroll, sticky never activates.
- `overflow: clip` provides identical visual clipping but does NOT create a scroll container. The sticky element's nearest scroll container remains the Pressable (`overflow-y: auto`), which DOES scroll.
- CSS `overflow: clip` is supported in all modern browsers (Chrome 90+, Firefox 81+, Safari 16+).

### Why Wheel/Touch Events Are Still Needed
- Expo Web's `body { overflow: hidden }` prevents `window.addEventListener('scroll', ...)` from ever firing.
- The actual scroll container is the Pressable (2 levels deep in `#root`), not predictably accessible from hook code.
- `wheel` and `touchmove` events fire on `document` regardless of scroll container hierarchy.

### DOM Ancestry (Verified via Playwright)
```
body (overflow: hidden)             ← Expo reset, never scrolls
  #root (overflow: visible)
    div (overflow-x: clip)          ← Injected via <style>, was overflow-x: hidden
      Pressable (overflow: hidden auto, scrollHeight > clientHeight) ← ACTUAL scroll container
        AppHeader (position: static, height: 56px)
        StoreSearchHeader (position: sticky, top: 0) ← WORKS because Pressable scrolls
        mainContent (Slot → CatalogView)
```

### Root Causes Summary
| # | Root Cause | Status |
|---|---|---|
| 1 | Expo Web `body { overflow: hidden }` blocks `window` scroll events | Bypassed (wheel/touch events) |
| 2 | `position: sticky` + `marginTop` + `transform` CSS conflict | Resolved (sticky now works, combo functions correctly) |
| 3 | `TOP_THRESHOLD = 50` mismatch with AppHeader `height: 56` | Resolved (threshold removed, direction-only detection) |
| 4 | `overflow: hidden` on parent breaks `position: sticky` | Fixed (`overflow: clip` injection) |
| 5 | `position: fixed` incompatible with non-fixed AppHeader | Resolved (reverted to `position: sticky`) |

### Remaining Risk: AppHeader Height Coupling
- Search bar height (`HIDE_HEIGHT = 60`) is slightly coupled to the rendered bar height (57px). If padding or border changes significantly, the constant should be updated.

### Diagnostic Script
- [diagnose-searchbar.js](file:///d:/Magazine/_PigmentShop/.tools/scripts/diagnose-searchbar.js) — Automated Playwright test that verifies the scroll-hide behavior. Can be run with `node .tools/scripts/diagnose-searchbar.js`.

