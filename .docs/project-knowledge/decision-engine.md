# Decision Engine & Policy

The Decision Engine (`InteractionPolicyEngine`) acts as the "brain" of the crawler. It determines which scanned interactive elements should actually be clicked, and which should be skipped.

## Purpose

To prevent the crawler from getting stuck in infinite loops, clicking thousands of identical product cards, or wasting time on visually hidden elements.

## Execution Flow

1. `UIExplorer` passes the full array of `ScannedElement`s (from the `StateCacheManager`) to the `InteractionPolicyEngine.decide()` method.
2. The Policy Engine applies a series of filters:
   - **Visibility Check**: Skips elements with 0 width/height.
   - **Deduplication Check**: Skips elements with an identical structural hash that have already been visited in the current session.
   - **Depth Check**: Skips elements if interacting with them would exceed the configured `ActionDepthTracker` limits.
3. **Grouping (The Core Strategy)**:
   - Elements are clustered into "Groups" based on their proximity, tag type, and structural similarity (e.g., 50 product cards on a `/catalog` page).
   - Instead of clicking all 50, the engine selects a single **Representative** element from the group.
   - The remaining 49 elements are discarded.
4. An `ObservabilityEvent` (`DecisionMade` -> `SKIP`) is emitted for the discarded elements, noting the group reduction reason.
5. The remaining chosen elements are returned to `UIExplorer` to be passed to the `InteractionProcessor`.

## Important Assumptions

- Elements sharing the same tag, class structure, and generic hierarchy likely result in the same application behavior (e.g., routing to a generic product detail page).
- Skipping redundant clicks does not reduce coverage of logical application states.

## Future Improvements

- The heuristic grouping algorithm relies heavily on class names. If the CSS-in-JS framework heavily obfuscates classes (e.g., React Native Web output), grouping efficiency drops significantly. It should be augmented with accessibility `role` based grouping.
