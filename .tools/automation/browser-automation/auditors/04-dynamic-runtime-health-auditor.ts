import type { Page } from 'playwright';

export interface Violation {
  url: string;
  message: string;
  selector?: string;
}

export class RuntimeHealthAuditor {
  private violations: Violation[] = [];
  private page: Page;
  private scope: 'public' | 'admin';
  private sessionId?: string;

  constructor(page: Page, scope: 'public' | 'admin', sessionId?: string) {
    this.page = page;
    this.scope = scope;
    this.sessionId = sessionId;
  }

  public getSessionId(): string | undefined {
    return this.sessionId;
  }

  public start() {
    // Capture console errors
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        this.violations.push({
          url: this.page.url(),
          message: `Browser console.error: ${msg.text()}`
        });
      }
    });

    // Capture unhandled page errors (e.g. unhandled rejections or uncaught exceptions)
    this.page.on('pageerror', exception => {
      this.violations.push({
        url: this.page.url(),
        message: `Unhandled exception: ${exception.message}`
      });
    });

    // Capture failed network requests (HTTP 4xx and 5xx)
    this.page.on('response', response => {
      const status = response.status();
      // Only capture errors, exclude redirects or successful responses
      if (status >= 400) {
        this.violations.push({
          url: this.page.url(),
          message: `Network failure (${status}): ${response.request().method()} ${response.url()}`
        });
      }
    });
  }

  public getViolations(): Violation[] {
    return this.violations;
  }
}
