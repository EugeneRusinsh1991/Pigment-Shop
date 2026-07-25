# 10 - Implementation Roadmap

## Overview
This document serves as the definitive implementation contract for the simple field validation feature within the `.tools/browser-automation` framework. It details step-by-step atomic execution items, strictly following pre-verified integration points without architectural modification.

---

## Atomic Step-by-Step Implementation

### Step 1: Create `ElementEditingValidator.ts` Helper
- **File**: `.tools/browser-automation/explorer/helpers/ElementEditingValidator.ts`
- **Purpose**: Provide isolated, non-class helper utility to execute the 5-step pragmatic validation lifecycle (snapshot, fill test value, submit, verify, restore original value, submit).
- **Required Change**:
  - Create function `validateFieldEditing(page: IWebPage, inputSelector: string, submitSelector: string): Promise<FormValidationResult>`.
  - Implement value snapshot via `input.inputValue()`.
  - Perform test string insertion, submit click, and DOM verification.
  - Perform original value restoration, submit click, and final verification.
  - Return result structure `{ success: boolean; selector: string; originalValue: string; mutatedValue?: string; error?: string }`.
- **Constraints**:
  - Do not introduce class wrappers or persistent state across invocations.
  - Must consume existing `IWebPage` interface abstractions exclusively.
  - Maximum timeout per validation step must not exceed 3000ms.
- **Verification**:
  - Execute TypeScript compile check: `npx tsc --noEmit`.
- **Completion Criteria**: `ElementEditingValidator.ts` compiles cleanly with zero TypeScript errors.

---

### Step 2: Extend Event Map in `ExplorerEvents.ts`
- **File**: `.tools/browser-automation/explorer/events/ExplorerEvents.ts`
- **Purpose**: Register form validation events on the global explorer event bus to enable observability and reporting.
- **Required Change**:
  - Extend `ExplorerEventMap` interface with:
    - `FormValidationStarted`: `{ context: ExplorerContext; timestamp: number; selector: string }`
    - `FormValidationCompleted`: `{ context: ExplorerContext; timestamp: number; selector: string; success: boolean; error?: string }`
  - Update `ExplorerEventType` union type to include `'FormValidationStarted'` and `'FormValidationCompleted'`.
- **Constraints**:
  - Do not alter existing event payload definitions (`ScreenVisited`, `ElementClicked`, etc.).
  - Do not modify event dispatch mechanics in `ExplorerEventEmitter`.
- **Verification**:
  - Execute TypeScript compile check: `npx tsc --noEmit`.
- **Completion Criteria**: Event bus definitions accept `FormValidationStarted` and `FormValidationCompleted` events.

---

### Step 3: Connect Observability in `SmokePlugin.ts`
- **File**: `.tools/browser-automation/plugins/smoke/SmokePlugin.ts`
- **Purpose**: Record form editing validation outcomes into the unified smoke test report output.
- **Required Change**:
  - Inside `subscribe(emitter: ExplorerEventEmitter)` method:
    - Add listener for `FormValidationCompleted`.
    - On failure (`event.success === false`), invoke `this.recordFailure(event.context.currentScreen, 'Form Editing Failure', event.error)`.
    - Record total validation counts in test summary.
- **Constraints**:
  - Do not alter existing failure recording or report aggregation logic for standard element traversal.
  - Report output schema in `reports/` must remain backward compatible.
- **Verification**:
  - Execute TypeScript compile check: `npx tsc --noEmit`.
  - Run smoke automation runner: `npx tsx .tools/browser-automation/run-smoke.ts`.
- **Completion Criteria**: `SmokePlugin` registers validation listener without breaking existing event subscriptions.

---

### Step 4: Integrate Execution Trigger in `UIExplorer.ts`
- **File**: `.tools/browser-automation/explorer/UIExplorer.ts`
- **Purpose**: Trigger form field validation immediately upon screen initialization prior to standard DFS element exploration.
- **Required Change**:
  - In `exploreDFS(page: IWebPage, currentDepth: number, depthLimit: number)`:
    - Check configuration flag `this.config.formValidationConfig?.enabled`.
    - Directly following `await this.initializeScreenState(currentUrl)`, trigger `ElementEditingValidator.validateFieldEditing`.
    - Emit `FormValidationStarted` prior to validation and `FormValidationCompleted` upon completion.
- **Constraints**:
  - Do not modify `initializeScreenState()` logic or order of DFS traversal.
  - Validation execution must be guarded by configuration flag (default `false`).
- **Verification**:
  - Execute TypeScript compile check: `npx tsc --noEmit`.
- **Completion Criteria**: `exploreDFS()` conditionally executes field validation after screen initialization without disrupting DFS traversal loop.

---

### Step 5: Configure Targeted Launch Script in `run-admin-nav.ts`
- **File**: `.tools/browser-automation/run-admin-nav.ts`
- **Purpose**: Enable and configure form validation selectors for targeted admin navigation testing.
- **Required Change**:
  - Add form validation configuration block to `runSmokeAutomation({}, config)` parameters:
    ```typescript
    formValidationConfig: {
      enabled: true,
      inputSelector: '[data-testid="edit-title-input"]',
      submitSelector: '[data-testid="save-button"]'
    }
    ```
- **Constraints**:
  - Do not modify authentication flow (`AdminNavContext.prepare`) or navigation path targets.
- **Verification**:
  - Execute targeted admin test: `npx tsx .tools/browser-automation/run-admin-nav.ts`.
- **Completion Criteria**: Admin navigation runner completes execution, reporting form validation success and data restoration.

---

## Preconditions
1. Active development environment running local dev server (`npm run dev`).
2. `.tools/browser-automation` dependencies installed and TypeScript compiler functional.
3. Clean git working tree or stashed experimental state.

---

## Execution Order
1. Step 1: Create `ElementEditingValidator.ts`
2. Step 2: Extend `ExplorerEvents.ts`
3. Step 3: Update `SmokePlugin.ts`
4. Step 4: Update `UIExplorer.ts`
5. Step 5: Update `run-admin-nav.ts`

---

## Files Expected To Change
- `.tools/browser-automation/explorer/events/ExplorerEvents.ts`
- `.tools/browser-automation/plugins/smoke/SmokePlugin.ts`
- `.tools/browser-automation/explorer/UIExplorer.ts`
- `.tools/browser-automation/run-admin-nav.ts`

---

## New Files To Create
- `.tools/browser-automation/explorer/helpers/ElementEditingValidator.ts`

---

## Acceptance Criteria
1. `validateFieldEditing` successfully modifies target field, submits, verifies mutation, restores original value, submits, and verifies restoration.
2. Standard DFS exploration continues uninterrupted after validation completes.
3. Validation failures are recorded as test failures in the final smoke report output.
4. When `formValidationConfig.enabled` is `false` or omitted, exploration behavior remains 100% identical to baseline.
5. All TypeScript source files pass strict compilation check (`npx tsc --noEmit`).

---

## Regression Checklist
- [ ] Baseline smoke test `npx tsx .tools/browser-automation/run-smoke.ts` runs to completion without form validation enabled.
- [ ] Existing element traversal, caching, and screenshot taking functions operate unchanged.
- [ ] No residual mutated test strings remain in persistent application state after test execution finishes.
