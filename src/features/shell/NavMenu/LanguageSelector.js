import { useState } from 'react';
import { Text, View } from 'react-native';
import { AnimatedButton, ChipButton } from '@/components/Button';
import { ThemeIcon } from '@/components/Icons';
import styles from './NavMenuStyles';
import { LANGUAGES, CURRENCIES } from './constants';

function getThemeToggleLabel(isDark) {
  return isDark ? 'Switch to light theme' : 'Switch to dark theme';
}

function getThemeToggleStyle(isDark) {
  return {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    minHeight: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: isDark ? '#242424' : '#e8edf5',
    backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(15,23,42,0.03)',
    marginBottom: 12,
  };
}

function getThemeIconStyles(isDark) {
  return {
    container: { marginRight: 10 },
    icon: { isDark, color: isDark ? '#FFFFFF' : '#1C1C1C', size: 16 },
  };
}

function getThemeLabelStyles(isDark) {
  return [
    isDark ? styles.textDark : styles.textLight,
    {
      fontFamily: 'System, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontSize: 13,
      fontWeight: '600',
    },
  ];
}

export default function LanguageSelector({ isDark, lang, onSelectLanguage, onToggleTheme }) {
  const [selectedCurrency, setSelectedCurrency] = useState('UAH');

  if (!onSelectLanguage && !onToggleTheme) return null;
  const themeToggleLabel = getThemeToggleLabel(isDark);

  return (
    <View style={[styles.menuFooter, isDark ? styles.menuFooterDark : styles.menuFooterLight]}>
      {onToggleTheme && (
        <AnimatedButton
          style={getThemeToggleStyle(isDark)}
          onPress={onToggleTheme}
        >
          <View style={getThemeIconStyles(isDark).container}>
            <ThemeIcon {...getThemeIconStyles(isDark).icon} />
          </View>
          <Text style={getThemeLabelStyles(isDark)}>
            {themeToggleLabel}
          </Text>
        </AnimatedButton>
      )}

      {onSelectLanguage && (
        <View style={{ flexDirection: 'row', gap: 10 }}>
          {/* Column 1: Language buttons (RU, UKR, ENG) */}
          <View style={{ flex: 1, flexDirection: 'column', gap: 8 }}>
            {LANGUAGES.map((item) => (
              <ChipButton
                key={item.code}
                label={item.label}
                active={lang === item.code}
                isDark={isDark}
                onPress={() => onSelectLanguage(item.code)}
                variant="rect"
                style={{ width: '100%' }}
              />
            ))}
          </View>

          {/* Column 2: Currency buttons (UAH, USD) */}
          <View style={{ flex: 1, flexDirection: 'column', gap: 8 }}>
            {CURRENCIES.map((item) => (
              <ChipButton
                key={item.code}
                label={item.label}
                active={selectedCurrency === item.code}
                isDark={isDark}
                onPress={() => setSelectedCurrency(item.code)}
                variant="rect"
                style={{ width: '100%' }}
              />
            ))}
          </View>
        </View>
      )}
    </View>
  );
}
