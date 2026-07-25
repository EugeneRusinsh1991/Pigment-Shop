# Stage 1 — Project Inventory & Sub-Batch Sizing

## 📍 Target Scope Overview
- **Scope**: `.tools/browser-automation/`
- **Profile**: Architecture
- **Tech Stack**: TypeScript, Playwright API, Node.js, Custom Event/DI Subsystem

## 📁 Repository Structure & Subsystems
- **Execution Contexts (`execution-context/`)**: Manages browser context initialization, authentication states (`AdminContext`, `GuestContext`), and session persistence.
- **Automation Entrypoints (`index.ts`, `run-*.ts`, `smoke-automation.ts`)**: Orchestrates context creation, explorer initialization, and smoke test routines.
- **Exploration Core (`explorer/`)**: Core DFS/BFS exploration loop (`UIExplorer`), element locator & interactor (`ElementScanner`, `ElementInteractor`), and navigation router (`NavigationHandler`).
- **State & Recovery (`explorer/`)**: Cache & history management (`StateCacheManager`), failure recovery (`StateRecoveryManager`), and DOM readiness verification (`ReadinessManager`).
- **Modularity & Event Architecture (`explorer/{di, events, graph, modules, observability, policy, diagnostics, driver, utils}`, `plugins/`)**: Pluggable architecture, event-driven hooks, knowledge graph integration, and diagnostic reporting.

## 📦 Batch Definitions
1. **Batch 2.1: `entrypoints-context`**
   - **Path**: `.tools/browser-automation/execution-context/*`, `index.ts`, `run-smoke.ts`, `run-admin-nav.ts`, `run.ts`, `smoke-automation.ts`
   - **Focus**: Context inheritance, setup lifecycle, entrypoint coupling, error handling flow.
2. **Batch 2.2: `explorer-core`**
   - **Path**: `.tools/browser-automation/explorer/{UIExplorer,InteractionProcessor,NavigationHandler,ElementScanner,ElementInteractor,ExplorerConfig,ExplorerContext}.ts`
   - **Focus**: Core exploration loops, single responsibility violations, interaction pipeline architecture.
3. **Batch 2.3: `explorer-state-recovery`**
   - **Path**: `.tools/browser-automation/explorer/{StateCacheManager,StateRecoveryManager,ReadinessManager,ActionDepthTracker,NavigationTracker,ExplorerReport}.ts`
   - **Focus**: State management patterns, recovery strategies, cache invalidation, readiness primitives.
4. **Batch 2.4: `explorer-modules-plugins`**
   - **Path**: `.tools/browser-automation/explorer/{di,events,graph,modules,observability,policy,diagnostics,driver,utils}/*`, `.tools/browser-automation/plugins/*`
   - **Focus**: Dependency injection design, event bus architecture, plugin extensibility, policy enforcement.
