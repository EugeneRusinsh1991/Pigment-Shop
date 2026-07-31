import { Slot, SplashScreen } from 'expo-router';
import React from 'react';
import AppProviders from '@/context/AppProviders';

SplashScreen.preventAutoHideAsync().catch(() => { });

export default function Layout() {
  return (
    <AppProviders>
      <Slot />
    </AppProviders>
  );
}

