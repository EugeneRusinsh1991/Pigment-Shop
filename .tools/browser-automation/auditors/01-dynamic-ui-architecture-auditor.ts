import type { Page } from 'playwright';

export interface Violation {
  url: string;
  message: string;
  selector?: string;
}

export async function auditUIArchitecture(page: Page, url: string, scope: 'public' | 'admin'): Promise<Violation[]> {
  const violations: Violation[] = [];

  const issues = await page.evaluate(() => {
    const findings: { type: string; tagName: string; className: string }[] = [];
    
    // Check interactive elements missing data-ui or data-component
    const interactiveElements = document.querySelectorAll('button, input, a, select, textarea');
    interactiveElements.forEach(el => {
      if (!el.hasAttribute('data-ui') && !el.hasAttribute('data-component')) {
        findings.push({
          type: 'missing-design-system-attr',
          tagName: el.tagName.toLowerCase(),
          className: el.className || ''
        });
      }
    });

    // Check elements with inline styles
    const styledElements = document.querySelectorAll('[style]');
    styledElements.forEach(el => {
      // Sometimes elements are injected by third-party or browser extensions. Let's just flag what we see.
      findings.push({
        type: 'inline-style',
        tagName: el.tagName.toLowerCase(),
        className: el.className || ''
      });
    });

    // Check custom UI controls lacking ARIA
    const customControls = document.querySelectorAll('[role="button"], [role="checkbox"], [role="switch"]');
    customControls.forEach(el => {
      const hasLabel = el.hasAttribute('aria-label') || el.hasAttribute('aria-labelledby') || (el.textContent && el.textContent.trim().length > 0);
      if (!hasLabel) {
        findings.push({
          type: 'missing-aria',
          tagName: el.tagName.toLowerCase(),
          className: el.className || ''
        });
      }
    });

    return findings;
  });

  issues.forEach(issue => {
    let message = '';
    if (issue.type === 'missing-design-system-attr') {
      message = 'Interactive element missing `data-ui` or `data-component` attributes.';
    } else if (issue.type === 'inline-style') {
      message = 'Element rendered with inline `style` attribute.';
    } else if (issue.type === 'missing-aria') {
      message = 'Custom UI control lacking proper WAI-ARIA roles/accessibility labels.';
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
