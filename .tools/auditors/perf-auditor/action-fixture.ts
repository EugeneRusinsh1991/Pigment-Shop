import { test as baseTest, Page } from '@playwright/test';
import { loadConfig, PerfAuditConfig } from './config';
import { PerfLogger } from './logger';
import { injectPerformanceObserver } from './browser-observer';
import path from 'path';

export type PerfFixture = {
  perfPage: Page;
  perfLogger: PerfLogger;
  perfConfig: PerfAuditConfig;
};

export const test = baseTest.extend<PerfFixture>({
  perfConfig: [async ({}, use) => {
    const config = loadConfig();
    await use(config);
  }, { scope: 'test' }],

  perfLogger: [async ({ perfConfig }, use) => {
    const logger = new PerfLogger(perfConfig);
    await use(logger);
    logger.saveReport();
  }, { scope: 'test' }],

  perfPage: async ({ page, perfConfig, perfLogger }, use) => {
    await injectPerformanceObserver(page);

    const originalClick = page.click.bind(page);
    page.click = async (selector: string, options?: any) => {
      const start = Date.now();
      try {
        return await originalClick(selector, options);
      } finally {
        const durationMs = Date.now() - start;
        if (durationMs > perfConfig.lagThresholdMs) {
          let screenshotPath: string | undefined;
          if (perfConfig.screenshotOnLag) {
            const fileName = `lag-click-${Date.now()}.png`;
            screenshotPath = path.join(perfLogger.runDir, 'screenshots', fileName);
            await page.screenshot({ path: screenshotPath }).catch(() => {});
          }
          perfLogger.recordLag({
            timestamp: new Date().toISOString(),
            type: 'action_delay',
            action: 'click',
            selector,
            durationMs,
            thresholdMs: perfConfig.lagThresholdMs,
            url: page.url(),
            screenshotPath,
          });
        }
      }
    };

    await use(page);
  },
});

export { expect } from '@playwright/test';
