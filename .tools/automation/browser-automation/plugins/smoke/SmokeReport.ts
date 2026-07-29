export interface SmokeFailure {
  screen: string;
  interaction: string;
  elementIdentifier: string;
  event: string;
  timestamp: number;
  errorType: string;
  errorMessage: string;
  stackTrace?: string;
}

export interface SmokeReport {
  summary: {
    visitedScreens: number;
    visitedInteractions: number;
    successfulInteractions: number;
    failedInteractions: number;
    warnings: number;
    errors: number;
    executionDurationMs: number;
  };
  failures: SmokeFailure[];
  warnings: SmokeFailure[];
}
