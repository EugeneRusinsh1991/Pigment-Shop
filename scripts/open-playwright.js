const fs = require('fs');
const http = require('http');
const { chromium } = require('playwright');
const { execSync, spawn } = require('child_process');
const path = require('path');
const { takeCompressedScreenshot } = require('./playwright.helpers');
const { cleanOldFiles } = require('./cleanOldFiles');

function isServerRunning(urlStr) {
  return new Promise((resolve) => {
    try {
      const u = new URL(urlStr);
      const req = http.get({
        hostname: u.hostname,
        port: u.port,
        path: u.pathname,
        timeout: 2000
      }, (res) => {
        resolve(res.statusCode !== undefined && res.statusCode < 500);
      });
      req.on('error', () => resolve(false));
      req.on('timeout', () => {
        req.destroy();
        resolve(false);
      });
    } catch (e) {
      resolve(false);
    }
  });
}

async function ensureDevServer(urlStr = 'http://localhost:8081', maxWaitSeconds = 60) {
  const isUp = await isServerRunning(urlStr);
  if (isUp) {
    console.log(`✓ Dev server is already running at ${urlStr}`);
    return;
  }

  console.log(`⚠️ Dev server is not running at ${urlStr}. Starting 'npm run dev'...`);
  const projectRoot = path.resolve(__dirname, '..');
  const devProc = spawn('npm', ['run', 'dev'], {
    cwd: projectRoot,
    stdio: 'ignore',
    shell: true,
    detached: true,
    windowsHide: true
  });
  devProc.unref();

  console.log(`⏳ Waiting up to ${maxWaitSeconds}s for dev server to respond...`);
  const startTime = Date.now();
  while (Date.now() - startTime < maxWaitSeconds * 1000) {
    await new Promise((res) => setTimeout(res, 2000));
    if (await isServerRunning(urlStr)) {
      console.log(`✓ Dev server is now ready at ${urlStr}!`);
      return;
    }
  }
  console.warn(`⚠️ Timeout waiting for dev server at ${urlStr}. Proceeding anyway...`);
}

function killExistingPlaywrightSessions() {
  try {
    const currentPid = process.pid;
    if (process.platform === 'win32') {
      const psCommand = `Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -like '*open-playwright.js*' -and $_.ProcessId -ne ${currentPid} } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force }`;
      execSync(`powershell -NoProfile -ExecutionPolicy Bypass -Command "${psCommand}"`, { stdio: 'ignore' });
    } else {
      execSync(`pkill -f "node.*open-playwright.js" || true`, { stdio: 'ignore' });
    }
  } catch (err) {
    // Ignore errors if no process was found
  }
}

killExistingPlaywrightSessions();

async function openBrowserContext() {
  const userDataDir = path.resolve(__dirname, '../.playwright/user-data');
  const context = await chromium.launchPersistentContext(userDataDir, {
    headless: false, viewport: null, args: ['--start-maximized']
  });
  const page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();
  return { context, page };
}

async function loadInspector(page) {
  try {
    const inspectorPath = path.join(__dirname, '../.tools/manual-browser-inspector/setupManualInspector.js');
    if (fs.existsSync(inspectorPath)) {
      const { setupManualInspector } = require(inspectorPath);
      await setupManualInspector(page);
    }
  } catch (err) {
    // Optional manual inspector component
  }
}

async function navigateTo(page, url) {
  console.log(`Navigating to ${url}...`);
  try {
    await page.goto(url);
  } catch (error) {
    console.error('Navigation error:', error.message);
  }
}

(async () => {
  const targetUrl = process.argv[2] || 'http://localhost:8081';
  await ensureDevServer(targetUrl, 60);
  console.log('Launching Playwright Chrome with persistent profile & viewport auto-resize (viewport: null)...');
  const { context, page } = await openBrowserContext();
  await loadInspector(page);
  await navigateTo(page, targetUrl);
  context.on('close', () => { console.log('Browser closed. Exiting.'); process.exit(0); });
})();


