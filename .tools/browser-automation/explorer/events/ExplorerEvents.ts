import { ExplorerContext } from '../ExplorerContext';
import { IWebPage } from '../driver/DriverInterfaces';
import { ElementMetadata } from './observability/events';

export interface ExplorerEventBase {
  context: ExplorerContext;
  timestamp: number;
}

export interface ExplorerStartedEvent extends ExplorerEventBase {
  page: IWebPage;
}
export interface ExplorerFinishedEvent extends ExplorerEventBase {}
export interface ScreenDiscoveredEvent extends ExplorerEventBase {}
export interface ScreenEnteredEvent extends ExplorerEventBase {}
export interface ScreenExitedEvent extends ExplorerEventBase {}

export interface ElementDiscoveredEvent extends ExplorerEventBase {
  elementsCount: number;
  clickableElements: number;
  candidates: number;
  filtered: number;
  durationMs: number;
}

export interface BeforeInteractionEvent extends ExplorerEventBase {
  elementIdentifier: string;
  metadata?: ElementMetadata;
}

export interface AfterInteractionEvent extends ExplorerEventBase {
  elementIdentifier: string;
  success: boolean;
  metadata?: ElementMetadata;
}

export interface NavigationStartedEvent extends ExplorerEventBase {
  targetUrl: string;
}

export interface NavigationCompletedEvent extends ExplorerEventBase {
  newUrl: string;
  durationMs: number;
  routeDepth: number;
  actuallyChanged: boolean;
  domReadyDurationMs: number;
}

export interface NavigationFailedEvent extends ExplorerEventBase {
  error: string;
}

export interface BackNavigationEvent extends ExplorerEventBase {
  targetUrl: string;
  success: boolean;
  durationMs: number;
  routeDepth: number;
}

export interface WarningEvent extends ExplorerEventBase {
  message: string;
}

export interface ErrorEvent extends ExplorerEventBase {
  error: string;
}

export interface InteractionPhaseChangedEvent extends ExplorerEventBase {
  phase: string;
  elementIdentifier: string;
  url: string;
}

export interface InteractionCompletedEvent extends ExplorerEventBase {
  elementIdentifier: string;
  result: 'SUCCESS' | 'FAILED' | 'TIMEOUT' | 'RECOVERED' | 'SKIPPED' | 'BLOCKED';
  reason?: string;
  timing: Record<string, number>;
  metadata?: ElementMetadata;
}

export interface RecoveryStartedEvent extends ExplorerEventBase {
  expectedStateId: string;
}

export interface RecoveryCompletedEvent extends ExplorerEventBase {
  success: boolean;
}

export interface WatchdogWarningEvent extends ExplorerEventBase {
  url: string;
  elementIdentifier: string;
  phase: string;
  elapsedMs: number;
  recoveryRunning: boolean;
}

export interface LongInteractionWarningEvent extends ExplorerEventBase {
  url: string;
  elementIdentifier: string;
  phase: string;
  elapsedMs: number;
}

export interface DecisionMadeEvent extends ExplorerEventBase {
  decision: string;
  reason: string;
  contextData?: Record<string, any>;
  metadata?: ElementMetadata;
  targetIdentifier?: string;
}

export interface ScreenSummaryEvent extends ExplorerEventBase {
  url: string;
  stats: {
    visited: number;
    representatives: number;
    skipped: number;
    recoveries: number;
    errors: number;
    durationMs: number;
  };
}

export interface ExecutionSummaryEvent extends ExplorerEventBase {
  stats: {
    visitedRegions: number;
    visitedPages: number;
    visitedStates: number;
    representatives: number;
    skipped: number;
    recoveries: number;
    errors: number;
    durationMs: number;
  };
}

export interface ExplorerEventMap {
  ExplorerStarted: ExplorerStartedEvent;
  ExplorerFinished: ExplorerFinishedEvent;
  ScreenDiscovered: ScreenDiscoveredEvent;
  ScreenEntered: ScreenEnteredEvent;
  ScreenExited: ScreenExitedEvent;
  ElementDiscovered: ElementDiscoveredEvent;
  BeforeInteraction: BeforeInteractionEvent;
  AfterInteraction: AfterInteractionEvent;
  NavigationStarted: NavigationStartedEvent;
  NavigationCompleted: NavigationCompletedEvent;
  NavigationFailed: NavigationFailedEvent;
  BackNavigation: BackNavigationEvent;
  Warning: WarningEvent;
  Error: ErrorEvent;
  InteractionPhaseChanged: InteractionPhaseChangedEvent;
  InteractionCompleted: InteractionCompletedEvent;
  RecoveryStarted: RecoveryStartedEvent;
  RecoveryCompleted: RecoveryCompletedEvent;
  WatchdogWarning: WatchdogWarningEvent;
  LongInteractionWarning: LongInteractionWarningEvent;
  DecisionMade: DecisionMadeEvent;
  ScreenSummary: ScreenSummaryEvent;
  ExecutionSummary: ExecutionSummaryEvent;
}

export type ExplorerEventType = keyof ExplorerEventMap;
