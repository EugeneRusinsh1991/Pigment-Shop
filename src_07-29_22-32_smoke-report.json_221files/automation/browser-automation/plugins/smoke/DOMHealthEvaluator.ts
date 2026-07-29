import { IWebPage } from '../../explorer/driver/DriverInterfaces';

export class DOMHealthEvaluator {
  public static async evaluateDOMHealth(
    page: IWebPage,
    url: string,
    eventName: string,
    recordFailure: (screen: string, errorType: string, errorMessage: string, stackTrace?: string, eventName?: string) => void
  ) {
    try {
      // 1. Check for White Screen / Blank Screen
      const bodyContent = await page.evaluate(() => document.body.innerHTML.trim());
      if (!bodyContent) {
        recordFailure(url, 'Blank Screen', 'Body is empty', undefined, eventName);
      }

      // 2. Check for missing root component (React Native Web usually has #root)
      const rootExists = await page.evaluate(() => !!document.getElementById('root'));
      if (!rootExists) {
        recordFailure(url, 'Missing Root Component', 'Element #root not found in DOM', undefined, eventName);
      }
    } catch (e: any) {
      recordFailure(url, 'Health Check Evaluation Failed', e.message, undefined, eventName);
    }
  }
}
