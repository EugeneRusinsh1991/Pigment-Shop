export * from './explorer/ExplorerConfig';
export * from './explorer/NavigationTracker';
export * from './explorer/ElementScanner';
export * from './explorer/ElementInteractor';
export * from './explorer/UIExplorer';
export * from './explorer/ExplorerContext';
export * from './explorer/ExplorerReport';
export * from './explorer/events/ExplorerEvents';
export * from './explorer/events/ExplorerEventEmitter';
export * from './explorer/modules/ReportCollector';

import { chromium, Browser, Page } from 'playwright';
import { ExplorerConfig, defaultConfig } from './explorer/ExplorerConfig';
import { UIExplorer } from './explorer/UIExplorer';
import { ExplorerEventEmitter } from './explorer/events/ExplorerEventEmitter';
import { ReportCollector } from './explorer/modules/ReportCollector';
import { ExplorerReport } from './explorer/ExplorerReport';
import { resolveExecutionContext } from './execution-context';
import { createDefaultContainer } from './explorer/di/DIContainer';
import { PlaywrightPage } from './explorer/driver/PlaywrightAdapter';

/**
 * Runs the Universal UI Explorer.
 * Preserves backward compatibility.
 * Now wires up the event system and default subscribers (Logger and Report Collector).
 * Returns the collected ExplorerReport.
 */
export async function runUIExplorer(
  page?: Page, 
  config?: Partial<ExplorerConfig>,
  customEmitter?: ExplorerEventEmitter
): Promise<ExplorerReport> {
  const emitter = customEmitter || new ExplorerEventEmitter();
  
  // Default subscribers
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
