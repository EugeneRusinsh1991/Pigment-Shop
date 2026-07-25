import { Page } from 'playwright';
import { ExplorerConfig } from '../explorer/ExplorerConfig';

export interface ExecutionContext {
  /**
   * Prepares the browser state before the UI Explorer starts.
   * @param page - The Playwright Page instance to prepare
   * @param config - The explorer configuration containing environment and authentication settings
   * @returns The prepared Page ready for traversal
   */
  prepare(page: Page, config: ExplorerConfig): Promise<Page>;
}
