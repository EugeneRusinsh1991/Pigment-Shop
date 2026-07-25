# State Machine & Recovery

The crawler operates in a highly dynamic React application. To reliably click elements in a mutating DOM, the framework relies on robust state caching, graph tracking, and recovery mechanisms.

## Subsystem Responsibilities

1. **`StateCacheManager`**:
   Responsible for creating, storing, and retrieving DOM snapshots (`PageStateCache`). It ensures that multiple components (policy engine, observability, recovery) can share a single `page.evaluate` DOM query result, significantly reducing overhead.

2. **`ExecutionStateGraph`**:
   Maintains a directed graph of UI states. Each node represents a distinct DOM hash (representing the physical state of the page). Edges represent the interactions (clicks) that caused the transition between states.

3. **`StateRecoveryManager`**:
   Attempts to resurrect stale Playwright `Locator`s. If a target element is detached from the DOM right before a click, the recovery manager re-queries the DOM and attempts to find a matching structural fingerprint.

## Interactions

When `InteractionProcessor` receives a list of target identifiers to click:
1. It loops through each identifier.
2. Before clicking, it resolves the identifier to a Playwright `Locator` using `StateRecoveryManager`.
3. It clicks the element.
4. `NavigationTracker` checks if the URL changed.
5. If the URL did not change, `ExecutionWatchdog` determines if the DOM mutated. If a mutation occurred, the state graph is updated with a new edge, and exploration may recurse into the new state.

## Known Weaknesses

- The Execution Graph memory footprint can grow extremely large on infinite-scroll pages because every new chunk of loaded elements generates a completely unique DOM hash (creating a new graph node).
- State recovery is structural. If a React component completely changes its internal `div` structure upon re-rendering, recovery will fail.
