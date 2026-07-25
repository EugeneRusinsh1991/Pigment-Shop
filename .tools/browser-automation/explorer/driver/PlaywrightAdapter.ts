import { Browser, BrowserContext, Page, Locator } from 'playwright';
import { IWebBrowser, IWebBrowserContext, IWebPage, IWebElement } from './DriverInterfaces';

export class PlaywrightElement implements IWebElement {
  constructor(public locatorInstance: Locator) {}

  async click(options?: { force?: boolean }): Promise<void> {
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
    return new PlaywrightElement(this.locatorInstance.nth(index));
  }

  first(): IWebElement {
    return new PlaywrightElement(this.locatorInstance.first());
  }

  async count(): Promise<number> {
    return await this.locatorInstance.count();
  }

  locator(selector: string): IWebElement {
    return new PlaywrightElement(this.locatorInstance.locator(selector));
  }
}

export class PlaywrightPage implements IWebPage {
  constructor(public page: Page) {}

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
    return new PlaywrightElement(this.page.locator(selector));
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
