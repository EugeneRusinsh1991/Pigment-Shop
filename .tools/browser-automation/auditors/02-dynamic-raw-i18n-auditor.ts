import type { Page } from 'playwright';

export interface Violation {
  url: string;
  message: string;
  selector?: string;
}

export async function auditRawI18n(page: Page, url: string, scope: 'public' | 'admin'): Promise<Violation[]> {
  const violations: Violation[] = [];

  // Evaluate on the page to find all elements with text
  const rawIssues = await page.evaluate(() => {
    const issues: { text: string; tagName: string; className: string }[] = [];
    
    // Helper to get all text nodes
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    let node;
    while ((node = walk.nextNode())) {
      const text = node.nodeValue?.trim();
      if (!text) continue;
      
      const parent = node.parentElement;
      if (!parent) continue;

      // Ignore script and style tags
      if (['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) continue;

      // Check for issues
      const isCamelCase = /^[a-z]+[A-Z][a-zA-Z]*$/.test(text) && text.length > 3;
      const isFallback = ['undefined', 'null', 'NaN', '[object Object]'].includes(text);
      const isPlaceholder = text.toLowerCase().includes('lorem ipsum') || text.includes('TODO') || text.includes('FIXME');

      const hasI18nAttr = Boolean(parent.closest('[data-i18n], [data-i18n-key], [data-translated]'));
      const isNumericOrSymbol = /^[0-9\s$€₽%.,\-+/*#@()]+$/.test(text);
      const isHardcodedText = !hasI18nAttr && !isNumericOrSymbol && text.length > 1 && /[a-zA-ZА-Яа-яЁё]/.test(text);

      if (isCamelCase || isFallback || isPlaceholder || isHardcodedText) {
        issues.push({
          type: isCamelCase ? 'camelCase' : isFallback ? 'fallback' : isPlaceholder ? 'placeholder' : 'hardcoded',
          text,
          tagName: parent.tagName.toLowerCase(),
          className: parent.className || ''
        });
      }
    }
    return issues;
  });

  rawIssues.forEach(issue => {
    let message = '';
    if (issue.type === 'camelCase') {
      message = `Found raw camelCase i18n key: "${issue.text}"`;
    } else if (issue.type === 'fallback') {
      message = `Found raw runtime fallback string: "${issue.text}"`;
    } else if (issue.type === 'placeholder') {
      message = `Found placeholder string: "${issue.text}"`;
    } else if (issue.type === 'hardcoded') {
      message = `Found hardcoded text without i18n key: "${issue.text}"`;
    }

    const selector = issue.className ? `${issue.tagName}.${issue.className.split(' ').join('.')}` : issue.tagName;

    violations.push({
      url,
      message,
      selector
    });
  });

  return violations;
}
