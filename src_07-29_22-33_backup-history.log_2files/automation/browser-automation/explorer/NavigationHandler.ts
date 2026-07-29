import { IWebPage } from './driver/DriverInterfaces';
import { ExplorerEventEmitter } from './events/ExplorerEventEmitter';
import { ExplorerContext } from './ExplorerContext';
import { ReadinessManager } from './ReadinessManager';
import { ExecutionStateGraph } from './graph/ExecutionStateGraph';
import { StateCacheManager } from './StateCacheManager';

export class NavigationHandler {
  constructor(
    private emitter: ExplorerEventEmitter,
    private context: ExplorerContext,
    private readiness: ReadinessManager,
    private stateGraph: ExecutionStateGraph,
    private cacheManager: StateCacheManager
  ) {}

  updateContextScreen(url: string) {
    if (this.context.currentScreen !== url) {
      if (this.context.currentScreen) {
        this.context.navigationHistory.push(this.context.currentScreen);
      }
      this.context.currentScreen = url;
    }
  }

  async handleNavigationAndRecurse(
    page: IWebPage,
    currentUrl: string,
    currentDepth: number,
    depthLimit: number,
    sourceStateId: string,
    triggerIdentifier: string,
    exploreDFS: (page: IWebPage, depth: number, limit: number) => Promise<void>
  ): Promise<boolean> {
    const newUrl = page.url();
    let isMutation = false;

    if (newUrl === currentUrl) {
      await page.waitForTimeout(150);
      const postState = await this.cacheManager.getPageState(page, true);
      if (postState.stateId !== sourceStateId) {
        isMutation = true;
        this.stateGraph.addTransition(sourceStateId, postState.stateId, triggerIdentifier);
      } else {
        return true;
      }
    } else {
      const postState = await this.cacheManager.getPageState(page, true);
      this.stateGraph.addTransition(sourceStateId, postState.stateId, triggerIdentifier);
    }

    if (!isMutation) {
      await this.emitter.emit('NavigationStarted', { context: this.context, timestamp: Date.now(), targetUrl: newUrl });
      this.updateContextScreen(newUrl);
      await this.emitter.emit('NavigationCompleted', { context: this.context, timestamp: Date.now(), newUrl });
    }
    
    await this.emitter.emit('ScreenExited', { context: this.context, timestamp: Date.now() });
    
    await exploreDFS(page, currentDepth + 1, depthLimit);

    if (page.url() !== currentUrl) {
      try {
        await page.goBack();
        await this.readiness.waitForPageReady(page);
        this.updateContextScreen(page.url());
        await this.emitter.emit('BackNavigation', { context: this.context, timestamp: Date.now(), targetUrl: page.url(), success: true });
      } catch (e: any) {
        await this.emitter.emit('BackNavigation', { context: this.context, timestamp: Date.now(), targetUrl: currentUrl, success: false });
        await this.emitter.emit('Error', { context: this.context, timestamp: Date.now(), error: `Failed to go back: ${e.message}` });
        return false;
      }
    }
    return true;
  }
}
