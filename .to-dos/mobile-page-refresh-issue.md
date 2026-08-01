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

## 4. Implementation Path: Web DOM Touch Listener

Due to the verified failure of `react-native-web`'s `RefreshControl`, the sole implementation path is to bypass React Native's event system on the web and use native DOM touch events.

### **Integration Points & Affected Files**

1. **[`src/hooks/usePullToRefresh.js`](file:///d:/Magazine/_PigmentShop/src/hooks/usePullToRefresh.js)**
   - **Role**: This hook is already imported and used by all scrollable lists (Catalog Grid, Unified Card Grid, Cart Drawer).
   - **Required Change**: Intercept web touch events globally when this hook is active, utilizing `Platform.OS === 'web'`.

### **Task List for Execution**

- [ ] **1. Add Web-Only `useEffect`**
  - Inside `usePullToRefresh`, add a `useEffect` that returns early if `Platform.OS !== 'web'`.
- [ ] **2. Track Touch State**
  - Use `useRef` to track `startY` (from `touchstart`), `currentY` (from `touchmove`), and a boolean flag for whether the pull gesture is valid (started at `window.scrollY === 0`).
- [ ] **3. Implement `touchstart` Handler**
  - Record the starting `clientY` coordinate.
  - Verify that `window.scrollY === 0` (the user is at the top of the page).
- [ ] **4. Implement `touchmove` Handler**
  - Calculate the downward delta (`clientY - startY`).
  - Do nothing if the user is scrolling up.
- [ ] **5. Implement `touchend` Handler**
  - If the delta exceeds a threshold (e.g., `80px`), invoke the existing `onRefresh` callback.
  - Reset touch state refs.
- [ ] **6. Bind & Cleanup Listeners**
  - Attach listeners to `window` or `document` (`addEventListener('touchstart', ...)`).
  - Ensure `removeEventListener` is returned in the `useEffect` cleanup to prevent memory leaks and duplicate handlers.
