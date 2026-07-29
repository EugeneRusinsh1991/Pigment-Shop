import { Slot, SplashScreen } from 'expo-router';
import React, { useEffect } from 'react';
import { GATING_PENDING_STATES } from '@/bootstrap/startupContract';
import { useBootstrapStatus } from '@/bootstrap/useBootstrapStatus';
import AppProviders from '@/context/AppProviders';
import { ErrorBoundary } from '@/components/ui/Feedback';
import ManualBrowserInspector from '../.tools/automation/manual-browser-inspector/ManualBrowserInspector';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync().catch(() => { });

export default function Layout() {
  const { status } = useBootstrapStatus();
  const isStartupPending = GATING_PENDING_STATES.includes(status);

  useEffect(() => {
    if (!isStartupPending) {
      SplashScreen.hideAsync().catch(() => { });
    }
  }, [isStartupPending]);

  return (
    <AppProviders>
      <ErrorBoundary>
        {!isStartupPending ? <Slot /> : null}
      </ErrorBoundary>
      {__DEV__ ? <ManualBrowserInspector /> : null}
    </AppProviders>
  );
}

