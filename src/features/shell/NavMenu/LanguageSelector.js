import { useState } from 'react';
import { Text, View } from 'react-native';
import AnimatedButton from '@/components/AnimatedButton';
import { ThemeIcon } from '@/components/Icons';
import styles from './NavMenuStyles';
import { ACCENT_COLOR, LANGUAGES, CURRENCIES } from './constants';

const BORDER_COLORS = {
  'selected-dark':  ACCENT_COLOR,
  'selected-light': ACCENT_COLOR,
  'normal-dark':    '#242424',
  'normal-light':   '#e8edf5',
};

const BG_COLORS = {
  'selected-dark':  'rgba(227, 27, 35, 0.15)',
  'selected-light': 'rgba(227, 27, 35, 0.08)',
  'normal-dark':    'transparent',
  'normal-light':   'transparent',
};

const TEXT_COLORS = {
  'selected-dark':  ACCENT_COLOR,
  'selected-light': ACCENT_COLOR,
  'normal-dark':    '#94a3b8',
  'normal-light':   '#475569',
};

function getLangButtonStyles(isSelected, isDark) {
  const key = `${isSelected ? 'selected' : 'normal'}-${isDark ? 'dark' : 'light'}`;
  return {
    btn: {
      width: '100%',
      paddingVertical: 10,
      minHeight: 44,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: BORDER_COLORS[key],
      backgroundColor: BG_COLORS[key],
    },
    text: { fontSize: 12, fontWeight: isSelected ? '700' : '500', color: TEXT_COLORS[key] },
  };
}

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
            {LANGUAGES.map((item) => {
              const s = getLangButtonStyles(lang === item.code, isDark);
              return (
                <AnimatedButton
                  key={item.code}
                  style={s.btn}
                  onPress={() => onSelectLanguage(item.code)}
                >
                  <Text style={s.text}>{item.label}</Text>
                </AnimatedButton>
              );
            })}
          </View>

          {/* Column 2: Currency buttons (UAH, USD) */}
          <View style={{ flex: 1, flexDirection: 'column', gap: 8 }}>
            {CURRENCIES.map((item) => {
              const s = getLangButtonStyles(selectedCurrency === item.code, isDark);
              return (
                <AnimatedButton
                  key={item.code}
                  style={s.btn}
                  onPress={() => setSelectedCurrency(item.code)}
                >
                  <Text style={s.text}>{item.label}</Text>
                </AnimatedButton>
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
}
