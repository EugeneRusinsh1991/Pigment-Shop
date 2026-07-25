import { Page } from 'playwright';
import { ExplorerConfig } from '../explorer/ExplorerConfig';
import { BaseExecutionContext } from './BaseExecutionContext';

export class AdminContext extends BaseExecutionContext {
  protected contextName = 'AdminContext';

  protected async executePreparation(page: Page, config: ExplorerConfig): Promise<Page> {
    const authConfig = config.authentication;

    if (!authConfig || !authConfig.enabled) {
      throw new Error('Authentication is required for AdminContext but is not enabled in config.');
    }

    if (!authConfig.username || !authConfig.password) {
      throw new Error('Authentication Error: Missing required username or password in authentication config.');
    }

    const loginUrl = new URL(authConfig.loginUrl, config.baseUrl).toString();
    this.logStep(`Opening Login Page: ${loginUrl}`);
    await page.goto(loginUrl, { waitUntil: 'domcontentloaded' });

    await this.fillAndSubmitLoginForm(page, authConfig);
    await this.waitForAuthCompletion(page, authConfig);

    this.logSuccess('Authentication Successful');
    return page;
  }

  private async fillAndSubmitLoginForm(page: Page, authConfig: any): Promise<void> {
    this.logStep('Waiting for login form...');
    await page.waitForSelector(authConfig.usernameSelector, { state: 'visible', timeout: 5000 });

    this.logStep('Entering Credentials...');
    await page.click(authConfig.usernameSelector);
    await page.locator(authConfig.usernameSelector).fill('');
    await page.locator(authConfig.usernameSelector).pressSequentially(authConfig.username, { delay: 20 });

    await page.click(authConfig.passwordSelector);
    await page.locator(authConfig.passwordSelector).fill('');
    await page.locator(authConfig.passwordSelector).pressSequentially(authConfig.password, { delay: 20 });

    this.logStep('Submitting login form...');
    await page.click(authConfig.submitSelector);
  }

  private async waitForAuthCompletion(page: Page, authConfig: any): Promise<void> {
    this.logStep('Waiting for authentication to complete...');

    try {
      const authSuccessPromise = page.waitForURL(
        (url) => !url.toString().includes(authConfig.loginUrl),
        { timeout: 10000 }
      ).then(() => ({ type: 'SUCCESS' as const }));

      const authErrorPromise = page.waitForSelector('[data-testid="login-error-text"]', {
        state: 'visible',
        timeout: 10000
      }).then(async (locator) => {
        const errorMsg = await locator.textContent();
        return { type: 'REJECTED' as const, message: errorMsg?.trim() || 'Unknown backend error' };
      });

      authSuccessPromise.catch(() => {});
      authErrorPromise.catch(() => {});

      const result = await Promise.race([
        authSuccessPromise,
        authErrorPromise
      ]);

      if (result && result.type === 'REJECTED') {
        this.logError('Backend Rejected Login', result.message);
        throw new Error(`Authentication Error: Backend Rejected Login - ${result.message}`);
      }
    } catch (e: any) {
      this.handleAuthException(page, authConfig, e);
    }
  }

  private handleAuthException(page: Page, authConfig: any, e: any): never {
    if (e?.message?.includes('Authentication Error')) {
      throw e;
    }

    const currentUrl = page.url();
    if (currentUrl.includes(authConfig.loginUrl)) {
      this.logError('Timeout Waiting For Authentication');
      throw new Error('Authentication Error: Timeout Waiting For Authentication - Still on the login page after 10000ms.');
    }

    this.logError('Network/Auth Exception', e?.message || String(e));
    throw new Error(`Authentication Error: Unexpected Authentication Failure - ${e?.message || String(e)}`);
  }
}
