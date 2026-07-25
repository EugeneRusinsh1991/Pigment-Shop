# 11 - Patch Plan: Generic Data Persistence Validation

## Overview
This Patch Plan specifies the exact code modifications required to establish generic, reusable data persistence validation across the `.tools/browser-automation` framework. It enables end-to-end mutation, save verification, state restoration, and persistence testing for any form route in the application while maintaining a zero-unnecessary-abstraction footprint.

All code modifications below have been verified against the current codebase abstractions and API surface.

---

## Target File 1: `ExplorerConfig.ts` (CONFIGURATION DEFINITIONS)
- **Path**: `.tools/browser-automation/explorer/ExplorerConfig.ts`
- **Purpose**: Add `formValidationTargets` to the explorer configuration schema.

**Code Change**:
Add the target interface at the top of the file:
```typescript
export interface FormFieldTarget {
  inputSelector: string;
  submitSelector: string;
  testValueSuffix?: string;
}
```

Add the array to `ExplorerConfig` interface:
```typescript
export interface ExplorerConfig {
  // ... existing properties
  formValidationTargets?: FormFieldTarget[];
}
```

---

## Target File 2: `ElementEditingValidator.ts` (NEW HELPER)
- **Path**: `.tools/browser-automation/explorer/helpers/ElementEditingValidator.ts`
- **Purpose**: Generic helper function to handle form field state snapshot, mutation, save, verification, and restoration across any application route. Uses verified `IWebPage` and `IWebElement` APIs.

**Code Change (Full File)**:
```typescript
import { IWebPage } from '../driver/DriverInterfaces';
import { FormFieldTarget } from '../ExplorerConfig';

export interface FormValidationResult {
  success: boolean;
  selector: string;
  originalValue: string;
  mutatedValue?: string;
  error?: string;
}

export class ElementEditingValidator {
  static async validateFieldEditing(
    page: IWebPage,
    target: FormFieldTarget
  ): Promise<FormValidationResult> {
    const { inputSelector, submitSelector, testValueSuffix = '_TEST_' + Date.now() } = target;

    try {
      const inputEl = page.locator(inputSelector);
      const submitEl = page.locator(submitSelector);

      // 1. Read & Snapshot Original Value
      const originalValue = (await inputEl.evaluate((node: any) => node.value)) ?? '';
      const testValue = originalValue + testValueSuffix;

      // 2. Fill Test Value & Click Save
      await inputEl.fill(testValue);
      await submitEl.click();
      await page.waitForTimeout(500);

      // 3. Assert Mutated Value
      const mutatedValue = (await inputEl.evaluate((node: any) => node.value)) ?? '';
      if (mutatedValue !== testValue) {
        throw new Error(`Value mutation failed. Expected "${testValue}", got "${mutatedValue}"`);
      }

      // 4. Restore Original Value & Click Save
      await inputEl.fill(originalValue);
      await submitEl.click();
      await page.waitForTimeout(500);

      // 5. Assert Restored Value
      const restoredValue = (await inputEl.evaluate((node: any) => node.value)) ?? '';
      if (restoredValue !== originalValue) {
        throw new Error(`Value restoration failed. Expected "${originalValue}", got "${restoredValue}"`);
      }

      return {
        success: true,
        selector: inputSelector,
        originalValue,
        mutatedValue
      };
    } catch (err: any) {
      return {
        success: false,
        selector: inputSelector,
        originalValue: '',
        error: err.message || String(err)
      };
    }
  }
}
```

---

## Target File 3: `ExplorerEvents.ts` (EVENT DEFINITIONS)
- **Path**: `.tools/browser-automation/explorer/events/ExplorerEvents.ts`
- **Purpose**: Register form validation lifecycle events on the explorer event bus.

**Code Change**:
Add the new event types and add to `ExplorerEventMap`:
```typescript
export interface FormValidationStartedEvent extends ExplorerEventBase {
  selector: string;
}

export interface FormValidationCompletedEvent extends ExplorerEventBase {
  selector: string;
  success: boolean;
  error?: string;
}

export interface ExplorerEventMap {
  // ... existing events
  FormValidationStarted: FormValidationStartedEvent;
  FormValidationCompleted: FormValidationCompletedEvent;
}
```

---

## Target File 4: `SmokePlugin.ts` (OBSERVABILITY HOOK)
- **Path**: `.tools/browser-automation/plugins/smoke/SmokePlugin.ts`
- **Purpose**: Listen to validation completed events and record failures into `SmokeReport`.

**Code Change**:
Inside the `subscribe(emitter: ExplorerEventEmitter)` method, add:
```typescript
    emitter.on('FormValidationCompleted', (e) => {
      if (!e.success) {
        this.recordFailure(
          e.context.currentScreen,
          `Data Persistence Validation Failed`,
          `[${e.selector}] ${e.error || 'Unknown validation error'}`
        );
      }
    });
```

---

## Target File 5: `UIExplorer.ts` (EXPLORATION LOOP INTEGRATION)
- **Path**: `.tools/browser-automation/explorer/UIExplorer.ts`
- **Purpose**: Invoke generic `ElementEditingValidator` during screen exploration when configured.

**Code Change**:
Import the validator:
```typescript
import { ElementEditingValidator } from './helpers/ElementEditingValidator';
```

Inside `exploreDFS(page: IWebPage, currentDepth: number, depthLimit: number)`, directly after `await this.initializeScreenState(currentUrl);`, add:
```typescript
    if (this.config.formValidationTargets && this.config.formValidationTargets.length > 0) {
      for (const target of this.config.formValidationTargets) {
        await this.emitter.emit('FormValidationStarted', {
          context: this.context,
          timestamp: Date.now(),
          selector: target.inputSelector
        });

        const result = await ElementEditingValidator.validateFieldEditing(page, target);

        await this.emitter.emit('FormValidationCompleted', {
          context: this.context,
          timestamp: Date.now(),
          selector: target.inputSelector,
          success: result.success,
          error: result.error
        });
      }
    }
```

---

## Target File 6: `run-admin-nav.ts` (TEST RUNNER CONFIGURATION)
- **Path**: `.tools/browser-automation/run-admin-nav.ts`
- **Purpose**: Configure targeted input/submit selectors for persistent data editing validation on relevant application routes.

**Code Change**:
Inside the `config` object in the main execution block, add:
```typescript
      formValidationTargets: [
        {
          inputSelector: '[data-testid="edit-title-input"]',
          submitSelector: '[data-testid="save-button"]'
        }
      ],
```

---

## Verification & Execution Protocol
1. Run static analysis: `npx tsc --noEmit`
2. Execute admin navigation test runner: `npx tsx .tools/browser-automation/run-admin-nav.ts`
3. Execute standard smoke test runner: `npx tsx .tools/browser-automation/run-smoke.ts`
4. Inspect console logs and report output for zero regression and correct validation output.
