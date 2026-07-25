import { Page } from 'playwright';
import { ExecutionContext } from './ExecutionContext';
import { ExplorerConfig } from '../explorer/ExplorerConfig';

export abstract class BaseExecutionContext implements ExecutionContext {
  protected abstract contextName: string;

  public async prepare(page: Page, config: ExplorerConfig): Promise<Page> {
    console.log(`\n==============================================`);
    console.log(`🚀 Preparing Execution Context: ${this.contextName}`);
    console.log(`==============================================\n`);
    
    try {
      const preparedPage = await this.executePreparation(page, config);
      this.logSuccess('Context Preparation Successful');
      console.log(`\n==============================================\n`);
      return preparedPage;
    } catch (error: any) {
      this.logError('Context Preparation Failed', error.message);
      console.log(`\n==============================================\n`);
      throw error;
    }
  }

  protected abstract executePreparation(page: Page, config: ExplorerConfig): Promise<Page>;

  protected logStep(message: string) {
    console.log(`\x1b[36mℹ\x1b[0m ${message}`);
  }

  protected logSuccess(message: string) {
    console.log(`\x1b[32m✓\x1b[0m ${message}`);
  }

  protected logError(message: string, details?: string) {
    console.error(`\x1b[31m❌ ${message}\x1b[0m`);
    if (details) {
      console.error(`   ${details}`);
    }
  }
}
