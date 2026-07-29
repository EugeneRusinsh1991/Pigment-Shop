/**
 * AuthContext.js
 *
 * Owns authentication state (isAuthenticated, user, loading).
 * This context is a PURE reactive state container:
 *   - It subscribes to authService changes.
 *   - It exposes auth actions (login, register, signInWithGoogle, logout).
 *   - It does NOT perform any visitor sign-in or account-creation side effects.
 *
 * Visitor-session bootstrap and startup sequencing are handled by the
 * bootstrap coordinator (src/bootstrap/appBootstrap.js), which is triggered
 * by BootstrapGate after auth resolves.
 */
import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { authService } from '../services/authService';
import { shouldTreatAsAuthenticated, resolveUserSession } from '../services/authPolicy';
import { UserProfileSchema, parseWithFallback } from '../domain';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = authService.subscribeToAuthChanges((firebaseUser) => {
      const resolved = resolveUserSession(firebaseUser);
      const safeUser = resolved ? parseWithFallback(UserProfileSchema.partial(), resolved, resolved) : null;
      setUser(safeUser);
      setIsAuthenticated(shouldTreatAsAuthenticated(firebaseUser));
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = useCallback(async (email, password) => {
    const result = await authService.login(email, password);
    // Suppress console.error here to avoid React Native LogBox popups for expected failures
    return result;
  }, []);

  const register = useCallback(async (email, password) => {
    const result = await authService.register(email, password);
    return result;
  }, []);

  const signInWithGoogle = useCallback(async () => {
    const result = await authService.signInWithGoogle();
    if (!result.success) {
      const err = result.error;
      if (err?.code !== 'auth/cancelled-popup-request' && err?.code !== 'auth/popup-closed-by-user') {
        console.warn('Firebase Google Auth Error:', err);
      }
    }
    return result;
  }, []);

  const logout = useCallback(async () => {
    if (!user && isAuthenticated) {
      setIsAuthenticated(false);
      return { success: true };
    }
    const result = await authService.logout();
    if (!result.success) {
      console.warn('Logout failed:', result.error);
    }
    return result;
  }, [user, isAuthenticated]);

  const value = useMemo(() => ({
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    register,
    signInWithGoogle,
  }), [isAuthenticated, user, loading, login, logout, register, signInWithGoogle]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
