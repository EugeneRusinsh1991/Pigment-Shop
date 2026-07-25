import { IWebPage, IWebElement } from './driver/DriverInterfaces';
import { ElementMetadata } from './observability/events';

export interface ScannedElement {
  index: number;
  identifier: string;
  locator: IWebElement;
  metadata: ElementMetadata;
}

export const SELECTABLE_ELEMENTS_QUERY =
  'button, a, input, select, textarea, [role="button"], [role="link"], [role="tab"], [role="menuitem"], [role="checkbox"], [role="radio"], [data-testid], [tabindex], [class*="r-cursor"], [style*="cursor"]';

/**
 * In-browser evaluation function for checkDomHash.
 * Must be self-contained for serialization into browser context.
 */
function evaluateDomHash(sel: string): string {
  // @ts-ignore
  if (typeof globalThis.__name === 'undefined') {
    // @ts-ignore
    globalThis.__name = (func: any, name: string) => func;
  }

  function isNodeVisible(el: Element): boolean {
    const style = window.getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return false;
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  const els = Array.from(document.querySelectorAll(sel));
  let textLen = 0;
  let visibleCount = 0;
  for (const el of els) {
    if (isNodeVisible(el)) {
      visibleCount++;
      textLen += (el.textContent || '').length;
    }
  }
  return `${visibleCount}-${textLen}`;
}

/**
 * In-browser evaluation function for scanPage.
 * Extracts element metadata and identifier in a single pass.
 */
function evaluateScanPage(sel: string): { index: number; identifier: string; metadata: any }[] {
  // @ts-ignore
  if (typeof globalThis.__name === 'undefined') {
    // @ts-ignore
    globalThis.__name = (func: any, name: string) => func;
  }

  function isVisible(el: Element): boolean {
    const style = window.getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return false;
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  function extractRawText(el: Element): string {
    const directText = Array.from(el.childNodes)
      .find(n => n.nodeType === Node.TEXT_NODE && n.textContent?.trim())
      ?.textContent?.trim();
    if (directText) return directText;

    const firstChild = el.firstElementChild;
    if (firstChild && !firstChild.children.length) {
      return firstChild.textContent?.trim() || '';
    }
    return el.textContent?.trim() || '';
  }

  function getCleanText(el: Element): string {
    const text = extractRawText(el).replace(/\s+/g, ' ').trim();
    return text.length > 18 ? `${text.substring(0, 18)}...` : text;
  }

  function getElementIndex(current: Element): number {
    let index = 1;
    let sibling = current.previousElementSibling;
    while (sibling) {
      if (sibling.tagName === current.tagName) index++;
      sibling = sibling.previousElementSibling;
    }
    return index;
  }

  function getElementPath(el: Element): string {
    let path = '';
    let current: Element | null = el;
    while (current && current.tagName !== 'BODY' && current.tagName !== 'HTML') {
      const index = getElementIndex(current);
      path = `/${current.tagName.toLowerCase()}[${index}]` + path;
      current = current.parentElement;
    }
    return path || '/unknown';
  }

  function getFallbackIdentifier(tagName: string, role: string, el: Element): string {
    const hasMedia = !!el.querySelector('svg, img');
    if (hasMedia) return `icon|Icon Button`;
    
    const isBtn = tagName === 'button' || role === 'button';
    if (isBtn) return `btn|Pressable`;
    
    const isLink = tagName === 'a' || role === 'link';
    if (isLink) return `link|Link`;

    return `card|Card|${getElementPath(el)}`;
  }

  function getDirectIdentifier(el: Element): string | null {
    const testId = el.getAttribute('data-testid');
    if (testId) return `testid|${testId}`;

    const ariaLabel = el.getAttribute('aria-label') || el.getAttribute('title');
    if (ariaLabel) return `label|${ariaLabel}`;

    const href = el.getAttribute('href');
    const cleanText = getCleanText(el);
    if (href) return ['link', href, cleanText].filter(Boolean).join('|');

    return null;
  }

  function getTagPrefix(tagName: string, role: string): string {
    if (tagName === 'a' || role === 'link') return 'link';
    if (tagName === 'input') return 'input';
    return 'btn';
  }

  function resolveIdentifier(el: Element): string {
    const directId = getDirectIdentifier(el);
    if (directId) return directId;

    const cleanText = getCleanText(el);
    const role = el.getAttribute('role') || '';
    const tagName = el.tagName.toLowerCase();

    if (cleanText) {
      return `${getTagPrefix(tagName, role)}|${cleanText}`;
    }

    return getFallbackIdentifier(tagName, role, el);
  }

  function isIgnoredElement(el: Element): boolean {
    const idStr = `${el.id || ''} ${el.getAttribute('data-testid') || ''} ${el.getAttribute('aria-label') || ''}`.toLowerCase();
    return idStr.includes('debug') || idStr.includes('manual-browser-inspector') || idStr.includes('page-back-button') || idStr.includes('go-back') || idStr.includes('admin-exit') || idStr.includes('admin-logout');
  }

  const els = Array.from(document.querySelectorAll(sel));
  const extracted: { index: number; identifier: string; metadata: any }[] = [];
  
  els.forEach((el, idx) => {
    if (!isVisible(el) || isIgnoredElement(el)) return;
    
    let identifier = 'detached-element';
    let metadata = {
      type: el.tagName.toLowerCase(),
      text: getCleanText(el),
      role: el.getAttribute('role') || '',
      testId: el.getAttribute('data-testid') || undefined,
      ariaLabel: el.getAttribute('aria-label') || el.getAttribute('title') || undefined,
      selector: getElementPath(el),
      id: el.id || undefined,
      href: el.getAttribute('href') || undefined
    };

    try {
      identifier = resolveIdentifier(el);
    } catch {
      // Fallback to detached if parsing fails
    }
    
    extracted.push({ index: idx, identifier, metadata });
  });
  
  return extracted;
}

export class ElementScanner {
  async checkDomHash(page: IWebPage): Promise<string> {
    return page.evaluate(evaluateDomHash, SELECTABLE_ELEMENTS_QUERY).catch((err) => {
      console.error('--- BROWSER AUTOMATION EXCEPTION (checkDomHash) ---', err.name, err.message);
      throw err;
    });
  }

  async scanPage(page: IWebPage): Promise<ScannedElement[]> {
    const results = await page.evaluate(evaluateScanPage, SELECTABLE_ELEMENTS_QUERY).catch((err) => {
      console.error('--- BROWSER AUTOMATION EXCEPTION (scanPage) ---', err.name, err.message);
      throw err;
    });

    const pageLocators = page.locator(SELECTABLE_ELEMENTS_QUERY);
    return results.map(r => ({
      index: r.index,
      identifier: r.identifier,
      locator: pageLocators.nth(r.index),
      metadata: r.metadata as ElementMetadata
    }));
  }

  // Legacy methods strictly for backward compatibility
  async findInteractiveElements(page: IWebPage): Promise<IWebElement[]> {
    const scanned = await this.scanPage(page);
    return scanned.map(s => s.locator);
  }

  async getElementIdentifier(locator: IWebElement): Promise<string> {
    // Legacy fallback interface
    return 'detached-element';
  }
}
