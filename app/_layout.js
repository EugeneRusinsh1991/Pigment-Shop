import { Slot, SplashScreen } from 'expo-router';
import React from 'react';
import AppProviders from '@/context/AppProviders';
import ManualBrowserInspector from '../.tools/automation/manual-browser-inspector/ManualBrowserInspector';

SplashScreen.preventAutoHideAsync().catch(() => { });

export default function Layout() {
  return (
    <AppProviders>
      <Slot />
      <ManualBrowserInspector />
    </AppProviders>
  );
}

