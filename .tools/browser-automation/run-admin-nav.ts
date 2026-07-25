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

(async () => {
  console.log('--- Starting Admin Panel Navigation Validation ---');
  await ensureDevServer('http://localhost:8081', 45);

  let browser: Browser | null = null;
  
  try {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 }
    });
    let activePage = await context.newPage();

    const config: any = {
      baseUrl: 'http://localhost:8081',
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

    console.log('Authenticating as admin...');
    const executionContext = resolveExecutionContext('admin');
    activePage = await executionContext.prepare(activePage, config);
    console.log('✓ Authentication successful.');

    console.log('Executing experimental Admin Panel navigation flow...');
    
    // Ensure we are on home page to use search
    if (!activePage.url().endsWith('/')) {
        await activePage.goto(config.baseUrl, { waitUntil: 'domcontentloaded' });
    }
    
    // Type in search box
    console.log('Entering "Admin Panel" into search field...');
    const searchInput = activePage.locator('input').first();
    await searchInput.waitFor({ state: 'visible', timeout: 5000 });
    await searchInput.fill('Admin Panel');
    await activePage.waitForTimeout(1000); // Wait for search results
    
    // Click on Admin Panel in results
    console.log('Opening "Admin Panel" from search results...');
    const resultLink = activePage.locator('text="Admin Panel"').last();
    await resultLink.click({ timeout: 5000 });
    
    await activePage.waitForTimeout(2000);
    
    console.log('✓ Successfully entered Admin Panel.');
    console.log('--- Admin Panel Navigation Validation Completed ---');
  } catch (error: any) {
    console.error(`Validation Failed: ${error.message}`);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
})();
