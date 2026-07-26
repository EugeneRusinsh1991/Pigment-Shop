import type { Page } from 'playwright';

export interface Violation {
  url: string;
  message: string;
  selector?: string;
}

export async function auditUIArchitecture(page: Page, url: string, scope: 'public' | 'admin'): Promise<Violation[]> {
  const violations: Violation[] = [];

  const issues = await page.evaluate(() => {
    const findings: { type: string; tagName: string; className: string; text?: string }[] = [];

    // Helper for reporting
    const report = (type: string, el: Element, extraText?: string) => {
      findings.push({
        type,
        tagName: el.tagName.toLowerCase(),
        className: (typeof el.className === 'string' ? el.className : '') || '',
        text: extraText
      });
    };

    // 1. Design System Token Compliance
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
      if (el.tagName.match(/^(script|style|link|meta|noscript|head|title)$/i)) {
        return;
      }
      
      const styleAttr = el.getAttribute('style');
      if (styleAttr) {
        // Detect raw/hardcoded CSS colors in inline styles
        if (/(?:color|background|border).*:\s*(?:#|rgb|hsl)/i.test(styleAttr)) {
          report('hardcoded-color', el);
        }
        // Detect hardcoded spacing
        if (/(?:margin|padding|border-radius|box-shadow).*:\s*\d/i.test(styleAttr)) {
          report('hardcoded-spacing', el);
        }
      }

      // Detect non-token typography
      if (el.tagName.match(/^(h[1-6]|p|span|a)$/i) && !el.closest('[data-component="Typography"]') && !el.closest('[data-ui="Typography"]')) {
         if (styleAttr && /(?:font-size|font-family|line-height)/i.test(styleAttr)) {
            report('non-token-typography', el);
         }
      }
    });

    // 2. Component Architecture & Tracking
    const interactiveSelectors = 'button, input, select, textarea, [role="button"], [role="searchbox"], [role="combobox"], [role="tab"], .card, .button';
    const interactiveElements = document.querySelectorAll(interactiveSelectors);
    interactiveElements.forEach(el => {
      if (!el.hasAttribute('data-ui') && !el.hasAttribute('data-component') && !el.closest('[data-ui]') && !el.closest('[data-component]')) {
        report('missing-design-system-attr', el);
      }
    });

    const imgElements = document.querySelectorAll('img');
    imgElements.forEach(el => {
      if (!el.closest('[data-component="MediaRenderer"]') && !el.closest('[data-component="Icon"]') && !el.hasAttribute('data-component')) {
        report('raw-image-element', el);
      }
    });

    // 3. Interactive & State Observability
    const clickableSelectors = 'button, a[href], [role="button"], [tabindex]:not([tabindex="-1"])';
    const clickableElements = document.querySelectorAll(clickableSelectors);
    clickableElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      // Check touch target size
      if (rect.width > 0 && rect.height > 0) {
        if (rect.width < 44 || rect.height < 44) {
          // Exception for inline links inside text
          if (el.tagName.toLowerCase() !== 'a' || getComputedStyle(el).display !== 'inline') {
            report('small-touch-target', el, `Size: ${Math.round(rect.width)}x${Math.round(rect.height)}`);
          }
        }
      }
      
      if (el.tagName.toLowerCase() === 'button' || el.tagName.toLowerCase() === 'input') {
        const hasLabel = el.hasAttribute('aria-label') || el.hasAttribute('aria-labelledby') || el.getAttribute('title') || (el.textContent && el.textContent.trim().length > 0);
        if (!hasLabel) {
           report('missing-aria', el);
        }
      }
    });

    // 4. Theme & Motion Alignment
    allElements.forEach(el => {
      const styleAttr = el.getAttribute('style');
      if (styleAttr && /(?:transition|animation).*:/i.test(styleAttr)) {
        report('hardcoded-motion', el);
      }
      
      const className = el.className;
      if (typeof className === 'string') {
        if (/\b(?:light|dark)-mode\b/i.test(className) && !el.hasAttribute('data-theme')) {
           report('hardcoded-theme', el);
        }
      }
    });

    // 5. Hardcoded i18n Strings
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    let node;
    while ((node = walker.nextNode())) {
      const text = node.textContent?.trim();
      if (text && text.length > 2 && /^[A-Z][a-z]/.test(text)) {
        const parent = node.parentElement;
        if (parent && !parent.tagName.match(/^(SCRIPT|STYLE|NOSCRIPT)$/i)) {
          if (!parent.closest('[data-i18n]') && !parent.hasAttribute('data-i18n-key') && !parent.hasAttribute('data-i18n')) {
             report('hardcoded-i18n-string', parent, text.substring(0, 30));
          }
        }
      }
    }

    return findings;
  });

  const uniqueIssues = new Map<string, Violation>();
  
  issues.forEach(issue => {
    let message = '';
    switch (issue.type) {
      case 'hardcoded-color': message = 'Design System: Raw/hardcoded CSS color in inline style.'; break;
      case 'hardcoded-spacing': message = 'Design System: Hardcoded spacing/border-radius lacking spatial tokens.'; break;
      case 'non-token-typography': message = 'Design System: Non-token typography styles used outside Typography component.'; break;
      case 'missing-design-system-attr': message = 'Architecture: Interactive/structural element missing `data-ui` or `data-component` tracking.'; break;
      case 'raw-image-element': message = 'Architecture: Raw `<img>` element used without MediaRenderer/Icon wrapper.'; break;
      case 'small-touch-target': message = `Observability: Clickable element touch target is smaller than 44x44px. ${issue.text}`; break;
      case 'missing-aria': message = 'Observability: Custom interactive control lacking proper WAI-ARIA labels or content.'; break;
      case 'hardcoded-motion': message = 'Theme/Motion: Custom CSS transition/animation defined outside token system.'; break;
      case 'hardcoded-theme': message = 'Theme/Motion: Element uses hardcoded theme classes instead of context.'; break;
      case 'hardcoded-i18n-string': message = `i18n: Potential hardcoded text string found: "${issue.text}" without data-i18n tracking.`; break;
      default: message = `Unknown issue: ${issue.type}`;
    }

    const classNameClean = (issue.className || '').trim().split(/\s+/).join('.');
    const selector = classNameClean ? `${issue.tagName}.${classNameClean}` : issue.tagName;
    
    const key = `${issue.type}-${selector}-${issue.text || ''}`;
    if (!uniqueIssues.has(key)) {
      uniqueIssues.set(key, { url, message, selector });
    }
  });

  return Array.from(uniqueIssues.values());
}
