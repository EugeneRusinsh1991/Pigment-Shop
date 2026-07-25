/**
 * LanguageContext.js
 *
 * Owns app-wide language selection and provides translation functions.
 */
import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { TRANSLATIONS } from '../data/translations';

const LanguageContext = createContext(null);

const getTranslation = (key, lang) => {
  const dicts = [TRANSLATIONS[lang], TRANSLATIONS.en, TRANSLATIONS.ru];
  const match = dicts.find((dict) => dict && dict[key] !== undefined);
  return match ? match[key] : key;
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('ru');

  const t = useMemo(() => {
    const tFunc = (key) => getTranslation(key, lang);
    return new Proxy(tFunc, {
      get(target, prop) {
        if (typeof prop === 'string' && !(prop in target)) {
          return getTranslation(prop, lang);
        }
        return Reflect.get(target, prop);
      },
    });
  }, [lang]);

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
