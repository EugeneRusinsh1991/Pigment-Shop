import { ElementHoverInfo } from '../../helpers/hoverInfoHelper';

/**
 * Generic abstraction for a Browser instance.
 */
export interface IWebBrowser {
  close(): Promise<void>;
  newContext(options?: any): Promise<IWebBrowserContext>;
}

/**
 * Generic abstraction for a Browser Context.
 */
export interface IWebBrowserContext {
  newPage(): Promise<IWebPage>;
  close(): Promise<void>;
}

/**
 * Generic abstraction for a Page/Tab.
 */
export interface IWebPage {
  url(): string;
  goBack(): Promise<void>;
  waitForTimeout(timeout: number): Promise<void>;
  screenshot(options?: { path?: string; fullPage?: boolean }): Promise<Buffer>;
  locator(selector: string): IWebElement;
  evaluate<R, Arg>(pageFunction: (arg: Arg) => R, arg?: Arg): Promise<R>;
  evaluate<R>(pageFunction: () => R): Promise<R>;
  on(event: string, listener: Function): void;
  waitForLoadState?(state?: string, options?: { timeout?: number }): Promise<void>;
  waitForFunction?<R, Arg>(pageFunction: (arg: Arg) => R, arg?: Arg, options?: { timeout?: number }): Promise<R>;
  waitForFunction?<R>(pageFunction: () => R, options?: { timeout?: number }): Promise<R>;

  lastHoverInfo?: ElementHoverInfo | null;
  getLastHoverInfo(): ElementHoverInfo | null;
  setLastHoverInfo(info: ElementHoverInfo | null): void;
  clearHoverInfo(): void;
}

/**
 * Generic abstraction for a DOM Element / Locator.
 */
export interface IWebElement {
  click(options?: { force?: boolean }): Promise<void>;
  fill(value: string): Promise<void>;
  isVisible(): Promise<boolean>;
  getAttribute(name: string): Promise<string | null>;
  evaluate<R, Arg>(pageFunction: (node: any, arg: Arg) => R, arg?: Arg): Promise<R>;
  evaluate<R>(pageFunction: (node: any) => R): Promise<R>;
  scrollIntoViewIfNeeded(options?: any): Promise<void>;
  nth(index: number): IWebElement;
  first(): IWebElement;
  count(): Promise<number>;
  locator(selector: string): IWebElement;
}
