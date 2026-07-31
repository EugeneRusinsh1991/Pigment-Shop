/**
 * ThemeContext.js
 *
 * Owns app-wide theme (light/dark).
 * Persists user preference via crossPlatformStorage.
 */
import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { crossPlatformStorage } from '../utils/crossPlatformStorage';

const THEME_STORAGE_KEY = 'app_theme';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    return crossPlatformStorage.getItem(THEME_STORAGE_KEY) || 'light';
  });

  const setTheme = useCallback((newTheme) => {
    setThemeState((prev) => {
      const next = typeof newTheme === 'function' ? newTheme(prev) : newTheme;
      crossPlatformStorage.setItem(THEME_STORAGE_KEY, next);
      return next;
    });
  }, []);

  const isDark = theme === 'dark';
  const toggleTheme = useCallback(() => {
    setTheme((p) => (p === 'dark' ? 'light' : 'dark'));
  }, [setTheme]);

  const value = useMemo(() => ({ theme, isDark, toggleTheme, setTheme }), [theme, isDark, toggleTheme, setTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');

  return useMemo(() => ({
    ...ctx,
    ic: (dark, light) => (ctx.isDark ? dark : light),
  }), [ctx]);
}

export const getThemedValue = (isDark, dark, light) => (isDark ? dark : light);

