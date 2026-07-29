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
    const issues: { type: string; text: string; tagName: string; className: string }[] = [];
    
    const FALLBACK_STRINGS = new Set(['undefined', 'null', 'NaN', '[object Object]']);
    const IGNORED_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT']);

    const classifyTextNode = (node: Node) => {
      const text = node.nodeValue?.trim();
      if (!text) return null;
      const parent = node.parentElement;
      if (!parent || IGNORED_TAGS.has(parent.tagName)) return null;

      if (FALLBACK_STRINGS.has(text)) return { type: 'fallback', text, parent };
      if (/^[a-z]+[A-Z][a-zA-Z]*$/.test(text) && text.length > 3) return { type: 'camelCase', text, parent };
      if (/lorem ipsum|TODO|FIXME/i.test(text)) return { type: 'placeholder', text, parent };

      const hasI18nAttr = Boolean(parent.closest('[data-i18n], [data-i18n-key], [data-translated]'));
      if (!hasI18nAttr && text.length > 1 && /[a-zA-ZА-Яа-яЁё]/.test(text) && !/^[0-9\s$€₽%.,\-+/*#@()]+$/.test(text)) {
        return { type: 'hardcoded', text, parent };
      }
      return null;
    };

    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    let node;
    while ((node = walk.nextNode())) {
      const item = classifyTextNode(node);
      if (item) {
        issues.push({
          type: item.type,
          text: item.text,
          tagName: item.parent.tagName.toLowerCase(),
          className: item.parent.className || ''
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
