/**
 * BootstrapGate.js
 *
 * Auth-to-orchestrator bridge.
 *
 * Responsibility:
 *   Wait for Firebase auth to resolve, then delegate to the central startup
 *   orchestrator (startAppBootstrap) exactly once per session.
 *
 * This is a headless trigger component — it does not render any loading UI.
 * UI gating is owned exclusively by AppGate in App.js, which subscribes to
 * the startup contract status via useBootstrapStatus.
 *
 * Decoupled from direct authentication details via resolveBootstrapDecision.
 */
import React, { useEffect, useRef, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { startAppBootstrap } from './appBootstrap';
import { resolveBootstrapDecision } from './authBootstrapCoordinator';

export default function BootstrapGate({ children }) {
  const auth = useAuth();
  const decision = useMemo(() => resolveBootstrapDecision(auth), [auth]);
  const hasBootstrapped = useRef(false);

  useEffect(() => {
    if (!decision.shouldStart) return;
    if (hasBootstrapped.current) return;

    hasBootstrapped.current = true;
    startAppBootstrap({
      isAuthenticated: decision.isAuthenticated,
      user: decision.user,
    });
  }, [decision]);

  return children;
}
