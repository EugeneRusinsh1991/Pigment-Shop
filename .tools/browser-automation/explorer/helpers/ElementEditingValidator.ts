import { IWebPage } from '../driver/DriverInterfaces';

export interface FormValidationResult {
  success: boolean;
  error?: string;
  originalValue?: string;
  updatedValue?: string;
}

export class ElementEditingValidator {
  private static async readValue(locator: any): Promise<string> {
    return locator.evaluate((el: any) => el.value ?? el.innerText ?? '');
  }

  private static async submitEdit(locator: any, submitLocator: any, page: IWebPage): Promise<void> {
    await locator.fill(await ElementEditingValidator.readValue(locator));
    await submitLocator.click();
    await page.waitForTimeout(1000);
  }

  private static async applyAndRead(inputLocator: any, submitLocator: any, page: IWebPage, value: string): Promise<string> {
    await inputLocator.fill(value);
    await submitLocator.click();
    await page.waitForTimeout(1000);
    return ElementEditingValidator.readValue(inputLocator);
  }

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

      const originalValue = await ElementEditingValidator.readValue(inputLocator);
      const testValue = `${originalValue}_TEST_${Date.now()}`;

      const updatedValue = await ElementEditingValidator.applyAndRead(inputLocator, submitLocator, page, testValue);
      if (updatedValue !== testValue) {
        return { success: false, error: `Mutated value check failed. Expected "${testValue}", got "${updatedValue}"`, originalValue, updatedValue };
      }

      const restoredValue = await ElementEditingValidator.applyAndRead(inputLocator, submitLocator, page, originalValue);
      if (restoredValue !== originalValue) {
        return { success: false, error: `Restored value check failed. Expected "${originalValue}", got "${restoredValue}"`, originalValue, updatedValue: restoredValue };
      }

      return { success: true, originalValue, updatedValue };
    } catch (err: any) {
      return { success: false, error: err.message || String(err) };
    }
  }
}
