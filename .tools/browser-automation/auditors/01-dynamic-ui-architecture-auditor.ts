import type { Page } from 'playwright';

export interface Violation {
  url: string;
  message: string;
  selector?: string;
}

const ISSUE_MESSAGES: Record<string, string | ((extra?: string) => string)> = {
  'hardcoded-color': 'Design System: Raw/hardcoded CSS color in inline style.',
  'hardcoded-spacing': 'Design System: Hardcoded spacing/border-radius lacking spatial tokens.',
  'non-token-typography': 'Design System: Non-token typography styles used outside Typography component.',
  'missing-design-system-attr': 'Architecture: Interactive/structural element missing `data-ui` or `data-component` tracking.',
  'raw-image-element': 'Architecture: Raw `<img>` element used without MediaRenderer/Icon wrapper.',
  'small-touch-target': (extra) => `Observability: Clickable element touch target is smaller than 44x44px. ${extra || ''}`,
  'missing-aria': 'Observability: Custom interactive control lacking proper WAI-ARIA labels or content.',
  'hardcoded-motion': 'Theme/Motion: Custom CSS transition/animation defined outside token system.',
  'hardcoded-theme': 'Theme/Motion: Element uses hardcoded theme classes instead of context.',
  'hardcoded-i18n-string': (extra) => `i18n: Potential hardcoded text string found: "${extra || ''}" without data-i18n tracking.`
};

function formatViolationMessage(type: string, text?: string): string {
  const handler = ISSUE_MESSAGES[type];
  if (typeof handler === 'function') return handler(text);
  return handler || `Unknown issue: ${type}`;
}

function buildElementSelector(tagName: string, className: string): string {
  const cleanClass = (className || '').trim().split(/\s+/).filter(Boolean).join('.');
  return cleanClass ? `${tagName}.${cleanClass}` : tagName;
}

export async function auditUIArchitecture(page: Page, url: string, scope: 'public' | 'admin'): Promise<Violation[]> {
  const issues = await page.evaluate(() => {
    const findings: { type: string; tagName: string; className: string; text?: string }[] = [];

    const report = (type: string, el: Element, extraText?: string) => {
      findings.push({
        type,
        tagName: el.tagName.toLowerCase(),
        className: typeof el.className === 'string' ? el.className : '',
        text: extraText
      });
    };

    const IGNORED_TAG_RE = /^(script|style|link|meta|noscript|head|title)$/i;
    const TYPO_TAG_RE = /^(h[1-6]|p|span|a)$/i;
    const COLOR_RE = /(?:color|background|border).*:\s*(?:#|rgb|hsl)/i;
    const SPACING_RE = /(?:margin|padding|border-radius|box-shadow).*:\s*\d/i;
    const MOTION_RE = /(?:transition|animation).*:/i;
    const TYPO_STYLE_RE = /(?:font-size|font-family|line-height)/i;

    const checkStyleTokens = (el: Element, styleAttr: string) => {
      if (COLOR_RE.test(styleAttr)) report('hardcoded-color', el);
      if (SPACING_RE.test(styleAttr)) report('hardcoded-spacing', el);
      if (MOTION_RE.test(styleAttr)) report('hardcoded-motion', el);
      if (TYPO_STYLE_RE.test(styleAttr) && TYPO_TAG_RE.test(el.tagName) && !el.closest('[data-component="Typography"], [data-ui="Typography"]')) {
        report('non-token-typography', el);
      }
    };

    const isHardcodedTheme = (el: Element) => {
      const cls = el.className;
      return typeof cls === 'string' && /\b(?:light|dark)-mode\b/i.test(cls) && !el.hasAttribute('data-theme');
    };

    const checkElementTokensAndTheme = (el: Element) => {
      if (IGNORED_TAG_RE.test(el.tagName)) return;
      const styleAttr = el.getAttribute('style');
      if (styleAttr) checkStyleTokens(el, styleAttr);
      if (isHardcodedTheme(el)) report('hardcoded-theme', el);
    };

    const hasDesignSystemAttr = (el: Element) =>
      Boolean(el.hasAttribute('data-ui') || el.hasAttribute('data-component') || el.closest('[data-ui]') || el.closest('[data-component]'));

    const isRawImage = (el: Element) =>
      !el.hasAttribute('data-component') && !el.closest('[data-component="MediaRenderer"], [data-component="Icon"]');

    const checkArchitecture = () => {
      const interactiveSelectors = 'button, input, select, textarea, [role="button"], [role="searchbox"], [role="combobox"], [role="tab"], .card, .button';
      document.querySelectorAll(interactiveSelectors).forEach(el => {
        if (!hasDesignSystemAttr(el)) report('missing-design-system-attr', el);
      });
      document.querySelectorAll('img').forEach(el => {
        if (isRawImage(el)) report('raw-image-element', el);
      });
    };

    const isSmallTarget = (el: Element, rect: DOMRect) => {
      if (rect.width <= 0 || rect.height <= 0 || (rect.width >= 44 && rect.height >= 44)) return false;
      return el.tagName.toLowerCase() !== 'a' || getComputedStyle(el).display !== 'inline';
    };

    const isMissingLabel = (el: Element) => {
      const tag = el.tagName.toLowerCase();
      if (tag !== 'button' && tag !== 'input') return false;
      return !(el.hasAttribute('aria-label') || el.hasAttribute('aria-labelledby') || el.getAttribute('title') || Boolean(el.textContent?.trim()));
    };

    const checkObservability = () => {
      const clickableSelectors = 'button, a[href], [role="button"], [tabindex]:not([tabindex="-1"])';
      document.querySelectorAll(clickableSelectors).forEach(el => {
        const rect = el.getBoundingClientRect();
        if (isSmallTarget(el, rect)) {
          report('small-touch-target', el, `Size: ${Math.round(rect.width)}x${Math.round(rect.height)}`);
        }
        if (isMissingLabel(el)) report('missing-aria', el);
      });
    };

    const isHardcodedI18nParent = (parent: HTMLElement | null) => {
      if (!parent || /^(SCRIPT|STYLE|NOSCRIPT)$/i.test(parent.tagName)) return false;
      return !parent.closest('[data-i18n]') && !parent.hasAttribute('data-i18n-key') && !parent.hasAttribute('data-i18n');
    };

    const checkI18nText = () => {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
      let node: Node | null;
      while ((node = walker.nextNode())) {
        const text = node.textContent?.trim();
        if (!text || text.length <= 2 || !/^[A-Z][a-z]/.test(text)) continue;
        const parent = node.parentElement;
        if (isHardcodedI18nParent(parent)) {
          report('hardcoded-i18n-string', parent!, text.substring(0, 30));
        }
      }
    };

    document.querySelectorAll('*').forEach(checkElementTokensAndTheme);
    checkArchitecture();
    checkObservability();
    checkI18nText();

    return findings;
  });

  const uniqueIssues = new Map<string, Violation>();
  issues.forEach(issue => {
    const message = formatViolationMessage(issue.type, issue.text);
    const selector = buildElementSelector(issue.tagName, issue.className);
    const key = `${issue.type}-${selector}-${issue.text || ''}`;
    if (!uniqueIssues.has(key)) {
      uniqueIssues.set(key, { url, message, selector });
    }
  });

  return Array.from(uniqueIssues.values());
}
