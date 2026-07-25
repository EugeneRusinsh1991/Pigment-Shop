# 07 - Implementation Map

## Overview
This document provides a precise mapping of the existing `.tools/browser-automation` codebase to the proposed simple field validation functionality. It specifies exact file paths, classes, methods, purposes, and rationale for every integration point.

---

## Codebase Integration Map

### 1. `ElementEditingValidator.ts` (NEW HELPER)
- **File Path**: `.tools/browser-automation/explorer/helpers/ElementEditingValidator.ts`
- **Class / Function**: `ElementEditingValidator.validateFieldEditing(page: IWebPage, inputSelector: string, submitSelector: string)`
- **Purpose**: Encapsulates the 5-step pragmatic validation lifecycle (snapshot original value, fill test string, click save, verify updated value, restore original value and save).
- **Integration Rationale**: Isolated helper utility under `explorer/helpers/` following the pattern of `devServerHelper.ts` and `envValidator.ts`.

---

### 2. `UIExplorer.ts` (CORE EXPLORER AGGREGATOR)
- **File Path**: `.tools/browser-automation/explorer/UIExplorer.ts`
- **Class**: `UIExplorer`
- **Method**: `exploreDFS(page: IWebPage, currentDepth: number, depthLimit: number)`
- **Purpose**: Trigger form field validation right after screen initialization (`initializeScreenState(currentUrl)`).
- **Integration Rationale**: `exploreDFS` is the central traversal method executed whenever a screen is entered. Calling the simple field validator here ensures editable forms encountered during traversal are validated immediately prior to element-by-element DFS exploration.

---

### 3. `ExplorerEventEmitter.ts` & `SmokePlugin.ts` (OBSERVABILITY & REPORTING)
- **File Path**: `.tools/browser-automation/explorer/events/ExplorerEventEmitter.ts`
- **Interface / Type**: `ExplorerEvents`
- **Purpose**: Add new event types `FormValidationStarted` and `FormValidationCompleted`.

- **File Path**: `.tools/browser-automation/plugins/smoke/SmokePlugin.ts`
- **Class**: `SmokePlugin`
- **Method**: `subscribe(emitter: ExplorerEventEmitter)`
- **Purpose**: Listen to `FormValidationCompleted` events and record results (successes/failures) into `this.report`.
- **Integration Rationale**: Guarantees that validation outcomes are reported in standard console logs and `.tools/browser-automation/reports/` outputs without introducing custom reporting abstractions.

---

### 4. `run-admin-nav.ts` (EXECUTION ENTRY POINT)
- **File Path**: `.tools/browser-automation/run-admin-nav.ts`
- **Class / Context**: `AdminNavContext`
- **Method**: `prepare(page: Page, config: any)`
- **Purpose**: Configure targeted selectors for admin editable forms (e.g. `[data-testid="edit-title-input"]`, `[data-testid="save-button"]`).
- **Integration Rationale**: `run-admin-nav.ts` is the dedicated launcher for Admin Panel validation. Adding target form selectors here keeps test configuration out of general smoke tests.

---

## Execution Flow Sequence

```
1. run-admin-nav.ts -> Launches AdminNavContext and initializes runSmokeAutomation()
2. UIExplorer.start() -> Calls exploreDFS()
3. UIExplorer.exploreDFS()
     └── Calls initializeScreenState(currentUrl)
     └── Triggers ElementEditingValidator.validateFieldEditing(page, inputSelector, submitSelector)
          ├── 1. Reads & stores original value
          ├── 2. Fills test string & clicks Save
          ├── 3. Asserts mutated value
          ├── 4. Fills original value & clicks Save
          └── 5. Emits 'FormValidationCompleted'
4. SmokePlugin receives 'FormValidationCompleted' event & updates SmokeReport
5. UIExplorer resumes standard DFS interaction loop
```
