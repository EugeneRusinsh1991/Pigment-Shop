/**
 * authBootstrapCoordinator.js
 *
 * Coordinates identity resolution (authentication state) and application startup
 * decisions. Accepts resolved auth state as input and returns explicit startup
 * instructions, decoupling the UI/Auth layer from the bootstrap orchestrator.
 */

export function resolveBootstrapDecision(auth) {
  const { loading, user, isAuthenticated } = auth || {};

  // Determine if authentication state has resolved sufficiently to boot the app
  const isAuthResolved = !loading;

  return {
    shouldStart: isAuthResolved,
    isAuthenticated: !!isAuthenticated,
    user: user || null,
  };
}
