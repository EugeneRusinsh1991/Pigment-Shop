import { ExplorerConfig, defaultConfig } from '../ExplorerConfig';
import { BoundedSet, BoundedMap } from '../utils/BoundedCollections';
import { NavigationTracker } from '../NavigationTracker';
import { ElementScanner } from '../ElementScanner';
import { ElementInteractor } from '../ElementInteractor';
import { InteractionPolicyEngine } from '../policy/InteractionPolicyEngine';
import { ExplorerEventEmitter } from '../events/ExplorerEventEmitter';
import { ExplorerContext } from '../ExplorerContext';
import { ActionDepthTracker } from '../ActionDepthTracker';
import { ReadinessManager } from '../ReadinessManager';
import { ExecutionStateGraph } from '../graph/ExecutionStateGraph';
import { ExecutionWatchdog } from '../diagnostics/ExecutionWatchdog';
import { StateCacheManager } from '../StateCacheManager';
import { NavigationHandler } from '../NavigationHandler';
import { StateRecoveryManager } from '../StateRecoveryManager';
import { InteractionProcessor } from '../InteractionProcessor';
import { ObservabilityManager } from '../observability/ObservabilityManager';
import { ConsoleReporter } from '../observability/reporters/ConsoleReporter';
import { JsonReporter } from '../observability/reporters/JsonReporter';
import { MarkdownReporter } from '../observability/reporters/MarkdownReporter';

export interface DIContainer {
  config: ExplorerConfig;
  emitter: ExplorerEventEmitter;
  context: ExplorerContext;
  tracker: NavigationTracker;
  scanner: ElementScanner;
  interactor: ElementInteractor;
  policyEngine: InteractionPolicyEngine;
  actionTracker: ActionDepthTracker;
  readiness: ReadinessManager;
  stateGraph: ExecutionStateGraph;
  watchdog: ExecutionWatchdog;
  cacheManager: StateCacheManager;
  navHandler: NavigationHandler;
  recoveryManager: StateRecoveryManager;
  interactionProcessor: InteractionProcessor;
  observability: ObservabilityManager;
}

export function createDefaultContainer(
  emitter: ExplorerEventEmitter, 
  partialConfig: Partial<ExplorerConfig> = {}
): DIContainer {
  const config = { ...defaultConfig, ...partialConfig };
  
  const context: ExplorerContext = {
    currentScreen: '',
    navigationHistory: [],
    currentDepth: 0,
    interactionCount: 0,
    visitedScreens: new BoundedSet<string>(1000),
    visitedElements: new BoundedSet<string>(10000),
    elementDepths: new BoundedMap<string, number>(10000),
    startTime: Date.now()
  };

  const tracker = new NavigationTracker();
  const scanner = new ElementScanner();
  const interactor = new ElementInteractor();
  const policyEngine = new InteractionPolicyEngine(config.interactionPolicyConfig);
  const actionTracker = new ActionDepthTracker();
  const readiness = new ReadinessManager();
  const stateGraph = new ExecutionStateGraph();
  
  const watchdog = new ExecutionWatchdog(emitter, context, config);
  const cacheManager = new StateCacheManager(scanner, stateGraph);
  
  const navHandler = new NavigationHandler(
    emitter, context, readiness, stateGraph, cacheManager
  );
  
  const recoveryManager = new StateRecoveryManager(
    emitter, context, stateGraph, watchdog, interactor, cacheManager
  );
  
  const interactionProcessor = new InteractionProcessor(
    emitter, context, tracker, actionTracker, interactor, watchdog, recoveryManager, cacheManager, config.maxInteractions
  );

  const observability = new ObservabilityManager(emitter);
  observability.addReporter(new ConsoleReporter());
  observability.addReporter(new JsonReporter());
  observability.addReporter(new MarkdownReporter());

  return {
    config, emitter, context, tracker, scanner, interactor, policyEngine, 
    actionTracker, readiness, stateGraph, watchdog, cacheManager, navHandler, 
    recoveryManager, interactionProcessor, observability
  };
}
