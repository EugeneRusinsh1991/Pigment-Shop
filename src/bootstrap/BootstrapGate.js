/**
 * BootstrapGate.js
 *
 * Auth-to-orchestrator bridge.
 *
 * Responsibility:
 *   Wait for Firebase auth to resolve, then delegate to the central startup
 *   orchestrator (startAppBootstrap) exactly once per session.
 *
 * This component does NOT coordinate startup logic directly.
 * All startup sequencing is owned by the orchestrator (appBootstrap.js).
 * UI readiness is determined by the startup contract, not by this component.
 *
 * Rendering:
 *   Children are rendered unconditionally — this component does not gate
 *   the UI. The app shell gate (AppGate in App.js) reads startup status
 *   from useBootstrapStatus() and manages the loading/ready transition.
 */
import React, { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { startAppBootstrap } from './appBootstrap';

export default function BootstrapGate({ children }) {
  const { loading, user, isAuthenticated } = useAuth();
  const hasBootstrapped = useRef(false);

  useEffect(() => {
    // Do not proceed until Firebase auth has fully resolved.
    if (loading) return;
    // Delegate to the orchestrator exactly once per session.
    if (hasBootstrapped.current) return;

    hasBootstrapped.current = true;
    startAppBootstrap({ isAuthenticated, user });
  }, [loading, isAuthenticated, user]);

  return children;
}
