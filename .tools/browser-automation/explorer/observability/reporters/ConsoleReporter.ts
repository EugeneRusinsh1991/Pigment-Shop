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

  private formatElement(el: any): string {
    let semanticType = 'Element';
    const tag = el.type ? String(el.type).toLowerCase() : '';
    const role = el.role ? String(el.role).toLowerCase() : '';
    
    if (tag === 'button' || role === 'button') semanticType = 'Button';
    else if (tag === 'a' || role === 'link') semanticType = 'Link';
    else if (tag === 'input') semanticType = 'Input';
    else if (role === 'checkbox' || el.type === 'checkbox') semanticType = 'Checkbox';
    else if (role === 'tab') semanticType = 'Tab';
    else if (role === 'menuitem') semanticType = 'Menu Item';
    else if (el.testId || el.ariaLabel) semanticType = 'Interactive';
    else if (tag) semanticType = tag.charAt(0).toUpperCase() + tag.slice(1);

    let description = '';
    if (el.text && el.text.trim()) {
      description = `"${el.text.trim()}"`;
    } else if (el.ariaLabel) {
      description = `[${el.ariaLabel}]`;
    } else if (el.testId) {
      description = `<${el.testId}>`;
    } else if (el.id) {
      description = `#${el.id}`;
    } else if (el.href) {
      try {
        const parsed = new URL(el.href, 'http://dummy').pathname;
        description = `-> ${parsed}`;
      } catch {
        description = `-> ${el.href}`;
      }
    } else if (el.selector && !el.selector.includes('/')) {
      description = el.selector;
    } else {
      description = `at ${el.selector || 'Unknown'}`;
    }

    if (description.length > 35) {
      description = description.substring(0, 32) + '...';
    }

    return `${semanticType} ${description}`.trim();
  }

  private checkNewPage(url: string, isBack: boolean = false) {
    const formatted = this.formatUrl(url);
    if (formatted !== this.lastPageUrl && formatted !== '') {
      this.lastPageUrl = formatted;
      console.log();
      if (isBack) {
        console.log(C.b(`👈 RETURNED TO  ${formatted}`));
      } else {
        console.log(C.g(`👉 NAVIGATED TO ${formatted}`));
      }
      console.log(C.w(`─`.repeat(50)));
    }
  }

  private formatTiming(ms: number | undefined): string {
    if (ms === undefined || ms === 0) return '';
    return `(${ms}ms)`;
  }

  report(event: ObservabilityEvent): void {
    const timing = 'durationMs' in event ? this.formatTiming(event.durationMs) : '';

    switch (event.type) {
      case 'NAVIGATION':
        if (event.success) {
          this.checkNewPage(event.destinationUrl, event.isBack);
        } else {
          console.log(`   ${C.r('🔴 ERROR')}   Failed to navigate to ${this.formatUrl(event.destinationUrl)}`);
        }
        break;

      case 'ACTION':
        if ('pageUrl' in event) this.checkNewPage(event.pageUrl);
        const name = this.formatElement(event.element);
        if (event.result === 'SUCCESS') {
          console.log(`   ${C.w('⚪ CLICK')}   ${name.padEnd(45)} ${timing}`);
        } else {
          console.log(`   ${C.r('🔴 FAILED')}  ${name.padEnd(45)} ${event.result}`);
        }
        break;

      case 'PICK':
        if ('pageUrl' in event) this.checkNewPage(event.pageUrl);
        console.log(`   ${C.w('⚪ PICK')}    ${this.formatElement(event.element).padEnd(45)}`);
        break;

      case 'SKIP':
      case 'SCAN':
        // Suppressed in console to maintain focus on actual exploration progress.
        break;

      case 'SUMMARY':
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
        break;

      case 'ERROR':
        console.log(`   ${C.r('🔴 ERROR')}   ${event.message}`);
        break;

      case 'WARNING':
        console.log(`   ${C.y('🟡 WARN')}    ${event.message}`);
        break;
    }
  }
}
