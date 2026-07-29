import type { Page } from 'playwright';

export interface Violation {
  url: string;
  message: string;
  selector?: string;
}

const MESSAGE_TEMPLATES: Record<string, string> = {
  camelCase: 'Found raw camelCase i18n key',
  fallback: 'Found raw runtime fallback string',
  placeholder: 'Found placeholder string',
  hardcoded: 'Found hardcoded text without i18n key'
};

export async function auditRawI18n(page: Page, url: string, scope: 'public' | 'admin'): Promise<Violation[]> {
  const rawIssues = await page.evaluate(() => {
    const issues: { type: string; text: string; tagName: string; className: string }[] = [];
    const FALLBACK_STRINGS = new Set(['undefined', 'null', 'NaN', '[object Object]']);
    const IGNORED_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT']);

    const isHardcodedCandidate = (parent: HTMLElement, text: string) => {
      if (parent.closest('[data-i18n], [data-i18n-key], [data-translated]')) return false;
      if (text.length <= 1 || !/[a-zA-ZА-Яа-яЁё]/.test(text)) return false;
      return !/^[0-9\s$€₽%.,\-+/*#@()]+$/.test(text);
    };

    const getType = (parent: HTMLElement, text: string): string | null => {
      if (FALLBACK_STRINGS.has(text)) return 'fallback';
      if (text.length > 3 && /^[a-z]+[A-Z][a-zA-Z]*$/.test(text)) return 'camelCase';
      if (/lorem ipsum|TODO|FIXME/i.test(text)) return 'placeholder';
      if (isHardcodedCandidate(parent, text)) return 'hardcoded';
      return null;
    };

    const classifyTextNode = (node: Node) => {
      const text = node.nodeValue?.trim();
      const parent = node.parentElement;
      if (!text || !parent || IGNORED_TAGS.has(parent.tagName)) return null;

      const type = getType(parent, text);
      return type ? { type, text, parent } : null;
    };

    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    let node: Node | null;
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

  return rawIssues.map(issue => {
    const prefix = MESSAGE_TEMPLATES[issue.type] || `Found ${issue.type}`;
    const cleanClass = (issue.className || '').trim().split(/\s+/).filter(Boolean).join('.');
    const selector = cleanClass ? `${issue.tagName}.${cleanClass}` : issue.tagName;
    return {
      url,
      message: `${prefix}: "${issue.text}"`,
      selector
    };
  });
}
