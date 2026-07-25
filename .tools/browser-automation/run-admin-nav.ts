import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import { spawn } from 'child_process';
import { chromium, Browser, Page } from 'playwright';
import { resolveExecutionContext } from './execution-context';

async function isServerRunning(urlStr: string): Promise<boolean> {
  return new Promise((resolve) => {
    const req = http.get(urlStr, (res) => {
      resolve(res.statusCode !== undefined && res.statusCode < 500);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(2000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function ensureDevServer(urlStr: string = 'http://localhost:8081', maxWaitSeconds = 45): Promise<void> {
  const isUp = await isServerRunning(urlStr);
  if (isUp) {
    console.log(`✓ Dev server is already running at ${urlStr}`);
    return;
  }

  console.log(`⚠️ Dev server is not running at ${urlStr}. Starting 'npm run dev' in a separate terminal window...`);
  if (process.platform === 'win32') {
    const devProc = spawn('cmd.exe', ['/c', 'start', 'cmd', '/k', 'npm run dev'], {
      cwd: path.resolve(__dirname, '../..'),
      stdio: 'ignore',
      shell: true,
      detached: true
    });
    devProc.unref();
  } else {
    const devProc = spawn('npm', ['run', 'dev'], {
      cwd: path.resolve(__dirname, '../..'),
      stdio: 'ignore',
      shell: true,
      detached: true
    });
    devProc.unref();
  }

  console.log(`⏳ Waiting up to ${maxWaitSeconds}s for dev server to respond...`);
  const startTime = Date.now();
  while (Date.now() - startTime < maxWaitSeconds * 1000) {
    await new Promise((res) => setTimeout(res, 2000));
    if (await isServerRunning(urlStr)) {
      console.log(`✓ Dev server is now ready at ${urlStr}!`);
      return;
    }
  }
  console.warn(`⚠️ Timeout waiting for dev server at ${urlStr}. Proceeding with automation...`);
}

import { runSmokeAutomation } from './smoke-automation';

class AdminNavContext {
  private adminContext = resolveExecutionContext('admin');
  
  async prepare(page: Page, config: any): Promise<Page> {
    // 1. Reuse the existing administrator authentication flow without modification
    let activePage = await this.adminContext.prepare(page, config);
    
    activePage.on('pageerror', err => {
      console.log('--- BROWSER PAGE ERROR ---', err.message);
    });
    activePage.on('console', msg => {
      if (msg.type() === 'error') console.log('--- BROWSER CONSOLE ERROR ---', msg.text());
    });
    
    // Give Firebase Auth time to flush the session to IndexedDB before we navigate
    console.log('Waiting for session persistence...');
    await activePage.waitForTimeout(2000);
    
    // 2. Navigate directly to the Admin Panel by changing the current application URL to the `/admin` route
    // Use client-side routing to avoid hard-reloads which can disrupt IndexedDB persistence in Playwright incognito contexts
    console.log('Navigating to /admin via client-side routing (Playwright trusted click)...');
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
    
    console.log('✓ Triggered client-side routing to Admin Panel. Waiting for hydration...');
    await activePage.waitForTimeout(3000);
    
    const content = await activePage.content();
    console.log('--- ADMIN PANEL HTML AFTER 10s ---');
    console.log(content.substring(0, 1000));
    if (content.length > 2000) {
      console.log('...');
      console.log(content.substring(content.length - 1000));
    }
    
    return activePage;
  }
}

(async () => {
  console.log('--- Starting Admin Panel Navigation Validation ---');
  await ensureDevServer('http://localhost:8081', 45);

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
        username: process.env.SMOKE_ADMIN_USERNAME || 'admin@pigment-shop.com',
        password: process.env.SMOKE_ADMIN_PASSWORD || 'admin123456',
        usernameSelector: '[data-testid="login-email-input"], input[type="email"]',
        passwordSelector: '[data-testid="login-password-input"], input[type="password"]',
        submitSelector: '[data-testid="login-submit-button"]'
      }
    };

    console.log('Executing experimental Admin Panel navigation flow...');
    
    // 3. Begin the existing automatic exploration only after the Admin Panel has successfully loaded
    const report = await runSmokeAutomation({}, config);
    
    console.log('--- Admin Panel Navigation Validation Completed ---');
    console.log(`Visited Screens: ${report.summary.visitedScreens}`);
    console.log(`Interactions: ${report.summary.visitedInteractions}`);
  } catch (error: any) {
    console.error(`Validation Failed: ${error.message}`);
  }
})();
