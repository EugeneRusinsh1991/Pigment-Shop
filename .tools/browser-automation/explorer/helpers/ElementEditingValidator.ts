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

  private static async verifyValue(
    inputLocator: any,
    submitLocator: any,
    page: IWebPage,
    value: string,
    label: string
  ): Promise<{ ok: boolean; actual: string; error?: string }> {
    const actual = await ElementEditingValidator.applyAndRead(inputLocator, submitLocator, page, value);
    if (actual !== value) {
      return { ok: false, actual, error: `${label} check failed. Expected "${value}", got "${actual}"` };
    }
    return { ok: true, actual };
  }

  private static async resolveLocators(page: IWebPage, inputSelector: string, submitSelector: string) {
    const inputLocator = page.locator(inputSelector);
    const submitLocator = page.locator(submitSelector);
    if (!(await inputLocator.isVisible()) || !(await submitLocator.isVisible())) {
      throw new Error(`Selectors not visible: ${inputSelector} or ${submitSelector}`);
    }
    return { inputLocator, submitLocator };
  }

  static async validateFieldEditing(
    page: IWebPage,
    inputSelector: string,
    submitSelector: string
  ): Promise<FormValidationResult> {
    try {
      const { inputLocator, submitLocator } = await ElementEditingValidator.resolveLocators(page, inputSelector, submitSelector);
      const originalValue = await ElementEditingValidator.readValue(inputLocator);
      const testValue = `${originalValue}_TEST_${Date.now()}`;

      const mutated = await ElementEditingValidator.verifyValue(inputLocator, submitLocator, page, testValue, 'Mutated value');
      if (!mutated.ok) {
        return { success: false, error: mutated.error, originalValue, updatedValue: mutated.actual };
      }

      const restored = await ElementEditingValidator.verifyValue(inputLocator, submitLocator, page, originalValue, 'Restored value');
      if (!restored.ok) {
        return { success: false, error: restored.error, originalValue, updatedValue: restored.actual };
      }

      return { success: true, originalValue, updatedValue: mutated.actual };
    } catch (err: any) {
      return { success: false, error: err.message || String(err) };
    }
  }
}
