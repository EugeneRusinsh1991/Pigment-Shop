import { IWebPage } from './driver/DriverInterfaces';
import { ExplorerConfig, defaultConfig } from './ExplorerConfig';

export class ReadinessManager {
  private defaultPageReadyTimeoutMs: number;
  private defaultSpaBreatherTimeoutMs: number;

  constructor(config?: Partial<ExplorerConfig>) {
    const timeouts = { ...defaultConfig.timeouts, ...config?.timeouts };
    this.defaultPageReadyTimeoutMs = timeouts.pageReadyTimeoutMs;
    this.defaultSpaBreatherTimeoutMs = timeouts.spaBreatherTimeoutMs;
  }

  /**
   * Fast readiness check for React Native Web without waiting for persistent WebSocket/HMR network connections.
   */
  async waitForPageReady(page: IWebPage, timeoutMs?: number): Promise<boolean> {
    const timeout = timeoutMs ?? this.defaultPageReadyTimeoutMs;
    try {
      if (page.waitForLoadState) {
        await page.waitForLoadState('domcontentloaded', { timeout }).catch(() => {});
      }
      
      // Wait until React mounts actual components inside root (divs/buttons/links)
      if (page.waitForFunction) {
        await page.waitForFunction(() => {
          const root = document.getElementById('root');
          if (!root) return true;
          // Check if React has rendered child elements (more than just an empty shell)
          const hasElements = root.querySelectorAll('button, a, [role="button"], [role="link"], [data-testid], [tabindex="0"]').length > 0;
          const hasContent = root.querySelectorAll('div, span, p').length > 5;
          return hasElements || hasContent;
        }, { timeout }).catch(() => {});
      }

      // Short breather to prevent SPA stale DOM race conditions where old elements 
      // satisfy the readiness check before React unmounts them
      await page.waitForTimeout(this.defaultSpaBreatherTimeoutMs);

      return true;
    } catch (e) {
      return false;
    }
  }
}
