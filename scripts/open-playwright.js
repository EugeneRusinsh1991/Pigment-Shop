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

  // Expose function to Node.js backend
  await page.exposeFunction('__playwright_takeScreenshotAndDumpState', async (timestamp, stateDump) => {
    const fs = require('fs');
    const path = require('path');

    const baseDir = path.join(__dirname, '..', '.docs', 'browserLog');
    const screenshotsDir = path.join(baseDir, 'screenshots');
    const stateDir = path.join(baseDir, 'state');
    const reportsDir = path.join(baseDir, 'reports');

    [screenshotsDir, stateDir, reportsDir].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });

    const screenshotFilename = `screenshot_${timestamp}.jpg`;
    const stateFilename = `state_${timestamp}.json`;
    const reportFilename = `report_${timestamp}.md`;

    const screenshotPath = path.join(screenshotsDir, screenshotFilename);
    const statePath = path.join(stateDir, stateFilename);
    const reportPath = path.join(reportsDir, reportFilename);

    const base64Data = await takeCompressedScreenshot(page, { captureQuality: 70, exportQuality: 0.3, scale: 0.5 });
    fs.writeFileSync(screenshotPath, base64Data);

    // Safe stringify for circular structures (e.g., Firebase Auth user object)
    const getCircularReplacer = () => {
      const seen = new WeakSet();
      return (key, value) => {
        if (typeof value === 'object' && value !== null) {
          if (seen.has(value)) return '[Circular]';
          seen.add(value);
        }
        return value;
      };
    };

    // Write state file
    fs.writeFileSync(statePath, JSON.stringify(stateDump, getCircularReplacer(), 2), 'utf8');

    // Generate MD report
    const logsRows = '| N/A | No warnings or errors logged | |';
    const reportContent = `# AI Debug Report - ${timestamp}

## 📊 Environment & Diagnostics
| Parameter | Value |
| :--- | :--- |
| **URL** | [${stateDump.url}](${stateDump.url}) |
| **User Agent** | \`${stateDump.userAgent}\` |
| **Viewport Size** | ${stateDump.screen.viewportWidth}x${stateDump.screen.viewportHeight} (PixelRatio: ${stateDump.screen.devicePixelRatio}) |
| **Screen Resolution** | ${stateDump.screen.width}x${stateDump.screen.height} |
| **Network** | Online: \`${stateDump.network.online}\`, Type: \`${stateDump.network.effectiveType}\` |
| **DOM Size** | ${stateDump.dom.elementCount} elements |

## 🖼️ Screenshot
![Screenshot](../screenshots/${screenshotFilename})

## 📂 Quick Links
* [Open Full Screenshot](file:///${screenshotPath.replace(/\\/g, '/')})
* [Open Raw State JSON](file:///${statePath.replace(/\\/g, '/')})

## 📜 Console Warnings & Errors (Recent 0)
| Timestamp | Type | Message |
| :--- | :--- | :--- |
| ${logsRows}

## 📦 Application State Dump
\`\`\`json
${JSON.stringify(stateDump, null, 2)}
\`\`\`
`;

    fs.writeFileSync(reportPath, reportContent, 'utf8');
    
    // Also save "latest" shortcuts
    const latestStatePath = path.join(stateDir, 'state.json');
    const latestScreenshotPath = path.join(screenshotsDir, 'screenshot.jpg');
    const latestReportPath = path.join(reportsDir, 'latest_report.md');
    
    fs.writeFileSync(latestStatePath, JSON.stringify(stateDump, null, 2), 'utf8');
    fs.copyFileSync(screenshotPath, latestScreenshotPath);
    fs.writeFileSync(latestReportPath, reportContent, 'utf8');

    cleanOldFiles(screenshotsDir, 5, '.jpg');
    cleanOldFiles(stateDir, 5, '.json');
    cleanOldFiles(reportsDir, 5, '.md');

    console.log(`[PlaywrightDebug] Saved debug report to ${reportPath}`);
    return { success: true };
  });

  // Inject a global variable to indicate that we are running inside Playwright
  await page.addInitScript(() => {
    window.__isPlaywright = true;
  });

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
