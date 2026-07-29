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

export type DIFactoryOverrides = Partial<Omit<DIContainer, 'config' | 'emitter' | 'context'>> & {
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
};

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

function resolveService<T>(value: T | undefined, fallback: () => T): T {
  return value !== undefined ? value : fallback();
}

function createBaseServices(context: ExplorerContext, config: ExplorerConfig, overrides: DIFactoryOverrides) {
  return {
    tracker: resolveService(overrides.tracker, () => new NavigationTracker(context)),
    scanner: resolveService(overrides.scanner, () => new ElementScanner()),
    interactor: resolveService(overrides.interactor, () => new ElementInteractor(config)),
    policyEngine: resolveService(overrides.policyEngine, () => new InteractionPolicyEngine(config.interactionPolicyConfig)),
    actionTracker: resolveService(overrides.actionTracker, () => new ActionDepthTracker()),
    readiness: resolveService(overrides.readiness, () => new ReadinessManager(config)),
    stateGraph: resolveService(overrides.stateGraph, () => new ExecutionStateGraph())
  };
}

function createExtendedServices(
  emitter: ExplorerEventEmitter,
  context: ExplorerContext,
  config: ExplorerConfig,
  overrides: DIFactoryOverrides,
  base: ReturnType<typeof createBaseServices>
) {
  const watchdog = overrides.watchdog ?? new ExecutionWatchdog(emitter, context, config);
  const cacheManager = overrides.cacheManager ?? new StateCacheManager(base.scanner, base.stateGraph);
  const navHandler = overrides.navHandler ?? new NavigationHandler(emitter, context, base.readiness, base.stateGraph, cacheManager);
  const recoveryManager = overrides.recoveryManager ?? new StateRecoveryManager(emitter, context, base.stateGraph, watchdog, base.interactor, cacheManager);
  return { watchdog, cacheManager, navHandler, recoveryManager };
}

function createCoreServices(
  emitter: ExplorerEventEmitter,
  context: ExplorerContext,
  config: ExplorerConfig,
  overrides: DIFactoryOverrides
) {
  const base = createBaseServices(context, config, overrides);
  const extended = createExtendedServices(emitter, context, config, overrides, base);
  return { ...base, ...extended };
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
