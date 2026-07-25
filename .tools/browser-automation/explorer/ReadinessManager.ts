import { IWebPage } from './driver/DriverInterfaces';

export class ReadinessManager {
  /**
   * Fast readiness check for React Native Web without waiting for persistent WebSocket/HMR network connections.
   */
  async waitForPageReady(page: IWebPage, timeoutMs = 5000): Promise<boolean> {
    try {
      await page.waitForLoadState('domcontentloaded', { timeout: timeoutMs }).catch(() => {});
      
      // Wait until React mounts actual components inside root (divs/buttons/links)
      await page.waitForFunction(() => {
        const root = document.getElementById('root');
        if (!root) return true;
        // Check if React has rendered child elements (more than just an empty shell)
        const hasElements = root.querySelectorAll('button, a, [role="button"], [role="link"], [data-testid], [tabindex="0"]').length > 0;
        const hasContent = root.querySelectorAll('div, span, p').length > 5;
        return hasElements || hasContent;
      }, { timeout: timeoutMs }).catch(() => {});

      // Short breather to prevent SPA stale DOM race conditions where old elements 
      // satisfy the readiness check before React unmounts them
      await page.waitForTimeout(150);

      return true;
    } catch (e) {
      return false;
    }
  }
}
