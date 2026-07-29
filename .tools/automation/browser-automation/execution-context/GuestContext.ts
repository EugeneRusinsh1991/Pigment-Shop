import { Page } from 'playwright';
import { BaseExecutionContext } from './BaseExecutionContext';
import { ExplorerConfig } from '../explorer/ExplorerConfig';

export class GuestContext extends BaseExecutionContext {
  protected contextName = 'GuestContext';

  protected async executePreparation(page: Page, config: ExplorerConfig): Promise<Page> {
    this.logStep(`Navigating to Base URL: ${config.baseUrl}`);
    await page.goto(config.baseUrl, { waitUntil: 'domcontentloaded' });
    this.logStep('Guest Session Ready');
    return page;
  }
}
