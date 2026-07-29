# Unified Error Handling & State Machine UI Patterns

## Objective
Standardize UI error boundaries, loading skeletons, and empty state representations across all routing modules.

## Target Components & Reference Locations
1. **Feedback Primitives**:
   - EmptyState: [EmptyState.js](file:///d:/Magazine/_PigmentShop/src/components/Feedback/EmptyState/EmptyState.js)
   - Skeleton: [SkeletonLoader.js](file:///d:/Magazine/_PigmentShop/src/components/Feedback/Skeleton/SkeletonLoader.js)
   - Inline Error: [FieldError.js](file:///d:/Magazine/_PigmentShop/src/components/Feedback/InlineError/FieldError.js)
   - Barrel Export: [index.js](file:///d:/Magazine/_PigmentShop/src/components/Feedback/index.js)
2. **Error Handler & Async State Hooks**:
   - Error Handler: [useErrorHandler.js](file:///d:/Magazine/_PigmentShop/src/hooks/useErrorHandler.js)
   - New Hook to create: [useAsyncState.js](file:///d:/Magazine/_PigmentShop/src/hooks/useAsyncState.js)
3. **Error Boundary Components**:
   - New component to create: [ErrorBoundary.js](file:///d:/Magazine/_PigmentShop/src/components/Feedback/ErrorBoundary/ErrorBoundary.js)
4. **App Routing & Layouts**:
   - Root Layout: [app/_layout.js](file:///d:/Magazine/_PigmentShop/app/_layout.js)
   - Store Layout: [app/(store)/_layout.js](file:///d:/Magazine/_PigmentShop/app/\(store\)/_layout.js)
   - Admin Layout: [app/admin/_layout.js](file:///d:/Magazine/_PigmentShop/app/admin/_layout.js)
   - Storefront Routes: [app/(store)/index.js](file:///d:/Magazine/_PigmentShop/app/\(store\)/index.js), [app/(store)/cart.js](file:///d:/Magazine/_PigmentShop/app/\(store\)/cart.js), [app/(store)/favorites.js](file:///d:/Magazine/_PigmentShop/app/\(store\)/favorites.js), [app/(store)/orders.js](file:///d:/Magazine/_PigmentShop/app/\(store\)/orders.js)

---

## Roadmap & Execution Steps

### Phase 1: Audit & Enhance UI Primitives `🟡 G 3.6 F (M) — 1d | 3f | +4r`
- [ ] Audit [EmptyState.js](file:///d:/Magazine/_PigmentShop/src/components/Feedback/EmptyState/EmptyState.js), [SkeletonLoader.js](file:///d:/Magazine/_PigmentShop/src/components/Feedback/Skeleton/SkeletonLoader.js), [FieldError.js](file:///d:/Magazine/_PigmentShop/src/components/Feedback/InlineError/FieldError.js). `🟢 G 3.6 F (L) — 1d | 0f | +3r`
- [ ] Ensure [EmptyState.js](file:///d:/Magazine/_PigmentShop/src/components/Feedback/EmptyState/EmptyState.js) supports standard props: `title`, `description`, `icon`, `action` (`onRetry` handler wrapped in Button component). `🟡 G 3.6 F (M) — 1d | 1f | +2r`
- [ ] Re-export all primitives cleanly in [index.js](file:///d:/Magazine/_PigmentShop/src/components/Feedback/index.js). `🟢 G 3.6 F (L) — 1d | 1f | +1r`

### Phase 2: Standardized Custom Hook & 4-State Machine `🟡 G 3.6 F (M) — 1d | 2f | +4r`
- [ ] Define standard UI state type `UIState = 'loading' | 'error' | 'empty' | 'data'` in [src/types/](file:///d:/Magazine/_PigmentShop/src/types/). `🟢 G 3.6 F (L) — 1d | 1f | +1r`
- [ ] Create `useAsyncState` hook in [useAsyncState.js](file:///d:/Magazine/_PigmentShop/src/hooks/useAsyncState.js) wrapping `status`, `error`, `data`, and integrating with [useErrorHandler.js](file:///d:/Magazine/_PigmentShop/src/hooks/useErrorHandler.js). `🟢 G 3.6 F (L) — 1d | 1f | +2r`

### Phase 3: Error Boundary Components `🟡 G 3.6 F (M) — 1d | 2f | +4r`
- [ ] Create class component `ErrorBoundary` in [ErrorBoundary.js](file:///d:/Magazine/_PigmentShop/src/components/Feedback/ErrorBoundary/ErrorBoundary.js) with `getDerivedStateFromError` and `componentDidCatch`. `🟢 G 3.6 F (L) — 1d | 1f | +2r`
- [ ] Fallback UI in `ErrorBoundary` must render [EmptyState.js](file:///d:/Magazine/_PigmentShop/src/components/Feedback/EmptyState/EmptyState.js) with reset/retry button. `🟢 G 3.6 F (L) — 1d | 1f | +2r`
- [ ] Export `ErrorBoundary` via [index.js](file:///d:/Magazine/_PigmentShop/src/components/Feedback/index.js). `🟢 G 3.6 F (L) — 1d | 1f | +1r`

### Phase 4: Route & Screen Migration `🟠 G 3.6 F (H) — 2d | 6f | +8r`
- [ ] Wrap root layout [app/_layout.js](file:///d:/Magazine/_PigmentShop/app/_layout.js), [app/(store)/_layout.js](file:///d:/Magazine/_PigmentShop/app/\(store\)/_layout.js), and [app/admin/_layout.js](file:///d:/Magazine/_PigmentShop/app/admin/_layout.js) with `ErrorBoundary`. `🟠 G 3.6 F (H) — 2d | 3f | +4r`
- [ ] Apply 4-state pattern (`loading`, `error`, `empty`, `data`) with `SkeletonLoader` and `EmptyState` to core screen components: [app/(store)/index.js](file:///d:/Magazine/_PigmentShop/app/\(store\)/index.js), [app/(store)/cart.js](file:///d:/Magazine/_PigmentShop/app/\(store\)/cart.js), [app/(store)/favorites.js](file:///d:/Magazine/_PigmentShop/app/\(store\)/favorites.js), [app/(store)/orders.js](file:///d:/Magazine/_PigmentShop/app/\(store\)/orders.js). `🟡 G 3.6 F (M) — 1d | 4f | +4r`

### Phase 5: Verification & Testing `🟢 G 3.6 F (L) — 1d | 0f | +4r`
- [ ] Verify error boundary rendering by simulating thrown errors. `🟢 G 3.6 F (L) — 1d | 0f | +2r`
- [ ] Run health & audit scripts (`npm run health`, `npm run audit:ui`) to ensure clean state. `🟢 G 3.6 F (L) — 1d | 0f | +2r`
