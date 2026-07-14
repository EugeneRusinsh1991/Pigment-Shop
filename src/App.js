/**
 * App.js
 *
 * Root entry point. Provides all feature contexts via AppProviders, then
 * renders AppShell which reads from those contexts directly — no prop drilling.
 *
 * AppGate blocks rendering of AppShell until the startup lifecycle contract
 * (src/bootstrap/startupContract.js) reaches a terminal state ('ready' or
 * 'failed'). Auth readiness is implicit: the startup orchestrator only begins
 * after auth has resolved, so the gate does not need to check auth.loading
 * separately.
 *
 * A 'failed' status is treated as a recoverable state — the app renders in
 * an unauthenticated shell rather than staying stuck in a loading state.
 */
import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AppProviders from './context/AppProviders';
import AppShell from './components/AppShell';
import AdminDashboard from './components/Admin/AdminDashboard';
import { useBootstrapStatus } from './bootstrap/useBootstrapStatus';
import { GATING_PENDING_STATES } from './bootstrap/startupContract';

/**
 * AppGate
 *
 * Renders a loading spinner while the startup lifecycle is pending.
 * Passes through when the lifecycle reaches 'ready' or 'failed'.
 *
 * This gate reads from a single source of truth — the startup contract status —
 * rather than combining auth state and bootstrap state independently.
 */
function AppGate({ children }) {
  const { status } = useBootstrapStatus();
  const isStartupPending = GATING_PENDING_STATES.includes(status);

  if (isStartupPending) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return children;
}

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <AppProviders>
      <AppGate>
        {showAdmin
          ? <AdminDashboard onClose={() => setShowAdmin(false)} />
          : <AppShell onOpenAdmin={() => setShowAdmin(true)} />
        }
      </AppGate>
    </AppProviders>
  );
}
