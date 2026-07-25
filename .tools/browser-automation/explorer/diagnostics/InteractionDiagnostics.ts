export class InteractionDiagnostics {
  private timings: Record<string, number> = {};
  private currentPhase: string | null = null;
  private phaseStartTime: number = 0;
  private result: 'SUCCESS' | 'FAILED' | 'TIMEOUT' | 'RECOVERED' | 'SKIPPED' | 'BLOCKED' | null = null;
  private reason: string | null = null;
  private retries: number = 0;

  constructor(public readonly elementIdentifier: string, public readonly url: string) {
    this.timings['Total'] = 0;
  }

  public startPhase(phase: string): void {
    const now = Date.now();
    if (this.currentPhase) {
      this.endPhase();
    }
    this.currentPhase = phase;
    this.phaseStartTime = now;
  }

  public endPhase(): void {
    if (this.currentPhase && this.phaseStartTime > 0) {
      const duration = Date.now() - this.phaseStartTime;
      this.timings[this.currentPhase] = (this.timings[this.currentPhase] || 0) + duration;
      this.timings['Total'] += duration;
      this.currentPhase = null;
      this.phaseStartTime = 0;
    }
  }

  public recordRetry(): void {
    this.retries++;
  }

  public setResult(result: 'SUCCESS' | 'FAILED' | 'TIMEOUT' | 'RECOVERED' | 'SKIPPED' | 'BLOCKED', reason?: string): void {
    this.result = result;
    if (reason) this.reason = reason;
  }

  public getReason(): string | undefined {
    return this.reason || undefined;
  }

  public getResult(): 'SUCCESS' | 'FAILED' | 'TIMEOUT' | 'RECOVERED' | 'SKIPPED' | 'BLOCKED' {
    return this.result || 'FAILED';
  }

  public getTimings(): Record<string, number> {
    // Make sure we end the current phase if it's still running
    this.endPhase();
    if (this.retries > 0) {
      this.timings['Retries'] = this.retries;
    }
    return { ...this.timings };
  }
}
