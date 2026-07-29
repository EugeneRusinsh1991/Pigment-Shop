import { Page, Locator } from 'playwright';

export interface ElementGroupInfo {
  groupType: string;
  indices: number[];
}

function groupClassifications(classifications: string[], locatorCount: number): ElementGroupInfo[] {
  const groupMap: Record<string, number[]> = {};
  classifications.forEach((groupType, index) => {
    if (index < locatorCount) {
      if (!groupMap[groupType]) groupMap[groupType] = [];
      groupMap[groupType].push(index);
    }
  });

  return Object.entries(groupMap).map(([groupType, indices]) => ({
    groupType,
    indices
  }));
}

export class ElementGroupDetector {
  static async detectGroups(page: Page, locators: Locator[]): Promise<ElementGroupInfo[]> {
    if (locators.length === 0) return [];

    const classifications: string[] = await page.evaluate(() => {
      // @ts-ignore
      if (typeof globalThis.__name === 'undefined') {
        // @ts-ignore
        globalThis.__name = (func: any, name: string) => func;
      }

      const selector = 'button, a, input, select, textarea, [role="button"], [role="link"], [role="tab"], [role="menuitem"], [role="checkbox"], [role="radio"], [data-testid], [tabindex], [class*="r-cursor"], [style*="cursor"]';
      const nodes = Array.from(document.querySelectorAll(selector)).filter(el => {
        const style = window.getComputedStyle(el);
        return style.display !== 'none' && style.visibility !== 'hidden';
      });

      const closestRules: [string, string][] = [
        ['nav, [role="navigation"], header, [id*="header"], [class*="header"]', 'navigationGroup'],
        ['[aria-label*="pagination"], .pagination', 'paginationGroup'],
        ['[role="region"][aria-label*="carousel"], .carousel, .slider, .swiper', 'carouselGroup'],
        ['aside, [role="complementary"], [data-testid*="filter"], .sidebar, .filter', 'filterGroup'],
        ['[role="grid"], .grid, [class*="grid"], [class*="card"]', 'gridGroup'],
        ['ul, ol, li, [role="list"], [role="listitem"]', 'listGroup']
      ];

      const checkInputGroup = (type: string, role: string, testId: string): string | null => {
        if (type === 'checkbox' || role === 'checkbox' || testId.includes('checkbox')) return 'checkboxGroup';
        return (type === 'radio' || role === 'radio') ? 'radioGroup' : null;
      };

      const checkClosestGroup = (el: Element): string | null => {
        const rule = closestRules.find(([sel]) => el.closest(sel));
        return rule ? rule[1] : null;
      };

      const isPaginationAttr = (label: string, id: string) => label.includes('page') || id.includes('page');
      const isButtonAttr = (tag: string, r: string, id: string) => tag === 'button' || r === 'button' || id.includes('btn') || id.includes('button');

      const checkFallbackGroup = (tagName: string, role: string, testId: string, ariaLabel: string): string | null => {
        if (isPaginationAttr(ariaLabel, testId)) return 'paginationGroup';
        if (isButtonAttr(tagName, role, testId)) return 'buttonGroup';
        return null;
      };

      const checkCriticalGroup = (testId: string, ariaLabel: string, href: string, text: string): string | null => {
        const str = `${testId} ${ariaLabel} ${href} ${text}`.toLowerCase();
        if (str.includes('admin') || str.includes('user-menu') || str.includes('profile')) return 'criticalGroup';
        return null;
      };

      const attr = (el: Element, name: string) => (el.getAttribute(name) || '').toLowerCase();

      const getNodeAttrs = (el: Element) => ({
        type: attr(el, 'type'),
        role: attr(el, 'role'),
        testId: attr(el, 'data-testid'),
        ariaLabel: attr(el, 'aria-label'),
        href: attr(el, 'href'),
        tagName: el.tagName.toLowerCase(),
        text: el.textContent || ''
      });

      const classifyNode = (el: Element): string => {
        const { type, role, testId, ariaLabel, href, tagName, text } = getNodeAttrs(el);
        const critical = checkCriticalGroup(testId, ariaLabel, href, text);
        if (critical) return critical;
        
        const group = checkInputGroup(type, role, testId) || checkClosestGroup(el);
        if (group) return group;
        return checkFallbackGroup(tagName, role, testId, ariaLabel) || 'defaultGroup';
      };

      return nodes.map(classifyNode);
    }).catch(() => []);

    if (!classifications || classifications.length === 0) {
      return [{ groupType: 'defaultGroup', indices: locators.map((_, i) => i) }];
    }

    return groupClassifications(classifications, locators.length);
  }
}
