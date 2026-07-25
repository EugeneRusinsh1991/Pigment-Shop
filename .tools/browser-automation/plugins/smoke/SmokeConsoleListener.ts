import { IWebPage } from '../../explorer/driver/DriverInterfaces';
import { SmokeConfig } from './SmokeConfig';
import { FirestoreDiagnosticAnalyzer } from './FirestoreDiagnosticAnalyzer';

import { DiagnosticConfig, defaultDiagnosticConfig } from './DiagnosticConfig';

export interface ConsoleListenerCallbacks {
  recordFailure: (screen: string, errorType: string, errorMessage: string) => void;
  recordWarning: (screen: string, errorType: string, errorMessage: string) => void;
  recordFirestoreDiagnostic: (signature: string, diagnostic: any, currentElement: string) => void;
}

export class SmokeConsoleListener {
  private static handleFirestoreMessage(text: string, screen: string, currentElement: string, callbacks: ConsoleListenerCallbacks, config: DiagnosticConfig): boolean {
    if (!text.includes('Firestore index missing') && !text.includes('The query requires an index')) {
      return false;
    }
    const diagnostic = FirestoreDiagnosticAnalyzer.analyze(text, text, config);
    if (diagnostic) {
      const signature = `${screen}-${diagnostic.collection}-${diagnostic.rootCause}`;
      callbacks.recordFirestoreDiagnostic(signature, diagnostic, currentElement);
    }
    return true;
  }

  private static handleConsoleErrorMessage(text: string, screen: string, config: SmokeConfig, callbacks: ConsoleListenerCallbacks) {
    const isDevServerAssetError = text.includes('Failed to load resource: the server responded with a status of 400') ||
                                 text.includes('Failed to load resource: the server responded with a status of 404') ||
                                 text.includes('net::ERR_CONNECTION_REFUSED');
    if (config.failOnConsoleError && !isDevServerAssetError) {
      callbacks.recordFailure(screen, 'Console Error', text);
    } else {
      callbacks.recordWarning(screen, 'Console Error', text);
    }
  }

  private static handleConsoleWarningMessage(text: string, screen: string, config: SmokeConfig, callbacks: ConsoleListenerCallbacks) {
    if (config.failOnConsoleWarn) {
      callbacks.recordFailure(screen, 'Console Warning', text);
    } else {
      callbacks.recordWarning(screen, 'Console Warning', text);
    }
  }

  public static attach(page: IWebPage, config: SmokeConfig, currentElement: string, callbacks: ConsoleListenerCallbacks, diagnosticConfig: DiagnosticConfig = defaultDiagnosticConfig) {
    page.on('pageerror', (err: any) => {
      const screen = page.url();
      callbacks.recordFailure(screen, 'JS Exception', err.message);
    });

    page.on('console', (msg: any) => {
      const text = msg.text();
      const screen = page.url();

      if (this.handleFirestoreMessage(text, screen, currentElement, callbacks, diagnosticConfig)) {
        return;
      }
      const type = msg.type();
      if (type === 'error') {
        SmokeConsoleListener.handleConsoleErrorMessage(text, screen, config, callbacks);
      } else if (type === 'warning') {
        SmokeConsoleListener.handleConsoleWarningMessage(text, screen, config, callbacks);
      }
    });
  }
}
