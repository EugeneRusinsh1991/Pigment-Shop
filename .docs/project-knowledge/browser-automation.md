# Browser Automation Engine

The Browser Automation Engine (`browser-automation/`) is an autonomous E2E crawler built on top of Playwright. Its primary purpose is to systematically traverse the PigmentShop application (both storefront and admin panels), discover interactive elements, click them, handle navigation boundaries, and verify system stability.

## Purpose

To provide continuous validation of the application's UI, ensuring there are no hidden crash loops, unhandled react errors, or broken navigation paths.

## Execution Flow

1. **Initialization (`index.ts` -> `UIExplorer.ts`)**:
   The Playwright execution context provides an authenticated `Page` instance to the `UIExplorer`.
2. **Depth Exploration (`exploreDFS`)**:
   `UIExplorer` runs recursive depth-first exploration up to a specified depth limit.
3. **Readiness Check**:
   Before scanning, `ReadinessManager` awaits network idle, hydration, and custom app-specific ready signals.
4. **State Scanning (`ElementScanner` & `StateCacheManager`)**:
   The DOM is serialized via `page.evaluate`. Elements are fingerprinted (creating a deterministic hash of their path, class, and text). This DOM snapshot is cached.
5. **Decision Making (`InteractionPolicyEngine`)**:
   The crawler decides which elements to interact with. Redundant elements (e.g., repeating list items) are skipped in favor of a "representative" element.
6. **Interaction Processing (`InteractionProcessor`)**:
   Target elements are clicked. If a mutation or navigation occurs, the process recurses.
7. **Recovery (`StateRecoveryManager`)**:
   If the DOM mutates unexpectedly before a scheduled click, the recovery manager attempts to resolve the stale locator by analyzing the previous execution graph state.

## Important Design Decisions

- **DOM Fingerprinting**: Locators are notoriously fragile. We use structural and textual hashing to identify elements uniquely across DOM updates.
- **Client-Side Heavy Lifting**: `ElementScanner` does all the heavy mapping *inside* `page.evaluate` to avoid costly Playwright protocol IPC overhead for thousands of elements.
- **Strict Separation of Observability**: Interaction logic never logs directly. All events are piped through `ExplorerEventEmitter` to the Observability Layer.

## Known Limitations

- **Stale Elements on React Re-renders**: Frequent React re-renders can destroy the cached DOM elements between the `decide` and `click` phases. `StateRecoveryManager` handles some of this, but highly dynamic pages still cause occasional click failures.
- **Complex Forms**: The crawler primarily tests clicks. It lacks a sophisticated strategy for filling multi-step validation-heavy forms.

## Recommended Future Improvements

- Implement a "Form Strategy" engine that knows how to generate contextual mock data for inputs based on their `name` or `aria-label`.
- Expand the Execution Graph to export visual Mermaid diagrams for easier debugging of recursive loops.
