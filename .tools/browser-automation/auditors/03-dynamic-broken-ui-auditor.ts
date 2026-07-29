import type { Page } from 'playwright';

export interface Violation {
  url: string;
  message: string;
  selector?: string;
}

const BROKEN_UI_MESSAGES: Record<string, string> = {
  'overflow-clipping': 'Element has overflow clipping (`scrollWidth > clientWidth`).',
  'broken-image': 'Broken image resource (`naturalWidth === 0`).',
  'overlapped-element': 'Clickable element is overlapped or intercepted by another element.'
};

export async function auditBrokenUI(page: Page, url: string, scope: 'public' | 'admin'): Promise<Violation[]> {
  const issues = await page.evaluate(() => {
    const findings: { type: string; tagName: string; className: string }[] = [];
    
    const isOverflowing = (el: Element) => {
      if (el === document.documentElement || el === document.body) return false;
      if (el.scrollWidth <= el.clientWidth) return false;
      const style = window.getComputedStyle(el);
      return !/scroll|auto/.test(style.overflow) && !/scroll|auto/.test(style.overflowX);
    };

    const isInvalidRect = (rect: DOMRect) => rect.width === 0 || rect.height === 0 || rect.top < 0 || rect.left < 0;
    const isOutOfBounds = (cx: number, cy: number) => cx > window.innerWidth || cy > window.innerHeight;

    const isOverlapped = (el: Element) => {
      const rect = el.getBoundingClientRect();
      if (isInvalidRect(rect)) return false;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      if (isOutOfBounds(cx, cy)) return false;

      const topElement = document.elementFromPoint(cx, cy);
      return Boolean(topElement && topElement !== el && !el.contains(topElement));
    };

    document.querySelectorAll('*').forEach(el => {
      if (isOverflowing(el)) {
        findings.push({ type: 'overflow-clipping', tagName: el.tagName.toLowerCase(), className: el.className || '' });
      }
    });

    document.querySelectorAll('img').forEach(img => {
      if (img.naturalWidth === 0) {
        findings.push({ type: 'broken-image', tagName: img.tagName.toLowerCase(), className: img.className || '' });
      }
    });

    document.querySelectorAll('button, a, [role="button"]').forEach(el => {
      if (isOverlapped(el)) {
        findings.push({ type: 'overlapped-element', tagName: el.tagName.toLowerCase(), className: el.className || '' });
      }
    });

    return findings;
  });

  return issues.map(issue => {
    const cleanClass = (issue.className || '').trim().split(/\s+/).filter(Boolean).join('.');
    const selector = cleanClass ? `${issue.tagName}.${cleanClass}` : issue.tagName;
    return {
      url,
      message: BROKEN_UI_MESSAGES[issue.type] || `UI issue: ${issue.type}`,
      selector
    };
  });
}
