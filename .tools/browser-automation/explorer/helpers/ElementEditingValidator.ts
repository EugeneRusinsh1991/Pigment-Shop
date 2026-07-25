import { IWebPage } from '../driver/DriverInterfaces';

export interface FormValidationResult {
  success: boolean;
  error?: string;
  originalValue?: string;
  updatedValue?: string;
}

export class ElementEditingValidator {
  static async validateFieldEditing(
    page: IWebPage,
    inputSelector: string,
    submitSelector: string
  ): Promise<FormValidationResult> {
    try {
      const inputLocator = page.locator(inputSelector);
      const submitLocator = page.locator(submitSelector);

      if (!(await inputLocator.isVisible()) || !(await submitLocator.isVisible())) {
        return { success: false, error: `Selectors not visible: ${inputSelector} or ${submitSelector}` };
      }

      // 1. Snapshot original value
      const originalValue: string = await inputLocator.evaluate((el: any) => el.value ?? el.innerText ?? '');
      const testValue = `${originalValue}_TEST_${Date.now()}`;

      // 2. Fill test string & click submit
      await inputLocator.fill(testValue);
      await submitLocator.click();
      await page.waitForTimeout(1000);

      // 3. Assert mutated value
      const updatedValue: string = await inputLocator.evaluate((el: any) => el.value ?? el.innerText ?? '');
      if (updatedValue !== testValue) {
        return {
          success: false,
          error: `Mutated value check failed. Expected "${testValue}", got "${updatedValue}"`,
          originalValue,
          updatedValue
        };
      }

      // 4. Restore original value & click submit
      await inputLocator.fill(originalValue);
      await submitLocator.click();
      await page.waitForTimeout(1000);

      // 5. Assert restored value
      const restoredValue: string = await inputLocator.evaluate((el: any) => el.value ?? el.innerText ?? '');
      if (restoredValue !== originalValue) {
        return {
          success: false,
          error: `Restored value check failed. Expected "${originalValue}", got "${restoredValue}"`,
          originalValue,
          updatedValue: restoredValue
        };
      }

      return { success: true, originalValue, updatedValue };
    } catch (err: any) {
      return { success: false, error: err.message || String(err) };
    }
  }
}
