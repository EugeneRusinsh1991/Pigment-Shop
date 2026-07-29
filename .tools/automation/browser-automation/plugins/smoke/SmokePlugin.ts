import { IWebPage } from '../../explorer/driver/DriverInterfaces';
import { ExplorerEventEmitter } from '../../explorer/events/ExplorerEventEmitter';
import { SmokeConfig, defaultSmokeConfig } from './SmokeConfig';
import { SmokeReport } from './SmokeReport';
import { ScreenshotService } from './ScreenshotService';
import { FirestoreDiagnosticAnalyzer, FirestoreDiagnostic } from './FirestoreDiagnosticAnalyzer';
import { SmokeReportPrinter } from './SmokeReportPrinter';
import { DOMHealthEvaluator } from './DOMHealthEvaluator';

import { SmokeConsoleListener } from './SmokeConsoleListener';
import { BoundedMap, BoundedSet } from '../../explorer/utils/BoundedCollections';

interface FirestoreWarningGroup {
  diagnostic: FirestoreDiagnostic;
  occurrences: number;
  queries: BoundedSet<string>;
  trigger: string;
}

import { DiagnosticConfig, defaultDiagnosticConfig } from './DiagnosticConfig';

export class SmokePlugin {
  private config: SmokeConfig;
  private diagnosticConfig: DiagnosticConfig;
  private screenshotService?: ScreenshotService;
  private page: IWebPage | null = null;
  private startTime = 0;
  private currentInteraction = 'Initial Load';
  private currentElement = 'None';
  private visitedScreensList: string[] = [];
  
  private report: SmokeReport = {
    summary: {
      visitedScreens: 0,
      visitedInteractions: 0,
      successfulInteractions: 0,
      failedInteractions: 0,
      warnings: 0,
      errors: 0,
      executionDurationMs: 0
    },
    failures: [],
    warnings: []
  };

  private firestoreWarnings = new BoundedMap<string, FirestoreWarningGroup>(100);

  constructor(config?: Partial<SmokeConfig>, screenshotService?: ScreenshotService, diagnosticConfig: DiagnosticConfig = defaultDiagnosticConfig) {
    this.config = { ...defaultSmokeConfig, ...config };
    this.diagnosticConfig = diagnosticConfig;
    this.screenshotService = screenshotService;
  }

  subscribe(emitter: ExplorerEventEmitter) {
    emitter.on('ExplorerStarted', (e) => {
      this.startTime = e.timestamp;
      this.page = e.page;
      this.attachListeners(this.page);
    });

    emitter.on('ScreenEntered', async (e) => {
      const url = e.context.currentScreen;
      if (!this.visitedScreensList.includes(url)) {
        this.visitedScreensList.push(url);
      }
      if (this.page) {
        await DOMHealthEvaluator.evaluateDOMHealth(this.page, url, 'ScreenEntered', this.recordFailure.bind(this));
      }
    });

    emitter.on('BeforeInteraction', (e) => {
      this.currentInteraction = 'Click';
      this.currentElement = e.elementIdentifier;
    });

    emitter.on('AfterInteraction', async (e) => {
      if (e.success) {
        this.report.summary.successfulInteractions++;
      } else {
        this.report.summary.failedInteractions++;
      }
      if (this.page) {
        await DOMHealthEvaluator.evaluateDOMHealth(this.page, e.context.currentScreen, 'AfterInteraction', this.recordFailure.bind(this));
      }
    });

    emitter.on('Error', (e) => {
      this.recordFailure(e.context.currentScreen, 'Explorer Error', e.error, undefined, 'Internal Explorer');
    });

    emitter.on('ExplorerFinished', (e) => {
      this.report.summary.executionDurationMs = e.timestamp - this.startTime;
      this.report.summary.visitedScreens = e.context.visitedScreens.size;
      this.report.summary.visitedInteractions = e.context.visitedElements.size;
      
      this.flushFirestoreWarnings();
      SmokeReportPrinter.printConsoleReport(this.report, this.visitedScreensList);
    });
  }

  private flushFirestoreWarnings() {
    for (const group of this.firestoreWarnings.values()) {
      const queriesArray = Array.from(group.queries);
      const formattedDiagnostic = [
        `Firestore Configuration Warning`,
        `Occurrences: ${group.occurrences}`,
        `Triggered By: ${group.trigger}`,
        `Collection: ${group.diagnostic.collection}`,
        `Cause: ${group.diagnostic.rootCause}`,
        `Affected Queries:\n${queriesArray.map(q => `• ${q}`).join('\n')}`,
        `Original Firebase Message:\n${group.diagnostic.originalMessage}`
      ].join('\n');
      // Abstracted hardcoded '/products' path to be generic
      this.recordWarning('Global Firestore Analysis', 'Firestore Index Warning', formattedDiagnostic);
    }
  }

  private attachListeners(page: IWebPage) {
    SmokeConsoleListener.attach(page, this.config, this.currentElement, {
      recordFailure: (screen, type, msg) => this.recordFailure(screen, type, msg),
      recordWarning: (screen, type, msg) => this.recordWarning(screen, type, msg),
      recordFirestoreDiagnostic: (signature, diagnostic, trigger) => {
        if (!this.firestoreWarnings.has(signature)) {
          this.firestoreWarnings.set(signature, {
            diagnostic,
            occurrences: 0,
            queries: new BoundedSet<string>(50),
            trigger,
          });
        }
        const group = this.firestoreWarnings.get(signature)!;
        group.occurrences++;
        group.queries.add(diagnostic.operation);
      },
    }, this.diagnosticConfig);
  }

  private isDevServerError(errorMessage: string): boolean {
    return ['status of 400', 'status of 404', 'status of 500', 'ERR_CONNECTION_REFUSED']
      .some(pattern => errorMessage.includes(pattern));
  }

  private isRenderingIssue(errorType: string): boolean {
    return errorType === 'Blank Screen' || errorType === 'Missing Root';
  }

  private categorizeErrorMessage(errorMessage: string, errorType: string): string {
    if (this.isDevServerError(errorMessage)) return 'Development Server Issue';
    if (this.isRenderingIssue(errorType)) return 'Rendering Issue';
    if (errorMessage.includes('Failed to navigate')) return 'Automation/Routing Bug';
    return 'Application Bug';
  }

  private recordFailure(screen: string, errorType: string, errorMessage: string, stackTrace?: string, eventName = 'Runtime') {
    const category = this.categorizeErrorMessage(errorMessage, errorType);

    this.report.failures.push({
      screen,
      interaction: this.currentInteraction,
      elementIdentifier: this.currentElement,
      event: eventName,
      timestamp: Date.now(),
      errorType,
      errorMessage: `[${category}] ${errorMessage}`,
      stackTrace
    });
    this.report.summary.errors++;
    
    SmokeReportPrinter.logFailure(category, errorType, screen, this.currentElement, errorMessage);
    SmokeReportPrinter.saveReportToDisk(this.report);
  }

  private recordWarning(screen: string, errorType: string, errorMessage: string, stackTrace?: string, eventName = 'Runtime') {
    this.report.warnings.push({
      screen,
      interaction: this.currentInteraction,
      elementIdentifier: this.currentElement,
      event: eventName,
      timestamp: Date.now(),
      errorType,
      errorMessage,
      stackTrace
    });
    this.report.summary.warnings++;
    
    SmokeReportPrinter.logWarning(screen, errorType, errorMessage);
    SmokeReportPrinter.saveReportToDisk(this.report);
  }

  getReport(): SmokeReport {
    return this.report;
  }
}
