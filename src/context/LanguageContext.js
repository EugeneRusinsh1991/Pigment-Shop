/**
 * LanguageContext.js
 *
 * Owns app-wide language selection and provides translation functions.
 */
import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { TRANSLATIONS } from '../data/translations';

const LanguageContext = createContext(null);

const getTranslation = (key, lang, params) => {
  const dicts = [TRANSLATIONS[lang], TRANSLATIONS.en, TRANSLATIONS.ru];
  const match = dicts.find((dict) => dict && dict[key] !== undefined);
  if (!match) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[i18n] Missing translation key "${key}" for language "${lang}".`);
    }
    return key;
  }
  let res = match[key];
  if (params && typeof params === 'object' && typeof res === 'string') {
    Object.keys(params).forEach((paramKey) => {
      res = res.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), params[paramKey]);
    });
  }
  return res;
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('ru');

  const t = useCallback(
    (key, params) => getTranslation(key, lang, params),
    [lang]
  );

  const selectLanguage = useCallback((code) => setLang(code), []);

  const value = useMemo(() => ({ lang, t, selectLanguage }), [lang, t, selectLanguage]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
