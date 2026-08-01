/**
 * AppProviders.js
 *
 * Composes application-level infrastructure providers (Theme, Language, Toast, Auth, Bootstrap)
 * in dependency order. Feature-level providers (Storefront domain) are isolated in StorefrontProviders.
 */
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BootstrapGate from '../bootstrap/BootstrapGate';
import StorefrontProviders from '../features/shell/StorefrontProviders';
import { AuthProvider } from './AuthContext';
import { LanguageProvider } from './LanguageContext';
import { ThemeProvider } from './ThemeContext';
import { GlobalToastProvider } from './ToastContext';

import { PullToRefreshProvider } from '../features/shell/PullToRefreshContext';

/**
 * 1. Core infrastructure domain (Theme, Language, Toast, PullToRefresh)
 */
function CoreInfrastructureProviders({ children }) {
  return (
    <PullToRefreshProvider>
      <LanguageProvider>
        <ThemeProvider>
          <GlobalToastProvider>
            {children}
          </GlobalToastProvider>
        </ThemeProvider>
      </LanguageProvider>
    </PullToRefreshProvider>
  );
}

/**
 * 2. Session and Authentication domain
 */
function SessionProviders({ children }) {
  return (
    <AuthProvider>
      <BootstrapGate>
        {children}
      </BootstrapGate>
    </AuthProvider>
  );
}

/**
 * Composes root infrastructure and feature provider boundaries in dependency order.
 */
export default function AppProviders({ children }) {
  return (
    <SafeAreaProvider>
      <CoreInfrastructureProviders>
        <SessionProviders>
          <StorefrontProviders>
            {children}
          </StorefrontProviders>
        </SessionProviders>
      </CoreInfrastructureProviders>
    </SafeAreaProvider>
  );
}

