import type { Page } from 'playwright';

export interface Violation {
  url: string;
  message: string;
  selector?: string;
}

export async function auditBrokenUI(page: Page, url: string, scope: 'public' | 'admin'): Promise<Violation[]> {
  const violations: Violation[] = [];

  const issues = await page.evaluate(() => {
    const findings: { type: string; tagName: string; className: string }[] = [];
    
    const isOverflowing = (el: Element) => {
      if (el === document.documentElement || el === document.body) return false;
      if (el.scrollWidth <= el.clientWidth) return false;
      const style = window.getComputedStyle(el);
      return !/scroll|auto/.test(style.overflow) && !/scroll|auto/.test(style.overflowX);
    };

    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
      if (isOverflowing(el)) {
        findings.push({
          type: 'overflow-clipping',
          tagName: el.tagName.toLowerCase(),
          className: el.className || ''
        });
      }
    });

    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (img.naturalWidth === 0) {
        findings.push({
          type: 'broken-image',
          tagName: img.tagName.toLowerCase(),
          className: img.className || ''
        });
      }
    });

    const isOverlapped = (el: Element) => {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0 || rect.top < 0 || rect.left < 0) return false;
      
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      if (cx > window.innerWidth || cy > window.innerHeight) return false;

      const topElement = document.elementFromPoint(cx, cy);
      return Boolean(topElement && topElement !== el && !el.contains(topElement));
    };

    const clickables = document.querySelectorAll('button, a, [role="button"]');
    clickables.forEach(el => {
      if (isOverlapped(el)) {
        findings.push({
          type: 'overlapped-element',
          tagName: el.tagName.toLowerCase(),
          className: el.className || ''
        });
      }
    });

    return findings;
  });

  issues.forEach(issue => {
    let message = '';
    if (issue.type === 'overflow-clipping') {
      message = 'Element has overflow clipping (`scrollWidth > clientWidth`).';
    } else if (issue.type === 'broken-image') {
      message = 'Broken image resource (`naturalWidth === 0`).';
    } else if (issue.type === 'overlapped-element') {
      message = 'Clickable element is overlapped or intercepted by another element.';
    }

    const classNameClean = (issue.className || '').trim().split(/\s+/).join('.');
    const selector = classNameClean ? `${issue.tagName}.${classNameClean}` : issue.tagName;

    violations.push({
      url,
      message,
      selector
    });
  });

  return violations;
}
