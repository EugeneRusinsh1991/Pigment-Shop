/**
 * ThemeContext.js
 *
 * Owns app-wide theme (light/dark).
 * Integrates with LanguageContext to provide backward-compatible language exports.
 */
import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { useLanguage } from './LanguageContext';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const isDark = theme === 'dark';
  const toggleTheme = useCallback(() => setTheme((p) => (p === 'dark' ? 'light' : 'dark')), []);

  const value = useMemo(() => ({ theme, isDark, toggleTheme }), [theme, isDark, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  const { t, lang, selectLanguage } = useLanguage();

  return useMemo(() => ({
    ...ctx,
    t,
    lang,
    selectLanguage,
    ic: (dark, light) => (ctx.isDark ? dark : light),
  }), [ctx, t, lang, selectLanguage]);
}

export const getThemedValue = (isDark, dark, light) => isDark ? dark : light;
