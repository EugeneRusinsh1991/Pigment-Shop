# Pull-to-Refresh (Mobile Web) — Master Document

## 1. Goal & Requirements
- **Goal**: Enable reliable pull-to-refresh on mobile web browsers (Android Chrome & iOS Safari) when users pull down at the top of the page (`scrollY === 0`).
- **Target Experience**: Reload the page (`window.location.reload()`) or trigger data refetch callbacks with clear user feedback.

---

## 2. Verified Technical Root Cause

### **First Point of Failure: `react-native-web` Stub Component**
- **File**: [`node_modules/react-native-web/src/exports/RefreshControl/index.js`](file:///d:/Magazine/_PigmentShop/node_modules/react-native-web/src/exports/RefreshControl/index.js#L32-L50)
- **Verified Fact**: `react-native-web` does **not** support pull gestures on web. Its `<RefreshControl>` component is a NO-OP stub:
  ```javascript
  function RefreshControl(props: RefreshControlProps): Node {
    const { colors, enabled, onRefresh, refreshing, ...rest } = props;
    return <View {...rest} />;
  }
  ```
- **Result**: `onRefresh`, `refreshing`, and all touch listeners are silently ignored by `react-native-web` on Web builds.

---

## 3. Verified Pipeline Failure Trace

| Stage | Component / File | Verified Status | Failure Mechanism |
| :--- | :--- | :--- | :--- |
| **1. User Touch Gesture** | Mobile Screen | **FAILED** | Zero DOM touch listeners are registered by `RefreshControl`. |
| **2. Gesture Tracking** | `RefreshControl` | **BLOCKED** | Plain `<View>` without distance tracking or state. |
| **3. Callback Trigger** | [`usePullToRefresh.js`](file:///d:/Magazine/_PigmentShop/src/hooks/usePullToRefresh.js#L12) | **BLOCKED** | `onRefresh` callback is never invoked. |
| **4. Haptic Feedback** | `expo-haptics` | **BLOCKED** | Uncalled because execution is inside `onRefresh`. |
| **5. Page Refresh** | `window.location.reload()` | **BLOCKED** | Uncalled because execution is inside `onRefresh`. |

---

## 4. Implementation Path: Web DOM Touch Listener `○ FL — 1d 1f +1r`

Due to the verified failure of `react-native-web`'s `RefreshControl`, the sole implementation path is to bypass React Native's event system on the web and use native DOM touch events.

### **Integration Points & Affected Files**

1. **[`src/hooks/usePullToRefresh.js`](file:///d:/Magazine/_PigmentShop/src/hooks/usePullToRefresh.js)**
   - **Role**: This hook is already imported and used by all scrollable lists (Catalog Grid, Unified Card Grid, Cart Drawer).
   - **Required Change**: Intercept web touch events globally when this hook is active, utilizing `Platform.OS === 'web'`.

### **Task List for Execution**

- [ ] **1. Add Web-Only `useEffect`** `○ FL — 1d 1f +0r`
  - Inside `usePullToRefresh`, add a `useEffect` that returns early if `Platform.OS !== 'web'`.
- [ ] **2. Track Touch State** `○ FL — 1d 1f +0r`
  - Use `useRef` to track `startY` (from `touchstart`), `currentY` (from `touchmove`), and a boolean flag for whether the pull gesture is valid (started at `window.scrollY === 0`).
- [ ] **3. Implement `touchstart` Handler** `○ FL — 1d 1f +0r`
  - Record the starting `clientY` coordinate.
  - Verify that `window.scrollY === 0` (the user is at the top of the page).
- [ ] **4. Implement `touchmove` Handler** `○ FL — 1d 1f +0r`
  - Calculate the downward delta (`clientY - startY`).
  - Do nothing if the user is scrolling up.
- [ ] **5. Implement `touchend` Handler** `○ FL — 1d 1f +0r`
  - If the delta exceeds a threshold (e.g., `80px`), invoke the existing `onRefresh` callback.
  - Reset touch state refs.
- [ ] **6. Bind & Cleanup Listeners** `○ FL — 1d 1f +0r`
  - Attach listeners to `window` or `document` (`addEventListener('touchstart', ...)`).
  - Ensure `removeEventListener` is returned in the `useEffect` cleanup to prevent memory leaks and duplicate handlers.

---

## 5. Implementation Roadmap: Screen Coverage

Based on the codebase audit, the following logical tasks define the implementation sequence to ensure full pull-to-refresh coverage while minimizing duplicate bindings.

### ~~Phase 1: Core Hook Stabilization~~ [COMPLETED]
Currently, multiple components independently bind `document`-level listeners, which risks overlapping events (e.g., if the Cart Drawer opens on a Catalog page). Furthermore, independent scroll containers like the Cart Drawer conflict with `window.scrollY === 0`.
- **Target File**: `src/hooks/usePullToRefresh.js`
- **Actions**:
  - [x] Update `useWebPullToRefresh` to use a singleton pattern or active-listener locking to prevent double-firing when multiple hooks mount.
  - [x] Add support for passing a `scrollViewRef` to check the local offset instead of `window.scrollY` for overlay components.

### Phase 2: Shared Layout Integration
Prioritize adding the hook to shared layout wrappers to instantly cover the majority of missing screens.
- **Target File**: `src/features/profile/components/AccountLayout.js`
  - **Covers**: Profile (`/profile`), Orders (`/orders`), Favorites (`/favorites`).
  - **Actions**: Import and call `usePullToRefresh` at the layout root.
- **Target File**: `src/features/shell/PageScrollLayout/PageScrollLayout.js`
  - **Covers**: Cart Full Page (`/cart`), Order Confirmation (`/order-confirmation`).
  - **Actions**: Import and call `usePullToRefresh` at the layout root.

### Phase 3: High-Priority Standalone Screens
Address screens that manage their own layouts or bypass the components that contain the hook.
- **Target File**: `src/features/catalog/CatalogView.js`
  - **Covers**: Home (`/`) and specific Catalog routes.
  - **Actions**: When `showCategoryGrid=false` (e.g., Home page), `CatalogView` renders a plain `<View>` and bypasses `UnifiedCardGrid`. Hoist or add `usePullToRefresh` to the root of `CatalogView` to guarantee coverage regardless of grid visibility.
- **Target File**: `src/features/product/ProductPage.js`
  - **Covers**: Product Details (`/product/[id]`).
  - **Actions**: Add `usePullToRefresh` to the root container of the product page.
- **Target File**: `src/features/contact/ContactPage.js`
  - **Covers**: Contact Us (`/contact`).
  - **Actions**: Add `usePullToRefresh` to the root container.

### Phase 4: Resolution of Problematic Integrations
Fix screens that already have the hook but exhibit issues.
- **Target File**: `src/features/cart/CartDrawer/CartDrawerList.js`
  - **Issue**: Uses an independent `ScrollView`, causing the `document`-level listener to misfire or conflict.
  - **Actions**: Pass a local scroll ref to the updated hook (from Phase 1) or coordinate with the global listener.
- **Target File**: `src/features/catalog/CatalogView.js` & `src/components/ui/Grid/UnifiedCardGrid.js`
  - **Issue**: `scrollEnabled={false}` disables the native `RefreshControl` path on category pages.
  - **Actions**: Clean up the logic so `RefreshControl` is not passed to a non-scrolling `FlatList`.
