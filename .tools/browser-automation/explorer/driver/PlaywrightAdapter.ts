import { Browser, BrowserContext, Page, Locator } from 'playwright';
import { IWebBrowser, IWebBrowserContext, IWebPage, IWebElement } from './DriverInterfaces';
import { ElementHoverInfo, extractElementHoverInfo } from '../../helpers/hoverInfoHelper';

export class PlaywrightElement implements IWebElement {
  constructor(public locatorInstance: Locator, public parentPage?: PlaywrightPage) {}

  async click(options?: { force?: boolean }): Promise<void> {
    if (this.parentPage) {
      try {
        const info = await this.locatorInstance.evaluate(extractElementHoverInfo);
        if (info) {
          this.parentPage.setLastHoverInfo(info);
        }
      } catch {
        // Non-blocking: fail gracefully if element extraction fails
      }
    }
    await this.locatorInstance.click(options);
  }

  async fill(value: string): Promise<void> {
    await this.locatorInstance.fill(value);
  }

  async isVisible(): Promise<boolean> {
    return await this.locatorInstance.isVisible();
  }

  async getAttribute(name: string): Promise<string | null> {
    return await this.locatorInstance.getAttribute(name);
  }

  async evaluate<R, Arg>(pageFunction: (node: any, arg: Arg) => R, arg?: Arg): Promise<R>;
  async evaluate<R>(pageFunction: (node: any) => R): Promise<R>;
  async evaluate<R, Arg>(pageFunction: any, arg?: Arg): Promise<R> {
    if (arg !== undefined) {
      return await this.locatorInstance.evaluate(pageFunction, arg);
    }
    return await this.locatorInstance.evaluate(pageFunction);
  }

  async scrollIntoViewIfNeeded(options?: any): Promise<void> {
    await this.locatorInstance.scrollIntoViewIfNeeded(options);
  }

  nth(index: number): IWebElement {
    return new PlaywrightElement(this.locatorInstance.nth(index), this.parentPage);
  }

  first(): IWebElement {
    return new PlaywrightElement(this.locatorInstance.first(), this.parentPage);
  }

  async count(): Promise<number> {
    return await this.locatorInstance.count();
  }

  locator(selector: string): IWebElement {
    return new PlaywrightElement(this.locatorInstance.locator(selector), this.parentPage);
  }
}

export class PlaywrightPage implements IWebPage {
  public lastHoverInfo: ElementHoverInfo | null = null;

  constructor(public page: Page) {}

  getLastHoverInfo(): ElementHoverInfo | null {
    return this.lastHoverInfo;
  }

  setLastHoverInfo(info: ElementHoverInfo | null): void {
    this.lastHoverInfo = info;
  }

  clearHoverInfo(): void {
    this.lastHoverInfo = null;
  }

  url(): string {
    return this.page.url();
  }

  async goBack(): Promise<void> {
    await this.page.goBack();
  }

  async waitForTimeout(timeout: number): Promise<void> {
    await this.page.waitForTimeout(timeout);
  }

  async screenshot(options?: { path?: string; fullPage?: boolean }): Promise<Buffer> {
    return await this.page.screenshot(options);
  }

  locator(selector: string): IWebElement {
    return new PlaywrightElement(this.page.locator(selector), this);
  }

  async evaluate<R, Arg>(pageFunction: (arg: Arg) => R, arg?: Arg): Promise<R>;
  async evaluate<R>(pageFunction: () => R): Promise<R>;
  async evaluate<R, Arg>(pageFunction: any, arg?: Arg): Promise<R> {
    if (arg !== undefined) {
      return await this.page.evaluate(pageFunction, arg);
    }
    return await this.page.evaluate(pageFunction);
  }

  on(event: string, listener: Function): void {
    this.page.on(event, listener as any);
  }

  async waitForLoadState(state?: any, options?: { timeout?: number }): Promise<void> {
    await this.page.waitForLoadState(state, options);
  }

  async waitForFunction<R, Arg>(pageFunction: any, arg?: any, options?: any): Promise<R> {
    return await this.page.waitForFunction(pageFunction, arg, options) as any;
  }
}

export class PlaywrightContext implements IWebBrowserContext {
  constructor(public context: BrowserContext) {}

  async newPage(): Promise<IWebPage> {
    const page = await this.context.newPage();
    return new PlaywrightPage(page);
  }

  async close(): Promise<void> {
    await this.context.close();
  }
}

export class PlaywrightBrowser implements IWebBrowser {
  constructor(public browser: Browser) {}

  async close(): Promise<void> {
    await this.browser.close();
  }

  async newContext(options?: any): Promise<IWebBrowserContext> {
    const context = await this.browser.newContext(options);
    return new PlaywrightContext(context);
  }
}
