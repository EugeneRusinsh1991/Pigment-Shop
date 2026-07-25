# 08 - Implementation Blueprint

## Overview
This document provides a step-by-step implementation blueprint for extending Browser Automation with safe, simple field editing validation. Every step is defined with exact file targets, methods, additions, dependencies, execution order, side effects, and verification steps.

---

## Step-by-Step Implementation Blueprint

### Step 1: Create `ElementEditingValidator.ts` Helper
- **Target File**: `.tools/browser-automation/explorer/helpers/ElementEditingValidator.ts` (NEW)
- **Function/Method**: `validateFieldEditing(page: IWebPage, inputSelector: string, submitSelector: string): Promise<FormValidationResult>`
- **What Should Be Added**:
  - Snapshot original `input.inputValue()`.
  - Fill test value (`originalValue + '_TEST_' + Date.now()`).
  - Click submit button & await DOM stabilization.
  - Assert mutated value in DOM.
  - Fill original value & click submit button.
  - Assert restored value in DOM.
- **Dependencies**: `IWebPage` interface from `../driver/DriverInterfaces`.
- **Execution Order**: 1 (Must exist before integration).
- **Potential Side Effects**: Timeout if form submit button triggers long network requests (mitigated by 3000ms max timeout).
- **Validation Steps**:
  - Run typecheck: `npx tsc --noEmit`.

---

### Step 2: Extend Event Definitions in `ExplorerEventEmitter.ts`
- **Target File**: `.tools/browser-automation/explorer/events/ExplorerEventEmitter.ts`
- **Interface to Change**: `ExplorerEvents`
- **What Should Be Added**:
  - `FormValidationStarted`: `{ context: ExplorerContext; timestamp: number; selector: string }`
  - `FormValidationCompleted`: `{ context: ExplorerContext; timestamp: number; selector: string; success: boolean; error?: string }`
- **Dependencies**: `ExplorerContext`.
- **Execution Order**: 2 (Prepares event bus).
- **Potential Side Effects**: None (adds optional event types).
- **Validation Steps**:
  - Verify zero TypeScript compiler errors.

---

### Step 3: Connect Observability in `SmokePlugin.ts`
- **Target File**: `.tools/browser-automation/plugins/smoke/SmokePlugin.ts`
- **Method to Change**: `subscribe(emitter: ExplorerEventEmitter)`
- **What Should Be Added**:
  - Listener for `FormValidationCompleted`.
  - If `event.success === false`, call `this.recordFailure(event.context.currentScreen, 'Form Editing Failure', event.error)`.
- **Dependencies**: Step 2 (`ExplorerEventEmitter`).
- **Execution Order**: 3.
- **Potential Side Effects**: Failed form validations will now count toward `report.summary.failedInteractions`.
- **Validation Steps**:
  - Run `run-smoke.ts` to confirm no regression in existing event handlers.

---

### Step 4: Integrate Execution in `UIExplorer.ts`
- **Target File**: `.tools/browser-automation/explorer/UIExplorer.ts`
- **Method to Change**: `exploreDFS(page: IWebPage, currentDepth: number, depthLimit: number)`
- **What Should Be Added**:
  - Check if `this.config.formValidationConfig` is enabled.
  - Immediately following `initializeScreenState(currentUrl)`, invoke `ElementEditingValidator.validateFieldEditing`.
  - Emit `FormValidationCompleted` event.
- **Dependencies**: Step 1 (`ElementEditingValidator`), Step 2 (`ExplorerEventEmitter`).
- **Execution Order**: 4.
- **Potential Side Effects**: Adds ~2-3 seconds to screen processing time when form validation is enabled.
- **Validation Steps**:
  - Run `UIExplorer` in test mode and confirm field validation executes prior to element DFS scanning.

---

### Step 5: Configure Launch Script in `run-admin-nav.ts`
- **Target File**: `.tools/browser-automation/run-admin-nav.ts`
- **Location to Change**: Main execution block `(async () => { ... })()`
- **What Should Be Added**:
  - Add `formValidationConfig` object to options passed into `runSmokeAutomation`:
    ```typescript
    formValidation: {
      enabled: true,
      inputSelector: '[data-testid="edit-title-input"]',
      submitSelector: '[data-testid="save-button"]'
    }
    ```
- **Dependencies**: Step 4.
- **Execution Order**: 5 (Final integration step).
- **Potential Side Effects**: None (isolated to admin navigation test runner).
- **Validation Steps**:
  - Execute `npx tsx .tools/browser-automation/run-admin-nav.ts`.
  - Verify terminal output shows form editing validation success and restored values.
