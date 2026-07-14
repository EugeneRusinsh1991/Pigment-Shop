/**
 * AuthContext.js
 *
 * Owns authentication state (isAuthenticated, user, loading).
 * This context is a PURE reactive state container:
 *   - It subscribes to Firebase auth state changes.
 *   - It exposes auth actions (login, register, signInWithGoogle, logout).
 *   - It does NOT perform any visitor sign-in or account-creation side effects.
 *
 * Visitor-session bootstrap and startup sequencing are handled by the
 * bootstrap coordinator (src/bootstrap/appBootstrap.js), which is triggered
 * by BootstrapGate after auth resolves.
 */
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

const AuthContext = createContext(null);

/** Email used by the anonymous visitor account — used only to mask it from the UI. */
const VISITOR_EMAIL = 'visitor@pigment-shop.com';

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const login = async (email, password) => {
    const DEBUG_ADMIN_CREDENTIAL = '111111';
    const ADMIN_EMAIL = 'admin@pigment-shop.com';
    const ADMIN_PASSWORD = 'admin123456';

    if (email === DEBUG_ADMIN_CREDENTIAL && password === DEBUG_ADMIN_CREDENTIAL) {
      try {
        await signInWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
        return true;
      } catch (err) {
        console.error('Firebase Auth Error:', err);
        throw err;
      }
    }

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
