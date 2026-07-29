import * as fs from 'fs';
import * as path from 'path';
import { ExplorerEventEmitter } from '../../events/ExplorerEventEmitter';
import { IWebPage } from '../../driver/DriverInterfaces';
import { ElementHoverInfo } from '../../helpers/hoverInfoHelper';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { takeCompressedScreenshot } = require('../../../../scripts/playwright.helpers');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { cleanOldFiles } = require('../../../../scripts/cleanOldFiles');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getLocationContext, getOverlayText } = require('../../../../../src/utils/appStateDump');

export class AutomationScreenshotListener {
  private autoDir = path.join(process.cwd(), '.logs', 'automation-browser-log', 'screenshots');
  private page: IWebPage | null = null;
  private lastCapturedUrl = '';
  private currentHoverInfo: ElementHoverInfo | null = null;

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
      this.currentHoverInfo = null;
      if (this.page?.clearHoverInfo) {
        this.page.clearHoverInfo();
      }
      const url = e.context.currentScreen;
      if (url && url !== this.lastCapturedUrl) {
        this.lastCapturedUrl = url;
        await this.capture(url, null);
      }
    });

    emitter.on('NavigationCompleted', async (e) => {
      this.currentHoverInfo = null;
      if (this.page?.clearHoverInfo) {
        this.page.clearHoverInfo();
      }
      const url = e.newUrl;
      if (url && url !== this.lastCapturedUrl) {
        this.lastCapturedUrl = url;
        await this.capture(url, null);
      }
    });

    emitter.on('ActionExecuted', async (e) => {
      this.currentHoverInfo = e.hoverInfo || null;
      const url = e.context.currentScreen || this.page?.url() || '';
      await this.capture(url, e.hoverInfo || null);
    });
  }

  private async capture(url: string, hoverInfo: ElementHoverInfo | null = null) {
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
        overlayText,
        hoverInfo: hoverInfo || this.currentHoverInfo
      });

      fs.writeFileSync(filePath, base64Data);
      cleanOldFiles(this.autoDir, 20, '.jpg');
    } catch {
      // Ignore screenshot capture errors silently
    }
  }
}
