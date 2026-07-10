/**
 * ThemeContext.js
 *
 * Owns app-wide theme (light/dark) and language selection.
 * Previously inlined as `useThemeAndLang` inside App.js.
 */
import React, { createContext, useContext, useState } from 'react';
import { TRANSLATIONS } from '../data/translations';

const ThemeContext = createContext(null);

const getTranslation = (key, lang) => {
  const dicts = [TRANSLATIONS[lang], TRANSLATIONS.en, TRANSLATIONS.ru];
  const match = dicts.find((dict) => dict && dict[key] !== undefined);
  return match ? match[key] : key;
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [lang, setLang] = useState('ru');

  const isDark = theme === 'dark';
  const t = React.useMemo(() => {
    const tFunc = (key) => getTranslation(key, lang);

    const allKeys = new Set([
      ...Object.keys(TRANSLATIONS.ru || {}),
      ...Object.keys(TRANSLATIONS.en || {}),
      ...Object.keys(TRANSLATIONS[lang] || {}),
    ]);

    allKeys.forEach((key) => {
      tFunc[key] = getTranslation(key, lang);
    });

    return tFunc;
  }, [lang]);

  const toggleTheme = () => setTheme((p) => (p === 'dark' ? 'light' : 'dark'));
  const selectLanguage = (code) => setLang(code);

  return (
    <ThemeContext.Provider value={{ theme, isDark, lang, t, toggleTheme, selectLanguage }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
