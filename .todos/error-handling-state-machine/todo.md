# Unified Error Handling & State Machine UI Patterns

## Objective
Standardize UI error boundaries, loading skeletons, and empty state representations across all routing modules.

## Key Deliverables
1. **Error Boundaries**:
   - Wrap Expo Router screen routes in `app/` with localized React Error Boundaries.
2. **State Pattern Standardization**:
   - Ensure every screen feature handles 4 standard states: Loading, Error, Empty, and Data.
3. **UI Primitive Integration**:
   - Standardize fallback rendering using `src/components/Feedback/` (`Skeleton`, `EmptyState`, `InlineError`).

## Roadmap & Execution Steps

### Phase 1: Preparation & UI Primitives Audit `🟡 G 3.6 F (M) — 1d | 3f | +4r`
- [ ] Audit existing `src/components/Feedback/` primitives (`Skeleton`, `EmptyState`, `InlineError`). `🟢 G 3.6 F (L) — 1d | 0f | +3r`
- [ ] Ensure primitive components support necessary props and customizable actions (e.g. `onRetry`, `title`, `description`). `🟡 G 3.6 F (M) — 1d | 3f | +2r`

### Phase 2: Standardized Custom Hook / State Pattern `🟡 G 3.6 F (M) — 1d | 2f | +4r`
- [ ] Define reusable state pattern typing (`UIState: 'loading' | 'error' | 'empty' | 'data'`). `🟢 G 3.6 F (L) — 1d | 1f | +1r`
- [ ] Create/standardize a hook for async state handling (`useAsyncState` or existing state handler). `🟢 G 3.6 F (L) — 1d | 1f | +2r`

### Phase 3: Error Boundary Components `🟡 G 3.6 F (M) — 1d | 2f | +4r`
- [ ] Create/standardize root and route-level `ErrorBoundary` components. `🟢 G 3.6 F (L) — 1d | 1f | +2r`
- [ ] Add error logging/reporting integration inside `componentDidCatch`. `🟢 G 3.6 F (L) — 1d | 1f | +2r`

### Phase 4: Route & Screen Migration `🟠 G 3.6 F (H) — 2d | 6f | +8r`
- [ ] Apply standard 4-state pattern & error boundaries to core screens in `app/`. `🟠 G 3.6 F (H) — 2d | 5f | +6r`
- [ ] Replace standard spinners/placeholders with proper `Skeleton` and `EmptyState` primitives. `🟡 G 3.6 F (M) — 1d | 4f | +4r`

### Phase 5: Verification & Testing `🟢 G 3.6 F (L) — 1d | 0f | +4r`
- [ ] Test network failures, empty responses, and component crashes across screens. `🟢 G 3.6 F (L) — 1d | 0f | +2r`
- [ ] Verify fallback UI render and retry mechanisms. `🟢 G 3.6 F (L) — 1d | 0f | +2r`


