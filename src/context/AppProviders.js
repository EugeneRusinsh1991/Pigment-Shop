/**
 * AppProviders.js
 *
 * Composes application-level infrastructure providers (Theme, Language, Toast, Auth, Bootstrap)
 * in dependency order. Feature-level providers (Storefront domain) are isolated in StorefrontProviders.
 */
import React from 'react';
import BootstrapGate from '../bootstrap/BootstrapGate';
import StorefrontProviders from '../features/shell/StorefrontProviders';
import { AuthProvider } from './AuthContext';
import { LanguageProvider } from './LanguageContext';
import { ThemeProvider } from './ThemeContext';
import { GlobalToastProvider } from './ToastContext';

/**
 * 1. Core infrastructure domain (Theme, Language, Toast)
 */
export function CoreInfrastructureProviders({ children }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <GlobalToastProvider>
          {children}
        </GlobalToastProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

/**
 * 2. Session and Authentication domain
 */
export function SessionProviders({ children }) {
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
    <CoreInfrastructureProviders>
      <SessionProviders>
        <StorefrontProviders>
          {children}
        </StorefrontProviders>
      </SessionProviders>
    </CoreInfrastructureProviders>
  );
}

