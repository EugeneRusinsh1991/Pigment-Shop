import fs from 'fs';
import path from 'path';
import { Page } from 'playwright';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { takeCompressedScreenshot } = require('../../scripts/playwright.helpers');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { cleanOldFiles } = require('../../scripts/cleanOldFiles');

const BASE_LOG_DIR = path.join(process.cwd(), '.logs', 'manual-browser-log');

function ensureDirs(dirs: string[]) {
  dirs.forEach((dir) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });
}

function buildFilePaths(timestamp: string) {
  const screenshotsDir = BASE_LOG_DIR;
  const stateDir = path.join(BASE_LOG_DIR, 'state');
  const reportsDir = path.join(BASE_LOG_DIR, 'reports');
  const nameToken = timestamp.startsWith('S_') ? timestamp : `S_${timestamp}`;
  return {
    screenshotsDir,
    stateDir,
    reportsDir,
    screenshotPath: path.join(BASE_LOG_DIR, `${nameToken}.jpg`),
    statePath: path.join(stateDir, `state_${nameToken}.json`),
    reportPath: path.join(reportsDir, `report_${nameToken}.md`),
    screenshotFilename: `${nameToken}.jpg`,
  };
}

function getCircularReplacer() {
  const seen = new WeakSet();
  return (_key: string, value: any) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) return '[Circular]';
      seen.add(value);
    }
    return value;
  };
}

function formatScreen(screen: any) {
  if (!screen) return { viewport: 'Unknown', resolution: 'Unknown' };
  return {
    viewport: `${screen.viewportWidth}x${screen.viewportHeight} (PixelRatio: ${screen.devicePixelRatio})`,
    resolution: `${screen.width}x${screen.height}`,
  };
}

function formatNetwork(network: any) {
  if (!network) return 'Unknown';
  return `Online: \`${network.online}\`, Type: \`${network.effectiveType}\``;
}

function formatDom(dom: any) {
  if (!dom) return 'Unknown elements';
  return `${dom.elementCount} elements`;
}

function buildReport(
  timestamp: string,
  stateDump: any,
  screenshotFilename: string,
  screenshotPath: string,
  statePath: string
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
![Screenshot](./${screenshotFilename})

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
  screenshotsDir: string,
  _stateDir: string,
  _reportsDir: string,
  screenshotPath: string,
  _stateDump: any,
  _reportContent: string
) {
  fs.copyFileSync(screenshotPath, path.join(screenshotsDir, 'screenshot.jpg'));
  cleanOldFiles(screenshotsDir, 20, '.jpg');
}

export async function setupManualInspector(page: Page): Promise<void> {
  if (!page) return;

  try {
    await page.addInitScript(() => {
      (window as any).__isPlaywright = true;
    });
    await page.evaluate(() => {
      (window as any).__isPlaywright = true;
    }).catch(() => {});
  } catch (err) {
    // Init script may already be attached
  }

  try {
    await page.exposeFunction(
      '__playwright_takeScreenshotAndDumpState',
      async (timestamp: string, stateDump: any, overlayText?: string, hoverInfo?: any, options?: { cropToTarget?: boolean }) => {
        const { screenshotsDir, stateDir, reportsDir, screenshotPath, statePath, reportPath, screenshotFilename } =
          buildFilePaths(timestamp);
        ensureDirs([BASE_LOG_DIR]);

        const cropToTarget = options?.cropToTarget ?? false;
        const base64Data = await takeCompressedScreenshot(page, {
          captureQuality: 80,
          exportQuality: 0.4,
          scale: 0.5,
          cropToTarget,
          cropPadding: 100,
          overlayText,
          hoverInfo,
        });
        fs.writeFileSync(screenshotPath, base64Data);

        // State dump and report saving temporarily disabled per requirements, but logic retained
        // fs.writeFileSync(statePath, JSON.stringify(stateDump, getCircularReplacer(), 2), 'utf8');
        // const reportContent = buildReport(timestamp, stateDump, screenshotFilename, screenshotPath, statePath);
        // fs.writeFileSync(reportPath, reportContent, 'utf8');

        saveLatestFiles(screenshotsDir, stateDir, reportsDir, screenshotPath, stateDump, '');

        console.log(`[PlaywrightDebug] Saved screenshot to ${screenshotPath}`);
        return { success: true };
      }
    );
  } catch (err) {
    // Function may already be exposed on this page instance
  }
}
