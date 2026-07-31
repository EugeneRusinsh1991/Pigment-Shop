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
  const screenshotsDir = BASE_LOG_DIR;
  const nameToken = timestamp.startsWith('S_') ? timestamp : `S_${timestamp}`;
  return {
    screenshotsDir,
    screenshotPath: path.join(BASE_LOG_DIR, `${nameToken}.jpg`),
    screenshotFilename: `${nameToken}.jpg`,
  };
}

function saveLatestFiles(screenshotsDir, screenshotPath) {
  fs.copyFileSync(screenshotPath, path.join(screenshotsDir, 'screenshot.jpg'));
  cleanOldFiles(screenshotsDir, 20, '.jpg');
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
      async (timestamp, stateDump, overlayText, hoverInfo, options) => {
        const { screenshotsDir, screenshotPath } = buildFilePaths(timestamp);
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

        saveLatestFiles(screenshotsDir, screenshotPath);

        console.log(`[PlaywrightDebug] Saved screenshot to ${screenshotPath}`);
        return { success: true };
      }
    );
  } catch (err) {
    // Function may already be exposed on this page instance
  }
}

module.exports = { setupManualInspector };

