# Debugging & Automation

This document maps the browser automation infrastructure, developer overlays, and diagnostic tooling within the workspace.

## Key Directories & Modules

### 1. Browser Automation (`browser-automation/`)
- **Purpose**: Core framework for web crawling, DOM scanning, Playwright integration, and E2E automated smoke runs.
- **Sub-modules**:
  - `explorer/`: UI state scanner and DOM element inspector (`ElementScanner.ts`).
  - `observability/`: Centralized event dispatching and specialized reporters (Console, JSON, Markdown).
  - `execution-context/`: Environment setup and session context managers.
  - `plugins/`: Custom automation tasks and extensions.
  - `reports/`: Generated execution reports and test output metrics.
  - Entrypoints: `index.ts`, `run.ts`, `run-smoke.ts`, `smoke-automation.ts`.

### 2. Developer Debugging & Utilities (`debug/`)
- **Purpose**: UI overlays, keybindings, and runtime debug helpers for in-app diagnostics.
- **Sub-modules**:
  - `DevDebugOverlay.js`: Visual overlay for runtime performance and debug state.
  - `debug-hotkeys.md`: Shortcut map for developer diagnostic modes.
  - `automations/`: In-app automated trigger scripts.
  - `components/`: Debug UI components.
  - `utils/`: Low-level diagnostic helpers.

### 3. Root Level Debug & Test Scripts
- `debug-playwright.js`: Quick launcher for Playwright runner.
- `test-scanner.ts` / `test-scanner.js`: Standalone test suite for `ElementScanner`.

## Common Tasks & Workflows
- **Running E2E Automation**: Execute `npx ts-node browser-automation/run.ts` or `npm run dev:smoke`.
- **Debugging Element Scanner**: Modify or run `test-scanner.ts`.
- **Adjusting Dev Overlay**: Edit `debug/DevDebugOverlay.js`.
