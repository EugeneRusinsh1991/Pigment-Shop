import * as fs from 'fs';
import * as path from 'path';
import { chromium, Browser, Page } from 'playwright';
import { resolveExecutionContext } from './execution-context';
import { ensureDevServer } from './helpers/devServerHelper';
import { validateAuthEnv } from './helpers/envValidator';
import { runSmokeAutomation } from './smoke-automation';

class AdminNavContext {
  private adminContext = resolveExecutionContext('admin');
  
  async prepare(page: Page, config: any): Promise<Page> {
    const activePage = await this.adminContext.prepare(page, config);
    
    await activePage.waitForTimeout(2000);
    
    const adminUrl = new URL('/admin', config.baseUrl).toString();
    await activePage.evaluate((url) => {
      const a = document.createElement('a');
      a.href = url;
      a.id = 'experimental-admin-nav-link';
      a.style.position = 'absolute';
      a.style.top = '0';
      a.style.left = '0';
      a.style.width = '10px';
      a.style.height = '10px';
      a.style.zIndex = '99999';
      document.body.appendChild(a);
    }, adminUrl);
    
    await activePage.locator('#experimental-admin-nav-link').click();
    await activePage.waitForTimeout(3000);
    
    return activePage;
  }
}

(async () => {
  console.log('--- Starting Admin Panel Navigation Validation ---');
  await ensureDevServer('http://localhost:8081', 45);
  const authCredentials = validateAuthEnv();

  try {
    const config: any = {
      baseUrl: 'http://localhost:8081',
      diagnosticMode: true,
      maxInteractions: 100, // Small limit for experimental validation
      maxDepth: 3,
      maxCategories: 1,
      maxProductsPerCategory: 1,
      // Provide custom context that delegates to admin auth, then navigates to /admin
      context: new AdminNavContext(),
      interactionPolicyConfig: {
        policies: {
          listGroup: { sample: 1, strategy: 'first-n' },
          gridGroup: { sample: 1, strategy: 'first-n' },
          carouselGroup: { sample: 1, strategy: 'first-n' },
          buttonGroup: { sample: 15 }
        }
      },
      authentication: {
        enabled: true,
        provider: 'admin',
        loginUrl: '/login',
        username: authCredentials.username,
        password: authCredentials.password,
        usernameSelector: '[data-testid="login-email-input"], input[type="email"]',
        passwordSelector: '[data-testid="login-password-input"], input[type="password"]',
        submitSelector: '[data-testid="login-submit-button"]'
      }
    };
    
    // 3. Begin the existing automatic exploration only after the Admin Panel has successfully loaded
    const report = await runSmokeAutomation({}, config);
    
    console.log('--- Admin Panel Navigation Validation Completed ---');
    console.log(`Visited Screens: ${report.summary.visitedScreens}`);
    console.log(`Interactions: ${report.summary.visitedInteractions}`);
  } catch (error: any) {
    console.error(`Validation Failed: ${error.message}`);
  }
})();
