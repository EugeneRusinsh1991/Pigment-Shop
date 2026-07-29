# Browser Automation — Workflow Analysis

## Overview

The Browser Automation system is designed as an event-driven, automated UI exploration engine built on Playwright. It operates in two primary workflows:

1. **Regular Application Exploration (Guest / Storefront Mode)**: Automated exploration of public storefront routes without requiring authentication.
2. **Admin Panel Exploration (Authenticated Admin Mode)**: Exploration of administrative routes after undergoing authentication and client-side SPA route transition.

This document details the architectural execution flow of both modes, highlighting where their paths diverge and converge, and mapping out candidates for a shared foundational layer.

---

## 1. Architectural Architecture & Component Matrix

### Shared Components (Common Foundation)
- **Engine Core**: `UIExplorer` (`explorer/UIExplorer.ts`)
- **Driver Adapter**: `PlaywrightAdapter` & `PlaywrightPage` (`explorer/driver/PlaywrightAdapter.ts`)
- **Element Discovery**: `ElementScanner` (`explorer/ElementScanner.ts`)
- **Policy Engine**: `InteractionPolicyEngine` & `ElementGroupDetector` (`explorer/policy/`)
- **Interaction Processor**: `InteractionProcessor` & `ElementInteractor` (`explorer/`)
- **State & Recovery**: `NavigationTracker`, `ReadinessManager`, `StateCacheManager`, `StateRecoveryManager` (`explorer/`)
- **Event Bus & Reporting**: `ExplorerEventEmitter`, `ReportCollector`, `SmokePlugin` (`explorer/events/`, `plugins/smoke/`)
- **Inspector Tooling**: `setupManualInspector` (`manual-browser-inspector/setupManualInspector.ts`)

### Mode-Specific Components
- **Regular Application Mode**:
  - Entry Script: `run.ts` / `run-smoke.ts`
  - Context: `GuestContext` (`execution-context/GuestContext.ts`)
- **Admin Panel Mode**:
  - Entry Script: `run-admin-nav.ts`
  - Context: `AdminContext` (`execution-context/AdminContext.ts`) / `AdminNavContext` (`run-admin-nav.ts`)

---

## 2. Complete Workflow Execution Analysis

```
                      +----------------------------------+
                      |         npm run dev check        |
                      +----------------------------------+
                                       |
                                       v
                      +----------------------------------+
                      |      Launch Playwright Browser   |
                      |   Inject Manual Inspector (Alt+1)|
                      +----------------------------------+
                                       |
                  +--------------------+--------------------+
                  |                                         |
                  v                                         v
        [Regular Application]                      [Admin Panel]
                  |                                         |
         GuestContext.prepare()                   AdminNavContext.prepare()
   (Navigate directly to baseUrl)                           |
                  |                                 1. Navigate to /login
                  |                                 2. Fill admin credentials
                  |                                 3. Submit & verify auth
                  |                                 4. Wait for IndexedDB persist
                  |                                 5. Client-side route to /admin
                  |                                         |
                  +--------------------+--------------------+
                                       |
                                       v
                      +----------------------------------+
                      |       CONVERGENCE POINT          |
                      |   runUIExplorer() / UIExplorer   |
                      +----------------------------------+
                                       |
                                       v
                      +----------------------------------+
                      |     Exploration Pipeline         |
                      |  1. Element Scanning             |
                      |  2. Policy Grouping & Sampling   |
                      |  3. Interaction Execution        |
                      |  4. State Recovery & Readiness   |
                      +----------------------------------+
                                       |
                                       v
                      +----------------------------------+
                      |      Event & Report Emission     |
                      |   SmokeReport / Knowledge Graph  |
                      +----------------------------------+
```

---

## 3. Workflow Phase Breakdown

### Phase 1: Entry Points & Environment Initialization
- **Regular Mode Entry**: `run.ts` calls `runUIExplorer()` directly, or `run-smoke.ts` invokes `runSmokeAutomation()` with default guest options.
- **Admin Mode Entry**: `run-admin-nav.ts` defines `AdminNavContext` and passes it via `config.context` to `runSmokeAutomation()`.
- **Initialization Sequence (Both Modes)**:
  1. `ensureDevServer`: Verifies if `http://localhost:8081` is running; launches `npm run dev` if offline.
  2. Browser & Page Provisioning: Launches Playwright Chromium in non-headless mode.
  3. **Manual Inspector Binding**: `setupManualInspector(page)` injects `window.__isPlaywright = true` into the browser runtime and exposes `__playwright_takeScreenshotAndDumpState`. This activates the in-browser floating gear UI and enables **Alt + 1** state dumping during automation.

### Phase 2: Execution Context & Divergence

#### Divergence Point
The workflow **diverges** when resolving the configured execution context (`resolveExecutionContext(config.context)`).

#### Regular Mode (`GuestContext`)
- Calls `GuestContext.executePreparation(page, config)`.
- Performs a straightforward `page.goto(baseUrl)`.
- Emits "Guest Session Ready" and proceeds immediately to exploration.

#### Admin Mode (`AdminNavContext` / `AdminContext`)
- Calls `AdminNavContext.prepare(page, config)` which delegates to `AdminContext`.
- **Authentication Sub-Flow**:
  1. Navigates to `/login`.
  2. Waits for input fields (`usernameSelector`, `passwordSelector`).
  3. Fills admin credentials using simulated key presses (`pressSequentially`).
  4. Clicks `submitSelector` and waits for URL redirection away from `/login`.
  5. Validates against `[data-testid="login-error-text"]` for backend rejection.
- **SPA Transition Sub-Flow**:
  1. Pauses briefly to allow Firebase Auth to write tokens to IndexedDB.
  2. Injects a client-side link element (`<a href="/admin">`) into the DOM.
  3. Clicks the link via Playwright trusted click to perform client-side SPA routing (avoiding full page reloads that invalidate session storage in incognito contexts).
  4. Waits for `/admin` hydration and ready state.

---

### Phase 3: Exploration Pipeline (Convergence Point)

#### Convergence Point
Once context preparation completes (whether arriving at `/` via `GuestContext` or `/admin` via `AdminNavContext`), both workflows **converge completely** into the core `UIExplorer` engine.

The exploration loop executes identically across both modes:

1. **DOM Element Discovery (`ElementScanner`)**:
   - Scans active page DOM for interactable targets (`button`, `a`, `input`, `select`, `[role="button"]`, etc.).
   - Computes unique selector paths and extracts visible labels.

2. **Group Classification & Policy Engine (`InteractionPolicyEngine`)**:
   - `ElementGroupDetector` groups elements into structural types (`listGroup`, `gridGroup`, `carouselGroup`, `buttonGroup`).
   - `InteractionPolicyEngine` applies configured sampling rules (e.g., sample first 1 list item, sample up to 15 buttons).

3. **Interaction Execution (`InteractionProcessor` & `ElementInteractor`)**:
   - Iterates through sampled target elements.
   - Triggers click, input, or toggle actions.
   - Intercepts navigation changes or modal popups.

4. **State Recovery & Readiness (`StateRecoveryManager`)**:
   - Evaluates page readiness (`ReadinessManager`).
   - Manages state rollback/back-navigation if an interaction navigates away from the active exploration tree depth (`NavigationTracker`).

---

### Phase 4: Observability, Event Stream & Reporting
Both workflows utilize the same event-driven architecture:
- `ExplorerEventEmitter` broadcasts events (`ScreenDiscovered`, `InteractionPerformed`, `ErrorEncountered`, `ExplorationCompleted`).
- Subscribers handle side effects:
  - `ReportCollector`: Collects in-memory navigation tree and execution statistics.
  - `SmokePlugin`: Compiles final `SmokeReport` (`reports/smoke-report.json` and Markdown summaries).
  - `KnowledgePipeline` (when `deep-diagnostics` mode is active): Runs `RelationshipAnalyzer` and `CapabilityAnalyzer` to export `application-knowledge-graph.json` and `application-documentation.md`.

---

## 4. Architectural Summary & Refactoring Opportunities

| Dimension | Regular Application Exploration | Admin Panel Exploration |
| :--- | :--- | :--- |
| **Entry Point** | `run.ts` / `run-smoke.ts` | `run-admin-nav.ts` |
| **Context Preparation** | `GuestContext` (Direct URL load) | `AdminNavContext` (Login + SPA navigation) |
| **Authentication Requirement** | None | Full Admin Login (Firebase / Local Auth) |
| **Route Target** | Storefront root (`/`) | Admin Panel (`/admin`) |
| **Core Engine** | `UIExplorer` (Shared) | `UIExplorer` (Shared) |
| **Inspection Tooling** | `setupManualInspector` (Shared) | `setupManualInspector` (Shared) |
| **Event System** | `ExplorerEventEmitter` (Shared) | `ExplorerEventEmitter` (Shared) |
| **Reporting** | `SmokePlugin` (Shared) | `SmokePlugin` (Shared) |

### Key Takeaway for Extraction
The **only** distinction between Regular and Admin exploration is the **Pre-Exploration Context Preparation Phase** (Authentication + Route Transition). All downstream processes—DOM scanning, element grouping, policy evaluation, interaction execution, state recovery, manual inspection, event emission, and report generation—are 100% shared.

Extracting `ExecutionContext` preparation into a modular pipeline step allows any new exploration mode (e.g., User Dashboard, Checkout Flow, Vendor Portal) to be added simply by providing a custom `ExecutionContext` implementation while reusing 100% of the core automation foundation.
