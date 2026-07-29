import { ExplorerEventEmitter } from '../events/ExplorerEventEmitter';
import { 
  ObservabilityEvent, 
  ActionEvent, 
  SkipEvent, 
  NavigationEvent, 
  ScanEvent, 
  SummaryEvent,
  ErrorEvent,
  WarningEvent
} from './events';

export interface Reporter {
  report(event: ObservabilityEvent): void;
  flush?(): Promise<void> | void;
}

export class ObservabilityManager {
  private reporters: Reporter[] = [];
  private globalStartTime = 0;
  private domScanCount = 0;
  private clicksCount = 0;
  private successfulNavigationsCount = 0;
  private skippedCount = 0;
  private errorsCount = 0;
  private clickDurations: number[] = [];
  private pageDurations: number[] = [];
  private slowestOperationMs = 0;
  private slowestOperationName = 'None';
  private pageStartTimes = new Map<string, number>();

  constructor(private emitter: ExplorerEventEmitter) {
    this.bindEvents();
  }

  addReporter(reporter: Reporter) {
    this.reporters.push(reporter);
  }

  private dispatch(event: ObservabilityEvent) {
    for (const reporter of this.reporters) {
      reporter.report(event);
    }
  }

  private trackSlowest(name: string, ms: number) {
    if (ms > this.slowestOperationMs) {
      this.slowestOperationMs = ms;
      this.slowestOperationName = name;
    }
  }

  private onElementDiscovered(e: any) {
    this.domScanCount++;
    const duration = e.durationMs || 0;
    this.trackSlowest('DOM Scan', duration);
    this.dispatch({
      type: 'SCAN',
      timestamp: e.timestamp,
      pageUrl: e.context.currentScreen,
      interactiveElements: e.elementsCount,
      clickableElements: e.clickableElements || e.elementsCount,
      candidates: e.candidates || e.elementsCount,
      filtered: e.filtered || 0,
      durationMs: duration
    });
  }

  private onInteractionCompleted(e: any) {
    const duration = e.timing?.total || 0;
    this.trackSlowest(`Interaction: ${e.result}`, duration);

    const metadata = e.metadata || {
      type: 'unknown',
      text: 'Unknown',
      role: 'unknown',
      selector: e.elementIdentifier
    };

    if (e.result === 'SKIPPED') {
      this.skippedCount++;
      this.dispatch({
        type: 'SKIP',
        timestamp: e.timestamp,
        element: metadata,
        pageUrl: e.context.currentScreen,
        reason: e.reason || 'already_visited_or_depth_exceeded'
      });
    } else {
      this.clicksCount++;
      this.clickDurations.push(duration);
      this.dispatch({
        type: 'ACTION',
        timestamp: e.timestamp,
        element: metadata,
        pageUrl: e.context.currentScreen,
        durationMs: duration,
        result: e.result
      });
    }
  }

  private onNavigationCompleted(e: any) {
    this.successfulNavigationsCount++;
    const duration = e.durationMs || 0;
    this.trackSlowest('Navigation', duration);
    this.dispatch({
      type: 'NAVIGATION',
      timestamp: e.timestamp,
      sourceUrl: e.context.currentScreen,
      destinationUrl: e.newUrl,
      routeDepth: e.routeDepth || e.context.currentDepth,
      durationMs: duration,
      actuallyChanged: e.actuallyChanged !== false,
      success: true,
      domReadyDurationMs: e.domReadyDurationMs || 0
    });
  }

  private onBackNavigation(e: any) {
    if (e.success) this.successfulNavigationsCount++;
    const duration = e.durationMs || 0;
    this.trackSlowest('Back Navigation', duration);
    this.dispatch({
      type: 'NAVIGATION',
      timestamp: e.timestamp,
      sourceUrl: e.context.currentScreen,
      destinationUrl: e.targetUrl,
      routeDepth: e.routeDepth || Math.max(0, e.context.currentDepth - 1),
      durationMs: duration,
      actuallyChanged: true,
      success: e.success,
      isBack: true,
      domReadyDurationMs: 0
    });
  }

  private onDecisionMade(e: any) {
    if (e.decision === 'REPRESENTATIVE' && e.contextData) {
      this.skippedCount += e.contextData.skipped || 0;
      this.dispatch({
        type: 'SKIP',
        timestamp: e.timestamp,
        element: { type: 'group', text: e.contextData.groupName },
        pageUrl: e.context.currentScreen,
        reason: `policy rejected (${e.contextData.skipped} skipped)`
      });
    }
  }

  private async onExplorerFinished(e: any) {
    const avgClick = this.clickDurations.length ? this.clickDurations.reduce((a, b) => a + b, 0) / this.clickDurations.length : 0;
    const avgPage = this.pageDurations.length ? this.pageDurations.reduce((a, b) => a + b, 0) / this.pageDurations.length : 0;

    this.dispatch({
      type: 'SUMMARY',
      timestamp: e.timestamp,
      totalRuntimeMs: Date.now() - this.globalStartTime,
      pagesVisited: e.context.visitedScreens.size,
      domScans: this.domScanCount,
      elementsScanned: this.domScanCount * 10,
      candidatesEvaluated: this.domScanCount * 5,
      clicks: this.clicksCount,
      successfulNavigations: this.successfulNavigationsCount,
      skipped: this.skippedCount,
      errors: this.errorsCount,
      averagePageTimeMs: Math.round(avgPage),
      averageClickTimeMs: Math.round(avgClick),
      slowestOperationName: this.slowestOperationName,
      slowestOperationMs: this.slowestOperationMs
    });

    for (const reporter of this.reporters) {
      if (reporter.flush) {
        await reporter.flush();
      }
    }
  }

  private bindEvents() {
    this.emitter.on('ExplorerStarted', () => { this.globalStartTime = Date.now(); });
    this.emitter.on('ScreenEntered', (e) => { this.pageStartTimes.set(e.context.currentScreen, Date.now()); });
    this.emitter.on('ScreenExited', (e) => {
      const start = this.pageStartTimes.get(e.context.currentScreen) || Date.now();
      this.pageDurations.push(Date.now() - start);
    });
    this.emitter.on('ElementDiscovered', (e) => this.onElementDiscovered(e));
    this.emitter.on('InteractionCompleted', (e) => this.onInteractionCompleted(e));
    this.emitter.on('NavigationCompleted', (e) => this.onNavigationCompleted(e));
    this.emitter.on('BackNavigation', (e) => this.onBackNavigation(e));
    this.emitter.on('DecisionMade', (e) => this.onDecisionMade(e));
    this.emitter.on('Error', (e) => { this.errorsCount++; this.dispatch({ type: 'ERROR', timestamp: e.timestamp, message: e.error }); });
    this.emitter.on('Warning', (e) => { this.dispatch({ type: 'WARNING', timestamp: e.timestamp, message: e.message }); });
    this.emitter.on('ExplorerFinished', async (e) => this.onExplorerFinished(e));
  }
}
