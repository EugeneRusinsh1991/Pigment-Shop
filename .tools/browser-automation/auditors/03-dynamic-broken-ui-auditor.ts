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
    
    // Check text overflow clipping (scrollWidth > clientWidth)
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
      // Exclude body and html to avoid false positives for page-level scroll
      if (el === document.documentElement || el === document.body) return;
      
      if (el.scrollWidth > el.clientWidth) {
        const style = window.getComputedStyle(el);
        if (style.overflow !== 'scroll' && style.overflowX !== 'scroll' && style.overflow !== 'auto' && style.overflowX !== 'auto') {
          findings.push({
            type: 'overflow-clipping',
            tagName: el.tagName.toLowerCase(),
            className: el.className || ''
          });
        }
      }
    });

    // Broken images (404 images or naturalWidth === 0)
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

    // Check for click interception/overlapping using elementFromPoint
    const clickables = document.querySelectorAll('button, a, [role="button"]');
    clickables.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0 || rect.top < 0 || rect.left < 0) return;
      
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      
      // If the coordinate is outside viewport, don't test
      if (cx > window.innerWidth || cy > window.innerHeight) return;

      const topElement = document.elementFromPoint(cx, cy);
      
      if (topElement && topElement !== el && !el.contains(topElement)) {
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
