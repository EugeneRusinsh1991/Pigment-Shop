import { Page, Locator } from 'playwright';
import { ExplorerEventEmitter } from './events/ExplorerEventEmitter';
import { ExplorerContext } from './ExplorerContext';
import { ExecutionStateGraph } from './graph/ExecutionStateGraph';
import { ExecutionWatchdog } from './diagnostics/ExecutionWatchdog';
import { InteractionDiagnostics } from './diagnostics/InteractionDiagnostics';
import { StateCacheManager } from './StateCacheManager';
import { ElementInteractor } from './ElementInteractor';

export class StateRecoveryManager {
  constructor(
    private emitter: ExplorerEventEmitter,
    private context: ExplorerContext,
    private stateGraph: ExecutionStateGraph,
    private watchdog: ExecutionWatchdog,
    private interactor: ElementInteractor,
    private cacheManager: StateCacheManager
  ) {}

  async attemptRecovery(
    page: Page,
    sourceStateId: string,
    currentStateId: string,
    diagnostics: InteractionDiagnostics
  ): Promise<void> {
    diagnostics.startPhase('RECOVERY EXECUTION');
    this.watchdog.updatePhase('RECOVERY EXECUTION');
    this.watchdog.setRecoveryStatus(true);
    await this.emitter.emit('RecoveryStarted', { context: this.context, timestamp: Date.now(), expectedStateId: sourceStateId });

    const path = this.stateGraph.findShortestPath(currentStateId, sourceStateId);
    let recoverySuccess = false;
    if (path !== null) {
      for (const triggerId of path) {
        const recState = await this.cacheManager.getPageState(page, true);
        const el = recState.identifierMap.get(triggerId);
        if (el) {
          await this.interactor.clickElement(page, el);
          await page.waitForTimeout(100);
        }
      }
      recoverySuccess = true;
    }
    await this.emitter.emit('RecoveryCompleted', { context: this.context, timestamp: Date.now(), success: recoverySuccess });
    this.watchdog.setRecoveryStatus(false);
  }

  async resolveTargetElement(
    page: Page,
    targetIdentifier: string,
    sourceStateId: string,
    diagnostics: InteractionDiagnostics
  ): Promise<Locator | undefined> {
    diagnostics.startPhase('DISCOVER (RE-SCAN)');
    this.watchdog.updatePhase('DISCOVER (RE-SCAN)');

    let stateCache = await this.cacheManager.getPageState(page);
    let targetElement = stateCache.identifierMap.get(targetIdentifier);

    if (!targetElement && sourceStateId) {
      await this.attemptRecovery(page, sourceStateId, stateCache.stateId, diagnostics);
      stateCache = await this.cacheManager.getPageState(page, true);
      targetElement = stateCache.identifierMap.get(targetIdentifier);
    }

    return targetElement;
  }
}
