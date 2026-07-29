import { IWebPage, IWebElement } from './driver/DriverInterfaces';
import { StateCacheManager } from './StateCacheManager';
import { ExplorerEventEmitter } from './events/ExplorerEventEmitter';
import { ExplorerContext } from './ExplorerContext';
import { NavigationTracker } from './NavigationTracker';
import { ActionDepthTracker } from './ActionDepthTracker';
import { ElementInteractor } from './ElementInteractor';
import { ExecutionWatchdog } from './diagnostics/ExecutionWatchdog';
import { StateRecoveryManager } from './StateRecoveryManager';
import { InteractionDiagnostics } from './diagnostics/InteractionDiagnostics';
import { NavigationHandler } from './NavigationHandler';

export class InteractionProcessor {
  constructor(
    private emitter: ExplorerEventEmitter,
    private context: ExplorerContext,
    private tracker: NavigationTracker,
    private actionTracker: ActionDepthTracker,
    private interactor: ElementInteractor,
    private watchdog: ExecutionWatchdog,
    private recoveryManager: StateRecoveryManager,
    private cacheManager: StateCacheManager,
    private maxInteractions: number,
    private navHandler: NavigationHandler
  ) {}

  private isInvalidIdentifier(identifier: string): boolean {
    return identifier === 'detached-element' || identifier === 'unknown' || identifier === 'unknown-element';
  }

  private shouldSkipElement(targetIdentifier: string, currentUrl: string, depthLimit: number, currentDepth: number, diagnostics: InteractionDiagnostics): boolean {
    if (this.isInvalidIdentifier(targetIdentifier)) {
      diagnostics.setResult('SKIPPED', 'invalid_identifier');
      return true;
    }

    const firstSeenDepth = this.context.elementDepths.get(targetIdentifier);
    if (firstSeenDepth !== undefined && firstSeenDepth < currentDepth) {
      diagnostics.setResult('SKIPPED', `already_discovered_at_depth_${firstSeenDepth}`);
      return true;
    }

    const actionKey = this.actionTracker.getActionKey(currentUrl, targetIdentifier);
    if (this.actionTracker.shouldSkipAction(actionKey, depthLimit - currentDepth)) {
      diagnostics.setResult('SKIPPED', 'already_visited_or_depth_exceeded');
      return true;
    }
    
    return false;
  }

  private async resolveTargetElement(page: IWebPage, targetIdentifier: string, sourceStateId: string, diagnostics: InteractionDiagnostics): Promise<IWebElement | undefined> {
    return this.recoveryManager.resolveTargetElement(page, targetIdentifier, sourceStateId, diagnostics);
  }

  private async performInteraction(page: IWebPage, el: any, identifier: string, diagnostics: InteractionDiagnostics, metadata?: any): Promise<boolean> {
    this.context.visitedElements.add(identifier);
    this.context.interactionCount++;

    await this.emitter.emit('BeforeInteraction', { context: this.context, timestamp: Date.now(), elementIdentifier: identifier, metadata });
    const success = await this.interactor.clickElement(page, el, diagnostics, this.watchdog);
    const hoverInfo = page.getLastHoverInfo ? page.getLastHoverInfo() : null;
    await this.emitter.emit('AfterInteraction', { context: this.context, timestamp: Date.now(), elementIdentifier: identifier, success, metadata, hoverInfo });
    await this.emitter.emit('ActionExecuted', { context: this.context, timestamp: Date.now(), actionType: 'click', elementIdentifier: identifier, hoverInfo });

    return success;
  }

  private async processElementAt(
    page: IWebPage,
    targetIdentifier: string,
    currentUrl: string,
    depthLimit: number,
    currentDepth: number,
    sourceStateId: string,
    diagnostics: InteractionDiagnostics,
    exploreDFS: (page: IWebPage, depth: number, limit: number) => Promise<void>
  ): Promise<boolean> {
    if (this.shouldSkipElement(targetIdentifier, currentUrl, depthLimit, currentDepth, diagnostics)) {
      return true;
    }

    const targetElement = await this.resolveTargetElement(page, targetIdentifier, sourceStateId, diagnostics);

    if (!targetElement) {
      diagnostics.setResult('FAILED');
      return true;
    }

    this.tracker.markActionVisited(currentUrl, targetIdentifier);
    
    const cache = await this.cacheManager.getPageState(page, false);
    const metadata = cache.metadataMap.get(targetIdentifier);

    const success = await this.performInteraction(page, targetElement, targetIdentifier, diagnostics, metadata);
    if (!success) return true;

    diagnostics.startPhase('NAVIGATION / MUTATION CHECK');
    this.watchdog.updatePhase('NAVIGATION / MUTATION CHECK');
    return this.navHandler.handleNavigationAndRecurse(
      page, currentUrl, currentDepth, depthLimit, sourceStateId, targetIdentifier, exploreDFS
    );
  }

  async interactWithTargetIdentifiers(
    page: IWebPage,
    targetIdentifiers: string[],
    currentUrl: string,
    depthLimit: number,
    currentDepth: number,
    sourceStateId: string,
    exploreDFS: (page: IWebPage, depth: number, limit: number) => Promise<void>
  ): Promise<void> {
    for (const targetId of targetIdentifiers) {
      if (this.context.interactionCount >= this.maxInteractions) break;

      const diagnostics = new InteractionDiagnostics(targetId, currentUrl);
      this.watchdog.startInteraction(currentUrl, targetId);

      let metadata: ElementMetadata | undefined;
      let canContinue = true;
      try {
        const cache = await this.cacheManager.getPageState(page, false).catch(() => null);
        metadata = cache?.metadataMap.get(targetId);

        canContinue = await this.processElementAt(page, targetId, currentUrl, depthLimit, currentDepth, sourceStateId, diagnostics, exploreDFS);
      } finally {
        this.watchdog.endInteraction();
      }

      await this.emitter.emit('InteractionCompleted', {
        context: this.context,
        timestamp: Date.now(),
        elementIdentifier: targetId,
        result: diagnostics.getResult(),
        reason: diagnostics.getReason(),
        timing: diagnostics.getTimings(),
        metadata
      });

      if (!canContinue) break;
    }
  }
}
