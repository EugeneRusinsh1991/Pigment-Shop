import React from 'react';
import HeaderDropdown from './HeaderDropdown';

const LANGUAGES = [
  { code: 'ru', label: 'Русский' },
  { code: 'uk', label: 'Українська' },
  { code: 'en', label: 'English' },
];

export default function LangDropdown({ showLangMenu, isDark, lang, onSelectLanguage }) {
  return (
    <HeaderDropdown
      isVisible={showLangMenu}
      isDark={isDark}
      items={LANGUAGES}
      selectedValue={lang}
      onSelect={onSelectLanguage}
    />
  );
}
