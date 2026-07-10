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
 *         BootstrapGate    – explicit visitor-session bootstrap after auth resolves
 *           CartProvider     – cart state (no dependencies)
 *             FavoritesProvider  – favorites state (no dependencies)
 *               UIMenuProvider   – lang/user menu visibility
 *                 NavigationProvider  – consumes CatalogContext + UIMenuContext
 *
 * BootstrapGate is a lightweight inner component that:
 *   1. Waits for AuthProvider to finish its Firebase auth resolution (loading).
 *   2. If no user is present, calls bootstrapVisitorSession() explicitly.
 *   3. Signals bootstrapping start/end via markBootstrapping/markBootstrapDone
 *      so the rest of the app can distinguish "settling" from "unauthenticated".
 */
import React, { useEffect, useRef } from 'react';
import { CatalogProvider } from './CatalogContext';
import { ThemeProvider } from './ThemeContext';
import { AuthProvider } from './AuthContext';
import { CartProvider } from './CartContext';
import { FavoritesProvider } from './FavoritesContext';
import { UIMenuProvider } from './UIMenuContext';
import { NavigationProvider } from './NavigationContext';
import { useAuth } from './AuthContext';
import { initCatalogSync } from '../data/catalogSync';
import { bootstrapVisitorSession } from '../services/visitorBootstrap';

// Start the Firestore category listener (auth-aware) at app bootstrap.
// Called once — subsequent calls are no-ops.
initCatalogSync();

/**
 * BootstrapGate
 *
 * Renders its children immediately (no blocking render). Runs the visitor
 * bootstrap asynchronously in the background once the auth state has resolved
 * and no real user session is present. The bootstrapping flag in AuthContext
 * is toggled around the attempt so the UI can respond if needed.
 */
function BootstrapGate({ children }) {
  const { loading, user, isAuthenticated, markBootstrapping, markBootstrapDone } = useAuth();
  const hasBootstrapped = useRef(false);

  useEffect(() => {
    // Wait until Firebase auth has fully resolved.
    if (loading) return;
    // Only bootstrap if there is no real user and we haven't run yet this session.
    if (isAuthenticated || user || hasBootstrapped.current) return;

    hasBootstrapped.current = true;

    (async () => {
      markBootstrapping();
      const { success, error } = await bootstrapVisitorSession();
      if (!success) {
        console.warn('[BootstrapGate] Visitor bootstrap failed — app will run unauthenticated:', error);
      }
      markBootstrapDone();
    })();
  }, [loading, isAuthenticated, user, markBootstrapping, markBootstrapDone]);

  return children;
}

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
