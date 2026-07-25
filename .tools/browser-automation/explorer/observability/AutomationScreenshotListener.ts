import * as fs from 'fs';
import * as path from 'path';
import { ExplorerEventEmitter } from '../../events/ExplorerEventEmitter';
import { IWebPage } from '../../driver/DriverInterfaces';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { takeCompressedScreenshot } = require('../../../../scripts/playwright.helpers');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { cleanOldFiles } = require('../../../../scripts/cleanOldFiles');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getLocationContext, getOverlayText } = require('../../../../src/utils/appStateDump');

export class AutomationScreenshotListener {
  private autoDir = path.join(process.cwd(), '.docs', 'automation-browser-log', 'screenshots');
  private page: IWebPage | null = null;
  private lastCapturedUrl = '';

  constructor(emitter: ExplorerEventEmitter) {
    this.ensureDir();
    this.subscribe(emitter);
  }

  private ensureDir() {
    if (!fs.existsSync(this.autoDir)) {
      fs.mkdirSync(this.autoDir, { recursive: true });
    }
  }

  private subscribe(emitter: ExplorerEventEmitter) {
    emitter.on('ExplorerStarted', (e) => {
      this.page = e.page;
    });

    emitter.on('ScreenEntered', async (e) => {
      const url = e.context.currentScreen;
      if (url && url !== this.lastCapturedUrl) {
        this.lastCapturedUrl = url;
        await this.capture(url);
      }
    });

    emitter.on('NavigationCompleted', async (e) => {
      const url = e.newUrl;
      if (url && url !== this.lastCapturedUrl) {
        this.lastCapturedUrl = url;
        await this.capture(url);
      }
    });
  }

  private async capture(url: string) {
    if (!this.page) return;
    try {
      this.ensureDir();
      const now = new Date();
      const pad = (num: number) => String(num).padStart(2, '0');
      const timeStr = `${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;
      const stateDump = { url };
      const context = getLocationContext(stateDump);
      const overlayText = getOverlayText(stateDump);
      const filename = `S_${timeStr}_${context}.jpg`;
      const filePath = path.join(this.autoDir, filename);

      const unwrappedPage = (this.page as any).page || this.page;
      const base64Data = await takeCompressedScreenshot(unwrappedPage, {
        captureQuality: 70,
        exportQuality: 0.3,
        scale: 0.5,
        overlayText
      });

      fs.writeFileSync(filePath, base64Data);
      cleanOldFiles(this.autoDir, 20, '.jpg');
    } catch {
      // Ignore screenshot capture errors silently
    }
  }
}
