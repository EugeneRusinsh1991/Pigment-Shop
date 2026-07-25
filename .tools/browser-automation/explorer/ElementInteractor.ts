import { IWebPage, IWebElement } from './driver/DriverInterfaces';
import { ReadinessManager } from './ReadinessManager';
import { InteractionDiagnostics } from './diagnostics/InteractionDiagnostics';
import { ExecutionWatchdog } from './diagnostics/ExecutionWatchdog';

export class ElementInteractor {
  private readiness = new ReadinessManager();

  private updatePhase(phase: string, diagnostics?: InteractionDiagnostics, watchdog?: ExecutionWatchdog) {
    if (diagnostics) diagnostics.startPhase(phase);
    if (watchdog) watchdog.updatePhase(phase);
  }

  private async performClick(element: IWebElement, diagnostics?: InteractionDiagnostics): Promise<void> {
    await element.click({ timeout: 3000, force: true }).catch((e) => {
      if (diagnostics) {
        const isTimeout = e.message && e.message.includes('Timeout');
        diagnostics.setResult(isTimeout ? 'TIMEOUT' : 'FAILED');
      }
      throw e;
    });
  }

  async clickElement(
    page: IWebPage, 
    element: IWebElement, 
    diagnostics?: InteractionDiagnostics,
    watchdog?: ExecutionWatchdog
  ): Promise<boolean> {
    try {
      if (!(await this.prepareForClick(element, diagnostics, watchdog))) {
        return false;
      }
      
      this.updatePhase('ACTION', diagnostics, watchdog);
      await this.performClick(element, diagnostics);
      
      this.updatePhase('WAIT (STABLE DOM)', diagnostics, watchdog);
      await this.readiness.waitForPageReady(page);
      
      if (diagnostics) diagnostics.setResult('SUCCESS');
      return true;
    } catch (error: any) {
      this.handleInteractionError(diagnostics);
      return false;
    }
  }

  private async prepareForClick(
    element: IWebElement,
    diagnostics?: InteractionDiagnostics,
    watchdog?: ExecutionWatchdog
  ): Promise<boolean> {
    this.updatePhase('LOCATOR RESOLUTION', diagnostics, watchdog);
    if (!(await element.isVisible())) {
      if (diagnostics) diagnostics.setResult('SKIPPED');
      return false;
    }
    await element.scrollIntoViewIfNeeded({ timeout: 2000 }).catch(() => {});
    return true;
  }

  private handleInteractionError(diagnostics?: InteractionDiagnostics): void {
    if (diagnostics && diagnostics.getResult() !== 'TIMEOUT') {
      diagnostics.setResult('FAILED');
    }
  }
}
