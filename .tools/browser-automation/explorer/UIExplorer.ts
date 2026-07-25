import { Browser, Locator } from 'playwright';
import { ExplorerConfig, defaultConfig } from './ExplorerConfig';
import { NavigationTracker } from './NavigationTracker';
import { ElementScanner } from './ElementScanner';
import { ElementInteractor } from './ElementInteractor';
import { ExplorerEventEmitter } from './events/ExplorerEventEmitter';
import { ExplorerContext } from './ExplorerContext';
import { ReadinessManager } from './ReadinessManager';
import { InteractionPolicyEngine } from './policy/InteractionPolicyEngine';
import { ActionDepthTracker } from './ActionDepthTracker';
import { ExecutionStateGraph } from './graph/ExecutionStateGraph';
import { ExecutionWatchdog } from './diagnostics/ExecutionWatchdog';
import { InteractionDiagnostics } from './diagnostics/InteractionDiagnostics';
import { StateCacheManager, PageStateCache } from './StateCacheManager';
import { NavigationHandler } from './NavigationHandler';
import { StateRecoveryManager } from './StateRecoveryManager';
import { InteractionProcessor } from './InteractionProcessor';
import { ObservabilityManager } from './observability/ObservabilityManager';
import { ConsoleReporter } from './observability/reporters/ConsoleReporter';
import { JsonReporter } from './observability/reporters/JsonReporter';
import { MarkdownReporter } from './observability/reporters/MarkdownReporter';
import { DIContainer } from './di/DIContainer';
import { IWebPage } from './driver/DriverInterfaces';

export class UIExplorer {
  private config: ExplorerConfig;
  private tracker: NavigationTracker;
  private scanner: ElementScanner;
  private interactor: ElementInteractor;
  private policyEngine: InteractionPolicyEngine;
  private browser: Browser | null = null;
  private emitter: ExplorerEventEmitter;
  private context: ExplorerContext;
  private actionTracker = new ActionDepthTracker();
  private readiness = new ReadinessManager();
  private stateGraph = new ExecutionStateGraph();
  private watchdog: ExecutionWatchdog;
  private cacheManager: StateCacheManager;
  private navHandler: NavigationHandler;
  private recoveryManager: StateRecoveryManager;
  private interactionProcessor: InteractionProcessor;
  private observability: ObservabilityManager;

  constructor(container: DIContainer) {
    this.config = container.config;
    this.emitter = container.emitter;
    this.context = container.context;
    this.tracker = container.tracker;
    this.scanner = container.scanner;
    this.interactor = container.interactor;
    this.policyEngine = container.policyEngine;
    this.actionTracker = container.actionTracker;
    this.readiness = container.readiness;
    this.stateGraph = container.stateGraph;
    this.watchdog = container.watchdog;
    this.cacheManager = container.cacheManager;
    this.navHandler = container.navHandler;
    this.recoveryManager = container.recoveryManager;
    this.interactionProcessor = container.interactionProcessor;
    this.observability = container.observability;
  }

  private updateContextScreen(url: string) {
    this.navHandler.updateContextScreen(url);
  }

  private async explorePassAtLimit(page: IWebPage, limit: number) {
    try {
      await this.readiness.waitForPageReady(page);
    } catch (e: any) {
      await this.emitter.emit('Error', { context: this.context, timestamp: Date.now(), error: `Failed to wait for page ready: ${e.message}` });
    }
    await this.exploreDFS(page, 0, limit);
  }

  async start(page?: IWebPage) {
    this.context.startTime = Date.now();
    if (!page) {
      throw new Error('UIExplorer requires a Playwright Page instance. It must be provided by the execution pipeline.');
    }

    this.updateContextScreen(page.url());
    this.tracker.reset();

    await this.emitter.emit('ExplorerStarted', { context: this.context, timestamp: Date.now(), page });

    const { getDepthLimits } = await import('./ExplorerConfig');
    const limits = getDepthLimits(this.config);
    for (const limit of limits) {
      if (this.context.interactionCount >= this.config.maxInteractions) break;
      await this.explorePassAtLimit(page, limit);
    }

    await this.emitter.emit('ExplorerFinished', { context: this.context, timestamp: Date.now() });
  }

  private async initializeScreenState(currentUrl: string) {
    if (!this.tracker.isScreenVisited(currentUrl)) {
      this.tracker.markScreenVisited(currentUrl);
      this.context.visitedScreens.add(currentUrl);
      await this.emitter.emit('ScreenDiscovered', { context: this.context, timestamp: Date.now() });
    }
    await this.emitter.emit('ScreenEntered', { context: this.context, timestamp: Date.now() });
  }

  private async exploreDFS(page: IWebPage, currentDepth: number, depthLimit: number) {
    this.context.currentDepth = currentDepth;
    const currentUrl = page.url();
    this.updateContextScreen(currentUrl);

    if (currentDepth > depthLimit) return;

    await this.readiness.waitForPageReady(page);
    await this.initializeScreenState(currentUrl);

    const stateCache = await this.cacheManager.getPageState(page, true);
    const targetIdentifiers = await this.resolveTargetIdentifiers(page, stateCache);

    await this.emitter.emit('ElementDiscovered', { context: this.context, timestamp: Date.now(), elementsCount: targetIdentifiers.length });
    await this.interactionProcessor.interactWithTargetIdentifiers(
      page, targetIdentifiers, currentUrl, depthLimit, currentDepth, stateCache.stateId,
      (p, d, l) => this.exploreDFS(p, d, l)
    );
  }

  private async resolveTargetIdentifiers(page: IWebPage, stateCache: PageStateCache): Promise<string[]> {
    let elements = await this.policyEngine.decide(page, stateCache.elements, this.emitter, this.context);

    const targetIdentifiers = await Promise.all(elements.map(async el => {
      const idx = stateCache.elements.indexOf(el);
      return idx !== -1 ? stateCache.identifiers[idx] : await this.scanner.getElementIdentifier(el);
    }));

    for (const identifier of targetIdentifiers) {
      if (!this.context.elementDepths.has(identifier)) {
        this.context.elementDepths.set(identifier, this.context.currentDepth);
      }
    }

    return targetIdentifiers;
  }

}
