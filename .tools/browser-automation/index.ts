export * from './explorer/ElementInteractor';
export * from './explorer/ElementScanner';
export * from './explorer/ExplorerConfig';
export * from './explorer/ExplorerContext';
export * from './explorer/ExplorerReport';
export * from './explorer/NavigationTracker';
export * from './explorer/UIExplorer';
export * from './explorer/events/ExplorerEventEmitter';
export * from './explorer/events/ExplorerEvents';
export * from './explorer/modules/ReportCollector';

import { Browser, Page, chromium } from 'playwright';
import { resolveExecutionContext } from './execution-context';
import { ExplorerConfig, defaultConfig } from './explorer/ExplorerConfig';
import { ExplorerReport } from './explorer/ExplorerReport';
import { UIExplorer } from './explorer/UIExplorer';
import { createDefaultContainer } from './explorer/di/DIContainer';
import { PlaywrightPage } from './explorer/driver/PlaywrightAdapter';
import { ExplorerEventEmitter } from './explorer/events/ExplorerEventEmitter';
import { ReportCollector } from './explorer/modules/ReportCollector';

/**
 * Runs the Universal UI Explorer.
 */
export async function runUIExplorer(
  page?: Page, 
  config?: Partial<ExplorerConfig>,
  customEmitter?: ExplorerEventEmitter
): Promise<ExplorerReport> {
  const emitter = customEmitter || new ExplorerEventEmitter();
  
  const reportCollector = new ReportCollector();
  reportCollector.subscribe(emitter);

  const explorerConfig = { ...defaultConfig, ...config };
  
  let activePage = page;
  let browser: Browser | null = null;
  
  if (!activePage) {
    browser = await chromium.launch({ headless: false }); 
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 }
    });
    activePage = await context.newPage();
  }

  activePage.on('console', (msg) => {
    const text = msg.text();
    if (text.includes('[Typography Warning]')) {
      const fs = require('fs');
      const path = require('path');
      const logDir = path.join(process.cwd(), '.docs');
      if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
      const logFile = path.join(logDir, 'typography-warnings.log');
      const existingContent = fs.existsSync(logFile) ? fs.readFileSync(logFile, 'utf8') : '';
      if (!existingContent.includes(text)) {
        fs.appendFileSync(logFile, `[${new Date().toISOString()}] ${text}\n`);
      }
    }
  });

  // Execute Preparation Context
  try {
    const executionContext = resolveExecutionContext(explorerConfig.context);
    activePage = await executionContext.prepare(activePage, explorerConfig);
  } catch (error: any) {
    if (browser) await browser.close();
    
    await emitter.emit('Error', {
      context: { currentScreen: 'Authentication', navigationHistory: [], currentDepth: 0, interactionCount: 0, visitedScreens: new Set(), visitedElements: new Set(), startTime: Date.now() },
      timestamp: Date.now(),
      error: `Authentication Error: ${error.message}`
    });
    
    return reportCollector.getReport();
  }

  // Initialize and start explorer
  const container = createDefaultContainer(emitter, config);
  const explorer = new UIExplorer(container);
  await explorer.start(new PlaywrightPage(activePage));

  if (browser) {
    await browser.close();
  }

  return reportCollector.getReport();
}
