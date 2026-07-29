import { ExplorerEventEmitter } from '../events/ExplorerEventEmitter';
import { ExplorerContext } from '../ExplorerContext';
import { ExplorerConfig } from '../ExplorerConfig';

export class ExecutionWatchdog {
  private timer: any = null;
  private currentUrl: string = '';
  private currentElementIdentifier: string = '';
  private currentPhase: string = '';
  private lastPhaseTime: number = 0;
  private recoveryRunning: boolean = false;
  private timeoutMs: number;
  private longInteractionThresholdMs: number;
  private interactionStartTime: number = 0;

  constructor(
    private emitter: ExplorerEventEmitter,
    private context: ExplorerContext,
    config: Partial<ExplorerConfig>
  ) {
    this.timeoutMs = config.watchdogTimeoutMs || 5000;
    this.longInteractionThresholdMs = config.longInteractionThresholdMs || 15000;
  }

  public startInteraction(url: string, elementIdentifier: string): void {
    this.currentUrl = url;
    this.currentElementIdentifier = elementIdentifier;
    this.interactionStartTime = Date.now();
    this.lastPhaseTime = Date.now();
    this.recoveryRunning = false;
    this.currentPhase = 'INTERACTION START';
    
    this.startTimer();
  }

  public updatePhase(phase: string): void {
    this.currentPhase = phase;
    this.lastPhaseTime = Date.now();
    this.emitter.emit('InteractionPhaseChanged', {
      context: this.context,
      timestamp: Date.now(),
      phase,
      elementIdentifier: this.currentElementIdentifier,
      url: this.currentUrl,
    }).catch(() => {});
  }

  public setRecoveryStatus(running: boolean): void {
    this.recoveryRunning = running;
  }

  public endInteraction(): void {
    this.stopTimer();
    const elapsed = Date.now() - this.interactionStartTime;
    if (elapsed > this.longInteractionThresholdMs && this.interactionStartTime > 0) {
      this.emitter.emit('LongInteractionWarning', {
        context: this.context,
        timestamp: Date.now(),
        url: this.currentUrl,
        elementIdentifier: this.currentElementIdentifier,
        phase: this.currentPhase,
        elapsedMs: elapsed,
      }).catch(() => {});
    }
    this.interactionStartTime = 0;
  }

  public stopTimer(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  public dispose(): void {
    this.stopTimer();
  }

  private startTimer(): void {
    this.stopTimer();
    this.timer = setInterval(() => this.checkProgress(), 1000); // Check every second
    if (this.timer && typeof this.timer.unref === 'function') {
      this.timer.unref();
    }
  }

  private checkProgress(): void {
    const now = Date.now();
    const elapsedPhase = now - this.lastPhaseTime;
    
    if (elapsedPhase > this.timeoutMs) {
      this.emitter.emit('WatchdogWarning', {
        context: this.context,
        timestamp: now,
        url: this.currentUrl,
        elementIdentifier: this.currentElementIdentifier,
        phase: this.currentPhase,
        elapsedMs: elapsedPhase,
        recoveryRunning: this.recoveryRunning,
      }).catch(() => {});
      
      // Reset the phase time so we don't spam warnings every second, 
      // but we will warn again if it waits ANOTHER timeoutMs.
      this.lastPhaseTime = now;
    }
  }
}
