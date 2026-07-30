const fs = require('fs');
const path = require('path');

const { takeCompressedScreenshot } = require('../../scripts/playwright.helpers');
const { cleanOldFiles } = require('../../scripts/cleanOldFiles');

const BASE_LOG_DIR = path.join(process.cwd(), '.logs', 'manual-browser-log');

function ensureDirs(dirs) {
  dirs.forEach((dir) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });
}

function buildFilePaths(timestamp) {
  const screenshotsDir = path.join(BASE_LOG_DIR, 'screenshots');
  const stateDir = path.join(BASE_LOG_DIR, 'state');
  const reportsDir = path.join(BASE_LOG_DIR, 'reports');
  const nameToken = timestamp.startsWith('S_') ? timestamp : `S_${timestamp}`;
  return {
    screenshotsDir,
    stateDir,
    reportsDir,
    screenshotPath: path.join(screenshotsDir, `${nameToken}.jpg`),
    statePath: path.join(stateDir, `state_${nameToken}.json`),
    reportPath: path.join(reportsDir, `report_${nameToken}.md`),
    screenshotFilename: `${nameToken}.jpg`,
  };
}

function getCircularReplacer() {
  const seen = new WeakSet();
  return (_key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) return '[Circular]';
      seen.add(value);
    }
    return value;
  };
}

function formatScreen(screen) {
  if (!screen) return { viewport: 'Unknown', resolution: 'Unknown' };
  return {
    viewport: `${screen.viewportWidth}x${screen.viewportHeight} (PixelRatio: ${screen.devicePixelRatio})`,
    resolution: `${screen.width}x${screen.height}`,
  };
}

function formatNetwork(network) {
  if (!network) return 'Unknown';
  return `Online: \`${network.online}\`, Type: \`${network.effectiveType}\``;
}

function formatDom(dom) {
  if (!dom) return 'Unknown elements';
  return `${dom.elementCount} elements`;
}

function buildReport(
  timestamp,
  stateDump,
  screenshotFilename,
  screenshotPath,
  statePath
) {
  const logsRows = '| N/A | No warnings or errors logged | |';
  const screen = formatScreen(stateDump.screen);
  const network = formatNetwork(stateDump.network);
  const dom = formatDom(stateDump.dom);
  return `# AI Debug Report - ${timestamp}

## 📊 Environment & Diagnostics
| Parameter | Value |
| :--- | :--- |
| **URL** | [${stateDump.url}](${stateDump.url}) |
| **User Agent** | \`${stateDump.userAgent}\` |
| **Viewport Size** | ${screen.viewport} |
| **Screen Resolution** | ${screen.resolution} |
| **Network** | ${network} |
| **DOM Size** | ${dom} |

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
}

function saveLatestFiles(
  screenshotsDir,
  stateDir,
  reportsDir,
  screenshotPath,
  stateDump,
  reportContent
) {
  fs.writeFileSync(path.join(stateDir, 'state.json'), JSON.stringify(stateDump, null, 2), 'utf8');
  fs.copyFileSync(screenshotPath, path.join(screenshotsDir, 'screenshot.jpg'));
  fs.writeFileSync(path.join(reportsDir, 'latest_report.md'), reportContent, 'utf8');
  cleanOldFiles(screenshotsDir, 10, '.jpg');
  cleanOldFiles(stateDir, 10, '.json');
  cleanOldFiles(reportsDir, 10, '.md');
}

async function setupManualInspector(page) {
  if (!page) return;

  try {
    await page.addInitScript(() => {
      window.__isPlaywright = true;
    });
    await page.evaluate(() => {
      window.__isPlaywright = true;
    }).catch(() => {});
  } catch (err) {
    // Init script may already be attached
  }

  try {
    await page.exposeFunction(
      '__playwright_takeScreenshotAndDumpState',
      async (timestamp, stateDump, overlayText, hoverInfo) => {
        const { screenshotsDir, stateDir, reportsDir, screenshotPath, statePath, reportPath, screenshotFilename } =
          buildFilePaths(timestamp);
        ensureDirs([screenshotsDir, stateDir, reportsDir]);

        const base64Data = await takeCompressedScreenshot(page, {
          captureQuality: 70,
          exportQuality: 0.3,
          scale: 0.5,
          overlayText,
          hoverInfo,
        });
        fs.writeFileSync(screenshotPath, base64Data);
        fs.writeFileSync(statePath, JSON.stringify(stateDump, getCircularReplacer(), 2), 'utf8');

        const reportContent = buildReport(timestamp, stateDump, screenshotFilename, screenshotPath, statePath);
        fs.writeFileSync(reportPath, reportContent, 'utf8');
        saveLatestFiles(screenshotsDir, stateDir, reportsDir, screenshotPath, stateDump, reportContent);

        console.log(`[PlaywrightDebug] Saved debug report to ${reportPath}`);
        return { success: true };
      }
    );
  } catch (err) {
    // Function may already be exposed on this page instance
  }
}

module.exports = { setupManualInspector };
