/**
 * AppProviders.js
 *
 * Composes all application-level context providers in the correct dependency
 * order. The root App component renders this once, keeping the app shell free
 * of any provider nesting or orchestration logic.
 *
 * Grouped into logical domain-specific wrappers with explicit boundaries.
 */
import React from 'react';
import { CatalogProvider } from './CatalogContext';
import { ThemeProvider } from './ThemeContext';
import { LanguageProvider } from './LanguageContext';
import { AuthProvider } from './AuthContext';
import { CartProvider } from './CartContext';
import { FavoritesProvider } from './FavoritesContext';
import BootstrapGate from '../bootstrap/BootstrapGate';

import { GlobalToastProvider } from './ToastContext';

/**
 * 1. Core infrastructure domain (independent of session/auth)
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
 * 2. Session/Authentication and Data Catalog domain
 */
export function SessionAndCatalogProviders({ children }) {
  return (
    <CatalogProvider>
      <AuthProvider>
        <BootstrapGate>
          {children}
        </BootstrapGate>
      </AuthProvider>
    </CatalogProvider>
  );
}

/**
 * 3. User features/Storefront context domain
 */
export function UserFeatureProviders({ children }) {
  return (
    <CartProvider>
      <FavoritesProvider>
        {children}
      </FavoritesProvider>
    </CartProvider>
  );
}


/**
 * Composes all provider boundaries in dependency order.
 */
export default function AppProviders({ children }) {
  return (
    <CoreInfrastructureProviders>
      <SessionAndCatalogProviders>
        <UserFeatureProviders>
          {children}
        </UserFeatureProviders>
      </SessionAndCatalogProviders>
    </CoreInfrastructureProviders>
  );
}
