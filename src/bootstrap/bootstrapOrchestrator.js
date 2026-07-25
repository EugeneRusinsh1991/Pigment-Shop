import { STARTUP_STEPS } from './startupContract';
import { visitorBootstrapService } from '../services/visitorBootstrap';
import { catalogSyncService } from '../data/catalogSync';

/**
 * Execute all application startup side effects.
 *
 * Drives the startup sequence from STARTUP_STEPS (startupContract.js).
 * Validates dependencies and processes failure semantics defined per-step.
 */

/** @type {Record<string, { start: (context: object) => Promise<void> | void, stop: () => void }>} */
const LIFECYCLE_SERVICES = {
  'visitor-session': visitorBootstrapService,
  'catalog-sync': {
    start: () => catalogSyncService.start({
      onListenerError: (source, err) => {
        if (err?.code !== 'permission-denied') {
          console.warn(`[catalogSync] listener error (${source}):`, err);
        }
      },
    }),
    stop: () => catalogSyncService.stop(),
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────

function validateStepDependencies(step, completedSteps) {
  if (!step.dependencies) return;

  for (const depId of step.dependencies) {
    if (completedSteps.has(depId)) continue;

    const depStep = STARTUP_STEPS.find((s) => s.id === depId);
    if (depStep?.required) {
      throw new Error(
        `Cannot execute step "${step.id}" because its required dependency "${depId}" did not complete successfully.`
      );
    }
  }
}

async function executeSingleStep(step, context, completedSteps) {
  validateStepDependencies(step, completedSteps);

  const service = LIFECYCLE_SERVICES[step.id];
  if (!service) {
    console.warn(`[bootstrapOrchestrator] No implementation service for step "${step.id}"`);
    return;
  }

  try {
    await service.start(context);
    completedSteps.add(step.id);
  } catch (err) {
    if (step.required) throw err;
    const semantics = step.failureSemantics;
    console[semantics.loggingLevel](
      `[bootstrapOrchestrator] ${semantics.description} (${step.id}):`,
      err
    );
  }
}

// ─── Orchestration ─────────────────────────────────────────────────────────────

export async function executeStartupSteps(context) {
  const completedSteps = new Set();
  for (const step of STARTUP_STEPS) {
    await executeSingleStep(step, context, completedSteps);
  }
}

/**
 * Stop all active startup lifecycle services.
 */
export function stopStartupSteps() {
  for (const step of STARTUP_STEPS) {
    const service = LIFECYCLE_SERVICES[step.id];
    if (service && typeof service.stop === 'function') {
      try {
        service.stop();
      } catch (err) {
        console.error(`[bootstrapOrchestrator] Error stopping service for step "${step.id}":`, err);
      }
    }
  }
}

// Deprecated in favor of stopStartupSteps; kept for backward compatibility
function stopCatalogSync() {
  stopStartupSteps();
}
