/**
 * AppProviders.js
 *
 * Composes all application-level context providers in the correct dependency
 * order. The root App component renders this once, keeping the app shell free
 * of any provider nesting or orchestration logic.
 *
 * Dependency order (outermost → innermost):
 *   ThemeProvider        – theme + language (no dependencies)
 *     CatalogProvider      – product/category data (consumes ThemeContext for lang)
 *       AuthProvider       – auth state (no dependencies on other providers)
 *         BootstrapGate    – triggers app bootstrap coordinator after auth resolves
 *           CartProvider     – cart state (no dependencies)
 *             FavoritesProvider  – favorites state (no dependencies)
 *               UIMenuProvider   – lang/user menu visibility
 *                 NavigationProvider  – consumes CatalogContext + UIMenuContext
 *
 * This module is composition-only. Startup side effects are owned by
 * BootstrapGate (src/bootstrap/BootstrapGate.js) and the app bootstrap
 * coordinator (src/bootstrap/appBootstrap.js).
 */
import React from 'react';
import { CatalogProvider } from './CatalogContext';
import { ThemeProvider } from './ThemeContext';
import { AuthProvider } from './AuthContext';
import { CartProvider } from './CartContext';
import { FavoritesProvider } from './FavoritesContext';
import { UIMenuProvider } from './UIMenuContext';
import { NavigationProvider } from './NavigationContext';
import BootstrapGate from '../bootstrap/BootstrapGate';

export default function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <CatalogProvider>
        <AuthProvider>
          <BootstrapGate>
            <CartProvider>
              <FavoritesProvider>
                <UIMenuProvider>
                  <NavigationProvider>
                    {children}
                  </NavigationProvider>
                </UIMenuProvider>
              </FavoritesProvider>
            </CartProvider>
          </BootstrapGate>
        </AuthProvider>
      </CatalogProvider>
    </ThemeProvider>
  );
}
