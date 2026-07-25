export interface ExplorerReport {
  startTime: number;
  endTime: number;
  durationMs: number;
  visitedScreens: string[];
  visitedElements: string[];
  successfulInteractions: number;
  failedInteractions: number;
  skippedInteractions: number;
  warnings: string[];
  errors: string[];
}
