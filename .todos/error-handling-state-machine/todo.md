# Unified Error Handling & State Machine UI Patterns

## Objective
Standardize UI error boundaries, loading skeletons, and empty state representations across all routing modules using a deterministic 4-state UI pattern (`loading` | `error` | `empty` | `data`).

---

## 1. Architectural Specifications & Component Contracts

### 1.1 UI State Constants (`src/constants/uiStates.js`)
Define standard state values to prevent magic strings across hooks and screens:
```javascript
export const UI_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  ERROR: 'error',
  EMPTY: 'empty',
  DATA: 'data',
};
```

### 1.2 Custom Hook: `useAsyncState` (`src/hooks/useAsyncState.js`)
- **Purpose**: Manage async data fetching with automatic state transitions and error logging.
- **Signature**: `useAsyncState(asyncFn, options = {})`
  - `options`: `{ initialData = null, immediate = false, onError = null, emptyChecker = (data) => Array.isArray(data) ? data.length === 0 : !data }`
- **Return Object**:
  - `state`: `'idle' | 'loading' | 'error' | 'empty' | 'data'`
  - `data`: `any`
  - `error`: `Error | null`
  - `isLoading`: `boolean`
  - `isError`: `boolean`
  - `isEmpty`: `boolean`
  - `isSuccess`: `boolean`
  - `execute`: `(...args) => Promise<any>` (memoized with `useCallback`, safe against unmounted updates)
  - `reset`: `() => void`
  - `setData`: `(data | (prev) => next) => void`
- **Integration**: Works seamlessly with `useErrorHandler` to display optional toast notifications while storing component-level error state.

### 1.3 Error Boundary Component (`src/components/Feedback/ErrorBoundary/ErrorBoundary.js`)
- **Type**: React Class Component.
- **Props**:
  - `fallback`: `ReactNode | ((props: { error: Error, resetError: () => void }) => ReactNode)`
  - `onReset`: `() => void` (optional callback executed when retrying)
  - `onError`: `(error: Error, errorInfo: React.ErrorInfo) => void`
  - `title`: `string` (default: "Something went wrong")
  - `description`: `string` (default: "An unexpected error occurred. Please try again.")
- **Behavior**:
  - Catches render phase errors in child component tree (`getDerivedStateFromError`, `componentDidCatch`).
  - Renders fallback UI (defaults to `<EmptyState>` with a retry button calling `resetError`).
  - Logs error via `console.error` or custom `onError` handler.

### 1.4 Feedback Primitives Re-exports (`src/components/Feedback/index.js`)
Ensure all primitives (`EmptyState`, `SkeletonLoader`, `FieldError`, `ErrorBoundary`) are exported from `src/components/Feedback/index.js`.

---

## 2. Target Components & Reference Locations
1. **Feedback Primitives**:
   - `EmptyState`: [EmptyState.js](file:///d:/Magazine/_PigmentShop/src/components/Feedback/EmptyState/EmptyState.js)
   - `SkeletonLoader`: [SkeletonLoader.js](file:///d:/Magazine/_PigmentShop/src/components/Feedback/Skeleton/SkeletonLoader.js)
   - `FieldError`: [FieldError.js](file:///d:/Magazine/_PigmentShop/src/components/Feedback/InlineError/FieldError.js)
   - `ErrorBoundary`: [ErrorBoundary.js](file:///d:/Magazine/_PigmentShop/src/components/Feedback/ErrorBoundary/ErrorBoundary.js) *(NEW)*
   - Barrel Export: [index.js](file:///d:/Magazine/_PigmentShop/src/components/Feedback/index.js)
2. **Error Handler & Async State Hooks**:
   - `useErrorHandler`: [useErrorHandler.js](file:///d:/Magazine/_PigmentShop/src/hooks/useErrorHandler.js)
   - `useAsyncState`: [useAsyncState.js](file:///d:/Magazine/_PigmentShop/src/hooks/useAsyncState.js) *(NEW)*
3. **App Routing & Layouts**:
   - Root Layout: [app/_layout.js](file:///d:/Magazine/_PigmentShop/app/_layout.js)
   - Store Layout: [app/(store)/_layout.js](file:///d:/Magazine/_PigmentShop/app/\(store\)/_layout.js)
   - Admin Layout: [app/admin/_layout.js](file:///d:/Magazine/_PigmentShop/app/admin/_layout.js)
   - Storefront Routes: [app/(store)/index.js](file:///d:/Magazine/_PigmentShop/app/\(store\)/index.js), [app/(store)/cart.js](file:///d:/Magazine/_PigmentShop/app/\(store\)/cart.js), [app/(store)/favorites.js](file:///d:/Magazine/_PigmentShop/app/\(store\)/favorites.js), [app/(store)/orders.js](file:///d:/Magazine/_PigmentShop/app/\(store\)/orders.js)

---

## 3. Implementation Roadmap & Execution Checklist

### Phase 1: Audit & Enhance UI Primitives
- [x] Verify `EmptyState.js` props (`title`, `description`, `icon`, `action`, `children`).
- [x] Add `onRetry` prop support to `EmptyState.js` as convenient shorthand for standard retry button action.
- [x] Verify `SkeletonLoader.js` and `FieldError.js` exports.
- [x] Re-export all primitives cleanly in `src/components/Feedback/index.js`.

### Phase 2: Core State Machine & Hooks
- [x] Create `src/constants/uiStates.js` with `UI_STATES` frozen object.
- [x] Create `src/hooks/useAsyncState.js` with unmounted ref protection (`isMounted` flag).
- [x] Connect `useAsyncState` with `useErrorHandler` optional toast logging.

### Phase 3: Error Boundary Implementation
- [x] Create `src/components/Feedback/ErrorBoundary/ErrorBoundary.js` class component.
- [x] Implement default fallback rendering `EmptyState` with `onRetry` / `resetError`.
- [x] Export `ErrorBoundary` via `src/components/Feedback/index.js`.

### Phase 4: Route & Screen Migration
- [x] Wrap root layouts (`app/_layout.js`, `app/(store)/_layout.js`, `app/admin/_layout.js`) with `ErrorBoundary`.
- [ ] Refactor store screens (`app/(store)/index.js`, `cart.js`, `favorites.js`, `orders.js`) to handle 4 UI states (`loading`, `error`, `empty`, `data`) explicitly using `SkeletonLoader` and `EmptyState`.

### Phase 5: Edge Case & Safety Rules
- [x] **Unmounted Updates**: Prevent state updates after unmount in `useAsyncState`.
- [x] **Event Handler Errors**: Remember `ErrorBoundary` catches render errors, NOT event handlers (use `useErrorHandler` / `useAsyncState` for async event handlers).
- [x] **Empty Data Validation**: Ensure `isEmpty` correctly identifies empty arrays `[]`, `null`, and empty objects `{}`.

### Phase 6: Automated Verification & Health Checks
- [ ] Run `npm run health` to verify no broken relative imports.
- [ ] Run `npm run audit:ui` to ensure no lint/audit violations.
- [ ] Execute smoke test on layout components.

---

## 4. Verification Commands
```bash
npm run health
npm run audit:ui
```

