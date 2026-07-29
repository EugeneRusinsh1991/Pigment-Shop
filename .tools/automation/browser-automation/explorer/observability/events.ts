export interface ElementMetadata {
  type: string;
  text: string;
  role: string;
  selector: string;
  id?: string;
  href?: string;
}

export interface ObservabilityEventBase {
  timestamp: number;
}

export interface ActionEvent extends ObservabilityEventBase {
  type: 'ACTION';
  element: ElementMetadata;
  pageUrl: string;
  durationMs: number;
  result: 'SUCCESS' | 'FAILED' | 'TIMEOUT' | 'RECOVERED' | 'SKIPPED' | 'BLOCKED';
}

export interface PickEvent extends ObservabilityEventBase {
  type: 'PICK';
  element: ElementMetadata;
  pageUrl: string;
  score?: number;
}

export interface SkipEvent extends ObservabilityEventBase {
  type: 'SKIP';
  element: ElementMetadata | { type: string, text: string }; 
  pageUrl: string;
  reason: string;
}

export interface NavigationEvent extends ObservabilityEventBase {
  type: 'NAVIGATION';
  sourceUrl: string;
  destinationUrl: string;
  routeDepth: number;
  durationMs: number;
  actuallyChanged: boolean;
  success: boolean;
  isBack?: boolean;
  domReadyDurationMs: number;
}

export interface ScanEvent extends ObservabilityEventBase {
  type: 'SCAN';
  pageUrl: string;
  interactiveElements: number;
  clickableElements: number;
  candidates: number;
  filtered: number;
  durationMs: number;
}

export interface SummaryEvent extends ObservabilityEventBase {
  type: 'SUMMARY';
  totalRuntimeMs: number;
  pagesVisited: number;
  domScans: number;
  elementsScanned: number;
  candidatesEvaluated: number;
  clicks: number;
  successfulNavigations: number;
  skipped: number;
  errors: number;
  averagePageTimeMs: number;
  averageClickTimeMs: number;
  slowestOperationName: string;
  slowestOperationMs: number;
}

export interface ErrorEvent extends ObservabilityEventBase {
  type: 'ERROR';
  message: string;
  stack?: string;
}

export interface WarningEvent extends ObservabilityEventBase {
  type: 'WARNING';
  message: string;
}

export type ObservabilityEvent = 
  | ActionEvent 
  | PickEvent 
  | SkipEvent 
  | NavigationEvent 
  | ScanEvent 
  | SummaryEvent
  | ErrorEvent
  | WarningEvent;
