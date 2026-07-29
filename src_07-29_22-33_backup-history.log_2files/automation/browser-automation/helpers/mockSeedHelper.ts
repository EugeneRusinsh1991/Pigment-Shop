/**
 * mockSeedHelper.ts
 *
 * Utilities for running E2E / Playwright smoke tests against the deterministic
 * mock data layer (EXPO_PUBLIC_USE_MOCKS=true) instead of live Firebase.
 *
 * Usage:
 *   import { withMockMode, assertMockMode } from './helpers/mockSeedHelper';
 *   withMockMode(); // call before launching the dev server
 */

export interface MockSeedOptions {
  /** Simulated network delay in ms (mirrors mockFactories.delay default = 200). Default: 200 */
  delayMs?: number;
  /** Force error simulation mode in mockCatalogRepository. Default: false */
  simulateErrors?: boolean;
}

/**
 * Activates mock mode for the current process by setting the EXPO_PUBLIC_USE_MOCKS
 * environment variable. Must be called before the Expo dev server starts so that
 * the bundler picks up the flag at build time.
 */
export function withMockMode(options: MockSeedOptions = {}): void {
  process.env.EXPO_PUBLIC_USE_MOCKS = 'true';

  if (options.delayMs !== undefined) {
    process.env.EXPO_PUBLIC_MOCK_DELAY_MS = String(options.delayMs);
  }

  if (options.simulateErrors) {
    process.env.EXPO_PUBLIC_MOCK_SIMULATE_ERRORS = 'true';
  }

  console.log('[mockSeedHelper] Mock mode activated:', {
    EXPO_PUBLIC_USE_MOCKS: process.env.EXPO_PUBLIC_USE_MOCKS,
    EXPO_PUBLIC_MOCK_DELAY_MS: process.env.EXPO_PUBLIC_MOCK_DELAY_MS ?? '(default 200ms)',
    EXPO_PUBLIC_MOCK_SIMULATE_ERRORS: process.env.EXPO_PUBLIC_MOCK_SIMULATE_ERRORS ?? 'false',
  });
}

/**
 * Deactivates mock mode (restores live Firebase). Use between test suites if needed.
 */
export function withLiveMode(): void {
  process.env.EXPO_PUBLIC_USE_MOCKS = 'false';
  delete process.env.EXPO_PUBLIC_MOCK_DELAY_MS;
  delete process.env.EXPO_PUBLIC_MOCK_SIMULATE_ERRORS;
  console.log('[mockSeedHelper] Live mode restored.');
}

/**
 * Throws if mock mode is not active. Use as a guard at the top of mock-only tests.
 */
export function assertMockMode(): void {
  if (process.env.EXPO_PUBLIC_USE_MOCKS !== 'true') {
    throw new Error(
      '[mockSeedHelper] This test requires EXPO_PUBLIC_USE_MOCKS=true. ' +
      'Call withMockMode() before starting the dev server.'
    );
  }
}

/**
 * Returns whether mock mode is currently active.
 */
export function isMockMode(): boolean {
  return process.env.EXPO_PUBLIC_USE_MOCKS === 'true';
}
