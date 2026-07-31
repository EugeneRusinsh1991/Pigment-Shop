/**
 * LanguageContext.js
 *
 * Owns app-wide language selection and provides translation functions.
 */
import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { TRANSLATIONS } from '../data/translations';
import { crossPlatformStorage } from '../utils/crossPlatformStorage';

const LANG_STORAGE_KEY = 'app_language';

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
  const [lang, setLangState] = useState(() => {
    return crossPlatformStorage.getItem(LANG_STORAGE_KEY) || 'ru';
  });

  const selectLanguage = useCallback((code) => {
    setLangState(code);
    crossPlatformStorage.setItem(LANG_STORAGE_KEY, code);
  }, []);

  const t = useCallback(
    (key, params) => getTranslation(key, lang, params),
    [lang]
  );

  const value = useMemo(() => ({ lang, t, selectLanguage }), [lang, t, selectLanguage]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

const defaultLanguageContext = {
  lang: 'ru',
  t: (key, params) => getTranslation(key, 'ru', params),
  selectLanguage: () => {},
};

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  return ctx || defaultLanguageContext;
}
