import { test } from './action-fixture';
import { getCollectedLongTasks } from './browser-observer';
import { generateHtmlReport } from './reporter';
import path from 'path';

test.describe('Performance Lag Audit Scenarios', () => {
  test('Catalog, filters, and UI performance check', async ({ perfPage: page, perfLogger, perfConfig }) => {
    const baseUrl = process.env.BASE_URL || 'http://localhost:8081';
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' }).catch(() => {});
    await page.waitForTimeout(1000);

    const interactiveElements = page.locator('button, a, [role="button"]');
    const count = await interactiveElements.count().catch(() => 0);
    const clickLimit = Math.min(count, 10);

    for (let i = 0; i < clickLimit; i++) {
      const el = interactiveElements.nth(i);
      if (await el.isVisible().catch(() => false)) {
        await el.click({ timeout: 2000 }).catch(() => {});
        await page.waitForTimeout(300);
      }
    }

    const longTasks = await getCollectedLongTasks(page).catch(() => []);
    for (const lt of longTasks) {
      if (lt.durationMs > perfConfig.lagThresholdMs) {
        perfLogger.recordLag({
          timestamp: new Date().toISOString(),
          type: 'longtask',
          durationMs: lt.durationMs,
          thresholdMs: perfConfig.lagThresholdMs,
          url: page.url(),
          details: `Long task entry: ${lt.durationMs}ms`,
        });
      }
    }

    const htmlReportPath = path.join(perfLogger.runDir, 'lags-report.html');
    generateHtmlReport(perfLogger.getLags(), htmlReportPath);
  });
});
