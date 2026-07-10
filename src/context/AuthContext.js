/**
 * AuthContext.js
 *
 * Owns authentication state (isAuthenticated, user, loading, bootstrapping).
 * This context is a PURE reactive state container:
 *   - It subscribes to Firebase auth state changes.
 *   - It exposes auth actions (login, register, signInWithGoogle, logout).
 *   - It does NOT perform any visitor sign-in or account-creation side effects.
 *
 * Visitor-session bootstrap is handled explicitly by the BootstrapGate in
 * AppProviders.js, which calls visitorBootstrap.js after auth resolves.
 */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { auth } from '../firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

const AuthContext = createContext(null);

/** Email used by the anonymous visitor account — used only to mask it from the UI. */
const VISITOR_EMAIL = 'visitor@pigment-shop.com';

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  /**
   * `bootstrapping` is true while the BootstrapGate is running a visitor
   * sign-in attempt. UI should treat (loading || bootstrapping) as "not ready".
   */
  const [bootstrapping, setBootstrapping] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const isVisitor = firebaseUser.email === VISITOR_EMAIL;
        // Visitor account is a technical session — do not expose it as a real user.
        setUser(isVisitor ? null : firebaseUser);
        setIsAuthenticated(!isVisitor);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  /** Called by BootstrapGate before starting the visitor session attempt. */
  const markBootstrapping = useCallback(() => setBootstrapping(true), []);

  /** Called by BootstrapGate after the visitor session attempt completes (success or fail). */
  const markBootstrapDone = useCallback(() => setBootstrapping(false), []);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (err) {
      console.error('Firebase Auth Error:', err);
      throw err;
    }
  };

  const register = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      return true;
    } catch (err) {
      console.error('Firebase Auth Error:', err);
      throw err;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      return true;
    } catch (err) {
      console.error('Firebase Google Auth Error:', err);
      throw err;
    }
  };

  const logout = async () => {
    if (!user && isAuthenticated) {
      setIsAuthenticated(false);
      return;
    }
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        bootstrapping,
        markBootstrapping,
        markBootstrapDone,
        login,
        logout,
        register,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
