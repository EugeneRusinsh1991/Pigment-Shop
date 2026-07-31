import { Slot, SplashScreen } from 'expo-router';
import React from 'react';
import AppProviders from '@/context/AppProviders';

SplashScreen.preventAutoHideAsync().catch(() => { });

let ManualBrowserInspector = null;
if (typeof __DEV__ !== 'undefined' && __DEV__) {
  try {
    ManualBrowserInspector = require('../.tools/automation/manual-browser-inspector/ManualBrowserInspector').default;
  } catch {
    ManualBrowserInspector = null;
  }
}

export default function Layout() {
  return (
    <AppProviders>
      <Slot />
      {ManualBrowserInspector ? <ManualBrowserInspector /> : null}
    </AppProviders>
  );
}

