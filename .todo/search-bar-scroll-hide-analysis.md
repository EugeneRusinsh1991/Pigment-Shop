# Investigation: Home Page Search Bar Scroll Hide Failure

## 1. Problem Description & Expected Behavior

### Problem Description
On the Home page (`/`), the search bar (`StoreSearchHeader` rendering `AutocompleteSearch` and `SearchInput`) remains statically visible at the top of the viewport when scrolling down. It does not retract or hide off-screen during downward scroll, nor does it reappear smoothly upon scrolling upward.

### Expected Behavior
* **Scroll Down:** When the user scrolls down the Home page, the search bar container should animate upward (or adjust height/translate) to hide off-screen.
* **Scroll Up:** When the user scrolls up on the Home page, the search bar container should animate back down into view.
* **Scope Boundary:** This behavior applies **exclusively** to the Home page search bar (`isHome === true`). Other search bars (such as in Admin tools or non-Home views) are outside this scope.

---

## 2. Rendering Path & Component Scope Status

```
app/(store)/_layout.js (StoreLayout) [IN SCOPE]
  │
  ├── <AppHeader /> [ELIMINATED - UNRELATED]
  ├── <NavMenu /> [ELIMINATED - UNRELATED]
  ├── <CartDrawer /> [ELIMINATED - UNRELATED]
  ├── <StoreSearchHeader isHome={isHome} contentWidth={shellData.contentWidth} /> [PRIMARY TARGET]
  │     │
  │     ├── Uses hook: useHomeScrollHide(isSearchActive || !isHome) [PRIMARY TARGET]
  │     │     └── Binds window.addEventListener('scroll', onScroll)
  │     │
  │     └── Renders: <Animated.View style={[styles.stickySearchContainer, ...]} /> [PRIMARY TARGET]
  │           └── <View style={searchInnerStyle}>
  │                 └── <AutocompleteSearch ... /> [ELIMINATED - UNRELATED]
  │                       └── <SearchInput ... /> [ELIMINATED - UNRELATED]
  │
  └── <View style={styles.mainContent}> [IN SCOPE]
        └── <SharedLayoutWrapper> [IN SCOPE]
              └── <Slot />  ──> app/(store)/index.js (HomeRoute -> CatalogView) [ELIMINATED]
```

---

## 3. Narrowed Search Scope & Elimination Analysis

### Eliminated Unrelated Areas
The following codebase areas have been analyzed and verified as **unrelated** to the scroll-hide failure:
1. **[SearchInput.js](file:///d:/Magazine/_PigmentShop/src/components/domain/Search/SearchInput.js)**: Base UI text input component. Contains no scroll detection, positioning logic, or animation handlers.
2. **[AutocompleteSearch.js](file:///d:/Magazine/_PigmentShop/src/components/domain/Search/AutocompleteSearch.js)**: Responsible solely for search suggestions, query state, and popup display. Reports `isSearchActive` state upward but does not control header position.
3. **[AppHeader.js](file:///d:/Magazine/_PigmentShop/src/features/shell/AppHeader.js)** (and subcomponents): Fixed height (56px) top navigation bar rendered as a passive sibling. Does not register scroll listeners or affect search header translateY animations.
4. **[NavMenu.js](file:///d:/Magazine/_PigmentShop/src/features/shell/NavMenu.js)** & **[CartDrawer.js](file:///d:/Magazine/_PigmentShop/src/features/cart/CartDrawer/CartDrawer.js)**: Modal/drawer overlays that operate independently of scroll events.
5. **Catalog & Route Views (`app/(store)/index.js`, `CatalogView`)**: Rendered inside `Slot`. Provide standard scrollable document height but contain no header hide/show logic.

---

## 4. Probable Sources of the Problem (Ranked Priority)

### Priority 1: CSS Sticky Anchoring vs. Interpolated Margin & Transform Conflict
* **Files:** **[StoreSearchHeader.js](file:///d:/Magazine/_PigmentShop/src/features/shell/StoreSearchHeader.js)** and **[appStyles.js](file:///d:/Magazine/_PigmentShop/src/theme/appStyles.js)** (`stickySearchContainer`)
* **Mechanism:**
  ```js
  // StoreSearchHeader.js
  style={[
    styles.stickySearchContainer, // Platform.OS === 'web' ? position: 'sticky', top: 0
    {
      transform: [{ translateY }],
      marginTop: translateY.interpolate({ inputRange: [-48, 0], outputRange: [-48, 0] })
    }
  ]}
  ```
* **Failure Analysis:** On web browsers, applying `position: sticky; top: 0` alongside negative `marginTop` (-48px) and `translateY` (-48px) causes CSS layout conflicts. Negative `marginTop` shifts the element's layout footprint, causing browser sticky positioning calculations to re-anchor the container at `top: 0` relative to the viewport. This overrides or locks the visual `translateY` transform during scroll.

### Priority 2: Hook Scroll Threshold & Delta Calculation Mismatches
* **File:** **[useHomeScrollHide.js](file:///d:/Magazine/_PigmentShop/src/hooks/useHomeScrollHide.js)**
* **Failure Analysis:**
  - `TOP_THRESHOLD` is set to `50px`, whereas `AppHeader` height is `56px`. The search header is forced to stay visible while `scrollY <= 50px`.
  - `HIDE_HEIGHT` is hardcoded to `48px`, which may not match the actual rendered pixel height of `stickySearchContainer` (including vertical paddings and borders), leaving partial residual height visible when hidden.

### Priority 3: Container Layout Overflow Boundaries
* **Files:** **[appStyles.js](file:///d:/Magazine/_PigmentShop/src/theme/appStyles.js)** (`container`, `mainContent`) and **[SharedLayoutWrapperStyles.js](file:///d:/Magazine/_PigmentShop/src/features/shell/SharedLayoutWrapper/SharedLayoutWrapperStyles.js)** (`scrollRoot`)
* **Failure Analysis:** If container styles introduce inner scrollable `div` elements (`overflow-y: auto`), `window.scrollY` listened to by `useHomeScrollHide` will remain at `0` while content scrolls internally.

---

## 5. Map of Narrowed Investigation & Fix Locations

| Priority | Location / File | Suspected Root Cause | Refined Fix Strategy |
|---|---|---|---|
| **P1** | **[StoreSearchHeader.js](file:///d:/Magazine/_PigmentShop/src/features/shell/StoreSearchHeader.js)** | Conflict between `position: sticky`, `marginTop` interpolation, and `translateY` transform | Remove `marginTop` interpolation; simplify sticky positioning vs top offset transforms. |
| **P1** | **[appStyles.js](file:///d:/Magazine/_PigmentShop/src/theme/appStyles.js)** | `stickySearchContainer` CSS sticky rules on Web | Adjust `top`, `position`, and clipping/overflow rules for web sticky header container. |
| **P2** | **[useHomeScrollHide.js](file:///d:/Magazine/_PigmentShop/src/hooks/useHomeScrollHide.js)** | Hardcoded `HIDE_HEIGHT` (48px) and `TOP_THRESHOLD` (50px vs 56px header) | Align thresholds with `AppHeader` height (56px) and measure exact header height dynamically. |
| **P3** | **[SharedLayoutWrapperStyles.js](file:///d:/Magazine/_PigmentShop/src/features/shell/SharedLayoutWrapper/SharedLayoutWrapperStyles.js)** | Potential inner scroll root trap | Confirm document scroll vs container scroll event target. |

---

## 6. Next Steps for Implementation (Detailed Guide for Future Agents)

This step-by-step guide outlines the exact code modifications required when implementing the fix.

### Step 1: Fix CSS Positioning & Transform Property Conflict
* **Primary Files:**
  - **[StoreSearchHeader.js](file:///d:/Magazine/_PigmentShop/src/features/shell/StoreSearchHeader.js)** (Lines 23–36)
  - **[appStyles.js](file:///d:/Magazine/_PigmentShop/src/theme/appStyles.js)** (Lines 124–132, `stickySearchContainer`)
* **Actions:**
  1. In `StoreSearchHeader.js`, remove the `marginTop: translateY.interpolate(...)` style prop from `Animated.View`. Applying negative `marginTop` on Web combined with `position: sticky` breaks sticky baseline calculations.
  2. Rely strictly on `transform: [{ translateY }]` for hiding/revealing, OR adjust `stickySearchContainer` positioning in `appStyles.js` so that `position: 'sticky'` has `top: 0` without conflicting negative margins.
  3. Ensure `stickySearchContainer` maintains `overflow: 'visible'` so that search suggestions popover rendered inside `AutocompleteSearch` remains visible when input is active.

### Step 2: Recalibrate Thresholds & Height Constants in `useHomeScrollHide` Hook
* **Primary File:** **[useHomeScrollHide.js](file:///d:/Magazine/_PigmentShop/src/hooks/useHomeScrollHide.js)** (Lines 4–6, 63–66, 74–78)
* **Related Theme/Style Files:**
  - **[AppHeaderStyles.js](file:///d:/Magazine/_PigmentShop/src/features/shell/AppHeader/AppHeaderStyles.js)** (Line 6, `header.height: 56`)
  - **[tokens.js](file:///d:/Magazine/_PigmentShop/src/theme/tokens.js)** (`layout.spacing`)
* **Actions:**
  1. Change `TOP_THRESHOLD` constant from `50` to `56` (or higher, e.g. `56` to match `AppHeader` height). This ensures the search bar is only evaluated for scroll-hiding after `AppHeader` has completely scrolled past the top of the viewport.
  2. Audit `HIDE_HEIGHT` (`48px`). Calculate the exact pixel height of `StoreSearchHeader` (Search input height + `paddingVertical: layout.spacing.xs`). If needed, accept dynamic height or update `HIDE_HEIGHT` to match the exact measured container height so no border or slice remains visible when hidden.

### Step 3: Verify Window vs Container Scroll Event Binding
* **Primary Files:**
  - **[useHomeScrollHide.js](file:///d:/Magazine/_PigmentShop/src/hooks/useHomeScrollHide.js)** (`getWindowScrollY` lines 8–12, `onScroll` listener lines 67–98)
  - **[SharedLayoutWrapperStyles.js](file:///d:/Magazine/_PigmentShop/src/features/shell/SharedLayoutWrapper/SharedLayoutWrapperStyles.js)** (`scrollRoot` line 5)
  - **[appStyles.js](file:///d:/Magazine/_PigmentShop/src/theme/appStyles.js)** (`container` line 11, `mainContent` line 22)
* **Actions:**
  1. Confirm `window.addEventListener('scroll', onScroll)` receives active scroll events when scrolling the Home page (`/`).
  2. Verify that neither `container` in `appStyles.js` nor `scrollRoot` in `SharedLayoutWrapperStyles.js` has `overflow-y: auto` or `height: 100vh` styles that shift scroll events off `window` onto an inner `<div>`.

### Step 4: Validate Active State Lock & Focus Handling
* **Primary Files:**
  - **[StoreSearchHeader.js](file:///d:/Magazine/_PigmentShop/src/features/shell/StoreSearchHeader.js)** (`isSearchActive` state, line 16)
  - **[AutocompleteSearch.js](file:///d:/Magazine/_PigmentShop/src/components/domain/Search/AutocompleteSearch.js)** (`onActiveChange` callback prop)
* **Actions:**
  1. Verify that focusing `SearchInput` sets `isSearchActive` to `true`, which passes `disabled = true` into `useHomeScrollHide(isSearchActive || !isHome)`.
  2. Confirm `useHomeScrollHide` immediately invokes `show()` when `disabled === true`, keeping the search header anchored and visible while the user is typing or interacting with search suggestions.

### Step 5: Empirical Verification & Multi-Device Testing
* **Actions:**
  1. **Desktop Web Verification:** Scroll down past 56px on Home page (`/`). Verify search bar translates smoothly off-screen up to `-HIDE_HEIGHT`. Scroll up and verify search bar animates back into view (`translateY: 0`).
  2. **Mobile Web Verification:** Perform touch drag scrolling on mobile viewports. Verify touch scroll events trigger show/hide transitions smoothly.
  3. **Non-Home Page Isolation:** Navigate to non-Home routes (e.g. catalog or details pages). Confirm `StoreSearchHeader` returns `null` (`!isHome`) and does not impact layout.
