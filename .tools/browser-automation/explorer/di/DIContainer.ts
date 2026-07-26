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

export interface DIFactoryOverrides {
  tracker?: NavigationTracker;
  scanner?: ElementScanner;
  interactor?: ElementInteractor;
  policyEngine?: InteractionPolicyEngine;
  actionTracker?: ActionDepthTracker;
  readiness?: ReadinessManager;
  stateGraph?: ExecutionStateGraph;
  watchdog?: ExecutionWatchdog;
  cacheManager?: StateCacheManager;
  navHandler?: NavigationHandler;
  recoveryManager?: StateRecoveryManager;
  interactionProcessor?: InteractionProcessor;
  observability?: ObservabilityManager;
  createInteractionProcessor?: (
    emitter: ExplorerEventEmitter,
    context: ExplorerContext,
    tracker: NavigationTracker,
    actionTracker: ActionDepthTracker,
    interactor: ElementInteractor,
    watchdog: ExecutionWatchdog,
    recoveryManager: StateRecoveryManager,
    cacheManager: StateCacheManager,
    maxInteractions: number,
    navHandler: NavigationHandler
  ) => InteractionProcessor;
}

import { AutomationScreenshotListener } from '../observability/AutomationScreenshotListener';

function createExplorerContext(): ExplorerContext {
  return {
    currentScreen: '',
    navigationHistory: [],
    currentDepth: 0,
    interactionCount: 0,
    visitedScreens: new BoundedSet<string>(1000),
    visitedElements: new BoundedSet<string>(10000),
    elementDepths: new BoundedMap<string, number>(10000),
    startTime: Date.now()
  };
}

function createCoreServices(
  emitter: ExplorerEventEmitter,
  context: ExplorerContext,
  config: ExplorerConfig,
  overrides: DIFactoryOverrides
) {
  const tracker = overrides.tracker ?? new NavigationTracker(context);
  const scanner = overrides.scanner ?? new ElementScanner();
  const interactor = overrides.interactor ?? new ElementInteractor(config);
  const policyEngine = overrides.policyEngine ?? new InteractionPolicyEngine(config.interactionPolicyConfig);
  const actionTracker = overrides.actionTracker ?? new ActionDepthTracker();
  const readiness = overrides.readiness ?? new ReadinessManager(config);
  const stateGraph = overrides.stateGraph ?? new ExecutionStateGraph();
  const watchdog = overrides.watchdog ?? new ExecutionWatchdog(emitter, context, config);
  const cacheManager = overrides.cacheManager ?? new StateCacheManager(scanner, stateGraph);
  const navHandler = overrides.navHandler ?? new NavigationHandler(emitter, context, readiness, stateGraph, cacheManager);
  const recoveryManager = overrides.recoveryManager ?? new StateRecoveryManager(emitter, context, stateGraph, watchdog, interactor, cacheManager);
  return { tracker, scanner, interactor, policyEngine, actionTracker, readiness, stateGraph, watchdog, cacheManager, navHandler, recoveryManager };
}

function createInteractionProcessorInstance(
  emitter: ExplorerEventEmitter,
  context: ExplorerContext,
  config: ExplorerConfig,
  overrides: DIFactoryOverrides,
  services: ReturnType<typeof createCoreServices>
): InteractionProcessor {
  const { tracker, actionTracker, interactor, watchdog, recoveryManager, cacheManager, navHandler } = services;
  if (overrides.interactionProcessor) return overrides.interactionProcessor;
  if (overrides.createInteractionProcessor) {
    return overrides.createInteractionProcessor(emitter, context, tracker, actionTracker, interactor, watchdog, recoveryManager, cacheManager, config.maxInteractions, navHandler);
  }
  return new InteractionProcessor(emitter, context, tracker, actionTracker, interactor, watchdog, recoveryManager, cacheManager, config.maxInteractions, navHandler);
}

function createObservability(emitter: ExplorerEventEmitter, config: ExplorerConfig, override?: ObservabilityManager): ObservabilityManager {
  if (override) return override;
  const obs = new ObservabilityManager(emitter);
  obs.addReporter(new ConsoleReporter());
  if (config.executionMode === 'deep-diagnostics') obs.addReporter(new JsonReporter());
  obs.addReporter(new MarkdownReporter());
  return obs;
}

export function createDefaultContainer(
  emitter: ExplorerEventEmitter,
  partialConfig: Partial<ExplorerConfig> = {},
  overrides: DIFactoryOverrides = {}
): DIContainer {
  const config = { ...defaultConfig, ...partialConfig };
  new AutomationScreenshotListener(emitter);
  const context = createExplorerContext();
  const services = createCoreServices(emitter, context, config, overrides);
  const interactionProcessor = createInteractionProcessorInstance(emitter, context, config, overrides, services);
  const observability = createObservability(emitter, config, overrides.observability);
  return { config, emitter, context, ...services, interactionProcessor, observability };
}
