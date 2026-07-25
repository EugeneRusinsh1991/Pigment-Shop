import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import { spawn } from 'child_process';
import { runSmokeAutomation } from './smoke-automation';

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
  console.warn(`⚠️ Timeout waiting for dev server at ${urlStr}. Proceeding with smoke test...`);
}

(async () => {
  console.log('--- Starting Event-Driven Smoke Automation ---');
  await ensureDevServer('http://localhost:8081', 45);

  
  // Clean up old smoke report if it exists
  const reportPath = path.join(__dirname, 'reports', 'smoke-report.json');
  if (fs.existsSync(reportPath)) {
    try {
      fs.unlinkSync(reportPath);
    } catch {
      // Ignore deletion errors
    }
  }
  const report = await runSmokeAutomation(
    {}, // SmokeConfig
    {   // ExplorerConfig
      diagnosticMode: true,
      maxInteractions: 500,
      maxDepth: 3,
      maxCategories: 1,
      maxProductsPerCategory: 1,
      context: 'admin',
      interactionPolicyConfig: {
        policies: {
          listGroup: { sample: 1, strategy: 'first-n' },
          gridGroup: { sample: 1, strategy: 'first-n' },
          carouselGroup: { sample: 1, strategy: 'first-n' },
          buttonGroup: { sample: 15 }
        }
      } as any,
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
    }
  );
  console.log('--- Smoke Automation Completed ---');

  // Save report to disk
  const reportsDir = path.join(__dirname, 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const filePath = path.join(reportsDir, 'smoke-report.json');
  fs.writeFileSync(filePath, JSON.stringify(report, null, 2), 'utf-8');
  console.log(`\n📄 Report saved to file: ${filePath}`);
})();
