import { Page } from '@playwright/test';

export async function injectPerformanceObserver(page: Page, thresholdMs: number = 50): Promise<void> {
  const code = (threshold: number) => {
    if ((window as any).__perfAuditObserverInjected) return;
    (window as any).__perfAuditObserverInjected = true;
    (window as any).__perfAuditLags = (window as any).__perfAuditLags || [];
    
    function getSiblingIndex(el: any, selector: string): number {
      let sib = el;
      let nth = 1;
      while (sib = sib.previousElementSibling) {
        if (sib.nodeName.toLowerCase() == selector) nth++;
      }
      return nth;
    }

    function getElementSelector(el: any): { selector: string; hasId: boolean } {
      let selector = el.nodeName.toLowerCase();
      if (el.id) {
        return { selector: selector + '#' + el.id, hasId: true };
      }
      const nth = getSiblingIndex(el, selector);
      if (nth != 1) selector += ":nth-of-type(" + nth + ")";
      return { selector, hasId: false };
    }

    function getCssSelector(el: any): string {
      if (!(el instanceof Element)) return '';
      const path = [];
      let current = el;
      while (current.nodeType === Node.ELEMENT_NODE) {
        const step = getElementSelector(current);
        path.unshift(step.selector);
        if (step.hasId) break;
        current = current.parentNode;
      }
      return path.join(" > ");
    }

    function reportLag(record: any) {
      if ((window as any).__perfAuditReportLag) {
        (window as any).__perfAuditReportLag(record).catch(() => {});
      }
      (window as any).__perfAuditLags.push(record);
    }

    function setupActionListeners() {
      ['click', 'input', 'keydown', 'pointerdown', 'scroll'].forEach(evtType => {
        window.addEventListener(evtType, (e: any) => {
          const actionContext = {
            type: evtType,
            targetSelector: getCssSelector(e.target),
            targetTagName: e.target?.tagName,
            targetText: e.target?.innerText?.substring(0, 30),
            timestamp: performance.now()
          };
          (window as any).__perfAuditLastAction = actionContext;

          const start = performance.now();
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              const delta = Math.round(performance.now() - start);
              if (delta > threshold) {
                reportLag({
                  type: 'action_delay',
                  durationMs: delta,
                  url: window.location.href,
                  userAction: actionContext
                });
              }
            });
          });
        }, true);
      });
    }

    function setupFrameDropChecker() {
      let lastFrame = performance.now();
      function checkFrame() {
        const now = performance.now();
        const delta = Math.round(now - lastFrame);
        const frameThreshold = threshold <= 10 ? (16 + threshold) : threshold;
        if (delta > frameThreshold) {
          reportLag({
            type: 'frame_drop',
            durationMs: delta,
            url: window.location.href,
            userAction: (window as any).__perfAuditLastAction
          });
        }
        lastFrame = now;
        requestAnimationFrame(checkFrame);
      }
      requestAnimationFrame(checkFrame);
    }

    function setupSessionBackup() {
      window.addEventListener('beforeunload', () => {
        try {
          sessionStorage.setItem('__perfAuditLagsBackup', JSON.stringify((window as any).__perfAuditLags || []));
        } catch (e) {}
      });

      try {
        const saved = sessionStorage.getItem('__perfAuditLagsBackup');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            (window as any).__perfAuditLags.push(...parsed);
          }
          sessionStorage.removeItem('__perfAuditLagsBackup');
        }
      } catch (e) {}
    }

    function setupLongtaskObserver() {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            reportLag({
              type: 'longtask',
              durationMs: Math.round(entry.duration),
              startTime: performance.now() - entry.duration,
              startTimeRaw: entry.startTime,
              name: entry.name,
              entryType: entry.entryType,
              userAction: (window as any).__perfAuditLastAction
            });
          }
        });
        try {
          observer.observe({ type: 'longtask', buffered: true });
        } catch (err) {
          observer.observe({ entryTypes: ['longtask'] });
        }
      } catch (e) {
        console.error('PerformanceObserver longtask support failed:', e);
      }
    }

    function setupEventObserver() {
      try {
        const eventObserver = new PerformanceObserver((list) => {
          for (const entry of (list as any).getEntries()) {
            if (entry.duration > threshold) {
              reportLag({
                type: 'action_delay',
                durationMs: Math.round(entry.duration),
                url: window.location.href,
                userAction: {
                  type: entry.name,
                  targetSelector: getCssSelector((entry as any).target),
                  targetTagName: (entry as any).target?.tagName || '',
                  timestamp: entry.startTime
                }
              });
            }
          }
        });
        try {
          eventObserver.observe({ type: 'event', durationThreshold: threshold, buffered: true });
        } catch (err) {
          eventObserver.observe({ entryTypes: ['event'] });
        }
      } catch (e) {}
    }

    setupActionListeners();
    setupFrameDropChecker();
    setupSessionBackup();
    setupLongtaskObserver();
    setupEventObserver();
  };

  await page.addInitScript(code, thresholdMs);
  await page.evaluate(code, thresholdMs).catch(() => {});
}

export async function getCollectedLongTasks(page: Page): Promise<Array<any>> {
  return await page.evaluate(() => {
    return (window as any).__perfAuditLags || [];
  });
}
