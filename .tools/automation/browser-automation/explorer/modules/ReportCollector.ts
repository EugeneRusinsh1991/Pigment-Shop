import { ExplorerEventEmitter } from '../events/ExplorerEventEmitter';
import { ExplorerReport } from '../ExplorerReport';

export class ReportCollector {
  private report: ExplorerReport = {
    startTime: 0,
    endTime: 0,
    durationMs: 0,
    visitedScreens: [],
    visitedElements: [],
    successfulInteractions: 0,
    failedInteractions: 0,
    skippedInteractions: 0,
    warnings: [],
    errors: []
  };

  subscribe(emitter: ExplorerEventEmitter) {
    emitter.on('ExplorerStarted', (e) => {
      this.report.startTime = e.timestamp;
    });

    emitter.on('ScreenEntered', (e) => {
      const url = e.context.currentScreen;
      if (!this.report.visitedScreens.includes(url)) {
        this.report.visitedScreens.push(url);
      }
    });

    emitter.on('AfterInteraction', (e) => {
      const id = e.elementIdentifier;
      if (!this.report.visitedElements.includes(id)) {
        this.report.visitedElements.push(id);
      }
      if (e.success) {
        this.report.successfulInteractions++;
      } else {
        this.report.failedInteractions++;
      }
    });

    emitter.on('Warning', (e) => {
      this.report.warnings.push(`[${e.context.currentScreen}] ${e.message}`);
    });

    emitter.on('Error', (e) => {
      this.report.errors.push(`[${e.context.currentScreen}] ${e.error}`);
    });

    emitter.on('ExplorerFinished', (e) => {
      this.report.endTime = e.timestamp;
      this.report.durationMs = this.report.endTime - this.report.startTime;
      this.report.skippedInteractions = e.context.interactionCount - (this.report.successfulInteractions + this.report.failedInteractions);
      if (this.report.skippedInteractions < 0) this.report.skippedInteractions = 0;
    });
  }

  getReport(): ExplorerReport {
    return this.report;
  }
}
