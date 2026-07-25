const { chromium } = require('playwright');
const { execSync } = require('child_process');
const { takeCompressedScreenshot } = require('./playwright.helpers');
const { cleanOldFiles } = require('./cleanOldFiles');

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

(async () => {
  console.log('Launching Playwright Chrome with viewport auto-resize (viewport: null)...');
  const browser = await chromium.launch({
    headless: false,
    args: ['--start-maximized']
  });
  
  const context = await browser.newContext({
    viewport: null
  });
  
  const page = await context.newPage();
  const { setupManualInspector } = require('../.tools/manual-browser-inspector/setupManualInspector');
  await setupManualInspector(page);

  const url = process.argv[2] || 'http://localhost:8081';
  console.log(`Navigating to ${url}...`);
  
  try {
    await page.goto(url);
  } catch (error) {
    console.error('Navigation error:', error.message);
  }
  
  // Keep the process alive while the browser is open
  browser.on('disconnected', () => {
    console.log('Browser closed. Exiting.');
    process.exit(0);
  });
})();
