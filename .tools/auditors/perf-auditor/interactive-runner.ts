import { chromium } from 'playwright';
import { loadConfig } from './config';
import { PerfLogger } from './logger';
import { injectPerformanceObserver, getCollectedLongTasks } from './browser-observer';
import { CdpTraceCollector } from './cdp-trace-collector';
import { generateHtmlReport } from './reporter';
import path from 'path';

export async function runInteractiveMode() {
  const config = loadConfig({ interactive: true });
  const logger = new PerfLogger(config);
  const baseUrl = process.env.BASE_URL || 'http://localhost:8081';

  console.log(`[PERF AUDIT] Starting Interactive Mode on ${baseUrl}`);
  console.log(`[PERF AUDIT] Threshold: ${config.lagThresholdMs}ms.`);
  console.log(`[PERF AUDIT] CDP Profiler: ${config.enableCDPProfiler ? 'ENABLED' : 'DISABLED'}`);
  console.log(`[PERF AUDIT] CDP Tracing: ${config.enableCDPTracing ? 'ENABLED' : 'DISABLED'} (flush every ${config.traceFlushIntervalMs}ms)`);

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  let cdpSession: any = null;
  let traceCollector: CdpTraceCollector | null = null;

  cdpSession = await context.newCDPSession(page);

  if (config.enableCDPProfiler) {
    await cdpSession.send('Profiler.enable');
    await cdpSession.send('Profiler.start');
  }

  if (config.enableCDPTracing) {
    traceCollector = new CdpTraceCollector(cdpSession, config.lagThresholdMs, () => page.url());
    await traceCollector.start();
    console.log('[PERF AUDIT] CDP Tracing started — capturing engine-level events.');
  }

  await page.exposeFunction('__perfAuditReportLag', (lt: any) => {
    let callStack: any[] = [];
    
    logger.recordLag({
      timestamp: new Date().toISOString(),
      type: lt.type || 'longtask',
      durationMs: lt.durationMs,
      thresholdMs: config.lagThresholdMs,
      url: lt.url || page.url(),
      details: lt.details || `Interactive lag: ${lt.durationMs}ms`,
      userAction: lt.userAction,
      callStack: callStack.length > 0 ? callStack : undefined
    });

    if (config.screenshotOnLag && lt.durationMs >= 50) {
      const id = `lag-${Date.now()}-${lt.durationMs}`;
      const screenshotPath = path.join(logger.runDir, 'screenshots', `${id}.png`);
      page.screenshot({ path: screenshotPath, fullPage: false }).catch(() => {});
    }
  });

  await page.addInitScript((threshold) => {
    window.addEventListener('DOMContentLoaded', () => {
      let hud = document.getElementById('perf-audit-hud');
      if (!hud) {
        hud = document.createElement('div');
        hud.id = 'perf-audit-hud';
        hud.style.cssText = 'position:fixed;bottom:16px;right:16px;z-index:999999;background:rgba(15,23,42,0.95);color:#38bdf8;padding:12px 16px;border-radius:8px;font-family:monospace;font-size:12px;border:1px solid #334155;box-shadow:0 4px 12px rgba(0,0,0,0.4);pointer-events:none;';
        document.body.appendChild(hud);
      }
      
      let lagCount = 0;
      hud.innerHTML = `<div>⚡ PERF AUDIT ACTIVE</div><div>Threshold: ${threshold}ms</div><div id="perf-hud-status" style="color:#22c55e;margin-top:4px;">Status: Listening...</div>`;

      const origPush = Array.prototype.push;
      const lags = ((window as any).__perfAuditLags = (window as any).__perfAuditLags || []);
      lags.push = function (...args: any[]) {
        const res = origPush.apply(this, args);
        const statusEl = document.getElementById('perf-hud-status');
        const lt = args[0];
        if (lt?.durationMs > threshold) {
          lagCount++;
          if (statusEl) {
            statusEl.style.color = '#ef4444';
            const actionTarget = lt.userAction?.targetSelector ? ` on ${lt.userAction.targetSelector}` : '';
            let typeLabel = 'Lag';
            if (lt.type === 'longtask') typeLabel = 'LongTask';
            else if (lt.type === 'action_delay') typeLabel = 'ActionDelay';
            else if (lt.type === 'frame_drop') typeLabel = 'FrameDrop';
            statusEl.innerText = `⚠️ ${typeLabel} DETECTED: ${lagCount} (Last: ${lt.durationMs}ms${actionTarget})`;
          }
        }
        return res;
      };
    });
  }, config.lagThresholdMs);

  await injectPerformanceObserver(page, config.lagThresholdMs);
  await page.goto(baseUrl, { waitUntil: 'domcontentloaded' }).catch(() => {});
  await page.evaluate((threshold) => {
    (window as any).__perfAuditObserverInjected = true;
    (window as any).__perfAuditLags = (window as any).__perfAuditLags || [];
  }, config.lagThresholdMs).catch(() => {});

  const seenLags = new Set<string>();

  const recordTraceLags = (lags: any[]) => {
    for (const tl of lags) {
      logger.recordLag({
        timestamp: tl.timestamp,
        type: tl.type,
        durationMs: tl.durationMs,
        thresholdMs: config.lagThresholdMs,
        url: tl.url,
        details: tl.details,
        traceCategory: tl.traceCategory,
        traceName: tl.traceName,
        callStack: tl.callStack,
        sourceLocation: tl.sourceLocation,
      });
    }
  };

  const flushTraceLags = async () => {
    if (!traceCollector || page.isClosed()) return;
    try {
      const traceLags = await traceCollector.flush();
      console.log(`[PERF AUDIT] Trace flush: ${traceLags.length} lags found`);
      recordTraceLags(traceLags);
    } catch (err) {
      console.error('[PERF AUDIT] Trace flush ERROR:', err);
    }
  };

  const syncBrowserLags = async () => {
    if (page.isClosed()) return;
    const lags = await getCollectedLongTasks(page).catch(() => []);
    for (const lt of lags) {
      const key = `${lt.type}-${lt.durationMs}-${lt.userAction?.timestamp || lt.startTimeRaw || lt.timestamp}`;
      const isFrameDrop = lt.type === 'frame_drop';
      const isOverThreshold = isFrameDrop || lt.durationMs >= config.lagThresholdMs;
      if (!seenLags.has(key) && isOverThreshold) {
        seenLags.add(key);
        logger.recordLag({
          timestamp: new Date().toISOString(),
          type: lt.type || 'longtask',
          durationMs: lt.durationMs,
          thresholdMs: config.lagThresholdMs,
          url: lt.url || page.url(),
          details: `Browser observer: ${lt.durationMs}ms`,
          userAction: lt.userAction
        });
      }
    }
  };

  const traceInterval = traceCollector
    ? setInterval(flushTraceLags, config.traceFlushIntervalMs)
    : null;
  const browserInterval = setInterval(syncBrowserLags, 3000);

  const finishReport = async () => {
    if (traceInterval) clearInterval(traceInterval);
    clearInterval(browserInterval);
    await flushTraceLags().catch(() => {});
    await syncBrowserLags().catch(() => {});
    if (traceCollector) {
      const finalLags = await traceCollector.stop().catch(() => []);
      recordTraceLags(finalLags);
    }

    logger.saveReport();
    generateHtmlReport(logger.getLags(), path.join(logger.runDir, 'lags-report.html'));
    console.log(`[PERF AUDIT] Report saved to ${logger.runDir}`);
    console.log(`[PERF AUDIT] Total lags captured: ${logger.getLags().length}`);
  };

  await new Promise<void>((resolve) => {
    page.on('close', async () => {
      await finishReport();
      resolve();
    });
  });

  process.on('SIGINT', async () => {
    await finishReport();
    await browser.close();
    process.exit(0);
  });
}

if (require.main === module) {
  runInteractiveMode().catch(console.error);
}
