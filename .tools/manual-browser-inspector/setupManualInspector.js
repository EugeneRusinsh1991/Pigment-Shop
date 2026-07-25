const fs = require('fs');
const path = require('path');
const { takeCompressedScreenshot } = require('../../scripts/playwright.helpers');
const { cleanOldFiles } = require('../../scripts/cleanOldFiles');

async function setupManualInspector(page) {
  if (!page) return;

  try {
    await page.addInitScript(() => {
      window.__isPlaywright = true;
    });
  } catch (err) {
    // Init script may already be attached
  }

  try {
    await page.exposeFunction('__playwright_takeScreenshotAndDumpState', async (timestamp, stateDump, overlayText) => {
      const baseDir = path.join(process.cwd(), '.docs', 'manual-browser-log');
      const screenshotsDir = path.join(baseDir, 'screenshots');
      const stateDir = path.join(baseDir, 'state');
      const reportsDir = path.join(baseDir, 'reports');

      [screenshotsDir, stateDir, reportsDir].forEach((dir) => {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
      });

      const nameToken = timestamp.startsWith('S_') ? timestamp : `S_${timestamp}`;
      const screenshotFilename = `${nameToken}.jpg`;
      const stateFilename = `state_${nameToken}.json`;
      const reportFilename = `report_${nameToken}.md`;

      const screenshotPath = path.join(screenshotsDir, screenshotFilename);
      const statePath = path.join(stateDir, stateFilename);
      const reportPath = path.join(reportsDir, reportFilename);

      const base64Data = await takeCompressedScreenshot(page, { captureQuality: 70, exportQuality: 0.3, scale: 0.5, overlayText });
      fs.writeFileSync(screenshotPath, base64Data);

      const getCircularReplacer = () => {
        const seen = new WeakSet();
        return (_key, value) => {
          if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) return '[Circular]';
            seen.add(value);
          }
          return value;
        };
      };

      fs.writeFileSync(statePath, JSON.stringify(stateDump, getCircularReplacer(), 2), 'utf8');

      const logsRows = '| N/A | No warnings or errors logged | |';
      const reportContent = `# AI Debug Report - ${timestamp}

## 📊 Environment & Diagnostics
| Parameter | Value |
| :--- | :--- |
| **URL** | [${stateDump.url}](${stateDump.url}) |
| **User Agent** | \`${stateDump.userAgent}\` |
| **Viewport Size** | ${stateDump.screen?.viewportWidth}x${stateDump.screen?.viewportHeight} (PixelRatio: ${stateDump.screen?.devicePixelRatio}) |
| **Screen Resolution** | ${stateDump.screen?.width}x${stateDump.screen?.height} |
| **Network** | Online: \`${stateDump.network?.online}\`, Type: \`${stateDump.network?.effectiveType}\` |
| **DOM Size** | ${stateDump.dom?.elementCount} elements |

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

      const latestStatePath = path.join(stateDir, 'state.json');
      const latestScreenshotPath = path.join(screenshotsDir, 'screenshot.jpg');
      const latestReportPath = path.join(reportsDir, 'latest_report.md');

      fs.writeFileSync(latestStatePath, JSON.stringify(stateDump, null, 2), 'utf8');
      fs.copyFileSync(screenshotPath, latestScreenshotPath);
      fs.writeFileSync(latestReportPath, reportContent, 'utf8');

      cleanOldFiles(screenshotsDir, 10, '.jpg');
      cleanOldFiles(stateDir, 10, '.json');
      cleanOldFiles(reportsDir, 10, '.md');

      console.log(`[PlaywrightDebug] Saved debug report to ${reportPath}`);
      return { success: true };
    });
  } catch (err) {
    // Function may already be exposed on this page instance
  }
}

module.exports = { setupManualInspector };
