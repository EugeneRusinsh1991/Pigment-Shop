# 06 - Pragmatic Simple Field Validation Architecture

## Overview & Minimalist Approach

Rather than creating a complex, multi-layered data editing framework, this document outlines the minimal, pragmatic approach to extend Browser Automation to validate simple text field editing in the current application.

---

## 1. Minimal Implementation Plan

The entire editing, saving, verification, and restoration flow can be handled in a single, focused helper method embedded within the existing Browser Automation suite:

```typescript
export async function validateSimpleTextFieldEditing(
  page: Page,
  inputSelector: string,
  saveButtonSelector: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const input = page.locator(inputSelector);
    const saveBtn = page.locator(saveButtonSelector);

    // 1. Snapshot original value
    const originalValue = await input.inputValue();
    const testValue = `${originalValue}_TEST_${Date.now()}`;

    // 2. Perform edit & save
    await input.fill(testValue);
    await saveBtn.click();
    await page.waitForTimeout(1000); // Wait for response/toast

    // 3. Verify success (DOM value check)
    const updatedValue = await input.inputValue();
    if (updatedValue !== testValue) {
      throw new Error(`Value verification failed. Expected '${testValue}', got '${updatedValue}'`);
    }

    // 4. Restore original value
    await input.fill(originalValue);
    await saveBtn.click();
    await page.waitForTimeout(1000);

    // 5. Verify restored state
    const restoredValue = await input.inputValue();
    if (restoredValue !== originalValue) {
      throw new Error(`Restoration failed. Expected '${originalValue}', got '${restoredValue}'`);
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
```

---

## 2. Key Advantages of the Minimal Approach

1. **Zero Over-Engineering**: Eliminates complex backup registries, rollback stacks, or dynamic field inspectors.
2. **Fast Delivery**: Requires less than 50 lines of code integrated directly into existing exploratory flows.
3. **Low Risk**: Operates explicitly on known, safe form fields with inline try/finally restoration.
4. **Seamless Explorer Integration**: Executes inline during `ScreenEntered` or custom interaction routines without disrupting normal exploration.
