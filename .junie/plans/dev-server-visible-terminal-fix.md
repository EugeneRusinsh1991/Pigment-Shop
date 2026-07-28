---
sessionId: session-260728-202527-1tv9
---

# Requirements

### Overview & Goals
Ensure that when launching tasks via keyboard shortcuts (`Alt + 1`, `Alt + 2`, `Alt + 3`, `Alt + 9`), the dev server (`npm run dev`) runs directly inside a visible IDE integrated terminal window rather than running silently in the background or spawning floating OS command prompts.

### Scope
- **In Scope**:
  - Update `.vscode/tasks.json` to include `"dependsOn": ["Run Dev"]` for tasks mapped to `Alt + 2` (`Tools: Run All Automations`) and `Alt + 9` (`Tools: Run All Automations Headless`).
  - Standardize `ensureDevServer` behavior across `.tools/browser-automation/helpers/devServerHelper.ts` and `scripts/open-playwright.js`.
  - Ensure task presentation settings focus and reveal dedicated terminal panels in VS Code.
- **Out of Scope**:
  - Modifying underlying Expo or React Native dev server startup logic.
  - Altering Playwright test runner execution logic beyond dev server startup.

### User Stories
- As a developer triggering `Alt + 1`, `Alt + 2`, `Alt + 3`, or `Alt + 9`, I want the `npm run dev` terminal to be visible inside the IDE terminal panel so that I can see logs and status updates directly.

### Functional Requirements
- `Alt + 1` opens and focuses the `Run Dev` task in the integrated terminal.
- `Alt + 2`, `Alt + 3`, and `Alt + 9` automatically execute `Run Dev` via task dependencies if the dev server is not already active, displaying the terminal panel inside VS Code.
- Automation scripts detect running dev server on `http://localhost:8081` without spawning hidden detached processes.

# Technical Design

### Current Implementation
- `.vscode/keybindings.json` routes `alt+1`, `alt+2`, `alt+3`, and `alt+9` to VS Code tasks.
- `Alt + 1` executes `Run Dev` (`npm run dev`) in a dedicated terminal panel.
- `Alt + 3` (`Open Playwright Browser`) declares `"dependsOn": ["Run Dev"]` in `.vscode/tasks.json`.
- `Alt + 2` (`Tools: Run All Automations`) and `Alt + 9` (`Tools: Run All Automations Headless`) do not declare `"dependsOn": ["Run Dev"]`.
- `scripts/open-playwright.js` and `devServerHelper.ts` contain background spawn routines that attempt to launch `npm run dev` in detached/hidden processes.

### Key Decisions
- **Decision 1: Leverage VS Code Task Engine (`dependsOn`) for dev server lifecycle**
  - Rationale: VS Code natively handles launching `Run Dev` in a visible, dedicated integrated terminal panel (`reveal: "always"`, `panel: "dedicated"`), preventing floating CMD windows or silent background execution.
- **Decision 2: Consolidate `ensureDevServer` logic across automation tools**
  - Rationale: Prevents duplicate background process spawns and ensures consistent readiness polling across Playwright scripts.

### Proposed Changes
- **`.vscode/tasks.json`**:
  - Add `"dependsOn": ["Run Dev"]` to `Tools: Run All Automations` (`Alt + 2`).
  - Add `"dependsOn": ["Run Dev"]` to `Tools: Run All Automations Headless` (`Alt + 9`).
- **`.tools/browser-automation/helpers/devServerHelper.ts`**:
  - Update `ensureDevServer` to poll active server state and rely on VS Code task handling.
- **`scripts/open-playwright.js`**:
  - Refactor `ensureDevServer` in `open-playwright.js` to eliminate background detached `spawn('npm', ['run', 'dev'])`.

### File Structure
- `.vscode/tasks.json` — Modify task dependencies and presentation options
- `.tools/browser-automation/helpers/devServerHelper.ts` — Modify dev server readiness helper
- `scripts/open-playwright.js` — Modify Playwright startup script

# Testing

### Validation Approach
Verify task configurations and script behaviors to ensure proper dev server terminal visibility in VS Code.

### Key Scenarios
- **Scenario 1**: Pressing `Alt + 1` launches `npm run dev` in an integrated terminal tab.
- **Scenario 2**: Pressing `Alt + 2`, `Alt + 3`, or `Alt + 9` when dev server is stopped triggers `Run Dev` first in the IDE terminal tab, followed by the automation task.
- **Scenario 3**: Pressing `Alt + 2`, `Alt + 3`, or `Alt + 9` when dev server is already running reuses the active server without spawning duplicate processes.

# Delivery Steps

### ✓ Step 1: Configure VS Code task dependencies for Alt shortcuts
Dev server `npm run dev` is automatically launched in a visible IDE terminal panel whenever shortcuts `Alt + 2`, `Alt + 3`, or `Alt + 9` are triggered while the dev server is not running.

- Update `.vscode/tasks.json` to add `"dependsOn": ["Run Dev"]` to `Tools: Run All Automations` (`Alt + 2`).
- Update `.vscode/tasks.json` to add `"dependsOn": ["Run Dev"]` to `Tools: Run All Automations Headless` (`Alt + 9`).
- Ensure presentation attributes (`reveal: "always"`, `panel: "dedicated"`, `focus: true`) are set consistently across shortcut tasks in `.vscode/tasks.json`.

### ✓ Step 2: Refactor dev server automation helpers
Automation scripts verify dev server status reliably without spawning hidden background detached shell processes.

- Update `.tools/browser-automation/helpers/devServerHelper.ts` to refine dev server status verification and readiness polling.
- Refactor `scripts/open-playwright.js` to remove inline detached `spawn('npm', ['run', 'dev'])` background invocations and align with `devServerHelper`.