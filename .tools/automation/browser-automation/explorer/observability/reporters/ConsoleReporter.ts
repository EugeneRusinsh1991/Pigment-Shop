import { Reporter } from '../ObservabilityManager';
import { ObservabilityEvent } from '../events';

const C = {
  g: (s: string) => `\x1b[32m${s}\x1b[0m`,
  b: (s: string) => `\x1b[34m${s}\x1b[0m`,
  w: (s: string) => `\x1b[37m${s}\x1b[0m`,
  y: (s: string) => `\x1b[33m${s}\x1b[0m`,
  p: (s: string) => `\x1b[35m${s}\x1b[0m`,
  r: (s: string) => `\x1b[31m${s}\x1b[0m`
};

const TAG_TYPE_MAP: Record<string, string> = { button: 'Button', a: 'Link', input: 'Input' };
const ROLE_TYPE_MAP: Record<string, string> = { button: 'Button', link: 'Link', checkbox: 'Checkbox', tab: 'Tab', menuitem: 'Menu Item' };
const SEMANTIC_TAGS = new Set(['button', 'a', 'input']);
const SEMANTIC_ROLES = new Set(['button', 'link', 'checkbox', 'tab', 'menuitem']);

export function formatReportUrl(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.pathname === '/' ? '/' : parsed.pathname;
  } catch {
    return url;
  }
}

export class ConsoleReporter implements Reporter {
  private lastPageUrl = '';

  private formatUrl(url: string): string {
    return formatReportUrl(url);
  }

  private resolveTagAndRole(el: any): { tag: string; role: string } {
    const tag = el.type ? String(el.type).toLowerCase() : (el.tagName ? String(el.tagName).toLowerCase() : '');
    const role = el.role ? String(el.role).toLowerCase() : '';
    return { tag, role };
  }

  private isSemanticType(tag: string, role: string, el: any): boolean {
    return SEMANTIC_TAGS.has(tag) || SEMANTIC_ROLES.has(role) || el.type === 'checkbox' || Boolean(el.testId) || Boolean(el.ariaLabel);
  }

  private hasDirectIdentifier(el: any, text: string): boolean {
    return Boolean(text || el.ariaLabel || el.testId || el.id || el.href);
  }

  private hasIdentifiableContent(el: any): boolean {
    const text = (el.text || '').trim();
    if (this.hasDirectIdentifier(el, text)) return true;
    return Boolean(el.selector && !el.selector.startsWith('/'));
  }

  private isSemanticElement(el: any): boolean {
    if (!el) return false;
    const { tag, role } = this.resolveTagAndRole(el);
    if (!this.isSemanticType(tag, role, el)) return false;
    return this.hasIdentifiableContent(el);
  }

  private resolveMappedType(tag: string, role: string, el: any): string | null {
    if (TAG_TYPE_MAP[tag]) return TAG_TYPE_MAP[tag];
    if (ROLE_TYPE_MAP[role]) return ROLE_TYPE_MAP[role];
    if (el.type === 'checkbox') return 'Checkbox';
    if (el.testId || el.ariaLabel) return 'Interactive';
    return null;
  }

  private resolveSemanticType(tag: string, role: string, el: any): string {
    const mapped = this.resolveMappedType(tag, role, el);
    if (mapped) return mapped;
    return tag ? tag.charAt(0).toUpperCase() + tag.slice(1) : 'Element';
  }

  private getHrefPath(href: string): string {
    try { return new URL(href, 'http://dummy').pathname; }
    catch { return href; }
  }

  private resolvePrimaryLabel(el: any, text: string): string | null {
    if (text) return `"${text}"`;
    if (el.ariaLabel) return `[${el.ariaLabel}]`;
    if (el.testId) return `<${el.testId}>`;
    if (el.id) return `#${el.id}`;
    if (el.href) return `-> ${this.getHrefPath(el.href)}`;
    return null;
  }

  private resolveDescription(el: any): string {
    const label = this.resolvePrimaryLabel(el, el.text?.trim() || '');
    if (label) return label;
    
    const selector = el.selector || 'Unknown';
    return !selector.includes('/') ? selector : `at ${selector}`;
  }

  private formatElement(el: any): string {
    const tag = el.type ? String(el.type).toLowerCase() : '';
    const role = el.role ? String(el.role).toLowerCase() : '';
    const semanticType = this.resolveSemanticType(tag, role, el);
    let description = this.resolveDescription(el);
    if (description.length > 35) description = description.substring(0, 32) + '...';
    return `${semanticType} ${description}`.trim();
  }

  private checkNewPage(url: string, isBack: boolean = false) {
    const formatted = this.formatUrl(url);
    if (formatted !== this.lastPageUrl && formatted !== '') {
      this.lastPageUrl = formatted;
      console.log();
      if (isBack) {
        console.log(C.b(`👈 RETURNED TO ${formatted}`));
      } else {
        console.log(C.g(`👉 NAVIGATED TO ${formatted}`));
      }
    }
  }

  private formatTiming(ms: number | undefined): string {
    if (ms === undefined || ms === 0) return '';
    return `(${ms}ms)`;
  }

  private handleNavigation(event: any): void {
    if (event.success) {
      this.checkNewPage(event.destinationUrl, event.isBack);
    } else {
      console.log(`    ${C.r('🔴 ERROR')}   Failed to navigate to ${this.formatUrl(event.destinationUrl)}`);
    }
  }

  private handleAction(event: any, timing: string): void {
    if (!this.isSemanticElement(event.element)) return;
    if ('pageUrl' in event) this.checkNewPage(event.pageUrl);
    const name = this.formatElement(event.element);
    if (event.result === 'SUCCESS') {
      console.log(`    ${C.w('⚪ CLICK')}   ${name.padEnd(45)} ${timing}`.trimEnd());
    } else {
      console.log(`    ${C.r('🔴 FAILED')}  ${name.padEnd(45)} ${event.result}`.trimEnd());
    }
  }

  private handlePick(event: any): void {
    if (!this.isSemanticElement(event.element)) return;
    if ('pageUrl' in event) this.checkNewPage(event.pageUrl);
    console.log(`    ${C.w('⚪ PICK')}    ${this.formatElement(event.element).padEnd(45)}`.trimEnd());
  }

  private handleSummary(event: any): void {
    const m = Math.floor(event.totalRuntimeMs / 60000);
    const s = Math.floor((event.totalRuntimeMs % 60000) / 1000);
    const timeStr = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    console.log(`\n======================================`);
    console.log(`Automation Complete`);
    console.log(`Pages ............ ${event.pagesVisited}`);
    console.log(`Clicks ........... ${event.clicks}`);
    console.log(`Navigations ...... ${event.successfulNavigations}`);
    console.log(`Skips ............ ${event.skipped}`);
    console.log(`Errors ........... ${event.errors}`);
    console.log(`Runtime .......... ${timeStr}`);
    console.log(`======================================\n`);
  }

  private readonly eventHandlers: Record<string, (e: any, t: string) => void> = {
    NAVIGATION: (e) => this.handleNavigation(e),
    ACTION: (e, t) => this.handleAction(e, t),
    PICK: (e) => this.handlePick(e),
    SUMMARY: (e) => this.handleSummary(e),
    ERROR: (e) => console.log(`    ${C.r('🔴 ERROR')}   ${e.message}`),
    WARNING: (e) => console.log(`    ${C.y('🟡 WARN')}    ${e.message}`),
    SKIP: () => {},
    SCAN: () => {}
  };

  report(event: ObservabilityEvent): void {
    const timing = 'durationMs' in event ? this.formatTiming(event.durationMs) : '';
    const handler = this.eventHandlers[event.type];
    if (handler) handler(event, timing);
  }
}
